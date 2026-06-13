"use client";

import { useState } from "react";

import {
  CHAPTER_TITLES,
  LEVEL_LABELS,
  type ReviewLevel,
  type ReviewQuestion,
} from "@/data/review-questions";

import { usePrefersReducedMotion } from "./use-prefers-reduced-motion";

/**
 * <FlashCard>：单张复习卡（'use client'）。
 *
 * 正面 = 问题 + 等级徽标 + 章节名；背面 = 答案。点击 / Enter / Space 翻面。
 * 卡片下方「掌握了 ✓ / 没掌握 ✗」两个按钮 → 记录并推进到下一张（由父组件重置为正面）。
 *
 * 3D 翻转（DESIGN §动效原则 1，页面级 320ms + ease-standard）：
 *  transform: rotateY(180deg) + transform-style: preserve-3d + backface-visibility: hidden。
 * reduced-motion（DESIGN §动效原则 4）显式降级——usePrefersReducedMotion 判定为真时
 * 去掉 transition（瞬切），不依赖 CSS 媒体查询单独兜底。
 *
 * 颜色 / 间距 / 圆角 / 时长全部走 DESIGN token（硬规则 5）。
 * 等级徽标语义色：L1 绿 success / L2 蓝（accent，本站冷色强调）/ L3 琥珀 warning / L4 红 danger。
 */

/** 等级 → 徽标语义 token 类名（边框 + 文字同色，小面积，符合 DESIGN「语义色仅小面积」）。 */
const LEVEL_BADGE_CLASS: Record<ReviewLevel, string> = {
  1: "border-success text-success",
  2: "border-accent text-accent",
  3: "border-warning text-warning",
  4: "border-danger text-danger",
};

type FlashCardProps = {
  question: ReviewQuestion;
  /** 本组进度（第 index+1 / total 张），用于卡顶提示。 */
  index: number;
  total: number;
  onAnswer: (correct: boolean) => void;
};

export function FlashCard({
  question,
  index,
  total,
  onAnswer,
}: FlashCardProps) {
  const reduced = usePrefersReducedMotion();
  // 父组件给每张卡传了 key={question.id}：换题即整卡重挂载，flipped 自动回到初始 false，
  // 无需 effect 同步重置正面（避开「effect 体内同步 setState」规则）。
  const [flipped, setFlipped] = useState(false);

  const chapterTitle = CHAPTER_TITLES[question.chapter];
  const levelLabel = LEVEL_LABELS[question.level];

  return (
    <div className="flex flex-col gap-4">
      {/* 卡顶：本组进度 */}
      <div className="flex items-center justify-between text-xs text-secondary">
        <span className="font-mono tabular-nums">
          {index + 1} / {total}
        </span>
        <span>{flipped ? "答案" : "问题（点击卡片看答案）"}</span>
      </div>

      {/* 翻转舞台：透视容器 + 内层 3D 旋转层 */}
      <div className="review-card-scene min-h-64">
        <button
          type="button"
          onClick={() => setFlipped((f) => !f)}
          aria-pressed={flipped}
          aria-label={
            flipped ? "查看问题（点击翻回正面）" : "查看答案（点击翻到背面）"
          }
          className="review-card-flipper rounded-card outline-none focus-visible:ring-2 focus-visible:ring-accent-glow"
          style={{
            transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
            // reduced-motion 显式降级为瞬切；否则页面级 320ms + 统一缓动（DESIGN token）。
            transition: reduced
              ? "none"
              : "transform var(--duration-page) var(--ease-standard)",
          }}
        >
          {/* 正面：问题 */}
          <div className="review-card-face flex flex-col gap-4 rounded-card border border-border bg-elevated p-6">
            <div className="flex items-center justify-between gap-3">
              <span
                className={`inline-flex items-center rounded-control border px-2 py-1 text-xs font-medium ${LEVEL_BADGE_CLASS[question.level]}`}
              >
                {levelLabel}
              </span>
              <span className="text-xs text-secondary">{chapterTitle}</span>
            </div>
            <p className="text-lg leading-relaxed text-primary">
              {question.question}
            </p>
          </div>

          {/* 背面：答案（预旋转 180°，靠 backface-visibility 隐藏正面时露出） */}
          <div className="review-card-face review-card-back flex flex-col gap-3 rounded-card border border-accent bg-elevated p-6">
            <span className="text-xs text-accent">答案 · {chapterTitle}</span>
            <p className="text-base leading-relaxed whitespace-pre-line text-primary">
              {question.answer}
            </p>
          </div>
        </button>
      </div>

      {/* 掌握 / 没掌握：语义色 success / danger，键盘可达（button + aria-label） */}
      <div className="flex items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => onAnswer(false)}
          aria-label="没掌握，标记为错题"
          className="rounded-control border border-border px-4 py-2 text-sm text-secondary transition-colors duration-(--duration-hover) ease-standard hover:border-danger hover:text-danger"
        >
          ✗ 没掌握
        </button>
        <button
          type="button"
          onClick={() => onAnswer(true)}
          aria-label="掌握了"
          className="rounded-control border border-border px-4 py-2 text-sm text-secondary transition-colors duration-(--duration-hover) ease-standard hover:border-success hover:text-success"
        >
          ✓ 掌握了
        </button>
      </div>
    </div>
  );
}
