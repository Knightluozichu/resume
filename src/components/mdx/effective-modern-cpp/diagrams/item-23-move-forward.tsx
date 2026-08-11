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
    label: "cast",
    caption:
      "std move 是无条件 cast：只把 expression 变成 xvalue，不搬运 bytes；target overload 才决定 copy 还是 move",
  },
  {
    label: "select",
    caption:
      "cast not move 的关键证据是 move-overload selection：检查 target 是否真的声明可用的 move operation",
  },
  {
    label: "named",
    caption:
      "named-reference lvalue rule：参数有名字后 expression 是 lvalue，需要在最后一次使用点显式 std::move",
  },
  {
    label: "const",
    caption:
      "const rvalue 仍带 const；cv-preserving move cast 不能绑定普通 non-const move，常静默退回 copy",
  },
  {
    label: "forward",
    caption:
      "std forward 是 conditional cast：用 deduced T 和 reference collapsing 恢复 caller 的 lvalue/rvalue category",
  },
  {
    label: "matrix",
    caption:
      "move-forward contract matrix 同时覆盖 overload probes、counters、moved-from state、const path 和 NRVO",
  },
];

const LABEL_TEXT: Readonly<Record<string, string>> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

const BOXES = STEPS.map((_, index) => ({
  x: 28 + index * 132,
  y: 356,
}));

export function EmcppItem23MoveForwardLab() {
  const stageRefs = useRef<Array<SVGGElement | null>>([]);
  const [forwardingFault, setForwardingFault] = useState(false);

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
    setForwardingFault(false);
  }

  return (
    <figure
      className="mdx-figure not-prose mx-auto my-8"
      data-visual-kind="emcpp-item-23-move-forward"
    >
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-6">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              Effective Modern C++ · Item 23
            </p>
            <h3 className="mt-1 text-lg font-semibold text-primary">
              先看 value category，再看资源是否真的移动
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
              这张图把 cast、overload selection、named parameter、const 和 forwarding
              放进同一条可暂停的因果链。
            </p>
          </div>
        </div>

        <svg
          viewBox="0 0 840 520"
          role="img"
          aria-label="Effective Modern C++ Item 23 教学时间线：展示 std move 是无条件 cast 而不是资源搬运，展示 cast not move 与 move-overload selection，展示 named rvalue-reference parameter 在函数体中是 lvalue，展示 const rvalue 和 cv-preserving move cast 导致 copy，展示 std forward 的 conditional cast、deduced T 和 reference collapsing，最后用 move-forward contract matrix 验收 overload probes、copy/move counters、moved-from state、const path 和 NRVO。支持播放、暂停、单步、拖进度、重置和注入 forwarding 参数误区。"
          className="mx-auto block h-auto w-full"
        >
          <defs>
            <marker
              id="emcpp-item23-move-forward-arrow"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
            >
              <path d="M0,0 L6,3 L0,6 Z" fill={C.border} />
            </marker>
            <marker
              id="emcpp-item23-move-forward-fault-arrow"
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
            expression category → cast intent → overload behavior → evidence
          </text>
          <text x="28" y="58" fontSize="12" fill={C.secondary}>
            std move · std forward · cast not move · named parameter · const rvalue · conditional cast
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
            工具只改变 expression 语义，target operation 才决定资源行为
          </text>
          <rect
            x="46"
            y="116"
            width="166"
            height="32"
            rx="8"
            fill={C.accent}
            fillOpacity="0.12"
            stroke={C.accent}
            strokeWidth="1.5"
          />
          <text
            x="129"
            y="137"
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill={C.primary}
          >
            source expression
          </text>
          <line
            x1="230"
            y1="132"
            x2="304"
            y2="132"
            stroke={C.border}
            strokeWidth="2"
            markerEnd="url(#emcpp-item23-move-forward-arrow)"
          />
          <rect
            x="322"
            y="116"
            width="166"
            height="32"
            rx="8"
            fill={C.success}
            fillOpacity="0.12"
            stroke={C.success}
            strokeWidth="1.5"
          />
          <text
            x="405"
            y="137"
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill={C.primary}
          >
            move / forward cast
          </text>
          <line
            x1="506"
            y1="132"
            x2="580"
            y2="132"
            stroke={C.border}
            strokeWidth="2"
            markerEnd="url(#emcpp-item23-move-forward-arrow)"
          />
          <rect
            x="598"
            y="116"
            width="196"
            height="32"
            rx="8"
            fill={forwardingFault ? C.danger : C.warning}
            fillOpacity="0.12"
            stroke={forwardingFault ? C.danger : C.warning}
            strokeWidth="1.5"
          />
          <text
            x="696"
            y="137"
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill={forwardingFault ? C.danger : C.primary}
          >
            {forwardingFault ? "rvalue lost → copy" : "selected overload"}
          </text>
          <text x="46" y="158" fontSize="11" fill={C.secondary}>
            看到 std::move 或 std::forward 不能直接下结论；先检查 cv、value category 和 candidate signature
          </text>

          {STEPS.map((step, index) => {
            const faulted = forwardingFault && (index === 2 || index === 4);
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
                      1 · cast：std move 是无条件转换，不是移动操作
                    </text>
                    <text x="48" y="241" fontSize="12" fill={C.primary}>
                      std::move 只产生 xvalue expression；它不清空 source、不搬 bytes，也不调用 allocator
                    </text>
                    <text x="48" y="267" fontSize="12" fill={C.primary}>
                      target constructor 或 assignment 收到这个 expression 后，才可能选择真正的 move operation
                    </text>
                    <text x="48" y="299" fontSize="11" fill={C.secondary}>
                      先标记“可消费”意图，再沿 candidate overload 追踪资源行为
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
                      2 · select：cast not move 的证据在 overload set
                    </text>
                    <text x="48" y="241" fontSize="12" fill={C.primary}>
                      有 non-const rvalue move overload：优先选择 move；没有时 const-reference copy 仍可绑定 rvalue
                    </text>
                    <text x="48" y="267" fontSize="12" fill={C.primary}>
                      move deleted 或 inaccessible：selected deleted candidate 会报错，而不是静默完成移动
                    </text>
                    <text x="48" y="299" fontSize="11" fill={C.secondary}>
                      用 overload probes 和 copy/move counters 证明 selected overload，不能只搜索 move token
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
                      3 · named：有名字的 rvalue-reference parameter 是 lvalue
                    </text>
                    <text x="48" y="241" fontSize="12" fill={C.primary}>
                      Widget&& parameter 能绑定 rvalue，但 body 中的 named expression 具有 identity，所以是 lvalue
                    </text>
                    <text x="48" y="267" fontSize="12" fill={C.primary}>
                      最后一次使用资源时才显式 std::move；过早 move 后再读 source 会破坏逻辑
                    </text>
                    <text x="48" y="299" fontSize="11" fill={C.secondary}>
                      fault：直接把 named argument 传给下游；修法是标出 last-use move point
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
                      fill={C.warning}
                    >
                      4 · const：const rvalue 仍不能绑定普通 move overload
                    </text>
                    <text x="48" y="241" fontSize="12" fill={C.primary}>
                      std::move 保留 cv qualifiers；const source 变成 const rvalue，而不是可修改的普通 rvalue
                    </text>
                    <text x="48" y="267" fontSize="12" fill={C.primary}>
                      non-const move constructor 无法接收它，const-reference copy 往往成为最佳可用候选
                    </text>
                    <text x="48" y="299" fontSize="11" fill={C.secondary}>
                      修复 API：按值接收非 const parameter，让 lvalue copy、rvalue move/elide 后统一进入 member
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
                      fill={faulted ? C.danger : C.success}
                    >
                      5 · forward：std forward 是 conditional cast，不是无条件消费
                    </text>
                    <text x="48" y="241" fontSize="12" fill={C.primary}>
                      forwarding reference 推导 T：lvalue caller 保留 lvalue，rvalue caller 才恢复 rvalue
                    </text>
                    <text x="48" y="267" fontSize="12" fill={C.primary}>
                      reference collapsing 保存入口信息；直接传 named argument 则两条路径都会降成 lvalue
                    </text>
                    <text x="48" y="299" fontSize="11" fill={C.secondary}>
                      fault：把 std::move 当 universal relay；修法是用 deduced T 的 conditional cast
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
                      fill={C.warning}
                    >
                      6 · matrix：把值类别推导和资源行为一起验收
                    </text>
                    <text x="48" y="241" fontSize="12" fill={C.primary}>
                      overload probes、copy/move counters 覆盖 lvalue、rvalue、const rvalue 和真实 selected operation
                    </text>
                    <text x="48" y="267" fontSize="12" fill={C.primary}>
                      moved-from state、const parameter 和 return local 的 NRVO opportunity 补完整 contract
                    </text>
                    <text x="48" y="299" fontSize="11" fill={C.secondary}>
                      函数名和 && token 都不是证据；证据必须连接 expression、overload 和可观察结果
                    </text>
                  </>
                )}
              </g>
            );
          })}

          {forwardingFault && (
            <g>
              <path
                d="M 710 338 C 662 306, 610 270, 556 238"
                fill="none"
                stroke={C.danger}
                strokeWidth="3"
                strokeDasharray="8 6"
                markerEnd="url(#emcpp-item23-move-forward-fault-arrow)"
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
                故障注入：named rvalue parameter 未恢复 caller category；修法：std::forward with deduced T
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
            markerEnd="url(#emcpp-item23-move-forward-arrow)"
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
                markerEnd="url(#emcpp-item23-move-forward-arrow)"
              />
            );
          })}

          {STEPS.map((step, index) => {
            const box = BOXES[index];
            const selected = index === activeIndex;
            const faulted = forwardingFault && (index === 2 || index === 4);
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
                    ? "转换"
                    : index === 1
                      ? "重载"
                      : index === 2
                        ? "命名"
                        : index === 3
                          ? "const"
                          : index === 4
                            ? "转发"
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
                      ? "选择"
                      : index < 5
                        ? "类别"
                        : "证据"}
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
          caption="按步骤检查 cast、overload、named parameter、const、forwarding 和可观察测试；单步可对照 move 与 forward 的责任边界。"
          reset={{
            label: "重置时间线",
            ariaLabel: "重置 Item 23 move forward 时间线",
            onClick: reset,
          }}
        />

        <button
          type="button"
          aria-pressed={forwardingFault}
          onClick={() => setForwardingFault((value) => !value)}
          className={`mx-auto mt-3 block min-h-11 rounded-control border px-4 py-2 text-sm transition-colors ${
            forwardingFault
              ? "border-danger bg-danger/10 text-danger"
              : "border-border text-secondary hover:border-danger hover:text-danger"
          }`}
        >
          {forwardingFault ? "关闭 forwarding 类别故障" : "注入 forwarding 类别故障"}
        </button>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        std::move 消费当前 expression，std::forward 透明保留 caller category；先确定 source 的最后使用点，再让 overload 证据说话。
      </figcaption>
    </figure>
  );
}
