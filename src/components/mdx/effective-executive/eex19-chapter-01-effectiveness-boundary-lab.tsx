"use client";

import { useId, useState } from "react";

type CaseId = "title" | "activity" | "handoff" | "safety";
type Prediction = "enough" | "incomplete";
type Action = "count" | "ask" | "pause";

const cases: Record<
  CaseId,
  {
    label: string;
    evidence: string;
    claim: string;
    prediction: Prediction;
    next: Action;
    result: string;
  }
> = {
  title: {
    label: "有经理头衔，但只有自我评价",
    evidence: "头衔和自我评价不能说明具体责任、授权或结果。",
    claim: "该头衔足以证明此人有权批准相关决定。",
    prediction: "incomplete",
    next: "ask",
    result: "先澄清责任、授权、接收者及可复核的工作证据。",
  },
  activity: {
    label: "完成了很多任务，但没有采用记录",
    evidence: "活动数量可说明做过什么，不能单独说明产出是否被使用。",
    claim: "团队工作已产生可确认的实际结果。",
    prediction: "incomplete",
    next: "ask",
    result: "询问接收者如何使用交付物，并约定后续观察时间。",
  },
  handoff: {
    label: "专家建议已交付，决策者和执行者明确",
    evidence: "交付与责任分工已有记录；采用情况和后续结果仍待复核。",
    claim: "交付和责任分工已经明确，结果尚未验证。",
    prediction: "enough",
    next: "count",
    result: "记录决定、执行责任和期限；到期后检查采用证据与未达成原因。",
  },
  safety: {
    label: "推进方案可能越过安全或授权边界",
    evidence: "边界风险优先于进度；不能用更多产出来抵消未处理的风险。",
    claim: "当前方案可以按原计划继续推进。",
    prediction: "incomplete",
    next: "pause",
    result: "暂停相关行动，保护受影响者，并按组织流程升级审查。",
  },
};

const actions: { id: Action; label: string }[] = [
  { id: "count", label: "记录行动与复核日期" },
  { id: "ask", label: "询问接收者并澄清权限" },
  { id: "pause", label: "暂停并升级风险" },
];

export function EexEffectivenessBoundaryLab() {
  const instanceId = useId().replaceAll(":", "");
  const [caseId, setCaseId] = useState<CaseId>("handoff");
  const [prediction, setPrediction] = useState<Prediction | "">("");
  const [action, setAction] = useState<Action | "">("");
  const [revealed, setRevealed] = useState(false);
  const scenario = cases[caseId];
  const predictionFits = prediction === scenario.prediction;
  const actionFits = action === scenario.next;

  function reset() {
    setCaseId("handoff");
    setPrediction("");
    setAction("");
    setRevealed(false);
  }

  return (
    <section
      aria-label="有效性证据边界模拟"
      className="not-prose my-6 min-w-0 space-y-4 rounded-card border border-border p-4 text-primary"
    >
      <h3 className="text-lg font-semibold">意见怎样越过交接边界？</h3>
      <p className="text-sm text-secondary">
        虚构案例：先看证据，再选下一步。这里的“足够”只表示足够支持当前判断，不是对个人或团队的评分。
      </p>

      <div className="grid min-w-0 gap-3 sm:grid-cols-2">
        <label className="min-w-0 text-sm">
          情境
          <select
            className="mt-1 block min-h-11 w-full rounded-control border border-border bg-surface px-3 py-2 text-primary"
            value={caseId}
            onChange={(event) => {
              setCaseId(event.target.value as CaseId);
              setPrediction("");
              setAction("");
              setRevealed(false);
            }}
          >
            {Object.entries(cases).map(([id, item]) => (
              <option key={id} value={id}>
                {item.label}
              </option>
            ))}
          </select>
        </label>
        <div className="rounded-control border border-border bg-surface p-3 text-sm">
          <p className="font-medium">当前可见证据</p>
          <p className="mt-1 text-secondary">{scenario.evidence}</p>
          <p className="mt-2 font-medium">待判断：{scenario.claim}</p>
        </div>
      </div>

      <svg
        aria-labelledby={`${instanceId}-title ${instanceId}-desc`}
        className="h-auto w-full"
        role="img"
        viewBox="0 0 720 150"
      >
        <title id={`${instanceId}-title`}>专业意见的交接路径</title>
        <desc id={`${instanceId}-desc`}>
          专家提供判断，经授权决策者确认后交给执行者；接收者反馈结果，边界风险可触发暂停。
        </desc>
        <defs>
          <marker
            id={`${instanceId}-arrow`}
            markerHeight="8"
            markerWidth="8"
            orient="auto"
            refX="7"
            refY="4"
          >
            <path d="M0 0 8 4 0 8z" fill="currentColor" />
          </marker>
        </defs>
        <g
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          markerEnd={`url(#${instanceId}-arrow)`}
        >
          <path d="M165 55H265" />
          <path d="M405 55H505" />
          <path d="M575 83v35H165V83" strokeDasharray="6 5" />
        </g>
        {["专家：提供判断", "授权决策者：确认", "执行者：采取行动"].map(
          (label, index) => {
            const x = [20, 265, 505][index];
            return (
              <g key={label}>
                <rect
                  fill="var(--bg-elevated)"
                  height="56"
                  rx="10"
                  stroke="currentColor"
                  width="150"
                  x={x}
                  y="27"
                />
                <text
                  fill="currentColor"
                  fontSize="15"
                  textAnchor="middle"
                  x={x + 75}
                  y="61"
                >
                  {label}
                </text>
              </g>
            );
          },
        )}
        <text
          fill="currentColor"
          fontSize="13"
          textAnchor="middle"
          x="360"
          y="140"
        >
          接收者反馈：采用情况与后续结果仍待观察
        </text>
      </svg>

      <fieldset className="space-y-2">
        <legend className="font-medium">
          你的预测：现有证据足以支持上方待判断的结论吗？
        </legend>
        {[
          ["enough", "足以支持"],
          ["incomplete", "不足以支持"],
        ].map(([value, label]) => (
          <label
            key={value}
            className="flex min-h-11 items-center gap-2 text-sm"
          >
            <input
              checked={prediction === value}
              name={`${instanceId}-prediction`}
              onChange={() => {
                setPrediction(value as Prediction);
                setRevealed(false);
              }}
              type="radio"
              value={value}
            />
            {label}
          </label>
        ))}
      </fieldset>

      <fieldset className="space-y-2">
        <legend className="font-medium">选择下一步行动</legend>
        {actions.map((item) => (
          <label
            key={item.id}
            className="flex min-h-11 items-center gap-2 text-sm"
          >
            <input
              checked={action === item.id}
              name={`${instanceId}-action`}
              onChange={() => {
                setAction(item.id);
                setRevealed(false);
              }}
              type="radio"
              value={item.id}
            />
            {item.label}
          </label>
        ))}
      </fieldset>

      <div className="flex flex-wrap gap-2">
        <button
          className="min-h-11 rounded-control bg-accent px-4 py-2 text-sm text-on-accent disabled:cursor-not-allowed disabled:opacity-50"
          disabled={!prediction || !action}
          onClick={() => setRevealed(true)}
          type="button"
        >
          查看复盘提示
        </button>
        <button
          className="min-h-11 rounded-control border border-border px-4 py-2 text-sm"
          onClick={reset}
          type="button"
        >
          重置情境
        </button>
      </div>

      {revealed && (
        <p
          aria-live="polite"
          className="rounded-control border border-border p-3 text-sm"
        >
          {predictionFits
            ? "证据判断与范围相符。"
            : "证据判断与范围不符；请对照可见证据和待判断结论。"}
          {actionFits ? " " : "行动还没有处理关键缺口。"}
          {scenario.result}
        </p>
      )}
    </section>
  );
}
