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
        y={y + 58}
        textAnchor="middle"
        fontSize={12}
        fill={secondary}
      >
        {detail}
      </text>
    </g>
  );
}

export function GpuGemsCh40UltrasoundPipelineDiagram() {
  const steps = [
    ["scanner", "acoustic grid", accent],
    ["vertex", "projective coords", warning],
    ["fragment", "3D lookup + map", success],
    ["blend", "time-varying view", danger],
  ] as const;
  return (
    <Frame
      ariaLabel="实时 3D 超声渲染管线：扫描器产生非笛卡尔声学网格，顶点阶段计算投影纹理坐标，片段阶段采样 3D 纹理和颜色表，最后按切平面合成时变体数据。"
      caption="把声学网格的几何变形放到顶点阶段，把 3D 采样和颜色分类留给片段阶段，正是本章的 GPU 分工。"
    >
      <ArrowDefs prefix="ch40-pipeline" />
      <text x={360} y={28} textAnchor="middle" fontSize={18} fontWeight={700} fill={primary}>
        real-time ultrasound volume rendering
      </text>
      {steps.map(([title, detail, color], index) => {
        const x = 14 + index * 176;
        return (
          <g key={`ch40-pipeline-${title}`}>
            <Node x={x} y={94} width={148} height={110} title={title} detail={detail} color={color} />
            {index < steps.length - 1 ? <Arrow prefix="ch40-pipeline" x1={x + 148} y1={149} x2={x + 168} y2={149} /> : null}
          </g>
        );
      })}
      <rect x={48} y={254} width={624} height={62} rx={14} fill={surface} stroke={border} />
      <text x={360} y={281} textAnchor="middle" fontSize={14} fontWeight={700} fill={primary}>每帧更新：相机 / aperture / apex angle / volume index</text>
      <text x={360} y={303} textAnchor="middle" fontSize={12} fill={secondary}>体数据保持 GPU resident；只重算受视角和时间影响的参数</text>
      <path d="M 88 254 L 88 206 M 264 254 L 264 206 M 440 254 L 440 206 M 616 254 L 616 206" stroke={border} strokeWidth={2} strokeDasharray="6 5" />
    </Frame>
  );
}

export function GpuGemsCh40GridComparisonDiagram() {
  return (
    <Frame
      ariaLabel="笛卡尔网格和金字塔声学网格对比图：笛卡尔网格的采样线平行，金字塔网格的线汇聚到 apex，随 range 方向增加，azimuth 和 elevation 坐标需要线性缩放。"
      caption="CT/MRI 常见笛卡尔网格；超声声束从探头发散。把金字塔网格看成带深度缩放的笛卡尔坐标，就能复用切片渲染。"
    >
      <ArrowDefs prefix="ch40-grid" />
      <text x={360} y={28} textAnchor="middle" fontSize={18} fontWeight={700} fill={primary}>
        Cartesian grid vs. pyramidal acoustic grid
      </text>
      <rect x={28} y={72} width={302} height={246} rx={16} fill={accent} fillOpacity={0.06} stroke={accent} strokeWidth={2} />
      <text x={179} y={104} textAnchor="middle" fontSize={15} fontWeight={700} fill={primary}>Cartesian</text>
      {[0, 1, 2, 3, 4].map((line) => <line key={`ch40-cartesian-${line}`} x1={78 + line * 45} y1={134} x2={78 + line * 45} y2={256} stroke={accent} strokeWidth={2} />)}
      {[0, 1, 2, 3].map((line) => <line key={`ch40-cartesian-h-${line}`} x1={58} y1={148 + line * 32} x2={298} y2={148 + line * 32} stroke={border} strokeWidth={1} />)}
      <text x={179} y={286} textAnchor="middle" fontSize={12} fill={secondary}>平行的 ultrasound lines</text>
      <Arrow prefix="ch40-grid" x1={330} y1={194} x2={386} y2={194} />
      <rect x={390} y={72} width={302} height={246} rx={16} fill={warning} fillOpacity={0.06} stroke={warning} strokeWidth={2} />
      <text x={541} y={104} textAnchor="middle" fontSize={15} fontWeight={700} fill={primary}>pyramidal</text>
      {[0, 1, 2, 3, 4].map((line) => <line key={`ch40-pyramid-${line}`} x1={541} y1={138} x2={445 + line * 48} y2={260} stroke={warning} strokeWidth={2} />)}
      <path d="M 445 260 L 637 260" stroke={border} strokeWidth={2} />
      <circle cx={541} cy={138} r={7} fill={danger} />
      <text x={541} y={126} textAnchor="middle" fontSize={12} fill={danger}>apex O</text>
      <text x={541} y={286} textAnchor="middle" fontSize={12} fill={secondary}>s′, t′ 随 r 线性缩放，r 保持 range</text>
      <text x={360} y={354} textAnchor="middle" fontSize={12} fill={secondary}>同一个 3D texture sampler，不同的是 vertex 阶段的坐标几何</text>
    </Frame>
  );
}

export function GpuGemsCh40ProjectiveMappingDiagram() {
  return (
    <Frame
      ariaLabel="投影纹理坐标图：顶点阶段输出 s、t、r、w，w 保存随 range 变化的金字塔缩放，片段阶段先将 r 乘以 w，再执行 projective 3D texture lookup 和一维颜色表查找。"
      caption="非线性坐标修正放在片段阶段：先让 r 乘以 w，再做投影 3D lookup，避免顶点插值把 range 缩放算错。"
    >
      <ArrowDefs prefix="ch40-projective" />
      <text x={360} y={28} textAnchor="middle" fontSize={18} fontWeight={700} fill={primary}>
        projective coordinates：vertex → fragment
      </text>
      <Node x={22} y={100} width={154} height={132} title="vertex" detail="hTex = (s,t,r,w)" color={accent} />
      <Arrow prefix="ch40-projective" x1={176} y1={166} x2={218} y2={166} />
      <rect x={222} y={76} width={212} height={182} rx={16} fill={warning} fillOpacity={0.08} stroke={warning} strokeWidth={2} />
      <text x={328} y={110} textAnchor="middle" fontSize={15} fontWeight={700} fill={primary}>fragment</text>
      <text x={328} y={144} textAnchor="middle" fontSize={13} fill={secondary}>r′ = r × w</text>
      <text x={328} y={176} textAnchor="middle" fontSize={12} fill={secondary}>w = aperture + r · scale</text>
      <text x={328} y={214} textAnchor="middle" fontSize={12} fill={warning}>片段中执行非线性修正</text>
      <Arrow prefix="ch40-projective" x1={434} y1={166} x2={476} y2={166} />
      <Node x={480} y={100} width={112} height={132} title="tex3Dproj" detail="sample USTexture" color={success} />
      <Arrow prefix="ch40-projective" x1={592} y1={166} x2={634} y2={166} stroke={success} />
      <Node x={638} y={100} width={70} height={132} title="map" detail="RGBA" color={success} />
      <rect x={76} y={292} width={568} height={42} rx={11} fill={surface} stroke={border} />
      <text x={360} y={318} textAnchor="middle" fontSize={12} fill={secondary}>目标：让发散声束在 3D texture 中命中正确的 range / azimuth / elevation 样本</text>
    </Frame>
  );
}

export function GpuGemsCh40CutPlaneDiagram() {
  return (
    <Frame
      ariaLabel="切平面策略对比图：包围矩形实现简单且可缓存，但会产生体外 fragment；与体包围盒求交得到的多边形只光栅化体内区域，却需要随视角重算顶点。"
      caption="Enclosing rectangles 省 CPU/几何工作，intersection polygons 省片段；选择取决于视角变化频率和 fill-rate 压力。"
    >
      <ArrowDefs prefix="ch40-cut" />
      <text x={360} y={28} textAnchor="middle" fontSize={18} fontWeight={700} fill={primary}>
        cut-plane geometry：简单 vs. 精确
      </text>
      <rect x={26} y={72} width={318} height={238} rx={16} fill={accent} fillOpacity={0.06} stroke={accent} strokeWidth={2} />
      <text x={185} y={104} textAnchor="middle" fontSize={15} fontWeight={700} fill={primary}>enclosing rectangle</text>
      <rect x={70} y={136} width={230} height={130} fill={surface} stroke={border} strokeWidth={2} />
      <path d="M 116 156 L 254 156 L 254 244 L 116 244 Z" fill={accent} fillOpacity={0.18} stroke={accent} strokeWidth={2} />
      <path d="M 70 136 L 116 156 M 300 136 L 254 156 M 70 266 L 116 244 M 300 266 L 254 244" stroke={danger} strokeWidth={2} strokeDasharray="5 4" />
      <text x={185} y={294} textAnchor="middle" fontSize={12} fill={secondary}>简单 / 可缓存 / 体外 fragment</text>
      <Arrow prefix="ch40-cut" x1={344} y1={192} x2={388} y2={192} />
      <rect x={392} y={72} width={302} height={238} rx={16} fill={success} fillOpacity={0.06} stroke={success} strokeWidth={2} />
      <text x={543} y={104} textAnchor="middle" fontSize={15} fontWeight={700} fill={primary}>intersection polygon</text>
      <rect x={436} y={136} width={216} height={130} fill={surface} stroke={border} strokeWidth={2} />
      <path d="M 482 158 L 605 158 L 630 215 L 562 248 L 482 226 Z" fill={success} fillOpacity={0.2} stroke={success} strokeWidth={2} />
      <circle cx={482} cy={158} r={5} fill={success} /><circle cx={605} cy={158} r={5} fill={success} /><circle cx={630} cy={215} r={5} fill={success} /><circle cx={562} cy={248} r={5} fill={success} /><circle cx={482} cy={226} r={5} fill={success} />
      <text x={543} y={294} textAnchor="middle" fontSize={12} fill={secondary}>精确 / 少 fragment / 视角变就重算</text>
    </Frame>
  );
}

export function GpuGemsCh40UltrasoundLab() {
  const [grid, setGrid] = useState<"cartesian" | "pyramidal">("pyramidal");
  const [volumeCount, setVolumeCount] = useState(30);
  const [slices, setSlices] = useState(128);
  const [aperture, setAperture] = useState(0.55);
  const [apexAngle, setApexAngle] = useState(28);
  const [clipping, setClipping] = useState(true);
  const [preintegrated, setPreintegrated] = useState(false);

  const scaleCost = grid === "pyramidal" ? 1.18 : 1;
  const frameCost = slices * scaleCost * (clipping ? 0.64 : 1) * (preintegrated ? 1.16 : 1);
  const temporalLoad = volumeCount * (grid === "pyramidal" ? 1.15 : 1);
  const coverage = Math.min(99, Math.round(64 + slices / 5 + aperture * 12 + (clipping ? 7 : -5) + (preintegrated ? 5 : 0)));
  const verdict = !clipping
    ? "注意：关闭 clipping 会让包围矩形访问体外 fragment，填充率成本可能远高于有效样本。"
    : grid === "pyramidal" && apexAngle > 36
      ? "大 apex angle：声束扩张更强，需要更明显的 s/t 缩放和更宽的包围切片。"
      : volumeCount > 60
        ? "时变预算偏高：先保持体数据 resident，再检查每个 volume 的切片合成是否成为瓶颈。"
        : "平衡配置：投影坐标处理非笛卡尔网格，clipping 减少无效片段，适合交互式探索。";

  const reset = () => {
    setGrid("pyramidal");
    setVolumeCount(30);
    setSlices(128);
    setAperture(0.55);
    setApexAngle(28);
    setClipping(true);
    setPreintegrated(false);
  };

  return (
    <section
      data-visual-kind="gpu-gems-ch40-ultrasound-shading"
      className="not-prose my-6 rounded-card border border-border bg-elevated p-5"
      aria-label="3D 超声实时渲染交互实验：切换笛卡尔或金字塔网格，调整时变量、切片数、孔径、顶角、clipping 和预积分"
    >
      <div className="mb-4">
        <p className="mb-1 text-xs uppercase tracking-[0.18em] text-secondary">ultrasound volume lab</p>
        <h3 className="m-0 text-lg font-semibold text-primary">把声束几何换算成 GPU 预算</h3>
        <p className="mt-2 text-sm leading-6 text-secondary">这是一个可解释的示意模型：切换网格类型并调节切片、孔径、顶角和 clipping，观察 projective lookup 如何影响覆盖率、填充成本与时变体数据压力。数字用于建立工程直觉，不替代真实医疗数据或 GPU profiler。</p>
      </div>
      <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-control border border-border bg-surface p-3">
          <svg viewBox="0 0 440 356" role="img" aria-label={`当前 ${grid === "pyramidal" ? "金字塔" : "笛卡尔"} 网格，${volumeCount} volumes per second，${slices} 个切片，覆盖率 ${coverage}，估算片段成本 ${frameCost.toFixed(0)}`} className="h-auto w-full">
            <defs>
              <marker id="ch40-lab-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill={accent} /></marker>
            </defs>
            <text x={220} y={22} textAnchor="middle" fontSize={16} fontWeight={700} fill={primary}>{grid === "pyramidal" ? "apex" : "parallel lines"} → projective sample → blend</text>
            <rect x={18} y={52} width={116} height={58} rx={11} fill={accent} fillOpacity={0.1} stroke={accent} />
            <text x={76} y={76} textAnchor="middle" fontSize={13} fontWeight={700} fill={primary}>{grid}</text>
            <text x={76} y={96} textAnchor="middle" fontSize={11} fill={secondary}>{volumeCount} vol/s</text>
            <line x1={134} y1={81} x2={162} y2={81} stroke={accent} strokeWidth={3} markerEnd="url(#ch40-lab-arrow)" />
            <rect x={166} y={52} width={112} height={58} rx={11} fill={warning} fillOpacity={0.1} stroke={warning} />
            <text x={222} y={76} textAnchor="middle" fontSize={13} fontWeight={700} fill={primary}>sample</text>
            <text x={222} y={96} textAnchor="middle" fontSize={11} fill={secondary}>{slices} slices</text>
            <line x1={278} y1={81} x2={306} y2={81} stroke={success} strokeWidth={3} markerEnd="url(#ch40-lab-arrow)" />
            <rect x={310} y={52} width={112} height={58} rx={11} fill={success} fillOpacity={0.1} stroke={success} />
            <text x={366} y={76} textAnchor="middle" fontSize={13} fontWeight={700} fill={primary}>display</text>
            <text x={366} y={96} textAnchor="middle" fontSize={11} fill={secondary}>{clipping ? "clipped" : "overdraw"}</text>
            <rect x={32} y={138} width={376} height={116} rx={15} fill={surface} stroke={border} />
            <text x={220} y={164} textAnchor="middle" fontSize={14} fontWeight={700} fill={primary}>acoustic volume preview</text>
            <path d={grid === "pyramidal" ? "M 220 181 L 98 232 L 342 232 Z" : "M 110 181 L 110 232 M 166 181 L 166 232 M 222 181 L 222 232 M 278 181 L 278 232 M 334 181 L 334 232"} fill={grid === "pyramidal" ? warning : "none"} fillOpacity={0.18} stroke={grid === "pyramidal" ? warning : accent} strokeWidth={2} />
            {grid === "pyramidal" ? <circle cx={220} cy={181} r={6} fill={danger} /> : null}
            <line x1={72} y1={176} x2={368} y2={176} stroke={success} strokeWidth={2} markerEnd="url(#ch40-lab-arrow)" />
            <text x={220} y={248} textAnchor="middle" fontSize={11} fill={secondary}>{preintegrated ? "pre-integrated transfer enabled" : "1D color / opacity map"}</text>
            <text x={220} y={286} textAnchor="middle" fontSize={14} fontWeight={700} fill={primary}>coverage {coverage}% · aperture {aperture.toFixed(2)}</text>
            <text x={220} y={314} textAnchor="middle" fontSize={12} fill={secondary}>apex {apexAngle}° · fragment budget {frameCost.toFixed(0)}</text>
          </svg>
        </div>
        <div className="space-y-4">
          <div className="grid gap-3 sm:grid-cols-2">
            <button type="button" className="min-h-11 rounded-control border border-border bg-surface px-3 py-2 text-left text-sm text-primary transition hover:border-accent" onClick={() => setGrid((value) => value === "pyramidal" ? "cartesian" : "pyramidal")}>
              切换网格：{grid === "pyramidal" ? "金字塔" : "笛卡尔"}
              <span className="mt-1 block text-xs text-secondary">观察坐标修正与片段预算</span>
            </button>
            <button type="button" className="min-h-11 rounded-control border border-border bg-surface px-3 py-2 text-left text-sm text-primary transition hover:border-accent" onClick={reset}>重置实验</button>
          </div>
          <label className="block text-sm text-primary">时变量：{volumeCount} volumes / second
            <input className="mt-2 w-full accent-[var(--accent)]" type="range" min={10} max={90} step={10} value={volumeCount} onChange={(event) => setVolumeCount(Number(event.target.value))} />
          </label>
          <label className="block text-sm text-primary">切片数：{slices}
            <input className="mt-2 w-full accent-[var(--accent)]" type="range" min={64} max={192} step={16} value={slices} onChange={(event) => setSlices(Number(event.target.value))} />
          </label>
          <label className="block text-sm text-primary">normalized aperture：{aperture.toFixed(2)}
            <input className="mt-2 w-full accent-[var(--accent)]" type="range" min={0.2} max={0.9} step={0.05} value={aperture} onChange={(event) => setAperture(Number(event.target.value))} />
          </label>
          <label className="block text-sm text-primary">apex angle：{apexAngle}°
            <input className="mt-2 w-full accent-[var(--accent)]" type="range" min={12} max={48} step={4} value={apexAngle} onChange={(event) => setApexAngle(Number(event.target.value))} />
          </label>
          <label className="flex min-h-11 items-center gap-2 text-sm text-primary"><input type="checkbox" checked={clipping} onChange={(event) => setClipping(event.target.checked)} />启用六面 clipping</label>
          <label className="flex min-h-11 items-center gap-2 text-sm text-primary"><input type="checkbox" checked={preintegrated} onChange={(event) => setPreintegrated(event.target.checked)} />启用预积分查找</label>
          <p className="rounded-control border border-border bg-surface p-3 text-sm leading-6 text-secondary" aria-live="polite">{verdict}</p>
        </div>
      </div>
    </section>
  );
}
