"use client";

import { useState, type ReactNode } from "react";

const accent = "var(--accent)";
const success = "var(--success)";
const warning = "var(--warning)";
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

/** 把指数从相乘次数扩张为保持运算法则的阶梯。 */
export function Mg2ExponentLadderDiagram() {
  return (
    <Frame
      ariaLabel="指数扩张阶梯图：正整数指数可以理解为重复相乘，指数运算法则继续推出零次方等于一、负一次方等于倒数，分数次方需要根和数域条件。"
      caption="先保持 a 的 s 次方乘 a 的 t 次方等于 a 的 s 加 t 次方，再扩张指数含义。"
    >
      <text
        x="360"
        y="30"
        textAnchor="middle"
        fontSize="18"
        fontWeight="700"
        fill={primary}
      >
        指数扩张：从“几次相乘”走向相容规则
      </text>
      <rect
        x="42"
        y="92"
        width="154"
        height="150"
        rx="14"
        fill={accent}
        fillOpacity="0.1"
        stroke={accent}
      />
      <rect
        x="214"
        y="92"
        width="154"
        height="150"
        rx="14"
        fill={success}
        fillOpacity="0.1"
        stroke={success}
      />
      <rect
        x="386"
        y="92"
        width="154"
        height="150"
        rx="14"
        fill={warning}
        fillOpacity="0.1"
        stroke={warning}
      />
      <rect
        x="558"
        y="92"
        width="120"
        height="150"
        rx="14"
        fill={border}
        fillOpacity="0.2"
        stroke={border}
      />
      <text
        x="119"
        y="126"
        textAnchor="middle"
        fontSize="15"
        fontWeight="700"
        fill={accent}
      >
        {"n > 0"}
      </text>
      <text x="119" y="162" textAnchor="middle" fontSize="14" fill={primary}>
        重复相乘
      </text>
      <text x="119" y="198" textAnchor="middle" fontSize="14" fill={primary}>
        aⁿ
      </text>
      <text
        x="291"
        y="126"
        textAnchor="middle"
        fontSize="15"
        fontWeight="700"
        fill={success}
      >
        n = 0
      </text>
      <text x="291" y="162" textAnchor="middle" fontSize="14" fill={primary}>
        a⁰ = 1
      </text>
      <text x="291" y="198" textAnchor="middle" fontSize="14" fill={secondary}>
        保持相加法则
      </text>
      <text
        x="463"
        y="126"
        textAnchor="middle"
        fontSize="15"
        fontWeight="700"
        fill={warning}
      >
        {"n < 0"}
      </text>
      <text x="463" y="162" textAnchor="middle" fontSize="14" fill={primary}>
        a⁻ⁿ = 1/aⁿ
      </text>
      <text x="463" y="198" textAnchor="middle" fontSize="14" fill={secondary}>
        乘法逆元
      </text>
      <text
        x="618"
        y="126"
        textAnchor="middle"
        fontSize="15"
        fontWeight="700"
        fill={primary}
      >
        p/q
      </text>
      <text x="618" y="162" textAnchor="middle" fontSize="14" fill={primary}>
        根与数域
      </text>
      <text x="618" y="198" textAnchor="middle" fontSize="14" fill={secondary}>
        需要条件
      </text>
      <Arrow x1={198} y1={166} x2={208} y2={166} color={accent} />
      <Arrow x1={370} y1={166} x2={380} y2={166} color={success} />
      <Arrow x1={542} y1={166} x2={552} y2={166} color={warning} />
      <rect
        x="144"
        y="292"
        width="432"
        height="64"
        rx="12"
        fill={border}
        fillOpacity="0.18"
        stroke={border}
      />
      <text
        x="360"
        y="318"
        textAnchor="middle"
        fontSize="15"
        fontWeight="700"
        fill={primary}
      >
        aˢ · aᵗ = aˢ⁺ᵗ
      </text>
      <text x="360" y="342" textAnchor="middle" fontSize="13" fill={secondary}>
        新定义必须与旧公式相容
      </text>
    </Frame>
  );
}

/** 展示 f'=f 如何逐次锁定 1/n! 系数。 */
export function Mg2SeriesCoefficientDiagram() {
  return (
    <Frame
      ariaLabel="指数函数系数图：f 等于 f 撇且 f(0) 等于1，比较幂级数同次幂得到 a(n+1) 等于 a(n) 除以 n+1，系数依次为1、1、二分之一、六分之一。"
      caption="系数递推像多米诺骨牌：初值a₀=1倒下后，所有aₙ都被唯一确定。"
    >
      <text
        x="360"
        y="30"
        textAnchor="middle"
        fontSize="18"
        fontWeight="700"
        fill={primary}
      >
        f′ = f：系数递推锁定指数函数
      </text>
      <rect
        x="50"
        y="88"
        width="210"
        height="112"
        rx="14"
        fill={accent}
        fillOpacity="0.1"
        stroke={accent}
      />
      <text
        x="155"
        y="124"
        textAnchor="middle"
        fontSize="18"
        fontWeight="700"
        fill={accent}
      >
        f(x)=Σaₙxⁿ
      </text>
      <text x="155" y="158" textAnchor="middle" fontSize="15" fill={primary}>
        f′(x)=f(x)
      </text>
      <text x="155" y="184" textAnchor="middle" fontSize="13" fill={secondary}>
        f(0)=1 → a₀=1
      </text>
      <Arrow x1={270} y1={144} x2={326} y2={144} color={accent} />
      <rect
        x="334"
        y="88"
        width="336"
        height="112"
        rx="14"
        fill={success}
        fillOpacity="0.1"
        stroke={success}
      />
      <text
        x="502"
        y="124"
        textAnchor="middle"
        fontSize="18"
        fontWeight="700"
        fill={success}
      >
        (n+1)aₙ₊₁ = aₙ
      </text>
      <text x="502" y="158" textAnchor="middle" fontSize="15" fill={primary}>
        aₙ₊₁ = aₙ/(n+1)
      </text>
      <text x="502" y="184" textAnchor="middle" fontSize="13" fill={secondary}>
        比较同次幂系数
      </text>
      {["a₀=1", "a₁=1", "a₂=1/2!", "a₃=1/3!", "aₙ=1/n!"].map((label, index) => {
        const x = 92 + index * 126;
        return (
          <g key={`coefficient-${index}`}>
            <rect
              x={x}
              y="264"
              width="100"
              height="54"
              rx="10"
              fill={index === 4 ? warning : border}
              fillOpacity={index === 4 ? 0.2 : 0.24}
              stroke={index === 4 ? warning : border}
            />
            <text
              x={x + 50}
              y="297"
              textAnchor="middle"
              fontSize="14"
              fontWeight="700"
              fill={primary}
            >
              {label}
            </text>
            {index < 4 ? (
              <Arrow
                x1={x + 102}
                y1={291}
                x2={x + 120}
                y2={291}
                color={secondary}
              />
            ) : null}
          </g>
        );
      })}
      <text x="360" y="370" textAnchor="middle" fontSize="14" fill={primary}>
        eˣ = 1 + x + x²/2! + x³/3! + ⋯
      </text>
    </Frame>
  );
}

/** 把复指数级数拆成偶数次余弦项与奇数次正弦项。 */
export function Mg2EulerBridgeDiagram() {
  return (
    <Frame
      ariaLabel="欧拉公式桥梁图：e 的 i theta 次方按偶数项和奇数项拆分，偶数项组成余弦，奇数项提取 i 后组成正弦。"
      caption="共同的幂级数语言把指数函数的复输入桥接到三角函数。"
    >
      <text
        x="360"
        y="30"
        textAnchor="middle"
        fontSize="18"
        fontWeight="700"
        fill={primary}
      >
        欧拉公式：一条级数，两座桥墩
      </text>
      <rect
        x="48"
        y="92"
        width="190"
        height="190"
        rx="14"
        fill={accent}
        fillOpacity="0.1"
        stroke={accent}
      />
      <rect
        x="266"
        y="92"
        width="190"
        height="190"
        rx="14"
        fill={warning}
        fillOpacity="0.1"
        stroke={warning}
      />
      <rect
        x="484"
        y="92"
        width="188"
        height="190"
        rx="14"
        fill={success}
        fillOpacity="0.1"
        stroke={success}
      />
      <text
        x="143"
        y="126"
        textAnchor="middle"
        fontSize="16"
        fontWeight="700"
        fill={accent}
      >
        eⁱᶿ 展开
      </text>
      <text x="143" y="164" textAnchor="middle" fontSize="14" fill={primary}>
        1 + iθ + (iθ)²/2!
      </text>
      <text x="143" y="194" textAnchor="middle" fontSize="14" fill={primary}>
        + (iθ)³/3! + ⋯
      </text>
      <text
        x="361"
        y="126"
        textAnchor="middle"
        fontSize="16"
        fontWeight="700"
        fill={warning}
      >
        偶 / 奇拆分
      </text>
      <text x="361" y="164" textAnchor="middle" fontSize="14" fill={primary}>
        偶数次 → 实部
      </text>
      <text x="361" y="194" textAnchor="middle" fontSize="14" fill={primary}>
        奇数次 → i × 实数
      </text>
      <text x="361" y="234" textAnchor="middle" fontSize="14" fill={secondary}>
        i⁰, i¹, i², i³ 循环
      </text>
      <text
        x="578"
        y="126"
        textAnchor="middle"
        fontSize="16"
        fontWeight="700"
        fill={success}
      >
        三角函数
      </text>
      <text x="578" y="164" textAnchor="middle" fontSize="14" fill={primary}>
        cos θ + i sin θ
      </text>
      <text x="578" y="204" textAnchor="middle" fontSize="14" fill={primary}>
        eⁱᶿ = cos θ + i sin θ
      </text>
      <Arrow x1={244} y1={186} x2={258} y2={186} color={accent} />
      <Arrow x1={462} y1={186} x2={476} y2={186} color={warning} />
      <text x="360" y="350" textAnchor="middle" fontSize="15" fill={primary}>
        θ=π → cosπ+i sinπ = −1 → eⁱᵖⁱ+1=0
      </text>
    </Frame>
  );
}

/** 用单位圆解释复指数的幅角、旋转和2π周期。 */
export function Mg2UnitCircleDiagram() {
  const angle = Math.PI / 3;
  const pointX = 242 + 126 * Math.cos(angle);
  const pointY = 230 - 126 * Math.sin(angle);
  return (
    <Frame
      ariaLabel="单位圆图：复平面原点为中心，角度 theta 的点坐标是 cos theta 和 sin theta，复指数 e 的 i theta 次方表示从正实轴旋转 theta。"
      caption="单位圆把抽象的复指数读成一个点：实部是横坐标，虚部是纵坐标，角度增加2π回到原点。"
    >
      <text
        x="360"
        y="30"
        textAnchor="middle"
        fontSize="18"
        fontWeight="700"
        fill={primary}
      >
        单位圆：复指数就是旋转编码
      </text>
      <line
        x1="82"
        y1="230"
        x2="408"
        y2="230"
        stroke={border}
        strokeWidth="2"
      />
      <line
        x1="242"
        y1="70"
        x2="242"
        y2="388"
        stroke={border}
        strokeWidth="2"
      />
      <circle
        cx="242"
        cy="230"
        r="126"
        fill={accent}
        fillOpacity="0.05"
        stroke={accent}
        strokeWidth="3"
      />
      <line
        x1="242"
        y1="230"
        x2={pointX}
        y2={pointY}
        stroke={warning}
        strokeWidth="3"
      />
      <circle cx={pointX} cy={pointY} r="8" fill={warning} />
      <path
        d={`M 300 230 A 58 58 0 0 0 ${242 + 58 * Math.cos(angle)} ${230 - 58 * Math.sin(angle)}`}
        fill="none"
        stroke={success}
        strokeWidth="3"
      />
      <text x="420" y="226" fontSize="14" fill={primary}>
        实部：cos θ
      </text>
      <text x="420" y="252" fontSize="14" fill={primary}>
        虚部：sin θ
      </text>
      <text x="420" y="296" fontSize="15" fontWeight="700" fill={accent}>
        eⁱᶿ ↔ (cos θ, sin θ)
      </text>
      <text x="420" y="330" fontSize="14" fill={secondary}>
        θ + 2π：绕一圈，回到同一点
      </text>
      <text x="242" y="416" textAnchor="middle" fontSize="14" fill={primary}>
        θ=π 时位于 −1，得到欧拉恒等式
      </text>
    </Frame>
  );
}

type LabMode = "expansion" | "bridge" | "circle";

/** 交互切换指数扩张、级数桥梁和单位圆几何三种解释。 */
export function Mg2EulerLab() {
  const [mode, setMode] = useState<LabMode>("circle");
  const labels: Record<LabMode, string> = {
    expansion: "指数扩张",
    bridge: "偶奇桥梁",
    circle: "单位圆旋转",
  };
  return (
    <section
      aria-label="欧拉公式实验"
      className="not-prose my-8 rounded-card border border-border bg-elevated p-5"
    >
      <div>
        <p className="m-0 text-sm font-semibold uppercase tracking-[0.18em] text-secondary">
          Euler Formula Evidence Lab
        </p>
        <h3 className="m-0 mt-1 text-xl font-semibold text-primary">
          从定义切换到几何含义
        </h3>
      </div>
      <div
        className="mt-4 flex flex-wrap gap-2"
        role="tablist"
        aria-label="欧拉公式实验模式"
      >
        {(Object.keys(labels) as LabMode[]).map((key) => (
          <button
            key={key}
            type="button"
            role="tab"
            aria-selected={mode === key}
            aria-pressed={mode === key}
            onClick={() => setMode(key)}
            className={`min-h-11 rounded-full border px-4 py-2 text-sm font-semibold transition ${mode === key ? "border-accent bg-accent/15 text-primary" : "border-border text-secondary hover:border-accent"}`}
          >
            {labels[key]}
          </button>
        ))}
        <button
          type="button"
          onClick={() => setMode("circle")}
          className="min-h-11 rounded-full border border-border px-4 py-2 text-sm font-semibold text-primary transition hover:border-accent"
        >
          重置实验
        </button>
      </div>
      <div className="mt-3 rounded-card border border-border bg-base p-3">
        {mode === "expansion" ? <Mg2ExponentLadderDiagram /> : null}
        {mode === "bridge" ? <Mg2EulerBridgeDiagram /> : null}
        {mode === "circle" ? <Mg2UnitCircleDiagram /> : null}
      </div>
      <p className="mt-3 mb-0 text-sm leading-6 text-secondary">
        当前证据：
        {mode === "expansion"
          ? "指数扩张必须保持 aˢ·aᵗ=aˢ⁺ᵗ，并明确零、负数和分数条件。"
          : mode === "bridge"
            ? "偶数次项成为余弦，奇数次项提取 i 后成为正弦。"
            : "单位圆把 eⁱᶿ 解释为幅角 θ 的旋转，θ=π 落在 −1。"}
      </p>
    </section>
  );
}
