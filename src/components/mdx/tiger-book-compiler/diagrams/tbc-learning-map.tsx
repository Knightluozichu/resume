"use client";

export function TbcLearningMapDiagram() {
  return (
    <svg viewBox="0 0 800 600" className="w-full h-auto" role="img" aria-label="虎书现代编译器实现全书学习地图">
      <defs>
        <linearGradient id="tbc-lm-frontend" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="tbc-lm-middle" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="tbc-lm-backend" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="tbc-lm-review" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <marker id="tbc-lm-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="40" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">虎书（现代编译器实现）· 知识体系全景</text>

      {/* 左侧：编译器流水线，以 Tree IR 为枢纽 */}
      <text x="160" y="78" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">编译器流水线</text>

      <rect x="40" y="90" width="240" height="58" rx="10" fill="url(#tbc-lm-frontend)" opacity="0.95" />
      <text x="160" y="114" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">前端：词法 + 语法 + 语义</text>
      <text x="160" y="134" textAnchor="middle" fontSize="11" fill="#bfdbfe">Tiger 源码 → Token → AST → 类型检查</text>

      <path d="M160 148 L160 154" stroke="#64748b" strokeWidth="2" markerEnd="url(#tbc-lm-arrow)" />

      <rect x="40" y="156" width="240" height="58" rx="10" fill="url(#tbc-lm-middle)" opacity="0.95" />
      <text x="160" y="180" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">IR 层：栈帧 + 翻译 + 规范化</text>
      <text x="160" y="200" textAnchor="middle" fontSize="11" fill="#e9d5ff">AST → Tree IR → 规范化 IR</text>

      <path d="M160 214 L160 220" stroke="#64748b" strokeWidth="2" markerEnd="url(#tbc-lm-arrow)" />

      <rect x="40" y="222" width="240" height="58" rx="10" fill="url(#tbc-lm-backend)" opacity="0.95" />
      <text x="160" y="246" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">后端：指令选择 + 寄存器分配</text>
      <text x="160" y="266" textAnchor="middle" fontSize="11" fill="#fef3c7">IR → 机器指令 → 目标代码</text>

      <path d="M160 280 L160 286" stroke="#64748b" strokeWidth="2" markerEnd="url(#tbc-lm-arrow)" />

      <rect x="40" y="288" width="240" height="58" rx="10" fill="url(#tbc-lm-review)" opacity="0.95" />
      <text x="160" y="312" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">端到端整合</text>
      <text x="160" y="332" textAnchor="middle" fontSize="11" fill="#cffafe">前端 → IR 层 → 后端</text>

      <text x="160" y="368" textAnchor="middle" fontSize="11" fontWeight="600" fill="#7c3aed">Tree IR 是前后端的解耦枢纽</text>

      {/* 右侧：10章学习路径 */}
      <text x="540" y="78" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">十章学习路径</text>

      <rect x="320" y="90" width="460" height="38" rx="8" fill="url(#tbc-lm-review)" opacity="0.12" stroke="#059669" strokeWidth="1.5" />
      <text x="338" y="114" fontSize="12" fontWeight="600" fill="#065f46">ch0</text>
      <text x="372" y="114" fontSize="11" fill="#475569">全书学习地图——知识体系与学习路径</text>

      <path d="M550 128 L550 134" stroke="#64748b" strokeWidth="2" markerEnd="url(#tbc-lm-arrow)" />

      <rect x="320" y="136" width="460" height="38" rx="8" fill="url(#tbc-lm-frontend)" opacity="0.12" stroke="#2563eb" strokeWidth="1.5" />
      <text x="338" y="160" fontSize="12" fontWeight="600" fill="#1e40af">ch1</text>
      <text x="372" y="160" fontSize="11" fill="#475569">词法分析——正则 / NFA / DFA / ML-Lex</text>

      <path d="M550 174 L550 180" stroke="#64748b" strokeWidth="2" markerEnd="url(#tbc-lm-arrow)" />

      <rect x="320" y="182" width="460" height="38" rx="8" fill="url(#tbc-lm-frontend)" opacity="0.12" stroke="#2563eb" strokeWidth="1.5" />
      <text x="338" y="206" fontSize="12" fontWeight="600" fill="#1e40af">ch2</text>
      <text x="372" y="206" fontSize="11" fill="#475569">语法分析——CFG / LR / ML-Yacc / 错误恢复</text>

      <path d="M550 220 L550 226" stroke="#64748b" strokeWidth="2" markerEnd="url(#tbc-lm-arrow)" />

      <rect x="320" y="228" width="460" height="38" rx="8" fill="url(#tbc-lm-frontend)" opacity="0.12" stroke="#2563eb" strokeWidth="1.5" />
      <text x="338" y="252" fontSize="12" fontWeight="600" fill="#1e40af">ch3</text>
      <text x="372" y="252" fontSize="11" fill="#475569">语义分析与类型——环境 / 类型检查</text>

      <path d="M550 266 L550 272" stroke="#64748b" strokeWidth="2" markerEnd="url(#tbc-lm-arrow)" />

      <rect x="320" y="274" width="460" height="38" rx="8" fill="url(#tbc-lm-middle)" opacity="0.12" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="338" y="298" fontSize="12" fontWeight="600" fill="#5b21b6">ch4</text>
      <text x="372" y="298" fontSize="11" fill="#475569">活动记录与栈帧——Frame / 静态链 / escape</text>

      <path d="M550 312 L550 318" stroke="#64748b" strokeWidth="2" markerEnd="url(#tbc-lm-arrow)" />

      <rect x="320" y="320" width="460" height="38" rx="8" fill="url(#tbc-lm-middle)" opacity="0.12" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="338" y="344" fontSize="12" fontWeight="600" fill="#5b21b6">ch5</text>
      <text x="372" y="344" fontSize="11" fill="#475569">翻译到中间表示——Tree IR / 表达式 / 控制流</text>

      <path d="M550 358 L550 364" stroke="#64748b" strokeWidth="2" markerEnd="url(#tbc-lm-arrow)" />

      <rect x="320" y="366" width="460" height="38" rx="8" fill="url(#tbc-lm-middle)" opacity="0.12" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="338" y="390" fontSize="12" fontWeight="600" fill="#5b21b6">ch6</text>
      <text x="372" y="390" fontSize="11" fill="#475569">规范化与基本块——ESEQ 消除 / trace</text>

      <path d="M550 404 L550 410" stroke="#64748b" strokeWidth="2" markerEnd="url(#tbc-lm-arrow)" />

      <rect x="320" y="412" width="460" height="38" rx="8" fill="url(#tbc-lm-backend)" opacity="0.12" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="338" y="436" fontSize="12" fontWeight="600" fill="#92400e">ch7</text>
      <text x="372" y="436" fontSize="11" fill="#475569">指令选择——Maximal Munch / 树覆盖</text>

      <path d="M550 450 L550 456" stroke="#64748b" strokeWidth="2" markerEnd="url(#tbc-lm-arrow)" />

      <rect x="320" y="458" width="460" height="38" rx="8" fill="url(#tbc-lm-backend)" opacity="0.12" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="338" y="482" fontSize="12" fontWeight="600" fill="#92400e">ch8</text>
      <text x="372" y="482" fontSize="11" fill="#475569">寄存器分配——干涉图 / 图着色 / 溢出</text>

      <path d="M550 496 L550 502" stroke="#64748b" strokeWidth="2" markerEnd="url(#tbc-lm-arrow)" />

      <rect x="320" y="504" width="460" height="38" rx="8" fill="url(#tbc-lm-review)" opacity="0.12" stroke="#059669" strokeWidth="1.5" />
      <text x="338" y="528" fontSize="12" fontWeight="600" fill="#065f46">ch9</text>
      <text x="372" y="528" fontSize="11" fill="#475569">全书复习与知识整合——端到端流程</text>

      {/* 底部学习路径 */}
      <rect x="40" y="556" width="740" height="26" rx="8" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="410" y="573" textAnchor="middle" fontSize="11" fill="#475569">源码 → 词法 → 语法 → 语义 → 栈帧 → 翻译IR → 规范化 → 指令选择 → 寄存器分配 → 整合</text>
    </svg>
  );
}
