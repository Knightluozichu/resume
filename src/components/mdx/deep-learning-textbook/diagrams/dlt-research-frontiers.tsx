"use client";

export function DltResearchFrontiersDiagram() {
  return (
    <svg viewBox="0 0 800 520" className="w-full h-auto" role="img" aria-label="研究前沿与挑战核心概念图">
      <defs>
        <linearGradient id="dlt-rf-gen" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="dlt-rf-ssl" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <linearGradient id="dlt-rf-mc" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="dlt-rf-ch" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#dc2626" />
          <stop offset="100%" stopColor="#b91c1c" />
        </linearGradient>
        <marker id="dlt-rf-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="36" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">研究前沿：从实践到发明新工具</text>

      {/* 生成模型 */}
      <text x="200" y="72" textAnchor="middle" fontSize="13" fontWeight="700" fill="#5b21b6">生成模型</text>

      <rect x="40" y="84" width="160" height="32" rx="6" fill="url(#dlt-rf-gen)" opacity="0.8" />
      <text x="120" y="104" textAnchor="middle" fontSize="9" fill="#fff">自回归(精确似然)</text>
      <rect x="40" y="122" width="160" height="32" rx="6" fill="url(#dlt-rf-gen)" opacity="0.7" />
      <text x="120" y="142" textAnchor="middle" fontSize="9" fill="#fff">标准化流(可逆变换)</text>
      <rect x="40" y="160" width="160" height="32" rx="6" fill="url(#dlt-rf-gen)" opacity="0.6" />
      <text x="120" y="180" textAnchor="middle" fontSize="9" fill="#fff">VAE(变分推断ELBO)</text>
      <rect x="40" y="198" width="160" height="32" rx="6" fill="url(#dlt-rf-gen)" opacity="0.5" />
      <text x="120" y="218" textAnchor="middle" fontSize="9" fill="#fff">GAN(对抗博弈)</text>
      <rect x="40" y="236" width="160" height="28" rx="6" fill="url(#dlt-rf-gen)" opacity="0.3" />
      <text x="120" y="254" textAnchor="middle" fontSize="8" fill="#7c3aed">扩散模型(2020后·主流)</text>

      {/* 自监督学习 */}
      <text x="460" y="72" textAnchor="middle" fontSize="13" fontWeight="700" fill="#065f46">自监督学习</text>

      <rect x="320" y="84" width="280" height="32" rx="6" fill="url(#dlt-rf-ssl)" opacity="0.8" />
      <text x="460" y="104" textAnchor="middle" fontSize="9" fill="#fff">掩码语言建模 → BERT</text>
      <rect x="320" y="122" width="280" height="32" rx="6" fill="url(#dlt-rf-ssl)" opacity="0.7" />
      <text x="460" y="142" textAnchor="middle" fontSize="9" fill="#fff">自回归预测 → GPT</text>
      <rect x="320" y="160" width="280" height="32" rx="6" fill="url(#dlt-rf-ssl)" opacity="0.6" />
      <text x="460" y="180" textAnchor="middle" fontSize="9" fill="#fff">对比学习 → SimCLR / CLIP</text>
      <rect x="320" y="198" width="280" height="32" rx="6" fill="url(#dlt-rf-ssl)" opacity="0.5" />
      <text x="460" y="218" textAnchor="middle" fontSize="9" fill="#fff">掩码图像建模 → MAE</text>
      <rect x="320" y="236" width="280" height="28" rx="6" fill="url(#dlt-rf-ssl)" opacity="0.15" stroke="#059669" strokeWidth="1.5" />
      <text x="460" y="254" textAnchor="middle" fontSize="8" fontWeight="600" fill="#065f46">利用海量无标注数据 → 大模型基础</text>

      {/* 蒙特卡洛 */}
      <text x="680" y="72" textAnchor="middle" fontSize="13" fontWeight="700" fill="#1e40af">蒙特卡洛</text>

      <rect x="620" y="84" width="140" height="28" rx="6" fill="url(#dlt-rf-mc)" opacity="0.8" />
      <text x="690" y="102" textAnchor="middle" fontSize="8" fill="#fff">SGD(mini-batch采样)</text>
      <rect x="620" y="118" width="140" height="28" rx="6" fill="url(#dlt-rf-mc)" opacity="0.7" />
      <text x="690" y="136" textAnchor="middle" fontSize="8" fill="#fff">Dropout(子网络采样)</text>
      <rect x="620" y="152" width="140" height="28" rx="6" fill="url(#dlt-rf-mc)" opacity="0.6" />
      <text x="690" y="170" textAnchor="middle" fontSize="8" fill="#fff">重参数化(VAE)</text>
      <rect x="620" y="186" width="140" height="28" rx="6" fill="url(#dlt-rf-mc)" opacity="0.5" />
      <text x="690" y="204" textAnchor="middle" fontSize="8" fill="#fff">MCMC / 重要采样</text>
      <rect x="620" y="224" width="140" height="28" rx="6" fill="url(#dlt-rf-mc)" opacity="0.3" />
      <text x="690" y="242" textAnchor="middle" fontSize="8" fill="#1e40af">变分推断(ELBO)</text>

      {/* 挑战 */}
      <text x="400" y="296" textAnchor="middle" fontSize="13" fontWeight="700" fill="#991b1b">深度学习的挑战</text>

      <rect x="40" y="308" width="140" height="40" rx="6" fill="#fef2f2" stroke="#dc2626" strokeWidth="1" />
      <text x="110" y="325" textAnchor="middle" fontSize="9" fontWeight="600" fill="#991b1b">理论理解不足</text>
      <text x="110" y="340" textAnchor="middle" fontSize="7" fill="#b91c1c">为何能泛化?</text>

      <rect x="190" y="308" width="140" height="40" rx="6" fill="#fef2f2" stroke="#dc2626" strokeWidth="1" />
      <text x="260" y="325" textAnchor="middle" fontSize="9" fontWeight="600" fill="#991b1b">可解释性</text>
      <text x="260" y="340" textAnchor="middle" fontSize="7" fill="#b91c1c">黑箱·对抗样本</text>

      <rect x="340" y="308" width="140" height="40" rx="6" fill="#fef2f2" stroke="#dc2626" strokeWidth="1" />
      <text x="410" y="325" textAnchor="middle" fontSize="9" fontWeight="600" fill="#991b1b">数据效率</text>
      <text x="410" y="340" textAnchor="middle" fontSize="7" fill="#b91c1c">需大量标注</text>

      <rect x="490" y="308" width="140" height="40" rx="6" fill="#fef2f2" stroke="#dc2626" strokeWidth="1" />
      <text x="560" y="325" textAnchor="middle" fontSize="9" fontWeight="600" fill="#991b1b">鲁棒性</text>
      <text x="560" y="340" textAnchor="middle" fontSize="7" fill="#b91c1c">分布偏移·偏见</text>

      <rect x="640" y="308" width="120" height="40" rx="6" fill="#fef2f2" stroke="#dc2626" strokeWidth="1" />
      <text x="700" y="325" textAnchor="middle" fontSize="9" fontWeight="600" fill="#991b1b">可扩展性</text>
      <text x="700" y="340" textAnchor="middle" fontSize="7" fill="#b91c1c">算力·碳排放</text>

      {/* 线性因子模型 */}
      <text x="200" y="384" textAnchor="middle" fontSize="11" fontWeight="600" fill="#334155">线性因子模型(生成模型基础)</text>
      <rect x="40" y="394" width="90" height="24" rx="6" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1" />
      <text x="85" y="410" textAnchor="middle" fontSize="8" fill="#475569">PCA</text>
      <rect x="140" y="394" width="90" height="24" rx="6" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1" />
      <text x="185" y="410" textAnchor="middle" fontSize="8" fill="#475569">因子分析</text>
      <rect x="240" y="394" width="90" height="24" rx="6" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1" />
      <text x="285" y="410" textAnchor="middle" fontSize="8" fill="#475569">ICA</text>
      <rect x="340" y="394" width="90" height="24" rx="6" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1" />
      <text x="385" y="410" textAnchor="middle" fontSize="8" fill="#475569">慢特征分析</text>

      {/* 花书后的发展 */}
      <rect x="440" y="380" width="320" height="50" rx="8" fill="url(#dlt-rf-gen)" opacity="0.1" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="600" y="400" textAnchor="middle" fontSize="10" fontWeight="600" fill="#5b21b6">花书(2016)后的重大发展</text>
      <text x="600" y="416" textAnchor="middle" fontSize="9" fill="#5b21b6">Transformer(2017)·扩散模型(2020)·大模型(GPT)</text>

      {/* 底部 */}
      <rect x="40" y="450" width="720" height="36" rx="8" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="400" y="472" textAnchor="middle" fontSize="11" fill="#475569">表示学习 = 自动特征学习 · 蒙特卡洛 = 采样近似 · 变分推断 = 近似后验</text>

      <rect x="40" y="492" width="720" height="20" rx="8" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" />
      <text x="400" y="506" textAnchor="middle" fontSize="10" fill="#64748b">花书 = 从「用好工具」到「发明新工具」的桥梁</text>
    </svg>
  );
}
