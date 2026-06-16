"use client";

import { useRef } from "react";

import { TEACHING_BEAT_MS, TimelineControls } from "../anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "../anim/use-teaching-timeline";

/**
 * <FalseSharingDiagram>：伪共享（false sharing）缓存乒乓动画（HEL-237，§5 主 Demo）。
 *
 * 演 type D「设计并发代码」一章的核心性能陷阱：两个 CPU 核各写各的变量、逻辑上毫不共享，
 * 却因为两个变量 a、b 恰好落在**同一条缓存行（cache line）** 上，每次写都让整条缓存行在两核间
 * 来回失效 / 传输（乒乓），性能暴跌。再演「填充 / 对齐到不同缓存行（alignas）」后两核各持一行、
 * 不再乒乓。
 *
 * 餐厅后厨隐喻：两个厨师各写各的便签，本来互不相干；但两张便签恰好写在同一张必须来回传递的纸上，
 * 于是这张纸被反复抢来抢去——明明没共享内容，却互相拖累。
 *
 * 七拍：
 *  ① 初始：缓存行 L 上放着 a、b 两个变量；core0 要写 a、core1 要写 b（各写各的，逻辑不共享）；
 *  ② core0 写 a → 整条缓存行 L 归 core0（core0 持有副本）；
 *  ③ core1 写 b → 整行被抢到 core1，core0 的副本被失效（invalidate）；
 *  ④ core0 又写 a → 整行又被抢回 core0，core1 失效——来回弹（乒乓）；
 *  ⑤ 来回弹的代价：明明各写各的，缓存行却反复跨核传输，性能暴跌（标红）；
 *  ⑥ 修复：用 alignas(64) 填充，把 a、b 对齐到**两条不同**缓存行 La、Lb；
 *  ⑦ 此后 core0 独占 La、core1 独占 Lb，各持一行、再不互相失效——乒乓消失（标绿）。
 *
 * 时间线 = 一条 anime.js timeline，7 个关键帧。每拍点亮对应步骤框 + 切换缓存行归属层
 * （归 core0 / 归 core1 / 失效）。label 锚在「该拍点亮到最亮」时刻（lit = beat*(i+1)），
 * 与 CASRetryLoopDiagram / HazardPointerDiagram 同款写法，修正 off-by-one。
 *
 * 为何 client：anime.js 时钟 + 受控控制条。anime.js 经 useTeachingTimeline 动态 import
 * 切独立 chunk（硬规则 2/6），经 mdx-components 注册后 page 侧 next/dynamic(ssr:false) 懒加载。
 * 视觉全部 DESIGN token（accent / success / danger / warning / border / text-* / bg），无裸 hex；
 * 时长走 TEACHING_BEAT_MS 具名常量（硬规则 5）。
 */

const VIEW_W = 680;
const VIEW_H = 540;

const CORE0_COLOR = "var(--accent)"; // core0
const CORE1_COLOR = "var(--warning)"; // core1
const PINGPONG_COLOR = "var(--danger)"; // 乒乓 / 失效 / 性能暴跌
const FIXED_COLOR = "var(--success)"; // 修复后各持一行

// —— 左核 core0 ——
const CORE0_X = 36;
const CORE_Y = 78;
const CORE_W = 150;
const CORE_H = 60;

// —— 右核 core1 ——
const CORE1_X = 494;

// —— 中央缓存行 L（两核之间来回传的那条行）——
const LINE_X = 236;
const LINE_Y = 86;
const LINE_W = 208;
const LINE_H = 46;

// —— 底部 7 步竖排说明（紧凑） ——
const STEP_X = 36;
const STEP_W = 608;
const STEP_H = 38;
const STEP_GAP = 8;
const STEP_Y0 = 196;
const stepY = (i: number) => STEP_Y0 + i * (STEP_H + STEP_GAP);

type StepNode = {
  id: string;
  text: string;
  color: string;
};

// 7 步说明，逐拍点亮。
const STEP_NODES: readonly StepNode[] = [
  {
    id: "init",
    text: "① a、b 同在一条缓存行 L 上；core0 要写 a、core1 要写 b（各写各的，逻辑不共享）",
    color: CORE0_COLOR,
  },
  {
    id: "w-a0",
    text: "② core0 写 a → 整条缓存行 L 被读进 core0（core0 持有副本）",
    color: CORE0_COLOR,
  },
  {
    id: "w-b1",
    text: "③ core1 写 b → 整行被抢到 core1，core0 的副本被失效（invalidate）",
    color: PINGPONG_COLOR,
  },
  {
    id: "w-a0-again",
    text: "④ core0 又写 a → 整行又被抢回 core0，core1 失效——来回弹（乒乓）",
    color: PINGPONG_COLOR,
  },
  {
    id: "cost",
    text: "⑤ 明明各写各的，整行却反复跨核传输、互相失效 → 性能暴跌",
    color: PINGPONG_COLOR,
  },
  {
    id: "fix",
    text: "⑥ 修复：alignas(64) 填充，把 a、b 对齐到两条不同缓存行 La、Lb",
    color: FIXED_COLOR,
  },
  {
    id: "no-pingpong",
    text: "⑦ 此后 core0 独占 La、core1 独占 Lb，各持一行、再不互相失效——乒乓消失",
    color: FIXED_COLOR,
  },
];

// 中央缓存行每一拍的归属与文案（line ownership）。
type LineState = { owner: string; color: string };
const LINE_AT: readonly LineState[] = [
  { owner: "缓存行 L：[ a | b ]", color: "var(--text-secondary)" }, // ① 初始
  { owner: "L → 归 core0", color: CORE0_COLOR }, // ② core0 写 a
  { owner: "L → 抢到 core1（core0 失效）", color: PINGPONG_COLOR }, // ③ core1 写 b
  { owner: "L → 抢回 core0（core1 失效）", color: PINGPONG_COLOR }, // ④ core0 又写 a
  { owner: "L 在两核间来回弹 ↔", color: PINGPONG_COLOR }, // ⑤ 代价
  { owner: "拆成 La、Lb 两条行", color: FIXED_COLOR }, // ⑥ 修复
  { owner: "La 归 core0 · Lb 归 core1", color: FIXED_COLOR }, // ⑦ 完成
];

const STEPS: readonly TeachingStep[] = [
  {
    label: "init",
    caption:
      "① a、b 同在一条缓存行 L 上。core0 只写 a、core1 只写 b——各写各的、逻辑上毫不共享",
  },
  {
    label: "w-a0",
    caption:
      "② core0 写 a：CPU 以「整条缓存行」为单位搬数据，整条 L 被读进 core0",
  },
  {
    label: "w-b1",
    caption:
      "③ core1 写 b：缓存一致性协议要求整行被抢到 core1，core0 手里的那份副本随即失效",
  },
  {
    label: "w-a0-again",
    caption:
      "④ core0 想再写 a：副本已失效，只能把整行又抢回来——core1 这边又失效",
  },
  {
    label: "cost",
    caption:
      "⑤ 这就是伪共享：明明各写各的、毫不共享，整条缓存行却被反复抢来抢去、跨核传输，性能暴跌",
  },
  {
    label: "fix",
    caption:
      "⑥ 修复办法：用 alignas(64) 给 a、b 各填充到一条独立缓存行（La、Lb），让它们不再共行",
  },
  {
    label: "no-pingpong",
    caption:
      "⑦ 此后 core0 独占 La、core1 独占 Lb，各持一行、再不互相失效——乒乓消失",
  },
];

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((s) => [s.label, s.caption ?? s.label]),
);

const BEAT_OF: Record<string, number> = Object.fromEntries(
  STEPS.map((s, i) => [s.label, i]),
);

// 每拍 core0 / core1 是否「正在写 / 正持有」（用边框加粗高亮当前活跃的核）。
const CORE0_ACTIVE: readonly boolean[] = [
  false,
  true,
  false,
  true,
  false,
  false,
  true,
];
const CORE1_ACTIVE: readonly boolean[] = [
  false,
  false,
  true,
  false,
  false,
  false,
  true,
];

export function FalseSharingDiagram() {
  const stepRefs = useRef<Record<string, SVGGElement | null>>({});
  const lineRefs = useRef<Record<number, SVGGElement | null>>({});
  const core0Ref = useRef<SVGRectElement | null>(null);
  const core1Ref = useRef<SVGRectElement | null>(null);

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      // 底部 7 步：逐拍点亮（opacity 0→1）。
      STEP_NODES.forEach((n) => {
        const el = stepRefs.current[n.id];
        if (!el) return;
        const beat = BEAT_OF[n.id] ?? 0;
        tl.add(
          el,
          { opacity: [0, 1], duration: TEACHING_BEAT_MS, ease: "out(3)" },
          TEACHING_BEAT_MS * beat,
        );
        tl.label(n.id, TEACHING_BEAT_MS * (beat + 1));
      });
      // 中央缓存行：每拍只显示「该拍的归属」那一层，其余隐藏（交替点亮）。
      STEPS.forEach((_, beat) => {
        for (let i = 0; i < LINE_AT.length; i++) {
          const el = lineRefs.current[i];
          if (!el) continue;
          tl.add(
            el,
            {
              opacity: i === beat ? 1 : 0,
              duration: TEACHING_BEAT_MS,
              ease: "out(3)",
            },
            TEACHING_BEAT_MS * beat,
          );
        }
      });
      // 两核的活跃高亮：当前在写的核边框加粗（strokeWidth 2.4↔1.4 / 透明度）。
      STEPS.forEach((_, beat) => {
        if (core0Ref.current) {
          tl.add(
            core0Ref.current,
            {
              opacity: CORE0_ACTIVE[beat] ? 1 : 0,
              duration: TEACHING_BEAT_MS,
              ease: "out(3)",
            },
            TEACHING_BEAT_MS * beat,
          );
        }
        if (core1Ref.current) {
          tl.add(
            core1Ref.current,
            {
              opacity: CORE1_ACTIVE[beat] ? 1 : 0,
              duration: TEACHING_BEAT_MS,
              ease: "out(3)",
            },
            TEACHING_BEAT_MS * beat,
          );
        }
      });
    },
  });

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-x-auto rounded-card border border-border bg-elevated p-6">
        <div className="mb-4">
          <span className="inline-flex items-center gap-1 rounded-control border border-border px-2 py-1 text-xs font-medium text-accent">
            <span aria-hidden="true">⚡</span>
            可交互
          </span>
        </div>

        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="伪共享（false sharing）缓存乒乓动画。左边是 CPU 核 core0，右边是 core1，中间是一条缓存行 L，上面同时放着变量 a 和 b。第一步：a、b 同在一条缓存行上，core0 只写 a、core1 只写 b，各写各的、逻辑上毫不共享。第二步：core0 写 a，由于 CPU 以整条缓存行为单位搬数据，整条 L 被读进 core0。第三步：core1 写 b，缓存一致性协议要求整行被抢到 core1，core0 手里的副本随即失效。第四步：core0 想再写 a，副本已失效，只能把整行又抢回来，core1 这边又失效。第五步：这就是伪共享，明明各写各的、毫不共享，整条缓存行却被反复抢来抢去、跨核传输，性能暴跌。第六步：修复办法是用 alignas 64 给 a、b 各填充到一条独立缓存行 La、Lb。第七步：此后 core0 独占 La、core1 独占 Lb，各持一行、再不互相失效，乒乓消失。播放时按七步依次点亮，可播放、暂停、单步、拖动进度。"
          className="mx-auto block h-auto w-full max-w-[680px]"
        >
          {/* 标题 */}
          <text
            x="20"
            y="30"
            fontSize="14"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            伪共享：两核各写各的，却被同一条缓存行拖累
          </text>
          <text x="20" y="50" fontSize="11" fill="var(--text-secondary)">
            CPU 以「整条缓存行」为单位搬数据——a、b 共行 →
            每次写都让整行跨核来回弹
          </text>

          {/* 左核 core0：常驻框 + 活跃高亮层 */}
          <rect
            x={CORE0_X}
            y={CORE_Y}
            width={CORE_W}
            height={CORE_H}
            rx="10"
            fill={CORE0_COLOR}
            fillOpacity="0.08"
            stroke={CORE0_COLOR}
            strokeWidth="1.6"
          />
          <rect
            ref={core0Ref}
            x={CORE0_X}
            y={CORE_Y}
            width={CORE_W}
            height={CORE_H}
            rx="10"
            fill={CORE0_COLOR}
            fillOpacity="0.16"
            stroke={CORE0_COLOR}
            strokeWidth="3"
            style={{ opacity: 0 }}
          />
          <text
            x={CORE0_X + CORE_W / 2}
            y={CORE_Y + 26}
            textAnchor="middle"
            fontSize="13"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            core0
          </text>
          <text
            x={CORE0_X + CORE_W / 2}
            y={CORE_Y + 46}
            textAnchor="middle"
            fontSize="11"
            fontFamily="var(--font-mono)"
            fill="var(--text-secondary)"
          >
            反复写 a
          </text>

          {/* 右核 core1：常驻框 + 活跃高亮层 */}
          <rect
            x={CORE1_X}
            y={CORE_Y}
            width={CORE_W}
            height={CORE_H}
            rx="10"
            fill={CORE1_COLOR}
            fillOpacity="0.08"
            stroke={CORE1_COLOR}
            strokeWidth="1.6"
          />
          <rect
            ref={core1Ref}
            x={CORE1_X}
            y={CORE_Y}
            width={CORE_W}
            height={CORE_H}
            rx="10"
            fill={CORE1_COLOR}
            fillOpacity="0.16"
            stroke={CORE1_COLOR}
            strokeWidth="3"
            style={{ opacity: 0 }}
          />
          <text
            x={CORE1_X + CORE_W / 2}
            y={CORE_Y + 26}
            textAnchor="middle"
            fontSize="13"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            core1
          </text>
          <text
            x={CORE1_X + CORE_W / 2}
            y={CORE_Y + 46}
            textAnchor="middle"
            fontSize="11"
            fontFamily="var(--font-mono)"
            fill="var(--text-secondary)"
          >
            反复写 b
          </text>

          {/* 中央缓存行 L：底层常驻框 */}
          <rect
            x={LINE_X}
            y={LINE_Y}
            width={LINE_W}
            height={LINE_H}
            rx="8"
            fill="var(--text-secondary)"
            fillOpacity="0.06"
            stroke="var(--border)"
            strokeWidth="1.4"
          />
          {/* 缓存行归属层：7 拍交替点亮 */}
          {LINE_AT.map((l, i) => (
            <g
              key={`line-${i}`}
              ref={(el) => {
                lineRefs.current[i] = el;
              }}
              style={{ opacity: 0 }}
            >
              <rect
                x={LINE_X}
                y={LINE_Y}
                width={LINE_W}
                height={LINE_H}
                rx="8"
                fill={l.color}
                fillOpacity="0.16"
                stroke={l.color}
                strokeWidth="2.4"
              />
              <text
                x={LINE_X + LINE_W / 2}
                y={LINE_Y + LINE_H / 2 + 4}
                textAnchor="middle"
                fontSize="11.5"
                fontWeight="700"
                fontFamily="var(--font-mono)"
                fill="var(--text-primary)"
              >
                {l.owner}
              </text>
            </g>
          ))}
          {/* 中央缓存行标题 */}
          <text
            x={LINE_X + LINE_W / 2}
            y={LINE_Y - 12}
            textAnchor="middle"
            fontSize="11"
            fontWeight="700"
            fill="var(--text-secondary)"
          >
            共享的一条缓存行（64 字节）
          </text>
          {/* 两核与缓存行之间的「来回传」双向箭头提示 */}
          <text
            x={LINE_X + LINE_W / 2}
            y={LINE_Y + LINE_H + 22}
            textAnchor="middle"
            fontSize="11"
            fontWeight="700"
            fill={PINGPONG_COLOR}
          >
            ← 整行来回传 →
          </text>

          {/* 底部 7 步竖排，逐拍点亮 */}
          {STEP_NODES.map((n, i) => (
            <g
              key={n.id}
              ref={(el) => {
                stepRefs.current[n.id] = el;
              }}
              style={{ opacity: 0 }}
            >
              <rect
                x={STEP_X}
                y={stepY(i)}
                width={STEP_W}
                height={STEP_H}
                rx="8"
                fill={n.color}
                fillOpacity="0.14"
                stroke={n.color}
                strokeWidth="2"
              />
              <text
                x={STEP_X + 14}
                y={stepY(i) + STEP_H / 2 + 4}
                fontSize="11.5"
                fontWeight="600"
                fill="var(--text-primary)"
              >
                {n.text}
              </text>
            </g>
          ))}
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="a、b 同行 → core0 写 a 抢行 → core1 写 b 抢回（core0 失效）→ core0 又写 a 抢回（core1 失效）→ 来回弹、性能暴跌 → alignas 拆成两行 → 各持一行、乒乓消失。可暂停、单步、拖进度。"
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        伪共享：两个核明明各写各的变量、毫不共享，却因为这两个变量恰好落在同一条缓存行上，每次写都让整条缓存行在两核间来回失效、传输（乒乓），性能暴跌。把变量
        alignas 对齐 /
        填充到不同缓存行后，两核各持一行、不再互相失效，乒乓消失。
      </figcaption>
    </figure>
  );
}
