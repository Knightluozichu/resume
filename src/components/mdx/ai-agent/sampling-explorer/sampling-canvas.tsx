"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { DemoStage, Slider } from "../../controls";

/**
 * <SamplingCanvas>：Canvas2D 交互式「采样分布」图（HEL-294，采样与解码章旗舰交互）。
 *
 * 给一组固定候选 token + 原始 logits z_i，画带温度的 softmax 概率分布条形图：
 *   p_i = exp(z_i / T) / Σ_j exp(z_j / T)
 * 两个滑块驱动：
 *   - temperature T（0.1~2.0）：T 小 → 分布变陡（贪心化）；T 大 → 分布变平（发散）
 *   - top-p（0.1~1.0）：按概率从高到低累加，只保留累积概率刚够 p 的最小候选集，
 *     存活候选用 accent 实色画，被截掉的候选灰显。
 * 「采一次」按钮：在 top-p 截断 + 重新归一后的分布里掷骰子（可设种子的伪随机），
 * 标出这次抽中的 token。让读者亲手体会「温度高→更随机」「top-p 小→候选更少」。
 *
 * 纯 Canvas2D —— 无 WebGL、无 three.js。由 next/dynamic(ssr:false) 从 sampling-explorer.tsx
 * 懒加载。reduced-motion 友好：不挂常转 rAF，仅在参数变化 / resize / 点「采一次」时按需重绘。
 *
 * 颜色运行时从 CSS 自定义属性读取（硬规则 5），无裸 hex。
 */

// ---- 固定候选 token + 原始 logits（写死在组件内，作者数据）----
// 选了一组有头有尾的分布：头部几个明显更高，尾部一长串低分——好演示 top-p 砍尾巴。
type Candidate = { token: string; logit: number };

const CANDIDATES: readonly Candidate[] = [
  { token: "猫", logit: 3.2 },
  { token: "狗", logit: 2.6 },
  { token: "鸟", logit: 1.8 },
  { token: "鱼", logit: 1.1 },
  { token: "兔", logit: 0.6 },
  { token: "马", logit: 0.2 },
  { token: "龟", logit: -0.4 },
  { token: "蛇", logit: -1.0 },
];

const DEFAULT_T = 1.0;
const DEFAULT_TOP_P = 0.9;

// ---- 纯函数：带温度 softmax ----

/** 带温度的 softmax：p_i = exp(z_i/T) / Σ exp(z_j/T)。数值稳定版（减最大值）。 */
function softmaxWithTemperature(logits: number[], t: number): number[] {
  const scaled = logits.map((z) => z / t);
  const m = Math.max(...scaled);
  const exps = scaled.map((s) => Math.exp(s - m));
  const sum = exps.reduce((a, b) => a + b, 0);
  return exps.map((e) => e / sum);
}

/**
 * top-p（nucleus）截断：按概率从高到低累加，保留累积概率首次 ≥ p 的最小前缀。
 * 返回原下标里「存活」的集合（至少留 1 个，防 p 太小一个都不留）。
 */
function topPSurvivors(probs: number[], p: number): Set<number> {
  const order = probs
    .map((prob, i) => ({ prob, i }))
    .sort((a, b) => b.prob - a.prob);
  const survivors = new Set<number>();
  let acc = 0;
  for (const { prob, i } of order) {
    survivors.add(i);
    acc += prob;
    if (acc >= p) break;
  }
  return survivors;
}

/** 一个可设种子的小伪随机数发生器（mulberry32）——演示「掷骰子」可复现。 */
function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** 在「截断 + 重新归一」后的分布里按概率抽一个，返回原下标。 */
function sampleFrom(
  probs: number[],
  survivors: Set<number>,
  rand: () => number,
): number {
  // 只在存活候选里抽，权重 = 各自概率（再归一）。
  const idxs = [...survivors];
  const weights = idxs.map((i) => probs[i]);
  const wSum = weights.reduce((a, b) => a + b, 0);
  let r = rand() * wSum;
  for (let k = 0; k < idxs.length; k++) {
    r -= weights[k];
    if (r <= 0) return idxs[k];
  }
  return idxs[idxs.length - 1];
}

// ---- 读色辅助 ----

function readCssColor(el: HTMLElement, varName: string): string {
  const val = getComputedStyle(el).getPropertyValue(varName).trim();
  return val || "var(--text-secondary)";
}

// ---- 组件 ----

export default function SamplingCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [temperature, setTemperature] = useState(DEFAULT_T);
  const [topP, setTopP] = useState(DEFAULT_TOP_P);
  // 这次「采一次」抽中的原下标（null = 还没采过）。
  const [picked, setPicked] = useState<number | null>(null);
  // 递增的种子，保证每次点「采一次」结果不同、又可复现调试。
  const seedRef = useRef(1);

  const handleReset = useCallback(() => {
    setTemperature(DEFAULT_T);
    setTopP(DEFAULT_TOP_P);
    setPicked(null);
    seedRef.current = 1;
  }, []);

  const logits = CANDIDATES.map((c) => c.logit);
  const probs = softmaxWithTemperature(logits, temperature);
  const survivors = topPSurvivors(probs, topP);

  const handleSampleOnce = useCallback(() => {
    seedRef.current += 1;
    const rand = mulberry32(seedRef.current * 2654435761);
    const idx = sampleFrom(probs, survivors, rand);
    setPicked(idx);
  }, [probs, survivors]);

  // ---- 绘制 ----
  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const colorAccent = readCssColor(container, "--accent");
    const colorWarning = readCssColor(container, "--warning");
    const colorBorder = readCssColor(container, "--border");
    const colorTextPrimary = readCssColor(container, "--text-primary");
    const colorTextSecondary = readCssColor(container, "--text-secondary");

    // Canvas 尺寸（按视口宽 × dpr，避免模糊）。
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    const w = rect.width;
    const h = rect.height;
    if (w === 0 || h === 0) return; // 不在视口 / 未布局完，跳过
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    ctx.clearRect(0, 0, w, h);

    // 布局：给底部 token 标签与顶部读数留边距（≥14px）。
    const padLeft = 16;
    const padRight = 16;
    const padTop = 30;
    const padBottom = 40;
    const plotW = w - padLeft - padRight;
    const plotH = h - padTop - padBottom;

    const n = CANDIDATES.length;
    const gap = 10;
    const barW = (plotW - gap * (n - 1)) / n;

    // y 量程：固定 1.0（概率最大值），让「分布变陡/变平」的高度变化看得见。
    const yMax = 1.0;
    const toBarH = (prob: number) => (prob / yMax) * plotH;

    // 基线
    const baseY = padTop + plotH;
    ctx.strokeStyle = colorBorder;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(padLeft, baseY);
    ctx.lineTo(padLeft + plotW, baseY);
    ctx.stroke();

    // 逐根画条形。
    ctx.textAlign = "center";
    for (let i = 0; i < n; i++) {
      const x = padLeft + i * (barW + gap);
      const prob = probs[i];
      const barH = toBarH(prob);
      const y = baseY - barH;
      const alive = survivors.has(i);
      const isPicked = picked === i;

      // 条体：存活=accent 实色；被 top-p 截掉=灰显（border 色，低透明）。
      ctx.fillStyle = alive ? colorAccent : colorBorder;
      ctx.globalAlpha = alive ? (isPicked ? 1 : 0.78) : 0.35;
      ctx.beginPath();
      // 圆角顶（手画 path）
      const r = Math.min(6, barW / 2);
      ctx.moveTo(x, baseY);
      ctx.lineTo(x, y + r);
      ctx.quadraticCurveTo(x, y, x + r, y);
      ctx.lineTo(x + barW - r, y);
      ctx.quadraticCurveTo(x + barW, y, x + barW, y + r);
      ctx.lineTo(x + barW, baseY);
      ctx.closePath();
      ctx.fill();
      ctx.globalAlpha = 1;

      // 抽中的那根：加一圈 warning 描边 + 顶上一颗点。
      if (isPicked) {
        ctx.strokeStyle = colorWarning;
        ctx.lineWidth = 2.4;
        ctx.stroke();
        ctx.fillStyle = colorWarning;
        ctx.beginPath();
        ctx.arc(x + barW / 2, y - 8, 4, 0, Math.PI * 2);
        ctx.fill();
      }

      // 概率读数（条顶上方）——仅给存活候选标，避免被截的尾巴挤一堆小字。
      if (alive) {
        ctx.fillStyle = colorTextPrimary;
        ctx.font = "10px ui-monospace, monospace";
        ctx.textBaseline = "bottom";
        ctx.fillText(`${(prob * 100).toFixed(0)}%`, x + barW / 2, y - 4);
      }

      // token 标签（基线下方）。
      ctx.fillStyle = alive ? colorTextPrimary : colorTextSecondary;
      ctx.font = "12px system-ui, sans-serif";
      ctx.textBaseline = "top";
      ctx.fillText(CANDIDATES[i].token, x + barW / 2, baseY + 8);
    }

    // 顶部标题 / 读数（左对齐，距上边 ≥14px）。
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillStyle = colorTextSecondary;
    ctx.font = "11px system-ui, sans-serif";
    const aliveCount = survivors.size;
    ctx.fillText(
      `下一个 token 的概率分布 · top-p 存活 ${aliveCount}/${n} 个候选`,
      padLeft,
      10,
    );
  }, [probs, survivors, picked]);

  // 参数变化 / picked 变化时重绘。
  useEffect(() => {
    draw();
  }, [draw]);

  // resize 时重绘（仅按需，不挂常转 rAF）。
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const ro = new ResizeObserver(() => draw());
    ro.observe(container);
    return () => ro.disconnect();
  }, [draw]);

  const pickedToken = picked !== null ? CANDIDATES[picked].token : null;
  const topProb = Math.max(...probs);

  return (
    <DemoStage
      title="采样：温度与 top-p 怎么重塑下一个 token 的分布"
      onReset={handleReset}
      controls={
        <>
          <Slider
            label="温度 temperature"
            value={temperature}
            onChange={(v) => {
              setTemperature(v);
              setPicked(null);
            }}
            min={0.1}
            max={2.0}
            step={0.05}
            format={(v) => v.toFixed(2)}
          />
          <Slider
            label="top-p（核采样）"
            value={topP}
            onChange={(v) => {
              setTopP(v);
              setPicked(null);
            }}
            min={0.1}
            max={1.0}
            step={0.05}
            format={(v) => v.toFixed(2)}
          />
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={handleSampleOnce}
              className="rounded-control border border-accent px-3 py-1 text-xs font-medium text-accent transition-colors duration-(--duration-hover) ease-standard hover:bg-accent-glow"
            >
              🎲 采一次
            </button>
            <p className="text-center text-xs text-secondary">
              {pickedToken
                ? `这次掷骰子抽中了「${pickedToken}」`
                : "点「采一次」按当前分布掷骰子挑一个 token"}
              {" · "}最高概率 {Math.round(topProb * 100)}%
            </p>
          </div>
        </>
      }
    >
      <div ref={containerRef} className="w-full">
        <canvas
          ref={canvasRef}
          className="h-64 w-full sm:h-72"
          aria-label={`下一个 token 概率分布条形图：温度 ${temperature.toFixed(
            2,
          )}，top-p ${topP.toFixed(2)}，top-p 截断后存活 ${
            survivors.size
          } 个候选${pickedToken ? `，这次抽中「${pickedToken}」` : ""}`}
        />
      </div>
    </DemoStage>
  );
}
