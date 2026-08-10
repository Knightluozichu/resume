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

function rounded(value: number) {
  return Number(value.toFixed(3));
}

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
        <svg viewBox="0 0 720 400" role="img" aria-label={ariaLabel} className="mx-auto block h-auto w-full max-w-[720px]">
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
      <linearGradient id={`${prefix}-gpu`} x1="0" x2="1">
        <stop offset="0" stopColor={accent} stopOpacity="0.2" />
        <stop offset="0.5" stopColor={success} stopOpacity="0.58" />
        <stop offset="1" stopColor={warning} stopOpacity="0.82" />
      </linearGradient>
      <linearGradient id={`${prefix}-night`} x1="0" x2="1">
        <stop offset="0" stopColor={accent} stopOpacity="0.22" />
        <stop offset="1" stopColor={success} stopOpacity="0.72" />
      </linearGradient>
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
  return <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={stroke} strokeWidth={3} markerEnd={`url(#${prefix}-arrow)`} />;
}

export function GpuGemsCh27FilterGraphDiagram() {
  return (
    <Frame
      ariaLabel="filter graph 图：Load source operator 输出 Image，多个 ImageFilter 节点组成网络，ImageView sink operator 消费最终结果。"
      caption="把图像处理表达成数据流和算子网络：source 产生图像，filter 变换图像，sink 消费结果，应用不必直接编排每次底层绘制。"
    >
      <ArrowDefs prefix="ch27-graph" />
      <text x={360} y={30} textAnchor="middle" fontSize={18} fontWeight={700} fill={primary}>filter graph：让图像处理成为可组合的数据流</text>
      <text x={64} y={78} fontSize={13} fontWeight={700} fill={secondary}>data objects: Image</text>
      <text x={64} y={98} fontSize={12} fill={secondary}>operators pull what they need</text>
      <rect x={42} y={132} width={122} height={86} rx={14} fill={success} fillOpacity={0.1} stroke={success} strokeWidth={2} />
      <text x={103} y={166} textAnchor="middle" fontSize={14} fontWeight={700} fill={success}>Load</text>
      <text x={103} y={190} textAnchor="middle" fontSize={12} fill={secondary}>source</text>
      <Arrow prefix="ch27-graph" x1={178} y1={175} x2={218} y2={175} stroke={success} />
      <rect x={232} y={132} width={122} height={86} rx={14} fill={accent} fillOpacity={0.1} stroke={accent} strokeWidth={2} />
      <text x={293} y={166} textAnchor="middle" fontSize={14} fontWeight={700} fill={accent}>Gauss</text>
      <text x={293} y={190} textAnchor="middle" fontSize={12} fill={secondary}>ImageFilter</text>
      <Arrow prefix="ch27-graph" x1={368} y1={175} x2={408} y2={175} stroke={accent} />
      <rect x={422} y={132} width={122} height={86} rx={14} fill={warning} fillOpacity={0.1} stroke={warning} strokeWidth={2} />
      <text x={483} y={166} textAnchor="middle" fontSize={14} fontWeight={700} fill={warning}>Night</text>
      <text x={483} y={190} textAnchor="middle" fontSize={12} fill={secondary}>ImageFilter</text>
      <Arrow prefix="ch27-graph" x1={558} y1={175} x2={598} y2={175} stroke={warning} />
      <rect x={612} y={132} width={70} height={86} rx={14} fill={danger} fillOpacity={0.1} stroke={danger} strokeWidth={2} />
      <text x={647} y={166} textAnchor="middle" fontSize={13} fontWeight={700} fill={danger}>View</text>
      <text x={647} y={190} textAnchor="middle" fontSize={12} fill={secondary}>sink</text>
      <path d="M 293 246 C 293 290, 483 290, 483 246" fill="none" stroke={accent} strokeDasharray="7 5" strokeWidth={2} />
      <text x={388} y={314} textAnchor="middle" fontSize={12} fill={secondary}>a branch can be replaced without rewriting the API plumbing</text>
      <rect x={168} y={340} width={384} height={30} rx={10} fill={accent} fillOpacity={0.1} stroke={accent} />
      <text x={360} y={360} textAnchor="middle" fontSize={12} fill={primary}>same graph idea applies beyond the original OpenGL / Cg implementation</text>
    </Frame>
  );
}

export function GpuGemsCh27OperatorLifecycleDiagram() {
  const stages = [
    { x: 34, title: "parameter", detail: "sigma changes", color: warning },
    { x: 178, title: "dirty()", detail: "query upstream", color: danger },
    { x: 322, title: "image()", detail: "pull input", color: accent },
    { x: 466, title: "render", detail: "produce output", color: success },
    { x: 610, title: "cache", detail: "reuse image", color: accent },
  ];
  return (
    <Frame
      ariaLabel="pull 更新生命周期：参数变化使算子 dirty，结果节点查询 upstream 的 dirty 状态，image 请求拉取输入并执行渲染，之后缓存输出。"
      caption="框架选择从结果节点 pull：只有 view.update 请求新图像时才沿上游查询并计算；参数不变时可以复用缓存。"
    >
      <ArrowDefs prefix="ch27-life" />
      <text x={360} y={30} textAnchor="middle" fontSize={18} fontWeight={700} fill={primary}>pull model：dirty 传播决定何时重新算</text>
      {stages.map((stage, index) => (
        <g key={stage.title}>
          <rect x={stage.x} y={100} width={82} height={126} rx={14} fill={stage.color} fillOpacity={0.09} stroke={stage.color} strokeWidth={2} />
          <text x={stage.x + 41} y={136} textAnchor="middle" fontSize={13} fontWeight={700} fill={stage.color}>{stage.title}</text>
          {index === 0 && <><circle cx={stage.x + 41} cy={176} r={23} fill={warning} fillOpacity={0.18} stroke={warning} /><text x={stage.x + 41} y={182} textAnchor="middle" fontSize={15} fill={warning}>Δ</text></>}
          {index === 1 && <><path d={`M ${stage.x + 22} 188 L ${stage.x + 42} 164 L ${stage.x + 62} 188`} fill="none" stroke={danger} strokeWidth={3} /><circle cx={stage.x + 42} cy={188} r={5} fill={danger} /></>}
          {index === 2 && <><path d={`M ${stage.x + 20} 174 C ${stage.x + 34} 146, ${stage.x + 52} 204, ${stage.x + 65} 166`} fill="none" stroke={accent} strokeWidth={3} /><circle cx={stage.x + 43} cy={185} r={6} fill={accent} /></>}
          {index === 3 && <><rect x={stage.x + 19} y={158} width={44} height={38} rx={6} fill="url(#ch27-life-gpu)" stroke={success} /><path d={`M ${stage.x + 27} 184 L ${stage.x + 38} 169 L ${stage.x + 55} 184`} fill="none" stroke={success} strokeWidth={2} /></>}
          {index === 4 && <><rect x={stage.x + 20} y={160} width={42} height={36} rx={6} fill={surface} stroke={accent} /><path d={`M ${stage.x + 28} 178 C ${stage.x + 34} 166, ${stage.x + 48} 190, ${stage.x + 55} 174`} fill="none" stroke={accent} strokeWidth={3} /></>}
          <text x={stage.x + 41} y={208} textAnchor="middle" fontSize={11} fill={secondary}>{stage.detail}</text>
          {index < stages.length - 1 && <Arrow prefix="ch27-life" x1={stage.x + 88} y1={164} x2={stage.x + 128} y2={164} stroke={stage.color} />}
        </g>
      ))}
      <path d="M 647 252 C 647 318, 75 318, 75 252" fill="none" stroke={border} strokeDasharray="8 6" strokeWidth={2} markerEnd="url(#ch27-life-arrow)" />
      <text x={360} y={300} textAnchor="middle" fontSize={12} fill={secondary}>下一次 update：没有 dirty，就停在 cache，不重复 GPU pass</text>
      <rect x={170} y={342} width={380} height={28} rx={10} fill={success} fillOpacity={0.1} stroke={success} />
      <text x={360} y={361} textAnchor="middle" fontSize={12} fill={primary}>dirty 是缓存一致性责任，不是框架自动猜出的事实</text>
    </Frame>
  );
}

export function GpuGemsCh27GpuResidencyDiagram() {
  return (
    <Frame
      ariaLabel="GPU 常驻 Image/Buffer 图：Image 是带引用计数的轻量 handle，Buffer 持有 texture，renderBegin/renderEnd 让绘制直接进入 GPU 图像，重复使用时避免系统内存拷贝。"
      caption="Image 对外提供高层接口，Buffer 承担实际资源和引用计数；handle 与 GPU 资源分离，让过滤器不必暴露上下文切换和资源复用细节。"
    >
      <ArrowDefs prefix="ch27-resident" />
      <text x={360} y={30} textAnchor="middle" fontSize={18} fontWeight={700} fill={primary}>Image handle：把资源生命周期和 GPU 存储隔离</text>
      <rect x={42} y={86} width={190} height={190} rx={16} fill={accent} fillOpacity={0.07} stroke={accent} strokeWidth={2} />
      <text x={137} y={120} textAnchor="middle" fontSize={15} fontWeight={700} fill={accent}>Image</text>
      <text x={137} y={148} textAnchor="middle" fontSize={12} fill={secondary}>textureID()</text>
      <text x={137} y={170} textAnchor="middle" fontSize={12} fill={secondary}>width / height</text>
      <rect x={86} y={196} width={102} height={46} rx={9} fill={surface} stroke={border} />
      <text x={137} y={217} textAnchor="middle" fontSize={12} fill={primary}>copy handle</text>
      <text x={137} y={235} textAnchor="middle" fontSize={11} fill={secondary}>ref +1 / release</text>
      <Arrow prefix="ch27-resident" x1={258} y1={180} x2={304} y2={180} stroke={accent} />
      <rect x={326} y={86} width={190} height={190} rx={16} fill={success} fillOpacity={0.07} stroke={success} strokeWidth={2} />
      <text x={421} y={120} textAnchor="middle" fontSize={15} fontWeight={700} fill={success}>Buffer</text>
      <text x={421} y={148} textAnchor="middle" fontSize={12} fill={secondary}>reference count = 2</text>
      <rect x={365} y={168} width={112} height={54} rx={9} fill="url(#ch27-resident-gpu)" stroke={success} />
      <text x={421} y={191} textAnchor="middle" fontSize={12} fontWeight={700} fill={primary}>GPU texture</text>
      <text x={421} y={211} textAnchor="middle" fontSize={11} fill={secondary}>same data, no CPU copy</text>
      <Arrow prefix="ch27-resident" x1={542} y1={180} x2={588} y2={180} stroke={success} />
      <rect x={610} y={86} width={70} height={190} rx={16} fill={warning} fillOpacity={0.07} stroke={warning} strokeWidth={2} />
      <text x={645} y={120} textAnchor="middle" fontSize={14} fontWeight={700} fill={warning}>render</text>
      <text x={645} y={157} textAnchor="middle" fontSize={11} fill={secondary}>begin</text>
      <text x={645} y={178} textAnchor="middle" fontSize={11} fill={secondary}>draw</text>
      <text x={645} y={199} textAnchor="middle" fontSize={11} fill={secondary}>end</text>
      <text x={645} y={235} textAnchor="middle" fontSize={11} fill={secondary}>pbuffer</text>
      <rect x={126} y={320} width={468} height={34} rx={11} fill={warning} fillOpacity={0.1} stroke={warning} />
      <text x={360} y={342} textAnchor="middle" fontSize={12} fill={primary}>high-level API → fewer accidental readbacks and copies</text>
    </Frame>
  );
}

export function GpuGemsCh27RenderToTextureDiagram() {
  const stages = [
    { x: 28, title: "input Image", detail: "texture read", color: accent },
    { x: 178, title: "quad", detail: "screen aligned", color: warning },
    { x: 328, title: "fragment", detail: "filter kernel", color: success },
    { x: 478, title: "pbuffer", detail: "invisible target", color: danger },
    { x: 628, title: "output", detail: "next texture", color: accent },
  ];
  return (
    <Frame
      ariaLabel="render-to-texture 图：输入 Image 作为纹理，屏幕对齐 quad 触发 fragment shader，对每个像素做滤波并写入 invisible pbuffer，结果再绑定为下一次 texture。"
      caption="新 filter 的核心只需 shader 和参数：框架隐藏 quad、pbuffer、上下文和纹理绑定，把上一个 Image 接到下一个处理阶段。"
    >
      <ArrowDefs prefix="ch27-render" />
      <text x={360} y={30} textAnchor="middle" fontSize={18} fontWeight={700} fill={primary}>render-to-texture：一张 Image 接一张 Image</text>
      {stages.map((stage, index) => (
        <g key={stage.title}>
          <rect x={stage.x} y={102} width={88} height={144} rx={15} fill={stage.color} fillOpacity={0.08} stroke={stage.color} strokeWidth={2} />
          <text x={stage.x + 44} y={136} textAnchor="middle" fontSize={13} fontWeight={700} fill={stage.color}>{stage.title}</text>
          {index === 0 && <><rect x={stage.x + 20} y={160} width={48} height={38} rx={6} fill={surface} stroke={accent} /><circle cx={stage.x + 44} cy={179} r={13} fill={accent} fillOpacity={0.46} /></>}
          {index === 1 && <><path d={`M ${stage.x + 20} 194 L ${stage.x + 68} 194 L ${stage.x + 58} 158 L ${stage.x + 30} 158 Z`} fill={warning} fillOpacity={0.24} stroke={warning} /><circle cx={stage.x + 44} cy={176} r={6} fill={warning} /></>}
          {index === 2 && <><path d={`M ${stage.x + 18} 193 C ${stage.x + 30} 166, ${stage.x + 44} 204, ${stage.x + 68} 158`} fill="none" stroke={success} strokeWidth={4} /><circle cx={stage.x + 44} cy={181} r={5} fill={success} /></>}
          {index === 3 && <><rect x={stage.x + 20} y={158} width={48} height={44} rx={6} fill={danger} fillOpacity={0.2} stroke={danger} /><text x={stage.x + 44} y={184} textAnchor="middle" fontSize={13} fill={danger}>GPU</text></>}
          {index === 4 && <><rect x={stage.x + 20} y={160} width={48} height={40} rx={6} fill={surface} stroke={accent} /><circle cx={stage.x + 44} cy={180} r={14} fill="url(#ch27-render-gpu)" /></>}
          <text x={stage.x + 44} y={220} textAnchor="middle" fontSize={11} fill={secondary}>{stage.detail}</text>
          {index < stages.length - 1 && <Arrow prefix="ch27-render" x1={stage.x + 94} y1={180} x2={stage.x + 136} y2={180} stroke={stage.color} />}
        </g>
      ))}
      <rect x={86} y={300} width={548} height={42} rx={12} fill={success} fillOpacity={0.1} stroke={success} />
      <text x={360} y={326} textAnchor="middle" fontSize={13} fill={primary}>Gaussian filter = shader kernel + uniform parameters + one graph edge</text>
      <text x={360} y={370} textAnchor="middle" fontSize={12} fill={secondary}>NPOT rectangle textures and half color buffers address real image dimensions and bandwidth</text>
    </Frame>
  );
}

export function GpuGemsCh27FrameworkLab() {
  const [pipeline, setPipeline] = useState("scotopic");
  const [resolution, setResolution] = useState(0.58);
  const [parameterChanged, setParameterChanged] = useState(true);

  const reset = () => {
    setPipeline("scotopic");
    setResolution(0.58);
    setParameterChanged(true);
  };

  const stages = pipeline === "scotopic" ? ["load", "blue", "gauss", "sharpen", "view"] : pipeline === "night" ? ["load", "blue", "view"] : ["load", "gauss", "view"];
  const passes = parameterChanged ? stages.length - 1 : 0;
  const memory = rounded(0.24 + resolution * (stages.length - 1) * 0.17);
  const quality = rounded(Math.min(1, 0.58 + resolution * 0.3 + (pipeline === "scotopic" ? 0.1 : 0)));
  const label = `图像处理框架实验：${pipeline} pipeline，分辨率因子 ${resolution.toFixed(2)}，参数${parameterChanged ? "已变化" : "未变化"}，节点 ${stages.length}，GPU pass ${passes}，中间 buffer 预算 ${memory.toFixed(2)}，质量 ${quality.toFixed(2)}。`;

  return (
    <section data-visual-kind="gpu-gems-ch27-framework-image-processing" className="not-prose my-6 rounded-card border border-border bg-elevated p-5" aria-label="GPU 图像处理框架交互实验：选择 filter graph，调整图像分辨率和 dirty 状态，观察 GPU pass 与中间 buffer 预算">
      <div className="mb-4 flex flex-wrap items-baseline justify-between gap-3">
        <div>
          <p className="text-[11px] uppercase tracking-[0.18em] text-secondary">Image Processing Framework Lab</p>
          <h4 className="mt-1 text-[15px] font-semibold text-primary">先预测：参数不变时，pull 更新还需要几次 GPU pass？</h4>
        </div>
        <span className="rounded-control border border-accent px-2 py-1 text-[11px] text-accent">可交互</span>
      </div>
      <div className="grid gap-5 md:grid-cols-[1fr_260px] md:items-center">
        <svg viewBox="0 0 560 380" role="img" aria-label={label} className="w-full">
          <ArrowDefs prefix="ch27-lab" />
          <rect x={12} y={18} width={536} height={342} rx={18} fill={surface} stroke={border} />
          <text x={32} y={46} fontSize={14} fontWeight={700} fill={primary}>pull graph preview</text>
          <text x={526} y={46} textAnchor="end" fontSize={12} fill={parameterChanged ? warning : success}>{parameterChanged ? "dirty → recompute" : "clean → cached"}</text>
          {stages.map((stage, index) => {
            const x = 38 + index * (448 / Math.max(1, stages.length - 1));
            const y = 122 + (index % 2) * 64;
            const color = index === 0 ? success : index === stages.length - 1 ? danger : index % 2 === 0 ? warning : accent;
            return <g key={`${stage}-${index}`}><rect x={x - 42} y={y - 25} width={84} height={50} rx={10} fill={color} fillOpacity={0.12} stroke={color} strokeWidth={2} /><text x={x} y={y + 5} textAnchor="middle" fontSize={12} fontWeight={700} fill={color}>{stage}</text>{index < stages.length - 1 && <Arrow prefix="ch27-lab" x1={x + 48} y1={y} x2={x + (448 / Math.max(1, stages.length - 1)) - 48} y2={122 + ((index + 1) % 2) * 64} stroke={color} />}</g>;
          })}
          <text x={38} y={266} fontSize={12} fill={secondary}>nodes {stages.length} · GPU passes {passes} · intermediate buffers {Math.max(0, stages.length - 2)}</text>
          <rect x={38} y={286} width={448} height={24} rx={7} fill={border} fillOpacity={0.32} />
          <rect x={38} y={286} width={448 * Math.min(1, memory)} height={24} rx={7} fill="url(#ch27-lab-gpu)" />
          <text x={48} y={303} fontSize={11} fill={primary}>buffer budget {memory.toFixed(2)} · output quality {quality.toFixed(2)}</text>
          <text x={38} y={338} fontSize={11} fill={secondary}>{parameterChanged ? "dirty flag propagates from changed filter" : "cached Image can be reused until a parameter changes"}</text>
        </svg>
        <div className="space-y-3">
          <button type="button" className="min-h-11 w-full rounded-control border border-accent px-3 py-2 text-sm text-primary hover:border-accent" aria-pressed={parameterChanged} onClick={() => setParameterChanged((current) => !current)}>
            切换 dirty：{parameterChanged ? "已变化" : "已缓存"}
          </button>
          <label className="block text-sm text-primary" htmlFor="ch27-pipeline">选择 pipeline</label>
          <select id="ch27-pipeline" className="min-h-11 w-full rounded-control border border-border bg-elevated px-3 py-2 text-sm text-primary" value={pipeline} onChange={(event) => { setPipeline(event.target.value); setParameterChanged(true); }} aria-label="选择图像处理 pipeline">
            <option value="gauss">load → gauss → view</option>
            <option value="night">load → blue → view</option>
            <option value="scotopic">load → blue → gauss → sharpen → view</option>
          </select>
          <label className="block text-sm text-primary" htmlFor="ch27-resolution">分辨率因子：{resolution.toFixed(2)}</label>
          <input id="ch27-resolution" className="min-h-11 w-full accent-accent" type="range" min="0.2" max="1" step="0.05" value={resolution} onChange={(event) => { setResolution(Number(event.target.value)); setParameterChanged(true); }} aria-label="调整图像分辨率因子" />
          <label className="flex min-h-11 items-center gap-3 text-sm text-primary" htmlFor="ch27-dirty"><input id="ch27-dirty" className="size-5 accent-accent" type="checkbox" checked={parameterChanged} onChange={(event) => setParameterChanged(event.target.checked)} />参数已变化，标记 dirty</label>
          <button type="button" className="min-h-11 w-full rounded-control border border-border px-3 py-2 text-sm text-primary hover:border-accent" onClick={reset}>重置实验</button>
          <p className="text-xs leading-5 text-secondary">切换 pipeline 或调参数会重新计算；取消 dirty 后再次 pull，结果应留在缓存路径。</p>
        </div>
      </div>
    </section>
  );
}
