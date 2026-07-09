"use client";

export function DlgDcganDiagram() {
  return (
    <svg viewBox="0 0 800 500" className="w-full h-auto" role="img" aria-label="DCGAN卷积生成对抗网络架构">
      <defs>
        <linearGradient id="dlg-dcg-gen" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="dlg-dcg-disc" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <marker id="dlg-dcg-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="36" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">DCGAN 架构：卷积生成对抗网络</text>

      {/* 生成器 */}
      <text x="200" y="68" textAnchor="middle" fontSize="14" fontWeight="700" fill="#92400e">生成器 Generator</text>

      <rect x="40" y="80" width="80" height="50" rx="8" fill="url(#dlg-dcg-gen)" opacity="0.85" />
      <text x="80" y="102" textAnchor="middle" fontSize="10" fontWeight="600" fill="#fff">噪声 z</text>
      <text x="80" y="118" textAnchor="middle" fontSize="9" fill="#fef3c7">100维</text>

      <path d="M120 105 L140 105" stroke="#64748b" strokeWidth="2" markerEnd="url(#dlg-dcg-arrow)" />

      <rect x="140" y="80" width="80" height="50" rx="8" fill="url(#dlg-dcg-gen)" opacity="0.7" />
      <text x="180" y="100" textAnchor="middle" fontSize="9" fontWeight="600" fill="#fff">投影+Reshape</text>
      <text x="180" y="116" textAnchor="middle" fontSize="9" fill="#fef3c7">4x4x1024</text>

      <path d="M220 105 L240 105" stroke="#64748b" strokeWidth="2" markerEnd="url(#dlg-dcg-arrow)" />

      <rect x="240" y="80" width="80" height="50" rx="8" fill="url(#dlg-dcg-gen)" opacity="0.6" />
      <text x="280" y="100" textAnchor="middle" fontSize="9" fontWeight="600" fill="#fff">ConvT+ReLU</text>
      <text x="280" y="116" textAnchor="middle" fontSize="9" fill="#fef3c7">8x8x512</text>

      <path d="M320 105 L340 105" stroke="#64748b" strokeWidth="2" markerEnd="url(#dlg-dcg-arrow)" />

      <rect x="340" y="80" width="80" height="50" rx="8" fill="url(#dlg-dcg-gen)" opacity="0.5" />
      <text x="380" y="100" textAnchor="middle" fontSize="9" fontWeight="600" fill="#fff">ConvT+ReLU</text>
      <text x="380" y="116" textAnchor="middle" fontSize="9" fill="#fef3c7">16x16x256</text>

      <text x="200" y="152" textAnchor="middle" fontSize="10" fill="#475569">逐步上采样 → 64x64x3 图像</text>

      {/* 判别器 */}
      <text x="600" y="68" textAnchor="middle" fontSize="14" fontWeight="700" fill="#1e40af">判别器 Discriminator</text>

      <rect x="460" y="80" width="80" height="50" rx="8" fill="url(#dlg-dcg-disc)" opacity="0.5" />
      <text x="500" y="100" textAnchor="middle" fontSize="9" fontWeight="600" fill="#fff">Conv+LeakyReLU</text>
      <text x="500" y="116" textAnchor="middle" fontSize="9" fill="#bfdbfe">64x64x3</text>

      <path d="M540 105 L560 105" stroke="#64748b" strokeWidth="2" markerEnd="url(#dlg-dcg-arrow)" />

      <rect x="560" y="80" width="80" height="50" rx="8" fill="url(#dlg-dcg-disc)" opacity="0.6" />
      <text x="600" y="100" textAnchor="middle" fontSize="9" fontWeight="600" fill="#fff">Conv+LeakyReLU</text>
      <text x="600" y="116" textAnchor="middle" fontSize="9" fill="#bfdbfe">32x32x128</text>

      <path d="M640 105 L660 105" stroke="#64748b" strokeWidth="2" markerEnd="url(#dlg-dcg-arrow)" />

      <rect x="660" y="80" width="80" height="50" rx="8" fill="url(#dlg-dcg-disc)" opacity="0.7" />
      <text x="700" y="100" textAnchor="middle" fontSize="9" fontWeight="600" fill="#fff">Conv+LeakyReLU</text>
      <text x="700" y="116" textAnchor="middle" fontSize="9" fill="#bfdbfe">4x4x512</text>

      <text x="600" y="152" textAnchor="middle" fontSize="10" fill="#475569">逐步下采样 → Sigmoid 概率值</text>

      {/* DCGAN 设计准则 */}
      <text x="400" y="188" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">DCGAN 设计准则</text>

      <rect x="40" y="202" width="350" height="130" rx="10" fill="#fffbeb" stroke="#fbbf24" strokeWidth="1.5" />
      <text x="60" y="224" fontSize="12" fontWeight="700" fill="#92400e">生成器设计</text>
      <text x="60" y="244" fontSize="11" fill="#475569">- 用转置卷积（ConvTranspose2d）上采样</text>
      <text x="60" y="262" fontSize="11" fill="#475569">- 用 BatchNorm 稳定训练</text>
      <text x="60" y="280" fontSize="11" fill="#475569">- 用 ReLU 激活（输出层用 Tanh）</text>
      <text x="60" y="298" fontSize="11" fill="#475569">- 全连接层替换为卷积投影</text>
      <text x="60" y="316" fontSize="11" fill="#475569">- 从 4x4 逐步上采样到目标分辨率</text>

      <rect x="410" y="202" width="350" height="130" rx="10" fill="#eff6ff" stroke="#60a5fa" strokeWidth="1.5" />
      <text x="430" y="224" fontSize="12" fontWeight="700" fill="#1e40af">判别器设计</text>
      <text x="430" y="244" fontSize="11" fill="#475569">- 用步长卷积（stride=2）替代池化下采样</text>
      <text x="430" y="262" fontSize="11" fill="#475569">- 用 BatchNorm（第一层除外）</text>
      <text x="430" y="280" fontSize="11" fill="#475569">- 用 LeakyReLU 激活（斜率 0.2）</text>
      <text x="430" y="298" fontSize="11" fill="#475569">- 输出层用 Sigmoid 输出概率</text>
      <text x="430" y="316" fontSize="11" fill="#475569">- 全连接层替换为卷积展平</text>

      {/* 训练流程 */}
      <text x="400" y="358" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">训练流程</text>

      <rect x="40" y="372" width="150" height="44" rx="8" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="115" y="390" textAnchor="middle" fontSize="10" fontWeight="600" fill="#334155">1. 采样真实数据</text>
      <text x="115" y="406" textAnchor="middle" fontSize="9" fill="#64748b">batch of real x</text>

      <path d="M190 394 L210 394" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#dlg-dcg-arrow)" />

      <rect x="210" y="372" width="150" height="44" rx="8" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="285" y="390" textAnchor="middle" fontSize="10" fontWeight="600" fill="#334155">2. 生成假样本</text>
      <text x="285" y="406" textAnchor="middle" fontSize="9" fill="#64748b">G(z) from noise</text>

      <path d="M360 394 L380 394" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#dlg-dcg-arrow)" />

      <rect x="380" y="372" width="150" height="44" rx="8" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="455" y="390" textAnchor="middle" fontSize="10" fontWeight="600" fill="#334155">3. 训练判别器</text>
      <text x="455" y="406" textAnchor="middle" fontSize="9" fill="#64748b">区分真/假</text>

      <path d="M530 394 L550 394" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#dlg-dcg-arrow)" />

      <rect x="550" y="372" width="210" height="44" rx="8" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="655" y="390" textAnchor="middle" fontSize="10" fontWeight="600" fill="#92400e">4. 训练生成器</text>
      <text x="655" y="406" textAnchor="middle" fontSize="9" fill="#92400e">欺骗判别器</text>

      {/* 底部 */}
      <rect x="40" y="436" width="720" height="44" rx="8" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="400" y="456" textAnchor="middle" fontSize="11" fontWeight="600" fill="#334155">优化器：Adam（lr=0.0002, beta1=0.5）| 损失：二元交叉熵（BCE）</text>
      <text x="400" y="472" textAnchor="middle" fontSize="10" fill="#64748b">交替训练 D 和 G，保持双方能力均衡</text>
    </svg>
  );
}
