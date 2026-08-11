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
    label: "identity",
    caption:
      "0 与 NULL 通常先拥有 integral identity；nullptr 从起点就是 std nullptr_t 的专用空指针语义",
  },
  {
    label: "overload",
    caption:
      "int、bool、pointer overload 会按 conversion rank 选择：0 命中 int，nullptr 才表达 pointer intent",
  },
  {
    label: "convert",
    caption:
      "direct call 已知目标 parameter，字面量 0 可转换；这不代表同一个值经过 wrapper 后仍然可转换",
  },
  {
    label: "deduce",
    caption:
      "template type deduction 先固化 argument 的直接类型；普通 int variable 不再是 null pointer constant",
  },
  {
    label: "ambiguity",
    caption:
      "多个不同 pointer overload 对 nullptr 同等可行时，用具名 API 或显式 target cast 消除歧义",
  },
  {
    label: "contract",
    caption:
      "nullptr 表达 pointer absence，不承担复杂 error model；用 overload probe、compile-fail 和 result tests 固定契约",
  },
];

const LABEL_TEXT: Readonly<Record<string, string>> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

const BOXES = STEPS.map((_, index) => ({
  x: 28 + index * 132,
  y: 356,
}));

export function EmcppItem08PreferNullptrLab() {
  const stageRefs = useRef<Array<SVGGElement | null>>([]);
  const [integerNullFault, setIntegerNullFault] = useState(false);

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
    setIntegerNullFault(false);
  }

  return (
    <figure
      className="mdx-figure not-prose mx-auto my-8"
      data-visual-kind="emcpp-item-08-prefer-nullptr"
    >
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-6">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              Effective Modern C++ · Item 8
            </p>
            <h3 className="mt-1 text-lg font-semibold text-primary">
              让空指针语义跨过调用边界
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
              prefer nullptr 的核心不是写法偏好，而是让 pointer intent
              在重载和模板转发中保持可见。
            </p>
          </div>
        </div>

        <svg
          viewBox="0 0 840 520"
          role="img"
          aria-label="Effective Modern C++ Item 8 教学时间线：比较 0、NULL 与 nullptr 的直接类型身份，展示 int、bool、pointer overload 的选择，比较 direct call 与 template type deduction 的转换时机，展示 generic wrapper 如何把 0 固化为普通 int、nullptr 保持 std nullptr_t，展示多个 pointer overload 的歧义以及 pointer absence 与 rich error model 的契约边界。支持播放、暂停、单步、拖进度、重置和注入整数空值故障。"
          className="mx-auto block h-auto w-full"
        >
          <defs>
            <marker
              id="emcpp-item08-nullptr-arrow"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
            >
              <path d="M0,0 L6,3 L0,6 Z" fill={C.border} />
            </marker>
            <marker
              id="emcpp-item08-nullptr-fault-arrow"
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
            direct type → overload conversion → deduction boundary → pointer
            contract
          </text>
          <text x="28" y="58" fontSize="12" fill={C.secondary}>
            prefer nullptr · 0 and null · pointer overload · template type
            deduction · std nullptr_t
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
            三种空值写法：转换能力相似，类型身份不同
          </text>
          <rect
            x="46"
            y="116"
            width="164"
            height="32"
            rx="8"
            fill={C.warning}
            fillOpacity="0.12"
            stroke={C.warning}
            strokeWidth="1.5"
          />
          <text
            x="128"
            y="137"
            textAnchor="middle"
            fontSize="12"
            fill={C.primary}
          >
            0 → int
          </text>
          <line
            x1="226"
            y1="132"
            x2="286"
            y2="132"
            stroke={C.border}
            strokeWidth="2"
            markerEnd="url(#emcpp-item08-nullptr-arrow)"
          />
          <rect
            x="304"
            y="116"
            width="190"
            height="32"
            rx="8"
            fill={C.warning}
            fillOpacity="0.12"
            stroke={C.warning}
            strokeWidth="1.5"
          />
          <text
            x="399"
            y="137"
            textAnchor="middle"
            fontSize="12"
            fill={C.primary}
          >
            NULL → integral macro
          </text>
          <line
            x1="510"
            y1="132"
            x2="570"
            y2="132"
            stroke={C.border}
            strokeWidth="2"
            markerEnd="url(#emcpp-item08-nullptr-arrow)"
          />
          <rect
            x="588"
            y="116"
            width="206"
            height="32"
            rx="8"
            fill={integerNullFault ? C.danger : C.success}
            fillOpacity="0.12"
            stroke={integerNullFault ? C.danger : C.success}
            strokeWidth="1.5"
          />
          <text
            x="691"
            y="137"
            textAnchor="middle"
            fontSize="12"
            fill={C.primary}
          >
            nullptr → std nullptr_t
          </text>
          <text x="46" y="158" fontSize="11" fill={C.secondary}>
            只有 nullptr 从起点携带目标中立的 pointer intent，跨 wrapper
            后仍能进行 nullptr conversion
          </text>

          {STEPS.map((step, index) => {
            const faulted = integerNullFault && (index === 2 || index === 3);
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
                      1 · identity：0 and null 先是整数语义
                    </text>
                    <text x="48" y="241" fontSize="12" fill={C.primary}>
                      auto zero = 0; 得 int；auto legacyNull = NULL; 得实现相关
                      integral type
                    </text>
                    <text x="48" y="267" fontSize="12" fill={C.primary}>
                      nullptr 的直接类型是 std nullptr_t，本身不是某一个 Widget
                      pointer
                    </text>
                    <text x="48" y="299" fontSize="11" fill={C.secondary}>
                      先记录 initializer 的 direct type，再谈它在目标 pointer
                      context 中能否转换
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
                      2 · pointer overload：conversion rank 不读取人类意图
                    </text>
                    <text x="48" y="241" fontSize="12" fill={C.primary}>
                      inspect(0) 对 int 是 exact
                      match；不会因为人类想表达空指针而选 void pointer
                    </text>
                    <text x="48" y="267" fontSize="12" fill={C.primary}>
                      inspect(NULL) 依赖宏展开；inspect(nullptr) 才自然进入
                      pointer overload
                    </text>
                    <text x="48" y="299" fontSize="11" fill={C.secondary}>
                      overload resolution 比较语言转换序列，不比较注释或变量命名
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
                      3 · direct call：已知参数类型可以帮助字面量转换
                    </text>
                    <text x="48" y="241" fontSize="12" fill={C.primary}>
                      observe(0) 在 Widget pointer 参数已知时可执行 legacy null
                      pointer conversion
                    </text>
                    <text x="48" y="267" fontSize="12" fill={C.primary}>
                      这只说明“当前调用点能转”，不说明 0 经过局部变量或 wrapper
                      后仍有同样身份
                    </text>
                    <text x="48" y="299" fontSize="11" fill={C.secondary}>
                      fault：把 direct call
                      的目标上下文误当作所有抽象边界都会保留的规则
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
                      4 · template type deduction：0 在 wrapper 内被冻结成 int
                    </text>
                    <text x="48" y="241" fontSize="12" fill={C.primary}>
                      Pointer pointer = 0; deduction 先得到 int，函数体再传
                      named int variable 给 Widget pointer
                    </text>
                    <text x="48" y="267" fontSize="12" fill={C.primary}>
                      named int 值为零不再是 null pointer constant；nullptr
                      则保留 std nullptr_t 语义
                    </text>
                    <text x="48" y="299" fontSize="11" fill={C.secondary}>
                      generic forwarding 的关键是类型信息能否跨第一阶段
                      deduction 存活到第二次调用
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
                      5 · ambiguity：nullptr 也可能需要 target type
                    </text>
                    <text x="48" y="241" fontSize="12" fill={C.primary}>
                      reset(FileHandle*) 与 reset(SocketHandle*)
                      同时存在时，reset(nullptr) 会歧义
                    </text>
                    <text x="48" y="267" fontSize="12" fill={C.primary}>
                      一次调用可 static_cast 到目标 pointer；公共 API 更适合拆成
                      resetFile/resetSocket
                    </text>
                    <text x="48" y="299" fontSize="11" fill={C.secondary}>
                      cast 解决具体调用选择，具名接口解决长期可读性与错误误用
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
                      6 · contract：空指针不是完整错误模型
                    </text>
                    <text x="48" y="241" fontSize="12" fill={C.primary}>
                      nullptr 表达 pointer absence；权限、解析、加载失败应由
                      result/expected-like type 表达
                    </text>
                    <text x="48" y="267" fontSize="12" fill={C.primary}>
                      overload probe、compile-fail wrapper test、raw/smart
                      pointer matrix 固定类型与转换边界
                    </text>
                    <text x="48" y="299" fontSize="11" fill={C.secondary}>
                      先预测 direct type、deduced parameter 和第二次 call
                      conversion，再检查最终值
                    </text>
                  </>
                )}
              </g>
            );
          })}

          {integerNullFault && (
            <g>
              <path
                d="M 706 338 C 662 306, 614 274, 556 238"
                fill="none"
                stroke={C.danger}
                strokeWidth="3"
                strokeDasharray="8 6"
                markerEnd="url(#emcpp-item08-nullptr-fault-arrow)"
              />
              <rect
                x="124"
                y="326"
                width="592"
                height="28"
                rx="8"
                fill={C.warning}
                fillOpacity="0.12"
                stroke={C.danger}
                strokeWidth="1.5"
              />
              <text
                x="142"
                y="346"
                fontSize="11"
                fontWeight="700"
                fill={C.danger}
              >
                故障注入：把 0 当作可跨 wrapper 的空指针；修法：用 nullptr 保持
                std nullptr_t，或明确目标 cast
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
            markerEnd="url(#emcpp-item08-nullptr-arrow)"
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
                markerEnd="url(#emcpp-item08-nullptr-arrow)"
              />
            );
          })}

          {STEPS.map((step, index) => {
            const box = BOXES[index];
            const selected = index === activeIndex;
            const faulted = integerNullFault && (index === 2 || index === 3);
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
                    ? "身份"
                    : index === 1
                      ? "重载"
                      : index === 2
                        ? "直接"
                        : index === 3
                          ? "模板"
                          : index === 4
                            ? "歧义"
                            : "契约"}
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
                      ? "类型"
                      : index < 4
                        ? "边界"
                        : index === 4
                          ? "选择"
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
            当前验收门：{activeStep.caption}
          </text>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="按步骤检查 direct type、overload conversion、template deduction 和 error contract；单步最适合复现 0 经过 wrapper 后失去空指针身份。"
          reset={{
            label: "重置时间线",
            ariaLabel: "重置 Item 8 nullptr 时间线",
            onClick: reset,
          }}
        />

        <button
          type="button"
          aria-pressed={integerNullFault}
          onClick={() => setIntegerNullFault((value) => !value)}
          className={`mx-auto mt-3 block min-h-11 rounded-control border px-4 py-2 text-sm transition-colors ${
            integerNullFault
              ? "border-danger bg-danger/10 text-danger"
              : "border-border text-secondary hover:border-danger hover:text-danger"
          }`}
        >
          {integerNullFault ? "关闭整数空值故障" : "注入整数空值故障"}
        </button>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        prefer nullptr
        的验收顺序是：先识别类型身份，再观察转换发生在哪个边界，最后用明确 API
        和回归测试保住 pointer contract。
      </figcaption>
    </figure>
  );
}
