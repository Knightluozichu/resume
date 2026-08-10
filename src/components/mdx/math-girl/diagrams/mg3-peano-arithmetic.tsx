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

/** 展示从 1 开始反复取后继，以及 PA1、PA2、PA3、PA4 的局部职责。 */
export function Mg3PeanoChainDiagram() {
  return (
    <Frame
      ariaLabel="皮亚诺后继链图：从1出发依次得到S(1)、S(S(1))和更深后继串；PA1给出起点，PA2保证后继留在集合，PA3禁止后继回到1，PA4禁止两条路径会合。"
      caption="先只看起点与后继箭头：普通数字名称是后继串的缩写。"
    >
      <text
        x={360}
        y={32}
        textAnchor="middle"
        fontSize={17}
        fontWeight="700"
        fill={primary}
      >
        PA1–PA4：从起点走出后继链
      </text>
      <rect
        x={44}
        y={78}
        width={632}
        height={142}
        rx={16}
        fill={accent}
        fillOpacity="0.06"
        stroke={border}
      />
      <circle
        cx={104}
        cy={150}
        r={26}
        fill={accent}
        fillOpacity="0.18"
        stroke={accent}
      />
      <text x={104} y={156} textAnchor="middle" fontSize={17} fill={primary}>
        1
      </text>
      <Arrow x1={136} y1={150} x2={248} y2={150} color={accent} />
      <text x={192} y={132} textAnchor="middle" fontSize={12} fill={secondary}>
        S
      </text>
      <circle
        cx={276}
        cy={150}
        r={30}
        fill={success}
        fillOpacity="0.16"
        stroke={success}
      />
      <text x={276} y={156} textAnchor="middle" fontSize={14} fill={primary}>
        S(1)
      </text>
      <Arrow x1={310} y1={150} x2={422} y2={150} color={success} />
      <text x={366} y={132} textAnchor="middle" fontSize={12} fill={secondary}>
        S
      </text>
      <circle
        cx={456}
        cy={150}
        r={36}
        fill={warning}
        fillOpacity="0.16"
        stroke={warning}
      />
      <text x={456} y={156} textAnchor="middle" fontSize={13} fill={primary}>
        S(S(1))
      </text>
      <Arrow x1={496} y1={150} x2={594} y2={150} color={warning} />
      <text x={636} y={156} textAnchor="middle" fontSize={20} fill={warning}>
        …
      </text>
      <text x={104} y={194} textAnchor="middle" fontSize={12} fill={secondary}>
        PA1
      </text>
      <text x={276} y={194} textAnchor="middle" fontSize={12} fill={secondary}>
        PA2：仍在 N
      </text>
      <text x={456} y={194} textAnchor="middle" fontSize={12} fill={secondary}>
        2、3、4 是名称
      </text>
      <rect
        x={78}
        y={270}
        width={262}
        height={86}
        rx={14}
        fill={danger}
        fillOpacity="0.08"
        stroke={danger}
      />
      <text
        x={209}
        y={302}
        textAnchor="middle"
        fontSize={14}
        fontWeight="700"
        fill={danger}
      >
        PA3：不能 S(n)=1
      </text>
      <text x={209} y={330} textAnchor="middle" fontSize={13} fill={primary}>
        箭头不能回到起点
      </text>
      <rect
        x={380}
        y={270}
        width={262}
        height={86}
        rx={14}
        fill={success}
        fillOpacity="0.08"
        stroke={success}
      />
      <text
        x={511}
        y={302}
        textAnchor="middle"
        fontSize={14}
        fontWeight="700"
        fill={success}
      >
        PA4：S 是单射
      </text>
      <text x={511} y={330} textAnchor="middle" fontSize={13} fill={primary}>
        不同路径不能会合
      </text>
    </Frame>
  );
}

/** 用三种删公理结构对照五条公理的职责。 */
export function Mg3AxiomOmissionDiagram() {
  const rows = [
    {
      title: "删 PA4",
      detail: "外来元素会合到主链",
      color: danger,
      label: "a → • ← S(S(1))",
    },
    {
      title: "删 PA3",
      detail: "出现指向 1 的前驱",
      color: warning,
      label: "… → a → 1 → S(1)",
    },
    {
      title: "删 PA5",
      detail: "主链外还有不可达分量",
      color: accent,
      label: "1 → S(1)    a → S(a)",
    },
  ];
  return (
    <Frame
      ariaLabel="删公理反模型图：删PA4允许后继路径会合，删PA3允许前驱进入1，删PA5允许主链之外的不可达额外分量。"
      caption="反模型把公理的职责变成可见异常：不是背编号，而是看它阻止了什么。"
    >
      <text
        x={360}
        y={32}
        textAnchor="middle"
        fontSize={17}
        fontWeight="700"
        fill={primary}
      >
        删除一条公理，会放进什么异常？
      </text>
      {rows.map((row, index) => {
        const y = 76 + index * 102;
        return (
          <g key={row.title}>
            <rect
              x={48}
              y={y}
              width={624}
              height={80}
              rx={14}
              fill={row.color}
              fillOpacity="0.08"
              stroke={row.color}
              strokeWidth="2"
            />
            <text
              x={82}
              y={y + 30}
              fontSize={15}
              fontWeight="700"
              fill={row.color}
            >
              {row.title}
            </text>
            <text x={212} y={y + 30} fontSize={14} fill={primary}>
              {row.detail}
            </text>
            <text x={212} y={y + 58} fontSize={14} fill={secondary}>
              {row.label}
            </text>
            <text
              x={604}
              y={y + 42}
              textAnchor="middle"
              fontSize={22}
              fill={row.color}
            >
              !
            </text>
          </g>
        );
      })}
      <text x={360} y={390} textAnchor="middle" fontSize={14} fill={primary}>
        PA1–PA5 各自负责起点、局部闭包、方向、单射与全局覆盖
      </text>
    </Frame>
  );
}

/** 展示奇数和归纳证明的基步、归纳步与全称结论。 */
export function Mg3InductionDiagram() {
  return (
    <Frame
      ariaLabel="数学归纳法图：基步P(1)成立后，固定任意k证明P(k)蕴含P(S(k))，再由PA5得到所有自然数都满足P(n)。"
      caption="归纳假设是固定 k 的条件前件；PA5 才把动态传递升级为静态全称结论。"
    >
      <text
        x={360}
        y={32}
        textAnchor="middle"
        fontSize={17}
        fontWeight="700"
        fill={primary}
      >
        P(n)：前 n 个奇数之和 = n²
      </text>
      <rect
        x={46}
        y={96}
        width={178}
        height={148}
        rx={16}
        fill={accent}
        fillOpacity="0.1"
        stroke={accent}
        strokeWidth="2"
      />
      <text
        x={135}
        y={130}
        textAnchor="middle"
        fontSize={15}
        fontWeight="700"
        fill={accent}
      >
        基步
      </text>
      <text x={135} y={170} textAnchor="middle" fontSize={16} fill={primary}>
        P(1)：1=1²
      </text>
      <text x={135} y={212} textAnchor="middle" fontSize={13} fill={secondary}>
        第一块倒下
      </text>
      <Arrow x1={242} y1={170} x2={296} y2={170} color={accent} />
      <rect
        x={316}
        y={82}
        width={202}
        height={176}
        rx={16}
        fill={warning}
        fillOpacity="0.1"
        stroke={warning}
        strokeWidth="2"
      />
      <text
        x={417}
        y={116}
        textAnchor="middle"
        fontSize={15}
        fontWeight="700"
        fill={warning}
      >
        归纳步
      </text>
      <text x={417} y={154} textAnchor="middle" fontSize={14} fill={primary}>
        固定任意 k
      </text>
      <text x={417} y={188} textAnchor="middle" fontSize={14} fill={primary}>
        P(k) ⇒ P(k+1)
      </text>
      <text x={417} y={226} textAnchor="middle" fontSize={13} fill={secondary}>
        加上 2k+1
      </text>
      <Arrow x1={536} y1={170} x2={590} y2={170} color={success} />
      <rect
        x={610}
        y={96}
        width={72}
        height={148}
        rx={16}
        fill={success}
        fillOpacity="0.1"
        stroke={success}
        strokeWidth="2"
      />
      <text
        x={646}
        y={136}
        textAnchor="middle"
        fontSize={15}
        fontWeight="700"
        fill={success}
      >
        PA5
      </text>
      <text x={646} y={174} textAnchor="middle" fontSize={14} fill={primary}>
        ∀n
      </text>
      <text x={646} y={208} textAnchor="middle" fontSize={14} fill={success}>
        P(n)
      </text>
      <text x={360} y={330} textAnchor="middle" fontSize={15} fill={primary}>
        1+3+…+(2n−1)=n²
      </text>
      <text x={360} y={376} textAnchor="middle" fontSize={14} fill={secondary}>
        基步 + 对任意 k 的传递 ⇒ 全部自然数
      </text>
    </Frame>
  );
}

/** 展示 ADD1、ADD2 如何把加法归约为后继串。 */
export function Mg3AdditionDiagram() {
  return (
    <Frame
      ariaLabel="递归加法图：1加S(1)按ADD2变为S(1加1)，再按ADD1变为S(S(1))并命名为3；加法沿第二个参数递归。"
      caption="ADD2 减少第二个参数的后继，ADD1 提供递归终点；普通数字只是后继串的名称。"
    >
      <text
        x={360}
        y={32}
        textAnchor="middle"
        fontSize={17}
        fontWeight="700"
        fill={primary}
      >
        ADD1 / ADD2：加法不是预装功能
      </text>
      <rect
        x={42}
        y={86}
        width={190}
        height={112}
        rx={14}
        fill={accent}
        fillOpacity="0.1"
        stroke={accent}
        strokeWidth="2"
      />
      <text
        x={137}
        y={122}
        textAnchor="middle"
        fontSize={15}
        fontWeight="700"
        fill={accent}
      >
        ADD1
      </text>
      <text x={137} y={160} textAnchor="middle" fontSize={15} fill={primary}>
        m+1=S(m)
      </text>
      <Arrow x1={246} y1={142} x2={304} y2={142} color={warning} />
      <rect
        x={322}
        y={86}
        width={190}
        height={112}
        rx={14}
        fill={warning}
        fillOpacity="0.1"
        stroke={warning}
        strokeWidth="2"
      />
      <text
        x={417}
        y={122}
        textAnchor="middle"
        fontSize={15}
        fontWeight="700"
        fill={warning}
      >
        ADD2
      </text>
      <text x={417} y={160} textAnchor="middle" fontSize={14} fill={primary}>
        m+S(n)=S(m+n)
      </text>
      <Arrow x1={526} y1={142} x2={584} y2={142} color={success} />
      <rect
        x={602}
        y={86}
        width={76}
        height={112}
        rx={14}
        fill={success}
        fillOpacity="0.1"
        stroke={success}
        strokeWidth="2"
      />
      <text
        x={640}
        y={122}
        textAnchor="middle"
        fontSize={14}
        fontWeight="700"
        fill={success}
      >
        终点
      </text>
      <text x={640} y={160} textAnchor="middle" fontSize={14} fill={primary}>
        后继串
      </text>
      <rect
        x={82}
        y={252}
        width={556}
        height={80}
        rx={14}
        fill={primary}
        fillOpacity="0.05"
        stroke={border}
      />
      <text x={360} y={286} textAnchor="middle" fontSize={15} fill={primary}>
        1+S(1) → S(1+1) → S(S(1))
      </text>
      <text x={360} y={314} textAnchor="middle" fontSize={14} fill={success}>
        → 命名为 3
      </text>
      <text x={360} y={382} textAnchor="middle" fontSize={14} fill={secondary}>
        先定义，再证明交换律、结合律与分配律
      </text>
    </Frame>
  );
}

type LabMode = "axioms" | "induction" | "addition";

const labCopy: Record<LabMode, { label: string; conclusion: string }> = {
  axioms: {
    label: "公理职责",
    conclusion: "PA1–PA4 管局部结构，PA5 负责从起点覆盖全部自然数。",
  },
  induction: {
    label: "归纳证明",
    conclusion: "P(1) 加上任意 k 的传递，才推出所有 n 的 P(n)。",
  },
  addition: {
    label: "递归加法",
    conclusion: "ADD1、ADD2 沿第二参数展开，把加法还原为后继串。",
  },
};

/** 切换公理、归纳、加法三种视角，观察有限规则如何组织无限结构。 */
export function Mg3PeanoLab() {
  const [mode, setMode] = useState<LabMode>("axioms");
  const reset = () => setMode("axioms");
  return (
    <section
      className="not-prose mx-auto my-6 max-w-[720px] rounded-card border border-border bg-elevated p-5"
      aria-label="皮亚诺算术实验"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="m-0 text-lg font-semibold text-primary">
            Peano Structure Lab
          </h3>
          <p className="mt-1 text-sm text-secondary">
            切换公理、归纳与递归计算的视角。
          </p>
        </div>
        <button
          type="button"
          onClick={reset}
          className="rounded-control border border-border px-3 py-2 text-sm text-primary transition-colors hover:border-accent"
        >
          重置实验
        </button>
      </div>
      <div
        className="mt-4 flex flex-wrap gap-2"
        role="toolbar"
        aria-label="皮亚诺视角"
      >
        {(Object.keys(labCopy) as LabMode[]).map((key) => (
          <button
            key={key}
            type="button"
            onClick={() => setMode(key)}
            aria-pressed={mode === key}
            className={`rounded-control border px-3 py-2 text-sm transition-colors ${mode === key ? "border-accent bg-accent/10 text-accent" : "border-border text-secondary hover:text-primary"}`}
          >
            {labCopy[key].label}
          </button>
        ))}
      </div>
      <div className="mt-4 overflow-hidden rounded-card border border-border bg-bg p-2">
        <svg
          viewBox="0 0 720 220"
          role="img"
          aria-label={`当前视角：${labCopy[mode].label}。${labCopy[mode].conclusion}`}
          className="block h-auto w-full"
        >
          <text
            x={360}
            y={34}
            textAnchor="middle"
            fontSize={16}
            fontWeight="700"
            fill={primary}
          >
            当前视角：{labCopy[mode].label}
          </text>
          {mode === "axioms" && (
            <>
              <circle
                cx={188}
                cy={112}
                r={24}
                fill={accent}
                fillOpacity="0.18"
                stroke={accent}
              />
              <text
                x={188}
                y={118}
                textAnchor="middle"
                fontSize={15}
                fill={primary}
              >
                1
              </text>
              <Arrow x1={220} y1={112} x2={320} y2={112} color={accent} />
              <text
                x={270}
                y={96}
                textAnchor="middle"
                fontSize={13}
                fill={secondary}
              >
                S
              </text>
              <circle
                cx={350}
                cy={112}
                r={28}
                fill={success}
                fillOpacity="0.18"
                stroke={success}
              />
              <text
                x={350}
                y={118}
                textAnchor="middle"
                fontSize={14}
                fill={primary}
              >
                S(1)
              </text>
              <Arrow x1={388} y1={112} x2={488} y2={112} color={warning} />
              <text
                x={438}
                y={96}
                textAnchor="middle"
                fontSize={13}
                fill={secondary}
              >
                PA2
              </text>
              <text
                x={360}
                y={190}
                textAnchor="middle"
                fontSize={14}
                fill={accent}
              >
                {labCopy[mode].conclusion}
              </text>
            </>
          )}
          {mode === "induction" && (
            <>
              <rect
                x={98}
                y={78}
                width={160}
                height={64}
                rx={12}
                fill={accent}
                fillOpacity="0.12"
                stroke={accent}
              />
              <text
                x={178}
                y={116}
                textAnchor="middle"
                fontSize={15}
                fill={primary}
              >
                P(1)
              </text>
              <Arrow x1={276} y1={110} x2={420} y2={110} color={warning} />
              <text
                x={348}
                y={92}
                textAnchor="middle"
                fontSize={13}
                fill={secondary}
              >
                P(k)⇒P(k+1)
              </text>
              <rect
                x={442}
                y={78}
                width={180}
                height={64}
                rx={12}
                fill={success}
                fillOpacity="0.12"
                stroke={success}
              />
              <text
                x={532}
                y={116}
                textAnchor="middle"
                fontSize={15}
                fill={primary}
              >
                ∀n P(n)
              </text>
              <text
                x={360}
                y={190}
                textAnchor="middle"
                fontSize={14}
                fill={warning}
              >
                {labCopy[mode].conclusion}
              </text>
            </>
          )}
          {mode === "addition" && (
            <>
              <text
                x={150}
                y={112}
                textAnchor="middle"
                fontSize={16}
                fill={accent}
              >
                1+S(1)
              </text>
              <Arrow x1={204} y1={106} x2={310} y2={106} color={warning} />
              <text
                x={360}
                y={112}
                textAnchor="middle"
                fontSize={15}
                fill={warning}
              >
                S(1+1)
              </text>
              <Arrow x1={410} y1={106} x2={516} y2={106} color={success} />
              <text
                x={580}
                y={112}
                textAnchor="middle"
                fontSize={16}
                fill={success}
              >
                S(S(1))=3
              </text>
              <text
                x={360}
                y={190}
                textAnchor="middle"
                fontSize={14}
                fill={success}
              >
                {labCopy[mode].conclusion}
              </text>
            </>
          )}
        </svg>
      </div>
      <p className="mt-3 text-sm text-secondary" aria-live="polite">
        结论：{labCopy[mode].conclusion}
      </p>
    </section>
  );
}
