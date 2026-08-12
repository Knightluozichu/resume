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

type View = "outline" | "match" | "state";
type Sample = "identifier" | "operator" | "string";
type Fault = "none" | "longest" | "state";

const VIEWS: readonly { id: View; label: string; detail: string }[] = [
  {
    id: "outline",
    label: "词法节点",
    detail: "把五个正式节点放进字符、动作、token 和跨度证据链。",
  },
  {
    id: "match",
    label: "最长匹配",
    detail: "比较候选规则、选中 token 和剩余字符。",
  },
  {
    id: "state",
    label: "词法回放",
    detail: "观察 SKIP/MORE、词法状态和未闭合结构的诊断边界。",
  },
];

const SAMPLES: readonly {
  id: Sample;
  label: string;
  detail: string;
}[] = [
  {
    id: "identifier",
    label: "标识符",
    detail: "count / count2：检查字符消费和保留字边界。",
  },
  {
    id: "operator",
    label: "运算符",
    detail: "= / ==：检查共享前缀和最长匹配。",
  },
  {
    id: "string",
    label: "字符串",
    detail: "含转义文本：检查 MORE 与结束状态。",
  },
];

const STEPS: readonly TeachingStep[] = [
  {
    label: "characters",
    caption: "从字符流开始，保存输入文本和起始位置。",
  },
  {
    label: "match",
    caption: "列出候选规则，比较匹配长度和规则优先级。",
  },
  {
    label: "action",
    caption: "执行 TOKEN、SKIP 或 MORE，记录是否交付文本。",
  },
  {
    label: "token",
    caption: "生成 token 或继续累计，并保存文本、值和跨度。",
  },
  {
    label: "state",
    caption: "回到正确词法状态；结构未完成时在源位置报告错误。",
  },
] as const;

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

const OUTLINE_NODES = [
  { label: "第4章 词法分析", detail: "字符到 token", color: COLORS.primary },
  {
    label: "4.1 基于JavaCC的扫描器的描述",
    detail: "规则与动作",
    color: COLORS.accent,
  },
  {
    label: "4.2 扫描没有结构的单词",
    detail: "直接交付 token",
    color: COLORS.warning,
  },
  {
    label: "4.3 扫描不生成token的单词",
    detail: "SKIP / 隐藏",
    color: COLORS.warning,
  },
  {
    label: "4.4 扫描具有结构的单词",
    detail: "MORE / 状态",
    color: COLORS.success,
  },
] as const;

const MATCH_STAGES = [
  { label: "字符流", detail: "count == 10", color: COLORS.primary },
  { label: "候选", detail: "= / ==", color: COLORS.accent },
  { label: "动作", detail: "TOKEN / SKIP", color: COLORS.warning },
  { label: "跨度", detail: "[6, 8)", color: COLORS.success },
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
        词法节点：五站证据从字符流开始
      </text>
      <text x="28" y="58" fontSize="13" fill={COLORS.secondary}>
        每站都要说明消费的字符、执行的动作和留下的跨度。
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
        当前样本：{selected.label} · 记录文本、动作、token 和跨度
      </text>
      <text x="28" y="392" fontSize="13" fill={COLORS.accent}>
        先预测：如果 SKIP 没有跨度记录，下一枚 token 的错误列号会怎样？
      </text>
    </g>
  );
}

function MatchView({ fault, sample }: { fault: Fault; sample: Sample }) {
  const selected = SAMPLES.find((item) => item.id === sample) ?? SAMPLES[0];
  const message =
    fault === "longest"
      ? "短规则抢先：比较候选长度，不要只看声明顺序"
      : `${selected.label}：从候选规则走到最终 token`;
  return (
    <g>
      <text x="28" y="31" fontSize="16" fontWeight="700" fill={COLORS.primary}>
        最长匹配：共享前缀不能丢掉后续字符
      </text>
      <text x="28" y="58" fontSize="13" fill={COLORS.secondary}>
        选择规则时同时显示候选、长度、动作和剩余输入。
      </text>
      {MATCH_STAGES.map((stage, index) => {
        const x = 28 + index * 174;
        const active = index <= 3;
        return (
          <g key={stage.label}>
            <rect
              x={x}
              y="112"
              width="140"
              height="86"
              rx="12"
              fill={stage.color}
              fillOpacity={active ? 0.14 : 0.04}
              stroke={active ? stage.color : COLORS.border}
              strokeWidth={active ? 2.5 : 1.5}
            />
            <text
              x={x + 70}
              y="146"
              textAnchor="middle"
              fontSize="15"
              fontWeight="700"
              fill={active ? stage.color : COLORS.primary}
            >
              {stage.label}
            </text>
            <text
              x={x + 70}
              y="175"
              textAnchor="middle"
              fontSize="13"
              fill={COLORS.secondary}
            >
              {stage.detail}
            </text>
            {index < MATCH_STAGES.length - 1 && (
              <line
                x1={x + 140}
                y1="155"
                x2={x + 168}
                y2="155"
                stroke={COLORS.accent}
                strokeWidth="3"
                markerEnd="url(#crc-lexical-analysis-arrow)"
              />
            )}
          </g>
        );
      })}
      <rect
        x="28"
        y="250"
        width="704"
        height="74"
        rx="12"
        fill={COLORS.elevated}
        stroke={fault === "none" ? COLORS.success : COLORS.warning}
        strokeWidth="2"
      />
      <text
        x="52"
        y="284"
        fontSize="14"
        fontWeight="700"
        fill={fault === "none" ? COLORS.success : COLORS.warning}
      >
        当前判断：{message}
      </text>
      <text x="52" y="310" fontSize="13" fill={COLORS.secondary}>
        保存被选中的规则和剩余字符，才能解释为什么下一个 token 从这里开始。
      </text>
      <text x="28" y="378" fontSize="13" fill={COLORS.accent}>
        动手试：把“=”和“==”放在同一输入里，比较候选长度和最终跨度。
      </text>
    </g>
  );
}

function StateView({ fault, sample }: { fault: Fault; sample: Sample }) {
  const selected = SAMPLES.find((item) => item.id === sample) ?? SAMPLES[0];
  const state =
    fault === "state"
      ? "字符串状态未复位：后续普通代码被继续累计"
      : selected.id === "string"
        ? "STRING 状态：MORE 累计，结束引号交付 token"
        : "DEFAULT 状态：SKIP 后回到下一枚普通 token";
  return (
    <g>
      <text x="28" y="31" fontSize="16" fontWeight="700" fill={COLORS.primary}>
        词法回放：SKIP、MORE 与状态边界
      </text>
      <text x="28" y="58" fontSize="13" fill={COLORS.secondary}>
        结构化单词需要状态；不交给语法层的字符也要有可回放动作。
      </text>
      <rect
        x="28"
        y="102"
        width="328"
        height="210"
        rx="12"
        fill={COLORS.elevated}
        stroke={COLORS.border}
        strokeWidth="2"
      />
      <text x="52" y="136" fontSize="15" fontWeight="700" fill={COLORS.primary}>
        当前状态
      </text>
      <text x="52" y="178" fontSize="13" fill={COLORS.secondary}>
        DEFAULT → COMMENT / STRING
      </text>
      <text x="52" y="210" fontSize="13" fill={COLORS.secondary}>
        动作：SKIP 或 MORE
      </text>
      <text x="52" y="242" fontSize="13" fill={COLORS.secondary}>
        样本：{selected.label}
      </text>
      <text x="52" y="278" fontSize="13" fill={COLORS.accent}>
        累计文本：转义与结束符可见
      </text>
      <rect
        x="382"
        y="102"
        width="350"
        height="210"
        rx="12"
        fill={COLORS.elevated}
        stroke={fault === "none" ? COLORS.success : COLORS.warning}
        strokeWidth="2"
      />
      <text
        x="406"
        y="136"
        fontSize="15"
        fontWeight="700"
        fill={COLORS.primary}
      >
        当前验收
      </text>
      <text
        x="406"
        y="182"
        fontSize="13"
        fill={fault === "none" ? COLORS.success : COLORS.warning}
      >
        {state}
      </text>
      <text x="406" y="232" fontSize="13" fill={COLORS.secondary}>
        未闭合结构应保留起点并停止生成伪 token。
      </text>
      <text x="406" y="274" fontSize="13" fill={COLORS.secondary}>
        清理生成目录后，比较状态、跨度和退出码。
      </text>
      <text x="28" y="378" fontSize="13" fill={COLORS.accent}>
        先猜一猜：注释结束后仍在 COMMENT 状态，会把哪段源码吞掉？
      </text>
    </g>
  );
}

/** 第4章专属实验：把最长匹配、词法动作与状态回放放进同一条扫描链。 */
export function CrcLexicalAnalysisLab() {
  const [view, setView] = useState<View>("outline");
  const [sample, setSample] = useState<Sample>("identifier");
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
    setSample("identifier");
    setFault("none");
    timeline.goToStep(0);
  }

  return (
    <section
      aria-label="第4章词法分析专属词法节点、最长匹配与词法回放实验；第4章 词法分析；4.1 基于JavaCC的扫描器的描述；4.2 扫描没有结构的单词；4.3 扫描不生成token的单词；4.4 扫描具有结构的单词"
      className="not-prose my-8 min-w-0 overflow-hidden rounded-card border border-border bg-elevated"
      data-unit-id="crc-unit-04"
      data-visual-kind="crc-lexical-analysis-replay"
    >
      <header className="flex flex-wrap items-start justify-between gap-4 border-b border-border px-5 py-4 sm:px-6">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold tracking-wide text-accent">
            专属 CrcLexicalAnalysisLab · 匹配、动作与状态
          </p>
          <h3 className="mt-1 text-base font-semibold text-primary">
            让每一次字符消费都留下 token 和跨度证据
          </h3>
          <p className="mt-1 max-w-3xl text-sm leading-6 text-secondary">
            先预测：改变一个共享前缀或结束符后，扫描器会先改变哪一份证据？
          </p>
        </div>
      </header>
      <div className="min-w-0 space-y-4 p-5 sm:p-6">
        <div className="flex flex-wrap gap-2" aria-label="选择词法分析实验视角">
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
        <div className="flex flex-wrap gap-2" aria-label="选择词法分析样本">
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
        <div className="flex flex-wrap gap-2" aria-label="选择词法分析故障模式">
          <ViewButton
            active={fault === "none"}
            onClick={() => setFault("none")}
          >
            正常扫描
          </ViewButton>
          <ViewButton
            active={fault === "longest"}
            onClick={() => setFault("longest")}
          >
            匹配过短
          </ViewButton>
          <ViewButton
            active={fault === "state"}
            onClick={() => setFault("state")}
          >
            状态未复位
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
                id="crc-lexical-analysis-arrow"
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
                label="字符"
                refCallback={(element) => {
                  nodeRefs.current.characters = element;
                }}
                status="输入与位置"
                x={28}
                y={104}
              />
              <Stage
                active
                label="匹配"
                refCallback={(element) => {
                  nodeRefs.current.match = element;
                }}
                status="候选规则"
                x={174}
                y={104}
              />
              <Stage
                active
                label="动作"
                refCallback={(element) => {
                  nodeRefs.current.action = element;
                }}
                status="TOKEN / SKIP"
                x={320}
                y={104}
              />
              <Stage
                active
                label="token"
                refCallback={(element) => {
                  nodeRefs.current.token = element;
                }}
                status="文本与跨度"
                x={466}
                y={104}
              />
              <Stage
                active
                label="状态"
                refCallback={(element) => {
                  nodeRefs.current.state = element;
                }}
                status="回放或诊断"
                x={612}
                y={104}
              />
            </g>
            {view === "outline" ? (
              <OutlineView activeStep={timeline.currentStep} sample={sample} />
            ) : view === "match" ? (
              <MatchView fault={fault} sample={sample} />
            ) : (
              <StateView fault={fault} sample={sample} />
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
          caption="单步查看字符、匹配、动作、token 和状态；重置后用相同样本重放，确认跨度与诊断没有被旧状态污染。"
          reset={{
            label: "重置词法分析实验",
            ariaLabel: "重置词法分析专属实验",
            onClick: reset,
          }}
        />
      </div>
    </section>
  );
}
