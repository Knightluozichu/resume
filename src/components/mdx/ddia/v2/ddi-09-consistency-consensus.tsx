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

type Model = "linear" | "causal" | "eventual";
type Fault = "healthy" | "partition" | "leader";
type Commit = "consensus" | "two-phase" | "best-effort";

const STEPS: readonly TeachingStep[] = [
  { label: "observe", caption: "两个客户端从各自副本观察当前版本" },
  { label: "order", caption: "因果关系或实时顺序约束候选历史" },
  { label: "broadcast", caption: "副本按统一日志顺序接收相同消息" },
  { label: "prepare", caption: "参与者准备原子决定，但协调者可能失联" },
  { label: "commit", caption: "多数交集确认唯一提交值或保持停写" },
  { label: "membership", caption: "任期与成员变更阻止旧视图再次提交" },
];

const LABEL_TEXT: Readonly<Record<string, string>> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

const MODEL_LABELS: Record<Model, string> = {
  linear: "线性一致",
  causal: "因果顺序",
  eventual: "最终收敛",
};

const FAULT_LABELS: Record<Fault, string> = {
  healthy: "稳定领导者",
  partition: "网络分区",
  leader: "领导者故障",
};

const COMMIT_LABELS: Record<Commit, string> = {
  consensus: "容错共识",
  "two-phase": "两阶段提交",
  "best-effort": "尽力写入",
};

function resultFor(model: Model, fault: Fault, commit: Commit) {
  if (fault === "partition" && commit === "consensus") {
    return {
      ok: true,
      color: C.success,
      title: "安全停写",
      note: "多数一侧保留唯一任期；少数一侧不提交，恢复后从已提交日志继续。",
    };
  }
  if (fault === "partition") {
    return {
      ok: false,
      color: C.danger,
      title: "可能出现双重决定",
      note: "没有多数交集或成员配置时，两侧都可能把本地副本当成权威。",
    };
  }
  if (fault === "leader" && commit === "two-phase") {
    return {
      ok: false,
      color: C.warning,
      title: "参与者阻塞",
      note: "参与者已经准备，但协调者失联；原子提交保留一致决定，却不自动提供容错领导者。",
    };
  }
  if (model === "eventual" || commit === "best-effort") {
    return {
      ok: false,
      color: C.warning,
      title: "只证明最终收敛",
      note: "副本最后可能相同，但中间读取仍能观察到旧值或不同顺序，不能宣称线性一致。",
    };
  }
  return {
    ok: true,
    color: C.success,
    title: "顺序可解释",
    note: "历史能映射到唯一日志顺序，提交记录包含任期、索引和多数确认。",
  };
}

export function Ddi09ConsistencyConsensusLab() {
  const stageRefs = useRef<Array<SVGGElement | null>>([]);
  const rawId = useId();
  const instanceId = rawId.replace(/:/g, "");
  const arrowId = `ddia-09-consensus-arrow-${instanceId}`;
  const warningArrowId = `ddia-09-consensus-warning-${instanceId}`;
  const [model, setModel] = useState<Model>("linear");
  const [fault, setFault] = useState<Fault>("healthy");
  const [commit, setCommit] = useState<Commit>("consensus");

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
  const result = resultFor(model, fault, commit);
  const split = fault === "partition";

  function reset() {
    setModel("linear");
    setFault("healthy");
    setCommit("consensus");
    timeline.goToStep(0);
  }

  return (
    <figure
      className="mdx-figure not-prose mx-auto my-8"
      data-visual-kind="ddia-09-consistency-consensus"
    >
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-6">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              DDIA · 第 9 章
            </p>
            <h3 className="mt-1 text-lg font-semibold text-primary">
              把可见历史压进一条可审计日志
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
              切换顺序模型、故障和提交协议；观察一致性保证如何从读取历史延伸到日志、多数、任期和成员变更。
            </p>
          </div>
          <div className="flex flex-wrap gap-2" aria-label="选择一致性模型">
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
          <div className="flex flex-wrap gap-2" aria-label="选择故障模型">
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
                      ? value === "healthy"
                        ? "border-accent text-accent"
                        : "border-danger text-danger"
                      : "border-border text-secondary hover:border-accent hover:text-primary"
                  }`}
                >
                  {label}
                </button>
              ),
            )}
          </div>
          <div className="flex flex-wrap gap-2" aria-label="选择提交协议">
            <span className="self-center text-xs text-secondary">提交：</span>
            {(Object.entries(COMMIT_LABELS) as [Commit, string][]).map(
              ([value, label]) => (
                <button
                  key={value}
                  type="button"
                  aria-pressed={commit === value}
                  onClick={() => setCommit(value)}
                  className={`min-h-11 rounded-control border px-3 py-2 text-xs transition-colors duration-(--duration-hover) ease-standard ${
                    commit === value
                      ? value === "best-effort"
                        ? "border-danger text-danger"
                        : "border-accent text-accent"
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
          viewBox="0 0 900 700"
          role="img"
          aria-label={`一致性与共识实验图：模型为${MODEL_LABELS[model]}，故障为${FAULT_LABELS[fault]}，提交协议为${COMMIT_LABELS[commit]}，当前结论为${result.title}。时间线展示观察、排序、全序广播、准备、提交和成员变更六阶段；支持播放、暂停、单步、拖进度、三个条件切换和重置。`}
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
              <path d="M0,0 L6,3 L0,6 Z" fill={C.danger} />
            </marker>
          </defs>

          <rect x="0" y="0" width="900" height="700" rx="14" fill={C.bg} />
          <text x="30" y="34" fontSize="16" fontWeight="700" fill={C.primary}>
            观察 → 排序 → 全序广播 → 准备 → 提交 → 任期与成员变更
          </text>
          <text x="30" y="58" fontSize="12" fill={C.secondary}>
            一致性是允许哪些历史被看见，共识是如何让决定只出现一次
          </text>

          <rect
            x="28"
            y="80"
            width="844"
            height="88"
            rx="12"
            fill={C.elevated}
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
            {FAULT_LABELS[fault]} · {COMMIT_LABELS[commit]}
          </text>
          <text x="48" y="136" fontSize="11" fill={C.secondary}>
            {result.note}
          </text>
          <text x="48" y="156" fontSize="11" fill={result.color}>
            验收条件：
            {result.ok
              ? "一个提交事实、可追溯任期和多数证据"
              : "保留未知或停写，不把收敛/准备误写成已提交"}
          </text>

          <g
            ref={(node) => {
              stageRefs.current[0] = node;
            }}
            opacity="0"
          >
            <rect
              x="28"
              y="202"
              width="170"
              height="112"
              rx="10"
              fill={C.accent}
              fillOpacity="0.1"
              stroke={C.accent}
            />
            <text x="48" y="232" fontSize="12" fontWeight="700" fill={C.accent}>
              并发观察
            </text>
            <text x="48" y="260" fontSize="11" fill={C.secondary}>
              客户端 A：写入 x=1
            </text>
            <text x="48" y="284" fontSize="11" fill={C.secondary}>
              客户端 B：读取旧版本
            </text>
          </g>

          <g
            ref={(node) => {
              stageRefs.current[1] = node;
            }}
            opacity="0"
          >
            <rect
              x="218"
              y="202"
              width="190"
              height="112"
              rx="10"
              fill={model === "eventual" ? C.warning : C.accent}
              fillOpacity="0.1"
              stroke={model === "eventual" ? C.warning : C.accent}
            />
            <text
              x="238"
              y="232"
              fontSize="12"
              fontWeight="700"
              fill={model === "eventual" ? C.warning : C.accent}
            >
              历史约束
            </text>
            <text x="238" y="260" fontSize="11" fill={C.secondary}>
              {model === "linear"
                ? "实时先后必须可线性化"
                : model === "causal"
                  ? "因果写入不能被倒置"
                  : "允许暂时看见旧值"}
            </text>
            <text x="238" y="284" fontSize="11" fill={C.secondary}>
              选择模型就是选择可见历史
            </text>
          </g>

          <g
            ref={(node) => {
              stageRefs.current[2] = node;
            }}
            opacity="0"
          >
            <rect
              x="428"
              y="202"
              width="190"
              height="112"
              rx="10"
              fill={split ? C.danger : C.accent}
              fillOpacity="0.1"
              stroke={split ? C.danger : C.accent}
            />
            <text
              x="448"
              y="232"
              fontSize="12"
              fontWeight="700"
              fill={split ? C.danger : C.accent}
            >
              全序日志
            </text>
            <text x="448" y="260" fontSize="11" fill={C.secondary}>
              {split ? "两侧各自看见局部日志" : "R1、R2、R3 接收 A→B"}
            </text>
            <text x="448" y="284" fontSize="11" fill={C.secondary}>
              相同顺序不等于已提交
            </text>
          </g>

          <g
            ref={(node) => {
              stageRefs.current[3] = node;
            }}
            opacity="0"
          >
            <rect
              x="638"
              y="202"
              width="234"
              height="112"
              rx="10"
              fill={commit === "two-phase" ? C.warning : C.accent}
              fillOpacity="0.1"
              stroke={commit === "two-phase" ? C.warning : C.accent}
            />
            <text
              x="658"
              y="232"
              fontSize="12"
              fontWeight="700"
              fill={commit === "two-phase" ? C.warning : C.accent}
            >
              准备阶段
            </text>
            <text x="658" y="260" fontSize="11" fill={C.secondary}>
              {commit === "two-phase"
                ? "参与者锁定但等待决定"
                : "多数确认候选值"}
            </text>
            <text x="658" y="284" fontSize="11" fill={C.secondary}>
              prepare 不是 commit
            </text>
          </g>

          <line
            x1="198"
            y1="258"
            x2="214"
            y2="258"
            stroke={C.border}
            strokeWidth="1.5"
            markerEnd={`url(#${arrowId})`}
          />
          <line
            x1="408"
            y1="258"
            x2="424"
            y2="258"
            stroke={split ? C.danger : C.border}
            strokeWidth="1.5"
            markerEnd={`url(#${split ? warningArrowId : arrowId})`}
          />
          <line
            x1="618"
            y1="258"
            x2="634"
            y2="258"
            stroke={C.border}
            strokeWidth="1.5"
            markerEnd={`url(#${arrowId})`}
          />

          <g
            ref={(node) => {
              stageRefs.current[4] = node;
            }}
            opacity="0"
          >
            <rect
              x="28"
              y="350"
              width="404"
              height="112"
              rx="12"
              fill={result.color}
              fillOpacity="0.08"
              stroke={result.color}
            />
            <text
              x="48"
              y="380"
              fontSize="12"
              fontWeight="700"
              fill={result.color}
            >
              提交决定
            </text>
            <text x="48" y="408" fontSize="11" fill={C.secondary}>
              {commit === "consensus"
                ? "多数交集确认：任期 7，日志索引 42"
                : commit === "two-phase"
                  ? "协调者发出 commit 或参与者继续等待"
                  : "各副本先写本地，之后再尝试合并"}
            </text>
            <text x="48" y="436" fontSize="11" fill={result.color}>
              {result.ok ? "唯一决定可被重放" : "决定证据不足，保留未知"}
            </text>
          </g>

          <g
            ref={(node) => {
              stageRefs.current[5] = node;
            }}
            opacity="0"
          >
            <rect
              x="460"
              y="350"
              width="412"
              height="112"
              rx="12"
              fill={fault === "leader" ? C.warning : C.success}
              fillOpacity="0.08"
              stroke={fault === "leader" ? C.warning : C.success}
            />
            <text
              x="480"
              y="380"
              fontSize="12"
              fontWeight="700"
              fill={fault === "leader" ? C.warning : C.success}
            >
              任期与成员
            </text>
            <text x="480" y="408" fontSize="11" fill={C.secondary}>
              {fault === "leader"
                ? "新领导者取得任期 8，旧领导者的未提交日志被截断"
                : "成员集写入配置日志，旧视图不能再次取得多数"}
            </text>
            <text
              x="480"
              y="436"
              fontSize="11"
              fill={fault === "leader" ? C.warning : C.success}
            >
              任期、索引和成员集是独立交接证据
            </text>
          </g>

          <rect
            x="28"
            y="500"
            width="844"
            height="136"
            rx="12"
            fill={C.elevated}
            stroke={C.border}
            strokeWidth="1.5"
          />
          <text x="48" y="530" fontSize="12" fontWeight="700" fill={C.primary}>
            外部证据表：历史、日志与成员配置必须能互相对上
          </text>
          <text x="48" y="558" fontSize="11" fill={C.secondary}>
            历史：A 写入 → B 读取 · 模型：{MODEL_LABELS[model]} · 结果：
            {result.title}
          </text>
          <text x="48" y="584" fontSize="11" fill={C.secondary}>
            日志：任期 7 / 索引 42 · 多数：
            {commit === "consensus" ? "2/3 确认" : "无多数提交证明"} · 故障：
            {FAULT_LABELS[fault]}
          </text>
          <rect
            x="48"
            y="600"
            width="804"
            height="22"
            rx="7"
            fill={result.color}
            fillOpacity="0.12"
          />
          <text
            x="450"
            y="616"
            textAnchor="middle"
            fontSize="11"
            fill={result.color}
          >
            {result.ok
              ? "通过条件：同一提交值、同一日志顺序、可追溯任期和成员集"
              : "通过条件：明确停写或阻塞，不把副本收敛、准备或单票当成提交"}
          </text>

          <text x="30" y="676" fontSize="11" fill={result.color}>
            当前时间线：第 {activeIndex + 1} / {STEPS.length} 步 ·{" "}
            {activeStep?.caption ?? "选择阶段"}
          </text>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="先预测并发历史能否线性化，再只改变一个模型、故障或提交协议并重放。"
          reset={{
            label: "重置第 9 章实验",
            ariaLabel: "重置一致性与共识第 9 章实验",
            onClick: reset,
          }}
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        一致性规定可见历史，共识规定决定如何唯一落地；任期、日志和成员配置把承诺变成可复核证据。
      </figcaption>
    </figure>
  );
}
