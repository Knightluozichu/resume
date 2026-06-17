"use client";

import { useRef } from "react";

import { TEACHING_BEAT_MS, TimelineControls } from "../anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "../anim/use-teaching-timeline";

/**
 * <AaNextTokenDiagram>：「下一个 token 预测」的可控教学动画旗舰图（HEL-272）。
 *
 * 演大模型「生成」的本质：看着已有文字 → 对下一个 token 算一个概率分布 →
 * 挑最高概率的那个 → 接到序列后面 → 再来一轮。所谓「生成」就是反复做这件事。
 *
 * 画面分两区（同一张 SVG）：
 *  - 上区「已生成序列」：一行 token chip，单一 x 公式排开；每步把选中的 token 点亮、
 *    接到序列尾巴上（从灰底变高亮），序列越拼越长（今天天气真 → …好 → …呀）。
 *  - 下区「下一个 token 的概率分布」：4 个候选 token 的横向概率条（单一 y 公式排列），
 *    每步重画这一组条，最高概率那条高亮（= 被选中接上去的 token）。
 *
 * 时间线 = 一条 anime.js timeline，每个生成步占 1 beat：该 beat 内把「选中 token」
 * 的 chip 点亮 + 该步概率条组从 0 长到目标长度，最高条额外高亮。step 的 label 锚在
 * 「该步选中 token 接上完成」时刻（lit = BEAT*(i+1)），与 AaAgentLoopDiagram 同款写法，
 * 修正 label 落在淡入起点的 off-by-one。
 *
 * 为何 client：anime.js 时钟 + 受控控制条是真交互。anime.js 经 useTeachingTimeline 内部
 * 动态 import("animejs") 切独立 chunk（硬规则 2/6），注册后不进首屏关键路径。
 *
 * 视觉：全部 DESIGN token（accent / success / warning / danger / border / text-* / bg），
 * 无裸 hex；时长走 TEACHING_BEAT_MS 具名常量，无散落魔法数字（硬规则 5）。
 */

// —— 布局常量（viewBox 内坐标；间距均 2 的倍数，无魔法数字散落）——
const VIEW_W = 600;
const VIEW_H = 540;

// 上区：已生成序列（一行 token chip，单一 x 公式）。
const SEQ_BOX_W = 60;
const SEQ_BOX_H = 44;
const SEQ_GAP = 8;
const SEQ_Y = 96; // chip 顶 y
// 完整序列共 7 个 token：今 天 天气? 不——这里按「字 ≈ token」给小白直观感。
// 实际中文一字常是 1 个 token，这里用单字 chip 演示「一个个 token 接上去」。
const FULL_SEQ = ["今", "天", "天", "气", "真", "好", "呀"] as const;
// 前 5 个是给定开头（prompt），后 2 个是动画里逐步生成接上的。
const PROMPT_LEN = 5;
const SEQ_TOTAL = FULL_SEQ.length;
const SEQ_LEFT =
  (VIEW_W - (SEQ_TOTAL * SEQ_BOX_W + (SEQ_TOTAL - 1) * SEQ_GAP)) / 2;
const seqX = (i: number) => SEQ_LEFT + i * (SEQ_BOX_W + SEQ_GAP);

// 下区：候选 token 概率条（横向，单一 y 公式）。
const BAR_TOP = 232; // 第一条顶 y
const BAR_H = 34;
const BAR_GAP = 16;
const BAR_LEFT = 56; // 条起点 x（label 区右缘，左侧约 56px 留给候选 token 文字）
const BAR_MAX_W = 380; // 概率 1.0 对应的最大条长
const PROB_VAL_X = BAR_LEFT + BAR_MAX_W + 12; // 概率数值文字 x
const barY = (i: number) => BAR_TOP + i * (BAR_H + BAR_GAP);

type Candidate = { token: string; prob: number };
// 每个生成步：当前序列长度（决定接到第几格）+ 4 个候选的概率分布（首个为被选中的最高项）。
type GenStep = {
  /** anime.js label = 该步「选中 token 接上完成」锚点。 */
  id: string;
  /** 这一步要点亮 / 接上的序列格下标（0-based）。 */
  seqIndex: number;
  /** 候选概率分布（4 个；数组首项即最高、被选中接上的那个）。 */
  candidates: readonly Candidate[];
  caption: string;
};

// 颜色：被选中（最高）条用 accent，其余候选用 text-secondary。
const PICK_COLOR = "var(--accent)";
const OTHER_COLOR = "var(--text-secondary)";

const GEN_STEPS: readonly GenStep[] = [
  {
    id: "g0",
    seqIndex: 5, // 接第 6 格「好」
    candidates: [
      { token: "好", prob: 0.62 },
      { token: "不错", prob: 0.18 },
      { token: "冷", prob: 0.08 },
      { token: "热", prob: 0.05 },
    ],
    caption:
      "第①步：看着「今天天气真」，模型给下一个 token 算一组概率——「好」最高(0.62)，于是挑它接上",
  },
  {
    id: "g1",
    seqIndex: 6, // 接第 7 格「呀」
    candidates: [
      { token: "呀", prob: 0.41 },
      { token: "。", prob: 0.3 },
      { token: "！", prob: 0.16 },
      { token: "啊", prob: 0.09 },
    ],
    caption:
      "第②步：序列变成「今天天气真好」，再算一次下一个 token——这次「呀」最高(0.41)，接上去",
  },
  {
    id: "end",
    seqIndex: 6, // 不新增格，停在这
    candidates: [
      { token: "（结束）", prob: 0.55 },
      { token: "～", prob: 0.22 },
      { token: "！", prob: 0.14 },
      { token: "呢", prob: 0.09 },
    ],
    caption:
      "第③步：再预测，最高项是「结束」——于是停笔。「生成」就是这样反复预测下一个 token、挑一个接上",
  },
];

const STEPS: readonly TeachingStep[] = GEN_STEPS.map((g) => ({
  label: g.id,
  caption: g.caption,
}));

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  GEN_STEPS.map((g) => [g.id, g.caption]),
);

export function AaNextTokenDiagram() {
  // 每步「新增 token chip」高亮层引用（按 seqIndex 存）。
  const seqRefs = useRef<Record<number, SVGRectElement | null>>({});
  // 每步 × 每候选 概率条的 rect 引用（key = `${stepId}-${candIdx}`）。
  const barRefs = useRef<Record<string, SVGRectElement | null>>({});
  // 每步候选条整组的容器（用整组淡入淡出衔接，保证同一时刻只显示当前步那一组条）。
  const groupRefs = useRef<Record<string, SVGGElement | null>>({});

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      GEN_STEPS.forEach((g, i) => {
        const start = TEACHING_BEAT_MS * i;
        const lit = TEACHING_BEAT_MS * (i + 1);

        // 1) 本步候选条整组淡入（上一组在它点亮时已淡出）。
        const group = groupRefs.current[g.id];
        if (group) {
          tl.add(
            group,
            {
              opacity: [0, 1],
              duration: TEACHING_BEAT_MS * 0.5,
              ease: "out(3)",
            },
            start,
          );
        }

        // 2) 本步每条概率条从 0 长到目标宽度（用 scaleX，transformOrigin 左缘）。
        g.candidates.forEach((c, ci) => {
          const el = barRefs.current[`${g.id}-${ci}`];
          if (!el) return;
          tl.add(
            el,
            {
              scaleX: [0, 1],
              duration: TEACHING_BEAT_MS * 0.8,
              ease: "out(3)",
            },
            start + TEACHING_BEAT_MS * 0.15,
          );
        });

        // 3) 选中 token 接到序列尾（该格 chip 高亮层点亮）；最后「结束」步不新增格。
        if (g.id !== "end") {
          const seqEl = seqRefs.current[g.seqIndex];
          if (seqEl) {
            tl.add(
              seqEl,
              {
                opacity: [0, 1],
                scale: [0.94, 1],
                duration: TEACHING_BEAT_MS * 0.6,
                ease: "out(3)",
              },
              start + TEACHING_BEAT_MS * 0.5,
            );
          }
        }

        // 4) label 锚在「该步选中 token 接上完成」时刻（防 off-by-one）。
        tl.label(g.id, lit);

        // 5) 本步候选条整组淡出（除最后一步），与下一组淡入接力。
        if (i < GEN_STEPS.length - 1 && group) {
          tl.add(
            group,
            {
              opacity: [1, 0],
              duration: TEACHING_BEAT_MS * 0.4,
              ease: "in(2)",
            },
            lit,
          );
        }
      });
    },
  });

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
          aria-label="下一个 token 预测的可控动画。上区是「已生成序列」：今、天、天、气、真五个 token 是给定的开头，模型每一步预测下一个 token、把最高概率的那个接到序列尾巴上，序列逐步拼成「今天天气真好呀」。下区是「下一个 token 的概率分布」：每一步给四个候选 token 各画一条横向概率条，最高的那条（如「好」0.62、「呀」0.41）高亮，就是被挑中接上去的 token。最后一步最高项是「结束」，于是停笔。可播放、暂停、单步、拖动进度查看。"
          className="mx-auto block h-auto w-full max-w-[600px]"
        >
          {/* ===== 上区标题 ===== */}
          <text
            x="20"
            y="32"
            fontSize="15"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            已生成序列：一个个 token 接上去
          </text>
          <text x="20" y="54" fontSize="11" fill="var(--text-secondary)">
            前 5 格是给定的开头，后面是模型逐步预测着接上的
          </text>

          {/* 序列 chip：底框 + 高亮层（新增格 anime.js 点亮）+ 文字 */}
          {FULL_SEQ.map((ch, i) => {
            const x = seqX(i);
            const isPrompt = i < PROMPT_LEN;
            return (
              <g key={`seq-${i}`}>
                <rect
                  x={x}
                  y={SEQ_Y}
                  width={SEQ_BOX_W}
                  height={SEQ_BOX_H}
                  rx="8"
                  fill={isPrompt ? "var(--accent)" : "var(--bg)"}
                  fillOpacity={isPrompt ? 0.14 : 1}
                  stroke={isPrompt ? "var(--accent)" : "var(--border)"}
                  strokeWidth={isPrompt ? 1.6 : 1.2}
                  strokeDasharray={isPrompt ? undefined : "4 4"}
                />
                {/* 非 prompt 格：动画里被「接上」时点亮的高亮层 */}
                {!isPrompt && (
                  <rect
                    ref={(el) => {
                      seqRefs.current[i] = el;
                    }}
                    x={x}
                    y={SEQ_Y}
                    width={SEQ_BOX_W}
                    height={SEQ_BOX_H}
                    rx="8"
                    fill="var(--accent)"
                    fillOpacity="0.18"
                    stroke="var(--accent)"
                    strokeWidth="2"
                    opacity="0"
                    style={{
                      transformBox: "fill-box",
                      transformOrigin: "center",
                    }}
                  />
                )}
                <text
                  x={x + SEQ_BOX_W / 2}
                  y={SEQ_Y + SEQ_BOX_H / 2 + 6}
                  textAnchor="middle"
                  fontSize="18"
                  fontWeight="700"
                  fill={
                    isPrompt ? "var(--text-primary)" : "var(--text-secondary)"
                  }
                >
                  {ch}
                </text>
              </g>
            );
          })}

          {/* 序列右侧「→ ?」提示：下一个 token 待预测 */}
          <text
            x={seqX(SEQ_TOTAL - 1) + SEQ_BOX_W + 6}
            y={SEQ_Y + SEQ_BOX_H / 2 + 5}
            fontSize="16"
            fontWeight="700"
            fill="var(--text-secondary)"
          >
            …
          </text>

          {/* ===== 分隔线 ===== */}
          <line
            x1="20"
            y1="180"
            x2={VIEW_W - 20}
            y2="180"
            stroke="var(--border)"
            strokeWidth="1"
            strokeDasharray="4 4"
          />

          {/* ===== 下区标题 ===== */}
          <text
            x="20"
            y="208"
            fontSize="15"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            下一个 token 的概率分布：挑最高的那个接上
          </text>

          {/* 每个生成步一组候选条；用 group opacity 衔接，初始仅第 1 组可见 */}
          {GEN_STEPS.map((g, gi) => (
            <g
              key={`bars-${g.id}`}
              ref={(el) => {
                groupRefs.current[g.id] = el;
              }}
              opacity={gi === 0 ? 1 : 0}
            >
              {g.candidates.map((c, ci) => {
                const y = barY(ci);
                const isPick = ci === 0; // 首项即最高、被选中
                const color = isPick ? PICK_COLOR : OTHER_COLOR;
                const w = BAR_MAX_W * c.prob;
                return (
                  <g key={`${g.id}-${ci}`}>
                    {/* 候选 token 文字（左列） */}
                    <text
                      x={BAR_LEFT - 12}
                      y={y + BAR_H / 2 + 4}
                      textAnchor="end"
                      fontSize="13"
                      fontWeight={isPick ? 700 : 400}
                      fill={
                        isPick ? "var(--text-primary)" : "var(--text-secondary)"
                      }
                    >
                      {c.token}
                    </text>
                    {/* 条底槽（满长灰底） */}
                    <rect
                      x={BAR_LEFT}
                      y={y}
                      width={BAR_MAX_W}
                      height={BAR_H}
                      rx="6"
                      fill="var(--bg)"
                      stroke="var(--border)"
                      strokeWidth="1"
                    />
                    {/* 概率条（anime.js scaleX 0→1，transformOrigin 左缘） */}
                    <rect
                      ref={(el) => {
                        barRefs.current[`${g.id}-${ci}`] = el;
                      }}
                      x={BAR_LEFT}
                      y={y}
                      width={w}
                      height={BAR_H}
                      rx="6"
                      fill={color}
                      fillOpacity={isPick ? 0.85 : 0.3}
                      style={{
                        transformBox: "fill-box",
                        transformOrigin: "left center",
                      }}
                    />
                    {/* 概率数值 */}
                    <text
                      x={PROB_VAL_X}
                      y={y + BAR_H / 2 + 4}
                      textAnchor="start"
                      fontSize="12"
                      fontWeight={isPick ? 700 : 400}
                      fill={isPick ? "var(--accent)" : "var(--text-secondary)"}
                    >
                      {c.prob.toFixed(2)}
                    </text>
                  </g>
                );
              })}
            </g>
          ))}
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="模型每一步只预测「下一个 token」：给候选算概率、挑最高的接到序列后面，再预测下一个——所谓「生成」就是反复做这件事。可暂停、单步、拖进度。"
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        「生成」不是一口气写完整句话，而是反复做一件小事：看着已有文字，给下一个
        token
        算一个概率分布，挑概率最高的那个接上去，再来一轮——直到挑中「结束」。
      </figcaption>
    </figure>
  );
}
