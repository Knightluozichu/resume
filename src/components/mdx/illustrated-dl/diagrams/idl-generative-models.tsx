"use client";

export function IdlGenerativeModelsDiagram() {
  return (
    <svg viewBox="0 0 800 520" className="w-full h-auto" role="img" aria-label="自编码器 VAE GAN 生成模型对比">
      <defs>
        <linearGradient id="idl-gen-ae" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="idl-gen-vae" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="idl-gen-gan" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <marker id="idl-gen-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="30" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">生成模型三大范式</text>

      {/* 自编码器 */}
      <text x="145" y="62" textAnchor="middle" fontSize="13" fontWeight="700" fill="#2563eb">自编码器（AE）</text>

      <rect x="30" y="75" width="60" height="50" rx="6" fill="#dbeafe" stroke="#2563eb" strokeWidth="2" />
      <text x="60" y="105" textAnchor="middle" fontSize="10" fontWeight="600" fill="#1e40af">输入 x</text>

      <line x1="90" y1="100" x2="120" y2="100" stroke="#64748b" strokeWidth="2" markerEnd="url(#idl-gen-arrow)" />

      <rect x="120" y="75" width="60" height="50" rx="6" fill="url(#idl-gen-ae)" opacity="0.2" stroke="#2563eb" strokeWidth="2" />
      <text x="150" y="100" textAnchor="middle" fontSize="10" fontWeight="600" fill="#1e40af">编码器</text>
      <text x="150" y="115" textAnchor="middle" fontSize="8" fill="#475569">Encoder</text>

      <line x1="180" y1="100" x2="210" y2="100" stroke="#64748b" strokeWidth="2" markerEnd="url(#idl-gen-arrow)" />

      <rect x="210" y="80" width="30" height="40" rx="4" fill="#f59e0b" opacity="0.3" stroke="#d97706" strokeWidth="2" />
      <text x="225" y="105" textAnchor="middle" fontSize="9" fontWeight="600" fill="#92400e">z</text>

      <line x1="240" y1="100" x2="270" y2="100" stroke="#64748b" strokeWidth="2" markerEnd="url(#idl-gen-arrow)" />

      <rect x="270" y="75" width="60" height="50" rx="6" fill="url(#idl-gen-ae)" opacity="0.2" stroke="#2563eb" strokeWidth="2" />
      <text x="300" y="100" textAnchor="middle" fontSize="10" fontWeight="600" fill="#1e40af">解码器</text>
      <text x="300" y="115" textAnchor="middle" fontSize="8" fill="#475569">Decoder</text>

      <line x1="330" y1="100" x2="360" y2="100" stroke="#64748b" strokeWidth="2" markerEnd="url(#idl-gen-arrow)" />

      <rect x="255" y="140" width="55" height="25" rx="4" fill="#fef2f2" stroke="#dc2626" strokeWidth="1.5" />
      <text x="282" y="157" textAnchor="middle" fontSize="9" fill="#dc2626">L = ||x - x'||</text>

      <text x="145" y="185" textAnchor="middle" fontSize="10" fill="#475569">压缩→重建，学习潜在表示</text>
      <text x="145" y="200" textAnchor="middle" fontSize="10" fill="#dc2626">缺点：潜在空间不连续</text>

      {/* VAE */}
      <text x="540" y="62" textAnchor="middle" fontSize="13" fontWeight="700" fill="#7c3aed">变分自编码器（VAE）</text>

      <rect x="425" y="75" width="60" height="50" rx="6" fill="#dbeafe" stroke="#2563eb" strokeWidth="2" />
      <text x="455" y="105" textAnchor="middle" fontSize="10" fontWeight="600" fill="#1e40af">输入 x</text>

      <line x1="485" y1="100" x2="515" y2="100" stroke="#64748b" strokeWidth="2" markerEnd="url(#idl-gen-arrow)" />

      <rect x="515" y="75" width="60" height="50" rx="6" fill="url(#idl-gen-vae)" opacity="0.2" stroke="#7c3aed" strokeWidth="2" />
      <text x="545" y="100" textAnchor="middle" fontSize="10" fontWeight="600" fill="#5b21b6">编码器</text>

      <line x1="575" y1="100" x2="605" y2="100" stroke="#64748b" strokeWidth="2" markerEnd="url(#idl-gen-arrow)" />

      <rect x="605" y="72" width="35" height="20" rx="4" fill="#f59e0b" opacity="0.3" stroke="#d97706" strokeWidth="1.5" />
      <text x="622" y="86" textAnchor="middle" fontSize="8" fill="#92400e">mu</text>
      <rect x="605" y="96" width="35" height="20" rx="4" fill="#f59e0b" opacity="0.3" stroke="#d97706" strokeWidth="1.5" />
      <text x="622" y="110" textAnchor="middle" fontSize="8" fill="#92400e">sigma</text>

      <line x1="640" y1="100" x2="660" y2="100" stroke="#64748b" strokeWidth="2" markerEnd="url(#idl-gen-arrow)" />

      <rect x="660" y="75" width="55" height="50" rx="6" fill="url(#idl-gen-vae)" opacity="0.2" stroke="#7c3aed" strokeWidth="2" />
      <text x="687" y="100" textAnchor="middle" fontSize="10" fontWeight="600" fill="#5b21b6">解码器</text>

      <text x="540" y="140" textAnchor="middle" fontSize="9" fill="#7c3aed">z ~ N(mu, sigma^2)</text>
      <text x="540" y="155" textAnchor="middle" fontSize="9" fill="#dc2626">L = 重建 + KL 散度</text>

      <text x="540" y="185" textAnchor="middle" fontSize="10" fill="#475569">学习连续概率分布</text>
      <text x="540" y="200" textAnchor="middle" fontSize="10" fill="#7c3aed">优点：可从潜在空间采样生成</text>

      {/* GAN */}
      <text x="400" y="240" textAnchor="middle" fontSize="13" fontWeight="700" fill="#f59e0b">生成对抗网络（GAN）</text>

      <rect x="100" y="255" width="80" height="50" rx="6" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2" />
      <text x="140" y="278" textAnchor="middle" fontSize="10" fontWeight="600" fill="#92400e">随机噪声 z</text>
      <text x="140" y="294" textAnchor="middle" fontSize="9" fill="#92400e">~ N(0, 1)</text>

      <line x1="180" y1="280" x2="220" y2="280" stroke="#64748b" strokeWidth="2" markerEnd="url(#idl-gen-arrow)" />

      <rect x="220" y="255" width="100" height="50" rx="8" fill="url(#idl-gen-gan)" opacity="0.25" stroke="#f59e0b" strokeWidth="2.5" />
      <text x="270" y="278" textAnchor="middle" fontSize="11" fontWeight="700" fill="#92400e">生成器 G</text>
      <text x="270" y="294" textAnchor="middle" fontSize="9" fill="#92400e">造假数据</text>

      <line x1="320" y1="280" x2="360" y2="280" stroke="#64748b" strokeWidth="2" markerEnd="url(#idl-gen-arrow)" />

      <rect x="360" y="255" width="100" height="50" rx="8" fill="url(#idl-gen-gan)" opacity="0.25" stroke="#f59e0b" strokeWidth="2.5" />
      <text x="410" y="278" textAnchor="middle" fontSize="11" fontWeight="700" fill="#92400e">判别器 D</text>
      <text x="410" y="294" textAnchor="middle" fontSize="9" fill="#92400e">真假分类</text>

      <line x1="460" y1="280" x2="500" y2="280" stroke="#64748b" strokeWidth="2" markerEnd="url(#idl-gen-arrow)" />

      <rect x="500" y="255" width="70" height="50" rx="6" fill="#fef2f2" stroke="#dc2626" strokeWidth="2" />
      <text x="535" y="278" textAnchor="middle" fontSize="10" fontWeight="600" fill="#dc2626">真/假</text>
      <text x="535" y="294" textAnchor="middle" fontSize="9" fill="#dc2626">判定</text>

      {/* 真实数据箭头 */}
      <rect x="620" y="255" width="80" height="50" rx="6" fill="#dcfce7" stroke="#059669" strokeWidth="2" />
      <text x="660" y="278" textAnchor="middle" fontSize="10" fontWeight="600" fill="#065f46">真实数据</text>
      <text x="660" y="294" textAnchor="middle" fontSize="9" fill="#065f46">x ~ data</text>

      <line x1="620" y1="280" x2="460" y2="280" stroke="#059669" strokeWidth="2" strokeDasharray="5 3" markerEnd="url(#idl-gen-arrow)" />

      <text x="400" y="335" textAnchor="middle" fontSize="11" fill="#92400e">G 想骗过 D，D 想识破 G —— 博弈训练，纳什均衡</text>

      {/* 底部对比表 */}
      <rect x="30" y="355" width="740" height="150" rx="8" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5" />
      <text x="50" y="380" fontSize="13" fontWeight="700" fill="#334155">三种生成模型对比</text>
      <text x="50" y="402" fontSize="11" fill="#2563eb">AE：确定性映射，学习压缩表示，主要用于降维/去噪，不适合直接生成新样本</text>
      <text x="50" y="424" fontSize="11" fill="#7c3aed">VAE：概率映射，潜在空间连续可采样，生成质量中等但训练稳定</text>
      <text x="50" y="446" fontSize="11" fill="#92400e">GAN：对抗训练，生成质量高且逼真，但训练不稳定（模式崩溃）</text>
      <text x="50" y="476" fontSize="11" fill="#64748b">应用：图像生成 / 数据增强 / 风格迁移 / 超分辨率 / 文本生成</text>
      <text x="50" y="496" fontSize="11" fill="#64748b">发展趋势：扩散模型（Diffusion）正在超越 GAN，成为新一代生成范式</text>
    </svg>
  );
}
