"use client";

export function DbcFinalReviewDiagram() {
  return (
    <svg viewBox="0 0 800 520" className="w-full h-auto" role="img" aria-label="龙书编译原理全书复习与知识整合">
      <defs>
        <linearGradient id="dbc-fr-frontend" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="dbc-fr-middle" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="dbc-fr-backend" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="dbc-fr-review" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <marker id="dbc-fr-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="28" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">龙书全书复习：端到端编译流程整合</text>

      {/* 端到端流水线 */}
      <text x="400" y="58" textAnchor="middle" fontSize="14" fontWeight="700" fill="#0f172a">端到端编译流程</text>

      <rect x="20" y="72" width="110" height="70" rx="8" fill="url(#dbc-fr-frontend)" opacity="0.95" />
      <text x="75" y="98" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">词法分析</text>
      <text x="75" y="116" textAnchor="middle" fontSize="10" fill="#bfdbfe">源码→Token</text>
      <text x="75" y="132" textAnchor="middle" fontSize="10" fill="#bfdbfe">ch1</text>

      <path d="M130 107 L148 107" stroke="#64748b" strokeWidth="2" markerEnd="url(#dbc-fr-arrow)" />

      <rect x="150" y="72" width="110" height="70" rx="8" fill="url(#dbc-fr-frontend)" opacity="0.88" />
      <text x="205" y="98" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">语法分析</text>
      <text x="205" y="116" textAnchor="middle" fontSize="10" fill="#bfdbfe">Token→AST</text>
      <text x="205" y="132" textAnchor="middle" fontSize="10" fill="#bfdbfe">ch2</text>

      <path d="M260 107 L278 107" stroke="#64748b" strokeWidth="2" markerEnd="url(#dbc-fr-arrow)" />

      <rect x="280" y="72" width="110" height="70" rx="8" fill="url(#dbc-fr-frontend)" opacity="0.81" />
      <text x="335" y="98" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">语义分析</text>
      <text x="335" y="116" textAnchor="middle" fontSize="10" fill="#bfdbfe">符号表/SDT</text>
      <text x="335" y="132" textAnchor="middle" fontSize="10" fill="#bfdbfe">ch3</text>

      <path d="M390 107 L408 107" stroke="#64748b" strokeWidth="2" markerEnd="url(#dbc-fr-arrow)" />

      <rect x="410" y="72" width="110" height="70" rx="8" fill="url(#dbc-fr-frontend)" opacity="0.74" />
      <text x="465" y="98" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">类型检查</text>
      <text x="465" y="116" textAnchor="middle" fontSize="10" fill="#bfdbfe">类型系统</text>
      <text x="465" y="132" textAnchor="middle" fontSize="10" fill="#bfdbfe">ch4</text>

      <path d="M520 107 L538 107" stroke="#64748b" strokeWidth="2" markerEnd="url(#dbc-fr-arrow)" />

      <rect x="540" y="72" width="110" height="70" rx="8" fill="url(#dbc-fr-middle)" opacity="0.95" />
      <text x="595" y="98" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">运行时</text>
      <text x="595" y="116" textAnchor="middle" fontSize="10" fill="#e9d5ff">活动记录</text>
      <text x="595" y="132" textAnchor="middle" fontSize="10" fill="#e9d5ff">ch5</text>

      <path d="M650 107 L668 107" stroke="#64748b" strokeWidth="2" markerEnd="url(#dbc-fr-arrow)" />

      <rect x="670" y="72" width="110" height="70" rx="8" fill="url(#dbc-fr-backend)" opacity="0.95" />
      <text x="725" y="98" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">代码生成</text>
      <text x="725" y="116" textAnchor="middle" fontSize="10" fill="#fef3c7">IR→目标码</text>
      <text x="725" y="132" textAnchor="middle" fontSize="10" fill="#fef3c7">ch6</text>

      {/* 第二行：优化 */}
      <path d="M725 142 L725 168 L75 168 L75 178" stroke="#64748b" strokeWidth="2" fill="none" markerEnd="url(#dbc-fr-arrow)" />

      <rect x="20" y="180" width="250" height="70" rx="8" fill="url(#dbc-fr-middle)" opacity="0.88" />
      <text x="145" y="206" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">机器无关优化</text>
      <text x="145" y="226" textAnchor="middle" fontSize="11" fill="#e9d5ff">数据流分析 / CSE / 常量传播</text>
      <text x="145" y="244" textAnchor="middle" fontSize="11" fill="#e9d5ff">循环优化 / 死代码消除 — ch7</text>

      <path d="M270 215 L288 215" stroke="#64748b" strokeWidth="2" markerEnd="url(#dbc-fr-arrow)" />

      <rect x="290" y="180" width="250" height="70" rx="8" fill="url(#dbc-fr-backend)" opacity="0.88" />
      <text x="415" y="206" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">机器相关优化</text>
      <text x="415" y="226" textAnchor="middle" fontSize="11" fill="#fef3c7">指令调度 / 寄存器分配</text>
      <text x="415" y="244" textAnchor="middle" fontSize="11" fill="#fef3c7">窥孔优化 / 缓存友好 — ch8</text>

      <path d="M540 215 L558 215" stroke="#64748b" strokeWidth="2" markerEnd="url(#dbc-fr-arrow)" />

      <rect x="560" y="180" width="220" height="70" rx="8" fill="url(#dbc-fr-review)" opacity="0.95" />
      <text x="670" y="206" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">知识整合</text>
      <text x="670" y="226" textAnchor="middle" fontSize="11" fill="#cffafe">端到端流程串联</text>
      <text x="670" y="244" textAnchor="middle" fontSize="11" fill="#cffafe">ch9</text>

      {/* 核心知识回顾 */}
      <text x="400" y="288" textAnchor="middle" fontSize="14" fontWeight="700" fill="#0f172a">核心知识串联</text>

      <rect x="30" y="302" width="240" height="90" rx="10" fill="#eff6ff" stroke="#2563eb" strokeWidth="1.5" />
      <text x="150" y="326" textAnchor="middle" fontSize="13" fontWeight="700" fill="#1e40af">前端：源码 → IR</text>
      <text x="150" y="348" textAnchor="middle" fontSize="11" fill="#475569">词法：正则→DFA→Token</text>
      <text x="150" y="368" textAnchor="middle" fontSize="11" fill="#475569">语法：CFG→LL/LR→AST</text>
      <text x="150" y="386" textAnchor="middle" fontSize="11" fill="#475569">语义：SDT+符号表→带类型IR</text>

      <rect x="290" y="302" width="240" height="90" rx="10" fill="#f5f3ff" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="410" y="326" textAnchor="middle" fontSize="13" fontWeight="700" fill="#5b21b6">中端：IR 优化</text>
      <text x="410" y="348" textAnchor="middle" fontSize="11" fill="#475569">数据流分析（不动点迭代）</text>
      <text x="410" y="368" textAnchor="middle" fontSize="11" fill="#475569">CSE / 常量传播 / DCE</text>
      <text x="410" y="386" textAnchor="middle" fontSize="11" fill="#475569">循环：外提 / 归纳 / 强度削弱</text>

      <rect x="550" y="302" width="220" height="90" rx="10" fill="#fffbeb" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="660" y="326" textAnchor="middle" fontSize="13" fontWeight="700" fill="#92400e">后端：IR → 机器码</text>
      <text x="660" y="348" textAnchor="middle" fontSize="11" fill="#475569">基本块 / 流图 / 活跃分析</text>
      <text x="660" y="368" textAnchor="middle" fontSize="11" fill="#475569">图着色寄存器分配</text>
      <text x="660" y="386" textAnchor="middle" fontSize="11" fill="#475569">指令调度 / 窥孔优化</text>

      {/* 关键洞察 */}
      <rect x="30" y="412" width="740" height="92" rx="10" fill="#f0fdf4" stroke="#059669" strokeWidth="2" />
      <text x="50" y="438" fontSize="14" fontWeight="700" fill="#065f46">龙书核心思想</text>
      <text x="50" y="462" fontSize="12" fill="#475569">编译器 = 分阶段翻译管道。每个阶段有明确的输入输出与职责边界，通过中间表示（IR）解耦前后端。</text>
      <text x="50" y="482" fontSize="12" fill="#475569">前端关注源语言（词法→语法→语义→类型），后端关注目标机器（代码生成→寄存器→调度），中端在 IR 层做机器无关优化。</text>
      <text x="50" y="500" fontSize="12" fill="#475569">优化的核心是数据流分析（保守近似 + 不动点迭代），在不改变语义的前提下产出更快更短的代码。</text>
    </svg>
  );
}
