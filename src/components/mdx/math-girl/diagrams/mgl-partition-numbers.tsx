"use client";

import { useState } from "react";

const accent = "var(--accent)";
const success = "var(--success)";
const warning = "var(--warning)";
const danger = "var(--danger)";
const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";

function PartitionFrame({
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

/** 主图：切换小整数，观察分拆对象与 P_n 的计数如何变化。 */
export function MglPartitionCountingDiagram() {
  const [n, setN] = useState(5);
  const partitions: Record<number, string[]> = {
    4: ["4", "3+1", "2+2", "2+1+1", "1+1+1+1"],
    5: ["5", "4+1", "3+2", "3+1+1", "2+2+1", "2+1+1+1", "1+1+1+1+1"],
    6: [
      "6",
      "5+1",
      "4+2",
      "4+1+1",
      "3+3",
      "3+2+1",
      "3+1+1+1",
      "2+2+2",
      "2+2+1+1",
      "2+1+1+1+1",
      "1+1+1+1+1+1",
    ],
    7: [
      "7",
      "6+1",
      "5+2",
      "5+1+1",
      "4+3",
      "4+2+1",
      "4+1+1+1",
      "3+3+1",
      "3+2+2",
      "3+2+1+1",
      "3+1+1+1+1",
      "2+2+2+1",
      "2+2+1+1+1",
      "2+1+1+1+1+1",
      "1+1+1+1+1+1+1",
    ],
  };
  const active = partitions[n];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <div className="mb-4 flex flex-wrap items-center justify-center gap-2">
          <button
            type="button"
            onClick={() => setN((value) => Math.max(4, value - 1))}
            className="rounded-full border border-border px-3 py-1 text-sm text-secondary"
          >
            n − 1
          </button>
          <button
            type="button"
            onClick={() => setN((value) => Math.min(7, value + 1))}
            className="rounded-full border border-accent bg-accent/10 px-3 py-1 text-sm text-accent"
          >
            n + 1
          </button>
          <button
            type="button"
            onClick={() => setN(5)}
            className="rounded-full border border-border px-3 py-1 text-sm text-secondary"
          >
            重置
          </button>
          <span className="text-xs text-secondary">当前 n = {n}</span>
        </div>
        <svg
          viewBox="0 0 720 420"
          role="img"
          aria-label={`整数 ${n} 的分拆数与硬币支付图。P0等于1与小规模枚举从空分拆开始，忽略加数顺序后共有 ${active.length} 种分拆，当前显示每一种加法结构。`}
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text
            x="360"
            y="30"
            textAnchor="middle"
            fontSize="16"
            fontWeight="700"
            fill={primary}
          >
            分拆数：换硬币顺序，不会得到新方法
          </text>
          <text x="80" y="68" fontSize="13" fill={accent}>
            支付 {n} 元：每一行是一个无序分拆
          </text>
          <rect
            x="64"
            y="86"
            width="386"
            height="276"
            rx="12"
            fill={accent}
            fillOpacity="0.06"
            stroke={accent}
            strokeOpacity="0.45"
          />
          {active.map((item, index) => {
            const column = index % 2;
            const row = Math.floor(index / 2);
            return (
              <g key={item}>
                <circle
                  cx={92 + column * 184}
                  cy={116 + row * 30}
                  r="5"
                  fill={success}
                />
                <text
                  x={108 + column * 184}
                  y={121 + row * 30}
                  fontSize="13"
                  fill={primary}
                >
                  {item}
                </text>
              </g>
            );
          })}
          <rect
            x="486"
            y="86"
            width="174"
            height="276"
            rx="12"
            fill={success}
            fillOpacity="0.07"
            stroke={success}
            strokeOpacity="0.45"
          />
          <text
            x="573"
            y="126"
            textAnchor="middle"
            fontSize="14"
            fontWeight="700"
            fill={success}
          >
            计数结果
          </text>
          <text
            x="573"
            y="182"
            textAnchor="middle"
            fontSize="30"
            fontWeight="700"
            fill={primary}
          >
            P₍{n}₎ = {active.length}
          </text>
          <text
            x="573"
            y="228"
            textAnchor="middle"
            fontSize="12"
            fill={secondary}
          >
            1+4 与 4+1 是同一行
          </text>
          <text
            x="573"
            y="258"
            textAnchor="middle"
            fontSize="12"
            fill={secondary}
          >
            P₀ = 1：空分拆
          </text>
          <line x1="520" y1="286" x2="626" y2="286" stroke={border} />
          <text
            x="573"
            y="318"
            textAnchor="middle"
            fontSize="12"
            fill={warning}
          >
            顺序若重要，问题就变了
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        点击调整 n；计数对象固定为无序加法，重置回到 n=5 的七种分拆。
      </figcaption>
    </figure>
  );
}

export function MglPartitionGeneratingDiagram() {
  return (
    <PartitionFrame
      ariaLabel="整数分拆的乘法重数表示、有限硬币模型与系数计数、无限项和的无限项积、分拆数的生成函数图。左侧展示面值 1、2、3 的选择因子，乘法路径汇聚到 x 的次数；右侧展示 P(x) 等于各因子乘积，并高亮 x 的五次方系数统计 5 的七种分拆。"
      caption="每个因子选择一种面值的使用次数，指数相加成为总金额，系数则数出达到该金额的路径。"
    >
      <text
        x="360"
        y="30"
        textAnchor="middle"
        fontSize="16"
        fontWeight="700"
        fill={primary}
      >
        选择次数 → 指数相加 → 系数计数
      </text>
      <text x="72" y="72" fontSize="13" fontWeight="700" fill={accent}>
        面值因子
      </text>
      <rect
        x="54"
        y="92"
        width="190"
        height="62"
        rx="10"
        fill={success}
        fillOpacity="0.08"
        stroke={success}
      />
      <text
        x="149"
        y="130"
        textAnchor="middle"
        fontSize="16"
        fontFamily="monospace"
        fill={primary}
      >
        1 + x + x² + …
      </text>
      <text x="72" y="178" fontSize="12" fill={secondary}>
        1 元可取 0、1、2…枚
      </text>
      <rect
        x="54"
        y="204"
        width="190"
        height="62"
        rx="10"
        fill={warning}
        fillOpacity="0.08"
        stroke={warning}
      />
      <text
        x="149"
        y="242"
        textAnchor="middle"
        fontSize="16"
        fontFamily="monospace"
        fill={primary}
      >
        1 + x² + x⁴ + …
      </text>
      <text x="72" y="290" fontSize="12" fill={secondary}>
        2 元的贡献是偶数次
      </text>
      <rect
        x="54"
        y="316"
        width="190"
        height="62"
        rx="10"
        fill={accent}
        fillOpacity="0.08"
        stroke={accent}
      />
      <text
        x="149"
        y="354"
        textAnchor="middle"
        fontSize="16"
        fontFamily="monospace"
        fill={primary}
      >
        1 + x³ + x⁶ + …
      </text>

      <line
        x1="270"
        y1="122"
        x2="346"
        y2="208"
        stroke={border}
        strokeWidth="2"
      />
      <line
        x1="270"
        y1="234"
        x2="346"
        y2="234"
        stroke={border}
        strokeWidth="2"
      />
      <line
        x1="270"
        y1="346"
        x2="346"
        y2="260"
        stroke={border}
        strokeWidth="2"
      />
      <text x="309" y="195" textAnchor="middle" fontSize="12" fill={secondary}>
        乘法原理
      </text>
      <rect
        x="346"
        y="164"
        width="326"
        height="138"
        rx="12"
        fill={accent}
        fillOpacity="0.08"
        stroke={accent}
        strokeOpacity="0.55"
      />
      <text
        x="509"
        y="202"
        textAnchor="middle"
        fontSize="15"
        fontWeight="700"
        fill={accent}
      >
        P(x) = ∏ 1/(1−xᵏ)
      </text>
      <text
        x="509"
        y="238"
        textAnchor="middle"
        fontSize="14"
        fontFamily="monospace"
        fill={primary}
      >
        [x⁵] P(x) = 7
      </text>
      <text x="509" y="274" textAnchor="middle" fontSize="12" fill={success}>
        5 的系数 = 5、4+1、3+2 …
      </text>
      <text x="360" y="390" textAnchor="middle" fontSize="12" fill={secondary}>
        固定 [xⁿ] 时，面值 k&gt;n 的因子只能贡献常数项 1
      </text>
    </PartitionFrame>
  );
}

export function MglPartitionInjectionDiagram() {
  return (
    <PartitionFrame
      ariaLabel="斐波那契上界、按最小部件分组的单射、数学归纳法完成全称证明、精确计数与上界证明的区别图。将 k 加 2 的分拆按最小部件分成三类：最小部件为 1 映射到 k 加 1，最小部件为 2 或至少为 3 映射到 k，并显示用可逆记录恢复原分拆。"
      caption="单射只要求每个左侧对象有不同的右侧去处；它解释为什么 P₍k+2₎ 不超过 P₍k+1₎ 加 Pₖ。"
    >
      <text
        x="360"
        y="30"
        textAnchor="middle"
        fontSize="16"
        fontWeight="700"
        fill={primary}
      >
        按最小部件分组：把每个分拆送到不重复的去处
      </text>
      <rect
        x="50"
        y="72"
        width="220"
        height="284"
        rx="12"
        fill={accent}
        fillOpacity="0.07"
        stroke={accent}
        strokeOpacity="0.45"
      />
      <text
        x="160"
        y="108"
        textAnchor="middle"
        fontSize="14"
        fontWeight="700"
        fill={accent}
      >
        P₍k+2₎ 的分拆
      </text>
      <text x="76" y="154" fontSize="13" fill={success}>
        A：最小部件 1
      </text>
      <text x="76" y="180" fontSize="12" fill={primary}>
        删掉一个 1 → P₍k+1₎
      </text>
      <text x="76" y="224" fontSize="13" fill={warning}>
        B：最小部件 2
      </text>
      <text x="76" y="250" fontSize="12" fill={primary}>
        删掉一个 2 → Pₖ
      </text>
      <text x="76" y="294" fontSize="13" fill={danger}>
        C：最小部件 m≥3
      </text>
      <text x="76" y="320" fontSize="12" fill={primary}>
        替换、删 2、记录 1 的个数 → Pₖ
      </text>
      <line
        x1="292"
        y1="164"
        x2="394"
        y2="136"
        stroke={success}
        strokeWidth="3"
      />
      <line
        x1="292"
        y1="236"
        x2="394"
        y2="236"
        stroke={warning}
        strokeWidth="3"
      />
      <line
        x1="292"
        y1="306"
        x2="394"
        y2="300"
        stroke={danger}
        strokeWidth="3"
      />
      <text x="344" y="112" textAnchor="middle" fontSize="12" fill={secondary}>
        可逆映射
      </text>
      <rect
        x="394"
        y="72"
        width="276"
        height="284"
        rx="12"
        fill={success}
        fillOpacity="0.07"
        stroke={success}
        strokeOpacity="0.45"
      />
      <text
        x="532"
        y="108"
        textAnchor="middle"
        fontSize="14"
        fontWeight="700"
        fill={success}
      >
        不相撞的右侧集合
      </text>
      <text x="424" y="166" fontSize="14" fill={primary}>
        P₍k+1₎：A 的去处
      </text>
      <text x="424" y="226" fontSize="14" fill={primary}>
        Pₖ：B 与 C 的去处
      </text>
      <line x1="424" y1="254" x2="640" y2="254" stroke={border} />
      <text x="532" y="286" textAnchor="middle" fontSize="13" fill={success}>
        两类有可检查的区别
      </text>
      <text x="532" y="316" textAnchor="middle" fontSize="12" fill={secondary}>
        B 没有 1，C 用 1 的个数恢复 m
      </text>
    </PartitionFrame>
  );
}

export function MglPartitionBoundDiagram() {
  return (
    <PartitionFrame
      ariaLabel="生成函数的系数上界、取对数把积变为和、负对数的泰勒展开、巴塞尔和控制东边森林、辅助参数最优化与指数平方根上界图。左侧对比斐波那契上界与精确值，右侧展示 g(t)=n/t+π²t/6 的曲线、最优参数 t 星号和指数平方根上界。"
      caption="先用便宜的斐波那契界完成小目标，再用生成函数和参数最优化获得更紧的增长界。"
    >
      <text
        x="360"
        y="30"
        textAnchor="middle"
        fontSize="16"
        fontWeight="700"
        fill={primary}
      >
        上界不是通项：目标不同，界的工具也不同
      </text>
      <rect
        x="48"
        y="78"
        width="246"
        height="264"
        rx="12"
        fill={success}
        fillOpacity="0.07"
        stroke={success}
        strokeOpacity="0.45"
      />
      <text
        x="171"
        y="116"
        textAnchor="middle"
        fontSize="14"
        fontWeight="700"
        fill={success}
      >
        小目标：P₁₅ &lt; 1000
      </text>
      <text x="76" y="164" fontSize="13" fill={primary}>
        精确值：P₁₅ = 176
      </text>
      <text x="76" y="202" fontSize="13" fill={warning}>
        斐波那契界：P₁₅ ≤ F₁₆ = 987
      </text>
      <line x1="76" y1="232" x2="254" y2="232" stroke={border} />
      <text x="171" y="270" textAnchor="middle" fontSize="13" fill={secondary}>
        987 已足够证明小于 1000
      </text>
      <text x="171" y="306" textAnchor="middle" fontSize="12" fill={secondary}>
        不必为每个分拆逐项计数
      </text>

      <line
        x1="330"
        y1="80"
        x2="330"
        y2="354"
        stroke={border}
        strokeDasharray="4 4"
      />
      <text
        x="500"
        y="76"
        textAnchor="middle"
        fontSize="13"
        fontWeight="700"
        fill={accent}
      >
        参数优化：g(t)=n/t+π²t/6
      </text>
      <line x1="370" y1="300" x2="660" y2="300" stroke={border} />
      <line x1="392" y1="104" x2="392" y2="324" stroke={border} />
      <path
        d="M396 126 C432 166 450 220 492 246 C528 268 564 210 604 150 C624 122 644 104 660 96"
        fill="none"
        stroke={accent}
        strokeWidth="3"
      />
      <circle cx="520" cy="258" r="8" fill={warning} />
      <line
        x1="520"
        y1="258"
        x2="520"
        y2="300"
        stroke={warning}
        strokeDasharray="4 4"
      />
      <text x="520" y="330" textAnchor="middle" fontSize="12" fill={warning}>
        t* = √(6n)/π
      </text>
      <text x="420" y="122" fontSize="12" fill={secondary}>
        t 太小：n/t 很大
      </text>
      <text x="574" y="224" fontSize="12" fill={secondary}>
        t 太大：π²t/6 很大
      </text>
      <text x="500" y="370" textAnchor="middle" fontSize="13" fill={success}>
        log Pₙ &lt; π√(2n/3) → Pₙ &lt; exp(π√(2n/3))
      </text>
    </PartitionFrame>
  );
}
