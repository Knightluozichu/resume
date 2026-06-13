import { termSlug } from "@/lib/term-slug";

/**
 * <Glossary> + <GlossaryItem term="...">人话释义</GlossaryItem>：章末「人话词典」
 * （chapter-spec §十 名词解释）。位置固定章末、出处声明之前。
 *
 * Server Component（纯展示，无交互）——与正文 <Term> 高亮一一对应：
 * 每个被 <Term> 高亮的专业名词在此有一条 <GlossaryItem>，释义面向零基础。
 *
 * 锚点对齐：GlossaryItem 的 id 用与 <Term> 同一个 termSlug(term) 算（或显式 id 覆盖），
 * 故正文术语旁的「↡」锚链接能精确跳到此处对应词条。
 * scroll-margin-top（避开 sticky 顶栏 h-12=48px）由 globals.css 的
 * .mdx-glossary-item 规则统一给（与正文标题同款 3rem）。
 *
 * 难懂名词（如「光栅化」）的 children 可嵌 <Stepper>/<Figure> 把它动画掰碎
 * （spec §十 泛化）——这些子组件照常经 MDX map 注入。
 *
 * 颜色/间距/圆角全部走 DESIGN token（硬规则 5）。
 */
export function Glossary({ children }: { children: React.ReactNode }) {
  return (
    <section
      aria-label="名词解释"
      className="mdx-glossary my-8 rounded-card border border-border bg-elevated p-6"
    >
      <h2 className="mb-1 text-base font-semibold text-primary">名词解释</h2>
      <p className="mb-4 text-xs text-secondary">
        本章出现的专业名词，用大白话再讲一遍。
      </p>
      <dl className="space-y-4">{children}</dl>
    </section>
  );
}

export function GlossaryItem({
  term,
  id,
  children,
}: {
  /** 词条名（与正文 <Term> 高亮文本一致） */
  term: string;
  /** 可选：显式锚点 id（默认按 term 文本 termSlug 生成，与 Term 锚点对齐） */
  id?: string;
  /** 人话释义；可含 <Stepper>/<Figure> 把难懂名词掰碎 */
  children: React.ReactNode;
}) {
  const anchor = id ?? termSlug(term);
  return (
    <div className="mdx-glossary-item" id={anchor}>
      <dt className="font-semibold text-accent">{term}</dt>
      <dd className="mt-1 ml-0 text-primary">{children}</dd>
    </div>
  );
}
