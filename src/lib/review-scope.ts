import "server-only";

/**
 * 复习「范围树」与「章节 slug 桥接」的服务端单一来源（HEL：按章/按书复习）。
 *
 * 为什么是 server-only：本模块要 join 内容侧（getAllChapters，依赖 fs）与复习侧
 * （REVIEW_QUESTIONS）。content.ts 是 server-only/fs 模块，绝不能进客户端；故所有
 * join / 计数都在这里（被 /review 的 page.tsx 与章节 page.tsx 这两个 Server Component
 * 调用）算好，下传给客户端引擎的只是纯 JSON（ReviewScopeTree / 初始 chapter）。
 *
 * 关键事实（实测，见汇报）：内容侧「章节文件名 slug」与复习侧「q.chapter slug」并不是
 * 同一套 —— 仅 54/160 完全相等，其余 106 个复习 slug 带书前缀（cpp-/cpr-/bnrg-/ugo-/
 * prof-/mxrw-/pbr-/cc-）或与文件名措辞不同。因此：
 *  - 复习的「范围」一律以「复习 slug」为准（= URL ?chapter= 的取值、引擎过滤键）。
 *  - 范围树从复习侧数据派生（slug / 标题 / 题数都现成），书归属由 slug 命名规则推断，
 *    书序 / 书名复用 content.ts 的 BOOK_ORDER / BOOK_TITLES（纯常量）。
 *  - 章节页（只有内容侧 slug）→ 复习 slug 的桥接，用「书内多策略匹配」求出（见
 *    reviewChapterSlugFor）。每本书复习章数与内容章数 1:1，匹配可达 160/160。
 */

import {
  CHAPTER_TITLES,
  REVIEW_QUESTIONS,
  type ReviewChapterSlug,
} from "@/data/review-questions";

// 仅引入纯类型（编译期擦除，不会把客户端 chunk 的运行时代码拉进服务端 bundle）。
import type {
  ReviewScopeBook,
  ReviewScopeChapter,
  ReviewScopePathTree,
  ReviewScopeTree,
} from "@/components/review/engine";

import {
  BOOK_ORDER,
  BOOK_TITLES,
  getAllChapters,
  getLearningPathTree,
} from "./content";

export type {
  ReviewScopeBook,
  ReviewScopeChapter,
  ReviewScopePathTree,
  ReviewScopeTree,
};

/** 复习侧章节 slug 的「书前缀 → bookSlug」表（命名规则，稳定）。 */
const PREFIX_TO_BOOK: Array<[string, string]> = [
  ["cc-", "cpp-concurrency"],
  ["cpp-", "cpp-primer-5e"],
  ["cpr-", "c-primer-plus"],
  ["bnrg-", "big-nerd-ranch-guide"],
  ["ugo-", "unity-game-optimization"],
  ["prof-", "profiling-unity-games"],
  ["mxrw-", "mobile-xr-web-optimization"],
  ["pbr-", "learnopengl"],
];

/** 去掉中文/英文空白后比较标题，吸收「高级 GLSL」↔「高级GLSL」之类的空白差异。 */
function normalizeTitle(s: string): string {
  return s.replace(/\s+/g, "").toLowerCase();
}

/**
 * 把一个「复习 slug」归到它所属的 bookSlug。
 * 带前缀的直接查表；不带前缀的只可能是 LearnOpenGL 或 Android进阶解密——
 * 用「该 slug 是否是这两本书的某个内容文件名」消歧（bare slug 在这两本书里唯一）。
 */
function bookSlugForReviewSlug(
  reviewSlug: string,
  bareSlugBooks: ReadonlyMap<string, string>,
): string | null {
  for (const [prefix, book] of PREFIX_TO_BOOK) {
    if (reviewSlug.startsWith(prefix)) return book;
  }
  return bareSlugBooks.get(reviewSlug) ?? null;
}

/**
 * 范围树类型（ReviewScopeChapter / ReviewScopeBook / ReviewScopeTree）在
 * components/review/engine.ts 定义并 re-export（见文件头 import），以便客户端引擎能引用
 * 同一纯类型而不触碰本 server-only 模块。slug = 复习 slug、count = 该章/书复习题数。
 */

/** bookRank：BOOK_ORDER 内的位次，未知书排已知书之后。 */
function bookRank(bookSlug: string): number {
  const i = (BOOK_ORDER as readonly string[]).indexOf(bookSlug);
  return i === -1 ? BOOK_ORDER.length : i;
}

/**
 * 构造复习范围树：只含「有复习题」的章 / 书，按 BOOK_ORDER 排书、
 * 书内按各章在 REVIEW_QUESTIONS 中首次出现的顺序（= 题库聚合顺序，已是教学章序）。
 *
 * 全程不读 frontmatter、不依赖 content↔review 的 slug 相等；书序 / 书名取自 content.ts 常量。
 */
export function buildReviewScopeTree(): ReviewScopeTree {
  // bare-slug → book（仅 LearnOpenGL / Android 两本可能有 bare 复习 slug）
  const bareSlugBooks = new Map<string, string>();
  for (const c of getAllChapters()) {
    if (
      c.bookSlug === "learnopengl" ||
      c.bookSlug === "android-advanced-decryption"
    ) {
      // 后写不覆盖：bare slug 在这两本书里唯一，先到先得即可
      if (!bareSlugBooks.has(c.chapterSlug)) {
        bareSlugBooks.set(c.chapterSlug, c.bookSlug);
      }
    }
  }

  // 复习 slug → 题数 + 首次出现序（保持题库聚合顺序 = 教学章序）
  const countBySlug = new Map<string, number>();
  const firstSeen = new Map<string, number>();
  REVIEW_QUESTIONS.forEach((q, i) => {
    countBySlug.set(q.chapter, (countBySlug.get(q.chapter) ?? 0) + 1);
    if (!firstSeen.has(q.chapter)) firstSeen.set(q.chapter, i);
  });

  // 按书聚合
  const byBook = new Map<string, ReviewScopeChapter[]>();
  for (const [slug, count] of countBySlug) {
    if (count <= 0) continue;
    const book = bookSlugForReviewSlug(slug, bareSlugBooks);
    if (!book) continue; // 理论上不该发生；防御性跳过，宁缺毋错
    const title = CHAPTER_TITLES[slug as ReviewChapterSlug] ?? slug;
    const list = byBook.get(book) ?? [];
    list.push({ slug, title, count });
    byBook.set(book, list);
  }

  const tree: ReviewScopeTree = [];
  for (const [bookSlug, chapters] of byBook) {
    chapters.sort(
      (a, b) => (firstSeen.get(a.slug) ?? 0) - (firstSeen.get(b.slug) ?? 0),
    );
    tree.push({
      bookSlug,
      bookTitle: BOOK_TITLES[bookSlug] ?? bookSlug,
      count: chapters.reduce((n, c) => n + c.count, 0),
      chapters,
    });
  }
  tree.sort((a, b) => bookRank(a.bookSlug) - bookRank(b.bookSlug));
  return tree;
}

export function buildReviewPathScopeTree(
  scopeTree = buildReviewScopeTree(),
): ReviewScopePathTree {
  const reviewByBook = new Map(scopeTree.map((book) => [book.bookSlug, book]));

  return getLearningPathTree()
    .map((path) => {
      const stages = path.stages
        .map((stage) => {
          let count = 0;
          const chapterSlugs = stage.items.flatMap((item) => {
            if (item.kind !== "book") return [];
            const reviewBook = reviewByBook.get(item.book.bookSlug);
            count += reviewBook?.count ?? 0;
            return reviewBook?.chapters.map((c) => c.slug) ?? [];
          });

          return {
            level: stage.level,
            label: stage.label,
            count,
            chapterSlugs,
          };
        })
        .filter((stage) => stage.count > 0);

      return {
        slug: path.slug,
        title: path.title,
        count: stages.reduce((sum, stage) => sum + stage.count, 0),
        stages,
      };
    })
    .filter((path) => path.count > 0);
}

/**
 * 内容侧章节（bookSlug + 内容文件名 slug）→ 复习 slug 的桥接（供章节页「复习本章」入口）。
 *
 * 内容 slug 与复习 slug 并不相等，故用「书内多策略匹配」：
 *  ① 复习 slug 与内容文件名完全相等；
 *  ② 复习 slug = 书前缀 + 内容文件名（prof-cpu-... ↔ cpu-...）；
 *  ③ 复习章名与内容 frontmatter 标题（去空白）相等；
 *  ④ 以上都不中时，按「书内剩余未匹配项」的相对顺序兜底配对
 *     （每本书复习章数 = 内容章数，故剩一对一）。
 * 找不到返回 null（章节页据此不渲染入口）。
 */
export function reviewChapterSlugFor(
  bookSlug: string,
  contentChapterSlug: string,
): string | null {
  return (
    buildContentToReviewMap().get(`${bookSlug}/${contentChapterSlug}`) ?? null
  );
}

/** 缓存：同一构建期内桥接表只算一次（章节页每页都会调一次）。 */
let cachedContentToReview: Map<string, string> | null = null;

function buildContentToReviewMap(): Map<string, string> {
  if (cachedContentToReview) return cachedContentToReview;

  const allChapters = getAllChapters();

  // bare-slug → book（同 buildReviewScopeTree）
  const bareSlugBooks = new Map<string, string>();
  for (const c of allChapters) {
    if (
      c.bookSlug === "learnopengl" ||
      c.bookSlug === "android-advanced-decryption"
    ) {
      if (!bareSlugBooks.has(c.chapterSlug)) {
        bareSlugBooks.set(c.chapterSlug, c.bookSlug);
      }
    }
  }

  // 复习 slug 按书分组（仅有题的章；保持题库聚合顺序）
  const reviewByBook = new Map<string, string[]>();
  const seen = new Set<string>();
  for (const q of REVIEW_QUESTIONS) {
    if (seen.has(q.chapter)) continue;
    seen.add(q.chapter);
    const book = bookSlugForReviewSlug(q.chapter, bareSlugBooks);
    if (!book) continue;
    const list = reviewByBook.get(book) ?? [];
    list.push(q.chapter);
    reviewByBook.set(book, list);
  }

  // 内容章按书分组（getAllChapters 已是教学顺序）
  const contentByBook = new Map<
    string,
    Array<{ slug: string; title: string }>
  >();
  for (const c of allChapters) {
    const list = contentByBook.get(c.bookSlug) ?? [];
    list.push({ slug: c.chapterSlug, title: c.frontmatter.title });
    contentByBook.set(c.bookSlug, list);
  }

  // 复习 slug → 章名（标题策略用）
  const titleOf = (slug: string) =>
    CHAPTER_TITLES[slug as ReviewChapterSlug] ?? slug;

  const out = new Map<string, string>();

  for (const [book, contentChapters] of contentByBook) {
    const reviewSlugs = (reviewByBook.get(book) ?? []).slice();
    const used = new Set<string>();
    const resolve = (contentSlug: string, contentTitle: string) => {
      // ① 完全相等
      let pick = reviewSlugs.find((r) => !used.has(r) && r === contentSlug);
      // ② 前缀 + 文件名
      if (!pick) {
        pick = reviewSlugs.find((r) => {
          if (used.has(r)) return false;
          for (const [prefix] of PREFIX_TO_BOOK) {
            if (r === prefix + contentSlug) return true;
          }
          return false;
        });
      }
      // ③ 去空白标题相等
      if (!pick) {
        const nt = normalizeTitle(contentTitle);
        pick = reviewSlugs.find(
          (r) => !used.has(r) && normalizeTitle(titleOf(r)) === nt,
        );
      }
      return pick ?? null;
    };

    const remaining: Array<{ slug: string; title: string }> = [];
    for (const c of contentChapters) {
      const pick = resolve(c.slug, c.title);
      if (pick) {
        used.add(pick);
        out.set(`${book}/${c.slug}`, pick);
      } else {
        remaining.push(c);
      }
    }
    // ④ 书内剩余项按相对顺序兜底配对
    const leftover = reviewSlugs.filter((r) => !used.has(r));
    for (let i = 0; i < Math.min(remaining.length, leftover.length); i++) {
      used.add(leftover[i]);
      out.set(`${book}/${remaining[i].slug}`, leftover[i]);
    }
  }

  cachedContentToReview = out;
  return out;
}

/**
 * 某复习 slug 的题数（章节页算「复习本章（N 题）」用）。
 * 复习 slug 不存在或无题返回 0。
 */
export function reviewQuestionCountFor(reviewSlug: string): number {
  let n = 0;
  for (const q of REVIEW_QUESTIONS) if (q.chapter === reviewSlug) n++;
  return n;
}
