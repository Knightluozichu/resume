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

export function GpuGemsCh34PluginBridgeDiagram() {
  return (
    <Frame
      ariaLabel="Cinema 4D 主程序通过 C4Dfx 插件和 wrapper 把场景快照交给独立线程，线程使用 CgFX 与 OpenGL 离屏渲染，再把位图送回预览或 AVI 输出。"
      caption="C4Dfx 的边界：保留 Cinema 4D 作为宿主，把硬件预览与离线输出放在可并发、可隔离的渲染路径。"
    >
      <ArrowDefs prefix="ch34-bridge" />
      <text x={360} y={28} textAnchor="middle" fontSize={18} fontWeight={700} fill={primary}>
        C4Dfx：把硬件渲染接入现有宿主
      </text>
      <Node x={24} y={104} width={160} height={98} title="Cinema 4D" detail="scene + UI + materials" color={accent} />
      <Arrow prefix="ch34-bridge" x1={184} y1={152} x2={226} y2={152} />
      <rect x={230} y={76} width={184} height={154} rx={16} fill={warning} fillOpacity={0.08} stroke={warning} strokeWidth={2} />
      <text x={322} y={110} textAnchor="middle" fontSize={15} fontWeight={700} fill={primary}>C4Dfx bridge</text>
      <text x={322} y={142} textAnchor="middle" fontSize={12} fill={secondary}>wrapper functions</text>
      <text x={322} y={168} textAnchor="middle" fontSize={12} fill={secondary}>scene snapshot</text>
      <text x={322} y={194} textAnchor="middle" fontSize={12} fill={secondary}>worker threads</text>
      <Arrow prefix="ch34-bridge" x1={414} y1={152} x2={456} y2={152} stroke={success} />
      <Node x={460} y={104} width={152} height={98} title="CgFX + OpenGL" detail="off-screen render" color={success} />
      <Arrow prefix="ch34-bridge" x1={612} y1={152} x2={650} y2={112} stroke={success} />
      <Arrow prefix="ch34-bridge" x1={612} y1={152} x2={650} y2={192} stroke={success} />
      <rect x={650} y={78} width={52} height={58} rx={10} fill={success} fillOpacity={0.08} stroke={success} />
      <text x={676} y={102} textAnchor="middle" fontSize={11} fontWeight={700} fill={primary}>preview</text>
      <text x={676} y={121} textAnchor="middle" fontSize={11} fill={secondary}>bitmap</text>
      <rect x={650} y={166} width={52} height={58} rx={10} fill={success} fillOpacity={0.08} stroke={success} />
      <text x={676} y={190} textAnchor="middle" fontSize={11} fontWeight={700} fill={primary}>offline</text>
      <text x={676} y={209} textAnchor="middle" fontSize={11} fill={secondary}>AVI</text>
      <rect x={76} y={276} width={566} height={56} rx={13} fill={surface} stroke={warning} />
      <text x={359} y={300} textAnchor="middle" fontSize={13} fontWeight={700} fill={primary}>质量边界</text>
      <text x={359} y={320} textAnchor="middle" fontSize={11} fill={secondary}>交互预览追求反馈速度；离线 renderer 追求可用的近似，不承诺逐像素相同</text>
    </Frame>
  );
}

export function GpuGemsCh34SceneSnapshotDiagram() {
  return (
    <Frame
      ariaLabel="Cinema 4D 层级遍历收集三角形和四边形、法线、切线、副切线、纹理坐标与全局矩阵，复制成快照后由工作线程通过索引顶点数组渲染。"
      caption="快照把宿主正在编辑的可变场景与 worker 解耦；几何数据必须携带渲染阶段需要的坐标和属性。"
    >
      <ArrowDefs prefix="ch34-scene" />
      <text x={360} y={28} textAnchor="middle" fontSize={18} fontWeight={700} fill={primary}>scene snapshot：并发渲染的安全输入</text>
      <Node x={28} y={100} width={152} height={104} title="Hierarchy" detail="tessellate / deform" color={accent} />
      <Arrow prefix="ch34-scene" x1={180} y1={152} x2={222} y2={152} />
      <rect x={226} y={72} width={214} height={162} rx={16} fill={warning} fillOpacity={0.08} stroke={warning} strokeWidth={2} />
      <text x={333} y={104} textAnchor="middle" fontSize={15} fontWeight={700} fill={primary}>snapshot</text>
      <text x={333} y={132} textAnchor="middle" fontSize={12} fill={secondary}>indexed vertices + quads</text>
      <text x={333} y={158} textAnchor="middle" fontSize={12} fill={secondary}>normal / tangent / binormal</text>
      <text x={333} y={184} textAnchor="middle" fontSize={12} fill={secondary}>UV + world matrices</text>
      <text x={333} y={212} textAnchor="middle" fontSize={11} fill={warning}>clone before worker reads</text>
      <Arrow prefix="ch34-scene" x1={440} y1={152} x2={482} y2={152} stroke={success} />
      <Node x={486} y={100} width={160} height={104} title="worker" detail="OpenGL vertex arrays" color={success} />
      <path d="M 566 204 C 566 254 325 254 325 234" fill="none" stroke={danger} strokeWidth={2} strokeDasharray="7 6" markerEnd="url(#ch34-scene-arrow)" />
      <text x={448} y={270} textAnchor="middle" fontSize={12} fill={danger}>不要把 host 的可变对象直接交给线程</text>
      <rect x={88} y={302} width={544} height={40} rx={10} fill={surface} stroke={border} />
      <text x={360} y={327} textAnchor="middle" fontSize={12} fill={secondary}>四边形可退化成三角形；邻接关系可辅助法线，切线/副切线采用局部近似</text>
    </Frame>
  );
}

export function GpuGemsCh34ParameterWrapperDiagram() {
  return (
    <Frame
      ariaLabel="CgFX 参数管理图：效果文件的类型和 annotations 选择 ParamWrapper 子类，子类负责建立 GUI、读取动画值、分配帧或对象资源并释放资源。"
      caption="ParamWrapper 把 CgFX 参数的类型、动画和资源生命周期接到 Cinema 4D 的材质 UI；重载效果文件时可保留仍然兼容的值。"
    >
      <ArrowDefs prefix="ch34-param" />
      <text x={360} y={28} textAnchor="middle" fontSize={18} fontWeight={700} fill={primary}>ParamWrapper：参数不是一串孤立 uniform</text>
      <Node x={28} y={88} width={168} height={104} title=".fx metadata" detail="type + annotations" color={accent} />
      <Arrow prefix="ch34-param" x1={196} y1={140} x2={238} y2={140} />
      <rect x={242} y={64} width={188} height={154} rx={16} fill={warning} fillOpacity={0.08} stroke={warning} strokeWidth={2} />
      <text x={336} y={96} textAnchor="middle" fontSize={15} fontWeight={700} fill={primary}>ParamWrapper</text>
      <text x={336} y={126} textAnchor="middle" fontSize={12} fill={secondary}>float / color / texture</text>
      <text x={336} y={152} textAnchor="middle" fontSize={12} fill={secondary}>matrix / light link</text>
      <text x={336} y={178} textAnchor="middle" fontSize={11} fill={warning}>compatible reload preserves value</text>
      <Arrow prefix="ch34-param" x1={430} y1={140} x2={472} y2={140} stroke={success} />
      <rect x={476} y={70} width={216} height={142} rx={16} fill={success} fillOpacity={0.08} stroke={success} strokeWidth={2} />
      <text x={584} y={101} textAnchor="middle" fontSize={15} fontWeight={700} fill={primary}>lifecycle</text>
      <text x={584} y={130} textAnchor="middle" fontSize={12} fill={secondary}>build GUI + read animation</text>
      <text x={584} y={156} textAnchor="middle" fontSize={12} fill={secondary}>allocate frame/object data</text>
      <text x={584} y={182} textAnchor="middle" fontSize={12} fill={secondary}>release GPU resources</text>
      <rect x={84} y={270} width={552} height={58} rx={13} fill={surface} stroke={border} />
      <text x={360} y={294} textAnchor="middle" fontSize={13} fontWeight={700} fill={primary}>scene links</text>
      <text x={360} y={315} textAnchor="middle" fontSize={11} fill={secondary}>camera / light / world-view-projection matrix → 参数绑定 → CgFX effect instance</text>
      <path d="M 584 212 C 584 246 520 270 500 270" fill="none" stroke={success} strokeWidth={2} markerEnd="url(#ch34-param-arrow)" />
    </Frame>
  );
}

export function GpuGemsCh34MaterialConversionDiagram() {
  return (
    <Frame
      ariaLabel="Cinema 4D 标准材质转换图：漫反射、凹凸、环境与程序纹理被转换成内存中的 CgFX 和纹理资源，再生成阴影深度图与高光查找纹理交给效果实例。"
      caption="离线 renderer 通过转换器模拟标准材质：把 Cinema 4D 的 map 语义变成 CgFX 可消费的纹理、矩阵与光照资源。"
    >
      <ArrowDefs prefix="ch34-material" />
      <text x={360} y={28} textAnchor="middle" fontSize={18} fontWeight={700} fill={primary}>material conversion：离线路径也要复用资源</text>
      <rect x={24} y={78} width={190} height={222} rx={16} fill={accent} fillOpacity={0.08} stroke={accent} strokeWidth={2} />
      <text x={119} y={112} textAnchor="middle" fontSize={15} fontWeight={700} fill={primary}>Cinema 4D</text>
      <text x={119} y={148} textAnchor="middle" fontSize={12} fill={secondary}>diffuse map</text>
      <text x={119} y={176} textAnchor="middle" fontSize={12} fill={secondary}>bump / height</text>
      <text x={119} y={204} textAnchor="middle" fontSize={12} fill={secondary}>environment / procedural</text>
      <text x={119} y={246} textAnchor="middle" fontSize={11} fill={accent}>standard material</text>
      <Arrow prefix="ch34-material" x1={214} y1={188} x2={270} y2={188} />
      <rect x={274} y={64} width={184} height={250} rx={16} fill={warning} fillOpacity={0.08} stroke={warning} strokeWidth={2} />
      <text x={366} y={98} textAnchor="middle" fontSize={15} fontWeight={700} fill={primary}>converter</text>
      <text x={366} y={136} textAnchor="middle" fontSize={12} fill={secondary}>string stream → in-memory .fx</text>
      <text x={366} y={170} textAnchor="middle" fontSize={12} fill={warning}>height → normal map</text>
      <text x={366} y={196} textAnchor="middle" fontSize={12} fill={warning}>spherical env → cubemap</text>
      <text x={366} y={222} textAnchor="middle" fontSize={12} fill={warning}>shadow → depth map</text>
      <text x={366} y={248} textAnchor="middle" fontSize={12} fill={warning}>specular → 1D lookup</text>
      <text x={366} y={286} textAnchor="middle" fontSize={11} fill={secondary}>cache when animation permits</text>
      <Arrow prefix="ch34-material" x1={458} y1={188} x2={514} y2={188} stroke={success} />
      <Node x={518} y={104} width={178} height={164} title="ICgFXEffect" detail="textures + lights + matrices" color={success} />
      <text x={607} y={210} textAnchor="middle" fontSize={11} fill={success}>compile once, render many</text>
    </Frame>
  );
}

export function GpuGemsCh34Cinema4DLab() {
  const [reuseTextures, setReuseTextures] = useState(true);
  const [frameSize, setFrameSize] = useState(640);
  const [frames, setFrames] = useState(10);
  const [complexity, setComplexity] = useState(2);
  const [shadowLights, setShadowLights] = useState(2);
  const [snapshotSafe, setSnapshotSafe] = useState(true);
  const textureBuilds = reuseTextures ? 1 : frames;
  const startupCost = 1.4 + complexity * 0.55 + textureBuilds * 0.18;
  const pixelsPerFrame = (frameSize * frameSize) / (640 * 640);
  const frameCost = 0.72 * pixelsPerFrame + complexity * 0.16 + shadowLights * 0.1;
  const totalCost = startupCost + frameCost * frames;
  const amortized = totalCost / frames;
  const verdict = !snapshotSafe
    ? "风险：worker 可能读到宿主正在修改的对象，先建立 scene snapshot。"
    : reuseTextures
      ? "适合连续帧：把 CgFX 编译和纹理转换成本摊薄，再观察显存预算。"
      : "适合检查单帧启动成本：连续帧会反复创建纹理，吞吐通常更差。";
  const reset = () => {
    setReuseTextures(true);
    setFrameSize(640);
    setFrames(10);
    setComplexity(2);
    setShadowLights(2);
    setSnapshotSafe(true);
  };

  return (
    <section
      data-visual-kind="gpu-gems-ch34-integrating-cinema4d"
      className="not-prose my-6 rounded-card border border-border bg-elevated p-5"
      aria-label="Cinema 4D 硬件 shading 交互实验：调整纹理复用、帧尺寸、帧数、效果复杂度、阴影光源和 scene snapshot，观察启动成本与摊销成本"
    >
      <div className="mb-4">
        <p className="mb-1 text-xs uppercase tracking-[0.18em] text-secondary">C4Dfx hardware shading lab</p>
        <h3 className="m-0 text-lg font-semibold text-primary">把“近交互”拆成可观察的成本</h3>
        <p className="mt-2 text-sm leading-6 text-secondary">原章的性能结论依赖连续帧：CgFX 编译和 OpenGL 纹理创建有启动成本，较大画面与序列渲染才能摊薄它。数值是关系示意，不代替目标显卡 profiling。</p>
      </div>
      <div className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="rounded-control border border-border bg-surface p-3">
          <svg viewBox="0 0 420 342" role="img" aria-label={`当前${reuseTextures ? "复用纹理" : "每帧重建纹理"}、${frames}帧、${frameSize}像素宽、复杂度${complexity}、${shadowLights}个阴影光源、${snapshotSafe ? "使用" : "未使用"}场景快照；启动成本${startupCost.toFixed(1)}，每帧成本${frameCost.toFixed(1)}，平均每帧${amortized.toFixed(1)}`} className="h-auto w-full">
            <defs>
              <linearGradient id="ch34-lab-cost" x1="0" x2="1"><stop offset="0" stopColor={warning} stopOpacity="0.2" /><stop offset="1" stopColor={success} stopOpacity="0.8" /></linearGradient>
              <marker id="ch34-lab-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill={accent} /></marker>
            </defs>
            <text x={210} y={22} textAnchor="middle" fontSize={16} fontWeight={700} fill={primary}>host → snapshot → off-screen → bitmap</text>
            <rect x={18} y={48} width={92} height={52} rx={10} fill={accent} fillOpacity="0.1" stroke={accent} />
            <text x={64} y={70} textAnchor="middle" fontSize={13} fontWeight={700} fill={primary}>C4D</text>
            <text x={64} y={89} textAnchor="middle" fontSize={11} fill={secondary}>editable</text>
            <line x1={110} y1={74} x2={138} y2={74} stroke={accent} strokeWidth={3} markerEnd="url(#ch34-lab-arrow)" />
            <rect x={142} y={48} width={100} height={52} rx={10} fill={warning} fillOpacity="0.1" stroke={warning} />
            <text x={192} y={70} textAnchor="middle" fontSize={13} fontWeight={700} fill={primary}>snapshot</text>
            <text x={192} y={89} textAnchor="middle" fontSize={11} fill={secondary}>{snapshotSafe ? "isolated" : "shared"}</text>
            <line x1={242} y1={74} x2={270} y2={74} stroke={success} strokeWidth={3} markerEnd="url(#ch34-lab-arrow)" />
            <rect x={274} y={48} width={112} height={52} rx={10} fill="url(#ch34-lab-cost)" stroke={success} />
            <text x={330} y={70} textAnchor="middle" fontSize={13} fontWeight={700} fill={primary}>off-screen</text>
            <text x={330} y={89} textAnchor="middle" fontSize={11} fill={secondary}>bitmap output</text>
            <rect x={34} y={132} width={352} height={82} rx={14} fill={surface} stroke={border} />
            <text x={210} y={158} textAnchor="middle" fontSize={14} fontWeight={700} fill={primary}>cost model（示意）</text>
            <text x={210} y={181} textAnchor="middle" fontSize={12} fill={secondary}>启动 {startupCost.toFixed(1)} = compile + {textureBuilds} 次纹理构建</text>
            <text x={210} y={202} textAnchor="middle" fontSize={12} fill={secondary}>每帧 {frameCost.toFixed(1)} · 序列总计 {totalCost.toFixed(1)} · 摊销 {amortized.toFixed(1)}</text>
            <path d="M 210 214 L 210 248" stroke={success} strokeWidth={3} markerEnd="url(#ch34-lab-arrow)" />
            <rect x={34} y={254} width={352} height={66} rx={12} fill={amortized < 2.2 && snapshotSafe ? success : danger} fillOpacity={0.1} stroke={amortized < 2.2 && snapshotSafe ? success : danger} />
            <text x={210} y={278} textAnchor="middle" fontSize={12} fontWeight={700} fill={primary}>{reuseTextures ? "跨帧保留资源" : "每帧重新转换资源"} · {frameSize}² · {shadowLights} shadow lights</text>
            <text x={210} y={301} textAnchor="middle" fontSize={11} fill={amortized < 2.2 && snapshotSafe ? success : danger}>{snapshotSafe ? "快照隔离成立" : "缺少快照隔离"} · {amortized < 2.2 ? "序列更接近交互" : "先优化启动或每帧成本"}</text>
          </svg>
        </div>
        <div className="space-y-3">
          <button type="button" className="min-h-11 w-full rounded-control border border-accent px-3 py-2 text-sm text-primary hover:border-accent" aria-pressed={!reuseTextures} onClick={() => setReuseTextures((current) => !current)}>切换纹理策略：{reuseTextures ? "跨帧复用" : "每帧重建"}</button>
          <label className="block text-sm text-primary" htmlFor="ch34-frame-size">画面宽度：{frameSize}px</label>
          <input id="ch34-frame-size" className="min-h-11 w-full accent-accent" type="range" min="320" max="1280" step="160" value={frameSize} onChange={(event) => setFrameSize(Number(event.target.value))} aria-label="调整画面宽度" />
          <label className="block text-sm text-primary" htmlFor="ch34-frames">序列帧数：{frames}</label>
          <input id="ch34-frames" className="min-h-11 w-full accent-accent" type="range" min="1" max="24" step="1" value={frames} onChange={(event) => setFrames(Number(event.target.value))} aria-label="调整序列帧数" />
          <label className="block text-sm text-primary" htmlFor="ch34-complexity">CgFX 效果复杂度：{complexity}</label>
          <input id="ch34-complexity" className="min-h-11 w-full accent-accent" type="range" min="1" max="5" step="1" value={complexity} onChange={(event) => setComplexity(Number(event.target.value))} aria-label="调整效果复杂度" />
          <label className="block text-sm text-primary" htmlFor="ch34-shadow-lights">使用阴影的光源：{shadowLights}</label>
          <input id="ch34-shadow-lights" className="min-h-11 w-full accent-accent" type="range" min="0" max="6" step="1" value={shadowLights} onChange={(event) => setShadowLights(Number(event.target.value))} aria-label="调整阴影光源数量" />
          <label className="flex min-h-11 items-center gap-3 text-sm text-primary" htmlFor="ch34-snapshot"><input id="ch34-snapshot" className="size-5 accent-accent" type="checkbox" checked={snapshotSafe} onChange={(event) => setSnapshotSafe(event.target.checked)} />使用 scene snapshot 隔离 worker</label>
          <p className="rounded-control border border-border bg-surface px-3 py-2 text-sm leading-6 text-secondary">{verdict}</p>
          <button type="button" className="min-h-11 w-full rounded-control border border-border px-3 py-2 text-sm text-primary hover:border-accent" onClick={reset}>重置实验</button>
        </div>
      </div>
    </section>
  );
}
