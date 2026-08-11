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
    label: "deduce",
    caption:
      "auto 忠实保存 expression 的直接结果；undesired auto deduction 发生在结果是调用者不想长期持有的 proxy 时",
  },
  {
    label: "proxy",
    caption:
      "vector bool reference 用 word 与 mask 模拟单 bit，proxy class 只有在 owner 存活时才有意义",
  },
  {
    label: "owner",
    caption:
      "temporary vector 在 full expression 结束时销毁；proxy local 仍存在却已经没有有效 storage",
  },
  {
    label: "cast",
    caption:
      "explicitly typed initializer idiom 在 owner 存活时用 static_cast 生成独立目标 value",
  },
  {
    label: "choose",
    caption:
      "visible wrapper、invisible proxy 和 lazy expression 的保留策略不同，不能对所有非目标类型盲目转换",
  },
  {
    label: "audit",
    caption:
      "最后用 decltype、mutation、destruction、numeric range 和 sanitizer 固定 materialization contract",
  },
];

const LABEL_TEXT: Readonly<Record<string, string>> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

const BOXES = STEPS.map((_, index) => ({
  x: 28 + index * 132,
  y: 356,
}));

export function EmcppItem06TypedInitializerLab() {
  const stageRefs = useRef<Array<SVGGElement | null>>([]);
  const [proxyLifetimeFault, setProxyLifetimeFault] = useState(false);

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
    setProxyLifetimeFault(false);
  }

  return (
    <figure
      className="mdx-figure not-prose mx-auto my-8"
      data-visual-kind="emcpp-item-06-explicitly-typed-initializer"
    >
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-6">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              Effective Modern C++ · Item 6
            </p>
            <h3 className="mt-1 text-lg font-semibold text-primary">
              先追踪 owner，再决定是否 materialize
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
              auto 不会犯推导错误；危险在于它可能把一个依赖短命 storage 的 proxy
              精确保存下来。
            </p>
          </div>
        </div>

        <svg
          viewBox="0 0 840 520"
          role="img"
          aria-label="Effective Modern C++ Item 6 教学时间线：展示 undesired auto deduction 如何保存 vector bool reference proxy，展示 packed bit storage 与 temporary owner 的 full-expression destruction boundary，比较 plain auto 与 static_cast bool 的 explicitly typed initializer idiom，区分 visible wrapper、invisible proxy 和 lazy expression，并用 decltype、mutation、destruction、numeric range 和 sanitizer 验证 materialization contract。支持播放、暂停、单步、拖进度、重置和注入 proxy 生命周期故障。"
          className="mx-auto block h-auto w-full"
        >
          <defs>
            <marker
              id="emcpp-item06-typed-arrow"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
            >
              <path d="M0,0 L6,3 L0,6 Z" fill={C.border} />
            </marker>
            <marker
              id="emcpp-item06-typed-fault-arrow"
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
            direct type → proxy owner → lifetime boundary → target value →
            contract test
          </text>
          <text x="28" y="58" fontSize="12" fill={C.secondary}>
            undesired auto deduction · proxy class · vector bool reference ·
            static_cast · materialization
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
            同一个 initializer 的两种结果：借用代理，或独立快照
          </text>
          <rect
            x="46"
            y="116"
            width="246"
            height="32"
            rx="8"
            fill={C.warning}
            fillOpacity="0.12"
            stroke={C.warning}
            strokeWidth="1.5"
          />
          <text
            x="169"
            y="137"
            textAnchor="middle"
            fontSize="12"
            fill={C.primary}
          >
            auto：保存 direct proxy type
          </text>
          <line
            x1="308"
            y1="132"
            x2="360"
            y2="132"
            stroke={C.border}
            strokeWidth="2"
            markerEnd="url(#emcpp-item06-typed-arrow)"
          />
          <rect
            x="378"
            y="116"
            width="190"
            height="32"
            rx="8"
            fill={C.success}
            fillOpacity="0.12"
            stroke={C.success}
            strokeWidth="1.5"
          />
          <text
            x="473"
            y="137"
            textAnchor="middle"
            fontSize="12"
            fill={C.primary}
          >
            static_cast：生成 value
          </text>
          <line
            x1="584"
            y1="132"
            x2="636"
            y2="132"
            stroke={C.border}
            strokeWidth="2"
            markerEnd="url(#emcpp-item06-typed-arrow)"
          />
          <rect
            x="654"
            y="116"
            width="140"
            height="32"
            rx="8"
            fill={proxyLifetimeFault ? C.danger : C.accent}
            fillOpacity="0.12"
            stroke={proxyLifetimeFault ? C.danger : C.accent}
            strokeWidth="1.5"
          />
          <text
            x="724"
            y="137"
            textAnchor="middle"
            fontSize="12"
            fill={C.primary}
          >
            要验 owner
          </text>
          <text x="46" y="158" fontSize="11" fill={C.secondary}>
            explicit target type 让 conversion intent 可见，但不替代
            owner、range 和语义审查
          </text>

          {STEPS.map((step, index) => {
            const faulted = proxyLifetimeFault && (index === 2 || index === 3);
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
                      1 · undesired auto deduction：精确不等于合适
                    </text>
                    <text x="48" y="241" fontSize="12" fill={C.primary}>
                      auto highPriority = features(widget)[5]; direct type
                      可能是 proxy class，而不是 bool
                    </text>
                    <text x="48" y="267" fontSize="12" fill={C.primary}>
                      auto 没有推导错；它只是忠实保存 expression 的 immediate
                      result
                    </text>
                    <text x="48" y="299" fontSize="11" fill={C.secondary}>
                      先问调用者需要 snapshot、write-through proxy 还是 lazy
                      node，再决定类型
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
                      2 · proxy class：packed bit 也能像 reference 工作
                    </text>
                    <text x="48" y="241" fontSize="12" fill={C.primary}>
                      vector bool reference 记录 word address 与 bit
                      mask，读取/赋值时再访问 packed storage
                    </text>
                    <text x="48" y="267" fontSize="12" fill={C.primary}>
                      proxy 很高效，却不是独立 bool；它的有效性依赖 owner
                      storage 仍然存在
                    </text>
                    <text x="48" y="299" fontSize="11" fill={C.secondary}>
                      visible wrapper 通常是 API 明示的长期对象，invisible proxy
                      更需要查 contract
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
                      3 · owner：full expression 结束，temporary vector 销毁
                    </text>
                    <text x="48" y="241" fontSize="12" fill={C.primary}>
                      features 返回 temporary vector；indexing 产生借用内部 word
                      的 proxy
                    </text>
                    <text x="48" y="267" fontSize="12" fill={C.primary}>
                      statement 结束后 owner 被销毁，local proxy
                      仍占一个位置却已没有有效 storage
                    </text>
                    <text x="48" y="299" fontSize="11" fill={C.secondary}>
                      fault：把“proxy local 还在”误当作“owner 还在”；两者是不同
                      lifetime
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
                      4 · explicitly typed initializer idiom：在边界前
                      materialize
                    </text>
                    <text x="48" y="241" fontSize="12" fill={C.primary}>
                      auto highPriority =
                      static_cast&lt;bool&gt;(features(widget)[5]); 先读取
                      proxy，再生成 bool prvalue
                    </text>
                    <text x="48" y="267" fontSize="12" fill={C.primary}>
                      auto 最终推导 bool；owner 随后销毁也不影响已独立保存的
                      value snapshot
                    </text>
                    <text x="48" y="299" fontSize="11" fill={C.secondary}>
                      static_cast 不是装饰：它把 target-type 和 conversion
                      intent 写进 initializer
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
                      5 · choose：proxy、wrapper 和 lazy node 不能一刀切
                    </text>
                    <text x="48" y="241" fontSize="12" fill={C.primary}>
                      visible smart pointer/iterator 可有意保存；invisible proxy
                      通常应尽早变成 value
                    </text>
                    <text x="48" y="267" fontSize="12" fill={C.primary}>
                      matrixA + matrixB 可能是 lazy expression proxy；跨
                      operands lifetime 保存前先查库契约
                    </text>
                    <text x="48" y="299" fontSize="11" fill={C.secondary}>
                      若需要 lazy fusion 就维持 operands；若需要独立快照，就
                      materialize 成 owning value
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
                      6 · audit：把 conversion 和 lifetime 变成测试证据
                    </text>
                    <text x="48" y="241" fontSize="12" fill={C.primary}>
                      decltype/static_assert 固定最终类型；mutation/destruction
                      test 固定 owner 与 snapshot 行为
                    </text>
                    <text x="48" y="267" fontSize="12" fill={C.primary}>
                      numeric narrowing、index range、NaN/overflow 仍需
                      precondition；sanitizer 检查 use-after-free
                    </text>
                    <text x="48" y="299" fontSize="11" fill={C.secondary}>
                      materialization contract matrix
                      同时验收类型、精度、所有权、写回语义和失效边界
                    </text>
                  </>
                )}
              </g>
            );
          })}

          {proxyLifetimeFault && (
            <g>
              <path
                d="M 706 338 C 662 306, 614 274, 556 238"
                fill="none"
                stroke={C.danger}
                strokeWidth="3"
                strokeDasharray="8 6"
                markerEnd="url(#emcpp-item06-typed-fault-arrow)"
              />
              <rect
                x="122"
                y="326"
                width="596"
                height="28"
                rx="8"
                fill={C.warning}
                fillOpacity="0.12"
                stroke={C.danger}
                strokeWidth="1.5"
              />
              <text
                x="140"
                y="346"
                fontSize="11"
                fontWeight="700"
                fill={C.danger}
              >
                故障注入：保存 proxy 却没有 owner；修法：在 full expression 内
                materialize，或明确维持 operands lifetime
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
            markerEnd="url(#emcpp-item06-typed-arrow)"
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
                markerEnd="url(#emcpp-item06-typed-arrow)"
              />
            );
          })}

          {STEPS.map((step, index) => {
            const box = BOXES[index];
            const selected = index === activeIndex;
            const faulted = proxyLifetimeFault && (index === 2 || index === 3);
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
                    ? "直接型"
                    : index === 1
                      ? "代理"
                      : index === 2
                        ? "owner"
                        : index === 3
                          ? "快照"
                          : index === 4
                            ? "选择"
                            : "测试"}
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
                    : index < 3
                      ? "借用"
                      : index < 5
                        ? "value"
                        : "契约"}
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
          caption="按步骤检查 direct type、owner lifetime、materialization 目标和转换前置条件；单步最适合复现 vector bool proxy 悬空路径。"
          reset={{
            label: "重置时间线",
            ariaLabel: "重置 Item 6 typed initializer 时间线",
            onClick: reset,
          }}
        />

        <button
          type="button"
          aria-pressed={proxyLifetimeFault}
          onClick={() => setProxyLifetimeFault((value) => !value)}
          className={`mx-auto mt-3 block min-h-11 rounded-control border px-4 py-2 text-sm transition-colors ${
            proxyLifetimeFault
              ? "border-danger bg-danger/10 text-danger"
              : "border-border text-secondary hover:border-danger hover:text-danger"
          }`}
        >
          {proxyLifetimeFault
            ? "关闭 proxy 生命周期故障"
            : "注入 proxy 生命周期故障"}
        </button>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Item 6 的决定顺序是：查看 direct type，定位 owner，明确需要 proxy 还是
        value，再用 typed initializer 和测试锁定转换契约。
      </figcaption>
    </figure>
  );
}
