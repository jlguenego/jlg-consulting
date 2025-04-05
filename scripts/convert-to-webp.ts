import sharp from "sharp";
import { extname, basename, dirname, join } from "path";
import { existsSync } from "fs";
import { argv } from "process";

async function convertToWebP(inputPath: string, outputPath?: string) {
  if (!existsSync(inputPath)) {
    console.error("Fichier source introuvable :", inputPath);
    process.exit(1);
  }

  const baseName = basename(inputPath, extname(inputPath));
  const outputDir = dirname(inputPath);
  const targetPath = outputPath ?? join(outputDir, `${baseName}.webp`);

  try {
    await sharp(inputPath).rotate().toFormat("webp").toFile(targetPath);

    console.log("✅ Conversion terminée :", targetPath);
  } catch (error) {
    console.error("❌ Erreur lors de la conversion :", error);
    process.exit(1);
  }
}

// --- Utilisation en ligne de commande ---
const [, , input, output] = argv;

if (!input) {
  console.log("Usage : bun convert-to-webp.ts <chemin-image> [chemin-sortie]");
  process.exit(0);
}

convertToWebP(input, output);
