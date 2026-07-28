"use client";

const cases = [
  {
    label: "部分重复",
    fields: [["输入", "1→2→3→3→4→4→5"], ["重复段", "3段、4段"], ["保留", "只出现一次的1、2、5"], ["输出", "1→2→5"]],
  },
  {
    label: "头部重复",
    fields: [["输入", "1→1→1→1→1→1→2"], ["pre", "仍为空"], ["重连", "head直接指向2"], ["输出", "2"]],
  },
  {
    label: "全部成对",
    fields: [["输入", "1→1→2→2→3→3→4→4"], ["每段", "长度都大于1"], ["重连", "link最终为空"], ["输出", "空链表"]],
  },
  {
    label: "无重复/空",
    fields: [["1→2→…→7", "原样保留"], ["单节点1", "保留"], ["两个1", "全部删除"], ["空链表", "仍为空"]],
  },
] as const;

export function DuplicateRunDeletionDiagram() {
  const nodes = [
    ["1",80,false],["2",180,false],["3",280,true],["3",380,true],["4",480,true],["4",580,true],["5",680,false],
  ] as const;
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden border border-border bg-elevated p-4 sm:p-5">
        <svg viewBox="0 0 820 360" role="img" aria-label="排序链表1233445中两个3和两个4作为重复段全部删除，剩125。" className="mx-auto block h-auto w-full max-w-[820px]">
          <defs><marker id="duplicate-arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 Z" fill="var(--accent)" /></marker></defs>
          <text x="410" y="34" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">重复值整段删除，不保留一个副本</text>
          {nodes.map(([label,x,duplicate],index) => <g key={index}><rect x={Number(x)-35} y="90" width="70" height="52" rx="5" fill={duplicate ? "var(--warning)" : "var(--bg)"} fillOpacity={duplicate ? 0.1 : 1} stroke={duplicate ? "var(--warning)" : "var(--border)"} /><text x={Number(x)} y="122" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">{label}</text>{index<nodes.length-1 ? <line x1={Number(x)+35} y1="116" x2={Number(nodes[index+1][1])-43} y2="116" stroke="var(--border)" strokeWidth="2" markerEnd="url(#duplicate-arrow)" /> : null}</g>)}
          <path d="M180 158 C280 230 580 230 680 158" fill="none" stroke="var(--success)" strokeWidth="3" markerEnd="url(#duplicate-arrow)" />
          <text x="430" y="240" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--success)">前驱2直接连接重复段后的5</text>
          <rect x="245" y="276" width="330" height="48" rx="5" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" />
          <text x="410" y="306" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">结果：1 → 2 → 5</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">有序性让同值节点连续成段，一次扫描即可识别并跳过整段。</figcaption>
    </figure>
  );
}

export function DuplicatePredecessorInvariantMap() {
  const rows = [
    ["当前值只出现一次", "pre移动到current", "current前进一格", "已处理前缀正确"],
    ["当前值重复", "pre保持在上个保留节点", "删除整段并接到next", "不让pre指向将删除节点"],
    ["重复段从头开始", "pre为空", "更新head为next", "新头是首个未处理节点"],
    ["重复段到尾结束", "next为空", "pre->next或head置空", "遍历完成"],
  ] as const;
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-x-auto border border-border bg-elevated p-4 sm:p-5">
        <table className="w-full min-w-[760px] border-collapse text-left text-sm">
          <thead><tr className="border-b border-border">{["情况", "pre动作", "current动作", "不变量"].map((item) => <th key={item} className="p-3 text-primary">{item}</th>)}</tr></thead>
          <tbody>{rows.map((row) => <tr key={row[0]} className="border-b border-border last:border-0">{row.map((cell,index) => <td key={cell} className={"p-3 " + (index===3 ? "font-semibold text-accent" : "text-secondary")}>{cell}</td>)}</tr>)}</tbody>
        </table>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">pre始终指向最后一个确定保留的节点，或为空表示尚无保留前缀。</figcaption>
    </figure>
  );
}

export function HeadRunRewireDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden border border-border bg-elevated p-4 sm:p-5">
        <svg viewBox="0 0 820 310" role="img" aria-label="链表11112删除头部重复段后，head从第一个1改指向2。" className="mx-auto block h-auto w-full max-w-[820px]">
          <defs><marker id="head-arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 Z" fill="var(--accent)" /></marker></defs>
          <text x="410" y="34" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">头部重复段没有前驱，必须改写head</text>
          <text x="78" y="112" fontSize="11" fontWeight="700" fill="var(--accent)">head</text>
          <line x1="112" y1="108" x2="144" y2="108" stroke="var(--accent)" strokeWidth="3" markerEnd="url(#head-arrow)" />
          {[1,1,1,1,2].map((value,index) => <g key={index}><rect x={154+index*102} y="78" width="76" height="58" rx="5" fill={value===1 ? "var(--warning)" : "var(--success)"} fillOpacity="0.1" stroke={value===1 ? "var(--warning)" : "var(--success)"} /><text x={192+index*102} y="114" textAnchor="middle" fontSize="17" fontWeight="700" fill="var(--text-primary)">{value}</text></g>)}
          <path d="M100 214 C220 270 490 260 562 150" fill="none" stroke="var(--success)" strokeWidth="3" strokeDasharray="6 4" markerEnd="url(#head-arrow)" />
          <text x="338" y="270" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--success)">删除所有1后，head直接指向2</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">二级指针、引用或指向链接的指针都能统一处理头部重连。</figcaption>
    </figure>
  );
}
