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

export function GpuGemsCh31AuthoringLoopDiagram() {
  return (
    <Frame
      ariaLabel="FX Composer shader 使用工作流：编辑 .fx 文件、编译、在 Materials 面板预览、在 Scene 面板应用、在 Properties 面板调参、在 Tasks 和 Log 面板定位反馈。"
      caption="实际使用的最短反馈环不是只写 shader：编辑器、编译按钮、预览面板、属性面板和错误面板共同组成作者工作流。"
    >
      <ArrowDefs prefix="ch31-loop" />
      <text x={360} y={28} textAnchor="middle" fontSize={18} fontWeight={700} fill={primary}>FX Composer：从编辑到可验证预览</text>
      <Node x={24} y={96} width={140} height={84} title="Editor" detail="edit .fx" color={accent} />
      <Arrow prefix="ch31-loop" x1={164} y1={138} x2={206} y2={138} />
      <Node x={210} y={96} width={140} height={84} title="Compile" detail="build + check" color={warning} />
      <Arrow prefix="ch31-loop" x1={350} y1={138} x2={392} y2={138} stroke={success} />
      <Node x={396} y={96} width={140} height={84} title="Materials" detail="preview effect" color={success} />
      <Arrow prefix="ch31-loop" x1={536} y1={138} x2={578} y2={138} stroke={success} />
      <Node x={582} y={96} width={114} height={84} title="Scene" detail="apply model" color={accent} />
      <path d="M 639 180 C 639 245 554 272 488 272" fill="none" stroke={accent} strokeWidth={2} markerEnd="url(#ch31-loop-arrow)" />
      <Node x={366} y={246} width={146} height={74} title="Properties" detail="tweak + bind" color={warning} />
      <path d="M 366 282 C 298 282 242 250 242 180" fill="none" stroke={warning} strokeWidth={2} markerEnd="url(#ch31-loop-arrow)" />
      <rect x={34} y={232} width={256} height={88} rx={14} fill={danger} fillOpacity={0.08} stroke={danger} strokeWidth={2} />
      <text x={162} y={262} textAnchor="middle" fontSize={15} fontWeight={700} fill={danger}>Tasks + Log</text>
      <text x={162} y={288} textAnchor="middle" fontSize={12} fill={secondary}>error → source location</text>
      <path d="M 280 232 C 310 210 318 182 280 180" fill="none" stroke={danger} strokeWidth={2} markerEnd="url(#ch31-loop-arrow)" />
      <rect x={122} y={348} width={476} height={28} rx={9} fill={accent} fillOpacity={0.1} stroke={accent} />
      <text x={360} y={367} textAnchor="middle" fontSize={12} fill={primary}>每一步都留下可见反馈：红色 wireframe、灰色不可编辑属性或可点击的编译错误</text>
    </Frame>
  );
}

export function GpuGemsCh31PanelMapDiagram() {
  return (
    <Frame
      ariaLabel="FX Composer 面板地图：Materials 作为效果调色板，Scene Graph 负责对象树，Editor 修改源码，Shader Perf 检查 technique/pass/shader，Properties 调整参数，Textures 查看纹理。"
      caption="面板不是重复的窗口：它们围绕同一 material 和 scene object 提供不同观察角度，选择对象会让相关面板同步定位。"
    >
      <ArrowDefs prefix="ch31-panels" />
      <text x={360} y={28} textAnchor="middle" fontSize={18} fontWeight={700} fill={primary}>一个 material，多个互补视角</text>
      <rect x={274} y={126} width={172} height={108} rx={16} fill={accent} fillOpacity={0.1} stroke={accent} strokeWidth={2} />
      <text x={360} y={160} textAnchor="middle" fontSize={16} fontWeight={700} fill={primary}>当前 material</text>
      <text x={360} y={188} textAnchor="middle" fontSize={12} fill={secondary}>.fx + unique params</text>
      <text x={360} y={211} textAnchor="middle" fontSize={12} fill={secondary}>selected object ↔ selected asset</text>
      <Node x={24} y={72} width={184} height={76} title="Materials" detail="3D effect palette" color={success} />
      <Node x={24} y={258} width={184} height={76} title="Scene Graph" detail="tree + selection" color={accent} />
      <Node x={512} y={72} width={184} height={76} title="Editor" detail="source + compile" color={warning} />
      <Node x={512} y={258} width={184} height={76} title="Properties" detail="color · vector · matrix" color={warning} />
      <Arrow prefix="ch31-panels" x1={208} y1={110} x2={272} y2={146} stroke={success} />
      <Arrow prefix="ch31-panels" x1={208} y1={296} x2={272} y2={214} />
      <Arrow prefix="ch31-panels" x1={512} y1={110} x2={448} y2={146} stroke={warning} />
      <Arrow prefix="ch31-panels" x1={512} y1={296} x2={448} y2={214} stroke={warning} />
      <rect x={264} y={308} width={192} height={48} rx={10} fill={surface} stroke={success} />
      <text x={360} y={337} textAnchor="middle" fontSize={12} fill={success}>Shader Perf：technique → pass → shader</text>
    </Frame>
  );
}

export function GpuGemsCh31GeoPipeDiagram() {
  return (
    <Frame
      ariaLabel="GeoPipe 几何管线图：shape 或 mesh 插件提供初始几何，多个 pipeline object 逐阶段修改 bundle，最后输出与 effect 输入匹配的顶点流。"
      caption="GeoPipe 把几何生成和修改拆成可组合阶段；它既服务 Scene 面板，也让新 geometry plug-in 能接入现有效果测试。"
    >
      <ArrowDefs prefix="ch31-geopipe" />
      <text x={360} y={28} textAnchor="middle" fontSize={18} fontWeight={700} fill={primary}>GeoPipe：对象如何变成 effect 可用的几何</text>
      <Node x={24} y={110} width={126} height={94} title="Shape / Mesh" detail="initial bundle" color={accent} />
      <Arrow prefix="ch31-geopipe" x1={150} y1={157} x2={196} y2={157} />
      <rect x={200} y={72} width={318} height={170} rx={16} fill={warning} fillOpacity={0.08} stroke={warning} strokeWidth={2} />
      <text x={359} y={102} textAnchor="middle" fontSize={15} fontWeight={700} fill={primary}>GeoPipe stages</text>
      <rect x={222} y={128} width={82} height={70} rx={10} fill={surface} stroke={accent} />
      <text x={263} y={157} textAnchor="middle" fontSize={12} fontWeight={700} fill={primary}>Sphere</text>
      <text x={263} y={179} textAnchor="middle" fontSize={11} fill={secondary}>rings / radius</text>
      <Arrow prefix="ch31-geopipe" x1={304} y1={163} x2={324} y2={163} stroke={warning} />
      <rect x={328} y={128} width={82} height={70} rx={10} fill={surface} stroke={warning} />
      <text x={369} y={157} textAnchor="middle" fontSize={12} fontWeight={700} fill={primary}>MeshMender</text>
      <text x={369} y={179} textAnchor="middle" fontSize={11} fill={secondary}>tangent vectors</text>
      <Arrow prefix="ch31-geopipe" x1={410} y1={163} x2={430} y2={163} stroke={warning} />
      <rect x={434} y={128} width={62} height={70} rx={10} fill={surface} stroke={success} />
      <text x={465} y={157} textAnchor="middle" fontSize={12} fontWeight={700} fill={primary}>more</text>
      <text x={465} y={179} textAnchor="middle" fontSize={11} fill={secondary}>plugins</text>
      <Arrow prefix="ch31-geopipe" x1={518} y1={157} x2={564} y2={157} stroke={success} />
      <Node x={568} y={110} width={128} height={94} title="Vertex stream" detail="semantic match" color={success} />
      <path d="M 360 242 L 360 294" stroke={accent} strokeWidth={3} markerEnd="url(#ch31-geopipe-arrow)" />
      <rect x={224} y={300} width={272} height={50} rx={11} fill={success} fillOpacity={0.1} stroke={success} />
      <text x={360} y={329} textAnchor="middle" fontSize={12} fill={primary}>Scene panel：实时看到 shape、bounds、transform</text>
      <rect x={520} y={300} width={176} height={50} rx={11} fill={accent} fillOpacity={0.1} stroke={accent} />
      <text x={608} y={329} textAnchor="middle" fontSize={12} fill={primary}>custom importer 可加入</text>
    </Frame>
  );
}

export function GpuGemsCh31ParameterBindingDiagram() {
  return (
    <Frame
      ariaLabel="FX Composer 参数绑定图：.fx 的 UIType、UIName 和 UIOBJECT 注释驱动 Properties 控件，可将 lightPos 连接到场景中的灯并随动画实时更新。"
      caption="annotations 不是只给编译器看的注释：它们把 shader 参数映射成作者友好的控件，甚至能连接场景中的 light。"
    >
      <ArrowDefs prefix="ch31-binding" />
      <text x={360} y={28} textAnchor="middle" fontSize={18} fontWeight={700} fill={primary}>从 .fx annotation 到 live parameter</text>
      <rect x={24} y={86} width={188} height={206} rx={16} fill={accent} fillOpacity={0.08} stroke={accent} strokeWidth={2} />
      <text x={118} y={118} textAnchor="middle" fontSize={15} fontWeight={700} fill={primary}>.fx 参数声明</text>
      <text x={118} y={156} textAnchor="middle" fontSize={12} fill={secondary}>float4 DiffuseColor</text>
      <text x={118} y={181} textAnchor="middle" fontSize={12} fill={warning}>UIType = color</text>
      <text x={118} y={206} textAnchor="middle" fontSize={12} fill={warning}>UIName = "Albedo"</text>
      <text x={118} y={231} textAnchor="middle" fontSize={12} fill={success}>UIOBJECT = POINTLIGHT</text>
      <text x={118} y={266} textAnchor="middle" fontSize={11} fill={secondary}>metadata + value</text>
      <Arrow prefix="ch31-binding" x1={212} y1={188} x2={270} y2={188} />
      <rect x={274} y={82} width={178} height={214} rx={16} fill={warning} fillOpacity={0.08} stroke={warning} strokeWidth={2} />
      <text x={363} y={116} textAnchor="middle" fontSize={15} fontWeight={700} fill={primary}>Properties panel</text>
      <rect x={302} y={140} width={122} height={34} rx={8} fill={surface} stroke={warning} />
      <circle cx={319} cy={157} r={8} fill={warning} /><text x={336} y={162} fontSize={12} fill={primary}>Albedo</text>
      <rect x={302} y={188} width={122} height={34} rx={8} fill={surface} stroke={warning} />
      <text x={314} y={210} fontSize={11} fill={primary}>lightPos</text><circle cx={405} cy={205} r={7} fill={success} />
      <text x={363} y={258} textAnchor="middle" fontSize={11} fill={secondary}>color · vector · matrix</text>
      <Arrow prefix="ch31-binding" x1={452} y1={188} x2={510} y2={188} stroke={success} />
      <rect x={514} y={82} width={182} height={214} rx={16} fill={success} fillOpacity={0.08} stroke={success} strokeWidth={2} />
      <text x={605} y={116} textAnchor="middle" fontSize={15} fontWeight={700} fill={primary}>Scene connection</text>
      <circle cx={570} cy={170} r={18} fill={warning} fillOpacity={0.22} stroke={warning} strokeWidth={2} />
      <text x={570} y={175} textAnchor="middle" fontSize={11} fill={primary}>light</text>
      <path d="M 570 188 C 570 222 602 222 602 244" fill="none" stroke={success} strokeWidth={3} markerEnd="url(#ch31-binding-arrow)" />
      <rect x={548} y={248} width={114} height={32} rx={8} fill={surface} stroke={success} />
      <text x={605} y={269} textAnchor="middle" fontSize={11} fill={primary}>live lightPos</text>
      <rect x={110} y={334} width={500} height={30} rx={10} fill={accent} fillOpacity={0.1} stroke={accent} />
      <text x={360} y={354} textAnchor="middle" fontSize={12} fill={primary}>移动场景对象 → 当前 key frame 的参数同步变化 → Materials 立即更新</text>
    </Frame>
  );
}

export function GpuGemsCh31FxComposerLab() {
  const [compiled, setCompiled] = useState(true);
  const [panel, setPanel] = useState("Materials");
  const [color, setColor] = useState(0.62);
  const [lightBound, setLightBound] = useState(true);
  const [frame, setFrame] = useState(10);

  const previewColor = compiled ? color : 0.12;
  const shaderCost = 1.2 + previewColor * 1.4 + (lightBound ? 0.45 : 0);
  const status = compiled ? "compiled · preview live" : "source changed · compile required";
  const reset = () => {
    setCompiled(true);
    setPanel("Materials");
    setColor(0.62);
    setLightBound(true);
    setFrame(10);
  };

  return (
    <section data-visual-kind="gpu-gems-ch31-using-fx-composer" className="not-prose my-6 rounded-card border border-border bg-elevated p-5" aria-label="Using FX Composer 交互实验：切换编译状态、选择面板、调整材质颜色、连接灯光和时间帧，观察 shader 工作流的反馈">
      <div className="mb-4">
        <p className="mb-1 text-xs uppercase tracking-[0.18em] text-secondary">Using FX Composer lab</p>
        <h3 className="m-0 text-lg font-semibold text-primary">把一个 `.fx` 改动走完反馈环</h3>
        <p className="mt-2 text-sm leading-6 text-secondary">先在 Editor 改源文件，再 Compile；只有编译成功，Materials、Scene 和 Properties 才会继续共享 live 状态。实验中的成本是示意值，用来观察联动关系。</p>
      </div>
      <div className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="rounded-control border border-border bg-surface p-3">
          <svg viewBox="0 0 420 330" role="img" aria-label={`当前 ${panel} 面板，${compiled ? "已编译" : "待编译"}，颜色 ${color.toFixed(2)}，${lightBound ? "已连接灯光" : "手动参数"}，第 ${frame} 帧`} className="h-auto w-full">
            <defs>
              <linearGradient id="ch31-lab-material" x1="0" x2="1"><stop offset="0" stopColor={accent} stopOpacity="0.18" /><stop offset="1" stopColor={warning} stopOpacity={0.82} /></linearGradient>
              <marker id="ch31-lab-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill={accent} /></marker>
            </defs>
            <text x={210} y={22} textAnchor="middle" fontSize={16} fontWeight={700} fill={primary}>.fx → {panel} → live preview</text>
            <rect x={24} y={52} width={108} height={58} rx={10} fill={accent} fillOpacity={0.1} stroke={accent} />
            <text x={78} y={78} textAnchor="middle" fontSize={13} fontWeight={700} fill={primary}>check3d.fx</text>
            <text x={78} y={98} textAnchor="middle" fontSize={11} fill={secondary}>{compiled ? "compiled" : "edited"}</text>
            <line x1={132} y1={81} x2={168} y2={81} stroke={accent} strokeWidth={3} markerEnd="url(#ch31-lab-arrow)" />
            <rect x={172} y={52} width={108} height={58} rx={10} fill={compiled ? success : danger} fillOpacity={0.1} stroke={compiled ? success : danger} />
            <text x={226} y={78} textAnchor="middle" fontSize={13} fontWeight={700} fill={primary}>{compiled ? "Compile ✓" : "Tasks !"}</text>
            <text x={226} y={98} textAnchor="middle" fontSize={11} fill={secondary}>{compiled ? "no errors" : "fix source"}</text>
            <line x1={280} y1={81} x2={316} y2={81} stroke={success} strokeWidth={3} markerEnd="url(#ch31-lab-arrow)" />
            <rect x={320} y={52} width={76} height={58} rx={10} fill="url(#ch31-lab-material)" stroke={warning} />
            <text x={358} y={78} textAnchor="middle" fontSize={13} fontWeight={700} fill={primary}>preview</text>
            <text x={358} y={98} textAnchor="middle" fontSize={11} fill={secondary}>{status}</text>
            <circle cx={210} cy={188} r={64} fill={compiled ? "url(#ch31-lab-material)" : danger} fillOpacity={compiled ? 0.86 : 0.2} stroke={compiled ? warning : danger} strokeWidth={3} />
            <circle cx={188} cy={168} r={12} fill={surface} fillOpacity={0.8} />
            <circle cx={232} cy={168} r={8} fill={surface} fillOpacity={0.8} />
            <path d="M 174 214 Q 210 235 246 214" fill="none" stroke={primary} strokeWidth={4} />
            <text x={210} y={278} textAnchor="middle" fontSize={12} fill={primary}>material color {previewColor.toFixed(2)} · frame {frame}</text>
            <rect x={50} y={298} width={320} height={18} rx={7} fill={border} />
            <rect x={50} y={298} width={Math.min(320, 34 + shaderCost * 52)} height={18} rx={7} fill={compiled ? success : danger} fillOpacity={0.72} />
            <text x={210} y={312} textAnchor="middle" fontSize={11} fill={primary}>estimated shader work {shaderCost.toFixed(2)}</text>
          </svg>
        </div>
        <div className="space-y-3">
          <button type="button" className="min-h-11 w-full rounded-control border border-accent px-3 py-2 text-sm text-primary hover:border-accent" aria-pressed={!compiled} onClick={() => setCompiled((current) => !current)}>切换编译状态：{compiled ? "标记为已修改" : "重新 Compile"}</button>
          <label className="block text-sm text-primary" htmlFor="ch31-panel">当前面板</label>
          <select id="ch31-panel" className="min-h-11 w-full rounded-control border border-border bg-elevated px-3 py-2 text-sm text-primary" value={panel} onChange={(event) => setPanel(event.target.value)} aria-label="选择 FX Composer 面板"><option>Materials</option><option>Scene</option><option>Properties</option><option>Shader Perf</option><option>Tasks</option></select>
          <label className="block text-sm text-primary" htmlFor="ch31-color">材质颜色参数：{color.toFixed(2)}</label>
          <input id="ch31-color" className="min-h-11 w-full accent-accent" type="range" min="0.1" max="1" step="0.02" value={color} onChange={(event) => setColor(Number(event.target.value))} aria-label="调整材质颜色参数" />
          <label className="flex min-h-11 items-center gap-3 text-sm text-primary" htmlFor="ch31-light"><input id="ch31-light" className="size-5 accent-accent" type="checkbox" checked={lightBound} onChange={(event) => setLightBound(event.target.checked)} />把 lightPos 连接到场景灯</label>
          <label className="block text-sm text-primary" htmlFor="ch31-frame">当前 key frame：{frame}</label>
          <input id="ch31-frame" className="min-h-11 w-full accent-accent" type="range" min="0" max="30" step="1" value={frame} onChange={(event) => setFrame(Number(event.target.value))} aria-label="调整当前 key frame" />
          <p className="rounded-control border border-border bg-surface px-3 py-2 text-sm leading-6 text-secondary">{compiled ? "Materials 与 Scene 可继续预览，Properties 修改会即时反映到当前帧。" : "Tasks 面板应先给出源位置和错误，红色预览提示不能运行，修复后再编译。"}</p>
          <button type="button" className="min-h-11 w-full rounded-control border border-border px-3 py-2 text-sm text-primary hover:border-accent" onClick={reset}>重置实验</button>
        </div>
      </div>
    </section>
  );
}
