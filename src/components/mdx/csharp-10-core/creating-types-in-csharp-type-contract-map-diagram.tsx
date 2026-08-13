/**
 * C# type-kind contract map for Chapter 3.
 * Static SVG: it makes identity, copy, capability, and named-value choices
 * visible without pretending to be compiler output.
 */

type TypeKind = {
  label: string;
  contract: string;
  evidence: string;
  color: string;
};

const TYPE_KINDS: readonly TypeKind[] = [
  {
    label: "class",
    contract: "reference identity",
    evidence: "alias / lifetime / null",
    color: "var(--accent)",
  },
  {
    label: "struct",
    contract: "value semantics",
    evidence: "copy / default / boxing",
    color: "var(--success)",
  },
  {
    label: "interface",
    contract: "capability boundary",
    evidence: "dispatch / variance / ownership",
    color: "var(--warning)",
  },
  {
    label: "enum",
    contract: "named integral values",
    evidence: "zero / flags / unknown",
    color: "var(--danger)",
  },
];

const CHAPTER_CONCEPTS =
  "Classes; Inheritance; The object Type; Structs; Access Modifiers; Interfaces; Enums; Nested Types; Generics";

export function Ctc10CreatingTypesInCsharpTypeContractMapDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <svg
          viewBox="0 0 720 360"
          role="img"
          aria-label={`C# 类型选择契约图：class、struct、interface 和 enum 分别对应 identity、copy、capability 和 named values。正式节点：${CHAPTER_CONCEPTS}`}
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text
            x="360"
            y="28"
            textAnchor="middle"
            fontSize="17"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            Creating Types in C# · contract map
          </text>
          <text
            x="360"
            y="51"
            textAnchor="middle"
            fontSize="12"
            fill="var(--text-secondary)"
          >
            先固定可观察语义，再选择 type kind；最后用 tests 验收边界
          </text>

          <rect
            x="250"
            y="70"
            width="220"
            height="48"
            rx="10"
            fill="var(--bg)"
            stroke="var(--accent)"
            strokeWidth="1.5"
          />
          <text
            x="360"
            y="91"
            textAnchor="middle"
            fontSize="13"
            fontWeight="700"
            fill="var(--accent)"
          >
            type decision
          </text>
          <text
            x="360"
            y="108"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            identity · copy · capability · value set
          </text>

          {TYPE_KINDS.map((kind, index) => {
            const x = 24 + index * 174;
            const center = x + 82;
            return (
              <g key={kind.label}>
                <line
                  x1="360"
                  y1="118"
                  x2={center}
                  y2="150"
                  stroke={kind.color}
                  strokeWidth="1.5"
                  opacity="0.8"
                />
                <rect
                  x={x}
                  y="150"
                  width="164"
                  height="132"
                  rx="10"
                  fill="var(--bg)"
                  stroke={kind.color}
                  strokeWidth="1.5"
                />
                <circle cx={x + 20} cy="174" r="7" fill={kind.color} />
                <text
                  x={x + 36}
                  y="179"
                  fontSize="15"
                  fontWeight="700"
                  fill={kind.color}
                  fontFamily="monospace"
                >
                  {kind.label}
                </text>
                <text
                  x={x + 16}
                  y="211"
                  fontSize="12"
                  fontWeight="600"
                  fill="var(--text-primary)"
                >
                  {kind.contract}
                </text>
                <text
                  x={x + 16}
                  y="239"
                  fontSize="11"
                  fill="var(--text-secondary)"
                >
                  evidence
                </text>
                <text
                  x={x + 16}
                  y="258"
                  fontSize="11"
                  fill="var(--text-primary)"
                >
                  {kind.evidence}
                </text>
              </g>
            );
          })}

          <line
            x1="24"
            y1="310"
            x2="696"
            y2="310"
            stroke="var(--border)"
            strokeDasharray="5 4"
          />
          <text
            x="360"
            y="335"
            textAnchor="middle"
            fontSize="12"
            fill="var(--text-secondary)"
          >
            construction · dispatch · serialization · evolution
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        四种常见 C# 类型形态的可观察契约与验收证据；覆盖 {CHAPTER_CONCEPTS}。
      </figcaption>
    </figure>
  );
}
