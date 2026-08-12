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

type View = "pipeline" | "purity" | "node";
type Sample = "literal" | "binary" | "call";
type Fault = "none" | "leak" | "span";

const VIEWS: readonly { id: View; label: string; detail: string }[] = [
  {
    id: "pipeline",
    label: "数据流",
    detail:
      "把第2部分、action 与 AST 节点放入 matched symbols 到回放的证据链。",
  },
  {
    id: "purity",
    label: "Action边界",
    detail:
      "比较局部节点构造与跨解析状态泄漏，观察失败路径是否污染下一次解析。",
  },
  {
    id: "node",
    label: "节点结构",
    detail: "检查节点类型、子节点、值、不可变性与源码跨度。",
  },
] as const;

const SAMPLES: readonly {
  id: Sample;
  label: string;
  symbols: string;
  node: string;
}[] = [
  {
    id: "literal",
    label: "字面值",
    symbols: "NUMBER(1) EOF",
    node: "Number(value=1, span=[0, 1))",
  },
  {
    id: "binary",
    label: "二元运算",
    symbols: "NUMBER PLUS NUMBER EOF",
    node: "Add(left=1, right=2, span=[0, 5))",
  },
  {
    id: "call",
    label: "调用",
    symbols: "IDENTIFIER LPAREN NUMBER RPAREN EOF",
    node: "Call(name, argument, span=[0, 8))",
  },
] as const;

const STEPS: readonly TeachingStep[] = [
  {
    label: "symbols",
    caption: "保存已匹配的 token、局部值和当前 source span。",
  },
  {
    label: "action",
    caption: "执行 action，只读取当前 production 的局部输入。",
  },
  {
    label: "node",
    caption: "创建类型、子节点和值明确的 AST 节点。",
  },
  {
    label: "span",
    caption: "合并子节点和 token 的半开源码跨度。",
  },
  {
    label: "replay",
    caption: "清理后重放，比较节点、状态快照和退出码。",
  },
] as const;

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

const CONCEPTS = [
  {
    label: "第2部分 抽象语法树和中间代码",
    detail: "结构交接",
    color: COLORS.primary,
  },
  {
    label: "第7章 JavaCC的action和抽象语法树",
    detail: "匹配到节点",
    color: COLORS.accent,
  },
  {
    label: "7.1 JavaCC的action",
    detail: "局部执行",
    color: COLORS.warning,
  },
  {
    label: "7.2 抽象语法树和节点",
    detail: "不可变与跨度",
    color: COLORS.success,
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

function PipelineView({
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
        四个正式节点，共享一条 AST 交接链
      </text>
      <text x="28" y="58" fontSize="13" fill={COLORS.secondary}>
        action 只处理当前已匹配事实，节点再交给语义与 IR 阶段。
      </text>
      {CONCEPTS.map((concept, index) => {
        const column = index % 2;
        const row = Math.floor(index / 2);
        const x = 28 + column * 354;
        const y = 92 + row * 112;
        const active = activeStep >= Math.min(index, 4);
        return (
          <g key={concept.label}>
            <rect
              x={x}
              y={y}
              width="326"
              height="86"
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
              {concept.detail} · {active ? "已记录" : "等待"}
            </text>
          </g>
        );
      })}
      <rect
        x="28"
        y="326"
        width="704"
        height="50"
        rx="12"
        fill={COLORS.elevated}
        stroke={COLORS.border}
        strokeWidth="2"
      />
      <text x="50" y="357" fontSize="13" fill={COLORS.accent}>
        当前样本：{selected.label} · {selected.symbols} → {selected.node}
      </text>
    </g>
  );
}

function PurityView({ fault, sample }: { fault: Fault; sample: Sample }) {
  const selected = SAMPLES.find((item) => item.id === sample) ?? SAMPLES[0];
  const actionText =
    fault === "leak"
      ? "GLOBAL_COUNT++ ; cache.push(node)"
      : "const node = makeNode(localValues)";
  const message =
    fault === "leak"
      ? "副作用泄漏：下一次解析读到了上一次残留"
      : "局部 action：失败时丢弃上下文，成功时交付一次节点";
  return (
    <g>
      <text x="28" y="31" fontSize="16" fontWeight="700" fill={COLORS.primary}>
        Action 边界：局部构造，不发布隐藏状态
      </text>
      <text x="28" y="58" fontSize="13" fill={COLORS.secondary}>
        同一输入连续回放两次，应该得到等价节点和相同状态快照。
      </text>
      <rect
        x="28"
        y="98"
        width="324"
        height="196"
        rx="12"
        fill={COLORS.elevated}
        stroke={COLORS.border}
        strokeWidth="2"
      />
      <text x="52" y="132" fontSize="15" fontWeight="700" fill={COLORS.primary}>
        matched symbols
      </text>
      <text x="52" y="172" fontSize="13" fill={COLORS.secondary}>
        {selected.symbols}
      </text>
      <text x="52" y="212" fontSize="13" fill={COLORS.secondary}>
        局部值：{selected.label}
      </text>
      <text x="52" y="254" fontSize="13" fill={COLORS.accent}>
        action 输入已冻结
      </text>
      <rect
        x="382"
        y="98"
        width="350"
        height="196"
        rx="12"
        fill={COLORS.elevated}
        stroke={fault === "none" ? COLORS.success : COLORS.warning}
        strokeWidth="2"
      />
      <text
        x="406"
        y="132"
        fontSize="15"
        fontWeight="700"
        fill={COLORS.primary}
      >
        action 执行
      </text>
      <text x="406" y="172" fontSize="13" fill={COLORS.secondary}>
        {actionText}
      </text>
      <text
        x="406"
        y="216"
        fontSize="13"
        fill={fault === "none" ? COLORS.success : COLORS.warning}
      >
        {message}
      </text>
      <text x="406" y="256" fontSize="13" fill={COLORS.secondary}>
        状态快照：{fault === "none" ? "clean" : "残留"}
      </text>
      <text x="28" y="372" fontSize="13" fill={COLORS.accent}>
        动手试：注入 action 泄漏，再点击重置并比较第二次回放。
      </text>
    </g>
  );
}

function NodeView({ fault, sample }: { fault: Fault; sample: Sample }) {
  const selected = SAMPLES.find((item) => item.id === sample) ?? SAMPLES[0];
  const span =
    fault === "span"
      ? "[0, 6) 错位"
      : selected.id === "call"
        ? "[0, 8)"
        : "[0, 5)";
  const immutable =
    fault === "span" ? "span 与子节点不一致" : "字段冻结，可安全共享";
  return (
    <g>
      <text x="28" y="31" fontSize="16" fontWeight="700" fill={COLORS.primary}>
        AST 节点：结构、值和源码跨度同时存在
      </text>
      <text x="28" y="58" fontSize="13" fill={COLORS.secondary}>
        节点不是调试文本；字段合同决定后续阶段能否安全消费。
      </text>
      <rect
        x="28"
        y="98"
        width="330"
        height="208"
        rx="12"
        fill={COLORS.elevated}
        stroke={COLORS.border}
        strokeWidth="2"
      />
      <text x="52" y="132" fontSize="15" fontWeight="700" fill={COLORS.primary}>
        节点字段
      </text>
      <text x="52" y="170" fontSize="13" fill={COLORS.secondary}>
        kind：{selected.id === "binary" ? "Add" : selected.label}
      </text>
      <text x="52" y="202" fontSize="13" fill={COLORS.secondary}>
        children：left / right
      </text>
      <text x="52" y="234" fontSize="13" fill={COLORS.secondary}>
        value：局部语义值
      </text>
      <text
        x="52"
        y="274"
        fontSize="13"
        fill={fault === "span" ? COLORS.warning : COLORS.accent}
      >
        span：{span}
      </text>
      <rect
        x="382"
        y="98"
        width="350"
        height="208"
        rx="12"
        fill={COLORS.elevated}
        stroke={fault === "span" ? COLORS.warning : COLORS.success}
        strokeWidth="2"
      />
      <text
        x="406"
        y="132"
        fontSize="15"
        fontWeight="700"
        fill={COLORS.primary}
      >
        节点验收
      </text>
      <text x="406" y="172" fontSize="13" fill={COLORS.secondary}>
        {selected.node}
      </text>
      <text
        x="406"
        y="214"
        fontSize="13"
        fill={fault === "span" ? COLORS.warning : COLORS.success}
      >
        {immutable}
      </text>
      <text x="406" y="254" fontSize="13" fill={COLORS.secondary}>
        replay：结构、跨度、退出码可比较
      </text>
      <text x="28" y="372" fontSize="13" fill={COLORS.accent}>
        先猜一猜：节点跨度错位时，诊断高亮会先偏离哪一段源码？
      </text>
    </g>
  );
}

/** 第7章专属实验：回放 JavaCC action、不可变 AST 节点与源码跨度。 */
export function CrcJavaccActionsAstLab() {
  const [view, setView] = useState<View>("pipeline");
  const [sample, setSample] = useState<Sample>("literal");
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
    setView("pipeline");
    setSample("literal");
    setFault("none");
    timeline.goToStep(0);
  }

  return (
    <section
      aria-label="第7章 JavaCC的action和抽象语法树专属 action、AST 节点与源码跨度回放实验；第2部分 抽象语法树和中间代码；第7章 JavaCC的action和抽象语法树；7.1 JavaCC的action；7.2 抽象语法树和节点"
      className="not-prose my-8 min-w-0 overflow-hidden rounded-card border border-border bg-elevated"
      data-unit-id="crc-unit-07"
      data-visual-kind="crc-javacc-actions-ast-replay"
    >
      <header className="flex flex-wrap items-start justify-between gap-4 border-b border-border px-5 py-4 sm:px-6">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold tracking-wide text-accent">
            专属 CrcJavaccActionsAstLab · action、节点与跨度
          </p>
          <h3 className="mt-1 text-base font-semibold text-primary">
            让每次 action 都留下稳定的 AST 交接证据
          </h3>
          <p className="mt-1 max-w-3xl text-sm leading-6 text-secondary">
            先预测：action
            发生状态泄漏时，下一次回放会先改变节点值还是源码跨度？
          </p>
        </div>
      </header>
      <div className="min-w-0 space-y-4 p-5 sm:p-6">
        <div
          className="flex flex-wrap gap-2"
          aria-label="选择 action AST 实验视角"
        >
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
        <div className="flex flex-wrap gap-2" aria-label="选择 action AST 样本">
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
        <div
          className="flex flex-wrap gap-2"
          aria-label="选择 action AST 故障模式"
        >
          <ViewButton
            active={fault === "none"}
            onClick={() => setFault("none")}
          >
            正常构造
          </ViewButton>
          <ViewButton
            active={fault === "leak"}
            onClick={() => setFault("leak")}
          >
            状态泄漏
          </ViewButton>
          <ViewButton
            active={fault === "span"}
            onClick={() => setFault("span")}
          >
            跨度错位
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
                id="crc-javacc-actions-ast-arrow"
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
                label="symbols"
                refCallback={(element) => {
                  nodeRefs.current.symbols = element;
                }}
                status="已匹配 token"
                x={28}
              />
              <Stage
                label="action"
                refCallback={(element) => {
                  nodeRefs.current.action = element;
                }}
                status="局部执行"
                x={174}
              />
              <Stage
                label="AST node"
                refCallback={(element) => {
                  nodeRefs.current.node = element;
                }}
                status="类型与子树"
                x={320}
              />
              <Stage
                label="span"
                refCallback={(element) => {
                  nodeRefs.current.span = element;
                }}
                status="半开区间"
                x={466}
              />
              <Stage
                label="replay"
                refCallback={(element) => {
                  nodeRefs.current.replay = element;
                }}
                status="状态快照"
                x={612}
              />
            </g>
            {view === "pipeline" ? (
              <PipelineView activeStep={timeline.currentStep} sample={sample} />
            ) : view === "purity" ? (
              <PurityView fault={fault} sample={sample} />
            ) : (
              <NodeView fault={fault} sample={sample} />
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
          caption="单步查看 symbols、action、AST node、span 和 replay；重置后用相同样本重放，确认节点与状态没有被旧 action 污染。"
          reset={{
            label: "重置 action AST 实验",
            ariaLabel: "重置 JavaCC action AST 专属实验",
            onClick: reset,
          }}
        />
      </div>
    </section>
  );
}
