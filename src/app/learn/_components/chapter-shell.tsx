import { type TocHeading } from "@/lib/rehype-collect-headings";

import { PageToc } from "./page-toc";

/**
 * 教程区「正文 + 本页目录」两列外壳（Server Component，HEL-21）。
 *
 * 与 layout 的左侧章节树并排；负责：
 *  - 正文栏：宽度上限 72ch（DESIGN.md §字体 / §间距与布局）
 *  - 右栏：本页 TOC（w-50=200px，lg 以下隐藏，沿用现有断点）
 *
 * headings 缺省（如 /learn 索引页）时不渲染右栏，正文照常居中。
 * 颜色/间距全部走 DESIGN token（硬规则 5）。
 */
export function ChapterShell({
  children,
  headings = [],
}: {
  children: React.ReactNode;
  headings?: TocHeading[];
}) {
  return (
    <>
      <main className="min-w-0 flex-1 px-4 py-12 lg:px-8">
        <article className="mx-auto w-full max-w-[72ch]">{children}</article>
      </main>

      {headings.length > 0 && (
        <aside className="hidden w-50 shrink-0 lg:block">
          <div className="sticky top-12 px-4 py-8">
            <PageToc headings={headings} />
          </div>
        </aside>
      )}
    </>
  );
}
