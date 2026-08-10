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

function pathForHeights(heights: number[]) {
  return heights
    .map((height, index) => {
      const x = 72 + index * 48;
      const y = 302 - height * 34;
      return `${index === 0 ? "M" : "L"} ${x} ${y}`;
    })
    .join(" ");
}

/** 把动态规划的时间—高度网格与一条合法旋律放在同一张图上。 */
export function Mg4PianoPathDiagram() {
  const heights = [0, 1, 2, 1, 0, 1, 2, 3, 2, 3, 4, 3];
  const badHeights = [0, -1, 0, 1, 2, 1, 0, 1, 2, 3, 2, 3];
  return (
    <Frame
      ariaLabel="Piano Path Grid：时间横轴与相对音高纵轴组成网格，蓝色路径始终不低于零并在第11步到达高度3，红色路径在第一步跌到负一。"
      caption="Piano Path Grid：终点条件只检查最后一格，全过程条件还要检查边界以下的每一格。"
    >
      <text
        x="360"
        y="30"
        textAnchor="middle"
        fontSize="18"
        fontWeight="700"
        fill={primary}
      >
        Piano Path Grid：165 条合法路径的边界
      </text>
      <text x="360" y="55" textAnchor="middle" fontSize="13" fill={secondary}>
        c(t+1,h)=c(t,h−1)+c(t,h+1)，网格下方固定为 0
      </text>
      {[0, 1, 2, 3, 4].map((height) => {
        const y = 302 - height * 34;
        return (
          <g key={`height-${height}`}>
            <line
              x1="60"
              y1={y}
              x2="610"
              y2={y}
              stroke={border}
              strokeWidth="1"
            />
            <text
              x="44"
              y={y + 5}
              textAnchor="end"
              fontSize="12"
              fill={secondary}
            >
              {height}
            </text>
          </g>
        );
      })}
      <line
        x1="60"
        y1="336"
        x2="610"
        y2="336"
        stroke={danger}
        strokeWidth="3"
      />
      <text x="620" y="341" fontSize="12" fill={danger}>
        边界 h=0
      </text>
      {heights.map((height, index) => {
        const x = 72 + index * 48;
        const y = 302 - height * 34;
        return (
          <g key={`good-node-${index}`}>
            <circle cx={x} cy={y} r="5" fill={accent} />
            {index > 0 ? (
              <line
                x1={72 + (index - 1) * 48}
                y1={302 - heights[index - 1] * 34}
                x2={x}
                y2={y}
                stroke={accent}
                strokeWidth="4"
                strokeLinecap="round"
              />
            ) : null}
          </g>
        );
      })}
      <path
        d={pathForHeights(badHeights)}
        fill="none"
        stroke={danger}
        strokeWidth="3"
        strokeDasharray="7 6"
      />
      <circle cx="72" cy="302" r="5" fill={danger} />
      <circle cx="120" cy="336" r="6" fill={danger} />
      <text x="72" y="382" fontSize="13" fill={accent}>
        合法：c(11,3)=165
      </text>
      <text x="360" y="382" fontSize="13" fill={danger}>
        坏路径：第一次越过 h=0
      </text>
    </Frame>
  );
}

/** 展示首次越界反射如何把330条候选路径拆成165条坏路径。 */
export function Mg4ReflectionDiagram() {
  return (
    <Frame
      ariaLabel="Reflection Bijection：左侧显示330条7上4下候选路径，镜面位于高度负一；右侧显示首次越界后翻转得到的3上8下坏路径，共165条。"
      caption="Reflection Bijection：坏路径的首次越界点是唯一切口，所以翻转与反向翻转互为逆操作。"
    >
      <text
        x="360"
        y="30"
        textAnchor="middle"
        fontSize="18"
        fontWeight="700"
        fill={primary}
      >
        首次越界反射：330 − 165 = 165
      </text>
      <rect
        x="42"
        y="76"
        width="270"
        height="244"
        rx="14"
        fill={accent}
        fillOpacity="0.08"
        stroke={accent}
      />
      <rect
        x="408"
        y="76"
        width="270"
        height="244"
        rx="14"
        fill={warning}
        fillOpacity="0.08"
        stroke={warning}
      />
      <text
        x="177"
        y="108"
        textAnchor="middle"
        fontSize="16"
        fontWeight="700"
        fill={accent}
      >
        全部候选
      </text>
      <text
        x="543"
        y="108"
        textAnchor="middle"
        fontSize="16"
        fontWeight="700"
        fill={warning}
      >
        坏路径的镜像集合
      </text>
      <text x="177" y="140" textAnchor="middle" fontSize="15" fill={primary}>
        7 上 + 4 下
      </text>
      <text
        x="177"
        y="170"
        textAnchor="middle"
        fontSize="22"
        fontWeight="700"
        fill={accent}
      >
        C(11,7)=330
      </text>
      <line
        x1="72"
        y1="238"
        x2="278"
        y2="238"
        stroke={danger}
        strokeWidth="3"
      />
      <path
        d="M 78 214 L 110 180 L 142 214 L 174 248 L 206 214 L 238 180 L 270 214"
        fill="none"
        stroke={danger}
        strokeWidth="4"
      />
      <text x="177" y="278" textAnchor="middle" fontSize="13" fill={danger}>
        第一次到达 −1
      </text>
      <Arrow x1={320} y1={198} x2={400} y2={198} color={warning} />
      <text x="360" y="178" textAnchor="middle" fontSize="12" fill={secondary}>
        翻转首次越界后的上下步
      </text>
      <text x="543" y="140" textAnchor="middle" fontSize="15" fill={primary}>
        3 上 + 8 下到 −5
      </text>
      <text
        x="543"
        y="170"
        textAnchor="middle"
        fontSize="22"
        fontWeight="700"
        fill={warning}
      >
        C(11,3)=165
      </text>
      <path
        d="M 444 214 L 476 180 L 508 214 L 540 248 L 572 282 L 604 248 L 636 282"
        fill="none"
        stroke={warning}
        strokeWidth="4"
      />
      <text x="360" y="370" textAnchor="middle" fontSize="14" fill={primary}>
        合法路径 = 全部候选 − 坏路径 = 330 − 165
      </text>
    </Frame>
  );
}

/** 把两国递推、状态守恒和转移矩阵的列语义放在一张图上。 */
export function Mg4MarkovMatrixDiagram() {
  return (
    <Frame
      ariaLabel="两国转移矩阵图：A国和B国是两个状态，A留下概率1减p、A到B概率p，B到A概率q、B留下概率1减q；矩阵每列和为1。"
      caption="No-Omission State Sum：每个下一状态都把所有互斥来源相加，转移矩阵的列因此保持概率总和。"
    >
      <text
        x="360"
        y="30"
        textAnchor="middle"
        fontSize="18"
        fontWeight="700"
        fill={primary}
      >
        两国流浪：状态、来源与转移
      </text>
      <circle
        cx="160"
        cy="206"
        r="56"
        fill={accent}
        fillOpacity="0.16"
        stroke={accent}
        strokeWidth="3"
      />
      <circle
        cx="560"
        cy="206"
        r="56"
        fill={success}
        fillOpacity="0.16"
        stroke={success}
        strokeWidth="3"
      />
      <text
        x="160"
        y="214"
        textAnchor="middle"
        fontSize="23"
        fontWeight="700"
        fill={accent}
      >
        A 国
      </text>
      <text
        x="560"
        y="214"
        textAnchor="middle"
        fontSize="23"
        fontWeight="700"
        fill={success}
      >
        B 国
      </text>
      <Arrow x1={216} y1={178} x2={500} y2={178} color={accent} />
      <text x="360" y="166" textAnchor="middle" fontSize="14" fill={accent}>
        A→B：p
      </text>
      <Arrow x1={504} y1={234} x2={220} y2={234} color={success} />
      <text x="360" y="270" textAnchor="middle" fontSize="14" fill={success}>
        B→A：q
      </text>
      <path
        d="M 125 158 C 70 110, 70 300, 125 254"
        fill="none"
        stroke={accent}
        strokeWidth="2"
      />
      <path
        d="M 595 158 C 650 110, 650 300, 595 254"
        fill="none"
        stroke={success}
        strokeWidth="2"
      />
      <text x="82" y="110" fontSize="13" fill={accent}>
        留下：1−p
      </text>
      <text x="584" y="110" fontSize="13" fill={success}>
        留下：1−q
      </text>
      <rect
        x="242"
        y="310"
        width="236"
        height="68"
        rx="12"
        fill={border}
        fillOpacity="0.18"
        stroke={border}
      />
      <text
        x="360"
        y="337"
        textAnchor="middle"
        fontSize="15"
        fontWeight="700"
        fill={primary}
      >
        T = [[1−p, q], [p, 1−q]]
      </text>
      <text x="360" y="362" textAnchor="middle" fontSize="13" fill={secondary}>
        每列元素和 = 1
      </text>
    </Frame>
  );
}

/** 将守恒特征方向与衰减特征方向分解出来。 */
export function Mg4EigenModeDiagram() {
  return (
    <Frame
      ariaLabel="特征模式图：特征值1对应总概率守恒，特征值r等于1减p减q对应初始偏差衰减；随着n增加，r的幂趋近零，只剩稳态分布。"
      caption="Mode Decomposition：对角化把长期守恒与短期衰减拆成两条可解释的特征方向。"
    >
      <text
        x="360"
        y="30"
        textAnchor="middle"
        fontSize="18"
        fontWeight="700"
        fill={primary}
      >
        Mode Decomposition：守恒 + 衰减
      </text>
      <rect
        x="54"
        y="82"
        width="276"
        height="226"
        rx="14"
        fill={accent}
        fillOpacity="0.08"
        stroke={accent}
      />
      <rect
        x="390"
        y="82"
        width="276"
        height="226"
        rx="14"
        fill={warning}
        fillOpacity="0.08"
        stroke={warning}
      />
      <text
        x="192"
        y="116"
        textAnchor="middle"
        fontSize="16"
        fontWeight="700"
        fill={accent}
      >
        λ₁ = 1：守恒方向
      </text>
      <text
        x="528"
        y="116"
        textAnchor="middle"
        fontSize="16"
        fontWeight="700"
        fill={warning}
      >
        λ₂ = r：衰减方向
      </text>
      <line
        x1="92"
        y1="240"
        x2="292"
        y2="240"
        stroke={border}
        strokeWidth="2"
      />
      <Arrow x1={106} y1={208} x2={278} y2={208} color={accent} />
      <Arrow x1={106} y1={208} x2={278} y2={208} color={accent} />
      <text x="192" y="274" textAnchor="middle" fontSize="14" fill={primary}>
        aₙ + bₙ = 1
      </text>
      <text x="192" y="298" textAnchor="middle" fontSize="13" fill={secondary}>
        总概率不变
      </text>
      {[0, 1, 2, 3, 4].map((index) => {
        const width = 168 - index * 30;
        return (
          <rect
            key={`decay-${index}`}
            x={430}
            y={150 + index * 27}
            width={width}
            height="15"
            rx="7"
            fill={warning}
            fillOpacity={0.72 - index * 0.1}
          />
        );
      })}
      <text x="528" y="294" textAnchor="middle" fontSize="13" fill={primary}>
        rⁿ → 0（|r|&lt;1）
      </text>
      <text x="360" y="366" textAnchor="middle" fontSize="15" fill={primary}>
        vₙ = 稳态模式 + rⁿ × 初始偏差
      </text>
    </Frame>
  );
}

type LabMode = "paths" | "matrix" | "modes";

/** 让读者在三种证据视角之间切换，并保留可重复的重置入口。 */
export function Mg4RandomWalkLab() {
  const [mode, setMode] = useState<LabMode>("matrix");
  const labels: Record<LabMode, string> = {
    paths: "路径计数",
    matrix: "两国转移",
    modes: "特征模式",
  };

  return (
    <section
      aria-label="孤零零的随机漫步实验"
      className="not-prose my-8 rounded-card border border-border bg-elevated p-5"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="m-0 text-sm font-semibold uppercase tracking-[0.18em] text-secondary">
            Random Walk Evidence Lab
          </p>
          <h3 className="m-0 mt-1 text-xl font-semibold text-primary">
            切换同一个问题的三种视角
          </h3>
        </div>
      </div>
      <div
        className="mt-4 flex flex-wrap gap-2"
        role="tablist"
        aria-label="实验模式"
      >
        {(Object.keys(labels) as LabMode[]).map((key) => (
          <button
            key={key}
            type="button"
            role="tab"
            aria-selected={mode === key}
            aria-pressed={mode === key}
            onClick={() => setMode(key)}
            className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
              mode === key
                ? "border-accent bg-accent/15 text-primary"
                : "border-border text-secondary hover:border-accent"
            }`}
          >
            {labels[key]}
          </button>
        ))}
        <button
          type="button"
          onClick={() => setMode("matrix")}
          className="rounded-full border border-border px-4 py-2 text-sm font-semibold text-primary transition hover:border-accent"
        >
          重置实验
        </button>
      </div>
      <div className="mt-3 rounded-card border border-border bg-base p-3">
        {mode === "paths" ? <Mg4PianoPathDiagram /> : null}
        {mode === "matrix" ? <Mg4MarkovMatrixDiagram /> : null}
        {mode === "modes" ? <Mg4EigenModeDiagram /> : null}
      </div>
      <p className="mt-3 mb-0 text-sm leading-6 text-secondary">
        当前证据：
        {mode === "paths"
          ? "边界条件把330条候选路径筛成165条合法路径。"
          : mode === "matrix"
            ? "矩阵乘法把互斥的中间状态求和，且每列保持概率总和。"
            : "特征值1保留守恒量，|1-p-q|小于1时初始偏差逐步衰减。"}
      </p>
    </section>
  );
}
