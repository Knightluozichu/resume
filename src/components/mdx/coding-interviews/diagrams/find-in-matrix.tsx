"use client";

import { CodingInterviewLab } from "./official-lab";

const pathCases = [
  {
    label: "起点9",
    fields: [["位置", "右上角(0,3)"], ["比较", "9大于目标7"], ["排除", "第3列都不小于9"], ["移动", "向左到8"]],
  },
  {
    label: "比较8",
    fields: [["位置", "(0,2)"], ["比较", "8大于7"], ["排除", "当前第2列"], ["移动", "向左到2"]],
  },
  {
    label: "比较2与4",
    fields: [["2小于7", "排除第0行，向下"], ["4小于7", "排除第1行，向下"], ["候选", "只剩更靠左下区域"], ["路径", "行只增，列只减"]],
  },
  {
    label: "命中7",
    fields: [["位置", "(2,1)"], ["比较", "7等于目标"], ["结果", "返回true"], ["比较次数", "共5次"]],
  },
] as const;

const contractCases = [
  {
    label: "空矩阵",
    fields: [["输入", "没有任何元素"], ["结果", "false"], ["风险", "先读matrix[0]会越界"], ["动作", "在读取列数前返回"]],
  },
  {
    label: "扁平矩阵",
    fields: [["存储", "连续rows*columns个元素"], ["映射", "index=row*columns+column"], ["前提", "尺寸与缓冲区一致"], ["来源", "作者官方C++接口"]],
  },
  {
    label: "嵌套数组",
    fields: [["存储", "vector<vector<int>>或number[][]"], ["前提", "每行列数相同"], ["风险", "锯齿数组使固定column越界"], ["动作", "先验证矩形形状"]],
  },
  {
    label: "单调性破坏",
    fields: [["输入", "某行或某列无序"], ["问题", "排除证明不再成立"], ["症状", "可能跳过真实目标"], ["动作", "拒绝输入或换一般搜索"]],
  },
] as const;

export function MonotoneMatrixDiagram() {
  const matrix = [[1,2,8,9],[2,4,9,12],[4,7,10,13],[6,8,11,15]];
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden border border-border bg-elevated p-4 sm:p-5">
        <svg viewBox="0 0 780 430" role="img" aria-label="四乘四行列递增矩阵，从右上角9查找7；大于目标向左，小于目标向下，路径依次经过9、8、2、4、7。" className="mx-auto block h-auto w-full max-w-[780px]">
          <text x="390" y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">右上角同时是当前行最大值与当前列最小值</text>
          {matrix.map((row, r) => row.map((value, c) => {
            const x = 88 + c * 86;
            const y = 74 + r * 66;
            const onPath = [[0,3],[0,2],[0,1],[1,1],[2,1]].some(([pr,pc]) => pr === r && pc === c);
            return <g key={`${r}-${c}`}><rect x={x} y={y} width="64" height="48" rx="4" fill={onPath ? "var(--accent)" : "var(--bg)"} fillOpacity={onPath ? "0.12" : "1"} stroke={onPath ? "var(--accent)" : "var(--border)"} /><text x={x + 32} y={y + 30} textAnchor="middle" fontSize="13" fontWeight={onPath ? "700" : "500"} fill="var(--text-primary)">{value}</text></g>;
          }))}
          <text x="260" y="358" textAnchor="middle" fontSize="10.5" fill="var(--text-secondary)">行向右不减，列向下不减</text>
          <rect x="470" y="76" width="250" height="214" rx="6" fill="var(--bg)" stroke="var(--border)" />
          <text x="595" y="106" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--text-primary)">在候选区域右上角比较x</text>
          <rect x="492" y="132" width="206" height="42" rx="4" fill="var(--danger)" fillOpacity="0.07" stroke="var(--danger)" />
          <text x="595" y="158" textAnchor="middle" fontSize="10" fill="var(--text-primary)">x大于target → 删除当前列</text>
          <rect x="492" y="188" width="206" height="42" rx="4" fill="var(--success)" fillOpacity="0.07" stroke="var(--success)" />
          <text x="595" y="214" textAnchor="middle" fontSize="10" fill="var(--text-primary)">x小于target → 删除当前行</text>
          <rect x="492" y="244" width="206" height="30" rx="4" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" />
          <text x="595" y="264" textAnchor="middle" fontSize="10" fill="var(--text-primary)">x等于target → 命中</text>
          <rect x="100" y="386" width="580" height="28" rx="5" fill="var(--warning)" fillOpacity="0.07" stroke="var(--warning)" />
          <text x="390" y="405" textAnchor="middle" fontSize="10.5" fill="var(--text-primary)">路径的行坐标只增加、列坐标只减少，候选区域单调收缩。</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">右上角让每次比较都有唯一排除方向；左下角可做完全对称的搜索。</figcaption>
    </figure>
  );
}

export function EliminationProofMap() {
  const rows = [
    ["当前值大于目标", "当前列下方值都更大", "整列不可能命中", "column--"],
    ["当前值小于目标", "当前行左侧值都更小", "整行不可能命中", "row++"],
    ["当前值等于目标", "候选点就是答案", "立即结束", "return true"],
  ] as const;
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-x-auto border border-border bg-elevated p-4 sm:p-5">
        <table className="w-full min-w-[680px] border-collapse text-left text-sm">
          <thead><tr className="border-b border-border"><th className="p-3 text-primary">比较</th><th className="p-3 text-primary">单调性证据</th><th className="p-3 text-primary">可排除区域</th><th className="p-3 text-primary">动作</th></tr></thead>
          <tbody>{rows.map((row) => <tr key={row[0]} className="border-b border-border last:border-0">{row.map((cell, index) => <td key={cell} className={`p-3 ${index === 3 ? "font-mono text-accent" : "text-secondary"}`}>{cell}</td>)}</tr>)}</tbody>
        </table>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">每次移动都带着一条完整排除证明，而不是凭目标大致方向猜测。</figcaption>
    </figure>
  );
}

export function SearchPathLab() {
  return <CodingInterviewLab cases={pathCases} caption="逐步查找7，观察每次比较删除一整行或一整列。" />;
}

export function MatrixContractLab() {
  return <CodingInterviewLab cases={contractCases} caption="切换存储形态和非法输入，检查索引映射与单调性前提。" />;
}
