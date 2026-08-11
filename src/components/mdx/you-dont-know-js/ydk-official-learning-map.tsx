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
  {
    label: "volumes",
    caption: "锁定中文版三卷身份，冻结来源、版本与聚合边界",
  },
  {
    label: "catalogue",
    caption: "映射一版英文六册，把公开目录条目绑定到站内导航节点",
  },
  {
    label: "evidence",
    caption: "逐项登记正式目录，记录作用域、对象、类型与异步证据",
  },
  {
    label: "trace",
    caption: "为每章建立运行轨迹，保留正常样本与边界样本的首个偏离点",
  },
  {
    label: "version",
    caption: "披露历史提案状态，区分一版快照与现代运行时能力",
  },
  {
    label: "signoff",
    caption: "用题库与故障样本签发学习闭环，确认没有旧状态污染",
  },
];

const LABEL_TEXT: Readonly<Record<string, string>> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

const BOXES = STEPS.map((_, index) => ({ x: 28 + index * 134, y: 416 }));

const STAGE_COPY = [
  [
    "1 · 锁定中文版三卷身份",
    "保存书名、卷序、来源仓库与版本快照，禁止把导航聚合误写成原书章节。",
    "输出：三卷边界 + 可复核 source snapshot",
  ],
  [
    "2 · 映射一版英文六册",
    "把 Scope、Objects、Types、Async、Up & Going、ES6 & Beyond 放回作者目录。",
    "输出：六册节点 + 目录标题的一对一追踪",
  ],
  [
    "3 · 逐项登记正式目录",
    "站内保留 40 个正式单元，并把 211 个公开目录条目接到六条证据链。",
    "输出：目录节点 + 主题、状态与边界记录",
  ],
  [
    "4 · 为每章建立运行轨迹",
    "先预测绑定、值、调用点与顺序，再比较正常、边界、失败和恢复样本。",
    "输出：first divergence + 可重放的 evidence trace",
  ],
  [
    "5 · 披露历史提案状态",
    "把一版 2014 至 2015 快照与今天可运行的 JavaScript 能力分栏说明。",
    "输出：原书边界 + modern runtime 差异账本",
  ],
  [
    "6 · 用题库与故障样本签发",
    "注入旧绑定、迟到结果或缺失能力，确认停止、恢复和清理都可观察。",
    "输出：学习闭环 + 无 stale work 的签发状态",
  ],
] as const;

type Sample = "normal" | "boundary" | "failure" | "recovery";

export function YdkOfficialLearningMapEvidenceLab() {
  const stageRefs = useRef<Array<SVGGElement | null>>([]);
  const [sample, setSample] = useState<Sample>("normal");
  const [staleFault, setStaleFault] = useState(false);

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      STEPS.forEach((step, index) => {
        tl.add(
          stageRefs.current[index]!,
          { opacity: [0, 1], duration: T * 0.55, ease: "out(3)" },
          index * T,
        );
        // label 对齐每条证据链阶段的动画起始时刻。
        tl.label(step.label, index * T);
      });
    },
  });

  const activeIndex = Math.min(STEPS.length - 1, timeline.currentStep);
  const activeStep = STEPS[activeIndex] ?? STEPS[0];
  const faulted = staleFault && activeIndex >= 3;
  const sampleLabel = {
    normal: "正常样本",
    boundary: "边界样本",
    failure: "失败样本",
    recovery: "恢复样本",
  }[sample];

  function reset() {
    timeline.goToStep(0);
    setSample("normal");
    setStaleFault(false);
  }

  return (
    <figure
      className="mdx-figure not-prose mx-auto my-8"
      data-visual-kind="ydk-official-learning-map-evidence"
    >
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-6">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              You Don&apos;t Know JS · Learning Map
            </p>
            <h3 className="mt-1 text-lg font-semibold text-primary">
              六条证据链如何把目录变成可重放的学习闭环
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
              选择样本类型，逐步推进三卷六册、40 个正式单元和 211 个公开目录条目的状态；故障开关会注入旧绑定或旧任务，检查恢复阶段是否清理干净。
            </p>
          </div>
          <span className="rounded-control border border-accent px-2 py-1 text-xs text-accent">
            ▷ 可交互
          </span>
        </div>

        <div className="mb-4 grid gap-3 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <label className="block text-xs text-secondary">
            <span className="mb-1 block font-semibold text-primary">样本类型</span>
            <select
              aria-label="选择学习地图样本类型"
              value={sample}
              onChange={(event) => setSample(event.target.value as Sample)}
              className="min-h-11 w-full rounded-control border border-border bg-bg px-3 py-2 text-sm text-primary"
            >
              <option value="normal">正常样本 · 主路径</option>
              <option value="boundary">边界样本 · 空值/重复键/极值</option>
              <option value="failure">失败样本 · 错误接收者/旧能力</option>
              <option value="recovery">恢复样本 · 修复后重放</option>
            </select>
          </label>
          <label className="flex min-h-11 items-center gap-2 rounded-control border border-border px-3 py-2 text-xs text-secondary">
            <input
              type="checkbox"
              checked={staleFault}
              onChange={(event) => setStaleFault(event.target.checked)}
              className="accent-[var(--accent)]"
            />
            <span>
              <strong className="text-primary">注入 stale state</strong>
              <br />
              让旧绑定/旧任务污染后续阶段
            </span>
          </label>
        </div>

        <svg
          viewBox="0 0 840 560"
          role="img"
          aria-label="You Don't Know JS 权威学习地图专属教学时间线：展示中文版三卷身份、一版英文六册、40 个正式单元、211 个公开目录条目、六条证据链、正常边界失败恢复样本、历史版本边界与 stale state 故障。支持播放、暂停、单步、拖进度、重置、样本类型切换和旧状态污染开关。"
          className="mx-auto block h-auto w-full"
        >
          <defs>
            <marker id="ydk-map-evidence-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill={C.border} />
            </marker>
            <marker id="ydk-map-fault-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill={C.danger} />
            </marker>
          </defs>

          <rect x="0" y="0" width="840" height="560" rx="14" fill={C.bg} />
          <text x="28" y="34" fontSize="16" fontWeight="700" fill={C.primary}>
            source snapshot → directory map → evidence trace → sign-off
          </text>
          <text x="28" y="58" fontSize="12" fill={C.secondary}>
            三卷六册 · 40 个正式单元 · 211 个公开条目 · 正常/边界/失败/恢复样本
          </text>

          <rect x="28" y="78" width="784" height="122" rx="12" fill={C.elevated} stroke={C.border} strokeWidth="1.5" />
          <text x="48" y="105" fontSize="12" fontWeight="700" fill={C.accent}>
            当前签发上下文：{sampleLabel} · {faulted ? "stale state detected" : "state clean"}
          </text>
          <rect x="48" y="122" width="156" height="34" rx="8" fill={C.elevated} stroke={C.border} strokeWidth="1.5" />
          <text x="126" y="144" textAnchor="middle" fontSize="12" fill={C.primary}>三卷边界</text>
          <line x1="220" y1="139" x2="282" y2="139" stroke={C.border} strokeWidth="2" markerEnd="url(#ydk-map-evidence-arrow)" />
          <rect x="298" y="122" width="170" height="34" rx="8" fill={C.accent} fillOpacity="0.14" stroke={C.accent} strokeWidth="1.5" />
          <text x="383" y="144" textAnchor="middle" fontSize="12" fill={C.primary}>六册目录</text>
          <line x1="484" y1="139" x2="546" y2="139" stroke={faulted ? C.danger : C.border} strokeWidth={faulted ? 3 : 2} markerEnd={faulted ? "url(#ydk-map-fault-arrow)" : "url(#ydk-map-evidence-arrow)"} />
          <rect x="562" y="122" width="218" height="34" rx="8" fill={faulted ? C.danger : C.success} fillOpacity="0.14" stroke={faulted ? C.danger : C.success} strokeWidth="1.5" />
          <text x="671" y="144" textAnchor="middle" fontSize="12" fill={C.primary}>{faulted ? "旧状态污染" : "可重放证据"}</text>
          <text x="48" y="185" fontSize="11" fill={C.secondary}>
            每阶段交付可被下一阶段消费的状态；最终截图不能替代完整绑定、调用点、顺序与版本轨迹
          </text>

          {STAGE_COPY.map((stage, index) => {
            const selected = index === activeIndex;
            const faultStage = faulted && index >= 3;
            return (
              <g
                key={stage[0]}
                ref={(node) => {
                  stageRefs.current[index] = node;
                }}
                style={{ opacity: 0 }}
              >
                <rect x="28" y="216" width="784" height="174" rx="12" fill={faultStage ? C.danger : index === 3 ? C.success : index === 4 ? C.warning : C.accent} fillOpacity="0.1" stroke={faultStage ? C.danger : selected ? C.accent : index === 3 ? C.success : index === 4 ? C.warning : C.accent} strokeWidth="1.5" />
                <text x="48" y="248" fontSize="12" fontWeight="700" fill={faultStage ? C.danger : selected ? C.accent : C.primary}>{stage[0]}</text>
                <text x="48" y="278" fontSize="12" fill={C.primary}>{stage[1]}</text>
                <text x="48" y="306" fontSize="12" fill={C.primary}>{stage[2]}</text>
                <text x="48" y="348" fontSize="11" fill={faultStage ? C.danger : C.secondary}>{faultStage ? "故障注入：旧绑定/旧任务进入本阶段；恢复样本必须清理并重放" : index === 3 && sample === "failure" ? "失败样本：停止在 first divergence，保存接收者与版本证据" : index === 5 && sample === "recovery" ? "恢复样本：同一输入重放，确认 state clean 且没有 stale work" : "当前阶段输出可复核的状态与不变量"}</text>
              </g>
            );
          })}

          {faulted && (
            <g>
              <path d="M 748 202 C 716 230, 684 258, 646 286" fill="none" stroke={C.danger} strokeWidth="3" strokeDasharray="8 6" markerEnd="url(#ydk-map-fault-arrow)" />
              <rect x="160" y="394" width="520" height="28" rx="8" fill={C.warning} fillOpacity="0.14" stroke={C.danger} strokeWidth="1.5" />
              <text x="178" y="414" fontSize="11" fontWeight="700" fill={C.danger}>故障注入：stale state 不能带入下一阶段；应在恢复样本中清理后重放</text>
            </g>
          )}

          <line x1="72" y1="444" x2="768" y2="444" stroke={C.border} strokeWidth="2" markerEnd="url(#ydk-map-evidence-arrow)" />
          {STEPS.slice(0, -1).map((step, index) => {
            const start = BOXES[index];
            const end = BOXES[index + 1];
            return <line key={`connector-${step.label}`} x1={start.x + 108} y1="430" x2={end.x - 10} y2="430" stroke={index < activeIndex ? C.success : C.border} strokeWidth={index < activeIndex ? 3 : 1.5} markerEnd="url(#ydk-map-evidence-arrow)" />;
          })}
          {STEPS.map((step, index) => {
            const box = BOXES[index];
            const selected = index === activeIndex;
            const faultStage = faulted && index >= 3;
            return (
              <g key={`step-card-${step.label}`}>
                <rect x={box.x} y={box.y} width="108" height="100" rx="12" fill={faultStage ? C.danger : selected ? C.accent : C.elevated} fillOpacity={faultStage || selected ? 0.16 : 1} stroke={faultStage ? C.danger : selected ? C.accent : C.border} strokeWidth={faultStage || selected ? 3 : 1.5} />
                <circle cx={box.x + 20} cy={box.y + 22} r="12" fill={faultStage ? C.danger : selected ? C.accent : C.bg} stroke={faultStage ? C.danger : selected ? C.accent : C.border} strokeWidth="1.5" />
                <text x={box.x + 20} y={box.y + 27} textAnchor="middle" fontSize="11" fill={selected || faultStage ? C.bg : C.primary}>{index + 1}</text>
                <text x={box.x + 54} y={box.y + 26} textAnchor="middle" fontSize="11" fontWeight="700" fill={faultStage ? C.danger : selected ? C.accent : C.primary}>{step.label}</text>
                <text x={box.x + 54} y={box.y + 55} textAnchor="middle" fontSize="11" fill={C.secondary}>{index === 0 ? "source" : index === 1 ? "map" : index === 2 ? "nodes" : index === 3 ? "trace" : index === 4 ? "version" : "sign"}</text>
                <text x={box.x + 54} y={box.y + 78} textAnchor="middle" fontSize="11" fill={faultStage ? C.danger : C.secondary}>{faultStage ? "check" : selected ? "active" : "ready"}</text>
              </g>
            );
          })}
          <text x="28" y="540" fontSize="11" fill={C.secondary}>当前阶段：{activeStep.label} · {activeStep.caption}</text>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="先预测状态交接，再用样本类型和故障开关验证证据链。"
          reset={{ label: "重置实验", ariaLabel: "重置 You Don't Know JS 学习地图证据实验", onClick: reset }}
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        学习地图的验收对象不是目录数量，而是每个节点都能沿来源、机制、版本和样本证据被复核与重放。
      </figcaption>
    </figure>
  );
}
