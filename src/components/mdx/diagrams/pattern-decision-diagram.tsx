"use client";

import { useRef } from "react";

import { TEACHING_BEAT_MS, TimelineControls } from "../anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "../anim/use-teaching-timeline";

/**
 * <PatternDecisionDiagram>：决策框架——先问几个问题，只在需要时才加自主性（HEL-321，第 11 章主 viz）。
 *
 * 「可控教学动画」：拿到一个任务，沿一条决策树一步步走，演出「上不上 agent」是怎么决定的——
 *   ① 起点：来了一个任务，先别急着上 agent。
 *   ② 第一问：任务可预测、步数固定吗？
 *   ③ 是 → 走「工作流」分支：路径写死就够，甚至纯代码更稳更省（落到绿色「工作流」终点）。
 *   ④ 否（开放 / 步数不定 / 要随机应变）→ 走「自主 agent」分支（落到紫色「agent」终点）。
 *   ⑤ 收口结论：能简单别复杂——从最简单的方案起步，只在确实需要时才加自主性。
 *
 * 几何稳定策略（杜绝位移/重排）：所有节点（起点 / 判断菱形 / 两条分支边 / 两个终点 / 结论条）
 * 位置固定、各持 ref，全程只切 opacity 淡入；最后一步两终点 + 结论同时亮、停在亮态。
 * 照 multi-turn-loop / tool-error-recovery 的「只动 opacity」铁律。
 *
 * 时序铁律照黄金范例：步 i 的呈现占 [BEAT*i, BEAT*(i+1)]，
 * tl.label(name, BEAT*(i+1)) 落在呈现完成处，最后一步停在亮态不淡出（杜绝 off-by-one）。
 *
 * 为何 client：anime.js 时钟 + 受控控制条都是真交互。anime.js 经 useTeachingTimeline
 * 内部的动态 import("animejs") 切成独立 chunk（硬规则 2/6），本组件再经 mdx-components
 * 静态注册为客户端叶子，anime.js 绝不进首屏 / 公共 layout。
 *
 * 视觉：全部 DESIGN token 配色，无裸 hex；时长走 TEACHING_BEAT_MS 具名常量，
 * 几何布局常量均具名、为 4 的倍数（硬规则 5）。
 */

// —— 整体画布。 ——
const VIEW_W = 720;
const VIEW_H = 472;

// 透明度常量（具名，禁魔法数字）。
const SHOWN = 1;
const HIDDEN = 0;

// —— 起点卡（顶部居中）。 ——
const START_W = 280;
const START_H = 48;
const START_X = (VIEW_W - START_W) / 2; // 220
const START_Y = 56;
const START_CX = VIEW_W / 2; // 360
const START_BOTTOM = START_Y + START_H; // 104

// —— 判断菱形（中部居中）。 ——
const DIA_CX = VIEW_W / 2; // 360
const DIA_CY = 196;
const DIA_HW = 132; // 半宽
const DIA_HH = 52; // 半高
const DIA_TOP = DIA_CY - DIA_HH; // 144
const DIA_BOTTOM = DIA_CY + DIA_HH; // 248
const DIA_LEFT = DIA_CX - DIA_HW; // 228
const DIA_RIGHT = DIA_CX + DIA_HW; // 492

// —— 两个终点卡（底部左右）。 ——
const END_W = 264;
const END_H = 88;
const END_Y = 308;
const END_LEFT_X = 32; // 距左 32 ≥14
const END_RIGHT_X = VIEW_W - END_W - 32; // 424，距右 32 ≥14
const END_LEFT_CX = END_LEFT_X + END_W / 2; // 164
const END_RIGHT_CX = END_RIGHT_X + END_W / 2; // 556

// —— 结论条（最底部居中）。 ——
const CONC_W = 600;
const CONC_H = 40;
const CONC_X = (VIEW_W - CONC_W) / 2; // 60
const CONC_Y = 416; // 底 = 456 → 距底 16

type DecisionStep = TeachingStep & {
  /** 起点卡亮。 */
  start: boolean;
  /** 判断菱形亮。 */
  diamond: boolean;
  /** 左分支（→工作流）边 + 终点亮。 */
  leftBranch: boolean;
  /** 右分支（→agent）边 + 终点亮。 */
  rightBranch: boolean;
  /** 底部结论条亮。 */
  conclusion: boolean;
};

const STEPS: readonly DecisionStep[] = [
  {
    label: "task",
    caption:
      "① 来了一个任务——别急着上 agent。先问自己几个问题，再决定用哪种方案。",
    start: true,
    diamond: false,
    leftBranch: false,
    rightBranch: false,
    conclusion: false,
  },
  {
    label: "ask",
    caption:
      "② 第一问，也是最关键的一问：这个任务「可预测、步数固定」吗？每次要做的步骤、走的路，是不是写代码时就能定死？",
    start: true,
    diamond: true,
    leftBranch: false,
    rightBranch: false,
    conclusion: false,
  },
  {
    label: "yes-workflow",
    caption:
      "③ 是 → 走左边：用「工作流」就够了，路径写死最稳；很多时候连 LLM 都不用，纯代码更省更可靠。能不上 agent，就别上。",
    start: true,
    diamond: true,
    leftBranch: true,
    rightBranch: false,
    conclusion: false,
  },
  {
    label: "no-agent",
    caption:
      "④ 否（任务开放、步数不定、要随机应变、没法预先把路写死）→ 走右边：这才值得上自主 agent，让 LLM 在循环里自己决定下一步。",
    start: true,
    diamond: true,
    leftBranch: true,
    rightBranch: true,
    conclusion: false,
  },
  {
    label: "principle",
    caption:
      "⑤ 一句话收口：先用最简单的方案，只在确实需要时才加自主性。能用代码 / 工作流解决，就别硬上 agent——自主性是把双刃剑，能省则省。",
    start: true,
    diamond: true,
    leftBranch: true,
    rightBranch: true,
    conclusion: true,
  },
];

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((s) => [s.label, s.caption ?? s.label]),
);

export function PatternDecisionDiagram() {
  const startRef = useRef<SVGGElement | null>(null);
  const diamondRef = useRef<SVGGElement | null>(null);
  const leftRef = useRef<SVGGElement | null>(null);
  const rightRef = useRef<SVGGElement | null>(null);
  const concRef = useRef<SVGGElement | null>(null);

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      const fade = (el: SVGGElement | null, on: boolean, start: number) => {
        if (!el) return;
        tl.add(
          el,
          {
            opacity: on ? SHOWN : HIDDEN,
            duration: TEACHING_BEAT_MS,
            ease: "inOut(2)",
          },
          start,
        );
      };

      STEPS.forEach((step, i) => {
        const start = TEACHING_BEAT_MS * i;
        const lit = TEACHING_BEAT_MS * (i + 1);

        fade(startRef.current, step.start, start);
        fade(diamondRef.current, step.diamond, start);
        fade(leftRef.current, step.leftBranch, start);
        fade(rightRef.current, step.rightBranch, start);
        fade(concRef.current, step.conclusion, start);

        tl.label(step.label, lit);
      });
    },
  });

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
          aria-label="决策框架动画：拿到一个任务，先问几个问题、只在需要时才加自主性，共五步。第一步，来了一个任务，别急着上 agent，先问自己几个问题再决定用哪种方案。第二步，第一问也是最关键的一问：这个任务「可预测、步数固定」吗？每次要做的步骤、走的路，是不是写代码时就能定死？第三步，如果回答「是」，就走左边分支：用工作流就够了，路径写死最稳；很多时候连 LLM 都不用，纯代码更省更可靠——能不上 agent 就别上。第四步，如果回答「否」，也就是任务开放、步数不定、要随机应变、没法预先把路写死，就走右边分支：这才值得上自主 agent，让 LLM 在循环里自己决定下一步。第五步，一句话收口：先用最简单的方案，只在确实需要时才加自主性，能用代码或工作流解决就别硬上 agent。核心结论：选方案的正确姿势是从最简单的方案起步、按任务回答几个问题，只有当任务确实开放、不可预测时才往上加自主性，能简单别复杂。可以播放、暂停、单步、拖动进度逐帧观察。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <defs>
            <marker
              id="pdd-arrow"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="7"
              markerHeight="7"
              orient="auto"
            >
              <path d="M0 0 L10 5 L0 10 z" fill="var(--text-secondary)" />
            </marker>
            <marker
              id="pdd-arrow-ok"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="7"
              markerHeight="7"
              orient="auto"
            >
              <path d="M0 0 L10 5 L0 10 z" fill="var(--success)" />
            </marker>
            <marker
              id="pdd-arrow-ac"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="7"
              markerHeight="7"
              orient="auto"
            >
              <path d="M0 0 L10 5 L0 10 z" fill="var(--accent)" />
            </marker>
          </defs>

          {/* —— 顶部小标题 —— */}
          <text
            x={VIEW_W / 2}
            y={28}
            textAnchor="middle"
            fontSize="13"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            点播放：看「上不上 agent」是怎么一步步问出来的
          </text>

          {/* ===== 起点卡（第①步起亮）===== */}
          <g
            ref={(el) => {
              startRef.current = el;
            }}
            opacity={HIDDEN}
          >
            <rect
              x={START_X}
              y={START_Y}
              width={START_W}
              height={START_H}
              rx="10"
              fill="var(--bg)"
              stroke="var(--border)"
              strokeWidth="1.6"
            />
            <text
              x={START_CX}
              y={START_Y + START_H / 2 + 5}
              textAnchor="middle"
              fontSize="13"
              fontWeight="700"
              fill="var(--text-primary)"
            >
              📋 来了一个任务（先别急着上 agent）
            </text>
          </g>

          {/* —— 起点 → 菱形 连线（常驻暗线）—— */}
          <line
            x1={START_CX}
            y1={START_BOTTOM}
            x2={DIA_CX}
            y2={DIA_TOP - 2}
            stroke="var(--text-secondary)"
            strokeWidth="1.4"
            opacity="0.5"
            markerEnd="url(#pdd-arrow)"
          />

          {/* ===== 判断菱形（第②步起亮）===== */}
          <g
            ref={(el) => {
              diamondRef.current = el;
            }}
            opacity={HIDDEN}
          >
            <polygon
              points={`${DIA_CX},${DIA_TOP} ${DIA_RIGHT},${DIA_CY} ${DIA_CX},${DIA_BOTTOM} ${DIA_LEFT},${DIA_CY}`}
              fill="var(--accent-glow)"
              stroke="var(--accent)"
              strokeWidth="1.8"
            />
            <text
              x={DIA_CX}
              y={DIA_CY - 6}
              textAnchor="middle"
              fontSize="13"
              fontWeight="700"
              fill="var(--text-primary)"
            >
              任务可预测、
            </text>
            <text
              x={DIA_CX}
              y={DIA_CY + 14}
              textAnchor="middle"
              fontSize="13"
              fontWeight="700"
              fill="var(--text-primary)"
            >
              步数固定吗？
            </text>
          </g>

          {/* ===== 左分支「是 → 工作流」（第③步亮）===== */}
          <g
            ref={(el) => {
              leftRef.current = el;
            }}
            opacity={HIDDEN}
          >
            <line
              x1={DIA_LEFT}
              y1={DIA_CY}
              x2={END_LEFT_CX}
              y2={END_Y - 2}
              stroke="var(--success)"
              strokeWidth="1.8"
              markerEnd="url(#pdd-arrow-ok)"
            />
            <text
              x={(DIA_LEFT + END_LEFT_CX) / 2 - 16}
              y={(DIA_CY + END_Y) / 2}
              textAnchor="middle"
              fontSize="12"
              fontWeight="700"
              fill="var(--success)"
            >
              是 ✓
            </text>
            <rect
              x={END_LEFT_X}
              y={END_Y}
              width={END_W}
              height={END_H}
              rx="10"
              fill="var(--bg)"
              stroke="var(--success)"
              strokeWidth="1.8"
            />
            <text
              x={END_LEFT_CX}
              y={END_Y + 26}
              textAnchor="middle"
              fontSize="13"
              fontWeight="700"
              fill="var(--success)"
            >
              🛤️ 用工作流（甚至纯代码）
            </text>
            <text
              x={END_LEFT_CX}
              y={END_Y + 48}
              textAnchor="middle"
              fontSize="11"
              fill="var(--text-primary)"
            >
              路径写死最稳、最便宜、最可靠
            </text>
            <text
              x={END_LEFT_CX}
              y={END_Y + 68}
              textAnchor="middle"
              fontSize="11"
              fill="var(--text-secondary)"
            >
              能不上 agent，就别上
            </text>
          </g>

          {/* ===== 右分支「否 → 自主 agent」（第④步亮）===== */}
          <g
            ref={(el) => {
              rightRef.current = el;
            }}
            opacity={HIDDEN}
          >
            <line
              x1={DIA_RIGHT}
              y1={DIA_CY}
              x2={END_RIGHT_CX}
              y2={END_Y - 2}
              stroke="var(--accent)"
              strokeWidth="1.8"
              markerEnd="url(#pdd-arrow-ac)"
            />
            <text
              x={(DIA_RIGHT + END_RIGHT_CX) / 2 + 16}
              y={(DIA_CY + END_Y) / 2}
              textAnchor="middle"
              fontSize="12"
              fontWeight="700"
              fill="var(--accent)"
            >
              否 ✗
            </text>
            <rect
              x={END_RIGHT_X}
              y={END_Y}
              width={END_W}
              height={END_H}
              rx="10"
              fill="var(--accent-glow)"
              stroke="var(--accent)"
              strokeWidth="1.8"
            />
            <text
              x={END_RIGHT_CX}
              y={END_Y + 26}
              textAnchor="middle"
              fontSize="13"
              fontWeight="700"
              fill="var(--accent)"
            >
              🔄 才上自主 agent
            </text>
            <text
              x={END_RIGHT_CX}
              y={END_Y + 48}
              textAnchor="middle"
              fontSize="11"
              fill="var(--text-primary)"
            >
              开放 / 步数不定 / 要随机应变
            </text>
            <text
              x={END_RIGHT_CX}
              y={END_Y + 68}
              textAnchor="middle"
              fontSize="11"
              fill="var(--text-secondary)"
            >
              让 LLM 在循环里自己决定下一步
            </text>
          </g>

          {/* ===== 结论条（第⑤步亮）===== */}
          <g
            ref={(el) => {
              concRef.current = el;
            }}
            opacity={HIDDEN}
          >
            <rect
              x={CONC_X}
              y={CONC_Y}
              width={CONC_W}
              height={CONC_H}
              rx="10"
              fill="var(--accent)"
              opacity="0.14"
            />
            <text
              x={VIEW_W / 2}
              y={CONC_Y + CONC_H / 2 + 5}
              textAnchor="middle"
              fontSize="13"
              fontWeight="700"
              fill="var(--accent)"
            >
              💡 先用最简单的方案，只在确实需要时才加自主性——能简单别复杂
            </text>
          </g>
        </svg>

        {/* 控制条原语：播放/暂停/单步/拖进度 + 当前步文案 */}
        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="点击播放，看决策框架一步步走：拿到任务先问「可预测、步数固定吗」——是就用工作流（甚至纯代码），否才上自主 agent。一句话：能简单别复杂，只在需要时加自主性。可暂停、单步、拖进度逐帧看。"
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        选方案的正确姿势：从最简单的起步，先问「任务可预测、步数固定吗」——是 →
        工作流（甚至纯代码）；否 → 才上自主 agent。能简单别复杂，只在需要时加自主性。
      </figcaption>
    </figure>
  );
}
