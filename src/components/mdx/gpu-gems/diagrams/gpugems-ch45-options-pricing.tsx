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
        <svg viewBox="0 0 720 390" role="img" aria-label={ariaLabel} className="mx-auto block h-auto w-full max-w-[720px]">
          {children}
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">{caption}</figcaption>
    </figure>
  );
}

function Arrow({ x1, y1, x2, y2, color = accent }: { x1: number; y1: number; x2: number; y2: number; color?: string }) {
  return (
    <>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth={2.5} />
      <path d={`M ${x2 - 8} ${y2 - 5} L ${x2} ${y2} L ${x2 - 8} ${y2 + 5}`} fill="none" stroke={color} strokeWidth={2.5} />
    </>
  );
}

export function GpuGemsCh45BlackScholesDiagram() {
  const inputs = ["asset S", "strike X", "time T", "rate r", "volatility σ"];
  return (
    <Frame ariaLabel="Black-Scholes GPU 计算流程：五个输入参数进入每个像素的公式和 CND，输出一个欧式看涨期权价格" caption="每个像素承载一份期权输入，fragment program 独立输出一份价格。">
      <text x={36} y={34} fontSize={14} fontWeight={700} fill={primary}>Black–Scholes：一份输入对应一个价格</text>
      {inputs.map((label, index) => {
        const y = 78 + index * 45;
        return <g key={label}><rect x={42} y={y} width={150} height={30} rx={7} fill={surface} stroke={border} /><text x={117} y={y + 20} textAnchor="middle" fontSize={12} fill={primary}>{label}</text><Arrow x1={200} y1={y + 15} x2={284} y2={190} color={index === 0 ? accent : secondary} /></g>;
      })}
      <rect x={286} y={120} width={194} height={140} rx={16} fill={accent} fillOpacity={0.1} stroke={accent} strokeWidth={2} />
      <text x={383} y={151} textAnchor="middle" fontSize={14} fontWeight={700} fill={accent}>fragment program</text>
      <text x={383} y={181} textAnchor="middle" fontSize={12} fill={primary}>d₁, d₂ → CND(d)</text>
      <text x={383} y={208} textAnchor="middle" fontSize={12} fill={secondary}>S × CND(d₁)</text>
      <text x={383} y={232} textAnchor="middle" fontSize={12} fill={secondary}>− X e⁻ʳᵀ × CND(d₂)</text>
      <Arrow x1={492} y1={190} x2={570} y2={190} color={success} />
      <rect x={574} y={150} width={106} height={80} rx={14} fill={success} fillOpacity={0.12} stroke={success} strokeWidth={2} />
      <text x={627} y={182} textAnchor="middle" fontSize={13} fontWeight={700} fill={success}>call price</text>
      <text x={627} y={207} textAnchor="middle" fontSize={12} fill={primary}>V(S,X,T)</text>
      <text x={360} y={346} textAnchor="middle" fontSize={13} fill={secondary}>运算密集、选项之间独立，适合批量并行和少量 uniform 共享</text>
    </Frame>
  );
}

export function GpuGemsCh45NormalCdfDiagram() {
  return (
    <Frame ariaLabel="累积标准正态分布近似：先计算 L 和幂次 K，再用四路 dot 向量化多项式并输出 CND" caption="CND 没有简单闭式表达式；把幂次和系数排成 float4，可利用 GPU 四路向量算术。">
      <text x={36} y={34} fontSize={14} fontWeight={700} fill={primary}>CND：把多项式近似改写成四路向量操作</text>
      <g transform="translate(48 98)">
        <rect width={168} height={112} rx={14} fill={surface} stroke={border} />
        <text x={84} y={30} textAnchor="middle" fontSize={13} fontWeight={700} fill={accent}>输入 x</text>
        <text x={84} y={59} textAnchor="middle" fontSize={12} fill={secondary}>L = |x| × 常数</text>
        <text x={84} y={85} textAnchor="middle" fontSize={12} fill={secondary}>K = 1 / (1 + aL)</text>
      </g>
      <Arrow x1={224} y1={154} x2={296} y2={154} />
      <g transform="translate(304 80)">
        <rect width={176} height={150} rx={14} fill={accent} fillOpacity={0.1} stroke={accent} strokeWidth={2} />
        <text x={88} y={32} textAnchor="middle" fontSize={13} fontWeight={700} fill={accent}>float4 K</text>
        <text x={88} y={64} textAnchor="middle" fontSize={12} fill={primary}>K, K², K³, K⁴</text>
        <text x={88} y={94} textAnchor="middle" fontSize={12} fill={secondary}>dot(coefficients, powers)</text>
        <text x={88} y={122} textAnchor="middle" fontSize={12} fill={secondary}>+ K⁵ 与 exp 项</text>
      </g>
      <Arrow x1={488} y1={154} x2={560} y2={154} color={success} />
      <rect x={566} y={112} width={106} height={84} rx={14} fill={success} fillOpacity={0.12} stroke={success} strokeWidth={2} />
      <text x={619} y={146} textAnchor="middle" fontSize={14} fontWeight={700} fill={success}>CND(x)</text>
      <text x={619} y={172} textAnchor="middle" fontSize={12} fill={primary}>概率值</text>
      <rect x={90} y={278} width={540} height={52} rx={13} fill={surface} stroke={border} />
      <text x={360} y={310} textAnchor="middle" fontSize={13} fill={secondary}>一次调用内部有较多浮点运算，算术强度高于 CPU↔GPU 往返成本</text>
    </Frame>
  );
}

export function GpuGemsCh45LatticeDiagram() {
  const levels = [
    [{ x: 360, y: 82, label: "t₀" }],
    [{ x: 314, y: 154, label: "u" }, { x: 406, y: 154, label: "d" }],
    [{ x: 268, y: 226, label: "uu" }, { x: 360, y: 226, label: "ud" }, { x: 452, y: 226, label: "dd" }],
  ];
  return (
    <Frame ariaLabel="二项式 lattice 价格树：资产价格随时间向上或向下分叉，终点 payoff 从右向左反向计算到根节点" caption="lattice 把到期日的 payoff 放在叶子上，再沿时间反向折现回当前价格。">
      <text x={36} y={34} fontSize={14} fontWeight={700} fill={primary}>Binomial lattice：依赖关系沿时间向后收缩</text>
      {levels.slice(0, 2).flatMap((level, levelIndex) => level.map((node, nodeIndex) => {
        const next = levels[levelIndex + 1] ?? [];
        return next.map((target, targetIndex) => {
          if (targetIndex !== nodeIndex && targetIndex !== nodeIndex + 1) return null;
          return <line key={`${levelIndex}-${nodeIndex}-${targetIndex}`} x1={node.x} y1={node.y + 18} x2={target.x} y2={target.y - 18} stroke={border} strokeWidth={2} />;
        });
      }))}
      {levels.flat().map((node) => <g key={`${node.label}-${node.x}`}><circle cx={node.x} cy={node.y} r={22} fill={node.label === "t₀" ? accent : surface} fillOpacity={node.label === "t₀" ? 0.18 : 1} stroke={node.label === "t₀" ? accent : warning} strokeWidth={2} /><text x={node.x} y={node.y + 5} textAnchor="middle" fontSize={12} fontWeight={700} fill={primary}>{node.label}</text></g>)}
      <text x={132} y={306} fontSize={13} fontWeight={700} fill={success}>到期 payoff</text>
      <text x={132} y={331} fontSize={12} fill={secondary}>max(S − X, 0) 或 put payoff</text>
      <Arrow x1={294} y1={318} x2={404} y2={318} color={success} />
      <text x={460} y={306} fontSize={13} fontWeight={700} fill={accent}>反向动态规划</text>
      <text x={460} y={331} fontSize={12} fill={secondary}>期望值 × 折现因子 → 根节点</text>
    </Frame>
  );
}

export function GpuGemsCh45LatticeGpuDiagram() {
  return (
    <Frame ariaLabel="GPU lattice 批量策略：多个期权并行展开各自的资产树，每轮只计算同一列并把结果交给下一列" caption="单个 lattice 有反向依赖；同时运行许多独立期权，才能让 GPU 保持足够多的线程。">
      <text x={36} y={34} fontSize={14} fontWeight={700} fill={primary}>GPU lattice：列级同步，期权级并行</text>
      <g transform="translate(46 76)">
        <text x={110} y={0} textAnchor="middle" fontSize={13} fontWeight={700} fill={secondary}>option A</text>
        <text x={330} y={0} textAnchor="middle" fontSize={13} fontWeight={700} fill={secondary}>option B</text>
        {Array.from({ length: 5 }, (_, row) => Array.from({ length: 3 }, (_, col) => {
          const x = 38 + col * 72 + (row % 2) * 18;
          const y = 38 + row * 42;
          return <circle key={`a-${row}-${col}`} cx={x} cy={y} r={12} fill={col === 2 ? warning : accent} fillOpacity={0.16} stroke={col === 2 ? warning : accent} />;
        }))}
        {Array.from({ length: 5 }, (_, row) => Array.from({ length: 3 }, (_, col) => {
          const x = 258 + col * 72 + (row % 2) * 18;
          const y = 38 + row * 42;
          return <circle key={`b-${row}-${col}`} cx={x} cy={y} r={12} fill={col === 2 ? warning : success} fillOpacity={0.16} stroke={col === 2 ? warning : success} />;
        }))}
      </g>
      <g transform="translate(480 92)">
        <rect width={184} height={136} rx={14} fill={surface} stroke={border} />
        <text x={92} y={30} textAnchor="middle" fontSize={13} fontWeight={700} fill={primary}>每一列一个 kernel</text>
        <text x={92} y={61} textAnchor="middle" fontSize={12} fill={secondary}>读右侧两个节点</text>
        <text x={92} y={87} textAnchor="middle" fontSize={12} fill={secondary}>写左侧一个节点</text>
        <text x={92} y={113} textAnchor="middle" fontSize={12} fill={accent}>多份 option 同时推进</text>
      </g>
      <Arrow x1={386} y1={174} x2={472} y2={174} color={warning} />
      <rect x={100} y={294} width={520} height={48} rx={12} fill={surface} stroke={border} />
      <text x={360} y={324} textAnchor="middle" fontSize={13} fill={secondary}>单棵树依赖顺序；一千份独立树提供横向并行度</text>
    </Frame>
  );
}

export function GpuGemsCh45ArithmeticIntensityDiagram() {
  return (
    <Frame ariaLabel="算术强度示意：Black-Scholes 每个输入只需少量纹理带宽，却包含 log、sqrt、exp 和 CND 多项式等大量浮点操作" caption="GPU 的优势来自单位数据搬运对应更多计算，而不是简单把 CPU 代码搬到显卡。">
      <text x={36} y={34} fontSize={14} fontWeight={700} fill={primary}>为什么 Black–Scholes 适合 GPU：算术强度高</text>
      <g transform="translate(92 82)">
        <rect width={194} height={190} rx={16} fill={surface} stroke={accent} strokeWidth={2} />
        <text x={97} y={32} textAnchor="middle" fontSize={14} fontWeight={700} fill={accent}>输入带宽</text>
        {[["S, X, T, σ", 68], ["r uniform", 106], ["输出 V", 144]].map(([label, y]) => <g key={label}><rect x={28} y={Number(y)} width={138} height={25} rx={6} fill={accent} fillOpacity={0.12} stroke={accent} /><text x={97} y={Number(y) + 17} textAnchor="middle" fontSize={12} fill={primary}>{label}</text></g>)}
      </g>
      <Arrow x1={306} y1={177} x2={394} y2={177} />
      <g transform="translate(400 82)">
        <rect width={224} height={190} rx={16} fill={success} fillOpacity={0.08} stroke={success} strokeWidth={2} />
        <text x={112} y={32} textAnchor="middle" fontSize={14} fontWeight={700} fill={success}>计算密度</text>
        {["log / div", "sqrt / exp", "CND polynomial", "dot(float4)"] .map((label, index) => <text key={label} x={112} y={70 + index * 28} textAnchor="middle" fontSize={12} fill={primary}>{label}</text>)}
      </g>
      <text x={360} y={324} textAnchor="middle" fontSize={13} fill={secondary}>把更多后续金融计算留在 GPU，可摊薄 CPU↔GPU 通信成本</text>
    </Frame>
  );
}

type Model = "black-scholes" | "binomial";

function normalCdf(x: number) {
  const sign = x < 0 ? -1 : 1;
  const ax = Math.abs(x);
  const p = 0.2316419;
  const k = 1 / (1 + p * ax);
  const poly = k * (0.31938153 + k * (-0.356563782 + k * (1.781477937 + k * (-1.821255978 + k * 1.330274429))));
  const density = Math.exp(-0.5 * ax * ax) / Math.sqrt(2 * Math.PI);
  const value = 1 - density * poly;
  return sign === 1 ? value : 1 - value;
}

function blackScholesCall(spot: number, strike: number, maturity: number, rate: number, volatility: number) {
  const sigmaRootT = volatility * Math.sqrt(maturity);
  const d1 = (Math.log(spot / strike) + (rate + 0.5 * volatility * volatility) * maturity) / sigmaRootT;
  const d2 = d1 - sigmaRootT;
  return spot * normalCdf(d1) - strike * Math.exp(-rate * maturity) * normalCdf(d2);
}

function binomialCall(spot: number, strike: number, maturity: number, rate: number, volatility: number, steps: number) {
  const dt = maturity / steps;
  const up = Math.exp(volatility * Math.sqrt(dt));
  const down = 1 / up;
  const discount = Math.exp(-rate * dt);
  const upProbability = (Math.exp(rate * dt) - down) / (up - down);
  let values = Array.from({ length: steps + 1 }, (_, j) => Math.max(spot * up ** j * down ** (steps - j) - strike, 0));
  for (let time = steps - 1; time >= 0; time -= 1) {
    values = Array.from({ length: time + 1 }, (_, j) => discount * (upProbability * values[j + 1] + (1 - upProbability) * values[j]));
  }
  return values[0];
}

function optionPrice(model: Model, spot: number, volatility: number, steps: number) {
  return model === "black-scholes" ? blackScholesCall(spot, 100, 1, 0.05, volatility) : binomialCall(spot, 100, 1, 0.05, volatility, steps);
}

export function GpuGemsCh45OptionsPricingLab() {
  const [model, setModel] = useState<Model>("black-scholes");
  const [spot, setSpot] = useState(100);
  const [volatility, setVolatility] = useState(0.2);
  const [steps, setSteps] = useState(32);
  const currentPrice = optionPrice(model, spot, volatility, steps);
  const series = useMemo(() => Array.from({ length: 9 }, (_, index) => {
    const x = 60 + index * 10;
    return { x, price: optionPrice(model, x, volatility, steps) };
  }), [model, volatility, steps]);
  const minPrice = Math.min(...series.map((point) => point.price));
  const maxPrice = Math.max(...series.map((point) => point.price));
  const priceRange = Math.max(maxPrice - minPrice, 0.001);
  const points = series.map((point, index) => `${62 + index * 42},${194 - ((point.price - minPrice) / priceRange) * 126}`).join(" ");
  const latticeSteps = 4;
  const latticeNodes = Array.from({ length: latticeSteps + 1 }, (_, time) => Array.from({ length: time + 1 }, (_, node) => ({
    x: 470 + time * 56,
    y: 242 - time * 20 + node * 40,
    value: Math.max(spot * Math.exp(volatility * Math.sqrt(1 / latticeSteps) * node) * Math.exp(-volatility * Math.sqrt(1 / latticeSteps) * (time - node)) - 100, 0),
  })));

  function reset() {
    setModel("black-scholes");
    setSpot(100);
    setVolatility(0.2);
    setSteps(32);
  }

  return (
    <section className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated" aria-label="GPU Gems Chapter 45 期权定价实验：切换 Black-Scholes 与 binomial lattice，调整资产价格、波动率和步数" data-visual-kind="gpu-gems-ch45-options-pricing">
      <div className="border-b border-border px-5 py-4">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-[11px] uppercase tracking-[0.18em] text-secondary">GPU Gems 2 · Chapter 45</p>
            <h3 className="mt-1 text-lg font-semibold text-primary">期权定价：同一输入批量映射到 GPU</h3>
            <p className="mt-1 max-w-2xl text-sm text-secondary">切换解析模型和 lattice 模型，改变 spot、volatility、steps，观察实际计算出的 call price 与价格敏感曲线。</p>
          </div>
          <span className="rounded-control border border-accent px-2 py-1 text-[11px] text-accent">▷ 可交互</span>
        </div>
      </div>
      <div className="grid gap-5 p-5 lg:grid-cols-[minmax(0,1fr)_250px]">
        <div className="min-w-0 rounded-card border border-border bg-surface p-3">
          <svg viewBox="0 0 720 360" className="h-auto w-full" role="img" aria-label={`${model === "black-scholes" ? "Black-Scholes" : "binomial lattice"} 模型，当前标的价格 ${spot}，期权价格 ${currentPrice.toFixed(2)}，价格敏感曲线和 lattice 预览`}>
            <rect x={16} y={16} width={292} height={82} rx={14} fill={accent} fillOpacity={0.1} stroke={accent} strokeWidth={2} />
            <text x={34} y={46} fontSize={13} fill={secondary}>当前模型价格</text>
            <text x={34} y={79} fontSize={26} fontWeight={700} fill={accent}>{currentPrice.toFixed(2)}</text>
            <text x={164} y={79} fontSize={12} fill={secondary}>European call · X=100 · T=1</text>
            <text x={20} y={132} fontSize={13} fontWeight={700} fill={primary}>spot → price 敏感曲线</text>
            <polyline points={points} fill="none" stroke={success} strokeWidth={3} />
            {series.map((point, index) => <circle key={point.x} cx={62 + index * 42} cy={194 - ((point.price - minPrice) / priceRange) * 126} r={point.x === spot ? 6 : 3.5} fill={point.x === spot ? warning : success} />)}
            <line x1={52} y1={194} x2={400} y2={194} stroke={border} />
            <text x={52} y={216} fontSize={11} fill={secondary}>60</text><text x={378} y={216} fontSize={11} fill={secondary}>140</text>
            <text x={20} y={250} fontSize={13} fontWeight={700} fill={primary}>lattice 预览（四步）</text>
            {latticeNodes.slice(0, 4).flatMap((level, time) => level.map((node, index) => {
              const next = latticeNodes[time + 1]?.[index];
              const down = latticeNodes[time + 1]?.[index + 1];
              return [next, down].filter(Boolean).map((target, targetIndex) => <line key={`${time}-${index}-${targetIndex}`} x1={node.x} y1={node.y} x2={target!.x} y2={target!.y} stroke={border} strokeWidth={1.5} />);
            }))}
            {latticeNodes.flat().map((node, index) => <g key={`${node.x}-${node.y}-${index}`}><circle cx={node.x} cy={node.y} r={13} fill={node.x > 600 ? warning : surface} fillOpacity={node.x > 600 ? 0.2 : 1} stroke={node.x > 600 ? warning : accent} /><text x={node.x} y={node.y + 4} textAnchor="middle" fontSize={11} fill={primary}>{node.value.toFixed(0)}</text></g>)}
          </svg>
        </div>
        <aside className="space-y-4 rounded-card border border-border bg-surface p-4">
          <div>
            <label htmlFor="ch45-model" className="mb-1 block text-xs font-semibold text-primary">定价模型</label>
            <select id="ch45-model" value={model} onChange={(event) => setModel(event.target.value as Model)} className="min-h-[44px] w-full rounded-control border border-border bg-elevated px-3 py-2 text-sm text-primary">
              <option value="black-scholes">Black-Scholes · 解析</option>
              <option value="binomial">Binomial lattice · 迭代</option>
            </select>
          </div>
          <div>
            <div className="flex items-center justify-between text-xs"><label htmlFor="ch45-spot" className="font-semibold text-primary">标的价格 S</label><span className="font-mono text-accent">{spot}</span></div>
            <input id="ch45-spot" type="range" min={60} max={140} step={5} value={spot} onChange={(event) => setSpot(Number(event.target.value))} className="mt-2 w-full accent-[var(--accent)]" />
          </div>
          <div>
            <div className="flex items-center justify-between text-xs"><label htmlFor="ch45-volatility" className="font-semibold text-primary">波动率 σ</label><span className="font-mono text-accent">{volatility.toFixed(2)}</span></div>
            <input id="ch45-volatility" type="range" min={0.05} max={0.6} step={0.05} value={volatility} onChange={(event) => setVolatility(Number(event.target.value))} className="mt-2 w-full accent-[var(--accent)]" />
          </div>
          <div>
            <div className="flex items-center justify-between text-xs"><label htmlFor="ch45-steps" className="font-semibold text-primary">lattice 步数</label><span className="font-mono text-accent">{steps}</span></div>
            <input id="ch45-steps" type="range" min={8} max={128} step={8} value={steps} onChange={(event) => setSteps(Number(event.target.value))} className="mt-2 w-full accent-[var(--accent)]" />
          </div>
          <div className="rounded-card border border-border bg-elevated p-3 text-xs">
            <p className="font-semibold text-primary">输入契约</p>
            <dl className="mt-2 space-y-2 text-secondary">
              <div className="flex justify-between gap-3"><dt>strike X</dt><dd className="font-mono text-primary">100</dd></div>
              <div className="flex justify-between gap-3"><dt>risk-free r</dt><dd className="font-mono text-primary">0.05</dd></div>
              <div className="flex justify-between gap-3"><dt>maturity T</dt><dd className="font-mono text-primary">1 year</dd></div>
            </dl>
          </div>
          <button type="button" onClick={reset} className="min-h-[44px] w-full rounded-control border border-border px-3 py-2 text-xs font-semibold text-secondary hover:border-accent hover:text-accent">重置实验</button>
        </aside>
      </div>
      <div className="border-t border-border px-5 py-3 text-xs text-secondary">这是教学计算，不是投资建议；价格只是给定模型和输入假设下的数值输出。</div>
    </section>
  );
}
