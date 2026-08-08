"use client";

import { useState } from "react";

type Incident = {
  label: string;
  items: string;
  firstQuestion: string;
  evidence: string;
};

const INCIDENTS: readonly Incident[] = [
  {
    label: "资源复制后 double free",
    items: "Items 11 · 13 · 14 · 15 · 29",
    firstQuestion: "先预测 ownership 是否闭合，再区分 self-assignment、raw access 与异常回滚。",
    evidence: "画 acquire/release identity graph，注入复制中第 N 步异常，并运行 sanitizer 与 copy-and-swap 对照。",
  },
  {
    label: "Base pointer 下 dispatch 错误",
    items: "Items 33 · 34 · 36 · 37 · 53",
    firstQuestion: "先预测 static type 提供的 default argument，再观察 dynamic type 选择的 virtual body。",
    evidence: "分别通过 Derived/Base views 调用，显式与省略参数各测一次，并打开 override 与 warning 检查。",
  },
  {
    label: "模板、分配与工具链一起漂移",
    items: "Items 41-55",
    firstQuestion: "先预测问题属于 deduction、allocation contract 还是 compiler portability，再缩小实验。",
    evidence: "保留正反 compile tests、OOM/constructor failure、零 warning 基线、多 compiler job 和性能预算。",
  },
];

export function EfcFinalReviewLab() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [evidenceVisible, setEvidenceVisible] = useState(false);
  const active = INCIDENTS[activeIndex];

  const reset = () => {
    setActiveIndex(0);
    setEvidenceVisible(false);
  };

  return (
    <section
      aria-label="Effective C++ 跨 Item 根因实验"
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated"
    >
      <header className="flex flex-wrap items-start justify-between gap-3 border-b border-border p-4">
        <div>
          <p className="text-xs font-medium text-accent">跨条款复盘实验</p>
          <h2 className="mt-1 text-lg font-semibold text-primary">从症状回溯根因链</h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-secondary">
            选择一个事故，先预测第一道边界，再展开能让结论可复核的证据。
          </p>
        </div>
        <button
          type="button"
          aria-label="重置跨 Item 根因实验"
          onClick={reset}
          className="min-h-11 rounded-control border border-border px-4 py-2 text-sm font-medium text-secondary transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          重置实验
        </button>
      </header>

      <div className="border-b border-border p-4">
        <div role="tablist" aria-label="Effective C++ 事故类型" className="grid gap-2 md:grid-cols-3">
          {INCIDENTS.map((incident, index) => {
            const selected = index === activeIndex;
            return (
              <button
                key={incident.label}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-pressed={selected}
                onClick={() => {
                  setActiveIndex(index);
                  setEvidenceVisible(false);
                }}
                className={`min-h-11 rounded-control border px-3 py-3 text-left text-sm transition-colors ${
                  selected
                    ? "border-accent bg-accent/10 text-accent"
                    : "border-border text-secondary hover:border-accent hover:text-primary"
                }`}
              >
                {incident.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid gap-0 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="border-b border-border p-4 lg:border-r lg:border-b-0">
          <p className="text-xs font-medium text-secondary">关联范围</p>
          <p className="mt-2 text-base font-semibold text-primary">{active.items}</p>
          <p className="mt-4 text-sm leading-relaxed text-secondary">{active.firstQuestion}</p>
        </div>
        <div className="p-4">
          <div role="status" aria-live="polite" className="rounded-control border border-border bg-bg p-4">
            <p className="text-xs font-medium text-accent">当前诊断</p>
            <p className="mt-2 text-sm leading-relaxed text-primary">{active.firstQuestion}</p>
          </div>
          <button
            type="button"
            aria-pressed={evidenceVisible}
            onClick={() => setEvidenceVisible((value) => !value)}
            className={`mt-3 min-h-11 w-full rounded-control border px-4 py-2 text-left text-sm font-medium transition-colors ${
              evidenceVisible
                ? "border-success bg-success/10 text-success"
                : "border-border text-secondary hover:border-success hover:text-primary"
            }`}
          >
            {evidenceVisible ? "收起证据链" : "展开证据链"}
          </button>
          {evidenceVisible && (
            <div className="mt-3 rounded-control border border-success bg-bg p-4">
              <p className="text-xs font-medium text-success">可复核产物</p>
              <p className="mt-2 text-sm leading-relaxed text-primary">{active.evidence}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
