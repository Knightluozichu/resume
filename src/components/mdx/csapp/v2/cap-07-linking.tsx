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

const VIEW_W = 860;
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

type Phase = "compile" | "resolve" | "relocate" | "load" | "interpose";
type Scenario = "normal" | "archive-order" | "missing";

const CONCEPTS = [
  "第7章 链接",
  "7.1 编译器驱动程序",
  "7.2 静态链接",
  "7.3 目标文件",
  "7.4 可重定位目标文件",
  "7.5 符号和符号表",
  "7.6 符号解析",
  "7.6.1 链接器如何解析多重定义的全局符号",
  "7.6.2 与静态库链接",
  "7.6.3 链接器如何使用静态库来解析引用",
  "7.7 重定位",
  "7.7.1 重定位条目",
  "7.7.2 重定位符号引用",
  "7.8 可执行目标文件",
  "7.9 加载可执行目标文件",
  "7.10 动态链接共享库",
  "7.11 从应用程序中加载和链接共享库",
  "7.12 位置无关代码",
  "7.13 库打桩机制",
  "7.13.1 编译时打桩",
  "7.13.2 链接时打桩",
  "7.13.3 运行时打桩",
  "7.14 处理目标文件的工具",
  "7.15 小结",
] as const;

const PHASES: readonly {
  id: Phase;
  label: string;
  focus: string;
  evidence: string;
}[] = [
  {
    id: "compile",
    label: "编译驱动",
    focus: "源文件 → 目标文件",
    evidence: "驱动程序把编译、汇编和链接参数串成可审计命令。",
  },
  {
    id: "resolve",
    label: "符号解析",
    focus: "引用 ↔ 定义",
    evidence: "符号表让每个外部引用找到唯一可见定义或明确失败。",
  },
  {
    id: "relocate",
    label: "重定位",
    focus: "offset + addend → writeback",
    evidence: "重定位条目把位置、类型、加数与目标地址绑定起来。",
  },
  {
    id: "load",
    label: "装载映像",
    focus: "节 → 权限 → 入口",
    evidence: "装载器合并节、设置权限，并把控制权交给入口地址。",
  },
  {
    id: "interpose",
    label: "库打桩",
    focus: "调用 → 观测 → 原实现",
    evidence: "打桩改变绑定路径，但必须记录时机、参数和恢复方式。",
  },
] as const;

const SCENARIOS: readonly {
  id: Scenario;
  label: string;
  result: string;
  detail: string;
}[] = [
  {
    id: "normal",
    label: "正常链接",
    result: "入口可达",
    detail: "所有引用均有定义，重定位写回值与装载权限一致。",
  },
  {
    id: "archive-order",
    label: "静态库顺序",
    result: "引用未满足",
    detail: "库扫描顺序改变，未满足引用停在归档文件边界。",
  },
  {
    id: "missing",
    label: "缺少共享库",
    result: "装载失败",
    detail: "可执行文件生成成功，但运行时依赖无法映射到进程。",
  },
] as const;

const NODES: readonly {
  id: string;
  label: string;
  artifact: string;
  x: number;
  y: number;
}[] = [
  { id: "source", label: "源文件", artifact: "main.c", x: 28, y: 130 },
  { id: "object", label: "目标文件", artifact: "main.o", x: 198, y: 130 },
  { id: "archive", label: "静态库", artifact: "lib.a", x: 368, y: 130 },
  { id: "image", label: "可执行映像", artifact: "app", x: 538, y: 130 },
  { id: "process", label: "进程地址空间", artifact: "loader", x: 708, y: 130 },
] as const;

const PHASE_STEPS: readonly TeachingStep[] = PHASES.map((phase) => ({
  label: phase.id,
  caption: phase.evidence,
}));

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  PHASE_STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

function PhaseButton({
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

function ArtifactNode({
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
        y={node.y + 56}
        fontSize="12"
        fill={COLORS.secondary}
      >
        {node.artifact}
      </text>
    </g>
  );
}

/** 第 7 章专属实验：把目标文件、符号、重定位和装载证据串成一条可重放链。 */
export function Cap07LinkingLab() {
  const [phaseId, setPhaseId] = useState<Phase>("compile");
  const [scenarioId, setScenarioId] = useState<Scenario>("normal");
  const timelineRefs = useRef<Record<string, SVGGElement | null>>({});
  const phase = useMemo(
    () => PHASES.find((item) => item.id === phaseId) ?? PHASES[0],
    [phaseId],
  );
  const scenario = useMemo(
    () => SCENARIOS.find((item) => item.id === scenarioId) ?? SCENARIOS[0],
    [scenarioId],
  );
  const timeline = useTeachingTimeline({
    steps: PHASE_STEPS,
    build: (tl) => {
      PHASE_STEPS.forEach((step, index) => {
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
    setPhaseId("compile");
    setScenarioId("normal");
    timeline.goToStep(0);
  }

  const phaseIndex = PHASES.findIndex((item) => item.id === phaseId);
  const scenarioIsFault = scenarioId !== "normal";

  return (
    <section
      aria-label={`第 7 章链接专属目标文件到装载映像实验；${CONCEPTS.join("；")}`}
      className="not-prose my-8 min-w-0 overflow-hidden rounded-card border border-border bg-elevated"
      data-unit-id="cap-unit-07"
      data-visual-kind="cap-07-linking-object-symbol-relocation"
    >
      <header className="flex flex-wrap items-start justify-between gap-4 border-b border-border px-5 py-4 sm:px-6">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold tracking-wide text-accent">
            专属 Cap07LinkingLab · 链接证据链
          </p>
          <h3 className="mt-1 text-lg font-semibold text-primary">
            从名字到地址：目标制品如何变成可运行映像
          </h3>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
            选择阶段与故障样本，逐帧查看引用、定义、重定位和装载权限如何协同。
          </p>
        </div>
        <div className="rounded-control border border-border px-3 py-2 text-right text-xs text-secondary">
          <div className="font-medium text-primary">当前阶段</div>
          <div>{phase.label}</div>
          <div>{phase.focus}</div>
        </div>
      </header>

      <div className="space-y-4 px-5 py-4 sm:px-6">
        <div className="flex flex-wrap gap-2" aria-label="链接阶段">
          {PHASES.map((item) => (
            <PhaseButton
              key={item.id}
              active={item.id === phaseId}
              onClick={() => setPhaseId(item.id)}
            >
              {item.label}
            </PhaseButton>
          ))}
        </div>
        <div className="flex flex-wrap gap-2" aria-label="故障样本">
          {SCENARIOS.map((item) => (
            <PhaseButton
              key={item.id}
              active={item.id === scenarioId}
              onClick={() => setScenarioId(item.id)}
            >
              {item.label}
            </PhaseButton>
          ))}
        </div>

        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label={`${phase.label}阶段的链接证据链：${scenario.result}`}
          className="h-auto w-full"
        >
          <rect
            x="10"
            y="18"
            width="840"
            height="470"
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
            source → object → symbol → relocation → load → observe
          </text>
          <text x="28" y="78" fontSize="12" fill={COLORS.secondary}>
            {scenario.detail}
          </text>
          {NODES.slice(0, -1).map((node, index) => {
            const next = NODES[index + 1];
            const edgeActive = phaseIndex >= index;
            const edgeWarning =
              scenarioIsFault &&
              ((scenarioId === "archive-order" && index === 2) ||
                (scenarioId === "missing" && index === 3));
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
                  {edgeWarning ? "阻断" : edgeActive ? "已确认" : "待确认"}
                </text>
              </g>
            );
          })}
          {NODES.map((node, index) => (
            <ArtifactNode
              key={node.id}
              node={node}
              active={phaseIndex >= index}
              warning={
                scenarioId === "archive-order"
                  ? node.id === "archive"
                  : scenarioId === "missing" && node.id === "process"
              }
            />
          ))}
          <g
            ref={(node) => {
              timelineRefs.current.compile = node;
            }}
            aria-hidden="true"
            opacity="0"
            pointerEvents="none"
          >
            <rect
              x="30"
              y="248"
              width="150"
              height="70"
              rx="10"
              fill={COLORS.accent}
              fillOpacity="0.12"
              stroke={COLORS.accent}
            />
          </g>
          <g
            ref={(node) => {
              timelineRefs.current.resolve = node;
            }}
            aria-hidden="true"
            opacity="0"
            pointerEvents="none"
          >
            <path d="M214 282h152" stroke={COLORS.accent} strokeWidth="4" />
          </g>
          <g
            ref={(node) => {
              timelineRefs.current.relocate = node;
            }}
            aria-hidden="true"
            opacity="0"
            pointerEvents="none"
          >
            <circle
              cx="430"
              cy="282"
              r="28"
              fill={COLORS.accent}
              fillOpacity="0.16"
              stroke={COLORS.accent}
              strokeWidth="2"
            />
          </g>
          <g
            ref={(node) => {
              timelineRefs.current.load = node;
            }}
            aria-hidden="true"
            opacity="0"
            pointerEvents="none"
          >
            <path
              d="M480 282h120v-36"
              fill="none"
              stroke={COLORS.warning}
              strokeWidth="4"
            />
          </g>
          <g
            ref={(node) => {
              timelineRefs.current.interpose = node;
            }}
            aria-hidden="true"
            opacity="0"
            pointerEvents="none"
          >
            <rect
              x="628"
              y="248"
              width="174"
              height="70"
              rx="10"
              fill={COLORS.success}
              fillOpacity="0.1"
              stroke={COLORS.success}
            />
          </g>
          <text
            x="32"
            y="366"
            fontSize="13"
            fontWeight="700"
            fill={COLORS.primary}
          >
            重定位记录
          </text>
          <text x="32" y="392" fontSize="12" fill={COLORS.secondary}>
            offset 0x18 · symbol printf · addend -4 · writeback 0x401126
          </text>
          <text x="32" y="418" fontSize="12" fill={COLORS.secondary}>
            {scenarioIsFault ? "失败证据：" : "验收证据："}
            {scenario.detail}
          </text>
          <text
            x="32"
            y="462"
            fontSize="12"
            fill={scenarioIsFault ? COLORS.danger : COLORS.success}
          >
            {scenario.result} · 当前阶段：{phase.label}
          </text>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="动画默认暂停；逐步查看编译、解析、重定位、装载与打桩的证据链。"
          reset={{
            label: "重置实验",
            ariaLabel: "重置链接证据链实验",
            onClick: reset,
          }}
        />
      </div>
    </section>
  );
}
