import type { ReactNode } from "react";

function Frame({ caption, children }: { caption: string; children: ReactNode }) {
  return <figure className="mdx-figure not-prose mx-auto my-6"><div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">{children}</div><figcaption className="mt-2 text-center text-sm text-secondary">{caption}</figcaption></figure>;
}

const synthesis = [
  ["1. Scene acquisition", "geometry · materials · emitters", "现实/设计数据"],
  ["2. Light transport", "emission · scattering · visibility", "场景内传播"],
  ["3. Measurement", "sensor response · display · observer", "像素与感知"],
] as const;

export function GilDirectIndirectDiagram() {
  return <Frame caption="真实感图像合成不是直接光加间接光这一行代码，而是从场景描述经光传输到测量、显示与观察者的完整系统。"><div role="img" aria-label="真实感图像合成的采集、光传输和测量三阶段" className="grid gap-3 md:grid-cols-3">{synthesis.map(([title, body, output], index) => <section key={title} className="relative min-h-36 border border-border bg-bg/40 p-4"><span className="text-xs font-bold text-accent">STAGE {index + 1}</span><strong className="mt-2 block text-sm text-primary">{title}</strong><p className="my-2 text-xs leading-5 text-secondary">{body}</p><div className="absolute inset-x-4 bottom-3 border-t border-border pt-2 text-xs text-success">{output}</div></section>)}</div></Frame>;
}

const quantities = [
  ["Radiant flux", "Φ [W]", "单位时间能量"],
  ["Irradiance", "E [W·m⁻²]", "落到表面的通量密度"],
  ["Radiance", "L [W·m⁻²·sr⁻¹]", "按投影面积与方向计量"],
  ["Importance", "W", "测量端对路径的权重"],
] as const;

export function GilRadiometryBalanceDiagram() {
  return <Frame caption="每个量都绑定面积、方向和测度；把 irradiance 与 radiance 混用会直接破坏 BRDF 和估计器量纲。"><div role="img" aria-label="通量、辐照度、辐亮度和重要度的量纲关系" className="overflow-x-auto"><div className="min-w-[620px] border border-border"><div className="grid grid-cols-[1fr_1.2fr_1.8fr] bg-bg px-3 py-2 text-xs font-bold text-primary"><span>Quantity</span><span>Symbol / unit</span><span>回答的问题</span></div>{quantities.map(([name, unit, meaning], i) => <div key={name} className={`grid min-h-12 grid-cols-[1fr_1.2fr_1.8fr] items-center gap-3 px-3 py-2 text-xs ${i % 2 ? "bg-bg/40" : "bg-elevated"}`}><strong className="text-primary">{name}</strong><code className="text-accent">{unit}</code><span className="text-secondary">{meaning}</span></div>)}</div></div></Frame>;
}

export function GilHemisphereMeasureDiagram() {
  return <Frame caption="附录 B 的关键不是记球坐标，而是看见方向微元 dω = sinθ dθ dφ 和投影因子 cosθ 各自来自哪里。"><div role="img" aria-label="法线半球上的极角方位角立体角和余弦投影" className="grid items-center gap-5 md:grid-cols-[1fr_1.2fr]"><svg viewBox="0 0 320 230" className="mx-auto h-auto w-full max-w-[320px]"><path d="M42 178 Q160 30 278 178" fill="none" stroke="var(--border)" strokeWidth="2"/><ellipse cx="160" cy="178" rx="118" ry="28" fill="var(--accent)" fillOpacity="0.08" stroke="var(--border)"/><line x1="160" y1="178" x2="160" y2="42" stroke="var(--text-primary)" strokeWidth="2"/><line x1="160" y1="178" x2="246" y2="92" stroke="var(--accent)" strokeWidth="3"/><path d="M160 108 A70 70 0 0 1 209 129" fill="none" stroke="var(--warning)" strokeWidth="2"/><path d="M188 184 A62 22 0 0 1 221 167" fill="none" stroke="var(--success)" strokeWidth="2"/><circle cx="246" cy="92" r="7" fill="var(--accent)"/><text x="168" y="52" fill="var(--text-primary)" fontSize="12">n</text><text x="248" y="86" fill="var(--accent)" fontSize="12">ω</text><text x="195" y="116" fill="var(--warning)" fontSize="12">θ</text><text x="214" y="190" fill="var(--success)" fontSize="12">φ</text></svg><div className="grid gap-2 text-sm"><div className="border-l-2 border-accent bg-bg/40 p-3"><strong className="text-primary">立体角微元</strong><code className="mt-1 block text-accent">dω = sinθ dθ dφ</code></div><div className="border-l-2 border-warning bg-bg/40 p-3"><strong className="text-primary">投影面积</strong><code className="mt-1 block text-warning">dA⊥ = cosθ dA</code></div><div className="border-l-2 border-success bg-bg/40 p-3"><strong className="text-primary">半球域</strong><code className="mt-1 block text-success">θ∈[0,π/2], φ∈[0,2π)</code></div></div></div></Frame>;
}
