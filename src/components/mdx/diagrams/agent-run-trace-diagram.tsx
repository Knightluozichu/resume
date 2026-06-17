"use client";

import { useRef } from "react";

import { TEACHING_BEAT_MS, TimelineControls } from "../anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "../anim/use-teaching-timeline";

/**
 * <AgentRunTraceDiagram>：最小 Agent「代码 ↔ 运行轨迹」同步动画（HEL-300，第 4 章主 viz）。
 *
 * 「可控教学动画」：把「代码」和「它跑起来的行为」一行行对起来 ——
 *   左侧紧凑列出最小 agent 的五个关键代码区块（系统提示 / 主循环 / LLM 调用 /
 *   工具执行 / 结果回填）；右侧「运行轨迹」逐条累积。每一步：
 *     ① 高亮左侧当前正在执行的代码区块；
 *     ② 右侧追加一条轨迹（Thought → Action → Observation → … → 完成）。
 * 这是 C 实战型的「代码视角」主 viz，区别于第 3 章 MultiTurnLoopDiagram 的「概念循环」。
 *
 * 任务：「北京今天适合穿什么」——一个简单 1 轮任务驱动：
 *   ① 启动：装好系统提示 + 工具表，进入循环（高亮 系统提示 + 循环）
 *   ② LLM 调用（思考）→ 轨迹 Thought：该查北京的天气（高亮 LLM 调用）
 *   ③ 解析 + 执行工具 → 轨迹 Action：get_weather("北京")（高亮 工具执行）
 *   ④ 结果回填 → 轨迹 Observation：15°C·晴（高亮 结果回填）
 *   ⑤ LLM 调用（再思考）→ 轨迹 Thought：拿到天气了，可以收尾（高亮 LLM 调用）
 *   ⑥ 完成：LLM 不再调工具、直接作答 → 轨迹 完成：偏凉，建议穿外套（高亮 完成出口）
 *
 * 几何稳定策略（杜绝位移/重排）：左侧 5 个代码块位置固定，各备一个高亮层按当前步
 * opacity 淡入；右侧 6 条轨迹槽位固定、逐步淡入。全程只动 opacity，无位移。
 *
 * 时序铁律照 multi-turn-loop-diagram：步 i 的呈现占 [BEAT*i, BEAT*(i+1)]，
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
const VIEW_H = 504;

// —— 左侧「代码」面板：标题 + 5 个代码区块。 ——
const CODE_X = 24;
const CODE_W = 312;
const CODE_TITLE_Y = 48;
// 代码区块（统一尺寸，竖直堆叠；单一 y 公式）。
const CODE_BLOCK_H = 60;
const CODE_BLOCK_Y0 = 72; // 第 0 块顶
const CODE_BLOCK_GAP = 16;

/** 第 i 个代码区块左上角 y（单一公式）。 */
function codeBlockY(i: number): number {
  return CODE_BLOCK_Y0 + i * (CODE_BLOCK_H + CODE_BLOCK_GAP);
}

// —— 右侧「运行轨迹」面板：标题 + 6 条逐步累积的槽位。 ——
const TRACE_X = 360;
const TRACE_W = 336;
const TRACE_TITLE_Y = 48;
const TRACE_SLOT_H = 56;
const TRACE_SLOT_Y0 = 72; // 第 0 条顶
const TRACE_SLOT_GAP = 12;

/** 第 i 条轨迹槽左上角 y（单一公式）。 */
function traceY(i: number): number {
  return TRACE_SLOT_Y0 + i * (TRACE_SLOT_H + TRACE_SLOT_GAP);
}

// 透明度常量（具名，禁魔法数字）。
const SHOWN = 1;
const HIDDEN = 0;

type CodeBlock = {
  /** 代码区块的角色名（人话） */
  title: string;
  /** 该区块的代码梗概（等宽显示） */
  code: string;
};

/** 左侧 5 个代码区块（自上而下，对应最小 agent 的关键骨架）。 */
const CODE_BLOCKS: readonly CodeBlock[] = [
  { title: "系统提示 + 工具表", code: "msgs = [SYSTEM]; TOOLS = {…}" },
  { title: "主循环（带刹车）", code: "for _ in range(max_steps):" },
  { title: "LLM 调用（思考）", code: "reply = call_llm(msgs, TOOLS)" },
  { title: "解析 + 执行工具", code: "obs = TOOLS[name](**args)" },
  { title: "结果回填", code: "msgs.append(obs)  # 喂回" },
];

type TraceLine = {
  /** 轨迹行的类别标签 */
  tag: string;
  /** 轨迹内容 */
  text: string;
  /** 该行用强调色（完成行）还是常规色 */
  emphatic: boolean;
};

/** 右侧 6 条运行轨迹（逐步追加）。 */
const TRACE_LINES: readonly TraceLine[] = [
  { tag: "▶ 启动", text: "目标：北京今天适合穿什么", emphatic: false },
  { tag: "💭 Thought", text: "得先查北京的天气", emphatic: false },
  { tag: "🛠️ Action", text: "get_weather(\"北京\")", emphatic: false },
  { tag: "👀 Observation", text: "15°C · 晴", emphatic: false },
  { tag: "💭 Thought", text: "拿到天气了，可以收尾", emphatic: false },
  { tag: "🎯 完成", text: "偏凉，建议穿件外套", emphatic: true },
];

type TraceStep = TeachingStep & {
  /** 当前高亮哪个代码区块（下标 0~4；-1 表示无 / 完成出口）。 */
  active: number;
  /** 右侧轨迹已累积到几条（0~6）。 */
  traceCount: number;
  /** 完成出口是否高亮。 */
  done: boolean;
};

const STEPS: readonly TraceStep[] = [
  {
    label: "boot",
    caption:
      "① 启动：装好系统提示 + 工具表，进入带刹车的主循环（左侧前两块亮，轨迹记下目标）",
    active: 0,
    traceCount: 1,
    done: false,
  },
  {
    label: "think-1",
    caption:
      "② LLM 调用（思考）：模型看着上下文，决定「得先查北京的天气」（高亮 LLM 调用，轨迹 +Thought）",
    active: 2,
    traceCount: 2,
    done: false,
  },
  {
    label: "act",
    caption:
      "③ 解析 + 执行工具：从 LLM 的产出解析出要调 get_weather(\"北京\")，我们的代码真去执行（高亮 工具执行，轨迹 +Action）",
    active: 3,
    traceCount: 3,
    done: false,
  },
  {
    label: "obs",
    caption:
      "④ 结果回填：把工具结果「15°C·晴」append 回 msgs，喂给下一圈（高亮 结果回填，轨迹 +Observation）",
    active: 4,
    traceCount: 4,
    done: false,
  },
  {
    label: "think-2",
    caption:
      "⑤ 第 2 圈 LLM 调用：模型看到刚回填的天气，思考「拿到了，可以收尾」（再次高亮 LLM 调用，轨迹 +Thought）",
    active: 2,
    traceCount: 5,
    done: false,
  },
  {
    label: "done",
    caption:
      "⑥ 完成：这一圈 LLM 不再调工具、直接作答「偏凉，建议穿件外套」，is_done 成立、跳出循环（完成出口亮起）",
    active: -1,
    traceCount: 6,
    done: true,
  },
];

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((s) => [s.label, s.caption ?? s.label]),
);

export function AgentRunTraceDiagram() {
  // 5 个代码区块的高亮层。
  const codeHiRefs = useRef<(SVGRectElement | null)[]>([
    null,
    null,
    null,
    null,
    null,
  ]);
  // 6 条轨迹槽。
  const traceSlotRefs = useRef<(SVGGElement | null)[]>([
    null,
    null,
    null,
    null,
    null,
    null,
  ]);
  // 完成出口高亮。
  const doneHiRef = useRef<SVGRectElement | null>(null);

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      const fade = (
        el: SVGGElement | SVGRectElement | null,
        on: boolean,
        start: number,
      ) => {
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

        // 代码区块高亮：当前 active 块亮；启动步额外把「主循环」块也点亮。
        codeHiRefs.current.forEach((el, c) => {
          const on = c === step.active || (step.label === "boot" && c === 1);
          fade(el, on, start);
        });

        // 右侧轨迹逐条累积：i < traceCount 的槽点亮。
        traceSlotRefs.current.forEach((el, s) => {
          fade(el, s < step.traceCount, start);
        });

        // 完成出口。
        fade(doneHiRef.current, step.done, start);

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
          aria-label="最小 Agent 的代码和运行轨迹同步演示动画。画面左半边是「代码」面板，自上而下列出最小 agent 的五个关键代码区块：系统提示加工具表、带刹车的主循环、LLM 调用（思考）、解析加执行工具、结果回填。右半边是「运行轨迹」面板，会随每一步逐条往下追加。任务是回答「北京今天适合穿什么」，共六步。第一步启动，装好系统提示和工具表、进入主循环，左侧前两块高亮，轨迹记下目标。第二步 LLM 调用思考，模型决定得先查北京的天气，高亮 LLM 调用块，轨迹追加一条 Thought。第三步解析加执行工具，从 LLM 的产出里解析出要调 get_weather 北京，我们的代码真去执行，高亮工具执行块，轨迹追加一条 Action。第四步结果回填，把工具返回的 15 度晴 append 回消息列表、喂给下一圈，高亮结果回填块，轨迹追加一条 Observation。第五步第二圈 LLM 调用，模型看到刚回填的天气，思考拿到了可以收尾，再次高亮 LLM 调用块，轨迹追加一条 Thought。第六步完成，这一圈 LLM 不再调工具、直接作答偏凉建议穿件外套，is_done 成立、跳出循环，完成出口高亮。核心要点：左边每一行代码，对应右边它跑起来产生的一条行为轨迹，把「代码」和「行为」一一对上——这就是最小 agent 真正跑一次的样子。可以播放、暂停、单步、拖动进度逐帧观察。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* —— 左侧「代码」面板标题 —— */}
          <text
            x={CODE_X + 4}
            y={CODE_TITLE_Y - 8}
            fontSize="13"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            📄 代码（最小 agent 的骨架）
          </text>
          <text
            x={CODE_X + 4}
            y={CODE_TITLE_Y + 8}
            fontSize="10"
            fill="var(--text-secondary)"
          >
            高亮 = 当前正在执行这一块
          </text>

          {/* —— 左侧 5 个代码区块（高亮层 + 底框 + 文字）—— */}
          {CODE_BLOCKS.map((b, i) => {
            const y = codeBlockY(i);
            return (
              <g key={`code-block-${i}`}>
                {/* 高亮层（默认隐藏，按当前步淡入） */}
                <rect
                  ref={(el) => {
                    codeHiRefs.current[i] = el;
                  }}
                  x={CODE_X - 4}
                  y={y - 4}
                  width={CODE_W + 8}
                  height={CODE_BLOCK_H + 8}
                  rx="12"
                  fill="var(--accent-glow)"
                  stroke="var(--accent)"
                  strokeWidth="2.5"
                  opacity={HIDDEN}
                />
                <rect
                  x={CODE_X}
                  y={y}
                  width={CODE_W}
                  height={CODE_BLOCK_H}
                  rx="8"
                  fill="var(--bg)"
                  stroke="var(--border)"
                  strokeWidth="1.4"
                />
                <text
                  x={CODE_X + 14}
                  y={y + 24}
                  fontSize="12"
                  fontWeight="700"
                  fill="var(--text-primary)"
                >
                  {b.title}
                </text>
                <text
                  x={CODE_X + 14}
                  y={y + 44}
                  fontSize="11"
                  fontFamily="var(--font-mono)"
                  fill="var(--accent)"
                >
                  {b.code}
                </text>
              </g>
            );
          })}

          {/* —— 右侧「运行轨迹」面板标题 —— */}
          <text
            x={TRACE_X + 4}
            y={TRACE_TITLE_Y - 8}
            fontSize="13"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            🧾 运行轨迹（跑起来的行为）
          </text>
          <text
            x={TRACE_X + 4}
            y={TRACE_TITLE_Y + 8}
            fontSize="10"
            fill="var(--text-secondary)"
          >
            每执行一块，这里追加一条
          </text>

          {/* —— 完成行（最后一条轨迹）的高亮层：done 步亮起 —— */}
          <rect
            ref={(el) => {
              doneHiRef.current = el;
            }}
            x={TRACE_X - 4}
            y={traceY(TRACE_LINES.length - 1) - 4}
            width={TRACE_W + 8}
            height={TRACE_SLOT_H + 8}
            rx="12"
            fill="var(--accent-glow)"
            stroke="var(--success)"
            strokeWidth="2.5"
            opacity={HIDDEN}
          />

          {/* —— 右侧 6 条轨迹槽（逐步淡入）—— */}
          {TRACE_LINES.map((line, s) => {
            const y = traceY(s);
            const accent = line.emphatic ? "var(--success)" : "var(--accent)";
            return (
              <g
                key={`trace-slot-${s}`}
                ref={(el) => {
                  traceSlotRefs.current[s] = el;
                }}
                opacity={HIDDEN}
              >
                <rect
                  x={TRACE_X}
                  y={y}
                  width={TRACE_W}
                  height={TRACE_SLOT_H}
                  rx="8"
                  fill="var(--bg)"
                  stroke={accent}
                  strokeWidth="1.4"
                />
                <text
                  x={TRACE_X + 14}
                  y={y + 22}
                  fontSize="11"
                  fontWeight="700"
                  fill={accent}
                >
                  {line.tag}
                </text>
                <text
                  x={TRACE_X + 14}
                  y={y + 42}
                  fontSize="11"
                  fontFamily={line.emphatic ? undefined : "var(--font-mono)"}
                  fill="var(--text-primary)"
                >
                  {line.text}
                </text>
              </g>
            );
          })}
        </svg>

        {/* 控制条原语：播放/暂停/单步/拖进度 + 当前步文案 */}
        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="点击播放，看最小 agent 跑一次「北京今天穿什么」：左边每执行一块代码，右边就追加一条对应的运行轨迹——把「代码」和「它跑起来的行为」一行行对上。可暂停、单步、拖进度逐帧看。"
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        代码 ↔ 运行轨迹：左侧是最小 agent
        的代码骨架，右侧是它真跑一次产生的行为（Thought → Action → Observation →
        … → 完成）。每执行一块代码，就追加一条轨迹——这是「代码视角」看 agent
        跑起来的样子。
      </figcaption>
    </figure>
  );
}
