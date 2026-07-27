"use client";

import { CodingInterviewLab } from "./official-lab";

const officialCases = [
  { label: "Test1", fields: [["压入", "1,2,3,4,5"], ["弹出", "4,5,3,2,1"], ["关键过程", "压到4弹4；压5后连续回退"], ["结果", "true"]] },
  { label: "Test2", fields: [["压入", "1,2,3,4,5"], ["弹出", "3,5,4,2,1"], ["关键过程", "弹3；压4,5；弹5,4"], ["结果", "true"]] },
  { label: "Test3", fields: [["压入", "1,2,3,4,5"], ["弹出", "4,3,5,1,2"], ["阻塞", "目标1时栈顶2"], ["结果", "false"]] },
  { label: "Test4", fields: [["压入", "1,2,3,4,5"], ["弹出", "3,5,4,1,2"], ["阻塞", "目标1时栈顶2"], ["结果", "false"]] },
  { label: "Test5", fields: [["压入", "1"], ["弹出", "2"], ["阻塞", "输入耗尽且栈顶1"], ["结果", "false"]] },
  { label: "Test6", fields: [["压入", "1"], ["弹出", "1"], ["辅助栈", "最终为空"], ["结果", "true"]] },
  { label: "Test7", fields: [["压入指针", "nullptr"], ["弹出指针", "nullptr"], ["长度", "0"], ["结果", "false"]] },
] as const;

export function StackSequenceSimulationDiagram() {
  const stack = ["4", "3", "2", "1"]; // 顶在上方
  const boxW = 84;
  const boxH = 42;
  const stackX = 368;
  const sy = (i: number) => 84 + i * (boxH + 4);
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden border border-border bg-elevated p-4 sm:p-5">
        <svg
          viewBox="0 0 820 400"
          role="img"
          aria-label="栈的压入弹出序列模拟图。压入顺序 1、2、3、4、5，弹出顺序 4、5、3、2、1。用一个辅助栈模拟：为了弹出 4，先压入 1、2、3、4，此时栈顶为 4 与目标相同→弹出 4；接着压 5 弹 5；随后栈顶 3、2、1 依次与目标相同直接弹出。规则：栈顶等于目标就弹出，否则压入下一个输入；输入耗尽且栈顶仍不等于目标则 false。"
          className="mx-auto block h-auto w-full max-w-[820px]"
        >
          <defs>
            <marker id="stack-arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 Z" fill="var(--accent)" /></marker>
          </defs>
          <text x="410" y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">辅助栈模拟：栈顶 == 目标就弹，否则继续压</text>
          {/* 压入序列 */}
          <text x="120" y="66" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--text-primary)">压入序列</text>
          {[1, 2, 3, 4, 5].map((v, i) => (
            <g key={v}>
              <rect x={70 + i * 46} y={76} width={40} height={36} rx="5" fill="var(--bg)" stroke="var(--border)" strokeWidth="1.2" />
              <text x={90 + i * 46} y={99} textAnchor="middle" fontSize="14" fontWeight="700" fontFamily="monospace" fill="var(--text-primary)">{v}</text>
            </g>
          ))}
          <path d="M 200 130 C 260 150 320 120 360 100" fill="none" stroke="var(--accent)" strokeWidth="1.6" markerEnd="url(#stack-arrow)" />
          <text x="250" y="160" fontSize="11" fill="var(--accent)">push</text>
          {/* 辅助栈 */}
          <text x={stackX + boxW / 2} y="70" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--text-primary)">辅助栈</text>
          {stack.map((v, i) => (
            <g key={i}>
              <rect x={stackX} y={sy(i)} width={boxW} height={boxH} rx="5" fill={i === 0 ? "var(--success)" : "var(--bg)"} fillOpacity={i === 0 ? 0.14 : 1} stroke={i === 0 ? "var(--success)" : "var(--border)"} strokeWidth={i === 0 ? 1.8 : 1.2} />
              <text x={stackX + boxW / 2} y={sy(i) + boxH / 2 + 5} textAnchor="middle" fontSize="15" fontWeight="800" fontFamily="monospace" fill={i === 0 ? "var(--success)" : "var(--text-primary)"}>{v}</text>
            </g>
          ))}
          <text x={stackX + boxW + 12} y={sy(0) + boxH / 2 + 4} fontSize="11" fontWeight="700" fill="var(--success)">← 栈顶 4 == 目标 4，pop</text>
          {/* 弹出序列 */}
          <text x="660" y="66" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--text-primary)">弹出序列</text>
          {[4, 5, 3, 2, 1].map((v, i) => (
            <g key={v}>
              <rect x={610 + i * 40} y={76} width={34} height={36} rx="5" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
              <text x={627 + i * 40} y={99} textAnchor="middle" fontSize="14" fontWeight="700" fontFamily="monospace" fill="var(--success)">{v}</text>
            </g>
          ))}
          {/* 规则 */}
          <text x="410" y="316" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--success)">4,5,3,2,1 合法：每个目标出现在栈顶时立即弹出 → true</text>
          <text x="410" y="344" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">栈顶 == 目标 → 弹出并移动目标指针；否则压入下一个输入。</text>
          <text x="410" y="368" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">输入耗尽且栈顶 != 目标 → false（如 4,3,5,1,2：2 压在 1 上却要求 1 先弹）。</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">合法序列4,5,3,2,1：每个目标出现于栈顶时立即弹出，否则只能继续按给定顺序压栈。</figcaption>
    </figure>
  );
}

export function StackTargetDecisionMap() {
  const rows = [
    ["辅助栈顶等于目标", "弹出栈顶并移动目标指针", "继续压栈只会延迟同一目标"],
    ["栈空或栈顶不等于目标", "压入下一个输入", "当前不能弹出非栈顶元素"],
    ["输入已耗尽且栈顶不等于目标", "立即false", "再无元素能改变栈顶覆盖关系"],
    ["所有目标已消费且辅助栈为空", "返回true", "每个输入均被合法压入和弹出"],
    ["指针为空或长度不正", "作者返回false", "原源码的输入契约"],
  ] as const;
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-x-auto border border-border bg-elevated p-4 sm:p-5">
        <table className="w-full min-w-[860px] border-collapse text-left text-sm">
          <thead><tr className="border-b border-border">{["状态", "唯一安全动作", "理由"].map((item) => <th key={item} className="p-3 text-primary">{item}</th>)}</tr></thead>
          <tbody>{rows.map((row) => <tr key={row[0]} className="border-b border-border last:border-0">{row.map((cell, index) => <td key={cell} className={"p-3 " + (index === 1 ? "font-semibold text-accent" : "text-secondary")}>{cell}</td>)}</tr>)}</tbody>
        </table>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">模拟不是搜索全部操作树：目标与栈顶是否相等，已经决定了不会丢失解的动作。</figcaption>
    </figure>
  );
}

export function StackSequenceCounterexampleDiagram() {
  const rows = [
    ["4", "压1,2,3,4后弹4", "1,2,3", "可继续"],
    ["3", "栈顶直接弹3", "1,2", "可继续"],
    ["5", "压5后弹5", "1,2", "可继续"],
    ["1", "输入已经全部压完", "1,2（顶为2）", "阻塞"],
    ["结论", "不能越过2先弹1", "2必须先于1离开", "false"],
  ] as const;
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-x-auto border border-border bg-elevated p-4 sm:p-5">
        <table className="w-full min-w-[840px] border-collapse text-left text-sm">
          <thead><tr className="border-b border-border">{["目标", "操作", "辅助栈", "状态"].map((item) => <th key={item} className="p-3 text-primary">{item}</th>)}</tr></thead>
          <tbody>{rows.map((row) => <tr key={row[0]} className="border-b border-border last:border-0">{row.map((cell, index) => <td key={cell} className={"p-3 " + (index === 3 && (cell === "阻塞" || cell === "false") ? "font-semibold text-danger" : "text-secondary")}>{cell}</td>)}</tr>)}</tbody>
        </table>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">非法序列4,3,5,1,2的首个矛盾：2压在1上方，却要求1先弹出。</figcaption>
    </figure>
  );
}

export function StackPushPopOfficialCaseLab() {
  return <CodingInterviewLab cases={officialCases} caption="切换作者7组官方测试，核对两个合法序列、两个阻塞序列、单元素与空指针契约。" />;
}
