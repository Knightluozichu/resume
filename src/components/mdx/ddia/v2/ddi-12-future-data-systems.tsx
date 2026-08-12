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

type Architecture = "derived" | "coupled";
type Authority = "single" | "multiple";
type Verification = "verify" | "trust";
type Governance = "bounded" | "tracked";

const STEPS: readonly TeachingStep[] = [
  { label: "source", caption: "权威源保存事实、版本和业务不变量" },
  { label: "derive", caption: "数据流把事实转换成可丢弃、可重建的派生状态" },
  { label: "serve", caption: "专用存储服务查询、搜索或分析读模型" },
  { label: "observe", caption: "血缘、版本和延迟让派生状态变得可观察" },
  { label: "verify", caption: "端到端约束与独立校验验证用户真正看到的结果" },
  { label: "govern", caption: "目的、最小采集、保留期和申诉路径约束数据使用" },
];

const LABEL_TEXT: Readonly<Record<string, string>> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

const ARCHITECTURE_LABELS: Record<Architecture, string> = {
  derived: "派生数据流",
  coupled: "多处直接写入",
};

const AUTHORITY_LABELS: Record<Authority, string> = {
  single: "单一权威源",
  multiple: "多个写入源",
};

const VERIFICATION_LABELS: Record<Verification, string> = {
  verify: "独立验证",
  trust: "相信系统自报",
};

const GOVERNANCE_LABELS: Record<Governance, string> = {
  bounded: "目的受限",
  tracked: "无限跟踪",
};

function resultFor(
  architecture: Architecture,
  authority: Authority,
  verification: Verification,
  governance: Governance,
) {
  if (architecture === "coupled" && authority === "multiple") {
    return {
      ok: false,
      color: C.danger,
      title: "双写冲突无法归因",
      note: "多个系统都能修改事实，缓存、搜索和分析各自写回时没有单一权威；故障后无法判断谁应被重放或覆盖。",
    };
  }
  if (governance === "tracked") {
    return {
      ok: false,
      color: C.danger,
      title: "采集边界越过目的",
      note: "更长保留期和无限跟踪会把预测能力变成采集许可；需要目的、最小字段、访问记录、删除和申诉边界。",
    };
  }
  if (verification === "trust") {
    return {
      ok: false,
      color: C.warning,
      title: "系统自报不能证明正确",
      note: "任务成功、索引在线或副本健康只能说明内部路径完成；还要用不变量、独立重算和业务对账检查端到端结果。",
    };
  }
  if (architecture === "derived" && authority === "single") {
    return {
      ok: true,
      color: C.success,
      title: "可追踪且可重建",
      note: "权威源只保存事实，专用工具消费版本化数据流生成派生视图；血缘、约束和独立验证共同形成恢复路径。",
    };
  }
  return {
    ok: true,
    color: C.success,
    title: "边界可交接",
    note: "当前组合仍需记录权威源、派生版本、验证结果和治理决定，才能在延迟或故障后解释用户看到的状态。",
  };
}

export function Ddi12FutureDataSystemsLab() {
  const stageRefs = useRef<Array<SVGGElement | null>>([]);
  const rawId = useId();
  const instanceId = rawId.replace(/:/g, "");
  const arrowId = `ddia-12-future-arrow-${instanceId}`;
  const warningArrowId = `ddia-12-future-warning-${instanceId}`;
  const [architecture, setArchitecture] = useState<Architecture>("derived");
  const [authority, setAuthority] = useState<Authority>("single");
  const [verification, setVerification] = useState<Verification>("verify");
  const [governance, setGovernance] = useState<Governance>("bounded");

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
  const result = resultFor(architecture, authority, verification, governance);
  const conflict = architecture === "coupled" && authority === "multiple";
  const privacyRisk = governance === "tracked";

  function reset() {
    setArchitecture("derived");
    setAuthority("single");
    setVerification("verify");
    setGovernance("bounded");
    timeline.goToStep(0);
  }

  return (
    <figure
      className="mdx-figure not-prose mx-auto my-8"
      data-visual-kind="ddia-12-future-data-systems"
    >
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-6">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              DDIA · 第 12 章
            </p>
            <h3 className="mt-1 text-lg font-semibold text-primary">
              让未来的数据系统可组合、可验证、可负责
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
              选择数据组合方式、权威源数量、验证策略和治理边界；沿六阶段时间线观察一次数据流如何从事实抵达用户，并留下重建与申诉路径。
            </p>
          </div>
          <div className="flex flex-wrap gap-2" aria-label="选择数据组合方式">
            {(
              Object.entries(ARCHITECTURE_LABELS) as [Architecture, string][]
            ).map(([value, label]) => (
              <button
                key={value}
                type="button"
                aria-pressed={architecture === value}
                onClick={() => setArchitecture(value)}
                className={`min-h-11 rounded-control border px-3 py-2 text-xs transition-colors duration-(--duration-hover) ease-standard ${
                  architecture === value
                    ? value === "coupled"
                      ? "border-danger text-danger"
                      : "border-accent text-accent"
                    : "border-border text-secondary hover:border-accent hover:text-primary"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-4 grid gap-3 md:grid-cols-3">
          <div className="flex flex-wrap gap-2" aria-label="选择权威源">
            <span className="self-center text-xs text-secondary">事实：</span>
            {(Object.entries(AUTHORITY_LABELS) as [Authority, string][]).map(
              ([value, label]) => (
                <button
                  key={value}
                  type="button"
                  aria-pressed={authority === value}
                  onClick={() => setAuthority(value)}
                  className={`min-h-11 rounded-control border px-3 py-2 text-xs transition-colors duration-(--duration-hover) ease-standard ${
                    authority === value
                      ? value === "multiple"
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
          <div className="flex flex-wrap gap-2" aria-label="选择验证策略">
            <span className="self-center text-xs text-secondary">证据：</span>
            {(
              Object.entries(VERIFICATION_LABELS) as [Verification, string][]
            ).map(([value, label]) => (
              <button
                key={value}
                type="button"
                aria-pressed={verification === value}
                onClick={() => setVerification(value)}
                className={`min-h-11 rounded-control border px-3 py-2 text-xs transition-colors duration-(--duration-hover) ease-standard ${
                  verification === value
                    ? value === "trust"
                      ? "border-warning text-warning"
                      : "border-accent text-accent"
                    : "border-border text-secondary hover:border-accent hover:text-primary"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap gap-2" aria-label="选择治理边界">
            <span className="self-center text-xs text-secondary">治理：</span>
            {(Object.entries(GOVERNANCE_LABELS) as [Governance, string][]).map(
              ([value, label]) => (
                <button
                  key={value}
                  type="button"
                  aria-pressed={governance === value}
                  onClick={() => setGovernance(value)}
                  className={`min-h-11 rounded-control border px-3 py-2 text-xs transition-colors duration-(--duration-hover) ease-standard ${
                    governance === value
                      ? value === "tracked"
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
          aria-label={`数据系统未来实验图：组合方式为${ARCHITECTURE_LABELS[architecture]}，事实源为${AUTHORITY_LABELS[authority]}，证据策略为${VERIFICATION_LABELS[verification]}，治理为${GOVERNANCE_LABELS[governance]}，当前结论为${result.title}。时间线展示权威源、数据流、派生视图、观察、验证和治理六阶段；支持播放、暂停、单步、拖进度、四个条件切换和重置。`}
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
            权威源 → 数据流 → 派生视图 → 观察 → 验证 → 治理
          </text>
          <text x="30" y="58" fontSize="12" fill={C.secondary}>
            专用工具可以组合，但事实、约束、证据和责任不能被拆散
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
            当前结论：{result.title} · {ARCHITECTURE_LABELS[architecture]} ·{" "}
            {AUTHORITY_LABELS[authority]} · {VERIFICATION_LABELS[verification]}{" "}
            · {GOVERNANCE_LABELS[governance]}
          </text>
          <text x="48" y="136" fontSize="11" fill={C.secondary}>
            {result.note}
          </text>
          <text x="48" y="156" fontSize="11" fill={result.color}>
            验收条件：
            {result.ok
              ? "血缘、约束、验证和治理决定可交接"
              : "先停止发布，补齐事实或责任边界"}
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
              权威源
            </text>
            <text x="44" y="260" fontSize="11" fill={C.secondary}>
              orders-v42
            </text>
            <text x="44" y="284" fontSize="11" fill={C.secondary}>
              事实 · 版本 · 不变量
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
              数据流
            </text>
            <text x="186" y="260" fontSize="11" fill={C.secondary}>
              change-log · offset
            </text>
            <text x="186" y="284" fontSize="11" fill={C.secondary}>
              批与流共用逻辑
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
              派生视图
            </text>
            <text x="328" y="260" fontSize="11" fill={C.secondary}>
              search-v18
            </text>
            <text x="328" y="284" fontSize="11" fill={C.secondary}>
              可丢弃 · 可重建
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
              fill={C.accent}
              fillOpacity="0.1"
              stroke={C.accent}
            />
            <text
              x="470"
              y="232"
              fontSize="12"
              fontWeight="700"
              fill={C.accent}
            >
              观察
            </text>
            <text x="470" y="260" fontSize="11" fill={C.secondary}>
              lineage · lag · owner
            </text>
            <text x="470" y="284" fontSize="11" fill={C.secondary}>
              当前状态有出处
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
              fill={verification === "trust" ? C.warning : C.accent}
              fillOpacity="0.1"
              stroke={verification === "trust" ? C.warning : C.accent}
            />
            <text
              x="612"
              y="232"
              fontSize="12"
              fontWeight="700"
              fill={verification === "trust" ? C.warning : C.accent}
            >
              验证
            </text>
            <text x="612" y="260" fontSize="11" fill={C.secondary}>
              {verification === "trust" ? "任务自报成功" : "独立重算 + 对账"}
            </text>
            <text x="612" y="284" fontSize="11" fill={C.secondary}>
              端到端不变量
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
              fill={privacyRisk ? C.danger : C.success}
              fillOpacity="0.1"
              stroke={privacyRisk ? C.danger : C.success}
            />
            <text
              x="754"
              y="232"
              fontSize="12"
              fontWeight="700"
              fill={privacyRisk ? C.danger : C.success}
            >
              治理
            </text>
            <text x="754" y="260" fontSize="11" fill={C.secondary}>
              {governance === "tracked" ? "无限跟踪" : "目的与最小采集"}
            </text>
            <text x="754" y="284" fontSize="11" fill={C.secondary}>
              删除 · 申诉 · 审计
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
            stroke={C.border}
            strokeWidth="1.5"
            markerEnd={`url(#${arrowId})`}
          />
          <line
            x1="582"
            y1="258"
            x2="592"
            y2="258"
            stroke={verification === "trust" ? C.warning : C.border}
            strokeWidth="1.5"
            markerEnd={`url(#${verification === "trust" ? warningArrowId : arrowId})`}
          />
          <line
            x1="724"
            y1="258"
            x2="734"
            y2="258"
            stroke={privacyRisk ? C.danger : C.border}
            strokeWidth="1.5"
            markerEnd={`url(#${privacyRisk ? warningArrowId : arrowId})`}
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
            事实与派生边界
          </text>
          <text x="48" y="408" fontSize="11" fill={C.secondary}>
            组合：{ARCHITECTURE_LABELS[architecture]} · 权威：
            {AUTHORITY_LABELS[authority]}
          </text>
          <text
            x="48"
            y="436"
            fontSize="11"
            fill={conflict ? C.danger : C.secondary}
          >
            {conflict
              ? "冲突：多个写入源都声称自己是事实，失败后没有唯一重建入口。"
              : "每个派生视图都记录输入版本、转换版本、负责人和可重建命令。"}
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
            证据与责任边界
          </text>
          <text x="480" y="408" fontSize="11" fill={C.secondary}>
            验证：{VERIFICATION_LABELS[verification]} · 治理：
            {GOVERNANCE_LABELS[governance]}
          </text>
          <text x="480" y="436" fontSize="11" fill={result.color}>
            {result.ok
              ? "可交接：失败可重建，结果可对账，用户能知道数据如何被使用。"
              : "不可交接：先停止发布并补齐独立证据、目的限制或申诉路径。"}
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
            外部证据表：血缘、约束、验证与治理必须能互相对上
          </text>
          <text x="48" y="558" fontSize="11" fill={C.secondary}>
            源：orders-v42 · 流：change-log@1842 · 视图：search-v18 ·
            owner：data-platform
          </text>
          <text x="48" y="584" fontSize="11" fill={C.secondary}>
            约束：金额守恒 · 验证：
            {verification === "trust" ? "任务自报" : "独立重算 + 业务对账"} ·
            目的：{governance === "tracked" ? "未限定" : "订单履约"}
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
              ? "通过条件：任何派生结果都能追溯、重建、验证，并说明收集与使用目的"
              : "通过条件：回到单一事实源，补充端到端校验和用户风险控制"}
          </text>

          <text x="30" y="676" fontSize="11" fill={result.color}>
            当前时间线：第 {activeIndex + 1} / {STEPS.length} 步 ·{" "}
            {activeStep?.caption ?? "选择阶段"}
          </text>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="先猜测双写、错误自报或无限跟踪会在哪个边界造成问题，再只改变一个架构、证据或治理条件并重放。"
          reset={{
            label: "重置第 12 章实验",
            ariaLabel: "重置数据系统未来第 12 章实验",
            onClick: reset,
          }}
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        数据系统的未来不只是更多专用工具，而是让事实、派生关系、约束、验证和责任一起可追踪。
      </figcaption>
    </figure>
  );
}
