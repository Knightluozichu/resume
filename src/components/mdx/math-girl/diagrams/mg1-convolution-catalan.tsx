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
  color = border,
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
        strokeWidth="2"
      />
      <polygon
        points={`${x2},${y2} ${x2 - 10},${y2 - 5} ${x2 - 10},${y2 + 5}`}
        fill={color}
      />
    </g>
  );
}

function Card({
  x,
  y,
  width,
  height,
  title,
  detail,
  color,
}: {
  x: number;
  y: number;
  width: number;
  height: number;
  title: string;
  detail: string;
  color: string;
}) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        rx="12"
        fill={color}
        fillOpacity="0.08"
        stroke={color}
        strokeOpacity="0.65"
      />
      <text
        x={x + width / 2}
        y={y + 31}
        textAnchor="middle"
        fontSize="14"
        fontWeight="700"
        fill={color}
      >
        {title}
      </text>
      <text
        x={x + width / 2}
        y={y + 59}
        textAnchor="middle"
        fontSize="11"
        fill={primary}
      >
        {detail}
      </text>
    </g>
  );
}

/** 总览图：将树结构的分类、卷积、生成函数和路径反射放在一条证据链上。 */
export function Mg1CatalanDiagram() {
  return (
    <Frame
      ariaLabel="卡塔兰卷积总览图：括号结构按最后一次加法拆成左右子树，得到卷积递推，再由生成函数和格路径反射互证封闭式。"
      caption="一个结构，四种语言：树、卷积、生成函数和合法路径。"
    >
      <text
        x="360"
        y="32"
        textAnchor="middle"
        fontSize="16"
        fontWeight="700"
        fill={primary}
      >
        卡塔兰数：从括号树走到封闭式
      </text>
      <text x="360" y="58" textAnchor="middle" fontSize="12" fill={secondary}>
        最后一次分类 → 先相乘后相加 → 系数提取 → 反射坏路径
      </text>
      <Card
        x={52}
        y={98}
        width={146}
        height={88}
        title="括号树"
        detail="左右子结构独立"
        color={accent}
      />
      <Card
        x={214}
        y={98}
        width={146}
        height={88}
        title="卷积"
        detail="Σ CₖCₙ₋ₖ"
        color={warning}
      />
      <Card
        x={376}
        y={98}
        width={146}
        height={88}
        title="生成函数"
        detail="C=1+xC²"
        color={success}
      />
      <Card
        x={538}
        y={98}
        width={130}
        height={88}
        title="路径"
        detail="反射坏路径"
        color={danger}
      />
      <Arrow x1={202} y1={142} x2={204} y2={142} color={border} />
      <Arrow x1={364} y1={142} x2={366} y2={142} color={border} />
      <Arrow x1={526} y1={142} x2={528} y2={142} color={border} />
      <line
        x1="360"
        y1="204"
        x2="360"
        y2="246"
        stroke={border}
        strokeWidth="2"
      />
      <polygon points="360,258 354,246 366,246" fill={border} />
      <rect
        x="98"
        y="274"
        width="524"
        height="72"
        rx="12"
        fill={danger}
        fillOpacity="0.07"
        stroke={danger}
      />
      <text
        x="360"
        y="303"
        textAnchor="middle"
        fontSize="14"
        fontWeight="700"
        fill={danger}
      >
        Cₙ = 1/(n+1) · binom(2n,n)
      </text>
      <text x="360" y="328" textAnchor="middle" fontSize="12" fill={primary}>
        生成函数的合法分支与路径的合法前缀给出同一个计数
      </text>
      <text x="360" y="382" textAnchor="middle" fontSize="12" fill={secondary}>
        结构分类负责递推，边界约束负责封闭式
      </text>
    </Frame>
  );
}

function catalan(n: number) {
  const values = [1, 1, 2, 5, 14, 42, 132];
  return values[n] ?? 0;
}

/** 交互实验：改变 n，逐项显示卡塔兰卷积与下一项的吻合。 */
export function Mg1CatalanLab() {
  const [n, setN] = useState(3);
  const pairs = Array.from({ length: n + 1 }, (_, index) => ({
    left: catalan(index),
    right: catalan(n - index),
    product: catalan(index) * catalan(n - index),
  }));
  const sum = pairs.reduce((total, pair) => total + pair.product, 0);

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div
        data-visual-kind="catalan-convolution-lab"
        className="overflow-hidden rounded-card border border-border bg-elevated p-5"
      >
        <div className="mb-4 flex flex-wrap items-center justify-center gap-2">
          {Array.from({ length: 6 }, (_, value) => (
            <button
              key={value}
              type="button"
              aria-pressed={n === value}
              onClick={() => setN(value)}
              className={`min-h-11 min-w-11 rounded-full border px-3 py-2 text-sm ${n === value ? "border-accent bg-accent/10 text-accent" : "border-border text-secondary"}`}
            >
              n={value}
            </button>
          ))}
          <button
            type="button"
            onClick={() => setN(3)}
            className="min-h-11 rounded-full border border-border px-4 py-2 text-sm text-secondary"
          >
            重置实验
          </button>
        </div>
        <div className="grid gap-3 md:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-xl border border-border p-4">
            <p className="m-0 text-sm font-semibold text-primary">
              第 {n} 条卷积对角线
            </p>
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              {pairs.map((pair, index) => (
                <div
                  key={`${index}-${pair.left}-${pair.right}`}
                  className="rounded-lg border border-border px-3 py-2 text-sm text-secondary"
                >
                  C<sub>{index}</sub> × C<sub>{n - index}</sub> ={" "}
                  <span className="font-semibold text-primary">
                    {pair.product}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div
            className="rounded-xl border border-border p-4"
            aria-live="polite"
          >
            <p className="m-0 text-sm font-semibold text-primary">审计结果</p>
            <p className="mt-2 text-2xl font-bold text-accent">Σ = {sum}</p>
            <p className="m-0 text-sm text-secondary">
              C<sub>{n + 1}</sub> = {catalan(n + 1)}
            </p>
            <p className="mt-3 text-sm font-semibold text-success">
              ✓ 左右切分相乘，所有切分相加
            </p>
          </div>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        切换 n，逐项查看卷积对角线如何精确生成下一项卡塔兰数。
      </figcaption>
    </figure>
  );
}

/** 静态图：用低阶对角线检查卷积的边界与固定总量。 */
export function Mg1ConvolutionTableDiagram() {
  const rows = [
    ["c₀", "a₀b₀", "1 项"],
    ["c₁", "a₀b₁ + a₁b₀", "2 项"],
    ["c₂", "a₀b₂ + a₁b₁ + a₂b₀", "3 项"],
    ["c₃", "a₀b₃ + a₁b₂ + a₂b₁ + a₃b₀", "4 项"],
  ];
  return (
    <Frame
      ariaLabel="卷积对角线图：c0 到 c3 的每一行收集下标和固定的配对，项数分别为1、2、3、4。"
      caption="先看小对角线，再写求和符号；每一行都守住端点。"
    >
      <text
        x="360"
        y="32"
        textAnchor="middle"
        fontSize="16"
        fontWeight="700"
        fill={primary}
      >
        卷积：沿固定总量的对角线累加
      </text>
      <text x="360" y="58" textAnchor="middle" fontSize="12" fill={secondary}>
        a 的下标向右增加，b 的下标同步减少，始终满足 i+j=n
      </text>
      {rows.map(([label, formula, count], index) => {
        const y = 94 + index * 62;
        return (
          <g key={label}>
            <rect
              x="66"
              y={y}
              width="80"
              height="40"
              rx="8"
              fill={accent}
              fillOpacity="0.1"
              stroke={accent}
            />
            <text
              x="106"
              y={y + 26}
              textAnchor="middle"
              fontSize="13"
              fontWeight="700"
              fill={accent}
            >
              {label}
            </text>
            <Arrow x1={162} y1={y + 20} x2={204} y2={y + 20} color={border} />
            <rect
              x="220"
              y={y}
              width="350"
              height="40"
              rx="8"
              fill={success}
              fillOpacity="0.07"
              stroke={border}
            />
            <text
              x="395"
              y={y + 26}
              textAnchor="middle"
              fontSize="12"
              fill={primary}
            >
              {formula}
            </text>
            <rect
              x="588"
              y={y}
              width="78"
              height="40"
              rx="8"
              fill={warning}
              fillOpacity="0.1"
              stroke={warning}
            />
            <text
              x="627"
              y={y + 26}
              textAnchor="middle"
              fontSize="11"
              fill={warning}
            >
              {count}
            </text>
          </g>
        );
      })}
      <rect
        x="118"
        y="368"
        width="484"
        height="32"
        rx="8"
        fill={danger}
        fillOpacity="0.07"
        stroke={danger}
      />
      <text
        x="360"
        y="390"
        textAnchor="middle"
        fontSize="12"
        fontWeight="700"
        fill={danger}
      >
        上界必须是 n；右下标必须写成 n−k
      </text>
    </Frame>
  );
}

/** 静态图：展示生成函数乘法如何把卷积变成系数提取。 */
export function Mg1GeneratingFunctionDiagram() {
  return (
    <Frame
      ariaLabel="生成函数图：A(x)与B(x)相乘后，x的n次方系数收集所有 i+j=n 的乘积，正好等于数列卷积。"
      caption="乘法负责生成配对，系数提取负责筛选固定总量。"
    >
      <text
        x="360"
        y="32"
        textAnchor="middle"
        fontSize="16"
        fontWeight="700"
        fill={primary}
      >
        生成函数乘法自动执行卷积
      </text>
      <text x="360" y="58" textAnchor="middle" fontSize="12" fill={secondary}>
        A(x)B(x) 的 xⁿ 系数 = Σ aₖbₙ₋ₖ
      </text>
      <Card
        x={66}
        y={112}
        width={184}
        height={94}
        title="A(x)"
        detail="a₀ + a₁x + a₂x² + …"
        color={accent}
      />
      <Card
        x={470}
        y={112}
        width={184}
        height={94}
        title="B(x)"
        detail="b₀ + b₁x + b₂x² + …"
        color={warning}
      />
      <text
        x="360"
        y="170"
        textAnchor="middle"
        fontSize="24"
        fontWeight="700"
        fill={success}
      >
        ×
      </text>
      <line
        x1="130"
        y1="250"
        x2="590"
        y2="250"
        stroke={border}
        strokeWidth="2"
      />
      <text
        x="360"
        y="280"
        textAnchor="middle"
        fontSize="14"
        fontWeight="700"
        fill={success}
      >
        [xⁿ] A(x)B(x)
      </text>
      <text x="360" y="308" textAnchor="middle" fontSize="12" fill={primary}>
        只保留 i+j=n 的项：a₀bₙ + a₁bₙ₋₁ + … + aₙb₀
      </text>
      <rect
        x="132"
        y="338"
        width="456"
        height="42"
        rx="9"
        fill={danger}
        fillOpacity="0.07"
        stroke={danger}
      />
      <text
        x="360"
        y="365"
        textAnchor="middle"
        fontSize="12"
        fontWeight="700"
        fill={danger}
      >
        系数提取 = 沿一条卷积对角线求和
      </text>
    </Frame>
  );
}

/** 静态图：展示初值如何筛选二次方程的两个平方根分支。 */
export function Mg1RootBranchDiagram() {
  return (
    <Frame
      ariaLabel="平方根分支图：二次方程产生正负两个分支，C0等于1排除正号分支，负号分支有极限1。"
      caption="代数方程给候选，生成函数的初值负责筛选合法结构。"
    >
      <text
        x="360"
        y="32"
        textAnchor="middle"
        fontSize="16"
        fontWeight="700"
        fill={primary}
      >
        C(0)=1：初值筛掉错误分支
      </text>
      <Card
        x={242}
        y={90}
        width={236}
        height={78}
        title="xC² − C + 1 = 0"
        detail="二次公式产生两条候选"
        color={accent}
      />
      <line
        x1="360"
        y1="180"
        x2="232"
        y2="246"
        stroke={border}
        strokeWidth="2"
      />
      <polygon points="222,252 236,249 230,260" fill={border} />
      <line
        x1="360"
        y1="180"
        x2="488"
        y2="246"
        stroke={border}
        strokeWidth="2"
      />
      <polygon points="498,252 484,249 490,260" fill={border} />
      <Card
        x={78}
        y={266}
        width={290}
        height={86}
        title="正号分支"
        detail="分子趋近 2，除以 2x 后发散"
        color={danger}
      />
      <Card
        x={352}
        y={266}
        width={290}
        height={86}
        title="负号分支"
        detail="分子与 x 同阶，极限为 1"
        color={success}
      />
      <text
        x="360"
        y="392"
        textAnchor="middle"
        fontSize="12"
        fontWeight="700"
        fill={success}
      >
        保留负号：C(0)=C₀=1
      </text>
    </Frame>
  );
}

/** 静态图：展示坏路径首次越界后的反射与计数相减。 */
export function Mg1ReflectionDiagram() {
  return (
    <Frame
      ariaLabel="反射原理图：合法路径不越过对角线，坏路径在首次越界处反射后对应终点偏移路径，全部路径减坏路径得到卡塔兰数。"
      caption="反射把难以直接计数的边界约束，变成一次可逆的路径对应。"
    >
      <text
        x="360"
        y="32"
        textAnchor="middle"
        fontSize="16"
        fontWeight="700"
        fill={primary}
      >
        格路径反射：全部减去坏的
      </text>
      <text x="360" y="58" textAnchor="middle" fontSize="12" fill={secondary}>
        上步代表左括号，右步代表右括号；合法路径不能越过对角线
      </text>
      <line
        x1="98"
        y1="330"
        x2="330"
        y2="98"
        stroke={border}
        strokeWidth="2"
        strokeDasharray="6 5"
      />
      <polyline
        points="98,330 156,272 214,214 272,156 330,98"
        fill="none"
        stroke={success}
        strokeWidth="4"
      />
      <polyline
        points="98,330 156,272 214,272 214,214 272,214 330,156"
        fill="none"
        stroke={danger}
        strokeWidth="4"
      />
      <circle cx="214" cy="272" r="8" fill={warning} stroke={warning} />
      <text x="214" y="365" textAnchor="middle" fontSize="12" fill={success}>
        合法：不越界
      </text>
      <text x="272" y="120" textAnchor="middle" fontSize="12" fill={danger}>
        坏：首次越界
      </text>
      <Arrow x1={378} y1={214} x2={448} y2={214} color={warning} />
      <text x="413" y="198" textAnchor="middle" fontSize="11" fill={warning}>
        反射越界后
      </text>
      <rect
        x="466"
        y="126"
        width="196"
        height="176"
        rx="12"
        fill={accent}
        fillOpacity="0.08"
        stroke={accent}
      />
      <text
        x="564"
        y="158"
        textAnchor="middle"
        fontSize="14"
        fontWeight="700"
        fill={accent}
      >
        计数公式
      </text>
      <text x="564" y="202" textAnchor="middle" fontSize="13" fill={primary}>
        全部路径
      </text>
      <text x="564" y="232" textAnchor="middle" fontSize="13" fill={danger}>
        − 坏路径
      </text>
      <text
        x="564"
        y="272"
        textAnchor="middle"
        fontSize="14"
        fontWeight="700"
        fill={success}
      >
        = Cₙ
      </text>
      <text x="360" y="392" textAnchor="middle" fontSize="12" fill={secondary}>
        反射是可逆的，所以坏路径与偏移终点路径一一对应
      </text>
    </Frame>
  );
}
