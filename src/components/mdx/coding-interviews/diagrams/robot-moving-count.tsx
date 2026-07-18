"use client";

import { CodingInterviewLab } from "./official-lab";

const cases = [
  {
    label: "k=5, 10×10",
    fields: [["起点", "(0,0)"], ["条件", "row数位和+col数位和≤5"], ["遍历", "四方向DFS/BFS"], ["可达数", "21"]],
  },
  {
    label: "k=15, 20×20",
    fields: [["网格", "400格"], ["允许条件", "数位和阈值15"], ["去重", "每格至多入队一次"], ["可达数", "359"]],
  },
  {
    label: "单行边界",
    fields: [["k=10, 1×100", "29格"], ["k=10, 1×10", "10格"], ["移动", "只能左右"], ["验证", "十进制进位数位和"]],
  },
  {
    label: "最小/非法",
    fields: [["k=0, 1×1", "1格"], ["k=15, 1×1", "1格"], ["k为负", "0格"], ["行列非正", "0格"]],
  },
] as const;

export function DigitSumConstraintDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden border border-border bg-elevated p-4 sm:p-5">
        <svg viewBox="0 0 820 320" role="img" aria-label="阈值18时坐标35和37的数位和为18可进入，35和38的数位和为19不可进入。" className="mx-auto block h-auto w-full max-w-[820px]">
          <text x="410" y="30" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">约束作用于坐标十进制数位，不是坐标大小</text>
          <rect x="86" y="78" width="286" height="158" rx="5" fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" />
          <rect x="448" y="78" width="286" height="158" rx="5" fill="var(--warning)" fillOpacity="0.08" stroke="var(--warning)" />
          <text x="229" y="110" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--success)">(35, 37) 可进入</text>
          <text x="591" y="110" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--warning)">(35, 38) 不可进入</text>
          <text x="229" y="160" textAnchor="middle" fontSize="20" fontWeight="700" fill="var(--text-primary)">3 + 5 + 3 + 7</text>
          <text x="591" y="160" textAnchor="middle" fontSize="20" fontWeight="700" fill="var(--text-primary)">3 + 5 + 3 + 8</text>
          <text x="229" y="202" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--success)">= 18 ≤ k</text>
          <text x="591" y="202" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--warning)">= 19 &gt; k</text>
          <rect x="174" y="266" width="472" height="30" rx="5" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" />
          <text x="410" y="286" textAnchor="middle" fontSize="10.5" fill="var(--text-primary)">合法只说明格子可进入；还必须从(0,0)沿合法邻接路径到达。</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">作者示例阈值为18，两个相邻坐标因末位不同落在约束两侧。</figcaption>
    </figure>
  );
}

export function RobotReachabilityGridDiagram() {
  const cells = Array.from({ length: 36 }, (_, index) => {
    const row = Math.floor(index / 6);
    const col = index % 6;
    const allowed = row + col <= 4;
    return { row, col, allowed };
  });
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden border border-border bg-elevated p-4 sm:p-5">
        <svg viewBox="0 0 820 510" role="img" aria-label="6乘6网格阈值4时从原点可达的格子形成连通区域，超阈值格子不可进入。" className="mx-auto block h-auto w-full max-w-[820px]">
          <text x="410" y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">小坐标示意：k=4 的可达连通区域</text>
          {cells.map(({ row, col, allowed }) => {
            const x = 212 + col * 68;
            const y = 64 + row * 68;
            return <g key={row + "-" + col}><rect x={x} y={y} width="58" height="58" rx="4" fill={allowed ? "var(--success)" : "var(--bg)"} fillOpacity={allowed ? 0.1 : 1} stroke={allowed ? "var(--success)" : "var(--border)"} /><text x={x+29} y={y+25} textAnchor="middle" fontSize="9.5" fill="var(--text-primary)">({row},{col})</text><text x={x+29} y={y+43} textAnchor="middle" fontSize="9" fontWeight="700" fill={allowed ? "var(--success)" : "var(--text-secondary)"}>{row+col}</text></g>;
          })}
          <text x="172" y="94" textAnchor="end" fontSize="10" fontWeight="700" fill="var(--accent)">起点 →</text>
          <text x="410" y="492" textAnchor="middle" fontSize="10.5" fill="var(--text-secondary)">这里只因坐标小于10，数位和等于row+col；大坐标必须逐位计算。</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">搜索只扩展从原点实际到达的合法格，不扫描后直接把所有合法格相加。</figcaption>
    </figure>
  );
}

export function ReachabilityVisitStateMap() {
  const rows = [
    ["越界", "坐标不在网格", "拒绝", "不入队/不递归"],
    ["数位和超阈值", "格子本身不允许进入", "拒绝", "保持未访问"],
    ["已经访问", "此前已从原点到达", "拒绝重复扩展", "永久保留visited"],
    ["合法且未访问", "首次发现可达格", "计数并扩展四邻居", "立即标记visited"],
  ] as const;
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-x-auto border border-border bg-elevated p-4 sm:p-5">
        <table className="w-full min-w-[720px] border-collapse text-left text-sm">
          <thead><tr className="border-b border-border">{["状态", "含义", "动作", "访问策略"].map((item) => <th key={item} className="p-3 text-primary">{item}</th>)}</tr></thead>
          <tbody>{rows.map((row) => <tr key={row[0]} className="border-b border-border last:border-0">{row.map((cell, index) => <td key={cell} className={"p-3 " + (index === 2 ? "font-semibold text-accent" : "text-secondary")}>{cell}</td>)}</tr>)}</tbody>
        </table>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">这里visited表示全局已计数格，不像路径搜索那样在回退时撤销。</figcaption>
    </figure>
  );
}

export function RobotMovingCountLab() {
  return <CodingInterviewLab cases={cases} caption="切换作者官方代表测试，核对多维网格、单轴和阈值边界。" />;
}
