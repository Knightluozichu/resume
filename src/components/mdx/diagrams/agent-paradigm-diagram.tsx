"use client";

import dynamic from "next/dynamic";
import { useRef } from "react";

import { TEACHING_BEAT_MS, TimelineControls } from "../anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "../anim/use-teaching-timeline";

/**
 * <AgentParadigmDiagram>：「纯 LLM / 固定工作流 / AI Agent」三种范式的对比揭示
 * 「可控教学动画」（HEL-253，《什么是 AI Agent》篇1·1，知识点 3）。
 *
 * 三列并排，逐列揭示，对比点落在最右列那条「反馈循环箭头」上：
 *   ① 纯 LLM：输入 →[LLM]→ 输出（单向一次，无反馈）——只会答话的咨询台。
 *   ② 固定工作流：输入 → 步骤1 → 步骤2 → 步骤3 → 输出（人预先编好的固定链，无自主
 *      决策）——照菜谱做菜的流水线工。
 *   ③ AI Agent：输入 →[LLM 决策]⇄工具/环境（带反馈循环箭头，自主决定下一步）→ 达成
 *      目标——能随机应变的小特。
 *
 * 时序铁律照 ComponentWorkflowDiagram：步 i 的呈现占 [BEAT*i, BEAT*(i+1)]，
 * tl.label(name, BEAT*(i+1)) 落在该列完全揭示处，杜绝单步 off-by-one；最后一步（Agent）
 * 停在亮态，且其反馈循环箭头额外高亮——这正是三者的根本差异。
 *
 * 为何 client：anime.js 时钟 + 受控控制条都是真交互。anime.js 经 useTeachingTimeline
 * 内部的动态 import("animejs") 切成独立 chunk（硬规则 2/6），本组件再经 mdx-components
 * 静态注册为客户端叶子，anime.js 绝不进首屏 / 公共 layout。
 *
 * 视觉：纯 LLM=--text-secondary（朴素）、固定工作流=--warning、AI Agent=--accent +
 * 反馈环 --success；全部 DESIGN token 无裸 hex；时长走 TEACHING_BEAT_MS 具名常量，几何常量
 * 具名且为 4 的倍数（硬规则 5）。
 */

// —— 画布与三列几何（单一 x 公式：colX(i)=MARGIN + i*(COL_W+GAP)）。 ——
const VIEW_W = 720;
const VIEW_H = 380;

const MARGIN = 24; // 左右外边距
const GAP = 24; // 列间距（≥12）
const COL_W = (VIEW_W - 2 * MARGIN - 2 * GAP) / 3; // 三列均分，单一公式

function colX(i: number): number {
  return MARGIN + i * (COL_W + GAP);
}

// 列标题与列内小盒几何。
const TITLE_Y = 44; // 列标题基线
const BOX_W = 132; // 列内小盒宽（在列中水平居中）
const BOX_H = 38; // 列内小盒高
const BOX_GAP = 18; // 列内相邻小盒纵向间距
const STACK_TOP = 66; // 列内第一个小盒顶边

/** 列内第 r 行小盒的左上角坐标（盒在列中水平居中）。 */
function boxXY(colIndex: number, row: number): { x: number; y: number } {
  return {
    x: colX(colIndex) + (COL_W - BOX_W) / 2,
    y: STACK_TOP + row * (BOX_H + BOX_GAP),
  };
}

const BOX_CX = (colIndex: number) => colX(colIndex) + COL_W / 2;

// —— 三列内容定义。 ——
type Box = { label: string; mono?: boolean };
type Column = {
  id: string;
  title: string;
  /** 列主色 token（揭示时盒描边 / 文字用此色）。 */
  color: string;
  /** 列内纵向小盒（从上到下 = 输入 → … → 输出）。 */
  boxes: readonly Box[];
  /** 隐喻一句话。 */
  metaphor: string;
};

const COLUMNS: readonly Column[] = [
  {
    id: "llm",
    title: "纯 LLM",
    color: "var(--text-secondary)",
    boxes: [
      { label: "输入（提问）" },
      { label: "LLM", mono: true },
      { label: "输出（答话）" },
    ],
    metaphor: "只会答话的咨询台",
  },
  {
    id: "workflow",
    title: "固定工作流",
    color: "var(--warning)",
    boxes: [
      { label: "输入" },
      { label: "步骤 1" },
      { label: "步骤 2" },
      { label: "步骤 3" },
      { label: "输出" },
    ],
    metaphor: "照菜谱做菜的流水线工",
  },
  {
    id: "agent",
    title: "AI Agent",
    color: "var(--accent)",
    boxes: [
      { label: "输入（目标）" },
      { label: "LLM 决策", mono: true },
      { label: "工具 / 环境" },
      { label: "达成目标" },
    ],
    metaphor: "能随机应变的小特",
  },
];

// Agent 列「LLM 决策 ⇄ 工具/环境」反馈环：在第 1 行（LLM 决策）与第 2 行（工具/环境）之间。
const AGENT_COL = 2;
const AGENT_LLM_ROW = 1;
const AGENT_TOOL_ROW = 2;

// —— 关键帧步骤：逐列揭示。 ——
const STEPS: readonly TeachingStep[] = [
  {
    label: "llm",
    caption:
      "① 纯 LLM：输入一句、它答一句，单向走一趟就结束——像只会答话的咨询台，不会自己再去做什么",
  },
  {
    label: "workflow",
    caption:
      "② 固定工作流：人预先把步骤 1→2→3 编死，照着跑——像照菜谱做菜的流水线工，每步固定、不自主拐弯",
  },
  {
    label: "agent",
    caption:
      "③ AI Agent：LLM 自己决策、调工具、看结果再决定下一步——那条反馈环就是它和前两者的根本区别",
  },
];

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((s) => [s.label, s.caption ?? s.label]),
);

function AgentParadigmDiagramInner() {
  // 每列整组（<g>）+ Agent 反馈环的 DOM 引用，喂给 anime.js 驱动。
  const colRefs = useRef<Record<string, SVGGElement | null>>({});
  const feedbackRef = useRef<SVGGElement | null>(null);

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      STEPS.forEach((step, i) => {
        const start = TEACHING_BEAT_MS * i;
        const lit = TEACHING_BEAT_MS * (i + 1);

        const g = colRefs.current[step.label];
        if (g) {
          // 揭示该列：淡入 + 轻微上移到位。
          tl.add(
            g,
            {
              opacity: [0.18, 1],
              translateY: [12, 0],
              duration: TEACHING_BEAT_MS,
              ease: "out(3)",
            },
            start,
          );
        }
        // Agent 列（最后一步）：反馈环额外高亮。
        if (step.label === "agent" && feedbackRef.current) {
          tl.add(
            feedbackRef.current,
            {
              opacity: [0, 1],
              duration: TEACHING_BEAT_MS,
              ease: "out(2)",
            },
            start,
          );
        }
        tl.label(step.label, lit);
      });
    },
  });

  // Agent 反馈环端点：LLM 决策盒右侧 ↔ 工具/环境盒右侧（在列右侧画一条往返弧）。
  const llmBox = boxXY(AGENT_COL, AGENT_LLM_ROW);
  const toolBox = boxXY(AGENT_COL, AGENT_TOOL_ROW);
  const loopX = llmBox.x + BOX_W + 12; // 反馈弧外凸到盒右侧 12px
  const loopY1 = llmBox.y + BOX_H / 2;
  const loopY2 = toolBox.y + BOX_H / 2;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="rounded-card border border-border bg-elevated p-6">
        {/* ⚡ 可交互标签 */}
        <div className="mb-4">
          <span className="inline-flex items-center gap-1 rounded-control border border-border px-2 py-1 text-xs font-medium text-accent">
            <span aria-hidden="true">⚡</span>
            可交互
          </span>
        </div>

        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="纯 LLM、固定工作流、AI Agent 三种范式的并排对比。画面分三列。左列「纯 LLM」：从上到下是输入提问、LLM、输出答话三个盒子，单向走一趟就结束，没有反馈，像只会答话的咨询台。中列「固定工作流」：输入、步骤 1、步骤 2、步骤 3、输出五个盒子串成一条人预先编死的固定链，每步固定、不自主拐弯，像照菜谱做菜的流水线工。右列「AI Agent」：输入目标、LLM 决策、工具或环境、达成目标四个盒子，其中 LLM 决策与工具/环境之间有一条往返的反馈循环箭头，表示 LLM 自己决策、调工具、看结果再决定下一步，像能随机应变的小特。三者的根本区别就在右列这条反馈环：纯 LLM 和固定工作流都没有它，只有 AI Agent 能自主地一圈圈循环、随机应变达成目标。播放时逐列揭示，最后高亮 Agent 列的反馈环，可播放、暂停、单步、拖动进度对比观察。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <defs>
            <marker
              id="apd-arrow"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
            >
              <path d="M0 0 L6 3 L0 6 z" fill="var(--text-secondary)" />
            </marker>
            <marker
              id="apd-arrow-success"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
            >
              <path d="M0 0 L6 3 L0 6 z" fill="var(--success)" />
            </marker>
          </defs>

          {/* —— 三列（每列一组，anime.js 驱动整组淡入）—— */}
          {COLUMNS.map((col, ci) => (
            <g
              key={col.id}
              ref={(el) => {
                colRefs.current[col.id] = el;
              }}
              opacity="0.18"
            >
              {/* 列标题 */}
              <text
                x={BOX_CX(ci)}
                y={TITLE_Y}
                textAnchor="middle"
                fontSize="14"
                fontWeight="700"
                fill={col.color}
              >
                {col.title}
              </text>

              {/* 列内小盒 + 盒间向下箭头 */}
              {col.boxes.map((box, ri) => {
                const { x, y } = boxXY(ci, ri);
                const cx = BOX_CX(ci);
                const isLastRow = ri === col.boxes.length - 1;
                const nextY = STACK_TOP + (ri + 1) * (BOX_H + BOX_GAP);
                return (
                  <g key={`${col.id}-${ri}`}>
                    <rect
                      x={x}
                      y={y}
                      width={BOX_W}
                      height={BOX_H}
                      rx="8"
                      fill="var(--bg)"
                      stroke={col.color}
                      strokeWidth="1.6"
                    />
                    <text
                      x={cx}
                      y={y + BOX_H / 2 + 4}
                      textAnchor="middle"
                      fontSize="11"
                      fontWeight={box.mono ? 700 : 600}
                      fontFamily={box.mono ? "var(--font-mono)" : undefined}
                      fill={box.mono ? col.color : "var(--text-primary)"}
                    >
                      {box.label}
                    </text>
                    {/* 盒间向下箭头（最后一行不画） */}
                    {!isLastRow && (
                      <line
                        x1={cx}
                        y1={y + BOX_H + 2}
                        x2={cx}
                        y2={nextY - 2}
                        stroke="var(--text-secondary)"
                        strokeWidth="1.4"
                        markerEnd="url(#apd-arrow)"
                        opacity="0.6"
                      />
                    )}
                  </g>
                );
              })}

              {/* 列脚隐喻一句话 */}
              <text
                x={BOX_CX(ci)}
                y={VIEW_H - 30}
                textAnchor="middle"
                fontSize="9.5"
                fill="var(--text-secondary)"
              >
                {col.metaphor}
              </text>
            </g>
          ))}

          {/* —— Agent 列反馈循环箭头（anime.js 驱动 opacity，最后一步高亮）—— */}
          <g
            ref={(el) => {
              feedbackRef.current = el;
            }}
            opacity="0"
          >
            {/* 去程：LLM 决策 → 工具/环境（向下凸弧） */}
            <path
              d={`M ${loopX} ${loopY1} C ${loopX + 28} ${loopY1}, ${loopX + 28} ${loopY2}, ${loopX} ${loopY2}`}
              fill="none"
              stroke="var(--success)"
              strokeWidth="2.2"
              markerEnd="url(#apd-arrow-success)"
            />
            {/* 回程：工具/环境 → LLM 决策（左侧凹弧，形成闭环） */}
            <path
              d={`M ${toolBox.x} ${loopY2} C ${toolBox.x - 28} ${loopY2}, ${toolBox.x - 28} ${loopY1}, ${llmBox.x} ${loopY1}`}
              fill="none"
              stroke="var(--success)"
              strokeWidth="2.2"
              markerEnd="url(#apd-arrow-success)"
            />
            {/* 标签置于反馈弧下方、贴外凸弧居中，右边缘 ≤708（距 viewBox 右 ≥12px） */}
            <text
              x={loopX + 14}
              y={loopY2 + 14}
              textAnchor="middle"
              fontSize="9.5"
              fontWeight="700"
              fill="var(--success)"
            >
              反馈环
            </text>
          </g>
        </svg>

        {/* 控制条原语 */}
        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="点击逐列揭示：纯 LLM（单向一次）→ 固定工作流（人编死的固定链）→ AI Agent（带反馈环、自主决策）。对比点就在最右列那条反馈环。"
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        三种范式对比：纯 LLM 单向答一次、固定工作流照编死的链走、AI Agent
        靠那条反馈环自主 循环——小特之所以是
        Agent，关键就在它能「看结果再决定下一步」。
      </figcaption>
    </figure>
  );
}

/**
 * 动态边界：把 anime.js 叶子组件经 next/dynamic(ssr:false) 懒加载，确保 anime.js 这条
 * 重交互链路绝不进首屏 / 公共 layout（硬规则 2/6）。导出名供 mdx-components 注册。
 */
const AgentParadigmDynamic = dynamic(
  () => Promise.resolve(AgentParadigmDiagramInner),
  {
    ssr: false,
    loading: () => (
      <div className="mdx-figure not-prose mx-auto my-6 rounded-card border border-border bg-elevated p-6">
        <div className="flex min-h-72 items-center justify-center text-center">
          <p className="text-sm text-secondary">三范式对比动画加载中…</p>
        </div>
      </div>
    ),
  },
);

export function AgentParadigmDiagram() {
  return <AgentParadigmDynamic />;
}
