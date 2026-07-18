"use client";

import { MathGirlOfficialLab } from "./official-lab";

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

const primeCases = [
  {
    label: "定义",
    fields: [
      ["质数", "大于1，正因数只有1和自身"],
      ["合数", "大于1且存在非平凡因数"],
      ["单位1", "既不是质数也不是合数"],
      ["任务", "先分清对象再谈证明"],
    ],
  },
  {
    label: "唯一分解",
    fields: [
      ["存在性", "每个大于1整数可分解为质数乘积"],
      ["唯一性", "忽略顺序后分解唯一"],
      ["例子", "60=2²×3×5"],
      ["桥梁", "整除问题转成指数问题"],
    ],
  },
  {
    label: "无穷反证",
    fields: [
      ["假设", "质数只有p1至pn"],
      ["构造", "N=p1p2⋯pn+1"],
      ["余数", "N除以每个pi都余1"],
      ["矛盾", "N有列表外质因子"],
    ],
  },
  {
    label: "边界检查",
    fields: [
      ["不必证明", "N本身一定是质数"],
      ["必须证明", "N至少有一个质因子"],
      ["新因子", "不等于任何已列pi"],
      ["结论", "任意有限列表都不完整"],
    ],
    alert:
      "欧几里得构造只保证出现新的质因子，不保证乘积加一得到的数本身一定是质数。",
  },
] as const;

const gcdCases = [
  {
    label: "整除不变",
    fields: [
      ["恒等式", "a=qb+r"],
      ["公因数", "同时整除a,b等价于同时整除b,r"],
      ["递推", "gcd(a,b)=gcd(b,r)"],
      ["停止量", "余数严格减小"],
    ],
  },
  {
    label: "48与18",
    fields: [
      ["第一步", "48=2×18+12"],
      ["第二步", "18=1×12+6"],
      ["第三步", "12=2×6+0"],
      ["结果", "gcd(48,18)=6"],
    ],
  },
  {
    label: "贝祖等式",
    fields: [
      ["结论", "存在x,y使ax+by=gcd(a,b)"],
      ["来源", "把辗转相除逆向回代"],
      ["互质", "gcd(a,m)=1"],
      ["模逆元", "ax≡1 mod m"],
    ],
  },
  {
    label: "可执行验收",
    fields: [
      ["循环不变量", "gcd(a,b)保持不变"],
      ["终止", "第二参数降到0"],
      ["后置条件", "返回值整除原始a与b"],
      ["复杂度", "除法次数为O(log min(a,b))"],
    ],
    alert:
      "只运行出正确答案不等于证明算法正确；还要写出不变量、严格下降量和终止后的后置条件。",
  },
] as const;

const modularCases = [
  {
    label: "同余",
    fields: [
      ["定义", "a≡b mod n表示n整除a-b"],
      ["加法", "同余类可逐项相加"],
      ["乘法", "同余类可逐项相乘"],
      ["除法", "只有分母可逆时才合法"],
    ],
  },
  {
    label: "快速模幂",
    fields: [
      ["分解指数", "按二进制位展开"],
      ["每轮", "平方底数并折半指数"],
      ["位为1", "把当前底数乘入结果"],
      ["复杂度", "O(log exponent)次乘法"],
    ],
  },
  {
    label: "RSA教学链",
    fields: [
      ["参数", "n=pq，λ或φ由p,q得到"],
      ["公钥", "选择与群阶互质的e"],
      ["私钥", "d为e的模逆元"],
      ["运算", "模幂完成加密或签名核心"],
    ],
  },
  {
    label: "安全边界",
    fields: [
      ["事实", "分解n可恢复私钥参数"],
      ["不能声称", "破解RSA已证明等价于分解"],
      ["真实系统", "需要填充、密钥长度与协议设计"],
      ["示例定位", "小整数只用于验证代数"],
    ],
    alert:
      "课本中的裸RSA小整数例子没有实际安全性；真实应用必须使用标准填充和经过审查的密码库。",
  },
] as const;

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

export function MglPrimeProofLab() {
  return (
    <MathGirlOfficialLab
      cases={primeCases}
      caption="质数无穷证明的核心是有限列表乘积加一产生列表外质因子，而不是声称构造数本身必为质数。"
      tone="cyan"
    />
  );
}

export function MglGcdBezoutLab() {
  return (
    <MathGirlOfficialLab
      cases={gcdCases}
      caption="欧几里得算法保持公因数集合不变；逆向回代得到贝祖系数，并在互质时给出模逆元。"
      tone="amber"
    />
  );
}

export function MglModularRsaLab() {
  return (
    <MathGirlOfficialLab
      cases={modularCases}
      caption="同余与快速模幂构成RSA的代数核心，但教学小例子与真实密码系统的安全要求必须分开。"
      tone="violet"
    />
  );
}
