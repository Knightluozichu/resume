"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { DemoStage, Slider } from "../controls";

/**
 * <AmdahlCurveCanvas>: Canvas2D 交互式 Amdahl 加速比曲线（HEL-237）。
 *
 * 画 Amdahl 定律 S(N) = 1 / ((1-p) + p/N)：x 轴 = 处理器数 N（1~64，对数刻度），
 * y 轴 = 加速比 S，由「可并行比例 p」滑块驱动。同图叠一条灰色的理想线性加速参考线
 * S=N，以及一条虚线渐近线 S_max = 1/(1-p)（串行部分卡住的上限）。
 * 纯 Canvas2D —— 无 WebGL、无 three.js。
 *
 * 由 next/dynamic(ssr:false) 从 amdahl-curve-explorer.tsx 懒加载。
 *
 * 颜色运行时从 CSS 自定义属性读取（硬规则 5），无裸 hex。
 */

// ---- 纯函数：Amdahl 加速比 ----

/** Amdahl: S(N) = 1 / ((1-p) + p/N)。p 可并行比例，N 处理器数。 */
function amdahlSpeedup(n: number, p: number): number {
  return 1 / (1 - p + p / n);
}

// ---- 常量 ----

const N_MIN = 1;
const N_MAX = 64;
const SAMPLES = 256; // x 轴采样点数

const DEFAULT_P = 0.9; // 默认 90% 可并行（开箱即展示「卡上限」核心效果）

// ---- 读色辅助 ----

function readCssColor(el: HTMLElement, varName: string): string {
  const val = getComputedStyle(el).getPropertyValue(varName).trim();
  return val || "var(--text-secondary)";
}

// ---- 组件 ----

export default function AmdahlCurveCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [p, setP] = useState(DEFAULT_P);

  const handleReset = useCallback(() => {
    setP(DEFAULT_P);
  }, []);

  // ---- 绘制 ----
  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // 从 DOM 读 CSS 颜色
    const colorAccent = readCssColor(container, "--accent");
    const colorWarning = readCssColor(container, "--warning");
    const colorBorder = readCssColor(container, "--border");
    const colorTextPrimary = readCssColor(container, "--text-primary");
    const colorTextSecondary = readCssColor(container, "--text-secondary");

    // Canvas 尺寸
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    const w = rect.width;
    const h = rect.height;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.scale(dpr, dpr);

    ctx.clearRect(0, 0, w, h);

    // 布局：给坐标轴标签留足边距（≥14px，labels 不贴边）
    const padLeft = 52;
    const padRight = 20;
    const padTop = 24;
    const padBottom = 48;
    const plotW = w - padLeft - padRight;
    const plotH = h - padTop - padBottom;

    // y 轴上限：取理想上限 N_MAX 与当前曲线上限里较小者再留余量，但至少能看清曲线
    // 用固定的「漂亮」y 上限随 p 自适应：高 p 时曲线高，需要更大 y 量程
    const sMaxAsymptote = 1 / (1 - p); // 渐近线（p<1 时有限）
    const curveTop = amdahlSpeedup(N_MAX, p);
    const yMax = Math.min(
      N_MAX, // 不超过理想线性上限
      Math.max(Math.ceil(curveTop) + 1, Math.ceil(sMaxAsymptote) + 1, 4),
    );

    // x：N 用对数刻度（1..64），data(N) -> 像素
    const logMin = Math.log2(N_MIN);
    const logMax = Math.log2(N_MAX);
    const toX = (n: number) =>
      padLeft + ((Math.log2(n) - logMin) / (logMax - logMin)) * plotW;
    const toY = (s: number) => padTop + plotH - (s / yMax) * plotH;

    // ---- 网格线 ----
    ctx.strokeStyle = colorBorder;
    ctx.lineWidth = 0.5;

    // 横向网格（y 刻度）
    const yStep = yMax <= 8 ? 1 : yMax <= 16 ? 2 : yMax <= 32 ? 4 : 8;
    const yTicks: number[] = [];
    for (let v = 0; v <= yMax + 0.001; v += yStep) yTicks.push(v);
    for (const v of yTicks) {
      const py = toY(v);
      ctx.beginPath();
      ctx.moveTo(padLeft, py);
      ctx.lineTo(padLeft + plotW, py);
      ctx.stroke();
    }

    // 纵向网格（x = 1,2,4,8,16,32,64 核）
    const xTicks = [1, 2, 4, 8, 16, 32, 64];
    for (const n of xTicks) {
      const px = toX(n);
      ctx.beginPath();
      ctx.moveTo(px, padTop);
      ctx.lineTo(px, padTop + plotH);
      ctx.stroke();
    }

    // ---- 理想线性加速参考线 S=N（灰色，被 y 量程裁剪）----
    ctx.strokeStyle = colorTextSecondary;
    ctx.globalAlpha = 0.45;
    ctx.lineWidth = 1.2;
    ctx.setLineDash([2, 3]);
    ctx.beginPath();
    let started = false;
    for (let i = 0; i <= SAMPLES; i++) {
      const t = i / SAMPLES;
      const n = Math.pow(2, logMin + t * (logMax - logMin));
      const s = n; // 理想线性
      if (s > yMax) {
        // 一旦超出 y 量程就停（线性参考线会很快冲顶）
        if (started) break;
        continue;
      }
      const px = toX(n);
      const py = toY(s);
      if (!started) {
        ctx.moveTo(px, py);
        started = true;
      } else ctx.lineTo(px, py);
    }
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.globalAlpha = 1;

    // ---- 渐近线 S_max = 1/(1-p)（警告色虚线，串行部分卡住的上限）----
    if (sMaxAsymptote <= yMax) {
      const pyAsym = toY(sMaxAsymptote);
      ctx.strokeStyle = colorWarning;
      ctx.globalAlpha = 0.8;
      ctx.lineWidth = 1.4;
      ctx.setLineDash([6, 4]);
      ctx.beginPath();
      ctx.moveTo(padLeft, pyAsym);
      ctx.lineTo(padLeft + plotW, pyAsym);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.globalAlpha = 1;
    }

    // ---- Amdahl 曲线（accent，主曲线）----
    ctx.strokeStyle = colorAccent;
    ctx.lineWidth = 2.5;
    ctx.lineJoin = "round";
    ctx.beginPath();
    for (let i = 0; i <= SAMPLES; i++) {
      const t = i / SAMPLES;
      const n = Math.pow(2, logMin + t * (logMax - logMin));
      const s = amdahlSpeedup(n, p);
      const px = toX(n);
      const py = toY(s);
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.stroke();

    // 标出 N=64 处的点 + 读数
    const s64 = amdahlSpeedup(N_MAX, p);
    if (s64 <= yMax) {
      const px = toX(N_MAX);
      const py = toY(s64);
      ctx.fillStyle = colorAccent;
      ctx.beginPath();
      ctx.arc(px, py, 4, 0, Math.PI * 2);
      ctx.fill();
    }

    // ---- 坐标轴刻度标签 ----
    ctx.font = "11px ui-monospace, monospace";
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    ctx.fillStyle = colorTextSecondary;
    for (const n of xTicks) {
      ctx.fillText(`${n}`, toX(n), padTop + plotH + 6);
    }

    // x 轴标题
    ctx.font = "11px system-ui, sans-serif";
    ctx.fillText("处理器数 N", padLeft + plotW / 2, padTop + plotH + 26);

    // y 轴刻度
    ctx.textAlign = "right";
    ctx.textBaseline = "middle";
    ctx.font = "11px ui-monospace, monospace";
    for (const v of yTicks) {
      ctx.fillText(`${v}×`, padLeft - 8, toY(v));
    }

    // ---- 图例（左上角，文字距边 ≥14px）----
    const legendX = padLeft + 14;
    let legendY = padTop + 12;
    const legendSpacing = 18;
    ctx.font = "11px system-ui, sans-serif";
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";

    const drawLegendItem = (
      label: string,
      color: string,
      y: number,
      dashed: boolean,
      alpha: number,
    ) => {
      ctx.globalAlpha = alpha;
      ctx.strokeStyle = color;
      ctx.lineWidth = 2.2;
      ctx.setLineDash(dashed ? [5, 3] : []);
      ctx.beginPath();
      ctx.moveTo(legendX, y);
      ctx.lineTo(legendX + 22, y);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.globalAlpha = 1;
      ctx.fillStyle = colorTextPrimary;
      ctx.fillText(label, legendX + 28, y);
    };

    drawLegendItem("Amdahl 加速比 S(N)", colorAccent, legendY, false, 1);
    legendY += legendSpacing;
    drawLegendItem(
      `加速上限 1/(1−p) ≈ ${sMaxAsymptote.toFixed(1)}×`,
      colorWarning,
      legendY,
      true,
      0.9,
    );
    legendY += legendSpacing;
    drawLegendItem("理想线性 S=N", colorTextSecondary, legendY, true, 0.5);
  }, [p]);

  // ---- 重绘：参数变化 + ResizeObserver ----
  useEffect(() => {
    draw();
  }, [draw]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const ro = new ResizeObserver(() => draw());
    ro.observe(container);
    return () => ro.disconnect();
  }, [draw]);

  const s64 = amdahlSpeedup(N_MAX, p);
  const sMax = 1 / (1 - p);

  return (
    <DemoStage
      title="Amdahl 定律：加速比曲线"
      onReset={handleReset}
      controls={
        <>
          <Slider
            label="可并行比例 p"
            value={p}
            onChange={setP}
            min={0}
            max={0.99}
            step={0.01}
            format={(v) => `${Math.round(v * 100)}%`}
          />
          <p className="text-center text-xs text-secondary">
            64 核加速比 ≈ {s64.toFixed(1)}× · 再多核也卡在上限 1/(1−p) ≈{" "}
            {sMax.toFixed(1)}×
          </p>
        </>
      }
    >
      <div ref={containerRef} className="w-full">
        <canvas
          ref={canvasRef}
          className="h-64 w-full sm:h-72"
          aria-label={`Amdahl 加速比曲线图：可并行比例 ${Math.round(p * 100)}%，64 核加速比约 ${s64.toFixed(1)} 倍，加速上限约 ${sMax.toFixed(1)} 倍`}
        />
      </div>
    </DemoStage>
  );
}
