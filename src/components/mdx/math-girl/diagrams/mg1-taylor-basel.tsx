"use client";

import { useState } from "react";

const accent = "var(--accent)";
const success = "var(--success)";
const warning = "var(--warning)";
const danger = "var(--danger)";
const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";

function Frame({
  ariaLabel,
  caption,
  children,
}: {
  ariaLabel: string;
  caption: string;
  children: React.ReactNode;
}) {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox="0 0 720 420"
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
  color = border,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  color?: string;
}) {
  return (
    <g>
      <line
        x1={x1}
        y1={y1}
        x2={x2 - 10}
        y2={y2}
        stroke={color}
        strokeWidth="2"
      />
      <polygon
        points={`${x2},${y2} ${x2 - 10},${y2 - 5} ${x2 - 10},${y2 + 5}`}
        fill={color}
      />
    </g>
  );
}

function Card({
  x,
  y,
  width,
  height,
  title,
  detail,
  color,
}: {
  x: number;
  y: number;
  width: number;
  height: number;
  title: string;
  detail: string;
  color: string;
}) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        rx="12"
        fill={color}
        fillOpacity="0.08"
        stroke={color}
        strokeOpacity="0.65"
      />
      <text
        x={x + width / 2}
        y={y + 31}
        textAnchor="middle"
        fontSize="14"
        fontWeight="700"
        fill={color}
      >
        {title}
      </text>
      <text
        x={x + width / 2}
        y={y + 59}
        textAnchor="middle"
        fontSize="11"
        fill={primary}
      >
        {detail}
      </text>
    </g>
  );
}

/** 总览图：将导数、泰勒和式、零点乘积与 ζ(2) 的系数比较串成证据链。 */
export function Mg1TaylorBaselDiagram() {
  return (
    <Frame
      ariaLabel="泰勒与巴塞尔问题总览图：导数提取系数，正弦零点生成无限乘积，比较 sin x 除以 x 的 x平方系数得到平方倒数和。"
      caption="同一个正弦函数，一面由导数展开，一面由零点分解；系数比较把两面接起来。"
    >
      <text
        x="360"
        y="32"
        textAnchor="middle"
        fontSize="16"
        fontWeight="700"
        fill={primary}
      >
        从正弦的两种语言走到 ζ(2)
      </text>
      <text x="360" y="58" textAnchor="middle" fontSize="12" fill={secondary}>
        导数 → 和式；零点 → 积式；x² 系数 → 平方倒数
      </text>
      <Card
        x={48}
        y={102}
        width={144}
        height={90}
        title="反复微分"
        detail="aₙ=f⁽ⁿ⁾(0)/n!"
        color={accent}
      />
      <Card
        x={208}
        y={102}
        width={144}
        height={90}
        title="泰勒和式"
        detail="sin x / x"
        color={success}
      />
      <Card
        x={368}
        y={102}
        width={144}
        height={90}
        title="零点积式"
        detail="∏(1−x²/n²π²)"
        color={warning}
      />
      <Card
        x={528}
        y={102}
        width={144}
        height={90}
        title="系数比较"
        detail="ζ(2)=π²/6"
        color={danger}
      />
      <Arrow x1={196} y1={147} x2={200} y2={147} color={border} />
      <Arrow x1={356} y1={147} x2={360} y2={147} color={border} />
      <Arrow x1={516} y1={147} x2={520} y2={147} color={border} />
      <line
        x1="280"
        y1="214"
        x2="280"
        y2="258"
        stroke={border}
        strokeWidth="2"
      />
      <polygon points="280,270 274,258 286,258" fill={border} />
      <rect
        x="90"
        y="286"
        width="540"
        height="70"
        rx="12"
        fill={danger}
        fillOpacity="0.07"
        stroke={danger}
      />
      <text
        x="360"
        y="316"
        textAnchor="middle"
        fontSize="14"
        fontWeight="700"
        fill={danger}
      >
        −1/6 = −ζ(2)/π²
      </text>
      <text x="360" y="340" textAnchor="middle" fontSize="12" fill={primary}>
        π 来自零点位置，1/n² 来自每个因子的二次项
      </text>
      <text x="360" y="390" textAnchor="middle" fontSize="12" fill={secondary}>
        无限对象的严密性由余项、收敛和有限截断共同守住
      </text>
    </Frame>
  );
}

/** 静态图：展示正弦导数四步循环与 0 点取值。 */
export function Mg1DerivativeCycleDiagram() {
  const rows = [
    ["sin x", "0", accent],
    ["cos x", "1", success],
    ["−sin x", "0", warning],
    ["−cos x", "−1", danger],
  ] as const;
  return (
    <Frame
      ariaLabel="正弦导数循环图：sin、cos、负 sin、负 cos 四步循环，在 0 点取值 0、1、0、负1。"
      caption="四步导数循环同时决定奇偶性、符号和每个泰勒系数。"
    >
      <text
        x="360"
        y="32"
        textAnchor="middle"
        fontSize="16"
        fontWeight="700"
        fill={primary}
      >
        正弦的导数循环：系数从 0 点长出来
      </text>
      {rows.map(([name, value, color], index) => {
        const y = 86 + index * 65;
        return (
          <g key={name}>
            <rect
              x="116"
              y={y}
              width="180"
              height="44"
              rx="9"
              fill={color}
              fillOpacity="0.08"
              stroke={color}
            />
            <text
              x="206"
              y={y + 28}
              textAnchor="middle"
              fontSize="14"
              fontWeight="700"
              fill={color}
            >
              {name}
            </text>
            <Arrow x1={310} y1={y + 22} x2={358} y2={y + 22} color={border} />
            <rect
              x="380"
              y={y}
              width="224"
              height="44"
              rx="9"
              fill={success}
              fillOpacity="0.07"
              stroke={border}
            />
            <text
              x="492"
              y={y + 28}
              textAnchor="middle"
              fontSize="13"
              fill={primary}
            >
              在 0 处：{value}
            </text>
          </g>
        );
      })}
      <text
        x="360"
        y="376"
        textAnchor="middle"
        fontSize="13"
        fontWeight="700"
        fill={success}
      >
        aₙ = f⁽ⁿ⁾(0)/n!：偶次为 0，奇次符号交替
      </text>
    </Frame>
  );
}

/** 静态图：展示正弦部分和的交错奇次项。 */
export function Mg1SineSeriesDiagram() {
  const terms = ["x", "−x³/3!", "+x⁵/5!", "−x⁷/7!", "+…"];
  return (
    <Frame
      ariaLabel="正弦泰勒展开图：部分和由交错的奇次项组成，余项随阶数增加而下降。"
      caption="奇次项保留奇对称，交错符号和阶乘共同控制逼近误差。"
    >
      <text
        x="360"
        y="32"
        textAnchor="middle"
        fontSize="16"
        fontWeight="700"
        fill={primary}
      >
        sin x = x − x³/3! + x⁵/5! − …
      </text>
      <text x="360" y="58" textAnchor="middle" fontSize="12" fill={secondary}>
        只出现奇次幂；阶乘让余项最终趋于 0
      </text>
      {terms.map((term, index) => {
        const x = 64 + index * 136;
        const height = index === 0 ? 126 : Math.max(32, 126 - index * 20);
        const color = index % 2 === 0 ? accent : warning;
        return (
          <g key={term}>
            <rect
              x={x}
              y={300 - height}
              width="92"
              height={height}
              rx="9"
              fill={color}
              fillOpacity="0.12"
              stroke={color}
            />
            <text
              x={x + 46}
              y="326"
              textAnchor="middle"
              fontSize="12"
              fontWeight="700"
              fill={color}
            >
              {term}
            </text>
          </g>
        );
      })}
      <line
        x1="52"
        y1="300"
        x2="676"
        y2="300"
        stroke={border}
        strokeWidth="1.5"
      />
      <rect
        x="130"
        y="354"
        width="460"
        height="38"
        rx="8"
        fill={success}
        fillOpacity="0.08"
        stroke={success}
      />
      <text
        x="360"
        y="379"
        textAnchor="middle"
        fontSize="12"
        fontWeight="700"
        fill={success}
      >
        |R_N(x)| ≤ |x|⁽ᴺ⁺¹⁾/(N+1)!：固定 x 时趋于 0
      </text>
    </Frame>
  );
}

function factorial(n: number) {
  let value = 1;
  for (let index = 2; index <= n; index += 1) value *= index;
  return value;
}

function sineApproximation(x: number, order: number) {
  let total = 0;
  for (let index = 0; index <= order; index += 1)
    total +=
      ((index % 2 === 0 ? 1 : -1) * x ** (2 * index + 1)) /
      factorial(2 * index + 1);
  return total;
}

/** 交互实验：改变泰勒截断阶数，观察近似值和误差同时变化。 */
export function Mg1TaylorLab() {
  const [order, setOrder] = useState(3);
  const x = 1.2;
  const approximation = sineApproximation(x, order);
  const actual = Math.sin(x);
  const error = Math.abs(actual - approximation);

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div
        data-visual-kind="taylor-series-lab"
        className="overflow-hidden rounded-card border border-border bg-elevated p-5"
      >
        <div className="mb-4 flex flex-wrap items-center justify-center gap-2">
          {Array.from({ length: 6 }, (_, value) => (
            <button
              key={value}
              type="button"
              aria-pressed={order === value}
              onClick={() => setOrder(value)}
              className={`min-h-11 min-w-11 rounded-full border px-3 py-2 text-sm ${order === value ? "border-accent bg-accent/10 text-accent" : "border-border text-secondary"}`}
            >
              阶 {value}
            </button>
          ))}
          <button
            type="button"
            onClick={() => setOrder(3)}
            className="min-h-11 rounded-full border border-border px-4 py-2 text-sm text-secondary"
          >
            重置实验
          </button>
        </div>
        <div className="grid gap-3 md:grid-cols-3">
          <div className="rounded-xl border border-border p-4">
            <p className="m-0 text-sm font-semibold text-primary">输入</p>
            <p className="mt-2 text-2xl font-bold text-accent">x = {x}</p>
            <p className="m-0 text-sm text-secondary">
              保留奇次项到阶 {2 * order + 1}
            </p>
          </div>
          <div className="rounded-xl border border-border p-4">
            <p className="m-0 text-sm font-semibold text-primary">部分和</p>
            <p className="mt-2 text-2xl font-bold text-warning">
              {approximation.toFixed(8)}
            </p>
            <p className="m-0 text-sm text-secondary">
              真实 sin(x)：{actual.toFixed(8)}
            </p>
          </div>
          <div
            className="rounded-xl border border-border p-4"
            aria-live="polite"
          >
            <p className="m-0 text-sm font-semibold text-primary">余项</p>
            <p className="mt-2 text-2xl font-bold text-success">
              {error.toExponential(2)}
            </p>
            <p className="m-0 text-sm text-secondary">
              阶数越高，固定 x 的误差受控下降
            </p>
          </div>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        改变截断阶数，数值变化用于验算；余项边界才负责证明极限。
      </figcaption>
    </figure>
  );
}

/** 静态图：展示正弦零点如何成对生成规范化因子。 */
export function Mg1ZeroProductDiagram() {
  return (
    <Frame
      ariaLabel="正弦零点乘积图：零点正负 nπ 成对后生成 1 减 x平方除以 n平方π平方的因子，所有因子相乘得到 sin x 除以 x。"
      caption="配对正负零点得到偶因子，除去零点 0 后常数项规范化为 1。"
    >
      <text
        x="360"
        y="32"
        textAnchor="middle"
        fontSize="16"
        fontWeight="700"
        fill={primary}
      >
        零点 → 因子：sin x / x 的规范化乘积
      </text>
      <line
        x1="76"
        y1="180"
        x2="644"
        y2="180"
        stroke={border}
        strokeWidth="2"
      />
      {[
        [-1, "−π"],
        [0, "0"],
        [1, "π"],
        [2, "2π"],
        [-2, "−2π"],
      ].map(([position, label]) => {
        const x = 360 + Number(position) * 92;
        return (
          <g key={label}>
            <circle
              cx={x}
              cy="180"
              r="9"
              fill={position === 0 ? danger : accent}
            />
            <text
              x={x}
              y="214"
              textAnchor="middle"
              fontSize="12"
              fill={primary}
            >
              {label}
            </text>
          </g>
        );
      })}
      <Arrow x1={274} y1={274} x2={352} y2={274} color={warning} />
      <Arrow x1={368} y1={274} x2={446} y2={274} color={warning} />
      <rect
        x="94"
        y="246"
        width="164"
        height="58"
        rx="10"
        fill={accent}
        fillOpacity="0.08"
        stroke={accent}
      />
      <text
        x="176"
        y="271"
        textAnchor="middle"
        fontSize="13"
        fontWeight="700"
        fill={accent}
      >
        ±nπ 配对
      </text>
      <text x="176" y="292" textAnchor="middle" fontSize="11" fill={primary}>
        平方对称
      </text>
      <rect
        x="462"
        y="246"
        width="164"
        height="58"
        rx="10"
        fill={success}
        fillOpacity="0.08"
        stroke={success}
      />
      <text
        x="544"
        y="271"
        textAnchor="middle"
        fontSize="13"
        fontWeight="700"
        fill={success}
      >
        因子
      </text>
      <text x="544" y="292" textAnchor="middle" fontSize="11" fill={primary}>
        1−x²/(n²π²)
      </text>
      <rect
        x="118"
        y="340"
        width="484"
        height="48"
        rx="9"
        fill={warning}
        fillOpacity="0.08"
        stroke={warning}
      />
      <text
        x="360"
        y="370"
        textAnchor="middle"
        fontSize="13"
        fontWeight="700"
        fill={warning}
      >
        sin x / x = ∏ₙ≥1 (1−x²/(n²π²))
      </text>
    </Frame>
  );
}

/** 静态图：展示有限截断中 x² 系数如何变成平方倒数部分和。 */
export function Mg1CoefficientDiagram() {
  return (
    <Frame
      ariaLabel="系数比较图：有限乘积中 x平方项只能从一个因子选取，因此系数是负的平方倒数部分和除以π平方，极限与泰勒系数负六分之一相等。"
      caption="先在有限乘积中提取系数，再让截断数趋于无穷，避免把无限重排当作有限代数。"
    >
      <text
        x="360"
        y="32"
        textAnchor="middle"
        fontSize="16"
        fontWeight="700"
        fill={primary}
      >
        比较 x²：最短的非平凡系数证据
      </text>
      <Card
        x={58}
        y={102}
        width={246}
        height={94}
        title="泰勒和式"
        detail="[x²](sin x/x) = −1/6"
        color={accent}
      />
      <Card
        x={416}
        y={102}
        width={246}
        height={94}
        title="有限积式"
        detail="[x²]P_N = −Σₙ≤N 1/(n²π²)"
        color={warning}
      />
      <Arrow x1={320} y1={150} x2={400} y2={150} color={success} />
      <text x="360" y="136" textAnchor="middle" fontSize="11" fill={success}>
        同一函数
      </text>
      <rect
        x="116"
        y="244"
        width="488"
        height="82"
        rx="11"
        fill={success}
        fillOpacity="0.08"
        stroke={success}
      />
      <text
        x="360"
        y="276"
        textAnchor="middle"
        fontSize="14"
        fontWeight="700"
        fill={success}
      >
        −1/6 = −ζ(2)/π²
      </text>
      <text x="360" y="302" textAnchor="middle" fontSize="12" fill={primary}>
        ζ(2)=π²/6
      </text>
      <text x="360" y="370" textAnchor="middle" fontSize="12" fill={secondary}>
        常数项只验证规范化；x² 首次暴露平方倒数和
      </text>
    </Frame>
  );
}

/** 静态图：展示有限截断、余项与极限的三层职责。 */
export function Mg1RemainderDiagram() {
  return (
    <Frame
      ariaLabel="严密性图：有限阶段先做代数系数比较，收敛阶段控制余项，最后取极限得到无限对象的结论。"
      caption="把无限证明拆成有限恒等式、误差控制和极限收尾三项职责。"
    >
      <text
        x="360"
        y="32"
        textAnchor="middle"
        fontSize="16"
        fontWeight="700"
        fill={primary}
      >
        无限系数比较的三层安全网
      </text>
      <Card
        x={58}
        y={108}
        width={176}
        height={104}
        title="有限阶段"
        detail="展开 P_N，提取 x²"
        color={accent}
      />
      <Card
        x={272}
        y={108}
        width={176}
        height={104}
        title="收敛阶段"
        detail="Σ1/n² 有界"
        color={warning}
      />
      <Card
        x={486}
        y={108}
        width={176}
        height={104}
        title="极限阶段"
        detail="N 趋于无穷"
        color={success}
      />
      <Arrow x1={242} y1={160} x2={262} y2={160} color={border} />
      <Arrow x1={456} y1={160} x2={476} y2={160} color={border} />
      <rect
        x="116"
        y="274"
        width="488"
        height="74"
        rx="11"
        fill={danger}
        fillOpacity="0.07"
        stroke={danger}
      />
      <text
        x="360"
        y="304"
        textAnchor="middle"
        fontSize="13"
        fontWeight="700"
        fill={danger}
      >
        不能跳过：零点乘积的理论边界
      </text>
      <text x="360" y="329" textAnchor="middle" fontSize="12" fill={primary}>
        有限多项式定理 ≠ 无限整函数乘积的自动证明
      </text>
      <text x="360" y="382" textAnchor="middle" fontSize="12" fill={secondary}>
        代数、收敛、理论依据各自承担不同责任
      </text>
    </Frame>
  );
}
