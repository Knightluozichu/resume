"use client";

import { useState } from "react";

const accent = "var(--accent)";
const success = "var(--success)";
const warning = "var(--warning)";
const danger = "var(--danger)";
const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";

function round(value: number) {
  return Number(value.toFixed(3));
}

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

function Triangle({
  x,
  y,
  scale,
  a,
  b,
  c,
  fill = accent,
}: {
  x: number;
  y: number;
  scale: number;
  a: number;
  b: number;
  c: number;
  fill?: string;
}) {
  const width = round(a * scale);
  const height = round(b * scale);
  return (
    <g>
      <polygon
        points={`${x},${y} ${x + width},${y} ${x},${y - height}`}
        fill={fill}
        fillOpacity="0.1"
        stroke={fill}
        strokeWidth="2"
      />
      <text
        x={x + width / 2}
        y={y + 20}
        textAnchor="middle"
        fontSize="12"
        fontWeight="700"
        fill={fill}
      >
        a={a}
      </text>
      <text
        x={x - 20}
        y={y - height / 2}
        textAnchor="middle"
        fontSize="12"
        fontWeight="700"
        fill={fill}
      >
        b={b}
      </text>
      <text
        x={x + width / 2 + 10}
        y={y - height / 2 - 8}
        textAnchor="middle"
        fontSize="12"
        fontWeight="700"
        fill={primary}
      >
        c={c}
      </text>
      <text x={x + 20} y={y - height + 22} fontSize="11" fill={secondary}>
        90°
      </text>
    </g>
  );
}

/** 总览图：把整数参数化和单位圆有理点放在同一张证据图中。 */
export function Mg2PythagoreanDiagram() {
  return (
    <Frame
      ariaLabel="勾股定理总览：基本勾股数由互质且奇偶相反的 m,n 参数生成 (m²−n²,2mn,m²+n²)，除以斜边后得到单位圆上的有理点。"
      caption="整数三元组与单位圆有理点是同一参数化的两种坐标表达。"
    >
      <text
        x="360"
        y="32"
        textAnchor="middle"
        fontSize="16"
        fontWeight="700"
        fill={primary}
      >
        一条参数，连接整数三角形与圆
      </text>
      <text x="360" y="58" textAnchor="middle" fontSize="12" fill={secondary}>
        奇偶性与互质 → 欧几里得参数化 → 单位圆有理点
      </text>
      <Triangle x={74} y={286} scale={20} a={3} b={4} c={5} fill={accent} />
      <text
        x="146"
        y="350"
        textAnchor="middle"
        fontSize="13"
        fontWeight="700"
        fill={accent}
      >
        (3,4,5)
      </text>
      <line
        x1="244"
        y1="220"
        x2="342"
        y2="220"
        stroke={border}
        strokeWidth="3"
      />
      <polygon points="342,220 330,214 330,226" fill={border} />
      <rect
        x="250"
        y="92"
        width="180"
        height="92"
        rx="12"
        fill={warning}
        fillOpacity="0.08"
        stroke={warning}
        strokeOpacity="0.55"
      />
      <text
        x="340"
        y="124"
        textAnchor="middle"
        fontSize="14"
        fontWeight="700"
        fill={warning}
      >
        m=2,n=1
      </text>
      <text
        x="340"
        y="152"
        textAnchor="middle"
        fontSize="13"
        fontFamily="monospace"
        fill={primary}
      >
        m²−n², 2mn, m²+n²
      </text>
      <text x="340" y="174" textAnchor="middle" fontSize="11" fill={secondary}>
        互质且一奇一偶
      </text>
      <circle
        cx="562"
        cy="220"
        r="104"
        fill="none"
        stroke={success}
        strokeWidth="2"
      />
      <line
        x1="458"
        y1="220"
        x2="666"
        y2="220"
        stroke={border}
        strokeWidth="1"
      />
      <line
        x1="562"
        y1="116"
        x2="562"
        y2="324"
        stroke={border}
        strokeWidth="1"
      />
      <circle cx="502" cy="268" r="7" fill={success} />
      <text x="502" y="294" textAnchor="middle" fontSize="12" fill={success}>
        (3/5,4/5)
      </text>
      <text
        x="562"
        y="354"
        textAnchor="middle"
        fontSize="13"
        fontWeight="700"
        fill={success}
      >
        x²+y²=1
      </text>
      <text x="562" y="376" textAnchor="middle" fontSize="12" fill={secondary}>
        (a/c,b/c)
      </text>
    </Frame>
  );
}

/** 交互实验：切换参数，检查三元组、面积和单位圆点是否同步变化。 */
export function Mg2PythagoreanLab() {
  const [pair, setPair] = useState<[number, number]>([2, 1]);
  const [m, n] = pair;
  const a = m * m - n * n;
  const b = 2 * m * n;
  const c = m * m + n * n;
  const area = (a * b) / 2;
  const x = round(a / c);
  const y = round(b / c);
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div
        data-visual-kind="pythagorean-parameter-lab"
        className="overflow-hidden rounded-card border border-border bg-elevated p-5"
      >
        <div className="mb-4 flex flex-wrap items-center justify-center gap-2">
          {[
            [[2, 1], "m=2,n=1"],
            [[3, 2], "m=3,n=2"],
            [[4, 1], "m=4,n=1"],
          ].map(([value, label]) => {
            const selected =
              pair[0] === (value as number[])[0] &&
              pair[1] === (value as number[])[1];
            return (
              <button
                key={String(label)}
                type="button"
                aria-pressed={selected}
                onClick={() => setPair(value as [number, number])}
                className={`min-h-11 rounded-full border px-4 py-2 text-sm ${selected ? "border-accent bg-accent/10 text-accent" : "border-border text-secondary"}`}
              >
                {label}
              </button>
            );
          })}
          <button
            type="button"
            onClick={() => setPair([2, 1])}
            className="min-h-11 rounded-full border border-border px-4 py-2 text-sm text-secondary"
          >
            重置
          </button>
        </div>
        <svg
          viewBox="0 0 720 420"
          role="img"
          aria-label={`勾股参数实验。当前 m=${m}, n=${n}，生成三元组 (${a},${b},${c})，面积为 ${area}，单位圆点为 (${x},${y})。`}
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text
            x="360"
            y="32"
            textAnchor="middle"
            fontSize="16"
            fontWeight="700"
            fill={primary}
          >
            改变参数，三角形和圆点一起移动
          </text>
          <text
            x="360"
            y="58"
            textAnchor="middle"
            fontSize="12"
            fill={secondary}
          >
            a=m²−n²，b=2mn，c=m²+n²；m,n 互质且一奇一偶
          </text>
          <Triangle
            x={86}
            y={300}
            scale={Math.min(24, 150 / Math.max(a, b))}
            a={a}
            b={b}
            c={c}
            fill={accent}
          />
          <rect
            x="308"
            y="106"
            width="190"
            height="222"
            rx="12"
            fill={warning}
            fillOpacity="0.07"
            stroke={warning}
            strokeOpacity="0.5"
          />
          <text
            x="403"
            y="138"
            textAnchor="middle"
            fontSize="14"
            fontWeight="700"
            fill={warning}
          >
            整数检查
          </text>
          <text
            x="403"
            y="178"
            textAnchor="middle"
            fontSize="14"
            fontFamily="monospace"
            fill={primary}
          >
            ({a},{b},{c})
          </text>
          <text
            x="403"
            y="216"
            textAnchor="middle"
            fontSize="13"
            fill={primary}
          >
            {a}²+{b}²={c}²
          </text>
          <text
            x="403"
            y="252"
            textAnchor="middle"
            fontSize="13"
            fill={primary}
          >
            面积={area}
          </text>
          <text
            x="403"
            y="292"
            textAnchor="middle"
            fontSize="12"
            fill={success}
          >
            满足参数条件
          </text>
          <circle
            cx="598"
            cy="214"
            r="84"
            fill="none"
            stroke={success}
            strokeWidth="2"
          />
          <line
            x1="514"
            y1="214"
            x2="682"
            y2="214"
            stroke={border}
            strokeWidth="1"
          />
          <line
            x1="598"
            y1="130"
            x2="598"
            y2="298"
            stroke={border}
            strokeWidth="1"
          />
          <circle
            cx={round(598 + x * 84)}
            cy={round(214 - y * 84)}
            r="8"
            fill={success}
          />
          <text
            x="598"
            y="330"
            textAnchor="middle"
            fontSize="12"
            fill={secondary}
          >
            ({x},{y})=(a/c,b/c)
          </text>
          <text x="360" y="376" textAnchor="middle" fontSize="12" fill={danger}>
            重置回 (3,4,5)，再检查平方和与圆方程
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        切换互质且奇偶相反的参数；重置回最小基本勾股数。
      </figcaption>
    </figure>
  );
}

export function Mg2PythagoreanParityDiagram() {
  return (
    <Frame
      ariaLabel="基本勾股数奇偶性图：两直角边不能同偶，因为会有公共因子 2；也不能同奇，因为两个奇数平方模 4 都为 1，和为 2 而平方不可能模 4 余 2，因此两直角边一奇一偶、斜边为奇数。"
      caption="模 4 排除同奇，基本性排除同偶，剩下的就是一奇一偶。"
    >
      <text
        x="360"
        y="32"
        textAnchor="middle"
        fontSize="16"
        fontWeight="700"
        fill={primary}
      >
        基本勾股数先过奇偶性筛选
      </text>
      <text x="360" y="58" textAnchor="middle" fontSize="12" fill={secondary}>
        a²+b²=c²，且 gcd(a,b,c)=1
      </text>
      <rect
        x="50"
        y="94"
        width="190"
        height="230"
        rx="12"
        fill={danger}
        fillOpacity="0.07"
        stroke={danger}
        strokeOpacity="0.5"
      />
      <text
        x="145"
        y="130"
        textAnchor="middle"
        fontSize="14"
        fontWeight="700"
        fill={danger}
      >
        同偶：淘汰
      </text>
      <text x="145" y="170" textAnchor="middle" fontSize="14" fill={primary}>
        a=2u，b=2v
      </text>
      <text x="145" y="206" textAnchor="middle" fontSize="13" fill={primary}>
        c 也为偶数
      </text>
      <text x="145" y="248" textAnchor="middle" fontSize="12" fill={secondary}>
        三者有公共因子 2
      </text>
      <text
        x="145"
        y="286"
        textAnchor="middle"
        fontSize="12"
        fontWeight="700"
        fill={danger}
      >
        不是基本勾股数
      </text>
      <rect
        x="265"
        y="94"
        width="190"
        height="230"
        rx="12"
        fill={warning}
        fillOpacity="0.07"
        stroke={warning}
        strokeOpacity="0.5"
      />
      <text
        x="360"
        y="130"
        textAnchor="middle"
        fontSize="14"
        fontWeight="700"
        fill={warning}
      >
        同奇：淘汰
      </text>
      <text x="360" y="170" textAnchor="middle" fontSize="14" fill={primary}>
        a²≡b²≡1 (mod 4)
      </text>
      <text x="360" y="206" textAnchor="middle" fontSize="13" fill={primary}>
        a²+b²≡2 (mod 4)
      </text>
      <text x="360" y="248" textAnchor="middle" fontSize="12" fill={secondary}>
        平方不可能余 2
      </text>
      <text
        x="360"
        y="286"
        textAnchor="middle"
        fontSize="12"
        fontWeight="700"
        fill={warning}
      >
        矛盾
      </text>
      <rect
        x="480"
        y="94"
        width="190"
        height="230"
        rx="12"
        fill={success}
        fillOpacity="0.07"
        stroke={success}
        strokeOpacity="0.5"
      />
      <text
        x="575"
        y="130"
        textAnchor="middle"
        fontSize="14"
        fontWeight="700"
        fill={success}
      >
        留下：一奇一偶
      </text>
      <text x="575" y="170" textAnchor="middle" fontSize="14" fill={primary}>
        a 奇，b 偶
      </text>
      <text x="575" y="206" textAnchor="middle" fontSize="13" fill={primary}>
        c² 为奇数
      </text>
      <text x="575" y="248" textAnchor="middle" fontSize="12" fill={secondary}>
        所以 c 也为奇数
      </text>
      <text
        x="575"
        y="286"
        textAnchor="middle"
        fontSize="12"
        fontWeight="700"
        fill={success}
      >
        参数化入口
      </text>
      <rect
        x="122"
        y="356"
        width="476"
        height="34"
        rx="8"
        fill={accent}
        fillOpacity="0.07"
        stroke={accent}
        strokeOpacity="0.4"
      />
      <text
        x="360"
        y="378"
        textAnchor="middle"
        fontSize="12"
        fontWeight="700"
        fill={accent}
      >
        先用模 4 排除不可能，再进入因数结构
      </text>
    </Frame>
  );
}

export function Mg2PythagoreanParameterDiagram() {
  return (
    <Frame
      ariaLabel="欧几里得参数化证明图：平方差得到 B²=AC，基本勾股数使 A 与 C 互质，质因数分解唯一性迫使 A=n²、C=m²，最后生成 (m²−n²,2mn,m²+n²)。"
      caption="平方差把勾股方程变成互质乘积；唯一分解再把乘积拆回两个平方。"
    >
      <text
        x="360"
        y="32"
        textAnchor="middle"
        fontSize="16"
        fontWeight="700"
        fill={primary}
      >
        从平方差到欧几里得参数化
      </text>
      <rect
        x="44"
        y="102"
        width="188"
        height="192"
        rx="12"
        fill={accent}
        fillOpacity="0.07"
        stroke={accent}
        strokeOpacity="0.5"
      />
      <text
        x="138"
        y="136"
        textAnchor="middle"
        fontSize="14"
        fontWeight="700"
        fill={accent}
      >
        平方差
      </text>
      <text
        x="138"
        y="178"
        textAnchor="middle"
        fontSize="15"
        fontFamily="monospace"
        fill={primary}
      >
        b²=(c−a)(c+a)
      </text>
      <text
        x="138"
        y="216"
        textAnchor="middle"
        fontSize="14"
        fontFamily="monospace"
        fill={primary}
      >
        B²=AC
      </text>
      <text x="138" y="258" textAnchor="middle" fontSize="12" fill={secondary}>
        减去已知因子 2
      </text>
      <line
        x1="258"
        y1="196"
        x2="330"
        y2="196"
        stroke={border}
        strokeWidth="3"
      />
      <polygon points="330,196 318,190 318,202" fill={border} />
      <rect
        x="344"
        y="102"
        width="178"
        height="192"
        rx="12"
        fill={warning}
        fillOpacity="0.07"
        stroke={warning}
        strokeOpacity="0.5"
      />
      <text
        x="433"
        y="136"
        textAnchor="middle"
        fontSize="14"
        fontWeight="700"
        fill={warning}
      >
        互质 + 唯一分解
      </text>
      <text x="433" y="178" textAnchor="middle" fontSize="14" fill={primary}>
        gcd(A,C)=1
      </text>
      <text x="433" y="216" textAnchor="middle" fontSize="14" fill={primary}>
        A=n²，C=m²
      </text>
      <text x="433" y="258" textAnchor="middle" fontSize="12" fill={secondary}>
        质因数指数分别为偶数
      </text>
      <line
        x1="548"
        y1="196"
        x2="620"
        y2="196"
        stroke={border}
        strokeWidth="3"
      />
      <polygon points="620,196 608,190 608,202" fill={border} />
      <rect
        x="624"
        y="102"
        width="72"
        height="192"
        rx="12"
        fill={success}
        fillOpacity="0.07"
        stroke={success}
        strokeOpacity="0.5"
      />
      <text
        x="660"
        y="136"
        textAnchor="middle"
        fontSize="13"
        fontWeight="700"
        fill={success}
      >
        输出
      </text>
      <text x="660" y="182" textAnchor="middle" fontSize="13" fill={primary}>
        m²−n²
      </text>
      <text x="660" y="218" textAnchor="middle" fontSize="13" fill={primary}>
        2mn
      </text>
      <text x="660" y="254" textAnchor="middle" fontSize="13" fill={primary}>
        m²+n²
      </text>
      <rect
        x="106"
        y="344"
        width="506"
        height="44"
        rx="9"
        fill={danger}
        fillOpacity="0.07"
        stroke={danger}
        strokeOpacity="0.4"
      />
      <text
        x="360"
        y="372"
        textAnchor="middle"
        fontSize="12"
        fontWeight="700"
        fill={danger}
      >
        m&gt;n&gt;0，gcd(m,n)=1，m,n 一奇一偶
      </text>
    </Frame>
  );
}

export function Mg2PythagoreanCircleDiagram() {
  return (
    <Frame
      ariaLabel="单位圆参数化图：固定单位圆点 P=(-1,0)，过 P 的有理斜率直线 y=t(x+1) 与圆的第二交点为 ((1−t²)/(1+t²),2t/(1+t²))，因此有理参数产生有理点。"
      caption="一条过固定有理点的直线，把有理斜率一一送到单位圆上的第二个有理点。"
    >
      <text
        x="360"
        y="32"
        textAnchor="middle"
        fontSize="16"
        fontWeight="700"
        fill={primary}
      >
        单位圆上的有理点：转动一条直线
      </text>
      <text x="360" y="58" textAnchor="middle" fontSize="12" fill={secondary}>
        固定 P=(-1,0)，用斜率 t 参数化另一交点 Q
      </text>
      <circle
        cx="240"
        cy="222"
        r="112"
        fill={accent}
        fillOpacity="0.04"
        stroke={accent}
        strokeWidth="2"
      />
      <line
        x1="128"
        y1="222"
        x2="352"
        y2="222"
        stroke={border}
        strokeWidth="1"
      />
      <line
        x1="240"
        y1="110"
        x2="240"
        y2="334"
        stroke={border}
        strokeWidth="1"
      />
      <circle cx="128" cy="222" r="8" fill={warning} />
      <text x="128" y="250" textAnchor="middle" fontSize="12" fill={warning}>
        P=(-1,0)
      </text>
      <circle cx="323" cy="164" r="8" fill={success} />
      <text x="323" y="148" textAnchor="middle" fontSize="12" fill={success}>
        Q(t)
      </text>
      <line
        x1="128"
        y1="222"
        x2="323"
        y2="164"
        stroke={success}
        strokeWidth="2"
      />
      <text x="220" y="184" textAnchor="middle" fontSize="12" fill={success}>
        y=t(x+1)
      </text>
      <rect
        x="404"
        y="108"
        width="270"
        height="222"
        rx="12"
        fill={success}
        fillOpacity="0.07"
        stroke={success}
        strokeOpacity="0.5"
      />
      <text
        x="539"
        y="142"
        textAnchor="middle"
        fontSize="14"
        fontWeight="700"
        fill={success}
      >
        第二交点
      </text>
      <text
        x="539"
        y="184"
        textAnchor="middle"
        fontSize="14"
        fontFamily="monospace"
        fill={primary}
      >
        x=(1−t²)/(1+t²)
      </text>
      <text
        x="539"
        y="220"
        textAnchor="middle"
        fontSize="14"
        fontFamily="monospace"
        fill={primary}
      >
        y=2t/(1+t²)
      </text>
      <text x="539" y="266" textAnchor="middle" fontSize="12" fill={secondary}>
        t 有理 ⇒ x,y 有理
      </text>
      <text x="539" y="298" textAnchor="middle" fontSize="12" fill={secondary}>
        t=n/m ⇒ 勾股参数公式
      </text>
      <rect
        x="124"
        y="354"
        width="472"
        height="36"
        rx="8"
        fill={danger}
        fillOpacity="0.07"
        stroke={danger}
        strokeOpacity="0.4"
      />
      <text
        x="360"
        y="377"
        textAnchor="middle"
        fontSize="12"
        fontWeight="700"
        fill={danger}
      >
        固定点 P 需要在反向覆盖时单独补回
      </text>
    </Frame>
  );
}
