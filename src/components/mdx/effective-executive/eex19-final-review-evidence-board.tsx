import React from "react";

const stages = [
  { title: "职责", detail: "结果与接收者", tone: "border-sky-300 bg-sky-50" },
  {
    title: "时间",
    detail: "记录与取舍",
    tone: "border-indigo-300 bg-indigo-50",
  },
  {
    title: "贡献",
    detail: "交付与采用",
    tone: "border-emerald-300 bg-emerald-50",
  },
  { title: "决策", detail: "边界与异议", tone: "border-amber-300 bg-amber-50" },
  { title: "复核", detail: "证据与修正", tone: "border-rose-300 bg-rose-50" },
];

export function Eex19FinalReviewEvidenceFlow() {
  return (
    <figure
      aria-labelledby="eex19-final-review-board-title"
      className="my-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
      data-visual-kind="eex19-final-review-evidence-board"
    >
      <figcaption
        className="mb-4 text-sm font-semibold text-slate-800"
        id="eex19-final-review-board-title"
      >
        工作周期的五个检查点（本站原创复盘图）
      </figcaption>
      <ol className="grid gap-3 sm:grid-cols-5">
        {stages.map((stage, index) => (
          <li
            className={`relative min-h-24 rounded-xl border p-3 ${stage.tone}`}
            key={stage.title}
          >
            <span className="block text-xs text-slate-500">
              CHECK {String(index + 1).padStart(2, "0")}
            </span>
            <span className="mt-1 block font-bold text-slate-900">
              {stage.title}
            </span>
            <span className="mt-1 block text-sm text-slate-700">
              {stage.detail}
            </span>
          </li>
        ))}
      </ol>
      <p className="mt-4 text-xs leading-5 text-slate-600">
        依次核对职责、时间、贡献、决策与复核；发现缺口时回到证据，而不是以忙碌程度打分。
      </p>
    </figure>
  );
}

export function Eex19FinalReviewOutcomeMap() {
  const outcomes = [
    { title: "活动", description: "做了什么", color: "bg-slate-100" },
    { title: "交付", description: "形成什么", color: "bg-sky-100" },
    { title: "采用", description: "谁实际使用", color: "bg-emerald-100" },
    { title: "结果", description: "出现何种变化", color: "bg-amber-100" },
  ];

  return (
    <figure
      aria-labelledby="eex19-final-review-outcome-title"
      className="my-8 rounded-2xl border border-slate-200 bg-slate-50 p-5"
      data-visual-kind="eex19-final-review-outcome-map"
    >
      <figcaption
        className="mb-4 font-semibold text-slate-800"
        id="eex19-final-review-outcome-title"
      >
        从行动到结果：四类证据不可互相替代
      </figcaption>
      <ol className="grid gap-2 sm:grid-cols-4">
        {outcomes.map((outcome, index) => (
          <li
            className="rounded-xl border border-white p-4"
            key={outcome.title}
          >
            <span
              className={`inline-block rounded-lg px-2 py-1 text-sm font-bold ${outcome.color}`}
            >
              {index + 1}. {outcome.title}
            </span>
            <span className="mt-3 block text-sm text-slate-700">
              {outcome.description}
            </span>
          </li>
        ))}
      </ol>
    </figure>
  );
}
