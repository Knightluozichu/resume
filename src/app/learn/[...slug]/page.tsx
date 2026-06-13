import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";

import { getAllChapters, getChapter } from "@/lib/content";

/**
 * 章节动态路由（HEL-18）
 *
 * slug = [sectionSlug, chapterSlug]，对应 content/learn/<section>/<chapter>.mdx。
 * generateStaticParams 在构建期枚举全部章节 → 每章产出一张静态页（SSG，○ Static）。
 *
 * 本卡仅跑通管线：.mdx 只用基础 markdown（标题/段落/列表/代码块），
 * 自定义组件（Objectives/CodeTabs/Attribution 等）由 HEL-20 接入，
 * shiki/katex 由 HEL-19 接入，侧边栏改造由 HEL-21 接入。
 */

// 全静态：禁止任何动态参数兜底，未在 generateStaticParams 中的 slug 直接 404
export const dynamicParams = false;

type Params = { slug: string[] };

export function generateStaticParams(): Params[] {
  return getAllChapters().map((c) => ({
    slug: [c.sectionSlug, c.chapterSlug],
  }));
}

function resolveChapter(slug: string[]) {
  // 章节路由严格两段：section / chapter
  if (slug.length !== 2) return null;
  const [sectionSlug, chapterSlug] = slug;
  return getChapter(sectionSlug, chapterSlug);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const chapter = resolveChapter(slug);
  if (!chapter) return {};
  return {
    title: `${chapter.frontmatter.title} — remuse`,
    description: chapter.frontmatter.description,
  };
}

export default async function ChapterPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const chapter = resolveChapter(slug);
  if (!chapter) notFound();

  const { content } = await compileMDX({
    source: chapter.source,
    options: { parseFrontmatter: false },
  });

  return (
    <>
      <h1 className="text-2xl font-semibold">{chapter.frontmatter.title}</h1>
      <p className="mt-2 text-secondary">{chapter.frontmatter.description}</p>
      {/* 正文容器复用 /learn 布局的正文区（max-w 72ch）；富文本样式 token 化 */}
      <div className="mt-8 flex flex-col gap-4">{content}</div>
    </>
  );
}
