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
    label: "repeat",
    caption:
      "make_unique 与 make_shared 只写一次 element type，避免 smart-pointer type duplication",
  },
  {
    label: "gap",
    caption:
      "direct use of new 在 pre-C++17 多参数调用中暴露 allocation ownership gap，其他 argument 可能抛异常",
  },
  {
    label: "make",
    caption:
      "make function 在返回前完成 atomic ownership construction，形成更强的 exception safety 边界",
  },
  {
    label: "alloc",
    caption:
      "make_shared 通常把 object 与 control block 合并成 single allocation，而 direct path 是 split allocation",
  },
  {
    label: "weak",
    caption:
      "long-lived weak observer 会保留 retained combined allocation；object lifetime 与 storage release 不是一回事",
  },
  {
    label: "exceptions",
    caption:
      "custom deleter limitation、braced list、private constructor 与 class-specific allocation 是有证据的例外",
  },
];

const LABEL_TEXT: Readonly<Record<string, string>> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

const BOXES = STEPS.map((_, index) => ({
  x: 28 + index * 135,
  y: 330,
}));

export function EmcppItem21MakeSmartPointersLab() {
  const stageRefs = useRef<Array<SVGGElement | null>>([]);
  const [leakWindowFault, setLeakWindowFault] = useState(false);

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      STEPS.forEach((step, index) => {
        tl.add(
          stageRefs.current[index]!,
          { opacity: [0, 1], duration: T * 0.55, ease: "out(3)" },
          index * T,
        );
        // label 对齐 allocation topology 变化的起点，确保字幕与步骤同步。
        tl.label(step.label, index * T);
      });
    },
  });

  const activeIndex = Math.min(STEPS.length - 1, timeline.currentStep);
  const activeStep = STEPS[activeIndex];

  function reset() {
    timeline.goToStep(0);
    setLeakWindowFault(false);
  }

  return (
    <figure
      className="mdx-figure not-prose mx-auto my-8"
      data-visual-kind="emcpp-item-21-make-smart-pointers"
    >
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-6">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              Effective Modern C++ · Item 21
            </p>
            <h3 className="mt-1 text-lg font-semibold text-primary">
              让资源在“可抛窗口”之前进入 owner
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
              先画 allocation 与 owner 的连接，再比较 make function 如何关闭
              handoff gap，以及 single allocation 的生命周期成本。
            </p>
          </div>
        </div>

        <svg
          viewBox="0 0 840 470"
          role="img"
          aria-label="Effective Modern C++ Item 21 make smart pointers 教学时间线：比较 make_unique、make_shared 与 direct use of new 的类型重复和 exception safety，展示 pre-C++17 argument evaluation interleaving 造成的 allocation ownership gap，make function 的 atomic ownership construction，make_shared 的 single allocation 与 split allocation，long-lived weak observer 对 retained combined allocation 的影响，最后列出 custom deleter limitation、braced list、private constructor 和 class-specific allocation 的例外。可播放、暂停、单步、拖进度、重置，并可注入 direct new 的异常泄漏窗口故障。"
          className="mx-auto block h-auto w-full"
        >
          <defs>
            <marker
              id="emcpp-item21-make-arrow"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
            >
              <path d="M0,0 L6,3 L0,6 Z" fill={C.border} />
            </marker>
            <marker
              id="emcpp-item21-make-fault-arrow"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
            >
              <path d="M0,0 L6,3 L0,6 Z" fill={C.danger} />
            </marker>
          </defs>

          <rect x="0" y="0" width="840" height="470" rx="14" fill={C.bg} />
          <text x="28" y="34" fontSize="16" fontWeight="700" fill={C.primary}>
            allocate → construct → own → release
          </text>
          <text x="28" y="58" fontSize="12" fill={C.secondary}>
            direct new gap · make boundary · single/split allocation · weak
            retention · exceptions
          </text>

          <rect
            x="28"
            y="82"
            width="784"
            height="86"
            rx="12"
            fill={C.elevated}
            stroke={C.border}
            strokeWidth="1.5"
          />
          <text x="46" y="108" fontSize="12" fontWeight="700" fill={C.accent}>
            两条 construction topology
          </text>
          <rect
            x="46"
            y="120"
            width="286"
            height="32"
            rx="8"
            fill={C.warning}
            fillOpacity="0.1"
            stroke={C.warning}
            strokeWidth="1.5"
          />
          <text
            x="189"
            y="141"
            textAnchor="middle"
            fontSize="12"
            fill={C.primary}
          >
            new Widget → raw gap → shared_ptr
          </text>
          <line
            x1="348"
            y1="136"
            x2="402"
            y2="136"
            stroke={C.border}
            strokeWidth="2"
            markerEnd="url(#emcpp-item21-make-arrow)"
          />
          <rect
            x="418"
            y="120"
            width="376"
            height="32"
            rx="8"
            fill={C.success}
            fillOpacity="0.1"
            stroke={C.success}
            strokeWidth="1.5"
          />
          <text
            x="606"
            y="141"
            textAnchor="middle"
            fontSize="12"
            fill={C.primary}
          >
            make_shared&lt;Widget&gt; → owner returned
          </text>
          <text x="46" y="160" fontSize="11" fill={C.secondary}>
            左侧 owner 尚未接管时允许外部可抛操作插入；右侧 factory 把
            acquisition 和 handoff 封装在一个调用里
          </text>

          {STEPS.map((step, index) => {
            const failed = leakWindowFault && index === 1;
            return (
              <g
                key={step.label}
                ref={(node) => {
                  stageRefs.current[index] = node;
                }}
                style={{ opacity: 0 }}
              >
                {index === 0 && (
                  <>
                    <rect
                      x="28"
                      y="180"
                      width="784"
                      height="112"
                      rx="12"
                      fill={C.accent}
                      fillOpacity="0.1"
                      stroke={C.accent}
                      strokeWidth="1.5"
                    />
                    <text
                      x="48"
                      y="207"
                      fontSize="12"
                      fontWeight="700"
                      fill={C.accent}
                    >
                      make_unique / make_shared：减少类型重复
                    </text>
                    <text x="48" y="235" fontSize="12" fill={C.primary}>
                      std::shared_ptr&lt;Widget&gt; first(new Widget(args));
                    </text>
                    <text x="48" y="259" fontSize="12" fill={C.primary}>
                      auto second = std::make_shared&lt;Widget&gt;(args); //
                      Widget 只写一次
                    </text>
                    <text x="48" y="282" fontSize="11" fill={C.secondary}>
                      少一个重复点，也让 acquisition、construction 和 ownership
                      建立成为同一个意图
                    </text>
                  </>
                )}

                {index === 1 && (
                  <>
                    <rect
                      x="28"
                      y="180"
                      width="784"
                      height="112"
                      rx="12"
                      fill={failed ? C.danger : C.warning}
                      fillOpacity="0.1"
                      stroke={failed ? C.danger : C.warning}
                      strokeWidth="1.5"
                    />
                    <text
                      x="48"
                      y="207"
                      fontSize="12"
                      fontWeight="700"
                      fill={failed ? C.danger : C.warning}
                    >
                      pre-C++17：argument evaluation interleaving 打开 leak
                      window
                    </text>
                    <text x="48" y="235" fontSize="12" fill={C.primary}>
                      new Widget → ??? → shared_ptr constructor
                    </text>
                    <text
                      x="48"
                      y="259"
                      fontSize="12"
                      fill={failed ? C.danger : C.primary}
                    >
                      另一参数 computePriority() 若先抛异常，raw Widget 尚未进入
                      owner
                    </text>
                    <text x="48" y="282" fontSize="11" fill={C.secondary}>
                      同一行不是原子 ownership action；把 direct new
                      和其他可抛参数拆开才能守住边界
                    </text>
                  </>
                )}

                {index === 2 && (
                  <>
                    <rect
                      x="28"
                      y="180"
                      width="784"
                      height="112"
                      rx="12"
                      fill={C.success}
                      fillOpacity="0.1"
                      stroke={C.success}
                      strokeWidth="1.5"
                    />
                    <text
                      x="48"
                      y="207"
                      fontSize="12"
                      fontWeight="700"
                      fill={C.success}
                    >
                      make function：返回前完成 atomic ownership construction
                    </text>
                    <rect
                      x="48"
                      y="222"
                      width="170"
                      height="42"
                      rx="8"
                      fill={C.elevated}
                      stroke={C.border}
                    />
                    <text
                      x="133"
                      y="248"
                      textAnchor="middle"
                      fontSize="12"
                      fill={C.primary}
                    >
                      allocate + construct
                    </text>
                    <line
                      x1="224"
                      y1="243"
                      x2="310"
                      y2="243"
                      stroke={C.success}
                      strokeWidth="3"
                      markerEnd="url(#emcpp-item21-make-arrow)"
                    />
                    <rect
                      x="316"
                      y="222"
                      width="174"
                      height="42"
                      rx="8"
                      fill={C.elevated}
                      stroke={C.border}
                    />
                    <text
                      x="403"
                      y="248"
                      textAnchor="middle"
                      fontSize="12"
                      fill={C.primary}
                    >
                      owner established
                    </text>
                    <line
                      x1="496"
                      y1="243"
                      x2="582"
                      y2="243"
                      stroke={C.success}
                      strokeWidth="3"
                      markerEnd="url(#emcpp-item21-make-arrow)"
                    />
                    <rect
                      x="588"
                      y="222"
                      width="176"
                      height="42"
                      rx="8"
                      fill={C.elevated}
                      stroke={C.border}
                    />
                    <text
                      x="676"
                      y="248"
                      textAnchor="middle"
                      fontSize="12"
                      fill={C.primary}
                    >
                      external args may throw
                    </text>
                    <text x="48" y="282" fontSize="11" fill={C.secondary}>
                      factory body 内部不允许外部 argument 插入 acquisition 与
                      owner 建立之间
                    </text>
                  </>
                )}

                {index === 3 && (
                  <>
                    <rect
                      x="28"
                      y="180"
                      width="784"
                      height="112"
                      rx="12"
                      fill={C.accent}
                      fillOpacity="0.1"
                      stroke={C.accent}
                      strokeWidth="1.5"
                    />
                    <text
                      x="48"
                      y="207"
                      fontSize="12"
                      fontWeight="700"
                      fill={C.accent}
                    >
                      make_shared：single allocation vs split allocation
                    </text>
                    <rect
                      x="48"
                      y="222"
                      width="310"
                      height="42"
                      rx="8"
                      fill={C.elevated}
                      stroke={C.border}
                    />
                    <text
                      x="203"
                      y="248"
                      textAnchor="middle"
                      fontSize="12"
                      fill={C.primary}
                    >
                      object + control block：single
                    </text>
                    <rect
                      x="384"
                      y="222"
                      width="174"
                      height="42"
                      rx="8"
                      fill={C.elevated}
                      stroke={C.border}
                    />
                    <text
                      x="471"
                      y="248"
                      textAnchor="middle"
                      fontSize="12"
                      fill={C.primary}
                    >
                      object：split
                    </text>
                    <rect
                      x="584"
                      y="222"
                      width="180"
                      height="42"
                      rx="8"
                      fill={C.elevated}
                      stroke={C.border}
                    />
                    <text
                      x="674"
                      y="248"
                      textAnchor="middle"
                      fontSize="12"
                      fill={C.primary}
                    >
                      block：split
                    </text>
                    <text x="48" y="282" fontSize="11" fill={C.secondary}>
                      single 通常减少 allocation calls 和
                      metadata；标准不承诺具体 layout，需按 ABI 验证
                    </text>
                  </>
                )}

                {index === 4 && (
                  <>
                    <rect
                      x="28"
                      y="180"
                      width="784"
                      height="112"
                      rx="12"
                      fill={C.warning}
                      fillOpacity="0.1"
                      stroke={C.warning}
                      strokeWidth="1.5"
                    />
                    <text
                      x="48"
                      y="207"
                      fontSize="12"
                      fontWeight="700"
                      fill={C.warning}
                    >
                      weak observer：object lifetime 不等于 storage release
                    </text>
                    <text x="48" y="235" fontSize="12" fill={C.primary}>
                      strong count → 0：Widget destructor 执行；weak count &gt;
                      0：combined allocation 仍保留
                    </text>
                    <text x="48" y="259" fontSize="12" fill={C.primary}>
                      巨大 object + 长寿命 weak cache 可能让 make_shared 占用比
                      split path 更多 memory
                    </text>
                    <text x="48" y="282" fontSize="11" fill={C.secondary}>
                      必须分别记录 object lifetime 与 control-block/storage
                      lifetime，再决定拓扑
                    </text>
                  </>
                )}

                {index === 5 && (
                  <>
                    <rect
                      x="28"
                      y="180"
                      width="784"
                      height="112"
                      rx="12"
                      fill={C.success}
                      fillOpacity="0.1"
                      stroke={C.success}
                      strokeWidth="1.5"
                    />
                    <text
                      x="48"
                      y="207"
                      fontSize="12"
                      fontWeight="700"
                      fill={C.success}
                    >
                      例外决策：优先 make，但先检查 contract
                    </text>
                    <text x="48" y="235" fontSize="12" fill={C.primary}>
                      custom deleter limitation · braced list · private
                      constructor
                    </text>
                    <text x="48" y="259" fontSize="12" fill={C.primary}>
                      class-specific allocation · allocate_shared · immediate
                      owner handoff
                    </text>
                    <text x="48" y="282" fontSize="11" fill={C.secondary}>
                      例外不是回到无保护 raw new；仍要在独立 full expression
                      中立即建立 owner
                    </text>
                  </>
                )}
              </g>
            );
          })}

          {leakWindowFault && (
            <g>
              <path
                d="M 612 302 C 592 278, 584 250, 590 226"
                fill="none"
                stroke={C.danger}
                strokeWidth="3"
                strokeDasharray="8 6"
                markerEnd="url(#emcpp-item21-make-fault-arrow)"
              />
              <rect
                x="174"
                y="300"
                width="492"
                height="30"
                rx="8"
                fill={C.warning}
                fillOpacity="0.12"
                stroke={C.danger}
                strokeWidth="1.5"
              />
              <text
                x="192"
                y="321"
                fontSize="11"
                fontWeight="700"
                fill={C.danger}
              >
                故障：priority 抛异常时 raw Widget 无 owner；修法：make_shared
                或先独立建立 local owner
              </text>
            </g>
          )}

          <line
            x1="82"
            y1="388"
            x2="756"
            y2="388"
            stroke={C.border}
            strokeWidth="2"
            markerEnd="url(#emcpp-item21-make-arrow)"
          />

          {STEPS.slice(0, -1).map((step, index) => {
            const start = BOXES[index];
            const end = BOXES[index + 1];
            return (
              <line
                key={`connector-${step.label}`}
                x1={start.x + 110}
                y1="376"
                x2={end.x - 10}
                y2="376"
                stroke={index < activeIndex ? C.success : C.border}
                strokeWidth={index < activeIndex ? 3 : 1.5}
                markerEnd="url(#emcpp-item21-make-arrow)"
              />
            );
          })}

          {STEPS.map((step, index) => {
            const box = BOXES[index];
            const selected = index === activeIndex;
            const failed = leakWindowFault && index === 1;
            return (
              <g key={`step-card-${step.label}`}>
                <rect
                  x={box.x}
                  y={box.y}
                  width="110"
                  height="104"
                  rx="12"
                  fill={failed ? C.danger : selected ? C.accent : C.elevated}
                  fillOpacity={failed || selected ? 0.16 : 1}
                  stroke={failed ? C.danger : selected ? C.accent : C.border}
                  strokeWidth={failed || selected ? 3 : 1.5}
                />
                <circle
                  cx={box.x + 20}
                  cy={box.y + 22}
                  r="12"
                  fill={failed ? C.danger : selected ? C.accent : C.bg}
                  stroke={failed ? C.danger : selected ? C.accent : C.border}
                  strokeWidth="1.5"
                />
                <text
                  x={box.x + 20}
                  y={box.y + 27}
                  textAnchor="middle"
                  fontSize="11"
                  fontWeight="700"
                  fill={failed || selected ? C.bg : C.secondary}
                >
                  {index + 1}
                </text>
                <text
                  x={box.x + 55}
                  y={box.y + 27}
                  textAnchor="middle"
                  fontSize="12"
                  fontWeight="700"
                  fill={failed ? C.danger : selected ? C.accent : C.primary}
                >
                  {step.label}
                </text>
                <text
                  x={box.x + 55}
                  y={box.y + 59}
                  textAnchor="middle"
                  fontSize="11"
                  fill={C.secondary}
                >
                  {index === 0
                    ? "type"
                    : index === 1
                      ? "gap"
                      : index === 2
                        ? "owner"
                        : index === 3
                          ? "topology"
                          : index === 4
                            ? "weak"
                            : "exceptions"}
                </text>
                <text
                  x={box.x + 55}
                  y={box.y + 82}
                  textAnchor="middle"
                  fontSize="11"
                  fill={failed ? C.danger : selected ? C.accent : C.secondary}
                >
                  {failed
                    ? "leak"
                    : index === 0
                      ? "dedupe"
                      : index === 1
                        ? "throw"
                        : index === 2
                          ? "safe"
                          : index === 3
                            ? "allocate"
                            : index === 4
                              ? "retain"
                              : "decide"}
                </text>
              </g>
            );
          })}

          <rect
            x="28"
            y="444"
            width="784"
            height="20"
            rx="7"
            fill={C.success}
            fillOpacity="0.1"
            stroke={C.success}
            strokeWidth="1"
          />
          <text x="44" y="458" fontSize="11" fontWeight="700" fill={C.success}>
            当前验收门：{activeStep.caption}
          </text>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="每个 label 位于 allocation topology 的关键转换起点；可单步检查异常窗口、storage retention 和例外边界。"
          reset={{
            label: "重置时间线",
            ariaLabel: "重置 Item 21 make smart pointers 时间线",
            onClick: reset,
          }}
        />

        <button
          type="button"
          aria-pressed={leakWindowFault}
          onClick={() => setLeakWindowFault((value) => !value)}
          className={`mx-auto mt-3 block min-h-11 rounded-control border px-4 py-2 text-sm transition-colors ${
            leakWindowFault
              ? "border-danger bg-danger/10 text-danger"
              : "border-border text-secondary hover:border-danger hover:text-danger"
          }`}
        >
          {leakWindowFault
            ? "关闭 direct new 泄漏故障"
            : "注入 direct new 泄漏故障"}
        </button>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        “优先 make”是默认的异常安全策略；遇到例外时仍要画出 ownership
        handoff，并用测试证明没有 leak window。
      </figcaption>
    </figure>
  );
}
