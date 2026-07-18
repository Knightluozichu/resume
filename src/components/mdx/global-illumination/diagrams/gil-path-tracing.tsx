import type { ReactNode } from "react";

function Frame({ caption, children }: { caption: string; children: ReactNode }) {
  return <figure className="mdx-figure not-prose mx-auto my-6"><div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">{children}</div><figcaption className="mt-2 text-center text-sm text-secondary">{caption}</figcaption></figure>;
}

const passes = [
  ["Ray setup", "sensor sample → primary ray"],
  ["Direct", "explicit emitter connection"],
  ["Environment", "escaped ray → map radiance"],
  ["Indirect", "BSDF sample → next vertex"],
  ["Terminate", "Russian roulette / max policy"],
] as const;

export function GilPathTracingDiagram() {
  return <Frame caption="第 5 章把一次 camera random walk 拆成 ray setup、direct/environment/indirect illumination 和随机终止。"><div role="img" aria-label="随机路径追踪的主光线直接光环境贴图间接光和终止流程" className="grid gap-2">{passes.map(([title,body],i)=><div key={title} className="grid min-h-12 grid-cols-[2rem_1fr_1.6fr] items-center gap-3 border border-border bg-bg/40 px-3 py-2"><span className="grid size-8 place-items-center rounded-full bg-accent/15 text-xs font-bold text-accent">{i+1}</span><strong className="text-sm text-primary">{title}</strong><code className="text-xs text-secondary">{body}</code></div>)}</div></Frame>;
}

export function GilPathThroughputDiagram() {
  const vertices = ["camera", "x₁ diffuse", "x₂ glossy", "x₃ emitter"];
  return <Frame caption="Path throughput 只累计散射、余弦与 PDF 比；emission/NEE 贡献在当前 throughput 下加入像素。"><div role="img" aria-label="相机到发光体路径顶点和吞吐量更新" className="overflow-x-auto"><div className="flex min-w-[680px] items-center gap-2">{vertices.map((v,i)=><div key={v} className="contents"><section className="grid min-h-24 min-w-32 flex-1 place-items-center border border-border bg-bg/40 p-3 text-center"><span className="text-xs font-bold text-accent">v{i}</span><strong className="text-sm text-primary">{v}</strong>{i>0&&i<3?<code className="text-xs text-success">β *= f cos / p</code>:<code className="text-xs text-secondary">endpoint</code>}</section>{i<vertices.length-1?<span className="text-secondary">→</span>:null}</div>)}</div></div></Frame>;
}

const classes = [
  ["PathNode", "position · frame · event · PDFs", "链式顶点状态"],
  ["SurfaceSampler", "BSDF sample / evaluate", "局部散射"],
  ["LightSampler", "select · sampleLi · sampleLe", "直接/发射采样"],
  ["Scene / RayCaster", "intersect · visibility", "几何传播"],
  ["Estimator", "walk · connect · accumulate", "算法编排"],
] as const;

export function GilClassLibraryDiagram() {
  return <Frame caption="附录 A 的价值是把路径状态、光源采样、散射、求交和估计器分开，使 sample/evaluate/PDF 可以独立验收。"><div role="img" aria-label="全局光照类库的路径节点光源采样场景和估计器依赖"><div className="overflow-x-auto"><div className="min-w-[680px] border border-border"><div className="grid grid-cols-[1fr_1.5fr_1.2fr] bg-bg px-3 py-2 text-xs font-bold text-primary"><span>Class family</span><span>Contract</span><span>Owner</span></div>{classes.map(([name,contract,owner],i)=><div key={name} className={`grid min-h-12 grid-cols-[1fr_1.5fr_1.2fr] items-center gap-3 px-3 py-2 text-xs ${i%2?"bg-bg/40":"bg-elevated"}`}><strong className="text-accent">{name}</strong><code className="text-primary">{contract}</code><span className="text-secondary">{owner}</span></div>)}</div></div></div></Frame>;
}
