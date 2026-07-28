"use client";

const traceCases = [
  { label: "根节点1", fields: [["前序首项", "1"], ["中序位置", "4,7,2 | 1 | 5,3,8,6"], ["左节点数", "3"], ["子问题", "左前3项与右后4项"]] },
  { label: "左根2", fields: [["左前序", "2,4,7"], ["左中序", "4,7 | 2"], ["左节点数", "2"], ["结果", "2没有右子树"]] },
  { label: "节点4/7", fields: [["子前序", "4,7"], ["子中序", "4 | 7"], ["划分", "4无左，7在右"], ["结果", "4.right = 7"]] },
  { label: "右子树3", fields: [["右前序", "3,5,6,8"], ["右中序", "5 | 3 | 8,6"], ["左右根", "5与6"], ["结果", "6.left = 8"]] },
] as const;

const testCases = [
  { label: "普通树", fields: [["节点", "8个"], ["形状", "左右子树都有缺口"], ["覆盖", "多层区间划分"], ["校验", "重算前序与中序"]] },
  { label: "退化树", fields: [["全左", "中序与前序相反"], ["全右", "中序与前序相同"], ["深度", "n"], ["风险", "递归栈与O(n²)扫描"]] },
  { label: "最小输入", fields: [["单节点", "两序列同一值"], ["空输入", "返回空树"], ["覆盖", "递归基线"], ["校验", "区间同时为空"]] },
  { label: "非法输入", fields: [["长度", "不同直接拒绝"], ["元素", "集合不一致"], ["位置", "根不在当前中序区间"], ["结果", "结构化错误而非半棵树"]] },
] as const;

export function TraversalSplitDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden border border-border bg-elevated p-4 sm:p-5">
        <svg viewBox="0 0 800 400" role="img" aria-label="前序序列首项1是根，中序序列以1分成左侧4、7、2和右侧5、3、8、6，左侧长度3再切分前序。" className="mx-auto block h-auto w-full max-w-[800px]">
          <text x="400" y="34" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">前序给根，中序给左右边界</text>
          <text x="52" y="84" fontSize="11" fontWeight="700" fill="var(--text-secondary)">前序</text>
          {[1,2,4,7,3,5,6,8].map((value,index) => <g key={`pre-${value}`}><rect x={116 + index*72} y="58" width="58" height="46" fill={index===0 ? "var(--accent)" : index<=3 ? "var(--success)" : "var(--warning)"} fillOpacity="0.1" stroke={index===0 ? "var(--accent)" : "var(--border)"} /><text x={145 + index*72} y="87" textAnchor="middle" fontSize="12" fontWeight={index===0 ? "700" : "500"} fill="var(--text-primary)">{value}</text></g>)}
          <text x="52" y="174" fontSize="11" fontWeight="700" fill="var(--text-secondary)">中序</text>
          {[4,7,2,1,5,3,8,6].map((value,index) => <g key={`in-${value}`}><rect x={116 + index*72} y="148" width="58" height="46" fill={index===3 ? "var(--accent)" : index<3 ? "var(--success)" : "var(--warning)"} fillOpacity="0.1" stroke={index===3 ? "var(--accent)" : "var(--border)"} /><text x={145 + index*72} y="177" textAnchor="middle" fontSize="12" fontWeight={index===3 ? "700" : "500"} fill="var(--text-primary)">{value}</text></g>)}
          <path d="M361 198 V230" stroke="var(--accent)" strokeWidth="2" /><text x="361" y="248" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--accent)">根1把中序分为3个左节点和4个右节点</text>
          <rect x="104" y="280" width="262" height="72" rx="5" fill="var(--success)" fillOpacity="0.07" stroke="var(--success)" />
          <text x="235" y="306" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--success)">左子树</text><text x="235" y="330" textAnchor="middle" fontSize="11" fill="var(--text-primary)">pre=[2,4,7] · in=[4,7,2]</text>
          <rect x="434" y="280" width="262" height="72" rx="5" fill="var(--warning)" fillOpacity="0.07" stroke="var(--warning)" />
          <text x="565" y="306" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--warning)">右子树</text><text x="565" y="330" textAnchor="middle" fontSize="11" fill="var(--text-primary)">pre=[3,5,6,8] · in=[5,3,8,6]</text>
          <text x="400" y="382" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">对子区间重复同一规则，直到区间为空或只剩一个节点。</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">左子树大小来自中序根位置，并决定前序序列切分点。</figcaption>
    </figure>
  );
}

export function IntervalInvariantMap() {
  const rows = [
    ["区间长度", "preEnd-preStart", "inEnd-inStart", "必须相等"],
    ["当前根", "preorder[preStart]", "应位于当前中序区间", "缺失即非法"],
    ["左子树", "根后leftSize项", "根左侧leftSize项", "长度一致"],
    ["右子树", "剩余前序项", "根右侧项", "长度一致"],
  ] as const;
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-x-auto border border-border bg-elevated p-4 sm:p-5"><table className="w-full min-w-[700px] border-collapse text-left text-sm"><thead><tr className="border-b border-border"><th className="p-3 text-primary">检查</th><th className="p-3 text-primary">前序</th><th className="p-3 text-primary">中序</th><th className="p-3 text-primary">要求</th></tr></thead><tbody>{rows.map((row) => <tr key={row[0]} className="border-b border-border last:border-0">{row.map((cell,i) => <td key={cell} className={`p-3 ${i===3 ? "font-semibold text-accent" : "text-secondary"}`}>{cell}</td>)}</tr>)}</tbody></table></div>
      <figcaption className="mt-2 text-center text-sm text-secondary">递归不是只找根：每一层都要验证两种遍历描述的是同一批节点。</figcaption>
    </figure>
  );
}
