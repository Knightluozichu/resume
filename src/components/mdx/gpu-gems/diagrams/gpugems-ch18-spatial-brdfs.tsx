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
      <marker id="ch18-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 z" fill={accent} />
      </marker>
      <linearGradient id="ch18-lobe-gradient" x1="0" x2="1" y1="0" y2="1">
        <stop offset="0" stopColor={success} stopOpacity="0.18" />
        <stop offset="0.54" stopColor={accent} stopOpacity="0.2" />
        <stop offset="1" stopColor={danger} stopOpacity="0.34" />
      </linearGradient>
      <linearGradient id="ch18-pack-gradient" x1="0" x2="1">
        <stop offset="0" stopColor={warning} stopOpacity="0.18" />
        <stop offset="1" stopColor={accent} stopOpacity="0.26" />
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
  return <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={stroke} strokeWidth={3} markerEnd="url(#ch18-arrow)" />;
}

export function GpuGemsCh18SbrdfPipelineDiagram() {
  const stages = [
    { x: 28, title: "surface point", detail: "p + uv", color: accent },
    { x: 196, title: "texture maps", detail: "diffuse + lobes", color: warning },
    { x: 364, title: "local frame", detail: "T, B, N", color: success },
    { x: 532, title: "render", detail: "lights / env", color: danger },
  ];

  return (
    <Frame ariaLabel="空间双向反射分布函数的渲染流程：表面点的 UV 读取 diffuse 与多个 BRDF lobe 参数，在局部切线、双切线和法线坐标中计算，再选择离散光或环境光路径。" caption="SBRDF 将二维空间变化与入射、出射角度变化组合起来；每个 texel 不再只有颜色，还拥有自己的反射模型参数。">
      <ArrowDefs />
      <text x={360} y={34} textAnchor="middle" fontSize={18} fontWeight={700} fill={primary}>SBRDF：空间变化 × 角度变化</text>
      {stages.map((stage, index) => (
        <g key={stage.title}>
          <rect x={stage.x} y={106} width={138} height={166} rx={16} fill={stage.color} fillOpacity={0.08} stroke={stage.color} strokeWidth={2} />
          <text x={stage.x + 69} y={138} textAnchor="middle" fontSize={14} fontWeight={700} fill={stage.color}>{stage.title}</text>
          {index === 0 && <><circle cx={stage.x + 69} cy={198} r={42} fill="url(#ch18-lobe-gradient)" stroke={border} strokeWidth={3} /><circle cx={stage.x + 69} cy={198} r={7} fill={accent} /><path d={`M ${stage.x + 69} 190 L ${stage.x + 69} 150`} stroke={accent} strokeWidth={3} markerEnd="url(#ch18-arrow)" /></>}
          {index === 1 && <><rect x={stage.x + 34} y={163} width={70} height={70} rx={8} fill="url(#ch18-pack-gradient)" stroke={warning} strokeWidth={2} /><path d={`M ${stage.x + 34} 180 L ${stage.x + 104} 180 M ${stage.x + 34} 198 L ${stage.x + 104} 198 M ${stage.x + 34} 216 L ${stage.x + 104} 216`} stroke={warning} strokeWidth={2} /><circle cx={stage.x + 51} cy={180} r={4} fill={success} /><circle cx={stage.x + 69} cy={198} r={4} fill={danger} /><circle cx={stage.x + 87} cy={216} r={4} fill={accent} /></>}
          {index === 2 && <><circle cx={stage.x + 69} cy={198} r={34} fill={success} fillOpacity={0.12} stroke={success} strokeWidth={2} /><Arrow x1={stage.x + 69} y1={198} x2={stage.x + 108} y2={198} stroke={accent} /><Arrow x1={stage.x + 69} y1={198} x2={stage.x + 69} y2={153} stroke={success} /><text x={stage.x + 69} y={218} textAnchor="middle" fontSize={16} fontWeight={700} fill={primary}>T B N</text></>}
          {index === 3 && <><path d={`M ${stage.x + 42} 224 C ${stage.x + 54} 176, ${stage.x + 76} 224, ${stage.x + 96} 178`} fill="none" stroke={danger} strokeWidth={4} /><circle cx={stage.x + 96} cy={178} r={7} fill={danger} /><path d={`M ${stage.x + 48} 232 C ${stage.x + 64} 212, ${stage.x + 76} 212, ${stage.x + 94} 232`} fill="none" stroke={success} strokeWidth={3} /></>}
          <text x={stage.x + 69} y={250} textAnchor="middle" fontSize={12} fill={secondary}>{stage.detail}</text>
          {index < stages.length - 1 && <Arrow x1={stage.x + 144} y1={198} x2={stage.x + 160} y2={198} stroke={stage.color} />}
        </g>
      ))}
      <rect x={94} y={318} width={532} height={42} rx={12} fill={accent} fillOpacity={0.08} stroke={accent} />
      <text x={360} y={344} textAnchor="middle" fontSize={13} fill={primary}>每个 texel 都可以有不同的 BRDF，而不是只换一张颜色贴图</text>
    </Frame>
  );
}

export function GpuGemsCh18LafortuneLobesDiagram() {
  const lobes = [
    { cx: 206, cy: 174, rx: 48, ry: 30, color: accent, label: "lobe 1" },
    { cx: 290, cy: 196, rx: 40, ry: 25, color: warning, label: "lobe 2" },
    { cx: 358, cy: 162, rx: 31, ry: 20, color: danger, label: "lobe 3" },
  ];

  return (
    <Frame ariaLabel="Lafortune 空间 BRDF 表示：一个 diffuse 基底上叠加多个可调方向和形状的 specular lobe；Cx、Cy、Cz 控制 lobe 峰值与各向异性，n 控制锐度。" caption="少量 lobe 的关键不是复制每个测量样本，而是用 C 向量把峰值推向合适方向，用 n 控制宽窄，再让每个 texel 保存自己的参数。">
      <ArrowDefs />
      <text x={360} y={34} textAnchor="middle" fontSize={18} fontWeight={700} fill={primary}>Lafortune representation：diffuse + specular lobes</text>
      <line x1={94} y1={276} x2={466} y2={276} stroke={border} strokeWidth={3} />
      <path d="M 108 276 C 146 226, 190 224, 232 276 C 272 226, 314 228, 358 276 C 394 238, 428 244, 462 276" fill={surface} stroke={border} strokeWidth={2} />
      {lobes.map((lobe) => (
        <g key={lobe.label}>
          <ellipse cx={lobe.cx} cy={lobe.cy} rx={lobe.rx} ry={lobe.ry} fill={lobe.color} fillOpacity={0.2} stroke={lobe.color} strokeWidth={2} />
          <circle cx={lobe.cx} cy={lobe.cy} r={7} fill={lobe.color} />
          <text x={lobe.cx} y={lobe.cy - lobe.ry - 10} textAnchor="middle" fontSize={12} fill={lobe.color}>{lobe.label}</text>
        </g>
      ))}
      <circle cx={276} cy={276} r={8} fill={success} />
      <Arrow x1={276} y1={266} x2={276} y2={112} stroke={success} />
      <text x={288} y={120} fontSize={13} fill={success}>N / z axis</text>
      <Arrow x1={276} y1={276} x2={426} y2={188} stroke={accent} />
      <text x={434} y={184} fontSize={13} fill={accent}>C · wi → peak</text>
      <rect x={500} y={112} width={172} height={174} rx={14} fill={accent} fillOpacity={0.07} stroke={accent} strokeWidth={2} />
      <text x={586} y={144} textAnchor="middle" fontSize={15} fontWeight={700} fill={accent}>per lobe</text>
      <text x={586} y={180} textAnchor="middle" fontSize={14} fill={primary}>albedo s</text>
      <text x={586} y={208} textAnchor="middle" fontSize={14} fill={primary}>shape Cx, Cy, Cz</text>
      <text x={586} y={236} textAnchor="middle" fontSize={14} fill={primary}>sharpness n</text>
      <text x={586} y={268} textAnchor="middle" fontSize={12} fill={secondary}>one, two, or three lobes</text>
      <rect x={134} y={338} width={452} height={30} rx={10} fill={warning} fillOpacity={0.1} stroke={warning} />
      <text x={360} y={358} textAnchor="middle" fontSize={12} fill={primary}>C 的符号可表达 isotropic、off-specular、retro 或 thread-like 行为</text>
    </Frame>
  );
}

export function GpuGemsCh18TexturePackingDiagram() {
  return (
    <Frame ariaLabel="空间 BRDF 的纹理打包：diffuse albedo 独立存储，每个 specular lobe 用 albedo 纹理和 shape 参数纹理存储，Cx、Cy、Cz 从八位纹理的 scale-bias 范围解码。" caption="将 diffuse、lobe albedo 和 shape 参数拆成可控的纹理通道；参数纹理的解码与采样策略决定了高光能否稳定。">
      <ArrowDefs />
      <text x={360} y={34} textAnchor="middle" fontSize={18} fontWeight={700} fill={primary}>texture packing：把每个 texel 的 BRDF 参数带进 shader</text>
      <rect x={38} y={94} width={168} height={194} rx={16} fill={accent} fillOpacity={0.07} stroke={accent} strokeWidth={2} />
      <text x={122} y={126} textAnchor="middle" fontSize={15} fontWeight={700} fill={accent}>tex_dif</text>
      <rect x={72} y={150} width={100} height={76} fill={surface} stroke={accent} strokeWidth={2} />
      <path d="M 76 214 C 96 190, 110 198, 128 172 C 143 151, 155 192, 168 165 L 168 222 L 76 222 Z" fill={accent} fillOpacity={0.3} />
      <text x={122} y={258} textAnchor="middle" fontSize={12} fill={secondary}>diffuse albedo</text>
      <Arrow x1={222} y1={190} x2={274} y2={190} stroke={accent} />
      <rect x={292} y={82} width={184} height={218} rx={16} fill={warning} fillOpacity={0.07} stroke={warning} strokeWidth={2} />
      <text x={384} y={114} textAnchor="middle" fontSize={15} fontWeight={700} fill={warning}>lobe maps</text>
      <rect x={322} y={136} width={124} height={42} rx={8} fill="url(#ch18-pack-gradient)" stroke={warning} />
      <text x={384} y={162} textAnchor="middle" fontSize={13} fill={primary}>s_j albedo</text>
      <rect x={322} y={192} width={124} height={64} rx={8} fill={surface} stroke={warning} />
      <text x={384} y={216} textAnchor="middle" fontSize={12} fill={primary}>Cx, Cy, Cz, n</text>
      <text x={384} y={240} textAnchor="middle" fontSize={12} fill={secondary}>scale 96 · bias 128</text>
      <Arrow x1={492} y1={190} x2={544} y2={190} stroke={warning} />
      <rect x={562} y={94} width={120} height={194} rx={16} fill={success} fillOpacity={0.07} stroke={success} strokeWidth={2} />
      <text x={622} y={126} textAnchor="middle" fontSize={15} fontWeight={700} fill={success}>local</text>
      <text x={622} y={158} textAnchor="middle" fontSize={13} fill={primary}>T, B, N</text>
      <text x={622} y={188} textAnchor="middle" fontSize={13} fill={primary}>wi, wr</text>
      <text x={622} y={218} textAnchor="middle" fontSize={13} fill={primary}>lobe eval</text>
      <text x={622} y={252} textAnchor="middle" fontSize={12} fill={secondary}>point sample</text>
      <rect x={132} y={338} width={456} height={30} rx={10} fill={danger} fillOpacity={0.1} stroke={danger} />
      <text x={360} y={358} textAnchor="middle" fontSize={12} fill={primary}>非线性 shape 参数直接线性插值可能产生 sparkle，优先验证采样方式</text>
    </Frame>
  );
}

export function GpuGemsCh18EnvironmentConvolutionDiagram() {
  const levels = [
    { y: 126, n: "n = 0", width: 164, color: success },
    { y: 178, n: "n = 16", width: 122, color: warning },
    { y: 230, n: "n = 64", width: 88, color: accent },
    { y: 282, n: "n = 256", width: 54, color: danger },
  ];
  return (
    <Frame ariaLabel="环境光照的空间 BRDF 预卷积：将环境图按多个 Phong sharpness 指数预卷积为 cube mipmap 层，运行时由每个 texel 的 n 选择 LOD，并用 lobe 峰值方向查表。" caption="预卷积把运行时对所有入射方向的积分转成一次环境图 lookup；n 越大，lobe 越尖，通常需要更细的 mip 层。">
      <ArrowDefs />
      <text x={360} y={34} textAnchor="middle" fontSize={18} fontWeight={700} fill={primary}>environment map：预卷积方向与 sharpness</text>
      <rect x={34} y={96} width={170} height={222} rx={16} fill={accent} fillOpacity={0.07} stroke={accent} strokeWidth={2} />
      <text x={119} y={128} textAnchor="middle" fontSize={15} fontWeight={700} fill={accent}>incident Li(wi)</text>
      <circle cx={119} cy={210} r={60} fill="url(#ch18-lobe-gradient)" stroke={accent} strokeWidth={3} />
      <path d="M 72 246 C 91 216, 103 186, 120 164 C 138 188, 151 216, 168 246" fill="none" stroke={success} strokeWidth={3} />
      <text x={119} y={292} textAnchor="middle" fontSize={12} fill={secondary}>all incident directions</text>
      <Arrow x1={220} y1={210} x2={270} y2={210} stroke={accent} />
      <rect x={290} y={84} width={192} height={248} rx={16} fill={warning} fillOpacity={0.07} stroke={warning} strokeWidth={2} />
      <text x={386} y={116} textAnchor="middle" fontSize={15} fontWeight={700} fill={warning}>convolve</text>
      {levels.map((level) => <g key={level.n}><rect x={306} y={level.y} width={142} height={28} rx={8} fill={surface} stroke={border} /><rect x={306} y={level.y} width={level.width} height={28} rx={8} fill={level.color} fillOpacity={0.28} stroke={level.color} /><text x={458} y={level.y + 19} textAnchor="end" fontSize={12} fill={primary}>{level.n}</text></g>)}
      <Arrow x1={498} y1={210} x2={548} y2={210} stroke={warning} />
      <rect x={566} y={96} width={120} height={222} rx={16} fill={success} fillOpacity={0.07} stroke={success} strokeWidth={2} />
      <text x={626} y={128} textAnchor="middle" fontSize={15} fontWeight={700} fill={success}>runtime</text>
      <text x={626} y={168} textAnchor="middle" fontSize={13} fill={primary}>p(wr)</text>
      <text x={626} y={198} textAnchor="middle" fontSize={13} fill={primary}>LOD ← n</text>
      <text x={626} y={228} textAnchor="middle" fontSize={13} fill={primary}>one lookup</text>
      <text x={626} y={270} textAnchor="middle" fontSize={12} fill={secondary}>× lobe albedo</text>
      <rect x={120} y={354} width={480} height={30} rx={10} fill={danger} fillOpacity={0.1} stroke={danger} />
      <text x={360} y={374} textAnchor="middle" fontSize={12} fill={primary}>把复杂的全方向积分换成可控的预处理与近似</text>
    </Frame>
  );
}

export function GpuGemsCh18SbrdfLab() {
  const [lobeCount, setLobeCount] = useState(2);
  const [sharpness, setSharpness] = useState(32);
  const [anisotropy, setAnisotropy] = useState(0.2);
  const [mode, setMode] = useState<"discrete" | "environment">("environment");
  const [filterMode, setFilterMode] = useState<"point" | "linear">("point");

  const reset = () => {
    setLobeCount(2);
    setSharpness(32);
    setAnisotropy(0.2);
    setMode("environment");
    setFilterMode("point");
  };
  const lobeWidth = rounded(Math.max(8, 62 - Math.log2(sharpness + 1) * 11));
  const gloss = rounded(Math.min(1, 0.28 + sharpness / 160 + lobeCount * 0.08));
  const directionShift = rounded(Math.min(1, Math.abs(anisotropy) * 0.72 + 0.16));
  const artifactRisk = rounded(filterMode === "linear" ? 0.42 + sharpness / 220 : 0.1 + sharpness / 360);
  const label = "空间 BRDF 实验：" + mode + " 路径，" + lobeCount + " 个 lobe，sharpness " + sharpness + "，anisotropy " + anisotropy.toFixed(2) + "，" + filterMode + " sampling，lobe width " + lobeWidth.toFixed(1) + "，artifact risk " + artifactRisk.toFixed(2) + "。";

  return (
    <section data-visual-kind="gpu-gems-ch18-spatial-brdfs" className="not-prose my-6 rounded-card border border-border bg-elevated p-5" aria-label="空间 BRDF 交互实验：切换离散光或环境光路径，调整 lobe 数量、sharpness、各向异性和纹理采样方式">
      <div className="mb-4 flex flex-wrap items-baseline justify-between gap-3">
        <div>
          <p className="text-[11px] uppercase tracking-[0.18em] text-secondary">Spatial BRDF Lab</p>
          <h4 className="mt-1 text-[15px] font-semibold text-primary">先猜：sharpness 增大，lobe 和纹理过滤会怎样？</h4>
        </div>
        <span className="rounded-control border border-accent px-2 py-1 text-[11px] text-accent">可交互</span>
      </div>
      <div className="grid gap-5 md:grid-cols-[1fr_248px] md:items-center">
        <svg viewBox="0 0 560 390" role="img" aria-label={label} className="w-full">
          <ArrowDefs />
          <rect x={12} y={18} width={536} height={354} rx={18} fill={surface} stroke={border} />
          <text x={32} y={46} fontSize={14} fontWeight={700} fill={primary}>{mode === "environment" ? "preconvolved environment" : "discrete lights"}</text>
          <text x={526} y={46} textAnchor="end" fontSize={12} fill={danger}>gloss {gloss.toFixed(2)}</text>
          <path d="M 74 278 C 104 247, 126 236, 154 240 C 188 245, 208 278, 240 281 C 272 284, 302 260, 334 264 C 366 268, 396 246, 428 256 L 428 324 L 74 324 Z" fill={surface} stroke={border} strokeWidth={3} />
          <path d="M 224 240 C 241 206, 267 190, 295 204 C 314 214, 321 237, 342 244 C 361 250, 381 240, 397 254 L 397 280 L 224 280 Z" fill={accent} fillOpacity={0.1 + gloss * 0.22} stroke={accent} strokeWidth={2} />
          <circle cx={284} cy={203} r={8} fill={warning} />
          <Arrow x1={284} y1={193} x2={284} y2={134} stroke={warning} />
          <path d={`M 284 203 C ${238 - anisotropy * 34} ${166 + directionShift * 14}, ${338 + anisotropy * 54} ${151 - directionShift * 10}, ${374 + anisotropy * 48} ${184 - directionShift * 18}`} fill="none" stroke={danger} strokeWidth={4} />
          <circle cx={374 + anisotropy * 48} cy={184 - directionShift * 18} r={7} fill={danger} />
          {Array.from({ length: lobeCount }, (_, index) => {
            const y = 146 + index * 38;
            return <g key={"lab-lobe-" + index}><ellipse cx={146 + index * 62} cy={y} rx={lobeWidth} ry={Math.max(12, lobeWidth * 0.56)} fill={index % 2 === 0 ? accent : warning} fillOpacity={0.13} stroke={index % 2 === 0 ? accent : warning} strokeWidth={2} /><text x={146 + index * 62} y={y + 4} textAnchor="middle" fontSize={12} fill={primary}>lobe {index + 1}</text></g>;
          })}
          <rect x={72} y={292} width={356} height={30} rx={10} fill={filterMode === "linear" ? danger : success} fillOpacity={0.1} stroke={filterMode === "linear" ? danger : success} />
          <text x={250} y={312} textAnchor="middle" fontSize={12} fill={primary}>width {lobeWidth.toFixed(1)} · direction shift {directionShift.toFixed(2)} · artifact {artifactRisk.toFixed(2)}</text>
          <text x={72} y={354} fontSize={12} fill={secondary}>{mode === "environment" ? "n 选择预卷积环境图的 LOD" : "每个 light 评估所有 lobe，再累加 exitant radiance"}</text>
        </svg>
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-2">
            <button type="button" aria-pressed={mode === "discrete"} onClick={() => setMode("discrete")} className={"min-h-11 rounded-control border px-2 py-2 text-xs " + (mode === "discrete" ? "border-warning text-primary" : "border-border text-secondary")}>discrete</button>
            <button type="button" aria-pressed={mode === "environment"} onClick={() => setMode("environment")} className={"min-h-11 rounded-control border px-2 py-2 text-xs " + (mode === "environment" ? "border-success text-primary" : "border-border text-secondary")}>environment</button>
          </div>
          <label className="block text-sm text-primary" htmlFor="ch18-lobes">specular lobes：{lobeCount}</label>
          <input id="ch18-lobes" className="min-h-11 w-full accent-accent" type="range" min="1" max="3" step="1" value={lobeCount} onChange={(event) => setLobeCount(Number(event.target.value))} aria-label="调整 specular lobe 数量" />
          <label className="block text-sm text-primary" htmlFor="ch18-sharpness">sharpness n：{sharpness}</label>
          <input id="ch18-sharpness" className="min-h-11 w-full accent-accent" type="range" min="0" max="256" step="4" value={sharpness} onChange={(event) => setSharpness(Number(event.target.value))} aria-label="调整 specular lobe sharpness" />
          <label className="block text-sm text-primary" htmlFor="ch18-anisotropy">anisotropy：{anisotropy.toFixed(2)}</label>
          <input id="ch18-anisotropy" className="min-h-11 w-full accent-accent" type="range" min="-1" max="1" step="0.05" value={anisotropy} onChange={(event) => setAnisotropy(Number(event.target.value))} aria-label="调整各向异性方向偏移" />
          <div className="grid grid-cols-2 gap-2">
            <button type="button" aria-pressed={filterMode === "point"} onClick={() => setFilterMode("point")} className={"min-h-11 rounded-control border px-2 py-2 text-xs " + (filterMode === "point" ? "border-accent text-primary" : "border-border text-secondary")}>point sample</button>
            <button type="button" aria-pressed={filterMode === "linear"} onClick={() => setFilterMode("linear")} className={"min-h-11 rounded-control border px-2 py-2 text-xs " + (filterMode === "linear" ? "border-danger text-primary" : "border-border text-secondary")}>linear sample</button>
          </div>
          <button type="button" aria-label="重置空间 BRDF 实验" onClick={reset} className="min-h-11 w-full rounded-control border border-border px-3 py-2 text-sm text-secondary hover:border-accent hover:text-primary">重置实验</button>
          <p className="text-xs text-secondary" role="status">观察：增加 lobes 能表达更多材质行为但增加纹理和 shader 成本；n 越大高光越尖，非线性 shape 参数用 linear filtering 更容易 sparkle；environment 模式把积分成本换成预卷积与 LOD。</p>
        </div>
      </div>
    </section>
  );
}
