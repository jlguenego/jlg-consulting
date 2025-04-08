import fs from "fs/promises";
import path from "path";
import sharp from "sharp";
import { fileURLToPath } from "url";

// Répertoire racine du projet à scanner
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, "../src/pages/fr"); // ou ajuster selon ton besoin
const srcImageDir = "./public";
const destImageDir = "./public/low-res";

// Pattern regex pour matcher lowSrc={publicDir + "low-res/nom.png"}
const lowSrcRegex =
  /lowSrc=\{publicDir \+ "\/low-res\/([^"]+\.(png|jpg|jpeg|svg|webp))"\}/g;

// Taille maximale pour la largeur
const maxWidth = 250;
const quality = 40;

// Fonction pour lister tous les fichiers d'un répertoire récursivement
async function getAllFiles(dir: string): Promise<string[]> {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map((entry) => {
      const res = path.resolve(dir, entry.name);
      return entry.isDirectory() ? getAllFiles(res) : res;
    }),
  );
  return files.flat();
}

// Fonction pour extraire les fichiers d'image référencés dans le code
async function extractImagePaths(): Promise<Set<string>> {
  const allFiles = await getAllFiles(projectRoot);
  const codeFiles = allFiles.filter(
    (file) =>
      file.endsWith(".ts") ||
      file.endsWith(".tsx") ||
      file.endsWith(".js") ||
      file.endsWith(".astro"),
  );

  const matchedPaths = new Set<string>();

  for (const file of codeFiles) {
    const content = await fs.readFile(file, "utf-8");
    const matches = [...content.matchAll(lowSrcRegex)];
    for (const match of matches) {
      const relativePath = match[1]; // ex: hero.png
      console.log("relativePath: ", relativePath);
      matchedPaths.add(relativePath);
    }
  }

  return matchedPaths;
}

// Supprimer et recréer le répertoire destination
async function resetDestDir(): Promise<void> {
  await fs.rm(destImageDir, { recursive: true, force: true });
  await fs.mkdir(destImageDir, { recursive: true });
  console.log(`✅ Répertoire ${destImageDir} recréé`);
}

// Redimensionner et convertir les images trouvées
async function convertImages(imagePaths: Set<string>): Promise<void> {
  for (const relative of imagePaths) {
    const inputPath = path.join(srcImageDir, relative);
    const parsed = path.parse(relative);
    const outputPath = path.join(destImageDir, parsed.name + ".webp");

    try {
      await sharp(inputPath)
        .resize({ width: maxWidth, withoutEnlargement: true })
        .webp({ quality })
        .toFile(outputPath);
      console.log(`🖼️ ${relative} → ${parsed.name}.webp`);
    } catch (err) {
      console.error(`❌ Erreur avec ${relative} :`, err);
    }
  }
}

// Fonction principale
async function main(): Promise<void> {
  const paths = await extractImagePaths();
  await resetDestDir();
  await convertImages(paths);
}

main();
