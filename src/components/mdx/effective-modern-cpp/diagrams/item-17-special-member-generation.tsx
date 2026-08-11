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
    label: "scan",
    caption:
      "special member function generation 先扫描 declarations，再把 base/member 的能力合并到 default、copy、move 和 destructor",
  },
  {
    label: "copy",
    caption:
      "copy operations 按成员逐层复制；不可复制的 owner member 会让外层 copy operation 被定义为 deleted",
  },
  {
    label: "move",
    caption:
      "move operations 需要更严格的 implicit move eligibility：不能有 user-declared copy、move 或 destructor",
  },
  {
    label: "suppress",
    caption:
      "destructor suppresses move：rvalue 仍可绑定 const-reference copy，形成 silent copy fallback 而不是编译错误",
  },
  {
    label: "zero",
    caption:
      "Rule of Zero 让 RAII members 持有资源，外层不手写生命周期，memberwise capability composition 自动形成语义",
  },
  {
    label: "matrix",
    caption:
      "special-member contract matrix 用 traits、copy/move counters、vector relocation 和 moved-from tests 验证真实能力",
  },
];

const LABEL_TEXT: Readonly<Record<string, string>> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

const BOXES = STEPS.map((_, index) => ({
  x: 28 + index * 132,
  y: 356,
}));

export function EmcppItem17SpecialMemberLab() {
  const stageRefs = useRef<Array<SVGGElement | null>>([]);
  const [destructorFault, setDestructorFault] = useState(false);

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

  const activeIndex = Math.min(STEPS.length - 1, timeline.currentStep);
  const activeStep = STEPS[activeIndex] ?? STEPS[0];

  function reset() {
    timeline.goToStep(0);
    setDestructorFault(false);
  }

  return (
    <figure
      className="mdx-figure not-prose mx-auto my-8"
      data-visual-kind="emcpp-item-17-special-member-generation"
    >
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-6">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              Effective Modern C++ · Item 17
            </p>
            <h3 className="mt-1 text-lg font-semibold text-primary">
              declaration 改一处，整组 special members 都要重算
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
              按时间线观察 compiler 如何扫描 declaration、合并成员能力，再决定 copy、move
              和 destructor 的生成、删除或抑制。
            </p>
          </div>
        </div>

        <svg
          viewBox="0 0 840 520"
          role="img"
          aria-label="Effective Modern C++ Item 17 教学时间线：展示 special member function generation 如何扫描 class declarations 并组合 base/member 能力，展示 copy operations 的逐成员复制和不可复制 owner 导致的 deleted，展示 move operations 的 implicit move eligibility，展示 user-declared destructor 如何 suppress move 并形成 silent copy fallback，展示 Rule of Zero 和 RAII memberwise capability composition，最后用 special-member contract matrix 的 traits、copy/move counters、vector relocation 和 moved-from tests 验收。支持播放、暂停、单步、拖进度、重置和注入 user-declared destructor 故障。"
          className="mx-auto block h-auto w-full"
        >
          <defs>
            <marker
              id="emcpp-item17-special-arrow"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
            >
              <path d="M0,0 L6,3 L0,6 Z" fill={C.border} />
            </marker>
            <marker
              id="emcpp-item17-special-fault-arrow"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
            >
              <path d="M0,0 L6,3 L0,6 Z" fill={C.danger} />
            </marker>
          </defs>

          <rect x="0" y="0" width="840" height="520" rx="14" fill={C.bg} />
          <text x="28" y="34" fontSize="16" fontWeight="700" fill={C.primary}>
            declaration scan → eligibility → suppression → composed capability → evidence
          </text>
          <text x="28" y="58" fontSize="12" fill={C.secondary}>
            special member function generation · copy operations · move operations · Rule of Zero
          </text>

          <rect
            x="28"
            y="78"
            width="784"
            height="88"
            rx="12"
            fill={C.elevated}
            stroke={C.border}
            strokeWidth="1.5"
          />
          <text x="46" y="104" fontSize="12" fontWeight="700" fill={C.accent}>
            compiler 先看“声明存在”，再看 member 能力；它不会猜你的资源意图
          </text>
          <rect
            x="46"
            y="116"
            width="178"
            height="32"
            rx="8"
            fill={C.accent}
            fillOpacity="0.12"
            stroke={C.accent}
            strokeWidth="1.5"
          />
          <text
            x="135"
            y="137"
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill={C.primary}
          >
            class declarations
          </text>
          <line
            x1="242"
            y1="132"
            x2="314"
            y2="132"
            stroke={C.border}
            strokeWidth="2"
            markerEnd="url(#emcpp-item17-special-arrow)"
          />
          <rect
            x="332"
            y="116"
            width="168"
            height="32"
            rx="8"
            fill={C.success}
            fillOpacity="0.12"
            stroke={C.success}
            strokeWidth="1.5"
          />
          <text
            x="416"
            y="137"
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill={C.primary}
          >
            eligible operations
          </text>
          <line
            x1="518"
            y1="132"
            x2="590"
            y2="132"
            stroke={C.border}
            strokeWidth="2"
            markerEnd="url(#emcpp-item17-special-arrow)"
          />
          <rect
            x="608"
            y="116"
            width="186"
            height="32"
            rx="8"
            fill={destructorFault ? C.danger : C.warning}
            fillOpacity="0.12"
            stroke={destructorFault ? C.danger : C.warning}
            strokeWidth="1.5"
          />
          <text
            x="701"
            y="137"
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill={destructorFault ? C.danger : C.primary}
          >
            {destructorFault ? "move suppressed" : "copy + move intent"}
          </text>
          <text x="46" y="158" fontSize="11" fill={C.secondary}>
            “代码能接收 rvalue”只说明 overload 可匹配，不足以证明 move constructor 真的存在
          </text>

          {STEPS.map((step, index) => {
            const faulted = destructorFault && (index === 2 || index === 3);
            return (
              <g
                key={step.label}
                ref={(node) => {
                  stageRefs.current[index] = node;
                }}
                style={{ opacity: 0 }}
              >
                <rect
                  x="28"
                  y="184"
                  width="784"
                  height="140"
                  rx="12"
                  fill={faulted ? C.danger : C.accent}
                  fillOpacity="0.1"
                  stroke={faulted ? C.danger : C.accent}
                  strokeWidth="1.5"
                />

                {index === 0 && (
                  <>
                    <text
                      x="48"
                      y="212"
                      fontSize="12"
                      fontWeight="700"
                      fill={C.accent}
                    >
                      1 · scan：special member function generation 由 declaration 触发
                    </text>
                    <text x="48" y="241" fontSize="12" fill={C.primary}>
                      compiler 识别 default constructor、destructor、copy 和 move 的精确形式
                    </text>
                    <text x="48" y="267" fontSize="12" fill={C.primary}>
                      然后把 base/member 是否可构造、复制、移动、销毁的能力组合进外层结果
                    </text>
                    <text x="48" y="299" fontSize="11" fill={C.secondary}>
                      关键观察：= default 和 = delete 也是 user-declared declaration，会改变规则输入
                    </text>
                  </>
                )}

                {index === 1 && (
                  <>
                    <text
                      x="48"
                      y="212"
                      fontSize="12"
                      fontWeight="700"
                      fill={C.success}
                    >
                      2 · copy：copy operations 按 base/member 逐层复制
                    </text>
                    <text x="48" y="241" fontSize="12" fill={C.primary}>
                      所有 member 都可 copy：外层 copy constructor 与 copy assignment 才能保持可用
                    </text>
                    <text x="48" y="267" fontSize="12" fill={C.primary}>
                      unique owner member 不可复制：对应外层 copy operation 会被定义为 deleted
                    </text>
                    <text x="48" y="299" fontSize="11" fill={C.secondary}>
                      不要把“class 有 copy 语法”误当成“资源一定被安全复制”；先查 member contract
                    </text>
                  </>
                )}

                {index === 2 && (
                  <>
                    <text
                      x="48"
                      y="212"
                      fontSize="12"
                      fontWeight="700"
                      fill={faulted ? C.danger : C.warning}
                    >
                      3 · move：implicit move eligibility 比 copy 更保守
                    </text>
                    <text x="48" y="241" fontSize="12" fill={C.primary}>
                      没有 user-declared copy、move 或 destructor，且 base/member 支持 move，compiler 才考虑生成
                    </text>
                    <text x="48" y="267" fontSize="12" fill={C.primary}>
                      只写一个 move constructor 不会自动补 move assignment，也会影响隐式 copy
                    </text>
                    <text x="48" y="299" fontSize="11" fill={C.secondary}>
                      fault：给类型加上 destructor 后仍假设 move 存在；修法是显式 default 或重新设计资源边界
                    </text>
                  </>
                )}

                {index === 3 && (
                  <>
                    <text
                      x="48"
                      y="212"
                      fontSize="12"
                      fontWeight="700"
                      fill={faulted ? C.danger : C.warning}
                    >
                      4 · suppress：destructor suppresses move，rvalue 可能静默走 copy
                    </text>
                    <text x="48" y="241" fontSize="12" fill={C.primary}>
                      user-declared destructor 不论 body 是否只是日志，都会阻止 implicit move generation
                    </text>
                    <text x="48" y="267" fontSize="12" fill={C.primary}>
                      const-reference copy 能绑定 rvalue，所以程序继续编译，却出现 silent copy fallback
                    </text>
                    <text x="48" y="299" fontSize="11" fill={C.secondary}>
                      用 traits 看能力，用 copy/move counters 看实际路径；两者都不能只凭“能编译”推断
                    </text>
                  </>
                )}

                {index === 4 && (
                  <>
                    <text
                      x="48"
                      y="212"
                      fontSize="12"
                      fontWeight="700"
                      fill={C.success}
                    >
                      5 · zero：Rule of Zero 把生命周期交给 RAII members
                    </text>
                    <text x="48" y="241" fontSize="12" fill={C.primary}>
                      unique owner、string、vector 或 file wrapper 持有资源，外层 class 不直接写 destructor/copy/move
                    </text>
                    <text x="48" y="267" fontSize="12" fill={C.primary}>
                      memberwise capability composition 自动形成 move-only、copyable 或不可复制的真实语义
                    </text>
                    <text x="48" y="299" fontSize="11" fill={C.secondary}>
                      Rule of Zero 不是“不拥有资源”，而是“不手写资源生命周期”；成员类型承担责任
                    </text>
                  </>
                )}

                {index === 5 && (
                  <>
                    <text
                      x="48"
                      y="212"
                      fontSize="12"
                      fontWeight="700"
                      fill={C.success}
                    >
                      6 · matrix：把生成结论和真实行为一起验收
                    </text>
                    <text x="48" y="241" fontSize="12" fill={C.primary}>
                      static traits 覆盖 default/copy/move constructible、assignable 和 destructible
                    </text>
                    <text x="48" y="267" fontSize="12" fill={C.primary}>
                      vector relocation、counters、moved-from destructor 与 polymorphic slicing policy 补行为证据
                    </text>
                    <text x="48" y="299" fontSize="11" fill={C.secondary}>
                      先列 user-declared members，再推导生成/删除/抑制，最后用 matrix 固定 contract
                    </text>
                  </>
                )}
              </g>
            );
          })}

          {destructorFault && (
            <g>
              <path
                d="M 710 338 C 662 306, 610 270, 556 238"
                fill="none"
                stroke={C.danger}
                strokeWidth="3"
                strokeDasharray="8 6"
                markerEnd="url(#emcpp-item17-special-fault-arrow)"
              />
              <rect
                x="126"
                y="326"
                width="588"
                height="28"
                rx="8"
                fill={C.warning}
                fillOpacity="0.12"
                stroke={C.danger}
                strokeWidth="1.5"
              />
              <text
                x="144"
                y="346"
                fontSize="11"
                fontWeight="700"
                fill={C.danger}
              >
                故障注入：只加日志 destructor；修法：显式 default truthful move，或回到 Rule of Zero
              </text>
            </g>
          )}

          <line
            x1="82"
            y1="390"
            x2="756"
            y2="390"
            stroke={C.border}
            strokeWidth="2"
            markerEnd="url(#emcpp-item17-special-arrow)"
          />

          {STEPS.slice(0, -1).map((step, index) => {
            const start = BOXES[index];
            const end = BOXES[index + 1];
            return (
              <line
                key={`connector-${step.label}`}
                x1={start.x + 104}
                y1="378"
                x2={end.x - 10}
                y2="378"
                stroke={index < activeIndex ? C.success : C.border}
                strokeWidth={index < activeIndex ? 3 : 1.5}
                markerEnd="url(#emcpp-item17-special-arrow)"
              />
            );
          })}

          {STEPS.map((step, index) => {
            const box = BOXES[index];
            const selected = index === activeIndex;
            const faulted = destructorFault && (index === 2 || index === 3);
            return (
              <g key={`step-card-${step.label}`}>
                <rect
                  x={box.x}
                  y={box.y}
                  width="104"
                  height="104"
                  rx="12"
                  fill={faulted ? C.danger : selected ? C.accent : C.elevated}
                  fillOpacity={faulted || selected ? 0.16 : 1}
                  stroke={faulted ? C.danger : selected ? C.accent : C.border}
                  strokeWidth={faulted || selected ? 3 : 1.5}
                />
                <circle
                  cx={box.x + 20}
                  cy={box.y + 22}
                  r="12"
                  fill={faulted ? C.danger : selected ? C.accent : C.bg}
                  stroke={faulted ? C.danger : selected ? C.accent : C.border}
                  strokeWidth="1.5"
                />
                <text
                  x={box.x + 20}
                  y={box.y + 27}
                  textAnchor="middle"
                  fontSize="11"
                  fontWeight="700"
                  fill={faulted || selected ? C.bg : C.secondary}
                >
                  {index + 1}
                </text>
                <text
                  x={box.x + 56}
                  y={box.y + 27}
                  textAnchor="middle"
                  fontSize="12"
                  fontWeight="700"
                  fill={faulted ? C.danger : selected ? C.accent : C.primary}
                >
                  {step.label}
                </text>
                <text
                  x={box.x + 52}
                  y={box.y + 59}
                  textAnchor="middle"
                  fontSize="11"
                  fill={C.secondary}
                >
                  {index === 0
                    ? "扫描"
                    : index === 1
                      ? "复制"
                      : index === 2
                        ? "移动"
                        : index === 3
                          ? "抑制"
                          : index === 4
                            ? "零法则"
                            : "验收"}
                </text>
                <text
                  x={box.x + 52}
                  y={box.y + 82}
                  textAnchor="middle"
                  fontSize="11"
                  fill={faulted ? C.danger : selected ? C.accent : C.secondary}
                >
                  {faulted
                    ? "风险"
                    : index < 2
                      ? "生成"
                      : index < 4
                        ? "路径"
                        : index === 4
                          ? "组合"
                          : "测试"}
                </text>
              </g>
            );
          })}

          <rect
            x="28"
            y="478"
            width="784"
            height="26"
            rx="7"
            fill={C.success}
            fillOpacity="0.1"
            stroke={C.success}
            strokeWidth="1"
          />
          <text x="44" y="496" fontSize="11" fontWeight="700" fill={C.success}>
            当前验收门：{activeStep?.caption ?? "选择一个步骤"}
          </text>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="按步骤检查 declaration、copy/move eligibility、destructor suppression、Rule of Zero 和真实调用路径；单步可复核每个规则前提。"
          reset={{
            label: "重置时间线",
            ariaLabel: "重置 Item 17 special member generation 时间线",
            onClick: reset,
          }}
        />

        <button
          type="button"
          aria-pressed={destructorFault}
          onClick={() => setDestructorFault((value) => !value)}
          className={`mx-auto mt-3 block min-h-11 rounded-control border px-4 py-2 text-sm transition-colors ${
            destructorFault
              ? "border-danger bg-danger/10 text-danger"
              : "border-border text-secondary hover:border-danger hover:text-danger"
          }`}
        >
          {destructorFault ? "关闭 destructor 抑制故障" : "注入 destructor 抑制故障"}
        </button>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        special member 的决策顺序是：列出 user-declared declarations，推导每项 eligibility，再用 Rule of Zero 或显式 default 固定资源语义。
      </figcaption>
    </figure>
  );
}
