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

/** 解集分类图：同一消元式的三种结果分别对应无解、无穷多解和唯一解。 */
export function Mg4MatrixEquationDiagram() {
  const cases = [
    { label: "0 = 1", note: "无解：平行", color: danger },
    { label: "0 = 0", note: "无穷多解：重合", color: warning },
    { label: "ad−bc ≠ 0", note: "唯一解：相交一点", color: success },
  ];
  return (
    <Frame
      ariaLabel="二元一次方程组的解集分类图：消元得到0等于1表示无解，0等于0表示无穷多解，ad减bc不等于0表示唯一解。"
      caption="消元的最后一行不是算术尾巴，而是解集分类的证据。"
    >
      <text
        x="360"
        y="34"
        textAnchor="middle"
        fontSize="17"
        fontWeight="700"
        fill={primary}
      >
        同一个方程组，三种解集
      </text>
      <text x="360" y="58" textAnchor="middle" fontSize="12" fill={secondary}>
        先比较方向，再解释消元留下的关系
      </text>
      {cases.map((item, index) => {
        const x = 48 + index * 224;
        const center = x + 104;
        return (
          <g key={item.label}>
            <rect
              x={x}
              y="92"
              width="208"
              height="252"
              rx="14"
              fill={item.color}
              fillOpacity="0.08"
              stroke={item.color}
              strokeWidth="2"
            />
            <text
              x={center}
              y="128"
              textAnchor="middle"
              fontSize="20"
              fontWeight="700"
              fill={item.color}
            >
              {item.label}
            </text>
            <text
              x={center}
              y="153"
              textAnchor="middle"
              fontSize="12"
              fill={primary}
            >
              {item.note}
            </text>
            <line
              x1={x + 30}
              y1="268"
              x2={x + 178}
              y2="268"
              stroke={border}
              strokeWidth="2"
            />
            {index === 0 ? (
              <>
                <line
                  x1={x + 30}
                  y1="220"
                  x2={x + 178}
                  y2="190"
                  stroke={danger}
                  strokeWidth="3"
                />
                <line
                  x1={x + 30}
                  y1="250"
                  x2={x + 178}
                  y2="220"
                  stroke={danger}
                  strokeWidth="3"
                />
              </>
            ) : null}
            {index === 1 ? (
              <>
                <line
                  x1={x + 30}
                  y1="235"
                  x2={x + 178}
                  y2="205"
                  stroke={warning}
                  strokeWidth="3"
                />
                <line
                  x1={x + 30}
                  y1="245"
                  x2={x + 178}
                  y2="215"
                  stroke={warning}
                  strokeWidth="3"
                />
              </>
            ) : null}
            {index === 2 ? (
              <>
                <line
                  x1={x + 30}
                  y1="250"
                  x2={x + 178}
                  y2="190"
                  stroke={success}
                  strokeWidth="3"
                />
                <line
                  x1={x + 30}
                  y1="190"
                  x2={x + 178}
                  y2="250"
                  stroke={accent}
                  strokeWidth="3"
                />
                <circle cx={center} cy="220" r="6" fill={primary} />
              </>
            ) : null}
            <text
              x={center}
              y="310"
              textAnchor="middle"
              fontSize="12"
              fill={secondary}
            >
              {index === 0
                ? "方向相同，常数冲突"
                : index === 1
                  ? "一个约束重复"
                  : "方向不同，交一点"}
            </text>
          </g>
        );
      })}
    </Frame>
  );
}

/** 行乘列图：把一个输出分量拆成两个乘积再相加。 */
export function Mg4RowColumnDiagram() {
  return (
    <Frame
      ariaLabel="矩阵乘向量的行乘列图：矩阵第一行与向量列相乘相加得到第一个输出，第二行得到第二个输出。"
      caption="左边每一行各自读取右边整列；输出向量的每个分量都有一条可追踪的路径。"
    >
      <text
        x="360"
        y="34"
        textAnchor="middle"
        fontSize="17"
        fontWeight="700"
        fill={primary}
      >
        Row-by-Column Trace
      </text>
      <text x="360" y="58" textAnchor="middle" fontSize="12" fill={secondary}>
        A 保存规则，x 提供输入，Ax 产生输出
      </text>
      <rect
        x="72"
        y="112"
        width="150"
        height="126"
        rx="10"
        fill={accent}
        fillOpacity="0.1"
        stroke={accent}
        strokeWidth="2"
      />
      <text
        x="147"
        y="101"
        textAnchor="middle"
        fontSize="14"
        fontWeight="700"
        fill={primary}
      >
        A
      </text>
      <text x="147" y="151" textAnchor="middle" fontSize="20" fill={primary}>
        a　b
      </text>
      <text x="147" y="196" textAnchor="middle" fontSize="20" fill={primary}>
        c　d
      </text>
      <rect
        x="290"
        y="112"
        width="86"
        height="126"
        rx="10"
        fill={warning}
        fillOpacity="0.1"
        stroke={warning}
        strokeWidth="2"
      />
      <text
        x="333"
        y="101"
        textAnchor="middle"
        fontSize="14"
        fontWeight="700"
        fill={primary}
      >
        x
      </text>
      <text x="333" y="151" textAnchor="middle" fontSize="20" fill={primary}>
        x
      </text>
      <text x="333" y="196" textAnchor="middle" fontSize="20" fill={primary}>
        y
      </text>
      <Arrow x1={224} y1={174} x2={280} y2={174} color={secondary} />
      <text x="252" y="153" textAnchor="middle" fontSize="11" fill={secondary}>
        按行读
      </text>
      <rect
        x="492"
        y="112"
        width="128"
        height="126"
        rx="10"
        fill={success}
        fillOpacity="0.1"
        stroke={success}
        strokeWidth="2"
      />
      <text
        x="556"
        y="101"
        textAnchor="middle"
        fontSize="14"
        fontWeight="700"
        fill={primary}
      >
        Ax
      </text>
      <text x="556" y="151" textAnchor="middle" fontSize="17" fill={primary}>
        ax + by
      </text>
      <text x="556" y="196" textAnchor="middle" fontSize="17" fill={primary}>
        cx + dy
      </text>
      <Arrow x1={386} y1={174} x2={482} y2={174} color={secondary} />
      <path
        d="M 96 276 C 160 252, 224 252, 300 276"
        fill="none"
        stroke={accent}
        strokeWidth="2"
        strokeDasharray="5 5"
      />
      <path
        d="M 96 300 C 190 274, 316 274, 512 300"
        fill="none"
        stroke={success}
        strokeWidth="2"
        strokeDasharray="5 5"
      />
      <text x="360" y="332" textAnchor="middle" fontSize="13" fill={primary}>
        每一行与右侧列做内积：a₁b₁ + a₂b₂
      </text>
      <text x="360" y="356" textAnchor="middle" fontSize="12" fill={secondary}>
        中间维数相同，外侧维数决定结果形状
      </text>
    </Frame>
  );
}

/** 展示 Q 矩阵幂中 Fibonacci 数字的移位模式。 */
export function Mg4FibonacciQDiagram() {
  const powers = [
    ["Q¹", "1  1", "1  0"],
    ["Q²", "2  1", "1  1"],
    ["Q³", "3  2", "2  1"],
    ["Q⁴", "5  3", "3  2"],
  ];
  return (
    <Frame
      ariaLabel="斐波那契Q矩阵幂的模式图：Q的一次到四次幂分别显示1、1、2、3、5的递推结构，Q的十次幂得到89、55、55、34。"
      caption="低次幂发现模式，归纳步骤解释模式为什么一直成立。"
    >
      <text
        x="360"
        y="34"
        textAnchor="middle"
        fontSize="17"
        fontWeight="700"
        fill={primary}
      >
        Power-Pattern Table：Q 的幂在移动 Fibonacci
      </text>
      <text x="360" y="58" textAnchor="middle" fontSize="12" fill={secondary}>
        Q = [[1, 1], [1, 0]]；每次右乘 Q 都把递推向前推进
      </text>
      {powers.map((power, index) => {
        const x = 55 + index * 152;
        return (
          <g key={power[0]}>
            <rect
              x={x}
              y="102"
              width="124"
              height="142"
              rx="12"
              fill={accent}
              fillOpacity={index === 3 ? "0.18" : "0.08"}
              stroke={index === 3 ? success : accent}
              strokeWidth="2"
            />
            <text
              x={x + 62}
              y="130"
              textAnchor="middle"
              fontSize="16"
              fontWeight="700"
              fill={index === 3 ? success : primary}
            >
              {power[0]}
            </text>
            <text
              x={x + 62}
              y="176"
              textAnchor="middle"
              fontSize="18"
              fill={primary}
            >
              {power[1]}
            </text>
            <text
              x={x + 62}
              y="214"
              textAnchor="middle"
              fontSize="18"
              fill={primary}
            >
              {power[2]}
            </text>
            {index < powers.length - 1 ? (
              <Arrow
                x1={x + 130}
                y1={172}
                x2={x + 146}
                y2={172}
                color={secondary}
              />
            ) : null}
          </g>
        );
      })}
      <rect
        x="110"
        y="286"
        width="500"
        height="70"
        rx="12"
        fill={success}
        fillOpacity="0.1"
        stroke={success}
      />
      <text
        x="360"
        y="315"
        textAnchor="middle"
        fontSize="15"
        fontWeight="700"
        fill={success}
      >
        Qⁿ = [[Fₙ₊₁, Fₙ], [Fₙ, Fₙ₋₁]]
      </text>
      <text x="360" y="340" textAnchor="middle" fontSize="13" fill={primary}>
        Q¹⁰ = [[89, 55], [55, 34]]
      </text>
    </Frame>
  );
}

/** 用基向量的像展示非奇异与塌缩两种线性变换。 */
export function Mg4LinearTransformDiagram() {
  return (
    <Frame
      ariaLabel="线性变换图：非奇异矩阵把两个基向量变成不共线的两列，奇异矩阵把平面压到一条直线，行列式塌缩为零。"
      caption="两列决定整个变换；行列式为零意味着至少丢失一个方向。"
    >
      <text
        x="360"
        y="34"
        textAnchor="middle"
        fontSize="17"
        fontWeight="700"
        fill={primary}
      >
        Basis-Image Grid：看两列的去向
      </text>
      <text x="360" y="58" textAnchor="middle" fontSize="12" fill={secondary}>
        同一个原点，det ≠ 0 保留面积；det = 0 发生塌缩
      </text>
      <g transform="translate(74 94)">
        <rect
          x="0"
          y="0"
          width="236"
          height="236"
          rx="12"
          fill={accent}
          fillOpacity="0.05"
          stroke={border}
        />
        {[40, 80, 120, 160, 200].map((n) => (
          <line
            key={`l-${n}`}
            x1={n}
            y1="18"
            x2={n}
            y2="218"
            stroke={border}
            strokeOpacity="0.5"
          />
        ))}
        {[40, 80, 120, 160, 200].map((n) => (
          <line
            key={`h-${n}`}
            x1="18"
            y1={n}
            x2="218"
            y2={n}
            stroke={border}
            strokeOpacity="0.5"
          />
        ))}
        <line
          x1="118"
          y1="118"
          x2="196"
          y2="62"
          stroke={success}
          strokeWidth="4"
        />
        <line
          x1="118"
          y1="118"
          x2="82"
          y2="42"
          stroke={warning}
          strokeWidth="4"
        />
        <circle cx="118" cy="118" r="5" fill={primary} />
        <text
          x="118"
          y="254"
          textAnchor="middle"
          fontSize="13"
          fontWeight="700"
          fill={success}
        >
          det ≠ 0：平面仍有面积
        </text>
        <text
          x="118"
          y="274"
          textAnchor="middle"
          fontSize="12"
          fill={secondary}
        >
          e₁、e₂ 的像不共线
        </text>
      </g>
      <g transform="translate(410 94)">
        <rect
          x="0"
          y="0"
          width="236"
          height="236"
          rx="12"
          fill={danger}
          fillOpacity="0.05"
          stroke={border}
        />
        {[40, 80, 120, 160, 200].map((n) => (
          <line
            key={`l-${n}`}
            x1={n}
            y1="18"
            x2={n}
            y2="218"
            stroke={border}
            strokeOpacity="0.5"
          />
        ))}
        {[40, 80, 120, 160, 200].map((n) => (
          <line
            key={`h-${n}`}
            x1="18"
            y1={n}
            x2="218"
            y2={n}
            stroke={border}
            strokeOpacity="0.5"
          />
        ))}
        <line
          x1="118"
          y1="118"
          x2="198"
          y2="78"
          stroke={danger}
          strokeWidth="4"
        />
        <line
          x1="118"
          y1="118"
          x2="38"
          y2="158"
          stroke={danger}
          strokeWidth="4"
        />
        <circle cx="118" cy="118" r="5" fill={primary} />
        <text
          x="118"
          y="254"
          textAnchor="middle"
          fontSize="13"
          fontWeight="700"
          fill={danger}
        >
          det = 0：平面被压扁
        </text>
        <text
          x="118"
          y="274"
          textAnchor="middle"
          fontSize="12"
          fill={secondary}
        >
          两列共线，出现奇异矩阵
        </text>
      </g>
      <text x="360" y="382" textAnchor="middle" fontSize="13" fill={primary}>
        Ax = b：寻找映射到 b 的原像
      </text>
    </Frame>
  );
}

/** 展示旋转矩阵如何把基向量送到新位置，以及旋转的复合。 */
export function Mg4RotationDiagram() {
  return (
    <Frame
      ariaLabel="旋转矩阵图：基向量e1和e2经过角度theta旋转到两列，行列式为1，三次旋转120度回到单位矩阵。"
      caption="旋转不塌缩面积；矩阵乘法记录先旋转谁、再旋转谁。"
    >
      <text
        x="360"
        y="34"
        textAnchor="middle"
        fontSize="17"
        fontWeight="700"
        fill={primary}
      >
        Rotation Map：Rθ 的两列
      </text>
      <text x="360" y="58" textAnchor="middle" fontSize="12" fill={secondary}>
        e₁ → (cosθ, sinθ)，e₂ → (−sinθ, cosθ)
      </text>
      <g transform="translate(360 222)">
        <circle
          cx="0"
          cy="0"
          r="116"
          fill={accent}
          fillOpacity="0.04"
          stroke={border}
        />
        <line x1="-138" y1="0" x2="138" y2="0" stroke={border} />
        <line x1="0" y1="-138" x2="0" y2="138" stroke={border} />
        <line x1="0" y1="0" x2="94" y2="0" stroke={secondary} strokeWidth="3" />
        <line
          x1="0"
          y1="0"
          x2="0"
          y2="-94"
          stroke={secondary}
          strokeWidth="3"
        />
        <Arrow x1={0} y1={0} x2={54} y2={-78} color={accent} />
        <Arrow x1={0} y1={0} x2={78} y2={54} color={success} />
        <path
          d="M 52 0 A 52 52 0 0 0 28 -44"
          fill="none"
          stroke={warning}
          strokeWidth="3"
        />
        <text x="104" y="8" fontSize="13" fill={secondary}>
          e₁
        </text>
        <text x="8" y="-104" fontSize="13" fill={secondary}>
          e₂
        </text>
        <text x="58" y="-62" fontSize="13" fontWeight="700" fill={accent}>
          Rθe₁
        </text>
        <text x="82" y="72" fontSize="13" fontWeight="700" fill={success}>
          Rθe₂
        </text>
        <text x="35" y="-20" fontSize="13" fill={warning}>
          θ
        </text>
      </g>
      <rect
        x="90"
        y="96"
        width="188"
        height="54"
        rx="10"
        fill={success}
        fillOpacity="0.1"
        stroke={success}
      />
      <text
        x="184"
        y="119"
        textAnchor="middle"
        fontSize="13"
        fontWeight="700"
        fill={success}
      >
        det Rθ = 1
      </text>
      <text x="184" y="139" textAnchor="middle" fontSize="12" fill={primary}>
        永远可逆
      </text>
      <rect
        x="442"
        y="96"
        width="188"
        height="54"
        rx="10"
        fill={warning}
        fillOpacity="0.1"
        stroke={warning}
      />
      <text
        x="536"
        y="119"
        textAnchor="middle"
        fontSize="13"
        fontWeight="700"
        fill={warning}
      >
        R₂π/₃³ = I
      </text>
      <text x="536" y="139" textAnchor="middle" fontSize="12" fill={primary}>
        旋转三次回原位
      </text>
    </Frame>
  );
}

type LabMode = "unique" | "many" | "collapse";

const labModes: Record<
  LabMode,
  {
    label: string;
    determinant: string;
    result: string;
    color: string;
    detail: string;
  }
> = {
  unique: {
    label: "唯一解",
    determinant: "3",
    result: "原像只有一个",
    color: success,
    detail: "A = [[2, 1], [1, 2]]",
  },
  many: {
    label: "无穷多解",
    determinant: "0",
    result: "同一直线上的原像",
    color: warning,
    detail: "A = [[2, 4], [1, 2]]",
  },
  collapse: {
    label: "塌缩变换",
    determinant: "0",
    result: "部分 b 没有原像",
    color: danger,
    detail: "A = [[1, 2], [2, 4]]",
  },
};

/** 可重置的单章实验：切换行列式状态，观察解集和变换解释。 */
export function Mg4MatrixLab() {
  const [mode, setMode] = useState<LabMode>("unique");
  const current = labModes[mode];
  return (
    <section
      className="not-prose my-6 rounded-card border border-border bg-elevated p-5"
      aria-label="矩阵状态实验"
    >
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="text-base font-semibold text-primary">
            Matrix State Lab
          </h3>
          <p className="mt-1 text-sm text-secondary">
            切换系数矩阵，观察 det、原像和解集如何一起改变。
          </p>
        </div>
        <button
          type="button"
          onClick={() => setMode("unique")}
          className="rounded-control border border-border px-3 py-2 text-xs text-secondary transition-colors hover:border-accent hover:text-primary"
        >
          重置实验
        </button>
      </div>
      <div className="grid gap-3 sm:grid-cols-3">
        {(Object.keys(labModes) as LabMode[]).map((key) => {
          const item = labModes[key];
          const selected = key === mode;
          return (
            <button
              key={key}
              type="button"
              onClick={() => setMode(key)}
              aria-pressed={selected}
              className={`rounded-control border px-3 py-3 text-left text-sm transition-colors ${selected ? "border-accent" : "border-border"}`}
            >
              <span className="font-semibold" style={{ color: item.color }}>
                {item.label}
              </span>
              <span className="mt-1 block text-xs text-secondary">
                det A = {item.determinant}
              </span>
            </button>
          );
        })}
      </div>
      <div className="mt-4 grid gap-4 rounded-control border border-border p-4 sm:grid-cols-[1fr_auto] sm:items-center">
        <div>
          <p className="font-mono text-sm text-primary">{current.detail}</p>
          <p className="mt-2 text-sm" style={{ color: current.color }}>
            {current.result}
          </p>
          <p className="mt-1 text-xs text-secondary">
            det A = {current.determinant}；
            {mode === "unique"
              ? "两列不共线，Ax=b 可左乘 A⁻¹。"
              : "两列共线，A⁻¹ 不存在。"}
          </p>
        </div>
        <svg
          viewBox="0 0 180 120"
          role="img"
          aria-label={`${current.label}的矩阵变换示意`}
          className="h-auto w-full max-w-[180px]"
        >
          <line x1="12" y1="96" x2="168" y2="96" stroke={border} />
          <line x1="24" y1="108" x2="24" y2="12" stroke={border} />
          {mode === "unique" ? (
            <>
              <path
                d="M24 96 L122 46 L150 82 L52 112 Z"
                fill={success}
                fillOpacity="0.16"
                stroke={success}
                strokeWidth="2"
              />
              <line
                x1="24"
                y1="96"
                x2="122"
                y2="46"
                stroke={success}
                strokeWidth="2"
              />
              <line
                x1="24"
                y1="96"
                x2="52"
                y2="112"
                stroke={accent}
                strokeWidth="2"
              />
            </>
          ) : (
            <>
              <line
                x1="24"
                y1="96"
                x2="150"
                y2="34"
                stroke={current.color}
                strokeWidth="4"
              />
              <line
                x1="24"
                y1="96"
                x2="100"
                y2="58"
                stroke={current.color}
                strokeWidth="2"
                strokeDasharray="4 4"
              />
            </>
          )}
        </svg>
      </div>
    </section>
  );
}
