import type { Metadata } from "next";

import { ReviewApp } from "@/components/review/review-app";
import {
  buildReviewPathScopeTree,
  buildReviewScopeTree,
} from "@/lib/review-scope";

/**
 * /review 复习页（Server Component，复习系统 Phase A + 范围复习）。
 *
 * 渲染客户端 <ReviewApp />——它内部用 next/dynamic(ssr:false) 懒加载引擎 + 题库，
 * 数据 code-split 不进首屏（硬规则 2/6 同款懒加载纪律）。
 *
 * 范围复习（按章/按书）：本 Server Component 用 buildReviewScopeTree() 在服务端把
 * 「有复习题」的书/章 + 题数算成纯 JSON 范围树下传给客户端引擎（content.ts 是
 * server-only/fs，绝不进客户端，故 join / 计数都在这层做好）。?chapter=<复习slug>
 * 作为初始范围；非法值（不在树里）退化为全库，避免脏 URL 把会话抽空。
 *
 * data-pagefind-ignore：复习是 app 而非内容，不进站内搜索索引（与 header/footer 同处理，HEL-42）。
 *
 * 布局：root layout 用 flex-col 把页脚推到底，本页 <main> 取 flex-1 占满中间。
 */

export const metadata: Metadata = {
  title: "复习 — remuse",
  description:
    "卡片问答 + 智能间隔复习：把每一章的概念、术语、练习刷成肌肉记忆。",
};

export default async function ReviewPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const tree = buildReviewScopeTree();
  const pathTree = buildReviewPathScopeTree(tree);
  const bookByChapter = new Map(
    tree.flatMap((book) =>
      book.chapters.map((chapter) => [chapter.slug, book.bookSlug] as const),
    ),
  );
  const validBooks = new Set(tree.map((book) => book.bookSlug));

  const params = await searchParams;
  const rawPath = params.path;
  const rawStage = params.stage;
  const rawBook = params.book;
  const rawChapter = params.chapter;
  const wantedPath = Array.isArray(rawPath) ? rawPath[0] : rawPath;
  const wantedStage = Array.isArray(rawStage) ? rawStage[0] : rawStage;
  const wantedBook = Array.isArray(rawBook) ? rawBook[0] : rawBook;
  const wantedChapter = Array.isArray(rawChapter) ? rawChapter[0] : rawChapter;

  const initialChapter =
    wantedChapter && bookByChapter.has(wantedChapter) ? wantedChapter : null;
  const initialBook = initialChapter
    ? (bookByChapter.get(initialChapter) ?? null)
    : wantedBook && validBooks.has(wantedBook)
      ? wantedBook
      : null;
  const selectedPath =
    !initialChapter && !initialBook && wantedPath
      ? (pathTree.find((path) => path.slug === wantedPath) ?? null)
      : null;
  const initialPath = selectedPath?.slug ?? null;
  const initialStage =
    selectedPath && wantedStage
      ? (selectedPath.stages.find((stage) => stage.level === wantedStage)
          ?.level ?? null)
      : null;

  return (
    <main data-pagefind-ignore className="min-w-0 flex-1 px-4 py-12 lg:px-8">
      <div className="mx-auto w-full max-w-[72ch]">
        <h1 className="text-2xl font-semibold">复习</h1>
        <p className="mt-2 text-secondary">
          可以按学习路径、整本书或具体章节开刷。答对的题间隔变长、答错的题会回到错题集，进度只存在你这台设备的浏览器里。
        </p>
        <div className="mt-8">
          <ReviewApp
            scopeTree={tree}
            pathTree={pathTree}
            initialPath={initialPath}
            initialStage={initialStage}
            initialBook={initialBook}
            initialChapter={initialChapter}
          />
        </div>
      </div>
    </main>
  );
}
