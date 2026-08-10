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
      <marker id="ch20-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 z" fill={accent} />
      </marker>
      <linearGradient id="ch20-background-gradient" x1="0" x2="1" y1="0" y2="1">
        <stop offset="0" stopColor={surface} />
        <stop offset="1" stopColor={accent} stopOpacity="0.18" />
      </linearGradient>
      <linearGradient id="ch20-bomb-gradient" x1="0" x2="1" y1="0" y2="1">
        <stop offset="0" stopColor={warning} stopOpacity="0.28" />
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
  return <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={stroke} strokeWidth={3} markerEnd="url(#ch20-arrow)" />;
}

export function GpuGemsCh20BombingPipelineDiagram() {
  const stages = [
    { x: 28, title: "UV grid", detail: "floor(UV × scale)", color: accent },
    { x: 196, title: "cell data", detail: "offset + priority", color: warning },
    { x: 364, title: "neighbors", detail: "4 or 9 cells", color: success },
    { x: 532, title: "composite", detail: "image / shape", color: danger },
  ];
  return (
    <Frame ariaLabel="Texture bombing 的像素流程：将 UV 划分为规则 cell，使用伪随机纹理取得每个 cell 的偏移和优先级，检查当前与邻居 cell，最后将 image 或 procedural shape 合成到背景。" caption="规则网格只是寻址结构；视觉变化来自每个 cell 的伪随机位置、优先级、密度、缩放、旋转和图像选择。">
      <ArrowDefs />
      <text x={360} y={34} textAnchor="middle" fontSize={18} fontWeight={700} fill={primary}>texture bombing：用规则寻址制造不规则细节</text>
      {stages.map((stage, index) => (
        <g key={stage.title}>
          <rect x={stage.x} y={106} width={138} height={166} rx={16} fill={stage.color} fillOpacity={0.08} stroke={stage.color} strokeWidth={2} />
          <text x={stage.x + 69} y={138} textAnchor="middle" fontSize={14} fontWeight={700} fill={stage.color}>{stage.title}</text>
          {index === 0 && <><path d={`M ${stage.x + 36} 162 H ${stage.x + 102} M ${stage.x + 36} 196 H ${stage.x + 102} M ${stage.x + 36} 230 H ${stage.x + 102} M ${stage.x + 54} 146 V ${stage.x + 54} M ${stage.x + 86} 146 V ${stage.x + 86}`} fill="none" stroke={accent} strokeWidth={2} /><rect x={stage.x + 36} y={146} width={66} height={84} fill="none" stroke={accent} strokeWidth={2} /></>}
          {index === 1 && <><rect x={stage.x + 38} y={158} width={62} height={62} fill="url(#ch20-bomb-gradient)" stroke={warning} strokeWidth={2} /><circle cx={stage.x + 57} cy={184} r={8} fill={success} /><circle cx={stage.x + 82} cy={202} r={7} fill={danger} /><Arrow x1={stage.x + 69} y1={214} x2={stage.x + 92} y2={172} stroke={warning} /><text x={stage.x + 69} y={246} textAnchor="middle" fontSize={12} fill={secondary}>random.xy + w</text></>}
          {index === 2 && <><rect x={stage.x + 38} y={158} width={62} height={62} fill="url(#ch20-background-gradient)" stroke={success} strokeWidth={2} /><circle cx={stage.x + 69} cy={189} r={8} fill={danger} /><path d={`M ${stage.x + 42} 163 L ${stage.x + 63} 184 M ${stage.x + 96} 163 L ${stage.x + 75} 184 M ${stage.x + 42} 215 L ${stage.x + 63} 194 M ${stage.x + 96} 215 L ${stage.x + 75} 194`} stroke={success} strokeWidth={2} /><text x={stage.x + 69} y={246} textAnchor="middle" fontSize={12} fill={secondary}>current + adjacent</text></>}
          {index === 3 && <><rect x={stage.x + 38} y={158} width={62} height={62} fill="url(#ch20-background-gradient)" stroke={danger} strokeWidth={2} /><circle cx={stage.x + 57} cy={185} r={10} fill={warning} fillOpacity={0.68} /><circle cx={stage.x + 82} cy={201} r={8} fill={danger} fillOpacity={0.72} /><circle cx={stage.x + 69} cy={177} r={6} fill={success} fillOpacity={0.78} /></>}
          <text x={stage.x + 69} y={250} textAnchor="middle" fontSize={12} fill={secondary}>{stage.detail}</text>
          {index < stages.length - 1 && <Arrow x1={stage.x + 144} y1={198} x2={stage.x + 160} y2={198} stroke={stage.color} />}
        </g>
      ))}
      <rect x={112} y={318} width={496} height={42} rx={12} fill={accent} fillOpacity={0.08} stroke={accent} />
      <text x={360} y={344} textAnchor="middle" fontSize={13} fill={primary}>cell 坐标稳定，cell 参数变化，重复纹理因此不再显眼</text>
    </Frame>
  );
}

export function GpuGemsCh20NeighborSamplingDiagram() {
  const cells = Array.from({ length: 9 }, (_, index) => ({
    x: 118 + (index % 3) * 74,
    y: 132 + Math.floor(index / 3) * 64,
    center: index === 4,
  }));
  return (
    <Frame ariaLabel="Texture bombing 的邻居采样：当 image 接近 cell 边界时，当前 cell 的 image 会被截断，必须检查相邻 cell；在 image 不大于 cell 且 offset 受限时，可以从九个邻居缩减到四个候选。" caption="四候选优化依赖明确限制：image 不大于 cell，offset 在 cell 内，且只会向固定方向跨界；放宽限制就必须扩大邻居集合。">
      <ArrowDefs />
      <text x={360} y={34} textAnchor="middle" fontSize={18} fontWeight={700} fill={primary}>neighbor sampling：修复 cell 边界的截断</text>
      {cells.map((cell, index) => <g key={"neighbor-cell-" + index}><rect x={cell.x} y={cell.y} width={58} height={50} fill={cell.center ? accent : surface} fillOpacity={cell.center ? 0.16 : 1} stroke={cell.center ? accent : border} strokeWidth={cell.center ? 3 : 2} /><text x={cell.x + 29} y={cell.y + 30} textAnchor="middle" fontSize={12} fill={cell.center ? accent : secondary}>{cell.center ? "pixel" : "cell"}</text></g>)}
      <circle cx={220} cy={196} r={29} fill={warning} fillOpacity={0.18} stroke={warning} strokeWidth={3} />
      <path d="M 220 196 C 186 166, 174 130, 152 118" fill="none" stroke={danger} strokeWidth={4} />
      <circle cx={152} cy={118} r={7} fill={danger} />
      <text x={152} y={102} textAnchor="middle" fontSize={12} fill={danger}>image crosses edge</text>
      <Arrow x1={360} y1={196} x2={414} y2={196} stroke={accent} />
      <rect x={438} y={102} width={238} height={190} rx={16} fill={success} fillOpacity={0.07} stroke={success} strokeWidth={2} />
      <text x={557} y={134} textAnchor="middle" fontSize={15} fontWeight={700} fill={success}>candidate cells</text>
      <text x={557} y={172} textAnchor="middle" fontSize={14} fill={primary}>9 cells：无大小限制</text>
      <text x={557} y={204} textAnchor="middle" fontSize={14} fill={primary}>4 cells：受限 image</text>
      <text x={557} y={242} textAnchor="middle" fontSize={12} fill={secondary}>priority 决定重叠谁在上面</text>
      <rect x={130} y={338} width={460} height={30} rx={10} fill={warning} fillOpacity={0.1} stroke={warning} />
      <text x={360} y={358} textAnchor="middle" fontSize={12} fill={primary}>先证明 coverage 边界，再用更少 texture samples 优化</text>
    </Frame>
  );
}

export function GpuGemsCh20PriorityVoronoiDiagram() {
  const points = [
    { x: 116, y: 158, color: accent, label: "p₁" },
    { x: 212, y: 222, color: warning, label: "p₂" },
    { x: 302, y: 150, color: success, label: "p₃" },
    { x: 356, y: 252, color: danger, label: "p₄" },
  ];
  return (
    <Frame ariaLabel="Texture bombing 的 priority 与 Voronoi 变体：重叠 image 使用随机 priority 选择前景，Voronoi 变体则使用到 cell 中随机点的距离平方作为 priority，距离最小的点赢得像素。" caption="priority 不只可以是随机深度，也可以是距离平方；后者会形成 Voronoi-like cellular 图案，并省掉开方。">
      <ArrowDefs />
      <text x={360} y={34} textAnchor="middle" fontSize={18} fontWeight={700} fill={primary}>priority：从重叠图像到 Voronoi-like cells</text>
      <rect x={38} y={92} width={346} height={220} rx={16} fill="url(#ch20-background-gradient)" stroke={border} strokeWidth={2} />
      <path d="M 38 170 H 384 M 38 238 H 384 M 154 92 V 312 M 270 92 V 312" stroke={border} strokeWidth={2} />
      {points.map((point) => <g key={point.label}><circle cx={point.x} cy={point.y} r={20} fill={point.color} fillOpacity={0.18} stroke={point.color} strokeWidth={2} /><circle cx={point.x} cy={point.y} r={6} fill={point.color} /><text x={point.x + 12} y={point.y - 12} fontSize={12} fill={point.color}>{point.label}</text></g>)}
      <path d="M 154 92 L 154 170 L 38 170 M 270 92 L 270 170 L 384 170 M 154 170 L 270 170 L 270 238 L 154 238 Z M 270 238 L 384 238 M 154 238 L 154 312" fill="none" stroke={accent} strokeWidth={2} strokeDasharray="7 5" />
      <Arrow x1={414} y1={196} x2={466} y2={196} stroke={accent} />
      <rect x={486} y={96} width={196} height={210} rx={16} fill={warning} fillOpacity={0.07} stroke={warning} strokeWidth={2} />
      <text x={584} y={130} textAnchor="middle" fontSize={15} fontWeight={700} fill={warning}>choose winner</text>
      <text x={584} y={170} textAnchor="middle" fontSize={14} fill={primary}>random.w → priority</text>
      <text x={584} y={202} textAnchor="middle" fontSize={14} fill={primary}>distance² → Voronoi</text>
      <text x={584} y={236} textAnchor="middle" fontSize={12} fill={secondary}>最小 distance² 赢得 pixel</text>
      <text x={584} y={270} textAnchor="middle" fontSize={12} fill={secondary}>更多样本可减少 grid 感</text>
      <rect x={118} y={342} width={484} height={30} rx={10} fill={success} fillOpacity={0.1} stroke={success} />
      <text x={360} y={362} textAnchor="middle" fontSize={12} fill={primary}>priority 让重叠结果可解释，避免“最后测试者永远在最上面”</text>
    </Frame>
  );
}

export function GpuGemsCh20CostDiagram() {
  const bars = [
    { label: "4-cell 2D", width: 168, detail: "4 image samples", color: success },
    { label: "9-cell 2D", width: 304, detail: "coverage safe", color: warning },
    { label: "8-cell 3D", width: 420, detail: "3D neighbors", color: danger },
  ];
  return (
    <Frame ariaLabel="Texture bombing 的性能预算：二维四 cell 采样最便宜，九 cell 采样覆盖更安全，三维八邻居会增加依赖纹理读取和 shader 指令；最终 color sample 可以移出循环时可减少成本。" caption="texture bombing 的成本主要来自依赖 texture reads、邻居数量、每 cell 的候选数量和重复颜色采样；先定义覆盖约束，再决定优化空间。">
      <ArrowDefs />
      <text x={360} y={34} textAnchor="middle" fontSize={18} fontWeight={700} fill={primary}>performance budget：coverage 与 samples 的交换</text>
      <line x1={90} y1={300} x2={642} y2={300} stroke={border} strokeWidth={2} />
      <text x={90} y={326} fontSize={12} fill={secondary}>低成本</text>
      <text x={584} y={326} fontSize={12} fill={secondary}>高成本</text>
      {bars.map((bar, index) => {
        const y = 92 + index * 64;
        return <g key={bar.label}><text x={90} y={y + 23} fontSize={13} fontWeight={700} fill={primary}>{bar.label}</text><rect x={224} y={y} width={420} height={32} rx={10} fill={surface} stroke={border} /><rect x={224} y={y} width={bar.width} height={32} rx={10} fill={bar.color} fillOpacity={0.3} stroke={bar.color} /><text x={640} y={y + 21} textAnchor="end" fontSize={12} fill={secondary}>{bar.detail}</text></g>;
      })}
      <rect x={132} y={352} width={456} height={28} rx={10} fill={accent} fillOpacity={0.08} stroke={accent} />
      <text x={360} y={371} textAnchor="middle" fontSize={12} fill={primary}>procedural shape 可先存最终坐标，循环外只做一次 color lookup</text>
    </Frame>
  );
}

export function GpuGemsCh20TextureBombingLab() {
  const [cellScale, setCellScale] = useState(4);
  const [density, setDensity] = useState(0.62);
  const [imageSize, setImageSize] = useState(0.62);
  const [priority, setPriority] = useState(0.5);
  const [mode, setMode] = useState<"four" | "nine">("four");
  const [dimension, setDimension] = useState<"2d" | "3d">("2d");
  const [showGrid, setShowGrid] = useState(true);

  const reset = () => {
    setCellScale(4);
    setDensity(0.62);
    setImageSize(0.62);
    setPriority(0.5);
    setMode("four");
    setDimension("2d");
    setShowGrid(true);
  };
  const sampleCount = dimension === "3d" ? 8 : mode === "four" ? 4 : 9;
  const coverage = rounded(Math.min(1, imageSize * (mode === "four" ? 0.98 : 1.12)));
  const repetition = rounded(Math.max(0.04, 0.54 - density * 0.38 - imageSize * 0.16));
  const cost = rounded(Math.min(1, sampleCount / 10 + density * 0.18));
  const label = "Texture bombing 实验：" + dimension + " 模式，cell scale " + cellScale + "，density " + density.toFixed(2) + "，image size " + imageSize.toFixed(2) + "，priority " + priority.toFixed(2) + "，邻居 samples " + sampleCount + "，coverage " + coverage.toFixed(2) + "，repetition " + repetition.toFixed(2) + "，cost " + cost.toFixed(2) + "。";
  const columns = 5;
  const rows = 4;
  const cellWidth = 64;
  const cellHeight = 48;

  return (
    <section data-visual-kind="gpu-gems-ch20-texture-bombing" className="not-prose my-6 rounded-card border border-border bg-elevated p-5" aria-label="Texture bombing 交互实验：调整 cell scale、密度、image 大小、priority、二维或三维邻居模式，并观察覆盖、重复感和成本">
      <div className="mb-4 flex flex-wrap items-baseline justify-between gap-3">
        <div>
          <p className="text-[11px] uppercase tracking-[0.18em] text-secondary">Texture Bombing Lab</p>
          <h4 className="mt-1 text-[15px] font-semibold text-primary">先猜：image 变大时，为什么要检查更多邻居？</h4>
        </div>
        <span className="rounded-control border border-accent px-2 py-1 text-[11px] text-accent">可交互</span>
      </div>
      <div className="grid gap-5 md:grid-cols-[1fr_248px] md:items-center">
        <svg viewBox="0 0 560 390" role="img" aria-label={label} className="w-full">
          <ArrowDefs />
          <rect x={12} y={18} width={536} height={354} rx={18} fill={surface} stroke={border} />
          <text x={32} y={46} fontSize={14} fontWeight={700} fill={primary}>{dimension === "3d" ? "object-space 3D bombing" : "UV-space 2D bombing"}</text>
          <text x={526} y={46} textAnchor="end" fontSize={12} fill={danger}>{sampleCount} samples</text>
          <rect x={70} y={82} width={columns * cellWidth} height={rows * cellHeight} fill="url(#ch20-background-gradient)" stroke={border} strokeWidth={2} />
          {Array.from({ length: columns * rows }, (_, index) => {
            const col = index % columns;
            const row = Math.floor(index / columns);
            const x = 70 + col * cellWidth;
            const y = 82 + row * cellHeight;
            const hash = Math.abs(Math.sin((index + 1) * 12.9898 + cellScale * 2.3));
            const offsetX = 8 + hash * (cellWidth - 16);
            const offsetY = 8 + Math.abs(Math.sin((index + 1) * 7.31)) * (cellHeight - 16);
            const visible = hash < density + 0.22;
            const size = rounded(7 + imageSize * 14);
            return <g key={"lab-cell-" + index}>{showGrid && <rect x={x} y={y} width={cellWidth} height={cellHeight} fill="none" stroke={border} strokeWidth={1} opacity={0.72} />}{visible && <><circle cx={x + offsetX} cy={y + offsetY} r={size} fill={index % 3 === 0 ? warning : index % 3 === 1 ? danger : success} fillOpacity={0.34 + priority * 0.3} stroke={index % 3 === 0 ? warning : index % 3 === 1 ? danger : success} strokeWidth={2} /><circle cx={x + offsetX} cy={y + offsetY} r={3} fill={primary} /></>}</g>;
          })}
          <rect x={70} y={292} width={320} height={30} rx={10} fill={mode === "four" ? success : warning} fillOpacity={0.1} stroke={mode === "four" ? success : warning} />
          <text x={230} y={312} textAnchor="middle" fontSize={12} fill={primary}>coverage {coverage.toFixed(2)} · repetition {repetition.toFixed(2)} · cost {cost.toFixed(2)}</text>
          <text x={70} y={354} fontSize={12} fill={secondary}>{dimension === "3d" ? "每个 unit cube 需要更多邻居，结果更丰富也更贵" : "规则 grid 可见，但随机 offset、density 和 priority 打破重复"}</text>
        </svg>
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-2">
            <button type="button" aria-pressed={dimension === "2d"} onClick={() => setDimension("2d")} className={"min-h-11 rounded-control border px-2 py-2 text-xs " + (dimension === "2d" ? "border-success text-primary" : "border-border text-secondary")}>2D UV</button>
            <button type="button" aria-pressed={dimension === "3d"} onClick={() => setDimension("3d")} className={"min-h-11 rounded-control border px-2 py-2 text-xs " + (dimension === "3d" ? "border-danger text-primary" : "border-border text-secondary")}>3D object</button>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button type="button" aria-pressed={mode === "four"} onClick={() => setMode("four")} className={"min-h-11 rounded-control border px-2 py-2 text-xs " + (mode === "four" ? "border-accent text-primary" : "border-border text-secondary")}>4 neighbors</button>
            <button type="button" aria-pressed={mode === "nine"} onClick={() => setMode("nine")} className={"min-h-11 rounded-control border px-2 py-2 text-xs " + (mode === "nine" ? "border-warning text-primary" : "border-border text-secondary")}>9 neighbors</button>
          </div>
          <label className="block text-sm text-primary" htmlFor="ch20-scale">cell scale：{cellScale}</label>
          <input id="ch20-scale" className="min-h-11 w-full accent-accent" type="range" min="2" max="7" step="1" value={cellScale} onChange={(event) => setCellScale(Number(event.target.value))} aria-label="调整 texture bombing cell scale" />
          <label className="block text-sm text-primary" htmlFor="ch20-density">density：{density.toFixed(2)}</label>
          <input id="ch20-density" className="min-h-11 w-full accent-accent" type="range" min="0.1" max="1" step="0.02" value={density} onChange={(event) => setDensity(Number(event.target.value))} aria-label="调整 texture bombing 密度" />
          <label className="block text-sm text-primary" htmlFor="ch20-image-size">image size：{imageSize.toFixed(2)}</label>
          <input id="ch20-image-size" className="min-h-11 w-full accent-accent" type="range" min="0.18" max="0.95" step="0.02" value={imageSize} onChange={(event) => setImageSize(Number(event.target.value))} aria-label="调整每个 image 的大小" />
          <label className="block text-sm text-primary" htmlFor="ch20-priority">priority：{priority.toFixed(2)}</label>
          <input id="ch20-priority" className="min-h-11 w-full accent-accent" type="range" min="0" max="1" step="0.02" value={priority} onChange={(event) => setPriority(Number(event.target.value))} aria-label="调整重叠 image 的 priority" />
          <label className="flex min-h-11 items-center gap-2 text-sm text-primary" htmlFor="ch20-grid"><input id="ch20-grid" className="h-4 w-4 accent-accent" type="checkbox" checked={showGrid} onChange={(event) => setShowGrid(event.target.checked)} />显示 cell grid</label>
          <button type="button" aria-label="重置 texture bombing 实验" onClick={reset} className="min-h-11 w-full rounded-control border border-border px-3 py-2 text-sm text-secondary hover:border-accent hover:text-primary">重置实验</button>
          <p className="text-xs text-secondary" role="status">观察：image 接近 cell 边界或变大时，四邻居可能漏掉 coverage；提高 density 会减少空洞但增加成本；3D 模式要检查更多 unit cube 邻居。</p>
        </div>
      </div>
    </section>
  );
}
