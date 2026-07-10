"use client";

export function PrlLinearClassificationDiagram() {
  return (
    <svg viewBox="0 0 800 560" className="w-full h-auto" role="img" aria-label="线性分类模型三种方法对比">
      <defs>
        <linearGradient id="prl-lc-disc" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#dc2626" />
          <stop offset="100%" stopColor="#b91c1c" />
        </linearGradient>
        <linearGradient id="prl-lc-gen" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="prl-lc-dis" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <marker id="prl-lc-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">线性分类：三种建模路径</text>

      {/* 三种方法 */}
      <text x="400" y="64" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">三种建模路径对比</text>

      {/* 判别函数 */}
      <rect x="40" y="78" width="225" height="110" rx="10" fill="url(#prl-lc-disc)" opacity="0.12" stroke="#dc2626" strokeWidth="2" />
      <text x="152" y="100" textAnchor="middle" fontSize="12" fontWeight="700" fill="#991b1b">① 判别函数</text>
      <text x="152" y="120" textAnchor="middle" fontSize="10" fill="#991b1b">直接学 y(x) 的判别边界</text>
      <text x="60" y="140" fontSize="9" fill="#991b1b">Fisher 线性判别</text>
      <text x="60" y="156" fontSize="9" fill="#991b1b">最小平方分类</text>
      <text x="60" y="172" fontSize="9" fill="#991b1b">不建模概率，只分界</text>

      {/* 概率生成模型 */}
      <rect x="288" y="78" width="225" height="110" rx="10" fill="url(#prl-lc-gen)" opacity="0.12" stroke="#2563eb" strokeWidth="2" />
      <text x="400" y="100" textAnchor="middle" fontSize="12" fontWeight="700" fill="#1e40af">② 概率生成模型</text>
      <text x="400" y="120" textAnchor="middle" fontSize="10" fill="#1e40af">建模 p(x|C_k) 和 p(C_k)</text>
      <text x="308" y="140" fontSize="9" fill="#1e40af">贝叶斯定理求后验</text>
      <text x="308" y="156" fontSize="9" fill="#1e40af">高斯类条件密度</text>
      <text x="308" y="172" fontSize="9" fill="#1e40af">可生成数据，需分布假设</text>

      {/* 概率判别模型 */}
      <rect x="535" y="78" width="225" height="110" rx="10" fill="url(#prl-lc-dis)" opacity="0.12" stroke="#059669" strokeWidth="2" />
      <text x="647" y="100" textAnchor="middle" fontSize="12" fontWeight="700" fill="#065f46">③ 概率判别模型</text>
      <text x="647" y="120" textAnchor="middle" fontSize="10" fill="#065f46">直接学 p(C_k|x)</text>
      <text x="555" y="140" fontSize="9" fill="#065f46">逻辑回归（Logistic）</text>
      <text x="555" y="156" fontSize="9" fill="#065f46">Softmax 多分类</text>
      <text x="555" y="172" fontSize="9" fill="#065f46">假设更少，实践中常用</text>

      {/* 逻辑回归详解 */}
      <text x="400" y="214" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">逻辑回归核心公式</text>

      <rect x="80" y="228" width="640" height="34" rx="8" fill="#d1fae5" stroke="#059669" strokeWidth="1.5" />
      <text x="400" y="250" textAnchor="middle" fontSize="12" fontWeight="700" fill="#065f46">σ(a) = 1/(1+e^&#123;-a&#125;)，  a = wᵀφ(x)，  p(C₁|x) = σ(wᵀφ(x))</text>

      <rect x="80" y="268" width="640" height="34" rx="8" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="400" y="290" textAnchor="middle" fontSize="11" fill="#475569">交叉熵损失 = 负对数似然   E(w) = -Σ[t_n ln y_n + (1-t_n) ln(1-y_n)]</text>

      {/* 多分类 Softmax */}
      <text x="400" y="326" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">Softmax 多分类</text>

      <rect x="80" y="340" width="640" height="34" rx="8" fill="#eff6ff" stroke="#2563eb" strokeWidth="1.5" />
      <text x="400" y="362" textAnchor="middle" fontSize="12" fontWeight="700" fill="#1e40af">p(C_k|x) = exp(a_k) / Σ_j exp(a_j)，  a_k = w_kᵀφ(x)</text>

      {/* 拉普拉斯近似 */}
      <text x="400" y="398" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">拉普拉斯近似：连接贝叶斯与神经网络</text>

      <rect x="40" y="412" width="225" height="66" rx="8" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="152" y="432" textAnchor="middle" fontSize="10" fontWeight="700" fill="#92400e">后验众数</text>
      <text x="152" y="450" textAnchor="middle" fontSize="9" fill="#92400e">找到 MAP 点 w_MAP</text>
      <text x="152" y="466" textAnchor="middle" fontSize="9" fill="#92400e">梯度上升 / IRLS</text>

      <path d="M265 445 L288 445" stroke="#64748b" strokeWidth="2" markerEnd="url(#prl-lc-arrow)" />

      <rect x="288" y="412" width="225" height="66" rx="8" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="400" y="432" textAnchor="middle" fontSize="10" fontWeight="700" fill="#92400e">Hessian 矩阵</text>
      <text x="400" y="450" textAnchor="middle" fontSize="9" fill="#92400e">A = -∇²ln p(w|D)|_&#123;w_MAP&#125;</text>
      <text x="400" y="466" textAnchor="middle" fontSize="9" fill="#92400e">曲率信息</text>

      <path d="M513 445 L535 445" stroke="#64748b" strokeWidth="2" markerEnd="url(#prl-lc-arrow)" />

      <rect x="535" y="412" width="225" height="66" rx="8" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="647" y="432" textAnchor="middle" fontSize="10" fontWeight="700" fill="#92400e">高斯近似</text>
      <text x="647" y="450" textAnchor="middle" fontSize="9" fill="#92400e">q(w) = N(w_MAP, A⁻¹)</text>
      <text x="647" y="466" textAnchor="middle" fontSize="9" fill="#92400e">非高斯后验→高斯近似</text>

      {/* 底部 */}
      <rect x="40" y="500" width="720" height="40" rx="8" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="400" y="518" textAnchor="middle" fontSize="11" fontWeight="700" fill="#475569">三种方法比较</text>
      <text x="400" y="534" textAnchor="middle" fontSize="10" fill="#64748b">判别函数（最简） → 生成模型（需分布假设，可生成） → 判别模型（假设少，最常用）</text>
    </svg>
  );
}
