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

export function GpuGemsCh36EffectFileAnatomyDiagram() {
  return (
    <Frame
      ariaLabel="effect file 结构图：变量提供参数，vertex 和 pixel shader 组成 pass，多个 pass 组成 technique，technique 决定设备状态与渲染风格。"
      caption="effect file 把 shader 程序、pass 和 device state 绑在同一个资源里，让渲染器按 technique 驱动，而不是散落地管理多个文件。"
    >
      <ArrowDefs prefix="ch36-effect" />
      <text x={360} y={28} textAnchor="middle" fontSize={18} fontWeight={700} fill={primary}>effect file：把渲染状态变成资源</text>
      <rect x={24} y={72} width={188} height={234} rx={16} fill={accent} fillOpacity={0.08} stroke={accent} strokeWidth={2} />
      <text x={118} y={106} textAnchor="middle" fontSize={15} fontWeight={700} fill={primary}>variables</text>
      <text x={118} y={142} textAnchor="middle" fontSize={12} fill={secondary}>scene / material</text>
      <text x={118} y={170} textAnchor="middle" fontSize={12} fill={secondary}>semantic</text>
      <text x={118} y={198} textAnchor="middle" fontSize={12} fill={secondary}>annotation</text>
      <text x={118} y={248} textAnchor="middle" fontSize={11} fill={accent}>application writes values</text>
      <Arrow prefix="ch36-effect" x1={212} y1={188} x2={260} y2={188} />
      <rect x={264} y={64} width={202} height={250} rx={16} fill={warning} fillOpacity={0.08} stroke={warning} strokeWidth={2} />
      <text x={365} y={98} textAnchor="middle" fontSize={15} fontWeight={700} fill={primary}>technique</text>
      <rect x={292} y={118} width={146} height={62} rx={10} fill={surface} stroke={warning} />
      <text x={365} y={143} textAnchor="middle" fontSize={13} fontWeight={700} fill={primary}>pass p0</text>
      <text x={365} y={163} textAnchor="middle" fontSize={11} fill={secondary}>VS + PS + state</text>
      <rect x={292} y={198} width={146} height={62} rx={10} fill={surface} stroke={warning} />
      <text x={365} y={223} textAnchor="middle" fontSize={13} fontWeight={700} fill={primary}>pass p1</text>
      <text x={365} y={243} textAnchor="middle" fontSize={11} fill={secondary}>shadow / wireframe</text>
      <Arrow prefix="ch36-effect" x1={466} y1={188} x2={514} y2={188} stroke={success} />
      <Node x={518} y={104} width={178} height={126} title="device state" detail="validated + applied" color={success} />
      <rect x={78} y={334} width={564} height={28} rx={9} fill={surface} stroke={border} />
      <text x={360} y={353} textAnchor="middle" fontSize={11} fill={secondary}>technique 是验证单元；pass 是实际渲染单元</text>
    </Frame>
  );
}

export function GpuGemsCh36DataContractDiagram() {
  return (
    <Frame
      ariaLabel="应用与 shader 数据契约图：应用发送 scene information、material parameters 和 vertex data，renderer context 选择 technique；shader 通过变量、semantics 和 annotations 声明需求。"
      caption="数据驱动 renderer 的核心是契约：shader 声明需要什么，应用按语义提供什么，二者不靠隐含的全局状态猜测。"
    >
      <ArrowDefs prefix="ch36-contract" />
      <text x={360} y={28} textAnchor="middle" fontSize={18} fontWeight={700} fill={primary}>application ↔ shader：一份可查询的契约</text>
      <Node x={24} y={88} width={178} height={126} title="application" detail="scene + material + mesh" color={accent} />
      <Arrow prefix="ch36-contract" x1={202} y1={132} x2={248} y2={132} />
      <Arrow prefix="ch36-contract" x1={202} y1={178} x2={248} y2={178} stroke={success} />
      <rect x={252} y={64} width={212} height={200} rx={16} fill={warning} fillOpacity={0.08} stroke={warning} strokeWidth={2} />
      <text x={358} y={98} textAnchor="middle" fontSize={15} fontWeight={700} fill={primary}>binding layer</text>
      <text x={358} y={132} textAnchor="middle" fontSize={12} fill={secondary}>enumerate typed variables</text>
      <text x={358} y={160} textAnchor="middle" fontSize={12} fill={secondary}>read semantic / annotation</text>
      <text x={358} y={188} textAnchor="middle" fontSize={12} fill={secondary}>cache per-shader handles</text>
      <text x={358} y={230} textAnchor="middle" fontSize={11} fill={warning}>fail loudly on missing contract</text>
      <Arrow prefix="ch36-contract" x1={464} y1={132} x2={510} y2={132} stroke={success} />
      <Arrow prefix="ch36-contract" x1={464} y1={202} x2={510} y2={202} />
      <rect x={514} y={74} width={182} height={182} rx={16} fill={success} fillOpacity={0.08} stroke={success} strokeWidth={2} />
      <text x={605} y={108} textAnchor="middle" fontSize={15} fontWeight={700} fill={primary}>shader</text>
      <text x={605} y={140} textAnchor="middle" fontSize={12} fill={secondary}>declares variables</text>
      <text x={605} y={168} textAnchor="middle" fontSize={12} fill={secondary}>declares vertex needs</text>
      <text x={605} y={196} textAnchor="middle" fontSize={12} fill={secondary}>offers techniques</text>
      <text x={605} y={230} textAnchor="middle" fontSize={11} fill={success}>render style as resource</text>
      <rect x={80} y={300} width={560} height={48} rx={12} fill={surface} stroke={border} />
      <text x={360} y={322} textAnchor="middle" fontSize={12} fontWeight={700} fill={primary}>scene 单向下发 · material 双向发现与赋值 · vertex 按需生成</text>
      <text x={360} y={341} textAnchor="middle" fontSize={11} fill={secondary}>contract changes should be visible in validation and tooling</text>
    </Frame>
  );
}

export function GpuGemsCh36BindingCacheDiagram() {
  return (
    <Frame
      ariaLabel="shader 绑定缓存图：shader 创建时枚举变量并依据语义或 annotation 解析映射，构建每个 shader 独立的 handle table，运行时直接按变化的 scene data 写入。"
      caption="名称查找和字符串解析只应发生在 shader 创建阶段；运行时使用每个 shader 独立的 handle table，避免把绑定成本放入每帧热路径。"
    >
      <ArrowDefs prefix="ch36-cache" />
      <text x={360} y={28} textAnchor="middle" fontSize={18} fontWeight={700} fill={primary}>binding cache：解析一次，帧内直达</text>
      <Node x={28} y={92} width={166} height={112} title="shader load" detail="enumerate variables" color={accent} />
      <Arrow prefix="ch36-cache" x1={194} y1={148} x2={236} y2={148} />
      <rect x={240} y={68} width={210} height={164} rx={16} fill={warning} fillOpacity={0.08} stroke={warning} strokeWidth={2} />
      <text x={345} y={102} textAnchor="middle" fontSize={15} fontWeight={700} fill={primary}>resolve once</text>
      <text x={345} y={134} textAnchor="middle" fontSize={12} fill={secondary}>name / type check</text>
      <text x={345} y={162} textAnchor="middle" fontSize={12} fill={secondary}>semantic mapping</text>
      <text x={345} y={190} textAnchor="middle" fontSize={11} fill={warning}>create handles</text>
      <Arrow prefix="ch36-cache" x1={450} y1={148} x2={492} y2={148} stroke={success} />
      <Node x={496} y={92} width={196} height={112} title="handle table" detail="per shader instance" color={success} />
      <path d="M 594 204 C 594 256 302 256 302 232" fill="none" stroke={success} strokeWidth={2} markerEnd="url(#ch36-cache-arrow)" />
      <text x={448} y={274} textAnchor="middle" fontSize={12} fill={success}>scene change → direct writes</text>
      <rect x={78} y={306} width={564} height={44} rx={11} fill={surface} stroke={danger} />
      <text x={360} y={333} textAnchor="middle" fontSize={12} fill={danger}>不要跨 shader 复用 handle：handle 只对创建它的 effect 有效</text>
    </Frame>
  );
}

export function GpuGemsCh36TechniqueContextDiagram() {
  return (
    <Frame
      ariaLabel="technique 与 context 图：selected 和 unselected 等 renderer context 映射到 effect techniques，每个 technique 可包含多个 passes；硬件不支持一个 pass 时整套 technique 失效并选择 fallback。"
      caption="context 是应用场景，technique 是可验证的渲染风格，pass 是顺序执行的设备状态单元；fallback 让同一资源覆盖更多硬件。"
    >
      <ArrowDefs prefix="ch36-context" />
      <text x={360} y={28} textAnchor="middle" fontSize={18} fontWeight={700} fill={primary}>context → technique → passes</text>
      <rect x={24} y={78} width={180} height={226} rx={16} fill={accent} fillOpacity={0.08} stroke={accent} strokeWidth={2} />
      <text x={114} y={112} textAnchor="middle" fontSize={15} fontWeight={700} fill={primary}>renderer context</text>
      <text x={114} y={156} textAnchor="middle" fontSize={12} fill={secondary}>selected</text>
      <text x={114} y={190} textAnchor="middle" fontSize={12} fill={secondary}>unselected</text>
      <text x={114} y={224} textAnchor="middle" fontSize={12} fill={secondary}>shadow</text>
      <text x={114} y={270} textAnchor="middle" fontSize={11} fill={accent}>application chooses</text>
      <Arrow prefix="ch36-context" x1={204} y1={190} x2={250} y2={190} />
      <rect x={254} y={64} width={196} height={250} rx={16} fill={warning} fillOpacity={0.08} stroke={warning} strokeWidth={2} />
      <text x={352} y={98} textAnchor="middle" fontSize={15} fontWeight={700} fill={primary}>technique</text>
      <rect x={282} y={120} width={140} height={54} rx={9} fill={surface} stroke={warning} />
      <text x={352} y={143} textAnchor="middle" fontSize={12} fontWeight={700} fill={primary}>pass 0</text>
      <text x={352} y={161} textAnchor="middle" fontSize={11} fill={secondary}>device state</text>
      <rect x={282} y={188} width={140} height={54} rx={9} fill={surface} stroke={warning} />
      <text x={352} y={211} textAnchor="middle" fontSize={12} fontWeight={700} fill={primary}>pass 1</text>
      <text x={352} y={229} textAnchor="middle" fontSize={11} fill={secondary}>shader pair</text>
      <text x={352} y={276} textAnchor="middle" fontSize={11} fill={warning}>validate as a whole</text>
      <Arrow prefix="ch36-context" x1={450} y1={190} x2={496} y2={190} stroke={success} />
      <Node x={500} y={106} width={196} height={118} title="device" detail="valid or fallback" color={success} />
      <rect x={500} y={250} width={196} height={52} rx={10} fill={danger} fillOpacity={0.08} stroke={danger} />
      <text x={598} y={273} textAnchor="middle" fontSize={12} fontWeight={700} fill={primary}>unsupported</text>
      <text x={598} y={291} textAnchor="middle" fontSize={11} fill={danger}>select cheaper shader</text>
    </Frame>
  );
}

export function GpuGemsCh36ShaderIntegrationLab() {
  const [mappingMode, setMappingMode] = useState<"semantic" | "name">("semantic");
  const [context, setContext] = useState("selected");
  const [vertexNeeds, setVertexNeeds] = useState(2);
  const [fallback, setFallback] = useState(true);
  const [preprocessor, setPreprocessor] = useState(true);
  const lookupCost = mappingMode === "semantic" ? 0.8 : 1.25;
  const bandwidth = 4 + vertexNeeds * 2;
  const validation = fallback ? "可降级" : "硬失败";
  const compileCost = 1.1 + (preprocessor ? 0.28 : 0) + vertexNeeds * 0.12;
  const verdict = !fallback
    ? "没有 fallback：某个 technique 不支持时，当前材质可能不可见；发布前先覆盖目标硬件。"
    : mappingMode === "semantic"
      ? "推荐契约：变量名可自由演化，semantic/annotation 保持应用与 shader 的稳定映射。"
      : "名称映射适合小型、严格约定的 shader 库；规模变大后要承担命名漂移和查找成本。";
  const reset = () => {
    setMappingMode("semantic");
    setContext("selected");
    setVertexNeeds(2);
    setFallback(true);
    setPreprocessor(true);
  };

  return (
    <section
      data-visual-kind="gpu-gems-ch36-shader-integration"
      className="not-prose my-6 rounded-card border border-border bg-elevated p-5"
      aria-label="shader 集成交互实验：切换变量映射策略、renderer context、vertex data 需求、fallback 与预处理器，观察绑定、带宽、编译和验证结果"
    >
      <div className="mb-4">
        <p className="mb-1 text-xs uppercase tracking-[0.18em] text-secondary">data-driven shader integration lab</p>
        <h3 className="m-0 text-lg font-semibold text-primary">把 shader 集成做成可查询的契约</h3>
        <p className="mt-2 text-sm leading-6 text-secondary">切换变量映射、context 和 vertex 需求，观察绑定成本、顶点带宽、编译开销与硬件 fallback。数值为关系示意，不替代目标 API 的 profiling。</p>
      </div>
      <div className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="rounded-control border border-border bg-surface p-3">
          <svg viewBox="0 0 420 342" role="img" aria-label={`当前使用${mappingMode === "semantic" ? "semantic" : "变量名"}映射、${context} context、${vertexNeeds}组 vertex data、${fallback ? "有" : "无"} fallback、${preprocessor ? "有" : "无"}预处理器；绑定成本${lookupCost.toFixed(2)}，带宽${bandwidth}，编译${compileCost.toFixed(2)}`} className="h-auto w-full">
            <defs>
              <linearGradient id="ch36-lab-flow" x1="0" x2="1"><stop offset="0" stopColor={accent} stopOpacity="0.18" /><stop offset="1" stopColor={success} stopOpacity="0.82" /></linearGradient>
              <marker id="ch36-lab-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill={accent} /></marker>
            </defs>
            <text x={210} y={22} textAnchor="middle" fontSize={16} fontWeight={700} fill={primary}>resource → contract → device</text>
            <rect x={18} y={48} width={104} height={52} rx={10} fill={accent} fillOpacity="0.1" stroke={accent} />
            <text x={70} y={70} textAnchor="middle" fontSize={13} fontWeight={700} fill={primary}>effect</text>
            <text x={70} y={89} textAnchor="middle" fontSize={11} fill={secondary}>{context}</text>
            <line x1={122} y1={74} x2={150} y2={74} stroke={accent} strokeWidth={3} markerEnd="url(#ch36-lab-arrow)" />
            <rect x={154} y={48} width={112} height={52} rx={10} fill={warning} fillOpacity="0.1" stroke={warning} />
            <text x={210} y={70} textAnchor="middle" fontSize={13} fontWeight={700} fill={primary}>bind</text>
            <text x={210} y={89} textAnchor="middle" fontSize={11} fill={secondary}>{mappingMode}</text>
            <line x1={266} y1={74} x2={294} y2={74} stroke={success} strokeWidth={3} markerEnd="url(#ch36-lab-arrow)" />
            <rect x={298} y={48} width={104} height={52} rx={10} fill="url(#ch36-lab-flow)" stroke={success} />
            <text x={350} y={70} textAnchor="middle" fontSize={13} fontWeight={700} fill={primary}>GPU</text>
            <text x={350} y={89} textAnchor="middle" fontSize={11} fill={secondary}>{validation}</text>
            <rect x={34} y={132} width={352} height={82} rx={14} fill={surface} stroke={border} />
            <text x={210} y={158} textAnchor="middle" fontSize={14} fontWeight={700} fill={primary}>integration budget（示意）</text>
            <text x={210} y={181} textAnchor="middle" fontSize={12} fill={secondary}>绑定 {lookupCost.toFixed(2)} · vertex 带宽 {bandwidth} · 编译 {compileCost.toFixed(2)}</text>
            <text x={210} y={202} textAnchor="middle" fontSize={12} fill={secondary}>context {context} · {preprocessor ? "共享 include" : "独立源码"} · {fallback ? "有 fallback" : "无 fallback"}</text>
            <path d="M 210 214 L 210 248" stroke={success} strokeWidth={3} markerEnd="url(#ch36-lab-arrow)" />
            <rect x={34} y={254} width={352} height={66} rx={12} fill={fallback && mappingMode === "semantic" ? success : danger} fillOpacity={0.1} stroke={fallback && mappingMode === "semantic" ? success : danger} />
            <text x={210} y={278} textAnchor="middle" fontSize={12} fontWeight={700} fill={primary}>{context} → technique → passes · {vertexNeeds} vertex groups</text>
            <text x={210} y={301} textAnchor="middle" fontSize={11} fill={fallback && mappingMode === "semantic" ? success : danger}>{verdict.slice(0, 42)}</text>
          </svg>
        </div>
        <div className="space-y-3">
          <button type="button" className="min-h-11 w-full rounded-control border border-accent px-3 py-2 text-sm text-primary hover:border-accent" aria-pressed={mappingMode === "name"} onClick={() => setMappingMode((current) => current === "semantic" ? "name" : "semantic")}>切换变量映射：{mappingMode === "semantic" ? "semantic / annotation" : "变量名 / 类型"}</button>
          <label className="block text-sm text-primary" htmlFor="ch36-context">Renderer context</label>
          <select id="ch36-context" className="min-h-11 w-full rounded-control border border-border bg-elevated px-3 py-2 text-sm text-primary" value={context} onChange={(event) => setContext(event.target.value)} aria-label="选择 renderer context"><option value="selected">selected</option><option value="unselected">unselected</option><option value="shadow">shadow</option></select>
          <label className="block text-sm text-primary" htmlFor="ch36-vertex">所需 vertex data 组：{vertexNeeds}</label>
          <input id="ch36-vertex" className="min-h-11 w-full accent-accent" type="range" min="1" max="5" step="1" value={vertexNeeds} onChange={(event) => setVertexNeeds(Number(event.target.value))} aria-label="调整 vertex data 需求" />
          <label className="flex min-h-11 items-center gap-3 text-sm text-primary" htmlFor="ch36-fallback"><input id="ch36-fallback" className="size-5 accent-accent" type="checkbox" checked={fallback} onChange={(event) => setFallback(event.target.checked)} />为不支持的 technique 提供 fallback</label>
          <label className="flex min-h-11 items-center gap-3 text-sm text-primary" htmlFor="ch36-preprocessor"><input id="ch36-preprocessor" className="size-5 accent-accent" type="checkbox" checked={preprocessor} onChange={(event) => setPreprocessor(event.target.checked)} />启用 include 与 shader variation 预处理</label>
          <p className="rounded-control border border-border bg-surface px-3 py-2 text-sm leading-6 text-secondary">{verdict}</p>
          <button type="button" className="min-h-11 w-full rounded-control border border-border px-3 py-2 text-sm text-primary hover:border-accent" onClick={reset}>重置实验</button>
        </div>
      </div>
    </section>
  );
}
