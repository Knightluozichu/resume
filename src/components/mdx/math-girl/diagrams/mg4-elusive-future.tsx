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

/** 把 O、Ω、Θ 放在同一条增长轴上，强调上界、下界与夹逼。 */
export function Mg4AsymptoticDiagram() {
  return (
    <Frame
      ariaLabel="渐近记号图：大O从上方包住函数，大Ω从下方托住函数，大Θ同时给出上界和下界。"
      caption="先给证据不等式，再决定是上界、下界还是紧确阶。"
    >
      <text
        x="360"
        y="32"
        textAnchor="middle"
        fontSize="16"
        fontWeight="700"
        fill={primary}
      >
        O、Ω、Θ：三种增长承诺
      </text>
      <text x="360" y="56" textAnchor="middle" fontSize="12" fill={secondary}>
        n 增大后，常数倍只负责包住增长主阶
      </text>
      <line
        x1="88"
        y1="340"
        x2="650"
        y2="340"
        stroke={border}
        strokeWidth="2"
      />
      <path
        d="M94 304 C184 282, 254 265, 330 244 C428 216, 528 174, 640 112"
        fill="none"
        stroke={accent}
        strokeWidth="4"
      />
      <text
        x="634"
        y="106"
        textAnchor="end"
        fontSize="13"
        fontWeight="700"
        fill={accent}
      >
        T(n)
      </text>
      <path
        d="M94 326 C210 308, 330 272, 442 214 C520 174, 580 140, 640 86"
        fill="none"
        stroke={warning}
        strokeWidth="3"
        strokeDasharray="8 6"
      />
      <text
        x="638"
        y="80"
        textAnchor="end"
        fontSize="13"
        fontWeight="700"
        fill={warning}
      >
        Cf(n) · O
      </text>
      <path
        d="M94 338 C216 332, 326 314, 442 274 C532 244, 586 216, 640 184"
        fill="none"
        stroke={success}
        strokeWidth="3"
        strokeDasharray="8 6"
      />
      <text
        x="638"
        y="178"
        textAnchor="end"
        fontSize="13"
        fontWeight="700"
        fill={success}
      >
        c f(n) · Ω
      </text>
      <rect
        x="122"
        y="88"
        width="196"
        height="72"
        rx="12"
        fill={warning}
        fillOpacity="0.1"
        stroke={warning}
      />
      <text
        x="220"
        y="118"
        textAnchor="middle"
        fontSize="14"
        fontWeight="700"
        fill={warning}
      >
        O(f(n))
      </text>
      <text x="220" y="142" textAnchor="middle" fontSize="12" fill={primary}>
        最终上界
      </text>
      <rect
        x="402"
        y="276"
        width="196"
        height="72"
        rx="12"
        fill={success}
        fillOpacity="0.1"
        stroke={success}
      />
      <text
        x="500"
        y="306"
        textAnchor="middle"
        fontSize="14"
        fontWeight="700"
        fill={success}
      >
        Ω(f(n))
      </text>
      <text x="500" y="330" textAnchor="middle" fontSize="12" fill={primary}>
        最终下界
      </text>
      <rect
        x="250"
        y="180"
        width="220"
        height="62"
        rx="12"
        fill={accent}
        fillOpacity="0.1"
        stroke={accent}
      />
      <text
        x="360"
        y="207"
        textAnchor="middle"
        fontSize="14"
        fontWeight="700"
        fill={accent}
      >
        Θ(f(n))
      </text>
      <text x="360" y="228" textAnchor="middle" fontSize="12" fill={primary}>
        上下界同阶
      </text>
      <text x="360" y="388" textAnchor="middle" fontSize="12" fill={secondary}>
        O 是集合成员关系，不是可以随意交换的普通等号
      </text>
    </Frame>
  );
}

/** 展示二分查找的三次中点比较和候选区间减半。 */
export function Mg4BinarySearchDiagram() {
  const values = [26, 31, 41, 53, 77, 89, 93, 97];
  const active = [3, 5, 4];
  return (
    <Frame
      ariaLabel="二分查找图：在8个有序元素中查找77，依次比较下标4的53、下标6的89、下标5的77。"
      caption="有序性让每次比较都能整段排除候选区间。"
    >
      <text
        x="360"
        y="32"
        textAnchor="middle"
        fontSize="16"
        fontWeight="700"
        fill={primary}
      >
        二分查找：候选区间每次减半
      </text>
      <text x="360" y="56" textAnchor="middle" fontSize="12" fill={secondary}>
        目标 v=77；有序性是算法成立的前置条件
      </text>
      {active.map((index, step) => {
        const y = 116 + step * 80;
        return (
          <g key={`binary-step-${step}`}>
            <text
              x="72"
              y={y + 21}
              fontSize="13"
              fontWeight="700"
              fill={step === 2 ? success : accent}
            >
              第 {step + 1} 次
            </text>
            {values.map((value, valueIndex) => {
              const x = 144 + valueIndex * 62;
              const inRange =
                step === 0 ||
                (step === 1 && valueIndex >= 4) ||
                (step === 2 && valueIndex === 4);
              const current = valueIndex === index;
              return (
                <g key={`binary-${step}-${value}`}>
                  <rect
                    x={x}
                    y={y}
                    width="50"
                    height="38"
                    rx="6"
                    fill={current ? warning : inRange ? accent : border}
                    fillOpacity={current ? "0.72" : inRange ? "0.16" : "0.18"}
                    stroke={current ? warning : border}
                  />
                  <text
                    x={x + 25}
                    y={y + 24}
                    textAnchor="middle"
                    fontSize="11"
                    fontWeight={current ? "700" : "400"}
                    fill={primary}
                  >
                    {value}
                  </text>
                </g>
              );
            })}
            <text
              x="660"
              y={y + 22}
              textAnchor="end"
              fontSize="11"
              fill={currentColor(step)}
            >
              {step === 0 ? "[1,8]" : step === 1 ? "[5,8]" : "[5,5]"}
            </text>
          </g>
        );
      })}
      <rect
        x="164"
        y="358"
        width="392"
        height="38"
        rx="9"
        fill={success}
        fillOpacity="0.1"
        stroke={success}
      />
      <text
        x="360"
        y="383"
        textAnchor="middle"
        fontSize="14"
        fontWeight="700"
        fill={success}
      >
        53 → 89 → 77：3 次比较找到目标
      </text>
    </Frame>
  );
}

function currentColor(step: number) {
  return step === 2 ? success : secondary;
}

/** 用三趟交换展示冒泡排序的扫描长度逐步减少。 */
export function Mg4BubbleSortDiagram() {
  const rows = [
    [53, 89, 41, 31, 26],
    [53, 41, 31, 26, 89],
    [41, 31, 26, 53, 89],
    [31, 26, 41, 53, 89],
  ];
  return (
    <Frame
      ariaLabel="冒泡排序图：输入53、89、41、31、26经过多趟相邻交换，89、53、41依次固定在右端，扫描长度从5减少到2。"
      caption="每趟把一个最大元素送到右端，内层扫描因此形成三角和。"
    >
      <text
        x="360"
        y="32"
        textAnchor="middle"
        fontSize="16"
        fontWeight="700"
        fill={primary}
      >
        冒泡排序：右端逐趟封存
      </text>
      <text x="360" y="56" textAnchor="middle" fontSize="12" fill={secondary}>
        m=5,4,3,2；已就位的末尾不再扫描
      </text>
      {rows.map((row, rowIndex) => {
        const y = 94 + rowIndex * 62;
        return (
          <g key={`bubble-row-${rowIndex}`}>
            <text
              x="76"
              y={y + 24}
              fontSize="13"
              fontWeight="700"
              fill={rowIndex === 0 ? accent : success}
            >
              第 {rowIndex} 趟
            </text>
            {row.map((value, index) => {
              const x = 156 + index * 76;
              const fixed = index >= 4 - rowIndex;
              return (
                <g key={`bubble-${rowIndex}-${index}`}>
                  <rect
                    x={x}
                    y={y}
                    width="58"
                    height="40"
                    rx="6"
                    fill={fixed ? success : accent}
                    fillOpacity={fixed ? "0.6" : "0.16"}
                    stroke={fixed ? success : border}
                  />
                  <text
                    x={x + 29}
                    y={y + 25}
                    textAnchor="middle"
                    fontSize="12"
                    fontWeight="700"
                    fill={primary}
                  >
                    {value}
                  </text>
                </g>
              );
            })}
            <text
              x="650"
              y={y + 24}
              textAnchor="end"
              fontSize="11"
              fill={secondary}
            >
              m={5 - rowIndex}
            </text>
          </g>
        );
      })}
      <rect
        x="154"
        y="350"
        width="414"
        height="44"
        rx="10"
        fill={warning}
        fillOpacity="0.1"
        stroke={warning}
      />
      <text
        x="361"
        y="378"
        textAnchor="middle"
        fontSize="14"
        fontWeight="700"
        fill={warning}
      >
        n + (n−1) + ⋯ + 2 = O(n²)
      </text>
    </Frame>
  );
}

/** 把比较树叶子数与 n! 个输入排列对齐，展示信息下界。 */
export function Mg4ComparisonTreeDiagram() {
  return (
    <Frame
      ariaLabel="比较树下界图：高度h的二叉树至多有2的h次方个叶子，而n个互不相同元素有n!种排列，必须满足2的h次方大于等于n!。"
      caption="下界来自信息量：每个输入排列都需要一个可区分的叶子。"
    >
      <text
        x="360"
        y="32"
        textAnchor="middle"
        fontSize="16"
        fontWeight="700"
        fill={primary}
      >
        比较树：所有排序都要回答的下界
      </text>
      <text x="360" y="56" textAnchor="middle" fontSize="12" fill={secondary}>
        每次比较二分可能性，叶子必须覆盖 n! 种输入排列
      </text>
      <line
        x1="360"
        y1="108"
        x2="238"
        y2="176"
        stroke={secondary}
        strokeWidth="2"
      />
      <line
        x1="360"
        y1="108"
        x2="482"
        y2="176"
        stroke={secondary}
        strokeWidth="2"
      />
      <circle cx="360" cy="104" r="22" fill={accent} fillOpacity="0.7" />
      <text
        x="360"
        y="109"
        textAnchor="middle"
        fontSize="12"
        fontWeight="700"
        fill={primary}
      >
        比较
      </text>
      {[
        { x: 238, label: "<" },
        { x: 482, label: ">" },
      ].map((node) => (
        <g key={`tree-node-${node.label}`}>
          <circle
            cx={node.x}
            cy="180"
            r="20"
            fill={warning}
            fillOpacity="0.7"
          />
          <text
            x={node.x}
            y="186"
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill={primary}
          >
            {node.label}
          </text>
        </g>
      ))}
      {[168, 238, 308, 412, 482, 552].map((x, index) => (
        <g key={`leaf-${x}`}>
          <line
            x1={x < 360 ? x : x}
            y1="201"
            x2={x}
            y2="260"
            stroke={secondary}
            strokeWidth="1.5"
          />
          <circle cx={x} cy="278" r="13" fill={success} fillOpacity="0.7" />
          <text x={x} y="282" textAnchor="middle" fontSize="11" fill={primary}>
            {index + 1}
          </text>
        </g>
      ))}
      <rect
        x="84"
        y="320"
        width="552"
        height="72"
        rx="12"
        fill={danger}
        fillOpacity="0.1"
        stroke={danger}
      />
      <text
        x="360"
        y="348"
        textAnchor="middle"
        fontSize="15"
        fontWeight="700"
        fill={danger}
      >
        2^h ≥ n! → h ≥ log₂(n!)
      </text>
      <text x="360" y="373" textAnchor="middle" fontSize="12" fill={primary}>
        n! ≥ (n/2)^(n/2) → h = Ω(n log n)
      </text>
    </Frame>
  );
}

/** 交互实验：比较不同算法的增长量，并观察比较排序下界。 */
export function Mg4ComplexityLab() {
  const [n, setN] = useState(32);
  const [mode, setMode] = useState<"binary" | "bubble" | "lower">("binary");
  const values = {
    binary: { label: "二分查找 O(log n)", value: Math.log2(n), color: success },
    bubble: { label: "冒泡排序 O(n²)", value: n * n, color: danger },
    lower: {
      label: "比较排序下界 Ω(n log n)",
      value: n * Math.log2(n),
      color: warning,
    },
  } as const;
  const current = values[mode];

  function reset() {
    setN(32);
    setMode("binary");
  }

  return (
    <section
      className="not-prose my-8 rounded-card border border-border bg-elevated p-5"
      aria-label="算法复杂度交互实验"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="m-0 text-sm font-semibold text-secondary">交互实验</p>
          <h3 className="m-0 mt-1 text-lg font-bold text-primary">
            增长阶实验：同一个 n，不同的未来
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
        aria-label="选择输入规模"
      >
        {[8, 16, 32, 64, 128].map((value) => (
          <button
            key={`complexity-n-${value}`}
            type="button"
            onClick={() => setN(value)}
            className={`min-h-11 rounded-md border px-3 py-2 text-sm ${n === value ? "border-accent bg-accent/10 text-accent" : "border-border text-primary"}`}
          >
            n={value}
          </button>
        ))}
      </div>
      <div
        className="mt-3 flex flex-wrap gap-2"
        role="group"
        aria-label="选择算法模型"
      >
        {(Object.keys(values) as Array<keyof typeof values>).map((key) => (
          <button
            key={`complexity-mode-${key}`}
            type="button"
            onClick={() => setMode(key)}
            className={`min-h-11 rounded-md border px-3 py-2 text-sm ${mode === key ? "border-accent bg-accent/10 text-accent" : "border-border text-primary"}`}
          >
            {values[key].label}
          </button>
        ))}
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <div className="rounded-md border border-border p-3">
          <p className="m-0 text-xs text-secondary">输入规模</p>
          <p className="m-0 mt-1 text-xl font-bold text-primary">n={n}</p>
        </div>
        <div className="rounded-md border border-border p-3">
          <p className="m-0 text-xs text-secondary">当前模型</p>
          <p className="m-0 mt-1 text-sm font-bold text-primary">
            {current.label}
          </p>
        </div>
        <div className="rounded-md border border-border p-3">
          <p className="m-0 text-xs text-secondary">相对工作量</p>
          <p
            className="m-0 mt-1 text-xl font-bold"
            style={{ color: current.color }}
          >
            {current.value.toFixed(1)}
          </p>
        </div>
      </div>
      <div
        className="mt-4 h-3 overflow-hidden rounded-full bg-surface"
        aria-hidden="true"
      >
        <div
          className="h-full rounded-full transition-all"
          style={{
            width: `${Math.min(100, (current.value / (n * n)) * 100)}%`,
            backgroundColor: current.color,
          }}
        />
      </div>
      <p className="mb-0 mt-4 text-sm leading-6 text-secondary">
        把 n
        从32调到64：二分查找只增加1次对数层级，比较排序下界约翻倍，而冒泡排序的二次工作量约变成4倍。复杂度描述的是增长形状，不是某个小输入上的绝对秒数。
      </p>
    </section>
  );
}
