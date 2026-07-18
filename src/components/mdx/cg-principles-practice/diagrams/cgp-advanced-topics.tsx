import type { ReactNode } from "react";

function Frame({ caption, children }: { caption: string; children: ReactNode }) {
  return <figure className="mdx-figure not-prose mx-auto my-6"><div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">{children}</div><figcaption className="mt-2 text-center text-sm text-secondary">{caption}</figcaption></figure>;
}

const timeImage = [["Intent", "message / motion goal"], ["Representation", "features / strokes / state"], ["Evolution", "abstraction / interpolation / dynamics"], ["Sampling", "pixels + frames + shutter"], ["Perception", "meaning + style + motion"]] as const;

export function CgpAdvancedTopicsDiagram() {
  return <Frame caption="表现与运动都从意图出发，经表示和演化后被空间/时间采样并由观察者解释。"><div role="img" aria-label="意图表示演化采样与感知的时空图形链" className="grid gap-2 md:grid-cols-5">{timeImage.map(([title, detail], index) => <div key={title} className="relative min-h-28 border border-border bg-bg/45 p-3"><span className="text-xs font-bold text-accent">0{index + 1}</span><strong className="mt-2 block text-sm text-primary">{title}</strong><span className="mt-2 block text-xs text-secondary">{detail}</span>{index < timeImage.length - 1 && <span aria-hidden="true" className="absolute -right-2 top-11 z-10 text-accent">→</span>}</div>)}</div></Frame>;
}

const expressive = [["Message", "task + hierarchy"], ["Features", "silhouette + crease + salience"], ["Abstract", "simplify + exaggerate + suppress"], ["Marks", "stroke + tone + contour"], ["Compose", "layers + style + temporal rules"], ["Evaluate", "recognition + misread + coherence"]] as const;

export function CgpExpressivePipelineDiagram() {
  return <Frame caption="Expressive rendering 先定义信息，再选择 feature、abstraction、mark 和评价。"><div role="img" aria-label="表现性渲染从信息到评价的流程" className="grid gap-2 sm:grid-cols-2 lg:grid-cols-6">{expressive.map(([title, detail], index) => <div key={title} className="relative min-h-28 border border-border bg-bg/45 p-3"><strong className="text-sm text-primary">{title}</strong><span className="mt-2 block text-xs text-secondary">{detail}</span>{index < expressive.length - 1 && <span aria-hidden="true" className="absolute -right-2 top-10 z-10 text-accent">→</span>}</div>)}</div></Frame>;
}

const motion = [["Author/control", "key pose / target / forces"], ["Continuous model", "spline / hierarchy / ODE"], ["Discrete solve", "integrator + constraints + dt"], ["Render sample", "interpolate + shutter + motion"], ["Display", "present time + persistence"], ["Evidence", "trajectory + energy + flicker + latency"]] as const;

export function CgpMotionStabilityDiagram() {
  return <Frame caption="运动质量由连续模型、离散求解、渲染采样和显示时间共同决定。"><div role="img" aria-label="运动控制连续模型数值积分渲染显示和验证链" className="grid gap-2 sm:grid-cols-2 lg:grid-cols-6">{motion.map(([title, detail], index) => <div key={title} className="relative min-h-28 border border-border bg-bg/45 p-3"><strong className="text-sm text-primary">{title}</strong><span className="mt-2 block text-xs text-secondary">{detail}</span>{index < motion.length - 1 && <span aria-hidden="true" className="absolute -right-2 top-10 z-10 text-accent">→</span>}</div>)}</div></Frame>;
}
