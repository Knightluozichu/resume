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
    key: "question",
    label: "定义问题",
    detail: "现象 / 窗口 / 预算",
    evidence: "避免无目的采集",
  },
  {
    key: "target",
    label: "确认目标",
    detail: "PID / JDK / 权限",
    evidence: "锁定正确进程",
  },
  {
    key: "sample",
    label: "轻量采样",
    detail: "趋势 / 配置 / 事件",
    evidence: "先看时间变化",
  },
  {
    key: "record",
    label: "保存原始",
    detail: "JFR / 堆 / 线程",
    evidence: "不丢时间上下文",
  },
  {
    key: "corroborate",
    label: "交叉验证",
    detail: "独立信号 / 反例",
    evidence: "区分观察与根因",
  },
  {
    key: "close",
    label: "安全收尾",
    detail: "哈希 / 脱敏 / 清理",
    evidence: "可控交接",
  },
] as const;

const TOOLS = [
  {
    key: "jcmd",
    label: "jcmd",
    detail: "版本、标志与诊断命令",
    signal: "低成本确认配置和事件入口",
  },
  {
    key: "jstat",
    label: "jstat",
    detail: "堆与 GC 周期采样",
    signal: "适合趋势，不解释完整因果",
  },
  {
    key: "jfr",
    label: "JFR",
    detail: "时间线事件记录",
    signal: "对齐线程、GC、锁与应用事件",
  },
  {
    key: "thread",
    label: "线程转储",
    detail: "线程栈、状态与锁",
    signal: "回答等待与死锁假设",
  },
  {
    key: "heap",
    label: "堆转储",
    detail: "对象、类型与引用",
    signal: "重型快照，需管理敏感数据",
  },
  {
    key: "jhsdb",
    label: "JHSDB",
    detail: "HotSpot 底层结构",
    signal: "版本和符号依赖更强",
  },
] as const;

const OFFICIAL_NODES = [
  "第4章 虚拟机性能监控、故障处理工具",
  "4.1 概述",
  "4.2 基础故障处理工具",
  "4.2.1 jps：虚拟机进程状况工具",
  "4.2.2 jstat：虚拟机统计信息监视工具",
  "4.2.3 jinfo：Java配置信息工具",
  "4.2.4 jmap：Java内存映像工具",
  "4.2.5 jhat：虚拟机堆转储快照分析工具",
  "4.2.6 jstack：Java堆栈跟踪工具",
  "4.2.7 基础工具总结",
  "4.3 可视化故障处理工具",
  "4.3.1 JHSDB：基于服务性代理的调试工具",
  "4.3.2 JConsole：Java监视与管理控制台",
  "4.3.3 VisualVM：多合一故障处理工具",
  "4.3.4 Java Mission Control：可持续在线的监控工具",
  "4.4 HotSpot虚拟机插件及工具",
  "4.5 本章小结",
] as const;

type Lens = "question" | "record" | "risk";
type ToolKey = (typeof TOOLS)[number]["key"];

const LENSES: Record<Lens, { label: string; title: string; note: string }> = {
  question: {
    label: "问题",
    title: "每个工具先回答一个问题",
    note: "进程、趋势、配置、线程、堆和事件是不同观察面，不能靠一份摘要覆盖全部。",
  },
  record: {
    label: "记录",
    title: "原始输出必须带时间与版本",
    note: "保存命令、退出码、采集窗口和文件哈希，解析摘要只作为索引而不是唯一证据。",
  },
  risk: {
    label: "风险",
    title: "把影响和敏感数据纳入预算",
    note: "快照、远程连接和长期录制都有成本；权限、保留、脱敏和清理必须可追踪。",
  },
};

const STEPS: readonly TeachingStep[] = STAGES.map((stage) => ({
  label: stage.key,
  caption: `${stage.label}：${stage.detail}`,
}));

const LABEL_TEXT: Readonly<Record<string, string>> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

export function Duj3Chapter4MonitoringToolsEvidenceMap() {
  const stageRefs = useRef<Array<SVGGElement | null>>([]);
  const rawId = useId();
  const instanceId = rawId.replace(/:/g, "");
  const arrowId = `duj3-chapter4-monitoring-arrow-${instanceId}`;
  const [lens, setLens] = useState<Lens>("question");
  const [tool, setTool] = useState<ToolKey>("jcmd");
  const [gapInjected, setGapInjected] = useState(false);
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

  const activeIndex = timeline.currentStep;
  const activeStage = STAGES[activeIndex] ?? STAGES[0];
  const lensState = LENSES[lens];
  const toolState = TOOLS.find((item) => item.key === tool) ?? TOOLS[0];
  const statusColor = gapInjected ? COLORS.warning : COLORS.success;
  const statusTitle = gapInjected
    ? "原始记录缺少交叉证据"
    : `${toolState.label} · ${lensState.title}`;
  const statusNote = gapInjected
    ? "补充另一种信号、采集窗口和退出码后，再把观察写成可交接结论。"
    : toolState.signal;

  function reset() {
    setLens("question");
    setTool("jcmd");
    setGapInjected(false);
    timeline.goToStep(0);
  }

  return (
    <figure
      className="mdx-figure not-prose mx-auto my-8"
      data-visual-kind="duj3-chapter4-monitoring-tools-evidence"
    >
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-6">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              DUJ3 · 第 4 章
            </p>
            <h3 className="mt-1 text-lg font-semibold text-primary">
              JVM 监控工具取证路线
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
              沿问题、目标、采样、记录、复核和收尾移动；高亮只表示证据顺序，不生成自动结论。
            </p>
          </div>
          <button
            type="button"
            aria-label="重置 JVM 监控证据图"
            onClick={reset}
            className="min-h-11 rounded-control border border-border px-3 py-2 text-xs text-secondary transition-colors hover:border-accent hover:text-primary"
          >
            重置
          </button>
        </div>

        <div className="mb-4 grid gap-3 md:grid-cols-[1fr_auto]">
          <div className="flex flex-wrap gap-2" aria-label="选择监控诊断镜头">
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
            aria-pressed={gapInjected}
            onClick={() => setGapInjected((value) => !value)}
            className={`min-h-11 rounded-control border px-3 py-2 text-xs transition-colors ${
              gapInjected
                ? "border-warning text-warning"
                : "border-border text-secondary hover:border-warning hover:text-warning"
            }`}
          >
            {gapInjected ? "补齐证据" : "注入缺口"}
          </button>
        </div>

        <div className="mb-4 flex flex-wrap gap-2" aria-label="选择监控工具">
          <span className="self-center text-xs text-secondary">工具：</span>
          {TOOLS.map((item) => (
            <button
              key={item.key}
              type="button"
              aria-pressed={tool === item.key}
              onClick={() => setTool(item.key)}
              className={`min-h-11 rounded-control border px-3 py-2 text-xs transition-colors ${
                tool === item.key
                  ? "border-accent text-accent"
                  : "border-border text-secondary hover:border-accent hover:text-primary"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <svg
          viewBox="0 0 700 1040"
          role="img"
          aria-label={`JVM 监控工具取证路线图：当前阶段为${activeStage.label}，镜头为${lensState.label}，工具为${toolState.label}，${gapInjected ? "已注入原始记录缺少交叉证据的缺口" : "问题与预算已登记"}。路线连接定义问题、确认目标、轻量采样、保存原始、交叉验证和安全收尾，并支持播放、暂停、单步、拖动进度、镜头切换、工具切换、缺口注入和重置。`}
          className="mx-auto block h-auto w-full"
        >
          <defs>
            <marker
              id={arrowId}
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="4"
              orient="auto"
            >
              <path d="M0,0 L7,4 L0,8 Z" fill={COLORS.border} />
            </marker>
          </defs>
          <rect
            x="0"
            y="0"
            width="700"
            height="1040"
            rx="16"
            fill={COLORS.background}
          />
          <text
            x="350"
            y="32"
            textAnchor="middle"
            fontSize="17"
            fontWeight="700"
            fill={COLORS.primary}
          >
            问题 → 工具 → 记录 → 复核 → 收尾
          </text>
          <text
            x="350"
            y="56"
            textAnchor="middle"
            fontSize="12"
            fill={COLORS.secondary}
          >
            采集窗口、版本、权限与原始输出必须一起保存
          </text>

          {STAGES.map((stage, index) => {
            const y = 86 + index * 76;
            const selected = index === activeIndex;
            const fill = selected ? COLORS.accent : COLORS.elevated;
            const textColor = selected ? COLORS.background : COLORS.primary;
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
                    y2={y + 72}
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
                  fill={fill}
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
                  fill={textColor}
                >
                  {stage.label}
                </text>
                <text
                  x="118"
                  y={y + 44}
                  fontSize="12"
                  fill={selected ? COLORS.background : COLORS.secondary}
                >
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
            诊断工具 · 当前选择 {toolState.label}
          </text>
          {TOOLS.map((item, index) => {
            const y = 594 + index * 48;
            const selected = tool === item.key;
            return (
              <g key={item.key}>
                <rect
                  x="54"
                  y={y}
                  width="592"
                  height="36"
                  rx="8"
                  fill={selected ? COLORS.elevated : COLORS.background}
                  stroke={selected ? COLORS.accent : COLORS.border}
                  strokeWidth={selected ? 2 : 1}
                />
                <text
                  x="72"
                  y={y + 16}
                  fontSize="12"
                  fontWeight="700"
                  fill={selected ? COLORS.accent : COLORS.primary}
                >
                  {item.label}
                </text>
                <text x="164" y={y + 16} fontSize="12" fill={COLORS.secondary}>
                  {item.detail}
                </text>
                <text x="164" y={y + 30} fontSize="11" fill={COLORS.secondary}>
                  证据：{item.signal}
                </text>
              </g>
            );
          })}

          <rect
            x="54"
            y="890"
            width="592"
            height="102"
            rx="10"
            fill={COLORS.background}
            stroke={statusColor}
            strokeWidth="1.5"
          />
          <text
            x="76"
            y="918"
            fontSize="13"
            fontWeight="700"
            fill={statusColor}
          >
            {gapInjected ? "证据缺口" : "当前判定"} · {lensState.label}
          </text>
          <text
            x="76"
            y="946"
            fontSize="13"
            fontWeight="700"
            fill={COLORS.primary}
          >
            {statusTitle}
          </text>
          <text x="76" y="970" fontSize="12" fill={COLORS.secondary}>
            {gapInjected
              ? "补采第二种信号、窗口、退出码与文件哈希后再交接。"
              : lensState.note}
          </text>
        </svg>

        <div
          className="mt-4 grid gap-2 sm:grid-cols-2"
          aria-label="本章 17 个正式目录节点"
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
          caption="先定义问题和探针预算，再由轻量工具走向原始记录；最后用独立信号验证并安全收尾。"
          reset={{
            label: "重置监控取证探针",
            ariaLabel: "重置监控取证探针",
            onClick: reset,
          }}
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        章节地图：17 个正式目录节点接入同一条“问题—工具—记录—复核—收尾”链路。
      </figcaption>
    </figure>
  );
}
