/**
 * Chapter 21 primitive state and ownership map.
 *
 * This is intentionally a static SVG: the chapter's visual checkpoint is
 * about comparing contracts, not hiding behavior behind an interactive demo.
 */
type PrimitiveNode = {
  label: string;
  contract: string;
  evidence: string;
  color: string;
};

const PRIMITIVE_NODES: readonly PrimitiveNode[] = [
  {
    label: "Synchronization Overview",
    contract: "choose scope + owner",
    evidence: "lock · event · phase",
    color: "var(--accent)",
  },
  {
    label: "Exclusive Locking",
    contract: "one holder",
    evidence: "Monitor · order · invariant",
    color: "var(--success)",
  },
  {
    label: "Mutex",
    contract: "kernel ownership",
    evidence: "named · abandon · release",
    color: "var(--warning)",
  },
  {
    label: "Locking and Thread Safety",
    contract: "all API paths",
    evidence: "callback · Dispose · reentry",
    color: "var(--danger)",
  },
  {
    label: "Nonexclusive Locking",
    contract: "capacity permits",
    evidence: "Semaphore · reader/writer",
    color: "var(--accent)",
  },
  {
    label: "Signaling with Event Wait Handles",
    contract: "bit vs permit",
    evidence: "Set · Reset · waiter",
    color: "var(--success)",
  },
  {
    label: "The Barrier Class",
    contract: "phase rendezvous",
    evidence: "participants · broken · exit",
    color: "var(--warning)",
  },
  {
    label: "Lazy Initialization",
    contract: "publication policy",
    evidence: "factory · cache · retry",
    color: "var(--danger)",
  },
  {
    label: "Thread-Local Storage",
    contract: "thread vs logical",
    evidence: "pool reuse · context",
    color: "var(--accent)",
  },
  {
    label: "Timers",
    contract: "callback lifecycle",
    evidence: "overlap · drain · dispose",
    color: "var(--success)",
  },
];

const CHAPTER_CONCEPTS =
  "Synchronization Overview; Exclusive Locking; Mutex; Locking and Thread Safety; Nonexclusive Locking; Signaling with Event Wait Handles; The Barrier Class; Lazy Initialization; Thread-Local Storage; Timers";

export function Ctc10AdvancedThreadingPrimitiveStateDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <svg
          viewBox="0 0 560 720"
          role="img"
          aria-label={`Advanced threading primitive state map. Formal nodes: ${CHAPTER_CONCEPTS}`}
          className="h-auto w-full"
        >
          <defs>
            <marker id="ctc10-21-arrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
              <path d="M0,0 L8,4 L0,8 z" fill="var(--text-secondary)" />
            </marker>
          </defs>
          <title>Advanced threading primitive state map</title>
          <text x="280" y="28" textAnchor="middle" fill="var(--text-primary)" fontSize="17" fontWeight="700">
            Pick a primitive by its state contract
          </text>
          <text x="280" y="51" textAnchor="middle" fill="var(--text-secondary)" fontSize="12">
            scope → owner or permit → signal or phase → shutdown
          </text>
          <rect x="80" y="76" width="400" height="58" rx="12" fill="var(--bg)" stroke="var(--border)" />
          <text x="280" y="101" textAnchor="middle" fill="var(--text-primary)" fontSize="13" fontWeight="700">
            Shared invariant
          </text>
          <text x="280" y="120" textAnchor="middle" fill="var(--text-secondary)" fontSize="11">
            state, ownership, waiting, and exit must agree
          </text>
          <path d="M280 134 L280 156" stroke="var(--text-secondary)" strokeWidth="1.5" markerEnd="url(#ctc10-21-arrow)" />

          {PRIMITIVE_NODES.map((node, index) => {
            const column = index % 2;
            const row = Math.floor(index / 2);
            const x = column === 0 ? 20 : 290;
            const y = 174 + row * 92;
            const centerX = x + 125;
            const parentX = row === 0 ? 280 : column === 0 ? 145 : 415;
            const parentY = row === 0 ? 156 : y - 18;

            return (
              <g key={node.label}>
                <path
                  d={`M${parentX} ${parentY} L${centerX} ${y}`}
                  stroke="var(--text-secondary)"
                  strokeWidth="1"
                  strokeDasharray={row === 0 ? undefined : "4 4"}
                  markerEnd="url(#ctc10-21-arrow)"
                />
                <rect x={x} y={y} width="250" height="72" rx="10" fill="var(--bg)" stroke={node.color} strokeWidth="1.5" />
                <circle cx={x + 18} cy={y + 18} r="6" fill={node.color} />
                <text x={x + 32} y={y + 22} fill="var(--text-primary)" fontSize="12" fontWeight="700">
                  {node.label}
                </text>
                <text x={x + 18} y={y + 45} fill="var(--text-secondary)" fontSize="11">
                  {node.contract}
                </text>
                <text x={x + 18} y={y + 61} fill="var(--text-secondary)" fontSize="11">
                  {node.evidence}
                </text>
              </g>
            );
          })}

          <path d="M20 646 H540" stroke="var(--border)" strokeWidth="1" strokeDasharray="5 5" />
          <text x="280" y="670" textAnchor="middle" fill="var(--text-primary)" fontSize="12" fontWeight="700">
            Evidence checkpoint
          </text>
          <text x="280" y="692" textAnchor="middle" fill="var(--text-secondary)" fontSize="11">
            explain the state transition, then prove the release and shutdown path
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-muted-foreground">
        图 21-1：先识别共享 invariant，再沿 owner、signal、phase 和 lifecycle 选择同步 primitive。
      </figcaption>
    </figure>
  );
}
