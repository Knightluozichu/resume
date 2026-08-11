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
    label: "domain",
    caption:
      "先画出候选输入域：无约束 T&& 几乎接受所有类型，天然覆盖具体 overload 的范围",
  },
  {
    label: "exact",
    caption:
      "mutable lvalue 让 T 推导出 non-const reference；exact match 击败 const-reference overload",
  },
  {
    label: "body",
    caption:
      "short 到 int 需要 promotion，但模板精确绑定 short；body 失败不会触发候选重选",
  },
  {
    label: "copy",
    caption:
      "Person lvalue 被 forwarding constructor 精确绑定，可能劫持 generated copy constructor",
  },
  {
    label: "derived",
    caption:
      "derived-to-base copy 需要转换，模板却直接绑定 derived reference，base copy 也被劫持",
  },
  {
    label: "boundary",
    caption:
      "把约束放在 candidate boundary，或改用 distinct name，让错误类型在 ranking 前离场",
  },
];

const LABEL_TEXT: Readonly<Record<string, string>> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

const BOXES = STEPS.map((_, index) => ({
  x: 28 + index * 132,
  y: 358,
}));

export function EmcppItem26ForwardingOverloadLab() {
  const stageRefs = useRef<Array<SVGGElement | null>>([]);
  const [greedyFault, setGreedyFault] = useState(false);

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      STEPS.forEach((step, index) => {
        tl.add(
          stageRefs.current[index]!,
          { opacity: [0, 1], duration: T * 0.55, ease: "out(3)" },
          index * T,
        );
        // 每个 label 对齐该步候选集合变化的起始时刻。
        tl.label(step.label, index * T);
      });
    },
  });

  const activeIndex = Math.min(STEPS.length - 1, timeline.currentStep);
  const activeStep = STEPS[activeIndex] ?? STEPS[0];

  function reset() {
    timeline.goToStep(0);
    setGreedyFault(false);
  }

  return (
    <figure
      className="mdx-figure not-prose mx-auto my-8"
      data-visual-kind="emcpp-item-26-avoid-forwarding-overloads"
    >
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-6">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              Effective Modern C++ · Item 26
            </p>
            <h3 className="mt-1 text-lg font-semibold text-primary">
              先看候选域，再看谁赢；不要等 body 报错才诊断
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
              无约束的 forwarding reference 像一张覆盖范围过大的网：它可能先赢得
              overload resolution，随后才在函数体或成员构造处暴露错误。
            </p>
          </div>
        </div>

        <svg
          viewBox="0 0 840 520"
          role="img"
          aria-label="Effective Modern C++ Item 26 教学时间线：展示无约束 forwarding reference 的输入域如何覆盖具体 overload，mutable lvalue 的 exact match 如何击败 const-reference，short 到 int 的 body-late failure，Person forwarding constructor 劫持 copy，以及 derived-to-base 劫持，最后在 candidate boundary 约束候选。支持播放、暂停、单步、拖进度、重置和注入 greedy overload 故障。"
          className="mx-auto block h-auto w-full"
        >
          <defs>
            <marker
              id="emcpp-item26-overload-arrow"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
            >
              <path d="M0,0 L6,3 L0,6 Z" fill={C.border} />
            </marker>
            <marker
              id="emcpp-item26-overload-fault-arrow"
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
            input domain → overload ranking → body / constructor boundary
          </text>
          <text x="28" y="58" fontSize="12" fill={C.secondary}>
            exact match · conversion rank · body-late failure · copy hijack ·
            constraint
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
            候选集合：同名具体 overload + 无约束 T&amp;&amp;
          </text>
          <rect
            x="46"
            y="116"
            width="210"
            height="32"
            rx="8"
            fill={C.elevated}
            stroke={C.border}
            strokeWidth="1.5"
          />
          <text
            x="151"
            y="137"
            textAnchor="middle"
            fontSize="12"
            fill={C.primary}
          >
            const std::string&amp;
          </text>
          <rect
            x="274"
            y="116"
            width="198"
            height="32"
            rx="8"
            fill={greedyFault ? C.danger : C.accent}
            fillOpacity="0.12"
            stroke={greedyFault ? C.danger : C.accent}
            strokeWidth="1.5"
          />
          <text
            x="373"
            y="137"
            textAnchor="middle"
            fontSize="12"
            fill={C.primary}
          >
            template&lt;T&gt; T&amp;&amp;
          </text>
          <rect
            x="490"
            y="116"
            width="150"
            height="32"
            rx="8"
            fill={C.elevated}
            stroke={C.border}
            strokeWidth="1.5"
          />
          <text
            x="565"
            y="137"
            textAnchor="middle"
            fontSize="12"
            fill={C.primary}
          >
            int index
          </text>
          <line
            x1="658"
            y1="132"
            x2="780"
            y2="132"
            stroke={greedyFault ? C.danger : C.border}
            strokeWidth="2"
            markerEnd="url(#emcpp-item26-overload-arrow)"
          />
          <text
            x="718"
            y="106"
            textAnchor="middle"
            fontSize="11"
            fill={C.secondary}
          >
            先 ranking
          </text>
          <text x="46" y="158" fontSize="11" fill={C.secondary}>
            template 只要在声明层面可行，就不会因为 body 后续失败而自动让位给
            int 或 copy
          </text>

          {STEPS.map((step, index) => {
            const isFaultStage = greedyFault && (index === 1 || index === 2);
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
                  height="142"
                  rx="12"
                  fill={isFaultStage ? C.danger : C.accent}
                  fillOpacity="0.1"
                  stroke={isFaultStage ? C.danger : C.accent}
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
                      1 · domain：无约束 T&amp;&amp; 覆盖几乎所有输入
                    </text>
                    <text x="48" y="241" fontSize="12" fill={C.primary}>
                      const string&amp; 需要转换；T&amp;&amp; 却能按 caller
                      推导出精确引用
                    </text>
                    <text x="48" y="267" fontSize="12" fill={C.primary}>
                      输入域重叠越大，越不能把 forwarding template 当作普通
                      fallback
                    </text>
                    <text x="48" y="299" fontSize="11" fill={C.secondary}>
                      审查起点：先列出每个候选能接受的类型，再比较 conversion
                      rank
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
                      fill={isFaultStage ? C.danger : C.accent}
                    >
                      2 · exact：mutable lvalue 让模板抢先
                    </text>
                    <text x="48" y="241" fontSize="12" fill={C.primary}>
                      std::string name; → T = std::string&amp;，参数折叠为
                      non-const reference
                    </text>
                    <text x="48" y="267" fontSize="12" fill={C.primary}>
                      它比 const std::string&amp; 少一次 qualification
                      conversion，因此 template 获胜
                    </text>
                    <text x="48" y="299" fontSize="11" fill={C.secondary}>
                      只把 name 改成 const，可能又因 non-template tie break
                      走回普通函数
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
                      fill={isFaultStage ? C.danger : C.warning}
                    >
                      3 · body：short 先赢，失败发生在后面
                    </text>
                    <text x="48" y="241" fontSize="12" fill={C.primary}>
                      short index → int 需要 promotion；T&amp;&amp; 可精确绑定
                      short lvalue
                    </text>
                    <text x="48" y="267" fontSize="12" fill={C.primary}>
                      先选 template，再实例化 std::string body；body error
                      不会回退到 int
                    </text>
                    <text x="48" y="299" fontSize="11" fill={C.secondary}>
                      真正的修法是让错误类型在 signature / immediate context
                      中失去候选资格
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
                      4 · copy：Person lvalue 可能劫持复制构造
                    </text>
                    <text x="48" y="241" fontSize="12" fill={C.primary}>
                      Person&amp; → T = Person&amp;；forwarding constructor 是
                      exact match
                    </text>
                    <text x="48" y="267" fontSize="12" fill={C.primary}>
                      generated copy 的 const Person&amp; 需要
                      qualification，模板因此抢走调用
                    </text>
                    <text x="48" y="299" fontSize="11" fill={C.secondary}>
                      constructor template 不会阻止 special member
                      生成，但会改变谁先被选中
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
                      5 · derived：base copy 也可能被精确绑定劫持
                    </text>
                    <text x="48" y="241" fontSize="12" fill={C.primary}>
                      SpecialPerson const&amp; → Person copy 需要
                      derived-to-base conversion
                    </text>
                    <text x="48" y="267" fontSize="12" fill={C.primary}>
                      T&amp;&amp; 直接绑定 derived reference，模板优于 base
                      copy，错误落到 member body
                    </text>
                    <text x="48" y="299" fontSize="11" fill={C.secondary}>
                      一个 unconstrained base constructor 会把风险扩散到整个
                      derived hierarchy
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
                      6 · boundary：在 ranking 前切掉错误候选
                    </text>
                    <text x="48" y="241" fontSize="12" fill={C.primary}>
                      requires / enable_if：可构造 string 且排除 Person /
                      derived 类型
                    </text>
                    <text x="48" y="267" fontSize="12" fill={C.primary}>
                      或改用 distinct name；让每个 overload domain
                      互斥且可在矩阵中验收
                    </text>
                    <text x="48" y="299" fontSize="11" fill={C.secondary}>
                      不要等函数体错误出现后才修复候选边界
                    </text>
                  </>
                )}
              </g>
            );
          })}

          {greedyFault && (
            <g>
              <path
                d="M 680 338 C 648 310, 610 272, 570 238"
                fill="none"
                stroke={C.danger}
                strokeWidth="3"
                strokeDasharray="8 6"
                markerEnd="url(#emcpp-item26-overload-fault-arrow)"
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
                故障注入：无约束 T&amp;&amp; 先抢候选；修法：在 candidate
                boundary 约束类型域
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
            markerEnd="url(#emcpp-item26-overload-arrow)"
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
                markerEnd="url(#emcpp-item26-overload-arrow)"
              />
            );
          })}

          {STEPS.map((step, index) => {
            const box = BOXES[index];
            const selected = index === activeIndex;
            const faulted = greedyFault && (index === 1 || index === 2);
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
                    ? "domain"
                    : index === 1
                      ? "exact"
                      : index === 2
                        ? "body"
                        : index === 3
                          ? "copy"
                          : index === 4
                            ? "derived"
                            : "boundary"}
                </text>
                <text
                  x={box.x + 52}
                  y={box.y + 82}
                  textAnchor="middle"
                  fontSize="11"
                  fill={faulted ? C.danger : selected ? C.accent : C.secondary}
                >
                  {faulted
                    ? "greedy"
                    : index < 2
                      ? "rank"
                      : index < 5
                        ? "hijack"
                        : "prune"}
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
          caption="按步骤观察候选集合、转换等级与 body/constructor 诊断边界；单步最适合复现 hijack。"
          reset={{
            label: "重置时间线",
            ariaLabel: "重置 Item 26 forwarding overload 时间线",
            onClick: reset,
          }}
        />

        <button
          type="button"
          aria-pressed={greedyFault}
          onClick={() => setGreedyFault((value) => !value)}
          className={`mx-auto mt-3 block min-h-11 rounded-control border px-4 py-2 text-sm transition-colors ${
            greedyFault
              ? "border-danger bg-danger/10 text-danger"
              : "border-border text-secondary hover:border-danger hover:text-danger"
          }`}
        >
          {greedyFault
            ? "关闭 greedy overload 故障"
            : "注入 greedy overload 故障"}
        </button>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        forwarding reference 的危险不在“能接收很多类型”，而在它与具体 overload
        的 domain 重叠；先约束候选边界，才能让错误在正确的位置出现。
      </figcaption>
    </figure>
  );
}
