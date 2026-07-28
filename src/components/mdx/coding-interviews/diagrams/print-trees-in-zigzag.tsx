"use client";

const officialCases = [
  { label: "Test1", fields: [["树形", "8；6/10；5,7,9,11"], ["第1行", "8"], ["第2行", "10,6"], ["第3行", "5,7,9,11"]] },
  { label: "Test2", fields: [["树形", "5→左4→左3→左2"], ["输出", "5 / 4 / 3 / 2"], ["方向可见性", "每层仅1个节点"], ["覆盖", "全左链"]] },
  { label: "Test3", fields: [["树形", "5→右4→右3→右2"], ["输出", "5 / 4 / 3 / 2"], ["方向可见性", "每层仅1个节点"], ["覆盖", "全右链"]] },
  { label: "Test4", fields: [["树形", "单节点5"], ["输出", "一行5"], ["切换", "一次后结束"], ["覆盖", "最小非空树"]] },
  { label: "Test5", fields: [["树形", "nullptr"], ["输出", "无"], ["栈操作", "无"], ["覆盖", "空树"]] },
  { label: "Test6", fields: [["树形", "100→左50→右150"], ["输出", "100 / 50 / 150"], ["方向", "稀疏方向交替"], ["覆盖", "不规则链"]] },
  { label: "Test7", fields: [["树形", "4层满树1到15"], ["第2行", "12,4"], ["第3行", "2,6,10,14"], ["第4行", "15,13,11,9,7,5,3,1"]] },
] as const;

export function ZigzagTwoStackDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden border border-border bg-elevated p-4 sm:p-5">
        <svg viewBox="0 0 920 500" role="img" aria-label="三层二叉树按第一层左到右、第二层右到左、第三层左到右的之字形顺序访问。" className="mx-auto block h-auto w-full max-w-[920px]">
          <defs>
            <marker id="zigzag-right-arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 Z" fill="var(--success)" /></marker>
            <marker id="zigzag-left-arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 Z" fill="var(--accent)" /></marker>
          </defs>
          <text x="460" y="34" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">两个栈把相邻层的弹出方向交替反转</text>
          {[[8,460,82],[4,300,190],[12,620,190],[2,190,318],[6,370,318],[10,550,318],[14,730,318]].map(([value,x,y], index) => <g key={String(value)}><circle cx={x} cy={y} r="29" fill={index === 0 ? "var(--success)" : "var(--bg)"} fillOpacity={index === 0 ? 0.12 : 1} stroke={index === 0 ? "var(--success)" : "var(--border)"} /><text x={x} y={y + 6} textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--text-primary)">{value}</text></g>)}
          {[[442,106,318,166],[478,106,602,166],[282,214,208,294],[318,214,352,294],[602,214,568,294],[638,214,712,294]].map((line,index) => <line key={index} x1={line[0]} y1={line[1]} x2={line[2]} y2={line[3]} stroke="var(--border)" strokeWidth="2" />)}
          <path d="M370 126 H550" fill="none" stroke="var(--success)" strokeWidth="4" markerEnd="url(#zigzag-right-arrow)" />
          <text x="460" y="148" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--success)">第1层：左→右</text>
          <path d="M700 246 H220" fill="none" stroke="var(--accent)" strokeWidth="4" markerEnd="url(#zigzag-left-arrow)" />
          <text x="460" y="270" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--accent)">第2层：右→左</text>
          <path d="M160 380 H760" fill="none" stroke="var(--success)" strokeWidth="4" markerEnd="url(#zigzag-right-arrow)" />
          <text x="460" y="404" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--success)">第3层：左→右</text>
          <text x="460" y="468" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--text-secondary)">栈0处理奇数层并左后右压入栈1；栈1按右后左弹出偶数层</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">压栈顺序与下一层弹出顺序相反；因此当前层方向决定孩子要以哪种次序进入另一个栈。</figcaption>
    </figure>
  );
}

export function ZigzagChildPushOrderMap() {
  const rows = [
    ["current=0", "奇数层左→右", "左孩子，再右孩子", "右孩子先弹，偶数层右→左"],
    ["current=1", "偶数层右→左", "右孩子，再左孩子", "左孩子先弹，奇数层左→右"],
    ["当前栈为空", "本层完成", "输出换行", "current与next都取1减自身"],
    ["孩子为空", "不压入", "不放占位", "稀疏树仍按真实节点反转"],
  ] as const;
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-x-auto border border-border bg-elevated p-4 sm:p-5">
        <table className="w-full min-w-[900px] border-collapse text-left text-sm">
          <thead><tr className="border-b border-border">{["当前状态", "本层弹出方向", "压入下一栈", "造成的下一层方向"].map((item) => <th key={item} className="p-3 text-primary">{item}</th>)}</tr></thead>
          <tbody>{rows.map((row) => <tr key={row[0]} className="border-b border-border last:border-0">{row.map((cell,index) => <td key={cell} className={"p-3 " + (index === 2 ? "font-semibold text-accent" : "text-secondary")}>{cell}</td>)}</tr>)}</tbody>
        </table>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">必须按“下一层希望怎样弹出”反推当前层孩子的压栈顺序。</figcaption>
    </figure>
  );
}

export function ZigzagStackSwapDiagram() {
  const rows = [
    ["开始", "stack0=[8]", "stack1=[]", "current=0,next=1"],
    ["弹8后", "stack0=[]", "stack1=[4,12]，顶为12", "换行并切到1"],
    ["弹12、4后", "stack0=[14,10,6,2]，顶为2", "stack1=[]", "换行并切到0"],
    ["弹2、6、10、14后", "stack0=[]", "stack1=第四层逆向准备", "换行并切到1"],
    ["两栈都空", "无", "无", "遍历结束"],
  ] as const;
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-x-auto border border-border bg-elevated p-4 sm:p-5">
        <table className="w-full min-w-[900px] border-collapse text-left text-sm">
          <thead><tr className="border-b border-border">{["时刻", "stack0", "stack1", "索引状态"].map((item) => <th key={item} className="p-3 text-primary">{item}</th>)}</tr></thead>
          <tbody>{rows.map((row) => <tr key={row[0]} className="border-b border-border last:border-0">{row.map((cell,index) => <td key={cell} className={"p-3 " + (index === 3 ? "font-semibold text-success" : "text-secondary")}>{cell}</td>)}</tr>)}</tbody>
        </table>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">本层处理期间只从current弹、只向next压；current清空后才交换角色。</figcaption>
    </figure>
  );
}
