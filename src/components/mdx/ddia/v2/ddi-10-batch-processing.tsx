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

type Engine = "mapreduce" | "dag" | "sql";
type DataShape = "uniform" | "skewed" | "dimension";
type Failure = "none" | "worker" | "partial";
type Release = "atomic" | "direct";

const STEPS: readonly TeachingStep[] = [
  { label: "scan", caption: "固定输入快照和代码版本，扫描不可变文件" },
  { label: "map", caption: "Map 把记录变成键值对并保留来源" },
  { label: "shuffle", caption: "Shuffle 按键分区，热点键可能拖慢一个分片" },
  { label: "join", caption: "连接选择分组或广播，并记录计划" },
  { label: "reduce", caption: "Reduce 聚合、重试失败分支并写临时输出" },
  { label: "publish", caption: "全部分片核对后原子切换版本化结果" },
];

const LABEL_TEXT: Readonly<Record<string, string>> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

const ENGINE_LABELS: Record<Engine, string> = {
  mapreduce: "MapReduce",
  dag: "DAG 引擎",
  sql: "声明式 SQL",
};

const DATA_LABELS: Record<DataShape, string> = {
  uniform: "均匀键",
  skewed: "倾斜热点键",
  dimension: "小表维度",
};

const FAILURE_LABELS: Record<Failure, string> = {
  none: "无故障",
  worker: "Worker 重试",
  partial: "部分输出",
};

const RELEASE_LABELS: Record<Release, string> = {
  atomic: "版本化原子发布",
  direct: "直接写线上表",
};

function resultFor(
  engine: Engine,
  data: DataShape,
  failure: Failure,
  release: Release,
) {
  if (release === "direct" && failure !== "none") {
    return {
      ok: false,
      color: C.danger,
      title: "部分结果泄漏",
      note: "任务重试或失败时直接改线上表，读者可能看到混合版本；重跑也无法判断哪些行已经被覆盖。",
    };
  }
  if (data === "skewed" && engine === "mapreduce") {
    return {
      ok: true,
      color: C.warning,
      title: "语义安全但热点拖慢",
      note: "Shuffle 仍能重放正确结果，但热点键集中在少数 Reduce 分片，需要拆键、采样或改变分区计划。",
    };
  }
  if (failure === "worker" && engine === "dag") {
    return {
      ok: true,
      color: C.success,
      title: "只重算受影响分支",
      note: "DAG 保留中间边界，失败 Worker 按输入分片重试，最终输出等待全部版本核对后再发布。",
    };
  }
  if (failure === "partial") {
    return {
      ok: true,
      color: C.success,
      title: "暂缓发布",
      note: "部分分片仍在运行或等待补偿；版本指针不前移，上一版结果继续对外可读。",
    };
  }
  return {
    ok: true,
    color: C.success,
    title: "可重放发布",
    note: "输入快照、代码版本、执行计划和完成标记齐备，可以对账后切换到新的物化结果。",
  };
}

export function Ddi10BatchProcessingLab() {
  const stageRefs = useRef<Array<SVGGElement | null>>([]);
  const rawId = useId();
  const instanceId = rawId.replace(/:/g, "");
  const arrowId = `ddia-10-batch-arrow-${instanceId}`;
  const warningArrowId = `ddia-10-batch-warning-${instanceId}`;
  const [engine, setEngine] = useState<Engine>("dag");
  const [data, setData] = useState<DataShape>("uniform");
  const [failure, setFailure] = useState<Failure>("worker");
  const [release, setRelease] = useState<Release>("atomic");

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
  const result = resultFor(engine, data, failure, release);
  const hotspot = data === "skewed";

  function reset() {
    setEngine("dag");
    setData("uniform");
    setFailure("worker");
    setRelease("atomic");
    timeline.goToStep(0);
  }

  return (
    <figure
      className="mdx-figure not-prose mx-auto my-8"
      data-visual-kind="ddia-10-batch-processing"
    >
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-6">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              DDIA · 第 10 章
            </p>
            <h3 className="mt-1 text-lg font-semibold text-primary">
              让批处理像一份可重放的构建产物
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
              切换执行引擎、数据分布、失败方式和发布边界；观察输入如何穿过
              Map、Shuffle、连接、Reduce，最后决定是否切换结果版本。
            </p>
          </div>
          <div className="flex flex-wrap gap-2" aria-label="选择批处理引擎">
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
          <div className="flex flex-wrap gap-2" aria-label="选择数据分布">
            <span className="self-center text-xs text-secondary">数据：</span>
            {(Object.entries(DATA_LABELS) as [DataShape, string][]).map(
              ([value, label]) => (
                <button
                  key={value}
                  type="button"
                  aria-pressed={data === value}
                  onClick={() => setData(value)}
                  className={`min-h-11 rounded-control border px-3 py-2 text-xs transition-colors duration-(--duration-hover) ease-standard ${
                    data === value
                      ? value === "skewed"
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
          <div className="flex flex-wrap gap-2" aria-label="选择故障方式">
            <span className="self-center text-xs text-secondary">故障：</span>
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
        </div>

        <div
          className="mb-4 flex flex-wrap items-center gap-2"
          aria-label="选择发布方式"
        >
          <span className="text-xs text-secondary">发布边界：</span>
          {(Object.entries(RELEASE_LABELS) as [Release, string][]).map(
            ([value, label]) => (
              <button
                key={value}
                type="button"
                aria-pressed={release === value}
                onClick={() => setRelease(value)}
                className={`min-h-11 rounded-control border px-3 py-2 text-xs transition-colors duration-(--duration-hover) ease-standard ${
                  release === value
                    ? value === "direct"
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

        <svg
          viewBox="0 0 900 700"
          role="img"
          aria-label={`批处理实验图：引擎为${ENGINE_LABELS[engine]}，数据为${DATA_LABELS[data]}，故障为${FAILURE_LABELS[failure]}，发布方式为${RELEASE_LABELS[release]}，当前结论为${result.title}。时间线展示扫描、Map、Shuffle、连接、Reduce 和发布六阶段；支持播放、暂停、单步、拖进度、四个条件切换和重置。`}
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
            快照 → Map → Shuffle → 连接 → Reduce → 版本化发布
          </text>
          <text x="30" y="58" fontSize="12" fill={C.secondary}>
            批处理的完成标志不是 Worker 成功，而是完整版本通过外部对账
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
            当前结论：{result.title} · {ENGINE_LABELS[engine]} ·{" "}
            {DATA_LABELS[data]} · {FAILURE_LABELS[failure]} ·{" "}
            {RELEASE_LABELS[release]}
          </text>
          <text x="48" y="136" fontSize="11" fill={C.secondary}>
            {result.note}
          </text>
          <text x="48" y="156" fontSize="11" fill={result.color}>
            验收条件：
            {result.ok
              ? "输入、代码、计划、分片和发布版本可追溯"
              : "不得把半成品当作新的线上版本"}
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
              输入快照
            </text>
            <text x="44" y="260" fontSize="11" fill={C.secondary}>
              v2026-08-12
            </text>
            <text x="44" y="284" fontSize="11" fill={C.secondary}>
              只读文件分片
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
              Map
            </text>
            <text x="186" y="260" fontSize="11" fill={C.secondary}>
              record → key/value
            </text>
            <text x="186" y="284" fontSize="11" fill={C.secondary}>
              保留来源分片
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
              fill={hotspot ? C.warning : C.accent}
              fillOpacity="0.1"
              stroke={hotspot ? C.warning : C.accent}
            />
            <text
              x="328"
              y="232"
              fontSize="12"
              fontWeight="700"
              fill={hotspot ? C.warning : C.accent}
            >
              Shuffle
            </text>
            <text x="328" y="260" fontSize="11" fill={C.secondary}>
              {hotspot ? "热点键集中" : "按键分区"}
            </text>
            <text x="328" y="284" fontSize="11" fill={C.secondary}>
              分片计划可复盘
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
              fill={data === "dimension" ? C.success : C.accent}
              fillOpacity="0.1"
              stroke={data === "dimension" ? C.success : C.accent}
            />
            <text
              x="470"
              y="232"
              fontSize="12"
              fontWeight="700"
              fill={C.accent}
            >
              连接
            </text>
            <text x="470" y="260" fontSize="11" fill={C.secondary}>
              {data === "dimension" ? "广播小表" : "按键对齐"}
            </text>
            <text x="470" y="284" fontSize="11" fill={C.secondary}>
              记录计划与基数
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
              fill={failure === "worker" ? C.warning : C.accent}
              fillOpacity="0.1"
              stroke={failure === "worker" ? C.warning : C.accent}
            />
            <text
              x="612"
              y="232"
              fontSize="12"
              fontWeight="700"
              fill={C.accent}
            >
              Reduce
            </text>
            <text x="612" y="260" fontSize="11" fill={C.secondary}>
              {failure === "worker" ? "失败分片重试" : "聚合与校验"}
            </text>
            <text x="612" y="284" fontSize="11" fill={C.secondary}>
              写临时版本
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
              fill={release === "direct" ? C.danger : C.success}
              fillOpacity="0.1"
              stroke={release === "direct" ? C.danger : C.success}
            />
            <text
              x="754"
              y="232"
              fontSize="12"
              fontWeight="700"
              fill={release === "direct" ? C.danger : C.success}
            >
              发布
            </text>
            <text x="754" y="260" fontSize="11" fill={C.secondary}>
              {release === "direct" ? "直接覆盖线上" : "切换结果指针"}
            </text>
            <text x="754" y="284" fontSize="11" fill={C.secondary}>
              {release === "direct" ? "混合版本风险" : "完整版本可读"}
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
            stroke={hotspot ? C.warning : C.border}
            strokeWidth="1.5"
            markerEnd={`url(#${hotspot ? warningArrowId : arrowId})`}
          />
          <line
            x1="582"
            y1="258"
            x2="592"
            y2="258"
            stroke={C.border}
            strokeWidth="1.5"
            markerEnd={`url(#${arrowId})`}
          />
          <line
            x1="724"
            y1="258"
            x2="734"
            y2="258"
            stroke={release === "direct" ? C.danger : C.border}
            strokeWidth="1.5"
            markerEnd={`url(#${release === "direct" ? warningArrowId : arrowId})`}
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
            计划与故障边界
          </text>
          <text x="48" y="408" fontSize="11" fill={C.secondary}>
            引擎：{ENGINE_LABELS[engine]} · 数据：{DATA_LABELS[data]} · 故障：
            {FAILURE_LABELS[failure]}
          </text>
          <text
            x="48"
            y="436"
            fontSize="11"
            fill={hotspot ? C.warning : C.secondary}
          >
            {hotspot
              ? "热点键：拆分键、采样或广播维度，不能只增加 Worker 数量。"
              : "每个分片保留输入范围、代码版本、重试次数和临时输出位置。"}
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
            {release === "atomic"
              ? "先完成所有分片与对账，再把 result-v42 指向新目录。"
              : "任务一边写线上表，一边重试；读者可能混合看到两个版本。"}
          </text>
          <text x="480" y="436" fontSize="11" fill={result.color}>
            {result.ok
              ? "可交接：失败可重算，旧版本可回退"
              : "不可交接：先停止发布并清理部分输出"}
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
            外部证据表：输入、计划、分片和发布指针必须能互相对上
          </text>
          <text x="48" y="558" fontSize="11" fill={C.secondary}>
            输入：snapshot-2026-08-12 · 代码：git-abc123 · 计划：
            {ENGINE_LABELS[engine]}
          </text>
          <text x="48" y="584" fontSize="11" fill={C.secondary}>
            分布：{DATA_LABELS[data]} · 输出：
            {release === "atomic" ? "result-v42 完整目录" : "线上表混合写入"} ·
            状态：{result.title}
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
              ? "通过条件：同一输入与代码可重跑，失败分片不污染已发布版本"
              : "通过条件：撤回部分输出，恢复完整快照后再发布新版本"}
          </text>

          <text x="30" y="676" fontSize="11" fill={result.color}>
            当前时间线：第 {activeIndex + 1} / {STEPS.length} 步 ·{" "}
            {activeStep?.caption ?? "选择阶段"}
          </text>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="先预测一个热点键或失败分片会影响哪里，再只改变一个执行、数据或发布条件并重放。"
          reset={{
            label: "重置第 10 章实验",
            ariaLabel: "重置批处理第 10 章实验",
            onClick: reset,
          }}
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        批处理的可靠边界是输入快照与版本化输出：任务可以重试，线上读者不应看到半成品。
      </figcaption>
    </figure>
  );
}
