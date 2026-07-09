"use client";

export function CrcLinkerLoaderDiagram() {
  return (
    <svg viewBox="0 0 800 560" className="w-full h-auto" role="img" aria-label="链接与加载">
      <defs>
        <linearGradient id="crc-lnk-obj" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="crc-lnk-link" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="crc-lnk-exec" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <linearGradient id="crc-lnk-load" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <marker id="crc-lnk-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="28" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">链接与加载：从目标文件到运行</text>

      {/* 流水线 */}
      <rect x="30" y="55" width="140" height="80" rx="10" fill="url(#crc-lnk-obj)" opacity="0.95" />
      <text x="100" y="82" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">目标文件</text>
      <text x="100" y="100" textAnchor="middle" fontSize="11" fill="#bfdbfe">main.o</text>
      <text x="100" y="116" textAnchor="middle" fontSize="11" fill="#bfdbfe">lib.o</text>

      <path d="M170 95 L200 95" stroke="#64748b" strokeWidth="2.5" markerEnd="url(#crc-lnk-arrow)" />

      <rect x="200" y="55" width="140" height="80" rx="10" fill="url(#crc-lnk-link)" opacity="0.95" />
      <text x="270" y="82" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">链接器</text>
      <text x="270" y="100" textAnchor="middle" fontSize="11" fill="#e9d5ff">符号解析</text>
      <text x="270" y="116" textAnchor="middle" fontSize="11" fill="#e9d5ff">重定位</text>

      <path d="M340 95 L370 95" stroke="#64748b" strokeWidth="2.5" markerEnd="url(#crc-lnk-arrow)" />

      <rect x="370" y="55" width="140" height="80" rx="10" fill="url(#crc-lnk-exec)" opacity="0.95" />
      <text x="440" y="82" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">可执行文件</text>
      <text x="440" y="100" textAnchor="middle" fontSize="11" fill="#bbf7d0">a.out</text>
      <text x="440" y="116" textAnchor="middle" fontSize="11" fill="#bbf7d0">完整地址空间</text>

      <path d="M510 95 L540 95" stroke="#64748b" strokeWidth="2.5" markerEnd="url(#crc-lnk-arrow)" />

      <rect x="540" y="55" width="140" height="80" rx="10" fill="url(#crc-lnk-load)" opacity="0.95" />
      <text x="610" y="82" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">加载器</text>
      <text x="610" y="100" textAnchor="middle" fontSize="11" fill="#fef3c7">装入内存</text>
      <text x="610" y="116" textAnchor="middle" fontSize="11" fill="#fef3c7">跳转入口</text>

      <path d="M680 95 L710 95" stroke="#64748b" strokeWidth="2.5" markerEnd="url(#crc-lnk-arrow)" />

      <rect x="710" y="65" width="70" height="60" rx="8" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.5" />
      <text x="745" y="92" textAnchor="middle" fontSize="12" fontWeight="600" fill="#15803d">运行</text>
      <text x="745" y="110" textAnchor="middle" fontSize="11" fill="#15803d">进程</text>

      {/* 目标文件结构 */}
      <text x="200" y="175" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">目标文件结构（ELF）</text>

      <rect x="40" y="190" width="320" height="200" rx="8" fill="url(#crc-lnk-obj)" opacity="0.06" stroke="#2563eb" strokeWidth="1.5" />

      <rect x="55" y="200" width="290" height="24" rx="4" fill="#0f172a" />
      <text x="200" y="217" textAnchor="middle" fontSize="11" fontWeight="600" fill="#e2e8f0">ELF Header</text>

      <rect x="55" y="228" width="290" height="24" rx="4" fill="#eff6ff" stroke="#2563eb" strokeWidth="1" />
      <text x="200" y="245" textAnchor="middle" fontSize="11" fill="#1e40af">.text（代码段）</text>

      <rect x="55" y="256" width="290" height="24" rx="4" fill="#eff6ff" stroke="#2563eb" strokeWidth="1" />
      <text x="200" y="273" textAnchor="middle" fontSize="11" fill="#1e40af">.data（已初始化数据）</text>

      <rect x="55" y="284" width="290" height="24" rx="4" fill="#eff6ff" stroke="#2563eb" strokeWidth="1" />
      <text x="200" y="301" textAnchor="middle" fontSize="11" fill="#1e40af">.bss（未初始化数据）</text>

      <rect x="55" y="312" width="290" height="24" rx="4" fill="#fef3c7" stroke="#d97706" strokeWidth="1" />
      <text x="200" y="329" textAnchor="middle" fontSize="11" fill="#92400e">.symtab（符号表）</text>

      <rect x="55" y="340" width="290" height="24" rx="4" fill="#fef3c7" stroke="#d97706" strokeWidth="1" />
      <text x="200" y="357" textAnchor="middle" fontSize="11" fill="#92400e">.rel.text（重定位表）</text>

      <text x="200" y="383" textAnchor="middle" fontSize="10" fill="#475569">符号表记录导出 / 引用的名字，重定位表记录待修正地址</text>

      {/* 链接过程 */}
      <text x="600" y="175" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">链接器两步工作</text>

      <rect x="440" y="190" width="320" height="80" rx="8" fill="url(#crc-lnk-link)" opacity="0.10" stroke="#7c3aed" strokeWidth="1" />
      <text x="460" y="213" fontSize="12" fontWeight="600" fill="#5b21b6">步骤 1：符号解析</text>
      <text x="460" y="232" fontSize="11" fill="#475569">合并各目标文件的符号表</text>
      <text x="460" y="249" fontSize="11" fill="#475569">将引用绑定到定义</text>
      <text x="460" y="266" fontSize="11" fill="#dc2626">未定义符号 = 链接错误</text>

      <rect x="440" y="280" width="320" height="80" rx="8" fill="url(#crc-lnk-link)" opacity="0.10" stroke="#7c3aed" strokeWidth="1" />
      <text x="460" y="303" fontSize="12" fontWeight="600" fill="#5b21b6">步骤 2：重定位</text>
      <text x="460" y="322" fontSize="11" fill="#475569">合并代码 / 数据段</text>
      <text x="460" y="339" fontSize="11" fill="#475569">按重定位表修正地址</text>
      <text x="460" y="356" fontSize="11" fill="#475569">每个符号赋最终运行地址</text>

      {/* 静态 vs 动态链接 */}
      <text x="400" y="420" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">静态链接 vs 动态链接</text>

      <rect x="40" y="435" width="350" height="50" rx="8" fill="url(#crc-lnk-exec)" opacity="0.10" stroke="#059669" strokeWidth="1" />
      <text x="60" y="457" fontSize="12" fontWeight="600" fill="#065f46">静态链接</text>
      <text x="60" y="475" fontSize="11" fill="#475569">库代码完整拷入可执行文件，独立运行但体积大</text>

      <rect x="410" y="435" width="350" height="50" rx="8" fill="url(#crc-lnk-load)" opacity="0.10" stroke="#f59e0b" strokeWidth="1" />
      <text x="430" y="457" fontSize="12" fontWeight="600" fill="#92400e">动态链接</text>
      <text x="430" y="475" fontSize="11" fill="#475569">运行时才加载 .so/.dll，多进程共享，体积小</text>

      {/* 加载 */}
      <rect x="40" y="500" width="720" height="45" rx="8" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="400" y="522" textAnchor="middle" fontSize="12" fontWeight="600" fill="#334155">加载器（Loader）</text>
      <text x="400" y="538" textAnchor="middle" fontSize="11" fill="#475569">读取可执行文件 → 分配虚拟内存 → 映射段 → 设置栈 → 跳转 main 入口</text>
    </svg>
  );
}
