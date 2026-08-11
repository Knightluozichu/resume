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
      "先拆 callable contract：哪些表达式在 construction 执行，哪些必须留到 invocation",
  },
  {
    label: "bind",
    caption:
      "std::bind 的普通 bound argument 在 adaptor construction 时求值并被存储",
  },
  {
    label: "lambda",
    caption:
      "lambda 把 now() 放在 body；每次 invocation 都重新求值，时间边界直接可读",
  },
  {
    label: "overload",
    caption:
      "lambda body 保留真实 call expression 的 overload resolution，bind 裸函数名常需 cast",
  },
  {
    label: "forward",
    caption:
      "generic lambda 可显式写 decltype 驱动的 forward，参数和策略都在源码表面",
  },
  {
    label: "audit",
    caption:
      "最后比较 storage、value category、重复调用和兼容性边界，确认两种 callable 真等价",
  },
];

const LABEL_TEXT: Readonly<Record<string, string>> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

const BOXES = STEPS.map((_, index) => ({
  x: 28 + index * 132,
  y: 356,
}));

export function EmcppItem34LambdaBindLab() {
  const stageRefs = useRef<Array<SVGGElement | null>>([]);
  const [earlyBindFault, setEarlyBindFault] = useState(false);

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      STEPS.forEach((step, index) => {
        tl.add(
          stageRefs.current[index]!,
          { opacity: [0, 1], duration: T * 0.55, ease: "out(3)" },
          index * T,
        );
        // label 对齐该步 evaluation boundary 或 callable policy 的起始时刻。
        tl.label(step.label, index * T);
      });
    },
  });

  const activeIndex = Math.min(STEPS.length - 1, timeline.currentStep);
  const activeStep = STEPS[activeIndex] ?? STEPS[0];

  function reset() {
    timeline.goToStep(0);
    setEarlyBindFault(false);
  }

  return (
    <figure
      className="mdx-figure not-prose mx-auto my-8"
      data-visual-kind="emcpp-item-34-prefer-lambdas-to-std-bind"
    >
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-6">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              Effective Modern C++ · Item 34
            </p>
            <h3 className="mt-1 text-lg font-semibold text-primary">
              先画 evaluation boundary，再决定 callable adaptor
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
              lambda 把参数、capture、body call 和求值时机摆在一起；bind
              把语义拆到 bound values、placeholders 和 adaptor protocol 里。
            </p>
          </div>
        </div>

        <svg
          viewBox="0 0 840 520"
          role="img"
          aria-label="Effective Modern C++ Item 34 教学时间线：比较 std::bind 与 lambda 的 construction-time 和 invocation-time 求值、延迟闹钟、重载解析、显式完美转发、bound value 存储和兼容性边界。支持播放、暂停、单步、拖进度、重置和注入提前绑定故障。"
          className="mx-auto block h-auto w-full"
        >
          <defs>
            <marker
              id="emcpp-item34-bind-arrow"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
            >
              <path d="M0,0 L6,3 L0,6 Z" fill={C.border} />
            </marker>
            <marker
              id="emcpp-item34-bind-fault-arrow"
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
            construction → stored state → invocation
          </text>
          <text x="28" y="58" fontSize="12" fill={C.secondary}>
            evaluation timing · overload context · forwarding policy · storage
            semantics
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
            时间轴：创建 adaptor ≠ 调用 adaptor
          </text>
          <circle cx="120" cy="132" r="9" fill={C.accent} />
          <text
            x="120"
            y="153"
            textAnchor="middle"
            fontSize="11"
            fill={C.secondary}
          >
            t0 create
          </text>
          <line
            x1="142"
            y1="132"
            x2="690"
            y2="132"
            stroke={C.border}
            strokeWidth="2"
            markerEnd="url(#emcpp-item34-bind-arrow)"
          />
          <circle cx="714" cy="132" r="9" fill={C.success} />
          <text
            x="714"
            y="153"
            textAnchor="middle"
            fontSize="11"
            fill={C.secondary}
          >
            t1 call
          </text>
          <rect
            x="250"
            y="116"
            width="184"
            height="30"
            rx="8"
            fill={earlyBindFault ? C.danger : C.warning}
            fillOpacity="0.12"
            stroke={earlyBindFault ? C.danger : C.warning}
            strokeWidth="1.5"
          />
          <text
            x="342"
            y="136"
            textAnchor="middle"
            fontSize="11"
            fill={C.primary}
          >
            bind: now() 在 t0
          </text>
          <rect
            x="478"
            y="116"
            width="184"
            height="30"
            rx="8"
            fill={C.success}
            fillOpacity="0.12"
            stroke={C.success}
            strokeWidth="1.5"
          />
          <text
            x="570"
            y="136"
            textAnchor="middle"
            fontSize="11"
            fill={C.primary}
          >
            lambda: now() 在 t1
          </text>
          <text x="46" y="158" fontSize="11" fill={C.secondary}>
            延迟闹钟要求 now()+1h
            在每次调用计算；先问“何时求值”，再看哪种写法更短
          </text>

          {STEPS.map((step, index) => {
            const faulted = earlyBindFault && (index === 1 || index === 2);
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
                      1 · contract：先分 construction 和 invocation
                    </text>
                    <text x="48" y="241" fontSize="12" fill={C.primary}>
                      callable 不只要“能调用”，还要说明
                      target、参数来源、求值时机和 storage
                    </text>
                    <text x="48" y="267" fontSize="12" fill={C.primary}>
                      目标：每次调用都从当前时间计算一小时后的
                      alarm，而不是复用旧 absolute time
                    </text>
                    <text x="48" y="299" fontSize="11" fill={C.secondary}>
                      把这条时间契约写出来，后面的 lambda / bind
                      差异才有可验收标准
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
                      fill={faulted ? C.danger : C.warning}
                    >
                      2 · bind：普通 bound expression 在 t0 求值
                    </text>
                    <text x="48" y="241" fontSize="12" fill={C.primary}>
                      std::bind(setAlarm, steady_clock::now()+1h, _1, 30s)
                      先计算 now()
                    </text>
                    <text x="48" y="267" fontSize="12" fill={C.primary}>
                      adaptor 存下 absolute
                      time；十分钟后调用时只剩五十分钟，重复调用还复用旧值
                    </text>
                    <text x="48" y="299" fontSize="11" fill={C.secondary}>
                      nested bind 能补救，但会把业务意图埋入另一个 adaptor
                      protocol
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
                      fill={faulted ? C.danger : C.success}
                    >
                      3 · lambda：body 把 now() 留到 t1
                    </text>
                    <text x="48" y="241" fontSize="12" fill={C.primary}>
                      [](Sound sound) &#123; setAlarm(now()+1h, sound, 30s);
                      &#125; 每次 invocation 重算
                    </text>
                    <text x="48" y="267" fontSize="12" fill={C.primary}>
                      capture 初始化仍在 creation 求值，但普通 body statement
                      的边界一眼可见
                    </text>
                    <text x="48" y="299" fontSize="11" fill={C.secondary}>
                      lambda 不是自动正确；把 when 错误地 capture 仍会制造
                      creation-time snapshot
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
                      4 · overload：lambda 保留真实 call context
                    </text>
                    <text x="48" y="241" fontSize="12" fill={C.primary}>
                      lambda body 里有完整实参，ordinary overload resolution
                      在调用点完成选择
                    </text>
                    <text x="48" y="267" fontSize="12" fill={C.primary}>
                      bind 接收裸 overloaded function name 时常需先声明 function
                      pointer 再 cast
                    </text>
                    <text x="48" y="299" fontSize="11" fill={C.secondary}>
                      signature 变化时，bind 的重复 type alias 也需要同步维护
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
                      fill={C.accent}
                    >
                      5 · forward：lambda 把 value category 写出来
                    </text>
                    <text x="48" y="241" fontSize="12" fill={C.primary}>
                      auto&amp;&amp; value +
                      std::forward&lt;decltype(value)&gt;(value) 保留 caller
                      category
                    </text>
                    <text x="48" y="267" fontSize="12" fill={C.primary}>
                      bind placeholder 也有 forwarding 规则，但 `_1` 隐藏了
                      cv/reference policy
                    </text>
                    <text x="48" y="299" fontSize="11" fill={C.secondary}>
                      stored bound value 与 unbound argument
                      不是同一路径，不能笼统说“都转发”
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
                      6 · audit：确认 callable 语义真的等价
                    </text>
                    <text x="48" y="241" fontSize="12" fill={C.primary}>
                      比较 construction/invocation timing、copy/reference/move
                      storage 和 overload winner
                    </text>
                    <text x="48" y="267" fontSize="12" fill={C.primary}>
                      再用 fake clock、overload probes、copy/move counters
                      验证重复调用行为
                    </text>
                    <text x="48" y="299" fontSize="11" fill={C.secondary}>
                      C++11 或既有兼容 API 可能保留 bind；新代码默认让 lambda
                      承担可读语义
                    </text>
                  </>
                )}
              </g>
            );
          })}

          {earlyBindFault && (
            <g>
              <path
                d="M 684 338 C 644 306, 598 274, 548 238"
                fill="none"
                stroke={C.danger}
                strokeWidth="3"
                strokeDasharray="8 6"
                markerEnd="url(#emcpp-item34-bind-fault-arrow)"
              />
              <rect
                x="166"
                y="326"
                width="508"
                height="28"
                rx="8"
                fill={C.warning}
                fillOpacity="0.12"
                stroke={C.danger}
                strokeWidth="1.5"
              />
              <text
                x="184"
                y="346"
                fontSize="11"
                fontWeight="700"
                fill={C.danger}
              >
                故障注入：bind 在 t0 固化 now()；修法：把动态表达式留在 lambda
                body
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
            markerEnd="url(#emcpp-item34-bind-arrow)"
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
                markerEnd="url(#emcpp-item34-bind-arrow)"
              />
            );
          })}

          {STEPS.map((step, index) => {
            const box = BOXES[index];
            const selected = index === activeIndex;
            const faulted = earlyBindFault && (index === 1 || index === 2);
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
                    ? "契约"
                    : index === 1
                      ? "bind"
                      : index === 2
                        ? "lambda"
                        : index === 3
                          ? "重载"
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
                    ? "t0"
                    : index < 2
                      ? "timing"
                      : index < 5
                        ? "policy"
                        : "matrix"}
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
          caption="按步骤检查 evaluation boundary、overload context 和 storage policy；单步最适合复现延迟闹钟错误。"
          reset={{
            label: "重置时间线",
            ariaLabel: "重置 Item 34 lambda bind 时间线",
            onClick: reset,
          }}
        />

        <button
          type="button"
          aria-pressed={earlyBindFault}
          onClick={() => setEarlyBindFault((value) => !value)}
          className={`mx-auto mt-3 block min-h-11 rounded-control border px-4 py-2 text-sm transition-colors ${
            earlyBindFault
              ? "border-danger bg-danger/10 text-danger"
              : "border-border text-secondary hover:border-danger hover:text-danger"
          }`}
        >
          {earlyBindFault ? "关闭提前 bind 故障" : "注入提前 bind 故障"}
        </button>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        prefer lambdas 的核心是 semantic readability：把时间、参数、重载和
        ownership policy 放回普通代码表面。
      </figcaption>
    </figure>
  );
}
