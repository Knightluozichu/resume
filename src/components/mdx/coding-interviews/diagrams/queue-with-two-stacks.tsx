"use client";

import { CodingInterviewLab } from "./official-lab";

const traces = [
  {
    label: "入队a,b,c",
    fields: [["操作", "appendTail(a/b/c)"], ["stack1", "底[a,b,c]顶"], ["stack2", "空"], ["队列顺序", "a,b,c"]],
  },
  {
    label: "首次出队",
    fields: [["触发", "stack2为空"], ["转移", "c,b,a依次进入stack2"], ["返回", "a"], ["剩余队列", "b,c"]],
  },
  {
    label: "中途入队d",
    fields: [["操作", "appendTail(d)"], ["stack1", "底[d]顶"], ["stack2", "仍保存c"], ["下一次返回", "c而不是d"]],
  },
  {
    label: "再次搬运",
    fields: [["触发", "旧stack2耗尽"], ["转移", "stack1中的d,e"], ["返回顺序", "d,e"], ["规则", "输出栈空才搬"]],
  },
] as const;

const tests = [
  {
    label: "官方交错序列",
    fields: [["入队", "a,b,c"], ["出队", "a,b"], ["再入队", "d后再入e"], ["最终输出", "c,d,e"]],
  },
  {
    label: "只有入队",
    fields: [["输入", "1,2,3,4"], ["stack1", "保存全部新元素"], ["stack2", "保持空"], ["代价", "每次常数"]],
  },
  {
    label: "批量出队",
    fields: [["首次", "搬运n个元素"], ["后续", "直接弹stack2"], ["顺序", "严格FIFO"], ["摊还", "每元素仅搬一次"]],
  },
  {
    label: "空队列",
    fields: [["stack1", "空"], ["stack2", "空"], ["deleteHead", "抛值类型异常"], ["要求", "不访问空栈顶"]],
  },
] as const;

export function TwoStackQueueFlowDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden border border-border bg-elevated p-4 sm:p-5">
        <svg
          viewBox="0 0 820 390"
          role="img"
          aria-label="新元素进入stack1，只有stack2为空时才整体翻转，队头从stack2弹出。"
          className="mx-auto block h-auto w-full max-w-[820px]"
        >
          <defs>
            <marker id="queue-arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
              <path d="M0 0 L8 4 L0 8 Z" fill="var(--accent)" />
            </marker>
          </defs>
          <text x="410" y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">两次LIFO反转得到FIFO</text>
          <rect x="48" y="76" width="210" height="238" rx="5" fill="var(--bg)" stroke="var(--border)" />
          <rect x="562" y="76" width="210" height="238" rx="5" fill="var(--bg)" stroke="var(--border)" />
          <text x="153" y="104" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--text-primary)">stack1：输入栈</text>
          <text x="667" y="104" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--text-primary)">stack2：输出栈</text>
          {["a 最老", "b", "c 最新"].map((label, index) => (
            <g key={label}>
              <rect x="80" y={240 - index * 48} width="146" height="36" rx="4" fill="var(--accent)" fillOpacity={0.08 + index * 0.04} stroke="var(--accent)" />
              <text x="153" y={263 - index * 48} textAnchor="middle" fontSize="11" fill="var(--text-primary)">{label}</text>
            </g>
          ))}
          {["c 最新", "b", "a 最老"].map((label, index) => (
            <g key={label}>
              <rect x="594" y={240 - index * 48} width="146" height="36" rx="4" fill="var(--success)" fillOpacity={0.08 + index * 0.04} stroke="var(--success)" />
              <text x="667" y={263 - index * 48} textAnchor="middle" fontSize="11" fill="var(--text-primary)">{label}</text>
            </g>
          ))}
          <path d="M270 164 C360 108 460 108 550 164" fill="none" stroke="var(--accent)" strokeWidth="3" strokeDasharray="6 4" markerEnd="url(#queue-arrow)" />
          <text x="410" y="116" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--accent)">仅当stack2为空：逐个搬运全部元素</text>
          <path d="M153 60 L153 92" stroke="var(--accent)" strokeWidth="3" markerEnd="url(#queue-arrow)" />
          <text x="153" y="50" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">appendTail</text>
          <path d="M667 168 L667 132" stroke="var(--accent)" strokeWidth="3" markerEnd="url(#queue-arrow)" />
          <text x="735" y="142" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">deleteHead</text>
          <rect x="164" y="336" width="492" height="34" rx="5" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" />
          <text x="410" y="358" textAnchor="middle" fontSize="11" fill="var(--text-primary)">输出栈未空时，新入队元素留在输入栈，不能越过旧元素。</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">第一次反转发生在入栈，第二次反转发生在跨栈搬运，队列顺序因此恢复。</figcaption>
    </figure>
  );
}

export function QueueStateInvariantMap() {
  const rows = [
    ["stack2非空", "栈顶是当前队头", "只从stack2弹出", "禁止再次搬运"],
    ["stack2空、stack1非空", "队头在stack1栈底", "全部搬到stack2再弹出", "一次完整反转"],
    ["两个栈都空", "队列为空", "报告空队列", "禁止top/pop"],
  ] as const;
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-x-auto border border-border bg-elevated p-4 sm:p-5">
        <table className="w-full min-w-[720px] border-collapse text-left text-sm">
          <thead><tr className="border-b border-border">{["状态", "队头位置", "deleteHead动作", "约束"].map((item) => <th key={item} className="p-3 text-primary">{item}</th>)}</tr></thead>
          <tbody>{rows.map((row) => <tr key={row[0]} className="border-b border-border last:border-0">{row.map((cell, index) => <td key={cell} className={"p-3 " + (index === 2 ? "font-semibold text-accent" : "text-secondary")}>{cell}</td>)}</tr>)}</tbody>
        </table>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">两个栈共同表示一条逻辑队列，输出栈中的旧元素始终优先。</figcaption>
    </figure>
  );
}

export function QueueOperationTraceLab() {
  return <CodingInterviewLab cases={traces} caption="按官方交错操作切换状态，观察新旧元素为什么不会串序。" />;
}

export function QueueAmortizedCostLab() {
  return <CodingInterviewLab cases={tests} caption="从元素生命周期和边界序列验证正确性与摊还常数代价。" />;
}
