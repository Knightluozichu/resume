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

type View = "layers" | "precedence" | "errors";
type Sample = "precedence" | "parentheses" | "declaration";
type Fault = "none" | "missing" | "flat";

const VIEWS: readonly { id: View; label: string; detail: string }[] = [
  {
    id: "layers",
    label: "语法层级",
    detail: "从总入口走到定义、语句、表达式和项，查看每层的边界与 AST 责任。",
  },
  {
    id: "precedence",
    label: "优先级树",
    detail: "比较表达式和项的嵌套，验证优先级、结合性与括号的作用。",
  },
  {
    id: "errors",
    label: "边界诊断",
    detail: "注入缺少括号或分号的输入，观察停止位置、期望 token 与树形交付。",
  },
] as const;

const SAMPLES: readonly {
  id: Sample;
  label: string;
  tokens: string;
  tree: string;
}[] = [
  {
    id: "precedence",
    label: "优先级",
    tokens: "a PLUS b STAR c EOF",
    tree: "add(a, multiply(b, c))",
  },
  {
    id: "parentheses",
    label: "括号",
    tokens: "LPAREN a PLUS b RPAREN STAR c",
    tree: "multiply(add(a, b), c)",
  },
  {
    id: "declaration",
    label: "定义",
    tokens: "TYPE IDENTIFIER ASSIGN NUMBER SEMICOLON",
    tree: "definition(count, 1)",
  },
] as const;

const STEPS: readonly TeachingStep[] = [
  {
    label: "tokens",
    caption: "固定 token 序列、源位置和 EOF，确定本次语法入口。",
  },
  {
    label: "definition",
    caption: "判断是否进入定义层，记录类型、名字和初始化边界。",
  },
  {
    label: "statement",
    caption: "确认语句动作与结束 token，不把控制边界交给表达式。",
  },
  {
    label: "expression",
    caption: "按低优先级规则组织值，保留结合性和括号范围。",
  },
  {
    label: "term",
    caption: "先完成更紧的项，再把结果交给表达式层组合。",
  },
] as const;

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

const CONCEPTS = [
  {
    label: "第6章 语法分析",
    detail: "入口与 AST 合同",
    color: COLORS.primary,
  },
  {
    label: "6.1 定义的分析",
    detail: "名字与初始化",
    color: COLORS.accent,
  },
  {
    label: "6.2 语句的分析",
    detail: "动作与结束",
    color: COLORS.warning,
  },
  {
    label: "6.3 表达式的分析",
    detail: "值与结合性",
    color: COLORS.success,
  },
  {
    label: "6.4 项的分析",
    detail: "紧绑定结构",
    color: COLORS.danger,
  },
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
  label,
  refCallback,
  status,
  x,
}: {
  label: string;
  refCallback?: (element: SVGGElement | null) => void;
  status: string;
  x: number;
}) {
  return (
    <g ref={refCallback}>
      <rect
        x={x}
        y="104"
        width="132"
        height="80"
        rx="12"
        fill={COLORS.elevated}
        stroke={COLORS.border}
        strokeWidth="2"
      />
      <text
        x={x + 16}
        y="132"
        fontSize="15"
        fontWeight="700"
        fill={COLORS.primary}
      >
        {label}
      </text>
      <text x={x + 16} y="162" fontSize="13" fill={COLORS.secondary}>
        {status}
      </text>
    </g>
  );
}

function LayersView({
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
        五个正式节点，共享一棵可回放的语法树
      </text>
      <text x="28" y="58" fontSize="13" fill={COLORS.secondary}>
        每层都标出输入、结束条件、产物与源跨度，避免结构责任漂移。
      </text>
      {CONCEPTS.map((concept, index) => {
        const row = index < 3 ? 0 : 1;
        const column = index < 3 ? index : index - 3;
        const x = row === 0 ? 28 + column * 236 : 150 + column * 236;
        const y = row === 0 ? 92 : 226;
        const active = activeStep >= Math.min(index, 4);
        return (
          <g key={concept.label}>
            <rect
              x={x}
              y={y}
              width="214"
              height="94"
              rx="12"
              fill={concept.color}
              fillOpacity={active ? 0.14 : 0.04}
              stroke={active ? concept.color : COLORS.border}
              strokeWidth={active ? 2.5 : 1.5}
            />
            <circle
              cx={x + 24}
              cy={y + 28}
              r="8"
              fill={active ? concept.color : COLORS.border}
            />
            <text
              x={x + 46}
              y={y + 32}
              fontSize="13"
              fontWeight="700"
              fill={COLORS.primary}
            >
              {concept.label}
            </text>
            <text x={x + 46} y={y + 61} fontSize="13" fill={COLORS.secondary}>
              {concept.detail}
            </text>
            <text x={x + 46} y={y + 82} fontSize="13" fill={COLORS.accent}>
              {active ? "已记录跨度" : "等待进入"}
            </text>
          </g>
        );
      })}
      <rect
        x="28"
        y="350"
        width="704"
        height="42"
        rx="12"
        fill={COLORS.elevated}
        stroke={COLORS.border}
        strokeWidth="2"
      />
      <text x="50" y="376" fontSize="13" fill={COLORS.accent}>
        当前样本：{selected.label} · {selected.tokens} → {selected.tree}
      </text>
    </g>
  );
}

function PrecedenceView({ fault, sample }: { fault: Fault; sample: Sample }) {
  const selected = SAMPLES.find((item) => item.id === sample) ?? SAMPLES[0];
  const tree =
    fault === "flat" ? "平面规则：add(a, b) 后才看到 STAR" : selected.tree;
  const firstLayer =
    fault === "flat" ? "expression 直接消费 PLUS" : "term 先消费 STAR";
  return (
    <g>
      <text x="28" y="31" fontSize="16" fontWeight="700" fill={COLORS.primary}>
        优先级树：项先完成更紧的运算
      </text>
      <text x="28" y="58" fontSize="13" fill={COLORS.secondary}>
        同一个 token 流可以形成不同树形；节点层级才是语法合同。
      </text>
      <rect
        x="28"
        y="94"
        width="704"
        height="52"
        rx="12"
        fill={COLORS.elevated}
        stroke={COLORS.border}
        strokeWidth="2"
      />
      <text x="52" y="127" fontSize="14" fontWeight="700" fill={COLORS.primary}>
        tokens：{selected.tokens}
      </text>
      <rect
        x="244"
        y="182"
        width="272"
        height="58"
        rx="12"
        fill={COLORS.accent}
        fillOpacity="0.14"
        stroke={COLORS.accent}
        strokeWidth="2"
      />
      <text
        x="380"
        y="217"
        textAnchor="middle"
        fontSize="15"
        fontWeight="700"
        fill={COLORS.primary}
      >
        {fault === "flat"
          ? "expression"
          : selected.id === "parentheses"
            ? "multiply"
            : "add"}
      </text>
      <line
        x1="380"
        y1="240"
        x2="260"
        y2="284"
        stroke={COLORS.accent}
        strokeWidth="3"
        markerEnd="url(#crc-syntax-analysis-arrow)"
      />
      <line
        x1="380"
        y1="240"
        x2="500"
        y2="284"
        stroke={COLORS.accent}
        strokeWidth="3"
        markerEnd="url(#crc-syntax-analysis-arrow)"
      />
      <rect
        x="124"
        y="284"
        width="272"
        height="58"
        rx="12"
        fill={COLORS.success}
        fillOpacity="0.14"
        stroke={COLORS.success}
        strokeWidth="2"
      />
      <text
        x="260"
        y="319"
        textAnchor="middle"
        fontSize="14"
        fontWeight="700"
        fill={COLORS.primary}
      >
        {firstLayer}
      </text>
      <rect
        x="364"
        y="284"
        width="272"
        height="58"
        rx="12"
        fill={fault === "flat" ? COLORS.warning : COLORS.elevated}
        fillOpacity={fault === "flat" ? 0.14 : 1}
        stroke={fault === "flat" ? COLORS.warning : COLORS.border}
        strokeWidth="2"
      />
      <text
        x="500"
        y="319"
        textAnchor="middle"
        fontSize="14"
        fontWeight="700"
        fill={COLORS.primary}
      >
        {tree}
      </text>
      <text x="28" y="382" fontSize="13" fill={COLORS.accent}>
        动手试：在无括号与有括号样本间切换，检查根节点和每个跨度。
      </text>
    </g>
  );
}

function ErrorView({ fault, sample }: { fault: Fault; sample: Sample }) {
  const selected = SAMPLES.find((item) => item.id === sample) ?? SAMPLES[0];
  const message =
    fault === "missing"
      ? "ParseException：期待 RPAREN 或 SEMICOLON"
      : fault === "flat"
        ? "树形已交付但优先级断言失败"
        : "合法输入：结构与跨度均通过";
  const status = fault === "none" ? COLORS.success : COLORS.warning;
  return (
    <g>
      <text x="28" y="31" fontSize="16" fontWeight="700" fill={COLORS.primary}>
        边界诊断：停止在有意义的 production 内
      </text>
      <text x="28" y="58" fontSize="13" fill={COLORS.secondary}>
        缺口应保留当前入口、实际 token、期望集合、源位置和是否交付 AST。
      </text>
      <rect
        x="28"
        y="96"
        width="330"
        height="218"
        rx="12"
        fill={COLORS.elevated}
        stroke={COLORS.border}
        strokeWidth="2"
      />
      <text x="52" y="132" fontSize="15" fontWeight="700" fill={COLORS.primary}>
        当前输入
      </text>
      <text x="52" y="172" fontSize="13" fill={COLORS.secondary}>
        样本：{selected.label}
      </text>
      <text x="52" y="204" fontSize="13" fill={COLORS.secondary}>
        游标：token 3 / 6
      </text>
      <text x="52" y="236" fontSize="13" fill={COLORS.secondary}>
        已消费跨度：[0, 11)
      </text>
      <text x="52" y="276" fontSize="13" fill={COLORS.accent}>
        当前 production：Statement
      </text>
      <rect
        x="382"
        y="96"
        width="350"
        height="218"
        rx="12"
        fill={COLORS.elevated}
        stroke={status}
        strokeWidth="2"
      />
      <text
        x="406"
        y="132"
        fontSize="15"
        fontWeight="700"
        fill={COLORS.primary}
      >
        验收结果
      </text>
      <text x="406" y="174" fontSize="13" fill={status}>
        {message}
      </text>
      <text x="406" y="216" fontSize="13" fill={COLORS.secondary}>
        {fault === "missing"
          ? "停止位置：当前 token"
          : "结果：保留结构和源跨度"}
      </text>
      <text x="406" y="250" fontSize="13" fill={COLORS.secondary}>
        {fault === "missing"
          ? "AST：不交付越过缺口的节点"
          : "退出码：0；清理后可重放"}
      </text>
      <text x="406" y="282" fontSize="13" fill={COLORS.secondary}>
        记录：期望 token、位置、消息摘要
      </text>
      <text x="28" y="382" fontSize="13" fill={COLORS.accent}>
        先猜一猜：提前报告缺少分号，为什么比文件末尾报错更容易修？
      </text>
    </g>
  );
}

/** 第6章专属实验：回放语法层级、优先级树与边界诊断。 */
export function CrcSyntaxAnalysisLab() {
  const [view, setView] = useState<View>("layers");
  const [sample, setSample] = useState<Sample>("precedence");
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
    setView("layers");
    setSample("precedence");
    setFault("none");
    timeline.goToStep(0);
  }

  return (
    <section
      aria-label="第6章语法分析专属语法层级、优先级树与边界诊断实验；第6章 语法分析；6.1 定义的分析；6.2 语句的分析；6.3 表达式的分析；6.4 项的分析"
      className="not-prose my-8 min-w-0 overflow-hidden rounded-card border border-border bg-elevated"
      data-unit-id="crc-unit-06"
      data-visual-kind="crc-syntax-analysis-tree-replay"
    >
      <header className="flex flex-wrap items-start justify-between gap-4 border-b border-border px-5 py-4 sm:px-6">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold tracking-wide text-accent">
            专属 CrcSyntaxAnalysisLab · 层级、优先级与诊断
          </p>
          <h3 className="mt-1 text-base font-semibold text-primary">
            让每层语法责任都留下 AST 与跨度证据
          </h3>
          <p className="mt-1 max-w-3xl text-sm leading-6 text-secondary">
            先预测：把项层移出表达式后，树形会先改变根节点还是错误位置？
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
            正常树形
          </ViewButton>
          <ViewButton
            active={fault === "missing"}
            onClick={() => setFault("missing")}
          >
            缺少边界
          </ViewButton>
          <ViewButton
            active={fault === "flat"}
            onClick={() => setFault("flat")}
          >
            项层丢失
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
                id="crc-syntax-analysis-arrow"
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
                label="token"
                refCallback={(element) => {
                  nodeRefs.current.tokens = element;
                }}
                status="输入与 EOF"
                x={28}
              />
              <Stage
                label="定义"
                refCallback={(element) => {
                  nodeRefs.current.definition = element;
                }}
                status="名字与初值"
                x={174}
              />
              <Stage
                label="语句"
                refCallback={(element) => {
                  nodeRefs.current.statement = element;
                }}
                status="动作与结束"
                x={320}
              />
              <Stage
                label="表达式"
                refCallback={(element) => {
                  nodeRefs.current.expression = element;
                }}
                status="值与结合"
                x={466}
              />
              <Stage
                label="项"
                refCallback={(element) => {
                  nodeRefs.current.term = element;
                }}
                status="紧绑定结构"
                x={612}
              />
            </g>
            {view === "layers" ? (
              <LayersView activeStep={timeline.currentStep} sample={sample} />
            ) : view === "precedence" ? (
              <PrecedenceView fault={fault} sample={sample} />
            ) : (
              <ErrorView fault={fault} sample={sample} />
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
          caption="单步查看 token、定义、语句、表达式和项；重置后用相同样本重放，确认优先级与诊断没有被旧状态污染。"
          reset={{
            label: "重置语法分析实验",
            ariaLabel: "重置语法分析专属实验",
            onClick: reset,
          }}
        />
      </div>
    </section>
  );
}
