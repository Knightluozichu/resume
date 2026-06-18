"use client";

import { useRef } from "react";

import { TEACHING_BEAT_MS, TimelineControls } from "../anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "../anim/use-teaching-timeline";

/**
 * <AaFunctionCallTurnDiagram>：「一回合函数调用」分步可控教学动画旗舰图（HEL-311，函数调用章）。
 *
 * 演一个任务怎么在「模型」与「外部运行时」之间走一回合，把活干完：
 *   ① 模型看到工具清单（电话簿：有哪些工具能调）
 *   ② 模型决定并输出调用请求 get_weather(city="上海")——只是结构化请求，不亲自执行
 *   ③ 我们（运行时）按请求真去执行那个 Python 函数
 *   ④ 把执行结果「上海 26℃」回灌给模型
 *   ⑤ 模型用结果作答「上海今天 26 度」
 * 关键点（每步 caption 都点明）：模型只负责「说要调谁、传什么」，真去执行的永远是外部。
 *
 * 布局（§四几何，无容器框圈内容——靠两条泳道标题 + 节点对齐分组，不用大 rect 套住节点）：
 *   - 上泳道（模型一侧）放 ①②⑤ 三步，下泳道（外部运行时一侧）放 ③④ 两步；
 *   - 五个节点 x 用单一公式 stepX(i)=LEFT + i*(NODE_W + GAP)，等宽等距、跨两泳道列对齐；
 *   - 步与步之间用箭头连接（含上下泳道间的斜向跨道箭头），先画在节点之下、不穿字；
 *   - 泳道标签在最左侧、距 viewBox 边 ≥18px；字号 ≥10px；
 *   - TimelineControls 在 viewBox 外（外层 div）；label 锚在「节点点亮完成」时刻 lit=BEAT*(i+1) 防 off-by-one。
 *
 * 为何 client：anime.js 时钟 + 受控控制条。anime.js 经 useTeachingTimeline 内部
 * 动态 import("animejs") 切独立 chunk（硬规则 2/6），不进首屏关键路径。
 * 视觉全走 DESIGN token，无裸 hex；时长走 TEACHING_BEAT_MS 具名常量（硬规则 5）。
 */

// —— 布局常量（viewBox 内坐标，间距均 2 的倍数）——
const VIEW_W = 960;
const VIEW_H = 420;

const NODE_W = 138;
const NODE_H = 84;
const GAP = 24;
const LEFT = 150; // 第一节点左缘（给左侧泳道标签留 150）
const stepX = (i: number) => LEFT + i * (NODE_W + GAP);

const ROW_MODEL_Y = 92; // 上泳道（模型）节点顶 y
const ROW_RT_Y = 268; // 下泳道（外部运行时）节点顶 y

type Lane = "model" | "runtime";

type FlowNode = {
  id: string;
  step: number; // 第几列（0..4），决定 x
  lane: Lane; // 在哪条泳道，决定 y
  index: string;
  title: string;
  sub: string;
  color: string;
};

// 五步节点（顺序即时间顺序）。①②⑤ 在模型泳道，③④ 在外部运行时泳道。
const NODES: readonly FlowNode[] = [
  {
    id: "see",
    step: 0,
    lane: "model",
    index: "①",
    title: "模型看工具清单",
    sub: "有哪些工具能调",
    color: "var(--text-secondary)",
  },
  {
    id: "request",
    step: 1,
    lane: "model",
    index: "②",
    title: "输出调用请求",
    sub: 'get_weather(city="上海")',
    color: "var(--accent)",
  },
  {
    id: "execute",
    step: 2,
    lane: "runtime",
    index: "③",
    title: "我们真去执行",
    sub: "运行那个 Python 函数",
    color: "var(--warning)",
  },
  {
    id: "feedback",
    step: 3,
    lane: "runtime",
    index: "④",
    title: "把结果回灌",
    sub: "「上海 26℃」塞回去",
    color: "var(--success)",
  },
  {
    id: "answer",
    step: 4,
    lane: "model",
    index: "⑤",
    title: "模型据此作答",
    sub: "「上海今天 26 度」",
    color: "var(--accent)",
  },
];

const nodeX = (n: FlowNode) => stepX(n.step);
const nodeY = (n: FlowNode) => (n.lane === "model" ? ROW_MODEL_Y : ROW_RT_Y);

const STEPS: readonly TeachingStep[] = [
  {
    label: "see",
    caption:
      "① 模型先看到「工具清单」——屋里有哪些电话能打（每个工具带名字和说明）",
  },
  {
    label: "request",
    caption:
      '② 模型决定调 get_weather、参数 city="上海"，并把它写成一条结构化请求——注意：它只是「说要调谁」，并不亲自执行',
  },
  {
    label: "execute",
    caption:
      "③ 真去执行的是我们（外部运行时）：按请求运行那个 Python 函数，拿到真实结果",
  },
  {
    label: "feedback",
    caption:
      "④ 把执行结果「上海 26℃」回灌给模型——相当于把电话那头的答复塞回门缝",
  },
  {
    label: "answer",
    caption:
      "⑤ 模型拿到结果，再据此组织一句人话作答「上海今天 26 度」。一回合闭环",
  },
];

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((s) => [s.label, s.caption ?? s.label]),
);

export function AaFunctionCallTurnDiagram() {
  // 各节点高亮层引用（点亮动画驱动 opacity）。
  const nodeRefs = useRef<Record<string, SVGGElement | null>>({});

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      NODES.forEach((n, i) => {
        const start = TEACHING_BEAT_MS * i;
        const lit = TEACHING_BEAT_MS * (i + 1);
        const el = nodeRefs.current[n.id];
        if (el) {
          tl.add(
            el,
            {
              opacity: [0.18, 1],
              translateY: [10, 0],
              duration: TEACHING_BEAT_MS,
              ease: "out(3)",
            },
            start,
          );
        }
        tl.label(n.id, lit);
      });
    },
  });

  function renderNode(n: FlowNode) {
    const x = nodeX(n);
    const y = nodeY(n);
    const cx = x + NODE_W / 2;
    return (
      <g
        key={n.id}
        ref={(el) => {
          nodeRefs.current[n.id] = el;
        }}
        opacity="0.18"
      >
        {/* 单节点 rect（仅圈自己——非「容器框圈别的内容」） */}
        <rect
          x={x}
          y={y}
          width={NODE_W}
          height={NODE_H}
          rx="10"
          fill={n.color}
          fillOpacity="0.1"
          stroke={n.color}
          strokeWidth="1.6"
        />
        <text
          x={cx}
          y={y + 24}
          textAnchor="middle"
          fontSize="11"
          fontWeight="700"
          fill={n.color}
        >
          {n.index}
        </text>
        <text
          x={cx}
          y={y + 44}
          textAnchor="middle"
          fontSize="13"
          fontWeight="700"
          fill="var(--text-primary)"
        >
          {n.title}
        </text>
        <text
          x={cx}
          y={y + 64}
          textAnchor="middle"
          fontSize="10"
          fill="var(--text-secondary)"
        >
          {n.sub}
        </text>
      </g>
    );
  }

  // 节点边缘锚点（用于画箭头）。
  const cxOf = (n: FlowNode) => nodeX(n) + NODE_W / 2;
  const topOf = (n: FlowNode) => nodeY(n);
  const botOf = (n: FlowNode) => nodeY(n) + NODE_H;
  const rightOf = (n: FlowNode) => nodeX(n) + NODE_W;
  const leftOf = (n: FlowNode) => nodeX(n);
  const midYOf = (n: FlowNode) => nodeY(n) + NODE_H / 2;

  const N = Object.fromEntries(NODES.map((n) => [n.id, n])) as Record<
    string,
    FlowNode
  >;

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
          aria-label="一回合函数调用的可控动画。上面一条泳道是模型一侧，下面一条泳道是外部运行时一侧，一个任务在两侧之间走一圈。第一步：模型看到工具清单，知道屋里有哪些工具能调。第二步：模型决定调用 get_weather，参数 city 等于上海，并把它写成一条结构化请求，注意模型只是说要调谁、传什么，并不亲自执行。第三步：真去执行的是我们这个外部运行时，按请求运行那个 Python 函数，拿到真实结果。第四步：把执行结果上海 26 摄氏度回灌给模型。第五步：模型拿到结果再据此组织一句人话作答，上海今天 26 度，一回合闭环。五步依次点亮，可播放、暂停、单步、拖动进度查看。"
          className="mx-auto block h-auto w-full max-w-[960px]"
        >
          <defs>
            <marker
              id="aafct-arrow"
              markerWidth="9"
              markerHeight="9"
              refX="6"
              refY="3"
              orient="auto"
            >
              <path d="M0 0 L6 3 L0 6 z" fill="var(--text-secondary)" />
            </marker>
          </defs>

          {/* ===== 标题 ===== */}
          <text
            x="24"
            y="30"
            fontSize="15"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            一回合函数调用：模型只「请求」，真去执行的是外部运行时
          </text>
          <text x="24" y="50" fontSize="11" fill="var(--text-secondary)">
            看工具清单 → 输出调用请求 → 外部执行 → 结果回灌 → 据此作答
          </text>

          {/* ===== 两条泳道标签（最左侧，不用 rect 框住节点）===== */}
          <text
            x="24"
            y={ROW_MODEL_Y + NODE_H / 2 - 6}
            fontSize="12"
            fontWeight="700"
            fill="var(--accent)"
          >
            模型一侧
          </text>
          <text
            x="24"
            y={ROW_MODEL_Y + NODE_H / 2 + 12}
            fontSize="10"
            fill="var(--text-secondary)"
          >
            （只动嘴）
          </text>
          <text
            x="24"
            y={ROW_RT_Y + NODE_H / 2 - 6}
            fontSize="12"
            fontWeight="700"
            fill="var(--warning)"
          >
            外部运行时
          </text>
          <text
            x="24"
            y={ROW_RT_Y + NODE_H / 2 + 12}
            fontSize="10"
            fill="var(--text-secondary)"
          >
            （真动手）
          </text>

          {/* 两泳道之间一条极淡分隔虚线（非容器框，仅分区视觉） */}
          <line
            x1="24"
            y1={(ROW_MODEL_Y + NODE_H + ROW_RT_Y) / 2}
            x2={VIEW_W - 24}
            y2={(ROW_MODEL_Y + NODE_H + ROW_RT_Y) / 2}
            stroke="var(--border)"
            strokeWidth="1"
            strokeDasharray="3 5"
            opacity="0.5"
          />

          {/* ===== 步间箭头（先画，落在节点之下，不穿字）===== */}
          {/* ①→② 同泳道水平 */}
          <line
            x1={rightOf(N.see) + 2}
            y1={midYOf(N.see)}
            x2={leftOf(N.request) - 6}
            y2={midYOf(N.request)}
            stroke="var(--text-secondary)"
            strokeWidth="1.6"
            markerEnd="url(#aafct-arrow)"
            opacity="0.6"
          />
          {/* ②→③ 跨道：模型底 → 运行时顶（同一列，竖直向下） */}
          <line
            x1={cxOf(N.request)}
            y1={botOf(N.request) + 2}
            x2={cxOf(N.execute)}
            y2={topOf(N.execute) - 6}
            stroke="var(--text-secondary)"
            strokeWidth="1.6"
            markerEnd="url(#aafct-arrow)"
            opacity="0.6"
          />
          {/* ③→④ 同泳道水平 */}
          <line
            x1={rightOf(N.execute) + 2}
            y1={midYOf(N.execute)}
            x2={leftOf(N.feedback) - 6}
            y2={midYOf(N.feedback)}
            stroke="var(--text-secondary)"
            strokeWidth="1.6"
            markerEnd="url(#aafct-arrow)"
            opacity="0.6"
          />
          {/* ④→⑤ 跨道：运行时顶 → 模型底（同一列，竖直向上） */}
          <line
            x1={cxOf(N.feedback)}
            y1={topOf(N.feedback) - 2}
            x2={cxOf(N.answer)}
            y2={botOf(N.answer) + 6}
            stroke="var(--text-secondary)"
            strokeWidth="1.6"
            markerEnd="url(#aafct-arrow)"
            opacity="0.6"
          />

          {/* ===== 节点（无容器框：各节点独立 rect + 标题分组）===== */}
          {NODES.map((n) => renderNode(n))}
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="函数调用一回合：看工具清单 → 输出请求 → 外部执行 → 结果回灌 → 据此作答。可暂停、单步、拖进度。"
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        函数调用的本质：模型不亲自执行工具，它只输出「调哪个工具、传什么参数」的请求；真去执行、把结果塞回来的，永远是外部运行时——模型再据此作答。
      </figcaption>
    </figure>
  );
}
