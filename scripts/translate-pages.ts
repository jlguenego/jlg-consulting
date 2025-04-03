import fs from "fs/promises";
import path from "path";
import fg from "fast-glob";
import { OpenAI } from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const frDir = path.resolve("src/pages/fr");
const enDir = path.resolve("src/pages/en");

async function deleteAndRecreateEnDir() {
  try {
    await fs.rm(enDir, { recursive: true, force: true });
    console.log("✅ Dossier /en supprimé");
  } catch (err) {
    console.warn("⚠️ Impossible de supprimer /en (peut-être inexistant)");
  }
  await fs.mkdir(enDir, { recursive: true });
  console.log("📁 Dossier /en recréé");
}

async function getTextToTranslate(content: string) {
  // Extrait tous les textes entre > et < qui ne sont pas du code ou des balises
  const regex = />([^<>{}]+)</g;
  const matches = [...content.matchAll(regex)];
  return matches.map((m) => m[1].trim()).filter(Boolean);
}

async function translateTexts(texts: string[]): Promise<string[]> {
  const prompt = `Translate the following French texts into English. Keep the order. Respond with one text per line.\n\n${texts.join(
    "\n",
  )}`;
  const chat = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [{ role: "user", content: prompt }],
  });
  const response = chat.choices[0].message.content || "";
  return response.split("\n").map((line) => line.trim());
}

async function translateFile(filePath: string) {
  const relPath = path.relative(frDir, filePath);
  const targetPath = path.join(enDir, relPath);
  const targetDir = path.dirname(targetPath);

  const content = await fs.readFile(filePath, "utf-8");
  const originalTexts = await getTextToTranslate(content);

  if (originalTexts.length === 0) {
    await fs.mkdir(targetDir, { recursive: true });
    await fs.writeFile(targetPath, content);
    console.log(`✅ Copié sans changement : ${relPath}`);
    return;
  }

  const translatedTexts = await translateTexts(originalTexts);
  let translatedContent = content;
  for (let i = 0; i < originalTexts.length; i++) {
    const regex = new RegExp(`>${originalTexts[i]}<`);
    translatedContent = translatedContent.replace(
      regex,
      `>${translatedTexts[i]}<`,
    );
  }

  await fs.mkdir(targetDir, { recursive: true });
  await fs.writeFile(targetPath, translatedContent);
  console.log(`🌍 Traduit et copié : ${relPath}`);
}

async function main() {
  await deleteAndRecreateEnDir();
  const files = await fg("**/*.astro", { cwd: frDir, absolute: true });
  for (const file of files) {
    await translateFile(file);
  }
  console.log("✅ Traduction terminée.");
}

main().catch((err) => {
  console.error("❌ Erreur :", err);
});
