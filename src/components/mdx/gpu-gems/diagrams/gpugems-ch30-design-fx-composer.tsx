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
      <linearGradient id={`${prefix}-flow`} x1="0" x2="1">
        <stop offset="0" stopColor={accent} stopOpacity="0.22" />
        <stop offset="1" stopColor={success} stopOpacity="0.72" />
      </linearGradient>
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

export function GpuGemsCh30ToolchainDiagram() {
  return (
    <Frame
      ariaLabel="FX Composer 工具链图：编辑器、属性面板和素材面板连接到可扩展的对象运行时，再连接到多个 Direct3D 设备窗口。"
      caption="FX Composer 把 IDE 体验、可扩展引擎和稳定的效果预览放在同一条工具链上；功能与可维护性优先于固定帧率。"
    >
      <ArrowDefs prefix="ch30-toolchain" />
      <text x={360} y={28} textAnchor="middle" fontSize={18} fontWeight={700} fill={primary}>FX Composer：面向作者的可扩展工具链</text>
      <Node x={26} y={82} width={184} height={92} title="IDE 工作区" detail="Editor · undo/redo" color={accent} />
      <Node x={26} y={210} width={184} height={92} title="属性与素材" detail=".fx · shader properties" color={warning} />
      <Arrow prefix="ch30-toolchain" x1={210} y1={128} x2={276} y2={128} />
      <Arrow prefix="ch30-toolchain" x1={210} y1={256} x2={276} y2={256} />
      <rect x={280} y={72} width={184} height={238} rx={16} fill="url(#ch30-toolchain-flow)" fillOpacity={0.24} stroke={success} strokeWidth={2} />
      <text x={372} y={108} textAnchor="middle" fontSize={15} fontWeight={700} fill={primary}>对象运行时</text>
      <text x={372} y={136} textAnchor="middle" fontSize={12} fill={secondary}>interfaces + factories</text>
      <text x={372} y={170} textAnchor="middle" fontSize={12} fill={secondary}>插件注册 / 查询</text>
      <text x={372} y={196} textAnchor="middle" fontSize={12} fill={secondary}>连接参数 / 消息</text>
      <rect x={310} y={224} width={124} height={48} rx={9} fill={surface} stroke={success} />
      <text x={372} y={253} textAnchor="middle" fontSize={12} fontWeight={700} fill={success}>public SDK</text>
      <Arrow prefix="ch30-toolchain" x1={464} y1={128} x2={516} y2={128} stroke={success} />
      <Arrow prefix="ch30-toolchain" x1={464} y1={256} x2={516} y2={256} stroke={success} />
      <Node x={520} y={58} width={174} height={74} title="Materials" detail=".fx on 3D object" color={warning} />
      <Node x={520} y={148} width={174} height={74} title="Textures" detail="targets + media" color={accent} />
      <Node x={520} y={238} width={174} height={74} title="Render / Perf" detail="preview + profiling" color={success} />
      <rect x={94} y={338} width={532} height={30} rx={10} fill={accent} fillOpacity={0.1} stroke={accent} />
      <text x={360} y={358} textAnchor="middle" fontSize={12} fill={primary}>可停靠、可隐藏、可插拔：为未来 API、调试和 profiling 留出边界</text>
    </Frame>
  );
}

export function GpuGemsCh30PluginObjectDiagram() {
  return (
    <Frame
      ariaLabel="FX Composer 插件对象模型：插件通过 INVObject 暴露 AddRef、Release、QueryInterface，再由工厂和类别注册为可创建对象。"
      caption="接口把能力拆成可查询的契约，工厂负责创建，运行时负责注册与生命周期；新功能因此可以作为插件加入。"
    >
      <ArrowDefs prefix="ch30-plugin" />
      <text x={360} y={28} textAnchor="middle" fontSize={18} fontWeight={700} fill={primary}>interface-based object：能力与生命周期分离</text>
      <rect x={30} y={80} width={200} height={232} rx={16} fill={accent} fillOpacity={0.08} stroke={accent} strokeWidth={2} />
      <text x={130} y={112} textAnchor="middle" fontSize={15} fontWeight={700} fill={primary}>插件 DLL</text>
      <text x={130} y={140} textAnchor="middle" fontSize={12} fill={secondary}>XFileImporter</text>
      <rect x={62} y={164} width={136} height={46} rx={9} fill={surface} stroke={accent} />
      <text x={130} y={193} textAnchor="middle" fontSize={12} fill={primary}>INVImportScene</text>
      <text x={130} y={240} textAnchor="middle" fontSize={12} fill={secondary}>RegisterNVObjects</text>
      <text x={130} y={263} textAnchor="middle" fontSize={12} fill={secondary}>UnRegisterNVObjects</text>
      <Arrow prefix="ch30-plugin" x1={230} y1={196} x2={286} y2={196} />
      <rect x={290} y={76} width={176} height={240} rx={16} fill={warning} fillOpacity={0.08} stroke={warning} strokeWidth={2} />
      <text x={378} y={108} textAnchor="middle" fontSize={15} fontWeight={700} fill={primary}>INVObject 基础契约</text>
      <text x={378} y={150} textAnchor="middle" fontSize={13} fill={warning}>AddRef</text>
      <text x={378} y={180} textAnchor="middle" fontSize={13} fill={warning}>Release</text>
      <text x={378} y={210} textAnchor="middle" fontSize={13} fill={warning}>QueryInterface</text>
      <text x={378} y={254} textAnchor="middle" fontSize={12} fill={secondary}>smart pointer 管理引用</text>
      <text x={378} y={277} textAnchor="middle" fontSize={12} fill={secondary}>按需发现 INVProperties</text>
      <Arrow prefix="ch30-plugin" x1={466} y1={150} x2={520} y2={150} stroke={success} />
      <Arrow prefix="ch30-plugin" x1={466} y1={242} x2={520} y2={242} stroke={success} />
      <Node x={524} y={92} width={170} height={82} title="对象工厂" detail="category + GUID" color={success} />
      <Node x={524} y={198} width={170} height={82} title="Properties 面板" detail="query + edit" color={success} />
      <rect x={104} y={340} width={512} height={30} rx={10} fill={success} fillOpacity={0.1} stroke={success} />
      <text x={360} y={360} textAnchor="middle" fontSize={12} fill={primary}>同一个对象可按需暴露 Properties、XML、Clone 等附加接口</text>
    </Frame>
  );
}

export function GpuGemsCh30MaterialCompilationDiagram() {
  return (
    <Frame
      ariaLabel="FX Composer 效果编译图：fx 文件先变成 material，再由 ID3DXEffectCompiler 编译一次，随后按设备通过 ApplyToDevice 创建设备专属 effect。"
      caption="把编译产物与 material 参数作为共享主数据，再延迟创建设备专属 effect，多个窗口可以复用一次编译结果。"
    >
      <ArrowDefs prefix="ch30-compile" />
      <text x={360} y={28} textAnchor="middle" fontSize={18} fontWeight={700} fill={primary}>.fx → material → compiler → device effect</text>
      <Node x={28} y={104} width={120} height={94} title=".fx 文件" detail="shader + state" color={accent} />
      <Arrow prefix="ch30-compile" x1={148} y1={151} x2={190} y2={151} />
      <Node x={194} y={104} width={136} height={94} title="material" detail="参数的实例" color={warning} />
      <text x={262} y={222} textAnchor="middle" fontSize={11} fill={secondary}>master parameters</text>
      <Arrow prefix="ch30-compile" x1={330} y1={151} x2={372} y2={151} />
      <Node x={376} y={104} width={150} height={94} title="EffectCompiler" detail="compile once" color={success} />
      <Arrow prefix="ch30-compile" x1={526} y1={151} x2={568} y2={151} stroke={success} />
      <rect x={572} y={72} width={126} height={160} rx={14} fill={success} fillOpacity={0.08} stroke={success} strokeWidth={2} />
      <text x={635} y={102} textAnchor="middle" fontSize={14} fontWeight={700} fill={primary}>ApplyToDevice</text>
      <text x={635} y={132} textAnchor="middle" fontSize={11} fill={secondary}>按窗口实例化</text>
      <rect x={592} y={154} width={86} height={28} rx={7} fill={surface} stroke={success} />
      <text x={635} y={173} textAnchor="middle" fontSize={11} fill={success}>ID3DXEffect</text>
      <path d="M 635 232 C 635 274 540 274 500 274" fill="none" stroke={success} strokeWidth={2} markerEnd="url(#ch30-compile-arrow)" />
      <path d="M 635 232 C 635 306 550 306 500 306" fill="none" stroke={success} strokeWidth={2} markerEnd="url(#ch30-compile-arrow)" />
      <rect x={274} y={252} width={224} height={42} rx={10} fill={surface} stroke={warning} />
      <text x={386} y={278} textAnchor="middle" fontSize={12} fill={primary}>Materials / Render window</text>
      <rect x={274} y={304} width={224} height={42} rx={10} fill={surface} stroke={accent} />
      <text x={386} y={330} textAnchor="middle" fontSize={12} fill={primary}>Textures / Shader Perf window</text>
      <rect x={56} y={260} width={166} height={68} rx={12} fill={danger} fillOpacity={0.08} stroke={danger} />
      <text x={139} y={288} textAnchor="middle" fontSize={12} fontWeight={700} fill={danger}>编译失败</text>
      <text x={139} y={311} textAnchor="middle" fontSize={11} fill={secondary}>红色 wireframe</text>
      <rect x={56} y={336} width={166} height={32} rx={9} fill={accent} fillOpacity={0.1} stroke={accent} />
      <text x={139} y={357} textAnchor="middle" fontSize={11} fill={primary}>能力不足：蓝色 wireframe</text>
    </Frame>
  );
}

export function GpuGemsCh30WorkspaceFormatDiagram() {
  return (
    <Frame
      ariaLabel="fxcomposer 工作区格式图：场景图、material palette、媒体和插件 ObjectID 汇聚到带 XML 场景描述与 binary chunk 的 ZIP 容器。"
      caption=".fxcomposer 不是纯 XML：用 XML 保存可检查的对象关系，用 binary chunk 承载场景中的二进制数据，并在重载前检查插件。"
    >
      <ArrowDefs prefix="ch30-workspace" />
      <text x={360} y={28} textAnchor="middle" fontSize={18} fontWeight={700} fill={primary}>.fxcomposer：可检查的混合工作区</text>
      <Node x={28} y={76} width={178} height={68} title="scene graph" detail="geometry · camera · light" color={accent} />
      <Node x={28} y={164} width={178} height={68} title="material palette" detail=".fx + parameters" color={warning} />
      <Node x={28} y={252} width={178} height={68} title="media / ObjectID" detail="binary + plugin check" color={success} />
      <Arrow prefix="ch30-workspace" x1={206} y1={110} x2={276} y2={174} />
      <Arrow prefix="ch30-workspace" x1={206} y1={198} x2={276} y2={198} />
      <Arrow prefix="ch30-workspace" x1={206} y1={286} x2={276} y2={222} />
      <rect x={280} y={78} width={188} height={244} rx={16} fill={accent} fillOpacity={0.08} stroke={accent} strokeWidth={2} />
      <text x={374} y={112} textAnchor="middle" fontSize={15} fontWeight={700} fill={primary}>ZIP 容器</text>
      <rect x={310} y={136} width={128} height={64} rx={10} fill={surface} stroke={warning} />
      <text x={374} y={164} textAnchor="middle" fontSize={13} fill={warning}>XML scene</text>
      <text x={374} y={185} textAnchor="middle" fontSize={11} fill={secondary}>对象层次 + offsets</text>
      <rect x={310} y={220} width={128} height={64} rx={10} fill={surface} stroke={success} />
      <text x={374} y={248} textAnchor="middle" fontSize={13} fill={success}>binary chunk</text>
      <text x={374} y={269} textAnchor="middle" fontSize={11} fill={secondary}>mesh / media data</text>
      <Arrow prefix="ch30-workspace" x1={468} y1={198} x2={526} y2={198} stroke={success} />
      <Node x={530} y={78} width={164} height={82} title="保存" detail="walk object hierarchy" color={warning} />
      <Node x={530} y={218} width={164} height={82} title="重载" detail="check plug-ins first" color={success} />
      <rect x={122} y={344} width={474} height={28} rx={9} fill={success} fillOpacity={0.1} stroke={success} />
      <text x={360} y={363} textAnchor="middle" fontSize={12} fill={primary}>缺少 teapot shape 等插件时，提示并尽量恢复其余对象</text>
    </Frame>
  );
}

export function GpuGemsCh30FxComposerLab() {
  const [compileOnce, setCompileOnce] = useState(true);
  const [deviceCount, setDeviceCount] = useState(3);
  const [pluginCount, setPluginCount] = useState(6);
  const [selectedPanel, setSelectedPanel] = useState("Render");
  const [referenceRasterizer, setReferenceRasterizer] = useState(false);

  const compileCost = compileOnce ? 1 : deviceCount;
  const runtimeCost = deviceCount * 0.72 + pluginCount * 0.08 + (referenceRasterizer ? 0.65 : 0);
  const totalCost = compileCost + runtimeCost;
  const verdict = compileOnce ? "共享编译产物，再按设备创建 effect" : "对照：每个设备重复编译 .fx";
  const barWidth = (value: number) => Math.min(290, 22 + value * 48);
  const reset = () => {
    setCompileOnce(true);
    setDeviceCount(3);
    setPluginCount(6);
    setSelectedPanel("Render");
    setReferenceRasterizer(false);
  };

  return (
    <section data-visual-kind="gpu-gems-ch30-design-fx-composer" className="not-prose my-6 rounded-card border border-border bg-elevated p-5" aria-label="FX Composer 交互实验：比较一次编译与每设备编译，调整设备窗口、插件数量和 reference rasterizer，观察工具架构成本">
      <div className="mb-4">
        <p className="mb-1 text-xs uppercase tracking-[0.18em] text-secondary">FX Composer lab</p>
        <h3 className="m-0 text-lg font-semibold text-primary">把“共享数据”和“设备实例”分开</h3>
        <p className="mt-2 text-sm leading-6 text-secondary">原书的关键取舍是：material 保留一份主参数，先用 EffectCompiler 检查并编译，再由 ApplyToDevice 延迟创建每个窗口需要的设备专属 effect。</p>
      </div>
      <div className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="rounded-control border border-border bg-surface p-3">
          <svg viewBox="0 0 420 310" role="img" aria-label={`当前选择 ${selectedPanel} 面板，${deviceCount} 个 Direct3D 设备，${compileOnce ? "一次编译" : "每设备编译"}，总成本 ${totalCost.toFixed(2)}`} className="h-auto w-full">
            <defs>
              <linearGradient id="ch30-lab-flow" x1="0" x2="1"><stop offset="0" stopColor={accent} stopOpacity="0.2" /><stop offset="1" stopColor={success} stopOpacity="0.8" /></linearGradient>
            </defs>
            <text x={210} y={22} textAnchor="middle" fontSize={16} fontWeight={700} fill={primary}>material → compiled effect → {deviceCount} devices</text>
            <rect x={18} y={54} width={102} height={60} rx={11} fill={accent} fillOpacity={0.1} stroke={accent} />
            <text x={69} y={80} textAnchor="middle" fontSize={13} fontWeight={700} fill={primary}>.fx</text>
            <text x={69} y={100} textAnchor="middle" fontSize={11} fill={secondary}>source</text>
            <line x1={120} y1={84} x2={158} y2={84} stroke={accent} strokeWidth={3} markerEnd="url(#ch30-lab-arrow)" />
            <rect x={162} y={54} width={102} height={60} rx={11} fill={warning} fillOpacity={0.1} stroke={warning} />
            <text x={213} y={80} textAnchor="middle" fontSize={13} fontWeight={700} fill={primary}>material</text>
            <text x={213} y={100} textAnchor="middle" fontSize={11} fill={secondary}>master params</text>
            <line x1={264} y1={84} x2={302} y2={84} stroke={success} strokeWidth={3} markerEnd="url(#ch30-lab-arrow)" />
            <rect x={306} y={54} width={96} height={60} rx={11} fill="url(#ch30-lab-flow)" stroke={success} />
            <text x={354} y={80} textAnchor="middle" fontSize={13} fontWeight={700} fill={primary}>compiler</text>
            <text x={354} y={100} textAnchor="middle" fontSize={11} fill={secondary}>{compileOnce ? "1 compile" : `${deviceCount} compiles`}</text>
            <text x={210} y={151} textAnchor="middle" fontSize={13} fontWeight={700} fill={primary}>ApplyToDevice → {selectedPanel}</text>
            {Array.from({ length: deviceCount }, (_, index) => {
              const y = 174 + index * 28;
              return <g key={`device-${index}`}><rect x={54} y={y} width={312} height={20} rx={7} fill={success} fillOpacity={0.1} stroke={success} /><text x={68} y={y + 14} fontSize={11} fill={primary}>device {index + 1}</text><text x={350} y={y + 14} textAnchor="end" fontSize={11} fill={secondary}>ID3DXEffect</text></g>;
            })}
            <line x1={54} y1={274} x2={54 + barWidth(compileCost)} y2={274} stroke={warning} strokeWidth={8} strokeLinecap="round" />
            <text x={64} y={296} fontSize={11} fill={primary}>compile cost {compileCost.toFixed(2)} · runtime {runtimeCost.toFixed(2)} · total {totalCost.toFixed(2)}</text>
            <defs><marker id="ch30-lab-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill={accent} /></marker></defs>
          </svg>
        </div>
        <div className="space-y-3">
          <button type="button" className="min-h-11 w-full rounded-control border border-accent px-3 py-2 text-sm text-primary hover:border-accent" aria-pressed={!compileOnce} onClick={() => setCompileOnce((current) => !current)}>切换编译策略：{compileOnce ? "一次编译" : "每设备编译"}</button>
          <label className="block text-sm text-primary" htmlFor="ch30-panel">当前预览面板</label>
          <select id="ch30-panel" className="min-h-11 w-full rounded-control border border-border bg-elevated px-3 py-2 text-sm text-primary" value={selectedPanel} onChange={(event) => setSelectedPanel(event.target.value)} aria-label="选择 FX Composer 预览面板"><option>Materials</option><option>Textures</option><option>Render</option><option>Shader Perf</option></select>
          <label className="block text-sm text-primary" htmlFor="ch30-devices">设备窗口数：{deviceCount}</label>
          <input id="ch30-devices" className="min-h-11 w-full accent-accent" type="range" min="1" max="4" step="1" value={deviceCount} onChange={(event) => setDeviceCount(Number(event.target.value))} aria-label="调整 Direct3D 设备窗口数" />
          <label className="block text-sm text-primary" htmlFor="ch30-plugins">插件对象数：{pluginCount}</label>
          <input id="ch30-plugins" className="min-h-11 w-full accent-accent" type="range" min="1" max="12" step="1" value={pluginCount} onChange={(event) => setPluginCount(Number(event.target.value))} aria-label="调整插件对象数" />
          <label className="flex min-h-11 items-center gap-3 text-sm text-primary" htmlFor="ch30-reference"><input id="ch30-reference" className="size-5 accent-accent" type="checkbox" checked={referenceRasterizer} onChange={(event) => setReferenceRasterizer(event.target.checked)} />并行 reference rasterizer 验证</label>
          <p className="rounded-control border border-border bg-surface px-3 py-2 text-sm leading-6 text-secondary">{verdict}。设备越多，设备运行时成本会上升；重复编译会把本可共享的工作放大。</p>
          <button type="button" className="min-h-11 w-full rounded-control border border-border px-3 py-2 text-sm text-primary hover:border-accent" onClick={reset}>重置实验</button>
        </div>
      </div>
    </section>
  );
}
