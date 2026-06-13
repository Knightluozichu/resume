"use client";

import { useId, useState, type ReactNode } from "react";

/**
 * 通用内联交互控件 + Demo 容器（HEL-23）。
 *
 * 导出：
 *  - <Slider>：受控/非受控数值滑块，驱动 CSS/SVG 轻量演示（无 WebGL）
 *  - <Toggle>：受控/非受控开关
 *  - <DemoStage>：DESIGN「交互 Demo 容器」气质卡片（⚡可交互标签 + 可选重置）
 *
 * 为何 client：滑块/开关是真交互（受控状态 + 拖动/点击），符合「client 只用在真需交互处」。
 * 这些控件本身无装饰动画——仅 hover/focus 走功能动效 token；reduced-motion 下
 * globals.css 已把 --duration-* 置 0，自动降为瞬时（DESIGN §动效原则 4）。
 *
 * 受控/非受控：传 value/checked + onChange 即受控；否则组件内部用 useState 自管，
 * 仍可传 defaultValue/defaultChecked 设初值。这样作者既能放进 .mdx 自驱动小演示，
 * 也能在更大的 client 组合里受控。
 *
 * 颜色/间距/圆角/动效全部走 DESIGN token（硬规则 5）。
 */

// ============================ Slider ============================

type SliderProps = {
  /** 受控值；传了即受控（须配 onChange） */
  value?: number;
  /** 非受控初值 */
  defaultValue?: number;
  onChange?: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  /** 控件左侧标签（无障碍 aria-label 同时使用） */
  label?: string;
  /** 是否在右侧显示当前值（默认显示） */
  showValue?: boolean;
  /** 值的格式化（如带单位） */
  format?: (value: number) => string;
};

export function Slider({
  value,
  defaultValue = 0,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  label,
  showValue = true,
  format = (v) => String(v),
}: SliderProps) {
  const isControlled = value !== undefined;
  const [internal, setInternal] = useState(defaultValue);
  const current = isControlled ? value : internal;
  const id = useId();

  const handle = (next: number) => {
    if (!isControlled) setInternal(next);
    onChange?.(next);
  };

  return (
    <div className="flex items-center gap-3">
      {label && (
        <label htmlFor={id} className="text-xs text-secondary">
          {label}
        </label>
      )}
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={current}
        aria-label={label}
        aria-valuetext={format(current)}
        onChange={(e) => handle(Number(e.target.value))}
        className="mdx-range h-1 flex-1 cursor-pointer appearance-none rounded-control bg-border accent-accent"
      />
      {showValue && (
        <span className="w-12 text-right font-mono text-xs tabular-nums text-primary">
          {format(current)}
        </span>
      )}
    </div>
  );
}

// ============================ Toggle ============================

type ToggleProps = {
  /** 受控开关；传了即受控（须配 onChange） */
  checked?: boolean;
  /** 非受控初值 */
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
};

export function Toggle({
  checked,
  defaultChecked = false,
  onChange,
  label,
}: ToggleProps) {
  const isControlled = checked !== undefined;
  const [internal, setInternal] = useState(defaultChecked);
  const on = isControlled ? checked : internal;

  const toggle = () => {
    const next = !on;
    if (!isControlled) setInternal(next);
    onChange?.(next);
  };

  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-label={label}
      onClick={toggle}
      className="inline-flex items-center gap-2 text-xs text-secondary"
    >
      <span
        className={`relative inline-flex h-4 w-7 shrink-0 items-center rounded-full border transition-colors duration-(--duration-hover) ease-standard ${
          on ? "border-accent bg-accent-glow" : "border-border bg-border"
        }`}
      >
        <span
          className="inline-block h-3 w-3 rounded-full bg-primary transition-transform duration-(--duration-hover) ease-standard"
          style={{
            transform: on ? "translateX(0.75rem)" : "translateX(0.125rem)",
          }}
        />
      </span>
      {label && (
        <span className={on ? "text-primary" : undefined}>{label}</span>
      )}
    </button>
  );
}

// ============================ DemoStage ============================

type DemoStageProps = {
  children: ReactNode;
  /** 标题（可选，显示在⚡标签后） */
  title?: string;
  /** 控件区（Slider/Toggle 等），渲染在舞台下方 */
  controls?: ReactNode;
  /** 重置回调；传了才显示右上角重置按钮 */
  onReset?: () => void;
};

/**
 * <DemoStage>：交互 Demo 容器卡片（DESIGN §组件气质速查）。
 *  - --bg-elevated 底 + 1px border + 12px 圆角
 *  - 左上角「⚡ 可交互」标签（accent 小面积）
 *  - 右上角可选重置按钮
 * 作者把可被 Slider/Toggle 驱动的 SVG/CSS 内容放进 children，控件放 controls。
 */
export function DemoStage({
  children,
  title,
  controls,
  onReset,
}: DemoStageProps) {
  return (
    <div className="mdx-demo-stage my-6 rounded-card border border-border bg-elevated p-6">
      <div className="mb-4 flex items-center justify-between gap-3">
        <span className="inline-flex items-center gap-1 rounded-control border border-border px-2 py-1 text-xs font-medium text-accent">
          <span aria-hidden="true">⚡</span>
          可交互
        </span>
        {title && (
          <span className="flex-1 text-xs text-secondary">{title}</span>
        )}
        {onReset && (
          <button
            type="button"
            onClick={onReset}
            aria-label="重置演示"
            className="rounded-control border border-border px-2 py-1 text-xs text-secondary transition-colors duration-(--duration-hover) ease-standard hover:border-accent hover:text-primary"
          >
            重置
          </button>
        )}
      </div>

      {/* 舞台：放 SVG / CSS 演示内容 */}
      <div className="flex min-h-32 items-center justify-center">
        {children}
      </div>

      {/* 控件区 */}
      {controls && (
        <div className="mt-4 flex flex-col gap-3 border-t border-border pt-4">
          {controls}
        </div>
      )}
    </div>
  );
}
