/**
 * Chapter 12 resource ownership and GC flow.
 * Static SVG: it separates deterministic release from reachability-based
 * collection and makes the retention/lease boundaries inspectable.
 */

type LifecycleNode = {
  label: string;
  contract: string;
  evidence: string;
  color: string;
};

const LIFECYCLE_NODES: readonly LifecycleNode[] = [
  {
    label: "IDisposable / Dispose / Close",
    contract: "deterministic release",
    evidence: "owner · borrow · idempotent",
    color: "var(--accent)",
  },
  {
    label: "Automatic Garbage Collection",
    contract: "reachability reclaim",
    evidence: "allocation · pause · heap",
    color: "var(--success)",
  },
  {
    label: "Roots",
    contract: "strong reference path",
    evidence: "static · stack · handle",
    color: "var(--warning)",
  },
  {
    label: "Finalizers",
    contract: "last-resort fallback",
    evidence: "queue · thread · no timing",
    color: "var(--danger)",
  },
  {
    label: "How the GC Works",
    contract: "trace and compact",
    evidence: "mark · promote · reclaim",
    color: "var(--accent)",
  },
  {
    label: "Optimization Techniques",
    contract: "measure before tuning",
    evidence: "P95 · heap · throughput",
    color: "var(--success)",
  },
  {
    label: "Array Pooling",
    contract: "lease boundary",
    evidence: "Rent → try/finally → Return",
    color: "var(--warning)",
  },
  {
    label: "Managed Memory Leaks",
    contract: "unwanted retention",
    evidence: "event · timer · cache · root",
    color: "var(--danger)",
  },
  {
    label: "Weak References",
    contract: "non-owning observation",
    evidence: "optional cache · TryGetTarget",
    color: "var(--accent)",
  },
];

const CHAPTER_CONCEPTS =
  "IDisposable, Dispose, and Close; Automatic Garbage Collection; Roots; Finalizers; How the GC Works; Optimization Techniques; Array Pooling; Managed Memory Leaks; Weak References";

export function Ctc10DisposalGcOwnershipFlowDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <svg
          viewBox="0 0 560 830"
          role="img"
          aria-label={`C# resource and GC lifecycle: deterministic owners release resources, roots determine object reachability, and measurements validate collection and retention. Formal nodes: ${CHAPTER_CONCEPTS}`}
          className="mx-auto block h-auto w-full max-w-[560px]"
        >
          <text
            x="280"
            y="28"
            textAnchor="middle"
            fontSize="17"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            Resource lifetime ≠ object lifetime
          </text>
          <text
            x="280"
            y="51"
            textAnchor="middle"
            fontSize="12"
            fill="var(--text-secondary)"
          >
            owner releases scarce resources; GC follows roots and evidence
          </text>

          <rect
            x="100"
            y="72"
            width="360"
            height="56"
            rx="10"
            fill="var(--bg)"
            stroke="var(--accent)"
            strokeWidth="1.5"
          />
          <text
            x="280"
            y="96"
            textAnchor="middle"
            fontSize="13"
            fontWeight="700"
            fill="var(--accent)"
          >
            lifetime gate
          </text>
          <text
            x="280"
            y="115"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            acquire · transfer/borrow · dispose · measure · prove release
          </text>

          {LIFECYCLE_NODES.map((node, index) => {
            const column = index % 2;
            const row = Math.floor(index / 2);
            const x = 20 + column * 270;
            const y = 155 + row * 116;
            const center = x + 125;
            return (
              <g key={node.label}>
                {index < 2 ? (
                  <line
                    x1="280"
                    y1="128"
                    x2={center}
                    y2={y}
                    stroke={node.color}
                    strokeWidth="1.5"
                    opacity="0.8"
                  />
                ) : null}
                <rect
                  x={x}
                  y={y}
                  width="250"
                  height="96"
                  rx="10"
                  fill="var(--bg)"
                  stroke={node.color}
                  strokeWidth="1.5"
                />
                <circle cx={x + 19} cy={y + 23} r="7" fill={node.color} />
                <text
                  x={x + 34}
                  y={y + 27}
                  fontSize="11"
                  fontWeight="700"
                  fill={node.color}
                  fontFamily="monospace"
                >
                  {node.label}
                </text>
                <text
                  x={x + 16}
                  y={y + 58}
                  fontSize="12"
                  fontWeight="600"
                  fill="var(--text-primary)"
                >
                  {node.contract}
                </text>
                <text
                  x={x + 16}
                  y={y + 78}
                  fontSize="11"
                  fill="var(--text-secondary)"
                >
                  {node.evidence}
                </text>
              </g>
            );
          })}

          <line
            x1="24"
            y1="752"
            x2="536"
            y2="752"
            stroke="var(--border)"
            strokeDasharray="5 4"
          />
          <text
            x="280"
            y="775"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            explicit release / reachability / retention proof are separate gates
          </text>
          <text
            x="280"
            y="798"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            never treat GC.Collect, pooling, or WeakReference as ownership
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        把确定性释放、可达性回收、pool lease 与 retention proof 分开验收；覆盖 {CHAPTER_CONCEPTS}。
      </figcaption>
    </figure>
  );
}
