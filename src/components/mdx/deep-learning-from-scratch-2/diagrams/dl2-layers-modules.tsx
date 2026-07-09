"use client";

export function Dl2LayersModulesDiagram() {
  return (
    <svg viewBox="0 0 800 480" className="w-full h-auto" role="img" aria-label="Layer模块化与参数收集机制">
      <defs>
        <linearGradient id="dl2-ly-model" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <linearGradient id="dl2-ly-layer" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="dl2-ly-param" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <marker id="dl2-ly-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
        <marker id="dl2-ly-collect" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#dc2626" />
        </marker>
      </defs>

      <text x="400" y="32" textAnchor="middle" fontSize="18" fontWeight="700" fill="#0f172a">Layer 模块化：参数自动收集与递归</text>

      {/* 网络结构 */}
      <rect x="280" y="60" width="240" height="44" rx="10" fill="url(#dl2-ly-model)" opacity="0.92" />
      <text x="400" y="88" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">TwoLayerNet (Model)</text>

      <path d="M340 104 L340 120 L160 120 L160 136" stroke="#64748b" strokeWidth="2" fill="none" markerEnd="url(#dl2-ly-arrow)" />
      <path d="M360 104 L360 120 L400 120 L400 136" stroke="#64748b" strokeWidth="2" fill="none" markerEnd="url(#dl2-ly-arrow)" />
      <path d="M380 104 L380 120 L640 120 L640 136" stroke="#64748b" strokeWidth="2" fill="none" markerEnd="url(#dl2-ly-arrow)" />

      {/* 三个子层 */}
      <rect x="60" y="136" width="200" height="44" rx="10" fill="url(#dl2-ly-layer)" opacity="0.85" />
      <text x="160" y="164" textAnchor="middle" fontSize="13" fontWeight="600" fill="#fff">fc1: Linear(100)</text>

      <rect x="300" y="136" width="200" height="44" rx="10" fill="url(#dl2-ly-layer)" opacity="0.7" />
      <text x="400" y="164" textAnchor="middle" fontSize="13" fontWeight="600" fill="#fff">activate: Sigmoid</text>

      <rect x="540" y="136" width="200" height="44" rx="10" fill="url(#dl2-ly-layer)" opacity="0.85" />
      <text x="640" y="164" textAnchor="middle" fontSize="13" fontWeight="600" fill="#fff">fc2: Linear(10)</text>

      {/* 参数 */}
      <path d="M120 180 L120 200" stroke="#64748b" strokeWidth="2" markerEnd="url(#dl2-ly-arrow)" />
      <path d="M200 180 L200 200" stroke="#64748b" strokeWidth="2" markerEnd="url(#dl2-ly-arrow)" />
      <path d="M600 180 L600 200" stroke="#64748b" strokeWidth="2" markerEnd="url(#dl2-ly-arrow)" />
      <path d="M680 180 L680 200" stroke="#64748b" strokeWidth="2" markerEnd="url(#dl2-ly-arrow)" />

      <rect x="70" y="200" width="100" height="36" rx="6" fill="url(#dl2-ly-param)" opacity="0.2" stroke="#2563eb" strokeWidth="1.5" />
      <text x="120" y="222" textAnchor="middle" fontSize="11" fill="#1e40af">W (784,100)</text>

      <rect x="150" y="200" width="100" height="36" rx="6" fill="url(#dl2-ly-param)" opacity="0.2" stroke="#2563eb" strokeWidth="1.5" />
      <text x="200" y="222" textAnchor="middle" fontSize="11" fill="#1e40af">b (100,)</text>

      <text x="400" y="222" textAnchor="middle" fontSize="11" fill="#64748b">（无参数）</text>

      <rect x="550" y="200" width="100" height="36" rx="6" fill="url(#dl2-ly-param)" opacity="0.2" stroke="#2563eb" strokeWidth="1.5" />
      <text x="600" y="222" textAnchor="middle" fontSize="11" fill="#1e40af">W (100,10)</text>

      <rect x="630" y="200" width="100" height="36" rx="6" fill="url(#dl2-ly-param)" opacity="0.2" stroke="#2563eb" strokeWidth="1.5" />
      <text x="680" y="222" textAnchor="middle" fontSize="11" fill="#1e40af">b (10,)</text>

      {/* 参数收集（红色虚线） */}
      <path d="M120 236 L120 260 L400 260 L400 290" stroke="#dc2626" strokeWidth="2" strokeDasharray="5,3" fill="none" markerEnd="url(#dl2-ly-collect)" />
      <path d="M200 236 L200 255 L400 255 L400 290" stroke="#dc2626" strokeWidth="2" strokeDasharray="5,3" fill="none" />
      <path d="M600 236 L600 260 L400 260 L400 290" stroke="#dc2626" strokeWidth="2" strokeDasharray="5,3" fill="none" />
      <path d="M680 236 L680 255 L400 255 L400 290" stroke="#dc2626" strokeWidth="2" strokeDasharray="5,3" fill="none" />

      <text x="430" y="278" fontSize="11" fill="#dc2626" fontWeight="600">params() 递归收集</text>

      {/* Optimizer */}
      <rect x="280" y="290" width="240" height="44" rx="10" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2" />
      <text x="400" y="318" textAnchor="middle" fontSize="13" fontWeight="700" fill="#92400e">Optimizer.update()</text>

      {/* 底部说明 */}
      <rect x="40" y="360" width="360" height="90" rx="10" fill="#eff6ff" stroke="#2563eb" strokeWidth="1.5" />
      <text x="220" y="384" textAnchor="middle" fontSize="13" fontWeight="700" fill="#1e40af">__setattr__ 自动收集</text>
      <text x="220" y="406" fontSize="11" fill="#475569">self.W = Parameter(...) 时</text>
      <text x="220" y="424" fontSize="11" fill="#475569">自动检测类型，加入 _params</text>
      <text x="220" y="442" fontSize="11" fill="#475569">用户无需手动声明参数列表</text>

      <rect x="420" y="360" width="340" height="90" rx="10" fill="#faf5ff" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="590" y="384" textAnchor="middle" fontSize="13" fontWeight="700" fill="#5b21b6">Layer vs Function</text>
      <text x="590" y="406" fontSize="11" fill="#475569">Function：底层运算（无参数）</text>
      <text x="590" y="424" fontSize="11" fill="#475569">Layer：高层模块（管理参数）</text>
      <text x="590" y="442" fontSize="11" fill="#475569">Layer 内部用 Function 实现前向</text>
    </svg>
  );
}
