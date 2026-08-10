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
        <svg viewBox="0 0 720 420" role="img" aria-label={ariaLabel} className="mx-auto block h-auto w-full max-w-[720px]">
          {children}
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">{caption}</figcaption>
    </figure>
  );
}

function ArrowDefs() {
  return (
    <defs>
      <marker id="ch13-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 z" fill={accent} />
      </marker>
      <linearGradient id="ch13-penumbra" x1="0" x2="1">
        <stop offset="0" stopColor={danger} stopOpacity="0.42" />
        <stop offset="1" stopColor={danger} stopOpacity="0.06" />
      </linearGradient>
      <linearGradient id="ch13-path" x1="0" x2="1">
        <stop offset="0" stopColor={warning} stopOpacity="0.12" />
        <stop offset="0.5" stopColor={warning} stopOpacity="0.42" />
        <stop offset="1" stopColor={warning} stopOpacity="0.12" />
      </linearGradient>
    </defs>
  );
}

function Arrow({ x1, y1, x2, y2, stroke = accent }: { x1: number; y1: number; x2: number; y2: number; stroke?: string }) {
  return <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={stroke} strokeWidth="3" markerEnd="url(#ch13-arrow)" />;
}

export function GpuGemsCh13SoftShadowPipelineDiagram() {
  const stages = [
    { x: 28, title: "1 静态场景", detail: "唯一 UV + caster", color: accent },
    { x: 196, title: "2 离线追踪", detail: "沿光轨迹采样", color: warning },
    { x: 364, title: "3 区间纹理", detail: "rise / fall RGBA", color: success },
    { x: 532, title: "4 运行时", detail: "窗口平均 → 灯光", color: danger },
  ];
  return (
    <Frame ariaLabel="遮挡区间映射管线：静态场景先沿固定光轨迹离线追踪可见性，再把 rise 和 fall 区间写入纹理，运行时用时间窗口平均得到软阴影。" caption="这套方法把昂贵的可见性计算移到离线阶段；运行时只做区间交叠、归一化和光照合成。">
      <ArrowDefs />
      <text x="360" y="34" textAnchor="middle" fontSize="18" fontWeight="700" fill={primary}>offline visibility → runtime soft shadow</text>
      {stages.map((stage, index) => (
        <g key={stage.title}>
          <rect x={stage.x} y="106" width="138" height="164" rx="16" fill={stage.color} fillOpacity="0.07" stroke={stage.color} strokeWidth="2" />
          <text x={stage.x + 69} y="140" textAnchor="middle" fontSize="15" fontWeight="700" fill={stage.color}>{stage.title}</text>
          <circle cx={stage.x + 69} cy="202" r="31" fill={stage.color} fillOpacity="0.16" stroke={stage.color} strokeWidth="3" />
          {index === 0 && <><rect x={stage.x + 53} y="184" width="32" height="36" rx="4" fill={accent} fillOpacity="0.2" stroke={accent} /><line x1={stage.x + 59} y1="228" x2={stage.x + 77} y2="176" stroke={danger} strokeWidth="3" /><circle cx={stage.x + 69} cy="178" r="6" fill={warning} /></>}
          {index === 1 && <><circle cx={stage.x + 51} cy="195" r="7" fill={warning} /><circle cx={stage.x + 69} cy="195" r="7" fill={warning} /><circle cx={stage.x + 87} cy="195" r="7" fill={warning} /><path d={"M " + (stage.x + 51) + " 195 C " + (stage.x + 62) + " 171, " + (stage.x + 76) + " 219, " + (stage.x + 87) + " 195"} fill="none" stroke={warning} strokeWidth="3" /></>}
          {index === 2 && <><rect x={stage.x + 42} y="181" width="24" height="42" fill={success} fillOpacity="0.2" stroke={success} /><rect x={stage.x + 66} y="181" width="24" height="42" fill={danger} fillOpacity="0.2" stroke={danger} /><text x={stage.x + 54} y="207" textAnchor="middle" fontSize="12" fill={success}>R</text><text x={stage.x + 78} y="207" textAnchor="middle" fontSize="12" fill={danger}>F</text></>}
          {index === 3 && <><path d={"M " + (stage.x + 48) + " 214 L " + (stage.x + 58) + " 184 L " + (stage.x + 68) + " 204 L " + (stage.x + 78) + " 178 L " + (stage.x + 90) + " 214"} fill="none" stroke={danger} strokeWidth="3" /><line x1={stage.x + 48} y1="214" x2={stage.x + 90} y2="214" stroke={danger} strokeWidth="2" /></>}
          <text x={stage.x + 69} y="250" textAnchor="middle" fontSize="12" fill={secondary}>{stage.detail}</text>
          {index < stages.length - 1 && <Arrow x1={stage.x + 144} y1={202} x2={stage.x + 160} y2={202} stroke={stage.color} />}
        </g>
      ))}
      <rect x="128" y="316" width="464" height="44" rx="12" fill={success} fillOpacity="0.1" stroke={success} />
      <text x="360" y="344" textAnchor="middle" fontSize="14" fill={primary}>适用边界：static geometry + one fixed light trajectory</text>
    </Frame>
  );
}

export function GpuGemsCh13OcclusionIntervalDiagram() {
  const intervals = [{ start: 0.18, end: 0.34, color: danger }, { start: 0.52, end: 0.72, color: danger }];
  const x = (t: number) => 116 + t * 488;
  return (
    <Frame ariaLabel="单个接收点的可见性函数：沿光源轨迹从 0 到 1 记录两个被遮挡区间，rise 是进入遮挡的边，fall 是离开遮挡的边，运行时可由区间判断当前是否受光。" caption="每个像素不再保存整条时间轴，而是保存若干 rise/fall 边界；这相当于对 0/1 可见性做区间编码。">
      <ArrowDefs />
      <text x="360" y="34" textAnchor="middle" fontSize="18" fontWeight="700" fill={primary}>一个接收点 p：visibility(t) 的 rise / fall</text>
      <text x="82" y="128" textAnchor="end" fontSize="13" fill={secondary}>可见性</text>
      <line x1="116" y1="204" x2="604" y2="204" stroke={border} strokeWidth="2" />
      <path d={"M " + x(0) + " 104 H " + x(0.18) + " V 204 H " + x(0.34) + " V 104 H " + x(0.52) + " V 204 H " + x(0.72) + " V 104 H " + x(1)} fill="none" stroke={accent} strokeWidth="4" />
      <line x1="116" y1="104" x2="604" y2="104" stroke={success} strokeDasharray="6 6" strokeWidth="2" />
      <text x="612" y="109" fontSize="12" fill={success}>1 lit</text>
      <text x="612" y="209" fontSize="12" fill={danger}>0 shadow</text>
      {intervals.map((interval, index) => <g key={interval.start}>
        <rect x={x(interval.start)} y="226" width={x(interval.end) - x(interval.start)} height="34" rx="8" fill={danger} fillOpacity="0.18" stroke={danger} />
        <line x1={x(interval.start)} y1="216" x2={x(interval.start)} y2="276" stroke={success} strokeWidth="3" />
        <line x1={x(interval.end)} y1="216" x2={x(interval.end)} y2="276" stroke={warning} strokeWidth="3" />
        <text x={(x(interval.start) + x(interval.end)) / 2} y="248" textAnchor="middle" fontSize="12" fill={danger}>occluded interval {index + 1}</text>
        <text x={x(interval.start)} y="298" textAnchor="middle" fontSize="12" fill={success}>rise</text>
        <text x={x(interval.end)} y="298" textAnchor="middle" fontSize="12" fill={warning}>fall</text>
      </g>)}
      <line x1="116" y1="320" x2="604" y2="320" stroke={accent} strokeWidth="3" markerEnd="url(#ch13-arrow)" />
      <text x="116" y="346" fontSize="12" fill={secondary}>t = 0</text>
      <text x="604" y="346" textAnchor="end" fontSize="12" fill={secondary}>t = 1 · 光源固定轨迹的终点</text>
    </Frame>
  );
}

export function GpuGemsCh13RenderWindowDiagram() {
  return (
    <Frame ariaLabel="软阴影渲染窗口：将光源在轨迹上的一段时间窗口与可见性区间求交，交叠长度除以窗口宽度得到线性光源的可见比例，形成半影。" caption="soft shadow 不是把硬边简单模糊；它是线性光源窗口内可见性函数的平均，也就是区间交叠的归一化长度。">
      <ArrowDefs />
      <text x="360" y="34" textAnchor="middle" fontSize="18" fontWeight="700" fill={primary}>soft visibility = overlap(window, visible intervals) / dt</text>
      <text x="74" y="112" fontSize="13" fill={secondary}>轨迹参数 t</text>
      <line x1="92" y1="128" x2="628" y2="128" stroke={border} strokeWidth="2" />
      <rect x="194" y="106" width="92" height="44" rx="10" fill={danger} fillOpacity="0.18" stroke={danger} />
      <rect x="408" y="106" width="110" height="44" rx="10" fill={danger} fillOpacity="0.18" stroke={danger} />
      <text x="240" y="133" textAnchor="middle" fontSize="12" fill={danger}>shadow</text>
      <text x="463" y="133" textAnchor="middle" fontSize="12" fill={danger}>shadow</text>
      <rect x="286" y="184" width="192" height="48" rx="12" fill="url(#ch13-path)" stroke={warning} strokeWidth="3" />
      <text x="382" y="214" textAnchor="middle" fontSize="14" fontWeight="700" fill={warning}>render window [t − dt/2, t + dt/2]</text>
      <line x1="286" y1="166" x2="286" y2="250" stroke={warning} strokeWidth="2" strokeDasharray="5 5" />
      <line x1="478" y1="166" x2="478" y2="250" stroke={warning} strokeWidth="2" strokeDasharray="5 5" />
      <path d="M 286 278 C 318 264, 352 300, 382 278 S 448 264, 478 278" fill="none" stroke={accent} strokeWidth="3" />
      <text x="382" y="312" textAnchor="middle" fontSize="13" fill={primary}>交叠越多 → visibility 越高 → 半影越亮</text>
      <rect x="150" y="344" width="420" height="38" rx="10" fill={success} fillOpacity="0.1" stroke={success} />
      <text x="360" y="368" textAnchor="middle" fontSize="13" fill={success}>窗口宽度 dt 模拟线性光源的长度</text>
    </Frame>
  );
}

export function GpuGemsCh13OptimizationDiagram() {
  const cards = [
    { x: 28, title: "256 rays", detail: "完整捕获 8-bit 边界", color: warning },
    { x: 196, title: "half resolution", detail: "软边抵消低分辨率", color: accent },
    { x: 364, title: "no compression", detail: "保留每通道 8 bit", color: danger },
    { x: 532, title: "no filtering", detail: "避免不连续区间被插值", color: success },
  ];
  return (
    <Frame ariaLabel="遮挡区间映射的工程取舍：256 条光线捕获区间边界，半分辨率节省四倍存储，禁用压缩保留精度，禁用纹理过滤避免区间不连续被插值。" caption="性能来自强假设和数据压缩：离线成本可以很高，运行时用四通道并行计算换取帧率；纹理格式约束必须作为算法的一部分管理。">
      <ArrowDefs />
      <text x="360" y="34" textAnchor="middle" fontSize="18" fontWeight="700" fill={primary}>把离线成本换成运行时预算</text>
      {cards.map((card, index) => (
        <g key={card.title}>
          <rect x={card.x} y="108" width="138" height="166" rx="16" fill={card.color} fillOpacity="0.07" stroke={card.color} strokeWidth="2" />
          <circle cx={card.x + 69} cy="164" r="28" fill={card.color} fillOpacity="0.16" stroke={card.color} strokeWidth="3" />
          <text x={card.x + 69} y="170" textAnchor="middle" fontSize="14" fontWeight="700" fill={card.color}>{index + 1}</text>
          <text x={card.x + 69} y="218" textAnchor="middle" fontSize="14" fontWeight="700" fill={primary}>{card.title}</text>
          <text x={card.x + 69} y="244" textAnchor="middle" fontSize="12" fill={secondary}>{card.detail}</text>
          {index < cards.length - 1 && <Arrow x1={card.x + 144} y1={191} x2={card.x + 160} y2={191} stroke={card.color} />}
        </g>
      ))}
      <rect x="142" y="320" width="436" height="42" rx="12" fill={danger} fillOpacity="0.1" stroke={danger} />
      <text x="360" y="346" textAnchor="middle" fontSize="13" fill={primary}>限制越强，运行时越快；泛化能力越弱</text>
    </Frame>
  );
}

export function GpuGemsCh13OcclusionIntervalLab() {
  const [lightT, setLightT] = useState(0.58);
  const [windowWidth, setWindowWidth] = useState(0.28);
  const [mapResolution, setMapResolution] = useState(0.5);
  const [intervalCount, setIntervalCount] = useState(2);
  const [showRays, setShowRays] = useState(true);

  const reset = () => {
    setLightT(0.58);
    setWindowWidth(0.28);
    setMapResolution(0.5);
    setIntervalCount(2);
    setShowRays(true);
  };
  const pathX = (t: number) => 80 + t * 420;
  const windowStart = Math.max(0, lightT - windowWidth / 2);
  const windowEnd = Math.min(1, lightT + windowWidth / 2);
  const blockedA = Math.max(0, Math.min(windowEnd, 0.48) - Math.max(windowStart, 0.2));
  const blockedB = intervalCount > 1 ? Math.max(0, Math.min(windowEnd, 0.86) - Math.max(windowStart, 0.68)) : 0;
  const visible = rounded(1 - (blockedA + blockedB) / Math.max(windowEnd - windowStart, 0.01));
  const penumbra = rounded(0.12 + windowWidth * 0.44);
  const pixelShadowWidth = rounded(118 * (1.1 - mapResolution));
  const label = "遮挡区间实验：光轨迹参数 " + lightT.toFixed(2) + "，窗口宽度 " + windowWidth.toFixed(2) + "，区间数量 " + intervalCount + "，可见比例 " + visible.toFixed(2) + "，" + (showRays ? "显示" : "隐藏") + "离线射线。";

  return (
    <section data-visual-kind="gpu-gems-ch13-occlusion-interval-maps" className="not-prose my-6 rounded-card border border-border bg-elevated p-5" aria-label="遮挡区间映射实验：调整光源轨迹参数、线性光源窗口宽度、区间纹理分辨率和区间数量，观察可见比例与半影宽度">
      <div className="mb-4 flex flex-wrap items-baseline justify-between gap-3">
        <div>
          <p className="text-[11px] uppercase tracking-[0.18em] text-secondary">Occlusion Interval Lab</p>
          <h4 className="mt-1 text-[15px] font-semibold text-primary">先猜：把光源窗口拉宽，接收点的可见比例会怎样？</h4>
        </div>
        <span className="rounded-control border border-accent px-2 py-1 text-[11px] text-accent">可交互</span>
      </div>
      <div className="grid gap-5 md:grid-cols-[1fr_248px] md:items-center">
        <svg viewBox="0 0 560 390" role="img" aria-label={label} className="w-full">
          <ArrowDefs />
          <rect x="12" y="18" width="536" height="354" rx="18" fill={surface} stroke={border} />
          <text x="32" y="46" fontSize="14" fontWeight="700" fill={primary}>static receiver + fixed light path</text>
          <text x="526" y="46" textAnchor="end" fontSize="12" fill={success}>visible {visible.toFixed(2)}</text>
          <rect x="42" y="266" width="464" height="38" rx="8" fill={success} fillOpacity="0.1" stroke={success} strokeWidth="2" />
          <text x="56" y="290" fontSize="12" fill={secondary}>receiver surface · unique UV stores interval data</text>
          <rect x="238" y="178" width="50" height="88" rx="8" fill={accent} fillOpacity="0.2" stroke={accent} strokeWidth="3" />
          <text x="263" y="164" textAnchor="middle" fontSize="12" fill={accent}>caster</text>
          <path d={"M 58 252 L 80 " + (220 - lightT * 18) + " C 205 82, 370 82, 500 220 L 500 252"} fill="none" stroke={warning} strokeOpacity="0.35" strokeWidth="3" />
          <line x1="80" y1={220 - lightT * 18} x2="263" y2="210" stroke={warning} strokeWidth="2" strokeDasharray="6 6" />
          <line x1="500" y1="220" x2="288" y2="210" stroke={warning} strokeWidth="2" strokeDasharray="6 6" />
          {showRays && <g stroke={accent} strokeWidth="1.5" strokeDasharray="4 5" opacity="0.56">
            <line x1="126" y1="154" x2="252" y2="212" />
            <line x1="198" y1="102" x2="252" y2="212" />
            <line x1="350" y1="102" x2="288" y2="212" />
            <line x1="430" y1="154" x2="288" y2="212" />
          </g>}
          <circle cx={pathX(lightT)} cy={220 - lightT * 18} r="12" fill={warning} stroke={warning} strokeWidth="3" />
          <text x={pathX(lightT)} y={238 - lightT * 18} textAnchor="middle" fontSize="12" fill={warning}>t = {lightT.toFixed(2)}</text>
          <rect x="80" y="326" width="420" height="16" rx="8" fill={border} />
          <rect x={pathX(windowStart)} y="326" width={pathX(windowEnd) - pathX(windowStart)} height="16" rx="8" fill={warning} fillOpacity="0.7" />
          <text x="80" y="362" fontSize="12" fill={secondary}>0 · fixed trajectory</text>
          <text x="500" y="362" textAnchor="end" fontSize="12" fill={secondary}>1</text>
          <path d={"M 302 266 L " + (302 + pixelShadowWidth) + " 266"} stroke={danger} strokeWidth="7" opacity={penumbra} />
        </svg>
        <div className="space-y-3">
          <label className="block text-sm text-primary" htmlFor="ch13-light-t">light trajectory t：{lightT.toFixed(2)}</label>
          <input id="ch13-light-t" className="min-h-11 w-full accent-accent" type="range" min="0" max="1" step="0.02" value={lightT} onChange={(event) => setLightT(Number(event.target.value))} aria-label="调整固定光轨迹上的光源位置" />
          <label className="block text-sm text-primary" htmlFor="ch13-window">linear-light window dt：{windowWidth.toFixed(2)}</label>
          <input id="ch13-window" className="min-h-11 w-full accent-accent" type="range" min="0.08" max="0.62" step="0.02" value={windowWidth} onChange={(event) => setWindowWidth(Number(event.target.value))} aria-label="调整线性光源窗口宽度" />
          <label className="block text-sm text-primary" htmlFor="ch13-resolution">map resolution：{mapResolution.toFixed(2)}</label>
          <input id="ch13-resolution" className="min-h-11 w-full accent-accent" type="range" min="0.25" max="1" step="0.05" value={mapResolution} onChange={(event) => setMapResolution(Number(event.target.value))} aria-label="调整遮挡区间纹理分辨率" />
          <label className="block text-sm text-primary" htmlFor="ch13-intervals">stored interval pairs：{intervalCount}</label>
          <input id="ch13-intervals" className="min-h-11 w-full accent-accent" type="range" min="1" max="2" step="1" value={intervalCount} onChange={(event) => setIntervalCount(Number(event.target.value))} aria-label="调整保存的遮挡区间数量" />
          <button type="button" aria-pressed={showRays} onClick={() => setShowRays((value) => !value)} className={"min-h-11 w-full rounded-control border px-3 py-2 text-sm " + (showRays ? "border-accent text-primary" : "border-border text-secondary")}>{showRays ? "隐藏离线射线" : "显示离线射线"}</button>
          <button type="button" aria-label="重置遮挡区间实验" onClick={reset} className="min-h-11 w-full rounded-control border border-border px-3 py-2 text-sm text-secondary hover:border-accent hover:text-primary">重置实验</button>
          <p className="text-xs text-secondary" role="status">观察：窗口更宽时半影更宽；分辨率更低时区间图更省显存，但边界更依赖软化。可见比例是窗口内未被区间覆盖的部分。</p>
        </div>
      </div>
    </section>
  );
}
