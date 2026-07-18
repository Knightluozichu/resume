"use client";

import { CodingInterviewLab } from "./official-lab";

const cases = [
  {
    label: "中间目标",
    fields: [["链表", "1→2→3→4→5"], ["k", "2"], ["ahead终点", "5"], ["behind结果", "4"]],
  },
  {
    label: "两端目标",
    fields: [["k=1", "返回尾节点5"], ["领先", "0步"], ["k=5", "返回头节点1"], ["领先", "4步"]],
  },
  {
    label: "长度不足",
    fields: [["链表长度", "5"], ["k", "6"], ["先行阶段", "无法走满5步"], ["结果", "空"]],
  },
  {
    label: "非法输入",
    fields: [["空链表,k=100", "空"], ["非空链表,k=0", "空"], ["计数规则", "从1开始"], ["负数", "入口应拒绝"]],
  },
] as const;

export function KthGapDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden border border-border bg-elevated p-4 sm:p-5">
        <svg viewBox="0 0 860 360" role="img" aria-label="五节点链表中快指针领先慢指针一条边，最终定位倒数第二节点。" className="mx-auto block h-auto w-full max-w-[860px]">
          <defs><marker id="kth-gap-arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 Z" fill="var(--accent)" /></marker></defs>
          <text x="430" y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">k=2：ahead始终领先behind一条边</text>
          {[1,2,3,4,5].map((value,index) => {
            const x = 110 + index * 145;
            return <g key={value}>
              <rect x={x} y="112" width="76" height="58" rx="5" fill={value === 4 ? "var(--success)" : "var(--bg)"} fillOpacity={value === 4 ? 0.1 : 1} stroke={value === 4 ? "var(--success)" : "var(--border)"} />
              <text x={x + 38} y="148" textAnchor="middle" fontSize="17" fontWeight="700" fill="var(--text-primary)">{value}</text>
              {index < 4 ? <line x1={x + 76} y1="141" x2={x + 135} y2="141" stroke="var(--border)" strokeWidth="2" markerEnd="url(#kth-gap-arrow)" /> : null}
            </g>;
          })}
          <path d="M148 226 C250 284 600 284 728 226" fill="none" stroke="var(--accent)" strokeWidth="2.5" markerEnd="url(#kth-gap-arrow)" />
          <text x="438" y="300" textAnchor="middle" fontSize="11.5" fontWeight="700" fill="var(--accent)">同步移动到 ahead=5，behind=4</text>
          <text x="583" y="206" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--success)">behind</text>
          <text x="728" y="206" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--accent)">ahead</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">领先k-1条边等价于两个指针覆盖k个节点，快指针到尾时慢指针正是目标。</figcaption>
    </figure>
  );
}

export function KthPointerInvariantMap() {
  const rows = [
    ["先行完成", "ahead在第k个节点", "behind在头节点", "相差k-1条边"],
    ["同步移动中", "同时前进一步", "同时前进一步", "间隔保持不变"],
    ["ahead到尾", "正数第n个", "正数第n-k+1个", "behind为倒数第k个"],
    ["先行失败", "未满k-1步已到尾", "尚未启动", "链表长度小于k"],
  ] as const;
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-x-auto border border-border bg-elevated p-4 sm:p-5">
        <table className="w-full min-w-[780px] border-collapse text-left text-sm">
          <thead><tr className="border-b border-border">{["时刻", "ahead", "behind", "不变量"].map((item) => <th key={item} className="p-3 text-primary">{item}</th>)}</tr></thead>
          <tbody>{rows.map((row) => <tr key={row[0]} className="border-b border-border last:border-0">{row.map((cell,index) => <td key={cell} className={"p-3 " + (index === 3 ? "font-semibold text-accent" : "text-secondary")}>{cell}</td>)}</tr>)}</tbody>
        </table>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">算法只需保持固定间隔，不必预先知道链表总长度n。</figcaption>
    </figure>
  );
}

export function KthBoundaryDiagram() {
  const rows = [
    ["head为空", "没有可定位节点", "立即返回空"],
    ["k=0", "倒数计数从1开始", "立即返回空"],
    ["k=1", "先行0步", "同步后返回尾节点"],
    ["k=长度", "先行到尾", "behind保持头节点"],
    ["k大于长度", "先行途中无后继", "立即返回空"],
  ] as const;
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-x-auto border border-border bg-elevated p-4 sm:p-5">
        <table className="w-full min-w-[720px] border-collapse text-left text-sm">
          <thead><tr className="border-b border-border">{["输入", "原因", "结果"].map((item) => <th key={item} className="p-3 text-primary">{item}</th>)}</tr></thead>
          <tbody>{rows.map((row) => <tr key={row[0]} className="border-b border-border last:border-0">{row.map((cell,index) => <td key={cell} className={"p-3 " + (index === 2 ? "font-semibold text-accent" : "text-secondary")}>{cell}</td>)}</tr>)}</tbody>
        </table>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">三类防御检查分别保护空结构、非法计数和先行越界。</figcaption>
    </figure>
  );
}

export function KthOfficialCaseLab() {
  return <CodingInterviewLab cases={cases} caption="切换作者六组测试，核对中间、头尾、长度不足、k为0与空链表。" />;
}
