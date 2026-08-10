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

/** 把整数映射到模12钟面，展示同余类与显示标签的区别。 */
export function Mg2ClockDiagram() {
  const labels = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  return (
    <Frame
      ariaLabel="模12时钟图：15点和3点落在同一位置，12点的数学余数是0但钟面标签写12。"
      caption="钟面标签 12 只是余数类 0 的显示名；数学运算仍使用 0。"
    >
      <text
        x="360"
        y="34"
        textAnchor="middle"
        fontSize="17"
        fontWeight="700"
        fill={primary}
      >
        时钟模12：把整圈折叠成一圈
      </text>
      <text x="360" y="58" textAnchor="middle" fontSize="12" fill={secondary}>
        15 mod 12 = 3；12 mod 12 = 0
      </text>
      <circle
        cx="360"
        cy="226"
        r="116"
        fill={accent}
        fillOpacity="0.05"
        stroke={border}
        strokeWidth="2"
      />
      <circle cx="360" cy="226" r="8" fill={primary} />
      {labels.map((label, index) => {
        const angle = (index / 12) * Math.PI * 2 - Math.PI / 2;
        const x = 360 + Math.cos(angle) * 94;
        const y = 232 + Math.sin(angle) * 94;
        const highlighted = label === 3 || label === 12;
        return (
          <g key={`clock-${label}`}>
            <circle
              cx={x}
              cy={y - 6}
              r={highlighted ? "18" : "13"}
              fill={highlighted ? success : border}
              fillOpacity={highlighted ? "0.24" : "0.1"}
              stroke={highlighted ? success : border}
            />
            <text
              x={x}
              y={y - 1}
              textAnchor="middle"
              fontSize="13"
              fontWeight={highlighted ? "700" : "400"}
              fill={highlighted ? success : primary}
            >
              {label}
            </text>
          </g>
        );
      })}
      <Arrow x1={258} y1={130} x2={294} y2={154} color={success} />
      <text x="194" y="120" fontSize="13" fill={success}>
        15 → 3
      </text>
      <text x="360" y="372" textAnchor="middle" fontSize="13" fill={primary}>
        [15]₁₂ = [3]₁₂ = [27]₁₂
      </text>
    </Frame>
  );
}

/** 对比同余式可做的加乘与危险的任意消去。 */
export function Mg2CongruenceRulesDiagram() {
  return (
    <Frame
      ariaLabel="同余变形图：加法和乘法保持模数6下的同余，但2乘1同余2乘4不能直接消去2，因为2与6不互质。"
      caption="同余像等式一样支持加、减、乘；除法必须先检查因子与模数是否互质。"
    >
      <text
        x="360"
        y="34"
        textAnchor="middle"
        fontSize="17"
        fontWeight="700"
        fill={primary}
      >
        同余式的合法变形审计
      </text>
      <text x="360" y="58" textAnchor="middle" fontSize="12" fill={secondary}>
        关键证据：差是否仍是模数的倍数？
      </text>
      <rect
        x="56"
        y="100"
        width="270"
        height="104"
        rx="14"
        fill={success}
        fillOpacity="0.1"
        stroke={success}
        strokeWidth="2"
      />
      <text
        x="191"
        y="132"
        textAnchor="middle"
        fontSize="15"
        fontWeight="700"
        fill={success}
      >
        合法：乘法保持同余
      </text>
      <text x="191" y="166" textAnchor="middle" fontSize="15" fill={primary}>
        a ≡ b，c ≡ d
      </text>
      <text x="191" y="190" textAnchor="middle" fontSize="14" fill={primary}>
        ⇒ ac ≡ bd (mod m)
      </text>
      <rect
        x="394"
        y="100"
        width="270"
        height="104"
        rx="14"
        fill={danger}
        fillOpacity="0.1"
        stroke={danger}
        strokeWidth="2"
      />
      <text
        x="529"
        y="132"
        textAnchor="middle"
        fontSize="15"
        fontWeight="700"
        fill={danger}
      >
        危险：不能任意约分
      </text>
      <text x="529" y="166" textAnchor="middle" fontSize="15" fill={primary}>
        2·1 ≡ 2·4 (mod 6)
      </text>
      <text x="529" y="190" textAnchor="middle" fontSize="14" fill={danger}>
        1 ≢ 4 (mod 6)
      </text>
      <line
        x1="360"
        y1="130"
        x2="360"
        y2="300"
        stroke={border}
        strokeDasharray="5 5"
      />
      <text x="360" y="240" textAnchor="middle" fontSize="12" fill={warning}>
        gcd(c,m)=1?
      </text>
      <rect
        x="132"
        y="292"
        width="456"
        height="64"
        rx="12"
        fill={warning}
        fillOpacity="0.1"
        stroke={warning}
      />
      <text
        x="360"
        y="320"
        textAnchor="middle"
        fontSize="14"
        fontWeight="700"
        fill={warning}
      >
        合法消去：ac ≡ bc，gcd(c,m)=1 ⇒ a ≡ b (mod m)
      </text>
      <text x="360" y="342" textAnchor="middle" fontSize="12" fill={primary}>
        若不互质，只能把模数缩小到 m / gcd(c,m)
      </text>
    </Frame>
  );
}

/** 用乘法表的行是否排列来判定模类是否可逆。 */
export function Mg2InverseTableDiagram() {
  const rows = [
    { label: "a=2, mod 5", values: [0, 2, 4, 1, 3], good: true },
    { label: "a=2, mod 6", values: [0, 2, 4, 0, 2, 4], good: false },
  ];
  return (
    <Frame
      ariaLabel="逆元乘法表图：模5中2乘法行是0到4的排列并存在逆元，模6中2乘法行发生重复且没有1，因此不可逆。"
      caption="有限集合上的乘法行无碰撞，等价于出现全部剩余类，也等价于存在逆元。"
    >
      <text
        x="360"
        y="34"
        textAnchor="middle"
        fontSize="17"
        fontWeight="700"
        fill={primary}
      >
        乘法行：排列就是可逆
      </text>
      <text x="360" y="58" textAnchor="middle" fontSize="12" fill={secondary}>
        比较 x ↦ ax 是否碰撞，而不是只凭直觉说“能除”
      </text>
      {rows.map((row, rowIndex) => {
        const y = 112 + rowIndex * 126;
        return (
          <g key={row.label}>
            <rect
              x="72"
              y={y}
              width="576"
              height="96"
              rx="12"
              fill={row.good ? success : danger}
              fillOpacity="0.08"
              stroke={row.good ? success : danger}
              strokeWidth="2"
            />
            <text
              x="100"
              y={y + 28}
              fontSize="14"
              fontWeight="700"
              fill={row.good ? success : danger}
            >
              {row.label}
            </text>
            {row.values.map((value, index) => {
              const x = 302 + index * 48;
              return (
                <g key={`${row.label}-${index}`}>
                  <rect
                    x={x}
                    y={y + 16}
                    width="36"
                    height="36"
                    rx="6"
                    fill={value === 1 ? warning : border}
                    fillOpacity="0.16"
                    stroke={value === 1 ? warning : border}
                  />
                  <text
                    x={x + 18}
                    y={y + 40}
                    textAnchor="middle"
                    fontSize="13"
                    fill={primary}
                  >
                    {value}
                  </text>
                </g>
              );
            })}
            <text x="100" y={y + 72} fontSize="12" fill={secondary}>
              {row.good
                ? "0,1,2,3,4 各出现一次；2⁻¹ = 3"
                : "0,2,4 重复；没有 1；2 与 6 不互质"}
            </text>
          </g>
        );
      })}
      <text x="360" y="386" textAnchor="middle" fontSize="13" fill={primary}>
        gcd(a,m)=1 ⇔ a 在模 m 下有逆元
      </text>
    </Frame>
  );
}

/** 画出群、环、域的包含式结构，强调运算数量与可逆性。 */
export function Mg2StructureDiagram() {
  return (
    <Frame
      ariaLabel="群环域结构图：群只有一种运算，环保留加法和乘法，域要求非零元素都有乘法逆元，模素数剩余类环是有限域，模合数会有零因子。"
      caption="群、环、域不是三个孤立名词，而是逐层增加运算与可逆性要求。"
    >
      <text
        x="360"
        y="34"
        textAnchor="middle"
        fontSize="17"
        fontWeight="700"
        fill={primary}
      >
        从群到环，再到域
      </text>
      <text x="360" y="58" textAnchor="middle" fontSize="12" fill={secondary}>
        同一批剩余类，增加结构就能回答更强的问题
      </text>
      <rect
        x="52"
        y="112"
        width="178"
        height="164"
        rx="14"
        fill={accent}
        fillOpacity="0.1"
        stroke={accent}
        strokeWidth="2"
      />
      <text
        x="141"
        y="145"
        textAnchor="middle"
        fontSize="16"
        fontWeight="700"
        fill={accent}
      >
        群
      </text>
      <text x="141" y="178" textAnchor="middle" fontSize="13" fill={primary}>
        一种运算
      </text>
      <text x="141" y="202" textAnchor="middle" fontSize="13" fill={primary}>
        单位元 + 逆元
      </text>
      <text x="141" y="242" textAnchor="middle" fontSize="12" fill={secondary}>
        U(m)：只保留可逆类
      </text>
      <Arrow x1={244} y1={194} x2={284} y2={194} color={secondary} />
      <rect
        x="271"
        y="112"
        width="178"
        height="164"
        rx="14"
        fill={warning}
        fillOpacity="0.1"
        stroke={warning}
        strokeWidth="2"
      />
      <text
        x="360"
        y="145"
        textAnchor="middle"
        fontSize="16"
        fontWeight="700"
        fill={warning}
      >
        环
      </text>
      <text x="360" y="178" textAnchor="middle" fontSize="13" fill={primary}>
        加法 + 乘法
      </text>
      <text x="360" y="202" textAnchor="middle" fontSize="13" fill={primary}>
        分配律连接
      </text>
      <text x="360" y="242" textAnchor="middle" fontSize="12" fill={secondary}>
        Z/mZ：允许零因子
      </text>
      <Arrow x1={463} y1={194} x2={503} y2={194} color={secondary} />
      <rect
        x="490"
        y="112"
        width="178"
        height="164"
        rx="14"
        fill={success}
        fillOpacity="0.1"
        stroke={success}
        strokeWidth="2"
      />
      <text
        x="579"
        y="145"
        textAnchor="middle"
        fontSize="16"
        fontWeight="700"
        fill={success}
      >
        域
      </text>
      <text x="579" y="178" textAnchor="middle" fontSize="13" fill={primary}>
        非零元素都有逆元
      </text>
      <text x="579" y="202" textAnchor="middle" fontSize="13" fill={primary}>
        可以安全做除法
      </text>
      <text x="579" y="242" textAnchor="middle" fontSize="12" fill={secondary}>
        Fₚ：p 为素数
      </text>
      <rect
        x="148"
        y="318"
        width="424"
        height="44"
        rx="10"
        fill={danger}
        fillOpacity="0.08"
        stroke={danger}
      />
      <text x="360" y="346" textAnchor="middle" fontSize="13" fill={danger}>
        合数模数 ⇒ 非零零因子 ⇒ 不是域
      </text>
    </Frame>
  );
}

type ModulusChoice = 5 | 6;

const modulusData: Record<
  ModulusChoice,
  { label: string; inverse: string; detail: string; color: string }
> = {
  5: {
    label: "模 5",
    inverse: "2⁻¹ = 3",
    detail: "2×3 ≡ 1 (mod 5)",
    color: success,
  },
  6: {
    label: "模 6",
    inverse: "不存在",
    detail: "2×x ≢ 1 (mod 6)",
    color: danger,
  },
};

/** 可重置的逆元实验：切换素数模与合数模。 */
export function Mg2ModularLab() {
  const [modulus, setModulus] = useState<ModulusChoice>(5);
  const current = modulusData[modulus];
  return (
    <section
      className="not-prose my-6 rounded-card border border-border bg-elevated p-5"
      aria-label="模逆元实验"
    >
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="text-base font-semibold text-primary">
            Modular Inverse Lab
          </h3>
          <p className="mt-1 text-sm text-secondary">
            切换模数，观察同一个因子何时可逆、何时产生碰撞。
          </p>
        </div>
        <button
          type="button"
          onClick={() => setModulus(5)}
          className="rounded-control border border-border px-3 py-2 text-xs text-secondary transition-colors hover:border-accent hover:text-primary"
        >
          重置实验
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {([5, 6] as ModulusChoice[]).map((value) => (
          <button
            key={value}
            type="button"
            onClick={() => setModulus(value)}
            aria-pressed={modulus === value}
            className={`rounded-control border px-4 py-2 text-sm transition-colors ${modulus === value ? "border-accent text-accent" : "border-border text-secondary"}`}
          >
            模 {value}
          </button>
        ))}
      </div>
      <div className="mt-4 grid gap-4 rounded-control border border-border p-4 sm:grid-cols-[1fr_auto] sm:items-center">
        <div>
          <p className="font-mono text-sm text-primary">
            gcd(2,{modulus}) = {modulus === 5 ? 1 : 2}
          </p>
          <p className="mt-2 text-sm" style={{ color: current.color }}>
            {current.inverse}
          </p>
          <p className="mt-1 text-xs text-secondary">
            {current.detail}；
            {modulus === 5 ? "乘法行是排列。" : "乘法行出现重复，形成零因子。"}
          </p>
        </div>
        <svg
          viewBox="0 0 180 120"
          role="img"
          aria-label={`${current.label}的逆元结果`}
          className="h-auto w-full max-w-[180px]"
        >
          <line x1="16" y1="96" x2="164" y2="96" stroke={border} />
          <line x1="28" y1="106" x2="28" y2="18" stroke={border} />
          {Array.from({ length: modulus }, (_, index) => (
            <circle
              key={`lab-${modulus}-${index}`}
              cx={48 + (index % 4) * 28}
              cy={78 - Math.floor(index / 4) * 26}
              r="5"
              fill={index === 1 ? current.color : border}
            />
          ))}
        </svg>
      </div>
    </section>
  );
}
