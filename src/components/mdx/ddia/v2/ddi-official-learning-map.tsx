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

type SampleMode = "baseline" | "latency" | "failure";

const STEPS: readonly TeachingStep[] = [
  {
    label: "invariants",
    caption: "先写用户不变量、版本分母、陈旧窗口和停止条件",
  },
  {
    label: "model",
    caption: "选择数据模型，区分权威事实、局部状态与派生视图",
  },
  {
    label: "storage",
    caption: "沿单机存储与编码演化记录持久化点和可变边界",
  },
  {
    label: "distributed",
    caption: "把复制、分区、事务、故障和共识放进消息时间线",
  },
  {
    label: "derived",
    caption: "用批处理、流处理与派生数据连接读模型和输入事件",
  },
  {
    label: "handoff",
    caption: "用契约、机制、负载、故障四类证据完成独立交接",
  },
];

const LABEL_TEXT: Readonly<Record<string, string>> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

export function DdiOfficialLearningMapLab() {
  const stageRefs = useRef<Array<SVGGElement | null>>([]);
  const [sample, setSample] = useState<SampleMode>("baseline");
  const rawId = useId();
  const instanceId = rawId.replace(/:/g, "");
  const arrowId = `ddia-learning-map-arrow-${instanceId}`;
  const warningArrowId = `ddia-learning-map-warning-${instanceId}`;

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
  const sampleLabel =
    sample === "baseline"
      ? "正常基线"
      : sample === "latency"
        ? "尾延迟"
        : "部分故障";
  const firstDivergence =
    sample === "baseline"
      ? "尚未注入；先保存权威状态和消息顺序"
      : sample === "latency"
        ? "确认先于派生视图更新，不能把等待当成提交"
        : "复制或派生边界出现缺口，必须停止并对账";

  function reset() {
    setSample("baseline");
    timeline.goToStep(0);
  }

  const latency = sample === "latency";
  const failure = sample === "failure";
  const statusColor = failure ? C.danger : latency ? C.warning : C.accent;

  return (
    <figure
      className="mdx-figure not-prose mx-auto my-8"
      data-visual-kind="ddia-learning-map-causal-route"
    >
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-6">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              数据密集型应用系统设计 · 第 1 版路线
            </p>
            <h3 className="mt-1 text-lg font-semibold text-primary">
              从用户不变量到派生数据：一条可回放因果链
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
              目录是导航，状态、消息、故障和对账才是证明；六个阶段可逐步检查并重置。
            </p>
          </div>
          <div className="flex flex-wrap gap-2" aria-label="选择数据系统样本">
            {(
              [
                ["baseline", "正常基线"],
                ["latency", "尾延迟"],
                ["failure", "部分故障"],
              ] as const
            ).map(([value, label]) => (
              <button
                key={value}
                type="button"
                aria-pressed={sample === value}
                onClick={() => setSample(value)}
                className={`min-h-11 rounded-control border px-3 py-2 text-xs transition-colors duration-(--duration-hover) ease-standard ${
                  sample === value
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
          aria-label={`数据密集型应用系统设计第一版学习地图：当前样本为${sampleLabel}。时间线展示用户不变量、数据模型、存储、分布式边界、派生数据和独立交接六阶段；首个偏离点为${firstDivergence}。支持播放、暂停、单步、拖进度、样本切换和重置。`}
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
            不变量 → 数据模型 → 存储 → 分布式系统 → 派生数据 → 交接
          </text>
          <text x="30" y="58" fontSize="12" fill={C.secondary}>
            先定义系统要保证什么，再让每个目录部分承担一段可观察的状态转换
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
            当前样本 · {sampleLabel}
          </text>
          <text x="46" y="134" fontSize="12" fill={C.primary}>
            观测契约：权威状态 · 消息顺序 · 可见结果 · 独立对账
          </text>
          <text x="46" y="160" fontSize="11" fill={C.secondary}>
            首个偏离点：{firstDivergence}
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
            {failure ? "需要对账" : latency ? "观察尾部" : "可开始"}
          </text>

          <text x="30" y="214" fontSize="12" fontWeight="700" fill={C.primary}>
            三部分与五条因果链
          </text>
          <rect
            x="28"
            y="230"
            width="844"
            height="176"
            rx="12"
            fill={C.elevated}
            stroke={C.border}
            strokeWidth="1.5"
          />
          <text x="50" y="258" fontSize="12" fontWeight="700" fill={C.accent}>
            第一部分 · 数据系统基础
          </text>
          <text x="50" y="282" fontSize="11" fill={C.secondary}>
            目标、模型、单机存储、编码演化
          </text>
          <line
            x1="264"
            y1="276"
            x2="350"
            y2="276"
            stroke={C.border}
            strokeWidth="1.8"
            markerEnd={`url(#${arrowId})`}
          />
          <text x="376" y="258" fontSize="12" fontWeight="700" fill={C.accent}>
            第二部分 · 分布式数据
          </text>
          <text x="376" y="282" fontSize="11" fill={C.secondary}>
            复制、分区、事务、故障、共识
          </text>
          <line
            x1="590"
            y1="276"
            x2="676"
            y2="276"
            stroke={failure ? C.warning : C.border}
            strokeWidth={failure ? 2.4 : 1.8}
            markerEnd={`url(#${failure ? warningArrowId : arrowId})`}
          />
          <text x="702" y="258" fontSize="12" fontWeight="700" fill={C.accent}>
            第三部分 · 派生数据
          </text>
          <text x="702" y="282" fontSize="11" fill={C.secondary}>
            批、流与数据流组合
          </text>
          <line
            x1="50"
            y1="330"
            x2="844"
            y2="330"
            stroke={C.border}
            strokeWidth="1"
            strokeDasharray="5 5"
          />
          <text x="50" y="358" fontSize="11" fontWeight="700" fill={C.primary}>
            目标
          </text>
          <text x="104" y="358" fontSize="11" fill={C.secondary}>
            数据表示
          </text>
          <text x="184" y="358" fontSize="11" fill={C.secondary}>
            单机存储
          </text>
          <text x="278" y="358" fontSize="11" fill={C.secondary}>
            分布式协调
          </text>
          <text x="396" y="358" fontSize="11" fill={C.secondary}>
            派生视图
          </text>
          <text x="510" y="358" fontSize="11" fill={C.secondary}>
            每一条都要对应状态、消息与故障证据
          </text>
          <text x="50" y="386" fontSize="11" fill={C.secondary}>
            2018 中文第 1 版 · 3 部分 · 12 章 · 术语表
          </text>

          <text x="30" y="444" fontSize="12" fontWeight="700" fill={C.primary}>
            六阶段交接时间线
          </text>
          {STEPS.map((step, index) => {
            const isFault = failure && (index === 3 || index === 4);
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
                  cy="484"
                  r="13"
                  fill={isFault ? C.danger : C.accent}
                  fillOpacity="0.16"
                  stroke={isFault ? C.danger : C.accent}
                  strokeWidth="1.5"
                />
                <text
                  x={x + 16}
                  y="489"
                  textAnchor="middle"
                  fontSize="11"
                  fontWeight="700"
                  fill={isFault ? C.danger : C.accent}
                >
                  {index + 1}
                </text>
                <text
                  x={x + 38}
                  y="480"
                  fontSize="11"
                  fontWeight="700"
                  fill={C.primary}
                >
                  {step.label}
                </text>
                <text x={x + 38} y="501" fontSize="11" fill={C.secondary}>
                  {isFault ? "首个缺口" : "留证"}
                </text>
                {index < STEPS.length - 1 && (
                  <line
                    x1={x + 112}
                    y1="484"
                    x2={x + 132}
                    y2="484"
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
            y="540"
            width="844"
            height="82"
            rx="10"
            fill={C.success}
            fillOpacity="0.08"
            stroke={C.success}
            strokeWidth="1"
          />
          <text x="46" y="568" fontSize="12" fontWeight="700" fill={C.success}>
            当前验收门：{activeStep?.caption ?? "选择一个阶段"}
          </text>
          <text x="46" y="592" fontSize="11" fill={C.secondary}>
            第 {activeIndex + 1} / {STEPS.length} 步 ·
            保存正常历史、反例、恢复终点和独立对账
          </text>
          <text x="46" y="612" fontSize="11" fill={C.secondary}>
            {latency
              ? "尾延迟样本：确认、派生和读取必须按事件顺序分别记录"
              : failure
                ? "部分故障样本：停止扩散，先对账再决定重试、回放或回退"
                : "正常样本：先声明用户不变量，再让目录节点承担可观察证据"}
          </text>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="先用正常基线建立状态时间线，再注入尾延迟或部分故障，最后回到同一输入复核。"
          reset={{
            label: "重置学习地图实验",
            ariaLabel: "重置数据密集型应用系统设计第一版学习地图实验",
            onClick: reset,
          }}
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        学习地图的终点不是记住产品名，而是能够从不变量追到权威状态、派生结果和故障边界。
      </figcaption>
    </figure>
  );
}
