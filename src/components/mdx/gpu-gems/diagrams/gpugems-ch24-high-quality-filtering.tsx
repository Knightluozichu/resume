"use client";

import { useState, type ReactNode } from "react";

const accent = "var(--accent)";
const success = "var(--success)";
const warning = "var(--warning)";
const danger = "var(--danger)";
const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";
const surface = "var(--surface)";

function rounded(value: number) {
  return Number(value.toFixed(3));
}

function Frame({
  ariaLabel,
  caption,
  children,
}: {
  ariaLabel: string;
  caption: string;
  children: ReactNode;
}) {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox="0 0 720 420"
          role="img"
          aria-label={ariaLabel}
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {children}
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        {caption}
      </figcaption>
    </figure>
  );
}

function ArrowDefs() {
  return (
    <defs>
      <marker
        id="ch24-arrow"
        viewBox="0 0 10 10"
        refX="8"
        refY="5"
        markerWidth="6"
        markerHeight="6"
        orient="auto-start-reverse"
      >
        <path d="M 0 0 L 10 5 L 0 10 z" fill={accent} />
      </marker>
      <linearGradient id="ch24-signal-gradient" x1="0" x2="1">
        <stop offset="0" stopColor={danger} stopOpacity="0.72" />
        <stop offset="0.5" stopColor={warning} stopOpacity="0.48" />
        <stop offset="1" stopColor={success} stopOpacity="0.7" />
      </linearGradient>
      <linearGradient id="ch24-window-gradient" x1="0" x2="1">
        <stop offset="0" stopColor={accent} stopOpacity="0.12" />
        <stop offset="0.5" stopColor={success} stopOpacity="0.44" />
        <stop offset="1" stopColor={accent} stopOpacity="0.12" />
      </linearGradient>
    </defs>
  );
}

function Arrow({
  x1,
  y1,
  x2,
  y2,
  stroke = accent,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  stroke?: string;
}) {
  return (
    <line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke={stroke}
      strokeWidth={3}
      markerEnd="url(#ch24-arrow)"
    />
  );
}

export function GpuGemsCh24FilterKernelDiagram() {
  const samples = [
    { dx: -2, box: 0.2, cubic: 0.05 },
    { dx: -1, box: 0.2, cubic: 0.44 },
    { dx: 0, box: 0.2, cubic: 1 },
    { dx: 1, box: 0.2, cubic: 0.44 },
    { dx: 2, box: 0.2, cubic: 0.05 },
  ];
  return (
    <Frame
      ariaLabel="Filter kernel 图：box filter 对邻域 texel 使用相同权重，bicubic filter 让中心附近 texel 权重更高并可以包含轻微负权重以增强锐度。"
      caption="kernel 同时定义采样哪些 texel 和每个 texel 的贡献；box 简单但容易软化，cubic 通过距离相关权重保留更多边缘对比。"
    >
      <ArrowDefs />
      <text x={360} y={34} textAnchor="middle" fontSize={18} fontWeight={700} fill={primary}>filter kernel：用权重定义 source → target 的图像变换</text>
      <text x={56} y={80} fontSize={13} fontWeight={700} fill={warning}>box filter</text>
      <text x={392} y={80} fontSize={13} fontWeight={700} fill={accent}>cubic / bicubic profile</text>
      <line x1={64} y1={274} x2={310} y2={274} stroke={border} strokeWidth={2} />
      <line x1={64} y1={116} x2={64} y2={274} stroke={border} strokeWidth={2} />
      <line x1={398} y1={274} x2={654} y2={274} stroke={border} strokeWidth={2} />
      <line x1={398} y1={116} x2={398} y2={274} stroke={border} strokeWidth={2} />
      {samples.map((sample, index) => {
        const leftX = 92 + index * 44;
        const rightX = 424 + index * 44;
        const cubicHeight = sample.cubic * 132;
        return (
          <g key={sample.dx}>
            <rect x={leftX - 12} y={274 - sample.box * 116} width={24} height={sample.box * 116} rx={5} fill={warning} fillOpacity={0.52} />
            <circle cx={leftX} cy={274 - sample.box * 116 - 7} r={4} fill={warning} />
            <rect x={rightX - 12} y={274 - cubicHeight} width={24} height={cubicHeight} rx={5} fill={accent} fillOpacity={0.56} />
            <circle cx={rightX} cy={274 - cubicHeight} r={4} fill={accent} />
            <text x={leftX} y={296} textAnchor="middle" fontSize={11} fill={secondary}>{sample.dx}</text>
            <text x={rightX} y={296} textAnchor="middle" fontSize={11} fill={secondary}>{sample.dx}</text>
          </g>
        );
      })}
      <path d="M 420 274 C 452 224, 478 146, 512 142 C 548 146, 568 224, 650 274" fill="none" stroke={accent} strokeWidth={3} />
      <rect x={124} y={338} width={472} height={32} rx={11} fill={success} fillOpacity={0.1} stroke={success} />
      <text x={360} y={359} textAnchor="middle" fontSize={13} fill={primary}>negative cubic weights may add sharpness, so validate ringing on high-contrast edges</text>
    </Frame>
  );
}

export function GpuGemsCh24SeparableFilteringDiagram() {
  const stages = [
    { x: 34, title: "source", detail: "image A", color: accent },
    { x: 184, title: "horizontal", detail: "1D kernel", color: warning },
    { x: 334, title: "intermediate", detail: "temporary RT", color: success },
    { x: 484, title: "vertical", detail: "1D kernel", color: warning },
    { x: 634, title: "target", detail: "image B", color: accent },
  ];
  return (
    <Frame
      ariaLabel="可分离过滤流程：输入图像先进行水平一维过滤写入中间 render target，再进行垂直一维过滤写入输出；与一次性二维十六采样相比，两个 pass 可复用一维权重。"
      caption="bicubic 的教材式二维实现可能需要 16 次颜色采样和额外 kernel lookup；separable 的水平加垂直 pass 用中间纹理换取更低的均匀过滤成本。"
    >
      <ArrowDefs />
      <text x={360} y={34} textAnchor="middle" fontSize={18} fontWeight={700} fill={primary}>separable filtering：两个一维 pass 组合二维结果</text>
      {stages.map((stage, index) => (
        <g key={stage.title}>
          <rect x={stage.x} y={104} width={82} height={160} rx={15} fill={stage.color} fillOpacity={0.08} stroke={stage.color} strokeWidth={2} />
          <text x={stage.x + 41} y={137} textAnchor="middle" fontSize={13} fontWeight={700} fill={stage.color}>{stage.title}</text>
          {index === 0 && <><rect x={stage.x + 17} y={166} width={48} height={44} fill="url(#ch24-signal-gradient)" stroke={accent} strokeWidth={2} /><circle cx={stage.x + 41} cy={188} r={8} fill={warning} /></>}
          {index === 1 && <><line x1={stage.x + 16} y1={188} x2={stage.x + 66} y2={188} stroke={warning} strokeWidth={4} /><line x1={stage.x + 26} y1={172} x2={stage.x + 26} y2={204} stroke={warning} strokeWidth={2} /><line x1={stage.x + 56} y1={172} x2={stage.x + 56} y2={204} stroke={warning} strokeWidth={2} /></>}
          {index === 2 && <><rect x={stage.x + 17} y={166} width={48} height={44} fill={surface} stroke={success} strokeWidth={2} /><path d={`M ${stage.x + 20} 202 L ${stage.x + 32} 180 L ${stage.x + 45} 196 L ${stage.x + 61} 172`} fill="none" stroke={success} strokeWidth={3} /></>}
          {index === 3 && <><line x1={stage.x + 41} y1={166} x2={stage.x + 41} y2={210} stroke={warning} strokeWidth={4} /><line x1={stage.x + 25} y1={176} x2={stage.x + 57} y2={176} stroke={warning} strokeWidth={2} /><line x1={stage.x + 25} y1={200} x2={stage.x + 57} y2={200} stroke={warning} strokeWidth={2} /></>}
          {index === 4 && <><rect x={stage.x + 17} y={166} width={48} height={44} fill="url(#ch24-signal-gradient)" stroke={accent} strokeWidth={2} /><circle cx={stage.x + 41} cy={188} r={8} fill={success} /></>}
          <text x={stage.x + 41} y={244} textAnchor="middle" fontSize={11} fill={secondary}>{stage.detail}</text>
          {index < stages.length - 1 && <Arrow x1={stage.x + 88} y1={188} x2={stage.x + 138} y2={188} stroke={stage.color} />}
        </g>
      ))}
      <rect x={118} y={322} width={484} height={40} rx={12} fill={accent} fillOpacity={0.08} stroke={accent} />
      <text x={360} y={346} textAnchor="middle" fontSize={13} fill={primary}>trade one intermediate write for reusable x/y profiles and predictable bandwidth</text>
    </Frame>
  );
}

export function GpuGemsCh24DerivativeWindowDiagram() {
  return (
    <Frame
      ariaLabel="GPU derivative 图：相邻像素的纹理坐标差异 ddx UV 与 ddy UV 定义一个四边形纹理 footprint，过滤器应在这个窗口内积分，而不是只取中心点。"
      caption="ddx 与 ddy 不是二阶数学导数，而是 GPU SIMD 邻居之间的差分；它们提供当前像素需要覆盖多大纹理窗口的线索。"
    >
      <ArrowDefs />
      <text x={360} y={34} textAnchor="middle" fontSize={18} fontWeight={700} fill={primary}>GPU derivatives：ddx(UV) × ddy(UV) 定义 filter footprint</text>
      <rect x={54} y={94} width={260} height={212} rx={16} fill={accent} fillOpacity={0.06} stroke={accent} strokeWidth={2} />
      <text x={184} y={126} textAnchor="middle" fontSize={15} fontWeight={700} fill={accent}>screen pixels</text>
      <circle cx={132} cy={186} r={16} fill={danger} fillOpacity={0.55} /><circle cx={184} cy={186} r={16} fill={success} fillOpacity={0.55} /><circle cx={236} cy={186} r={16} fill={accent} fillOpacity={0.55} />
      <line x1={132} y1={186} x2={184} y2={186} stroke={border} strokeWidth={2} markerEnd="url(#ch24-arrow)" />
      <line x1={184} y1={186} x2={184} y2={238} stroke={border} strokeWidth={2} markerEnd="url(#ch24-arrow)" />
      <text x={158} y={174} textAnchor="middle" fontSize={12} fill={secondary}>ddx</text>
      <text x={204} y={217} fontSize={12} fill={secondary}>ddy</text>
      <Arrow x1={342} y1={190} x2={388} y2={190} stroke={accent} />
      <rect x={404} y={94} width={260} height={212} rx={16} fill={success} fillOpacity={0.06} stroke={success} strokeWidth={2} />
      <text x={534} y={126} textAnchor="middle" fontSize={15} fontWeight={700} fill={success}>texture footprint</text>
      <path d="M 450 232 L 500 154 L 612 174 L 566 256 Z" fill="url(#ch24-window-gradient)" stroke={success} strokeWidth={3} />
      <circle cx={532} cy={205} r={8} fill={warning} />
      <text x={532} y={208} textAnchor="middle" fontSize={11} fill={primary}>uv</text>
      <text x={534} y={282} textAnchor="middle" fontSize={12} fill={secondary}>integrate source over this window</text>
      <rect x={120} y={340} width={480} height={32} rx={11} fill={warning} fillOpacity={0.1} stroke={warning} />
      <text x={360} y={361} textAnchor="middle" fontSize={13} fill={primary}>uniform values have zero derivative; interpolated values expose local change</text>
    </Frame>
  );
}

export function GpuGemsCh24AntialiasingDiagram() {
  return (
    <Frame
      ariaLabel="解析抗锯齿图：直接按像素内单点判断条纹会出现锯齿；用 ddx 和 ddy 估计像素覆盖范围并积分条纹函数后，输出按 coverage 平均的平滑灰度。"
      caption="analytical antialiasing 的核心是对像素覆盖区域积分；它比单点 if 更平滑，但会增加计算，并且仍需和 API 多重采样一起评估。"
    >
      <ArrowDefs />
      <text x={360} y={34} textAnchor="middle" fontSize={18} fontWeight={700} fill={primary}>analytical antialiasing：从 binary sample 到 pixel coverage</text>
      <rect x={38} y={94} width={282} height={210} rx={16} fill={danger} fillOpacity={0.06} stroke={danger} strokeWidth={2} />
      <text x={179} y={126} textAnchor="middle" fontSize={15} fontWeight={700} fill={danger}>naive stripe</text>
      {Array.from({ length: 7 }, (_, index) => <rect key={`naive-${index}`} x={68 + index * 32} y={160} width={16} height={88} fill={index % 2 === 0 ? danger : surface} stroke={border} strokeWidth={1} />)}
      <text x={179} y={278} textAnchor="middle" fontSize={12} fill={secondary}>one if per pixel → jaggies</text>
      <Arrow x1={348} y1={198} x2={382} y2={198} stroke={accent} />
      <rect x={400} y={94} width={282} height={210} rx={16} fill={success} fillOpacity={0.06} stroke={success} strokeWidth={2} />
      <text x={541} y={126} textAnchor="middle" fontSize={15} fontWeight={700} fill={success}>integrated coverage</text>
      {Array.from({ length: 7 }, (_, index) => {
        const opacity = [0.18, 0.45, 0.82, 0.28, 0.62, 0.92, 0.2][index];
        return <rect key={`smooth-${index}`} x={430 + index * 32} y={160} width={16} height={88} fill={danger} fillOpacity={opacity} stroke={border} strokeWidth={1} />;
      })}
      <text x={541} y={278} textAnchor="middle" fontSize={12} fill={secondary}>average over ddx / ddy window</text>
      <rect x={126} y={340} width={468} height={32} rx={11} fill={accent} fillOpacity={0.1} stroke={accent} />
      <text x={360} y={361} textAnchor="middle" fontSize={13} fill={primary}>quality gain costs math; a texture lookup may be faster when the control can be baked</text>
    </Frame>
  );
}

export function GpuGemsCh24FilteringLab() {
  const [scale, setScale] = useState(0.52);
  const [footprint, setFootprint] = useState(0.42);
  const [balance, setBalance] = useState(0.5);
  const [oversample, setOversample] = useState(0.36);
  const [filter, setFilter] = useState("bicubic");

  const reset = () => {
    setScale(0.52);
    setFootprint(0.42);
    setBalance(0.5);
    setOversample(0.36);
    setFilter("bicubic");
  };

  const filterCost: Record<string, number> = { box: 0.24, bilinear: 0.36, bicubic: 0.68, analytical: 0.82 };
  const filterQuality: Record<string, number> = { box: 0.3, bilinear: 0.48, bicubic: 0.8, analytical: 0.92 };
  const filterName: Record<string, string> = { box: "box", bilinear: "bilinear", bicubic: "bicubic", analytical: "analytical AA" };
  const quality = rounded(Math.min(1, filterQuality[filter] + footprint * 0.18 + oversample * 0.12));
  const alias = rounded(Math.min(1, (1 - quality) * 0.62 + Math.abs(scale - 0.5) * 0.26 + (1 - balance) * 0.16));
  const cost = rounded(filterCost[filter] + footprint * 0.3 + oversample * 0.2);
  const label = `高质量过滤实验：filter ${filterName[filter]}，scale ${scale.toFixed(2)}，footprint ${footprint.toFixed(2)}，balance ${balance.toFixed(2)}，oversample ${oversample.toFixed(2)}，quality ${quality.toFixed(2)}，alias ${alias.toFixed(2)}，cost ${cost.toFixed(2)}。`;

  return (
    <section data-visual-kind="gpu-gems-ch24-high-quality-filtering" className="not-prose my-6 rounded-card border border-border bg-elevated p-5" aria-label="High-Quality Filtering 交互实验：选择过滤器并调整缩放、footprint、balance 与 oversample，观察 quality、alias 与成本">
      <div className="mb-4 flex flex-wrap items-baseline justify-between gap-3">
        <div>
          <p className="text-[11px] uppercase tracking-[0.18em] text-secondary">High-Quality Filtering Lab</p>
          <h4 className="mt-1 text-[15px] font-semibold text-primary">先预测：为什么更宽的 footprint 不一定更清晰？</h4>
        </div>
        <span className="rounded-control border border-accent px-2 py-1 text-[11px] text-accent">可交互</span>
      </div>
      <div className="grid gap-5 md:grid-cols-[1fr_260px] md:items-center">
        <svg viewBox="0 0 560 390" role="img" aria-label={label} className="w-full">
          <ArrowDefs />
          <rect x={12} y={18} width={536} height={354} rx={18} fill={surface} stroke={border} />
          <text x={32} y={46} fontSize={14} fontWeight={700} fill={primary}>filtered edge preview</text>
          <text x={526} y={46} textAnchor="end" fontSize={12} fill={accent}>{filterName[filter]}</text>
          <rect x={56} y={82} width={448} height={170} rx={12} fill={border} fillOpacity={0.2} stroke={border} />
          {Array.from({ length: 14 }, (_, index) => {
            const x = 66 + index * 32;
            const phase = (index / 13) * Math.PI * 4 * (0.7 + scale);
            const signal = Math.sin(phase) > balance ? 1 : 0;
            const smooth = rounded(Math.min(1, Math.max(0, 0.5 + Math.sin(phase) * (0.42 + footprint * 0.16))));
            const value = filter === "box" ? signal : filter === "bilinear" ? rounded(signal * 0.7 + smooth * 0.3) : filter === "bicubic" ? smooth : rounded(smooth * 0.88 + oversample * 0.08);
            return <rect key={`lab-bar-${index}`} x={x} y={220 - value * 112} width={22} height={value * 112} rx={5} fill={value > 0.5 ? accent : warning} fillOpacity={0.42 + quality * 0.4} />;
          })}
          <line x1={56} y1={220} x2={504} y2={220} stroke={border} strokeWidth={2} />
          <text x={66} y={278} fontSize={12} fill={secondary}>quality {quality.toFixed(2)} · alias {alias.toFixed(2)}</text>
          <rect x={66} y={298} width={428} height={26} rx={8} fill={border} fillOpacity={0.35} />
          <rect x={66} y={298} width={428 * cost} height={26} rx={8} fill={danger} fillOpacity={0.54} />
          <text x={76} y={316} fontSize={11} fill={primary}>cost {cost.toFixed(2)} · texture/math budget</text>
          <text x={66} y={352} fontSize={11} fill={secondary}>{footprint > 0.65 ? "wide footprint smooths but can erase contrast" : "narrow footprint preserves detail but risks aliasing"}</text>
        </svg>
        <div className="space-y-3">
          <label className="block text-sm text-primary" htmlFor="ch24-filter">filter</label>
          <select id="ch24-filter" className="min-h-11 w-full rounded-control border border-border bg-elevated px-3 py-2 text-sm text-primary" value={filter} onChange={(event) => setFilter(event.target.value)} aria-label="选择过滤器">
            <option value="box">box</option>
            <option value="bilinear">bilinear</option>
            <option value="bicubic">bicubic</option>
            <option value="analytical">analytical AA</option>
          </select>
          <label className="block text-sm text-primary" htmlFor="ch24-scale">pattern scale：{scale.toFixed(2)}</label>
          <input id="ch24-scale" className="min-h-11 w-full accent-accent" type="range" min="0.1" max="0.95" step="0.02" value={scale} onChange={(event) => setScale(Number(event.target.value))} aria-label="调整图案 scale" />
          <label className="block text-sm text-primary" htmlFor="ch24-footprint">filter footprint：{footprint.toFixed(2)}</label>
          <input id="ch24-footprint" className="min-h-11 w-full accent-accent" type="range" min="0.08" max="0.9" step="0.02" value={footprint} onChange={(event) => setFootprint(Number(event.target.value))} aria-label="调整 filter footprint" />
          <label className="block text-sm text-primary" htmlFor="ch24-balance">dark/light balance：{balance.toFixed(2)}</label>
          <input id="ch24-balance" className="min-h-11 w-full accent-accent" type="range" min="0.1" max="0.9" step="0.02" value={balance} onChange={(event) => setBalance(Number(event.target.value))} aria-label="调整 dark light balance" />
          <label className="block text-sm text-primary" htmlFor="ch24-oversample">oversample：{oversample.toFixed(2)}</label>
          <input id="ch24-oversample" className="min-h-11 w-full accent-accent" type="range" min="0" max="0.9" step="0.02" value={oversample} onChange={(event) => setOversample(Number(event.target.value))} aria-label="调整 oversample" />
          <button type="button" aria-label="重置 High-Quality Filtering 实验" onClick={reset} className="min-h-11 w-full rounded-control border border-border px-3 py-2 text-sm text-secondary hover:border-accent hover:text-primary">重置实验</button>
          <p className="text-xs text-secondary" role="status">观察：box 快但易锯齿；bicubic 需要更多权重与采样；analytical AA 用 footprint 积分边缘覆盖，质量更高但数学成本也更高。</p>
        </div>
      </div>
    </section>
  );
}
