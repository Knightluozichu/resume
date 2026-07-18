"use client";

import { CodingInterviewLab } from "./official-lab";

const officialCases = [
  { label: "Test1", fields: [["树形", "根10；6/14；4,8,12,16"], ["输出", "10,6,14,4,8,12,16"], ["层数", "3"], ["覆盖", "完整左右孩子"]] },
  { label: "Test2", fields: [["树形", "5→左4→左3→左2→左1"], ["输出", "5,4,3,2,1"], ["最大队列", "1"], ["覆盖", "全左偏斜"]] },
  { label: "Test3", fields: [["树形", "1→右2→右3→右4→右5"], ["输出", "1,2,3,4,5"], ["最大队列", "1"], ["覆盖", "全右偏斜"]] },
  { label: "Test4", fields: [["树形", "单节点1"], ["输出", "1"], ["队列变化", "1→空"], ["覆盖", "最小非空树"]] },
  { label: "Test5", fields: [["树形", "nullptr"], ["输出", "无"], ["入队", "不发生"], ["覆盖", "空树提前返回"]] },
] as const;

export function LevelOrderQueueDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden border border-border bg-elevated p-4 sm:p-5">
        <svg viewBox="0 0 900 500" role="img" aria-label="二叉树按10、6、14、4、8、12、16层序访问，队列从头部取节点并在尾部加入左、右孩子。" className="mx-auto block h-auto w-full max-w-[900px]">
          <defs><marker id="level-order-arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 Z" fill="var(--accent)" /></marker></defs>
          <text x="450" y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">队头访问当前最早节点，队尾按左、右加入孩子</text>
          {[[10,450,88],[6,300,190],[14,600,190],[4,220,306],[8,380,306],[12,520,306],[16,680,306]].map(([value,x,y], index) => <g key={String(value)}><circle cx={x} cy={y} r="29" fill={index === 0 ? "var(--success)" : "var(--bg)"} fillOpacity={index === 0 ? 0.12 : 1} stroke={index === 0 ? "var(--success)" : "var(--border)"} /><text x={x} y={y + 6} textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--text-primary)">{value}</text></g>)}
          {[[432,112,318,166],[468,112,582,166],[282,214,238,280],[318,214,362,280],[582,214,538,280],[618,214,662,280]].map((line,index) => <line key={index} x1={line[0]} y1={line[1]} x2={line[2]} y2={line[3]} stroke="var(--border)" strokeWidth="2" markerEnd="url(#level-order-arrow)" />)}
          <g transform="translate(90 385)">
            <text x="0" y="28" fontSize="12" fontWeight="700" fill="var(--accent)">队头</text>
            {[10,6,14,4,8,12,16].map((value,index) => <g key={value}><rect x={56 + index * 94} y="0" width="72" height="48" fill={index === 0 ? "var(--accent)" : "var(--bg)"} fillOpacity={index === 0 ? 0.1 : 1} stroke={index === 0 ? "var(--accent)" : "var(--border)"} /><text x={92 + index * 94} y="30" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">{value}</text></g>)}
            <text x="734" y="28" fontSize="12" fontWeight="700" fill="var(--accent)">队尾</text>
          </g>
          <text x="450" y="472" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--success)">输出次序：10 → 6 → 14 → 4 → 8 → 12 → 16</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">父节点先于孩子入队，同一父节点的左孩子先于右孩子；FIFO把这两个局部顺序扩展为全树层序。</figcaption>
    </figure>
  );
}

export function FifoLayerInvariantMap() {
  const rows = [
    ["根入队后", "10", "最浅未访问层只有根"],
    ["访问10后", "6,14", "第二层按左到右排列"],
    ["访问6后", "14,4,8", "第二层残余在前，第三层孩子在后"],
    ["访问14后", "4,8,12,16", "第三层完整且保持父节点次序"],
    ["队列为空", "无", "所有可达节点恰访问一次"],
  ] as const;
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-x-auto border border-border bg-elevated p-4 sm:p-5">
        <table className="w-full min-w-[820px] border-collapse text-left text-sm">
          <thead><tr className="border-b border-border">{["时刻", "队头→队尾", "不变量含义"].map((item) => <th key={item} className="p-3 text-primary">{item}</th>)}</tr></thead>
          <tbody>{rows.map((row) => <tr key={row[0]} className="border-b border-border last:border-0">{row.map((cell,index) => <td key={cell} className={"p-3 " + (index === 1 ? "font-semibold text-accent" : "text-secondary")}>{cell}</td>)}</tr>)}</tbody>
        </table>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">队列始终先保存最浅的未访问节点；同一深度内按父节点和左右孩子顺序排列。</figcaption>
    </figure>
  );
}

export function LevelOrderWidthDiagram() {
  const rows = [
    ["完整树第1层", "1", "队列最多约1"],
    ["完整树第2层", "2", "队列最多约2到4的过渡"],
    ["完整树第3层", "4", "作者Test1峰值4"],
    ["左/右链", "每层1", "作者Test2/Test3峰值1"],
    ["一般树", "最大宽度W", "辅助空间O(W)"],
  ] as const;
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-x-auto border border-border bg-elevated p-4 sm:p-5">
        <table className="w-full min-w-[780px] border-collapse text-left text-sm">
          <thead><tr className="border-b border-border">{["形状/层", "节点数", "队列空间"].map((item) => <th key={item} className="p-3 text-primary">{item}</th>)}</tr></thead>
          <tbody>{rows.map((row) => <tr key={row[0]} className="border-b border-border last:border-0">{row.map((cell,index) => <td key={cell} className={"p-3 " + (index === 2 ? "font-semibold text-success" : "text-secondary")}>{cell}</td>)}</tr>)}</tbody>
        </table>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">时间取决于节点总数n，辅助队列取决于某一时刻并存的层前沿，最坏由树宽W控制。</figcaption>
    </figure>
  );
}

export function PrintTreeLevelOfficialCaseLab() {
  return <CodingInterviewLab cases={officialCases} caption="切换作者5组测试，核对完整树、左右偏斜、单节点和空树的不分行输出。" />;
}
