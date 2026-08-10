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
  color = secondary,
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

/** 将13厘米巧克力棒、部分与整体和概率的标准化放在同一条比例尺上。 */
export function Mg4RatioDiagram() {
  return (
    <Frame
      ariaLabel="13厘米巧克力棒的比例图：吃掉6.5厘米占整体的一半，概率把全部可能性标准化为1。"
      caption="除法回答部分相对于整体是多少；概率只是把同一比例语言搬到可能结果上。"
    >
      <text
        x="360"
        y="30"
        textAnchor="middle"
        fontSize="17"
        fontWeight="700"
        fill={primary}
      >
        从13厘米到概率1
      </text>
      <text x="360" y="55" textAnchor="middle" fontSize="13" fill={secondary}>
        部分 ÷ 整体 = 所占份额
      </text>
      <rect
        x="70"
        y="106"
        width="580"
        height="54"
        rx="14"
        fill={border}
        fillOpacity="0.24"
        stroke={border}
      />
      <rect
        x="70"
        y="106"
        width="290"
        height="54"
        rx="14"
        fill={accent}
        fillOpacity="0.55"
      />
      <line
        x1="360"
        y1="98"
        x2="360"
        y2="170"
        stroke={warning}
        strokeWidth="3"
      />
      <text
        x="215"
        y="139"
        textAnchor="middle"
        fontSize="15"
        fontWeight="700"
        fill={primary}
      >
        吃掉6.5厘米
      </text>
      <text x="505" y="139" textAnchor="middle" fontSize="15" fill={primary}>
        剩余6.5厘米
      </text>
      <text x="360" y="196" textAnchor="middle" fontSize="14" fill={accent}>
        6.5 ÷ 13 = 1/2
      </text>
      <rect
        x="70"
        y="242"
        width="580"
        height="54"
        rx="14"
        fill={success}
        fillOpacity="0.08"
        stroke={success}
      />
      <rect
        x="70"
        y="242"
        width="580"
        height="54"
        rx="14"
        fill={success}
        fillOpacity="0.2"
      />
      <text
        x="360"
        y="275"
        textAnchor="middle"
        fontSize="15"
        fontWeight="700"
        fill={success}
      >
        全部可能性 Ω → 标准化为 1
      </text>
      <Arrow x1={360} y1={208} x2={360} y2={232} color={accent} />
      <text x="360" y="348" textAnchor="middle" fontSize="14" fill={primary}>
        事件 A 占 Ω 的份额，就是 Pr(A)
      </text>
      <text x="360" y="378" textAnchor="middle" fontSize="13" fill={secondary}>
        0 ≤ Pr(A) ≤ 1
      </text>
    </Frame>
  );
}

/** 对比掷骰子比赛与轮盘比赛：内部过程不同，但输出分布相同。 */
export function Mg4ProcessEquivalenceDiagram() {
  const dice = ["A胜", "A胜", "A胜", "平局", "B胜", "B胜"];
  const roulette = ["A胜", "A胜", "A胜", "平局", "B胜", "B胜"];
  return (
    <Frame
      ariaLabel="随机过程对比图：骰子比赛需要两次随机调用，轮盘比赛只需要一次随机调用，但都输出15比6比15的同一分布。"
      caption="观察输出分布，而不是只看生成过程；不同程序可以在分布层面等价。"
    >
      <text
        x="360"
        y="30"
        textAnchor="middle"
        fontSize="17"
        fontWeight="700"
        fill={primary}
      >
        内部过程不同，输出分布相同
      </text>
      <rect
        x="44"
        y="82"
        width="276"
        height="210"
        rx="14"
        fill={accent}
        fillOpacity="0.08"
        stroke={accent}
      />
      <text
        x="182"
        y="116"
        textAnchor="middle"
        fontSize="15"
        fontWeight="700"
        fill={accent}
      >
        DICE-GAME
      </text>
      <text x="182" y="142" textAnchor="middle" fontSize="12" fill={secondary}>
        RANDOM(1, 6) × 2
      </text>
      {dice.map((label, index) => (
        <g key={`dice-output-${index}`}>
          <rect
            x={68 + (index % 3) * 78}
            y={172 + Math.floor(index / 3) * 54}
            width="62"
            height="34"
            rx="8"
            fill={
              label === "A胜" ? accent : label === "平局" ? warning : success
            }
            fillOpacity="0.25"
          />
          <text
            x={99 + (index % 3) * 78}
            y={194 + Math.floor(index / 3) * 54}
            textAnchor="middle"
            fontSize="12"
            fill={primary}
          >
            {label}
          </text>
        </g>
      ))}
      <rect
        x="400"
        y="82"
        width="276"
        height="210"
        rx="14"
        fill={success}
        fillOpacity="0.08"
        stroke={success}
      />
      <text
        x="538"
        y="116"
        textAnchor="middle"
        fontSize="15"
        fontWeight="700"
        fill={success}
      >
        ROULETTE-GAME
      </text>
      <text x="538" y="142" textAnchor="middle" fontSize="12" fill={secondary}>
        RANDOM(1, 36)
      </text>
      {roulette.map((label, index) => (
        <g key={`roulette-output-${index}`}>
          <rect
            x={424 + (index % 3) * 78}
            y={172 + Math.floor(index / 3) * 54}
            width="62"
            height="34"
            rx="8"
            fill={
              label === "A胜" ? accent : label === "平局" ? warning : success
            }
            fillOpacity="0.25"
          />
          <text
            x={455 + (index % 3) * 78}
            y={194 + Math.floor(index / 3) * 54}
            textAnchor="middle"
            fontSize="12"
            fill={primary}
          >
            {label}
          </text>
        </g>
      ))}
      <Arrow x1={328} y1={188} x2={392} y2={188} color={warning} />
      <text
        x="360"
        y="338"
        textAnchor="middle"
        fontSize="14"
        fontWeight="700"
        fill={primary}
      >
        A胜 15/36 · 平局 6/36 · B胜 15/36
      </text>
      <text x="360" y="370" textAnchor="middle" fontSize="13" fill={secondary}>
        过程 ≠ 分布；模拟用输出检查模型
      </text>
    </Frame>
  );
}

/** 展示有限样本空间、事件子集和 P1/P2/P3 三条公理的关系。 */
export function Mg4AxiomDiagram() {
  const outcomes = [1, 2, 3, 4, 5, 6];
  return (
    <Frame
      ariaLabel="概率公理图：样本空间Omega包含六个骰子结果，偶数事件是其中的子集，P1限制范围，P2规定全集概率为1，P3规定互斥事件概率可加。"
      caption="先固定样本空间与事件，再用公理约束概率分配；P3把互斥的小块加回整体。"
    >
      <text
        x="360"
        y="30"
        textAnchor="middle"
        fontSize="17"
        fontWeight="700"
        fill={primary}
      >
        Ω、事件与三条概率公理
      </text>
      <text x="360" y="55" textAnchor="middle" fontSize="13" fill={secondary}>
        E = {"{2, 4, 6}"} 是 Ω 的子集
      </text>
      <rect
        x="44"
        y="88"
        width="310"
        height="236"
        rx="16"
        fill={accent}
        fillOpacity="0.08"
        stroke={accent}
        strokeWidth="2"
      />
      <text
        x="199"
        y="122"
        textAnchor="middle"
        fontSize="16"
        fontWeight="700"
        fill={accent}
      >
        样本空间 Ω
      </text>
      {outcomes.map((value, index) => {
        const even = value % 2 === 0;
        const x = 78 + (index % 3) * 88;
        const y = 160 + Math.floor(index / 3) * 62;
        return (
          <g key={`axiom-outcome-${value}`}>
            <circle
              cx={x}
              cy={y}
              r="23"
              fill={even ? success : border}
              fillOpacity={even ? "0.5" : "0.35"}
              stroke={even ? success : border}
            />
            <text
              x={x}
              y={y + 5}
              textAnchor="middle"
              fontSize="15"
              fontWeight="700"
              fill={primary}
            >
              {value}
            </text>
          </g>
        );
      })}
      <text x="199" y="290" textAnchor="middle" fontSize="13" fill={success}>
        E：掷出偶数，Pr(E)=1/2
      </text>
      <rect
        x="400"
        y="88"
        width="276"
        height="236"
        rx="16"
        fill={warning}
        fillOpacity="0.08"
        stroke={warning}
        strokeWidth="2"
      />
      <text
        x="538"
        y="122"
        textAnchor="middle"
        fontSize="16"
        fontWeight="700"
        fill={warning}
      >
        合法性检查
      </text>
      <text x="430" y="164" fontSize="14" fill={primary}>
        P1：0 ≤ Pr(A) ≤ 1
      </text>
      <text x="430" y="208" fontSize="14" fill={primary}>
        P2：Pr(Ω) = 1
      </text>
      <text x="430" y="252" fontSize="14" fill={primary}>
        P3：A∩B=∅ ⇒ 可相加
      </text>
      <text x="538" y="292" textAnchor="middle" fontSize="13" fill={secondary}>
        ∅ 的概率由 P2 + P3 推出
      </text>
      <Arrow x1={358} y1={205} x2={392} y2={205} color={warning} />
      <text x="360" y="370" textAnchor="middle" fontSize="13" fill={primary}>
        公理规定结构，计算在结构内进行
      </text>
    </Frame>
  );
}

/** 以公平、偏置和三结果硬币三种分布观察概率模型如何改变。 */
export function Mg4DistributionDiagram() {
  const fair = [1, 1, 1, 1, 1, 1];
  const biased = [0.1651, 0.1611, 0.1645, 0.171, 0.1709, 0.1674];
  return (
    <Frame
      ariaLabel="概率分布图：公平骰子六个单点相等，偏骰子单点可以不同，只要所有概率非负且总和为1。"
      caption="等可能是一个模型选择；偏骰子也能构成合法分布，关键是非负与总和为1。"
    >
      <text
        x="360"
        y="30"
        textAnchor="middle"
        fontSize="17"
        fontWeight="700"
        fill={primary}
      >
        分布可以平坦，也可以起伏
      </text>
      <text
        x="190"
        y="72"
        textAnchor="middle"
        fontSize="15"
        fontWeight="700"
        fill={accent}
      >
        公平骰子
      </text>
      <text
        x="530"
        y="72"
        textAnchor="middle"
        fontSize="15"
        fontWeight="700"
        fill={warning}
      >
        偏骰子
      </text>
      {fair.map((value, index) => {
        const x = 68 + index * 42;
        return (
          <g key={`fair-bar-${index}`}>
            <rect
              x={x}
              y={268 - value * 112}
              width="28"
              height={value * 112}
              rx="5"
              fill={accent}
              fillOpacity="0.65"
            />
            <text
              x={x + 14}
              y="292"
              textAnchor="middle"
              fontSize="12"
              fill={secondary}
            >
              {index + 1}
            </text>
          </g>
        );
      })}
      {biased.map((value, index) => {
        const x = 406 + index * 42;
        const height = value * 640;
        return (
          <g key={`biased-bar-${index}`}>
            <rect
              x={x}
              y={268 - height}
              width="28"
              height={height}
              rx="5"
              fill={warning}
              fillOpacity="0.65"
            />
            <text
              x={x + 14}
              y="292"
              textAnchor="middle"
              fontSize="12"
              fill={secondary}
            >
              {index + 1}
            </text>
          </g>
        );
      })}
      <line
        x1="54"
        y1="268"
        x2="326"
        y2="268"
        stroke={border}
        strokeWidth="2"
      />
      <line
        x1="392"
        y1="268"
        x2="664"
        y2="268"
        stroke={border}
        strokeWidth="2"
      />
      <text x="190" y="338" textAnchor="middle" fontSize="13" fill={primary}>
        六个单点都为 1/6
      </text>
      <text x="530" y="338" textAnchor="middle" fontSize="13" fill={primary}>
        0.1651+…+0.1674 = 1
      </text>
      <text x="360" y="378" textAnchor="middle" fontSize="13" fill={secondary}>
        同一公理框架允许不同参数
      </text>
    </Frame>
  );
}

type DistributionMode = "fair" | "biased" | "standing";

const distributionData: Record<
  DistributionMode,
  { label: string; values: number[]; event: string }
> = {
  fair: {
    label: "公平骰子",
    values: [1 / 6, 1 / 6, 1 / 6, 1 / 6, 1 / 6, 1 / 6],
    event: "偶数概率：1/2",
  },
  biased: {
    label: "偏骰子",
    values: [0.1651, 0.1611, 0.1645, 0.171, 0.1709, 0.1674],
    event: "偶数概率：0.4994",
  },
  standing: {
    label: "竖立硬币",
    values: [0.49, 0.49, 0.02],
    event: "竖立概率：0.02",
  },
};

/** 可重置分布实验：切换模型，观察事件概率如何由单点分配相加得到。 */
export function Mg4DistributionLab() {
  const [mode, setMode] = useState<DistributionMode>("fair");
  const current = distributionData[mode];
  return (
    <section
      className="not-prose my-6 rounded-card border border-border bg-elevated p-5"
      aria-label="概率分布实验"
    >
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="text-base font-semibold text-primary">
            Probability Distribution Lab
          </h3>
          <p className="mt-1 text-sm text-secondary">
            切换模型，观察单点概率如何合成事件概率。
          </p>
        </div>
        <button
          type="button"
          onClick={() => setMode("fair")}
          className="rounded-control border border-border px-3 py-2 text-xs text-secondary transition-colors hover:border-accent hover:text-primary"
        >
          重置实验
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {(Object.keys(distributionData) as DistributionMode[]).map((key) => (
          <button
            key={key}
            type="button"
            onClick={() => setMode(key)}
            aria-pressed={mode === key}
            className={`rounded-control border px-4 py-2 text-sm transition-colors ${mode === key ? "border-accent text-accent" : "border-border text-secondary"}`}
          >
            {distributionData[key].label}
          </button>
        ))}
      </div>
      <div className="mt-4 grid gap-4 rounded-control border border-border p-4 sm:grid-cols-[1fr_auto] sm:items-center">
        <div>
          <p className="font-mono text-sm text-primary">
            当前模型：{current.label}
          </p>
          <p className="mt-2 text-sm text-accent">{current.event}</p>
          <p className="mt-1 text-sm text-secondary">
            所有单点概率都非负；总和固定为 1。
          </p>
        </div>
        <svg
          viewBox="0 0 240 130"
          role="img"
          aria-label={`${current.label}的概率分布`}
          className="h-auto w-full max-w-[240px]"
        >
          {current.values.map((value, index) => {
            const x = 16 + index * (mode === "standing" ? 66 : 34);
            const height = value * 132;
            return (
              <g key={`lab-bar-${mode}-${index}`}>
                <rect
                  x={x}
                  y={104 - height}
                  width="24"
                  height={height}
                  rx="4"
                  fill={index % 2 === 0 ? accent : success}
                  fillOpacity="0.65"
                />
                <text
                  x={x + 12}
                  y="121"
                  textAnchor="middle"
                  fontSize="12"
                  fill={secondary}
                >
                  {mode === "standing" ? ["H", "T", "S"][index] : index + 1}
                </text>
              </g>
            );
          })}
          <line
            x1="10"
            y1="104"
            x2="230"
            y2="104"
            stroke={border}
            strokeWidth="2"
          />
          <text x="120" y="18" textAnchor="middle" fontSize="12" fill={primary}>
            Σ pᵢ = 1
          </text>
        </svg>
      </div>
    </section>
  );
}
