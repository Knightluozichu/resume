"use client";

const cases = [
  {
    label: "0",
    fields: [["32位模式", "00000000...0000"], ["置位数", "0"], ["清位循环", "0次"], ["边界", "while不进入"]],
  },
  {
    label: "10",
    fields: [["低8位", "00001010"], ["置位", "bit3、bit1"], ["清位轮次", "2"], ["结果", "2"]],
  },
  {
    label: "0x7FFFFFFF",
    fields: [["符号位", "0"], ["其余位", "31个1"], ["结果", "31"], ["覆盖", "最大正32位整数"]],
  },
  {
    label: "负数位型",
    fields: [["0xFFFFFFFF", "32个1"], ["0x80000000", "仅最高位1"], ["输入语义", "uint32_t位模式"], ["结果", "32与1"]],
  },
] as const;

export function BitMaskSweepDiagram() {
  const bits = ["0","0","0","0","1","0","1","0"] as const;
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden border border-border bg-elevated p-4 sm:p-5">
        <svg viewBox="0 0 820 330" role="img" aria-label="数值10的低8位为00001010，单比特掩码从右向左检查每一位。" className="mx-auto block h-auto w-full max-w-[820px]">
          <text x="410" y="30" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">固定宽度掩码逐位扫描：10 = 00001010</text>
          {bits.map((bit, index) => {
            const x = 102 + index * 78;
            const active = bit === "1";
            return <g key={index}><rect x={x} y="102" width="62" height="62" rx="4" fill={active ? "var(--success)" : "var(--bg)"} fillOpacity={active ? 0.12 : 1} stroke={active ? "var(--success)" : "var(--border)"} /><text x={x+31} y="141" textAnchor="middle" fontSize="19" fontWeight="700" fill="var(--text-primary)">{bit}</text><text x={x+31} y="188" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">bit {7-index}</text></g>;
          })}
          <path d="M659 236 L581 236" stroke="var(--accent)" strokeWidth="3" />
          <path d="M589 229 L581 236 L589 243" fill="none" stroke="var(--accent)" strokeWidth="3" />
          <text x="620" y="260" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--accent)">mask每轮左移一位</text>
          <rect x="205" y="286" width="410" height="28" rx="5" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" />
          <text x="410" y="305" textAnchor="middle" fontSize="11" fill="var(--text-primary)">value &amp; mask 非零，说明该位置为1并计数。</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">扫描次数由位宽决定，不受数值正负或置位数量影响。</figcaption>
    </figure>
  );
}

export function ClearLowestOneDiagram() {
  const stages = [
    ["n", "11010000", "最低位1在bit4"],
    ["n-1", "11001111", "该1变0，右侧0全变1"],
    ["n&(n-1)", "11000000", "更高位不变，最低位1被清除"],
  ] as const;
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-x-auto border border-border bg-elevated p-4 sm:p-5">
        <table className="w-full min-w-[680px] border-collapse text-left text-sm">
          <thead><tr className="border-b border-border">{["表达式", "低8位", "变化"].map((item) => <th key={item} className="p-3 text-primary">{item}</th>)}</tr></thead>
          <tbody>{stages.map((row) => <tr key={row[0]} className="border-b border-border last:border-0">{row.map((cell, index) => <td key={`${row[0]}-${index}`} className={"p-3 " + (index === 1 ? "font-mono font-semibold text-accent" : "text-secondary")}>{cell}</td>)}</tr>)}</tbody>
        </table>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">每执行一次按位与，置位数严格减少1，因此循环次数恰等于答案。</figcaption>
    </figure>
  );
}

export function BitCountMethodMap() {
  const rows = [
    ["掩码扫描", "mask从1左移到0", "O(W)", "固定检查全部W位"],
    ["右移输入", "先转无符号再右移", "O(W)", "有符号负数右移有陷阱"],
    ["清最低位1", "value &= value-1", "O(K)", "K为置位数量"],
    ["std::popcount", "标准库无符号重载", "实现相关优化", "表达意图最直接"],
  ] as const;
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-x-auto border border-border bg-elevated p-4 sm:p-5">
        <table className="w-full min-w-[720px] border-collapse text-left text-sm">
          <thead><tr className="border-b border-border">{["方案", "核心操作", "时间", "边界"].map((item) => <th key={item} className="p-3 text-primary">{item}</th>)}</tr></thead>
          <tbody>{rows.map((row) => <tr key={row[0]} className="border-b border-border last:border-0">{row.map((cell, index) => <td key={`${row[0]}-${index}`} className={"p-3 " + (index === 2 ? "font-semibold text-accent" : "text-secondary")}>{cell}</td>)}</tr>)}</tbody>
        </table>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">W是位宽，K是1的数量；所有方案额外空间均为常数。</figcaption>
    </figure>
  );
}
