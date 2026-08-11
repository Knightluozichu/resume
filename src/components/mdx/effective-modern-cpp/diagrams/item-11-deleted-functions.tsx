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
    label: "legacy",
    caption:
      "private undefined functions 先过 access check，错误被推迟到 linker",
  },
  {
    label: "delete",
    caption:
      "deleted functions 保留在 candidate set，但声明直接表达“不允许使用”",
  },
  {
    label: "diagnostic",
    caption:
      "最佳候选是 deleted function 时，在首次调用点产生 compile-time error",
  },
  {
    label: "overload",
    caption: "delete overload 用精确签名拦截 bool、char 和 floating-point 转换",
  },
  {
    label: "specialize",
    caption:
      "template specialization 删除 void 与 character pointer 的不支持实例",
  },
  {
    label: "matrix",
    caption: "compile-time rejection matrix 覆盖 cv 变体、允许路径与禁止路径",
  },
];

const LABEL_TEXT: Readonly<Record<string, string>> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

const BOXES = STEPS.map((_, index) => ({
  x: 28 + index * 135,
  y: 136,
}));

export function EmcppItem11DeletedFunctionsLab() {
  const stageRefs = useRef<Array<SVGGElement | null>>([]);
  const [legacyShortcut, setLegacyShortcut] = useState(false);

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      STEPS.forEach((step, index) => {
        tl.add(
          stageRefs.current[index]!,
          { opacity: [0, 1], duration: T * 0.55, ease: "out(3)" },
          index * T,
        );
        // 每个 label 对齐本阶段动画起点，保证步骤文案与图中的诊断边界同步。
        tl.label(step.label, index * T);
      });
    },
  });

  const activeIndex = Math.min(STEPS.length - 1, timeline.currentStep);
  const activeStep = STEPS[activeIndex];

  function reset() {
    timeline.goToStep(0);
    setLegacyShortcut(false);
  }

  return (
    <figure
      className="mdx-figure not-prose mx-auto my-8"
      data-visual-kind="emcpp-item-11-deleted-functions"
    >
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-6">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              Effective Modern C++ · Item 11
            </p>
            <h3 className="mt-1 text-lg font-semibold text-primary">
              把“禁止使用”提前到首次调用点
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
              逐步观察删除函数如何从 access/link 阶段迁移到 overload
              resolution，并扩展为可检查的输入与指针类型防火墙。
            </p>
          </div>
        </div>

        <svg
          viewBox="0 0 840 430"
          role="img"
          aria-label="Effective Modern C++ Item 11 删除函数教学时间线：从 private undefined functions 的 access check 和 deferred link failure 开始，切换到 public deleted functions；deleted candidate 参与 overload resolution，最佳候选在调用点产生 compile-time error；delete overload 阻止危险标量转换，template specialization 删除不支持指针实例，最后用 compile-time rejection matrix 覆盖 cv 变体。可播放、暂停、单步、拖进度、重置，并可注入旧式 private 误区。"
          className="mx-auto block h-auto w-full"
        >
          <defs>
            <marker
              id="emcpp-item11-delete-arrow"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
            >
              <path d="M0,0 L6,3 L0,6 Z" fill={C.border} />
            </marker>
            <marker
              id="emcpp-item11-delete-fault-arrow"
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
            declaration → candidate → diagnostic → matrix
          </text>
          <text x="28" y="58" fontSize="12" fill={C.secondary}>
            access control · overload ranking · compile-time error ·
            specialization
          </text>

          <line
            x1="82"
            y1="186"
            x2="756"
            y2="186"
            stroke={C.border}
            strokeWidth="2"
            markerEnd="url(#emcpp-item11-delete-arrow)"
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
                markerEnd="url(#emcpp-item11-delete-arrow)"
              />
            );
          })}

          {STEPS.map((step, index) => {
            const box = BOXES[index];
            const selected = index === activeIndex;
            const failed = legacyShortcut && index === 2;
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
                    ? "link later"
                    : index === 1
                      ? "candidate"
                      : index === 2
                        ? "call-site"
                        : index === 3
                          ? "bool / char"
                          : index === 4
                            ? "T* cases"
                            : "cv matrix"}
                </text>
                <text
                  x={box.x + 55}
                  y={box.y + 82}
                  textAnchor="middle"
                  fontSize="11"
                  fill={failed ? C.danger : selected ? C.accent : C.secondary}
                >
                  {failed
                    ? "错过首点"
                    : index === 0
                      ? "deferred"
                      : index === 1
                        ? "参与"
                        : index === 2
                          ? "compile-time"
                          : index === 3
                            ? "firewall"
                            : index === 4
                              ? "delete"
                              : "reject"}
                </text>
              </g>
            );
          })}

          {legacyShortcut && (
            <g>
              <path
                d="M 342 244 C 290 292, 230 292, 184 244"
                fill="none"
                stroke={C.danger}
                strokeWidth="3"
                strokeDasharray="8 6"
                markerEnd="url(#emcpp-item11-delete-fault-arrow)"
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
                故障：把 private undefined functions 当成完整删除契约
              </text>
              <text x="193" y="332" fontSize="11" fill={C.secondary}>
                现象：member/friend 可能越过 access check；修法：public
                delete，让最佳候选在首点报错
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
          caption="每个 label 位于删除契约继续收紧的动画起点；可单步检查 candidate set、诊断点和禁止类型覆盖。"
          reset={{
            label: "重置时间线",
            ariaLabel: "重置 Item 11 删除函数时间线",
            onClick: reset,
          }}
        />

        <button
          type="button"
          aria-pressed={legacyShortcut}
          onClick={() => setLegacyShortcut((value) => !value)}
          className={`mx-auto mt-3 block min-h-11 rounded-control border px-4 py-2 text-sm transition-colors ${
            legacyShortcut
              ? "border-danger bg-danger/10 text-danger"
              : "border-border text-secondary hover:border-danger hover:text-danger"
          }`}
        >
          {legacyShortcut ? "关闭 private 误区" : "注入 private 误区"}
        </button>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        deleted functions 让“禁止形成这次调用”成为可诊断的 compile-time
        contract；delete overload 与 template specialization
        再把边界扩展到输入类型矩阵。
      </figcaption>
    </figure>
  );
}
