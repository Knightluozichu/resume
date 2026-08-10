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

function Frame({ ariaLabel, caption, children }: { ariaLabel: string; caption: string; children: ReactNode }) {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox="0 0 720 400" role="img" aria-label={ariaLabel} className="mx-auto block h-auto w-full max-w-[720px]">{children}</svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">{caption}</figcaption>
    </figure>
  );
}

function ArrowDefs({ prefix }: { prefix: string }) {
  return (
    <defs>
      <marker id={`${prefix}-arrow`} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill={accent} /></marker>
      <linearGradient id={`${prefix}-visibility`} x1="0" x2="1"><stop offset="0" stopColor={danger} stopOpacity="0.22" /><stop offset="0.55" stopColor={warning} stopOpacity="0.54" /><stop offset="1" stopColor={success} stopOpacity="0.8" /></linearGradient>
      <linearGradient id={`${prefix}-depth`} x1="0" x2="1"><stop offset="0" stopColor={accent} stopOpacity="0.22" /><stop offset="1" stopColor={success} stopOpacity="0.74" /></linearGradient>
    </defs>
  );
}

function Arrow({ prefix, x1, y1, x2, y2, stroke = accent }: { prefix: string; x1: number; y1: number; x2: number; y2: number; stroke?: string }) {
  return <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={stroke} strokeWidth={3} markerEnd={`url(#${prefix}-arrow)`} />;
}

export function GpuGemsCh29VisibilityLevelsDiagram() {
  return (
    <Frame ariaLabel="可见性剔除层级图：frustum culling 在 CPU 侧排除视锥外对象，occlusion query 在几何级别跳过被遮挡对象，early-z 在光栅化级别跳过不可见 fragment。" caption="三种判断处于不同粒度：不要用 occlusion query 代替便宜的 frustum test，也不要把 early-z 当成已经避免了对象提交。">
      <ArrowDefs prefix="ch29-levels" />
      <text x={360} y={30} textAnchor="middle" fontSize={18} fontWeight={700} fill={primary}>visibility levels：越早拒绝，节省的工作越多</text>
      <rect x={38} y={82} width={198} height={212} rx={16} fill={danger} fillOpacity={0.07} stroke={danger} strokeWidth={2} />
      <text x={137} y={116} textAnchor="middle" fontSize={15} fontWeight={700} fill={danger}>frustum culling</text>
      <text x={137} y={140} textAnchor="middle" fontSize={12} fill={secondary}>CPU / object test</text>
      <path d="M 72 250 L 137 164 L 202 250 Z" fill={danger} fillOpacity={0.12} stroke={danger} strokeWidth={2} />
      <circle cx={108} cy={224} r={8} fill={success} /><circle cx={178} cy={238} r={8} fill={border} />
      <text x={137} y={276} textAnchor="middle" fontSize={11} fill={secondary}>out of view → skip draw</text>
      <Arrow prefix="ch29-levels" x1={258} y1={188} x2={294} y2={188} stroke={danger} />
      <rect x={304} y={82} width={198} height={212} rx={16} fill={warning} fillOpacity={0.07} stroke={warning} strokeWidth={2} />
      <text x={403} y={116} textAnchor="middle" fontSize={15} fontWeight={700} fill={warning}>occlusion query</text>
      <text x={403} y={140} textAnchor="middle" fontSize={12} fill={secondary}>GPU / object test</text>
      <rect x={338} y={170} width={130} height={72} rx={10} fill={surface} stroke={warning} />
      <rect x={354} y={190} width={48} height={34} rx={6} fill={warning} fillOpacity={0.22} stroke={warning} /><rect x={416} y={184} width={34} height={46} rx={5} fill={border} />
      <text x={403} y={270} textAnchor="middle" fontSize={11} fill={secondary}>hidden object → skip geometry</text>
      <Arrow prefix="ch29-levels" x1={524} y1={188} x2={560} y2={188} stroke={warning} />
      <rect x={570} y={82} width={112} height={212} rx={16} fill={success} fillOpacity={0.07} stroke={success} strokeWidth={2} />
      <text x={626} y={116} textAnchor="middle" fontSize={14} fontWeight={700} fill={success}>early-z</text>
      <text x={626} y={140} textAnchor="middle" fontSize={11} fill={secondary}>rasterizer</text>
      <line x1={592} y1={202} x2={660} y2={202} stroke={success} strokeWidth={6} /><circle cx={610} cy={202} r={9} fill={success} /><circle cx={644} cy={202} r={9} fill={border} />
      <text x={626} y={270} textAnchor="middle" fontSize={11} fill={secondary}>hidden fragment → skip shader</text>
      <rect x={128} y={334} width={464} height={30} rx={10} fill={accent} fillOpacity={0.1} stroke={accent} /><text x={360} y={354} textAnchor="middle" fontSize={12} fill={primary}>front-to-back order helps query and early-z share depth information</text>
    </Frame>
  );
}

export function GpuGemsCh29QuerySequenceDiagram() {
  const steps = [
    { x: 26, title: "create", detail: "query handle", color: accent },
    { x: 146, title: "mask", detail: "no color / depth write", color: warning },
    { x: 266, title: "begin", detail: "reset counter", color: success },
    { x: 386, title: "bbox", detail: "depth test only", color: danger },
    { x: 506, title: "end", detail: "visible pixels", color: warning },
    { x: 626, title: "draw", detail: "if pixels > 0", color: success },
  ];
  return (
    <Frame ariaLabel="occlusion query 操作序列：创建 query，关闭 color/depth 写入，开始计数，渲染 bounding box，结束并读取 visible pixels，大于阈值才绘制完整对象。" caption="bounding box 只是探针，测试不能改变 color 或 depth buffer；结果大于零或阈值时，才提交昂贵的完整对象。">
      <ArrowDefs prefix="ch29-sequence" />
      <text x={360} y={30} textAnchor="middle" fontSize={18} fontWeight={700} fill={primary}>occlusion query：用廉价 bbox 代理复杂对象</text>
      {steps.map((step, index) => (
        <g key={step.title}>
          <rect x={step.x} y={102} width={74} height={138} rx={13} fill={step.color} fillOpacity={0.08} stroke={step.color} strokeWidth={2} />
          <text x={step.x + 37} y={136} textAnchor="middle" fontSize={13} fontWeight={700} fill={step.color}>{step.title}</text>
          {index === 0 && <><circle cx={step.x + 37} cy={181} r={21} fill={accent} fillOpacity={0.2} stroke={accent} /><text x={step.x + 37} y={187} textAnchor="middle" fontSize={13} fill={primary}>Q</text></>}
          {index === 1 && <><rect x={step.x + 18} y={164} width={38} height={38} rx={6} fill={surface} stroke={warning} /><path d={`M ${step.x + 22} 170 L ${step.x + 52} 196`} stroke={warning} strokeWidth={3} /></>}
          {index === 2 && <><circle cx={step.x + 37} cy={182} r={21} fill={success} fillOpacity={0.2} stroke={success} /><text x={step.x + 37} y={188} textAnchor="middle" fontSize={14} fill={success}>0</text></>}
          {index === 3 && <><rect x={step.x + 17} y={165} width={40} height={34} rx={5} fill={danger} fillOpacity={0.2} stroke={danger} /><path d={`M ${step.x + 24} 193 L ${step.x + 36} 171 L ${step.x + 50} 193`} fill="none" stroke={danger} strokeWidth={3} /></>}
          {index === 4 && <><rect x={step.x + 17} y={168} width={40} height={30} rx={5} fill={warning} fillOpacity={0.2} stroke={warning} /><text x={step.x + 37} y={188} textAnchor="middle" fontSize={12} fill={warning}>128</text></>}
          {index === 5 && <><rect x={step.x + 17} y={168} width={40} height={30} rx={5} fill={success} fillOpacity={0.2} stroke={success} /><path d={`M ${step.x + 25} 184 L ${step.x + 34} 192 L ${step.x + 51} 172`} fill="none" stroke={success} strokeWidth={3} /></>}
          <text x={step.x + 37} y={224} textAnchor="middle" fontSize={11} fill={secondary}>{step.detail}</text>
          {index < steps.length - 1 && <Arrow prefix="ch29-sequence" x1={step.x + 80} y1={174} x2={step.x + 108} y2={174} stroke={step.color} />}
        </g>
      ))}
      <rect x={108} y={292} width={504} height={42} rx={12} fill={danger} fillOpacity={0.1} stroke={danger} /><text x={360} y={318} textAnchor="middle" fontSize={13} fill={primary}>state contract：query 期间只测，不写屏幕、不写 depth</text>
      <text x={360} y={368} textAnchor="middle" fontSize={12} fill={secondary}>阈值可大于 0：用可见像素数量决定是否值得绘制完整对象</text>
    </Frame>
  );
}

export function GpuGemsCh29AsyncQueryDiagram() {
  return (
    <Frame ariaLabel="异步 occlusion query 图：naive 方案在 query result 处等待 GPU 完成并造成 CPU/GPU stall；多 query 和上一帧读取让 CPU 继续做 AI、physics 与其他工作。" caption="查询的收益来自跳过复杂对象，但同步读取结果会破坏 CPU/GPU 并行；把结果延迟到下一帧是关键工程折中。">
      <ArrowDefs prefix="ch29-async" />
      <text x={360} y={30} textAnchor="middle" fontSize={18} fontWeight={700} fill={primary}>async query：用时间换掉 pipeline flush</text>
      <rect x={36} y={76} width={304} height={224} rx={16} fill={danger} fillOpacity={0.06} stroke={danger} strokeWidth={2} />
      <text x={188} y={108} textAnchor="middle" fontSize={15} fontWeight={700} fill={danger}>naive same-frame read</text>
      <text x={58} y={144} fontSize={12} fill={secondary}>CPU</text><line x1={94} y1={140} x2={300} y2={140} stroke={border} strokeWidth={8} /><rect x={102} y={132} width={76} height={16} rx={4} fill={accent} /><rect x={186} y={132} width={92} height={16} rx={4} fill={warning} />
      <text x={58} y={190} fontSize={12} fill={secondary}>GPU</text><line x1={94} y1={186} x2={300} y2={186} stroke={border} strokeWidth={8} /><rect x={102} y={178} width={128} height={16} rx={4} fill={success} /><rect x={238} y={178} width={54} height={16} rx={4} fill={danger} />
      <line x1={182} y1={118} x2={182} y2={226} stroke={danger} strokeDasharray="6 5" strokeWidth={2} /><text x={188} y={250} textAnchor="middle" fontSize={12} fill={danger}>get result → CPU waits</text>
      <Arrow prefix="ch29-async" x1={358} y1={186} x2={392} y2={186} stroke={danger} />
      <rect x={400} y={76} width={284} height={224} rx={16} fill={success} fillOpacity={0.06} stroke={success} strokeWidth={2} />
      <text x={542} y={108} textAnchor="middle" fontSize={15} fontWeight={700} fill={success}>next-frame read</text>
      <text x={424} y={144} fontSize={12} fill={secondary}>CPU</text><line x1={460} y1={140} x2={648} y2={140} stroke={border} strokeWidth={8} /><rect x={468} y={132} width={70} height={16} rx={4} fill={accent} /><rect x={544} y={132} width={92} height={16} rx={4} fill={warning} />
      <text x={424} y={190} fontSize={12} fill={secondary}>GPU</text><line x1={460} y1={186} x2={648} y2={186} stroke={border} strokeWidth={8} /><rect x={468} y={178} width={72} height={16} rx={4} fill={success} /><rect x={546} y={178} width={86} height={16} rx={4} fill={success} fillOpacity={0.55} />
      <line x1={526} y1={118} x2={526} y2={226} stroke={success} strokeDasharray="6 5" strokeWidth={2} /><text x={542} y={250} textAnchor="middle" fontSize={12} fill={success}>AI / physics fill the gap</text>
      <rect x={116} y={334} width={488} height={30} rx={10} fill={warning} fillOpacity={0.1} stroke={warning} /><text x={360} y={354} textAnchor="middle" fontSize={12} fill={primary}>visible last frame → draw object · invisible → test bbox</text>
    </Frame>
  );
}

export function GpuGemsCh29SortAndBoundsDiagram() {
  return (
    <Frame ariaLabel="排序与包围盒图：opaque objects 按 front-to-back 先写 depth 并充当 occluder，translucent objects 只能作为 occludee 并按 back-to-front 绘制；过大的 bounding box 会产生错误可见结果。" caption="排序让已渲染的 opaque 几何成为后续对象的遮挡者；包围盒必须在测试成本、紧致度和动画更新成本间折中。">
      <ArrowDefs prefix="ch29-sort" />
      <text x={360} y={30} textAnchor="middle" fontSize={18} fontWeight={700} fill={primary}>sort and bound：让深度结果可复用</text>
      <text x={48} y={76} fontSize={13} fontWeight={700} fill={success}>opaque · front → back</text>
      {Array.from({ length: 4 }, (_, index) => { const x = 54 + index * 92; return <g key={`opaque-${index}`}><rect x={x} y={100 + index * 11} width={62} height={68} rx={8} fill={index === 0 ? success : accent} fillOpacity={0.16 + index * 0.03} stroke={index === 0 ? success : accent} /><text x={x + 31} y={138 + index * 11} textAnchor="middle" fontSize={12} fill={primary}>{index === 0 ? "occluder" : `obj ${index + 1}`}</text></g>; })}
      <Arrow prefix="ch29-sort" x1={430} y1={132} x2={468} y2={132} stroke={success} />
      <text x={486} y={110} fontSize={13} fontWeight={700} fill={warning}>translucent · back → front</text>
      {Array.from({ length: 3 }, (_, index) => { const x = 492 + index * 58; return <rect key={`trans-${index}`} x={x} y={145 + index * 18} width={48} height={54} rx={7} fill={warning} fillOpacity={0.16} stroke={warning} />; })}
      <text x={578} y={252} textAnchor="middle" fontSize={11} fill={secondary}>occludee only</text>
      <rect x={52} y={272} width={270} height={76} rx={13} fill={accent} fillOpacity={0.08} stroke={accent} /><text x={187} y={299} textAnchor="middle" fontSize={13} fontWeight={700} fill={accent}>tight bounding box</text><text x={187} y={322} textAnchor="middle" fontSize={11} fill={secondary}>less false visible · lower query cost</text>
      <rect x={398} y={272} width={270} height={76} rx={13} fill={danger} fillOpacity={0.08} stroke={danger} /><text x={533} y={299} textAnchor="middle" fontSize={13} fontWeight={700} fill={danger}>oversized box</text><text x={533} y={322} textAnchor="middle" fontSize={11} fill={secondary}>box visible, object hidden → popping</text>
    </Frame>
  );
}

export function GpuGemsCh29OcclusionLab() {
  const [strategy, setStrategy] = useState("next-frame");
  const [complexity, setComplexity] = useState(0.72);
  const [occluded, setOccluded] = useState(0.68);
  const [highResolution, setHighResolution] = useState(false);

  const reset = () => { setStrategy("next-frame"); setComplexity(0.72); setOccluded(0.68); setHighResolution(false); };
  const queryCost = rounded(0.12 + complexity * 0.22 + (highResolution ? 0.18 : 0));
  const savedGeometry = rounded(occluded * complexity * (strategy === "next-frame" ? 0.92 : 0.54));
  const netGain = rounded(Math.max(0, savedGeometry - queryCost));
  const visiblePixels = rounded(1 - occluded + (highResolution ? 0.08 : 0));
  const verdict = netGain > 0.35 ? "适合 query：复杂对象且遮挡明显" : netGain > 0.12 ? "边界场景：和直接绘制对测" : "不要 query：测试开销可能更贵";
  const label = `Occlusion Culling 实验：${strategy === "next-frame" ? "next-frame query" : "same-frame query"}，对象复杂度 ${complexity.toFixed(2)}，遮挡比例 ${occluded.toFixed(2)}，${highResolution ? "高分辨率" : "常规分辨率"}，跳过几何 ${savedGeometry.toFixed(2)}，query 成本 ${queryCost.toFixed(2)}，净收益 ${netGain.toFixed(2)}，结论 ${verdict}。`;

  return (
    <section data-visual-kind="gpu-gems-ch29-efficient-occlusion-culling" className="not-prose my-6 rounded-card border border-border bg-elevated p-5" aria-label="Efficient Occlusion Culling 交互实验：比较同步与上一帧查询，调整对象复杂度、遮挡比例和分辨率">
      <div className="mb-4 flex flex-wrap items-baseline justify-between gap-3"><div><p className="text-[11px] uppercase tracking-[0.18em] text-secondary">Efficient Occlusion Culling Lab</p><h4 className="mt-1 text-[15px] font-semibold text-primary">先预测：遮挡率和对象复杂度要多高，query 才值得？</h4></div><span className="rounded-control border border-accent px-2 py-1 text-[11px] text-accent">可交互</span></div>
      <div className="grid gap-5 md:grid-cols-[1fr_260px] md:items-center">
        <svg viewBox="0 0 560 390" role="img" aria-label={label} className="w-full">
          <ArrowDefs prefix="ch29-lab" />
          <rect x={12} y={18} width={536} height={352} rx={18} fill={surface} stroke={border} />
          <text x={32} y={46} fontSize={14} fontWeight={700} fill={primary}>query economics preview</text><text x={526} y={46} textAnchor="end" fontSize={12} fill={netGain > 0.12 ? success : danger}>{strategy === "next-frame" ? "async / next frame" : "sync / same frame"}</text>
          <line x1={56} y1={230} x2={504} y2={230} stroke={border} strokeWidth={2} />
          {Array.from({ length: 12 }, (_, index) => { const objectValue = rounded(0.16 + complexity * (0.3 + index / 20)); const skipped = rounded(Math.min(objectValue, objectValue * occluded * (strategy === "next-frame" ? 0.92 : 0.58))); return <g key={`object-${index}`}><rect x={66 + index * 36} y={230 - objectValue * 116} width={22} height={objectValue * 116} rx={4} fill={warning} fillOpacity={0.48 + complexity * 0.28} /><rect x={66 + index * 36} y={230 - skipped * 88} width={22} height={skipped * 88} rx={4} fill={success} fillOpacity={0.55} /></g>; })}
          <text x={66} y={263} fontSize={11} fill={secondary}>complexity {complexity.toFixed(2)} · occluded {occluded.toFixed(2)} · visible pixels {visiblePixels.toFixed(2)}</text>
          <rect x={66} y={284} width={428} height={24} rx={7} fill={border} fillOpacity={0.32} /><rect x={66} y={284} width={428 * Math.min(1, savedGeometry)} height={24} rx={7} fill="url(#ch29-lab-visibility)" /><text x={76} y={301} fontSize={11} fill={primary}>skipped geometry {savedGeometry.toFixed(2)} · query cost {queryCost.toFixed(2)}</text>
          <text x={66} y={337} fontSize={11} fill={netGain > 0.12 ? success : danger}>net gain {netGain.toFixed(2)} · {verdict}</text>
        </svg>
        <div className="space-y-3">
          <button type="button" className="min-h-11 w-full rounded-control border border-accent px-3 py-2 text-sm text-primary hover:border-accent" aria-pressed={strategy === "next-frame"} onClick={() => setStrategy((current) => current === "next-frame" ? "same-frame" : "next-frame")}>切换查询时序：{strategy === "next-frame" ? "上一帧读取" : "同帧读取"}</button>
          <label className="block text-sm text-primary" htmlFor="ch29-strategy">查询策略</label>
          <select id="ch29-strategy" className="min-h-11 w-full rounded-control border border-border bg-elevated px-3 py-2 text-sm text-primary" value={strategy} onChange={(event) => setStrategy(event.target.value)} aria-label="选择 occlusion query 策略"><option value="next-frame">next-frame query</option><option value="same-frame">same-frame query</option></select>
          <label className="block text-sm text-primary" htmlFor="ch29-complexity">对象复杂度：{complexity.toFixed(2)}</label><input id="ch29-complexity" className="min-h-11 w-full accent-accent" type="range" min="0.1" max="1" step="0.05" value={complexity} onChange={(event) => setComplexity(Number(event.target.value))} aria-label="调整对象复杂度" />
          <label className="block text-sm text-primary" htmlFor="ch29-occluded">遮挡比例：{occluded.toFixed(2)}</label><input id="ch29-occluded" className="min-h-11 w-full accent-accent" type="range" min="0" max="0.95" step="0.05" value={occluded} onChange={(event) => setOccluded(Number(event.target.value))} aria-label="调整遮挡比例" />
          <label className="flex min-h-11 items-center gap-3 text-sm text-primary" htmlFor="ch29-resolution"><input id="ch29-resolution" className="size-5 accent-accent" type="checkbox" checked={highResolution} onChange={(event) => setHighResolution(event.target.checked)} />高分辨率 bbox 测试</label>
          <button type="button" className="min-h-11 w-full rounded-control border border-border px-3 py-2 text-sm text-primary hover:border-accent" onClick={reset}>重置实验</button>
          <p className="text-xs leading-5 text-secondary">预测：复杂度和遮挡比例都低时，query 可能比直接绘制更贵；同帧读取还会增加 CPU/GPU stall。</p>
        </div>
      </div>
    </section>
  );
}
