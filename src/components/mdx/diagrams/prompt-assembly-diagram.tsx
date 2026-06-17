"use client";

import dynamic from "next/dynamic";
import { useRef } from "react";

import { TEACHING_BEAT_MS, TimelineControls } from "../anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "../anim/use-teaching-timeline";

/**
 * <PromptAssemblyDiagram>：「提示的三层结构」拼装的旗舰「可控教学动画」（HEL-255，
 * 《提示工程与角色设定》篇1·3，知识点 2）。
 *
 * 全书隐喻：AI Agent = 私人助理「小特」，LLM = 小特的大脑。这张图把你「真正发给大脑的
 * 那段 prompt」拆给读者看——它从来不是你随手打的一句话，而是三层「配料」自上而下拼成的：
 *   ① 系统设定（角色）System：给小特发的「岗位说明书」，框定它是谁、按什么规矩答 →
 *   ② few-shot 示例 Examples：给几个「输入→输出」范例，让它照葫芦画瓢 →
 *   ③ 用户消息 User：你这一轮真正要它办的事。
 * 三层落位后，合成右下角一张「发给大脑的完整 prompt」卡，点题「大脑看到的是这一整段」。
 *
 * anime 逐层揭示：步 i 淡入并下落第 i 层 block（描边变色 + translateY 落位）；时序铁律照
 * AgentLoopDiagram —— 步 i 的呈现占 [BEAT*i, BEAT*(i+1)]，tl.label(name, BEAT*(i+1)) 落在
 * 「该层落位完成」时刻，杜绝单步 off-by-one；末步（合成卡）淡入并停在亮态，表示三层拼成
 * 了一整段完整 prompt。
 *
 * 为何 client：anime.js 时钟 + 受控控制条都是真交互。anime.js 经 useTeachingTimeline
 * 内部的动态 import("animejs") 切成独立 chunk（硬规则 2/6）；本文件再用 next/dynamic
 * (ssr:false) 把叶子组件包成「动态边界」懒加载，anime.js 绝不进首屏 / 公共 layout。
 *
 * 视觉：全部 DESIGN token 配色（accent / success / warning / border / text-*），无裸 hex；
 * 时长走 TEACHING_BEAT_MS 具名常量。几何守 HEL-274：单一 y 公式纵向堆叠、禁套整圈容器大框、
 * text/rect 距 viewBox 边 ≥14px、字号 ≥10px（硬规则 5 + HEL-274 几何硬规则）。
 */

// —— 画布与三层 block 几何（viewBox 0 0 660 360；单一 y 公式纵向堆叠；距边 ≥14px）。 ——
const VIEW_W = 660;
const VIEW_H = 360;

// 三层 block 横条：左对齐留白 + 右侧留出「徽标」空间，整条距左右边 ≥14px。
const BLOCK_X = 24; // 距左边 24 ≥14
const BLOCK_W = 612; // 右端 636，距右边 24 ≥14
const BLOCK_H = 66;
const GAP = 14; // 层间距
const TOP_Y = 40; // 第 1 层顶边（上方留标题行）
// 单一 y 公式：第 i 层顶边 y。
const layerY = (i: number) => TOP_Y + i * (BLOCK_H + GAP);

type Layer = {
  /** anime.js timeline label = 关键帧锚点。 */
  id: string;
  /** 层序号徽标文本。 */
  tag: string;
  /** 角色名（system/few-shot/user）。 */
  role: string;
  /** 这一层装的是什么（一句话）。 */
  title: string;
  /** 这一层的示意内容（贴近真实 prompt 片段）。 */
  body: string;
  /** 高亮色 token。 */
  color: string;
};

const LAYERS: readonly Layer[] = [
  {
    id: "system",
    tag: "①",
    role: "system · 系统设定（角色）",
    title: "给小特发的「岗位说明书」：你是谁、按什么规矩答",
    body: "你是严谨的订票助理，只按事实回答，不确定就说不知道。",
    color: "var(--accent)",
  },
  {
    id: "examples",
    tag: "②",
    role: "few-shot · 示例",
    title: "给几个「输入 → 输出」范例，让它照葫芦画瓢",
    body: '例：用户「明天去上海」→ 助理「{"city":"上海","date":"明天"}」',
    color: "var(--warning)",
  },
  {
    id: "user",
    tag: "③",
    role: "user · 用户消息",
    title: "你这一轮真正要它办的事",
    body: "帮我订后天去广州的高铁票，下午到。",
    color: "var(--success)",
  },
];

// 合成卡几何（三层下方，居中），它是「发给大脑的完整 prompt」。
const ASSEMBLED_Y = layerY(LAYERS.length) + 8;
const ASSEMBLED_H = 40;

// —— 关键帧步骤（顺序即时间顺序；每步揭示一层，末步合成）。 ——
const STEPS: readonly TeachingStep[] = [
  {
    label: "system",
    caption:
      "① 先放最底层的「系统设定」——给小特发岗位说明书：你是谁、按什么规矩答。这层定调整段 prompt 的基调",
  },
  {
    label: "examples",
    caption:
      "② 再叠上「few-shot 示例」——给几个输入→输出范例，小特照着范例的格式与风格答，不用你长篇大论解释",
  },
  {
    label: "user",
    caption:
      "③ 最后放「用户消息」——你这一轮真正要它办的事。三层都到位，一段完整的 prompt 就拼好了",
  },
  {
    label: "assembled",
    caption:
      "④ 三层拼成一整段「发给大脑的完整 prompt」——注意：大脑看到的是这一整段，不是你单独打的那句话",
  },
];

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((s) => [s.label, s.caption ?? s.label]),
);

function PromptAssemblyDiagramInner() {
  // 每层高亮组 + 合成卡的 DOM 引用，喂给 anime.js 驱动。
  const layerG = useRef<Record<string, SVGGElement | null>>({});
  const assembledRef = useRef<SVGGElement | null>(null);

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      // 前三步：逐层淡入 + 下落落位。
      LAYERS.forEach((layer, i) => {
        const start = TEACHING_BEAT_MS * i;
        const lit = TEACHING_BEAT_MS * (i + 1);
        const g = layerG.current[layer.id];
        if (g) {
          tl.add(
            g,
            {
              opacity: [0.2, 1],
              translateY: [-14, 0],
              duration: TEACHING_BEAT_MS,
              ease: "out(3)",
            },
            start,
          );
        }
        tl.label(layer.id, lit);
      });
      // 第四步：合成卡淡入并停在亮态。
      const last = LAYERS.length;
      const start = TEACHING_BEAT_MS * last;
      const lit = TEACHING_BEAT_MS * (last + 1);
      if (assembledRef.current) {
        tl.add(
          assembledRef.current,
          {
            opacity: [0, 1],
            scale: [0.96, 1],
            duration: TEACHING_BEAT_MS,
            ease: "out(3)",
          },
          start,
        );
      }
      tl.label("assembled", lit);
    },
  });

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
          aria-label="提示的三层结构拼装演示：你真正发给私人助理小特的大脑 LLM 的那段提示（prompt），不是你随手打的一句话，而是三层「配料」自上而下拼成的。第一层是系统设定（角色）System——给小特发的岗位说明书，框定它是谁、按什么规矩回答，比如「你是严谨的订票助理，只按事实回答，不确定就说不知道」。第二层是 few-shot 示例 Examples——给几个输入到输出的范例，让它照葫芦画瓢，比如用户说「明天去上海」，助理就回一个 JSON。第三层是用户消息 User——你这一轮真正要它办的事，比如「帮我订后天去广州的高铁票，下午到」。三层都到位后，合成一张「发给大脑的完整 prompt」卡：大脑看到的是这一整段三层拼起来的提示，而不是你单独打的那句话。播放时从上到下逐层揭示并落位，最后合成完整 prompt，可播放、暂停、单步、拖动进度逐帧观察这条拼装过程。"
          className="mx-auto block h-auto w-full max-w-[660px]"
        >
          {/* —— 顶部标题行（左对齐，距左右边 ≥14px）—— */}
          <text
            x={BLOCK_X}
            y={26}
            textAnchor="start"
            fontSize="11"
            fontWeight="700"
            fill="var(--text-secondary)"
          >
            发给大脑的 prompt = 三层「配料」自上而下拼起来 ↓
          </text>

          {/* —— 三层 block —— */}
          {LAYERS.map((layer, i) => {
            const y = layerY(i);
            return (
              <g
                key={layer.id}
                ref={(el) => {
                  layerG.current[layer.id] = el;
                }}
                opacity="0.2"
              >
                {/* 层底框（彩色描边，按角色着色） */}
                <rect
                  x={BLOCK_X}
                  y={y}
                  width={BLOCK_W}
                  height={BLOCK_H}
                  rx="10"
                  fill="var(--bg)"
                  stroke={layer.color}
                  strokeWidth="1.8"
                />
                {/* 左侧色条 + 序号徽标 */}
                <rect
                  x={BLOCK_X}
                  y={y}
                  width={6}
                  height={BLOCK_H}
                  rx="3"
                  fill={layer.color}
                />
                <text
                  x={BLOCK_X + 22}
                  y={y + 26}
                  textAnchor="start"
                  fontSize="14"
                  fontWeight="700"
                  fill={layer.color}
                >
                  {`${layer.tag} ${layer.role}`}
                </text>
                {/* 这层装什么（一句话说明） */}
                <text
                  x={BLOCK_X + 22}
                  y={y + 44}
                  textAnchor="start"
                  fontSize="10.5"
                  fill="var(--text-secondary)"
                >
                  {layer.title}
                </text>
                {/* 示意内容（等宽，贴近真实 prompt 片段） */}
                <text
                  x={BLOCK_X + 22}
                  y={y + 60}
                  textAnchor="start"
                  fontSize="10.5"
                  fontFamily="var(--font-mono)"
                  fill="var(--text-primary)"
                >
                  {layer.body}
                </text>
              </g>
            );
          })}

          {/* —— 合成卡：发给大脑的完整 prompt —— */}
          <g
            ref={(el) => {
              assembledRef.current = el;
            }}
            opacity="0"
            style={{ transformBox: "fill-box", transformOrigin: "center" }}
          >
            <rect
              x={BLOCK_X}
              y={ASSEMBLED_Y}
              width={BLOCK_W}
              height={ASSEMBLED_H}
              rx="10"
              fill="var(--accent)"
              fillOpacity="0.1"
              stroke="var(--accent)"
              strokeWidth="1.8"
              strokeDasharray="6 4"
            />
            <text
              x={VIEW_W / 2}
              y={ASSEMBLED_Y + ASSEMBLED_H / 2 + 4}
              textAnchor="middle"
              fontSize="11.5"
              fontWeight="700"
              fill="var(--accent)"
            >
              = 一段「发给大脑的完整
              prompt」（大脑看到的是这整段，不是你单打的那句）
            </text>
          </g>
        </svg>

        {/* 控制条原语：播放/暂停/单步/拖进度 + 当前步文案 */}
        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="点击播放，看一段 prompt 怎么由「系统设定 + few-shot 示例 + 用户消息」三层拼起来；可暂停、单步、拖进度逐帧观察。"
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        提示的三层结构：你发给大脑的 prompt = 系统设定（角色）+ few-shot 示例 +
        用户消息，三层拼成一整段——大脑读到的是这整段，不是你随手打的那句话。
      </figcaption>
    </figure>
  );
}

/**
 * 动态边界：把 anime.js 叶子组件经 next/dynamic(ssr:false) 懒加载，确保 anime.js 这条
 * 重交互链路绝不进首屏 / 公共 layout（硬规则 2/6）。导出名供 mdx-components 注册。
 */
const PromptAssemblyDynamic = dynamic(
  () => Promise.resolve(PromptAssemblyDiagramInner),
  {
    ssr: false,
    loading: () => (
      <div className="mdx-figure not-prose mx-auto my-6 rounded-card border border-border bg-elevated p-6">
        <div className="flex min-h-72 items-center justify-center text-center">
          <p className="text-sm text-secondary">prompt 拼装动画加载中…</p>
        </div>
      </div>
    ),
  },
);

export function PromptAssemblyDiagram() {
  return <PromptAssemblyDynamic />;
}
