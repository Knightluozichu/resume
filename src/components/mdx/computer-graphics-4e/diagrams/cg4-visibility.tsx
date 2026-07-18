const rejectionStages = [
  ["View volume", "frustum/clip", "观察体外，不等于被遮挡"],
  ["Primitive", "back-face / small / user cull", "按图元保守拒绝"],
  ["Coarse occlusion", "BVH/portal/Hi-Z", "按对象或 tile 拒绝"],
  ["Per sample", "depth/stencil", "最终样本可见性"],
] as const;

const methodRows = [
  ["Painter/BSP", "对象/图元顺序", "透明、静态空间；循环/相交困难"],
  ["Z-buffer", "每样本最近深度", "通用 opaque；内存与精度"],
  ["Hierarchical Z", "深度金字塔保守测试", "大量遮挡；需避免延迟和误拒绝"],
  ["OIT methods", "多层/加权/链表", "透明；质量、内存和排序权衡"],
] as const;

function Frame({ caption, children }: { caption: string; children: React.ReactNode }) {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">{children}</div>
      <figcaption className="mt-2 text-center text-sm text-secondary">{caption}</figcaption>
    </figure>
  );
}

export function Cg4VisibilityDiagram() {
  return (
    <Frame caption="可见性是逐层保守缩小候选集；只有最终 depth/stencil 在 sample 层决定当前写入。">
      <div role="img" aria-label="可见性四级拒绝流程" className="grid gap-3">
        <strong className="border-b border-border pb-3 text-sm text-primary">Visibility rejection hierarchy</strong>
        <div className="grid gap-3 md:grid-cols-4">
          {rejectionStages.map(([stage, method, boundary], index) => (
            <div key={stage} className="min-h-40 rounded-control border border-border bg-bg/45 p-4">
              <span className="mb-3 grid size-8 place-items-center rounded-full bg-accent/15 text-sm font-bold text-accent">{index + 1}</span>
              <strong className="block text-sm text-primary">{stage}</strong>
              <code className="mt-2 block text-xs text-accent">{method}</code>
              <p className="mb-0 mt-2 text-xs leading-5 text-secondary">{boundary}</p>
            </div>
          ))}
        </div>
      </div>
    </Frame>
  );
}

export function Cg4VisibilityMethodsDiagram() {
  return (
    <Frame caption="没有一种方法同时解决 opaque、透明、相交几何、精度和大场景性能。">
      <div role="img" aria-label="可见面检测方法对比" className="overflow-x-auto">
        <div className="min-w-[720px] overflow-hidden rounded-control border border-border">
          <div className="grid grid-cols-[1.3fr_1.7fr_2.2fr] gap-px bg-border text-xs">
            {['方法', '判据', '适用与代价'].map((label) => (
              <strong key={label} className="bg-bg p-3 text-primary">{label}</strong>
            ))}
            {methodRows.flatMap((row) => row.map((cell, index) => (
              <span key={`${row[0]}-${cell}`} className={index === 0 ? "bg-accent/10 p-3 font-semibold text-accent" : "bg-elevated p-3 leading-5 text-secondary"}>{cell}</span>
            )))}
          </div>
        </div>
      </div>
    </Frame>
  );
}
