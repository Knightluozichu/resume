const lightTerms = [
  ["Geometry", "N·L and N·V", "朝向与可见半球"],
  ["Material", "diffuse + specular BRDF", "光如何按方向散射"],
  ["Transport", "Li × visibility × attenuation", "有多少光真正到达"],
  ["Encoding", "linear HDR → display transform", "数值如何成为显示颜色"],
] as const;

const shadingRows = [
  ["Flat", "每 primitive 一个法线/颜色", "硬表面；轮廓分面明显"],
  ["Gouraud", "顶点求光照，插值颜色", "便宜；可能漏掉三角形内部高光"],
  ["Phong shading", "插值并归一化法线，逐 fragment 求光照", "更稳定高光；成本更高"],
  ["BRDF shading", "逐 fragment 材质/光传输", "可物理约束；仍需 visibility/GI"],
] as const;

function Frame({ caption, children }: { caption: string; children: React.ReactNode }) {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">{children}</div>
      <figcaption className="mt-2 text-center text-sm text-secondary">{caption}</figcaption>
    </figure>
  );
}

export function Cg4LightingModelsDiagram() {
  return (
    <Frame caption="直接光颜色由几何、材质、传输和颜色出口共同决定；经典 Phong 只覆盖其中一部分。">
      <div role="img" aria-label="直接光照四项合同" className="grid gap-3">
        <strong className="border-b border-border pb-3 text-sm text-primary">Direct-light contract</strong>
        <div className="grid gap-3 md:grid-cols-4">
          {lightTerms.map(([term, expression, meaning], index) => (
            <div key={term} className="min-h-40 rounded-control border border-border bg-bg/45 p-4">
              <span className="mb-3 grid size-8 place-items-center rounded-full bg-accent/15 text-sm font-bold text-accent">{index + 1}</span>
              <strong className="block text-sm text-primary">{term}</strong>
              <code className="mt-2 block text-xs text-accent">{expression}</code>
              <p className="mb-0 mt-2 text-xs leading-5 text-secondary">{meaning}</p>
            </div>
          ))}
        </div>
      </div>
    </Frame>
  );
}

export function Cg4ShadingMethodsDiagram() {
  return (
    <Frame caption="Flat、Gouraud、Phong 描述求值频率和插值对象，不是三种不同光照定律。">
      <div role="img" aria-label="表面着色方法对比" className="overflow-x-auto">
        <div className="min-w-[720px] overflow-hidden rounded-control border border-border">
          <div className="grid grid-cols-[1.2fr_2fr_2fr] gap-px bg-border text-xs">
            {['方法', '求值', '边界'].map((label) => (
              <strong key={label} className="bg-bg p-3 text-primary">{label}</strong>
            ))}
            {shadingRows.flatMap((row) => row.map((cell, index) => (
              <span key={`${row[0]}-${cell}`} className={index === 0 ? "bg-accent/10 p-3 font-semibold text-accent" : "bg-elevated p-3 leading-5 text-secondary"}>{cell}</span>
            )))}
          </div>
        </div>
      </div>
    </Frame>
  );
}
