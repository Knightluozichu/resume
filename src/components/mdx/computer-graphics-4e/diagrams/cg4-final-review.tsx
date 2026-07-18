const contracts = [
  ["System", "hardware / applications / input / display"],
  ["Geometry", "primitives / transforms / hierarchy / splines"],
  ["Sampling", "raster / visibility / texture / volume"],
  ["Appearance", "color / local + global illumination"],
  ["Evidence", "numeric / image / interaction / performance"],
] as const;

const evidenceRows = [
  ["数学", "matrix、edge、basis、BRDF/integral", "已知输入与误差界"],
  ["图像", "reference pixels/images、seams、silhouette", "空间与颜色正确"],
  ["时域", "fixed-step、camera motion、aliasing", "动画稳定且可复现"],
  ["交互", "DPI/viewport/picking/task", "输入语义正确"],
  ["性能", "CPU/GPU timeline、counters、memory", "瓶颈有证据而非猜测"],
] as const;

function Frame({ caption, children }: { caption: string; children: React.ReactNode }) {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">{children}</div>
      <figcaption className="mt-2 text-center text-sm text-secondary">{caption}</figcaption>
    </figure>
  );
}

export function Cg4FinalReviewDiagram() {
  return (
    <Frame caption="原书 22 章最终收敛为五类合同；渲染管线只是 Geometry/Sampling 中的一部分。">
      <div role="img" aria-label="计算机图形学第四版五类验收合同" className="grid gap-3">
        <strong className="border-b border-border pb-3 text-sm text-primary">22-unit acceptance stack</strong>
        <div className="grid gap-3 lg:grid-cols-5">
          {contracts.map(([name, detail], index) => (
            <div key={name} className="min-h-36 rounded-control border border-border bg-bg/45 p-4">
              <span className="mb-3 grid size-8 place-items-center rounded-full bg-accent/15 text-sm font-bold text-accent">{index + 1}</span>
              <strong className="block text-sm text-primary">{name}</strong>
              <p className="mb-0 mt-2 text-xs leading-5 text-secondary">{detail}</p>
            </div>
          ))}
        </div>
      </div>
    </Frame>
  );
}

export function Cg4ReviewEvidenceDiagram() {
  return (
    <Frame caption="章节通过要求数学、图像、时域、交互和性能证据与主题风险匹配。">
      <div role="img" aria-label="计算机图形学综合验收证据矩阵" className="overflow-x-auto">
        <div className="min-w-[720px] overflow-hidden rounded-control border border-border">
          <div className="grid grid-cols-[1.1fr_2.2fr_2fr] gap-px bg-border text-xs">
            {['证据', '样本', '证明'].map((label) => (
              <strong key={label} className="bg-bg p-3 text-primary">{label}</strong>
            ))}
            {evidenceRows.flatMap((row) => row.map((cell, index) => (
              <span key={`${row[0]}-${cell}`} className={index === 0 ? "bg-accent/10 p-3 font-semibold text-accent" : "bg-elevated p-3 leading-5 text-secondary"}>{cell}</span>
            )))}
          </div>
        </div>
      </div>
    </Frame>
  );
}
