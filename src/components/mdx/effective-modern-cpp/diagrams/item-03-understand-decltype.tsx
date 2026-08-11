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
    label: "name",
    caption:
      "无括号 name 或 member access 命中特殊规则，decltype 直接报告 declared type",
  },
  {
    label: "paren",
    caption:
      "parenthesized expression 不再是 name 特例；x 作为 lvalue expression 得到 T reference",
  },
  {
    label: "category",
    caption:
      "一般 expression 按 value category 映射：lvalue 得 T reference，xvalue 得 T double ampersand，prvalue 得 T",
  },
  {
    label: "return",
    caption:
      "plain auto return 可能擦掉 indexing reference；decltype auto 保留 reference、cv 或 proxy",
  },
  {
    label: "forward",
    caption:
      "forwarding accessor 恢复 container 的 value category，但精确类型不等于安全 lifetime",
  },
  {
    label: "lifetime",
    caption:
      "临时 owner 销毁后借用返回会悬空；用 lvalue-only gate 或 rvalue value return 收口边界",
  },
];

const LABEL_TEXT: Readonly<Record<string, string>> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

const BOXES = STEPS.map((_, index) => ({
  x: 28 + index * 132,
  y: 356,
}));

export function EmcppItem03DecltypeLab() {
  const stageRefs = useRef<Array<SVGGElement | null>>([]);
  const [parenthesesFault, setParenthesesFault] = useState(false);

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
    setParenthesesFault(false);
  }

  return (
    <figure
      className="mdx-figure not-prose mx-auto my-8"
      data-visual-kind="emcpp-item-03-understand-decltype"
    >
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-6">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              Effective Modern C++ · Item 3
            </p>
            <h3 className="mt-1 text-lg font-semibold text-primary">
              先分类 expression，再读取精确类型
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
              decltype 不执行 expression；它先判断是 name 特例还是 parenthesized
              expression，再根据 value category 决定是否保留 reference。
            </p>
          </div>
        </div>

        <svg
          viewBox="0 0 840 520"
          role="img"
          aria-label="Effective Modern C++ Item 3 教学时间线：展示 decltype 对无括号名称和 member access 读取 declared type，对 parenthesized expression 按 lvalue、xvalue、prvalue 映射 reference，比较 plain auto return 与 decltype auto 对 indexing reference 或 proxy 的保留，并展示 forwarding accessor 的临时 owner 悬空与 lifetime gate。支持播放、暂停、单步、拖进度、重置和注入括号分类故障。"
          className="mx-auto block h-auto w-full"
        >
          <defs>
            <marker
              id="emcpp-item03-decltype-arrow"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
            >
              <path d="M0,0 L6,3 L0,6 Z" fill={C.border} />
            </marker>
            <marker
              id="emcpp-item03-decltype-fault-arrow"
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
            syntax form → value category → exact type → API contract → lifetime
          </text>
          <text x="28" y="58" fontSize="12" fill={C.secondary}>
            decltype · declared type · parenthesized expression ·
            lvalue/xvalue/prvalue · decltype auto
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
            同一个 x，两个语法入口
          </text>
          <rect
            x="46"
            y="116"
            width="200"
            height="32"
            rx="8"
            fill={C.warning}
            fillOpacity="0.12"
            stroke={C.warning}
            strokeWidth="1.5"
          />
          <text
            x="146"
            y="137"
            textAnchor="middle"
            fontSize="12"
            fill={C.primary}
          >
            decltype(x)
          </text>
          <line
            x1="262"
            y1="132"
            x2="322"
            y2="132"
            stroke={C.border}
            strokeWidth="2"
            markerEnd="url(#emcpp-item03-decltype-arrow)"
          />
          <rect
            x="340"
            y="116"
            width="170"
            height="32"
            rx="8"
            fill={C.success}
            fillOpacity="0.12"
            stroke={C.success}
            strokeWidth="1.5"
          />
          <text
            x="425"
            y="137"
            textAnchor="middle"
            fontSize="12"
            fill={C.primary}
          >
            declared type：int
          </text>
          <line
            x1="528"
            y1="132"
            x2="588"
            y2="132"
            stroke={C.border}
            strokeWidth="2"
            markerEnd="url(#emcpp-item03-decltype-arrow)"
          />
          <rect
            x="606"
            y="116"
            width="188"
            height="32"
            rx="8"
            fill={parenthesesFault ? C.danger : C.accent}
            fillOpacity="0.12"
            stroke={parenthesesFault ? C.danger : C.accent}
            strokeWidth="1.5"
          />
          <text
            x="700"
            y="137"
            textAnchor="middle"
            fontSize="12"
            fill={C.primary}
          >
            保留语法 contract
          </text>
          <text x="46" y="158" fontSize="11" fill={C.secondary}>
            加括号后不再命中特例：同一个对象进入 expression value-category 规则
          </text>

          {STEPS.map((step, index) => {
            const faulted = parenthesesFault && (index === 1 || index === 5);
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
                      1 · name：直接读取 declared type
                    </text>
                    <text x="48" y="241" fontSize="12" fill={C.primary}>
                      const int answer = 42; 结果：decltype(answer) 是 const int
                    </text>
                    <text x="48" y="267" fontSize="12" fill={C.primary}>
                      无括号 member access 也读取 member declared
                      type，不自动叠加 object 的 const
                    </text>
                    <text x="48" y="299" fontSize="11" fill={C.secondary}>
                      先问“它是不是无括号 name/member access”，不要立刻套 lvalue
                      规则
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
                      fill={faulted ? C.danger : C.success}
                    >
                      2 · parenthesized expression：括号切换规则
                    </text>
                    <text x="48" y="241" fontSize="12" fill={C.primary}>
                      decltype(x) → int；decltype((x)) → int reference，因为 (x)
                      是 lvalue expression
                    </text>
                    <text x="48" y="267" fontSize="12" fill={C.primary}>
                      括号不改变运行时的值，却改变 decltype 看到的语法分类
                    </text>
                    <text x="48" y="299" fontSize="11" fill={C.secondary}>
                      review decltype auto initializer/return 时，把括号视为 API
                      contract 的一部分
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
                      fill={C.warning}
                    >
                      3 · value category：一般 expression 的三路映射
                    </text>
                    <text x="48" y="241" fontSize="12" fill={C.primary}>
                      lvalue → T reference；xvalue → T double ampersand；prvalue
                      → T
                    </text>
                    <text x="48" y="267" fontSize="12" fill={C.primary}>
                      decltype(std::move(x)) 是 int double ampersand，decltype(x
                      + 1) 是 int
                    </text>
                    <text x="48" y="299" fontSize="11" fill={C.secondary}>
                      这一步只描述类型规则，不执行 expression，也不会触发
                      makeWidget()
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
                      fill={C.accent}
                    >
                      4 · decltype auto：保留 indexing contract
                    </text>
                    <text x="48" y="241" fontSize="12" fill={C.primary}>
                      plain auto return 可能把 T reference 变成 T；decltype auto
                      继续应用 decltype
                    </text>
                    <text x="48" y="267" fontSize="12" fill={C.primary}>
                      container[index] 可以返回 reference，也可以返回 indexing
                      proxy；两者写入语义不同
                    </text>
                    <text x="48" y="299" fontSize="11" fill={C.secondary}>
                      用 mutation test 和 is_same
                      固定“类型精确”不仅是打印出来看起来一样
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
                      5 · forwarding：恢复调用者 value category
                    </text>
                    <text x="48" y="241" fontSize="12" fill={C.primary}>
                      Container double ampersand 接收 lvalue/rvalue，再 forward
                      到 operator[index]
                    </text>
                    <text x="48" y="267" fontSize="12" fill={C.primary}>
                      const、non-const、proxy overload 都能保留；但 borrowed
                      return 仍需 lifetime 证明
                    </text>
                    <text x="48" y="299" fontSize="11" fill={C.secondary}>
                      精确类型只是“返回了什么”的答案，不是“返回后能活多久”的答案
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
                      fill={faulted ? C.danger : C.warning}
                    >
                      6 · lifetime：类型正确也可能悬空
                    </text>
                    <text x="48" y="241" fontSize="12" fill={C.primary}>
                      accessForward(std::vector&lt;int&gt;&#123;1, 2, 3&#125;,
                      0) 返回的 reference 指向临时 owner
                    </text>
                    <text x="48" y="267" fontSize="12" fill={C.primary}>
                      修法：只收 lvalue container，或为 rvalue overload 返回
                      value，不保存借用结果
                    </text>
                    <text x="48" y="299" fontSize="11" fill={C.secondary}>
                      用 sanitizer、full-expression 后访问和 compile-fail 测试把
                      lifetime gate 变成证据
                    </text>
                  </>
                )}
              </g>
            );
          })}

          {parenthesesFault && (
            <g>
              <path
                d="M 706 338 C 662 306, 614 274, 556 238"
                fill="none"
                stroke={C.danger}
                strokeWidth="3"
                strokeDasharray="8 6"
                markerEnd="url(#emcpp-item03-decltype-fault-arrow)"
              />
              <rect
                x="112"
                y="326"
                width="616"
                height="28"
                rx="8"
                fill={C.warning}
                fillOpacity="0.12"
                stroke={C.danger}
                strokeWidth="1.5"
              />
              <text
                x="130"
                y="346"
                fontSize="11"
                fontWeight="700"
                fill={C.danger}
              >
                故障注入：把括号当作无意义格式，导致 reference 和 temporary
                lifetime contract 未被审查
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
            markerEnd="url(#emcpp-item03-decltype-arrow)"
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
                markerEnd="url(#emcpp-item03-decltype-arrow)"
              />
            );
          })}

          {STEPS.map((step, index) => {
            const box = BOXES[index];
            const selected = index === activeIndex;
            const faulted = parenthesesFault && (index === 1 || index === 5);
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
                    ? "特例"
                    : index === 1
                      ? "括号"
                      : index === 2
                        ? "类别"
                        : index === 3
                          ? "返回"
                          : index === 4
                            ? "转发"
                            : "寿命"}
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
                      ? "类型"
                      : index < 5
                        ? "contract"
                        : "gate"}
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
          caption="按步骤检查 syntax form、value category、decltype auto return 和 lifetime；单步最适合对比 x 与 (x)。"
          reset={{
            label: "重置时间线",
            ariaLabel: "重置 Item 3 decltype 时间线",
            onClick: reset,
          }}
        />

        <button
          type="button"
          aria-pressed={parenthesesFault}
          onClick={() => setParenthesesFault((value) => !value)}
          className={`mx-auto mt-3 block min-h-11 rounded-control border px-4 py-2 text-sm transition-colors ${
            parenthesesFault
              ? "border-danger bg-danger/10 text-danger"
              : "border-border text-secondary hover:border-danger hover:text-danger"
          }`}
        >
          {parenthesesFault ? "关闭括号分类故障" : "注入括号分类故障"}
        </button>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        decltype 的正确阅读顺序是：先识别语法形式，再按 value category
        推导类型，最后审查 return contract 和 owner lifetime。
      </figcaption>
    </figure>
  );
}
