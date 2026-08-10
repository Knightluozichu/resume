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

function Arrow({ x1, y1, x2, y2, stroke = accent }: { x1: number; y1: number; x2: number; y2: number; stroke?: string }) {
  return <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={stroke} strokeWidth="3" markerEnd="url(#ch11-arrow)" />;
}

function ArrowDefs() {
  return (
    <defs>
      <marker id="ch11-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 z" fill={accent} />
      </marker>
      <linearGradient id="ch11-soft-shadow" x1="0" x2="1">
        <stop offset="0" stopColor={danger} stopOpacity="0.5" />
        <stop offset="0.55" stopColor={danger} stopOpacity="0.34" />
        <stop offset="1" stopColor={danger} stopOpacity="0.06" />
      </linearGradient>
      <linearGradient id="ch11-light-band" x1="0" x2="1">
        <stop offset="0" stopColor={warning} stopOpacity="0.05" />
        <stop offset="0.5" stopColor={warning} stopOpacity="0.32" />
        <stop offset="1" stopColor={warning} stopOpacity="0.05" />
      </linearGradient>
    </defs>
  );
}

export function GpuGemsCh11AliasingDiagram() {
  return (
    <Frame ariaLabel="阴影贴图走样对比：单个 shadow texel compare 会把放大的阴影边界显示成阶梯，而多个比较结果取平均后形成平滑的软边。" caption="先认识问题：shadow map 被投影到表面后，如果一个 texel 覆盖了很多屏幕像素，单次比较就会把边界放大成锯齿。">
      <ArrowDefs />
      <text x="360" y="32" textAnchor="middle" fontSize="18" fontWeight="700" fill={primary}>shadow map 放大时，硬边会变成锯齿</text>
      <rect x="28" y="62" width="306" height="288" rx="18" fill={danger} fillOpacity="0.05" stroke={border} />
      <text x="181" y="96" textAnchor="middle" fontSize="16" fontWeight="700" fill={danger}>1 compare / pixel</text>
      <text x="181" y="118" textAnchor="middle" fontSize="12" fill={secondary}>一个深度答案：0 或 1</text>
      <path d="M 60 292 L 128 292 L 128 270 L 158 270 L 158 238 L 190 238 L 190 210 L 220 210 L 220 174 L 256 174 L 256 142 L 302 142" fill="none" stroke={danger} strokeWidth="5" />
      <path d="M 60 292 L 302 292" stroke={border} strokeWidth="2" />
      <text x="181" y="326" textAnchor="middle" fontSize="13" fill={secondary}>magnified shadow boundary</text>
      <rect x="386" y="62" width="306" height="288" rx="18" fill={success} fillOpacity="0.05" stroke={border} />
      <text x="539" y="96" textAnchor="middle" fontSize="16" fontWeight="700" fill={success}>PCF / multiple compares</text>
      <text x="539" y="118" textAnchor="middle" fontSize="12" fill={secondary}>统计窗口内的遮挡比例</text>
      <path d="M 418 292 C 460 292 470 286 490 270 C 510 254 512 226 532 210 C 552 194 556 174 578 158 C 598 144 620 142 660 142" fill="none" stroke={success} strokeWidth="5" />
      <path d="M 418 292 C 460 292 470 286 490 270 C 510 254 512 226 532 210 C 552 194 556 174 578 158 C 598 144 620 142 660 142 L 660 292 Z" fill="url(#ch11-soft-shadow)" />
      <text x="539" y="326" textAnchor="middle" fontSize="13" fill={secondary}>0% → 100% 的平滑过渡</text>
      <Arrow x1={340} y1={206} x2={378} y2={206} stroke={warning} />
      <text x="360" y="186" textAnchor="middle" fontSize="12" fill={warning}>average</text>
    </Frame>
  );
}

export function GpuGemsCh11SampleFootprintDiagram() {
  const grids = [
    { x: 62, title: "1 sample", detail: "成本低，边界硬", color: danger, cells: 1 },
    { x: 270, title: "4 samples", detail: "抖动取样，成本低", color: warning, cells: 2 },
    { x: 478, title: "4 × 4 = 16", detail: "固定区域，边界稳", color: success, cells: 4 },
  ];
  return (
    <Frame ariaLabel="PCF 采样 footprint 对比：单样本、四样本和十六样本分别在 shadow map 上取样；十六样本覆盖不对齐 texel 边界的 4×4 区域并平均 compare 结果。" caption="PCF 平均的是比较结果，不是先把深度纹理预过滤；固定 4×4 区域足够抑制走样，又避免随机微多边形采样。">
      <ArrowDefs />
      <text x="360" y="32" textAnchor="middle" fontSize="18" fontWeight="700" fill={primary}>把“一个答案”换成 shadow-map footprint</text>
      {grids.map((grid) => (
        <g key={grid.title}>
          <rect x={grid.x} y="62" width="180" height="282" rx="18" fill={grid.color} fillOpacity="0.05" stroke={border} />
          <text x={grid.x + 90} y="96" textAnchor="middle" fontSize="16" fontWeight="700" fill={grid.color}>{grid.title}</text>
          <text x={grid.x + 90} y="118" textAnchor="middle" fontSize="12" fill={secondary}>比较 depth，再求平均</text>
          <rect x={grid.x + 38} y="152" width="104" height="104" fill={surface} stroke={grid.color} strokeWidth="2" />
          {Array.from({ length: grid.cells * grid.cells }).map((_, index) => {
            const col = index % grid.cells;
            const row = Math.floor(index / grid.cells);
            const size = 104 / grid.cells;
            return <rect key={grid.title + "-" + index} x={grid.x + 38 + col * size} y={152 + row * size} width={size} height={size} fill={grid.color} fillOpacity={index % 2 === 0 ? "0.18" : "0.07"} stroke={grid.color} strokeOpacity="0.45" />;
          })}
          <circle cx={grid.x + 90} cy="204" r={grid.cells === 1 ? 8 : 5} fill={grid.color} />
          <text x={grid.x + 90} y="290" textAnchor="middle" fontSize="13" fill={grid.color}>{grid.cells === 4 ? "offset: ±1.5, ±0.5" : grid.cells === 2 ? "4 个位置" : "中心 texel"}</text>
          <text x={grid.x + 90} y="316" textAnchor="middle" fontSize="12" fill={secondary}>{grid.detail}</text>
        </g>
      ))}
    </Frame>
  );
}

export function GpuGemsCh11OverlapDiagram() {
  return (
    <Frame ariaLabel="相邻屏幕像素的 PCF 重叠示意：shadow map 被放大时，相邻像素对应的采样区域靠得很近并大量重叠，因此平均后的 shadow value 变化更平滑。" caption="固定大小的采样窗口听起来粗糙，但放大越强，相邻像素的窗口越重叠；这正是边界平滑而不产生带状断层的原因。">
      <ArrowDefs />
      <text x="360" y="32" textAnchor="middle" fontSize="18" fontWeight="700" fill={primary}>放大越强，相邻像素的 footprint 越重叠</text>
      <rect x="36" y="70" width="648" height="260" rx="18" fill={accent} fillOpacity="0.04" stroke={border} />
      <text x="118" y="104" textAnchor="middle" fontSize="15" fontWeight="700" fill={accent}>screen pixels</text>
      <rect x="82" y="142" width="72" height="72" fill={accent} fillOpacity="0.14" stroke={accent} strokeWidth="3" />
      <rect x="154" y="142" width="72" height="72" fill={success} fillOpacity="0.14" stroke={success} strokeWidth="3" />
      <text x="118" y="184" textAnchor="middle" fontSize="14" fill={accent}>P₀</text>
      <text x="190" y="184" textAnchor="middle" fontSize="14" fill={success}>P₁</text>
      <Arrow x1={226} y1={178} x2={276} y2={178} stroke={warning} />
      <text x="251" y="158" textAnchor="middle" fontSize="12" fill={warning}>project</text>
      <text x="480" y="104" textAnchor="middle" fontSize="15" fontWeight="700" fill={warning}>shadow-map space</text>
      <rect x="330" y="122" width="164" height="164" fill={surface} stroke={warning} strokeWidth="2" />
      <path d="M 330 205 L 494 205 M 412 122 L 412 286" stroke={border} strokeWidth="2" strokeDasharray="6 6" />
      <rect x="354" y="148" width="100" height="100" rx="6" fill={danger} fillOpacity="0.16" stroke={danger} strokeWidth="3" />
      <rect x="374" y="158" width="100" height="100" rx="6" fill={success} fillOpacity="0.16" stroke={success} strokeWidth="3" />
      <text x="404" y="212" textAnchor="middle" fontSize="13" fill={danger}>R₀</text>
      <text x="424" y="226" textAnchor="middle" fontSize="13" fill={success}>R₁</text>
      <text x="412" y="314" textAnchor="middle" fontSize="13" fill={secondary}>R₀ 与 R₁ 大量重叠 → shadow value 小步变化</text>
      <text x="360" y="370" textAnchor="middle" fontSize="13" fill={primary}>无需把每个屏幕像素的四边形显式变换到 light space</text>
    </Frame>
  );
}

export function GpuGemsCh11OptimizationDiagram() {
  const items = [
    { x: 30, title: "16 compares", color: success, note: "稳定、较贵", detail: "覆盖完整 4×4" },
    { x: 260, title: "4 compares", color: warning, note: "抖动、便宜", detail: "每像素选 4 个" },
    { x: 490, title: "hardware PCF", color: accent, note: "硬件先做 4 compares", detail: "再由 shader 扩大区域" },
  ];
  return (
    <Frame ariaLabel="PCF 优化选择图：十六样本覆盖完整 4×4 区域但采样更多，四样本通过随屏幕位置变化的抖动模式取得相近效果，硬件 PCF 可先执行四次深度比较。" caption="优化不是把采样窗口缩小，而是在相同 4×4 footprint 中改变每个像素取哪四个点；空间变化的模式把黑白结果抖动成平滑灰度。">
      <ArrowDefs />
      <text x="360" y="32" textAnchor="middle" fontSize="18" fontWeight="700" fill={primary}>固定 footprint，减少每像素的 compare 次数</text>
      {items.map((item, index) => (
        <g key={item.title}>
          <rect x={item.x} y="72" width="200" height="252" rx="18" fill={item.color} fillOpacity="0.06" stroke={border} />
          <text x={item.x + 100} y="108" textAnchor="middle" fontSize="16" fontWeight="700" fill={item.color}>{item.title}</text>
          <text x={item.x + 100} y="130" textAnchor="middle" fontSize="12" fill={secondary}>{item.detail}</text>
          <rect x={item.x + 48} y="158" width="104" height="104" fill={surface} stroke={item.color} strokeWidth="2" />
          {index === 0 && Array.from({ length: 16 }).map((_, cell) => <circle key={"sixteen-" + cell} cx={item.x + 61 + (cell % 4) * 27} cy={171 + Math.floor(cell / 4) * 27} r="5" fill={item.color} />)}
          {index === 1 && [0, 5, 10, 15].map((cell) => <circle key={"four-" + cell} cx={item.x + 61 + (cell % 4) * 27} cy={171 + Math.floor(cell / 4) * 27} r="7" fill={item.color} />)}
          {index === 2 && <><circle cx={item.x + 72} cy="184" r="7" fill={item.color} /><circle cx={item.x + 126} cy="184" r="7" fill={item.color} /><circle cx={item.x + 72} cy="238" r="7" fill={item.color} /><circle cx={item.x + 126} cy="238" r="7" fill={item.color} /><path d={"M " + (item.x + 48) + " 210 L " + (item.x + 152) + " 210 M " + (item.x + 100) + " 158 L " + (item.x + 100) + " 262"} stroke={item.color} strokeOpacity="0.35" strokeDasharray="4 4" /></>}
          <text x={item.x + 100} y="292" textAnchor="middle" fontSize="14" fontWeight="700" fill={item.color}>{item.note}</text>
        </g>
      ))}
      <rect x="156" y="348" width="408" height="40" rx="10" fill={warning} fillOpacity="0.1" stroke={warning} />
      <text x="360" y="373" textAnchor="middle" fontSize="14" fill={primary}>目标：边界更平滑，帧时间仍可控</text>
    </Frame>
  );
}

export function GpuGemsCh11PcfLab() {
  const [sampleMode, setSampleMode] = useState<"one" | "four" | "sixteen">("four");
  const [magnification, setMagnification] = useState(0.68);
  const [radius, setRadius] = useState(0.62);
  const [dither, setDither] = useState(true);
  const [showSamples, setShowSamples] = useState(true);

  const sampleCount = sampleMode === "one" ? 1 : sampleMode === "four" ? 4 : 16;
  const boundary = rounded(278 - magnification * 52);
  const softness = rounded(0.08 + radius * (sampleMode === "one" ? 0.03 : 0.15));
  const shadowPercent = rounded(0.18 + magnification * 0.28 + (sampleCount - 1) * 0.008);
  const reset = () => {
    setSampleMode("four");
    setMagnification(0.68);
    setRadius(0.62);
    setDither(true);
    setShowSamples(true);
  };
  const label = "PCF 实验：当前 " + sampleCount + " 次 shadow compare，magnification " + magnification.toFixed(2) + "，sample footprint " + radius.toFixed(2) + "，" + (dither ? "启用" : "关闭") + "屏幕位置抖动，阴影估计 " + shadowPercent.toFixed(2) + "。";

  const positions = sampleMode === "one"
    ? [{ x: 0, y: 0 }]
    : sampleMode === "four"
      ? (dither ? [{ x: -1.5, y: 0.5 }, { x: 0.5, y: 0.5 }, { x: -1.5, y: -1.5 }, { x: 0.5, y: -1.5 }] : [{ x: -1.5, y: -1.5 }, { x: 0.5, y: -1.5 }, { x: -1.5, y: 0.5 }, { x: 0.5, y: 0.5 }])
      : Array.from({ length: 16 }).map((_, index) => ({ x: -1.5 + (index % 4), y: -1.5 + Math.floor(index / 4) }));

  return (
    <section data-visual-kind="gpu-gems-ch11-shadow-map-antialiasing" className="not-prose my-6 rounded-card border border-border bg-elevated p-5" aria-label="PCF 实验：切换 1、4、16 次 shadow compare，调整 shadow map 放大程度和 footprint，观察阴影边界、采样点和成本变化">
      <div className="mb-4 flex flex-wrap items-baseline justify-between gap-3">
        <div>
          <p className="text-[11px] uppercase tracking-[0.18em] text-secondary">Shadow Map Antialiasing Lab</p>
          <h4 className="mt-1 text-[15px] font-semibold text-primary">先猜：把 footprint 固定住，为什么放大越强反而越容易平滑？</h4>
        </div>
        <span className="rounded-control border border-accent px-2 py-1 text-[11px] text-accent">可交互</span>
      </div>
      <div className="grid gap-5 md:grid-cols-[1fr_248px] md:items-center">
        <svg viewBox="0 0 560 390" role="img" aria-label={label} className="w-full">
          <ArrowDefs />
          <rect x="12" y="18" width="536" height="354" rx="18" fill={surface} stroke={border} />
          <text x="32" y="46" fontSize="14" fontWeight="700" fill={primary}>screen-space shadow preview</text>
          <text x="512" y="46" textAnchor="end" fontSize="12" fill={sampleMode === "one" ? danger : sampleMode === "four" ? warning : success}>{sampleCount + " compares · " + (sampleMode === "one" ? "hard" : "soft") + " edge"}</text>
          <rect x="44" y="88" width="470" height="86" rx="12" fill={warning} fillOpacity="0.05" stroke={border} />
          <circle cx="112" cy="132" r="17" fill={warning} fillOpacity="0.3" stroke={warning} strokeWidth="3" />
          <text x="112" y="104" textAnchor="middle" fontSize="12" fill={warning}>light</text>
          <path d="M 128 132 L 188 108 L 188 156 Z" fill={warning} fillOpacity="0.16" stroke={warning} strokeWidth="2" />
          <rect x="238" y="108" width="34" height="48" rx="4" fill={accent} fillOpacity="0.22" stroke={accent} strokeWidth="2" />
          <text x="255" y="182" textAnchor="middle" fontSize="12" fill={accent}>caster</text>
          <line x1="272" y1="132" x2="480" y2="132" stroke={secondary} strokeWidth="2" strokeDasharray="6 6" />
          <rect x="44" y="214" width="470" height="86" rx="12" fill={danger} fillOpacity="0.06" stroke={border} />
          <text x="62" y="240" fontSize="12" fill={secondary}>shadow coefficient</text>
          <rect x="62" y="258" width="430" height="20" rx="10" fill={surface} stroke={border} />
          <rect x="62" y="258" width={rounded(430 * (1 - shadowPercent))} height="20" rx="10" fill="url(#ch11-soft-shadow)" />
          <line x1={boundary} y1="232" x2={boundary} y2="286" stroke={sampleMode === "one" ? danger : success} strokeWidth="3" />
          <text x={boundary} y="318" textAnchor="middle" fontSize="12" fill={primary}>edge</text>
          <text x="62" y="344" fontSize="12" fill={secondary}>shadow map footprint</text>
          <rect x="372" y="326" width="120" height="28" rx="8" fill={sampleMode === "one" ? danger : sampleMode === "four" ? warning : success} fillOpacity="0.1" stroke={sampleMode === "one" ? danger : sampleMode === "four" ? warning : success} />
          <text x="432" y="345" textAnchor="middle" fontSize="12" fill={primary}>{sampleCount + " fetches / pixel"}</text>
          {showSamples && <g transform="translate(412 88)">
            <rect x="-34" y="-16" width="68" height="68" fill={surface} stroke={accent} strokeWidth="2" />
            {positions.map((position, index) => <circle key={sampleMode + "-" + index} cx={rounded(position.x * 12)} cy={rounded(position.y * 12)} r={sampleMode === "one" ? 6 : 4} fill={sampleMode === "one" ? danger : sampleMode === "four" ? warning : success} />)}
          </g>}
        </svg>
        <div className="space-y-3">
          <div className="grid grid-cols-3 gap-2">
            <button type="button" aria-pressed={sampleMode === "one"} onClick={() => setSampleMode("one")} className={"min-h-11 rounded-control border px-2 py-2 text-xs " + (sampleMode === "one" ? "border-danger text-primary" : "border-border text-secondary")}>1 sample</button>
            <button type="button" aria-pressed={sampleMode === "four"} onClick={() => setSampleMode("four")} className={"min-h-11 rounded-control border px-2 py-2 text-xs " + (sampleMode === "four" ? "border-warning text-primary" : "border-border text-secondary")}>4 samples</button>
            <button type="button" aria-pressed={sampleMode === "sixteen"} onClick={() => setSampleMode("sixteen")} className={"min-h-11 rounded-control border px-2 py-2 text-xs " + (sampleMode === "sixteen" ? "border-success text-primary" : "border-border text-secondary")}>16 samples</button>
          </div>
          <label className="block text-sm text-primary" htmlFor="ch11-magnification">shadow map 放大：{magnification.toFixed(2)}</label>
          <input id="ch11-magnification" className="min-h-11 w-full accent-accent" type="range" min="0" max="1" step="0.05" value={magnification} onChange={(event) => setMagnification(Number(event.target.value))} aria-label="调整 shadow map 放大程度" />
          <label className="block text-sm text-primary" htmlFor="ch11-radius">footprint 大小：{radius.toFixed(2)}</label>
          <input id="ch11-radius" className="min-h-11 w-full accent-accent" type="range" min="0.1" max="1" step="0.05" value={radius} onChange={(event) => setRadius(Number(event.target.value))} aria-label="调整 PCF 采样 footprint 大小" />
          <button type="button" aria-pressed={dither} onClick={() => setDither((value) => !value)} className={"min-h-11 w-full rounded-control border px-3 py-2 text-sm " + (dither ? "border-warning text-primary" : "border-border text-secondary")}>{dither ? "关闭屏幕位置抖动" : "启用屏幕位置抖动"}</button>
          <button type="button" aria-pressed={showSamples} onClick={() => setShowSamples((value) => !value)} className={"min-h-11 w-full rounded-control border px-3 py-2 text-sm " + (showSamples ? "border-accent text-primary" : "border-border text-secondary")}>{showSamples ? "隐藏采样 footprint" : "显示采样 footprint"}</button>
          <button type="button" aria-label="重置 PCF 实验" onClick={reset} className="min-h-11 w-full rounded-control border border-border px-3 py-2 text-sm text-secondary hover:border-accent hover:text-primary">重置实验</button>
          <p className="text-xs text-secondary" role="status">观察：16 samples 最稳但最贵；4 samples 保留较大的 footprint，再用随位置变化的模式降低成本。</p>
        </div>
      </div>
    </section>
  );
}
