"use client";

const cases = [
  {
    label: "BFCE成功",
    fields: [["棋盘", "ABTG / CFCS / JDEH"], ["起点", "(0,1)=B"], ["路径", "B↓F→C↓E"], ["结果", "true"]],
  },
  {
    label: "ABFB失败",
    fields: [["前缀", "A→B↓F"], ["下一字符", "B"], ["唯一相邻B", "已访问过"], ["结果", "不能复用格子"]],
  },
  {
    label: "全A边界",
    fields: [["棋盘", "3×4共12格"], ["长度12", "存在覆盖全部格子的路径"], ["长度13", "必定失败"], ["剪枝", "word长度大于格子数"]],
  },
  {
    label: "单格/空",
    fields: [["A找A", "true"], ["A找B", "false"], ["空矩阵", "false"], ["空字符串", "需由接口明确约定"]],
  },
] as const;

export function MatrixPathBoardDiagram() {
  const cells = [
    ["A", 0, 0, false, ""], ["B", 0, 1, true, "1"], ["T", 0, 2, false, ""], ["G", 0, 3, false, ""],
    ["C", 1, 0, false, ""], ["F", 1, 1, true, "2"], ["C", 1, 2, true, "3"], ["S", 1, 3, false, ""],
    ["J", 2, 0, false, ""], ["D", 2, 1, false, ""], ["E", 2, 2, true, "4"], ["H", 2, 3, false, ""],
  ] as const;
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden border border-border bg-elevated p-4 sm:p-5">
        <svg viewBox="0 0 820 430" role="img" aria-label="3乘4矩阵中路径B向下到F、向右到C、向下到E组成BFCE。" className="mx-auto block h-auto w-full max-w-[820px]">
          <defs><marker id="path-arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 Z" fill="var(--accent)" /></marker></defs>
          <text x="410" y="30" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">BFCE：每步四邻接，同一格最多使用一次</text>
          {cells.map(([letter,row,col,active,step]) => {
            const x = 216 + Number(col) * 102;
            const y = 74 + Number(row) * 102;
            return <g key={String(row) + col}><rect x={x} y={y} width="82" height="82" rx="5" fill={active ? "var(--accent)" : "var(--bg)"} fillOpacity={active ? 0.11 : 1} stroke={active ? "var(--accent)" : "var(--border)"} strokeWidth={active ? 2 : 1} /><text x={x+41} y={y+49} textAnchor="middle" fontSize="20" fontWeight="700" fill="var(--text-primary)">{letter}</text>{active ? <text x={x+68} y={y+18} textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--accent)">{step}</text> : null}</g>;
          })}
          <path d="M359 156 L359 172" stroke="var(--accent)" strokeWidth="4" markerEnd="url(#path-arrow)" />
          <path d="M400 217 L420 217" stroke="var(--accent)" strokeWidth="4" markerEnd="url(#path-arrow)" />
          <path d="M461 258 L461 274" stroke="var(--accent)" strokeWidth="4" markerEnd="url(#path-arrow)" />
          <rect x="170" y="390" width="480" height="30" rx="5" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" />
          <text x="410" y="410" textAnchor="middle" fontSize="11" fill="var(--text-primary)">路径是坐标序列，不要求字母在内存中连续。</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">作者示例路径为 B↓F→C↓E；对角线移动不合法。</figcaption>
    </figure>
  );
}

export function BacktrackingStateMap() {
  const rows = [
    ["越界", "当前坐标不在矩阵内", "返回false", "不改变状态"],
    ["字符不匹配", "格子字符不是word[index]", "返回false", "不改变状态"],
    ["格子已访问", "本条路径已经使用它", "返回false", "禁止复用"],
    ["匹配且未访问", "标记后尝试四个邻居", "任一成功就成功", "全部失败时撤销"],
    ["index到达长度", "所有字符均已匹配", "返回true", "找到完整路径"],
  ] as const;
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-x-auto border border-border bg-elevated p-4 sm:p-5">
        <table className="w-full min-w-[760px] border-collapse text-left text-sm">
          <thead><tr className="border-b border-border">{["状态", "判断", "动作", "访问标记"].map((item) => <th key={item} className="p-3 text-primary">{item}</th>)}</tr></thead>
          <tbody>{rows.map((row) => <tr key={row[0]} className="border-b border-border last:border-0">{row.map((cell, index) => <td key={cell} className={"p-3 " + (index === 2 ? "font-semibold text-accent" : "text-secondary")}>{cell}</td>)}</tr>)}</tbody>
        </table>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">回溯帧只拥有自己选择的格子，失败离开时必须恢复进入前状态。</figcaption>
    </figure>
  );
}

export function VisitedRollbackDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden border border-border bg-elevated p-4 sm:p-5">
        <svg viewBox="0 0 820 330" role="img" aria-label="进入格子后设置visited，四个方向全部失败时撤销，成功时保留结果并结束搜索。" className="mx-auto block h-auto w-full max-w-[820px]">
          <defs><marker id="rollback-arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 Z" fill="var(--accent)" /></marker></defs>
          {[
            ["匹配当前格", 64, 126, 150, "var(--bg)"],
            ["visited=true", 260, 126, 150, "var(--accent)"],
            ["尝试四邻居", 456, 126, 150, "var(--bg)"],
            ["任一成功", 634, 66, 126, "var(--success)"],
            ["全部失败", 634, 196, 126, "var(--warning)"],
          ].map(([label,x,y,w,color]) => <g key={String(label)}><rect x={Number(x)} y={Number(y)} width={Number(w)} height="48" rx="5" fill={String(color)} fillOpacity={color === "var(--bg)" ? 1 : 0.1} stroke={String(color === "var(--bg)" ? "var(--border)" : color)} /><text x={Number(x)+Number(w)/2} y={Number(y)+29} textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--text-primary)">{label}</text></g>)}
          <path d="M214 150 L250 150" stroke="var(--accent)" strokeWidth="3" markerEnd="url(#rollback-arrow)" />
          <path d="M410 150 L446 150" stroke="var(--accent)" strokeWidth="3" markerEnd="url(#rollback-arrow)" />
          <path d="M606 144 C628 130 628 108 624 92" fill="none" stroke="var(--success)" strokeWidth="3" markerEnd="url(#rollback-arrow)" />
          <path d="M606 158 C628 174 628 198 624 214" fill="none" stroke="var(--warning)" strokeWidth="3" markerEnd="url(#rollback-arrow)" />
          <text x="697" y="44" textAnchor="middle" fontSize="11" fill="var(--success)">返回true，不再探索</text>
          <text x="697" y="278" textAnchor="middle" fontSize="11" fill="var(--warning)">visited=false，再返回false</text>
          <rect x="188" y="286" width="444" height="30" rx="5" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" />
          <text x="410" y="306" textAnchor="middle" fontSize="11" fill="var(--text-primary)">撤销让同一格能被其他起点或其他分支重新使用。</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">访问限制属于“当前路径”，不是整次搜索的永久封禁。</figcaption>
    </figure>
  );
}
