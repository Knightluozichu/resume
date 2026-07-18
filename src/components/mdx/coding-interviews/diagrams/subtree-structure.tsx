"use client";

import { CodingInterviewLab } from "./official-lab";

const cases = [
  {
    label: "普通匹配",
    fields: [["A候选", "第二个8"], ["B", "8的左右为9和2"], ["比较", "三节点都吻合"], ["结果", "true"]],
  },
  {
    label: "普通失败",
    fields: [["A候选", "第二个8"], ["A右值", "3"], ["B右值", "2"], ["结果", "false"]],
  },
  {
    label: "左斜树",
    fields: [["A", "8→8→9→2→5"], ["B", "8→9→2"], ["方向", "全部左孩子"], ["结果", "true/改值后false"]],
  },
  {
    label: "右斜树",
    fields: [["A", "8→8→9→2→5"], ["B", "8→9→2"], ["方向", "全部右孩子"], ["额外左分支", "会使匹配失败"]],
  },
  {
    label: "空树",
    fields: [["A空,B非空", "false"], ["A非空,B空", "false"], ["A空,B空", "false"], ["内层B耗尽", "true"]],
  },
] as const;

export function SubtreeCandidateSearchDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden border border-border bg-elevated p-4 sm:p-5">
        <svg viewBox="0 0 860 430" role="img" aria-label="主树有两个值为8的候选，根候选失败后在左子节点8处匹配树B。" className="mx-auto block h-auto w-full max-w-[860px]">
          <defs><marker id="subtree-search-arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 Z" fill="var(--accent)" /></marker></defs>
          <text x="430" y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">先在A中找候选根，再从候选同步匹配B</text>
          <text x="210" y="68" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--text-secondary)">树A</text>
          {[[8,210,104],[8,120,206],[7,300,206],[9,72,310],[2,168,310]].map(([value,x,y],index) => <g key={index}><circle cx={Number(x)} cy={Number(y)} r="31" fill={index===1 ? "var(--success)" : index===0 ? "var(--warning)" : "var(--bg)"} fillOpacity={index<=1 ? 0.1 : 1} stroke={index===1 ? "var(--success)" : index===0 ? "var(--warning)" : "var(--border)"} /><text x={Number(x)} y={Number(y)+6} textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">{value}</text></g>)}
          {[[188,130,136,180],[232,130,278,180],[102,232,82,278],[138,232,158,278]].map((line,index) => <line key={index} x1={line[0]} y1={line[1]} x2={line[2]} y2={line[3]} stroke="var(--border)" strokeWidth="2" markerEnd="url(#subtree-search-arrow)" />)}
          <text x="610" y="68" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--text-secondary)">树B</text>
          {[[8,610,122],[9,544,228],[2,676,228]].map(([value,x,y],index) => <g key={index}><circle cx={Number(x)} cy={Number(y)} r="31" fill="var(--accent)" fillOpacity="0.07" stroke="var(--accent)" /><text x={Number(x)} y={Number(y)+6} textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">{value}</text></g>)}
          <line x1="590" y1="148" x2="558" y2="197" stroke="var(--border)" strokeWidth="2" markerEnd="url(#subtree-search-arrow)" />
          <line x1="630" y1="148" x2="662" y2="197" stroke="var(--border)" strokeWidth="2" markerEnd="url(#subtree-search-arrow)" />
          <path d="M172 212 C340 376 454 364 568 274" fill="none" stroke="var(--success)" strokeWidth="3" strokeDasharray="6 4" markerEnd="url(#subtree-search-arrow)" />
          <text x="380" y="394" textAnchor="middle" fontSize="11.5" fontWeight="700" fill="var(--success)">根8匹配失败后，外层继续到左侧8并成功</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">相同值只产生候选；左右形状和值全部覆盖后才能确认子结构。</figcaption>
    </figure>
  );
}

export function SubtreeMatchBoundaryMap() {
  const rows = [
    ["外层A为空", "没有候选位置", "false"],
    ["外层B为空", "题目约定空树不是子结构", "false"],
    ["内层B为空", "模板分支已经全部匹配", "true"],
    ["内层A为空、B非空", "主树对应分支不够深", "false"],
    ["当前值不同", "候选根局部匹配失败", "false"],
    ["当前值相同", "左右分支都要继续", "left && right"],
  ] as const;
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-x-auto border border-border bg-elevated p-4 sm:p-5">
        <table className="w-full min-w-[780px] border-collapse text-left text-sm">
          <thead><tr className="border-b border-border">{["条件", "语义", "返回/动作"].map((item) => <th key={item} className="p-3 text-primary">{item}</th>)}</tr></thead>
          <tbody>{rows.map((row) => <tr key={row[0]} className="border-b border-border last:border-0">{row.map((cell,index) => <td key={cell} className={"p-3 " + (index === 2 ? "font-semibold text-accent" : "text-secondary")}>{cell}</td>)}</tr>)}</tbody>
        </table>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">外层定义“是否提出有效查询”，内层定义“模板是否已匹配完”，空B含义不同。</figcaption>
    </figure>
  );
}

export function SubstructureVsSubtreeDiagram() {
  const rows = [
    ["子结构", "B耗尽即成功", "允许A对应节点继续有子孙", "局部覆盖"],
    ["完整子树", "双方同时耗尽才成功", "A不能多出任何对应分支", "结构完全相等"],
    ["本题外层空B", "直接false", "不把空树作为查询目标", "作者约定"],
  ] as const;
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-x-auto border border-border bg-elevated p-4 sm:p-5">
        <table className="w-full min-w-[780px] border-collapse text-left text-sm">
          <thead><tr className="border-b border-border">{["概念", "终止条件", "A可否继续延伸", "要求"].map((item) => <th key={item} className="p-3 text-primary">{item}</th>)}</tr></thead>
          <tbody>{rows.map((row) => <tr key={row[0]} className="border-b border-border last:border-0">{row.map((cell,index) => <td key={cell} className={"p-3 " + (index === 0 ? "font-semibold text-accent" : "text-secondary")}>{cell}</td>)}</tr>)}</tbody>
        </table>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">本题只要求B的全部节点在A中对应，不要求候选A子树到叶子完全相同。</figcaption>
    </figure>
  );
}

export function SubtreeOfficialCaseLab() {
  return <CodingInterviewLab cases={cases} caption="切换作者九组测试，核对普通树、左右斜树、结构缺口与三种空树组合。" />;
}
