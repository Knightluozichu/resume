"use client";

import { CodingInterviewLab } from "./official-lab";

const officialCases = [
  { label: "Test1", fields: [["树形", "8；6/10；5,7,9,11"], ["第1行", "8"], ["第2行", "6,10"], ["第3行", "5,7,9,11"]] },
  { label: "Test2", fields: [["树形", "5→左4→左3→左2"], ["输出", "每层一个值"], ["行数", "4"], ["覆盖", "全左链"]] },
  { label: "Test3", fields: [["树形", "5→右4→右3→右2"], ["输出", "每层一个值"], ["行数", "4"], ["覆盖", "全右链"]] },
  { label: "Test4", fields: [["树形", "单节点5"], ["输出", "一行5"], ["换行", "一次"], ["覆盖", "最小非空树"]] },
  { label: "Test5", fields: [["树形", "nullptr"], ["输出", "无"], ["换行", "无"], ["覆盖", "空树"]] },
  { label: "Test6", fields: [["树形", "100→左50→右150"], ["输出", "100 / 50 / 150"], ["行数", "3"], ["覆盖", "方向交替稀疏树"]] },
] as const;

export function TreeLineCounterDiagram() {
  const rows = [
    ["进入根层", "8", "1", "0"],
    ["处理8，加入6/10", "6,10", "0", "2"],
    ["换行并转移", "6,10", "2", "0"],
    ["处理6，加入5/7", "10,5,7", "1", "2"],
    ["处理10，加入9/11", "5,7,9,11", "0", "4"],
    ["换行并转移", "5,7,9,11", "4", "0"],
  ] as const;
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-x-auto border border-border bg-elevated p-4 sm:p-5">
        <table className="w-full min-w-[860px] border-collapse text-left text-sm">
          <thead><tr className="border-b border-border">{["时刻", "队头→队尾", "toBePrinted", "nextLevel"].map((item) => <th key={item} className="p-3 text-primary">{item}</th>)}</tr></thead>
          <tbody>{rows.map((row) => <tr key={row[0]} className="border-b border-border last:border-0">{row.map((cell,index) => <td key={cell} className={"p-3 " + (index > 1 ? "font-semibold text-accent" : "text-secondary")}>{cell}</td>)}</tr>)}</tbody>
        </table>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">当前层计数归零的瞬间，下一层节点已经全部进入队列，二者可安全转移并换行。</figcaption>
    </figure>
  );
}

export function TreeLineBoundaryMap() {
  const rows = [
    ["出队并打印节点", "toBePrinted减1", "消费当前层一个位置"],
    ["左孩子非空入队", "nextLevel加1", "登记下一层一个节点"],
    ["右孩子非空入队", "nextLevel加1", "维持同层左到右"],
    ["toBePrinted不为0", "不换行", "当前层尚有节点"],
    ["toBePrinted等于0", "换行；赋值nextLevel；清零nextLevel", "层边界完成"],
  ] as const;
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-x-auto border border-border bg-elevated p-4 sm:p-5">
        <table className="w-full min-w-[860px] border-collapse text-left text-sm">
          <thead><tr className="border-b border-border">{["事件", "计数更新", "语义"].map((item) => <th key={item} className="p-3 text-primary">{item}</th>)}</tr></thead>
          <tbody>{rows.map((row) => <tr key={row[0]} className="border-b border-border last:border-0">{row.map((cell,index) => <td key={cell} className={"p-3 " + (index === 1 ? "font-semibold text-success" : "text-secondary")}>{cell}</td>)}</tr>)}</tbody>
        </table>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">两个计数器分别记账，换行只发生在当前层最后一个节点完成之后。</figcaption>
    </figure>
  );
}

export function TreeLineStrategyMap() {
  const rows = [
    ["作者双计数", "逐节点递减当前层、累加下一层", "流式printf", "精确体现状态转移"],
    ["层首快照", "每层开始缓存queue.size()", "二维结果更自然", "固定循环次数"],
    ["哨兵nullptr", "层尾加入空标记", "不推荐默认使用", "多一次特殊分支"],
    ["两个队列", "current与next交换", "边界直观", "容器状态更多"],
  ] as const;
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-x-auto border border-border bg-elevated p-4 sm:p-5">
        <table className="w-full min-w-[860px] border-collapse text-left text-sm">
          <thead><tr className="border-b border-border">{["方案", "层边界来源", "适合输出", "特点"].map((item) => <th key={item} className="p-3 text-primary">{item}</th>)}</tr></thead>
          <tbody>{rows.map((row) => <tr key={row[0]} className="border-b border-border last:border-0">{row.map((cell,index) => <td key={cell} className={"p-3 " + (index === 0 ? "font-semibold text-accent" : "text-secondary")}>{cell}</td>)}</tr>)}</tbody>
        </table>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">四种方法时间和渐进队列空间相同；作者源码应优先按双计数器理解。</figcaption>
    </figure>
  );
}

export function PrintTreeLinesOfficialCaseLab() {
  return <CodingInterviewLab cases={officialCases} caption="切换作者6组测试，核对完整树、左右链、单点、空树和方向交替稀疏树的逐行输出。" />;
}
