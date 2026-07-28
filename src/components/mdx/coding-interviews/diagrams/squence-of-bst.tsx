"use client";

const officialCases = [
  { label: "Test1", fields: [["序列", "4,8,6,12,16,14,10"], ["根", "10"], ["左右段", "4,8,6 / 12,16,14"], ["结果", "true"]] },
  { label: "Test2", fields: [["序列", "4,6,7,5"], ["根", "5"], ["结构", "左4；右7的左6"], ["结果", "true"]] },
  { label: "Test3", fields: [["序列", "1,2,3,4,5"], ["结构", "全左链5→4→3→2→1"], ["递归", "每次只有左段"], ["结果", "true"]] },
  { label: "Test4", fields: [["序列", "5,4,3,2,1"], ["结构", "全右链1→2→3→4→5"], ["递归", "每次只有右段"], ["结果", "true"]] },
  { label: "Test5", fields: [["序列", "5"], ["根", "5"], ["子树", "都为空"], ["结果", "true"]] },
  { label: "Test6", fields: [["序列", "7,4,6,5"], ["根", "5"], ["冲突", "右段出现4小于5"], ["结果", "false"]] },
  { label: "Test7", fields: [["序列", "4,6,12,8,16,14,10"], ["根", "10"], ["冲突", "右段出现8小于10"], ["结果", "false"]] },
  { label: "Test8", fields: [["序列指针", "nullptr"], ["长度", "0"], ["作者契约", "空序列不接受"], ["结果", "false"]] },
] as const;

export function BstPostorderPartitionDiagram() {
  const cells = [
    ["4", "左"], ["8", "左"], ["6", "左"],
    ["12", "右"], ["16", "右"], ["14", "右"], ["10", "根"],
  ] as const;
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden border border-border bg-elevated p-4 sm:p-5">
        <svg viewBox="0 0 900 330" role="img" aria-label="后序序列4、8、6、12、16、14、10以末尾10为根，前段小于10，后段大于10。" className="mx-auto block h-auto w-full max-w-[900px]">
          <text x="450" y="34" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">最后一个数字是根节点：root = 10</text>
          {cells.map(([value, kind], index) => {
            const x = 80 + index * 108;
            const color = kind === "左" ? "var(--success)" : kind === "右" ? "var(--accent)" : "var(--warning)";
            return <g key={index}><rect x={x} y="78" width="86" height="62" fill={color} fillOpacity="0.1" stroke={color} /><text x={x + 43} y="116" textAnchor="middle" fontSize="17" fontWeight="700" fill="var(--text-primary)">{value}</text><text x={x + 43} y="166" textAnchor="middle" fontSize="11" fontWeight="700" fill={color}>{kind}{kind !== "根" ? "段" : ""}</text></g>;
          })}
          <path d="M82 214 H382" stroke="var(--success)" strokeWidth="4" />
          <path d="M406 214 H706" stroke="var(--accent)" strokeWidth="4" />
          <text x="232" y="242" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--success)">全部小于10，再递归验证4,8,6</text>
          <text x="556" y="242" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--accent)">全部大于10，再递归验证12,16,14</text>
          <text x="450" y="302" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--text-secondary)">分割点是第一个大于根的12；右段任何小于根的值都会立即否决</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">后序的左右根结构给出连续分区；分区满足根约束后，左右段仍必须分别满足同一规则。</figcaption>
    </figure>
  );
}

export function BstPostorderRecursionMap() {
  const rows = [
    ["4,8,6,12,16,14,10", "10", "4,8,6", "12,16,14"],
    ["4,8,6", "6", "4", "8"],
    ["12,16,14", "14", "12", "16"],
    ["单元素4/8/12/16", "自身", "空", "空"],
    ["合并", "所有子段true", "left=true", "right=true"],
  ] as const;
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-x-auto border border-border bg-elevated p-4 sm:p-5">
        <table className="w-full min-w-[860px] border-collapse text-left text-sm">
          <thead><tr className="border-b border-border">{["当前子序列", "根", "左段", "右段"].map((item) => <th key={item} className="p-3 text-primary">{item}</th>)}</tr></thead>
          <tbody>{rows.map((row) => <tr key={row[0]} className="border-b border-border last:border-0">{row.map((cell,index) => <td key={cell} className={"p-3 " + (index === 1 ? "font-semibold text-accent" : "text-secondary")}>{cell}</td>)}</tr>)}</tbody>
        </table>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">每个连续子段重复“末尾取根、扫描分割、验证右段、递归左右”的同一过程。</figcaption>
    </figure>
  );
}

export function BstPostorderFailureDiagram() {
  const rows = [
    ["7,4,6,5", "5", "第一个大于5是7", "右段7,4,6含4", "false"],
    ["4,6,12,8,16,14,10", "10", "第一个大于10是12", "右段含8", "false"],
    ["只看相邻升降", "无法确定", "局部片段似乎有序", "跨分区值仍可冲突", "不充分"],
    ["只检查顶层分区", "可能通过", "子段内部仍可能非法", "必须递归", "不充分"],
  ] as const;
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-x-auto border border-border bg-elevated p-4 sm:p-5">
        <table className="w-full min-w-[900px] border-collapse text-left text-sm">
          <thead><tr className="border-b border-border">{["序列/方法", "根", "分割", "首个证据", "结论"].map((item) => <th key={item} className="p-3 text-primary">{item}</th>)}</tr></thead>
          <tbody>{rows.map((row) => <tr key={row[0]} className="border-b border-border last:border-0">{row.map((cell,index) => <td key={cell} className={"p-3 " + (index === 4 ? "font-semibold text-danger" : "text-secondary")}>{cell}</td>)}</tr>)}</tbody>
        </table>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">非法证据是“已进入右段后又出现小于当前根的值”，可能跨越多个相邻位置。</figcaption>
    </figure>
  );
}
