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
    label: "scope",
    caption:
      "unscoped enums 把 enumerators 送进外围 scope，形成 enumerator pollution",
  },
  {
    label: "qualified",
    caption:
      "scoped enums 用 EnumType::enumerator 限定访问，名称和类型一起到达调用点",
  },
  {
    label: "conversion",
    caption: "scoped enums 拒绝隐式转整数；需要数值时在协议边界显式提取",
  },
  {
    label: "representation",
    caption:
      "underlying type 固定对象表示；明确宽度也让 ABI 与 wire 边界可审计",
  },
  {
    label: "forward",
    caption:
      "forward declaration 先暴露 enum type，definition 必须复用相同 underlying type",
  },
  {
    label: "validate",
    caption:
      "外部整数先做 enumerator domain validation，再进入业务状态或 serializer",
  },
];

const LABEL_TEXT: Readonly<Record<string, string>> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

const BOXES = STEPS.map((_, index) => ({
  x: 28 + index * 135,
  y: 136,
}));

export function EmcppItem10ScopedEnumsLab() {
  const stageRefs = useRef<Array<SVGGElement | null>>([]);
  const [implicitConversionFault, setImplicitConversionFault] = useState(false);

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      STEPS.forEach((step, index) => {
        tl.add(
          stageRefs.current[index]!,
          { opacity: [0, 1], duration: T * 0.55, ease: "out(3)" },
          index * T,
        );
        // label 放在每个教学阶段动画的起点，让字幕、步点和 SVG 同步。
        tl.label(step.label, index * T);
      });
    },
  });

  const activeIndex = Math.min(STEPS.length - 1, timeline.currentStep);
  const activeStep = STEPS[activeIndex];

  function reset() {
    timeline.goToStep(0);
    setImplicitConversionFault(false);
  }

  return (
    <figure
      className="mdx-figure not-prose mx-auto my-8"
      data-visual-kind="emcpp-item-10-scoped-enums"
    >
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-6">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              Effective Modern C++ · Item 10
            </p>
            <h3 className="mt-1 text-lg font-semibold text-primary">
              从名称隔离到可验证的枚举契约
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
              逐步观察 scoped enum 如何收紧 name lookup、conversion、layout 和
              header 依赖；最后在外部整数边界验证合法 enumerator。
            </p>
          </div>
        </div>

        <svg
          viewBox="0 0 840 430"
          role="img"
          aria-label="Effective Modern C++ Item 10 作用域枚举教学时间线：从 unscoped enums 的 enumerator pollution 开始，展示 scoped enums 的 qualified enumerator access，说明隐式枚举到整数转换为何被阻止，再固定 underlying type，使用 forward declaration 隔离头文件依赖，最后执行 enumerator domain validation。可播放、暂停、单步、拖进度、重置，并可注入隐式转换故障。"
          className="mx-auto block h-auto w-full"
        >
          <defs>
            <marker
              id="emcpp-item10-enum-arrow"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
            >
              <path d="M0,0 L6,3 L0,6 Z" fill={C.border} />
            </marker>
            <marker
              id="emcpp-item10-enum-fault-arrow"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
            >
              <path d="M0,0 L6,3 L0,6 Z" fill={C.danger} />
            </marker>
          </defs>

          <rect x="0" y="0" width="840" height="430" rx="14" fill={C.bg} />
          <text x="28" y="34" fontSize="16" fontWeight="700" fill={C.primary}>
            unscoped → scoped → representation → boundary
          </text>
          <text x="28" y="58" fontSize="12" fill={C.secondary}>
            name scope · conversion · underlying type · forward declaration ·
            validation
          </text>

          <line
            x1="82"
            y1="186"
            x2="756"
            y2="186"
            stroke={C.border}
            strokeWidth="2"
            markerEnd="url(#emcpp-item10-enum-arrow)"
          />

          {STEPS.slice(0, -1).map((step, index) => {
            const start = BOXES[index];
            const end = BOXES[index + 1];
            return (
              <line
                key={`connector-${step.label}`}
                x1={start.x + 110}
                y1="186"
                x2={end.x - 10}
                y2="186"
                stroke={index < activeIndex ? C.success : C.border}
                strokeWidth={index < activeIndex ? 3 : 1.5}
                markerEnd="url(#emcpp-item10-enum-arrow)"
              />
            );
          })}

          {STEPS.map((step, index) => {
            const box = BOXES[index];
            const selected = index === activeIndex;
            const failed = implicitConversionFault && index === 2;
            return (
              <g
                key={step.label}
                ref={(node) => {
                  stageRefs.current[index] = node;
                }}
                style={{ opacity: 0 }}
              >
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
                    ? "names leak"
                    : index === 1
                      ? "Enum::value"
                      : index === 2
                        ? "no int cast"
                        : index === 3
                          ? "fixed width"
                          : index === 4
                            ? "same contract"
                            : "reject unknown"}
                </text>
                <text
                  x={box.x + 55}
                  y={box.y + 82}
                  textAnchor="middle"
                  fontSize="11"
                  fill={failed ? C.danger : selected ? C.accent : C.secondary}
                >
                  {failed
                    ? "bug enters API"
                    : index === 0
                      ? "pollution"
                      : index === 1
                        ? "qualified"
                        : index === 2
                          ? "explicit"
                          : index === 3
                            ? "ABI / wire"
                            : index === 4
                              ? "isolate"
                              : "validate"}
                </text>
              </g>
            );
          })}

          {implicitConversionFault && (
            <g>
              <path
                d="M 342 244 C 292 292, 232 292, 184 244"
                fill="none"
                stroke={C.danger}
                strokeWidth="3"
                strokeDasharray="8 6"
                markerEnd="url(#emcpp-item10-enum-fault-arrow)"
              />
              <rect
                x="175"
                y="290"
                width="490"
                height="54"
                rx="10"
                fill={C.warning}
                fillOpacity="0.12"
                stroke={C.danger}
                strokeWidth="1.5"
              />
              <text
                x="193"
                y="313"
                fontSize="12"
                fontWeight="700"
                fill={C.danger}
              >
                故障：把 scoped enum 当成可隐式转 int 的旧 enum
              </text>
              <text x="193" y="332" fontSize="11" fill={C.secondary}>
                现象：无关 overload 接收到数值；修法：API 接收
                enum，协议边界显式 extraction
              </text>
            </g>
          )}

          <rect
            x="28"
            y="374"
            width="784"
            height="30"
            rx="8"
            fill={C.success}
            fillOpacity="0.1"
            stroke={C.success}
            strokeWidth="1"
          />
          <text x="44" y="394" fontSize="12" fontWeight="700" fill={C.success}>
            当前验收门：{activeStep.caption}
          </text>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="每个 label 位于一个枚举契约阶段的动画起点；可单步核对名称、类型、表示和边界验证。"
          reset={{
            label: "重置时间线",
            ariaLabel: "重置 Item 10 作用域枚举时间线",
            onClick: reset,
          }}
        />

        <button
          type="button"
          aria-pressed={implicitConversionFault}
          onClick={() => setImplicitConversionFault((value) => !value)}
          className={`mx-auto mt-3 block min-h-11 rounded-control border px-4 py-2 text-sm transition-colors ${
            implicitConversionFault
              ? "border-danger bg-danger/10 text-danger"
              : "border-border text-secondary hover:border-danger hover:text-danger"
          }`}
        >
          {implicitConversionFault ? "关闭隐式转换故障" : "注入隐式转换故障"}
        </button>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        scoped enums 把名称与类型边界一起带到调用点；underlying type 和 forward
        declaration 解决表示与依赖，外部整数仍需独立验证合法 enumerator。
      </figcaption>
    </figure>
  );
}
