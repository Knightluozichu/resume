import type { ReactNode } from "react";

function Frame({ caption, children }: { caption: string; children: ReactNode }) {
  return <figure className="mdx-figure not-prose mx-auto my-6"><div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">{children}</div><figcaption className="mt-2 text-center text-sm text-secondary">{caption}</figcaption></figure>;
}

const scenePath = [["Input / binding", "events + data"], ["Retained scene", "objects + properties"], ["Layout", "measure + arrange"], ["Render", "transform + clip + raster"], ["Display", "DPI + pixels + light"]] as const;

export function Cgp2dGraphicsDiagram() {
  return <Frame caption="二维平台把输入和声明状态，经 layout 与 render 转成设备输出。"><div role="img" aria-label="WPF保留模式二维场景从输入到显示的数据流" className="grid gap-2 sm:grid-cols-2 lg:grid-cols-5">{scenePath.map(([title, detail], index) => <div key={title} className="relative min-h-28 border border-border bg-bg/45 p-3"><span className="text-xs font-bold text-accent">0{index + 1}</span><strong className="mt-2 block text-sm text-primary">{title}</strong><span className="mt-2 block text-xs text-secondary">{detail}</span>{index < scenePath.length - 1 && <span aria-hidden="true" className="absolute -right-2 top-11 z-10 text-accent">→</span>}</div>)}</div></Frame>;
}

const transforms = [["Translate", "T(tx, ty)", "point only"], ["Rotate", "R(θ)", "orientation + area"], ["Scale / shear", "S / H", "shape + determinant"], ["Change frame", "B←W · W←A", "source → target"], ["Inverse", "M⁻¹", "screen → local / undo"]] as const;

export function Cgp2dTransformDiagram() {
  return <Frame caption="组合顺序必须和 source/target frame 一起阅读；内存布局不是代数顺序。"><div role="img" aria-label="二维平移旋转缩放换基和逆变换关系" className="grid gap-2 md:grid-cols-5">{transforms.map(([title, symbol, role], index) => <div key={title} className="min-h-28 border border-border bg-bg/45 p-3"><span className="grid size-7 place-items-center rounded-full bg-accent/15 text-xs font-bold text-accent">{index + 1}</span><strong className="mt-3 block text-sm text-primary">{title}</strong><span className="mt-2 block font-mono text-xs text-warning">{symbol}</span><span className="mt-2 block text-xs text-secondary">{role}</span></div>)}</div></Frame>;
}

const contracts = [["Semantic types", "Point / Vector / Frame / Bounds"], ["Convention", "source-target + vector side + units"], ["Operations", "construct + compose + inverse + apply"], ["Failure", "singular + NaN + range policy"], ["Evidence", "properties + CPU/GPU + serialization"]] as const;

export function CgpTransformLibraryDiagram() {
  return <Frame caption="可靠变换库的核心是语义合同和性质证据，不是一个 float[9]。"><div role="img" aria-label="二维三维变换库的类型约定操作失败和测试合同" className="grid gap-2 sm:grid-cols-2 lg:grid-cols-5">{contracts.map(([title, detail], index) => <div key={title} className="relative min-h-28 border border-border bg-bg/45 p-3"><strong className="text-sm text-primary">{title}</strong><span className="mt-2 block text-xs leading-5 text-secondary">{detail}</span>{index < contracts.length - 1 && <span aria-hidden="true" className="absolute -right-2 top-10 z-10 text-accent">→</span>}</div>)}</div></Frame>;
}
