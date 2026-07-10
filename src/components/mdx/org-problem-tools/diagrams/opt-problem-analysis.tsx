"use client";

export function OptProblemAnalysisDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="问题分析工具全景图">
      <defs>
        <linearGradient id="opt-pa-1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>
        <linearGradient id="opt-pa-2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#7c3aed" />
        </linearGradient>
        <marker id="opt-pa-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">问题分析工具 · 全景</text>

      {/* 5W2H 分析法 */}
      <rect x="30" y="56" width="220" height="130" rx="10" fill="url(#opt-pa-1)" opacity="0.1" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="140" y="78" textAnchor="middle" fontSize="13" fontWeight="700" fill="#0369a1">5W2H 分析法</text>
      <text x="140" y="98" textAnchor="middle" fontSize="10" fill="#475569">What 何事</text>
      <text x="140" y="114" textAnchor="middle" fontSize="10" fill="#475569">Why 何因</text>
      <text x="140" y="130" textAnchor="middle" fontSize="10" fill="#475569">Who 何人 / When 何时</text>
      <text x="140" y="146" textAnchor="middle" fontSize="10" fill="#475569">Where 何地</text>
      <text x="140" y="162" textAnchor="middle" fontSize="10" fill="#475569">How 如何 / How much 几何</text>
      <text x="140" y="178" textAnchor="middle" fontSize="9" fill="#0ea5e9">全面界定问题的七维度框架</text>

      {/* SWOT 分析 */}
      <rect x="290" y="56" width="220" height="130" rx="10" fill="url(#opt-pa-2)" opacity="0.1" stroke="#8b5cf6" strokeWidth="1.5" />
      <text x="400" y="78" textAnchor="middle" fontSize="13" fontWeight="700" fill="#7c3aed">SWOT 分析</text>
      <rect x="300" y="88" width="98" height="38" rx="6" fill="#10b981" opacity="0.15" stroke="#10b981" strokeWidth="1" />
      <text x="349" y="103" textAnchor="middle" fontSize="9" fontWeight="600" fill="#059669">S 优势</text>
      <text x="349" y="118" textAnchor="middle" fontSize="8" fill="#475569">内部正向</text>
      <rect x="402" y="88" width="98" height="38" rx="6" fill="#ef4444" opacity="0.15" stroke="#ef4444" strokeWidth="1" />
      <text x="451" y="103" textAnchor="middle" fontSize="9" fontWeight="600" fill="#dc2626">W 劣势</text>
      <text x="451" y="118" textAnchor="middle" fontSize="8" fill="#475569">内部负向</text>
      <rect x="300" y="130" width="98" height="38" rx="6" fill="#0ea5e9" opacity="0.15" stroke="#0ea5e9" strokeWidth="1" />
      <text x="349" y="145" textAnchor="middle" fontSize="9" fontWeight="600" fill="#0284c7">O 机会</text>
      <text x="349" y="160" textAnchor="middle" fontSize="8" fill="#475569">外部正向</text>
      <rect x="402" y="130" width="98" height="38" rx="6" fill="#f59e0b" opacity="0.15" stroke="#f59e0b" strokeWidth="1" />
      <text x="451" y="145" textAnchor="middle" fontSize="9" fontWeight="600" fill="#d97706">T 威胁</text>
      <text x="451" y="160" textAnchor="middle" fontSize="8" fill="#475569">外部负向</text>
      <text x="400" y="178" textAnchor="middle" fontSize="9" fill="#8b5cf6">内外结合的战略态势矩阵</text>

      {/* 力场分析 */}
      <rect x="550" y="56" width="220" height="130" rx="10" fill="url(#opt-pa-1)" opacity="0.1" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="660" y="78" textAnchor="middle" fontSize="13" fontWeight="700" fill="#0369a1">力场分析</text>
      <text x="585" y="100" fontSize="9" fill="#10b981">驱动力 ↑</text>
      <rect x="585" y="106" width="70" height="16" rx="4" fill="#10b981" opacity="0.2" />
      <text x="620" y="118" textAnchor="middle" fontSize="8" fill="#059669">推动变革</text>
      <rect x="585" y="126" width="55" height="16" rx="4" fill="#10b981" opacity="0.15" />
      <text x="612" y="138" textAnchor="middle" fontSize="8" fill="#059669">资源支持</text>
      <line x1="660" y1="88" x2="660" y2="160" stroke="#475569" strokeWidth="2" />
      <text x="660" y="130" textAnchor="middle" fontSize="8" fill="#475569">现状</text>
      <text x="695" y="100" fontSize="9" fill="#ef4444">阻力 ↓</text>
      <rect x="665" y="106" width="70" height="16" rx="4" fill="#ef4444" opacity="0.2" />
      <text x="700" y="118" textAnchor="middle" fontSize="8" fill="#dc2626">习惯阻力</text>
      <rect x="665" y="126" width="55" height="16" rx="4" fill="#ef4444" opacity="0.15" />
      <text x="692" y="138" textAnchor="middle" fontSize="8" fill="#dc2626">成本压力</text>
      <text x="660" y="178" textAnchor="middle" fontSize="9" fill="#0ea5e9">变革力与阻力的动态平衡</text>

      {/* 中部：MECE 原则 */}
      <rect x="180" y="210" width="440" height="60" rx="10" fill="#f1f5f9" stroke="#475569" strokeWidth="1.5" />
      <text x="400" y="234" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">MECE 原则：相互独立、完全穷尽</text>
      <text x="400" y="254" textAnchor="middle" fontSize="10" fill="#64748b">所有分析工具的底层思维——不重叠、不遗漏</text>

      <path d="M400 270 L400 280" stroke="#64748b" strokeWidth="2" markerEnd="url(#opt-pa-arrow)" />

      {/* 下部：问题分析流程 */}
      <text x="400" y="300" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">问题分析四步流程</text>

      <rect x="30" y="314" width="160" height="56" rx="8" fill="url(#opt-pa-1)" opacity="0.15" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="110" y="336" textAnchor="middle" fontSize="11" fontWeight="600" fill="#0369a1">第一步：界定</text>
      <text x="110" y="356" textAnchor="middle" fontSize="9" fill="#475569">用5W2H描述问题</text>

      <path d="M190 342 L208 342" stroke="#64748b" strokeWidth="2" markerEnd="url(#opt-pa-arrow)" />

      <rect x="212" y="314" width="160" height="56" rx="8" fill="url(#opt-pa-2)" opacity="0.15" stroke="#8b5cf6" strokeWidth="1.5" />
      <text x="292" y="336" textAnchor="middle" fontSize="11" fontWeight="600" fill="#7c3aed">第二步：拆解</text>
      <text x="292" y="356" textAnchor="middle" fontSize="9" fill="#475569">用MECE分解结构</text>

      <path d="M372 342 L390 342" stroke="#64748b" strokeWidth="2" markerEnd="url(#opt-pa-arrow)" />

      <rect x="394" y="314" width="160" height="56" rx="8" fill="url(#opt-pa-1)" opacity="0.15" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="474" y="336" textAnchor="middle" fontSize="11" fontWeight="600" fill="#0369a1">第三步：分析</text>
      <text x="474" y="356" textAnchor="middle" fontSize="9" fill="#475569">用SWOT评估态势</text>

      <path d="M554 342 L572 342" stroke="#64748b" strokeWidth="2" markerEnd="url(#opt-pa-arrow)" />

      <rect x="576" y="314" width="194" height="56" rx="8" fill="url(#opt-pa-2)" opacity="0.15" stroke="#8b5cf6" strokeWidth="1.5" />
      <text x="673" y="336" textAnchor="middle" fontSize="11" fontWeight="600" fill="#7c3aed">第四步：判断</text>
      <text x="673" y="356" textAnchor="middle" fontSize="9" fill="#475569">用力场分析定方向</text>

      {/* 底部：工具选择指南 */}
      <rect x="30" y="396" width="740" height="170" rx="10" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="400" y="420" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">工具选择指南</text>

      <rect x="50" y="436" width="340" height="34" rx="6" fill="#eff6ff" stroke="#0ea5e9" strokeWidth="1" />
      <text x="60" y="457" fontSize="10" fontWeight="600" fill="#0369a1">问题不清晰 →</text>
      <text x="160" y="457" fontSize="10" fill="#475569">先用 5W2H 界定，再用 MECE 拆解</text>

      <rect x="410" y="436" width="340" height="34" rx="6" fill="#f5f3ff" stroke="#8b5cf6" strokeWidth="1" />
      <text x="420" y="457" fontSize="10" fontWeight="600" fill="#7c3aed">需战略判断 →</text>
      <text x="510" y="457" fontSize="10" fill="#475569">用 SWOT 分析内外态势</text>

      <rect x="50" y="478" width="340" height="34" rx="6" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1" />
      <text x="60" y="499" fontSize="10" fontWeight="600" fill="#d97706">面临变革 →</text>
      <text x="140" y="499" fontSize="10" fill="#475569">用力场分析识别驱动力与阻力</text>

      <rect x="410" y="478" width="340" height="34" rx="6" fill="#d1fae5" stroke="#10b981" strokeWidth="1" />
      <text x="420" y="499" fontSize="10" fontWeight="600" fill="#059669">复杂问题 →</text>
      <text x="500" y="499" fontSize="10" fill="#475569">多种工具组合使用，先界定再拆解</text>

      <rect x="50" y="520" width="700" height="34" rx="6" fill="#f1f5f9" stroke="#475569" strokeWidth="1" />
      <text x="400" y="541" textAnchor="middle" fontSize="10" fontWeight="600" fill="#334155">核心原则：先界定再分析，先拆解再判断——问题定义的质量决定解决方案的质量</text>
    </svg>
  );
}
