"use client";

export function CrcFinalReviewDiagram() {
  return (
    <svg viewBox="0 0 800 620" className="w-full h-auto" role="img" aria-label="全书复习：端到端编译流程">
      <defs>
        <linearGradient id="crc-fr-frontend" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="crc-fr-middle" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="crc-fr-backend" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="crc-fr-link" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0891b2" />
          <stop offset="100%" stopColor="#0e7490" />
        </linearGradient>
        <marker id="crc-fr-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="28" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">自制编译器 · 端到端流程总览</text>

      {/* 端到端流水线 */}
      <rect x="30" y="55" width="110" height="50" rx="8" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="85" y="85" textAnchor="middle" fontSize="12" fontWeight="600" fill="#475569">源码</text>

      <path d="M140 80 L170 80" stroke="#64748b" strokeWidth="2" markerEnd="url(#crc-fr-arrow)" />

      <rect x="170" y="55" width="110" height="50" rx="8" fill="url(#crc-fr-frontend)" opacity="0.95" />
      <text x="225" y="78" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">词法分析</text>
      <text x="225" y="95" textAnchor="middle" fontSize="10" fill="#bfdbfe">ch2</text>

      <path d="M280 80 L310 80" stroke="#64748b" strokeWidth="2" markerEnd="url(#crc-fr-arrow)" />

      <rect x="310" y="55" width="110" height="50" rx="8" fill="url(#crc-fr-frontend)" opacity="0.95" />
      <text x="365" y="78" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">语法分析</text>
      <text x="365" y="95" textAnchor="middle" fontSize="10" fill="#bfdbfe">ch3</text>

      <path d="M420 80 L450 80" stroke="#64748b" strokeWidth="2" markerEnd="url(#crc-fr-arrow)" />

      <rect x="450" y="55" width="110" height="50" rx="8" fill="url(#crc-fr-frontend)" opacity="0.95" />
      <text x="505" y="78" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">语义分析</text>
      <text x="505" y="95" textAnchor="middle" fontSize="10" fill="#bfdbfe">ch4</text>

      <path d="M560 80 L590 80" stroke="#64748b" strokeWidth="2" markerEnd="url(#crc-fr-arrow)" />

      <rect x="590" y="55" width="110" height="50" rx="8" fill="url(#crc-fr-middle)" opacity="0.95" />
      <text x="645" y="78" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">IR 生成</text>
      <text x="645" y="95" textAnchor="middle" fontSize="10" fill="#e9d5ff">ch5</text>

      <path d="M645 105 L645 125" stroke="#64748b" strokeWidth="2" markerEnd="url(#crc-fr-arrow)" />

      <rect x="590" y="125" width="110" height="50" rx="8" fill="url(#crc-fr-middle)" opacity="0.95" />
      <text x="645" y="148" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">代码优化</text>
      <text x="645" y="165" textAnchor="middle" fontSize="10" fill="#e9d5ff">ch6</text>

      <path d="M590 150 L560 150" stroke="#64748b" strokeWidth="2" markerEnd="url(#crc-fr-arrow)" />

      <rect x="450" y="125" width="110" height="50" rx="8" fill="url(#crc-fr-backend)" opacity="0.95" />
      <text x="505" y="148" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">代码生成</text>
      <text x="505" y="165" textAnchor="middle" fontSize="10" fill="#fef3c7">ch7</text>

      <path d="M450 150 L420 150" stroke="#64748b" strokeWidth="2" markerEnd="url(#crc-fr-arrow)" />

      <rect x="310" y="125" width="110" height="50" rx="8" fill="url(#crc-fr-link)" opacity="0.95" />
      <text x="365" y="148" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">链接</text>
      <text x="365" y="165" textAnchor="middle" fontSize="10" fill="#cffafe">ch8</text>

      <path d="M310 150 L280 150" stroke="#64748b" strokeWidth="2" markerEnd="url(#crc-fr-arrow)" />

      <rect x="170" y="125" width="110" height="50" rx="8" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.5" />
      <text x="225" y="148" textAnchor="middle" fontSize="12" fontWeight="700" fill="#15803d">可执行</text>
      <text x="225" y="165" textAnchor="middle" fontSize="10" fill="#15803d">a.out</text>

      {/* 数据形态变换 */}
      <text x="400" y="215" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">数据形态变换链</text>

      <rect x="40" y="230" width="720" height="34" rx="6" fill="url(#crc-fr-frontend)" opacity="0.10" stroke="#2563eb" strokeWidth="1" />
      <text x="400" y="252" textAnchor="middle" fontSize="11" fill="#1e40af">源码文本 → Token 序列 → AST → 带注解 AST</text>

      <rect x="40" y="268" width="720" height="34" rx="6" fill="url(#crc-fr-middle)" opacity="0.10" stroke="#7c3aed" strokeWidth="1" />
      <text x="400" y="290" textAnchor="middle" fontSize="11" fill="#5b21b6">带注解 AST → 三地址码 IR → 优化后 IR</text>

      <rect x="40" y="306" width="720" height="34" rx="6" fill="url(#crc-fr-backend)" opacity="0.10" stroke="#f59e0b" strokeWidth="1" />
      <text x="400" y="328" textAnchor="middle" fontSize="11" fill="#92400e">优化后 IR → 目标指令序列 → 目标文件（.o）</text>

      <rect x="40" y="344" width="720" height="34" rx="6" fill="url(#crc-fr-link)" opacity="0.10" stroke="#0891b2" strokeWidth="1" />
      <text x="400" y="366" textAnchor="middle" fontSize="11" fill="#0e7490">目标文件 →（链接）→ 可执行文件 →（加载）→ 运行中的进程</text>

      {/* 核心概念串联 */}
      <text x="400" y="410" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">核心概念串联</text>

      <rect x="40" y="425" width="170" height="60" rx="8" fill="url(#crc-fr-frontend)" opacity="0.10" stroke="#2563eb" strokeWidth="1" />
      <text x="60" y="447" fontSize="11" fontWeight="600" fill="#1e40af">正则 → DFA</text>
      <text x="60" y="465" fontSize="10" fill="#475569">词法分析的理论</text>
      <text x="60" y="479" fontSize="10" fill="#475569">基础：自动机</text>

      <rect x="225" y="425" width="170" height="60" rx="8" fill="url(#crc-fr-frontend)" opacity="0.10" stroke="#2563eb" strokeWidth="1" />
      <text x="245" y="447" fontSize="11" fontWeight="600" fill="#1e40af">文法 → LR 分析</text>
      <text x="245" y="465" fontSize="10" fill="#475569">语法分析的理论</text>
      <text x="245" y="479" fontSize="10" fill="#475569">基础：形式语言</text>

      <rect x="410" y="425" width="170" height="60" rx="8" fill="url(#crc-fr-middle)" opacity="0.10" stroke="#7c3aed" strokeWidth="1" />
      <text x="430" y="447" fontSize="11" fontWeight="600" fill="#5b21b6">数据流分析</text>
      <text x="430" y="465" fontSize="10" fill="#475569">优化的理论</text>
      <text x="430" y="479" fontSize="10" fill="#475569">基础：格 / 不动点</text>

      <rect x="595" y="425" width="165" height="60" rx="8" fill="url(#crc-fr-backend)" opacity="0.10" stroke="#f59e0b" strokeWidth="1" />
      <text x="615" y="447" fontSize="11" fontWeight="600" fill="#92400e">图着色</text>
      <text x="615" y="465" fontSize="10" fill="#475569">寄存器分配</text>
      <text x="615" y="479" fontSize="10" fill="#475569">NP 完全问题</text>

      {/* 知识整合要点 */}
      <rect x="40" y="500" width="350" height="100" rx="8" fill="#eff6ff" stroke="#2563eb" strokeWidth="1" />
      <text x="60" y="522" fontSize="12" fontWeight="600" fill="#1e40af">前端：结构理解</text>
      <text x="60" y="540" fontSize="10" fill="#475569">词法（正则/DFA）+ 语法（文法/LR）</text>
      <text x="60" y="556" fontSize="10" fill="#475569">语义（符号表/类型检查）</text>
      <text x="60" y="572" fontSize="10" fill="#475569">输出：带类型注解的 AST</text>
      <text x="60" y="588" fontSize="10" fill="#475569">关注：代码「说了什么」</text>

      <rect x="410" y="500" width="350" height="100" rx="8" fill="#fffbeb" stroke="#f59e0b" strokeWidth="1" />
      <text x="430" y="522" fontSize="12" fontWeight="600" fill="#92400e">后端：性能与目标</text>
      <text x="430" y="540" fontSize="10" fill="#475569">IR 生成 + 优化（数据流）</text>
      <text x="430" y="556" fontSize="10" fill="#475569">代码生成（寄存器/指令选择）</text>
      <text x="430" y="572" fontSize="10" fill="#475569">链接加载（符号重定位）</text>
      <text x="430" y="588" fontSize="10" fill="#475569">关注：代码「如何高效执行」</text>
    </svg>
  );
}
