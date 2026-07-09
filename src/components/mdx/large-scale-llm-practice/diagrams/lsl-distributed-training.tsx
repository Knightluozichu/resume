"use client";

export function LslDistributedTrainingDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="分布式训练 并行策略与显存优化">
      <defs>
        <linearGradient id="lsl-dt-blue" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="lsl-dt-purple" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="lsl-dt-amber" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="lsl-dt-green" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <linearGradient id="lsl-dt-red" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#dc2626" />
          <stop offset="100%" stopColor="#b91c1c" />
        </linearGradient>
        <marker id="lsl-dt-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">分布式训练</text>

      {/* 三大并行策略 */}
      <text x="400" y="62" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">三大并行策略</text>

      <rect x="30" y="74" width="240" height="100" rx="8" fill="url(#lsl-dt-blue)" opacity="0.1" stroke="#2563eb" strokeWidth="1.5" />
      <text x="150" y="96" textAnchor="middle" fontSize="12" fontWeight="700" fill="#1e40af">数据并行（DP）</text>
      <text x="150" y="116" textAnchor="middle" fontSize="9" fill="#475569">每卡完整模型副本</text>
      <text x="150" y="132" textAnchor="middle" fontSize="9" fill="#475569">切分数据 / 各卡独立前向</text>
      <text x="150" y="148" textAnchor="middle" fontSize="9" fill="#475569">AllReduce 梯度同步</text>
      <text x="150" y="166" textAnchor="middle" fontSize="9" fontWeight="600" fill="#dc2626">瓶颈：模型须装入单卡</text>

      <rect x="280" y="74" width="240" height="100" rx="8" fill="url(#lsl-dt-purple)" opacity="0.1" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="400" y="96" textAnchor="middle" fontSize="12" fontWeight="700" fill="#5b21b6">张量并行（TP）</text>
      <text x="400" y="116" textAnchor="middle" fontSize="9" fill="#475569">切分权重矩阵</text>
      <text x="400" y="132" textAnchor="middle" fontSize="9" fill="#475569">每卡持有部分参数</text>
      <text x="400" y="148" textAnchor="middle" fontSize="9" fill="#475569">AllReduce 跨卡通信</text>
      <text x="400" y="166" textAnchor="middle" fontSize="9" fontWeight="600" fill="#dc2626">瓶颈：层内通信开销大</text>

      <rect x="530" y="74" width="240" height="100" rx="8" fill="url(#lsl-dt-amber)" opacity="0.1" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="650" y="96" textAnchor="middle" fontSize="12" fontWeight="700" fill="#92400e">流水线并行（PP）</text>
      <text x="650" y="116" textAnchor="middle" fontSize="9" fill="#475569">按层切分到不同卡</text>
      <text x="650" y="132" textAnchor="middle" fontSize="9" fill="#475569">微批次流水线执行</text>
      <text x="650" y="148" textAnchor="middle" fontSize="9" fill="#475569">1F1B / Interleave 调度</text>
      <text x="650" y="166" textAnchor="middle" fontSize="9" fontWeight="600" fill="#dc2626">瓶颈：气泡空闲</text>

      {/* ZeRO 显存优化 */}
      <text x="400" y="202" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">ZeRO 显存优化策略</text>

      <rect x="30" y="216" width="240" height="80" rx="8" fill="url(#lsl-dt-green)" opacity="0.1" stroke="#059669" strokeWidth="1.5" />
      <text x="150" y="238" textAnchor="middle" fontSize="11" fontWeight="600" fill="#065f46">ZeRO-1：优化器状态</text>
      <text x="150" y="258" textAnchor="middle" fontSize="9" fill="#475569">分片 optimizer states</text>
      <text x="150" y="274" textAnchor="middle" fontSize="9" fill="#475569">显存降 4x</text>
      <text x="150" y="290" textAnchor="middle" fontSize="9" fontWeight="600" fill="#065f46">通信开销与 DP 相同</text>

      <rect x="280" y="216" width="240" height="80" rx="8" fill="url(#lsl-dt-green)" opacity="0.15" stroke="#059669" strokeWidth="1.5" />
      <text x="400" y="238" textAnchor="middle" fontSize="11" fontWeight="600" fill="#065f46">ZeRO-2：+梯度</text>
      <text x="400" y="258" textAnchor="middle" fontSize="9" fill="#475569">分片 gradients</text>
      <text x="400" y="274" textAnchor="middle" fontSize="9" fill="#475569">显存降 8x</text>
      <text x="400" y="290" textAnchor="middle" fontSize="9" fontWeight="600" fill="#065f46">通信开销仍可接受</text>

      <rect x="530" y="216" width="240" height="80" rx="8" fill="url(#lsl-dt-green)" opacity="0.2" stroke="#059669" strokeWidth="1.5" />
      <text x="650" y="238" textAnchor="middle" fontSize="11" fontWeight="600" fill="#065f46">ZeRO-3：+参数</text>
      <text x="650" y="258" textAnchor="middle" fontSize="9" fill="#475569">分片 parameters</text>
      <text x="650" y="274" textAnchor="middle" fontSize="9" fill="#475569">显存降 Nx（N=卡数）</text>
      <text x="650" y="290" textAnchor="middle" fontSize="9" fontWeight="600" fill="#dc2626">通信开销增大</text>

      {/* 显存构成 */}
      <text x="400" y="324" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">训练显存构成</text>

      <rect x="30" y="338" width="180" height="56" rx="8" fill="#eff6ff" stroke="#2563eb" strokeWidth="1.5" />
      <text x="120" y="360" textAnchor="middle" fontSize="10" fontWeight="600" fill="#1e40af">模型参数</text>
      <text x="120" y="380" textAnchor="middle" fontSize="9" fill="#475569">FP16 ~2 bytes/param</text>

      <rect x="220" y="338" width="180" height="56" rx="8" fill="#f5f3ff" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="310" y="360" textAnchor="middle" fontSize="10" fontWeight="600" fill="#5b21b6">梯度</text>
      <text x="310" y="380" textAnchor="middle" fontSize="9" fill="#475569">FP16 ~2 bytes/param</text>

      <rect x="410" y="338" width="180" height="56" rx="8" fill="#fffbeb" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="500" y="360" textAnchor="middle" fontSize="10" fontWeight="600" fill="#92400e">优化器状态</text>
      <text x="500" y="380" textAnchor="middle" fontSize="9" fill="#475569">Adam ~12 bytes/param</text>

      <rect x="600" y="338" width="170" height="56" rx="8" fill="#f0fdf4" stroke="#059669" strokeWidth="1.5" />
      <text x="685" y="360" textAnchor="middle" fontSize="10" fontWeight="600" fill="#065f46">激活值</text>
      <text x="685" y="380" textAnchor="middle" fontSize="9" fill="#475569">随 batch/seqlen 增长</text>

      {/* 3D 并行 */}
      <text x="400" y="424" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">3D 并行组合策略</text>

      <rect x="30" y="438" width="740" height="56" rx="8" fill="url(#lsl-dt-red)" opacity="0.08" stroke="#dc2626" strokeWidth="1.5" />
      <text x="400" y="460" textAnchor="middle" fontSize="11" fontWeight="600" fill="#991b1b">DP x TP x PP 三维组合</text>
      <text x="400" y="480" textAnchor="middle" fontSize="10" fill="#475569">数据并行扩规模 + 张量并行切大层 + 流水线并行切层数 = 训练万亿参数模型</text>

      {/* 关键技术 */}
      <text x="400" y="516" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">关键工程技术</text>

      <rect x="30" y="530" width="180" height="32" rx="8" fill="#eff6ff" stroke="#2563eb" strokeWidth="1.5" />
      <text x="120" y="550" textAnchor="middle" fontSize="10" fill="#475569">混合精度训练</text>

      <rect x="220" y="530" width="180" height="32" rx="8" fill="#f5f3ff" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="310" y="550" textAnchor="middle" fontSize="10" fill="#475569">梯度累积</text>

      <rect x="410" y="530" width="180" height="32" rx="8" fill="#fffbeb" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="500" y="550" textAnchor="middle" fontSize="10" fill="#475569">激活重计算</text>

      <rect x="600" y="530" width="170" height="32" rx="8" fill="#f0fdf4" stroke="#059669" strokeWidth="1.5" />
      <text x="685" y="550" textAnchor="middle" fontSize="10" fill="#475569">NCCL 通信优化</text>

      <rect x="30" y="566" width="740" height="12" rx="6" fill="url(#lsl-dt-purple)" opacity="0.08" stroke="#7c3aed" strokeWidth="1" />
      <text x="400" y="576" textAnchor="middle" fontSize="9" fontWeight="600" fill="#5b21b6">核心：并行切分计算与显存 → 通信换显存 → 3D 组合训大模型</text>
    </svg>
  );
}
