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
  return (
    <g>
      <line
        x1={x1}
        y1={y1}
        x2={x2 - 10}
        y2={y2}
        stroke={color}
        strokeWidth="1.6"
      />
      <polygon
        points={`${x2},${y2} ${x2 - 10},${y2 - 5} ${x2 - 10},${y2 + 5}`}
        fill={color}
      />
    </g>
  );
}

/** 总览图：把连续与离散的变化算子、自然基底和逆向求和连在一起。 */
export function Mg1DifferentiationDiagram() {
  return (
    <Frame
      ariaLabel="微分与差分总览：连续世界用步长趋近零的极限，离散世界用单位邻点差；普通幂对应下降阶乘幂，指数方程对应 e 的 x 次方与 2 的 x 次方。"
      caption="不是把符号硬搬过去，而是保留变化算子的结构。"
    >
      <text
        x="360"
        y="32"
        textAnchor="middle"
        fontSize="16"
        fontWeight="700"
        fill={primary}
      >
        两个世界，同一份变化问题
      </text>
      <text x="360" y="56" textAnchor="middle" fontSize="12" fill={secondary}>
        先声明基本尺度，再选择让公式自然降阶的表示
      </text>
      <rect
        x="38"
        y="88"
        width="274"
        height="118"
        rx="10"
        fill={accent}
        fillOpacity="0.08"
        stroke={accent}
      />
      <text
        x="175"
        y="118"
        textAnchor="middle"
        fontSize="14"
        fontWeight="700"
        fill={accent}
      >
        连续世界
      </text>
      <text x="175" y="146" textAnchor="middle" fontSize="12" fill={primary}>
        h → 0 的差商极限
      </text>
      <text x="175" y="172" textAnchor="middle" fontSize="11" fill={secondary}>
        D xⁿ = n xⁿ⁻¹
      </text>
      <text x="175" y="192" textAnchor="middle" fontSize="11" fill={secondary}>
        D eˣ = eˣ
      </text>
      <rect
        x="408"
        y="88"
        width="274"
        height="118"
        rx="10"
        fill={success}
        fillOpacity="0.08"
        stroke={success}
      />
      <text
        x="545"
        y="118"
        textAnchor="middle"
        fontSize="14"
        fontWeight="700"
        fill={success}
      >
        离散世界
      </text>
      <text x="545" y="146" textAnchor="middle" fontSize="12" fill={primary}>
        单位邻点 f(x+1)−f(x)
      </text>
      <text x="545" y="172" textAnchor="middle" fontSize="11" fill={secondary}>
        Δ x下划n = n x下划n−1
      </text>
      <text x="545" y="192" textAnchor="middle" fontSize="11" fill={secondary}>
        Δ 2ˣ = 2ˣ
      </text>
      <Arrow x1={320} y1={147} x2={400} y2={147} color={warning} />
      <text x="360" y="132" textAnchor="middle" fontSize="11" fill={warning}>
        结构翻译
      </text>
      <rect
        x="62"
        y="250"
        width="596"
        height="108"
        rx="10"
        fill={warning}
        fillOpacity="0.06"
        stroke={border}
      />
      <text
        x="360"
        y="279"
        textAnchor="middle"
        fontSize="13"
        fontWeight="700"
        fill={warning}
      >
        自然对象的选择
      </text>
      <text x="360" y="305" textAnchor="middle" fontSize="11" fill={primary}>
        普通幂 xⁿ → 下降阶乘幂 x(x−1)…(x−n+1)
      </text>
      <text x="360" y="329" textAnchor="middle" fontSize="11" fill={primary}>
        积分 → 望远镜求和；算子方程 → 初值递推
      </text>
      <text x="360" y="349" textAnchor="middle" fontSize="11" fill={secondary}>
        两侧不相同，但可用同一份结构验收
      </text>
      <text
        x="360"
        y="394"
        textAnchor="middle"
        fontSize="12"
        fontWeight="700"
        fill={accent}
      >
        对应字典：抽取结构 → 选择基底 → 作用算子 → 核对初值
      </text>
    </Frame>
  );
}

/** 静态图：并置连续差商和离散邻点差，突出基本尺度。 */
export function Mg1DifferentiationDiagramDetail() {
  return (
    <Frame
      ariaLabel="连续差商与离散差分对照图：连续输入从 x 到 x 加 h 并令 h 趋近于零，离散输入从 x 到 x 加 1，两个输出变化分别形成导数和差分。"
      caption="连续世界压缩步长，离散世界固定邻点。"
    >
      <text
        x="360"
        y="32"
        textAnchor="middle"
        fontSize="16"
        fontWeight="700"
        fill={primary}
      >
        先看输入尺度，后算变化率
      </text>
      <line
        x1="70"
        y1="172"
        x2="314"
        y2="172"
        stroke={accent}
        strokeWidth="2"
      />
      <circle cx="118" cy="172" r="7" fill={accent} />
      <circle cx="265" cy="172" r="7" fill={accent} />
      <text x="118" y="151" textAnchor="middle" fontSize="12" fill={primary}>
        x
      </text>
      <text x="265" y="151" textAnchor="middle" fontSize="12" fill={primary}>
        x+h
      </text>
      <text x="192" y="204" textAnchor="middle" fontSize="11" fill={accent}>
        h → 0
      </text>
      <text
        x="192"
        y="232"
        textAnchor="middle"
        fontSize="12"
        fontWeight="700"
        fill={accent}
      >
        Df = lim Δf / h
      </text>
      <line
        x1="406"
        y1="172"
        x2="650"
        y2="172"
        stroke={success}
        strokeWidth="2"
      />
      <circle cx="454" cy="172" r="7" fill={success} />
      <circle cx="601" cy="172" r="7" fill={success} />
      <text x="454" y="151" textAnchor="middle" fontSize="12" fill={primary}>
        x
      </text>
      <text x="601" y="151" textAnchor="middle" fontSize="12" fill={primary}>
        x+1
      </text>
      <text x="528" y="204" textAnchor="middle" fontSize="11" fill={success}>
        固定一步
      </text>
      <text
        x="528"
        y="232"
        textAnchor="middle"
        fontSize="12"
        fontWeight="700"
        fill={success}
      >
        Δf = f(x+1) − f(x)
      </text>
      <rect
        x="74"
        y="286"
        width="572"
        height="74"
        rx="9"
        fill={warning}
        fillOpacity="0.07"
        stroke={border}
      />
      <text
        x="360"
        y="314"
        textAnchor="middle"
        fontSize="12.5"
        fontWeight="700"
        fill={warning}
      >
        同一个问题：输入改变后，输出改变多少？
      </text>
      <text x="360" y="339" textAnchor="middle" fontSize="11" fill={secondary}>
        不同的基本尺度要求不同的算子；先比较结构，不要把差分降格成粗糙导数
      </text>
    </Frame>
  );
}

type FunctionMode = "linear" | "square" | "falling";
type OperatorMode = "derivative" | "difference";

/** 交互实验：在同一函数上切换微分、差分和离散自然基底。 */
export function Mg1DifferenceLab() {
  const [functionMode, setFunctionMode] = useState<FunctionMode>("square");
  const [operator, setOperator] = useState<OperatorMode>("derivative");
  const [x, setX] = useState(2);
  const value =
    functionMode === "linear"
      ? x
      : functionMode === "square"
        ? x * x
        : x * (x - 1);
  const nextValue =
    functionMode === "linear"
      ? x + 1
      : functionMode === "square"
        ? (x + 1) * (x + 1)
        : (x + 1) * x;
  const result =
    operator === "derivative"
      ? functionMode === "linear"
        ? 1
        : functionMode === "square"
          ? 2 * x
          : 2 * x - 1
      : nextValue - value;
  const label =
    functionMode === "linear"
      ? "x"
      : functionMode === "square"
        ? "x²"
        : "x 下划 2";
  const maxBar = Math.max(1, Math.abs(result));

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div
        data-visual-kind="differentiation-difference-lab"
        className="overflow-hidden rounded-card border border-border bg-elevated p-5"
      >
        <div className="mb-4 flex flex-wrap items-center justify-center gap-2">
          {(["linear", "square", "falling"] as FunctionMode[]).map((item) => (
            <button
              key={item}
              type="button"
              aria-pressed={functionMode === item}
              onClick={() => setFunctionMode(item)}
              className={`min-h-11 rounded-full border px-4 py-2 text-sm ${functionMode === item ? "border-accent bg-accent/10 text-accent" : "border-border text-secondary"}`}
            >
              {item === "linear"
                ? "x"
                : item === "square"
                  ? "x²"
                  : "下降阶乘幂"}
            </button>
          ))}
          {(["derivative", "difference"] as OperatorMode[]).map((item) => (
            <button
              key={item}
              type="button"
              aria-pressed={operator === item}
              onClick={() => setOperator(item)}
              className={`min-h-11 rounded-full border px-4 py-2 text-sm ${operator === item ? "border-success bg-success/10 text-success" : "border-border text-secondary"}`}
            >
              {item === "derivative" ? "微分" : "差分"}
            </button>
          ))}
          {[1, 2, 3].map((item) => (
            <button
              key={item}
              type="button"
              aria-pressed={x === item}
              onClick={() => setX(item)}
              className={`min-h-11 rounded-full border px-3 py-2 text-sm ${x === item ? "border-warning bg-warning/10 text-warning" : "border-border text-secondary"}`}
            >
              x={item}
            </button>
          ))}
          <button
            type="button"
            onClick={() => {
              setFunctionMode("square");
              setOperator("derivative");
              setX(2);
            }}
            className="min-h-11 rounded-full border border-border px-4 py-2 text-sm text-secondary"
          >
            重置
          </button>
        </div>
        <svg
          viewBox="0 0 720 330"
          role="img"
          aria-label={`变化算子实验：函数 ${label}，x=${x}，当前使用${operator === "derivative" ? "微分" : "差分"}，函数值为 ${value}，结果为 ${result}。`}
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text
            x="360"
            y="28"
            textAnchor="middle"
            fontSize="16"
            fontWeight="700"
            fill={primary}
          >
            同一函数，不同的基本尺度
          </text>
          <text
            x="360"
            y="52"
            textAnchor="middle"
            fontSize="12"
            fill={secondary}
          >
            {label} 在 x={x} 处：f(x)={value}，f(x+1)={nextValue}
          </text>
          <rect
            x="70"
            y="90"
            width="230"
            height="108"
            rx="9"
            fill={accent}
            fillOpacity="0.07"
            stroke={accent}
          />
          <text
            x="185"
            y="120"
            textAnchor="middle"
            fontSize="13"
            fontWeight="700"
            fill={accent}
          >
            函数值
          </text>
          <text
            x="185"
            y="155"
            textAnchor="middle"
            fontSize="22"
            fontWeight="700"
            fill={primary}
          >
            {value}
          </text>
          <text
            x="185"
            y="181"
            textAnchor="middle"
            fontSize="11"
            fill={secondary}
          >
            输入点 x={x}
          </text>
          <rect
            x="420"
            y="90"
            width="230"
            height="108"
            rx="9"
            fill={operator === "derivative" ? success : warning}
            fillOpacity="0.09"
            stroke={operator === "derivative" ? success : warning}
          />
          <text
            x="535"
            y="120"
            textAnchor="middle"
            fontSize="13"
            fontWeight="700"
            fill={operator === "derivative" ? success : warning}
          >
            {operator === "derivative" ? "微分" : "差分"}
          </text>
          <text
            x="535"
            y="155"
            textAnchor="middle"
            fontSize="22"
            fontWeight="700"
            fill={primary}
          >
            {result}
          </text>
          <text
            x="535"
            y="181"
            textAnchor="middle"
            fontSize="11"
            fill={secondary}
          >
            {operator === "derivative" ? "局部极限变化率" : "单位邻点变化"}
          </text>
          <Arrow
            x1={310}
            y1={144}
            x2={410}
            y2={144}
            color={operator === "derivative" ? success : warning}
          />
          <line
            x1="78"
            y1="250"
            x2="642"
            y2="250"
            stroke={border}
            strokeWidth="1.5"
          />
          <rect
            x="105"
            y="250"
            width="150"
            height={Math.min(78, (Math.abs(value) / Math.max(1, value)) * 78)}
            fill={accent}
            fillOpacity="0.25"
          />
          <rect
            x="445"
            y="250"
            width="150"
            height={Math.min(78, (Math.abs(result) / maxBar) * 78)}
            fill={operator === "derivative" ? success : warning}
            fillOpacity="0.3"
          />
          <text
            x="180"
            y="284"
            textAnchor="middle"
            fontSize="11"
            fill={primary}
          >
            f(x)
          </text>
          <text
            x="520"
            y="284"
            textAnchor="middle"
            fontSize="11"
            fill={primary}
          >
            算子结果
          </text>
          <text
            x="360"
            y="314"
            textAnchor="middle"
            fontSize="11"
            fill={secondary}
          >
            切换到下降阶乘幂并选择差分，观察二次项的额外 1 如何消失
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        交互实验把“选择自然基底”的理由落到可计算的数值对照上。
      </figcaption>
    </figure>
  );
}

/** 静态图：显示普通幂和下降阶乘幂的差分对照。 */
export function Mg1FallingFactorialDiagram() {
  return (
    <Frame
      ariaLabel="下降阶乘幂图：普通平方 x² 的差分是 2x 加 1，而下降阶乘幂 x(x减1) 的差分是 2x；三次下降阶乘幂继续按阶数降阶。"
      caption="相邻因子相差 1，让平移后的公因式显现。"
    >
      <text
        x="360"
        y="32"
        textAnchor="middle"
        fontSize="16"
        fontWeight="700"
        fill={primary}
      >
        差分的自然基底
      </text>
      <text x="360" y="56" textAnchor="middle" fontSize="12" fill={secondary}>
        普通幂保留高次项，下降阶乘幂保留降阶结构
      </text>
      <rect
        x="46"
        y="92"
        width="286"
        height="196"
        rx="10"
        fill={danger}
        fillOpacity="0.07"
        stroke={danger}
      />
      <text
        x="189"
        y="122"
        textAnchor="middle"
        fontSize="14"
        fontWeight="700"
        fill={danger}
      >
        普通幂
      </text>
      <text x="189" y="160" textAnchor="middle" fontSize="14" fill={primary}>
        Δ x² = 2x + 1
      </text>
      <text x="189" y="192" textAnchor="middle" fontSize="12" fill={secondary}>
        平移后留下额外常数
      </text>
      <text x="189" y="232" textAnchor="middle" fontSize="14" fill={primary}>
        Δ x³ = 3x² + 3x + 1
      </text>
      <text x="189" y="264" textAnchor="middle" fontSize="11" fill={danger}>
        不是最整齐的离散基底
      </text>
      <rect
        x="388"
        y="92"
        width="286"
        height="196"
        rx="10"
        fill={success}
        fillOpacity="0.07"
        stroke={success}
      />
      <text
        x="531"
        y="122"
        textAnchor="middle"
        fontSize="14"
        fontWeight="700"
        fill={success}
      >
        下降阶乘幂
      </text>
      <text x="531" y="160" textAnchor="middle" fontSize="14" fill={primary}>
        Δ x下划2 = 2x
      </text>
      <text x="531" y="192" textAnchor="middle" fontSize="12" fill={secondary}>
        公因式相同，额外项消失
      </text>
      <text x="531" y="232" textAnchor="middle" fontSize="14" fill={primary}>
        Δ x下划3 = 3x下划2
      </text>
      <text x="531" y="264" textAnchor="middle" fontSize="11" fill={success}>
        一般式：Δ x下划n = n x下划(n−1)
      </text>
      <Arrow x1={340} y1={190} x2={380} y2={190} color={warning} />
      <text
        x="360"
        y="333"
        textAnchor="middle"
        fontSize="12.5"
        fontWeight="700"
        fill={warning}
      >
        换基底不是补丁，而是对齐平移结构
      </text>
      <text x="360" y="356" textAnchor="middle" fontSize="11" fill={secondary}>
        代数提公因式与组合分类共同验证系数 n 的来源
      </text>
    </Frame>
  );
}

/** 静态图：并置连续指数和离散指数的特征方程。 */
export function Mg1ExponentialCorrespondenceDiagram() {
  const points = [
    [74, 270],
    [136, 242],
    [198, 210],
    [260, 164],
    [322, 112],
  ];
  return (
    <Frame
      ariaLabel="指数对应图：连续方程 Df等于f 且初值为1 导出 e 的 x 次方；离散方程 差分 E 等于 E 且初值为1 导出 2 的 x 次方。"
      caption="对应关系保留算子方程和初值，不追求底数外观相同。"
    >
      <text
        x="360"
        y="32"
        textAnchor="middle"
        fontSize="16"
        fontWeight="700"
        fill={primary}
      >
        保持不变的指数对象
      </text>
      <text x="360" y="56" textAnchor="middle" fontSize="12" fill={secondary}>
        连续用极限，离散用一步递推；两边都从初值 1 出发
      </text>
      <line x1="70" y1="292" x2="330" y2="292" stroke={border} />
      <line x1="70" y1="292" x2="70" y2="88" stroke={border} />
      <path
        d="M74 270 C130 250 174 224 214 194 C254 160 288 124 322 100"
        fill="none"
        stroke={accent}
        strokeWidth="3"
      />
      <text
        x="200"
        y="315"
        textAnchor="middle"
        fontSize="12"
        fontWeight="700"
        fill={accent}
      >
        Df = f，f(0)=1 → eˣ
      </text>
      <line x1="394" y1="292" x2="650" y2="292" stroke={border} />
      <line x1="394" y1="292" x2="394" y2="88" stroke={border} />
      {points.map(([cx, cy]) => (
        <circle
          key={`${cx}-${cy}`}
          cx={cx + 338}
          cy={cy}
          r="7"
          fill={success}
        />
      ))}
      <line
        x1="412"
        y1="270"
        x2="458"
        y2="242"
        stroke={success}
        strokeWidth="2"
      />
      <line
        x1="474"
        y1="242"
        x2="520"
        y2="210"
        stroke={success}
        strokeWidth="2"
      />
      <line
        x1="536"
        y1="210"
        x2="582"
        y2="164"
        stroke={success}
        strokeWidth="2"
      />
      <line
        x1="598"
        y1="164"
        x2="644"
        y2="112"
        stroke={success}
        strokeWidth="2"
      />
      <text
        x="522"
        y="315"
        textAnchor="middle"
        fontSize="12"
        fontWeight="700"
        fill={success}
      >
        ΔE = E，E(0)=1 → 2ˣ
      </text>
      <rect
        x="102"
        y="350"
        width="516"
        height="40"
        rx="8"
        fill={warning}
        fillOpacity="0.07"
        stroke={border}
      />
      <text x="360" y="375" textAnchor="middle" fontSize="11" fill={secondary}>
        若 ΔE=cE，则 E(x+1)=(1+c)E(x)，离散增长因子由一步递推决定
      </text>
    </Frame>
  );
}

/** 静态图：把差分项逐项抵消，留下望远镜求和的端点。 */
export function Mg1TelescopingDiagram() {
  const terms = [
    { label: "F(a+1)", x: 82, color: success },
    { label: "−F(a)", x: 188, color: danger },
    { label: "F(a+2)", x: 294, color: success },
    { label: "−F(a+1)", x: 400, color: danger },
    { label: "…", x: 506, color: secondary },
    { label: "F(b)−F(b−1)", x: 588, color: success },
  ];
  return (
    <Frame
      ariaLabel="望远镜求和图：相邻差分项相加后，中间的 F(a加1) 到 F(b减1) 逐项正负抵消，只剩 F(b) 减 F(a)。"
      caption="差分的逆运算由端点决定：中间项消失，边界值留下。"
    >
      <text
        x="360"
        y="32"
        textAnchor="middle"
        fontSize="16"
        fontWeight="700"
        fill={primary}
      >
        把每一步变化加起来
      </text>
      <text x="360" y="56" textAnchor="middle" fontSize="12" fill={secondary}>
        Σ [F(k+1) − F(k)]，从 k=a 到 b−1
      </text>
      {terms.map((term) => (
        <g key={term.label}>
          <rect
            x={term.x}
            y="112"
            width={term.label === "F(b)−F(b−1)" ? 116 : 92}
            height="52"
            rx="7"
            fill={term.color}
            fillOpacity="0.1"
            stroke={term.color}
          />
          <text
            x={term.x + (term.label === "F(b)−F(b−1)" ? 58 : 46)}
            y="144"
            textAnchor="middle"
            fontSize="11"
            fill={term.color}
          >
            {term.label}
          </text>
        </g>
      ))}
      <line
        x1="188"
        y1="182"
        x2="494"
        y2="182"
        stroke={danger}
        strokeWidth="3"
      />
      <text x="341" y="207" textAnchor="middle" fontSize="11" fill={danger}>
        中间项正负抵消
      </text>
      <rect
        x="88"
        y="254"
        width="544"
        height="86"
        rx="9"
        fill={accent}
        fillOpacity="0.07"
        stroke={accent}
      />
      <text
        x="360"
        y="284"
        textAnchor="middle"
        fontSize="14"
        fontWeight="700"
        fill={accent}
      >
        剩下：F(b) − F(a)
      </text>
      <text x="360" y="311" textAnchor="middle" fontSize="11" fill={primary}>
        Σᵏ⁼ᵇ⁻¹ [F(k+1)−F(k)] = F(b)−F(a)
      </text>
      <text x="360" y="329" textAnchor="middle" fontSize="11" fill={secondary}>
        边界值负责恢复差分丢掉的常数信息
      </text>
      <text
        x="360"
        y="378"
        textAnchor="middle"
        fontSize="12.5"
        fontWeight="700"
        fill={warning}
      >
        连续积分与离散求和共享同一份端点直觉
      </text>
    </Frame>
  );
}

/** 总结图：把四个结构判断组成可重复的转换流程。 */
export function Mg1OperatorDiagram() {
  const steps = [
    { title: "抽取结构", detail: "降阶 · 特征 · 端点", color: accent },
    { title: "选择对象", detail: "邻点 · 基底 · 初值", color: warning },
    { title: "作用算子", detail: "微分 · 差分 · 求和", color: success },
    { title: "双向回验", detail: "代数 · 组合 · 边界", color: danger },
  ];
  return (
    <Frame
      ariaLabel="对应字典流程图：抽取连续结构，选择离散自然对象，作用变化算子，最后用代数、组合和边界值双向回验。"
      caption="结构转换不是猜公式，而是一条有输入、有算子、有回验的证明流程。"
    >
      <text
        x="360"
        y="32"
        textAnchor="middle"
        fontSize="16"
        fontWeight="700"
        fill={primary}
      >
        在两个世界中往返的旅行
      </text>
      <text x="360" y="56" textAnchor="middle" fontSize="12" fill={secondary}>
        先问保持什么，再问如何计算
      </text>
      {steps.map((step, index) => {
        const x = 30 + index * 174;
        return (
          <g key={step.title}>
            <rect
              x={x}
              y="104"
              width="148"
              height="102"
              rx="9"
              fill={step.color}
              fillOpacity="0.09"
              stroke={step.color}
            />
            <text
              x={x + 74}
              y="137"
              textAnchor="middle"
              fontSize="13"
              fontWeight="700"
              fill={step.color}
            >
              {step.title}
            </text>
            <text
              x={x + 74}
              y="166"
              textAnchor="middle"
              fontSize="11"
              fill={primary}
            >
              {step.detail}
            </text>
            {index < steps.length - 1 ? (
              <Arrow x1={x + 151} y1={155} x2={x + 169} y2={155} />
            ) : null}
          </g>
        );
      })}
      <rect
        x="62"
        y="254"
        width="596"
        height="100"
        rx="10"
        fill={accent}
        fillOpacity="0.06"
        stroke={border}
      />
      <text
        x="360"
        y="284"
        textAnchor="middle"
        fontSize="13"
        fontWeight="700"
        fill={accent}
      >
        验收问题
      </text>
      <text x="360" y="310" textAnchor="middle" fontSize="11" fill={primary}>
        步长是什么？自然基底是什么？初值是什么？边界如何恢复？
      </text>
      <text x="360" y="335" textAnchor="middle" fontSize="11" fill={secondary}>
        若连续与离散给出不同答案，先检查尺度、表示和边界，而不是抹掉差异
      </text>
      <text
        x="360"
        y="388"
        textAnchor="middle"
        fontSize="12"
        fontWeight="700"
        fill={warning}
      >
        可迁移的不是符号，而是经过证明的结构
      </text>
    </Frame>
  );
}
