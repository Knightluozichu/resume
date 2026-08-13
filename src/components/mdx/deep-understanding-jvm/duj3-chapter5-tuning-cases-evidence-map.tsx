"use client";

import { useId, useRef, useState } from "react";

import { TEACHING_BEAT_MS, TimelineControls } from "../anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "../anim/use-teaching-timeline";

const COLORS = {
  background: "var(--bg)",
  elevated: "var(--bg-elevated)",
  border: "var(--border)",
  primary: "var(--text-primary)",
  secondary: "var(--text-secondary)",
  accent: "var(--accent)",
  success: "var(--success)",
  warning: "var(--warning)",
} as const;

const STAGES = [
  {
    key: "baseline",
    label: "固定基线",
    detail: "SLO / 工作量 / 版本",
    evidence: "先知道改善与否",
  },
  {
    key: "hypothesis",
    label: "写假设",
    detail: "瓶颈 / 反例 / 成本",
    evidence: "避免参数漫游",
  },
  {
    key: "change",
    label: "单变量变更",
    detail: "一个参数或输入轴",
    evidence: "保留归因能力",
  },
  {
    key: "observe",
    label: "对照结果",
    detail: "P99 / GC / RSS / 错误",
    evidence: "同时看收益和代价",
  },
  {
    key: "rollback",
    label: "触发回滚",
    detail: "阈值 / 兼容性 / 越界",
    evidence: "异常不是继续试错",
  },
  {
    key: "handoff",
    label: "交接证据",
    detail: "原始文件 / 哈希 / 未知",
    evidence: "结论可复现",
  },
] as const;

const CANDIDATES = [
  {
    key: "heap",
    label: "堆边界",
    value: "-Xmx",
    signal: "live set · GC · RSS",
  },
  {
    key: "collector",
    label: "收集器",
    value: "G1 / ZGC",
    signal: "P99 · 吞吐 · CPU",
  },
  {
    key: "threads",
    label: "线程栈",
    value: "-Xss",
    signal: "线程数 · RSS · 栈溢出",
  },
  {
    key: "external",
    label: "外部命令",
    value: "子进程",
    signal: "耗时 · 退出码 · 管道",
  },
  {
    key: "jdk",
    label: "JDK 版本",
    value: "运行时",
    signal: "兼容性 · 类加载 · JIT",
  },
  {
    key: "data",
    label: "数据结构",
    value: "对象布局",
    signal: "live set · 分配 · 吞吐",
  },
] as const;

const OFFICIAL_NODES = [
  "第5章 调优案例分析与实战",
  "5.1 概述",
  "5.2 案例分析",
  "5.2.1 大内存硬件上的程序部署策略",
  "5.2.2 集群间同步导致的内存溢出",
  "5.2.3 堆外内存导致的溢出错误",
  "5.2.4 外部命令导致系统缓慢",
  "5.2.5 服务器虚拟机进程崩溃",
  "5.2.6 不恰当数据结构导致内存占用过大",
  "5.2.7 由Windows虚拟内存导致的长时间停顿",
  "5.2.8 由安全点导致长时间停顿",
  "5.3 实战：Eclipse运行速度调优",
  "5.3.1 调优前的程序运行状态",
  "5.3.2 升级JDK版本的性能变化及兼容问题",
  "5.3.3 编译时间和类加载时间的优化",
  "5.3.4 调整内存设置控制垃圾收集频率",
  "5.3.5 选择收集器降低延迟",
  "5.4 本章小结",
] as const;

type Lens = "slo" | "evidence" | "rollback";
const LENSES: Record<Lens, { label: string; title: string; note: string }> = {
  slo: {
    label: "SLO",
    title: "收益必须落在业务目标上",
    note: "平均值变好不够：同时比较 P95/P99、完成量、错误率和资源边界。",
  },
  evidence: {
    label: "证据",
    title: "跨 JVM、应用和系统对齐",
    note: "GC、JFR、线程、RSS、外部命令与业务 trace 要共享同一时间窗口。",
  },
  rollback: {
    label: "回滚",
    title: "先写越界条件，再开始变更",
    note: "兼容性失败、探针成本过高或 P99/RSS 越界时恢复基线并保留原始记录。",
  },
};

const STEPS: readonly TeachingStep[] = STAGES.map((stage) => ({
  label: stage.key,
  caption: `${stage.label}：${stage.detail}`,
}));

const LABEL_TEXT: Readonly<Record<string, string>> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

export function Duj3Chapter5TuningCasesEvidenceMap() {
  const stageRefs = useRef<Array<SVGGElement | null>>([]);
  const rawId = useId();
  const instanceId = rawId.replace(/:/g, "");
  const arrowId = `duj3-chapter5-tuning-arrow-${instanceId}`;
  const [lens, setLens] = useState<Lens>("slo");
  const [candidate, setCandidate] =
    useState<(typeof CANDIDATES)[number]["key"]>("heap");
  const [failureInjected, setFailureInjected] = useState(false);
  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      STAGES.forEach((stage, index) => {
        const element = stageRefs.current[index];
        if (element) {
          tl.add(
            element,
            {
              opacity: [0.2, 1],
              translateY: [10, 0],
              duration: TEACHING_BEAT_MS,
              ease: "out(3)",
            },
            index * TEACHING_BEAT_MS,
          );
        }
        tl.label(stage.key, index * TEACHING_BEAT_MS);
      });
    },
  });

  const activeStage = STAGES[timeline.currentStep] ?? STAGES[0];
  const selectedCandidate =
    CANDIDATES.find((item) => item.key === candidate) ?? CANDIDATES[0];
  const lensState = LENSES[lens];
  const statusColor = failureInjected ? COLORS.warning : COLORS.success;

  function reset() {
    setLens("slo");
    setCandidate("heap");
    setFailureInjected(false);
    timeline.goToStep(0);
  }

  return (
    <figure
      className="mdx-figure not-prose mx-auto my-8"
      data-visual-kind="duj3-chapter5-tuning-cases-evidence"
    >
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-6">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              DUJ3 · 第 5 章
            </p>
            <h3 className="mt-1 text-lg font-semibold text-primary">
              调优案例的可回滚证据链
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
              选择一个变更轴，沿基线—假设—变更—对照—回滚—交接推进；图中不合成性能分数，只展示证据如何闭环。
            </p>
          </div>
          <button
            type="button"
            aria-label="重置调优证据图"
            onClick={reset}
            className="min-h-11 rounded-control border border-border px-3 py-2 text-xs text-secondary transition-colors hover:border-accent hover:text-primary"
          >
            重置
          </button>
        </div>

        <div className="mb-4 grid gap-3 md:grid-cols-[1fr_auto]">
          <div className="flex flex-wrap gap-2" aria-label="选择调优验收镜头">
            <span className="self-center text-xs text-secondary">镜头：</span>
            {(Object.entries(LENSES) as [Lens, (typeof LENSES)[Lens]][]).map(
              ([value, item]) => (
                <button
                  key={value}
                  type="button"
                  aria-pressed={lens === value}
                  onClick={() => setLens(value)}
                  className={`min-h-11 rounded-control border px-3 py-2 text-xs transition-colors ${
                    lens === value
                      ? "border-accent text-accent"
                      : "border-border text-secondary hover:border-accent hover:text-primary"
                  }`}
                >
                  {item.label}
                </button>
              ),
            )}
          </div>
          <button
            type="button"
            aria-pressed={failureInjected}
            onClick={() => setFailureInjected((value) => !value)}
            className={`min-h-11 rounded-control border px-3 py-2 text-xs transition-colors ${
              failureInjected
                ? "border-warning text-warning"
                : "border-border text-secondary hover:border-warning hover:text-warning"
            }`}
          >
            {failureInjected ? "恢复基线" : "注入越界"}
          </button>
        </div>

        <svg
          aria-label="调优案例的可回滚证据链"
          className="h-auto w-full"
          role="img"
          viewBox="0 0 700 1040"
        >
          <defs>
            <marker
              id={arrowId}
              markerHeight="8"
              markerWidth="8"
              orient="auto"
              refX="6"
              refY="4"
              viewBox="0 0 8 8"
            >
              <path d="M0 0 L8 4 L0 8 Z" fill={COLORS.border} />
            </marker>
          </defs>

          <text
            x="54"
            y="28"
            fontSize="14"
            fontWeight="700"
            fill={COLORS.primary}
          >
            当前关键帧 · {activeStage.label}
          </text>
          <text x="54" y="50" fontSize="12" fill={COLORS.secondary}>
            {activeStage.detail} · {activeStage.evidence}
          </text>

          {STAGES.map((stage, index) => {
            const y = 72 + index * 78;
            const selected = index === timeline.currentStep;
            return (
              <g
                key={stage.key}
                ref={(element) => {
                  stageRefs.current[index] = element;
                }}
              >
                {index < STAGES.length - 1 ? (
                  <line
                    x1="350"
                    y1={y + 58}
                    x2="350"
                    y2={y + 74}
                    stroke={COLORS.border}
                    strokeWidth="2"
                    markerEnd={`url(#${arrowId})`}
                  />
                ) : null}
                <rect
                  x="54"
                  y={y}
                  width="592"
                  height="58"
                  rx="10"
                  fill={selected ? COLORS.elevated : COLORS.background}
                  stroke={selected ? COLORS.accent : COLORS.border}
                  strokeWidth={selected ? 2 : 1}
                />
                <circle
                  cx="88"
                  cy={y + 29}
                  r="14"
                  fill={selected ? COLORS.background : COLORS.accent}
                />
                <text
                  x="88"
                  y={y + 34}
                  textAnchor="middle"
                  fontSize="12"
                  fontWeight="700"
                  fill={selected ? COLORS.accent : COLORS.background}
                >
                  {index + 1}
                </text>
                <text
                  x="118"
                  y={y + 25}
                  fontSize="13"
                  fontWeight="700"
                  fill={selected ? COLORS.accent : COLORS.primary}
                >
                  {stage.label}
                </text>
                <text x="118" y={y + 44} fontSize="12" fill={COLORS.secondary}>
                  {stage.detail} · {stage.evidence}
                </text>
                <circle
                  cx="614"
                  cy={y + 29}
                  r="5"
                  fill={selected ? COLORS.success : COLORS.border}
                />
              </g>
            );
          })}

          <text
            x="54"
            y="570"
            fontSize="14"
            fontWeight="700"
            fill={COLORS.primary}
          >
            变更轴 · {selectedCandidate.label} ({selectedCandidate.value})
          </text>
          {CANDIDATES.map((item, index) => {
            const y = 594 + index * 40;
            const selected = candidate === item.key;
            return (
              <g key={item.key}>
                <rect
                  x="54"
                  y={y}
                  width="592"
                  height="30"
                  rx="8"
                  fill={selected ? COLORS.elevated : COLORS.background}
                  stroke={selected ? COLORS.accent : COLORS.border}
                  strokeWidth={selected ? 2 : 1}
                />
                <text
                  x="72"
                  y={y + 20}
                  fontSize="12"
                  fontWeight="700"
                  fill={selected ? COLORS.accent : COLORS.primary}
                >
                  {item.label} · {item.value}
                </text>
                <text x="274" y={y + 20} fontSize="12" fill={COLORS.secondary}>
                  验收信号：{item.signal}
                </text>
              </g>
            );
          })}

          <rect
            x="54"
            y="850"
            width="592"
            height="142"
            rx="10"
            fill={COLORS.background}
            stroke={statusColor}
            strokeWidth="1.5"
          />
          <text
            x="76"
            y="880"
            fontSize="13"
            fontWeight="700"
            fill={statusColor}
          >
            {failureInjected ? "回滚信号" : "当前验收镜头"} · {lensState.label}
          </text>
          <text
            x="76"
            y="910"
            fontSize="13"
            fontWeight="700"
            fill={COLORS.primary}
          >
            {failureInjected
              ? "阈值越界：恢复基线并保存原始证据"
              : lensState.title}
          </text>
          <text x="76" y="940" fontSize="12" fill={COLORS.secondary}>
            {failureInjected
              ? "不继续扩大实验；记录回滚时间、退出码、哈希和未解决未知项。"
              : lensState.note}
          </text>
          <text x="76" y="970" fontSize="12" fill={COLORS.secondary}>
            当前轴：{selectedCandidate.label} · 下一份记录：{activeStage.detail}
          </text>
        </svg>

        <div
          className="mt-4 grid gap-2 sm:grid-cols-2"
          aria-label="本章 18 个正式目录节点"
        >
          {OFFICIAL_NODES.map((node, index) => (
            <div
              key={node}
              className="flex min-h-11 items-start gap-2 rounded-control border border-border px-3 py-2 text-xs text-secondary"
            >
              <span className="shrink-0 font-medium text-accent">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span>{node}</span>
            </div>
          ))}
        </div>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="先锁定 SLO 和重放合同，再让证据决定是否发布；越界就回到基线。"
          reset={{
            label: "重置调优证据链",
            ariaLabel: "重置调优证据链",
            onClick: reset,
          }}
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        章节地图：18 个正式目录节点接入同一条“基线—变更—对照—回滚—交接”链路。
      </figcaption>
    </figure>
  );
}
