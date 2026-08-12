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

type View = "route" | "source" | "reproduce" | "extend";
type Sample = "compiler" | "elf" | "language";
type Fault = "none" | "vague" | "source";

const VIEWS: readonly { id: View; label: string; detail: string }[] = [
  {
    id: "route",
    label: "证据路线",
    detail: "把机制缺口、资料、复现、补丁和回归串成一条路。",
  },
  {
    id: "source",
    label: "资料选择",
    detail: "比较一手资料、版本边界、适用目标和预期产物。",
  },
  {
    id: "reproduce",
    label: "最小复现",
    detail: "用最小输入、命令和退出码确认问题确实存在。",
  },
  {
    id: "extend",
    label: "扩展交付",
    detail: "检查最小补丁、回归测试和下一条阅读路线。",
  },
] as const;

const SAMPLES: readonly {
  id: Sample;
  label: string;
  gap: string;
  primary: string;
  command: string;
  artifact: string;
}[] = [
  {
    id: "compiler",
    label: "编译器机制",
    gap: "cbc 缺一条语法规则",
    primary: "JavaCC grammar / compiler docs",
    command: "cbc sample.cb → IR",
    artifact: "patch + parser test",
  },
  {
    id: "elf",
    label: "ELF/加载",
    gap: "重定位字段解释不清",
    primary: "ELF spec / readelf / ld",
    command: "readelf -h -S -r sample.o",
    artifact: "before/after map",
  },
  {
    id: "language",
    label: "语言功能",
    gap: "闭包捕获边界未知",
    primary: "language spec / implementation",
    command: "run closure-min.cb",
    artifact: "semantic regression",
  },
] as const;

const STEPS: readonly TeachingStep[] = [
  { label: "question", caption: "写出可观察的机制缺口。" },
  { label: "source", caption: "选择版本明确的一手资料。" },
  { label: "reproduce", caption: "运行最小复现并保存输出。" },
  { label: "patch", caption: "实施一个最小补丁。" },
  { label: "verify", caption: "回归测试后安排下一步。" },
] as const;

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

const CONCEPTS = [
  "第22章 扩展阅读",
  "22.1 参考书推荐",
  "22.2 链接、加载相关",
  "22.3 各种编程语言的功能",
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

function PipelineStage({
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
        y="108"
        width="132"
        height="76"
        rx="12"
        fill={COLORS.elevated}
        stroke={COLORS.border}
        strokeWidth="2"
      />
      <text
        x={x + 16}
        y="136"
        fontSize="15"
        fontWeight="700"
        fill={COLORS.primary}
      >
        {label}
      </text>
      <text x={x + 16} y="164" fontSize="13" fill={COLORS.secondary}>
        {status}
      </text>
    </g>
  );
}

function RouteView({ fault, sample }: { fault: Fault; sample: Sample }) {
  const selected = SAMPLES.find((item) => item.id === sample) ?? SAMPLES[0];
  const broken = fault === "vague";
  const stages = [
    ["gap", selected.gap, COLORS.accent],
    ["source", selected.primary, COLORS.warning],
    ["reproduce", selected.command, COLORS.warning],
    [
      "deliver",
      broken ? "no artifact" : selected.artifact,
      broken ? COLORS.danger : COLORS.success,
    ],
  ] as const;
  return (
    <g>
      <text x="28" y="32" fontSize="16" fontWeight="700" fill={COLORS.primary}>
        证据路线：每一步都要导向产物
      </text>
      <text x="28" y="59" fontSize="13" fill={COLORS.secondary}>
        {selected.label} · 不用阅读数量替代问题、复现和回归的闭环。
      </text>
      {stages.map(([label, detail, color], index) => {
        const x = 28 + index * 176;
        return (
          <g key={label}>
            <rect
              x={x}
              y="100"
              width="156"
              height="126"
              rx="12"
              fill={color}
              fillOpacity="0.12"
              stroke={color}
              strokeWidth="2"
            />
            <text
              x={x + 16}
              y="132"
              fontSize="14"
              fontWeight="700"
              fill={COLORS.primary}
            >
              {label}
            </text>
            <text x={x + 16} y="168" fontSize="13" fill={color}>
              {detail}
            </text>
            <text x={x + 16} y="202" fontSize="13" fill={COLORS.secondary}>
              {index === 0
                ? "observable"
                : index === 1
                  ? "versioned"
                  : index === 2
                    ? "repeatable"
                    : broken
                      ? "missing"
                      : "testable"}
            </text>
            {index < stages.length - 1 && (
              <line
                x1={x + 156}
                y1="163"
                x2={x + 172}
                y2="163"
                stroke={COLORS.accent}
                strokeWidth="3"
                markerEnd="url(#crc-reading-arrow)"
              />
            )}
          </g>
        );
      })}
      <rect
        x="28"
        y="270"
        width="704"
        height="62"
        rx="12"
        fill={broken ? COLORS.warning : COLORS.success}
        fillOpacity="0.12"
        stroke={broken ? COLORS.warning : COLORS.success}
        strokeWidth="2"
      />
      <text x="50" y="298" fontSize="14" fontWeight="700" fill={COLORS.primary}>
        {broken
          ? "路线不完整：模糊兴趣没有可验收产物"
          : "路线通过：缺口、资料、复现和交付彼此相连"}
      </text>
      <text
        x="50"
        y="322"
        fontSize="13"
        fill={broken ? COLORS.warning : COLORS.success}
      >
        {broken
          ? "缩小问题，补上版本、命令和回归出口。"
          : `primary=${selected.primary} · artifact=${selected.artifact}`}
      </text>
      <text x="28" y="378" fontSize="14" fontWeight="700" fill={COLORS.primary}>
        gap → primary source → reproduction → patch → regression
      </text>
      <text x="28" y="400" fontSize="13" fill={COLORS.accent}>
        阅读完成的标志是另一个人能按记录重复得到同一结论。
      </text>
    </g>
  );
}

function SourceView({ fault, sample }: { fault: Fault; sample: Sample }) {
  const selected = SAMPLES.find((item) => item.id === sample) ?? SAMPLES[0];
  const broken = fault === "source";
  const rows = [
    ["主资料", selected.primary, broken ? "unversioned" : "primary"],
    [
      "目标",
      selected.id === "elf"
        ? "IA-32 / ELF"
        : selected.id === "compiler"
          ? "cbc / JavaCC"
          : "language runtime",
      "scope",
    ],
    [
      "要核对",
      selected.id === "elf"
        ? "field + relocation"
        : selected.id === "compiler"
          ? "grammar + IR"
          : "semantics + runtime",
      "question",
    ],
    ["产物", selected.artifact, broken ? "unclear" : "expected"],
  ] as const;
  return (
    <g>
      <text x="28" y="32" fontSize="16" fontWeight="700" fill={COLORS.primary}>
        资料选择：一手、版本和适用目标缺一不可
      </text>
      <text x="28" y="59" fontSize="13" fill={COLORS.secondary}>
        {selected.label} · 先写资料要证明什么，再决定读哪些章节。
      </text>
      <rect
        x="28"
        y="88"
        width="704"
        height="48"
        rx="10"
        fill={COLORS.elevated}
        stroke={COLORS.border}
        strokeWidth="2"
      />
      <text x="48" y="118" fontSize="13" fontWeight="700" fill={COLORS.primary}>
        字段
      </text>
      <text
        x="220"
        y="118"
        fontSize="13"
        fontWeight="700"
        fill={COLORS.primary}
      >
        选择
      </text>
      <text
        x="560"
        y="118"
        fontSize="13"
        fontWeight="700"
        fill={COLORS.primary}
      >
        用途
      </text>
      {rows.map(([field, value, use], index) => {
        const y = 148 + index * 52;
        const warning = broken && (field === "主资料" || field === "产物");
        return (
          <g key={field}>
            <rect
              x="28"
              y={y}
              width="704"
              height="36"
              rx="8"
              fill={warning ? COLORS.warning : COLORS.elevated}
              fillOpacity={warning ? 0.14 : 1}
              stroke={warning ? COLORS.warning : COLORS.border}
              strokeWidth="1.5"
            />
            <text
              x="48"
              y={y + 24}
              fontSize="13"
              fontWeight="700"
              fill={COLORS.primary}
            >
              {field}
            </text>
            <text
              x="220"
              y={y + 24}
              fontSize="13"
              fill={warning ? COLORS.warning : COLORS.secondary}
            >
              {value}
            </text>
            <text
              x="560"
              y={y + 24}
              fontSize="13"
              fill={warning ? COLORS.warning : COLORS.accent}
            >
              {use}
            </text>
          </g>
        );
      })}
      <rect
        x="28"
        y="350"
        width="704"
        height="44"
        rx="9"
        fill={broken ? COLORS.warning : COLORS.success}
        fillOpacity="0.12"
        stroke={broken ? COLORS.warning : COLORS.success}
        strokeWidth="2"
      />
      <text
        x="48"
        y="378"
        fontSize="13"
        fontWeight="700"
        fill={broken ? COLORS.warning : COLORS.success}
      >
        {broken
          ? "资料不合格：没有版本或产物，无法与本地观察对照"
          : "资料通过：主出处、目标、核对问题和产物已经绑定"}
      </text>
    </g>
  );
}

function ReproduceView({ fault, sample }: { fault: Fault; sample: Sample }) {
  const selected = SAMPLES.find((item) => item.id === sample) ?? SAMPLES[0];
  const broken = fault === "vague";
  const rows = [
    ["input", selected.gap, "minimal"],
    ["command", selected.command, "record"],
    [
      "output",
      broken ? "too many variables" : selected.artifact,
      broken ? "unstable" : "capture",
    ],
    ["exit", broken ? "unknown" : "0 / expected diff", "assert"],
  ] as const;
  return (
    <g>
      <text x="28" y="32" fontSize="16" fontWeight="700" fill={COLORS.primary}>
        最小复现：把资料问题变成一次可重复运行
      </text>
      <text x="28" y="59" fontSize="13" fill={COLORS.secondary}>
        {selected.label} · 输入、命令、输出和退出码都要能被另一位读者重放。
      </text>
      {rows.map(([field, value, state], index) => {
        const y = 92 + index * 62;
        const warning = broken && (field === "output" || field === "exit");
        return (
          <g key={field}>
            <rect
              x="28"
              y={y}
              width="704"
              height="44"
              rx="9"
              fill={warning ? COLORS.warning : COLORS.elevated}
              fillOpacity={warning ? 0.14 : 1}
              stroke={warning ? COLORS.warning : COLORS.border}
              strokeWidth="1.5"
            />
            <text
              x="48"
              y={y + 28}
              fontSize="13"
              fontWeight="700"
              fill={COLORS.primary}
            >
              {field}
            </text>
            <text
              x="220"
              y={y + 28}
              fontSize="13"
              fill={warning ? COLORS.warning : COLORS.secondary}
            >
              {value}
            </text>
            <text
              x="600"
              y={y + 28}
              fontSize="13"
              fill={warning ? COLORS.warning : COLORS.accent}
            >
              {state}
            </text>
          </g>
        );
      })}
      <rect
        x="28"
        y="350"
        width="704"
        height="44"
        rx="9"
        fill={broken ? COLORS.warning : COLORS.success}
        fillOpacity="0.12"
        stroke={broken ? COLORS.warning : COLORS.success}
        strokeWidth="2"
      />
      <text
        x="48"
        y="378"
        fontSize="13"
        fontWeight="700"
        fill={broken ? COLORS.warning : COLORS.success}
      >
        {broken
          ? "复现过大：移除无关环境，直到一个输入能稳定触发问题"
          : "复现通过：最小输入和命令能重现观察结果"}
      </text>
    </g>
  );
}

function ExtendView({ fault, sample }: { fault: Fault; sample: Sample }) {
  const selected = SAMPLES.find((item) => item.id === sample) ?? SAMPLES[0];
  const broken = fault === "source";
  const rows = [
    ["patch", broken ? "scope not bounded" : "one behavior", "review"],
    ["regression", selected.artifact, "run after clean"],
    ["before/after", broken ? "no baseline" : "saved diff", "compare"],
    ["next route", broken ? "restart research" : "expand one axis", "queue"],
  ] as const;
  return (
    <g>
      <text x="28" y="32" fontSize="16" fontWeight="700" fill={COLORS.primary}>
        扩展交付：补丁、回归和下一步同时收口
      </text>
      <text x="28" y="59" fontSize="13" fill={COLORS.secondary}>
        {selected.label} · 不扩大范围，先证明一条规则改变了实现。
      </text>
      {rows.map(([field, value, state], index) => {
        const y = 92 + index * 62;
        const warning =
          broken && (field === "patch" || field === "before/after");
        return (
          <g key={field}>
            <rect
              x="28"
              y={y}
              width="704"
              height="44"
              rx="9"
              fill={warning ? COLORS.danger : COLORS.elevated}
              fillOpacity={warning ? 0.14 : 1}
              stroke={warning ? COLORS.danger : COLORS.border}
              strokeWidth="1.5"
            />
            <text
              x="48"
              y={y + 28}
              fontSize="13"
              fontWeight="700"
              fill={COLORS.primary}
            >
              {field}
            </text>
            <text
              x="240"
              y={y + 28}
              fontSize="13"
              fill={warning ? COLORS.danger : COLORS.secondary}
            >
              {value}
            </text>
            <text
              x="600"
              y={y + 28}
              fontSize="13"
              fill={warning ? COLORS.danger : COLORS.accent}
            >
              {state}
            </text>
          </g>
        );
      })}
      <rect
        x="28"
        y="350"
        width="704"
        height="44"
        rx="9"
        fill={broken ? COLORS.danger : COLORS.success}
        fillOpacity="0.12"
        stroke={broken ? COLORS.danger : COLORS.success}
        strokeWidth="2"
      />
      <text
        x="48"
        y="378"
        fontSize="13"
        fontWeight="700"
        fill={broken ? COLORS.danger : COLORS.success}
      >
        {broken
          ? "交付不完整：没有基线或边界，下一轮不能安全扩大"
          : "交付通过：补丁影响可解释，回归可重复，下一步有边界"}
      </text>
    </g>
  );
}

/** 第22章专属实验：回放扩展阅读从机制缺口到补丁和回归的证据路线。 */
export function Crc22FurtherReadingLab() {
  const [view, setView] = useState<View>("route");
  const [sample, setSample] = useState<Sample>("compiler");
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
    setView("route");
    setSample("compiler");
    setFault("none");
    timeline.goToStep(0);
  }

  return (
    <section
      aria-label={`第22章 扩展阅读专属机制缺口阅读路线实验；${CONCEPTS.join("；")}`}
      className="not-prose my-8 min-w-0 overflow-hidden rounded-card border border-border bg-elevated"
      data-unit-id="crc-unit-22"
      data-visual-kind="crc-further-reading-evidence-route-replay"
    >
      <header className="flex flex-wrap items-start justify-between gap-4 border-b border-border px-5 py-4 sm:px-6">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold tracking-wide text-accent">
            专属 Crc22FurtherReadingLab · 机制缺口阅读路线台
          </p>
          <h3 className="mt-1 text-base font-semibold text-primary">
            让下一份资料通向一个可验证产物
          </h3>
          <p className="mt-1 max-w-3xl text-sm leading-6 text-secondary">
            先预测：一份资料读完后，哪种产物最能证明路线真的改变了实现？
          </p>
        </div>
      </header>
      <div className="min-w-0 space-y-4 p-5 sm:p-6">
        <div className="flex flex-wrap gap-2" aria-label="选择扩展阅读实验视角">
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
        <div className="flex flex-wrap gap-2" aria-label="选择扩展阅读主题">
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
        <div className="flex flex-wrap gap-2" aria-label="选择扩展阅读故障模式">
          <ViewButton
            active={fault === "none"}
            onClick={() => setFault("none")}
          >
            完整路线
          </ViewButton>
          <ViewButton
            active={fault === "vague"}
            onClick={() => setFault("vague")}
          >
            问题过宽
          </ViewButton>
          <ViewButton
            active={fault === "source"}
            onClick={() => setFault("source")}
          >
            资料/边界缺失
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
                id="crc-reading-arrow"
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
              {STEPS.map((step, index) => (
                <PipelineStage
                  key={step.label}
                  label={`T${index}`}
                  status={step.label}
                  x={28 + index * 146}
                  refCallback={(element) => {
                    stageRefs.current[step.label] = element;
                  }}
                />
              ))}
            </g>
            {view === "route" ? (
              <RouteView fault={fault} sample={sample} />
            ) : view === "source" ? (
              <SourceView fault={fault} sample={sample} />
            ) : view === "reproduce" ? (
              <ReproduceView fault={fault} sample={sample} />
            ) : (
              <ExtendView fault={fault} sample={sample} />
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
          caption="单步查看 question、source、reproduce、patch 和 verify；重置后用同一主题重放，确认阅读路线仍能落到可复查产物。"
          reset={{
            label: "重置阅读路线实验",
            ariaLabel: "重置扩展阅读专属实验",
            onClick: reset,
          }}
        />
      </div>
    </section>
  );
}
