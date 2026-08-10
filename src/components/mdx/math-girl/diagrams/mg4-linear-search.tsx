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

/** 展示普通顺序查找逐项比较到首次命中的路径。 */
export function Mg4LinearTraceDiagram() {
  const values = [31, 41, 59, 26, 53];
  return (
    <Frame
      ariaLabel="顺序查找逐行图：数组31、41、59、26、53，从第1项开始比较，第四次比较命中26，普通算法共18步。"
      caption="目标位置 M=4 只描述命中位置；18步还包括控制流和返回。"
    >
      <text
        x="360"
        y="32"
        textAnchor="middle"
        fontSize="16"
        fontWeight="700"
        fill={primary}
      >
        LINEAR-SEARCH：从第一格走到命中
      </text>
      <text x="360" y="56" textAnchor="middle" fontSize="12" fill={secondary}>
        v=26；每一格都要公开比较和控制流成本
      </text>
      <line
        x1="88"
        y1="226"
        x2="632"
        y2="226"
        stroke={border}
        strokeWidth="2"
      />
      {values.map((value, index) => {
        const x = 102 + index * 104;
        const found = index === 3;
        return (
          <g key={`trace-cell-${value}`}>
            <circle
              cx={x + 36}
              cy="224"
              r="36"
              fill={found ? success : accent}
              fillOpacity={found ? "0.75" : "0.14"}
              stroke={found ? success : border}
              strokeWidth="2"
            />
            <text
              x={x + 36}
              y="230"
              textAnchor="middle"
              fontSize="16"
              fontWeight="700"
              fill={primary}
            >
              {value}
            </text>
            <text
              x={x + 36}
              y="280"
              textAnchor="middle"
              fontSize="12"
              fill={secondary}
            >
              k={index + 1}
            </text>
            {index < values.length - 1 ? (
              <line
                x1={x + 74}
                y1="224"
                x2={x + 94}
                y2="224"
                stroke={secondary}
                strokeWidth="2"
              />
            ) : null}
          </g>
        );
      })}
      <rect
        x="112"
        y="92"
        width="494"
        height="58"
        rx="11"
        fill={warning}
        fillOpacity="0.1"
        stroke={warning}
      />
      <text
        x="360"
        y="118"
        textAnchor="middle"
        fontSize="14"
        fontWeight="700"
        fill={warning}
      >
        31 ≠ 26 → 41 ≠ 26 → 59 ≠ 26 → 26 = 26
      </text>
      <text x="360" y="139" textAnchor="middle" fontSize="12" fill={primary}>
        M=4；比较次数4，但逐行运行总步数 T_found(4)=18
      </text>
      <rect
        x="166"
        y="322"
        width="388"
        height="54"
        rx="11"
        fill={success}
        fillOpacity="0.1"
        stroke={success}
      />
      <text
        x="360"
        y="354"
        textAnchor="middle"
        fontSize="14"
        fontWeight="700"
        fill={success}
      >
        命中后 return：不再自增、不再失败返回
      </text>
    </Frame>
  );
}

/** 对比找到、未找到两种情形的逐行计数，强调最后一次 while 检查。 */
export function Mg4CostModelDiagram() {
  const rows = [
    { label: "找到 M", value: 18, formula: "4M+2", color: success },
    { label: "找不到 n=5", value: 25, formula: "4n+5", color: danger },
  ];
  return (
    <Frame
      ariaLabel="计算模型图：每行伪代码等成本时，M=4找到目标是18步，n=5找不到目标是25步，失败多出while的最后一次否定检查。"
      caption="控制流成本必须算进去；找不到时 while 条件要执行 n+1 次。"
    >
      <text
        x="360"
        y="32"
        textAnchor="middle"
        fontSize="16"
        fontWeight="700"
        fill={primary}
      >
        计算模型：运行步数是逐行次数之和
      </text>
      <text x="360" y="56" textAnchor="middle" fontSize="12" fill={secondary}>
        每行等成本只是可复查的起点，不是假装等于真实机器时间
      </text>
      <line
        x1="150"
        y1="312"
        x2="620"
        y2="312"
        stroke={border}
        strokeWidth="2"
      />
      {rows.map((row, index) => {
        const y = 112 + index * 112;
        const width = row.value * 14;
        return (
          <g key={`cost-${row.label}`}>
            <text
              x="76"
              y={y + 28}
              fontSize="14"
              fontWeight="700"
              fill={row.color}
            >
              {row.label}
            </text>
            <rect
              x="190"
              y={y}
              width="420"
              height="52"
              rx="9"
              fill={border}
              fillOpacity="0.17"
            />
            <rect
              x="190"
              y={y}
              width={width}
              height="52"
              rx="9"
              fill={row.color}
              fillOpacity="0.7"
            />
            <text
              x={Math.min(590, 205 + width)}
              y={y + 31}
              fontSize="13"
              fontWeight="700"
              fill={primary}
            >
              {row.value} 步
            </text>
            <text
              x="400"
              y={y + 82}
              textAnchor="middle"
              fontSize="13"
              fill={primary}
            >
              {row.formula}
            </text>
          </g>
        );
      })}
      <rect
        x="166"
        y="346"
        width="388"
        height="44"
        rx="10"
        fill={warning}
        fillOpacity="0.1"
        stroke={warning}
      />
      <text
        x="360"
        y="374"
        textAnchor="middle"
        fontSize="14"
        fontWeight="700"
        fill={warning}
      >
        失败：最后一次 k=n+1 检查为假
      </text>
    </Frame>
  );
}

/** 展示把目标写入 n+1 位置后，边界检查如何被移到循环外。 */
export function Mg4SentinelDiagram() {
  const values = [31, 41, 59, 26, 53, 26];
  return (
    <Frame
      ariaLabel="哨兵图：目标26被写入数组第6个位置，循环只比较A[k]与目标，退出后用k小于等于5判断是否命中原数组。"
      caption="哨兵减少循环内的边界检查，但仍需在退出后区分原数组命中与哨兵命中。"
    >
      <text
        x="360"
        y="32"
        textAnchor="middle"
        fontSize="16"
        fontWeight="700"
        fill={primary}
      >
        哨兵：把边界问题放到数组里
      </text>
      <text x="360" y="56" textAnchor="middle" fontSize="12" fill={secondary}>
        A[n+1] ← v；循环内部只问“当前元素等不等于 v”
      </text>
      {values.map((value, index) => {
        const x = 68 + index * 96;
        const sentinel = index === 5;
        return (
          <g key={`sentinel-cell-${index}`}>
            <rect
              x={x}
              y="128"
              width="72"
              height="58"
              rx="9"
              fill={sentinel ? warning : accent}
              fillOpacity={sentinel ? "0.72" : "0.14"}
              stroke={sentinel ? warning : border}
              strokeWidth="2"
            />
            <text
              x={x + 36}
              y="163"
              textAnchor="middle"
              fontSize="15"
              fontWeight="700"
              fill={primary}
            >
              {value}
            </text>
            <text
              x={x + 36}
              y="211"
              textAnchor="middle"
              fontSize="12"
              fill={secondary}
            >
              {sentinel ? "n+1" : index + 1}
            </text>
          </g>
        );
      })}
      <line
        x1="86"
        y1="260"
        x2="614"
        y2="260"
        stroke={secondary}
        strokeWidth="2"
      />
      <polygon points="614,260 602,254 602,266" fill={secondary} />
      <text x="360" y="286" textAnchor="middle" fontSize="13" fill={primary}>
        while A[k] ≠ v：最多在 n+1 处命中
      </text>
      <rect
        x="116"
        y="320"
        width="488"
        height="62"
        rx="11"
        fill={success}
        fillOpacity="0.1"
        stroke={success}
      />
      <text
        x="360"
        y="346"
        textAnchor="middle"
        fontSize="14"
        fontWeight="700"
        fill={success}
      >
        k ≤ n → 原数组命中；k=n+1 → 未找到
      </text>
      <text x="360" y="368" textAnchor="middle" fontSize="12" fill={primary}>
        T_sentinel = 3M − 3S + 7，主项从4M降为3M
      </text>
    </Frame>
  );
}

/** 交互实验：比较不同 n、首次命中位置和普通/哨兵两种精确步数。 */
export function Mg4SearchLab() {
  const [n, setN] = useState(10);
  const [position, setPosition] = useState(4);
  const [mode, setMode] = useState<"linear" | "sentinel">("linear");
  const safePosition = Math.min(position, n);
  const successIndicator = 1;
  const linear = 4 * safePosition - 3 * successIndicator + 5;
  const sentinel = 3 * safePosition - 3 * successIndicator + 7;
  const current = mode === "linear" ? linear : sentinel;

  function reset() {
    setN(10);
    setPosition(4);
    setMode("linear");
  }

  return (
    <section
      className="not-prose my-8 rounded-card border border-border bg-elevated p-5"
      aria-label="顺序查找步数交互实验"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="m-0 text-sm font-semibold text-secondary">交互实验</p>
          <h3 className="m-0 mt-1 text-lg font-bold text-primary">
            搜索步数：常数优化到底省了多少
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
        aria-label="选择数组规模"
      >
        {[5, 10, 20, 50].map((value) => (
          <button
            key={`search-n-${value}`}
            type="button"
            onClick={() => {
              setN(value);
              setPosition(Math.min(position, value));
            }}
            className={`min-h-11 rounded-md border px-3 py-2 text-sm ${n === value ? "border-accent bg-accent/10 text-accent" : "border-border text-primary"}`}
          >
            n={value}
          </button>
        ))}
      </div>
      <div
        className="mt-3 flex flex-wrap gap-2"
        role="group"
        aria-label="选择首次命中位置"
      >
        {[1, 2, 4, n]
          .filter((value, index, values) => values.indexOf(value) === index)
          .map((value) => (
            <button
              key={`search-position-${value}`}
              type="button"
              onClick={() => setPosition(value)}
              className={`min-h-11 rounded-md border px-3 py-2 text-sm ${safePosition === value ? "border-accent bg-accent/10 text-accent" : "border-border text-primary"}`}
            >
              M={value}
            </button>
          ))}
      </div>
      <div
        className="mt-3 flex flex-wrap gap-2"
        role="group"
        aria-label="选择搜索算法"
      >
        {(["linear", "sentinel"] as const).map((value) => (
          <button
            key={`search-mode-${value}`}
            type="button"
            onClick={() => setMode(value)}
            className={`min-h-11 rounded-md border px-3 py-2 text-sm ${mode === value ? "border-accent bg-accent/10 text-accent" : "border-border text-primary"}`}
          >
            {value === "linear" ? "普通版" : "哨兵版"}
          </button>
        ))}
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <div className="rounded-md border border-border p-3">
          <p className="m-0 text-xs text-secondary">输入规模</p>
          <p className="m-0 mt-1 text-xl font-bold text-primary">n={n}</p>
        </div>
        <div className="rounded-md border border-border p-3">
          <p className="m-0 text-xs text-secondary">首次命中</p>
          <p className="m-0 mt-1 text-xl font-bold text-primary">
            M={safePosition}
          </p>
        </div>
        <div className="rounded-md border border-border p-3">
          <p className="m-0 text-xs text-secondary">当前步数</p>
          <p className="m-0 mt-1 text-xl font-bold text-accent">{current}</p>
        </div>
      </div>
      <div
        className="mt-4 h-3 overflow-hidden rounded-full bg-surface"
        aria-hidden="true"
      >
        <div
          className="h-full rounded-full bg-accent transition-all"
          style={{ width: `${Math.min(100, (current / (4 * n + 5)) * 100)}%` }}
        />
      </div>
      <p className="mb-0 mt-4 text-sm leading-6 text-secondary">
        普通版：`4M−3S+5={linear}`；哨兵版：`3M−3S+7={sentinel}`。当 M
        大于2时，哨兵版在这个逐行模型中更快，但两者仍都是线性搜索。
      </p>
    </section>
  );
}
