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
        id="ch23-arrow"
        viewBox="0 0 10 10"
        refX="8"
        refY="5"
        markerWidth="6"
        markerHeight="6"
        orient="auto-start-reverse"
      >
        <path d="M 0 0 L 10 5 L 0 10 z" fill={accent} />
      </marker>
      <radialGradient id="ch23-coc-gradient">
        <stop offset="0" stopColor={warning} stopOpacity="0.76" />
        <stop offset="0.55" stopColor={accent} stopOpacity="0.34" />
        <stop offset="1" stopColor={danger} stopOpacity="0" />
      </radialGradient>
      <linearGradient id="ch23-depth-gradient" x1="0" x2="1">
        <stop offset="0" stopColor={danger} stopOpacity="0.5" />
        <stop offset="0.5" stopColor={success} stopOpacity="0.48" />
        <stop offset="1" stopColor={accent} stopOpacity="0.5" />
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
      markerEnd="url(#ch23-arrow)"
    />
  );
}

export function GpuGemsCh23DofConceptDiagram() {
  return (
    <Frame
      ariaLabel="景深概念图：相机通过镜头观察前景、中景和背景；中景位于 focus plane，点成像，前景和背景偏离焦平面并形成大小不同的 circle of confusion。"
      caption="景深不是全屏统一模糊：每个物体相对 focus plane 的距离决定 CoC 大小，光圈越大，离焦区域越明显。"
    >
      <ArrowDefs />
      <text x={360} y={34} textAnchor="middle" fontSize={18} fontWeight={700} fill={primary}>depth of field：焦平面内清晰，焦平面外形成 CoC</text>
      <path d="M 54 174 L 126 130 L 126 218 Z" fill={accent} fillOpacity={0.16} stroke={accent} strokeWidth={2} />
      <circle cx={83} cy={174} r={8} fill={accent} />
      <text x={90} y={252} textAnchor="middle" fontSize={13} fill={accent}>camera</text>
      <line x1={160} y1={84} x2={160} y2={290} stroke={border} strokeWidth={2} strokeDasharray="8 7" />
      <text x={160} y={316} textAnchor="middle" fontSize={12} fill={secondary}>lens aperture</text>
      <line x1={350} y1={86} x2={350} y2={292} stroke={success} strokeWidth={3} />
      <text x={350} y={316} textAnchor="middle" fontSize={13} fontWeight={700} fill={success}>focus plane</text>
      <line x1={180} y1={174} x2={640} y2={174} stroke={border} strokeWidth={2} />
      <circle cx={250} cy={174} r={28} fill="url(#ch23-coc-gradient)" />
      <circle cx={350} cy={174} r={10} fill={success} />
      <circle cx={500} cy={174} r={38} fill="url(#ch23-coc-gradient)" />
      <rect x={226} y={126} width={48} height={48} fill={danger} fillOpacity={0.36} stroke={danger} strokeWidth={2} />
      <rect x={334} y={144} width={32} height={32} fill={success} fillOpacity={0.72} stroke={success} strokeWidth={2} />
      <rect x={462} y={110} width={76} height={76} fill={accent} fillOpacity={0.25} stroke={accent} strokeWidth={2} />
      <text x={250} y={232} textAnchor="middle" fontSize={13} fontWeight={700} fill={danger}>foreground</text>
      <text x={350} y={232} textAnchor="middle" fontSize={13} fontWeight={700} fill={success}>midground</text>
      <text x={500} y={232} textAnchor="middle" fontSize={13} fontWeight={700} fill={accent}>background</text>
      <text x={250} y={258} textAnchor="middle" fontSize={12} fill={secondary}>large CoC</text>
      <text x={350} y={258} textAnchor="middle" fontSize={12} fill={secondary}>small CoC</text>
      <text x={500} y={258} textAnchor="middle" fontSize={12} fill={secondary}>large CoC</text>
      <rect x={142} y={350} width={436} height={30} rx={10} fill={warning} fillOpacity={0.1} stroke={warning} />
      <text x={360} y={370} textAnchor="middle" fontSize={12} fill={primary}>CoC diameter grows with aperture and distance from focus</text>
    </Frame>
  );
}

export function GpuGemsCh23TechniqueSurveyDiagram() {
  const techniques = [
    { name: "ray traced", quality: 5, speed: 1, note: "correct shading, noise", color: danger },
    { name: "accumulation", quality: 5, speed: 2, note: "many scene passes", color: warning },
    { name: "layered", quality: 2, speed: 4, note: "sorted scenes only", color: accent },
    { name: "forward z-buffer", quality: 3, speed: 2, note: "sprites / bleeding", color: success },
    { name: "reverse z-buffer", quality: 3, speed: 5, note: "fast, depth edges", color: accent },
  ];
  return (
    <Frame
      ariaLabel="五种景深技术对比：光线追踪、积累缓冲、分层、正向 z-buffer 和反向 z-buffer；质量、速度与伪影取舍不同。"
      caption="官方章节的结论不是选出唯一算法，而是按目标取舍：正确 shading 偏向 ray tracing，实时速度偏向 z-buffer，后处理质量可考虑 splatting。"
    >
      <ArrowDefs />
      <text x={360} y={34} textAnchor="middle" fontSize={18} fontWeight={700} fill={primary}>technique survey：质量、速度与伪影的三角取舍</text>
      <text x={42} y={78} fontSize={12} fill={secondary}>technique</text>
      <text x={280} y={78} fontSize={12} fill={secondary}>quality</text>
      <text x={422} y={78} fontSize={12} fill={secondary}>speed</text>
      <text x={540} y={78} fontSize={12} fill={secondary}>main concern</text>
      {techniques.map((technique, index) => {
        const y = 98 + index * 47;
        return (
          <g key={technique.name}>
            <rect x={34} y={y} width={648} height={34} rx={9} fill={surface} stroke={border} />
            <text x={48} y={y + 22} fontSize={13} fontWeight={700} fill={technique.color}>{technique.name}</text>
            {Array.from({ length: 5 }, (_, mark) => <rect key={`${technique.name}-q-${mark}`} x={276 + mark * 18} y={y + 10} width={12} height={12} rx={3} fill={mark < technique.quality ? technique.color : border} fillOpacity={mark < technique.quality ? 0.72 : 0.3} />)}
            {Array.from({ length: 5 }, (_, mark) => <rect key={`${technique.name}-s-${mark}`} x={418 + mark * 18} y={y + 10} width={12} height={12} rx={3} fill={mark < technique.speed ? success : border} fillOpacity={mark < technique.speed ? 0.72 : 0.3} />)}
            <text x={540} y={y + 22} fontSize={11} fill={secondary}>{technique.note}</text>
          </g>
        );
      })}
      <rect x={122} y={350} width={476} height={30} rx={10} fill={accent} fillOpacity={0.1} stroke={accent} />
      <text x={360} y={370} textAnchor="middle" fontSize={12} fill={primary}>z-buffer techniques deserve the most real-time engineering attention</text>
    </Frame>
  );
}

export function GpuGemsCh23CocPipelineDiagram() {
  const stages = [
    { x: 24, title: "color + depth", detail: "pinhole render", color: accent },
    { x: 174, title: "CoC", detail: "focus / aperture", color: warning },
    { x: 324, title: "blur source", detail: "mip / texture", color: success },
    { x: 474, title: "per-pixel", detail: "select radius", color: danger },
    { x: 624, title: "composite", detail: "normalize alpha", color: accent },
  ];
  return (
    <Frame
      ariaLabel="反向 z-buffer 景深后处理流程：保存颜色与深度，用相机参数计算 circle of confusion，构建多级模糊纹理，再按每个像素 CoC 选择模糊级别并合成。"
      caption="反向 z-buffer 把每个像素的 z 值变成 CoC，再选择 mip 或预模糊纹理；速度高，但深度不连续和颜色 bleeding 需要单独处理。"
    >
      <ArrowDefs />
      <text x={360} y={34} textAnchor="middle" fontSize={18} fontWeight={700} fill={primary}>reverse-mapped z-buffer：z → CoC → variable blur</text>
      {stages.map((stage, index) => (
        <g key={stage.title}>
          <rect x={stage.x} y={104} width={112} height={168} rx={16} fill={stage.color} fillOpacity={0.08} stroke={stage.color} strokeWidth={2} />
          <text x={stage.x + 56} y={137} textAnchor="middle" fontSize={14} fontWeight={700} fill={stage.color}>{stage.title}</text>
          {index === 0 && <><rect x={stage.x + 22} y={164} width={68} height={48} fill="url(#ch23-depth-gradient)" stroke={accent} strokeWidth={2} /><circle cx={stage.x + 44} cy={188} r={7} fill={warning} /><circle cx={stage.x + 72} cy={188} r={7} fill={success} /></>}
          {index === 1 && <><line x1={stage.x + 25} y1={216} x2={stage.x + 87} y2={166} stroke={warning} strokeWidth={3} /><circle cx={stage.x + 57} cy={190} r={10} fill={warning} /></>}
          {index === 2 && <><rect x={stage.x + 22} y={164} width={68} height={48} fill={surface} stroke={success} strokeWidth={2} /><circle cx={stage.x + 56} cy={188} r={18} fill="url(#ch23-coc-gradient)" /></>}
          {index === 3 && <><circle cx={stage.x + 42} cy={188} r={9} fill={danger} /><circle cx={stage.x + 70} cy={188} r={23} fill="url(#ch23-coc-gradient)" /><text x={stage.x + 56} y={238} textAnchor="middle" fontSize={11} fill={secondary}>z chooses radius</text></>}
          {index === 4 && <><rect x={stage.x + 22} y={164} width={68} height={48} fill="url(#ch23-depth-gradient)" stroke={accent} strokeWidth={2} /><circle cx={stage.x + 56} cy={188} r={16} fill="url(#ch23-coc-gradient)" /></>}
          <text x={stage.x + 56} y={250} textAnchor="middle" fontSize={12} fill={secondary}>{stage.detail}</text>
          {index < stages.length - 1 && <Arrow x1={stage.x + 118} y1={190} x2={stage.x + 140} y2={190} stroke={stage.color} />}
        </g>
      ))}
      <rect x={126} y={320} width={468} height={40} rx={12} fill={warning} fillOpacity={0.1} stroke={warning} />
      <text x={360} y={345} textAnchor="middle" fontSize={13} fill={primary}>quality knob: mip filter, jitter, extra samples, layer separation</text>
    </Frame>
  );
}

export function GpuGemsCh23ArtifactDiagram() {
  const panels = [
    { x: 34, title: "depth edge", color: danger, detail: "foreground blur crosses sharp object", kind: "edge" },
    { x: 276, title: "bilinear", color: warning, detail: "mip magnification shows blocks", kind: "mip" },
    { x: 518, title: "pixel bleed", color: accent, detail: "far color leaks into focus", kind: "bleed" },
  ];
  return (
    <Frame
      ariaLabel="景深后处理伪影图：深度不连续导致前景模糊无法正确盖住中景，低级 mip 放大导致块状插值，颜色无区分模糊导致 focus 区域出现 pixel bleeding。"
      caption="三个伪影共享一个根因：后处理只看到有限的颜色与深度证据。修复不是盲目扩大 blur，而是补充 depth samples、过滤、jitter 或 layer mask。"
    >
      <ArrowDefs />
      <text x={360} y={34} textAnchor="middle" fontSize={18} fontWeight={700} fill={primary}>artifact map：CoC 选择正确不代表 visibility 自动正确</text>
      {panels.map((panel) => (
        <g key={panel.title}>
          <rect x={panel.x} y={92} width={168} height={208} rx={16} fill={panel.color} fillOpacity={0.07} stroke={panel.color} strokeWidth={2} />
          <text x={panel.x + 84} y={124} textAnchor="middle" fontSize={15} fontWeight={700} fill={panel.color}>{panel.title}</text>
          {panel.kind === "edge" && <><rect x={panel.x + 28} y={156} width={56} height={80} fill={danger} fillOpacity={0.34} /><rect x={panel.x + 84} y={156} width={56} height={80} fill={success} fillOpacity={0.26} /><circle cx={panel.x + 84} cy={196} r={28} fill="url(#ch23-coc-gradient)" /><line x1={panel.x + 84} y1={148} x2={panel.x + 84} y2={246} stroke={danger} strokeWidth={3} strokeDasharray="5 4" /></>}
          {panel.kind === "mip" && <><rect x={panel.x + 28} y={156} width={112} height={80} fill={surface} stroke={warning} strokeWidth={2} /><path d={`M ${panel.x + 34} 224 L ${panel.x + 60} 180 L ${panel.x + 84} 212 L ${panel.x + 110} 168 L ${panel.x + 134} 216`} fill="none" stroke={warning} strokeWidth={3} /><path d={`M ${panel.x + 34} 224 L ${panel.x + 60} 224 L ${panel.x + 60} 180 L ${panel.x + 84} 180 L ${panel.x + 84} 212 L ${panel.x + 110} 212 L ${panel.x + 110} 168 L ${panel.x + 134} 168`} fill="none" stroke={danger} strokeWidth={2} opacity={0.74} /></>}
          {panel.kind === "bleed" && <><rect x={panel.x + 28} y={156} width={56} height={80} fill={success} fillOpacity={0.4} /><rect x={panel.x + 84} y={156} width={56} height={80} fill={surface} stroke={accent} strokeWidth={2} /><circle cx={panel.x + 84} cy={196} r={28} fill="url(#ch23-coc-gradient)" opacity={0.62} /><path d={`M ${panel.x + 80} 168 C ${panel.x + 104} 178, ${panel.x + 105} 210, ${panel.x + 132} 224`} fill="none" stroke={accent} strokeWidth={3} /></>}
          <text x={panel.x + 84} y={268} textAnchor="middle" fontSize={11} fill={secondary}>{panel.detail}</text>
        </g>
      ))}
      <rect x={112} y={338} width={496} height={34} rx={11} fill={success} fillOpacity={0.1} stroke={success} />
      <text x={360} y={360} textAnchor="middle" fontSize={13} fill={primary}>mitigate with extra depth evidence, better filters, jitter, or per-object layers</text>
    </Frame>
  );
}

export function GpuGemsCh23DofLab() {
  const [focus, setFocus] = useState(0.52);
  const [aperture, setAperture] = useState(0.42);
  const [quality, setQuality] = useState(0.56);
  const [depthEdge, setDepthEdge] = useState(0.32);
  const [technique, setTechnique] = useState("reverse");

  const reset = () => {
    setFocus(0.52);
    setAperture(0.42);
    setQuality(0.56);
    setDepthEdge(0.32);
    setTechnique("reverse");
  };

  const objects = [
    { label: "foreground", depth: 0.2, color: danger },
    { label: "midground", depth: 0.52, color: success },
    { label: "background", depth: 0.84, color: accent },
  ];
  const cocs = objects.map((object) => rounded(Math.min(1, Math.abs(object.depth - focus) * (0.62 + aperture * 1.25))));
  const maxCoc = Math.max(...cocs);
  const costs: Record<string, number> = { ray: 0.92, accumulation: 0.82, layered: 0.44, forward: 0.7, reverse: 0.28 };
  const techniqueNames: Record<string, string> = { ray: "ray traced", accumulation: "accumulation buffer", layered: "layered", forward: "forward z-buffer", reverse: "reverse z-buffer" };
  const cost = rounded(costs[technique] + quality * 0.34 + aperture * 0.18);
  const artifact = rounded(Math.min(1, depthEdge * 0.58 + (1 - quality) * 0.42 + maxCoc * 0.18));
  const label = `景深实验：focus ${focus.toFixed(2)}，aperture ${aperture.toFixed(2)}，quality ${quality.toFixed(2)}，depth edge ${depthEdge.toFixed(2)}，算法 ${techniqueNames[technique]}，最大 CoC ${maxCoc.toFixed(2)}，cost ${cost.toFixed(2)}，artifact ${artifact.toFixed(2)}。`;

  return (
    <section data-visual-kind="gpu-gems-ch23-depth-of-field" className="not-prose my-6 rounded-card border border-border bg-elevated p-5" aria-label="Depth of Field 交互实验：调整焦平面、光圈、质量、深度边界和算法，观察 CoC、成本与伪影">
      <div className="mb-4 flex flex-wrap items-baseline justify-between gap-3">
        <div>
          <p className="text-[11px] uppercase tracking-[0.18em] text-secondary">Depth of Field Lab</p>
          <h4 className="mt-1 text-[15px] font-semibold text-primary">先预测：焦平面移动时，哪一个物体的 CoC 会变小？</h4>
        </div>
        <span className="rounded-control border border-accent px-2 py-1 text-[11px] text-accent">可交互</span>
      </div>
      <div className="grid gap-5 md:grid-cols-[1fr_260px] md:items-center">
        <svg viewBox="0 0 560 390" role="img" aria-label={label} className="w-full">
          <ArrowDefs />
          <rect x={12} y={18} width={536} height={354} rx={18} fill={surface} stroke={border} />
          <text x={32} y={46} fontSize={14} fontWeight={700} fill={primary}>depth line / CoC preview</text>
          <text x={526} y={46} textAnchor="end" fontSize={12} fill={accent}>{techniqueNames[technique]}</text>
          <line x1={62} y1={170} x2={498} y2={170} stroke={border} strokeWidth={2} />
          <line x1={62 + focus * 436} y1={86} x2={62 + focus * 436} y2={270} stroke={success} strokeWidth={3} strokeDasharray="7 6" />
          <text x={62 + focus * 436} y={78} textAnchor="middle" fontSize={12} fill={success}>focus</text>
          {objects.map((object, index) => {
            const x = 62 + object.depth * 436;
            const radius = 9 + cocs[index] * 48;
            return (
              <g key={object.label}>
                <circle cx={x} cy={170} r={radius} fill="url(#ch23-coc-gradient)" opacity={0.42 + quality * 0.22} />
                <rect x={x - 12} y={158} width={24} height={24} rx={4} fill={object.color} fillOpacity={0.78} stroke={object.color} strokeWidth={2} />
                <text x={x} y={238} textAnchor="middle" fontSize={12} fontWeight={700} fill={object.color}>{object.label}</text>
                <text x={x} y={258} textAnchor="middle" fontSize={11} fill={secondary}>CoC {cocs[index].toFixed(2)}</text>
              </g>
            );
          })}
          <rect x={62} y={286} width={436} height={28} rx={9} fill={border} fillOpacity={0.3} />
          <rect x={62} y={286} width={436 * cost} height={28} rx={9} fill={warning} fillOpacity={0.54} />
          <text x={72} y={305} fontSize={11} fill={primary}>cost {cost.toFixed(2)}</text>
          <text x={488} y={305} textAnchor="end" fontSize={11} fill={secondary}>artifact {artifact.toFixed(2)}</text>
          <text x={62} y={342} fontSize={11} fill={secondary}>{depthEdge > 0.55 ? "depth discontinuity is prominent" : "depth edge is relatively stable"} · {quality > 0.65 ? "filter quality is high" : "more samples or jitter may help"}</text>
        </svg>
        <div className="space-y-3">
          <label className="block text-sm text-primary" htmlFor="ch23-focus">focus plane：{focus.toFixed(2)}</label>
          <input id="ch23-focus" className="min-h-11 w-full accent-accent" type="range" min="0.08" max="0.92" step="0.02" value={focus} onChange={(event) => setFocus(Number(event.target.value))} aria-label="调整 focus plane" />
          <label className="block text-sm text-primary" htmlFor="ch23-aperture">aperture：{aperture.toFixed(2)}</label>
          <input id="ch23-aperture" className="min-h-11 w-full accent-accent" type="range" min="0.05" max="0.9" step="0.02" value={aperture} onChange={(event) => setAperture(Number(event.target.value))} aria-label="调整镜头 aperture" />
          <label className="block text-sm text-primary" htmlFor="ch23-quality">filter quality：{quality.toFixed(2)}</label>
          <input id="ch23-quality" className="min-h-11 w-full accent-accent" type="range" min="0.15" max="1" step="0.02" value={quality} onChange={(event) => setQuality(Number(event.target.value))} aria-label="调整 blur filter quality" />
          <label className="block text-sm text-primary" htmlFor="ch23-edge">depth edge：{depthEdge.toFixed(2)}</label>
          <input id="ch23-edge" className="min-h-11 w-full accent-accent" type="range" min="0" max="0.9" step="0.02" value={depthEdge} onChange={(event) => setDepthEdge(Number(event.target.value))} aria-label="调整 depth discontinuity" />
          <label className="block text-sm text-primary" htmlFor="ch23-technique">technique</label>
          <select id="ch23-technique" className="min-h-11 w-full rounded-control border border-border bg-elevated px-3 py-2 text-sm text-primary" value={technique} onChange={(event) => setTechnique(event.target.value)} aria-label="选择景深算法">
            <option value="reverse">reverse z-buffer</option>
            <option value="forward">forward z-buffer</option>
            <option value="layered">layered</option>
            <option value="accumulation">accumulation buffer</option>
            <option value="ray">ray traced</option>
          </select>
          <button type="button" aria-label="重置 Depth of Field 实验" onClick={reset} className="min-h-11 w-full rounded-control border border-border px-3 py-2 text-sm text-secondary hover:border-accent hover:text-primary">重置实验</button>
          <p className="text-xs text-secondary" role="status">观察：aperture 放大离焦 CoC；quality 降低成本可能带来 banding、jitter 或 pixel bleeding；算法选择决定真实 visibility 与实时预算。</p>
        </div>
      </div>
    </section>
  );
}
