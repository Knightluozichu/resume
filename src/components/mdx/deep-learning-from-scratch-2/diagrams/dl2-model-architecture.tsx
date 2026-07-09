"use client";

export function Dl2ModelArchitectureDiagram() {
  return (
    <svg viewBox="0 0 800 480" className="w-full h-auto" role="img" aria-label="Model架构设计与参数管理链路">
      <defs>
        <linearGradient id="dl2-ma-define" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="dl2-ma-collect" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="dl2-ma-update" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <marker id="dl2-ma-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="32" textAnchor="middle" fontSize="18" fontWeight="700" fill="#0f172a">参数管理完整链路：定义 → 收集 → 更新</text>

      {/* 定义阶段 */}
      <rect x="40" y="64" width="220" height="140" rx="10" fill="url(#dl2-ma-define)" opacity="0.08" stroke="#2563eb" strokeWidth="1.5" />
      <rect x="40" y="64" width="220" height="32" rx="10" fill="url(#dl2-ma-define)" opacity="0.92" />
      <text x="150" y="86" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">1. 定义参数</text>
      <text x="60" y="116" fontSize="10" fill="#475569">Linear.__init__:</text>
      <text x="60" y="134" fontSize="10" fill="#1e40af">self.W = Parameter(...)</text>
      <text x="60" y="152" fontSize="10" fill="#1e40af">self.b = Parameter(...)</text>
      <text x="60" y="176" fontSize="10" fill="#64748b">__setattr__ 自动检测</text>
      <text x="60" y="192" fontSize="10" fill="#64748b">加入 _params 集合</text>

      <path d="M260 134 L300 134" stroke="#64748b" strokeWidth="2" markerEnd="url(#dl2-ma-arrow)" />

      {/* 收集阶段 */}
      <rect x="300" y="64" width="220" height="140" rx="10" fill="url(#dl2-ma-collect)" opacity="0.08" stroke="#7c3aed" strokeWidth="1.5" />
      <rect x="300" y="64" width="220" height="32" rx="10" fill="url(#dl2-ma-collect)" opacity="0.92" />
      <text x="410" y="86" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">2. 收集参数</text>
      <text x="320" y="116" fontSize="10" fill="#475569">optimizer.setup(model)</text>
      <text x="320" y="134" fontSize="10" fill="#5b21b6">model.params()</text>
      <text x="320" y="152" fontSize="10" fill="#64748b">递归遍历子层</text>
      <text x="320" y="170" fontSize="10" fill="#64748b">yield Parameter</text>
      <text x="320" y="192" fontSize="10" fill="#64748b">无限嵌套支持</text>

      <path d="M520 134 L560 134" stroke="#64748b" strokeWidth="2" markerEnd="url(#dl2-ma-arrow)" />

      {/* 更新阶段 */}
      <rect x="560" y="64" width="200" height="140" rx="10" fill="url(#dl2-ma-update)" opacity="0.08" stroke="#f59e0b" strokeWidth="1.5" />
      <rect x="560" y="64" width="200" height="32" rx="10" fill="url(#dl2-ma-update)" opacity="0.92" />
      <text x="660" y="86" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">3. 更新参数</text>
      <text x="580" y="116" fontSize="10" fill="#475569">optimizer.update()</text>
      <text x="580" y="134" fontSize="10" fill="#92400e">param.data -= lr*grad</text>
      <text x="580" y="158" fontSize="10" fill="#64748b">逐个参数更新</text>
      <text x="580" y="176" fontSize="10" fill="#64748b">SGD/Momentum/Adam</text>
      <text x="580" y="194" fontSize="10" fill="#64748b">cleargrads() 清零</text>

      {/* 网络组合 */}
      <rect x="40" y="240" width="720" height="100" rx="10" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="400" y="264" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">网络组合模式</text>

      <rect x="70" y="280" width="300" height="44" rx="8" fill="#eff6ff" stroke="#2563eb" strokeWidth="1" />
      <text x="220" y="298" textAnchor="middle" fontSize="11" fontWeight="600" fill="#1e40af">顺序组合</text>
      <text x="220" y="314" textAnchor="middle" fontSize="10" fill="#475569">fc1 → activate → fc2 → activate → ...</text>

      <rect x="430" y="280" width="300" height="44" rx="8" fill="#faf5ff" stroke="#7c3aed" strokeWidth="1" />
      <text x="580" y="298" textAnchor="middle" fontSize="11" fontWeight="600" fill="#5b21b6">嵌套组合</text>
      <text x="580" y="314" textAnchor="middle" fontSize="10" fill="#475569">BigNet → Block1 → Block2 → Head</text>

      {/* 生命周期 */}
      <rect x="40" y="360" width="720" height="96" rx="10" fill="#f0fdf4" stroke="#059669" strokeWidth="1.5" />
      <text x="400" y="384" textAnchor="middle" fontSize="13" fontWeight="700" fill="#065f46">Model 生命周期</text>
      <text x="400" y="406" textAnchor="middle" fontSize="10" fill="#475569">定义 model = MLP(...) → 绑定 optimizer.setup(model)</text>
      <text x="400" y="424" textAnchor="middle" fontSize="10" fill="#475569">→ 训练循环(前向→损失→cleargrads→backward→update) → 评估 accuracy()</text>
      <text x="400" y="442" textAnchor="middle" fontSize="10" fill="#64748b">一切皆 Layer：Model 继承 Layer，统一抽象</text>
    </svg>
  );
}
