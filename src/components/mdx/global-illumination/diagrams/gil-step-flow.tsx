import type { ReactNode } from "react";

function Frame({ caption, children }: { caption: string; children: ReactNode }) {
  return <figure className="mdx-figure not-prose mx-auto my-6"><div className="overflow-hidden rounded-card border border-border bg-elevated p-4">{children}</div><figcaption className="mt-2 text-center text-sm text-secondary">{caption}</figcaption></figure>;
}

export function GilStepFlowDiagram({ caption, stage, stages }: { caption: string; stage: 1 | 2 | 3; stages: readonly string[] }) {
  return <Frame caption={caption}><div role="img" aria-label={caption} className="grid gap-3">{stages.slice(0, stage).map((label, index) => <div key={label} className="grid min-h-12 grid-cols-[2rem_1fr] items-center gap-3 border border-border bg-bg/40 p-3"><span className="grid size-8 place-items-center rounded-full bg-accent/15 text-sm font-bold text-accent">{index + 1}</span><strong className="text-sm text-primary">{label}</strong></div>)}</div></Frame>;
}
