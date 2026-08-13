/**
 * Chapter 7 collection capability map.
 * Static SVG: it makes interface strength, mutation ownership, and
 * collection semantics visible before a concrete data structure is chosen.
 */

type CollectionNode = {
  label: string;
  capability: string;
  invariant: string;
  color: string;
};

const COLLECTION_NODES: readonly CollectionNode[] = [
  {
    label: "IEnumerable<T>",
    capability: "iterate",
    invariant: "deferred · repeat?",
    color: "var(--accent)",
  },
  {
    label: "ICollection<T>",
    capability: "count + mutate",
    invariant: "ownership · capacity",
    color: "var(--success)",
  },
  {
    label: "IList<T>",
    capability: "index + order",
    invariant: "duplicates · O(n)",
    color: "var(--warning)",
  },
  {
    label: "Dictionary<TKey,TValue>",
    capability: "key lookup",
    invariant: "hash · equality",
    color: "var(--danger)",
  },
];

const CHAPTER_CONCEPTS =
  "Enumeration; The ICollection and IList Interfaces; The Array Class; Lists, Queues, Stacks, and Sets; Dictionaries; Customizable Collections and Proxies; Immutable Collections; Plugging in Equality and Order";

export function Ctc10CollectionsCapabilityFlowDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <svg
          viewBox="0 0 560 520"
          role="img"
          aria-label={`C# collection capability map: choose the narrowest interface, then verify ownership, order, equality, and snapshot behavior. Formal nodes: ${CHAPTER_CONCEPTS}`}
          className="mx-auto block h-auto w-full max-w-[760px]"
        >
          <text
            x="280"
            y="28"
            textAnchor="middle"
            fontSize="17"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            Collections · capability before concrete type
          </text>
          <text
            x="280"
            y="51"
            textAnchor="middle"
            fontSize="12"
            fill="var(--text-secondary)"
          >
            interface strength narrows the API; the workload selects the storage
          </text>

          <rect
            x="122"
            y="72"
            width="316"
            height="54"
            rx="10"
            fill="var(--bg)"
            stroke="var(--accent)"
            strokeWidth="1.5"
          />
          <text
            x="280"
            y="95"
            textAnchor="middle"
            fontSize="13"
            fontWeight="700"
            fill="var(--accent)"
          >
            API contract
          </text>
          <text
            x="280"
            y="113"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            iteration · count · index · mutation · snapshot
          </text>

          {COLLECTION_NODES.map((node, index) => {
            const column = index % 2;
            const row = Math.floor(index / 2);
            const x = 20 + column * 270;
            const y = 158 + row * 154;
            const center = x + 125;
            return (
              <g key={node.label}>
                <line
                  x1="280"
                  y1="126"
                  x2={center}
                  y2={y}
                  stroke={node.color}
                  strokeWidth="1.5"
                  opacity="0.8"
                />
                <rect
                  x={x}
                  y={y}
                  width="250"
                  height="120"
                  rx="10"
                  fill="var(--bg)"
                  stroke={node.color}
                  strokeWidth="1.5"
                />
                <circle cx={x + 19} cy={y + 24} r="7" fill={node.color} />
                <text
                  x={x + 34}
                  y={y + 28}
                  fontSize="12"
                  fontWeight="700"
                  fill={node.color}
                  fontFamily="monospace"
                >
                  {node.label}
                </text>
                <text
                  x={x + 16}
                  y={y + 66}
                  fontSize="12"
                  fontWeight="600"
                  fill="var(--text-primary)"
                >
                  {node.capability}
                </text>
                <text
                  x={x + 16}
                  y={y + 88}
                  fontSize="11"
                  fill="var(--text-secondary)"
                >
                  verify invariant
                </text>
                <text
                  x={x + 16}
                  y={y + 106}
                  fontSize="11"
                  fill="var(--text-primary)"
                >
                  {node.invariant}
                </text>
              </g>
            );
          })}

          <line
            x1="24"
            y1="454"
            x2="536"
            y2="454"
            stroke="var(--border)"
            strokeDasharray="5 4"
          />
          <text
            x="280"
            y="476"
            textAnchor="middle"
            fontSize="12"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            workload: N · lookup/insert/remove · order · memory · threads
          </text>
          <text
            x="280"
            y="494"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            arrays/lists · queues/stacks · sets · dictionaries · immutable versions
          </text>
          <text
            x="280"
            y="512"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            prove count, order, equality, ownership, and publication—not only Big-O
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        先约束 capability，再按 workload 选择结构；覆盖 {CHAPTER_CONCEPTS}。
      </figcaption>
    </figure>
  );
}
