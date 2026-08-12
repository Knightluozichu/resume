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

type View = "header" | "sections" | "symbols" | "relocations";
type Sample = "global" | "bss" | "external";
type Fault = "none" | "binding" | "relocation";

const VIEWS: readonly { id: View; label: string; detail: string }[] = [
  {
    id: "header",
    label: "ELF 头",
    detail: "确认 ET_REL、EM_386 和对象文件的表入口。",
  },
  {
    id: "sections",
    label: "节布局",
    detail: "比较 .text、.data、.bss 与重定位节的范围。",
  },
  {
    id: "symbols",
    label: "符号表",
    detail: "把全局定义、未定义引用和节索引连回源码。",
  },
  {
    id: "relocations",
    label: "重定位",
    detail: "检查节偏移、类型、符号名与等待链接的修补信息。",
  },
] as const;

const SAMPLES: readonly {
  id: Sample;
  label: string;
  source: string;
  section: string;
  symbol: string;
  relocation: string;
}[] = [
  {
    id: "global",
    label: "已初始化全局",
    source: "int counter = 7;",
    section: ".data",
    symbol: "GLOBAL counter",
    relocation: "none",
  },
  {
    id: "bss",
    label: "未初始化全局",
    source: "int cache;",
    section: ".bss",
    symbol: "GLOBAL cache",
    relocation: "size / align",
  },
  {
    id: "external",
    label: "外部引用",
    source: "extern int shared;",
    section: ".text",
    symbol: "UND shared",
    relocation: "R_386_32",
  },
] as const;

const STEPS: readonly TeachingStep[] = [
  { label: "source", caption: "固定源码、工具链和 IA-32 目标。" },
  { label: "header", caption: "确认 ELF 类型和机器字段。" },
  { label: "symbols", caption: "追踪名字、绑定和节索引。" },
  { label: "relocate", caption: "保存未决引用的修补合同。" },
  { label: "verify", caption: "交叉核对并清理重建。" },
] as const;

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

const CONCEPTS = [
  "第4部分 链接和加载",
  "第18章 生成目标文件",
  "18.1 ELF文件的结构",
  "18.2 全局变量及其在ELF文件中的表示",
  "18.3 编译全局变量",
  "18.4 生成目标文件",
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

function HeaderView({ fault, sample }: { fault: Fault; sample: Sample }) {
  const selected = SAMPLES.find((item) => item.id === sample) ?? SAMPLES[0];
  const broken = fault === "binding";
  const rows = [
    ["Type", "ET_REL", "等待链接"],
    ["Machine", "EM_386", "IA-32"],
    ["Sections", broken ? "stale index" : "5 entries", "header → table"],
    ["Object", selected.source, selected.section],
  ] as const;
  return (
    <g>
      <text x="28" y="32" fontSize="16" fontWeight="700" fill={COLORS.primary}>
        ELF 头：先确认对象的身份边界
      </text>
      <text x="28" y="59" fontSize="13" fill={COLORS.secondary}>
        {selected.label} · readelf -h -S sample.o ·
        文件类型和机器字段先于地址结论。
      </text>
      {rows.map(([field, value, meaning], index) => {
        const y = 92 + index * 62;
        const warning = broken && field === "Sections";
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
              {warning ? "index does not match" : value}
            </text>
            <text
              x="510"
              y={y + 28}
              fontSize="13"
              fill={warning ? COLORS.warning : COLORS.accent}
            >
              {meaning}
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
          ? "头信息异常：先恢复节表索引，再解释符号与重定位"
          : "头信息通过：这是等待链接的 IA-32 ET_REL 对象"}
      </text>
    </g>
  );
}

function SectionsView({ fault, sample }: { fault: Fault; sample: Sample }) {
  const selected = SAMPLES.find((item) => item.id === sample) ?? SAMPLES[0];
  const broken = fault === "relocation";
  const rows = [
    [".text", "code", "AX", "32 bytes"],
    [
      selected.section,
      selected.id === "bss" ? "zero-fill" : "write",
      "WA",
      "4 bytes",
    ],
    [".rel.text", "relocations", "I", broken ? "target mismatch" : "1 record"],
    [".symtab", "symbols", "I", "3 entries"],
  ] as const;
  return (
    <g>
      <text x="28" y="32" fontSize="16" fontWeight="700" fill={COLORS.primary}>
        节布局：内容和待修补信息各有位置
      </text>
      <text x="28" y="59" fontSize="13" fill={COLORS.secondary}>
        {selected.source} · readelf -S sample.o ·
        section、旗标、范围与源码用途相互解释。
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
        用途
      </text>
      <text
        x="400"
        y="118"
        fontSize="13"
        fontWeight="700"
        fill={COLORS.primary}
      >
        旗标
      </text>
      <text
        x="530"
        y="118"
        fontSize="13"
        fontWeight="700"
        fill={COLORS.primary}
      >
        范围/信号
      </text>
      {rows.map(([name, purpose, flags, size], index) => {
        const y = 148 + index * 52;
        const warning = broken && name === ".rel.text";
        return (
          <g key={name}>
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
              fill={warning ? COLORS.warning : COLORS.primary}
            >
              {name}
            </text>
            <text
              x="220"
              y={y + 24}
              fontSize="13"
              fill={warning ? COLORS.warning : COLORS.secondary}
            >
              {purpose}
            </text>
            <text x="400" y={y + 24} fontSize="13" fill={COLORS.secondary}>
              {flags}
            </text>
            <text
              x="530"
              y={y + 24}
              fontSize="13"
              fill={warning ? COLORS.warning : COLORS.accent}
            >
              {size}
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
          ? "重定位节的目标不一致：保留偏移与符号名，回到生成阶段检查。"
          : "节边界通过：代码、全局数据和修补记录可以分别定位。"}
      </text>
    </g>
  );
}

function SymbolsView({ fault, sample }: { fault: Fault; sample: Sample }) {
  const selected = SAMPLES.find((item) => item.id === sample) ?? SAMPLES[0];
  const broken = fault === "binding";
  const rows = [
    [
      selected.symbol.split(" ")[1] ?? "object",
      broken ? "LOCAL?" : selected.symbol.split(" ")[0],
      selected.section,
      "0x0000",
    ],
    ["helper", "GLOBAL", ".text", "0x0000"],
    ["shared", "UND", "UND", selected.id === "external" ? "reloc" : "unused"],
  ] as const;
  return (
    <g>
      <text x="28" y="32" fontSize="16" fontWeight="700" fill={COLORS.primary}>
        符号表：名字、绑定与节索引要同时成立
      </text>
      <text x="28" y="59" fontSize="13" fill={COLORS.secondary}>
        {selected.source} · nm -n sample.o · 名字出现不代表地址已经完成解析。
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
        名字
      </text>
      <text
        x="220"
        y="118"
        fontSize="13"
        fontWeight="700"
        fill={COLORS.primary}
      >
        绑定
      </text>
      <text
        x="360"
        y="118"
        fontSize="13"
        fontWeight="700"
        fill={COLORS.primary}
      >
        所在节
      </text>
      <text
        x="540"
        y="118"
        fontSize="13"
        fontWeight="700"
        fill={COLORS.primary}
      >
        值/状态
      </text>
      {rows.map(([name, binding, section, value], index) => {
        const y = 148 + index * 52;
        const warning = broken && index === 0;
        return (
          <g key={`${name}-${index}`}>
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
              fill={warning ? COLORS.warning : COLORS.primary}
            >
              {name}
            </text>
            <text
              x="220"
              y={y + 24}
              fontSize="13"
              fill={warning ? COLORS.warning : COLORS.secondary}
            >
              {binding}
            </text>
            <text x="360" y={y + 24} fontSize="13" fill={COLORS.secondary}>
              {section}
            </text>
            <text
              x="540"
              y={y + 24}
              fontSize="13"
              fill={warning ? COLORS.warning : COLORS.accent}
            >
              {value}
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
          ? "绑定异常：符号的定义/引用身份与节索引不一致"
          : "符号通过：定义、引用、节索引和值能回指到源码对象"}
      </text>
    </g>
  );
}

function RelocationsView({ fault, sample }: { fault: Fault; sample: Sample }) {
  const selected = SAMPLES.find((item) => item.id === sample) ?? SAMPLES[0];
  const broken = fault === "relocation";
  const rows = [
    [
      ".text+0x04",
      selected.id === "external" ? "shared" : "counter",
      selected.relocation,
      broken ? "wrong section" : "pending",
    ],
    [
      ".data+0x00",
      selected.id === "global" ? "counter" : "—",
      "none",
      "defined",
    ],
    [".rel.text", "target section", "offset", broken ? "reject" : "preserved"],
  ] as const;
  return (
    <g>
      <text x="28" y="32" fontSize="16" fontWeight="700" fill={COLORS.primary}>
        重定位：保存链接器必须执行的修补合同
      </text>
      <text x="28" y="59" fontSize="13" fill={COLORS.secondary}>
        {selected.source} · readelf -r sample.o ·
        节偏移、符号、类型和状态共同描述未决地址。
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
        偏移
      </text>
      <text
        x="220"
        y="118"
        fontSize="13"
        fontWeight="700"
        fill={COLORS.primary}
      >
        符号
      </text>
      <text
        x="400"
        y="118"
        fontSize="13"
        fontWeight="700"
        fill={COLORS.primary}
      >
        类型
      </text>
      <text
        x="540"
        y="118"
        fontSize="13"
        fontWeight="700"
        fill={COLORS.primary}
      >
        链接状态
      </text>
      {rows.map(([offset, symbol, type, status], index) => {
        const y = 148 + index * 52;
        const warning = broken && index === 0;
        return (
          <g key={`${offset}-${index}`}>
            <rect
              x="28"
              y={y}
              width="704"
              height="36"
              rx="8"
              fill={warning ? COLORS.danger : COLORS.elevated}
              fillOpacity={warning ? 0.14 : 1}
              stroke={warning ? COLORS.danger : COLORS.border}
              strokeWidth="1.5"
            />
            <text
              x="48"
              y={y + 24}
              fontSize="13"
              fontWeight="700"
              fill={warning ? COLORS.danger : COLORS.primary}
            >
              {offset}
            </text>
            <text
              x="220"
              y={y + 24}
              fontSize="13"
              fill={warning ? COLORS.danger : COLORS.secondary}
            >
              {symbol}
            </text>
            <text
              x="400"
              y={y + 24}
              fontSize="13"
              fill={warning ? COLORS.danger : COLORS.secondary}
            >
              {type}
            </text>
            <text
              x="540"
              y={y + 24}
              fontSize="13"
              fill={warning ? COLORS.danger : COLORS.accent}
            >
              {status}
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
          ? "重定位失败：目标节不匹配，停止链接并保存最小对象证据"
          : "重定位通过：未决地址仍可由链接器按合同修补"}
      </text>
    </g>
  );
}

/** 第18章专属实验：回放 ELF 头、节、符号和重定位的对象文件生成链。 */
export function Crc18ObjectFilesLab() {
  const [view, setView] = useState<View>("header");
  const [sample, setSample] = useState<Sample>("global");
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
    setView("header");
    setSample("global");
    setFault("none");
    timeline.goToStep(0);
  }

  return (
    <section
      aria-label={`第18章 生成目标文件专属 ELF 可重定位对象实验；${CONCEPTS.join("；")}`}
      className="not-prose my-8 min-w-0 overflow-hidden rounded-card border border-border bg-elevated"
      data-unit-id="crc-unit-18"
      data-visual-kind="crc-object-file-elf-relocation-replay"
    >
      <header className="flex flex-wrap items-start justify-between gap-4 border-b border-border px-5 py-4 sm:px-6">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold tracking-wide text-accent">
            专属 Crc18ObjectFilesLab · ELF 可重定位对象台
          </p>
          <h3 className="mt-1 text-base font-semibold text-primary">
            让每个源码对象都能回到一个 ELF 字段
          </h3>
          <p className="mt-1 max-w-3xl text-sm leading-6 text-secondary">
            先预测：`extern` 全局变量的地址还没确定时，哪个字段必须留给链接器？
          </p>
        </div>
      </header>
      <div className="min-w-0 space-y-4 p-5 sm:p-6">
        <div className="flex flex-wrap gap-2" aria-label="选择对象文件实验视角">
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
        <div className="flex flex-wrap gap-2" aria-label="选择全局对象样本">
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
        <div className="flex flex-wrap gap-2" aria-label="选择对象文件故障模式">
          <ViewButton
            active={fault === "none"}
            onClick={() => setFault("none")}
          >
            正常字段
          </ViewButton>
          <ViewButton
            active={fault === "binding"}
            onClick={() => setFault("binding")}
          >
            绑定/索引错误
          </ViewButton>
          <ViewButton
            active={fault === "relocation"}
            onClick={() => setFault("relocation")}
          >
            重定位错误
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
                id="crc-object-file-arrow"
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
            {view === "header" ? (
              <HeaderView fault={fault} sample={sample} />
            ) : view === "sections" ? (
              <SectionsView fault={fault} sample={sample} />
            ) : view === "symbols" ? (
              <SymbolsView fault={fault} sample={sample} />
            ) : (
              <RelocationsView fault={fault} sample={sample} />
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
          caption="单步查看 source、header、symbols、relocate 和 verify；重置后用同一对象样本重放，确认三组 GNU 工具仍指向同一个 ELF 合同。"
          reset={{
            label: "重置对象文件实验",
            ariaLabel: "重置生成目标文件专属实验",
            onClick: reset,
          }}
        />
      </div>
    </section>
  );
}
