// KaTeX 样式表只在教程区按需加载（HEL-19）：
// 仅 /learn/* 路由引入，不进首页/Hero 关键路径；纯静态自托管（Next 会随构建
// 复制 katex/dist/fonts 字体），无 CDN 依赖、SSG 离线可用。24KB，可接受。
import "katex/dist/katex.min.css";

import { getLibraryNavigationTree } from "@/lib/content";

import { ChapterDrawer } from "./_components/chapter-drawer";
import { LibraryNav } from "./_components/library-nav";

/**
 * 教程区两栏外壳：左侧图书目录 288px / 右侧（正文 max 72ch + 本页目录）。
 * lg 以下：左栏折叠为抽屉（见 ChapterDrawer）。
 *
 * 完整书库与学习路径树都在 Server 端生成；桌面侧栏与移动抽屉复用同一份数据。
 * LibraryNav 默认展示全部图书，也可切回精选学习路径；当前书籍展开与章节高亮
 * 在 client 端通过 usePathname 完成。
 *
 * 本页 TOC（右栏）与上/下一章依赖具体章节的正文标题/位次，由章节 page 渲染
 * （见 [...slug]/page.tsx）——layout 不掌握 slug，故不在此渲染右栏。
 */
export default function LearnLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const paths = getLibraryNavigationTree();

  return (
    <div className="flex flex-1 flex-col lg:flex-row">
      {/* 单份目录同时承担桌面侧栏与移动抽屉，避免重复序列化导航数据。 */}
      <ChapterDrawer>
        <LibraryNav paths={paths} />
      </ChapterDrawer>

      {/* 正文 + 本页目录区：由章节 page 自行排成「正文 72ch + 右栏 TOC」 */}
      {children}
    </div>
  );
}
