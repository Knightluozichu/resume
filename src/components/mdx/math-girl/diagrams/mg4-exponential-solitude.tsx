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

/** 四张卡片的排列树：每一层都对已有路径重复展开。 */
export function Mg4PermutationTreeDiagram() {
  const rows = [
    { label: "第1位", count: "4", x: 76, y: 104, color: accent },
    { label: "第2位", count: "3", x: 238, y: 164, color: success },
    { label: "第3位", count: "2", x: 400, y: 224, color: warning },
    { label: "第4位", count: "1", x: 562, y: 284, color: danger },
  ];
  return (
    <Frame
      ariaLabel="排列树图：四张卡片的四层选择分别有4、3、2、1种分支，叶子数为4乘3乘2乘1等于24。"
      caption="乘法来自每一层都对上一层的每条路径重复发生。"
    >
      <text
        x="360"
        y="32"
        textAnchor="middle"
        fontSize="16"
        fontWeight="700"
        fill={primary}
      >
        从树形图看见 4!
      </text>
      <text x="360" y="56" textAnchor="middle" fontSize="12" fill={secondary}>
        一条根到叶路径就是一个完整排列
      </text>
      <circle
        cx="44"
        cy="104"
        r="17"
        fill={accent}
        fillOpacity="0.18"
        stroke={accent}
      />
      <text
        x="44"
        y="109"
        textAnchor="middle"
        fontSize="11"
        fontWeight="700"
        fill={primary}
      >
        根
      </text>
      {rows.map((row, index) => (
        <g key={`perm-level-${row.label}`}>
          <line
            x1={index === 0 ? 62 : rows[index - 1].x + 106}
            y1={index === 0 ? 104 : rows[index - 1].y + 16}
            x2={row.x - 18}
            y2={row.y + 16}
            stroke={secondary}
            strokeWidth="2"
          />
          <circle
            cx={row.x}
            cy={row.y + 16}
            r="18"
            fill={row.color}
            fillOpacity="0.78"
          />
          <text
            x={row.x}
            y={row.y + 21}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill={primary}
          >
            {row.count}
          </text>
          <text
            x={row.x}
            y={row.y - 7}
            textAnchor="middle"
            fontSize="11"
            fill={secondary}
          >
            {row.label}
          </text>
          {index < rows.length - 1 ? (
            <>
              <line
                x1={row.x + 18}
                y1={row.y + 16}
                x2={rows[index + 1].x - 18}
                y2={rows[index + 1].y + 16}
                stroke={secondary}
                strokeWidth="2"
              />
              <line
                x1={row.x + 18}
                y1={row.y + 16}
                x2={rows[index + 1].x - 18}
                y2={rows[index + 1].y + 34}
                stroke={secondary}
                strokeWidth="2"
              />
            </>
          ) : null}
        </g>
      ))}
      <rect
        x="120"
        y="350"
        width="480"
        height="42"
        rx="10"
        fill={warning}
        fillOpacity="0.1"
        stroke={warning}
      />
      <text
        x="360"
        y="376"
        textAnchor="middle"
        fontSize="15"
        fontWeight="700"
        fill={warning}
      >
        4 × 3 × 2 × 1 = 24 条根到叶路径
      </text>
    </Frame>
  );
}

/** 把有序取法除以内部排列，展示组合数的除重理由。 */
export function Mg4CombinationDiagram() {
  return (
    <Frame
      ariaLabel="组合除重图：从5个对象取2个先得到20个有序结果，AB与BA组成一个等价块，每块有2个排列，最终得到10个组合。"
      caption="组合数不是凭空出现的除法，而是把每个无序对象的内部顺序折叠。"
    >
      <text
        x="360"
        y="32"
        textAnchor="middle"
        fontSize="16"
        fontWeight="700"
        fill={primary}
      >
        P(5,2) → C(5,2)：把顺序折叠
      </text>
      <text x="360" y="56" textAnchor="middle" fontSize="12" fill={secondary}>
        有序取法20个，每个无序二元集合恰好出现2!次
      </text>
      <rect
        x="44"
        y="104"
        width="188"
        height="112"
        rx="12"
        fill={accent}
        fillOpacity="0.1"
        stroke={accent}
      />
      <text
        x="138"
        y="138"
        textAnchor="middle"
        fontSize="15"
        fontWeight="700"
        fill={accent}
      >
        有序
      </text>
      <text x="138" y="174" textAnchor="middle" fontSize="20" fill={primary}>
        P(5,2)=20
      </text>
      <text x="138" y="198" textAnchor="middle" fontSize="11" fill={secondary}>
        AB 与 BA 分开
      </text>
      <line
        x1="246"
        y1="160"
        x2="320"
        y2="160"
        stroke={secondary}
        strokeWidth="2"
      />
      <polygon points="320,160 309,154 309,166" fill={secondary} />
      <text
        x="283"
        y="145"
        textAnchor="middle"
        fontSize="12"
        fontWeight="700"
        fill={warning}
      >
        ÷ 2!
      </text>
      <rect
        x="344"
        y="104"
        width="188"
        height="112"
        rx="12"
        fill={success}
        fillOpacity="0.1"
        stroke={success}
      />
      <text
        x="438"
        y="138"
        textAnchor="middle"
        fontSize="15"
        fontWeight="700"
        fill={success}
      >
        无序
      </text>
      <text x="438" y="174" textAnchor="middle" fontSize="20" fill={primary}>
        C(5,2)=10
      </text>
      <text x="438" y="198" textAnchor="middle" fontSize="11" fill={secondary}>
        AB 与 BA 合并
      </text>
      <rect
        x="110"
        y="268"
        width="500"
        height="76"
        rx="12"
        fill={warning}
        fillOpacity="0.1"
        stroke={warning}
      />
      <text
        x="360"
        y="300"
        textAnchor="middle"
        fontSize="15"
        fontWeight="700"
        fill={warning}
      >
        C(n,k) = P(n,k) / k! = n! / [k!(n−k)!]
      </text>
      <text x="360" y="326" textAnchor="middle" fontSize="12" fill={primary}>
        每个组合的 k! 种内部排列被精确除掉
      </text>
      <text x="360" y="388" textAnchor="middle" fontSize="12" fill={secondary}>
        先声明顺序语义，再选择计数公式
      </text>
    </Frame>
  );
}

/** 把帕斯卡行、组合数和比特模式分组放在同一张图中。 */
export function Mg4PascalBitDiagram() {
  const row = [1, 5, 10, 10, 5, 1];
  return (
    <Frame
      ariaLabel="帕斯卡与比特图：五比特按1的个数分组，组大小为1、5、10、10、5、1，所有组相加得到2的5次方等于32。"
      caption="同一组组合数既是二项式系数，也是恰有 k 个1的比特模式数量。"
    >
      <text
        x="360"
        y="32"
        textAnchor="middle"
        fontSize="16"
        fontWeight="700"
        fill={primary}
      >
        帕斯卡三角形 = 比特模式分组
      </text>
      <text x="360" y="56" textAnchor="middle" fontSize="12" fill={secondary}>
        五比特按其中1的个数 k 分类
      </text>
      <text
        x="108"
        y="102"
        textAnchor="middle"
        fontSize="13"
        fontWeight="700"
        fill={accent}
      >
        k
      </text>
      <text
        x="190"
        y="102"
        textAnchor="middle"
        fontSize="13"
        fontWeight="700"
        fill={success}
      >
        C(5,k)
      </text>
      <text
        x="340"
        y="102"
        textAnchor="middle"
        fontSize="13"
        fontWeight="700"
        fill={warning}
      >
        比特样例
      </text>
      {row.map((value, index) => {
        const y = 132 + index * 34;
        const sample = `${"1".repeat(index)}${"0".repeat(5 - index)}`;
        return (
          <g key={`bit-row-${index}`}>
            <text x="108" y={y} textAnchor="middle" fontSize="13" fill={accent}>
              {index}
            </text>
            <text
              x="190"
              y={y}
              textAnchor="middle"
              fontSize="14"
              fontWeight="700"
              fill={success}
            >
              {value}
            </text>
            <text
              x="340"
              y={y}
              textAnchor="middle"
              fontSize="13"
              fontFamily="monospace"
              fill={primary}
            >
              {sample}
            </text>
            <text
              x="548"
              y={y}
              textAnchor="middle"
              fontSize="11"
              fill={secondary}
            >
              恰有 {index} 个1
            </text>
          </g>
        );
      })}
      <rect
        x="126"
        y="342"
        width="468"
        height="48"
        rx="10"
        fill={warning}
        fillOpacity="0.1"
        stroke={warning}
      />
      <text
        x="360"
        y="372"
        textAnchor="middle"
        fontSize="15"
        fontWeight="700"
        fill={warning}
      >
        Σ C(5,k) = (1+1)^5 = 2^5 = 32
      </text>
    </Frame>
  );
}

/** 通过目标边界对比 2^33 与 2^34，说明指数增长的阈值。 */
export function Mg4StateSpaceDiagram() {
  const threshold = 10_000_000_000;
  const values = [
    { label: "2^33", value: 8_589_934_592, color: danger },
    { label: "目标", value: threshold, color: warning },
    { label: "2^34", value: 17_179_869_184, color: success },
  ];
  const max = 17_179_869_184;
  return (
    <Frame
      ariaLabel="指数边界图：2的33次方为8589934592，小于100亿；2的34次方为17179869184，大于100亿，所以最少需要34比特。"
      caption="一位的差别把容量从不足目标推到足够目标，因为每加一位容量翻倍。"
    >
      <text
        x="360"
        y="32"
        textAnchor="middle"
        fontSize="16"
        fontWeight="700"
        fill={primary}
      >
        33 位不够，34 位越过边界
      </text>
      <text x="360" y="56" textAnchor="middle" fontSize="12" fill={secondary}>
        目标：为100亿个对象提供不同编号
      </text>
      {values.map((item, index) => {
        const y = 104 + index * 78;
        const width = (item.value / max) * 488;
        return (
          <g key={`state-bar-${item.label}`}>
            <text
              x="88"
              y={y + 22}
              fontSize="14"
              fontWeight="700"
              fill={item.color}
            >
              {item.label}
            </text>
            <rect
              x="170"
              y={y}
              width="488"
              height="42"
              rx="8"
              fill={border}
              fillOpacity="0.18"
            />
            <rect
              x="170"
              y={y}
              width={width}
              height="42"
              rx="8"
              fill={item.color}
              fillOpacity="0.72"
            />
            <text
              x={Math.min(640, 184 + width)}
              y={y + 27}
              fontSize="11"
              fill={primary}
            >
              {item.value.toLocaleString("en-US")}
            </text>
          </g>
        );
      })}
      <line
        x1="470"
        y1="82"
        x2="470"
        y2="344"
        stroke={warning}
        strokeWidth="2"
        strokeDasharray="7 6"
      />
      <text
        x="470"
        y="370"
        textAnchor="middle"
        fontSize="12"
        fontWeight="700"
        fill={warning}
      >
        100亿边界
      </text>
      <text x="360" y="402" textAnchor="middle" fontSize="12" fill={secondary}>
        2^(n+1) = 2 · 2^n
      </text>
    </Frame>
  );
}

/** 交互实验：切换比特数，观察状态空间怎样翻倍并跨过100亿边界。 */
export function Mg4ExponentialLab() {
  const [bits, setBits] = useState(34);
  const target = 10_000_000_000;
  const capacity = 2 ** bits;
  const reachesTarget = capacity >= target;

  function reset() {
    setBits(34);
  }

  return (
    <section
      className="not-prose my-8 rounded-card border border-border bg-elevated p-5"
      aria-label="指数容量交互实验"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="m-0 text-sm font-semibold text-secondary">交互实验</p>
          <h3 className="m-0 mt-1 text-lg font-bold text-primary">
            比特容量：找到最小可行位数
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
        aria-label="选择比特数"
      >
        {[8, 16, 24, 33, 34, 40].map((value) => (
          <button
            key={`bits-${value}`}
            type="button"
            onClick={() => setBits(value)}
            className={`min-h-11 rounded-md border px-3 py-2 text-sm ${bits === value ? "border-accent bg-accent/10 text-accent" : "border-border text-primary"}`}
          >
            {value} 位
          </button>
        ))}
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <div className="rounded-md border border-border p-3">
          <p className="m-0 text-xs text-secondary">当前容量</p>
          <p className="m-0 mt-1 text-xl font-bold text-primary">
            {capacity.toLocaleString("en-US")}
          </p>
        </div>
        <div className="rounded-md border border-border p-3">
          <p className="m-0 text-xs text-secondary">目标规模</p>
          <p className="m-0 mt-1 text-xl font-bold text-primary">
            10,000,000,000
          </p>
        </div>
        <div className="rounded-md border border-border p-3">
          <p className="m-0 text-xs text-secondary">结论</p>
          <p
            className={`m-0 mt-1 text-xl font-bold ${reachesTarget ? "text-success" : "text-danger"}`}
          >
            {reachesTarget ? "足够" : "不足"}
          </p>
        </div>
      </div>
      <div
        className="mt-4 h-3 overflow-hidden rounded-full bg-surface"
        aria-hidden="true"
      >
        <div
          className={`h-full rounded-full transition-all ${reachesTarget ? "bg-success" : "bg-danger"}`}
          style={{ width: `${Math.min(100, (capacity / target) * 100)}%` }}
        />
      </div>
      <p className="mb-0 mt-4 text-sm leading-6 text-secondary">
        当前选择 {bits} 位；再增加1位，容量从 {capacity.toLocaleString("en-US")}{" "}
        变为 {(capacity * 2).toLocaleString("en-US")}
        ，这就是指数增长的“复制旧空间”机制。
      </p>
    </section>
  );
}
