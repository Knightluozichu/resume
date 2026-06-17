"use client";

import { useState } from "react";

import { DemoStage, Toggle } from "../controls";

/**
 * <CostBudgetDemo>：成本控制三手段「无控制 vs 有控制」的交互演示（HEL-318，《安全护栏与
 * 成本控制》篇5·2，知识点 4：成本控制）。
 *
 * 全书隐喻：AI Agent = 私人助理「小特」。它每次调大脑（LLM）都在烧 token = 烧钱。这一节给
 * 它装三个「省钱开关」：缓存 / 限流（限轮数）/ 选小模型，看同一个任务的花费怎么降下来。
 *
 * 成本模型（canned 示意，但算得自洽、能复现）：一个任务跑若干步，无控制时每步都调最贵的大
 * 模型、重复问题重复调、不限轮数 → 基线成本。三个手段各砍一刀，互相独立、可叠加：
 *   - 用小模型：简单步换便宜小模型，单步均价下降（× 0.35）；
 *   - 缓存：重复 / 相似的步命中缓存、不再调模型，等于砍掉一部分步（步数 × 0.6）；
 *   - 限流（限轮数）：给任务设轮数上限，砍掉那些「为求稳无脑多转」的步（步数 × 0.7）。
 * 总成本 = 步数 × 单步均价；左边永远是「无控制」基线，右边是「当前开关」的成本，
 * 标出「省了百分之几」。三个全开 ≈ 省 ~85%（小模型省 65% + 缓存 40% + 限流 30% 叠加）。
 *
 * 这是 **canned 示意**（标注「系数为示意，非真实账单」）——不真去跑模型 / 算真账单，倍率是
 * 预置的，只为直观展示「三个手段怎么把成本压下来」。必有重置（回默认：三个开关全关 = 看基线）。
 *
 * 为何 client：三个开关是真交互（受控状态 + 重算成本柱）。颜色 / 间距 / 圆角全走 DESIGN token
 * （硬规则 5）；两根成本柱用 SVG（单一坐标公式），text/rect 距 viewBox 边 ≥16px、顶 caption
 * y≥20、字号 ≥10px、利用率 ≥55%；无 WebGL。
 */

// —— 基线成本模型（无控制）。 ——
const BASE_STEPS = 12; // 无控制：任务无脑跑 12 步
const BASE_PRICE = 100; // 无控制：每步都用最贵大模型，单步均价 100（相对单位）
const BASELINE = BASE_STEPS * BASE_PRICE; // 1200

// 三个手段各自的倍率（独立叠加）。
const SMALL_MODEL_PRICE = 0.35; // 选小模型：单步均价 × 0.35
const CACHE_STEPS = 0.6; // 缓存：命中后等于砍掉部分步 → 步数 × 0.6
const RATELIMIT_STEPS = 0.7; // 限流（限轮数）：砍掉无脑多转的步 → 步数 × 0.7

type Levers = {
  smallModel: boolean;
  cache: boolean;
  rateLimit: boolean;
};

const ALL_OFF: Levers = { smallModel: false, cache: false, rateLimit: false };

/** 按当前开关算「有控制」的成本（步数 × 单步均价，倍率独立叠加）。 */
function costOf(l: Levers): number {
  let steps = BASE_STEPS;
  if (l.cache) steps *= CACHE_STEPS;
  if (l.rateLimit) steps *= RATELIMIT_STEPS;
  let price = BASE_PRICE;
  if (l.smallModel) price *= SMALL_MODEL_PRICE;
  return steps * price;
}

// —— 画布与成本柱几何（viewBox 0 0 660 260；两根柱距边 ≥16px）。 ——
const VIEW_W = 660;
const VIEW_H = 260;
const TOP_CAPTION_Y = 28; // 顶 caption 基线 ≥20，bbox 距顶 ≥16px

const PLOT_TOP = 56; // 柱区顶（满柱顶边）
const PLOT_BOTTOM = 196; // 柱区底（基线 = 横轴）
const PLOT_H = PLOT_BOTTOM - PLOT_TOP; // 140
const BAR_W = 150;
const LEFT_CX = 190; // 「无控制」柱中心 x
const RIGHT_CX = 470; // 「有控制」柱中心 x

export function CostBudgetDemo() {
  const [levers, setLevers] = useState<Levers>(ALL_OFF);
  const reset = () => setLevers(ALL_OFF);
  const setOne = (k: keyof Levers, v: boolean) =>
    setLevers((prev) => ({ ...prev, [k]: v }));

  const controlled = costOf(levers);
  const savedPct = Math.round((1 - controlled / BASELINE) * 100);
  const anyOn = levers.smallModel || levers.cache || levers.rateLimit;

  // 柱高按成本 / 基线线性映射（基线柱永远满高）。
  const baseH = PLOT_H;
  const ctrlH = (controlled / BASELINE) * PLOT_H;
  const ctrlColor =
    savedPct >= 50
      ? "var(--success)"
      : savedPct > 0
        ? "var(--warning)"
        : "var(--danger)";

  return (
    <DemoStage
      title="成本控制：同一个任务，开启「小模型 + 缓存 + 限流」，花费怎么降下来"
      onReset={reset}
      controls={
        <div className="flex flex-col gap-2.5">
          <span className="text-xs text-secondary">
            逐个打开三个省钱手段，看右边「有控制」的成本柱往下掉：
          </span>
          <Toggle
            checked={levers.smallModel}
            onChange={(v) => setOne("smallModel", v)}
            label="选小模型：简单步用便宜小模型，别一律上最贵的（单步均价 ↓）"
          />
          <Toggle
            checked={levers.cache}
            onChange={(v) => setOne("cache", v)}
            label="缓存：重复 / 相似的问题命中缓存，直接返回不再调模型（步数 ↓）"
          />
          <Toggle
            checked={levers.rateLimit}
            onChange={(v) => setOne("rateLimit", v)}
            label="限流：给任务设轮数上限，砍掉无脑多转的步（步数 ↓）"
          />
        </div>
      }
    >
      <svg
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        role="img"
        aria-label={`成本控制演示。两根成本柱对比：左边「无控制」是基线成本 ${BASELINE} 个单位（每步都用最贵大模型、重复调、不限轮数）；右边「有控制」是当前开关下的成本 ${controlled} 个单位。当前${
          levers.smallModel ? "已开启小模型、" : ""
        }${levers.cache ? "已开启缓存、" : ""}${
          levers.rateLimit ? "已开启限流、" : ""
        }${anyOn ? `相比基线省下了约 ${savedPct}%。` : "三个手段都没开，成本与基线持平。"}逐个打开「选小模型 / 缓存 / 限流」三个开关，右边的成本柱会随之往下掉。系数为示意、非真实账单。`}
        className="mx-auto block h-auto w-full max-w-[660px]"
      >
        {/* 顶 caption（baseline y≥20，bbox 距顶 ≥16px） */}
        <text
          x={VIEW_W / 2}
          y={TOP_CAPTION_Y}
          textAnchor="middle"
          fontSize="13"
          fontWeight="700"
          fill="var(--text-primary)"
        >
          同一个任务的成本：无控制 vs 有控制
        </text>

        {/* 横轴基线 */}
        <line
          x1={40}
          y1={PLOT_BOTTOM}
          x2={VIEW_W - 40}
          y2={PLOT_BOTTOM}
          stroke="var(--border)"
          strokeWidth="1.4"
        />

        {/* —— 左：无控制（基线，满柱，红）—— */}
        <rect
          x={LEFT_CX - BAR_W / 2}
          y={PLOT_TOP}
          width={BAR_W}
          height={baseH}
          rx="6"
          fill="var(--danger)"
          fillOpacity="0.35"
          stroke="var(--danger)"
          strokeWidth="1.4"
        />
        <text
          x={LEFT_CX}
          y={PLOT_TOP - 10}
          textAnchor="middle"
          fontSize="12"
          fontWeight="700"
          fill="var(--danger)"
        >
          {`无控制：${BASELINE}`}
        </text>
        <text
          x={LEFT_CX}
          y={PLOT_BOTTOM + 20}
          textAnchor="middle"
          fontSize="10.5"
          fill="var(--text-secondary)"
        >
          每步最贵模型 · 重复调 · 不限轮
        </text>

        {/* —— 右：有控制（按开关，柱高随成本，绿/黄）—— */}
        <rect
          x={RIGHT_CX - BAR_W / 2}
          y={PLOT_BOTTOM - ctrlH}
          width={BAR_W}
          height={ctrlH}
          rx="6"
          fill={ctrlColor}
          fillOpacity="0.35"
          stroke={ctrlColor}
          strokeWidth="1.6"
        />
        <text
          x={RIGHT_CX}
          y={PLOT_BOTTOM - ctrlH - 10}
          textAnchor="middle"
          fontSize="12"
          fontWeight="700"
          fill={ctrlColor}
        >
          {`有控制：${Math.round(controlled)}`}
        </text>
        <text
          x={RIGHT_CX}
          y={PLOT_BOTTOM + 20}
          textAnchor="middle"
          fontSize="10.5"
          fill="var(--text-secondary)"
        >
          {anyOn
            ? [
                levers.smallModel ? "小模型" : null,
                levers.cache ? "缓存" : null,
                levers.rateLimit ? "限流" : null,
              ]
                .filter(Boolean)
                .join(" + ")
            : "三个手段都没开"}
        </text>

        {/* 省了百分之几（居中大字，距底边 ≥16px） */}
        <text
          x={VIEW_W / 2}
          y={VIEW_H - 18}
          textAnchor="middle"
          fontSize="12.5"
          fontWeight="700"
          fill={anyOn ? ctrlColor : "var(--text-secondary)"}
        >
          {anyOn
            ? `相比无控制，省下约 ${savedPct}% 的花费`
            : "打开右边任一手段，看成本往下掉"}
        </text>
      </svg>
    </DemoStage>
  );
}
