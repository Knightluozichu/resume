"use client";

import dynamic from "next/dynamic";
import { useRef } from "react";

import { TEACHING_BEAT_MS, TimelineControls } from "../anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "../anim/use-teaching-timeline";

/**
 * <AgentLoopDiagram>：AI Agent「感知 → 决策 → 行动 → 观察」循环（Agent Loop）的旗舰
 * 「可控教学动画」（HEL-253，《什么是 AI Agent》篇1·1）。
 *
 * 全书隐喻：AI Agent = 私人助理「小特」。这张图以一桩具体差事——「帮老板订明天去上海的
 * 高铁票」——串起小特一圈循环干活的全过程：
 *   ① 感知 Perceive：读取差事条件（明天上海、预算 500、要上午到）→
 *   ② 决策 Decide：比价后决定订哪一班（G1 次 7:30）→
 *   ③ 行动 Act：调用 12306 订票工具下单 →
 *   ④ 观察 Observe：确认出票成功，差事完成（再回到感知，开始下一圈）。
 *
 * 环形四节点（顶=感知、右=决策、底=行动、左=观察），中心钉「当前差事」卡片；一个沿环
 * 移动的「令牌」小圆点随步骤滑到当前节点旁，配合当前节点高亮（描边 + 填充 + 放大）。
 *
 * 时序铁律照 ComponentWorkflowDiagram / MessageLoopDiagram：步 i 的呈现占
 * [BEAT*i, BEAT*(i+1)]，tl.label(name, BEAT*(i+1)) 落在「当前节点点亮完成」时刻，杜绝
 * 单步 off-by-one；最后一步（观察）停在亮态表示「一圈走完、差事达成」。
 *
 * 为何 client：anime.js 时钟 + 受控控制条都是真交互。anime.js 经 useTeachingTimeline
 * 内部的动态 import("animejs") 切成独立 chunk（硬规则 2/6）；本文件再用 next/dynamic
 * (ssr:false) 把叶子组件包成「动态边界」懒加载导出，anime.js 绝不进首屏 / 公共 layout。
 *
 * 视觉：全部 DESIGN token 配色（accent / success / warning / border / text-*），无裸 hex；
 * 时长走 TEACHING_BEAT_MS 具名常量，几何常量具名且为 4 的倍数，无散落魔法数字（硬规则 5）。
 */

// —— 画布与环形几何（节点 132×54、单一坐标公式，半径足够，节点距边 ≥12px）。 ——
const VIEW_W = 560;
const VIEW_H = 410;

const CENTER_X = 280; // 圆心 x
const CENTER_Y = 205; // 圆心 y
const RADIUS = 160; // 环半径（撑大环以提升 viewBox 利用率）

const NODE_W = 132;
const NODE_H = 54;

/**
 * 环上节点：angle 为「从圆心指向节点中心」的方向角（度，0°=正右、顺时针为正）。
 * 节点中心坐标用单一公式由 angle + RADIUS 算出，禁止两套坐标算法。
 *   顶(感知)=-90° → (320,80)、右(决策)=0° → (445,205)、
 *   底(行动)=90° → (320,330)、左(观察)=180° → (195,205)。
 */
type LoopNode = {
  /** anime.js timeline label = 关键帧锚点（与 STEPS 对应）。 */
  id: string;
  /** 节点主标题（环节中文名 + 英文）。 */
  title: string;
  /** 副标题：这一桩订票差事里，这个环节具体在干嘛。 */
  sub: string;
  /** 方向角（度）。 */
  angle: number;
  /** 高亮色 token（点亮时描边 + 文字 + 令牌用此色）。 */
  color: string;
};

const NODES: readonly LoopNode[] = [
  {
    id: "perceive",
    title: "感知 Perceive",
    sub: "读取差事条件",
    angle: -90,
    color: "var(--accent)",
  },
  {
    id: "decide",
    title: "决策 Decide",
    sub: "想清楚下一步",
    angle: 0,
    color: "var(--warning)",
  },
  {
    id: "act",
    title: "行动 Act",
    sub: "调工具去执行",
    angle: 90,
    color: "var(--accent)",
  },
  {
    id: "observe",
    title: "观察 Observe",
    sub: "看结果对不对",
    angle: 180,
    color: "var(--success)",
  },
];

/** 单一坐标公式：节点中心由方向角 + 半径算出。 */
function nodeCenter(n: LoopNode): { cx: number; cy: number } {
  const rad = (n.angle * Math.PI) / 180;
  return {
    cx: CENTER_X + RADIUS * Math.cos(rad),
    cy: CENTER_Y + RADIUS * Math.sin(rad),
  };
}

const NODE_GEOM = NODES.map((n) => {
  const { cx, cy } = nodeCenter(n);
  return { ...n, cx, cy, x: cx - NODE_W / 2, y: cy - NODE_H / 2 };
});

// —— 关键帧步骤（顺序即时间顺序；caption 供控制条朗读，用具体订票例子串成一圈）。 ——
const STEPS: readonly TeachingStep[] = [
  {
    label: "perceive",
    caption:
      "① 感知：读取这桩差事——明天去上海、预算 500、要上午到。小特先把「现在的处境」看清楚",
  },
  {
    label: "decide",
    caption:
      "② 决策：比对几趟车的时刻与票价后，小特（用大脑 LLM）决定订 G1 次 7:30 那班",
  },
  {
    label: "act",
    caption:
      "③ 行动：小特调用 12306 订票工具，真正下单——这一步会改变外部世界（出了一张票）",
  },
  {
    label: "observe",
    caption:
      "④ 观察：小特读回执，确认出票成功、差事达成。若没订上，就带着新信息回到①再走一圈",
  },
];

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((s) => [s.label, s.caption ?? s.label]),
);

// 令牌（沿环移动的小圆点）停在某节点旁时的位置：节点中心朝圆心方向内移 TOKEN_INSET。
const TOKEN_INSET = 40;
function tokenPos(g: (typeof NODE_GEOM)[number]): { tx: number; ty: number } {
  const rad = (g.angle * Math.PI) / 180;
  return {
    tx: CENTER_X + (RADIUS - TOKEN_INSET) * Math.cos(rad),
    ty: CENTER_Y + (RADIUS - TOKEN_INSET) * Math.sin(rad),
  };
}

function AgentLoopDiagramInner() {
  // 各节点高亮层 + 沿环移动令牌的 DOM 引用，喂给 anime.js 驱动。
  const nodeHi = useRef<Record<string, SVGRectElement | null>>({});
  const tokenRef = useRef<SVGCircleElement | null>(null);

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      STEPS.forEach((step, i) => {
        // 步 i 的呈现占 [BEAT*i, BEAT*(i+1)]；lit = BEAT*(i+1) = 点亮完成 = label i 锚点。
        const start = TEACHING_BEAT_MS * i;
        const lit = TEACHING_BEAT_MS * (i + 1);
        const isLast = i === STEPS.length - 1;

        const g = NODE_GEOM[i];
        const el = nodeHi.current[step.label];
        if (el) {
          // 点亮当前节点高亮层（淡入 + 轻微放大）。
          tl.add(
            el,
            {
              opacity: [0, 1],
              scale: [0.94, 1],
              duration: TEACHING_BEAT_MS,
              ease: "out(3)",
            },
            start,
          );
        }
        // 令牌滑到当前节点旁（沿环移动）。
        if (tokenRef.current) {
          const { tx, ty } = tokenPos(g);
          tl.add(
            tokenRef.current,
            {
              cx: tx,
              cy: ty,
              opacity: [start === 0 ? 0 : 1, 1],
              duration: TEACHING_BEAT_MS,
              ease: "inOut(2)",
            },
            start,
          );
        }
        // label 落在点亮完成处。
        tl.label(step.label, lit);
        // 离开时淡灭当前节点高亮（最后一步停在亮态，表示一圈走完）。
        if (el && !isLast) {
          tl.add(
            el,
            {
              opacity: [1, 0.16],
              duration: TEACHING_BEAT_MS * 0.5,
              ease: "in(2)",
            },
            lit,
          );
        }
      });
    },
  });

  // 首帧令牌停在感知节点旁。
  const firstTok = tokenPos(NODE_GEOM[0]);

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
          aria-label="AI Agent 的「感知 → 决策 → 行动 → 观察」循环（Agent Loop），用私人助理小特帮老板订明天去上海的高铁票这桩差事串起来。画面是一个环形：顶部节点是感知 Perceive，右侧是决策 Decide，底部是行动 Act，左侧是观察 Observe，四个节点首尾相接形成一个顺时针的环，环中心钉着一张写着当前差事「帮老板订明天去上海的高铁票」的卡片，一个令牌小圆点沿环移动指示当前所处环节。循环分四步：① 感知，小特读取这桩差事的条件——明天去上海、预算 500、要上午到，先把现在的处境看清楚；② 决策，小特用它的大脑 LLM 比对几趟车的时刻与票价，决定订 G1 次 7:30 那班；③ 行动，小特调用 12306 订票工具真正下单，这一步会改变外部世界，出了一张票；④ 观察，小特读取回执确认出票成功、差事达成，如果没订上就带着新信息回到第①步再走一圈。播放时按此顺序依次点亮当前环节节点，令牌随之沿环滑动，可播放、暂停、单步、拖动进度逐帧观察这一圈感知-决策-行动-观察的循环。"
          className="mx-auto block h-auto w-full max-w-[560px]"
        >
          <defs>
            <marker
              id="agl-arrow"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
            >
              <path d="M0 0 L6 3 L0 6 z" fill="var(--text-secondary)" />
            </marker>
          </defs>

          {/* —— 环形连接弧（顺时针：感知→决策→行动→观察→回感知）—— */}
          {NODE_GEOM.map((g, i) => {
            const next = NODE_GEOM[(i + 1) % NODE_GEOM.length];
            // 端点从节点边缘起，沿连接方向略缩进，留箭头空间。
            const dx = next.cx - g.cx;
            const dy = next.cy - g.cy;
            const len = Math.hypot(dx, dy);
            const ux = dx / len;
            const uy = dy / len;
            const x1 = g.cx + ux * (NODE_W / 2 - 8);
            const y1 = g.cy + uy * (NODE_H / 2 + 4);
            const x2 = next.cx - ux * (NODE_W / 2 + 8);
            const y2 = next.cy - uy * (NODE_H / 2 + 4);
            // 用一段朝外凸的弧线（sweep=1 顺时针绕圆心）连两节点，呈环形观感。
            return (
              <path
                key={`arc-${g.id}`}
                d={`M ${x1} ${y1} A ${RADIUS} ${RADIUS} 0 0 1 ${x2} ${y2}`}
                fill="none"
                stroke="var(--text-secondary)"
                strokeWidth="1.6"
                markerEnd="url(#agl-arrow)"
                opacity="0.55"
              />
            );
          })}

          {/* —— 中心「当前差事」卡片 —— */}
          <g>
            <rect
              x={CENTER_X - 88}
              y={CENTER_Y - 30}
              width={176}
              height={60}
              rx="10"
              fill="var(--bg)"
              stroke="var(--accent)"
              strokeWidth="1.4"
              strokeDasharray="5 4"
            />
            <text
              x={CENTER_X}
              y={CENTER_Y - 8}
              textAnchor="middle"
              fontSize="10"
              fontWeight="600"
              fill="var(--text-secondary)"
            >
              当前差事
            </text>
            <text
              x={CENTER_X}
              y={CENTER_Y + 12}
              textAnchor="middle"
              fontSize="11.5"
              fontWeight="700"
              fill="var(--accent)"
            >
              订明天去上海的高铁票
            </text>
          </g>

          {/* —— 沿环移动的令牌（默认在感知节点旁，随步骤滑动）—— */}
          <circle
            ref={(el) => {
              tokenRef.current = el;
            }}
            cx={firstTok.tx}
            cy={firstTok.ty}
            r="7"
            fill="var(--accent)"
            opacity="0"
          />

          {/* —— 四个环节节点：底框 + 高亮层（anime.js 驱动）+ 文字 —— */}
          {NODE_GEOM.map((g) => (
            <g key={g.id}>
              {/* 底框（常驻、低对比） */}
              <rect
                x={g.x}
                y={g.y}
                width={NODE_W}
                height={NODE_H}
                rx="10"
                fill="var(--bg)"
                stroke="var(--border)"
                strokeWidth="1.2"
              />
              {/* 高亮层：默认灭，当前步淡入 + 描边变色 + 放大 */}
              <rect
                ref={(el) => {
                  nodeHi.current[g.id] = el;
                }}
                x={g.x}
                y={g.y}
                width={NODE_W}
                height={NODE_H}
                rx="10"
                fill={g.color}
                fillOpacity="0.12"
                stroke={g.color}
                strokeWidth="2.2"
                opacity="0"
                style={{ transformBox: "fill-box", transformOrigin: "center" }}
              />
              {/* 主标题 */}
              <text
                x={g.cx}
                y={g.cy - 3}
                textAnchor="middle"
                fontSize="13"
                fontWeight="700"
                fill={g.color}
              >
                {g.title}
              </text>
              {/* 副标题 */}
              <text
                x={g.cx}
                y={g.cy + 14}
                textAnchor="middle"
                fontSize="10"
                fill="var(--text-secondary)"
              >
                {g.sub}
              </text>
            </g>
          ))}
        </svg>

        {/* 控制条原语：播放/暂停/单步/拖进度 + 当前步文案 */}
        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="点击播放，看小特走一圈：感知差事 → 决策订哪班 → 调工具下单 → 观察出票结果；可暂停、单步、拖进度逐帧观察这条「感知-决策-行动-观察」循环。"
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Agent Loop：私人助理小特拿到「订高铁票」这桩差事后，一圈圈地 感知 → 决策
        → 行动 → 观察 地干活——这条循环正是 Agent
        区别于「只答一次话」的根本所在。
      </figcaption>
    </figure>
  );
}

/**
 * 动态边界：把 anime.js 叶子组件经 next/dynamic(ssr:false) 懒加载，确保 anime.js 这条
 * 重交互链路绝不进首屏 / 公共 layout（硬规则 2/6）。导出名供 mdx-components 注册。
 */
const AgentLoopDynamic = dynamic(() => Promise.resolve(AgentLoopDiagramInner), {
  ssr: false,
  loading: () => (
    <div className="mdx-figure not-prose mx-auto my-6 rounded-card border border-border bg-elevated p-6">
      <div className="flex min-h-72 items-center justify-center text-center">
        <p className="text-sm text-secondary">Agent 循环动画加载中…</p>
      </div>
    </div>
  ),
});

export function AgentLoopDiagram() {
  return <AgentLoopDynamic />;
}
