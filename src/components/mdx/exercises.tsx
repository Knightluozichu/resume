"use client";

import { useId, useState } from "react";

/**
 * 练习区组件（chapter-spec §八 小结与练习）。
 *
 * 导出两个组件：
 *  - <Exercises>：练习区容器（题目列表经 children 传入）
 *  - <Answer>：单题答案折叠披露（disclosure）；默认收起，展开走 200ms expand 档 + ease-standard
 *
 * 为何 client：折叠是真交互（受控展开 + 高度过渡），符合「client 只用在真需交互处」。
 * 展开动效：grid-template-rows 0fr→1fr 过渡（只动布局尺寸，不动 opacity/transform 之外的属性
 * 这里属布局过渡），时长用 --duration-expand token；reduced-motion 下该 token 已被 globals.css
 * 置 0ms（DESIGN.md §动效原则 4），自动降为瞬时，无需组件内再判断。
 *
 * 颜色/间距/圆角/动效全部走 DESIGN token（硬规则 5）。
 */

export function Exercises({ children }: { children: React.ReactNode }) {
  return (
    <section
      aria-label="练习"
      className="mdx-exercises my-6 rounded-card border border-border bg-elevated p-6"
    >
      <h2 className="mb-3 text-base font-semibold text-primary">练习</h2>
      {children}
    </section>
  );
}

export function Answer({
  children,
  label = "查看答案",
}: {
  children: React.ReactNode;
  label?: string;
}) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  return (
    <div className="mdx-answer my-3">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 rounded-control border border-border px-3 py-2 text-xs text-secondary transition-colors duration-(--duration-hover) ease-standard hover:border-accent hover:text-primary"
      >
        <svg
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className="h-3 w-3 transition-transform duration-(--duration-expand) ease-standard"
          style={{ transform: open ? "rotate(90deg)" : "rotate(0deg)" }}
        >
          <path d="M6 4l4 4-4 4" />
        </svg>
        {label}
      </button>

      {/* grid 0fr→1fr 高度过渡：内层 overflow-hidden 承载内容 */}
      <div
        id={panelId}
        role="region"
        className="grid transition-[grid-template-rows] duration-(--duration-expand) ease-standard"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <div aria-hidden={!open} className="pt-2 text-primary">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
