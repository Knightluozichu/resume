import type { ReactNode } from "react";

function Frame({ caption, children }: { caption: string; children: ReactNode }) {
  return <figure className="mdx-figure not-prose mx-auto my-6"><div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">{children}</div><figcaption className="mt-2 text-center text-sm text-secondary">{caption}</figcaption></figure>;
}

export function GlrShadersDiagram() {
  const stages = ["source / SPIR-V", "shader stage", "program link", "pipeline assembly", "draw + validate"];
  return <Frame caption="阶段、程序与管线是不同对象；每一层都有独立状态和日志。"><div role="img" aria-label="Shader 阶段到程序管线" className="grid gap-2 md:grid-cols-5">{stages.map((stage, i) => <div key={stage} className="grid min-h-24 content-center rounded-control border border-border bg-bg/45 p-3 text-center"><span className="text-xs font-bold text-accent">0{i + 1}</span><strong className="mt-2 text-xs text-primary">{stage}</strong></div>)}</div></Frame>;
}

export function GlrInterfaceContractDiagram() {
  const rows = [["location", "producer output", "consumer input"], ["type/shape", "vec3 / array", "exact compatible shape"], ["interpolation", "smooth / flat", "sample semantics"], ["meaning", "world normal", "world-space consumer"]];
  return <Frame caption="链接器可检查前三行的一部分；空间语义仍需应用验证。"><div role="img" aria-label="Shader 阶段接口四层合同" className="overflow-hidden rounded-control border border-border text-xs"><div className="grid grid-cols-[1fr_1.5fr_1.5fr] gap-px bg-border">{['合同', '生产者', '消费者'].map(x => <strong key={x} className="bg-bg p-3 text-primary">{x}</strong>)}{rows.flatMap(row => row.map((x, i) => <span key={`${row[0]}-${x}`} className={i === 0 ? "bg-accent/10 p-3 font-semibold text-accent" : "bg-elevated p-3 text-secondary"}>{x}</span>))}</div></div></Frame>;
}

export function GlrProgramAssemblyDiagram() {
  return <Frame caption="两种组装路径共享接口合同，但对象绑定与验证入口不同。"><div role="img" aria-label="Monolithic program 与 separate shader object 对比" className="grid gap-3 md:grid-cols-2"><div className="rounded-control border border-border bg-bg/45 p-4"><strong className="text-sm text-primary">Monolithic</strong><p className="mb-0 mt-2 text-xs leading-5 text-secondary">VS + FS → one link → glUseProgram</p></div><div className="rounded-control border border-border bg-bg/45 p-4"><strong className="text-sm text-primary">Separable</strong><p className="mb-0 mt-2 text-xs leading-5 text-secondary">stage programs → program pipeline → validate combination</p></div></div></Frame>;
}
