"use client";

import dynamic from "next/dynamic";
import { useRef } from "react";

import { TEACHING_BEAT_MS, TimelineControls } from "../anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "../anim/use-teaching-timeline";

/**
 * <MemoryArchitectureDiagram>：双层记忆架构 + 信息流逐环节点亮的旗舰「可控教学动画」
 * （HEL-301，《记忆系统 Memory》篇2·3，知识点 1/2）。
 *
 * 全书隐喻：AI Agent = 私人助理「小特」，LLM = 小特的大脑。这张图把小特的「记忆」摊开：
 *   - 短期记忆 = 上下文窗口里的当前对话（一只有容量的盒，会满，塞满最早的被挤掉）—— 回收第 2 章
 *   - 长期记忆 = 存到模型外部的档案柜（数据库/向量库），要用时检索回来塞进窗口
 * 一整条信息流自上而下排成一列，逐环节点亮（每步点亮一张卡）：
 *   ① 对话进来 → 进短期记忆（上下文窗口）
 *   ② 重要信息「写入」长期记忆（外部档案柜）
 *   ③ 后续需要时从长期「检索」回短期
 *   ④ 窗口满时旧对话「遗忘」（被挤出窗口）
 *   ⑤ 但它早已存进长期，所以照样捞得回 —— 长期正是突破窗口物理上限的办法
 *
 * 短期 / 长期用不同 DESIGN token 色区分：短期=accent（窗口里的当下）、长期=success（存到外面的）；
 * 「遗忘」那步用 warning 标出（窗口塞爆挤出）。一眼分清「脑子里的当下」vs「笔记本里的长期」。
 *
 * anime 逐卡点亮：所有卡**首帧不是全空**——基底 opacity≈0.2 淡显（读者一眼看出这套记忆结构，
 * 照 ReActTraceDiagram / ToolCallFlowDiagram 范式，HEL-292 教训），点播放后步 i 把第 i 张卡
 * 从 0.2 提到 1 并轻微下落落位、点亮对应时间线节点。时序铁律照 ReActTraceDiagram ——
 * 步 i 的呈现占 [BEAT*i, BEAT*(i+1)]，tl.label(name, BEAT*(i+1)) 落在「该卡点亮完成」时刻，
 * 杜绝 off-by-one。
 *
 * 为何 client：anime.js 时钟 + 受控控制条都是真交互。anime.js 经 useTeachingTimeline
 * 内部的动态 import("animejs") 切成独立 chunk（硬规则 2/6）；本文件再用 next/dynamic
 * (ssr:false) 把叶子组件包成动态边界懒加载，anime.js 绝不进首屏 / 公共 layout。
 *
 * 视觉：全部 DESIGN token 配色（accent / success / warning / border / bg / text-*），无裸 hex；
 * 时长走 TEACHING_BEAT_MS 具名常量。几何守 HEL-274：单一 y 公式纵向堆叠、禁套整圈容器大框、
 * text/rect 距 viewBox 边 ≥14px、顶部 caption y ≥20、字号 ≥10px（硬规则 5 + HEL-274/HEL-296）。
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

type Layer = "短期" | "长期";

type FlowStep = {
  /** anime.js timeline label = 关键帧锚点。 */
  id: string;
  /** 环节徽标。 */
  role: string;
  /** 这一步落在哪层记忆（着色 + 右侧小标注）。 */
  layer: Layer;
  /** 这一步的具体内容。 */
  body: string;
  /** 高亮色 token。 */
  color: string;
};

const SHORT = "var(--accent)"; // 短期记忆（窗口里的当下）
const LONG = "var(--success)"; // 长期记忆（存到外面的）
const FORGET = "var(--warning)"; // 遗忘（窗口塞爆挤出）

const FLOW: readonly FlowStep[] = [
  {
    id: "incoming",
    role: "① 对话进来",
    layer: "短期",
    body: "你和小特新说的一句，先落进短期记忆（上下文窗口）。",
    color: SHORT,
  },
  {
    id: "write",
    role: "② 写入长期",
    layer: "长期",
    body: "重要信息（预算 500、爱靠窗）存进外部档案柜，留作长期记忆。",
    color: LONG,
  },
  {
    id: "retrieve",
    role: "③ 检索回窗口",
    layer: "长期",
    body: "后续用得到时，从长期把相关的捞回短期、塞进窗口给大脑看。",
    color: LONG,
  },
  {
    id: "forget",
    role: "④ 窗口满，遗忘",
    layer: "短期",
    body: "聊久了窗口塞爆，最早的旧对话被挤出窗口——短期「断片」。",
    color: FORGET,
  },
  {
    id: "recall",
    role: "⑤ 仍捞得回",
    layer: "长期",
    body: "但它早存进长期了，要用再检索回来——突破窗口的物理上限。",
    color: LONG,
  },
];

// —— 关键帧步骤（顺序即时间顺序；每步点亮一张卡）。 ——
const STEPS: readonly TeachingStep[] = [
  {
    label: "incoming",
    caption:
      "① 对话进来（短期）：你和小特新说的每一句，先落进短期记忆——也就是第 2 章那张有容量上限的上下文窗口。它装的是「当下这场对话」",
  },
  {
    label: "write",
    caption:
      "② 写入长期（长期）：把重要信息（你预算 500、喜欢靠窗）从窗口里挑出来，存进模型外部的档案柜（数据库/向量库）——这就是「写入」长期记忆",
  },
  {
    label: "retrieve",
    caption:
      "③ 检索回窗口（长期）：以后聊到相关话题，从长期记忆里把相关的几条捞出来、塞回短期窗口给大脑看——这就是「检索」",
  },
  {
    label: "forget",
    caption:
      "④ 窗口满，遗忘（短期）：聊得越久，窗口越满，塞爆后最早的旧对话被挤出窗口——短期记忆「断片」，大脑看不到了。这就是「遗忘」",
  },
  {
    label: "recall",
    caption:
      "⑤ 仍捞得回（长期）：可那条被挤掉的信息，早就写进了长期记忆——要用时再检索回来即可。所以长期记忆正是突破上下文窗口物理上限的办法",
  },
];

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((s) => [s.label, s.caption ?? s.label]),
);

function MemoryArchitectureDiagramInner() {
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
          aria-label="小特的双层记忆架构与信息流演示：短期记忆是上下文窗口里的当前对话（有容量、会满），长期记忆是存到模型外部的档案柜（数据库或向量库），要用时检索回来。一整条信息流自上而下排成一列，左侧一条时间线串起它们，并用两种颜色区分落在哪层——短期记忆用一种色、长期记忆用另一种色，遗忘那步用警示色标出。第一步对话进来（短期）：你和小特新说的每一句先落进短期记忆，也就是有容量上限的上下文窗口，装的是当下这场对话。第二步写入长期（长期）：把重要信息比如你预算 500、喜欢靠窗，从窗口里挑出来存进模型外部的档案柜，这就是写入长期记忆。第三步检索回窗口（长期）：以后聊到相关话题，从长期记忆里把相关的几条捞出来塞回短期窗口给大脑看，这就是检索。第四步窗口满遗忘（短期）：聊得越久窗口越满，塞爆后最早的旧对话被挤出窗口，短期记忆断片，大脑看不到了，这就是遗忘。第五步仍捞得回（长期）：可那条被挤掉的信息早就写进了长期记忆，要用时再检索回来即可，所以长期记忆正是突破上下文窗口物理上限的办法。播放时自上而下逐张点亮卡片，可播放、暂停、单步、拖动进度逐帧观察这条记忆的写入、检索、遗忘信息流。"
          className="mx-auto block h-auto w-full max-w-[660px]"
        >
          {/* —— 顶部标题行（左对齐，距上边/左右边 ≥16px：y=27 让 bbox 顶 ≥18）—— */}
          <text
            x={CARD_X}
            y={27}
            textAnchor="start"
            fontSize="11"
            fontWeight="700"
            fill="var(--text-secondary)"
          >
            小特的记忆：脑子（短期）vs 笔记本（长期）——跟着信息流走一遍 ↓
          </text>
          {/* 图例：短期 vs 长期（左对齐，紧贴标题下，字号 ≥10px） */}
          <circle cx={CARD_X + 6} cy={42} r="5" fill={SHORT} />
          <text
            x={CARD_X + 16}
            y={46}
            textAnchor="start"
            fontSize="10.5"
            fill="var(--text-secondary)"
          >
            短期记忆（上下文窗口）
          </text>
          <circle cx={CARD_X + 196} cy={42} r="5" fill={LONG} />
          <text
            x={CARD_X + 206}
            y={46}
            textAnchor="start"
            fontSize="10.5"
            fill="var(--text-secondary)"
          >
            长期记忆（外部档案柜）
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

          {/* —— 5 张环节卡片 + 左侧时间线节点 —— */}
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
                  {/* 卡底框（彩色描边，按层着色） */}
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
                  {/* 环节徽标 */}
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
                  {/* 落在哪层（右对齐小标注，距右边 ≥14px） */}
                  <text
                    x={CARD_X + CARD_W - 14}
                    y={y + 21}
                    textAnchor="end"
                    fontSize="10"
                    fontWeight="600"
                    fill="var(--text-secondary)"
                  >
                    {s.layer === "短期" ? "短期记忆" : "长期记忆"}
                  </text>
                  {/* 这一步的内容 */}
                  <text
                    x={CARD_X + 20}
                    y={y + 41}
                    textAnchor="start"
                    fontSize="10.5"
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
            脑子（短期）会满会忘；笔记本（长期）存到外面，要用再翻回来
          </text>
        </svg>

        {/* 控制条原语：播放/暂停/单步/拖进度 + 当前步文案 */}
        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="点击播放，看记忆怎么流动：对话进短期窗口 → 重要信息写入长期 → 用时检索回窗口 → 窗口满旧对话遗忘 → 但长期还在、仍捞得回；可暂停、单步、拖进度逐帧观察。"
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        双层记忆架构：短期（上下文窗口）会满会忘，长期（外部档案柜）存到模型外面、要用再检索回来——长期正是突破窗口上限的办法。
      </figcaption>
    </figure>
  );
}

/**
 * 动态边界：把 anime.js 叶子组件经 next/dynamic(ssr:false) 懒加载，确保 anime.js 这条
 * 重交互链路绝不进首屏 / 公共 layout（硬规则 2/6）。导出名供 mdx-components 注册。
 */
const MemoryArchitectureDynamic = dynamic(
  () => Promise.resolve(MemoryArchitectureDiagramInner),
  {
    ssr: false,
    loading: () => (
      <div className="mdx-figure not-prose mx-auto my-6 rounded-card border border-border bg-elevated p-6">
        <div className="flex min-h-72 items-center justify-center text-center">
          <p className="text-sm text-secondary">记忆架构动画加载中…</p>
        </div>
      </div>
    ),
  },
);

export function MemoryArchitectureDiagram() {
  return <MemoryArchitectureDynamic />;
}
