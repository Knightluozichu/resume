"use client";

/**
 * <MglEquationsDiagram>：方程求解与韦达定理图解（mgl-equations 章）。
 *
 * 左侧：二次方程的图像与判别式三种情况。
 * 右侧：韦达定理示意 + 高次方程可解性。
 *
 * 纯静态展示，无交互。Server Component。
 */

const VIEW_W = 720;
const VIEW_H = 420;

const accent = "var(--accent)";
const success = "var(--success)";
const warning = "var(--warning)";
const danger = "var(--danger)";
const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";
export function MglEquationsDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="方程求解图解。左侧展示二次方程 y=x²-5x+6 的抛物线，标注两根 x=2 和 x=3，以及韦达定理 x₁+x₂=5, x₁·x₂=6。右侧展示判别式三种情况：Δ>0 两实根、Δ=0 重根、Δ<0 复根。底部展示方程次数与可解性：1-4次有公式，5次及以上无通用公式。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text
            x={VIEW_W / 2}
            y="36"
            textAnchor="middle"
            fontSize="16"
            fontWeight="700"
            fill={primary}
          >
            方程求解与韦达定理
          </text>
          <text
            x={VIEW_W / 2}
            y="58"
            textAnchor="middle"
            fontSize="12"
            fill={secondary}
          >
            根与系数的深层联系
          </text>

          <line
            x1="340"
            y1="74"
            x2="340"
            y2="400"
            stroke={border}
            strokeWidth="1"
            strokeDasharray="4 4"
          />

          {/* ===== 左侧：抛物线 + 韦达 ===== */}
          <text
            x="180"
            y="92"
            textAnchor="middle"
            fontSize="13"
            fontWeight="700"
            fill={accent}
          >
            y = x² - 5x + 6
          </text>

          {/* 简化抛物线 */}
          <path
            d="M 80 180 Q 180 280 180 180"
            fill="none"
            stroke={accent}
            strokeWidth="2"
          />
          <path
            d="M 180 180 Q 180 280 280 180"
            fill="none"
            stroke={accent}
            strokeWidth="2"
          />

          {/* x 轴 */}
          <line
            x1="60"
            y1="180"
            x2="300"
            y2="180"
            stroke={border}
            strokeWidth="1"
          />
          {/* y 轴 */}
          <line
            x1="180"
            y1="100"
            x2="180"
            y2="240"
            stroke={border}
            strokeWidth="1"
          />

          {/* 根 */}
          <circle cx="120" cy="180" r="4" fill={success} />
          <text
            x="120"
            y="200"
            textAnchor="middle"
            fontSize="12"
            fontWeight="600"
            fill={success}
          >
            x₁=2
          </text>
          <circle cx="240" cy="180" r="4" fill={success} />
          <text
            x="240"
            y="200"
            textAnchor="middle"
            fontSize="12"
            fontWeight="600"
            fill={success}
          >
            x₂=3
          </text>

          {/* 韦达定理 */}
          <rect
            x="60"
            y="220"
            width="240"
            height="60"
            rx="8"
            fill={success}
            fillOpacity="0.06"
            stroke={success}
            strokeWidth="1"
            strokeOpacity="0.4"
          />
          <text
            x="180"
            y="240"
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill={success}
          >
            韦达定理
          </text>
          <text
            x="180"
            y="260"
            textAnchor="middle"
            fontSize="12"
            fontFamily="monospace"
            fill={primary}
          >
            x₁ + x₂ = 5 = -b/a
          </text>
          <text
            x="180"
            y="276"
            textAnchor="middle"
            fontSize="12"
            fontFamily="monospace"
            fill={primary}
          >
            x₁ · x₂ = 6 = c/a
          </text>

          {/* ===== 右侧：判别式 + 可解性 ===== */}
          <text
            x="530"
            y="92"
            textAnchor="middle"
            fontSize="13"
            fontWeight="700"
            fill={accent}
          >
            判别式 Δ = b²-4ac
          </text>

          <rect
            x="360"
            y="104"
            width="312"
            height="36"
            rx="6"
            fill={success}
            fillOpacity="0.06"
            stroke={success}
            strokeWidth="1"
            strokeOpacity="0.4"
          />
          <text x="376" y="127" fontSize="11" fill={primary}>
            Δ &gt; 0：两个不同实根
          </text>

          <rect
            x="360"
            y="148"
            width="312"
            height="36"
            rx="6"
            fill={warning}
            fillOpacity="0.06"
            stroke={warning}
            strokeWidth="1"
            strokeOpacity="0.4"
          />
          <text x="376" y="171" fontSize="11" fill={primary}>
            Δ = 0：一个重根（抛物线切 x 轴）
          </text>

          <rect
            x="360"
            y="192"
            width="312"
            height="36"
            rx="6"
            fill={danger}
            fillOpacity="0.06"
            stroke={danger}
            strokeWidth="1"
            strokeOpacity="0.4"
          />
          <text x="376" y="215" fontSize="11" fill={primary}>
            Δ &lt; 0：两个共轭复根（不与 x 轴相交）
          </text>

          {/* 可解性 */}
          <rect
            x="360"
            y="244"
            width="312"
            height="128"
            rx="8"
            fill={danger}
            fillOpacity="0.04"
            stroke={danger}
            strokeWidth="1"
            strokeOpacity="0.3"
          />
          <text x="376" y="264" fontSize="12" fontWeight="700" fill={danger}>
            方程可解性
          </text>
          <text x="376" y="286" fontSize="11" fill={success}>
            1次：x = -b/a ✓
          </text>
          <text x="376" y="304" fontSize="11" fill={success}>
            2次：求根公式 ✓
          </text>
          <text x="376" y="322" fontSize="11" fill={success}>
            3次：卡尔丹诺公式 ✓
          </text>
          <text x="376" y="340" fontSize="11" fill={success}>
            4次：费拉里公式 ✓
          </text>
          <text x="376" y="358" fontSize="11" fontWeight="600" fill={danger}>
            5次+：一般式无通用根式公式
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        韦达定理用系数表达根的对称量；阿贝尔-鲁菲尼定理否定的是一般五次及以上方程的通用根式公式，而非每个高次方程都不可求解。
      </figcaption>
    </figure>
  );
}

function EquationFrame({
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

export function MglEquationsEquivalenceDiagram() {
  return (
    <EquationFrame
      ariaLabel="方程等价变形检查图：从定义域开始，区分保持解集的操作、可能引入或丢失解的操作，最后代回原方程验收候选解。"
      caption="求解流程把等价步骤和单向步骤分开，候选解必须回到原方程验收。"
    >
      <defs>
        <marker
          id="mgl-equation-equivalence-arrow"
          markerWidth="8"
          markerHeight="8"
          refX="7"
          refY="4"
          orient="auto"
        >
          <path d="M0,0 L8,4 L0,8 Z" fill={secondary} />
        </marker>
      </defs>
      <text
        x="360"
        y="34"
        textAnchor="middle"
        fontSize="17"
        fontWeight="700"
        fill={primary}
      >
        求解不是“把 x 挪到一边”
      </text>
      <text x="360" y="57" textAnchor="middle" fontSize="12" fill={secondary}>
        每一步都要回答：解集是否完全保持？
      </text>

      <rect
        x="42"
        y="100"
        width="150"
        height="88"
        rx="9"
        fill={accent}
        fillOpacity="0.08"
        stroke={accent}
      />
      <text
        x="117"
        y="128"
        textAnchor="middle"
        fontSize="13"
        fontWeight="700"
        fill={accent}
      >
        1 · 定义域
      </text>
      <text x="117" y="153" textAnchor="middle" fontSize="11.5" fill={primary}>
        分母不为 0
      </text>
      <text x="117" y="174" textAnchor="middle" fontSize="11.5" fill={primary}>
        根式有定义
      </text>

      <line
        x1="195"
        y1="144"
        x2="224"
        y2="144"
        stroke={secondary}
        strokeWidth="1.5"
        markerEnd="url(#mgl-equation-equivalence-arrow)"
      />

      <rect
        x="228"
        y="100"
        width="150"
        height="88"
        rx="9"
        fill={success}
        fillOpacity="0.08"
        stroke={success}
      />
      <text
        x="303"
        y="128"
        textAnchor="middle"
        fontSize="13"
        fontWeight="700"
        fill={success}
      >
        2 · 等价操作
      </text>
      <text x="303" y="153" textAnchor="middle" fontSize="11.5" fill={primary}>
        同加、同减
      </text>
      <text x="303" y="174" textAnchor="middle" fontSize="11.5" fill={primary}>
        乘以非零量
      </text>

      <line
        x1="381"
        y1="144"
        x2="410"
        y2="144"
        stroke={secondary}
        strokeWidth="1.5"
        markerEnd="url(#mgl-equation-equivalence-arrow)"
      />

      <rect
        x="414"
        y="100"
        width="150"
        height="88"
        rx="9"
        fill={warning}
        fillOpacity="0.08"
        stroke={warning}
      />
      <text
        x="489"
        y="128"
        textAnchor="middle"
        fontSize="13"
        fontWeight="700"
        fill={warning}
      >
        3 · 候选集
      </text>
      <text x="489" y="153" textAnchor="middle" fontSize="11.5" fill={primary}>
        平方、开方
      </text>
      <text x="489" y="174" textAnchor="middle" fontSize="11.5" fill={primary}>
        可能增根或漏根
      </text>

      <line
        x1="567"
        y1="144"
        x2="596"
        y2="144"
        stroke={secondary}
        strokeWidth="1.5"
        markerEnd="url(#mgl-equation-equivalence-arrow)"
      />

      <rect
        x="600"
        y="100"
        width="78"
        height="88"
        rx="9"
        fill={danger}
        fillOpacity="0.08"
        stroke={danger}
      />
      <text
        x="639"
        y="128"
        textAnchor="middle"
        fontSize="13"
        fontWeight="700"
        fill={danger}
      >
        4 · 回代
      </text>
      <text x="639" y="153" textAnchor="middle" fontSize="11" fill={primary}>
        原式
      </text>
      <text x="639" y="174" textAnchor="middle" fontSize="11" fill={primary}>
        验收
      </text>

      <rect
        x="58"
        y="238"
        width="604"
        height="86"
        rx="9"
        fill={accent}
        fillOpacity="0.05"
        stroke={border}
      />
      <text
        x="360"
        y="266"
        textAnchor="middle"
        fontSize="13"
        fontWeight="700"
        fill={accent}
      >
        危险示例：x(x−1)=0
      </text>
      <text x="360" y="291" textAnchor="middle" fontSize="12" fill={primary}>
        若直接除以 x，会丢掉 x=0；若两边平方，必须回代筛掉不符合原式的候选。
      </text>
      <text
        x="360"
        y="313"
        textAnchor="middle"
        fontSize="11.5"
        fill={secondary}
      >
        所以“变形正确”不只看符号外形，还要看定义域、可逆条件和解集关系。
      </text>
    </EquationFrame>
  );
}

export function MglEquationsLinearSystemDiagram() {
  return (
    <EquationFrame
      ariaLabel="线性方程组分类图：增广矩阵经过行变换后，根据矛盾行、主元列和自由变量区分无解、唯一解和无穷多解。"
      caption="行变换保持解集；主元与自由变量决定解的结构。"
    >
      <text
        x="360"
        y="34"
        textAnchor="middle"
        fontSize="17"
        fontWeight="700"
        fill={primary}
      >
        线性系统：先看解集的形状
      </text>
      <text x="360" y="57" textAnchor="middle" fontSize="12" fill={secondary}>
        det 不为 0 只直接保证唯一解；det 为 0 还需要看增广矩阵
      </text>

      <rect
        x="48"
        y="96"
        width="200"
        height="90"
        rx="9"
        fill={accent}
        fillOpacity="0.08"
        stroke={accent}
      />
      <text
        x="148"
        y="124"
        textAnchor="middle"
        fontSize="13"
        fontWeight="700"
        fill={accent}
      >
        增广矩阵
      </text>
      <text x="148" y="151" textAnchor="middle" fontSize="14" fill={primary}>
        [ A | b ]
      </text>
      <text
        x="148"
        y="173"
        textAnchor="middle"
        fontSize="11.5"
        fill={secondary}
      >
        交换、倍乘、消元
      </text>

      <line
        x1="251"
        y1="141"
        x2="281"
        y2="141"
        stroke={secondary}
        strokeWidth="1.5"
      />

      <rect
        x="285"
        y="96"
        width="150"
        height="90"
        rx="9"
        fill={success}
        fillOpacity="0.08"
        stroke={success}
      />
      <text
        x="360"
        y="124"
        textAnchor="middle"
        fontSize="13"
        fontWeight="700"
        fill={success}
      >
        阶梯形
      </text>
      <text x="360" y="151" textAnchor="middle" fontSize="12" fill={primary}>
        主元列
      </text>
      <text
        x="360"
        y="173"
        textAnchor="middle"
        fontSize="11.5"
        fill={secondary}
      >
        自由变量
      </text>

      <line
        x1="438"
        y1="141"
        x2="468"
        y2="141"
        stroke={secondary}
        strokeWidth="1.5"
      />

      <rect
        x="472"
        y="78"
        width="210"
        height="58"
        rx="8"
        fill={danger}
        fillOpacity="0.07"
        stroke={danger}
      />
      <text
        x="577"
        y="103"
        textAnchor="middle"
        fontSize="12.5"
        fontWeight="700"
        fill={danger}
      >
        无解
      </text>
      <text x="577" y="123" textAnchor="middle" fontSize="11.5" fill={primary}>
        出现 0 = 非零
      </text>

      <rect
        x="472"
        y="148"
        width="210"
        height="58"
        rx="8"
        fill={success}
        fillOpacity="0.07"
        stroke={success}
      />
      <text
        x="577"
        y="173"
        textAnchor="middle"
        fontSize="12.5"
        fontWeight="700"
        fill={success}
      >
        唯一解
      </text>
      <text x="577" y="193" textAnchor="middle" fontSize="11.5" fill={primary}>
        每个未知量都有主元
      </text>

      <rect
        x="78"
        y="248"
        width="564"
        height="76"
        rx="9"
        fill={warning}
        fillOpacity="0.06"
        stroke={warning}
      />
      <text
        x="360"
        y="276"
        textAnchor="middle"
        fontSize="13"
        fontWeight="700"
        fill={warning}
      >
        无穷多解
      </text>
      <text x="360" y="300" textAnchor="middle" fontSize="12" fill={primary}>
        无矛盾且有自由变量：用参数表达整族解，而不是随便挑一个特例。
      </text>
    </EquationFrame>
  );
}

export function MglEquationsNumericalDiagram() {
  return (
    <EquationFrame
      ariaLabel="数值求根的证据图：牛顿迭代从当前点计算切线交点，记录残差、导数保护、迭代上限，并用二分区间保护失败路径。"
      caption="数值答案必须同时交付候选根、残差、停止原因和失败边界。"
    >
      <text
        x="360"
        y="34"
        textAnchor="middle"
        fontSize="17"
        fontWeight="700"
        fill={primary}
      >
        牛顿迭代：近似值也要有证据
      </text>
      <text x="360" y="57" textAnchor="middle" fontSize="12" fill={secondary}>
        xₙ₊₁ = xₙ − f(xₙ) / f′(xₙ)
      </text>

      <line
        x1="62"
        y1="230"
        x2="658"
        y2="230"
        stroke={border}
        strokeWidth="1"
      />
      <path
        d="M78 286 C 188 278, 222 132, 330 154 C 432 176, 488 288, 638 112"
        fill="none"
        stroke={accent}
        strokeWidth="2"
      />
      <line
        x1="174"
        y1="278"
        x2="422"
        y2="94"
        stroke={secondary}
        strokeWidth="1.4"
        strokeDasharray="5 4"
      />
      <circle cx="174" cy="278" r="5" fill={warning} />
      <circle cx="422" cy="94" r="5" fill={success} />
      <text
        x="174"
        y="304"
        textAnchor="middle"
        fontSize="12"
        fontWeight="700"
        fill={warning}
      >
        xₙ
      </text>
      <text
        x="422"
        y="82"
        textAnchor="middle"
        fontSize="12"
        fontWeight="700"
        fill={success}
      >
        xₙ₊₁
      </text>
      <text
        x="360"
        y="215"
        textAnchor="middle"
        fontSize="11.5"
        fill={secondary}
      >
        切线与 x 轴的交点
      </text>

      <rect
        x="52"
        y="330"
        width="190"
        height="44"
        rx="8"
        fill={success}
        fillOpacity="0.07"
        stroke={success}
      />
      <text
        x="147"
        y="348"
        textAnchor="middle"
        fontSize="11.5"
        fontWeight="700"
        fill={success}
      >
        成功证据
      </text>
      <text x="147" y="365" textAnchor="middle" fontSize="11" fill={primary}>
        残差 ≤ 容差，记录迭代次数
      </text>

      <rect
        x="265"
        y="330"
        width="190"
        height="44"
        rx="8"
        fill={warning}
        fillOpacity="0.07"
        stroke={warning}
      />
      <text
        x="360"
        y="348"
        textAnchor="middle"
        fontSize="11.5"
        fontWeight="700"
        fill={warning}
      >
        保护条件
      </text>
      <text x="360" y="365" textAnchor="middle" fontSize="11" fill={primary}>
        导数过小或越界就停止
      </text>

      <rect
        x="478"
        y="330"
        width="190"
        height="44"
        rx="8"
        fill={danger}
        fillOpacity="0.07"
        stroke={danger}
      />
      <text
        x="573"
        y="348"
        textAnchor="middle"
        fontSize="11.5"
        fontWeight="700"
        fill={danger}
      >
        备用路径
      </text>
      <text x="573" y="365" textAnchor="middle" fontSize="11" fill={primary}>
        异号区间用二分法兜底
      </text>
    </EquationFrame>
  );
}
