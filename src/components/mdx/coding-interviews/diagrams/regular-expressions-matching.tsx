"use client";

const cases = [
  {
    label: "空串边界",
    fields: [["空串 / 空模式", "true"], ["空串 / .*", "true"], ["空串 / .", "false"], ["空串 / c*", "true"]],
  },
  {
    label: "单字符",
    fields: [["a / .*", "true"], ["a / a.", "false"], ["a / 空模式", "false"], ["a / ab*", "true"]],
  },
  {
    label: "星号组合",
    fields: [["aaa / aa*", "true"], ["aaa / a*a", "true"], ["aaa / ab*a", "false"], ["aab / c*a*b", "true"]],
  },
  {
    label: "压力分支",
    fields: [["aaca / ab*a*c*a", "true"], ["aaba / ab*a*c*a", "false"], ["bbbba / .*a*a", "true"], ["bcbbabab / .*a*a", "false"]],
  },
] as const;

export function RegexTokenSemanticsDiagram() {
  const rows = [
    { token: "a", meaning: "恰好一个a", examples: ["a ✓", "b ×", "空 ×"], tone: "var(--accent)" },
    { token: ".", meaning: "任意一个字符", examples: ["a ✓", "7 ✓", "空 ×"], tone: "var(--success)" },
    { token: "a*", meaning: "零个或多个a", examples: ["空 ✓", "a ✓", "aaa ✓"], tone: "var(--warning)" },
  ] as const;
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden border border-border bg-elevated p-4 sm:p-5">
        <svg viewBox="0 0 840 330" role="img" aria-label="普通字符、点号和星号组合的正则匹配语义对照。" className="mx-auto block h-auto w-full max-w-[840px]">
          <text x="420" y="34" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">模式只含普通字符、点号和星号</text>
          {rows.map((row, index) => {
            const y = 66 + index * 82;
            return <g key={row.token}>
              <rect x="36" y={y} width="768" height="64" rx="5" fill={row.tone} fillOpacity="0.06" stroke="var(--border)" />
              <rect x="56" y={y + 12} width="72" height="40" rx="4" fill={row.tone} fillOpacity="0.14" stroke={row.tone} />
              <text x="92" y={y + 38} textAnchor="middle" fontSize="17" fontWeight="700" fill="var(--text-primary)">{row.token}</text>
              <text x="164" y={y + 37} fontSize="13" fontWeight="700" fill="var(--text-primary)">{row.meaning}</text>
              {row.examples.map((item, itemIndex) => <text key={item} x={454 + itemIndex * 108} y={y + 37} fontSize="12" fill="var(--text-secondary)">{item}</text>)}
            </g>;
          })}
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">点号消费一个字符；星号修饰前一项，并允许它出现零次。</figcaption>
    </figure>
  );
}

export function StarBranchDecisionMap() {
  const rows = [
    ["消费一次并越过x*", "str + 1, pattern + 2", "把当前字符视为该段最后一次"],
    ["消费一次并保留x*", "str + 1, pattern", "继续允许同一前导项匹配更多字符"],
    ["跳过整个x*", "str, pattern + 2", "让前导项出现零次"],
  ] as const;
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-x-auto border border-border bg-elevated p-4 sm:p-5">
        <table className="w-full min-w-[760px] border-collapse text-left text-sm">
          <thead><tr className="border-b border-border">{["作者分支", "下一个状态", "语义"].map((item) => <th key={item} className="p-3 text-primary">{item}</th>)}</tr></thead>
          <tbody>{rows.map((row) => <tr key={row[0]} className="border-b border-border last:border-0">{row.map((cell, index) => <td key={cell} className={"p-3 " + (index === 1 ? "font-semibold text-accent" : "text-secondary")}>{cell}</td>)}</tr>)}</tbody>
        </table>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">当前字符与星号前导项匹配时，作者源码显式枚举三种递归分支。</figcaption>
    </figure>
  );
}

export function RegexStateProgressDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden border border-border bg-elevated p-4 sm:p-5">
        <svg viewBox="0 0 860 390" role="img" aria-label="字符串aab与模式c*a*b的匹配状态推进图。" className="mx-auto block h-auto w-full max-w-[860px]">
          <defs><marker id="regex-state-arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 Z" fill="var(--accent)" /></marker></defs>
          <text x="430" y="34" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">aab 与 c*a*b：先跳过，再消费</text>
          {[
            ["(aab, c*a*b)", 64, 86, "c*取零次"],
            ["(aab, a*b)", 318, 86, "a*消费a"],
            ["(ab, a*b)", 572, 86, "a*消费a"],
            ["(b, a*b)", 572, 238, "a*取零次"],
            ["(b, b)", 318, 238, "普通字符"],
            ["(空, 空)", 64, 238, "成功"],
          ].map(([label, x, y, note], index) => <g key={String(label)}>
            <rect x={Number(x)} y={Number(y)} width="204" height="74" rx="5" fill={index === 5 ? "var(--success)" : "var(--bg)"} fillOpacity={index === 5 ? 0.1 : 1} stroke={index === 5 ? "var(--success)" : "var(--border)"} />
            <text x={Number(x) + 102} y={Number(y) + 30} textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">{label}</text>
            <text x={Number(x) + 102} y={Number(y) + 53} textAnchor="middle" fontSize="11" fill="var(--text-secondary)">{note}</text>
          </g>)}
          <path d="M268 123 H310" stroke="var(--accent)" strokeWidth="2" markerEnd="url(#regex-state-arrow)" />
          <path d="M522 123 H564" stroke="var(--accent)" strokeWidth="2" markerEnd="url(#regex-state-arrow)" />
          <path d="M674 160 V230" stroke="var(--accent)" strokeWidth="2" markerEnd="url(#regex-state-arrow)" />
          <path d="M572 275 H530" stroke="var(--accent)" strokeWidth="2" markerEnd="url(#regex-state-arrow)" />
          <path d="M318 275 H276" stroke="var(--accent)" strokeWidth="2" markerEnd="url(#regex-state-arrow)" />
          <rect x="180" y="342" width="500" height="34" rx="4" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" />
          <text x="430" y="364" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--text-primary)">每条边至少缩短字符串或模式，递归最终到达边界</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">状态由两个后缀位置唯一确定，适合用二维备忘录消除重复搜索。</figcaption>
    </figure>
  );
}
