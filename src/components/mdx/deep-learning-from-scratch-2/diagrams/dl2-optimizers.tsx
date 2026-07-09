"use client";

export function Dl2OptimizersDiagram() {
  return (
    <svg viewBox="0 0 800 460" className="w-full h-auto" role="img" aria-label="SGD Momentum Adam 三种优化器对比">
      <defs>
        <linearGradient id="dl2-op-sgd" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="dl2-op-mom" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="dl2-op-adam" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <marker id="dl2-op-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="32" textAnchor="middle" fontSize="18" fontWeight="700" fill="#0f172a">三种优化器对比</text>

      {/* SGD */}
      <rect x="40" y="60" width="220" height="200" rx="10" fill="url(#dl2-op-sgd)" opacity="0.08" stroke="#2563eb" strokeWidth="1.5" />
      <rect x="40" y="60" width="220" height="36" rx="10" fill="url(#dl2-op-sgd)" opacity="0.92" />
      <text x="150" y="84" textAnchor="middle" fontSize="15" fontWeight="700" fill="#fff">SGD</text>
      <text x="150" y="118" textAnchor="middle" fontSize="11" fill="#1e40af" fontWeight="600">随机梯度下降</text>
      <text x="150" y="142" textAnchor="middle" fontSize="11" fill="#475569">W ← W - lr × grad</text>
      <text x="150" y="170" textAnchor="middle" fontSize="10" fill="#475569">优点：简单、稳定</text>
      <text x="150" y="188" textAnchor="middle" fontSize="10" fill="#475569">缺点：震荡、收敛慢</text>
      <text x="150" y="216" textAnchor="middle" fontSize="10" fill="#475569">超参数：lr</text>
      <text x="150" y="240" textAnchor="middle" fontSize="10" fill="#475569">适合：简单任务、</text>
      <text x="150" y="254" textAnchor="middle" fontSize="10" fill="#475569">精细调参</text>

      {/* Momentum */}
      <rect x="290" y="60" width="220" height="200" rx="10" fill="url(#dl2-op-mom)" opacity="0.08" stroke="#7c3aed" strokeWidth="1.5" />
      <rect x="290" y="60" width="220" height="36" rx="10" fill="url(#dl2-op-mom)" opacity="0.92" />
      <text x="400" y="84" textAnchor="middle" fontSize="15" fontWeight="700" fill="#fff">Momentum</text>
      <text x="400" y="118" textAnchor="middle" fontSize="11" fill="#5b21b6" fontWeight="600">动量法</text>
      <text x="400" y="142" textAnchor="middle" fontSize="11" fill="#475569">v ← m×v - lr×grad</text>
      <text x="400" y="158" textAnchor="middle" fontSize="11" fill="#475569">W ← W + v</text>
      <text x="400" y="186" textAnchor="middle" fontSize="10" fill="#475569">优点：抵消震荡、加速</text>
      <text x="400" y="204" textAnchor="middle" fontSize="10" fill="#475569">缺点：需调 momentum</text>
      <text x="400" y="232" textAnchor="middle" fontSize="10" fill="#475569">超参数：lr, momentum</text>
      <text x="400" y="254" textAnchor="middle" fontSize="10" fill="#475569">适合：病态曲率</text>

      {/* Adam */}
      <rect x="540" y="60" width="220" height="200" rx="10" fill="url(#dl2-op-adam)" opacity="0.08" stroke="#f59e0b" strokeWidth="1.5" />
      <rect x="540" y="60" width="220" height="36" rx="10" fill="url(#dl2-op-adam)" opacity="0.92" />
      <text x="650" y="84" textAnchor="middle" fontSize="15" fontWeight="700" fill="#fff">Adam</text>
      <text x="650" y="118" textAnchor="middle" fontSize="11" fill="#92400e" fontWeight="600">自适应矩估计</text>
      <text x="650" y="142" textAnchor="middle" fontSize="10" fill="#475569">m←β1×m+(1-β1)×g</text>
      <text x="650" y="158" textAnchor="middle" fontSize="10" fill="#475569">v←β2×v+(1-β2)×g²</text>
      <text x="650" y="174" textAnchor="middle" fontSize="10" fill="#475569">W←W-α×m̂/(√v̂+ε)</text>
      <text x="650" y="202" textAnchor="middle" fontSize="10" fill="#475569">优点：收敛快、少调参</text>
      <text x="650" y="220" textAnchor="middle" fontSize="10" fill="#475569">缺点：内存占用大</text>
      <text x="650" y="248" textAnchor="middle" fontSize="10" fill="#475569">超参数：α,β1,β2</text>
      <text x="650" y="254" textAnchor="middle" fontSize="10" fill="#475569"></text>

      {/* 训练流程 */}
      <rect x="40" y="290" width="720" height="120" rx="10" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="400" y="314" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">优化器在训练循环中的角色</text>

      <rect x="70" y="330" width="110" height="32" rx="6" fill="#eff6ff" stroke="#2563eb" strokeWidth="1" />
      <text x="125" y="350" textAnchor="middle" fontSize="10" fill="#1e40af">loss.backward()</text>

      <path d="M180 346 L210 346" stroke="#64748b" strokeWidth="2" markerEnd="url(#dl2-op-arrow)" />

      <rect x="210" y="330" width="130" height="32" rx="6" fill="#faf5ff" stroke="#7c3aed" strokeWidth="1" />
      <text x="275" y="350" textAnchor="middle" fontSize="10" fill="#5b21b6">model.cleargrads()</text>

      <path d="M340 346 L370 346" stroke="#64748b" strokeWidth="2" markerEnd="url(#dl2-op-arrow)" />

      <rect x="370" y="330" width="110" height="32" rx="6" fill="#eff6ff" stroke="#2563eb" strokeWidth="1" />
      <text x="425" y="350" textAnchor="middle" fontSize="10" fill="#1e40af">loss.backward()</text>

      <path d="M480 346 L510 346" stroke="#64748b" strokeWidth="2" markerEnd="url(#dl2-op-arrow)" />

      <rect x="510" y="330" width="130" height="32" rx="6" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1" />
      <text x="575" y="350" textAnchor="middle" fontSize="10" fill="#92400e">optimizer.update()</text>

      <path d="M640 346 L670 346" stroke="#64748b" strokeWidth="2" markerEnd="url(#dl2-op-arrow)" />

      <rect x="670" y="330" width="80" height="32" rx="6" fill="#f0fdf4" stroke="#059669" strokeWidth="1" />
      <text x="710" y="350" textAnchor="middle" fontSize="10" fill="#065f46">下一轮</text>

      <text x="400" y="390" textAnchor="middle" fontSize="11" fill="#64748b">优化器接收梯度，按策略更新参数（SGD/Momentum/Adam）</text>
    </svg>
  );
}
