"use client";

const cases = [
  {
    label: "完整对称",
    fields: [["根", "8"], ["第二层", "6 / 6"], ["第三层", "5,7 / 7,5"], ["结果", "true"]],
  },
  {
    label: "值不相等",
    fields: [["第二层", "6 / 9"], ["形状", "仍镜像"], ["首次冲突", "根的左右孩子"], ["结果", "false"]],
  },
  {
    label: "缺失节点",
    fields: [["值", "对应非空值可相同"], ["一侧", "有节点"], ["镜像侧", "为空"], ["结果", "false"]],
  },
  {
    label: "深层斜树",
    fields: [["Test4", "深层镜像,true"], ["Test5", "深层值不同,false"], ["Test6", "深层结构缺失,false"], ["重点", "不能只查前两层"]],
  },
  {
    label: "空与单点",
    fields: [["单节点", "true"], ["空树", "true"], ["递归入口", "root与root比较"], ["双空边界", "true"]],
  },
  {
    label: "全值相同",
    fields: [["Test9", "镜像形状,true"], ["Test10", "同向偏斜,false"], ["值序列", "都只有5"], ["空位置", "决定答案"]],
  },
] as const;

export function SymmetricTraversalDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden border border-border bg-elevated p-4 sm:p-5">
        <svg viewBox="0 0 860 430" role="img" aria-label="对称树中左侧按根左右遍历，右侧按根右左遍历，成对节点值和空位置一致。" className="mx-auto block h-auto w-full max-w-[860px]">
          <defs><marker id="symmetric-traversal-arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 Z" fill="var(--accent)" /></marker></defs>
          <line x1="430" y1="54" x2="430" y2="372" stroke="var(--border)" strokeWidth="2" strokeDasharray="6 5" />
          <text x="430" y="34" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">沿根轴成对比较镜像位置</text>
          {[[8,430,80],[6,282,176],[6,578,176],[5,194,294],[7,354,294],[7,506,294],[5,666,294]].map(([value,x,y],index) => <g key={index}><circle cx={Number(x)} cy={Number(y)} r="31" fill={index===0 ? "var(--success)" : "var(--bg)"} fillOpacity={index===0 ? 0.1 : 1} stroke={index===0 ? "var(--success)" : "var(--border)"} /><text x={Number(x)} y={Number(y)+6} textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">{value}</text></g>)}
          {[[412,105,303,151],[448,105,557,151],[262,202,210,264],[302,202,338,264],[558,202,522,264],[598,202,650,264]].map((line,index) => <line key={index} x1={line[0]} y1={line[1]} x2={line[2]} y2={line[3]} stroke="var(--border)" strokeWidth="2" markerEnd="url(#symmetric-traversal-arrow)" />)}
          <path d="M250 352 C330 400 530 400 610 352" fill="none" stroke="var(--accent)" strokeWidth="3" markerEnd="url(#symmetric-traversal-arrow)" />
          <text x="430" y="414" textAnchor="middle" fontSize="11.5" fontWeight="700" fill="var(--accent)">外侧：left.left 对 right.right　内侧：left.right 对 right.left</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">一侧使用根-左-右，镜像侧使用根-右-左，序列必须连同空位置一致。</figcaption>
    </figure>
  );
}

export function MirrorPairBoundaryMap() {
  const rows = [
    ["p空，q空", "镜像位置都缺失", "true"],
    ["仅一个为空", "结构在该位置不对称", "false"],
    ["两者非空、值不同", "内容不对称", "false"],
    ["两者非空、值相同", "比较p.left/q.right", "并比较p.right/q.left"],
    ["root为空", "入口调用null/null", "true"],
  ] as const;
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-x-auto border border-border bg-elevated p-4 sm:p-5">
        <table className="w-full min-w-[780px] border-collapse text-left text-sm">
          <thead><tr className="border-b border-border">{["节点对", "语义", "返回/下一步"].map((item) => <th key={item} className="p-3 text-primary">{item}</th>)}</tr></thead>
          <tbody>{rows.map((row) => <tr key={row[0]} className="border-b border-border last:border-0">{row.map((cell,index) => <td key={cell} className={"p-3 " + (index === 2 ? "font-semibold text-accent" : "text-secondary")}>{cell}</td>)}</tr>)}</tbody>
        </table>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">必须先比较空状态，再读取value和孩子，才能同时保证结构与内容对称。</figcaption>
    </figure>
  );
}

export function SymmetricShapeCounterexampleDiagram() {
  const rows = [
    ["镜像偏斜", "左侧只向外左，右侧只向外右", "值全为5", "true"],
    ["同向偏斜", "左右两侧都向左", "值全为5", "false"],
    ["只收集非空值", "两者序列都为5,5,5…", "无法区分", "错误方法"],
    ["保留空标记", "左右空位序列不同", "可区分", "正确证据"],
  ] as const;
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-x-auto border border-border bg-elevated p-4 sm:p-5">
        <table className="w-full min-w-[800px] border-collapse text-left text-sm">
          <thead><tr className="border-b border-border">{["结构", "方向", "值", "结论"].map((item) => <th key={item} className="p-3 text-primary">{item}</th>)}</tr></thead>
          <tbody>{rows.map((row) => <tr key={row[0]} className="border-b border-border last:border-0">{row.map((cell,index) => <td key={cell} className={"p-3 " + (index === 3 ? "font-semibold text-accent" : "text-secondary")}>{cell}</td>)}</tr>)}</tbody>
        </table>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">全值相同仍可能不对称；空孩子的镜像位置是结构信息的一部分。</figcaption>
    </figure>
  );
}
