"use client";

export function CrvProgrammingWorldDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="编程世界从代码到执行的全链路图">
      <defs>
        <linearGradient id="crv-pw-1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>
        <linearGradient id="crv-pw-2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#9333ea" />
          <stop offset="100%" stopColor="#7e22ce" />
        </linearGradient>
        <linearGradient id="crv-pw-3" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#16a34a" />
          <stop offset="100%" stopColor="#15803d" />
        </linearGradient>
        <linearGradient id="crv-pw-4" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ca8a04" />
          <stop offset="100%" stopColor="#a16207" />
        </linearGradient>
        <marker id="crv-pw-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">编程世界：从代码到执行</text>

      {/* 计算机分层 */}
      <text x="400" y="62" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">计算机分层架构</text>

      <rect x="100" y="74" width="600" height="44" rx="8" fill="url(#crv-pw-1)" opacity="0.9" />
      <text x="400" y="102" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">应用程序层——你写的代码</text>

      <path d="M400 118 L400 122" stroke="#64748b" strokeWidth="2" markerEnd="url(#crv-pw-arrow)" />

      <rect x="100" y="126" width="600" height="44" rx="8" fill="url(#crv-pw-2)" opacity="0.9" />
      <text x="400" y="154" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">编程语言层——编译器/解释器</text>

      <path d="M400 170 L400 174" stroke="#64748b" strokeWidth="2" markerEnd="url(#crv-pw-arrow)" />

      <rect x="100" y="178" width="600" height="44" rx="8" fill="url(#crv-pw-3)" opacity="0.9" />
      <text x="400" y="206" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">操作系统层——进程/内存/文件</text>

      <path d="M400 222 L400 226" stroke="#64748b" strokeWidth="2" markerEnd="url(#crv-pw-arrow)" />

      <rect x="100" y="230" width="600" height="44" rx="8" fill="url(#crv-pw-4)" opacity="0.9" />
      <text x="400" y="258" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">硬件层——CPU/内存/磁盘</text>

      {/* 代码到执行流程 */}
      <text x="400" y="304" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">代码到执行流程</text>

      <rect x="30" y="316" width="140" height="60" rx="8" fill="#eff6ff" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="100" y="340" textAnchor="middle" fontSize="11" fontWeight="600" fill="#0369a1">源代码</text>
      <text x="100" y="358" textAnchor="middle" fontSize="9" fill="#475569">.java / .py / .c</text>

      <path d="M170 346 L194 346" stroke="#64748b" strokeWidth="2" markerEnd="url(#crv-pw-arrow)" />

      <rect x="198" y="316" width="140" height="60" rx="8" fill="#f3e8ff" stroke="#9333ea" strokeWidth="1.5" />
      <text x="268" y="340" textAnchor="middle" fontSize="11" fontWeight="600" fill="#7e22ce">编译/解释</text>
      <text x="268" y="358" textAnchor="middle" fontSize="9" fill="#475569">字节码 / 机器码</text>

      <path d="M338 346 L362 346" stroke="#64748b" strokeWidth="2" markerEnd="url(#crv-pw-arrow)" />

      <rect x="366" y="316" width="140" height="60" rx="8" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1.5" />
      <text x="436" y="340" textAnchor="middle" fontSize="11" fontWeight="600" fill="#15803d">加载</text>
      <text x="436" y="358" textAnchor="middle" fontSize="9" fill="#475569">类加载器 / 链接</text>

      <path d="M506 346 L530 346" stroke="#64748b" strokeWidth="2" markerEnd="url(#crv-pw-arrow)" />

      <rect x="534" y="316" width="140" height="60" rx="8" fill="#fef9c3" stroke="#ca8a04" strokeWidth="1.5" />
      <text x="604" y="340" textAnchor="middle" fontSize="11" fontWeight="600" fill="#a16207">执行</text>
      <text x="604" y="358" textAnchor="middle" fontSize="9" fill="#475569">CPU 运行</text>

      <path d="M604 376 L604 380" stroke="#64748b" strokeWidth="2" markerEnd="url(#crv-pw-arrow)" />

      <rect x="534" y="384" width="140" height="40" rx="8" fill="#fee2e2" stroke="#dc2626" strokeWidth="1.5" />
      <text x="604" y="408" textAnchor="middle" fontSize="10" fontWeight="600" fill="#b91c1c">结果输出</text>

      {/* 进程与内存 */}
      <text x="400" y="452" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">进程与内存模型</text>

      <rect x="30" y="464" width="240" height="80" rx="8" fill="url(#crv-pw-1)" opacity="0.1" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="150" y="488" textAnchor="middle" fontSize="11" fontWeight="700" fill="#0369a1">进程</text>
      <text x="150" y="506" textAnchor="middle" fontSize="9" fill="#475569">代码段 / 数据段</text>
      <text x="150" y="522" textAnchor="middle" fontSize="9" fill="#475569">堆 / 栈</text>
      <text x="150" y="538" textAnchor="middle" fontSize="9" fill="#475569">独立地址空间</text>

      <rect x="290" y="464" width="240" height="80" rx="8" fill="url(#crv-pw-3)" opacity="0.1" stroke="#16a34a" strokeWidth="1.5" />
      <text x="410" y="488" textAnchor="middle" fontSize="11" fontWeight="700" fill="#15803d">线程</text>
      <text x="410" y="506" textAnchor="middle" fontSize="9" fill="#475569">共享堆内存</text>
      <text x="410" y="522" textAnchor="middle" fontSize="9" fill="#475569">独立栈与寄存器</text>
      <text x="410" y="538" textAnchor="middle" fontSize="9" fill="#475569">轻量级调度单位</text>

      <rect x="550" y="464" width="220" height="80" rx="8" fill="url(#crv-pw-4)" opacity="0.1" stroke="#ca8a04" strokeWidth="1.5" />
      <text x="660" y="488" textAnchor="middle" fontSize="11" fontWeight="700" fill="#a16207">CPU调度</text>
      <text x="660" y="506" textAnchor="middle" fontSize="9" fill="#475569">时间片轮转</text>
      <text x="660" y="522" textAnchor="middle" fontSize="9" fill="#475569">上下文切换</text>
      <text x="660" y="538" textAnchor="middle" fontSize="9" fill="#475569">并发与并行</text>

      <rect x="30" y="552" width="740" height="22" rx="6" fill="url(#crv-pw-2)" opacity="0.08" stroke="#9333ea" strokeWidth="1.5" />
      <text x="400" y="567" textAnchor="middle" fontSize="10" fontWeight="600" fill="#7e22ce">源代码 → 编译 → 加载 → 执行 → 输出，层层穿透到底层硬件</text>
    </svg>
  );
}
