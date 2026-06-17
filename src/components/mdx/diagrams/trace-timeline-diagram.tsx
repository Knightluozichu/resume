"use client";

import dynamic from "next/dynamic";
import { useRef } from "react";

import { TEACHING_BEAT_MS, TimelineControls } from "../anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "../anim/use-teaching-timeline";

/**
 * <TraceTimelineDiagram>：一次 Agent 运行的 trace 调用链时间轴的旗舰「可控教学动画」
 * （HEL-316，《评估与可观测性》篇5·1，知识点 2：trace / span 可观测性）。
 *
 * 全书隐喻：AI Agent = 私人助理「小特」。进入「企业级」后，小特上岗给真实用户干活——
 * 你得能「看见」它每一步干了啥。这张图把小特处理一桩差事（「帮我查上海天气并写句提醒」）
 * 的**一次完整运行**摊给你看：把每一步——每次 LLM 调用、每次工具调用、每个子 Agent——
 * 都记录成一个 span（带名字 + 耗时），串成一条 trace（调用链）。有了它就能回放这次运行、
 * 一眼定位哪步慢、哪步烧 token：
 *   ① span: LLM 调用·决策（0.4s）→
 *   ② span: 工具调用·查天气（2.6s ← 瓶颈，标红）→
 *   ③ span: LLM 调用·生成答（0.5s）→
 *   ④ span: 子 Agent·审查（0.6s）。
 *
 * 横向时间轴（Gantt 式）：x 轴 = 时间（左→右），每个 span 是一条横条，左端 = 开始时刻、
 * 长度 ∝ 耗时（单一 x 公式 tToX(t)）；某条特别长（查天气 2.6s）显眼且标红 = 瓶颈一眼看出。
 * 每条 span 标名字 + 耗时。
 *
 * anime 逐 span 点亮：所有 span **首帧不是全空**——基底 opacity≈0.2 淡显（读者一眼看出
 * trace 结构，HEL-292 教训），点播放后步 i 把第 i 条 span 从 0.2 提到 1 并轻微左滑落位。
 * 时序铁律：步 i 占 [BEAT*i, BEAT*(i+1)]，tl.label(name, BEAT*(i+1)) 落在「该 span 点亮
 * 完成」时刻，杜绝 off-by-one。
 *
 * 几何铁律（HEL-296/299 已两次栽）：顶 caption baseline y≥20（此处 28）、所有 <text> bbox
 * 距 viewBox 任意边 ≥16px；单一坐标公式 tToX / rowY；不套整圈容器大框；利用率 ≥55%。
 *
 * 为何 client：anime.js 时钟 + 受控控制条都是真交互。anime.js 经 useTeachingTimeline
 * 内部动态 import 切独立 chunk（硬规则 2/6），再用 next/dynamic(ssr:false) 把叶子包成动态
 * 边界懒加载，anime.js 绝不进首屏 / 公共 layout。视觉全 DESIGN token，无裸 hex。
 */

// —— 画布几何（viewBox 0 0 720 360）。 ——
const VIEW_W = 720;
const VIEW_H = 360;
const TOP_CAPTION_Y = 28; // 顶 caption 基线 ≥20，bbox 距顶 ≥16px

// 时间轴：左侧留出标签列，右侧留边；时间 0 → TOTAL 映射到 [AXIS_X0, AXIS_X1]。
const AXIS_X0 = 150; // span 横条左起（标签列右边）
const AXIS_X1 = 696; // 横条最右（距右边 24 ≥16）
const AXIS_W = AXIS_X1 - AXIS_X0;
const TOTAL_S = 4.1; // 这次运行总耗时（s）：0.4+2.6+0.5+0.6
// 单一 x 公式：时刻 t（秒）→ 像素 x。
const tToX = (t: number) => AXIS_X0 + (t / TOTAL_S) * AXIS_W;

// span 行几何（单一 y 公式 rowY(i)）。
const ROW_TOP = 64; // 第 0 行顶
const ROW_H = 46; // 横条高
const ROW_GAP = 18; // 行距
const rowY = (i: number) => ROW_TOP + i * (ROW_H + ROW_GAP);

/** 一个 span：trace 调用链里的一步，带名字、类型、开始时刻、耗时。 */
type Span = {
  /** anime label。 */
  label: string;
  /** 这一步的名字（看得见是哪步）。 */
  name: string;
  /** 这一步是什么（LLM 调用 / 工具调用 / 子 Agent）。 */
  kind: string;
  /** 开始时刻（s，相对这次运行起点）。 */
  start: number;
  /** 耗时（s）。 */
  dur: number;
  /** 是否瓶颈（特别长，标红）。 */
  slow?: boolean;
};

// —— 4 个 span：顺序首尾相接（前一个结束 = 后一个开始）。 ——
const SPANS: readonly Span[] = [
  {
    label: "s0",
    name: "决策：要先查天气",
    kind: "LLM 调用",
    start: 0,
    dur: 0.4,
  },
  {
    label: "s1",
    name: "查天气工具",
    kind: "工具调用",
    start: 0.4,
    dur: 2.6,
    slow: true, // 瓶颈：占了大半时间
  },
  {
    label: "s2",
    name: "生成提醒文案",
    kind: "LLM 调用",
    start: 3.0,
    dur: 0.5,
  },
  {
    label: "s3",
    name: "审查文案",
    kind: "子 Agent",
    start: 3.5,
    dur: 0.6,
  },
];

const STEPS: readonly TeachingStep[] = SPANS.map((s) => ({
  label: s.label,
  caption: s.slow
    ? `span：${s.kind}「${s.name}」耗时 ${s.dur}s ← 这一步明显最长（瓶颈）！trace 让你一眼看出钱和时间花在哪`
    : `span：${s.kind}「${s.name}」耗时 ${s.dur}s——记下名字、耗时、输入输出，串进这一次运行的调用链`,
}));

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((s) => [s.label, s.caption ?? s.label]),
);

function TraceTimelineDiagramInner() {
  // 每条 span 的横条组按 label 挂 ref，喂给 anime.js。
  const rowRefs = useRef<Record<string, SVGGElement | null>>({});

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      SPANS.forEach((s, i) => {
        // 步 i 占 [BEAT*i, BEAT*(i+1)]；lit = BEAT*(i+1) = 点亮完成 = label i 锚点。
        const start = TEACHING_BEAT_MS * i;
        const lit = TEACHING_BEAT_MS * (i + 1);
        const g = rowRefs.current[s.label];
        if (g) {
          tl.add(
            g,
            {
              opacity: [0.2, 1],
              translateX: [-12, 0],
              duration: TEACHING_BEAT_MS,
              ease: "out(3)",
            },
            start,
          );
        }
        // label 落在点亮完成处。
        tl.label(s.label, lit);
      });
    },
  });

  // 刻度：0 / 1 / 2 / 3 / 4 秒。
  const TICKS = [0, 1, 2, 3, 4];
  const axisBottom = rowY(SPANS.length - 1) + ROW_H + 14;

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
          aria-label="一次 Agent 运行的 trace 调用链时间轴。横轴是时间（秒），从左到右。私人助理小特处理「帮我查上海天气并写句提醒」这一次完整运行，被拆成四个 span，每个 span 是一条横条，左端是开始时刻、长度正比于耗时，标着名字和耗时。第一条：LLM 调用·决策要先查天气，耗时 0.4 秒。第二条：工具调用·查天气，耗时 2.6 秒——这一条明显最长，是这次运行的瓶颈，标红。第三条：LLM 调用·生成提醒文案，耗时 0.5 秒。第四条：子 Agent·审查文案，耗时 0.6 秒。播放时从左到右逐条点亮 span，可播放、暂停、单步、拖动进度逐帧观察这条调用链，一眼看出哪步慢、时间花在哪。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* —— 顶 caption（baseline y=28，bbox 距顶 ≥16px）—— */}
          <text
            x={VIEW_W / 2}
            y={TOP_CAPTION_Y}
            textAnchor="middle"
            fontSize="13"
            fontWeight="700"
            fill="var(--accent)"
          >
            一次运行 = 一条 trace（调用链）；每一步 = 一个 span（名字 + 耗时）
          </text>

          {/* —— 时间轴刻度网格（竖线 + 秒标）—— */}
          {TICKS.map((sec) => {
            const x = tToX(sec);
            return (
              <g key={`tick-${sec}`}>
                <line
                  x1={x}
                  y1={ROW_TOP - 8}
                  x2={x}
                  y2={axisBottom}
                  stroke="var(--border)"
                  strokeWidth="1"
                  strokeDasharray="3 4"
                />
                <text
                  x={x}
                  y={axisBottom + 18}
                  textAnchor="middle"
                  fontSize="10"
                  fill="var(--text-secondary)"
                >
                  {sec}s
                </text>
              </g>
            );
          })}

          {/* —— 4 条 span 横条 + 左侧名字标签，逐条 anime 点亮 —— */}
          {SPANS.map((s, i) => {
            const y = rowY(i);
            const x = tToX(s.start);
            const w = (s.dur / TOTAL_S) * AXIS_W;
            const color = s.slow ? "var(--danger)" : "var(--accent)";
            return (
              <g
                key={s.label}
                ref={(el) => {
                  rowRefs.current[s.label] = el;
                }}
                opacity="0.2"
              >
                {/* 左侧 span 类型标签（距左边 ≥16px；x=30 留足余量，
                    抵消下方 translateX:[-12,0] 动画起点左移，动画中途也 ≥18px） */}
                <text
                  x={30}
                  y={y + 20}
                  textAnchor="start"
                  fontSize="11"
                  fontWeight="700"
                  fill={color}
                >
                  {s.kind}
                </text>
                <text
                  x={30}
                  y={y + 36}
                  textAnchor="start"
                  fontSize="10"
                  fill="var(--text-secondary)"
                >
                  {s.name}
                </text>

                {/* span 横条：左端 = 开始时刻，长度 ∝ 耗时 */}
                <rect
                  x={x}
                  y={y}
                  width={w}
                  height={ROW_H}
                  rx="8"
                  fill={color}
                  fillOpacity={s.slow ? 0.34 : 0.22}
                  stroke={color}
                  strokeWidth={s.slow ? 2.2 : 1.5}
                />
                {/* 横条内：耗时（标在条内左侧） */}
                <text
                  x={x + 10}
                  y={y + 28}
                  textAnchor="start"
                  fontSize="12.5"
                  fontWeight="700"
                  fill={color}
                >
                  {s.dur}s
                </text>
                {/* 瓶颈条额外标注「瓶颈」（标在条内右侧，留足边距） */}
                {s.slow && (
                  <text
                    x={x + w - 12}
                    y={y + 28}
                    textAnchor="end"
                    fontSize="11"
                    fontWeight="700"
                    fill="var(--danger)"
                  >
                    ← 瓶颈
                  </text>
                )}
              </g>
            );
          })}

          {/* —— 底部一句话点题（距底边 ≥16px）—— */}
          <text
            x={VIEW_W / 2}
            y={VIEW_H - 16}
            textAnchor="middle"
            fontSize="10.5"
            fill="var(--text-secondary)"
          >
            有了 trace 就能回放这次运行：哪步慢、哪步错、哪步烧 token，一眼定位
          </text>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="点播放：从左到右逐条点亮 span，看清「查天气」那条最长——它就是这次运行的瓶颈。可暂停、单步、拖进度。"
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        一条 trace = 一次运行的调用链；每个 span 记下名字 +
        耗时——把黑盒变透明，慢在哪、贵在哪一眼看出。
      </figcaption>
    </figure>
  );
}

/** 动态边界：anime.js 叶子经 next/dynamic(ssr:false) 懒加载，绝不进首屏 / 公共 layout（硬规则 2/6）。 */
const TraceTimelineDynamic = dynamic(
  () => Promise.resolve(TraceTimelineDiagramInner),
  {
    ssr: false,
    loading: () => (
      <div className="mdx-figure not-prose mx-auto my-6 rounded-card border border-border bg-elevated p-6">
        <div className="flex min-h-72 items-center justify-center text-center">
          <p className="text-sm text-secondary">trace 时间轴动画加载中…</p>
        </div>
      </div>
    ),
  },
);

export function TraceTimelineDiagram() {
  return <TraceTimelineDynamic />;
}
