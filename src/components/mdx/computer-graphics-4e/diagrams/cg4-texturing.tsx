const samplingStages = [
  ["Parameterize", "surface → UV", "seams、stretch、orientation"],
  ["Estimate footprint", "dUV/dx, dUV/dy", "magnification / minification / anisotropy"],
  ["Filter", "nearest / bilinear / mip / anisotropic", "近似像素积分"],
  ["Interpret", "color / normal / data semantics", "decode、renormalize、shade"],
] as const;

const detailRows = [
  ["Color texture", "改变反射/发光参数", "sRGB decode、linear filtering"],
  ["Bump map", "高度梯度扰动法线", "不改变轮廓和遮挡"],
  ["Normal map", "直接存局部法线", "TBN、handedness、renormalize"],
  ["Parallax", "沿 view 偏移 UV", "近似视差；轮廓仍不变"],
  ["Displacement", "真正移动几何", "需足够 tessellation，改变轮廓/阴影"],
] as const;

function Frame({ caption, children }: { caption: string; children: React.ReactNode }) {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">{children}</div>
      <figcaption className="mt-2 text-center text-sm text-secondary">{caption}</figcaption>
    </figure>
  );
}

export function Cg4TexturingDiagram() {
  return (
    <Frame caption="纹理采样不是按 UV 取一个点，而是估计 screen pixel 在 texture space 的 footprint 并过滤其数据语义。">
      <div role="img" aria-label="纹理参数化到着色四阶段" className="grid gap-3">
        <strong className="border-b border-border pb-3 text-sm text-primary">Surface-detail sampling path</strong>
        <div className="grid gap-3 md:grid-cols-4">
          {samplingStages.map(([stage, operation, proof], index) => (
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

export function Cg4SurfaceDetailDiagram() {
  return (
    <Frame caption="表面细节技术改变的对象不同：材质、法线、UV 还是几何，决定其轮廓和阴影能力。">
      <div role="img" aria-label="表面细节方法对比" className="overflow-x-auto">
        <div className="min-w-[720px] overflow-hidden rounded-control border border-border">
          <div className="grid grid-cols-[1.2fr_2fr_2fr] gap-px bg-border text-xs">
            {['方法', '改变什么', '边界'].map((label) => (
              <strong key={label} className="bg-bg p-3 text-primary">{label}</strong>
            ))}
            {detailRows.flatMap((row) => row.map((cell, index) => (
              <span key={`${row[0]}-${cell}`} className={index === 0 ? "bg-accent/10 p-3 font-semibold text-accent" : "bg-elevated p-3 leading-5 text-secondary"}>{cell}</span>
            )))}
          </div>
        </div>
      </div>
    </Frame>
  );
}
