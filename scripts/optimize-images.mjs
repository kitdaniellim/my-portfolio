import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const here = dirname(fileURLToPath(import.meta.url));
const projectsDir = resolve(here, "../src/img/projects");
const imgDir = resolve(here, "../src/img");
const blurModule = resolve(here, "../src/img/blur-placeholders.ts");

const DISPLAY_WIDTH = 1280;
const HERO_WIDTH = 800;
const DISPLAY_QUALITY = 78;
const LQIP_WIDTH = 24;

const remoteProjects = [
  { slug: "alab", url: "https://user-images.githubusercontent.com/60454465/163956138-90ba7d41-00b2-43a8-b858-dbc476233c44.png" },
  { slug: "setmeapp", url: "https://user-images.githubusercontent.com/60454465/132158692-4a6dd6a5-42b1-4959-91ef-d19f7dd986a4.jpg" },
  { slug: "smalltalk", url: "https://user-images.githubusercontent.com/60454465/182025950-10e3c168-3ced-4333-9291-6dc51767e24c.png" },
  { slug: "weather", url: "https://user-images.githubusercontent.com/60454465/200169282-3c1cdedd-a6da-4168-b407-35fd87e5066b.png" },
];

const localImages = [
  { slug: "profile", source: resolve(imgDir, "personal-image.jpg"), width: HERO_WIDTH },
];

async function fetchBuffer(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`${response.status} ${response.statusText} for ${url}`);
  return Buffer.from(await response.arrayBuffer());
}

async function toDisplayWebp(input, outPath, width) {
  const info = await sharp(input)
    .resize({ width, withoutEnlargement: true })
    .webp({ quality: DISPLAY_QUALITY })
    .toFile(outPath);
  return info;
}

async function toLqip(input) {
  const buffer = await sharp(input)
    .resize({ width: LQIP_WIDTH })
    .webp({ quality: 40 })
    .toBuffer();
  return `data:image/webp;base64,${buffer.toString("base64")}`;
}

async function run() {
  await mkdir(projectsDir, { recursive: true });
  const placeholders = {};

  for (const { slug, url } of remoteProjects) {
    const source = await fetchBuffer(url);
    const outPath = resolve(projectsDir, `${slug}.webp`);
    const info = await toDisplayWebp(source, outPath, DISPLAY_WIDTH);
    placeholders[slug] = await toLqip(source);
    console.log(`${slug}: ${(source.length / 1024).toFixed(0)}KB -> ${(info.size / 1024).toFixed(0)}KB webp (${info.width}x${info.height})`);
  }

  for (const { slug, source, width } of localImages) {
    const input = await readFile(source);
    const outPath = resolve(imgDir, `${slug}.webp`);
    const info = await toDisplayWebp(input, outPath, width);
    placeholders[slug] = await toLqip(input);
    console.log(`${slug}: ${(input.length / 1024).toFixed(0)}KB -> ${(info.size / 1024).toFixed(0)}KB webp (${info.width}x${info.height})`);
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
