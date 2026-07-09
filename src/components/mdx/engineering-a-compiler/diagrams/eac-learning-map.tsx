"use client";

export function EacLearningMapDiagram() {
  return (
    <svg viewBox="0 0 800 620" className="w-full h-auto" role="img" aria-label="编译器设计全书学习地图">
      <defs>
        <linearGradient id="eac-lm-frontend" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="eac-lm-middle" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="eac-lm-backend" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="eac-lm-review" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <marker id="eac-lm-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="28" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">编译器设计 · 知识体系全景</text>

      {/* 左侧：编译器三段流水线 */}
      <text x="160" y="60" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">编译器流水线</text>

      <rect x="40" y="72" width="240" height="60" rx="10" fill="url(#eac-lm-frontend)" opacity="0.95" />
      <text x="160" y="96" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">前端：扫描 + 语法分析</text>
      <text x="160" y="116" textAnchor="middle" fontSize="11" fill="#bfdbfe">源码 → Token → IR</text>

      <rect x="40" y="138" width="240" height="60" rx="10" fill="url(#eac-lm-middle)" opacity="0.95" />
      <text x="160" y="162" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">中端：优化器</text>
      <text x="160" y="182" textAnchor="middle" fontSize="11" fill="#e9d5ff">IR 分析 + IR 优化</text>

      <rect x="40" y="204" width="240" height="60" rx="10" fill="url(#eac-lm-backend)" opacity="0.95" />
      <text x="160" y="228" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">后端：指令选择 + 寄存器分配</text>
      <text x="160" y="248" textAnchor="middle" fontSize="11" fill="#fef3c7">IR → 目标机器码</text>

      <path d="M160 132 L160 138" stroke="#64748b" strokeWidth="2" markerEnd="url(#eac-lm-arrow)" />
      <path d="M160 198 L160 204" stroke="#64748b" strokeWidth="2" markerEnd="url(#eac-lm-arrow)" />

      <rect x="40" y="270" width="240" height="60" rx="10" fill="url(#eac-lm-review)" opacity="0.95" />
      <text x="160" y="294" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">端到端整合</text>
      <text x="160" y="314" textAnchor="middle" fontSize="11" fill="#cffafe">前端 → 中端 → 后端</text>

      <path d="M160 264 L160 270" stroke="#64748b" strokeWidth="2" markerEnd="url(#eac-lm-arrow)" />

      {/* 右侧：10章学习路径 */}
      <text x="540" y="60" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">十章学习路径</text>

      <rect x="320" y="72" width="460" height="40" rx="8" fill="url(#eac-lm-review)" opacity="0.12" stroke="#059669" strokeWidth="1.5" />
      <text x="338" y="97" fontSize="12" fontWeight="600" fill="#065f46">ch0</text>
      <text x="372" y="97" fontSize="11" fill="#475569">全书学习地图——知识体系与学习路径</text>

      <path d="M550 112 L550 120" stroke="#64748b" strokeWidth="2" markerEnd="url(#eac-lm-arrow)" />

      <rect x="320" y="122" width="460" height="40" rx="8" fill="url(#eac-lm-frontend)" opacity="0.12" stroke="#2563eb" strokeWidth="1.5" />
      <text x="338" y="147" fontSize="12" fontWeight="600" fill="#1e40af">ch1</text>
      <text x="372" y="147" fontSize="11" fill="#475569">编译器概述与设计——三段式架构 / IR</text>

      <path d="M550 162 L550 170" stroke="#64748b" strokeWidth="2" markerEnd="url(#eac-lm-arrow)" />

      <rect x="320" y="172" width="460" height="40" rx="8" fill="url(#eac-lm-frontend)" opacity="0.12" stroke="#2563eb" strokeWidth="1.5" />
      <text x="338" y="197" fontSize="12" fontWeight="600" fill="#1e40af">ch2</text>
      <text x="372" y="197" fontSize="11" fill="#475569">词法扫描器——正则 / DFA / 表驱动</text>

      <path d="M550 212 L550 220" stroke="#64748b" strokeWidth="2" markerEnd="url(#eac-lm-arrow)" />

      <rect x="320" y="222" width="460" height="40" rx="8" fill="url(#eac-lm-frontend)" opacity="0.12" stroke="#2563eb" strokeWidth="1.5" />
      <text x="338" y="247" fontSize="12" fontWeight="600" fill="#1e40af">ch3</text>
      <text x="372" y="247" fontSize="11" fill="#475569">语法分析器——LL / LR / 递归下降</text>

      <path d="M550 262 L550 270" stroke="#64748b" strokeWidth="2" markerEnd="url(#eac-lm-arrow)" />

      <rect x="320" y="272" width="460" height="40" rx="8" fill="url(#eac-lm-frontend)" opacity="0.12" stroke="#2563eb" strokeWidth="1.5" />
      <text x="338" y="297" fontSize="12" fontWeight="600" fill="#1e40af">ch4</text>
      <text x="372" y="297" fontSize="11" fill="#475569">上下文相关分析——属性文法 / 类型检查</text>

      <path d="M550 312 L550 320" stroke="#64748b" strokeWidth="2" markerEnd="url(#eac-lm-arrow)" />

      <rect x="320" y="322" width="460" height="40" rx="8" fill="url(#eac-lm-middle)" opacity="0.12" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="338" y="347" fontSize="12" fontWeight="600" fill="#5b21b6">ch5</text>
      <text x="372" y="347" fontSize="11" fill="#475569">中间表示生成——三地址码 / SSA / CFG</text>

      <path d="M550 362 L550 370" stroke="#64748b" strokeWidth="2" markerEnd="url(#eac-lm-arrow)" />

      <rect x="320" y="372" width="460" height="40" rx="8" fill="url(#eac-lm-middle)" opacity="0.12" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="338" y="397" fontSize="12" fontWeight="600" fill="#5b21b6">ch6</text>
      <text x="372" y="397" fontSize="11" fill="#475569">代码优化原理——数据流分析 / 冗余消除</text>

      <path d="M550 412 L550 420" stroke="#64748b" strokeWidth="2" markerEnd="url(#eac-lm-arrow)" />

      <rect x="320" y="422" width="460" height="40" rx="8" fill="url(#eac-lm-backend)" opacity="0.12" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="338" y="447" fontSize="12" fontWeight="600" fill="#92400e">ch7</text>
      <text x="372" y="447" fontSize="11" fill="#475569">指令选择——树重写 / 动态规划</text>

      <path d="M550 462 L550 470" stroke="#64748b" strokeWidth="2" markerEnd="url(#eac-lm-arrow)" />

      <rect x="320" y="472" width="460" height="40" rx="8" fill="url(#eac-lm-backend)" opacity="0.12" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="338" y="497" fontSize="12" fontWeight="600" fill="#92400e">ch8</text>
      <text x="372" y="497" fontSize="11" fill="#475569">寄存器分配——图着色 / 线性扫描</text>

      <path d="M550 512 L550 520" stroke="#64748b" strokeWidth="2" markerEnd="url(#eac-lm-arrow)" />

      <rect x="320" y="522" width="460" height="40" rx="8" fill="url(#eac-lm-review)" opacity="0.12" stroke="#059669" strokeWidth="1.5" />
      <text x="338" y="547" fontSize="12" fontWeight="600" fill="#065f46">ch9</text>
      <text x="372" y="547" fontSize="11" fill="#475569">全书复习与知识整合——端到端流程</text>

      {/* 底部学习路径 */}
      <rect x="40" y="572" width="740" height="40" rx="10" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="410" y="597" textAnchor="middle" fontSize="11" fill="#475569">源码 → 扫描 → 语法分析 → 上下文分析 → IR → 优化 → 指令选择 → 寄存器分配 → 整合</text>
    </svg>
  );
}
