import "server-only";

import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";

/**
 * MDX 内容索引（HEL-18，HEL-48 书化）
 *
 * 内容以 .mdx 文件存仓库：content/<book-slug>/<section-slug>/<chapter-slug>.mdx
 * 「书」= content/ 下的顶层目录（如 learnopengl），为多书扩展打地基。
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
  /** book slug（来自顶层目录名，用于 URL 第一段） */
  bookSlug: string;
  /** section slug（来自目录名，用于 URL 第二段） */
  sectionSlug: string;
  /** chapter slug（来自文件名，用于 URL 第三段） */
  chapterSlug: string;
  /** 已解析的 frontmatter */
  frontmatter: ChapterFrontmatter;
  /** MDX 正文（已剥离 frontmatter） */
  source: string;
}

const CONTENT_DIR = path.join(process.cwd(), "content");

/**
 * 书的教学顺序（总监指定，HEL-48）。
 *
 * 侧边栏分书与全局上/下一章顺序均以此为准。未列入的书排在已知书之后，
 * 组内再按 bookSlug 稳定回退，保证新增书也有确定顺序。
 */
export const BOOK_ORDER = ["learnopengl", "cpp-primer-5e"] as const;

/** book slug → 书显示名（侧边栏书头、列表页书标题）。 */
export const BOOK_TITLES: Record<string, string> = {
  learnopengl: "LearnOpenGL",
  "cpp-primer-5e": "C++ Primer 第5版",
};

/** 取某书在教学顺序中的位次；未知书返回一个大于所有已知位次的值 */
function bookRank(bookSlug: string): number {
  const i = (BOOK_ORDER as readonly string[]).indexOf(bookSlug);
  return i === -1 ? BOOK_ORDER.length : i;
}

/**
 * Section 教学顺序（总监指定，HEL-21）。
 *
 * 侧边栏分组与全局上/下一章顺序均以此为准——绝不能用 localeCompare 中文字典序，
 * 那排不出教学递进（HEL-18 审查发现的坑）。未列入的 section 排在已知 section 之后，
 * 组内再按各自 section 名做稳定回退，保证新增 section 也有确定顺序。
 */
export const SECTION_ORDER = [
  "入门",
  "光照",
  "模型加载",
  "高级OpenGL",
  "高级光照",
  "PBR",
  // C++ Primer 第5版
  "C++基础",
  "C++标准库",
  "类设计者工具",
  "高级主题",
] as const;

/** 取某 section 在教学顺序中的位次；未知 section 返回一个大于所有已知位次的值 */
function sectionRank(section: string): number {
  const i = (SECTION_ORDER as readonly string[]).indexOf(section);
  return i === -1 ? SECTION_ORDER.length : i;
}

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
  /** 允许 sourceUrl 为空（原创内容/非 LearnOpenGL 改编章节可无出处） */
  const optStr = (key: "sourceUrl"): string => {
    const v = raw[key];
    if (typeof v !== "string") fail(`字段 \`${key}\` 必须是字符串`);
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
    sourceUrl: optStr("sourceUrl"),
  };
}

/**
 * 扫描 content/ 下全部三层 .mdx（content/<book>/<section>/<chapter>.mdx），
 * 解析为 ChapterMeta，按 bookRank（书顺序）→ sectionRank（section 教学顺序）
 * → section 名 localeCompare 回退 → order 排序。
 *
 * draft 处理（HEL-21）：默认（含构建/生产）过滤掉 draft:true 章节；
 * 仅当 includeDraft 显式为 true（开发期侧边栏想显示草稿并标注）时才保留。
 * 排序结果对所有调用稳定：上/下一章、generateStaticParams、侧边栏共用同一顺序。
 */
export function getAllChapters({
  includeDraft = false,
}: { includeDraft?: boolean } = {}): ChapterMeta[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];

  const chapters: ChapterMeta[] = [];

  for (const bookSlug of fs.readdirSync(CONTENT_DIR)) {
    const bookDir = path.join(CONTENT_DIR, bookSlug);
    if (!fs.statSync(bookDir).isDirectory()) continue;

    for (const sectionSlug of fs.readdirSync(bookDir)) {
      const sectionDir = path.join(bookDir, sectionSlug);
      if (!fs.statSync(sectionDir).isDirectory()) continue;

      for (const file of fs.readdirSync(sectionDir)) {
        if (!file.endsWith(".mdx")) continue;
        const chapterSlug = file.replace(/\.mdx$/, "");
        const filePath = path.join(sectionDir, file);
        const rel = path.relative(process.cwd(), filePath);

        const { data, content } = matter(fs.readFileSync(filePath, "utf8"));
        const frontmatter = parseFrontmatter(data, rel);

        if (frontmatter.draft && !includeDraft) continue;

        chapters.push({
          bookSlug,
          sectionSlug,
          chapterSlug,
          frontmatter,
          source: content,
        });
      }
    }
  }

  return chapters.sort((a, b) => {
    const rb = bookRank(a.bookSlug) - bookRank(b.bookSlug);
    if (rb !== 0) return rb;
    // 同一书位次内（含两本未知书）按 bookSlug 稳定回退
    const sb = a.bookSlug.localeCompare(b.bookSlug);
    if (sb !== 0) return sb;

    const r =
      sectionRank(a.frontmatter.section) - sectionRank(b.frontmatter.section);
    if (r !== 0) return r;
    // 同一教学位次内（含两个未知 section）按 section 名稳定回退，再按 order
    const s = a.frontmatter.section.localeCompare(b.frontmatter.section, "zh");
    return s !== 0 ? s : a.frontmatter.order - b.frontmatter.order;
  });
}

/** 取单章；不存在返回 null（路由层 notFound）。草稿章在开发期也可取到（includeDraft）。 */
export function getChapter(
  bookSlug: string,
  sectionSlug: string,
  chapterSlug: string,
): ChapterMeta | null {
  return (
    getAllChapters({
      includeDraft: process.env.NODE_ENV !== "production",
    }).find(
      (c) =>
        c.bookSlug === bookSlug &&
        c.sectionSlug === sectionSlug &&
        c.chapterSlug === chapterSlug,
    ) ?? null
  );
}

/** 侧边栏链接项（可序列化，供 client 组件高亮比对） */
export interface NavChapter {
  /** 三段式路由 /learn/<bookSlug>/<sectionSlug>/<chapterSlug> */
  href: string;
  title: string;
  /** 草稿章（开发期显示并标注；生产已被过滤，不会出现在这里） */
  draft: boolean;
}

/** 侧边栏一个 section 分组（按 SECTION_ORDER 排序后产出） */
export interface NavSection {
  /** section 显示名（中文，如「入门」） */
  section: string;
  chapters: NavChapter[];
}

/** 侧边栏一本书（按 BOOK_ORDER 排序后产出，内含若干 section 分组） */
export interface NavBook {
  /** book slug（用于 client 端 usePathname 比对当前所看的书） */
  bookSlug: string;
  /** 书显示名（来自 BOOK_TITLES，回退为 bookSlug） */
  bookTitle: string;
  sections: NavSection[];
}

/**
 * 生成侧边栏章节树：按 BOOK_ORDER 分书、书内按 SECTION_ORDER 分 section、
 * section 内按 order（HEL-48）。只产出有已发布章节的书 / section，
 * 不输出空预留组。
 * 开发期含草稿（标注），生产构建自动隐藏（getAllChapters 过滤）。
 * 返回纯可序列化数据，可安全传给 client 组件做 usePathname 高亮。
 */
export function getChapterTree(): NavBook[] {
  const includeDraft = process.env.NODE_ENV !== "production";
  const books: NavBook[] = [];

  for (const c of getAllChapters({ includeDraft })) {
    const item: NavChapter = {
      href: `/learn/${c.bookSlug}/${c.sectionSlug}/${c.chapterSlug}`,
      title: c.frontmatter.title,
      draft: c.frontmatter.draft,
    };

    // getAllChapters 已按 book → section 顺序排好，相邻同 book 归入同书
    let book = books[books.length - 1];
    if (!book || book.bookSlug !== c.bookSlug) {
      book = {
        bookSlug: c.bookSlug,
        bookTitle: BOOK_TITLES[c.bookSlug] ?? c.bookSlug,
        sections: [],
      };
      books.push(book);
    }

    const lastSection = book.sections[book.sections.length - 1];
    if (lastSection && lastSection.section === c.frontmatter.section) {
      lastSection.chapters.push(item);
    } else {
      book.sections.push({ section: c.frontmatter.section, chapters: [item] });
    }
  }

  return books;
}

/** 上/下一章（按全局教学顺序）；首/末章对应侧为 null。 */
export interface AdjacentChapters {
  prev: { href: string; title: string } | null;
  next: { href: string; title: string } | null;
}

/**
 * 取某章在「同一本书内」全局顺序中的前后章（HEL-48）。
 * 顺序与侧边栏一致（getAllChapters 过滤出本书）；上/下一章不跨书跳。
 * 开发期把草稿也纳入序列，使草稿章之间的上/下一章导航在开发预览时连贯。
 */
export function getAdjacentChapters(
  bookSlug: string,
  sectionSlug: string,
  chapterSlug: string,
): AdjacentChapters {
  // 先按 bookSlug 过滤，再取前后——prev/next 限同一本书内，绝不跨书
  const all = getAllChapters({
    includeDraft: process.env.NODE_ENV !== "production",
  }).filter((c) => c.bookSlug === bookSlug);
  const i = all.findIndex(
    (c) => c.sectionSlug === sectionSlug && c.chapterSlug === chapterSlug,
  );
  if (i === -1) return { prev: null, next: null };

  const toLink = (c: ChapterMeta) => ({
    href: `/learn/${c.bookSlug}/${c.sectionSlug}/${c.chapterSlug}`,
    title: c.frontmatter.title,
  });

  return {
    prev: i > 0 ? toLink(all[i - 1]) : null,
    next: i < all.length - 1 ? toLink(all[i + 1]) : null,
  };
}
