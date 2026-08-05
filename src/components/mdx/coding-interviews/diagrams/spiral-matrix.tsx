"use client";

const officialCases = [
  {
    label: "1×1 / 2×2",
    fields: [["Test(1,1)", "只打印上边，结果1"], ["Test(2,2)", "结果1,2,4,3"], ["覆盖", "最小输入与完整四边"], ["中心残层", "无 / 无"]],
  },
  {
    label: "4×4 / 5×5",
    fields: [["Test(4,4)", "两层完整环"], ["Test(5,5)", "两层环加中心点13"], ["覆盖", "偶数与奇数方阵"], ["重点", "start逐层递增"]],
  },
  {
    label: "1×5 / 2×5",
    fields: [["Test(1,5)", "单列1到5"], ["Test(2,5)", "窄高矩阵"], ["末层", "单列残层"], ["禁止", "重复打印左边"]],
  },
  {
    label: "3×5 / 4×5",
    fields: [["Test(3,5)", "奇数列、中心单列"], ["Test(4,5)", "偶数列、两层环"], ["覆盖", "行数大于列数"], ["重点", "第四色边条件"]],
  },
  {
    label: "5×1 / 5×2",
    fields: [["Test(5,1)", "单行1到5"], ["Test(5,2)", "宽矮矩阵"], ["末层", "单行残层"], ["禁止", "反向重复下边"]],
  },
  {
    label: "5×3 / 5×4",
    fields: [["Test(5,3)", "奇数行、中心单行"], ["Test(5,4)", "偶数行、两层环"], ["覆盖", "列数大于行数"], ["总计", "作者源码12组"]],
  },
] as const;

export function SpiralRingPathDiagram() {
  const cells = Array.from({ length: 20 }, (_, index) => {
    const row = Math.floor(index / 5);
    const col = index % 5;
    const outer = row === 0 || row === 3 || col === 0 || col === 4;
    return { row, col, value: index + 1, outer };
  });

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden border border-border bg-elevated p-4 sm:p-5">
        <svg viewBox="0 0 860 430" role="img" aria-label="四行五列矩阵从左上环起点开始，依次沿上、右、下、左四条边顺时针访问。" className="mx-auto block h-auto w-full max-w-[860px]">
          <defs>
            <marker id="spiral-ring-arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 Z" fill="var(--accent)" /></marker>
          </defs>
          <text x="430" y="34" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">start = 0，endX = 4，endY = 3</text>
          {cells.map(({ row, col, value, outer }) => {
            const x = 170 + col * 104;
            const y = 78 + row * 78;
            return <g key={value}><rect x={x} y={y} width="84" height="58" fill={outer ? "var(--accent)" : "var(--bg)"} fillOpacity={outer ? 0.1 : 1} stroke={outer ? "var(--accent)" : "var(--border)"} /><text x={x + 42} y={y + 35} textAnchor="middle" fontSize="15" fontWeight={outer ? 700 : 500} fill="var(--text-primary)">{value}</text></g>;
          })}
          <path d="M212 64 H628 V328 H212 V152" fill="none" stroke="var(--accent)" strokeWidth="4" markerEnd="url(#spiral-ring-arrow)" />
          <g fontSize="12" fontWeight="700" fill="var(--text-secondary)">
            <text x="420" y="58" textAnchor="middle">1 上边：左到右</text>
            <text x="702" y="205" textAnchor="middle">2 右边：上到下</text>
            <text x="420" y="368" textAnchor="middle">3 下边：右到左</text>
            <text x="94" y="238" textAnchor="middle">4 左边：下到上</text>
          </g>
          <text x="430" y="412" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--success)">边角只属于先到达它的那条边，后续循环主动跳过角点</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">作者用同一个start表示当前环的左上角行列；四段循环首尾错开，避免四个角被打印两次。</figcaption>
    </figure>
  );
}

export function SpiralEdgeConditionMap() {
  const rows = [
    ["上边", "总是执行", "列 start 到 endX", "包含左上、右上"],
    ["右边", "start 小于 endY", "行 start+1 到 endY", "跳过右上"],
    ["下边", "start 小于 endX 且 start 小于 endY", "列 endX-1 到 start", "跳过右下"],
    ["左边", "start 小于 endX 且 start 小于 endY-1", "行 endY-1 到 start+1", "跳过左下、左上"],
  ] as const;
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-x-auto border border-border bg-elevated p-4 sm:p-5">
        <table className="w-full min-w-[860px] border-collapse text-left text-sm">
          <thead><tr className="border-b border-border">{["边", "启用条件", "访问范围", "角点归属"].map((item) => <th key={item} className="p-3 text-primary">{item}</th>)}</tr></thead>
          <tbody>{rows.map((row) => <tr key={row[0]} className="border-b border-border last:border-0">{row.map((cell, index) => <td key={`${row[0]}-${index}`} className={"p-3 " + (index === 1 ? "font-semibold text-accent" : "text-secondary")}>{cell}</td>)}</tr>)}</tbody>
        </table>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">四个条件并不对称：越晚打印的边，越要排除已被前面边覆盖的退化形状和角点。</figcaption>
    </figure>
  );
}

export function SpiralStartInvariantDiagram() {
  const rings = [
    ["start=0", "左上(0,0)", "右下(rows-1, cols-1)", "外环"],
    ["start=1", "左上(1,1)", "右下(rows-2, cols-2)", "第二环"],
    ["start=2", "左上(2,2)", "右下(rows-3, cols-3)", "可能是环、单行、单列或中心点"],
    ["停止", "columns 不大于 2×start", "或 rows 不大于 2×start", "当前起点已越过剩余区域"],
  ] as const;
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-x-auto border border-border bg-elevated p-4 sm:p-5">
        <table className="w-full min-w-[820px] border-collapse text-left text-sm">
          <thead><tr className="border-b border-border">{["环编号", "起点", "终点", "含义"].map((item) => <th key={item} className="p-3 text-primary">{item}</th>)}</tr></thead>
          <tbody>{rings.map((row) => <tr key={row[0]} className="border-b border-border last:border-0">{row.map((cell, index) => <td key={`${row[0]}-${index}`} className={"p-3 " + (index === 0 ? "font-semibold text-success" : "text-secondary")}>{cell}</td>)}</tr>)}</tbody>
        </table>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">循环不变量：进入第start圈前，外侧start层已打印完，剩余区域左上角恰为(start,start)。</figcaption>
    </figure>
  );
}
