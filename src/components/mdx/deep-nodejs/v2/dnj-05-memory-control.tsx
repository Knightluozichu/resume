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

type Region = "heap" | "external" | "rss";
type Fault = "none" | "cache" | "closure" | "queue";
type Evidence = "metrics" | "retainer" | "resources";

const STEPS: readonly TeachingStep[] = [
  { label: "baseline", caption: "固定版本、负载并记录内存基线" },
  { label: "classify", caption: "区分 V8 堆、堆外内存和 RSS" },
  { label: "load", caption: "施加同一输入并观察峰值" },
  { label: "retain", caption: "沿引用或资源路径找持有者" },
  { label: "repair", caption: "淘汰、解除引用或施加背压" },
  { label: "recover", caption: "回放并确认指标与资源回落" },
];

const LABEL_TEXT: Readonly<Record<string, string>> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

const REGION_LABELS: Record<Region, string> = {
  heap: "V8 堆",
  external: "堆外内存",
  rss: "RSS",
};

const FAULT_LABELS: Record<Fault, string> = {
  none: "基线",
  cache: "无界缓存",
  closure: "闭包保留",
  queue: "队列堆积",
};

const EVIDENCE_LABELS: Record<Evidence, string> = {
  metrics: "指标曲线",
  retainer: "保留路径",
  resources: "资源与队列",
};

function verdict(region: Region, fault: Fault, evidence: Evidence) {
  if (fault === "cache" && evidence !== "retainer") {
    return {
      ok: false,
      color: C.warning,
      title: "缓存持有者还未确认",
      note: `${REGION_LABELS[region]} 正在增长，但只有保留路径能证明哪个缓存键使对象继续可达。`,
    };
  }
  if (fault === "closure" && evidence !== "retainer") {
    return {
      ok: false,
      color: C.danger,
      title: "闭包引用尚未解除",
      note: "指标只能提示增长，必须沿快照或引用图找到回调、定时器或监听器的最后一个 owner。",
    };
  }
  if (fault === "queue" && evidence !== "resources") {
    return {
      ok: false,
      color: C.warning,
      title: "队列压力缺少资源证据",
      note: "队列项会携带数据和闭包；要同时核对生产速度、消费速度、活动句柄和背压状态。",
    };
  }
  return {
    ok: true,
    color: C.success,
    title: "内存增长可以闭环",
    note: `${REGION_LABELS[region]} 的变化可由${EVIDENCE_LABELS[evidence]}解释，并能通过固定负载验证回落。`,
  };
}

export function DnjMemoryControlLab() {
  const stageRefs = useRef<Array<SVGGElement | null>>([]);
  const rawId = useId();
  const instanceId = rawId.replace(/:/g, "");
  const arrowId = `dnj-memory-arrow-${instanceId}`;
  const warningArrowId = `dnj-memory-warning-${instanceId}`;
  const [region, setRegion] = useState<Region>("heap");
  const [fault, setFault] = useState<Fault>("none");
  const [evidence, setEvidence] = useState<Evidence>("metrics");

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
  const result = verdict(region, fault, evidence);

  function reset() {
    setRegion("heap");
    setFault("none");
    setEvidence("metrics");
    timeline.goToStep(0);
  }

  return (
    <figure
      className="mdx-figure not-prose mx-auto my-8"
      data-visual-kind="deep-nodejs-memory-control"
    >
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-6">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              Node.js · 第 5 章
            </p>
            <h3 className="mt-1 text-lg font-semibold text-primary">
              从内存曲线走到最后一个持有者
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
              选择观测区域、注入缓存或队列故障，再切换证据视图；沿六阶段时间线判断增长属于哪里、谁在保留、修复后是否回到预算。
            </p>
          </div>
          <div className="flex flex-wrap gap-2" aria-label="选择内存区域">
            {(Object.entries(REGION_LABELS) as [Region, string][]).map(
              ([value, label]) => (
                <button
                  key={value}
                  type="button"
                  aria-pressed={region === value}
                  onClick={() => setRegion(value)}
                  className={`min-h-11 rounded-control border px-3 py-2 text-xs transition-colors duration-(--duration-hover) ease-standard ${
                    region === value
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
          <div className="flex flex-wrap gap-2" aria-label="选择内存故障">
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
          <div className="flex flex-wrap gap-2" aria-label="选择内存证据">
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
          aria-label={`Node 第 5 章内存控制实验：区域为${REGION_LABELS[region]}，故障为${FAULT_LABELS[fault]}，证据为${EVIDENCE_LABELS[evidence]}，当前结论为${result.title}。时间线展示基线、分类、负载、保留、修复和回落六阶段；支持播放、暂停、单步、拖进度、三组条件切换和重置。`}
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
            基线 → 分类 → 负载 → 保留 → 修复 → 回落
          </text>
          <text x="28" y="58" fontSize="12" fill={C.secondary}>
            内存诊断的证据链要同时覆盖指标、对象引用和活动资源
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
            当前结论：{result.title} · {REGION_LABELS[region]} ·{" "}
            {FAULT_LABELS[fault]}
          </text>
          <text x="48" y="136" fontSize="11" fill={C.secondary}>
            {result.note}
          </text>
          <text x="48" y="154" fontSize="11" fill={result.color}>
            验收条件：baseline · peak · recovery · owner · active resources
          </text>

          <text x="28" y="194" fontSize="12" fontWeight="700" fill={C.primary}>
            六阶段内存证据图
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
              1 · 基线
            </text>
            <text x="46" y="272" fontSize="11" fill={C.secondary}>
              固定版本、输入、并发和采样窗口
            </text>
            <text x="46" y="292" fontSize="11" fill={C.secondary}>
              region：{REGION_LABELS[region]}
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
              2 · 分类
            </text>
            <text x="342" y="272" fontSize="11" fill={C.secondary}>
              heapUsed · external · arrayBuffers · RSS
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
              3 · 固定负载
            </text>
            <text x="638" y="272" fontSize="11" fill={C.secondary}>
              记录 baseline、peak 和 recovery
            </text>
            <text x="638" y="292" fontSize="11" fill={C.secondary}>
              fault：{FAULT_LABELS[fault]}
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
            stroke={fault === "queue" ? C.warning : C.border}
            strokeWidth="1.5"
            markerEnd={`url(#${fault === "queue" ? warningArrowId : arrowId})`}
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
              fill={
                fault === "cache" || fault === "closure" ? C.warning : C.accent
              }
              fillOpacity="0.1"
              stroke={
                fault === "cache" || fault === "closure" ? C.warning : C.accent
              }
            />
            <text
              x="46"
              y="384"
              fontSize="12"
              fontWeight="700"
              fill={
                fault === "cache" || fault === "closure" ? C.warning : C.accent
              }
            >
              4 · 保留路径
            </text>
            <text x="46" y="412" fontSize="11" fill={C.secondary}>
              从根对象追到缓存、闭包或队列
            </text>
            <text
              x="46"
              y="432"
              fontSize="11"
              fill={
                fault === "cache" || fault === "closure"
                  ? C.warning
                  : C.secondary
              }
            >
              owner：
              {fault === "none" ? "unknown until sampled" : FAULT_LABELS[fault]}
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
              fill={C.accent}
              fillOpacity="0.1"
              stroke={C.accent}
            />
            <text
              x="342"
              y="384"
              fontSize="12"
              fontWeight="700"
              fill={C.accent}
            >
              5 · 修复所有权
            </text>
            <text x="342" y="412" fontSize="11" fill={C.secondary}>
              淘汰、解除引用、关闭或施加背压
            </text>
            <text x="342" y="432" fontSize="11" fill={C.secondary}>
              repair：one owner · one cleanup
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
              6 · 回落
            </text>
            <text x="638" y="412" fontSize="11" fill={C.secondary}>
              重新跑同一输入并等资源完成收尾
            </text>
            <text
              x="638"
              y="432"
              fontSize="11"
              fill={result.ok ? C.success : C.danger}
            >
              {result.ok
                ? "recovery：within budget"
                : "recovery：not explained"}
            </text>
          </g>

          <line
            x1="745"
            y1="306"
            x2="745"
            y2="346"
            stroke={fault === "queue" ? C.warning : C.border}
            strokeWidth="1.5"
            markerEnd={`url(#${fault === "queue" ? warningArrowId : arrowId})`}
          />
          <line
            x1="614"
            y1="400"
            x2="584"
            y2="400"
            stroke={
              fault === "cache" || fault === "closure" ? C.warning : C.border
            }
            strokeWidth="1.5"
            markerEnd={`url(#${fault === "cache" || fault === "closure" ? warningArrowId : arrowId})`}
          />
          <line
            x1="318"
            y1="400"
            x2="288"
            y2="400"
            stroke={fault === "queue" ? C.warning : C.border}
            strokeWidth="1.5"
            markerEnd={`url(#${fault === "queue" ? warningArrowId : arrowId})`}
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
            sample：memory-05 · region：{REGION_LABELS[region]} · evidence：
            {EVIDENCE_LABELS[evidence]}
          </text>
          <text x="48" y="570" fontSize="11" fill={C.secondary}>
            fault：{FAULT_LABELS[fault]} · baseline：64 MB · peak：
            {fault === "none" ? "92 MB" : "188 MB"} · recovery：
            {result.ok ? "70 MB" : "pending"}
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
            width={result.ok ? 804 : 520}
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
            先判断哪个区域在涨，再找最后一个持有者；修复后用相同负载验证回落。
          </text>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="固定版本、输入与采样窗口，只改变一个持有者；用指标、保留路径和资源计数交叉复核。"
          reset={{
            label: "重置内存控制实验",
            ariaLabel: "重置 Node 内存控制实验",
            onClick: reset,
          }}
        />
      </div>
      <figcaption className="mt-3 text-center text-xs text-secondary">
        交互提示：先播放时间线，再注入故障；比较 heap、external、RSS、owner 与
        recovery，避免把所有增长都叫作堆泄漏。
      </figcaption>
    </figure>
  );
}
