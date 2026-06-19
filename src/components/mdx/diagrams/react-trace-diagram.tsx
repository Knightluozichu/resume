"use client";

import dynamic from "next/dynamic";
import { useRef } from "react";

import { TEACHING_BEAT_MS, TimelineControls } from "../anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "../anim/use-teaching-timeline";

/**
 * <ReActTraceDiagram>：ReAct 一条具体 trace 逐轮点亮的旗舰「可控教学动画」
 * （HEL-256，《ReAct：推理与行动循环》篇2·1，知识点 1/2/3）。
 *
 * 全书隐喻：AI Agent = 私人助理「小特」，LLM = 小特的大脑。这张图把小特处理一桩差事——
 * 「帮我看今天上海要不要带伞」——的整条 ReAct trace 摊给你看：它不是闷头一口气想完，而是
 * 「思考 → 行动 → 观察」交织成一串，边想边干边看：
 *   ① Thought：得查上海今天的天气 →
 *   ② Action：weather("上海") —— 真去调一个工具 →
 *   ③ Observation：小雨，降水 60% —— 系统执行工具后把结果填回来 →
 *   ④ Thought：会下雨，该提醒带伞 —— 拿到真实数据后再推一步 →
 *   ⑤ Answer：上海今天小雨，记得带伞。
 *
 * 竖直时间线：5 张卡片自上而下排成一列（单一 y 公式 cardY(i)），Thought / Action /
 * Observation / Answer 四种角色用不同 DESIGN token 色区分（Thought=accent 思考、
 * Action=warning 动手、Observation=success 实证、Answer=accent 高亮收尾）；左侧一条贯穿
 * 的时间线 + 每张卡一个节点圆点。
 *
 * anime 逐卡点亮：所有卡**首帧不是全空**——基底 opacity≈0.2 淡显（读者一眼看出 trace 结构，
 * 照 PromptAssemblyDiagram 修复后模式，HEL-292 教训），点播放后步 i 把第 i 张卡从 0.2 提到 1
 * 并轻微下落落位、点亮对应时间线节点。时序铁律照 AgentLoopDiagram / TokenizationDiagram ——
 * 步 i 的呈现占 [BEAT*i, BEAT*(i+1)]，tl.label(name, BEAT*(i+1)) 落在「该卡点亮完成」时刻，
 * 杜绝单步 off-by-one；末卡（Answer）停在亮态表示「这一圈推理+行动交织走完，差事办成」。
 *
 * 为何 client：anime.js 时钟 + 受控控制条都是真交互。anime.js 经 useTeachingTimeline
 * 内部的动态 import("animejs") 切成独立 chunk（硬规则 2/6）；本文件再用 next/dynamic
 * (ssr:false) 把叶子组件包成动态边界懒加载，anime.js 绝不进首屏 / 公共 layout。
 *
 * 视觉：全部 DESIGN token 配色（accent / success / warning / border / text-*），无裸 hex；
 * 时长走 TEACHING_BEAT_MS 具名常量。几何守 HEL-274：单一 y 公式纵向堆叠、禁套整圈容器大框、
 * text/rect 距 viewBox 边 ≥14px、字号 ≥10px（硬规则 5 + HEL-274 几何硬规则）。
 */

// —— 画布与卡片列几何（viewBox 0 0 660 420；单一 y 公式纵向堆叠；距边 ≥14px）。 ——
const VIEW_W = 660;
const VIEW_H = 420;

// 卡片横条：左侧留出时间线 + 节点空间，整条距左右边 ≥14px。
const RAIL_X = 40; // 时间线竖轴 x（左侧）
const CARD_X = 64; // 卡片左边（距左边 64）
const CARD_W = 580; // 右端 644，距右边 16 ≥14
const CARD_H = 56;
const GAP = 14; // 卡间距
const TOP_Y = 28; // 第 1 张卡顶边（上方留标题行）
// 单一 y 公式：第 i 张卡顶边 y。
const cardY = (i: number) => TOP_Y + i * (CARD_H + GAP);

type TraceStep = {
  /** anime.js timeline label = 关键帧锚点。 */
  id: string;
  /** 角色徽标（Thought / Action / Observation / Answer）。 */
  role: string;
  /** 这一轮谁产生的：LLM 自己想/写 vs 系统执行工具填回。 */
  origin: string;
  /** 这一步的具体内容（贴近真实 trace 片段）。 */
  body: string;
  /** 高亮色 token。 */
  color: string;
};

const TRACE: readonly TraceStep[] = [
  {
    id: "thought-1",
    role: "Thought 思考",
    origin: "LLM 自己写的",
    body: "要回答带不带伞，得先知道上海今天的天气——我自己不知道，得去查。",
    color: "var(--accent)",
  },
  {
    id: "action-1",
    role: "Action 行动",
    origin: "LLM 自己写的",
    body: 'weather("上海")  ← 调一个查天气的工具',
    color: "var(--warning)",
  },
  {
    id: "observation-1",
    role: "Observation 观察",
    origin: "系统执行工具后填回的",
    body: "小雨，降水概率 60%，气温 18℃。",
    color: "var(--success)",
  },
  {
    id: "thought-2",
    role: "Thought 思考",
    origin: "LLM 自己写的",
    body: "降水 60% 算会下雨，那答案就清楚了：该提醒带伞。",
    color: "var(--accent)",
  },
  {
    id: "answer",
    role: "Answer 回答",
    origin: "LLM 自己写的",
    body: "上海今天小雨、降水 60%，出门记得带伞。",
    color: "var(--accent)",
  },
];

// —— 关键帧步骤（顺序即时间顺序；每步点亮一张卡）。 ——
const STEPS: readonly TeachingStep[] = [
  {
    label: "thought-1",
    caption:
      "① Thought（思考）：小特的大脑先写下自己的推理——「要答带不带伞，得先知道上海天气，我不知道，得去查」。推理过程看得见",
  },
  {
    label: "action-1",
    caption:
      '② Action（行动）：小特不空想，决定真去查——它写出一个动作 weather("上海")，要调一个查天气的工具',
  },
  {
    label: "observation-1",
    caption:
      "③ Observation（观察）：系统真的执行了这个工具，把返回结果「小雨，降水 60%」填回来——这一步是系统填的，不是大脑编的",
  },
  {
    label: "thought-2",
    caption:
      "④ Thought（再思考）：小特拿着刚查到的真实数据，再推一步——「降水 60% 会下雨，那就该提醒带伞」。边想边干边看，又转了一轮",
  },
  {
    label: "answer",
    caption:
      "⑤ Answer（回答）：信息够了，小特给出最终答案——「上海今天小雨，记得带伞」。这条答案是查证过的，不是瞎猜的",
  },
];

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((s) => [s.label, s.caption ?? s.label]),
);

function ReActTraceDiagramInner() {
  // 每张卡的高亮组 + 时间线节点圆点的 DOM 引用，喂给 anime.js 驱动。
  const cardG = useRef<Record<string, SVGGElement | null>>({});
  const dotRef = useRef<Record<string, SVGCircleElement | null>>({});

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      STEPS.forEach((step, i) => {
        // 步 i 占 [BEAT*i, BEAT*(i+1)]；lit = BEAT*(i+1) = 点亮完成 = label i 锚点。
        const start = TEACHING_BEAT_MS * i;
        const lit = TEACHING_BEAT_MS * (i + 1);

        const g = cardG.current[step.label];
        if (g) {
          // 当前卡从淡显 0.2 提到 1，并轻微下落落位。
          tl.add(
            g,
            {
              opacity: [0.2, 1],
              translateY: [-10, 0],
              duration: TEACHING_BEAT_MS,
              ease: "out(3)",
            },
            start,
          );
        }
        // 同步点亮该卡对应的时间线节点圆点。
        const dot = dotRef.current[step.label];
        if (dot) {
          tl.add(
            dot,
            {
              opacity: [0.25, 1],
              scale: [0.7, 1],
              duration: TEACHING_BEAT_MS,
              ease: "out(2)",
            },
            start,
          );
        }
        // label 落在点亮完成处。
        tl.label(step.label, lit);
      });
    },
  });

  // 每张卡左侧节点圆点的中心（与时间线竖轴对齐）。
  const dotCY = (i: number) => cardY(i) + CARD_H / 2;

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
          aria-label="ReAct 推理与行动循环的一条具体轨迹（trace）演示：私人助理小特处理「帮我看今天上海要不要带伞」这桩差事，不是闷头一口气想完，而是把思考、行动、观察交织成一串，边想边干边看。自上而下五张卡片排成一列，左侧一条时间线串起它们。第一张是 Thought 思考（大脑自己写的）：要答带不带伞，得先知道上海天气，我不知道，得去查。第二张是 Action 行动（大脑自己写的）：写出一个动作 weather(上海)，要调一个查天气的工具。第三张是 Observation 观察（系统执行工具后填回的，不是大脑编的）：小雨，降水概率 60%，气温 18 度。第四张是 Thought 再思考（大脑自己写的）：降水 60% 会下雨，那就该提醒带伞。第五张是 Answer 回答（大脑自己写的）：上海今天小雨、降水 60%，出门记得带伞，这条答案是查证过的不是瞎猜的。播放时自上而下逐张点亮卡片，可播放、暂停、单步、拖动进度逐帧观察这条思考-行动-观察交织的循环。"
          className="mx-auto block h-auto w-full max-w-[660px]"
        >
          {/* —— 顶部标题行（左对齐，距上边/左右边 ≥14px）—— */}
          <text
            x={CARD_X}
            y={25}
            textAnchor="start"
            fontSize="11"
            fontWeight="700"
            fill="var(--text-secondary)"
          >
            差事：看今天上海要不要带伞——跟着小特走一遍 ↓
          </text>

          {/* —— 贯穿的时间线竖轴（从第 1 个节点到最后一个节点）—— */}
          <line
            x1={RAIL_X}
            y1={dotCY(0)}
            x2={RAIL_X}
            y2={dotCY(TRACE.length - 1)}
            stroke="var(--border)"
            strokeWidth="2"
          />

          {/* —— 5 张 trace 卡片 + 左侧时间线节点 —— */}
          {TRACE.map((s, i) => {
            const y = cardY(i);
            return (
              <g key={s.id}>
                {/* 时间线节点圆点（默认淡显，点亮时显色放大） */}
                <circle
                  ref={(el) => {
                    dotRef.current[s.id] = el;
                  }}
                  cx={RAIL_X}
                  cy={dotCY(i)}
                  r="6"
                  fill={s.color}
                  stroke="var(--bg)"
                  strokeWidth="2"
                  opacity="0.25"
                  style={{
                    transformBox: "fill-box",
                    transformOrigin: "center",
                  }}
                />
                {/* 卡片组：默认淡显 0.2（首帧非全空），点亮提到 1 */}
                <g
                  ref={(el) => {
                    cardG.current[s.id] = el;
                  }}
                  opacity="0.2"
                >
                  {/* 卡底框（彩色描边，按角色着色） */}
                  <rect
                    x={CARD_X}
                    y={y}
                    width={CARD_W}
                    height={CARD_H}
                    rx="10"
                    fill="var(--bg)"
                    stroke={s.color}
                    strokeWidth="1.8"
                  />
                  {/* 左侧色条 */}
                  <rect
                    x={CARD_X}
                    y={y}
                    width={6}
                    height={CARD_H}
                    rx="3"
                    fill={s.color}
                  />
                  {/* 角色徽标 */}
                  <text
                    x={CARD_X + 20}
                    y={y + 22}
                    textAnchor="start"
                    fontSize="13"
                    fontWeight="700"
                    fill={s.color}
                  >
                    {s.role}
                  </text>
                  {/* 谁产生的（右对齐小标注，距右边 ≥14px） */}
                  <text
                    x={CARD_X + CARD_W - 14}
                    y={y + 22}
                    textAnchor="end"
                    fontSize="10"
                    fontWeight="600"
                    fill="var(--text-secondary)"
                  >
                    {s.origin}
                  </text>
                  {/* 这一步的内容 */}
                  <text
                    x={CARD_X + 20}
                    y={y + 42}
                    textAnchor="start"
                    fontSize="11"
                    fontFamily={
                      s.id === "action-1" ? "var(--font-mono)" : undefined
                    }
                    fill="var(--text-primary)"
                  >
                    {s.body}
                  </text>
                </g>
              </g>
            );
          })}

          {/* 底部一句话点题（左对齐，距底边/左右边 ≥14px） */}
          <text
            x={CARD_X}
            y={VIEW_H - 19}
            textAnchor="start"
            fontSize="10.5"
            fill="var(--text-secondary)"
          >
            思考 → 行动 → 观察 → 再思考 → 回答：边想边干边看
          </text>
        </svg>

        {/* 控制条原语：播放/暂停/单步/拖进度 + 当前步文案 */}
        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="点击播放，看小特走一条 ReAct 轨迹：思考要查天气 → 行动调工具 → 观察拿到真数据 → 再思考 → 给出查证过的答案；可暂停、单步、拖进度逐帧观察。"
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        一条 ReAct 轨迹：Thought / Action / Observation
        交织成一串——小特边想边查边调整，最后的答案是「查证过的」，不是闷头编的。
      </figcaption>
    </figure>
  );
}

/**
 * 动态边界：把 anime.js 叶子组件经 next/dynamic(ssr:false) 懒加载，确保 anime.js 这条
 * 重交互链路绝不进首屏 / 公共 layout（硬规则 2/6）。导出名供 mdx-components 注册。
 */
const ReActTraceDynamic = dynamic(
  () => Promise.resolve(ReActTraceDiagramInner),
  {
    ssr: false,
    loading: () => (
      <div className="mdx-figure not-prose mx-auto my-6 rounded-card border border-border bg-elevated p-6">
        <div className="flex min-h-72 items-center justify-center text-center">
          <p className="text-sm text-secondary">ReAct 轨迹动画加载中…</p>
        </div>
      </div>
    ),
  },
);

export function ReActTraceDiagram() {
  return <ReActTraceDynamic />;
}
