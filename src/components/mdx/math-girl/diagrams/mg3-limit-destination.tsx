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

/** 展示每个有限截断低于1，但整个数列的目的地是1。 */
export function Mg3FiniteStagesDiagram() {
  const stages = [
    { label: "0.9", y: 306, gap: "10⁻¹" },
    { label: "0.99", y: 264, gap: "10⁻²" },
    { label: "0.999", y: 226, gap: "10⁻³" },
    { label: "…", y: 194, gap: "10⁻ⁿ" },
  ];
  return (
    <Frame
      ariaLabel="有限截断与极限目的地关系图：每个含有限个9的小数都低于1，但随着项数增加逐渐接近1。"
      caption="路上的每一项都小于1；目的地1不是最后一项，而是距离可以任意缩小的固定数。"
    >
      <text
        x="360"
        y="34"
        textAnchor="middle"
        fontSize="17"
        fontWeight="700"
        fill={primary}
      >
        有限阶段 ≠ 极限目的地
      </text>
      <text x="360" y="58" textAnchor="middle" fontSize="12" fill={secondary}>
        aₙ = 1 − 10⁻ⁿ，|aₙ−1| = 10⁻ⁿ
      </text>
      <line
        x1="82"
        y1="336"
        x2="642"
        y2="336"
        stroke={border}
        strokeWidth="2"
      />
      <line
        x1="598"
        y1="116"
        x2="598"
        y2="352"
        stroke={success}
        strokeWidth="3"
      />
      <text
        x="598"
        y="96"
        textAnchor="middle"
        fontSize="14"
        fontWeight="700"
        fill={success}
      >
        A = 1：目的地
      </text>
      {stages.map((stage, index) => {
        const x = 136 + index * 126;
        return (
          <g key={stage.label}>
            <circle cx={x} cy={stage.y} r="8" fill={accent} />
            <line
              x1={x}
              y1={stage.y + 12}
              x2={x}
              y2="336"
              stroke={accent}
              strokeOpacity="0.35"
            />
            <text
              x={x}
              y="370"
              textAnchor="middle"
              fontSize="13"
              fill={primary}
            >
              {stage.label}
            </text>
            <text
              x={x}
              y={stage.y - 18}
              textAnchor="middle"
              fontSize="12"
              fill={warning}
            >
              差距 {stage.gap}
            </text>
            {index < stages.length - 1 ? (
              <Arrow
                x1={x + 18}
                y1={stage.y - 2}
                x2={x + 94}
                y2={stage.y - 2}
                color={secondary}
              />
            ) : null}
          </g>
        );
      })}
      <Arrow x1={514} y1={174} x2={578} y2={132} color={success} />
      <text x="490" y="146" textAnchor="middle" fontSize="12" fill={success}>
        n 增大
      </text>
    </Frame>
  );
}

/** 展示有限等比和如何把循环小数定义为一个极限。 */
export function Mg3GeometricSeriesDiagram() {
  const terms = [9, 0.9, 0.09, 0.009];
  return (
    <Frame
      ariaLabel="有限等比和图：每次加入更短的九，部分和逐渐填满从零到一的区间，剩余误差为十的负n次方。"
      caption="先对有限项求和得到 sₙ=1−10⁻ⁿ，再让误差 10⁻ⁿ 趋于零。"
    >
      <text
        x="360"
        y="34"
        textAnchor="middle"
        fontSize="17"
        fontWeight="700"
        fill={primary}
      >
        循环小数：先有限求和，再取极限
      </text>
      <text x="360" y="58" textAnchor="middle" fontSize="12" fill={secondary}>
        sₙ = 9/10 + 9/10² + ··· + 9/10ⁿ = 1 − 10⁻ⁿ
      </text>
      <rect
        x="76"
        y="132"
        width="568"
        height="54"
        rx="12"
        fill={success}
        fillOpacity="0.08"
        stroke={success}
      />
      <text
        x="360"
        y="166"
        textAnchor="middle"
        fontSize="15"
        fontWeight="700"
        fill={success}
      >
        0
      </text>
      <line
        x1="106"
        y1="159"
        x2="614"
        y2="159"
        stroke={border}
        strokeWidth="2"
      />
      <text
        x="614"
        y="166"
        textAnchor="middle"
        fontSize="15"
        fontWeight="700"
        fill={success}
      >
        1
      </text>
      {terms.map((term, index) => {
        const width = 180 / 2 ** index;
        const x =
          106 +
          terms
            .slice(0, index)
            .reduce((sum, value) => sum + 50 + value * 10, 0);
        return (
          <g key={`term-${index}`}>
            <rect
              x={x}
              y="224"
              width={width}
              height="52"
              rx="8"
              fill={accent}
              fillOpacity="0.18"
              stroke={accent}
            />
            <text
              x={x + width / 2}
              y="255"
              textAnchor="middle"
              fontSize="12"
              fill={primary}
            >
              {index === 0 ? "0.9" : `+ 0.${"0".repeat(index)}9`}
            </text>
          </g>
        );
      })}
      <text x="360" y="318" textAnchor="middle" fontSize="14" fill={primary}>
        剩余空白 = 10⁻ⁿ
      </text>
      <rect
        x="190"
        y="342"
        width="340"
        height="42"
        rx="10"
        fill={warning}
        fillOpacity="0.1"
        stroke={warning}
      />
      <text x="360" y="369" textAnchor="middle" fontSize="13" fill={warning}>
        n 越大，空白越小；没有“最后一项”
      </text>
    </Frame>
  );
}

/** 对比有限小数记号、数列记号与最终极限记号。 */
export function Mg3NotationDiagram() {
  return (
    <Frame
      ariaLabel="记号分层图：含n个9的有限小数是某一项，省略号表示部分和数列的极限，固定目的地1不随着n移动。"
      caption="记号的任务是分层：有限项描述某一步，极限记号描述整列的共同目的地。"
    >
      <text
        x="360"
        y="34"
        textAnchor="middle"
        fontSize="17"
        fontWeight="700"
        fill={primary}
      >
        三种写法，三种对象层次
      </text>
      <rect
        x="48"
        y="100"
        width="190"
        height="220"
        rx="14"
        fill={accent}
        fillOpacity="0.08"
        stroke={accent}
        strokeWidth="2"
      />
      <text
        x="143"
        y="134"
        textAnchor="middle"
        fontSize="14"
        fontWeight="700"
        fill={accent}
      >
        某个有限项
      </text>
      <text x="143" y="190" textAnchor="middle" fontSize="18" fill={primary}>
        0.999
      </text>
      <text x="143" y="232" textAnchor="middle" fontSize="12" fill={secondary}>
        a₃ = 1 − 10⁻³
      </text>
      <text x="143" y="274" textAnchor="middle" fontSize="12" fill={danger}>
        a₃ &lt; 1
      </text>
      <Arrow x1={252} y1={210} x2={310} y2={210} color={secondary} />
      <rect
        x="314"
        y="100"
        width="190"
        height="220"
        rx="14"
        fill={warning}
        fillOpacity="0.08"
        stroke={warning}
        strokeWidth="2"
      />
      <text
        x="409"
        y="134"
        textAnchor="middle"
        fontSize="14"
        fontWeight="700"
        fill={warning}
      >
        整列的趋势
      </text>
      <text x="409" y="190" textAnchor="middle" fontSize="17" fill={primary}>
        lim aₙ
      </text>
      <text x="409" y="232" textAnchor="middle" fontSize="12" fill={secondary}>
        n→∞，距离任意小
      </text>
      <Arrow x1={518} y1={210} x2={576} y2={210} color={secondary} />
      <rect
        x="580"
        y="100"
        width="92"
        height="220"
        rx="14"
        fill={success}
        fillOpacity="0.08"
        stroke={success}
        strokeWidth="2"
      />
      <text
        x="626"
        y="134"
        textAnchor="middle"
        fontSize="14"
        fontWeight="700"
        fill={success}
      >
        目的地
      </text>
      <text
        x="626"
        y="210"
        textAnchor="middle"
        fontSize="22"
        fontWeight="700"
        fill={success}
      >
        A=1
      </text>
      <text x="626" y="274" textAnchor="middle" fontSize="12" fill={secondary}>
        固定数
      </text>
      <text x="360" y="366" textAnchor="middle" fontSize="13" fill={primary}>
        有限项永远不等于“最后一项”
      </text>
    </Frame>
  );
}

/** 把 epsilon-N 证明画成“误差挑战—门槛应答—尾部检查”。 */
export function Mg3LimitThresholdDiagram() {
  return (
    <Frame
      ariaLabel="epsilon-N门槛图：先给出任意正误差epsilon，再选择有限N，之后所有n大于N的项都进入误差带。"
      caption="证明不寻找最后一项，而是为每个 ε 交付一个有限 N，并保证整个尾部。"
    >
      <text
        x="360"
        y="34"
        textAnchor="middle"
        fontSize="17"
        fontWeight="700"
        fill={primary}
      >
        ε-N：目的地的可检查承诺
      </text>
      <text x="360" y="58" textAnchor="middle" fontSize="12" fill={secondary}>
        ∀ε&gt;0 ∃N ∀n≥N：|aₙ−1|&lt;ε
      </text>
      <rect
        x="62"
        y="122"
        width="126"
        height="100"
        rx="14"
        fill={danger}
        fillOpacity="0.1"
        stroke={danger}
        strokeWidth="2"
      />
      <text
        x="125"
        y="158"
        textAnchor="middle"
        fontSize="14"
        fontWeight="700"
        fill={danger}
      >
        挑战
      </text>
      <text x="125" y="194" textAnchor="middle" fontSize="17" fill={primary}>
        ε&gt;0
      </text>
      <Arrow x1={198} y1={172} x2={254} y2={172} color={secondary} />
      <rect
        x="264"
        y="122"
        width="126"
        height="100"
        rx="14"
        fill={accent}
        fillOpacity="0.1"
        stroke={accent}
        strokeWidth="2"
      />
      <text
        x="327"
        y="158"
        textAnchor="middle"
        fontSize="14"
        fontWeight="700"
        fill={accent}
      >
        应答
      </text>
      <text x="327" y="194" textAnchor="middle" fontSize="17" fill={primary}>
        N&gt;log₁₀(1/ε)
      </text>
      <Arrow x1={400} y1={172} x2={456} y2={172} color={secondary} />
      <rect
        x="466"
        y="122"
        width="190"
        height="100"
        rx="14"
        fill={success}
        fillOpacity="0.1"
        stroke={success}
        strokeWidth="2"
      />
      <text
        x="561"
        y="158"
        textAnchor="middle"
        fontSize="14"
        fontWeight="700"
        fill={success}
      >
        尾部检查
      </text>
      <text x="561" y="194" textAnchor="middle" fontSize="16" fill={primary}>
        n≥N ⇒ 10⁻ⁿ&lt;ε
      </text>
      <line
        x1="92"
        y1="310"
        x2="628"
        y2="310"
        stroke={border}
        strokeWidth="2"
      />
      <line
        x1="368"
        y1="276"
        x2="368"
        y2="340"
        stroke={warning}
        strokeWidth="3"
        strokeDasharray="5 4"
      />
      <text x="368" y="364" textAnchor="middle" fontSize="13" fill={warning}>
        N：门槛之后全都成立
      </text>
    </Frame>
  );
}

type LabStage = 1 | 2 | 3 | 4;

const labStages: Record<
  LabStage,
  { label: string; value: string; gap: string; detail: string }
> = {
  1: { label: "n = 1", value: "0.9", gap: "10⁻¹", detail: "离1还有0.1" },
  2: { label: "n = 2", value: "0.99", gap: "10⁻²", detail: "离1还有0.01" },
  3: { label: "n = 3", value: "0.999", gap: "10⁻³", detail: "离1还有0.001" },
  4: {
    label: "n = N",
    value: "1−10⁻ᴺ",
    gap: "10⁻ᴺ",
    detail: "门槛之后仍按同一公式检查",
  },
};

/** 可重置的有限项/目的地实验。 */
export function Mg3DestinationLab() {
  const [stage, setStage] = useState<LabStage>(1);
  const current = labStages[stage];
  return (
    <section
      className="not-prose my-6 rounded-card border border-border bg-elevated p-5"
      aria-label="有限项与极限目的地实验"
    >
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="text-base font-semibold text-primary">
            Destination Lab
          </h3>
          <p className="mt-1 text-sm text-secondary">
            选择有限阶段，观察项与目的地之间的距离如何变小。
          </p>
        </div>
        <button
          type="button"
          onClick={() => setStage(1)}
          className="rounded-control border border-border px-3 py-2 text-xs text-secondary transition-colors hover:border-accent hover:text-primary"
        >
          重置实验
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {(Object.keys(labStages).map(Number) as LabStage[]).map((key) => (
          <button
            key={key}
            type="button"
            onClick={() => setStage(key)}
            aria-pressed={stage === key}
            className={`rounded-control border px-4 py-2 text-sm transition-colors ${stage === key ? "border-accent text-accent" : "border-border text-secondary"}`}
          >
            {labStages[key].label}
          </button>
        ))}
      </div>
      <div className="mt-4 grid gap-4 rounded-control border border-border p-4 sm:grid-cols-[1fr_auto] sm:items-center">
        <div>
          <p className="font-mono text-sm text-primary">
            当前项：{current.value}
          </p>
          <p className="mt-2 text-sm text-accent">目的地：1</p>
          <p className="mt-1 text-sm text-warning">距离：{current.gap}</p>
          <p className="mt-1 text-xs text-secondary">
            {current.detail}；无须等待一个不存在的“最后一项”。
          </p>
        </div>
        <svg
          viewBox="0 0 180 120"
          role="img"
          aria-label={`当前阶段${current.label}与1的距离为${current.gap}`}
          className="h-auto w-full max-w-[180px]"
        >
          <line
            x1="16"
            y1="82"
            x2="164"
            y2="82"
            stroke={border}
            strokeWidth="2"
          />
          <circle cx="40" cy="82" r="7" fill={accent} />
          <circle cx="140" cy="82" r="7" fill={success} />
          <line
            x1="48"
            y1="82"
            x2="132"
            y2="82"
            stroke={warning}
            strokeWidth="8"
            strokeOpacity="0.3"
          />
          <text x="40" y="108" textAnchor="middle" fontSize="12" fill={accent}>
            aₙ
          </text>
          <text
            x="140"
            y="108"
            textAnchor="middle"
            fontSize="12"
            fill={success}
          >
            1
          </text>
          <text x="90" y="64" textAnchor="middle" fontSize="12" fill={warning}>
            {current.gap}
          </text>
        </svg>
      </div>
    </section>
  );
}
