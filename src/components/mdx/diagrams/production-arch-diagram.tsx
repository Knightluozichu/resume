"use client";

import dynamic from "next/dynamic";
import { useRef } from "react";

import { TEACHING_BEAT_MS, TimelineControls } from "../anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "../anim/use-teaching-timeline";

/**
 * <ProductionArchDiagram>：一条请求穿过生产架构、逐组件点亮的旗舰「可控教学动画」
 * （HEL-320，《生产化部署》篇5·3，知识点 1：生产架构）。
 *
 * 全书隐喻：AI Agent = 私人助理「小特」。本章收官——小特要从「一个人服务你」变成「一支
 * 能扛海量用户的正规军」。这张图把一条请求从进门到返回，逐个穿过生产架构的组件，按
 * 接入层 / 处理层 / 支撑层三段着色点亮：
 *   —— 接入层（accent 紫，请求先到这）——
 *   ① 用户请求（海量用户同时来）
 *   ② API 网关（收请求、鉴权、限流）
 *   —— 处理层（warning 黄，真干活 + 削峰）——
 *   ③ 队列（突发流量先排队，削峰、异步）
 *   ④ Agent 服务（真干活：调 LLM / 工具，可水平扩多个实例）
 *   —— 支撑层（success 绿，挡重复 + 记录）——
 *   ⑤ 缓存（命中直接返回，挡掉重复请求）
 *   ⑥ 可观测（trace / 指标记录，第12章那套）
 *   —— 收尾 ——
 *   ⑦ 返回用户（最终答案送回）
 *
 * 三段配色让读者一眼分清「请求先到哪、谁削峰、谁真干活、谁兜底支撑」——这正是本章最该
 * 建立的结构直觉：Agent 上线不是一个脚本，而是一套有分工的架构。
 *
 * anime 逐卡点亮：所有卡**首帧不是全空**——基底 opacity≈0.2 淡显（读者一眼看出整条架构结构，
 * 照 RAGPipelineDiagram / PromptInjectionDiagram 范式，HEL-292 教训），点播放后步 i 把第 i 张
 * 卡从 0.2 提到 1 并轻微下落落位、点亮对应时间线节点。时序铁律：步 i 的呈现占
 * [BEAT*i, BEAT*(i+1)]，tl.label(name, BEAT*(i+1)) 落在「该卡点亮完成」时刻，杜绝 off-by-one。
 *
 * 为何 client：anime.js 时钟 + 受控控制条都是真交互。anime.js 经 useTeachingTimeline 内部
 * 动态 import("animejs") 切独立 chunk（硬规则 2/6）；本文件再用 next/dynamic(ssr:false) 把
 * 叶子组件包成动态边界懒加载，anime.js 绝不进首屏 / 公共 layout。
 *
 * 视觉：全部 DESIGN token 配色（accent / warning / success / border / bg / text-*），无裸 hex；
 * 时长走 TEACHING_BEAT_MS。几何守 HEL-274/296/299：单一 y 公式纵向堆叠、禁套整圈容器大框、
 * 顶 caption baseline y≥20、所有 text/rect 距 viewBox 边 ≥16px、字号 ≥10px、利用率 ≥55%。
 */

// —— 画布与卡片列几何（viewBox 0 0 660；单一 y 公式纵向堆叠；距边 ≥16px）。 ——
const VIEW_W = 660;

const RAIL_X = 40; // 时间线竖轴 x（左侧）
const CARD_X = 64; // 卡片左边（距左边 64）
const CARD_W = 580; // 右端 644，距右边 16 ≥16
const CARD_H = 50;
const GAP = 10; // 卡间距
const SEG_HEAD_H = 24; // 段标题行高
const TOP_Y = 70; // 第 1 段标题行顶（上方留主标题 + 图例，距各文字 ≥16px）

// 7 张卡，分三段：接入 2 张（idx 0–1）、处理 2 张（idx 2–3）、支撑 2 张（idx 4–5）、收尾 1 张（idx 6）。
const ACCESS_COUNT = 2; // 接入层卡数
const PROCESS_COUNT = 2; // 处理层卡数

// 三个段头分别插在 idx 0、idx ACCESS_COUNT、idx ACCESS_COUNT+PROCESS_COUNT 之前。
// 单一 y 公式：第 i 张卡顶边 y = TOP_Y + 已插入的段头数 * (SEG_HEAD_H+GAP) + i*(CARD_H+GAP)。
const headsBefore = (i: number) => {
  let n = 1; // 接入段头永远在最上
  if (i >= ACCESS_COUNT) n += 1; // 处理段头
  if (i >= ACCESS_COUNT + PROCESS_COUNT) n += 1; // 支撑段头
  return n;
};
const cardY = (i: number) =>
  TOP_Y + headsBefore(i) * (SEG_HEAD_H + GAP) + i * (CARD_H + GAP);

// 三个段标题的基线 y。
const ACCESS_HEAD_Y = TOP_Y + 16;
const PROCESS_HEAD_Y = cardY(ACCESS_COUNT) - GAP - SEG_HEAD_H + 16;
const SUPPORT_HEAD_Y =
  cardY(ACCESS_COUNT + PROCESS_COUNT) - GAP - SEG_HEAD_H + 16;

// 画布高度：最后一张卡底边 + 底部点题行 + 边距。
const VIEW_H = cardY(6) + CARD_H + 34;

const ACCESS = "var(--accent)"; // 接入层
const PROCESS = "var(--warning)"; // 处理层
const SUPPORT = "var(--success)"; // 支撑层
const RETURN = "var(--accent)"; // 收尾（回到接入侧，复用 accent）

type Stage = {
  id: string;
  /** 阶段徽标。 */
  role: string;
  /** 这一步具体在干啥。 */
  body: string;
  /** 是不是像数据 / 代码（等宽字体）。 */
  mono?: boolean;
  /** 高亮色 token。 */
  color: string;
};

const STAGES: readonly Stage[] = [
  {
    id: "request",
    role: "① 用户请求",
    body: "海量用户同时发来请求——不是一个脚本跑一遍，是成千上万并发涌进来",
    color: ACCESS,
  },
  {
    id: "gateway",
    role: "② API 网关",
    body: "统一入口：收请求、鉴权（你是谁、有没有权）、限流（每人每秒最多几次）",
    color: ACCESS,
  },
  {
    id: "queue",
    role: "③ 队列",
    body: "突发流量先在这排队，削峰、异步——别让瞬时洪峰直接压垮后面的 Agent 服务",
    color: PROCESS,
  },
  {
    id: "agent",
    role: "④ Agent 服务",
    body: "真干活的地方：调 LLM / 工具、跑 ReAct 循环。可水平扩多个实例分摊压力",
    color: PROCESS,
  },
  {
    id: "cache",
    role: "⑤ 缓存",
    body: "命中就直接返回、不再调模型——重复 / 相似的请求挡在这，省时省钱",
    color: SUPPORT,
  },
  {
    id: "observe",
    role: "⑥ 可观测",
    body: "trace / 指标全程记录（第12章那套）：哪步慢、哪步错、成功率多少，都看得见",
    color: SUPPORT,
  },
  {
    id: "respond",
    role: "⑦ 返回用户",
    body: "最终答案送回给用户——一条请求走完这一整套，才算「生产级」地服务了一次",
    color: RETURN,
  },
];

// —— 关键帧步骤（顺序即时间顺序；每步点亮一张卡）。 ——
const STEPS: readonly TeachingStep[] = [
  {
    label: "request",
    caption:
      "① 用户请求（接入层）：生产环境里，海量用户同时发来请求——这跟你本地跑一个脚本完全是两回事，得有一套架构来扛这股并发洪流",
  },
  {
    label: "gateway",
    caption:
      "② API 网关（接入层）：所有请求的统一入口。它先做两件事——鉴权（确认你是谁、有没有权限）和限流（每个用户每秒最多发几次，挡住滥用和突发洪峰）",
  },
  {
    label: "queue",
    caption:
      "③ 队列（处理层）：Agent 一次调用很慢（LLM 延迟好几秒），扛不住请求一股脑涌进来。先入队排队——削峰、异步，让后面的 Agent 服务按自己的节奏慢慢取来处理",
  },
  {
    label: "agent",
    caption:
      "④ Agent 服务（处理层）：真正干活的地方——从队列取出请求，调 LLM、调工具、跑循环。它可以水平扩成多个实例，请求多了就多开几个分摊压力",
  },
  {
    label: "cache",
    caption:
      "⑤ 缓存（支撑层）：很多请求其实重复 / 相似。先查缓存——命中就直接返回答案、根本不调模型，把重复的活挡在门口，省时间也省 token 钱",
  },
  {
    label: "observe",
    caption:
      "⑥ 可观测（支撑层）：整条链路全程记 trace 和指标（就是第12章那套）——哪一步慢、哪一步出错、整体成功率多少，都能看见、能报警，出事不抓瞎",
  },
  {
    label: "respond",
    caption:
      "⑦ 返回用户（收尾）：最终答案沿原路送回给用户。一条请求穿过网关→队列→Agent 服务→缓存、全程被可观测记录，这才叫「生产级」地服务了一次——小特从此是一支正规军",
  },
];

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((s) => [s.label, s.caption ?? s.label]),
);

function ProductionArchDiagramInner() {
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
          aria-label="一条请求穿过生产架构的完整演示：私人助理小特上线服务海量用户，靠的不是一个脚本而是一套有分工的架构，整套架构自上而下排成一列，左侧一条时间线串起各组件，并用三种颜色分三段——接入层（紫色，请求先到这）、处理层（黄色，削峰加真干活）、支撑层（绿色，挡重复加记录）。接入层：第一步用户请求，海量用户同时发来请求并不是一个脚本跑一遍，而是成千上万并发涌进来。第二步 API 网关，所有请求的统一入口，先做鉴权确认你是谁有没有权限、再做限流每人每秒最多发几次挡住突发洪峰。处理层：第三步队列，Agent 一次调用很慢扛不住请求一股脑涌进来，先入队排队削峰异步，让后面的服务按自己节奏慢慢取来处理。第四步 Agent 服务，真正干活的地方从队列取出请求调 LLM 调工具跑循环，可以水平扩成多个实例分摊压力。支撑层：第五步缓存，重复或相似的请求命中缓存就直接返回不再调模型，挡在门口省时省钱。第六步可观测，整条链路全程记 trace 和指标，哪步慢哪步错整体成功率多少都看得见能报警。收尾：第七步返回用户，最终答案沿原路送回，一条请求穿过这一整套才算生产级地服务了一次。播放时自上而下逐张点亮卡片，可播放、暂停、单步、拖动进度逐帧观察这套生产架构的数据流。"
          className="mx-auto block h-auto w-full max-w-[660px]"
        >
          {/* —— 顶部主标题行（左对齐，baseline y≥20，距上边 / 左右边 ≥16px）—— */}
          <text
            x={CARD_X}
            y={26}
            textAnchor="start"
            fontSize="11.5"
            fontWeight="700"
            fill="var(--text-secondary)"
          >
            一条请求穿过生产架构：从进门到返回，谁在分工干啥 ↓
          </text>
          {/* 图例：接入 / 处理 / 支撑三段（左对齐，紧贴标题下，字号 ≥10px） */}
          <circle cx={CARD_X + 6} cy={46} r="5" fill={ACCESS} />
          <text
            x={CARD_X + 16}
            y={50}
            textAnchor="start"
            fontSize="10.5"
            fill="var(--text-secondary)"
          >
            接入层（收请求）
          </text>
          <circle cx={CARD_X + 156} cy={46} r="5" fill={PROCESS} />
          <text
            x={CARD_X + 166}
            y={50}
            textAnchor="start"
            fontSize="10.5"
            fill="var(--text-secondary)"
          >
            处理层（削峰 + 干活）
          </text>
          <circle cx={CARD_X + 356} cy={46} r="5" fill={SUPPORT} />
          <text
            x={CARD_X + 366}
            y={50}
            textAnchor="start"
            fontSize="10.5"
            fill="var(--text-secondary)"
          >
            支撑层（挡重复 + 记录）
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

          {/* —— 段标题：接入层 —— */}
          <text
            x={CARD_X}
            y={ACCESS_HEAD_Y}
            textAnchor="start"
            fontSize="11.5"
            fontWeight="700"
            fill={ACCESS}
          >
            ▸ 接入层（请求先到这：收请求、鉴权、限流）
          </text>
          {/* —— 段标题：处理层 —— */}
          <text
            x={CARD_X}
            y={PROCESS_HEAD_Y}
            textAnchor="start"
            fontSize="11.5"
            fontWeight="700"
            fill={PROCESS}
          >
            ▸ 处理层（先排队削峰，再交给 Agent 服务真干活）
          </text>
          {/* —— 段标题：支撑层 —— */}
          <text
            x={CARD_X}
            y={SUPPORT_HEAD_Y}
            textAnchor="start"
            fontSize="11.5"
            fontWeight="700"
            fill={SUPPORT}
          >
            ▸ 支撑层（挡掉重复、全程记录，再把答案返回用户）
          </text>

          {/* —— 7 张组件卡片 + 左侧时间线节点 —— */}
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

          {/* 底部一句话点题（左对齐，距底边 / 左右边 ≥16px） */}
          <text
            x={CARD_X}
            y={VIEW_H - 16}
            textAnchor="start"
            fontSize="10.5"
            fill="var(--text-secondary)"
          >
            一句话：上线 =
            一套架构，不是一个脚本——网关收、队列削峰、服务干活、缓存挡重复、可观测兜底。
          </text>
        </svg>

        {/* 控制条原语：播放 / 暂停 / 单步 / 拖进度 + 当前步文案 */}
        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="点击播放，看一条请求怎么穿过生产架构：用户请求 → API 网关（鉴权 / 限流）→ 队列（削峰）→ Agent 服务（干活，可水平扩）→ 缓存（挡重复）→ 可观测（记录）→ 返回用户；可暂停、单步、拖进度逐帧观察。"
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        生产架构数据流：小特上线不是一个脚本，而是一套有分工的架构——接入层收请求、处理层削峰加干活、支撑层挡重复加记录，请求穿过这一整套才算生产级地服务了一次。
      </figcaption>
    </figure>
  );
}

/**
 * 动态边界：把 anime.js 叶子组件经 next/dynamic(ssr:false) 懒加载，确保 anime.js 这条
 * 重交互链路绝不进首屏 / 公共 layout（硬规则 2/6）。导出名供 mdx-components 注册。
 */
const ProductionArchDynamic = dynamic(
  () => Promise.resolve(ProductionArchDiagramInner),
  {
    ssr: false,
    loading: () => (
      <div className="mdx-figure not-prose mx-auto my-6 rounded-card border border-border bg-elevated p-6">
        <div className="flex min-h-72 items-center justify-center text-center">
          <p className="text-sm text-secondary">生产架构动画加载中…</p>
        </div>
      </div>
    ),
  },
);

export function ProductionArchDiagram() {
  return <ProductionArchDynamic />;
}
