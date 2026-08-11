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
    label: "observe",
    caption:
      "weak_ptr 为 pointers that can dangle 提供 non-owning observation，不增加 strong count",
  },
  {
    label: "snapshot",
    caption: "expired 只是一瞬间快照；lock expired 是正常分支，不应先查后用",
  },
  {
    label: "upgrade",
    caption:
      "lock 把存活检查与 strong-count 增加合并，成功得到临时 shared owner",
  },
  {
    label: "residual",
    caption:
      "object 销毁后 weak observer 仍可保留 control block，cache 要清理过期条目",
  },
  {
    label: "cycle",
    caption:
      "weak edge 不拥有反向关系，实施 cycle prevention，让强引用子图归零",
  },
  {
    label: "contract",
    caption:
      "用 lock、cache cleanup、observer callback 与 cycle destruction 固定契约",
  },
];

const LABEL_TEXT: Readonly<Record<string, string>> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

const BOXES = STEPS.map((_, index) => ({
  x: 28 + index * 135,
  y: 136,
}));

export function EmcppItem20WeakPtrLab() {
  const stageRefs = useRef<Array<SVGGElement | null>>([]);
  const [toctouFault, setToctouFault] = useState(false);

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      STEPS.forEach((step, index) => {
        tl.add(
          stageRefs.current[index]!,
          { opacity: [0, 1], duration: T * 0.55, ease: "out(3)" },
          index * T,
        );
        // label 对齐每个观察/升级阶段的动画起点，便于单步检查 lifetime window。
        tl.label(step.label, index * T);
      });
    },
  });

  const activeIndex = Math.min(STEPS.length - 1, timeline.currentStep);
  const activeStep = STEPS[activeIndex];

  function reset() {
    timeline.goToStep(0);
    setToctouFault(false);
  }

  return (
    <figure
      className="mdx-figure not-prose mx-auto my-8"
      data-visual-kind="emcpp-item-20-weak-ptr"
    >
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-6">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              Effective Modern C++ · Item 20
            </p>
            <h3 className="mt-1 text-lg font-semibold text-primary">
              观察对象，但不替对象续命
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
              逐步看 weak_ptr 如何从 control block 取得一次性的 shared ownership
              window；错误按钮会演示 expired 检查与实际使用之间的竞态。
            </p>
          </div>
        </div>

        <svg
          viewBox="0 0 840 430"
          role="img"
          aria-label="Effective Modern C++ Item 20 weak_ptr 教学时间线：weak_ptr 用于 pointers that can dangle 的非拥有观察，不增加 strong count；expired 是快照，lock 把检查与升级合并；object 销毁后 control block 可残留供 weak observer 查询；weak edge 实施 cycle prevention；最后用 lock、cache cleanup、observer callback 和 cycle destruction 固定契约。可播放、暂停、单步、拖进度、重置，并可注入 expired 后直接使用的 TOCTOU 故障。"
          className="mx-auto block h-auto w-full"
        >
          <defs>
            <marker
              id="emcpp-item20-weak-arrow"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
            >
              <path d="M0,0 L6,3 L0,6 Z" fill={C.border} />
            </marker>
            <marker
              id="emcpp-item20-weak-fault-arrow"
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
            observe → lock → lifetime window → weak edge
          </text>
          <text x="28" y="58" fontSize="12" fill={C.secondary}>
            non-owning · expired snapshot · atomic upgrade · cache cleanup ·
            cycle prevention
          </text>

          <line
            x1="82"
            y1="186"
            x2="756"
            y2="186"
            stroke={C.border}
            strokeWidth="2"
            markerEnd="url(#emcpp-item20-weak-arrow)"
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
                markerEnd="url(#emcpp-item20-weak-arrow)"
              />
            );
          })}

          {STEPS.map((step, index) => {
            const box = BOXES[index];
            const selected = index === activeIndex;
            const failed = toctouFault && index === 1;
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
                    ? "weak only"
                    : index === 1
                      ? "check ≠ keep"
                      : index === 2
                        ? "shared window"
                        : index === 3
                          ? "block remains"
                          : index === 4
                            ? "weak back"
                            : "test graph"}
                </text>
                <text
                  x={box.x + 55}
                  y={box.y + 82}
                  textAnchor="middle"
                  fontSize="11"
                  fill={failed ? C.danger : selected ? C.accent : C.secondary}
                >
                  {failed
                    ? "TOCTOU"
                    : index === 0
                      ? "observe"
                      : index === 1
                        ? "snapshot"
                        : index === 2
                          ? "lock"
                          : index === 3
                            ? "residual"
                            : index === 4
                              ? "break cycle"
                              : "contract"}
                </text>
              </g>
            );
          })}

          {toctouFault && (
            <g>
              <path
                d="M 207 244 C 257 292, 317 292, 367 244"
                fill="none"
                stroke={C.danger}
                strokeWidth="3"
                strokeDasharray="8 6"
                markerEnd="url(#emcpp-item20-weak-fault-arrow)"
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
                故障：expired 为 false 后再直接使用 observer
              </text>
              <text x="193" y="332" fontSize="11" fill={C.secondary}>
                现象：最后 owner 可在两条语句间消失；修法：一次
                lock，并持有返回的 shared_ptr
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
          caption="每个 label 位于 lifetime 语义转折的动画起点；可单步核对 snapshot、upgrade 与 weak edge。"
          reset={{
            label: "重置时间线",
            ariaLabel: "重置 Item 20 weak_ptr 生命周期时间线",
            onClick: reset,
          }}
        />

        <button
          type="button"
          aria-pressed={toctouFault}
          onClick={() => setToctouFault((value) => !value)}
          className={`mx-auto mt-3 block min-h-11 rounded-control border px-4 py-2 text-sm transition-colors ${
            toctouFault
              ? "border-danger bg-danger/10 text-danger"
              : "border-border text-secondary hover:border-danger hover:text-danger"
          }`}
        >
          {toctouFault ? "关闭 expired 竞态故障" : "注入 expired 竞态故障"}
        </button>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        weak_ptr 不延长生命周期；只有 lock 成功得到的临时 shared owner
        才能覆盖实际使用窗口，weak edge 则把这个原则带入 ownership graph。
      </figcaption>
    </figure>
  );
}
