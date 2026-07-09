"use client";

export function MlwHypothesisSpaceDiagram() {
  return (
    <svg viewBox="0 0 800 560" className="w-full h-auto" role="img" aria-label="假设空间与归纳偏好示意图">
      <defs>
        <linearGradient id="mlw-hs-blue" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="mlw-hs-purple" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="mlw-hs-amber" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <marker id="mlw-hs-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="32" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">假设空间与归纳偏好</text>

      {/* 左侧：假设空间生成过程 */}
      <text x="200" y="64" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">假设空间生成</text>

      <rect x="60" y="76" width="280" height="44" rx="8" fill="url(#mlw-hs-blue)" opacity="0.12" stroke="#2563eb" strokeWidth="1.5" />
      <text x="200" y="103" textAnchor="middle" fontSize="12" fill="#1e40af">数据集 D = &#123;(x1,y1), ..., (xm,ym)&#125;</text>

      <path d="M200 120 L200 128" stroke="#64748b" strokeWidth="2" markerEnd="url(#mlw-hs-arrow)" />

      <rect x="60" y="130" width="280" height="44" rx="8" fill="url(#mlw-hs-blue)" opacity="0.12" stroke="#2563eb" strokeWidth="1.5" />
      <text x="200" y="157" textAnchor="middle" fontSize="12" fill="#1e40af">假设空间 H：所有可能的映射 f: X → Y</text>

      <path d="M200 174 L200 182" stroke="#64748b" strokeWidth="2" markerEnd="url(#mlw-hs-arrow)" />

      <rect x="60" y="184" width="280" height="44" rx="8" fill="url(#mlw-hs-purple)" opacity="0.12" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="200" y="211" textAnchor="middle" fontSize="12" fill="#5b21b6">版本空间：与 D 一致的假设集合</text>

      <path d="M200 228 L200 236" stroke="#64748b" strokeWidth="2" markerEnd="url(#mlw-lm-arrow)" markerEnd="url(#mlw-hs-arrow)" />

      <rect x="60" y="238" width="280" height="44" rx="8" fill="url(#mlw-hs-amber)" opacity="0.12" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="200" y="265" textAnchor="middle" fontSize="12" fill="#92400e">归纳偏好：从版本空间中选一个</text>

      {/* 右侧：归纳偏好准则 */}
      <text x="580" y="64" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">归纳偏好准则</text>

      <rect x="440" y="76" width="280" height="64" rx="10" fill="url(#mlw-hs-amber)" opacity="0.95" />
      <text x="580" y="100" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">奥卡姆剃刀</text>
      <text x="580" y="120" textAnchor="middle" fontSize="11" fill="#fef3c7">若有多个假设与数据一致，选最简单的</text>

      <rect x="440" y="154" width="280" height="64" rx="10" fill="url(#mlw-hs-purple)" opacity="0.95" />
      <text x="580" y="178" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">No Free Lunch 定理</text>
      <text x="580" y="198" textAnchor="middle" fontSize="11" fill="#e9d5ff">脱离具体问题谈优劣无意义</text>

      <rect x="440" y="232" width="280" height="64" rx="10" fill="url(#mlw-hs-blue)" opacity="0.95" />
      <text x="580" y="256" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">经验误差 vs 泛化误差</text>
      <text x="580" y="276" textAnchor="middle" fontSize="11" fill="#bfdbfe">训练误差 ≠ 真实性能，需评估</text>

      {/* 底部：西瓜示例 */}
      <rect x="40" y="320" width="720" height="80" rx="10" fill="#f0fdf4" stroke="#86efac" strokeWidth="1.5" />
      <text x="400" y="345" textAnchor="middle" fontSize="13" fontWeight="700" fill="#166534">西瓜问题示例</text>
      <text x="400" y="367" textAnchor="middle" fontSize="11" fill="#15803d">属性：色泽(青绿/乌黑/浅白) × 根蒂(蜷缩/稍蜷/硬挺) × 敲声(清脆/沉闷/浊响)</text>
      <text x="400" y="385" textAnchor="middle" fontSize="11" fill="#15803d">标签：好瓜 / 坏瓜 → 假设空间大小 = 3×3×3+1 = 28 种（含全好/全坏空假设）</text>

      {/* 底部公式 */}
      <rect x="40" y="420" width="720" height="56" rx="10" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="400" y="443" textAnchor="middle" fontSize="12" fill="#475569">泛化误差 = 期望损失 E[F(h;D)] = ∫ L(y, f(x)) p(x,y) dx dy</text>
      <text x="400" y="463" textAnchor="middle" fontSize="11" fill="#94a3b8">经验误差 = 训练集上的平均损失（有限样本近似）</text>

      {/* 底部说明 */}
      <rect x="40" y="494" width="720" height="44" rx="8" fill="#fffbeb" stroke="#fcd34d" strokeWidth="1.5" />
      <text x="400" y="512" textAnchor="middle" fontSize="11" fill="#92400e">NFL 定理：对所有问题平均后，任何算法的期望性能相同</text>
      <text x="400" y="528" textAnchor="middle" fontSize="11" fill="#92400e">→ 归纳偏好必须匹配具体问题，没有「万能算法」</text>
    </svg>
  );
}
