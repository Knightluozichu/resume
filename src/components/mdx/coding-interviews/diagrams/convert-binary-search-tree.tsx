"use client";

import { CodingInterviewLab } from "./official-lab";

const officialCases = [
  { label: "Test1", fields: [["BST", "10；6/14；4,8,12,16"], ["正向", "4,6,8,10,12,14,16"], ["反向", "16,14,12,10,8,6,4"], ["覆盖", "完整树"]] },
  { label: "Test2", fields: [["BST", "5→左4→左3→左2→左1"], ["正向", "1,2,3,4,5"], ["头", "原最小节点1"], ["覆盖", "全左链"]] },
  { label: "Test3", fields: [["BST", "1→右2→右3→右4→右5"], ["正向", "1,2,3,4,5"], ["尾", "原最大节点5"], ["覆盖", "全右链"]] },
  { label: "Test4", fields: [["BST", "单节点1"], ["head", "节点1"], ["left/right", "都为nullptr"], ["覆盖", "最小非空树"]] },
  { label: "Test5", fields: [["BST", "nullptr"], ["tail", "nullptr"], ["head", "nullptr"], ["覆盖", "空树"]] },
] as const;

export function BstInorderLinkDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden border border-border bg-elevated p-4 sm:p-5">
        <svg viewBox="0 0 940 490" role="img" aria-label="二叉搜索树10、6、14、4、8、12、16按中序转换为4到16的线性双向链表。" className="mx-auto block h-auto w-full max-w-[940px]">
          <defs>
            <marker id="bst-list-right" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 Z" fill="var(--accent)" /></marker>
            <marker id="bst-list-left" markerWidth="8" markerHeight="8" refX="1" refY="4" orient="auto"><path d="M8 0 L0 4 L8 8 Z" fill="var(--success)" /></marker>
          </defs>
          <text x="470" y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">中序访问次序直接成为双向链表升序</text>
          {[[10,470,78],[6,310,172],[14,630,172],[4,220,274],[8,400,274],[12,540,274],[16,720,274]].map(([value,x,y]) => <g key={String(value)}><circle cx={x} cy={y} r="28" fill="var(--bg)" stroke="var(--border)" /><text x={x} y={y + 6} textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--text-primary)">{value}</text></g>)}
          {[[452,100,328,150],[488,100,612,150],[292,194,238,250],[328,194,382,250],[612,194,558,250],[648,194,702,250]].map((line,index) => <line key={index} x1={line[0]} y1={line[1]} x2={line[2]} y2={line[3]} stroke="var(--border)" strokeWidth="2" />)}
          {[4,6,8,10,12,14,16].map((value,index) => {
            const x = 70 + index * 118;
            return <g key={"list-" + value}><rect x={x} y="360" width="78" height="54" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" /><text x={x + 39} y="393" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--text-primary)">{value}</text>{index < 6 ? <><line x1={x + 79} y1="378" x2={x + 116} y2="378" stroke="var(--accent)" strokeWidth="2" markerEnd="url(#bst-list-right)" /><line x1={x + 116} y1="399" x2={x + 79} y2="399" stroke="var(--success)" strokeWidth="2" markerEnd="url(#bst-list-left)" /></> : null}</g>;
          })}
          <text x="70" y="448" fontSize="12" fontWeight="700" fill="var(--success)">head.left = nullptr</text>
          <text x="870" y="448" textAnchor="end" fontSize="12" fontWeight="700" fill="var(--accent)">tail.right = nullptr</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">作者复用left作为前驱、right作为后继，形成线性链；没有把头尾相连。</figcaption>
    </figure>
  );
}

export function BstNodeLinkInvariantMap() {
  const rows = [
    ["递归左子树前", "last指向更早已转换前缀尾", "当前节点尚保留左右孩子"],
    ["左子树完成", "last是左子树最大节点", "它应成为当前前驱"],
    ["连接当前", "current.left=last", "last.right=current"],
    ["更新尾", "last=current", "已转换前缀扩展一个节点"],
    ["递归右子树", "右子树最小节点将接到current后", "中序次序继续"],
  ] as const;
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-x-auto border border-border bg-elevated p-4 sm:p-5">
        <table className="w-full min-w-[900px] border-collapse text-left text-sm">
          <thead><tr className="border-b border-border">{["时刻", "尾指针语义", "链接动作/结论"].map((item) => <th key={item} className="p-3 text-primary">{item}</th>)}</tr></thead>
          <tbody>{rows.map((row) => <tr key={row[0]} className="border-b border-border last:border-0">{row.map((cell,index) => <td key={cell} className={"p-3 " + (index === 1 ? "font-semibold text-accent" : "text-secondary")}>{cell}</td>)}</tr>)}</tbody>
        </table>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">每次只把当前节点与中序前一节点互连，局部动作逐步构成完整有序链。</figcaption>
    </figure>
  );
}

export function BstLinearBoundaryDiagram() {
  const rows = [
    ["头节点", "最小值", "left=nullptr", "从tail沿left找到"],
    ["中间节点", "中序前驱/后继", "left与right都非空", "双向可达"],
    ["尾节点", "最大值", "right=nullptr", "ConvertNode最终last"],
    ["作者结果", "线性双向链表", "头尾不相连", "正向到null后反向"],
    ["循环变体", "另一个题目契约", "head.left=tail且tail.right=head", "本题不做"],
  ] as const;
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-x-auto border border-border bg-elevated p-4 sm:p-5">
        <table className="w-full min-w-[900px] border-collapse text-left text-sm">
          <thead><tr className="border-b border-border">{["位置/版本", "值语义", "边界指针", "验证"].map((item) => <th key={item} className="p-3 text-primary">{item}</th>)}</tr></thead>
          <tbody>{rows.map((row) => <tr key={row[0]} className="border-b border-border last:border-0">{row.map((cell,index) => <td key={cell} className={"p-3 " + (index === 2 ? "font-semibold text-success" : "text-secondary")}>{cell}</td>)}</tr>)}</tbody>
        </table>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">边界nullptr是作者打印函数终止正向与反向遍历的依据，不能擅自改成循环链表。</figcaption>
    </figure>
  );
}

export function ConvertBstOfficialCaseLab() {
  return <CodingInterviewLab cases={officialCases} caption="切换作者5组测试，核对完整树、左右单链、单节点和空树的正反向线性链。" />;
}
