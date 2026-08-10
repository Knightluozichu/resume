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
      <marker id="ch17-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 z" fill={accent} />
      </marker>
      <linearGradient id="ch17-ao-gradient" x1="0" x2="1" y1="0" y2="1">
        <stop offset="0" stopColor={success} stopOpacity="0.18" />
        <stop offset="0.58" stopColor={warning} stopOpacity="0.2" />
        <stop offset="1" stopColor={danger} stopOpacity="0.34" />
      </linearGradient>
      <linearGradient id="ch17-depth-gradient" x1="0" x2="1">
        <stop offset="0" stopColor={surface} />
        <stop offset="0.64" stopColor={accent} stopOpacity="0.24" />
        <stop offset="1" stopColor={danger} stopOpacity="0.5" />
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
  return <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={stroke} strokeWidth={3} markerEnd="url(#ch17-arrow)" />;
}

export function GpuGemsCh17OcclusionPipelineDiagram() {
  const stages = [
    { x: 30, title: "surface", detail: "p, n, mesh", color: accent },
    { x: 198, title: "object-space", detail: "ray tests → bake", color: warning },
    { x: 366, title: "screen-space", detail: "depth → samples", color: success },
    { x: 534, title: "shade", detail: "ambient × A(p)", color: danger },
  ];

  return (
    <Frame ariaLabel="环境光遮蔽的统一流程：从表面点和法线出发，选择物体空间预计算或屏幕空间深度采样，得到环境光可达性后调制 ambient 或 diffuse。" caption="两条实现路径共享同一个目标：估计表面点能看到多少半球方向的环境光，再把可达性作为标量加入着色。">
      <ArrowDefs />
      <text x="360" y="34" textAnchor="middle" fontSize="18" fontWeight="700" fill={primary}>ambient occlusion：估计环境光可达性</text>
      {stages.map((stage, index) => (
        <g key={stage.title}>
          <rect x={stage.x} y={106} width={138} height={166} rx={16} fill={stage.color} fillOpacity={0.08} stroke={stage.color} strokeWidth={2} />
          <text x={stage.x + 69} y={138} textAnchor="middle" fontSize="15" fontWeight="700" fill={stage.color}>{stage.title}</text>
          {index === 0 && <><circle cx={stage.x + 69} cy={198} r={42} fill="url(#ch17-ao-gradient)" stroke={border} strokeWidth={3} /><circle cx={stage.x + 69} cy={198} r={8} fill={accent} /><path d={`M ${stage.x + 69} 190 L ${stage.x + 69} 150`} stroke={accent} strokeWidth={3} markerEnd="url(#ch17-arrow)" /></>}
          {index === 1 && <><path d={`M ${stage.x + 40} 226 C ${stage.x + 46} 170, ${stage.x + 90} 158, ${stage.x + 98} 226`} fill="none" stroke={warning} strokeWidth={3} /><circle cx={stage.x + 52} cy={197} r={5} fill={success} /><circle cx={stage.x + 70} cy={179} r={5} fill={success} /><circle cx={stage.x + 88} cy={194} r={5} fill={danger} /><circle cx={stage.x + 69} cy={220} r={7} fill={warning} /></>}
          {index === 2 && <><rect x={stage.x + 38} y={166} width={62} height={62} fill="url(#ch17-depth-gradient)" stroke={success} strokeWidth={2} /><path d={`M ${stage.x + 45} 218 L ${stage.x + 94} 176 M ${stage.x + 44} 203 L ${stage.x + 79} 173`} stroke={success} strokeWidth={3} /><circle cx={stage.x + 69} cy={198} r={7} fill={danger} /></>}
          {index === 3 && <><circle cx={stage.x + 69} cy={198} r={42} fill={danger} fillOpacity={0.12} stroke={danger} strokeWidth={3} /><circle cx={stage.x + 69} cy={198} r={24} fill={danger} fillOpacity={0.28} /><text x={stage.x + 69} y={204} textAnchor="middle" fontSize={15} fontWeight="700" fill={primary}>A(p)</text></>}
          <text x={stage.x + 69} y={250} textAnchor="middle" fontSize={12} fill={secondary}>{stage.detail}</text>
          {index < stages.length - 1 && <Arrow x1={stage.x + 144} y1={198} x2={stage.x + 160} y2={198} stroke={stage.color} />}
        </g>
      ))}
      <rect x={96} y={318} width={528} height={42} rx={12} fill={accent} fillOpacity={0.08} stroke={accent} />
      <text x={360} y={344} textAnchor="middle" fontSize={13} fill={primary}>A(p) ∈ [0, 1]：0 是完全遮蔽，1 是半球开放</text>
    </Frame>
  );
}

export function GpuGemsCh17HemisphereSamplingDiagram() {
  const rays = [
    { x: 224, y: 170, endX: 306, endY: 126, color: success, label: "open" },
    { x: 234, y: 182, endX: 330, endY: 172, color: success, label: "open" },
    { x: 242, y: 194, endX: 286, endY: 230, color: danger, label: "blocked" },
    { x: 244, y: 205, endX: 300, endY: 268, color: danger, label: "blocked" },
    { x: 234, y: 214, endX: 356, endY: 260, color: success, label: "open" },
  ];

  return (
    <Frame ariaLabel="物体空间环境光遮蔽的半球采样：以表面点为中心、法线方向为上半球轴发射多条射线，命中几何体的射线被计为 blocked，未命中的射线被计为 open。" caption="物体空间方法可以看到屏幕外的几何体，因此适合静态或慢变化资产的预计算；采样数量越少，结果越便宜也越容易有噪声。">
      <ArrowDefs />
      <text x={360} y={34} textAnchor="middle" fontSize={18} fontWeight="700" fill={primary}>object-space AO：法线半球上的 ray test</text>
      <path d="M 90 294 C 118 270, 140 254, 174 256 C 210 258, 218 284, 254 292 C 294 302, 338 287, 382 292 L 382 336 L 90 336 Z" fill={surface} stroke={border} strokeWidth={3} />
      <path d="M 204 256 C 216 226, 242 216, 264 226 C 281 234, 283 253, 300 260 C 315 266, 338 258, 350 270 L 350 294 L 204 292 Z" fill={danger} fillOpacity={0.16} stroke={danger} strokeWidth={2} />
      <circle cx={232} cy={218} r={9} fill={accent} />
      <Arrow x1={232} y1={208} x2={232} y2={142} stroke={accent} />
      <text x={247} y={148} fontSize={13} fill={accent}>normal n</text>
      <path d="M 132 218 A 102 102 0 0 1 332 218" fill="none" stroke={warning} strokeWidth={3} strokeDasharray="7 6" />
      <text x={112} y={202} fontSize={12} fill={warning}>hemisphere</text>
      {rays.map((ray) => (
        <g key={ray.label + ray.x + ray.y}>
          <line x1={ray.x} y1={ray.y} x2={ray.endX} y2={ray.endY} stroke={ray.color} strokeWidth={3} strokeDasharray={ray.label === "blocked" ? "5 4" : undefined} markerEnd="url(#ch17-arrow)" />
          <circle cx={ray.endX} cy={ray.endY} r={5} fill={ray.color} />
        </g>
      ))}
      <rect x={438} y={122} width={204} height={164} rx={14} fill={accent} fillOpacity={0.07} stroke={accent} strokeWidth={2} />
      <text x={540} y={154} textAnchor="middle" fontSize={15} fontWeight={700} fill={accent}>occlusion factor</text>
      <text x={540} y={194} textAnchor="middle" fontSize={16} fill={primary}>A(p) = open / N</text>
      <text x={540} y={228} textAnchor="middle" fontSize={13} fill={secondary}>3 open / 5 samples</text>
      <text x={540} y={254} textAnchor="middle" fontSize={15} fontWeight={700} fill={success}>A(p) = 0.60</text>
      <rect x={134} y={364} width={452} height={30} rx={10} fill={warning} fillOpacity={0.1} stroke={warning} />
      <text x={360} y={384} textAnchor="middle" fontSize={12} fill={primary}>AO 是可达性近似，不是直接光照、阴影或完整 transport</text>
    </Frame>
  );
}

export function GpuGemsCh17ScreenSpaceAoDiagram() {
  return (
    <Frame ariaLabel="屏幕空间环境光遮蔽流程：从深度缓冲重建当前像素的 view-space 点与法线，在屏幕邻域沿半球方向采样，并将样本深度与当前点比较，最后把遮蔽量合成到 ambient 项。" caption="screen-space AO 不需要离线烘焙，适合动态物体；代价是只知道屏幕中可见的几何体，屏幕外遮挡物和深度边缘会造成漏光或 halo。">
      <ArrowDefs />
      <text x={360} y={34} textAnchor="middle" fontSize={18} fontWeight={700} fill={primary}>screen-space AO：depth → view-space → compare</text>
      <rect x={34} y={86} width={190} height={210} rx={16} fill={surface} stroke={border} strokeWidth={2} />
      <text x={129} y={116} textAnchor="middle" fontSize={15} fontWeight={700} fill={accent}>depth buffer</text>
      <rect x={57} y={142} width={144} height={112} fill="url(#ch17-depth-gradient)" stroke={accent} strokeWidth={2} />
      <path d="M 65 228 C 88 196, 111 204, 128 170 C 147 142, 166 194, 194 166 L 194 246 L 65 246 Z" fill={danger} fillOpacity={0.32} />
      <circle cx={126} cy={184} r={8} fill={warning} />
      <text x={129} y={278} textAnchor="middle" fontSize={12} fill={secondary}>z(p) + neighborhood z</text>
      <Arrow x1={238} y1={190} x2={292} y2={190} stroke={accent} />
      <rect x={310} y={86} width={170} height={210} rx={16} fill={success} fillOpacity={0.07} stroke={success} strokeWidth={2} />
      <text x={395} y={116} textAnchor="middle" fontSize={15} fontWeight={700} fill={success}>reconstruct</text>
      <circle cx={395} cy={196} r={48} fill="none" stroke={success} strokeWidth={2} strokeDasharray="7 5" />
      <circle cx={395} cy={196} r={8} fill={warning} />
      <Arrow x1={395} y1={187} x2={395} y2={142} stroke={success} />
      <text x={395} y={234} textAnchor="middle" fontSize={12} fill={primary}>Pview, Nview</text>
      <text x={395} y={270} textAnchor="middle" fontSize={12} fill={secondary}>projection inverse</text>
      <Arrow x1={494} y1={190} x2={548} y2={190} stroke={success} />
      <rect x={564} y={86} width={122} height={210} rx={16} fill={danger} fillOpacity={0.07} stroke={danger} strokeWidth={2} />
      <text x={625} y={116} textAnchor="middle" fontSize={15} fontWeight={700} fill={danger}>compare</text>
      <circle cx={625} cy={196} r={34} fill={danger} fillOpacity={0.18} stroke={danger} strokeWidth={2} />
      <path d="M 625 162 L 625 230 M 591 196 L 659 196" stroke={danger} strokeWidth={2} />
      <text x={625} y={258} textAnchor="middle" fontSize={12} fill={primary}>zsample − z(p)</text>
      <rect x={92} y={332} width={536} height={42} rx={12} fill={warning} fillOpacity={0.1} stroke={warning} />
      <text x={360} y={358} textAnchor="middle" fontSize={13} fill={primary}>sample behind receiver + bias → darken ambient; sample in front → reject</text>
    </Frame>
  );
}

export function GpuGemsCh17ArtifactTradeoffDiagram() {
  const bars = [
    { label: "small radius", value: 0.32, detail: "contact detail", color: success },
    { label: "large radius", value: 0.78, detail: "soft halo risk", color: warning },
    { label: "low samples", value: 0.66, detail: "noise / banding", color: danger },
    { label: "high bias", value: 0.54, detail: "less acne, more leaks", color: accent },
  ];
  return (
    <Frame ariaLabel="屏幕空间环境光遮蔽参数权衡：小半径保留接触细节，大半径容易产生 halo，低采样数带来噪声，高 bias 减少自遮蔽痘点但会漏光。" caption="radius、samples 与 bias 没有独立的完美值：应结合深度分辨率、相机距离和动态稳定性，在 contact cue 与 halo、噪声、漏光之间取舍。">
      <ArrowDefs />
      <text x={360} y={34} textAnchor="middle" fontSize={18} fontWeight={700} fill={primary}>SSAO 参数：质量预算是一组 trade-off</text>
      <line x1={74} y1={300} x2={664} y2={300} stroke={border} strokeWidth={2} />
      <text x={74} y={326} fontSize={12} fill={secondary}>局部接触</text>
      <text x={586} y={326} fontSize={12} fill={secondary}>全局 halo</text>
      {bars.map((bar, index) => {
        const y = 82 + index * 58;
        const width = rounded(84 + bar.value * 420);
        return (
          <g key={bar.label}>
            <text x={74} y={y + 22} fontSize={13} fontWeight={700} fill={primary}>{bar.label}</text>
            <rect x={202} y={y} width={430} height={30} rx={10} fill={surface} stroke={border} />
            <rect x={202} y={y} width={width} height={30} rx={10} fill={bar.color} fillOpacity={0.32} stroke={bar.color} />
            <text x={218 + width} y={y + 20} fontSize={12} fill={primary}>{bar.detail}</text>
          </g>
        );
      })}
      <rect x={150} y={354} width={420} height={30} rx={10} fill={accent} fillOpacity={0.08} stroke={accent} />
      <text x={360} y={375} textAnchor="middle" fontSize={12} fill={primary}>先用 bias 去除 acne，再用 radius 保住 contact，最后补 samples</text>
    </Frame>
  );
}

export function GpuGemsCh17AmbientOcclusionLab() {
  const [radius, setRadius] = useState(0.46);
  const [bias, setBias] = useState(0.18);
  const [samples, setSamples] = useState(8);
  const [mode, setMode] = useState<"object" | "screen">("screen");
  const [showRays, setShowRays] = useState(true);

  const reset = () => {
    setRadius(0.46);
    setBias(0.18);
    setSamples(8);
    setMode("screen");
    setShowRays(true);
  };
  const contact = rounded(Math.min(1, radius * 0.82 + (mode === "screen" ? 0.08 : 0.02)));
  const leak = rounded(Math.max(0, radius * 0.22 + bias * 0.34 - 0.11));
  const noise = rounded(Math.max(0, (12 - samples) / 12 * 0.62));
  const occlusion = rounded(Math.max(0.05, Math.min(0.98, 1 - contact + leak)));
  const label = "环境光遮蔽实验：" + mode + " 模式，radius " + radius.toFixed(2) + "，bias " + bias.toFixed(2) + "，samples " + samples + "，可达性 " + occlusion.toFixed(2) + "，漏光风险 " + leak.toFixed(2) + "，噪声 " + noise.toFixed(2) + "。";

  return (
    <section data-visual-kind="gpu-gems-ch17-ambient-occlusion" className="not-prose my-6 rounded-card border border-border bg-elevated p-5" aria-label="环境光遮蔽交互实验：切换物体空间或屏幕空间模式，调整半径、bias 和采样数，观察接触、漏光和噪声的权衡">
      <div className="mb-4 flex flex-wrap items-baseline justify-between gap-3">
        <div>
          <p className="text-[11px] uppercase tracking-[0.18em] text-secondary">Ambient Occlusion Lab</p>
          <h4 className="mt-1 text-[15px] font-semibold text-primary">先猜：radius 变大，contact cue 与 halo 会怎样？</h4>
        </div>
        <span className="rounded-control border border-accent px-2 py-1 text-[11px] text-accent">可交互</span>
      </div>
      <div className="grid gap-5 md:grid-cols-[1fr_248px] md:items-center">
        <svg viewBox="0 0 560 390" role="img" aria-label={label} className="w-full">
          <ArrowDefs />
          <rect x={12} y={18} width={536} height={354} rx={18} fill={surface} stroke={border} />
          <text x={32} y={46} fontSize={14} fontWeight={700} fill={primary}>{mode === "object" ? "object-space bake" : "screen-space pass"}</text>
          <text x={526} y={46} textAnchor="end" fontSize={12} fill={danger}>A(p) {occlusion.toFixed(2)}</text>
          <path d="M 88 276 C 116 247, 140 238, 168 242 C 202 246, 221 276, 250 279 C 284 282, 310 261, 338 264 L 338 330 L 88 330 Z" fill={surface} stroke={border} strokeWidth={3} />
          <path d="M 185 242 C 197 207, 224 195, 249 207 C 265 214, 271 239, 289 246 C 306 252, 322 241, 338 254 L 338 278 L 185 278 Z" fill={danger} fillOpacity={0.1 + contact * 0.28} stroke={danger} strokeWidth={2} />
          <circle cx={217} cy={202} r={9} fill={accent} />
          <Arrow x1={217} y1={192} x2={217} y2={140} stroke={accent} />
          {showRays && Array.from({ length: 8 }, (_, index) => {
            const angle = Math.PI * (0.1 + index * 0.11);
            const endX = rounded(217 + Math.cos(angle) * (66 + radius * 74));
            const endY = rounded(202 - Math.sin(angle) * (46 + radius * 58));
            const blocked = index === 2 || index === 3 || (mode === "screen" && index === 4);
            return <line key={"lab-ray-" + index} x1={217} y1={202} x2={endX} y2={endY} stroke={blocked ? danger : success} strokeWidth={2.5} strokeDasharray={blocked ? "5 4" : undefined} opacity={0.72} />;
          })}
          <circle cx={217} cy={202} r={rounded(48 + radius * 78)} fill="none" stroke={warning} strokeWidth={3} strokeDasharray="8 6" opacity={0.7} />
          <rect x={72} y={292} width={350} height={30} rx={10} fill={danger} fillOpacity={0.09 + contact * 0.15} stroke={danger} />
          <text x={247} y={312} textAnchor="middle" fontSize={12} fill={primary}>contact {contact.toFixed(2)} · leak {leak.toFixed(2)} · noise {noise.toFixed(2)}</text>
          <text x={72} y={354} fontSize={12} fill={secondary}>{mode === "object" ? "可见与屏幕外几何都能进入预计算" : "只比较当前屏幕可见的深度邻域"}</text>
        </svg>
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-2">
            <button type="button" aria-pressed={mode === "object"} onClick={() => setMode("object")} className={"min-h-11 rounded-control border px-2 py-2 text-xs " + (mode === "object" ? "border-warning text-primary" : "border-border text-secondary")}>object-space</button>
            <button type="button" aria-pressed={mode === "screen"} onClick={() => setMode("screen")} className={"min-h-11 rounded-control border px-2 py-2 text-xs " + (mode === "screen" ? "border-success text-primary" : "border-border text-secondary")}>screen-space</button>
          </div>
          <label className="block text-sm text-primary" htmlFor="ch17-radius">sample radius：{radius.toFixed(2)}</label>
          <input id="ch17-radius" className="min-h-11 w-full accent-accent" type="range" min="0.08" max="0.9" step="0.02" value={radius} onChange={(event) => setRadius(Number(event.target.value))} aria-label="调整环境光遮蔽采样半径" />
          <label className="block text-sm text-primary" htmlFor="ch17-bias">depth bias：{bias.toFixed(2)}</label>
          <input id="ch17-bias" className="min-h-11 w-full accent-accent" type="range" min="0" max="0.6" step="0.02" value={bias} onChange={(event) => setBias(Number(event.target.value))} aria-label="调整深度比较 bias" />
          <label className="block text-sm text-primary" htmlFor="ch17-samples">sample count：{samples}</label>
          <input id="ch17-samples" className="min-h-11 w-full accent-accent" type="range" min="4" max="16" step="1" value={samples} onChange={(event) => setSamples(Number(event.target.value))} aria-label="调整环境光遮蔽采样数量" />
          <label className="flex min-h-11 items-center gap-2 text-sm text-primary" htmlFor="ch17-rays"><input id="ch17-rays" className="h-4 w-4 accent-accent" type="checkbox" checked={showRays} onChange={(event) => setShowRays(event.target.checked)} />显示采样射线</label>
          <button type="button" aria-label="重置环境光遮蔽实验" onClick={reset} className="min-h-11 w-full rounded-control border border-border px-3 py-2 text-sm text-secondary hover:border-accent hover:text-primary">重置实验</button>
          <p className="text-xs text-secondary" role="status">观察：radius 提升接触范围也提升 halo 风险；bias 可减少 self-occlusion acne，却会增加漏光；samples 越少越容易有噪声。screen-space 还会受屏幕外遮挡物缺失影响。</p>
        </div>
      </div>
    </section>
  );
}
