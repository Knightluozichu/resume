"use client";

import { useRef } from "react";

import {
  TEACHING_BEAT_MS,
  TimelineControls,
} from "../anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "../anim/use-teaching-timeline";

/**
 * <BroadcastDispatchDiagram>：《Android 编程权威指南》background-network/broadcast-intents 章
 * 「广播 Intent 分发（fan-out）」配图（HEL-197）。
 *
 * 「可控教学动画」：随时间线走完一次广播从「发出」到「被所有注册者并行处理」的全过程——
 * 看清广播是怎样从一个发送者「一对多」散开到多个 BroadcastReceiver：
 *   ① 发送者 App 调 sendBroadcast(intent)（action = 自定义或系统如 BOOT_COMPLETED），
 *      Intent 卡片亮起 → ② 系统 ActivityManager / 广播总线收集所有注册了该 action 的
 *      Receiver（动态 registerReceiver + 静态 manifest 声明）一起高亮 → ③ 广播令牌从系统
 *      **并行分叉(fan-out)** 同时流向多个 Receiver → ④ 各 Receiver.onReceive() 被触发处理
 *      （三个接收者一起高亮）。
 *
 * 每步点亮「当前活跃元素」：节点步（①②④）淡入对应节点高亮层；流向步（fan-out）让多个
 * 「广播令牌」小圆点同时从系统沿各自有向边滑向各 Receiver + 边描边变亮，直观看清广播是
 * 一对多并行散开、而非一条线串下去。
 *
 * 时序照 ImplicitIntentResolutionDiagram / MvcDataFlowDiagram：步 i 的呈现占
 * [BEAT*i, BEAT*(i+1)]，label 落在呈现完成处 BEAT*(i+1)，离开时从该 label 起淡出
 * （最后一步 onReceive 停在亮态，表示三个接收者都已处理完成），杜绝单步 off-by-one。
 *
 * 为何 client：anime.js 时钟 + 受控控制条都是真交互。anime.js 经 useTeachingTimeline
 * 内部的动态 import("animejs") 切成独立 chunk（硬规则 2/6），本组件再经 mdx-components
 * 静态注册为客户端叶子，anime.js 绝不进首屏 / 公共 layout。
 *
 * 视觉：发送者=--accent、系统总线=--warning、Receiver=--success，全部 DESIGN token 配色
 * 无裸 hex；时长走 TEACHING_BEAT_MS 具名常量（硬规则 5）；几何常量具名且为 4 的倍数。
 */

// —— 画布与节点几何（全部 4 的倍数）。 ——
const VIEW_W = 680;
const VIEW_H = 400;

const NODE_W = 160;
const NODE_H = 64;
const RECV_W = 168;
const RECV_H = 56;
const RECV_GAP = 28; // 三个 Receiver 的纵向间隙

// 主链横排锚点：发送者 App（左）→ 系统广播总线（中）→ 三个 Receiver（右列）。
const APP = { x: 24, y: 168 };
const SYS = { x: 244, y: 160 };
const RECV_TOP = 56; // 第一个 Receiver 的顶边 y
const RECV_A = { x: 492, y: RECV_TOP };
const RECV_B = { x: 492, y: RECV_TOP + RECV_H + RECV_GAP };
const RECV_C = { x: 492, y: RECV_TOP + (RECV_H + RECV_GAP) * 2 };

// —— 节点定义（color 为该节点点亮时的语义色 token）。 ——
type Node = {
  id: string;
  title: string;
  /** 副标题（这个节点是什么 / 在干嘛）。 */
  sub: string;
  x: number;
  y: number;
  w: number;
  h: number;
  color: string;
};

const NODES: readonly Node[] = [
  {
    id: "app",
    title: "发送者 App",
    sub: "sendBroadcast(intent)",
    x: APP.x,
    y: APP.y,
    w: NODE_W,
    h: NODE_H,
    color: "var(--accent)",
  },
  {
    id: "system",
    title: "系统广播总线",
    sub: "ActivityManager 分发",
    x: SYS.x,
    y: SYS.y,
    w: NODE_W,
    h: NODE_H + 16,
    color: "var(--warning)",
  },
  {
    id: "recvA",
    title: "ReceiverA",
    sub: "动态 registerReceiver",
    x: RECV_A.x,
    y: RECV_A.y,
    w: RECV_W,
    h: RECV_H,
    color: "var(--success)",
  },
  {
    id: "recvB",
    title: "ReceiverB",
    sub: "静态 manifest 声明",
    x: RECV_B.x,
    y: RECV_B.y,
    w: RECV_W,
    h: RECV_H,
    color: "var(--success)",
  },
  {
    id: "recvC",
    title: "ReceiverC",
    sub: "静态 manifest 声明",
    x: RECV_C.x,
    y: RECV_C.y,
    w: RECV_W,
    h: RECV_H,
    color: "var(--success)",
  },
];

// —— 关键帧步骤（顺序即时间顺序；caption 供控制条朗读）。 ——
// 4 步知识点：① 发出 → ② 收集注册者 → ③ 并行分叉 fan-out → ④ onReceive 处理。
const STEPS: readonly TeachingStep[] = [
  {
    label: "send",
    caption:
      "① 发送者 App 调 sendBroadcast(intent)（action = 自定义如 DATA_LOADED，或系统广播如 BOOT_COMPLETED）",
  },
  {
    label: "collect",
    caption:
      "② 系统广播总线（ActivityManager）收集所有注册了该 action 的 Receiver：动态注册 + 静态 manifest 声明",
  },
  {
    label: "fan-out",
    caption:
      "③ 广播令牌从系统并行分叉（fan-out）同时流向每个匹配的 Receiver——一对多散开，不是一条线串下去",
  },
  {
    label: "receive",
    caption:
      "④ 各 Receiver 的 onReceive() 被触发处理（普通广播并行、无序；有序广播则按 priority 串行）",
  },
];

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((s) => [s.label, s.caption ?? s.label]),
);

// 节点中心 / 锚点（连线端点用）。
function center(n: Node) {
  return { cx: n.x + n.w / 2, cy: n.y + n.h / 2 };
}
const C_APP = center(NODES[0]);
const C_SYS = center(NODES[1]);
const C_RA = center(NODES[2]);
const C_RB = center(NODES[3]);
const C_RC = center(NODES[4]);

const EDGE_GAP = 4; // 端点离节点边框的留白（4 的倍数）

// —— 单边：发送者 App → 系统广播总线（横向，send 投递）。 ——
type Edge = {
  id: string;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  color: string;
};

const TO_SYSTEM: Edge = {
  id: "to-system",
  x1: NODES[0].x + NODES[0].w + EDGE_GAP,
  y1: C_APP.cy,
  x2: NODES[1].x - EDGE_GAP,
  y2: C_SYS.cy,
  color: "var(--accent)",
};

// —— 分叉边（fan-out 步用）：令牌从系统同时送向三个 Receiver。 ——
const FANOUT: readonly Edge[] = [
  {
    id: "fan-a",
    x1: NODES[1].x + NODES[1].w + EDGE_GAP,
    y1: C_SYS.cy,
    x2: NODES[2].x - EDGE_GAP,
    y2: C_RA.cy,
    color: "var(--success)",
  },
  {
    id: "fan-b",
    x1: NODES[1].x + NODES[1].w + EDGE_GAP,
    y1: C_SYS.cy,
    x2: NODES[3].x - EDGE_GAP,
    y2: C_RB.cy,
    color: "var(--success)",
  },
  {
    id: "fan-c",
    x1: NODES[1].x + NODES[1].w + EDGE_GAP,
    y1: C_SYS.cy,
    x2: NODES[4].x - EDGE_GAP,
    y2: C_RC.cy,
    color: "var(--success)",
  },
];

// 步 → 它点亮的单个节点 id（节点步）。流向步不在此表。
const STEP_NODE: Record<string, string> = {
  send: "app",
  collect: "system",
};

// 节点步里同时点亮的多个节点（receive 步同时点亮三个 Receiver）。
const STEP_NODES_MULTI: Record<string, readonly string[]> = {
  receive: ["recvA", "recvB", "recvC"],
};

export function BroadcastDispatchDiagram() {
  // 节点高亮层 + 单边描边 / 令牌 + 分叉边描边 / 令牌 的 DOM 引用，喂给 anime.js 驱动。
  const nodeHi = useRef<Record<string, SVGRectElement | null>>({});
  const edgeHi = useRef<Record<string, SVGLineElement | null>>({});
  const tokenHi = useRef<Record<string, SVGCircleElement | null>>({});

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      STEPS.forEach((step, i) => {
        // 步 i 的呈现占 [BEAT*i, BEAT*(i+1)]；lit = BEAT*(i+1) = 完全呈现时刻 = label i 锚点。
        const start = TEACHING_BEAT_MS * i;
        const lit = TEACHING_BEAT_MS * (i + 1);
        const isLast = i === STEPS.length - 1;

        const singleNode = STEP_NODE[step.label];
        const multiNodes = STEP_NODES_MULTI[step.label];

        if (step.label === "fan-out") {
          // —— 分叉流向步：广播令牌从系统同时流向三个 Receiver（先让单边令牌从 App→系统也走一遍，强调投递）——
          // 投递段（App → 系统）：令牌沿 to-system 边滑动 + 描边淡亮。
          {
            const edge = edgeHi.current[TO_SYSTEM.id];
            const token = tokenHi.current[TO_SYSTEM.id];
            if (edge) {
              tl.add(
                edge,
                {
                  opacity: [0.2, 1],
                  duration: TEACHING_BEAT_MS * 0.5,
                  ease: "out(2)",
                },
                start,
              );
            }
            if (token) {
              tl.add(
                token,
                {
                  opacity: [0, 1, 1, 0],
                  cx: [TO_SYSTEM.x1, TO_SYSTEM.x2],
                  cy: [TO_SYSTEM.y1, TO_SYSTEM.y2],
                  duration: TEACHING_BEAT_MS * 0.5,
                  ease: "inOut(2)",
                },
                start,
              );
            }
            if (edge) {
              tl.add(
                edge,
                {
                  opacity: [1, 0.2],
                  duration: TEACHING_BEAT_MS * 0.5,
                  ease: "in(2)",
                },
                start + TEACHING_BEAT_MS * 0.5,
              );
            }
          }
          // 分叉段（系统 → 三个 Receiver）：三个令牌并行滑动 + 各边描边淡亮。
          FANOUT.forEach((e) => {
            const edge = edgeHi.current[e.id];
            const token = tokenHi.current[e.id];
            if (edge) {
              tl.add(
                edge,
                {
                  opacity: [0.2, 1],
                  duration: TEACHING_BEAT_MS * 0.5,
                  ease: "out(2)",
                },
                start + TEACHING_BEAT_MS * 0.5,
              );
            }
            if (token) {
              tl.add(
                token,
                {
                  opacity: [0, 1, 1, 0],
                  cx: [e.x1, e.x2],
                  cy: [e.y1, e.y2],
                  duration: TEACHING_BEAT_MS * 0.5,
                  ease: "inOut(2)",
                },
                start + TEACHING_BEAT_MS * 0.5,
              );
            }
            if (edge && !isLast) {
              tl.add(
                edge,
                {
                  opacity: [1, 0.2],
                  duration: TEACHING_BEAT_MS * 0.5,
                  ease: "in(2)",
                },
                lit,
              );
            }
          });
          tl.label(step.label, lit);
        } else if (singleNode || multiNodes) {
          // —— 节点步：淡入一个或多个节点高亮层 ——
          const ids = multiNodes ?? [singleNode as string];
          ids.forEach((id) => {
            const el = nodeHi.current[id];
            if (!el) return;
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
            if (!isLast) {
              tl.add(
                el,
                {
                  opacity: [1, 0.18],
                  duration: TEACHING_BEAT_MS * 0.5,
                  ease: "in(2)",
                },
                lit,
              );
            }
          });
          tl.label(step.label, lit);
        } else {
          tl.label(step.label, lit);
        }
      });
    },
  });

  // 渲染用：单边 + 分叉边合并成一个可遍历的有向边列表（常驻底线 + 高亮线 + 令牌）。
  const animatedEdges: readonly Edge[] = [TO_SYSTEM, ...FANOUT];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="rounded-card border border-border bg-elevated p-6">
        {/* ⚡ 可交互标签（与站内 Demo 容器气质一致） */}
        <div className="mb-4">
          <span className="inline-flex items-center gap-1 rounded-control border border-border px-2 py-1 text-xs font-medium text-accent">
            <span aria-hidden="true">⚡</span>
            可交互
          </span>
        </div>

        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="广播 Intent 分发（fan-out）过程。左侧是「发送者 App」（调用 sendBroadcast），中间是「系统广播总线」（由 ActivityManager 负责分发），右侧是三个 BroadcastReceiver：ReceiverA 用动态 registerReceiver 在代码中注册，ReceiverB 与 ReceiverC 用静态 manifest 声明。分发分四步：① 发送者 App 调 sendBroadcast(intent)，action 可以是自定义动作如 DATA_LOADED，也可以是系统广播如 BOOT_COMPLETED；② 系统广播总线收集所有注册了该 action 的 Receiver，动态注册与静态声明的都一并收集并高亮；③ 广播令牌从系统并行分叉，同时流向每个匹配的 Receiver，是一对多散开而不是一条线串下去；④ 各 Receiver 的 onReceive 被触发处理，三个接收者一起高亮。普通广播是并行且无序分发，有序广播则用 sendOrderedBroadcast 按 priority 从高到低串行执行、可中途调用 abortBroadcast 中断。另需注意 Android 8.0 以上大部分隐式广播不能再静态 manifest 注册，需改用动态注册。播放时按此顺序依次点亮当前活跃节点，或让广播令牌沿有向边从发送者流向系统、再由系统并行分叉流向各 Receiver，可播放、暂停、单步、拖动进度逐帧观察广播是如何被系统一对多分发的。"
          className="mx-auto block h-auto w-full max-w-[680px]"
        >
          <defs>
            <marker
              id="bcd-arrow-accent"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
            >
              <path d="M0 0 L6 3 L0 6 z" fill="var(--accent)" />
            </marker>
            <marker
              id="bcd-arrow-success"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
            >
              <path d="M0 0 L6 3 L0 6 z" fill="var(--success)" />
            </marker>
          </defs>

          {/* —— 动态有向边（常驻低对比底线 + anime.js 点亮的高亮线 + 广播令牌）—— */}
          {animatedEdges.map((e) => {
            const isSuccess = e.color === "var(--success)";
            const marker = isSuccess
              ? "url(#bcd-arrow-success)"
              : "url(#bcd-arrow-accent)";
            return (
              <g key={e.id}>
                {/* 底线（常驻、低对比） */}
                <line
                  x1={e.x1}
                  y1={e.y1}
                  x2={e.x2}
                  y2={e.y2}
                  stroke="var(--text-secondary)"
                  strokeWidth="1.4"
                  markerEnd={marker}
                  opacity="0.45"
                />
                {/* 高亮线（默认半灭，该步淡亮） */}
                <line
                  ref={(el) => {
                    edgeHi.current[e.id] = el;
                  }}
                  x1={e.x1}
                  y1={e.y1}
                  x2={e.x2}
                  y2={e.y2}
                  stroke={e.color}
                  strokeWidth="2.4"
                  markerEnd={marker}
                  opacity="0.2"
                />
                {/* 广播令牌（默认隐形，fan-out 步沿线滑过） */}
                <circle
                  ref={(el) => {
                    tokenHi.current[e.id] = el;
                  }}
                  cx={e.x1}
                  cy={e.y1}
                  r="6"
                  fill={e.color}
                  opacity="0"
                />
              </g>
            );
          })}

          {/* —— 节点：底框 + 高亮层（anime.js 驱动，节点步）+ 文字 —— */}
          {NODES.map((n) => {
            const isRecv =
              n.id === "recvA" || n.id === "recvB" || n.id === "recvC";
            const titleSize = isRecv ? 13 : 14;
            return (
              <g key={n.id}>
                {/* 底框（常驻、低对比） */}
                <rect
                  x={n.x}
                  y={n.y}
                  width={n.w}
                  height={n.h}
                  rx="8"
                  fill="var(--bg)"
                  stroke="var(--border)"
                  strokeWidth="1.2"
                />
                {/* 高亮层：默认灭，节点步淡入 + 描边变色 */}
                <rect
                  ref={(el) => {
                    nodeHi.current[n.id] = el;
                  }}
                  x={n.x}
                  y={n.y}
                  width={n.w}
                  height={n.h}
                  rx="8"
                  fill={n.color}
                  fillOpacity="0.12"
                  stroke={n.color}
                  strokeWidth="2"
                  opacity="0"
                  style={{ transformBox: "fill-box", transformOrigin: "center" }}
                />
                {/* 标题 */}
                <text
                  x={n.x + n.w / 2}
                  y={n.y + n.h / 2 - 4}
                  textAnchor="middle"
                  fontSize={titleSize}
                  fontWeight="700"
                  fill={n.color}
                >
                  {n.title}
                </text>
                {/* 副标题 */}
                <text
                  x={n.x + n.w / 2}
                  y={n.y + n.h / 2 + 14}
                  textAnchor="middle"
                  fontSize="9.5"
                  fontFamily="var(--font-mono)"
                  fill="var(--text-secondary)"
                >
                  {n.sub}
                </text>
              </g>
            );
          })}

          {/* —— Intent 卡片（钉在 App 上方，强调「广播携带 action」）—— */}
          <g>
            <rect
              x={APP.x}
              y={APP.y - 88}
              width={NODE_W}
              height={72}
              rx="8"
              fill="var(--bg)"
              stroke="var(--accent)"
              strokeWidth="1.2"
              opacity="0.9"
            />
            <text
              x={APP.x + 12}
              y={APP.y - 68}
              fontSize="10"
              fontWeight="700"
              fill="var(--accent)"
            >
              广播 Intent
            </text>
            <text
              x={APP.x + 12}
              y={APP.y - 52}
              fontSize="9.5"
              fontFamily="var(--font-mono)"
              fill="var(--text-primary)"
            >
              action = DATA_LOADED
            </text>
            <text
              x={APP.x + 12}
              y={APP.y - 38}
              fontSize="9.5"
              fontFamily="var(--font-mono)"
              fill="var(--text-primary)"
            >
              或 BOOT_COMPLETED
            </text>
          </g>

          {/* —— 系统总线处的「收集所有匹配 action 的 Receiver」提示（钉在系统节点上方）—— */}
          <text
            x={SYS.x + NODE_W / 2}
            y={SYS.y - 12}
            textAnchor="middle"
            fontSize="10"
            fontWeight="600"
            fill="var(--warning)"
          >
            收集所有匹配 action 的 Receiver
          </text>

          {/* —— 普通广播 vs 有序广播 对比标注（钉在右下角空白处）—— */}
          <g>
            <text
              x={SYS.x + NODE_W / 2}
              y={VIEW_H - 56}
              textAnchor="middle"
              fontSize="10.5"
              fontWeight="600"
              fill="var(--success)"
            >
              普通广播：sendBroadcast → 并行、无序
            </text>
            <text
              x={SYS.x + NODE_W / 2}
              y={VIEW_H - 38}
              textAnchor="middle"
              fontSize="10.5"
              fontWeight="600"
              fill="var(--warning)"
            >
              有序广播：sendOrderedBroadcast → 按 priority 串行、可 abort 中断
            </text>
            <text
              x={SYS.x + NODE_W / 2}
              y={VIEW_H - 16}
              textAnchor="middle"
              fontSize="9.5"
              fill="var(--text-secondary)"
            >
              Android 8.0+：大部分隐式广播不能再静态 manifest 注册（需动态）
            </text>
          </g>

          {/* —— 步骤序号标注（小而稳，常驻，帮读者把动画与第几步对齐）—— */}
          <text
            x={APP.x + NODE_W / 2}
            y={APP.y + NODE_H + 18}
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill="var(--accent)"
          >
            ① 发出
          </text>
          <text
            x={SYS.x + NODE_W / 2}
            y={SYS.y + NODES[1].h + 18}
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill="var(--warning)"
          >
            ② 收集 · ③ 分叉
          </text>
          <text
            x={RECV_A.x + RECV_W / 2}
            y={RECV_A.y - 8}
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill="var(--success)"
          >
            ④ onReceive
          </text>
        </svg>

        {/* 控制条原语：播放/暂停/单步/拖进度 + 当前步文案 */}
        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="点击播放，看一条广播如何从发送者发出、经系统总线收集注册者、并行分叉(fan-out)到多个 Receiver、最后触发各自 onReceive；可暂停、单步、拖进度逐帧观察。"
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        广播 Intent 分发（fan-out）：发送者 sendBroadcast → 系统广播总线收集所有注册了该
        action 的 Receiver（动态 + 静态）→ 广播令牌并行分叉同时流向多个 Receiver →
        各 onReceive 处理。普通广播并行无序；有序广播按 priority 串行、可中断。
      </figcaption>
    </figure>
  );
}
