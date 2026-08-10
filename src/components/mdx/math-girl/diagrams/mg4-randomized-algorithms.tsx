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

/** 展示一次快排划分中的四个区域与枢纽归位。 */
export function Mg4QuickSortPartitionDiagram() {
  const values = [3, 1, 2, 4, 5, 7, 8, 6];
  return (
    <Frame
      ariaLabel="快速排序划分图：枢纽5左侧是小于5的元素，右侧是大于等于5的元素，扫描后枢纽到达最终排序位置。"
      caption="p 维护小于枢纽区，k 扫描未确认区；一次划分只负责分组，不负责把两翼完全排好。"
    >
      <text
        x="360"
        y="30"
        textAnchor="middle"
        fontSize="17"
        fontWeight="700"
        fill={primary}
      >
        QUICKSORT：先分组，再递归
      </text>
      <text x="360" y="55" textAnchor="middle" fontSize="13" fill={secondary}>
        示例输入 5,1,7,2,6,4,8,3；枢纽是 5
      </text>
      {values.map((value, index) => {
        const x = 58 + index * 78;
        const pivot = value === 5;
        const left = value < 5;
        return (
          <g key={`partition-${value}`}>
            <rect
              x={x}
              y="112"
              width="60"
              height="54"
              rx="10"
              fill={pivot ? warning : left ? accent : success}
              fillOpacity="0.2"
              stroke={pivot ? warning : left ? accent : success}
              strokeWidth={pivot ? "3" : "2"}
            />
            <text
              x={x + 30}
              y="146"
              textAnchor="middle"
              fontSize="18"
              fontWeight="700"
              fill={primary}
            >
              {value}
            </text>
          </g>
        );
      })}
      <line
        x1="432"
        y1="98"
        x2="432"
        y2="178"
        stroke={warning}
        strokeWidth="2"
        strokeDasharray="5 4"
      />
      <text x="240" y="204" textAnchor="middle" fontSize="13" fill={accent}>
        小于枢纽：3,1,2,4
      </text>
      <text x="480" y="204" textAnchor="middle" fontSize="13" fill={success}>
        大于枢纽：7,8,6
      </text>
      <Arrow x1={360} y1={232} x2={360} y2={274} color={warning} />
      <rect
        x="128"
        y="286"
        width="464"
        height="54"
        rx="12"
        fill={accent}
        fillOpacity="0.08"
        stroke={accent}
      />
      <text
        x="360"
        y="319"
        textAnchor="middle"
        fontSize="15"
        fontWeight="700"
        fill={primary}
      >
        左翼与右翼继续递归；5 已在最终排序位置
      </text>
      <text x="360" y="378" textAnchor="middle" fontSize="13" fill={secondary}>
        枢纽落在端点时，递归树会变得极不平衡
      </text>
    </Frame>
  );
}

/** 对比端点枢纽、均匀枢纽与随机枢纽的递归树形状。 */
export function Mg4RecurrenceDiagram() {
  return (
    <Frame
      ariaLabel="快排递归树对比图：端点枢纽形成链状平方树，均匀或随机枢纽形成较平衡的期望树，期望比较次数为n log n。"
      caption="同一个分区过程，枢纽秩的分布决定递归树；随机化把输入顺序的攻击性变成可分析的期望。"
    >
      <text
        x="360"
        y="30"
        textAnchor="middle"
        fontSize="17"
        fontWeight="700"
        fill={primary}
      >
        枢纽秩决定递归树
      </text>
      <text
        x="155"
        y="72"
        textAnchor="middle"
        fontSize="14"
        fontWeight="700"
        fill={danger}
      >
        端点枢纽
      </text>
      <text
        x="360"
        y="72"
        textAnchor="middle"
        fontSize="14"
        fontWeight="700"
        fill={warning}
      >
        中间枢纽
      </text>
      <text
        x="565"
        y="72"
        textAnchor="middle"
        fontSize="14"
        fontWeight="700"
        fill={success}
      >
        随机枢纽的期望
      </text>
      <line
        x1="155"
        y1="112"
        x2="155"
        y2="342"
        stroke={danger}
        strokeWidth="3"
      />
      {[0, 1, 2, 3, 4].map((index) => (
        <g key={`chain-${index}`}>
          <circle
            cx="155"
            cy={124 + index * 45}
            r="18"
            fill={danger}
            fillOpacity="0.18"
            stroke={danger}
          />
          <text
            x="155"
            y={129 + index * 45}
            textAnchor="middle"
            fontSize="12"
            fill={primary}
          >
            {8 - index}
          </text>
        </g>
      ))}
      <line
        x1="360"
        y1="116"
        x2="310"
        y2="194"
        stroke={warning}
        strokeWidth="2"
      />
      <line
        x1="360"
        y1="116"
        x2="410"
        y2="194"
        stroke={warning}
        strokeWidth="2"
      />
      <circle
        cx="360"
        cy="108"
        r="20"
        fill={warning}
        fillOpacity="0.2"
        stroke={warning}
      />
      <text x="360" y="113" textAnchor="middle" fontSize="12" fill={primary}>
        4
      </text>
      <circle
        cx="310"
        cy="204"
        r="18"
        fill={warning}
        fillOpacity="0.18"
        stroke={warning}
      />
      <circle
        cx="410"
        cy="204"
        r="18"
        fill={warning}
        fillOpacity="0.18"
        stroke={warning}
      />
      <text x="310" y="209" textAnchor="middle" fontSize="12" fill={primary}>
        2
      </text>
      <text x="410" y="209" textAnchor="middle" fontSize="12" fill={primary}>
        6
      </text>
      <line
        x1="565"
        y1="116"
        x2="520"
        y2="194"
        stroke={success}
        strokeWidth="2"
      />
      <line
        x1="565"
        y1="116"
        x2="610"
        y2="194"
        stroke={success}
        strokeWidth="2"
      />
      <circle
        cx="565"
        cy="108"
        r="20"
        fill={success}
        fillOpacity="0.2"
        stroke={success}
      />
      <text x="565" y="113" textAnchor="middle" fontSize="12" fill={primary}>
        j
      </text>
      <circle
        cx="520"
        cy="204"
        r="18"
        fill={success}
        fillOpacity="0.18"
        stroke={success}
      />
      <circle
        cx="610"
        cy="204"
        r="18"
        fill={success}
        fillOpacity="0.18"
        stroke={success}
      />
      <text x="520" y="209" textAnchor="middle" fontSize="12" fill={primary}>
        左
      </text>
      <text x="610" y="209" textAnchor="middle" fontSize="12" fill={primary}>
        右
      </text>
      <text x="155" y="378" textAnchor="middle" fontSize="13" fill={danger}>
        Θ(n²)
      </text>
      <text x="360" y="378" textAnchor="middle" fontSize="13" fill={warning}>
        分而治之
      </text>
      <text x="565" y="378" textAnchor="middle" fontSize="13" fill={success}>
        Θ(n log n)
      </text>
    </Frame>
  );
}

/** 展示固定元素对何时比较的充要条件与指示器计数。 */
export function Mg4IndicatorComparisonDiagram() {
  return (
    <Frame
      ariaLabel="指示器比较图：区间j到k中最先成为枢纽的是端点j或k时两元素比较，中间元素先成为枢纽则它们永久分开，概率为2除以k减j加1。"
      caption="把每一对比较编码成0/1变量，就能用期望的线性法则绕过比较事件之间的复杂依赖。"
    >
      <text
        x="360"
        y="30"
        textAnchor="middle"
        fontSize="17"
        fontWeight="700"
        fill={primary}
      >
        指示器：把比较变成 0 或 1
      </text>
      <text x="360" y="55" textAnchor="middle" fontSize="13" fill={secondary}>
        固定元素 j 与 k；区间长度为 k−j+1
      </text>
      {["j", "j+1", "…", "k−1", "k"].map((label, index) => {
        const x = 150 + index * 105;
        const endpoint = index === 0 || index === 4;
        return (
          <g key={`indicator-node-${label}`}>
            <circle
              cx={x}
              cy="140"
              r="27"
              fill={endpoint ? success : warning}
              fillOpacity="0.2"
              stroke={endpoint ? success : warning}
              strokeWidth="2"
            />
            <text
              x={x}
              y="146"
              textAnchor="middle"
              fontSize="16"
              fontWeight="700"
              fill={primary}
            >
              {label}
            </text>
          </g>
        );
      })}
      <Arrow x1={150} y1={182} x2={360} y2={238} color={success} />
      <Arrow x1={570} y1={182} x2={360} y2={238} color={success} />
      <rect
        x="224"
        y="242"
        width="272"
        height="54"
        rx="12"
        fill={success}
        fillOpacity="0.1"
        stroke={success}
      />
      <text
        x="360"
        y="276"
        textAnchor="middle"
        fontSize="15"
        fontWeight="700"
        fill={success}
      >
        Xj,k = 1：发生比较
      </text>
      <text x="360" y="326" textAnchor="middle" fontSize="14" fill={warning}>
        中间元素先成为枢纽 → Xj,k = 0
      </text>
      <text x="360" y="370" textAnchor="middle" fontSize="14" fill={accent}>
        E[Xj,k] = 2/(k−j+1)
      </text>
    </Frame>
  );
}

/** 对比输入分布平均与算法内部随机的适用范围。 */
export function Mg4RandomAlgorithmCompareDiagram() {
  return (
    <Frame
      ariaLabel="随机算法分析对比图：算法概率分析假设输入排列均匀，随机算法分析不假设输入分布而在固定输入上取算法随机选择的期望。"
      caption="输入平均与算法随机不是一回事；写清概率空间，才能知道期望结论对谁成立。"
    >
      <text
        x="360"
        y="30"
        textAnchor="middle"
        fontSize="17"
        fontWeight="700"
        fill={primary}
      >
        两种平均，两个概率空间
      </text>
      <rect
        x="44"
        y="88"
        width="286"
        height="224"
        rx="14"
        fill={warning}
        fillOpacity="0.08"
        stroke={warning}
        strokeWidth="2"
      />
      <text
        x="187"
        y="124"
        textAnchor="middle"
        fontSize="15"
        fontWeight="700"
        fill={warning}
      >
        普通快排
      </text>
      <text x="76" y="164" fontSize="13" fill={primary}>
        输入：n! 种排列
      </text>
      <text x="76" y="200" fontSize="13" fill={primary}>
        假设：均匀出现
      </text>
      <text
        x="187"
        y="256"
        textAnchor="middle"
        fontSize="16"
        fontWeight="700"
        fill={warning}
      >
        输入模型平均
      </text>
      <text x="187" y="286" textAnchor="middle" fontSize="13" fill={secondary}>
        固定算法 + 随机输入
      </text>
      <rect
        x="390"
        y="88"
        width="286"
        height="224"
        rx="14"
        fill={success}
        fillOpacity="0.08"
        stroke={success}
        strokeWidth="2"
      />
      <text
        x="533"
        y="124"
        textAnchor="middle"
        fontSize="15"
        fontWeight="700"
        fill={success}
      >
        随机快排
      </text>
      <text x="422" y="164" fontSize="13" fill={primary}>
        输入：任意固定序列
      </text>
      <text x="422" y="200" fontSize="13" fill={primary}>
        随机源：RANDOM(L,R)
      </text>
      <text
        x="533"
        y="256"
        textAnchor="middle"
        fontSize="16"
        fontWeight="700"
        fill={success}
      >
        算法内部平均
      </text>
      <text x="533" y="286" textAnchor="middle" fontSize="13" fill={secondary}>
        固定输入 + 随机算法
      </text>
      <Arrow x1={340} y1={200} x2={380} y2={200} color={accent} />
      <text x="360" y="362" textAnchor="middle" fontSize="14" fill={primary}>
        两者都可能得到 Θ(n log n)，但结论适用范围不同
      </text>
    </Frame>
  );
}

type PivotMode = "first" | "middle" | "random";

const pivotData: Record<
  PivotMode,
  { label: string; expected: string; note: string }
> = {
  first: {
    label: "固定最左",
    expected: "Θ(n²) 最坏",
    note: "有序输入持续产生端点枢纽",
  },
  middle: {
    label: "固定中间",
    expected: "Θ(n log n) 示例",
    note: "示例输入形成较平衡的递归树",
  },
  random: {
    label: "随机选择",
    expected: "Θ(n log n) 期望",
    note: "对任意固定输入平均化枢纽秩",
  },
};

/** 可重置的枢纽策略实验：比较固定和随机选择的分析对象。 */
export function Mg4QuickSortLab() {
  const [mode, setMode] = useState<PivotMode>("random");
  const current = pivotData[mode];
  return (
    <section
      className="not-prose my-6 rounded-card border border-border bg-elevated p-5"
      aria-label="快速排序枢纽实验"
    >
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="text-base font-semibold text-primary">
            QuickSort Pivot Lab
          </h3>
          <p className="mt-1 text-sm text-secondary">
            在同一输入上切换枢纽策略，观察平均对象从哪里来。
          </p>
        </div>
        <button
          type="button"
          onClick={() => setMode("random")}
          className="rounded-control border border-border px-3 py-2 text-xs text-secondary transition-colors hover:border-accent hover:text-primary"
        >
          重置实验
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {(Object.keys(pivotData) as PivotMode[]).map((key) => (
          <button
            key={key}
            type="button"
            onClick={() => setMode(key)}
            aria-pressed={mode === key}
            className={`rounded-control border px-4 py-2 text-sm transition-colors ${mode === key ? "border-accent text-accent" : "border-border text-secondary"}`}
          >
            {pivotData[key].label}
          </button>
        ))}
      </div>
      <div className="mt-4 grid gap-4 rounded-control border border-border p-4 sm:grid-cols-[1fr_auto] sm:items-center">
        <div>
          <p className="font-mono text-sm text-primary">
            当前策略：{current.label}
          </p>
          <p className="mt-2 text-sm text-accent">
            分析结论：{current.expected}
          </p>
          <p className="mt-1 text-sm text-secondary">{current.note}。</p>
        </div>
        <svg
          viewBox="0 0 220 120"
          role="img"
          aria-label={`${current.label}枢纽策略${current.expected}`}
          className="h-auto w-full max-w-[220px]"
        >
          <polyline
            points={
              mode === "first"
                ? "16,24 52,42 88,60 124,78 160,96 196,106"
                : mode === "middle"
                  ? "16,98 52,72 88,48 124,48 160,72 196,98"
                  : "16,88 52,56 88,34 124,42 160,60 196,78"
            }
            fill="none"
            stroke={
              mode === "first" ? danger : mode === "middle" ? warning : success
            }
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <text
            x="110"
            y="116"
            textAnchor="middle"
            fontSize="12"
            fill={secondary}
          >
            递归树形状示意
          </text>
        </svg>
      </div>
    </section>
  );
}
