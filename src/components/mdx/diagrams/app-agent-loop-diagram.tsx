"use client";

import { useRef } from "react";

import { TEACHING_BEAT_MS, TimelineControls } from "../anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "../anim/use-teaching-timeline";

/**
 * <AppAgentLoopDiagram>：AI Apps 智能体循环（agentic loop）核心动画（HEL-275，第 1 章主 viz）。
 *
 * 「可控教学动画」：中央一个 LLM 大脑，外圈三站构成一个环 ——
 *   思考 Reason → 行动 Act → 观察 Observe → 回到 思考 …
 * 旁边挂一个 get_weather 工具节点、一张工具结果卡片、一条「完成 → 最终答案」的出口箭头。
 * 用一个具体任务「帮我查北京今天天气并给穿衣建议」驱动 6 步：
 *   ① 目标进入：用户目标送进 LLM 大脑。
 *   ② 思考 1：LLM 判断「我需要实时天气」→ 选中 get_weather 工具（工具节点高亮）。
 *   ③ 行动 1：调用 get_weather(北京) → 返回「15°C 多云」（结果卡片出现）。
 *   ④ 观察 1：天气结果喂回 LLM 上下文（箭头流回大脑，循环走了一圈）。
 *   ⑤ 思考 2：LLM 判断「信息够了，可以回答了」。
 *   ⑥ 完成：输出「北京 15°C，建议带件外套」→ 沿出口箭头跳出循环（出口高亮）。
 *
 * 时序铁律照 message-loop-diagram：步 i 的呈现占 [BEAT*i, BEAT*(i+1)]，
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
const VIEW_W = 640;
const VIEW_H = 408;

// —— 中央 LLM 大脑（环心 / 决策核心）。 ——
const BRAIN_W = 132;
const BRAIN_H = 64;
const BRAIN_X = (VIEW_W - BRAIN_W) / 2; // 254
const BRAIN_Y = 172;
const BRAIN_CX = BRAIN_X + BRAIN_W / 2; // 320
const BRAIN_CY = BRAIN_Y + BRAIN_H / 2; // 204

// —— 外圈三站（环形：上=思考、右下=行动、左下=观察）。统一尺寸。 ——
const STATION_W = 128;
const STATION_H = 48;
// 思考 Reason（正上方）
const REASON_X = (VIEW_W - STATION_W) / 2; // 256
const REASON_Y = 56;
const REASON_CX = REASON_X + STATION_W / 2; // 320
// 行动 Act（右下）
const ACT_X = 452;
const ACT_Y = 300;
const ACT_CX = ACT_X + STATION_W / 2; // 516
const ACT_CY = ACT_Y + STATION_H / 2; // 324
// 观察 Observe（左下）
const OBSERVE_X = 60;
const OBSERVE_Y = 300;
const OBSERVE_CX = OBSERVE_X + STATION_W / 2; // 124
const OBSERVE_CY = OBSERVE_Y + STATION_H / 2; // 148→ 324

// —— get_weather 工具节点（右上，行动时被选中高亮）。 ——
const TOOL_W = 136;
const TOOL_H = 56;
const TOOL_X = 480;
const TOOL_Y = 132;

// —— 工具结果卡片（行动后出现：15°C 多云）。 ——
const RESULT_W = 152;
const RESULT_H = 52;
const RESULT_X = 244;
const RESULT_Y = 320;

// —— 出口：完成 → 最终答案（左上，完成时高亮）。 ——
const ANSWER_W = 168;
const ANSWER_H = 56;
const ANSWER_X = 24;
const ANSWER_Y = 24;
const ANSWER_CX = ANSWER_X + ANSWER_W / 2; // 108
const ANSWER_CY = ANSWER_Y + ANSWER_H / 2; // 52

// 透明度常量（具名，禁魔法数字）。
const SHOWN = 1;
const HIDDEN = 0;

type LoopStep = TeachingStep & {
  /** 该步哪一站 / 节点高亮（环上的当前焦点）。 */
  active:
    | "goal"
    | "reason1"
    | "act1"
    | "observe1"
    | "reason2"
    | "done";
  /** get_weather 工具节点是否高亮（被选中）。 */
  toolLit: boolean;
  /** 工具结果卡片是否可见。 */
  resultShown: boolean;
  /** 出口（最终答案）是否高亮。 */
  answerLit: boolean;
};

const STEPS: readonly LoopStep[] = [
  {
    label: "goal",
    caption:
      "① 目标进入：用户把「帮我查北京今天天气、给穿衣建议」交给 LLM 大脑",
    active: "goal",
    toolLit: false,
    resultShown: false,
    answerLit: false,
  },
  {
    label: "reason1",
    caption:
      "② 思考：LLM 想「我没有实时天气，得查一下」→ 决定调用 get_weather 工具（工具亮起）",
    active: "reason1",
    toolLit: true,
    resultShown: false,
    answerLit: false,
  },
  {
    label: "act1",
    caption:
      "③ 行动：真的调用 get_weather(北京)，工具返回「15°C 多云」（结果卡片出现）",
    active: "act1",
    toolLit: true,
    resultShown: true,
    answerLit: false,
  },
  {
    label: "observe1",
    caption:
      "④ 观察：把「15°C 多云」喂回 LLM 的上下文 —— 箭头流回大脑，循环走了一整圈",
    active: "observe1",
    toolLit: false,
    resultShown: true,
    answerLit: false,
  },
  {
    label: "reason2",
    caption:
      "⑤ 再思考：LLM 判断「信息够了，不用再查了，可以回答」—— 它自己决定结束循环",
    active: "reason2",
    toolLit: false,
    resultShown: true,
    answerLit: false,
  },
  {
    label: "done",
    caption:
      "⑥ 完成：输出「北京 15°C，建议带件外套」→ 沿出口箭头跳出循环（出口亮起）",
    active: "done",
    toolLit: false,
    resultShown: true,
    answerLit: true,
  },
];

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((s) => [s.label, s.caption ?? s.label]),
);

export function AppAgentLoopDiagram() {
  // 各高亮层 / 卡片的 DOM 引用：anime.js 驱动 opacity（淡入淡出，无位移，几何稳定）。
  const brainHiRef = useRef<SVGRectElement | null>(null);
  const reasonHiRef = useRef<SVGRectElement | null>(null);
  const actHiRef = useRef<SVGRectElement | null>(null);
  const observeHiRef = useRef<SVGRectElement | null>(null);
  const toolHiRef = useRef<SVGRectElement | null>(null);
  const resultRef = useRef<SVGGElement | null>(null);
  const answerHiRef = useRef<SVGRectElement | null>(null);

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      STEPS.forEach((step, i) => {
        const start = TEACHING_BEAT_MS * i;
        const lit = TEACHING_BEAT_MS * (i + 1);

        // 当前焦点站高亮：goal/reason1/reason2 在大脑或思考站，act1 在行动站，observe1 在观察站。
        const brainOn = step.active === "goal";
        const reasonOn = step.active === "reason1" || step.active === "reason2";
        const actOn = step.active === "act1";
        const observeOn = step.active === "observe1";

        const fade = (
          ref: React.RefObject<SVGRectElement | null>,
          on: boolean,
        ) => {
          if (!ref.current) return;
          tl.add(
            ref.current,
            {
              opacity: on ? SHOWN : HIDDEN,
              duration: TEACHING_BEAT_MS,
              ease: "inOut(2)",
            },
            start,
          );
        };

        fade(brainHiRef, brainOn);
        fade(reasonHiRef, reasonOn);
        fade(actHiRef, actOn);
        fade(observeHiRef, observeOn);
        fade(toolHiRef, step.toolLit);
        fade(answerHiRef, step.answerLit);

        // 结果卡片整组淡入淡出。
        if (resultRef.current) {
          tl.add(
            resultRef.current,
            {
              opacity: step.resultShown ? SHOWN : HIDDEN,
              duration: TEACHING_BEAT_MS,
              ease: "inOut(2)",
            },
            start,
          );
        }

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
          aria-label="智能体循环（agentic loop）演示动画。画面正中是一个 LLM 大脑节点，外圈三站围成一个环：正上方是「思考 Reason」，右下方是「行动 Act」，左下方是「观察 Observe」，三站之间有箭头构成一个循环——思考之后行动，行动之后观察，观察完再回到思考。右上方挂着一个 get_weather 天气查询工具节点，左上方是一个「最终答案」出口，还有一条从循环指向出口的箭头。整段动画用一个具体任务驱动：帮我查北京今天天气并给穿衣建议，共六步。第一步目标进入，用户把这个目标交给 LLM 大脑。第二步思考，LLM 想到自己没有实时天气数据，需要查一下，于是决定调用 get_weather 工具，工具节点高亮。第三步行动，真的调用 get_weather 北京，工具返回 15 度多云，结果卡片出现。第四步观察，把 15 度多云这个结果喂回 LLM 的上下文，箭头流回大脑，循环走了完整的一圈。第五步再思考，LLM 判断信息已经够了，不用再查，可以回答了，它自己决定结束循环。第六步完成，输出北京 15 度建议带件外套，沿出口箭头跳出循环，出口高亮。核心要点：智能体不是一次问答，而是在「思考—行动—观察」的循环里反复转圈，自己决定何时调工具、何时结束、给出最终答案。可以播放、暂停、单步、拖动进度逐帧观察整个循环。"
          className="mx-auto block h-auto w-full max-w-[640px]"
        >
          <defs>
            <marker
              id="loop-arrow"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="7"
              markerHeight="7"
              orient="auto"
            >
              <path d="M0 0 L10 5 L0 10 z" fill="var(--accent)" />
            </marker>
            <marker
              id="loop-arrow-dim"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="7"
              markerHeight="7"
              orient="auto"
            >
              <path d="M0 0 L10 5 L0 10 z" fill="var(--text-secondary)" />
            </marker>
          </defs>

          {/* —— 环形连线：思考 → 行动 → 观察 → 思考 —— */}
          {/* 思考 → 行动（右侧下行） */}
          <line
            x1={REASON_CX + 40}
            y1={REASON_Y + STATION_H}
            x2={ACT_CX + 16}
            y2={ACT_Y - 6}
            stroke="var(--accent)"
            strokeWidth="1.5"
            opacity="0.5"
            markerEnd="url(#loop-arrow)"
          />
          {/* 行动 → 观察（底部左行） */}
          <line
            x1={ACT_X - 6}
            y1={ACT_CY}
            x2={OBSERVE_X + STATION_W + 6}
            y2={OBSERVE_CY}
            stroke="var(--accent)"
            strokeWidth="1.5"
            opacity="0.5"
            markerEnd="url(#loop-arrow)"
          />
          {/* 观察 → 思考（左侧上行回到环顶） */}
          <line
            x1={OBSERVE_CX - 40}
            y1={OBSERVE_Y - 6}
            x2={REASON_X - 8}
            y2={REASON_Y + STATION_H}
            stroke="var(--accent)"
            strokeWidth="1.5"
            opacity="0.5"
            markerEnd="url(#loop-arrow)"
          />
          {/* 大脑 ↔ 思考（决策核心驱动当前站） */}
          <line
            x1={BRAIN_CX}
            y1={BRAIN_Y - 4}
            x2={REASON_CX}
            y2={REASON_Y + STATION_H + 4}
            stroke="var(--text-secondary)"
            strokeWidth="1.2"
            opacity="0.4"
          />

          {/* 行动 → 工具（调用 get_weather） */}
          <line
            x1={ACT_CX}
            y1={ACT_Y - 6}
            x2={TOOL_X + TOOL_W / 2}
            y2={TOOL_Y + TOOL_H + 4}
            stroke="var(--text-secondary)"
            strokeWidth="1.2"
            strokeDasharray="4 4"
            opacity="0.5"
            markerEnd="url(#loop-arrow-dim)"
          />
          {/* 完成 → 最终答案（出口箭头：从大脑指向左上答案框） */}
          <line
            x1={BRAIN_X - 6}
            y1={BRAIN_CY - 8}
            x2={ANSWER_X + ANSWER_W + 6}
            y2={ANSWER_CY + 8}
            stroke="var(--accent)"
            strokeWidth="1.5"
            strokeDasharray="5 4"
            opacity="0.55"
            markerEnd="url(#loop-arrow)"
          />

          {/* —— 中央 LLM 大脑 —— */}
          <rect
            ref={(el) => {
              brainHiRef.current = el;
            }}
            x={BRAIN_X - 4}
            y={BRAIN_Y - 4}
            width={BRAIN_W + 8}
            height={BRAIN_H + 8}
            rx="14"
            fill="var(--accent-glow)"
            stroke="var(--accent)"
            strokeWidth="2.5"
            opacity={HIDDEN}
          />
          <rect
            x={BRAIN_X}
            y={BRAIN_Y}
            width={BRAIN_W}
            height={BRAIN_H}
            rx="12"
            fill="var(--bg)"
            stroke="var(--accent)"
            strokeWidth="1.8"
          />
          <text
            x={BRAIN_CX}
            y={BRAIN_CY - 4}
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            🧩 LLM 大脑
          </text>
          <text
            x={BRAIN_CX}
            y={BRAIN_CY + 16}
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            循环的核心
          </text>

          {/* —— 思考 Reason 站（上） —— */}
          <rect
            ref={(el) => {
              reasonHiRef.current = el;
            }}
            x={REASON_X - 4}
            y={REASON_Y - 4}
            width={STATION_W + 8}
            height={STATION_H + 8}
            rx="12"
            fill="var(--accent-glow)"
            stroke="var(--accent)"
            strokeWidth="2.5"
            opacity={HIDDEN}
          />
          <rect
            x={REASON_X}
            y={REASON_Y}
            width={STATION_W}
            height={STATION_H}
            rx="10"
            fill="var(--bg-elevated)"
            stroke="var(--border)"
            strokeWidth="1.4"
          />
          <text
            x={REASON_CX}
            y={REASON_Y + 28}
            textAnchor="middle"
            fontSize="13"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            💭 思考 Reason
          </text>
          <text
            x={REASON_CX}
            y={REASON_Y - 12}
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            下一步该干啥？
          </text>

          {/* —— 行动 Act 站（右下） —— */}
          <rect
            ref={(el) => {
              actHiRef.current = el;
            }}
            x={ACT_X - 4}
            y={ACT_Y - 4}
            width={STATION_W + 8}
            height={STATION_H + 8}
            rx="12"
            fill="var(--accent-glow)"
            stroke="var(--accent)"
            strokeWidth="2.5"
            opacity={HIDDEN}
          />
          <rect
            x={ACT_X}
            y={ACT_Y}
            width={STATION_W}
            height={STATION_H}
            rx="10"
            fill="var(--bg-elevated)"
            stroke="var(--border)"
            strokeWidth="1.4"
          />
          <text
            x={ACT_CX}
            y={ACT_Y + 28}
            textAnchor="middle"
            fontSize="13"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            🛠️ 行动 Act
          </text>
          <text
            x={ACT_CX}
            y={ACT_Y + STATION_H + 16}
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            真去调工具
          </text>

          {/* —— 观察 Observe 站（左下） —— */}
          <rect
            ref={(el) => {
              observeHiRef.current = el;
            }}
            x={OBSERVE_X - 4}
            y={OBSERVE_Y - 4}
            width={STATION_W + 8}
            height={STATION_H + 8}
            rx="12"
            fill="var(--accent-glow)"
            stroke="var(--accent)"
            strokeWidth="2.5"
            opacity={HIDDEN}
          />
          <rect
            x={OBSERVE_X}
            y={OBSERVE_Y}
            width={STATION_W}
            height={STATION_H}
            rx="10"
            fill="var(--bg-elevated)"
            stroke="var(--border)"
            strokeWidth="1.4"
          />
          <text
            x={OBSERVE_CX}
            y={OBSERVE_Y + 28}
            textAnchor="middle"
            fontSize="13"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            👀 观察 Observe
          </text>
          <text
            x={OBSERVE_CX}
            y={OBSERVE_Y + STATION_H + 16}
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            结果喂回大脑
          </text>

          {/* —— get_weather 工具节点（右上，被选中高亮） —— */}
          <rect
            ref={(el) => {
              toolHiRef.current = el;
            }}
            x={TOOL_X - 4}
            y={TOOL_Y - 4}
            width={TOOL_W + 8}
            height={TOOL_H + 8}
            rx="12"
            fill="var(--accent-glow)"
            stroke="var(--accent)"
            strokeWidth="2.5"
            opacity={HIDDEN}
          />
          <rect
            x={TOOL_X}
            y={TOOL_Y}
            width={TOOL_W}
            height={TOOL_H}
            rx="10"
            fill="var(--bg)"
            stroke="var(--border)"
            strokeWidth="1.4"
          />
          <text
            x={TOOL_X + TOOL_W / 2}
            y={TOOL_Y + 24}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            🔧 工具
          </text>
          <text
            x={TOOL_X + TOOL_W / 2}
            y={TOOL_Y + 42}
            textAnchor="middle"
            fontSize="10"
            fontFamily="var(--font-mono)"
            fill="var(--accent)"
          >
            get_weather()
          </text>

          {/* —— 工具结果卡片（行动后出现） —— */}
          <g
            ref={(el) => {
              resultRef.current = el;
            }}
            opacity={HIDDEN}
          >
            <rect
              x={RESULT_X}
              y={RESULT_Y}
              width={RESULT_W}
              height={RESULT_H}
              rx="10"
              fill="var(--bg-elevated)"
              stroke="var(--success)"
              strokeWidth="1.6"
            />
            <text
              x={RESULT_X + RESULT_W / 2}
              y={RESULT_Y + 22}
              textAnchor="middle"
              fontSize="11"
              fontWeight="700"
              fill="var(--success)"
            >
              ✓ 工具返回
            </text>
            <text
              x={RESULT_X + RESULT_W / 2}
              y={RESULT_Y + 40}
              textAnchor="middle"
              fontSize="11"
              fill="var(--text-primary)"
            >
              北京 15°C 多云
            </text>
          </g>

          {/* —— 出口：最终答案（左上，完成时高亮） —— */}
          <rect
            ref={(el) => {
              answerHiRef.current = el;
            }}
            x={ANSWER_X - 4}
            y={ANSWER_Y - 4}
            width={ANSWER_W + 8}
            height={ANSWER_H + 8}
            rx="12"
            fill="var(--accent-glow)"
            stroke="var(--accent)"
            strokeWidth="2.5"
            opacity={HIDDEN}
          />
          <rect
            x={ANSWER_X}
            y={ANSWER_Y}
            width={ANSWER_W}
            height={ANSWER_H}
            rx="10"
            fill="var(--bg)"
            stroke="var(--border)"
            strokeWidth="1.4"
          />
          <text
            x={ANSWER_CX}
            y={ANSWER_Y + 24}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            🎯 最终答案
          </text>
          <text
            x={ANSWER_CX}
            y={ANSWER_Y + 42}
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            带件外套
          </text>
        </svg>

        {/* 控制条原语：播放/暂停/单步/拖进度 + 当前步文案 */}
        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="点击播放，跟着「查北京天气」走完一圈智能体循环：思考要不要查 → 调工具 → 看结果 → 再思考够不够 → 给答案。可暂停、单步、拖进度逐帧看。"
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        智能体循环（agentic loop）：LLM 大脑在「思考 → 行动 → 观察」的环里反复转圈，自己决定何时调工具、何时信息够了、何时跳出循环给出最终答案。这就是 Agent 和普通问答最根本的不同。
      </figcaption>
    </figure>
  );
}
