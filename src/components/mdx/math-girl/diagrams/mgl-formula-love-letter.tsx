"use client";

import { useState } from "react";

const accent = "var(--accent)";
const success = "var(--success)";
const warning = "var(--warning)";
const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";

function FormulaFrame({
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
          viewBox="0 0 720 400"
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

/**
 * 交互式主图：切换同一个等号的两种阅读任务。
 * 方程关注解集，恒等式关注所有允许输入；重置按钮用于视觉巡检和复习。
 */
export function MglFormulaReadingDiagram() {
  const [mode, setMode] = useState<"equation" | "identity">("equation");
  const isEquation = mode === "equation";

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <div className="mb-4 flex flex-wrap items-center justify-center gap-2">
          <button
            type="button"
            aria-pressed={isEquation}
            onClick={() => setMode("equation")}
            className={`rounded-full border px-3 py-1 text-sm ${isEquation ? "border-accent bg-accent/10 text-accent" : "border-border text-secondary"}`}
          >
            读作方程式
          </button>
          <button
            type="button"
            aria-pressed={!isEquation}
            onClick={() => setMode("identity")}
            className={`rounded-full border px-3 py-1 text-sm ${!isEquation ? "border-accent bg-accent/10 text-accent" : "border-border text-secondary"}`}
          >
            读作恒等式
          </button>
          <button
            type="button"
            onClick={() => setMode("equation")}
            className="rounded-full border border-border px-3 py-1 text-sm text-secondary"
          >
            重置
          </button>
        </div>
        <svg
          viewBox="0 0 720 400"
          role="img"
          aria-label={
            isEquation
              ? "交互图显示方程式 x 加 1 等于 3：在实数定义域内寻找唯一解 x 等于 2。"
              : "交互图显示恒等式 2(x 减 1) 等于 2x 减 2：对定义域内每一个实数 x 都成立。"
          }
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text
            x="360"
            y="34"
            textAnchor="middle"
            fontSize="16"
            fontWeight="700"
            fill={primary}
          >
            同一个等号，先问它在完成什么任务
          </text>
          <text
            x="360"
            y="58"
            textAnchor="middle"
            fontSize="12"
            fill={secondary}
          >
            {isEquation
              ? "方程式：筛选满足关系的输入"
              : "恒等式：说明两种写法对所有输入相同"}
          </text>

          <rect
            x="48"
            y="90"
            width="624"
            height="92"
            rx="12"
            fill={accent}
            fillOpacity="0.08"
            stroke={accent}
            strokeOpacity="0.5"
          />
          <text
            x="360"
            y="132"
            textAnchor="middle"
            fontSize="24"
            fontFamily="monospace"
            fontWeight="700"
            fill={accent}
          >
            {isEquation ? "x + 1 = 3" : "2(x − 1) = 2x − 2"}
          </text>
          <text
            x="360"
            y="160"
            textAnchor="middle"
            fontSize="12"
            fill={primary}
          >
            {isEquation
              ? "求解：x = 2 是完整解集"
              : "证明：任意允许的 x 都满足"}
          </text>

          <line x1="360" y1="200" x2="360" y2="338" stroke={border} />
          <text x="76" y="222" fontSize="13" fontWeight="700" fill={success}>
            要交付的证据
          </text>
          <text x="76" y="250" fontSize="12" fill={primary}>
            {isEquation ? "• 定义域：x ∈ ℝ" : "• 定义域：x ∈ ℝ"}
          </text>
          <text x="76" y="276" fontSize="12" fill={primary}>
            {isEquation ? "• 候选：x = 2" : "• 量词：对所有 x"}
          </text>
          <text x="76" y="302" fontSize="12" fill={primary}>
            {isEquation ? "• 回代：2 + 1 = 3 ✓" : "• 变形：分配律与合并同类项"}
          </text>
          <rect
            x="402"
            y="218"
            width="240"
            height="96"
            rx="10"
            fill={isEquation ? success : warning}
            fillOpacity="0.08"
            stroke={isEquation ? success : warning}
            strokeOpacity="0.55"
          />
          <text
            x="422"
            y="246"
            fontSize="13"
            fontWeight="700"
            fill={isEquation ? success : warning}
          >
            {isEquation ? "解集" : "全称断言"}
          </text>
          <text x="422" y="274" fontSize="12" fill={primary}>
            {isEquation ? "{2}" : "∀ x ∈ ℝ"}
          </text>
          <text x="422" y="300" fontSize="12" fill={secondary}>
            {isEquation ? "找出满足者" : "验证通用推导"}
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        切换标签观察任务、量词和验收证据如何一起改变；两种读法都不能只看等号外形。
      </figcaption>
    </figure>
  );
}

export function MglPrimeAbsoluteDiagram() {
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const primes = new Set([2, 3, 5, 7, 11]);

  return (
    <FormulaFrame
      ariaLabel="质数和绝对值的边界图。上方数轴标出 1、2、3、4、5、6、7、8、9、10、11、12，其中 2、3、5、7、11 是质数；下方展示绝对值把负数折到非负距离。"
      caption="定义同时给出对象、边界和判定规则：1 被排除，2 是唯一偶质数，绝对值记录到零的距离。"
    >
      <text
        x="360"
        y="32"
        textAnchor="middle"
        fontSize="16"
        fontWeight="700"
        fill={primary}
      >
        定义要能排除边界，也要能执行判定
      </text>
      <text x="78" y="72" fontSize="13" fontWeight="700" fill={accent}>
        质数筛选：整数 p ≥ 2，只有 1 和 p 两个正因数
      </text>
      <line
        x1="78"
        y1="112"
        x2="642"
        y2="112"
        stroke={border}
        strokeWidth="2"
      />
      {numbers.map((number, index) => {
        const x = 82 + index * 50;
        const prime = primes.has(number);
        return (
          <g key={number}>
            <line
              x1={x}
              y1="104"
              x2={x}
              y2="120"
              stroke={prime ? success : border}
              strokeWidth="2"
            />
            <text
              x={x}
              y="142"
              textAnchor="middle"
              fontSize="12"
              fill={primary}
            >
              {number}
            </text>
            {prime ? (
              <circle
                cx={x}
                cy="92"
                r="7"
                fill={success}
                fillOpacity="0.25"
                stroke={success}
              />
            ) : null}
          </g>
        );
      })}
      <text x="78" y="178" fontSize="12" fill={success}>
        质数：2、3、5、7、11；1 不是质数，因为“只有 1
        和自己”不提供两个不同的正因数。
      </text>
      <line
        x1="360"
        y1="204"
        x2="360"
        y2="378"
        stroke={border}
        strokeDasharray="4 4"
      />
      <text
        x="178"
        y="230"
        textAnchor="middle"
        fontSize="13"
        fontWeight="700"
        fill={accent}
      >
        绝对值 = 到零的距离
      </text>
      <line
        x1="76"
        y1="300"
        x2="300"
        y2="300"
        stroke={border}
        strokeWidth="2"
      />
      <line
        x1="188"
        y1="270"
        x2="188"
        y2="328"
        stroke={accent}
        strokeWidth="2"
      />
      <circle cx="108" cy="300" r="6" fill={warning} />
      <circle cx="268" cy="300" r="6" fill={warning} />
      <text x="108" y="350" textAnchor="middle" fontSize="12" fill={primary}>
        −3
      </text>
      <text x="268" y="350" textAnchor="middle" fontSize="12" fill={primary}>
        3
      </text>
      <text x="188" y="350" textAnchor="middle" fontSize="12" fill={success}>
        0
      </text>
      <text x="188" y="274" textAnchor="middle" fontSize="12" fill={success}>
        |−3| = |3| = 3
      </text>
      <text x="418" y="230" fontSize="13" fontWeight="700" fill={accent}>
        边界检查
      </text>
      <text x="418" y="260" fontSize="12" fill={primary}>
        正数：|x| = x
      </text>
      <text x="418" y="288" fontSize="12" fill={primary}>
        零：|0| = 0
      </text>
      <text x="418" y="316" fontSize="12" fill={primary}>
        负数：|x| = −x
      </text>
      <text x="418" y="344" fontSize="12" fill={secondary}>
        三角不等式不是定义本身
      </text>
    </FormulaFrame>
  );
}

export function MglEquationIdentityDiagram() {
  return (
    <FormulaFrame
      ariaLabel="方程式与恒等式对比图。方程式把所有输入筛选为解集，恒等式把定义域内所有输入都纳入成立范围，并标出绝对值等带条件的陈述。"
      caption="等号相同，量词不同：方程式输出解集，恒等式输出对所有允许输入的证明。"
    >
      <text
        x="360"
        y="32"
        textAnchor="middle"
        fontSize="16"
        fontWeight="700"
        fill={primary}
      >
        先补全定义域与量词，再解释等号
      </text>
      <rect
        x="52"
        y="76"
        width="278"
        height="244"
        rx="12"
        fill={success}
        fillOpacity="0.07"
        stroke={success}
        strokeOpacity="0.5"
      />
      <rect
        x="390"
        y="76"
        width="278"
        height="244"
        rx="12"
        fill={accent}
        fillOpacity="0.07"
        stroke={accent}
        strokeOpacity="0.5"
      />
      <text
        x="191"
        y="110"
        textAnchor="middle"
        fontSize="15"
        fontWeight="700"
        fill={success}
      >
        方程式
      </text>
      <text
        x="529"
        y="110"
        textAnchor="middle"
        fontSize="15"
        fontWeight="700"
        fill={accent}
      >
        恒等式
      </text>
      <text x="80" y="150" fontSize="13" fontFamily="monospace" fill={primary}>
        x − 1 = 0
      </text>
      <text x="80" y="182" fontSize="12" fill={primary}>
        问：哪些 x 让它成立？
      </text>
      <text x="80" y="218" fontSize="12" fill={primary}>
        证据：完整解集 {"{1}"}
      </text>
      <text x="80" y="254" fontSize="12" fill={secondary}>
        存在性：至少找一个满足者
      </text>
      <circle
        cx="191"
        cy="288"
        r="20"
        fill={success}
        fillOpacity="0.18"
        stroke={success}
      />
      <text x="191" y="293" textAnchor="middle" fontSize="12" fill={success}>
        1
      </text>
      <text x="418" y="150" fontSize="13" fontFamily="monospace" fill={primary}>
        2(x−1) = 2x−2
      </text>
      <text x="418" y="182" fontSize="12" fill={primary}>
        问：所有 x 都成立吗？
      </text>
      <text x="418" y="218" fontSize="12" fill={primary}>
        证据：分配律的通用推导
      </text>
      <text x="418" y="254" fontSize="12" fill={secondary}>
        全称性：∀ x ∈ ℝ
      </text>
      <circle
        cx="529"
        cy="288"
        r="20"
        fill={accent}
        fillOpacity="0.18"
        stroke={accent}
      />
      <text x="529" y="293" textAnchor="middle" fontSize="12" fill={accent}>
        全域
      </text>
      <text x="360" y="365" textAnchor="middle" fontSize="12" fill={warning}>
        |x| = x 只有在 x ≥ 0 时成立：补上前提后，歧义才消失
      </text>
    </FormulaFrame>
  );
}

export function MglProductSumDiagram() {
  return (
    <FormulaFrame
      ariaLabel="积的形式与和的形式转换图。二次多项式先以 x 减 alpha 乘 x 减 beta 的积形式显示两个零点，再展开为 x 平方减 alpha 加 beta 乘 x 加 alpha beta 的和式，指出两种形式保留同一解集但突出不同信息。"
      caption="积式把零点放在台前，和式把系数结构放在台前；变形前先说清楚下一步要看什么。"
    >
      <text
        x="360"
        y="32"
        textAnchor="middle"
        fontSize="16"
        fontWeight="700"
        fill={primary}
      >
        同一个多项式，两种观察窗口
      </text>
      <rect
        x="48"
        y="82"
        width="244"
        height="156"
        rx="12"
        fill={success}
        fillOpacity="0.08"
        stroke={success}
        strokeOpacity="0.5"
      />
      <rect
        x="428"
        y="82"
        width="244"
        height="156"
        rx="12"
        fill={accent}
        fillOpacity="0.08"
        stroke={accent}
        strokeOpacity="0.5"
      />
      <text
        x="170"
        y="116"
        textAnchor="middle"
        fontSize="14"
        fontWeight="700"
        fill={success}
      >
        积的形式
      </text>
      <text
        x="170"
        y="154"
        textAnchor="middle"
        fontSize="15"
        fontFamily="monospace"
        fill={primary}
      >
        (x−α)(x−β)
      </text>
      <text x="170" y="188" textAnchor="middle" fontSize="12" fill={success}>
        零点：x = α 或 x = β
      </text>
      <text x="170" y="216" textAnchor="middle" fontSize="12" fill={secondary}>
        零乘积性质
      </text>
      <text
        x="360"
        y="164"
        textAnchor="middle"
        fontSize="26"
        fontWeight="700"
        fill={warning}
      >
        ⇄
      </text>
      <text
        x="550"
        y="116"
        textAnchor="middle"
        fontSize="14"
        fontWeight="700"
        fill={accent}
      >
        和的形式
      </text>
      <text
        x="550"
        y="154"
        textAnchor="middle"
        fontSize="14"
        fontFamily="monospace"
        fill={primary}
      >
        x²−(α+β)x+αβ
      </text>
      <text x="550" y="188" textAnchor="middle" fontSize="12" fill={accent}>
        系数：根的和与积
      </text>
      <text x="550" y="216" textAnchor="middle" fontSize="12" fill={secondary}>
        展开与比较
      </text>
      <line
        x1="80"
        y1="276"
        x2="640"
        y2="276"
        stroke={border}
        strokeWidth="2"
      />
      <circle cx="80" cy="276" r="6" fill={success} />
      <circle cx="360" cy="276" r="6" fill={warning} />
      <circle cx="640" cy="276" r="6" fill={accent} />
      <text x="80" y="308" textAnchor="middle" fontSize="12" fill={primary}>
        看零点
      </text>
      <text x="360" y="308" textAnchor="middle" fontSize="12" fill={primary}>
        保持恒等
      </text>
      <text x="640" y="308" textAnchor="middle" fontSize="12" fill={primary}>
        看系数
      </text>
      <text x="360" y="356" textAnchor="middle" fontSize="12" fill={secondary}>
        在实数、复数等无零因子数域中，零乘积推理才可直接使用
      </text>
    </FormulaFrame>
  );
}
