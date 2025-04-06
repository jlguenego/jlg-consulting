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
        content: `
You are a web professional translator.
Translate from French to English.
Preserve HTML and Astro syntax and MDX syntax.
Preserve the javascript/typescript import file paths.
Prettier formatting should be preserved.
Please give me the raw Astro output without any triple backticks or Markdown formatting
Do not translate urls, links, comments or code blocks.
`,
      },
      {
        role: "user",
        content: text,
      },
    ],
    temperature: 0, // Traduction stable et déterministe
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
  const arg = process.argv[2]; // argument optionnel : chemin relatif depuis src/pages/fr

  // Supprimer le dossier /en s'il existe (seulement si on traite tous les fichiers)
  if (!arg) {
    await fs.rm(dstDir, { recursive: true, force: true });
    await fs.mkdir(dstDir, { recursive: true });
  }

  if (arg) {
    const singleFile = path.resolve(srcDir, arg);
    await processFile(singleFile);
  } else {
    const files = await fg(["**/*.(astro|mdx)"], {
      cwd: srcDir,
      absolute: true,
    });
    for (const file of files) {
      await processFile(file);
    }
  }

  console.log("✅ Translation complete.");
}

main().catch((err) => {
  console.error("❌ Error during translation:", err);
});
