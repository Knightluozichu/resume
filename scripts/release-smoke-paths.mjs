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
  (a, b) =>
    a.sectionSlug.localeCompare(b.sectionSlug, "en", { numeric: true }) ||
    a.order - b.order ||
    a.chapterSlug.localeCompare(b.chapterSlug, "en", { numeric: true }),
);
if (chapters.length === 0) throw new Error(`图书没有可发布章节：${bookSlug}`);

const searchableText = (chapter) =>
  `${chapter.sectionSlug} ${chapter.chapterSlug} ${chapter.title}`;
const learningMaps = chapters.filter((chapter) =>
  /learning-map|official-guide|学习地图|导学/i.test(searchableText(chapter)),
);
const reviews = chapters.filter((chapter) =>
  /final-review|book-review|全书复习|总复习|全书验收/i.test(
    searchableText(chapter),
  ),
);
const auxiliary = new Set([...learningMaps, ...reviews]);
const formalChapters = chapters.filter((chapter) => !auxiliary.has(chapter));
const core = formalChapters.length > 0 ? formalChapters : chapters;
const selected = [
  learningMaps[0],
  core[0],
  core[Math.floor(core.length / 2)],
  core.at(-1),
  reviews.at(-1),
].filter(Boolean);
for (const chapter of new Map(
  selected.map((item) => [`${item.sectionSlug}/${item.chapterSlug}`, item]),
).values()) {
  console.log(
    `/learn/${bookSlug}/${chapter.sectionSlug}/${chapter.chapterSlug}`,
  );
}
