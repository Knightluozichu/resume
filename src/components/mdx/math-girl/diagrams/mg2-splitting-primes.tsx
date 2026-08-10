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

export function Mg2ComplexPlaneDiagram() {
  return (
    <Frame
      ariaLabel="复平面运算图：向量2加i和1加3i相加得到3加4i；复数乘法则把长度相乘、角度相加，表现为缩放与旋转。"
      caption="同一条规则有两种语言：代数收集实部和虚部，几何执行向量相加或缩放旋转。"
    >
      <text
        x="360"
        y="30"
        textAnchor="middle"
        fontSize="18"
        fontWeight="700"
        fill={primary}
      >
        复数：加法是平行四边形，乘法是缩放旋转
      </text>
      <line
        x1="64"
        y1="270"
        x2="300"
        y2="270"
        stroke={border}
        strokeWidth="1.5"
      />
      <line
        x1="120"
        y1="330"
        x2="120"
        y2="70"
        stroke={border}
        strokeWidth="1.5"
      />
      <Arrow x1={120} y1={270} x2={220} y2={220} color={accent} />
      <Arrow x1={120} y1={270} x2={170} y2={120} color={warning} />
      <Arrow x1={120} y1={270} x2={270} y2={70} color={success} />
      <text x="218" y="214" fontSize="13" fill={accent}>
        2+i
      </text>
      <text x="176" y="118" fontSize="13" fill={warning}>
        1+3i
      </text>
      <text x="260" y="68" fontSize="13" fontWeight="700" fill={success}>
        3+4i
      </text>
      <text x="182" y="310" textAnchor="middle" fontSize="13" fill={secondary}>
        加法：实部、虚部分别相加
      </text>
      <rect
        x="386"
        y="90"
        width="280"
        height="230"
        rx="14"
        fill={warning}
        fillOpacity="0.09"
        stroke={warning}
      />
      <text
        x="526"
        y="132"
        textAnchor="middle"
        fontSize="16"
        fontWeight="700"
        fill={warning}
      >
        乘法的几何规则
      </text>
      <circle
        cx="526"
        cy="210"
        r="58"
        fill="none"
        stroke={border}
        strokeDasharray="5 4"
      />
      <line
        x1="526"
        y1="210"
        x2="584"
        y2="210"
        stroke={accent}
        strokeWidth="3"
      />
      <line
        x1="526"
        y1="210"
        x2="556"
        y2="166"
        stroke={success}
        strokeWidth="3"
      />
      <path
        d="M 557 210 A 31 31 0 0 0 542 183"
        fill="none"
        stroke={success}
        strokeWidth="2"
      />
      <text x="526" y="278" textAnchor="middle" fontSize="14" fill={primary}>
        |zw|=|z||w|，幅角相加
      </text>
      <text x="526" y="302" textAnchor="middle" fontSize="12" fill={secondary}>
        先缩放，再旋转
      </text>
    </Frame>
  );
}

export function Mg2ParityPigeonholeDiagram() {
  const boxes = [
    ["偶, 偶", accent, ["A"]],
    ["偶, 奇", warning, ["D", "E"]],
    ["奇, 偶", success, ["B"]],
    ["奇, 奇", danger, ["C"]],
  ] as const;
  return (
    <Frame
      ariaLabel="鸽笼原理图：五个整数格点被放入横纵坐标奇偶性的四个类别，点D和点E落入同一类，因此它们的中点仍为整数格点。"
      caption="五个点、四个类别：同类碰撞让两个坐标和都成为偶数。"
    >
      <text
        x="360"
        y="30"
        textAnchor="middle"
        fontSize="18"
        fontWeight="700"
        fill={primary}
      >
        五个格点落入四个奇偶笼子
      </text>
      {boxes.map(([label, color, points], index) => {
        const x = 46 + (index % 2) * 320;
        const y = 82 + Math.floor(index / 2) * 118;
        return (
          <g key={`parity-box-${label}`}>
            <rect
              x={x}
              y={y}
              width="272"
              height="88"
              rx="12"
              fill={color}
              fillOpacity="0.1"
              stroke={color}
              strokeWidth="1.5"
            />
            <text
              x={x + 20}
              y={y + 29}
              fontSize="14"
              fontWeight="700"
              fill={color}
            >
              {label}
            </text>
            {points.map((point, pointIndex) => (
              <g key={`parity-${label}-${point}`}>
                <circle
                  cx={x + 130 + pointIndex * 48}
                  cy={y + 48}
                  r="17"
                  fill={point === "D" || point === "E" ? warning : color}
                  fillOpacity="0.75"
                />
                <text
                  x={x + 130 + pointIndex * 48}
                  y={y + 53}
                  textAnchor="middle"
                  fontSize="13"
                  fontWeight="700"
                  fill="white"
                >
                  {point}
                </text>
              </g>
            ))}
          </g>
        );
      })}
      <rect
        x="170"
        y="330"
        width="380"
        height="48"
        rx="12"
        fill={success}
        fillOpacity="0.1"
        stroke={success}
      />
      <text
        x="360"
        y="360"
        textAnchor="middle"
        fontSize="14"
        fontWeight="700"
        fill={success}
      >
        D、E 同类 → 中点坐标的两个分子都是偶数
      </text>
    </Frame>
  );
}

export function Mg2GaussianFactorDiagram() {
  return (
    <Frame
      ariaLabel="高斯整数因式分解图：整数2在整数中不可分，但在高斯整数中等于1加i乘以1减i；负i是单位，所以两个因子只差单位。"
      caption="质数性依赖数系：扩大允许的因子集合后，2 在高斯整数中分裂。"
    >
      <text
        x="360"
        y="30"
        textAnchor="middle"
        fontSize="18"
        fontWeight="700"
        fill={primary}
      >
        2：从整数质数到高斯整数分裂
      </text>
      <rect
        x="42"
        y="98"
        width="170"
        height="160"
        rx="14"
        fill={border}
        fillOpacity="0.16"
        stroke={border}
      />
      <text
        x="127"
        y="140"
        textAnchor="middle"
        fontSize="17"
        fontWeight="700"
        fill={primary}
      >
        ℤ
      </text>
      <text
        x="127"
        y="190"
        textAnchor="middle"
        fontSize="26"
        fontWeight="700"
        fill={accent}
      >
        2
      </text>
      <text x="127" y="228" textAnchor="middle" fontSize="13" fill={secondary}>
        质数，不可分
      </text>
      <Arrow x1={222} y1={177} x2={276} y2={177} color={warning} />
      <rect
        x="290"
        y="98"
        width="386"
        height="160"
        rx="14"
        fill={warning}
        fillOpacity="0.1"
        stroke={warning}
      />
      <text
        x="483"
        y="136"
        textAnchor="middle"
        fontSize="17"
        fontWeight="700"
        fill={warning}
      >
        ℤ[i]
      </text>
      <text
        x="483"
        y="190"
        textAnchor="middle"
        fontSize="22"
        fontWeight="700"
        fill={primary}
      >
        2 = (1+i)(1−i)
      </text>
      <text x="483" y="230" textAnchor="middle" fontSize="13" fill={secondary}>
        两个非单位因子，发生分裂
      </text>
      <rect
        x="108"
        y="312"
        width="504"
        height="54"
        rx="12"
        fill={success}
        fillOpacity="0.1"
        stroke={success}
      />
      <text
        x="360"
        y="335"
        textAnchor="middle"
        fontSize="14"
        fontWeight="700"
        fill={success}
      >
        1−i = −i(1+i)
      </text>
      <text x="360" y="355" textAnchor="middle" fontSize="12" fill={secondary}>
        −i 是单位：旋转因子，不算新的本质分解
      </text>
    </Frame>
  );
}

export function Mg2Mod4ClassificationDiagram() {
  const columns = [
    ["2", "分歧", "2 = −i(1+i)²", warning],
    ["p ≡ 1 (mod 4)", "分裂", "p = a²+b²", success],
    ["p ≡ 3 (mod 4)", "保持不可约", "仍是高斯素数", danger],
  ] as const;
  return (
    <Frame
      ariaLabel="模4质数分类图：2在高斯整数中分歧；模4余1的奇质数分裂为共轭因子；模4余3的奇质数保持高斯素性。"
      caption="模4筛选给出分裂与保持不可约的结构地图；2 是单独的分歧情形。"
    >
      <text
        x="360"
        y="30"
        textAnchor="middle"
        fontSize="18"
        fontWeight="700"
        fill={primary}
      >
        有理质数在 ℤ[i] 中的三种命运
      </text>
      {columns.map(([label, kind, detail, color], index) => {
        const x = 26 + index * 232;
        return (
          <g key={`mod4-${label}`}>
            <rect
              x={x}
              y="88"
              width="202"
              height="224"
              rx="14"
              fill={color}
              fillOpacity="0.1"
              stroke={color}
            />
            <text
              x={x + 101}
              y="132"
              textAnchor="middle"
              fontSize="17"
              fontWeight="700"
              fill={color}
            >
              {label}
            </text>
            <line x1={x + 26} y1="158" x2={x + 176} y2="158" stroke={border} />
            <text
              x={x + 101}
              y="202"
              textAnchor="middle"
              fontSize="18"
              fontWeight="700"
              fill={primary}
            >
              {kind}
            </text>
            <text
              x={x + 101}
              y="246"
              textAnchor="middle"
              fontSize="13"
              fill={secondary}
            >
              {detail}
            </text>
            <text
              x={x + 101}
              y="285"
              textAnchor="middle"
              fontSize="12"
              fill={color}
            >
              {index === 0
                ? "单位因子外的平方"
                : index === 1
                  ? "共轭因子出现"
                  : "平方和不可能余3"}
            </text>
          </g>
        );
      })}
      <text
        x="360"
        y="365"
        textAnchor="middle"
        fontSize="14"
        fontWeight="700"
        fill={warning}
      >
        平方模4只能是0或1，因此两个平方和不可能余3
      </text>
    </Frame>
  );
}

export function Mg2PrimeSplittingLab() {
  const primes = [2, 5, 7, 13, 17, 19, 29] as const;
  const [index, setIndex] = useState(0);
  const prime = primes[index];
  const kind = prime === 2 ? "分歧" : prime % 4 === 1 ? "分裂" : "保持高斯素性";
  const color = prime === 2 ? warning : prime % 4 === 1 ? success : danger;
  const detail =
    prime === 2
      ? "2 = −i(1+i)²"
      : prime % 4 === 1
        ? "存在 p=a²+b²"
        : "不可能成为两个平方和";
  return (
    <section
      className="not-prose my-6 rounded-card border border-border bg-elevated p-5"
      aria-label="质数分裂实验：选择质数，观察它在高斯整数中的命运"
    >
      <div className="mb-4 flex flex-wrap items-baseline justify-between gap-3">
        <div>
          <p className="text-[11px] uppercase tracking-[0.18em] text-secondary">
            Prime Splitting Lab
          </p>
          <h4 className="mt-1 text-[15px] font-semibold text-primary">
            选择质数，检查模4命运
          </h4>
        </div>
        <span className="rounded-control border border-accent px-2 py-1 text-[11px] text-accent">
          可交互
        </span>
      </div>
      <div className="grid gap-5 md:grid-cols-[1fr_230px] md:items-center">
        <svg
          viewBox="0 0 480 260"
          role="img"
          aria-label={`当前质数${prime}，模4余数为${prime % 4}，在高斯整数中属于${kind}。`}
          className="w-full"
        >
          <text
            x="240"
            y="30"
            textAnchor="middle"
            fontSize="18"
            fontWeight="700"
            fill={primary}
          >
            p = {prime}，p mod 4 = {prime % 4}
          </text>
          <circle
            cx="240"
            cy="122"
            r="66"
            fill={color}
            fillOpacity="0.12"
            stroke={color}
            strokeWidth="2"
          />
          <text
            x="240"
            y="116"
            textAnchor="middle"
            fontSize="20"
            fontWeight="700"
            fill={color}
          >
            {kind}
          </text>
          <text
            x="240"
            y="142"
            textAnchor="middle"
            fontSize="13"
            fill={primary}
          >
            {detail}
          </text>
          <line
            x1="82"
            y1="218"
            x2="398"
            y2="218"
            stroke={border}
            strokeWidth="2"
          />
          {[0, 1, 2, 3].map((remainder) => {
            const x = 82 + remainder * 105;
            const active = prime % 4 === remainder;
            return (
              <g key={`remainder-${remainder}`}>
                <circle
                  cx={x}
                  cy="218"
                  r={active ? "9" : "5"}
                  fill={active ? color : border}
                />
                <text
                  x={x}
                  y="244"
                  textAnchor="middle"
                  fontSize="12"
                  fill={active ? color : secondary}
                >
                  {remainder}
                </text>
              </g>
            );
          })}
          <text
            x="240"
            y="194"
            textAnchor="middle"
            fontSize="12"
            fill={secondary}
          >
            模4余数轴
          </text>
        </svg>
        <div className="space-y-3">
          <label
            className="block text-sm text-primary"
            htmlFor="mg2-prime-choice"
          >
            选择一个样例质数
          </label>
          <select
            id="mg2-prime-choice"
            className="min-h-[44px] w-full rounded-control border border-border bg-background px-3 py-2 text-sm text-primary"
            value={index}
            onChange={(event) => setIndex(Number(event.target.value))}
            aria-label="选择质数样例"
          >
            {primes.map((value, optionIndex) => (
              <option key={`prime-option-${value}`} value={optionIndex}>
                {value}
              </option>
            ))}
          </select>
          <p className="text-sm leading-6 text-secondary">
            余数轴是筛选器，不替代完整证明；余1方向还需要费马二平方定理等结果。
          </p>
          <button
            type="button"
            className="rounded-control border border-border px-3 py-2 text-sm text-primary transition hover:border-accent hover:text-accent"
            onClick={() => setIndex(0)}
          >
            重置实验
          </button>
        </div>
      </div>
    </section>
  );
}
