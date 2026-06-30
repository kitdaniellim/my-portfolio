import { readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const here = dirname(fileURLToPath(import.meta.url));
const imgDir = resolve(here, "../src/img");
const blurModule = resolve(here, "../src/img/blur-placeholders.ts");

const HERO_WIDTH = 800;
const DISPLAY_QUALITY = 78;
const LQIP_WIDTH = 24;

const localImages = [
  { slug: "profile", source: resolve(imgDir, "personal-image.jpg"), width: HERO_WIDTH },
];

async function toDisplayWebp(input, outPath, width) {
  return sharp(input)
    .resize({ width, withoutEnlargement: true })
    .webp({ quality: DISPLAY_QUALITY })
    .toFile(outPath);
}

async function toLqip(input) {
  const buffer = await sharp(input).resize({ width: LQIP_WIDTH }).webp({ quality: 40 }).toBuffer();
  return `data:image/webp;base64,${buffer.toString("base64")}`;
}

async function run() {
  const placeholders = {};

  for (const { slug, source, width } of localImages) {
    const input = await readFile(source);
    const outPath = resolve(imgDir, `${slug}.webp`);
    const info = await toDisplayWebp(input, outPath, width);
    placeholders[slug] = await toLqip(input);
    console.log(
      `${slug}: ${(input.length / 1024).toFixed(0)}KB -> ${(info.size / 1024).toFixed(0)}KB webp (${info.width}x${info.height})`
    );
  }

  const entries = Object.entries(placeholders)
    .map(([slug, data]) => `  ${slug}: "${data}",`)
    .join("\n");
  const contents = `export const blurPlaceholders = {\n${entries}\n} as const;\n\nexport type BlurKey = keyof typeof blurPlaceholders;\n`;
  await writeFile(blurModule, contents);
  console.log(`Wrote ${blurModule}`);
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
