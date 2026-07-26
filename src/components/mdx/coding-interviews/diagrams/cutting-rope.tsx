"use client";

import { CodingInterviewLab } from "./official-lab";

const cases = [
  {
    label: "长度2/3",
    fields: [["必须剪", "至少分成两段"], ["n=2", "1×1=1"], ["n=3", "1×2=2"], ["注意", "DP子段可保留2或3"]],
  },
  {
    label: "长度8",
    fields: [["候选", "2+3+3"], ["乘积", "2×3×3=18"], ["余数", "8 mod 3 = 2"], ["结论", "两个3加一个2"]],
  },
  {
    label: "余数1",
    fields: [["示例", "n=10"], ["错误", "3+3+3+1"], ["替换", "3+3+2+2"], ["乘积", "36而不是27"]],
  },
  {
    label: "长度50",
    fields: [["分解", "16个3加1个2"], ["乘积", "3^16×2"], ["结果", "86093442"], ["风险", "更大n需检查溢出"]],
  },
] as const;

export function RopePartitionDiagram() {
  const parts = [
    { label: "2", x: 94, width: 150, color: "var(--accent)" },
    { label: "3", x: 244, width: 225, color: "var(--success)" },
    { label: "3", x: 469, width: 225, color: "var(--success)" },
  ] as const;
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden border border-border bg-elevated p-4 sm:p-5">
        <svg viewBox="0 0 820 300" role="img" aria-label="长度8的绳子剪成2、3、3三段，乘积为18。" className="mx-auto block h-auto w-full max-w-[820px]">
          <text x="410" y="30" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">长度8的最优切分：2 + 3 + 3</text>
          {parts.map((part, index) => <g key={index}><rect x={part.x} y="92" width={part.width} height="72" fill={part.color} fillOpacity="0.1" stroke={part.color} strokeWidth="2" /><text x={part.x + part.width/2} y="134" textAnchor="middle" fontSize="20" fontWeight="700" fill="var(--text-primary)">{part.label}</text></g>)}
          <line x1="244" y1="78" x2="244" y2="180" stroke="var(--warning)" strokeWidth="3" />
          <line x1="469" y1="78" x2="469" y2="180" stroke="var(--warning)" strokeWidth="3" />
          <text x="410" y="218" textAnchor="middle" fontSize="18" fontWeight="700" fill="var(--accent)">2 × 3 × 3 = 18</text>
          <rect x="172" y="248" width="476" height="30" rx="5" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" />
          <text x="410" y="268" textAnchor="middle" fontSize="11" fill="var(--text-primary)">段数由算法决定，但必须至少有一次切分。</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">相同总长度下，因子接近自然常数时乘积更大；整数最优集中在2和3。</figcaption>
    </figure>
  );
}

export function RopeDpStateMap() {
  const rows = [
    ["2", "1+1", "1", "整根答案必须剪"],
    ["3", "1+2", "2", "整根答案必须剪"],
    ["4", "2+2", "4", "products[2]×products[2]"],
    ["5", "2+3", "6", "products[2]×products[3]"],
    ["6", "3+3", "9", "优于2+2+2"],
    ["8", "2+3+3", "18", "由更小最优子问题组合"],
  ] as const;
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-x-auto border border-border bg-elevated p-4 sm:p-5">
        <table className="w-full min-w-[680px] border-collapse text-left text-sm">
          <thead><tr className="border-b border-border">{["长度", "最优切分", "最大乘积", "状态含义"].map((item) => <th key={item} className="p-3 text-primary">{item}</th>)}</tr></thead>
          <tbody>{rows.map((row) => <tr key={row[0]} className="border-b border-border last:border-0">{row.map((cell, index) => <td key={cell} className={"p-3 " + (index === 2 ? "font-semibold text-accent" : "text-secondary")}>{cell}</td>)}</tr>)}</tbody>
        </table>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">DP表中的2和3表示“作为子段可不再切”，与整根输入的答案不同。</figcaption>
    </figure>
  );
}

export function GreedyRemainderDiagram() {
  const rows = [
    ["n mod 3 = 0", "全部切3", "3 + 3 + ... + 3", "3^a"],
    ["n mod 3 = 1", "少切一个3", "3 + ... + 3 + 2 + 2", "3^(a-1)×4"],
    ["n mod 3 = 2", "最后保留2", "3 + ... + 3 + 2", "3^a×2"],
  ] as const;
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-x-auto border border-border bg-elevated p-4 sm:p-5">
        <table className="w-full min-w-[740px] border-collapse text-left text-sm">
          <thead><tr className="border-b border-border">{["余数", "动作", "整数分解", "乘积形式"].map((item) => <th key={item} className="p-3 text-primary">{item}</th>)}</tr></thead>
          <tbody>{rows.map((row) => <tr key={row[0]} className="border-b border-border last:border-0">{row.map((cell, index) => <td key={cell} className={"p-3 " + (index === 1 ? "font-semibold text-accent" : "text-secondary")}>{cell}</td>)}</tr>)}</tbody>
        </table>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">余数1不能单独留下，3+1必须改成2+2。</figcaption>
    </figure>
  );
}

export function CuttingRopeMethodLab() {
  return <CodingInterviewLab cases={cases} caption="切换小长度、余数分支与作者大输入，核对动态规划和贪心结果。" />;
}
