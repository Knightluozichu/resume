import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import rehypeKatex from "rehype-katex";
import rehypePrettyCode, {
  type Options as RehypePrettyCodeOptions,
} from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkMath from "remark-math";

import { Comments } from "@/components/chapter/comments";
import { Attribution } from "@/components/mdx/attribution";
import { mdxComponents } from "@/components/mdx/mdx-components";
import { getAdjacentChapters, getAllChapters, getChapter } from "@/lib/content";
import {
  rehypeCollectHeadings,
  type TocHeading,
} from "@/lib/rehype-collect-headings";

import { ChapterPager } from "../_components/chapter-pager";
import { ChapterShell } from "../_components/chapter-shell";

/**
 * 章节动态路由（HEL-18）
 *
 * slug = [sectionSlug, chapterSlug]，对应 content/learn/<section>/<chapter>.mdx。
 * generateStaticParams 在构建期枚举全部章节 → 每章产出一张静态页（SSG，○ Static）。
 *
 * 本卡仅跑通管线：.mdx 只用基础 markdown（标题/段落/列表/代码块），
 * 自定义组件（Objectives/CodeTabs/Attribution 等）由 HEL-20 接入，
 * 侧边栏改造由 HEL-21 接入。
 *
 * HEL-19 在此管线上接入：
 *  - rehype-pretty-code（基于 shiki）做代码高亮，主题 github-dark，
 *    与 DESIGN --code-bg #0D1117 协调；输出 data-* 属性供 globals.css token 化样式钩取。
 *  - remark-math + rehype-katex 做数学公式（display 居中独立块 / 行内同色无背景）。
 *  KaTeX 样式表只在 /learn 布局按需引入（见 learn/layout.tsx），不进首页关键路径。
 */

// 全静态：禁止任何动态参数兜底，未在 generateStaticParams 中的 slug 直接 404
export const dynamicParams = false;

/**
 * shiki 高亮配置：github-dark 主题（背景 #0D1117，正与 DESIGN --code-bg 一致），
 * keepBackground:false 让主题不写死内联背景色——背景统一交给 globals.css 的
 * --code-bg token 控制，避免第三方硬编码色覆盖 DESIGN（硬规则 5）。
 * 语言由 mdx 代码块 fence 标注按需加载（glsl/cpp/c/ts/tsx/bash/json 等均内置支持）。
 */
const rehypePrettyCodeOptions: RehypePrettyCodeOptions = {
  theme: "github-dark",
  keepBackground: false,
};

type Params = { slug: string[] };

export function generateStaticParams(): Params[] {
  // 开发期把草稿章也注册成路由，否则配合 dynamicParams=false，draft 章在 dev 下也会 404，
  // 无法预览（getChapter / getChapterTree 已是同一 NODE_ENV 条件）。生产构建仍只产出
  // 非草稿章（includeDraft 默认 false），硬规则 7 不受影响。
  const includeDraft = process.env.NODE_ENV !== "production";
  return getAllChapters({ includeDraft }).map((c) => ({
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

  // rehypeCollectHeadings 就地填充本数组：编译时从正文 h2/h3 提取本页 TOC，
  // 已排除自定义组件容器内部的标题（如 Objectives 的「学习目标」）。
  const headings: TocHeading[] = [];

  const { content } = await compileMDX({
    source: chapter.source,
    // HEL-20：注入结构教学组件（Objectives/CodeTabs/Tab/Exercises/Answer/
    // Callout/ShaderDemo）。HEL-21：Attribution 改为「按章绑定」——把本章 frontmatter
    // 的 sourceUrl 闭包进组件，.mdx 内写 <Attribution />（无表达式）即可，
    // 不再需要把 frontmatter 作为 scope 暴露给 MDX 表达式（scope 已移除）。
    components: {
      ...mdxComponents,
      Attribution: (props) => (
        <Attribution sourceUrl={chapter.frontmatter.sourceUrl} {...props} />
      ),
    },
    options: {
      parseFrontmatter: false,
      // HEL-25：重启用 blockJS:false。着色器/示例代码是「作者手写、必须用 MDX
      // 表达式（{...}）传给组件 prop」的内容——典型如 <ShaderDemo frag={`#version
      // 300 es ...`} />，没有干净的替代写法（不同于 Attribution 那种单一 frontmatter
      // 字段，可被组件闭包绑定）。HEL-21 收紧时一并默认了 blockJS:true，会把这些
      // {表达式} 整段拦掉 → frag 实际为 undefined → ShaderDemo 编译报错。
      // 安全性兜底：内容均为仓库内可信 .mdx（draft:false 须经总监 review 才发布），
      // 且 next-mdx-remote 默认 blockDangerousJS:true 仍会拦截 eval/Function/process
      // 等危险用法，blockJS:false 仅放行普通表达式求值。
      blockJS: false,
      mdxOptions: {
        // $..$ / $$..$$ → math 节点（remark）→ KaTeX HTML（rehype）
        remarkPlugins: [remarkMath],
        rehypePlugins: [
          [rehypePrettyCode, rehypePrettyCodeOptions],
          rehypeKatex,
          // 先收集正文标题并写 id；再用 rehype-slug 为其余标题补 id（已存在 id 不覆盖）
          () => rehypeCollectHeadings(headings),
          rehypeSlug,
        ],
      },
    },
  });

  const { prev, next } = getAdjacentChapters(
    chapter.sectionSlug,
    chapter.chapterSlug,
  );

  return (
    <ChapterShell headings={headings}>
      <h1 className="text-2xl font-semibold">{chapter.frontmatter.title}</h1>
      <p className="mt-2 text-secondary">{chapter.frontmatter.description}</p>
      {/* 正文容器：max-w 72ch 由 ChapterShell 提供；prose 样式由 globals.css token 化 */}
      <div className="prose mt-8">{content}</div>
      <ChapterPager prev={prev} next={next} />
      {/* 章末讨论区（HEL-43）：giscus 评论，client 叶子壳 + IntersectionObserver 懒加载，
          不进首屏关键路径（硬规则 2）；page.tsx 仍为 Server Component。 */}
      <Comments />
    </ChapterShell>
  );
}
