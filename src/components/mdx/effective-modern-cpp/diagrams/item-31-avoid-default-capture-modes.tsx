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
    label: "dependency",
    caption:
      "default capture 把 closure 依赖藏在 body 中；先把名字、owner 和 escape path 摊开",
  },
  {
    label: "reference",
    caption:
      "[&] 只保存地址；closure 逃出 divisor 的作用域后，调用会读取 dangling reference",
  },
  {
    label: "snapshot",
    caption:
      "显式 [divisor] 把创建时值存进 closure；快照语义与对象 lifetime 分离",
  },
  {
    label: "this",
    caption:
      "[=] 访问成员时隐式复制 this pointer，不复制 member value，也不延长 Widget lifetime",
  },
  {
    label: "static",
    caption:
      "global/static object 不进入 capture；lambda 调用时直接读取共享状态的当前值",
  },
  {
    label: "audit",
    caption:
      "最后逐项核对 owner、escape、snapshot/live 语义、mutation visibility 与 copy cost",
  },
];

const LABEL_TEXT: Readonly<Record<string, string>> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

const BOXES = STEPS.map((_, index) => ({
  x: 28 + index * 132,
  y: 356,
}));

export function EmcppItem31CaptureAuditLab() {
  const stageRefs = useRef<Array<SVGGElement | null>>([]);
  const [escapeFault, setEscapeFault] = useState(false);

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      STEPS.forEach((step, index) => {
        tl.add(
          stageRefs.current[index]!,
          { opacity: [0, 1], duration: T * 0.55, ease: "out(3)" },
          index * T,
        );
        // label 与该步 lifetime/capture 变化的起始时刻对齐。
        tl.label(step.label, index * T);
      });
    },
  });

  const activeIndex = Math.min(STEPS.length - 1, timeline.currentStep);
  const activeStep = STEPS[activeIndex] ?? STEPS[0];

  function reset() {
    timeline.goToStep(0);
    setEscapeFault(false);
  }

  return (
    <figure
      className="mdx-figure not-prose mx-auto my-8"
      data-visual-kind="emcpp-item-31-avoid-default-capture-modes"
    >
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-6">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              Effective Modern C++ · Item 31
            </p>
            <h3 className="mt-1 text-lg font-semibold text-primary">
              把 capture 依赖放回 lifetime 图里
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
              `[&amp;]`、`[=]` 是语法捷径，不是 ownership 策略。沿着
              owner、closure 和最后一次调用的时间线，才能区分悬空、快照和 live
              state。
            </p>
          </div>
        </div>

        <svg
          viewBox="0 0 840 520"
          role="img"
          aria-label="Effective Modern C++ Item 31 教学时间线：展示 default capture 隐藏依赖、reference capture 在 closure 逃逸后悬空、显式 value snapshot、[=] 隐式复制 this pointer、global 和 static object 不进入 capture，以及最后的 capture lifetime audit。支持播放、暂停、单步、拖进度、重置和注入 closure escape 故障。"
          className="mx-auto block h-auto w-full"
        >
          <defs>
            <marker
              id="emcpp-item31-capture-arrow"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
            >
              <path d="M0,0 L6,3 L0,6 Z" fill={C.border} />
            </marker>
            <marker
              id="emcpp-item31-capture-fault-arrow"
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
            capture syntax → closure storage → last invocation
          </text>
          <text x="28" y="58" fontSize="12" fill={C.secondary}>
            dependency visibility · object lifetime · snapshot/live state ·
            owner contract
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
            同一段 lambda body，三种外部依赖
          </text>
          <rect
            x="46"
            y="116"
            width="200"
            height="32"
            rx="8"
            fill={C.elevated}
            stroke={C.border}
            strokeWidth="1.5"
          />
          <text
            x="146"
            y="137"
            textAnchor="middle"
            fontSize="12"
            fill={C.primary}
          >
            local divisor
          </text>
          <line
            x1="258"
            y1="132"
            x2="326"
            y2="132"
            stroke={C.border}
            strokeWidth="2"
            markerEnd="url(#emcpp-item31-capture-arrow)"
          />
          <rect
            x="342"
            y="116"
            width="174"
            height="32"
            rx="8"
            fill={escapeFault ? C.danger : C.accent}
            fillOpacity="0.12"
            stroke={escapeFault ? C.danger : C.accent}
            strokeWidth="1.5"
          />
          <text
            x="429"
            y="137"
            textAnchor="middle"
            fontSize="12"
            fill={C.primary}
          >
            closure object
          </text>
          <line
            x1="528"
            y1="132"
            x2="596"
            y2="132"
            stroke={escapeFault ? C.danger : C.border}
            strokeWidth="2"
            markerEnd="url(#emcpp-item31-capture-arrow)"
          />
          <rect
            x="612"
            y="116"
            width="182"
            height="32"
            rx="8"
            fill={C.elevated}
            stroke={C.border}
            strokeWidth="1.5"
          />
          <text
            x="703"
            y="137"
            textAnchor="middle"
            fontSize="12"
            fill={C.primary}
          >
            delayed call
          </text>
          <text x="46" y="158" fontSize="11" fill={C.secondary}>
            audit 的问题不是“capture 写得短不短”，而是 closure
            最后调用时依赖是否仍有 owner
          </text>

          {STEPS.map((step, index) => {
            const faulted = escapeFault && (index === 1 || index === 3);
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
                      1 · dependency：默认模式把依赖藏进 body
                    </text>
                    <text x="48" y="241" fontSize="12" fill={C.primary}>
                      `[&amp;]` / `[=]` 没有列出每个名字的 ownership 与 lifetime
                      policy
                    </text>
                    <text x="48" y="267" fontSize="12" fill={C.primary}>
                      closure 被复制、存入 queue
                      或延迟调用后，原先的局部审查不再足够
                    </text>
                    <text x="48" y="299" fontSize="11" fill={C.secondary}>
                      第一步：列出 local、this、global/static 以及 closure 的
                      escape path
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
                      2 · reference：地址复制不等于 lifetime 延长
                    </text>
                    <text x="48" y="241" fontSize="12" fill={C.primary}>
                      `[&amp;]` 让 closure 保存 divisor 的地址；函数返回后 local
                      divisor 被销毁
                    </text>
                    <text x="48" y="267" fontSize="12" fill={C.primary}>
                      后续 invocation 仍沿地址读取，形成 reference capture
                      dangling
                    </text>
                    <text x="48" y="299" fontSize="11" fill={C.secondary}>
                      “创建时能读”只证明 creation
                      point，不证明最后一次调用时仍有效
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
                      fill={C.success}
                    >
                      3 · snapshot：把值存进 closure，断开局部 lifetime
                    </text>
                    <text x="48" y="241" fontSize="12" fill={C.primary}>
                      `[divisor]` 复制创建时值；closure copy/move 后仍拥有自己的
                      data member
                    </text>
                    <text x="48" y="267" fontSize="12" fill={C.primary}>
                      C++14 init capture `[divisor = divisor_]` 也能显式固化
                      member snapshot
                    </text>
                    <text x="48" y="299" fontSize="11" fill={C.secondary}>
                      若要 live state，就捕获有 owner 的 handle；不要让
                      `[&amp;]` 代替 ownership design
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
                      fill={faulted ? C.danger : C.warning}
                    >
                      4 · this：`[=]` 复制地址，不复制成员
                    </text>
                    <text x="48" y="241" fontSize="12" fill={C.primary}>
                      body 访问 divisor_ 实际是 `this-&gt;divisor_`；closure
                      持有 this pointer 副本
                    </text>
                    <text x="48" y="267" fontSize="12" fill={C.primary}>
                      Widget 销毁后 pointer 悬空；Widget
                      仍存活但成员改变时，读取的是新值
                    </text>
                    <text x="48" y="299" fontSize="11" fill={C.secondary}>
                      真正快照：先复制 member 到 local，或使用 init capture
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
                      fill={C.warning}
                    >
                      5 · static：共享状态不在 capture 里
                    </text>
                    <text x="48" y="241" fontSize="12" fill={C.primary}>
                      global / namespace object / static local 具有 static
                      storage duration
                    </text>
                    <text x="48" y="267" fontSize="12" fill={C.primary}>
                      `[=]` 不复制 globalLimit；调用时直接读取共享对象的当前值
                    </text>
                    <text x="48" y="299" fontSize="11" fill={C.secondary}>
                      需要冻结就先复制到 automatic local；需要 live
                      就显式命名共享与同步策略
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
                      6 · audit：把每个依赖变成可验收的 contract
                    </text>
                    <text x="48" y="241" fontSize="12" fill={C.primary}>
                      owner 是否活到最后调用？closure 是否 escape？这是 snapshot
                      还是 live state？
                    </text>
                    <text x="48" y="267" fontSize="12" fill={C.primary}>
                      还要检查 mutation visibility、copy/move cost，以及
                      this/handle 的拥有关系
                    </text>
                    <text x="48" y="299" fontSize="11" fill={C.secondary}>
                      显式 capture 不是自动安全，但它让 lifetime review
                      有可定位的边界
                    </text>
                  </>
                )}
              </g>
            );
          })}

          {escapeFault && (
            <g>
              <path
                d="M 684 338 C 644 306, 598 274, 548 238"
                fill="none"
                stroke={C.danger}
                strokeWidth="3"
                strokeDasharray="8 6"
                markerEnd="url(#emcpp-item31-capture-fault-arrow)"
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
                故障注入：closure 逃出 owner/local 作用域；修法：显式 snapshot
                或稳定 handle
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
            markerEnd="url(#emcpp-item31-capture-arrow)"
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
                markerEnd="url(#emcpp-item31-capture-arrow)"
              />
            );
          })}

          {STEPS.map((step, index) => {
            const box = BOXES[index];
            const selected = index === activeIndex;
            const faulted = escapeFault && (index === 1 || index === 3);
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
                    ? "依赖"
                    : index === 1
                      ? "地址"
                      : index === 2
                        ? "快照"
                        : index === 3
                          ? "this"
                          : index === 4
                            ? "共享"
                            : "审查"}
                </text>
                <text
                  x={box.x + 52}
                  y={box.y + 82}
                  textAnchor="middle"
                  fontSize="11"
                  fill={faulted ? C.danger : selected ? C.accent : C.secondary}
                >
                  {faulted
                    ? "dangling"
                    : index < 2
                      ? "expose"
                      : index < 5
                        ? "state"
                        : "contract"}
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
          caption="单步检查 local、this、global/static 三类依赖，再决定 snapshot、live handle 或 owner contract。"
          reset={{
            label: "重置时间线",
            ariaLabel: "重置 Item 31 capture audit 时间线",
            onClick: reset,
          }}
        />

        <button
          type="button"
          aria-pressed={escapeFault}
          onClick={() => setEscapeFault((value) => !value)}
          className={`mx-auto mt-3 block min-h-11 rounded-control border px-4 py-2 text-sm transition-colors ${
            escapeFault
              ? "border-danger bg-danger/10 text-danger"
              : "border-border text-secondary hover:border-danger hover:text-danger"
          }`}
        >
          {escapeFault
            ? "关闭 closure escape 故障"
            : "注入 closure escape 故障"}
        </button>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        避免默认捕获不是禁止 `[&amp;]` 或
        `[=]`，而是要求每个捕获都能回答：谁拥有它、何时读取、是否冻结、何时结束。
      </figcaption>
    </figure>
  );
}
