// src/lib/getLogoList.ts
import fs from "fs";
import path from "path";

export function getLogoList(): { img: string; smallImg: string }[] {
  const logosDir = path.resolve("public/logos");
  if (!fs.existsSync(logosDir)) return [];

  const logos = fs
    .readdirSync(logosDir)
    .filter((file) => /\.(png|jpe?g|svg)$/i.test(file))
    .filter((file) => {
      return /small/.test(file) === false;
    });
  const result = [];
  for (const logo of logos) {
    result.push({
      img: logo,
      smallImg: logo.replace(/(\.png|\.jpg|\.jpeg|\.svg)/i, "-small$1"),
    });
  }

  return result;
}
