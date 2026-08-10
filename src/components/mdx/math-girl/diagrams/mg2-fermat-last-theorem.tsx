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

/** 展示从费马反例到 Frey 曲线，再到模性矛盾的主逻辑链。 */
export function Mg2FermatLogicDiagram() {
  const stages = [
    { label: "反设", detail: "aᵖ+bᵖ=cᵖ", color: danger },
    { label: "构造", detail: "Frey 曲线", color: accent },
    { label: "Ribet", detail: "不模", color: warning },
    { label: "Wiles", detail: "必模", color: success },
  ];
  return (
    <Frame
      ariaLabel="费马大定理反证链图：假设存在奇质数指数反例，构造Frey曲线，Ribet推出它不模，Wiles推出它必模，最后矛盾。"
      caption="证明的关键是把整数方程送进椭圆曲线与模形式的共同语言。"
    >
      <text
        x="360"
        y="34"
        textAnchor="middle"
        fontSize="17"
        fontWeight="700"
        fill={primary}
      >
        完整反证链：一个反例如何变成不可能对象
      </text>
      <text x="360" y="58" textAnchor="middle" fontSize="12" fill={secondary}>
        不是逐个指数计算，而是让两个独立定理在同一条曲线上相撞
      </text>
      {stages.map((stage, index) => {
        const x = 32 + index * 172;
        return (
          <g key={stage.label}>
            <rect
              x={x}
              y="136"
              width="142"
              height="112"
              rx="14"
              fill={stage.color}
              fillOpacity="0.1"
              stroke={stage.color}
              strokeWidth="2"
            />
            <text
              x={x + 71}
              y="174"
              textAnchor="middle"
              fontSize="15"
              fontWeight="700"
              fill={stage.color}
            >
              {stage.label}
            </text>
            <text
              x={x + 71}
              y="208"
              textAnchor="middle"
              fontSize="15"
              fill={primary}
            >
              {stage.detail}
            </text>
            {index < stages.length - 1 ? (
              <Arrow
                x1={x + 150}
                y1={192}
                x2={x + 164}
                y2={192}
                color={secondary}
              />
            ) : null}
          </g>
        );
      })}
      <rect
        x="170"
        y="298"
        width="380"
        height="70"
        rx="12"
        fill={danger}
        fillOpacity="0.08"
        stroke={danger}
      />
      <text
        x="360"
        y="326"
        textAnchor="middle"
        fontSize="15"
        fontWeight="700"
        fill={danger}
      >
        同一条曲线：E 既模又不模
      </text>
      <text x="360" y="350" textAnchor="middle" fontSize="13" fill={primary}>
        矛盾否定反设，费马大定理成立
      </text>
    </Frame>
  );
}

/** 逐点数有限域中的示例曲线，并显示 Frobenius 迹。 */
export function Mg2FiniteFieldDiagram() {
  const data = [
    { p: 2, s: 2, a: 0 },
    { p: 3, s: 3, a: 0 },
    { p: 5, s: 7, a: -2 },
  ];
  return (
    <Frame
      ariaLabel="有限域点数图：曲线y平方等于x立方减x在F2、F3、F5上的仿射点数分别为2、3、7，Frobenius迹p减s(p)分别为0、0、负2。"
      caption="每个质数提供一枚局部棱镜：s(p) 记录点数，aₚ=p−s(p) 记录迹。"
    >
      <text
        x="360"
        y="34"
        textAnchor="middle"
        fontSize="17"
        fontWeight="700"
        fill={primary}
      >
        有限域棱镜：逐点数同一条曲线
      </text>
      <text x="360" y="58" textAnchor="middle" fontSize="12" fill={secondary}>
        E：y² = x³ − x；s(p) 不计无穷远点，aₚ = p − s(p)
      </text>
      {data.map((item, index) => {
        const x = 70 + index * 215;
        const grid =
          item.p === 5
            ? [0, 1, 2, 3, 4]
            : Array.from({ length: item.p }, (_, i) => i);
        return (
          <g key={`field-${item.p}`}>
            <rect
              x={x}
              y="100"
              width="168"
              height="218"
              rx="12"
              fill={accent}
              fillOpacity="0.06"
              stroke={accent}
              strokeWidth="2"
            />
            <text
              x={x + 84}
              y="130"
              textAnchor="middle"
              fontSize="16"
              fontWeight="700"
              fill={accent}
            >
              F{item.p}
            </text>
            <line
              x1={x + 26}
              y1="258"
              x2={x + 142}
              y2="258"
              stroke={border}
              strokeWidth="2"
            />
            <line
              x1={x + 42}
              y1="274"
              x2={x + 42}
              y2="154"
              stroke={border}
              strokeWidth="2"
            />
            {grid.map((value, cellIndex) => {
              const cx = x + 58 + (cellIndex % 3) * 34;
              const cy = 226 - Math.floor(cellIndex / 3) * 34;
              const marked = cellIndex < item.s;
              return (
                <circle
                  key={`${item.p}-${value}-${cellIndex}`}
                  cx={cx}
                  cy={cy}
                  r="5"
                  fill={marked ? success : border}
                />
              );
            })}
            <text
              x={x + 84}
              y="286"
              textAnchor="middle"
              fontSize="13"
              fill={primary}
            >
              s({item.p}) = {item.s}
            </text>
            <text
              x={x + 84}
              y="306"
              textAnchor="middle"
              fontSize="12"
              fill={secondary}
            >
              aₚ = {item.a}
            </text>
          </g>
        );
      })}
      <text x="360" y="356" textAnchor="middle" fontSize="13" fill={primary}>
        完整点数：#E(Fₚ) = s(p) + 1
      </text>
    </Frame>
  );
}

/** 对齐有限域迹与模形式 q 展开系数。 */
export function Mg2ModularBridgeDiagram() {
  const rows = [
    ["p", "5", "13", "17"],
    ["s(p)", "7", "7", "15"],
    ["a(p)", "−2", "6", "2"],
  ];
  return (
    <Frame
      ariaLabel="谷山志村桥图：有限域侧的s(p)与模形式q展开侧的a(p)按质数对齐，满足s(p)加a(p)等于p，并连接两边的L函数。"
      caption="局部点数与 q 展开系数逐质数吻合，是模性的可见入口。"
    >
      <text
        x="360"
        y="34"
        textAnchor="middle"
        fontSize="17"
        fontWeight="700"
        fill={primary}
      >
        谷山—志村桥：两列数字相遇
      </text>
      <text x="360" y="58" textAnchor="middle" fontSize="12" fill={secondary}>
        椭圆曲线侧的局部迹 = 模形式侧的 q 展开系数
      </text>
      <rect
        x="48"
        y="96"
        width="284"
        height="212"
        rx="14"
        fill={accent}
        fillOpacity="0.08"
        stroke={accent}
        strokeWidth="2"
      />
      <rect
        x="388"
        y="96"
        width="284"
        height="212"
        rx="14"
        fill={success}
        fillOpacity="0.08"
        stroke={success}
        strokeWidth="2"
      />
      <text
        x="190"
        y="126"
        textAnchor="middle"
        fontSize="15"
        fontWeight="700"
        fill={accent}
      >
        椭圆曲线世界
      </text>
      <text
        x="530"
        y="126"
        textAnchor="middle"
        fontSize="15"
        fontWeight="700"
        fill={success}
      >
        模形式世界
      </text>
      {rows.map((row, rowIndex) => (
        <g key={row[0]}>
          <text
            x="78"
            y={168 + rowIndex * 40}
            fontSize="13"
            fontWeight="700"
            fill={primary}
          >
            {row[0]}
          </text>
          <text x="122" y={168 + rowIndex * 40} fontSize="14" fill={primary}>
            {row[1]}
          </text>
          <text x="184" y={168 + rowIndex * 40} fontSize="14" fill={primary}>
            {row[2]}
          </text>
          <text x="246" y={168 + rowIndex * 40} fontSize="14" fill={primary}>
            {row[3]}
          </text>
          <text
            x="418"
            y={168 + rowIndex * 40}
            fontSize="13"
            fontWeight="700"
            fill={primary}
          >
            {row[0]}
          </text>
          <text x="462" y={168 + rowIndex * 40} fontSize="14" fill={primary}>
            {row[1]}
          </text>
          <text x="524" y={168 + rowIndex * 40} fontSize="14" fill={primary}>
            {row[2]}
          </text>
          <text x="586" y={168 + rowIndex * 40} fontSize="14" fill={primary}>
            {row[3]}
          </text>
        </g>
      ))}
      <Arrow x1={332} y1={206} x2={388} y2={206} color={warning} />
      <text x="360" y="190" textAnchor="middle" fontSize="11" fill={warning}>
        对应
      </text>
      <rect
        x="164"
        y="338"
        width="392"
        height="46"
        rx="10"
        fill={warning}
        fillOpacity="0.1"
        stroke={warning}
      />
      <text
        x="360"
        y="367"
        textAnchor="middle"
        fontSize="15"
        fontWeight="700"
        fill={warning}
      >
        s(p) + a(p) = p　⇒　L(E,s) = L(f,s)
      </text>
    </Frame>
  );
}

/** 用三个根和互质条件解释 Frey 曲线为何落入半稳定情形。 */
export function Mg2FreyCurveDiagram() {
  return (
    <Frame
      ariaLabel="Frey曲线图：反设a的p次方加b的p次方等于c的p次方，曲线根为0、负a的p次方和b的p次方，互质条件排除三重根，得到半稳定曲线。"
      caption="费马反例的互质性控制曲线退化：最多出现二重根，因此进入半稳定入口。"
    >
      <text
        x="360"
        y="34"
        textAnchor="middle"
        fontSize="17"
        fontWeight="700"
        fill={primary}
      >
        Frey 曲线：把整数反例编码成几何对象
      </text>
      <text x="360" y="58" textAnchor="middle" fontSize="12" fill={secondary}>
        Eₐ,ᵦ,ₚ：y² = x(x + aᵖ)(x − bᵖ)
      </text>
      <line
        x1="104"
        y1="234"
        x2="616"
        y2="234"
        stroke={border}
        strokeWidth="2"
      />
      <circle cx="180" cy="234" r="8" fill={accent} />
      <circle cx="360" cy="234" r="8" fill={warning} />
      <circle cx="540" cy="234" r="8" fill={success} />
      <text x="180" y="272" textAnchor="middle" fontSize="14" fill={accent}>
        0
      </text>
      <text x="360" y="272" textAnchor="middle" fontSize="14" fill={warning}>
        −aᵖ
      </text>
      <text x="540" y="272" textAnchor="middle" fontSize="14" fill={success}>
        bᵖ
      </text>
      <text x="180" y="296" textAnchor="middle" fontSize="12" fill={secondary}>
        第一根
      </text>
      <text x="360" y="296" textAnchor="middle" fontSize="12" fill={secondary}>
        第二根
      </text>
      <text x="540" y="296" textAnchor="middle" fontSize="12" fill={secondary}>
        第三根
      </text>
      <path
        d="M 180 184 C 260 116, 440 116, 540 184"
        fill="none"
        stroke={accent}
        strokeWidth="2"
        strokeDasharray="6 5"
      />
      <text x="360" y="122" textAnchor="middle" fontSize="13" fill={primary}>
        若三根全重合 ⇒ ℓ 同时整除 a、b
      </text>
      <rect
        x="156"
        y="326"
        width="408"
        height="48"
        rx="10"
        fill={success}
        fillOpacity="0.1"
        stroke={success}
      />
      <text
        x="360"
        y="356"
        textAnchor="middle"
        fontSize="14"
        fontWeight="700"
        fill={success}
      >
        gcd(a,b)=1 ⇒ 不会三重合 ⇒ 半稳定
      </text>
    </Frame>
  );
}

/** 展示尤里从相邻平方差得到无穷多基本勾股数。 */
export function Mg2PythagoreanRouteDiagram() {
  const rows = [
    ["j=2", "4", "3", "5"],
    ["j=3", "12", "5", "13"],
    ["j=4", "24", "7", "25"],
  ];
  return (
    <Frame
      ariaLabel="勾股数构造图：令k等于j乘j减1，a等于2j乘j减1，b等于2j减1，c等于2j乘j减1加1，得到4、3、5，12、5、13，24、7、25。"
      caption="相邻平方的差给出一条独立但可复查的勾股数生成路线。"
    >
      <text
        x="360"
        y="34"
        textAnchor="middle"
        fontSize="17"
        fontWeight="700"
        fill={primary}
      >
        从相邻平方到无穷多勾股数
      </text>
      <text x="360" y="58" textAnchor="middle" fontSize="12" fill={secondary}>
        k = j(j−1)，4k+1 = (2j−1)²；再令 a=2k，b=2j−1，c=2k+1
      </text>
      <rect
        x="82"
        y="98"
        width="556"
        height="72"
        rx="12"
        fill={accent}
        fillOpacity="0.08"
        stroke={accent}
      />
      <text
        x="360"
        y="128"
        textAnchor="middle"
        fontSize="15"
        fontWeight="700"
        fill={accent}
      >
        a² + b² = c²
      </text>
      <text x="360" y="152" textAnchor="middle" fontSize="13" fill={primary}>
        a=2j(j−1)，b=2j−1，c=2j(j−1)+1
      </text>
      {rows.map((row, index) => (
        <g key={row[0]}>
          <rect
            x="122"
            y={202 + index * 54}
            width="476"
            height="40"
            rx="8"
            fill={index === 2 ? success : border}
            fillOpacity={index === 2 ? "0.12" : "0.08"}
          />
          <text
            x="160"
            y={227 + index * 54}
            fontSize="13"
            fontWeight="700"
            fill={primary}
          >
            {row[0]}
          </text>
          <text
            x="286"
            y={227 + index * 54}
            textAnchor="middle"
            fontSize="14"
            fill={primary}
          >
            a = {row[1]}
          </text>
          <text
            x="410"
            y={227 + index * 54}
            textAnchor="middle"
            fontSize="14"
            fill={primary}
          >
            b = {row[2]}
          </text>
          <text
            x="534"
            y={227 + index * 54}
            textAnchor="middle"
            fontSize="14"
            fill={primary}
          >
            c = {row[3]}
          </text>
        </g>
      ))}
      <text x="360" y="394" textAnchor="middle" fontSize="13" fill={secondary}>
        c−a=1 ⇒ 互质；j 持续增长 ⇒ 无穷多组
      </text>
    </Frame>
  );
}

type PrimeChoice = 2 | 3 | 5;

const primeData: Record<
  PrimeChoice,
  { s: number; trace: number; points: string }
> = {
  2: { s: 2, trace: 0, points: "(0,0)、(1,0)" },
  3: { s: 3, trace: 0, points: "(0,0)、(1,0)、(2,0)" },
  5: { s: 7, trace: -2, points: "7 个仿射点" },
};

/** 可重置的有限域点数实验。 */
export function Mg2FermatLab() {
  const [prime, setPrime] = useState<PrimeChoice>(2);
  const current = primeData[prime];
  return (
    <section
      className="not-prose my-6 rounded-card border border-border bg-elevated p-5"
      aria-label="有限域点数实验"
    >
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="text-base font-semibold text-primary">
            Finite Field Counter
          </h3>
          <p className="mt-1 text-sm text-secondary">
            切换质数，复核 E：y²=x³−x 的局部点数与迹。
          </p>
        </div>
        <button
          type="button"
          onClick={() => setPrime(2)}
          className="rounded-control border border-border px-3 py-2 text-xs text-secondary transition-colors hover:border-accent hover:text-primary"
        >
          重置实验
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {([2, 3, 5] as PrimeChoice[]).map((value) => (
          <button
            key={value}
            type="button"
            onClick={() => setPrime(value)}
            aria-pressed={prime === value}
            className={`rounded-control border px-4 py-2 text-sm transition-colors ${prime === value ? "border-accent text-accent" : "border-border text-secondary"}`}
          >
            F{value}
          </button>
        ))}
      </div>
      <div className="mt-4 grid gap-4 rounded-control border border-border p-4 sm:grid-cols-[1fr_auto] sm:items-center">
        <div>
          <p className="font-mono text-sm text-primary">
            s({prime}) = {current.s}
          </p>
          <p className="mt-2 text-sm text-accent">
            aₚ = p − s(p) = {current.trace}
          </p>
          <p className="mt-1 text-xs text-secondary">
            检查点：{current.points}；完整点数为 {current.s + 1}。
          </p>
        </div>
        <svg
          viewBox="0 0 180 120"
          role="img"
          aria-label={`有限域F${prime}的点数示意`}
          className="h-auto w-full max-w-[180px]"
        >
          <line x1="16" y1="96" x2="164" y2="96" stroke={border} />
          <line x1="26" y1="108" x2="26" y2="12" stroke={border} />
          {Array.from({ length: current.s }, (_, index) => (
            <circle
              key={`point-${prime}-${index}`}
              cx={44 + (index % 4) * 30}
              cy={78 - Math.floor(index / 4) * 26}
              r="5"
              fill={success}
            />
          ))}
        </svg>
      </div>
    </section>
  );
}
