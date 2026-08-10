"use client";

import { useMemo, useState, type ReactNode } from "react";

const accent = "var(--accent)";
const success = "var(--success)";
const warning = "var(--warning)";
const danger = "var(--danger)";
const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";
const surface = "var(--surface)";

function Frame({
  ariaLabel,
  caption,
  children,
}: {
  ariaLabel: string;
  caption: string;
  children: ReactNode;
}) {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox="0 0 720 390"
          role="img"
          aria-label={ariaLabel}
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {children}
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        {caption}
      </figcaption>
    </figure>
  );
}

function Arrow({
  x1,
  y1,
  x2,
  y2,
  color = accent,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  color?: string;
}) {
  return (
    <>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth={2.5} />
      <path d={`M ${x2 - 8} ${y2 - 5} L ${x2} ${y2} L ${x2 - 8} ${y2 + 5}`} fill="none" stroke={color} strokeWidth={2.5} />
    </>
  );
}

export function GpuGemsCh43ProteinGraphDiagram() {
  const nodes: Array<[number, number, string]> = [
    [220, 150, "i"],
    [450, 118, "j"],
    [350, 292, "k"],
    [510, 270, "l"],
  ];
  return (
    <Frame
      ariaLabel="蛋白质原子图模型：节点代表原子，边同时保存距离上界和下界"
      caption="把分子距离约束改写成带上下界标签的完全图。"
    >
      <text x={36} y={34} fontSize={14} fontWeight={700} fill={primary}>
        Kₙ：原子是节点，距离上下界是边标签
      </text>
      <text x={36} y={58} fontSize={12} fill={secondary}>
        NMR 只测到部分距离；未知边先用宽松上下界占位
      </text>
      <g stroke={border} strokeWidth={2}>
        <line x1={220} y1={150} x2={450} y2={118} />
        <line x1={220} y1={150} x2={350} y2={292} />
        <line x1={220} y1={150} x2={510} y2={270} />
        <line x1={450} y1={118} x2={350} y2={292} />
        <line x1={450} y1={118} x2={510} y2={270} />
        <line x1={350} y1={292} x2={510} y2={270} />
      </g>
      {nodes.map(([x, y, label]) => (
        <g key={label}>
          <circle cx={x} cy={y} r={25} fill="var(--bg)" stroke={accent} strokeWidth={2.5} />
          <text x={x} y={y + 6} textAnchor="middle" fontSize={16} fontWeight={700} fill={accent}>
            {label}
          </text>
        </g>
      ))}
      <g transform="translate(48 112)">
        <rect width={128} height={114} rx={12} fill={surface} stroke={border} />
        <text x={16} y={28} fontSize={13} fontWeight={700} fill={primary}>边 (i, j)</text>
        <text x={16} y={55} fontSize={12} fill={success}>uᵢⱼ：不能超过</text>
        <text x={16} y={80} fontSize={12} fill={warning}>lᵢⱼ：不能低于</text>
        <text x={16} y={103} fontSize={11} fill={secondary}>平滑后约束更紧</text>
      </g>
      <text x={350} y={356} textAnchor="middle" fontSize={13} fill={secondary}>
        每对原子都要满足同一组几何约束
      </text>
    </Frame>
  );
}

export function GpuGemsCh43TriangleInequalityDiagram() {
  return (
    <Frame
      ariaLabel="三角不等式示意图：i 到 j 的距离上界由 i 到 k 加 k 到 j 收紧，下界由两种差值决定"
      caption="中间点 k 提供一条绕行路径，帮助收紧 i 与 j 的距离范围。"
    >
      <text x={36} y={34} fontSize={14} fontWeight={700} fill={primary}>
        三角不等式：一条中间路径就能收紧边界
      </text>
      <line x1={168} y1={254} x2={350} y2={110} stroke={success} strokeWidth={4} />
      <line x1={350} y1={110} x2={548} y2={254} stroke={success} strokeWidth={4} />
      <line x1={168} y1={254} x2={548} y2={254} stroke={accent} strokeWidth={4} />
      <circle cx={168} cy={254} r={24} fill="var(--bg)" stroke={accent} strokeWidth={2.5} />
      <circle cx={350} cy={110} r={24} fill="var(--bg)" stroke={warning} strokeWidth={2.5} />
      <circle cx={548} cy={254} r={24} fill="var(--bg)" stroke={accent} strokeWidth={2.5} />
      <text x={168} y={260} textAnchor="middle" fontSize={15} fontWeight={700} fill={accent}>i</text>
      <text x={350} y={116} textAnchor="middle" fontSize={15} fontWeight={700} fill={warning}>k</text>
      <text x={548} y={260} textAnchor="middle" fontSize={15} fontWeight={700} fill={accent}>j</text>
      <text x={253} y={172} textAnchor="middle" fontSize={12} fill={success}>uᵢₖ / lᵢₖ</text>
      <text x={451} y={172} textAnchor="middle" fontSize={12} fill={success}>uₖⱼ / lₖⱼ</text>
      <text x={358} y={285} textAnchor="middle" fontSize={12} fill={accent}>uᵢⱼ / lᵢⱼ</text>
      <rect x={62} y={318} width={596} height={42} rx={12} fill={surface} stroke={border} />
      <text x={360} y={344} textAnchor="middle" fontSize={13} fontWeight={700} fill={primary}>
        uᵢⱼ ← min(uᵢⱼ, uᵢₖ + uₖⱼ)　　lᵢⱼ ← max(lᵢⱼ, lᵢₖ − uₖⱼ, lₖⱼ − uᵢₖ)
      </text>
    </Frame>
  );
}

export function GpuGemsCh43FloydWarshallDiagram() {
  const cells = Array.from({ length: 25 }, (_, index) => index);
  return (
    <Frame
      ariaLabel="Floyd-Warshall 更新图：固定中间节点 k，距离矩阵中每个 d i j 可独立读取 i k 和 k j 后写回自身"
      caption="外层循环固定 k，内层的每个矩阵单元只写回自己的位置。"
    >
      <text x={36} y={34} fontSize={14} fontWeight={700} fill={primary}>
        Floyd–Warshall：固定 k，并行更新全部 (i, j)
      </text>
      <g transform="translate(66 82)">
        <text x={122} y={-18} textAnchor="middle" fontSize={13} fontWeight={700} fill={warning}>j</text>
        <text x={-22} y={122} textAnchor="middle" fontSize={13} fontWeight={700} fill={accent}>i</text>
        {cells.map((cell) => {
          const row = Math.floor(cell / 5);
          const col = cell % 5;
          const isRow = row === 2;
          const isCol = col === 2;
          return (
            <rect
              key={cell}
              x={col * 48}
              y={row * 48}
              width={44}
              height={44}
              rx={6}
              fill={isRow || isCol ? "var(--accent)" : "var(--surface)"}
              fillOpacity={isRow || isCol ? 0.18 : 1}
              stroke={isRow || isCol ? accent : border}
              strokeWidth={isRow || isCol ? 2 : 1}
            />
          );
        })}
        <text x={122} y={122} textAnchor="middle" fontSize={13} fontWeight={700} fill={warning}>k</text>
        <text x={122} y={228} textAnchor="middle" fontSize={12} fill={secondary}>D[i, j] ← min(D[i, j], D[i, k] + D[k, j])</text>
      </g>
      <g transform="translate(390 92)">
        <rect width={270} height={182} rx={16} fill={surface} stroke={border} />
        <text x={22} y={32} fontSize={13} fontWeight={700} fill={primary}>一个 fragment (i, j)</text>
        <text x={22} y={66} fontSize={12} fill={secondary}>读：D[i,j]、D[i,k]、D[k,j]</text>
        <Arrow x1={22} y1={88} x2={224} y2={88} />
        <text x={22} y={122} fontSize={12} fill={success}>算：min(旧值, 绕 k 的路径)</text>
        <Arrow x1={22} y1={144} x2={224} y2={144} color={success} />
        <text x={22} y={174} fontSize={12} fill={accent}>写：唯一的 D[i,j]</text>
      </g>
      <text x={360} y={350} textAnchor="middle" fontSize={13} fill={secondary}>
        读多个位置、写一个确定位置，正好匹配 GPU 的数据并行模型
      </text>
    </Frame>
  );
}

export function GpuGemsCh43PingPongDiagram() {
  return (
    <Frame
      ariaLabel="GPU ping-pong 缓冲：前缓冲作为纹理输入，后缓冲作为渲染目标，完成一轮后交换角色"
      caption="GPU 不能同时把同一块存储当作纹理和 render target，因此每轮交换两块缓冲。"
    >
      <text x={36} y={34} fontSize={14} fontWeight={700} fill={primary}>
        动态更新：ping-pong 缓冲隔离读写
      </text>
      <g transform="translate(70 106)">
        <rect width={208} height={142} rx={18} fill={surface} stroke={accent} strokeWidth={2} />
        <text x={104} y={34} textAnchor="middle" fontSize={15} fontWeight={700} fill={accent}>Front / ping</text>
        <text x={104} y={64} textAnchor="middle" fontSize={12} fill={secondary}>纹理输入：Dᵏ</text>
        <text x={104} y={96} textAnchor="middle" fontSize={12} fill={secondary}>读 D[i, k]、D[k, j]</text>
        <text x={104} y={122} textAnchor="middle" fontSize={11} fill={accent}>k 轮开始</text>
      </g>
      <g transform="translate(442 106)">
        <rect width={208} height={142} rx={18} fill={surface} stroke={success} strokeWidth={2} />
        <text x={104} y={34} textAnchor="middle" fontSize={15} fontWeight={700} fill={success}>Back / pong</text>
        <text x={104} y={64} textAnchor="middle" fontSize={12} fill={secondary}>render target：Dᵏ⁺¹</text>
        <text x={104} y={96} textAnchor="middle" fontSize={12} fill={secondary}>写回每个 fragment</text>
        <text x={104} y={122} textAnchor="middle" fontSize={11} fill={success}>k 轮结束</text>
      </g>
      <Arrow x1={284} y1={166} x2={436} y2={166} />
      <Arrow x1={436} y1={208} x2={284} y2={208} color={success} />
      <text x={360} y={152} textAnchor="middle" fontSize={12} fill={accent}>渲染</text>
      <text x={360} y={234} textAnchor="middle" fontSize={12} fill={success}>交换角色</text>
      <rect x={116} y={302} width={488} height={46} rx={12} fill={surface} stroke={border} />
      <text x={360} y={331} textAnchor="middle" fontSize={13} fontWeight={700} fill={primary}>
        下一轮：上一轮输出成为下一轮输入
      </text>
    </Frame>
  );
}

export function GpuGemsCh43VectorizationDiagram() {
  return (
    <Frame
      ariaLabel="RGBA 向量化示意：一个纹理 texel 的四个通道打包连续的四条距离边，从而把渲染宽度压缩为四分之一"
      caption="把四条连续边装进 RGBA，一个 fragment 同时处理四个标量更新。"
    >
      <text x={36} y={34} fontSize={14} fontWeight={700} fill={primary}>
        向量化：把四条边打包进一个 RGBA texel
      </text>
      <g transform="translate(58 105)">
        <text x={0} y={-20} fontSize={13} fontWeight={700} fill={secondary}>原始距离矩阵的一行</text>
        {["D[i,4j]", "D[i,4j+1]", "D[i,4j+2]", "D[i,4j+3]", "D[i,4j+4]", "D[i,4j+5]"].map((label, index) => (
          <g key={label}>
            <rect x={index * 77} y={0} width={70} height={62} rx={8} fill="var(--surface)" stroke={border} />
            <text x={index * 77 + 35} y={36} textAnchor="middle" fontSize={11} fill={primary}>{label}</text>
          </g>
        ))}
      </g>
      <Arrow x1={286} y1={194} x2={434} y2={194} />
      <text x={360} y={184} textAnchor="middle" fontSize={12} fill={accent}>pack</text>
      <g transform="translate(82 244)">
        <text x={0} y={-18} fontSize={13} fontWeight={700} fill={secondary}>一个纹理 texel T[i, j]</text>
        {[
          ["R", "D[i,4j]", accent],
          ["G", "D[i,4j+1]", success],
          ["B", "D[i,4j+2]", warning],
          ["A", "D[i,4j+3]", danger],
        ].map(([channel, label, color], index) => (
          <g key={channel}>
            <rect x={index * 137} y={0} width={126} height={62} rx={8} fill={color} fillOpacity={0.12} stroke={color} strokeWidth={2} />
            <text x={index * 137 + 18} y={25} fontSize={13} fontWeight={700} fill={color}>{channel}</text>
            <text x={index * 137 + 18} y={47} fontSize={11} fill={primary}>{label}</text>
          </g>
        ))}
      </g>
      <text x={360} y={358} textAnchor="middle" fontSize={13} fill={secondary}>
        存储和渲染宽度约缩小为四分之一，但 shader 要按通道重排索引
      </text>
    </Frame>
  );
}

type BoundMode = "upper" | "lower" | "both";
type Matrix = number[][];

const BASE_UPPER: Matrix = [
  [0, 7.5, 9.2, 11.8, 10.6, 13.2],
  [7.5, 0, 6.4, 10.1, 9.8, 12.3],
  [9.2, 6.4, 0, 7.1, 8.6, 10.8],
  [11.8, 10.1, 7.1, 0, 6.2, 8.4],
  [10.6, 9.8, 8.6, 6.2, 0, 5.7],
  [13.2, 12.3, 10.8, 8.4, 5.7, 0],
];

const BASE_LOWER: Matrix = [
  [0, 2.1, 3.7, 5.2, 4.3, 6.1],
  [2.1, 0, 1.8, 4.4, 3.1, 5.0],
  [3.7, 1.8, 0, 2.0, 2.8, 4.0],
  [5.2, 4.4, 2.0, 0, 1.7, 2.6],
  [4.3, 3.1, 2.8, 1.7, 0, 1.4],
  [6.1, 5.0, 4.0, 2.6, 1.4, 0],
];

function cloneMatrix(matrix: Matrix): Matrix {
  return matrix.map((row) => [...row]);
}

function smoothUpper(matrix: Matrix, k: number): Matrix {
  const next = cloneMatrix(matrix);
  for (let i = 0; i < matrix.length; i += 1) {
    for (let j = 0; j < matrix.length; j += 1) {
      next[i][j] = Math.min(matrix[i][j], matrix[i][k] + matrix[k][j]);
    }
  }
  return next;
}

function smoothLower(lower: Matrix, upper: Matrix, k: number): Matrix {
  const next = cloneMatrix(lower);
  for (let i = 0; i < lower.length; i += 1) {
    for (let j = 0; j < lower.length; j += 1) {
      next[i][j] = Math.max(
        lower[i][j],
        lower[i][k] - upper[k][j],
        lower[k][j] - upper[i][k],
      );
    }
  }
  return next;
}

function runStages(stage: number, mode: BoundMode): { matrix: Matrix; upper: Matrix; lower: Matrix } {
  let upper = cloneMatrix(BASE_UPPER);
  let lower = cloneMatrix(BASE_LOWER);
  for (let k = 0; k < stage; k += 1) {
    upper = smoothUpper(upper, k);
    lower = smoothLower(lower, upper, k);
  }
  return { matrix: mode === "upper" ? upper : lower, upper, lower };
}

function matrixLabel(mode: BoundMode) {
  if (mode === "upper") return "上界矩阵 U";
  if (mode === "lower") return "下界矩阵 L";
  return "下界矩阵 L（同时推进 U）";
}

export function GpuGemsCh43ProteinSmoothingLab() {
  const [mode, setMode] = useState<BoundMode>("upper");
  const [stage, setStage] = useState(0);
  const [vectorized, setVectorized] = useState(false);
  const n = BASE_UPPER.length;
  const result = useMemo(() => runStages(stage, mode), [mode, stage]);
  const matrix = result.matrix;
  const initialMatrix = mode === "upper" ? BASE_UPPER : BASE_LOWER;
  const changedCells = matrix.reduce(
    (count, row, i) => count + row.reduce((rowCount, value, j) => rowCount + (Math.abs(value - initialMatrix[i][j]) > 0.001 ? 1 : 0), 0),
    0,
  );
  const storageCells = vectorized ? n * Math.ceil(n / 4) : n * n;
  const scalarFetches = n * n * 3;
  const fetches = vectorized ? Math.ceil(scalarFetches / 4) : scalarFetches;

  function reset() {
    setMode("upper");
    setStage(0);
    setVectorized(false);
  }

  return (
    <section
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated"
      aria-label="GPU Gems Chapter 43 距离上下界平滑实验：推进 Floyd-Warshall 的 k 轮，切换上下界并观察 RGBA 向量化的存储和读取变化"
      data-visual-kind="gpu-gems-ch43-protein-smoothing"
    >
      <div className="border-b border-border px-5 py-4">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-[11px] uppercase tracking-[0.18em] text-secondary">GPU Gems 2 · Chapter 43</p>
            <h3 className="mt-1 text-lg font-semibold text-primary">距离上下界平滑：每一轮 k 都在矩阵上留下证据</h3>
            <p className="mt-1 max-w-2xl text-sm text-secondary">改变中间节点、边界类型和打包方式，观察哪些矩阵单元被收紧，以及 GPU 需要读写多少数据。</p>
          </div>
          <span className="rounded-control border border-accent px-2 py-1 text-[11px] text-accent">▷ 可交互</span>
        </div>
      </div>
      <div className="grid gap-5 p-5 lg:grid-cols-[minmax(0,1fr)_250px]">
        <div className="min-w-0">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
            <div>
              <p className="text-sm font-semibold text-primary">{matrixLabel(mode)} · {stage === 0 ? "初始边界" : `已完成 k = 0…${stage - 1}`}</p>
              <p className="text-xs text-secondary">高亮的行/列展示当前中间节点 k 的读路径。</p>
            </div>
            <button type="button" onClick={() => setStage((stage + 1) % (n + 1))} className="rounded-control border border-accent px-3 py-2 text-xs font-semibold text-accent hover:bg-accent/10">
              推进一轮 k
            </button>
          </div>
          <div className="overflow-x-auto rounded-card border border-border bg-surface p-3">
            <table className="min-w-[520px] border-collapse text-center text-xs" aria-label={`${matrixLabel(mode)}，当前第 ${stage} 轮`}>
              <thead>
                <tr>
                  <th className="p-2 text-secondary">i＼j</th>
                  {matrix.map((_, j) => <th key={`head-${j}`} className={`p-2 ${j === Math.max(stage - 1, 0) && stage > 0 ? "text-warning" : "text-secondary"}`}>{j}</th>)}
                </tr>
              </thead>
              <tbody>
                {matrix.map((row, i) => (
                  <tr key={`row-${i}`}>
                    <th className={`p-2 ${i === Math.max(stage - 1, 0) && stage > 0 ? "text-warning" : "text-secondary"}`}>{i}</th>
                    {row.map((value, j) => {
                      const active = stage > 0 && (i === stage - 1 || j === stage - 1);
                      const changed = Math.abs(value - initialMatrix[i][j]) > 0.001;
                      return <td key={`${i}-${j}`} className="p-1"><span className={`inline-flex min-w-[58px] justify-center rounded px-2 py-2 font-mono ${active ? "bg-accent/15 text-accent" : changed ? "bg-success/10 text-success" : "text-primary"}`}>{value.toFixed(1)}</span></td>;
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <aside className="space-y-4 rounded-card border border-border bg-surface p-4">
          <div>
            <label htmlFor="ch43-bound-mode" className="mb-1 block text-xs font-semibold text-primary">更新对象</label>
            <select id="ch43-bound-mode" value={mode} onChange={(event) => { setMode(event.target.value as BoundMode); setStage(0); }} className="min-h-[44px] w-full rounded-control border border-border bg-elevated px-3 py-2 text-sm text-primary">
              <option value="upper">上界 U：取 min</option>
              <option value="lower">下界 L：取 max</option>
              <option value="both">一起推进 U + L</option>
            </select>
          </div>
          <div>
            <div className="flex items-center justify-between text-xs"><label htmlFor="ch43-stage" className="font-semibold text-primary">完成的 k 轮</label><span className="font-mono text-accent">{stage}/{n}</span></div>
            <input id="ch43-stage" type="range" min={0} max={n} value={stage} onChange={(event) => setStage(Number(event.target.value))} className="mt-2 w-full accent-[var(--accent)]" />
          </div>
          <label className="flex items-start gap-2 text-xs text-secondary">
            <input type="checkbox" checked={vectorized} onChange={(event) => setVectorized(event.target.checked)} className="mt-0.5 accent-[var(--accent)]" />
            <span><strong className="text-primary">RGBA 向量化</strong><br />四条边打包到一个 texel</span>
          </label>
          <div className="rounded-card border border-border bg-elevated p-3 text-xs">
            <p className="font-semibold text-primary">本轮证据</p>
            <dl className="mt-2 space-y-2 text-secondary">
              <div className="flex justify-between gap-3"><dt>已收紧单元</dt><dd className="font-mono text-success">{changedCells}</dd></div>
              <div className="flex justify-between gap-3"><dt>存储 texel</dt><dd className="font-mono text-accent">{storageCells}</dd></div>
              <div className="flex justify-between gap-3"><dt>估算 scalar fetch</dt><dd className="font-mono text-warning">{fetches}</dd></div>
            </dl>
          </div>
          <button type="button" onClick={reset} className="w-full rounded-control border border-border px-3 py-2 text-xs font-semibold text-secondary hover:border-accent hover:text-accent">重置实验</button>
        </aside>
      </div>
      <div className="border-t border-border px-5 py-3 text-xs text-secondary">
        当前操作：{stage === 0 ? "尚未引入中间节点" : `对 k = ${stage - 1} 应用 ${mode === "upper" ? "min 上界更新" : mode === "lower" ? "max 下界更新" : "上下界更新"}`}；GPU 仍以一个 fragment 写回一个确定的矩阵位置。
      </div>
    </section>
  );
}
