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
    label: "predict",
    caption:
      "view deduced types 先预测完整声明：const Widget* const& param，而不是只猜一个字符串",
  },
  {
    label: "ide",
    caption:
      "ide editor 适合即时观察；hover 可能展开 alias，也可能折叠 reference 与 cv",
  },
  {
    label: "diagnostic",
    caption:
      "compiler diagnostics 通过 incomplete helper 暴露 specialization，但文本仍依赖实现",
  },
  {
    label: "assert",
    caption:
      "static_assert 用 decltype 固定 compile-time type contract，适合作为 CI 门禁",
  },
  {
    label: "behavior",
    caption:
      "runtime output 与 typeid 只提供观察；再用 alias、const 和 lifetime 行为验证语义",
  },
  {
    label: "limits",
    caption:
      "type display limitations：reference 与 top-level cv 可能丢失，不能把显示当作语言契约",
  },
];

const LABEL_TEXT: Readonly<Record<string, string>> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

const BOXES = STEPS.map((_, index) => ({
  x: 28 + index * 135,
  y: 330,
}));

export function EmcppItem04ViewDeducedTypesLab() {
  const stageRefs = useRef<Array<SVGGElement | null>>([]);
  const [typeidMisread, setTypeidMisread] = useState(false);

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      STEPS.forEach((step, index) => {
        tl.add(
          stageRefs.current[index]!,
          { opacity: [0, 1], duration: T * 0.55, ease: "out(3)" },
          index * T,
        );
        // label 对齐证据出现的起点，单步时不会让字幕落后于图中证据。
        tl.label(step.label, index * T);
      });
    },
  });

  const activeIndex = Math.min(STEPS.length - 1, timeline.currentStep);
  const activeStep = STEPS[activeIndex];

  function reset() {
    timeline.goToStep(0);
    setTypeidMisread(false);
  }

  return (
    <figure
      className="mdx-figure not-prose mx-auto my-8"
      data-visual-kind="emcpp-item-04-view-deduced-types"
    >
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-6">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              Effective Modern C++ · Item 4
            </p>
            <h3 className="mt-1 text-lg font-semibold text-primary">
              先预测，再选择能保留信息的证据
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
              同一份类型问题会经过
              IDE、诊断、断言与运行期观察；每种工具都只保留一部分信息。
            </p>
          </div>
        </div>

        <svg
          viewBox="0 0 840 470"
          role="img"
          aria-label="Effective Modern C++ Item 4 view deduced types 教学时间线：先预测 const Widget pointer const reference 的完整声明，再依次比较 ide editor、compiler diagnostics、static_assert、runtime output 与 typeid、behavior evidence；最后标出 type display limitations，说明 reference 和 top-level cv 可能丢失。可播放、暂停、单步、拖进度、重置，并可注入把 typeid 输出误当成完整声明的故障。"
          className="mx-auto block h-auto w-full"
        >
          <defs>
            <marker
              id="emcpp-item04-types-arrow"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
            >
              <path d="M0,0 L6,3 L0,6 Z" fill={C.border} />
            </marker>
            <marker
              id="emcpp-item04-types-fault-arrow"
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
            expected type → evidence → behavior → contract
          </text>
          <text x="28" y="58" fontSize="12" fill={C.secondary}>
            source declaration · tool display · information loss · compile-time
            proof
          </text>

          <rect
            x="28"
            y="82"
            width="330"
            height="86"
            rx="12"
            fill={C.elevated}
            stroke={C.border}
            strokeWidth="1.5"
          />
          <text x="46" y="108" fontSize="12" fontWeight="700" fill={C.accent}>
            真实声明：param
          </text>
          <text x="46" y="135" fontSize="16" fontWeight="700" fill={C.primary}>
            const Widget* const&amp;
          </text>
          <text x="46" y="155" fontSize="11" fill={C.secondary}>
            pointee const · pointer const · lvalue reference
          </text>

          <rect
            x="382"
            y="82"
            width="430"
            height="86"
            rx="12"
            fill={C.accent}
            fillOpacity="0.1"
            stroke={C.accent}
            strokeWidth="1.5"
          />
          <text x="402" y="108" fontSize="12" fontWeight="700" fill={C.accent}>
            先预测：你想验证哪一层？
          </text>
          <text x="402" y="135" fontSize="12" fill={C.primary}>
            typeid(param) 可能只展示 const Widget*
          </text>
          <text x="402" y="155" fontSize="11" fill={C.secondary}>
            把“看到的字符串”和“源码声明”分开记录
          </text>

          <line
            x1="82"
            y1="205"
            x2="756"
            y2="205"
            stroke={C.border}
            strokeWidth="2"
            markerEnd="url(#emcpp-item04-types-arrow)"
          />

          {STEPS.slice(0, -1).map((step, index) => {
            const start = BOXES[index];
            const end = BOXES[index + 1];
            return (
              <line
                key={`connector-${step.label}`}
                x1={start.x + 110}
                y1="382"
                x2={end.x - 10}
                y2="382"
                stroke={index < activeIndex ? C.success : C.border}
                strokeWidth={index < activeIndex ? 3 : 1.5}
                markerEnd="url(#emcpp-item04-types-arrow)"
              />
            );
          })}

          {STEPS.map((step, index) => {
            const box = BOXES[index];
            const selected = index === activeIndex;
            const failed = typeidMisread && index === 4;
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
                    ? "完整声明"
                    : index === 1
                      ? "hover"
                      : index === 2
                        ? "specialization"
                        : index === 3
                          ? "decltype"
                          : index === 4
                            ? "typeid / test"
                            : "边界"}
                </text>
                <text
                  x={box.x + 55}
                  y={box.y + 82}
                  textAnchor="middle"
                  fontSize="11"
                  fill={failed ? C.danger : selected ? C.accent : C.secondary}
                >
                  {failed
                    ? "误读"
                    : index === 0
                      ? "predict"
                      : index === 1
                        ? "observe"
                        : index === 2
                          ? "expose"
                          : index === 3
                            ? "assert"
                            : index === 4
                              ? "behave"
                              : "limit"}
                </text>
              </g>
            );
          })}

          {typeidMisread && (
            <g>
              <path
                d="M 612 302 C 562 278, 502 278, 454 302"
                fill="none"
                stroke={C.danger}
                strokeWidth="3"
                strokeDasharray="8 6"
                markerEnd="url(#emcpp-item04-types-fault-arrow)"
              />
              <rect
                x="174"
                y="246"
                width="492"
                height="56"
                rx="10"
                fill={C.warning}
                fillOpacity="0.12"
                stroke={C.danger}
                strokeWidth="1.5"
              />
              <text
                x="192"
                y="269"
                fontSize="12"
                fontWeight="700"
                fill={C.danger}
              >
                故障：把 typeid(param) 当作完整参数声明
              </text>
              <text x="192" y="289" fontSize="11" fill={C.secondary}>
                现象：reference 与 pointer const 消失；修法：用 decltype +
                static_assert 固定契约
              </text>
            </g>
          )}

          <rect
            x="28"
            y="432"
            width="784"
            height="26"
            rx="8"
            fill={C.success}
            fillOpacity="0.1"
            stroke={C.success}
            strokeWidth="1"
          />
          <text x="44" y="450" fontSize="12" fontWeight="700" fill={C.success}>
            当前验收门：{activeStep.caption}
          </text>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="每个 label 位于一种证据出现的起点；可单步比较观察、断言和行为验证各自保留的信息。"
          reset={{
            label: "重置时间线",
            ariaLabel: "重置 Item 4 view deduced types 时间线",
            onClick: reset,
          }}
        />

        <button
          type="button"
          aria-pressed={typeidMisread}
          onClick={() => setTypeidMisread((value) => !value)}
          className={`mx-auto mt-3 block min-h-11 rounded-control border px-4 py-2 text-sm transition-colors ${
            typeidMisread
              ? "border-danger bg-danger/10 text-danger"
              : "border-border text-secondary hover:border-danger hover:text-danger"
          }`}
        >
          {typeidMisread ? "关闭 typeid 误读故障" : "注入 typeid 误读故障"}
        </button>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        工具是证据来源，不是语言契约：用 typeid 观察运行路径，用 static_assert
        和行为测试守住完整类型。
      </figcaption>
    </figure>
  );
}
