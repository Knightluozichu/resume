"use client";

export function DlgLearningMapDiagram() {
  return (
    <svg viewBox="0 0 800 600" className="w-full h-auto" role="img" aria-label="深度学习入门5生成模型全书学习地图">
      <defs>
        <linearGradient id="dlg-lm-basics" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="dlg-lm-latent" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="dlg-lm-gan" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="dlg-lm-diffusion" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#dc2626" />
          <stop offset="100%" stopColor="#b91c1c" />
        </linearGradient>
        <linearGradient id="dlg-lm-review" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <marker id="dlg-lm-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="36" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">深度学习入门5：生成模型（斋藤康毅） · 知识体系全景</text>

      {/* 左侧：四大学习阶段 */}
      <text x="160" y="72" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">生成模型学习主线</text>

      <rect x="40" y="84" width="240" height="58" rx="10" fill="url(#dlg-lm-basics)" opacity="0.95" />
      <text x="160" y="108" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">生成模型基础</text>
      <text x="160" y="128" textAnchor="middle" fontSize="11" fill="#bfdbfe">概率建模 / 自编码器 / VAE</text>

      <path d="M160 142 L160 148" stroke="#64748b" strokeWidth="2" markerEnd="url(#dlg-lm-arrow)" />

      <rect x="40" y="150" width="240" height="58" rx="10" fill="url(#dlg-lm-latent)" opacity="0.95" />
      <text x="160" y="174" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">隐空间与流模型</text>
      <text x="160" y="194" textAnchor="middle" fontSize="11" fill="#ede9fe">重参数化 / 可逆变换 / 标准化流</text>

      <path d="M160 208 L160 214" stroke="#64748b" strokeWidth="2" markerEnd="url(#dlg-lm-arrow)" />

      <rect x="40" y="216" width="240" height="58" rx="10" fill="url(#dlg-lm-gan)" opacity="0.95" />
      <text x="160" y="240" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">对抗生成与扩散</text>
      <text x="160" y="260" textAnchor="middle" fontSize="11" fill="#fef3c7">GAN / DCGAN / 扩散模型</text>

      <path d="M160 274 L160 280" stroke="#64748b" strokeWidth="2" markerEnd="url(#dlg-lm-arrow)" />

      <rect x="40" y="282" width="240" height="58" rx="10" fill="url(#dlg-lm-diffusion)" opacity="0.95" />
      <text x="160" y="306" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">应用与评估整合</text>
      <text x="160" y="326" textAnchor="middle" fontSize="11" fill="#fecaca">文生图 / 评估指标 / 伦理</text>

      <text x="160" y="362" textAnchor="middle" fontSize="11" fontWeight="600" fill="#7c3aed">从零实现生成模型核心算法</text>

      {/* 右侧：10章学习路径 */}
      <text x="540" y="72" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">十章学习路径</text>

      <rect x="320" y="84" width="460" height="38" rx="8" fill="url(#dlg-lm-basics)" opacity="0.12" stroke="#2563eb" strokeWidth="1.5" />
      <text x="338" y="108" fontSize="12" fontWeight="600" fill="#1e40af">ch0</text>
      <text x="372" y="108" fontSize="11" fill="#475569">全书学习地图——生成模型知识体系</text>

      <path d="M550 122 L550 128" stroke="#64748b" strokeWidth="2" markerEnd="url(#dlg-lm-arrow)" />

      <rect x="320" y="130" width="460" height="38" rx="8" fill="url(#dlg-lm-basics)" opacity="0.12" stroke="#2563eb" strokeWidth="1.5" />
      <text x="338" y="154" fontSize="12" fontWeight="600" fill="#1e40af">ch1</text>
      <text x="372" y="154" fontSize="11" fill="#475569">生成模型基础——判别 vs 生成 / 概率建模</text>

      <path d="M550 168 L550 174" stroke="#64748b" strokeWidth="2" markerEnd="url(#dlg-lm-arrow)" />

      <rect x="320" y="176" width="460" height="38" rx="8" fill="url(#dlg-lm-latent)" opacity="0.12" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="338" y="200" fontSize="12" fontWeight="600" fill="#5b21b6">ch2</text>
      <text x="372" y="200" fontSize="11" fill="#475569">自编码器与VAE——编码 / 解码 / 重参数化</text>

      <path d="M550 214 L550 220" stroke="#64748b" strokeWidth="2" markerEnd="url(#dlg-lm-arrow)" />

      <rect x="320" y="222" width="460" height="38" rx="8" fill="url(#dlg-lm-latent)" opacity="0.12" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="338" y="246" fontSize="12" fontWeight="600" fill="#5b21b6">ch3</text>
      <text x="372" y="246" fontSize="11" fill="#475569">流模型——可逆变换 / 标准化流</text>

      <path d="M550 260 L550 266" stroke="#64748b" strokeWidth="2" markerEnd="url(#dlg-lm-arrow)" />

      <rect x="320" y="268" width="460" height="38" rx="8" fill="url(#dlg-lm-gan)" opacity="0.12" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="338" y="292" fontSize="12" fontWeight="600" fill="#92400e">ch4</text>
      <text x="372" y="292" fontSize="11" fill="#475569">生成对抗网络——生成器 / 判别器博弈</text>

      <path d="M550 306 L550 312" stroke="#64748b" strokeWidth="2" markerEnd="url(#dlg-lm-arrow)" />

      <rect x="320" y="314" width="460" height="38" rx="8" fill="url(#dlg-lm-gan)" opacity="0.12" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="338" y="338" fontSize="12" fontWeight="600" fill="#92400e">ch5</text>
      <text x="372" y="338" fontSize="11" fill="#475569">DCGAN实现——卷积生成对抗网络</text>

      <path d="M550 352 L550 358" stroke="#64748b" strokeWidth="2" markerEnd="url(#dlg-lm-arrow)" />

      <rect x="320" y="360" width="460" height="38" rx="8" fill="url(#dlg-lm-diffusion)" opacity="0.12" stroke="#dc2626" strokeWidth="1.5" />
      <text x="338" y="384" fontSize="12" fontWeight="600" fill="#991b1b">ch6</text>
      <text x="372" y="384" fontSize="11" fill="#475569">扩散模型——前向加噪 / 反向去噪</text>

      <path d="M550 398 L550 404" stroke="#64748b" strokeWidth="2" markerEnd="url(#dlg-lm-arrow)" />

      <rect x="320" y="406" width="460" height="38" rx="8" fill="url(#dlg-lm-diffusion)" opacity="0.12" stroke="#dc2626" strokeWidth="1.5" />
      <text x="338" y="430" fontSize="12" fontWeight="600" fill="#991b1b">ch7</text>
      <text x="372" y="430" fontSize="11" fill="#475569">文本到图像生成——条件生成 / 架构</text>

      <path d="M550 444 L550 450" stroke="#64748b" strokeWidth="2" markerEnd="url(#dlg-lm-arrow)" />

      <rect x="320" y="452" width="460" height="38" rx="8" fill="url(#dlg-lm-review)" opacity="0.12" stroke="#059669" strokeWidth="1.5" />
      <text x="338" y="476" fontSize="12" fontWeight="600" fill="#065f46">ch8</text>
      <text x="372" y="476" fontSize="11" fill="#475569">评估与伦理——FID / IS / 深度伪造</text>

      <path d="M550 490 L550 496" stroke="#64748b" strokeWidth="2" markerEnd="url(#dlg-lm-arrow)" />

      <rect x="320" y="498" width="460" height="38" rx="8" fill="url(#dlg-lm-review)" opacity="0.12" stroke="#059669" strokeWidth="1.5" />
      <text x="338" y="522" fontSize="12" fontWeight="600" fill="#065f46">ch9</text>
      <text x="372" y="522" fontSize="11" fill="#475569">全书复习与知识整合——从VAE到扩散</text>

      {/* 底部学习路径 */}
      <rect x="40" y="550" width="740" height="26" rx="8" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="410" y="567" textAnchor="middle" fontSize="11" fill="#475569">概率建模 → VAE → 流模型 → GAN → DCGAN → 扩散模型 → 文生图 → 评估伦理 → 整合</text>
    </svg>
  );
}
