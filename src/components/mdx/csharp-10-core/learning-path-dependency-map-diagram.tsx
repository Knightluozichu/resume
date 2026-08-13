/**
 * C# 10 in a Nutshell learning-map dependency visual.
 *
 * The six route cards turn the official 25-chapter outline into a path with
 * explicit prerequisites and evidence artifacts.
 */
type LearningRoute = {
  label: string;
  chapters: string;
  contract: string;
  evidence: string;
  color: string;
};

const LEARNING_ROUTES: readonly LearningRoute[] = [
  {
    label: "Language",
    chapters: "Chapters 1–4",
    contract: "type · dispatch · exception",
    evidence: "type table + prediction",
    color: "var(--accent)",
  },
  {
    label: ".NET & Data",
    chapters: "Chapters 5–11",
    contract: "value · equality · schema",
    evidence: "query + serialization trace",
    color: "var(--success)",
  },
  {
    label: "Runtime Services",
    chapters: "Chapters 12–17",
    contract: "owner · completion · fault",
    evidence: "lifetime timeline + test",
    color: "var(--warning)",
  },
  {
    label: "Metadata & Dynamic",
    chapters: "Chapters 18–20",
    contract: "identity · version · allowlist",
    evidence: "late-binding safety envelope",
    color: "var(--danger)",
  },
  {
    label: "Concurrency & Low-level",
    chapters: "Chapters 21–24",
    contract: "thread · memory · ABI",
    evidence: "owner graph + boundary test",
    color: "var(--accent)",
  },
  {
    label: "Text",
    chapters: "Chapter 25",
    contract: "language · budget · output",
    evidence: "near-miss corpus + timeout",
    color: "var(--success)",
  },
];

const BOOK_OUTLINE =
  "C# 10 in a Nutshell official 25-chapter spine: Language 1-4, .NET and Data 5-11, Runtime Services 12-17, Metadata and Dynamic 18-20, Concurrency and Low-level 21-24, Text 25";

export function Ctc10LearningPathDependencyMapDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <svg
          viewBox="0 0 560 620"
          role="img"
          aria-label={`C# 10 learning path dependency map. ${BOOK_OUTLINE}`}
          className="mx-auto block h-auto w-full max-w-[760px]"
        >
          <defs>
            <marker id="ctc10-learning-map-arrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
              <path d="M0,0 L8,4 L0,8 z" fill="var(--text-secondary)" />
            </marker>
          </defs>
          <title>C# 10 learning path dependency map</title>
          <text x="280" y="28" textAnchor="middle" fill="var(--text-primary)" fontSize="17" fontWeight="700">
            Learn the official spine as dependent contracts
          </text>
          <text x="280" y="51" textAnchor="middle" fill="var(--text-secondary)" fontSize="12">
            prerequisite model → route contract → evidence artifact → transfer
          </text>

          <rect x="80" y="72" width="400" height="58" rx="12" fill="var(--bg)" stroke="var(--accent)" strokeWidth="1.5" />
          <text x="280" y="97" textAnchor="middle" fill="var(--accent)" fontSize="13" fontWeight="700">
            Official 25-chapter spine
          </text>
          <text x="280" y="116" textAnchor="middle" fill="var(--text-secondary)" fontSize="11">
            do not skip the model needed by the next boundary
          </text>

          {LEARNING_ROUTES.map((route, index) => {
            const column = index % 2;
            const row = Math.floor(index / 2);
            const x = column === 0 ? 20 : 290;
            const y = 154 + row * 132;
            const centerX = x + 125;
            const parentY = row === 0 ? 130 : y - 28;

            return (
              <g key={route.label}>
                <path
                  d={`M${centerX} ${parentY} L${centerX} ${y}`}
                  stroke="var(--text-secondary)"
                  strokeWidth="1"
                  strokeDasharray={row === 0 ? undefined : "4 4"}
                  markerEnd="url(#ctc10-learning-map-arrow)"
                />
                <rect x={x} y={y} width="250" height="104" rx="10" fill="var(--bg)" stroke={route.color} strokeWidth="1.5" />
                <circle cx={x + 18} cy={y + 19} r="6" fill={route.color} />
                <text x={x + 32} y={y + 23} fill={route.color} fontSize="13" fontWeight="700">
                  {route.label}
                </text>
                <text x={x + 18} y={y + 46} fill="var(--text-secondary)" fontSize="11">
                  {route.chapters}
                </text>
                <text x={x + 18} y={y + 67} fill="var(--text-primary)" fontSize="11" fontWeight="600">
                  {route.contract}
                </text>
                <text x={x + 18} y={y + 86} fill="var(--text-secondary)" fontSize="11">
                  {route.evidence}
                </text>
              </g>
            );
          })}

          <path d="M20 554 H540" stroke="var(--border)" strokeWidth="1" strokeDasharray="5 5" />
          <text x="280" y="578" textAnchor="middle" fill="var(--text-primary)" fontSize="12" fontWeight="700">
            Transfer checkpoint
          </text>
          <text x="280" y="599" textAnchor="middle" fill="var(--text-secondary)" fontSize="11">
            every route ends with a reusable contract, counterexample, and evidence artifact
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        图 00-1：按官方目录建立依赖路径；每段路线都用 contract 和 evidence artifact 验收迁移能力。
      </figcaption>
    </figure>
  );
}
