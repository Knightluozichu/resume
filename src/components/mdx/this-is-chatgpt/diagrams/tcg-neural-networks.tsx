"use client";

export function TcgNeuralNetworksDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="神经网络与机器学习：结构、训练与学习">
      <defs>
        <linearGradient id="tcg-nn-input" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="tcg-nn-hidden" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="tcg-nn-output" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <marker id="tcg-nn-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">神经网络与机器学习</text>

      {/* 神经网络结构 */}
      <text x="400" y="64" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">神经网络结构</text>

      {/* 输入层 */}
      <circle cx="120" cy="120" r="16" fill="url(#tcg-nn-input)" opacity="0.85" />
      <text x="120" y="124" textAnchor="middle" fontSize="10" fill="#fff" fontWeight="600">x1</text>
      <circle cx="120" cy="170" r="16" fill="url(#tcg-nn-input)" opacity="0.85" />
      <text x="120" y="174" textAnchor="middle" fontSize="10" fill="#fff" fontWeight="600">x2</text>
      <circle cx="120" cy="220" r="16" fill="url(#tcg-nn-input)" opacity="0.85" />
      <text x="120" y="224" textAnchor="middle" fontSize="10" fill="#fff" fontWeight="600">x3</text>
      <text x="120" y="260" textAnchor="middle" fontSize="11" fontWeight="600" fill="#1e40af">输入层</text>

      {/* 隐藏层 */}
      <circle cx="340" cy="100" r="16" fill="url(#tcg-nn-hidden)" opacity="0.85" />
      <text x="340" y="104" textAnchor="middle" fontSize="10" fill="#fff" fontWeight="600">h1</text>
      <circle cx="340" cy="150" r="16" fill="url(#tcg-nn-hidden)" opacity="0.85" />
      <text x="340" y="154" textAnchor="middle" fontSize="10" fill="#fff" fontWeight="600">h2</text>
      <circle cx="340" cy="200" r="16" fill="url(#tcg-nn-hidden)" opacity="0.85" />
      <text x="340" y="204" textAnchor="middle" fontSize="10" fill="#fff" fontWeight="600">h3</text>
      <circle cx="340" cy="250" r="16" fill="url(#tcg-nn-hidden)" opacity="0.85" />
      <text x="340" y="254" textAnchor="middle" fontSize="10" fill="#fff" fontWeight="600">h4</text>
      <text x="340" y="290" textAnchor="middle" fontSize="11" fontWeight="600" fill="#5b21b6">隐藏层</text>

      {/* 输出层 */}
      <circle cx="560" cy="145" r="16" fill="url(#tcg-nn-output)" opacity="0.85" />
      <text x="560" y="149" textAnchor="middle" fontSize="10" fill="#fff" fontWeight="600">y1</text>
      <circle cx="560" cy="205" r="16" fill="url(#tcg-nn-output)" opacity="0.85" />
      <text x="560" y="209" textAnchor="middle" fontSize="10" fill="#fff" fontWeight="600">y2</text>
      <text x="560" y="250" textAnchor="middle" fontSize="11" fontWeight="600" fill="#065f46">输出层</text>

      {/* 连接线 */}
      <g stroke="#cbd5e1" strokeWidth="1" opacity="0.6">
        <line x1="136" y1="120" x2="324" y2="100" />
        <line x1="136" y1="120" x2="324" y2="150" />
        <line x1="136" y1="120" x2="324" y2="200" />
        <line x1="136" y1="120" x2="324" y2="250" />
        <line x1="136" y1="170" x2="324" y2="100" />
        <line x1="136" y1="170" x2="324" y2="150" />
        <line x1="136" y1="170" x2="324" y2="200" />
        <line x1="136" y1="170" x2="324" y2="250" />
        <line x1="136" y1="220" x2="324" y2="100" />
        <line x1="136" y1="220" x2="324" y2="150" />
        <line x1="136" y1="220" x2="324" y2="200" />
        <line x1="136" y1="220" x2="324" y2="250" />
        <line x1="356" y1="100" x2="544" y2="145" />
        <line x1="356" y1="100" x2="544" y2="205" />
        <line x1="356" y1="150" x2="544" y2="145" />
        <line x1="356" y1="150" x2="544" y2="205" />
        <line x1="356" y1="200" x2="544" y2="145" />
        <line x1="356" y1="200" x2="544" y2="205" />
        <line x1="356" y1="250" x2="544" y2="145" />
        <line x1="356" y1="250" x2="544" y2="205" />
      </g>

      {/* 权重说明 */}
      <rect x="620" y="100" width="150" height="80" rx="8" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1" />
      <text x="695" y="122" textAnchor="middle" fontSize="11" fontWeight="700" fill="#334155">每条连线</text>
      <text x="695" y="142" textAnchor="middle" fontSize="11" fill="#475569">= 一个权重 w</text>
      <text x="695" y="162" textAnchor="middle" fontSize="10" fill="#64748b">权重决定信号强度</text>

      {/* 训练过程 */}
      <text x="400" y="320" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">训练：通过数据学习权重</text>

      <rect x="40" y="338" width="160" height="68" rx="8" fill="url(#tcg-nn-input)" opacity="0.1" stroke="#2563eb" strokeWidth="1.5" />
      <text x="120" y="362" textAnchor="middle" fontSize="12" fontWeight="700" fill="#1e40af">1. 前向传播</text>
      <text x="120" y="382" textAnchor="middle" fontSize="10" fill="#475569">输入数据经过网络</text>
      <text x="120" y="398" textAnchor="middle" fontSize="10" fill="#475569">产生预测输出</text>

      <path d="M200 372 L216 372" stroke="#64748b" strokeWidth="2" markerEnd="url(#tcg-nn-arrow)" />

      <rect x="220" y="338" width="160" height="68" rx="8" fill="#fffbeb" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="300" y="362" textAnchor="middle" fontSize="12" fontWeight="700" fill="#92400e">2. 计算误差</text>
      <text x="300" y="382" textAnchor="middle" fontSize="10" fill="#475569">预测值与真实值</text>
      <text x="300" y="398" textAnchor="middle" fontSize="10" fill="#475569">之间的差距</text>

      <path d="M380 372 L396 372" stroke="#64748b" strokeWidth="2" markerEnd="url(#tcg-nn-arrow)" />

      <rect x="400" y="338" width="160" height="68" rx="8" fill="url(#tcg-nn-hidden)" opacity="0.1" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="480" y="362" textAnchor="middle" fontSize="12" fontWeight="700" fill="#5b21b6">3. 反向传播</text>
      <text x="480" y="382" textAnchor="middle" fontSize="10" fill="#475569">误差从输出层</text>
      <text x="480" y="398" textAnchor="middle" fontSize="10" fill="#475569">反向传回输入层</text>

      <path d="M560 372 L576 372" stroke="#64748b" strokeWidth="2" markerEnd="url(#tcg-nn-arrow)" />

      <rect x="580" y="338" width="180" height="68" rx="8" fill="url(#tcg-nn-output)" opacity="0.1" stroke="#059669" strokeWidth="1.5" />
      <text x="670" y="362" textAnchor="middle" fontSize="12" fontWeight="700" fill="#065f46">4. 更新权重</text>
      <text x="670" y="382" textAnchor="middle" fontSize="10" fill="#475569">用梯度下降调整</text>
      <text x="670" y="398" textAnchor="middle" fontSize="10" fill="#475569">减小下一次误差</text>

      {/* 关键特性 */}
      <text x="400" y="438" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">神经网络的关键特性</text>

      <rect x="40" y="454" width="230" height="60" rx="8" fill="#eff6ff" stroke="#2563eb" strokeWidth="1.5" />
      <text x="155" y="478" textAnchor="middle" fontSize="12" fontWeight="700" fill="#1e40af">万能近似定理</text>
      <text x="155" y="498" textAnchor="middle" fontSize="10" fill="#475569">足够大的网络可逼近任意函数</text>

      <rect x="285" y="454" width="230" height="60" rx="8" fill="#faf5ff" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="400" y="478" textAnchor="middle" fontSize="12" fontWeight="700" fill="#5b21b6">特征学习</text>
      <text x="400" y="498" textAnchor="middle" fontSize="10" fill="#475569">自动从数据中学习有用特征</text>

      <rect x="530" y="454" width="230" height="60" rx="8" fill="#f0fdf4" stroke="#059669" strokeWidth="1.5" />
      <text x="645" y="478" textAnchor="middle" fontSize="12" fontWeight="700" fill="#065f46">非线性变换</text>
      <text x="645" y="498" textAnchor="middle" fontSize="10" fill="#475569">激活函数引入非线性能力</text>

      {/* 底部总结 */}
      <rect x="40" y="530" width="720" height="32" rx="8" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="400" y="550" textAnchor="middle" fontSize="11" fill="#475569">前向传播 → 计算误差 → 反向传播 → 更新权重 → 重复直至收敛</text>
    </svg>
  );
}
