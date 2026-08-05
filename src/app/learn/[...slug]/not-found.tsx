import Link from "next/link";

import { getAllChapters } from "@/lib/content";

/**
 * 章节 404 增强页（HEL-48 书化）：当 /learn/<book>/<section>/<chapter> 中的
 * 任一段不匹配任何章节时渲染。若 book 段合法，列出该书全部可用章节，
 * 让误输 slug 的用户可以直接点进正确页面，而不是死在空白 404。
 */
export default async function LearnNotFound({
  params,
}: {
  params?: Promise<{ slug: string[] }>;
}) {
  // not-found 组件可能在无动态路由上下文时被全局调用（如顶层 404 兜底），
  // params 可能为 undefined——此时退化为通用提示，不依赖 slug。
  const slug = (await params?.catch(() => undefined))?.slug ?? [];
  const bookSlug = slug?.[0];
  const chapters = getAllChapters();
  const bookChapters = chapters
    .filter((c) => c.bookSlug === bookSlug)
    .sort((a, b) => a.frontmatter.order - b.frontmatter.order);

  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-16">
      <p className="text-sm text-secondary">404 · 章节不存在</p>
      <h1 className="mt-2 text-2xl font-semibold text-primary">
        {bookChapters.length > 0 ? `《${bookSlug}》里没有这个页面` : "页面不存在"}
      </h1>
      <p className="mt-3 text-sm leading-relaxed text-secondary">
        {bookChapters.length > 0
          ? "你访问的章节路径不存在，可能是拼写错误。这本书共有以下章节："
          : "你访问的地址不存在。请检查路径，或从书籍首页进入。"}
      </p>

      {bookChapters.length > 0 && (
        <ul className="mt-6 flex flex-col gap-2">
          {bookChapters.map((c) => (
            <li key={`${c.sectionSlug}/${c.chapterSlug}`}>
              <Link
                href={`/learn/${c.bookSlug}/${c.sectionSlug}/${c.chapterSlug}`}
                className="rounded-control border border-border px-3 py-2 text-sm text-primary transition-colors hover:border-accent hover:text-accent"
              >
                {c.sectionSlug} · {c.chapterSlug} — {c.frontmatter.title}
              </Link>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-8">
        <Link href="/" className="text-sm text-accent hover:underline">
          ← 返回首页
        </Link>
      </div>
    </div>
  );
}
