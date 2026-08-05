"use client";

const officialCases = [
  { label: "Test1", fields: [["目标", "22"], ["路径1", "10→5→7"], ["路径2", "10→12"], ["结果", "2条"]] },
  { label: "Test2", fields: [["目标", "15"], ["前缀", "10→5和为15"], ["叶子条件", "5不是叶子"], ["结果", "0条"]] },
  { label: "Test3", fields: [["树形", "5→左4→左3→左2→左1"], ["目标", "15"], ["路径", "完整左链"], ["结果", "1条"]] },
  { label: "Test4", fields: [["树形", "1→右2→右3→右4→右5"], ["目标", "16"], ["实际总和", "15"], ["结果", "0条"]] },
  { label: "Test5", fields: [["树形", "单节点1"], ["目标", "1"], ["根也是叶子", "是"], ["结果", "1条"]] },
  { label: "Test6", fields: [["树形", "nullptr"], ["目标", "0"], ["入口", "直接返回"], ["结果", "0条"]] },
] as const;

export function RootLeafPathDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden border border-border bg-elevated p-4 sm:p-5">
        <svg viewBox="0 0 900 440" role="img" aria-label="树10、5、12、4、7中，目标22对应根到叶路径10到5到7和10到12。" className="mx-auto block h-auto w-full max-w-[900px]">
          <defs><marker id="path-tree-arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 Z" fill="var(--accent)" /></marker></defs>
          <text x="450" y="34" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">目标22：只接受从根出发并在叶子结束的完整路径</text>
          <line x1="432" y1="108" x2="318" y2="174" stroke="var(--success)" strokeWidth="5" />
          <line x1="468" y1="108" x2="582" y2="174" stroke="var(--accent)" strokeWidth="5" />
          <line x1="282" y1="220" x2="218" y2="292" stroke="var(--border)" strokeWidth="2" />
          <line x1="318" y1="220" x2="382" y2="292" stroke="var(--success)" strokeWidth="5" />
          {[[10,450,82,"root"],[5,300,198,"path"],[12,600,198,"path2"],[4,200,318,"normal"],[7,400,318,"path"]].map(([value,x,y,kind]) => {
            const color = kind === "path" || kind === "root" ? "var(--success)" : kind === "path2" ? "var(--accent)" : "var(--border)";
            return <g key={String(value)}><circle cx={Number(x)} cy={Number(y)} r="31" fill={color} fillOpacity={kind === "normal" ? 0 : 0.12} stroke={color} strokeWidth={kind === "normal" ? 2 : 3} /><text x={Number(x)} y={Number(y) + 6} textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">{value}</text></g>;
          })}
          <path d="M132 372 H378" stroke="var(--success)" strokeWidth="4" markerEnd="url(#path-tree-arrow)" />
          <text x="255" y="402" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--success)">10 + 5 + 7 = 22</text>
          <path d="M522 372 H768" stroke="var(--accent)" strokeWidth="4" markerEnd="url(#path-tree-arrow)" />
          <text x="645" y="402" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--accent)">10 + 12 = 22</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">同一目标可有多条根到叶路径；左子树先递归，所以作者先打印10、5、7，再打印10、12。</figcaption>
    </figure>
  );
}

export function PathBacktrackStateMap() {
  const rows = [
    ["进入10", "10", "[10]", "继续左右子树"],
    ["进入5", "15", "[10,5]", "尚非叶子，继续"],
    ["进入4", "19", "[10,5,4]", "叶子但不等于22"],
    ["退出4", "15", "[10,5]", "恢复到节点5状态"],
    ["进入7", "22", "[10,5,7]", "叶子且命中，输出"],
    ["退出7再退出5", "10", "[10]", "右分支12从干净状态开始"],
  ] as const;
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-x-auto border border-border bg-elevated p-4 sm:p-5">
        <table className="w-full min-w-[860px] border-collapse text-left text-sm">
          <thead><tr className="border-b border-border">{["事件", "currentSum", "path", "含义"].map((item) => <th key={item} className="p-3 text-primary">{item}</th>)}</tr></thead>
          <tbody>{rows.map((row) => <tr key={row[0]} className="border-b border-border last:border-0">{row.map((cell,index) => <td key={`${row[0]}-${index}`} className={"p-3 " + (index === 2 ? "font-semibold text-accent" : "text-secondary")}>{cell}</td>)}</tr>)}</tbody>
        </table>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">进入节点时同时加和与压栈，离开节点时同时减和与弹栈；兄弟分支看见相同父路径状态。</figcaption>
    </figure>
  );
}

export function RootLeafConditionMap() {
  const rows = [
    ["currentSum等于目标，当前是叶子", "输出当前path", "完整根到叶路径"],
    ["currentSum等于目标，但还有孩子", "继续递归，不输出", "Test2中的10→5"],
    ["当前是叶子，但和不等于目标", "不输出，随后回溯", "Test4末端总和15"],
    ["currentSum超过目标", "仍继续递归", "后代可能含负数"],
    ["空根", "入口直接返回", "目标0也不形成路径"],
  ] as const;
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-x-auto border border-border bg-elevated p-4 sm:p-5">
        <table className="w-full min-w-[880px] border-collapse text-left text-sm">
          <thead><tr className="border-b border-border">{["状态", "动作", "理由/用例"].map((item) => <th key={item} className="p-3 text-primary">{item}</th>)}</tr></thead>
          <tbody>{rows.map((row) => <tr key={row[0]} className="border-b border-border last:border-0">{row.map((cell,index) => <td key={`${row[0]}-${index}`} className={"p-3 " + (index === 1 ? "font-semibold text-success" : "text-secondary")}>{cell}</td>)}</tr>)}</tbody>
        </table>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">“和命中”与“到达叶子”是两个必须同时成立的条件；不能在内部节点提前接受。</figcaption>
    </figure>
  );
}
