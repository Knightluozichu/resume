"use client";

import { useState, useCallback } from "react";

const C = {
  bg: "var(--bg)",
  elevated: "var(--bg-elevated)",
  border: "var(--border)",
  primary: "var(--text-primary)",
  secondary: "var(--text-secondary)",
  accent: "var(--accent)",
  success: "var(--success)",
  warning: "var(--warning)",
  danger: "var(--danger)",
} as const;

type IrqlLevel = "high" | "device" | "dispatch" | "apc" | "passive";

const irqlOrder: IrqlLevel[] = [
  "high",
  "device",
  "dispatch",
  "apc",
  "passive",
];

const irqlData: Record<
  IrqlLevel,
  {
    name: string;
    value: string;
    tagline: string;
    canDo: string[];
    cannotDo: string[];
    scenario: string;
    tint: string;
  }
> = {
  high: {
    name: "HIGH_LEVEL",
    value: "31",
    tagline: "最高优先级，屏蔽一切中断",
    canDo: [
      "极少数内核临界区操作",
      "KeBugCheckEx（崩溃报告）",
    ],
    cannotDo: [
      "所有中断被屏蔽",
      "不能等待",
      "不能分配内存",
      "不能访问分页内存",
      "几乎不能调用任何 API",
    ],
    scenario:
      "普通驱动代码永远不会主动运行在此级别。仅在内核极端临界区或崩溃处理中出现。",
    tint: C.danger,
  },
  device: {
    name: "Device IRQ",
    value: "3+",
    tagline: "硬件中断，ISR 专属区域",
    canDo: [
      "执行中断服务例程 (ISR)",
      "访问非分页内存",
      "KeAcquireInterruptSpinLock",
    ],
    cannotDo: [
      "不能等待",
      "不能访问分页内存",
      "不能分配池内存",
      "不能调用大多数 API",
    ],
    scenario:
      "硬件设备触发中断时 ISR 运行于此。必须尽快完成，通常只确认中断后排队 DPC。",
    tint: C.danger,
  },
  dispatch: {
    name: "DISPATCH_LEVEL",
    value: "2",
    tagline: "调度器禁用，持有自旋锁",
    canDo: [
      "获取自旋锁 KeAcquireSpinLock",
      "访问非分页内存",
      "执行 DPC 例程",
      "ExAllocatePool2(NonPaged)",
    ],
    cannotDo: [
      "不能访问分页内存（蓝屏）",
      "不能等待 KeWaitForSingleObject",
      "不能用分页池",
      "不能文件 I/O",
    ],
    scenario:
      "DPC 例程和持有自旋锁时运行于此。线程不可被抢占，但更高级中断仍可打断。",
    tint: C.warning,
  },
  apc: {
    name: "APC_LEVEL",
    value: "1",
    tagline: "APC 执行，可访问分页内存",
    canDo: [
      "访问分页内存",
      "执行异步过程调用 (APC)",
      "ExAllocatePool2(Paged)",
    ],
    cannotDo: [
      "特殊 APC 被禁用时的等待受限",
      "部分 API 有约束",
    ],
    scenario:
      "异步过程调用执行于此。普通驱动较少显式在此级别运行，但 APC 机制在 I/O 完成中广泛使用。",
    tint: C.accent,
  },
  passive: {
    name: "PASSIVE_LEVEL",
    value: "0",
    tagline: "最宽松，可等待可分页",
    canDo: [
      "访问分页内存",
      "等待事件 / 信号量",
      "文件 I/O",
      "调用几乎所有 API",
      "ExAllocatePool2(任意池类型)",
    ],
    cannotDo: [
      "不能假设不被抢占（调度器仍可切换线程）",
    ],
    scenario:
      "DriverEntry、DriverUnload、大多数 IRP 分发例程运行于此。最常见、最宽松的运行环境。",
    tint: C.success,
  },
};

type Operation =
  | "allocPaged"
  | "allocNonPaged"
  | "spinlock"
  | "waitEvent"
  | "accessPaged"
  | "stringPrintf";

const operationData: Record<
  Operation,
  { label: string; allowed: IrqlLevel[]; note: string }
> = {
  allocPaged: {
    label: "分配分页内存",
    allowed: ["passive", "apc"],
    note: "ExAllocatePool2(POOL_FLAG_PAGED) 要求 IRQL <= APC_LEVEL",
  },
  allocNonPaged: {
    label: "分配非分页内存",
    allowed: ["passive", "apc", "dispatch"],
    note: "ExAllocatePool2(POOL_FLAG_NON_PAGED) 要求 IRQL <= DISPATCH_LEVEL",
  },
  spinlock: {
    label: "获取自旋锁",
    allowed: ["passive", "apc", "dispatch"],
    note: "KeAcquireSpinLock 要求 IRQL <= DISPATCH_LEVEL，调用后提升到 DISPATCH",
  },
  waitEvent: {
    label: "等待事件",
    allowed: ["passive"],
    note: "KeWaitForSingleObject 阻塞等待要求 PASSIVE_LEVEL",
  },
  accessPaged: {
    label: "访问分页内存",
    allowed: ["passive", "apc"],
    note: "IRQL <= APC_LEVEL 才能安全触发页错误；DISPATCH+ 访问分页内存 = 蓝屏",
  },
  stringPrintf: {
    label: "格式化字符串",
    allowed: ["passive"],
    note: "RtlStringCchPrintfW 代码可能位于分页段，要求 PASSIVE_LEVEL",
  },
};

const operationList: Operation[] = [
  "allocPaged",
  "allocNonPaged",
  "spinlock",
  "waitEvent",
  "accessPaged",
  "stringPrintf",
];

// SVG layout constants (diagram-layout-rules: viewBox >= 660px, fontSize >= 11px)
const VIEW_W = 720;
const VIEW_H = 440;
const BAR_X = 88;
const BAR_W = 552;
const BAR_H = 56;
const BAR_GAP = 8;
const BAR_START_Y = 76;

const barY = (index: number) => BAR_START_Y + index * (BAR_H + BAR_GAP);

export function Wkp03IrqlLadderLab() {
  const [selectedLevel, setSelectedLevel] = useState<IrqlLevel>("passive");
  const [selectedOp, setSelectedOp] = useState<Operation | null>(null);

  const reset = useCallback(() => {
    setSelectedLevel("passive");
    setSelectedOp(null);
  }, []);

  const toggleOp = useCallback((op: Operation) => {
    setSelectedOp((prev) => (prev === op ? null : op));
  }, []);

  const isAllowed = (level: IrqlLevel) =>
    selectedOp ? operationData[selectedOp].allowed.includes(level) : true;

  const barStroke = (level: IrqlLevel) =>
    selectedLevel === level ? C.accent : C.border;

  const barStrokeWidth = (level: IrqlLevel) =>
    selectedLevel === level ? 2 : 1;

  const barOpacity = (level: IrqlLevel) => {
    if (selectedOp && !isAllowed(level)) return 0.4;
    return 1;
  };

  return (
    <div className="not-prose overflow-hidden rounded-card border border-border bg-elevated">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <span className="text-sm font-medium" style={{ color: C.primary }}>
          IRQL 优先级阶梯与操作检查器
        </span>
        <button
          onClick={reset}
          className="rounded-control border border-border px-3 py-1 text-xs transition-colors hover:border-accent"
          style={{ color: C.secondary }}
        >
          重置
        </button>
      </div>

      <div className="p-4">
        {/* SVG Ladder */}
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          className="w-full"
          role="img"
          aria-label="IRQL 优先级阶梯图"
        >
          {/* Title */}
          <text
            x={VIEW_W / 2}
            y={36}
            textAnchor="middle"
            fontSize={16}
            fill={C.primary}
            fontWeight={600}
          >
            IRQL 优先级阶梯
          </text>

          {/* Priority direction indicator (left side) */}
          <text
            x={52}
            y={66}
            textAnchor="middle"
            fontSize={12}
            fill={C.secondary}
          >
            高
          </text>
          <line
            x1={52}
            y1={388}
            x2={52}
            y2={80}
            stroke={C.secondary}
            strokeWidth={1}
          />
          <polygon points="48,80 56,80 52,72" fill={C.secondary} />
          <text
            x={52}
            y={404}
            textAnchor="middle"
            fontSize={12}
            fill={C.secondary}
          >
            低
          </text>

          {/* IRQL Level Bars (top=high, bottom=passive) */}
          {irqlOrder.map((level, i) => {
            const y = barY(i);
            const data = irqlData[level];
            const allowed = isAllowed(level);
            return (
              <g
                key={level}
                onClick={() => setSelectedLevel(level)}
                className="cursor-pointer"
                opacity={barOpacity(level)}
              >
                <rect
                  x={BAR_X}
                  y={y}
                  width={BAR_W}
                  height={BAR_H}
                  rx={8}
                  fill={data.tint}
                  fillOpacity={0.08}
                  stroke={barStroke(level)}
                  strokeWidth={barStrokeWidth(level)}
                />
                {/* IRQL Name */}
                <text
                  x={BAR_X + 20}
                  y={y + 24}
                  fontSize={14}
                  fill={C.primary}
                  fontWeight={500}
                >
                  {data.name}
                </text>
                {/* Tagline */}
                <text
                  x={BAR_X + 20}
                  y={y + 42}
                  fontSize={12}
                  fill={C.secondary}
                >
                  {data.tagline}
                </text>
                {/* Numeric value */}
                <text
                  x={BAR_X + BAR_W - 20}
                  y={y + 34}
                  textAnchor="end"
                  fontSize={18}
                  fill={C.accent}
                  fontWeight={600}
                >
                  {data.value}
                </text>
                {/* Operation allowed/disallowed badge */}
                {selectedOp && (
                  <text
                    x={BAR_X + BAR_W - 56}
                    y={y + 34}
                    textAnchor="middle"
                    fontSize={14}
                    fill={allowed ? C.success : C.danger}
                    fontWeight={600}
                  >
                    {allowed ? "\u2713" : "\u2717"}
                  </text>
                )}
              </g>
            );
          })}
        </svg>

        {/* Operation Checker */}
        <div className="mt-4">
          <p
            className="mb-2 text-xs font-medium"
            style={{ color: C.secondary }}
          >
            操作检查器：点击操作，查看哪些 IRQL 级别允许执行
          </p>
          <div className="flex flex-wrap gap-2">
            {operationList.map((op) => (
              <button
                key={op}
                onClick={() => toggleOp(op)}
                className="rounded-control border px-3 py-1.5 text-xs transition-colors"
                style={{
                  borderColor: selectedOp === op ? C.accent : C.border,
                  color: selectedOp === op ? C.accent : C.secondary,
                  background:
                    selectedOp === op ? "var(--accent-glow)" : "transparent",
                }}
              >
                {operationData[op].label}
              </button>
            ))}
          </div>
          {selectedOp && (
            <div
              className="mt-3 flex flex-wrap items-center gap-4 rounded-control border border-border px-3 py-2 text-xs"
              style={{ background: C.bg }}
            >
              <span style={{ color: C.success }}>
                {"\u2713"} 允许
              </span>
              <span style={{ color: C.danger }}>
                {"\u2717"} 禁止
              </span>
              <span style={{ color: C.primary }}>
                {operationData[selectedOp].note}
              </span>
            </div>
          )}
        </div>

        {/* Detail Panel */}
        <div
          className="mt-4 rounded-control border border-border p-4"
          style={{ background: C.bg }}
        >
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <span
              className="inline-block h-2 w-2 rounded-full"
              style={{ background: C.accent }}
            />
            <span
              className="text-sm font-medium"
              style={{ color: C.primary }}
            >
              {irqlData[selectedLevel].name} (IRQL ={" "}
              {irqlData[selectedLevel].value})
            </span>
            <span className="text-xs" style={{ color: C.secondary }}>
              {irqlData[selectedLevel].tagline}
            </span>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <p
                className="mb-1.5 text-xs font-semibold"
                style={{ color: C.success }}
              >
                能做什么
              </p>
              <ul className="space-y-1">
                {irqlData[selectedLevel].canDo.map((item, i) => (
                  <li
                    key={i}
                    className="text-xs"
                    style={{ color: C.secondary }}
                  >
                    {"\u00B7"} {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p
                className="mb-1.5 text-xs font-semibold"
                style={{ color: C.danger }}
              >
                不能做什么
              </p>
              <ul className="space-y-1">
                {irqlData[selectedLevel].cannotDo.map((item, i) => (
                  <li
                    key={i}
                    className="text-xs"
                    style={{ color: C.secondary }}
                  >
                    {"\u00B7"} {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="mt-3 text-xs" style={{ color: C.secondary }}>
            <span style={{ color: C.accent }}>典型场景：</span>
            {irqlData[selectedLevel].scenario}
          </p>
        </div>
      </div>
    </div>
  );
}
