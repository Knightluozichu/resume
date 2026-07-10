"use client";

export function MlwNeuralNetworksDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="神经网络与BP算法示意图">
      <defs>
        <linearGradient id="mlw-nn-blue" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="mlw-nn-purple" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="mlw-nn-green" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <linearGradient id="mlw-nn-amber" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <marker id="mlw-nn-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="32" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">神经网络：从感知机到 BP 算法</text>

      {/* 顶部：神经元结构 */}
      <text x="400" y="60" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">M-P 神经元模型</text>

      <rect x="300" y="70" width="200" height="36" rx="8" fill="url(#mlw-nn-blue)" opacity="0.95" />
      <text x="400" y="93" textAnchor="middle" fontSize="11" fontWeight="600" fill="#fff">y = f(Σ wi·xi - θ)</text>

      {/* 左侧：感知机 */}
      <text x="160" y="134" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">感知机</text>

      <rect x="40" y="144" width="240" height="40" rx="8" fill="url(#mlw-nn-blue)" opacity="0.12" stroke="#2563eb" strokeWidth="1.5" />
      <text x="160" y="169" textAnchor="middle" fontSize="11" fill="#1e40af">线性分类器：sign(w^T x + b)</text>

      <rect x="40" y="194" width="240" height="40" rx="8" fill="url(#mlw-nn-blue)" opacity="0.12" stroke="#2563eb" strokeWidth="1.5" />
      <text x="160" y="219" textAnchor="middle" fontSize="11" fill="#1e40af">权重更新：w ← w + η(y - ŷ)x</text>

      <rect x="40" y="244" width="240" height="40" rx="8" fill="url(#mlw-nn-blue)" opacity="0.12" stroke="#2563eb" strokeWidth="1.5" />
      <text x="160" y="269" textAnchor="middle" fontSize="11" fill="#1e40af">仅线性可分时收敛</text>

      {/* 中间：多层前馈网络 */}
      <text x="400" y="134" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">多层前馈网络</text>

      <circle cx="320" cy="160" r="14" fill="url(#mlw-nn-blue)" opacity="0.8" />
      <circle cx="320" cy="200" r="14" fill="url(#mlw-nn-blue)" opacity="0.8" />
      <circle cx="320" cy="240" r="14" fill="url(#mlw-nn-blue)" opacity="0.8" />

      <circle cx="400" cy="170" r="14" fill="url(#mlw-nn-purple)" opacity="0.8" />
      <circle cx="400" cy="210" r="14" fill="url(#mlw-nn-purple)" opacity="0.8" />
      <circle cx="400" cy="250" r="14" fill="url(#mlw-nn-purple)" opacity="0.8" />

      <circle cx="480" cy="180" r="14" fill="url(#mlw-nn-green)" opacity="0.8" />
      <circle cx="480" cy="230" r="14" fill="url(#mlw-nn-green)" opacity="0.8" />

      <line x1="334" y1="160" x2="386" y2="170" stroke="#94a3b8" strokeWidth="1" />
      <line x1="334" y1="160" x2="386" y2="210" stroke="#94a3b8" strokeWidth="1" />
      <line x1="334" y1="200" x2="386" y2="170" stroke="#94a3b8" strokeWidth="1" />
      <line x1="334" y1="200" x2="386" y2="210" stroke="#94a3b8" strokeWidth="1" />
      <line x1="334" y1="240" x2="386" y2="210" stroke="#94a3b8" strokeWidth="1" />
      <line x1="334" y1="240" x2="386" y2="250" stroke="#94a3b8" strokeWidth="1" />
      <line x1="414" y1="170" x2="466" y2="180" stroke="#94a3b8" strokeWidth="1" />
      <line x1="414" y1="170" x2="466" y2="230" stroke="#94a3b8" strokeWidth="1" />
      <line x1="414" y1="210" x2="466" y2="180" stroke="#94a3b8" strokeWidth="1" />
      <line x1="414" y1="210" x2="466" y2="230" stroke="#94a3b8" strokeWidth="1" />
      <line x1="414" y1="250" x2="466" y2="230" stroke="#94a3b8" strokeWidth="1" />

      <text x="320" y="285" textAnchor="middle" fontSize="10" fill="#1e40af">输入层</text>
      <text x="400" y="285" textAnchor="middle" fontSize="10" fill="#5b21b6">隐层</text>
      <text x="480" y="285" textAnchor="middle" fontSize="10" fill="#065f46">输出层</text>

      {/* 右侧：BP 算法核心 */}
      <text x="620" y="134" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">BP 误差逆传播</text>

      <rect x="520" y="144" width="200" height="40" rx="8" fill="url(#mlw-nn-amber)" opacity="0.12" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="620" y="169" textAnchor="middle" fontSize="10" fill="#92400e">前向：h = f(W1 x), y = f(W2 h)</text>

      <rect x="520" y="194" width="200" height="40" rx="8" fill="url(#mlw-nn-amber)" opacity="0.12" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="620" y="219" textAnchor="middle" fontSize="10" fill="#92400e">误差：E = 1/2 Σ(yj - ŷj)²</text>

      <rect x="520" y="244" width="200" height="40" rx="8" fill="url(#mlw-nn-amber)" opacity="0.12" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="620" y="269" textAnchor="middle" fontSize="10" fill="#92400e">链式法则反向求梯度</text>

      {/* 底部：激活函数对比 */}
      <text x="400" y="320" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">常见激活函数</text>

      <rect x="40" y="332" width="170" height="56" rx="8" fill="url(#mlw-nn-blue)" opacity="0.12" stroke="#2563eb" strokeWidth="1.5" />
      <text x="125" y="354" textAnchor="middle" fontSize="11" fontWeight="600" fill="#1e40af">Sigmoid</text>
      <text x="125" y="372" textAnchor="middle" fontSize="10" fill="#3b82f6">σ(z)=1/(1+e^&#123;-z&#125;)</text>

      <rect x="225" y="332" width="170" height="56" rx="8" fill="url(#mlw-nn-purple)" opacity="0.12" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="310" y="354" textAnchor="middle" fontSize="11" fontWeight="600" fill="#5b21b6">Tanh</text>
      <text x="310" y="372" textAnchor="middle" fontSize="10" fill="#8b5cf6">tanh(z)=(e^z-e^&#123;-z&#125;)/(e^z+e^&#123;-z&#125;)</text>

      <rect x="410" y="332" width="170" height="56" rx="8" fill="url(#mlw-nn-green)" opacity="0.12" stroke="#059669" strokeWidth="1.5" />
      <text x="495" y="354" textAnchor="middle" fontSize="11" fontWeight="600" fill="#065f46">ReLU</text>
      <text x="495" y="372" textAnchor="middle" fontSize="10" fill="#10b981">max(0, z)</text>

      <rect x="595" y="332" width="165" height="56" rx="8" fill="url(#mlw-nn-amber)" opacity="0.12" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="677" y="354" textAnchor="middle" fontSize="11" fontWeight="600" fill="#92400e">Leaky ReLU</text>
      <text x="677" y="372" textAnchor="middle" fontSize="10" fill="#d97706">max(αz, z)</text>

      {/* 底部：关键特性 */}
      <rect x="40" y="410" width="720" height="80" rx="10" fill="#f0fdf4" stroke="#86efac" strokeWidth="1.5" />
      <text x="400" y="433" textAnchor="middle" fontSize="13" fontWeight="700" fill="#166534">多层前馈网络关键特性</text>
      <text x="400" y="455" textAnchor="middle" fontSize="11" fill="#15803d">万能逼近定理：含一个隐层的前馈网络可逼近任意连续函数（足够多神经元）</text>
      <text x="400" y="473" textAnchor="middle" fontSize="11" fill="#15803d">隐层越多 → 表达能力越强，但训练越难（梯度消失/爆炸、局部最优）</text>

      {/* 底部说明 */}
      <rect x="40" y="508" width="720" height="48" rx="8" fill="#fffbeb" stroke="#fcd34d" strokeWidth="1.5" />
      <text x="400" y="528" textAnchor="middle" fontSize="11" fill="#92400e">BP 用梯度下降更新权重，核心是链式法则逐层传播误差信号</text>
      <text x="400" y="546" textAnchor="middle" fontSize="11" fill="#b45309">标准 BP 每次用一个样本，累积 BP 用整个数据集的累积误差</text>
    </svg>
  );
}
