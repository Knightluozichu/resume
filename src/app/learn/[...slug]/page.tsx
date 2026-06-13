import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import rehypeKatex from "rehype-katex";
import rehypePrettyCode, {
  type Options as RehypePrettyCodeOptions,
} from "rehype-pretty-code";
import remarkMath from "remark-math";

import { mdxComponents } from "@/components/mdx/mdx-components";
import { getAllChapters, getChapter } from "@/lib/content";

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
    // HEL-20：注入结构教学组件（Objectives/CodeTabs/Tab/Exercises/Answer/
    // Attribution/Callout/ShaderDemo），使 .mdx 直接用这些标签。
    components: mdxComponents,
    options: {
      parseFrontmatter: false,
      // frontmatter 作为 scope 变量暴露给 MDX 表达式（如
      // <Attribution sourceUrl={frontmatter.sourceUrl} />）；
      // frontmatter 由 lib/content 解析、此处仅透传（来源单一）。
      scope: { frontmatter: chapter.frontmatter },
      // 允许 MDX 内的 {表达式}（next-mdx-remote 默认 blockJS:true 会禁用
      // {frontmatter.sourceUrl} 这类表达式）。内容为仓库内可信作者撰写，非用户输入；
      // 仍保留 blockDangerousJS:true（默认）拦截 eval/Function/process 等危险用法。
      blockJS: false,
      mdxOptions: {
        // $..$ / $$..$$ → math 节点（remark）→ KaTeX HTML（rehype）
        remarkPlugins: [remarkMath],
        rehypePlugins: [
          [rehypePrettyCode, rehypePrettyCodeOptions],
          rehypeKatex,
        ],
      },
    },
  });

  return (
    <>
      <h1 className="text-2xl font-semibold">{chapter.frontmatter.title}</h1>
      <p className="mt-2 text-secondary">{chapter.frontmatter.description}</p>
      {/* 正文容器复用 /learn 布局的正文区（max-w 72ch）；prose 样式由 globals.css token 化 */}
      <div className="prose mt-8">{content}</div>
    </>
  );
}
