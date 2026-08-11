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
    label: "object",
    caption:
      "use constexpr 从 constexpr objects 开始：initializer 必须形成 constant expression，constexpr object 同时具备编译期值和 const 属性",
  },
  {
    label: "function",
    caption:
      "constexpr functions 获得常量求值资格，但同一函数也能接收 runtime input 生成普通运行期调用",
  },
  {
    label: "context",
    caption:
      "compile-time context（如 array extent、template argument、static_assert）会强制要求 constant expression",
  },
  {
    label: "pipeline",
    caption:
      "literal type、constexpr constructor、accessor 与 algorithm 返回值首尾相接，形成可复用的 constexpr object pipeline",
  },
  {
    label: "language",
    caption:
      "C++11 constexpr body 偏单一 return；C++14 放宽为局部变量和循环，但 target 仍决定可写语法",
  },
  {
    label: "matrix",
    caption:
      "用 static_assert、强制语境、runtime reference、非法常量路径和版本 target 固定 constexpr contract matrix",
  },
];

const LABEL_TEXT: Readonly<Record<string, string>> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

const BOXES = STEPS.map((_, index) => ({
  x: 28 + index * 132,
  y: 356,
}));

export function EmcppItem15ConstexprLab() {
  const stageRefs = useRef<Array<SVGGElement | null>>([]);
  const [runtimeInputFault, setRuntimeInputFault] = useState(false);

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
    setRuntimeInputFault(false);
  }

  return (
    <figure
      className="mdx-figure not-prose mx-auto my-8"
      data-visual-kind="emcpp-item-15-constexpr"
    >
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-6">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              Effective Modern C++ · Item 15
            </p>
            <h3 className="mt-1 text-lg font-semibold text-primary">
              先识别语境，再决定何时求值
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
              constexpr 的关键不是“永远编译期”，而是把 object、function、调用语境和
              language target 的关系变成可观察的决策链。
            </p>
          </div>
        </div>

        <svg
          viewBox="0 0 840 520"
          role="img"
          aria-label="Effective Modern C++ Item 15 教学时间线：展示 use constexpr 从 constexpr object 开始，区分 constexpr functions 的编译期和运行期双重调用，展示 compile-time context 如何强制 constant expression，展示 literal type、constexpr constructor 和 accessor 组成 constexpr object pipeline，比较 C++11 与 C++14 constexpr body 限制，最后用 static_assert、强制语境、runtime reference、非法常量路径和版本 target 构成 constexpr contract matrix。支持播放、暂停、单步、拖进度、重置和注入 runtime input 误区。"
          className="mx-auto block h-auto w-full"
        >
          <defs>
            <marker
              id="emcpp-item15-constexpr-arrow"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
            >
              <path d="M0,0 L6,3 L0,6 Z" fill={C.border} />
            </marker>
            <marker
              id="emcpp-item15-constexpr-fault-arrow"
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
            input kind → evaluation context → language capability → evidence
          </text>
          <text x="28" y="58" fontSize="12" fill={C.secondary}>
            constexpr object · constexpr functions · compile-time context · literal type · C++11/C++14
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
            同一个 constexpr function，语境决定是否必须常量求值
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
            constant input
          </text>
          <line
            x1="230"
            y1="132"
            x2="304"
            y2="132"
            stroke={C.border}
            strokeWidth="2"
            markerEnd="url(#emcpp-item15-constexpr-arrow)"
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
            forced context
          </text>
          <line
            x1="506"
            y1="132"
            x2="580"
            y2="132"
            stroke={C.border}
            strokeWidth="2"
            markerEnd="url(#emcpp-item15-constexpr-arrow)"
          />
          <rect
            x="598"
            y="116"
            width="196"
            height="32"
            rx="8"
            fill={runtimeInputFault ? C.danger : C.warning}
            fillOpacity="0.12"
            stroke={runtimeInputFault ? C.danger : C.warning}
            strokeWidth="1.5"
          />
          <text
            x="696"
            y="137"
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill={runtimeInputFault ? C.danger : C.primary}
          >
            {runtimeInputFault ? "runtime input → diagnostic" : "constant value"}
          </text>
          <text x="46" y="158" fontSize="11" fill={C.secondary}>
            语言保证来自 constant expression 规则；普通语境里的 constant folding 只是优化选择
          </text>

          {STEPS.map((step, index) => {
            const faulted = runtimeInputFault && (index === 1 || index === 2);
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
                      1 · object：constexpr object = compile-time value + const
                    </text>
                    <text x="48" y="241" fontSize="12" fill={C.primary}>
                      initializer 必须形成 constant expression；对象初始化完成后不能再修改
                    </text>
                    <text x="48" y="267" fontSize="12" fill={C.primary}>
                      普通 const object 也许来自 runtime function，所以不能自动进入 template 或 array 语境
                    </text>
                    <text x="48" y="299" fontSize="11" fill={C.secondary}>
                      先问“值在哪里产生”，再问“对象之后能否修改”，不要把 const 当 constexpr
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
                      fill={faulted ? C.danger : C.success}
                    >
                      2 · function：constexpr functions 是能力，不是强制执行模式
                    </text>
                    <text x="48" y="241" fontSize="12" fill={C.primary}>
                      constant arguments + 合规路径：compiler 可在编译期计算并服务 compile-time context
                    </text>
                    <text x="48" y="267" fontSize="12" fill={C.primary}>
                      runtime input：同一函数保留普通 runtime call；constexpr 不保证零运行期开销
                    </text>
                    <text x="48" y="299" fontSize="11" fill={C.secondary}>
                      fault：看到 constexpr 就断言“总在编译期”；修法是把 arguments 与调用语境一起检查
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
                      3 · context：强制位置把错误提前到编译期
                    </text>
                    <text x="48" y="241" fontSize="12" fill={C.primary}>
                      array extent、non-type template argument、enum value、alignment 和 static_assert 都要求常量值
                    </text>
                    <text x="48" y="267" fontSize="12" fill={C.primary}>
                      非法路径若进入强制 compile-time context，结果是不合法程序与 diagnostic，而非 runtime surprise
                    </text>
                    <text x="48" y="299" fontSize="11" fill={C.secondary}>
                      fault：把 runtime input 塞进强制语境；修法是改输入来源或改 API 让 size 在运行期决定
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
                      fill={C.success}
                    >
                      4 · pipeline：literal type 到算法返回值连续可求值
                    </text>
                    <text x="48" y="241" fontSize="12" fill={C.primary}>
                      literal type 能在常量语境构造；constexpr constructor 先建立可用 object
                    </text>
                    <text x="48" y="267" fontSize="12" fill={C.primary}>
                      constexpr accessor 和 derived algorithm 继续传播能力，任一环缺失都会截断 constexpr object pipeline
                    </text>
                    <text x="48" y="299" fontSize="11" fill={C.secondary}>
                      用 Point constructor、x/y accessor、midpoint 和 static_assert 逐层验收，而不是只测最终数值
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
                      5 · language：C++11 与 C++14 的 body 能力不同
                    </text>
                    <text x="48" y="241" fontSize="12" fill={C.primary}>
                      C++11 constexpr function 偏单一 return expression；递归是表达复杂逻辑的常见方式
                    </text>
                    <text x="48" y="267" fontSize="12" fill={C.primary}>
                      C++14 放宽为局部变量、循环和多语句，但项目最低 target 仍决定可用写法
                    </text>
                    <text x="48" y="299" fontSize="11" fill={C.secondary}>
                      语言版本是 contract 的一部分；不要把较新 body syntax 偷渡到 C++11 target
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
                      6 · matrix：编译期保证和运行期行为要成对验证
                    </text>
                    <text x="48" y="241" fontSize="12" fill={C.primary}>
                      static_assert、强制语境和 invalid constant path 固定语言层 contract
                    </text>
                    <text x="48" y="267" fontSize="12" fill={C.primary}>
                      runtime reference、literal pipeline 和 C++11/C++14 target 固定工程层行为
                    </text>
                    <text x="48" y="299" fontSize="11" fill={C.secondary}>
                      只有两条执行路径都被观察，才能说明“尽可能使用”而不是盲目添加 constexpr
                    </text>
                  </>
                )}
              </g>
            );
          })}

          {runtimeInputFault && (
            <g>
              <path
                d="M 710 338 C 662 306, 610 270, 556 238"
                fill="none"
                stroke={C.danger}
                strokeWidth="3"
                strokeDasharray="8 6"
                markerEnd="url(#emcpp-item15-constexpr-fault-arrow)"
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
                故障注入：runtime input 进入强制常量语境；修法：改变来源或承认该调用必须运行期执行
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
            markerEnd="url(#emcpp-item15-constexpr-arrow)"
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
                markerEnd="url(#emcpp-item15-constexpr-arrow)"
              />
            );
          })}

          {STEPS.map((step, index) => {
            const box = BOXES[index];
            const selected = index === activeIndex;
            const faulted = runtimeInputFault && (index === 1 || index === 2);
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
                    ? "对象"
                    : index === 1
                      ? "函数"
                      : index === 2
                        ? "语境"
                        : index === 3
                          ? "链路"
                          : index === 4
                            ? "版本"
                            : "证据"}
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
                    : index < 3
                      ? "求值"
                      : index < 5
                        ? "传播"
                        : "验证"}
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
          caption="按步骤检查 object、function、强制语境、literal pipeline、语言版本和双路径测试；单步最适合对比 constant input 与 runtime input。"
          reset={{
            label: "重置时间线",
            ariaLabel: "重置 Item 15 constexpr 时间线",
            onClick: reset,
          }}
        />

        <button
          type="button"
          aria-pressed={runtimeInputFault}
          onClick={() => setRuntimeInputFault((value) => !value)}
          className={`mx-auto mt-3 block min-h-11 rounded-control border px-4 py-2 text-sm transition-colors ${
            runtimeInputFault
              ? "border-danger bg-danger/10 text-danger"
              : "border-border text-secondary hover:border-danger hover:text-danger"
          }`}
        >
          {runtimeInputFault ? "关闭 runtime input 故障" : "注入 runtime input 故障"}
        </button>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        constexpr 的正确决策顺序是：先看输入是否可常量求值，再看调用位置是否强制编译期，最后按语言版本和接口承诺补齐测试。
      </figcaption>
    </figure>
  );
}
