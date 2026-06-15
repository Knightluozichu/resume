"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { DemoStage, Slider, Toggle } from "../controls";

/**
 * <BrdfCurveCanvas>: Canvas2D interactive BRDF curve plotter (HEL-167).
 *
 * Plots the three Cook-Torrance sub-functions (D, G, F) as curves over
 * theta 0..90 degrees, driven by roughness slider + metallic toggle.
 * Pure Canvas2D -- no WebGL, no three.js.
 *
 * Loaded via next/dynamic(ssr:false) from brdf-curve-explorer.tsx.
 *
 * Colors read from CSS custom properties at runtime (hard rule 5).
 */

// ---- Math helpers (pure functions, no side effects) ----

/** GGX NDF: D(theta) = alpha^2 / (pi * ((cos^2(theta)*(alpha^2-1)+1))^2) */
function ndfGGX(cosTheta: number, roughness: number): number {
  const a = roughness * roughness;
  const a2 = a * a;
  const cos2 = cosTheta * cosTheta;
  const denom = cos2 * (a2 - 1) + 1;
  return a2 / (Math.PI * denom * denom);
}

/** Schlick-GGX single-direction geometry sub-function */
function gSchlickGGXSub(cosVal: number, k: number): number {
  return cosVal / (cosVal * (1 - k) + k);
}

/** Smith geometry: G_sub(cosTheta, k) * G_sub(cos45, k), k = (roughness+1)^2/8 */
function geometrySmith(cosTheta: number, roughness: number): number {
  const r = roughness + 1;
  const k = (r * r) / 8;
  const cos45 = Math.SQRT1_2; // cos(45 deg) ~ 0.7071
  return gSchlickGGXSub(cosTheta, k) * gSchlickGGXSub(cos45, k);
}

/** Fresnel-Schlick: F = F0 + (1-F0)*(1-cosTheta)^5 */
function fresnelSchlick(cosTheta: number, f0: number): number {
  const t = 1 - cosTheta;
  return f0 + (1 - f0) * t * t * t * t * t;
}

// ---- Constants ----

const SAMPLES = 180; // number of points along x-axis
const THETA_MAX = Math.PI / 2; // 90 deg

const DEFAULT_ROUGHNESS = 0.5;
const DEFAULT_METALLIC = false;

// F0 values
const F0_DIELECTRIC = 0.04;
const F0_METAL = 0.7;

// ---- Color reading helper ----

function readCssColor(el: HTMLElement, varName: string): string {
  const val = getComputedStyle(el).getPropertyValue(varName).trim();
  return val || "#888";
}

// ---- Component ----

export default function BrdfCurveCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [roughness, setRoughness] = useState(DEFAULT_ROUGHNESS);
  const [metallic, setMetallic] = useState(DEFAULT_METALLIC);

  const handleReset = useCallback(() => {
    setRoughness(DEFAULT_ROUGHNESS);
    setMetallic(DEFAULT_METALLIC);
  }, []);

  // ---- Draw ----
  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Read CSS colors from DOM
    const colorAccent = readCssColor(container, "--accent");
    const colorSuccess = readCssColor(container, "--success");
    const colorWarning = readCssColor(container, "--warning");
    const colorBorder = readCssColor(container, "--border");
    const colorTextPrimary = readCssColor(container, "--text-primary");
    const colorTextSecondary = readCssColor(container, "--text-secondary");

    // Canvas sizing
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    const w = rect.width;
    const h = rect.height;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.scale(dpr, dpr);

    // Clear
    ctx.clearRect(0, 0, w, h);

    // Layout: padding for labels
    const padLeft = 48;
    const padRight = 16;
    const padTop = 16;
    const padBottom = 40;
    const plotW = w - padLeft - padRight;
    const plotH = h - padTop - padBottom;

    // Compute curve data
    const f0 = metallic ? F0_METAL : F0_DIELECTRIC;
    const dCurve: number[] = [];
    const gCurve: number[] = [];
    const fCurve: number[] = [];

    for (let i = 0; i <= SAMPLES; i++) {
      const theta = (i / SAMPLES) * THETA_MAX;
      const cosT = Math.cos(theta);
      dCurve.push(ndfGGX(cosT, roughness));
      gCurve.push(geometrySmith(cosT, roughness));
      fCurve.push(fresnelSchlick(cosT, f0));
    }

    // Auto-scale Y: D can exceed 1 for low roughness
    const dMax = Math.max(...dCurve, 1);
    const yMax = Math.max(dMax * 1.1, 1.1); // at least 1.1 so G/F have room

    // Helpers: data -> pixel
    const toX = (i: number) => padLeft + (i / SAMPLES) * plotW;
    const toY = (val: number) => padTop + plotH - (val / yMax) * plotH;

    // ---- Grid lines ----
    ctx.strokeStyle = colorBorder;
    ctx.lineWidth = 0.5;

    // Horizontal grid lines
    const niceYTicks: number[] = [];
    const yStep = yMax <= 1.5 ? 0.25 : yMax <= 3 ? 0.5 : yMax <= 6 ? 1 : 2;
    for (let v = 0; v <= yMax; v += yStep) {
      niceYTicks.push(Math.round(v * 100) / 100);
    }

    for (const v of niceYTicks) {
      const py = toY(v);
      ctx.beginPath();
      ctx.moveTo(padLeft, py);
      ctx.lineTo(padLeft + plotW, py);
      ctx.stroke();
    }

    // Vertical grid lines at 0, 15, 30, 45, 60, 75, 90 deg
    const xAngles = [0, 15, 30, 45, 60, 75, 90];
    for (const deg of xAngles) {
      const px = toX((deg / 90) * SAMPLES);
      ctx.beginPath();
      ctx.moveTo(px, padTop);
      ctx.lineTo(px, padTop + plotH);
      ctx.stroke();
    }

    // ---- Axis labels ----
    ctx.font = "11px ui-monospace, monospace";
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    ctx.fillStyle = colorTextSecondary;

    for (const deg of xAngles) {
      const px = toX((deg / 90) * SAMPLES);
      ctx.fillText(`${deg}°`, px, padTop + plotH + 6);
    }

    // X-axis label
    ctx.font = "11px system-ui, sans-serif";
    ctx.fillText("θ (theta)", padLeft + plotW / 2, padTop + plotH + 22);

    // Y-axis labels
    ctx.textAlign = "right";
    ctx.textBaseline = "middle";
    ctx.font = "11px ui-monospace, monospace";
    for (const v of niceYTicks) {
      const py = toY(v);
      ctx.fillText(v.toFixed(v % 1 === 0 ? 0 : 2), padLeft - 6, py);
    }

    // ---- Draw curves ----
    const drawCurve = (data: number[], color: string) => {
      ctx.strokeStyle = color;
      ctx.lineWidth = 2.5;
      ctx.lineJoin = "round";
      ctx.beginPath();
      for (let i = 0; i <= SAMPLES; i++) {
        const px = toX(i);
        const py = toY(data[i]);
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.stroke();
    };

    drawCurve(dCurve, colorAccent);
    drawCurve(gCurve, colorSuccess);
    drawCurve(fCurve, colorWarning);

    // ---- Legend ----
    const legendX = padLeft + 12;
    let legendY = padTop + 12;
    const legendSpacing = 20;
    ctx.font = "12px system-ui, sans-serif";
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";

    const drawLegendItem = (label: string, color: string, y: number) => {
      ctx.strokeStyle = color;
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(legendX, y);
      ctx.lineTo(legendX + 20, y);
      ctx.stroke();
      ctx.fillStyle = colorTextPrimary;
      ctx.fillText(label, legendX + 26, y);
    };

    drawLegendItem("D (NDF GGX)", colorAccent, legendY);
    legendY += legendSpacing;
    drawLegendItem("G (Smith-Schlick)", colorSuccess, legendY);
    legendY += legendSpacing;
    drawLegendItem("F (Fresnel-Schlick)", colorWarning, legendY);
  }, [roughness, metallic]);

  // ---- ResizeObserver + redraw on param change ----
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

  return (
    <DemoStage
      title="BRDF D / G / F 曲线"
      onReset={handleReset}
      controls={
        <>
          <Slider
            label="粗糙度"
            value={roughness}
            onChange={setRoughness}
            min={0.05}
            max={1}
            step={0.05}
            format={(v) => v.toFixed(2)}
          />
          <Toggle
            label={metallic ? "金属" : "电介质"}
            checked={metallic}
            onChange={setMetallic}
          />
        </>
      }
    >
      <div ref={containerRef} className="w-full">
        <canvas
          ref={canvasRef}
          className="h-64 w-full sm:h-72"
          aria-label={`BRDF 曲线图：粗糙度 ${roughness.toFixed(2)}，${metallic ? "金属" : "电介质"}模式`}
        />
      </div>
    </DemoStage>
  );
}
