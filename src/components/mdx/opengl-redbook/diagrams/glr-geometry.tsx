import type { ReactNode } from "react";

function Frame({ caption, children }: { caption: string; children: ReactNode }) { return <figure className="mdx-figure not-prose mx-auto my-6"><div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">{children}</div><figcaption className="mt-2 text-center text-sm text-secondary">{caption}</figcaption></figure>; }

export function GlrGeometryDiagram() {
  const nodes = ["buffer bytes", "VAO fetch", "draw + assemble", "clip / feedback", "rasterize"];
  return <Frame caption="绘制命令连接存储与管线，但字节解释、图元边界和阶段输出是三份不同合同。"><div role="img" aria-label="OpenGL 几何绘制主链" className="grid gap-2 md:grid-cols-5">{nodes.map((x,i)=><div key={x} className="grid min-h-24 content-center rounded-control border border-border bg-bg/45 p-3 text-center"><span className="text-xs font-bold text-accent">0{i+1}</span><strong className="mt-2 text-xs text-primary">{x}</strong></div>)}</div></Frame>;
}

export function GlrVertexFetchDiagram() {
  const rows = [["attribute 0", "binding 0", "vec3 @ +0"], ["attribute 1", "binding 0", "vec3 @ +12"], ["attribute 2", "binding 1", "vec2 @ +0, divisor 1"]];
  return <Frame caption="Format 说明怎样解释元素，binding 说明从哪个 buffer、offset、stride 和实例步频读取。"><div role="img" aria-label="VAO attribute 与 binding 两层映射" className="overflow-hidden rounded-control border border-border text-xs"><div className="grid grid-cols-3 gap-px bg-border">{['Attribute', 'Binding', 'Format'].map(x=><strong key={x} className="bg-bg p-3 text-primary">{x}</strong>)}{rows.flatMap(r=>r.map((x,i)=><span key={`${r[0]}-${x}`} className={i===0?"bg-accent/10 p-3 font-semibold text-accent":"bg-elevated p-3 text-secondary"}>{x}</span>))}</div></div></Frame>;
}

export function GlrProgrammableGeometryDiagram() {
  const routes = [["Surface detail", "patch → TCS → tessellator → TES"], ["Topology / layer", "primitive → geometry shader → stream/layer"], ["Bulk generation", "compute → SSBO/indirect → draw"]];
  return <Frame caption="细分、几何与 compute 处理不同输入域；应按输出合同和成本选择。"><div role="img" aria-label="可编程几何路径选择" className="grid gap-3 md:grid-cols-3">{routes.map(([name,path])=><div key={name} className="rounded-control border border-border bg-bg/45 p-4"><strong className="text-sm text-primary">{name}</strong><p className="mb-0 mt-2 text-xs leading-5 text-secondary">{path}</p></div>)}</div></Frame>;
}
