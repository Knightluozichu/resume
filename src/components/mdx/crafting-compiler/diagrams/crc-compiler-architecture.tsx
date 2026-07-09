"use client";

export function CrcCompilerArchitectureDiagram() {
  return (
    <svg viewBox="0 0 800 560" className="w-full h-auto" role="img" aria-label="编译器三段式架构">
      <defs>
        <linearGradient id="crc-arch-frontend" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="crc-arch-middle" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="crc-arch-backend" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <marker id="crc-arch-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="28" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">编译器三段式架构</text>

      {/* 源码输入 */}
      <rect x="30" y="55" width="100" height="50" rx="8" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="80" y="85" textAnchor="middle" fontSize="13" fontWeight="600" fill="#475569">源码</text>

      <path d="M130 80 L160 80" stroke="#64748b" strokeWidth="2.5" markerEnd="url(#crc-arch-arrow)" />

      {/* 前端 */}
      <rect x="160" y="45" width="170" height="80" rx="10" fill="url(#crc-arch-frontend)" opacity="0.95" />
      <text x="245" y="70" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">前端 Frontend</text>
      <text x="245" y="89" textAnchor="middle" fontSize="11" fill="#bfdbfe">词法分析</text>
      <text x="245" y="105" textAnchor="middle" fontSize="11" fill="#bfdbfe">语法分析</text>
      <text x="245" y="121" textAnchor="middle" fontSize="11" fill="#bfdbfe">→ AST</text>

      <path d="M330 85 L360 85" stroke="#64748b" strokeWidth="2.5" markerEnd="url(#crc-arch-arrow)" />

      {/* 中端 */}
      <rect x="360" y="45" width="170" height="80" rx="10" fill="url(#crc-arch-middle)" opacity="0.95" />
      <text x="445" y="70" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">中端 Middle-end</text>
      <text x="445" y="89" textAnchor="middle" fontSize="11" fill="#e9d5ff">语义分析</text>
      <text x="445" y="105" textAnchor="middle" fontSize="11" fill="#e9d5ff">IR 生成 + 优化</text>
      <text x="445" y="121" textAnchor="middle" fontSize="11" fill="#e9d5ff">→ 优化 IR</text>

      <path d="M530 85 L560 85" stroke="#64748b" strokeWidth="2.5" markerEnd="url(#crc-arch-arrow)" />

      {/* 后端 */}
      <rect x="560" y="45" width="170" height="80" rx="10" fill="url(#crc-arch-backend)" opacity="0.95" />
      <text x="645" y="70" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">后端 Backend</text>
      <text x="645" y="89" textAnchor="middle" fontSize="11" fill="#fef3c7">指令选择</text>
      <text x="645" y="105" textAnchor="middle" fontSize="11" fill="#fef3c7">寄存器分配</text>
      <text x="645" y="121" textAnchor="middle" fontSize="11" fill="#fef3c7">→ 目标代码</text>

      <path d="M730 85 L760 85" stroke="#64748b" strokeWidth="2.5" markerEnd="url(#crc-arch-arrow)" />

      {/* 输出 */}
      <rect x="760" y="55" width="100" height="50" rx="8" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="810" y="78" textAnchor="middle" fontSize="12" fontWeight="600" fill="#475569">目标文件</text>
      <text x="810" y="94" textAnchor="middle" fontSize="11" fill="#475569">.o</text>

      {/* 中间表示桥梁 */}
      <text x="400" y="165" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">中间表示（IR）是三段之间的解耦桥梁</text>

      <rect x="120" y="180" width="200" height="40" rx="8" fill="url(#crc-arch-frontend)" opacity="0.12" stroke="#2563eb" strokeWidth="1.5" />
      <text x="220" y="205" textAnchor="middle" fontSize="11" fill="#1e40af">AST：抽象语法树</text>

      <path d="M320 200 L360 200" stroke="#64748b" strokeWidth="2" markerEnd="url(#crc-arch-arrow)" />

      <rect x="360" y="180" width="200" height="40" rx="8" fill="url(#crc-arch-middle)" opacity="0.12" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="460" y="205" textAnchor="middle" fontSize="11" fill="#5b21b6">IR：三地址码 / SSA</text>

      <path d="M560 200 L600 200" stroke="#64748b" strokeWidth="2" markerEnd="url(#crc-arch-arrow)" />

      <rect x="600" y="180" width="200" height="40" rx="8" fill="url(#crc-arch-backend)" opacity="0.12" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="700" y="205" textAnchor="middle" fontSize="11" fill="#92400e">目标指令序列</text>

      {/* 三段式优势 */}
      <text x="400" y="260" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">三段式架构的核心优势</text>

      <rect x="40" y="275" width="230" height="90" rx="8" fill="#eff6ff" stroke="#2563eb" strokeWidth="1" />
      <text x="60" y="298" fontSize="12" fontWeight="600" fill="#1e40af">多语言支持（M × 1）</text>
      <text x="60" y="318" fontSize="11" fill="#475569">M 种语言 → 统一 IR</text>
      <text x="60" y="335" fontSize="11" fill="#475569">只需写 M 个前端</text>
      <text x="60" y="352" fontSize="11" fill="#475569">中端 / 后端复用</text>

      <rect x="285" y="275" width="230" height="90" rx="8" fill="#faf5ff" stroke="#7c3aed" strokeWidth="1" />
      <text x="305" y="298" fontSize="12" fontWeight="600" fill="#5b21b6">多平台支持（1 × N）</text>
      <text x="305" y="318" fontSize="11" fill="#475569">统一 IR → N 种机器</text>
      <text x="305" y="335" fontSize="11" fill="#475569">只需写 N 个后端</text>
      <text x="305" y="352" fontSize="11" fill="#475569">前端 / 中端复用</text>

      <rect x="530" y="275" width="230" height="90" rx="8" fill="#fffbeb" stroke="#f59e0b" strokeWidth="1" />
      <text x="550" y="298" fontSize="12" fontWeight="600" fill="#92400e">优化复用（1 次）</text>
      <text x="550" y="318" fontSize="11" fill="#475569">IR 层优化只写一次</text>
      <text x="550" y="335" fontSize="11" fill="#475569">对所有语言 / 平台</text>
      <text x="550" y="352" fontSize="11" fill="#475569">同时生效</text>

      {/* 遍数说明 */}
      <text x="400" y="400" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">编译 Pass（遍）</text>

      <rect x="40" y="415" width="720" height="40" rx="8" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1" />
      <text x="60" y="440" fontSize="11" fill="#475569">每个 Pass 读入 IR → 做一种变换 → 输出新 IR，串成流水线</text>

      <rect x="40" y="465" width="140" height="40" rx="8" fill="url(#crc-arch-frontend)" opacity="0.12" stroke="#2563eb" strokeWidth="1" />
      <text x="110" y="490" textAnchor="middle" fontSize="11" fill="#1e40af">Pass 1: AST 构建</text>

      <path d="M180 485 L210 485" stroke="#64748b" strokeWidth="2" markerEnd="url(#crc-arch-arrow)" />

      <rect x="210" y="465" width="140" height="40" rx="8" fill="url(#crc-arch-middle)" opacity="0.12" stroke="#7c3aed" strokeWidth="1" />
      <text x="280" y="490" textAnchor="middle" fontSize="11" fill="#5b21b6">Pass 2: IR 生成</text>

      <path d="M350 485 L380 485" stroke="#64748b" strokeWidth="2" markerEnd="url(#crc-arch-arrow)" />

      <rect x="380" y="465" width="140" height="40" rx="8" fill="url(#crc-arch-middle)" opacity="0.12" stroke="#7c3aed" strokeWidth="1" />
      <text x="450" y="490" textAnchor="middle" fontSize="11" fill="#5b21b6">Pass 3: 优化</text>

      <path d="M520 485 L550 485" stroke="#64748b" strokeWidth="2" markerEnd="url(#crc-arch-arrow)" />

      <rect x="550" y="465" width="140" height="40" rx="8" fill="url(#crc-arch-backend)" opacity="0.12" stroke="#f59e0b" strokeWidth="1" />
      <text x="620" y="490" textAnchor="middle" fontSize="11" fill="#92400e">Pass 4: 代码生成</text>

      <path d="M690 485 L720 485" stroke="#64748b" strokeWidth="2" markerEnd="url(#crc-arch-arrow)" />

      <rect x="720" y="465" width="40" height="40" rx="8" fill="#dcfce7" stroke="#16a34a" strokeWidth="1" />
      <text x="740" y="490" textAnchor="middle" fontSize="11" fill="#15803d">.o</text>
    </svg>
  );
}
