"use client";

export function IdlForwardPropagationDiagram() {
  return (
    <svg viewBox="0 0 800 500" className="w-full h-auto" role="img" aria-label="前向传播计算流程与激活函数对比">
      <defs>
        <linearGradient id="idl-fp-layer" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="idl-fp-act" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <marker id="idl-fp-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="30" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">前向传播计算流程</text>

      {/* 上半部分：前向传播流程 */}
      <text x="400" y="62" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">两层网络的前向传播</text>

      {/* 输入 */}
      <rect x="30" y="80" width="90" height="50" rx="8" fill="#dbeafe" stroke="#2563eb" strokeWidth="2" />
      <text x="75" y="102" textAnchor="middle" fontSize="12" fontWeight="600" fill="#1e40af">输入 x</text>
      <text x="75" y="120" textAnchor="middle" fontSize="10" fill="#475569">[x1, x2, x3]</text>

      <line x1="120" y1="105" x2="160" y2="105" stroke="#64748b" strokeWidth="2" markerEnd="url(#idl-fp-arrow)" />

      {/* 隐藏层线性 */}
      <rect x="160" y="80" width="120" height="50" rx="8" fill="url(#idl-fp-layer)" opacity="0.15" stroke="#2563eb" strokeWidth="2" />
      <text x="220" y="100" textAnchor="middle" fontSize="12" fontWeight="600" fill="#1e40af">z1 = W1*x + b1</text>
      <text x="220" y="118" textAnchor="middle" fontSize="10" fill="#475569">线性变换</text>

      <line x1="280" y1="105" x2="320" y2="105" stroke="#64748b" strokeWidth="2" markerEnd="url(#idl-fp-arrow)" />

      {/* 隐藏层激活 */}
      <rect x="320" y="80" width="120" height="50" rx="8" fill="url(#idl-fp-act)" opacity="0.15" stroke="#7c3aed" strokeWidth="2" />
      <text x="380" y="100" textAnchor="middle" fontSize="12" fontWeight="600" fill="#5b21b6">a1 = ReLU(z1)</text>
      <text x="380" y="118" textAnchor="middle" fontSize="10" fill="#475569">激活函数</text>

      <line x1="440" y1="105" x2="480" y2="105" stroke="#64748b" strokeWidth="2" markerEnd="url(#idl-fp-arrow)" />

      {/* 输出层线性 */}
      <rect x="480" y="80" width="120" height="50" rx="8" fill="url(#idl-fp-layer)" opacity="0.15" stroke="#2563eb" strokeWidth="2" />
      <text x="540" y="100" textAnchor="middle" fontSize="12" fontWeight="600" fill="#1e40af">z2 = W2*a1 + b2</text>
      <text x="540" y="118" textAnchor="middle" fontSize="10" fill="#475569">线性变换</text>

      <line x1="600" y1="105" x2="640" y2="105" stroke="#64748b" strokeWidth="2" markerEnd="url(#idl-fp-arrow)" />

      {/* 输出激活 */}
      <rect x="640" y="80" width="120" height="50" rx="8" fill="url(#idl-fp-act)" opacity="0.15" stroke="#7c3aed" strokeWidth="2" />
      <text x="700" y="100" textAnchor="middle" fontSize="12" fontWeight="600" fill="#5b21b6">a2 = softmax(z2)</text>
      <text x="700" y="118" textAnchor="middle" fontSize="10" fill="#475569">输出概率</text>

      {/* 下半部分：激活函数对比 */}
      <text x="400" y="180" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">常用激活函数对比</text>

      {/* Sigmoid 曲线区域 */}
      <rect x="40" y="200" width="220" height="140" rx="8" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5" />
      <text x="150" y="222" textAnchor="middle" fontSize="13" fontWeight="700" fill="#2563eb">Sigmoid</text>
      <text x="150" y="240" textAnchor="middle" fontSize="10" fill="#64748b">1 / (1 + e^(-z))</text>
      <path d="M70 320 Q120 320 150 270 Q180 220 230 220" fill="none" stroke="#2563eb" strokeWidth="2.5" />
      <line x1="60" y1="270" x2="240" y2="270" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="4 3" />
      <text x="150" y="335" textAnchor="middle" fontSize="10" fill="#dc2626">饱和区梯度消失</text>

      {/* Tanh 曲线区域 */}
      <rect x="290" y="200" width="220" height="140" rx="8" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5" />
      <text x="400" y="222" textAnchor="middle" fontSize="13" fontWeight="700" fill="#7c3aed">Tanh</text>
      <text x="400" y="240" textAnchor="middle" fontSize="10" fill="#64748b">(e^z - e^(-z)) / (e^z + e^(-z))</text>
      <path d="M320 220 Q370 220 400 270 Q430 320 480 320" fill="none" stroke="#7c3aed" strokeWidth="2.5" />
      <line x1="310" y1="270" x2="490" y2="270" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="4 3" />
      <text x="400" y="335" textAnchor="middle" fontSize="10" fill="#7c3aed">零中心化，比 Sigmoid 好</text>

      {/* ReLU 曲线区域 */}
      <rect x="540" y="200" width="220" height="140" rx="8" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5" />
      <text x="650" y="222" textAnchor="middle" fontSize="13" fontWeight="700" fill="#f59e0b">ReLU</text>
      <text x="650" y="240" textAnchor="middle" fontSize="10" fill="#64748b">max(0, z)</text>
      <line x1="570" y1="320" x2="650" y2="270" stroke="#f59e0b" strokeWidth="2.5" />
      <line x1="650" y1="270" x2="740" y2="220" stroke="#f59e0b" strokeWidth="2.5" />
      <line x1="560" y1="270" x2="740" y2="270" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="4 3" />
      <text x="650" y="335" textAnchor="middle" fontSize="10" fill="#92400e">正区间梯度恒为 1</text>

      {/* 底部说明 */}
      <rect x="40" y="360" width="720" height="60" rx="8" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" opacity="0.5" />
      <text x="60" y="384" fontSize="12" fontWeight="600" fill="#92400e">激活函数的核心作用：引入非线性</text>
      <text x="60" y="404" fontSize="11" fill="#92400e">没有激活函数，多层线性变换叠加仍为线性（W2*(W1*x) = (W2*W1)*x），加隐藏层无意义</text>
    </svg>
  );
}
