"use client";

import { useCallback, useId, useRef, useState, type ReactNode } from "react";

/**
 * <CompareSlider>：左右拖动对比两层内容（chapter-spec「对比型」知识点，
 * 如 Phong vs Blinn-Phong、开/关某效果）。
 *
 * 结构：right 层铺满底；left 层叠在上面，用 clip-path 按百分比裁切左半边；
 * 中缝手柄拖动改变裁切百分比。
 *
 * 交互三态：
 *  - 拖动：pointer 事件（鼠标/触摸统一走 PointerEvent，touch-action:none 防滚动冲突）
 *  - 键盘：手柄 role=slider + 方向键 ±step（aria-valuenow/min/max）
 *  - 触摸：PointerEvent 天然覆盖
 *
 * 为何 client：拖动是真交互。无装饰动画（拖动需即时跟手，不加过渡）；
 * hover/focus 走功能动效 token，reduced-motion 已由 globals.css 降零，无需组件内判断。
 *
 * 颜色/间距/圆角全部走 DESIGN token（硬规则 5）。
 */

type CompareSliderProps = {
  left: ReactNode;
  right: ReactNode;
  leftLabel?: string;
  rightLabel?: string;
  /** 初始分割位置（百分比 0–100），默认 50 */
  initial?: number;
  /** 键盘步长（百分比），默认 5 */
  step?: number;
};

export function CompareSlider({
  left,
  right,
  leftLabel,
  rightLabel,
  initial = 50,
  step = 5,
}: CompareSliderProps) {
  const [pos, setPos] = useState(clamp(initial));
  const containerRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);
  const id = useId();

  const updateFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const ratio = (clientX - rect.left) / rect.width;
    setPos(clamp(ratio * 100));
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    draggingRef.current = true;
    (e.target as Element).setPointerCapture?.(e.pointerId);
    updateFromClientX(e.clientX);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!draggingRef.current) return;
    updateFromClientX(e.clientX);
  };

  const stopDrag = () => {
    draggingRef.current = false;
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      setPos((p) => clamp(p - step));
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      setPos((p) => clamp(p + step));
    } else if (e.key === "Home") {
      e.preventDefault();
      setPos(0);
    } else if (e.key === "End") {
      e.preventDefault();
      setPos(100);
    }
  };

  return (
    <figure className="mdx-compare my-6">
      <div
        ref={containerRef}
        className="relative aspect-video w-full touch-none overflow-hidden rounded-card border border-border bg-elevated select-none"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={stopDrag}
        onPointerCancel={stopDrag}
      >
        {/* right 层：铺满底 */}
        <div className="absolute inset-0 flex items-center justify-center">
          {right}
        </div>
        {rightLabel && (
          <span className="absolute top-2 right-2 rounded-control border border-border bg-bg/80 px-2 py-1 text-xs text-secondary">
            {rightLabel}
          </span>
        )}

        {/* left 层：clip 左半 */}
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
        >
          {left}
        </div>
        {leftLabel && (
          <span
            className="absolute top-2 left-2 rounded-control border border-border bg-bg/80 px-2 py-1 text-xs text-secondary"
            style={{ opacity: pos > 12 ? 1 : 0 }}
          >
            {leftLabel}
          </span>
        )}

        {/* 中缝 + 手柄 */}
        <div
          className="absolute inset-y-0 w-px -translate-x-1/2 bg-accent"
          style={{ left: `${pos}%` }}
          aria-hidden="true"
        />
        <div
          role="slider"
          tabIndex={0}
          aria-label="对比分割滑块"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(pos)}
          aria-controls={id}
          onKeyDown={onKeyDown}
          className="absolute top-1/2 grid h-8 w-8 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize place-items-center rounded-full border border-accent bg-bg outline-none focus-visible:ring-2 focus-visible:ring-accent-glow"
          style={{ left: `${pos}%` }}
        >
          <svg
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            className="h-4 w-4 text-accent"
          >
            <path d="M6 4 2 8l4 4M10 4l4 4-4 4" />
          </svg>
        </div>
      </div>
    </figure>
  );
}

function clamp(v: number): number {
  return Math.min(100, Math.max(0, v));
}
