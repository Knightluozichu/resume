"use client";

import type { TeachingTimeline } from "./use-teaching-timeline";

/**
 * <TimelineControls> —— 「可控教学动画原语」之标准控制条 UI（HEL-170）。
 *
 * 接收 useTeachingTimeline 的返回值，渲染 DESIGN §动效原则 2 要求的三件套：
 *  - ⏮ 上一步 / ▶⏸ 播放暂停 / ⏭ 下一步
 *  - 可拖动进度条（input[type=range]，键盘可操作）
 *  - 当前步 label 文本 + 步点指示
 *
 * 配色全部走 DESIGN token（accent / border / secondary / primary），hover/active 过渡
 * 只用功能动效 120ms 档（duration-(--duration-hover)）+ 标准缓动 ease-standard（硬规则 5）。
 *
 * reduced-motion：useTeachingTimeline 已让时间线默认暂停态加载；此处据 reducedMotion
 * 隐藏「自动播放」语义的播放/暂停按钮（自动播放对 reduced 用户无意义），但保留单步与
 * 拖进度——用户仍可逐帧看完整张图。
 *
 * 可访问：每个按钮带 aria-label；进度条 aria-label + aria-valuetext（朗读当前步）。
 */

/** 教学动画各 beat 的时长（ms），集中一处具名常量，禁止散落魔法数字（硬规则 5）。 */
export const TEACHING_BEAT_MS = 700;

type TimelineControlsProps = {
  /** useTeachingTimeline 的返回值。 */
  timeline: TeachingTimeline;
  /** 控制条下方可选说明（一句话点题当前演示）。 */
  caption?: string;
  /**
   * 步点 label → 展示文案映射（可选）。缺省时步点用序号、进度条朗读用 label 原名。
   * 通常传 steps 的 caption。
   */
  labelText?: Readonly<Record<string, string>>;
};

export function TimelineControls({
  timeline,
  caption,
  labelText,
}: TimelineControlsProps) {
  const {
    toggle,
    stepNext,
    stepPrev,
    goToStep,
    seek,
    isPlaying,
    progress,
    currentStep,
    labels,
    reducedMotion,
  } = timeline;

  const last = labels.length - 1;
  const currentLabel = labels[currentStep] ?? "";
  const currentText = labelText?.[currentLabel] ?? currentLabel;
  // 进度条用整数百分比，键盘 ←/→ 每次 ±1%，避免浮点 value 抖动。
  const pct = Math.round(progress * 100);

  return (
    <div className="not-prose mt-4">
      {/* 步点条：当前步高亮（与 Stepper 同款视觉语言） */}
      {labels.length > 1 && (
        <ol className="mb-3 flex flex-wrap gap-2" aria-hidden="true">
          {labels.map((label, i) => (
            <li key={label}>
              <button
                type="button"
                onClick={() => goToStep(i)}
                aria-label={`跳到第 ${i + 1} 步：${labelText?.[label] ?? label}`}
                className={`rounded-control border px-2 py-1 text-xs transition-colors duration-(--duration-hover) ease-standard ${
                  i === currentStep
                    ? "border-accent text-accent"
                    : i < currentStep
                      ? "border-border text-primary"
                      : "border-border text-secondary hover:text-primary"
                }`}
              >
                {i + 1}
              </button>
            </li>
          ))}
        </ol>
      )}

      {/* 进度条：拖动 = 拖进度（直接 seek 到任意时间点） */}
      <input
        type="range"
        min={0}
        max={100}
        step={1}
        value={pct}
        aria-label="演示进度"
        aria-valuetext={`第 ${currentStep + 1} 步，共 ${labels.length} 步：${currentText}`}
        onChange={(e) => seek(Number(e.target.value) / 100)}
        className="mdx-range h-1 w-full cursor-pointer appearance-none rounded-control bg-border accent-accent"
      />

      {/* 控制栏：上一步 / 播放暂停 / 下一步 */}
      <div className="mt-4 flex items-center justify-center gap-2">
        <button
          type="button"
          onClick={stepPrev}
          disabled={currentStep === 0}
          aria-label="上一步"
          className="rounded-control border border-border px-3 py-2 text-xs text-secondary transition-colors duration-(--duration-hover) ease-standard hover:border-accent hover:text-primary disabled:cursor-not-allowed disabled:opacity-40"
        >
          <span aria-hidden="true">⏮</span> 上一步
        </button>

        {/* 播放/暂停：reduced-motion 下隐藏（自动播放无意义，单步即可看完） */}
        {!reducedMotion && labels.length > 1 && (
          <button
            type="button"
            onClick={toggle}
            aria-label={isPlaying ? "暂停" : "播放"}
            className="rounded-control border border-border px-3 py-2 text-xs text-accent transition-colors duration-(--duration-hover) ease-standard hover:border-accent"
          >
            <span aria-hidden="true">{isPlaying ? "⏸" : "▶"}</span>{" "}
            {isPlaying ? "暂停" : "播放"}
          </button>
        )}

        <button
          type="button"
          onClick={stepNext}
          disabled={currentStep === last}
          aria-label="下一步"
          className="rounded-control border border-border px-3 py-2 text-xs text-secondary transition-colors duration-(--duration-hover) ease-standard hover:border-accent hover:text-primary disabled:cursor-not-allowed disabled:opacity-40"
        >
          下一步 <span aria-hidden="true">⏭</span>
        </button>
      </div>

      {/* 当前步文案 */}
      <p
        className="mt-3 text-center text-xs text-secondary"
        aria-live="polite"
      >
        {`第 ${currentStep + 1} / ${labels.length} 步`}
        {currentText ? ` · ${currentText}` : ""}
      </p>

      {caption && (
        <p className="mt-1 text-center text-xs text-secondary">{caption}</p>
      )}
    </div>
  );
}
