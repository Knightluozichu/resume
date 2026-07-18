import type { ReactNode } from "react";

function Frame({ caption, children }: { caption: string; children: ReactNode }) {
  return <figure className="mdx-figure not-prose mx-auto my-6"><div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">{children}</div><figcaption className="mt-2 text-center text-sm text-secondary">{caption}</figcaption></figure>;
}

const units = [
  ["1", "Framework"], ["2", "Physics"], ["3", "Monte Carlo"], ["4", "Strategies"],
  ["5", "Path tracing"], ["6", "Radiosity"], ["7", "Hybrid"], ["8", "Realism / speed"],
  ["9", "Conclusion"], ["A", "Class library"], ["B", "Hemisphere"], ["C", "Relaxation theory"],
] as const;

export function GilFinalReviewDiagram() {
  return <Frame caption="全书验收单位是第二版 9 章与 3 附录；每个单元都要能从概念追到公式、算法、失败模式和证据。"><div role="img" aria-label="Advanced Global Illumination第二版九章三附录验收矩阵" className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">{units.map(([id,name])=><section key={id} className="min-h-20 border border-border bg-bg/40 p-3"><span className="text-xs font-bold text-accent">{id}</span><strong className="mt-2 block text-xs text-primary">{name}</strong><div className="mt-2 h-1 bg-success" /></section>)}</div></Frame>;
}

const methods = [
  ["Camera path", "general + visible detail", "rare caustic", "variance"],
  ["Radiosity", "diffuse reusable scene", "glossy direction", "basis bias"],
  ["Photon density", "L-S+-D caustic", "sharp boundaries", "kernel bias"],
  ["BDPT / MLT", "difficult path families", "state / mixing", "complexity"],
  ["Cache / PRT", "smooth/static reuse", "dynamic invalidation", "stale bias"],
] as const;

export function GilMethodSelectionDiagram() {
  return <Frame caption="先按 dominant path 和可变维度选择表示，再比较误差与生命周期；不存在按材质名称自动最优的单一算法。"><div role="img" aria-label="路径追踪辐射度光子映射双向MLT缓存PRT的方法选择矩阵" className="overflow-x-auto"><div className="min-w-[760px] border border-border"><div className="grid grid-cols-[1.1fr_1.5fr_1.3fr_1fr] bg-bg px-3 py-2 text-xs font-bold text-primary"><span>Method</span><span>Strong path/domain</span><span>Weakness</span><span>Main error</span></div>{methods.map(([name,strong,weak,error],i)=><div key={name} className={`grid min-h-12 grid-cols-[1.1fr_1.5fr_1.3fr_1fr] items-center gap-3 px-3 py-2 text-xs ${i%2?"bg-bg/40":"bg-elevated"}`}><strong className="text-accent">{name}</strong><span className="text-success">{strong}</span><span className="text-secondary">{weak}</span><code className="text-warning">{error}</code></div>)}</div></div></Frame>;
}

const failures = [
  ["Brightness shifts with PDF", "missing 1/p or wrong measure", "normalization / constant integral"],
  ["Fireflies / rare spikes", "support mismatch / tiny PDF", "path + PDF AOV"],
  ["Blur / light leak", "kernel, cache or cluster crosses boundary", "radius / validity scan"],
  ["Noise never settles", "correlation / relaxation / stale history", "multi-seed variance curve"],
  ["Looks right, HDR wrong", "tone map hides transport error", "linear energy reference"],
] as const;

export function GilFailureDiagnosisDiagram() {
  return <Frame caption="最终画面只是症状；诊断要回到 quantity、measure、path、reconstruction 和 display 各层的可观测证据。"><div role="img" aria-label="全局光照亮度漂移火花漏光噪声和显示误差诊断表" className="overflow-x-auto"><div className="min-w-[760px] border border-border"><div className="grid grid-cols-[1.2fr_1.6fr_1.4fr] bg-bg px-3 py-2 text-xs font-bold text-primary"><span>Symptom</span><span>Likely cause</span><span>Evidence</span></div>{failures.map(([symptom,cause,evidence],i)=><div key={symptom} className={`grid min-h-12 grid-cols-[1.2fr_1.6fr_1.4fr] items-center gap-3 px-3 py-2 text-xs ${i%2?"bg-bg/40":"bg-elevated"}`}><strong className="text-warning">{symptom}</strong><span className="text-secondary">{cause}</span><code className="text-accent">{evidence}</code></div>)}</div></div></Frame>;
}
