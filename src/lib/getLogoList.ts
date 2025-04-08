// src/lib/getLogoList.ts
import fs from "fs";
import path from "path";

export function getLogoList(): string[] {
  const logosDir = path.resolve("public/logos");
  if (!fs.existsSync(logosDir)) return [];

  const result = fs
    .readdirSync(logosDir)
    .filter((file) => /\.(png|jpe?g|svg)$/i.test(file))
    .filter((file) => {
      return /small/.test(file) === false;
    });
  console.log("result: ", result);
  return result;
}
