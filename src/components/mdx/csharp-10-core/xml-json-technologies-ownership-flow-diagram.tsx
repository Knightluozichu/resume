/**
 * Chapter 11 XML/JSON ownership flow.
 * Static SVG: it ties each representation to the cursor, buffer, tree, and
 * publication contract that the surrounding prose asks the reader to test.
 */

type FormatNode = {
  label: string;
  contract: string;
  owner: string;
  color: string;
};

const FORMAT_NODES: readonly FormatNode[] = [
  {
    label: "XmlReader",
    contract: "forward cursor",
    owner: "input · depth · subtree",
    color: "var(--accent)",
  },
  {
    label: "XmlWriter",
    contract: "balanced output",
    owner: "encoding · temp artifact",
    color: "var(--success)",
  },
  {
    label: "Utf8JsonReader",
    contract: "token + state",
    owner: "span · sequence · buffer",
    color: "var(--warning)",
  },
  {
    label: "Utf8JsonWriter",
    contract: "validated tokens",
    owner: "IBufferWriter · flush",
    color: "var(--danger)",
  },
  {
    label: "JsonDocument",
    contract: "read-only view",
    owner: "document · Clone",
    color: "var(--accent)",
  },
  {
    label: "JsonNode",
    contract: "mutable tree",
    owner: "parent · mutation",
    color: "var(--success)",
  },
  {
    label: "Hierarchical Data",
    contract: "depth + schema",
    owner: "unknown · limits",
    color: "var(--warning)",
  },
  {
    label: "Working with JSON",
    contract: "model choice",
    owner: "typed · stream · DOM",
    color: "var(--danger)",
  },
];

const CHAPTER_CONCEPTS =
  "XmlReader; XmlWriter; Working with Hierarchical Data; Working with JSON; Utf8JsonReader; Utf8JsonWriter; JsonDocument; JsonNode";

export function Ctc10XmlJsonOwnershipFlowDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <svg
          viewBox="0 0 560 650"
          role="img"
          aria-label={`XML and JSON ownership flow: choose a cursor, buffer, or tree model, then keep its owner alive until publication is complete. Formal nodes: ${CHAPTER_CONCEPTS}`}
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
            XML / JSON · representation follows ownership
          </text>
          <text
            x="280"
            y="51"
            textAnchor="middle"
            fontSize="12"
            fill="var(--text-secondary)"
          >
            cursor · buffer · tree → lifetime · limits · publish gate
          </text>

          <rect
            x="120"
            y="72"
            width="320"
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
            consumer contract
          </text>
          <text
            x="280"
            y="115"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            token · depth · buffer · tree · schema · partial output
          </text>

          {FORMAT_NODES.map((node, index) => {
            const column = index % 2;
            const row = Math.floor(index / 2);
            const x = 20 + column * 270;
            const y = 155 + row * 108;
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
                  height="88"
                  rx="10"
                  fill="var(--bg)"
                  stroke={node.color}
                  strokeWidth="1.5"
                />
                <circle cx={x + 19} cy={y + 23} r="7" fill={node.color} />
                <text
                  x={x + 34}
                  y={y + 27}
                  fontSize="12"
                  fontWeight="700"
                  fill={node.color}
                  fontFamily="monospace"
                >
                  {node.label}
                </text>
                <text
                  x={x + 16}
                  y={y + 55}
                  fontSize="12"
                  fontWeight="600"
                  fill="var(--text-primary)"
                >
                  {node.contract}
                </text>
                <text
                  x={x + 16}
                  y={y + 74}
                  fontSize="11"
                  fill="var(--text-secondary)"
                >
                  owner: {node.owner}
                </text>
              </g>
            );
          })}

          <line
            x1="24"
            y1="604"
            x2="536"
            y2="604"
            stroke="var(--border)"
            strokeDasharray="5 4"
          />
          <text
            x="280"
            y="625"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            keep owner alive · enforce limits · publish only complete artifacts
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        XML/JSON API 的选择必须同时回答状态、buffer/tree 所有权与半成品发布问题；覆盖 {CHAPTER_CONCEPTS}。
      </figcaption>
    </figure>
  );
}
