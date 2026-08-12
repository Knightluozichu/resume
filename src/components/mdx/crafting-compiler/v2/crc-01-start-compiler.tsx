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

type View = "outline" | "pipeline" | "replay";
type Sample = "normal" | "boundary" | "syntax";
type Fault = "none" | "stale" | "abi";

const VIEWS: readonly { id: View; label: string; detail: string }[] = [
  {
    id: "outline",
    label: "目录地图",
    detail: "把四个正式节点变成输入、产物与验收动作。",
  },
  {
    id: "pipeline",
    label: "阶段管线",
    detail: "从 C♭ 源文件推进到进程，观察每次交接。",
  },
  {
    id: "replay",
    label: "回放验收",
    detail: "注入旧产物或目标 ABI 差异，决定何时清理重建。",
  },
];

const SAMPLES: readonly {
  id: Sample;
  label: string;
  detail: string;
}[] = [
  {
    id: "normal",
    label: "正常返回",
    detail: "return 7：验证从入口到退出码的主路径。",
  },
  {
    id: "boundary",
    label: "边界返回",
    detail: "return 0：检查常量生成与运行约定。",
  },
  {
    id: "syntax",
    label: "少分号",
    detail: "分析失败：检查源位置与下游是否停止。",
  },
];

const STEPS: readonly TeachingStep[] = [
  {
    label: "outline",
    caption: "先用本书概要建立路线，再为每个正式节点写下验收动作。",
  },
  {
    label: "analyze",
    caption: "检查输入、token、语法和源位置，确认分析阶段交付有效结构。",
  },
  {
    label: "emit",
    caption: "观察汇编与目标文件，核对目标 ABI、符号和重定位。",
  },
  {
    label: "link",
    caption: "用汇编器和链接器生成可装载程序，保留完整命令与诊断。",
  },
  {
    label: "run",
    caption: "运行并记录退出码；若结果异常，回到最早差异而不是只修末端。",
  },
] as const;

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

const OUTLINE_NODES = [
  {
    label: "第1章 开始制作编译器",
    detail: "建立最小探针",
    color: COLORS.primary,
  },
  { label: "1.1 本书的概要", detail: "画出依赖路线", color: COLORS.accent },
  { label: "1.2 编译过程", detail: "拆开阶段交接", color: COLORS.warning },
  {
    label: "1.3 使用C♭编译器进行编译",
    detail: "回放命令与产物",
    color: COLORS.success,
  },
] as const;

const PIPELINE_NODES = [
  { label: "C♭", detail: "源文件", color: COLORS.primary },
  { label: "分析", detail: "token / AST", color: COLORS.accent },
  { label: "汇编", detail: "IA-32 文本", color: COLORS.warning },
  { label: "目标", detail: "ELF / 符号", color: COLORS.success },
  { label: "进程", detail: "退出码", color: COLORS.success },
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
  active,
  label,
  refCallback,
  status,
  x,
  y,
}: {
  active: boolean;
  label: string;
  refCallback?: (element: SVGGElement | null) => void;
  status: string;
  x: number;
  y: number;
}) {
  return (
    <g ref={refCallback} opacity={active ? 1 : 0.36}>
      <rect
        x={x}
        y={y}
        width="132"
        height="80"
        rx="12"
        fill={COLORS.elevated}
        stroke={active ? COLORS.accent : COLORS.border}
        strokeWidth="2"
      />
      <text
        x={x + 16}
        y={y + 27}
        fontSize="15"
        fontWeight="700"
        fill={COLORS.primary}
      >
        {label}
      </text>
      <text x={x + 16} y={y + 56} fontSize="13" fill={COLORS.secondary}>
        {status}
      </text>
    </g>
  );
}

function OutlineView({ activeStep }: { activeStep: number }) {
  return (
    <g>
      <text x="28" y="31" fontSize="16" fontWeight="700" fill={COLORS.primary}>
        目录地图：四个节点，四份可交付证据
      </text>
      <text x="28" y="58" fontSize="13" fill={COLORS.secondary}>
        目录不是打卡列表；每一站都要留下下一站能消费的输入或产物。
      </text>
      {OUTLINE_NODES.map((node, index) => {
        const x = 28 + (index % 2) * 360;
        const y = 94 + Math.floor(index / 2) * 108;
        const active = activeStep >= Math.min(index, 4);
        return (
          <g key={node.label}>
            <rect
              x={x}
              y={y}
              width="324"
              height="80"
              rx="12"
              fill={node.color}
              fillOpacity={active ? 0.14 : 0.04}
              stroke={active ? node.color : COLORS.border}
              strokeWidth={active ? 2.5 : 1.5}
            />
            <circle
              cx={x + 24}
              cy={y + 28}
              r="8"
              fill={active ? node.color : COLORS.border}
            />
            <text
              x={x + 46}
              y={y + 31}
              fontSize="14"
              fontWeight="700"
              fill={COLORS.primary}
            >
              {node.label}
            </text>
            <text x={x + 46} y={y + 58} fontSize="13" fill={COLORS.secondary}>
              {node.detail}
            </text>
          </g>
        );
      })}
      <text x="28" y="356" fontSize="13" fill={COLORS.accent}>
        先预测：缺少目标 ABI 时，哪一步的证据最先变得不可比较？
      </text>
    </g>
  );
}

function PipelineView({
  activeStep,
  fault,
  sample,
}: {
  activeStep: number;
  fault: Fault;
  sample: Sample;
}) {
  const selected = SAMPLES.find((item) => item.id === sample) ?? SAMPLES[0];
  const failure =
    sample === "syntax"
      ? "分析阶段停止：保留源位置，不生成下游伪产物"
      : fault === "stale"
        ? "旧目标文件混入：先清理构建目录"
        : fault === "abi"
          ? "目标 ABI 不一致：回到工具坐标"
          : `${selected.label}：每一站交出可观察工件`;
  return (
    <g>
      <text x="28" y="31" fontSize="16" fontWeight="700" fill={COLORS.primary}>
        阶段管线：源文件如何走到进程
      </text>
      <text x="28" y="58" fontSize="13" fill={COLORS.secondary}>
        高亮阶段表示当前可以验收的交接点；故障时停在最早差异。
      </text>
      {PIPELINE_NODES.map((node, index) => {
        const x = 28 + index * 144;
        const active = activeStep >= Math.min(index, 4);
        return (
          <g key={node.label}>
            <rect
              x={x}
              y="112"
              width="116"
              height="84"
              rx="12"
              fill={node.color}
              fillOpacity={active ? 0.14 : 0.04}
              stroke={active ? node.color : COLORS.border}
              strokeWidth={active ? 2.5 : 1.5}
            />
            <text
              x={x + 58}
              y="147"
              textAnchor="middle"
              fontSize="15"
              fontWeight="700"
              fill={active ? node.color : COLORS.primary}
            >
              {node.label}
            </text>
            <text
              x={x + 58}
              y="174"
              textAnchor="middle"
              fontSize="11"
              fill={COLORS.secondary}
            >
              {node.detail}
            </text>
            {index < PIPELINE_NODES.length - 1 && (
              <line
                x1={x + 116}
                y1="154"
                x2={x + 140}
                y2="154"
                stroke={COLORS.accent}
                strokeWidth="3"
                markerEnd="url(#crc-start-compiler-arrow)"
              />
            )}
          </g>
        );
      })}
      <rect
        x="28"
        y="238"
        width="704"
        height="92"
        rx="12"
        fill={COLORS.elevated}
        stroke={
          sample === "syntax" || fault !== "none"
            ? COLORS.warning
            : COLORS.success
        }
        strokeWidth="2"
      />
      <text x="52" y="271" fontSize="15" fontWeight="700" fill={COLORS.primary}>
        当前验收：{failure}
      </text>
      <text x="52" y="303" fontSize="13" fill={COLORS.secondary}>
        保存输入哈希、命令、工具版本、阶段产物和退出码，再决定前进还是回放。
      </text>
      <text x="28" y="372" fontSize="13" fill={COLORS.accent}>
        动手试：只切换一个输入或故障模式，观察哪一枚节点先失去可信状态。
      </text>
    </g>
  );
}

function ReplayView({ fault, sample }: { fault: Fault; sample: Sample }) {
  const selected = SAMPLES.find((item) => item.id === sample) ?? SAMPLES[0];
  const status =
    sample === "syntax"
      ? "错误位置应稳定，且不应继续生成可执行文件"
      : fault === "stale"
        ? "发现旧产物：删除 build 后重新运行相同命令"
        : fault === "abi"
          ? "发现目标坐标差异：先固定 ABI 与 binutils"
          : "正常回放：输入、产物哈希和退出码彼此一致";
  return (
    <g>
      <text x="28" y="31" fontSize="16" fontWeight="700" fill={COLORS.primary}>
        回放验收：结果为什么可信
      </text>
      <text x="28" y="58" fontSize="13" fill={COLORS.secondary}>
        把当前样本与故障原因放进同一张证据卡，不用最终输出掩盖中间差异。
      </text>
      <rect
        x="28"
        y="96"
        width="328"
        height="214"
        rx="12"
        fill={COLORS.elevated}
        stroke={COLORS.border}
        strokeWidth="2"
      />
      <text x="52" y="130" fontSize="15" fontWeight="700" fill={COLORS.primary}>
        本次输入
      </text>
      <text x="52" y="170" fontSize="13" fill={COLORS.secondary}>
        样本：{selected.label}
      </text>
      <text x="52" y="202" fontSize="13" fill={COLORS.secondary}>
        命令：clean build and replay
      </text>
      <text x="52" y="234" fontSize="13" fill={COLORS.secondary}>
        目标：IA-32 / chosen ABI
      </text>
      <text x="52" y="274" fontSize="13" fill={COLORS.accent}>
        证据：源码、汇编、目标、退出码
      </text>
      <rect
        x="382"
        y="96"
        width="350"
        height="214"
        rx="12"
        fill={COLORS.elevated}
        stroke={
          fault === "none" && sample !== "syntax"
            ? COLORS.success
            : COLORS.warning
        }
        strokeWidth="2"
      />
      <text
        x="406"
        y="130"
        fontSize="15"
        fontWeight="700"
        fill={COLORS.primary}
      >
        当前决定
      </text>
      <text
        x="406"
        y="174"
        fontSize="13"
        fill={
          fault === "none" && sample !== "syntax"
            ? COLORS.success
            : COLORS.warning
        }
      >
        {status}
      </text>
      <text x="406" y="226" fontSize="13" fill={COLORS.secondary}>
        重建后比较哈希、错误位置或退出码。
      </text>
      <text x="406" y="270" fontSize="13" fill={COLORS.secondary}>
        只有证据闭合，才把结果交给下一章。
      </text>
      <text x="28" y="372" fontSize="13" fill={COLORS.accent}>
        先猜一猜：清理动作改变的是结果，还是让结果重新对应本次输入？
      </text>
    </g>
  );
}

/** 第1章专属实验：把目录节点、编译阶段和可重建回放放进同一条探针。 */
export function CrcStartCompilerLab() {
  const [view, setView] = useState<View>("outline");
  const [sample, setSample] = useState<Sample>("normal");
  const [fault, setFault] = useState<Fault>("none");
  const nodeRefs = useRef<Record<string, SVGGElement | null>>({});
  const current = useMemo(
    () => VIEWS.find((item) => item.id === view) ?? VIEWS[0],
    [view],
  );
  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      STEPS.forEach((step, index) => {
        const node = nodeRefs.current[step.label];
        if (!node) return;
        tl.add(
          node,
          {
            opacity: [0.36, 1],
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
    setView("outline");
    setSample("normal");
    setFault("none");
    timeline.goToStep(0);
  }

  return (
    <section
      aria-label="第1章开始制作编译器专属目录地图、阶段管线与回放验收实验"
      className="not-prose my-8 min-w-0 overflow-hidden rounded-card border border-border bg-elevated"
      data-unit-id="crc-unit-01"
      data-visual-kind="crc-start-compiler-probe"
    >
      <header className="flex flex-wrap items-start justify-between gap-4 border-b border-border px-5 py-4 sm:px-6">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold tracking-wide text-accent">
            专属 CrcStartCompilerLab · 目录、管线与回放
          </p>
          <h3 className="mt-1 text-base font-semibold text-primary">
            把“开始制作编译器”变成一份可重建的证据档案
          </h3>
          <p className="mt-1 max-w-3xl text-sm leading-6 text-secondary">
            先预测：改变一个输入或工具坐标后，哪一站会最先出现可观察差异？
          </p>
        </div>
      </header>
      <div className="min-w-0 space-y-4 p-5 sm:p-6">
        <div
          className="flex flex-wrap gap-2"
          aria-label="选择开始制作编译器实验视角"
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
        <div className="flex flex-wrap gap-2" aria-label="选择编译探针输入">
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
        <div className="flex flex-wrap gap-2" aria-label="选择编译器故障模式">
          <ViewButton
            active={fault === "none"}
            onClick={() => setFault("none")}
          >
            正常坐标
          </ViewButton>
          <ViewButton
            active={fault === "stale"}
            onClick={() => setFault("stale")}
          >
            旧产物
          </ViewButton>
          <ViewButton active={fault === "abi"} onClick={() => setFault("abi")}>
            ABI 不一致
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
                id="crc-start-compiler-arrow"
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
                active
                label="概要"
                refCallback={(element) => {
                  nodeRefs.current.outline = element;
                }}
                status="路线与节点"
                x={28}
                y={102}
              />
              <Stage
                active
                label="分析"
                refCallback={(element) => {
                  nodeRefs.current.analyze = element;
                }}
                status="输入与结构"
                x={174}
                y={102}
              />
              <Stage
                active
                label="生成"
                refCallback={(element) => {
                  nodeRefs.current.emit = element;
                }}
                status="汇编与目标"
                x={320}
                y={102}
              />
              <Stage
                active
                label="链接"
                refCallback={(element) => {
                  nodeRefs.current.link = element;
                }}
                status="符号与格式"
                x={466}
                y={102}
              />
              <Stage
                active
                label="运行"
                refCallback={(element) => {
                  nodeRefs.current.run = element;
                }}
                status="退出码回放"
                x={612}
                y={102}
              />
            </g>
            {view === "outline" ? (
              <OutlineView activeStep={timeline.currentStep} />
            ) : view === "pipeline" ? (
              <PipelineView
                activeStep={timeline.currentStep}
                fault={fault}
                sample={sample}
              />
            ) : (
              <ReplayView fault={fault} sample={sample} />
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
          caption="单步查看概要、分析、生成、链接和运行；播放后用同一输入重放，确认阶段证据与退出结果一致。"
          reset={{
            label: "重置编译器探针实验",
            ariaLabel: "重置开始制作编译器专属实验",
            onClick: reset,
          }}
        />
      </div>
    </section>
  );
}
