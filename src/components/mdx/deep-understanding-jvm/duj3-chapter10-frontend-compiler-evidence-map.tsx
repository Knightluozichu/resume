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
    key: "source",
    label: "源码",
    detail: "source / options",
    evidence: "固定输入与目标版本",
  },
  {
    key: "parse",
    label: "解析",
    detail: "tokens / tree",
    evidence: "保存首个语法诊断",
  },
  {
    key: "symbols",
    label: "符号",
    detail: "enter / symbols",
    evidence: "核对名字与归属",
  },
  {
    key: "rounds",
    label: "轮次",
    detail: "annotations / rounds",
    evidence: "记录生成源文件",
  },
  {
    key: "attribute",
    label: "语义",
    detail: "types / attribution",
    evidence: "定位类型与访问错误",
  },
  {
    key: "lower",
    label: "展开",
    detail: "sugar / lowering",
    evidence: "比较语法糖产物",
  },
  {
    key: "generate",
    label: "生成",
    detail: "class / diagnostics",
    evidence: "保存 Class 哈希与诊断",
  },
] as const;

const BOUNDARIES = [
  {
    key: "input",
    label: "输入边界",
    value: "source + flags",
    signal: "源码哈希 · 目标版本",
  },
  {
    key: "syntax",
    label: "语法边界",
    value: "tokens + tree",
    signal: "行列号 · 首个诊断",
  },
  {
    key: "symbol",
    label: "名字边界",
    value: "symbol + owner",
    signal: "类型 · 包 · 访问关系",
  },
  {
    key: "round",
    label: "处理边界",
    value: "round + generated",
    signal: "处理器 · 新源哈希",
  },
  {
    key: "output",
    label: "产物边界",
    value: "class + exit",
    signal: "Class 哈希 · 退出码",
  },
] as const;

const OFFICIAL_NODES = [
  "第10章 前端编译与优化",
  "10.1 概述",
  "10.2 Javac编译器",
  "10.2.1 Javac的源码与调试",
  "10.2.2 解析与填充符号表",
  "10.2.3 注解处理器",
  "10.2.4 语义分析与字节码生成",
  "10.3 Java语法糖的味道",
  "10.3.1 泛型",
  "10.3.2 自动装箱、拆箱与遍历循环",
  "10.3.3 条件编译",
  "10.4 实战：插入式注解处理器",
  "10.4.1 实战目标",
  "10.4.2 代码实现",
  "10.4.3 运行与测试",
  "10.4.4 其他应用案例",
  "10.5 本章小结",
] as const;

type Lens = "rounds" | "symbols" | "output";

const LENSES: Record<Lens, { label: string; title: string; note: string }> = {
  rounds: {
    label: "轮次",
    title: "先问处理器生成了什么",
    note: "处理器路径、轮次顺序和生成源哈希决定下一轮看到的输入，成功退出不是最终合同。",
  },
  symbols: {
    label: "符号",
    title: "再问名字归属是否一致",
    note: "解析、符号表和语义归属分别提供证据；同一个名字在不同包或类型中并不天然相同。",
  },
  output: {
    label: "产物",
    title: "最后问 Class 是否可复核",
    note: "Class 哈希、javap 输出和退出码必须与源码、选项和全新输出目录绑定。",
  },
};

const STEPS: readonly TeachingStep[] = STAGES.map((stage) => ({
  label: stage.key,
  caption: `${stage.label}：${stage.detail}`,
}));

const LABEL_TEXT: Readonly<Record<string, string>> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

export function Duj3Chapter10FrontendCompilerEvidenceMap() {
  const stageRefs = useRef<Array<SVGGElement | null>>([]);
  const rawId = useId();
  const instanceId = rawId.replace(/:/g, "");
  const arrowId = `duj3-chapter10-frontend-arrow-${instanceId}`;
  const [lens, setLens] = useState<Lens>("rounds");
  const [boundary, setBoundary] =
    useState<(typeof BOUNDARIES)[number]["key"]>("input");
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
              opacity: [0.18, 1],
              translateX: [-12, 0],
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
  const selectedBoundary =
    BOUNDARIES.find((item) => item.key === boundary) ?? BOUNDARIES[0];
  const lensState = LENSES[lens];
  const statusColor = failureInjected ? COLORS.warning : COLORS.success;

  function reset() {
    setLens("rounds");
    setBoundary("input");
    setFailureInjected(false);
    timeline.goToStep(0);
  }

  return (
    <figure
      className="mdx-figure not-prose mx-auto my-8"
      data-visual-kind="duj3-chapter10-frontend-compiler-evidence"
    >
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-6">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              DUJ3 · 第 10 章
            </p>
            <h3 className="mt-1 text-lg font-semibold text-primary">
              Javac 语义与注解处理证据台
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
              沿源码、解析、符号、处理轮次、语义、展开和生成推进；状态只表达可观察证据顺序，不把一次诊断截图伪装成编译器规范。
            </p>
          </div>
          <button
            type="button"
            aria-label="重置 Javac 前端证据图"
            onClick={reset}
            className="min-h-11 rounded-control border border-border px-3 py-2 text-xs text-secondary transition-colors hover:border-accent hover:text-primary"
          >
            重置
          </button>
        </div>

        <div className="mb-4 grid gap-3 md:grid-cols-[1fr_auto]">
          <div
            className="flex flex-wrap gap-2"
            aria-label="选择 Javac 证据镜头"
          >
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
            {failureInjected ? "恢复基线" : "注入诊断失败"}
          </button>
        </div>

        <svg
          aria-label="Javac 前端编译证据图：源码经过解析、符号表、注解处理轮次、语义分析、语法糖展开与 Class 生成；支持镜头切换、故障注入、播放、暂停、单步和进度拖动。"
          className="h-auto w-full"
          role="img"
          viewBox="0 0 700 1120"
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
            当前阶段 · {activeStage.label}
          </text>
          <text x="54" y="50" fontSize="12" fill={COLORS.secondary}>
            {activeStage.detail} · {activeStage.evidence}
          </text>

          {STAGES.map((stage, index) => {
            const y = 72 + index * 70;
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
                    y1={y + 54}
                    x2="350"
                    y2={y + 67}
                    stroke={COLORS.border}
                    strokeWidth="2"
                    markerEnd={`url(#${arrowId})`}
                  />
                ) : null}
                <rect
                  x="54"
                  y={y}
                  width="592"
                  height="52"
                  rx="10"
                  fill={selected ? COLORS.elevated : COLORS.background}
                  stroke={selected ? COLORS.accent : COLORS.border}
                  strokeWidth={selected ? 2 : 1}
                />
                <circle
                  cx="88"
                  cy={y + 26}
                  r="14"
                  fill={selected ? COLORS.background : COLORS.accent}
                />
                <text
                  x="88"
                  y={y + 31}
                  textAnchor="middle"
                  fontSize="12"
                  fontWeight="700"
                  fill={selected ? COLORS.accent : COLORS.background}
                >
                  {index + 1}
                </text>
                <text
                  x="118"
                  y={y + 23}
                  fontSize="13"
                  fontWeight="700"
                  fill={selected ? COLORS.accent : COLORS.primary}
                >
                  {stage.label}
                </text>
                <text x="118" y={y + 41} fontSize="12" fill={COLORS.secondary}>
                  {stage.detail} · {stage.evidence}
                </text>
                <circle
                  cx="614"
                  cy={y + 26}
                  r="5"
                  fill={selected ? COLORS.success : COLORS.border}
                />
              </g>
            );
          })}

          <text
            x="54"
            y="586"
            fontSize="14"
            fontWeight="700"
            fill={COLORS.primary}
          >
            当前证据边界 · {selectedBoundary.label} ({selectedBoundary.value})
          </text>
          {BOUNDARIES.map((item, index) => {
            const y = 610 + index * 40;
            const selected = boundary === item.key;
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
                <text x="284" y={y + 20} fontSize="12" fill={COLORS.secondary}>
                  证据：{item.signal}
                </text>
              </g>
            );
          })}

          <rect
            x="54"
            y="834"
            width="592"
            height="150"
            rx="10"
            fill={COLORS.background}
            stroke={statusColor}
            strokeWidth="1.5"
          />
          <text
            x="76"
            y="864"
            fontSize="13"
            fontWeight="700"
            fill={statusColor}
          >
            {failureInjected ? "失败模式" : "当前观察镜头"} · {lensState.label}
          </text>
          <text
            x="76"
            y="894"
            fontSize="13"
            fontWeight="700"
            fill={COLORS.primary}
          >
            {failureInjected
              ? "首个诊断变化：保留轮次原文并回到基线"
              : lensState.title}
          </text>
          <text x="76" y="924" fontSize="12" fill={COLORS.secondary}>
            {failureInjected
              ? "记录处理器路径、首个诊断、生成源哈希、退出码和完整 stderr，不继续污染旧输出目录。"
              : lensState.note}
          </text>
          <text x="76" y="954" fontSize="12" fill={COLORS.secondary}>
            当前边界：{selectedBoundary.label} · 下一份记录：
            {activeStage.detail}
          </text>

          <line
            x1="54"
            y1="1010"
            x2="646"
            y2="1010"
            stroke={COLORS.border}
            strokeDasharray="5 4"
          />
          <text x="54" y="1040" fontSize="12" fill={COLORS.secondary}>
            结论格式：固定输入 · 一个变化 · 原始诊断 · 全新目录重放
          </text>
          <text x="54" y="1066" fontSize="12" fill={COLORS.secondary}>
            未测量的处理器行为与跨版本差异保留为 unknowns，不用分数替代证据。
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
          caption="先固定源码和处理器，再观察解析、符号与轮次；出现诊断差异就清空输出，用同输入重新生成。"
          reset={{
            label: "重置 Javac 前端证据链",
            ariaLabel: "重置 Javac 前端证据链",
            onClick: reset,
          }}
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        专属证据地图：17
        个正式目录节点接入“源码—解析—符号—轮次—语义—展开—生成”状态链。
      </figcaption>
    </figure>
  );
}
