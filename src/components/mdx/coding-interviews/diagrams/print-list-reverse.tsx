"use client";

import { CodingInterviewLab } from "./official-lab";

const unwindCases = [
  { label: "进入节点1", fields: [["调用", "visit(1)"], ["动作", "先调用visit(2)"], ["输出", "暂不输出1"], ["栈帧", "保存返回到节点1的位置"]] },
  { label: "进入节点2/3", fields: [["调用", "visit(2) → visit(3)"], ["动作", "继续沿next前进"], ["输出", "仍为空"], ["栈帧", "1、2、3逐层压入"]] },
  { label: "越过尾节点", fields: [["调用", "visit(null)"], ["基线", "立即返回"], ["转折", "开始逐层弹出"], ["输出", "尚未写值"]] },
  { label: "回溯输出", fields: [["顺序", "3 → 2 → 1"], ["原因", "后调用的栈帧先返回"], ["结构", "后进先出"], ["风险", "链表过长会耗尽调用栈"]] },
] as const;

const strategies = [
  { label: "递归回溯", fields: [["时间", "O(n)"], ["额外空间", "O(n)调用栈"], ["输入修改", "不修改"], ["边界", "深链表可能栈溢出"]] },
  { label: "显式栈", fields: [["时间", "O(n)"], ["额外空间", "O(n)容器"], ["输入修改", "不修改"], ["收益", "深度不占用递归调用栈"]] },
  { label: "反转再恢复", fields: [["时间", "O(n)"], ["额外空间", "O(1)"], ["输入修改", "临时修改next"], ["风险", "异常或并发观察到破坏状态"]] },
  { label: "重复扫描", fields: [["时间", "O(n²)"], ["额外空间", "O(1)"], ["输入修改", "不修改"], ["用途", "只在极端空间约束下讨论"]] },
] as const;

export function LinkedListDirectionDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden border border-border bg-elevated p-4 sm:p-5">
        <svg viewBox="0 0 780 360" role="img" aria-label="单向链表1到2到3只能沿next正向遍历，把节点压栈后按3、2、1弹出即可逆序输出且不修改链接。" className="mx-auto block h-auto w-full max-w-[780px]">
          <text x="390" y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">链表只给向前边，逆序输出需要记住走过的节点</text>
          {[1,2,3].map((value, index) => { const x = 110 + index * 180; return <g key={value}><rect x={x} y="72" width="108" height="58" rx="5" fill="var(--bg)" stroke="var(--accent)" /><text x={x + 54} y="106" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">{value}</text>{index < 2 ? <g><path d={`M${x + 108} 101 H${x + 164}`} stroke="var(--accent)" strokeWidth="2" /><path d={`M${x + 164} 101 l-10 -6 v12 z`} fill="var(--accent)" /></g> : null}</g>; })}
          <text x="650" y="106" fontSize="11" fill="var(--text-secondary)">null</text>
          <path d="M164 150 C164 190 524 190 524 150" fill="none" stroke="var(--warning)" strokeWidth="2" strokeDasharray="5 4" />
          <text x="344" y="205" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--warning)">正向遍历：1 → 2 → 3</text>
          {[1,2,3].map((value, index) => <g key={`stack-${value}`}><rect x={310} y={292 - index * 42} width="160" height="36" fill="var(--success)" fillOpacity={0.05 + index * 0.02} stroke="var(--success)" /><text x="390" y={315 - index * 42} textAnchor="middle" fontSize="11" fill="var(--text-primary)">节点 {value}</text></g>)}
          <path d="M492 264 H552" stroke="var(--success)" strokeWidth="2" /><path d="M552 264 l-10 -6 v12 z" fill="var(--success)" />
          <text x="620" y="258" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--success)">弹出输出</text>
          <text x="620" y="279" textAnchor="middle" fontSize="13" fill="var(--text-primary)">3 → 2 → 1</text>
          <rect x="92" y="326" width="596" height="26" rx="5" fill="var(--accent)" fillOpacity="0.06" stroke="var(--border)" />
          <text x="390" y="344" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">next指针始终保持1→2→3，逆序只发生在输出次序。</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">显式栈保存节点指针，递归则把同样的信息隐式保存在调用栈帧中。</figcaption>
    </figure>
  );
}

export function OutputContractMap() {
  const rows = [
    ["输入", "只读单向链表头", "不改value与next"],
    ["输出", "尾到头的值序列或回调", "不把I/O硬编码进算法"],
    ["空链表", "输出空序列", "不解引用null"],
    ["有环链表", "不属于默认契约", "需先检测或限制步数"],
  ] as const;
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-x-auto border border-border bg-elevated p-4 sm:p-5"><table className="w-full min-w-[620px] border-collapse text-left text-sm"><thead><tr className="border-b border-border"><th className="p-3 text-primary">维度</th><th className="p-3 text-primary">契约</th><th className="p-3 text-primary">验证</th></tr></thead><tbody>{rows.map((row) => <tr key={row[0]} className="border-b border-border last:border-0">{row.map((cell) => <td key={cell} className="p-3 text-secondary">{cell}</td>)}</tr>)}</tbody></table></div>
      <figcaption className="mt-2 text-center text-sm text-secondary">把“打印”抽象为值序列或回调，才能测试顺序并与终端I/O解耦。</figcaption>
    </figure>
  );
}

export function StackUnwindLab() {
  return <CodingInterviewLab cases={unwindCases} caption="切换递归阶段，观察输出为什么只在越过尾节点后发生。" />;
}

export function StrategyTradeoffMap() {
  return <CodingInterviewLab cases={strategies} caption="比较递归、显式栈、反转恢复和重复扫描的时间、空间与副作用。" />;
}
