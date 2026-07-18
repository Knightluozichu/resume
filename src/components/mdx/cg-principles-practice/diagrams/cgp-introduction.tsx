import type { ReactNode } from "react";

function Frame({ caption, children }: { caption: string; children: ReactNode }) {
  return <figure className="mdx-figure not-prose mx-auto my-6"><div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">{children}</div><figcaption className="mt-2 text-center text-sm text-secondary">{caption}</figcaption></figure>;
}

const loop = [["World / model", "shape, light, material, motion"], ["Graphics system", "represent, simulate, render"], ["Display", "encoded signal → emitted light"], ["Observer", "perceive, decide, act"], ["Input", "device samples → intent"]] as const;

export function CgpIntroductionDiagram() {
  return <Frame caption="图形系统从模型产生显示信号，观察者感知后再通过输入改变系统。"><div role="img" aria-label="模型、图形系统、显示、观察者与输入闭环" className="grid gap-2 sm:grid-cols-2 lg:grid-cols-5">{loop.map(([title, detail], index) => <div key={title} className="relative min-h-28 border border-border bg-bg/45 p-3"><span className="text-xs font-bold text-accent">0{index + 1}</span><strong className="mt-2 block text-sm text-primary">{title}</strong><span className="mt-2 block text-xs leading-5 text-secondary">{detail}</span>{index < loop.length - 1 && <span aria-hidden="true" className="absolute -right-2 top-11 z-10 text-accent">→</span>}</div>)}</div></Frame>;
}

const perception = [["Light at eye", "spectrum + spatial/temporal pattern"], ["Optics / retina", "focus + rods + cones"], ["Neural coding", "contrast + edge + motion"], ["Percept", "color + shape + depth + salience"]] as const;

export function CgpPerceptionDiagram() {
  return <Frame caption="观察者接收的是受设备、环境和视觉处理影响的信号，不是 framebuffer 数值副本。"><div role="img" aria-label="光信号经眼球视网膜和神经编码形成感知" className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{perception.map(([title, detail], index) => <div key={title} className="relative min-h-28 border border-border bg-bg/45 p-3"><span className="grid size-8 place-items-center rounded-full bg-warning/15 text-sm font-bold text-warning">{index + 1}</span><strong className="mt-3 block text-sm text-primary">{title}</strong><span className="mt-2 block text-xs text-secondary">{detail}</span>{index < perception.length - 1 && <span aria-hidden="true" className="absolute -right-2 top-11 z-10 text-accent">→</span>}</div>)}</div><div className="mt-3 grid gap-2 text-xs sm:grid-cols-4"><span className="border-l-4 border-success bg-success/10 p-2 text-primary">contrast</span><span className="border-l-4 border-warning bg-warning/10 p-2 text-primary">adaptation</span><span className="border-l-4 border-accent bg-accent/10 p-2 text-primary">visual angle</span><span className="border-l-4 border-border bg-bg/50 p-2 text-primary">task / attention</span></div></Frame>;
}

const interactions = [["Multitouch", "2D translate / rotate / scale", "centroid + two-point similarity"], ["Arcball", "3D object rotation", "screen → virtual sphere → quaternion"], ["Trackball", "rolling-style rotation", "implementation-specific mapping"], ["Unicam", "camera navigation", "mode + focus + one-device control"]] as const;

export function CgpInteractionDiagram() {
  return <Frame caption="交互技术的差别在输入空间、受控自由度、参照系和反馈，而不只在设备名称。"><div role="img" aria-label="多点触控、Arcball、Trackball和Unicam交互比较" className="grid gap-3 md:grid-cols-2">{interactions.map(([name, task, mapping]) => <div key={name} className="min-h-28 border border-border bg-bg/45 p-3"><strong className="text-sm text-primary">{name}</strong><p className="mb-0 mt-2 text-xs text-success">Task: {task}</p><p className="mb-0 mt-2 border-t border-border pt-2 text-xs text-secondary">Map: {mapping}</p></div>)}</div></Frame>;
}
