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
        <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} role="img" aria-label="数论核心概念图解。左上：算术基本定理——60=2²×3×5 的质因数分解。左下：质数无穷的反证法流程。右上：欧几里得算法 gcd(48,18) 的辗转相除步骤 48→18→12→6→0。右下：RSA 流程：选质数p,q→算n=pq,φ(n)→选e→求d→加密m^e mod n→解密c^d mod n。" className="mx-auto block h-auto w-full max-w-[720px]">
          <text x={VIEW_W / 2} y="36" textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>数论核心：质数、GCD 与 RSA</text>
          <text x={VIEW_W / 2} y="58" textAnchor="middle" fontSize="12" fill={secondary}>古老数论驱动现代密码学</text>

          <line x1="340" y1="74" x2="340" y2="400" stroke={border} strokeWidth="1" strokeDasharray="4 4" />

          {/* ===== 左上：质因数分解 ===== */}
          <rect x="48" y="80" width="280" height="76" rx="8" fill={accent} fillOpacity="0.06" stroke={accent} strokeWidth="1" strokeOpacity="0.4" />
          <text x="64" y="100" fontSize="12" fontWeight="700" fill={accent}>算术基本定理</text>
          <text x="64" y="122" fontSize="13" fontFamily="monospace" fill={primary}>60 = 2² × 3 × 5</text>
          <text x="64" y="142" fontSize="11" fill={secondary}>每个整数唯一分解为质数乘积</text>

          {/* ===== 左下：质数无穷 ===== */}
          <rect x="48" y="172" width="280" height="100" rx="8" fill={success} fillOpacity="0.06" stroke={success} strokeWidth="1" strokeOpacity="0.4" />
          <text x="64" y="192" fontSize="12" fontWeight="700" fill={success}>质数无穷（反证法）</text>
          <text x="64" y="212" fontSize="11" fill={primary}>① 假设质数有限：p₁, p₂, ..., pₙ</text>
          <text x="64" y="230" fontSize="11" fill={primary}>② 构造 N = p₁×p₂×...×pₙ + 1</text>
          <text x="64" y="248" fontSize="11" fill={primary}>③ N 除以任何 pᵢ 都余 1</text>
          <text x="64" y="266" fontSize="11" fill={danger}>④ N 要么是质数，要么有新质因子 → 矛盾！</text>

          {/* ===== 右上：欧几里得算法 ===== */}
          <rect x="360" y="80" width="312" height="100" rx="8" fill={warning} fillOpacity="0.06" stroke={warning} strokeWidth="1" strokeOpacity="0.4" />
          <text x="376" y="100" fontSize="12" fontWeight="700" fill={warning}>欧几里得算法 gcd(48, 18)</text>
          <text x="376" y="124" fontSize="12" fontFamily="monospace" fill={primary}>48 = 2×18 + 12  → gcd(18, 12)</text>
          <text x="376" y="144" fontSize="12" fontFamily="monospace" fill={primary}>18 = 1×12 + 6   → gcd(12, 6)</text>
          <text x="376" y="164" fontSize="12" fontFamily="monospace" fill={primary}>12 = 2×6 + 0    → gcd = 6 ✓</text>

          {/* ===== 右下：RSA ===== */}
          <rect x="360" y="196" width="312" height="176" rx="8" fill={danger} fillOpacity="0.06" stroke={danger} strokeWidth="1" strokeOpacity="0.4" />
          <text x="376" y="216" fontSize="12" fontWeight="700" fill={danger}>RSA 密码学流程</text>
          <text x="376" y="238" fontSize="11" fill={primary}>① 选大质数 p, q</text>
          <text x="376" y="256" fontSize="11" fill={primary}>② n = p×q, φ(n) = (p-1)(q-1)</text>
          <text x="376" y="274" fontSize="11" fill={primary}>③ 选 e 与 φ(n) 互质（公钥）</text>
          <text x="376" y="292" fontSize="11" fill={primary}>④ d = e⁻¹ mod φ(n)（私钥）</text>
          <text x="376" y="314" fontSize="11" fill={accent}>加密：c = mᵉ mod n</text>
          <text x="376" y="332" fontSize="11" fill={accent}>解密：m = cᵈ mod n</text>
          <text x="376" y="356" fontSize="11" fill={secondary}>安全性 ← 大数分解困难</text>

          {/* ===== 左底总结 ===== */}
          <rect x="48" y="290" width="280" height="82" rx="8" fill={accent} fillOpacity="0.04" stroke={accent} strokeWidth="1" strokeOpacity="0.3" />
          <text x="64" y="310" fontSize="12" fontWeight="700" fill={accent}>数论 → 编程</text>
          <text x="64" y="330" fontSize="11" fill={primary}>· GCD → 分数化简、密码学</text>
          <text x="64" y="348" fontSize="11" fill={primary}>· 模运算 → 哈希、随机数</text>
          <text x="64" y="366" fontSize="11" fill={primary}>· 质数 → RSA 加密、密钥交换</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        数论从质数分解到欧几里得算法到 RSA，古老数学驱动现代密码学。GCD 的辗转相除、模逆元的求解、快速幂取模，都是数论在编程中的直接应用。
      </figcaption>
    </figure>
  );
}
