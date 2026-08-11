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
    label: "inputs",
    caption:
      "先看 API 收到的是 constructor arguments 还是 existing value_type；这决定有没有 temporary 可以省掉",
  },
  {
    label: "temporary",
    caption:
      "emplacement 把 arguments forward 到最终 storage，可能跳过一个 value temporary 的 move 与销毁",
  },
  {
    label: "existing",
    caption:
      "caller 已有 Widget 时，push_back 与 emplace_back 都只能 copy 或 move 它，emplace 没有魔法收益",
  },
  {
    label: "reject",
    caption:
      "关联容器可能先构造 candidate 再发现 duplicate；失败插入会把 speculative work 变成成本",
  },
  {
    label: "explicit",
    caption:
      "direct initialization 能看到 explicit constructor，输入面更宽，同时削弱了 insertion 的类型摩擦",
  },
  {
    label: "ownership",
    caption:
      "先用 make_shared 建立 resource management ownership，再交给 container，最后用实测决定 API",
  },
];

const LABEL_TEXT: Readonly<Record<string, string>> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

const BOXES = STEPS.map((_, index) => ({
  x: 28 + index * 132,
  y: 356,
}));

export function EmcppItem42EmplacementLab() {
  const stageRefs = useRef<Array<SVGGElement | null>>([]);
  const [blindEmplaceFault, setBlindEmplaceFault] = useState(false);

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
    setBlindEmplaceFault(false);
  }

  return (
    <figure
      className="mdx-figure not-prose mx-auto my-8"
      data-visual-kind="emcpp-item-42-consider-emplacement"
    >
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-6">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              Effective Modern C++ · Item 42
            </p>
            <h3 className="mt-1 text-lg font-semibold text-primary">
              追踪一个 element 从参数到 ownership
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
              emplace 的收益只发生在构造链上；判重、explicit
              constructor、resource management 和 reallocation 仍要单独验收。
            </p>
          </div>
        </div>

        <svg
          viewBox="0 0 840 520"
          role="img"
          aria-label="Effective Modern C++ Item 42 教学时间线：比较 insertion 和 emplacement 的参数入口，展示 temporary object 是否被消除，existing value 的 copy 或 move，关联容器 duplicate rejection 的 speculative construction，explicit constructor 的 direct initialization 输入面，以及先建立 resource management ownership 再进入 container。支持播放、暂停、单步、拖进度、重置和注入盲目 emplace 故障。"
          className="mx-auto block h-auto w-full"
        >
          <defs>
            <marker
              id="emcpp-item42-emplace-arrow"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
            >
              <path d="M0,0 L6,3 L0,6 Z" fill={C.border} />
            </marker>
            <marker
              id="emcpp-item42-emplace-fault-arrow"
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
            arguments → construction → acceptance → ownership → measurement
          </text>
          <text x="28" y="58" fontSize="12" fill={C.secondary}>
            insertion · emplacement · temporary object · duplicate · explicit ·
            RAII
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
            两条入口：同一目标 element，不同的构造边界
          </text>
          <rect
            x="46"
            y="116"
            width="236"
            height="32"
            rx="8"
            fill={C.warning}
            fillOpacity="0.12"
            stroke={C.warning}
            strokeWidth="1.5"
          />
          <text
            x="164"
            y="137"
            textAnchor="middle"
            fontSize="12"
            fill={C.primary}
          >
            insertion：先有 value
          </text>
          <line
            x1="298"
            y1="132"
            x2="360"
            y2="132"
            stroke={C.border}
            strokeWidth="2"
            markerEnd="url(#emcpp-item42-emplace-arrow)"
          />
          <rect
            x="378"
            y="116"
            width="176"
            height="32"
            rx="8"
            fill={C.success}
            fillOpacity="0.12"
            stroke={C.success}
            strokeWidth="1.5"
          />
          <text
            x="466"
            y="137"
            textAnchor="middle"
            fontSize="12"
            fill={C.primary}
          >
            emplacement：传参数
          </text>
          <line
            x1="570"
            y1="132"
            x2="632"
            y2="132"
            stroke={C.border}
            strokeWidth="2"
            markerEnd="url(#emcpp-item42-emplace-arrow)"
          />
          <rect
            x="650"
            y="116"
            width="144"
            height="32"
            rx="8"
            fill={blindEmplaceFault ? C.danger : C.accent}
            fillOpacity="0.12"
            stroke={blindEmplaceFault ? C.danger : C.accent}
            strokeWidth="1.5"
          />
          <text
            x="722"
            y="137"
            textAnchor="middle"
            fontSize="12"
            fill={C.primary}
          >
            仍需验收
          </text>
          <text x="46" y="158" fontSize="11" fill={C.secondary}>
            少一个 temporary 不等于少所有 container、判重、扩容或 lifetime 成本
          </text>

          {STEPS.map((step, index) => {
            const faulted = blindEmplaceFault && (index === 3 || index === 4);
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
                      1 · inputs：先识别输入形态
                    </text>
                    <text x="48" y="241" fontSize="12" fill={C.primary}>
                      push_back(Widget(10, true))：外部先形成 value，再交给
                      container
                    </text>
                    <text x="48" y="267" fontSize="12" fill={C.primary}>
                      emplace_back(10, true)：container 接收 arguments，稍后调用
                      constructor
                    </text>
                    <text x="48" y="299" fontSize="11" fill={C.secondary}>
                      问题不是“哪个名字更现代”，而是 temporary 是否已经存在
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
                      2 · temporary：把构造搬到最终 storage
                    </text>
                    <text x="48" y="241" fontSize="12" fill={C.primary}>
                      insertion：构造 temporary → move-construct element →
                      destroy temporary
                    </text>
                    <text x="48" y="267" fontSize="12" fill={C.primary}>
                      emplacement：arguments → 直接构造 element，可能省掉这一段
                      value temporary
                    </text>
                    <text x="48" y="299" fontSize="11" fill={C.secondary}>
                      move 便宜、copy elision 或实现路径相同，收益仍需
                      measurement 证明
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
                      fill={C.warning}
                    >
                      3 · existing value：没有可回收的 caller construction
                    </text>
                    <text x="48" y="241" fontSize="12" fill={C.primary}>
                      Widget widget; push_back(widget) 与 emplace_back(widget)
                      都 copy
                    </text>
                    <text x="48" y="267" fontSize="12" fill={C.primary}>
                      传 std::move(widget) 时两者都 move；push_back
                      的意图通常更直接
                    </text>
                    <text x="48" y="299" fontSize="11" fill={C.secondary}>
                      emplace 只能改变新 element
                      的入口，不能撤销已经发生的对象构造
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
                      fill={faulted ? C.danger : C.accent}
                    >
                      4 · duplicate rejection：候选可能先构造后被拒绝
                    </text>
                    <text x="48" y="241" fontSize="12" fill={C.primary}>
                      set/map 需要判重；emplace 可能先 allocate、construct
                      candidate，再发现 duplicate
                    </text>
                    <text x="48" y="267" fontSize="12" fill={C.primary}>
                      expensive constructor 的 speculative work
                      随失败路径一起被销毁
                    </text>
                    <text x="48" y="299" fontSize="11" fill={C.secondary}>
                      成功插入和 duplicate rejection 要分开测；map 还应比较
                      try_emplace
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
                      fill={faulted ? C.danger : C.warning}
                    >
                      5 · explicit constructor：能力扩大也是风险面
                    </text>
                    <text x="48" y="241" fontSize="12" fill={C.primary}>
                      direct initialization 能调用 explicit constructor，emplace
                      可能编译而 push 被拒绝
                    </text>
                    <text x="48" y="267" fontSize="12" fill={C.primary}>
                      先核对 overload、narrowing、initializer_list
                      与参数语义，再接受这次宽松入口
                    </text>
                    <text x="48" y="299" fontSize="11" fill={C.secondary}>
                      “能 emplace”只证明可构造，不证明选型、类型防线和行为更正确
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
                      6 · ownership：先建立 RAII，再进入 container
                    </text>
                    <text x="48" y="241" fontSize="12" fill={C.primary}>
                      emplace_back(new Widget) 让 raw pointer 在 ownership
                      建立前暴露 exception window
                    </text>
                    <text x="48" y="267" fontSize="12" fill={C.primary}>
                      make_shared / make_unique 先接管资源；随后 push 或 emplace
                      都能保持清晰 ownership
                    </text>
                    <text x="48" y="299" fontSize="11" fill={C.secondary}>
                      固定 capacity，分别计数
                      constructor、move、allocator、reject，再做 API 决策
                    </text>
                  </>
                )}
              </g>
            );
          })}

          {blindEmplaceFault && (
            <g>
              <path
                d="M 706 338 C 662 306, 614 274, 556 238"
                fill="none"
                stroke={C.danger}
                strokeWidth="3"
                strokeDasharray="8 6"
                markerEnd="url(#emcpp-item42-emplace-fault-arrow)"
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
                故障注入：盲目 emplace 让 duplicate 和 explicit
                输入风险被隐藏；修法：先证明构造收益与语义
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
            markerEnd="url(#emcpp-item42-emplace-arrow)"
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
                markerEnd="url(#emcpp-item42-emplace-arrow)"
              />
            );
          })}

          {STEPS.map((step, index) => {
            const box = BOXES[index];
            const selected = index === activeIndex;
            const faulted = blindEmplaceFault && (index === 3 || index === 4);
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
                    ? "入口"
                    : index === 1
                      ? "临时值"
                      : index === 2
                        ? "已有值"
                        : index === 3
                          ? "判重"
                          : index === 4
                            ? "构造"
                            : "所有权"}
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
                      ? "构造链"
                      : index < 4
                        ? "取舍"
                        : index === 4
                          ? "边界"
                          : "测量"}
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
            当前验收门：{activeStep.caption}
          </text>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="按步骤检查 temporary、判重、constructor selection、ownership 和测量证据；单步最适合复现失败插入路径。"
          reset={{
            label: "重置时间线",
            ariaLabel: "重置 Item 42 emplacement 时间线",
            onClick: reset,
          }}
        />

        <button
          type="button"
          aria-pressed={blindEmplaceFault}
          onClick={() => setBlindEmplaceFault((value) => !value)}
          className={`mx-auto mt-3 block min-h-11 rounded-control border px-4 py-2 text-sm transition-colors ${
            blindEmplaceFault
              ? "border-danger bg-danger/10 text-danger"
              : "border-border text-secondary hover:border-danger hover:text-danger"
          }`}
        >
          {blindEmplaceFault
            ? "关闭盲目 emplace 故障"
            : "注入盲目 emplace 故障"}
        </button>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Item 42 的结论是“考虑 emplacement”，不是“无条件替换 insertion”：先证明
        temporary 消除带来的收益，再证明判重、类型边界、ownership 和 lifetime
        没有退化。
      </figcaption>
    </figure>
  );
}
