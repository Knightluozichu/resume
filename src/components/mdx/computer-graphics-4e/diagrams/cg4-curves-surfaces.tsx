const representationRows = [
  ["Polygon mesh", "vertices/edges/faces", "直接光栅化；离散近似、拓扑显式"],
  ["Parametric", "C(u), S(u,v)", "求值/导数自然；需选择 tessellation"],
  ["Implicit", "F(x,y,z)=0", "inside/outside 与 blend 自然；提取表面有成本"],
  ["Solid / CSG", "集合与体语义", "布尔建模；边界求值和鲁棒性复杂"],
] as const;

const evaluationStages = [
  ["Represent", "control points + degree + knots/weights", "定义形状空间"],
  ["Evaluate", "de Casteljau / de Boor", "稳定求点和导数"],
  ["Bound error", "flatness / curvature / screen error", "决定细分"],
  ["Tessellate", "shared edge factors + mesh", "无裂缝交给 rasterizer"],
] as const;

function Frame({ caption, children }: { caption: string; children: React.ReactNode }) {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">{children}</div>
      <figcaption className="mt-2 text-center text-sm text-secondary">{caption}</figcaption>
    </figure>
  );
}

export function Cg4CurvesSurfacesDiagram() {
  return (
    <Frame caption="对象表示决定可编辑操作、误差度量和最终如何转换为可绘制图元。">
      <div role="img" aria-label="三维对象表示方法对比" className="overflow-x-auto">
        <div className="min-w-[720px] overflow-hidden rounded-control border border-border">
          <div className="grid grid-cols-[1.3fr_1.6fr_2.4fr] gap-px bg-border text-xs">
            {['表示', '核心数据', '优势与代价'].map((label) => (
              <strong key={label} className="bg-bg p-3 text-primary">{label}</strong>
            ))}
            {representationRows.flatMap((row) => row.map((cell, index) => (
              <span key={`${row[0]}-${cell}`} className={index === 0 ? "bg-accent/10 p-3 font-semibold text-accent" : "bg-elevated p-3 leading-5 text-secondary"}>{cell}</span>
            )))}
          </div>
        </div>
      </div>
    </Frame>
  );
}

export function Cg4CurveEvaluationDiagram() {
  return (
    <Frame caption="参数曲线/曲面只有经过误差受控且共享边一致的细分，才成为稳定 raster geometry。">
      <div role="img" aria-label="参数曲线曲面求值与细分流程" className="grid gap-3">
        <strong className="border-b border-border pb-3 text-sm text-primary">Parametric-to-raster path</strong>
        <div className="grid gap-3 md:grid-cols-4">
          {evaluationStages.map(([stage, operation, result], index) => (
            <div key={stage} className="min-h-40 rounded-control border border-border bg-bg/45 p-4">
              <span className="mb-3 grid size-8 place-items-center rounded-full bg-accent/15 text-sm font-bold text-accent">{index + 1}</span>
              <strong className="block text-sm text-primary">{stage}</strong>
              <code className="mt-2 block text-xs text-accent">{operation}</code>
              <p className="mb-0 mt-2 text-xs leading-5 text-secondary">{result}</p>
            </div>
          ))}
        </div>
      </div>
    </Frame>
  );
}
