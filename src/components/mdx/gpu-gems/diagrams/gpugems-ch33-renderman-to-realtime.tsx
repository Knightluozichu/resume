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

function Frame({ ariaLabel, caption, children }: { ariaLabel: string; caption: string; children: ReactNode }) {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox="0 0 720 390" role="img" aria-label={ariaLabel} className="mx-auto block h-auto w-full max-w-[720px]">
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
    </defs>
  );
}

function Arrow({ prefix, x1, y1, x2, y2, stroke = accent }: { prefix: string; x1: number; y1: number; x2: number; y2: number; stroke?: string }) {
  return <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={stroke} strokeWidth={3} markerEnd={`url(#${prefix}-arrow)`} />;
}

function Node({ x, y, width, height, title, detail, color = accent }: { x: number; y: number; width: number; height: number; title: string; detail: string; color?: string }) {
  return (
    <g>
      <rect x={x} y={y} width={width} height={height} rx={14} fill={color} fillOpacity={0.08} stroke={color} strokeWidth={2} />
      <text x={x + width / 2} y={y + 30} textAnchor="middle" fontSize={15} fontWeight={700} fill={primary}>{title}</text>
      <text x={x + width / 2} y={y + 56} textAnchor="middle" fontSize={12} fill={secondary}>{detail}</text>
    </g>
  );
}

export function GpuGemsCh33ConversionPipelineDiagram() {
  return (
    <Frame
      ariaLabel="RenderMan 到实时 shader 的转换流程：生产 surface shader 经过语义映射、Cg vertex/fragment 拆分、硬件 profile 编译和优化，输出实时近似。"
      caption="转换不是逐行翻译：先建立语义对应，再根据 GPU 的执行频率、profile 限制和可测量误差重排计算。"
    >
      <ArrowDefs prefix="ch33-pipeline" />
      <text x={360} y={28} textAnchor="middle" fontSize={18} fontWeight={700} fill={primary}>RenderMan → hardware shader：转换是一条优化链</text>
      <Node x={24} y={104} width={154} height={92} title="RenderMan" detail="surface shader" color={accent} />
      <Arrow prefix="ch33-pipeline" x1={178} y1={150} x2={226} y2={150} />
      <Node x={230} y={104} width={154} height={92} title="语义映射" detail="lights · rates · data" color={warning} />
      <Arrow prefix="ch33-pipeline" x1={384} y1={150} x2={432} y2={150} stroke={success} />
      <rect x={436} y={74} width={152} height={154} rx={16} fill={success} fillOpacity={0.08} stroke={success} strokeWidth={2} />
      <text x={512} y={108} textAnchor="middle" fontSize={15} fontWeight={700} fill={primary}>Cg programs</text>
      <text x={512} y={144} textAnchor="middle" fontSize={12} fill={secondary}>vertex: prepare</text>
      <text x={512} y={170} textAnchor="middle" fontSize={12} fill={secondary}>fragment: shade</text>
      <text x={512} y={196} textAnchor="middle" fontSize={11} fill={secondary}>profile aware</text>
      <Arrow prefix="ch33-pipeline" x1={588} y1={150} x2={636} y2={150} stroke={success} />
      <Node x={640} y={104} width={64} height={92} title="GPU" detail="real-time" color={success} />
      <rect x={92} y={266} width={536} height={74} rx={14} fill={surface} stroke={warning} />
      <text x={360} y={296} textAnchor="middle" fontSize={14} fontWeight={700} fill={primary}>validate result</text>
      <text x={360} y={322} textAnchor="middle" fontSize={12} fill={secondary}>image difference · instruction size · frame time · sampling quality</text>
      <path d="M 512 228 C 512 254 452 266 424 266" fill="none" stroke={warning} strokeWidth={2} markerEnd="url(#ch33-pipeline-arrow)" />
    </Frame>
  );
}

export function GpuGemsCh33LightingMappingDiagram() {
  return (
    <Frame
      ariaLabel="RenderMan illuminance 与 Cg 光源映射：RenderMan 遍历满足条件的光源，Cg 可以用固定数组或多 pass，由应用管理 light 参数并累加结果。"
      caption="RenderMan 的 illuminance 隐含了场景遍历；实时 Cg 需要把光源集合和参数管理显式交给应用，或接受多 pass 的重复计算。"
    >
      <ArrowDefs prefix="ch33-lighting" />
      <text x={360} y={28} textAnchor="middle" fontSize={18} fontWeight={700} fill={primary}>Lights：隐式遍历变成显式预算</text>
      <rect x={24} y={84} width={192} height={222} rx={16} fill={accent} fillOpacity={0.08} stroke={accent} strokeWidth={2} />
      <text x={120} y={118} textAnchor="middle" fontSize={15} fontWeight={700} fill={primary}>RenderMan</text>
      <text x={120} y={154} textAnchor="middle" fontSize={13} fill={secondary}>illuminance(P, N, width)</text>
      <circle cx={76} cy={208} r={17} fill={warning} /><circle cx={120} cy={208} r={17} fill={success} /><circle cx={164} cy={208} r={17} fill={accent} />
      <text x={76} y={213} textAnchor="middle" fontSize={11} fill={primary}>L1</text><text x={120} y={213} textAnchor="middle" fontSize={11} fill={primary}>L2</text><text x={164} y={213} textAnchor="middle" fontSize={11} fill={primary}>L3</text>
      <text x={120} y={256} textAnchor="middle" fontSize={11} fill={secondary}>shader sees matching lights</text>
      <Arrow prefix="ch33-lighting" x1={216} y1={194} x2={274} y2={194} />
      <rect x={278} y={74} width={184} height={242} rx={16} fill={warning} fillOpacity={0.08} stroke={warning} strokeWidth={2} />
      <text x={370} y={108} textAnchor="middle" fontSize={15} fontWeight={700} fill={primary}>application</text>
      <text x={370} y={146} textAnchor="middle" fontSize={12} fill={warning}>choose light list</text>
      <text x={370} y={174} textAnchor="middle" fontSize={12} fill={warning}>bind current params</text>
      <text x={370} y={202} textAnchor="middle" fontSize={12} fill={warning}>manage accumulation</text>
      <rect x={304} y={228} width={132} height={48} rx={9} fill={surface} stroke={warning} />
      <text x={370} y={257} textAnchor="middle" fontSize={11} fill={secondary}>fixed or multipass</text>
      <Arrow prefix="ch33-lighting" x1={462} y1={194} x2={520} y2={194} stroke={success} />
      <rect x={524} y={84} width={172} height={222} rx={16} fill={success} fillOpacity={0.08} stroke={success} strokeWidth={2} />
      <text x={610} y={118} textAnchor="middle" fontSize={15} fontWeight={700} fill={primary}>Cg result</text>
      <text x={610} y={154} textAnchor="middle" fontSize={12} fill={secondary}>lightDir / color</text>
      <text x={610} y={182} textAnchor="middle" fontSize={12} fill={secondary}>light contribution</text>
      <text x={610} y={210} textAnchor="middle" fontSize={12} fill={secondary}>add to framebuffer</text>
      <text x={610} y={256} textAnchor="middle" fontSize={11} fill={success}>more lights → more work</text>
    </Frame>
  );
}

export function GpuGemsCh33FrequencySplitDiagram() {
  return (
    <Frame
      ariaLabel="GPU 执行频率分工图：应用级计算只做一次，vertex program 按顶点计算并插值传给 fragment，fragment program 按生成 fragment 计算最终颜色。"
      caption="同一 RenderMan surface shader 在 GPU 上要拆成不同频率：不变的放应用，随顶点变化的放 vertex，真正随像素变化的留在 fragment。"
    >
      <ArrowDefs prefix="ch33-frequency" />
      <text x={360} y={28} textAnchor="middle" fontSize={18} fontWeight={700} fill={primary}>frequency split：把计算放在合适的执行率</text>
      <rect x={24} y={78} width={178} height={238} rx={16} fill={accent} fillOpacity={0.08} stroke={accent} strokeWidth={2} />
      <text x={113} y={112} textAnchor="middle" fontSize={15} fontWeight={700} fill={primary}>application</text>
      <text x={113} y={146} textAnchor="middle" fontSize={12} fill={secondary}>一次 / 交互级</text>
      <text x={113} y={184} textAnchor="middle" fontSize={12} fill={accent}>hairNorm</text>
      <text x={113} y={210} textAnchor="middle" fontSize={12} fill={secondary}>不随 view/light 变</text>
      <text x={113} y={272} textAnchor="middle" fontSize={11} fill={secondary}>最便宜的重用位置</text>
      <Arrow prefix="ch33-frequency" x1={202} y1={196} x2={254} y2={196} />
      <rect x={258} y={78} width={190} height={238} rx={16} fill={warning} fillOpacity={0.08} stroke={warning} strokeWidth={2} />
      <text x={353} y={112} textAnchor="middle" fontSize={15} fontWeight={700} fill={primary}>vertex program</text>
      <text x={353} y={146} textAnchor="middle" fontSize={12} fill={secondary}>每个 vertex</text>
      <text x={353} y={184} textAnchor="middle" fontSize={12} fill={warning}>dot(T, L), dot(T, V)</text>
      <text x={353} y={210} textAnchor="middle" fontSize={12} fill={secondary}>输出 varying</text>
      <text x={353} y={272} textAnchor="middle" fontSize={11} fill={secondary}>rasterizer 线性插值</text>
      <Arrow prefix="ch33-frequency" x1={448} y1={196} x2={500} y2={196} stroke={success} />
      <rect x={504} y={78} width={192} height={238} rx={16} fill={success} fillOpacity={0.08} stroke={success} strokeWidth={2} />
      <text x={600} y={112} textAnchor="middle" fontSize={15} fontWeight={700} fill={primary}>fragment program</text>
      <text x={600} y={146} textAnchor="middle" fontSize={12} fill={secondary}>每个 generated fragment</text>
      <text x={600} y={184} textAnchor="middle" fontSize={12} fill={success}>final color / LUT</text>
      <text x={600} y={210} textAnchor="middle" fontSize={12} fill={secondary}>visible + invisible</text>
      <text x={600} y={272} textAnchor="middle" fontSize={11} fill={danger}>最昂贵，避免重复</text>
    </Frame>
  );
}

export function GpuGemsCh33OptimizationEvidenceDiagram() {
  return (
    <Frame
      ariaLabel="优化证据图：原始 fragment 计算通过移动到 vertex、texture lookup 和 vectorization 减少指令，再用差异图和采样率检查误差。"
      caption="优化不能只看指令数：每次移动或查表都要同时观察 instruction size、画面差异、采样率和实际 frame time。"
    >
      <ArrowDefs prefix="ch33-evidence" />
      <text x={360} y={28} textAnchor="middle" fontSize={18} fontWeight={700} fill={primary}>Optimization：更短的程序也要有误差证据</text>
      <Node x={30} y={106} width={152} height={92} title="original" detail="104 instructions" color={danger} />
      <Arrow prefix="ch33-evidence" x1={182} y1={152} x2={224} y2={152} stroke={warning} />
      <rect x={228} y={80} width={260} height={194} rx={16} fill={warning} fillOpacity={0.08} stroke={warning} strokeWidth={2} />
      <text x={358} y={114} textAnchor="middle" fontSize={15} fontWeight={700} fill={primary}>moves + lookup</text>
      <text x={358} y={148} textAnchor="middle" fontSize={12} fill={secondary}>application / vertex hoist</text>
      <text x={358} y={176} textAnchor="middle" fontSize={12} fill={secondary}>Kajiya-Kay texture</text>
      <text x={358} y={204} textAnchor="middle" fontSize={12} fill={secondary}>vectorized arithmetic</text>
      <text x={358} y={244} textAnchor="middle" fontSize={11} fill={warning}>profile-aware rewrite</text>
      <Arrow prefix="ch33-evidence" x1={488} y1={152} x2={530} y2={152} stroke={success} />
      <Node x={534} y={106} width={162} height={92} title="optimized" detail="shorter + faster" color={success} />
      <rect x={94} y={310} width={532} height={48} rx={11} fill={surface} stroke={accent} />
      <text x={360} y={331} textAnchor="middle" fontSize={12} fill={primary}>difference image</text>
      <text x={360} y={350} textAnchor="middle" fontSize={11} fill={secondary}>compare quality before accepting the speed gain</text>
      <path d="M 615 198 C 615 270 548 290 520 310" fill="none" stroke={accent} strokeWidth={2} markerEnd="url(#ch33-evidence-arrow)" />
    </Frame>
  );
}

export function GpuGemsCh33RenderManLab() {
  const [placement, setPlacement] = useState("balanced");
  const [sampleRate, setSampleRate] = useState(0.72);
  const [lightCount, setLightCount] = useState(3);
  const [useLut, setUseLut] = useState(true);
  const [vectorize, setVectorize] = useState(true);

  const fragmentShare = placement === "fragment" ? 1 : placement === "vertex" ? 0.56 : 0.34;
  const instructionCost = 42 + fragmentShare * 42 + lightCount * 4 - (useLut ? 16 : 0) - (vectorize ? 8 : 0);
  const qualityError = Math.max(0.01, (1 - sampleRate) * (placement === "vertex" ? 0.42 : 0.14) + (useLut ? 0.03 : 0));
  const frameTime = 0.7 + instructionCost * 0.045 + lightCount * (placement === "fragment" ? 0.32 : 0.17);
  const verdict = qualityError < 0.12 ? "误差可接受，继续用差异图复核" : "采样或频率分工过激，先提高质量再比较速度";
  const reset = () => {
    setPlacement("balanced");
    setSampleRate(0.72);
    setLightCount(3);
    setUseLut(true);
    setVectorize(true);
  };

  return (
    <section data-visual-kind="gpu-gems-ch33-renderman-to-realtime" className="not-prose my-6 rounded-card border border-border bg-elevated p-5" aria-label="RenderMan 到实时 shader 的交互实验：调整计算放置、采样率、光源数量、纹理查表和向量化，观察指令、误差和帧时间示意">
      <div className="mb-4">
        <p className="mb-1 text-xs uppercase tracking-[0.18em] text-secondary">RenderMan → real-time lab</p>
        <h3 className="m-0 text-lg font-semibold text-primary">用频率、查表和证据压缩 fragment 工作</h3>
        <p className="mt-2 text-sm leading-6 text-secondary">这是把原章优化顺序做成的关系实验：把稳定计算移出 fragment，必要时用纹理近似复杂函数，再用采样率和差异指标检查质量。数值为示意，不代替目标硬件 profiling。</p>
      </div>
      <div className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="rounded-control border border-border bg-surface p-3">
          <svg viewBox="0 0 420 330" role="img" aria-label={`当前 ${placement} 放置、采样率 ${sampleRate.toFixed(2)}、${lightCount} 个光源、${useLut ? "启用" : "禁用"} LUT、${vectorize ? "启用" : "禁用"} 向量化，指令 ${instructionCost.toFixed(1)}，误差 ${qualityError.toFixed(2)}`} className="h-auto w-full">
            <defs>
              <linearGradient id="ch33-lab-flow" x1="0" x2="1"><stop offset="0" stopColor={accent} stopOpacity="0.18" /><stop offset="1" stopColor={success} stopOpacity="0.82" /></linearGradient>
              <marker id="ch33-lab-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill={accent} /></marker>
            </defs>
            <text x={210} y={22} textAnchor="middle" fontSize={16} fontWeight={700} fill={primary}>RenderMan semantics → GPU-aware plan</text>
            <rect x={18} y={52} width={110} height={56} rx={10} fill={accent} fillOpacity={0.1} stroke={accent} />
            <text x={73} y={78} textAnchor="middle" fontSize={13} fontWeight={700} fill={primary}>surface</text>
            <text x={73} y={98} textAnchor="middle" fontSize={11} fill={secondary}>fur shader</text>
            <line x1={128} y1={80} x2={166} y2={80} stroke={accent} strokeWidth={3} markerEnd="url(#ch33-lab-arrow)" />
            <rect x={170} y={52} width={112} height={56} rx={10} fill={warning} fillOpacity={0.1} stroke={warning} />
            <text x={226} y={78} textAnchor="middle" fontSize={13} fontWeight={700} fill={primary}>split</text>
            <text x={226} y={98} textAnchor="middle" fontSize={11} fill={secondary}>{placement}</text>
            <line x1={282} y1={80} x2={320} y2={80} stroke={success} strokeWidth={3} markerEnd="url(#ch33-lab-arrow)" />
            <rect x={324} y={52} width={78} height={56} rx={10} fill="url(#ch33-lab-flow)" stroke={success} />
            <text x={363} y={78} textAnchor="middle" fontSize={13} fontWeight={700} fill={primary}>GPU</text>
            <text x={363} y={98} textAnchor="middle" fontSize={11} fill={secondary}>{lightCount} lights</text>
            <rect x={48} y={136} width={324} height={94} rx={14} fill={surface} stroke={warning} />
            <text x={210} y={164} textAnchor="middle" fontSize={14} fontWeight={700} fill={primary}>frequency-aware shading</text>
            <text x={210} y={190} textAnchor="middle" fontSize={12} fill={secondary}>fragment share {(fragmentShare * 100).toFixed(0)}% · sample {sampleRate.toFixed(2)}</text>
            <text x={210} y={214} textAnchor="middle" fontSize={11} fill={secondary}>{useLut ? "LUT approximation" : "full function"} · {vectorize ? "vectorized" : "scalar"}</text>
            <path d="M 210 230 L 210 264" stroke={success} strokeWidth={3} markerEnd="url(#ch33-lab-arrow)" />
            <rect x={48} y={270} width={324} height={44} rx={9} fill={qualityError < 0.12 ? success : danger} fillOpacity={0.1} stroke={qualityError < 0.12 ? success : danger} />
            <text x={210} y={289} textAnchor="middle" fontSize={11} fill={primary}>instructions {instructionCost.toFixed(1)} · frame {frameTime.toFixed(2)} · error {qualityError.toFixed(2)}</text>
            <text x={210} y={306} textAnchor="middle" fontSize={11} fill={qualityError < 0.12 ? success : danger}>{verdict}</text>
          </svg>
        </div>
        <div className="space-y-3">
          <button type="button" className="min-h-11 w-full rounded-control border border-accent px-3 py-2 text-sm text-primary hover:border-accent" aria-pressed={placement === "fragment"} onClick={() => setPlacement((current) => current === "fragment" ? "balanced" : "fragment")}>切换频率策略：{placement === "fragment" ? "全留 fragment" : "平衡分工"}</button>
          <label className="block text-sm text-primary" htmlFor="ch33-placement">计算放置</label>
          <select id="ch33-placement" className="min-h-11 w-full rounded-control border border-border bg-elevated px-3 py-2 text-sm text-primary" value={placement} onChange={(event) => setPlacement(event.target.value)} aria-label="选择计算放置策略"><option value="balanced">平衡：应用 + vertex + fragment</option><option value="application">尽量移到 application</option><option value="vertex">尽量移到 vertex</option><option value="fragment">留在 fragment</option></select>
          <label className="block text-sm text-primary" htmlFor="ch33-sample">几何采样率：{sampleRate.toFixed(2)}</label>
          <input id="ch33-sample" className="min-h-11 w-full accent-accent" type="range" min="0.2" max="1" step="0.02" value={sampleRate} onChange={(event) => setSampleRate(Number(event.target.value))} aria-label="调整几何采样率" />
          <label className="block text-sm text-primary" htmlFor="ch33-lights">光源数量：{lightCount}</label>
          <input id="ch33-lights" className="min-h-11 w-full accent-accent" type="range" min="1" max="8" step="1" value={lightCount} onChange={(event) => setLightCount(Number(event.target.value))} aria-label="调整光源数量" />
          <label className="flex min-h-11 items-center gap-3 text-sm text-primary" htmlFor="ch33-lut"><input id="ch33-lut" className="size-5 accent-accent" type="checkbox" checked={useLut} onChange={(event) => setUseLut(event.target.checked)} />用 texture lookup 近似复杂函数</label>
          <label className="flex min-h-11 items-center gap-3 text-sm text-primary" htmlFor="ch33-vector"><input id="ch33-vector" className="size-5 accent-accent" type="checkbox" checked={vectorize} onChange={(event) => setVectorize(event.target.checked)} />按向量宽度重排算术</label>
          <p className="rounded-control border border-border bg-surface px-3 py-2 text-sm leading-6 text-secondary">{verdict}；先记录画面差异，再接受指令数和 frame time 的改善。</p>
          <button type="button" className="min-h-11 w-full rounded-control border border-border px-3 py-2 text-sm text-primary hover:border-accent" onClick={reset}>重置实验</button>
        </div>
      </div>
    </section>
  );
}
