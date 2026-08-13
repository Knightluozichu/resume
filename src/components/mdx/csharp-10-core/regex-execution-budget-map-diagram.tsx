/**
 * Chapter 25 regex language and execution-budget map.
 *
 * The visual connects syntax choices to the operational contract: input
 * limits, match semantics, captures, and a bounded failure path.
 */
type RegexNode = {
  label: string;
  contract: string;
  evidence: string;
  color: string;
};

const REGEX_NODES: readonly RegexNode[] = [
  {
    label: "Regex Basics",
    contract: "language shape",
    evidence: "literal · class · group",
    color: "var(--accent)",
  },
  {
    label: "Compiled Regex",
    contract: "reuse vs startup",
    evidence: "cache · JIT · semantics",
    color: "var(--success)",
  },
  {
    label: "RegexOptions",
    contract: "global behavior",
    evidence: "culture · line · engine",
    color: "var(--warning)",
  },
  {
    label: "Character Escapes",
    contract: "two string syntaxes",
    evidence: "pattern · replacement · literal",
    color: "var(--danger)",
  },
  {
    label: "Character Sets",
    contract: "one code point",
    evidence: "range · negation · Unicode",
    color: "var(--accent)",
  },
  {
    label: "Quantifiers",
    contract: "bounded repetition",
    evidence: "min · max · ambiguity",
    color: "var(--success)",
  },
  {
    label: "Greedy vs Lazy",
    contract: "consumption order",
    evidence: "backtrack · atomic · suffix",
    color: "var(--warning)",
  },
  {
    label: "Zero-Width Assertions",
    contract: "check, do not consume",
    evidence: "boundary · lookaround · cost",
    color: "var(--danger)",
  },
  {
    label: "Lookahead / Lookbehind",
    contract: "left/right context",
    evidence: "positive · negative · edge",
    color: "var(--accent)",
  },
  {
    label: "Anchors",
    contract: "whole-input boundary",
    evidence: "\\A · \\z · \\G",
    color: "var(--success)",
  },
  {
    label: "Groups",
    contract: "capture output",
    evidence: "name · history · backref",
    color: "var(--warning)",
  },
  {
    label: "Replace / Split",
    contract: "output contract",
    evidence: "empty · delimiter · cap",
    color: "var(--danger)",
  },
  {
    label: "Regex Recipes",
    contract: "owned production pattern",
    evidence: "corpus · timeout · budget",
    color: "var(--accent)",
  },
];

const CHAPTER_CONCEPTS =
  "Regular Expression Basics; Compiled Regular Expressions; RegexOptions; Character Escapes; Character Sets; Quantifiers; Greedy Versus Lazy Quantifiers; Zero-Width Assertions; Lookahead and Lookbehind; Anchors; Groups; Replacing and Splitting Text; Regular Expressions Recipes";

export function Ctc10RegexExecutionBudgetMapDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <svg
          viewBox="0 0 560 840"
          role="img"
          aria-label={`Regular expressions language and execution budget map. Formal nodes: ${CHAPTER_CONCEPTS}`}
          className="mx-auto block h-auto w-full max-w-[760px]"
        >
          <defs>
            <marker id="ctc10-25-arrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
              <path d="M0,0 L8,4 L0,8 z" fill="var(--text-secondary)" />
            </marker>
          </defs>
          <title>Regular expressions language and execution budget map</title>
          <text x="280" y="28" textAnchor="middle" fill="var(--text-primary)" fontSize="17" fontWeight="700">
            A regex is a language program with a deadline
          </text>
          <text x="280" y="51" textAnchor="middle" fill="var(--text-secondary)" fontSize="12">
            syntax → search states → captures/output → timeout and input budget
          </text>

          <rect x="80" y="72" width="400" height="58" rx="12" fill="var(--bg)" stroke="var(--accent)" strokeWidth="1.5" />
          <text x="280" y="97" textAnchor="middle" fill="var(--accent)" fontSize="13" fontWeight="700">
            Execution contract
          </text>
          <text x="280" y="116" textAnchor="middle" fill="var(--text-secondary)" fontSize="11">
            trusted pattern · bounded input · timeout · classified failure
          </text>

          {REGEX_NODES.map((node, index) => {
            const column = index % 2;
            const row = Math.floor(index / 2);
            const x = column === 0 ? 20 : 290;
            const y = 152 + row * 84;
            const centerX = x + 125;
            const parentY = row === 0 ? 130 : y - 16;

            return (
              <g key={node.label}>
                <path
                  d={`M${centerX} ${parentY} L${centerX} ${y}`}
                  stroke="var(--text-secondary)"
                  strokeWidth="1"
                  strokeDasharray={row === 0 ? undefined : "4 4"}
                  markerEnd="url(#ctc10-25-arrow)"
                />
                <rect x={x} y={y} width="250" height="68" rx="10" fill="var(--bg)" stroke={node.color} strokeWidth="1.5" />
                <circle cx={x + 18} cy={y + 17} r="6" fill={node.color} />
                <text x={x + 32} y={y + 21} fill={node.color} fontSize="12" fontWeight="700">
                  {node.label}
                </text>
                <text x={x + 18} y={y + 42} fill="var(--text-primary)" fontSize="11" fontWeight="600">
                  {node.contract}
                </text>
                <text x={x + 18} y={y + 58} fill="var(--text-secondary)" fontSize="11">
                  {node.evidence}
                </text>
              </g>
            );
          })}

          <path d="M20 748 H540" stroke="var(--border)" strokeWidth="1" strokeDasharray="5 5" />
          <text x="280" y="773" textAnchor="middle" fill="var(--text-primary)" fontSize="12" fontWeight="700">
            Adversarial checkpoint
          </text>
          <text x="280" y="794" textAnchor="middle" fill="var(--text-secondary)" fontSize="11">
            test valid, invalid, near-miss, empty, Unicode, and length-doubling inputs
          </text>
          <text x="280" y="814" textAnchor="middle" fill="var(--text-secondary)" fontSize="11">
            prove captures and output limits before shipping a pattern
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        图 25-1：正则表达式既定义语言，也定义回溯状态、输出语义和必须受控的执行预算。
      </figcaption>
    </figure>
  );
}
