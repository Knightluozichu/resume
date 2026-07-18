#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";

const index = process.argv.indexOf("--book");
const bookSlug = index >= 0 ? process.argv[index + 1] : null;
if (!bookSlug || !/^[a-z0-9][a-z0-9-]*$/.test(bookSlug)) {
  throw new Error("用法：node scripts/release-smoke-paths.mjs --book <slug>");
}
const bookDir = path.join(process.cwd(), "content", bookSlug);
if (!fs.existsSync(bookDir)) throw new Error(`图书不存在：${bookSlug}`);

const chapters = [];
for (const sectionSlug of fs.readdirSync(bookDir)) {
  const sectionDir = path.join(bookDir, sectionSlug);
  if (!fs.statSync(sectionDir).isDirectory()) continue;
  for (const file of fs
    .readdirSync(sectionDir)
    .filter((name) => name.endsWith(".mdx"))) {
    const chapterSlug = file.replace(/\.mdx$/, "");
    const data = matter(
      fs.readFileSync(path.join(sectionDir, file), "utf8"),
    ).data;
    if (data.draft) continue;
    chapters.push({
      sectionSlug,
      chapterSlug,
      order: Number(data.order ?? 0),
      title: String(data.title ?? chapterSlug),
    });
  }
}
chapters.sort(
  (a, b) => a.order - b.order || a.sectionSlug.localeCompare(b.sectionSlug),
);
if (chapters.length === 0) throw new Error(`图书没有可发布章节：${bookSlug}`);
const selected = [
  chapters[0],
  chapters[Math.floor(chapters.length / 2)],
  chapters.at(-1),
];
for (const chapter of new Map(
  selected.map((item) => [`${item.sectionSlug}/${item.chapterSlug}`, item]),
).values()) {
  console.log(
    `/learn/${bookSlug}/${chapter.sectionSlug}/${chapter.chapterSlug}`,
  );
}
