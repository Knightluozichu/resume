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
  danger: "var(--danger)",
  success: "var(--success)",
} as const;

const T = TEACHING_BEAT_MS;

const STEPS: readonly TeachingStep[] = [
  { label: "state", caption: "把每个对象自己的状态留在对象上" },
  { label: "capability", caption: "把共享行为放入能力对象" },
  { label: "link", caption: "建立清晰的对象关联与委托边" },
  { label: "receiver", caption: "由接收对象发起方法调用" },
  { label: "delegate", caption: "沿链接寻找缺失行为" },
  { label: "inspect", caption: "以内省确认关系而不是类名" },
];

const LABEL_TEXT: Readonly<Record<string, string>> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

const STAGE_COPY = [
  [
    "1 · 把状态放入任务对象",
    "session.token 等数据只属于当前对象；共享行为不应迫使多个对象复制彼此的状态。",
    "输出：独立状态 + 接收对象",
  ],
  [
    "2 · 把共享行为放入能力对象",
    "Auth.check 等行为集中在能力对象，函数体仍可用接收对象的 this 读取各自状态。",
    "输出：能力对象 + 可复用行为",
  ],
  [
    "3 · 建立显式原型链接",
    "用 Object.create 或明确关系表达委托边；关系本身比伪造的类名更重要。",
    "输出：task → capability",
  ],
  [
    "4 · 由接收对象发起调用",
    "session.check() 让接收对象参与调用，能力函数读取的是 session，而不是能力对象状态。",
    "输出：receiver + method call",
  ],
  [
    "5 · 沿链接寻找缺失行为",
    "接收对象没有 check 时，查询沿链接进入能力对象；找到行为后停止，不需要父方法脚本。",
    "输出：delegated lookup + result",
  ],
  [
    "6 · 以内省确认关系而非类名",
    "用 Object.getPrototypeOf、Object.hasOwn 等观察关系和能力，不依赖 constructor 名称猜模型。",
    "输出：可验证关系 + 维护边界",
  ],
] as const;

type Mode = "delegate" | "class" | "missing" | "inspect";

type ModeInfo = {
  title: string;
  expression: string;
  relation: string;
  lookup: string;
  result: string;
  coupling: string;
  detail: string;
};

const MODE_COPY: Record<Mode, ModeInfo> = {
  delegate: {
    title: "行为委托",
    expression: "session.check()",
    relation: "session → Auth",
    lookup: "session 未命中 → Auth.check",
    result: "token = ok → true",
    coupling: "状态独立，行为共享",
    detail: "能力对象提供行为，接收对象保留状态；关系可直接观察。",
  },
  class: {
    title: "类式复制对照",
    expression: "new Session().check()",
    relation: "constructor → instance",
    lookup: "实例或 prototype 上复制/查找方法",
    result: "行为来源被类型外观包裹",
    coupling: "层级和父方法耦合增加",
    detail: "类式对照用于暴露额外的构造、继承和 super 关系。",
  },
  missing: {
    title: "缺失行为故障",
    expression: "session.audit()",
    relation: "session → Auth",
    lookup: "两层都没有 audit",
    result: "TypeError / 缺失",
    coupling: "关系存在，但能力未签发",
    detail: "委托不会凭空创造能力；缺失必须在链路末端显式暴露。",
  },
  inspect: {
    title: "内省关系",
    expression: "Object.getPrototypeOf(session)",
    relation: "session.__proto__ === Auth",
    lookup: "hasOwn(token)=true · hasOwn(check)=false",
    result: "关系证据明确",
    coupling: "按对象关系维护，不按类名猜测",
    detail: "内省区分状态归属和行为来源，帮助发现错误链接。",
  },
};

export function YdkThis06BehaviorDelegationLab() {
  const stageRefs = useRef<Array<SVGGElement | null>>([]);
  const [mode, setMode] = useState<Mode>("delegate");

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
  const faultIndex = mode === "missing" ? 4 : mode === "inspect" ? 5 : 3;

  function reset() {
    timeline.goToStep(0);
    setMode("delegate");
  }

  return (
    <figure
      className="mdx-figure not-prose mx-auto my-8"
      data-visual-kind="ydk-this-06-behavior-delegation"
    >
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-6">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              You Don&apos;t Know JS · this 06
            </p>
            <h3 className="mt-1 text-lg font-semibold text-primary">
              让对象拥有状态，让能力对象提供行为
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
              选择一种关系，观察接收对象如何沿能力链接找到行为，以及内省如何验证关系。
            </p>
          </div>
          <span className="rounded-control border border-accent px-2 py-1 text-xs text-accent">
            ▷ 可交互
          </span>
        </div>

        <label className="mb-4 block text-xs text-secondary">
          <span className="mb-1 block font-semibold text-primary">选择行为关系样本</span>
          <select
            aria-label="选择行为委托类式对照缺失行为或内省样本"
            value={mode}
            onChange={(event) => setMode(event.target.value as Mode)}
            className="min-h-11 w-full rounded-control border border-border bg-bg px-3 py-2 text-sm text-primary"
          >
            <option value="delegate">行为委托 · session → Auth</option>
            <option value="class">类式对照 · constructor → instance</option>
            <option value="missing">缺失行为 · audit 不存在</option>
            <option value="inspect">内省关系 · Object.getPrototypeOf</option>
          </select>
        </label>

        <svg
          viewBox="0 0 900 620"
          role="img"
          aria-label="You Don't Know JS 关于 this 第6章专属教学时间线：覆盖 Chapter 6: Behavior Delegation、Towards Delegation-Oriented Design、Classes vs. Objects、Simpler Design、Nicer Syntax、Introspection。展示任务对象状态、能力对象、对象关联、原型链接、接收对象调用、委托链、缺失行为和内省关系。支持样本切换、播放、暂停、单步、拖进度和重置。"
          className="mx-auto block h-auto w-full"
        >
          <defs>
            <marker id="ydk-this06-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill={C.border} />
            </marker>
            <marker id="ydk-this06-success-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill={C.success} />
            </marker>
            <marker id="ydk-this06-danger-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill={C.danger} />
            </marker>
          </defs>

          <rect x="0" y="0" width="900" height="620" rx="14" fill={C.bg} />
          <text x="30" y="34" fontSize="16" fontWeight="700" fill={C.primary}>
            task state → capability object → delegated behavior
          </text>
          <text x="30" y="58" fontSize="12" fill={C.secondary}>
            {selected.title} · 当前样本：{selected.expression}
          </text>

          <rect x="30" y="78" width="248" height="134" rx="12" fill={C.elevated} stroke={C.border} strokeWidth="1.5" />
          <text x="50" y="106" fontSize="13" fontWeight="700" fill={C.accent}>任务对象</text>
          <text x="50" y="136" fontSize="12" fill={C.primary}>session.token = &quot;ok&quot;</text>
          <text x="50" y="164" fontSize="12" fill={C.secondary}>状态：只属于 session</text>
          <text x="50" y="190" fontSize="11" fill={C.secondary}>接收对象发起 check()</text>

          <line x1="290" y1="145" x2="322" y2="145" stroke={mode === "missing" ? C.danger : C.success} strokeWidth="2.5" markerEnd={mode === "missing" ? "url(#ydk-this06-danger-arrow)" : "url(#ydk-this06-success-arrow)"} />

          <rect x="332" y="78" width="272" height="134" rx="12" fill={C.elevated} stroke={C.border} strokeWidth="1.5" />
          <text x="354" y="106" fontSize="13" fontWeight="700" fill={C.accent}>能力对象</text>
          <text x="354" y="136" fontSize="12" fill={C.primary}>Auth.check()</text>
          <text x="354" y="164" fontSize="11" fill={C.secondary}>{selected.relation}</text>
          <text x="354" y="190" fontSize="11" fill={mode === "missing" ? C.danger : C.secondary}>{selected.lookup}</text>

          <line x1="616" y1="145" x2="648" y2="145" stroke={mode === "missing" ? C.danger : C.success} strokeWidth="2.5" markerEnd={mode === "missing" ? "url(#ydk-this06-danger-arrow)" : "url(#ydk-this06-success-arrow)"} />

          <rect x="658" y="78" width="212" height="134" rx="12" fill={mode === "missing" ? C.danger : C.success} fillOpacity="0.1" stroke={mode === "missing" ? C.danger : C.success} strokeWidth="1.5" />
          <text x="764" y="106" textAnchor="middle" fontSize="13" fontWeight="700" fill={mode === "missing" ? C.danger : C.success}>行为结果</text>
          <text x="764" y="136" textAnchor="middle" fontSize="12" fill={C.primary}>{selected.result}</text>
          <text x="764" y="164" textAnchor="middle" fontSize="11" fill={C.secondary}>{selected.coupling}</text>
          <text x="764" y="192" textAnchor="middle" fontSize="11" fill={mode === "missing" ? C.danger : C.success}>{selected.detail}</text>

          {STAGE_COPY.map((stage, index) => {
            const isActive = index === activeIndex;
            const isFailure = index === faultIndex && (mode === "missing" || mode === "class" || mode === "inspect");
            const tone = isFailure ? C.danger : isActive ? C.accent : index === 4 ? C.success : C.border;
            return (
              <g
                key={`stage-${stage[0]}`}
                ref={(node) => {
                  stageRefs.current[index] = node;
                }}
                style={{ opacity: 0 }}
              >
                <rect x="30" y="238" width="840" height="122" rx="12" fill={isFailure ? C.danger : isActive ? C.accent : C.elevated} fillOpacity={isFailure || isActive ? 0.1 : 1} stroke={tone} strokeWidth={isFailure || isActive ? 2.5 : 1.5} />
                <text x="52" y="266" fontSize="13" fontWeight="700" fill={isFailure ? C.danger : isActive ? C.accent : C.primary}>{stage[0]}</text>
                <text x="52" y="294" fontSize="12" fill={C.primary}>{stage[1]}</text>
                <text x="52" y="322" fontSize="12" fill={C.primary}>{stage[2]}</text>
                <text x="52" y="348" fontSize="11" fill={isFailure ? C.danger : C.secondary}>
                  {isFailure ? "故障注入：比较委托关系与类式复制的首个偏离点" : isActive ? "当前阶段：按证据推进" : "等待前一步签发状态"}
                </text>
              </g>
            );
          })}

          <line x1="76" y1="414" x2="824" y2="414" stroke={C.border} strokeWidth="2" markerEnd="url(#ydk-this06-arrow)" />
          {STEPS.slice(0, -1).map((step, index) => {
            const x1 = 76 + index * 146 + 110;
            const x2 = 76 + (index + 1) * 146 - 12;
            return (
              <line
                key={`connector-${step.label}`}
                x1={x1}
                y1="414"
                x2={x2}
                y2="414"
                stroke={index < activeIndex ? C.success : C.border}
                strokeWidth={index < activeIndex ? 3 : 1.5}
                markerEnd={index < activeIndex ? "url(#ydk-this06-success-arrow)" : "url(#ydk-this06-arrow)"}
              />
            );
          })}
          {STEPS.map((step, index) => {
            const x = 76 + index * 146;
            const isActive = index === activeIndex;
            const isFailure = index === faultIndex && (mode === "missing" || mode === "class" || mode === "inspect");
            const tone = isFailure ? C.danger : isActive ? C.accent : C.border;
            return (
              <g key={`step-${step.label}`}>
                <rect x={x} y="430" width="110" height="112" rx="12" fill={isFailure ? C.danger : isActive ? C.accent : C.elevated} fillOpacity={isFailure || isActive ? 0.16 : 1} stroke={tone} strokeWidth={isFailure || isActive ? 2.5 : 1.5} />
                <circle cx={x + 22} cy="454" r="12" fill={isFailure ? C.danger : isActive ? C.accent : C.bg} stroke={tone} strokeWidth="1.5" />
                <text x={x + 22} y="458" textAnchor="middle" fontSize="11" fill={isActive || isFailure ? C.bg : C.primary}>{index + 1}</text>
                <text x={x + 62} y="458" textAnchor="middle" fontSize="11" fontWeight="700" fill={isFailure ? C.danger : isActive ? C.accent : C.primary}>{step.label}</text>
                <text x={x + 55} y="486" textAnchor="middle" fontSize="11" fill={C.secondary}>{index < activeIndex ? "checked" : isActive ? "active" : "trace"}</text>
                <text x={x + 55} y="512" textAnchor="middle" fontSize="11" fill={isFailure ? C.danger : C.secondary}>{isFailure ? "fault" : "evidence"}</text>
                <text x={x + 55} y="532" textAnchor="middle" fontSize="11" fill={C.secondary}>{index === 4 ? "delegate" : index === 5 ? "inspect" : "state"}</text>
              </g>
            );
          })}
          <text x="30" y="584" fontSize="11" fill={C.secondary}>当前阶段：{activeStep.label} · {activeStep.caption}</text>
          <text x="870" y="584" textAnchor="end" fontSize="11" fill={C.secondary}>先观察关系，再选择抽象</text>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="先预测 session.check() 的行为来源，再推进链接、委托和内省证据。"
          reset={{ label: "重置实验", ariaLabel: "重置行为委托关系实验", onClick: reset }}
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        行为委托让状态与能力分离；对象关系清晰时，代码不必依赖构造器或父方法调用链。
      </figcaption>
    </figure>
  );
}
