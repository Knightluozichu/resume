"use client";

import { useRef, useState } from "react";

import {
  TEACHING_BEAT_MS,
  TimelineControls,
} from "../../anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "../../anim/use-teaching-timeline";

const C = {
  bg: "var(--bg)",
  elevated: "var(--bg-elevated)",
  border: "var(--border)",
  primary: "var(--text-primary)",
  secondary: "var(--text-secondary)",
  accent: "var(--accent)",
  danger: "var(--danger)",
  success: "var(--success)",
  warning: "var(--warning)",
} as const;

const T = TEACHING_BEAT_MS;

const STEPS: readonly TeachingStep[] = [
  {
    label: "interface",
    caption: "pass by value 用一个 concrete value 参数收敛 overload 与 template 复杂度",
  },
  {
    label: "lvalue",
    caption: "lvalue path 先 copy-construct parameter，再把 parameter move 到 destination",
  },
  {
    label: "rvalue",
    caption: "rvalue path 通常 move 到 parameter，再 move 到 destination，最多多一次 move",
  },
  {
    label: "gate",
    caption: "copyable cheap to move 与 always copied 等三项条件必须同时成立",
  },
  {
    label: "counterexample",
    caption: "conditional copy 与 assignment allocation 让按值提前支付不必要成本",
  },
  {
    label: "slicing",
    caption: "slicing 会丢失 derived state，最后用 parameter-strategy audit 决定接口",
  },
];

const LABEL_TEXT: Readonly<Record<string, string>> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

const BOXES = STEPS.map((_, index) => ({ x: 28 + index * 134, y: 416 }));

const STAGE_COPY = [
  {
    title: "1 · pass by value：用一个普通参数收敛接口",
    lines: [
      "const& / && overloads 精确但重复；forwarding sink template 扩大约束与诊断面",
      "按值把 copy/move 边界集中到 parameter，再在 body 统一 move 到 destination",
    ],
    footer: "它是 consider，不是全局 prefer：先数完整调用链的成本",
  },
  {
    title: "2 · lvalue path：copy + move 换取一个 sink",
    lines: [
      "lvalue 先 copy-construct value parameter，body 再 move 到最终 storage",
      "相对精确 overload，常见代价是 1 copy + 1 extra move",
    ],
    footer: "若 destination 是 assignment，还要把 parameter 的新 storage allocation 算进去",
  },
  {
    title: "3 · rvalue path：move + move 可能仍然便宜",
    lines: [
      "temporary 通常 move-construct parameter，再 move-construct 或 move-assign destination",
      "resource-owning type 可能只转移 handle；inline buffer 可能逐元素搬运",
    ],
    footer: "extra-move tax 必须基于具体类型契约或 measurement",
  },
  {
    title: "4 · copyable cheap to move + always copied：三项 gate",
    lines: [
      "类型可复制；move 成本低且可预测；所有成功路径都真正需要独立副本",
      "任一条件失败，就回到 const&、精确 overload 或受约束 forwarding interface",
    ],
    footer: "总会复制必须包括 control flow 与 destination operation",
  },
  {
    title: "5 · counterexample：conditional copy 与 allocation reuse",
    lines: [
      "只有 cache miss 才保存时，按值 lvalue parameter 会在 miss 前提前 copy",
      "assignment 可能复用已有 capacity；按值 copy-construct parameter 反而先分配 buffer",
    ],
    footer: "新建 element 与覆盖已有 member 不是同一种 sink",
  },
  {
    title: "6 · slicing 与 parameter-strategy audit",
    lines: [
      "Shape value 接收 Circle 会丢失 derived state；按值不适合 polymorphic base interface",
      "最终核对 type、control flow、construction/assignment、exception 与 measured allocation",
    ],
    footer: "答案来自完整语义与成本，而不是单一风格规则",
  },
] as const;

type InputKind = "lvalue" | "rvalue";
type Destination = "construction" | "assignment";

export function EmcppItem41PassByValueCostLab() {
  const stageRefs = useRef<Array<SVGGElement | null>>([]);
  const [inputKind, setInputKind] = useState<InputKind>("lvalue");
  const [destination, setDestination] = useState<Destination>("construction");
  const [polymorphicFault, setPolymorphicFault] = useState(false);

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      STEPS.forEach((step, index) => {
        tl.add(
          stageRefs.current[index]!,
          { opacity: [0, 1], duration: T * 0.55, ease: "out(3)" },
          index * T,
        );
        // label 对齐成本或参数语义阶段的起始时刻。
        tl.label(step.label, index * T);
      });
    },
  });

  const activeIndex = Math.min(STEPS.length - 1, timeline.currentStep);
  const activeStep = STEPS[activeIndex] ?? STEPS[0];
  const lvalue = inputKind === "lvalue";
  const assignment = destination === "assignment";
  const slicingFault = polymorphicFault && activeIndex >= 5;
  const parameterCost = lvalue ? "1 copy" : "1 move";
  const finalCost = assignment ? "move-assign" : "move-construct";

  function reset() {
    timeline.goToStep(0);
    setInputKind("lvalue");
    setDestination("construction");
    setPolymorphicFault(false);
  }

  return (
    <figure
      className="mdx-figure not-prose mx-auto my-8"
      data-visual-kind="emcpp-item-41-pass-by-value-cheap-move"
    >
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-6">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              Effective Modern C++ · Item 41
            </p>
            <h3 className="mt-1 text-lg font-semibold text-primary">
              先过三项 gate，再接受额外 move
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
              选择输入类别和 destination operation，观察 pass by value 与精确重载的成本差异；故障开关会把多态 base 按值传递变成 slicing。
            </p>
          </div>
          <span className="rounded-control border border-accent px-2 py-1 text-xs text-accent">
            ▷ 可交互
          </span>
        </div>

        <div className="mb-4 grid gap-3 sm:grid-cols-2">
          <label className="block text-xs text-secondary">
            <span className="mb-1 block font-semibold text-primary">caller input</span>
            <select
              aria-label="选择 lvalue 或 rvalue 输入"
              value={inputKind}
              onChange={(event) => setInputKind(event.target.value as InputKind)}
              className="min-h-11 w-full rounded-control border border-border bg-bg px-3 py-2 text-sm text-primary"
            >
              <option value="lvalue">lvalue · 需要 copy 到 parameter</option>
              <option value="rvalue">rvalue · 可 move 到 parameter</option>
            </select>
          </label>
          <label className="block text-xs text-secondary">
            <span className="mb-1 block font-semibold text-primary">destination operation</span>
            <select
              aria-label="选择 construction 或 assignment destination"
              value={destination}
              onChange={(event) => setDestination(event.target.value as Destination)}
              className="min-h-11 w-full rounded-control border border-border bg-bg px-3 py-2 text-sm text-primary"
            >
              <option value="construction">construction · 新建 element</option>
              <option value="assignment">assignment · 覆盖已有 storage</option>
            </select>
          </label>
          <label className="flex min-h-11 items-center gap-2 rounded-control border border-border px-3 py-2 text-xs text-secondary sm:col-span-2">
            <input
              type="checkbox"
              checked={polymorphicFault}
              onChange={(event) => setPolymorphicFault(event.target.checked)}
              className="accent-[var(--accent)]"
            />
            <span>
              <strong className="text-primary">注入多态/条件 copy 故障</strong>
              <br />
              模拟只在部分路径保存，或把 derived object 交给 base value
            </span>
          </label>
        </div>

        <svg
          viewBox="0 0 840 560"
          role="img"
          aria-label="Effective Modern C++ Item 41 专属教学时间线：比较 pass by value、const reference 与 rvalue overload、forwarding sink template 的成本，展示 lvalue copy、rvalue move、extra move tax、copyable cheap to move、always copied、conditional copy、assignment allocation 和 object slicing。可切换 lvalue/rvalue 与 construction/assignment，支持播放、暂停、单步、拖进度、重置和多态或条件 copy 故障注入。"
          className="mx-auto block h-auto w-full"
        >
          <defs>
            <marker id="emcpp-item41-cost-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill={C.border} />
            </marker>
            <marker id="emcpp-item41-fault-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill={C.danger} />
            </marker>
          </defs>

          <rect x="0" y="0" width="840" height="560" rx="14" fill={C.bg} />
          <text x="28" y="34" fontSize="16" fontWeight="700" fill={C.primary}>
            caller → parameter boundary → destination storage
          </text>
          <text x="28" y="58" fontSize="12" fill={C.secondary}>
            copy / move count · allocation reuse · interface complexity · type semantics
          </text>

          <rect x="28" y="78" width="784" height="122" rx="12" fill={C.elevated} stroke={C.border} strokeWidth="1.5" />
          <text x="48" y="105" fontSize="12" fontWeight="700" fill={C.accent}>
            当前 path：{inputKind} → {parameterCost} → {finalCost}
          </text>
          <rect x="48" y="122" width="170" height="34" rx="8" fill={C.elevated} stroke={C.border} strokeWidth="1.5" />
          <text x="133" y="144" textAnchor="middle" fontSize="12" fill={C.primary}>
            {lvalue ? "name lvalue" : "temporary rvalue"}
          </text>
          <line x1="232" y1="139" x2="294" y2="139" stroke={C.border} strokeWidth="2" markerEnd="url(#emcpp-item41-cost-arrow)" />
          <rect x="310" y="122" width="188" height="34" rx="8" fill={C.accent} fillOpacity="0.14" stroke={C.accent} strokeWidth="1.5" />
          <text x="404" y="144" textAnchor="middle" fontSize="12" fill={C.primary}>value parameter</text>
          <line x1="512" y1="139" x2="574" y2="139" stroke={slicingFault ? C.danger : C.border} strokeWidth={slicingFault ? 3 : 2} markerEnd={slicingFault ? "url(#emcpp-item41-fault-arrow)" : "url(#emcpp-item41-cost-arrow)"} />
          <rect x="590" y="122" width="190" height="34" rx="8" fill={slicingFault ? C.danger : C.elevated} fillOpacity={slicingFault ? 0.14 : 1} stroke={slicingFault ? C.danger : C.border} strokeWidth="1.5" />
          <text x="685" y="144" textAnchor="middle" fontSize="12" fill={C.primary}>
            {slicingFault ? "base value · sliced" : assignment ? "existing storage" : "new element"}
          </text>
          <text x="48" y="185" fontSize="11" fill={C.secondary}>
            额外 move 只有在 move cheap、parameter 必须独立拥有、且最终确实会存储时才值得
          </text>

          {STAGE_COPY.map((stage, index) => {
            const faultStage = slicingFault && index === 5;
            const selected = index === activeIndex;
            return (
              <g
                key={stage.title}
                ref={(node) => {
                  stageRefs.current[index] = node;
                }}
                style={{ opacity: 0 }}
              >
                <rect x="28" y="216" width="784" height="174" rx="12" fill={faultStage ? C.danger : index === 3 ? C.success : index === 4 ? C.warning : C.accent} fillOpacity="0.1" stroke={faultStage ? C.danger : selected ? C.accent : index === 3 ? C.success : index === 4 ? C.warning : C.accent} strokeWidth="1.5" />
                <text x="48" y="248" fontSize="12" fontWeight="700" fill={faultStage ? C.danger : selected ? C.accent : C.primary}>{stage.title}</text>
                <text x="48" y="278" fontSize="12" fill={C.primary}>{stage.lines[0]}</text>
                <text x="48" y="306" fontSize="12" fill={C.primary}>{stage.lines[1]}</text>
                <text x="48" y="348" fontSize="11" fill={faultStage ? C.danger : C.secondary}>{faultStage ? "故障注入：derived state 在 base value parameter 构造时被切掉" : stage.footer}</text>
              </g>
            );
          })}

          {slicingFault && (
            <g>
              <path d="M 748 202 C 716 230, 684 258, 646 286" fill="none" stroke={C.danger} strokeWidth="3" strokeDasharray="8 6" markerEnd="url(#emcpp-item41-fault-arrow)" />
              <rect x="160" y="394" width="520" height="28" rx="8" fill={C.warning} fillOpacity="0.14" stroke={C.danger} strokeWidth="1.5" />
              <text x="178" y="414" fontSize="11" fontWeight="700" fill={C.danger}>故障注入：derived state 在 base value parameter 构造时被切掉</text>
            </g>
          )}

          <line x1="72" y1="444" x2="768" y2="444" stroke={C.border} strokeWidth="2" markerEnd="url(#emcpp-item41-cost-arrow)" />
          {STEPS.slice(0, -1).map((step, index) => {
            const start = BOXES[index];
            const end = BOXES[index + 1];
            return <line key={`connector-${step.label}`} x1={start.x + 108} y1="430" x2={end.x - 10} y2="430" stroke={index < activeIndex ? C.success : C.border} strokeWidth={index < activeIndex ? 3 : 1.5} markerEnd="url(#emcpp-item41-cost-arrow)" />;
          })}
          {STEPS.map((step, index) => {
            const box = BOXES[index];
            const selected = index === activeIndex;
            const faultStage = slicingFault && index === 5;
            return (
              <g key={`step-card-${step.label}`}>
                <rect x={box.x} y={box.y} width="108" height="100" rx="12" fill={faultStage ? C.danger : selected ? C.accent : C.elevated} fillOpacity={faultStage || selected ? 0.16 : 1} stroke={faultStage ? C.danger : selected ? C.accent : C.border} strokeWidth={faultStage || selected ? 3 : 1.5} />
                <circle cx={box.x + 20} cy={box.y + 22} r="12" fill={faultStage ? C.danger : selected ? C.accent : C.bg} stroke={faultStage ? C.danger : selected ? C.accent : C.border} strokeWidth="1.5" />
                <text x={box.x + 20} y={box.y + 27} textAnchor="middle" fontSize="11" fill={selected || faultStage ? C.bg : C.primary}>{index + 1}</text>
                <text x={box.x + 54} y={box.y + 26} textAnchor="middle" fontSize="11" fontWeight="700" fill={faultStage ? C.danger : selected ? C.accent : C.primary}>{step.label}</text>
                <text x={box.x + 54} y={box.y + 55} textAnchor="middle" fontSize="11" fill={C.secondary}>{index === 0 ? "API" : index === 1 ? "lvalue" : index === 2 ? "rvalue" : index === 3 ? "gate" : index === 4 ? "cost" : "type"}</text>
                <text x={box.x + 54} y={box.y + 78} textAnchor="middle" fontSize="11" fill={faultStage ? C.danger : C.secondary}>{faultStage ? "check" : selected ? "active" : "ready"}</text>
              </g>
            );
          })}
          <text x="28" y="540" fontSize="11" fill={C.secondary}>当前步骤：{activeStep.label} · {activeStep.caption}</text>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="先预测 copy/move/allocation，再用三项 gate 和类型语义审查接口。"
          reset={{ label: "重置实验", ariaLabel: "重置 Item 41 参数成本实验", onClick: reset }}
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Item 41 的答案不是“永远按值”，而是把类型、control flow、destination 和多态语义放进同一张成本审计图。
      </figcaption>
    </figure>
  );
}
