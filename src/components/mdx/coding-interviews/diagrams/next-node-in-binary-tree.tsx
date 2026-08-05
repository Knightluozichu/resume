"use client";

const caseRows = [
  { label: "节点8", fields: [["右子树", "根10"], ["向左", "10 → 9"], ["后继", "9"], ["规则", "右子树最左节点"]] },
  { label: "节点5", fields: [["右子树", "无"], ["父关系", "5是6的左孩子"], ["后继", "6"], ["规则", "父节点立即可访问"]] },
  { label: "节点7", fields: [["右子树", "无"], ["向上", "7是6右孩子，继续到8"], ["后继", "8"], ["规则", "首个来自左分支的祖先"]] },
  { label: "节点11", fields: [["右子树", "无"], ["向上", "11→10→8都来自右分支"], ["后继", "null"], ["规则", "它是中序最后节点"]] },
] as const;

const tests = [
  { label: "完整树", fields: [["节点", "5,6,7,8,9,10,11"], ["中序", "5,6,7,8,9,10,11"], ["覆盖", "两类路径与末尾"], ["断言", "逐节点比较下一个"]] },
  { label: "全左树", fields: [["形状", "5←4←3←2"], ["根5", "后继null"], ["其他", "后继都是直接父节点"], ["覆盖", "无右子树且当前是左孩子"]] },
  { label: "全右树", fields: [["形状", "2→3→4→5"], ["节点2/3/4", "后继是右孩子"], ["节点5", "向上到根仍无后继"], ["覆盖", "右子树和连续上爬"]] },
  { label: "单节点/空", fields: [["单节点", "后继null"], ["空输入", "返回null"], ["覆盖", "最小结构"], ["前提", "父子链接一致"]] },
] as const;

export function InorderSuccessorCaseMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden border border-border bg-elevated p-4 sm:p-5">
        <svg viewBox="0 0 800 430" role="img" aria-label="二叉树8的左右子树为6和10，叶子为5、7、9、11；中序后继分为右子树最左节点与沿父指针上爬两类。" className="mx-auto block h-auto w-full max-w-[800px]">
          <text x="400" y="34" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">中序顺序：左子树 → 根 → 右子树</text>
          {[[8,400,70],[6,246,150],[10,554,150],[5,160,240],[7,332,240],[9,468,240],[11,640,240]].map(([v,x,y]) => <g key={v}><circle cx={x} cy={y} r="28" fill="var(--bg)" stroke={v===8 ? "var(--accent)" : "var(--border)"} strokeWidth={v===8 ? 2 : 1} /><text x={x} y={y+5} textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--text-primary)">{v}</text></g>)}
          {[[400,98,246,122],[400,98,554,122],[246,178,160,212],[246,178,332,212],[554,178,468,212],[554,178,640,212]].map((p,i) => <line key={i} x1={p[0]} y1={p[1]} x2={p[2]} y2={p[3]} stroke="var(--border)" strokeWidth="2" />)}
          <path d="M400 98 C430 120 486 160 468 212" fill="none" stroke="var(--success)" strokeWidth="3" strokeDasharray="5 3" />
          <text x="520" y="116" fontSize="11" fontWeight="700" fill="var(--success)">8有右子树：去10再一路向左到9</text>
          <path d="M332 212 C346 188 306 164 274 150 C314 126 360 102 390 94" fill="none" stroke="var(--warning)" strokeWidth="3" strokeDasharray="5 3" />
          <text x="150" y="314" fontSize="11" fontWeight="700" fill="var(--warning)">7无右子树：越过6，首个合适祖先是8</text>
          <rect x="100" y="344" width="600" height="56" rx="5" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" />
          <text x="400" y="367" textAnchor="middle" fontSize="11" fill="var(--text-primary)">有右子树：后继在下方；无右子树：后继只可能在父链上方。</text>
          <text x="400" y="388" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">值大小没有参与决策，这不是二叉搜索树查找。</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">父指针把“回到尚未访问的祖先”从根开始扫描变成局部上爬。</figcaption>
    </figure>
  );
}

export function AncestorClimbDiagram() {
  const rows = [
    ["current是parent左孩子", "parent尚未访问", "parent就是后继"],
    ["current是parent右孩子", "parent及其左子树已访问", "current=parent继续上爬"],
    ["parent为空", "已越过根且一直来自右分支", "没有后继"],
  ] as const;
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-x-auto border border-border bg-elevated p-4 sm:p-5"><table className="w-full min-w-[680px] border-collapse text-left text-sm"><thead><tr className="border-b border-border"><th className="p-3 text-primary">父子关系</th><th className="p-3 text-primary">中序状态</th><th className="p-3 text-primary">动作</th></tr></thead><tbody>{rows.map((row) => <tr key={row[0]} className="border-b border-border last:border-0">{row.map((cell,i) => <td key={`${row[0]}-${i}`} className={`p-3 ${i===2 ? "font-semibold text-accent" : "text-secondary"}`}>{cell}</td>)}</tr>)}</tbody></table></div>
      <figcaption className="mt-2 text-center text-sm text-secondary">上爬循环只跨过已经完整访问过的右分支。</figcaption>
    </figure>
  );
}
