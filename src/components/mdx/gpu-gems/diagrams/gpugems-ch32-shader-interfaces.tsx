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

export function GpuGemsCh32InterfaceCompositionDiagram() {
  return (
    <Frame
      ariaLabel="shader interface 组合图：通用 shader 通过抽象 interface 调用功能，应用把实现对象交给 Cg runtime，runtime 绑定后编译出最终 GPU 程序。"
      caption="接口把“调用什么”与“具体怎么做”分开；绑定实现后才生成最终程序，应用无需在字符串层拼接专用 shader 源码。"
    >
      <ArrowDefs prefix="ch32-composition" />
      <text x={360} y={28} textAnchor="middle" fontSize={18} fontWeight={700} fill={primary}>shader interface：抽象调用，运行时组合</text>
      <rect x={24} y={88} width={206} height={182} rx={16} fill={accent} fillOpacity={0.08} stroke={accent} strokeWidth={2} />
      <text x={127} y={122} textAnchor="middle" fontSize={15} fontWeight={700} fill={primary}>generic shader</text>
      <text x={127} y={156} textAnchor="middle" fontSize={13} fill={secondary}>normalizer.nrm(v)</text>
      <text x={127} y={184} textAnchor="middle" fontSize={13} fill={secondary}>lights[i].illuminate(P)</text>
      <text x={127} y={212} textAnchor="middle" fontSize={13} fill={secondary}>material.color(...)</text>
      <text x={127} y={248} textAnchor="middle" fontSize={11} fill={accent}>不依赖具体实现</text>
      <Arrow prefix="ch32-composition" x1={230} y1={178} x2={282} y2={178} />
      <rect x={286} y={80} width={166} height={198} rx={16} fill={warning} fillOpacity={0.08} stroke={warning} strokeWidth={2} />
      <text x={369} y={116} textAnchor="middle" fontSize={15} fontWeight={700} fill={primary}>Cg runtime</text>
      <text x={369} y={150} textAnchor="middle" fontSize={12} fill={secondary}>createParameter</text>
      <text x={369} y={178} textAnchor="middle" fontSize={12} fill={secondary}>connectParameter</text>
      <text x={369} y={206} textAnchor="middle" fontSize={12} fill={secondary}>set array size</text>
      <text x={369} y={242} textAnchor="middle" fontSize={11} fill={warning}>bind → compile</text>
      <Arrow prefix="ch32-composition" x1={452} y1={178} x2={504} y2={178} stroke={success} />
      <Node x={508} y={92} width={188} height={76} title="implementations" detail="Std · Cube · Light" color={success} />
      <Node x={508} y={196} width={188} height={76} title="final GPU program" detail="specialized instructions" color={success} />
      <path d="M 602 168 L 602 196" stroke={success} strokeWidth={3} markerEnd="url(#ch32-composition-arrow)" />
      <rect x={138} y={326} width={444} height={32} rx={10} fill={success} fillOpacity={0.1} stroke={success} />
      <text x={360} y={347} textAnchor="middle" fontSize={12} fill={primary}>GPU 运行没有接口动态分派成本；代价主要在绑定后的 runtime/compiler 工作</text>
    </Frame>
  );
}

export function GpuGemsCh32NormalizationDiagram() {
  return (
    <Frame
      ariaLabel="向量归一化示例：同一个 Normalizer interface 被 StdNormalizer 的数值计算或 CubeNormalizer 的 cube map 查表实现，主 fragment shader 不变。"
      caption="接口让硬件能力选择留在绑定阶段：主 shader 只调用 nrm，应用可以在运行时选择数值归一化或 cube-map 查表。"
    >
      <ArrowDefs prefix="ch32-normalizer" />
      <text x={360} y={28} textAnchor="middle" fontSize={18} fontWeight={700} fill={primary}>Normalizer：同一调用，不同实现</text>
      <rect x={30} y={106} width={202} height={150} rx={16} fill={accent} fillOpacity={0.08} stroke={accent} strokeWidth={2} />
      <text x={131} y={140} textAnchor="middle" fontSize={15} fontWeight={700} fill={primary}>fragment shader</text>
      <text x={131} y={176} textAnchor="middle" fontSize={13} fill={secondary}>normalizer.nrm(L)</text>
      <text x={131} y={204} textAnchor="middle" fontSize={13} fill={secondary}>normalizer.nrm(N)</text>
      <text x={131} y={238} textAnchor="middle" fontSize={11} fill={accent}>只知道 interface</text>
      <Arrow prefix="ch32-normalizer" x1={232} y1={181} x2={284} y2={181} />
      <rect x={288} y={76} width={174} height={210} rx={16} fill={warning} fillOpacity={0.08} stroke={warning} strokeWidth={2} />
      <text x={375} y={112} textAnchor="middle" fontSize={15} fontWeight={700} fill={primary}>Normalizer</text>
      <text x={375} y={148} textAnchor="middle" fontSize={13} fill={warning}>float3 nrm(float3 v)</text>
      <rect x={318} y={176} width={114} height={46} rx={9} fill={surface} stroke={warning} />
      <text x={375} y={205} textAnchor="middle" fontSize={12} fill={primary}>runtime binding</text>
      <text x={375} y={252} textAnchor="middle" fontSize={11} fill={secondary}>one selected instance</text>
      <Arrow prefix="ch32-normalizer" x1={462} y1={145} x2={516} y2={145} stroke={success} />
      <Arrow prefix="ch32-normalizer" x1={462} y1={231} x2={516} y2={231} stroke={success} />
      <Node x={520} y={88} width={176} height={78} title="StdNormalizer" detail="normalize() math" color={success} />
      <Node x={520} y={194} width={176} height={78} title="CubeNormalizer" detail="texCUBE lookup" color={success} />
      <rect x={112} y={326} width={496} height={32} rx={10} fill={accent} fillOpacity={0.1} stroke={accent} />
      <text x={360} y={347} textAnchor="middle" fontSize={12} fill={primary}>换实现只需重新 connectParameter，再手动 compile；不用复制整份 fragment shader</text>
    </Frame>
  );
}

export function GpuGemsCh32LightArrayDiagram() {
  return (
    <Frame
      ariaLabel="可变光源数量图：Cg runtime 设置 unsized lights 数组长度并连接多个 Light 实例，fragment shader 遍历 lights.length 进行累积照明。"
      caption="unsized array 把光源数量从 shader 源码中移出；运行时先设长度、再绑定每个接口实例，最终程序才被编译。"
    >
      <ArrowDefs prefix="ch32-lights" />
      <text x={360} y={28} textAnchor="middle" fontSize={18} fontWeight={700} fill={primary}>Light interface + unsized array</text>
      <rect x={24} y={86} width={186} height={208} rx={16} fill={accent} fillOpacity={0.08} stroke={accent} strokeWidth={2} />
      <text x={117} y={120} textAnchor="middle" fontSize={15} fontWeight={700} fill={primary}>fragment shader</text>
      <text x={117} y={158} textAnchor="middle" fontSize={13} fill={secondary}>for i &lt; lights.length</text>
      <text x={117} y={185} textAnchor="middle" fontSize={13} fill={secondary}>lights[i].illuminate(P)</text>
      <text x={117} y={212} textAnchor="middle" fontSize={13} fill={secondary}>C += Kd × Cl × N·L</text>
      <text x={117} y={256} textAnchor="middle" fontSize={11} fill={accent}>没有硬编码数量</text>
      <Arrow prefix="ch32-lights" x1={210} y1={188} x2={268} y2={188} />
      <rect x={272} y={78} width={176} height={224} rx={16} fill={warning} fillOpacity={0.08} stroke={warning} strokeWidth={2} />
      <text x={360} y={114} textAnchor="middle" fontSize={15} fontWeight={700} fill={primary}>Cg runtime</text>
      <text x={360} y={150} textAnchor="middle" fontSize={12} fill={warning}>cgSetArraySize</text>
      <text x={360} y={179} textAnchor="middle" fontSize={12} fill={warning}>cgCreateParameter</text>
      <text x={360} y={208} textAnchor="middle" fontSize={12} fill={warning}>cgConnectParameter</text>
      <text x={360} y={252} textAnchor="middle" fontSize={11} fill={secondary}>length → instances → compile</text>
      <Arrow prefix="ch32-lights" x1={448} y1={188} x2={504} y2={188} stroke={success} />
      <rect x={508} y={78} width={188} height={224} rx={16} fill={success} fillOpacity={0.08} stroke={success} strokeWidth={2} />
      <text x={602} y={114} textAnchor="middle" fontSize={15} fontWeight={700} fill={primary}>bound lights</text>
      <rect x={538} y={138} width={128} height={30} rx={8} fill={surface} stroke={success} /><text x={602} y={158} textAnchor="middle" fontSize={11} fill={primary}>point light</text>
      <rect x={538} y={180} width={128} height={30} rx={8} fill={surface} stroke={success} /><text x={602} y={200} textAnchor="middle" fontSize={11} fill={primary}>spot light</text>
      <rect x={538} y={222} width={128} height={30} rx={8} fill={surface} stroke={success} /><text x={602} y={242} textAnchor="middle" fontSize={11} fill={primary}>shadow light …</text>
      <rect x={144} y={330} width={432} height={28} rx={9} fill={success} fillOpacity={0.1} stroke={success} />
      <text x={360} y={349} textAnchor="middle" fontSize={12} fill={primary}>最终 GPU 指令在具体数量和类型确定后生成</text>
    </Frame>
  );
}

export function GpuGemsCh32MaterialTreeDiagram() {
  return (
    <Frame
      ariaLabel="材质树图：Material 调用 Texture 和 Light 接口，Texture 可以由 ImageTexture、ConstantTexture 或 BlendTexture 实现，FogMaterial 可装饰另一个 Material。"
      caption="接口组合把材质库组织成树或网络：DiffuseMaterial 不需要知道纹理来自图片、常量还是程序生成。"
    >
      <ArrowDefs prefix="ch32-tree" />
      <text x={360} y={28} textAnchor="middle" fontSize={18} fontWeight={700} fill={primary}>Material tree：正交组合 shader 功能</text>
      <rect x={278} y={70} width={164} height={64} rx={13} fill={accent} fillOpacity={0.1} stroke={accent} strokeWidth={2} />
      <text x={360} y={98} textAnchor="middle" fontSize={15} fontWeight={700} fill={primary}>main → Material</text>
      <text x={360} y={120} textAnchor="middle" fontSize={11} fill={secondary}>color(P, N, I, uv, lights)</text>
      <path d="M 320 134 L 220 190" stroke={accent} strokeWidth={3} markerEnd="url(#ch32-tree-arrow)" />
      <path d="M 400 134 L 500 190" stroke={accent} strokeWidth={3} markerEnd="url(#ch32-tree-arrow)" />
      <Node x={112} y={190} width={216} height={74} title="DiffuseMaterial" detail="uses Texture + Light[]" color={warning} />
      <Node x={392} y={190} width={216} height={74} title="FogMaterial" detail="decorates base Material" color={success} />
      <path d="M 220 264 L 160 312" stroke={warning} strokeWidth={3} markerEnd="url(#ch32-tree-arrow)" />
      <path d="M 220 264 L 300 312" stroke={warning} strokeWidth={3} markerEnd="url(#ch32-tree-arrow)" />
      <path d="M 500 264 L 560 312" stroke={success} strokeWidth={3} markerEnd="url(#ch32-tree-arrow)" />
      <Node x={66} y={316} width={150} height={48} title="ImageTexture" detail="sampler2D" color={accent} />
      <Node x={234} y={316} width={150} height={48} title="BlendTexture" detail="Texture + Texture" color={accent} />
      <Node x={486} y={316} width={150} height={48} title="base Material" detail="any implementation" color={success} />
    </Frame>
  );
}

export function GpuGemsCh32ShaderInterfaceLab() {
  const [normalizer, setNormalizer] = useState("StdNormalizer");
  const [lightCount, setLightCount] = useState(3);
  const [material, setMaterial] = useState("DiffuseMaterial");
  const [manualCompile, setManualCompile] = useState(true);
  const [constantParameter, setConstantParameter] = useState(true);

  const interfaceBindings = 1 + lightCount + (material === "BlendMaterial" ? 3 : 1);
  const compilePasses = manualCompile ? 1 : 1 + lightCount;
  const runtimeCost = 0.7 + interfaceBindings * 0.18 + (manualCompile ? 0.15 : 0.45);
  const instructionGain = constantParameter ? 0.82 : 1.0;
  const reset = () => {
    setNormalizer("StdNormalizer");
    setLightCount(3);
    setMaterial("DiffuseMaterial");
    setManualCompile(true);
    setConstantParameter(true);
  };

  return (
    <section data-visual-kind="gpu-gems-ch32-shader-interfaces" className="not-prose my-6 rounded-card border border-border bg-elevated p-5" aria-label="Shader Interfaces 交互实验：选择归一化实现、光源数量、材质组合和编译策略，观察接口绑定与最终程序生成">
      <div className="mb-4">
        <p className="mb-1 text-xs uppercase tracking-[0.18em] text-secondary">Shader interfaces lab</p>
        <h3 className="m-0 text-lg font-semibold text-primary">绑定组件，再生成专用程序</h3>
        <p className="mt-2 text-sm leading-6 text-secondary">实验把官方三类例子压缩到同一条路径：Normalizer 选择实现，Light[] 在运行时确定长度，Material 再组合 Texture。数字是关系示意，不是某个 GPU 的 benchmark。</p>
      </div>
      <div className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="rounded-control border border-border bg-surface p-3">
          <svg viewBox="0 0 420 330" role="img" aria-label={`当前 ${normalizer}、${lightCount} 个光源、${material}、${manualCompile ? "手动编译" : "自动编译"}，接口绑定数 ${interfaceBindings}`} className="h-auto w-full">
            <defs>
              <linearGradient id="ch32-lab-flow" x1="0" x2="1"><stop offset="0" stopColor={accent} stopOpacity="0.18" /><stop offset="1" stopColor={success} stopOpacity="0.82" /></linearGradient>
              <marker id="ch32-lab-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill={accent} /></marker>
            </defs>
            <text x={210} y={22} textAnchor="middle" fontSize={16} fontWeight={700} fill={primary}>interfaces → bindings → final GPU code</text>
            <rect x={20} y={52} width={116} height={58} rx={10} fill={accent} fillOpacity={0.1} stroke={accent} />
            <text x={78} y={78} textAnchor="middle" fontSize={13} fontWeight={700} fill={primary}>generic main()</text>
            <text x={78} y={98} textAnchor="middle" fontSize={11} fill={secondary}>{material} + Light[]</text>
            <line x1={136} y1={81} x2={174} y2={81} stroke={accent} strokeWidth={3} markerEnd="url(#ch32-lab-arrow)" />
            <rect x={178} y={52} width={112} height={58} rx={10} fill={warning} fillOpacity={0.1} stroke={warning} />
            <text x={234} y={78} textAnchor="middle" fontSize={13} fontWeight={700} fill={primary}>Cg runtime</text>
            <text x={234} y={98} textAnchor="middle" fontSize={11} fill={secondary}>{interfaceBindings} bindings</text>
            <line x1={290} y1={81} x2={328} y2={81} stroke={success} strokeWidth={3} markerEnd="url(#ch32-lab-arrow)" />
            <rect x={332} y={52} width={68} height={58} rx={10} fill="url(#ch32-lab-flow)" stroke={success} />
            <text x={366} y={78} textAnchor="middle" fontSize={13} fontWeight={700} fill={primary}>compile</text>
            <text x={366} y={98} textAnchor="middle" fontSize={11} fill={secondary}>{compilePasses} pass</text>
            <rect x={46} y={142} width={328} height={94} rx={14} fill={surface} stroke={success} />
            <text x={210} y={170} textAnchor="middle" fontSize={14} fontWeight={700} fill={primary}>{normalizer} · {lightCount} lights · {material}</text>
            {Array.from({ length: lightCount }, (_, index) => {
              const x = 78 + index * 48;
              return <g key={`light-${index}`}><circle cx={x} cy={206} r={13} fill={warning} fillOpacity={0.7} stroke={warning} /><text x={x} y={210} textAnchor="middle" fontSize={11} fill={primary}>L{index + 1}</text></g>;
            })}
            <path d="M 210 236 L 210 270" stroke={success} strokeWidth={3} markerEnd="url(#ch32-lab-arrow)" />
            <rect x={72} y={276} width={276} height={38} rx={9} fill={success} fillOpacity={0.1} stroke={success} />
            <text x={210} y={300} textAnchor="middle" fontSize={11} fill={primary}>runtime {runtimeCost.toFixed(2)} · instruction factor {instructionGain.toFixed(2)}</text>
          </svg>
        </div>
        <div className="space-y-3">
          <button type="button" className="min-h-11 w-full rounded-control border border-accent px-3 py-2 text-sm text-primary hover:border-accent" aria-pressed={!manualCompile} onClick={() => setManualCompile((current) => !current)}>切换编译策略：{manualCompile ? "手动绑定后编译" : "自动重编译对照"}</button>
          <label className="block text-sm text-primary" htmlFor="ch32-normalizer">Normalizer 实现</label>
          <select id="ch32-normalizer" className="min-h-11 w-full rounded-control border border-border bg-elevated px-3 py-2 text-sm text-primary" value={normalizer} onChange={(event) => setNormalizer(event.target.value)} aria-label="选择 Normalizer 实现"><option>StdNormalizer</option><option>CubeNormalizer</option></select>
          <label className="block text-sm text-primary" htmlFor="ch32-lights">Light[] 数量：{lightCount}</label>
          <input id="ch32-lights" className="min-h-11 w-full accent-accent" type="range" min="1" max="6" step="1" value={lightCount} onChange={(event) => setLightCount(Number(event.target.value))} aria-label="调整 Light 数组数量" />
          <label className="block text-sm text-primary" htmlFor="ch32-material">Material 组合</label>
          <select id="ch32-material" className="min-h-11 w-full rounded-control border border-border bg-elevated px-3 py-2 text-sm text-primary" value={material} onChange={(event) => setMaterial(event.target.value)} aria-label="选择 Material 组合"><option>DiffuseMaterial</option><option>BlendMaterial</option></select>
          <label className="flex min-h-11 items-center gap-3 text-sm text-primary" htmlFor="ch32-constant"><input id="ch32-constant" className="size-5 accent-accent" type="checkbox" checked={constantParameter} onChange={(event) => setConstantParameter(event.target.checked)} />把参数标为 constant</label>
          <p className="rounded-control border border-border bg-surface px-3 py-2 text-sm leading-6 text-secondary">{manualCompile ? "先完成接口连接再编译，避免未绑定接口导致编译失败。" : "自动编译更省显式步骤，但每次连接变化都可能增加重复编译。"}</p>
          <button type="button" className="min-h-11 w-full rounded-control border border-border px-3 py-2 text-sm text-primary hover:border-accent" onClick={reset}>重置实验</button>
        </div>
      </div>
    </section>
  );
}
