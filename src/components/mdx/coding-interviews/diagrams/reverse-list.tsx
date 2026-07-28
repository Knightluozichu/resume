"use client";

const cases = [
  {
    label: "五节点",
    fields: [["输入", "1→2→3→4→5"], ["新头", "原尾5"], ["新尾", "原头1"], ["输出", "5→4→3→2→1"]],
  },
  {
    label: "单节点",
    fields: [["输入", "1"], ["pNext", "空"], ["新头", "仍为1"], ["next", "仍为空"]],
  },
  {
    label: "空链表",
    fields: [["pNode", "空"], ["循环", "零次"], ["新头", "空"], ["结果", "安全返回"]],
  },
  {
    label: "双重反转",
    fields: [["第一次", "5→4→3→2→1"], ["第二次", "1→2→3→4→5"], ["节点地址", "全部不变"], ["所有权", "未分配或释放节点"]],
  },
] as const;

export function ReversePointerOrderDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden border border-border bg-elevated p-4 sm:p-5">
        <svg viewBox="0 0 860 380" role="img" aria-label="反转链表一轮中先保存next，再改current指向previous，最后推进两个指针。" className="mx-auto block h-auto w-full max-w-[860px]">
          <defs><marker id="reverse-order-arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 Z" fill="var(--accent)" /></marker></defs>
          <text x="430" y="34" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">处理节点2：保存、反向、推进</text>
          {[
            ["prev", "1", 92, "var(--success)"],
            ["current", "2", 332, "var(--warning)"],
            ["next", "3", 572, "var(--accent)"],
          ].map(([label,value,x,tone]) => <g key={String(label)}>
            <text x={Number(x)+62} y="82" textAnchor="middle" fontSize="11" fontWeight="700" fill={String(tone)}>{label}</text>
            <rect x={Number(x)} y="98" width="124" height="66" rx="5" fill={String(tone)} fillOpacity="0.08" stroke={String(tone)} />
            <text x={Number(x)+62} y="138" textAnchor="middle" fontSize="18" fontWeight="700" fill="var(--text-primary)">{value}</text>
          </g>)}
          <path d="M332 131 C280 210 222 210 216 150" fill="none" stroke="var(--success)" strokeWidth="3" markerEnd="url(#reverse-order-arrow)" />
          <path d="M456 131 H564" fill="none" stroke="var(--border)" strokeWidth="2" strokeDasharray="5 4" markerEnd="url(#reverse-order-arrow)" />
          <rect x="102" y="248" width="656" height="86" rx="5" fill="var(--accent)" fillOpacity="0.05" stroke="var(--border)" />
          <text x="430" y="276" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--text-primary)">{"1. next = current->next  2. current->next = prev"}</text>
          <text x="430" y="304" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--text-primary)">3. prev = current　4. current = next</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">保存后继必须发生在重写next之前，否则未处理后缀将失去入口。</figcaption>
    </figure>
  );
}

export function ReverseInvariantMap() {
  const rows = [
    ["prev前缀", "已经反转", "prev是该段新头", "尾部指向空"],
    ["current节点", "本轮待处理", "仍指向未处理后缀", "重写后加入前缀"],
    ["current之后", "保持原正向链接", "next保存入口", "不得丢失"],
    ["循环结束", "current为空", "prev覆盖全部节点", "prev是新头"],
  ] as const;
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-x-auto border border-border bg-elevated p-4 sm:p-5">
        <table className="w-full min-w-[780px] border-collapse text-left text-sm">
          <thead><tr className="border-b border-border">{["区域", "状态", "入口", "要求"].map((item) => <th key={item} className="p-3 text-primary">{item}</th>)}</tr></thead>
          <tbody>{rows.map((row) => <tr key={row[0]} className="border-b border-border last:border-0">{row.map((cell,index) => <td key={cell} className={"p-3 " + (index === 1 ? "font-semibold text-accent" : "text-secondary")}>{cell}</td>)}</tr>)}</tbody>
        </table>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">每轮把一个节点从未处理后缀搬到已反转前缀，不创建也不销毁节点。</figcaption>
    </figure>
  );
}

export function ReverseHeadTailDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden border border-border bg-elevated p-4 sm:p-5">
        <svg viewBox="0 0 860 300" role="img" aria-label="反转前头1尾5，反转后头5尾1，节点身份保持。" className="mx-auto block h-auto w-full max-w-[860px]">
          <defs><marker id="reverse-head-arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 Z" fill="var(--accent)" /></marker></defs>
          <text x="430" y="34" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">只改变链接方向，不交换节点值</text>
          <text x="72" y="96" fontSize="12" fontWeight="700" fill="var(--text-secondary)">反转前</text>
          <text x="72" y="216" fontSize="12" fontWeight="700" fill="var(--text-secondary)">反转后</text>
          {[1,2,3,4,5].map((value,index) => <g key={"a"+value}><rect x={170+index*116} y="66" width="68" height="52" rx="4" fill="var(--bg)" stroke="var(--border)" /><text x={204+index*116} y="98" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">{value}</text>{index<4 ? <line x1={238+index*116} y1="92" x2={278+index*116} y2="92" stroke="var(--border)" strokeWidth="2" markerEnd="url(#reverse-head-arrow)" /> : null}</g>)}
          {[5,4,3,2,1].map((value,index) => <g key={"b"+value}><rect x={170+index*116} y="186" width="68" height="52" rx="4" fill={index===0 ? "var(--success)" : "var(--bg)"} fillOpacity={index===0 ? 0.1 : 1} stroke={index===0 ? "var(--success)" : "var(--border)"} /><text x={204+index*116} y="218" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">{value}</text>{index<4 ? <line x1={238+index*116} y1="212" x2={278+index*116} y2="212" stroke="var(--border)" strokeWidth="2" markerEnd="url(#reverse-head-arrow)" /> : null}</g>)}
          <text x="204" y="266" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--success)">原尾成为新头</text>
          <text x="668" y="266" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--warning)">原头成为新尾</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">原尾在处理时next为空，作者把该节点记录为pReversedHead。</figcaption>
    </figure>
  );
}
