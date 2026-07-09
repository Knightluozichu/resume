"use client";

export function DlgFinalReviewDiagram() {
  return (
    <svg viewBox="0 0 800 560" className="w-full h-auto" role="img" aria-label="生成模型全书知识整合全景图">
      <defs>
        <linearGradient id="dlg-fr-vae" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="dlg-fr-flow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="dlg-fr-gan" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="dlg-fr-diff" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#dc2626" />
          <stop offset="100%" stopColor="#b91c1c" />
        </linearGradient>
        <linearGradient id="dlg-fr-app" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <marker id="dlg-fr-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="36" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">深度学习入门5：生成模型 · 全书知识整合</text>

      {/* 中心：统一视角 */}
      <rect x="300" y="250" width="200" height="60" rx="12" fill="#1e293b" />
      <text x="400" y="278" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">统一视角</text>
      <text x="400" y="298" textAnchor="middle" fontSize="11" fill="#94a3b8">学习数据分布 P(x)</text>

      {/* VAE 分支 */}
      <rect x="40" y="64" width="180" height="70" rx="10" fill="url(#dlg-fr-vae)" opacity="0.9" />
      <text x="130" y="90" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">VAE</text>
      <text x="130" y="108" textAnchor="middle" fontSize="10" fill="#bfdbfe">变分推断</text>
      <text x="130" y="124" textAnchor="middle" fontSize="10" fill="#bfdbfe">ELBO 下界优化</text>

      <path d="M220 99 L300 270" stroke="#2563eb" strokeWidth="2" markerEnd="url(#dlg-fr-arrow)" opacity="0.5" />

      {/* Flow 分支 */}
      <rect x="40" y="150" width="180" height="70" rx="10" fill="url(#dlg-fr-flow)" opacity="0.9" />
      <text x="130" y="176" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">流模型</text>
      <text x="130" y="194" textAnchor="middle" fontSize="10" fill="#ede9fe">可逆变换</text>
      <text x="130" y="210" textAnchor="middle" fontSize="10" fill="#ede9fe">精确对数似然</text>

      <path d="M220 185 L300 280" stroke="#7c3aed" strokeWidth="2" markerEnd="url(#dlg-fr-arrow)" opacity="0.5" />

      {/* GAN 分支 */}
      <rect x="40" y="236" width="180" height="70" rx="10" fill="url(#dlg-fr-gan)" opacity="0.9" />
      <text x="130" y="262" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">GAN / DCGAN</text>
      <text x="130" y="280" textAnchor="middle" fontSize="10" fill="#fef3c7">对抗博弈</text>
      <text x="130" y="296" textAnchor="middle" fontSize="10" fill="#fef3c7">隐式密度估计</text>

      <path d="M220 271 L300 285" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#dlg-fr-arrow)" opacity="0.5" />

      {/* Diffusion 分支 */}
      <rect x="40" y="322" width="180" height="70" rx="10" fill="url(#dlg-fr-diff)" opacity="0.9" />
      <text x="130" y="348" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">扩散模型</text>
      <text x="130" y="366" textAnchor="middle" fontSize="10" fill="#fecaca">逐步去噪</text>
      <text x="130" y="382" textAnchor="middle" fontSize="10" fill="#fecaca">迭代采样</text>

      <path d="M220 357 L300 300" stroke="#dc2626" strokeWidth="2" markerEnd="url(#dlg-fr-arrow)" opacity="0.5" />

      {/* 右侧：应用与评估 */}
      <rect x="580" y="64" width="180" height="70" rx="10" fill="url(#dlg-fr-app)" opacity="0.9" />
      <text x="670" y="90" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">文生图</text>
      <text x="670" y="108" textAnchor="middle" fontSize="10" fill="#d1fae5">条件生成</text>
      <text x="670" y="124" textAnchor="middle" fontSize="10" fill="#d1fae5">CLIP + 扩散</text>

      <path d="M500 270 L580 99" stroke="#059669" strokeWidth="2" markerEnd="url(#dlg-fr-arrow)" opacity="0.5" />

      <rect x="580" y="150" width="180" height="70" rx="10" fill="url(#dlg-fr-app)" opacity="0.8" />
      <text x="670" y="176" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">评估</text>
      <text x="670" y="194" textAnchor="middle" fontSize="10" fill="#d1fae5">FID / IS</text>
      <text x="670" y="210" textAnchor="middle" fontSize="10" fill="#d1fae5">CLIP Score</text>

      <path d="M500 280 L580 185" stroke="#059669" strokeWidth="2" markerEnd="url(#dlg-fr-arrow)" opacity="0.5" />

      <rect x="580" y="236" width="180" height="70" rx="10" fill="url(#dlg-fr-app)" opacity="0.7" />
      <text x="670" y="262" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">伦理</text>
      <text x="670" y="280" textAnchor="middle" fontSize="10" fill="#d1fae5">深度伪造防范</text>
      <text x="670" y="296" textAnchor="middle" fontSize="10" fill="#d1fae5">偏见 / 版权 / 隐私</text>

      <path d="M500 290 L580 271" stroke="#059669" strokeWidth="2" markerEnd="url(#dlg-fr-arrow)" opacity="0.5" />

      {/* 演进关系 */}
      <rect x="580" y="322" width="180" height="70" rx="10" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="670" y="348" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">技术演进</text>
      <text x="670" y="366" textAnchor="middle" fontSize="10" fill="#475569">VAE → GAN → Diffusion</text>
      <text x="670" y="382" textAnchor="middle" fontSize="10" fill="#475569">质量与稳定性提升</text>

      {/* 底部：对比总结 */}
      <rect x="40" y="420" width="720" height="120" rx="10" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="400" y="444" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">四大生成模型对比</text>

      <text x="60" y="466" fontSize="11" fontWeight="700" fill="#2563eb">VAE</text>
      <text x="60" y="482" fontSize="10" fill="#475569">显式密度 | ELBO | 训练稳定 | 模糊</text>

      <text x="60" y="502" fontSize="11" fontWeight="700" fill="#7c3aed">流模型</text>
      <text x="60" y="518" fontSize="10" fill="#475569">精确似然 | 可逆 | 架构受限</text>

      <text x="420" y="466" fontSize="11" fontWeight="700" fill="#f59e0b">GAN</text>
      <text x="420" y="482" fontSize="10" fill="#475569">隐式密度 | 对抗训练 | 清晰但不稳定</text>

      <text x="420" y="502" fontSize="11" fontWeight="700" fill="#dc2626">扩散模型</text>
      <text x="420" y="518" fontSize="10" fill="#475569">迭代采样 | 质量最高 | 采样慢</text>
    </svg>
  );
}
