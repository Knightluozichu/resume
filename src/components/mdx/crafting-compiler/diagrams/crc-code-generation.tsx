"use client";

export function CrcCodeGenerationDiagram() {
  return (
    <svg viewBox="0 0 800 560" className="w-full h-auto" role="img" aria-label="目标代码生成：寄存器分配与指令选择">
      <defs>
        <linearGradient id="crc-cg-ir" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="crc-cg-reg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="crc-cg-asm" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <marker id="crc-cg-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="28" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">目标代码生成：IR → 机器码</text>

      {/* 三步流水线 */}
      <rect x="30" y="55" width="170" height="70" rx="10" fill="url(#crc-cg-ir)" opacity="0.95" />
      <text x="115" y="82" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">优化后 IR</text>
      <text x="115" y="100" textAnchor="middle" fontSize="11" fill="#bfdbfe">三地址码 / SSA</text>
      <text x="115" y="116" textAnchor="middle" fontSize="11" fill="#bfdbfe">虚拟寄存器</text>

      <path d="M200 90 L230 90" stroke="#64748b" strokeWidth="2.5" markerEnd="url(#crc-cg-arrow)" />

      <rect x="230" y="55" width="170" height="70" rx="10" fill="url(#crc-cg-reg)" opacity="0.95" />
      <text x="315" y="82" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">寄存器分配</text>
      <text x="315" y="100" textAnchor="middle" fontSize="11" fill="#e9d5ff">图着色 / 线性扫描</text>
      <text x="315" y="116" textAnchor="middle" fontSize="11" fill="#e9d5ff">溢出到内存</text>

      <path d="M400 90 L430 90" stroke="#64748b" strokeWidth="2.5" markerEnd="url(#crc-cg-arrow)" />

      <rect x="430" y="55" width="170" height="70" rx="10" fill="url(#crc-cg-asm)" opacity="0.95" />
      <text x="515" y="82" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">指令选择</text>
      <text x="515" y="100" textAnchor="middle" fontSize="11" fill="#fef3c7">树模式匹配</text>
      <text x="515" y="116" textAnchor="middle" fontSize="11" fill="#fef3c7">目标指令序列</text>

      <path d="M600 90 L630 90" stroke="#64748b" strokeWidth="2.5" markerEnd="url(#crc-cg-arrow)" />

      <rect x="630" y="55" width="140" height="70" rx="10" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.5" />
      <text x="700" y="82" textAnchor="middle" fontSize="13" fontWeight="700" fill="#15803d">目标代码</text>
      <text x="700" y="100" textAnchor="middle" fontSize="11" fill="#15803d">MOV / ADD</text>
      <text x="700" y="116" textAnchor="middle" fontSize="11" fill="#15803d">x86 / ARM</text>

      {/* IR 到汇编 */}
      <text x="200" y="165" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">IR → 汇编示例</text>

      <rect x="40" y="180" width="320" height="90" rx="8" fill="url(#crc-cg-ir)" opacity="0.08" stroke="#2563eb" strokeWidth="1.5" />
      <text x="60" y="204" fontSize="12" fontWeight="600" fill="#1e40af">三地址码（IR）</text>
      <text x="60" y="225" fontSize="11" fill="#475569" fontFamily="monospace">t1 = a + b</text>
      <text x="60" y="243" fontSize="11" fill="#475569" fontFamily="monospace">t2 = t1 * c</text>
      <text x="60" y="261" fontSize="11" fill="#475569" fontFamily="monospace">x = t2</text>

      <path d="M360 225 L390 225" stroke="#64748b" strokeWidth="2.5" markerEnd="url(#crc-cg-arrow)" />

      <rect x="390" y="180" width="370" height="90" rx="8" fill="url(#crc-cg-asm)" opacity="0.08" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="410" y="204" fontSize="12" fontWeight="600" fill="#92400e">x86 汇编（寄存器分配后）</text>
      <text x="410" y="225" fontSize="11" fill="#475569" fontFamily="monospace">MOV EAX, a     ; t1</text>
      <text x="410" y="243" fontSize="11" fill="#475569" fontFamily="monospace">ADD EAX, b     ; t1 = a + b</text>
      <text x="410" y="261" fontSize="11" fill="#475569" fontFamily="monospace">IMUL EAX, c    ; t2 = t1 * c</text>

      {/* 寄存器分配图着色 */}
      <text x="400" y="305" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">寄存器分配：图着色法</text>

      <rect x="40" y="320" width="350" height="110" rx="8" fill="url(#crc-cg-reg)" opacity="0.08" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="60" y="343" fontSize="12" fontWeight="600" fill="#5b21b6">干涉图（Interference Graph）</text>

      <circle cx="100" cy="375" r="18" fill="#eff6ff" stroke="#7c3aed" strokeWidth="2" />
      <text x="100" y="379" textAnchor="middle" fontSize="10" fill="#5b21b6">t1</text>

      <circle cx="180" cy="375" r="18" fill="#fef3c7" stroke="#7c3aed" strokeWidth="2" />
      <text x="180" y="379" textAnchor="middle" fontSize="10" fill="#5b21b6">t2</text>

      <circle cx="140" cy="415" r="18" fill="#dcfce7" stroke="#7c3aed" strokeWidth="2" />
      <text x="140" y="419" textAnchor="middle" fontSize="10" fill="#5b21b6">t3</text>

      <line x1="118" y1="375" x2="162" y2="375" stroke="#dc2626" strokeWidth="2" />
      <line x1="100" y1="393" x2="130" y2="403" stroke="#dc2626" strokeWidth="2" />
      <text x="60" y="425" fontSize="10" fill="#dc2626">边 = 同时活跃（互相干涉）</text>

      <rect x="410" y="320" width="350" height="110" rx="8" fill="url(#crc-cg-reg)" opacity="0.08" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="430" y="343" fontSize="12" fontWeight="600" fill="#5b21b6">着色结果（K = 3 个寄存器）</text>
      <text x="430" y="365" fontSize="11" fill="#475569" fontFamily="monospace">t1 → R0（蓝）</text>
      <text x="430" y="383" fontSize="11" fill="#475569" fontFamily="monospace">t2 → R1（黄）</text>
      <text x="430" y="401" fontSize="11" fill="#475569" fontFamily="monospace">t3 → R0（绿，复用 R0）</text>
      <text x="430" y="421" fontSize="11" fill="#dc2626">不干涉的变量可共享寄存器</text>

      {/* 指令选择 */}
      <text x="400" y="465" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">指令选择</text>

      <rect x="40" y="480" width="350" height="65" rx="8" fill="url(#crc-cg-asm)" opacity="0.10" stroke="#f59e0b" strokeWidth="1" />
      <text x="60" y="503" fontSize="12" fontWeight="600" fill="#92400e">树模式匹配</text>
      <text x="60" y="521" fontSize="11" fill="#475569" fontFamily="monospace">t = a + 1 → INC a（单条指令）</text>
      <text x="60" y="538" fontSize="11" fill="#475569">选择代价最小的指令序列</text>

      <rect x="410" y="480" width="350" height="65" rx="8" fill="#fee2e2" stroke="#dc2626" strokeWidth="1" />
      <text x="430" y="503" fontSize="12" fontWeight="600" fill="#991b1b">寄存器溢出（Spill）</text>
      <text x="430" y="521" fontSize="11" fill="#475569">寄存器不够时，将变量存入栈内存</text>
      <text x="430" y="538" fontSize="11" fill="#475569">用 load / store 在内存与寄存器间搬运</text>
    </svg>
  );
}
