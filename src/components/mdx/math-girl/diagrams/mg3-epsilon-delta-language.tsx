"use client";

import { useState, type ReactNode } from "react";

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
  children: ReactNode;
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
  color = accent,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  color?: string;
}) {
  const angle = Math.atan2(y2 - y1, x2 - x1);
  const size = 8;
  const leftX = x2 - size * Math.cos(angle - Math.PI / 6);
  const leftY = y2 - size * Math.sin(angle - Math.PI / 6);
  const rightX = x2 - size * Math.cos(angle + Math.PI / 6);
  const rightY = y2 - size * Math.sin(angle + Math.PI / 6);
  return (
    <>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth="2" />
      <path
        d={`M ${leftX} ${leftY} L ${x2} ${y2} L ${rightX} ${rightY}`}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  );
}

/** 在数轴上展示 epsilon 邻域与 N 之后的尾部。 */
export function Mg3EpsilonNDiagram() {
  const values = [
    { n: 1, y: 294 },
    { n: 2, y: 156 },
    { n: 3, y: 262 },
    { n: 4, y: 188 },
    { n: 5, y: 222 },
    { n: 6, y: 202 },
    { n: 7, y: 214 },
    { n: 8, y: 207 },
  ];
  return (
    <Frame
      ariaLabel="epsilon-N数列极限图：目标A在数轴中心，epsilon邻域上下界为A减epsilon和A加epsilon，N之后的全部数列项落入邻域。"
      caption="ε 由挑战者先选，N 可以依赖 ε；N 之后的所有项必须同时留在误差带内。"
    >
      <text
        x="360"
        y="34"
        textAnchor="middle"
        fontSize="17"
        fontWeight="700"
        fill={primary}
      >
        ε-N：门槛之后的尾部承诺
      </text>
      <text x="360" y="58" textAnchor="middle" fontSize="12" fill={secondary}>
        ∀ε&gt;0 ∃N ∀n&gt;N：|aₙ−A|&lt;ε
      </text>
      <line
        x1="78"
        y1="246"
        x2="642"
        y2="246"
        stroke={border}
        strokeWidth="2"
      />
      <line
        x1="300"
        y1="178"
        x2="300"
        y2="314"
        stroke={warning}
        strokeWidth="2"
        strokeDasharray="5 4"
      />
      <line
        x1="420"
        y1="178"
        x2="420"
        y2="314"
        stroke={warning}
        strokeWidth="2"
        strokeDasharray="5 4"
      />
      <rect
        x="300"
        y="178"
        width="120"
        height="136"
        rx="10"
        fill={success}
        fillOpacity="0.1"
        stroke={success}
      />
      <text x="360" y="164" textAnchor="middle" fontSize="13" fill={warning}>
        A−ε
      </text>
      <text x="360" y="330" textAnchor="middle" fontSize="13" fill={warning}>
        A+ε
      </text>
      <line
        x1="360"
        y1="154"
        x2="360"
        y2="340"
        stroke={accent}
        strokeWidth="3"
      />
      <text
        x="360"
        y="370"
        textAnchor="middle"
        fontSize="14"
        fontWeight="700"
        fill={accent}
      >
        A
      </text>
      {values.map((item) => {
        const x = 118 + item.n * 54;
        const inside = item.n > 4;
        return (
          <g key={`seq-${item.n}`}>
            <circle cx={x} cy={item.y} r="6" fill={inside ? success : danger} />
            <text
              x={x}
              y="274"
              textAnchor="middle"
              fontSize="11"
              fill={secondary}
            >
              n={item.n}
            </text>
          </g>
        );
      })}
      <Arrow x1={118} y1={114} x2={328} y2={114} color={accent} />
      <text x="224" y="102" textAnchor="middle" fontSize="12" fill={accent}>
        N=4：从这里起全进误差带
      </text>
    </Frame>
  );
}

/** 展示函数极限的 delta 输入邻域、epsilon 输出邻域与线性应战。 */
export function Mg3EpsilonDeltaDiagram() {
  return (
    <Frame
      ariaLabel="epsilon-delta函数极限图：输入a的去心delta邻域通过线性函数映射到输出A的epsilon邻域，选择delta等于epsilon除以2。"
      caption="δ 是对 ε 挑战的应战：先固定输出误差，再反推允许的输入距离。"
    >
      <text
        x="360"
        y="34"
        textAnchor="middle"
        fontSize="17"
        fontWeight="700"
        fill={primary}
      >
        ε-δ：把输出挑战反推成输入半径
      </text>
      <text x="360" y="58" textAnchor="middle" fontSize="12" fill={secondary}>
        f(x)=2x+3，L=2a+3；|f(x)−L|=2|x−a|
      </text>
      <rect
        x="52"
        y="108"
        width="250"
        height="212"
        rx="14"
        fill={accent}
        fillOpacity="0.08"
        stroke={accent}
        strokeWidth="2"
      />
      <text
        x="177"
        y="138"
        textAnchor="middle"
        fontSize="15"
        fontWeight="700"
        fill={accent}
      >
        输入轴 x
      </text>
      <line
        x1="86"
        y1="232"
        x2="268"
        y2="232"
        stroke={border}
        strokeWidth="2"
      />
      <circle cx="177" cy="232" r="7" fill={accent} />
      <line
        x1="128"
        y1="232"
        x2="226"
        y2="232"
        stroke={warning}
        strokeWidth="8"
        strokeOpacity="0.35"
      />
      <text x="177" y="278" textAnchor="middle" fontSize="13" fill={warning}>
        a−δ &lt; x &lt; a+δ
      </text>
      <text x="177" y="300" textAnchor="middle" fontSize="12" fill={secondary}>
        并排除 x=a
      </text>
      <Arrow x1={318} y1={214} x2={404} y2={214} color={secondary} />
      <text x="360" y="196" textAnchor="middle" fontSize="12" fill={secondary}>
        f(x)
      </text>
      <rect
        x="418"
        y="108"
        width="250"
        height="212"
        rx="14"
        fill={success}
        fillOpacity="0.08"
        stroke={success}
        strokeWidth="2"
      />
      <text
        x="543"
        y="138"
        textAnchor="middle"
        fontSize="15"
        fontWeight="700"
        fill={success}
      >
        输出轴 y
      </text>
      <line
        x1="452"
        y1="232"
        x2="634"
        y2="232"
        stroke={border}
        strokeWidth="2"
      />
      <circle cx="543" cy="232" r="7" fill={success} />
      <line
        x1="493"
        y1="232"
        x2="593"
        y2="232"
        stroke={warning}
        strokeWidth="8"
        strokeOpacity="0.35"
      />
      <text x="543" y="278" textAnchor="middle" fontSize="13" fill={warning}>
        L−ε &lt; f(x) &lt; L+ε
      </text>
      <text x="543" y="300" textAnchor="middle" fontSize="12" fill={secondary}>
        δ = ε / 2
      </text>
    </Frame>
  );
}

/** 量词顺序图：挑战者选择 ε，证明者选择 N/δ，最后才任意取 n/x。 */
export function Mg3QuantifierDiagram() {
  const columns = [
    { x: 100, label: "挑战者", value: "ε > 0", color: danger },
    { x: 270, label: "证明者", value: "N 或 δ", color: accent },
    { x: 440, label: "检查", value: "n 或 x", color: success },
    { x: 610, label: "承诺", value: "误差成立", color: warning },
  ];
  return (
    <Frame
      ariaLabel="量词顺序图：先任意选择epsilon，再根据epsilon选择N或delta，然后任意检查n或x，最后验证误差承诺。交换顺序会改变命题。"
      caption="量词像流程控制：N/δ 可以依赖挑战 ε，但不能偷看随后任取的 n/x。"
    >
      <text
        x="360"
        y="34"
        textAnchor="middle"
        fontSize="17"
        fontWeight="700"
        fill={primary}
      >
        量词顺序：谁先承诺什么
      </text>
      <text x="360" y="58" textAnchor="middle" fontSize="12" fill={secondary}>
        ∀ε ∃N ∀n 与 ∃N ∀ε ∀n 不是同一个命题
      </text>
      {columns.map((column, index) => (
        <g key={column.label}>
          <rect
            x={column.x - 60}
            y="132"
            width="120"
            height="118"
            rx="14"
            fill={column.color}
            fillOpacity="0.1"
            stroke={column.color}
            strokeWidth="2"
          />
          <text
            x={column.x}
            y="168"
            textAnchor="middle"
            fontSize="14"
            fontWeight="700"
            fill={column.color}
          >
            {column.label}
          </text>
          <text
            x={column.x}
            y="208"
            textAnchor="middle"
            fontSize="16"
            fill={primary}
          >
            {column.value}
          </text>
          {index < columns.length - 1 ? (
            <Arrow
              x1={column.x + 68}
              y1={191}
              x2={columns[index + 1].x - 68}
              y2={191}
              color={secondary}
            />
          ) : null}
        </g>
      ))}
      <rect
        x="126"
        y="304"
        width="468"
        height="58"
        rx="12"
        fill={accent}
        fillOpacity="0.08"
        stroke={accent}
      />
      <text
        x="360"
        y="329"
        textAnchor="middle"
        fontSize="14"
        fontWeight="700"
        fill={accent}
      >
        N/δ 可依赖 ε，不可依赖之后的 n/x
      </text>
      <text x="360" y="350" textAnchor="middle" fontSize="12" fill={primary}>
        每个挑战都有有限应答，但承诺覆盖全部尾部或邻域
      </text>
    </Frame>
  );
}

/** 对比处处不连续的 Dirichlet 型函数与只在 0 连续的 g。 */
export function Mg3ContinuityDiagram() {
  return (
    <Frame
      ariaLabel="连续性边界图：d函数在有理点取0无理点取1所以处处不连续，g函数有理点取0无理点取x在0连续但在非零点不连续。"
      caption="稠密性让 d 的每个邻域都混合两种值；统一估计 |g(x)|≤|x| 则保护 g 在0连续。"
    >
      <text
        x="360"
        y="34"
        textAnchor="middle"
        fontSize="17"
        fontWeight="700"
        fill={primary}
      >
        连续性的边界：d 与 g
      </text>
      <text x="360" y="58" textAnchor="middle" fontSize="12" fill={secondary}>
        同样使用有理/无理稠密性，连续点集合却完全不同
      </text>
      <rect
        x="48"
        y="100"
        width="284"
        height="222"
        rx="14"
        fill={danger}
        fillOpacity="0.08"
        stroke={danger}
        strokeWidth="2"
      />
      <text
        x="190"
        y="132"
        textAnchor="middle"
        fontSize="15"
        fontWeight="700"
        fill={danger}
      >
        d(x)：处处不连续
      </text>
      <line
        x1="82"
        y1="242"
        x2="298"
        y2="242"
        stroke={border}
        strokeWidth="2"
      />
      {Array.from({ length: 12 }, (_, index) => (
        <circle
          key={`d-r-${index}`}
          cx={92 + index * 17}
          cy="214"
          r="4"
          fill={accent}
        />
      ))}
      {Array.from({ length: 12 }, (_, index) => (
        <circle
          key={`d-i-${index}`}
          cx={100 + index * 17}
          cy="270"
          r="4"
          fill={success}
        />
      ))}
      <text x="190" y="304" textAnchor="middle" fontSize="12" fill={primary}>
        每个邻域都有 0 与 1
      </text>
      <rect
        x="388"
        y="100"
        width="284"
        height="222"
        rx="14"
        fill={success}
        fillOpacity="0.08"
        stroke={success}
        strokeWidth="2"
      />
      <text
        x="530"
        y="132"
        textAnchor="middle"
        fontSize="15"
        fontWeight="700"
        fill={success}
      >
        g(x)：恰好只在 0 连续
      </text>
      <line
        x1="422"
        y1="242"
        x2="638"
        y2="242"
        stroke={border}
        strokeWidth="2"
      />
      <path
        d="M 434 242 C 470 228, 500 214, 530 202 S 590 170, 626 150"
        fill="none"
        stroke={success}
        strokeWidth="3"
      />
      <circle cx="530" cy="202" r="7" fill={success} />
      <text x="530" y="276" textAnchor="middle" fontSize="12" fill={primary}>
        |g(x)−g(0)| ≤ |x|
      </text>
      <text x="530" y="300" textAnchor="middle" fontSize="12" fill={secondary}>
        0 点可选 δ=ε
      </text>
    </Frame>
  );
}

/** 展示无理数测定仪的稠密输入与连续性挑战。 */
export function Mg3DenseSetDiagram() {
  return (
    <Frame
      ariaLabel="有理数与无理数稠密图：任意小邻域内都同时有有理点和无理点，因此d函数的输出跳跃一。"
      caption="“任意邻域”不是“画得足够大”：稠密性保证无论 δ 多小，坏点都能被找到。"
    >
      <text
        x="360"
        y="34"
        textAnchor="middle"
        fontSize="17"
        fontWeight="700"
        fill={primary}
      >
        无理数测定仪：每个邻域都有坏点
      </text>
      <text x="360" y="58" textAnchor="middle" fontSize="12" fill={secondary}>
        给定任意 δ&gt;0，在 (a−δ,a+δ) 中同时找到有理与无理数
      </text>
      <line
        x1="88"
        y1="230"
        x2="632"
        y2="230"
        stroke={border}
        strokeWidth="2"
      />
      <line
        x1="294"
        y1="230"
        x2="426"
        y2="230"
        stroke={warning}
        strokeWidth="10"
        strokeOpacity="0.25"
      />
      <circle cx="360" cy="230" r="7" fill={accent} />
      {Array.from({ length: 9 }, (_, index) => {
        const x = 306 + index * 13;
        return (
          <circle
            key={`dense-r-${index}`}
            cx={x}
            cy={218}
            r="3.5"
            fill={accent}
          />
        );
      })}
      {Array.from({ length: 9 }, (_, index) => {
        const x = 312 + index * 13;
        return (
          <circle
            key={`dense-i-${index}`}
            cx={x}
            cy={242}
            r="3.5"
            fill={success}
          />
        );
      })}
      <text x="360" y="180" textAnchor="middle" fontSize="13" fill={warning}>
        a−δ &lt; x &lt; a+δ
      </text>
      <text x="360" y="278" textAnchor="middle" fontSize="13" fill={accent}>
        有理 x：d(x)=0
      </text>
      <text x="360" y="302" textAnchor="middle" fontSize="13" fill={success}>
        无理 x：d(x)=1
      </text>
      <rect
        x="154"
        y="336"
        width="412"
        height="46"
        rx="10"
        fill={danger}
        fillOpacity="0.1"
        stroke={danger}
      />
      <text x="360" y="365" textAnchor="middle" fontSize="13" fill={danger}>
        ε₀=1/2；每个 δ 都能找到 |d(x)−d(a)|=1
      </text>
    </Frame>
  );
}

type ChallengeMode = "sequence" | "function";

const challengeData: Record<
  ChallengeMode,
  {
    label: string;
    epsilon: string;
    response: string;
    detail: string;
    color: string;
  }
> = {
  sequence: {
    label: "数列：1/n",
    epsilon: "ε = 0.2",
    response: "N = 6",
    detail: "n > 6 ⇒ 1/n < 0.2",
    color: success,
  },
  function: {
    label: "函数：2x+3",
    epsilon: "ε = 0.2",
    response: "δ = 0.1",
    detail: "|x−a| < 0.1 ⇒ |f(x)−L| < 0.2",
    color: accent,
  },
};

/** 可重置的 ε-N / ε-δ 挑战实验。 */
export function Mg3EpsilonLab() {
  const [mode, setMode] = useState<ChallengeMode>("sequence");
  const current = challengeData[mode];
  return (
    <section
      className="not-prose my-6 rounded-card border border-border bg-elevated p-5"
      aria-label="epsilon挑战实验"
    >
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="text-base font-semibold text-primary">
            Epsilon Challenge Lab
          </h3>
          <p className="mt-1 text-sm text-secondary">
            切换数列和函数，观察有限应答如何覆盖无限挑战。
          </p>
        </div>
        <button
          type="button"
          onClick={() => setMode("sequence")}
          className="rounded-control border border-border px-3 py-2 text-xs text-secondary transition-colors hover:border-accent hover:text-primary"
        >
          重置实验
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {(Object.keys(challengeData) as ChallengeMode[]).map((key) => (
          <button
            key={key}
            type="button"
            onClick={() => setMode(key)}
            aria-pressed={mode === key}
            className={`rounded-control border px-4 py-2 text-sm transition-colors ${mode === key ? "border-accent text-accent" : "border-border text-secondary"}`}
          >
            {challengeData[key].label}
          </button>
        ))}
      </div>
      <div className="mt-4 grid gap-4 rounded-control border border-border p-4 sm:grid-cols-[1fr_auto] sm:items-center">
        <div>
          <p className="font-mono text-sm text-primary">
            挑战：{current.epsilon}
          </p>
          <p className="mt-2 text-sm" style={{ color: current.color }}>
            应答：{current.response}
          </p>
          <p className="mt-1 text-xs text-secondary">
            {current.detail}；应答可以依赖 ε，但保证覆盖全部后续 n 或附近 x。
          </p>
        </div>
        <svg
          viewBox="0 0 180 120"
          role="img"
          aria-label={`${current.label}的epsilon应答`}
          className="h-auto w-full max-w-[180px]"
        >
          <line x1="16" y1="94" x2="164" y2="94" stroke={border} />
          <line x1="26" y1="106" x2="26" y2="16" stroke={border} />
          <rect
            x="54"
            y="42"
            width="86"
            height="34"
            rx="8"
            fill={current.color}
            fillOpacity="0.14"
            stroke={current.color}
          />
          <text
            x="97"
            y="63"
            textAnchor="middle"
            fontSize="13"
            fill={current.color}
          >
            {mode === "sequence" ? "n > N" : "|x−a|<δ"}
          </text>
        </svg>
      </div>
    </section>
  );
}
