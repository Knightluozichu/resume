"use client";

const cases = [
  {
    label: "交错输入",
    fields: [["输入", "1,2,3,4,5,6,7"], ["首个错位", "左侧2、右侧7"], ["交换", "7到前区、2到后区"], ["断言", "所有奇数在所有偶数前"]],
  },
  {
    label: "逆序分区",
    fields: [["输入", "2,4,6,1,3,5,7"], ["交换轮数", "三轮"], ["稳定性", "不保证组内次序"], ["复杂度", "线性、常数空间"]],
  },
  {
    label: "已经分区",
    fields: [["输入", "1,3,5,7,2,4,6"], ["左扫描", "越过全部奇数"], ["右扫描", "越过全部偶数"], ["交换", "零次"]],
  },
  {
    label: "最小边界",
    fields: [["单奇数1", "原样"], ["单偶数2", "原样"], ["空数组", "直接返回"], ["空指针", "直接返回"]],
  },
] as const;

export function OddEvenPartitionDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden border border-border bg-elevated p-4 sm:p-5">
        <svg viewBox="0 0 860 360" role="img" aria-label="首尾双指针把左侧偶数2与右侧奇数7交换并继续收缩。" className="mx-auto block h-auto w-full max-w-[860px]">
          <defs><marker id="reorder-arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 Z" fill="var(--accent)" /></marker></defs>
          <text x="430" y="34" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">1,2,3,4,5,6,7：只交换两侧错位元素</text>
          {[1,2,3,4,5,6,7].map((value, index) => {
            const x = 78 + index * 104;
            const wrong = value === 2 || value === 7;
            return <g key={value}>
              <rect x={x} y="92" width="72" height="58" rx="5" fill={wrong ? "var(--warning)" : "var(--bg)"} fillOpacity={wrong ? 0.12 : 1} stroke={wrong ? "var(--warning)" : "var(--border)"} />
              <text x={x + 36} y="128" textAnchor="middle" fontSize="17" fontWeight="700" fill="var(--text-primary)">{value}</text>
            </g>;
          })}
          <text x="218" y="186" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--warning)">left停在偶数2</text>
          <text x="738" y="186" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--warning)">right停在奇数7</text>
          <path d="M218 202 C340 270 610 270 738 202" fill="none" stroke="var(--accent)" strokeWidth="3" markerEnd="url(#reorder-arrow)" />
          <rect x="170" y="286" width="520" height="44" rx="4" fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" />
          <text x="430" y="314" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--text-primary)">交换后：1,7,3,4,5,6,2；下一轮扫描自然越过7与2</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">左边找应放后区的偶数，右边找应放前区的奇数，成对修复错位。</figcaption>
    </figure>
  );
}

export function PartitionInvariantMap() {
  const rows = [
    ["[0, left)", "全部是前区元素", "作者题中为奇数"],
    ["[left, right]", "尚未分类", "双指针继续扫描"],
    ["(right, n)", "全部是后区元素", "作者题中为偶数"],
    ["交换之后", "两个边界元素已归位", "下一轮内层循环会推进"],
  ] as const;
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-x-auto border border-border bg-elevated p-4 sm:p-5">
        <table className="w-full min-w-[720px] border-collapse text-left text-sm">
          <thead><tr className="border-b border-border">{["区间", "不变量", "含义"].map((item) => <th key={item} className="p-3 text-primary">{item}</th>)}</tr></thead>
          <tbody>{rows.map((row) => <tr key={row[0]} className="border-b border-border last:border-0">{row.map((cell,index) => <td key={`${row[0]}-${index}`} className={"p-3 " + (index === 1 ? "font-semibold text-accent" : "text-secondary")}>{cell}</td>)}</tr>)}</tbody>
        </table>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">两个已分类区间单调扩大，未分类区间严格缩小，保证终止。</figcaption>
    </figure>
  );
}

export function PredicateExtensionDiagram() {
  const rows = [
    ["isEven(x)", "奇数", "偶数", "原书题目"],
    ["x >= 0", "负数", "非负数", "负数提前"],
    ["x == 0", "非零", "零", "零值后置"],
    ["isInvalid(x)", "有效记录", "无效记录", "批量隔离"],
  ] as const;
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-x-auto border border-border bg-elevated p-4 sm:p-5">
        <table className="w-full min-w-[760px] border-collapse text-left text-sm">
          <thead><tr className="border-b border-border">{["后区谓词", "false放前区", "true放后区", "用途"].map((item) => <th key={item} className="p-3 text-primary">{item}</th>)}</tr></thead>
          <tbody>{rows.map((row) => <tr key={row[0]} className="border-b border-border last:border-0">{row.map((cell,index) => <td key={`${row[0]}-${index}`} className={"p-3 " + (index === 0 ? "font-semibold text-accent" : "text-secondary")}>{cell}</td>)}</tr>)}</tbody>
        </table>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">作者Reorder约定谓词为true的元素属于后半区，调用端只替换判断函数。</figcaption>
    </figure>
  );
}
