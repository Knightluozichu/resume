"use client";

import dynamic from "next/dynamic";
import { useRef } from "react";

import { TEACHING_BEAT_MS, TimelineControls } from "../anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "../anim/use-teaching-timeline";

/**
 * <ToolCallFlowDiagram>：工具调用一整轮数据流逐阶段点亮的旗舰「可控教学动画」
 * （HEL-298，《工具调用 Tool Calling》篇2·2，知识点 1/2/3/4）。
 *
 * 全书隐喻：AI Agent = 私人助理「小特」，LLM = 小特的大脑。上一章 ReAct 的 Action（小特
 * 写出 `weather("上海")`）只是「写出要调啥」；这一章把它真正落到工程上——给小特一份工具
 * 「说明书」（schema），它产出一个结构化的 tool_call，程序解析、按名找函数、真去执行，再把
 * 结果作为 tool 消息回填给它续答。一整轮 6 个阶段自上而下排成一列：
 *   ① 定义 schema（工具说明书）—— 程序侧准备
 *   ② LLM 看 schema 产出 tool_call(weather, {city:"上海"}) —— LLM 侧
 *   ③ 程序解析 + 按名字找到对应函数 —— 程序侧
 *   ④ 执行 weather("上海")，拿回 {"weather":"小雨"} —— 程序侧
 *   ⑤ 结果回填（role:"tool" 消息）—— 程序侧
 *   ⑥ LLM 续：给最终答案 / 或再调一个工具 —— LLM 侧
 *
 * 「LLM 侧」（产出 tool_call、续答，步②/⑥）用 accent 高亮；「程序/系统侧」（定义、解析、
 * 执行、回填，步①/③/④/⑤）用 warning 高亮——一眼分清「谁产出调用」vs「谁真去执行」。
 * 这正是本章最容易被搞混的红线：LLM 只产出调用，执行是你的代码。
 *
 * anime 逐卡点亮：所有卡**首帧不是全空**——基底 opacity≈0.2 淡显（读者一眼看出这一轮结构，
 * 照 ReActTraceDiagram 范式，HEL-292 教训），点播放后步 i 把第 i 张卡从 0.2 提到 1 并轻微下落
 * 落位、点亮对应时间线节点。时序铁律照 ReActTraceDiagram —— 步 i 的呈现占
 * [BEAT*i, BEAT*(i+1)]，tl.label(name, BEAT*(i+1)) 落在「该卡点亮完成」时刻，杜绝 off-by-one。
 *
 * 为何 client：anime.js 时钟 + 受控控制条都是真交互。anime.js 经 useTeachingTimeline
 * 内部的动态 import("animejs") 切成独立 chunk（硬规则 2/6）；本文件再用 next/dynamic
 * (ssr:false) 把叶子组件包成动态边界懒加载，anime.js 绝不进首屏 / 公共 layout。
 *
 * 视觉：全部 DESIGN token 配色（accent / warning / border / bg / text-*），无裸 hex；
 * 时长走 TEACHING_BEAT_MS 具名常量。几何守 HEL-274：单一 y 公式纵向堆叠、禁套整圈容器大框、
 * text/rect 距 viewBox 边 ≥14px、字号 ≥10px（硬规则 5 + HEL-274 几何硬规则）。
 */

// —— 画布与卡片列几何（viewBox 0 0 660 470；单一 y 公式纵向堆叠；距边 ≥14px）。 ——
const VIEW_W = 660;
const VIEW_H = 470;

// 卡片横条：左侧留出时间线 + 节点空间，整条距左右边 ≥14px。
const RAIL_X = 40; // 时间线竖轴 x（左侧）
const CARD_X = 64; // 卡片左边（距左边 64）
const CARD_W = 580; // 右端 644，距右边 16 ≥14
const CARD_H = 54;
const GAP = 12; // 卡间距
const TOP_Y = 52; // 第 1 张卡顶边（上方留标题行 + 图例，距各文字 ≥14px）
// 单一 y 公式：第 i 张卡顶边 y。
const cardY = (i: number) => TOP_Y + i * (CARD_H + GAP);

type FlowStep = {
  /** anime.js timeline label = 关键帧锚点。 */
  id: string;
  /** 阶段徽标。 */
  role: string;
  /** 谁干的：LLM 侧（产出 tool_call / 续答） vs 程序侧（定义 / 解析 / 执行 / 回填）。 */
  side: "LLM 侧" | "程序侧";
  /** 这一步的具体内容（贴近真实一轮）。 */
  body: string;
  /** 是不是像代码（等宽字体）。 */
  mono?: boolean;
  /** 高亮色 token：LLM 侧 accent，程序侧 warning。 */
  color: string;
};

const ACCENT = "var(--accent)"; // LLM 侧
const PROG = "var(--warning)"; // 程序 / 系统侧

const FLOW: readonly FlowStep[] = [
  {
    id: "schema",
    role: "① 定义工具 schema",
    side: "程序侧",
    body: '工具说明书：{name:"weather", parameters:{city}}',
    mono: true,
    color: PROG,
  },
  {
    id: "tool-call",
    role: "② LLM 产出 tool_call",
    side: "LLM 侧",
    body: 'name="weather", arguments={"city":"上海"}',
    mono: true,
    color: ACCENT,
  },
  {
    id: "parse",
    role: "③ 程序解析 + 按名找函数",
    side: "程序侧",
    body: 'json.loads(arguments) → 按 "weather" 找到 get_weather',
    mono: true,
    color: PROG,
  },
  {
    id: "execute",
    role: "④ 真去执行函数",
    side: "程序侧",
    body: 'get_weather("上海") → {"weather":"小雨","temp":18}',
    mono: true,
    color: PROG,
  },
  {
    id: "feedback",
    role: "⑤ 结果回填给模型",
    side: "程序侧",
    body: '加一条 {role:"tool", content:"小雨, 18℃"} 到对话',
    mono: true,
    color: PROG,
  },
  {
    id: "continue",
    role: "⑥ LLM 续：给最终答案",
    side: "LLM 侧",
    body: "「上海今天小雨、18℃，记得带伞」（或再调下一个工具）",
    color: ACCENT,
  },
];

// —— 关键帧步骤（顺序即时间顺序；每步点亮一张卡）。 ——
const STEPS: readonly TeachingStep[] = [
  {
    label: "schema",
    caption:
      "① 定义工具 schema（程序侧）：先给小特一份「工具说明书」——用 JSON Schema 写清有哪个工具、要传什么参数。没有它，LLM 根本不知道有 weather 这个工具可用",
  },
  {
    label: "tool-call",
    caption:
      '② LLM 产出 tool_call（LLM 侧）：小特看完说明书，输出的不是自然语言，而是一个结构化调用——name="weather"、arguments={"city":"上海"}。注意：它只是「写出要调啥」，并没有真去执行',
  },
  {
    label: "parse",
    caption:
      "③ 程序解析 + 按名找函数（程序侧）：你的代码 json.loads 把 arguments 解析成字典，再按 name 字符串找到对应的真实函数 get_weather",
  },
  {
    label: "execute",
    caption:
      '④ 真去执行（程序侧）：你的代码调 get_weather("上海") 真把工具跑一遍，拿到返回值——这一步才是「执行」，由你的代码做，不是 LLM 做',
  },
  {
    label: "feedback",
    caption:
      '⑤ 结果回填（程序侧）：把执行结果作为一条 {role:"tool"} 消息追加回对话——让模型「看见」这次调用的结果',
  },
  {
    label: "continue",
    caption:
      "⑥ LLM 续（LLM 侧）：模型带着回填的结果继续——要么给出最终答案，要么再产出一个 tool_call 调下一个工具，转下一轮",
  },
];

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((s) => [s.label, s.caption ?? s.label]),
);

function ToolCallFlowDiagramInner() {
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
          aria-label="工具调用一整轮的数据流演示：私人助理小特处理「看今天上海要不要带伞」这桩需要查天气的差事，一整轮分六个阶段，自上而下排成一列，左侧一条时间线串起它们，并用两种颜色区分谁干的——LLM 侧（小特的大脑产出调用、续答）和程序侧（你的代码定义、解析、执行、回填）。第一阶段定义工具 schema（程序侧）：给小特一份工具说明书，用 JSON Schema 写清有 weather 工具、要传 city 参数。第二阶段 LLM 产出 tool_call（LLM 侧）：小特看完说明书，输出一个结构化调用 name 等于 weather、arguments 等于 city 上海，它只是写出要调啥，并没有真去执行。第三阶段程序解析加按名找函数（程序侧）：你的代码把 arguments 解析成字典，再按 name 找到真实函数 get_weather。第四阶段真去执行（程序侧）：你的代码调 get_weather 上海，真把工具跑一遍拿到返回值小雨 18 度，这一步才是执行，由你的代码做不是 LLM 做。第五阶段结果回填（程序侧）：把执行结果作为一条 role 等于 tool 的消息追加回对话，让模型看见结果。第六阶段 LLM 续（LLM 侧）：模型带着回填的结果继续，要么给最终答案上海今天小雨记得带伞，要么再产出一个 tool_call 调下一个工具。播放时自上而下逐张点亮卡片，可播放、暂停、单步、拖动进度逐帧观察这条工具调用的完整数据流。"
          className="mx-auto block h-auto w-full max-w-[660px]"
        >
          {/* —— 顶部标题行（左对齐，距上边/左右边 ≥14px）—— */}
          <text
            x={CARD_X}
            y={27}
            textAnchor="start"
            fontSize="11"
            fontWeight="700"
            fill="var(--text-secondary)"
          >
            一整轮工具调用：从「给说明书」到「拿结果续答」 ↓
          </text>
          {/* 图例：LLM 侧 vs 程序侧（左对齐，紧贴标题下，字号 ≥10px） */}
          <circle cx={CARD_X + 6} cy={42} r="5" fill={ACCENT} />
          <text
            x={CARD_X + 16}
            y={46}
            textAnchor="start"
            fontSize="10.5"
            fill="var(--text-secondary)"
          >
            LLM 侧（产出调用 / 续答）
          </text>
          <circle cx={CARD_X + 196} cy={42} r="5" fill={PROG} />
          <text
            x={CARD_X + 206}
            y={46}
            textAnchor="start"
            fontSize="10.5"
            fill="var(--text-secondary)"
          >
            程序侧（解析 / 执行 / 回填）
          </text>

          {/* —— 贯穿的时间线竖轴（从第 1 个节点到最后一个节点）—— */}
          <line
            x1={RAIL_X}
            y1={dotCY(0)}
            x2={RAIL_X}
            y2={dotCY(FLOW.length - 1)}
            stroke="var(--border)"
            strokeWidth="2"
          />

          {/* —— 6 张阶段卡片 + 左侧时间线节点 —— */}
          {FLOW.map((s, i) => {
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
                  {/* 卡底框（彩色描边，按侧着色） */}
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
                  {/* 阶段徽标 */}
                  <text
                    x={CARD_X + 20}
                    y={y + 21}
                    textAnchor="start"
                    fontSize="12.5"
                    fontWeight="700"
                    fill={s.color}
                  >
                    {s.role}
                  </text>
                  {/* 哪一侧（右对齐小标注，距右边 ≥14px） */}
                  <text
                    x={CARD_X + CARD_W - 14}
                    y={y + 21}
                    textAnchor="end"
                    fontSize="10"
                    fontWeight="600"
                    fill="var(--text-secondary)"
                  >
                    {s.side}
                  </text>
                  {/* 这一步的内容 */}
                  <text
                    x={CARD_X + 20}
                    y={y + 41}
                    textAnchor="start"
                    fontSize="10.5"
                    fontFamily={s.mono ? "var(--font-mono)" : undefined}
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
            y={VIEW_H - 18}
            textAnchor="start"
            fontSize="10.5"
            fill="var(--text-secondary)"
          >
            红线：LLM 只「产出」调用（②⑥），「执行」始终是你的代码（①③④⑤）
          </text>
        </svg>

        {/* 控制条原语：播放/暂停/单步/拖进度 + 当前步文案 */}
        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="点击播放，看一整轮工具调用怎么流动：给说明书 → LLM 产出调用 → 程序解析 → 真去执行 → 回填结果 → LLM 续答；可暂停、单步、拖进度逐帧观察。"
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        一整轮工具调用的数据流：注意 LLM 只负责「产出 tool_call
        和续答」，解析、执行、回填都是你的程序在做。
      </figcaption>
    </figure>
  );
}

/**
 * 动态边界：把 anime.js 叶子组件经 next/dynamic(ssr:false) 懒加载，确保 anime.js 这条
 * 重交互链路绝不进首屏 / 公共 layout（硬规则 2/6）。导出名供 mdx-components 注册。
 */
const ToolCallFlowDynamic = dynamic(
  () => Promise.resolve(ToolCallFlowDiagramInner),
  {
    ssr: false,
    loading: () => (
      <div className="mdx-figure not-prose mx-auto my-6 rounded-card border border-border bg-elevated p-6">
        <div className="flex min-h-72 items-center justify-center text-center">
          <p className="text-sm text-secondary">工具调用数据流动画加载中…</p>
        </div>
      </div>
    ),
  },
);

export function ToolCallFlowDiagram() {
  return <ToolCallFlowDynamic />;
}
