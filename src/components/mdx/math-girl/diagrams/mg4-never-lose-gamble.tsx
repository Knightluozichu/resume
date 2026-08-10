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

/** 把两个骰子的36个有序结果、平局与胜负区域同时画出。 */
export function Mg4DiceTableDiagram() {
  return (
    <Frame
      ariaLabel="两个公平骰子的六乘六结果表：对角线六个平局，爱丽丝胜和鲍勃胜各有十五个结果。"
      caption="对称性只说明两侧胜负数相同；先把对角线的6个平局计入样本空间，概率才会闭合为1。"
    >
      <text
        x="360"
        y="30"
        textAnchor="middle"
        fontSize="17"
        fontWeight="700"
        fill={primary}
      >
        两个骰子：对称不等于各一半
      </text>
      <text x="360" y="53" textAnchor="middle" fontSize="12" fill={secondary}>
        36 个有序结果 = 15 个 A 胜 + 6 个平局 + 15 个 B 胜
      </text>
      <text x="130" y="92" textAnchor="middle" fontSize="13" fill={secondary}>
        A/B
      </text>
      {[1, 2, 3, 4, 5, 6].map((value) => (
        <g key={`dice-label-${value}`}>
          <text
            x={170 + value * 42}
            y="92"
            textAnchor="middle"
            fontSize="12"
            fill={secondary}
          >
            {value}
          </text>
          <text
            x="138"
            y={112 + value * 38}
            textAnchor="middle"
            fontSize="12"
            fill={secondary}
          >
            {value}
          </text>
        </g>
      ))}
      {Array.from({ length: 6 }, (_, row) =>
        Array.from({ length: 6 }, (_, column) => {
          const alice = column + 1;
          const bob = row + 1;
          const x = 154 + column * 42;
          const y = 99 + row * 38;
          const tie = alice === bob;
          const aliceWin = alice > bob;
          return (
            <rect
              key={`dice-${alice}-${bob}`}
              x={x}
              y={y}
              width="36"
              height="30"
              rx="6"
              fill={tie ? warning : aliceWin ? accent : success}
              fillOpacity="0.22"
              stroke={tie ? warning : aliceWin ? accent : success}
            />
          );
        }),
      )}
      <rect
        x="470"
        y="116"
        width="204"
        height="184"
        rx="14"
        fill={accent}
        fillOpacity="0.08"
        stroke={border}
      />
      <text
        x="572"
        y="146"
        textAnchor="middle"
        fontSize="15"
        fontWeight="700"
        fill={primary}
      >
        计数核对
      </text>
      <text x="500" y="184" fontSize="13" fill={accent}>
        A 胜：15/36 = 5/12
      </text>
      <text x="500" y="218" fontSize="13" fill={warning}>
        平局：6/36 = 1/6
      </text>
      <text x="500" y="252" fontSize="13" fill={success}>
        B 胜：15/36 = 5/12
      </text>
      <text x="572" y="284" textAnchor="middle" fontSize="13" fill={primary}>
        总和 = 1
      </text>
      <text x="360" y="374" textAnchor="middle" fontSize="13" fill={primary}>
        先列全体 Ω，再给事件计数
      </text>
    </Frame>
  );
}

/** 展示条件“至少一枚正面”如何从四个结果筛出三个结果。 */
export function Mg4ConditionalCoinsDiagram() {
  const outcomes = [
    { label: "HH", detail: "两枚正面", included: true, color: accent },
    { label: "HT", detail: "百元正面", included: true, color: warning },
    { label: "TH", detail: "十元正面", included: true, color: success },
    { label: "TT", detail: "被条件排除", included: false, color: danger },
  ];
  return (
    <Frame
      ariaLabel="条件硬币图：四个可区分结果HH、HT、TH、TT中，至少一枚正面排除TT，条件样本留下HH、HT、TH，所以HH条件概率是三分之一。"
      caption="条件概率先改样本空间：保留下来的三个结果仍等可能，HH 只占其中一个。"
    >
      <text
        x="360"
        y="30"
        textAnchor="middle"
        fontSize="17"
        fontWeight="700"
        fill={primary}
      >
        条件信息：样本空间被重新切片
      </text>
      <text x="360" y="54" textAnchor="middle" fontSize="12" fill={secondary}>
        Ω = {"{HH, HT, TH, TT}"}；E = 至少一枚正面 = {"{HH, HT, TH}"}
      </text>
      {outcomes.map((outcome, index) => {
        const x = 58 + (index % 2) * 316;
        const y = 98 + Math.floor(index / 2) * 108;
        return (
          <g key={outcome.label}>
            <rect
              x={x}
              y={y}
              width="270"
              height="78"
              rx="14"
              fill={outcome.color}
              fillOpacity="0.1"
              stroke={outcome.color}
              strokeWidth="2"
            />
            <text
              x={x + 42}
              y={y + 47}
              textAnchor="middle"
              fontSize="22"
              fontWeight="700"
              fill={outcome.color}
            >
              {outcome.label}
            </text>
            <text
              x={x + 158}
              y={y + 34}
              textAnchor="middle"
              fontSize="13"
              fill={primary}
            >
              {outcome.detail}
            </text>
            <text
              x={x + 158}
              y={y + 57}
              textAnchor="middle"
              fontSize="12"
              fill={outcome.included ? success : danger}
            >
              {outcome.included ? "保留在 E 中" : "E 排除"}
            </text>
          </g>
        );
      })}
      <rect
        x="216"
        y="326"
        width="288"
        height="54"
        rx="12"
        fill={accent}
        fillOpacity="0.08"
        stroke={accent}
      />
      <text
        x="360"
        y="359"
        textAnchor="middle"
        fontSize="14"
        fontWeight="700"
        fill={accent}
      >
        P(HH|E) = 1 / 3
      </text>
    </Frame>
  );
}

/** 展示蒙提霍尔主持人协议将2/3概率集中到唯一未开信封。 */
export function Mg4MontyTreeDiagram() {
  return (
    <Frame
      ariaLabel="蒙提霍尔概率树：初选A中奖概率三分之一时主持人可开B或C，初选为空概率三分之二时主持人被迫打开另一个空信封，交换因此获胜概率为三分之二。"
      caption="主持人知道奖品且总开空信封；这个信息协议使交换保留初选为空的 2/3。"
    >
      <text
        x="360"
        y="30"
        textAnchor="middle"
        fontSize="17"
        fontWeight="700"
        fill={primary}
      >
        蒙提霍尔：主持动作进入概率树
      </text>
      <text x="360" y="54" textAnchor="middle" fontSize="12" fill={secondary}>
        玩家先选 A；主持人知道奖品位置，并且总打开空信封
      </text>
      <rect
        x="300"
        y="82"
        width="120"
        height="48"
        rx="10"
        fill={accent}
        fillOpacity="0.1"
        stroke={accent}
      />
      <text
        x="360"
        y="112"
        textAnchor="middle"
        fontSize="15"
        fontWeight="700"
        fill={accent}
      >
        初选 A
      </text>
      <Arrow x1={334} y1={136} x2={180} y2={206} color={warning} />
      <Arrow x1={386} y1={136} x2={540} y2={206} color={success} />
      <text x="240" y="164" textAnchor="middle" fontSize="13" fill={warning}>
        奖在 A：1/3
      </text>
      <text x="480" y="164" textAnchor="middle" fontSize="13" fill={success}>
        奖不在 A：2/3
      </text>
      <rect
        x="92"
        y="216"
        width="178"
        height="86"
        rx="12"
        fill={warning}
        fillOpacity="0.1"
        stroke={warning}
      />
      <text
        x="181"
        y="246"
        textAnchor="middle"
        fontSize="14"
        fontWeight="700"
        fill={warning}
      >
        可开 B 或 C
      </text>
      <text x="181" y="276" textAnchor="middle" fontSize="13" fill={primary}>
        坚持赢：1/3
      </text>
      <rect
        x="450"
        y="216"
        width="178"
        height="86"
        rx="12"
        fill={success}
        fillOpacity="0.1"
        stroke={success}
      />
      <text
        x="539"
        y="246"
        textAnchor="middle"
        fontSize="14"
        fontWeight="700"
        fill={success}
      >
        被迫开空信封
      </text>
      <text x="539" y="276" textAnchor="middle" fontSize="13" fill={primary}>
        交换赢：2/3
      </text>
      <line
        x1="360"
        y1="330"
        x2="360"
        y2="374"
        stroke={border}
        strokeWidth="2"
      />
      <text x="360" y="398" textAnchor="middle" fontSize="13" fill={primary}>
        外观对称，生成路径不对称
      </text>
    </Frame>
  );
}

/** 对比知情主持人与可能误开奖品的不同概率协议。 */
export function Mg4ProtocolDiagram() {
  return (
    <Frame
      ariaLabel="主持人协议对比图：知情且总开空信封时交换胜率为三分之二；不知道奖品或不总提供交换时，报告机制改变，必须重新建模。"
      caption="2/3 不是视觉规律，而是由主持人知识、动作和是否提供交换共同决定的协议结果。"
    >
      <text
        x="360"
        y="30"
        textAnchor="middle"
        fontSize="17"
        fontWeight="700"
        fill={primary}
      >
        答案属于协议，不属于道具外观
      </text>
      <rect
        x="46"
        y="94"
        width="286"
        height="238"
        rx="14"
        fill={success}
        fillOpacity="0.08"
        stroke={success}
        strokeWidth="2"
      />
      <text
        x="189"
        y="130"
        textAnchor="middle"
        fontSize="15"
        fontWeight="700"
        fill={success}
      >
        标准协议
      </text>
      <text x="78" y="170" fontSize="13" fill={primary}>
        ✓ 主持人知道奖品位置
      </text>
      <text x="78" y="204" fontSize="13" fill={primary}>
        ✓ 总打开一个空信封
      </text>
      <text x="78" y="238" fontSize="13" fill={primary}>
        ✓ 玩家总能交换
      </text>
      <text
        x="189"
        y="286"
        textAnchor="middle"
        fontSize="16"
        fontWeight="700"
        fill={success}
      >
        交换胜率 2/3
      </text>
      <rect
        x="388"
        y="94"
        width="286"
        height="238"
        rx="14"
        fill={danger}
        fillOpacity="0.08"
        stroke={danger}
        strokeWidth="2"
      />
      <text
        x="531"
        y="130"
        textAnchor="middle"
        fontSize="15"
        fontWeight="700"
        fill={danger}
      >
        协议改变
      </text>
      <text x="420" y="170" fontSize="13" fill={primary}>
        ? 主持人可能不知道
      </text>
      <text x="420" y="204" fontSize="13" fill={primary}>
        ? 可能打开中奖信封
      </text>
      <text x="420" y="238" fontSize="13" fill={primary}>
        ? 只在某些局面提供交换
      </text>
      <text
        x="531"
        y="286"
        textAnchor="middle"
        fontSize="15"
        fontWeight="700"
        fill={danger}
      >
        必须重新建模
      </text>
      <Arrow x1={342} y1={214} x2={378} y2={214} color={secondary} />
      <text x="360" y="374" textAnchor="middle" fontSize="13" fill={primary}>
        信息如何产生，会改变观察后的概率
      </text>
    </Frame>
  );
}

type Strategy = "keep" | "switch";

const strategyData: Record<
  Strategy,
  { label: string; winRate: string; detail: string }
> = {
  keep: { label: "坚持", winRate: "1/3", detail: "只有初选中奖时获胜" },
  switch: { label: "交换", winRate: "2/3", detail: "初选为空时获胜" },
};

/** 可重置的蒙提霍尔策略实验。 */
export function Mg4MontyLab() {
  const [strategy, setStrategy] = useState<Strategy>("switch");
  const current = strategyData[strategy];
  return (
    <section
      className="not-prose my-6 rounded-card border border-border bg-elevated p-5"
      aria-label="蒙提霍尔策略实验"
    >
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="text-base font-semibold text-primary">
            Monty Hall Lab
          </h3>
          <p className="mt-1 text-sm text-secondary">
            在固定主持人协议下切换策略，观察胜率来自哪一类初选。
          </p>
        </div>
        <button
          type="button"
          onClick={() => setStrategy("switch")}
          className="rounded-control border border-border px-3 py-2 text-xs text-secondary transition-colors hover:border-accent hover:text-primary"
        >
          重置实验
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {(Object.keys(strategyData) as Strategy[]).map((key) => (
          <button
            key={key}
            type="button"
            onClick={() => setStrategy(key)}
            aria-pressed={strategy === key}
            className={`rounded-control border px-4 py-2 text-sm transition-colors ${strategy === key ? "border-accent text-accent" : "border-border text-secondary"}`}
          >
            {strategyData[key].label}
          </button>
        ))}
      </div>
      <div className="mt-4 grid gap-4 rounded-control border border-border p-4 sm:grid-cols-[1fr_auto] sm:items-center">
        <div>
          <p className="font-mono text-sm text-primary">
            当前策略：{current.label}
          </p>
          <p className="mt-2 text-sm text-accent">
            理论胜率：{current.winRate}
          </p>
          <p className="mt-1 text-sm text-secondary">
            {current.detail}；切换不会改变主持人协议。
          </p>
        </div>
        <svg
          viewBox="0 0 180 120"
          role="img"
          aria-label={`${current.label}策略理论胜率${current.winRate}`}
          className="h-auto w-full max-w-[180px]"
        >
          <rect
            x="18"
            y="28"
            width="144"
            height="30"
            rx="8"
            fill={border}
            fillOpacity="0.35"
          />
          <rect
            x="18"
            y="28"
            width={strategy === "keep" ? 48 : 96}
            height="30"
            rx="8"
            fill={strategy === "keep" ? warning : success}
          />
          <text x="90" y="48" textAnchor="middle" fontSize="12" fill={primary}>
            {current.winRate}
          </text>
          <text
            x="90"
            y="82"
            textAnchor="middle"
            fontSize="12"
            fill={secondary}
          >
            1/3 初选中 · 2/3 初选空
          </text>
          <text x="90" y="104" textAnchor="middle" fontSize="12" fill={accent}>
            {current.label}策略
          </text>
        </svg>
      </div>
    </section>
  );
}
