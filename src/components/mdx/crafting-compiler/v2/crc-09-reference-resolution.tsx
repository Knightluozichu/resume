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

type View = "scope" | "lookup" | "diagnostic";
type Sample = "global" | "shadow" | "type";
type Fault = "none" | "duplicate" | "undefined";

const VIEWS: readonly { id: View; label: string; detail: string }[] = [
  {
    id: "scope",
    label: "作用域链路",
    detail: "沿声明、嵌套作用域和名称使用推进到唯一绑定。",
  },
  {
    id: "lookup",
    label: "查找表",
    detail: "比较声明 ID、命名空间、可见时点和遮蔽关系。",
  },
  {
    id: "diagnostic",
    label: "诊断回放",
    detail: "让重复定义和未定义引用在 IR 之前停止。",
  },
] as const;

const SAMPLES: readonly {
  id: Sample;
  label: string;
  code: string;
  binding: string;
  scope: string;
}[] = [
  {
    id: "global",
    label: "全局",
    code: "int limit = 4; use(limit);",
    binding: "use(limit) → D1",
    scope: "global · D1",
  },
  {
    id: "shadow",
    label: "嵌套块",
    code: "int limit=4; { int limit=8; use(limit); }",
    binding: "use(limit) → D2",
    scope: "block · D2 遮蔽 D1",
  },
  {
    id: "type",
    label: "类型名",
    code: "type Node; Node *next;",
    binding: "Node → D3 · type namespace",
    scope: "function · type",
  },
] as const;

const STEPS: readonly TeachingStep[] = [
  { label: "tokens", caption: "固定样本、名称使用和源位置。" },
  { label: "scopes", caption: "进入作用域并维护查找栈。" },
  { label: "declarations", caption: "登记声明类别与稳定 ID。" },
  { label: "lookup", caption: "从栈顶向外查找变量或类型名。" },
  { label: "verdict", caption: "输出绑定表或汇总诊断。" },
] as const;

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

const CONCEPTS = [
  "第9章 语义分析（1）引用的消解",
  "9.1 语义分析的概要",
  "9.2 变量引用的消解",
  "9.3 类型名称的消解",
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

function ScopeView({
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
  return (
    <g>
      <text x="28" y="31" fontSize="16" fontWeight="700" fill={COLORS.primary}>
        declarations → nested scopes → name/type uses → unique binding
      </text>
      <text x="28" y="58" fontSize="13" fill={COLORS.secondary}>
        查找从栈顶开始；外层声明保留，用于解释遮蔽和离开块后的恢复。
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
      {[
        { label: "global", id: "D1", note: "limit : int", x: 56, y: 120 },
        { label: "function", id: "D3", note: "Node : type", x: 270, y: 120 },
        { label: "block", id: "D2", note: "limit : int", x: 484, y: 120 },
      ].map((item, index) => {
        const visible = activeStep >= 1 + index;
        const hidden = sample === "global" && item.label === "block";
        return (
          <g key={item.label} opacity={hidden ? 0.28 : visible ? 1 : 0.45}>
            <rect
              x={item.x}
              y={item.y}
              width="170"
              height="112"
              rx="12"
              fill={item.label === "block" ? COLORS.accent : COLORS.elevated}
              fillOpacity={item.label === "block" ? 0.12 : 1}
              stroke={item.label === "block" ? COLORS.accent : COLORS.border}
              strokeWidth="2"
            />
            <text
              x={item.x + 18}
              y={item.y + 30}
              fontSize="14"
              fontWeight="700"
              fill={COLORS.primary}
            >
              {item.label} scope
            </text>
            <text
              x={item.x + 18}
              y={item.y + 59}
              fontSize="13"
              fill={COLORS.secondary}
            >
              {item.id} · {item.note}
            </text>
            <text
              x={item.x + 18}
              y={item.y + 88}
              fontSize="13"
              fill={item.label === "block" ? COLORS.accent : COLORS.secondary}
            >
              {item.label === "block" ? "栈顶优先" : "可被外层查找"}
            </text>
          </g>
        );
      })}
      <path
        d="M226 176 C242 176 250 176 270 176"
        fill="none"
        stroke={COLORS.accent}
        strokeWidth="3"
        markerEnd="url(#crc-reference-arrow)"
      />
      <path
        d="M440 176 C456 176 464 176 484 176"
        fill="none"
        stroke={COLORS.accent}
        strokeWidth="3"
        markerEnd="url(#crc-reference-arrow)"
      />
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
        当前样本：{selected.code}
      </text>
      <text
        x="52"
        y="368"
        fontSize="13"
        fill={invalid ? COLORS.warning : COLORS.success}
      >
        {invalid
          ? fault === "duplicate"
            ? "D4 与现有声明冲突：停止生成 IR"
            : "Node 未找到可见类型声明：保留源位置"
          : `${selected.binding} · ${selected.scope}`}
      </text>
    </g>
  );
}

function LookupView({ fault, sample }: { fault: Fault; sample: Sample }) {
  const selected = SAMPLES.find((item) => item.id === sample) ?? SAMPLES[0];
  const actual =
    fault === "duplicate"
      ? "D4 · duplicate"
      : fault === "undefined"
        ? "— · not found"
        : selected.binding;
  const tone = fault === "none" ? COLORS.success : COLORS.warning;
  return (
    <g>
      <text x="28" y="31" fontSize="16" fontWeight="700" fill={COLORS.primary}>
        绑定表：声明 ID 与命名空间必须可解释
      </text>
      <text x="28" y="58" fontSize="13" fill={COLORS.secondary}>
        记录使用节点、声明节点、查找层级和源跨度，避免表项只剩下字符串。
      </text>
      <rect
        x="28"
        y="92"
        width="704"
        height="52"
        rx="10"
        fill={COLORS.elevated}
        stroke={COLORS.border}
        strokeWidth="2"
      />
      <text x="52" y="124" fontSize="14" fontWeight="700" fill={COLORS.primary}>
        使用节点
      </text>
      <text
        x="222"
        y="124"
        fontSize="14"
        fontWeight="700"
        fill={COLORS.primary}
      >
        查找路径
      </text>
      <text
        x="430"
        y="124"
        fontSize="14"
        fontWeight="700"
        fill={COLORS.primary}
      >
        结果
      </text>
      <text
        x="594"
        y="124"
        fontSize="14"
        fontWeight="700"
        fill={COLORS.primary}
      >
        源跨度
      </text>
      <rect
        x="28"
        y="158"
        width="704"
        height="136"
        rx="10"
        fill={tone}
        fillOpacity="0.1"
        stroke={tone}
        strokeWidth="2"
      />
      <text x="52" y="198" fontSize="14" fill={COLORS.primary}>
        {selected.id === "type" ? "Node" : "use(limit)"}
      </text>
      <text x="222" y="198" fontSize="14" fill={COLORS.secondary}>
        block → function → global
      </text>
      <text x="430" y="198" fontSize="14" fontWeight="700" fill={tone}>
        {actual}
      </text>
      <text x="594" y="198" fontSize="14" fill={COLORS.secondary}>
        [24, 29)
      </text>
      <text x="52" y="242" fontSize="13" fill={COLORS.secondary}>
        namespace：{selected.id === "type" ? "type" : "value"} ·
        visibleAt：current node
      </text>
      <text x="28" y="350" fontSize="13" fill={COLORS.accent}>
        诊断提示：同名只说明候选相似；声明 ID、类别和可见时点才决定绑定。
      </text>
      <text x="28" y="378" fontSize="13" fill={tone}>
        {fault === "none"
          ? "绑定合同通过：可交给静态类型检查。"
          : "绑定合同失败：IR 许可为否。"}
      </text>
    </g>
  );
}

function DiagnosticView({ fault, sample }: { fault: Fault; sample: Sample }) {
  const selected = SAMPLES.find((item) => item.id === sample) ?? SAMPLES[0];
  const failed = fault !== "none";
  const stages = [
    ["登记", "声明类别 + ID", false],
    ["查找", selected.id === "type" ? "type namespace" : "scope stack", false],
    [
      "检查",
      failed
        ? fault === "duplicate"
          ? "重复定义"
          : "未定义引用"
        : "唯一可见声明",
      failed,
    ],
    ["IR", failed ? "拒绝生成" : "允许继续", failed],
  ] as const;
  return (
    <g>
      <text x="28" y="31" fontSize="16" fontWeight="700" fill={COLORS.primary}>
        诊断回放：错误在 IR 之前停止
      </text>
      <text x="28" y="58" fontSize="13" fill={COLORS.secondary}>
        清理、生成、编译、运行后重新输出同一绑定表，比较错误码和源位置。
      </text>
      {stages.map(([label, detail, error], index) => {
        const x = 28 + index * 176;
        const active = index <= 2 || !failed;
        return (
          <g key={label} opacity={active ? 1 : 0.45}>
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
                markerEnd="url(#crc-reference-arrow)"
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
          ? fault === "duplicate"
            ? "diagnostic E_DUPLICATE @ line 1 · 不生成 IR"
            : "diagnostic E_UNDEFINED @ line 1 · 不生成 IR"
          : `ResolveDump 通过：${selected.binding}`}
      </text>
      <text x="52" y="330" fontSize="13" fill={COLORS.secondary}>
        输入、工具版本、绑定表和退出码都应写入实验档案。
      </text>
      <text x="28" y="382" fontSize="13" fill={COLORS.accent}>
        比较点：错误的源位置稳定，清理后不会被旧生成物改写。
      </text>
    </g>
  );
}

/** 第9章专属实验：回放作用域栈、引用查找与语义诊断。 */
export function CrcReferenceResolutionLab() {
  const [view, setView] = useState<View>("scope");
  const [sample, setSample] = useState<Sample>("shadow");
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
    setView("scope");
    setSample("shadow");
    setFault("none");
    timeline.goToStep(0);
  }

  return (
    <section
      aria-label={`第9章引用消解专属作用域、查找与诊断实验；${CONCEPTS.join("；")}`}
      className="not-prose my-8 min-w-0 overflow-hidden rounded-card border border-border bg-elevated"
      data-unit-id="crc-unit-09"
      data-visual-kind="crc-reference-resolution-scope-replay"
    >
      <header className="flex flex-wrap items-start justify-between gap-4 border-b border-border px-5 py-4 sm:px-6">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold tracking-wide text-accent">
            专属 CrcReferenceResolutionLab · 作用域、查找与诊断
          </p>
          <h3 className="mt-1 text-base font-semibold text-primary">
            把每个名字使用连回确切声明
          </h3>
          <p className="mt-1 max-w-3xl text-sm leading-6 text-secondary">
            先预测：内层同名声明出现时，绑定表应该覆盖外层
            ID，还是保留遮蔽关系？
          </p>
        </div>
      </header>
      <div className="min-w-0 space-y-4 p-5 sm:p-6">
        <div className="flex flex-wrap gap-2" aria-label="选择引用消解实验视角">
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
        <div className="flex flex-wrap gap-2" aria-label="选择作用域与名称样本">
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
        <div className="flex flex-wrap gap-2" aria-label="选择引用消解故障模式">
          <ViewButton
            active={fault === "none"}
            onClick={() => setFault("none")}
          >
            正常绑定
          </ViewButton>
          <ViewButton
            active={fault === "duplicate"}
            onClick={() => setFault("duplicate")}
          >
            重复定义
          </ViewButton>
          <ViewButton
            active={fault === "undefined"}
            onClick={() => setFault("undefined")}
          >
            未定义引用
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
                id="crc-reference-arrow"
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
                label="tokens"
                status="名称与源位"
                x={28}
                refCallback={(element) => {
                  stageRefs.current.tokens = element;
                }}
              />
              <Stage
                label="scopes"
                status="作用域栈"
                x={174}
                refCallback={(element) => {
                  stageRefs.current.scopes = element;
                }}
              />
              <Stage
                label="declarations"
                status="类别与 ID"
                x={320}
                refCallback={(element) => {
                  stageRefs.current.declarations = element;
                }}
              />
              <Stage
                label="lookup"
                status="栈顶向外"
                x={466}
                refCallback={(element) => {
                  stageRefs.current.lookup = element;
                }}
              />
              <Stage
                label="verdict"
                status="绑定或诊断"
                x={612}
                refCallback={(element) => {
                  stageRefs.current.verdict = element;
                }}
              />
            </g>
            {view === "scope" ? (
              <ScopeView
                activeStep={timeline.currentStep}
                fault={fault}
                sample={sample}
              />
            ) : view === "lookup" ? (
              <LookupView fault={fault} sample={sample} />
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
          caption="单步查看 tokens、scopes、declarations、lookup 和 verdict；重置后用同一输入重放，确认绑定表与诊断不会被旧生成物污染。"
          reset={{
            label: "重置引用消解实验",
            ariaLabel: "重置引用消解专属实验",
            onClick: reset,
          }}
        />
      </div>
    </section>
  );
}
