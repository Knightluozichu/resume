"use client";

import { CodingInterviewLab } from "./official-lab";

const officialCases = [
  { label: "Test1", fields: [["操作", "push 3"], ["数据栈", "3"], ["辅助栈", "3"], ["min", "3"]] },
  { label: "Test2", fields: [["操作", "push 4"], ["数据栈", "3,4"], ["辅助栈", "3,3"], ["min", "3"]] },
  { label: "Test3", fields: [["操作", "push 2"], ["数据栈", "3,4,2"], ["辅助栈", "3,3,2"], ["min", "2"]] },
  { label: "Test4", fields: [["操作", "push 3"], ["数据栈", "3,4,2,3"], ["辅助栈", "3,3,2,2"], ["min", "2"]] },
  { label: "Test5", fields: [["操作", "pop 3"], ["数据栈", "3,4,2"], ["辅助栈", "3,3,2"], ["min", "2"]] },
  { label: "Test6", fields: [["操作", "pop 2"], ["数据栈", "3,4"], ["辅助栈", "3,3"], ["min", "3"]] },
  { label: "Test7", fields: [["操作", "pop 4"], ["数据栈", "3"], ["辅助栈", "3"], ["min", "3"]] },
  { label: "Test8", fields: [["操作", "push 0"], ["数据栈", "3,0"], ["辅助栈", "3,0"], ["min", "0"]] },
] as const;

export function MinStackSnapshotDiagram() {
  const data = [3, 4, 2, 3];
  const minima = [3, 3, 2, 2];
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden border border-border bg-elevated p-4 sm:p-5">
        <svg viewBox="0 0 860 470" role="img" aria-label="数据栈保存3、4、2、3，等高辅助栈逐层保存3、3、2、2。" className="mx-auto block h-auto w-full max-w-[860px]">
          <defs><marker id="min-stack-arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 Z" fill="var(--accent)" /></marker></defs>
          <text x="430" y="34" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">同一深度：真实值 ↔ 该前缀的最小值快照</text>
          <text x="245" y="72" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">m_data</text>
          <text x="615" y="72" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">m_min</text>
          {data.map((value, index) => {
            const y = 338 - index * 72;
            return <g key={"data-" + index}><rect x="175" y={y} width="140" height="56" fill="var(--bg)" stroke="var(--border)" /><text x="245" y={y + 34} textAnchor="middle" fontSize="17" fontWeight="700" fill="var(--text-primary)">{value}</text><line x1="325" y1={y + 28} x2="535" y2={y + 28} stroke="var(--accent)" strokeWidth="2" markerEnd="url(#min-stack-arrow)" /><text x="430" y={y + 18} textAnchor="middle" fontSize="11" fill="var(--text-secondary)">前缀最小</text></g>;
          })}
          {minima.map((value, index) => {
            const y = 338 - index * 72;
            return <g key={"min-" + index}><rect x="545" y={y} width="140" height="56" fill="var(--success)" fillOpacity="0.1" stroke="var(--success)" /><text x="615" y={y + 34} textAnchor="middle" fontSize="17" fontWeight="700" fill="var(--text-primary)">{value}</text></g>;
          })}
          <text x="430" y="438" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--accent)">栈顶同时弹出后，下一层快照立即恢复为当前最小值</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">作者为每个数据层保存一份前缀最小值，辅助栈不是候选集合，而是等长历史快照。</figcaption>
    </figure>
  );
}

export function MinStackInvariantMap() {
  const rows = [
    ["空栈", "data与min都为空", "不可查询top/min"],
    ["push(value)", "先压data，再压min(value, oldMin)", "高度同时加1"],
    ["pop()", "data与min各弹一层", "高度同时减1"],
    ["min()", "读取m_min.top()", "等于当前data全栈最小值"],
    ["任意深度i", "m_min[i]等于m_data[0..i]最小值", "前缀不变量"],
  ] as const;
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-x-auto border border-border bg-elevated p-4 sm:p-5">
        <table className="w-full min-w-[820px] border-collapse text-left text-sm">
          <thead><tr className="border-b border-border">{["时刻/操作", "保持的关系", "可得结论"].map((item) => <th key={item} className="p-3 text-primary">{item}</th>)}</tr></thead>
          <tbody>{rows.map((row) => <tr key={row[0]} className="border-b border-border last:border-0">{row.map((cell, index) => <td key={cell} className={"p-3 " + (index === 1 ? "font-semibold text-accent" : "text-secondary")}>{cell}</td>)}</tr>)}</tbody>
        </table>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">等高关系保证栈顶快照与当前数据状态一一对应，归纳证明只需检查push和pop。</figcaption>
    </figure>
  );
}

export function MinStackOperationMap() {
  const rows = [
    ["push", "数据栈1次push；辅助栈1次top和push", "O(1)", "可能复制两份T"],
    ["pop", "两个栈同步pop", "O(1)", "空栈需防御"],
    ["top", "读取数据栈栈顶", "O(1)", "返回引用有生命周期约束"],
    ["min", "读取辅助栈栈顶", "O(1)", "发布版不能只依赖assert"],
    ["size/empty", "查询数据栈", "O(1)", "调试时可核对两栈等高"],
  ] as const;
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-x-auto border border-border bg-elevated p-4 sm:p-5">
        <table className="w-full min-w-[840px] border-collapse text-left text-sm">
          <thead><tr className="border-b border-border">{["接口", "状态变化", "时间", "工程注意"].map((item) => <th key={item} className="p-3 text-primary">{item}</th>)}</tr></thead>
          <tbody>{rows.map((row) => <tr key={row[0]} className="border-b border-border last:border-0">{row.map((cell, index) => <td key={cell} className={"p-3 " + (index === 2 ? "font-semibold text-success" : "text-secondary")}>{cell}</td>)}</tr>)}</tbody>
        </table>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">常数时间来自预先维护派生状态，代价是O(n)辅助空间与同步更新责任。</figcaption>
    </figure>
  );
}

export function MinStackOfficialCaseLab() {
  return <CodingInterviewLab cases={officialCases} caption="切换作者8次官方检查，跟踪数据栈、等高辅助栈和每一步min结果。" />;
}
