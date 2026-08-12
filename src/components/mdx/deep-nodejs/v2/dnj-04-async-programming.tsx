"use client";

import { useId, useRef, useState } from "react";

import {
  TEACHING_BEAT_MS,
  TimelineControls,
} from "../../anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "../../anim/use-teaching-timeline";

const C = {
  bg: "var(--bg)",
  elevated: "var(--bg-elevated)",
  border: "var(--border)",
  primary: "var(--text-primary)",
  secondary: "var(--text-secondary)",
  accent: "var(--accent)",
  success: "var(--success)",
  warning: "var(--warning)",
  danger: "var(--danger)",
} as const;

const T = TEACHING_BEAT_MS;

type Model = "function" | "event" | "promise" | "flow";
type Fault = "none" | "reject" | "overflow" | "cancel" | "duplicate";
type Evidence = "graph" | "events" | "queue";

const STEPS: readonly TeachingStep[] = [
  { label: "inputs", caption: "把输入与副作用边界固定下来" },
  { label: "depend", caption: "展开任务依赖与可并行分支" },
  { label: "compose", caption: "选择事件、Promise 或流程组合" },
  { label: "gate", caption: "并发闸门决定何时启动任务" },
  { label: "cancel", caption: "失败和取消沿依赖图传播" },
  { label: "settle", caption: "单次结算并排空队列与资源" },
];

const LABEL_TEXT: Readonly<Record<string, string>> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

const MODEL_LABELS: Record<Model, string> = {
  function: "函数组合",
  event: "发布订阅",
  promise: "Promise",
  flow: "流程控制",
};

const FAULT_LABELS: Record<Fault, string> = {
  none: "基线",
  reject: "任务拒绝",
  overflow: "队列溢出",
  cancel: "取消竞态",
  duplicate: "重复发布",
};

const EVIDENCE_LABELS: Record<Evidence, string> = {
  graph: "任务依赖图",
  events: "事件日志",
  queue: "队列与资源计数",
};

function verdict(model: Model, fault: Fault, evidence: Evidence) {
  if (fault === "reject" && evidence !== "graph") {
    return {
      ok: false,
      color: C.warning,
      title: "错误影响范围没有画清",
      note: `${MODEL_LABELS[model]} 已经出现拒绝，但没有依赖图就无法判断兄弟任务是否需要取消或继续。`,
    };
  }
  if (fault === "overflow" && evidence !== "queue") {
    return {
      ok: false,
      color: C.danger,
      title: "并发容量没有证据",
      note: "输入数量、排队项、在途任务和闸门槽位没有同时记录，不能证明系统真正有界。",
    };
  }
  if (fault === "cancel") {
    return {
      ok: false,
      color: C.warning,
      title: "取消传播仍在竞争",
      note: "已经启动的任务不会因为上层 Promise 失败就自动消失；必须把信号传给 worker，并等待清理。",
    };
  }
  if (fault === "duplicate") {
    return {
      ok: false,
      color: C.danger,
      title: "业务完成出口重复",
      note: "事件和 Promise 都在提交结果；为 task id 选择一个权威出口，其余通道只做观测。",
    };
  }
  return {
    ok: true,
    color: C.success,
    title: "任务图可以收敛",
    note: `${MODEL_LABELS[model]} 的依赖、容量、取消和单次结算都能用${EVIDENCE_LABELS[evidence]}复核。`,
  };
}

export function DnjAsyncProgrammingLab() {
  const stageRefs = useRef<Array<SVGGElement | null>>([]);
  const rawId = useId();
  const instanceId = rawId.replace(/:/g, "");
  const arrowId = `dnj-async-program-arrow-${instanceId}`;
  const warningArrowId = `dnj-async-program-warning-${instanceId}`;
  const [model, setModel] = useState<Model>("promise");
  const [fault, setFault] = useState<Fault>("none");
  const [evidence, setEvidence] = useState<Evidence>("graph");

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

  const activeIndex = Math.min(STEPS.length - 1, timeline.currentStep);
  const activeStep = STEPS[activeIndex] ?? STEPS[0];
  const result = verdict(model, fault, evidence);

  function reset() {
    setModel("promise");
    setFault("none");
    setEvidence("graph");
    timeline.goToStep(0);
  }

  return (
    <figure
      className="mdx-figure not-prose mx-auto my-8"
      data-visual-kind="deep-nodejs-async-programming"
    >
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-6">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              Node.js · 第 4 章
            </p>
            <h3 className="mt-1 text-lg font-semibold text-primary">
              把异步组合变成有界任务图
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
              选择组合模型、注入任务失败或队列故障，再切换证据方式；沿六阶段时间线观察依赖、并发闸门、取消和单次结算如何相互影响。
            </p>
          </div>
          <div className="flex flex-wrap gap-2" aria-label="选择异步组合模型">
            {(Object.entries(MODEL_LABELS) as [Model, string][]).map(
              ([value, label]) => (
                <button
                  key={value}
                  type="button"
                  aria-pressed={model === value}
                  onClick={() => setModel(value)}
                  className={`min-h-11 rounded-control border px-3 py-2 text-xs transition-colors duration-(--duration-hover) ease-standard ${
                    model === value
                      ? "border-accent text-accent"
                      : "border-border text-secondary hover:border-accent hover:text-primary"
                  }`}
                >
                  {label}
                </button>
              ),
            )}
          </div>
        </div>

        <div className="mb-4 grid gap-3 md:grid-cols-2">
          <div className="flex flex-wrap gap-2" aria-label="选择组合故障">
            <span className="self-center text-xs text-secondary">故障：</span>
            {(Object.entries(FAULT_LABELS) as [Fault, string][]).map(
              ([value, label]) => (
                <button
                  key={value}
                  type="button"
                  aria-pressed={fault === value}
                  onClick={() => setFault(value)}
                  className={`min-h-11 rounded-control border px-3 py-2 text-xs transition-colors duration-(--duration-hover) ease-standard ${
                    fault === value
                      ? value === "none"
                        ? "border-accent text-accent"
                        : "border-warning text-warning"
                      : "border-border text-secondary hover:border-accent hover:text-primary"
                  }`}
                >
                  {label}
                </button>
              ),
            )}
          </div>
          <div className="flex flex-wrap gap-2" aria-label="选择组合证据">
            <span className="self-center text-xs text-secondary">证据：</span>
            {(Object.entries(EVIDENCE_LABELS) as [Evidence, string][]).map(
              ([value, label]) => (
                <button
                  key={value}
                  type="button"
                  aria-pressed={evidence === value}
                  onClick={() => setEvidence(value)}
                  className={`min-h-11 rounded-control border px-3 py-2 text-xs transition-colors duration-(--duration-hover) ease-standard ${
                    evidence === value
                      ? "border-accent text-accent"
                      : "border-border text-secondary hover:border-accent hover:text-primary"
                  }`}
                >
                  {label}
                </button>
              ),
            )}
          </div>
        </div>

        <svg
          viewBox="0 0 900 710"
          role="img"
          aria-label={`Node 第 4 章异步编程实验：组合模型为${MODEL_LABELS[model]}，故障为${FAULT_LABELS[fault]}，证据为${EVIDENCE_LABELS[evidence]}，当前结论为${result.title}。时间线展示输入、依赖、组合、并发闸门、取消和单次结算六阶段；支持播放、暂停、单步、拖进度、三组条件切换和重置。`}
          className="mx-auto block h-auto w-full"
        >
          <defs>
            <marker
              id={arrowId}
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
            >
              <path d="M0,0 L6,3 L0,6 Z" fill={C.border} />
            </marker>
            <marker
              id={warningArrowId}
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
            >
              <path d="M0,0 L6,3 L0,6 Z" fill={C.warning} />
            </marker>
          </defs>

          <rect x="0" y="0" width="900" height="710" rx="14" fill={C.bg} />
          <text x="28" y="34" fontSize="16" fontWeight="700" fill={C.primary}>
            输入 → 依赖 → 组合 → 闸门 → 取消 → 结算
          </text>
          <text x="28" y="58" fontSize="12" fill={C.secondary}>
            组合模型改变表达方式，任务图和资源边界仍必须可审计
          </text>

          <rect
            x="28"
            y="78"
            width="844"
            height="88"
            rx="12"
            fill={result.color}
            fillOpacity="0.08"
            stroke={result.color}
            strokeWidth="1.5"
          />
          <text
            x="48"
            y="108"
            fontSize="12"
            fontWeight="700"
            fill={result.color}
          >
            当前结论：{result.title} · {MODEL_LABELS[model]} ·{" "}
            {FAULT_LABELS[fault]}
          </text>
          <text x="48" y="136" fontSize="11" fill={C.secondary}>
            {result.note}
          </text>
          <text x="48" y="154" fontSize="11" fill={result.color}>
            验收条件：依赖可解释 · 并发有界 · 取消可传播 · 结果只结算一次
          </text>

          <text x="28" y="194" fontSize="12" fontWeight="700" fill={C.primary}>
            六阶段任务图
          </text>

          <g
            ref={(node) => {
              stageRefs.current[0] = node;
            }}
            opacity="0"
          >
            <rect
              x="28"
              y="214"
              width="250"
              height="92"
              rx="10"
              fill={C.accent}
              fillOpacity="0.1"
              stroke={C.accent}
            />
            <text x="46" y="244" fontSize="12" fontWeight="700" fill={C.accent}>
              1 · 输入
            </text>
            <text x="46" y="272" fontSize="11" fill={C.secondary}>
              task id、参数和副作用边界固定
            </text>
            <text x="46" y="292" fontSize="11" fill={C.secondary}>
              model：{MODEL_LABELS[model]}
            </text>
          </g>

          <g
            ref={(node) => {
              stageRefs.current[1] = node;
            }}
            opacity="0"
          >
            <rect
              x="324"
              y="214"
              width="250"
              height="92"
              rx="10"
              fill={C.accent}
              fillOpacity="0.1"
              stroke={C.accent}
            />
            <text
              x="342"
              y="244"
              fontSize="12"
              fontWeight="700"
              fill={C.accent}
            >
              2 · 依赖图
            </text>
            <text x="342" y="272" fontSize="11" fill={C.secondary}>
              A 完成后分叉到 B、C，再汇合
            </text>
            <text x="342" y="292" fontSize="11" fill={C.secondary}>
              evidence：{EVIDENCE_LABELS[evidence]}
            </text>
          </g>

          <g
            ref={(node) => {
              stageRefs.current[2] = node;
            }}
            opacity="0"
          >
            <rect
              x="620"
              y="214"
              width="252"
              height="92"
              rx="10"
              fill={C.accent}
              fillOpacity="0.1"
              stroke={C.accent}
            />
            <text
              x="638"
              y="244"
              fontSize="12"
              fontWeight="700"
              fill={C.accent}
            >
              3 · 组合模型
            </text>
            <text x="638" y="272" fontSize="11" fill={C.secondary}>
              {MODEL_LABELS[model]}表达完成与错误
            </text>
            <text x="638" y="292" fontSize="11" fill={C.secondary}>
              不是容量或取消协议
            </text>
          </g>

          <line
            x1="278"
            y1="260"
            x2="318"
            y2="260"
            stroke={C.border}
            strokeWidth="1.5"
            markerEnd={`url(#${arrowId})`}
          />
          <line
            x1="574"
            y1="260"
            x2="614"
            y2="260"
            stroke={fault === "reject" ? C.warning : C.border}
            strokeWidth="1.5"
            markerEnd={`url(#${fault === "reject" ? warningArrowId : arrowId})`}
          />

          <g
            ref={(node) => {
              stageRefs.current[3] = node;
            }}
            opacity="0"
          >
            <rect
              x="28"
              y="354"
              width="250"
              height="92"
              rx="10"
              fill={fault === "overflow" ? C.danger : C.accent}
              fillOpacity="0.1"
              stroke={fault === "overflow" ? C.danger : C.accent}
            />
            <text
              x="46"
              y="384"
              fontSize="12"
              fontWeight="700"
              fill={fault === "overflow" ? C.danger : C.accent}
            >
              4 · 并发闸门
            </text>
            <text x="46" y="412" fontSize="11" fill={C.secondary}>
              只有取得槽位的任务才能启动
            </text>
            <text
              x="46"
              y="432"
              fontSize="11"
              fill={fault === "overflow" ? C.danger : C.secondary}
            >
              queued：{fault === "overflow" ? "unbounded" : "bounded"}
            </text>
          </g>

          <g
            ref={(node) => {
              stageRefs.current[4] = node;
            }}
            opacity="0"
          >
            <rect
              x="324"
              y="354"
              width="250"
              height="92"
              rx="10"
              fill={fault === "cancel" ? C.warning : C.accent}
              fillOpacity="0.1"
              stroke={fault === "cancel" ? C.warning : C.accent}
            />
            <text
              x="342"
              y="384"
              fontSize="12"
              fontWeight="700"
              fill={fault === "cancel" ? C.warning : C.accent}
            >
              5 · 取消传播
            </text>
            <text x="342" y="412" fontSize="11" fill={C.secondary}>
              失败或截止时间通知兄弟与后继
            </text>
            <text
              x="342"
              y="432"
              fontSize="11"
              fill={fault === "cancel" ? C.warning : C.secondary}
            >
              signal：{fault === "cancel" ? "racing" : "shared"}
            </text>
          </g>

          <g
            ref={(node) => {
              stageRefs.current[5] = node;
            }}
            opacity="0"
          >
            <rect
              x="620"
              y="354"
              width="252"
              height="92"
              rx="10"
              fill={result.ok ? C.success : C.danger}
              fillOpacity="0.1"
              stroke={result.ok ? C.success : C.danger}
            />
            <text
              x="638"
              y="384"
              fontSize="12"
              fontWeight="700"
              fill={result.ok ? C.success : C.danger}
            >
              6 · 单次结算
            </text>
            <text x="638" y="412" fontSize="11" fill={C.secondary}>
              结果、错误、取消和资源收尾对账
            </text>
            <text
              x="638"
              y="432"
              fontSize="11"
              fill={result.ok ? C.success : C.danger}
            >
              {result.ok
                ? "queued：0 · active：0"
                : "settled：uncertain · cleanup：hold"}
            </text>
          </g>

          <line
            x1="745"
            y1="306"
            x2="745"
            y2="346"
            stroke={fault === "overflow" ? C.warning : C.border}
            strokeWidth="1.5"
            markerEnd={`url(#${fault === "overflow" ? warningArrowId : arrowId})`}
          />
          <line
            x1="614"
            y1="400"
            x2="584"
            y2="400"
            stroke={fault === "cancel" ? C.warning : C.border}
            strokeWidth="1.5"
            markerEnd={`url(#${fault === "cancel" ? warningArrowId : arrowId})`}
          />
          <line
            x1="318"
            y1="400"
            x2="288"
            y2="400"
            stroke={fault === "reject" ? C.warning : C.border}
            strokeWidth="1.5"
            markerEnd={`url(#${fault === "reject" ? warningArrowId : arrowId})`}
          />

          <rect
            x="28"
            y="486"
            width="844"
            height="120"
            rx="12"
            fill={C.elevated}
            stroke={C.border}
            strokeWidth="1.5"
          />
          <text x="48" y="518" fontSize="12" fontWeight="700" fill={C.primary}>
            证据对账
          </text>
          <text x="48" y="546" fontSize="11" fill={C.secondary}>
            task：async-program-04 · model：{MODEL_LABELS[model]} · evidence：
            {EVIDENCE_LABELS[evidence]}
          </text>
          <text x="48" y="570" fontSize="11" fill={C.secondary}>
            fault：{FAULT_LABELS[fault]} · dependencies：A → B/C → join ·
            gate：2 workers
          </text>
          <rect
            x="48"
            y="584"
            width="804"
            height="12"
            rx="6"
            fill={result.color}
            fillOpacity="0.16"
          />
          <rect
            x="48"
            y="584"
            width={result.ok ? 804 : 510}
            height="12"
            rx="6"
            fill={result.color}
            fillOpacity="0.75"
          />

          <text x="28" y="650" fontSize="11" fill={result.color}>
            当前时间线：第 {activeIndex + 1} / {STEPS.length} 步 ·{" "}
            {activeStep?.caption ?? "选择阶段"}
          </text>
          <text x="28" y="682" fontSize="11" fill={C.secondary}>
            先画依赖，再启动有限任务；故障时保留 task id、取消原因和清理计数。
          </text>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="固定输入和 worker 数，只改变一个故障；用依赖图、事件日志和队列计数判断任务是否收敛。"
          reset={{
            label: "重置异步编程实验",
            ariaLabel: "重置 Node 异步编程实验",
            onClick: reset,
          }}
        />
      </div>
      <figcaption className="mt-3 text-center text-xs text-secondary">
        交互提示：先播放时间线，再切换模型或故障；比较 queued、active 与
        settled，确认组合不是只换了语法。
      </figcaption>
    </figure>
  );
}
