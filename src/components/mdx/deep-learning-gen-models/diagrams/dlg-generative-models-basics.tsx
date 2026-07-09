"use client";

export function DlgGenerativeModelsBasicsDiagram() {
  return (
    <svg viewBox="0 0 800 460" className="w-full h-auto" role="img" aria-label="生成模型基础：判别模型与生成模型对比">
      <defs>
        <linearGradient id="dlg-gmb-disc" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="dlg-gmb-gen" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#dc2626" />
          <stop offset="100%" stopColor="#b91c1c" />
        </linearGradient>
        <marker id="dlg-gmb-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="36" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">判别模型 vs 生成模型</text>

      {/* 判别模型 */}
      <rect x="40" y="60" width="340" height="180" rx="12" fill="#eff6ff" stroke="#2563eb" strokeWidth="2" />
      <text x="210" y="86" textAnchor="middle" fontSize="15" fontWeight="700" fill="#1e40af">判别模型（Discriminative）</text>

      <rect x="70" y="100" width="120" height="40" rx="8" fill="url(#dlg-gmb-disc)" opacity="0.9" />
      <text x="130" y="125" textAnchor="middle" fontSize="12" fontWeight="600" fill="#fff">数据 x</text>

      <path d="M190 120 L240 120" stroke="#64748b" strokeWidth="2" markerEnd="url(#dlg-gmb-arrow)" />

      <rect x="240" y="100" width="100" height="40" rx="8" fill="url(#dlg-gmb-disc)" opacity="0.9" />
      <text x="290" y="125" textAnchor="middle" fontSize="12" fontWeight="600" fill="#fff">模型 f(x)</text>

      <rect x="70" y="160" width="280" height="60" rx="8" fill="#dbeafe" stroke="#93c5fd" strokeWidth="1.5" />
      <text x="210" y="183" textAnchor="middle" fontSize="12" fontWeight="600" fill="#1e40af">学习：P(y|x)</text>
      <text x="210" y="203" textAnchor="middle" fontSize="11" fill="#475569">给定数据，预测标签 / 分类</text>

      {/* 生成模型 */}
      <rect x="420" y="60" width="340" height="180" rx="12" fill="#fef2f2" stroke="#dc2626" strokeWidth="2" />
      <text x="590" y="86" textAnchor="middle" fontSize="15" fontWeight="700" fill="#991b1b">生成模型（Generative）</text>

      <rect x="450" y="100" width="100" height="40" rx="8" fill="url(#dlg-gmb-gen)" opacity="0.9" />
      <text x="500" y="125" textAnchor="middle" fontSize="12" fontWeight="600" fill="#fff">噪声 z</text>

      <path d="M550 120 L600 120" stroke="#64748b" strokeWidth="2" markerEnd="url(#dlg-gmb-arrow)" />

      <rect x="600" y="100" width="120" height="40" rx="8" fill="url(#dlg-gmb-gen)" opacity="0.9" />
      <text x="660" y="125" textAnchor="middle" fontSize="12" fontWeight="600" fill="#fff">模型 G(z)</text>

      <rect x="450" y="160" width="280" height="60" rx="8" fill="#fecaca" stroke="#fca5a5" strokeWidth="1.5" />
      <text x="590" y="183" textAnchor="middle" fontSize="12" fontWeight="600" fill="#991b1b">学习：P(x) 或 P(x,y)</text>
      <text x="590" y="203" textAnchor="middle" fontSize="11" fill="#475569">学习数据分布，生成新样本</text>

      {/* 底部：生成模型家族 */}
      <text x="400" y="272" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">生成模型家族</text>

      <rect x="40" y="288" width="160" height="50" rx="8" fill="#dbeafe" stroke="#3b82f6" strokeWidth="1.5" />
      <text x="120" y="311" textAnchor="middle" fontSize="12" fontWeight="600" fill="#1e40af">显式密度</text>
      <text x="120" y="328" textAnchor="middle" fontSize="10" fill="#475569">VAE / 流模型</text>

      <rect x="220" y="288" width="160" height="50" rx="8" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="300" y="311" textAnchor="middle" fontSize="12" fontWeight="600" fill="#92400e">隐式密度</text>
      <text x="300" y="328" textAnchor="middle" fontSize="10" fill="#475569">GAN</text>

      <rect x="400" y="288" width="160" height="50" rx="8" fill="#fee2e2" stroke="#ef4444" strokeWidth="1.5" />
      <text x="480" y="311" textAnchor="middle" fontSize="12" fontWeight="600" fill="#991b1b">迭代采样</text>
      <text x="480" y="328" textAnchor="middle" fontSize="10" fill="#475569">扩散模型</text>

      <rect x="580" y="288" width="180" height="50" rx="8" fill="#d1fae5" stroke="#10b981" strokeWidth="1.5" />
      <text x="670" y="311" textAnchor="middle" fontSize="12" fontWeight="600" fill="#065f46">条件生成</text>
      <text x="670" y="328" textAnchor="middle" fontSize="10" fill="#475569">文本到图像</text>

      {/* 底部公式 */}
      <rect x="40" y="360" width="720" height="70" rx="10" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="400" y="385" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">核心目标：学习数据分布 P_data(x)，使模型分布 P_model(x) 逼近真实分布</text>
      <text x="400" y="408" textAnchor="middle" fontSize="11" fill="#475569">从噪声 z ~ N(0, I) 采样，通过模型 G(z) 生成逼真样本</text>
      <text x="400" y="424" textAnchor="middle" fontSize="11" fill="#64748b">评估：FID / IS 等指标衡量生成质量与多样性</text>
    </svg>
  );
}
