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
  const toneOf = (v: string) =>
    v === "1" || v === "2" ? "var(--success)" : v === "4" || v === "6" || v === "7" ? "var(--accent)" : v === "5" || v === "8" || v === "9" || v === "10" ? "var(--warning)" : "var(--border)";
  const N = ({ x, y, label }: { x: number; y: number; label: string }) => {
    const tone = toneOf(label);
    const strong = label === "2" || label === "6" || label === "8";
    return (
      <g>
        <circle cx={x} cy={y} r="16" fill={tone} fillOpacity={strong ? 0.2 : 0.1} stroke={tone} strokeWidth={strong ? 2.2 : 1.4} />
        <text x={x} y={y + 5} textAnchor="middle" fontSize="13" fontWeight="800" fontFamily="monospace" fill={tone}>{label}</text>
      </g>
    );
  };
  const E = ({ x1, y1, x2, y2, tone }: { x1: number; y1: number; x2: number; y2: number; tone: string }) => (
    <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={tone} strokeWidth="1.6" />
  );
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden border border-border bg-elevated p-4 sm:p-5">
        <svg
          viewBox="0 0 820 420"
          role="img"
          aria-label="树中两个节点的最低公共父节点图。普通多叉树：1 的孩子 2、3；2 的孩子 4、5；4 的孩子 6、7；5 的孩子 8、9、10。目标 6 与 8 的根路径分别为 1,2,4,6 与 1,2,5,8。同步比较两条路径：1 相同、2 相同、到 4 与 5 分叉，所以最后一个公共节点 2 就是最低公共父节点。"
          className="mx-auto block h-auto w-full max-w-[820px]"
        >
          <text x="410" y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">两条根路径最后公共的节点即最低公共父节点</text>
          {/* 边 */}
          <E x1={410} y1={76} x2={280} y2={140} tone="var(--success)" />
          <E x1={410} y1={76} x2={580} y2={140} tone="var(--border)" />
          <E x1={280} y1={160} x2={180} y2={230} tone="var(--accent)" />
          <E x1={280} y1={160} x2={380} y2={230} tone="var(--warning)" />
          <E x1={180} y1={250} x2={120} y2={320} tone="var(--accent)" />
          <E x1={180} y1={250} x2={240} y2={320} tone="var(--accent)" />
          <E x1={380} y1={250} x2={330} y2={320} tone="var(--warning)" />
          <E x1={380} y1={250} x2={420} y2={320} tone="var(--warning)" />
          <E x1={380} y1={250} x2={500} y2={320} tone="var(--warning)" />
          {/* 节点 */}
          <N x={410} y={64} label="1" />
          <N x={280} y={150} label="2" />
          <N x={580} y={150} label="3" />
          <N x={180} y={240} label="4" />
          <N x={380} y={240} label="5" />
          <N x={120} y={330} label="6" />
          <N x={240} y={330} label="7" />
          <N x={330} y={330} label="8" />
          <N x={420} y={330} label="9" />
          <N x={500} y={330} label="10" />
          {/* 路径标注 */}
          <text x={120} y={372} textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--accent)">目标 6</text>
          <text x={330} y={372} textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--warning)">目标 8</text>
          {/* 结论 */}
          <text x="640" y="240" textAnchor="middle" fontSize="12" fill="var(--accent)">路径1：1,2,4,6</text>
          <text x="640" y="262" textAnchor="middle" fontSize="12" fill="var(--warning)">路径2：1,2,5,8</text>
          <text x="640" y="292" textAnchor="middle" fontSize="13" fontWeight="800" fill="var(--success)">最后公共 = 2</text>
          <text x="410" y="404" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">同步扫描两条根路径，用 pLast 保存最近一次身份相同的节点；路径在 4/5 分叉后不会重新汇合。O(n) 时间、O(h) 空间。</text>
        </svg>
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
