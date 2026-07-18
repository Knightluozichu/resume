import type { ReactNode } from "react";

function Frame({ caption, children }: { caption: string; children: ReactNode }) {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">{children}</div>
      <figcaption className="mt-2 text-center text-sm text-secondary">{caption}</figcaption>
    </figure>
  );
}

const shadingStages = [
  ["Representation", "mesh / particle / SDF / volume"],
  ["Incident light", "radiance + visibility + PDF"],
  ["Response", "BRDF / phase / stylization"],
  ["Sampling", "frequency + filter + temporal"],
  ["Display", "tone + gamut + transfer"],
] as const;

export function RtrShadingBasicsDiagram() {
  return (
    <Frame caption="外观计算从表示和入射光开始，经响应、采样与显示变换结束。">
      <div role="img" aria-label="完整外观着色数据流" className="grid gap-3">
        <div className="grid grid-cols-2 gap-2 md:grid-cols-5">
          {shadingStages.map(([title, detail], index) => (
            <div key={title} className="relative min-h-28 border border-border bg-bg/45 p-3">
              <span className="text-xs font-bold text-accent">0{index + 1}</span>
              <strong className="mt-2 block text-sm text-primary">{title}</strong>
              <span className="mt-2 block text-xs leading-5 text-secondary">{detail}</span>
              {index < shadingStages.length - 1 && <span aria-hidden="true" className="absolute -right-2 top-12 z-10 text-accent">→</span>}
            </div>
          ))}
        </div>
        <div className="grid gap-2 text-xs sm:grid-cols-3">
          <span className="border-l-4 border-success bg-success/10 p-2 text-primary">Correct quantity and space</span>
          <span className="border-l-4 border-warning bg-warning/10 p-2 text-primary">Correct estimator or approximation</span>
          <span className="border-l-4 border-accent bg-accent/10 p-2 text-primary">Stable samples in space and time</span>
        </div>
      </div>
    </Frame>
  );
}

const radiometry = [
  ["Flux Φ", "W", "total radiant power"],
  ["Intensity I", "W / sr", "power per solid angle"],
  ["Irradiance E", "W / m²", "incident power per area"],
  ["Radiance L", "W / m² / sr", "directional projected-area density"],
] as const;

export function RtrRadiometryDiagram() {
  return (
    <Frame caption="辐射量先按立体角与面积细分，再经视觉加权和颜色管线进入显示。">
      <div role="img" aria-label="Flux、intensity、irradiance、radiance 与颜色管线关系" className="grid gap-4">
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {radiometry.map(([name, unit, detail]) => (
            <div key={name} className="min-h-28 border border-border bg-bg/45 p-3 text-center">
              <strong className="text-sm text-primary">{name}</strong>
              <span className="mt-2 block font-mono text-xs text-accent">{unit}</span>
              <span className="mt-2 block text-xs text-secondary">{detail}</span>
            </div>
          ))}
        </div>
        <div className="grid items-center gap-2 text-center text-xs sm:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr]">
          <span className="border border-border bg-bg/45 p-2 text-primary">spectrum / radiance</span><b className="text-accent">→</b>
          <span className="border border-border bg-bg/45 p-2 text-primary">XYZ / linear RGB</span><b className="text-accent">→</b>
          <span className="border border-border bg-bg/45 p-2 text-primary">tone + gamut</span><b className="text-accent">→</b>
          <span className="border border-border bg-bg/45 p-2 text-primary">display encoding</span>
        </div>
      </div>
    </Frame>
  );
}

const families = [
  ["Surface", "BRDF + local lights", "area-light reference, white furnace"],
  ["Beyond polygons", "particle / billboard / SDF", "coverage, sorting, hit convergence"],
  ["Volume", "extinction + in-scattering", "Beer-Lambert, step convergence"],
  ["Stylized", "ramp + contour + stroke", "reference, edge and temporal stability"],
] as const;

export function RtrAppearanceFamiliesDiagram() {
  return (
    <Frame caption="不同表示使用不同响应方程，但都需要参考结果、稳定性和成本证据。">
      <div role="img" aria-label="表面、非多边形、体积和风格化外观的输入与验收" className="grid gap-3 md:grid-cols-2">
        {families.map(([title, method, test], index) => (
          <div key={title} className="grid min-h-28 grid-cols-[2.25rem_1fr] gap-3 border border-border bg-bg/45 p-3">
            <span className="grid size-9 place-items-center rounded-full bg-accent/15 text-sm font-bold text-accent">{index + 1}</span>
            <div>
              <strong className="text-sm text-primary">{title}</strong>
              <p className="mb-0 mt-1 text-xs text-secondary">Model: {method}</p>
              <p className="mb-0 mt-2 border-t border-border pt-2 text-xs text-warning">Verify: {test}</p>
            </div>
          </div>
        ))}
      </div>
    </Frame>
  );
}
