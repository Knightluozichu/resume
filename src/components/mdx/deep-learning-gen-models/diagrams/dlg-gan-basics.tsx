"use client";

export function DlgGanBasicsDiagram() {
  return (
    <svg viewBox="0 0 800 460" className="w-full h-auto" role="img" aria-label="生成对抗网络：生成器与判别器博弈">
      <defs>
        <linearGradient id="dlg-gb-gen" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="dlg-gb-disc" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="dlg-gb-real" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <marker id="dlg-gb-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="36" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">生成对抗网络（GAN）博弈结构</text>

      {/* 生成器 */}
      <rect x="40" y="70" width="180" height="80" rx="12" fill="url(#dlg-gb-gen)" opacity="0.9" />
      <text x="130" y="98" textAnchor="middle" fontSize="15" fontWeight="700" fill="#fff">生成器 G</text>
      <text x="130" y="118" textAnchor="middle" fontSize="11" fill="#fef3c7">输入：噪声 z ~ N(0,I)</text>
      <text x="130" y="136" textAnchor="middle" fontSize="11" fill="#fef3c7">输出：假样本 G(z)</text>

      {/* 判别器 */}
      <rect x="500" y="70" width="180" height="80" rx="12" fill="url(#dlg-gb-disc)" opacity="0.9" />
      <text x="590" y="98" textAnchor="middle" fontSize="15" fontWeight="700" fill="#fff">判别器 D</text>
      <text x="590" y="118" textAnchor="middle" fontSize="11" fill="#bfdbfe">输入：真实 / 生成样本</text>
      <text x="590" y="136" textAnchor="middle" fontSize="11" fill="#bfdbfe">输出：真/假概率 D(x)</text>

      {/* 数据流 */}
      <path d="M220 110 L500 110" stroke="#64748b" strokeWidth="2.5" markerEnd="url(#dlg-gb-arrow)" />
      <text x="360" y="102" textAnchor="middle" fontSize="11" fill="#475569">假样本 G(z)</text>

      {/* 真实数据 */}
      <rect x="40" y="180" width="180" height="60" rx="12" fill="url(#dlg-gb-real)" opacity="0.9" />
      <text x="130" y="208" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">真实数据 x</text>
      <text x="130" y="228" textAnchor="middle" fontSize="11" fill="#d1fae5">来自训练集</text>

      <path d="M220 210 L500 150" stroke="#64748b" strokeWidth="2" markerEnd="url(#dlg-gb-arrow)" />
      <text x="360" y="180" textAnchor="middle" fontSize="11" fill="#475569">真实样本 x</text>

      {/* 博弈目标 */}
      <rect x="280" y="200" width="240" height="56" rx="10" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2" />
      <text x="400" y="222" textAnchor="middle" fontSize="12" fontWeight="700" fill="#92400e">极小极大博弈</text>
      <text x="400" y="242" textAnchor="middle" fontSize="10" fill="#92400e">min_G max_D E[log D(x)] + E[log(1-D(G(z)))]</text>

      {/* 双方目标 */}
      <rect x="40" y="280" width="340" height="70" rx="10" fill="#fffbeb" stroke="#fbbf24" strokeWidth="1.5" />
      <text x="60" y="302" fontSize="12" fontWeight="700" fill="#92400e">生成器目标</text>
      <text x="60" y="320" fontSize="11" fill="#475569">让 D 无法区分真假样本</text>
      <text x="60" y="338" fontSize="11" fill="#475569">最小化 log(1 - D(G(z)))</text>

      <rect x="420" y="280" width="340" height="70" rx="10" fill="#eff6ff" stroke="#60a5fa" strokeWidth="1.5" />
      <text x="440" y="302" fontSize="12" fontWeight="700" fill="#1e40af">判别器目标</text>
      <text x="440" y="320" fontSize="11" fill="#475569">正确区分真实与生成样本</text>
      <text x="440" y="338" fontSize="11" fill="#475569">最大化 log D(x) + log(1-D(G(z)))</text>

      {/* 训练挑战 */}
      <text x="400" y="378" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">GAN 训练挑战</text>

      <rect x="40" y="392" width="220" height="50" rx="8" fill="#fee2e2" stroke="#ef4444" strokeWidth="1.5" />
      <text x="150" y="412" textAnchor="middle" fontSize="11" fontWeight="600" fill="#991b1b">模式崩溃</text>
      <text x="150" y="430" textAnchor="middle" fontSize="10" fill="#475569">生成器只产出少数样本</text>

      <rect x="290" y="392" width="220" height="50" rx="8" fill="#fee2e2" stroke="#ef4444" strokeWidth="1.5" />
      <text x="400" y="412" textAnchor="middle" fontSize="11" fontWeight="600" fill="#991b1b">训练不稳定</text>
      <text x="400" y="430" textAnchor="middle" fontSize="10" fill="#475569">博弈失衡，难以收敛</text>

      <rect x="540" y="392" width="220" height="50" rx="8" fill="#fee2e2" stroke="#ef4444" strokeWidth="1.5" />
      <text x="650" y="412" textAnchor="middle" fontSize="11" fontWeight="600" fill="#991b1b">梯度消失</text>
      <text x="650" y="430" textAnchor="middle" fontSize="10" fill="#475569">判别器过强时生成器无梯度</text>
    </svg>
  );
}
