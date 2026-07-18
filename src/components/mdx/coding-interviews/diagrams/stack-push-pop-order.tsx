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
  const rows = [
    ["目标4", "push 1,2,3,4", "1,2,3,4", "pop 4"],
    ["目标5", "push 5", "1,2,3,5", "pop 5"],
    ["目标3", "无需push", "1,2,3", "pop 3"],
    ["目标2", "无需push", "1,2", "pop 2"],
    ["目标1", "无需push", "1", "pop 1"],
  ] as const;
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-x-auto border border-border bg-elevated p-4 sm:p-5">
        <table className="w-full min-w-[820px] border-collapse text-left text-sm">
          <thead><tr className="border-b border-border">{["待弹出", "为匹配而压入", "匹配前辅助栈", "强制动作"].map((item) => <th key={item} className="p-3 text-primary">{item}</th>)}</tr></thead>
          <tbody>{rows.map((row) => <tr key={row[0]} className="border-b border-border last:border-0">{row.map((cell, index) => <td key={cell} className={"p-3 " + (index === 3 ? "font-semibold text-success" : "text-secondary")}>{cell}</td>)}</tr>)}</tbody>
        </table>
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
