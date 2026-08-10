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

/** 总览图：把约分、指数向量、逐坐标运算和几何判据放在一条路线中。 */
export function Mg2CoprimeDiagram() {
  return (
    <Frame
      ariaLabel="互质总览图：分数约分进入 gcd 和 lcm，再由质数指数向量把乘法转成加法，最后用支撑不相交和内积为零判断互质。"
      caption="从分数的两个动作出发，最后在质数坐标空间中看见互质。"
    >
      <text
        x="360"
        y="32"
        textAnchor="middle"
        fontSize="16"
        fontWeight="700"
        fill={primary}
      >
        互质：从约分走进质数坐标空间
      </text>
      <text x="360" y="58" textAnchor="middle" fontSize="12" fill={secondary}>
        通分 / 约分 → gcd / lcm → 指数向量 → 支撑与内积
      </text>
      <Card
        x={48}
        y={102}
        width={146}
        height={88}
        title="分数"
        detail="8/30 → 4/15"
        color={accent}
      />
      <Card
        x={208}
        y={102}
        width={146}
        height={88}
        title="gcd / lcm"
        detail="6 与 72"
        color={warning}
      />
      <Card
        x={368}
        y={102}
        width={146}
        height={88}
        title="指数向量"
        detail="加法 / min / max"
        color={success}
      />
      <Card
        x={528}
        y={102}
        width={144}
        height={88}
        title="几何"
        detail="内积 = 0"
        color={danger}
      />
      <Arrow x1={198} y1={146} x2={200} y2={146} color={border} />
      <Arrow x1={358} y1={146} x2={360} y2={146} color={border} />
      <Arrow x1={518} y1={146} x2={520} y2={146} color={border} />
      <line
        x1="280"
        y1="212"
        x2="280"
        y2="254"
        stroke={border}
        strokeWidth="2"
      />
      <polygon points="280,266 274,254 286,254" fill={border} />
      <rect
        x="90"
        y="282"
        width="540"
        height="72"
        rx="12"
        fill={danger}
        fillOpacity="0.07"
        stroke={danger}
      />
      <text
        x="360"
        y="312"
        textAnchor="middle"
        fontSize="14"
        fontWeight="700"
        fill={danger}
      >
        互质 ⇔ 支撑不相交 ⇔ 指数向量内积为 0
      </text>
      <text x="360" y="337" textAnchor="middle" fontSize="12" fill={primary}>
        两个合数也可以互质，关键是共享质数的坐标是否为空
      </text>
      <text x="360" y="390" textAnchor="middle" fontSize="12" fill={secondary}>
        无限多条质数轴，但每个自然数只有有限支撑
      </text>
    </Frame>
  );
}

function gcd(a: number, b: number) {
  let x = a;
  let y = b;
  while (y !== 0) [x, y] = [y, x % y];
  return x;
}

function factorize(value: number) {
  const factors: Record<number, number> = {};
  let rest = value;
  for (let prime = 2; prime <= rest; prime += 1) {
    while (rest % prime === 0) {
      factors[prime] = (factors[prime] ?? 0) + 1;
      rest /= prime;
    }
  }
  return factors;
}

/** 交互实验：切换两个数，观察 gcd、lcm、支撑交集与指数内积。 */
export function Mg2CoprimeLab() {
  const [left, setLeft] = useState(18);
  const [right, setRight] = useState(24);
  const leftFactors = factorize(left);
  const rightFactors = factorize(right);
  const primes = [
    ...new Set(
      [...Object.keys(leftFactors), ...Object.keys(rightFactors)].map(Number),
    ),
  ].sort((a, b) => a - b);
  const commonPrimes = primes.filter(
    (prime) => leftFactors[prime] && rightFactors[prime],
  );
  const dot = primes.reduce(
    (total, prime) =>
      total + (leftFactors[prime] ?? 0) * (rightFactors[prime] ?? 0),
    0,
  );
  const common = gcd(left, right);
  const lcm = (left * right) / common;
  const reset = () => {
    setLeft(18);
    setRight(24);
  };
  const options = [18, 20, 21, 24, 25, 35];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div
        data-visual-kind="coprime-vector-lab"
        className="overflow-hidden rounded-card border border-border bg-elevated p-5"
      >
        <div className="mb-4 flex flex-wrap items-center justify-center gap-3 text-sm text-secondary">
          <label className="flex min-h-11 items-center gap-2 rounded-lg border border-border px-3 py-2">
            a
            <select
              value={left}
              onChange={(event) => setLeft(Number(event.target.value))}
              className="min-h-11 rounded border border-border bg-transparent px-2 text-primary"
            >
              {options.map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </label>
          <label className="flex min-h-11 items-center gap-2 rounded-lg border border-border px-3 py-2">
            b
            <select
              value={right}
              onChange={(event) => setRight(Number(event.target.value))}
              className="min-h-11 rounded border border-border bg-transparent px-2 text-primary"
            >
              {options.map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </label>
          <button
            type="button"
            onClick={reset}
            className="min-h-11 rounded-full border border-border px-4 py-2 text-sm text-secondary"
          >
            重置实验
          </button>
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          <div className="rounded-xl border border-border p-4">
            <p className="m-0 text-sm font-semibold text-primary">逐坐标账本</p>
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              {primes.map((prime) => (
                <div
                  key={prime}
                  className={`rounded-lg border px-3 py-2 text-sm ${commonPrimes.includes(prime) ? "border-warning bg-warning/10 text-warning" : "border-border text-secondary"}`}
                >
                  p={prime}：{leftFactors[prime] ?? 0} /{" "}
                  {rightFactors[prime] ?? 0}
                </div>
              ))}
            </div>
          </div>
          <div
            className="rounded-xl border border-border p-4"
            aria-live="polite"
          >
            <p className="m-0 text-sm font-semibold text-primary">结构结果</p>
            <p className="mt-2 text-lg font-bold text-accent">
              gcd={common} · lcm={lcm}
            </p>
            <p className="m-0 text-sm text-secondary">
              支撑交集：
              {commonPrimes.length === 0 ? "空" : commonPrimes.join(", ")}
            </p>
            <p className="m-0 text-sm text-secondary">
              指数内积：{dot} {dot === 0 ? "（互质 / 垂直）" : "（有共同质数）"}
            </p>
          </div>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        改变 a、b，观察公共质数、gcd/lcm 和指数向量内积如何同步变化。
      </figcaption>
    </figure>
  );
}

/** 静态图：展示质数坐标中乘法、gcd、lcm 的三种逐坐标运算。 */
export function Mg2ExponentVectorDiagram() {
  return (
    <Frame
      ariaLabel="质数指数向量图：12和50的质数坐标相加得到600，逐坐标最小值得gcd，逐坐标最大值得lcm。"
      caption="同一张指数表同时支持乘法、最大公约数和最小公倍数。"
    >
      <text
        x="360"
        y="32"
        textAnchor="middle"
        fontSize="16"
        fontWeight="700"
        fill={primary}
      >
        指数向量：把质因数分解变成坐标表
      </text>
      <text x="360" y="58" textAnchor="middle" fontSize="12" fill={secondary}>
        质数轴：2 · 3 · 5 · 7 · …
      </text>
      <rect
        x="100"
        y="96"
        width="520"
        height="52"
        rx="9"
        fill={accent}
        fillOpacity="0.08"
        stroke={accent}
      />
      <text
        x="360"
        y="128"
        textAnchor="middle"
        fontSize="14"
        fontWeight="700"
        fill={accent}
      >
        v(12) = (2,1,0,…) + v(50) = (1,0,2,…) = v(600)
      </text>
      <Arrow x1={360} y1={164} x2={360} y2={210} color={border} />
      <Card
        x={80}
        y={226}
        width={164}
        height={86}
        title="逐坐标 min"
        detail="gcd(12,50)=2"
        color={warning}
      />
      <Card
        x={278}
        y={226}
        width={164}
        height={86}
        title="逐坐标 +"
        detail="12×50=600"
        color={success}
      />
      <Card
        x={476}
        y={226}
        width={164}
        height={86}
        title="逐坐标 max"
        detail="lcm(12,50)=300"
        color={danger}
      />
      <text x="360" y="370" textAnchor="middle" fontSize="12" fill={secondary}>
        0 坐标表示质数未出现，不是乘上 0
      </text>
      <text
        x="360"
        y="395"
        textAnchor="middle"
        fontSize="12"
        fontWeight="700"
        fill={primary}
      >
        有限支撑：每个具体自然数只有有限个非零坐标
      </text>
    </Frame>
  );
}

/** 静态图：展示 gcd/lcm 的 min/max 与乘积恒等式。 */
export function Mg2GcdLcmDiagram() {
  return (
    <Frame
      ariaLabel="gcd lcm 图：18和24的质数指数分别为1,2和3,1，逐坐标取最小得到6，取最大得到72，二者乘积等于432。"
      caption="质数指数的 min/max 直接证明 gcd 与 lcm 的乘积恒等式。"
    >
      <text
        x="360"
        y="32"
        textAnchor="middle"
        fontSize="16"
        fontWeight="700"
        fill={primary}
      >
        gcd 取 min，lcm 取 max
      </text>
      <text x="360" y="58" textAnchor="middle" fontSize="12" fill={secondary}>
        18=(1,2,0,…)；24=(3,1,0,…)
      </text>
      <Card
        x={54}
        y={108}
        width={190}
        height={92}
        title="逐坐标 min"
        detail="(1,1,0,…) = 6"
        color={warning}
      />
      <Card
        x={476}
        y={108}
        width={190}
        height={92}
        title="逐坐标 max"
        detail="(3,2,0,…) = 72"
        color={success}
      />
      <Arrow x1={260} y1={154} x2={460} y2={154} color={border} />
      <text x="360" y="140" textAnchor="middle" fontSize="12" fill={secondary}>
        同一对指数账本
      </text>
      <rect
        x="116"
        y="258"
        width="488"
        height="76"
        rx="11"
        fill={accent}
        fillOpacity="0.08"
        stroke={accent}
      />
      <text
        x="360"
        y="288"
        textAnchor="middle"
        fontSize="14"
        fontWeight="700"
        fill={accent}
      >
        gcd × lcm = 6 × 72 = 432
      </text>
      <text x="360" y="314" textAnchor="middle" fontSize="12" fill={primary}>
        18 × 24 = 432；每个质数的指数都平衡
      </text>
      <text x="360" y="382" textAnchor="middle" fontSize="12" fill={secondary}>
        α+β=min(α,β)+max(α,β)
      </text>
    </Frame>
  );
}

/** 静态图：展示两个数的质因数支撑是否相交。 */
export function Mg2SupportDiagram() {
  return (
    <Frame
      ariaLabel="支撑集合图：20的质因数支撑是2和5，21的支撑是3和7，两者不相交所以互质；18和24的支撑都含2和3，所以不互质。"
      caption="互质不要求两个数是质数，只要求质因数支撑没有交集。"
    >
      <text
        x="360"
        y="32"
        textAnchor="middle"
        fontSize="16"
        fontWeight="700"
        fill={primary}
      >
        支撑不相交：合数也能互质
      </text>
      <text x="360" y="58" textAnchor="middle" fontSize="12" fill={secondary}>
        supp(n) = 出现过的质数集合
      </text>
      <rect
        x="70"
        y="104"
        width="248"
        height="112"
        rx="12"
        fill={accent}
        fillOpacity="0.08"
        stroke={accent}
      />
      <text
        x="194"
        y="136"
        textAnchor="middle"
        fontSize="15"
        fontWeight="700"
        fill={accent}
      >
        20 = 2²·5
      </text>
      <text x="194" y="174" textAnchor="middle" fontSize="13" fill={primary}>
        supp(20) = {"{2,5}"}
      </text>
      <text x="194" y="198" textAnchor="middle" fontSize="12" fill={success}>
        合数
      </text>
      <rect
        x="402"
        y="104"
        width="248"
        height="112"
        rx="12"
        fill={success}
        fillOpacity="0.08"
        stroke={success}
      />
      <text
        x="526"
        y="136"
        textAnchor="middle"
        fontSize="15"
        fontWeight="700"
        fill={success}
      >
        21 = 3·7
      </text>
      <text x="526" y="174" textAnchor="middle" fontSize="13" fill={primary}>
        supp(21) = {"{3,7}"}
      </text>
      <text x="526" y="198" textAnchor="middle" fontSize="12" fill={success}>
        合数
      </text>
      <Arrow x1={328} y1={160} x2={392} y2={160} color={success} />
      <text x="360" y="146" textAnchor="middle" fontSize="11" fill={success}>
        交集为空
      </text>
      <rect
        x="144"
        y="274"
        width="432"
        height="72"
        rx="11"
        fill={success}
        fillOpacity="0.08"
        stroke={success}
      />
      <text
        x="360"
        y="304"
        textAnchor="middle"
        fontSize="14"
        fontWeight="700"
        fill={success}
      >
        gcd(20,21)=1
      </text>
      <text x="360" y="328" textAnchor="middle" fontSize="12" fill={primary}>
        没有共同质数，所以互质
      </text>
      <text x="360" y="382" textAnchor="middle" fontSize="12" fill={secondary}>
        20 和 21 的指数向量内积为 0
      </text>
    </Frame>
  );
}

/** 静态图：把互质的支撑条件翻译为指数向量垂直。 */
export function Mg2GeometryDiagram() {
  return (
    <Frame
      ariaLabel="互质几何图：在2和3两条质数轴上，12和25的指数向量分别是2,1和0,0加上5轴，内积为0，表示支撑不相交的垂直关系。"
      caption="几何垂直不是二维图形的装饰，而是内积为 0 的数论判据。"
    >
      <text
        x="360"
        y="32"
        textAnchor="middle"
        fontSize="16"
        fontWeight="700"
        fill={primary}
      >
        互质的向量垂直：内积为 0
      </text>
      <line
        x1="128"
        y1="316"
        x2="590"
        y2="316"
        stroke={border}
        strokeWidth="2"
      />
      <line
        x1="128"
        y1="316"
        x2="128"
        y2="90"
        stroke={border}
        strokeWidth="2"
      />
      <polygon points="590,316 578,310 578,322" fill={border} />
      <polygon points="128,90 122,102 134,102" fill={border} />
      <text x="590" y="344" textAnchor="end" fontSize="12" fill={secondary}>
        质数 2 轴
      </text>
      <text x="104" y="96" textAnchor="middle" fontSize="12" fill={secondary}>
        质数 3 轴
      </text>
      <line
        x1="128"
        y1="316"
        x2="346"
        y2="170"
        stroke={accent}
        strokeWidth="4"
      />
      <circle cx="346" cy="170" r="9" fill={accent} />
      <text x="372" y="164" fontSize="12" fill={accent}>
        共享 2/3 的方向
      </text>
      <line
        x1="128"
        y1="316"
        x2="128"
        y2="316"
        stroke={success}
        strokeWidth="4"
      />
      <circle cx="128" cy="316" r="9" fill={success} />
      <text x="188" y="286" fontSize="12" fill={success}>
        支撑不相交时，坐标乘积全为 0
      </text>
      <rect
        x="386"
        y="236"
        width="264"
        height="78"
        rx="11"
        fill={success}
        fillOpacity="0.08"
        stroke={success}
      />
      <text
        x="518"
        y="268"
        textAnchor="middle"
        fontSize="14"
        fontWeight="700"
        fill={success}
      >
        v(a)·v(b)=0
      </text>
      <text x="518" y="293" textAnchor="middle" fontSize="12" fill={primary}>
        ⇔ gcd(a,b)=1
      </text>
      <text x="360" y="382" textAnchor="middle" fontSize="12" fill={secondary}>
        完整空间有无限多条质数轴，但每个数只有有限支撑
      </text>
    </Frame>
  );
}
