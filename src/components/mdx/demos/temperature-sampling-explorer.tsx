"use client";

import { useState } from "react";

import { DemoStage, Slider } from "../controls";

/**
 * <TemperatureSamplingExplorer>：「采样与温度」交互演示（HEL-254，《LLM：Agent 的大脑》
 * 篇1·2，知识点 3）。
 *
 * 前缀「今天心情真 ___」，给出几个候选的下一个 token 及其「基础概率」（温度 = 1 时的分布）。
 * 温度滑块 0.1–2.0 用「带温度的 softmax」重塑分布并实时画柱状图：
 *   低温 → 尖峰（「好」几乎必出）、高温 → 趋平（更随机，连冷门 token 都可能蹦出来）。
 * 一个「采样一次」按钮按当前分布骰一个 token、高亮结果；必有重置（回默认温度 1.0）。
 *
 * 温度-softmax：把基础概率还原成 logit = ln(p)，再按温度缩放后重新 softmax：
 *   p'_i = softmax(ln(p_i) / T)。T = 1 复原基础分布；T < 1 放大差距（尖峰）、
 *   T > 1 抹平差距（趋于均匀）。这正是 LLM「逐 token 按概率采样」里温度旋钮的作用。
 *
 * 为何 client：滑块 / 按钮是真交互（受控状态 + 随机采样），用状态直接算 SVG 属性——
 * chapter-spec「每个知识点配可视化」的 CSS/SVG 轻量演示落地（无 WebGL）。
 *
 * 颜色 / 间距 / 圆角全部走 DESIGN token（硬规则 5）：候选柱=--accent、被采样中的=--success；
 * 单一 x 公式 barX(i)，柱顶不超 viewBox 顶，柱距边 ≥14px、字号 ≥10px（HEL-274 几何硬规则）。
 */

// —— 画布与柱状图几何（viewBox 0 0 680 300；单一 x 公式；柱距边 ≥14px）。 ——
const VIEW_W = 680;
const VIEW_H = 300;

const PLOT_TOP = 64; // 柱顶最高线（柱不超此线，距 viewBox 顶 ≥14px）
const BASE_Y = 240; // 柱底基线
const PLOT_H = BASE_Y - PLOT_TOP; // 柱区高度

const CANDIDATES = [
  { token: "好", base: 0.42 },
  { token: "不错", base: 0.24 },
  { token: "糟", base: 0.14 },
  { token: "复杂", base: 0.12 },
  { token: "晴", base: 0.08 },
] as const;

const N = CANDIDATES.length;
const BAR_W = 76;
const GAP = 36; // ≥12
// 整组居中：组总宽 = N*BAR_W + (N-1)*GAP，左右对称留白。
const GROUP_W = N * BAR_W + (N - 1) * GAP;
const MARGIN = (VIEW_W - GROUP_W) / 2; // = (680 - 524)/2 = 78 ≥14
// 单一坐标公式：第 i 根柱左端 x。
const barX = (i: number) => MARGIN + i * (BAR_W + GAP);
const barCX = (i: number) => barX(i) + BAR_W / 2;

const INITIAL_TEMP = 1.0;
const TEMP_MIN = 0.1;
const TEMP_MAX = 2.0;

/** 带温度的 softmax：p'_i = softmax(ln(p_i)/T)，T=1 复原 base 分布。 */
function temperatureProbs(temp: number): number[] {
  const t = Math.max(0.01, temp);
  const logits = CANDIDATES.map((c) => Math.log(c.base) / t);
  const maxL = Math.max(...logits); // 数值稳定：减去最大值
  const exps = logits.map((l) => Math.exp(l - maxL));
  const sum = exps.reduce((a, b) => a + b, 0);
  return exps.map((e) => e / sum);
}

/** 按概率分布骰一个下标。 */
function sampleIndex(probs: number[]): number {
  const r = Math.random();
  let acc = 0;
  for (let i = 0; i < probs.length; i++) {
    acc += probs[i];
    if (r <= acc) return i;
  }
  return probs.length - 1;
}

export function TemperatureSamplingExplorer() {
  const [temp, setTemp] = useState(INITIAL_TEMP);
  const [sampled, setSampled] = useState<number | null>(null);

  const reset = () => {
    setTemp(INITIAL_TEMP);
    setSampled(null);
  };

  const probs = temperatureProbs(temp);
  const maxP = Math.max(...probs);

  const doSample = () => setSampled(sampleIndex(probs));

  // 柱高按「相对最高概率」归一化到柱区，保证最高柱顶不超 PLOT_TOP。
  const barH = (p: number) => (p / maxP) * PLOT_H;

  const tempLabel =
    temp <= 0.4 ? "低温·尖峰" : temp >= 1.4 ? "高温·趋平" : "中温";

  return (
    <DemoStage
      title="温度：LLM 逐 token 按概率采样，温度就是那个「随机性旋钮」"
      onReset={reset}
      controls={
        <>
          <Slider
            label="温度 temperature"
            min={TEMP_MIN}
            max={TEMP_MAX}
            step={0.1}
            value={temp}
            onChange={(v) => {
              setTemp(v);
              setSampled(null);
            }}
            format={(v) => v.toFixed(1)}
          />
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={doSample}
              className="rounded-control border border-accent px-3 py-1 text-xs text-accent transition-colors duration-(--duration-hover) ease-standard hover:bg-accent-glow"
            >
              🎲 采样一次
            </button>
            <span className="text-xs text-secondary">
              {sampled === null
                ? "点「采样一次」按当前分布骰一个 token"
                : `骰到了「${CANDIDATES[sampled].token}」（当前概率 ${Math.round(probs[sampled] * 100)}%）`}
            </span>
          </div>
        </>
      }
    >
      <svg
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        role="img"
        aria-label={`温度采样演示。前缀是「今天心情真 ___」，五个候选的下一个 token 是好、不错、糟、复杂、晴。当前温度 ${temp.toFixed(1)}（${tempLabel}）。柱状图显示每个候选 token 当前被采样到的概率：好 ${Math.round(probs[0] * 100)}%、不错 ${Math.round(probs[1] * 100)}%、糟 ${Math.round(probs[2] * 100)}%、复杂 ${Math.round(probs[3] * 100)}%、晴 ${Math.round(probs[4] * 100)}%。温度越低分布越尖、「好」几乎必出；温度越高分布越平、连冷门的「晴」都可能蹦出来。点采样一次会按当前分布骰一个 token 并高亮结果。${sampled !== null ? `这次骰到了「${CANDIDATES[sampled].token}」。` : ""}`}
        className="mx-auto block h-auto w-full max-w-[680px]"
      >
        {/* —— 前缀提示 —— */}
        <text
          x={VIEW_W / 2}
          y={36}
          textAnchor="middle"
          fontSize="14"
          fontWeight="700"
          fill="var(--text-primary)"
        >
          今天心情真 ___{" "}
          <tspan fontSize="11" fill="var(--text-secondary)">
            （下一个 token 选谁？）
          </tspan>
        </text>

        {/* —— 基线 —— */}
        <line
          x1={MARGIN - 14}
          y1={BASE_Y}
          x2={MARGIN + GROUP_W + 14}
          y2={BASE_Y}
          stroke="var(--border)"
          strokeWidth="1.4"
        />

        {/* —— 5 根候选柱 —— */}
        {CANDIDATES.map((c, i) => {
          const p = probs[i];
          const h = barH(p);
          const x = barX(i);
          const cx = barCX(i);
          const isHit = sampled === i;
          const color = isHit ? "var(--success)" : "var(--accent)";
          return (
            <g key={c.token}>
              {/* 柱体 */}
              <rect
                x={x}
                y={BASE_Y - h}
                width={BAR_W}
                height={h}
                rx="6"
                fill={color}
                fillOpacity={isHit ? 0.4 : 0.26}
                stroke={color}
                strokeWidth={isHit ? 2.2 : 1.4}
              />
              {/* 概率百分比（柱顶上方） */}
              <text
                x={cx}
                y={BASE_Y - h - 8}
                textAnchor="middle"
                fontSize="11.5"
                fontWeight="700"
                fill={color}
              >
                {`${Math.round(p * 100)}%`}
              </text>
              {/* token 文本（基线下方） */}
              <text
                x={cx}
                y={BASE_Y + 22}
                textAnchor="middle"
                fontSize="14"
                fontWeight={isHit ? 700 : 600}
                fill={isHit ? "var(--success)" : "var(--text-primary)"}
              >
                {c.token}
              </text>
              {/* 被采样中标记 */}
              {isHit && (
                <text
                  x={cx}
                  y={BASE_Y + 40}
                  textAnchor="middle"
                  fontSize="10"
                  fontWeight="700"
                  fill="var(--success)"
                >
                  ← 骰到这个
                </text>
              )}
            </g>
          );
        })}

        {/* —— 温度档位说明（居中，距底边 ≥14px）—— */}
        <text
          x={VIEW_W / 2}
          y={VIEW_H - 14}
          textAnchor="middle"
          fontSize="11.5"
          fontWeight="600"
          fill="var(--text-secondary)"
        >
          {temp <= 0.4
            ? `温度 ${temp.toFixed(1)}：分布很尖，几乎每次都说「好」——稳定但呆板`
            : temp >= 1.4
              ? `温度 ${temp.toFixed(1)}：分布很平，连冷门的「晴」都可能蹦出来——多样但容易跑偏`
              : `温度 ${temp.toFixed(1)}：分布有主有次，「好」最可能但不是必然`}
        </text>
      </svg>
    </DemoStage>
  );
}
