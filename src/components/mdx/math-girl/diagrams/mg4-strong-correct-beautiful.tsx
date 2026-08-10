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

/** 展示四变量的16行有限例子与删除一条子句后的冗余检查。 */
export function Mg4SatTableDiagram() {
  const rows = [
    { bits: "0000", failed: "P1" },
    { bits: "0001", failed: "P2" },
    { bits: "0010", failed: "P3" },
    { bits: "0011", failed: "P4" },
    { bits: "0100", failed: "P5" },
    { bits: "0101", failed: "P6" },
    { bits: "0110", failed: "P7" },
    { bits: "0111", failed: "P8" },
  ];
  return (
    <Frame
      ariaLabel="SAT真值表图：四个布尔变量有16种分配，示意行各恰好违反一个P条件；删除任意一个子句后可以找到满足剩余条件的行。"
      caption="有限例子可以完整覆盖四变量分配；删除一条子句的测试说明八个条件没有冗余。"
    >
      <text
        x="360"
        y="30"
        textAnchor="middle"
        fontSize="17"
        fontWeight="700"
        fill={primary}
      >
        16 行：不可满足，但没有冗余
      </text>
      <text x="360" y="55" textAnchor="middle" fontSize="13" fill={secondary}>
        2⁴=16；每行都恰好有一个条件为假
      </text>
      <rect
        x="42"
        y="84"
        width="300"
        height="260"
        rx="14"
        fill={danger}
        fillOpacity="0.08"
        stroke={danger}
      />
      <text
        x="192"
        y="116"
        textAnchor="middle"
        fontSize="15"
        fontWeight="700"
        fill={danger}
      >
        Sixteen-Assignment Table
      </text>
      {rows.map((row, index) => (
        <g key={row.bits}>
          <text x="88" y={148 + index * 23} fontSize="13" fill={primary}>
            {row.bits}
          </text>
          <rect
            x="174"
            y={133 + index * 23}
            width="112"
            height="20"
            rx="5"
            fill={danger}
            fillOpacity="0.18"
          />
          <text
            x="230"
            y={148 + index * 23}
            textAnchor="middle"
            fontSize="12"
            fill={danger}
          >
            违反 {row.failed}
          </text>
        </g>
      ))}
      <rect
        x="378"
        y="84"
        width="300"
        height="260"
        rx="14"
        fill={success}
        fillOpacity="0.08"
        stroke={success}
      />
      <text
        x="528"
        y="116"
        textAnchor="middle"
        fontSize="15"
        fontWeight="700"
        fill={success}
      >
        Remove-One-Clause Test
      </text>
      <text x="408" y="164" fontSize="13" fill={primary}>
        删掉任意一个 Pᵢ
      </text>
      <Arrow x1={528} y1={180} x2={528} y2={220} color={success} />
      <text
        x="528"
        y="254"
        textAnchor="middle"
        fontSize="15"
        fontWeight="700"
        fill={success}
      >
        剩余七项可满足
      </text>
      <text x="528" y="294" textAnchor="middle" fontSize="13" fill={secondary}>
        极小不可满足结构
      </text>
      <text x="360" y="380" textAnchor="middle" fontSize="13" fill={primary}>
        16 行是有限例子，不是一般 SAT 的复杂度证明
      </text>
    </Frame>
  );
}

/** 把随机翻转显示为布尔立方体上的局部边移动，并标注汉明距离。 */
export function Mg4WalkDiagram() {
  return (
    <Frame
      ariaLabel="随机漫步图：分配是n维布尔立方体的顶点，相邻点只差一个变量；距离m的翻转沿m减1或m加1移动。"
      caption="算法不知道正确分配在哪里，但分析者固定一个 a*，用汉明距离把高维路径投影到一维。"
    >
      <text
        x="360"
        y="30"
        textAnchor="middle"
        fontSize="17"
        fontWeight="700"
        fill={primary}
      >
        RANDOM-WALK-3-SAT：在分配空间走一步
      </text>
      <text x="360" y="55" textAnchor="middle" fontSize="13" fill={secondary}>
        n维布尔立方体：翻转一个变量就是沿一条边移动
      </text>
      <line
        x1="160"
        y1="246"
        x2="300"
        y2="164"
        stroke={border}
        strokeWidth="2"
      />
      <line
        x1="160"
        y1="246"
        x2="300"
        y2="328"
        stroke={border}
        strokeWidth="2"
      />
      <line
        x1="300"
        y1="164"
        x2="440"
        y2="246"
        stroke={border}
        strokeWidth="2"
      />
      <line
        x1="300"
        y1="328"
        x2="440"
        y2="246"
        stroke={border}
        strokeWidth="2"
      />
      <line
        x1="440"
        y1="246"
        x2="580"
        y2="164"
        stroke={success}
        strokeWidth="4"
      />
      <line
        x1="440"
        y1="246"
        x2="580"
        y2="328"
        stroke={danger}
        strokeWidth="3"
      />
      <circle
        cx="160"
        cy="246"
        r="26"
        fill={accent}
        fillOpacity="0.2"
        stroke={accent}
      />
      <circle
        cx="300"
        cy="164"
        r="26"
        fill={warning}
        fillOpacity="0.2"
        stroke={warning}
      />
      <circle
        cx="300"
        cy="328"
        r="26"
        fill={warning}
        fillOpacity="0.2"
        stroke={warning}
      />
      <circle
        cx="440"
        cy="246"
        r="26"
        fill={warning}
        fillOpacity="0.2"
        stroke={warning}
      />
      <circle
        cx="580"
        cy="164"
        r="26"
        fill={success}
        fillOpacity="0.2"
        stroke={success}
      />
      <circle
        cx="580"
        cy="328"
        r="26"
        fill={danger}
        fillOpacity="0.2"
        stroke={danger}
      />
      <text x="160" y="252" textAnchor="middle" fontSize="14" fill={primary}>
        a
      </text>
      <text x="440" y="252" textAnchor="middle" fontSize="14" fill={primary}>
        m
      </text>
      <text x="580" y="170" textAnchor="middle" fontSize="14" fill={success}>
        m−1
      </text>
      <text x="580" y="334" textAnchor="middle" fontSize="14" fill={danger}>
        m+1
      </text>
      <text x="360" y="382" textAnchor="middle" fontSize="14" fill={primary}>
        靠近概率至少 1/3 · 远离概率至多 2/3
      </text>
    </Frame>
  );
}

/** 对比只走直线与计入绕路后指数底的变化。 */
export function Mg4PathExponentDiagram() {
  return (
    <Frame
      ariaLabel="路径与指数底图：只计算连续靠近的幸运路线得到1.5的指数底，计入先远离再回来的钢琴路径后得到小于1.334的指数底。"
      caption="绕路不是噪声：把合法路径完整计数，组合数增长可以抵消一部分单步概率损失。"
    >
      <text
        x="360"
        y="30"
        textAnchor="middle"
        fontSize="17"
        fontWeight="700"
        fill={primary}
      >
        从 1.5ⁿ 到 1.334ⁿ：路径计数的力量
      </text>
      <rect
        x="44"
        y="88"
        width="286"
        height="224"
        rx="14"
        fill={warning}
        fillOpacity="0.08"
        stroke={warning}
      />
      <text
        x="187"
        y="124"
        textAnchor="middle"
        fontSize="15"
        fontWeight="700"
        fill={warning}
      >
        幸运直冲
      </text>
      <text x="187" y="166" textAnchor="middle" fontSize="13" fill={primary}>
        只计 m 次靠近
      </text>
      <text
        x="187"
        y="216"
        textAnchor="middle"
        fontSize="18"
        fontWeight="700"
        fill={warning}
      >
        1.5ⁿ
      </text>
      <text x="187" y="264" textAnchor="middle" fontSize="13" fill={secondary}>
        一条模式，粗下界
      </text>
      <rect
        x="390"
        y="88"
        width="286"
        height="224"
        rx="14"
        fill={success}
        fillOpacity="0.08"
        stroke={success}
      />
      <text
        x="533"
        y="124"
        textAnchor="middle"
        fontSize="15"
        fontWeight="700"
        fill={success}
      >
        钢琴路径
      </text>
      <text x="533" y="166" textAnchor="middle" fontSize="13" fill={primary}>
        计入 i 次远离再回来
      </text>
      <text
        x="533"
        y="216"
        textAnchor="middle"
        fontSize="18"
        fontWeight="700"
        fill={success}
      >
        1.334ⁿ
      </text>
      <text x="533" y="264" textAnchor="middle" fontSize="13" fill={secondary}>
        组合数抵消概率损失
      </text>
      <Arrow x1={342} y1={200} x2={378} y2={200} color={accent} />
      <text x="360" y="362" textAnchor="middle" fontSize="14" fill={primary}>
        指数部分下降，多项式因子仍需保留
      </text>
    </Frame>
  );
}

/** 展示单侧错误：SAT 有证据时绝不误报，UNSAT 只是概率性判断。 */
export function Mg4GuaranteeDiagram() {
  return (
    <Frame
      ariaLabel="随机算法输出保证图：找到满足分配时返回SAT并附带可验证证据，不会误报；重启后仍未找到时只能返回probably UNSAT，可能漏解。"
      caption="随机性影响的是找证据的机会；一旦证据出现，确定性检查负责保证正确。"
    >
      <text
        x="360"
        y="30"
        textAnchor="middle"
        fontSize="17"
        fontWeight="700"
        fill={primary}
      >
        单侧错误：证据与失败不是同一种输出
      </text>
      <rect
        x="44"
        y="94"
        width="286"
        height="220"
        rx="14"
        fill={success}
        fillOpacity="0.08"
        stroke={success}
        strokeWidth="2"
      />
      <text
        x="187"
        y="132"
        textAnchor="middle"
        fontSize="15"
        fontWeight="700"
        fill={success}
      >
        找到满足分配
      </text>
      <Arrow x1={187} y1={150} x2={187} y2={190} color={success} />
      <text
        x="187"
        y="226"
        textAnchor="middle"
        fontSize="16"
        fontWeight="700"
        fill={success}
      >
        SAT with assignment a
      </text>
      <text x="187" y="270" textAnchor="middle" fontSize="13" fill={primary}>
        确定性验证 → 不会误报
      </text>
      <rect
        x="390"
        y="94"
        width="286"
        height="220"
        rx="14"
        fill={warning}
        fillOpacity="0.08"
        stroke={warning}
        strokeWidth="2"
      />
      <text
        x="533"
        y="132"
        textAnchor="middle"
        fontSize="15"
        fontWeight="700"
        fill={warning}
      >
        重启仍未找到
      </text>
      <Arrow x1={533} y1={150} x2={533} y2={190} color={warning} />
      <text
        x="533"
        y="226"
        textAnchor="middle"
        fontSize="16"
        fontWeight="700"
        fill={warning}
      >
        probably UNSAT
      </text>
      <text x="533" y="270" textAnchor="middle" fontSize="13" fill={primary}>
        可能漏解 → 需报告疏忽概率
      </text>
      <text x="360" y="362" textAnchor="middle" fontSize="14" fill={primary}>
        失败概率可以由独立重启压低到 e⁻ᴷ
      </text>
    </Frame>
  );
}

type WalkMode = "direct" | "paths" | "proof";

const walkData: Record<
  WalkMode,
  { label: string; rate: string; note: string }
> = {
  direct: { label: "幸运直冲", rate: "约 1.5ⁿ", note: "只计连续靠近的路线" },
  paths: {
    label: "完整路径",
    rate: "低于 1.334ⁿ",
    note: "计入远离后返回的钢琴路径",
  },
  proof: { label: "证据检查", rate: "单侧错误", note: "SAT 证据可确定性验证" },
};

/** 可重置的随机漫步策略实验。 */
export function Mg4SatLab() {
  const [mode, setMode] = useState<WalkMode>("paths");
  const current = walkData[mode];
  return (
    <section
      className="not-prose my-6 rounded-card border border-border bg-elevated p-5"
      aria-label="3-SAT随机漫步实验"
    >
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="text-base font-semibold text-primary">
            3-SAT Walk Lab
          </h3>
          <p className="mt-1 text-sm text-secondary">
            切换分析视角，观察路径、指数底和正确性保证的关系。
          </p>
        </div>
        <button
          type="button"
          onClick={() => setMode("paths")}
          className="rounded-control border border-border px-3 py-2 text-xs text-secondary transition-colors hover:border-accent hover:text-primary"
        >
          重置实验
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {(Object.keys(walkData) as WalkMode[]).map((key) => (
          <button
            key={key}
            type="button"
            onClick={() => setMode(key)}
            aria-pressed={mode === key}
            className={`rounded-control border px-4 py-2 text-sm transition-colors ${mode === key ? "border-accent text-accent" : "border-border text-secondary"}`}
          >
            {walkData[key].label}
          </button>
        ))}
      </div>
      <div className="mt-4 grid gap-4 rounded-control border border-border p-4 sm:grid-cols-[1fr_auto] sm:items-center">
        <div>
          <p className="font-mono text-sm text-primary">
            当前视角：{current.label}
          </p>
          <p className="mt-2 text-sm text-accent">关键结论：{current.rate}</p>
          <p className="mt-1 text-sm text-secondary">{current.note}。</p>
        </div>
        <svg
          viewBox="0 0 220 120"
          role="img"
          aria-label={`${current.label}视角${current.rate}`}
          className="h-auto w-full max-w-[220px]"
        >
          <polyline
            points={
              mode === "direct"
                ? "12,104 48,82 84,60 120,38 156,20 204,12"
                : mode === "paths"
                  ? "12,100 48,70 84,82 120,48 156,60 204,20"
                  : "12,88 72,52 132,52 204,30"
            }
            fill="none"
            stroke={
              mode === "direct" ? warning : mode === "paths" ? success : accent
            }
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <text
            x="110"
            y="116"
            textAnchor="middle"
            fontSize="12"
            fill={secondary}
          >
            距离/证据路径示意
          </text>
        </svg>
      </div>
    </section>
  );
}
