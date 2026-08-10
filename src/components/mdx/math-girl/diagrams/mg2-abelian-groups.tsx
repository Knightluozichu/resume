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
        strokeOpacity="0.6"
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
        y={y + 58}
        textAnchor="middle"
        fontSize="11"
        fill={primary}
      >
        {detail}
      </text>
    </g>
  );
}

/** 总览图：将集合、运算、四公理和交换律串成一条审计路径。 */
export function Mg2AbelianDiagram() {
  return (
    <Frame
      ariaLabel="阿贝尔群总览：集合接上二元运算，依次检查闭合性、结合律、单位元和逆元，再额外检查交换律。"
      caption="从集合到阿贝尔群：每一层都是可以逐项复查的结构契约。"
    >
      <text
        x="360"
        y="32"
        textAnchor="middle"
        fontSize="16"
        fontWeight="700"
        fill={primary}
      >
        从集合到阿贝尔群：制约逐层生成结构
      </text>
      <text x="360" y="56" textAnchor="middle" fontSize="12" fill={secondary}>
        元素的材质可以变，运算关系必须保持
      </text>
      <Card
        x={52}
        y={94}
        width={166}
        height={82}
        title="集合 G"
        detail="数字、点或动作"
        color={accent}
      />
      <Card
        x={277}
        y={94}
        width={166}
        height={82}
        title="二元运算 ★"
        detail="G × G → G"
        color={warning}
      />
      <Card
        x={502}
        y={94}
        width={166}
        height={82}
        title="闭合性"
        detail="结果仍在 G"
        color={success}
      />
      <Arrow x1={222} y1={135} x2={267} y2={135} color={border} />
      <Arrow x1={447} y1={135} x2={492} y2={135} color={border} />
      <line
        x1="360"
        y1="190"
        x2="360"
        y2="232"
        stroke={border}
        strokeWidth="2"
      />
      <polygon points="360,244 354,232 366,232" fill={border} />
      <Card
        x={70}
        y={254}
        width={142}
        height={82}
        title="结合律"
        detail="括号可移动"
        color={accent}
      />
      <Card
        x={222}
        y={254}
        width={142}
        height={82}
        title="单位元"
        detail="e 不改变元素"
        color={success}
      />
      <Card
        x={374}
        y={254}
        width={142}
        height={82}
        title="逆元"
        detail="回到 e"
        color={warning}
      />
      <Card
        x={528}
        y={254}
        width={142}
        height={82}
        title="交换律"
        detail="a★b=b★a"
        color={danger}
      />
      <text
        x="360"
        y="383"
        textAnchor="middle"
        fontSize="13"
        fontWeight="700"
        fill={danger}
      >
        四条公理通过，再加交换律，才得到阿贝尔群
      </text>
    </Frame>
  );
}

function mod(value: number, base: number) {
  return ((value % base) + base) % base;
}

function inverseFor(mode: "add" | "multiply", base: number, value: number) {
  if (mode === "add") return mod(-value, base);
  for (let candidate = 1; candidate < base; candidate += 1) {
    if (mod(value * candidate, base) === 1) return candidate;
  }
  return null;
}

/** 交互实验：用模加法和非零剩余类乘法逐项验证群公理。 */
export function Mg2AbelianLab() {
  const [mode, setMode] = useState<"add" | "multiply">("add");
  const [base, setBase] = useState(6);
  const [left, setLeft] = useState(2);
  const [right, setRight] = useState(4);
  const identity = mode === "add" ? 0 : 1;
  const result =
    mode === "add" ? mod(left + right, base) : mod(left * right, base);
  const inverse = inverseFor(mode, base, left);
  const commutative =
    result ===
    (mode === "add" ? mod(right + left, base) : mod(right * left, base));
  const options = Array.from(
    { length: mode === "add" ? base : base - 1 },
    (_, index) => (mode === "add" ? index : index + 1),
  );

  const reset = () => {
    setMode("add");
    setBase(6);
    setLeft(2);
    setRight(4);
  };

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div
        data-visual-kind="abelian-group-lab"
        className="overflow-hidden rounded-card border border-border bg-elevated p-5"
      >
        <div className="mb-4 flex flex-wrap items-center justify-center gap-2">
          <button
            type="button"
            aria-pressed={mode === "add"}
            onClick={() => {
              setMode("add");
              setBase(6);
              setLeft(2);
              setRight(4);
            }}
            className={`min-h-11 rounded-full border px-4 py-2 text-sm ${mode === "add" ? "border-accent bg-accent/10 text-accent" : "border-border text-secondary"}`}
          >
            加法模 n
          </button>
          <button
            type="button"
            aria-pressed={mode === "multiply"}
            onClick={() => {
              setMode("multiply");
              setBase(5);
              setLeft(2);
              setRight(3);
            }}
            className={`min-h-11 rounded-full border px-4 py-2 text-sm ${mode === "multiply" ? "border-accent bg-accent/10 text-accent" : "border-border text-secondary"}`}
          >
            非零乘法模 n
          </button>
          <button
            type="button"
            onClick={reset}
            className="min-h-11 rounded-full border border-border px-4 py-2 text-sm text-secondary"
          >
            重置实验
          </button>
        </div>
        <div className="mb-4 flex flex-wrap items-center justify-center gap-3 text-sm text-secondary">
          <label className="flex min-h-11 items-center gap-2 rounded-lg border border-border px-3 py-2">
            模数
            <select
              value={base}
              onChange={(event) => {
                const next = Number(event.target.value);
                setBase(next);
                setLeft(
                  mode === "add"
                    ? Math.min(left, next - 1)
                    : Math.min(left, next - 1),
                );
                setRight(
                  mode === "add"
                    ? Math.min(right, next - 1)
                    : Math.min(right, next - 1),
                );
              }}
              className="min-h-11 rounded border border-border bg-transparent px-2 text-primary"
            >
              {(mode === "add" ? [4, 5, 6, 7, 8] : [5, 7]).map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </label>
          <label className="flex min-h-11 items-center gap-2 rounded-lg border border-border px-3 py-2">
            x
            <select
              value={left}
              onChange={(event) => setLeft(Number(event.target.value))}
              className="min-h-11 rounded border border-border bg-transparent px-2 text-primary"
            >
              {options.map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </label>
          <label className="flex min-h-11 items-center gap-2 rounded-lg border border-border px-3 py-2">
            y
            <select
              value={right}
              onChange={(event) => setRight(Number(event.target.value))}
              className="min-h-11 rounded border border-border bg-transparent px-2 text-primary"
            >
              {options.map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          <div className="rounded-xl border border-border p-4">
            <p className="m-0 text-sm font-semibold text-primary">当前运算</p>
            <p className="mt-2 text-2xl font-bold text-accent">
              {mode === "add"
                ? `${left} + ${right} ≡ ${result} (mod ${base})`
                : `${left} × ${right} ≡ ${result} (mod ${base})`}
            </p>
            <p className="m-0 text-sm text-secondary">
              单位元：{identity} · x 的逆元：
              {inverse === null ? "不存在" : inverse}
            </p>
          </div>
          <div
            className="rounded-xl border border-border p-4"
            aria-live="polite"
          >
            <p className="m-0 text-sm font-semibold text-primary">公理快照</p>
            <p className="mt-2 text-sm text-success">
              ✓ 闭合性：结果仍在候选集合
            </p>
            <p className="m-0 text-sm text-success">
              ✓ 交换律：x★y = y★x（{commutative ? "通过" : "失败"}）
            </p>
            <p className="m-0 text-sm text-secondary">
              提示：乘法模合数时，某些元素可能没有逆元。
            </p>
          </div>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        改变运算和元素，观察“闭合、交换、单位元、逆元”四个证据如何同步变化。
      </figcaption>
    </figure>
  );
}

/** 静态图：用两张小表展示单位元如何锁定二元素群。 */
export function Mg2OperationDiagram() {
  return (
    <Frame
      ariaLabel="二元素群运算表图：单位元先锁定三格，逆元公理迫使 a 乘 a 等于 e。"
      caption="有限运算表把抽象公理变成逐格可检查的约束。"
    >
      <text
        x="360"
        y="32"
        textAnchor="middle"
        fontSize="16"
        fontWeight="700"
        fill={primary}
      >
        二元素群：最后一格没有自由度
      </text>
      <text x="360" y="58" textAnchor="middle" fontSize="12" fill={secondary}>
        e 是单位元；a 必须找到自己的逆元
      </text>
      <text
        x="175"
        y="102"
        textAnchor="middle"
        fontSize="14"
        fontWeight="700"
        fill={accent}
      >
        单位元先固定
      </text>
      <text
        x="545"
        y="102"
        textAnchor="middle"
        fontSize="14"
        fontWeight="700"
        fill={success}
      >
        逆元完成表格
      </text>
      <g fill="none" stroke={border} strokeWidth="1.5">
        <rect x="72" y="126" width="206" height="150" rx="8" />
        <line x1="72" y1="176" x2="278" y2="176" />
        <line x1="140" y1="126" x2="140" y2="276" />
        <line x1="209" y1="126" x2="209" y2="276" />
        <line x1="72" y1="226" x2="278" y2="226" />
        <rect x="442" y="126" width="206" height="150" rx="8" />
        <line x1="442" y1="176" x2="648" y2="176" />
        <line x1="510" y1="126" x2="510" y2="276" />
        <line x1="579" y1="126" x2="579" y2="276" />
        <line x1="442" y1="226" x2="648" y2="226" />
      </g>
      {[
        { x: 106, y: 158, t: "★" },
        { x: 174, y: 158, t: "e" },
        { x: 242, y: 158, t: "a" },
        { x: 106, y: 208, t: "e" },
        { x: 174, y: 208, t: "e" },
        { x: 242, y: 208, t: "a" },
        { x: 106, y: 258, t: "a" },
        { x: 174, y: 258, t: "a" },
        { x: 242, y: 258, t: "?" },
      ].map((cell) => (
        <text
          key={`${cell.x}-${cell.y}`}
          x={cell.x}
          y={cell.y}
          textAnchor="middle"
          fontSize="14"
          fill={cell.t === "?" ? warning : primary}
        >
          {cell.t}
        </text>
      ))}
      {[
        { x: 476, y: 158, t: "★" },
        { x: 544, y: 158, t: "e" },
        { x: 612, y: 158, t: "a" },
        { x: 476, y: 208, t: "e" },
        { x: 544, y: 208, t: "e" },
        { x: 612, y: 208, t: "a" },
        { x: 476, y: 258, t: "a" },
        { x: 544, y: 258, t: "a" },
        { x: 612, y: 258, t: "e" },
      ].map((cell) => (
        <text
          key={`${cell.x}-${cell.y}`}
          x={cell.x}
          y={cell.y}
          textAnchor="middle"
          fontSize="14"
          fontWeight={
            cell.t === "e" && cell.x === 612 && cell.y === 258
              ? "700"
              : undefined
          }
          fill={primary}
        >
          {cell.t}
        </text>
      ))}
      <Arrow x1={304} y1={201} x2={414} y2={201} color={success} />
      <text x="360" y="188" textAnchor="middle" fontSize="12" fill={success}>
        a 的逆元要求
      </text>
      <rect
        x="110"
        y="320"
        width="500"
        height="54"
        rx="10"
        fill={danger}
        fillOpacity="0.07"
        stroke={danger}
      />
      <text
        x="360"
        y="343"
        textAnchor="middle"
        fontSize="12"
        fontWeight="700"
        fill={danger}
      >
        若右下角填 a：a★a⁻¹=e 无法实现，逆元公理失败
      </text>
      <text x="360" y="363" textAnchor="middle" fontSize="11" fill={secondary}>
        所以唯一合法填法是 a★a=e
      </text>
    </Frame>
  );
}

/** 静态图：把四条公理排成一次候选结构审计。 */
export function Mg2GroupAxiomDiagram() {
  const cards = [
    ["01", "闭合性", "a,b∈G ⇒ a★b∈G", accent],
    ["02", "结合律", "(a★b)★c=a★(b★c)", success],
    ["03", "单位元", "a★e=e★a=a", warning],
    ["04", "逆元", "a★a⁻¹=a⁻¹★a=e", danger],
  ] as const;
  return (
    <Frame
      ariaLabel="群的四条公理图：闭合性、结合律、单位元和逆元按顺序组成候选群的审计流程。"
      caption="四条公理是必要条件；任一处失败，候选结构就不能称为群。"
    >
      <text
        x="360"
        y="32"
        textAnchor="middle"
        fontSize="16"
        fontWeight="700"
        fill={primary}
      >
        群的四条公理：一条失败就停止
      </text>
      {cards.map(([number, title, formula, color], index) => {
        const x = 54 + index * 164;
        return (
          <g key={number}>
            <rect
              x={x}
              y="104"
              width="136"
              height="152"
              rx="12"
              fill={color}
              fillOpacity="0.08"
              stroke={color}
            />
            <circle
              cx={x + 28}
              cy="132"
              r="16"
              fill={color}
              fillOpacity="0.18"
              stroke={color}
            />
            <text
              x={x + 28}
              y="137"
              textAnchor="middle"
              fontSize="11"
              fontWeight="700"
              fill={color}
            >
              {number}
            </text>
            <text
              x={x + 68}
              y="137"
              textAnchor="middle"
              fontSize="13"
              fontWeight="700"
              fill={color}
            >
              {title}
            </text>
            <text
              x={x + 68}
              y="182"
              textAnchor="middle"
              fontSize="11"
              fill={primary}
            >
              {formula}
            </text>
            <text
              x={x + 68}
              y="218"
              textAnchor="middle"
              fontSize="11"
              fill={secondary}
            >
              逐项记录证据
            </text>
            {index < 3 && (
              <Arrow
                x1={x + 140}
                y1={180}
                x2={x + 160}
                y2={180}
                color={border}
              />
            )}
          </g>
        );
      })}
      <rect
        x="138"
        y="304"
        width="444"
        height="60"
        rx="10"
        fill={success}
        fillOpacity="0.08"
        stroke={success}
      />
      <text
        x="360"
        y="331"
        textAnchor="middle"
        fontSize="13"
        fontWeight="700"
        fill={success}
      >
        四项通过：得到群 (G,★)
      </text>
      <text x="360" y="352" textAnchor="middle" fontSize="11" fill={secondary}>
        再检查 a★b=b★a，才知道它是不是阿贝尔群
      </text>
    </Frame>
  );
}

/** 静态图：展示同构如何保持二元素群的每一格运算。 */
export function Mg2HomomorphismDiagram() {
  return (
    <Frame
      ariaLabel="同构图：抽象二元素群 e 和 a 通过保持运算的双射映到正负一乘法群。"
      caption="同构换掉元素名字，却不换掉运算关系。"
    >
      <text
        x="360"
        y="32"
        textAnchor="middle"
        fontSize="16"
        fontWeight="700"
        fill={primary}
      >
        同构：表面不同，本质同一
      </text>
      <text x="360" y="58" textAnchor="middle" fontSize="12" fill={secondary}>
        φ(x★y)=φ(x)×φ(y)
      </text>
      <rect
        x="74"
        y="98"
        width="220"
        height="218"
        rx="14"
        fill={accent}
        fillOpacity="0.08"
        stroke={accent}
      />
      <rect
        x="426"
        y="98"
        width="220"
        height="218"
        rx="14"
        fill={success}
        fillOpacity="0.08"
        stroke={success}
      />
      <text
        x="184"
        y="130"
        textAnchor="middle"
        fontSize="15"
        fontWeight="700"
        fill={accent}
      >
        抽象群 C₂
      </text>
      <text
        x="536"
        y="130"
        textAnchor="middle"
        fontSize="15"
        fontWeight="700"
        fill={success}
      >
        正负一乘法群
      </text>
      <circle
        cx="150"
        cy="202"
        r="24"
        fill={accent}
        fillOpacity="0.14"
        stroke={accent}
      />
      <circle
        cx="220"
        cy="262"
        r="24"
        fill={accent}
        fillOpacity="0.14"
        stroke={accent}
      />
      <text
        x="150"
        y="207"
        textAnchor="middle"
        fontSize="14"
        fontWeight="700"
        fill={accent}
      >
        e
      </text>
      <text
        x="220"
        y="267"
        textAnchor="middle"
        fontSize="14"
        fontWeight="700"
        fill={accent}
      >
        a
      </text>
      <circle
        cx="502"
        cy="202"
        r="24"
        fill={success}
        fillOpacity="0.14"
        stroke={success}
      />
      <circle
        cx="572"
        cy="262"
        r="24"
        fill={success}
        fillOpacity="0.14"
        stroke={success}
      />
      <text
        x="502"
        y="207"
        textAnchor="middle"
        fontSize="14"
        fontWeight="700"
        fill={success}
      >
        +1
      </text>
      <text
        x="572"
        y="267"
        textAnchor="middle"
        fontSize="14"
        fontWeight="700"
        fill={success}
      >
        −1
      </text>
      <Arrow x1={248} y1={202} x2={474} y2={202} color={warning} />
      <Arrow x1={248} y1={262} x2={544} y2={262} color={warning} />
      <text x="360" y="188" textAnchor="middle" fontSize="12" fill={warning}>
        φ(e)=+1
      </text>
      <text x="396" y="248" textAnchor="middle" fontSize="12" fill={warning}>
        φ(a)=−1
      </text>
      <text
        x="360"
        y="356"
        textAnchor="middle"
        fontSize="12"
        fontWeight="700"
        fill={primary}
      >
        每个输入对的输出仍对应，运算表完全一致
      </text>
    </Frame>
  );
}

/** 静态图：将单位根、正多边形顶点和子群关系放在同一张结构地图中。 */
export function Mg2SubgroupDiagram() {
  const points = [
    [360, 104, "1"],
    [462, 166, "ζ"],
    [423, 286, "ζ²"],
    [297, 286, "ζ³"],
    [258, 166, "ζ⁴"],
  ] as const;
  return (
    <Frame
      ariaLabel="单位根结构图：单位圆上的五个单位根组成正五边形，旋转生成循环群，重复旋转形成子群层次。"
      caption="单位根的复数乘法、正多边形旋转和子群层次是同一个结构的三种视角。"
    >
      <text
        x="360"
        y="32"
        textAnchor="middle"
        fontSize="16"
        fontWeight="700"
        fill={primary}
      >
        单位根：代数运算变成几何旋转
      </text>
      <text x="360" y="56" textAnchor="middle" fontSize="12" fill={secondary}>
        ζⁱζʲ=ζⁱ⁺ʲ（指数按模 n 相加）
      </text>
      <circle
        cx="360"
        cy="210"
        r="106"
        fill="none"
        stroke={border}
        strokeWidth="1.5"
      />
      {points.map(([x, y, label], index) => {
        const [nextX, nextY] = points[(index + 1) % points.length];
        return (
          <g key={label}>
            <line
              x1={x}
              y1={y}
              x2={nextX}
              y2={nextY}
              stroke={accent}
              strokeOpacity="0.6"
              strokeWidth="2"
            />
            <circle
              cx={x}
              cy={y}
              r="18"
              fill={accent}
              fillOpacity="0.15"
              stroke={accent}
            />
            <text
              x={x}
              y={y + 4}
              textAnchor="middle"
              fontSize="12"
              fontWeight="700"
              fill={accent}
            >
              {label}
            </text>
          </g>
        );
      })}
      <path
        d="M 360 86 A 124 124 0 0 1 474 166"
        fill="none"
        stroke={warning}
        strokeWidth="2"
      />
      <polygon points="474,166 461,162 466,174" fill={warning} />
      <text x="555" y="148" textAnchor="middle" fontSize="12" fill={warning}>
        乘 ζ = 旋转
      </text>
      <rect
        x="76"
        y="344"
        width="568"
        height="42"
        rx="9"
        fill={success}
        fillOpacity="0.08"
        stroke={success}
      />
      <text
        x="360"
        y="370"
        textAnchor="middle"
        fontSize="12"
        fontWeight="700"
        fill={success}
      >
        闭合 + 结合 + 单位元 + 逆元 + 交换 ⇒ 阿贝尔群；重复旋转给出子群
      </text>
    </Frame>
  );
}
