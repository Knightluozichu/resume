"use client";

export function CrcLearningMapDiagram() {
  return (
    <svg viewBox="0 0 800 620" className="w-full h-auto" role="img" aria-label="自制编译器全书学习地图">
      <defs>
        <linearGradient id="crc-lm-frontend" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="crc-lm-middle" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="crc-lm-backend" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="crc-lm-link" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0891b2" />
          <stop offset="100%" stopColor="#0e7490" />
        </linearGradient>
        <linearGradient id="crc-lm-review" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <marker id="crc-lm-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="28" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">自制编译器 · 知识体系全景</text>

      {/* 左侧：编译器流水线 */}
      <text x="160" y="60" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">编译器流水线</text>

      <rect x="40" y="72" width="240" height="60" rx="10" fill="url(#crc-lm-frontend)" opacity="0.95" />
      <text x="160" y="96" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">前端：词法 + 语法分析</text>
      <text x="160" y="116" textAnchor="middle" fontSize="11" fill="#bfdbfe">源码 → Token → AST</text>

      <rect x="40" y="138" width="240" height="60" rx="10" fill="url(#crc-lm-middle)" opacity="0.95" />
      <text x="160" y="162" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">中端：语义 + 中间代码</text>
      <text x="160" y="182" textAnchor="middle" fontSize="11" fill="#e9d5ff">类型检查 + IR 生成 + 优化</text>

      <rect x="40" y="204" width="240" height="60" rx="10" fill="url(#crc-lm-backend)" opacity="0.95" />
      <text x="160" y="228" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">后端：目标代码生成</text>
      <text x="160" y="248" textAnchor="middle" fontSize="11" fill="#fef3c7">IR → 寄存器分配 → 机器码</text>

      <rect x="40" y="270" width="240" height="60" rx="10" fill="url(#crc-lm-link)" opacity="0.95" />
      <text x="160" y="294" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">链接与加载</text>
      <text x="160" y="314" textAnchor="middle" fontSize="11" fill="#cffafe">目标文件 → 可执行文件</text>

      <path d="M160 132 L160 138" stroke="#64748b" strokeWidth="2" markerEnd="url(#crc-lm-arrow)" />
      <path d="M160 198 L160 204" stroke="#64748b" strokeWidth="2" markerEnd="url(#crc-lm-arrow)" />
      <path d="M160 264 L160 270" stroke="#64748b" strokeWidth="2" markerEnd="url(#crc-lm-arrow)" />

      {/* 右侧：10章学习路径 */}
      <text x="540" y="60" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">十章学习路径</text>

      <rect x="320" y="72" width="460" height="40" rx="8" fill="url(#crc-lm-review)" opacity="0.12" stroke="#059669" strokeWidth="1.5" />
      <text x="338" y="97" fontSize="12" fontWeight="600" fill="#065f46">ch0</text>
      <text x="372" y="97" fontSize="11" fill="#475569">全书学习地图——知识体系与学习路径</text>

      <path d="M550 112 L550 120" stroke="#64748b" strokeWidth="2" markerEnd="url(#crc-lm-arrow)" />

      <rect x="320" y="122" width="460" height="40" rx="8" fill="url(#crc-lm-frontend)" opacity="0.12" stroke="#2563eb" strokeWidth="1.5" />
      <text x="338" y="147" fontSize="12" fontWeight="600" fill="#1e40af">ch1</text>
      <text x="372" y="147" fontSize="11" fill="#475569">编译器架构——前端 / 中端 / 后端 / 链接</text>

      <path d="M550 162 L550 170" stroke="#64748b" strokeWidth="2" markerEnd="url(#crc-lm-arrow)" />

      <rect x="320" y="172" width="460" height="40" rx="8" fill="url(#crc-lm-frontend)" opacity="0.12" stroke="#2563eb" strokeWidth="1.5" />
      <text x="338" y="197" fontSize="12" fontWeight="600" fill="#1e40af">ch2</text>
      <text x="372" y="197" fontSize="11" fill="#475569">词法分析生成器——正则 / NFA / DFA</text>

      <path d="M550 212 L550 220" stroke="#64748b" strokeWidth="2" markerEnd="url(#crc-lm-arrow)" />

      <rect x="320" y="222" width="460" height="40" rx="8" fill="url(#crc-lm-frontend)" opacity="0.12" stroke="#2563eb" strokeWidth="1.5" />
      <text x="338" y="247" fontSize="12" fontWeight="600" fill="#1e40af">ch3</text>
      <text x="372" y="247" fontSize="11" fill="#475569">语法分析生成器——文法 / LL / LR 分析</text>

      <path d="M550 262 L550 270" stroke="#64748b" strokeWidth="2" markerEnd="url(#crc-lm-arrow)" />

      <rect x="320" y="272" width="460" height="40" rx="8" fill="url(#crc-lm-middle)" opacity="0.12" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="338" y="297" fontSize="12" fontWeight="600" fill="#5b21b6">ch4</text>
      <text x="372" y="297" fontSize="11" fill="#475569">语义分析与类型检查——符号表 / 类型推导</text>

      <path d="M550 312 L550 320" stroke="#64748b" strokeWidth="2" markerEnd="url(#crc-lm-arrow)" />

      <rect x="320" y="322" width="460" height="40" rx="8" fill="url(#crc-lm-middle)" opacity="0.12" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="338" y="347" fontSize="12" fontWeight="600" fill="#5b21b6">ch5</text>
      <text x="372" y="347" fontSize="11" fill="#475569">中间代码生成——三地址码 / AST 翻译</text>

      <path d="M550 362 L550 370" stroke="#64748b" strokeWidth="2" markerEnd="url(#crc-lm-arrow)" />

      <rect x="320" y="372" width="460" height="40" rx="8" fill="url(#crc-lm-middle)" opacity="0.12" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="338" y="397" fontSize="12" fontWeight="600" fill="#5b21b6">ch6</text>
      <text x="372" y="397" fontSize="11" fill="#475569">代码优化——常量折叠 / 死代码消除 / 数据流</text>

      <path d="M550 412 L550 420" stroke="#64748b" strokeWidth="2" markerEnd="url(#crc-lm-arrow)" />

      <rect x="320" y="422" width="460" height="40" rx="8" fill="url(#crc-lm-backend)" opacity="0.12" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="338" y="447" fontSize="12" fontWeight="600" fill="#92400e">ch7</text>
      <text x="372" y="447" fontSize="11" fill="#475569">目标代码生成——寄存器分配 / 指令选择</text>

      <path d="M550 462 L550 470" stroke="#64748b" strokeWidth="2" markerEnd="url(#crc-lm-arrow)" />

      <rect x="320" y="472" width="460" height="40" rx="8" fill="url(#crc-lm-link)" opacity="0.12" stroke="#0891b2" strokeWidth="1.5" />
      <text x="338" y="497" fontSize="12" fontWeight="600" fill="#0e7490">ch8</text>
      <text x="372" y="497" fontSize="11" fill="#475569">链接与加载——符号重定位 / 加载器</text>

      <path d="M550 512 L550 520" stroke="#64748b" strokeWidth="2" markerEnd="url(#crc-lm-arrow)" />

      <rect x="320" y="522" width="460" height="40" rx="8" fill="url(#crc-lm-review)" opacity="0.12" stroke="#059669" strokeWidth="1.5" />
      <text x="338" y="547" fontSize="12" fontWeight="600" fill="#065f46">ch9</text>
      <text x="372" y="547" fontSize="11" fill="#475569">全书复习与知识整合——端到端流程</text>

      {/* 底部学习路径 */}
      <rect x="40" y="572" width="740" height="40" rx="10" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="410" y="597" textAnchor="middle" fontSize="11" fill="#475569">源码 → 词法 → 语法 → 语义 → IR → 优化 → 代码生成 → 链接 → 整合复习</text>
    </svg>
  );
}
