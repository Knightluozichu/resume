"use client";

import { useRef, useState } from "react";

import {
  TEACHING_BEAT_MS,
  TimelineControls,
} from "../anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "../anim/use-teaching-timeline";

const C = {
  bg: "var(--bg)",
  elevated: "var(--bg-elevated)",
  border: "var(--border)",
  primary: "var(--text-primary)",
  secondary: "var(--text-secondary)",
  accent: "var(--accent)",
  success: "var(--success)",
  warning: "var(--warning)",
} as const;

const T = TEACHING_BEAT_MS;

const STEPS: readonly TeachingStep[] = [
  { label: "problem", caption: "定义问题、实例和合法输出" },
  { label: "algorithm", caption: "给出状态、操作和控制流程" },
  { label: "correct", caption: "同时证明结果和终止" },
  { label: "resource", caption: "选择规模并估算资源增长" },
  { label: "compare", caption: "比较增长率与硬件常数" },
  { label: "technology", caption: "把算法放回真实系统技术层" },
];

const LABEL_TEXT: Readonly<Record<string, string>> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

const STAGE_COPY = [
  [
    "1 · 问题规格",
    "先写合法实例、输出合同和失败边界；故事不是问题，规格才是可证明对象。",
    "证据：domain + contract",
  ],
  [
    "2 · 算法描述",
    "算法选择状态、操作和控制流程，独立于某一种语言、编译器或机器。",
    "证据：state + transition",
  ],
  [
    "3 · 正确性",
    "部分正确性保证结果，终止性保证流程会结束；二者缺一不可。",
    "证据：postcondition + halt",
  ],
  [
    "4 · 资源规模",
    "用 n、V、E 或 bit 数描述输入规模，再记录时间、空间、通信和能耗成本。",
    "证据：size + work",
  ],
  [
    "5 · 增长率",
    "固定倍数硬件优势会被增长率放大；算法与硬件相乘，而不是互相替代。",
    "证据：rate + threshold",
  ],
  [
    "6 · 技术层",
    "算法进入路由、搜索、调度和存储系统，价值还包括规模、审计性与退化边界。",
    "证据：system + guarantee",
  ],
] as const;

type Mode = "sort" | "graph" | "schedule" | "search";

type ModeInfo = {
  title: string;
  input: string;
  state: string;
  result: string;
  detail: string;
};

const MODE_COPY: Record<Mode, ModeInfo> = {
  sort: {
    title: "排序问题",
    input: "[3, 1, 3]",
    state: "n = 3 · comparable",
    result: "[1, 3, 3]",
    detail: "输出必须有序且保持输入的多重集；只检查顺序会漏掉删除或伪造元素。",
  },
  graph: {
    title: "路径问题",
    input: "G(V, E) with weights",
    state: "V + E + weight rules",
    result: "path contract",
    detail: "先确认是任意可达、最短、最小权还是近似路径；负权和负环会改变算法前提。",
  },
  schedule: {
    title: "调度问题",
    input: "jobs + deadlines",
    state: "objective + constraints",
    result: "feasible plan",
    detail: "同一个业务故事可以优化完工时间、最大延迟或违约成本，目标函数决定算法问题。",
  },
  search: {
    title: "规模比较",
    input: "n = 10⁶ · linear vs n²",
    state: "growth rate",
    result: "scaling decision",
    detail: "常数和硬件能改变小规模胜负，但增长率决定规模继续扩大后的可行范围。",
  },
};

export function Clrs4Chapter01AlgorithmsLab() {
  const stageRefs = useRef<Array<SVGGElement | null>>([]);
  const [mode, setMode] = useState<Mode>("sort");

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

  const activeIndex =
    timeline.currentStep >= STEPS.length
      ? STEPS.length - 1
      : timeline.currentStep;
  const activeStep = STEPS[activeIndex] ?? STEPS[0];
  const selected = MODE_COPY[mode];
  const boundaryIndex = mode === "sort" ? 0 : mode === "graph" ? 2 : mode === "schedule" ? 1 : 4;

  function reset() {
    timeline.goToStep(0);
    setMode("sort");
  }

  return (
    <figure
      className="mdx-figure not-prose mx-auto my-8"
      data-visual-kind="clrs4-ch01-role-of-algorithms"
    >
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-6">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              CLRS 4e · Chapter 1 · Foundations
            </p>
            <h3 className="mt-1 text-lg font-semibold text-primary">
              从问题规格到可扩展的算法技术
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
              切换排序、路径、调度和规模样本，沿时间线观察一个计算问题如何获得正确性合同、资源上界和系统级意义。
            </p>
          </div>
          <span className="rounded-control border border-accent px-2 py-1 text-xs text-accent">
            ▷ 可交互
          </span>
        </div>

        <label className="mb-4 block text-xs text-secondary">
          <span className="mb-1 block font-semibold text-primary">选择计算问题样本</span>
          <select
            aria-label="选择排序、图路径、调度或算法规模增长样本"
            value={mode}
            onChange={(event) => setMode(event.target.value as Mode)}
            className="min-h-11 w-full rounded-control border border-border bg-bg px-3 py-2 text-sm text-primary"
          >
            <option value="sort">排序 · correctness contract</option>
            <option value="graph">图路径 · input assumptions</option>
            <option value="schedule">调度 · objective function</option>
            <option value="search">规模 · growth rate</option>
          </select>
        </label>

        <svg
          viewBox="0 0 900 650"
          role="img"
          aria-label="CLRS 4e Chapter 1 专属算法证据时间线，覆盖 the role of algorithms in computing、算法在计算中的作用、algorithms、算法、algorithms as a technology、算法作为一种技术。展示问题规格、算法描述、正确性与终止、资源规模、增长率和系统技术层，并支持样本切换、播放、暂停、单步、拖进度和重置。"
          className="mx-auto block h-auto w-full"
        >
          <defs>
            <marker id="clrs4-ch01-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill={C.border} />
            </marker>
            <marker id="clrs4-ch01-success-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill={C.success} />
            </marker>
            <marker id="clrs4-ch01-warning-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill={C.warning} />
            </marker>
          </defs>

          <rect x="0" y="0" width="900" height="650" rx="14" fill={C.bg} />
          <text x="30" y="34" fontSize="16" fontWeight="700" fill={C.primary}>
            problem → algorithm → correctness → resources → scale → technology
          </text>
          <text x="30" y="58" fontSize="12" fill={C.secondary}>
            the role of algorithms in computing · {selected.title} · 当前：{selected.input}
          </text>

          <rect x="30" y="78" width="252" height="124" rx="12" fill={C.elevated} stroke={C.border} strokeWidth="1.5" />
          <text x="52" y="106" fontSize="13" fontWeight="700" fill={C.accent}>问题输入</text>
          <text x="52" y="134" fontSize="11" fill={C.primary}>{selected.input}</text>
          <text x="52" y="162" fontSize="11" fill={C.secondary}>先写实例、输出与约束</text>
          <text x="52" y="184" fontSize="11" fill={C.secondary}>再讨论算法是否解决问题</text>

          <line x1="294" y1="140" x2="326" y2="140" stroke={C.success} strokeWidth="2.5" markerEnd="url(#clrs4-ch01-success-arrow)" />

          <rect x="336" y="78" width="252" height="124" rx="12" fill={mode === "graph" || mode === "search" ? C.warning : C.elevated} fillOpacity={mode === "graph" || mode === "search" ? 0.1 : 1} stroke={mode === "graph" || mode === "search" ? C.warning : C.border} strokeWidth="1.5" />
          <text x="358" y="106" fontSize="13" fontWeight="700" fill={mode === "graph" || mode === "search" ? C.warning : C.accent}>证据状态</text>
          <text x="358" y="134" fontSize="11" fill={C.primary}>{selected.state}</text>
          <text x="358" y="162" fontSize="11" fill={C.secondary}>当前阶段：{activeStep.label}</text>
          <text x="358" y="184" fontSize="11" fill={C.secondary}>证据：合同、上界、假设</text>

          <line x1="600" y1="140" x2="632" y2="140" stroke={mode === "graph" || mode === "search" ? C.warning : C.success} strokeWidth="2.5" markerEnd={mode === "graph" || mode === "search" ? "url(#clrs4-ch01-warning-arrow)" : "url(#clrs4-ch01-success-arrow)"} />

          <rect x="642" y="78" width="228" height="124" rx="12" fill={mode === "graph" || mode === "search" ? C.warning : C.success} fillOpacity="0.1" stroke={mode === "graph" || mode === "search" ? C.warning : C.success} strokeWidth="1.5" />
          <text x="756" y="106" textAnchor="middle" fontSize="13" fontWeight="700" fill={mode === "graph" || mode === "search" ? C.warning : C.success}>验收结果</text>
          <text x="756" y="134" textAnchor="middle" fontSize="11" fill={C.primary}>{selected.result}</text>
          <text x="756" y="162" textAnchor="middle" fontSize="11" fill={C.secondary}>{selected.detail}</text>
          <text x="756" y="184" textAnchor="middle" fontSize="11" fill={C.secondary}>合同必须可审计</text>

          {STAGE_COPY.map((stage, index) => {
            const isActive = index === activeIndex;
            const isBoundary = index === boundaryIndex;
            const tone = isBoundary ? C.warning : isActive ? C.accent : index === 5 ? C.success : C.border;
            return (
              <g
                key={`stage-${stage[0]}`}
                ref={(node) => {
                  stageRefs.current[index] = node;
                }}
                style={{ opacity: 0 }}
              >
                <rect x="30" y="222" width="840" height="106" rx="12" fill={isBoundary ? C.warning : isActive ? C.accent : C.elevated} fillOpacity={isBoundary || isActive ? 0.1 : 1} stroke={tone} strokeWidth={isBoundary || isActive ? 2.5 : 1.5} />
                <text x="52" y="250" fontSize="13" fontWeight="700" fill={isBoundary ? C.warning : isActive ? C.accent : C.primary}>{stage[0]}</text>
                <text x="52" y="278" fontSize="12" fill={C.primary}>{stage[1]}</text>
                <text x="52" y="306" fontSize="12" fill={C.primary}>{stage[2]}</text>
                <text x="52" y="322" fontSize="11" fill={isBoundary ? C.warning : C.secondary}>{isBoundary ? "边界样本：把规格、终止与增长率分开记录" : isActive ? "当前阶段：沿算法证据推进" : "等待前一步签发状态"}</text>
              </g>
            );
          })}

          <line x1="52" y1="382" x2="848" y2="382" stroke={C.border} strokeWidth="2" markerEnd="url(#clrs4-ch01-arrow)" />
          {STEPS.slice(0, -1).map((step, index) => {
            const x1 = 52 + index * 148 + 104;
            const x2 = 52 + (index + 1) * 148 - 12;
            return (
              <line
                key={`connector-${step.label}`}
                x1={x1}
                y1="382"
                x2={x2}
                y2="382"
                stroke={index < activeIndex ? C.success : C.border}
                strokeWidth={index < activeIndex ? 3 : 1.5}
                markerEnd={index < activeIndex ? "url(#clrs4-ch01-success-arrow)" : "url(#clrs4-ch01-arrow)"}
              />
            );
          })}
          {STEPS.map((step, index) => {
            const x = 52 + index * 148;
            const isActive = index === activeIndex;
            const isBoundary = index === boundaryIndex;
            const tone = isBoundary ? C.warning : isActive ? C.accent : C.border;
            return (
              <g key={`step-${step.label}`}>
                <rect x={x} y="398" width="104" height="116" rx="12" fill={isBoundary ? C.warning : isActive ? C.accent : C.elevated} fillOpacity={isBoundary || isActive ? 0.16 : 1} stroke={tone} strokeWidth={isBoundary || isActive ? 2.5 : 1.5} />
                <circle cx={x + 22} cy="422" r="12" fill={isBoundary || isActive ? tone : C.bg} stroke={tone} strokeWidth="1.5" />
                <text x={x + 22} y="426" textAnchor="middle" fontSize="11" fill={isActive || isBoundary ? C.bg : C.primary}>{index + 1}</text>
                <text x={x + 64} y="426" textAnchor="middle" fontSize="11" fontWeight="700" fill={isBoundary ? C.warning : isActive ? C.accent : C.primary}>{step.label}</text>
                <text x={x + 52} y="454" textAnchor="middle" fontSize="11" fill={C.secondary}>{index < activeIndex ? "checked" : isActive ? "active" : "trace"}</text>
                <text x={x + 52} y="480" textAnchor="middle" fontSize="11" fill={isBoundary ? C.warning : C.secondary}>{isBoundary ? "boundary" : "evidence"}</text>
                <text x={x + 52} y="502" textAnchor="middle" fontSize="11" fill={C.secondary}>{index === 0 ? "contract" : index === 1 ? "state" : index === 2 ? "proof" : index === 3 ? "work" : index === 4 ? "rate" : "system"}</text>
              </g>
            );
          })}
          <text x="30" y="548" fontSize="11" fill={C.secondary}>当前阶段：{activeStep.label} · {activeStep.caption}</text>
          <text x="870" y="548" textAnchor="end" fontSize="11" fill={C.secondary}>先定义问题，再比较算法</text>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="先预测问题合同、正确性、终止和规模增长，再推进时间线验证算法如何成为可复用的计算技术。"
          reset={{ label: "重置实验", ariaLabel: "重置算法角色实验", onClick: reset }}
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        算法的角色不是替程序制造答案，而是把问题、证明、规模和系统价值连接成可复用的技术层。
      </figcaption>
    </figure>
  );
}
