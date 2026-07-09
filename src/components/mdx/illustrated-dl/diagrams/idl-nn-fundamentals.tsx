"use client";

export function IdlNnFundamentalsDiagram() {
  return (
    <svg viewBox="0 0 800 500" className="w-full h-auto" role="img" aria-label="从感知机到多层神经网络">
      <defs>
        <linearGradient id="idl-nn-perceptron" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="idl-nn-mlp" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <marker id="idl-nn-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="30" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">从感知机到多层神经网络</text>

      {/* 左侧：感知机 */}
      <text x="180" y="64" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">感知机（单层线性）</text>

      <circle cx="100" cy="120" r="22" fill="#dbeafe" stroke="#2563eb" strokeWidth="2" />
      <text x="100" y="125" textAnchor="middle" fontSize="13" fontWeight="600" fill="#1e40af">x1</text>

      <circle cx="100" cy="180" r="22" fill="#dbeafe" stroke="#2563eb" strokeWidth="2" />
      <text x="100" y="185" textAnchor="middle" fontSize="13" fontWeight="600" fill="#1e40af">x2</text>

      <text x="60" y="155" fontSize="10" fill="#64748b">w1</text>
      <text x="60" y="195" fontSize="10" fill="#64748b">w2</text>

      <line x1="122" y1="120" x2="218" y2="150" stroke="#64748b" strokeWidth="2" markerEnd="url(#idl-nn-arrow)" />
      <line x1="122" y1="180" x2="218" y2="150" stroke="#64748b" strokeWidth="2" markerEnd="url(#idl-nn-arrow)" />

      <rect x="218" y="128" width="80" height="44" rx="10" fill="url(#idl-nn-perceptron)" opacity="0.95" />
      <text x="258" y="155" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">z = w^T x + b</text>

      <line x1="298" y1="150" x2="348" y2="150" stroke="#64748b" strokeWidth="2" markerEnd="url(#idl-nn-arrow)" />

      <rect x="348" y="128" width="60" height="44" rx="10" fill="#f1f5f9" stroke="#475569" strokeWidth="2" />
      <text x="378" y="155" textAnchor="middle" fontSize="12" fontWeight="600" fill="#334155">step</text>

      <text x="180" y="210" textAnchor="middle" fontSize="11" fill="#dc2626">只能解决线性可分问题</text>
      <text x="180" y="228" textAnchor="middle" fontSize="11" fill="#dc2626">无法解决 XOR</text>

      {/* 右侧：多层感知机 */}
      <text x="580" y="64" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">多层感知机（MLP）</text>

      {/* 输入层 */}
      <circle cx="500" cy="110" r="18" fill="#dbeafe" stroke="#2563eb" strokeWidth="2" />
      <text x="500" y="115" textAnchor="middle" fontSize="11" fill="#1e40af">x1</text>
      <circle cx="500" cy="160" r="18" fill="#dbeafe" stroke="#2563eb" strokeWidth="2" />
      <text x="500" y="165" textAnchor="middle" fontSize="11" fill="#1e40af">x2</text>

      {/* 隐藏层1 */}
      <circle cx="600" cy="90" r="18" fill="url(#idl-nn-mlp)" opacity="0.2" stroke="#7c3aed" strokeWidth="2" />
      <text x="600" y="95" textAnchor="middle" fontSize="11" fill="#5b21b6">h1</text>
      <circle cx="600" cy="140" r="18" fill="url(#idl-nn-mlp)" opacity="0.2" stroke="#7c3aed" strokeWidth="2" />
      <text x="600" y="145" textAnchor="middle" fontSize="11" fill="#5b21b6">h2</text>
      <circle cx="600" cy="190" r="18" fill="url(#idl-nn-mlp)" opacity="0.2" stroke="#7c3aed" strokeWidth="2" />
      <text x="600" y="195" textAnchor="middle" fontSize="11" fill="#5b21b6">h3</text>

      {/* 输出层 */}
      <circle cx="700" cy="140" r="18" fill="#dcfce7" stroke="#059669" strokeWidth="2" />
      <text x="700" y="145" textAnchor="middle" fontSize="11" fill="#065f46">y</text>

      {/* 连接线 */}
      <line x1="518" y1="110" x2="582" y2="90" stroke="#94a3b8" strokeWidth="1" />
      <line x1="518" y1="110" x2="582" y2="140" stroke="#94a3b8" strokeWidth="1" />
      <line x1="518" y1="110" x2="582" y2="190" stroke="#94a3b8" strokeWidth="1" />
      <line x1="518" y1="160" x2="582" y2="90" stroke="#94a3b8" strokeWidth="1" />
      <line x1="518" y1="160" x2="582" y2="140" stroke="#94a3b8" strokeWidth="1" />
      <line x1="518" y1="160" x2="582" y2="190" stroke="#94a3b8" strokeWidth="1" />
      <line x1="618" y1="90" x2="682" y2="140" stroke="#94a3b8" strokeWidth="1" />
      <line x1="618" y1="140" x2="682" y2="140" stroke="#94a3b8" strokeWidth="1" />
      <line x1="618" y1="190" x2="682" y2="140" stroke="#94a3b8" strokeWidth="1" />

      <text x="500" y="210" textAnchor="middle" fontSize="10" fill="#64748b">输入层</text>
      <text x="600" y="230" textAnchor="middle" fontSize="10" fill="#64748b">隐藏层（+激活函数）</text>
      <text x="700" y="180" textAnchor="middle" fontSize="10" fill="#64748b">输出层</text>

      {/* 底部对比 */}
      <rect x="40" y="270" width="720" height="90" rx="10" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5" />
      <text x="60" y="296" fontSize="13" fontWeight="700" fill="#334155">关键区别</text>
      <text x="60" y="318" fontSize="12" fill="#475569">感知机：单层、线性、只能分类线性可分数据（如 AND/OR）</text>
      <text x="60" y="338" fontSize="12" fill="#475569">MLP：多层 + 非线性激活函数，万能逼近定理保证可拟合任意连续函数（如 XOR）</text>
    </svg>
  );
}
