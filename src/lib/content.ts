import "server-only";

import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";

/**
 * MDX 内容索引（HEL-18）
 *
 * 内容以 .mdx 文件存仓库：content/learn/<section-slug>/<chapter-slug>.mdx
 * 本模块在构建期（SSG）扫描 content/，解析 frontmatter，提供类型安全的章节索引。
 *
 * 仅供 Server Component / 构建期使用（server-only 守卫）。
 */

/** 章节类型：A 概念型 | B 数学型 | C 实战型 | D 对比型（见 docs/chapter-spec.md §〇） */
export type ChapterType = "A" | "B" | "C" | "D";

/** 章节 frontmatter（与 docs/chapter-template.mdx 字段一一对应） */
export interface ChapterFrontmatter {
  /** 章节标题（与 LearnOpenGL-CN 对应章名一致） */
  title: string;
  /** 章节类型 */
  type: ChapterType;
  /** 所属 section（入门 | 光照 | 模型加载 | 高级OpenGL | 高级光照 | PBR） */
  section: string;
  /** 在所属 section 内的顺序 */
  order: number;
  /** 一句话——读完这章你能做出什么 */
  description: string;
  /** 是否含交互 Demo */
  demo: boolean;
  /** 本章是否含数学推导节 */
  math: boolean;
  /** 总监按 chapter-spec.md 逐节 review 通过前不得改为 false */
  draft: boolean;
  /** 改编出处链接（LearnOpenGL-CN） */
  sourceUrl: string;
}

/** 章节元信息：frontmatter + 路由 slug + 原始正文（不含 frontmatter） */
export interface ChapterMeta {
  /** section slug（来自目录名，用于 URL 第一段） */
  sectionSlug: string;
  /** chapter slug（来自文件名，用于 URL 第二段） */
  chapterSlug: string;
  /** 已解析的 frontmatter */
  frontmatter: ChapterFrontmatter;
  /** MDX 正文（已剥离 frontmatter） */
  source: string;
}

const CONTENT_DIR = path.join(process.cwd(), "content", "learn");

/** frontmatter 必填字段及其期望类型（缺失 / 类型错误 = 构建期抛错） */
function parseFrontmatter(
  raw: Record<string, unknown>,
  filePath: string,
): ChapterFrontmatter {
  const fail = (msg: string): never => {
    throw new Error(`[content] ${filePath} frontmatter 非法：${msg}`);
  };

  const str = (key: keyof ChapterFrontmatter): string => {
    const v = raw[key];
    if (typeof v !== "string" || v.trim() === "")
      fail(`字段 \`${key}\` 必须是非空字符串`);
    return v as string;
  };
  const bool = (key: keyof ChapterFrontmatter): boolean => {
    const v = raw[key];
    if (typeof v !== "boolean") fail(`字段 \`${key}\` 必须是布尔值`);
    return v as boolean;
  };

  const type = raw.type;
  if (type !== "A" && type !== "B" && type !== "C" && type !== "D")
    fail("字段 `type` 必须是 A | B | C | D 之一");

  const order = raw.order;
  if (typeof order !== "number" || !Number.isInteger(order))
    fail("字段 `order` 必须是整数");

  return {
    title: str("title"),
    type: type as ChapterType,
    section: str("section"),
    order: order as number,
    description: str("description"),
    demo: bool("demo"),
    math: bool("math"),
    draft: bool("draft"),
    sourceUrl: str("sourceUrl"),
  };
}

/** 扫描 content/learn 下全部 .mdx，解析为 ChapterMeta，按 section → order 排序 */
export function getAllChapters(): ChapterMeta[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];

  const chapters: ChapterMeta[] = [];

  for (const sectionSlug of fs.readdirSync(CONTENT_DIR)) {
    const sectionDir = path.join(CONTENT_DIR, sectionSlug);
    if (!fs.statSync(sectionDir).isDirectory()) continue;

    for (const file of fs.readdirSync(sectionDir)) {
      if (!file.endsWith(".mdx")) continue;
      const chapterSlug = file.replace(/\.mdx$/, "");
      const filePath = path.join(sectionDir, file);
      const rel = path.relative(process.cwd(), filePath);

      const { data, content } = matter(fs.readFileSync(filePath, "utf8"));
      const frontmatter = parseFrontmatter(data, rel);

      chapters.push({ sectionSlug, chapterSlug, frontmatter, source: content });
    }
  }

  return chapters.sort((a, b) => {
    const s = a.frontmatter.section.localeCompare(b.frontmatter.section, "zh");
    return s !== 0 ? s : a.frontmatter.order - b.frontmatter.order;
  });
}

/** 取单章；不存在返回 null（路由层 notFound） */
export function getChapter(
  sectionSlug: string,
  chapterSlug: string,
): ChapterMeta | null {
  return (
    getAllChapters().find(
      (c) => c.sectionSlug === sectionSlug && c.chapterSlug === chapterSlug,
    ) ?? null
  );
}
