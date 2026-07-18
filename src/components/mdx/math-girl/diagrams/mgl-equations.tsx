"use client";

import { MathGirlOfficialLab } from "./official-lab";

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

const invariantCases = [
  {
    label: "等价变形",
    fields: [
      ["目标", "保持解集不变"],
      ["加减同式", "总是可逆"],
      ["乘非零量", "可逆"],
      ["乘可能为零量", "可能引入增根"],
    ],
  },
  {
    label: "定义域",
    fields: [
      ["分母", "不得为0"],
      ["偶次根式", "实数范围内被开方数非负"],
      ["对数", "真数为正且底合法"],
      ["先做", "在变形前写出约束"],
    ],
  },
  {
    label: "检验候选",
    fields: [
      ["来源", "平方、通分、约分后得到候选"],
      ["动作", "代回原方程"],
      ["增根", "满足变形后方程但不满足原方程"],
      ["漏根", "不可逆操作删除的原解"],
    ],
  },
  {
    label: "验收清单",
    fields: [
      ["对象", "方程与定义域"],
      ["过程", "每步标记等价或单向推出"],
      ["结果", "候选解代回"],
      ["输出", "最终解集而非一个数"],
    ],
    alert:
      "等号两边做“相同操作”并不自动保证等价；操作还必须在当前定义域内可逆。",
  },
] as const;

const polynomialCases = [
  {
    label: "二次根",
    fields: [
      ["方程", "ax²+bx+c=0，a≠0"],
      ["判别式", "Δ=b²-4ac"],
      ["实根数", "由Δ正、零、负判断"],
      ["复数域", "总有两个根并计重数"],
    ],
  },
  {
    label: "韦达关系",
    fields: [
      ["根和", "r1+r2=-b/a"],
      ["根积", "r1r2=c/a"],
      ["来源", "a(x-r1)(x-r2)展开"],
      ["价值", "不必逐根求值即可算对称量"],
    ],
  },
  {
    label: "高次推广",
    fields: [
      ["对象", "根的初等对称多项式"],
      ["对应", "与归一化后的系数逐项对应"],
      ["重数", "重复根按重数计入"],
      ["底域", "需说明在实数域还是复数域"],
    ],
  },
  {
    label: "根式边界",
    fields: [
      ["一次至四次", "一般方程存在根式公式"],
      ["五次起", "一般方程无通用根式公式"],
      ["仍可解", "特殊五次可能有根式解"],
      ["其他办法", "数值法或特殊函数"],
    ],
    alert:
      "阿贝尔-鲁菲尼定理否定的是一般五次及以上方程的通用根式公式，不是否定每一个高次方程都可求解。",
  },
] as const;

const systemCases = [
  {
    label: "线性方程组",
    fields: [
      ["矩阵形式", "Ax=b"],
      ["行变换", "交换、倍乘、倍加"],
      ["目的", "化为阶梯形"],
      ["输出", "无解、唯一解或无穷多解"],
    ],
  },
  {
    label: "二阶判定",
    fields: [
      ["行列式", "det(A)=ad-bc"],
      ["非零", "唯一解"],
      ["为零", "还需比较增广矩阵"],
      ["陷阱", "det=0不等于必然无解"],
    ],
  },
  {
    label: "数值求根",
    fields: [
      ["牛顿步", "xn+1=xn-f(xn)/f′(xn)"],
      ["局部速度", "在合适条件下二次收敛"],
      ["风险", "导数小、初值差或跳出区域"],
      ["保护", "迭代上限、残差与区间检查"],
    ],
  },
  {
    label: "算法证据",
    fields: [
      ["候选", "计算得到的x"],
      ["残差", "|f(x)|或||Ax-b||"],
      ["前向误差", "与真实解的距离"],
      ["条件数", "输入扰动如何放大"],
    ],
    alert:
      "残差很小不必然意味着前向误差很小；病态问题会把很小的输入或残差扰动放大。",
  },
] as const;

export function MglEquationsDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} role="img" aria-label="方程求解图解。左侧展示二次方程 y=x²-5x+6 的抛物线，标注两根 x=2 和 x=3，以及韦达定理 x₁+x₂=5, x₁·x₂=6。右侧展示判别式三种情况：Δ>0 两实根、Δ=0 重根、Δ<0 复根。底部展示方程次数与可解性：1-4次有公式，5次及以上无通用公式。" className="mx-auto block h-auto w-full max-w-[720px]">
          <text x={VIEW_W / 2} y="36" textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>方程求解与韦达定理</text>
          <text x={VIEW_W / 2} y="58" textAnchor="middle" fontSize="12" fill={secondary}>根与系数的深层联系</text>

          <line x1="340" y1="74" x2="340" y2="400" stroke={border} strokeWidth="1" strokeDasharray="4 4" />

          {/* ===== 左侧：抛物线 + 韦达 ===== */}
          <text x="180" y="92" textAnchor="middle" fontSize="13" fontWeight="700" fill={accent}>y = x² - 5x + 6</text>

          {/* 简化抛物线 */}
          <path d="M 80 180 Q 180 280 180 180" fill="none" stroke={accent} strokeWidth="2" />
          <path d="M 180 180 Q 180 280 280 180" fill="none" stroke={accent} strokeWidth="2" />

          {/* x 轴 */}
          <line x1="60" y1="180" x2="300" y2="180" stroke={border} strokeWidth="1" />
          {/* y 轴 */}
          <line x1="180" y1="100" x2="180" y2="240" stroke={border} strokeWidth="1" />

          {/* 根 */}
          <circle cx="120" cy="180" r="4" fill={success} />
          <text x="120" y="200" textAnchor="middle" fontSize="12" fontWeight="600" fill={success}>x₁=2</text>
          <circle cx="240" cy="180" r="4" fill={success} />
          <text x="240" y="200" textAnchor="middle" fontSize="12" fontWeight="600" fill={success}>x₂=3</text>

          {/* 韦达定理 */}
          <rect x="60" y="220" width="240" height="60" rx="8" fill={success} fillOpacity="0.06" stroke={success} strokeWidth="1" strokeOpacity="0.4" />
          <text x="180" y="240" textAnchor="middle" fontSize="12" fontWeight="700" fill={success}>韦达定理</text>
          <text x="180" y="260" textAnchor="middle" fontSize="12" fontFamily="monospace" fill={primary}>x₁ + x₂ = 5 = -b/a</text>
          <text x="180" y="276" textAnchor="middle" fontSize="12" fontFamily="monospace" fill={primary}>x₁ · x₂ = 6 = c/a</text>

          {/* ===== 右侧：判别式 + 可解性 ===== */}
          <text x="530" y="92" textAnchor="middle" fontSize="13" fontWeight="700" fill={accent}>判别式 Δ = b²-4ac</text>

          <rect x="360" y="104" width="312" height="36" rx="6" fill={success} fillOpacity="0.06" stroke={success} strokeWidth="1" strokeOpacity="0.4" />
          <text x="376" y="127" fontSize="11" fill={primary}>Δ &gt; 0：两个不同实根</text>

          <rect x="360" y="148" width="312" height="36" rx="6" fill={warning} fillOpacity="0.06" stroke={warning} strokeWidth="1" strokeOpacity="0.4" />
          <text x="376" y="171" fontSize="11" fill={primary}>Δ = 0：一个重根（抛物线切 x 轴）</text>

          <rect x="360" y="192" width="312" height="36" rx="6" fill={danger} fillOpacity="0.06" stroke={danger} strokeWidth="1" strokeOpacity="0.4" />
          <text x="376" y="215" fontSize="11" fill={primary}>Δ &lt; 0：两个共轭复根（不与 x 轴相交）</text>

          {/* 可解性 */}
          <rect x="360" y="244" width="312" height="128" rx="8" fill={danger} fillOpacity="0.04" stroke={danger} strokeWidth="1" strokeOpacity="0.3" />
          <text x="376" y="264" fontSize="12" fontWeight="700" fill={danger}>方程可解性</text>
          <text x="376" y="286" fontSize="11" fill={success}>1次：x = -b/a ✓</text>
          <text x="376" y="304" fontSize="11" fill={success}>2次：求根公式 ✓</text>
          <text x="376" y="322" fontSize="11" fill={success}>3次：卡尔丹诺公式 ✓</text>
          <text x="376" y="340" fontSize="11" fill={success}>4次：费拉里公式 ✓</text>
          <text x="376" y="358" fontSize="11" fontWeight="600" fill={danger}>5次+：一般式无通用根式公式</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        韦达定理用系数表达根的对称量；阿贝尔-鲁菲尼定理否定的是一般五次及以上方程的通用根式公式，而非每个高次方程都不可求解。
      </figcaption>
    </figure>
  );
}

export function MglEquationInvariantLab() {
  return (
    <MathGirlOfficialLab
      cases={invariantCases}
      caption="解方程的核心不是机械移项，而是在定义域内维护解集；每一步都应标记等价还是单向推出。"
      tone="cyan"
    />
  );
}

export function MglVietaPolynomialLab() {
  return (
    <MathGirlOfficialLab
      cases={polynomialCases}
      caption="从因式分解展开即可读出韦达关系；高次方程的根式边界必须区分一般式与特殊实例。"
      tone="amber"
    />
  );
}

export function MglLinearNumericalLab() {
  return (
    <MathGirlOfficialLab
      cases={systemCases}
      caption="精确线性消元与数值迭代都必须交付证据：解集分类、代回结果、残差以及稳定性边界。"
      tone="violet"
    />
  );
}
