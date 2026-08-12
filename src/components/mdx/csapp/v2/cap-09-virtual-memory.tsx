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

const VIEW_W = 900;
const VIEW_H = 520;
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

type Stage = "split" | "tlb" | "walk" | "page" | "heap" | "protect";
type Sample = "hit" | "fault" | "fragment";

const CONCEPTS = [
  "第9章 虚拟内存",
  "9.1 物理和虚拟寻址",
  "9.2 地址空间",
  "9.3 虚拟内存作为缓存的工具",
  "9.3.1 DRAM缓存的组织结构",
  "9.3.2 页表",
  "9.3.3 页命中",
  "9.3.4 缺页",
  "9.3.5 分配页面",
  "9.3.6 又是局部性救了我们",
  "9.4 虚拟内存作为内存管理的工具",
  "9.5 虚拟内存作为内存保护的工具",
  "9.6 地址翻译",
  "9.6.1 结合高速缓存和虚拟内存",
  "9.6.2 利用TLB加速地址翻译",
  "9.6.3 多级页表",
  "9.6.4 综合：端到端的地址翻译",
  "9.7 案例研究：Intel Core i7/Linux内存系统",
  "9.7.1 Core i7地址翻译",
  "9.7.2 Linux虚拟内存系统",
  "9.8 内存映射",
  "9.8.1 再看共享对象",
  "9.8.2 再看fork函数",
  "9.8.3 再看execve函数",
  "9.8.4 使用mmap函数的用户级内存映射",
  "9.9 动态内存分配",
  "9.9.1 malloc和free函数",
  "9.9.2 为什么要使用动态内存分配",
  "9.9.3 分配器的要求和目标",
  "9.9.4 碎片",
  "9.9.5 实现问题",
  "9.9.6 隐式空闲链表",
  "9.9.7 放置已分配的块",
  "9.9.8 分割空闲块",
  "9.9.9 获取额外的堆内存",
  "9.9.10 合并空闲块",
  "9.9.11 带边界标记的合并",
  "9.9.12 综合：实现一个简单的分配器",
  "9.9.13 显式空闲链表",
  "9.9.14 分离的空闲链表",
  "9.10 垃圾收集",
  "9.10.1 垃圾收集器的基本知识",
  "9.10.2 Mark&Sweep垃圾收集器",
  "9.10.3 C程序的保守Mark&Sweep",
  "9.11 C程序中常见的与内存有关的错误",
  "9.11.1 间接引用坏指针",
  "9.11.2 读未初始化的内存",
  "9.11.3 允许栈缓冲区溢出",
  "9.11.4 假设指针和它们指向的对象是相同大小的",
  "9.11.5 造成错位错误",
  "9.11.6 引用指针，而不是它所指向的对象",
  "9.11.7 误解指针运算",
  "9.11.8 引用不存在的变量",
  "9.11.9 引用空闲堆块中的数据",
  "9.11.10 引起内存泄漏",
  "9.12 小结",
] as const;

const STAGES: readonly {
  id: Stage;
  label: string;
  focus: string;
  evidence: string;
}[] = [
  {
    id: "split",
    label: "拆分地址",
    focus: "VPN + offset",
    evidence: "虚拟地址先按页大小拆成虚拟页号与页内偏移。",
  },
  {
    id: "tlb",
    label: "查询 TLB",
    focus: "hit / miss",
    evidence: "TLB 命中可跳过页表遍历；未命中继续查表。",
  },
  {
    id: "walk",
    label: "遍历页表",
    focus: "PTE + permission",
    evidence: "页表项提供物理页号、存在位和读写执行权限。",
  },
  {
    id: "page",
    label: "处理页命中",
    focus: "DRAM / fault",
    evidence: "页命中直接形成物理地址，缺页则进入受控装入路径。",
  },
  {
    id: "heap",
    label: "管理堆块",
    focus: "split / coalesce",
    evidence: "分配器维护边界、对齐、空闲结构与不可重叠性。",
  },
  {
    id: "protect",
    label: "执行保护",
    focus: "map / guard",
    evidence: "映射权限与对象生命周期共同决定访问是否可接受。",
  },
] as const;

const SAMPLES: readonly {
  id: Sample;
  label: string;
  result: string;
  detail: string;
}[] = [
  {
    id: "hit",
    label: "页命中",
    result: "翻译可重放",
    detail: "TLB 或页表项有效，权限检查通过，物理页立即可用。",
  },
  {
    id: "fault",
    label: "缺页",
    result: "受控缺页",
    detail: "存在位关闭，内核装入页面后更新页表并重新执行访问。",
  },
  {
    id: "fragment",
    label: "碎片",
    result: "堆布局退化",
    detail: "空闲总量足够但块不连续，分配器需要分割或合并。",
  },
] as const;

const NODES: readonly {
  id: string;
  label: string;
  artifact: string;
  x: number;
  y: number;
}[] = [
  { id: "va", label: "虚拟地址", artifact: "VPN | offset", x: 28, y: 132 },
  { id: "tlb", label: "TLB", artifact: "VPN → PPN", x: 182, y: 132 },
  { id: "pt", label: "页表", artifact: "PTE / flags", x: 336, y: 132 },
  { id: "dram", label: "物理页", artifact: "PPN | offset", x: 490, y: 132 },
  { id: "heap", label: "堆块", artifact: "size / free", x: 644, y: 132 },
  { id: "guard", label: "保护边界", artifact: "R W X", x: 798, y: 132 },
] as const;

const STAGE_STEPS: readonly TeachingStep[] = STAGES.map((stage) => ({
  label: stage.id,
  caption: stage.evidence,
}));
const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STAGE_STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

function ToggleButton({
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

function MemoryNode({
  node,
  active,
  warning,
}: {
  node: (typeof NODES)[number];
  active: boolean;
  warning: boolean;
}) {
  const stroke = warning
    ? COLORS.danger
    : active
      ? COLORS.accent
      : COLORS.border;
  const dot = warning
    ? COLORS.danger
    : active
      ? COLORS.accent
      : COLORS.secondary;
  return (
    <g>
      <rect
        x={node.x}
        y={node.y}
        width="124"
        height="86"
        rx="12"
        fill={COLORS.elevated}
        stroke={stroke}
        strokeWidth={active || warning ? 2.5 : 1.2}
      />
      <circle cx={node.x + 20} cy={node.y + 22} r="6" fill={dot} />
      <text
        x={node.x + 34}
        y={node.y + 27}
        fontSize="13"
        fontWeight="700"
        fill={COLORS.primary}
      >
        {node.label}
      </text>
      <text
        x={node.x + 14}
        y={node.y + 57}
        fontSize="12"
        fill={COLORS.secondary}
      >
        {node.artifact}
      </text>
    </g>
  );
}

/** 第 9 章专属实验：把地址翻译、缺页、堆布局与保护边界串成可重放轨迹。 */
export function Cap09VirtualMemoryLab() {
  const [stageId, setStageId] = useState<Stage>("split");
  const [sampleId, setSampleId] = useState<Sample>("hit");
  const timelineRefs = useRef<Record<string, SVGGElement | null>>({});
  const stage = useMemo(
    () => STAGES.find((item) => item.id === stageId) ?? STAGES[0],
    [stageId],
  );
  const sample = useMemo(
    () => SAMPLES.find((item) => item.id === sampleId) ?? SAMPLES[0],
    [sampleId],
  );
  const timeline = useTeachingTimeline({
    steps: STAGE_STEPS,
    build: (tl) => {
      STAGE_STEPS.forEach((step, index) => {
        const node = timelineRefs.current[step.label];
        if (!node) return;
        tl.add(
          node,
          {
            opacity: [0.25, 1],
            scale: [0.95, 1],
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
    setStageId("split");
    setSampleId("hit");
    timeline.goToStep(0);
  }

  const stageIndex = STAGES.findIndex((item) => item.id === stageId);
  const sampleIsFault = sampleId !== "hit";

  return (
    <section
      aria-label={`第 9 章虚拟内存专属地址翻译与堆布局实验；${CONCEPTS.join("；")}`}
      className="not-prose my-8 min-w-0 overflow-hidden rounded-card border border-border bg-elevated"
      data-unit-id="cap-unit-09"
      data-visual-kind="cap-09-virtual-memory-translation-heap"
    >
      <header className="flex flex-wrap items-start justify-between gap-4 border-b border-border px-5 py-4 sm:px-6">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold tracking-wide text-accent">
            专属 Cap09VirtualMemoryLab · 翻译与堆布局台
          </p>
          <h3 className="mt-1 text-lg font-semibold text-primary">
            从虚拟页号追到物理页、堆块与保护边界
          </h3>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
            选择翻译阶段和故障样本，逐帧查看页表状态、缺页路径、堆布局与权限证据。
          </p>
        </div>
        <div className="rounded-control border border-border px-3 py-2 text-right text-xs text-secondary">
          <div className="font-medium text-primary">当前阶段</div>
          <div>{stage.label}</div>
          <div>{stage.focus}</div>
        </div>
      </header>

      <div className="space-y-4 px-5 py-4 sm:px-6">
        <div className="flex flex-wrap gap-2" aria-label="虚拟内存阶段">
          {STAGES.map((item) => (
            <ToggleButton
              key={item.id}
              active={item.id === stageId}
              onClick={() => setStageId(item.id)}
            >
              {item.label}
            </ToggleButton>
          ))}
        </div>
        <div className="flex flex-wrap gap-2" aria-label="地址与堆样本">
          {SAMPLES.map((item) => (
            <ToggleButton
              key={item.id}
              active={item.id === sampleId}
              onClick={() => setSampleId(item.id)}
            >
              {item.label}
            </ToggleButton>
          ))}
        </div>

        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label={`${stage.label}阶段的虚拟内存轨迹：${sample.result}`}
          className="h-auto w-full"
        >
          <rect
            x="10"
            y="18"
            width="880"
            height="474"
            rx="16"
            fill={COLORS.elevated}
            stroke={COLORS.border}
          />
          <text
            x="28"
            y="52"
            fontSize="15"
            fontWeight="700"
            fill={COLORS.primary}
          >
            VA → TLB → page table → physical page → heap → guard
          </text>
          <text x="28" y="78" fontSize="12" fill={COLORS.secondary}>
            {sample.detail}
          </text>
          {NODES.slice(0, -1).map((node, index) => {
            const next = NODES[index + 1];
            const edgeActive = stageIndex >= index;
            const edgeWarning =
              (sampleId === "fault" && index === 2) ||
              (sampleId === "fragment" && index === 4);
            return (
              <g key={`${node.id}-${next.id}`}>
                <line
                  x1={node.x + 124}
                  y1={node.y + 43}
                  x2={next.x}
                  y2={next.y + 43}
                  stroke={
                    edgeWarning
                      ? COLORS.danger
                      : edgeActive
                        ? COLORS.accent
                        : COLORS.border
                  }
                  strokeWidth={edgeWarning || edgeActive ? 3 : 1.2}
                  strokeDasharray={edgeWarning ? "6 5" : undefined}
                />
                <text
                  x={(node.x + 124 + next.x) / 2 - 18}
                  y={node.y + 34}
                  fontSize="11"
                  fill={edgeWarning ? COLORS.danger : COLORS.secondary}
                >
                  {edgeWarning ? "边界" : edgeActive ? "已确认" : "待确认"}
                </text>
              </g>
            );
          })}
          {NODES.map((node, index) => (
            <MemoryNode
              key={node.id}
              node={node}
              active={stageIndex >= index}
              warning={
                (sampleId === "fault" && node.id === "pt") ||
                (sampleId === "fragment" && node.id === "heap")
              }
            />
          ))}
          <g
            ref={(node) => {
              timelineRefs.current.split = node;
            }}
            aria-hidden="true"
            opacity="0"
            pointerEvents="none"
          >
            <rect
              x="30"
              y="252"
              width="146"
              height="72"
              rx="10"
              fill={COLORS.accent}
              fillOpacity="0.12"
              stroke={COLORS.accent}
            />
          </g>
          <g
            ref={(node) => {
              timelineRefs.current.tlb = node;
            }}
            aria-hidden="true"
            opacity="0"
            pointerEvents="none"
          >
            <path d="M214 288h112" stroke={COLORS.accent} strokeWidth="4" />
          </g>
          <g
            ref={(node) => {
              timelineRefs.current.walk = node;
            }}
            aria-hidden="true"
            opacity="0"
            pointerEvents="none"
          >
            <circle
              cx="414"
              cy="288"
              r="27"
              fill={COLORS.accent}
              fillOpacity="0.16"
              stroke={COLORS.accent}
              strokeWidth="2"
            />
          </g>
          <g
            ref={(node) => {
              timelineRefs.current.page = node;
            }}
            aria-hidden="true"
            opacity="0"
            pointerEvents="none"
          >
            <path
              d="M470 288h116v-38"
              fill="none"
              stroke={COLORS.warning}
              strokeWidth="4"
            />
          </g>
          <g
            ref={(node) => {
              timelineRefs.current.heap = node;
            }}
            aria-hidden="true"
            opacity="0"
            pointerEvents="none"
          >
            <rect
              x="620"
              y="252"
              width="174"
              height="72"
              rx="10"
              fill={COLORS.warning}
              fillOpacity="0.1"
              stroke={COLORS.warning}
            />
          </g>
          <g
            ref={(node) => {
              timelineRefs.current.protect = node;
            }}
            aria-hidden="true"
            opacity="0"
            pointerEvents="none"
          >
            <path
              d="M580 392h118"
              fill="none"
              stroke={COLORS.success}
              strokeWidth="4"
            />
          </g>
          <text
            x="32"
            y="428"
            fontSize="13"
            fontWeight="700"
            fill={COLORS.primary}
          >
            翻译与生命周期快照
          </text>
          <text x="32" y="452" fontSize="12" fill={COLORS.secondary}>
            va=0x00007f20 · vpn=0x7f2 · offset=0x20 · ppn=0x1a4 · flags=rw
          </text>
          <text
            x="32"
            y="478"
            fontSize="12"
            fill={sampleIsFault ? COLORS.danger : COLORS.success}
          >
            {sample.result} · 当前阶段：{stage.label}
          </text>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="动画默认暂停；逐步查看地址拆分、TLB、页表、页命中、堆块和保护边界。"
          reset={{
            label: "重置实验",
            ariaLabel: "重置虚拟内存实验",
            onClick: reset,
          }}
        />
      </div>
    </section>
  );
}
