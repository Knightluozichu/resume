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
} as const;

const T = TEACHING_BEAT_MS;

const STEPS: readonly TeachingStep[] = [
  {
    label: "base",
    caption: "先找到 Base 的 virtual slot：virtual void refresh() const",
  },
  {
    label: "intent",
    caption: "Derived 用 override 明确声明：我想替换这个 slot",
  },
  {
    label: "fingerprint",
    caption: "对齐 name、参数、cv、ref qualifier、返回和异常契约",
  },
  {
    label: "mismatch",
    caption: "const、int/unsigned 或 &/&& 任一错配都会形成新函数",
  },
  {
    label: "compiler",
    caption: "override gate 把静默隐藏转成声明处的编译期诊断",
  },
  { label: "dispatch", caption: "契约通过后，Base& 调用才会到达 Derived 实现" },
];

const LABEL_TEXT: Readonly<Record<string, string>> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

const BOXES = STEPS.map((_, index) => ({
  x: 28 + index * 135,
  y: 126,
}));

export function EmcppItem12OverrideContractLab() {
  const stageRefs = useRef<Array<SVGGElement | null>>([]);
  const [mismatchInjected, setMismatchInjected] = useState(false);

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      STEPS.forEach((step, index) => {
        tl.add(
          stageRefs.current[index]!,
          { opacity: [0, 1], duration: T * 0.55, ease: "out(3)" },
          index * T,
        );
        // label 位于该阶段动画的起点，控制条与画面保持同一语义时刻。
        tl.label(step.label, index * T);
      });
    },
  });

  const activeIndex = Math.min(STEPS.length - 1, timeline.currentStep);
  const activeStep = STEPS[activeIndex];

  function reset() {
    timeline.goToStep(0);
    setMismatchInjected(false);
  }

  return (
    <figure
      className="mdx-figure not-prose mx-auto my-8"
      data-visual-kind="emcpp-item-12-override-contract"
    >
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-6">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              Effective Modern C++ · Item 12
            </p>
            <h3 className="mt-1 text-lg font-semibold text-primary">
              override 是一扇编译期合同闸门
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
              先对齐 virtual slot 的完整函数类型，再让 compiler
              判断是否真的覆盖；打开故障可以观察“同名但不覆盖”的路径。
            </p>
          </div>
        </div>

        <svg
          viewBox="0 0 840 420"
          role="img"
          aria-label="Effective Modern C++ Item 12 override 合同时间线：从 Base virtual slot 到 Derived override 意图，核对名称参数 const 引用限定返回和异常契约，识别错配并在编译期拒绝，最后通过 Base 引用动态分派到 Derived。可播放、暂停、单步、拖进度，并可注入签名错配故障。"
          className="mx-auto block h-auto w-full"
        >
          <defs>
            <marker
              id="emcpp-item12-override-arrow"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
            >
              <path d="M0,0 L6,3 L0,6 Z" fill={C.border} />
            </marker>
            <marker
              id="emcpp-item12-override-fault-arrow"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
            >
              <path d="M0,0 L6,3 L0,6 Z" fill={C.danger} />
            </marker>
          </defs>

          <rect x="0" y="0" width="840" height="420" rx="14" fill={C.bg} />
          <text x="28" y="34" fontSize="16" fontWeight="700" fill={C.primary}>
            覆盖合同：从 virtual slot 到动态分派
          </text>
          <text x="28" y="58" fontSize="12" fill={C.secondary}>
            name · parameters · cv · ref qualifier · return · exception
          </text>

          <line
            x1="82"
            y1="176"
            x2="756"
            y2="176"
            stroke={C.border}
            strokeWidth="2"
            markerEnd="url(#emcpp-item12-override-arrow)"
          />

          {STEPS.slice(0, -1).map((step, index) => {
            const start = BOXES[index];
            const end = BOXES[index + 1];
            return (
              <line
                key={`connector-${step.label}`}
                x1={start.x + 110}
                y1="176"
                x2={end.x - 10}
                y2="176"
                stroke={index < activeIndex ? C.success : C.border}
                strokeWidth={index < activeIndex ? 3 : 1.5}
                markerEnd="url(#emcpp-item12-override-arrow)"
              />
            );
          })}

          {STEPS.map((step, index) => {
            const box = BOXES[index];
            const selected = index === activeIndex;
            const failed = mismatchInjected && index === 3;
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
                  height="100"
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
                  y={box.y + 58}
                  textAnchor="middle"
                  fontSize="11"
                  fill={C.secondary}
                >
                  {index === 0
                    ? "virtual slot"
                    : index === 1
                      ? "intent"
                      : index === 2
                        ? "function type"
                        : index === 3
                          ? "hiding"
                          : index === 4
                            ? "diagnostic"
                            : "Base& → D"}
                </text>
                <text
                  x={box.x + 55}
                  y={box.y + 80}
                  textAnchor="middle"
                  fontSize="11"
                  fill={failed ? C.danger : selected ? C.accent : C.secondary}
                >
                  {failed
                    ? "reject"
                    : index < 3
                      ? "核对"
                      : index === 4
                        ? "阻止"
                        : "通过"}
                </text>
              </g>
            );
          })}

          {mismatchInjected && (
            <g>
              <path
                d="M 290 244 C 340 286, 395 286, 448 244"
                fill="none"
                stroke={C.danger}
                strokeWidth="3"
                strokeDasharray="8 6"
                markerEnd="url(#emcpp-item12-override-fault-arrow)"
              />
              <rect
                x="286"
                y="292"
                width="300"
                height="48"
                rx="10"
                fill={C.danger}
                fillOpacity="0.1"
                stroke={C.danger}
                strokeWidth="1.5"
              />
              <text
                x="302"
                y="313"
                fontSize="12"
                fontWeight="700"
                fill={C.danger}
              >
                故障：const / 参数 / ref 不一致
              </text>
              <text x="302" y="330" fontSize="11" fill={C.secondary}>
                现象：同名函数隐藏；修法：保留 override 并修正完整签名
              </text>
            </g>
          )}

          <rect
            x="28"
            y="366"
            width="784"
            height="30"
            rx="8"
            fill={C.success}
            fillOpacity="0.1"
            stroke={C.success}
            strokeWidth="1"
          />
          <text x="44" y="386" fontSize="12" fontWeight="700" fill={C.success}>
            当前验收门：{activeStep.caption}
          </text>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="每个 label 都位于该层合同开始建立的时刻；可单步查看错配如何被拦截。"
          reset={{
            label: "重置时间线",
            ariaLabel: "重置 Item 12 override 合同时间线",
            onClick: reset,
          }}
        />

        <button
          type="button"
          aria-pressed={mismatchInjected}
          onClick={() => setMismatchInjected((value) => !value)}
          className={`mx-auto mt-3 block min-h-11 rounded-control border px-4 py-2 text-sm transition-colors ${
            mismatchInjected
              ? "border-danger bg-danger/10 text-danger"
              : "border-border text-secondary hover:border-danger hover:text-danger"
          }`}
        >
          {mismatchInjected ? "关闭签名错配故障" : "注入签名错配故障"}
        </button>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        `override` 不是装饰性关键词，而是把继承层次中的“我想覆盖”变成 compiler
        可验证的合同。
      </figcaption>
    </figure>
  );
}
