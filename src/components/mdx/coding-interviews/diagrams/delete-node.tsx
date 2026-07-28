"use client";

const cases = [
  {
    label: "删除中间3",
    fields: [["原链", "1→2→3→4→5"], ["动作", "把4复制到目标3对象"], ["释放", "原值4的后继对象"], ["结果", "1→2→4→5，O(1)"]],
  },
  {
    label: "删除尾5",
    fields: [["目标", "next为空"], ["动作", "从头找值4的前驱节点"], ["修改", "前驱next置空并释放5"], ["成本", "O(n)"]],
  },
  {
    label: "删除头1",
    fields: [["多节点", "复制2并释放原2对象"], ["head地址", "保持不变"], ["逻辑序列", "2→3→4→5"], ["身份", "原头对象变成值2"]],
  },
  {
    label: "单节点/空",
    fields: [["单节点", "目标同时是头和尾"], ["动作", "释放并把head置空"], ["空输入", "直接返回"], ["要求", "头指针必须可修改"]],
  },
] as const;

export function SuccessorCopyDeleteDiagram() {
  const nodes = [
    ["1", 80, false], ["2", 220, false], ["3", 360, true], ["4", 500, false], ["5", 640, false],
  ] as const;
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden border border-border bg-elevated p-4 sm:p-5">
        <svg viewBox="0 0 820 400" role="img" aria-label="删除中间节点3时把后继4的值复制到目标对象，再绕过并释放后继对象。" className="mx-auto block h-auto w-full max-w-[820px]">
          <defs><marker id="delete-arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 Z" fill="var(--accent)" /></marker></defs>
          <text x="410" y="34" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">非尾节点：复制后继内容，再删除后继对象</text>
          {nodes.map(([label,x,target],index) => <g key={String(label)}><rect x={Number(x)} y="88" width="92" height="58" rx="5" fill={target ? "var(--accent)" : "var(--bg)"} fillOpacity={target ? 0.11 : 1} stroke={target ? "var(--accent)" : "var(--border)"} strokeWidth={target ? 2 : 1} /><text x={Number(x)+46} y="124" textAnchor="middle" fontSize="17" fontWeight="700" fill="var(--text-primary)">{label}</text>{index<nodes.length-1 ? <line x1={Number(x)+92} y1="117" x2={Number(nodes[index+1][1])-10} y2="117" stroke="var(--border)" strokeWidth="2" markerEnd="url(#delete-arrow)" /> : null}</g>)}
          <path d="M546 158 C520 214 452 218 410 158" fill="none" stroke="var(--success)" strokeWidth="3" strokeDasharray="6 4" markerEnd="url(#delete-arrow)" />
          <text x="478" y="234" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--success)">value 4复制到目标对象</text>
          <rect x="360" y="268" width="92" height="58" rx="5" fill="var(--success)" fillOpacity="0.11" stroke="var(--success)" strokeWidth="2" />
          <text x="406" y="304" textAnchor="middle" fontSize="17" fontWeight="700" fill="var(--text-primary)">4</text>
          <line x1="452" y1="297" x2="630" y2="297" stroke="var(--accent)" strokeWidth="3" markerEnd="url(#delete-arrow)" />
          <text x="510" y="354" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">目标地址保留；原后继4对象被释放，逻辑序列少了3。</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">常数时间来自改变删除对象的物理身份，而不是凭空获得前驱指针。</figcaption>
    </figure>
  );
}

export function DeleteNodeCaseMap() {
  const rows = [
    ["非尾节点", "target->next存在", "复制后继并绕过后继", "O(1)"],
    ["多节点尾节点", "target->next为空且不是head", "从head顺序找前驱", "O(n)"],
    ["单节点", "target等于head且next为空", "释放并更新head为空", "O(1)"],
    ["空/空目标", "head或target无效", "不操作", "O(1)"],
  ] as const;
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-x-auto border border-border bg-elevated p-4 sm:p-5">
        <table className="w-full min-w-[720px] border-collapse text-left text-sm">
          <thead><tr className="border-b border-border">{["情况", "识别条件", "删除动作", "时间"].map((item) => <th key={item} className="p-3 text-primary">{item}</th>)}</tr></thead>
          <tbody>{rows.map((row) => <tr key={row[0]} className="border-b border-border last:border-0">{row.map((cell,index) => <td key={cell} className={"p-3 " + (index===3 ? "font-semibold text-accent" : "text-secondary")}>{cell}</td>)}</tr>)}</tbody>
        </table>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">只有尾节点缺少可复制后继，单向链表才必须从头寻找前驱。</figcaption>
    </figure>
  );
}

export function NodeIdentityImpactDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden border border-border bg-elevated p-4 sm:p-5">
        <svg viewBox="0 0 820 310" role="img" aria-label="外部引用target仍指向同一地址但值从3变4，外部引用successor在删除后悬空。" className="mx-auto block h-auto w-full max-w-[820px]">
          <text x="410" y="34" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">逻辑值删除与对象身份变化</text>
          <rect x="116" y="86" width="220" height="98" rx="5" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" />
          <rect x="484" y="86" width="220" height="98" rx="5" fill="var(--warning)" fillOpacity="0.08" stroke="var(--warning)" />
          <text x="226" y="116" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--accent)">外部target引用</text>
          <text x="226" y="146" textAnchor="middle" fontSize="11" fill="var(--text-primary)">地址不变，值3→4</text>
          <text x="226" y="168" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">观察者看到对象内容被替换</text>
          <text x="594" y="116" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--warning)">外部successor引用</text>
          <text x="594" y="146" textAnchor="middle" fontSize="11" fill="var(--text-primary)">原值4对象被释放</text>
          <text x="594" y="168" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">继续解引用成为悬空指针</text>
          <rect x="168" y="226" width="484" height="42" rx="5" fill="var(--bg)" stroke="var(--border)" />
          <text x="410" y="252" textAnchor="middle" fontSize="11" fill="var(--text-primary)">若节点身份、地址或析构副作用有业务意义，不能使用该技巧。</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">算法保证链表值序列正确，不保证“传入的物理对象被释放”。</figcaption>
    </figure>
  );
}
