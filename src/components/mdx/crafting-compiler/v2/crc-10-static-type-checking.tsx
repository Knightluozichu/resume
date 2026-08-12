"use client";

import { useMemo, useRef, useState } from "react";

import {
  TEACHING_BEAT_MS,
  TimelineControls,
} from "@/components/mdx/anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "@/components/mdx/anim/use-teaching-timeline";

const VIEW_W = 760;
const VIEW_H = 420;
const T = TEACHING_BEAT_MS;

const COLORS = {
  accent: "var(--accent)",
  border: "var(--border)",
  danger: "var(--danger)",
  elevated: "var(--bg-elevated)",
  primary: "var(--text-primary)",
  secondary: "var(--text-secondary)",
  success: "var(--success)",
  warning: "var(--warning)",
} as const;

type View = "rules" | "conversion" | "diagnostic";
type Sample = "scalar" | "pointer" | "lvalue";
type Fault = "none" | "narrowing" | "pointer";

const VIEWS: readonly { id: View; label: string; detail: string }[] = [
  {
    id: "rules",
    label: "规则分类",
    detail: "把已解析 AST 分类为标量、指针或左值，并显示规则输入。",
  },
  {
    id: "conversion",
    label: "转换节点",
    detail: "比较精确匹配、允许转换和拒绝，保留源类型与目标类型。",
  },
  {
    id: "diagnostic",
    label: "诊断回放",
    detail: "检查错误集合是否在 IR 生成前关闭继续处理许可。",
  },
] as const;

const SAMPLES: readonly {
  id: Sample;
  label: string;
  code: string;
  type: string;
  valueCategory: string;
}[] = [
  {
    id: "scalar",
    label: "标量",
    code: "count + 1",
    type: "int",
    valueCategory: "value",
  },
  {
    id: "pointer",
    label: "指针",
    code: "next + 1",
    type: "int*",
    valueCategory: "address value",
  },
  {
    id: "lvalue",
    label: "左值",
    code: "count = 4",
    type: "int",
    valueCategory: "writable location",
  },
] as const;

const STEPS: readonly TeachingStep[] = [
  { label: "ast", caption: "读取已绑定 AST 和声明类型。" },
  { label: "rules", caption: "选择操作符规则与类型环境。" },
  { label: "classify", caption: "确定类型和值类别。" },
  { label: "convert", caption: "插入许可的显式转换或拒绝。" },
  { label: "verdict", caption: "输出证明包或类型错误集合。" },
] as const;

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

const CONCEPTS = [
  "第10章 语义分析（2）静态类型检查",
  "10.1 类型定义的检查",
  "10.2 表达式的有效性检查",
  "10.3 静态类型检查",
] as const;

function ViewButton({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`min-h-11 rounded-control border px-3 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${active ? "border-accent bg-accent/10 text-primary" : "border-border bg-background text-secondary hover:border-accent hover:text-primary"}`}
    >
      {children}
    </button>
  );
}

function Stage({
  label,
  status,
  x,
  refCallback,
}: {
  label: string;
  status: string;
  x: number;
  refCallback?: (element: SVGGElement | null) => void;
}) {
  return (
    <g ref={refCallback}>
      <rect
        x={x}
        y="106"
        width="132"
        height="78"
        rx="12"
        fill={COLORS.elevated}
        stroke={COLORS.border}
        strokeWidth="2"
      />
      <text
        x={x + 16}
        y="134"
        fontSize="15"
        fontWeight="700"
        fill={COLORS.primary}
      >
        {label}
      </text>
      <text x={x + 16} y="162" fontSize="13" fill={COLORS.secondary}>
        {status}
      </text>
    </g>
  );
}

function RulesView({
  activeStep,
  fault,
  sample,
}: {
  activeStep: number;
  fault: Fault;
  sample: Sample;
}) {
  const selected = SAMPLES.find((item) => item.id === sample) ?? SAMPLES[0];
  const invalid = fault !== "none";
  const cards = [
    ["标量", "int", "count + 1", COLORS.accent],
    ["指针", "int*", "next + 1", COLORS.warning],
    ["左值", "int", "count = 4", COLORS.success],
  ] as const;
  return (
    <g>
      <text x="28" y="31" fontSize="16" fontWeight="700" fill={COLORS.primary}>
        resolved AST → type rules → expression category
      </text>
      <text x="28" y="58" fontSize="13" fill={COLORS.secondary}>
        类型和值类别同时进入规则；只看表示宽度无法决定操作是否合法。
      </text>
      <rect
        x="28"
        y="88"
        width="704"
        height="198"
        rx="14"
        fill="var(--bg)"
        stroke={COLORS.border}
        strokeWidth="2"
      />
      {cards.map(([label, type, code, color], index) => {
        const x = 48 + index * 224;
        const active = activeStep >= Math.min(index + 1, 4);
        const chosen = label === selected.label;
        return (
          <g key={label} opacity={chosen ? 1 : 0.62}>
            <rect
              x={x}
              y="118"
              width="192"
              height="132"
              rx="12"
              fill={color}
              fillOpacity={chosen ? 0.14 : 0.06}
              stroke={chosen ? color : COLORS.border}
              strokeWidth={chosen ? 2.5 : 1.5}
            />
            <circle
              cx={x + 24}
              cy="146"
              r="8"
              fill={active ? color : COLORS.border}
            />
            <text
              x={x + 42}
              y="151"
              fontSize="14"
              fontWeight="700"
              fill={COLORS.primary}
            >
              {label}
            </text>
            <text x={x + 20} y="186" fontSize="13" fill={COLORS.secondary}>
              type：{type}
            </text>
            <text x={x + 20} y="214" fontSize="13" fill={COLORS.secondary}>
              {code}
            </text>
            <text x={x + 20} y="238" fontSize="13" fill={color}>
              {active ? "规则输入已记录" : "等待分类"}
            </text>
          </g>
        );
      })}
      <rect
        x="28"
        y="312"
        width="704"
        height="72"
        rx="12"
        fill={invalid ? COLORS.warning : COLORS.success}
        fillOpacity="0.12"
        stroke={invalid ? COLORS.warning : COLORS.success}
        strokeWidth="2"
      />
      <text x="52" y="342" fontSize="14" fontWeight="700" fill={COLORS.primary}>
        当前样本：{selected.code} · {selected.type} · {selected.valueCategory}
      </text>
      <text
        x="52"
        y="368"
        fontSize="13"
        fill={invalid ? COLORS.warning : COLORS.success}
      >
        {invalid
          ? "故障已注入：继续处理许可等待规则裁决"
          : "类型推导和类别分类通过，进入转换判定"}
      </text>
    </g>
  );
}

function ConversionView({ fault, sample }: { fault: Fault; sample: Sample }) {
  const selected = SAMPLES.find((item) => item.id === sample) ?? SAMPLES[0];
  const isPointer = fault === "pointer";
  const isNarrowing = fault === "narrowing";
  const result =
    fault === "none"
      ? selected.id === "scalar"
        ? "exact match"
        : "explicit conversion allowed"
      : "reject";
  const tone = fault === "none" ? COLORS.success : COLORS.warning;
  return (
    <g>
      <text x="28" y="31" fontSize="16" fontWeight="700" fill={COLORS.primary}>
        conversions：精确匹配、允许转换或拒绝
      </text>
      <text x="28" y="58" fontSize="13" fill={COLORS.secondary}>
        转换节点必须保留源类型、目标类型、类别和源跨度，不能隐藏语义变化。
      </text>
      <rect
        x="28"
        y="96"
        width="214"
        height="150"
        rx="12"
        fill={COLORS.elevated}
        stroke={COLORS.border}
        strokeWidth="2"
      />
      <text x="52" y="132" fontSize="15" fontWeight="700" fill={COLORS.primary}>
        源表达式
      </text>
      <text x="52" y="170" fontSize="14" fill={COLORS.secondary}>
        {selected.code}
      </text>
      <text x="52" y="202" fontSize="13" fill={COLORS.secondary}>
        {selected.type} · {selected.valueCategory}
      </text>
      <line
        x1="246"
        y1="172"
        x2="292"
        y2="172"
        stroke={COLORS.accent}
        strokeWidth="3"
        markerEnd="url(#crc-type-arrow)"
      />
      <rect
        x="304"
        y="96"
        width="206"
        height="150"
        rx="12"
        fill={COLORS.accent}
        fillOpacity="0.1"
        stroke={COLORS.accent}
        strokeWidth="2"
      />
      <text
        x="328"
        y="132"
        fontSize="15"
        fontWeight="700"
        fill={COLORS.primary}
      >
        规则输出
      </text>
      <text x="328" y="170" fontSize="14" fill={COLORS.secondary}>
        {isPointer ? "int* → void*" : isNarrowing ? "long → int" : "int → long"}
      </text>
      <text x="328" y="202" fontSize="13" fill={COLORS.secondary}>
        {fault === "none" ? "保存转换原因" : "等待错误集合"}
      </text>
      <line
        x1="514"
        y1="172"
        x2="560"
        y2="172"
        stroke={COLORS.accent}
        strokeWidth="3"
        markerEnd="url(#crc-type-arrow)"
      />
      <rect
        x="572"
        y="96"
        width="160"
        height="150"
        rx="12"
        fill={tone}
        fillOpacity="0.14"
        stroke={tone}
        strokeWidth="2"
      />
      <text
        x="596"
        y="132"
        fontSize="15"
        fontWeight="700"
        fill={COLORS.primary}
      >
        判定
      </text>
      <text x="596" y="172" fontSize="14" fontWeight="700" fill={tone}>
        {result}
      </text>
      <text x="596" y="204" fontSize="13" fill={COLORS.secondary}>
        {fault === "none" ? "IR 可继续" : "IR 禁止"}
      </text>
      <rect
        x="28"
        y="290"
        width="704"
        height="64"
        rx="12"
        fill={tone}
        fillOpacity="0.1"
        stroke={tone}
        strokeWidth="2"
      />
      <text x="52" y="318" fontSize="14" fontWeight="700" fill={COLORS.primary}>
        证据字段：sourceType · targetType · conversionKind · sourceSpan
      </text>
      <text x="52" y="342" fontSize="13" fill={tone}>
        {fault === "none"
          ? "显式转换节点可以交给 IR 生成。"
          : "禁止的转换只进入类型错误集合，不生成节点。"}
      </text>
      <text x="28" y="384" fontSize="13" fill={COLORS.accent}>
        先猜一猜：表示宽度变大，是否足以证明语言允许这个转换？
      </text>
    </g>
  );
}

function DiagnosticView({ fault, sample }: { fault: Fault; sample: Sample }) {
  const selected = SAMPLES.find((item) => item.id === sample) ?? SAMPLES[0];
  const failed = fault !== "none";
  const stages = [
    ["环境", "声明类型", false],
    ["规则", "操作符 + 类别", false],
    [
      "集合",
      failed ? (fault === "narrowing" ? "E_NARROW" : "E_POINTER") : "empty",
      failed,
    ],
    ["IR", failed ? "许可为否" : "许可为是", failed],
  ] as const;
  return (
    <g>
      <text x="28" y="31" fontSize="16" fontWeight="700" fill={COLORS.primary}>
        diagnostics：类型错误集合关闭 IR 许可
      </text>
      <text x="28" y="58" fontSize="13" fill={COLORS.secondary}>
        清理、生成、编译、运行后重放同一输入，比较错误码、跨度和退出码。
      </text>
      {stages.map(([label, detail, error], index) => {
        const x = 28 + index * 176;
        return (
          <g key={label}>
            <rect
              x={x}
              y="112"
              width="142"
              height="112"
              rx="12"
              fill={error ? COLORS.warning : COLORS.elevated}
              fillOpacity={error ? 0.14 : 1}
              stroke={error ? COLORS.warning : COLORS.border}
              strokeWidth="2"
            />
            <text
              x={x + 18}
              y="146"
              fontSize="15"
              fontWeight="700"
              fill={COLORS.primary}
            >
              {label}
            </text>
            <text x={x + 18} y="178" fontSize="13" fill={COLORS.secondary}>
              {detail}
            </text>
            <text
              x={x + 18}
              y="204"
              fontSize="13"
              fill={error ? COLORS.warning : COLORS.success}
            >
              {error ? "stop · exit=1" : "recorded"}
            </text>
            {index < stages.length - 1 && (
              <line
                x1={x + 142}
                y1="168"
                x2={x + 170}
                y2="168"
                stroke={COLORS.accent}
                strokeWidth="3"
                markerEnd="url(#crc-type-arrow)"
              />
            )}
          </g>
        );
      })}
      <rect
        x="28"
        y="274"
        width="704"
        height="72"
        rx="12"
        fill={failed ? COLORS.warning : COLORS.success}
        fillOpacity="0.12"
        stroke={failed ? COLORS.warning : COLORS.success}
        strokeWidth="2"
      />
      <text x="52" y="305" fontSize="14" fontWeight="700" fill={COLORS.primary}>
        {failed
          ? `TypeDump ${fault === "narrowing" ? "E_NARROW" : "E_POINTER"} @ line 1 · ${selected.code}`
          : `TypeDump 通过：${selected.type} · ${selected.valueCategory}`}
      </text>
      <text x="52" y="330" fontSize="13" fill={COLORS.secondary}>
        类型、类别、转换和诊断都应写入静态类型证明包。
      </text>
      <text x="28" y="382" fontSize="13" fill={COLORS.accent}>
        比较点：错误集合非空时，后续 IR 节点数量必须保持为零。
      </text>
    </g>
  );
}

/** 第10章专属实验：回放类型规则、显式转换与类型错误集合。 */
export function CrcStaticTypeCheckingLab() {
  const [view, setView] = useState<View>("rules");
  const [sample, setSample] = useState<Sample>("scalar");
  const [fault, setFault] = useState<Fault>("none");
  const stageRefs = useRef<Record<string, SVGGElement | null>>({});
  const current = useMemo(
    () => VIEWS.find((item) => item.id === view) ?? VIEWS[0],
    [view],
  );
  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      STEPS.forEach((step, index) => {
        const node = stageRefs.current[step.label];
        if (!node) return;
        tl.add(
          node,
          {
            opacity: [0.35, 1],
            scale: [0.94, 1],
            duration: T * 0.65,
            ease: "out(3)",
          },
          T * index,
        );
        tl.label(step.label, T * index);
      });
    },
  });

  function reset() {
    setView("rules");
    setSample("scalar");
    setFault("none");
    timeline.goToStep(0);
  }

  return (
    <section
      aria-label={`第10章静态类型检查专属规则、转换与诊断实验；${CONCEPTS.join("；")}`}
      className="not-prose my-8 min-w-0 overflow-hidden rounded-card border border-border bg-elevated"
      data-unit-id="crc-unit-10"
      data-visual-kind="crc-static-type-checking-rules-replay"
    >
      <header className="flex flex-wrap items-start justify-between gap-4 border-b border-border px-5 py-4 sm:px-6">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold tracking-wide text-accent">
            专属 CrcStaticTypeCheckingLab · 规则、转换与诊断
          </p>
          <h3 className="mt-1 text-base font-semibold text-primary">
            让类型检查留下可交接的证明包
          </h3>
          <p className="mt-1 max-w-3xl text-sm leading-6 text-secondary">
            先预测：窄化和非法指针转换应该生成一个转换节点，还是直接进入错误集合？
          </p>
        </div>
      </header>
      <div className="min-w-0 space-y-4 p-5 sm:p-6">
        <div
          className="flex flex-wrap gap-2"
          aria-label="选择静态类型检查实验视角"
        >
          {VIEWS.map((item) => (
            <ViewButton
              key={item.id}
              active={view === item.id}
              onClick={() => setView(item.id)}
            >
              {item.label}
            </ViewButton>
          ))}
        </div>
        <div className="flex flex-wrap gap-2" aria-label="选择表达式类别样本">
          {SAMPLES.map((item) => (
            <ViewButton
              key={item.id}
              active={sample === item.id}
              onClick={() => setSample(item.id)}
            >
              {item.label}
            </ViewButton>
          ))}
        </div>
        <div
          className="flex flex-wrap gap-2"
          aria-label="选择静态类型检查故障模式"
        >
          <ViewButton
            active={fault === "none"}
            onClick={() => setFault("none")}
          >
            正常规则
          </ViewButton>
          <ViewButton
            active={fault === "narrowing"}
            onClick={() => setFault("narrowing")}
          >
            非法窄化
          </ViewButton>
          <ViewButton
            active={fault === "pointer"}
            onClick={() => setFault("pointer")}
          >
            非法指针转换
          </ViewButton>
        </div>
        <div className="min-w-0 rounded-card border border-border bg-background p-3 sm:p-4">
          <svg
            viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
            role="img"
            aria-label={`${current.label}可视化：${current.detail}`}
            className="h-auto w-full"
          >
            <defs>
              <marker
                id="crc-type-arrow"
                markerWidth="10"
                markerHeight="10"
                refX="8"
                refY="5"
                orient="auto"
              >
                <path d="M0,0 L10,5 L0,10 z" fill={COLORS.accent} />
              </marker>
            </defs>
            <rect
              x="0"
              y="0"
              width={VIEW_W}
              height={VIEW_H}
              rx="12"
              fill="var(--bg)"
            />
            <g aria-hidden="true" opacity="0" pointerEvents="none">
              <Stage
                label="ast"
                status="绑定节点"
                x={28}
                refCallback={(element) => {
                  stageRefs.current.ast = element;
                }}
              />
              <Stage
                label="rules"
                status="类型规则"
                x={174}
                refCallback={(element) => {
                  stageRefs.current.rules = element;
                }}
              />
              <Stage
                label="classify"
                status="类型 + 类别"
                x={320}
                refCallback={(element) => {
                  stageRefs.current.classify = element;
                }}
              />
              <Stage
                label="convert"
                status="显式节点"
                x={466}
                refCallback={(element) => {
                  stageRefs.current.convert = element;
                }}
              />
              <Stage
                label="verdict"
                status="证明或错误"
                x={612}
                refCallback={(element) => {
                  stageRefs.current.verdict = element;
                }}
              />
            </g>
            {view === "rules" ? (
              <RulesView
                activeStep={timeline.currentStep}
                fault={fault}
                sample={sample}
              />
            ) : view === "conversion" ? (
              <ConversionView fault={fault} sample={sample} />
            ) : (
              <DiagnosticView fault={fault} sample={sample} />
            )}
          </svg>
        </div>
        <div
          className="rounded-card border border-border bg-background p-4"
          role="status"
          aria-live="polite"
        >
          <p className="text-sm font-semibold text-primary">{current.label}</p>
          <p className="mt-1 text-sm leading-6 text-secondary">
            {current.detail}
          </p>
        </div>
        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="单步查看 ast、rules、classify、convert 和 verdict；重置后用同一输入重放，确认类型证明与错误集合不会被旧生成物污染。"
          reset={{
            label: "重置静态类型检查实验",
            ariaLabel: "重置静态类型检查专属实验",
            onClick: reset,
          }}
        />
      </div>
    </section>
  );
}
