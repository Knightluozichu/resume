import type { ReactNode } from "react";

function Frame({ caption, children }: { caption: string; children: ReactNode }) {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">{children}</div>
      <figcaption className="mt-2 text-center text-sm text-secondary">{caption}</figcaption>
    </figure>
  );
}

const pbrPath = [
  ["Incident radiance", "Li(l) + visibility"],
  ["Material BRDF", "diffuse + microfacet"],
  ["Directional integral", "NoL / PDF / samples"],
  ["Outgoing radiance", "direct + environment"],
] as const;

export function RtrAdvancedShadingDiagram() {
  return (
    <Frame caption="PBR 必须让材质模型、方向积分和 direct/IBL 路径使用同一约定。">
      <div role="img" aria-label="物理着色从入射辐亮度到出射辐亮度的路径" className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {pbrPath.map(([title, detail], index) => (
          <div key={title} className="relative min-h-28 border border-border bg-bg/45 p-3">
            <span className="text-xs font-bold text-accent">0{index + 1}</span>
            <strong className="mt-2 block text-sm text-primary">{title}</strong>
            <span className="mt-2 block text-xs leading-5 text-secondary">{detail}</span>
            {index < pbrPath.length - 1 && <span aria-hidden="true" className="absolute -right-2 top-12 z-10 text-accent">→</span>}
          </div>
        ))}
      </div>
    </Frame>
  );
}

const microfacetTerms = [
  ["D: distribution", "How much micro-area has normal h", "GGX / anisotropic GGX"],
  ["F: interface", "How much one microfacet reflects", "IOR / complex IOR / Schlick"],
  ["G: visibility", "Which microfacets are unmasked", "Smith correlated / uncorrelated"],
] as const;

export function RtrMicrofacetDiagram() {
  return (
    <Frame caption="D 描述朝向、F 描述界面反射、G 描述微面可见性。">
      <div role="img" aria-label="微表面 BRDF 的 D、F、G 三项职责" className="grid gap-3 md:grid-cols-3">
        {microfacetTerms.map(([title, question, model], index) => (
          <div key={title} className="min-h-40 border border-border bg-bg/45 p-3">
            <span className="grid size-8 place-items-center rounded-full bg-accent/15 text-sm font-bold text-accent">{index + 1}</span>
            <strong className="mt-3 block text-sm text-primary">{title}</strong>
            <p className="mb-0 mt-2 text-xs leading-5 text-secondary">{question}</p>
            <p className="mb-0 mt-3 border-t border-border pt-2 text-xs text-warning">Model: {model}</p>
          </div>
        ))}
      </div>
      <div className="mt-3 text-center font-mono text-sm text-primary">fs = D · F · G / (4 NoL NoV)</div>
    </Frame>
  );
}

const validation = [
  ["Reciprocity", "swap L and V", "fr(L,V) ≈ fr(V,L)"],
  ["White furnace", "uniform Li", "no created energy"],
  ["Parameter sweep", "roughness / F0 / NoV", "continuous plausible lobes"],
  ["Normal mip", "distance + motion", "stable effective roughness"],
  ["Direct vs IBL", "same environment", "matching integration"],
  ["Reference", "path-traced spheres", "bounded image error"],
] as const;

export function RtrMaterialValidationDiagram() {
  return (
    <Frame caption="材质不是凭眼调完：数值约束、参数扫描、时域和 reference 都要通过。">
      <div role="img" aria-label="PBR 材质六类验证矩阵" className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {validation.map(([name, input, expected]) => (
          <div key={name} className="min-h-28 border border-border bg-bg/45 p-3">
            <strong className="text-sm text-primary">{name}</strong>
            <p className="mb-0 mt-2 text-xs text-secondary">Input: {input}</p>
            <p className="mb-0 mt-2 text-xs text-success">Expect: {expected}</p>
          </div>
        ))}
      </div>
    </Frame>
  );
}
