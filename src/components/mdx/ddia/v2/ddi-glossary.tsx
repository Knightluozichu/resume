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

type Focus = "consistency" | "stream" | "storage" | "privacy";
type Failure = "none" | "retry" | "stale" | "conflict";
type Evidence = "trace" | "label";
type Scope = "bounded" | "unbounded";

const STEPS: readonly TeachingStep[] = [
  { label: "term", caption: "术语先绑定可观察的状态和动作" },
  { label: "relation", caption: "相邻概念说明它依赖、区别或组合什么" },
  { label: "example", caption: "一个具体请求把定义落到系统路径" },
  { label: "failure", caption: "反例说明保证在哪个故障条件下失效" },
  { label: "evidence", caption: "日志、指标和对账把术语变成可审计证据" },
  { label: "review", caption: "评审记录范围、责任人和仍然未知的部分" },
];

const LABEL_TEXT: Readonly<Record<string, string>> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

const FOCUS_LABELS: Record<Focus, string> = {
  consistency: "一致性",
  stream: "流处理",
  storage: "存储",
  privacy: "隐私",
};

const FAILURE_LABELS: Record<Failure, string> = {
  none: "无故障",
  retry: "重复重试",
  stale: "陈旧读取",
  conflict: "并发冲突",
};

const EVIDENCE_LABELS: Record<Evidence, string> = {
  trace: "有轨迹证据",
  label: "只有标签",
};

const SCOPE_LABELS: Record<Scope, string> = {
  bounded: "声明有边界",
  unbounded: "声明无边界",
};

function resultFor(
  focus: Focus,
  failure: Failure,
  evidence: Evidence,
  scope: Scope,
) {
  if (scope === "unbounded") {
    return {
      ok: false,
      color: C.danger,
      title: "保证范围越界",
      note: "“高可用”“恰好一次”或“隐私安全”不能脱离故障模型、数据范围和责任人；没有边界的术语无法作为交付承诺。",
    };
  }
  if (evidence === "label") {
    return {
      ok: false,
      color: C.warning,
      title: "只有标签，没有证据",
      note: "一个术语若没有请求 id、版本、时间线、指标或业务对账，就无法区分正常路径和失败后的偶然结果。",
    };
  }
  if (failure === "retry" && focus === "consistency") {
    return {
      ok: true,
      color: C.success,
      title: "幂等边界可验证",
      note: "重复请求沿同一操作 id 进入日志；通过提交记录、去重结果和最终读路径，可以验证一次逻辑操作没有扩大副作用。",
    };
  }
  if (failure === "stale" && focus === "stream") {
    return {
      ok: true,
      color: C.success,
      title: "陈旧范围已声明",
      note: "事件时间、watermark、lag 和修正版本一起说明读者可能看到什么；及时性与完整性没有被混成一个标签。",
    };
  }
  if (failure === "conflict" && focus === "storage") {
    return {
      ok: false,
      color: C.warning,
      title: "需要写冲突证据",
      note: "快照或副本状态不能单独说明谁赢了；要记录版本、冲突键、提交顺序和补偿结果，再谈隔离或一致性。",
    };
  }
  if (failure === "conflict" && focus === "privacy") {
    return {
      ok: false,
      color: C.warning,
      title: "权限冲突需人工裁决",
      note: "隐私目的、访问授权和删除请求冲突时，不能用最新写入覆盖责任；必须保留审计轨迹和申诉路径。",
    };
  }
  return {
    ok: true,
    color: C.success,
    title: "术语卡可交接",
    note: "定义、相邻关系、具体例子、失败反例和证据路径互相对齐；评审者可以知道这个词何时成立、何时不成立。",
  };
}

export function DdiGlossarySemanticsLab() {
  const stageRefs = useRef<Array<SVGGElement | null>>([]);
  const rawId = useId();
  const instanceId = rawId.replace(/:/g, "");
  const arrowId = `ddia-glossary-arrow-${instanceId}`;
  const warningArrowId = `ddia-glossary-warning-${instanceId}`;
  const [focus, setFocus] = useState<Focus>("consistency");
  const [failure, setFailure] = useState<Failure>("retry");
  const [evidence, setEvidence] = useState<Evidence>("trace");
  const [scope, setScope] = useState<Scope>("bounded");

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
  const result = resultFor(focus, failure, evidence, scope);
  const risky = !result.ok;

  function reset() {
    setFocus("consistency");
    setFailure("retry");
    setEvidence("trace");
    setScope("bounded");
    timeline.goToStep(0);
  }

  return (
    <figure
      className="mdx-figure not-prose mx-auto my-8"
      data-visual-kind="ddia-13-glossary"
    >
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-6">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              DDIA · 术语表
            </p>
            <h3 className="mt-1 text-lg font-semibold text-primary">
              把一个词变成可审计的术语卡
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
              选择术语领域、故障、证据强度和保证范围；沿六阶段时间线观察“定义—关系—反例—证据”如何让设计评审说同一种语言。
            </p>
          </div>
          <div className="flex flex-wrap gap-2" aria-label="选择术语领域">
            {(Object.entries(FOCUS_LABELS) as [Focus, string][]).map(
              ([value, label]) => (
                <button
                  key={value}
                  type="button"
                  aria-pressed={focus === value}
                  onClick={() => setFocus(value)}
                  className={`min-h-11 rounded-control border px-3 py-2 text-xs transition-colors duration-(--duration-hover) ease-standard ${
                    focus === value
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
          <div className="flex flex-wrap gap-2" aria-label="选择故障条件">
            <span className="self-center text-xs text-secondary">反例：</span>
            {(Object.entries(FAILURE_LABELS) as [Failure, string][]).map(
              ([value, label]) => (
                <button
                  key={value}
                  type="button"
                  aria-pressed={failure === value}
                  onClick={() => setFailure(value)}
                  className={`min-h-11 rounded-control border px-3 py-2 text-xs transition-colors duration-(--duration-hover) ease-standard ${
                    failure === value
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
          <div className="flex flex-wrap gap-2" aria-label="选择证据强度">
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
                      ? value === "label"
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
          <div className="flex flex-wrap gap-2" aria-label="选择保证范围">
            <span className="self-center text-xs text-secondary">范围：</span>
            {(Object.entries(SCOPE_LABELS) as [Scope, string][]).map(
              ([value, label]) => (
                <button
                  key={value}
                  type="button"
                  aria-pressed={scope === value}
                  onClick={() => setScope(value)}
                  className={`min-h-11 rounded-control border px-3 py-2 text-xs transition-colors duration-(--duration-hover) ease-standard ${
                    scope === value
                      ? value === "unbounded"
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
          aria-label={`术语表实验图：领域为${FOCUS_LABELS[focus]}，反例为${FAILURE_LABELS[failure]}，证据为${EVIDENCE_LABELS[evidence]}，范围为${SCOPE_LABELS[scope]}，当前结论为${result.title}。时间线展示术语、关系、例子、故障、证据和评审六阶段；支持播放、暂停、单步、拖进度、四个条件切换和重置。`}
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
            术语 → 关系 → 例子 → 反例 → 证据 → 评审
          </text>
          <text x="30" y="58" fontSize="12" fill={C.secondary}>
            一个保证只有在可观察、可反驳、声明范围明确时，才适合写进设计文档
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
            当前结论：{result.title} · {FOCUS_LABELS[focus]} ·{" "}
            {FAILURE_LABELS[failure]} · {EVIDENCE_LABELS[evidence]} ·{" "}
            {SCOPE_LABELS[scope]}
          </text>
          <text x="48" y="136" fontSize="11" fill={C.secondary}>
            {result.note}
          </text>
          <text x="48" y="156" fontSize="11" fill={result.color}>
            验收条件：
            {result.ok
              ? "术语卡可被另一位评审者复核"
              : "先补齐反例、证据或声明范围"}
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
              术语
            </text>
            <text x="44" y="260" fontSize="11" fill={C.secondary}>
              {FOCUS_LABELS[focus]}
            </text>
            <text x="44" y="284" fontSize="11" fill={C.secondary}>
              谁观察 · 看什么
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
              关系
            </text>
            <text x="186" y="260" fontSize="11" fill={C.secondary}>
              依赖 · 区别 · 组合
            </text>
            <text x="186" y="284" fontSize="11" fill={C.secondary}>
              相邻词有边界
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
              fill={C.accent}
              fillOpacity="0.1"
              stroke={C.accent}
            />
            <text
              x="328"
              y="232"
              fontSize="12"
              fontWeight="700"
              fill={C.accent}
            >
              例子
            </text>
            <text x="328" y="260" fontSize="11" fill={C.secondary}>
              request-1042
            </text>
            <text x="328" y="284" fontSize="11" fill={C.secondary}>
              状态 · 版本 · 结果
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
              fill={risky ? C.warning : C.accent}
              fillOpacity="0.1"
              stroke={risky ? C.warning : C.accent}
            />
            <text
              x="470"
              y="232"
              fontSize="12"
              fontWeight="700"
              fill={risky ? C.warning : C.accent}
            >
              反例
            </text>
            <text x="470" y="260" fontSize="11" fill={C.secondary}>
              {FAILURE_LABELS[failure]}
            </text>
            <text x="470" y="284" fontSize="11" fill={C.secondary}>
              何时不成立
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
              fill={evidence === "trace" ? C.success : C.warning}
              fillOpacity="0.1"
              stroke={evidence === "trace" ? C.success : C.warning}
            />
            <text
              x="612"
              y="232"
              fontSize="12"
              fontWeight="700"
              fill={evidence === "trace" ? C.success : C.warning}
            >
              证据
            </text>
            <text x="612" y="260" fontSize="11" fill={C.secondary}>
              {EVIDENCE_LABELS[evidence]}
            </text>
            <text x="612" y="284" fontSize="11" fill={C.secondary}>
              log · metric · 对账
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
              fill={scope === "bounded" ? C.success : C.danger}
              fillOpacity="0.1"
              stroke={scope === "bounded" ? C.success : C.danger}
            />
            <text
              x="754"
              y="232"
              fontSize="12"
              fontWeight="700"
              fill={scope === "bounded" ? C.success : C.danger}
            >
              评审
            </text>
            <text x="754" y="260" fontSize="11" fill={C.secondary}>
              {SCOPE_LABELS[scope]}
            </text>
            <text x="754" y="284" fontSize="11" fill={C.secondary}>
              owner · unknowns
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
            stroke={risky ? C.warning : C.border}
            strokeWidth="1.5"
            markerEnd={`url(#${risky ? warningArrowId : arrowId})`}
          />
          <line
            x1="582"
            y1="258"
            x2="592"
            y2="258"
            stroke={evidence === "label" ? C.warning : C.border}
            strokeWidth="1.5"
            markerEnd={`url(#${evidence === "label" ? warningArrowId : arrowId})`}
          />
          <line
            x1="724"
            y1="258"
            x2="734"
            y2="258"
            stroke={scope === "unbounded" ? C.danger : C.border}
            strokeWidth="1.5"
            markerEnd={`url(#${scope === "unbounded" ? warningArrowId : arrowId})`}
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
            术语卡的最小字段
          </text>
          <text x="48" y="408" fontSize="11" fill={C.secondary}>
            定义：{FOCUS_LABELS[focus]} · 观察者：服务与用户 · 范围：
            {SCOPE_LABELS[scope]}
          </text>
          <text x="48" y="436" fontSize="11" fill={C.secondary}>
            关系：前置条件与相邻概念 · 反例：{FAILURE_LABELS[failure]}
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
            评审判定
          </text>
          <text x="480" y="408" fontSize="11" fill={C.secondary}>
            证据：{EVIDENCE_LABELS[evidence]} · 失败：{FAILURE_LABELS[failure]}
          </text>
          <text x="480" y="436" fontSize="11" fill={result.color}>
            {result.ok
              ? "可交接：另一位评审者可以用同一请求和轨迹复核术语。"
              : "不可交接：保留为局部观察或未知，不能升级成系统保证。"}
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
            外部证据表：定义、反例和保证范围必须能互相对上
          </text>
          <text x="48" y="558" fontSize="11" fill={C.secondary}>
            term：{FOCUS_LABELS[focus]} · request：request-1042 · version：v18 ·
            owner：data-platform
          </text>
          <text x="48" y="584" fontSize="11" fill={C.secondary}>
            failure：{FAILURE_LABELS[failure]} · evidence：
            {EVIDENCE_LABELS[evidence]} · scope：{SCOPE_LABELS[scope]}
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
              ? "通过条件：术语可观察、反例可复现、证据可追溯、保证范围有边界"
              : "通过条件：补齐可观察轨迹，明确反例和仍然未知的范围"}
          </text>

          <text x="30" y="676" fontSize="11" fill={result.color}>
            当前时间线：第 {activeIndex + 1} / {STEPS.length} 步 ·{" "}
            {activeStep?.caption ?? "选择阶段"}
          </text>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="先挑一个术语写出反例，再只改变故障、证据或范围条件，观察它是否仍然能作为保证。"
          reset={{
            label: "重置术语表实验",
            ariaLabel: "重置 DDIA 术语表实验",
            onClick: reset,
          }}
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        术语表不是词汇堆，而是一份把定义、边界、反例和证据交给下一位工程师的评审接口。
      </figcaption>
    </figure>
  );
}
