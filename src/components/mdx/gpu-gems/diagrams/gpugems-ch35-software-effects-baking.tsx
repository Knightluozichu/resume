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

export function GpuGemsCh35ContentPipelineDiagram() {
  return (
    <Frame
      ariaLabel="高质量实时内容管线：艺术家用 DCC 和软件 renderer 创建高模与复杂 shader，再制作低模骨架，通过自动化工具烘焙到 attribute maps，最后由硬件 shader 实时显示。"
      caption="先用高质量工具表达细节，再把细节烘焙到硬件友好的低模与纹理；艺术家保留创作自由，运行时获得可控成本。"
    >
      <ArrowDefs prefix="ch35-pipeline" />
      <text x={360} y={28} textAnchor="middle" fontSize={18} fontWeight={700} fill={primary}>
        software renderer → hardware-ready content
      </text>
      <Node x={24} y={88} width={162} height={104} title="DCC + software" detail="high-res + rich shaders" color={accent} />
      <Arrow prefix="ch35-pipeline" x1={186} y1={140} x2={228} y2={140} />
      <rect x={232} y={64} width={196} height={156} rx={16} fill={warning} fillOpacity={0.08} stroke={warning} strokeWidth={2} />
      <text x={330} y={98} textAnchor="middle" fontSize={15} fontWeight={700} fill={primary}>automated bake</text>
      <text x={330} y={130} textAnchor="middle" fontSize={12} fill={secondary}>project high-res detail</text>
      <text x={330} y={156} textAnchor="middle" fontSize={12} fill={secondary}>render attributes</text>
      <text x={330} y={182} textAnchor="middle" fontSize={11} fill={warning}>UV parameterization</text>
      <Arrow prefix="ch35-pipeline" x1={428} y1={140} x2={470} y2={140} stroke={success} />
      <Node x={474} y={88} width={160} height={104} title="low-res mesh" detail="maps + vertex attrs" color={success} />
      <Arrow prefix="ch35-pipeline" x1={634} y1={140} x2={674} y2={140} stroke={success} />
      <rect x={674} y={104} width={36} height={72} rx={9} fill={success} fillOpacity={0.08} stroke={success} />
      <text x={692} y={130} textAnchor="middle" fontSize={11} fontWeight={700} fill={primary}>GPU</text>
      <text x={692} y={151} textAnchor="middle" fontSize={11} fill={secondary}>RT</text>
      <rect x={70} y={276} width={580} height={56} rx={13} fill={surface} stroke={border} />
      <text x={360} y={300} textAnchor="middle" fontSize={13} fontWeight={700} fill={primary}>保留的语义</text>
      <text x={360} y={320} textAnchor="middle" fontSize={11} fill={secondary}>颜色、法线、位移细节、反射环境和材质网络 → 可采样的纹理或顶点属性</text>
    </Frame>
  );
}

export function GpuGemsCh35AttributeMapDiagram() {
  return (
    <Frame
      ariaLabel="硬件渲染输入分类：几何数据包括三角形和 UV、法线、切线、副切线；attribute maps 包括 normal、diffuse、reflection、procedural 和 environment maps。"
      caption="硬件管线消费两类输入：三角形和顶点属性负责几何，attribute maps 以纹理密度承载原来难以实时计算的表面细节。"
    >
      <ArrowDefs prefix="ch35-attrs" />
      <text x={360} y={28} textAnchor="middle" fontSize={18} fontWeight={700} fill={primary}>hardware rendering components</text>
      <rect x={26} y={72} width={310} height={244} rx={16} fill={accent} fillOpacity={0.08} stroke={accent} strokeWidth={2} />
      <text x={181} y={108} textAnchor="middle" fontSize={15} fontWeight={700} fill={primary}>geometric data</text>
      <text x={181} y={144} textAnchor="middle" fontSize={12} fill={secondary}>triangles / strips</text>
      <text x={181} y={172} textAnchor="middle" fontSize={12} fill={secondary}>position + UV</text>
      <text x={181} y={200} textAnchor="middle" fontSize={12} fill={secondary}>normal + tangent</text>
      <text x={181} y={228} textAnchor="middle" fontSize={12} fill={secondary}>binormal basis</text>
      <text x={181} y={274} textAnchor="middle" fontSize={11} fill={accent}>vertex shader → rasterizer</text>
      <Arrow prefix="ch35-attrs" x1={336} y1={194} x2={384} y2={194} />
      <rect x={388} y={72} width={306} height={244} rx={16} fill={success} fillOpacity={0.08} stroke={success} strokeWidth={2} />
      <text x={541} y={108} textAnchor="middle" fontSize={15} fontWeight={700} fill={primary}>attribute maps</text>
      <text x={541} y={144} textAnchor="middle" fontSize={12} fill={secondary}>normal: surface direction</text>
      <text x={541} y={172} textAnchor="middle" fontSize={12} fill={secondary}>diffuse: surface color</text>
      <text x={541} y={200} textAnchor="middle" fontSize={12} fill={secondary}>reflection: environment</text>
      <text x={541} y={228} textAnchor="middle" fontSize={12} fill={secondary}>procedural / NPR effects</text>
      <text x={541} y={274} textAnchor="middle" fontSize={11} fill={success}>pixel shader → final color</text>
    </Frame>
  );
}

export function GpuGemsCh35NormalBakeDiagram() {
  return (
    <Frame
      ariaLabel="normal map 烘焙两阶段：高模法线按照低模 UV 参数化写入 model-space normal map，再结合低模 tangent 和 binormal 转换为 tangent-space normal map。"
      caption="model-space normal map 是中间证据；加入低模的 tangent basis 后再得到可复用的 tangent-space normal map。"
    >
      <ArrowDefs prefix="ch35-normal" />
      <text x={360} y={28} textAnchor="middle" fontSize={18} fontWeight={700} fill={primary}>normal bake：先投影，再换基</text>
      <Node x={28} y={88} width={160} height={104} title="high-res" detail="dense details" color={accent} />
      <Arrow prefix="ch35-normal" x1={188} y1={140} x2={228} y2={140} />
      <rect x={232} y={64} width={198} height={154} rx={16} fill={warning} fillOpacity={0.08} stroke={warning} strokeWidth={2} />
      <text x={331} y={98} textAnchor="middle" fontSize={15} fontWeight={700} fill={primary}>pass 1</text>
      <text x={331} y={130} textAnchor="middle" fontSize={12} fill={secondary}>high-res normal</text>
      <text x={331} y={156} textAnchor="middle" fontSize={12} fill={secondary}>low-res UV parameterization</text>
      <text x={331} y={184} textAnchor="middle" fontSize={11} fill={warning}>→ model-space map</text>
      <Arrow prefix="ch35-normal" x1={430} y1={140} x2={470} y2={140} stroke={success} />
      <rect x={474} y={64} width={218} height={154} rx={16} fill={success} fillOpacity={0.08} stroke={success} strokeWidth={2} />
      <text x={583} y={98} textAnchor="middle" fontSize={15} fontWeight={700} fill={primary}>pass 2</text>
      <text x={583} y={130} textAnchor="middle" fontSize={12} fill={secondary}>sample model-space normal</text>
      <text x={583} y={156} textAnchor="middle" fontSize={12} fill={secondary}>low-res tangent + binormal</text>
      <text x={583} y={184} textAnchor="middle" fontSize={11} fill={success}>→ tangent-space map</text>
      <rect x={84} y={270} width={552} height={60} rx={13} fill={surface} stroke={border} />
      <text x={360} y={295} textAnchor="middle" fontSize={13} fontWeight={700} fill={primary}>选择空间是一次工程取舍</text>
      <text x={360} y={316} textAnchor="middle" fontSize={11} fill={secondary}>model space：运行时更省但对象专用；tangent space：顶点计算更多但可平铺、可跨对象复用</text>
    </Frame>
  );
}

export function GpuGemsCh35TestCaseDiagram() {
  return (
    <Frame
      ariaLabel="GPU Gems 第 35 章测试案例：约 260000 三角形的 440 个高模网格与约 4000 三角形的单一低模对比，低模用切线空间 normal map 和 diffuse map 重现 armor 与 fabric 的效果。"
      caption="案例的关键不是某个角色数字，而是形状相近、UV 合理的低模如何用两张纹理承载高模的材质和几何细节。"
    >
      <ArrowDefs prefix="ch35-case" />
      <Node x={24} y={86} width={196} height={126} title="high-res source" detail="440 meshes · 260k+ tris" color={accent} />
      <Arrow prefix="ch35-case" x1={220} y1={148} x2={274} y2={148} />
      <rect x={278} y={64} width={164} height={168} rx={16} fill={warning} fillOpacity={0.08} stroke={warning} strokeWidth={2} />
      <text x={360} y={98} textAnchor="middle" fontSize={15} fontWeight={700} fill={primary}>bake</text>
      <text x={360} y={132} textAnchor="middle" fontSize={12} fill={secondary}>normal detail</text>
      <text x={360} y={158} textAnchor="middle" fontSize={12} fill={secondary}>diffuse color</text>
      <text x={360} y={184} textAnchor="middle" fontSize={11} fill={warning}>software renderer</text>
      <Arrow prefix="ch35-case" x1={442} y1={148} x2={496} y2={148} stroke={success} />
      <Node x={500} y={86} width={196} height={126} title="hardware target" detail="single mesh · under 4k tris" color={success} />
      <rect x={68} y={276} width={584} height={54} rx={13} fill={surface} stroke={success} />
      <text x={360} y={300} textAnchor="middle" fontSize={13} fontWeight={700} fill={primary}>reflective armor + nonspecular fabric</text>
      <text x={360} y={320} textAnchor="middle" fontSize={11} fill={secondary}>tangent normal map + diffuse map → close hardware approximation</text>
    </Frame>
  );
}

export function GpuGemsCh35BakingLab() {
  const [space, setSpace] = useState<"tangent" | "model">("tangent");
  const [uvQuality, setUvQuality] = useState(0.82);
  const [mapResolution, setMapResolution] = useState(1024);
  const [highResTriangles, setHighResTriangles] = useState(260);
  const [staticEnvironment, setStaticEnvironment] = useState(true);
  const [autoBake, setAutoBake] = useState(true);
  const shapeDelta = 0.18 + (1 - uvQuality) * 0.42;
  const bakeCost = 1.1 + highResTriangles * 0.012 + mapResolution / 2048;
  const runtimeCost = (space === "tangent" ? 1.2 : 0.78) + (staticEnvironment ? 0 : 0.5);
  const artifactRisk = Math.min(0.98, shapeDelta + (mapResolution < 1024 ? 0.12 : 0) + (autoBake ? 0 : 0.08));
  const verdict = !autoBake
    ? "风险：手工重复烘焙容易让高模、低模和 map 版本漂移；优先自动化并保留输入证据。"
    : uvQuality < 0.62
      ? "先修 UV：重叠岛和断裂会让 texel 投影与切线生成不稳定。"
      : artifactRisk < 0.34
        ? "条件良好：可把软件 renderer 的细节压到硬件输入，并用对照图复核。"
        : "需要复核：提高 UV 质量或 map 分辨率，并检查高低模形状差异。";
  const reset = () => {
    setSpace("tangent");
    setUvQuality(0.82);
    setMapResolution(1024);
    setHighResTriangles(260);
    setStaticEnvironment(true);
    setAutoBake(true);
  };

  return (
    <section
      data-visual-kind="gpu-gems-ch35-software-effects-baking"
      className="not-prose my-6 rounded-card border border-border bg-elevated p-5"
      aria-label="软件渲染效果烘焙交互实验：调整 normal map 空间、UV 质量、纹理分辨率、高模三角形数、静态环境与自动化烘焙，观察烘焙成本与运行时成本"
    >
      <div className="mb-4">
        <p className="mb-1 text-xs uppercase tracking-[0.18em] text-secondary">software → hardware baking lab</p>
        <h3 className="m-0 text-lg font-semibold text-primary">让高质量输入成为可回归的资产</h3>
        <p className="mt-2 text-sm leading-6 text-secondary">这是一个关系实验：高模细节越多，烘焙越贵；UV、形状差异和 map 分辨率决定误差；model/tangent space 则交换运行时成本与复用能力。数值为示意，不代替真实 renderer 对照。</p>
      </div>
      <div className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="rounded-control border border-border bg-surface p-3">
          <svg viewBox="0 0 420 342" role="img" aria-label={`当前${space === "tangent" ? "tangent" : "model"} space、UV质量${uvQuality.toFixed(2)}、纹理${mapResolution}像素、高模${highResTriangles}k三角形、${staticEnvironment ? "静态" : "动态"}环境、${autoBake ? "自动" : "手工"}烘焙；烘焙成本${bakeCost.toFixed(1)}、运行时成本${runtimeCost.toFixed(1)}、风险${artifactRisk.toFixed(2)}`} className="h-auto w-full">
            <defs>
              <linearGradient id="ch35-lab-flow" x1="0" x2="1"><stop offset="0" stopColor={accent} stopOpacity="0.18" /><stop offset="1" stopColor={success} stopOpacity="0.82" /></linearGradient>
              <marker id="ch35-lab-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill={accent} /></marker>
            </defs>
            <text x={210} y={22} textAnchor="middle" fontSize={16} fontWeight={700} fill={primary}>high-res → bake → low-res GPU</text>
            <rect x={18} y={48} width={104} height={52} rx={10} fill={accent} fillOpacity="0.1" stroke={accent} />
            <text x={70} y={70} textAnchor="middle" fontSize={13} fontWeight={700} fill={primary}>high-res</text>
            <text x={70} y={89} textAnchor="middle" fontSize={11} fill={secondary}>{highResTriangles}k tris</text>
            <line x1={122} y1={74} x2={150} y2={74} stroke={accent} strokeWidth={3} markerEnd="url(#ch35-lab-arrow)" />
            <rect x={154} y={48} width={112} height={52} rx={10} fill={warning} fillOpacity="0.1" stroke={warning} />
            <text x={210} y={70} textAnchor="middle" fontSize={13} fontWeight={700} fill={primary}>bake</text>
            <text x={210} y={89} textAnchor="middle" fontSize={11} fill={secondary}>{autoBake ? "automated" : "manual"}</text>
            <line x1={266} y1={74} x2={294} y2={74} stroke={success} strokeWidth={3} markerEnd="url(#ch35-lab-arrow)" />
            <rect x={298} y={48} width={104} height={52} rx={10} fill="url(#ch35-lab-flow)" stroke={success} />
            <text x={350} y={70} textAnchor="middle" fontSize={13} fontWeight={700} fill={primary}>GPU</text>
            <text x={350} y={89} textAnchor="middle" fontSize={11} fill={secondary}>{space} map</text>
            <rect x={34} y={132} width={352} height={82} rx={14} fill={surface} stroke={border} />
            <text x={210} y={158} textAnchor="middle" fontSize={14} fontWeight={700} fill={primary}>cost / quality model（示意）</text>
            <text x={210} y={181} textAnchor="middle" fontSize={12} fill={secondary}>烘焙 {bakeCost.toFixed(1)} · 运行时 {runtimeCost.toFixed(1)} · UV {uvQuality.toFixed(2)}</text>
            <text x={210} y={202} textAnchor="middle" fontSize={12} fill={secondary}>map {mapResolution}px · 形状/采样风险 {artifactRisk.toFixed(2)}</text>
            <path d="M 210 214 L 210 248" stroke={success} strokeWidth={3} markerEnd="url(#ch35-lab-arrow)" />
            <rect x={34} y={254} width={352} height={66} rx={12} fill={artifactRisk < 0.34 && autoBake ? success : danger} fillOpacity={0.1} stroke={artifactRisk < 0.34 && autoBake ? success : danger} />
            <text x={210} y={278} textAnchor="middle" fontSize={12} fontWeight={700} fill={primary}>{space === "tangent" ? "可跨对象复用" : "对象专用但运行更省"} · {staticEnvironment ? "静态环境可烘焙" : "环境需要更新"}</text>
            <text x={210} y={301} textAnchor="middle" fontSize={11} fill={artifactRisk < 0.34 && autoBake ? success : danger}>{verdict.slice(0, 42)}</text>
          </svg>
        </div>
        <div className="space-y-3">
          <button type="button" className="min-h-11 w-full rounded-control border border-accent px-3 py-2 text-sm text-primary hover:border-accent" aria-pressed={space === "model"} onClick={() => setSpace((current) => current === "tangent" ? "model" : "tangent")}>切换 normal map 空间：{space === "tangent" ? "tangent" : "model"}</button>
          <label className="block text-sm text-primary" htmlFor="ch35-uv">UV 参数化质量：{uvQuality.toFixed(2)}</label>
          <input id="ch35-uv" className="min-h-11 w-full accent-accent" type="range" min="0.3" max="1" step="0.02" value={uvQuality} onChange={(event) => setUvQuality(Number(event.target.value))} aria-label="调整 UV 参数化质量" />
          <label className="block text-sm text-primary" htmlFor="ch35-resolution">纹理分辨率：{mapResolution}px</label>
          <input id="ch35-resolution" className="min-h-11 w-full accent-accent" type="range" min="512" max="2048" step="512" value={mapResolution} onChange={(event) => setMapResolution(Number(event.target.value))} aria-label="调整纹理分辨率" />
          <label className="block text-sm text-primary" htmlFor="ch35-high-res">高模规模：{highResTriangles}k triangles</label>
          <input id="ch35-high-res" className="min-h-11 w-full accent-accent" type="range" min="80" max="520" step="20" value={highResTriangles} onChange={(event) => setHighResTriangles(Number(event.target.value))} aria-label="调整高模三角形规模" />
          <label className="flex min-h-11 items-center gap-3 text-sm text-primary" htmlFor="ch35-environment"><input id="ch35-environment" className="size-5 accent-accent" type="checkbox" checked={staticEnvironment} onChange={(event) => setStaticEnvironment(event.target.checked)} />环境静态，可烘焙 reflection map</label>
          <label className="flex min-h-11 items-center gap-3 text-sm text-primary" htmlFor="ch35-auto-bake"><input id="ch35-auto-bake" className="size-5 accent-accent" type="checkbox" checked={autoBake} onChange={(event) => setAutoBake(event.target.checked)} />自动化生成并保存 map 证据</label>
          <p className="rounded-control border border-border bg-surface px-3 py-2 text-sm leading-6 text-secondary">{verdict}</p>
          <button type="button" className="min-h-11 w-full rounded-control border border-border px-3 py-2 text-sm text-primary hover:border-accent" onClick={reset}>重置实验</button>
        </div>
      </div>
    </section>
  );
}
