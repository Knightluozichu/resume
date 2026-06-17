"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { type NavBook } from "@/lib/content";

/**
 * 左侧三层折叠树（client 组件，HEL-48）。
 *
 * 树结构由 content.getChapterTree() 在 Server 端生成（按 BOOK_ORDER 分书、
 * 书内按 SECTION_ORDER 分组、组内按 order），作为可序列化 props 传入；
 * 此处只负责：
 *  - 渲染「书（可折叠头）→ section 分组 → 三段式章节链接」
 *  - 用 usePathname 取出当前 URL 的 bookSlug：当前书默认展开 + 书名高亮，其余书收起
 *  - 点书头切换展开 / 收起（client state）
 *  - 用 usePathname 比对当前章并高亮（这是需要 client 的理由之一）
 *  - 草稿章（开发期才会出现在树里）标注「草稿」
 *
 * SSR 安全：初始展开态由 pathname 推导（与服务端 prerender 的 pathname 一致），
 * 无 hydration mismatch；折叠交互只在挂载后由用户点击触发。
 * 移动端抽屉与桌面侧栏复用同一棵树（同源，传同一份 books）。
 * 颜色/间距/动效全部走 DESIGN token，折叠过渡用 --duration-expand
 * （prefers-reduced-motion 下 globals.css 已把该 token 降为 0ms，即瞬时）。
 */
export function ChapterNav({ books }: { books: NavBook[] }) {
  const pathname = usePathname();

  // 从当前 URL 推导所看的书：/learn/<bookSlug>/<sectionSlug>/<chapterSlug>
  const currentBookSlug = pathname.split("/")[2] ?? null;

  // 初始展开集：当前所看的书默认展开，其余收起。由 pathname 推导 → SSR/CSR 一致。
  const [expanded, setExpanded] = useState<Record<string, boolean>>(() => {
    const init: Record<string, boolean> = {};
    for (const book of books) {
      init[book.bookSlug] = book.bookSlug === currentBookSlug;
    }
    return init;
  });

  const toggle = (bookSlug: string) =>
    setExpanded((prev) => ({ ...prev, [bookSlug]: !prev[bookSlug] }));

  // 初始 section 展开集（key = `${bookSlug}::${section}`，section 名为中文）：
  // 仅「包含当前章的那个 section」默认展开（该组里存在某 chapter.href === pathname），
  // 其余 section 收起 → 侧栏紧凑、聚焦当前位置。由 pathname 推导 → SSR/CSR 一致。
  const [sectionExpanded, setSectionExpanded] = useState<
    Record<string, boolean>
  >(() => {
    const init: Record<string, boolean> = {};
    for (const book of books) {
      for (const group of book.sections) {
        const key = `${book.bookSlug}::${group.section}`;
        init[key] = group.chapters.some((c) => c.href === pathname);
      }
    }
    return init;
  });

  const toggleSection = (key: string) =>
    setSectionExpanded((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <nav aria-label="章节目录" className="flex flex-col gap-4">
      {books.map((book) => {
        const isCurrentBook = book.bookSlug === currentBookSlug;
        const isOpen = expanded[book.bookSlug] ?? false;
        const panelId = `book-${book.bookSlug}`;

        return (
          <div key={book.bookSlug}>
            {/* 书头：button + aria-expanded（无障碍折叠控件） */}
            <button
              type="button"
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => toggle(book.bookSlug)}
              className={`flex w-full items-center gap-2 rounded-control px-2 py-1 text-left text-lg font-semibold transition-colors duration-(--duration-hover) ease-standard ${
                isCurrentBook ? "text-accent" : "text-primary hover:text-accent"
              }`}
            >
              {/* 折叠指示：▾ 展开 / ▸ 收起；transform 旋转，走 expand 档动效 */}
              <span
                aria-hidden="true"
                className="inline-block shrink-0 text-xs text-secondary transition-transform duration-(--duration-expand) ease-standard"
                style={{
                  transform: isOpen ? "rotate(0deg)" : "rotate(-90deg)",
                }}
              >
                ▾
              </span>
              <span className="min-w-0 truncate">{book.bookTitle}</span>
            </button>

            {/* 书下的 section 分组（折叠面板）。收起时不渲染，保持 DOM 精简。 */}
            {isOpen && (
              <div id={panelId} className="mt-2 flex flex-col gap-4 pl-2">
                {book.sections.map((group) => {
                  const sectionKey = `${book.bookSlug}::${group.section}`;
                  const sectionOpen = sectionExpanded[sectionKey] ?? false;
                  const sectionPanelId = `section-${book.bookSlug}-${group.section}`;

                  return (
                    <div key={group.section}>
                      {/* section 头：仿书层折叠范式，子层级样式（比书头小一档）。
                          标题保持 heading 语义（h2），交互落在内层 button。 */}
                      <h2>
                        <button
                          type="button"
                          aria-expanded={sectionOpen}
                          aria-controls={sectionPanelId}
                          onClick={() => toggleSection(sectionKey)}
                          className="flex w-full items-center gap-2 rounded-control px-2 py-1 text-left text-xs font-medium text-secondary transition-colors duration-(--duration-hover) ease-standard hover:text-primary"
                        >
                          {/* 折叠指示：▾ 展开 / ▸ 收起；transform 旋转，走 expand 档动效 */}
                          <span
                            aria-hidden="true"
                            className="inline-block shrink-0 text-secondary transition-transform duration-(--duration-expand) ease-standard"
                            style={{
                              transform: sectionOpen
                                ? "rotate(0deg)"
                                : "rotate(-90deg)",
                            }}
                          >
                            ▾
                          </span>
                          <span className="min-w-0 truncate">
                            {group.section}
                          </span>
                        </button>
                      </h2>
                      {/* section 下章节列表（折叠面板）。收起时不渲染，与书层一致。 */}
                      {sectionOpen && (
                        <ul
                          id={sectionPanelId}
                          className="mt-2 flex flex-col gap-1"
                        >
                          {group.chapters.map((chapter) => {
                            const active = pathname === chapter.href;
                            return (
                              <li key={chapter.href}>
                                <Link
                                  href={chapter.href}
                                  aria-current={active ? "page" : undefined}
                                  className={`flex items-center gap-2 rounded-control px-2 py-1 text-base transition-colors duration-(--duration-hover) ease-standard ${
                                    active
                                      ? "bg-elevated text-accent"
                                      : "text-secondary hover:text-primary"
                                  }`}
                                >
                                  <span className="min-w-0 truncate">
                                    {chapter.title}
                                  </span>
                                  {chapter.draft && (
                                    <span className="shrink-0 rounded-control border border-border px-1 text-[10px] leading-4 text-secondary">
                                      草稿
                                    </span>
                                  )}
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );
}
