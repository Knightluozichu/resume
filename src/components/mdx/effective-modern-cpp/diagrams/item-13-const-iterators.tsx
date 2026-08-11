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
    label: "capability",
    caption:
      "const_iterator 是可移动的只读 cursor；const iterator object 可能不能移动却仍能写 element",
  },
  {
    label: "range",
    caption:
      "cbegin/cend 把只读 traversal intent 写在 range 边界，non-const container 也可以这样读取",
  },
  {
    label: "position",
    caption:
      "const position 只限制 element access，不妨碍 non-const container 执行 insert/erase 结构修改",
  },
  {
    label: "generic",
    caption:
      "generic container access 使用 std fallback 与 ADL-aware begin/end，同时覆盖容器、数组和 custom range",
  },
  {
    label: "invalidate",
    caption:
      "const_iterator 不承诺稳定性；reallocation、erase、rehash 仍会让 cursor 失效",
  },
  {
    label: "contract",
    caption:
      "最后用 compile-fail、insert/erase、array/ADL 和 invalidation tests 固定最小权限契约",
  },
];

const LABEL_TEXT: Readonly<Record<string, string>> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

const BOXES = STEPS.map((_, index) => ({
  x: 28 + index * 132,
  y: 356,
}));

export function EmcppItem13ConstIteratorsLab() {
  const stageRefs = useRef<Array<SVGGElement | null>>([]);
  const [constLayerFault, setConstLayerFault] = useState(false);

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
    setConstLayerFault(false);
  }

  return (
    <figure
      className="mdx-figure not-prose mx-auto my-8"
      data-visual-kind="emcpp-item-13-const-iterators"
    >
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-6">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              Effective Modern C++ · Item 13
            </p>
            <h3 className="mt-1 text-lg font-semibold text-primary">
              只读 cursor，不是冻结整个容器
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
              prefer const iterators 的核心是收窄 element
              写权限，同时保留遍历、定位和受控结构修改能力。
            </p>
          </div>
        </div>

        <svg
          viewBox="0 0 840 520"
          role="img"
          aria-label="Effective Modern C++ Item 13 教学时间线：比较 mutable iterator、const_iterator 和 const iterator object 的能力层，展示 cbegin/cend 的只读 range intent，展示 const position 传给 non-const container 的 insert/erase 结构修改，展示 generic container access 对标准容器、built-in array 与 ADL custom range 的支持，展示 const_iterator 的 invalidation，以及 compile-fail、结构修改和泛型访问测试。支持播放、暂停、单步、拖进度、重置和注入 const 层级混淆故障。"
          className="mx-auto block h-auto w-full"
        >
          <defs>
            <marker
              id="emcpp-item13-const-arrow"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
            >
              <path d="M0,0 L6,3 L0,6 Z" fill={C.border} />
            </marker>
            <marker
              id="emcpp-item13-const-fault-arrow"
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
            cursor capability → read-only range → structural mutation → generic
            access → invalidation
          </text>
          <text x="28" y="58" fontSize="12" fill={C.secondary}>
            const_iterators · prefer const iterators · cbegin cend · generic
            container access
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
            const 可以落在两个不同层：cursor 自身，或 cursor 指向的 element
          </text>
          <rect
            x="46"
            y="116"
            width="216"
            height="32"
            rx="8"
            fill={C.warning}
            fillOpacity="0.12"
            stroke={C.warning}
            strokeWidth="1.5"
          />
          <text
            x="154"
            y="137"
            textAnchor="middle"
            fontSize="12"
            fill={C.primary}
          >
            const auto it = begin()
          </text>
          <line
            x1="280"
            y1="132"
            x2="336"
            y2="132"
            stroke={C.border}
            strokeWidth="2"
            markerEnd="url(#emcpp-item13-const-arrow)"
          />
          <rect
            x="354"
            y="116"
            width="190"
            height="32"
            rx="8"
            fill={C.warning}
            fillOpacity="0.12"
            stroke={C.warning}
            strokeWidth="1.5"
          />
          <text
            x="449"
            y="137"
            textAnchor="middle"
            fontSize="12"
            fill={C.primary}
          >
            const iterator object
          </text>
          <line
            x1="562"
            y1="132"
            x2="618"
            y2="132"
            stroke={C.border}
            strokeWidth="2"
            markerEnd="url(#emcpp-item13-const-arrow)"
          />
          <rect
            x="636"
            y="116"
            width="158"
            height="32"
            rx="8"
            fill={constLayerFault ? C.danger : C.success}
            fillOpacity="0.12"
            stroke={constLayerFault ? C.danger : C.success}
            strokeWidth="1.5"
          />
          <text
            x="715"
            y="137"
            textAnchor="middle"
            fontSize="12"
            fill={C.primary}
          >
            element read-only
          </text>
          <text x="46" y="158" fontSize="11" fill={C.secondary}>
            “不能移动 cursor”与“不能修改 element”是两条不同的能力轴
          </text>

          {STEPS.map((step, index) => {
            const faulted = constLayerFault && (index === 0 || index === 2);
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
                      fill={faulted ? C.danger : C.accent}
                    >
                      1 · capability：const_iterator 是只读 cursor
                    </text>
                    <text x="48" y="241" fontSize="12" fill={C.primary}>
                      cbegin() 得到的 cursor
                      可以递增、比较和重新赋值，但解引用不能写 element
                    </text>
                    <text x="48" y="267" fontSize="12" fill={C.primary}>
                      const auto it = begin() 只冻结 iterator
                      object，自身不能移动却可能仍能写 element
                    </text>
                    <text x="48" y="299" fontSize="11" fill={C.secondary}>
                      fault：看到声明里的 const 就假设 element 也不可写；先识别
                      const 落在哪一层
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
                      2 · cbegin/cend：把只读意图写在 range 边界
                    </text>
                    <text x="48" y="241" fontSize="12" fill={C.primary}>
                      std::find(values.cbegin(), values.cend(), value) 明确
                      traversal 不改 element
                    </text>
                    <text x="48" y="267" fontSize="12" fill={C.primary}>
                      即使 values 是 non-const，const_iterator 仍然只收窄经
                      cursor 的 element access 权限
                    </text>
                    <text x="48" y="299" fontSize="11" fill={C.secondary}>
                      reviewer 不需要读完整 loop body 才能确认算法的最小权限
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
                      3 · position：只读位置仍可用于结构修改
                    </text>
                    <text x="48" y="241" fontSize="12" fill={C.primary}>
                      values.insert(position, value) 接受 const_iterator
                      position，container 仍可改变 size
                    </text>
                    <text x="48" y="267" fontSize="12" fill={C.primary}>
                      const position 限制 element mutation，不等于把 non-const
                      container 冻结成 const
                    </text>
                    <text x="48" y="299" fontSize="11" fill={C.secondary}>
                      fault：把 read-only cursor 当作 immutable
                      container；insert/erase 后还要重新审查 invalidation
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
                      fill={C.success}
                    >
                      4 · generic container access：容器、数组和 ADL range
                      一起覆盖
                    </text>
                    <text x="48" y="241" fontSize="12" fill={C.primary}>
                      std::cbegin/cend 统一支持标准容器与 built-in
                      array，返回类型可以是 iterator 或 const pointer
                    </text>
                    <text x="48" y="267" fontSize="12" fill={C.primary}>
                      using std::begin/end; 再调用未限定 begin/end，保留 std
                      fallback 与 custom ADL overload
                    </text>
                    <text x="48" y="299" fontSize="11" fill={C.secondary}>
                      C++11 可用 const-reference adapter；不要把 concrete
                      iterator type 写死在 generic API
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
                      5 · invalidation：const 不改变容器稳定性规则
                    </text>
                    <text x="48" y="241" fontSize="12" fill={C.primary}>
                      vector reallocation、erase、unordered rehash 仍可能让
                      const_iterator 指向失效位置
                    </text>
                    <text x="48" y="267" fontSize="12" fill={C.primary}>
                      cursor 是否 const 只影响写权限，不会延长 element、node 或
                      bucket storage lifetime
                    </text>
                    <text x="48" y="299" fontSize="11" fill={C.secondary}>
                      mutation 后查阅具体 container contract，必要时重新 find
                      获取 position
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
                      6 · contract：用测试锁定最小权限与边界
                    </text>
                    <text x="48" y="241" fontSize="12" fill={C.primary}>
                      compile-fail 证明不能写 element；insert/erase test 证明
                      const position 仍可结构修改
                    </text>
                    <text x="48" y="267" fontSize="12" fill={C.primary}>
                      array、const vector、custom ADL range 与 invalidation
                      tests 覆盖 generic container access
                    </text>
                    <text x="48" y="299" fontSize="11" fill={C.secondary}>
                      需要写 element 时重新获取 mutable iterator，不从
                      const_iterator 反向恢复权限
                    </text>
                  </>
                )}
              </g>
            );
          })}

          {constLayerFault && (
            <g>
              <path
                d="M 706 338 C 662 306, 614 274, 556 238"
                fill="none"
                stroke={C.danger}
                strokeWidth="3"
                strokeDasharray="8 6"
                markerEnd="url(#emcpp-item13-const-fault-arrow)"
              />
              <rect
                x="126"
                y="326"
                width="588"
                height="28"
                rx="8"
                fill={C.warning}
                fillOpacity="0.12"
                stroke={C.danger}
                strokeWidth="1.5"
              />
              <text
                x="144"
                y="346"
                fontSize="11"
                fontWeight="700"
                fill={C.danger}
              >
                故障注入：把 const 放错层；修法：区分 cursor 移动权、element
                写权和 container 结构修改权
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
            markerEnd="url(#emcpp-item13-const-arrow)"
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
                markerEnd="url(#emcpp-item13-const-arrow)"
              />
            );
          })}

          {STEPS.map((step, index) => {
            const box = BOXES[index];
            const selected = index === activeIndex;
            const faulted = constLayerFault && (index === 0 || index === 2);
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
                    ? "能力"
                    : index === 1
                      ? "范围"
                      : index === 2
                        ? "结构"
                        : index === 3
                          ? "泛型"
                          : index === 4
                            ? "失效"
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
                    : index < 2
                      ? "只读"
                      : index < 4
                        ? "访问"
                        : index === 4
                          ? "稳定性"
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
          caption="按步骤检查 cursor capability、range intent、container mutation、ADL 泛型访问和 invalidation；单步最适合对比 const auto iterator 与 cbegin。"
          reset={{
            label: "重置时间线",
            ariaLabel: "重置 Item 13 const iterators 时间线",
            onClick: reset,
          }}
        />

        <button
          type="button"
          aria-pressed={constLayerFault}
          onClick={() => setConstLayerFault((value) => !value)}
          className={`mx-auto mt-3 block min-h-11 rounded-control border px-4 py-2 text-sm transition-colors ${
            constLayerFault
              ? "border-danger bg-danger/10 text-danger"
              : "border-border text-secondary hover:border-danger hover:text-danger"
          }`}
        >
          {constLayerFault ? "关闭 const 层级故障" : "注入 const 层级故障"}
        </button>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        prefer const iterators 的决策顺序是：先收窄 element
        写权限，再确认位置是否用于结构修改，最后按具体容器规则处理泛型访问和失效。
      </figcaption>
    </figure>
  );
}
