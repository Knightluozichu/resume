"use client";

export function TbcFinalReviewDiagram() {
  return (
    <svg viewBox="0 0 800 560" className="w-full h-auto" role="img" aria-label="虎书全书复习端到端编译流程整合">
      <defs>
        <linearGradient id="tbc-fr-frontend" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="tbc-fr-middle" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="tbc-fr-backend" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="tbc-fr-hub" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <marker id="tbc-fr-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="40" textAnchor="middle" fontSize="18" fontWeight="700" fill="#0f172a">端到端编译流程整合</text>

      {/* 顶部：端到端流水线横向 */}
      <text x="400" y="76" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">Tiger 源码 → 目标代码</text>

      <rect x="30" y="88" width="100" height="50" rx="8" fill="url(#tbc-fr-frontend)" opacity="0.16" stroke="#2563eb" strokeWidth="1.5" />
      <text x="80" y="110" textAnchor="middle" fontSize="11" fontWeight="700" fill="#1e40af">词法</text>
      <text x="80" y="128" textAnchor="middle" fontSize="11" fill="#475569">ch1</text>

      <path d="M130 113 L142 113" stroke="#64748b" strokeWidth="2" markerEnd="url(#tbc-fr-arrow)" />

      <rect x="144" y="88" width="100" height="50" rx="8" fill="url(#tbc-fr-frontend)" opacity="0.16" stroke="#2563eb" strokeWidth="1.5" />
      <text x="194" y="110" textAnchor="middle" fontSize="11" fontWeight="700" fill="#1e40af">语法</text>
      <text x="194" y="128" textAnchor="middle" fontSize="11" fill="#475569">ch2</text>

      <path d="M244 113 L256 113" stroke="#64748b" strokeWidth="2" markerEnd="url(#tbc-fr-arrow)" />

      <rect x="258" y="88" width="100" height="50" rx="8" fill="url(#tbc-fr-frontend)" opacity="0.16" stroke="#2563eb" strokeWidth="1.5" />
      <text x="308" y="110" textAnchor="middle" fontSize="11" fontWeight="700" fill="#1e40af">语义/类型</text>
      <text x="308" y="128" textAnchor="middle" fontSize="11" fill="#475569">ch3</text>

      <path d="M358 113 L370 113" stroke="#64748b" strokeWidth="2" markerEnd="url(#tbc-fr-arrow)" />

      <rect x="372" y="88" width="100" height="50" rx="8" fill="url(#tbc-fr-middle)" opacity="0.16" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="422" y="110" textAnchor="middle" fontSize="11" fontWeight="700" fill="#5b21b6">栈帧</text>
      <text x="422" y="128" textAnchor="middle" fontSize="11" fill="#475569">ch4</text>

      <path d="M472 113 L484 113" stroke="#64748b" strokeWidth="2" markerEnd="url(#tbc-fr-arrow)" />

      <rect x="486" y="88" width="100" height="50" rx="8" fill="url(#tbc-fr-middle)" opacity="0.16" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="536" y="110" textAnchor="middle" fontSize="11" fontWeight="700" fill="#5b21b6">翻译 IR</text>
      <text x="536" y="128" textAnchor="middle" fontSize="11" fill="#475569">ch5</text>

      <path d="M586 113 L598 113" stroke="#64748b" strokeWidth="2" markerEnd="url(#tbc-fr-arrow)" />

      <rect x="600" y="88" width="100" height="50" rx="8" fill="url(#tbc-fr-middle)" opacity="0.16" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="650" y="110" textAnchor="middle" fontSize="11" fontWeight="700" fill="#5b21b6">规范化</text>
      <text x="650" y="128" textAnchor="middle" fontSize="11" fill="#475569">ch6</text>

      <path d="M700 113 L712 113" stroke="#64748b" strokeWidth="2" markerEnd="url(#tbc-fr-arrow)" />

      <rect x="714" y="88" width="56" height="50" rx="8" fill="url(#tbc-fr-hub)" opacity="0.20" stroke="#059669" strokeWidth="1.5" />
      <text x="742" y="110" textAnchor="middle" fontSize="11" fontWeight="700" fill="#047857">Tree</text>
      <text x="742" y="128" textAnchor="middle" fontSize="11" fill="#475569">IR</text>

      {/* 第二行：后端 */}
      <rect x="120" y="160" width="120" height="50" rx="8" fill="url(#tbc-fr-backend)" opacity="0.16" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="180" y="182" textAnchor="middle" fontSize="11" fontWeight="700" fill="#92400e">指令选择</text>
      <text x="180" y="200" textAnchor="middle" fontSize="11" fill="#475569">ch7</text>

      <path d="M240 185 L252 185" stroke="#64748b" strokeWidth="2" markerEnd="url(#tbc-fr-arrow)" />

      <rect x="254" y="160" width="120" height="50" rx="8" fill="url(#tbc-fr-backend)" opacity="0.16" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="314" y="182" textAnchor="middle" fontSize="11" fontWeight="700" fill="#92400e">寄存器分配</text>
      <text x="314" y="200" textAnchor="middle" fontSize="11" fill="#475569">ch8</text>

      <path d="M374 185 L386 185" stroke="#64748b" strokeWidth="2" markerEnd="url(#tbc-fr-arrow)" />

      <rect x="388" y="160" width="160" height="50" rx="8" fill="url(#tbc-fr-hub)" opacity="0.20" stroke="#059669" strokeWidth="1.5" />
      <text x="468" y="182" textAnchor="middle" fontSize="11" fontWeight="700" fill="#047857">目标代码</text>
      <text x="468" y="200" textAnchor="middle" fontSize="11" fill="#475569">端到端整合 ch9</text>

      {/* 中部：三段输入输出 */}
      <text x="140" y="248" textAnchor="middle" fontSize="13" fontWeight="700" fill="#1e40af">前端（ch1-ch3）</text>
      <text x="400" y="248" textAnchor="middle" fontSize="13" fontWeight="700" fill="#5b21b6">IR 层（ch4-ch6）</text>
      <text x="660" y="248" textAnchor="middle" fontSize="13" fontWeight="700" fill="#92400e">后端（ch7-ch8）</text>

      <rect x="30" y="262" width="250" height="170" rx="8" fill="url(#tbc-fr-frontend)" opacity="0.08" stroke="#2563eb" strokeWidth="1.5" />
      <text x="50" y="286" fontSize="11" fontWeight="700" fill="#1e40af">词法：源码 → Token</text>
      <text x="50" y="306" fontSize="11" fill="#475569">ML-Lex / DFA / 最长匹配</text>
      <text x="50" y="330" fontSize="11" fontWeight="700" fill="#1e40af">语法：Token → AST</text>
      <text x="50" y="350" fontSize="11" fill="#475569">ML-Yacc / LALR(1) / 移进归约</text>
      <text x="50" y="374" fontSize="11" fontWeight="700" fill="#1e40af">语义：AST → (exp, ty)</text>
      <text x="50" y="394" fontSize="11" fill="#475569">双环境 / 类型规则 / nil 子类型</text>
      <text x="50" y="418" fontSize="11" fontWeight="700" fill="#1e40af">关注源语言 Tiger</text>

      <rect x="290" y="262" width="250" height="170" rx="8" fill="url(#tbc-fr-middle)" opacity="0.08" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="310" y="286" fontSize="11" fontWeight="700" fill="#5b21b6">栈帧：Frame 抽象</text>
      <text x="310" y="306" fontSize="11" fill="#475569">escape / static link / 调用约定</text>
      <text x="310" y="330" fontSize="11" fontWeight="700" fill="#5b21b6">翻译：AST → Tree IR</text>
      <text x="310" y="350" fontSize="11" fill="#475569">Ex / Nx / Cx 三形式</text>
      <text x="310" y="374" fontSize="11" fontWeight="700" fill="#5b21b6">规范化：IR → 线性 IR</text>
      <text x="310" y="394" fontSize="11" fill="#475569">消除 ESEQ / 基本块 / trace</text>
      <text x="310" y="418" fontSize="11" fontWeight="700" fill="#5b21b6">Tree IR 是前后端契约</text>

      <rect x="550" y="262" width="250" height="170" rx="8" fill="url(#tbc-fr-backend)" opacity="0.08" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="570" y="286" fontSize="11" fontWeight="700" fill="#92400e">指令选择：IR → 机器指令</text>
      <text x="570" y="306" fontSize="11" fill="#475569">Maximal Munch 树覆盖</text>
      <text x="570" y="330" fontSize="11" fontWeight="700" fill="#92400e">寄存器分配：TEMP → 寄存器</text>
      <text x="570" y="350" fontSize="11" fill="#475569">干涉图 / 图着色 / 溢出</text>
      <text x="570" y="374" fontSize="11" fontWeight="700" fill="#92400e">活跃分析贯穿后端</text>
      <text x="570" y="394" fontSize="11" fill="#475569">move coalescing / 窥孔优化</text>
      <text x="570" y="418" fontSize="11" fontWeight="700" fill="#92400e">关注目标机器特性</text>

      {/* 底部：核心思想 */}
      <rect x="30" y="450" width="740" height="80" rx="8" fill="url(#tbc-fr-hub)" opacity="0.10" stroke="#059669" strokeWidth="1.5" />
      <text x="400" y="474" textAnchor="middle" fontSize="12" fontWeight="700" fill="#047857">虎书核心思想：端到端实现一个完整编译器，以 Tree IR 为解耦枢纽</text>
      <text x="400" y="496" textAnchor="middle" fontSize="11" fill="#475569">前端（词法/语法/语义）关注 Tiger 语言，后端（指令选择/寄存器分配）关注目标机器</text>
      <text x="400" y="516" textAnchor="middle" fontSize="11" fill="#475569">Frame 抽象贯穿前后端，规范化让 IR 适合树覆盖，图着色把无限 TEMP 映射到有限寄存器</text>
    </svg>
  );
}
