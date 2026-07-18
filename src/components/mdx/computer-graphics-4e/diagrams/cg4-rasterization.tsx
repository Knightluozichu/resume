const coverageStages = [
  ["Clip", "齐次裁剪", "跨观察体边界的图元生成合法新顶点"],
  ["Setup", "边方程 + bounding box", "确定方向、面积和增量系数"],
  ["Sample", "top-left coverage", "每个样本只归属于共享边一侧"],
  ["Interpolate", "barycentric + 1/w", "产生深度与 shader 输入"],
] as const;

const frequencyRows = [
  ["Pixel", "每像素存储/显示位置", "不是 shader invocation 的保证"],
  ["Coverage sample", "判断图元覆盖、深度/模板", "MSAA 可每像素多个"],
  ["Fragment invocation", "运行 fragment shader", "可按 pixel、sample 或 helper 执行"],
  ["Resolved pixel", "样本合成后的颜色", "仍需颜色编码和显示"],
] as const;

function Frame({ caption, children }: { caption: string; children: React.ReactNode }) {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">{children}</div>
      <figcaption className="mt-2 text-center text-sm text-secondary">{caption}</figcaption>
    </figure>
  );
}

export function Cg4RasterizationDiagram() {
  return (
    <Frame caption="光栅化先建立覆盖合同，再在覆盖样本处计算插值；它不是简单把三角形涂进像素格。">
      <div role="img" aria-label="三角形光栅化四阶段" className="grid gap-3">
        <strong className="border-b border-border pb-3 text-sm text-primary">Triangle setup and sampling</strong>
        <div className="grid gap-3 md:grid-cols-4">
          {coverageStages.map(([stage, operation, proof], index) => (
            <div key={stage} className="min-h-40 rounded-control border border-border bg-bg/45 p-4">
              <span className="mb-3 grid size-8 place-items-center rounded-full bg-accent/15 text-sm font-bold text-accent">{index + 1}</span>
              <strong className="block text-sm text-primary">{stage}</strong>
              <code className="mt-2 block text-xs text-accent">{operation}</code>
              <p className="mb-0 mt-2 text-xs leading-5 text-secondary">{proof}</p>
            </div>
          ))}
        </div>
      </div>
    </Frame>
  );
}

export function Cg4SamplingFrequencyDiagram() {
  return (
    <Frame caption="Pixel、coverage sample、fragment invocation 和 resolved color 是四个不同计数域。">
      <div role="img" aria-label="像素样本片段频率对比" className="overflow-x-auto">
        <div className="min-w-[720px] overflow-hidden rounded-control border border-border">
          <div className="grid grid-cols-[1.3fr_2fr_2fr] gap-px bg-border text-xs">
            {['对象', '职责', '边界'].map((label) => (
              <strong key={label} className="bg-bg p-3 text-primary">{label}</strong>
            ))}
            {frequencyRows.flatMap((row) => row.map((cell, index) => (
              <span key={`${row[0]}-${cell}`} className={index === 0 ? "bg-accent/10 p-3 font-semibold text-accent" : "bg-elevated p-3 leading-5 text-secondary"}>{cell}</span>
            )))}
          </div>
        </div>
      </div>
    </Frame>
  );
}
