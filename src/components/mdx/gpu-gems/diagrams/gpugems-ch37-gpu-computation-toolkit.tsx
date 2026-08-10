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
          viewBox="0 0 720 390"
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

function ArrowDefs({ prefix }: { prefix: string }) {
  return (
    <defs>
      <marker
        id={`${prefix}-arrow`}
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
  return (
    <line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke={stroke}
      strokeWidth={3}
      markerEnd={`url(#${prefix}-arrow)`}
    />
  );
}

function Node({
  x,
  y,
  width,
  height,
  title,
  detail,
  color = accent,
}: {
  x: number;
  y: number;
  width: number;
  height: number;
  title: string;
  detail: string;
  color?: string;
}) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        rx={14}
        fill={color}
        fillOpacity={0.08}
        stroke={color}
        strokeWidth={2}
      />
      <text
        x={x + width / 2}
        y={y + 30}
        textAnchor="middle"
        fontSize={15}
        fontWeight={700}
        fill={primary}
      >
        {title}
      </text>
      <text
        x={x + width / 2}
        y={y + 57}
        textAnchor="middle"
        fontSize={12}
        fill={secondary}
      >
        {detail}
      </text>
    </g>
  );
}

export function GpuGemsCh37StreamProgramDiagram() {
  return (
    <Frame
      ariaLabel="GPU stream program 图：输入 stream 记录进入 kernel，每个元素独立执行并输出到 GPU memory；粒子位置可以作为纹理记录，fragment program 用大 quad 一次更新所有粒子。"
      caption="把像素换成任意记录：stream 进入 kernel，元素独立计算并写出结果；粒子只是把这一模型直观化的例子。"
    >
      <ArrowDefs prefix="ch37-stream" />
      <text x={360} y={28} textAnchor="middle" fontSize={18} fontWeight={700} fill={primary}>stream program：records → kernel → records</text>
      <Node x={24} y={96} width={168} height={110} title="input stream" detail="positions / values" color={accent} />
      <Arrow prefix="ch37-stream" x1={192} y1={151} x2={240} y2={151} />
      <rect x={244} y={68} width={222} height={166} rx={16} fill={warning} fillOpacity={0.08} stroke={warning} strokeWidth={2} />
      <text x={355} y={102} textAnchor="middle" fontSize={15} fontWeight={700} fill={primary}>kernel</text>
      <text x={355} y={136} textAnchor="middle" fontSize={12} fill={secondary}>same function per record</text>
      <text x={355} y={164} textAnchor="middle" fontSize={12} fill={secondary}>no shared writable state</text>
      <text x={355} y={192} textAnchor="middle" fontSize={11} fill={warning}>parallel by construction</text>
      <Arrow prefix="ch37-stream" x1={466} y1={151} x2={514} y2={151} stroke={success} />
      <Node x={518} y={96} width={178} height={110} title="output memory" detail="new positions / values" color={success} />
      <rect x={76} y={278} width={568} height={52} rx={12} fill={surface} stroke={border} />
      <text x={360} y={301} textAnchor="middle" fontSize={13} fontWeight={700} fill={primary}>particle mapping</text>
      <text x={360} y={320} textAnchor="middle" fontSize={11} fill={secondary}>large quad fragments = particles · texture coordinates select each record</text>
    </Frame>
  );
}

export function GpuGemsCh37MapReduceDiagram() {
  return (
    <Frame
      ariaLabel="map 与 reduce 对比图：map 为每个输入记录产生一个结果；reduce 通过多次缩小纹理规模，把每四个值合并成一个，最终得到 min、max、sum 或其他单值。"
      caption="map 保持记录数量，reduce 逐层减少记录数量；两者都适合独立元素计算，但 reduce 需要多 pass 组织依赖。"
    >
      <ArrowDefs prefix="ch37-mapreduce" />
      <text x={360} y={28} textAnchor="middle" fontSize={18} fontWeight={700} fill={primary}>map 与 reduce：从数组变换到单值</text>
      <rect x={28} y={72} width={294} height={244} rx={16} fill={accent} fillOpacity={0.08} stroke={accent} strokeWidth={2} />
      <text x={175} y={108} textAnchor="middle" fontSize={15} fontWeight={700} fill={primary}>map</text>
      <text x={175} y={138} textAnchor="middle" fontSize={12} fill={secondary}>每条记录独立执行 f</text>
      <g fill={accent}>{[0, 1, 2, 3, 4].map((i) => <rect key={`ch37-map-${i}`} x={66 + i * 43} y={174} width={28} height={28} rx={5} />)}</g>
      <g fill={success}>{[0, 1, 2, 3, 4].map((i) => <rect key={`ch37-map-out-${i}`} x={66 + i * 43} y={246} width={28} height={28} rx={5} />)}</g>
      <path d="M 80 210 L 80 240 M 123 210 L 123 240 M 166 210 L 166 240 M 209 210 L 209 240 M 252 210 L 252 240" stroke={accent} strokeWidth={2} markerEnd="url(#ch37-mapreduce-arrow)" />
      <text x={175} y={298} textAnchor="middle" fontSize={11} fill={secondary}>N inputs → N outputs</text>
      <Arrow prefix="ch37-mapreduce" x1={322} y1={194} x2={394} y2={194} />
      <rect x={398} y={72} width={294} height={244} rx={16} fill={success} fillOpacity={0.08} stroke={success} strokeWidth={2} />
      <text x={545} y={108} textAnchor="middle" fontSize={15} fontWeight={700} fill={primary}>reduce</text>
      <text x={545} y={138} textAnchor="middle" fontSize={12} fill={secondary}>每 pass 合并局部结果</text>
      <g fill={warning}>{[0, 1, 2, 3].map((i) => <rect key={`ch37-reduce-a-${i}`} x={438 + i * 43} y={174} width={28} height={28} rx={5} />)}</g>
      <g fill={warning}>{[0, 1].map((i) => <rect key={`ch37-reduce-b-${i}`} x={482 + i * 43} y={220} width={28} height={28} rx={5} />)}</g>
      <rect x={526} y={266} width={28} height={28} rx={5} fill={danger} />
      <path d="M 452 210 L 496 218 M 495 210 L 496 218 M 538 210 L 539 218 M 581 210 L 539 218 M 496 254 L 540 264 M 539 254 L 540 264" stroke={warning} strokeWidth={2} markerEnd="url(#ch37-mapreduce-arrow)" />
      <text x={545} y={310} textAnchor="middle" fontSize={11} fill={secondary}>N → N/4 → N/16 → single result</text>
    </Frame>
  );
}

export function GpuGemsCh37BitonicSortDiagram() {
  return (
    <Frame
      ariaLabel="bitonic merge sort 图：每个 GPU pass 并行比较交换一组元素，多个 stage 逐步合并 bitonic sequence，最终按 grid cell 编号排序。"
      caption="bitonic merge sort 用规则的 compare-and-swap 网络适配 GPU：每个 stage 读一个纹理、写一个纹理，下一 stage 接着消费。"
    >
      <ArrowDefs prefix="ch37-sort" />
      <text x={360} y={28} textAnchor="middle" fontSize={18} fontWeight={700} fill={primary}>sort：texture passes 组成 compare-and-swap 网络</text>
      <Node x={24} y={100} width={166} height={110} title="particle keys" detail="grid cell id" color={accent} />
      <Arrow prefix="ch37-sort" x1={190} y1={155} x2={232} y2={155} />
      <rect x={236} y={68} width={252} height={178} rx={16} fill={warning} fillOpacity={0.08} stroke={warning} strokeWidth={2} />
      <text x={362} y={102} textAnchor="middle" fontSize={15} fontWeight={700} fill={primary}>bitonic stages</text>
      <text x={362} y={136} textAnchor="middle" fontSize={12} fill={secondary}>compare pairs in parallel</text>
      <text x={362} y={164} textAnchor="middle" fontSize={12} fill={secondary}>min / max by direction</text>
      <text x={362} y={192} textAnchor="middle" fontSize={12} fill={secondary}>ping-pong textures</text>
      <text x={362} y={224} textAnchor="middle" fontSize={11} fill={warning}>passes = log²(n) scale</text>
      <Arrow prefix="ch37-sort" x1={488} y1={155} x2={530} y2={155} stroke={success} />
      <Node x={534} y={100} width={162} height={110} title="sorted list" detail="cells contiguous" color={success} />
      <rect x={78} y={284} width={564} height={46} rx={11} fill={surface} stroke={border} />
      <text x={360} y={312} textAnchor="middle" fontSize={12} fill={secondary}>sort 之后，binary search 才能为每个 grid cell 找到起始位置</text>
    </Frame>
  );
}

export function GpuGemsCh37GpuChallengesDiagram() {
  return (
    <Frame
      ariaLabel="GPU 通用计算约束图：有限 fragment 输出限制单 pass 能保存的结果，GPU 到 CPU 的慢 readback 可能吞掉加速收益，必须尽量保持数据在 GPU。"
      caption="GPU 计算的瓶颈不只在算力：输出槽位和 readback 路径会改变算法是否值得迁移。"
    >
      <ArrowDefs prefix="ch37-challenges" />
      <text x={360} y={28} textAnchor="middle" fontSize={18} fontWeight={700} fill={primary}>GPU computation：算力之外的边界</text>
      <rect x={26} y={80} width={204} height={220} rx={16} fill={danger} fillOpacity={0.08} stroke={danger} strokeWidth={2} />
      <text x={128} y={114} textAnchor="middle" fontSize={15} fontWeight={700} fill={primary}>limited outputs</text>
      <text x={128} y={150} textAnchor="middle" fontSize={12} fill={secondary}>每 pass 输出槽有限</text>
      <text x={128} y={180} textAnchor="middle" fontSize={12} fill={secondary}>多结果需要拆 pass</text>
      <text x={128} y={222} textAnchor="middle" fontSize={11} fill={danger}>ray / matrix 受影响</text>
      <text x={128} y={264} textAnchor="middle" fontSize={11} fill={secondary}>重排数据布局</text>
      <Arrow prefix="ch37-challenges" x1={230} y1={190} x2={278} y2={190} />
      <rect x={282} y={80} width={204} height={220} rx={16} fill={warning} fillOpacity={0.08} stroke={warning} strokeWidth={2} />
      <text x={384} y={114} textAnchor="middle" fontSize={15} fontWeight={700} fill={primary}>slow readback</text>
      <text x={384} y={150} textAnchor="middle" fontSize={12} fill={secondary}>GPU memory → CPU</text>
      <text x={384} y={180} textAnchor="middle" fontSize={12} fill={secondary}>同步 + transfer</text>
      <text x={384} y={222} textAnchor="middle" fontSize={11} fill={warning}>可能抹掉加速</text>
      <text x={384} y={264} textAnchor="middle" fontSize={11} fill={secondary}>尽量保持 GPU resident</text>
      <Arrow prefix="ch37-challenges" x1={486} y1={190} x2={534} y2={190} stroke={success} />
      <Node x={538} y={120} width={158} height={140} title="decision" detail="GPU, CPU, or hybrid" color={success} />
    </Frame>
  );
}

export function GpuGemsCh37ComputationLab() {
  const [operation, setOperation] = useState<"map" | "reduce" | "sort" | "search">("map");
  const [elements, setElements] = useState(4096);
  const [keepOnGpu, setKeepOnGpu] = useState(true);
  const [outputSlots, setOutputSlots] = useState(4);
  const log2n = Math.log2(elements);
  const passes = operation === "map" ? 1 : operation === "reduce" ? Math.ceil(log2n / 2) : operation === "sort" ? (log2n * (log2n + 1)) / 2 : 1;
  const readbackPenalty = keepOnGpu ? 0 : 1.4 + elements / 524288;
  const outputPenalty = outputSlots === 1 && operation === "sort" ? 0.9 : 0;
  const estimatedCost = 0.6 + passes * (operation === "sort" ? 0.018 : 0.028) + readbackPenalty + outputPenalty;
  const verdict = !keepOnGpu
    ? "危险：GPU→CPU readback 可能吞掉 kernel 的收益；只有后续 CPU 工作确实必要时才读回。"
    : operation === "sort" && elements >= 1048576
      ? "谨慎：大规模 bitonic sort 需要许多 pass，CPU sort 可能更快；若结果留在 GPU，才有继续加速的理由。"
      : operation === "reduce"
        ? "适合多 pass：每轮把局部结果压缩，最后可以只读回一个小值或小块。"
        : operation === "search"
          ? "适合 GPU：排序后的列表让每个 query 并行执行 log n 次查找，通常只需一个 rendering pass。"
          : "适合 GPU：每条记录独立执行 kernel，保持输入与输出 stream 在 GPU memory。";
  const reset = () => {
    setOperation("map");
    setElements(4096);
    setKeepOnGpu(true);
    setOutputSlots(4);
  };

  return (
    <section
      data-visual-kind="gpu-gems-ch37-gpu-computation-toolkit"
      className="not-prose my-6 rounded-card border border-border bg-elevated p-5"
      aria-label="GPU 通用计算交互实验：切换 map、reduce、sort、search，调整数据规模、输出槽位与 GPU 驻留，观察 pass 数、估算成本和 readback 风险"
    >
      <div className="mb-4">
        <p className="mb-1 text-xs uppercase tracking-[0.18em] text-secondary">GPGPU primitive lab</p>
        <h3 className="m-0 text-lg font-semibold text-primary">先匹配编程模型，再决定是否迁移</h3>
        <p className="mt-2 text-sm leading-6 text-secondary">map、reduce、sort、search 都可以写成 shader pipeline，但并不代表 GPU 一定更快。调节数据规模、输出槽位和 readback，观察并行收益如何被 pass 数或传输成本抵消。数值为示意。</p>
      </div>
      <div className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="rounded-control border border-border bg-surface p-3">
          <svg viewBox="0 0 420 342" role="img" aria-label={`当前操作 ${operation}、${elements} 个元素、${passes.toFixed(0)} 个 pass、${outputSlots} 个输出槽、${keepOnGpu ? "保持 GPU 驻留" : "读回 CPU"}；估算成本 ${estimatedCost.toFixed(2)}`} className="h-auto w-full">
            <defs>
              <linearGradient id="ch37-lab-flow" x1="0" x2="1"><stop offset="0" stopColor={accent} stopOpacity="0.18" /><stop offset="1" stopColor={success} stopOpacity="0.82" /></linearGradient>
              <marker id="ch37-lab-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill={accent} /></marker>
            </defs>
            <text x={210} y={22} textAnchor="middle" fontSize={16} fontWeight={700} fill={primary}>stream → {operation} kernel → memory</text>
            <rect x={18} y={48} width={104} height={52} rx={10} fill={accent} fillOpacity="0.1" stroke={accent} />
            <text x={70} y={70} textAnchor="middle" fontSize={13} fontWeight={700} fill={primary}>input</text>
            <text x={70} y={89} textAnchor="middle" fontSize={11} fill={secondary}>{elements} records</text>
            <line x1={122} y1={74} x2={150} y2={74} stroke={accent} strokeWidth={3} markerEnd="url(#ch37-lab-arrow)" />
            <rect x={154} y={48} width={112} height={52} rx={10} fill={warning} fillOpacity="0.1" stroke={warning} />
            <text x={210} y={70} textAnchor="middle" fontSize={13} fontWeight={700} fill={primary}>{operation}</text>
            <text x={210} y={89} textAnchor="middle" fontSize={11} fill={secondary}>{passes.toFixed(0)} passes</text>
            <line x1={266} y1={74} x2={294} y2={74} stroke={success} strokeWidth={3} markerEnd="url(#ch37-lab-arrow)" />
            <rect x={298} y={48} width={104} height={52} rx={10} fill="url(#ch37-lab-flow)" stroke={success} />
            <text x={350} y={70} textAnchor="middle" fontSize={13} fontWeight={700} fill={primary}>output</text>
            <text x={350} y={89} textAnchor="middle" fontSize={11} fill={secondary}>{keepOnGpu ? "GPU" : "CPU"}</text>
            <rect x={34} y={132} width={352} height={82} rx={14} fill={surface} stroke={border} />
            <text x={210} y={158} textAnchor="middle" fontSize={14} fontWeight={700} fill={primary}>budget model（示意）</text>
            <text x={210} y={181} textAnchor="middle" fontSize={12} fill={secondary}>passes {passes.toFixed(0)} · outputs {outputSlots} · estimated {estimatedCost.toFixed(2)}</text>
            <text x={210} y={202} textAnchor="middle" fontSize={12} fill={secondary}>{keepOnGpu ? "no readback" : `readback penalty ${readbackPenalty.toFixed(2)}`}</text>
            <path d="M 210 214 L 210 248" stroke={success} strokeWidth={3} markerEnd="url(#ch37-lab-arrow)" />
            <rect x={34} y={254} width={352} height={66} rx={12} fill={keepOnGpu && estimatedCost < 3.4 ? success : danger} fillOpacity={0.1} stroke={keepOnGpu && estimatedCost < 3.4 ? success : danger} />
            <text x={210} y={278} textAnchor="middle" fontSize={12} fontWeight={700} fill={primary}>{operation} · {elements >= 1048576 ? "large" : "small"} stream · {keepOnGpu ? "GPU resident" : "CPU handoff"}</text>
            <text x={210} y={301} textAnchor="middle" fontSize={11} fill={keepOnGpu && estimatedCost < 3.4 ? success : danger}>{verdict.slice(0, 42)}</text>
          </svg>
        </div>
        <div className="space-y-3">
          <button type="button" className="min-h-11 w-full rounded-control border border-accent px-3 py-2 text-sm text-primary hover:border-accent" aria-pressed={!keepOnGpu} onClick={() => setKeepOnGpu((current) => !current)}>切换数据位置：{keepOnGpu ? "保持 GPU 驻留" : "读回 CPU"}</button>
          <label className="block text-sm text-primary" htmlFor="ch37-operation">GPU primitive</label>
          <select id="ch37-operation" className="min-h-11 w-full rounded-control border border-border bg-elevated px-3 py-2 text-sm text-primary" value={operation} onChange={(event) => setOperation(event.target.value as "map" | "reduce" | "sort" | "search")} aria-label="选择 GPU primitive"><option value="map">map：逐记录变换</option><option value="reduce">reduce：聚合单值</option><option value="sort">bitonic sort：排序</option><option value="search">binary search：查找</option></select>
          <label className="block text-sm text-primary" htmlFor="ch37-elements">数据规模：{elements.toLocaleString()} records</label>
          <input id="ch37-elements" className="min-h-11 w-full accent-accent" type="range" min="0" max="2" step="1" value={elements === 4096 ? 0 : elements === 65536 ? 1 : 2} onChange={(event) => setElements([4096, 65536, 1048576][Number(event.target.value)])} aria-label="调整数据规模" />
          <label className="block text-sm text-primary" htmlFor="ch37-outputs">fragment 输出槽位：{outputSlots}</label>
          <select id="ch37-outputs" className="min-h-11 w-full rounded-control border border-border bg-elevated px-3 py-2 text-sm text-primary" value={outputSlots} onChange={(event) => setOutputSlots(Number(event.target.value))} aria-label="选择 fragment 输出槽位"><option value="1">1 个 RGBA output</option><option value="4">4 个 RGBA outputs</option></select>
          <p className="rounded-control border border-border bg-surface px-3 py-2 text-sm leading-6 text-secondary">{verdict}</p>
          <button type="button" className="min-h-11 w-full rounded-control border border-border px-3 py-2 text-sm text-primary hover:border-accent" onClick={reset}>重置实验</button>
        </div>
      </div>
    </section>
  );
}
