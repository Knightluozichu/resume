"use client";

import { useMemo, useState } from "react";
import type { ReactNode } from "react";

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

function Arrow({ x1, y1, x2, y2, color = accent }: { x1: number; y1: number; x2: number; y2: number; color?: string }) {
  return (
    <>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth={2.5} />
      <path d={`M ${x2 - 8} ${y2 - 5} L ${x2} ${y2} L ${x2 - 8} ${y2 + 5}`} fill="none" stroke={color} strokeWidth={2.5} />
    </>
  );
}

export function GpuGems2Ch04DrawCallProblemDiagram() {
  return (
    <Frame ariaLabel="许多重复实例造成大量 draw call 和状态切换，segment buffering 将其汇聚为少量批次" caption="问题不在三角形太多，而在很多很小的实例把 CPU 和驱动拖进了状态切换。">
      <text x={36} y={34} fontSize={14} fontWeight={700} fill={primary}>Many instances → many batches → CPU overhead</text>
      <g transform="translate(44 86)">
        <rect width={264} height={194} rx={18} fill={surface} stroke={danger} strokeWidth={2} />
        <text x={132} y={30} textAnchor="middle" fontSize={14} fontWeight={700} fill={danger}>逐实例绘制</text>
        {Array.from({ length: 9 }, (_, index) => (
          <g key={index} transform={`translate(${24 + (index % 3) * 76} ${54 + Math.floor(index / 3) * 40})`}>
            <rect width={54} height={26} rx={6} fill={danger} fillOpacity={0.1} stroke={danger} />
            <text x={27} y={18} textAnchor="middle" fontSize={11} fill={secondary}>batch {index + 1}</text>
          </g>
        ))}
        <text x={132} y={178} textAnchor="middle" fontSize={12} fill={secondary}>transform / light map / stream</text>
      </g>
      <Arrow x1={330} y1={184} x2={388} y2={184} />
      <g transform="translate(414 86)">
        <rect width={262} height={194} rx={18} fill={surface} stroke={success} strokeWidth={2} />
        <text x={131} y={30} textAnchor="middle" fontSize={14} fontWeight={700} fill={success}>segment buffering</text>
        <rect x={24} y={58} width={214} height={54} rx={10} fill={success} fillOpacity={0.1} stroke={success} />
        <text x={131} y={82} textAnchor="middle" fontSize={13} fill={primary}>一个大 buffer</text>
        <text x={131} y={102} textAnchor="middle" fontSize={11} fill={secondary}>记录每个实例的 segment</text>
        <text x={131} y={148} textAnchor="middle" fontSize={12} fill={secondary}>visible segments → 合并 range</text>
        <text x={131} y={174} textAnchor="middle" fontSize={12} fontWeight={700} fill={success}>少量 draw calls</text>
      </g>
    </Frame>
  );
}

export function GpuGems2Ch04PipelineDiagram() {
  const steps = [
    ["1", "Spatial ordering", "让相邻对象在数组中相邻", accent],
    ["2", "Build buffer", "变换到世界空间并记录 segment", warning],
    ["3", "Merge ranges", "只绘制可见且相邻的 buffer 区间", success],
  ] as const;
  return (
    <Frame ariaLabel="segment buffering 三步流程：空间排序、构建大 buffer、按可见集合合并连续区间" caption="排序只在实例列表改变时做；每帧的工作集中在可见性筛选和相邻区间合并。">
      <text x={36} y={34} fontSize={14} fontWeight={700} fill={primary}>Segment buffering：从空间列表到绘制范围</text>
      <g transform="translate(44 80)">
        {steps.map(([number, title, detail, color], index) => (
          <g key={number} transform={`translate(${index * 218} 0)`}>
            <rect width={188} height={206} rx={18} fill={surface} stroke={color} strokeWidth={2} />
            <circle cx={94} cy={38} r={20} fill={color} fillOpacity={0.14} stroke={color} strokeWidth={2} />
            <text x={94} y={44} textAnchor="middle" fontSize={16} fontWeight={700} fill={color}>{number}</text>
            <text x={94} y={88} textAnchor="middle" fontSize={14} fontWeight={700} fill={primary}>{title}</text>
            <text x={94} y={126} textAnchor="middle" fontSize={12} fill={secondary}>{detail.slice(0, 10)}</text>
            <text x={94} y={148} textAnchor="middle" fontSize={12} fill={secondary}>{detail.slice(10)}</text>
            <rect x={28} y={172} width={132} height={12} rx={6} fill={color} fillOpacity={0.18} />
          </g>
        ))}
      </g>
      <Arrow x1={238} y1={182} x2={260} y2={182} />
      <Arrow x1={456} y1={182} x2={478} y2={182} color={warning} />
      <text x={360} y={342} textAnchor="middle" fontSize={13} fill={secondary}>顺序决定 buffer 布局；布局决定哪些可见 segment 能合并</text>
    </Frame>
  );
}

export function GpuGems2Ch04SegmentMergeDiagram() {
  const segments = [true, true, false, true, true, true, false, true, false, true];
  return (
    <Frame ariaLabel="按可见集合合并连续 segment：相邻可见段合成一个 draw range，不可见段被跳过" caption="segment 仍保留独立可见性；只有在大 buffer 中连续的可见段才适合合并。">
      <text x={36} y={34} fontSize={14} fontWeight={700} fill={primary}>Visibility set → adjacent segments → draw ranges</text>
      <g transform="translate(54 112)">
        {segments.map((visible, index) => (
          <g key={index} transform={`translate(${index * 59} 0)`}>
            <rect width={48} height={72} rx={8} fill={visible ? success : surface} fillOpacity={visible ? 0.18 : 1} stroke={visible ? success : border} strokeWidth={visible ? 2 : 1} />
            <text x={24} y={31} textAnchor="middle" fontSize={12} fontWeight={700} fill={visible ? success : secondary}>S{index}</text>
            <text x={24} y={54} textAnchor="middle" fontSize={11} fill={secondary}>{visible ? "visible" : "skip"}</text>
          </g>
        ))}
      </g>
      <Arrow x1={108} y1={220} x2={108} y2={270} color={success} />
      <Arrow x1={285} y1={220} x2={285} y2={270} color={success} />
      <Arrow x1={462} y1={220} x2={462} y2={270} color={success} />
      <g transform="translate(54 284)">
        <rect width={166} height={40} rx={9} fill={success} fillOpacity={0.12} stroke={success} />
        <text x={83} y={25} textAnchor="middle" fontSize={12} fontWeight={700} fill={success}>range S0–S1</text>
        <rect x={177} width={166} height={40} rx={9} fill={success} fillOpacity={0.12} stroke={success} />
        <text x={260} y={25} textAnchor="middle" fontSize={12} fontWeight={700} fill={success}>range S3–S5</text>
        <rect x={354} width={166} height={40} rx={9} fill={success} fillOpacity={0.12} stroke={success} />
        <text x={437} y={25} textAnchor="middle" fontSize={12} fontWeight={700} fill={success}>range S7</text>
      </g>
      <text x={360} y={360} textAnchor="middle" fontSize={13} fill={secondary}>结果仍等价于逐实例绘制，但提交次数随连续可见段减少</text>
    </Frame>
  );
}

export function GpuGems2Ch04AtlasDiagram() {
  return (
    <Frame ariaLabel="纹理 atlas 将多个实例的 light map 放入一张纹理，使 segment buffer 能在连续 buffer 中保持状态一致" caption="如果每个实例都切换独立 light map，就无法随意合并；atlas 把状态切换收拢到坐标。">
      <text x={36} y={34} fontSize={14} fontWeight={700} fill={primary}>Light map 状态：独立纹理 vs texture atlas</text>
      <g transform="translate(52 82)">
        <rect width={232} height={198} rx={16} fill={surface} stroke={danger} />
        <text x={116} y={30} textAnchor="middle" fontSize={14} fontWeight={700} fill={danger}>分散纹理</text>
        {Array.from({ length: 4 }, (_, index) => (
          <g key={index} transform={`translate(22 ${56 + index * 31})`}>
            <rect width={104} height={22} rx={5} fill={danger} fillOpacity={0.12} stroke={danger} />
            <text x={116} y={16} fontSize={11} fill={secondary}>instance {index} → bind</text>
          </g>
        ))}
        <text x={116} y={180} textAnchor="middle" fontSize={12} fill={secondary}>每段插入状态变化</text>
      </g>
      <Arrow x1={304} y1={180} x2={362} y2={180} />
      <g transform="translate(390 82)">
        <rect width={278} height={198} rx={16} fill={surface} stroke={success} />
        <text x={139} y={30} textAnchor="middle" fontSize={14} fontWeight={700} fill={success}>Texture atlas</text>
        <rect x={30} y={52} width={218} height={100} rx={9} fill={success} fillOpacity={0.08} stroke={success} />
        {[0, 1, 2, 3].map((index) => (
          <rect key={index} x={42 + (index % 2) * 103} y={64 + Math.floor(index / 2) * 43} width={92} height={32} rx={5} fill={index % 2 ? warning : accent} fillOpacity={0.22} stroke={border} />
        ))}
        <text x={139} y={180} textAnchor="middle" fontSize={12} fill={secondary}>改 UV 区域，减少绑定切换</text>
      </g>
    </Frame>
  );
}

export function GpuGems2Ch04SegmentBufferingLab() {
  const [instances, setInstances] = useState(12);
  const [leafSize, setLeafSize] = useState(3);
  const [cull, setCull] = useState(true);
  const visible = useMemo(() => Array.from({ length: instances }, (_, index) => !cull || index % 5 !== 2), [instances, cull]);
  const ranges = useMemo(() => {
    const result: Array<[number, number]> = [];
    let start = -1;
    visible.forEach((isVisible, index) => {
      if (isVisible && start < 0) start = index;
      if ((!isVisible || index === visible.length - 1) && start >= 0) {
        const end = isVisible && index === visible.length - 1 ? index : index - 1;
        result.push([start, end]);
        start = -1;
      }
    });
    return result;
  }, [visible]);
  function reset() {
    setInstances(12);
    setLeafSize(3);
    setCull(true);
  }
  return (
    <section className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated" aria-label="GPU Gems 2 Chapter 4 segment buffering 实验：调整实例数量、空间叶大小和可见性筛选" data-visual-kind="gpu-gems2-ch04-segment-buffering">
      <div className="border-b border-border px-5 py-4">
        <p className="text-sm font-semibold text-primary">Segment buffering 实验</p>
        <p className="mt-1 text-sm text-secondary">观察可见实例如何从大 buffer 中合并成 draw ranges。</p>
      </div>
      <div className="grid gap-5 p-5 lg:grid-cols-[1fr_230px]">
        <div className="overflow-hidden rounded-card border border-border bg-[var(--bg)] p-3">
          <svg viewBox="0 0 540 330" role="img" aria-label="空间排序后的 segment 与合并 draw range 预览" className="block h-auto w-full">
            <text x={270} y={24} textAnchor="middle" fontSize={12} fill={secondary}>spatially ordered segment buffer</text>
            <rect x={18} y={42} width={504} height={154} rx={14} fill={surface} stroke={border} />
            {visible.map((isVisible, index) => {
              const x = 32 + index * (468 / Math.max(instances, 1));
              const width = Math.max(16, 430 / Math.max(instances, 1));
              return <rect key={index} x={x} y={90 + (index % leafSize) * 18} width={width} height={12} rx={4} fill={isVisible ? success : border} fillOpacity={isVisible ? 0.75 : 0.42} />;
            })}
            <text x={270} y={224} textAnchor="middle" fontSize={12} fill={secondary}>可见段：{visible.filter(Boolean).length} / {instances}</text>
            <g transform="translate(28 250)">
              {ranges.slice(0, 4).map(([start, end], index) => (
                <g key={`${start}-${end}`} transform={`translate(${index * 120} 0)`}>
                  <rect width={104} height={34} rx={7} fill={accent} fillOpacity={0.12} stroke={accent} />
                  <text x={52} y={21} textAnchor="middle" fontSize={11} fill={accent}>range {start}–{end}</text>
                </g>
              ))}
            </g>
            <text x={270} y={314} textAnchor="middle" fontSize={12} fill={secondary}>叶大小 {leafSize} · draw ranges {ranges.length}</text>
          </svg>
        </div>
        <div className="space-y-4">
          <label className="block text-sm text-secondary">实例数量：{instances}<input className="mt-2 block h-11 w-full accent-[var(--accent)]" type="range" min="6" max="18" step="3" value={instances} onChange={(event) => setInstances(Number(event.target.value))} /></label>
          <label className="block text-sm text-secondary">空间叶大小：{leafSize}<input className="mt-2 block h-11 w-full accent-[var(--accent)]" type="range" min="2" max="5" value={leafSize} onChange={(event) => setLeafSize(Number(event.target.value))} /></label>
          <label className="flex min-h-11 items-center gap-2 text-sm text-secondary"><input type="checkbox" checked={cull} onChange={(event) => setCull(event.target.checked)} />剔除部分不可见实例</label>
          <p className="rounded-md border border-border bg-[var(--bg)] p-3 text-xs leading-5 text-secondary" aria-live="polite">当前要提交 {ranges.length} 个 draw range。剔除越多不一定越少：若可见段被打散，合并机会会下降。</p>
          <button type="button" className="min-h-11 w-full rounded-md border border-border px-3 py-2 text-sm font-semibold text-primary transition hover:border-[var(--accent)]" onClick={reset}>重置</button>
        </div>
      </div>
    </section>
  );
}
