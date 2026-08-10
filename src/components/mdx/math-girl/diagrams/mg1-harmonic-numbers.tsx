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

function harmonicValue(n: number) {
  let value = 0;
  for (let index = 1; index <= n; index += 1) value += 1 / index;
  return value;
}

/** 总览图：把有限部分和、分组下界和对数边界放在一条证据链上。 */
export function Mg1HarmonicDiagram() {
  const bars = [1, 1 / 2, 1 / 3, 1 / 4, 1 / 5, 1 / 6, 1 / 7, 1 / 8];
  return (
    <Frame
      ariaLabel="调和数总览：有限部分和 H_n 由倒数项累加，二进制分组为每个块提供至少二分之一的下界，积分比较把 H_n 夹在 log(n加1) 和 1加log n 之间。"
      caption="慢增长不等于有界：部分和、分组下界和对数夹逼共同证明调和级数发散。"
    >
      <text
        x="360"
        y="32"
        textAnchor="middle"
        fontSize="16"
        fontWeight="700"
        fill={primary}
      >
        调和数：慢慢累加，最终越过任意阈值
      </text>
      <text x="360" y="56" textAnchor="middle" fontSize="12" fill={secondary}>
        Hₙ 是有限对象；无穷级数是研究 Hₙ 随 n 增大时的行为
      </text>
      <line
        x1="64"
        y1="300"
        x2="342"
        y2="300"
        stroke={border}
        strokeWidth="1.5"
      />
      <line
        x1="64"
        y1="300"
        x2="64"
        y2="94"
        stroke={border}
        strokeWidth="1.5"
      />
      {bars.map((value, index) => {
        const height = value * 162;
        const x = 80 + index * 31;
        return (
          <rect
            key={index}
            x={x}
            y={300 - height}
            width="22"
            height={height}
            rx="4"
            fill={accent}
            fillOpacity="0.2"
            stroke={accent}
          />
        );
      })}
      <text x="202" y="326" textAnchor="middle" fontSize="11" fill={secondary}>
        1 + 1/2 + … + 1/8
      </text>
      <rect
        x="388"
        y="92"
        width="286"
        height="84"
        rx="9"
        fill={warning}
        fillOpacity="0.08"
        stroke={warning}
      />
      <text
        x="531"
        y="121"
        textAnchor="middle"
        fontSize="13"
        fontWeight="700"
        fill={warning}
      >
        二进制分组
      </text>
      <text x="531" y="147" textAnchor="middle" fontSize="11" fill={primary}>
        每个完整块 ≥ 1/2
      </text>
      <text x="531" y="166" textAnchor="middle" fontSize="11" fill={secondary}>
        块数无限，累计下界无界
      </text>
      <rect
        x="388"
        y="202"
        width="286"
        height="84"
        rx="9"
        fill={success}
        fillOpacity="0.08"
        stroke={success}
      />
      <text
        x="531"
        y="231"
        textAnchor="middle"
        fontSize="13"
        fontWeight="700"
        fill={success}
      >
        积分比较
      </text>
      <text x="531" y="257" textAnchor="middle" fontSize="11" fill={primary}>
        log(n+1) ≤ Hₙ ≤ 1+log n
      </text>
      <text x="531" y="276" textAnchor="middle" fontSize="11" fill={secondary}>
        增长阶接近对数，但没有有限上界
      </text>
      <rect
        x="72"
        y="356"
        width="596"
        height="38"
        rx="8"
        fill={danger}
        fillOpacity="0.07"
        stroke={danger}
      />
      <text
        x="360"
        y="380"
        textAnchor="middle"
        fontSize="12"
        fontWeight="700"
        fill={danger}
      >
        正项 + 项趋零，只是必要信息，不是收敛证明
      </text>
    </Frame>
  );
}

/** 静态图：把“任意阈值”翻译成可执行的量词顺序。 */
export function Mg1QuantifierDiagram() {
  return (
    <Frame
      ariaLabel="发散量词图：挑战者任选正阈值 M，证明者依赖 M 给出门槛 N，门槛之后所有 n 都满足 H_n 大于 M。"
      caption="量词顺序是证明的控制流：先接收 M，再构造 N，最后覆盖所有更大的 n。"
    >
      <text
        x="360"
        y="32"
        textAnchor="middle"
        fontSize="16"
        fontWeight="700"
        fill={primary}
      >
        发散到正无穷的控制流
      </text>
      <text x="360" y="57" textAnchor="middle" fontSize="12" fill={secondary}>
        ∀M&gt;0，∃N，∀n≥N：Hₙ&gt;M
      </text>
      <rect
        x="54"
        y="100"
        width="178"
        height="104"
        rx="10"
        fill={accent}
        fillOpacity="0.08"
        stroke={accent}
      />
      <text
        x="143"
        y="132"
        textAnchor="middle"
        fontSize="14"
        fontWeight="700"
        fill={accent}
      >
        挑战
      </text>
      <text x="143" y="162" textAnchor="middle" fontSize="12" fill={primary}>
        任意 M&gt;0
      </text>
      <text x="143" y="186" textAnchor="middle" fontSize="11" fill={secondary}>
        阈值不能预先固定
      </text>
      <Arrow x1={242} y1={152} x2={302} y2={152} color={secondary} />
      <rect
        x="310"
        y="100"
        width="178"
        height="104"
        rx="10"
        fill={warning}
        fillOpacity="0.08"
        stroke={warning}
      />
      <text
        x="399"
        y="132"
        textAnchor="middle"
        fontSize="14"
        fontWeight="700"
        fill={warning}
      >
        回应
      </text>
      <text x="399" y="162" textAnchor="middle" fontSize="12" fill={primary}>
        构造 N(M)
      </text>
      <text x="399" y="186" textAnchor="middle" fontSize="11" fill={secondary}>
        门槛可以依赖 M
      </text>
      <Arrow x1={498} y1={152} x2={558} y2={152} color={secondary} />
      <rect
        x="566"
        y="100"
        width="110"
        height="104"
        rx="10"
        fill={success}
        fillOpacity="0.08"
        stroke={success}
      />
      <text
        x="621"
        y="132"
        textAnchor="middle"
        fontSize="14"
        fontWeight="700"
        fill={success}
      >
        保证
      </text>
      <text x="621" y="162" textAnchor="middle" fontSize="12" fill={primary}>
        n≥N
      </text>
      <text x="621" y="186" textAnchor="middle" fontSize="11" fill={secondary}>
        全部 Hₙ&gt;M
      </text>
      <rect
        x="84"
        y="260"
        width="552"
        height="94"
        rx="10"
        fill={danger}
        fillOpacity="0.07"
        stroke={danger}
      />
      <text
        x="360"
        y="290"
        textAnchor="middle"
        fontSize="13"
        fontWeight="700"
        fill={danger}
      >
        错误顺序
      </text>
      <text x="360" y="318" textAnchor="middle" fontSize="11" fill={primary}>
        ∃N，∀M&gt;0，Hₙ&gt;M 会要求一个有限 Hₙ 超过所有实数
      </text>
      <text x="360" y="340" textAnchor="middle" fontSize="11" fill={secondary}>
        交换量词后，证明对象已经变成不可能的命题
      </text>
    </Frame>
  );
}

/** 静态图：展示二进制块中“项数 × 单项下界”的乘法。 */
export function Mg1DyadicBlockDiagram() {
  const blocks = [
    { label: "第 0 块", range: "1", count: "1 项", bound: "≥ 1/2" },
    { label: "第 1 块", range: "3…4", count: "2 项", bound: "≥ 1/2" },
    { label: "第 2 块", range: "5…8", count: "4 项", bound: "≥ 1/2" },
    { label: "第 m 块", range: "2ᵐ+1…2ᵐ⁺¹", count: "2ᵐ 项", bound: "≥ 1/2" },
  ];
  return (
    <Frame
      ariaLabel="二进制分组图：第 m 块有 2 的 m 次方项，每项至少为 1 除以 2 的 m 加 1 次方，因此每块和至少为二分之一。"
      caption="把无限问题拆成无限多个固定贡献的块，就能为每个阈值构造门槛。"
    >
      <text
        x="360"
        y="32"
        textAnchor="middle"
        fontSize="16"
        fontWeight="700"
        fill={primary}
      >
        每个二进制块都贡献至少 1/2
      </text>
      <text x="360" y="56" textAnchor="middle" fontSize="12" fill={secondary}>
        第 m 块：2ᵐ 项 × 每项至少 1/2ᵐ⁺¹
      </text>
      {blocks.map((block, index) => {
        const y = 88 + index * 62;
        return (
          <g key={block.label}>
            <rect
              x="58"
              y={y}
              width="148"
              height="42"
              rx="7"
              fill={accent}
              fillOpacity="0.08"
              stroke={accent}
            />
            <text
              x="132"
              y={y + 17}
              textAnchor="middle"
              fontSize="11"
              fontWeight="700"
              fill={accent}
            >
              {block.label}
            </text>
            <text
              x="132"
              y={y + 33}
              textAnchor="middle"
              fontSize="11"
              fill={primary}
            >
              {block.range}
            </text>
            <Arrow
              x1={216}
              y1={y + 21}
              x2={272}
              y2={y + 21}
              color={secondary}
            />
            <rect
              x="280"
              y={y}
              width="154"
              height="42"
              rx="7"
              fill={warning}
              fillOpacity="0.08"
              stroke={warning}
            />
            <text
              x="357"
              y={y + 17}
              textAnchor="middle"
              fontSize="11"
              fill={primary}
            >
              {block.count}
            </text>
            <text
              x="357"
              y={y + 33}
              textAnchor="middle"
              fontSize="11"
              fill={secondary}
            >
              项数
            </text>
            <Arrow
              x1={444}
              y1={y + 21}
              x2={500}
              y2={y + 21}
              color={secondary}
            />
            <rect
              x="508"
              y={y}
              width="154"
              height="42"
              rx="7"
              fill={success}
              fillOpacity="0.08"
              stroke={success}
            />
            <text
              x="585"
              y={y + 17}
              textAnchor="middle"
              fontSize="11"
              fontWeight="700"
              fill={success}
            >
              {block.bound}
            </text>
            <text
              x="585"
              y={y + 33}
              textAnchor="middle"
              fontSize="11"
              fill={secondary}
            >
              块和下界
            </text>
          </g>
        );
      })}
      <rect
        x="88"
        y="350"
        width="544"
        height="42"
        rx="8"
        fill={danger}
        fillOpacity="0.07"
        stroke={danger}
      />
      <text
        x="360"
        y="376"
        textAnchor="middle"
        fontSize="12"
        fontWeight="700"
        fill={danger}
      >
        H₂ʳ ≥ 1 + r/2，r 越大，部分和越过的阈值越高
      </text>
    </Frame>
  );
}

/** 交互实验：切换部分和规模，观察数值、对数夹逼和分组下界。 */
export function Mg1HarmonicLab() {
  const [n, setN] = useState(8);
  const [evidence, setEvidence] = useState<"blocks" | "integral">("blocks");
  const value = harmonicValue(n);
  const lowerBound = 1 + Math.floor(Math.log2(n)) / 2;
  const logLower = Math.log(n + 1);
  const logUpper = 1 + Math.log(n);
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div
        data-visual-kind="harmonic-number-lab"
        className="overflow-hidden rounded-card border border-border bg-elevated p-5"
      >
        <div className="mb-4 flex flex-wrap items-center justify-center gap-2">
          {[4, 8, 16, 32].map((valueN) => (
            <button
              key={valueN}
              type="button"
              aria-pressed={n === valueN}
              onClick={() => setN(valueN)}
              className={`min-h-11 rounded-full border px-4 py-2 text-sm ${n === valueN ? "border-accent bg-accent/10 text-accent" : "border-border text-secondary"}`}
            >
              n={valueN}
            </button>
          ))}
          {(["blocks", "integral"] as const).map((mode) => (
            <button
              key={mode}
              type="button"
              aria-pressed={evidence === mode}
              onClick={() => setEvidence(mode)}
              className={`min-h-11 rounded-full border px-4 py-2 text-sm ${evidence === mode ? "border-warning bg-warning/10 text-warning" : "border-border text-secondary"}`}
            >
              {mode === "blocks" ? "分组证据" : "积分证据"}
            </button>
          ))}
          <button
            type="button"
            onClick={() => {
              setN(8);
              setEvidence("blocks");
            }}
            className="min-h-11 rounded-full border border-border px-4 py-2 text-sm text-secondary"
          >
            重置
          </button>
        </div>
        <svg
          viewBox="0 0 720 350"
          role="img"
          aria-label={`调和数实验：n=${n}，H_n=${value.toFixed(3)}，${evidence === "blocks" ? `二进制分组下界为 ${lowerBound.toFixed(3)}` : `积分下界为 ${logLower.toFixed(3)}，上界为 ${logUpper.toFixed(3)}`}。`}
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
            把增长证据换成可观察的数值
          </text>
          <text
            x="360"
            y="52"
            textAnchor="middle"
            fontSize="12"
            fill={secondary}
          >
            当前 Hₙ={value.toFixed(3)}；数值慢，但下界随 n 继续上升
          </text>
          <line
            x1="78"
            y1="268"
            x2="652"
            y2="268"
            stroke={border}
            strokeWidth="1.5"
          />
          <line
            x1="78"
            y1="268"
            x2="78"
            y2="84"
            stroke={border}
            strokeWidth="1.5"
          />
          {[1, 2, 3].map((tick) => (
            <g key={tick}>
              <line
                x1="72"
                y1={268 - tick * 54}
                x2="84"
                y2={268 - tick * 54}
                stroke={border}
              />
              <text
                x="60"
                y={272 - tick * 54}
                textAnchor="end"
                fontSize="11"
                fill={secondary}
              >
                {tick}
              </text>
            </g>
          ))}
          <rect
            x="122"
            y={268 - Math.min(170, value * 54)}
            width="150"
            height={Math.min(170, value * 54)}
            rx="7"
            fill={accent}
            fillOpacity="0.2"
            stroke={accent}
          />
          <text
            x="197"
            y="292"
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill={accent}
          >
            Hₙ
          </text>
          {evidence === "blocks" ? (
            <>
              <rect
                x="350"
                y={268 - Math.min(170, lowerBound * 54)}
                width="150"
                height={Math.min(170, lowerBound * 54)}
                rx="7"
                fill={warning}
                fillOpacity="0.2"
                stroke={warning}
              />
              <text
                x="425"
                y="292"
                textAnchor="middle"
                fontSize="12"
                fontWeight="700"
                fill={warning}
              >
                二进制下界
              </text>
              <text
                x="425"
                y="318"
                textAnchor="middle"
                fontSize="11"
                fill={secondary}
              >
                1+⌊log₂n⌋/2={lowerBound.toFixed(3)}
              </text>
            </>
          ) : (
            <>
              <rect
                x="350"
                y={268 - Math.min(170, logLower * 54)}
                width="92"
                height={Math.min(170, logLower * 54)}
                rx="7"
                fill={success}
                fillOpacity="0.2"
                stroke={success}
              />
              <rect
                x="462"
                y={268 - Math.min(170, logUpper * 54)}
                width="92"
                height={Math.min(170, logUpper * 54)}
                rx="7"
                fill={warning}
                fillOpacity="0.2"
                stroke={warning}
              />
              <text
                x="396"
                y="292"
                textAnchor="middle"
                fontSize="11"
                fontWeight="700"
                fill={success}
              >
                log(n+1)
              </text>
              <text
                x="508"
                y="292"
                textAnchor="middle"
                fontSize="11"
                fontWeight="700"
                fill={warning}
              >
                1+log n
              </text>
            </>
          )}
          <text
            x="360"
            y="340"
            textAnchor="middle"
            fontSize="11"
            fill={secondary}
          >
            实验展示直觉；严格结论仍需量词、分组或积分比较
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        交互实验让“慢慢增长”同时拥有数值直觉和证明下界。
      </figcaption>
    </figure>
  );
}

/** 静态图：对照调和数与对数的差分/导数关系。 */
export function Mg1LogCorrespondenceDiagram() {
  return (
    <Frame
      ariaLabel="对数对应图：连续世界的 log x 导数是 1 除以 x，离散世界的调和数前向差分是 1 除以 n 加 1；积分和求和都累积倒数。"
      caption="对数函数与调和数的对应保留变化率和累积结构，端点索引必须写清。"
    >
      <text
        x="360"
        y="32"
        textAnchor="middle"
        fontSize="16"
        fontWeight="700"
        fill={primary}
      >
        对数与调和数：连续/离散对应
      </text>
      <text x="360" y="56" textAnchor="middle" fontSize="12" fill={secondary}>
        变化率都是倒数，逆向累积得到对数型对象
      </text>
      <rect
        x="48"
        y="92"
        width="286"
        height="178"
        rx="10"
        fill={accent}
        fillOpacity="0.08"
        stroke={accent}
      />
      <text
        x="191"
        y="123"
        textAnchor="middle"
        fontSize="14"
        fontWeight="700"
        fill={accent}
      >
        连续
      </text>
      <text x="191" y="158" textAnchor="middle" fontSize="13" fill={primary}>
        D log x = 1/x
      </text>
      <text x="191" y="194" textAnchor="middle" fontSize="13" fill={primary}>
        ∫₁ˣ dt/t = log x
      </text>
      <text x="191" y="235" textAnchor="middle" fontSize="11" fill={secondary}>
        微分 → 积分
      </text>
      <Arrow x1={344} y1={180} x2={376} y2={180} color={warning} />
      <text x="360" y="163" textAnchor="middle" fontSize="11" fill={warning}>
        对应
      </text>
      <rect
        x="386"
        y="92"
        width="286"
        height="178"
        rx="10"
        fill={success}
        fillOpacity="0.08"
        stroke={success}
      />
      <text
        x="529"
        y="123"
        textAnchor="middle"
        fontSize="14"
        fontWeight="700"
        fill={success}
      >
        离散
      </text>
      <text x="529" y="158" textAnchor="middle" fontSize="13" fill={primary}>
        ΔHₙ = 1/(n+1)
      </text>
      <text x="529" y="194" textAnchor="middle" fontSize="13" fill={primary}>
        Hₙ = Σₖ₌₁ⁿ 1/k
      </text>
      <text x="529" y="235" textAnchor="middle" fontSize="11" fill={secondary}>
        差分 → 求和
      </text>
      <rect
        x="74"
        y="314"
        width="572"
        height="74"
        rx="9"
        fill={warning}
        fillOpacity="0.07"
        stroke={border}
      />
      <text
        x="360"
        y="342"
        textAnchor="middle"
        fontSize="12.5"
        fontWeight="700"
        fill={warning}
      >
        前向差分的端点是 n+1
      </text>
      <text x="360" y="365" textAnchor="middle" fontSize="11" fill={secondary}>
        若改用 Hₙ−Hₙ₋₁，右侧才是 1/n；索引不是可省略的装饰
      </text>
    </Frame>
  );
}

/** 静态图：展示有限质数假设、欧拉乘积和调和级数矛盾。 */
export function Mg1EulerProductDiagram() {
  return (
    <Frame
      ariaLabel="欧拉乘积图：有限质数假设产生有限个等比级数因子的乘积，唯一分解展开成所有正整数倒数，因而既有限又等于发散调和级数，形成矛盾。"
      caption="有限质数假设把每个正整数倒数编码进同一个乘积，最终撞上调和级数的发散。"
    >
      <text
        x="360"
        y="32"
        textAnchor="middle"
        fontSize="16"
        fontWeight="700"
        fill={primary}
      >
        从有限质数假设走向矛盾
      </text>
      <text x="360" y="56" textAnchor="middle" fontSize="12" fill={secondary}>
        每一步都要标明有限性、唯一性和发散性来自哪里
      </text>
      <rect
        x="42"
        y="94"
        width="174"
        height="118"
        rx="9"
        fill={danger}
        fillOpacity="0.08"
        stroke={danger}
      />
      <text
        x="129"
        y="124"
        textAnchor="middle"
        fontSize="13"
        fontWeight="700"
        fill={danger}
      >
        假设
      </text>
      <text x="129" y="153" textAnchor="middle" fontSize="12" fill={primary}>
        质数只有 p₁…pₘ
      </text>
      <text x="129" y="181" textAnchor="middle" fontSize="11" fill={secondary}>
        有限个质数
      </text>
      <Arrow x1={226} y1={153} x2={276} y2={153} color={secondary} />
      <rect
        x="284"
        y="94"
        width="174"
        height="118"
        rx="9"
        fill={warning}
        fillOpacity="0.08"
        stroke={warning}
      />
      <text
        x="371"
        y="124"
        textAnchor="middle"
        fontSize="13"
        fontWeight="700"
        fill={warning}
      >
        欧拉乘积
      </text>
      <text x="371" y="153" textAnchor="middle" fontSize="11" fill={primary}>
        ∏(1−1/pⱼ)⁻¹
      </text>
      <text x="371" y="181" textAnchor="middle" fontSize="11" fill={secondary}>
        有限个有限因子
      </text>
      <Arrow x1={468} y1={153} x2={518} y2={153} color={secondary} />
      <rect
        x="526"
        y="94"
        width="154"
        height="118"
        rx="9"
        fill={accent}
        fillOpacity="0.08"
        stroke={accent}
      />
      <text
        x="603"
        y="124"
        textAnchor="middle"
        fontSize="13"
        fontWeight="700"
        fill={accent}
      >
        展开
      </text>
      <text x="603" y="153" textAnchor="middle" fontSize="11" fill={primary}>
        Σ 1/n
      </text>
      <text x="603" y="181" textAnchor="middle" fontSize="11" fill={secondary}>
        唯一分解不漏不重
      </text>
      <rect
        x="74"
        y="264"
        width="572"
        height="92"
        rx="10"
        fill={success}
        fillOpacity="0.07"
        stroke={success}
      />
      <text
        x="360"
        y="294"
        textAnchor="middle"
        fontSize="14"
        fontWeight="700"
        fill={success}
      >
        同一个 Qₘ 既应有限，又等于发散到正无穷的调和级数
      </text>
      <text x="360" y="322" textAnchor="middle" fontSize="11" fill={primary}>
        有限性来自有限乘积；发散性来自二进制分组；唯一性来自质因数分解
      </text>
      <text
        x="360"
        y="344"
        textAnchor="middle"
        fontSize="12"
        fontWeight="700"
        fill={danger}
      >
        矛盾 → 质数不可能只有有限个
      </text>
      <text x="360" y="388" textAnchor="middle" fontSize="12" fill={secondary}>
        反证法的力量来自把三个独立证据接到同一个对象上
      </text>
    </Frame>
  );
}
