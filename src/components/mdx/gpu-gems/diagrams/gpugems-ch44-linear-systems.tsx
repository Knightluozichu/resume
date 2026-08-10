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

export function GpuGemsCh44VectorTextureDiagram() {
  return (
    <Frame
      ariaLabel="GPU 向量表示：一维向量重排到二维纹理，连续的 2x2 数值打包到一个 RGBA texel"
      caption="标量、向量和矩阵都被变成纹理，2×2 连续块共享一个 RGBA texel。"
    >
      <text x={36} y={34} fontSize={14} fontWeight={700} fill={primary}>
        表示层：把线性代数对象变成 GPU 纹理
      </text>
      <g transform="translate(44 108)">
        <text x={0} y={-20} fontSize={13} fontWeight={700} fill={secondary}>向量 v</text>
        {Array.from({ length: 8 }, (_, i) => (
          <g key={i}>
            <rect x={i * 38} y={0} width={34} height={46} rx={6} fill="var(--surface)" stroke={border} />
            <text x={i * 38 + 17} y={29} textAnchor="middle" fontSize={12} fill={primary}>{i + 1}</text>
          </g>
        ))}
      </g>
      <Arrow x1={360} y1={148} x2={436} y2={148} />
      <text x={398} y={135} textAnchor="middle" fontSize={11} fill={accent}>reorder</text>
      <g transform="translate(474 82)">
        <text x={0} y={0} fontSize={13} fontWeight={700} fill={secondary}>2×2 block → RGBA</text>
        <rect x={0} y={22} width={78} height={78} rx={8} fill={surface} stroke={border} />
        <line x1={39} y1={22} x2={39} y2={100} stroke={border} />
        <line x1={0} y1={61} x2={78} y2={61} stroke={border} />
        <text x={19} y={49} textAnchor="middle" fontSize={12} fill={accent}>R</text>
        <text x={58} y={49} textAnchor="middle" fontSize={12} fill={success}>G</text>
        <text x={19} y={87} textAnchor="middle" fontSize={12} fill={warning}>B</text>
        <text x={58} y={87} textAnchor="middle" fontSize={12} fill={danger}>A</text>
      </g>
      <g transform="translate(92 246)">
        <rect width={536} height={72} rx={14} fill={surface} stroke={border} />
        <text x={24} y={30} fontSize={13} fontWeight={700} fill={primary}>好布局的条件</text>
        <text x={24} y={55} fontSize={12} fill={secondary}>坐标可推导 · 访问连续 · 空值可跳过 · 中间纹理可复用</text>
      </g>
      <text x={360} y={356} textAnchor="middle" fontSize={13} fill={secondary}>
        uniform 适合少量常量；会参与运算的标量也要有可寻址的纹理表示
      </text>
    </Frame>
  );
}

export function GpuGemsCh44MatrixLayoutDiagram() {
  const layouts = [
    { title: "dense", color: accent, active: (i: number, j: number) => true },
    { title: "banded", color: success, active: (i: number, j: number) => Math.abs(i - j) <= 1 },
    { title: "sparse", color: warning, active: (i: number, j: number) => (i * 3 + j * 5) % 7 === 0 || i === j },
  ];
  return (
    <Frame
      ariaLabel="三种矩阵布局：dense 几乎每个元素非零，banded 只在对角线附近非零，sparse 只有少量散点"
      caption="矩阵的零值结构决定访问方式：不要用 dense 的成本表示一个 banded 算子。"
    >
      <text x={36} y={34} fontSize={14} fontWeight={700} fill={primary}>
        矩阵表示：dense、banded 与 sparse 是三种不同契约
      </text>
      {layouts.map((layout, layoutIndex) => (
        <g key={layout.title} transform={`translate(${62 + layoutIndex * 220} 76)`}>
          <text x={70} y={0} textAnchor="middle" fontSize={14} fontWeight={700} fill={layout.color}>{layout.title}</text>
          {Array.from({ length: 36 }, (_, cell) => {
            const i = Math.floor(cell / 6);
            const j = cell % 6;
            const active = layout.active(i, j);
            return <rect key={cell} x={j * 24} y={24 + i * 24} width={21} height={21} rx={3} fill={active ? layout.color : "var(--surface)"} fillOpacity={active ? 0.72 : 1} stroke={active ? layout.color : border} strokeWidth={1} />;
          })}
          <text x={70} y={190} textAnchor="middle" fontSize={11} fill={secondary}>{layoutIndex === 0 ? "几乎全填" : layoutIndex === 1 ? "对角线带" : "少量非零"}</text>
        </g>
      ))}
      <rect x={76} y={310} width={568} height={44} rx={12} fill={surface} stroke={border} />
      <text x={360} y={338} textAnchor="middle" fontSize={13} fontWeight={700} fill={primary}>
        先选择表示，再实现 matrix-vector：数据结构本身就是性能路径
      </text>
    </Frame>
  );
}

export function GpuGemsCh44MatrixVectorDiagram() {
  return (
    <Frame
      ariaLabel="矩阵向量乘法：矩阵每一行与向量做点积，结果按行写入输出向量纹理"
      caption="顶点位置编码矩阵列，纹理坐标编码向量索引，结果点被写入对应的输出位置。"
    >
      <text x={36} y={34} fontSize={14} fontWeight={700} fill={primary}>
        matrix-vector：一行一行地把点积写回输出
      </text>
      <g transform="translate(44 96)">
        <text x={74} y={-16} textAnchor="middle" fontSize={13} fontWeight={700} fill={accent}>A</text>
        {Array.from({ length: 16 }, (_, cell) => {
          const i = Math.floor(cell / 4);
          const j = cell % 4;
          const active = i === 1;
          return <rect key={cell} x={j * 38} y={i * 38} width={34} height={34} rx={5} fill={active ? accent : surface} fillOpacity={active ? 0.2 : 1} stroke={active ? accent : border} />;
        })}
        <text x={74} y={160} textAnchor="middle" fontSize={12} fill={secondary}>选中第 i 行</text>
      </g>
      <text x={216} y={160} fontSize={23} fill={secondary}>×</text>
      <g transform="translate(270 96)">
        <text x={19} y={-16} textAnchor="middle" fontSize={13} fontWeight={700} fill={success}>b</text>
        {Array.from({ length: 4 }, (_, i) => <rect key={i} x={0} y={i * 38} width={38} height={34} rx={5} fill={success} fillOpacity={0.18} stroke={success} />)}
        <text x={19} y={160} textAnchor="middle" fontSize={12} fill={secondary}>取样 bⱼ</text>
      </g>
      <text x={344} y={160} fontSize={23} fill={secondary}>=</text>
      <g transform="translate(406 96)">
        <text x={28} y={-16} textAnchor="middle" fontSize={13} fontWeight={700} fill={warning}>xᵢ</text>
        <rect x={0} y={38} width={56} height={34} rx={7} fill={warning} fillOpacity={0.2} stroke={warning} strokeWidth={2} />
        <text x={28} y={60} textAnchor="middle" fontSize={12} fill={primary}>Σ aᵢⱼbⱼ</text>
        <text x={28} y={160} textAnchor="middle" fontSize={12} fill={secondary}>写回 i</text>
      </g>
      <Arrow x1={492} y1={147} x2={584} y2={147} color={success} />
      <g transform="translate(584 96)">
        <text x={28} y={-16} textAnchor="middle" fontSize={13} fontWeight={700} fill={success}>x</text>
        {Array.from({ length: 4 }, (_, i) => <rect key={i} x={0} y={i * 38} width={56} height={34} rx={5} fill={i === 1 ? warning : surface} stroke={i === 1 ? warning : border} />)}
        <text x={28} y={160} textAnchor="middle" fontSize={12} fill={secondary}>输出向量</text>
      </g>
      <text x={360} y={352} textAnchor="middle" fontSize={13} fill={secondary}>
        不是在 CPU 里收集结果：渲染位置和纹理坐标直接决定写入地址
      </text>
    </Frame>
  );
}

export function GpuGemsCh44ConjugateGradientDiagram() {
  const nodes = [
    ["r", "残差"],
    ["p", "搜索方向"],
    ["q = Ap", "矩阵乘"],
    ["α, β", "归约标量"],
    ["x", "解向量"],
  ];
  return (
    <Frame
      ariaLabel="共轭梯度迭代流程：残差 r、搜索方向 p、矩阵乘 q、归约得到 alpha beta，再更新解 x"
      caption="框架把底层纹理细节藏起来，让共轭梯度只组合向量、矩阵和归约操作。"
    >
      <text x={36} y={34} fontSize={14} fontWeight={700} fill={primary}>
        Conjugate Gradient：由基础算子拼出线性系统求解器
      </text>
      {nodes.map(([title, detail], index) => {
        const x = 42 + index * 132;
        return (
          <g key={title}>
            <rect x={x} y={126} width={106} height={88} rx={14} fill={index === 4 ? "var(--success)" : "var(--surface)"} fillOpacity={index === 4 ? 0.14 : 1} stroke={index === 4 ? success : border} strokeWidth={2} />
            <text x={x + 53} y={162} textAnchor="middle" fontSize={15} fontWeight={700} fill={index === 4 ? success : accent}>{title}</text>
            <text x={x + 53} y={188} textAnchor="middle" fontSize={12} fill={secondary}>{detail}</text>
            {index < nodes.length - 1 && <Arrow x1={x + 110} y1={170} x2={x + 126} y2={170} />}
          </g>
        );
      })}
      <path d="M 620 230 C 620 302, 92 302, 92 230" fill="none" stroke={warning} strokeWidth={2.5} />
      <path d="M 100 235 L 92 230 L 101 225" fill="none" stroke={warning} strokeWidth={2.5} />
      <text x={360} y={286} textAnchor="middle" fontSize={13} fill={warning}>重复 solveIteration，直到 residual 足够小或达到上限</text>
      <text x={360} y={354} textAnchor="middle" fontSize={13} fill={secondary}>
        matrixVectorOp、reduceAdd、addVector、divide 都能复用同一套表示层
      </text>
    </Frame>
  );
}

export function GpuGemsCh44WaveSchemeDiagram() {
  return (
    <Frame
      ariaLabel="二维波方程两种时间推进：显式方案只用当前与上一帧，隐式 Crank-Nicolson 把下一帧放进线性系统并用共轭梯度求解"
      caption="显式更新便宜但受时间步稳定性限制；隐式更新更稳定，却要解线性系统。"
    >
      <text x={36} y={34} fontSize={14} fontWeight={700} fill={primary}>
        2D 波方程：从有限差分走到线性系统
      </text>
      <g transform="translate(50 84)">
        <text x={124} y={0} textAnchor="middle" fontSize={14} fontWeight={700} fill={warning}>显式 Euler</text>
        <circle cx={74} cy={94} r={22} fill={surface} stroke={border} />
        <circle cx={124} cy={58} r={22} fill={surface} stroke={border} />
        <circle cx={174} cy={94} r={22} fill={surface} stroke={border} />
        <circle cx={124} cy={130} r={27} fill={warning} fillOpacity={0.18} stroke={warning} strokeWidth={2} />
        <text x={124} y={136} textAnchor="middle" fontSize={12} fill={primary}>next</text>
        <text x={124} y={178} textAnchor="middle" fontSize={12} fill={secondary}>邻域 stencil → 下一帧</text>
      </g>
      <g transform="translate(376 84)">
        <text x={140} y={0} textAnchor="middle" fontSize={14} fontWeight={700} fill={success}>隐式 Crank–Nicolson</text>
        <rect x={12} y={42} width={256} height={106} rx={14} fill={surface} stroke={success} strokeWidth={2} />
        <text x={140} y={78} textAnchor="middle" fontSize={13} fill={primary}>A · x(next) = b(current)</text>
        <text x={140} y={108} textAnchor="middle" fontSize={12} fill={secondary}>CG solver → x(next)</text>
        <text x={140} y={136} textAnchor="middle" fontSize={12} fill={success}>更稳定，代价是迭代求解</text>
      </g>
      <Arrow x1={304} y1={140} x2={374} y2={140} />
      <text x={360} y={218} textAnchor="middle" fontSize={12} fill={accent}>稳定性换计算量</text>
      <rect x={86} y={276} width={548} height={60} rx={14} fill={surface} stroke={border} />
      <text x={360} y={302} textAnchor="middle" fontSize={13} fontWeight={700} fill={primary}>显式：时间步过大可能爆炸</text>
      <text x={360} y={326} textAnchor="middle" fontSize={12} fill={secondary}>隐式：把下一帧未知量交给 GPU 线性代数框架</text>
    </Frame>
  );
}

type Matrix = number[][];
type Layout = "banded" | "dense";

function buildMatrix(layout: Layout, n: number): Matrix {
  return Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => {
    if (layout === "banded") {
      if (i === j) return 2;
      if (Math.abs(i - j) === 1) return -1;
      return 0;
    }
    if (i === j) return 3.5;
    return 0.18 / (1 + Math.abs(i - j));
  }));
}

function dot(a: number[], b: number[]) {
  return a.reduce((sum, value, index) => sum + value * b[index], 0);
}

function matVec(matrix: Matrix, vector: number[]) {
  return matrix.map((row) => dot(row, vector));
}

function subtract(a: number[], b: number[], scale = 1) {
  return a.map((value, index) => value - scale * b[index]);
}

function addScaled(a: number[], b: number[], scale: number) {
  return a.map((value, index) => value + scale * b[index]);
}

function conjugateGradient(matrix: Matrix, b: number[], maxIterations: number) {
  let x = b.map(() => 0);
  let r = subtract(b, matVec(matrix, x));
  let p = [...r];
  let rho = dot(r, r);
  const history = [{ x: [...x], residual: Math.sqrt(rho) }];
  for (let iteration = 0; iteration < maxIterations; iteration += 1) {
    const q = matVec(matrix, p);
    const denominator = Math.max(dot(p, q), 0.000001);
    const alphaValue = rho / denominator;
    x = addScaled(x, p, alphaValue);
    r = subtract(r, q, alphaValue);
    const nextRho = dot(r, r);
    history.push({ x: [...x], residual: Math.sqrt(nextRho) });
    if (nextRho < 0.000001) break;
    const betaValue = nextRho / Math.max(rho, 0.000001);
    p = addScaled(r, p, betaValue);
    rho = nextRho;
  }
  return history;
}

export function GpuGemsCh44LinearSolverLab() {
  const n = 8;
  const b = Array.from({ length: n }, () => 1);
  const [layout, setLayout] = useState<Layout>("banded");
  const [iteration, setIteration] = useState(0);
  const [packed, setPacked] = useState(false);
  const matrix = useMemo(() => buildMatrix(layout, n), [layout]);
  const history = useMemo(() => conjugateGradient(matrix, b, 8), [matrix]);
  const currentIndex = Math.min(iteration, history.length - 1);
  const current = history[currentIndex];
  const maxResidual = Math.max(...history.map((entry) => entry.residual), 1);
  const residualPoints = history.map((entry, index) => `${72 + index * 44},${218 - (entry.residual / maxResidual) * 128}`).join(" ");
  const scalarCells = layout === "banded" ? n * 3 - 2 : n * n;
  const packedCells = Math.ceil(n / 2) * Math.ceil(n / 2);

  function reset() {
    setLayout("banded");
    setIteration(0);
    setPacked(false);
  }

  return (
    <section
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated"
      aria-label="GPU Gems Chapter 44 共轭梯度线性求解实验：切换矩阵布局、推进迭代并观察解向量和残差"
      data-visual-kind="gpu-gems-ch44-linear-solver"
    >
      <div className="border-b border-border px-5 py-4">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-[11px] uppercase tracking-[0.18em] text-secondary">GPU Gems 2 · Chapter 44</p>
            <h3 className="mt-1 text-lg font-semibold text-primary">共轭梯度：每一次矩阵乘都改变残差</h3>
            <p className="mt-1 max-w-2xl text-sm text-secondary">选择 banded 或 dense 算子，逐步推进真实的 CG 迭代，观察解向量逼近目标时 residual 如何下降。</p>
          </div>
          <span className="rounded-control border border-accent px-2 py-1 text-[11px] text-accent">▷ 可交互</span>
        </div>
      </div>
      <div className="grid gap-5 p-5 lg:grid-cols-[minmax(0,1fr)_250px]">
        <div className="min-w-0 rounded-card border border-border bg-surface p-3">
          <svg viewBox="0 0 470 330" className="h-auto w-full" role="img" aria-label={`共轭梯度第 ${currentIndex} 次迭代：残差 ${current.residual.toFixed(4)}，解向量柱状图和残差曲线`}>
            <text x={18} y={24} fontSize={13} fontWeight={700} fill={primary}>解向量 x（当前迭代 {currentIndex}）</text>
            {current.x.map((value, index) => {
              const height = Math.min(100, Math.max(3, Math.abs(value) * 42));
              return <g key={index}><rect x={22 + index * 40} y={138 - height} width={24} height={height} rx={5} fill={accent} fillOpacity={0.72} /><text x={34 + index * 40} y={158} textAnchor="middle" fontSize={11} fill={secondary}>{index}</text></g>;
            })}
            <line x1={16} y1={138} x2={350} y2={138} stroke={border} />
            <text x={18} y={190} fontSize={13} fontWeight={700} fill={primary}>residual = ‖r‖</text>
            <polyline points={residualPoints} fill="none" stroke={success} strokeWidth={3} />
            {history.map((entry, index) => <circle key={index} cx={72 + index * 44} cy={218 - (entry.residual / maxResidual) * 128} r={index === currentIndex ? 6 : 3.5} fill={index === currentIndex ? warning : success} />)}
            <line x1={64} y1={218} x2={420} y2={218} stroke={border} />
            <text x={72} y={242} fontSize={11} fill={secondary}>0</text>
            <text x={380} y={242} fontSize={11} fill={secondary}>迭代</text>
            <rect x={18} y={264} width={402} height={42} rx={10} fill="var(--bg)" stroke={border} />
            <text x={34} y={290} fontSize={12} fill={secondary}>A 类型：{layout} · {packed ? "RGBA 2×2 packing" : "scalar cells"}</text>
          </svg>
        </div>
        <aside className="space-y-4 rounded-card border border-border bg-surface p-4">
          <div>
            <label htmlFor="ch44-layout" className="mb-1 block text-xs font-semibold text-primary">矩阵布局</label>
            <select id="ch44-layout" value={layout} onChange={(event) => { setLayout(event.target.value as Layout); setIteration(0); }} className="min-h-[44px] w-full rounded-control border border-border bg-elevated px-3 py-2 text-sm text-primary">
              <option value="banded">banded：三对角波算子</option>
              <option value="dense">dense：全矩阵示例</option>
            </select>
          </div>
          <div>
            <div className="flex items-center justify-between text-xs"><label htmlFor="ch44-iteration" className="font-semibold text-primary">CG 迭代</label><span className="font-mono text-accent">{currentIndex}/{history.length - 1}</span></div>
            <input id="ch44-iteration" type="range" min={0} max={history.length - 1} value={currentIndex} onChange={(event) => setIteration(Number(event.target.value))} className="mt-2 w-full accent-[var(--accent)]" />
          </div>
          <label className="flex items-start gap-2 text-xs text-secondary">
            <input type="checkbox" checked={packed} onChange={(event) => setPacked(event.target.checked)} className="mt-0.5 accent-[var(--accent)]" />
            <span><strong className="text-primary">2×2 RGBA packing</strong><br />模拟纹理内部布局</span>
          </label>
          <div className="rounded-card border border-border bg-elevated p-3 text-xs">
            <p className="font-semibold text-primary">本次迭代证据</p>
            <dl className="mt-2 space-y-2 text-secondary">
              <div className="flex justify-between gap-3"><dt>residual</dt><dd className="font-mono text-success">{current.residual.toFixed(4)}</dd></div>
              <div className="flex justify-between gap-3"><dt>matrix-vector 次数</dt><dd className="font-mono text-accent">{currentIndex}</dd></div>
              <div className="flex justify-between gap-3"><dt>存储单元</dt><dd className="font-mono text-warning">{packed ? packedCells : scalarCells}</dd></div>
            </dl>
          </div>
          <button type="button" onClick={reset} className="min-h-[44px] w-full rounded-control border border-border px-3 py-2 text-xs font-semibold text-secondary hover:border-accent hover:text-accent">重置实验</button>
        </aside>
      </div>
      <div className="border-t border-border px-5 py-3 text-xs text-secondary">
        计算路径：`r = b − A x` → `q = A p` → 更新 `x` 与 `r` → 用归约得到下一次 `β`；实验只展示由这些运算真实计算出的残差。
      </div>
    </section>
  );
}
