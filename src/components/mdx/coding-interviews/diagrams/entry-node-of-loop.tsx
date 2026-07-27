"use client";

import { CodingInterviewLab } from "./official-lab";

const cases = [
  {
    label: "单节点",
    fields: [["无自环", "返回空"], ["自环", "入口就是节点1"], ["环长", "1"], ["销毁", "先断环或逐节点释放"]],
  },
  {
    label: "中部入环",
    fields: [["链路", "1→2→3→4→5→3"], ["入口", "3"], ["环中节点", "3,4,5"], ["环长", "3"]],
  },
  {
    label: "头部入环",
    fields: [["链路", "1→2→3→4→5→1"], ["入口", "1"], ["直线前缀", "0"], ["环长", "5"]],
  },
  {
    label: "尾节点自环",
    fields: [["链路", "1→2→3→4→5→5"], ["入口", "5"], ["环长", "1"], ["相隔环长", "领先1步"]],
  },
  {
    label: "无环/空",
    fields: [["五节点无环", "返回空"], ["空链表", "返回空"], ["fast终点", "空或无后继"], ["入口", "不存在"]],
  },
] as const;

export function LoopMeetingDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden border border-border bg-elevated p-4 sm:p-5">
        <svg viewBox="0 0 860 400" role="img" aria-label="链表12345回到3，快慢指针在环内追及相遇。" className="mx-auto block h-auto w-full max-w-[860px]">
          <defs><marker id="loop-meet-arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 Z" fill="var(--accent)" /></marker></defs>
          <text x="430" y="34" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">slow每次一步，fast每次两步</text>
          {[1,2,3].map((value,index) => <g key={value}><rect x={62 + index * 150} y="150" width="76" height="58" rx="5" fill={value === 3 ? "var(--success)" : "var(--bg)"} fillOpacity={value === 3 ? 0.1 : 1} stroke={value === 3 ? "var(--success)" : "var(--border)"} /><text x={100 + index * 150} y="186" textAnchor="middle" fontSize="17" fontWeight="700" fill="var(--text-primary)">{value}</text>{index < 2 ? <line x1={138 + index*150} y1="179" x2={202 + index*150} y2="179" stroke="var(--border)" strokeWidth="2" markerEnd="url(#loop-meet-arrow)" /> : null}</g>)}
          <ellipse cx="626" cy="180" rx="148" ry="112" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="2" />
          {[[3,500,150],[4,626,82],[5,740,188]].map(([value,x,y]) => <g key={value}><circle cx={Number(x)} cy={Number(y)} r="34" fill={value === 4 ? "var(--warning)" : "var(--bg)"} fillOpacity={value === 4 ? 0.12 : 1} stroke={value === 4 ? "var(--warning)" : "var(--border)"} /><text x={Number(x)} y={Number(y)+6} textAnchor="middle" fontSize="17" fontWeight="700" fill="var(--text-primary)">{value}</text></g>)}
          <path d="M530 126 Q576 88 590 88" fill="none" stroke="var(--border)" strokeWidth="2" markerEnd="url(#loop-meet-arrow)" />
          <path d="M660 96 Q726 122 730 150" fill="none" stroke="var(--border)" strokeWidth="2" markerEnd="url(#loop-meet-arrow)" />
          <path d="M722 218 Q594 330 508 184" fill="none" stroke="var(--border)" strokeWidth="2" markerEnd="url(#loop-meet-arrow)" />
          <text x="626" y="354" textAnchor="middle" fontSize="11.5" fontWeight="700" fill="var(--warning)">相对速度为一步，有限环内必在某节点相遇</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">无环时fast先到空；有环时fast进入环后会追上slow。</figcaption>
    </figure>
  );
}

export function LoopLengthCountingMap() {
  const rows = [
    ["起点", "meeting", "count=1", "先把相遇节点计入"],
    ["继续前进", "meeting->next", "每过一节点加1", "只让一个指针走"],
    ["首次回到meeting", "闭合一圈", "count=L", "得到环中节点数"],
    ["L=1", "next就是自己", "count保持1", "自环正确"],
  ] as const;
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-x-auto border border-border bg-elevated p-4 sm:p-5">
        <table className="w-full min-w-[760px] border-collapse text-left text-sm">
          <thead><tr className="border-b border-border">{["阶段", "位置", "计数", "不变量"].map((item) => <th key={item} className="p-3 text-primary">{item}</th>)}</tr></thead>
          <tbody>{rows.map((row) => <tr key={row[0]} className="border-b border-border last:border-0">{row.map((cell,index) => <td key={cell} className={"p-3 " + (index === 2 ? "font-semibold text-accent" : "text-secondary")}>{cell}</td>)}</tr>)}</tbody>
        </table>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">从任意环内相遇点绕一圈，经过节点数就是环长L。</figcaption>
    </figure>
  );
}

export function LoopGapEntryDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden border border-border bg-elevated p-4 sm:p-5">
        <svg viewBox="0 0 860 340" role="img" aria-label="两个指针从头出发，一者先行环长L，随后同步在入口3相遇。" className="mx-auto block h-auto w-full max-w-[860px]">
          <defs><marker id="loop-gap-arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 Z" fill="var(--accent)" /></marker></defs>
          <text x="430" y="34" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">p1先行L步，p2从头同步追随</text>
          {[1,2,3,4,5].map((value,index) => {
            const x = 82 + index * 145;
            return <g key={value}><rect x={x} y="112" width="76" height="58" rx="5" fill={value===3 ? "var(--success)" : "var(--bg)"} fillOpacity={value===3 ? 0.1 : 1} stroke={value===3 ? "var(--success)" : "var(--border)"} /><text x={x+38} y="148" textAnchor="middle" fontSize="17" fontWeight="700" fill="var(--text-primary)">{value}</text>{index<4 ? <line x1={x+76} y1="141" x2={x+135} y2="141" stroke="var(--border)" strokeWidth="2" markerEnd="url(#loop-gap-arrow)" /> : null}</g>;
          })}
          <path d="M738 180 C786 290 344 310 410 180" fill="none" stroke="var(--accent)" strokeWidth="2.5" markerEnd="url(#loop-gap-arrow)" />
          <text x="410" y="94" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--success)">入口：两个指针首次相等</text>
          <text x="430" y="304" textAnchor="middle" fontSize="11.5" fontWeight="700" fill="var(--accent)">p1比p2多走整整一圈，落在环中同一位置</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">同步前进时保持相隔环长；p2到入口，p1多走一圈也回到入口。</figcaption>
    </figure>
  );
}

export function LoopEntryOfficialCaseLab() {
  return <CodingInterviewLab cases={cases} caption="切换作者七组测试，核对单节点自环、入口在中部/头/尾、无环和空链。" />;
}
