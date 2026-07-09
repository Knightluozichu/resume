"use client";

export function MasDistributedProblemSolvingDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="分布式问题求解：任务分配、结果共享与聚合">
      <defs>
        <linearGradient id="mas-dp-blue" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="mas-dp-purple" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="mas-dp-amber" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="mas-dp-green" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <linearGradient id="mas-dp-red" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#dc2626" />
          <stop offset="100%" stopColor="#b91c1c" />
        </linearGradient>
        <marker id="mas-dp-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">分布式问题求解</text>

      {/* DPS 三大要素 */}
      <text x="400" y="62" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">分布式问题求解三要素</text>

      <rect x="40" y="76" width="240" height="64" rx="10" fill="url(#mas-dp-blue)" opacity="0.9" />
      <text x="160" y="100" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">任务分解</text>
      <text x="160" y="120" textAnchor="middle" fontSize="10" fill="#bfdbfe">复杂问题 → 子任务</text>

      <rect x="300" y="76" width="240" height="64" rx="10" fill="url(#mas-dp-purple)" opacity="0.9" />
      <text x="420" y="100" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">子问题求解</text>
      <text x="420" y="120" textAnchor="middle" fontSize="10" fill="#ede9fe">分布并行求解</text>

      <rect x="560" y="76" width="200" height="64" rx="10" fill="url(#mas-dp-amber)" opacity="0.9" />
      <text x="660" y="100" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">结果综合</text>
      <text x="660" y="120" textAnchor="middle" fontSize="10" fill="#fef3c7">合并为完整解</text>

      {/* 任务分解树 */}
      <text x="220" y="166" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">任务分解与分配</text>
      <text x="580" y="166" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">结果聚合</text>

      <rect x="40" y="180" width="360" height="180" rx="8" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />

      <rect x="160" y="196" width="120" height="40" rx="6" fill="url(#mas-dp-blue)" opacity="0.9" />
      <text x="220" y="220" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">总任务 T</text>

      <path d="M200 236 L120 256" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#mas-dp-arrow)" />
      <path d="M220 236 L220 256" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#mas-dp-arrow)" />
      <path d="M240 236 L320 256" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#mas-dp-arrow)" />

      <rect x="60" y="260" width="100" height="36" rx="6" fill="#eff6ff" stroke="#2563eb" strokeWidth="1" />
      <text x="110" y="282" textAnchor="middle" fontSize="10" fill="#1e40af">子任务 T1</text>

      <rect x="170" y="260" width="100" height="36" rx="6" fill="#eff6ff" stroke="#2563eb" strokeWidth="1" />
      <text x="220" y="282" textAnchor="middle" fontSize="10" fill="#1e40af">子任务 T2</text>

      <rect x="280" y="260" width="100" height="36" rx="6" fill="#eff6ff" stroke="#2563eb" strokeWidth="1" />
      <text x="330" y="282" textAnchor="middle" fontSize="10" fill="#1e40af">子任务 T3</text>

      <path d="M110 296 L110 320" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#mas-dp-arrow)" />
      <path d="M220 296 L220 320" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#mas-dp-arrow)" />
      <path d="M330 296 L330 320" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#mas-dp-arrow)" />

      <rect x="60" y="324" width="100" height="28" rx="5" fill="url(#mas-dp-green)" opacity="0.85" />
      <text x="110" y="342" textAnchor="middle" fontSize="9" fontWeight="700" fill="#fff">智能体 A1</text>
      <rect x="170" y="324" width="100" height="28" rx="5" fill="url(#mas-dp-green)" opacity="0.85" />
      <text x="220" y="342" textAnchor="middle" fontSize="9" fontWeight="700" fill="#fff">智能体 A2</text>
      <rect x="280" y="324" width="100" height="28" rx="5" fill="url(#mas-dp-green)" opacity="0.85" />
      <text x="330" y="342" textAnchor="middle" fontSize="9" fontWeight="700" fill="#fff">智能体 A3</text>

      {/* 结果聚合 */}
      <rect x="420" y="180" width="340" height="180" rx="8" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />

      <rect x="440" y="200" width="90" height="32" rx="5" fill="#eff6ff" stroke="#2563eb" strokeWidth="1" />
      <text x="485" y="220" textAnchor="middle" fontSize="9" fill="#1e40af">结果 R1</text>
      <rect x="545" y="200" width="90" height="32" rx="5" fill="#eff6ff" stroke="#2563eb" strokeWidth="1" />
      <text x="590" y="220" textAnchor="middle" fontSize="9" fill="#1e40af">结果 R2</text>
      <rect x="650" y="200" width="90" height="32" rx="5" fill="#eff6ff" stroke="#2563eb" strokeWidth="1" />
      <text x="695" y="220" textAnchor="middle" fontSize="9" fill="#1e40af">结果 R3</text>

      <path d="M485 232 L580 262" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#mas-dp-arrow)" />
      <path d="M590 232 L580 262" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#mas-dp-arrow)" />
      <path d="M695 232 L580 262" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#mas-dp-arrow)" />

      <rect x="500" y="266" width="160" height="44" rx="6" fill="url(#mas-dp-amber)" opacity="0.9" />
      <text x="580" y="286" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">综合器</text>
      <text x="580" y="302" textAnchor="middle" fontSize="9" fill="#fef3c7">冲突消解 + 合并</text>

      <path d="M580 310 L580 334" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#mas-dp-arrow)" />

      <rect x="480" y="338" width="200" height="40" rx="6" fill="url(#mas-dp-green)" opacity="0.9" />
      <text x="580" y="362" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">完整解 S</text>

      {/* 分布式计算范式 */}
      <text x="400" y="388" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">分布式计算范式</text>

      <rect x="40" y="402" width="180" height="80" rx="8" fill="url(#mas-dp-blue)" opacity="0.1" stroke="#2563eb" strokeWidth="1.5" />
      <text x="130" y="424" textAnchor="middle" fontSize="11" fontWeight="700" fill="#1e40af">功能精确</text>
      <text x="130" y="444" textAnchor="middle" fontSize="9" fill="#475569">按功能专长分工</text>
      <text x="130" y="462" textAnchor="middle" fontSize="9" fill="#475569">异质专家协作</text>
      <text x="130" y="476" textAnchor="middle" fontSize="8" fill="#64748b">专家系统模式</text>

      <rect x="232" y="402" width="180" height="80" rx="8" fill="url(#mas-dp-purple)" opacity="0.1" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="322" y="424" textAnchor="middle" fontSize="11" fontWeight="700" fill="#5b21b6">黑板系统</text>
      <text x="322" y="444" textAnchor="middle" fontSize="9" fill="#475569">共享黑板存储</text>
      <text x="322" y="462" textAnchor="middle" fontSize="9" fill="#475569">异步读写</text>
      <text x="322" y="476" textAnchor="middle" fontSize="8" fill="#64748b">中心化黑板</text>

      <rect x="424" y="402" width="180" height="80" rx="8" fill="url(#mas-dp-amber)" opacity="0.1" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="514" y="424" textAnchor="middle" fontSize="11" fontWeight="700" fill="#92400e">市场拍卖</text>
      <text x="514" y="444" textAnchor="middle" fontSize="9" fill="#475569">任务标价竞拍</text>
      <text x="514" y="462" textAnchor="middle" fontSize="9" fill="#475569">效用最大化分配</text>
      <text x="514" y="476" textAnchor="middle" fontSize="8" fill="#64748b">合同网扩展</text>

      <rect x="616" y="402" width="144" height="80" rx="8" fill="url(#mas-dp-green)" opacity="0.1" stroke="#059669" strokeWidth="1.5" />
      <text x="688" y="424" textAnchor="middle" fontSize="11" fontWeight="700" fill="#065f46">多智能体</text>
      <text x="688" y="444" textAnchor="middle" fontSize="9" fill="#475569">学习</text>
      <text x="688" y="462" textAnchor="middle" fontSize="9" fill="#475569">强化学习协作</text>
      <text x="688" y="476" textAnchor="middle" fontSize="8" fill="#64748b">MARL 模式</text>

      {/* 核心挑战 */}
      <text x="400" y="506" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">核心挑战</text>

      <rect x="40" y="520" width="180" height="40" rx="8" fill="url(#mas-dp-red)" opacity="0.08" stroke="#dc2626" strokeWidth="1.5" />
      <text x="130" y="538" textAnchor="middle" fontSize="10" fontWeight="700" fill="#991b1b">任务粒度</text>
      <text x="130" y="554" textAnchor="middle" fontSize="8" fill="#475569">分解过细/过粗</text>

      <rect x="232" y="520" width="180" height="40" rx="8" fill="url(#mas-dp-red)" opacity="0.08" stroke="#dc2626" strokeWidth="1.5" />
      <text x="322" y="538" textAnchor="middle" fontSize="10" fontWeight="700" fill="#991b1b">负载均衡</text>
      <text x="322" y="554" textAnchor="middle" fontSize="8" fill="#475569">避免空闲与拥塞</text>

      <rect x="424" y="520" width="180" height="40" rx="8" fill="url(#mas-dp-red)" opacity="0.08" stroke="#dc2626" strokeWidth="1.5" />
      <text x="514" y="538" textAnchor="middle" fontSize="10" fontWeight="700" fill="#991b1b">结果冲突</text>
      <text x="514" y="554" textAnchor="middle" fontSize="8" fill="#475569">矛盾解的消解</text>

      <rect x="616" y="520" width="144" height="40" rx="8" fill="url(#mas-dp-red)" opacity="0.08" stroke="#dc2626" strokeWidth="1.5" />
      <text x="688" y="538" textAnchor="middle" fontSize="10" fontWeight="700" fill="#991b1b">通信开销</text>
      <text x="688" y="554" textAnchor="middle" fontSize="8" fill="#475569">带宽与时延</text>

      <rect x="30" y="566" width="740" height="12" rx="6" fill="url(#mas-dp-green)" opacity="0.08" stroke="#059669" strokeWidth="1" />
      <text x="400" y="576" textAnchor="middle" fontSize="10" fontWeight="600" fill="#065f46">核心：分布式问题求解 = 分解 + 并行求解 + 综合；用空间并行换时间效率</text>
    </svg>
  );
}
