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

function ArrowDefs() {
  return (
    <defs>
      <marker
        id="ch25-arrow"
        viewBox="0 0 10 10"
        refX="8"
        refY="5"
        markerWidth="6"
        markerHeight="6"
        orient="auto-start-reverse"
      >
        <path d="M 0 0 L 10 5 L 0 10 z" fill={accent} />
      </marker>
      <linearGradient id="ch25-mip-gradient" x1="0" x2="1">
        <stop offset="0" stopColor={accent} stopOpacity="0.18" />
        <stop offset="0.5" stopColor={success} stopOpacity="0.48" />
        <stop offset="1" stopColor={warning} stopOpacity="0.74" />
      </linearGradient>
      <linearGradient id="ch25-signal-gradient" x1="0" x2="1">
        <stop offset="0" stopColor={danger} stopOpacity="0.68" />
        <stop offset="0.5" stopColor={warning} stopOpacity="0.44" />
        <stop offset="1" stopColor={accent} stopOpacity="0.72" />
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
  return (
    <line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke={stroke}
      strokeWidth={3}
      markerEnd="url(#ch25-arrow)"
    />
  );
}

export function GpuGemsCh25FilterWidthConceptDiagram() {
  return (
    <Frame
      ariaLabel="程序棋盘格的 filter width 概念图：单点判断在缩小时产生锯齿，按像素覆盖的 UV 区间求平均后得到稳定灰度。"
      caption="procedural pattern 的问题不是函数不能计算，而是像素采样率无法表示全部细节；filter width 给出应该平均的局部范围。"
    >
      <ArrowDefs />
      <text x={360} y={34} textAnchor="middle" fontSize={18} fontWeight={700} fill={primary}>filter width：把任意变化率变成可过滤的 UV 范围</text>
      <rect x={34} y={92} width={286} height={206} rx={16} fill={danger} fillOpacity={0.06} stroke={danger} strokeWidth={2} />
      <text x={177} y={124} textAnchor="middle" fontSize={15} fontWeight={700} fill={danger}>point sample</text>
      {Array.from({ length: 8 }, (_, index) => <rect key={`point-${index}`} x={62 + index * 28} y={162} width={18} height={86} fill={index % 2 === 0 ? danger : surface} stroke={border} strokeWidth={1} />)}
      <text x={177} y={274} textAnchor="middle" fontSize={12} fill={secondary}>checker edge → stairs / crawl</text>
      <Arrow x1={348} y1={194} x2={382} y2={194} stroke={accent} />
      <rect x={400} y={92} width={286} height={206} rx={16} fill={success} fillOpacity={0.06} stroke={success} strokeWidth={2} />
      <text x={543} y={124} textAnchor="middle" fontSize={15} fontWeight={700} fill={success}>area average</text>
      {Array.from({ length: 8 }, (_, index) => {
        const opacity = [0.12, 0.38, 0.76, 0.46, 0.18, 0.64, 0.88, 0.2][index];
        return <rect key={`average-${index}`} x={428 + index * 28} y={162} width={18} height={86} fill={accent} fillOpacity={opacity} stroke={border} strokeWidth={1} />;
      })}
      <text x={543} y={274} textAnchor="middle" fontSize={12} fill={secondary}>uv ± 0.5 × filterwidth</text>
      <rect x={122} y={338} width={476} height={32} rx={11} fill={warning} fillOpacity={0.1} stroke={warning} />
      <text x={360} y={359} textAnchor="middle" fontSize={13} fill={primary}>overestimate slightly → blur; underestimate → alias</text>
    </Frame>
  );
}

export function GpuGemsCh25MipmapEncodingDiagram() {
  const levels = Array.from({ length: 8 }, (_, index) => ({ level: index, size: 128 / 2 ** index }));
  return (
    <Frame
      ariaLabel="编码 mipmap 图：为每一级 mipmap 写入对应的 level 常量，纹理硬件根据输入坐标的变化选择并插值 mip level；返回值可解码为 log2 filter width。"
      caption="把 mip level 当作测量仪：硬件本来要用它选择纹理过滤范围，章节利用这个副作用把级别读回来，再恢复 filter width。"
    >
      <ArrowDefs />
      <text x={360} y={34} textAnchor="middle" fontSize={18} fontWeight={700} fill={primary}>filterMap：让 mipmap level 成为可读的测量信号</text>
      <text x={42} y={78} fontSize={13} fontWeight={700} fill={accent}>mipmap level</text>
      <text x={222} y={78} fontSize={13} fontWeight={700} fill={secondary}>stored value</text>
      <text x={450} y={78} fontSize={13} fontWeight={700} fill={secondary}>texel size</text>
      {levels.map((item) => {
        const y = 92 + item.level * 28;
        const width = Math.max(12, item.size * 0.9);
        return (
          <g key={item.level}>
            <rect x={34} y={y} width={132} height={21} rx={6} fill={accent} fillOpacity={0.06} stroke={border} />
            <text x={50} y={y + 15} fontSize={12} fontWeight={700} fill={accent}>level {item.level}</text>
            <rect x={224} y={y + 2} width={56} height={17} rx={4} fill={warning} fillOpacity={0.18 + item.level * 0.06} stroke={warning} />
            <text x={252} y={y + 15} textAnchor="middle" fontSize={11} fill={primary}>{item.level}</text>
            <rect x={450} y={y + 2} width={width} height={17} rx={4} fill="url(#ch25-mip-gradient)" stroke={success} />
            <text x={610} y={y + 15} fontSize={11} fill={secondary}>{item.size === 1 ? "1×1" : `${item.size}×${item.size}`}</text>
          </g>
        );
      })}
      <Arrow x1={324} y1={194} x2={404} y2={194} stroke={warning} />
      <rect x={312} y={320} width={396} height={42} rx={12} fill={success} fillOpacity={0.1} stroke={success} />
      <text x={510} y={345} textAnchor="middle" fontSize={13} fill={primary}>texture lookup → fractional level → log2 width</text>
    </Frame>
  );
}

export function GpuGemsCh25FilterWidthPipelineDiagram() {
  const stages = [
    { x: 28, title: "arbitrary v", detail: "procedural value", color: accent },
    { x: 178, title: "filterMap", detail: "encoded mip", color: warning },
    { x: 328, title: "log2 width", detail: "decode level", color: success },
    { x: 478, title: "exp2", detail: "width", color: danger },
    { x: 628, title: "prefilter", detail: "average", color: accent },
  ];
  return (
    <Frame
      ariaLabel="filter width 计算流程：任意 procedural quantity 生成纹理坐标，使用编码 filterMap 做一次纹理查找，解码返回的 mipmap level 得到 log2 width，再通过 exp2 恢复宽度并用于抗锯齿。"
      caption="运行时只需一次特殊纹理查找和少量解码指令，就能在不支持 ddx/ddy 的 profile 上近似 filterwidth。"
    >
      <ArrowDefs />
      <text x={360} y={34} textAnchor="middle" fontSize={18} fontWeight={700} fill={primary}>texture-based filter width：hardware lookup → width estimate</text>
      {stages.map((stage, index) => (
        <g key={stage.title}>
          <rect x={stage.x} y={106} width={88} height={154} rx={15} fill={stage.color} fillOpacity={0.08} stroke={stage.color} strokeWidth={2} />
          <text x={stage.x + 44} y={139} textAnchor="middle" fontSize={13} fontWeight={700} fill={stage.color}>{stage.title}</text>
          {index === 0 && <><path d={`M ${stage.x + 18} 208 C ${stage.x + 30} 180, ${stage.x + 48} 230, ${stage.x + 70} 170`} fill="none" stroke={accent} strokeWidth={3} /><circle cx={stage.x + 47} cy={194} r={7} fill={warning} /></>}
          {index === 1 && <><rect x={stage.x + 20} y={172} width={48} height={38} fill="url(#ch25-mip-gradient)" stroke={warning} strokeWidth={2} /><line x1={stage.x + 24} y1={202} x2={stage.x + 62} y2={180} stroke={warning} strokeWidth={2} /></>}
          {index === 2 && <><text x={stage.x + 44} y={195} textAnchor="middle" fontSize={20} fontWeight={700} fill={success}>ℓ₂</text><line x1={stage.x + 20} y1={214} x2={stage.x + 68} y2={214} stroke={success} strokeWidth={3} /></>}
          {index === 3 && <><text x={stage.x + 44} y={198} textAnchor="middle" fontSize={20} fontWeight={700} fill={danger}>2⁻ˡ</text><circle cx={stage.x + 44} cy={224} r={6} fill={danger} /></>}
          {index === 4 && <><rect x={stage.x + 18} y={174} width={52} height={36} fill={surface} stroke={accent} strokeWidth={2} /><circle cx={stage.x + 44} cy={192} r={13} fill="url(#ch25-signal-gradient)" /></>}
          <text x={stage.x + 44} y={240} textAnchor="middle" fontSize={11} fill={secondary}>{stage.detail}</text>
          {index < stages.length - 1 && <Arrow x1={stage.x + 94} y1={190} x2={stage.x + 136} y2={190} stroke={stage.color} />}
        </g>
      ))}
      <rect x={118} y={320} width={484} height={40} rx={12} fill={accent} fillOpacity={0.08} stroke={accent} />
      <text x={360} y={345} textAnchor="middle" fontSize={13} fill={primary}>same antialiasing contract as ddx/ddy, different hardware path</text>
    </Frame>
  );
}

export function GpuGemsCh25LimitationsDiagram() {
  return (
    <Frame
      ariaLabel="filter width 估计的上下限图：纹理 mipmap 的最高级别和最低级别会夹住可测范围，过快变化会被低估，过慢变化会被高估。"
      caption="filterMap 不是无限精度的导数仪：mipmap 层数决定可测范围，超出范围时必须接受误差、扩展资源或改用标准 derivative。"
    >
      <ArrowDefs />
      <text x={360} y={34} textAnchor="middle" fontSize={18} fontWeight={700} fill={primary}>mipmap limits：fast change 与 slow change 都会被夹断</text>
      <line x1={76} y1={246} x2={644} y2={246} stroke={border} strokeWidth={2} />
      <line x1={140} y1={108} x2={140} y2={286} stroke={danger} strokeWidth={3} strokeDasharray="7 5" />
      <line x1={560} y1={108} x2={560} y2={286} stroke={success} strokeWidth={3} strokeDasharray="7 5" />
      <text x={140} y={94} textAnchor="middle" fontSize={13} fontWeight={700} fill={danger}>too large</text>
      <text x={560} y={94} textAnchor="middle" fontSize={13} fontWeight={700} fill={success}>too small</text>
      <path d="M 94 220 C 166 208, 214 180, 286 154 C 362 126, 446 124, 626 116" fill="none" stroke={accent} strokeWidth={4} />
      <circle cx={140} cy={204} r={9} fill={danger} /><circle cx={560} cy={120} r={9} fill={success} />
      <text x={236} y={292} textAnchor="middle" fontSize={12} fill={secondary}>rapid value change: top mip cannot distinguish width above limit</text>
      <text x={456} y={324} textAnchor="middle" fontSize={12} fill={secondary}>slow value change: base mip limits smallest measurable width</text>
      <rect x={134} y={350} width={452} height={28} rx={10} fill={warning} fillOpacity={0.1} stroke={warning} />
      <text x={360} y={369} textAnchor="middle" fontSize={12} fill={primary}>choose mip depth, compression, or fallback based on expected range</text>
    </Frame>
  );
}

export function GpuGemsCh25FilterWidthLab() {
  const [scale, setScale] = useState(0.48);
  const [motion, setMotion] = useState(0.34);
  const [mipLevels, setMipLevels] = useState(0.62);
  const [quality, setQuality] = useState(0.56);
  const [method, setMethod] = useState("texture");

  const reset = () => {
    setScale(0.48);
    setMotion(0.34);
    setMipLevels(0.62);
    setQuality(0.56);
    setMethod("texture");
  };

  const textureWidth = rounded(Math.min(1, 0.08 + scale * 0.58 + motion * 0.28));
  const derivativeWidth = rounded(Math.min(1, 0.06 + scale * 0.6 + motion * 0.32));
  const width = method === "texture" ? rounded(Math.min(1, textureWidth + (1 - mipLevels) * 0.08)) : derivativeWidth;
  const alias = rounded(Math.min(1, (1 - quality) * 0.45 + Math.abs(width - derivativeWidth) * 0.75 + (1 - mipLevels) * 0.18));
  const cost = rounded(method === "texture" ? 0.24 + mipLevels * 0.18 + quality * 0.14 : 0.18 + quality * 0.14);
  const methodName = method === "texture" ? "encoded filterMap" : "ddx / ddy";
  const label = `Filter width 实验：method ${methodName}，scale ${scale.toFixed(2)}，motion ${motion.toFixed(2)}，mip levels ${mipLevels.toFixed(2)}，quality ${quality.toFixed(2)}，width ${width.toFixed(2)}，alias ${alias.toFixed(2)}，cost ${cost.toFixed(2)}。`;

  return (
    <section data-visual-kind="gpu-gems-ch25-filter-width-estimates" className="not-prose my-6 rounded-card border border-border bg-elevated p-5" aria-label="Filter Width 交互实验：比较编码 filterMap 与 ddx/ddy，调整图案 scale、motion、mipmap 范围和 quality">
      <div className="mb-4 flex flex-wrap items-baseline justify-between gap-3">
        <div>
          <p className="text-[11px] uppercase tracking-[0.18em] text-secondary">Filter Width Lab</p>
          <h4 className="mt-1 text-[15px] font-semibold text-primary">先预测：mipmap 层数不足时，width 会在哪一端失真？</h4>
        </div>
        <span className="rounded-control border border-accent px-2 py-1 text-[11px] text-accent">可交互</span>
      </div>
      <div className="grid gap-5 md:grid-cols-[1fr_260px] md:items-center">
        <svg viewBox="0 0 560 390" role="img" aria-label={label} className="w-full">
          <ArrowDefs />
          <rect x={12} y={18} width={536} height={354} rx={18} fill={surface} stroke={border} />
          <text x={32} y={46} fontSize={14} fontWeight={700} fill={primary}>procedural checker preview</text>
          <text x={526} y={46} textAnchor="end" fontSize={12} fill={accent}>{methodName}</text>
          <rect x={56} y={82} width={448} height={164} rx={12} fill={border} fillOpacity={0.22} stroke={border} />
          {Array.from({ length: 14 }, (_, index) => {
            const x = 66 + index * 32;
            const phase = index * (0.8 + scale * 4.2) + motion * 3;
            const raw = Math.sin(phase) > 0 ? 1 : 0;
            const filtered = rounded(Math.min(1, Math.max(0, 0.5 + Math.sin(phase) * (0.28 + quality * 0.18 + width * 0.12))));
            const value = method === "texture" ? filtered : rounded(Math.min(1, raw * 0.18 + filtered * 0.82));
            return <rect key={`checker-${index}`} x={x} y={222 - value * 108} width={22} height={value * 108} rx={4} fill={value > 0.5 ? accent : warning} fillOpacity={0.4 + quality * 0.42} />;
          })}
          <line x1={56} y1={222} x2={504} y2={222} stroke={border} strokeWidth={2} />
          <text x={66} y={270} fontSize={12} fill={secondary}>estimated width {width.toFixed(2)} · reference {derivativeWidth.toFixed(2)}</text>
          <rect x={66} y={288} width={428} height={26} rx={8} fill={border} fillOpacity={0.35} />
          <rect x={66} y={288} width={428 * cost} height={26} rx={8} fill={success} fillOpacity={0.54} />
          <text x={76} y={306} fontSize={11} fill={primary}>cost {cost.toFixed(2)} · alias {alias.toFixed(2)}</text>
          <text x={66} y={346} fontSize={11} fill={secondary}>{mipLevels < 0.35 ? "mipmap range is narrow: expect clamping" : "mipmap range covers the current motion"} · {quality > 0.7 ? "stable average" : "more alias remains"}</text>
        </svg>
        <div className="space-y-3">
          <label className="block text-sm text-primary" htmlFor="ch25-method">method</label>
          <select id="ch25-method" className="min-h-11 w-full rounded-control border border-border bg-elevated px-3 py-2 text-sm text-primary" value={method} onChange={(event) => setMethod(event.target.value)} aria-label="选择 filter width 方法">
            <option value="texture">encoded filterMap</option>
            <option value="derivative">ddx / ddy</option>
          </select>
          <label className="block text-sm text-primary" htmlFor="ch25-scale">pattern scale：{scale.toFixed(2)}</label>
          <input id="ch25-scale" className="min-h-11 w-full accent-accent" type="range" min="0.08" max="0.9" step="0.02" value={scale} onChange={(event) => setScale(Number(event.target.value))} aria-label="调整 pattern scale" />
          <label className="block text-sm text-primary" htmlFor="ch25-motion">screen motion：{motion.toFixed(2)}</label>
          <input id="ch25-motion" className="min-h-11 w-full accent-accent" type="range" min="0" max="0.9" step="0.02" value={motion} onChange={(event) => setMotion(Number(event.target.value))} aria-label="调整 screen motion" />
          <label className="block text-sm text-primary" htmlFor="ch25-mips">mipmap range：{mipLevels.toFixed(2)}</label>
          <input id="ch25-mips" className="min-h-11 w-full accent-accent" type="range" min="0.15" max="1" step="0.02" value={mipLevels} onChange={(event) => setMipLevels(Number(event.target.value))} aria-label="调整 mipmap range" />
          <label className="block text-sm text-primary" htmlFor="ch25-quality">prefilter quality：{quality.toFixed(2)}</label>
          <input id="ch25-quality" className="min-h-11 w-full accent-accent" type="range" min="0.15" max="1" step="0.02" value={quality} onChange={(event) => setQuality(Number(event.target.value))} aria-label="调整 prefilter quality" />
          <button type="button" aria-label="重置 Filter Width 实验" onClick={reset} className="min-h-11 w-full rounded-control border border-border px-3 py-2 text-sm text-secondary hover:border-accent hover:text-primary">重置实验</button>
          <p className="text-xs text-secondary" role="status">观察：texture method 用一次硬件查找换取 profile 兼容性；mipmap 范围太窄会夹断 width，quality 低会增加 checker alias。</p>
        </div>
      </div>
    </section>
  );
}
