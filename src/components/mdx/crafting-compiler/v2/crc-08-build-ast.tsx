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

type View = "catalog" | "diff" | "startup";
type Sample = "expression" | "statement" | "declaration";
type Fault = "none" | "stale" | "span";

const VIEWS: readonly { id: View; label: string; detail: string }[] = [
  {
    id: "catalog",
    label: "目录节点",
    detail: "把五个正式节点放入 token、节点工厂、结构快照和 cbc 入口证据链。",
  },
  {
    id: "diff",
    label: "结构差分",
    detail: "比较表达式、语句、声明三类 AST 的根节点、字段、子节点与跨度。",
  },
  {
    id: "startup",
    label: "cbc 回放",
    detail: "观察生成、编译、运行和清理重建如何影响 AST 快照与退出码。",
  },
] as const;

const SAMPLES: readonly {
  id: Sample;
  label: string;
  tokens: string;
  root: string;
  span: string;
}[] = [
  {
    id: "expression",
    label: "表达式",
    tokens: "IDENTIFIER PLUS NUMBER EOF",
    root: "Add(name, number)",
    span: "[0, 9)",
  },
  {
    id: "statement",
    label: "语句",
    tokens: "RETURN IDENTIFIER SEMICOLON EOF",
    root: "Return(name)",
    span: "[0, 13)",
  },
  {
    id: "declaration",
    label: "声明",
    tokens: "TYPE IDENTIFIER ASSIGN NUMBER SEMICOLON",
    root: "Declaration(count, number)",
    span: "[0, 16)",
  },
] as const;

const STEPS: readonly TeachingStep[] = [
  {
    label: "tokens",
    caption: "固定输入 token、源位置和样本编号。",
  },
  {
    label: "factory",
    caption: "节点工厂选择 kind、字段和构造函数。",
  },
  {
    label: "family",
    caption: "确定表达式、语句或声明的节点族与子节点顺序。",
  },
  {
    label: "snapshot",
    caption: "序列化根节点、字段、跨度和结构差分。",
  },
  {
    label: "startup",
    caption: "通过 cbc 入口清理、重建并比较退出码。",
  },
] as const;

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

const CONCEPTS = [
  {
    label: "第8章 抽象语法树的生成",
    detail: "节点合同",
    color: COLORS.primary,
  },
  {
    label: "8.1 表达式的抽象语法树",
    detail: "值与运算",
    color: COLORS.accent,
  },
  {
    label: "8.2 语句的抽象语法树",
    detail: "动作与边界",
    color: COLORS.warning,
  },
  {
    label: "8.3 声明的抽象语法树",
    detail: "类型与名字",
    color: COLORS.success,
  },
  {
    label: "8.4 cbc的解析器的启动",
    detail: "入口与重建",
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

function CatalogView({
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
        五个正式节点，共享一份 AST 生成回放
      </text>
      <text x="28" y="58" fontSize="13" fill={COLORS.secondary}>
        节点工厂固定结构，cbc 入口固定构建条件，快照负责验证结果。
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
              {concept.detail} · {active ? "已记录" : "等待"}
            </text>
            <text x={x + 46} y={y + 82} fontSize="13" fill={COLORS.accent}>
              {active ? "可进入差分" : "尚未进入"}
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
        当前样本：{selected.label} · {selected.tokens} → {selected.root} ·{" "}
        {selected.span}
      </text>
    </g>
  );
}

function DiffView({ fault, sample }: { fault: Fault; sample: Sample }) {
  const selected = SAMPLES.find((item) => item.id === sample) ?? SAMPLES[0];
  const node =
    fault === "span" ? `${selected.root} · span 错位` : selected.root;
  const verdict =
    fault === "span"
      ? "结构相同但位置不可信：先检查 token 合并"
      : `${selected.label} 节点族通过字段级结构差分`;
  return (
    <g>
      <text x="28" y="31" fontSize="16" fontWeight="700" fill={COLORS.primary}>
        结构差分：根节点、字段、子节点与跨度一起比较
      </text>
      <text x="28" y="58" fontSize="13" fill={COLORS.secondary}>
        打印文本相似不等于结构等价；差分表要保留语法责任。
      </text>
      <rect
        x="28"
        y="96"
        width="704"
        height="54"
        rx="12"
        fill={COLORS.elevated}
        stroke={COLORS.border}
        strokeWidth="2"
      />
      <text x="52" y="130" fontSize="14" fontWeight="700" fill={COLORS.primary}>
        输入：{selected.tokens}
      </text>
      <rect
        x="28"
        y="182"
        width="326"
        height="152"
        rx="12"
        fill={COLORS.accent}
        fillOpacity="0.12"
        stroke={COLORS.accent}
        strokeWidth="2"
      />
      <text x="52" y="218" fontSize="15" fontWeight="700" fill={COLORS.primary}>
        期望快照
      </text>
      <text x="52" y="256" fontSize="13" fill={COLORS.secondary}>
        kind：{selected.label}
      </text>
      <text x="52" y="286" fontSize="13" fill={COLORS.secondary}>
        children：顺序稳定
      </text>
      <text x="52" y="316" fontSize="13" fill={COLORS.secondary}>
        span：{selected.span}
      </text>
      <rect
        x="378"
        y="182"
        width="354"
        height="152"
        rx="12"
        fill={fault === "span" ? COLORS.warning : COLORS.success}
        fillOpacity="0.12"
        stroke={fault === "span" ? COLORS.warning : COLORS.success}
        strokeWidth="2"
      />
      <text
        x="402"
        y="218"
        fontSize="15"
        fontWeight="700"
        fill={COLORS.primary}
      >
        实际快照
      </text>
      <text x="402" y="256" fontSize="13" fill={COLORS.secondary}>
        {node}
      </text>
      <text
        x="402"
        y="286"
        fontSize="13"
        fill={fault === "span" ? COLORS.warning : COLORS.success}
      >
        {verdict}
      </text>
      <text x="28" y="382" fontSize="13" fill={COLORS.accent}>
        动手试：在三类节点间切换，确认差分不会把字段压成一行文本。
      </text>
    </g>
  );
}

function StartupView({ fault, sample }: { fault: Fault; sample: Sample }) {
  const selected = SAMPLES.find((item) => item.id === sample) ?? SAMPLES[0];
  const state =
    fault === "stale"
      ? "旧生成目录仍被读取：快照版本不匹配"
      : "clean → generate → compile → run → snapshot";
  const result =
    fault === "stale" ? "exit=1；AST 未可信" : `${selected.root}；exit=0`;
  return (
    <g>
      <text x="28" y="31" fontSize="16" fontWeight="700" fill={COLORS.primary}>
        cbc 回放：入口条件和 AST 结果要绑定
      </text>
      <text x="28" y="58" fontSize="13" fill={COLORS.secondary}>
        清理生成目录是控制变量，不是失败后的可选装饰。
      </text>
      {[
        ["clean", "删除旧生成物", 28],
        ["generate", "生成 parser", 202],
        ["compile", "编译入口", 376],
        ["run", "输出 AST", 550],
      ].map(([label, detail, x]) => (
        <g key={label as string}>
          <rect
            x={x as number}
            y="112"
            width="156"
            height="88"
            rx="12"
            fill={COLORS.elevated}
            stroke={COLORS.border}
            strokeWidth="2"
          />
          <text
            x={(x as number) + 78}
            y="148"
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill={COLORS.primary}
          >
            {label as string}
          </text>
          <text
            x={(x as number) + 78}
            y="178"
            textAnchor="middle"
            fontSize="13"
            fill={COLORS.secondary}
          >
            {detail as string}
          </text>
          {label !== "run" && (
            <line
              x1={(x as number) + 156}
              y1="156"
              x2={(x as number) + 168}
              y2="156"
              stroke={COLORS.accent}
              strokeWidth="3"
              markerEnd="url(#crc-build-ast-arrow)"
            />
          )}
        </g>
      ))}
      <rect
        x="28"
        y="246"
        width="704"
        height="70"
        rx="12"
        fill={fault === "stale" ? COLORS.warning : COLORS.success}
        fillOpacity="0.12"
        stroke={fault === "stale" ? COLORS.warning : COLORS.success}
        strokeWidth="2"
      />
      <text x="52" y="278" fontSize="14" fontWeight="700" fill={COLORS.primary}>
        {state}
      </text>
      <text
        x="52"
        y="302"
        fontSize="13"
        fill={fault === "stale" ? COLORS.warning : COLORS.secondary}
      >
        结果：{result}
      </text>
      <text x="28" y="376" fontSize="13" fill={COLORS.accent}>
        先猜一猜：清理前后根节点不同，先检查入口参数还是节点工厂？
      </text>
    </g>
  );
}

/** 第8章专属实验：回放 AST 节点族、结构差分与 cbc 解析器启动。 */
export function CrcBuildAstLab() {
  const [view, setView] = useState<View>("catalog");
  const [sample, setSample] = useState<Sample>("expression");
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
    setView("catalog");
    setSample("expression");
    setFault("none");
    timeline.goToStep(0);
  }

  return (
    <section
      aria-label="第8章抽象语法树的生成专属节点工厂、结构差分与 cbc 回放实验；第8章 抽象语法树的生成；8.1 表达式的抽象语法树；8.2 语句的抽象语法树；8.3 声明的抽象语法树；8.4 cbc的解析器的启动"
      className="not-prose my-8 min-w-0 overflow-hidden rounded-card border border-border bg-elevated"
      data-unit-id="crc-unit-08"
      data-visual-kind="crc-build-ast-structure-replay"
    >
      <header className="flex flex-wrap items-start justify-between gap-4 border-b border-border px-5 py-4 sm:px-6">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold tracking-wide text-accent">
            专属 CrcBuildAstLab · 节点族、差分与 cbc
          </p>
          <h3 className="mt-1 text-base font-semibold text-primary">
            让 AST 生成的每一步都可以清理后重放
          </h3>
          <p className="mt-1 max-w-3xl text-sm leading-6 text-secondary">
            先预测：旧生成目录残留时，结构快照会先改变根节点还是命令状态？
          </p>
        </div>
      </header>
      <div className="min-w-0 space-y-4 p-5 sm:p-6">
        <div
          className="flex flex-wrap gap-2"
          aria-label="选择 AST 生成实验视角"
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
        <div className="flex flex-wrap gap-2" aria-label="选择 AST 生成样本">
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
          aria-label="选择 AST 生成故障模式"
        >
          <ViewButton
            active={fault === "none"}
            onClick={() => setFault("none")}
          >
            正常构建
          </ViewButton>
          <ViewButton
            active={fault === "stale"}
            onClick={() => setFault("stale")}
          >
            旧构建残留
          </ViewButton>
          <ViewButton
            active={fault === "span"}
            onClick={() => setFault("span")}
          >
            跨度差异
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
                id="crc-build-ast-arrow"
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
                label="tokens"
                refCallback={(element) => {
                  nodeRefs.current.tokens = element;
                }}
                status="输入与位置"
                x={28}
              />
              <Stage
                label="factory"
                refCallback={(element) => {
                  nodeRefs.current.factory = element;
                }}
                status="kind 与字段"
                x={174}
              />
              <Stage
                label="family"
                refCallback={(element) => {
                  nodeRefs.current.family = element;
                }}
                status="三类节点"
                x={320}
              />
              <Stage
                label="snapshot"
                refCallback={(element) => {
                  nodeRefs.current.snapshot = element;
                }}
                status="结构与跨度"
                x={466}
              />
              <Stage
                label="startup"
                refCallback={(element) => {
                  nodeRefs.current.startup = element;
                }}
                status="清理与退出码"
                x={612}
              />
            </g>
            {view === "catalog" ? (
              <CatalogView activeStep={timeline.currentStep} sample={sample} />
            ) : view === "diff" ? (
              <DiffView fault={fault} sample={sample} />
            ) : (
              <StartupView fault={fault} sample={sample} />
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
          caption="单步查看 tokens、factory、family、snapshot 和 startup；重置后用相同样本重放，确认 AST 与构建状态没有被旧目录污染。"
          reset={{
            label: "重置 AST 生成实验",
            ariaLabel: "重置 AST 生成专属实验",
            onClick: reset,
          }}
        />
      </div>
    </section>
  );
}
