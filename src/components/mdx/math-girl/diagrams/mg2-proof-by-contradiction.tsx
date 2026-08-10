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

function Box({
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

/** 总览图：将目标命题、否定假设、矛盾和结论排成一条证据流。 */
export function Mg2ContradictionDiagram() {
  return (
    <Frame
      ariaLabel="反证法总览图：目标命题 Q，先假设非 Q，再推出 P 与非 P 同时成立，最后排除非 Q 得到 Q。"
      caption="反证法的控制流：否定目标只是临时入口，矛盾才是排除入口的证据。"
    >
      <text
        x="360"
        y="32"
        textAnchor="middle"
        fontSize="16"
        fontWeight="700"
        fill={primary}
      >
        反证法：从相反入口回到目标
      </text>
      <text x="360" y="58" textAnchor="middle" fontSize="12" fill={secondary}>
        每一步都要保留定义、变量条件和已证明理由
      </text>
      <Box
        x={42}
        y={112}
        width={146}
        height={88}
        title="目标 Q"
        detail="√2 不属于有理数"
        color={accent}
      />
      <Box
        x={218}
        y={112}
        width={146}
        height={88}
        title="假设 ¬Q"
        detail="存在整数分数"
        color={warning}
      />
      <Box
        x={394}
        y={112}
        width={146}
        height={88}
        title="推出"
        detail="P 与 ¬P 同时成立"
        color={danger}
      />
      <Box
        x={570}
        y={112}
        width={112}
        height={88}
        title="结论 Q"
        detail="排除 ¬Q"
        color={success}
      />
      <Arrow x1={194} y1={156} x2={208} y2={156} color={border} />
      <Arrow x1={370} y1={156} x2={384} y2={156} color={border} />
      <Arrow x1={546} y1={156} x2={560} y2={156} color={border} />
      <line
        x1="291"
        y1="210"
        x2="291"
        y2="274"
        stroke={border}
        strokeWidth="2"
      />
      <polygon points="291,286 285,274 297,274" fill={border} />
      <rect
        x="128"
        y="296"
        width="326"
        height="66"
        rx="11"
        fill={danger}
        fillOpacity="0.07"
        stroke={danger}
      />
      <text
        x="291"
        y="323"
        textAnchor="middle"
        fontSize="13"
        fontWeight="700"
        fill={danger}
      >
        矛盾：P ∧ ¬P
      </text>
      <text x="291" y="346" textAnchor="middle" fontSize="11" fill={secondary}>
        不是“感觉不对”，而是同一命题的两种真值
      </text>
      <text x="575" y="312" textAnchor="middle" fontSize="12" fill={success}>
        ¬Q 被排除
      </text>
      <text x="575" y="338" textAnchor="middle" fontSize="12" fill={primary}>
        所以 Q 成立
      </text>
    </Frame>
  );
}

/** 静态图：展示全称量词否定如何产生一个反例。 */
export function Mg2QuantifierDiagram() {
  return (
    <Frame
      ariaLabel="量词否定图：全称命题所有 n 满足 P 的否定是存在一个 n 不满足 P，而不是所有 n 都不满足。"
      caption="否定量词时既要翻转量词，也要否定谓词。"
    >
      <text
        x="360"
        y="32"
        textAnchor="middle"
        fontSize="16"
        fontWeight="700"
        fill={primary}
      >
        全称命题的否定：只需一个反例
      </text>
      <Box
        x={72}
        y={106}
        width={236}
        height={112}
        title="原命题"
        detail="∀ n，P(n)"
        color={accent}
      />
      <Box
        x={412}
        y={106}
        width={236}
        height={112}
        title="准确否定"
        detail="∃ n，使 ¬P(n)"
        color={danger}
      />
      <Arrow x1={322} y1={162} x2={398} y2={162} color={warning} />
      <text x="360" y="148" textAnchor="middle" fontSize="11" fill={warning}>
        否定
      </text>
      <rect
        x="102"
        y="274"
        width="516"
        height="72"
        rx="11"
        fill={success}
        fillOpacity="0.08"
        stroke={success}
      />
      <text
        x="360"
        y="303"
        textAnchor="middle"
        fontSize="13"
        fontWeight="700"
        fill={success}
      >
        “所有糖都是柠檬味”
      </text>
      <text x="360" y="328" textAnchor="middle" fontSize="12" fill={primary}>
        否定只需找到一颗不是柠檬味，不是把每颗都变成反例
      </text>
      <text x="360" y="382" textAnchor="middle" fontSize="12" fill={secondary}>
        反证法的入口同样必须是目标命题的准确否定
      </text>
    </Frame>
  );
}

/** 静态图：展示根号 2 奇偶证明中两次同偶和矛盾的来源。 */
export function Mg2ParityDiagram() {
  return (
    <Frame
      ariaLabel="根号2奇偶证明图：最简分数假设导出 2a平方等于b平方，先得 b 偶，再得 a 偶，最终与 a、b 互质矛盾。"
      caption="同一个等式把分子和分母都逼成偶数，正好击穿最简分数条件。"
    >
      <text
        x="360"
        y="32"
        textAnchor="middle"
        fontSize="16"
        fontWeight="700"
        fill={primary}
      >
        √2 奇偶证明：两次引理，一次矛盾
      </text>
      <text x="360" y="58" textAnchor="middle" fontSize="12" fill={secondary}>
        假设 √2=b/a，a、b 互质且都是整数
      </text>
      <Box
        x={48}
        y={106}
        width={152}
        height={82}
        title="平方去分母"
        detail="2a² = b²"
        color={accent}
      />
      <Box
        x={284}
        y={106}
        width={152}
        height={82}
        title="第一次奇偶"
        detail="b² 偶 ⇒ b 偶"
        color={warning}
      />
      <Box
        x={520}
        y={106}
        width={152}
        height={82}
        title="第二次奇偶"
        detail="a² 偶 ⇒ a 偶"
        color={success}
      />
      <Arrow x1={212} y1={147} x2={272} y2={147} color={border} />
      <Arrow x1={448} y1={147} x2={508} y2={147} color={border} />
      <line
        x1="360"
        y1="198"
        x2="360"
        y2="250"
        stroke={border}
        strokeWidth="2"
      />
      <polygon points="360,262 354,250 366,250" fill={border} />
      <rect
        x="108"
        y="274"
        width="504"
        height="72"
        rx="11"
        fill={danger}
        fillOpacity="0.07"
        stroke={danger}
      />
      <text
        x="360"
        y="303"
        textAnchor="middle"
        fontSize="13"
        fontWeight="700"
        fill={danger}
      >
        2∣a 且 2∣b ⇒ gcd(a,b)≥2
      </text>
      <text x="360" y="328" textAnchor="middle" fontSize="12" fill={primary}>
        但最简分数要求 gcd(a,b)=1；P 与 ¬P 同时成立
      </text>
      <text x="360" y="382" textAnchor="middle" fontSize="12" fill={secondary}>
        矛盾不是“偶数不好”，而是破坏了互质前提
      </text>
    </Frame>
  );
}

/** 交互实验：在最简分数路线和质因数指数路线之间切换证据。 */
export function Mg2ContradictionLab() {
  const [route, setRoute] = useState<"parity" | "exponent">("parity");

  const reset = () => setRoute("parity");

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div
        data-visual-kind="contradiction-lab"
        className="overflow-hidden rounded-card border border-border bg-elevated p-5"
      >
        <div className="mb-4 flex flex-wrap items-center justify-center gap-2">
          <button
            type="button"
            aria-pressed={route === "parity"}
            onClick={() => setRoute("parity")}
            className={`min-h-11 rounded-full border px-4 py-2 text-sm ${route === "parity" ? "border-accent bg-accent/10 text-accent" : "border-border text-secondary"}`}
          >
            最简分数路线
          </button>
          <button
            type="button"
            aria-pressed={route === "exponent"}
            onClick={() => setRoute("exponent")}
            className={`min-h-11 rounded-full border px-4 py-2 text-sm ${route === "exponent" ? "border-accent bg-accent/10 text-accent" : "border-border text-secondary"}`}
          >
            指数奇偶路线
          </button>
          <button
            type="button"
            onClick={reset}
            className="min-h-11 rounded-full border border-border px-4 py-2 text-sm text-secondary"
          >
            重置实验
          </button>
        </div>
        <div className="grid gap-3 md:grid-cols-3">
          <div className="rounded-xl border border-border p-4">
            <p className="m-0 text-sm font-semibold text-primary">共同入口</p>
            <p className="mt-2 text-lg font-bold text-accent">√2 = b/a</p>
            <p className="m-0 text-sm text-secondary">a、b 为整数，a ≠ 0</p>
          </div>
          <div className="rounded-xl border border-border p-4">
            <p className="m-0 text-sm font-semibold text-primary">当前证据</p>
            {route === "parity" ? (
              <>
                <p className="mt-2 text-lg font-bold text-warning">2a²=b²</p>
                <p className="m-0 text-sm text-secondary">
                  b 偶 → a 偶 → 破坏互质
                </p>
              </>
            ) : (
              <>
                <p className="mt-2 text-lg font-bold text-warning">
                  奇数 = 偶数？
                </p>
                <p className="m-0 text-sm text-secondary">
                  v₂ 左侧为奇，右侧为偶
                </p>
              </>
            )}
          </div>
          <div
            className="rounded-xl border border-border p-4"
            aria-live="polite"
          >
            <p className="m-0 text-sm font-semibold text-primary">审计结论</p>
            <p className="mt-2 text-lg font-bold text-success">✓ 假设被排除</p>
            <p className="m-0 text-sm text-secondary">所以 √2 不属于有理数</p>
          </div>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        切换两条证明路线，观察它们从同一假设出发、以不同矛盾证据收束。
      </figcaption>
    </figure>
  );
}

/** 静态图：比较质因数 2 指数的奇偶性。 */
export function Mg2PrimeExponentDiagram() {
  return (
    <Frame
      ariaLabel="质因数指数图：2a平方等于b平方时，左侧 v2 指数为 1 加偶数，是奇数；右侧为偶数，唯一分解禁止两者相等。"
      caption="第二条证明把‘同偶’换成‘奇数指数等于偶数指数’，矛盾更短但依赖唯一分解。"
    >
      <text
        x="360"
        y="32"
        textAnchor="middle"
        fontSize="16"
        fontWeight="700"
        fill={primary}
      >
        质因数 2 的指数：奇偶性也能制造矛盾
      </text>
      <text x="360" y="58" textAnchor="middle" fontSize="12" fill={secondary}>
        从同一个假设得到两侧指数的精确表达式
      </text>
      <Box
        x={72}
        y={110}
        width={238}
        height={108}
        title="等式左侧"
        detail="v₂(2a²)=1+2v₂(a)"
        color={warning}
      />
      <Box
        x={410}
        y={110}
        width={238}
        height={108}
        title="等式右侧"
        detail="v₂(b²)=2v₂(b)"
        color={accent}
      />
      <Arrow x1={326} y1={164} x2={394} y2={164} color={border} />
      <text x="360" y="149" textAnchor="middle" fontSize="11" fill={secondary}>
        若 2a²=b²
      </text>
      <rect
        x="120"
        y="270"
        width="480"
        height="76"
        rx="11"
        fill={danger}
        fillOpacity="0.07"
        stroke={danger}
      />
      <text
        x="360"
        y="300"
        textAnchor="middle"
        fontSize="14"
        fontWeight="700"
        fill={danger}
      >
        奇数 = 偶数，不可能
      </text>
      <text x="360" y="326" textAnchor="middle" fontSize="12" fill={primary}>
        质因数分解唯一性要求同一整数两侧的指数相同
      </text>
      <text x="360" y="382" textAnchor="middle" fontSize="12" fill={secondary}>
        所以“√2 是有理数”的相反假设不能成立
      </text>
    </Frame>
  );
}

/** 静态图：将一份证明拆成可复查的职责清单。 */
export function Mg2ProofFlowDiagram() {
  const rows = [
    ["定义", "√2、ℚ、变量条件", accent],
    ["假设", "写出 ¬Q，而不是模糊相反", warning],
    ["引理", "平方偶数推出原数偶数", success],
    ["矛盾", "P 与 ¬P 同时成立", danger],
  ] as const;
  return (
    <Frame
      ariaLabel="证明职责图：从定义、假设、引理到矛盾逐行标注理由，最后排除相反假设。"
      caption="证明的可迁移能力来自职责清楚：每一步都知道自己凭什么成立。"
    >
      <text
        x="360"
        y="32"
        textAnchor="middle"
        fontSize="16"
        fontWeight="700"
        fill={primary}
      >
        证明复盘：每一行都要回答“凭什么”
      </text>
      {rows.map(([label, detail, color], index) => {
        const y = 88 + index * 64;
        return (
          <g key={label}>
            <rect
              x="92"
              y={y}
              width="120"
              height="46"
              rx="9"
              fill={color}
              fillOpacity="0.1"
              stroke={color}
            />
            <text
              x="152"
              y={y + 29}
              textAnchor="middle"
              fontSize="13"
              fontWeight="700"
              fill={color}
            >
              {label}
            </text>
            <Arrow x1={226} y1={y + 23} x2={282} y2={y + 23} color={border} />
            <rect
              x="294"
              y={y}
              width="334"
              height="46"
              rx="9"
              fill={color}
              fillOpacity="0.05"
              stroke={border}
            />
            <text
              x="461"
              y={y + 29}
              textAnchor="middle"
              fontSize="12"
              fill={primary}
            >
              {detail}
            </text>
          </g>
        );
      })}
      <rect
        x="152"
        y="358"
        width="416"
        height="38"
        rx="9"
        fill={success}
        fillOpacity="0.08"
        stroke={success}
      />
      <text
        x="360"
        y="383"
        textAnchor="middle"
        fontSize="12"
        fontWeight="700"
        fill={success}
      >
        ¬Q ⇒ P∧¬P ⇒ Q：结论方向完成
      </text>
    </Frame>
  );
}
