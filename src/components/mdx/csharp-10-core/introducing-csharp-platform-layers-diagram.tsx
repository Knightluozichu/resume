/**
 * Chapter 1 language, runtime, and platform responsibility map.
 *
 * The visual keeps the first chapter's core lesson explicit: a feature claim
 * is only complete when its language, runtime, library, and deployment layers
 * have compatible evidence.
 */
type LayerNode = {
  label: string;
  contract: string;
  evidence: string;
  color: string;
};

const LAYER_NODES: readonly LayerNode[] = [
  {
    label: "Object Orientation",
    contract: "model + dispatch",
    evidence: "static overload · runtime type",
    color: "var(--accent)",
  },
  {
    label: "Type Safety",
    contract: "static/runtime checks",
    evidence: "cast · dynamic · interop",
    color: "var(--success)",
  },
  {
    label: "Memory Management",
    contract: "GC vs resource owner",
    evidence: "reachability · Dispose",
    color: "var(--warning)",
  },
  {
    label: "Platform Support",
    contract: "TFM + RID + OS",
    evidence: "path · culture · native",
    color: "var(--danger)",
  },
  {
    label: "CLR / BCL / Runtime",
    contract: "layer responsibility",
    evidence: "IL · API · host",
    color: "var(--accent)",
  },
  {
    label: "C# History",
    contract: "feature cadence",
    evidence: "compiler · language · runtime",
    color: "var(--success)",
  },
  {
    label: "What's New in C# 10",
    contract: "compatibility matrix",
    evidence: "LangVersion · TFM · deploy",
    color: "var(--warning)",
  },
];

const CHAPTER_CONCEPTS =
  "Object Orientation; Type Safety; Memory Management; Platform Support; CLRs, BCLs, and Runtimes; A Brief History of C#; What's New in C# 10";

export function Ctc10IntroducingCsharpPlatformLayersDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <svg
          viewBox="0 0 560 680"
          role="img"
          aria-label={`C# and .NET platform responsibility map. Formal nodes: ${CHAPTER_CONCEPTS}`}
          className="mx-auto block h-auto w-full max-w-[760px]"
        >
          <defs>
            <marker id="ctc10-01-arrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
              <path d="M0,0 L8,4 L0,8 z" fill="var(--text-secondary)" />
            </marker>
          </defs>
          <title>C# and .NET platform responsibility map</title>
          <text x="280" y="28" textAnchor="middle" fill="var(--text-primary)" fontSize="17" fontWeight="700">
            A feature claim crosses four responsibility layers
          </text>
          <text x="280" y="51" textAnchor="middle" fill="var(--text-secondary)" fontSize="12">
            source language → compiler/IL → CLR/BCL → TFM/RID/OS deployment
          </text>

          <rect x="80" y="72" width="400" height="58" rx="12" fill="var(--bg)" stroke="var(--accent)" strokeWidth="1.5" />
          <text x="280" y="97" textAnchor="middle" fill="var(--accent)" fontSize="13" fontWeight="700">
            Feature compatibility matrix
          </text>
          <text x="280" y="116" textAnchor="middle" fill="var(--text-secondary)" fontSize="11">
            syntax · API · runtime behavior · target machine
          </text>

          {LAYER_NODES.map((node, index) => {
            const column = index === 6 ? 0 : index % 2;
            const row = Math.floor(index / 2);
            const x = column === 0 ? 20 : 290;
            const y = 154 + row * 100;
            const centerX = x + 125;
            const parentY = row === 0 ? 130 : y - 22;

            return (
              <g key={node.label}>
                <path
                  d={`M${centerX} ${parentY} L${centerX} ${y}`}
                  stroke="var(--text-secondary)"
                  strokeWidth="1"
                  strokeDasharray={row === 0 ? undefined : "4 4"}
                  markerEnd="url(#ctc10-01-arrow)"
                />
                <rect x={x} y={y} width="250" height="78" rx="10" fill="var(--bg)" stroke={node.color} strokeWidth="1.5" />
                <circle cx={x + 18} cy={y + 18} r="6" fill={node.color} />
                <text x={x + 32} y={y + 22} fill={node.color} fontSize="12" fontWeight="700">
                  {node.label}
                </text>
                <text x={x + 18} y={y + 48} fill="var(--text-primary)" fontSize="11" fontWeight="600">
                  {node.contract}
                </text>
                <text x={x + 18} y={y + 65} fill="var(--text-secondary)" fontSize="11">
                  {node.evidence}
                </text>
              </g>
            );
          })}

          <path d="M20 578 H540" stroke="var(--border)" strokeWidth="1" strokeDasharray="5 5" />
          <text x="280" y="602" textAnchor="middle" fill="var(--text-primary)" fontSize="12" fontWeight="700">
            Boundary checkpoint
          </text>
          <text x="280" y="623" textAnchor="middle" fill="var(--text-secondary)" fontSize="11">
            classify compile, API, runtime, resource, and platform failures separately
          </text>
          <text x="280" y="643" textAnchor="middle" fill="var(--text-secondary)" fontSize="11">
            prove the claim with compile, publish, and target-machine evidence
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        图 1-1：C# 与 .NET 的职责分层图；任何 feature 都必须在语言、runtime、API 和部署目标上分别验收。
      </figcaption>
    </figure>
  );
}
