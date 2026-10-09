"use client";

import { useId, useState } from "react";

type Purpose = "locate" | "understand" | "apply";

const purposes: Record<
  Purpose,
  { label: string; question: string; artifact: string; step: string }
> = {
  locate: {
    label: "确认位置",
    question: "我手中的版本如何标出前言与章节顺序？",
    artifact: "版本信息 + 目录位置 + 页码（若适用）",
    step: "核对版权页与目录",
  },
  understand: {
    label: "理解文本",
    question: "我实际读到的段落在回答什么问题？",
    artifact: "一条带章节/页码位置的文本概括",
    step: "阅读并标记原文位置",
  },
  apply: {
    label: "联系实践",
    question: "哪一个工作问题值得用阅读所得继续检验？",
    artifact: "小规模行动 + 观察对象 + 复查日期",
    step: "试行并观察，不预设成功",
  },
};

export function Eex19PrefaceReadingMap() {
  const id = useId().replaceAll(":", "");
  const [purpose, setPurpose] = useState<Purpose>("locate");
  const selected = purposes[purpose];

  return (
    <section
      aria-label="前言阅读计划图"
      className="not-prose my-6 min-w-0 space-y-4 rounded-card border border-border p-4 text-primary"
    >
      <p className="text-sm font-semibold">选择本次阅读的主要目的</p>
      <div className="flex flex-wrap gap-2" role="group" aria-label="阅读目的">
        {(
          Object.entries(purposes) as [Purpose, (typeof purposes)[Purpose]][]
        ).map(([key, value]) => (
          <button
            key={key}
            type="button"
            aria-pressed={purpose === key}
            onClick={() => setPurpose(key)}
            className="min-h-10 rounded-control border border-border px-3 py-2 text-sm transition-colors hover:border-accent aria-pressed:border-accent aria-pressed:bg-elevated"
          >
            {value.label}
          </button>
        ))}
      </div>

      <svg
        aria-labelledby={`${id}-title ${id}-desc`}
        className="h-auto w-full"
        role="img"
        viewBox="0 0 720 126"
      >
        <title id={`${id}-title`}>从阅读目的到可复查产物</title>
        <desc id={`${id}-desc`}>
          先提出问题，再阅读核对，最后留下与目的相符的记录。当前选择：
          {selected.label}。
        </desc>
        <defs>
          <marker
            id={`${id}-arrow`}
            markerHeight="8"
            markerWidth="8"
            orient="auto"
            refX="7"
            refY="4"
          >
            <path d="M0 0 8 4 0 8z" fill="currentColor" />
          </marker>
        </defs>
        <g fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M190 62h142M390 62h142" markerEnd={`url(#${id}-arrow)`} />
          <rect x="20" y="27" width="170" height="70" rx="12" />
          <rect x="332" y="27" width="170" height="70" rx="12" />
          <rect x="532" y="27" width="168" height="70" rx="12" />
        </g>
        <g
          fill="currentColor"
          fontFamily="sans-serif"
          fontSize="16"
          textAnchor="middle"
        >
          <text x="105" y="57">
            问题
          </text>
          <text x="105" y="79" fontSize="12">
            读前说清目的
          </text>
          <text x="417" y="57">
            原书核对
          </text>
          <text x="417" y="79" fontSize="12">
            记录实际位置
          </text>
          <text x="616" y="57">
            留下产物
          </text>
          <text x="616" y="79" fontSize="12">
            结论不越证据
          </text>
        </g>
      </svg>

      <div
        aria-live="polite"
        className="grid gap-3 rounded-control border border-border bg-elevated p-3 text-sm sm:grid-cols-3"
      >
        <p>
          <span className="block text-xs text-secondary">读前问题</span>
          {selected.question}
        </p>
        <p>
          <span className="block text-xs text-secondary">读后产物</span>
          {selected.artifact}
        </p>
        <p>
          <span className="block text-xs text-secondary">下一步</span>
          {selected.step}
        </p>
      </div>
      <p className="text-xs text-secondary">
        图示为本站阅读规划，不是原书结构图，也不评价个人表现。
      </p>
    </section>
  );
}
