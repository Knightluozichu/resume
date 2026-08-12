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

type Scope = "data" | "distributed" | "privacy" | "all";
type Fault = "none" | "timeout" | "stale" | "duplicate";
type Evidence = "trace" | "dashboard";
type Decision = "publish" | "hold";

const STEPS: readonly TeachingStep[] = [
  { label: "invariant", caption: "从用户结果写出不可妥协的不变量" },
  { label: "matrix", caption: "把不变量映射到第 1 版的 12 章决策" },
  { label: "fault", caption: "只注入一个故障并定位首个分岔" },
  { label: "evidence", caption: "用轨迹、指标与业务对账验证结论" },
  { label: "recover", caption: "从明确检查点恢复并确认派生状态" },
  { label: "release", caption: "范围、未知项和回退责任明确后再发布" },
];

const LABEL_TEXT: Readonly<Record<string, string>> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

const SCOPE_LABELS: Record<Scope, string> = {
  data: "数据边界",
  distributed: "分布式边界",
  privacy: "隐私边界",
  all: "全链路",
};

const FAULT_LABELS: Record<Fault, string> = {
  none: "基线",
  timeout: "超时",
  stale: "陈旧读",
  duplicate: "重复投递",
};

const EVIDENCE_LABELS: Record<Evidence, string> = {
  trace: "原始轨迹 + 对账",
  dashboard: "只看仪表盘",
};

const DECISION_LABELS: Record<Decision, string> = {
  publish: "允许发布",
  hold: "暂停发布",
};

function resultFor(
  scope: Scope,
  fault: Fault,
  evidence: Evidence,
  decision: Decision,
) {
  if (decision === "publish" && fault !== "none") {
    return {
      ok: false,
      color: C.danger,
      title: "不应带故障结果发布",
      note: "故障场景仍有未解释的首个分岔或恢复差异；发布前应暂停，补齐证据、回退方案和责任人。",
    };
  }
  if (evidence === "dashboard") {
    return {
      ok: false,
      color: C.warning,
      title: "仪表盘不足以结案",
      note: "服务在线和平均指标不能证明没有丢失、重复、错误顺序或权限泄露；需要原始轨迹和独立业务对账。",
    };
  }
  if (scope === "privacy" && fault === "stale") {
    return {
      ok: false,
      color: C.warning,
      title: "隐私撤回仍需读路径验证",
      note: "陈旧副本可能继续暴露已撤回的数据；要验证缓存、索引和分析视图的失效时间，并保留紧急停止路径。",
    };
  }
  if (decision === "hold") {
    return {
      ok: true,
      color: C.success,
      title: "风险被正确隔离",
      note: "暂停发布让旧版本继续服务；团队可以在同一输入上重放故障，直到恢复、对账和回退条件全部满足。",
    };
  }
  return {
    ok: true,
    color: C.success,
    title: "全书证据链可交接",
    note: "不变量、章节决策、故障历史、性能数据和独立对账彼此对齐；发布结论有范围，也保留了未知项。",
  };
}

export function DdiFinalReviewGateLab() {
  const stageRefs = useRef<Array<SVGGElement | null>>([]);
  const rawId = useId();
  const instanceId = rawId.replace(/:/g, "");
  const arrowId = `ddia-final-review-arrow-${instanceId}`;
  const warningArrowId = `ddia-final-review-warning-${instanceId}`;
  const [scope, setScope] = useState<Scope>("all");
  const [fault, setFault] = useState<Fault>("none");
  const [evidence, setEvidence] = useState<Evidence>("trace");
  const [decision, setDecision] = useState<Decision>("publish");

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
  const result = resultFor(scope, fault, evidence, decision);
  const risky = !result.ok;

  function reset() {
    setScope("all");
    setFault("none");
    setEvidence("trace");
    setDecision("publish");
    timeline.goToStep(0);
  }

  return (
    <figure
      className="mdx-figure not-prose mx-auto my-8"
      data-visual-kind="ddia-99-final-review"
    >
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-6">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              DDIA · 全书复核
            </p>
            <h3 className="mt-1 text-lg font-semibold text-primary">
              把 12 章知识压缩成一条发布证据链
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
              选择复核范围、注入故障、切换证据方式和发布决定；沿六阶段时间线观察不变量如何穿过章节、恢复和发布门。
            </p>
          </div>
          <div className="flex flex-wrap gap-2" aria-label="选择复核范围">
            {(Object.entries(SCOPE_LABELS) as [Scope, string][]).map(
              ([value, label]) => (
                <button
                  key={value}
                  type="button"
                  aria-pressed={scope === value}
                  onClick={() => setScope(value)}
                  className={`min-h-11 rounded-control border px-3 py-2 text-xs transition-colors duration-(--duration-hover) ease-standard ${
                    scope === value
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

        <div className="mb-4 grid gap-3 md:grid-cols-3">
          <div className="flex flex-wrap gap-2" aria-label="选择故障剧本">
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
          <div className="flex flex-wrap gap-2" aria-label="选择证据方式">
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
                      ? value === "dashboard"
                        ? "border-warning text-warning"
                        : "border-accent text-accent"
                      : "border-border text-secondary hover:border-accent hover:text-primary"
                  }`}
                >
                  {label}
                </button>
              ),
            )}
          </div>
          <div className="flex flex-wrap gap-2" aria-label="选择发布决定">
            <span className="self-center text-xs text-secondary">发布：</span>
            {(Object.entries(DECISION_LABELS) as [Decision, string][]).map(
              ([value, label]) => (
                <button
                  key={value}
                  type="button"
                  aria-pressed={decision === value}
                  onClick={() => setDecision(value)}
                  className={`min-h-11 rounded-control border px-3 py-2 text-xs transition-colors duration-(--duration-hover) ease-standard ${
                    decision === value
                      ? value === "hold"
                        ? "border-warning text-warning"
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
          aria-label={`全书复核实验图：范围为${SCOPE_LABELS[scope]}，故障为${FAULT_LABELS[fault]}，证据为${EVIDENCE_LABELS[evidence]}，发布决定为${DECISION_LABELS[decision]}，当前结论为${result.title}。时间线展示不变量、跨章矩阵、故障、证据、恢复和发布六阶段；支持播放、暂停、单步、拖进度、四个条件切换和重置。`}
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
            不变量 → 跨章矩阵 → 故障 → 证据 → 恢复 → 发布门
          </text>
          <text x="30" y="58" fontSize="12" fill={C.secondary}>
            总复习不是给全书打平均分，而是验证一条能被重放和交接的系统路径
          </text>

          <rect
            x="28"
            y="80"
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
            当前结论：{result.title} · {SCOPE_LABELS[scope]} ·{" "}
            {FAULT_LABELS[fault]} · {EVIDENCE_LABELS[evidence]} ·{" "}
            {DECISION_LABELS[decision]}
          </text>
          <text x="48" y="136" fontSize="11" fill={C.secondary}>
            {result.note}
          </text>
          <text x="48" y="156" fontSize="11" fill={result.color}>
            验收条件：
            {result.ok
              ? "每个结论都有范围、证据和回退"
              : "先暂停发布并保留局部或未知结论"}
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
              width="128"
              height="112"
              rx="10"
              fill={C.accent}
              fillOpacity="0.1"
              stroke={C.accent}
            />
            <text x="44" y="232" fontSize="12" fontWeight="700" fill={C.accent}>
              不变量
            </text>
            <text x="44" y="260" fontSize="11" fill={C.secondary}>
              金额守恒 · 唯一扣款
            </text>
            <text x="44" y="284" fontSize="11" fill={C.secondary}>
              用户能观察到什么
            </text>
          </g>

          <g
            ref={(node) => {
              stageRefs.current[1] = node;
            }}
            opacity="0"
          >
            <rect
              x="170"
              y="202"
              width="128"
              height="112"
              rx="10"
              fill={C.accent}
              fillOpacity="0.1"
              stroke={C.accent}
            />
            <text
              x="186"
              y="232"
              fontSize="12"
              fontWeight="700"
              fill={C.accent}
            >
              跨章矩阵
            </text>
            <text x="186" y="260" fontSize="11" fill={C.secondary}>
              ch1–4 · ch5–9
            </text>
            <text x="186" y="284" fontSize="11" fill={C.secondary}>
              ch10–12 · 依赖关系
            </text>
          </g>

          <g
            ref={(node) => {
              stageRefs.current[2] = node;
            }}
            opacity="0"
          >
            <rect
              x="312"
              y="202"
              width="128"
              height="112"
              rx="10"
              fill={fault === "none" ? C.accent : C.warning}
              fillOpacity="0.1"
              stroke={fault === "none" ? C.accent : C.warning}
            />
            <text
              x="328"
              y="232"
              fontSize="12"
              fontWeight="700"
              fill={fault === "none" ? C.accent : C.warning}
            >
              故障剧本
            </text>
            <text x="328" y="260" fontSize="11" fill={C.secondary}>
              {FAULT_LABELS[fault]}
            </text>
            <text x="328" y="284" fontSize="11" fill={C.secondary}>
              定位首个分岔
            </text>
          </g>

          <g
            ref={(node) => {
              stageRefs.current[3] = node;
            }}
            opacity="0"
          >
            <rect
              x="454"
              y="202"
              width="128"
              height="112"
              rx="10"
              fill={evidence === "trace" ? C.success : C.warning}
              fillOpacity="0.1"
              stroke={evidence === "trace" ? C.success : C.warning}
            />
            <text
              x="470"
              y="232"
              fontSize="12"
              fontWeight="700"
              fill={evidence === "trace" ? C.success : C.warning}
            >
              证据
            </text>
            <text x="470" y="260" fontSize="11" fill={C.secondary}>
              {EVIDENCE_LABELS[evidence]}
            </text>
            <text x="470" y="284" fontSize="11" fill={C.secondary}>
              日志 · 指标 · 对账
            </text>
          </g>

          <g
            ref={(node) => {
              stageRefs.current[4] = node;
            }}
            opacity="0"
          >
            <rect
              x="596"
              y="202"
              width="128"
              height="112"
              rx="10"
              fill={result.ok ? C.success : C.warning}
              fillOpacity="0.1"
              stroke={result.ok ? C.success : C.warning}
            />
            <text
              x="612"
              y="232"
              fontSize="12"
              fontWeight="700"
              fill={result.ok ? C.success : C.warning}
            >
              恢复
            </text>
            <text x="612" y="260" fontSize="11" fill={C.secondary}>
              checkpoint · replay
            </text>
            <text x="612" y="284" fontSize="11" fill={C.secondary}>
              旧版本仍可读
            </text>
          </g>

          <g
            ref={(node) => {
              stageRefs.current[5] = node;
            }}
            opacity="0"
          >
            <rect
              x="738"
              y="202"
              width="134"
              height="112"
              rx="10"
              fill={risky ? C.danger : C.success}
              fillOpacity="0.1"
              stroke={risky ? C.danger : C.success}
            />
            <text
              x="754"
              y="232"
              fontSize="12"
              fontWeight="700"
              fill={risky ? C.danger : C.success}
            >
              发布门
            </text>
            <text x="754" y="260" fontSize="11" fill={C.secondary}>
              {DECISION_LABELS[decision]}
            </text>
            <text x="754" y="284" fontSize="11" fill={C.secondary}>
              owner · rollback
            </text>
          </g>

          <line
            x1="156"
            y1="258"
            x2="166"
            y2="258"
            stroke={C.border}
            strokeWidth="1.5"
            markerEnd={`url(#${arrowId})`}
          />
          <line
            x1="298"
            y1="258"
            x2="308"
            y2="258"
            stroke={C.border}
            strokeWidth="1.5"
            markerEnd={`url(#${arrowId})`}
          />
          <line
            x1="440"
            y1="258"
            x2="450"
            y2="258"
            stroke={fault === "none" ? C.border : C.warning}
            strokeWidth="1.5"
            markerEnd={`url(#${fault === "none" ? arrowId : warningArrowId})`}
          />
          <line
            x1="582"
            y1="258"
            x2="592"
            y2="258"
            stroke={evidence === "trace" ? C.border : C.warning}
            strokeWidth="1.5"
            markerEnd={`url(#${evidence === "trace" ? arrowId : warningArrowId})`}
          />
          <line
            x1="724"
            y1="258"
            x2="734"
            y2="258"
            stroke={risky ? C.danger : C.border}
            strokeWidth="1.5"
            markerEnd={`url(#${risky ? warningArrowId : arrowId})`}
          />

          <rect
            x="28"
            y="350"
            width="404"
            height="112"
            rx="12"
            fill={C.elevated}
            stroke={C.border}
            strokeWidth="1.5"
          />
          <text x="48" y="380" fontSize="12" fontWeight="700" fill={C.primary}>
            跨章追踪矩阵
          </text>
          <text x="48" y="408" fontSize="11" fill={C.secondary}>
            数据：ch1–4 · 分布式：ch5–9 · 派生：ch10–12
          </text>
          <text x="48" y="436" fontSize="11" fill={C.secondary}>
            当前范围：{SCOPE_LABELS[scope]} · 每项结论都绑定不变量和首个分岔
          </text>

          <rect
            x="460"
            y="350"
            width="412"
            height="112"
            rx="12"
            fill={result.color}
            fillOpacity="0.08"
            stroke={result.color}
          />
          <text
            x="480"
            y="380"
            fontSize="12"
            fontWeight="700"
            fill={result.color}
          >
            发布判定
          </text>
          <text x="480" y="408" fontSize="11" fill={C.secondary}>
            故障：{FAULT_LABELS[fault]} · 证据：{EVIDENCE_LABELS[evidence]}
          </text>
          <text x="480" y="436" fontSize="11" fill={result.color}>
            {result.ok
              ? "可交接：范围、未知项、恢复和回退责任均已写明。"
              : "不可交接：先暂停发布，补齐原始历史或保留未知结论。"}
          </text>

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
            外部证据表：不变量、章节、故障、恢复和发布决定必须能互相对上
          </text>
          <text x="48" y="558" fontSize="11" fill={C.secondary}>
            invariant：unique-charge · matrix：ch1–12 · fault：
            {FAULT_LABELS[fault]} · request：request-1042
          </text>
          <text x="48" y="584" fontSize="11" fill={C.secondary}>
            evidence：{EVIDENCE_LABELS[evidence]} ·
            recovery：state-v18@offset-1842 · owner：release-review
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
              ? "通过条件：独立复跑能重现结论，用户读路径与业务对账一致"
              : "通过条件：撤回发布，保留旧版本并补齐故障、恢复和责任证据"}
          </text>

          <text x="30" y="676" fontSize="11" fill={result.color}>
            当前时间线：第 {activeIndex + 1} / {STEPS.length} 步 ·{" "}
            {activeStep?.caption ?? "选择阶段"}
          </text>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="先选一个用户不变量，再只改变故障、证据或发布决定，观察结论是否仍然足够支持交付。"
          reset={{
            label: "重置全书复核实验",
            ariaLabel: "重置 DDIA 全书复核实验",
            onClick: reset,
          }}
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        总复习的终点不是记住更多名词，而是能在故障下用跨章证据保护用户不变量并安全发布。
      </figcaption>
    </figure>
  );
}
