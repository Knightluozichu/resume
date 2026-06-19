// KaTeX 样式表只在教程区按需加载（HEL-19）：
// 仅 /learn/* 路由引入，不进首页/Hero 关键路径；纯静态自托管（Next 会随构建
// 复制 katex/dist/fonts 字体），无 CDN 依赖、SSG 离线可用。24KB，可接受。
import "katex/dist/katex.min.css";

import { getLearningPathTree } from "@/lib/content";

import { ChapterDrawer } from "./_components/chapter-drawer";
import { ChapterNav } from "./_components/chapter-nav";

/**
 * 教程区两栏外壳：左侧学习路径树 288px / 右侧（正文 max 72ch + 本页目录）。
 * lg 以下：左栏折叠为抽屉（见 ChapterDrawer）。
 *
 * 学习路径树由 content.getLearningPathTree() 在 Server 端生成：先按方向分组，
 * 再按初/中/高级承载书籍和待补项；桌面侧栏与移动抽屉复用同一棵树（同源）。
 * 当前路径/阶段/书籍展开 + 当前章高亮在 ChapterNav（client，usePathname）内完成。
 *
 * 本页 TOC（右栏）与上/下一章依赖具体章节的正文标题/位次，由章节 page 渲染
 * （见 [...slug]/page.tsx）——layout 不掌握 slug，故不在此渲染右栏。
 */
export default function LearnLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const paths = getLearningPathTree();

  return (
    <div className="flex flex-1 flex-col lg:flex-row">
      {/* lg+：静态左栏（w-72 = 288px）。data-pagefind-ignore：目录为重复导航 chrome，
          排除出搜索索引，避免每页都把整棵目录当正文（HEL-42）。 */}
      <aside
        data-pagefind-ignore
        className="hidden w-72 shrink-0 border-r border-border bg-elevated lg:block"
      >
        {/* top-12 与顶部导航高度 h-12 对齐；max-h 留出这 48px，内容超视口时
            侧栏内部纵向滚动（出现滚动条、可滚到最底篇章） */}
        <div className="sticky top-12 max-h-[calc(100vh-3rem)] overflow-y-auto px-4 py-8">
          <ChapterNav paths={paths} />
        </div>
      </aside>

      {/* lg 以下：汉堡按钮 + 抽屉（client 壳，章节树为 client 高亮组件） */}
      <ChapterDrawer>
        <ChapterNav paths={paths} />
      </ChapterDrawer>

      {/* 正文 + 本页目录区：由章节 page 自行排成「正文 72ch + 右栏 TOC」 */}
      {children}
    </div>
  );
}
