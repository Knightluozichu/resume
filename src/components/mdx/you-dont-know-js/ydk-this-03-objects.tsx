"use client";

import { useRef, useState } from "react";

import {
  TEACHING_BEAT_MS,
  TimelineControls,
} from "../anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "../anim/use-teaching-timeline";

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
  { label: "literal", caption: "创建一个可观察的对象容器" },
  { label: "key", caption: "把点语法和中括号语法归一为属性键" },
  { label: "descriptor", caption: "读取 value、writable、enumerable 等描述符" },
  { label: "access", caption: "区分数据属性读取与 getter 调用" },
  { label: "write", caption: "按 writable 或 setter 规则尝试写入" },
  { label: "iterate", caption: "只暴露允许枚举的属性并保持顺序" },
];

const LABEL_TEXT: Readonly<Record<string, string>> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

const STAGE_COPY = [
  [
    "1 · 创建对象容器",
    "对象先提供一个身份稳定的容器；属性值只是容器当前保存的状态。",
    "输出：对象身份 + 初始属性集合",
  ],
  [
    "2 · 规范化属性键",
    "点语法与中括号语法最终都要找到同一个属性键，不能把写法当成两份数据。",
    "输出：规范化 key + 查找路径",
  ],
  [
    "3 · 读取属性描述符",
    "描述符决定属性能否写入、能否配置、能否枚举；先读规则，再预测结果。",
    "输出：value / writable / enumerable / configurable",
  ],
  [
    "4 · 读取数据或调用 getter",
    "数据属性直接给值；访问器属性执行 getter，读取行为可能携带计算或副作用。",
    "输出：读取值 + 访问路径",
  ],
  [
    "5 · 按描述符约束写入",
    "写入只在 writable 为真或 setter 接受时生效；严格模式下拒绝通常会显式报错。",
    "输出：新值 / 拒绝原因",
  ],
  [
    "6 · 迭代允许暴露的键",
    "Object.keys 只返回 enumerable 属性；顺序是可观察证据，不能用对象打印结果替代。",
    "输出：键序列 + 枚举边界",
  ],
] as const;

type Sample = "data" | "readonly" | "accessor" | "hidden";

type SampleInfo = {
  title: string;
  expression: string;
  value: string;
  writable: string;
  enumerable: string;
  configurable: string;
  read: string;
  write: string;
  keys: string;
  detail: string;
};

const SAMPLE_COPY: Record<Sample, SampleInfo> = {
  data: {
    title: "普通数据属性",
    expression: "record.id = 7",
    value: "7",
    writable: "true",
    enumerable: "true",
    configurable: "true",
    read: "record.id → 7",
    write: "id = 8 → 成功",
    keys: "[\"id\"]",
    detail: "默认对象属性可读、可写、可枚举；描述符仍是行为来源。",
  },
  readonly: {
    title: "只读数据属性",
    expression: "defineProperty(id, writable:false)",
    value: "7",
    writable: "false",
    enumerable: "true",
    configurable: "false",
    read: "record.id → 7",
    write: "id = 8 → 拒绝",
    keys: "[\"id\"]",
    detail: "值仍存在，但写入通道被描述符关闭；不能从输出倒推可写性。",
  },
  accessor: {
    title: "访问器属性",
    expression: "get label() { return id }",
    value: "getter()",
    writable: "setter",
    enumerable: "true",
    configurable: "true",
    read: "record.label → getter 执行",
    write: "label = \"new\" → setter",
    keys: "[\"id\", \"label\"]",
    detail: "访问器没有普通 value/writable 对；读写会分别进入 getter/setter。",
  },
  hidden: {
    title: "不可枚举属性",
    expression: "defineProperty(secret, enumerable:false)",
    value: "42",
    writable: "true",
    enumerable: "false",
    configurable: "true",
    read: "record.secret → 42",
    write: "secret = 43 → 成功",
    keys: "[]",
    detail: "不可枚举不等于不存在；直接读取可见，但 Object.keys 不暴露它。",
  },
};

export function YdkThis03ObjectsLab() {
  const stageRefs = useRef<Array<SVGGElement | null>>([]);
  const [sample, setSample] = useState<Sample>("readonly");

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

  const activeIndex =
    timeline.currentStep >= STEPS.length
      ? STEPS.length - 1
      : timeline.currentStep;
  const activeStep = STEPS[activeIndex] ?? STEPS[0];
  const selected = SAMPLE_COPY[sample];
  const faultIndex = sample === "accessor" ? 3 : sample === "hidden" ? 5 : 4;

  function reset() {
    timeline.goToStep(0);
    setSample("readonly");
  }

  return (
    <figure
      className="mdx-figure not-prose mx-auto my-8"
      data-visual-kind="ydk-this-03-objects"
    >
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-6">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              You Don&apos;t Know JS · this 03
            </p>
            <h3 className="mt-1 text-lg font-semibold text-primary">
              对象的真实行为由属性描述符决定
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
              选择一个属性样本，沿着 key、描述符、读取、写入和迭代路径观察首个偏离点。
            </p>
          </div>
          <span className="rounded-control border border-accent px-2 py-1 text-xs text-accent">
            ▷ 可交互
          </span>
        </div>

        <label className="mb-4 block text-xs text-secondary">
          <span className="mb-1 block font-semibold text-primary">选择属性描述符样本</span>
          <select
            aria-label="选择对象属性描述符样本"
            value={sample}
            onChange={(event) => setSample(event.target.value as Sample)}
            className="min-h-11 w-full rounded-control border border-border bg-bg px-3 py-2 text-sm text-primary"
          >
            <option value="data">普通数据属性 · record.id = 7</option>
            <option value="readonly">只读数据属性 · writable: false</option>
            <option value="accessor">访问器属性 · getter / setter</option>
            <option value="hidden">不可枚举属性 · enumerable: false</option>
          </select>
        </label>

        <svg
          viewBox="0 0 900 620"
          role="img"
          aria-label="You Don't Know JS 关于 this 第3章专属教学时间线：覆盖 Chapter 3: Objects、Syntax、Type、Contents、Iteration。展示对象字面量、属性键规范化、属性描述符、数据属性、访问器 getter 和 setter、writable、enumerable、configurable、Object.keys 与迭代顺序。支持样本切换、播放、暂停、单步、拖进度和重置。"
          className="mx-auto block h-auto w-full"
        >
          <defs>
            <marker id="ydk-this03-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill={C.border} />
            </marker>
            <marker id="ydk-this03-success-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill={C.success} />
            </marker>
            <marker id="ydk-this03-danger-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill={C.danger} />
            </marker>
          </defs>

          <rect x="0" y="0" width="900" height="620" rx="14" fill={C.bg} />
          <text x="30" y="34" fontSize="16" fontWeight="700" fill={C.primary}>
            object container → descriptor → observable behavior
          </text>
          <text x="30" y="58" fontSize="12" fill={C.secondary}>
            {selected.title} · 当前样本：{selected.expression}
          </text>

          <rect x="30" y="78" width="216" height="134" rx="12" fill={C.elevated} stroke={C.border} strokeWidth="1.5" />
          <text x="50" y="106" fontSize="13" fontWeight="700" fill={C.accent}>1 · 对象容器</text>
          <text x="50" y="136" fontSize="12" fill={C.primary}>record = {'{ id: 7 }'}</text>
          <text x="50" y="164" fontSize="12" fill={C.secondary}>对象身份：稳定</text>
          <text x="50" y="190" fontSize="11" fill={C.secondary}>属性值不是全部行为</text>

          <line x1="254" y1="145" x2="286" y2="145" stroke={C.border} strokeWidth="2" markerEnd="url(#ydk-this03-arrow)" />

          <rect x="296" y="78" width="284" height="134" rx="12" fill={C.elevated} stroke={C.border} strokeWidth="1.5" />
          <text x="318" y="106" fontSize="13" fontWeight="700" fill={C.accent}>2 · 属性描述符</text>
          <text x="318" y="134" fontSize="12" fill={C.primary}>key：{sample === "hidden" ? "secret" : sample === "accessor" ? "label" : "id"}</text>
          <text x="318" y="158" fontSize="11" fill={C.secondary}>value：{selected.value}</text>
          <text x="318" y="180" fontSize="11" fill={selected.writable === "false" ? C.danger : C.primary}>writable：{selected.writable}</text>
          <text x="454" y="180" fontSize="11" fill={selected.enumerable === "false" ? C.danger : C.primary}>enumerable：{selected.enumerable}</text>
          <text x="318" y="200" fontSize="11" fill={C.secondary}>configurable：{selected.configurable}</text>

          <line x1="588" y1="145" x2="620" y2="145" stroke={sample === "readonly" || sample === "hidden" ? C.danger : C.success} strokeWidth="2.5" markerEnd={sample === "readonly" || sample === "hidden" ? "url(#ydk-this03-danger-arrow)" : "url(#ydk-this03-success-arrow)"} />

          <rect x="630" y="78" width="240" height="134" rx="12" fill={sample === "readonly" || sample === "hidden" ? C.danger : C.success} fillOpacity="0.1" stroke={sample === "readonly" || sample === "hidden" ? C.danger : C.success} strokeWidth="1.5" />
          <text x="750" y="106" textAnchor="middle" fontSize="13" fontWeight="700" fill={sample === "readonly" || sample === "hidden" ? C.danger : C.success}>观察结果</text>
          <text x="750" y="136" textAnchor="middle" fontSize="12" fill={C.primary}>{selected.read}</text>
          <text x="750" y="164" textAnchor="middle" fontSize="12" fill={sample === "readonly" ? C.danger : C.primary}>{selected.write}</text>
          <text x="750" y="192" textAnchor="middle" fontSize="11" fill={selected.enumerable === "false" ? C.danger : C.success}>Object.keys → {selected.keys}</text>

          {STAGE_COPY.map((stage, index) => {
            const isActive = index === activeIndex;
            const isFailure = index === faultIndex && (sample === "readonly" || sample === "accessor" || sample === "hidden");
            const tone = isFailure ? C.danger : isActive ? C.accent : index === 5 ? C.success : C.border;
            return (
              <g
                key={`stage-${stage[0]}`}
                ref={(node) => {
                  stageRefs.current[index] = node;
                }}
                style={{ opacity: 0 }}
              >
                <rect x="30" y="238" width="840" height="122" rx="12" fill={isFailure ? C.danger : isActive ? C.accent : C.elevated} fillOpacity={isFailure || isActive ? 0.1 : 1} stroke={tone} strokeWidth={isFailure || isActive ? 2.5 : 1.5} />
                <text x="52" y="266" fontSize="13" fontWeight="700" fill={isFailure ? C.danger : isActive ? C.accent : C.primary}>{stage[0]}</text>
                <text x="52" y="294" fontSize="12" fill={C.primary}>{stage[1]}</text>
                <text x="52" y="322" fontSize="12" fill={C.primary}>{stage[2]}</text>
                <text x="52" y="348" fontSize="11" fill={isFailure ? C.danger : C.secondary}>
                  {isFailure ? "故障注入：先看描述符，再解释读取、写入或枚举结果" : isActive ? "当前阶段：按证据推进" : "等待前一步签发状态"}
                </text>
              </g>
            );
          })}

          <line x1="76" y1="414" x2="824" y2="414" stroke={C.border} strokeWidth="2" markerEnd="url(#ydk-this03-arrow)" />
          {STEPS.slice(0, -1).map((step, index) => {
            const x1 = 76 + index * 146 + 110;
            const x2 = 76 + (index + 1) * 146 - 12;
            return (
              <line
                key={`connector-${step.label}`}
                x1={x1}
                y1="414"
                x2={x2}
                y2="414"
                stroke={index < activeIndex ? C.success : C.border}
                strokeWidth={index < activeIndex ? 3 : 1.5}
                markerEnd={index < activeIndex ? "url(#ydk-this03-success-arrow)" : "url(#ydk-this03-arrow)"}
              />
            );
          })}
          {STEPS.map((step, index) => {
            const x = 76 + index * 146;
            const isActive = index === activeIndex;
            const isFailure = index === faultIndex && (sample === "readonly" || sample === "accessor" || sample === "hidden");
            const tone = isFailure ? C.danger : isActive ? C.accent : C.border;
            return (
              <g key={`step-${step.label}`}>
                <rect x={x} y="430" width="110" height="112" rx="12" fill={isFailure ? C.danger : isActive ? C.accent : C.elevated} fillOpacity={isFailure || isActive ? 0.16 : 1} stroke={tone} strokeWidth={isFailure || isActive ? 2.5 : 1.5} />
                <circle cx={x + 22} cy="454" r="12" fill={isFailure ? C.danger : isActive ? C.accent : C.bg} stroke={tone} strokeWidth="1.5" />
                <text x={x + 22} y="458" textAnchor="middle" fontSize="11" fill={isActive || isFailure ? C.bg : C.primary}>{index + 1}</text>
                <text x={x + 62} y="458" textAnchor="middle" fontSize="11" fontWeight="700" fill={isFailure ? C.danger : isActive ? C.accent : C.primary}>{step.label}</text>
                <text x={x + 55} y="486" textAnchor="middle" fontSize="11" fill={C.secondary}>{index < activeIndex ? "checked" : isActive ? "active" : "trace"}</text>
                <text x={x + 55} y="512" textAnchor="middle" fontSize="11" fill={isFailure ? C.danger : C.secondary}>{isFailure ? "fault" : "evidence"}</text>
                <text x={x + 55} y="532" textAnchor="middle" fontSize="11" fill={C.secondary}>{index === 2 ? "descriptor" : index === 5 ? "keys" : "state"}</text>
              </g>
            );
          })}
          <text x="30" y="584" fontSize="11" fill={C.secondary}>当前阶段：{activeStep.label} · {activeStep.caption}</text>
          <text x="870" y="584" textAnchor="end" fontSize="11" fill={C.secondary}>先看描述符，再预测行为</text>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="先预测属性是否可写、可枚举，再推进读取、写入和 Object.keys。"
          reset={{ label: "重置实验", ariaLabel: "重置对象属性描述符实验", onClick: reset }}
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        对象的点语法只是入口；真正决定读写和迭代结果的是属性键对应的描述符。
      </figcaption>
    </figure>
  );
}
