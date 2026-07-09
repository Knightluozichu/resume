"use client";

export function DlgAutoencoderVaeDiagram() {
  return (
    <svg viewBox="0 0 800 520" className="w-full h-auto" role="img" aria-label="自编码器与变分自编码器结构对比">
      <defs>
        <linearGradient id="dlg-av-enc" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="dlg-av-latent" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="dlg-av-dec" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#dc2626" />
          <stop offset="100%" stopColor="#b91c1c" />
        </linearGradient>
        <marker id="dlg-av-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="36" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">自编码器（AE）与变分自编码器（VAE）</text>

      {/* 自编码器 */}
      <text x="400" y="68" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">自编码器 AE</text>

      <rect x="60" y="80" width="100" height="50" rx="8" fill="url(#dlg-av-enc)" opacity="0.9" />
      <text x="110" y="110" textAnchor="middle" fontSize="12" fontWeight="600" fill="#fff">输入 x</text>

      <path d="M160 105 L220 105" stroke="#64748b" strokeWidth="2" markerEnd="url(#dlg-av-arrow)" />
      <text x="190" y="98" textAnchor="middle" fontSize="10" fill="#475569">编码器</text>

      <rect x="220" y="80" width="100" height="50" rx="8" fill="url(#dlg-av-latent)" opacity="0.9" />
      <text x="270" y="110" textAnchor="middle" fontSize="12" fontWeight="600" fill="#fff">隐向量 z</text>

      <path d="M320 105 L380 105" stroke="#64748b" strokeWidth="2" markerEnd="url(#dlg-av-arrow)" />
      <text x="350" y="98" textAnchor="middle" fontSize="10" fill="#475569">解码器</text>

      <rect x="380" y="80" width="100" height="50" rx="8" fill="url(#dlg-av-dec)" opacity="0.9" />
      <text x="430" y="110" textAnchor="middle" fontSize="12" fontWeight="600" fill="#fff">重建 x'</text>

      <rect x="520" y="80" width="240" height="50" rx="8" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="640" y="100" textAnchor="middle" fontSize="11" fontWeight="600" fill="#475569">损失 = 重建误差</text>
      <text x="640" y="118" textAnchor="middle" fontSize="10" fill="#64748b">z 是确定性映射，无法生成新样本</text>

      {/* VAE */}
      <text x="400" y="168" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">变分自编码器 VAE</text>

      <rect x="60" y="180" width="100" height="50" rx="8" fill="url(#dlg-av-enc)" opacity="0.9" />
      <text x="110" y="210" textAnchor="middle" fontSize="12" fontWeight="600" fill="#fff">输入 x</text>

      <path d="M160 205 L220 205" stroke="#64748b" strokeWidth="2" markerEnd="url(#dlg-av-arrow)" />
      <text x="190" y="198" textAnchor="middle" fontSize="10" fill="#475569">编码器</text>

      {/* 隐空间：均值与方差 */}
      <rect x="220" y="172" width="100" height="26" rx="6" fill="url(#dlg-av-latent)" opacity="0.85" />
      <text x="270" y="189" textAnchor="middle" fontSize="11" fontWeight="600" fill="#fff">均值 mu</text>

      <rect x="220" y="202" width="100" height="26" rx="6" fill="url(#dlg-av-latent)" opacity="0.85" />
      <text x="270" y="219" textAnchor="middle" fontSize="11" fontWeight="600" fill="#fff">方差 sigma</text>

      {/* 重参数化 */}
      <rect x="350" y="180" width="100" height="50" rx="8" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2" />
      <text x="400" y="200" textAnchor="middle" fontSize="10" fontWeight="600" fill="#92400e">重参数化</text>
      <text x="400" y="216" textAnchor="middle" fontSize="10" fill="#92400e">z = mu + sigma*eps</text>

      <path d="M320 205 L350 205" stroke="#64748b" strokeWidth="2" markerEnd="url(#dlg-av-arrow)" />
      <path d="M450 205 L510 205" stroke="#64748b" strokeWidth="2" markerEnd="url(#dlg-av-arrow)" />

      <rect x="510" y="180" width="100" height="50" rx="8" fill="url(#dlg-av-dec)" opacity="0.9" />
      <text x="560" y="210" textAnchor="middle" fontSize="12" fontWeight="600" fill="#fff">重建 x'</text>

      <rect x="640" y="180" width="120" height="50" rx="8" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="700" y="200" textAnchor="middle" fontSize="10" fontWeight="600" fill="#475569">KL 散度</text>
      <text x="700" y="216" textAnchor="middle" fontSize="10" fill="#64748b">正则化隐空间</text>

      {/* VAE 损失函数 */}
      <rect x="40" y="262" width="720" height="60" rx="10" fill="#eff6ff" stroke="#2563eb" strokeWidth="1.5" />
      <text x="400" y="287" textAnchor="middle" fontSize="13" fontWeight="700" fill="#1e40af">VAE 损失 = 重建损失 + KL 散度</text>
      <text x="400" y="307" textAnchor="middle" fontSize="11" fill="#475569">L = E[log P(x|z)] - KL(q(z|x) || N(0,I))</text>

      {/* 关键区别 */}
      <text x="400" y="352" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">AE vs VAE 关键区别</text>

      <rect x="40" y="366" width="340" height="130" rx="10" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="60" y="390" fontSize="12" fontWeight="700" fill="#1e40af">自编码器 AE</text>
      <text x="60" y="410" fontSize="11" fill="#475569">- z 是确定性编码，非概率分布</text>
      <text x="60" y="428" fontSize="11" fill="#475569">- 隐空间不连续，无法插值生成</text>
      <text x="60" y="446" fontSize="11" fill="#475569">- 损失只有重建误差</text>
      <text x="60" y="464" fontSize="11" fill="#475569">- 用途：压缩 / 去噪 / 特征提取</text>
      <text x="60" y="482" fontSize="11" fill="#475569">- 无法从隐空间采样生成新数据</text>

      <rect x="420" y="366" width="340" height="130" rx="10" fill="#fef2f2" stroke="#fca5a5" strokeWidth="1.5" />
      <text x="440" y="390" fontSize="12" fontWeight="700" fill="#991b1b">变分自编码器 VAE</text>
      <text x="440" y="410" fontSize="11" fill="#475569">- z 是概率分布（均值+方差）</text>
      <text x="440" y="428" fontSize="11" fill="#475569">- 隐空间连续可插值，能生成新样本</text>
      <text x="440" y="446" fontSize="11" fill="#475569">- 损失 = 重建损失 + KL 散度</text>
      <text x="440" y="464" fontSize="11" fill="#475569">- 重参数化技巧使采样可微分</text>
      <text x="440" y="482" fontSize="11" fill="#475569">- 用途：图像生成 / 数据增强</text>
    </svg>
  );
}
