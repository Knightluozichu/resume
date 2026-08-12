"use client";

import { useMemo, useRef, useState, type MutableRefObject } from "react";

import {
  TEACHING_BEAT_MS,
  TimelineControls,
} from "@/components/mdx/anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "@/components/mdx/anim/use-teaching-timeline";

const VIEW_W = 760;
const VIEW_H = 410;
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

type View = "drift" | "layout" | "decision";
type CommentKind = "what" | "why" | "license" | "todo";

const VIEWS: readonly { id: View; label: string; detail: string }[] = [
  {
    id: "drift",
    label: "注释漂移",
    detail: "改变代码变化与注释新鲜度，观察过时注释怎样从帮助变成风险。",
  },
  {
    id: "layout",
    label: "格式层次",
    detail: "改变嵌套和行长，比较垂直间距、命名与格式化工具如何承载结构。",
  },
  {
    id: "decision",
    label: "注释决策",
    detail:
      "在复述、意图、法律声明和 TODO 之间选择，判断什么信息值得离开代码保存。",
  },
];

const STEPS: readonly TeachingStep[] = [
  {
    label: "observe",
    caption: "先把注释、代码和真实行为并排比较，找出第一处不一致。",
  },
  {
    label: "rewrite",
    caption: "优先用名字、函数边界和常量表达意图，只保留代码无法表达的信息。",
  },
  {
    label: "format",
    caption: "用垂直间距、稳定缩进和自动格式化工具让结构可扫描。",
  },
  {
    label: "verify",
    caption: "改变一个输入后重放，检查注释、格式和实际行为仍然互相支持。",
  },
] as const;

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

const COMMENT_OPTIONS: readonly {
  id: CommentKind;
  label: string;
  detail: string;
}[] = [
  {
    id: "what",
    label: "复述做什么",
    detail: "通常应该改名字或拆函数，让代码自己表达。",
  },
  {
    id: "why",
    label: "解释为什么",
    detail: "适合记录反直觉约束、历史决策或 workaround。",
  },
  {
    id: "license",
    label: "法律声明",
    detail: "协议要求保留，不能用代码替代。",
  },
  {
    id: "todo",
    label: "待办边界",
    detail: "写清责任人与后续动作，避免留下无主 TODO。",
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

function RangeControl({
  label,
  max,
  min,
  onChange,
  step,
  value,
}: {
  label: string;
  max: number;
  min: number;
  onChange: (value: number) => void;
  step: number;
  value: number;
}) {
  const display = Number.isInteger(value) ? String(value) : value.toFixed(2);
  return (
    <label className="flex min-w-44 flex-1 flex-col gap-1 text-sm text-secondary">
      <span className="flex justify-between gap-3">
        <span>{label}</span>
        <span className="font-mono text-primary">{display}</span>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="accent-accent"
      />
    </label>
  );
}

function DriftView({
  activeStep,
  codeChange,
  commentFreshness,
  nodeRefs,
}: {
  activeStep: number;
  codeChange: number;
  commentFreshness: number;
  nodeRefs: MutableRefObject<Record<string, SVGGElement | null>>;
}) {
  const stale = codeChange > commentFreshness;
  return (
    <g>
      <text x="28" y="31" fontSize="16" fontWeight="700" fill={COLORS.primary}>
        注释漂移：代码变了，说明是否还站得住？
      </text>
      <text x="28" y="58" fontSize="13" fill={COLORS.secondary}>
        注释是另一个需要维护的接口；先对照事实，再决定保留、改写或删除。
      </text>
      <g
        ref={(element) => {
          nodeRefs.current.observe = element;
        }}
        opacity={activeStep >= 0 ? 1 : 0.4}
      >
        <rect
          x="28"
          y="96"
          width="326"
          height="206"
          rx="12"
          fill={COLORS.elevated}
          stroke={COLORS.border}
          strokeWidth="2"
        />
        <text
          x="52"
          y="130"
          fontSize="15"
          fontWeight="700"
          fill={COLORS.primary}
        >
          注释记录
        </text>
        <text x="52" y="166" fontSize="13" fill={COLORS.secondary}>
          “这里加 1 是因为偏移量”
        </text>
        <text x="52" y="204" fontSize="13" fill={COLORS.secondary}>
          新鲜度：{commentFreshness.toFixed(2)}
        </text>
        <rect
          x="52"
          y="216"
          width="230"
          height="14"
          rx="7"
          fill={COLORS.border}
        />
        <rect
          x="52"
          y="216"
          width={230 * commentFreshness}
          height="14"
          rx="7"
          fill={stale ? COLORS.warning : COLORS.success}
          fillOpacity="0.82"
        />
        <text
          x="52"
          y="270"
          fontSize="13"
          fill={stale ? COLORS.warning : COLORS.success}
        >
          {stale ? "可能已经落后" : "仍需与代码核对"}
        </text>
      </g>
      <line
        x1="356"
        y1="196"
        x2="414"
        y2="196"
        stroke={COLORS.accent}
        strokeWidth="3"
        markerEnd="url(#cqrf-comments-arrow)"
      />
      <g
        ref={(element) => {
          nodeRefs.current.rewrite = element;
        }}
        opacity={activeStep >= 1 ? 1 : 0.4}
      >
        <rect
          x="436"
          y="96"
          width="280"
          height="206"
          rx="12"
          fill={COLORS.elevated}
          stroke={stale ? COLORS.warning : COLORS.success}
          strokeWidth="2"
        />
        <text
          x="460"
          y="130"
          fontSize="15"
          fontWeight="700"
          fill={COLORS.primary}
        >
          实际代码
        </text>
        <text x="460" y="168" fontSize="13" fill={COLORS.secondary}>
          const offset = base + 2;
        </text>
        <text x="460" y="204" fontSize="13" fill={COLORS.secondary}>
          变化度：{codeChange.toFixed(2)}
        </text>
        <rect
          x="460"
          y="216"
          width="220"
          height="14"
          rx="7"
          fill={COLORS.border}
        />
        <rect
          x="460"
          y="216"
          width={220 * codeChange}
          height="14"
          rx="7"
          fill={COLORS.accent}
          fillOpacity="0.82"
        />
        <text
          x="460"
          y="270"
          fontSize="13"
          fill={stale ? COLORS.warning : COLORS.success}
        >
          {stale ? "先修正说明或删掉复述" : "保持行为与意图一致"}
        </text>
      </g>
      <text x="28" y="344" fontSize="13" fill={COLORS.secondary}>
        当前检查点：第 {activeStep + 1} 步 ·
        先相信运行事实，再检查注释是否解释了无法从代码读出的原因。
      </text>
      <text x="28" y="382" fontSize="13" fill={COLORS.accent}>
        预测：当代码变化度超过说明新鲜度时，保留旧注释会增加什么风险？
      </text>
    </g>
  );
}

function LayoutView({
  lineLength,
  nesting,
}: {
  lineLength: number;
  nesting: number;
}) {
  const denseWidth = 110 + lineLength * 150;
  const indent = 22 + nesting * 12;
  return (
    <g>
      <text x="28" y="31" fontSize="16" fontWeight="700" fill={COLORS.primary}>
        格式层次：空白是在代码之间建立语义分组
      </text>
      <text x="28" y="58" fontSize="13" fill={COLORS.secondary}>
        格式不改变运行结果，却会改变读者扫描结构和定位责任的成本。
      </text>
      <rect
        x="28"
        y="96"
        width="326"
        height="224"
        rx="12"
        fill={COLORS.elevated}
        stroke={COLORS.border}
        strokeWidth="2"
      />
      <text x="52" y="130" fontSize="15" fontWeight="700" fill={COLORS.primary}>
        清楚的垂直层次
      </text>
      {["读取输入", "校验边界", "计算结果", "保存输出"].map((label, index) => (
        <g key={label}>
          <rect
            x="52"
            y={152 + index * 34}
            width={180 + (index % 2) * 35}
            height="20"
            rx="6"
            fill={COLORS.success}
            fillOpacity="0.16"
            stroke={COLORS.success}
          />
          <text x="64" y={167 + index * 34} fontSize="13" fill={COLORS.primary}>
            {label}
          </text>
        </g>
      ))}
      <text x="52" y="298" fontSize="13" fill={COLORS.secondary}>
        空行把不同意图分成可扫描的段落。
      </text>
      <line
        x1="356"
        y1="206"
        x2="414"
        y2="206"
        stroke={COLORS.accent}
        strokeWidth="3"
        markerEnd="url(#cqrf-comments-arrow)"
      />
      <rect
        x="436"
        y="96"
        width="280"
        height="224"
        rx="12"
        fill={COLORS.elevated}
        stroke={COLORS.border}
        strokeWidth="2"
      />
      <text
        x="460"
        y="130"
        fontSize="15"
        fontWeight="700"
        fill={COLORS.primary}
      >
        当前格式压力
      </text>
      <text x="460" y="166" fontSize="13" fill={COLORS.warning}>
        嵌套层数：{nesting}
      </text>
      <rect
        x="460"
        y="176"
        width="220"
        height="12"
        rx="6"
        fill={COLORS.border}
      />
      <rect
        x="460"
        y="176"
        width={220 * (nesting / 6)}
        height="12"
        rx="6"
        fill={COLORS.warning}
        fillOpacity="0.82"
      />
      <text x="460" y="220" fontSize="13" fill={COLORS.accent}>
        最长行比例：{lineLength.toFixed(2)}
      </text>
      <rect
        x="460"
        y="230"
        width="220"
        height="12"
        rx="6"
        fill={COLORS.border}
      />
      <rect
        x="460"
        y="230"
        width={220 * lineLength}
        height="12"
        rx="6"
        fill={COLORS.accent}
        fillOpacity="0.82"
      />
      <text x="460" y="282" fontSize="13" fill={COLORS.secondary}>
        让工具处理一致格式，把注意力留给逻辑。
      </text>
      <text x="28" y="358" fontSize="13" fill={COLORS.secondary}>
        模拟长行宽度：{Math.round(denseWidth)} · 缩进压力：{indent} px ·
        结构越深，越需要拆出责任。
      </text>
      <text x="28" y="386" fontSize="13" fill={COLORS.accent}>
        动手试：格式化后行为不变，读者却更快找到哪一段？
      </text>
    </g>
  );
}

function DecisionView({ kind }: { kind: CommentKind }) {
  const selected =
    COMMENT_OPTIONS.find((item) => item.id === kind) ?? COMMENT_OPTIONS[0];
  const color =
    kind === "what"
      ? COLORS.danger
      : kind === "why"
        ? COLORS.success
        : COLORS.accent;
  return (
    <g>
      <text x="28" y="31" fontSize="16" fontWeight="700" fill={COLORS.primary}>
        注释决策：留下代码无法表达的信息
      </text>
      <text x="28" y="58" fontSize="13" fill={COLORS.secondary}>
        同一句话的价值取决于它是否记录了原因、约束、协议或明确的后续责任。
      </text>
      <rect
        x="28"
        y="98"
        width="326"
        height="216"
        rx="12"
        fill={COLORS.elevated}
        stroke={COLORS.border}
        strokeWidth="2"
      />
      <text x="52" y="132" fontSize="15" fontWeight="700" fill={COLORS.primary}>
        当前选择
      </text>
      {COMMENT_OPTIONS.map((option, index) => {
        const active = option.id === kind;
        return (
          <g key={option.id}>
            <circle
              cx="62"
              cy={164 + index * 34}
              r="6"
              fill={active ? COLORS.accent : COLORS.border}
            />
            <text
              x="78"
              y={169 + index * 34}
              fontSize="13"
              fill={active ? COLORS.primary : COLORS.secondary}
            >
              {option.label}
            </text>
          </g>
        );
      })}
      <line
        x1="356"
        y1="206"
        x2="414"
        y2="206"
        stroke={COLORS.accent}
        strokeWidth="3"
        markerEnd="url(#cqrf-comments-arrow)"
      />
      <rect
        x="436"
        y="98"
        width="280"
        height="216"
        rx="12"
        fill={COLORS.elevated}
        stroke={color}
        strokeWidth="2"
      />
      <text
        x="460"
        y="132"
        fontSize="15"
        fontWeight="700"
        fill={COLORS.primary}
      >
        {selected.label}
      </text>
      <text x="460" y="178" fontSize="13" fill={COLORS.secondary}>
        {selected.detail}
      </text>
      <text x="460" y="226" fontSize="13" fill={color}>
        {kind === "what"
          ? "优先改代码"
          : kind === "why"
            ? "保留原因"
            : kind === "license"
              ? "保留声明"
              : "写清责任"}
      </text>
      <text x="460" y="270" fontSize="13" fill={COLORS.secondary}>
        判断依据：读者是否能从代码本身得到这条信息？
      </text>
      <text x="28" y="358" fontSize="13" fill={COLORS.secondary}>
        注释不是越多越好；它的维护成本应小于它保存的上下文价值。
      </text>
      <text x="28" y="386" fontSize="13" fill={COLORS.accent}>
        先猜一猜：这四类信息中，哪一类最不适合用代码表达？
      </text>
    </g>
  );
}

/** 注释与格式专属实验：把注释漂移、格式层次和注释决策放进同一条证据链。 */
export function CqrfCommentsFormatLab() {
  const [view, setView] = useState<View>("drift");
  const [codeChange, setCodeChange] = useState(0.64);
  const [commentFreshness, setCommentFreshness] = useState(0.35);
  const [nesting, setNesting] = useState(3);
  const [lineLength, setLineLength] = useState(0.58);
  const [kind, setKind] = useState<CommentKind>("why");
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
            opacity: [0.38, 1],
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
    setView("drift");
    setCodeChange(0.64);
    setCommentFreshness(0.35);
    setNesting(3);
    setLineLength(0.58);
    setKind("why");
    timeline.goToStep(0);
  }

  return (
    <section
      aria-label="注释与格式专属注释漂移、格式层次与注释决策实验"
      className="not-prose my-8 min-w-0 overflow-hidden rounded-card border border-border bg-elevated"
      data-visual-kind="cqrf-comments-format-integrity"
      data-unit-id="codequalityrefactoring-04"
    >
      <header className="flex flex-wrap items-start justify-between gap-4 border-b border-border px-5 py-4 sm:px-6">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold tracking-wide text-accent">
            专属 CommentIntegrityLab · 漂移、层次与注释决策
          </p>
          <h3 className="mt-1 text-base font-semibold text-primary">
            让代码表达“做什么”，让注释保存“为什么”
          </h3>
          <p className="mt-1 max-w-3xl text-sm leading-6 text-secondary">
            先预测：当注释与代码不同步时，应该改写、删除，还是保留原因？
          </p>
        </div>
      </header>
      <div className="min-w-0 space-y-4 p-5 sm:p-6">
        <div
          className="flex flex-wrap gap-2"
          aria-label="选择注释与格式实验视角"
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
        <div className="flex flex-wrap gap-4 rounded-card border border-border bg-background p-4">
          <RangeControl
            label="代码变化度"
            min={0.1}
            max={1}
            step={0.01}
            value={codeChange}
            onChange={setCodeChange}
          />
          <RangeControl
            label="注释新鲜度"
            min={0.1}
            max={1}
            step={0.01}
            value={commentFreshness}
            onChange={setCommentFreshness}
          />
          <RangeControl
            label="嵌套层数"
            min={1}
            max={6}
            step={1}
            value={nesting}
            onChange={setNesting}
          />
          <RangeControl
            label="最长行比例"
            min={0.1}
            max={1}
            step={0.01}
            value={lineLength}
            onChange={setLineLength}
          />
        </div>
        {view === "decision" && (
          <div className="flex flex-wrap gap-2" aria-label="选择注释信息类型">
            {COMMENT_OPTIONS.map((option) => (
              <ViewButton
                key={option.id}
                active={kind === option.id}
                onClick={() => setKind(option.id)}
              >
                {option.label}
              </ViewButton>
            ))}
          </div>
        )}
        <div className="min-w-0 rounded-card border border-border bg-background p-3 sm:p-4">
          <svg
            viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
            role="img"
            aria-label={`${current.label}可视化：${current.detail}`}
            className="h-auto w-full"
          >
            <defs>
              <marker
                id="cqrf-comments-arrow"
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
            {view === "drift" ? (
              <DriftView
                activeStep={timeline.currentStep}
                codeChange={codeChange}
                commentFreshness={commentFreshness}
                nodeRefs={nodeRefs}
              />
            ) : view === "layout" ? (
              <LayoutView lineLength={lineLength} nesting={nesting} />
            ) : (
              <DecisionView kind={kind} />
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
          caption="单步查看事实与说明的边界，播放查看从改写到格式化的完整过程；最后用同一输入重放。"
          reset={{
            label: "重置注释与格式实验",
            ariaLabel: "重置注释与格式专属实验",
            onClick: reset,
          }}
        />
      </div>
    </section>
  );
}
