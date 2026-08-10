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
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}) {
  return (
    <>
      <line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke={secondary}
        strokeWidth="2"
      />
      <polygon
        points={`${x2},${y2} ${x2 - 10},${y2 - 5} ${x2 - 10},${y2 + 5}`}
        fill={secondary}
      />
    </>
  );
}

/** 把百倍游戏的六个奖金、概率权重和350日元期望放进同一张图。 */
export function Mg4ExpectationDiagram() {
  const values = [100, 200, 300, 400, 500, 600];
  return (
    <Frame
      ariaLabel="百倍游戏期望图：六个等概率奖金从100到600日元，概率权重相同，概率加权平均落在350日元。"
      caption="期望不是某一个单局奖金，而是概率加权后保持面积的平均高度。"
    >
      <text
        x="360"
        y="32"
        textAnchor="middle"
        fontSize="16"
        fontWeight="700"
        fill={primary}
      >
        百倍游戏：六个结果，一个加权中心
      </text>
      <text x="360" y="56" textAnchor="middle" fontSize="12" fill={secondary}>
        每个结果的概率都是 1/6，期望把总面积摊平
      </text>
      <line
        x1="74"
        y1="332"
        x2="646"
        y2="332"
        stroke={border}
        strokeWidth="2"
      />
      {values.map((value, index) => {
        const height = 42 + index * 34;
        const x = 86 + index * 88;
        return (
          <g key={`expectation-bar-${value}`}>
            <rect
              x={x}
              y={332 - height}
              width="58"
              height={height}
              rx="6"
              fill={value === 300 || value === 400 ? accent : success}
              fillOpacity={value === 300 || value === 400 ? "0.78" : "0.48"}
            />
            <text
              x={x + 29}
              y={320 - height}
              textAnchor="middle"
              fontSize="11"
              fill={primary}
            >
              {value}
            </text>
            <text
              x={x + 29}
              y="354"
              textAnchor="middle"
              fontSize="11"
              fill={secondary}
            >
              1/6
            </text>
          </g>
        );
      })}
      <line
        x1="370"
        y1="74"
        x2="370"
        y2="332"
        stroke={warning}
        strokeWidth="3"
        strokeDasharray="7 6"
      />
      <rect
        x="286"
        y="78"
        width="168"
        height="52"
        rx="10"
        fill={warning}
        fillOpacity="0.12"
        stroke={warning}
      />
      <text
        x="370"
        y="101"
        textAnchor="middle"
        fontSize="14"
        fontWeight="700"
        fill={warning}
      >
        E[X] = 350
      </text>
      <text x="370" y="120" textAnchor="middle" fontSize="11" fill={primary}>
        长期平均 / 公平参加费
      </text>
      <text x="360" y="392" textAnchor="middle" fontSize="12" fill={secondary}>
        350 不在单局结果中，但等于 Σ c·Pr(X=c)
      </text>
    </Frame>
  );
}

/** 说明期望线性如何绕开两次骰子的36格联合分布。 */
export function Mg4LinearityDiagram() {
  return (
    <Frame
      ariaLabel="期望线性图：第一次骰子期望3.5和第二次骰子期望3.5分别汇入总点数期望7，不需要枚举36个联合结果。"
      caption="先拆总量，再逐项取期望；线性法则不要求随机变量独立。"
    >
      <text
        x="360"
        y="32"
        textAnchor="middle"
        fontSize="16"
        fontWeight="700"
        fill={primary}
      >
        E[X₁ + X₂] = E[X₁] + E[X₂]
      </text>
      <text x="360" y="56" textAnchor="middle" fontSize="12" fill={secondary}>
        省略 36 格联合分布，保留两个局部平均
      </text>
      <rect
        x="48"
        y="104"
        width="236"
        height="94"
        rx="12"
        fill={accent}
        fillOpacity="0.1"
        stroke={accent}
      />
      <text
        x="166"
        y="136"
        textAnchor="middle"
        fontSize="15"
        fontWeight="700"
        fill={accent}
      >
        第一次骰子
      </text>
      <text x="166" y="166" textAnchor="middle" fontSize="17" fill={primary}>
        E[X₁] = 3.5
      </text>
      <rect
        x="436"
        y="104"
        width="236"
        height="94"
        rx="12"
        fill={success}
        fillOpacity="0.1"
        stroke={success}
      />
      <text
        x="554"
        y="136"
        textAnchor="middle"
        fontSize="15"
        fontWeight="700"
        fill={success}
      >
        第二次骰子
      </text>
      <text x="554" y="166" textAnchor="middle" fontSize="17" fill={primary}>
        E[X₂] = 3.5
      </text>
      <Arrow x1={284} y1={151} x2={354} y2={151} />
      <Arrow x1={436} y1={151} x2={366} y2={151} />
      <text
        x="360"
        y="156"
        textAnchor="middle"
        fontSize="14"
        fontWeight="700"
        fill={warning}
      >
        +
      </text>
      <rect
        x="158"
        y="254"
        width="404"
        height="92"
        rx="12"
        fill={warning}
        fillOpacity="0.1"
        stroke={warning}
      />
      <text
        x="360"
        y="288"
        textAnchor="middle"
        fontSize="15"
        fontWeight="700"
        fill={warning}
      >
        总点数 X = X₁ + X₂
      </text>
      <text x="360" y="322" textAnchor="middle" fontSize="18" fill={primary}>
        E[X] = 3.5 + 3.5 = 7
      </text>
      <text x="360" y="388" textAnchor="middle" fontSize="12" fill={secondary}>
        相关性会改变联合分布，却不破坏有限和的期望线性
      </text>
    </Frame>
  );
}

/** 展示二项分布的概率质量如何由组合数、p 和 q 组成。 */
export function Mg4BinomialDiagram() {
  const probabilities = [1, 6, 15, 20, 15, 6, 1];
  return (
    <Frame
      ariaLabel="二项分布图：n=6且p=q=1/2时，正面次数0到6的权重为1、6、15、20、15、6、1，总和为64。"
      caption="先固定一个正反顺序，再选择正面位置；所有柱子的总概率为1。"
    >
      <text
        x="360"
        y="32"
        textAnchor="middle"
        fontSize="16"
        fontWeight="700"
        fill={primary}
      >
        二项分布：组合数铺出概率质量
      </text>
      <text x="360" y="56" textAnchor="middle" fontSize="12" fill={secondary}>
        n=6, p=q=1/2；柱高与 C(6,k)pᵏq⁽⁶⁻ᵏ⁾ 成正比
      </text>
      <line
        x1="76"
        y1="326"
        x2="644"
        y2="326"
        stroke={border}
        strokeWidth="2"
      />
      {probabilities.map((value, index) => {
        const height = value * 7;
        const x = 88 + index * 78;
        return (
          <g key={`binomial-${index}`}>
            <rect
              x={x}
              y={326 - height}
              width="48"
              height={height}
              rx="5"
              fill={accent}
              fillOpacity="0.7"
            />
            <text
              x={x + 24}
              y={315 - height}
              textAnchor="middle"
              fontSize="11"
              fill={primary}
            >
              {value}
            </text>
            <text
              x={x + 24}
              y="348"
              textAnchor="middle"
              fontSize="12"
              fill={secondary}
            >
              k={index}
            </text>
          </g>
        );
      })}
      <rect
        x="186"
        y="82"
        width="348"
        height="56"
        rx="10"
        fill={success}
        fillOpacity="0.1"
        stroke={success}
      />
      <text
        x="360"
        y="106"
        textAnchor="middle"
        fontSize="14"
        fontWeight="700"
        fill={success}
      >
        Σ P₆(k) = (p+q)⁶ = 1
      </text>
      <text x="360" y="126" textAnchor="middle" fontSize="11" fill={primary}>
        完整分布是验证工具，不必用它求期望
      </text>
      <text x="360" y="388" textAnchor="middle" fontSize="12" fill={secondary}>
        指示器分解会直接把期望压缩为 np
      </text>
    </Frame>
  );
}

/** 把优惠券收集过程画成六段等待台阶。 */
export function Mg4CouponCollectorDiagram() {
  const waits = [1, 1.2, 1.5, 2, 3, 6];
  return (
    <Frame
      ariaLabel="优惠券收集幸福台阶：已收集0到5种时，下一种的期望等待分别为1、1.2、1.5、2、3、6，总和为14.7。"
      caption="越接近收集完成，新种类越稀少；最后一级单独贡献6次期望。"
    >
      <text
        x="360"
        y="32"
        textAnchor="middle"
        fontSize="16"
        fontWeight="700"
        fill={primary}
      >
        幸福的台阶：把总等待拆成六级
      </text>
      <text x="360" y="56" textAnchor="middle" fontSize="12" fill={secondary}>
        已收集 j 种 → 新种概率 (6−j)/6 → 等待期望 6/(6−j)
      </text>
      <line
        x1="80"
        y1="334"
        x2="660"
        y2="334"
        stroke={border}
        strokeWidth="2"
      />
      {waits.map((wait, index) => {
        const x = 82 + index * 92;
        const y = 300 - index * 30;
        const width = 78;
        return (
          <g key={`coupon-stage-${index}`}>
            <rect
              x={x}
              y={y}
              width={width}
              height="34"
              rx="6"
              fill={index === 5 ? danger : success}
              fillOpacity="0.6"
            />
            <text
              x={x + width / 2}
              y={y + 22}
              textAnchor="middle"
              fontSize="11"
              fontWeight="700"
              fill={primary}
            >
              {wait} 次
            </text>
            <text
              x={x + width / 2}
              y="358"
              textAnchor="middle"
              fontSize="11"
              fill={secondary}
            >
              j={index}
            </text>
            {index < waits.length - 1 ? (
              <line
                x1={x + width}
                y1={y + 17}
                x2={x + width + 14}
                y2={y - 13}
                stroke={secondary}
                strokeWidth="2"
              />
            ) : null}
          </g>
        );
      })}
      <rect
        x="188"
        y="82"
        width="344"
        height="58"
        rx="10"
        fill={warning}
        fillOpacity="0.1"
        stroke={warning}
      />
      <text
        x="360"
        y="107"
        textAnchor="middle"
        fontSize="15"
        fontWeight="700"
        fill={warning}
      >
        E[X] = 1 + 1.2 + 1.5 + 2 + 3 + 6
      </text>
      <text x="360" y="128" textAnchor="middle" fontSize="13" fill={primary}>
        = 6H₆ = 14.7
      </text>
      <text x="360" y="392" textAnchor="middle" fontSize="12" fill={secondary}>
        总长度是每一级几何等待的和，而不是一次难以枚举的完成时刻
      </text>
    </Frame>
  );
}

/** 说明0/1指示器如何把一次事件的期望变成事件概率。 */
export function Mg4IndicatorDiagram() {
  return (
    <Frame
      ariaLabel="指示器随机变量图：事件发生时C等于1，概率为p；事件不发生时C等于0，概率为1减p，因此E[C]等于p。"
      caption="0/1编码把一次事件的期望直接变成事件发生概率。"
    >
      <text
        x="360"
        y="32"
        textAnchor="middle"
        fontSize="16"
        fontWeight="700"
        fill={primary}
      >
        指示器：把事件变成可相加的积木
      </text>
      <text x="360" y="56" textAnchor="middle" fontSize="12" fill={secondary}>
        C = 1 表示发生，C = 0 表示不发生
      </text>
      <rect
        x="56"
        y="108"
        width="238"
        height="112"
        rx="12"
        fill={success}
        fillOpacity="0.1"
        stroke={success}
      />
      <text
        x="175"
        y="143"
        textAnchor="middle"
        fontSize="16"
        fontWeight="700"
        fill={success}
      >
        事件发生
      </text>
      <text x="175" y="179" textAnchor="middle" fontSize="20" fill={primary}>
        C = 1, Pr = p
      </text>
      <rect
        x="426"
        y="108"
        width="238"
        height="112"
        rx="12"
        fill={border}
        fillOpacity="0.16"
        stroke={border}
      />
      <text
        x="545"
        y="143"
        textAnchor="middle"
        fontSize="16"
        fontWeight="700"
        fill={secondary}
      >
        事件不发生
      </text>
      <text x="545" y="179" textAnchor="middle" fontSize="20" fill={primary}>
        C = 0, Pr = 1−p
      </text>
      <Arrow x1={304} y1={164} x2={360} y2={164} />
      <Arrow x1={426} y1={164} x2={370} y2={164} />
      <rect
        x="136"
        y="274"
        width="448"
        height="68"
        rx="12"
        fill={accent}
        fillOpacity="0.1"
        stroke={accent}
      />
      <text
        x="360"
        y="303"
        textAnchor="middle"
        fontSize="15"
        fontWeight="700"
        fill={accent}
      >
        E[C] = 1·p + 0·(1−p) = p
      </text>
      <text x="360" y="326" textAnchor="middle" fontSize="12" fill={primary}>
        n 个指示器相加 → E[X] = np
      </text>
      <text x="360" y="388" textAnchor="middle" fontSize="12" fill={secondary}>
        计数问题的关键不是展开，而是找到可相加的局部事件
      </text>
    </Frame>
  );
}

/** 交互实验：改变面数和当前收集阶段，观察下一张优惠券的等待期望。 */
export function Mg4ExpectationLab() {
  const [sides, setSides] = useState(6);
  const [stage, setStage] = useState(0);
  const safeStage = Math.min(stage, sides - 1);
  const successProbability = (sides - safeStage) / sides;
  const stageExpectation = 1 / successProbability;
  const totalExpectation = Array.from(
    { length: sides },
    (_, index) => sides / (sides - index),
  ).reduce((sum, value) => sum + value, 0);

  function reset() {
    setSides(6);
    setStage(0);
  }

  return (
    <section
      className="not-prose my-8 rounded-card border border-border bg-elevated p-5"
      aria-label="幸福台阶期望交互实验"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="m-0 text-sm font-semibold text-secondary">交互实验</p>
          <h3 className="m-0 mt-1 text-lg font-bold text-primary">
            幸福台阶：调节面数与收集进度
          </h3>
        </div>
        <button
          type="button"
          onClick={reset}
          className="min-h-11 rounded-md border border-border px-3 py-2 text-sm text-primary hover:bg-surface"
        >
          重置实验
        </button>
      </div>
      <div
        className="mt-4 flex flex-wrap gap-2"
        role="group"
        aria-label="选择骰子面数"
      >
        {[4, 6, 8, 10].map((value) => (
          <button
            key={`sides-${value}`}
            type="button"
            onClick={() => {
              setSides(value);
              setStage(0);
            }}
            className={`min-h-11 rounded-md border px-3 py-2 text-sm ${sides === value ? "border-accent bg-accent/10 text-accent" : "border-border text-primary"}`}
          >
            {value} 面
          </button>
        ))}
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <div className="rounded-md border border-border p-3">
          <p className="m-0 text-xs text-secondary">已收集种类</p>
          <p className="m-0 mt-1 text-xl font-bold text-primary">{safeStage}</p>
        </div>
        <div className="rounded-md border border-border p-3">
          <p className="m-0 text-xs text-secondary">下一种概率</p>
          <p className="m-0 mt-1 text-xl font-bold text-primary">
            {successProbability.toFixed(3)}
          </p>
        </div>
        <div className="rounded-md border border-border p-3">
          <p className="m-0 text-xs text-secondary">当前阶段期望</p>
          <p className="m-0 mt-1 text-xl font-bold text-primary">
            {stageExpectation.toFixed(2)} 次
          </p>
        </div>
      </div>
      <div
        className="mt-4 h-3 overflow-hidden rounded-full bg-surface"
        aria-hidden="true"
      >
        <div
          className="h-full rounded-full bg-accent transition-all"
          style={{ width: `${((safeStage + 1) / sides) * 100}%` }}
        />
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setStage((value) => Math.max(0, value - 1))}
          className="min-h-11 rounded-md border border-border px-3 py-2 text-sm text-primary"
        >
          上一层
        </button>
        <button
          type="button"
          onClick={() => setStage((value) => Math.min(sides - 1, value + 1))}
          className="min-h-11 rounded-md border border-border px-3 py-2 text-sm text-primary"
        >
          下一层
        </button>
      </div>
      <p className="mb-0 mt-4 text-sm leading-6 text-secondary">
        {sides} 面公平骰子收集全部种类的总期望是{" "}
        <span className="font-semibold text-primary">
          {totalExpectation.toFixed(2)} 次
        </span>
        。每进入下一层，新种类更稀少，几何等待的贡献就更大。
      </p>
    </section>
  );
}
