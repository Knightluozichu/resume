"use client";

export function DltLinearAlgebraDiagram() {
  return (
    <svg viewBox="0 0 800 520" className="w-full h-auto" role="img" aria-label="线性代数核心概念图">
      <defs>
        <linearGradient id="dlt-la-vec" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="dlt-la-decomp" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="dlt-la-norm" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <marker id="dlt-la-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="36" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">线性代数：深度学习的运算语言</text>

      {/* 数据层次 */}
      <text x="140" y="72" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">数据层次</text>

      <rect x="40" y="84" width="200" height="40" rx="8" fill="url(#dlt-la-vec)" opacity="0.9" />
      <text x="140" y="100" textAnchor="middle" fontSize="12" fontWeight="600" fill="#fff">标量 s</text>
      <text x="140" y="116" textAnchor="middle" fontSize="10" fill="#bfdbfe">零维 · 单个数</text>

      <path d="M140 124 L140 130" stroke="#64748b" strokeWidth="2" markerEnd="url(#dlt-la-arrow)" />

      <rect x="40" y="132" width="200" height="40" rx="8" fill="url(#dlt-la-vec)" opacity="0.9" />
      <text x="140" y="148" textAnchor="middle" fontSize="12" fontWeight="600" fill="#fff">向量 x (n×1)</text>
      <text x="140" y="164" textAnchor="middle" fontSize="10" fill="#bfdbfe">一维 · 特征/偏置</text>

      <path d="M140 172 L140 178" stroke="#64748b" strokeWidth="2" markerEnd="url(#dlt-la-arrow)" />

      <rect x="40" y="180" width="200" height="40" rx="8" fill="url(#dlt-la-vec)" opacity="0.9" />
      <text x="140" y="196" textAnchor="middle" fontSize="12" fontWeight="600" fill="#fff">矩阵 A (m×n)</text>
      <text x="140" y="212" textAnchor="middle" fontSize="10" fill="#bfdbfe">二维 · 权重/数据</text>

      <path d="M140 220 L140 226" stroke="#64748b" strokeWidth="2" markerEnd="url(#dlt-la-arrow)" />

      <rect x="40" y="228" width="200" height="40" rx="8" fill="url(#dlt-la-vec)" opacity="0.9" />
      <text x="140" y="244" textAnchor="middle" fontSize="12" fontWeight="600" fill="#fff">张量 (d1×d2×...×dn)</text>
      <text x="140" y="260" textAnchor="middle" fontSize="10" fill="#bfdbfe">任意维 · 图像/卷积核</text>

      {/* 矩阵分解 */}
      <text x="460" y="72" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">矩阵分解</text>

      <rect x="320" y="84" width="280" height="50" rx="8" fill="url(#dlt-la-decomp)" opacity="0.9" />
      <text x="460" y="104" textAnchor="middle" fontSize="12" fontWeight="600" fill="#fff">特征分解 A = V Λ V⁻¹</text>
      <text x="460" y="122" textAnchor="middle" fontSize="10" fill="#ede9fe">方阵 · 特征值/特征向量</text>

      <path d="M460 134 L460 140" stroke="#64748b" strokeWidth="2" markerEnd="url(#dlt-la-arrow)" />

      <rect x="320" y="142" width="280" height="50" rx="8" fill="url(#dlt-la-decomp)" opacity="0.9" />
      <text x="460" y="162" textAnchor="middle" fontSize="12" fontWeight="600" fill="#fff">SVD: A = U Σ Vᵀ</text>
      <text x="460" y="180" textAnchor="middle" fontSize="10" fill="#ede9fe">任意矩阵 · 总是存在</text>

      <path d="M460 192 L460 198" stroke="#64748b" strokeWidth="2" markerEnd="url(#dlt-la-arrow)" />

      <rect x="320" y="200" width="280" height="50" rx="8" fill="url(#dlt-la-decomp)" opacity="0.85" />
      <text x="460" y="220" textAnchor="middle" fontSize="12" fontWeight="600" fill="#fff">低秩近似 A_k = U_k Σ_k V_kᵀ</text>
      <text x="460" y="238" textAnchor="middle" fontSize="10" fill="#ede9fe">截断小奇异值 · 压缩/降维</text>

      <path d="M460 250 L460 256" stroke="#64748b" strokeWidth="2" markerEnd="url(#dlt-la-arrow)" />

      <rect x="320" y="258" width="280" height="40" rx="8" fill="url(#dlt-la-decomp)" opacity="0.8" />
      <text x="460" y="278" textAnchor="middle" fontSize="11" fontWeight="600" fill="#fff">PCA / 伪逆 / 推荐系统</text>

      {/* 范数 */}
      <text x="680" y="72" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">范数</text>

      <rect x="580" y="84" width="200" height="36" rx="8" fill="url(#dlt-la-norm)" opacity="0.9" />
      <text x="680" y="100" textAnchor="middle" fontSize="11" fontWeight="600" fill="#fff">L1: Σ|x_i| → 稀疏</text>
      <text x="680" y="114" textAnchor="middle" fontSize="9" fill="#fef3c7">特征选择 / 拉普拉斯先验</text>

      <rect x="580" y="126" width="200" height="36" rx="8" fill="url(#dlt-la-norm)" opacity="0.9" />
      <text x="680" y="142" textAnchor="middle" fontSize="11" fontWeight="600" fill="#fff">L2: √Σx_i² → 权重衰减</text>
      <text x="680" y="156" textAnchor="middle" fontSize="9" fill="#fef3c7">一般正则化 / 高斯先验</text>

      <rect x="580" y="168" width="200" height="36" rx="8" fill="url(#dlt-la-norm)" opacity="0.9" />
      <text x="680" y="184" textAnchor="middle" fontSize="11" fontWeight="600" fill="#fff">Frobenius: √ΣA_ij²</text>
      <text x="680" y="198" textAnchor="middle" fontSize="9" fill="#fef3c7">矩阵大小度量</text>

      {/* 底部应用 */}
      <rect x="40" y="320" width="740" height="36" rx="8" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="410" y="342" textAnchor="middle" fontSize="12" fontWeight="600" fill="#475569">深度学习应用：权重矩阵 W · 激活向量 x + 偏置 b → 矩阵乘法 GEMM</text>

      <rect x="40" y="364" width="740" height="36" rx="8" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="410" y="386" textAnchor="middle" fontSize="12" fontWeight="600" fill="#475569">正则化：L2 权重衰减 λ||w||² · 梯度裁剪 ||grad|| ≤ threshold</text>

      <rect x="40" y="408" width="740" height="36" rx="8" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="410" y="430" textAnchor="middle" fontSize="12" fontWeight="600" fill="#475569">SVD 应用：PCA 降维 · 模型压缩(低秩近似) · 伪逆求解</text>

      <rect x="40" y="452" width="740" height="36" rx="8" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="410" y="474" textAnchor="middle" fontSize="11" fill="#64748b">线性代数 = 深度学习的运算基础（所有计算 = 张量运算）</text>
    </svg>
  );
}
