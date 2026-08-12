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

type Scheme = "range" | "hash";
type Condition = "steady" | "hot" | "move";
type Query = "point" | "range" | "scatter";

const STEPS: readonly TeachingStep[] = [
  { label: "key", caption: "先选分区键，并写出局部性与热点假设" },
  { label: "route", caption: "路由表把键映射到唯一或多个分区" },
  { label: "load", caption: "观察请求和数据是否均匀落在分区上" },
  { label: "hot", caption: "热点键或范围会让单个分区成为瓶颈" },
  { label: "move", caption: "再平衡迁移数据并更新路由版本" },
  { label: "query", caption: "点查、范围查和跨分区查询各有代价" },
];

const LABEL_TEXT: Readonly<Record<string, string>> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

const SCHEME_LABELS: Record<Scheme, string> = {
  range: "按键范围",
  hash: "按键哈希",
};

const CONDITION_LABELS: Record<Condition, string> = {
  steady: "均匀负载",
  hot: "热点键",
  move: "再平衡中",
};

const QUERY_LABELS: Record<Query, string> = {
  point: "点查",
  range: "范围查",
  scatter: "跨分区聚合",
};

function partitionLoad(scheme: Scheme, condition: Condition) {
  if (condition === "hot")
    return scheme === "range" ? [24, 76, 32, 28] : [39, 42, 41, 44];
  if (condition === "move")
    return scheme === "range" ? [47, 52, 32, 29] : [38, 34, 54, 40];
  return scheme === "range" ? [42, 46, 39, 43] : [41, 43, 40, 45];
}

export function Ddi06PartitioningLab() {
  const stageRefs = useRef<Array<SVGGElement | null>>([]);
  const rawId = useId();
  const instanceId = rawId.replace(/:/g, "");
  const arrowId = `ddia-06-route-arrow-${instanceId}`;
  const faultArrowId = `ddia-06-fault-arrow-${instanceId}`;
  const [scheme, setScheme] = useState<Scheme>("range");
  const [condition, setCondition] = useState<Condition>("steady");
  const [query, setQuery] = useState<Query>("point");

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
  const isFault = condition !== "steady";
  const loads = partitionLoad(scheme, condition);
  const maxLoad = Math.max(...loads);
  const conditionColor =
    condition === "steady"
      ? C.accent
      : condition === "hot"
        ? C.danger
        : C.warning;
  const queryNote =
    query === "point"
      ? "一个键定位一个分区，路由缓存和版本必须一致。"
      : query === "range"
        ? scheme === "range"
          ? "相邻键可落在连续分区，范围查可少 fan-out。"
          : "哈希打散顺序，范围查通常需要询问多个分区。"
        : "聚合需要扇出到多个分区，再合并局部结果和失败状态。";

  function reset() {
    setScheme("range");
    setCondition("steady");
    setQuery("point");
    timeline.goToStep(0);
  }

  return (
    <figure
      className="mdx-figure not-prose mx-auto my-8"
      data-visual-kind="ddia-06-partitioning"
    >
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-6">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              DDIA · 第 6 章
            </p>
            <h3 className="mt-1 text-lg font-semibold text-primary">
              分区把容量、热点和查询范围分配给谁
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
              切换分区键策略、负载条件和查询类型；观察路由、热点、迁移和跨分区合并的证据。
            </p>
          </div>
          <div className="flex flex-wrap gap-2" aria-label="选择分区策略">
            {(Object.entries(SCHEME_LABELS) as [Scheme, string][]).map(
              ([value, label]) => (
                <button
                  key={value}
                  type="button"
                  aria-pressed={scheme === value}
                  onClick={() => setScheme(value)}
                  className={`min-h-11 rounded-control border px-3 py-2 text-xs transition-colors duration-(--duration-hover) ease-standard ${
                    scheme === value
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
          <div className="flex flex-wrap gap-2" aria-label="注入分区条件">
            <span className="self-center text-xs text-secondary">条件：</span>
            {(Object.entries(CONDITION_LABELS) as [Condition, string][]).map(
              ([value, label]) => (
                <button
                  key={value}
                  type="button"
                  aria-pressed={condition === value}
                  onClick={() => setCondition(value)}
                  className={`min-h-11 rounded-control border px-3 py-2 text-xs transition-colors duration-(--duration-hover) ease-standard ${
                    condition === value
                      ? value === "steady"
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
          <div className="flex flex-wrap gap-2" aria-label="选择查询类型">
            <span className="self-center text-xs text-secondary">查询：</span>
            {(Object.entries(QUERY_LABELS) as [Query, string][]).map(
              ([value, label]) => (
                <button
                  key={value}
                  type="button"
                  aria-pressed={query === value}
                  onClick={() => setQuery(value)}
                  className={`min-h-11 rounded-control border px-3 py-2 text-xs transition-colors duration-(--duration-hover) ease-standard ${
                    query === value
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
          viewBox="0 0 900 700"
          role="img"
          aria-label={`分区实验图：当前策略为${SCHEME_LABELS[scheme]}，条件为${CONDITION_LABELS[condition]}，查询为${QUERY_LABELS[query]}。时间线展示分区键、路由、负载、热点、再平衡和查询六阶段；支持播放、暂停、单步、拖进度、策略切换、条件注入、查询切换和重置。`}
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
              id={faultArrowId}
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
            分区键 → 路由 → 负载 → 热点 → 再平衡 → 查询合并
          </text>
          <text x="30" y="58" fontSize="12" fill={C.secondary}>
            分区不是把数据切开就结束，还要维护归属、迁移和跨分区结果
          </text>

          <rect
            x="28"
            y="80"
            width="844"
            height="92"
            rx="12"
            fill={C.elevated}
            stroke={isFault ? conditionColor : C.accent}
            strokeWidth="1.5"
          />
          <text
            x="48"
            y="108"
            fontSize="12"
            fontWeight="700"
            fill={conditionColor}
          >
            当前实验：{SCHEME_LABELS[scheme]} · {CONDITION_LABELS[condition]} ·{" "}
            {QUERY_LABELS[query]}
          </text>
          <text x="48" y="136" fontSize="11" fill={C.secondary}>
            {scheme === "range"
              ? "连续键有局部性，边界迁移与热点范围需要维护。"
              : "哈希打散键，负载较均匀，但范围查询和路由定位需要额外工作。"}
          </text>
          <text x="48" y="157" fontSize="11" fill={conditionColor}>
            {isFault
              ? condition === "hot"
                ? "故障注入：一个键或范围压垮单个分区，平均负载掩盖尾延迟。"
                : "故障注入：数据迁移期间路由版本和读写归属必须一致。"
              : queryNote}
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
              width="160"
              height="108"
              rx="10"
              fill={C.accent}
              fillOpacity="0.1"
              stroke={C.accent}
            />
            <text x="48" y="232" fontSize="12" fontWeight="700" fill={C.accent}>
              分区键
            </text>
            <text x="48" y="258" fontSize="11" fill={C.secondary}>
              {scheme === "range" ? "customer_id 范围" : "hash(customer_id)"}
            </text>
            <text x="48" y="282" fontSize="11" fill={C.secondary}>
              {scheme === "range" ? "局部性 + 边界" : "均匀性 + 无序"}
            </text>
          </g>
          <g
            ref={(node) => {
              stageRefs.current[1] = node;
            }}
            opacity="0"
          >
            <rect
              x="220"
              y="202"
              width="160"
              height="108"
              rx="10"
              fill={C.accent}
              fillOpacity="0.1"
              stroke={C.accent}
            />
            <text
              x="240"
              y="232"
              fontSize="12"
              fontWeight="700"
              fill={C.accent}
            >
              路由表
            </text>
            <text x="240" y="258" fontSize="11" fill={C.secondary}>
              key → P0 / P1 / P2 / P3
            </text>
            <text x="240" y="282" fontSize="11" fill={C.secondary}>
              路由版本 v17
            </text>
          </g>
          <g
            ref={(node) => {
              stageRefs.current[2] = node;
            }}
            opacity="0"
          >
            <rect
              x="412"
              y="202"
              width="160"
              height="108"
              rx="10"
              fill={C.success}
              fillOpacity="0.1"
              stroke={C.success}
            />
            <text
              x="432"
              y="232"
              fontSize="12"
              fontWeight="700"
              fill={C.success}
            >
              四个分区
            </text>
            <text x="432" y="258" fontSize="11" fill={C.secondary}>
              P0 · P1 · P2 · P3
            </text>
            <text x="432" y="282" fontSize="11" fill={C.secondary}>
              负载与数据各自统计
            </text>
          </g>
          <g
            ref={(node) => {
              stageRefs.current[3] = node;
            }}
            opacity="0"
          >
            <rect
              x="604"
              y="202"
              width="268"
              height="108"
              rx="10"
              fill={isFault ? C.danger : C.warning}
              fillOpacity="0.1"
              stroke={isFault ? C.danger : C.warning}
            />
            <text
              x="624"
              y="232"
              fontSize="12"
              fontWeight="700"
              fill={isFault ? C.danger : C.warning}
            >
              负载分布
            </text>
            <text x="624" y="258" fontSize="11" fill={C.secondary}>
              P0 {loads[0]} · P1 {loads[1]} · P2 {loads[2]} · P3 {loads[3]}
            </text>
            <text
              x="624"
              y="282"
              fontSize="11"
              fill={isFault ? C.danger : C.secondary}
            >
              峰值 {maxLoad} · 观测 P99 与队列
            </text>
          </g>

          <line
            x1="188"
            y1="256"
            x2="216"
            y2="256"
            stroke={C.border}
            strokeWidth="1.5"
            markerEnd={`url(#${arrowId})`}
          />
          <line
            x1="380"
            y1="256"
            x2="408"
            y2="256"
            stroke={C.border}
            strokeWidth="1.5"
            markerEnd={`url(#${arrowId})`}
          />
          <line
            x1="572"
            y1="256"
            x2="600"
            y2="256"
            stroke={isFault ? conditionColor : C.border}
            strokeWidth="1.5"
            markerEnd={`url(#${isFault ? faultArrowId : arrowId})`}
          />

          <rect
            x="28"
            y="342"
            width="844"
            height="150"
            rx="12"
            fill={C.elevated}
            stroke={C.border}
            strokeWidth="1.5"
          />
          <text x="48" y="372" fontSize="12" fontWeight="700" fill={C.primary}>
            四个分区的负载观察
          </text>
          {loads.map((load, index) => {
            const x = 54 + index * 198;
            const color =
              load > 60 ? C.danger : load > 48 ? C.warning : C.success;
            return (
              <g key={`load-${index}`}>
                <text x={x} y="402" fontSize="11" fill={C.secondary}>
                  P{index}
                </text>
                <rect
                  x={x}
                  y="414"
                  width="150"
                  height="28"
                  rx="7"
                  fill={C.border}
                  fillOpacity="0.35"
                />
                <rect
                  x={x}
                  y="414"
                  width={Math.max(12, load * 1.45)}
                  height="28"
                  rx="7"
                  fill={color}
                  fillOpacity="0.55"
                />
                <text
                  x={x + 75}
                  y="433"
                  textAnchor="middle"
                  fontSize="11"
                  fill={C.primary}
                >
                  {load} 请求片段
                </text>
              </g>
            );
          })}
          <text
            x="48"
            y="470"
            fontSize="11"
            fill={isFault ? conditionColor : C.secondary}
          >
            {condition === "hot"
              ? "热点缓解：加盐、拆分热点键或把请求分散到多个分区；代价是读时合并。"
              : condition === "move"
                ? "迁移证据：旧归属、新归属、双读窗口和路由版本必须同时可查。"
                : "均衡不等于无成本：跨分区查询、复制和再平衡仍需纳入基准。"}
          </text>

          <g
            ref={(node) => {
              stageRefs.current[4] = node;
            }}
            opacity="0"
          >
            <rect
              x="28"
              y="526"
              width="410"
              height="112"
              rx="12"
              fill={C.warning}
              fillOpacity="0.08"
              stroke={C.warning}
            />
            <text
              x="48"
              y="558"
              fontSize="12"
              fontWeight="700"
              fill={C.warning}
            >
              再平衡
            </text>
            <text x="48" y="586" fontSize="11" fill={C.secondary}>
              迁移数据、更新路由、处理双写或双读，并限制迁移对前台 P99 的影响。
            </text>
            <text x="48" y="610" fontSize="11" fill={C.secondary}>
              停止条件：每个键只有一个可写归属，旧任务可安全重试。
            </text>
          </g>
          <g
            ref={(node) => {
              stageRefs.current[5] = node;
            }}
            opacity="0"
          >
            <rect
              x="462"
              y="526"
              width="410"
              height="112"
              rx="12"
              fill={C.success}
              fillOpacity="0.08"
              stroke={C.success}
            />
            <text
              x="482"
              y="558"
              fontSize="12"
              fontWeight="700"
              fill={C.success}
            >
              查询合并
            </text>
            <text x="482" y="586" fontSize="11" fill={C.secondary}>
              {query === "point"
                ? "单分区返回结果，再检查路由版本。"
                : query === "range"
                  ? "按分区并行扫描，合并排序与边界。"
                  : "扇出聚合，处理部分失败、重复和超时。"}
            </text>
            <text x="482" y="610" fontSize="11" fill={C.success}>
              验收：结果完整，归属唯一，成本和失败路径可解释。
            </text>
          </g>

          <text
            x="30"
            y="676"
            fontSize="11"
            fill={isFault ? conditionColor : C.secondary}
          >
            当前时间线：第 {activeIndex + 1} / {STEPS.length} 步 ·{" "}
            {activeStep?.caption ?? "选择阶段"}
          </text>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="先预测一个键会落在哪里、查询会问几个分区，再只改变一个分区条件并核对结果。"
          reset={{
            label: "重置第 6 章实验",
            ariaLabel: "重置分区第 6 章实验",
            onClick: reset,
          }}
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        分区让数据和请求可扩展，但必须同时管理键归属、热点、迁移、路由和跨分区查询。
      </figcaption>
    </figure>
  );
}
