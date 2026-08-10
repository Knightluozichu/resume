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

const gridColor: Record<number, string> = {
  [-2]: danger,
  [-1]: warning,
  [0]: accent,
  [1]: success,
  [2]: "var(--info)",
};

/** 把自然数对画成按 a-b=k 分组的第一象限格点斜线。 */
export function Mg3PairGridDiagram() {
  const points = Array.from({ length: 5 }, (_, row) =>
    Array.from({ length: 5 }, (_, column) => ({ a: column + 1, b: row + 1 })),
  ).flat();
  return (
    <Frame
      ariaLabel="自然数对格点图：第一象限格点按a减b的值落在斜率为1的平行线上，每条线代表一个等价类。"
      caption="同一条斜线上的点有相同差值；关系把许多代表对压缩成一个整数候选。"
    >
      <text
        x="360"
        y="34"
        textAnchor="middle"
        fontSize="17"
        fontWeight="700"
        fill={primary}
      >
        对是格点，整数是斜线的影子
      </text>
      <text x="360" y="58" textAnchor="middle" fontSize="12" fill={secondary}>
        (a,b)∼(c,d) ⇔ a+d=b+c ⇔ a−b=c−d
      </text>
      <line
        x1="116"
        y1="340"
        x2="610"
        y2="340"
        stroke={border}
        strokeWidth="2"
      />
      <line
        x1="116"
        y1="340"
        x2="116"
        y2="98"
        stroke={border}
        strokeWidth="2"
      />
      <text x="620" y="346" fontSize="13" fill={secondary}>
        a
      </text>
      <text x="108" y="92" fontSize="13" fill={secondary}>
        b
      </text>
      {[1, 2, 3, 4, 5].map((value) => (
        <g key={`axis-${value}`}>
          <text
            x={116 + value * 82}
            y="362"
            textAnchor="middle"
            fontSize="11"
            fill={secondary}
          >
            {value}
          </text>
          <text
            x="96"
            y={344 - value * 42}
            textAnchor="middle"
            fontSize="11"
            fill={secondary}
          >
            {value}
          </text>
        </g>
      ))}
      <line
        x1="116"
        y1="298"
        x2="444"
        y2="130"
        stroke={gridColor[-1]}
        strokeWidth="3"
        strokeOpacity="0.65"
      />
      <line
        x1="116"
        y1="256"
        x2="526"
        y2="46"
        stroke={gridColor[0]}
        strokeWidth="3"
        strokeOpacity="0.65"
      />
      <line
        x1="198"
        y1="340"
        x2="608"
        y2="130"
        stroke={gridColor[1]}
        strokeWidth="3"
        strokeOpacity="0.65"
      />
      <line
        x1="280"
        y1="340"
        x2="608"
        y2="172"
        stroke={gridColor[2]}
        strokeWidth="3"
        strokeOpacity="0.65"
      />
      {points.map((point) => {
        const difference = point.a - point.b;
        const x = 116 + point.a * 82;
        const y = 340 - point.b * 42;
        return (
          <circle
            key={`${point.a}-${point.b}`}
            cx={x}
            cy={y}
            r="6"
            fill={gridColor[difference] ?? secondary}
          />
        );
      })}
      <rect
        x="480"
        y="270"
        width="174"
        height="64"
        rx="10"
        fill={accent}
        fillOpacity="0.1"
        stroke={accent}
      />
      <text x="567" y="296" textAnchor="middle" fontSize="12" fill={accent}>
        a−b=k
      </text>
      <text x="567" y="317" textAnchor="middle" fontSize="11" fill={primary}>
        一条线 = 一个类
      </text>
    </Frame>
  );
}

/** 展示不同代表元计算同一商集加法结果，说明运算良定义。 */
export function Mg3WellDefinedDiagram() {
  return (
    <Frame
      ariaLabel="代表元无关图：负一的两个代表对与正二的两个代表对分别逐分量相加，得到两个重叠的结果对，说明商集加法良定义。"
      caption="(1,2) 与 (2,3) 代表同一类；两条计算路径最后仍落在同一个结果类。"
    >
      <text
        x="360"
        y="34"
        textAnchor="middle"
        fontSize="17"
        fontWeight="700"
        fill={primary}
      >
        代表元换了，结果类不换
      </text>
      <text x="360" y="58" textAnchor="middle" fontSize="12" fill={secondary}>
        [a,b]+[c,d] := [a+c,b+d]
      </text>
      <rect
        x="44"
        y="108"
        width="190"
        height="82"
        rx="12"
        fill={warning}
        fillOpacity="0.1"
        stroke={warning}
      />
      <text
        x="139"
        y="140"
        textAnchor="middle"
        fontSize="15"
        fontWeight="700"
        fill={warning}
      >
        −1 的代表
      </text>
      <text x="139" y="170" textAnchor="middle" fontSize="15" fill={primary}>
        (1,2) ∼ (2,3)
      </text>
      <rect
        x="44"
        y="244"
        width="190"
        height="82"
        rx="12"
        fill={success}
        fillOpacity="0.1"
        stroke={success}
      />
      <text
        x="139"
        y="276"
        textAnchor="middle"
        fontSize="15"
        fontWeight="700"
        fill={success}
      >
        +2 的代表
      </text>
      <text x="139" y="306" textAnchor="middle" fontSize="15" fill={primary}>
        (3,1) ∼ (4,2)
      </text>
      <Arrow x1={248} y1={208} x2={330} y2={208} color={secondary} />
      <text x="289" y="190" textAnchor="middle" fontSize="12" fill={secondary}>
        逐分量相加
      </text>
      <rect
        x="350"
        y="108"
        width="156"
        height="82"
        rx="12"
        fill={accent}
        fillOpacity="0.1"
        stroke={accent}
      />
      <text
        x="428"
        y="140"
        textAnchor="middle"
        fontSize="14"
        fontWeight="700"
        fill={accent}
      >
        路径一
      </text>
      <text x="428" y="170" textAnchor="middle" fontSize="14" fill={primary}>
        (4,3)
      </text>
      <rect
        x="350"
        y="244"
        width="156"
        height="82"
        rx="12"
        fill={accent}
        fillOpacity="0.1"
        stroke={accent}
      />
      <text
        x="428"
        y="276"
        textAnchor="middle"
        fontSize="14"
        fontWeight="700"
        fill={accent}
      >
        路径二
      </text>
      <text x="428" y="306" textAnchor="middle" fontSize="14" fill={primary}>
        (6,5)
      </text>
      <Arrow x1={526} y1={208} x2={590} y2={208} color={secondary} />
      <rect
        x="602"
        y="150"
        width="82"
        height="116"
        rx="12"
        fill={success}
        fillOpacity="0.1"
        stroke={success}
      />
      <text
        x="643"
        y="184"
        textAnchor="middle"
        fontSize="14"
        fontWeight="700"
        fill={success}
      >
        同一类
      </text>
      <text x="643" y="224" textAnchor="middle" fontSize="14" fill={primary}>
        差值1
      </text>
      <text x="360" y="374" textAnchor="middle" fontSize="13" fill={primary}>
        不同代表元不会改变商集中的运算结果
      </text>
    </Frame>
  );
}

/** 用三角形展示自反、对称、传递三条等价律。 */
export function Mg3EquivalenceDiagram() {
  return (
    <Frame
      ariaLabel="等价关系三角图：自反律让每个对象连回自身，对称律让关系可反向，传递律让两条关系链合成第三条关系。"
      caption="三条性质共同保证关系把集合稳定地分成互不相交的等价类。"
    >
      <text
        x="360"
        y="34"
        textAnchor="middle"
        fontSize="17"
        fontWeight="700"
        fill={primary}
      >
        等价关系：三条边界检查
      </text>
      <circle
        cx="360"
        cy="118"
        r="34"
        fill={accent}
        fillOpacity="0.12"
        stroke={accent}
        strokeWidth="2"
      />
      <text
        x="360"
        y="124"
        textAnchor="middle"
        fontSize="17"
        fontWeight="700"
        fill={accent}
      >
        x
      </text>
      <path
        d="M 334 101 C 294 62, 426 62, 386 101"
        fill="none"
        stroke={accent}
        strokeWidth="2"
      />
      <text x="360" y="70" textAnchor="middle" fontSize="13" fill={accent}>
        自反：x∼x
      </text>
      <circle
        cx="218"
        cy="284"
        r="34"
        fill={warning}
        fillOpacity="0.12"
        stroke={warning}
        strokeWidth="2"
      />
      <text
        x="218"
        y="290"
        textAnchor="middle"
        fontSize="17"
        fontWeight="700"
        fill={warning}
      >
        y
      </text>
      <circle
        cx="502"
        cy="284"
        r="34"
        fill={success}
        fillOpacity="0.12"
        stroke={success}
        strokeWidth="2"
      />
      <text
        x="502"
        y="290"
        textAnchor="middle"
        fontSize="17"
        fontWeight="700"
        fill={success}
      >
        z
      </text>
      <Arrow x1={330} y1={145} x2={242} y2={258} color={warning} />
      <Arrow x1={390} y1={145} x2={478} y2={258} color={success} />
      <Arrow x1={254} y1={284} x2={466} y2={284} color={accent} />
      <text x="274" y="224" textAnchor="middle" fontSize="13" fill={warning}>
        x∼y
      </text>
      <text x="446" y="224" textAnchor="middle" fontSize="13" fill={success}>
        y∼z
      </text>
      <text x="360" y="271" textAnchor="middle" fontSize="13" fill={accent}>
        传递：x∼z
      </text>
      <rect
        x="174"
        y="344"
        width="372"
        height="42"
        rx="10"
        fill={accent}
        fillOpacity="0.08"
        stroke={accent}
      />
      <text x="360" y="370" textAnchor="middle" fontSize="13" fill={primary}>
        自反 + 对称 + 传递 ⇒ 可安全取商
      </text>
    </Frame>
  );
}

/** 展示从原集合到等价类再到整数商集的压缩过程。 */
export function Mg3QuotientDiagram() {
  return (
    <Frame
      ariaLabel="商集压缩图：许多自然数对先按重叠关系分成等价类，再通过差值映射到整数负一、零、正一。"
      caption="商集不是删掉信息，而是把关系认为相同的代表统一为一个新对象。"
    >
      <text
        x="360"
        y="34"
        textAnchor="middle"
        fontSize="17"
        fontWeight="700"
        fill={primary}
      >
        从自然数对到整数商集
      </text>
      <rect
        x="38"
        y="106"
        width="196"
        height="220"
        rx="14"
        fill={accent}
        fillOpacity="0.08"
        stroke={accent}
        strokeWidth="2"
      />
      <text
        x="136"
        y="140"
        textAnchor="middle"
        fontSize="15"
        fontWeight="700"
        fill={accent}
      >
        原集合 S
      </text>
      <text x="136" y="178" textAnchor="middle" fontSize="13" fill={primary}>
        (1,2) (2,3)
      </text>
      <text x="136" y="214" textAnchor="middle" fontSize="13" fill={primary}>
        (1,1) (2,2)
      </text>
      <text x="136" y="250" textAnchor="middle" fontSize="13" fill={primary}>
        (2,1) (3,2)
      </text>
      <text x="136" y="294" textAnchor="middle" fontSize="12" fill={secondary}>
        许多有序对
      </text>
      <Arrow x1={250} y1={216} x2={306} y2={216} color={secondary} />
      <rect
        x="316"
        y="106"
        width="170"
        height="220"
        rx="14"
        fill={warning}
        fillOpacity="0.08"
        stroke={warning}
        strokeWidth="2"
      />
      <text
        x="401"
        y="140"
        textAnchor="middle"
        fontSize="15"
        fontWeight="700"
        fill={warning}
      >
        等价类
      </text>
      <text x="401" y="184" textAnchor="middle" fontSize="14" fill={primary}>
        [(1,2)]
      </text>
      <text x="401" y="220" textAnchor="middle" fontSize="14" fill={primary}>
        [(1,1)]
      </text>
      <text x="401" y="256" textAnchor="middle" fontSize="14" fill={primary}>
        [(2,1)]
      </text>
      <text x="401" y="296" textAnchor="middle" fontSize="12" fill={secondary}>
        一类一个对象
      </text>
      <Arrow x1={502} y1={216} x2={558} y2={216} color={secondary} />
      <rect
        x="568"
        y="106"
        width="116"
        height="220"
        rx="14"
        fill={success}
        fillOpacity="0.08"
        stroke={success}
        strokeWidth="2"
      />
      <text
        x="626"
        y="140"
        textAnchor="middle"
        fontSize="15"
        fontWeight="700"
        fill={success}
      >
        Z*
      </text>
      <text x="626" y="184" textAnchor="middle" fontSize="16" fill={primary}>
        −1
      </text>
      <text x="626" y="220" textAnchor="middle" fontSize="16" fill={primary}>
        0
      </text>
      <text x="626" y="256" textAnchor="middle" fontSize="16" fill={primary}>
        +1
      </text>
      <text x="626" y="296" textAnchor="middle" fontSize="12" fill={secondary}>
        差值映射 Φ
      </text>
      <text x="360" y="374" textAnchor="middle" fontSize="13" fill={primary}>
        同一差值的代表对被压缩成同一个整数
      </text>
    </Frame>
  );
}

type PairKey = "negative" | "zero" | "positive";

const pairData: Record<
  PairKey,
  { label: string; pair: string; difference: string; inverse: string }
> = {
  negative: {
    label: "负一",
    pair: "(1,2)",
    difference: "1−2 = −1",
    inverse: "(2,1)",
  },
  zero: { label: "零", pair: "(1,1)", difference: "1−1 = 0", inverse: "(1,1)" },
  positive: {
    label: "正二",
    pair: "(3,1)",
    difference: "3−1 = 2",
    inverse: "(1,3)",
  },
};

/** 可重置的 Pair No 算术实验。 */
export function Mg3PairArithmeticLab() {
  const [choice, setChoice] = useState<PairKey>("negative");
  const current = pairData[choice];
  return (
    <section
      className="not-prose my-6 rounded-card border border-border bg-elevated p-5"
      aria-label="Pair No算术实验"
    >
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="text-base font-semibold text-primary">Pair No Lab</h3>
          <p className="mt-1 text-sm text-secondary">
            选择一个代表对，观察差值、零元和交换坐标逆元。
          </p>
        </div>
        <button
          type="button"
          onClick={() => setChoice("negative")}
          className="rounded-control border border-border px-3 py-2 text-xs text-secondary transition-colors hover:border-accent hover:text-primary"
        >
          重置实验
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {(Object.keys(pairData) as PairKey[]).map((key) => (
          <button
            key={key}
            type="button"
            onClick={() => setChoice(key)}
            aria-pressed={choice === key}
            className={`rounded-control border px-4 py-2 text-sm transition-colors ${choice === key ? "border-accent text-accent" : "border-border text-secondary"}`}
          >
            {pairData[key].label}
          </button>
        ))}
      </div>
      <div className="mt-4 grid gap-4 rounded-control border border-border p-4 sm:grid-cols-[1fr_auto] sm:items-center">
        <div>
          <p className="font-mono text-sm text-primary">
            当前代表：{current.pair}
          </p>
          <p className="mt-2 text-sm text-accent">
            差值映射：{current.difference}
          </p>
          <p className="mt-1 text-sm text-warning">
            交换坐标：{current.inverse}（加法逆元）
          </p>
          <p className="mt-1 text-xs text-secondary">
            换一个同类代表，商集中的整数名字不变。
          </p>
        </div>
        <svg
          viewBox="0 0 180 120"
          role="img"
          aria-label={`${current.pair}代表${current.label}，交换坐标得到${current.inverse}`}
          className="h-auto w-full max-w-[180px]"
        >
          <circle
            cx="42"
            cy="62"
            r="22"
            fill={accent}
            fillOpacity="0.12"
            stroke={accent}
            strokeWidth="2"
          />
          <text x="42" y="68" textAnchor="middle" fontSize="14" fill={accent}>
            {current.pair}
          </text>
          <Arrow x1={70} y1={62} x2={110} y2={62} color={secondary} />
          <circle
            cx="138"
            cy="62"
            r="22"
            fill={warning}
            fillOpacity="0.12"
            stroke={warning}
            strokeWidth="2"
          />
          <text x="138" y="68" textAnchor="middle" fontSize="14" fill={warning}>
            {current.inverse}
          </text>
          <text
            x="90"
            y="36"
            textAnchor="middle"
            fontSize="12"
            fill={secondary}
          >
            交换
          </text>
          <text x="90" y="102" textAnchor="middle" fontSize="12" fill={primary}>
            {current.label}
          </text>
        </svg>
      </div>
    </section>
  );
}
