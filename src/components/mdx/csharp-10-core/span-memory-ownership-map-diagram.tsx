/**
 * Chapter 23 storage ownership and lifetime map.
 *
 * The static map makes the central distinction visible: Span/Memory describe
 * storage, while an owner contract determines whether a view is still valid.
 */
type MemoryNode = {
  label: string;
  contract: string;
  evidence: string;
  color: string;
};

const MEMORY_NODES: readonly MemoryNode[] = [
  {
    label: "Spans and Slicing",
    contract: "ref-like view",
    evidence: "offset · length · escape",
    color: "var(--accent)",
  },
  {
    label: "CopyTo and TryCopyTo",
    contract: "alias or copy",
    evidence: "overlap · capacity · failure",
    color: "var(--success)",
  },
  {
    label: "Working with Text",
    contract: "parse without substring",
    evidence: "culture · UTF-8 · scalar",
    color: "var(--warning)",
  },
  {
    label: "Memory<T>",
    contract: "async descriptor",
    evidence: "owner · lease · await",
    color: "var(--danger)",
  },
  {
    label: "Forward-Only Enumerators",
    contract: "ref cursor",
    evidence: "MoveNext · segment · state",
    color: "var(--accent)",
  },
  {
    label: "Stack / Pinned / Native",
    contract: "manual lifetime",
    evidence: "size · pin · free once",
    color: "var(--danger)",
  },
];

const CHAPTER_CONCEPTS =
  "Spans and Slicing; CopyTo and TryCopyTo; Working with Text; Memory<T>; Forward-Only Enumerators; Working with Stack-Allocated and Unmanaged Memory";

export function Ctc10SpanMemoryOwnershipMapDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <svg
          viewBox="0 0 560 600"
          role="img"
          aria-label={`Span and Memory ownership and lifetime map. Formal nodes: ${CHAPTER_CONCEPTS}`}
          className="mx-auto block h-auto w-full max-w-[760px]"
        >
          <defs>
            <marker id="ctc10-23-arrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
              <path d="M0,0 L8,4 L0,8 z" fill="var(--text-secondary)" />
            </marker>
          </defs>
          <title>Span and Memory ownership and lifetime map</title>
          <text x="280" y="28" textAnchor="middle" fill="var(--text-primary)" fontSize="17" fontWeight="700">
            A view is fast because it does not own storage
          </text>
          <text x="280" y="51" textAnchor="middle" fill="var(--text-secondary)" fontSize="12">
            storage owner → view shape → lifetime boundary → cleanup
          </text>

          <rect x="80" y="72" width="400" height="58" rx="12" fill="var(--bg)" stroke="var(--accent)" strokeWidth="1.5" />
          <text x="280" y="97" textAnchor="middle" fill="var(--accent)" fontSize="13" fontWeight="700">
            Owner contract
          </text>
          <text x="280" y="116" textAnchor="middle" fill="var(--text-secondary)" fontSize="11">
            storage · length · mutability · validity · release
          </text>

          {MEMORY_NODES.map((node, index) => {
            const column = index % 2;
            const row = Math.floor(index / 2);
            const x = column === 0 ? 20 : 290;
            const y = 154 + row * 100;
            const centerX = x + 125;
            const parentX = centerX;
            const parentY = row === 0 ? 130 : y - 22;

            return (
              <g key={node.label}>
                <path
                  d={`M${parentX} ${parentY} L${centerX} ${y}`}
                  stroke="var(--text-secondary)"
                  strokeWidth="1"
                  strokeDasharray={row === 0 ? undefined : "4 4"}
                  markerEnd="url(#ctc10-23-arrow)"
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

          <path d="M20 472 H540" stroke="var(--border)" strokeWidth="1" strokeDasharray="5 5" />
          <text x="280" y="496" textAnchor="middle" fill="var(--text-primary)" fontSize="12" fontWeight="700">
            Lifetime checkpoint
          </text>
          <text x="280" y="517" textAnchor="middle" fill="var(--text-secondary)" fontSize="11">
            no view may outlive its owner, lease, pin, stack frame, or native allocation
          </text>
          <text x="280" y="537" textAnchor="middle" fill="var(--text-secondary)" fontSize="11">
            choose alias vs copy explicitly; test boundaries, overlap, await, and cleanup
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        图 23-1：Span/Memory 只描述连续存储；正确性来自 owner、lifetime、alias 和 cleanup 契约。
      </figcaption>
    </figure>
  );
}
