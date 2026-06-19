"use client";

import dynamic from "next/dynamic";
import { useRef, useState } from "react";

import { TEACHING_BEAT_MS, TimelineControls } from "../anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "../anim/use-teaching-timeline";
import { Slider } from "../controls";

/**
 * <LostInMiddleDemo>：「迷失在中间（lost-in-the-middle）」旗舰可控教学动画 + 交互
 * （HEL-306，《上下文工程与压缩》篇3·2，知识点 4）。
 *
 * 全书隐喻：AI Agent = 私人助理「小特」。本章主隐喻：小特的「桌面」（上下文窗口）就那么大。
 * 这个 viz 讲的是一个反直觉的事实：就算东西都摆上了桌，小特对**不同位置**的注意力并不均匀——
 * 开头和结尾记得牢、用得上，正中间的容易被忽略（注意力呈 U 形：两头高、中间低）。所以
 * **重要信息要放首尾，别埋在中间**。这正是第 2 章 trap 预告过的「迷失在中间」。
 *
 * 两层呈现：
 *  1) anime「扫描探针」从头扫到尾，逐个位置点亮其注意力强度——首尾位置亮、中间位置暗，
 *     直观看出 U 形注意力曲线。所有元素首帧 opacity≈0.2 淡显（HEL-292），探针扫到才提到 1。
 *  2) 交互：拖「关键信息位置」滑块，把那条关键信息摆在不同格子上，实时读出「被抓住的概率」
 *     （= 该位置的注意力强度）——放中间概率最低（被忽略），放首尾概率最高（被抓住）。
 *
 * 为何 client：anime.js 时钟 + 受控控制条 + 滑块都是真交互。anime.js 经 useTeachingTimeline
 * 内部动态 import 切独立 chunk（硬规则 2/6），本文件再用 next/dynamic(ssr:false) 包成动态边界。
 *
 * 几何守 HEL-274/296/299：单一 x 公式横向排格、禁套整圈容器大框、text/rect 距 viewBox 边
 * ≥16px（顶 caption y≥20）、字号 ≥10px、利用率 ≥55%；全 DESIGN token 无裸 hex。
 */

// —— 画布与位置格几何（viewBox 0 0 680 360；距边 ≥16px）。 ——
const VIEW_W = 680;
const VIEW_H = 360;

const N = 11; // 上下文里的位置格数（奇数，正中间唯一）

const CELL_W = 48; // 每格宽
const CELL_GAP = 6; // 格间距
const ROW_W = N * CELL_W + (N - 1) * CELL_GAP; // 整排宽
const ROW_X = (VIEW_W - ROW_W) / 2; // 居中排布的左端（单一 x 公式起算）
const CELL_Y = 250; // 位置格顶边
const CELL_H = 40;

// 注意力曲线区（U 形：两头高、中间低）。
const CURVE_TOP = 70; // 曲线最高点 y（注意力=1）
const CURVE_BOT = 210; // 曲线最低点 y 基线（注意力=0）
const cellCx = (i: number) => ROW_X + i * (CELL_W + CELL_GAP) + CELL_W / 2;

/**
 * 位置 i（0..N-1）的「注意力强度」∈[0,1]：U 形——两端 1、正中间最低（约 0.18）。
 * 用归一化中心距的二次型造 U：att = lo + (1-lo) * (2*|i/(N-1)-0.5|)^p。
 */
const MID_LOW = 0.18;
function attentionAt(i: number): number {
  const t = i / (N - 1); // 0..1
  const d = Math.abs(t - 0.5) * 2; // 中心 0，两端 1
  return MID_LOW + (1 - MID_LOW) * Math.pow(d, 1.4);
}

// 注意力强度 → 曲线 y（强度高 = 靠上）。
const attY = (a: number) => CURVE_BOT - a * (CURVE_BOT - CURVE_TOP);

// U 形折线路径（连各位置点）。
const CURVE_POINTS = Array.from({ length: N }, (_, i) => ({
  x: cellCx(i),
  y: attY(attentionAt(i)),
}));
const CURVE_PATH = "M " + CURVE_POINTS.map((p) => `${p.x} ${p.y}`).join(" L ");

// —— anime 关键帧：探针从位置 0 扫到 N-1，逐个点亮。 ——
const STEPS: readonly TeachingStep[] = Array.from({ length: N }, (_, i) => {
  const a = attentionAt(i);
  const zone =
    i === 0 || i === N - 1 ? "首尾" : i === (N - 1) / 2 ? "正中间" : "";
  const verdict =
    a >= 0.7
      ? "注意力高——放这里的信息被牢牢抓住"
      : a <= 0.35
        ? "注意力低——放这里的信息容易被忽略（迷失在中间）"
        : "注意力中等——离两头越远越靠不住";
  return {
    label: `pos-${i}`,
    caption: `扫到第 ${i + 1} 个位置${zone ? `（${zone}）` : ""}：注意力强度约 ${Math.round(
      a * 100,
    )}%。${verdict}`,
  };
});

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((s) => [s.label, s.caption ?? s.label]),
);

// 关键信息位置滑块初值：正中间（最容易被忽略，初始就展示「翻车」效果）。
const INITIAL_KEY = Math.floor((N - 1) / 2);

function LostInMiddleDemoInner() {
  // 每个位置「柱 + 点」的引用，喂给 anime.js 逐个点亮。
  const barRef = useRef<Record<number, SVGGElement | null>>({});
  const [keyPos, setKeyPos] = useState(INITIAL_KEY);

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      STEPS.forEach((_step, i) => {
        const start = TEACHING_BEAT_MS * i;
        const lit = TEACHING_BEAT_MS * (i + 1);
        const g = barRef.current[i];
        if (g) {
          tl.add(
            g,
            {
              opacity: [0.2, 1],
              duration: TEACHING_BEAT_MS,
              ease: "out(2)",
            },
            start,
          );
        }
        tl.label(`pos-${i}`, lit);
      });
    },
  });

  const keyAtt = attentionAt(keyPos);
  const keyPct = Math.round(keyAtt * 100);
  const keyZone =
    keyPos === 0 || keyPos === N - 1
      ? "首尾"
      : keyPos === (N - 1) / 2
        ? "正中间"
        : "中段";
  const keyHigh = keyAtt >= 0.7;
  const keyLow = keyAtt <= 0.35;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="rounded-card border border-border bg-elevated p-6">
        {/* ⚡ 可交互标签 + 滑块 */}
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <span className="inline-flex items-center gap-1 rounded-control border border-border px-2 py-1 text-xs font-medium text-accent">
            <span aria-hidden="true">⚡</span>
            可交互
          </span>
          <button
            type="button"
            onClick={() => setKeyPos(INITIAL_KEY)}
            aria-label="重置关键信息位置"
            className="rounded-control border border-border px-2 py-1 text-xs text-secondary transition-colors duration-(--duration-hover) ease-standard hover:border-accent hover:text-primary"
          >
            重置
          </button>
        </div>

        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label={`迷失在中间演示。横排 ${N} 个位置代表一段长上下文，上方一条注意力强度曲线呈 U 形：开头和结尾的位置注意力高（两头高），正中间的位置注意力低（中间低）。播放时一个扫描探针从第一个位置扫到最后一个，逐个点亮该位置的注意力柱。一条标星的关键信息当前放在第 ${keyPos + 1} 个位置（属于${keyZone}），该位置注意力强度约 ${keyPct}%，所以这条关键信息${keyHigh ? "被牢牢抓住" : keyLow ? "很容易被模型忽略，也就是迷失在中间" : "抓得不太牢"}。拖动滑块把关键信息挪到不同位置：放首尾抓得最牢，放正中间最容易被忽略。结论：重要信息要放在上下文的首尾，别埋在中间。`}
          className="mx-auto block h-auto w-full max-w-[680px]"
        >
          {/* —— 顶部主标题（左对齐，y≥20，距顶 / 左右边 ≥16px）—— */}
          <text
            x={ROW_X}
            y={28}
            textAnchor="start"
            fontSize="11.5"
            fontWeight="700"
            fill="var(--text-secondary)"
          >
            注意力沿上下文位置呈 U 形：两头高、中间低 ↓（探针扫一遍看看）
          </text>

          {/* —— 注意力坐标轴 + U 形曲线 —— */}
          <line
            x1={ROW_X}
            y1={CURVE_BOT}
            x2={ROW_X + ROW_W}
            y2={CURVE_BOT}
            stroke="var(--border)"
            strokeWidth="1.2"
          />
          <text
            x={ROW_X}
            y={CURVE_TOP - 6}
            textAnchor="start"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            注意力强度 ↑
          </text>
          {/* U 形曲线（淡显参考线，始终可见） */}
          <path
            d={CURVE_PATH}
            fill="none"
            stroke="var(--accent)"
            strokeWidth="2"
            strokeOpacity="0.45"
            strokeDasharray="4 4"
          />

          {/* —— N 个位置的「注意力柱 + 顶点 + 位置格」—— */}
          {Array.from({ length: N }, (_, i) => {
            const cx = cellCx(i);
            const a = attentionAt(i);
            const topY = attY(a);
            const isKey = i === keyPos;
            // 首尾绿、中间随强度由暖转冷：简单用 success / danger / accent 三档着色。
            const barColor =
              a >= 0.7
                ? "var(--success)"
                : a <= 0.35
                  ? "var(--danger)"
                  : "var(--accent)";
            return (
              <g
                key={i}
                ref={(el) => {
                  barRef.current[i] = el;
                }}
                opacity="0.2"
              >
                {/* 注意力柱（从基线升到曲线顶点） */}
                <rect
                  x={cx - 7}
                  y={topY}
                  width={14}
                  height={CURVE_BOT - topY}
                  rx="3"
                  fill={barColor}
                  fillOpacity="0.3"
                />
                {/* 曲线顶点 */}
                <circle cx={cx} cy={topY} r="4" fill={barColor} />
                {/* 强度读数（柱顶上方，字号 ≥10px） */}
                <text
                  x={cx}
                  y={topY - 7}
                  textAnchor="middle"
                  fontSize="10"
                  fontWeight="600"
                  fill={barColor}
                >
                  {Math.round(a * 100)}
                </text>

                {/* 位置格（下方一排，代表上下文的一个位置） */}
                <rect
                  x={cx - CELL_W / 2}
                  y={CELL_Y}
                  width={CELL_W}
                  height={CELL_H}
                  rx="6"
                  fill={isKey ? barColor : "var(--bg)"}
                  fillOpacity={isKey ? 0.25 : 1}
                  stroke={isKey ? barColor : "var(--border)"}
                  strokeWidth={isKey ? 2.2 : 1.2}
                />
                <text
                  x={cx}
                  y={CELL_Y + CELL_H / 2 + 4}
                  textAnchor="middle"
                  fontSize="11"
                  fontWeight={isKey ? 700 : 400}
                  fill={isKey ? barColor : "var(--text-secondary)"}
                >
                  {isKey ? "★" : i + 1}
                </text>
              </g>
            );
          })}

          {/* —— 首 / 中 / 尾 三个区位标注（位置格下方，距底边 ≥16px）—— */}
          <text
            x={cellCx(0)}
            y={CELL_Y + CELL_H + 18}
            textAnchor="middle"
            fontSize="10.5"
            fontWeight="600"
            fill="var(--success)"
          >
            开头·记得牢
          </text>
          <text
            x={cellCx((N - 1) / 2)}
            y={CELL_Y + CELL_H + 18}
            textAnchor="middle"
            fontSize="10.5"
            fontWeight="600"
            fill="var(--danger)"
          >
            正中间·易忽略
          </text>
          <text
            x={cellCx(N - 1)}
            y={CELL_Y + CELL_H + 18}
            textAnchor="middle"
            fontSize="10.5"
            fontWeight="600"
            fill="var(--success)"
          >
            结尾·记得牢
          </text>

          {/* —— 底部：★关键信息当前命中概率（一句话，距底边 ≥16px）—— */}
          <text
            x={VIEW_W / 2}
            y={VIEW_H - 16}
            textAnchor="middle"
            fontSize="11.5"
            fontWeight="700"
            fill={
              keyHigh
                ? "var(--success)"
                : keyLow
                  ? "var(--danger)"
                  : "var(--accent)"
            }
          >
            {`★ 关键信息在第 ${keyPos + 1} 位（${keyZone}）→ 被抓住的概率约 ${keyPct}%`}
            {keyLow ? " · 埋中间被忽略了！" : keyHigh ? " · 放对位置了" : ""}
          </text>
        </svg>

        {/* —— 关键信息位置滑块 —— */}
        <div className="mt-4 border-t border-border pt-4">
          <Slider
            label="把★关键信息放在第几个位置"
            min={0}
            max={N - 1}
            step={1}
            value={keyPos}
            onChange={setKeyPos}
            format={(v) => `第 ${v + 1} 位`}
          />
        </div>

        {/* 控制条：播放扫描探针 */}
        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="点播放，看扫描探针从头扫到尾逐个点亮各位置的注意力——首尾亮、中间暗，注意力呈 U 形。再拖上面的滑块把★关键信息挪到不同位置，看它被抓住的概率。"
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        迷失在中间：模型对上下文的注意力呈 U
        形（首尾高、中间低）——重要信息要放在首尾，别埋进正中间。
      </figcaption>
    </figure>
  );
}

/**
 * 动态边界：anime.js 叶子组件经 next/dynamic(ssr:false) 懒加载，绝不进首屏 / 公共 layout
 * （硬规则 2/6）。导出名供 mdx-components 注册。
 */
const LostInMiddleDynamic = dynamic(
  () => Promise.resolve(LostInMiddleDemoInner),
  {
    ssr: false,
    loading: () => (
      <div className="mdx-figure not-prose mx-auto my-6 rounded-card border border-border bg-elevated p-6">
        <div className="flex min-h-72 items-center justify-center text-center">
          <p className="text-sm text-secondary">注意力曲线动画加载中…</p>
        </div>
      </div>
    ),
  },
);

export function LostInMiddleDemo() {
  return <LostInMiddleDynamic />;
}
