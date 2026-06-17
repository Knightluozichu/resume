"use client";

import dynamic from "next/dynamic";
import { useRef } from "react";

import { TEACHING_BEAT_MS, TimelineControls } from "../anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "../anim/use-teaching-timeline";

/**
 * <RAGPipelineDiagram>：RAG 完整管线逐阶段点亮的旗舰「可控教学动画」
 * （HEL-305，《RAG 检索增强生成》篇3·1，知识点 1/2/3/4）。
 *
 * 全书隐喻：AI Agent = 私人助理「小特」，LLM = 小特的大脑。本章主隐喻：小特不靠死记硬背
 * 答问题，而是先翻资料库找到相关段落、再照着资料答（开卷考）。RAG 一整套管线分两段：
 *   —— 离线·建库（warning 黄，事先做好）——
 *   ① 文档（一堆资料）
 *   ② 切成 chunk（小块）
 *   ③ 每块 embed 成向量（一串数字）
 *   ④ 存进向量库（建好索引等查）
 *   —— 在线·问答（accent 紫，来了问题才走）——
 *   ⑤ 用户问题
 *   ⑥ 问题 embed 成向量
 *   ⑦ 在库里检索 top-k 相似 chunk
 *   ⑧ 把 chunk 拼进 prompt（「基于以下资料回答…」）
 *   ⑨ LLM 基于资料生成答案
 *
 * 离线段（①②③④）用 warning 高亮——「事先建好的知识库」；在线段（⑤⑥⑦⑧⑨）用 accent
 * 高亮——「每次提问真正走的检索 + 生成」。一眼分清「建库」与「问答」两条阶段。这正是本章
 * 最该建立的结构直觉：建库是离线一次性的，问答是在线每次都走的。
 *
 * anime 逐卡点亮：所有卡**首帧不是全空**——基底 opacity≈0.2 淡显（读者一眼看出整条管线结构，
 * 照 ToolCallFlowDiagram / ReActTraceDiagram 范式，HEL-292 教训），点播放后步 i 把第 i 张卡
 * 从 0.2 提到 1 并轻微下落落位、点亮对应时间线节点。时序铁律照 ToolCallFlowDiagram —— 步 i
 * 的呈现占 [BEAT*i, BEAT*(i+1)]，tl.label(name, BEAT*(i+1)) 落在「该卡点亮完成」时刻，
 * 杜绝 off-by-one。
 *
 * 为何 client：anime.js 时钟 + 受控控制条都是真交互。anime.js 经 useTeachingTimeline
 * 内部的动态 import("animejs") 切成独立 chunk（硬规则 2/6）；本文件再用 next/dynamic
 * (ssr:false) 把叶子组件包成动态边界懒加载，anime.js 绝不进首屏 / 公共 layout。
 *
 * 视觉：全部 DESIGN token 配色（accent / warning / border / bg / text-*），无裸 hex；
 * 时长走 TEACHING_BEAT_MS 具名常量。几何守 HEL-274/296/299：单一 y 公式纵向堆叠、禁套整圈
 * 容器大框、text/rect 距 viewBox 边 ≥16px（顶 caption y≥20）、字号 ≥10px。
 */

// —— 画布与卡片列几何（viewBox 0 0 660 720；单一 y 公式纵向堆叠；距边 ≥16px）。 ——
const VIEW_W = 660;

const RAIL_X = 40; // 时间线竖轴 x（左侧）
const CARD_X = 64; // 卡片左边（距左边 64）
const CARD_W = 580; // 右端 644，距右边 16 ≥16
const CARD_H = 50;
const GAP = 10; // 卡间距
const SEG_HEAD_H = 24; // 段标题行高（「离线·建库」/「在线·问答」）
const TOP_Y = 56; // 第 1 段标题行顶（上方留主标题 + 图例，距各文字 ≥16px）

// 9 张卡，分两段：离线 4 张（idx 0–3）、在线 5 张（idx 4–8）。
// 单一 y 公式：每张卡顶边 y。第 1 段头占 [TOP_Y, TOP_Y+SEG_HEAD_H]；
// 在线段头插在第 4 张卡之后，故 idx≥4 的卡额外下移一个 (SEG_HEAD_H+GAP)。
const OFFLINE_COUNT = 4;
const cardY = (i: number) => {
  const segShift =
    SEG_HEAD_H + GAP + (i >= OFFLINE_COUNT ? SEG_HEAD_H + GAP : 0);
  return TOP_Y + segShift + i * (CARD_H + GAP);
};
// 段标题行的 y（基线）。
const OFFLINE_HEAD_Y = TOP_Y + 16; // 第 1 段标题基线
const ONLINE_HEAD_Y = cardY(OFFLINE_COUNT) - GAP - SEG_HEAD_H + 16; // 第 2 段标题基线

// 画布高度：最后一张卡底边 + 底部点题行 + 边距。
const VIEW_H = cardY(8) + CARD_H + 34;

type Stage = {
  id: string;
  /** 阶段徽标。 */
  role: string;
  /** 这一步具体在干啥（贴近真实管线）。 */
  body: string;
  /** 是不是像数据/代码（等宽字体）。 */
  mono?: boolean;
  /** 高亮色 token：离线段 warning，在线段 accent。 */
  color: string;
};

const OFFLINE = "var(--warning)"; // 离线·建库
const ONLINE = "var(--accent)"; // 在线·问答

const STAGES: readonly Stage[] = [
  {
    id: "doc",
    role: "① 文档",
    body: "一堆资料：产品手册、FAQ、笔记…（模型训练时没见过的私有内容）",
    color: OFFLINE,
  },
  {
    id: "chunk",
    role: "② 切成 chunk",
    body: "文档太长，切成一个个小块（chunk），每块各自处理",
    color: OFFLINE,
  },
  {
    id: "embed-doc",
    role: "③ 每块 embed 成向量",
    body: "embed(chunk) → [0.21, -0.07, 0.88, …]（把意思变成一串数字）",
    mono: true,
    color: OFFLINE,
  },
  {
    id: "index",
    role: "④ 存进向量库",
    body: "把 (chunk, 向量) 一条条存好，建成可检索的索引，等查",
    color: OFFLINE,
  },
  {
    id: "query",
    role: "⑤ 用户问题",
    body: "「退货政策是几天？」（来了一个要查资料才答得准的问题）",
    color: ONLINE,
  },
  {
    id: "embed-q",
    role: "⑥ 问题也 embed 成向量",
    body: "embed(问题) → [0.19, -0.05, 0.91, …]（和 chunk 同一套坐标）",
    mono: true,
    color: ONLINE,
  },
  {
    id: "retrieve",
    role: "⑦ 检索 top-k 相似 chunk",
    body: "在库里找向量离问题最近的几块（= 意思最相关的资料）",
    color: ONLINE,
  },
  {
    id: "augment",
    role: "⑧ 拼进 prompt",
    body: '「基于以下资料回答：{检索到的 chunk}\\n问题：退货政策…」',
    mono: true,
    color: ONLINE,
  },
  {
    id: "generate",
    role: "⑨ LLM 基于资料生成答",
    body: "「根据手册，自收货起 7 天内可退」——照检索到的真实资料答，不瞎编",
    color: ONLINE,
  },
];

// —— 关键帧步骤（顺序即时间顺序；每步点亮一张卡）。 ——
const STEPS: readonly TeachingStep[] = [
  {
    label: "doc",
    caption:
      "① 文档（离线·建库）：先把要让小特「开卷」查的资料备好——产品手册、FAQ、内部笔记，这些是模型训练时压根没见过的私有内容",
  },
  {
    label: "chunk",
    caption:
      "② 切成 chunk（离线）：文档往往很长，整篇没法直接用，先切成一个个小块（chunk），每块各自往下处理",
  },
  {
    label: "embed-doc",
    caption:
      "③ 每块 embed 成向量（离线）：把每个 chunk 喂给 embedding 模型，变成一串数字（向量）——意思相近的 chunk，向量在空间里离得近",
  },
  {
    label: "index",
    caption:
      "④ 存进向量库（离线）：把每个 (chunk, 它的向量) 一条条存好，建成一个能按向量快速检索的索引。到这儿，离线建库就做完了，等查",
  },
  {
    label: "query",
    caption:
      "⑤ 用户问题（在线·问答开始）：来了个需要查资料才答得准的问题，比如「退货政策是几天？」——下面才是每次提问真正走的流程",
  },
  {
    label: "embed-q",
    caption:
      "⑥ 问题也 embed 成向量（在线）：用同一套 embedding 把问题也变成向量——必须和 chunk 用同一套坐标，才能在同一空间里比远近",
  },
  {
    label: "retrieve",
    caption:
      "⑦ 检索 top-k 相似 chunk（在线）：在向量库里找离问题向量最近的几块（top-k）——离得近 = 意思最相关，这就是「检索」",
  },
  {
    label: "augment",
    caption:
      "⑧ 拼进 prompt（在线）：把检索到的 chunk 拼进提示词——「基于以下资料回答：…」，让 LLM 带着真实资料去答。这一步就是 Retrieval-Augmented 的 Augmented",
  },
  {
    label: "generate",
    caption:
      "⑨ LLM 基于资料生成答（在线）：模型照着检索到的真实资料生成答案，而不是凭记忆瞎编——这就是「开卷答题」，幻觉大大减少",
  },
];

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((s) => [s.label, s.caption ?? s.label]),
);

function RAGPipelineDiagramInner() {
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
          aria-label="RAG 检索增强生成的完整管线演示：私人助理小特要靠「开卷查资料」来答问题，整条管线分两段，自上而下排成一列，左侧一条时间线串起九个阶段，并用两种颜色区分——离线建库段（黄色，事先一次性做好）和在线问答段（紫色，每次提问才走）。离线建库段：第一阶段文档，备好产品手册、FAQ、内部笔记等模型训练时没见过的私有资料。第二阶段切成 chunk，文档太长先切成一个个小块。第三阶段每块 embed 成向量，把每个 chunk 变成一串数字，意思相近的 chunk 向量离得近。第四阶段存进向量库，把每个 chunk 和它的向量一条条存好建成可检索索引，离线建库到此完成。在线问答段：第五阶段用户问题，来了个需要查资料才答得准的问题比如退货政策是几天。第六阶段问题也 embed 成向量，用同一套坐标把问题也变成向量才能比远近。第七阶段检索 top-k 相似 chunk，在库里找离问题向量最近的几块，离得近就是意思最相关。第八阶段拼进 prompt，把检索到的 chunk 拼进提示词基于以下资料回答，这就是检索增强里的增强。第九阶段 LLM 基于资料生成答，模型照着检索到的真实资料答而不是凭记忆瞎编，这就是开卷答题，幻觉大大减少。播放时自上而下逐张点亮卡片，可播放、暂停、单步、拖动进度逐帧观察这条完整的 RAG 管线。"
          className="mx-auto block h-auto w-full max-w-[660px]"
        >
          {/* —— 顶部主标题行（左对齐，距上边/左右边 ≥16px；y≥20）—— */}
          <text
            x={CARD_X}
            y={26}
            textAnchor="start"
            fontSize="11"
            fontWeight="700"
            fill="var(--text-secondary)"
          >
            一整条 RAG 管线：先离线建好可查的知识库，再在线检索 + 生成 ↓
          </text>
          {/* 图例：离线·建库 vs 在线·问答（左对齐，紧贴标题下，字号 ≥10px） */}
          <circle cx={CARD_X + 6} cy={42} r="5" fill={OFFLINE} />
          <text
            x={CARD_X + 16}
            y={46}
            textAnchor="start"
            fontSize="10.5"
            fill="var(--text-secondary)"
          >
            离线·建库（事先做好）
          </text>
          <circle cx={CARD_X + 186} cy={42} r="5" fill={ONLINE} />
          <text
            x={CARD_X + 196}
            y={46}
            textAnchor="start"
            fontSize="10.5"
            fill="var(--text-secondary)"
          >
            在线·问答（每次提问才走）
          </text>

          {/* —— 贯穿的时间线竖轴（从第 1 个节点到最后一个节点）—— */}
          <line
            x1={RAIL_X}
            y1={dotCY(0)}
            x2={RAIL_X}
            y2={dotCY(STAGES.length - 1)}
            stroke="var(--border)"
            strokeWidth="2"
          />

          {/* —— 段标题：离线·建库 —— */}
          <text
            x={CARD_X}
            y={OFFLINE_HEAD_Y}
            textAnchor="start"
            fontSize="11.5"
            fontWeight="700"
            fill={OFFLINE}
          >
            ▸ 离线·建库（一次性，把资料变成可查的索引）
          </text>
          {/* —— 段标题：在线·问答 —— */}
          <text
            x={CARD_X}
            y={ONLINE_HEAD_Y}
            textAnchor="start"
            fontSize="11.5"
            fontWeight="700"
            fill={ONLINE}
          >
            ▸ 在线·问答（每次提问，检索相关资料再生成）
          </text>

          {/* —— 9 张阶段卡片 + 左侧时间线节点 —— */}
          {STAGES.map((s, i) => {
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
                  {/* 卡底框（彩色描边，按段着色） */}
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
                    y={y + 20}
                    textAnchor="start"
                    fontSize="12.5"
                    fontWeight="700"
                    fill={s.color}
                  >
                    {s.role}
                  </text>
                  {/* 这一步的内容 */}
                  <text
                    x={CARD_X + 20}
                    y={y + 38}
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

          {/* 底部一句话点题（左对齐，距底边/左右边 ≥16px） */}
          <text
            x={CARD_X}
            y={VIEW_H - 16}
            textAnchor="start"
            fontSize="10.5"
            fill="var(--text-secondary)"
          >
            一句话：离线把资料变成可查的向量库，在线检索相关片段拼进提示让模型「开卷答」。
          </text>
        </svg>

        {/* 控制条原语：播放/暂停/单步/拖进度 + 当前步文案 */}
        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="点击播放，看一整条 RAG 管线怎么流动：离线建库（文档→切块→向量化→存库）→ 在线问答（问题→向量化→检索→拼接→生成）；可暂停、单步、拖进度逐帧观察。"
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        RAG 完整管线：黄色「离线建库」事先一次性做好，紫色「在线问答」每次提问才走——检索相关资料拼进提示，让模型基于资料「开卷答」。
      </figcaption>
    </figure>
  );
}

/**
 * 动态边界：把 anime.js 叶子组件经 next/dynamic(ssr:false) 懒加载，确保 anime.js 这条
 * 重交互链路绝不进首屏 / 公共 layout（硬规则 2/6）。导出名供 mdx-components 注册。
 */
const RAGPipelineDynamic = dynamic(
  () => Promise.resolve(RAGPipelineDiagramInner),
  {
    ssr: false,
    loading: () => (
      <div className="mdx-figure not-prose mx-auto my-6 rounded-card border border-border bg-elevated p-6">
        <div className="flex min-h-72 items-center justify-center text-center">
          <p className="text-sm text-secondary">RAG 管线动画加载中…</p>
        </div>
      </div>
    ),
  },
);

export function RAGPipelineDiagram() {
  return <RAGPipelineDynamic />;
}
