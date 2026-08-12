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

type View = "graph" | "compare" | "dynamic" | "archive";
type Sample = "static" | "shared" | "archive";
type Fault = "none" | "missing" | "duplicate";

const VIEWS: readonly { id: View; label: string; detail: string }[] = [
  {
    id: "graph",
    label: "解析图",
    detail: "沿对象引用、库提供者、链接器和输出文件追踪符号来源。",
  },
  {
    id: "compare",
    label: "链接对照",
    detail: "比较静态输出与动态输出的字段、大小和依赖边界。",
  },
  {
    id: "dynamic",
    label: "运行依赖",
    detail: "检查 DT_NEEDED、解释器、库搜索路径和 ldd 结果。",
  },
  {
    id: "archive",
    label: "归档成员",
    detail: "检查 ar 成员、按需提取和 link map 的实际来源。",
  },
] as const;

const SAMPLES: readonly {
  id: Sample;
  label: string;
  input: string;
  provider: string;
  output: string;
  dependency: string;
}[] = [
  {
    id: "static",
    label: "静态链接",
    input: "main.o + libcalc.a",
    provider: "add.o",
    output: "ET_EXEC",
    dependency: "none",
  },
  {
    id: "shared",
    label: "共享库",
    input: "main.o + libcalc.so",
    provider: "libcalc.so",
    output: "ET_EXEC + interp",
    dependency: "DT_NEEDED",
  },
  {
    id: "archive",
    label: "归档成员",
    input: "main.o + libcalc.a",
    provider: "mul.o only",
    output: "member selected",
    dependency: "link map",
  },
] as const;

const STEPS: readonly TeachingStep[] = [
  { label: "source", caption: "固定对象、库和符号状态。" },
  { label: "resolve", caption: "收集未定义引用和提供者。" },
  { label: "choose", caption: "选择静态、动态或归档成员。" },
  { label: "bind", caption: "应用重定位并记录依赖。" },
  { label: "verify", caption: "用 map、nm、ldd 清理重建。" },
] as const;

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

const CONCEPTS = [
  "第19章 链接和库",
  "19.1 链接的概要",
  "19.2 什么是链接",
  "19.3 动态链接和静态链接",
  "19.4 生成库",
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

function GraphView({ fault, sample }: { fault: Fault; sample: Sample }) {
  const selected = SAMPLES.find((item) => item.id === sample) ?? SAMPLES[0];
  const broken = fault === "missing";
  const stages = [
    ["objects", selected.input, COLORS.accent],
    [
      "resolver",
      broken ? "unresolved" : selected.provider,
      broken ? COLORS.danger : COLORS.warning,
    ],
    ["linker", "relocations", COLORS.warning],
    ["output", selected.output, COLORS.success],
  ] as const;
  return (
    <g>
      <text x="28" y="32" fontSize="16" fontWeight="700" fill={COLORS.primary}>
        解析图：每条引用都要有唯一来源
      </text>
      <text x="28" y="59" fontSize="13" fill={COLORS.secondary}>
        {selected.label} · {selected.input} ·
        先定位符号来源，再观察重定位和输出。
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
                ? "undefined ref"
                : index === 1
                  ? broken
                    ? "missing"
                    : "provider"
                  : index === 2
                    ? "apply reloc"
                    : selected.dependency}
            </text>
            {index < stages.length - 1 && (
              <line
                x1={x + 156}
                y1="163"
                x2={x + 172}
                y2="163"
                stroke={COLORS.accent}
                strokeWidth="3"
                markerEnd="url(#crc-library-arrow)"
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
        fill={broken ? COLORS.danger : COLORS.success}
        fillOpacity="0.12"
        stroke={broken ? COLORS.danger : COLORS.success}
        strokeWidth="2"
      />
      <text x="50" y="298" fontSize="14" fontWeight="700" fill={COLORS.primary}>
        {broken
          ? "解析失败：保留未定义符号与输入顺序，先修复来源"
          : "解析通过：符号来源、重定位与输出形成闭合链"}
      </text>
      <text
        x="50"
        y="322"
        fontSize="13"
        fill={broken ? COLORS.danger : COLORS.success}
      >
        {broken
          ? "不要通过添加无关库掩盖缺失提供者。"
          : `provider=${selected.provider} · dependency=${selected.dependency}`}
      </text>
      <text x="28" y="378" fontSize="14" fontWeight="700" fill={COLORS.primary}>
        nm -A → link map → readelf -d / ldd
      </text>
      <text x="28" y="400" fontSize="13" fill={COLORS.accent}>
        每个引用都要能回指到构建期或运行时的明确提供者。
      </text>
    </g>
  );
}

function CompareView({ fault, sample }: { fault: Fault; sample: Sample }) {
  const selected = SAMPLES.find((item) => item.id === sample) ?? SAMPLES[0];
  const broken = fault === "duplicate";
  const rows = [
    [
      "输出",
      selected.id === "shared" ? "ET_EXEC + interp" : "ET_EXEC",
      "readelf -h",
    ],
    [
      "库内容",
      selected.id === "archive" ? "selected member" : selected.provider,
      "ar t / nm",
    ],
    [
      "依赖",
      selected.dependency,
      selected.id === "shared" ? "readelf -d" : "link map",
    ],
    ["符号", broken ? "duplicate definition" : "one provider", "nm -A"],
  ] as const;
  return (
    <g>
      <text x="28" y="32" fontSize="16" fontWeight="700" fill={COLORS.primary}>
        链接对照：输出字段揭示链接边界
      </text>
      <text x="28" y="59" fontSize="13" fill={COLORS.secondary}>
        {selected.label} · 相同源码与目标，只改变链接策略并记录依赖差异。
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
        证据
      </text>
      <text
        x="240"
        y="118"
        fontSize="13"
        fontWeight="700"
        fill={COLORS.primary}
      >
        结果
      </text>
      <text
        x="520"
        y="118"
        fontSize="13"
        fontWeight="700"
        fill={COLORS.primary}
      >
        命令
      </text>
      {rows.map(([evidence, result, command], index) => {
        const y = 148 + index * 52;
        const warning = broken && evidence === "符号";
        return (
          <g key={evidence}>
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
              {evidence}
            </text>
            <text
              x="240"
              y={y + 24}
              fontSize="13"
              fill={warning ? COLORS.warning : COLORS.secondary}
            >
              {result}
            </text>
            <text
              x="520"
              y={y + 24}
              fontSize="13"
              fill={warning ? COLORS.warning : COLORS.accent}
            >
              {command}
            </text>
          </g>
        );
      })}
      <rect
        x="28"
        y="362"
        width="704"
        height="32"
        rx="8"
        fill={broken ? COLORS.warning : COLORS.success}
        fillOpacity="0.12"
        stroke={broken ? COLORS.warning : COLORS.success}
        strokeWidth="2"
      />
      <text
        x="48"
        y="384"
        fontSize="13"
        fontWeight="700"
        fill={broken ? COLORS.warning : COLORS.success}
      >
        {broken
          ? "重复定义：缩小输入集合并确认唯一提供者"
          : "对照通过：静态吸收成员，动态保留运行时依赖"}
      </text>
    </g>
  );
}

function DynamicView({ fault, sample }: { fault: Fault; sample: Sample }) {
  const selected = SAMPLES.find((item) => item.id === sample) ?? SAMPLES[0];
  const broken = fault === "missing";
  const rows = [
    [
      "DT_NEEDED",
      selected.id === "shared" ? "libcalc.so" : "none",
      "readelf -d",
    ],
    [
      "解释器",
      selected.id === "shared" ? "/lib/ld-linux.so.2" : "—",
      "readelf -l",
    ],
    [
      "搜索路径",
      broken ? "not found" : selected.id === "shared" ? "system path" : "n/a",
      "ldd",
    ],
    [
      "运行时",
      broken
        ? "load failed"
        : selected.id === "shared"
          ? "resolved"
          : "self-contained",
      "execute",
    ],
  ] as const;
  return (
    <g>
      <text x="28" y="32" fontSize="16" fontWeight="700" fill={COLORS.primary}>
        运行依赖：动态链接把部分工作留到启动时
      </text>
      <text x="28" y="59" fontSize="13" fill={COLORS.secondary}>
        {selected.label} · 不用静态版本的运行成功替代动态库搜索验收。
      </text>
      {rows.map(([field, value, command], index) => {
        const y = 92 + index * 62;
        const warning = broken && (field === "搜索路径" || field === "运行时");
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
              x="520"
              y={y + 28}
              fontSize="13"
              fill={warning ? COLORS.danger : COLORS.accent}
            >
              {command}
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
          ? "加载失败：记录目标架构、库路径与 ldd 输出后再修复"
          : "运行依赖通过：构建字段与加载器解析指向同一共享库"}
      </text>
    </g>
  );
}

function ArchiveView({ fault, sample }: { fault: Fault; sample: Sample }) {
  const selected = SAMPLES.find((item) => item.id === sample) ?? SAMPLES[0];
  const broken = fault === "duplicate";
  const rows = [
    ["ar t", "add.o / mul.o", "members"],
    ["undefined", selected.id === "archive" ? "mul" : "add", "main.o"],
    [
      "selected",
      broken
        ? "add.o + other.o"
        : selected.id === "archive"
          ? "mul.o"
          : "add.o",
      "link map",
    ],
    ["output", broken ? "multiple definition" : "one provider", "nm -A"],
  ] as const;
  return (
    <g>
      <text x="28" y="32" fontSize="16" fontWeight="700" fill={COLORS.primary}>
        归档成员：按需提取而不是整库复制
      </text>
      <text x="28" y="59" fontSize="13" fill={COLORS.secondary}>
        {selected.input} · 用 ar、nm 和 link map 对照未定义符号与实际提取成员。
      </text>
      {rows.map(([field, result, evidence], index) => {
        const y = 92 + index * 62;
        const warning = broken && (field === "selected" || field === "output");
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
              x="240"
              y={y + 28}
              fontSize="13"
              fill={warning ? COLORS.warning : COLORS.secondary}
            >
              {result}
            </text>
            <text
              x="520"
              y={y + 28}
              fontSize="13"
              fill={warning ? COLORS.warning : COLORS.accent}
            >
              {evidence}
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
          ? "成员选择异常：去掉无关库并恢复唯一符号来源"
          : "成员选择通过：只提取满足未定义引用的归档成员"}
      </text>
    </g>
  );
}

/** 第19章专属实验：回放符号解析、链接策略、库成员和运行依赖。 */
export function Crc19LinkingLibrariesLab() {
  const [view, setView] = useState<View>("graph");
  const [sample, setSample] = useState<Sample>("static");
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
    setView("graph");
    setSample("static");
    setFault("none");
    timeline.goToStep(0);
  }

  return (
    <section
      aria-label={`第19章 链接和库专属符号解析与库选择实验；${CONCEPTS.join("；")}`}
      className="not-prose my-8 min-w-0 overflow-hidden rounded-card border border-border bg-elevated"
      data-unit-id="crc-unit-19"
      data-visual-kind="crc-linking-library-resolution-replay"
    >
      <header className="flex flex-wrap items-start justify-between gap-4 border-b border-border px-5 py-4 sm:px-6">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold tracking-wide text-accent">
            专属 Crc19LinkingLibrariesLab · 符号解析与库选择台
          </p>
          <h3 className="mt-1 text-base font-semibold text-primary">
            让每个未定义符号都能回指到一个提供者
          </h3>
          <p className="mt-1 max-w-3xl text-sm leading-6 text-secondary">
            先预测：库里存在目标名字时，什么证据能证明链接器真的选中了它？
          </p>
        </div>
      </header>
      <div className="min-w-0 space-y-4 p-5 sm:p-6">
        <div className="flex flex-wrap gap-2" aria-label="选择链接实验视角">
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
        <div className="flex flex-wrap gap-2" aria-label="选择链接样本">
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
        <div className="flex flex-wrap gap-2" aria-label="选择链接故障模式">
          <ViewButton
            active={fault === "none"}
            onClick={() => setFault("none")}
          >
            正常解析
          </ViewButton>
          <ViewButton
            active={fault === "missing"}
            onClick={() => setFault("missing")}
          >
            缺失依赖
          </ViewButton>
          <ViewButton
            active={fault === "duplicate"}
            onClick={() => setFault("duplicate")}
          >
            重复定义
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
                id="crc-library-arrow"
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
            {view === "graph" ? (
              <GraphView fault={fault} sample={sample} />
            ) : view === "compare" ? (
              <CompareView fault={fault} sample={sample} />
            ) : view === "dynamic" ? (
              <DynamicView fault={fault} sample={sample} />
            ) : (
              <ArchiveView fault={fault} sample={sample} />
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
          caption="单步查看 source、resolve、choose、bind 和 verify；重置后用同一输入重放，确认库选择与运行时依赖没有漂移。"
          reset={{
            label: "重置链接实验",
            ariaLabel: "重置链接和库专属实验",
            onClick: reset,
          }}
        />
      </div>
    </section>
  );
}
