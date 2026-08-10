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

/** 总览图：把反例、参数化、同型构造和严格递降串成证明链。 */
export function Mg2DescentDiagram() {
  return (
    <Frame
      ariaLabel="无穷递降总览图：假设存在平方面积直角三角形，参数化并拆分互质因子，构造同型更小三角形，最后由良序性产生矛盾。"
      caption="递降证明的发动机不是‘重复’，而是每次重复都严格变小。"
    >
      <text
        x="360"
        y="32"
        textAnchor="middle"
        fontSize="16"
        fontWeight="700"
        fill={primary}
      >
        无穷递降：同型而更小
      </text>
      <text x="360" y="58" textAnchor="middle" fontSize="12" fill={secondary}>
        反例 → 参数化 → 因子分配 → 新反例 → 严格下降
      </text>
      <Card
        x={46}
        y={104}
        width={146}
        height={88}
        title="反例"
        detail="A²+B²=C²"
        color={accent}
      />
      <Card
        x={208}
        y={104}
        width={146}
        height={88}
        title="参数化"
        detail="m,n 互质"
        color={warning}
      />
      <Card
        x={370}
        y={104}
        width={146}
        height={88}
        title="平方分配"
        detail="四因子各为平方"
        color={success}
      />
      <Card
        x={532}
        y={104}
        width={142}
        height={88}
        title="构造"
        detail="C₁<C"
        color={danger}
      />
      <Arrow x1={196} y1={148} x2={200} y2={148} color={border} />
      <Arrow x1={358} y1={148} x2={362} y2={148} color={border} />
      <Arrow x1={520} y1={148} x2={524} y2={148} color={border} />
      <line
        x1="280"
        y1="214"
        x2="280"
        y2="256"
        stroke={border}
        strokeWidth="2"
      />
      <polygon points="280,268 274,256 286,256" fill={border} />
      <rect
        x="90"
        y="284"
        width="540"
        height="72"
        rx="12"
        fill={danger}
        fillOpacity="0.07"
        stroke={danger}
      />
      <text
        x="360"
        y="314"
        textAnchor="middle"
        fontSize="14"
        fontWeight="700"
        fill={danger}
      >
        C &gt; C₁ &gt; C₂ &gt; … 不可能
      </text>
      <text x="360" y="339" textAnchor="middle" fontSize="12" fill={primary}>
        自然数良序性排除无限严格下降链
      </text>
      <text x="360" y="390" textAnchor="middle" fontSize="12" fill={secondary}>
        良序性把“没有最小值”的直觉变成矛盾
      </text>
    </Frame>
  );
}

/** 静态图：展示基本勾股数参数和面积条件如何产生四因子。 */
export function Mg2PythagoreanParamDiagram() {
  return (
    <Frame
      ariaLabel="勾股参数图：A=m平方减n平方、B=2mn、C=m平方加n平方，面积平方条件化为D平方等于mn乘m加n乘m减n。"
      caption="参数化把图形问题压缩成质因数可以逐项结账的四因子等式。"
    >
      <text
        x="360"
        y="32"
        textAnchor="middle"
        fontSize="16"
        fontWeight="700"
        fill={primary}
      >
        基本勾股数：从三角形到四因子
      </text>
      <text x="360" y="58" textAnchor="middle" fontSize="12" fill={secondary}>
        m&gt;n，m、n 互质且奇偶相反
      </text>
      <Card
        x={66}
        y={104}
        width={184}
        height={92}
        title="直角边 A"
        detail="m² − n²"
        color={accent}
      />
      <Card
        x={268}
        y={104}
        width={184}
        height={92}
        title="直角边 B"
        detail="2mn"
        color={warning}
      />
      <Card
        x={470}
        y={104}
        width={184}
        height={92}
        title="斜边 C"
        detail="m² + n²"
        color={success}
      />
      <Arrow x1={258} y1={150} x2={260} y2={150} color={border} />
      <Arrow x1={460} y1={150} x2={462} y2={150} color={border} />
      <line
        x1="360"
        y1="218"
        x2="360"
        y2="260"
        stroke={border}
        strokeWidth="2"
      />
      <polygon points="360,272 354,260 366,260" fill={border} />
      <rect
        x="100"
        y="286"
        width="520"
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
        D² = mn(m+n)(m−n)
      </text>
      <text x="360" y="341" textAnchor="middle" fontSize="12" fill={primary}>
        面积为平方数 → 四个因子必须分配平方指数
      </text>
      <text x="360" y="390" textAnchor="middle" fontSize="12" fill={secondary}>
        参数 m,n 的互质和奇偶条件守住后续分配
      </text>
    </Frame>
  );
}

/** 静态图：展示四因子两两互质与平方指数分配。 */
export function Mg2CoprimeFactorsDiagram() {
  const factors = ["m", "n", "m+n", "m−n"];
  return (
    <Frame
      ariaLabel="四因子图：m、n、m加n、m减n 两两互质，乘积为平方数时由质因数指数偶数迫使每个因子都是平方。"
      caption="互质负责阻止不同因子之间借用质因数指数。"
    >
      <text
        x="360"
        y="32"
        textAnchor="middle"
        fontSize="16"
        fontWeight="700"
        fill={primary}
      >
        四个因子：互质才能逐个成为平方
      </text>
      <text x="360" y="58" textAnchor="middle" fontSize="12" fill={secondary}>
        gcd 的线性组合 + 奇偶性 → 两两互质
      </text>
      {factors.map((factor, index) => {
        const x = 82 + index * 164;
        return (
          <g key={factor}>
            <rect
              x={x}
              y="106"
              width="126"
              height="70"
              rx="11"
              fill={index % 2 === 0 ? accent : warning}
              fillOpacity="0.08"
              stroke={index % 2 === 0 ? accent : warning}
            />
            <text
              x={x + 63}
              y="148"
              textAnchor="middle"
              fontSize="15"
              fontWeight="700"
              fill={index % 2 === 0 ? accent : warning}
            >
              {factor}
            </text>
          </g>
        );
      })}
      <text x="360" y="218" textAnchor="middle" fontSize="13" fill={secondary}>
        D² = m · n · (m+n) · (m−n)
      </text>
      <Arrow x1={360} y1={236} x2={360} y2={268} color={border} />
      <rect
        x="106"
        y="282"
        width="508"
        height="72"
        rx="11"
        fill={success}
        fillOpacity="0.08"
        stroke={success}
      />
      <text
        x="360"
        y="312"
        textAnchor="middle"
        fontSize="14"
        fontWeight="700"
        fill={success}
      >
        m=e²，n=f²，m+n=s²，m−n=t²
      </text>
      <text x="360" y="337" textAnchor="middle" fontSize="12" fill={primary}>
        平方数的质因数指数为偶数，互质让指数不能跨因子配对
      </text>
      <text x="360" y="390" textAnchor="middle" fontSize="12" fill={secondary}>
        每一层新变量都在显式化一个结构约束
      </text>
    </Frame>
  );
}

/** 静态图：展示 X、Y 生成新的同型直角三角形。 */
export function Mg2NewTriangleDiagram() {
  return (
    <Frame
      ariaLabel="新三角形图：X等于s加t除以2、Y等于s减t除以2，得到一方为2u平方另一方为v平方，形成新勾股三元组且面积仍为平方数。"
      caption="递降的核心是完整复制两组方程，而不是只找到更小的一个数字。"
    >
      <text
        x="360"
        y="32"
        textAnchor="middle"
        fontSize="16"
        fontWeight="700"
        fill={primary}
      >
        从 X、Y 复制出新三角形
      </text>
      <text x="360" y="58" textAnchor="middle" fontSize="12" fill={secondary}>
        X=(s+t)/2，Y=(s−t)/2，f²=2XY
      </text>
      <Card
        x={66}
        y={104}
        width={180}
        height={88}
        title="因子关系"
        detail="{X,Y}={2u²,v²}"
        color={warning}
      />
      <Card
        x={270}
        y={104}
        width={180}
        height={88}
        title="新直角边"
        detail="A₁=2u²，B₁=v²"
        color={accent}
      />
      <Card
        x={474}
        y={104}
        width={180}
        height={88}
        title="新斜边"
        detail="C₁=e"
        color={success}
      />
      <Arrow x1={254} y1={148} x2={262} y2={148} color={border} />
      <Arrow x1={458} y1={148} x2={466} y2={148} color={border} />
      <line
        x1="360"
        y1="218"
        x2="360"
        y2="260"
        stroke={border}
        strokeWidth="2"
      />
      <polygon points="360,272 354,260 366,260" fill={border} />
      <rect
        x="108"
        y="286"
        width="504"
        height="72"
        rx="11"
        fill={success}
        fillOpacity="0.08"
        stroke={success}
      />
      <text
        x="360"
        y="316"
        textAnchor="middle"
        fontSize="14"
        fontWeight="700"
        fill={success}
      >
        A₁²+B₁²=C₁²，A₁B₁=2D₁²
      </text>
      <text x="360" y="341" textAnchor="middle" fontSize="12" fill={primary}>
        D₁=uv；新三角形面积仍为平方数
      </text>
      <text x="360" y="390" textAnchor="middle" fontSize="12" fill={secondary}>
        结构同型，度量严格下降
      </text>
    </Frame>
  );
}

/** 静态图：展示最小反例与良序原理的冲突。 */
export function Mg2MinimalCounterexampleDiagram() {
  return (
    <Frame
      ariaLabel="最小反例图：假设反例集合非空，良序原理选出斜边最小的 C，但构造得到同型反例 C1 且 C1 小于 C，形成矛盾。"
      caption="最小反例把无限链压缩成一次局部矛盾。"
    >
      <text
        x="360"
        y="32"
        textAnchor="middle"
        fontSize="16"
        fontWeight="700"
        fill={primary}
      >
        最小反例：良序性的一击
      </text>
      <text x="360" y="58" textAnchor="middle" fontSize="12" fill={secondary}>
        反例集合非空 → 选最小斜边 C → 构造 C₁&lt;C
      </text>
      <rect
        x="76"
        y="104"
        width="208"
        height="108"
        rx="12"
        fill={accent}
        fillOpacity="0.08"
        stroke={accent}
      />
      <text
        x="180"
        y="138"
        textAnchor="middle"
        fontSize="14"
        fontWeight="700"
        fill={accent}
      >
        反例集合 S
      </text>
      <text x="180" y="174" textAnchor="middle" fontSize="12" fill={primary}>
        C 是 S 中最小斜边
      </text>
      <Arrow x1={300} y1={158} x2={408} y2={158} color={warning} />
      <text x="354" y="143" textAnchor="middle" fontSize="11" fill={warning}>
        递降构造
      </text>
      <rect
        x="436"
        y="104"
        width="208"
        height="108"
        rx="12"
        fill={danger}
        fillOpacity="0.08"
        stroke={danger}
      />
      <text
        x="540"
        y="138"
        textAnchor="middle"
        fontSize="14"
        fontWeight="700"
        fill={danger}
      >
        同型反例
      </text>
      <text x="540" y="174" textAnchor="middle" fontSize="12" fill={primary}>
        C₁ ∈ S 且 C₁&lt;C
      </text>
      <rect
        x="112"
        y="270"
        width="496"
        height="76"
        rx="11"
        fill={success}
        fillOpacity="0.08"
        stroke={success}
      />
      <text
        x="360"
        y="301"
        textAnchor="middle"
        fontSize="14"
        fontWeight="700"
        fill={success}
      >
        C 是最小，但 C₁ 更小
      </text>
      <text x="360" y="327" textAnchor="middle" fontSize="12" fill={primary}>
        矛盾：反例集合不能非空
      </text>
      <text x="360" y="382" textAnchor="middle" fontSize="12" fill={secondary}>
        自然数良序原理等价地排除无限严格下降
      </text>
    </Frame>
  );
}

/** 交互实验：逐步查看严格下降链，并可恢复默认状态。 */
export function Mg2DescentLab() {
  const [step, setStep] = useState(0);
  const chain = [65, 25, 9, 3, 1];
  const visible = chain.slice(0, step + 2);
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div
        data-visual-kind="infinite-descent-lab"
        className="overflow-hidden rounded-card border border-border bg-elevated p-5"
      >
        <div className="mb-4 flex flex-wrap items-center justify-center gap-2">
          {Array.from({ length: 4 }, (_, index) => (
            <button
              key={index}
              type="button"
              aria-pressed={step === index}
              onClick={() => setStep(index)}
              className={`min-h-11 min-w-11 rounded-full border px-3 py-2 text-sm ${step === index ? "border-accent bg-accent/10 text-accent" : "border-border text-secondary"}`}
            >
              第 {index + 1} 步
            </button>
          ))}
          <button
            type="button"
            onClick={() => setStep(0)}
            className="min-h-11 rounded-full border border-border px-4 py-2 text-sm text-secondary"
          >
            重置实验
          </button>
        </div>
        <div className="grid gap-3 md:grid-cols-[1.3fr_0.7fr]">
          <div className="rounded-xl border border-border p-4">
            <p className="m-0 text-sm font-semibold text-primary">当前下降链</p>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
              {visible.map((value, index) => (
                <span
                  key={`${index}-${value}`}
                  className={`rounded-lg border px-3 py-2 text-lg font-bold ${index === visible.length - 1 ? "border-success bg-success/10 text-success" : "border-border text-primary"}`}
                >
                  C{index}={value}
                  {index < visible.length - 1 ? " ↓" : ""}
                </span>
              ))}
            </div>
          </div>
          <div
            className="rounded-xl border border-border p-4"
            aria-live="polite"
          >
            <p className="m-0 text-sm font-semibold text-primary">证明状态</p>
            <p className="mt-2 text-lg font-bold text-danger">
              C{step} &gt; C{step + 1}
            </p>
            <p className="m-0 text-sm text-secondary">
              每一步保持同型条件，并严格减小斜边。
            </p>
            <p className="mt-3 text-sm font-semibold text-success">
              ✓ 正整数不能无限下降
            </p>
          </div>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        逐步展开下降链；重置后回到第一步，观察“同型 + 更小”如何构成递降发动机。
      </figcaption>
    </figure>
  );
}

/** 静态图：展示四次方反例如何转成平方面积三角形。 */
export function Mg2FermatFourthPowerDiagram() {
  return (
    <Frame
      ariaLabel="费马四次方图：假设 a 四次方加 b 四次方等于 c 四次方，构造直角三角形，其面积等于 ab 平方 c 的平方，从而违反费马直角三角形定理。"
      caption="FLT(4) 的反证：四次方解会制造被递降定理禁止的平方面积三角形。"
    >
      <text
        x="360"
        y="32"
        textAnchor="middle"
        fontSize="16"
        fontWeight="700"
        fill={primary}
      >
        FLT(4)：把四次方解送进禁区
      </text>
      <text x="360" y="58" textAnchor="middle" fontSize="12" fill={secondary}>
        a⁴+b⁴=c⁴ → 平方面积直角三角形
      </text>
      <Card
        x={62}
        y={104}
        width={192}
        height={90}
        title="反设"
        detail="a⁴+b⁴=c⁴"
        color={accent}
      />
      <Card
        x={264}
        y={104}
        width={192}
        height={90}
        title="构造"
        detail="A=b⁴，B=2a²c²"
        color={warning}
      />
      <Card
        x={466}
        y={104}
        width={192}
        height={90}
        title="面积"
        detail="(ab²c)²"
        color={danger}
      />
      <Arrow x1={264} y1={149} x2={256} y2={149} color={border} />
      <Arrow x1={466} y1={149} x2={458} y2={149} color={border} />
      <rect
        x="110"
        y="266"
        width="500"
        height="80"
        rx="11"
        fill={success}
        fillOpacity="0.08"
        stroke={success}
      />
      <text
        x="360"
        y="298"
        textAnchor="middle"
        fontSize="14"
        fontWeight="700"
        fill={success}
      >
        A²+B²=C²，AB/2=(ab²c)²
      </text>
      <text x="360" y="325" textAnchor="middle" fontSize="12" fill={primary}>
        与费马直角三角形定理矛盾
      </text>
      <text
        x="360"
        y="382"
        textAnchor="middle"
        fontSize="13"
        fontWeight="700"
        fill={danger}
      >
        所以 x⁴+y⁴=z⁴ 没有自然数解
      </text>
    </Frame>
  );
}
