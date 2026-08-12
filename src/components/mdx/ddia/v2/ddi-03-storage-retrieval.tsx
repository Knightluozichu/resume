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

type Engine = "lsm" | "btree" | "column";
type Fault = "steady" | "compaction" | "cache";
type Query = "point" | "range" | "aggregate";

const STEPS: readonly TeachingStep[] = [
  { label: "write", caption: "先把写入顺序和持久化边界固定下来" },
  { label: "index", caption: "索引把额外空间换成更短的查找路径" },
  { label: "read", caption: "查询模式决定读放大、扫描范围和尾延迟" },
  { label: "maintain", caption: "压实、分裂和压缩在后台改变成本曲线" },
  { label: "recover", caption: "故障后重放并对账，证明结果语义没有漂移" },
];

const LABEL_TEXT: Readonly<Record<string, string>> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

const ENGINE_LABELS: Record<Engine, string> = {
  lsm: "LSM 树",
  btree: "B 树",
  column: "列式存储",
};

const ENGINE_NOTES: Record<Engine, string> = {
  lsm: "顺序写和批量压实占优势；读路径要合并多个有序段。",
  btree: "页面内更新和稳定点查占优势；随机页写与分裂要留证。",
  column: "按列扫描和压缩聚合占优势；小批写入需要缓冲与合并。",
};

const FAULT_LABELS: Record<Fault, string> = {
  steady: "正常负载",
  compaction: "压实变慢",
  cache: "缓存失效",
};

export function Ddi03StorageRetrievalLab() {
  const stageRefs = useRef<Array<SVGGElement | null>>([]);
  const rawId = useId();
  const instanceId = rawId.replace(/:/g, "");
  const writeArrowId = `ddia-03-write-arrow-${instanceId}`;
  const faultArrowId = `ddia-03-fault-arrow-${instanceId}`;
  const [engine, setEngine] = useState<Engine>("lsm");
  const [fault, setFault] = useState<Fault>("steady");
  const [query, setQuery] = useState<Query>("point");

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      STEPS.forEach((step, index) => {
        tl.add(
          stageRefs.current[index]!,
          { opacity: [0, 1], duration: T * 0.6, ease: "out(3)" },
          index * T,
        );
        tl.label(step.label, index * T);
      });
    },
  });

  const activeIndex = Math.min(STEPS.length - 1, timeline.currentStep);
  const activeStep = STEPS[activeIndex] ?? STEPS[0];
  const isFault = fault !== "steady";
  const engineAccent =
    engine === "lsm" ? C.accent : engine === "btree" ? C.success : C.warning;
  const queryLabel =
    query === "point" ? "点查" : query === "range" ? "范围扫描" : "聚合扫描";
  const readNote =
    query === "point"
      ? engine === "lsm"
        ? "点查要检查内存表、布隆过滤器和多个 SSTable。"
        : "点查沿根页到叶页，页命中和分裂是主要观测点。"
      : query === "range"
        ? engine === "column"
          ? "范围扫描可跳过不相关列，但排序和段裁剪决定扫描量。"
          : "范围查询需要观察有序布局是否减少随机访问。"
        : "聚合扫描更看重列裁剪、压缩比和物化聚合的新鲜度。";

  function reset() {
    setEngine("lsm");
    setFault("steady");
    setQuery("point");
    timeline.goToStep(0);
  }

  return (
    <figure
      className="mdx-figure not-prose mx-auto my-8"
      data-visual-kind="ddia-03-storage-retrieval"
    >
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-6">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              DDIA · 第 3 章
            </p>
            <h3 className="mt-1 text-lg font-semibold text-primary">
              沿写路径、读路径和后台维护找出真正的成本
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
              切换引擎、查询和故障条件；观察同一输入如何改变读放大、写放大、压实等待和恢复证据。
            </p>
          </div>
          <div className="flex flex-wrap gap-2" aria-label="选择存储布局">
            {(Object.entries(ENGINE_LABELS) as [Engine, string][]).map(
              ([value, label]) => (
                <button
                  key={value}
                  type="button"
                  aria-pressed={engine === value}
                  onClick={() => setEngine(value)}
                  className={`min-h-11 rounded-control border px-3 py-2 text-xs transition-colors duration-(--duration-hover) ease-standard ${
                    engine === value
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
          <div className="flex flex-wrap gap-2" aria-label="选择查询工作负载">
            <span className="self-center text-xs text-secondary">查询：</span>
            {(
              [
                ["point", "点查"],
                ["range", "范围扫描"],
                ["aggregate", "聚合扫描"],
              ] as [Query, string][]
            ).map(([value, label]) => (
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
            ))}
          </div>
          <div className="flex flex-wrap gap-2" aria-label="注入后台条件">
            <span className="self-center text-xs text-secondary">条件：</span>
            {(Object.entries(FAULT_LABELS) as [Fault, string][]).map(
              ([value, label]) => (
                <button
                  key={value}
                  type="button"
                  aria-pressed={fault === value}
                  onClick={() => setFault(value)}
                  className={`min-h-11 rounded-control border px-3 py-2 text-xs transition-colors duration-(--duration-hover) ease-standard ${
                    fault === value
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
        </div>

        <svg
          viewBox="0 0 900 680"
          role="img"
          aria-label={`数据存储与检索实验图：当前引擎为${ENGINE_LABELS[engine]}，查询为${queryLabel}，后台条件为${FAULT_LABELS[fault]}。时间线展示写入、索引、读取、后台维护和恢复五阶段；支持播放、暂停、单步、拖进度、引擎切换、查询切换、故障注入和重置。`}
          className="mx-auto block h-auto w-full"
        >
          <defs>
            <marker
              id={writeArrowId}
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

          <rect x="0" y="0" width="900" height="680" rx="14" fill={C.bg} />
          <text x="30" y="34" fontSize="16" fontWeight="700" fill={C.primary}>
            写入 → 索引 → 查询 → 后台维护 → 恢复对账
          </text>
          <text x="30" y="58" fontSize="12" fill={C.secondary}>
            真实成本来自数据布局、访问模式与后台工作共同形成的路径
          </text>

          <rect
            x="28"
            y="80"
            width="844"
            height="92"
            rx="12"
            fill={C.elevated}
            stroke={isFault ? C.danger : engineAccent}
            strokeWidth="1.5"
          />
          <text
            x="48"
            y="108"
            fontSize="12"
            fontWeight="700"
            fill={engineAccent}
          >
            当前实验：{ENGINE_LABELS[engine]} · {queryLabel} ·{" "}
            {FAULT_LABELS[fault]}
          </text>
          <text x="48" y="136" fontSize="11" fill={C.secondary}>
            {ENGINE_NOTES[engine]}
          </text>
          <text
            x="48"
            y="157"
            fontSize="11"
            fill={isFault ? C.danger : C.secondary}
          >
            {isFault ? "故障注入：" : "观测重点："}
            {isFault
              ? fault === "compaction"
                ? "后台压实延迟，读放大暂时上升。"
                : "缓存失效，首轮读取需要更多段或页面。"
              : readNote}
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
              height="104"
              rx="10"
              fill={C.accent}
              fillOpacity="0.1"
              stroke={C.accent}
            />
            <text x="48" y="232" fontSize="12" fontWeight="700" fill={C.accent}>
              写入请求
            </text>
            <text x="48" y="258" fontSize="11" fill={C.secondary}>
              键值 + 版本
            </text>
            <text x="48" y="280" fontSize="11" fill={C.secondary}>
              WAL / 缓冲边界
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
              height="104"
              rx="10"
              fill={engineAccent}
              fillOpacity="0.1"
              stroke={engineAccent}
            />
            <text
              x="240"
              y="232"
              fontSize="12"
              fontWeight="700"
              fill={engineAccent}
            >
              索引布局
            </text>
            <text x="240" y="258" fontSize="11" fill={C.secondary}>
              {engine === "lsm"
                ? "memtable → SSTable"
                : engine === "btree"
                  ? "根页 → 叶页"
                  : "列段 → 排序键"}
            </text>
            <text x="240" y="280" fontSize="11" fill={C.secondary}>
              {engine === "lsm"
                ? "顺序写"
                : engine === "btree"
                  ? "页面更新"
                  : "列裁剪"}
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
              height="104"
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
              查询路径
            </text>
            <text x="432" y="258" fontSize="11" fill={C.secondary}>
              {queryLabel}
            </text>
            <text x="432" y="280" fontSize="11" fill={C.secondary}>
              {query === "point"
                ? "命中候选位置"
                : query === "range"
                  ? "扫描有序区间"
                  : "合并列与聚合"}
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
              width="160"
              height="104"
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
              后台维护
            </text>
            <text x="624" y="258" fontSize="11" fill={C.secondary}>
              {engine === "lsm"
                ? "压实 / 回收旧版本"
                : engine === "btree"
                  ? "分裂 / WAL"
                  : "压缩 / 物化聚合"}
            </text>
            <text
              x="624"
              y="280"
              fontSize="11"
              fill={isFault ? C.danger : C.secondary}
            >
              {isFault ? "等待进入尾延迟" : "成本必须持续观测"}
            </text>
          </g>

          <line
            x1="188"
            y1="254"
            x2="216"
            y2="254"
            stroke={C.border}
            strokeWidth="1.5"
            markerEnd={`url(#${writeArrowId})`}
          />
          <line
            x1="380"
            y1="254"
            x2="408"
            y2="254"
            stroke={C.border}
            strokeWidth="1.5"
            markerEnd={`url(#${writeArrowId})`}
          />
          <line
            x1="572"
            y1="254"
            x2="600"
            y2="254"
            stroke={isFault ? C.danger : C.border}
            strokeWidth="1.5"
            markerEnd={`url(#${isFault ? faultArrowId : writeArrowId})`}
          />

          <rect
            x="28"
            y="338"
            width="844"
            height="148"
            rx="12"
            fill={C.elevated}
            stroke={C.border}
            strokeWidth="1.5"
          />
          <text x="48" y="368" fontSize="12" fontWeight="700" fill={C.primary}>
            同一输入的三类证据
          </text>
          <text x="48" y="397" fontSize="11" fill={C.secondary}>
            读放大：
            {engine === "lsm"
              ? isFault
                ? "多个段"
                : "候选段"
              : engine === "btree"
                ? "页面层级"
                : "列段数量"}
          </text>
          <text x="300" y="397" fontSize="11" fill={C.secondary}>
            写放大：
            {engine === "lsm"
              ? isFault
                ? "压实堆积"
                : "顺序追加"
              : engine === "btree"
                ? "页面重写"
                : "批量合并"}
          </text>
          <text x="574" y="397" fontSize="11" fill={C.secondary}>
            空间：{engine === "column" ? "压缩列段" : "索引与旧版本"}
          </text>
          <rect
            x="48"
            y="420"
            width="220"
            height="42"
            rx="8"
            fill={C.accent}
            fillOpacity="0.1"
          />
          <rect
            x="292"
            y="420"
            width="220"
            height="42"
            rx="8"
            fill={isFault ? C.danger : C.warning}
            fillOpacity="0.1"
          />
          <rect
            x="536"
            y="420"
            width="220"
            height="42"
            rx="8"
            fill={C.success}
            fillOpacity="0.1"
          />
          <text
            x="158"
            y="446"
            textAnchor="middle"
            fontSize="11"
            fill={C.primary}
          >
            结果集合 + P99
          </text>
          <text
            x="402"
            y="446"
            textAnchor="middle"
            fontSize="11"
            fill={C.primary}
          >
            后台字节 + 等待
          </text>
          <text
            x="646"
            y="446"
            textAnchor="middle"
            fontSize="11"
            fill={C.primary}
          >
            恢复后校验和
          </text>

          <g
            ref={(node) => {
              stageRefs.current[4] = node;
            }}
            opacity="0"
          >
            <rect
              x="28"
              y="516"
              width="844"
              height="112"
              rx="12"
              fill={C.success}
              fillOpacity="0.08"
              stroke={C.success}
            />
            <text
              x="48"
              y="548"
              fontSize="12"
              fontWeight="700"
              fill={C.success}
            >
              恢复对账
            </text>
            <text x="48" y="576" fontSize="11" fill={C.secondary}>
              重放 WAL、重新打开索引，再用固定查询集合比较结果、顺序和聚合。
            </text>
            <text x="48" y="600" fontSize="11" fill={C.secondary}>
              通过条件：故障只改变可解释的成本，不改变业务不变量。
            </text>
          </g>

          <text
            x="30"
            y="658"
            fontSize="11"
            fill={isFault ? C.danger : C.secondary}
          >
            当前时间线：第 {activeIndex + 1} / {STEPS.length} 步 ·{" "}
            {activeStep?.caption ?? "选择阶段"}
          </text>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="先预测哪一条路径会变贵，再切换一个条件并记录可复核证据。"
          reset={{
            label: "重置第 3 章实验",
            ariaLabel: "重置数据存储与检索第 3 章实验",
            onClick: reset,
          }}
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        存储结构不是单次查询的速度标签；它是写入、读取、后台维护和恢复证据的整体成本模型。
      </figcaption>
    </figure>
  );
}
