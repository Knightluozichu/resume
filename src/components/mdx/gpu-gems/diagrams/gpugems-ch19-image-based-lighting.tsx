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
      <marker id="ch19-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 z" fill={accent} />
      </marker>
      <linearGradient id="ch19-room-gradient" x1="0" x2="1" y1="0" y2="1">
        <stop offset="0" stopColor={success} stopOpacity="0.12" />
        <stop offset="0.56" stopColor={accent} stopOpacity="0.2" />
        <stop offset="1" stopColor={warning} stopOpacity="0.32" />
      </linearGradient>
      <linearGradient id="ch19-fresnel-gradient" x1="0" x2="1">
        <stop offset="0" stopColor={success} stopOpacity="0.18" />
        <stop offset="0.6" stopColor={warning} stopOpacity="0.24" />
        <stop offset="1" stopColor={danger} stopOpacity="0.38" />
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
  return <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={stroke} strokeWidth={3} markerEnd="url(#ch19-arrow)" />;
}

export function GpuGemsCh19IblPipelineDiagram() {
  const stages = [
    { x: 28, title: "world", detail: "object + camera", color: accent },
    { x: 196, title: "lighting space", detail: "finite room", color: warning },
    { x: 364, title: "reflection", detail: "ray / sphere", color: success },
    { x: 532, title: "shade", detail: "Fresnel + IBL", color: danger },
  ];
  return (
    <Frame ariaLabel="局部化图像光照流程：将对象和法线变换到有限 lighting space，根据反射向量与环境球体求交，使用交点查询 cube map，再叠加 Fresnel、表面颜色和阴影。" caption="局部化 IBL 的关键不是重建 cube map，而是让同一张环境图在有限空间中随对象位置产生正确的反射尺度与对齐。">
      <ArrowDefs />
      <text x={360} y={34} textAnchor="middle" fontSize={18} fontWeight={700} fill={primary}>localized IBL：从无限远反射到有限房间</text>
      {stages.map((stage, index) => (
        <g key={stage.title}>
          <rect x={stage.x} y={106} width={138} height={166} rx={16} fill={stage.color} fillOpacity={0.08} stroke={stage.color} strokeWidth={2} />
          <text x={stage.x + 69} y={138} textAnchor="middle" fontSize={14} fontWeight={700} fill={stage.color}>{stage.title}</text>
          {index === 0 && <><rect x={stage.x + 35} y={164} width={68} height={68} fill="url(#ch19-room-gradient)" stroke={accent} strokeWidth={2} /><circle cx={stage.x + 69} cy={198} r={18} fill={warning} fillOpacity={0.28} stroke={warning} strokeWidth={2} /><circle cx={stage.x + 69} cy={198} r={5} fill={accent} /></>}
          {index === 1 && <><path d={`M ${stage.x + 34} 226 L ${stage.x + 52} 158 L ${stage.x + 102} 158 L ${stage.x + 120} 226 Z`} fill="url(#ch19-room-gradient)" stroke={warning} strokeWidth={2} /><circle cx={stage.x + 74} cy={198} r={16} fill={warning} fillOpacity={0.26} stroke={warning} strokeWidth={2} /><text x={stage.x + 74} y={203} textAnchor="middle" fontSize={12} fill={primary}>Pₗ</text></>}
          {index === 2 && <><circle cx={stage.x + 69} cy={198} r={49} fill="none" stroke={success} strokeWidth={2} strokeDasharray="7 5" /><circle cx={stage.x + 69} cy={198} r={8} fill={warning} /><Arrow x1={stage.x + 69} y1={190} x2={stage.x + 106} y2={154} stroke={success} /><circle cx={stage.x + 106} cy={154} r={6} fill={success} /></>}
          {index === 3 && <><path d={`M ${stage.x + 42} 224 C ${stage.x + 55} 176, ${stage.x + 74} 220, ${stage.x + 96} 176`} fill="none" stroke={danger} strokeWidth={4} /><circle cx={stage.x + 96} cy={176} r={7} fill={danger} /><path d={`M ${stage.x + 46} 236 C ${stage.x + 62} 210, ${stage.x + 80} 210, ${stage.x + 97} 234`} fill="none" stroke={success} strokeWidth={3} /></>}
          <text x={stage.x + 69} y={250} textAnchor="middle" fontSize={12} fill={secondary}>{stage.detail}</text>
          {index < stages.length - 1 && <Arrow x1={stage.x + 144} y1={198} x2={stage.x + 160} y2={198} stroke={stage.color} />}
        </g>
      ))}
      <rect x={102} y={318} width={516} height={42} rx={12} fill={accent} fillOpacity={0.08} stroke={accent} />
      <text x={360} y={344} textAnchor="middle" fontSize={13} fill={primary}>同一 cube map + 新坐标系与交点数学 = 更贴合场景的反射</text>
    </Frame>
  );
}

export function GpuGemsCh19LightingSpaceDiagram() {
  return (
    <Frame ariaLabel="lighting space 中的局部反射：以环境球体中心为原点，将表面位置 P、反射方向 R 放入单位球空间，求射线与球体的交点作为 cube map 查询方向。" caption="反射射线必须同时携带方向与起点；起点随对象在 lighting space 中的位置变化，交点才会让环境特征产生局部化的尺度和对齐。">
      <ArrowDefs />
      <text x={360} y={34} textAnchor="middle" fontSize={18} fontWeight={700} fill={primary}>lighting space：把有限房间写进反射方向</text>
      <path d="M 74 296 L 118 136 L 302 136 L 346 296 Z" fill="url(#ch19-room-gradient)" stroke={warning} strokeWidth={3} />
      <path d="M 118 136 L 166 174 L 346 174 M 166 174 L 166 296" fill="none" stroke={warning} strokeWidth={2} opacity={0.72} />
      <circle cx={206} cy={222} r={22} fill={accent} fillOpacity={0.24} stroke={accent} strokeWidth={3} />
      <circle cx={206} cy={222} r={6} fill={accent} />
      <text x={206} y={262} textAnchor="middle" fontSize={13} fill={primary}>surface Pₗ</text>
      <Arrow x1={206} y1={214} x2={282} y2={154} stroke={success} />
      <text x={274} y={144} fontSize={13} fill={success}>Rₗ</text>
      <circle cx={206} cy={222} r={108} fill="none" stroke={success} strokeWidth={2} strokeDasharray="8 6" />
      <circle cx={282} cy={154} r={7} fill={success} />
      <Arrow x1={374} y1={178} x2={428} y2={178} stroke={accent} />
      <rect x={452} y={106} width={220} height={186} rx={16} fill={accent} fillOpacity={0.07} stroke={accent} strokeWidth={2} />
      <text x={562} y={138} textAnchor="middle" fontSize={15} fontWeight={700} fill={accent}>ray / unit sphere</text>
      <text x={562} y={176} textAnchor="middle" fontSize={14} fill={primary}>b = −2 · dot(Rₗ, Pₗ)</text>
      <text x={562} y={204} textAnchor="middle" fontSize={14} fill={primary}>c = dot(Pₗ, Pₗ) − 1</text>
      <text x={562} y={232} textAnchor="middle" fontSize={14} fill={success}>b² − 4c → hit</text>
      <text x={562} y={264} textAnchor="middle" fontSize={12} fill={secondary}>hit point → texCUBE</text>
      <rect x={124} y={342} width={472} height={30} rx={10} fill={danger} fillOpacity={0.1} stroke={danger} />
      <text x={360} y={362} textAnchor="middle" fontSize={12} fill={primary}>调试期可把 miss 显示为红色，及时暴露对象跑出 lighting volume</text>
    </Frame>
  );
}

export function GpuGemsCh19FresnelBumpDiagram() {
  const points = Array.from({ length: 9 }, (_, index) => {
    const x = 88 + index * 66;
    const cosTheta = index / 8;
    const value = 0.08 + 0.92 * Math.pow(1 - cosTheta, 5);
    return { x, y: 274 - value * 132, value };
  });
  return (
    <Frame ariaLabel="局部 IBL 的 Fresnel 与 bump 示意：视线越接近掠射角，Fresnel 反射权重越高；normal map 改变局部法线，使反射方向产生细节。" caption="Fresnel 控制视角相关的反射强度，bump 控制局部反射方向；两者应分别验证，避免用高频法线把边缘反射变成闪烁。">
      <ArrowDefs />
      <text x={360} y={34} textAnchor="middle" fontSize={18} fontWeight={700} fill={primary}>反射增强：Fresnel attenuation + bump normal</text>
      <line x1={88} y1={274} x2={620} y2={274} stroke={border} strokeWidth={2} />
      <line x1={88} y1={122} x2={88} y2={274} stroke={border} strokeWidth={2} />
      <path d={points.map((point, index) => (index === 0 ? "M " : " L ") + point.x + " " + point.y).join("")} fill="none" stroke={danger} strokeWidth={4} />
      {points.map((point, index) => <circle key={"fresnel-" + index} cx={point.x} cy={point.y} r={5} fill={danger} />)}
      <text x={98} y={114} fontSize={13} fill={danger}>reflection weight</text>
      <text x={88} y={302} fontSize={12} fill={secondary}>normal view</text>
      <text x={548} y={302} fontSize={12} fill={secondary}>grazing view</text>
      <Arrow x1={444} y1={136} x2={488} y2={136} stroke={accent} />
      <rect x={506} y={92} width={174} height={176} rx={14} fill={accent} fillOpacity={0.07} stroke={accent} strokeWidth={2} />
      <text x={593} y={124} textAnchor="middle" fontSize={15} fontWeight={700} fill={accent}>bump</text>
      <path d="M 532 218 C 548 178, 561 236, 578 194 C 594 164, 610 228, 626 188 C 640 168, 654 202, 662 186" fill="none" stroke={warning} strokeWidth={3} />
      <Arrow x1={576} y1={190} x2={576} y2={148} stroke={warning} />
      <text x={593} y={244} textAnchor="middle" fontSize={12} fill={secondary}>normal map → Nb → Rb</text>
      <rect x={122} y={342} width={476} height={30} rx={10} fill={success} fillOpacity={0.1} stroke={success} />
      <text x={360} y={362} textAnchor="middle" fontSize={12} fill={primary}>先用 unbumped N 稳定 Fresnel，再决定是否让高频 bump 影响边缘反射</text>
    </Frame>
  );
}

export function GpuGemsCh19DiffuseShadowDiagram() {
  return (
    <Frame ariaLabel="IBL 的 diffuse 与 shadow 补充：用法线索引预卷积的 diffuse cube map，用反射方向索引 specular cube map，并用单独的接触阴影把对象连接到环境。" caption="diffuse IBL 频率低、误差不易察觉；IBL 阴影不必模拟全部潜在光源，优先保证接触阴影让物体站在场景里。">
      <ArrowDefs />
      <text x={360} y={34} textAnchor="middle" fontSize={18} fontWeight={700} fill={primary}>IBL 的最后一公里：diffuse、specular 与接触阴影</text>
      <rect x={34} y={94} width={174} height={190} rx={16} fill={accent} fillOpacity={0.07} stroke={accent} strokeWidth={2} />
      <text x={121} y={126} textAnchor="middle" fontSize={15} fontWeight={700} fill={accent}>environment</text>
      <circle cx={121} cy={202} r={52} fill="url(#ch19-fresnel-gradient)" stroke={accent} strokeWidth={3} />
      <path d="M 78 230 C 96 202, 106 174, 121 154 C 138 176, 151 204, 166 230" fill="none" stroke={success} strokeWidth={3} />
      <Arrow x1={224} y1={190} x2={274} y2={190} stroke={accent} />
      <rect x={292} y={82} width={184} height={220} rx={16} fill={warning} fillOpacity={0.07} stroke={warning} strokeWidth={2} />
      <text x={384} y={114} textAnchor="middle" fontSize={15} fontWeight={700} fill={warning}>preconvolve</text>
      <rect x={322} y={142} width={124} height={34} rx={8} fill={success} fillOpacity={0.22} stroke={success} /><text x={384} y={164} textAnchor="middle" fontSize={12} fill={primary}>normal → diffuse</text>
      <rect x={322} y={194} width={124} height={34} rx={8} fill={danger} fillOpacity={0.22} stroke={danger} /><text x={384} y={216} textAnchor="middle" fontSize={12} fill={primary}>reflection → specular</text>
      <Arrow x1={492} y1={190} x2={542} y2={190} stroke={warning} />
      <rect x={560} y={94} width={126} height={190} rx={16} fill={success} fillOpacity={0.07} stroke={success} strokeWidth={2} />
      <text x={623} y={126} textAnchor="middle" fontSize={15} fontWeight={700} fill={success}>ground</text>
      <ellipse cx={623} cy={228} rx={45} ry={14} fill={danger} fillOpacity={0.28} />
      <path d="M 584 226 C 598 208, 612 202, 623 202 C 636 202, 650 208, 664 226 L 652 250 L 594 250 Z" fill={surface} stroke={border} strokeWidth={2} />
      <text x={623} y={270} textAnchor="middle" fontSize={12} fill={secondary}>contact shadow</text>
      <rect x={112} y={340} width={496} height={30} rx={10} fill={danger} fillOpacity={0.1} stroke={danger} />
      <text x={360} y={360} textAnchor="middle" fontSize={12} fill={primary}>IBL 提供环境外观；接触阴影提供“物体站在哪里”的证据</text>
    </Frame>
  );
}

export function GpuGemsCh19LocalizedIblLab() {
  const [roomRadius, setRoomRadius] = useState(0.72);
  const [objectOffset, setObjectOffset] = useState(0.18);
  const [fresnelExp, setFresnelExp] = useState(5);
  const [bumpiness, setBumpiness] = useState(0.28);
  const [mode, setMode] = useState<"localized" | "infinite">("localized");
  const [showShadow, setShowShadow] = useState(true);

  const reset = () => {
    setRoomRadius(0.72);
    setObjectOffset(0.18);
    setFresnelExp(5);
    setBumpiness(0.28);
    setMode("localized");
    setShowShadow(true);
  };
  const alignment = rounded(mode === "localized" ? Math.max(0.08, 1 - Math.abs(objectOffset) * 0.76 / roomRadius) : 0.42);
  const reflectionScale = rounded(mode === "localized" ? Math.min(1.3, 0.54 + alignment * 0.54 + roomRadius * 0.12) : 0.7);
  const edgeGain = rounded(Math.min(1, 0.05 + (1 - Math.min(1, fresnelExp / 8)) * 0.42 + bumpiness * 0.24));
  const shadowCue = showShadow ? rounded(0.26 + alignment * 0.52) : 0;
  const label = "局部化 IBL 实验：" + mode + " 模式，room radius " + roomRadius.toFixed(2) + "，object offset " + objectOffset.toFixed(2) + "，Fresnel exponent " + fresnelExp + "，bumpiness " + bumpiness.toFixed(2) + "，reflection scale " + reflectionScale.toFixed(2) + "，alignment " + alignment.toFixed(2) + "，contact shadow " + shadowCue.toFixed(2) + "。";

  return (
    <section data-visual-kind="gpu-gems-ch19-image-based-lighting" className="not-prose my-6 rounded-card border border-border bg-elevated p-5" aria-label="局部化图像光照交互实验：切换 localized 或 infinite cube map，调整环境半径、对象偏移、Fresnel exponent、bumpiness 与接触阴影">
      <div className="mb-4 flex flex-wrap items-baseline justify-between gap-3">
        <div>
          <p className="text-[11px] uppercase tracking-[0.18em] text-secondary">Localized IBL Lab</p>
          <h4 className="mt-1 text-[15px] font-semibold text-primary">先猜：对象在房间里移动，局部反射为何会改变？</h4>
        </div>
        <span className="rounded-control border border-accent px-2 py-1 text-[11px] text-accent">可交互</span>
      </div>
      <div className="grid gap-5 md:grid-cols-[1fr_248px] md:items-center">
        <svg viewBox="0 0 560 390" role="img" aria-label={label} className="w-full">
          <ArrowDefs />
          <rect x={12} y={18} width={536} height={354} rx={18} fill={surface} stroke={border} />
          <text x={32} y={46} fontSize={14} fontWeight={700} fill={primary}>{mode === "localized" ? "finite lighting space" : "infinite reflection"}</text>
          <text x={526} y={46} textAnchor="end" fontSize={12} fill={danger}>align {alignment.toFixed(2)}</text>
          <rect x={72} y={86} width={356} height={236} rx={14} fill="url(#ch19-room-gradient)" stroke={accent} strokeWidth={3} strokeDasharray={mode === "localized" ? undefined : "8 6"} />
          <line x1={92} y1={278} x2={408} y2={278} stroke={border} strokeWidth={2} />
          <circle cx={rounded(250 + objectOffset * 88)} cy={206} r={rounded(40 + roomRadius * 20)} fill={warning} fillOpacity={0.18} stroke={warning} strokeWidth={3} />
          <path d={`M ${rounded(250 + objectOffset * 88)} 202 L ${rounded(318 + objectOffset * 62)} ${rounded(158 - bumpiness * 12)}`} stroke={success} strokeWidth={4} markerEnd="url(#ch19-arrow)" />
          <circle cx={rounded(318 + objectOffset * 62)} cy={rounded(158 - bumpiness * 12)} r={7} fill={success} />
          <path d={`M ${rounded(250 + objectOffset * 88)} 236 C ${rounded(270 + bumpiness * 24)} ${rounded(198 - edgeGain * 18)}, ${rounded(314 + objectOffset * 40)} ${rounded(218 + edgeGain * 10)}, ${rounded(356 + objectOffset * 30)} ${rounded(190 - edgeGain * 16)}`} fill="none" stroke={danger} strokeWidth={4} />
          {showShadow && <ellipse cx={rounded(250 + objectOffset * 88)} cy={280} rx={rounded(54 + shadowCue * 18)} ry={rounded(12 + shadowCue * 6)} fill={danger} fillOpacity={0.16 + shadowCue * 0.24} />}
          <text x={250} y={350} textAnchor="middle" fontSize={12} fill={secondary}>{mode === "localized" ? "reflection scales and aligns with room features" : "reflection behaves as if room were infinitely far"}</text>
        </svg>
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-2">
            <button type="button" aria-pressed={mode === "localized"} onClick={() => setMode("localized")} className={"min-h-11 rounded-control border px-2 py-2 text-xs " + (mode === "localized" ? "border-success text-primary" : "border-border text-secondary")}>localized</button>
            <button type="button" aria-pressed={mode === "infinite"} onClick={() => setMode("infinite")} className={"min-h-11 rounded-control border px-2 py-2 text-xs " + (mode === "infinite" ? "border-warning text-primary" : "border-border text-secondary")}>infinite</button>
          </div>
          <label className="block text-sm text-primary" htmlFor="ch19-radius">room radius：{roomRadius.toFixed(2)}</label>
          <input id="ch19-radius" className="min-h-11 w-full accent-accent" type="range" min="0.35" max="1" step="0.02" value={roomRadius} onChange={(event) => setRoomRadius(Number(event.target.value))} aria-label="调整 lighting space 半径" />
          <label className="block text-sm text-primary" htmlFor="ch19-offset">object offset：{objectOffset.toFixed(2)}</label>
          <input id="ch19-offset" className="min-h-11 w-full accent-accent" type="range" min="-0.8" max="0.8" step="0.04" value={objectOffset} onChange={(event) => setObjectOffset(Number(event.target.value))} aria-label="调整对象在 lighting space 中的偏移" />
          <label className="block text-sm text-primary" htmlFor="ch19-fresnel">Fresnel exponent：{fresnelExp}</label>
          <input id="ch19-fresnel" className="min-h-11 w-full accent-accent" type="range" min="2" max="8" step="1" value={fresnelExp} onChange={(event) => setFresnelExp(Number(event.target.value))} aria-label="调整 Fresnel exponent" />
          <label className="block text-sm text-primary" htmlFor="ch19-bump">bumpiness：{bumpiness.toFixed(2)}</label>
          <input id="ch19-bump" className="min-h-11 w-full accent-accent" type="range" min="0" max="0.8" step="0.02" value={bumpiness} onChange={(event) => setBumpiness(Number(event.target.value))} aria-label="调整 bumpiness" />
          <label className="flex min-h-11 items-center gap-2 text-sm text-primary" htmlFor="ch19-shadow"><input id="ch19-shadow" className="h-4 w-4 accent-accent" type="checkbox" checked={showShadow} onChange={(event) => setShowShadow(event.target.checked)} />显示接触阴影</label>
          <button type="button" aria-label="重置局部化 IBL 实验" onClick={reset} className="min-h-11 w-full rounded-control border border-border px-3 py-2 text-sm text-secondary hover:border-accent hover:text-primary">重置实验</button>
          <p className="text-xs text-secondary" role="status">观察：localized 模式中，object offset 会改变反射与房间特征的对齐；Fresnel 增强掠射角反射，bump 改变局部反射方向；接触阴影负责把对象钉在地面上。</p>
        </div>
      </div>
    </section>
  );
}
