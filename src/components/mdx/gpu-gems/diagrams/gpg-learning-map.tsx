import manifest from "../../../../../quality/fidelity-manifests.json";
import type { ReactNode } from "react";

type Unit = { id: string; title: string };
const units = (manifest.books["gpu-gems"].units as Unit[]);
const volumeUnits = ["v1", "v2", "v3"].map((volume) => units.filter((unit) => unit.id.includes(`-${volume}-`)));
const themes = [
  ["Natural", "8", "G1 1-8"], ["Light / Shadow", "24", "G1 9-15 · G2 9-19 · G3 8-13"],
  ["Materials", "12", "G1 16-20 · G3 14-20"], ["Image", "24", "G1 21-27 · G2 20-28 · G3 21-28"],
  ["Engineering", "15", "G1 28-36 · G2 37-42"], ["Geometry", "15", "G2 1-8 · G3 1-7"],
  ["GPU Compute", "20", "G1 37-42 · G2 29-36 · G3 36-41"], ["Physics", "13", "G2 43-48 · G3 29-35"],
] as const;

function Frame({caption,children}:{caption:string;children:ReactNode}){return <figure className="mdx-figure not-prose mx-auto my-6"><div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">{children}</div><figcaption className="mt-2 text-center text-sm text-secondary">{caption}</figcaption></figure>}

export function GpgLearningMapDiagram(){const volumes=[["GPU Gems 1","42","programmable effects → early GPGPU"],["GPU Gems 2","48","geometry/rendering → stream algorithms"],["GPU Gems 3","41","unified shaders → CUDA data parallelism"]];return <Frame caption="三卷共 131 章；硬件载体持续变化，案例中的算法与权衡形成演进主线。"><div role="img" aria-label="GPU Gems 三卷章节与能力演进" className="grid gap-3 md:grid-cols-3">{volumes.map(([a,b,c])=><div key={a} className="min-h-36 rounded-control border border-border bg-bg/45 p-4"><span className="text-2xl font-bold text-accent">{b}</span><strong className="mt-2 block text-sm text-primary">{a}</strong><p className="mb-0 mt-2 text-xs leading-5 text-secondary">{c}</p></div>)}</div></Frame>}

export function GpgThemeMappingDiagram(){return <Frame caption="八个主题集合互不重叠，数量之和严格等于 131。"><div role="img" aria-label="GPU Gems 131 章到八个主题的唯一映射" className="overflow-x-auto"><div className="min-w-[680px] overflow-hidden rounded-control border border-border text-xs"><div className="grid grid-cols-[1.2fr_.5fr_2.3fr] gap-px bg-border">{['Theme','Count','Official chapter ranges'].map(x=><strong key={x} className="bg-bg p-3 text-primary">{x}</strong>)}{themes.flatMap(r=>r.map((x,i)=><span key={`${r[0]}-${x}`} className={i===0?"bg-accent/10 p-3 font-semibold text-accent":"bg-elevated p-3 text-secondary"}>{x}</span>))}</div></div></div></Frame>}

export function GpgOfficialInventoryDiagram(){return <Frame caption="标题来自 NVIDIA 官方在线目录；清单由质量 manifest 直接驱动。"><div aria-label="GPU Gems 三卷 131 章官方目录" className="grid gap-6">{volumeUnits.map((volume,index)=><section key={index}><div className="mb-3 flex items-center justify-between border-b border-border pb-2"><strong className="text-sm text-primary">GPU Gems {index+1}</strong><span className="text-xs text-accent">{volume.length} chapters</span></div><ol className="grid gap-x-6 gap-y-1 text-xs leading-5 text-secondary md:grid-cols-2">{volume.map(unit=><li key={unit.id} className="break-inside-avoid"><span className="mr-2 font-mono text-accent">{unit.id.replace('gpg-','').toUpperCase()}</span>{unit.title.replace(/^GPU Gems \d · /,'')}</li>)}</ol></section>)}</div></Frame>}
