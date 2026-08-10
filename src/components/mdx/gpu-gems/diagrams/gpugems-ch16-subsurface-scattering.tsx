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
      <marker id="ch16-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 z" fill={accent} />
      </marker>
      <linearGradient id="ch16-skin-gradient" x1="0" x2="1">
        <stop offset="0" stopColor={warning} stopOpacity="0.22" />
        <stop offset="0.5" stopColor={danger} stopOpacity="0.3" />
        <stop offset="1" stopColor={success} stopOpacity="0.14" />
      </linearGradient>
      <linearGradient id="ch16-blur-gradient" x1="0" x2="1">
        <stop offset="0" stopColor={danger} stopOpacity="0.08" />
        <stop offset="0.5" stopColor={danger} stopOpacity="0.4" />
        <stop offset="1" stopColor={danger} stopOpacity="0.08" />
      </linearGradient>
    </defs>
  );
}

function Arrow({ x1, y1, x2, y2, stroke = accent }: { x1: number; y1: number; x2: number; y2: number; stroke?: string }) {
  return <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={stroke} strokeWidth="3" markerEnd="url(#ch16-arrow)" />;
}

export function GpuGemsCh16ScatteringJourneyDiagram() {
  const stages = [
    { x: 28, title: "entry", detail: "light enters", color: warning },
    { x: 196, title: "scatter", detail: "bleed + absorb", color: danger },
    { x: 364, title: "exit", detail: "different point", color: success },
    { x: 532, title: "shade", detail: "soft + tint", color: accent },
  ];
  return (
    <Frame ariaLabel="次表面散射的光路：光从一个表面点进入，在材料内部散射和吸收后，从另一个表面点离开，最终形成柔化、邻域 bleed 和偏红的阴影过渡。" caption="与只在表面计算的 diffuse 不同，次表面散射让 entry 与 exit 不必是同一点；光传播距离越长，扩散和吸收越明显。">
      <ArrowDefs />
      <text x="360" y="34" textAnchor="middle" fontSize="18" fontWeight="700" fill={primary}>light enters → scatters → exits elsewhere</text>
      {stages.map((stage, index) => (
        <g key={stage.title}>
          <rect x={stage.x} y="108" width="138" height="166" rx="16" fill={stage.color} fillOpacity="0.07" stroke={stage.color} strokeWidth="2" />
          <text x={stage.x + 69} y="140" textAnchor="middle" fontSize="15" fontWeight="700" fill={stage.color}>{stage.title}</text>
          <circle cx={stage.x + 69} cy="198" r="30" fill={stage.color} fillOpacity="0.16" stroke={stage.color} strokeWidth="3" />
          {index === 0 && <><circle cx={stage.x + 69} cy="198" r="9" fill={warning} /><Arrow x1={stage.x + 32} y1={198} x2={stage.x + 52} y2={198} stroke={warning} /></>}
          {index === 1 && <><circle cx={stage.x + 50} cy="198" r="6" fill={danger} /><circle cx={stage.x + 69} cy="184" r="6" fill={danger} /><circle cx={stage.x + 86} cy="205" r="6" fill={danger} /><path d={"M " + (stage.x + 46) + " 214 C " + (stage.x + 58) + " 168, " + (stage.x + 78) + " 224, " + (stage.x + 92) + " 181"} fill="none" stroke={danger} strokeWidth="3" /></>}
          {index === 2 && <><circle cx={stage.x + 55} cy="198" r="8" fill={success} /><circle cx={stage.x + 86} cy="198" r="8" fill={success} /><path d={"M " + (stage.x + 55) + " 198 C " + (stage.x + 64) + " 170, " + (stage.x + 77) + " 224, " + (stage.x + 86) + " 198"} fill="none" stroke={success} strokeWidth="3" /></>}
          {index === 3 && <><path d={"M " + (stage.x + 45) + " 216 C " + (stage.x + 56) + " 174, " + (stage.x + 72) + " 222, " + (stage.x + 92) + " 180"} fill="none" stroke={accent} strokeWidth="4" /><circle cx={stage.x + 92} cy="180" r="6" fill={danger} /></>}
          <text x={stage.x + 69} y="250" textAnchor="middle" fontSize="12" fill={secondary}>{stage.detail}</text>
          {index < stages.length - 1 && <Arrow x1={stage.x + 144} y1={198} x2={stage.x + 160} y2={198} stroke={stage.color} />}
        </g>
      ))}
      <rect x="116" y="318" width="488" height="42" rx="12" fill={danger} fillOpacity="0.1" stroke={danger} />
      <text x="360" y="344" textAnchor="middle" fontSize="13" fill={primary}>thin regions amplify the effect: ears, nostrils, shadow transitions</text>
    </Frame>
  );
}

export function GpuGemsCh16WrapLightingDiagram() {
  const points = Array.from({ length: 8 }, (_, index) => {
    const x = 84 + index * 78;
    const lambert = Math.max(0, Math.cos((index / 7) * Math.PI));
    const wrap = Math.max(0, (Math.cos((index / 7) * Math.PI) + 0.28) / 1.28);
    return { x, lambertY: 276 - lambert * 130, wrapY: 276 - wrap * 130 };
  });
  return (
    <Frame ariaLabel="wrap lighting 对比图：Lambert diffuse 在法线与光线点积为负时归零，wrap diffuse 使用可调 wrap 值将曲线延伸到背光侧，降低明暗对比。" caption="wrap lighting 是便宜的视觉近似：它不模拟真实体积传播，却能减少 diffuse 的硬截止，并把颜色 tint 放到光暗过渡处。">
      <ArrowDefs />
      <text x="360" y="34" textAnchor="middle" fontSize="18" fontWeight="700" fill={primary}>wrap lighting：让 diffuse 在背光侧渐进</text>
      <line x1="84" y1="276" x2="630" y2="276" stroke={border} strokeWidth="2" />
      <line x1="84" y1="128" x2="84" y2="276" stroke={border} strokeWidth="2" />
      <path d={points.map((point, index) => (index === 0 ? "M " : " L ") + point.x + " " + point.lambertY).join("")} fill="none" stroke={accent} strokeWidth="4" />
      <path d={points.map((point, index) => (index === 0 ? "M " : " L ") + point.x + " " + point.wrapY).join("")} fill="none" stroke={warning} strokeWidth="4" />
      {points.map((point, index) => <g key={"curve-" + index}><circle cx={point.x} cy={point.lambertY} r="5" fill={accent} /><circle cx={point.x} cy={point.wrapY} r="5" fill={warning} /></g>)}
      <text x="100" y="120" fontSize="13" fill={accent}>Lambert max(0, dot(L,N))</text>
      <text x="100" y="146" fontSize="13" fill={warning}>wrap (dot + w) / (1 + w)</text>
      <text x="84" y="306" fontSize="12" fill={secondary}>lit</text>
      <text x="598" y="306" fontSize="12" fill={secondary}>backlit</text>
      <rect x="176" y="334" width="368" height="38" rx="10" fill={danger} fillOpacity="0.1" stroke={danger} />
      <text x="360" y="358" textAnchor="middle" fontSize="13" fill={primary}>w controls wrap width; LUT can add red transition tint</text>
    </Frame>
  );
}

export function GpuGemsCh16DepthMapDiagram() {
  return (
    <Frame ariaLabel="深度图厚度估计：light pass 记录光线进入表面的距离 d_i，shading pass 计算光线离开表面的距离 d_o，二者相减得到穿过材料的距离 s，再用于吸收与颜色查表。" caption="depth-map 方法把体积厚度转成两个表面距离之差；它依赖凸物体近似，孔洞和复杂内部结构需要 depth peeling 或更多层。">
      <ArrowDefs />
      <text x="360" y="34" textAnchor="middle" fontSize="18" fontWeight="700" fill={primary}>penetration depth: s = d_o − d_i</text>
      <circle cx="164" cy="210" r="78" fill="url(#ch16-skin-gradient)" stroke={border} strokeWidth="3" />
      <path d="M 72 210 C 104 160, 126 160, 164 160 C 202 160, 224 160, 256 210 C 224 260, 202 260, 164 260 C 126 260, 104 260, 72 210 Z" fill="none" stroke={warning} strokeWidth="3" />
      <circle cx="88" cy="196" r="8" fill={warning} />
      <circle cx="235" cy="224" r="8" fill={success} />
      <path d="M 24 196 L 80 196" stroke={warning} strokeWidth="3" markerEnd="url(#ch16-arrow)" />
      <path d="M 88 196 C 126 178, 170 245, 235 224" fill="none" stroke={danger} strokeWidth="4" strokeDasharray="7 6" />
      <text x="92" y="178" fontSize="13" fill={warning}>entry d_i</text>
      <text x="235" y="250" textAnchor="middle" fontSize="13" fill={success}>exit d_o</text>
      <Arrow x1={286} y1={210} x2={356} y2={210} stroke={accent} />
      <rect x="374" y="128" width="268" height="166" rx="16" fill={accent} fillOpacity="0.07" stroke={accent} strokeWidth="2" />
      <text x="508" y="164" textAnchor="middle" fontSize="16" fontWeight="700" fill={accent}>render + project</text>
      <text x="508" y="202" textAnchor="middle" fontSize="15" fill={primary}>s = d_o − d_i</text>
      <text x="508" y="232" textAnchor="middle" fontSize="13" fill={secondary}>absorption ∼ exp(−s · sigma_t)</text>
      <text x="508" y="262" textAnchor="middle" fontSize="13" fill={danger}>thicker → dimmer / more diffused</text>
      <rect x="128" y="334" width="464" height="38" rx="10" fill={warning} fillOpacity="0.1" stroke={warning} />
      <text x="360" y="358" textAnchor="middle" fontSize="13" fill={primary}>depth texture follows incoming light direction</text>
    </Frame>
  );
}

export function GpuGemsCh16TextureSpaceDiffusionDiagram() {
  const stages = [
    { x: 30, title: "3D mesh", detail: "normal lighting", color: accent },
    { x: 198, title: "UV unwrap", detail: "texel = surface", color: warning },
    { x: 366, title: "separable blur", detail: "x then y", color: danger },
    { x: 534, title: "reapply", detail: "diffused light", color: success },
  ];
  return (
    <Frame ariaLabel="纹理空间扩散流程：把模型按唯一 UV 展开到二维纹理，先渲染光照到 light map，使用可分离 x/y blur 扩散，再将结果作为纹理重新应用到 3D 模型。" caption="texture-space diffusion 把着色复杂度从屏幕像素解耦到纹理 texel；它需要良好且不重叠的 UV，并能利用 separable filter 与 bilinear hardware。">
      <ArrowDefs />
      <text x="360" y="34" textAnchor="middle" fontSize="18" fontWeight="700" fill={primary}>texture-space diffusion</text>
      {stages.map((stage, index) => (
        <g key={stage.title}>
          <rect x={stage.x} y="108" width="138" height="166" rx="16" fill={stage.color} fillOpacity="0.07" stroke={stage.color} strokeWidth="2" />
          <text x={stage.x + 69} y="140" textAnchor="middle" fontSize="15" fontWeight="700" fill={stage.color}>{stage.title}</text>
          {index === 0 && <><path d={"M " + (stage.x + 45) + " 224 L " + (stage.x + 58) + " 176 L " + (stage.x + 76) + " 224 L " + (stage.x + 92) + " 176"} fill="none" stroke={accent} strokeWidth="4" /><circle cx={stage.x + 70} cy="196" r="7" fill={warning} /></>}
          {index === 1 && <><rect x={stage.x + 45} y="172" width="48" height="48" fill={warning} fillOpacity="0.12" stroke={warning} strokeWidth="2" /><path d={"M " + (stage.x + 49) + " 176 L " + (stage.x + 89) + " 216 M " + (stage.x + 89) + " 176 L " + (stage.x + 49) + " 216"} stroke={warning} strokeWidth="2" /><circle cx={stage.x + 69} cy="196" r="5" fill={success} /></>}
          {index === 2 && <><rect x={stage.x + 44} y="179" width="52" height="34" fill="url(#ch16-blur-gradient)" stroke={danger} /><line x1={stage.x + 48} y1="196" x2={stage.x + 92} y2="196" stroke={danger} strokeWidth="4" /><line x1={stage.x + 69} y1="174" x2={stage.x + 69} y2="218" stroke={danger} strokeWidth="2" /></>}
          {index === 3 && <><path d={"M " + (stage.x + 48) + " 218 C " + (stage.x + 57) + " 174, " + (stage.x + 76) + " 224, " + (stage.x + 91) + " 182"} fill="none" stroke={success} strokeWidth="4" /><circle cx={stage.x + 91} cy="182" r="6" fill={danger} /></>}
          <text x={stage.x + 69} y="250" textAnchor="middle" fontSize="12" fill={secondary}>{stage.detail}</text>
          {index < stages.length - 1 && <Arrow x1={stage.x + 144} y1={198} x2={stage.x + 160} y2={198} stroke={stage.color} />}
        </g>
      ))}
      <rect x="128" y="318" width="464" height="42" rx="12" fill={success} fillOpacity="0.1" stroke={success} />
      <text x="360" y="344" textAnchor="middle" fontSize="13" fill={primary}>low-res texel lighting + blur ≈ soft transport</text>
    </Frame>
  );
}

export function GpuGemsCh16SubsurfaceLab() {
  const [wrap, setWrap] = useState(0.28);
  const [thickness, setThickness] = useState(0.46);
  const [scatterWidth, setScatterWidth] = useState(0.34);
  const [redDiffusion, setRedDiffusion] = useState(0.62);
  const [mode, setMode] = useState<"wrap" | "depth" | "texture">("texture");

  const reset = () => {
    setWrap(0.28);
    setThickness(0.46);
    setScatterWidth(0.34);
    setRedDiffusion(0.62);
    setMode("texture");
  };
  const bleed = rounded(Math.min(1, scatterWidth * 0.78 + (mode === "texture" ? 0.18 : 0) + wrap * 0.22));
  const absorption = rounded(Math.max(0.08, Math.exp(-thickness * 2.1)));
  const redShift = rounded(Math.min(1, redDiffusion * (0.42 + thickness * 0.58)));
  const label = "次表面散射实验：模式 " + mode + "，wrap " + wrap.toFixed(2) + "，厚度 " + thickness.toFixed(2) + "，scatter width " + scatterWidth.toFixed(2) + "，红色扩散 " + redDiffusion.toFixed(2) + "，邻域 bleed " + bleed.toFixed(2) + "，透射强度 " + absorption.toFixed(2) + "。";
  const ringOpacity = 0.14 + bleed * 0.22;

  return (
    <section data-visual-kind="gpu-gems-ch16-subsurface-scattering" className="not-prose my-6 rounded-card border border-border bg-elevated p-5" aria-label="次表面散射实验：切换 wrap、depth 或 texture-space 模式，调整厚度、散射宽度和红色通道扩散，观察透射、邻域 bleed 与颜色偏移">
      <div className="mb-4 flex flex-wrap items-baseline justify-between gap-3">
        <div>
          <p className="text-[11px] uppercase tracking-[0.18em] text-secondary">Subsurface Scattering Lab</p>
          <h4 className="mt-1 text-[15px] font-semibold text-primary">先猜：厚度增加时，亮度和红色 bleed 会怎样？</h4>
        </div>
        <span className="rounded-control border border-accent px-2 py-1 text-[11px] text-accent">可交互</span>
      </div>
      <div className="grid gap-5 md:grid-cols-[1fr_248px] md:items-center">
        <svg viewBox="0 0 560 390" role="img" aria-label={label} className="w-full">
          <ArrowDefs />
          <rect x="12" y="18" width="536" height="354" rx="18" fill={surface} stroke={border} />
          <text x="32" y="46" fontSize="14" fontWeight="700" fill={primary}>{mode === "wrap" ? "wrap lighting" : mode === "depth" ? "depth-map absorption" : "texture-space diffusion"}</text>
          <text x="526" y="46" textAnchor="end" fontSize="12" fill={danger}>bleed {bleed.toFixed(2)}</text>
          <ellipse cx="276" cy="192" rx="122" ry="84" fill="url(#ch16-skin-gradient)" stroke={border} strokeWidth="3" />
          <ellipse cx="276" cy="192" rx={rounded(68 + bleed * 30)} ry={rounded(45 + bleed * 22)} fill="none" stroke={danger} strokeWidth="10" opacity={ringOpacity} />
          <ellipse cx="276" cy="192" rx={rounded(92 + bleed * 24)} ry={rounded(64 + bleed * 16)} fill="none" stroke={danger} strokeWidth="6" opacity={ringOpacity * 0.7} />
          <circle cx="205" cy="168" r="10" fill={warning} />
          <circle cx="354" cy="216" r="10" fill={success} />
          <path d="M 116 168 L 194 168" stroke={warning} strokeWidth="3" markerEnd="url(#ch16-arrow)" />
          <path d="M 205 168 C 245 135, 302 245, 354 216" fill="none" stroke={danger} strokeWidth="4" strokeDasharray="7 6" />
          <text x="205" y="144" textAnchor="middle" fontSize="12" fill={warning}>entry</text>
          <text x="354" y="244" textAnchor="middle" fontSize="12" fill={success}>exit</text>
          <rect x="78" y="294" width="396" height="34" rx="10" fill={danger} fillOpacity={0.1 + redShift * 0.2} stroke={danger} />
          <text x="276" y="316" textAnchor="middle" fontSize="13" fill={primary}>absorption {absorption.toFixed(2)} · red-channel shift {redShift.toFixed(2)}</text>
          <text x="78" y="358" fontSize="12" fill={secondary}>mode changes the approximation, not the need for believable art</text>
        </svg>
        <div className="space-y-3">
          <div className="grid grid-cols-3 gap-2">
            <button type="button" aria-pressed={mode === "wrap"} onClick={() => setMode("wrap")} className={"min-h-11 rounded-control border px-2 py-2 text-xs " + (mode === "wrap" ? "border-warning text-primary" : "border-border text-secondary")}>wrap</button>
            <button type="button" aria-pressed={mode === "depth"} onClick={() => setMode("depth")} className={"min-h-11 rounded-control border px-2 py-2 text-xs " + (mode === "depth" ? "border-accent text-primary" : "border-border text-secondary")}>depth</button>
            <button type="button" aria-pressed={mode === "texture"} onClick={() => setMode("texture")} className={"min-h-11 rounded-control border px-2 py-2 text-xs " + (mode === "texture" ? "border-success text-primary" : "border-border text-secondary")}>texture</button>
          </div>
          <label className="block text-sm text-primary" htmlFor="ch16-wrap">wrap：{wrap.toFixed(2)}</label>
          <input id="ch16-wrap" className="min-h-11 w-full accent-accent" type="range" min="0" max="0.9" step="0.02" value={wrap} onChange={(event) => setWrap(Number(event.target.value))} aria-label="调整 wrap lighting 范围" />
          <label className="block text-sm text-primary" htmlFor="ch16-thickness">material thickness：{thickness.toFixed(2)}</label>
          <input id="ch16-thickness" className="min-h-11 w-full accent-accent" type="range" min="0.05" max="1" step="0.02" value={thickness} onChange={(event) => setThickness(Number(event.target.value))} aria-label="调整材料厚度" />
          <label className="block text-sm text-primary" htmlFor="ch16-scatter">scatter width：{scatterWidth.toFixed(2)}</label>
          <input id="ch16-scatter" className="min-h-11 w-full accent-accent" type="range" min="0.05" max="0.9" step="0.02" value={scatterWidth} onChange={(event) => setScatterWidth(Number(event.target.value))} aria-label="调整散射宽度" />
          <label className="block text-sm text-primary" htmlFor="ch16-red">red diffusion：{redDiffusion.toFixed(2)}</label>
          <input id="ch16-red" className="min-h-11 w-full accent-accent" type="range" min="0" max="1" step="0.02" value={redDiffusion} onChange={(event) => setRedDiffusion(Number(event.target.value))} aria-label="调整红色通道扩散" />
          <button type="button" aria-label="重置次表面散射实验" onClick={reset} className="min-h-11 w-full rounded-control border border-border px-3 py-2 text-sm text-secondary hover:border-accent hover:text-primary">重置实验</button>
          <p className="text-xs text-secondary" role="status">观察：厚度增加会增强吸收；较宽的散射会模糊邻域；红色通道更宽时，阴影过渡更偏红。wrap 便宜但不记录真实 entry/exit。</p>
        </div>
      </div>
    </section>
  );
}
