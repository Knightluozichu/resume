"use client";

import { useMemo, useRef, useState } from "react";

import {
  TEACHING_BEAT_MS,
  TimelineControls,
} from "@/components/mdx/anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "@/components/mdx/anim/use-teaching-timeline";

const VIEW_W = 760;
const VIEW_H = 420;
const T = TEACHING_BEAT_MS;

const COLORS = {
  accent: "var(--accent)",
  border: "var(--border)",
  danger: "var(--danger)",
  elevated: "var(--bg-elevated)",
  primary: "var(--text-primary)",
  secondary: "var(--text-secondary)",
  success: "var(--success)",
  warning: "var(--warning)",
} as const;

type View = "outline" | "strategy" | "generator";
type Sample = "valid" | "ambiguous" | "truncated";
type Fault = "none" | "lookahead" | "recovery";

const VIEWS: readonly { id: View; label: string; detail: string }[] = [
  {
    id: "outline",
    label: "代码分析路线",
    detail: "把五个正式节点放进 token、规则、树和诊断的证据链。",
  },
  {
    id: "strategy",
    label: "方法选择",
    detail: "比较递归下降、表驱动和生成器在选择与诊断上的取舍。",
  },
  {
    id: "generator",
    label: "生成器回放",
    detail: "用 JavaCC 配置、生成命令和三类输入复核解析行为。",
  },
];

const SAMPLES: readonly {
  id: Sample;
  label: string;
  detail: string;
}[] = [
  {
    id: "valid",
    label: "合法表达式",
    detail: "a + b * c：检查优先级和树形。",
  },
  {
    id: "ambiguous",
    label: "歧义前缀",
    detail: "声明与调用共享开头：检查前看范围。",
  },
  {
    id: "truncated",
    label: "截断输入",
    detail: "a +：检查错误位置和恢复边界。",
  },
];

const STEPS: readonly TeachingStep[] = [
  {
    label: "tokens",
    caption: "先确认 token 流完整，保存词类、文本和源位置。",
  },
  {
    label: "grammar",
    caption: "用规则组织共同前缀、优先级和结束条件。",
  },
  {
    label: "lookahead",
    caption: "只看足够区分分支的前看，记录选择依据。",
  },
  {
    label: "tree",
    caption: "生成语法树并核对括号、运算层次和声明边界。",
  },
  {
    label: "diagnostic",
    caption: "对截断或非法输入报告有帮助的位置，再清理重放。",
  },
] as const;

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

const OUTLINE_NODES = [
  { label: "第1部分 代码分析", detail: "文本到结构", color: COLORS.primary },
  { label: "第3章 语法分析的概要", detail: "总览证据链", color: COLORS.accent },
  { label: "3.1 语法分析的方法", detail: "选择策略", color: COLORS.warning },
  { label: "3.2 解析器生成器", detail: "自动化边界", color: COLORS.warning },
  { label: "3.3 JavaCC的概要", detail: "配置与回放", color: COLORS.success },
] as const;

const STRATEGIES = [
  { label: "递归下降", detail: "局部控制清楚", color: COLORS.primary },
  { label: "表驱动", detail: "规则规模稳定", color: COLORS.accent },
  { label: "生成器", detail: "减少重复实现", color: COLORS.success },
] as const;

function ViewButton({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`min-h-11 rounded-control border px-3 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${active ? "border-accent bg-accent/10 text-primary" : "border-border bg-background text-secondary hover:border-accent hover:text-primary"}`}
    >
      {children}
    </button>
  );
}

function Stage({
  active,
  label,
  refCallback,
  status,
  x,
  y,
}: {
  active: boolean;
  label: string;
  refCallback?: (element: SVGGElement | null) => void;
  status: string;
  x: number;
  y: number;
}) {
  return (
    <g ref={refCallback} opacity={active ? 1 : 0.36}>
      <rect
        x={x}
        y={y}
        width="132"
        height="80"
        rx="12"
        fill={COLORS.elevated}
        stroke={active ? COLORS.accent : COLORS.border}
        strokeWidth="2"
      />
      <text
        x={x + 16}
        y={y + 27}
        fontSize="15"
        fontWeight="700"
        fill={COLORS.primary}
      >
        {label}
      </text>
      <text x={x + 16} y={y + 56} fontSize="13" fill={COLORS.secondary}>
        {status}
      </text>
    </g>
  );
}

function OutlineView({
  activeStep,
  sample,
}: {
  activeStep: number;
  sample: Sample;
}) {
  const selected = SAMPLES.find((item) => item.id === sample) ?? SAMPLES[0];
  return (
    <g>
      <text x="28" y="31" fontSize="16" fontWeight="700" fill={COLORS.primary}>
        代码分析路线：五个节点，五种可交付证据
      </text>
      <text x="28" y="58" fontSize="13" fill={COLORS.secondary}>
        从文本到诊断，每个节点都要说明输入、产物和停止条件。
      </text>
      {OUTLINE_NODES.map((node, index) => {
        const column = index % 3;
        const row = Math.floor(index / 3);
        const x = 28 + column * 234;
        const y = 94 + row * 112;
        const active = activeStep >= Math.min(index, 4);
        return (
          <g key={node.label}>
            <rect
              x={x}
              y={y}
              width="208"
              height="82"
              rx="12"
              fill={node.color}
              fillOpacity={active ? 0.14 : 0.04}
              stroke={active ? node.color : COLORS.border}
              strokeWidth={active ? 2.5 : 1.5}
            />
            <circle
              cx={x + 24}
              cy={y + 28}
              r="8"
              fill={active ? node.color : COLORS.border}
            />
            <text
              x={x + 46}
              y={y + 31}
              fontSize="13"
              fontWeight="700"
              fill={COLORS.primary}
            >
              {node.label}
            </text>
            <text x={x + 46} y={y + 59} fontSize="13" fill={COLORS.secondary}>
              {node.detail}
            </text>
          </g>
        );
      })}
      <rect
        x="28"
        y="316"
        width="704"
        height="44"
        rx="12"
        fill={COLORS.elevated}
        stroke={COLORS.border}
        strokeWidth="2"
      />
      <text x="52" y="344" fontSize="13" fontWeight="700" fill={COLORS.accent}>
        当前样本：{selected.label} · 先记录 token，再判断规则选择和树形
      </text>
      <text x="28" y="392" fontSize="13" fill={COLORS.accent}>
        先预测：如果只保存最后的错误信息，哪一份结构证据会消失？
      </text>
    </g>
  );
}

function StrategyView({
  activeStep,
  fault,
  sample,
}: {
  activeStep: number;
  fault: Fault;
  sample: Sample;
}) {
  const selected = SAMPLES.find((item) => item.id === sample) ?? SAMPLES[0];
  const message =
    fault === "lookahead"
      ? "前看过长：先拆共同前缀，再决定是否增加观察范围"
      : fault === "recovery"
        ? "恢复过度：截断输入应尽早报告，而不是吞掉后续 token"
        : `${selected.label}：比较策略的树形、选择轨迹和诊断成本`;
  return (
    <g>
      <text x="28" y="31" fontSize="16" fontWeight="700" fill={COLORS.primary}>
        方法选择：策略改变，证据不变
      </text>
      <text x="28" y="58" fontSize="13" fill={COLORS.secondary}>
        同一输入分别经过三种方法，比较控制位置、规则可读性和错误边界。
      </text>
      {STRATEGIES.map((strategy, index) => {
        const x = 28 + index * 234;
        const active = activeStep >= index;
        return (
          <g key={strategy.label}>
            <rect
              x={x}
              y="104"
              width="208"
              height="134"
              rx="12"
              fill={strategy.color}
              fillOpacity={active ? 0.14 : 0.04}
              stroke={active ? strategy.color : COLORS.border}
              strokeWidth={active ? 2.5 : 1.5}
            />
            <text
              x={x + 20}
              y="138"
              fontSize="15"
              fontWeight="700"
              fill={COLORS.primary}
            >
              {strategy.label}
            </text>
            <text x={x + 20} y="176" fontSize="13" fill={COLORS.secondary}>
              {strategy.detail}
            </text>
            <text x={x + 20} y="212" fontSize="13" fill={COLORS.secondary}>
              {index === 0
                ? "手动处理分支"
                : index === 1
                  ? "统一规则表"
                  : "规则交给工具"}
            </text>
          </g>
        );
      })}
      <rect
        x="28"
        y="270"
        width="704"
        height="74"
        rx="12"
        fill={COLORS.elevated}
        stroke={fault === "none" ? COLORS.success : COLORS.warning}
        strokeWidth="2"
      />
      <text
        x="52"
        y="304"
        fontSize="14"
        fontWeight="700"
        fill={fault === "none" ? COLORS.success : COLORS.warning}
      >
        当前判断：{message}
      </text>
      <text x="52" y="330" fontSize="13" fill={COLORS.secondary}>
        选择策略时保留同一组
        token、树形断言和错误位置，避免把工具差异误当成语言差异。
      </text>
      <text x="28" y="392" fontSize="13" fill={COLORS.accent}>
        动手试：打开“前看过长”，指出应该先重写规则还是继续看 token。
      </text>
    </g>
  );
}

function GeneratorView({ fault, sample }: { fault: Fault; sample: Sample }) {
  const selected = SAMPLES.find((item) => item.id === sample) ?? SAMPLES[0];
  const status =
    fault === "lookahead"
      ? "配置可生成，但分支选择需要回看共同前缀"
      : fault === "recovery"
        ? "生成成功，运行时诊断仍需用截断输入验收"
        : "生成、运行和回放证据彼此对应";
  return (
    <g>
      <text x="28" y="31" fontSize="16" fontWeight="700" fill={COLORS.primary}>
        生成器回放：配置成功不等于解析正确
      </text>
      <text x="28" y="58" fontSize="13" fill={COLORS.secondary}>
        JavaCC 配置、生成命令和运行样例共同构成验收证据。
      </text>
      <rect
        x="28"
        y="100"
        width="328"
        height="214"
        rx="12"
        fill={COLORS.elevated}
        stroke={COLORS.border}
        strokeWidth="2"
      />
      <text x="52" y="134" fontSize="15" fontWeight="700" fill={COLORS.primary}>
        生成输入
      </text>
      <text x="52" y="174" fontSize="13" fill={COLORS.secondary}>
        token 声明 + 产生式
      </text>
      <text x="52" y="206" fontSize="13" fill={COLORS.secondary}>
        JavaCC 版本 + JDK 坐标
      </text>
      <text x="52" y="238" fontSize="13" fill={COLORS.secondary}>
        样本：{selected.label}
      </text>
      <text x="52" y="278" fontSize="13" fill={COLORS.accent}>
        产物：generated parser + trace
      </text>
      <rect
        x="382"
        y="100"
        width="350"
        height="214"
        rx="12"
        fill={COLORS.elevated}
        stroke={fault === "none" ? COLORS.success : COLORS.warning}
        strokeWidth="2"
      />
      <text
        x="406"
        y="134"
        fontSize="15"
        fontWeight="700"
        fill={COLORS.primary}
      >
        当前验收
      </text>
      <text
        x="406"
        y="180"
        fontSize="13"
        fill={fault === "none" ? COLORS.success : COLORS.warning}
      >
        {status}
      </text>
      <text x="406" y="232" fontSize="13" fill={COLORS.secondary}>
        清理生成目录后，使用相同规则和命令重放。
      </text>
      <text x="406" y="274" fontSize="13" fill={COLORS.secondary}>
        比较树、错误位置、trace 和退出码。
      </text>
      <text x="28" y="392" fontSize="13" fill={COLORS.accent}>
        先猜一猜：生成器通过后，为什么仍要运行截断和歧义输入？
      </text>
    </g>
  );
}

/** 第3章专属实验：把解析方法、生成器配置与错误边界放进同一条回放链。 */
export function CrcParsingOverviewLab() {
  const [view, setView] = useState<View>("outline");
  const [sample, setSample] = useState<Sample>("valid");
  const [fault, setFault] = useState<Fault>("none");
  const nodeRefs = useRef<Record<string, SVGGElement | null>>({});
  const current = useMemo(
    () => VIEWS.find((item) => item.id === view) ?? VIEWS[0],
    [view],
  );
  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      STEPS.forEach((step, index) => {
        const node = nodeRefs.current[step.label];
        if (!node) return;
        tl.add(
          node,
          {
            opacity: [0.36, 1],
            scale: [0.94, 1],
            duration: T * 0.65,
            ease: "out(3)",
          },
          T * index,
        );
        tl.label(step.label, T * index);
      });
    },
  });

  function reset() {
    setView("outline");
    setSample("valid");
    setFault("none");
    timeline.goToStep(0);
  }

  return (
    <section
      aria-label="第3章语法分析的概要专属代码分析路线、方法选择与生成器回放实验；第1部分 代码分析；3.1 语法分析的方法；3.2 解析器生成器；3.3 JavaCC的概要"
      className="not-prose my-8 min-w-0 overflow-hidden rounded-card border border-border bg-elevated"
      data-unit-id="crc-unit-03"
      data-visual-kind="crc-parsing-overview-replay"
    >
      <header className="flex flex-wrap items-start justify-between gap-4 border-b border-border px-5 py-4 sm:px-6">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold tracking-wide text-accent">
            专属 CrcParsingOverviewLab · 规则、前看与生成器
          </p>
          <h3 className="mt-1 text-base font-semibold text-primary">
            让解析器的每次选择都留下结构证据
          </h3>
          <p className="mt-1 max-w-3xl text-sm leading-6 text-secondary">
            先预测：只改变一个 token 或规则条件后，树和错误位置会先在哪里变化？
          </p>
        </div>
      </header>
      <div className="min-w-0 space-y-4 p-5 sm:p-6">
        <div className="flex flex-wrap gap-2" aria-label="选择语法分析实验视角">
          {VIEWS.map((item) => (
            <ViewButton
              key={item.id}
              active={view === item.id}
              onClick={() => setView(item.id)}
            >
              {item.label}
            </ViewButton>
          ))}
        </div>
        <div className="flex flex-wrap gap-2" aria-label="选择语法分析样本">
          {SAMPLES.map((item) => (
            <ViewButton
              key={item.id}
              active={sample === item.id}
              onClick={() => setSample(item.id)}
            >
              {item.label}
            </ViewButton>
          ))}
        </div>
        <div className="flex flex-wrap gap-2" aria-label="选择语法分析故障模式">
          <ViewButton
            active={fault === "none"}
            onClick={() => setFault("none")}
          >
            正常规则
          </ViewButton>
          <ViewButton
            active={fault === "lookahead"}
            onClick={() => setFault("lookahead")}
          >
            前看过长
          </ViewButton>
          <ViewButton
            active={fault === "recovery"}
            onClick={() => setFault("recovery")}
          >
            恢复过度
          </ViewButton>
        </div>
        <div className="min-w-0 rounded-card border border-border bg-background p-3 sm:p-4">
          <svg
            viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
            role="img"
            aria-label={`${current.label}可视化：${current.detail}`}
            className="h-auto w-full"
          >
            <defs>
              <marker
                id="crc-parsing-overview-arrow"
                markerWidth="10"
                markerHeight="10"
                refX="8"
                refY="5"
                orient="auto"
              >
                <path d="M0,0 L10,5 L0,10 z" fill={COLORS.accent} />
              </marker>
            </defs>
            <rect
              x="0"
              y="0"
              width={VIEW_W}
              height={VIEW_H}
              rx="12"
              fill="var(--bg)"
            />
            <g aria-hidden="true" opacity="0" pointerEvents="none">
              <Stage
                active
                label="tokens"
                refCallback={(element) => {
                  nodeRefs.current.tokens = element;
                }}
                status="词类与位置"
                x={28}
                y={104}
              />
              <Stage
                active
                label="规则"
                refCallback={(element) => {
                  nodeRefs.current.grammar = element;
                }}
                status="产生式"
                x={174}
                y={104}
              />
              <Stage
                active
                label="前看"
                refCallback={(element) => {
                  nodeRefs.current.lookahead = element;
                }}
                status="分支选择"
                x={320}
                y={104}
              />
              <Stage
                active
                label="树"
                refCallback={(element) => {
                  nodeRefs.current.tree = element;
                }}
                status="结构摘要"
                x={466}
                y={104}
              />
              <Stage
                active
                label="诊断"
                refCallback={(element) => {
                  nodeRefs.current.diagnostic = element;
                }}
                status="错误位置"
                x={612}
                y={104}
              />
            </g>
            {view === "outline" ? (
              <OutlineView activeStep={timeline.currentStep} sample={sample} />
            ) : view === "strategy" ? (
              <StrategyView
                activeStep={timeline.currentStep}
                fault={fault}
                sample={sample}
              />
            ) : (
              <GeneratorView fault={fault} sample={sample} />
            )}
          </svg>
        </div>
        <div
          className="rounded-card border border-border bg-background p-4"
          role="status"
          aria-live="polite"
        >
          <p className="text-sm font-semibold text-primary">{current.label}</p>
          <p className="mt-1 text-sm leading-6 text-secondary">
            {current.detail}
          </p>
        </div>
        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="单步查看 token、规则、前看、树和诊断；重置后用相同样本重放，确认解析证据没有被上一次状态污染。"
          reset={{
            label: "重置语法分析实验",
            ariaLabel: "重置语法分析概要专属实验",
            onClick: reset,
          }}
        />
      </div>
    </section>
  );
}
