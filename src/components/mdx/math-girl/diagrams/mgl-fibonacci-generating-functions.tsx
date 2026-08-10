"use client";

const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";
const accent = "var(--accent)";
const success = "var(--success)";
const warning = "var(--warning)";
const danger = "var(--danger)";

function FibonacciFrame({
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

export function MglFibonacciRecurrenceDiagram() {
  return (
    <FibonacciFrame
      ariaLabel="斐波那契递推图：每一项由前两项相加得到，并用长度为1或2的铺砖分类解释加法来源。"
      caption="递推式不仅生成数字，还可以来自互斥且完备的组合分类。"
    >
      <text
        x="360"
        y="34"
        textAnchor="middle"
        fontSize="17"
        fontWeight="700"
        fill={primary}
      >
        局部规则：Fₙ = Fₙ₋₁ + Fₙ₋₂
      </text>
      <text x="360" y="57" textAnchor="middle" fontSize="12" fill={secondary}>
        两个初值 + 适用下标 + 递推关系，才是数列的完整身份证
      </text>

      <rect
        x="38"
        y="102"
        width="270"
        height="92"
        rx="9"
        fill={accent}
        fillOpacity="0.08"
        stroke={accent}
      />
      <text
        x="173"
        y="130"
        textAnchor="middle"
        fontSize="13"
        fontWeight="700"
        fill={accent}
      >
        数值轨道
      </text>
      <text x="173" y="158" textAnchor="middle" fontSize="13" fill={primary}>
        0, 1, 1, 2, 3, 5, 8, 13
      </text>
      <text
        x="173"
        y="181"
        textAnchor="middle"
        fontSize="11.5"
        fill={secondary}
      >
        F₀=0，F₁=1，再按规则推进
      </text>

      <path
        d="M326 148 C 352 126, 368 126, 394 148"
        fill="none"
        stroke={secondary}
        strokeWidth="1.5"
      />
      <text
        x="360"
        y="121"
        textAnchor="middle"
        fontSize="11.5"
        fill={secondary}
      >
        解释
      </text>

      <rect
        x="412"
        y="102"
        width="270"
        height="92"
        rx="9"
        fill={success}
        fillOpacity="0.08"
        stroke={success}
      />
      <text
        x="547"
        y="130"
        textAnchor="middle"
        fontSize="13"
        fontWeight="700"
        fill={success}
      >
        分类轨道
      </text>
      <text x="547" y="158" textAnchor="middle" fontSize="12" fill={primary}>
        最后一块长 1：Tₙ₋₁
      </text>
      <text x="547" y="180" textAnchor="middle" fontSize="12" fill={primary}>
        最后一块长 2：Tₙ₋₂
      </text>

      <rect
        x="72"
        y="246"
        width="576"
        height="86"
        rx="9"
        fill={warning}
        fillOpacity="0.06"
        stroke={border}
      />
      <text
        x="360"
        y="274"
        textAnchor="middle"
        fontSize="13"
        fontWeight="700"
        fill={warning}
      >
        递推加法的证据
      </text>
      <text x="360" y="298" textAnchor="middle" fontSize="12" fill={primary}>
        两类情况互斥、覆盖全部铺法，所以 Tₙ = Tₙ₋₁ + Tₙ₋₂。
      </text>
      <text
        x="360"
        y="319"
        textAnchor="middle"
        fontSize="11.5"
        fill={secondary}
      >
        若分类重叠会重复计数，若遗漏一种情况会少计；递推式必须说明它在数什么。
      </text>
    </FibonacciFrame>
  );
}

export function MglFibonacciGeneratingDiagram() {
  return (
    <FibonacciFrame
      ariaLabel="生成函数移位图：F(x)、xF(x)、x²F(x)按幂次对齐，F(x)-xF(x)-x²F(x)的高阶系数因递推而消去，只留下边界项 x。"
      caption="乘以 x 是下标移位；按同次幂对齐后，递推被压缩为函数方程。"
    >
      <text
        x="360"
        y="34"
        textAnchor="middle"
        fontSize="17"
        fontWeight="700"
        fill={primary}
      >
        生成函数：把下标搬到同一列
      </text>
      <text x="360" y="57" textAnchor="middle" fontSize="12" fill={secondary}>
        F(x) − xF(x) − x²F(x) = x
      </text>

      <text x="54" y="105" fontSize="13" fontWeight="700" fill={accent}>
        F(x)
      </text>
      <text x="146" y="105" fontSize="12" fill={primary}>
        F₀ + F₁x + F₂x² + F₃x³ + …
      </text>
      <line x1="54" y1="116" x2="666" y2="116" stroke={border} />

      <text x="54" y="159" fontSize="13" fontWeight="700" fill={success}>
        xF(x)
      </text>
      <text x="146" y="159" fontSize="12" fill={primary}>
        {" "}
        F₀x + F₁x² + F₂x³ + …
      </text>
      <line x1="54" y1="170" x2="666" y2="170" stroke={border} />

      <text x="54" y="213" fontSize="13" fontWeight="700" fill={warning}>
        x²F(x)
      </text>
      <text x="146" y="213" fontSize="12" fill={primary}>
        {" "}
        F₀x² + F₁x³ + …
      </text>
      <line x1="54" y1="224" x2="666" y2="224" stroke={border} />

      <rect
        x="74"
        y="256"
        width="572"
        height="76"
        rx="9"
        fill={danger}
        fillOpacity="0.06"
        stroke={danger}
      />
      <text
        x="360"
        y="283"
        textAnchor="middle"
        fontSize="13"
        fontWeight="700"
        fill={danger}
      >
        高阶项消去，边界项留下
      </text>
      <text x="360" y="307" textAnchor="middle" fontSize="12" fill={primary}>
        [xⁿ](F − xF − x²F) = Fₙ − Fₙ₋₁ − Fₙ₋₂ = 0（n 大于等于 2）
      </text>
      <text
        x="360"
        y="324"
        textAnchor="middle"
        fontSize="11.5"
        fill={secondary}
      >
        F₀=0、F₁−F₀=1，所以 (1−x−x²)F(x)=x。
      </text>
    </FibonacciFrame>
  );
}

export function MglFibonacciClosedFormDiagram() {
  return (
    <FibonacciFrame
      ariaLabel="斐波那契封闭表达式图：特征方程 r²-r-1=0 的两个根 phi 和 psi 分解生成函数分母，再展开等比级数取出系数。"
      caption="递推的特征根与生成函数分母的因子表达同一增长结构。"
    >
      <text
        x="360"
        y="34"
        textAnchor="middle"
        fontSize="17"
        fontWeight="700"
        fill={primary}
      >
        分母因子：从递推根取回系数
      </text>
      <text x="360" y="57" textAnchor="middle" fontSize="12" fill={secondary}>
        r² − r − 1 = 0 ⇔ 1 − x − x² = (1 − φx)(1 − ψx)
      </text>

      <rect
        x="42"
        y="102"
        width="184"
        height="86"
        rx="9"
        fill={accent}
        fillOpacity="0.08"
        stroke={accent}
      />
      <text
        x="134"
        y="130"
        textAnchor="middle"
        fontSize="13"
        fontWeight="700"
        fill={accent}
      >
        特征方程
      </text>
      <text x="134" y="157" textAnchor="middle" fontSize="12" fill={primary}>
        φ=(1+√5)/2
      </text>
      <text x="134" y="177" textAnchor="middle" fontSize="12" fill={primary}>
        ψ=(1−√5)/2
      </text>

      <line
        x1="230"
        y1="145"
        x2="266"
        y2="145"
        stroke={secondary}
        strokeWidth="1.5"
      />

      <rect
        x="270"
        y="102"
        width="184"
        height="86"
        rx="9"
        fill={success}
        fillOpacity="0.08"
        stroke={success}
      />
      <text
        x="362"
        y="130"
        textAnchor="middle"
        fontSize="13"
        fontWeight="700"
        fill={success}
      >
        分母分解
      </text>
      <text x="362" y="157" textAnchor="middle" fontSize="12" fill={primary}>
        1−x−x²
      </text>
      <text x="362" y="177" textAnchor="middle" fontSize="11.5" fill={primary}>
        (1−φx)(1−ψx)
      </text>

      <line
        x1="458"
        y1="145"
        x2="494"
        y2="145"
        stroke={secondary}
        strokeWidth="1.5"
      />

      <rect
        x="498"
        y="102"
        width="180"
        height="86"
        rx="9"
        fill={warning}
        fillOpacity="0.08"
        stroke={warning}
      />
      <text
        x="588"
        y="130"
        textAnchor="middle"
        fontSize="13"
        fontWeight="700"
        fill={warning}
      >
        取系数
      </text>
      <text x="588" y="157" textAnchor="middle" fontSize="12" fill={primary}>
        1/(1−αx)
      </text>
      <text x="588" y="177" textAnchor="middle" fontSize="11.5" fill={primary}>
        → αⁿxⁿ
      </text>

      <rect
        x="78"
        y="248"
        width="564"
        height="78"
        rx="9"
        fill={danger}
        fillOpacity="0.06"
        stroke={danger}
      />
      <text
        x="360"
        y="276"
        textAnchor="middle"
        fontSize="13"
        fontWeight="700"
        fill={danger}
      >
        封闭表达式
      </text>
      <text x="360" y="301" textAnchor="middle" fontSize="14" fill={primary}>
        Fₙ = (φⁿ − ψⁿ) / √5
      </text>
      <text
        x="360"
        y="318"
        textAnchor="middle"
        fontSize="11.5"
        fill={secondary}
      >
        两个初值 + 同一递推，再次验证这条公式不是数值巧合。
      </text>
    </FibonacciFrame>
  );
}

export function MglFibonacciEvidenceDiagram() {
  const checks = [
    { x: 52, title: "初值", detail: "F₀、F₁", color: accent },
    { x: 210, title: "递推", detail: "代回 Fₙ", color: success },
    { x: 368, title: "系数", detail: "[xⁿ] 对齐", color: warning },
    { x: 526, title: "增长", detail: "φ 主导", color: danger },
  ];

  return (
    <FibonacciFrame
      ariaLabel="斐波那契封闭表达式的四条验收证据：初值、递推、生成函数系数和黄金比增长率。"
      caption="独立证据共同定位索引错位、符号错误、分子漏项和增长判断错误。"
    >
      <text
        x="360"
        y="34"
        textAnchor="middle"
        fontSize="17"
        fontWeight="700"
        fill={primary}
      >
        公式验收：不要只看前十项
      </text>
      <text x="360" y="57" textAnchor="middle" fontSize="12" fill={secondary}>
        “数值吻合”只是线索，完整证据需要覆盖不同推导环节
      </text>

      {checks.map((check, index) => (
        <g key={check.title}>
          <circle
            cx={check.x + 58}
            cy="150"
            r="43"
            fill={check.color}
            fillOpacity="0.12"
            stroke={check.color}
            strokeWidth="1.5"
          />
          <text
            x={check.x + 58}
            y="146"
            textAnchor="middle"
            fontSize="14"
            fontWeight="700"
            fill={check.color}
          >
            {index + 1}
          </text>
          <text
            x={check.x + 58}
            y="168"
            textAnchor="middle"
            fontSize="12"
            fill={primary}
          >
            {check.title}
          </text>
          {index < checks.length - 1 ? (
            <line
              x1={check.x + 104}
              y1="150"
              x2={check.x + 147}
              y2="150"
              stroke={secondary}
              strokeWidth="1.4"
            />
          ) : null}
          <text
            x={check.x + 58}
            y="225"
            textAnchor="middle"
            fontSize="11.5"
            fill={secondary}
          >
            {check.detail}
          </text>
        </g>
      ))}

      <rect
        x="60"
        y="270"
        width="600"
        height="62"
        rx="9"
        fill={accent}
        fillOpacity="0.05"
        stroke={border}
      />
      <text
        x="360"
        y="296"
        textAnchor="middle"
        fontSize="12"
        fontWeight="700"
        fill={accent}
      >
        四条证据各抓一个错误
      </text>
      <text x="360" y="316" textAnchor="middle" fontSize="11.5" fill={primary}>
        初值查边界项，递推查特征根，系数查索引，增长查主导项与数值精度。
      </text>
    </FibonacciFrame>
  );
}
