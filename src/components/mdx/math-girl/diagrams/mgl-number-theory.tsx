"use client";

/**
 * <MglNumberTheoryDiagram>：数论核心概念图解（mgl-number-theory 章）。
 *
 * 左侧：质数分解示例 + 质数无穷证明示意。
 * 右侧：欧几里得算法步骤 + RSA 流程。
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
export function MglNumberTheoryDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="数论核心概念图解。左上：算术基本定理——60=2²×3×5 的质因数分解。左下：质数无穷的反证法流程。右上：欧几里得算法 gcd(48,18) 的辗转相除步骤 48→18→12→6→0。右下：RSA 流程：选质数p,q→算n=pq,φ(n)→选e→求d→加密m^e mod n→解密c^d mod n。"
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
            数论核心：质数、GCD 与 RSA
          </text>
          <text
            x={VIEW_W / 2}
            y="58"
            textAnchor="middle"
            fontSize="12"
            fill={secondary}
          >
            古老数论驱动现代密码学
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

          {/* ===== 左上：质因数分解 ===== */}
          <rect
            x="48"
            y="80"
            width="280"
            height="76"
            rx="8"
            fill={accent}
            fillOpacity="0.06"
            stroke={accent}
            strokeWidth="1"
            strokeOpacity="0.4"
          />
          <text x="64" y="100" fontSize="12" fontWeight="700" fill={accent}>
            算术基本定理
          </text>
          <text
            x="64"
            y="122"
            fontSize="13"
            fontFamily="monospace"
            fill={primary}
          >
            60 = 2² × 3 × 5
          </text>
          <text x="64" y="142" fontSize="11" fill={secondary}>
            每个整数唯一分解为质数乘积
          </text>

          {/* ===== 左下：质数无穷 ===== */}
          <rect
            x="48"
            y="172"
            width="280"
            height="100"
            rx="8"
            fill={success}
            fillOpacity="0.06"
            stroke={success}
            strokeWidth="1"
            strokeOpacity="0.4"
          />
          <text x="64" y="192" fontSize="12" fontWeight="700" fill={success}>
            质数无穷（反证法）
          </text>
          <text x="64" y="212" fontSize="11" fill={primary}>
            ① 假设质数有限：p₁, p₂, ..., pₙ
          </text>
          <text x="64" y="230" fontSize="11" fill={primary}>
            ② 构造 N = p₁×p₂×...×pₙ + 1
          </text>
          <text x="64" y="248" fontSize="11" fill={primary}>
            ③ N 除以任何 pᵢ 都余 1
          </text>
          <text x="64" y="266" fontSize="11" fill={danger}>
            ④ N 要么是质数，要么有新质因子 → 矛盾！
          </text>

          {/* ===== 右上：欧几里得算法 ===== */}
          <rect
            x="360"
            y="80"
            width="312"
            height="100"
            rx="8"
            fill={warning}
            fillOpacity="0.06"
            stroke={warning}
            strokeWidth="1"
            strokeOpacity="0.4"
          />
          <text x="376" y="100" fontSize="12" fontWeight="700" fill={warning}>
            欧几里得算法 gcd(48, 18)
          </text>
          <text
            x="376"
            y="124"
            fontSize="12"
            fontFamily="monospace"
            fill={primary}
          >
            48 = 2×18 + 12 → gcd(18, 12)
          </text>
          <text
            x="376"
            y="144"
            fontSize="12"
            fontFamily="monospace"
            fill={primary}
          >
            18 = 1×12 + 6 → gcd(12, 6)
          </text>
          <text
            x="376"
            y="164"
            fontSize="12"
            fontFamily="monospace"
            fill={primary}
          >
            12 = 2×6 + 0 → gcd = 6 ✓
          </text>

          {/* ===== 右下：RSA ===== */}
          <rect
            x="360"
            y="196"
            width="312"
            height="176"
            rx="8"
            fill={danger}
            fillOpacity="0.06"
            stroke={danger}
            strokeWidth="1"
            strokeOpacity="0.4"
          />
          <text x="376" y="216" fontSize="12" fontWeight="700" fill={danger}>
            RSA 密码学流程
          </text>
          <text x="376" y="238" fontSize="11" fill={primary}>
            ① 选大质数 p, q
          </text>
          <text x="376" y="256" fontSize="11" fill={primary}>
            ② n = p×q, φ(n) = (p-1)(q-1)
          </text>
          <text x="376" y="274" fontSize="11" fill={primary}>
            ③ 选 e 与 φ(n) 互质（公钥）
          </text>
          <text x="376" y="292" fontSize="11" fill={primary}>
            ④ d = e⁻¹ mod φ(n)（私钥）
          </text>
          <text x="376" y="314" fontSize="11" fill={accent}>
            加密：c = mᵉ mod n
          </text>
          <text x="376" y="332" fontSize="11" fill={accent}>
            解密：m = cᵈ mod n
          </text>
          <text x="376" y="356" fontSize="11" fill={secondary}>
            安全性 ← 大数分解困难
          </text>

          {/* ===== 左底总结 ===== */}
          <rect
            x="48"
            y="290"
            width="280"
            height="82"
            rx="8"
            fill={accent}
            fillOpacity="0.04"
            stroke={accent}
            strokeWidth="1"
            strokeOpacity="0.3"
          />
          <text x="64" y="310" fontSize="12" fontWeight="700" fill={accent}>
            数论 → 编程
          </text>
          <text x="64" y="330" fontSize="11" fill={primary}>
            · GCD → 分数化简、密码学
          </text>
          <text x="64" y="348" fontSize="11" fill={primary}>
            · 模运算 → 哈希、随机数
          </text>
          <text x="64" y="366" fontSize="11" fill={primary}>
            · 质数 → RSA 加密、密钥交换
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        数论从质数分解到欧几里得算法到 RSA，古老数学驱动现代密码学。GCD
        的辗转相除、模逆元的求解、快速幂取模，都是数论在编程中的直接应用。
      </figcaption>
    </figure>
  );
}

function NumberTheoryFrame({
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

export function MglNumberTheoryProofDiagram() {
  return (
    <NumberTheoryFrame
      ariaLabel="质数无穷证明的四步结构：假设质数有限，构造所有质数乘积加一的新数，检查旧质数都不能整除它，最后得到列表之外的质因数。"
      caption="反证的关键不是乘积加一像质数，而是旧列表无法覆盖新数的质因数。"
    >
      <defs>
        <marker
          id="mgl-number-proof-arrow"
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
        质数无穷：一条可复查的反证链
      </text>
      <text x="360" y="57" textAnchor="middle" fontSize="12" fill={secondary}>
        每一步都保留对象、条件和为什么能推出下一步
      </text>

      <rect
        x="30"
        y="100"
        width="150"
        height="104"
        rx="9"
        fill={accent}
        fillOpacity="0.08"
        stroke={accent}
      />
      <text
        x="105"
        y="128"
        textAnchor="middle"
        fontSize="13"
        fontWeight="700"
        fill={accent}
      >
        1 · 假设有限
      </text>
      <text x="105" y="153" textAnchor="middle" fontSize="11.5" fill={primary}>
        质数只有
      </text>
      <text x="105" y="177" textAnchor="middle" fontSize="12" fill={primary}>
        p₁, p₂, …, pₙ
      </text>

      <line
        x1="183"
        y1="152"
        x2="208"
        y2="152"
        stroke={secondary}
        strokeWidth="1.5"
        markerEnd="url(#mgl-number-proof-arrow)"
      />

      <rect
        x="211"
        y="100"
        width="150"
        height="104"
        rx="9"
        fill={success}
        fillOpacity="0.08"
        stroke={success}
      />
      <text
        x="286"
        y="128"
        textAnchor="middle"
        fontSize="13"
        fontWeight="700"
        fill={success}
      >
        2 · 构造新数
      </text>
      <text x="286" y="153" textAnchor="middle" fontSize="11.5" fill={primary}>
        N = p₁p₂…pₙ + 1
      </text>
      <text x="286" y="177" textAnchor="middle" fontSize="11" fill={secondary}>
        N 大于 1
      </text>

      <line
        x1="364"
        y1="152"
        x2="389"
        y2="152"
        stroke={secondary}
        strokeWidth="1.5"
        markerEnd="url(#mgl-number-proof-arrow)"
      />

      <rect
        x="392"
        y="100"
        width="150"
        height="104"
        rx="9"
        fill={warning}
        fillOpacity="0.08"
        stroke={warning}
      />
      <text
        x="467"
        y="128"
        textAnchor="middle"
        fontSize="13"
        fontWeight="700"
        fill={warning}
      >
        3 · 检查整除
      </text>
      <text x="467" y="153" textAnchor="middle" fontSize="11.5" fill={primary}>
        N ÷ pᵢ 余 1
      </text>
      <text x="467" y="177" textAnchor="middle" fontSize="11" fill={secondary}>
        旧列表都被排除
      </text>

      <line
        x1="545"
        y1="152"
        x2="570"
        y2="152"
        stroke={secondary}
        strokeWidth="1.5"
        markerEnd="url(#mgl-number-proof-arrow)"
      />

      <rect
        x="573"
        y="100"
        width="117"
        height="104"
        rx="9"
        fill={danger}
        fillOpacity="0.08"
        stroke={danger}
      />
      <text
        x="631"
        y="128"
        textAnchor="middle"
        fontSize="13"
        fontWeight="700"
        fill={danger}
      >
        4 · 矛盾
      </text>
      <text x="631" y="153" textAnchor="middle" fontSize="11" fill={primary}>
        N 有质因数
      </text>
      <text x="631" y="177" textAnchor="middle" fontSize="11" fill={danger}>
        不在列表
      </text>

      <rect
        x="45"
        y="250"
        width="630"
        height="86"
        rx="9"
        fill={accent}
        fillOpacity="0.05"
        stroke={border}
      />
      <text
        x="360"
        y="278"
        textAnchor="middle"
        fontSize="13"
        fontWeight="700"
        fill={accent}
      >
        复核问题
      </text>
      <text x="360" y="302" textAnchor="middle" fontSize="12" fill={primary}>
        是否证明了 N 一定是质数？不需要；只需证明它的某个质因数不在假设列表中。
      </text>
      <text
        x="360"
        y="324"
        textAnchor="middle"
        fontSize="11.5"
        fill={secondary}
      >
        反证的对象是“有限列表覆盖全部质数”这个假设，而不是“乘积加一永远是质数”。
      </text>
    </NumberTheoryFrame>
  );
}

export function MglNumberTheoryModularDiagram() {
  return (
    <NumberTheoryFrame
      ariaLabel="从最大公约数到模逆元的计算链：辗转相除保存公因数，回代得到贝祖等式，再把等式投影到模运算中，最后用平方乘法计算模幂。"
      caption="整除关系、贝祖等式和模运算共享同一条计算证据链。"
    >
      <text
        x="360"
        y="34"
        textAnchor="middle"
        fontSize="17"
        fontWeight="700"
        fill={primary}
      >
        GCD → 贝祖等式 → 模逆元 → 快速模幂
      </text>
      <text x="360" y="57" textAnchor="middle" fontSize="12" fill={secondary}>
        每一次变形都要说明保持了什么不变量
      </text>

      <rect
        x="38"
        y="92"
        width="202"
        height="90"
        rx="9"
        fill={accent}
        fillOpacity="0.08"
        stroke={accent}
      />
      <text
        x="139"
        y="120"
        textAnchor="middle"
        fontSize="13"
        fontWeight="700"
        fill={accent}
      >
        辗转相除
      </text>
      <text x="139" y="146" textAnchor="middle" fontSize="12" fill={primary}>
        48 = 2×18 + 12
      </text>
      <text x="139" y="167" textAnchor="middle" fontSize="12" fill={primary}>
        18 = 1×12 + 6
      </text>

      <line
        x1="243"
        y1="137"
        x2="270"
        y2="137"
        stroke={secondary}
        strokeWidth="1.5"
      />

      <rect
        x="274"
        y="92"
        width="202"
        height="90"
        rx="9"
        fill={success}
        fillOpacity="0.08"
        stroke={success}
      />
      <text
        x="375"
        y="120"
        textAnchor="middle"
        fontSize="13"
        fontWeight="700"
        fill={success}
      >
        回代
      </text>
      <text x="375" y="146" textAnchor="middle" fontSize="12" fill={primary}>
        6 = 3×18 − 48
      </text>
      <text
        x="375"
        y="167"
        textAnchor="middle"
        fontSize="11.5"
        fill={secondary}
      >
        6 = ax + by
      </text>

      <line
        x1="479"
        y1="137"
        x2="506"
        y2="137"
        stroke={secondary}
        strokeWidth="1.5"
      />

      <rect
        x="510"
        y="92"
        width="172"
        height="90"
        rx="9"
        fill={warning}
        fillOpacity="0.08"
        stroke={warning}
      />
      <text
        x="596"
        y="120"
        textAnchor="middle"
        fontSize="13"
        fontWeight="700"
        fill={warning}
      >
        投影到模 m
      </text>
      <text x="596" y="146" textAnchor="middle" fontSize="12" fill={primary}>
        ax ≡ 1 (mod m)
      </text>
      <text
        x="596"
        y="167"
        textAnchor="middle"
        fontSize="11.5"
        fill={secondary}
      >
        x 是 a 的模逆元
      </text>

      <rect
        x="70"
        y="228"
        width="580"
        height="100"
        rx="9"
        fill={danger}
        fillOpacity="0.06"
        stroke={danger}
      />
      <text
        x="360"
        y="256"
        textAnchor="middle"
        fontSize="13"
        fontWeight="700"
        fill={danger}
      >
        平方乘法的循环不变量
      </text>
      <text x="360" y="281" textAnchor="middle" fontSize="12" fill={primary}>
        result 保持“已处理指数部分”的模值；base 每轮平方，exponent 每轮折半。
      </text>
      <text x="360" y="304" textAnchor="middle" fontSize="12" fill={primary}>
        因此复杂度是 O(log e)，且每个中间结果都先取模，避免无界增长。
      </text>
    </NumberTheoryFrame>
  );
}

export function MglNumberTheoryRsaDiagram() {
  return (
    <NumberTheoryFrame
      ariaLabel="RSA 教学模型的公钥私钥边界：从质数 p 和 q 计算 n 与欧拉函数，选择 e 和模逆 d，公钥加密、私钥解密，并标出裸 RSA 不等于现代安全协议。"
      caption="RSA 图解展示代数关系；真实系统还必须加入标准填充、密钥管理和侧信道防护。"
    >
      <text
        x="360"
        y="34"
        textAnchor="middle"
        fontSize="17"
        fontWeight="700"
        fill={primary}
      >
        RSA 教学模型：代数可逆，不等于协议安全
      </text>
      <text x="360" y="57" textAnchor="middle" fontSize="12" fill={secondary}>
        公钥负责公开变换，私钥负责可逆变换；安全边界需要单独审计
      </text>

      <rect
        x="38"
        y="94"
        width="182"
        height="92"
        rx="9"
        fill={accent}
        fillOpacity="0.08"
        stroke={accent}
      />
      <text
        x="129"
        y="122"
        textAnchor="middle"
        fontSize="13"
        fontWeight="700"
        fill={accent}
      >
        生成参数
      </text>
      <text x="129" y="148" textAnchor="middle" fontSize="12" fill={primary}>
        选质数 p、q
      </text>
      <text x="129" y="169" textAnchor="middle" fontSize="12" fill={primary}>
        n = pq，φ(n) = (p−1)(q−1)
      </text>

      <line
        x1="223"
        y1="140"
        x2="250"
        y2="140"
        stroke={secondary}
        strokeWidth="1.5"
      />

      <rect
        x="254"
        y="94"
        width="212"
        height="92"
        rx="9"
        fill={success}
        fillOpacity="0.08"
        stroke={success}
      />
      <text
        x="360"
        y="122"
        textAnchor="middle"
        fontSize="13"
        fontWeight="700"
        fill={success}
      >
        密钥关系
      </text>
      <text x="360" y="148" textAnchor="middle" fontSize="12" fill={primary}>
        gcd(e, φ(n)) = 1
      </text>
      <text x="360" y="169" textAnchor="middle" fontSize="12" fill={primary}>
        ed ≡ 1 (mod φ(n))
      </text>

      <line
        x1="469"
        y1="140"
        x2="496"
        y2="140"
        stroke={secondary}
        strokeWidth="1.5"
      />

      <rect
        x="500"
        y="94"
        width="182"
        height="92"
        rx="9"
        fill={warning}
        fillOpacity="0.08"
        stroke={warning}
      />
      <text
        x="591"
        y="122"
        textAnchor="middle"
        fontSize="13"
        fontWeight="700"
        fill={warning}
      >
        公开 / 保密
      </text>
      <text x="591" y="148" textAnchor="middle" fontSize="12" fill={primary}>
        公钥：(n, e)
      </text>
      <text x="591" y="169" textAnchor="middle" fontSize="12" fill={primary}>
        私钥：d 与因子信息
      </text>

      <rect
        x="70"
        y="230"
        width="272"
        height="86"
        rx="9"
        fill={success}
        fillOpacity="0.06"
        stroke={success}
      />
      <text
        x="206"
        y="258"
        textAnchor="middle"
        fontSize="13"
        fontWeight="700"
        fill={success}
      >
        加密：c ≡ mᵉ mod n
      </text>
      <text
        x="206"
        y="283"
        textAnchor="middle"
        fontSize="11.5"
        fill={secondary}
      >
        任何人可执行公开变换
      </text>
      <text
        x="206"
        y="303"
        textAnchor="middle"
        fontSize="11.5"
        fill={secondary}
      >
        前提是消息代表元合法
      </text>

      <line
        x1="345"
        y1="273"
        x2="376"
        y2="273"
        stroke={secondary}
        strokeWidth="1.5"
      />

      <rect
        x="380"
        y="230"
        width="272"
        height="86"
        rx="9"
        fill={danger}
        fillOpacity="0.06"
        stroke={danger}
      />
      <text
        x="516"
        y="258"
        textAnchor="middle"
        fontSize="13"
        fontWeight="700"
        fill={danger}
      >
        解密：m ≡ cᵈ mod n
      </text>
      <text
        x="516"
        y="283"
        textAnchor="middle"
        fontSize="11.5"
        fill={secondary}
      >
        依赖私钥和正确的参数边界
      </text>
      <text
        x="516"
        y="303"
        textAnchor="middle"
        fontSize="11.5"
        fill={secondary}
      >
        不能直接当作生产协议
      </text>

      <rect
        x="70"
        y="350"
        width="582"
        height="22"
        rx="8"
        fill={accent}
        fillOpacity="0.08"
      />
      <text x="361" y="366" textAnchor="middle" fontSize="11.5" fill={primary}>
        安全审计：标准填充 · 足够密钥长度 · 密钥管理 · 侧信道防护 · 成熟密码库
      </text>
    </NumberTheoryFrame>
  );
}
