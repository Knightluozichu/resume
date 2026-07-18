"use client";

import { CodingInterviewLab } from "./official-lab";

const cases = [
  {
    label: "完整树",
    fields: [["根", "8"], ["原左右", "6 / 10"], ["镜像左右", "10 / 6"], ["双镜像", "恢复原树"]],
  },
  {
    label: "左斜树",
    fields: [["输入", "8←7←6←5←4"], ["镜像", "全部改为右链"], ["递归深度", "5"], ["迭代栈", "最多1个待处理子节点"]],
  },
  {
    label: "右斜树",
    fields: [["输入", "8→7→6→5→4"], ["镜像", "全部改为左链"], ["源码递归缺陷", "会被错误提前返回"], ["迭代版", "正确"]],
  },
  {
    label: "空树",
    fields: [["root", "空"], ["递归", "直接返回"], ["迭代", "直接返回"], ["结构", "仍为空"]],
  },
  {
    label: "单节点",
    fields: [["root", "8"], ["左右孩子", "都为空"], ["交换", "无可见变化"], ["结果", "同一节点"]],
  },
] as const;

export function MirrorSwapDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden border border-border bg-elevated p-4 sm:p-5">
        <svg viewBox="0 0 860 430" role="img" aria-label="二叉树85610镜像后每个节点左右子节点交换。" className="mx-auto block h-auto w-full max-w-[860px]">
          <defs><marker id="mirror-swap-arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 Z" fill="var(--accent)" /></marker></defs>
          <text x="430" y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">每个节点都交换左右链接</text>
          <text x="205" y="66" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--text-secondary)">原树</text>
          <text x="655" y="66" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--text-secondary)">镜像</text>
          {[[8,205,102],[6,125,206],[10,285,206],[5,82,318],[7,168,318]].map(([value,x,y],index) => <g key={"a"+index}><circle cx={Number(x)} cy={Number(y)} r="30" fill="var(--bg)" stroke="var(--border)" /><text x={Number(x)} y={Number(y)+6} textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">{value}</text></g>)}
          {[[8,655,102],[10,575,206],[6,735,206],[7,692,318],[5,778,318]].map(([value,x,y],index) => <g key={"b"+index}><circle cx={Number(x)} cy={Number(y)} r="30" fill={index===0 ? "var(--success)" : "var(--bg)"} fillOpacity={index===0 ? 0.1 : 1} stroke={index===0 ? "var(--success)" : "var(--border)"} /><text x={Number(x)} y={Number(y)+6} textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">{value}</text></g>)}
          {[[187,128,143,178],[223,128,267,178],[111,232,91,288],[139,232,159,288],[637,128,593,178],[673,128,717,178],[721,232,701,288],[749,232,769,288]].map((line,index) => <line key={index} x1={line[0]} y1={line[1]} x2={line[2]} y2={line[3]} stroke="var(--border)" strokeWidth="2" markerEnd="url(#mirror-swap-arrow)" />)}
          <path d="M366 210 H494" stroke="var(--accent)" strokeWidth="3" markerEnd="url(#mirror-swap-arrow)" />
          <text x="430" y="198" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--accent)">mirror</text>
          <text x="430" y="402" textAnchor="middle" fontSize="11.5" fontWeight="700" fill="var(--success)">节点值和身份不变，只有left与right指针互换</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">根的左右子树整体交换，子树内部每个节点继续执行同一操作。</figcaption>
    </figure>
  );
}

export function MirrorTraversalMap() {
  const rows = [
    ["递归前序", "交换当前，再递归两侧", "O(h)调用栈", "作者方案一"],
    ["迭代DFS", "栈弹出、交换、压入孩子", "O(h)到O(n)", "作者方案二"],
    ["迭代BFS", "队列弹出、交换、入队孩子", "O(最大层宽)", "工程变体"],
    ["拷贝镜像", "新左复制原右，新右复制原左", "O(n)新节点", "保留原树"],
  ] as const;
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-x-auto border border-border bg-elevated p-4 sm:p-5">
        <table className="w-full min-w-[800px] border-collapse text-left text-sm">
          <thead><tr className="border-b border-border">{["方法", "访问动作", "辅助空间", "契约"].map((item) => <th key={item} className="p-3 text-primary">{item}</th>)}</tr></thead>
          <tbody>{rows.map((row) => <tr key={row[0]} className="border-b border-border last:border-0">{row.map((cell,index) => <td key={cell} className={"p-3 " + (index === 0 ? "font-semibold text-accent" : "text-secondary")}>{cell}</td>)}</tr>)}</tbody>
        </table>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">遍历顺序可以变化，但每个真实节点必须恰好交换一次。</figcaption>
    </figure>
  );
}

export function MirrorSourceGuardDiagram() {
  const rows = [
    ["left为空 && right非空", "不是叶子", "源码条件却返回", "右斜树不镜像"],
    ["left为空 && right为空", "叶子", "应直接返回", "无需交换"],
    ["left非空 && right为空", "不是叶子", "继续交换", "左斜树可镜像"],
    ["修正条件", "left为空 && right为空", "只跳过真叶子", "左右斜树都正确"],
  ] as const;
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-x-auto border border-border bg-elevated p-4 sm:p-5">
        <table className="w-full min-w-[820px] border-collapse text-left text-sm">
          <thead><tr className="border-b border-border">{["节点形状", "真实语义", "作者仓库源码", "影响"].map((item) => <th key={item} className="p-3 text-primary">{item}</th>)}</tr></thead>
          <tbody>{rows.map((row) => <tr key={row[0]} className="border-b border-border last:border-0">{row.map((cell,index) => <td key={cell} className={"p-3 " + (index === 2 ? "font-semibold text-warning" : "text-secondary")}>{cell}</td>)}</tr>)}</tbody>
        </table>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">仓库递归版漏写right为空比较；修正后才与迭代版和题意一致。</figcaption>
    </figure>
  );
}

export function MirrorOfficialCaseLab() {
  return <CodingInterviewLab cases={cases} caption="切换作者五组树形，核对完整树、左右斜树、空树和单节点。" />;
}
