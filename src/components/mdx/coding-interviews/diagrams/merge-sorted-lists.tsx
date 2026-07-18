"use client";

import { CodingInterviewLab } from "./official-lab";

const cases = [
  {
    label: "交错链表",
    fields: [["list1", "1→3→5"], ["list2", "2→4→6"], ["选择序列", "1,2,3,4,5,6"], ["结果", "升序"]],
  },
  {
    label: "重复值",
    fields: [["list1", "1a→3a→5a"], ["list2", "1b→3b→5b"], ["相等策略", "作者先取list2"], ["结果值", "1,1,3,3,5,5"]],
  },
  {
    label: "单节点",
    fields: [["list1", "1"], ["list2", "2"], ["新头", "节点1"], ["尾", "节点2"]],
  },
  {
    label: "单侧为空",
    fields: [["list1", "1→3→5"], ["list2", "空"], ["递归基", "直接返回list1"], ["重连", "无需继续比较"]],
  },
  {
    label: "双侧为空",
    fields: [["list1", "空"], ["list2", "空"], ["返回", "空"], ["节点数", "0"]],
  },
] as const;

export function MergeHeadChoiceDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden border border-border bg-elevated p-4 sm:p-5">
        <svg viewBox="0 0 860 390" role="img" aria-label="比较两个有序链表头1和2，选择1作为合并头，再递归合并剩余链。" className="mx-auto block h-auto w-full max-w-[860px]">
          <defs><marker id="merge-head-arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 Z" fill="var(--accent)" /></marker></defs>
          <text x="430" y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">每次只需比较两个未合并头节点</text>
          <text x="60" y="102" fontSize="12" fontWeight="700" fill="var(--text-secondary)">list1</text>
          <text x="60" y="202" fontSize="12" fontWeight="700" fill="var(--text-secondary)">list2</text>
          {[[1,150,76],[3,290,76],[5,430,76],[2,150,176],[4,290,176],[6,430,176]].map(([value,x,y],index) => <g key={index}><rect x={Number(x)} y={Number(y)} width="74" height="56" rx="5" fill={value===1 ? "var(--success)" : "var(--bg)"} fillOpacity={value===1 ? 0.1 : 1} stroke={value===1 ? "var(--success)" : "var(--border)"} /><text x={Number(x)+37} y={Number(y)+35} textAnchor="middle" fontSize="17" fontWeight="700" fill="var(--text-primary)">{value}</text>{index%3<2 ? <line x1={Number(x)+74} y1={Number(y)+28} x2={Number(x)+132} y2={Number(y)+28} stroke="var(--border)" strokeWidth="2" markerEnd="url(#merge-head-arrow)" /> : null}</g>)}
          <path d="M187 142 C260 284 520 298 620 270" fill="none" stroke="var(--success)" strokeWidth="3" markerEnd="url(#merge-head-arrow)" />
          <rect x="620" y="238" width="170" height="68" rx="5" fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" />
          <text x="705" y="265" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--text-primary)">merged head = 1</text>
          <text x="705" y="288" textAnchor="middle" fontSize="10.5" fill="var(--text-secondary)">next = Merge(3→5, 2→4→6)</text>
          <text x="430" y="360" textAnchor="middle" fontSize="11.5" fontWeight="700" fill="var(--accent)">选中节点之外的两个后缀仍各自有序</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">较小头必是全局最小剩余节点，选它后递归处理规模减一的同类问题。</figcaption>
    </figure>
  );
}

export function MergeRecursionInvariantMap() {
  const rows = [
    ["任一链为空", "返回另一条链", "剩余链已排序"],
    ["head1小于head2", "head1作为结果头", "递归合并head1.next与head2"],
    ["head1不小于head2", "head2作为结果头", "递归合并head1与head2.next"],
    ["每次返回", "所选头连接有序子结果", "节点总数减少一"],
  ] as const;
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-x-auto border border-border bg-elevated p-4 sm:p-5">
        <table className="w-full min-w-[780px] border-collapse text-left text-sm">
          <thead><tr className="border-b border-border">{["条件", "动作", "递归不变量"].map((item) => <th key={item} className="p-3 text-primary">{item}</th>)}</tr></thead>
          <tbody>{rows.map((row) => <tr key={row[0]} className="border-b border-border last:border-0">{row.map((cell,index) => <td key={cell} className={"p-3 " + (index === 2 ? "font-semibold text-accent" : "text-secondary")}>{cell}</td>)}</tr>)}</tbody>
        </table>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">每层只固定一个最小节点，子问题仍是两个排序链表的合并。</figcaption>
    </figure>
  );
}

export function MergeTiePolicyDiagram() {
  const rows = [
    ["作者条件 head1 < head2", "相等时取head2", "1b→1a", "忠实源码"],
    ["条件 head1 <= head2", "相等时取head1", "1a→1b", "第一链优先"],
    ["只比较value", "各链内部顺序保留", "跨链顺序由策略定", "都保持有序"],
  ] as const;
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-x-auto border border-border bg-elevated p-4 sm:p-5">
        <table className="w-full min-w-[780px] border-collapse text-left text-sm">
          <thead><tr className="border-b border-border">{["比较规则", "相等选择", "身份顺序", "含义"].map((item) => <th key={item} className="p-3 text-primary">{item}</th>)}</tr></thead>
          <tbody>{rows.map((row) => <tr key={row[0]} className="border-b border-border last:border-0">{row.map((cell,index) => <td key={cell} className={"p-3 " + (index === 1 ? "font-semibold text-accent" : "text-secondary")}>{cell}</td>)}</tr>)}</tbody>
        </table>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">值序列都正确，但重复值节点的跨链身份顺序取决于严格或非严格比较。</figcaption>
    </figure>
  );
}

export function MergeOfficialCaseLab() {
  return <CodingInterviewLab cases={cases} caption="切换作者五组测试，核对交错、重复值、单节点、单空和双空边界。" />;
}
