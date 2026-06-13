"use client";

import { useEffect, useState } from "react";

/**
 * lg 以下的章节树抽屉（最小 client 壳：只包汉堡按钮 + 抽屉容器）。
 * 章节树本体经 children 传入，仍是 Server Component。
 * 开合动效：200ms expand 档 + ease-standard，只动 transform。
 */
export function ChapterDrawer({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  // Escape 关闭抽屉
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <>
      {/* lg 以下：汉堡按钮工具条 + 抽屉本体均为重复导航 chrome，data-pagefind-ignore
          排除出搜索索引（HEL-42） */}
      <div
        data-pagefind-ignore
        className="flex items-center border-b border-border px-4 py-2 lg:hidden"
      >
        <button
          type="button"
          aria-label={open ? "关闭章节目录" : "打开章节目录"}
          aria-expanded={open}
          aria-controls="learn-chapter-drawer"
          onClick={() => setOpen((v) => !v)}
          className="flex items-center gap-2 rounded-control border border-border p-2 text-secondary transition-colors duration-(--duration-hover) ease-standard hover:border-accent hover:text-primary"
        >
          <svg
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            aria-hidden="true"
            className="h-4 w-4"
          >
            <path d="M2 4h12M2 8h12M2 12h12" />
          </svg>
          <span className="text-xs">章节</span>
        </button>
      </div>

      {/* 透明点击层：点抽屉外关闭（不做染色遮罩——层级只靠 border + 背景明度） */}
      {open && (
        <div
          aria-hidden="true"
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-20 lg:hidden"
        />
      )}

      {/* 抽屉本体：从左滑入，只动 transform */}
      <aside
        data-pagefind-ignore
        id="learn-chapter-drawer"
        onClick={(e) => {
          // 点中章节链接后自动收起
          if ((e.target as HTMLElement).closest("a")) setOpen(false);
        }}
        className={`fixed inset-y-0 left-0 z-30 w-60 overflow-y-auto border-r border-border bg-elevated px-4 py-8 transition-transform duration-(--duration-expand) ease-standard lg:hidden ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {children}
      </aside>
    </>
  );
}
