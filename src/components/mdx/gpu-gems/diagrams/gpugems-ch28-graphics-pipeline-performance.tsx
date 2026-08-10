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
        <svg viewBox="0 0 720 400" role="img" aria-label={ariaLabel} className="mx-auto block h-auto w-full max-w-[720px]">
          {children}
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">{caption}</figcaption>
    </figure>
  );
}

function ArrowDefs({ prefix }: { prefix: string }) {
  return (
    <defs>
      <marker id={`${prefix}-arrow`} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 z" fill={accent} />
      </marker>
      <linearGradient id={`${prefix}-load`} x1="0" x2="1">
        <stop offset="0" stopColor={success} stopOpacity="0.24" />
        <stop offset="0.55" stopColor={warning} stopOpacity="0.58" />
        <stop offset="1" stopColor={danger} stopOpacity="0.82" />
      </linearGradient>
      <linearGradient id={`${prefix}-bandwidth`} x1="0" x2="1">
        <stop offset="0" stopColor={accent} stopOpacity="0.22" />
        <stop offset="1" stopColor={success} stopOpacity="0.76" />
      </linearGradient>
    </defs>
  );
}

function Arrow({
  prefix,
  x1,
  y1,
  x2,
  y2,
  stroke = accent,
}: {
  prefix: string;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  stroke?: string;
}) {
  return <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={stroke} strokeWidth={3} markerEnd={`url(#${prefix}-arrow)`} />;
}

export function GpuGemsCh28PipelineStagesDiagram() {
  const stages = [
    { x: 34, title: "CPU", detail: "submit / manage", color: danger },
    { x: 172, title: "fetch", detail: "vertex + index", color: warning },
    { x: 310, title: "vertex", detail: "transform / T&L", color: accent },
    { x: 448, title: "fragment", detail: "pixel shader", color: success },
    { x: 586, title: "ROP", detail: "depth / color", color: danger },
  ];
  return (
    <Frame
      ariaLabel="图形管线阶段图：CPU 提交后依次经过 vertex/index fetch、vertex processing、fragment shading 和 ROP；整体速度受最慢阶段限制。"
      caption="GPU 不是一个单一速度旋钮：各功能单元并行工作，但帧吞吐仍由当前最慢的阶段限制。"
    >
      <ArrowDefs prefix="ch28-stage" />
      <text x={360} y={30} textAnchor="middle" fontSize={18} fontWeight={700} fill={primary}>graphics pipeline：最慢阶段决定吞吐</text>
      {stages.map((stage, index) => (
        <g key={stage.title}>
          <rect x={stage.x} y={100} width={100} height={148} rx={15} fill={stage.color} fillOpacity={0.08} stroke={stage.color} strokeWidth={2} />
          <text x={stage.x + 50} y={138} textAnchor="middle" fontSize={15} fontWeight={700} fill={stage.color}>{stage.title}</text>
          {index === 0 && <><circle cx={stage.x + 50} cy={184} r={23} fill={danger} fillOpacity={0.18} stroke={danger} /><text x={stage.x + 50} y={190} textAnchor="middle" fontSize={16} fill={danger}>API</text></>}
          {index === 1 && <><path d={`M ${stage.x + 24} 192 L ${stage.x + 40} 172 L ${stage.x + 55} 190 L ${stage.x + 74} 162`} fill="none" stroke={warning} strokeWidth={4} /><circle cx={stage.x + 42} cy={174} r={5} fill={warning} /></>}
          {index === 2 && <><path d={`M ${stage.x + 22} 202 C ${stage.x + 36} 156, ${stage.x + 58} 194, ${stage.x + 78} 160`} fill="none" stroke={accent} strokeWidth={4} /><circle cx={stage.x + 50} cy={181} r={6} fill={accent} /></>}
          {index === 3 && <><rect x={stage.x + 24} y={162} width={52} height={42} rx={7} fill="url(#ch28-stage-load)" stroke={success} /><circle cx={stage.x + 50} cy={182} r={12} fill={success} fillOpacity={0.62} /></>}
          {index === 4 && <><rect x={stage.x + 24} y={162} width={52} height={42} rx={7} fill={danger} fillOpacity={0.16} stroke={danger} /><path d={`M ${stage.x + 33} 194 L ${stage.x + 46} 173 L ${stage.x + 67} 194`} fill="none" stroke={danger} strokeWidth={3} /></>}
          <text x={stage.x + 50} y={228} textAnchor="middle" fontSize={11} fill={secondary}>{stage.detail}</text>
          {index < stages.length - 1 && <Arrow prefix="ch28-stage" x1={stage.x + 108} y1={176} x2={stage.x + 128} y2={176} stroke={stage.color} />}
        </g>
      ))}
      <line x1={80} y1={300} x2={640} y2={300} stroke={border} strokeWidth={2} />
      <path d="M 82 286 C 170 276, 210 288, 300 284 C 390 280, 420 286, 510 226 C 566 190, 608 205, 640 198" fill="none" stroke="url(#ch28-stage-load)" strokeWidth={5} />
      <circle cx={510} cy={226} r={9} fill={danger} />
      <text x={510} y={332} textAnchor="middle" fontSize={12} fill={danger}>若 ROP 最慢，继续优化 vertex 不会提高整帧吞吐</text>
      <rect x={174} y={354} width={372} height={26} rx={9} fill={warning} fillOpacity={0.1} stroke={warning} />
      <text x={360} y={372} textAnchor="middle" fontSize={11} fill={primary}>先找瓶颈，再把工作量压到目标阶段</text>
    </Frame>
  );
}

export function GpuGemsCh28BottleneckMethodDiagram() {
  const steps = [
    { x: 42, title: "identify", detail: "vary load / clock", color: warning },
    { x: 224, title: "optimize", detail: "reduce that work", color: success },
    { x: 406, title: "measure", detail: "compare baseline", color: accent },
    { x: 588, title: "repeat", detail: "next slowest", color: danger },
  ];
  return (
    <Frame
      ariaLabel="瓶颈定位循环：对每个阶段改变 workload 或相关时钟，若性能变化则确认瓶颈；减少该阶段工作后重新测量并重复。"
      caption="章节的核心方法是一个可证伪循环：只改变一个阶段的负载或计算能力，观察性能是否跟随变化。"
    >
      <ArrowDefs prefix="ch28-loop" />
      <text x={360} y={30} textAnchor="middle" fontSize={18} fontWeight={700} fill={primary}>bottleneck loop：实验先于优化</text>
      {steps.map((step, index) => (
        <g key={step.title}>
          <circle cx={step.x + 45} cy={150} r={54} fill={step.color} fillOpacity={0.1} stroke={step.color} strokeWidth={2} />
          <text x={step.x + 45} y={145} textAnchor="middle" fontSize={15} fontWeight={700} fill={step.color}>{step.title}</text>
          <text x={step.x + 45} y={168} textAnchor="middle" fontSize={11} fill={secondary}>{step.detail}</text>
          {index < steps.length - 1 && <Arrow prefix="ch28-loop" x1={step.x + 106} y1={150} x2={step.x + 164} y2={150} stroke={step.color} />}
        </g>
      ))}
      <path d="M 633 214 C 633 316, 86 316, 86 214" fill="none" stroke={border} strokeDasharray="8 6" strokeWidth={2} markerEnd="url(#ch28-loop-arrow)" />
      <text x={360} y={268} textAnchor="middle" fontSize={12} fill={secondary}>性能不变 → 不是当前瓶颈 · 性能变化 → 继续在该阶段优化</text>
      <rect x={124} y={338} width={472} height={30} rx={10} fill={accent} fillOpacity={0.1} stroke={accent} />
      <text x={360} y={358} textAnchor="middle" fontSize={12} fill={primary}>避免“感觉很贵”的局部优化把时间花在零收益处</text>
    </Frame>
  );
}

export function GpuGemsCh28BandwidthProbeDiagram() {
  const probes = [
    { y: 92, name: "ROP / frame buffer", test: "color + depth bits", signal: "memory clock", color: danger },
    { y: 151, name: "texture fetch", test: "positive mip LOD", signal: "memory clock", color: warning },
    { y: 210, name: "fragment shader", test: "resolution / program length", signal: "core clock", color: success },
    { y: 269, name: "vertex processing", test: "vertex work / shader length", signal: "core clock", color: accent },
  ];
  return (
    <Frame
      ariaLabel="瓶颈探测表：ROP 改颜色和深度位数，纹理带宽改正 LOD，fragment 改分辨率或 shader 长度，vertex 改顶点工作；每项性能变化对应不同信号。"
      caption="探测变量必须能真正改变目标阶段的工作：无效指令可能被优化掉，单纯降低画质也可能同时改变多个阶段。"
    >
      <ArrowDefs prefix="ch28-probe" />
      <text x={360} y={30} textAnchor="middle" fontSize={18} fontWeight={700} fill={primary}>controlled probes：每个变量只瞄准一个阶段</text>
      <text x={48} y={70} fontSize={12} fontWeight={700} fill={secondary}>stage</text>
      <text x={258} y={70} fontSize={12} fontWeight={700} fill={secondary}>change workload</text>
      <text x={514} y={70} fontSize={12} fontWeight={700} fill={secondary}>clock / evidence</text>
      {probes.map((probe) => (
        <g key={probe.name}>
          <rect x={40} y={probe.y} width={188} height={40} rx={9} fill={probe.color} fillOpacity={0.1} stroke={probe.color} />
          <text x={54} y={probe.y + 25} fontSize={12} fontWeight={700} fill={probe.color}>{probe.name}</text>
          <Arrow prefix="ch28-probe" x1={238} y1={probe.y + 20} x2={276} y2={probe.y + 20} stroke={probe.color} />
          <rect x={286} y={probe.y} width={208} height={40} rx={9} fill={surface} stroke={border} />
          <text x={300} y={probe.y + 25} fontSize={12} fill={primary}>{probe.test}</text>
          <Arrow prefix="ch28-probe" x1={504} y1={probe.y + 20} x2={542} y2={probe.y + 20} stroke={probe.color} />
          <rect x={552} y={probe.y} width={124} height={40} rx={9} fill={probe.color} fillOpacity={0.1} stroke={probe.color} />
          <text x={614} y={probe.y + 25} textAnchor="middle" fontSize={12} fill={probe.color}>{probe.signal}</text>
        </g>
      ))}
      <rect x={122} y={336} width={476} height={30} rx={10} fill={warning} fillOpacity={0.1} stroke={warning} />
      <text x={360} y={356} textAnchor="middle" fontSize={12} fill={primary}>若顶点和纹理探测都无效，CPU 可能才是主导瓶颈</text>
    </Frame>
  );
}

export function GpuGemsCh28OptimizationLeversDiagram() {
  const levers = [
    { x: 38, title: "CPU", detail: "fewer locks · larger batches", color: danger },
    { x: 214, title: "vertex", detail: "indexed cache · compact format", color: accent },
    { x: 390, title: "fragment", detail: "depth first · early-z", color: success },
    { x: 566, title: "memory", detail: "mipmaps · compression", color: warning },
  ];
  return (
    <Frame
      ariaLabel="优化杠杆图：CPU 侧避免同步锁并扩大 batch，vertex 侧使用 indexed cache 和紧凑格式，fragment 侧 depth first 与 early-z，内存侧 mipmap 和压缩纹理。"
      caption="优化动作要和探测到的阶段相配：扩大 batch 不是修复纹理带宽，减少浮点格式也不应盲目牺牲必要精度。"
    >
      <ArrowDefs prefix="ch28-levers" />
      <text x={360} y={30} textAnchor="middle" fontSize={18} fontWeight={700} fill={primary}>stage-specific levers：把收益投向已证实的瓶颈</text>
      {levers.map((lever, index) => (
        <g key={lever.title}>
          <rect x={lever.x} y={96} width={116} height={158} rx={15} fill={lever.color} fillOpacity={0.08} stroke={lever.color} strokeWidth={2} />
          <text x={lever.x + 58} y={134} textAnchor="middle" fontSize={15} fontWeight={700} fill={lever.color}>{lever.title}</text>
          {index === 0 && <><rect x={lever.x + 23} y={158} width={70} height={34} rx={8} fill={danger} fillOpacity={0.2} stroke={danger} /><path d={`M ${lever.x + 34} 176 L ${lever.x + 80} 176`} stroke={danger} strokeWidth={4} /></>}
          {index === 1 && <><path d={`M ${lever.x + 27} 192 L ${lever.x + 45} 162 L ${lever.x + 62} 182 L ${lever.x + 83} 152`} fill="none" stroke={accent} strokeWidth={4} /><circle cx={lever.x + 45} cy={162} r={5} fill={accent} /></>}
          {index === 2 && <><rect x={lever.x + 25} y={158} width={66} height={38} rx={7} fill="url(#ch28-levers-bandwidth)" stroke={success} /><path d={`M ${lever.x + 34} 184 L ${lever.x + 48} 168 L ${lever.x + 82} 168`} fill="none" stroke={success} strokeWidth={3} /></>}
          {index === 3 && <><rect x={lever.x + 24} y={160} width={68} height={34} rx={8} fill={warning} fillOpacity={0.18} stroke={warning} /><path d={`M ${lever.x + 32} 184 L ${lever.x + 49} 171 L ${lever.x + 66} 180 L ${lever.x + 84} 163`} fill="none" stroke={warning} strokeWidth={3} /></>}
          <text x={lever.x + 58} y={222} textAnchor="middle" fontSize={11} fill={secondary}>{lever.detail.split(" · ")[0]}</text>
          <text x={lever.x + 58} y={239} textAnchor="middle" fontSize={11} fill={secondary}>{lever.detail.split(" · ")[1]}</text>
          {index < levers.length - 1 && <Arrow prefix="ch28-levers" x1={lever.x + 122} y1={176} x2={lever.x + 164} y2={176} stroke={lever.color} />}
        </g>
      ))}
      <rect x={138} y={312} width={444} height={40} rx={12} fill={accent} fillOpacity={0.1} stroke={accent} />
      <text x={360} y={337} textAnchor="middle" fontSize={13} fill={primary}>measure again：收益必须在同一 workload 和目标硬件上复现</text>
    </Frame>
  );
}

export function GpuGemsCh28PerformanceLab() {
  const [stage, setStage] = useState("fragment");
  const [workload, setWorkload] = useState(0.64);
  const [probeSmall, setProbeSmall] = useState(false);

  const reset = () => {
    setStage("fragment");
    setWorkload(0.64);
    setProbeSmall(false);
  };

  const stageNames: Record<string, string> = {
    rop: "ROP / frame buffer",
    texture: "texture bandwidth",
    fragment: "fragment shading",
    vertex: "vertex processing",
    cpu: "CPU / submission",
  };
  const stageName = stageNames[stage];
  const effectiveLoad = probeSmall ? rounded(Math.max(0.1, workload - 0.24)) : workload;
  const sensitivity = stage === "fragment" ? 0.88 : stage === "rop" || stage === "texture" ? 0.76 : stage === "vertex" ? 0.62 : 0.5;
  const performance = rounded(Math.min(1, 0.38 + (1 - effectiveLoad) * sensitivity));
  const response = rounded(Math.abs(workload - effectiveLoad) * sensitivity);
  const recommended = stage === "rop" ? "改变 color / depth bits" : stage === "texture" ? "提高正 LOD bias" : stage === "fragment" ? "改变 resolution 或 shader length" : stage === "vertex" ? "改变 vertex format / program" : "减少 locks 或扩大 batch";
  const label = `Graphics Pipeline Performance 实验：阶段 ${stageName}，工作量 ${workload.toFixed(2)}，${probeSmall ? "已施加探测负载变化" : "基线负载"}，性能示意 ${performance.toFixed(2)}，响应 ${response.toFixed(2)}，建议 ${recommended}。`;

  return (
    <section data-visual-kind="gpu-gems-ch28-graphics-pipeline-performance" className="not-prose my-6 rounded-card border border-border bg-elevated p-5" aria-label="Graphics Pipeline Performance 交互实验：选择管线阶段、改变工作量并观察可证伪的性能响应">
      <div className="mb-4 flex flex-wrap items-baseline justify-between gap-3">
        <div>
          <p className="text-[11px] uppercase tracking-[0.18em] text-secondary">Graphics Pipeline Performance Lab</p>
          <h4 className="mt-1 text-[15px] font-semibold text-primary">先预测：哪个变量能证明当前阶段是瓶颈？</h4>
        </div>
        <span className="rounded-control border border-accent px-2 py-1 text-[11px] text-accent">可交互</span>
      </div>
      <div className="grid gap-5 md:grid-cols-[1fr_260px] md:items-center">
        <svg viewBox="0 0 560 390" role="img" aria-label={label} className="w-full">
          <ArrowDefs prefix="ch28-lab" />
          <rect x={12} y={18} width={536} height={352} rx={18} fill={surface} stroke={border} />
          <text x={32} y={46} fontSize={14} fontWeight={700} fill={primary}>controlled probe preview</text>
          <text x={526} y={46} textAnchor="end" fontSize={12} fill={response > 0.1 ? success : warning}>{stageName}</text>
          <line x1={56} y1={240} x2={504} y2={240} stroke={border} strokeWidth={2} />
          {Array.from({ length: 12 }, (_, index) => {
            const base = rounded(0.18 + (index / 11) * effectiveLoad * 0.72);
            const visible = rounded(Math.min(1, base * (0.7 + performance * 0.3)));
            return <g key={`probe-bar-${index}`}><rect x={66 + index * 36} y={240 - base * 112} width={22} height={base * 112} rx={4} fill={stage === "rop" ? danger : stage === "texture" ? warning : stage === "fragment" ? success : accent} fillOpacity={0.44 + base * 0.36} /><rect x={66 + index * 36} y={240 - visible * 66} width={22} height={visible * 66} rx={4} fill={accent} fillOpacity={0.48} /></g>;
          })}
          <text x={66} y={272} fontSize={11} fill={secondary}>baseline load {workload.toFixed(2)} · probe load {effectiveLoad.toFixed(2)}</text>
          <rect x={66} y={292} width={428} height={24} rx={7} fill={border} fillOpacity={0.32} />
          <rect x={66} y={292} width={428 * performance} height={24} rx={7} fill="url(#ch28-lab-load)" />
          <text x={76} y={309} fontSize={11} fill={primary}>throughput {performance.toFixed(2)} · response {response.toFixed(2)}</text>
          <text x={66} y={344} fontSize={11} fill={secondary}>probe: {recommended}</text>
        </svg>
        <div className="space-y-3">
          <button type="button" className="min-h-11 w-full rounded-control border border-accent px-3 py-2 text-sm text-primary hover:border-accent" aria-pressed={probeSmall} onClick={() => setProbeSmall((current) => !current)}>切换探测负载：{probeSmall ? "已改变" : "基线"}</button>
          <label className="block text-sm text-primary" htmlFor="ch28-stage">选择阶段</label>
          <select id="ch28-stage" className="min-h-11 w-full rounded-control border border-border bg-elevated px-3 py-2 text-sm text-primary" value={stage} onChange={(event) => { setStage(event.target.value); setProbeSmall(false); }} aria-label="选择图形管线阶段">
            <option value="rop">ROP / frame buffer</option>
            <option value="texture">texture bandwidth</option>
            <option value="fragment">fragment shading</option>
            <option value="vertex">vertex processing</option>
            <option value="cpu">CPU / submission</option>
          </select>
          <label className="block text-sm text-primary" htmlFor="ch28-workload">工作量：{workload.toFixed(2)}</label>
          <input id="ch28-workload" className="min-h-11 w-full accent-accent" type="range" min="0.2" max="0.95" step="0.05" value={workload} onChange={(event) => { setWorkload(Number(event.target.value)); setProbeSmall(false); }} aria-label="调整管线工作量" />
          <button type="button" className="min-h-11 w-full rounded-control border border-border px-3 py-2 text-sm text-primary hover:border-accent" onClick={reset}>重置实验</button>
          <p className="text-xs leading-5 text-secondary">先选阶段，再切换探测负载；若性能响应显著，才有理由把优化预算投入该阶段。</p>
        </div>
      </div>
    </section>
  );
}
