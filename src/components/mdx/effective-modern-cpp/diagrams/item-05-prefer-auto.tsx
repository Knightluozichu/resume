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
    label: "init",
    caption:
      "prefer auto 先把 declaration 与 initializer 绑定，消除 uninitialized variable 的语法入口",
  },
  {
    label: "source",
    caption:
      "iterator、closure 和 library result 让 initializer 成为单一事实源，避免重复拼写类型",
  },
  {
    label: "width",
    caption:
      "container size type 由 API 保证；手写 unsigned 可能造成 type shortcut mismatch",
  },
  {
    label: "map",
    caption:
      "错误的 map pair reference 会每轮构造 conversion temporary；const auto& 直接绑定真实 element",
  },
  {
    label: "evolve",
    caption:
      "implementation-specific type 的具体拼写交给 initializer，局部代码跟随 API 演化",
  },
  {
    label: "boundary",
    caption:
      "auto 不是语义免检：numeric width、ownership、proxy 和 ABI 仍需显式约束与测试",
  },
];

const LABEL_TEXT: Readonly<Record<string, string>> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

const BOXES = STEPS.map((_, index) => ({
  x: 28 + index * 132,
  y: 356,
}));

export function EmcppItem05PreferAutoLab() {
  const stageRefs = useRef<Array<SVGGElement | null>>([]);
  const [shortcutFault, setShortcutFault] = useState(false);

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
    setShortcutFault(false);
  }

  return (
    <figure
      className="mdx-figure not-prose mx-auto my-8"
      data-visual-kind="emcpp-item-05-prefer-auto"
    >
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-6">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              Effective Modern C++ · Item 5
            </p>
            <h3 className="mt-1 text-lg font-semibold text-primary">
              让 initializer 成为类型的单一事实源
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
              prefer auto 减少重复类型拼写，但真正的收益来自初始化、API
              契约和隐式转换路径一起被看见。
            </p>
          </div>
        </div>

        <svg
          viewBox="0 0 840 520"
          role="img"
          aria-label="Effective Modern C++ Item 5 教学时间线：展示 prefer auto 如何把 initializer 与声明绑定并消除 uninitialized variable，展示 iterator、lambda closure 和 library result 的单一事实源，比较 container size type 与 unsigned 的 type shortcut mismatch，展示 unordered_map 错误 pair reference 产生 conversion temporary，展示 implementation-specific type 随 API 演化，以及 auto 的 numeric width、ownership、proxy 和 ABI 约束边界。支持播放、暂停、单步、拖进度、重置和注入类型捷径故障。"
          className="mx-auto block h-auto w-full"
        >
          <defs>
            <marker
              id="emcpp-item05-auto-arrow"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
            >
              <path d="M0,0 L6,3 L0,6 Z" fill={C.border} />
            </marker>
            <marker
              id="emcpp-item05-auto-fault-arrow"
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
            initializer → real type → binding path → API evolution → explicit
            boundary
          </text>
          <text x="28" y="58" fontSize="12" fill={C.secondary}>
            prefer auto · uninitialized variable · size type · type shortcut
            mismatch · implementation-specific type
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
            两种声明入口：先写类型，或让 initializer 说出真实类型
          </text>
          <rect
            x="46"
            y="116"
            width="206"
            height="32"
            rx="8"
            fill={C.warning}
            fillOpacity="0.12"
            stroke={C.warning}
            strokeWidth="1.5"
          />
          <text
            x="149"
            y="137"
            textAnchor="middle"
            fontSize="12"
            fill={C.primary}
          >
            explicit type：可能漏初始化
          </text>
          <line
            x1="268"
            y1="132"
            x2="326"
            y2="132"
            stroke={C.border}
            strokeWidth="2"
            markerEnd="url(#emcpp-item05-auto-arrow)"
          />
          <rect
            x="344"
            y="116"
            width="194"
            height="32"
            rx="8"
            fill={C.success}
            fillOpacity="0.12"
            stroke={C.success}
            strokeWidth="1.5"
          />
          <text
            x="441"
            y="137"
            textAnchor="middle"
            fontSize="12"
            fill={C.primary}
          >
            auto：必须有 initializer
          </text>
          <line
            x1="554"
            y1="132"
            x2="612"
            y2="132"
            stroke={C.border}
            strokeWidth="2"
            markerEnd="url(#emcpp-item05-auto-arrow)"
          />
          <rect
            x="630"
            y="116"
            width="164"
            height="32"
            rx="8"
            fill={shortcutFault ? C.danger : C.accent}
            fillOpacity="0.12"
            stroke={shortcutFault ? C.danger : C.accent}
            strokeWidth="1.5"
          />
          <text
            x="712"
            y="137"
            textAnchor="middle"
            fontSize="12"
            fill={C.primary}
          >
            仍需语义验收
          </text>
          <text x="46" y="158" fontSize="11" fill={C.secondary}>
            auto 约束声明完整性；initializer、变量命名和测试共同提供可读性与契约
          </text>

          {STEPS.map((step, index) => {
            const faulted = shortcutFault && (index === 2 || index === 3);
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
                      1 · prefer auto：把初始化变成语法约束
                    </text>
                    <text x="48" y="241" fontSize="12" fill={C.primary}>
                      int value; 允许自动变量暂时没有值；auto safeValue = 0;
                      必须从 initializer 推导
                    </text>
                    <text x="48" y="267" fontSize="12" fill={C.primary}>
                      auto brokenValue; 没有类型来源，直接编译失败；业务初值仍需
                      factory 或 validation
                    </text>
                    <text x="48" y="299" fontSize="11" fill={C.secondary}>
                      auto 能消除 uninitialized variable 的入口，不会替你判断 0
                      是否符合业务不变量
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
                      2 · source：让 initializer 成为单一事实源
                    </text>
                    <text x="48" y="241" fontSize="12" fill={C.primary}>
                      auto currentValue = *begin; 不重复 iterator value
                      type，也不复制实现细节
                    </text>
                    <text x="48" y="267" fontSize="12" fill={C.primary}>
                      lambda closure、factory result、chrono duration
                      都自然拥有不可手写或易变的类型
                    </text>
                    <text x="48" y="299" fontSize="11" fill={C.secondary}>
                      只有确实需要异构 callable、运行期替换或稳定 ABI 时，才支付
                      std::function 等抽象成本
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
                      3 · width：API 的 container size type 不等于 unsigned
                    </text>
                    <text x="48" y="241" fontSize="12" fill={C.primary}>
                      auto exactSize = values.size(); 保留容器承诺的 size type
                      和平台宽度
                    </text>
                    <text x="48" y="267" fontSize="12" fill={C.primary}>
                      unsigned explicitSize = values.size(); 可能截断、触发
                      signed warning 或制造跨平台差异
                    </text>
                    <text x="48" y="299" fontSize="11" fill={C.secondary}>
                      fault：把“看起来相同”的 unsigned 当作真实类型；numeric
                      width 属于契约时要显式约束
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
                      4 · map：type shortcut mismatch 会制造临时对象
                    </text>
                    <text x="48" y="241" fontSize="12" fill={C.primary}>
                      unordered_map 的真实 element key 为 const；错误显式 pair
                      会触发 converting constructor
                    </text>
                    <text x="48" y="267" fontSize="12" fill={C.primary}>
                      每轮先构造 conversion temporary，再由 const reference
                      绑定；const auto& 可直接绑定 node
                    </text>
                    <text x="48" y="299" fontSize="11" fill={C.secondary}>
                      用地址、copy counter 或 type traits 验证
                      identity，不要只看“代码能编译”
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
                      5 · evolve：让实现相关类型随表达式演化
                    </text>
                    <text x="48" y="241" fontSize="12" fill={C.primary}>
                      steady_clock duration、iterator、sentinel wrapper
                      的具体拼写由 library implementation 选择
                    </text>
                    <text x="48" y="267" fontSize="12" fill={C.primary}>
                      auto 依赖 expression-level contract；API 内部
                      representation 改变时局部声明通常无需改写
                    </text>
                    <text x="48" y="299" fontSize="11" fill={C.secondary}>
                      implementation-specific type
                      不代表语义免检，ownership、precision 和 lifetime 仍需
                      assertion
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
                      6 · boundary：auto 减少拼写，不减少设计责任
                    </text>
                    <text x="48" y="241" fontSize="12" fill={C.primary}>
                      initializer 清晰、变量名有意图、scope 足够小，auto
                      才能让可读性成立
                    </text>
                    <text x="48" y="267" fontSize="12" fill={C.primary}>
                      numeric width、wire layout、ABI、proxy 或 overload
                      selection 需要 typed initializer / alias / concept
                    </text>
                    <text x="48" y="299" fontSize="11" fill={C.secondary}>
                      用 warning、static_assert、copy/identity test
                      和跨平台测试把推导 contract 固定下来
                    </text>
                  </>
                )}
              </g>
            );
          })}

          {shortcutFault && (
            <g>
              <path
                d="M 706 338 C 662 306, 614 274, 556 238"
                fill="none"
                stroke={C.danger}
                strokeWidth="3"
                strokeDasharray="8 6"
                markerEnd="url(#emcpp-item05-auto-fault-arrow)"
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
                故障注入：手写近似类型掩盖 width 或 key const
                差异；修法：绑定真实 element 并用测试证明无 temporary
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
            markerEnd="url(#emcpp-item05-auto-arrow)"
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
                markerEnd="url(#emcpp-item05-auto-arrow)"
              />
            );
          })}

          {STEPS.map((step, index) => {
            const box = BOXES[index];
            const selected = index === activeIndex;
            const faulted = shortcutFault && (index === 2 || index === 3);
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
                    ? "初始化"
                    : index === 1
                      ? "事实源"
                      : index === 2
                        ? "宽度"
                        : index === 3
                          ? "绑定"
                          : index === 4
                            ? "演化"
                            : "边界"}
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
                      ? "来源"
                      : index < 4
                        ? "类型"
                        : index === 4
                          ? "API"
                          : "约束"}
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
          caption="按步骤检查 initializer、真实 API 类型、conversion temporary 和显式契约；单步最适合复现 map loop 的类型捷径错误。"
          reset={{
            label: "重置时间线",
            ariaLabel: "重置 Item 5 prefer auto 时间线",
            onClick: reset,
          }}
        />

        <button
          type="button"
          aria-pressed={shortcutFault}
          onClick={() => setShortcutFault((value) => !value)}
          className={`mx-auto mt-3 block min-h-11 rounded-control border px-4 py-2 text-sm transition-colors ${
            shortcutFault
              ? "border-danger bg-danger/10 text-danger"
              : "border-border text-secondary hover:border-danger hover:text-danger"
          }`}
        >
          {shortcutFault ? "关闭类型捷径故障" : "注入类型捷径故障"}
        </button>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        prefer auto 的验收顺序是：先确认 initializer
        存在，再确认真实类型和绑定路径，最后决定哪些 numeric、ownership、proxy
        或 ABI 约束必须显式写出。
      </figcaption>
    </figure>
  );
}
