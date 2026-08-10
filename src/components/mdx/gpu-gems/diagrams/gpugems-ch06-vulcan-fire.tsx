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
      markerEnd="url(#vulcan-fire-arrow)"
    />
  );
}

function ArrowDefs() {
  return (
    <defs>
      <marker
        id="vulcan-fire-arrow"
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

function Flame({
  x,
  y,
  scale = 1,
  fill = accent,
  opacity = 0.85,
}: {
  x: number;
  y: number;
  scale?: number;
  fill?: string;
  opacity?: number;
}) {
  const w = 32 * scale;
  const h = 72 * scale;
  const cx = x + w / 2;
  return (
    <path
      d={`M ${rounded(cx)} ${rounded(y + h)} C ${rounded(x - 4 * scale)} ${rounded(y + h * 0.72)} ${rounded(x + w * 0.35)} ${rounded(y + h * 0.6)} ${rounded(x + w * 0.28)} ${rounded(y + h * 0.36)} C ${rounded(x + w * 0.72)} ${rounded(y + h * 0.5)} ${rounded(x + w * 1.1)} ${rounded(y + h * 0.3)} ${rounded(cx)} ${rounded(y)} C ${rounded(x + w * 0.72)} ${rounded(y + h * 0.42)} ${rounded(x + w * 0.15)} ${rounded(y + h * 0.42)} ${rounded(cx)} ${rounded(y + h)}`}
      fill={fill}
      fillOpacity={rounded(opacity)}
      stroke={fill}
      strokeWidth="2"
    />
  );
}

export function GpuGemsCh06FireStrategyDiagram() {
  return (
    <Frame
      ariaLabel="Vulcan 火焰方案对比：完全程序化粒子省纹理内存但需要大量粒子，屏幕空间二维扰动适合蜡烛却受视角限制，视频纹理精灵适合大规模实时火焰。"
      caption="Vulcan 没有把‘最物理’当成唯一目标，而是用可控的视频纹理精灵换取规模、烟雾和实时性能。"
    >
      <ArrowDefs />
      <text x="360" y="32" textAnchor="middle" fontSize="18" fontWeight="700" fill={primary}>
        三条火焰路线：先选约束，再选算法
      </text>
      <rect x="34" y="80" width="204" height="248" rx="18" fill={accent} fillOpacity="0.07" stroke={accent} strokeWidth="2" />
      <text x="136" y="116" textAnchor="middle" fontSize="15" fontWeight="700" fill={accent}>完全程序化</text>
      <g transform="translate(116 152)">
        {Array.from({ length: 12 }, (_, index) => <circle key={index} cx={(index % 4) * 18} cy={Math.floor(index / 4) * 20} r="6" fill={accent} fillOpacity={0.35 + (index % 3) * 0.15} />)}
      </g>
      <text x="136" y="244" textAnchor="middle" fontSize="13" fill={secondary}>省纹理内存</text>
      <text x="136" y="270" textAnchor="middle" fontSize="13" fill={secondary}>数千粒子压 CPU/GPU</text>
      <text x="136" y="306" textAnchor="middle" fontSize="12" fill={danger}>适合可控小尺度</text>
      <rect x="258" y="80" width="204" height="248" rx="18" fill={warning} fillOpacity="0.07" stroke={warning} strokeWidth="2" />
      <text x="360" y="116" textAnchor="middle" fontSize="15" fontWeight="700" fill={warning}>二维扰动</text>
      <path d="M 310 230 C 334 154 386 154 410 230" fill="none" stroke={warning} strokeWidth="7" />
      <Arrow x1={360} y1={242} x2={360} y2={192} stroke={warning} />
      <text x="360" y="270" textAnchor="middle" fontSize="13" fill={secondary}>多次 render-to-texture</text>
      <text x="360" y="296" textAnchor="middle" fontSize="12" fill={danger}>视角和运动受限</text>
      <rect x="482" y="80" width="204" height="248" rx="18" fill={success} fillOpacity="0.07" stroke={success} strokeWidth="2" />
      <text x="584" y="116" textAnchor="middle" fontSize="15" fontWeight="700" fill={success}>视频纹理精灵</text>
      <Flame x={552} y={145} scale={1.25} fill={danger} />
      <Flame x={585} y={164} scale={0.85} fill={accent} />
      <text x="584" y="270" textAnchor="middle" fontSize="13" fill={secondary}>大规模 + 可控烟雾</text>
      <text x="584" y="296" textAnchor="middle" fontSize="12" fill={success}>Vulcan 的最终路线</text>
      <rect x="140" y="354" width="440" height="40" rx="12" fill={success} fillOpacity="0.1" stroke={success} />
      <text x="360" y="380" textAnchor="middle" fontSize="14" fill={primary}>目标：猛烈、可控、实时，而非单一指标最优</text>
    </Frame>
  );
}

export function GpuGemsCh06SpriteVolumeDiagram() {
  return (
    <Frame
      ariaLabel="Vulcan 动画精灵流程：角色发射器生成粒子，粒子读取三维体积纹理的 z 坐标作为动画帧，A/B 两种火焰精灵混合并通过 UV 翻转增加变化。"
      caption="把帧序列装进体积纹理，递增 z 坐标就能播放动画；A/B 混合和 UV 翻转可以延长少量素材。"
    >
      <ArrowDefs />
      <text x="360" y="32" textAnchor="middle" fontSize="18" fontWeight="700" fill={primary}>
        发射器 → 粒子 → 体积纹理帧
      </text>
      <circle cx="100" cy="202" r="40" fill={warning} fillOpacity="0.14" stroke={warning} strokeWidth="3" />
      <text x="100" y="198" textAnchor="middle" fontSize="15" fontWeight="700" fill={warning}>Vulcan</text>
      <text x="100" y="220" textAnchor="middle" fontSize="12" fill={secondary}>emitter</text>
      <Arrow x1={150} y1={202} x2={218} y2={202} stroke={warning} />
      <g>
        <Flame x={236} y={138} scale={0.75} fill={accent} />
        <Flame x={274} y={174} scale={0.62} fill={danger} />
        <Flame x={232} y={222} scale={0.5} fill={success} />
        <text x="274" y="310" textAnchor="middle" fontSize="14" fontWeight="700" fill={primary}>粒子 quad</text>
        <text x="274" y="332" textAnchor="middle" fontSize="12" fill={secondary}>size · life · flip UV</text>
      </g>
      <Arrow x1={326} y1={202} x2={388} y2={202} />
      <g>
        <rect x="406" y="94" width="248" height="218" rx="16" fill={accent} fillOpacity="0.06" stroke={accent} strokeWidth="2" />
        {[0, 1, 2, 3].map((index) => (
          <g key={index}>
            <rect x={426 + index * 52} y="142" width="40" height="78" rx="8" fill={index % 2 === 0 ? danger : warning} fillOpacity="0.22" stroke={index % 2 === 0 ? danger : warning} />
            <Flame x={431 + index * 52} y={150 + (index % 2) * 8} scale={0.55} fill={index % 2 === 0 ? accent : success} opacity={0.7} />
            <text x={446 + index * 52} y="246" textAnchor="middle" fontSize="12" fill={secondary}>z{index}</text>
          </g>
        ))}
        <text x="530" y="122" textAnchor="middle" fontSize="15" fontWeight="700" fill={accent}>256³ volume texture</text>
        <text x="530" y="282" textAnchor="middle" fontSize="13" fill={primary}>z = frame / 255</text>
      </g>
      <rect x="154" y="354" width="412" height="40" rx="12" fill={success} fillOpacity="0.1" stroke={success} />
      <text x="360" y="380" textAnchor="middle" fontSize="14" fill={primary}>64 帧 × 3 动画 → 256 个切片，换取硬件插帧</text>
    </Frame>
  );
}

export function GpuGemsCh06EmitterWeightDiagram() {
  return (
    <Frame
      ariaLabel="粒子发射器绑定曲线：粒子刚生成时发射器权重接近一，粒子变老后权重逐渐下降，位置从跟随角色转为自由上升，从而避免移动火焰拖尾断裂。"
      caption="权重只在粒子早期帮它跟住发射器；随着年龄增长，粒子再逐步交给空气运动。"
    >
      <text x="360" y="32" textAnchor="middle" fontSize="18" fontWeight="700" fill={primary}>
        用年龄权重保持火焰连续
      </text>
      <rect x="54" y="78" width="612" height="250" rx="18" fill={accent} fillOpacity="0.05" stroke={border} />
      <line x1="106" y1="274" x2="616" y2="274" stroke={border} strokeWidth="2" />
      <line x1="106" y1="120" x2="106" y2="274" stroke={border} strokeWidth="2" />
      <text x="106" y="302" textAnchor="middle" fontSize="13" fill={secondary}>出生</text>
      <text x="616" y="302" textAnchor="middle" fontSize="13" fill={secondary}>老化</text>
      <text x="78" y="126" textAnchor="middle" fontSize="13" fill={secondary}>1</text>
      <text x="78" y="278" textAnchor="middle" fontSize="13" fill={secondary}>0</text>
      <path d="M 106 132 C 230 136 294 174 376 212 C 474 256 552 270 616 274" fill="none" stroke={warning} strokeWidth="5" />
      <circle cx="106" cy="132" r="8" fill={warning} />
      <circle cx="616" cy="274" r="8" fill={success} />
      <text x="174" y="126" fontSize="14" fontWeight="700" fill={warning}>跟随 emitter</text>
      <text x="470" y="256" fontSize="14" fontWeight="700" fill={success}>自由运动</text>
      <Arrow x1={180} y1={208} x2={180} y2={158} stroke={warning} />
      <Arrow x1={520} y1={236} x2={520} y2={186} stroke={success} />
      <text x="180" y="236" textAnchor="middle" fontSize="12" fill={secondary}>角色移动时补齐拖尾</text>
      <text x="520" y="264" textAnchor="middle" fontSize="12" fill={secondary}>避免所有粒子黏成一团</text>
      <rect x="210" y="350" width="300" height="40" rx="12" fill={success} fillOpacity="0.1" stroke={success} />
      <text x="360" y="376" textAnchor="middle" fontSize="14" fill={primary}>p = w(age) · emitter + (1 − w) · free</text>
    </Frame>
  );
}

export function GpuGemsCh06FireLab() {
  const [frame, setFrame] = useState(0.35);
  const [spriteMix, setSpriteMix] = useState(0.45);
  const [emitterBind, setEmitterBind] = useState(0.65);
  const [renderScale, setRenderScale] = useState(0.5);
  const [blendMode, setBlendMode] = useState<"alpha" | "additive">("alpha");

  const particleData = Array.from({ length: 5 }, (_, index) => {
    const baseX = 116 + index * 58;
    const sway = rounded(Math.sin((frame * 5 + index * 0.8) * Math.PI) * 16);
    const ageLift = rounded(frame * (20 + index * 5));
    const bindLift = rounded(emitterBind * (18 + index * 2));
    const y = rounded(216 - index * 13 - ageLift + bindLift * 0.18);
    const scale = rounded(0.55 + spriteMix * 0.36 + (index % 2) * 0.08);
    const opacity = rounded(0.42 + spriteMix * 0.32 - index * 0.035);
    return { x: rounded(baseX + sway), y, scale, opacity };
  });
  const reset = () => {
    setFrame(0.35);
    setSpriteMix(0.45);
    setEmitterBind(0.65);
    setRenderScale(0.5);
    setBlendMode("alpha");
  };

  return (
    <section
      data-visual-kind="gpu-gems-ch06-vulcan-fire"
      className="not-prose my-6 rounded-card border border-border bg-elevated p-5"
      aria-label="Vulcan 火焰实验：调整动画帧、A/B 精灵混合、发射器绑定和分层分辨率，观察 alpha 与 additive 混合的取舍"
    >
      <div className="mb-4 flex flex-wrap items-baseline justify-between gap-3">
        <div>
          <p className="text-[11px] uppercase tracking-[0.18em] text-secondary">Vulcan Fire Lab</p>
          <h4 className="mt-1 text-[15px] font-semibold text-primary">先猜：火焰要更“真”，应该先加粒子还是先改混合？</h4>
        </div>
        <span className="rounded-control border border-accent px-2 py-1 text-[11px] text-accent">可交互</span>
      </div>
      <div className="grid gap-5 md:grid-cols-[1fr_230px] md:items-center">
        <svg
          viewBox="0 0 510 330"
          role="img"
          aria-label={`动画帧${frame.toFixed(2)}，A/B 精灵混合${spriteMix.toFixed(2)}，发射器绑定${emitterBind.toFixed(2)}，分层分辨率${renderScale.toFixed(2)}，${blendMode === "alpha" ? "alpha" : "additive"} 混合。`}
          className="w-full"
        >
          <rect x="12" y="18" width="486" height="294" rx="18" fill="var(--surface)" stroke={border} />
          <text x="28" y="44" fontSize="14" fontWeight="700" fill={primary}>粒子火焰预览</text>
          <text x="374" y="44" textAnchor="middle" fontSize="13" fill={blendMode === "alpha" ? success : danger}>{blendMode === "alpha" ? "alpha：可控颜色" : "additive：容易饱和"}</text>
          <line x1="54" y1="246" x2="438" y2="246" stroke={border} strokeWidth="3" />
          <circle cx="246" cy="246" r="14" fill={warning} fillOpacity="0.2" stroke={warning} strokeWidth="3" />
          <text x="246" y="278" textAnchor="middle" fontSize="13" fill={secondary}>emitter</text>
          {particleData.map((particle, index) => (
            <g key={index}>
              <Flame x={particle.x} y={particle.y} scale={particle.scale} fill={index % 2 === 0 ? accent : danger} opacity={particle.opacity} />
              <text x={rounded(particle.x + 16 * particle.scale)} y={rounded(particle.y + 92 * particle.scale)} textAnchor="middle" fontSize="12" fill={secondary}>A{index % 2 === 0 ? "" : "/B"}</text>
            </g>
          ))}
          <rect x="326" y="232" width={rounded(94 * renderScale)} height="18" rx="5" fill={success} fillOpacity="0.2" stroke={success} />
          <text x="374" y="222" textAnchor="middle" fontSize="12" fill={success}>render target</text>
          <text x="374" y="245" textAnchor="middle" fontSize="11" fill={primary}>{Math.round(renderScale * 100)}%</text>
          <text x="28" y="304" fontSize="12" fill={secondary}>帧索引影响高度与形状；绑定影响拖尾连续性</text>
        </svg>
        <div className="space-y-3">
          <label className="block text-sm text-primary" htmlFor="vulcan-frame">动画帧：{frame.toFixed(2)}</label>
          <input id="vulcan-frame" className="min-h-11 w-full accent-accent" type="range" min="0" max="1" step="0.05" value={frame} onChange={(event) => setFrame(Number(event.target.value))} aria-label="调整火焰动画帧" />
          <label className="block text-sm text-primary" htmlFor="vulcan-mix">A/B 精灵混合：{spriteMix.toFixed(2)}</label>
          <input id="vulcan-mix" className="min-h-11 w-full accent-accent" type="range" min="0" max="1" step="0.05" value={spriteMix} onChange={(event) => setSpriteMix(Number(event.target.value))} aria-label="调整 A/B 火焰精灵混合" />
          <label className="block text-sm text-primary" htmlFor="vulcan-bind">发射器绑定：{emitterBind.toFixed(2)}</label>
          <input id="vulcan-bind" className="min-h-11 w-full accent-accent" type="range" min="0" max="1" step="0.05" value={emitterBind} onChange={(event) => setEmitterBind(Number(event.target.value))} aria-label="调整发射器绑定权重" />
          <label className="block text-sm text-primary" htmlFor="vulcan-scale">分层分辨率：{Math.round(renderScale * 100)}%</label>
          <input id="vulcan-scale" className="min-h-11 w-full accent-accent" type="range" min="0.25" max="1" step="0.25" value={renderScale} onChange={(event) => setRenderScale(Number(event.target.value))} aria-label="调整火焰分层分辨率" />
          <div className="grid grid-cols-2 gap-2">
            <button type="button" aria-pressed={blendMode === "alpha"} onClick={() => setBlendMode("alpha")} className={`min-h-11 rounded-control border px-3 py-2 text-sm ${blendMode === "alpha" ? "border-success text-primary" : "border-border text-secondary"}`}>alpha</button>
            <button type="button" aria-pressed={blendMode === "additive"} onClick={() => setBlendMode("additive")} className={`min-h-11 rounded-control border px-3 py-2 text-sm ${blendMode === "additive" ? "border-danger text-primary" : "border-border text-secondary"}`}>additive</button>
          </div>
          <button type="button" aria-label="重置 Vulcan 火焰实验" onClick={reset} className="min-h-11 w-full rounded-control border border-border px-3 py-2 text-sm text-secondary hover:border-accent hover:text-primary">重置实验</button>
          <p className="text-xs text-secondary" role="status">观察：alpha 需要排序却保留颜色控制；降低分层分辨率可以换取像素预算。</p>
        </div>
      </div>
    </section>
  );
}
