"use client";

export function DlgDiffusionModelsDiagram() {
  return (
    <svg viewBox="0 0 800 460" className="w-full h-auto" role="img" aria-label="扩散模型：前向加噪与反向去噪过程">
      <defs>
        <linearGradient id="dlg-dm-forward" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#dc2626" />
          <stop offset="100%" stopColor="#b91c1c" />
        </linearGradient>
        <linearGradient id="dlg-dm-reverse" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <marker id="dlg-dm-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#dc2626" />
        </marker>
        <marker id="dlg-dm-arrow-r" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#2563eb" />
        </marker>
      </defs>

      <text x="400" y="36" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">扩散模型（Diffusion Models）</text>

      {/* 前向过程标签 */}
      <text x="400" y="66" textAnchor="middle" fontSize="13" fontWeight="700" fill="#dc2626">前向过程（加噪）→</text>

      {/* 前向过程：逐步加噪 */}
      <rect x="40" y="80" width="100" height="60" rx="8" fill="url(#dlg-dm-reverse)" opacity="0.9" />
      <text x="90" y="106" textAnchor="middle" fontSize="11" fontWeight="600" fill="#fff">x_0</text>
      <text x="90" y="124" textAnchor="middle" fontSize="10" fill="#bfdbfe">原始图像</text>

      <path d="M140 110 L190 110" stroke="#dc2626" strokeWidth="2" markerEnd="url(#dlg-dm-arrow)" />
      <text x="165" y="102" textAnchor="middle" fontSize="9" fill="#dc2626">q(x_1|x_0)</text>

      <rect x="190" y="80" width="100" height="60" rx="8" fill="#7c3aed" opacity="0.7" />
      <text x="240" y="106" textAnchor="middle" fontSize="11" fontWeight="600" fill="#fff">x_1</text>
      <text x="240" y="124" textAnchor="middle" fontSize="10" fill="#ede9fe">轻微噪声</text>

      <path d="M290 110 L340 110" stroke="#dc2626" strokeWidth="2" markerEnd="url(#dlg-dm-arrow)" />

      <text x="365" y="106" textAnchor="middle" fontSize="14" fontWeight="700" fill="#475569">...</text>

      <path d="M390 110 L440 110" stroke="#dc2626" strokeWidth="2" markerEnd="url(#dlg-dm-arrow)" />
      <text x="415" y="102" textAnchor="middle" fontSize="9" fill="#dc2626">q(x_t|x_{t-1})</text>

      <rect x="440" y="80" width="100" height="60" rx="8" fill="#f59e0b" opacity="0.7" />
      <text x="490" y="106" textAnchor="middle" fontSize="11" fontWeight="600" fill="#fff">x_t</text>
      <text x="490" y="124" textAnchor="middle" fontSize="10" fill="#fef3c7">中等噪声</text>

      <path d="M540 110 L590 110" stroke="#dc2626" strokeWidth="2" markerEnd="url(#dlg-dm-arrow)" />

      <text x="615" y="106" textAnchor="middle" fontSize="14" fontWeight="700" fill="#475569">...</text>

      <path d="M640 110 L660 110" stroke="#dc2626" strokeWidth="2" markerEnd="url(#dlg-dm-arrow)" />

      <rect x="660" y="80" width="100" height="60" rx="8" fill="url(#dlg-dm-forward)" opacity="0.9" />
      <text x="710" y="106" textAnchor="middle" fontSize="11" fontWeight="600" fill="#fff">x_T</text>
      <text x="710" y="124" textAnchor="middle" fontSize="10" fill="#fecaca">纯高斯噪声</text>

      {/* 反向过程标签 */}
      <text x="400" y="176" textAnchor="middle" fontSize="13" fontWeight="700" fill="#2563eb">← 反向过程（去噪/生成）</text>

      {/* 反向过程：逐步去噪 */}
      <path d="M660 200 L160 200" stroke="#2563eb" strokeWidth="2.5" strokeDasharray="6,3" markerEnd="url(#dlg-dm-arrow-r)" />
      <text x="400" y="192" textAnchor="middle" fontSize="11" fill="#2563eb">p_theta(x_{t-1}|x_t) — 学习去噪</text>

      {/* 核心公式 */}
      <rect x="40" y="222" width="340" height="56" rx="10" fill="#fef2f2" stroke="#dc2626" strokeWidth="1.5" />
      <text x="210" y="244" textAnchor="middle" fontSize="12" fontWeight="700" fill="#991b1b">前向：q(x_t|x_{t-1}) = N(sqrt(1-beta_t)*x_{t-1}, beta_t*I)</text>
      <text x="210" y="264" textAnchor="middle" fontSize="10" fill="#475569">beta_t 是预设的噪声调度，无需学习</text>

      <rect x="420" y="222" width="340" height="56" rx="10" fill="#eff6ff" stroke="#2563eb" strokeWidth="1.5" />
      <text x="590" y="244" textAnchor="middle" fontSize="12" fontWeight="700" fill="#1e40af">反向：p_theta(x_{t-1}|x_t) = N(mu_theta, sigma_theta)</text>
      <text x="590" y="264" textAnchor="middle" fontSize="10" fill="#475569">用神经网络参数化，学习去噪</text>

      {/* 训练目标 */}
      <rect x="40" y="296" width="720" height="56" rx="10" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="400" y="318" textAnchor="middle" fontSize="13" fontWeight="700" fill="#92400e">训练目标：预测噪声 epsilon</text>
      <text x="400" y="338" textAnchor="middle" fontSize="11" fill="#475569">L = E[||epsilon - epsilon_theta(x_t, t)||^2]  — 简化的去噪损失</text>

      {/* 关键优势 */}
      <text x="400" y="384" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">扩散模型的关键优势</text>

      <rect x="40" y="398" width="170" height="44" rx="8" fill="#d1fae5" stroke="#10b981" strokeWidth="1.5" />
      <text x="125" y="416" textAnchor="middle" fontSize="11" fontWeight="600" fill="#065f46">训练稳定</text>
      <text x="125" y="432" textAnchor="middle" fontSize="10" fill="#475569">无对抗博弈</text>

      <rect x="230" y="398" width="170" height="44" rx="8" fill="#d1fae5" stroke="#10b981" strokeWidth="1.5" />
      <text x="315" y="416" textAnchor="middle" fontSize="11" fontWeight="600" fill="#065f46">生成质量高</text>
      <text x="315" y="432" textAnchor="middle" fontSize="10" fill="#475569">超越 GAN</text>

      <rect x="420" y="398" width="170" height="44" rx="8" fill="#d1fae5" stroke="#10b981" strokeWidth="1.5" />
      <text x="505" y="416" textAnchor="middle" fontSize="11" fontWeight="600" fill="#065f46">多样性好</text>
      <text x="505" y="432" textAnchor="middle" fontSize="10" fill="#475569">覆盖数据分布</text>

      <rect x="610" y="398" width="150" height="44" rx="8" fill="#fee2e2" stroke="#ef4444" strokeWidth="1.5" />
      <text x="685" y="416" textAnchor="middle" fontSize="11" fontWeight="600" fill="#991b1b">采样慢</text>
      <text x="685" y="432" textAnchor="middle" fontSize="10" fill="#475569">需多步迭代</text>
    </svg>
  );
}
