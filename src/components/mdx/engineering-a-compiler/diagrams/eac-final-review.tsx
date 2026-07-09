"use client";

export function EacFinalReviewDiagram() {
  return (
    <svg viewBox="0 0 800 520" className="w-full h-auto" role="img" aria-label="编译器设计全书复习端到端流程整合">
      <defs>
        <linearGradient id="eac-fr-frontend" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="eac-fr-middle" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="eac-fr-backend" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="eac-fr-review" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <marker id="eac-fr-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="30" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">端到端整合：源代码 → 机器码 全链路</text>

      {/* 前端层 */}
      <text x="400" y="62" textAnchor="middle" fontSize="14" fontWeight="700" fill="#1e40af">前端：源码 → IR</text>

      <rect x="30" y="75" width="170" height="55" rx="8" fill="url(#eac-fr-frontend)" opacity="0.12" stroke="#2563eb" strokeWidth="1.5" />
      <text x="115" y="98" textAnchor="middle" fontSize="12" fontWeight="600" fill="#1e40af">ch2 扫描器</text>
      <text x="115" y="116" textAnchor="middle" fontSize="10" fill="#475569">正则→DFA→Token</text>

      <rect x="210" y="75" width="170" height="55" rx="8" fill="url(#eac-fr-frontend)" opacity="0.16" stroke="#2563eb" strokeWidth="1.5" />
      <text x="295" y="98" textAnchor="middle" fontSize="12" fontWeight="600" fill="#1e40af">ch3 语法分析</text>
      <text x="295" y="116" textAnchor="middle" fontSize="10" fill="#475569">LL/LR→AST</text>

      <rect x="390" y="75" width="170" height="55" rx="8" fill="url(#eac-fr-frontend)" opacity="0.2" stroke="#2563eb" strokeWidth="1.5" />
      <text x="475" y="98" textAnchor="middle" fontSize="12" fontWeight="600" fill="#1e40af">ch4 上下文分析</text>
      <text x="475" y="116" textAnchor="middle" fontSize="10" fill="#475569">属性文法/类型检查</text>

      <rect x="570" y="75" width="200" height="55" rx="8" fill="url(#eac-fr-frontend)" opacity="0.9" />
      <text x="670" y="98" textAnchor="middle" fontSize="12" fontWeight="600" fill="#fff">ch1 概述</text>
      <text x="670" y="116" textAnchor="middle" fontSize="10" fill="#bfdbfe">三段式架构总纲</text>

      <path d="M115 130 L115 145" stroke="#64748b" strokeWidth="2" markerEnd="url(#eac-fr-arrow)" />
      <path d="M295 130 L295 145" stroke="#64748b" strokeWidth="2" markerEnd="url(#eac-fr-arrow)" />
      <path d="M475 130 L475 145" stroke="#64748b" strokeWidth="2" markerEnd="url(#eac-fr-arrow)" />

      {/* IR 桥梁 */}
      <rect x="30" y="145" width="740" height="35" rx="8" fill="#0f172a" opacity="0.85" />
      <text x="400" y="168" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">IR（中间表示）—— ch5 生成三地址码 / SSA / CFG</text>

      {/* 中端层 */}
      <text x="400" y="210" textAnchor="middle" fontSize="14" fontWeight="700" fill="#5b21b6">中端：优化 IR</text>

      <rect x="200" y="225" width="400" height="55" rx="8" fill="url(#eac-fr-middle)" opacity="0.15" stroke="#7c3aed" strokeWidth="2" />
      <text x="400" y="248" textAnchor="middle" fontSize="13" fontWeight="600" fill="#5b21b6">ch6 代码优化</text>
      <text x="400" y="268" textAnchor="middle" fontSize="11" fill="#475569">数据流分析 → 冗余消除 → 循环优化 → 优化后 IR</text>

      <path d="M400 280 L400 295" stroke="#64748b" strokeWidth="2" markerEnd="url(#eac-fr-arrow)" />

      {/* 后端层 */}
      <text x="400" y="318" textAnchor="middle" fontSize="14" fontWeight="700" fill="#92400e">后端：IR → 机器码</text>

      <rect x="150" y="333" width="230" height="55" rx="8" fill="url(#eac-fr-backend)" opacity="0.15" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="265" y="356" textAnchor="middle" fontSize="12" fontWeight="600" fill="#92400e">ch7 指令选择</text>
      <text x="265" y="374" textAnchor="middle" fontSize="10" fill="#475569">树重写 + DP → 目标指令</text>

      <rect x="420" y="333" width="230" height="55" rx="8" fill="url(#eac-fr-backend)" opacity="0.2" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="535" y="356" textAnchor="middle" fontSize="12" fontWeight="600" fill="#92400e">ch8 寄存器分配</text>
      <text x="535" y="374" textAnchor="middle" fontSize="10" fill="#475569">干扰图 + 图着色 → 寄存器</text>

      <path d="M265 388 L265 403" stroke="#64748b" strokeWidth="2" markerEnd="url(#eac-fr-arrow)" />
      <path d="M535 388 L535 403" stroke="#64748b" strokeWidth="2" markerEnd="url(#eac-fr-arrow)" />

      {/* 最终输出 */}
      <rect x="150" y="403" width="500" height="40" rx="8" fill="url(#eac-fr-review)" opacity="0.9" />
      <text x="400" y="428" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">目标机器码（可执行）</text>

      {/* 核心思想 */}
      <rect x="30" y="460" width="740" height="50" rx="8" fill="#ecfdf5" stroke="#059669" strokeWidth="1.5" />
      <text x="400" y="482" textAnchor="middle" fontSize="13" fontWeight="600" fill="#065f46">全书核心：IR 解耦前后端，优化在中端复用，后端适配目标机</text>
      <text x="400" y="500" textAnchor="middle" fontSize="11" fill="#475569">每个阶段输出是下一阶段输入，数据形态从文本→树→线性指令→机器码逐步变换</text>
    </svg>
  );
}
