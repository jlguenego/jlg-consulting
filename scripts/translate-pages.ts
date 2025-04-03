// scripts/translate-pages.ts

import fs from "fs/promises";
import path from "path";
import fg from "fast-glob";
import { OpenAI } from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const srcLang = "fr";
const dstLang = "en";
const srcDir = path.resolve("src/pages", srcLang);
const dstDir = path.resolve("src/pages", dstLang);

async function translateText(text: string): Promise<string> {
  const start = Date.now();

  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content: `You are a professional translator. Translate from French to English. Preserve HTML and Astro syntax.`,
      },
      {
        role: "user",
        content: text,
      },
    ],
    temperature: 0, // Rend la traduction déterministe
  });

  const duration = ((Date.now() - start) / 1000).toFixed(2);
  console.log(`⏱️ Translation took ${duration}s`);

  return response.choices[0].message.content ?? text;
}

async function processFile(filePath: string) {
  const relativePath = path.relative(srcDir, filePath);
  const outputPath = path.join(dstDir, relativePath);

  const content = await fs.readFile(filePath, "utf8");
  const translated = await translateText(content);

  await fs.mkdir(path.dirname(outputPath), { recursive: true });
  await fs.writeFile(outputPath, translated, "utf8");

  console.log(`✔ Translated: ${relativePath}`);
}

async function main() {
  // Supprimer le dossier /en s'il existe
  await fs.rm(dstDir, { recursive: true, force: true });
  await fs.mkdir(dstDir, { recursive: true });

  const files = await fg(["**/*.astro"], { cwd: srcDir, absolute: true });
  for (const file of files) {
    await processFile(file);
  }
  console.log("✅ Translation complete.");
}

main().catch((err) => {
  console.error("❌ Error during translation:", err);
});
