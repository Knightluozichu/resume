"use client";

import { useRef, useState } from "react";

import {
  TEACHING_BEAT_MS,
  TimelineControls,
} from "../anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "../anim/use-teaching-timeline";

const C = {
  bg: "var(--bg)",
  elevated: "var(--bg-elevated)",
  border: "var(--border)",
  primary: "var(--text-primary)",
  secondary: "var(--text-secondary)",
  accent: "var(--accent)",
  danger: "var(--danger)",
  success: "var(--success)",
  warning: "var(--warning)",
} as const;

const T = TEACHING_BEAT_MS;

const STEPS: readonly TeachingStep[] = [
  { label: "freeze", caption: "冻结源码、运行时、输入与版本边界" },
  { label: "bind", caption: "逐项对齐作用域、this、原型、类型与异步节点" },
  { label: "replay", caption: "先预测，再重放中间绑定、值、调用点与队列" },
  { label: "fault", caption: "只注入一个受控故障并停在首个偏离点" },
  { label: "recover", caption: "清理旧绑定、旧任务与旧资源后重放同一输入" },
  { label: "signoff", caption: "以跨主题证据和版本账本签发终局验收" },
];

const LABEL_TEXT: Readonly<Record<string, string>> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

const STAGE_COPY = [
  [
    "1 · 冻结验收边界",
    "保存源码、运行时、输入、规范版本和预期输出；历史目录与现代能力分栏记录。",
    "证据：source snapshot + version ledger",
  ],
  [
    "2 · 对齐六类机制",
    "把作用域、this、原型、类型、任务顺序和版本差异放回对应正式目录主题。",
    "证据：topic map + owner / call-site",
  ],
  [
    "3 · 重放中间轨迹",
    "不要只看最后输出；逐步记录绑定、接收者、转换值、原型查找和队列位置。",
    "证据：evidence trace + 可复现预测",
  ],
  [
    "4 · 注入单一故障",
    "选择空值、错误接收者、旧能力或迟到任务之一，停在第一个不一致处。",
    "证据：first divergence + 停止原因",
  ],
  [
    "5 · 清理后恢复",
    "清除旧绑定、旧值、旧任务和旧资源，再用完全相同输入重放，不接受 stale work。",
    "证据：state clean + recovery replay",
  ],
  [
    "6 · 签发终局结论",
    "只有目录、机制、故障、恢复与版本证据都能交接，才签发 final review。",
    "证据：sign-off + 可迁移解释",
  ],
] as const;

const TOPICS = [
  ["scope", "作用域", "binding"],
  ["this", "this", "call-site"],
  ["proto", "原型", "lookup"],
  ["types", "类型", "coercion"],
  ["async", "异步", "queue"],
  ["version", "版本", "ledger"],
] as const;

type Sample = "normal" | "boundary" | "failure" | "recovery";

export function YdkOfficialFinalReviewEvidenceLab() {
  const stageRefs = useRef<Array<SVGGElement | null>>([]);
  const [sample, setSample] = useState<Sample>("normal");
  const [fault, setFault] = useState(false);

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      STEPS.forEach((step, index) => {
        tl.add(
          stageRefs.current[index]!,
          { opacity: [0, 1], duration: T * 0.55, ease: "out(3)" },
          index * T,
        );
        tl.label(step.label, index * T);
      });
    },
  });

  const activeIndex =
    timeline.currentStep >= STEPS.length
      ? STEPS.length - 1
      : timeline.currentStep;
  const activeStep = STEPS[activeIndex] ?? STEPS[0];
  const faultVisible = fault && activeIndex >= 3;
  const sampleLabel = {
    normal: "正常样本",
    boundary: "边界样本",
    failure: "失败样本",
    recovery: "恢复样本",
  }[sample];

  function reset() {
    timeline.goToStep(0);
    setSample("normal");
    setFault(false);
  }

  return (
    <figure
      className="mdx-figure not-prose mx-auto my-8"
      data-visual-kind="ydk-official-final-review-evidence"
    >
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-6">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              You Don&apos;t Know JS · Final Review
            </p>
            <h3 className="mt-1 text-lg font-semibold text-primary">
              六类机制如何汇合为可重放的终局验收
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
              选择样本并推进六阶段证据链；故障开关只改变一个约束，帮助定位首个偏离点和恢复前必须清理的状态。
            </p>
          </div>
          <span className="rounded-control border border-accent px-2 py-1 text-xs text-accent">
            ▷ 可交互
          </span>
        </div>

        <div className="mb-4 grid gap-3 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <label className="block text-xs text-secondary">
            <span className="mb-1 block font-semibold text-primary">验收样本</span>
            <select
              aria-label="选择总复习验收样本"
              value={sample}
              onChange={(event) => setSample(event.target.value as Sample)}
              className="min-h-11 w-full rounded-control border border-border bg-bg px-3 py-2 text-sm text-primary"
            >
              <option value="normal">正常样本 · 主路径</option>
              <option value="boundary">边界样本 · 空值/重复/极值</option>
              <option value="failure">失败样本 · 单一约束失配</option>
              <option value="recovery">恢复样本 · 清理后重放</option>
            </select>
          </label>
          <label className="flex min-h-11 items-center gap-2 rounded-control border border-border px-3 py-2 text-xs text-secondary">
            <input
              type="checkbox"
              checked={fault}
              onChange={(event) => setFault(event.target.checked)}
              className="accent-[var(--accent)]"
            />
            <span>
              <strong className="text-primary">注入单一故障</strong>
              <br />
              让错误接收者或迟到任务进入复盘链
            </span>
          </label>
        </div>

        <svg
          viewBox="0 0 900 620"
          role="img"
          aria-label="You Don't Know JS 全书总复习专属教学时间线：展示作用域、this、原型、类型、异步和版本六类机制，经过冻结边界、主题对齐、轨迹重放、单一故障、清理恢复和终局签发六阶段。支持样本切换、故障注入、播放、暂停、单步、拖进度和重置。"
          className="mx-auto block h-auto w-full"
        >
          <defs>
            <marker id="ydk-final-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill={C.border} />
            </marker>
            <marker id="ydk-final-fault-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill={C.danger} />
            </marker>
          </defs>

          <rect x="0" y="0" width="900" height="620" rx="14" fill={C.bg} />
          <text x="30" y="34" fontSize="16" fontWeight="700" fill={C.primary}>
            freeze → align → replay → fault → recover → sign-off
          </text>
          <text x="30" y="58" fontSize="12" fill={C.secondary}>
            作用域 · this · 原型 · 类型 · 异步 · 版本 · {sampleLabel}
          </text>

          <rect x="30" y="78" width="840" height="118" rx="12" fill={C.elevated} stroke={C.border} strokeWidth="1.5" />
          <text x="52" y="106" fontSize="12" fontWeight="700" fill={faultVisible ? C.danger : C.accent}>
            当前验收上下文：{faultVisible ? "首个偏离点已暴露" : "轨迹可交接"}
          </text>
          {TOPICS.map(([key, title, evidence], index) => {
            const x = 52 + index * 132;
            const active = index <= activeIndex;
            return (
              <g key={key}>
                <rect x={x} y="124" width="112" height="42" rx="8" fill={active ? C.accent : C.bg} fillOpacity={active ? 0.16 : 1} stroke={active ? C.accent : C.border} strokeWidth="1.5" />
                <text x={x + 56} y="143" textAnchor="middle" fontSize="12" fontWeight="700" fill={active ? C.accent : C.primary}>{title}</text>
                <text x={x + 56} y="158" textAnchor="middle" fontSize="11" fill={C.secondary}>{evidence}</text>
              </g>
            );
          })}
          <text x="52" y="185" fontSize="11" fill={C.secondary}>
            只有把中间状态、调用点、队列位置和版本边界一并保存，最终输出才有解释力
          </text>

          {STAGE_COPY.map((stage, index) => {
            const selected = index === activeIndex;
            const failed = faultVisible && index >= 3;
            const tone = failed ? C.danger : selected ? C.accent : index === 4 ? C.success : C.border;
            return (
              <g
                key={stage[0]}
                ref={(node) => {
                  stageRefs.current[index] = node;
                }}
                style={{ opacity: 0 }}
              >
                <rect x="30" y="218" width="840" height="146" rx="12" fill={failed ? C.danger : selected ? C.accent : C.elevated} fillOpacity={failed || selected ? 0.1 : 1} stroke={tone} strokeWidth={selected || failed ? 2.5 : 1.5} />
                <text x="52" y="248" fontSize="13" fontWeight="700" fill={failed ? C.danger : selected ? C.accent : C.primary}>{stage[0]}</text>
                <text x="52" y="278" fontSize="12" fill={C.primary}>{stage[1]}</text>
                <text x="52" y="308" fontSize="12" fill={C.primary}>{stage[2]}</text>
                <text x="52" y="342" fontSize="11" fill={failed ? C.danger : C.secondary}>
                  {failed ? "故障注入：停止在 first divergence；恢复前必须清理旧状态" : index === 5 && sample === "recovery" ? "恢复样本：同一输入重放，确认 state clean 且没有 stale work" : "当前阶段输出必须能被下一阶段消费"}
                </text>
              </g>
            );
          })}

          {faultVisible && (
            <g>
              <path d="M 790 202 C 756 232, 716 260, 676 292" fill="none" stroke={C.danger} strokeWidth="3" strokeDasharray="8 6" markerEnd="url(#ydk-final-fault-arrow)" />
              <rect x="190" y="374" width="520" height="30" rx="8" fill={C.danger} fillOpacity="0.12" stroke={C.danger} strokeWidth="1.5" />
              <text x="208" y="394" fontSize="11" fontWeight="700" fill={C.danger}>单一故障：记录首个偏离点，不让错误状态继续传播</text>
            </g>
          )}

          <line x1="76" y1="446" x2="824" y2="446" stroke={C.border} strokeWidth="2" markerEnd="url(#ydk-final-arrow)" />
          {STEPS.slice(0, -1).map((step, index) => {
            const x1 = 76 + index * 146 + 110;
            const x2 = 76 + (index + 1) * 146 - 12;
            return <line key={`connector-${step.label}`} x1={x1} y1="446" x2={x2} y2="446" stroke={index < activeIndex ? C.success : C.border} strokeWidth={index < activeIndex ? 3 : 1.5} markerEnd="url(#ydk-final-arrow)" />;
          })}
          {STEPS.map((step, index) => {
            const x = 76 + index * 146;
            const selected = index === activeIndex;
            const failed = faultVisible && index >= 3;
            return (
              <g key={`step-${step.label}`}>
                <rect x={x} y="462" width="110" height="104" rx="12" fill={failed ? C.danger : selected ? C.accent : C.elevated} fillOpacity={failed || selected ? 0.16 : 1} stroke={failed ? C.danger : selected ? C.accent : C.border} strokeWidth={failed || selected ? 2.5 : 1.5} />
                <circle cx={x + 22} cy="486" r="12" fill={failed ? C.danger : selected ? C.accent : C.bg} stroke={failed ? C.danger : selected ? C.accent : C.border} strokeWidth="1.5" />
                <text x={x + 22} y="490" textAnchor="middle" fontSize="11" fill={selected || failed ? C.bg : C.primary}>{index + 1}</text>
                <text x={x + 62} y="490" textAnchor="middle" fontSize="11" fontWeight="700" fill={failed ? C.danger : selected ? C.accent : C.primary}>{step.label}</text>
                <text x={x + 55} y="524" textAnchor="middle" fontSize="11" fill={C.secondary}>{failed ? "stop" : selected ? "active" : "ready"}</text>
                <text x={x + 55} y="548" textAnchor="middle" fontSize="11" fill={C.secondary}>{index < activeIndex ? "checked" : "trace"}</text>
              </g>
            );
          })}
          <text x="30" y="600" fontSize="11" fill={C.secondary}>当前阶段：{activeStep.label} · {activeStep.caption}</text>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="先预测哪条轨迹会改变，再推进单一故障与恢复重放。"
          reset={{ label: "重置实验", ariaLabel: "重置 You Don't Know JS 总复习证据实验", onClick: reset }}
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        总复习的验收对象不是记住结论，而是能从目录主题重放机制、定位偏离、完成清理并交接版本边界。
      </figcaption>
    </figure>
  );
}
