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
      <marker id="ch21-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 z" fill={accent} />
      </marker>
      <radialGradient id="ch21-glow-gradient">
        <stop offset="0" stopColor={warning} stopOpacity="0.72" />
        <stop offset="0.42" stopColor={accent} stopOpacity="0.3" />
        <stop offset="1" stopColor={danger} stopOpacity="0" />
      </radialGradient>
      <linearGradient id="ch21-mask-gradient" x1="0" x2="1">
        <stop offset="0" stopColor={surface} />
        <stop offset="0.62" stopColor={accent} stopOpacity="0.28" />
        <stop offset="1" stopColor={warning} stopOpacity="0.5" />
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
  return <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={stroke} strokeWidth={3} markerEnd="url(#ch21-arrow)" />;
}

export function GpuGemsCh21GlowPipelineDiagram() {
  const stages = [
    { x: 20, title: "scene", detail: "normal render", color: accent },
    { x: 172, title: "source", detail: "RGB × alpha", color: warning },
    { x: 324, title: "downsample", detail: "low-res RT", color: success },
    { x: 476, title: "blur", detail: "H then V", color: danger },
    { x: 628, title: "blend", detail: "additive", color: accent },
  ];
  return (
    <Frame ariaLabel="Real-time glow 的后处理流程：正常渲染场景，同时渲染 glow source mask；将 source 复制或降采样到 render target，执行水平和垂直 separable blur，最后用 additive alpha blend 加回场景。" caption="glow 是额外的屏幕空间图像处理通道：source 负责定义亮度，两个一维 blur 负责扩散，最后的 additive blend 负责合成。">
      <ArrowDefs />
      <text x={360} y={34} textAnchor="middle" fontSize={18} fontWeight={700} fill={primary}>real-time glow：source → separable blur → additive blend</text>
      {stages.map((stage, index) => (
        <g key={stage.title}>
          <rect x={stage.x} y={106} width={124} height={166} rx={16} fill={stage.color} fillOpacity={0.08} stroke={stage.color} strokeWidth={2} />
          <text x={stage.x + 62} y={138} textAnchor="middle" fontSize={14} fontWeight={700} fill={stage.color}>{stage.title}</text>
          {index === 0 && <><rect x={stage.x + 28} y={164} width={68} height={54} fill="url(#ch21-mask-gradient)" stroke={accent} strokeWidth={2} /><circle cx={stage.x + 62} cy={191} r={10} fill={warning} /></>}
          {index === 1 && <><rect x={stage.x + 28} y={164} width={68} height={54} fill={surface} stroke={warning} strokeWidth={2} /><circle cx={stage.x + 62} cy={190} r={18} fill={warning} fillOpacity={0.4} /><circle cx={stage.x + 62} cy={190} r={7} fill={accent} /></>}
          {index === 2 && <><rect x={stage.x + 28} y={164} width={68} height={54} fill={surface} stroke={success} strokeWidth={2} /><path d={`M ${stage.x + 34} 208 L ${stage.x + 54} 182 L ${stage.x + 72} 200 L ${stage.x + 90} 174`} fill="none" stroke={success} strokeWidth={3} /></>}
          {index === 3 && <><ellipse cx={stage.x + 62} cy={190} rx={36} ry={23} fill="url(#ch21-glow-gradient)" /><line x1={stage.x + 32} y1={190} x2={stage.x + 92} y2={190} stroke={danger} strokeWidth={3} /><line x1={stage.x + 62} y1={164} x2={stage.x + 62} y2={216} stroke={danger} strokeWidth={3} /></>}
          {index === 4 && <><rect x={stage.x + 28} y={164} width={68} height={54} fill={surface} stroke={accent} strokeWidth={2} /><circle cx={stage.x + 62} cy={190} r={24} fill="url(#ch21-glow-gradient)" /><circle cx={stage.x + 62} cy={190} r={7} fill={warning} /></>}
          <text x={stage.x + 62} y={250} textAnchor="middle" fontSize={12} fill={secondary}>{stage.detail}</text>
          {index < stages.length - 1 && <Arrow x1={stage.x + 130} y1={198} x2={stage.x + 146} y2={198} stroke={stage.color} />}
        </g>
      ))}
      <rect x={118} y={318} width={484} height={42} rx={12} fill={accent} fillOpacity={0.08} stroke={accent} />
      <text x={360} y={344} textAnchor="middle" fontSize={13} fill={primary}>glow source 可由对象、材质 alpha 或 artist mask 控制</text>
    </Frame>
  );
}

export function GpuGemsCh21SourceMaskDiagram() {
  return (
    <Frame ariaLabel="glow source mask 示意：正常场景使用纹理 RGB，glow pass 使用 RGB 乘纹理 alpha，只保留发光部分；alpha 为零处没有 glow，alpha 增大处 glow 强度增加。" caption="把 glow mask 放进 diffuse texture 的 alpha 通道可以复用资产管线；RGB 保留颜色，alpha 同时成为是否发光与发光强度。">
      <ArrowDefs />
      <text x={360} y={34} textAnchor="middle" fontSize={18} fontWeight={700} fill={primary}>source mask：RGB 保持材质，alpha 选择发光区域</text>
      <rect x={38} y={92} width={194} height={204} rx={16} fill={accent} fillOpacity={0.07} stroke={accent} strokeWidth={2} />
      <text x={135} y={126} textAnchor="middle" fontSize={15} fontWeight={700} fill={accent}>diffuse RGB</text>
      <rect x={70} y={152} width={130} height={82} fill="url(#ch21-mask-gradient)" stroke={accent} strokeWidth={2} />
      <path d="M 82 220 C 104 188, 122 196, 140 164 C 158 142, 176 188, 190 164 L 190 228 L 82 228 Z" fill={accent} fillOpacity={0.28} />
      <text x={135} y={270} textAnchor="middle" fontSize={12} fill={secondary}>normal render uses color</text>
      <Arrow x1={256} y1={192} x2={310} y2={192} stroke={accent} />
      <rect x={330} y={92} width={194} height={204} rx={16} fill={warning} fillOpacity={0.07} stroke={warning} strokeWidth={2} />
      <text x={427} y={126} textAnchor="middle" fontSize={15} fontWeight={700} fill={warning}>alpha mask</text>
      <rect x={362} y={152} width={130} height={82} fill={surface} stroke={warning} strokeWidth={2} />
      <path d="M 374 222 C 396 194, 414 202, 432 170 C 450 148, 468 194, 482 170 L 482 230 L 374 230 Z" fill={warning} fillOpacity={0.2} />
      <text x={427} y={270} textAnchor="middle" fontSize={12} fill={secondary}>zero → black, one → full source</text>
      <Arrow x1={548} y1={192} x2={602} y2={192} stroke={warning} />
      <rect x={616} y={108} width={80} height={168} rx={14} fill={danger} fillOpacity={0.07} stroke={danger} strokeWidth={2} />
      <circle cx={656} cy={184} r={28} fill="url(#ch21-glow-gradient)" /><circle cx={656} cy={184} r={7} fill={warning} />
      <text x={656} y={236} textAnchor="middle" fontSize={12} fill={danger}>glow RT</text>
      <rect x={122} y={342} width={478} height={30} rx={10} fill={success} fillOpacity={0.1} stroke={success} />
      <text x={360} y={362} textAnchor="middle" fontSize={12} fill={primary}>source RGB × alpha × object intensity → off-screen render target</text>
    </Frame>
  );
}

export function GpuGemsCh21SeparableConvolutionDiagram() {
  const bars = [
    { label: "direct 2D", width: 428, detail: "d² reads", color: danger },
    { label: "horizontal", width: 182, detail: "d reads", color: warning },
    { label: "vertical", width: 182, detail: "d reads", color: success },
  ];
  return (
    <Frame ariaLabel="可分离卷积的成本对比：直径 d 的二维 blur 需要约 d 的平方次读取，先水平再垂直的两个一维 blur 只需要约 2d 次读取；两条一维 profile 可以近似多种二维形状。" caption="50×50 的直接二维 blur 需要约 2500 个 texel reads，而可分离版本只需约 100 个；代价是需要一个中间 render target。">
      <ArrowDefs />
      <text x={360} y={34} textAnchor="middle" fontSize={18} fontWeight={700} fill={primary}>separable convolution：把 d² 降到 2d</text>
      <line x1={96} y1={300} x2={642} y2={300} stroke={border} strokeWidth={2} />
      <text x={96} y={326} fontSize={12} fill={secondary}>少</text>
      <text x={612} y={326} fontSize={12} fill={secondary}>多</text>
      {bars.map((bar, index) => {
        const y = 92 + index * 64;
        return <g key={bar.label}><text x={96} y={y + 23} fontSize={13} fontWeight={700} fill={primary}>{bar.label}</text><rect x={232} y={y} width={420} height={32} rx={10} fill={surface} stroke={border} /><rect x={232} y={y} width={bar.width} height={32} rx={10} fill={bar.color} fillOpacity={0.3} stroke={bar.color} /><text x={642} y={y + 21} textAnchor="end" fontSize={12} fill={secondary}>{bar.detail}</text></g>;
      })}
      <rect x={126} y={352} width={468} height={28} rx={10} fill={accent} fillOpacity={0.08} stroke={accent} />
      <text x={360} y={371} textAnchor="middle" fontSize={12} fill={primary}>source → horizontal RT → vertical RT → additive blend</text>
    </Frame>
  );
}

export function GpuGemsCh21TemporalGlowDiagram() {
  return (
    <Frame ariaLabel="时间 glow 的 after-image：当前帧 source 与 dimmed previous source 相加，再进行 blur；前一帧亮度衰减控制拖尾长度，过亮的递归反馈会导致 glow 失控变白。" caption="把上一帧 source 以衰减系数加入当前 source，可以让物体淡出而不是瞬间消失；反馈过强会把 glow 递归扩散到全屏。">
      <ArrowDefs />
      <text x={360} y={34} textAnchor="middle" fontSize={18} fontWeight={700} fill={primary}>temporal glow：受控 after-image，而非无限反馈</text>
      <rect x={42} y={112} width={160} height={152} rx={16} fill={accent} fillOpacity={0.07} stroke={accent} strokeWidth={2} />
      <text x={122} y={144} textAnchor="middle" fontSize={15} fontWeight={700} fill={accent}>current source</text>
      <circle cx={122} cy={204} r={25} fill="url(#ch21-glow-gradient)" /><circle cx={122} cy={204} r={7} fill={warning} />
      <Arrow x1={232} y1={184} x2={282} y2={184} stroke={accent} />
      <rect x={302} y={112} width={160} height={152} rx={16} fill={warning} fillOpacity={0.07} stroke={warning} strokeWidth={2} />
      <text x={382} y={144} textAnchor="middle" fontSize={15} fontWeight={700} fill={warning}>dim previous</text>
      <circle cx={365} cy={204} r={27} fill="url(#ch21-glow-gradient)" opacity={0.44} /><circle cx={406} cy={204} r={18} fill="url(#ch21-glow-gradient)" opacity={0.28} />
      <text x={382} y={246} textAnchor="middle" fontSize={12} fill={secondary}>previous × decay</text>
      <Arrow x1={492} y1={184} x2={542} y2={184} stroke={warning} />
      <rect x={562} y={112} width={118} height={152} rx={16} fill={danger} fillOpacity={0.07} stroke={danger} strokeWidth={2} />
      <text x={621} y={144} textAnchor="middle" fontSize={15} fontWeight={700} fill={danger}>blur</text>
      <circle cx={621} cy={204} r={48} fill="url(#ch21-glow-gradient)" /><circle cx={621} cy={204} r={8} fill={warning} />
      <rect x={112} y={322} width={496} height={42} rx={12} fill={danger} fillOpacity={0.1} stroke={danger} />
      <text x={360} y={348} textAnchor="middle" fontSize={13} fill={primary}>decay 小 → 长拖尾；decay 大 → 短 after-image；反馈过强 → 全屏变白</text>
    </Frame>
  );
}

export function GpuGemsCh21GlowLab() {
  const [brightness, setBrightness] = useState(0.72);
  const [blurRadius, setBlurRadius] = useState(0.48);
  const [resolution, setResolution] = useState(0.48);
  const [decay, setDecay] = useState(0.26);
  const [fog, setFog] = useState(0.18);
  const [showSource, setShowSource] = useState(false);

  const reset = () => {
    setBrightness(0.72);
    setBlurRadius(0.48);
    setResolution(0.48);
    setDecay(0.26);
    setFog(0.18);
    setShowSource(false);
  };
  const halo = rounded(Math.min(1, blurRadius * 0.92 + brightness * 0.18));
  const shimmer = rounded(Math.max(0.03, (1 - resolution) * 0.66 - fog * 0.18));
  const trail = rounded(decay * 0.86 + blurRadius * 0.1);
  const cost = rounded(0.24 + blurRadius * 0.34 + resolution * 0.3);
  const label = "实时 glow 实验：brightness " + brightness.toFixed(2) + "，blur radius " + blurRadius.toFixed(2) + "，source resolution " + resolution.toFixed(2) + "，decay " + decay.toFixed(2) + "，fog " + fog.toFixed(2) + "，halo " + halo.toFixed(2) + "，shimmer " + shimmer.toFixed(2) + "，cost " + cost.toFixed(2) + "。";
  const coreRadius = rounded(9 + brightness * 8);
  const outerRadius = rounded(28 + halo * 74);

  return (
    <section data-visual-kind="gpu-gems-ch21-real-time-glow" className="not-prose my-6 rounded-card border border-border bg-elevated p-5" aria-label="实时 glow 交互实验：调整 source brightness、blur radius、source resolution、after-image decay 和 fog，观察 halo、闪烁和成本">
      <div className="mb-4 flex flex-wrap items-baseline justify-between gap-3">
        <div>
          <p className="text-[11px] uppercase tracking-[0.18em] text-secondary">Real-Time Glow Lab</p>
          <h4 className="mt-1 text-[15px] font-semibold text-primary">先猜：降低 source resolution，为什么可能更闪？</h4>
        </div>
        <span className="rounded-control border border-accent px-2 py-1 text-[11px] text-accent">可交互</span>
      </div>
      <div className="grid gap-5 md:grid-cols-[1fr_248px] md:items-center">
        <svg viewBox="0 0 560 390" role="img" aria-label={label} className="w-full">
          <ArrowDefs />
          <rect x={12} y={18} width={536} height={354} rx={18} fill={surface} stroke={border} />
          <text x={32} y={46} fontSize={14} fontWeight={700} fill={primary}>screen glow preview</text>
          <text x={526} y={46} textAnchor="end" fontSize={12} fill={danger}>cost {cost.toFixed(2)}</text>
          <rect x={58} y={78} width={444} height={218} rx={12} fill={fog > 0.55 ? surface : "url(#ch21-mask-gradient)"} stroke={border} strokeWidth={2} />
          {Array.from({ length: 6 }, (_, index) => <line key={"lab-grid-x-" + index} x1={58 + index * 88} y1={78} x2={58 + index * 88} y2={296} stroke={border} strokeWidth={1} opacity={0.3 + shimmer * 0.5} />)}
          {Array.from({ length: 4 }, (_, index) => <line key={"lab-grid-y-" + index} x1={58} y1={78 + index * 72} x2={502} y2={78 + index * 72} stroke={border} strokeWidth={1} opacity={0.3 + shimmer * 0.5} />)}
          {decay > 0.18 && <ellipse cx={310} cy={192} rx={rounded(outerRadius * 1.34)} ry={rounded(outerRadius * 0.58)} fill="url(#ch21-glow-gradient)" opacity={trail * 0.38} />}
          <circle cx={310} cy={192} r={outerRadius} fill="url(#ch21-glow-gradient)" opacity={0.48 + brightness * 0.18} />
          <circle cx={310} cy={192} r={coreRadius} fill={warning} fillOpacity={0.7 + brightness * 0.28} stroke={warning} strokeWidth={2} />
          {showSource && <rect x={300} y={182} width={20} height={20} fill="none" stroke={success} strokeWidth={2} />}
          <text x={74} y={330} fontSize={12} fill={secondary}>halo {halo.toFixed(2)} · shimmer {shimmer.toFixed(2)} · trail {trail.toFixed(2)}</text>
          <text x={74} y={354} fontSize={12} fill={secondary}>{fog > 0.45 ? "source fog suppresses distant aliasing" : "low-res source spreads aliasing into the blur"}</text>
        </svg>
        <div className="space-y-3">
          <label className="block text-sm text-primary" htmlFor="ch21-brightness">source brightness：{brightness.toFixed(2)}</label>
          <input id="ch21-brightness" className="min-h-11 w-full accent-accent" type="range" min="0.1" max="1" step="0.02" value={brightness} onChange={(event) => setBrightness(Number(event.target.value))} aria-label="调整 glow source brightness" />
          <label className="block text-sm text-primary" htmlFor="ch21-radius">blur radius：{blurRadius.toFixed(2)}</label>
          <input id="ch21-radius" className="min-h-11 w-full accent-accent" type="range" min="0.08" max="0.9" step="0.02" value={blurRadius} onChange={(event) => setBlurRadius(Number(event.target.value))} aria-label="调整 glow blur radius" />
          <label className="block text-sm text-primary" htmlFor="ch21-resolution">source resolution：{resolution.toFixed(2)}</label>
          <input id="ch21-resolution" className="min-h-11 w-full accent-accent" type="range" min="0.2" max="1" step="0.02" value={resolution} onChange={(event) => setResolution(Number(event.target.value))} aria-label="调整 glow source resolution" />
          <label className="block text-sm text-primary" htmlFor="ch21-decay">after-image decay：{decay.toFixed(2)}</label>
          <input id="ch21-decay" className="min-h-11 w-full accent-accent" type="range" min="0" max="0.8" step="0.02" value={decay} onChange={(event) => setDecay(Number(event.target.value))} aria-label="调整 after-image decay" />
          <label className="block text-sm text-primary" htmlFor="ch21-fog">source fog：{fog.toFixed(2)}</label>
          <input id="ch21-fog" className="min-h-11 w-full accent-accent" type="range" min="0" max="0.8" step="0.02" value={fog} onChange={(event) => setFog(Number(event.target.value))} aria-label="调整 glow source fog" />
          <label className="flex min-h-11 items-center gap-2 text-sm text-primary" htmlFor="ch21-source"><input id="ch21-source" className="h-4 w-4 accent-accent" type="checkbox" checked={showSource} onChange={(event) => setShowSource(event.target.checked)} />显示 source texel</label>
          <button type="button" aria-label="重置实时 glow 实验" onClick={reset} className="min-h-11 w-full rounded-control border border-border px-3 py-2 text-sm text-secondary hover:border-accent hover:text-primary">重置实验</button>
          <p className="text-xs text-secondary" role="status">观察：blur radius 增大能形成宽 halo 但增加成本；source resolution 过低会让单个 texel 被放大并闪烁；decay 控制拖尾，fog 可抑制远景 aliasing。</p>
        </div>
      </div>
    </section>
  );
}
