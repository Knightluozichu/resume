import type { ReactNode } from "react";

function Frame({ caption, children }: { caption: string; children: ReactNode }) {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">{children}</div>
      <figcaption className="mt-2 text-center text-sm text-secondary">{caption}</figcaption>
    </figure>
  );
}

const shadowPath = [
  ["Light projection", "view + projection + caster set"],
  ["Depth map", "nearest light-space surface"],
  ["Receiver lookup", "clip → NDC → UVZ + bias"],
  ["Visibility", "compare + filter + direct light"],
] as const;

export function RtrShadowsDiagram() {
  return (
    <Frame caption="Shadow map 把光源视野中的最近深度重投影为接收点可见性。">
      <div role="img" aria-label="阴影映射从光源投影到接收点可见性的完整路径" className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {shadowPath.map(([title, detail], index) => (
          <div key={title} className="relative min-h-28 border border-border bg-bg/45 p-3">
            <span className="text-xs font-bold text-accent">0{index + 1}</span>
            <strong className="mt-2 block text-sm text-primary">{title}</strong>
            <span className="mt-2 block text-xs leading-5 text-secondary">{detail}</span>
            {index < shadowPath.length - 1 && <span aria-hidden="true" className="absolute -right-2 top-12 z-10 text-accent">→</span>}
          </div>
        ))}
      </div>
    </Frame>
  );
}

const precisionRows = [
  ["Too little bias", "receiver depth > stored self depth", "acne"],
  ["Matched bias", "covers quantization + footprint slope", "stable contact"],
  ["Too much bias", "receiver shifted toward light", "leak / detachment"],
] as const;

export function RtrShadowPrecisionDiagram() {
  return (
    <Frame caption="Bias 的目标是覆盖离散误差，而不是把接收面任意推离 caster。">
      <div role="img" aria-label="偏移不足、合适和过量对阴影比较的影响" className="grid gap-3 md:grid-cols-3">
        {precisionRows.map(([title, cause, result], index) => (
          <div key={title} className="min-h-36 border border-border bg-bg/45 p-3">
            <div className={`h-2 ${index === 0 ? "bg-warning" : index === 1 ? "bg-success" : "bg-accent"}`} />
            <strong className="mt-3 block text-sm text-primary">{title}</strong>
            <span className="mt-2 block text-xs leading-5 text-secondary">{cause}</span>
            <span className="mt-3 block border-t border-border pt-2 text-xs font-semibold text-warning">Result: {result}</span>
          </div>
        ))}
      </div>
      <div className="mt-3 border-l-4 border-accent bg-accent/10 p-3 text-xs text-primary">constant + slope + normal/receiver-plane bias must use explicit units and limits</div>
    </Frame>
  );
}

const methods = [
  ["PCF", "binary comparisons", "edge filtering", "fixed-kernel softness"],
  ["PCSS", "blocker search + PCF", "contact hardening", "search noise / cost"],
  ["VSM / EVSM", "depth moments", "prefilterable", "light bleeding / precision"],
  ["CSM", "multiple projections", "directional coverage", "split stability"],
  ["Cube map", "six projections", "point lights", "seams + update cost"],
  ["Ray traced", "geometry visibility", "area lights / detail", "samples + denoise"],
] as const;

export function RtrShadowMethodsDiagram() {
  return (
    <Frame caption="阴影方法应按光源、覆盖、penumbra、稳定性和成本组合。">
      <div role="img" aria-label="PCF、PCSS、矩阴影、级联、全向和光追阴影比较" className="grid gap-2 md:grid-cols-2 lg:grid-cols-3">
        {methods.map(([name, model, strength, risk]) => (
          <div key={name} className="min-h-32 border border-border bg-bg/45 p-3">
            <strong className="text-sm text-primary">{name}</strong>
            <p className="mb-0 mt-2 text-xs text-secondary">Model: {model}</p>
            <p className="mb-0 mt-2 text-xs text-success">Use: {strength}</p>
            <p className="mb-0 mt-2 text-xs text-warning">Risk: {risk}</p>
          </div>
        ))}
      </div>
    </Frame>
  );
}
