"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { type NavSection } from "@/lib/content";

/**
 * 左侧章节树（client 组件，HEL-21）。
 *
 * 树结构由 content.getChapterTree() 在 Server 端生成（按 SECTION_ORDER 分组、
 * 组内按 order），作为可序列化 props 传入；此处只负责：
 *  - 渲染 section 分组 + 两段式链接 /learn/<section>/<chapter>
 *  - 用 usePathname 比对当前章并高亮（这是唯一需要 client 的理由）
 *  - 草稿章（开发期才会出现在 sections 里）标注「草稿」
 *
 * 移动端抽屉与桌面侧栏复用同一棵树（同源，传同一份 sections）。
 * 颜色/间距/动效全部走 DESIGN token（硬规则 5）。
 */
export function ChapterNav({ sections }: { sections: NavSection[] }) {
  const pathname = usePathname();

  return (
    <nav aria-label="章节目录" className="flex flex-col gap-6">
      {sections.map((group) => (
        <div key={group.section}>
          <h2 className="px-2 text-xs font-medium text-secondary">
            {group.section}
          </h2>
          <ul className="mt-2 flex flex-col gap-1">
            {group.chapters.map((chapter) => {
              const active = pathname === chapter.href;
              return (
                <li key={chapter.href}>
                  <Link
                    href={chapter.href}
                    aria-current={active ? "page" : undefined}
                    className={`flex items-center gap-2 rounded-control px-2 py-1 transition-colors duration-(--duration-hover) ease-standard ${
                      active
                        ? "bg-elevated text-accent"
                        : "text-secondary hover:text-primary"
                    }`}
                  >
                    <span className="min-w-0 truncate">{chapter.title}</span>
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
        </div>
      ))}
    </nav>
  );
}
