"use client";

import { useState, type ReactNode } from "react";

const accent = "var(--accent)";
const success = "var(--success)";
const warning = "var(--warning)";
const danger = "var(--danger)";
const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";

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

function Line({
  x1,
  y1,
  x2,
  y2,
  stroke = accent,
  width = 3,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  stroke?: string;
  width?: number;
}) {
  return <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={stroke} strokeWidth={width} />;
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
      strokeWidth="3"
      markerEnd="url(#perlin-noise-arrow)"
    />
  );
}

function ArrowDefs() {
  return (
    <defs>
      <marker
        id="perlin-noise-arrow"
        viewBox="0 0 10 10"
        refX="8"
        refY="5"
        markerWidth="6"
        markerHeight="6"
        orient="auto-start-reverse"
      >
        <path d="M 0 0 L 10 5 L 0 10 z" fill={accent} />
      </marker>
    </defs>
  );
}

function smoothStep(t: number, mode: "cubic" | "quintic") {
  return mode === "cubic"
    ? 3 * t ** 2 - 2 * t ** 3
    : 6 * t ** 5 - 15 * t ** 4 + 10 * t ** 3;
}

function curvePoints(
  mode: "cubic" | "quintic",
  left = 78,
  top = 104,
  width = 260,
  height = 190,
) {
  return Array.from({ length: 41 }, (_, index) => {
    const t = index / 40;
    return `${(left + t * width).toFixed(1)},${(top + (1 - smoothStep(t, mode)) * height).toFixed(1)}`;
  }).join(" ");
}

export function GpuGemsCh05NoiseGoalDiagram() {
  return (
    <Frame
      ariaLabel="Improved Perlin Noise 的目标图：整数晶格上的梯度经过平滑插值，形成可重复、带限、视觉各向同性的三维信号。"
      caption="Noise 不是白噪声：它保留可控的随机感，同时让空间变化连续、可重复。"
    >
      <ArrowDefs />
      <text x="360" y="32" textAnchor="middle" fontSize="18" fontWeight="700" fill={primary}>
        从晶格梯度到自然纹理
      </text>
      <rect x="42" y="92" width="180" height="214" rx="18" fill={accent} fillOpacity="0.08" stroke={accent} strokeWidth="2" />
      <text x="132" y="125" textAnchor="middle" fontSize="16" fontWeight="700" fill={accent}>整数晶格</text>
      {[0, 1, 2, 3].map((row) =>
        [0, 1, 2, 3].map((column) => (
          <g key={`${row}-${column}`}>
            <circle cx={82 + column * 40} cy={166 + row * 40} r="6" fill={accent} />
            <Line x1={82 + column * 40} y1={166 + row * 40} x2={92 + column * 40} y2={154 + row * 40} stroke={secondary} width={2} />
          </g>
        )),
      )}
      <text x="132" y="286" textAnchor="middle" fontSize="13" fill={secondary}>hash → 梯度方向</text>
      <Arrow x1={236} y1={198} x2={300} y2={198} />
      <rect x="316" y="92" width="180" height="214" rx="18" fill={warning} fillOpacity="0.08" stroke={warning} strokeWidth="2" />
      <text x="406" y="125" textAnchor="middle" fontSize="16" fontWeight="700" fill={warning}>平滑插值</text>
      <path d="M 340 238 C 370 218 382 224 406 194 C 432 162 450 190 474 150" fill="none" stroke={warning} strokeWidth="5" />
      <Line x1={340} y1={250} x2={474} y2={250} stroke={border} width={2} />
      <text x="406" y="286" textAnchor="middle" fontSize="13" fill={secondary}>连续但不抹掉结构</text>
      <Arrow x1={510} y1={198} x2={574} y2={198} />
      <rect x="590" y="92" width="88" height="214" rx="18" fill={success} fillOpacity="0.08" stroke={success} strokeWidth="2" />
      <text x="634" y="134" textAnchor="middle" fontSize="15" fontWeight="700" fill={success}>用途</text>
      <text x="634" y="176" textAnchor="middle" fontSize="13" fill={primary}>岩石</text>
      <text x="634" y="202" textAnchor="middle" fontSize="13" fill={primary}>云雾</text>
      <text x="634" y="228" textAnchor="middle" fontSize="13" fill={primary}>凹凸</text>
      <text x="634" y="270" textAnchor="middle" fontSize="12" fill={secondary}>R³</text>
      <rect x="158" y="344" width="404" height="42" rx="12" fill={success} fillOpacity="0.1" stroke={success} />
      <text x="360" y="371" textAnchor="middle" fontSize="14" fill={primary}>可重复 · 带限 · 视觉各向同性</text>
    </Frame>
  );
}

export function GpuGemsCh05InterpolationDiagram() {
  return (
    <Frame
      ariaLabel="原始三次插值与改进五次插值的对比：两者端点斜率都为零，五次插值还让端点二阶导数为零，减少 bump mapping 中的网格伪影。"
      caption="五次 fade 曲线把二阶不连续也消掉；改进点不是让曲线更弯，而是让跨晶格边界更平顺。"
    >
      <text x="360" y="32" textAnchor="middle" fontSize="18" fontWeight="700" fill={primary}>
        为什么换成五次插值？
      </text>
      <rect x="42" y="78" width="390" height="274" rx="18" fill={accent} fillOpacity="0.06" stroke={border} />
      <text x="238" y="108" textAnchor="middle" fontSize="15" fontWeight="700" fill={primary}>fade(t) 从 0 到 1</text>
      <Line x1={78} y1={294} x2={390} y2={294} stroke={border} width={2} />
      <Line x1={78} y1={132} x2={78} y2={294} stroke={border} width={2} />
      <polyline points={curvePoints("cubic")} fill="none" stroke={warning} strokeWidth="4" />
      <polyline points={curvePoints("quintic")} fill="none" stroke={accent} strokeWidth="4" />
      <text x="100" y="322" fontSize="13" fill={secondary}>t=0</text>
      <text x="366" y="322" fontSize="13" fill={secondary}>t=1</text>
      <text x="110" y="140" fontSize="13" fill={warning}>三次：3t²−2t³</text>
      <text x="110" y="164" fontSize="13" fill={accent}>五次：6t⁵−15t⁴+10t³</text>
      <rect x="460" y="78" width="218" height="274" rx="18" fill={success} fillOpacity="0.07" stroke={success} />
      <text x="569" y="112" textAnchor="middle" fontSize="15" fontWeight="700" fill={success}>边界条件</text>
      <text x="482" y="154" fontSize="13" fill={primary}>两者：f′(0)=f′(1)=0</text>
      <text x="482" y="192" fontSize="13" fill={primary}>五次：f″(0)=f″(1)=0</text>
      <Line x1={486} y1={222} x2={650} y2={222} stroke={border} width={2} />
      <text x="569" y="254" textAnchor="middle" fontSize="14" fontWeight="700" fill={warning}>旧问题</text>
      <text x="569" y="280" textAnchor="middle" fontSize="13" fill={secondary}>二阶导数跳变</text>
      <text x="569" y="306" textAnchor="middle" fontSize="13" fill={secondary}>bump 光照出现网格感</text>
    </Frame>
  );
}

export function GpuGemsCh05GradientAndTileDiagram() {
  return (
    <Frame
      ariaLabel="Improved Perlin Noise 的两个工程改进：用立方体边心的十二个梯度方向代替杂乱的二百五十六个方向，再用小型环面平铺体积和低频复数相位打散重复纹理。"
      caption="方向分布均匀比方向数量更多更重要；小体积纹理配合低频相位可以隐藏平铺边界。"
    >
      <ArrowDefs />
      <text x="360" y="32" textAnchor="middle" fontSize="18" fontWeight="700" fill={primary}>
        方向分布与平铺伪影
      </text>
      <rect x="40" y="82" width="284" height="250" rx="18" fill={danger} fillOpacity="0.06" stroke={danger} />
      <text x="182" y="116" textAnchor="middle" fontSize="15" fontWeight="700" fill={danger}>256 个杂乱方向</text>
      {Array.from({ length: 18 }, (_, index) => {
        const angle = (index * 1.71) % (Math.PI * 2);
        const radius = 28 + (index % 4) * 22;
        return (
          <Line
            key={index}
            x1={182}
            y1={210}
            x2={rounded(182 + Math.cos(angle) * radius)}
            y2={rounded(210 + Math.sin(angle) * radius)}
            stroke={danger}
            width={2}
          />
        );
      })}
      <circle cx="182" cy="210" r="86" fill="none" stroke={border} strokeWidth="2" />
      <text x="182" y="306" textAnchor="middle" fontSize="13" fill={secondary}>局部聚团 → 斑驳高频</text>
      <Arrow x1={342} y1={207} x2={392} y2={207} />
      <rect x="408" y="82" width="270" height="250" rx="18" fill={success} fillOpacity="0.07" stroke={success} />
      <text x="543" y="116" textAnchor="middle" fontSize="15" fontWeight="700" fill={success}>12 个均匀方向</text>
      {Array.from({ length: 12 }, (_, index) => {
        const angle = (index * Math.PI * 2) / 12;
        return (
          <Line
            key={index}
            x1={543}
            y1={210}
            x2={rounded(543 + Math.cos(angle) * 78)}
            y2={rounded(210 + Math.sin(angle) * 78)}
            stroke={success}
            width={3}
          />
        );
      })}
      <circle cx="543" cy="210" r="86" fill="none" stroke={border} strokeWidth="2" />
      <text x="543" y="306" textAnchor="middle" fontSize="13" fill={secondary}>均匀分布 → 少斑驳、点积更便宜</text>
      <rect x="124" y="352" width="472" height="42" rx="12" fill={warning} fillOpacity="0.1" stroke={warning} />
      <text x="360" y="379" textAnchor="middle" fontSize="14" fill={primary}>8³ 环面平铺 + 低频复数相位 = 隐藏重复边界</text>
    </Frame>
  );
}

export function GpuGemsCh05NoiseLab() {
  const [mode, setMode] = useState<"cubic" | "quintic">("quintic");
  const [frequency, setFrequency] = useState(2);
  const [phase, setPhase] = useState(0.35);
  const [showBump, setShowBump] = useState(true);
  const [showGradients, setShowGradients] = useState(false);

  const plotLeft = 28;
  const plotTop = 34;
  const plotWidth = 420;
  const plotHeight = 210;
  const samples = Array.from({ length: 56 }, (_, index) => {
    const t = index / 55;
    const x = plotLeft + t * plotWidth;
    const base = Math.sin((t * frequency + phase) * Math.PI * 2) * 0.35;
    const detail = Math.sin((t * frequency * 2.7 + phase * 1.6) * Math.PI * 2) * 0.14;
    const eased = smoothStep((t * frequency) % 1, mode);
    const y = plotTop + plotHeight * (0.55 - base - detail - (eased - 0.5) * 0.08);
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(" ");
  const slope = Math.cos((0.5 * frequency + phase) * Math.PI * 2) * frequency;
  const normalTilt = showBump ? Math.max(-34, Math.min(34, slope * 11)) : 0;
  const reset = () => {
    setMode("quintic");
    setFrequency(2);
    setPhase(0.35);
    setShowBump(true);
    setShowGradients(false);
  };

  return (
    <section
      data-visual-kind="gpu-gems-ch05-improved-perlin-noise"
      className="not-prose my-6 rounded-card border border-border bg-elevated p-5"
      aria-label="Improved Perlin Noise 实验：切换插值曲线、频率与相位，观察噪声曲线和 bump normal 的变化"
    >
      <div className="mb-4 flex flex-wrap items-baseline justify-between gap-3">
        <div>
          <p className="text-[11px] uppercase tracking-[0.18em] text-secondary">Improved Noise Lab</p>
          <h4 className="mt-1 text-[15px] font-semibold text-primary">先预测：频率和插值曲线会怎样改变纹理？</h4>
        </div>
        <span className="rounded-control border border-accent px-2 py-1 text-[11px] text-accent">可交互</span>
      </div>
      <div className="grid gap-5 md:grid-cols-[1fr_230px] md:items-center">
        <svg
          viewBox="0 0 510 320"
          role="img"
          aria-label={`${mode === "quintic" ? "五次" : "三次"}插值，频率${frequency}，相位${phase.toFixed(2)}。`}
          className="w-full"
        >
          <rect x="12" y="18" width="486" height="284" rx="18" fill="var(--surface)" stroke={border} />
          <text x="28" y="42" fontSize="14" fontWeight="700" fill={primary}>Noise slice</text>
          <Line x1={plotLeft} y1={plotTop + plotHeight / 2} x2={plotLeft + plotWidth} y2={plotTop + plotHeight / 2} stroke={border} width={2} />
          <polyline points={samples} fill="none" stroke={accent} strokeWidth="4" strokeLinejoin="round" />
          {showGradients && Array.from({ length: 12 }, (_, index) => {
            const x = plotLeft + 18 + index * 34;
            const direction = index % 2 === 0 ? -1 : 1;
            return <Line key={index} x1={x} y1={plotTop + 145} x2={x + direction * 12} y2={plotTop + 128} stroke={warning} width={2} />;
          })}
          <text x="28" y="270" fontSize="13" fill={secondary}>空间位置 →</text>
          {showBump && (
            <g>
              <Line x1={330} y1={268} x2={430} y2={268} stroke={border} width={3} />
              <Arrow x1={380} y1={268} x2={380 + normalTilt} y2={218} stroke={success} />
              <text x="382" y="292" textAnchor="middle" fontSize="13" fill={success}>N = normalize(N − dF)</text>
            </g>
          )}
          <text x="390" y="42" textAnchor="middle" fontSize="13" fill={mode === "quintic" ? accent : warning}>{mode === "quintic" ? "5th-degree fade" : "cubic fade"}</text>
        </svg>
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-2">
            <button type="button" aria-pressed={mode === "cubic"} onClick={() => setMode("cubic")} className={`min-h-11 rounded-control border px-3 py-2 text-sm ${mode === "cubic" ? "border-warning text-primary" : "border-border text-secondary"}`}>三次</button>
            <button type="button" aria-pressed={mode === "quintic"} onClick={() => setMode("quintic")} className={`min-h-11 rounded-control border px-3 py-2 text-sm ${mode === "quintic" ? "border-accent text-primary" : "border-border text-secondary"}`}>五次</button>
          </div>
          <label className="block text-sm text-primary" htmlFor="perlin-frequency">频率：{frequency}</label>
          <input id="perlin-frequency" className="min-h-11 w-full accent-accent" type="range" min="1" max="4" step="1" value={frequency} onChange={(event) => setFrequency(Number(event.target.value))} aria-label="调整噪声频率" />
          <label className="block text-sm text-primary" htmlFor="perlin-phase">相位：{phase.toFixed(2)}</label>
          <input id="perlin-phase" className="min-h-11 w-full accent-accent" type="range" min="0" max="1" step="0.05" value={phase} onChange={(event) => setPhase(Number(event.target.value))} aria-label="调整低频相位" />
          <button type="button" aria-pressed={showGradients} onClick={() => setShowGradients((value) => !value)} className="min-h-11 w-full rounded-control border border-border px-3 py-2 text-sm text-secondary hover:border-accent hover:text-primary">{showGradients ? "隐藏梯度" : "显示梯度"}</button>
          <button type="button" aria-pressed={showBump} onClick={() => setShowBump((value) => !value)} className="min-h-11 w-full rounded-control border border-border px-3 py-2 text-sm text-secondary hover:border-accent hover:text-primary">{showBump ? "隐藏 bump normal" : "显示 bump normal"}</button>
          <button type="button" aria-label="重置 Improved Perlin Noise 实验" onClick={reset} className="min-h-11 w-full rounded-control border border-border px-3 py-2 text-sm text-secondary hover:border-accent hover:text-primary">重置实验</button>
          <p className="text-xs text-secondary" role="status">曲线是确定性的：相同位置和参数会得到相同结果；梯度和相位控制的是结构，不是随机掷骰。</p>
        </div>
      </div>
    </section>
  );
}
