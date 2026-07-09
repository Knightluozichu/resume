"use client";

export function DlsNeuralNetworkDiagram() {
  return (
    <svg viewBox="0 0 800 520" className="w-full h-auto" role="img" aria-label="神经网络结构与前向传播">
      <defs>
        <linearGradient id="dls-nn-input" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="dls-nn-hidden" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="dls-nn-output" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <linearGradient id="dls-nn-act" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <marker id="dls-nn-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="36" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">三层神经网络的前向传播</text>

      {/* 输入层 */}
      <text x="120" y="72" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">输入层</text>
      <circle cx="120" cy="120" r="22" fill="url(#dls-nn-input)" opacity="0.9" />
      <text x="120" y="124" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">x1</text>
      <circle cx="120" cy="200" r="22" fill="url(#dls-nn-input)" opacity="0.9" />
      <text x="120" y="204" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">x2</text>
      <circle cx="120" cy="280" r="22" fill="url(#dls-nn-input)" opacity="0.9" />
      <text x="120" y="284" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">x3</text>

      {/* 隐藏层 */}
      <text x="380" y="72" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">隐藏层（激活函数 h()）</text>
      <circle cx="380" cy="100" r="22" fill="url(#dls-nn-hidden)" opacity="0.9" />
      <text x="380" y="104" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">h1</text>
      <circle cx="380" cy="180" r="22" fill="url(#dls-nn-hidden)" opacity="0.9" />
      <text x="380" y="184" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">h2</text>
      <circle cx="380" cy="260" r="22" fill="url(#dls-nn-hidden)" opacity="0.9" />
      <text x="380" y="264" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">h3</text>
      <circle cx="380" cy="340" r="22" fill="url(#dls-nn-hidden)" opacity="0.9" />
      <text x="380" y="344" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">h4</text>

      {/* 输出层 */}
      <text x="640" y="72" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">输出层（softmax）</text>
      <circle cx="640" cy="160" r="22" fill="url(#dls-nn-output)" opacity="0.9" />
      <text x="640" y="164" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">y1</text>
      <circle cx="640" cy="260" r="22" fill="url(#dls-nn-output)" opacity="0.9" />
      <text x="640" y="264" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">y2</text>

      {/* 连接线 */}
      <g stroke="#64748b" strokeWidth="1" opacity="0.5">
        <line x1="142" y1="120" x2="358" y2="100" />
        <line x1="142" y1="120" x2="358" y2="180" />
        <line x1="142" y1="120" x2="358" y2="260" />
        <line x1="142" y1="120" x2="358" y2="340" />
        <line x1="142" y1="200" x2="358" y2="100" />
        <line x1="142" y1="200" x2="358" y2="180" />
        <line x1="142" y1="200" x2="358" y2="260" />
        <line x1="142" y1="200" x2="358" y2="340" />
        <line x1="142" y1="280" x2="358" y2="100" />
        <line x1="142" y1="280" x2="358" y2="180" />
        <line x1="142" y1="280" x2="358" y2="260" />
        <line x1="142" y1="280" x2="358" y2="340" />
        <line x1="402" y1="100" x2="618" y2="160" />
        <line x1="402" y1="180" x2="618" y2="160" />
        <line x1="402" y1="260" x2="618" y2="160" />
        <line x1="402" y1="340" x2="618" y2="160" />
        <line x1="402" y1="100" x2="618" y2="260" />
        <line x1="402" y1="180" x2="618" y2="260" />
        <line x1="402" y1="260" x2="618" y2="260" />
        <line x1="402" y1="340" x2="618" y2="260" />
      </g>

      {/* 公式标注 */}
      <rect x="40" y="400" width="340" height="46" rx="8" fill="url(#dls-nn-act)" opacity="0.1" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="210" y="420" textAnchor="middle" fontSize="11" fontWeight="600" fill="#92400e">隐藏层：a = h(W1·x + b1)</text>
      <text x="210" y="438" textAnchor="middle" fontSize="10" fill="#475569">激活函数引入非线性（sigmoid / ReLU）</text>

      <rect x="420" y="400" width="340" height="46" rx="8" fill="url(#dls-nn-output)" opacity="0.1" stroke="#059669" strokeWidth="1.5" />
      <text x="590" y="420" textAnchor="middle" fontSize="11" fontWeight="600" fill="#065f46">输出层：y = softmax(W2·a + b2)</text>
      <text x="590" y="438" textAnchor="middle" fontSize="10" fill="#475569">softmax 将输出转为概率分布</text>

      <rect x="40" y="460" width="720" height="46" rx="8" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="400" y="488" textAnchor="middle" fontSize="11" fill="#475569">矩阵形式：a(1)=h(X·W1+B1) → a(2)=softmax(a(1)·W2+B2)，全书用 NumPy 矩阵乘法实现</text>
    </svg>
  );
}
