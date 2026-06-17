"use client";

import { useRef } from "react";

import { TEACHING_BEAT_MS, TimelineControls } from "../anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "../anim/use-teaching-timeline";

/**
 * <AaAgentAnatomyFlowDiagram>：「一个任务如何在五大件间流转」可控教学动画旗舰图（HEL-273）。
 *
 * 失忆天才小屋隐喻 + 全书地图：一个任务进来，依次流经 提示（组装纸条）→ 模型（决策）→
 * 判断要不要调工具 →（要）工具（出屋做事，结果回来）→ 记忆（存/取）→ 规划（还有下一步吗）
 * → 不需要则输出；需要则回到模型继续（呼应上一章 Agent Loop 的自主循环）。
 *
 * 一个高亮脉冲沿数据流路径依次点亮各组件节点，每步 caption 用人话讲该件在干嘛。
 *
 * 布局（§四几何）：五大件 + 任务/输出 共 7 个节点，分两行分层流程排布——
 *   上行（左→右）：任务 → 提示 → 模型 → 工具
 *   下行（右→左）：记忆 → 规划 → 输出
 * 节点用单一公式按列排（colX(i)），行距固定；连线先画（节点之下），不穿字；
 * 长中文标签盒宽足够、textAnchor=middle 不溢出；TimelineControls 在 viewBox 外。
 * label 锚在「该节点点亮完成」时刻 lit=BEAT*(i+1)，防 off-by-one（同 AaAgentLoopDiagram）。
 *
 * 为何 client：anime.js 时钟 + 受控控制条是真交互。anime.js 经 useTeachingTimeline 内部
 * 动态 import("animejs") 切独立 chunk（硬规则 2/6），注册后不进首屏关键路径。
 *
 * 视觉：全部 DESIGN token（accent / success / warning / danger / border / text-* / bg），
 * 无裸 hex；时长走 TEACHING_BEAT_MS 具名常量，无散落魔法数字（硬规则 5）。
 */

// —— 布局常量（viewBox 内坐标；间距均 2 的倍数）——
const VIEW_W = 760;
const VIEW_H = 420;

// 两行分层流程：上行 4 列（任务/提示/模型/工具），下行 4 列（记忆/规划/输出 + 占位）。
const NODE_W = 150;
const NODE_H = 72;
const COL_GAP = 30;
const ROW_TOP_Y = 84; // 上行盒顶 y
const ROW_BOTTOM_Y = 268; // 下行盒顶 y
// 四列左缘：单一公式，居中四列。
const COLS = 4;
const GRID_LEFT = (VIEW_W - (COLS * NODE_W + (COLS - 1) * COL_GAP)) / 2; // 居中
const colX = (i: number) => GRID_LEFT + i * (NODE_W + COL_GAP);

type FlowNode = {
  /** anime.js label = 该节点点亮完成锚点。 */
  id: string;
  title: string; // 名称（中英）
  sub: string; // 隐喻物 / 一句话
  color: string;
  col: number; // 列下标 0..3
  row: 0 | 1; // 0 上行 / 1 下行
};

// 节点声明（顺序即数据流先后；脉冲按此序点亮）。
const NODES: readonly FlowNode[] = [
  {
    id: "task",
    title: "任务进来",
    sub: "用户给一个活",
    color: "var(--text-secondary)",
    col: 0,
    row: 0,
  },
  {
    id: "prompt",
    title: "提示 Prompt",
    sub: "🗒 组装纸条",
    color: "var(--success)",
    col: 1,
    row: 0,
  },
  {
    id: "model",
    title: "模型 Model",
    sub: "🧠 大脑决策",
    color: "var(--accent)",
    col: 2,
    row: 0,
  },
  {
    id: "tools",
    title: "工具 Tools",
    sub: "📞 出屋做事",
    color: "var(--warning)",
    col: 3,
    row: 0,
  },
  {
    id: "memory",
    title: "记忆 Memory",
    sub: "📓 存 / 取",
    color: "var(--danger)",
    col: 3,
    row: 1,
  },
  {
    id: "planning",
    title: "规划 Planning",
    sub: "✅ 还有下一步吗",
    color: "var(--accent)",
    col: 2,
    row: 1,
  },
  {
    id: "output",
    title: "输出结果",
    sub: "🎯 任务完成",
    color: "var(--success)",
    col: 1,
    row: 1,
  },
];

const nodeBox = (n: FlowNode) => ({
  x: colX(n.col),
  y: n.row === 0 ? ROW_TOP_Y : ROW_BOTTOM_Y,
});

// 步骤：7 件流转 + 1 个「回到模型继续循环」收尾。
const STEPS: readonly TeachingStep[] = [
  {
    label: "task",
    caption: "① 任务进来：用户丢来一个活，比如「订明天最便宜的高铁票」",
  },
  {
    label: "prompt",
    caption: "② 提示：把任务、设定、已知信息组装成一张「纸条」塞给模型",
  },
  {
    label: "model",
    caption: "③ 模型：大脑读纸条、决策——要先查票价，于是决定调一个工具",
  },
  {
    label: "tools",
    caption: "④ 工具：模型出不了屋，靠「电话」去查实时票价，结果再塞回来",
  },
  {
    label: "memory",
    caption: "⑤ 记忆：把查到的票价等关键信息存进笔记本，需要时再取回",
  },
  {
    label: "planning",
    caption: "⑥ 规划：对照待办清单看「还有没有下一步」——还要比价、还没下单",
  },
  {
    label: "loop",
    caption:
      "⑦ 没完 → 回到模型继续转下一轮（呼应上一章 Agent Loop 的自主循环）",
  },
  { label: "output", caption: "⑧ 全部做完 → 输出结果：任务完成，停" },
];

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((s) => [s.label, s.caption ?? s.label]),
);

// 数据流连线（节点中心 → 节点中心；曼哈顿味的直线段，避免穿字这里用直连，节点错列不重叠）。
type Edge = { from: string; to: string; loop?: boolean };
const EDGES: readonly Edge[] = [
  { from: "task", to: "prompt" },
  { from: "prompt", to: "model" },
  { from: "model", to: "tools" },
  { from: "tools", to: "memory" }, // 上行末 → 下行同列（竖直下行）
  { from: "memory", to: "planning" },
  { from: "planning", to: "output" },
];

function centerOf(id: string): { x: number; y: number } {
  const n = NODES.find((nn) => nn.id === id)!;
  const b = nodeBox(n);
  return { x: b.x + NODE_W / 2, y: b.y + NODE_H / 2 };
}

export function AaAgentAnatomyFlowDiagram() {
  // 每节点高亮层引用。
  const nodeRefs = useRef<Record<string, SVGRectElement | null>>({});
  // 「回到模型」循环回边引用。
  const loopEdgeRef = useRef<SVGPathElement | null>(null);

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      // 主流：7 个节点按 NODES 顺序依次点亮（每步 1 beat），上一节点淡到余晖。
      // 注意 STEPS 顺序与 NODES 不完全一致：第 7 步是 loop（点亮回边 + 重亮 model），
      // 第 8 步才点 output。这里按 STEPS 顺序逐步排时间线。
      const litOrder: { id: string; isLoop?: boolean }[] = [
        { id: "task" },
        { id: "prompt" },
        { id: "model" },
        { id: "tools" },
        { id: "memory" },
        { id: "planning" },
        { id: "loop", isLoop: true },
        { id: "output" },
      ];

      litOrder.forEach((step, i) => {
        const start = TEACHING_BEAT_MS * i;
        const lit = TEACHING_BEAT_MS * (i + 1);

        if (step.isLoop) {
          // 循环回边点亮 + 重新点亮 model（强调「回到模型继续」）。
          if (loopEdgeRef.current) {
            tl.add(
              loopEdgeRef.current,
              { opacity: [0.2, 1], duration: TEACHING_BEAT_MS, ease: "out(3)" },
              start,
            );
          }
          const modelEl = nodeRefs.current["model"];
          if (modelEl) {
            tl.add(
              modelEl,
              {
                opacity: [0.22, 1],
                duration: TEACHING_BEAT_MS,
                ease: "out(3)",
              },
              start,
            );
          }
          tl.label("loop", lit);
          return;
        }

        const el = nodeRefs.current[step.id];
        if (el) {
          tl.add(
            el,
            {
              opacity: [0, 1],
              scale: [0.96, 1],
              duration: TEACHING_BEAT_MS,
              ease: "out(3)",
            },
            start,
          );
          // 离开本节点淡到余晖（output 是终点，不淡）。
          if (step.id !== "output") {
            tl.add(
              el,
              {
                opacity: [1, 0.22],
                duration: TEACHING_BEAT_MS * 0.5,
                ease: "in(2)",
              },
              lit,
            );
          }
        }
        tl.label(step.id, lit);
      });
    },
  });

  // 循环回边：planning → model（下行中列 → 上行中列，沿左侧绕，强调回到大脑）。
  const planningC = centerOf("planning");
  const modelC = centerOf("model");

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="rounded-card border border-border bg-elevated p-6">
        <div className="mb-4">
          <span className="inline-flex items-center gap-1 rounded-control border border-border px-2 py-1 text-xs font-medium text-accent">
            <span aria-hidden="true">⚡</span>
            可交互
          </span>
        </div>

        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="一个任务如何在智能体五大件间流转的可控动画。任务进来后，先经「提示」组装成纸条，交给「模型」大脑决策；模型判断要调工具，于是「工具」出屋查实时信息、把结果送回；接着「记忆」把关键信息存下来；再由「规划」对照待办清单看还有没有下一步——没完就回到模型继续转下一轮（呼应上一章 Agent Loop 的自主循环），全部做完才「输出结果」。一个高亮脉冲沿这条数据流依次点亮提示、模型、工具、记忆、规划、输出各节点。可播放、暂停、单步、拖动进度查看。"
          className="mx-auto block h-auto w-full max-w-[760px]"
        >
          <defs>
            <marker
              id="aaf-arrow"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
            >
              <path d="M0 0 L6 3 L0 6 z" fill="var(--text-secondary)" />
            </marker>
            <marker
              id="aaf-arrow-accent"
              markerWidth="9"
              markerHeight="9"
              refX="6"
              refY="3"
              orient="auto"
            >
              <path d="M0 0 L6 3 L0 6 z" fill="var(--accent)" />
            </marker>
          </defs>

          {/* ===== 标题 ===== */}
          <text
            x="24"
            y="34"
            fontSize="15"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            一个任务，怎样在五大件之间流转
          </text>
          <text x="24" y="56" fontSize="11" fill="var(--text-secondary)">
            脉冲沿数据流依次点亮各件——这就是智能体把活干完的全过程
          </text>

          {/* ===== 数据流连线（先画，落在节点之下，不穿字）===== */}
          {EDGES.map((e) => {
            const a = centerOf(e.from);
            const b = centerOf(e.to);
            return (
              <line
                key={`edge-${e.from}-${e.to}`}
                x1={a.x}
                y1={a.y}
                x2={b.x}
                y2={b.y}
                stroke="var(--text-secondary)"
                strokeWidth="1.6"
                markerEnd="url(#aaf-arrow)"
                opacity="0.5"
              />
            );
          })}

          {/* ===== 循环回边：规划 → 模型（accent 高亮，沿左侧绕开节点）===== */}
          <path
            ref={loopEdgeRef}
            d={`M ${planningC.x.toFixed(1)} ${(planningC.y - NODE_H / 2).toFixed(1)} C ${(planningC.x - 130).toFixed(1)} ${planningC.y.toFixed(1)}, ${(modelC.x - 130).toFixed(1)} ${modelC.y.toFixed(1)}, ${modelC.x.toFixed(1)} ${(modelC.y + NODE_H / 2).toFixed(1)}`}
            fill="none"
            stroke="var(--accent)"
            strokeWidth="2.2"
            strokeDasharray="6 4"
            markerEnd="url(#aaf-arrow-accent)"
            opacity="0.2"
          />
          <text
            x={modelC.x - 132}
            y={(planningC.y + modelC.y) / 2 + 4}
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill="var(--accent)"
          >
            ↻ 没完就回到
          </text>
          <text
            x={modelC.x - 132}
            y={(planningC.y + modelC.y) / 2 + 20}
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill="var(--accent)"
          >
            模型继续
          </text>

          {/* ===== 节点：底框 + 高亮层（anime.js 驱动）+ 文字 ===== */}
          {NODES.map((n) => {
            const b = nodeBox(n);
            return (
              <g key={n.id}>
                <rect
                  x={b.x}
                  y={b.y}
                  width={NODE_W}
                  height={NODE_H}
                  rx="10"
                  fill="var(--bg)"
                  stroke="var(--border)"
                  strokeWidth="1.2"
                />
                <rect
                  ref={(el) => {
                    nodeRefs.current[n.id] = el;
                  }}
                  x={b.x}
                  y={b.y}
                  width={NODE_W}
                  height={NODE_H}
                  rx="10"
                  fill={n.color}
                  fillOpacity="0.14"
                  stroke={n.color}
                  strokeWidth="2"
                  opacity="0"
                  style={{
                    transformBox: "fill-box",
                    transformOrigin: "center",
                  }}
                />
                <text
                  x={b.x + NODE_W / 2}
                  y={b.y + 30}
                  textAnchor="middle"
                  fontSize="13"
                  fontWeight="700"
                  fill="var(--text-primary)"
                >
                  {n.title}
                </text>
                <text
                  x={b.x + NODE_W / 2}
                  y={b.y + 52}
                  textAnchor="middle"
                  fontSize="11"
                  fill="var(--text-secondary)"
                >
                  {n.sub}
                </text>
              </g>
            );
          })}
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="一个任务依次流过 提示→模型→工具→记忆→规划，没完就回到模型继续转，做完才输出——五大件就是这样协作把活干完的。可暂停、单步、拖进度。"
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        任务进来后在五大件之间流转：提示组装纸条、模型决策、工具出屋做事、记忆存取、规划盘点下一步，
        没完就回模型再转一轮，做完才输出——这正是上一章 Agent Loop
        在五大件上的具体走法。
      </figcaption>
    </figure>
  );
}
