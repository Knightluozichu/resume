"use client";

import { useState } from "react";

const accent = "var(--accent)";
const success = "var(--success)";
const warning = "var(--warning)";
const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";

function OmegaFrame({
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

/**
 * 交互式主图：按步查看 1、ω、ω² 的三步旋转，并用重置按钮恢复首帧。
 */
export function MglOmegaReadingDiagram() {
  const [step, setStep] = useState(0);
  const roots = [
    { label: "1", value: "z₀ = 1", x: 262, y: 220, angle: "0" },
    { label: "ω", value: "z₁ = ω", x: 112, y: 90, angle: "2π/3" },
    { label: "ω²", value: "z₂ = ω²", x: 112, y: 350, angle: "4π/3" },
  ];
  const current = roots[step];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <div className="mb-4 flex flex-wrap items-center justify-center gap-2">
          <button
            type="button"
            onClick={() => setStep((value) => Math.max(0, value - 1))}
            className="rounded-full border border-border px-3 py-1 text-sm text-secondary"
          >
            上一步
          </button>
          <button
            type="button"
            onClick={() => setStep((value) => Math.min(2, value + 1))}
            className="rounded-full border border-accent bg-accent/10 px-3 py-1 text-sm text-accent"
          >
            下一步
          </button>
          <button
            type="button"
            onClick={() => setStep(0)}
            className="rounded-full border border-border px-3 py-1 text-sm text-secondary"
          >
            重置
          </button>
          <span className="text-xs text-secondary">第 {step + 1} / 3 步</span>
        </div>
        <svg
          viewBox="0 0 720 420"
          role="img"
          aria-label={`三次单位根交互图：当前显示 ${current.value}，辐角为 ${current.angle}；三个点构成单位圆上的正三角形。`}
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
            ω 的华尔兹：每次转 120°，三步回到起点
          </text>
          <circle
            cx="190"
            cy="220"
            r="130"
            fill="none"
            stroke={border}
            strokeWidth="2"
          />
          <line x1="48" y1="220" x2="332" y2="220" stroke={border} />
          <line x1="190" y1="78" x2="190" y2="362" stroke={border} />
          <path
            d="M262 220 L112 90 L112 350 Z"
            fill={accent}
            fillOpacity="0.06"
            stroke={accent}
            strokeOpacity="0.55"
            strokeWidth="2"
          />
          <line
            x1="190"
            y1="220"
            x2={current.x}
            y2={current.y}
            stroke={warning}
            strokeWidth="4"
          />
          {roots.map((root, index) => (
            <g key={root.value}>
              <circle
                cx={root.x}
                cy={root.y}
                r={index === step ? 11 : 7}
                fill={index === step ? warning : success}
                fillOpacity={index === step ? 1 : 0.75}
                stroke={primary}
                strokeWidth={index === step ? 2 : 1}
              />
              <text
                x={root.x + (root.x > 200 ? 18 : -18)}
                y={root.y + (root.y > 300 ? 6 : -14)}
                textAnchor={root.x > 200 ? "start" : "end"}
                fontSize="13"
                fontWeight="700"
                fill={index === step ? warning : primary}
              >
                {root.label}
              </text>
            </g>
          ))}
          <text
            x="190"
            y="394"
            textAnchor="middle"
            fontSize="12"
            fill={secondary}
          >
            模长恒为 1 · 乘以 ω 就沿三角形移动一格
          </text>

          <rect
            x="390"
            y="78"
            width="280"
            height="284"
            rx="12"
            fill={accent}
            fillOpacity="0.07"
            stroke={accent}
            strokeOpacity="0.45"
          />
          <text x="420" y="112" fontSize="14" fontWeight="700" fill={accent}>
            当前状态
          </text>
          <text
            x="420"
            y="152"
            fontSize="24"
            fontFamily="monospace"
            fontWeight="700"
            fill={primary}
          >
            {current.value}
          </text>
          <text x="420" y="184" fontSize="13" fill={primary}>
            辐角：{current.angle}
          </text>
          <text x="420" y="212" fontSize="13" fill={primary}>
            模长：1
          </text>
          <line x1="420" y1="236" x2="640" y2="236" stroke={border} />
          <text x="420" y="266" fontSize="13" fill={success}>
            ω³ = 1
          </text>
          <text x="420" y="294" fontSize="13" fill={success}>
            ω⁻¹ = ω²
          </text>
          <text x="420" y="322" fontSize="13" fill={success}>
            ω² = 共轭 ω
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        用“下一步”把代数幂次和几何转角同步起来；状态可逆，重置后从 1 重新开始。
      </figcaption>
    </figure>
  );
}

export function MglVibrationRotationDiagram() {
  return (
    <OmegaFrame
      ariaLabel="振动与旋转图。左侧单位圆上的点沿圆周运动，右侧将同一个点的实部投影成余弦波、虚部投影成正弦波，说明二维旋转与一维振动是同一运动的两种观察。"
      caption="旋转点的横纵坐标分别成为余弦与正弦；投影不是新运动，而是同一轨迹的两个读法。"
    >
      <text
        x="360"
        y="30"
        textAnchor="middle"
        fontSize="16"
        fontWeight="700"
        fill={primary}
      >
        一个圆周运动，两个方向的振动
      </text>
      <circle
        cx="150"
        cy="210"
        r="92"
        fill="none"
        stroke={border}
        strokeWidth="2"
      />
      <line x1="46" y1="210" x2="254" y2="210" stroke={border} />
      <line x1="150" y1="106" x2="150" y2="314" stroke={border} />
      <line
        x1="150"
        y1="210"
        x2="216"
        y2="146"
        stroke={accent}
        strokeWidth="3"
      />
      <circle cx="216" cy="146" r="8" fill={warning} />
      <line
        x1="216"
        y1="146"
        x2="216"
        y2="210"
        stroke={warning}
        strokeDasharray="5 4"
      />
      <line
        x1="216"
        y1="146"
        x2="150"
        y2="146"
        stroke={success}
        strokeDasharray="5 4"
      />
      <text x="150" y="344" textAnchor="middle" fontSize="12" fill={secondary}>
        z = cos θ + i sin θ
      </text>
      <text x="194" y="136" fontSize="12" fill={success}>
        实部 cos θ
      </text>
      <text x="222" y="170" fontSize="12" fill={warning}>
        虚部 sin θ
      </text>

      <line
        x1="310"
        y1="72"
        x2="310"
        y2="358"
        stroke={border}
        strokeDasharray="4 4"
      />
      <text
        x="502"
        y="72"
        textAnchor="middle"
        fontSize="13"
        fontWeight="700"
        fill={accent}
      >
        投影后的振动
      </text>
      <line x1="352" y1="150" x2="660" y2="150" stroke={border} />
      <path
        d="M352 150 C382 88 412 88 442 150 S502 212 532 150 S592 88 622 150 S652 212 660 150"
        fill="none"
        stroke={success}
        strokeWidth="3"
      />
      <text x="352" y="128" fontSize="12" fill={success}>
        实部：cos θ
      </text>
      <line x1="352" y1="278" x2="660" y2="278" stroke={border} />
      <path
        d="M352 278 C382 340 412 340 442 278 S502 216 532 278 S592 340 622 278 S652 216 660 278"
        fill="none"
        stroke={warning}
        strokeWidth="3"
      />
      <text x="352" y="256" fontSize="12" fill={warning}>
        虚部：sin θ
      </text>
      <text x="506" y="374" textAnchor="middle" fontSize="12" fill={secondary}>
        相差四分之一周期，但由同一个角度 θ 驱动
      </text>
    </OmegaFrame>
  );
}

export function MglComplexRootsDiagram() {
  return (
    <OmegaFrame
      ariaLabel="复数与三次单位根图。左侧展示 x 的三次方等于 1 的因式分解，右侧展示 1、ω、ω² 在单位圆上构成正三角形，并标注模长 1 和辐角 0、2π/3、4π/3。"
      caption="代数因式分解枚举三个根，几何正三角形检查它们等距、模长相同且不重不漏。"
    >
      <text
        x="360"
        y="30"
        textAnchor="middle"
        fontSize="16"
        fontWeight="700"
        fill={primary}
      >
        x³ = 1：方程的根也有几何位置
      </text>
      <rect
        x="48"
        y="82"
        width="264"
        height="250"
        rx="12"
        fill={accent}
        fillOpacity="0.07"
        stroke={accent}
        strokeOpacity="0.45"
      />
      <text x="76" y="118" fontSize="14" fontWeight="700" fill={accent}>
        代数路径
      </text>
      <text x="76" y="158" fontSize="17" fontFamily="monospace" fill={primary}>
        x³ − 1 = 0
      </text>
      <text x="76" y="194" fontSize="17" fontFamily="monospace" fill={primary}>
        (x−1)(x²+x+1)=0
      </text>
      <text x="76" y="236" fontSize="13" fill={success}>
        x = 1
      </text>
      <text x="76" y="264" fontSize="13" fill={success}>
        x = ω = −1/2 + √3 i/2
      </text>
      <text x="76" y="292" fontSize="13" fill={success}>
        x = ω² = −1/2 − √3 i/2
      </text>
      <text x="76" y="322" fontSize="12" fill={secondary}>
        三个根，不把角度分支重复计数
      </text>

      <circle
        cx="510"
        cy="204"
        r="112"
        fill="none"
        stroke={border}
        strokeWidth="2"
      />
      <line x1="378" y1="204" x2="642" y2="204" stroke={border} />
      <line x1="510" y1="72" x2="510" y2="336" stroke={border} />
      <path
        d="M622 204 L454 107 L454 301 Z"
        fill={accent}
        fillOpacity="0.08"
        stroke={accent}
        strokeWidth="2"
      />
      <circle cx="622" cy="204" r="8" fill={warning} />
      <circle cx="454" cy="107" r="8" fill={success} />
      <circle cx="454" cy="301" r="8" fill={success} />
      <text x="642" y="198" fontSize="13" fontWeight="700" fill={warning}>
        1 · 0
      </text>
      <text
        x="420"
        y="98"
        textAnchor="end"
        fontSize="13"
        fontWeight="700"
        fill={success}
      >
        ω · 2π/3
      </text>
      <text
        x="420"
        y="316"
        textAnchor="end"
        fontSize="13"
        fontWeight="700"
        fill={success}
      >
        ω² · 4π/3
      </text>
      <text x="510" y="374" textAnchor="middle" fontSize="12" fill={secondary}>
        |1| = |ω| = |ω²| = 1
      </text>
    </OmegaFrame>
  );
}

export function MglPeriodSymmetryDiagram() {
  return (
    <OmegaFrame
      ariaLabel="周期与对称图。上方显示 ω 的幂按余数 0、1、2 循环为 1、ω、ω²；下方显示三个单位根向量相加为零，说明正三角形的对称抵消。"
      caption="周期负责回答“什么时候回到原状态”，对称负责解释“为什么三个方向的总和为零”。"
    >
      <text
        x="360"
        y="30"
        textAnchor="middle"
        fontSize="16"
        fontWeight="700"
        fill={primary}
      >
        周期和对称：余数循环，向量抵消
      </text>
      <text x="74" y="78" fontSize="13" fontWeight="700" fill={accent}>
        幂次按 n mod 3 循环
      </text>
      <line
        x1="88"
        y1="142"
        x2="620"
        y2="142"
        stroke={border}
        strokeWidth="2"
      />
      {[
        [112, "n=0", "1"],
        [224, "n=1", "ω"],
        [336, "n=2", "ω²"],
        [448, "n=3", "1"],
        [560, "n=4", "ω"],
      ].map(([x, label, value]) => (
        <g key={`${label}-${value}`}>
          <circle cx={Number(x)} cy="142" r="7" fill={success} />
          <text
            x={Number(x)}
            y="112"
            textAnchor="middle"
            fontSize="12"
            fill={secondary}
          >
            {label}
          </text>
          <text
            x={Number(x)}
            y="176"
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill={primary}
          >
            {value}
          </text>
        </g>
      ))}
      <text x="74" y="224" fontSize="13" fontWeight="700" fill={accent}>
        对称和
      </text>
      <line x1="78" y1="314" x2="312" y2="314" stroke={border} />
      <line
        x1="195"
        y1="314"
        x2="108"
        y2="260"
        stroke={success}
        strokeWidth="3"
      />
      <line
        x1="195"
        y1="314"
        x2="282"
        y2="260"
        stroke={warning}
        strokeWidth="3"
      />
      <line
        x1="195"
        y1="314"
        x2="195"
        y2="198"
        stroke={accent}
        strokeWidth="3"
      />
      <circle cx="195" cy="314" r="6" fill={primary} />
      <text x="195" y="350" textAnchor="middle" fontSize="12" fill={primary}>
        1 + ω + ω² = 0
      </text>
      <text x="390" y="252" fontSize="13" fill={primary}>
        乘以 ω 会循环置换三个向量
      </text>
      <text x="390" y="282" fontSize="13" fill={primary}>
        总和若不为零，旋转后却必须保持不变
      </text>
      <text x="390" y="312" fontSize="13" fill={success}>
        唯一不变的和：0
      </text>
      <text x="390" y="350" fontSize="12" fill={secondary}>
        最小正周期是 3；对称把代数结论变成几何直觉
      </text>
    </OmegaFrame>
  );
}
