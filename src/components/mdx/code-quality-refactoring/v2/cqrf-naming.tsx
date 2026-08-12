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

type View = "clarity" | "ambiguity" | "consistency";
type Pitfall = "none" | "abbreviation" | "implementation";

const VIEWS: readonly { id: View; label: string; detail: string }[] = [
  {
    id: "clarity",
    label: "名副其实",
    detail: "比较缩写、实现名和意图名，让读者从名字预测对象或动作。",
  },
  {
    id: "ambiguity",
    label: "避免误导",
    detail: "改变上下文和词汇冲突，观察同一个名字怎样制造错误预期。",
  },
  {
    id: "consistency",
    label: "语义区分",
    detail: "比较相似变量的语义差异，检查命名是否真正区分责任和生命周期。",
  },
];

const STEPS: readonly TeachingStep[] = [
  {
    label: "observe",
    caption: "先收集调用点、值的形状和生命周期，不脱离上下文评价名字。",
  },
  {
    label: "clarify",
    caption: "用领域词和意图词替换缩写、噪音词与实现细节。",
  },
  {
    label: "compare",
    caption: "把相似对象并排比较，确认名字传达了真正的语义差异。",
  },
  {
    label: "verify",
    caption: "让另一位读者只看调用点预测行为，再用实际行为核对命名。",
  },
] as const;

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

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
  refCallback: (element: SVGGElement | null) => void;
  status: string;
  x: number;
  y: number;
}) {
  return (
    <g ref={refCallback} opacity={active ? 1 : 0.36}>
      <rect
        x={x}
        y={y}
        width="154"
        height="94"
        rx="12"
        fill={COLORS.elevated}
        stroke={active ? COLORS.accent : COLORS.border}
        strokeWidth="2"
      />
      <text
        x={x + 18}
        y={y + 28}
        fontSize="15"
        fontWeight="700"
        fill={COLORS.primary}
      >
        {label}
      </text>
      <text x={x + 18} y={y + 59} fontSize="13" fill={COLORS.secondary}>
        {status}
      </text>
    </g>
  );
}

function ClarityView({
  activeStep,
  context,
  nameLength,
  nodeRefs,
  pitfall,
}: {
  activeStep: number;
  context: number;
  nameLength: number;
  nodeRefs: MutableRefObject<Record<string, SVGGElement | null>>;
  pitfall: Pitfall;
}) {
  const longEnough = nameLength >= 0.62;
  const contextual = context >= 0.55;
  const label =
    pitfall === "abbreviation"
      ? "usrAccNum"
      : pitfall === "implementation"
        ? "getUserFromMySQL"
        : longEnough
          ? "activeUsers"
          : "users";
  const verdict =
    pitfall === "abbreviation"
      ? "字符少，信息也少"
      : pitfall === "implementation"
        ? "实现泄漏到契约"
        : longEnough && contextual
          ? "意图与上下文一致"
          : "仍需要猜测";
  return (
    <g>
      <text x="28" y="31" fontSize="16" fontWeight="700" fill={COLORS.primary}>
        名副其实：名字先交付一份可读的预测
      </text>
      <text x="28" y="58" fontSize="13" fill={COLORS.secondary}>
        好名字不描述所有实现细节，只让读者知道对象是什么、动作做什么以及边界在哪里。
      </text>
      <Stage
        active={activeStep >= 0}
        label="观察"
        refCallback={(element) => {
          nodeRefs.current.observe = element;
        }}
        status="调用点与值形状"
        x={28}
        y={96}
      />
      <line
        x1="182"
        y1="143"
        x2="216"
        y2="143"
        stroke={COLORS.accent}
        strokeWidth="3"
        markerEnd="url(#cqrf-naming-arrow)"
      />
      <Stage
        active={activeStep >= 1}
        label="澄清"
        refCallback={(element) => {
          nodeRefs.current.clarify = element;
        }}
        status={pitfall === "abbreviation" ? "缩写噪声" : "领域词"}
        x={230}
        y={96}
      />
      <line
        x1="384"
        y1="143"
        x2="418"
        y2="143"
        stroke={COLORS.accent}
        strokeWidth="3"
        markerEnd="url(#cqrf-naming-arrow)"
      />
      <Stage
        active={activeStep >= 2}
        label="比较"
        refCallback={(element) => {
          nodeRefs.current.compare = element;
        }}
        status={pitfall === "implementation" ? "实现细节" : "意图差异"}
        x={432}
        y={96}
      />
      <line
        x1="586"
        y1="143"
        x2="620"
        y2="143"
        stroke={COLORS.accent}
        strokeWidth="3"
        markerEnd="url(#cqrf-naming-arrow)"
      />
      <Stage
        active={activeStep >= 3}
        label="验证"
        refCallback={(element) => {
          nodeRefs.current.verify = element;
        }}
        status={
          longEnough && contextual && pitfall === "none"
            ? "预测稳定"
            : "继续改名"
        }
        x={634}
        y={96}
      />
      <rect
        x="28"
        y="230"
        width="326"
        height="106"
        rx="12"
        fill={COLORS.elevated}
        stroke={COLORS.border}
        strokeWidth="2"
      />
      <text x="50" y="260" fontSize="15" fontWeight="700" fill={COLORS.primary}>
        当前名字
      </text>
      <text
        x="50"
        y="300"
        fontSize="16"
        fontFamily="monospace"
        fill={pitfall === "none" ? COLORS.success : COLORS.warning}
      >
        {label}
      </text>
      <text x="50" y="326" fontSize="13" fill={COLORS.secondary}>
        上下文强度：{context.toFixed(2)} · 长度信号：{nameLength.toFixed(2)}
      </text>
      <rect
        x="378"
        y="230"
        width="338"
        height="106"
        rx="12"
        fill={COLORS.elevated}
        stroke={
          pitfall === "none" && longEnough && contextual
            ? COLORS.success
            : COLORS.warning
        }
        strokeWidth="2"
      />
      <text
        x="402"
        y="260"
        fontSize="15"
        fontWeight="700"
        fill={COLORS.primary}
      >
        读者预测
      </text>
      <text
        x="402"
        y="298"
        fontSize="13"
        fill={
          pitfall === "none" && longEnough && contextual
            ? COLORS.success
            : COLORS.warning
        }
      >
        {verdict}
      </text>
      <text x="28" y="376" fontSize="13" fill={COLORS.accent}>
        预测：只改名字而不改行为时，哪一个调用点最先变得容易阅读？
      </text>
    </g>
  );
}

function AmbiguityView({
  context,
  pitfall,
}: {
  context: number;
  pitfall: Pitfall;
}) {
  const ambiguous = context < 0.5 || pitfall === "implementation";
  return (
    <g>
      <text x="28" y="31" fontSize="16" fontWeight="700" fill={COLORS.primary}>
        避免误导：名字不能承诺不存在的类型或行为
      </text>
      <text x="28" y="58" fontSize="13" fill={COLORS.secondary}>
        同一个词在不同上下文里代表不同东西，或名字泄漏实现，都会让调用者建立错误模型。
      </text>
      <rect
        x="28"
        y="96"
        width="326"
        height="222"
        rx="12"
        fill={COLORS.elevated}
        stroke={ambiguous ? COLORS.warning : COLORS.success}
        strokeWidth="2"
      />
      <text x="52" y="130" fontSize="15" fontWeight="700" fill={COLORS.primary}>
        当前上下文
      </text>
      <text x="52" y="174" fontSize="13" fill={COLORS.secondary}>
        {pitfall === "implementation" ? "getUserFromMySQL()" : "accountList"}
      </text>
      <text
        x="52"
        y="216"
        fontSize="13"
        fill={ambiguous ? COLORS.warning : COLORS.success}
      >
        {ambiguous ? "名称暗示了错误的形状或实现" : "名称与实际集合一致"}
      </text>
      <text x="52" y="274" fontSize="13" fill={COLORS.secondary}>
        上下文强度：{context.toFixed(2)}
      </text>
      <line
        x1="356"
        y1="206"
        x2="414"
        y2="206"
        stroke={COLORS.accent}
        strokeWidth="3"
        markerEnd="url(#cqrf-naming-arrow)"
      />
      <rect
        x="436"
        y="96"
        width="280"
        height="222"
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
        改名方向
      </text>
      <text x="460" y="174" fontSize="13" fill={COLORS.success}>
        accountIds / accounts
      </text>
      <text x="460" y="218" fontSize="13" fill={COLORS.accent}>
        getUser() / loadUser()
      </text>
      <text x="460" y="274" fontSize="13" fill={COLORS.secondary}>
        把稳定意图留在名字，把实现放回实现层。
      </text>
      <text x="28" y="376" fontSize="13" fill={COLORS.accent}>
        动手试：调低上下文强度，指出同一个词为什么开始产生歧义。
      </text>
    </g>
  );
}

function ConsistencyView({
  distinction,
  pitfall,
}: {
  distinction: number;
  pitfall: Pitfall;
}) {
  const clear = distinction >= 0.6 && pitfall === "none";
  return (
    <g>
      <text x="28" y="31" fontSize="16" fontWeight="700" fill={COLORS.primary}>
        有意义的区分：语义差异比编号更可靠
      </text>
      <text x="28" y="58" fontSize="13" fill={COLORS.secondary}>
        name1 和 name2 只是不同拼写；sourceUser 与 targetUser
        才把责任差异交给读者。
      </text>
      <rect
        x="28"
        y="96"
        width="326"
        height="222"
        rx="12"
        fill={COLORS.elevated}
        stroke={COLORS.border}
        strokeWidth="2"
      />
      <text x="52" y="130" fontSize="15" fontWeight="700" fill={COLORS.primary}>
        两个相近对象
      </text>
      <text
        x="52"
        y="174"
        fontSize="15"
        fontFamily="monospace"
        fill={pitfall === "none" ? COLORS.success : COLORS.warning}
      >
        {pitfall === "none" ? "sourceUser" : "user1"}
      </text>
      <text
        x="52"
        y="218"
        fontSize="15"
        fontFamily="monospace"
        fill={pitfall === "none" ? COLORS.success : COLORS.warning}
      >
        {pitfall === "none" ? "targetUser" : "user2"}
      </text>
      <text x="52" y="274" fontSize="13" fill={COLORS.secondary}>
        语义差异：{distinction.toFixed(2)}
      </text>
      <line
        x1="356"
        y1="206"
        x2="414"
        y2="206"
        stroke={COLORS.accent}
        strokeWidth="3"
        markerEnd="url(#cqrf-naming-arrow)"
      />
      <rect
        x="436"
        y="96"
        width="280"
        height="222"
        rx="12"
        fill={COLORS.elevated}
        stroke={clear ? COLORS.success : COLORS.warning}
        strokeWidth="2"
      />
      <text
        x="460"
        y="130"
        fontSize="15"
        fontWeight="700"
        fill={COLORS.primary}
      >
        调用者能回答
      </text>
      <text
        x="460"
        y="174"
        fontSize="13"
        fill={clear ? COLORS.success : COLORS.warning}
      >
        {clear ? "谁是来源，谁是目标" : "只能记住编号，不能说明差异"}
      </text>
      <text x="460" y="228" fontSize="13" fill={COLORS.secondary}>
        词汇必须在同一代码库中保持一词一义。
      </text>
      <text x="460" y="274" fontSize="13" fill={COLORS.secondary}>
        别用无意义后缀掩盖未解决的模型。
      </text>
      <text x="28" y="376" fontSize="13" fill={COLORS.accent}>
        先猜一猜：当语义差异变大时，哪个名字最值得留下？
      </text>
    </g>
  );
}

/** 命名专属实验：比较名字的意图、上下文歧义和语义区分。 */
export function CqrfNamingLab() {
  const [view, setView] = useState<View>("clarity");
  const [nameLength, setNameLength] = useState(0.64);
  const [context, setContext] = useState(0.62);
  const [distinction, setDistinction] = useState(0.68);
  const [pitfall, setPitfall] = useState<Pitfall>("none");
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
    setView("clarity");
    setNameLength(0.64);
    setContext(0.62);
    setDistinction(0.68);
    setPitfall("none");
    timeline.goToStep(0);
  }

  return (
    <section
      aria-label="命名专属名副其实、避免误导与语义区分实验"
      className="not-prose my-8 min-w-0 overflow-hidden rounded-card border border-border bg-elevated"
      data-unit-id="codequalityrefactoring-02"
      data-visual-kind="cqrf-naming-clarity"
    >
      <header className="flex flex-wrap items-start justify-between gap-4 border-b border-border px-5 py-4 sm:px-6">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold tracking-wide text-accent">
            专属 NamingClarityLab · 意图、上下文与区分
          </p>
          <h3 className="mt-1 text-base font-semibold text-primary">
            让名字替读者消除猜测
          </h3>
          <p className="mt-1 max-w-3xl text-sm leading-6 text-secondary">
            先预测：名字变长、上下文变强或语义差异变大时，哪种误导会先消失？
          </p>
        </div>
      </header>
      <div className="min-w-0 space-y-4 p-5 sm:p-6">
        <div className="flex flex-wrap gap-2" aria-label="选择命名实验视角">
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
            label="名字信息量"
            min={0.1}
            max={1}
            step={0.01}
            value={nameLength}
            onChange={setNameLength}
          />
          <RangeControl
            label="上下文强度"
            min={0.1}
            max={1}
            step={0.01}
            value={context}
            onChange={setContext}
          />
          <RangeControl
            label="语义差异"
            min={0.1}
            max={1}
            step={0.01}
            value={distinction}
            onChange={setDistinction}
          />
        </div>
        <div className="flex flex-wrap gap-2" aria-label="选择命名误区模式">
          <ViewButton
            active={pitfall === "none"}
            onClick={() => setPitfall("none")}
          >
            清楚命名
          </ViewButton>
          <ViewButton
            active={pitfall === "abbreviation"}
            onClick={() => setPitfall("abbreviation")}
          >
            缩写
          </ViewButton>
          <ViewButton
            active={pitfall === "implementation"}
            onClick={() => setPitfall("implementation")}
          >
            实现细节
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
                id="cqrf-naming-arrow"
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
            {view === "clarity" ? (
              <ClarityView
                activeStep={timeline.currentStep}
                context={context}
                nameLength={nameLength}
                nodeRefs={nodeRefs}
                pitfall={pitfall}
              />
            ) : view === "ambiguity" ? (
              <AmbiguityView context={context} pitfall={pitfall} />
            ) : (
              <ConsistencyView distinction={distinction} pitfall={pitfall} />
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
          caption="单步查看观察、澄清、比较与验证；播放后让另一位读者只看调用点预测名字含义。"
          reset={{
            label: "重置命名实验",
            ariaLabel: "重置命名专属实验",
            onClick: reset,
          }}
        />
      </div>
    </section>
  );
}
