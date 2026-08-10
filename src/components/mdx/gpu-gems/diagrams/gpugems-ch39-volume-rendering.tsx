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

export function GpuGemsCh39VolumePipelineDiagram() {
  const stages = [
    ["initialize", "3D texture + shader", accent],
    ["update", "view + transfer", warning],
    ["draw", "sorted proxy slices", success],
  ] as const;
  return (
    <Frame
      ariaLabel="基于纹理的体渲染三阶段图：初始化加载体数据与 shader，更新视角和传递函数，绘制按深度排序的代理切片并进行合成。"
      caption="原书的工程骨架是 Initialize → Update → Draw：交互改变视角时，不必重新构建体数据，只更新必要的代理几何和查找表。"
    >
      <ArrowDefs prefix="ch39-pipeline" />
      <text x={360} y={28} textAnchor="middle" fontSize={18} fontWeight={700} fill={primary}>
        texture-based volume rendering pipeline
      </text>
      {stages.map(([title, detail, color], index) => {
        const x = 44 + index * 224;
        return (
          <g key={`ch39-pipeline-${title}`}>
            <Node x={x} y={94} width={188} height={112} title={title} detail={detail} color={color} />
            {index < stages.length - 1 ? <Arrow prefix="ch39-pipeline" x1={x + 188} y1={150} x2={x + 216} y2={150} /> : null}
          </g>
        );
      })}
      <rect x={56} y={258} width={608} height={60} rx={14} fill={surface} stroke={border} />
      <text x={360} y={284} textAnchor="middle" fontSize={14} fontWeight={700} fill={primary}>用户输入：相机、采样率、transfer function、光照开关</text>
      <text x={360} y={305} textAnchor="middle" fontSize={12} fill={secondary}>只让受影响的资源进入 update；volume texture 可保持 GPU resident</text>
      <path d="M 138 258 L 138 208 M 360 258 L 360 208 M 582 258 L 582 208" stroke={border} strokeWidth={2} strokeDasharray="6 5" />
    </Frame>
  );
}

export function GpuGemsCh39RayCompositingDiagram() {
  return (
    <Frame
      ariaLabel="体渲染采样与合成图：从视线方向的代理切片采样 3D 纹理，经过传递函数得到颜色和不透明度，再以 front-to-back over 公式累积颜色和透明度。"
      caption="每个切片贡献一个颜色-不透明度样本；front-to-back 合成在累计透明度接近 1 时可以提前停止。"
    >
      <ArrowDefs prefix="ch39-ray" />
      <text x={360} y={28} textAnchor="middle" fontSize={18} fontWeight={700} fill={primary}>
        one viewing ray：sample → classify → composite
      </text>
      <rect x={28} y={74} width={186} height={238} rx={16} fill={accent} fillOpacity={0.06} stroke={accent} strokeWidth={2} />
      <text x={121} y={106} textAnchor="middle" fontSize={15} fontWeight={700} fill={primary}>proxy slices</text>
      {[0, 1, 2, 3, 4].map((slice) => (
        <g key={`ch39-ray-slice-${slice}`}>
          <rect x={65 + slice * 19} y={137} width={12} height={112} rx={4} fill={slice === 2 ? success : accent} fillOpacity={slice === 2 ? 0.65 : 0.2} stroke={slice === 2 ? success : accent} />
          <text x={71 + slice * 19} y={270} textAnchor="middle" fontSize={11} fill={secondary}>{slice + 1}</text>
        </g>
      ))}
      <path d="M 45 126 L 185 126" stroke={warning} strokeWidth={3} markerEnd="url(#ch39-ray-arrow)" />
      <text x={121} y={295} textAnchor="middle" fontSize={12} fill={secondary}>front → back</text>
      <Arrow prefix="ch39-ray" x1={214} y1={193} x2={258} y2={193} />
      <Node x={262} y={116} width={142} height={154} title="sample" detail="3D texture / voxel" color={warning} />
      <Arrow prefix="ch39-ray" x1={404} y1={193} x2={448} y2={193} />
      <Node x={452} y={116} width={112} height={154} title="classify" detail="color + alpha" color={success} />
      <Arrow prefix="ch39-ray" x1={564} y1={193} x2={608} y2={193} stroke={success} />
      <rect x={612} y={116} width={88} height={154} rx={14} fill={success} fillOpacity={0.08} stroke={success} strokeWidth={2} />
      <text x={656} y={148} textAnchor="middle" fontSize={14} fontWeight={700} fill={primary}>over</text>
      <text x={656} y={181} textAnchor="middle" fontSize={12} fill={secondary}>C +=</text>
      <text x={656} y={207} textAnchor="middle" fontSize={12} fill={secondary}>a · color</text>
      <text x={656} y={233} textAnchor="middle" fontSize={12} fill={secondary}>A +=</text>
      <text x={656} y={257} textAnchor="middle" fontSize={12} fill={secondary}>a · (1−A)</text>
    </Frame>
  );
}

export function GpuGemsCh39ViewAlignedSlicingDiagram() {
  return (
    <Frame
      ariaLabel="视线对齐切片图：相机方向穿过体数据包围盒，生成一组平行的代理多边形，每个切片在 3D 纹理中采样并按深度排序。"
      caption="代理几何不是体表面：它只是把采样平面送进光栅化器，切片方向随视角更新以保持采样距离。"
    >
      <ArrowDefs prefix="ch39-slicing" />
      <text x={360} y={28} textAnchor="middle" fontSize={18} fontWeight={700} fill={primary}>
        view-aligned slicing：用代理几何遍历体
      </text>
      <rect x={48} y={82} width={264} height={218} rx={16} fill={accent} fillOpacity={0.05} stroke={accent} strokeWidth={2} />
      <text x={180} y={112} textAnchor="middle" fontSize={15} fontWeight={700} fill={primary}>volume bounding box</text>
      <path d="M 98 244 L 98 154 L 244 154 L 244 244 Z" fill={surface} stroke={border} strokeWidth={2} />
      {[0, 1, 2, 3, 4].map((plane) => (
        <line key={`ch39-slice-plane-${plane}`} x1={112 + plane * 27} y1={143} x2={112 + plane * 27} y2={255} stroke={plane === 2 ? success : warning} strokeWidth={plane === 2 ? 4 : 2} strokeOpacity={plane === 2 ? 0.9 : 0.45} />
      ))}
      <text x={180} y={278} textAnchor="middle" fontSize={12} fill={secondary}>平行采样平面</text>
      <Arrow prefix="ch39-slicing" x1={312} y1={190} x2={362} y2={190} />
      <Node x={366} y={106} width={150} height={164} title="slice polygon" detail="tessellate + UV" color={warning} />
      <Arrow prefix="ch39-slicing" x1={516} y1={190} x2={562} y2={190} stroke={success} />
      <Node x={566} y={106} width={136} height={164} title="fragment" detail="sample + blend" color={success} />
      <path d="M 90 326 C 260 350 486 350 650 326" fill="none" stroke={border} strokeWidth={2} strokeDasharray="6 5" />
      <text x={360} y={344} textAnchor="middle" fontSize={12} fill={secondary}>相机改变 → 重算切片交点与排序，不重建 3D 数据</text>
    </Frame>
  );
}

export function GpuGemsCh39TransferLightingDiagram() {
  return (
    <Frame
      ariaLabel="体数据分类与光照图：体素标量和梯度进入一维或二维传递函数，得到颜色和不透明度，梯度可作为局部法线参与 Blinn-Phong 光照，最后交给合成。"
      caption="传递函数负责“看见什么”，梯度光照负责“看起来怎样”；把两者拆开，调参和性能分析都会更清晰。"
    >
      <ArrowDefs prefix="ch39-light" />
      <text x={360} y={28} textAnchor="middle" fontSize={18} fontWeight={700} fill={primary}>
        data value + gradient → optical properties → lighting
      </text>
      <Node x={28} y={106} width={144} height={122} title="voxel" detail="value + neighbors" color={accent} />
      <Arrow prefix="ch39-light" x1={172} y1={167} x2={214} y2={167} />
      <rect x={218} y={76} width={188} height={184} rx={16} fill={warning} fillOpacity={0.08} stroke={warning} strokeWidth={2} />
      <text x={312} y={110} textAnchor="middle" fontSize={15} fontWeight={700} fill={primary}>transfer function</text>
      <path d="M 244 214 C 268 190 280 230 302 172 C 326 116 342 216 374 148" fill="none" stroke={success} strokeWidth={3} />
      <text x={312} y={244} textAnchor="middle" fontSize={12} fill={secondary}>scalar / gradient bins → color, alpha</text>
      <Arrow prefix="ch39-light" x1={406} y1={167} x2={448} y2={167} />
      <Node x={452} y={106} width={112} height={122} title="normal" detail="normalized ∇v" color={accent} />
      <Arrow prefix="ch39-light" x1={564} y1={167} x2={606} y2={167} stroke={success} />
      <Node x={610} y={106} width={92} height={122} title="shade" detail="local light" color={success} />
      <rect x={128} y={298} width={464} height={40} rx={11} fill={surface} stroke={border} />
      <text x={360} y={324} textAnchor="middle" fontSize={12} fill={secondary}>均匀区域的梯度很小：可跳过或降低光照，避免把噪声当成表面</text>
    </Frame>
  );
}

export function GpuGemsCh39VolumeRenderingLab() {
  const [axis, setAxis] = useState<"view" | "light">("view");
  const [samples, setSamples] = useState(96);
  const [opacity, setOpacity] = useState(0.65);
  const [gradient, setGradient] = useState(0.5);
  const [light, setLight] = useState(true);
  const [emptySpace, setEmptySpace] = useState(true);
  const [proceduralDetail, setProceduralDetail] = useState(false);

  const slices = Math.round(samples * (axis === "light" ? 1.15 : 1));
  const lookups = slices * (light ? 2.2 : 1.4) * (proceduralDetail ? 1.35 : 1);
  const visualQuality = Math.min(99, Math.round(62 + samples / 5 + gradient * 18 + (light ? 8 : 0) + (proceduralDetail ? 5 : 0)));
  const effectiveCost = lookups * (emptySpace ? 0.62 : 1);
  const verdict = !emptySpace
    ? "注意：没有空区域跳过，代理切片会为大量透明片段付出光栅化和合成成本。"
    : samples < 64
      ? "速度优先：样本较少，调高 opacity correction 可维持整体强度，但细节和边缘会更粗。"
      : axis === "light"
        ? "半角方向更适合体积光照，但切片数和采样成本会上升；用目标 GPU 的 profiler 校准。"
        : "平衡配置：视线对齐切片、空区域跳过和 GPU resident 数据可以支撑交互式探索。";

  const reset = () => {
    setAxis("view");
    setSamples(96);
    setOpacity(0.65);
    setGradient(0.5);
    setLight(true);
    setEmptySpace(true);
    setProceduralDetail(false);
  };

  return (
    <section
      data-visual-kind="gpu-gems-ch39-volume-rendering"
      className="not-prose my-6 rounded-card border border-border bg-elevated p-5"
      aria-label="体渲染交互实验：切换切片方向，调整采样数量、不透明度、梯度阈值、光照、空区域跳过与程序细节"
    >
      <div className="mb-4">
        <p className="mb-1 text-xs uppercase tracking-[0.18em] text-secondary">volume rendering lab</p>
        <h3 className="m-0 text-lg font-semibold text-primary">在图像质量和片段预算之间找平衡</h3>
        <p className="mt-2 text-sm leading-6 text-secondary">这是可解释的示意模型：观察切片数量、传递函数、梯度光照、程序细节和空区域跳过如何共同影响画质与采样成本。数值用于建立预算直觉，不替代真实 GPU profiler。</p>
      </div>
      <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-control border border-border bg-surface p-3">
          <svg viewBox="0 0 440 356" role="img" aria-label={`当前切片模式 ${axis === "view" ? "视线对齐" : "半角光照"}，${samples} 个样本，${slices} 个切片，视觉质量 ${visualQuality}，估算采样成本 ${effectiveCost.toFixed(0)}`} className="h-auto w-full">
            <defs>
              <marker id="ch39-lab-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill={accent} /></marker>
            </defs>
            <text x={220} y={22} textAnchor="middle" fontSize={16} fontWeight={700} fill={primary}>{axis === "view" ? "camera" : "half-angle"} → slices → image</text>
            <rect x={18} y={52} width={116} height={58} rx={11} fill={accent} fillOpacity={0.1} stroke={accent} />
            <text x={76} y={76} textAnchor="middle" fontSize={13} fontWeight={700} fill={primary}>{axis === "view" ? "camera" : "light + eye"}</text>
            <text x={76} y={96} textAnchor="middle" fontSize={11} fill={secondary}>{slices} slices</text>
            <line x1={134} y1={81} x2={162} y2={81} stroke={accent} strokeWidth={3} markerEnd="url(#ch39-lab-arrow)" />
            <rect x={166} y={52} width={112} height={58} rx={11} fill={warning} fillOpacity={0.1} stroke={warning} />
            <text x={222} y={76} textAnchor="middle" fontSize={13} fontWeight={700} fill={primary}>sample</text>
            <text x={222} y={96} textAnchor="middle" fontSize={11} fill={secondary}>{samples} / ray</text>
            <line x1={278} y1={81} x2={306} y2={81} stroke={success} strokeWidth={3} markerEnd="url(#ch39-lab-arrow)" />
            <rect x={310} y={52} width={112} height={58} rx={11} fill={success} fillOpacity={0.1} stroke={success} />
            <text x={366} y={76} textAnchor="middle" fontSize={13} fontWeight={700} fill={primary}>composite</text>
            <text x={366} y={96} textAnchor="middle" fontSize={11} fill={secondary}>{light ? "lit" : "unlit"}</text>
            <rect x={32} y={138} width={376} height={116} rx={15} fill={surface} stroke={border} />
            <text x={220} y={164} textAnchor="middle" fontSize={14} fontWeight={700} fill={primary}>volume preview</text>
            {[0, 1, 2, 3, 4, 5, 6, 7].map((slice) => {
              const x = 88 + slice * 33;
              const active = slice === 2 || slice === 5;
              return <rect key={`ch39-lab-slice-${slice}`} x={x} y={182} width={21} height={50} rx={5} fill={active ? success : accent} fillOpacity={active ? 0.65 : emptySpace ? 0.12 : 0.3} stroke={active ? success : accent} />;
            })}
            <path d="M 75 176 L 363 176" stroke={warning} strokeWidth={2} markerEnd="url(#ch39-lab-arrow)" />
            <text x={220} y={244} textAnchor="middle" fontSize={11} fill={secondary}>{emptySpace ? "empty-space skipping enabled" : "all transparent slices processed"}</text>
            <text x={220} y={286} textAnchor="middle" fontSize={14} fontWeight={700} fill={primary}>quality {visualQuality}% · opacity {opacity.toFixed(2)}</text>
            <text x={220} y={314} textAnchor="middle" fontSize={12} fill={secondary}>gradient {gradient.toFixed(2)} · lookup budget {effectiveCost.toFixed(0)}</text>
          </svg>
        </div>
        <div className="space-y-4">
          <div className="grid gap-3 sm:grid-cols-2">
            <button type="button" className="min-h-11 rounded-control border border-border bg-surface px-3 py-2 text-left text-sm text-primary transition hover:border-accent" onClick={() => setAxis((value) => value === "view" ? "light" : "view")}>
              切换切片方向：{axis === "view" ? "视线" : "半角"}
              <span className="mt-1 block text-xs text-secondary">观察排序与采样预算变化</span>
            </button>
            <button type="button" className="min-h-11 rounded-control border border-border bg-surface px-3 py-2 text-left text-sm text-primary transition hover:border-accent" onClick={reset}>重置实验</button>
          </div>
          <label className="block text-sm text-primary">样本数：{samples} / ray
            <input className="mt-2 w-full accent-[var(--accent)]" type="range" min={32} max={192} step={16} value={samples} onChange={(event) => setSamples(Number(event.target.value))} />
          </label>
          <label className="block text-sm text-primary">opacity correction：{opacity.toFixed(2)}
            <input className="mt-2 w-full accent-[var(--accent)]" type="range" min={0.2} max={1} step={0.05} value={opacity} onChange={(event) => setOpacity(Number(event.target.value))} />
          </label>
          <label className="block text-sm text-primary">梯度阈值：{gradient.toFixed(2)}
            <input className="mt-2 w-full accent-[var(--accent)]" type="range" min={0} max={1} step={0.05} value={gradient} onChange={(event) => setGradient(Number(event.target.value))} />
          </label>
          <label className="flex min-h-11 items-center gap-2 text-sm text-primary"><input type="checkbox" checked={light} onChange={(event) => setLight(event.target.checked)} />启用梯度光照</label>
          <label className="flex min-h-11 items-center gap-2 text-sm text-primary"><input type="checkbox" checked={emptySpace} onChange={(event) => setEmptySpace(event.target.checked)} />跳过空区域</label>
          <label className="flex min-h-11 items-center gap-2 text-sm text-primary"><input type="checkbox" checked={proceduralDetail} onChange={(event) => setProceduralDetail(event.target.checked)} />加入程序噪声细节</label>
          <p className="rounded-control border border-border bg-surface p-3 text-sm leading-6 text-secondary" aria-live="polite">{verdict}</p>
        </div>
      </div>
    </section>
  );
}
