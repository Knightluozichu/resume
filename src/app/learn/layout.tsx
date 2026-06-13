// KaTeX 样式表只在教程区按需加载（HEL-19）：
// 仅 /learn/* 路由引入，不进首页/Hero 关键路径；纯静态自托管（Next 会随构建
// 复制 katex/dist/fonts 字体），无 CDN 依赖、SSG 离线可用。24KB，可接受。
import "katex/dist/katex.min.css";

import { ChapterDrawer } from "./_components/chapter-drawer";
import { ChapterNav } from "./_components/chapter-nav";

/**
 * 教程区三栏壳：左章节树 240px / 中正文 max 72ch / 右本页目录 200px
 * lg 以下：右栏隐藏，左栏折叠为抽屉（见 ChapterDrawer）
 */
export default function LearnLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-1 flex-col lg:flex-row">
      {/* lg+：静态左栏（w-60 = 240px） */}
      <aside className="hidden w-60 shrink-0 border-r border-border bg-elevated lg:block">
        {/* top-12 与顶部导航高度 h-12 对齐 */}
        <div className="sticky top-12 px-4 py-8">
          <ChapterNav />
        </div>
      </aside>

      {/* lg 以下：汉堡按钮 + 抽屉（client 壳，章节树仍为 Server Component） */}
      <ChapterDrawer>
        <ChapterNav />
      </ChapterDrawer>

      {/* 正文栏：宽度上限 72ch（DESIGN.md §字体 / §间距与布局） */}
      <main className="min-w-0 flex-1 px-4 py-12 lg:px-8">
        <article className="mx-auto w-full max-w-[72ch]">{children}</article>
      </main>

      {/* lg+：右侧本页目录（w-50 = 200px），占位列表 */}
      <aside className="hidden w-50 shrink-0 lg:block">
        <div className="sticky top-12 px-4 py-8">
          <nav aria-label="本页目录">
            <h2 className="text-xs font-medium text-secondary">本页目录</h2>
            <ul className="mt-2 flex flex-col gap-1 text-xs text-secondary">
              <li>（占位）小节一</li>
              <li>（占位）小节二</li>
              <li>（占位）小节三</li>
            </ul>
          </nav>
        </div>
      </aside>
    </div>
  );
}
