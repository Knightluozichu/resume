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

type View = "segments" | "dynamic" | "maps" | "script";
type Sample = "exec" | "shared" | "custom";
type Fault = "none" | "permission" | "dependency";

const VIEWS: readonly { id: View; label: string; detail: string }[] = [
  {
    id: "segments",
    label: "PT_LOAD",
    detail: "比较程序头的文件范围、内存范围、对齐和 R/W/X 权限。",
  },
  {
    id: "dynamic",
    label: "动态加载",
    detail: "追踪 PT_INTERP、DT_NEEDED、库搜索和重定位日志。",
  },
  {
    id: "maps",
    label: "进程映射",
    detail: "把 /proc/PID/maps 的地址范围和权限对回 ELF 段。",
  },
  {
    id: "script",
    label: "ld 脚本",
    detail: "验证节到段归属、入口、地址对齐和 link map。",
  },
] as const;

const SAMPLES: readonly {
  id: Sample;
  label: string;
  input: string;
  interp: string;
  dependency: string;
  entry: string;
}[] = [
  {
    id: "exec",
    label: "自包含程序",
    input: "app",
    interp: "none",
    dependency: "none",
    entry: "0x08049000",
  },
  {
    id: "shared",
    label: "动态依赖程序",
    input: "app + libcalc.so",
    interp: "/lib/ld-linux.so.2",
    dependency: "libcalc.so",
    entry: "0x08049000",
  },
  {
    id: "custom",
    label: "自定义脚本",
    input: "app + linker.ld",
    interp: "script-defined",
    dependency: "controlled",
    entry: "_start in .text",
  },
] as const;

const STEPS: readonly TeachingStep[] = [
  { label: "source", caption: "固定 ELF、目标和加载样本。" },
  { label: "headers", caption: "读取程序头和 PT_LOAD。" },
  { label: "map", caption: "建立文件到进程的映射。" },
  { label: "dynamic", caption: "追踪加载器和重定位。" },
  { label: "entry", caption: "验证入口权限并清理重建。" },
] as const;

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

const CONCEPTS = [
  "第20章 加载程序",
  "20.1 加载ELF段",
  "20.2 动态链接过程",
  "20.3 动态加载",
  "20.4 GNU ld的链接",
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

function SegmentsView({ fault, sample }: { fault: Fault; sample: Sample }) {
  const selected = SAMPLES.find((item) => item.id === sample) ?? SAMPLES[0];
  const broken = fault === "permission";
  const rows = [
    ["PT_LOAD 0", "0x0000 → 0x08048000", "0x1200 / 0x1200", "R E"],
    [
      "PT_LOAD 1",
      "0x2000 → 0x0804a000",
      "0x0800 / 0x1000",
      broken ? "R E" : "R W",
    ],
    ["PT_INTERP", selected.interp, "loader", "R"],
    ["entry", selected.entry, "inside text", broken ? "not executable" : "R E"],
  ] as const;
  return (
    <g>
      <text x="28" y="32" fontSize="16" fontWeight="700" fill={COLORS.primary}>
        PT_LOAD：文件范围如何变成内存范围
      </text>
      <text x="28" y="59" fontSize="13" fill={COLORS.secondary}>
        {selected.input} · readelf -l -S app · 先看程序头，再对照节和入口权限。
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
        条目
      </text>
      <text
        x="190"
        y="118"
        fontSize="13"
        fontWeight="700"
        fill={COLORS.primary}
      >
        文件→虚拟地址
      </text>
      <text
        x="430"
        y="118"
        fontSize="13"
        fontWeight="700"
        fill={COLORS.primary}
      >
        文件/内存大小
      </text>
      <text
        x="620"
        y="118"
        fontSize="13"
        fontWeight="700"
        fill={COLORS.primary}
      >
        权限
      </text>
      {rows.map(([field, range, size, flags], index) => {
        const y = 148 + index * 52;
        const warning = broken && (field === "PT_LOAD 1" || field === "entry");
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
              x="190"
              y={y + 24}
              fontSize="13"
              fill={warning ? COLORS.warning : COLORS.secondary}
            >
              {range}
            </text>
            <text x="430" y={y + 24} fontSize="13" fill={COLORS.secondary}>
              {size}
            </text>
            <text
              x="620"
              y={y + 24}
              fontSize="13"
              fill={warning ? COLORS.warning : COLORS.accent}
            >
              {flags}
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
          ? "权限不一致：入口不能落入不可执行映射，先修正段旗标"
          : "段合同通过：文件大小、内存大小、对齐、权限与入口可对照"}
      </text>
    </g>
  );
}

function DynamicView({ fault, sample }: { fault: Fault; sample: Sample }) {
  const selected = SAMPLES.find((item) => item.id === sample) ?? SAMPLES[0];
  const broken = fault === "dependency";
  const rows = [
    ["PT_INTERP", selected.interp, "readelf -l"],
    ["DT_NEEDED", selected.dependency, "readelf -d"],
    [
      "库搜索",
      broken ? "not found" : selected.id === "shared" ? "system path" : "n/a",
      "LD_DEBUG=libs",
    ],
    [
      "重定位",
      broken ? "blocked" : selected.id === "shared" ? "resolved" : "none",
      "LD_DEBUG=reloc",
    ],
  ] as const;
  return (
    <g>
      <text x="28" y="32" fontSize="16" fontWeight="700" fill={COLORS.primary}>
        动态加载：把搜索、映射与重定位分开
      </text>
      <text x="28" y="59" fontSize="13" fill={COLORS.secondary}>
        {selected.label} · LD_DEBUG=libs,reloc ./app ·
        构建有入口不等于运行依赖完成。
      </text>
      {rows.map(([field, value, evidence], index) => {
        const y = 92 + index * 62;
        const warning = broken && (field === "库搜索" || field === "重定位");
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
              x="260"
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
          ? "动态依赖失败：保存目标架构、搜索路径和最小日志"
          : "动态阶段通过：解释器、依赖、搜索、重定位各有证据"}
      </text>
    </g>
  );
}

function MapsView({ fault, sample }: { fault: Fault; sample: Sample }) {
  const selected = SAMPLES.find((item) => item.id === sample) ?? SAMPLES[0];
  const broken = fault === "permission";
  const rows = [
    ["0x08048000-0x08049000", "app", "r-xp"],
    ["0x0804a000-0x0804b000", "app", broken ? "r-xp" : "rw-p"],
    [
      "0xf7d00000-0xf7d20000",
      selected.dependency === "none" ? "—" : "libcalc.so",
      "r-xp",
    ],
    ["entry", selected.entry, broken ? "no execute" : "inside r-xp"],
  ] as const;
  return (
    <g>
      <text x="28" y="32" fontSize="16" fontWeight="700" fill={COLORS.primary}>
        进程映射：加载合同落到地址空间
      </text>
      <text x="28" y="59" fontSize="13" fill={COLORS.secondary}>
        {selected.input} · /proc/PID/maps · 用范围、文件名和权限验证 PT_LOAD
        的实际结果。
      </text>
      {rows.map(([range, file, perms], index) => {
        const y = 92 + index * 62;
        const warning =
          broken && (range.includes("0804a000") || range === "entry");
        return (
          <g key={range}>
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
              {range}
            </text>
            <text
              x="360"
              y={y + 28}
              fontSize="13"
              fill={warning ? COLORS.warning : COLORS.secondary}
            >
              {file}
            </text>
            <text
              x="560"
              y={y + 28}
              fontSize="13"
              fill={warning ? COLORS.warning : COLORS.accent}
            >
              {perms}
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
          ? "映射权限异常：程序头与进程范围不一致，入口验收不能继续"
          : "映射通过：文件区间、地址范围、文件名和权限彼此吻合"}
      </text>
    </g>
  );
}

function ScriptView({ fault, sample }: { fault: Fault; sample: Sample }) {
  const selected = SAMPLES.find((item) => item.id === sample) ?? SAMPLES[0];
  const broken = fault === "permission";
  const rows = [
    [".text", "PT_LOAD 0", "0x08048000", "R E"],
    [".rodata", "PT_LOAD 0", "aligned", "R"],
    [".data/.bss", "PT_LOAD 1", "0x0804a000", broken ? "R E" : "R W"],
    ["ENTRY", "_start", selected.entry, broken ? "outside" : "inside .text"],
  ] as const;
  return (
    <g>
      <text x="28" y="32" fontSize="16" fontWeight="700" fill={COLORS.primary}>
        GNU ld：脚本改变布局，证据仍要回到程序头
      </text>
      <text x="28" y="59" fontSize="13" fill={COLORS.secondary}>
        {selected.input} · ld -m elf_i386 -T linker.ld ·
        检查节到段、入口和对齐。
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
        节
      </text>
      <text
        x="220"
        y="118"
        fontSize="13"
        fontWeight="700"
        fill={COLORS.primary}
      >
        所属段
      </text>
      <text
        x="400"
        y="118"
        fontSize="13"
        fontWeight="700"
        fill={COLORS.primary}
      >
        地址
      </text>
      <text
        x="570"
        y="118"
        fontSize="13"
        fontWeight="700"
        fill={COLORS.primary}
      >
        权限/入口
      </text>
      {rows.map(([section, segment, address, signal], index) => {
        const y = 148 + index * 52;
        const warning =
          broken && (section === ".data/.bss" || section === "ENTRY");
        return (
          <g key={section}>
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
              {section}
            </text>
            <text
              x="220"
              y={y + 24}
              fontSize="13"
              fill={warning ? COLORS.warning : COLORS.secondary}
            >
              {segment}
            </text>
            <text x="400" y={y + 24} fontSize="13" fill={COLORS.secondary}>
              {address}
            </text>
            <text
              x="570"
              y={y + 24}
              fontSize="13"
              fill={warning ? COLORS.warning : COLORS.accent}
            >
              {signal}
            </text>
          </g>
        );
      })}
      <rect
        x="28"
        y="374"
        width="704"
        height="20"
        rx="7"
        fill={broken ? COLORS.warning : COLORS.accent}
        fillOpacity="0.12"
      />
      <text
        x="48"
        y="389"
        fontSize="13"
        fill={broken ? COLORS.warning : COLORS.accent}
      >
        {broken
          ? "脚本结果异常：先修复节到段或入口权限，再保存 link map。"
          : "脚本通过：link map、程序头与入口给出同一布局解释。"}
      </text>
    </g>
  );
}

/** 第20章专属实验：回放 PT_LOAD 映射、动态加载和 GNU ld 布局。 */
export function Crc20ProgramLoadingLab() {
  const [view, setView] = useState<View>("segments");
  const [sample, setSample] = useState<Sample>("exec");
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
    setView("segments");
    setSample("exec");
    setFault("none");
    timeline.goToStep(0);
  }

  return (
    <section
      aria-label={`第20章 加载程序专属 ELF 段映射与加载实验；${CONCEPTS.join("；")}`}
      className="not-prose my-8 min-w-0 overflow-hidden rounded-card border border-border bg-elevated"
      data-unit-id="crc-unit-20"
      data-visual-kind="crc-program-loading-segment-replay"
    >
      <header className="flex flex-wrap items-start justify-between gap-4 border-b border-border px-5 py-4 sm:px-6">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold tracking-wide text-accent">
            专属 Crc20ProgramLoadingLab · ELF 段映射与加载台
          </p>
          <h3 className="mt-1 text-base font-semibold text-primary">
            让入口地址回到一个可检查的进程映射
          </h3>
          <p className="mt-1 max-w-3xl text-sm leading-6 text-secondary">
            先预测：入口字段正确但程序仍起不来时，哪条映射或依赖证据会先暴露问题？
          </p>
        </div>
      </header>
      <div className="min-w-0 space-y-4 p-5 sm:p-6">
        <div className="flex flex-wrap gap-2" aria-label="选择加载实验视角">
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
        <div className="flex flex-wrap gap-2" aria-label="选择加载样本">
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
        <div className="flex flex-wrap gap-2" aria-label="选择加载故障模式">
          <ViewButton
            active={fault === "none"}
            onClick={() => setFault("none")}
          >
            正常加载
          </ViewButton>
          <ViewButton
            active={fault === "permission"}
            onClick={() => setFault("permission")}
          >
            权限/入口错误
          </ViewButton>
          <ViewButton
            active={fault === "dependency"}
            onClick={() => setFault("dependency")}
          >
            依赖加载错误
          </ViewButton>
        </div>
        <div className="min-w-0 rounded-card border border-border bg-background p-3 sm:p-4">
          <svg
            viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
            role="img"
            aria-label={`${current.label}可视化：${current.detail}`}
            className="h-auto w-full"
          >
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
            {view === "segments" ? (
              <SegmentsView fault={fault} sample={sample} />
            ) : view === "dynamic" ? (
              <DynamicView fault={fault} sample={sample} />
            ) : view === "maps" ? (
              <MapsView fault={fault} sample={sample} />
            ) : (
              <ScriptView fault={fault} sample={sample} />
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
          caption="单步查看 source、headers、map、dynamic 和 entry；重置后用同一 ELF 样本重放，确认入口与进程权限没有漂移。"
          reset={{
            label: "重置加载实验",
            ariaLabel: "重置加载程序专属实验",
            onClick: reset,
          }}
        />
      </div>
    </section>
  );
}
