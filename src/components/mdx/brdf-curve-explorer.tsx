"use client";

/**
 * <BrdfCurveExplorer>: BRDF D/G/F curve interactive plotter MDX entry (HEL-167).
 *
 * B-type (math) chapter interactive Demo for PBR Theory.
 * Canvas2D plots NDF-GGX, Smith-Schlick-GGX geometry, and Fresnel-Schlick
 * curves over theta 0..90 deg, driven by roughness slider + metallic toggle.
 *
 * This file is the "dynamic boundary" -- only lazy-loading orchestration,
 * no visualization logic (hard rule 2: Canvas / heavy interactive components
 * use next/dynamic + ssr:false + lazy load, never in critical path / shared layout).
 *
 * Colors / spacing / radii via DESIGN tokens only (hard rule 5).
 */

import dynamic from "next/dynamic";

/** Loading skeleton matching DemoStage / MathViz container style. */
function LoadingCard() {
  return (
    <div className="mdx-brdf-curve my-6 rounded-card border border-border bg-elevated p-6">
      <div className="mb-4">
        <span className="inline-flex items-center gap-1 rounded-control border border-border px-2 py-1 text-xs font-medium text-accent">
          <span aria-hidden="true">⚡</span>
          可交互
        </span>
      </div>
      <div className="flex min-h-64 items-center justify-center text-center">
        <p className="text-sm text-secondary">BRDF 曲线加载中…</p>
      </div>
    </div>
  );
}

const BrdfCurveCanvas = dynamic(
  () => import("./brdf-curve-explorer/brdf-curve-canvas"),
  {
    ssr: false,
    loading: () => <LoadingCard />,
  },
);

export function BrdfCurveExplorer() {
  return <BrdfCurveCanvas />;
}
