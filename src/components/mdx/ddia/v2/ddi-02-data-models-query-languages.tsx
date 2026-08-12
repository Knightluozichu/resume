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

type ModelMode = "relational" | "document" | "graph";

const STEPS: readonly TeachingStep[] = [
  {
    label: "domain",
    caption: "从业务关系、约束、身份和访问路径开始，而不是从产品名开始",
  },
  {
    label: "shape",
    caption: "选择规范化表、聚合文档或顶点与边来表达数据形状",
  },
  {
    label: "constraints",
    caption: "把多对多、引用完整性、路径和版本演化写成可检查约束",
  },
  {
    label: "query",
    caption: "比较声明式查询、遍历和 MapReduce 的意图与执行边界",
  },
  {
    label: "migrate",
    caption: "固定查询集合，比较迁移前后的结果、顺序和业务语义",
  },
  {
    label: "verify",
    caption: "用压力、部分故障与独立对账验证模型选择可以交接",
  },
];

const LABEL_TEXT: Readonly<Record<string, string>> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

export function Ddi02DataModelsQueryLanguagesLab() {
  const stageRefs = useRef<Array<SVGGElement | null>>([]);
  const [mode, setMode] = useState<ModelMode>("relational");
  const rawId = useId();
  const instanceId = rawId.replace(/:/g, "");
  const arrowId = `ddia-02-model-arrow-${instanceId}`;
  const warningArrowId = `ddia-02-model-warning-${instanceId}`;

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
  const modeLabel =
    mode === "relational"
      ? "关系模型"
      : mode === "document"
        ? "文档模型"
        : "属性图模型";
  const divergence =
    mode === "relational"
      ? "多表连接与约束成为主要观测点"
      : mode === "document"
        ? "聚合边界与重复更新成为主要观测点"
        : "路径遍历与边的选择成为主要观测点";

  function reset() {
    setMode("relational");
    timeline.goToStep(0);
  }

  const relational = mode === "relational";
  const document = mode === "document";
  const graph = mode === "graph";
  const statusColor = graph ? C.success : document ? C.warning : C.accent;

  return (
    <figure
      className="mdx-figure not-prose mx-auto my-8"
      data-visual-kind="ddia-02-data-models-query-languages"
    >
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-6">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              DDIA · 第 2 章
            </p>
            <h3 className="mt-1 text-lg font-semibold text-primary">
              先看关系与访问模式，再选数据模型
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
              同一组业务事实可有不同表达；验证重点是约束、查询和迁移后的语义是否一致。
            </p>
          </div>
          <div className="flex flex-wrap gap-2" aria-label="选择数据模型样本">
            {(
              [
                ["relational", "关系模型"],
                ["document", "文档模型"],
                ["graph", "属性图模型"],
              ] as const
            ).map(([value, label]) => (
              <button
                key={value}
                type="button"
                aria-pressed={mode === value}
                onClick={() => setMode(value)}
                className={`min-h-11 rounded-control border px-3 py-2 text-xs transition-colors duration-(--duration-hover) ease-standard ${
                  mode === value
                    ? "border-accent text-accent"
                    : "border-border text-secondary hover:border-accent hover:text-primary"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <svg
          viewBox="0 0 900 650"
          role="img"
          aria-label={`数据密集型应用系统设计第 2 章数据模型实验图：当前为${modeLabel}。时间线展示业务关系、数据形状、约束、查询、迁移和验证六阶段；首个观测分歧为${divergence}。支持播放、暂停、单步、拖进度、模型切换和重置。`}
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

          <rect x="0" y="0" width="900" height="650" rx="14" fill={C.bg} />
          <text x="30" y="34" fontSize="16" fontWeight="700" fill={C.primary}>
            业务关系 → 数据形状 → 查询意图 → 执行边界 → 迁移对账
          </text>
          <text x="30" y="58" fontSize="12" fill={C.secondary}>
            选型不是对象、SQL 或产品的偏好，而是关系、约束与访问模式的可重放比较
          </text>

          <rect
            x="28"
            y="78"
            width="844"
            height="104"
            rx="12"
            fill={C.elevated}
            stroke={C.border}
            strokeWidth="1.5"
          />
          <text
            x="46"
            y="106"
            fontSize="12"
            fontWeight="700"
            fill={statusColor}
          >
            当前样本 · {modeLabel}
          </text>
          <text x="46" y="134" fontSize="12" fill={C.primary}>
            观测契约：关系完整 · 查询结果 · 约束边界 · 迁移一致
          </text>
          <text x="46" y="160" fontSize="11" fill={C.secondary}>
            首个观测分歧：{divergence}
          </text>
          <rect
            x="702"
            y="112"
            width="142"
            height="42"
            rx="9"
            fill={statusColor}
            fillOpacity="0.12"
            stroke={statusColor}
            strokeWidth="1.5"
          />
          <text
            x="773"
            y="138"
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill={statusColor}
          >
            {graph ? "查路径" : document ? "查聚合" : "查约束"}
          </text>

          <text x="30" y="214" fontSize="12" fontWeight="700" fill={C.primary}>
            同一业务事实的三种表达
          </text>
          <rect
            x="28"
            y="230"
            width="844"
            height="188"
            rx="12"
            fill={C.elevated}
            stroke={C.border}
            strokeWidth="1.5"
          />
          <g opacity={relational ? 1 : 0.42}>
            <rect
              x="48"
              y="252"
              width="242"
              height="132"
              rx="10"
              fill={C.accent}
              fillOpacity="0.08"
              stroke={C.accent}
              strokeWidth={relational ? 1.8 : 1.2}
            />
            <text x="68" y="280" fontSize="12" fontWeight="700" fill={C.accent}>
              关系模型
            </text>
            <text x="68" y="305" fontSize="11" fill={C.secondary}>
              customer(id, name)
            </text>
            <text x="68" y="328" fontSize="11" fill={C.secondary}>
              order(id, customer_id)
            </text>
            <text x="68" y="351" fontSize="11" fill={C.secondary}>
              外键、连接、规范化
            </text>
            <text x="68" y="374" fontSize="11" fill={C.secondary}>
              约束显式，跨表查询有代价
            </text>
          </g>
          <g opacity={document ? 1 : 0.42}>
            <rect
              x="328"
              y="252"
              width="242"
              height="132"
              rx="10"
              fill={C.warning}
              fillOpacity="0.08"
              stroke={C.warning}
              strokeWidth={document ? 1.8 : 1.2}
            />
            <text
              x="348"
              y="280"
              fontSize="12"
              fontWeight="700"
              fill={C.warning}
            >
              文档模型
            </text>
            <text x="348" y="305" fontSize="11" fill={C.secondary}>
              customer: {"{"} orders: [...] {"}"}
            </text>
            <text x="348" y="328" fontSize="11" fill={C.secondary}>
              聚合、局部读取、嵌套
            </text>
            <text x="348" y="351" fontSize="11" fill={C.secondary}>
              读取方便，重复更新有风险
            </text>
            <text x="348" y="374" fontSize="11" fill={C.secondary}>
              关系变化会推动聚合边界
            </text>
          </g>
          <g opacity={graph ? 1 : 0.42}>
            <rect
              x="608"
              y="252"
              width="236"
              height="132"
              rx="10"
              fill={C.success}
              fillOpacity="0.08"
              stroke={C.success}
              strokeWidth={graph ? 1.8 : 1.2}
            />
            <text
              x="628"
              y="280"
              fontSize="12"
              fontWeight="700"
              fill={C.success}
            >
              属性图
            </text>
            <circle
              cx="660"
              cy="320"
              r="15"
              fill={C.success}
              fillOpacity="0.16"
              stroke={C.success}
            />
            <circle
              cx="770"
              cy="320"
              r="15"
              fill={C.success}
              fillOpacity="0.16"
              stroke={C.success}
            />
            <line
              x1="675"
              y1="320"
              x2="755"
              y2="320"
              stroke={C.success}
              strokeWidth="1.8"
              markerEnd={`url(#${arrowId})`}
            />
            <text x="646" y="354" fontSize="11" fill={C.secondary}>
              顶点、边、路径、属性
            </text>
            <text x="628" y="374" fontSize="11" fill={C.secondary}>
              关系自然，遍历成本需留证
            </text>
          </g>

          <text x="30" y="454" fontSize="12" fontWeight="700" fill={C.primary}>
            六阶段查询与迁移时间线
          </text>
          {STEPS.map((step, index) => {
            const isFault = graph && (index === 3 || index === 5);
            const x = 34 + index * 140;
            return (
              <g
                key={step.label}
                ref={(node) => {
                  stageRefs.current[index] = node;
                }}
                style={{ opacity: 0 }}
              >
                <circle
                  cx={x + 16}
                  cy="492"
                  r="13"
                  fill={isFault ? C.danger : C.accent}
                  fillOpacity="0.16"
                  stroke={isFault ? C.danger : C.accent}
                  strokeWidth="1.5"
                />
                <text
                  x={x + 16}
                  y="497"
                  textAnchor="middle"
                  fontSize="11"
                  fontWeight="700"
                  fill={isFault ? C.danger : C.accent}
                >
                  {index + 1}
                </text>
                <text
                  x={x + 38}
                  y="488"
                  fontSize="11"
                  fontWeight="700"
                  fill={C.primary}
                >
                  {step.label}
                </text>
                <text x={x + 38} y="510" fontSize="11" fill={C.secondary}>
                  {isFault ? "查结果差异" : "留证"}
                </text>
                {index < STEPS.length - 1 && (
                  <line
                    x1={x + 112}
                    y1="492"
                    x2={x + 132}
                    y2="492"
                    stroke={isFault ? C.danger : C.border}
                    strokeWidth="1.5"
                    markerEnd={`url(#${isFault ? warningArrowId : arrowId})`}
                  />
                )}
              </g>
            );
          })}

          <rect
            x="28"
            y="546"
            width="844"
            height="76"
            rx="10"
            fill={C.success}
            fillOpacity="0.08"
            stroke={C.success}
            strokeWidth="1"
          />
          <text x="46" y="574" fontSize="12" fontWeight="700" fill={C.success}>
            当前验收门：{activeStep?.caption ?? "选择一个阶段"}
          </text>
          <text x="46" y="598" fontSize="11" fill={C.secondary}>
            第 {activeIndex + 1} / {STEPS.length} 步 ·
            固定查询集合，保存结果集合、顺序和业务语义
          </text>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="先固定业务关系和访问模式，再切换模型并对账；模型名称不是验收证据。"
          reset={{
            label: "重置第 2 章实验",
            ariaLabel: "重置数据密集型应用系统设计第 2 章实验",
            onClick: reset,
          }}
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        数据模型的选择由关系、约束和查询演化共同决定，迁移后的业务语义必须可对账。
      </figcaption>
    </figure>
  );
}
