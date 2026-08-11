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
    label: "contract",
    caption:
      "noexcept 只承诺异常不会越过边界；will not emit exceptions 是可验证的实现前提，违约路径是 terminate",
  },
  {
    label: "reallocate",
    caption:
      "vector reallocation 为 strong exception guarantee 比较 copy 与 move：throwing move 可能触发 copy fallback",
  },
  {
    label: "truthful",
    caption:
      "真实不抛的 move 才带来 move operation optimization；false noexcept promise 会把可恢复错误变成 terminate",
  },
  {
    label: "contract-width",
    caption:
      "wide contract 让稳定 noexcept 更自然；narrow contract 必须先写清楚 precondition violation 的策略",
  },
  {
    label: "compose",
    caption:
      "conditional noexcept 跟随 T 的 nothrow capability composition，不硬编码 wrapper 的异常能力",
  },
  {
    label: "matrix",
    caption:
      "用 traits、异常注入、copy/move counters 和 wrapper 两种 T 固定 noexcept contract matrix",
  },
];

const LABEL_TEXT: Readonly<Record<string, string>> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

const BOXES = STEPS.map((_, index) => ({
  x: 28 + index * 132,
  y: 356,
}));

export function EmcppItem14NoexceptLab() {
  const stageRefs = useRef<Array<SVGGElement | null>>([]);
  const [promiseFault, setPromiseFault] = useState(false);

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
    setPromiseFault(false);
  }

  return (
    <figure
      className="mdx-figure not-prose mx-auto my-8"
      data-visual-kind="emcpp-item-14-noexcept"
    >
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-6">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              Effective Modern C++ · Item 14
            </p>
            <h3 className="mt-1 text-lg font-semibold text-primary">
              先证明“不抛”，再把承诺交给调用方
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
              沿着 contract、container、generic wrapper 和 tests 四层观察
              noexcept 的收益与风险；每一步都能暂停、单步或拖动复核。
            </p>
          </div>
        </div>

        <svg
          viewBox="0 0 840 520"
          role="img"
          aria-label="Effective Modern C++ Item 14 教学时间线：展示 noexcept contract 与 will not emit exceptions 的边界承诺，异常逃逸导致 terminate；展示 vector reallocation 为 strong exception guarantee 在 throwing move 和可用 copy 间选择，展示真实 noexcept move 带来的 move operation optimization 与 false noexcept promise 的风险，比较 wide contract 和 narrow contract，展示 conditional noexcept 如何组合 nothrow capability，最后用 traits、异常注入与 copy/move counters 构成 noexcept contract matrix。支持播放、暂停、单步、拖进度、重置和注入 false noexcept 故障。"
          className="mx-auto block h-auto w-full"
        >
          <defs>
            <marker
              id="emcpp-item14-noexcept-arrow"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
            >
              <path d="M0,0 L6,3 L0,6 Z" fill={C.border} />
            </marker>
            <marker
              id="emcpp-item14-noexcept-fault-arrow"
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
            truthful contract → caller choice → capability composition → evidence
          </text>
          <text x="28" y="58" fontSize="12" fill={C.secondary}>
            noexcept boundary · terminate · vector reallocation · wide/narrow contract · conditional noexcept
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
            一个异常承诺如何改变整条调用链
          </text>
          <rect
            x="46"
            y="116"
            width="190"
            height="32"
            rx="8"
            fill={C.accent}
            fillOpacity="0.12"
            stroke={C.accent}
            strokeWidth="1.5"
          />
          <text
            x="141"
            y="137"
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill={C.primary}
          >
            noexcept boundary
          </text>
          <line
            x1="254"
            y1="132"
            x2="326"
            y2="132"
            stroke={C.border}
            strokeWidth="2"
            markerEnd="url(#emcpp-item14-noexcept-arrow)"
          />
          <rect
            x="344"
            y="116"
            width="150"
            height="32"
            rx="8"
            fill={C.success}
            fillOpacity="0.12"
            stroke={C.success}
            strokeWidth="1.5"
          />
          <text
            x="419"
            y="137"
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill={C.primary}
          >
            caller trusts
          </text>
          <line
            x1="512"
            y1="132"
            x2="584"
            y2="132"
            stroke={C.border}
            strokeWidth="2"
            markerEnd="url(#emcpp-item14-noexcept-arrow)"
          />
          <rect
            x="602"
            y="116"
            width="192"
            height="32"
            rx="8"
            fill={promiseFault ? C.danger : C.warning}
            fillOpacity="0.12"
            stroke={promiseFault ? C.danger : C.warning}
            strokeWidth="1.5"
          />
          <text
            x="698"
            y="137"
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill={promiseFault ? C.danger : C.primary}
          >
            {promiseFault ? "throw → terminate" : "algorithm path improves"}
          </text>
          <text x="46" y="158" fontSize="11" fill={C.secondary}>
            关键问题：实现真的 will not emit exceptions，还是只把风险藏到 noexcept 后面？
          </text>

          {STEPS.map((step, index) => {
            const faulted = promiseFault && (index === 0 || index === 2);
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
                      fill={faulted ? C.danger : C.accent}
                    >
                      1 · contract：noexcept 是边界承诺，不是禁止内部抛出
                    </text>
                    <text x="48" y="241" fontSize="12" fill={C.primary}>
                      callee 若让 exception 穿过 noexcept boundary，运行时走 terminate；caller
                      不会得到可恢复的 stack unwinding
                    </text>
                    <text x="48" y="267" fontSize="12" fill={C.primary}>
                      只有能证明 will not emit exceptions 的实现，才值得把该属性交给
                      standard library 与 optimizer
                    </text>
                    <text x="48" y="299" fontSize="11" fill={C.secondary}>
                      fault：把 noexcept 当成静态 exception checker；修法是审计 allocation、callback 与 destructor
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
                      2 · reallocate：strong exception guarantee 约束 vector 选择
                    </text>
                    <text x="48" y="241" fontSize="12" fill={C.primary}>
                      move constructor noexcept：搬迁中途不会抛，vector 可放心走 move path
                    </text>
                    <text x="48" y="267" fontSize="12" fill={C.primary}>
                      move 可能抛且 copy 可用：通常 copy 旧 element，失败时仍能保留旧 storage
                    </text>
                    <text x="48" y="299" fontSize="11" fill={C.secondary}>
                      观察点：copy/move counters 是调用方路径的证据，不应把实现细节当语言保证
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
                      3 · truthful：move operation optimization 要求真实不抛
                    </text>
                    <text x="48" y="241" fontSize="12" fill={C.primary}>
                      truthful noexcept move 让 generic caller 跳过 copy/rollback，获得 move operation optimization
                    </text>
                    <text x="48" y="267" fontSize="12" fill={C.primary}>
                      若 move 内有 allocation 或 user callback 却硬写 noexcept，就是 false noexcept promise
                    </text>
                    <text x="48" y="299" fontSize="11" fill={C.secondary}>
                      fault：性能目标覆盖异常语义；修法是改成 handle swap，或接受 copy fallback
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
                      4 · contract width：wide 与 narrow 要分别决定违约策略
                    </text>
                    <text x="48" y="241" fontSize="12" fill={C.primary}>
                      wide contract：合法输入面完整且实现不抛时，swap、destructor 等 noexcept 更稳定
                    </text>
                    <text x="48" y="267" fontSize="12" fill={C.primary}>
                      narrow contract：先写清 precondition；越界若应抛 out_of_range，就不能同时 noexcept
                    </text>
                    <text x="48" y="299" fontSize="11" fill={C.secondary}>
                      contract width 不机械决定异常规范，决定因素是每条合法路径和违约策略
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
                      5 · compose：conditional noexcept 沿成员能力传播
                    </text>
                    <text x="48" y="241" fontSize="12" fill={C.primary}>
                      Box&lt;T&gt; 的 move/swap 查询 T 的 nothrow traits 或实际 expression，而不是硬编码 true
                    </text>
                    <text x="48" y="267" fontSize="12" fill={C.primary}>
                      throwing member → wrapper noexcept(false)；non-throwing member → wrapper 能力保持 true
                    </text>
                    <text x="48" y="299" fontSize="11" fill={C.secondary}>
                      从 leaf member 到 aggregate 再到 public swap，逐层形成 nothrow capability composition
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
                      6 · matrix：把承诺变成可复核的测试证据
                    </text>
                    <text x="48" y="241" fontSize="12" fill={C.primary}>
                      static_assert 固定 nothrow traits；throwing/non-throwing T 固定 conditional noexcept 两条路径
                    </text>
                    <text x="48" y="267" fontSize="12" fill={C.primary}>
                      异常注入检查 terminate 策略，copy/move counters 检查 vector relocation 是否走预期路径
                    </text>
                    <text x="48" y="299" fontSize="11" fill={C.secondary}>
                      contract matrix 的结论必须同时覆盖实现、caller algorithm 和合法/违约输入
                    </text>
                  </>
                )}
              </g>
            );
          })}

          {promiseFault && (
            <g>
              <path
                d="M 710 338 C 662 306, 610 270, 556 238"
                fill="none"
                stroke={C.danger}
                strokeWidth="3"
                strokeDasharray="8 6"
                markerEnd="url(#emcpp-item14-noexcept-fault-arrow)"
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
                故障注入：move 真实会抛却声明 noexcept；修法：捕获/转换异常，或移除虚假承诺
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
            markerEnd="url(#emcpp-item14-noexcept-arrow)"
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
                markerEnd="url(#emcpp-item14-noexcept-arrow)"
              />
            );
          })}

          {STEPS.map((step, index) => {
            const box = BOXES[index];
            const selected = index === activeIndex;
            const faulted = promiseFault && (index === 0 || index === 2);
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
                    ? "边界"
                    : index === 1
                      ? "容器"
                      : index === 2
                        ? "真实"
                        : index === 3
                          ? "契约"
                          : index === 4
                            ? "组合"
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
                    : index < 2
                      ? "选择"
                      : index < 4
                        ? "判断"
                        : index === 4
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
          caption="按步骤检查异常边界、vector 路径、契约宽度、成员能力传播与测试证据；单步可对照每个决策的前提。"
          reset={{
            label: "重置时间线",
            ariaLabel: "重置 Item 14 noexcept 时间线",
            onClick: reset,
          }}
        />

        <button
          type="button"
          aria-pressed={promiseFault}
          onClick={() => setPromiseFault((value) => !value)}
          className={`mx-auto mt-3 block min-h-11 rounded-control border px-4 py-2 text-sm transition-colors ${
            promiseFault
              ? "border-danger bg-danger/10 text-danger"
              : "border-border text-secondary hover:border-danger hover:text-danger"
          }`}
        >
          {promiseFault ? "关闭 false noexcept 故障" : "注入 false noexcept 故障"}
        </button>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        noexcept 的价值来自真实契约：先证明不会抛，再让 vector 和 generic wrapper
        利用这项能力，最后用可观察测试把承诺固定下来。
      </figcaption>
    </figure>
  );
}
