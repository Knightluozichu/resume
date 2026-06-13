import Link from "next/link";

import { type AdjacentChapters } from "@/lib/content";

/**
 * 章末「← 上一章 / 下一章 →」导航卡（Server Component，HEL-21）。
 *
 * prev/next 由 content.getAdjacentChapters 按全局教学顺序给出；
 * 首章无 prev、末章无 next，对应侧不渲染（用占位 div 撑住两端对齐）。
 * 颜色/间距/圆角/动效全部走 DESIGN token（硬规则 5）。
 */
export function ChapterPager({ prev, next }: AdjacentChapters) {
  if (!prev && !next) return null;

  return (
    <nav
      aria-label="章节翻页"
      className="mt-12 flex items-stretch justify-between gap-4 border-t border-border pt-8"
    >
      {prev ? (
        <Link
          href={prev.href}
          rel="prev"
          className="group flex max-w-[48%] flex-col gap-1 rounded-card border border-border p-4 transition-colors duration-(--duration-hover) ease-standard hover:border-accent"
        >
          <span className="text-xs text-secondary">← 上一章</span>
          <span className="text-sm text-primary transition-colors duration-(--duration-hover) ease-standard group-hover:text-accent">
            {prev.title}
          </span>
        </Link>
      ) : (
        <div aria-hidden="true" />
      )}

      {next ? (
        <Link
          href={next.href}
          rel="next"
          className="group flex max-w-[48%] flex-col items-end gap-1 rounded-card border border-border p-4 text-right transition-colors duration-(--duration-hover) ease-standard hover:border-accent"
        >
          <span className="text-xs text-secondary">下一章 →</span>
          <span className="text-sm text-primary transition-colors duration-(--duration-hover) ease-standard group-hover:text-accent">
            {next.title}
          </span>
        </Link>
      ) : (
        <div aria-hidden="true" />
      )}
    </nav>
  );
}
