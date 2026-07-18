"use client";

import { useState } from "react";

import { CodingInterviewLab } from "./official-lab";

const pathStates = [
  { label: "起点", left: "1 → 2 → 4", right: "1 → 2 → 5", cursor: "尚未比较", last: "nullptr", note: "两条路径都只保存目标节点之前的祖先" },
  { label: "比较 1", left: "[1] → 2 → 4", right: "[1] → 2 → 5", cursor: "相同", last: "1", note: "根节点身份一致，更新最后公共节点" },
  { label: "比较 2", left: "1 → [2] → 4", right: "1 → [2] → 5", cursor: "相同", last: "2", note: "第二个祖先仍相同，答案推进到 2" },
  { label: "比较 4/5", left: "1 → 2 → [4]", right: "1 → 2 → [5]", cursor: "不同", last: "2", note: "路径从此分叉；有效树中不会在后面重新汇合" },
] as const;

const officialCases = [
  { label: "普通多叉树", fields: [["目标", "6 与 8"], ["路径", "1,2,4 / 1,2,5"], ["结果", "2"], ["用途", "不同子树分叉"]] },
  { label: "退化链", fields: [["目标", "5 与 4"], ["路径", "1,2,3,4 / 1,2,3"], ["结果", "3"], ["用途", "严格公共父节点"]] },
  { label: "节点不在树中", fields: [["目标", "5 与独立节点 6"], ["第二路径", "空"], ["结果", "nullptr"], ["用途", "成员校验"]] },
  { label: "空输入", fields: [["根", "nullptr"], ["两个节点", "nullptr"], ["结果", "nullptr"], ["用途", "入口防御"]] },
] as const;

function NodeBadge({ value, tone = "default" }: { value: string; tone?: "default" | "left" | "right" | "both" }) {
  const color =
    tone === "both"
      ? "border-success bg-success/15 text-success"
      : tone === "left"
        ? "border-accent bg-accent/15 text-accent"
        : tone === "right"
          ? "border-warning bg-warning/15 text-warning"
          : "border-border bg-background text-primary";
  return <span className={"grid size-9 place-items-center border text-sm font-semibold " + color}>{value}</span>;
}

export function CommonParentDecisionMap() {
  const rows = [
    ["二叉搜索树", "左右孩子 + 有序键", "比较两个目标值与当前值", "首个落在两值区间内的节点", "O(h) / O(1)"],
    ["有父指针的树", "每个节点可向父亲移动", "把两条上行链视为链表", "对齐深度后首个相同节点", "O(h) / O(1)"],
    ["普通树，无父指针", "只有根和孩子列表", "分别保存根到目标的路径", "两条路径最后公共节点", "O(n) / O(h)"],
  ] as const;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-x-auto border border-border bg-elevated p-4 sm:p-5">
        <table className="w-full min-w-[980px] border-collapse text-left text-sm">
          <thead><tr className="border-b border-border">{["树结构", "可用信息", "转化", "答案位置", "复杂度"].map((item) => <th key={item} className="p-3 text-primary">{item}</th>)}</tr></thead>
          <tbody>{rows.map((row) => <tr key={row[0]} className="border-b border-border last:border-0">{row.map((cell, index) => <td key={cell} className={"p-3 " + (index === 2 ? "font-semibold text-accent" : "text-secondary")}>{cell}</td>)}</tr>)}</tbody>
        </table>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        先澄清节点结构，再选择有序下行、父链对齐或根路径比较。
      </figcaption>
    </figure>
  );
}

export function CommonParentTreeDiagram() {
  const edges = [
    { parent: "1", children: ["2", "3"], tone: "both" as const, note: "两条路径共同经过" },
    { parent: "2", children: ["4", "5"], tone: "both" as const, note: "最后公共父节点" },
    { parent: "4", children: ["6", "7"], tone: "left" as const, note: "通向目标 6" },
    { parent: "5", children: ["8", "9", "10"], tone: "right" as const, note: "通向目标 8" },
  ];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="grid gap-2 border border-border bg-elevated p-4 sm:grid-cols-2 sm:p-5">
        {edges.map((edge) => (
          <div key={edge.parent} className="flex min-h-24 items-center gap-3 border border-border bg-background p-3">
            <NodeBadge value={edge.parent} tone={edge.tone} />
            <span className="text-muted">→</span>
            <div className="flex flex-1 flex-wrap gap-2">
              {edge.children.map((child) => <NodeBadge key={child} value={child} tone={child === "6" ? "left" : child === "8" ? "right" : "default"} />)}
            </div>
            <span className="max-w-24 text-xs leading-5 text-secondary">{edge.note}</span>
          </div>
        ))}
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        作者 Test1 的普通多叉树：目标 6 与 8 的两条祖先路径在节点 2 后分叉。
      </figcaption>
    </figure>
  );
}

export function CommonParentPathLab() {
  const [cursor, setCursor] = useState(0);
  const state = pathStates[cursor];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {pathStates.map((item, index) => (
            <button key={item.label} type="button" onClick={() => setCursor(index)} aria-pressed={cursor === index} className={"h-11 border text-xs font-semibold " + (cursor === index ? "border-accent bg-accent/15 text-accent" : "border-border bg-background text-secondary")}>
              {item.label}
            </button>
          ))}
        </div>
        <div className="mt-4 grid gap-2 sm:grid-cols-[1fr_1fr_130px]">
          <div className="border border-accent bg-accent/10 p-3"><div className="text-xs text-muted">目标 6 的 path1</div><div className="mt-1 font-mono text-sm text-primary">{state.left}</div></div>
          <div className="border border-warning bg-warning/10 p-3"><div className="text-xs text-muted">目标 8 的 path2</div><div className="mt-1 font-mono text-sm text-primary">{state.right}</div></div>
          <div className="border border-success bg-success/10 p-3"><div className="text-xs text-muted">{state.cursor}</div><div className="mt-1 font-mono text-sm font-semibold text-success">{state.last}</div></div>
        </div>
        <p className="mb-0 mt-3 border-l-4 border-accent bg-background p-3 text-sm text-secondary">{state.note}</p>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        同步扫描两条根路径，用 pLast 保存最近一次身份相同的节点。
      </figcaption>
    </figure>
  );
}

export function CommonParentConventionDiagram() {
  const rows = [
    ["查询节点", "5 与 4", "5 与 4"],
    ["路径是否含目标", "包含：1,2,3,4,5 / 1,2,3,4", "排除：1,2,3,4 / 1,2,3"],
    ["答案", "4", "3"],
    ["问题定义", "最低公共祖先：节点可作自身祖先", "最低公共父节点：必须严格位于目标上方"],
    ["作者 Test2", "不会采用", "期望节点 3"],
  ] as const;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-x-auto border border-border bg-elevated p-4 sm:p-5">
        <table className="w-full min-w-[780px] border-collapse text-left text-sm">
          <thead><tr className="border-b border-border"><th className="p-3 text-primary">对比项</th><th className="p-3 text-primary">常见含自身 LCA</th><th className="p-3 text-primary">作者源码的严格父节点</th></tr></thead>
          <tbody>{rows.map((row) => <tr key={row[0]} className="border-b border-border last:border-0">{row.map((cell, index) => <td key={cell} className={"p-3 " + (index === 2 ? "font-semibold text-accent" : "text-secondary")}>{cell}</td>)}</tr>)}</tbody>
        </table>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        是否把目标自身放进路径会改变祖先与后代查询的答案，必须先固定定义。
      </figcaption>
    </figure>
  );
}

export function CommonParentOfficialCaseLab() {
  return <CodingInterviewLab cases={officialCases} caption="作者 4 组测试覆盖普通分叉树、退化链、树外节点和全空输入。" />;
}
