/**
 * Chapter 22 execution and completion map.
 *
 * The visual keeps the performance contract visible: measure the baseline,
 * choose a partitioning model, then prove completion and fault ownership.
 */
type ExecutionNode = {
  label: string;
  contract: string;
  evidence: string;
  color: string;
};

const EXECUTION_NODES: readonly ExecutionNode[] = [
  {
    label: "PFX Concepts",
    contract: "choose the parallel shape",
    evidence: "data · task · pipeline",
    color: "var(--accent)",
  },
  {
    label: "PLINQ",
    contract: "query partition + merge",
    evidence: "order · degree · side effects",
    color: "var(--success)",
  },
  {
    label: "The Parallel Class",
    contract: "loop body + local state",
    evidence: "break · stop · cancellation",
    color: "var(--warning)",
  },
  {
    label: "Task Parallelism",
    contract: "DAG dependencies",
    evidence: "result · fault · loser cancel",
    color: "var(--danger)",
  },
  {
    label: "Task Schedulers",
    contract: "queue + execution policy",
    evidence: "inline · affinity · capacity",
    color: "var(--accent)",
  },
  {
    label: "Working with AggregateException",
    contract: "observe every branch",
    evidence: "fault · cancel · cleanup",
    color: "var(--success)",
  },
  {
    label: "Concurrent Collections",
    contract: "atomic item operations",
    evidence: "winner · weak view · invariant",
    color: "var(--warning)",
  },
  {
    label: "Producer/Consumer Queue",
    contract: "bounded lifecycle",
    evidence: "backpressure · complete · drain",
    color: "var(--danger)",
  },
];

const CHAPTER_CONCEPTS =
  "PFX Concepts; PLINQ; The Parallel Class; Task Parallelism; Task Schedulers; Working with AggregateException; Concurrent Collections; Writing a Producer/Consumer Queue";

export function Ctc10ParallelProgrammingExecutionMapDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <svg
          viewBox="0 0 560 660"
          role="img"
          aria-label={`Parallel programming execution and completion map. Formal nodes: ${CHAPTER_CONCEPTS}`}
          className="mx-auto block h-auto w-full max-w-[760px]"
        >
          <defs>
            <marker id="ctc10-22-arrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
              <path d="M0,0 L8,4 L0,8 z" fill="var(--text-secondary)" />
            </marker>
          </defs>
          <title>Parallel programming execution and completion map</title>
          <text x="280" y="28" textAnchor="middle" fill="var(--text-primary)" fontSize="17" fontWeight="700">
            Parallelism is a measured execution contract
          </text>
          <text x="280" y="51" textAnchor="middle" fill="var(--text-secondary)" fontSize="12">
            baseline → partition → schedule → merge → completion
          </text>

          <rect x="80" y="72" width="400" height="58" rx="12" fill="var(--bg)" stroke="var(--accent)" strokeWidth="1.5" />
          <text x="280" y="97" textAnchor="middle" fill="var(--accent)" fontSize="13" fontWeight="700">
            Sequential baseline
          </text>
          <text x="280" y="116" textAnchor="middle" fill="var(--text-secondary)" fontSize="11">
            work · wall/CPU · allocation · result determinism
          </text>

          <path d="M280 130 L145 152" stroke="var(--text-secondary)" strokeWidth="1.5" markerEnd="url(#ctc10-22-arrow)" />
          <path d="M280 130 L415 152" stroke="var(--text-secondary)" strokeWidth="1.5" markerEnd="url(#ctc10-22-arrow)" />

          {EXECUTION_NODES.map((node, index) => {
            const column = index % 2;
            const row = Math.floor(index / 2);
            const x = column === 0 ? 20 : 290;
            const y = 150 + row * 100;
            const centerX = x + 125;
            const parentY = row === 0 ? 130 : y - 22;
            const parentX = row === 0 ? centerX : centerX;

            return (
              <g key={node.label}>
                {row > 0 && (
                  <path
                    d={`M${parentX} ${parentY} L${centerX} ${y}`}
                    stroke="var(--text-secondary)"
                    strokeWidth="1"
                    strokeDasharray="4 4"
                    markerEnd="url(#ctc10-22-arrow)"
                  />
                )}
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

          <path d="M20 568 H540" stroke="var(--border)" strokeWidth="1" strokeDasharray="5 5" />
          <text x="280" y="592" textAnchor="middle" fill="var(--text-primary)" fontSize="12" fontWeight="700">
            Completion checkpoint
          </text>
          <text x="280" y="613" textAnchor="middle" fill="var(--text-secondary)" fontSize="11">
            observe results, classify faults, and drain ownership before shutdown
          </text>
          <text x="280" y="633" textAnchor="middle" fill="var(--text-secondary)" fontSize="11">
            no speedup claim without a comparable baseline and deterministic merge rule
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        图 22-1：并行化从顺序基线开始，最终以归并、故障观察和队列排空证明完成性。
      </figcaption>
    </figure>
  );
}
