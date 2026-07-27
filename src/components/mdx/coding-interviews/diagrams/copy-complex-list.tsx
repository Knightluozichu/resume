"use client";

import { CodingInterviewLab } from "./official-lab";

const officialCases = [
  { label: "Test1", fields: [["next", "1→2→3→4→5"], ["sibling", "1→3，2→5，4→2"], ["空引用", "3与5"], ["覆盖", "前后跨节点"]] },
  { label: "Test2", fields: [["next", "1→2→3→4→5"], ["sibling", "2→5，3→3，4→2"], ["特殊", "3自指"], ["覆盖", "随机指针指向自身"]] },
  { label: "Test3", fields: [["next", "1→2→3→4→5"], ["sibling", "2→4，4→2"], ["特殊", "sibling形成环"], ["覆盖", "非next环"]] },
  { label: "Test4", fields: [["next", "单节点1"], ["sibling", "1→1"], ["克隆", "1'→1'"], ["覆盖", "最小自指"]] },
  { label: "Test5", fields: [["head", "nullptr"], ["三阶段", "均无操作"], ["返回", "nullptr"], ["覆盖", "空链"]] },
] as const;

export function ComplexListInterleaveDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden border border-border bg-elevated p-4 sm:p-5">
        <svg viewBox="0 0 940 410" role="img" aria-label="原节点1、2、3后分别插入克隆节点1撇、2撇、3撇，形成交织链。" className="mx-auto block h-auto w-full max-w-[940px]">
          <defs>
            <marker id="complex-next-arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 Z" fill="var(--accent)" /></marker>
            <marker id="complex-sibling-arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 Z" fill="var(--success)" /></marker>
          </defs>
          <text x="470" y="34" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">阶段1：复制节点插入原节点后面</text>
          {[["1",95,false],["1′",235,true],["2",375,false],["2′",515,true],["3",655,false],["3′",795,true]].map(([label,x,clone]) => <g key={String(label)}><rect x={Number(x)} y="150" width="92" height="62" fill={clone ? "var(--accent)" : "var(--bg)"} fillOpacity={clone ? 0.12 : 1} stroke={clone ? "var(--accent)" : "var(--border)"} strokeWidth={clone ? 3 : 2} /><text x={Number(x) + 46} y="188" textAnchor="middle" fontSize="17" fontWeight="700" fill="var(--text-primary)">{label}</text><text x={Number(x) + 46} y="236" textAnchor="middle" fontSize="11" fontWeight="700" fill={clone ? "var(--accent)" : "var(--text-secondary)"}>{clone ? "clone" : "original"}</text></g>)}
          {[187,327,467,607,747].map((x) => <line key={x} x1={x} y1="181" x2={x + 48} y2="181" stroke="var(--accent)" strokeWidth="3" markerEnd="url(#complex-next-arrow)" />)}
          <path d="M141 142 C180 68 600 68 701 142" fill="none" stroke="var(--success)" strokeWidth="3" strokeDasharray="6 4" markerEnd="url(#complex-sibling-arrow)" />
          <path d="M281 222 C340 326 650 326 841 222" fill="none" stroke="var(--success)" strokeWidth="3" strokeDasharray="6 4" markerEnd="url(#complex-sibling-arrow)" />
          <text x="420" y="72" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--success)">原1.sibling → 原3，因此克隆1′.sibling → 原3.next = 克隆3′</text>
          <text x="520" y="366" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--success)">局部公式：clone(original) = original.next</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">交织后无需哈希表：任意原节点的克隆就是它紧邻的next，随机目标的克隆也可同样定位。</figcaption>
    </figure>
  );
}

export function ComplexSiblingMappingMap() {
  const rows = [
    ["原节点sibling为空", "克隆sibling保持nullptr", "无目标"],
    ["原A.sibling=原C", "克隆A′.sibling=原C.next", "原C.next恰为克隆C′"],
    ["原B.sibling=原B", "克隆B′.sibling=原B.next", "得到克隆B′自指"],
    ["原B与原D互指", "B′指D′，D′指B′", "sibling环被同构复制"],
    ["sibling指向链外节点", "公式不再成立", "违反作者输入契约"],
  ] as const;
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-x-auto border border-border bg-elevated p-4 sm:p-5">
        <table className="w-full min-w-[880px] border-collapse text-left text-sm">
          <thead><tr className="border-b border-border">{["原关系", "克隆赋值", "结论"].map((item) => <th key={item} className="p-3 text-primary">{item}</th>)}</tr></thead>
          <tbody>{rows.map((row) => <tr key={row[0]} className="border-b border-border last:border-0">{row.map((cell,index) => <td key={cell} className={"p-3 " + (index === 1 ? "font-semibold text-accent" : "text-secondary")}>{cell}</td>)}</tr>)}</tbody>
        </table>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">随机指针可指向前方、后方、自身或形成环；只要目标属于next主链，紧邻映射都有效。</figcaption>
    </figure>
  );
}

export function ComplexListSplitDiagram() {
  const rows = [
    ["交织前", "A→B→C", "无", "原链完整"],
    ["交织后", "A→A′→B→B′→C→C′", "尚未独立", "映射可局部读取"],
    ["先取克隆头", "A.next=A′", "cloneHead=A′", "保存返回入口"],
    ["每轮恢复原next", "A→B→C", "A′→B′→C′", "两条链同步前进"],
    ["完成", "与输入地址和值关系一致", "全新节点与同构引用", "原链恢复、克隆独立"],
  ] as const;
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-x-auto border border-border bg-elevated p-4 sm:p-5">
        <table className="w-full min-w-[900px] border-collapse text-left text-sm">
          <thead><tr className="border-b border-border">{["阶段", "原链next", "克隆链next", "不变量"].map((item) => <th key={item} className="p-3 text-primary">{item}</th>)}</tr></thead>
          <tbody>{rows.map((row) => <tr key={row[0]} className="border-b border-border last:border-0">{row.map((cell,index) => <td key={cell} className={"p-3 " + (index === 3 ? "font-semibold text-success" : "text-secondary")}>{cell}</td>)}</tr>)}</tbody>
        </table>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">拆分不能只取奇数位；每次还要恢复原节点next，并把克隆节点next接到下一个克隆。</figcaption>
    </figure>
  );
}

export function CopyComplexListOfficialCaseLab() {
  return <CodingInterviewLab cases={officialCases} caption="切换作者5组测试，核对跨节点、自指、sibling环、单节点自指与空链。" />;
}
