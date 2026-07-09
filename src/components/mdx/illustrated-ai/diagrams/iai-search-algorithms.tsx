"use client";

export function IaiSearchAlgorithmsDiagram() {
  return (
    <svg viewBox="0 0 800 560" className="w-full h-auto" role="img" aria-label="搜索与优化算法分类图">
      <defs>
        <linearGradient id="iai-sa-uninformed" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="iai-sa-informed" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="iai-sa-game" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="iai-sa-opt" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <marker id="iai-sa-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">搜索与优化：AI 的决策骨架</text>

      {/* 根节点 */}
      <rect x="300" y="56" width="200" height="44" rx="10" fill="#0f172a" opacity="0.9" />
      <text x="400" y="84" textAnchor="middle" fontSize="15" fontWeight="700" fill="#fff">搜索算法</text>

      <path d="M400 100 L400 116" stroke="#64748b" strokeWidth="2" />

      {/* 四大类 */}
      <line x1="160" y1="116" x2="640" y2="116" stroke="#64748b" strokeWidth="2" />
      <path d="M160 116 L160 130" stroke="#64748b" strokeWidth="2" markerEnd="url(#iai-sa-arrow)" />
      <path d="M320 116 L320 130" stroke="#64748b" strokeWidth="2" markerEnd="url(#iai-sa-arrow)" />
      <path d="M480 116 L480 130" stroke="#64748b" strokeWidth="2" markerEnd="url(#iai-sa-arrow)" />
      <path d="M640 116 L640 130" stroke="#64748b" strokeWidth="2" markerEnd="url(#iai-sa-arrow)" />

      {/* 无信息搜索 */}
      <rect x="60" y="132" width="200" height="40" rx="8" fill="url(#iai-sa-uninformed)" opacity="0.9" />
      <text x="160" y="158" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">无信息搜索</text>

      <rect x="60" y="184" width="200" height="28" rx="6" fill="url(#iai-sa-uninformed)" opacity="0.1" stroke="#2563eb" strokeWidth="1" />
      <text x="160" y="202" textAnchor="middle" fontSize="11" fill="#1e40af">BFS 广度优先</text>

      <rect x="60" y="218" width="200" height="28" rx="6" fill="url(#iai-sa-uninformed)" opacity="0.1" stroke="#2563eb" strokeWidth="1" />
      <text x="160" y="236" textAnchor="middle" fontSize="11" fill="#1e40af">DFS 深度优先</text>

      <rect x="60" y="252" width="200" height="28" rx="6" fill="url(#iai-sa-uninformed)" opacity="0.1" stroke="#2563eb" strokeWidth="1" />
      <text x="160" y="270" textAnchor="middle" fontSize="11" fill="#1e40af">UCS 一致代价</text>

      <rect x="60" y="286" width="200" height="28" rx="6" fill="url(#iai-sa-uninformed)" opacity="0.1" stroke="#2563eb" strokeWidth="1" />
      <text x="160" y="304" textAnchor="middle" fontSize="11" fill="#1e40af">IDS 迭代加深</text>

      {/* 有信息搜索 */}
      <rect x="220" y="132" width="200" height="40" rx="8" fill="url(#iai-sa-informed)" opacity="0.9" />
      <text x="320" y="158" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">有信息搜索</text>

      <rect x="220" y="184" width="200" height="28" rx="6" fill="url(#iai-sa-informed)" opacity="0.1" stroke="#7c3aed" strokeWidth="1" />
      <text x="320" y="202" textAnchor="middle" fontSize="11" fill="#5b21b6">A* 算法</text>

      <rect x="220" y="218" width="200" height="28" rx="6" fill="url(#iai-sa-informed)" opacity="0.1" stroke="#7c3aed" strokeWidth="1" />
      <text x="320" y="236" textAnchor="middle" fontSize="11" fill="#5b21b6">贪心最佳优先</text>

      <rect x="220" y="252" width="200" height="28" rx="6" fill="url(#iai-sa-informed)" opacity="0.1" stroke="#7c3aed" strokeWidth="1" />
      <text x="320" y="270" textAnchor="middle" fontSize="11" fill="#5b21b6">IDA* 迭代加深 A*</text>

      <rect x="220" y="286" width="200" height="28" rx="6" fill="url(#iai-sa-informed)" opacity="0.1" stroke="#7c3aed" strokeWidth="1" />
      <text x="320" y="304" textAnchor="middle" fontSize="11" fill="#5b21b6">h(n) 启发函数</text>

      {/* 博弈搜索 */}
      <rect x="380" y="132" width="200" height="40" rx="8" fill="url(#iai-sa-game)" opacity="0.9" />
      <text x="480" y="158" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">博弈搜索</text>

      <rect x="380" y="184" width="200" height="28" rx="6" fill="url(#iai-sa-game)" opacity="0.1" stroke="#f59e0b" strokeWidth="1" />
      <text x="480" y="202" textAnchor="middle" fontSize="11" fill="#92400e">Minimax 极小化极大</text>

      <rect x="380" y="218" width="200" height="28" rx="6" fill="url(#iai-sa-game)" opacity="0.1" stroke="#f59e0b" strokeWidth="1" />
      <text x="480" y="236" textAnchor="middle" fontSize="11" fill="#92400e">Alpha-Beta 剪枝</text>

      <rect x="380" y="252" width="200" height="28" rx="6" fill="url(#iai-sa-game)" opacity="0.1" stroke="#f59e0b" strokeWidth="1" />
      <text x="480" y="270" textAnchor="middle" fontSize="11" fill="#92400e">Monte Carlo 树搜索</text>

      <rect x="380" y="286" width="200" height="28" rx="6" fill="url(#iai-sa-game)" opacity="0.1" stroke="#f59e0b" strokeWidth="1" />
      <text x="480" y="304" textAnchor="middle" fontSize="11" fill="#92400e">期望最大化</text>

      {/* 优化算法 */}
      <rect x="540" y="132" width="200" height="40" rx="8" fill="url(#iai-sa-opt)" opacity="0.9" />
      <text x="640" y="158" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">优化算法</text>

      <rect x="540" y="184" width="200" height="28" rx="6" fill="url(#iai-sa-opt)" opacity="0.1" stroke="#059669" strokeWidth="1" />
      <text x="640" y="202" textAnchor="middle" fontSize="11" fill="#065f46">梯度下降</text>

      <rect x="540" y="218" width="200" height="28" rx="6" fill="url(#iai-sa-opt)" opacity="0.1" stroke="#059669" strokeWidth="1" />
      <text x="640" y="236" textAnchor="middle" fontSize="11" fill="#065f46">遗传算法</text>

      <rect x="540" y="252" width="200" height="28" rx="6" fill="url(#iai-sa-opt)" opacity="0.1" stroke="#059669" strokeWidth="1" />
      <text x="640" y="270" textAnchor="middle" fontSize="11" fill="#065f46">模拟退火</text>

      <rect x="540" y="286" width="200" height="28" rx="6" fill="url(#iai-sa-opt)" opacity="0.1" stroke="#059669" strokeWidth="1" />
      <text x="640" y="304" textAnchor="middle" fontSize="11" fill="#065f46">爬山法</text>

      {/* A* 算法公式 */}
      <rect x="60" y="340" width="680" height="70" rx="10" fill="#faf5ff" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="80" y="364" fontSize="13" fontWeight="700" fill="#5b21b6">A* 评估函数</text>
      <text x="80" y="386" fontSize="12" fill="#475569">f(n) = g(n) + h(n)</text>
      <text x="280" y="386" fontSize="11" fill="#64748b">g(n) = 起点到 n 的实际代价</text>
      <text x="280" y="402" fontSize="11" fill="#64748b">h(n) = n 到目标的启发估计（需可采纳）</text>

      {/* 底部对比 */}
      <rect x="60" y="430" width="680" height="100" rx="10" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="80" y="454" fontSize="13" fontWeight="700" fill="#0f172a">搜索策略对比</text>
      <text x="80" y="476" fontSize="11" fill="#475569">BFS：完备且最优，但空间复杂度 O(b^d)，适合浅层解</text>
      <text x="80" y="494" fontSize="11" fill="#475569">DFS：空间 O(bd)，但不完备且非最优，适合深层解</text>
      <text x="80" y="512" fontSize="11" fill="#475569">A*：最优且完备（h 可采纳），但空间仍为指数级</text>
    </svg>
  );
}
