"use client";

export function OptProcessImprovementDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="流程改善工具全景图">
      <defs>
        <linearGradient id="opt-pi-1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>
        <linearGradient id="opt-pi-2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#7c3aed" />
        </linearGradient>
        <linearGradient id="opt-pi-3" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <marker id="opt-pi-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">流程改善工具 · 全景</text>

      {/* PDCA 循环 */}
      <text x="400" y="62" textAnchor="middle" fontSize="14" fontWeight="700" fill="#0369a1">PDCA 循环（持续改进引擎）</text>
      <circle cx="200" cy="160" r="90" fill="none" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="4 3" />
      <path d="M200 70 A90 90 0 0 1 290 160" fill="none" stroke="#0ea5e9" strokeWidth="12" strokeLinecap="round" />
      <path d="M290 160 A90 90 0 0 1 200 250" fill="none" stroke="#8b5cf6" strokeWidth="12" strokeLinecap="round" />
      <path d="M200 250 A90 90 0 0 1 110 160" fill="none" stroke="#f59e0b" strokeWidth="12" strokeLinecap="round" />
      <path d="M110 160 A90 90 0 0 1 200 70" fill="none" stroke="#10b981" strokeWidth="12" strokeLinecap="round" />
      <text x="250" y="100" textAnchor="middle" fontSize="13" fontWeight="700" fill="#0284c7">P 计划</text>
      <text x="250" y="116" textAnchor="middle" fontSize="9" fill="#475569">制定目标方案</text>
      <text x="265" y="200" textAnchor="middle" fontSize="13" fontWeight="700" fill="#7c3aed">D 执行</text>
      <text x="265" y="216" textAnchor="middle" fontSize="9" fill="#475569">实施方案</text>
      <text x="135" y="200" textAnchor="middle" fontSize="13" fontWeight="700" fill="#d97706">C 检查</text>
      <text x="135" y="216" textAnchor="middle" fontSize="9" fill="#475569">评估效果</text>
      <text x="150" y="100" textAnchor="middle" fontSize="13" fontWeight="700" fill="#059669">A 改进</text>
      <text x="150" y="116" textAnchor="middle" fontSize="9" fill="#475569">标准化推广</text>
      <path d="M200 60 L200 52" stroke="#64748b" strokeWidth="2" markerEnd="url(#opt-pi-arrow)" />
      <text x="200" y="46" textAnchor="middle" fontSize="9" fill="#64748b">循环上升</text>
      <text x="200" y="276" textAnchor="middle" fontSize="9" fill="#0ea5e9">每轮循环上升一个台阶</text>

      {/* 六西格玛 DMAIC */}
      <text x="560" y="62" textAnchor="middle" fontSize="14" fontWeight="700" fill="#7c3aed">六西格玛 DMAIC</text>
      <rect x="340" y="72" width="440" height="200" rx="10" fill="url(#opt-pi-2)" opacity="0.06" stroke="#8b5cf6" strokeWidth="1.5" />
      <rect x="355" y="88" width="80" height="56" rx="6" fill="#0ea5e9" opacity="0.15" stroke="#0ea5e9" strokeWidth="1" />
      <text x="395" y="108" textAnchor="middle" fontSize="11" fontWeight="700" fill="#0284c7">D 定义</text>
      <text x="395" y="126" textAnchor="middle" fontSize="8" fill="#475569">确定问题</text>
      <text x="395" y="138" textAnchor="middle" fontSize="8" fill="#475569">客户需求</text>
      <path d="M435 116 L449 116" stroke="#64748b" strokeWidth="2" markerEnd="url(#opt-pi-arrow)" />
      <rect x="453" y="88" width="80" height="56" rx="6" fill="#8b5cf6" opacity="0.15" stroke="#8b5cf6" strokeWidth="1" />
      <text x="493" y="108" textAnchor="middle" fontSize="11" fontWeight="700" fill="#7c3aed">M 测量</text>
      <text x="493" y="126" textAnchor="middle" fontSize="8" fill="#475569">收集数据</text>
      <text x="493" y="138" textAnchor="middle" fontSize="8" fill="#475569">基线绩效</text>
      <path d="M533 116 L547 116" stroke="#64748b" strokeWidth="2" markerEnd="url(#opt-pi-arrow)" />
      <rect x="551" y="88" width="80" height="56" rx="6" fill="#f59e0b" opacity="0.15" stroke="#f59e0b" strokeWidth="1" />
      <text x="591" y="108" textAnchor="middle" fontSize="11" fontWeight="700" fill="#d97706">A 分析</text>
      <text x="591" y="126" textAnchor="middle" fontSize="8" fill="#475569">识别根因</text>
      <text x="591" y="138" textAnchor="middle" fontSize="8" fill="#475569">关键因素</text>
      <path d="M631 116 L645 116" stroke="#64748b" strokeWidth="2" markerEnd="url(#opt-pi-arrow)" />
      <rect x="649" y="88" width="80" height="56" rx="6" fill="#10b981" opacity="0.15" stroke="#10b981" strokeWidth="1" />
      <text x="689" y="108" textAnchor="middle" fontSize="11" fontWeight="700" fill="#059669">I 改进</text>
      <text x="689" y="126" textAnchor="middle" fontSize="8" fill="#475569">实施方案</text>
      <text x="689" y="138" textAnchor="middle" fontSize="8" fill="#475569">优化流程</text>
      <path d="M689 144 L689 158" stroke="#64748b" strokeWidth="2" markerEnd="url(#opt-pi-arrow)" />
      <rect x="649" y="162" width="80" height="56" rx="6" fill="#ef4444" opacity="0.15" stroke="#ef4444" strokeWidth="1" />
      <text x="689" y="182" textAnchor="middle" fontSize="11" fontWeight="700" fill="#dc2626">C 控制</text>
      <text x="689" y="200" textAnchor="middle" fontSize="8" fill="#475569">监控维持</text>
      <text x="689" y="212" textAnchor="middle" fontSize="8" fill="#475569">标准化</text>
      <text x="500" y="246" textAnchor="middle" fontSize="9" fill="#7c3aed">目标：每百万次缺陷不超过3.4（6σ水平）</text>
      <text x="500" y="262" textAnchor="middle" fontSize="9" fill="#475569">DMAIC五步法降低变异、提升质量</text>

      {/* 精益生产 */}
      <text x="200" y="300" textAnchor="middle" fontSize="14" fontWeight="700" fill="#d97706">精益生产（消除七大浪费）</text>
      <rect x="40" y="310" width="320" height="150" rx="10" fill="url(#opt-pi-3)" opacity="0.06" stroke="#f59e0b" strokeWidth="1.5" />
      <rect x="56" y="324" width="85" height="28" rx="6" fill="#f59e0b" opacity="0.15" stroke="#f59e0b" strokeWidth="1" />
      <text x="98" y="342" textAnchor="middle" fontSize="9" fill="#d97706">过量生产</text>
      <rect x="151" y="324" width="85" height="28" rx="6" fill="#f59e0b" opacity="0.15" stroke="#f59e0b" strokeWidth="1" />
      <text x="193" y="342" textAnchor="middle" fontSize="9" fill="#d97706">等待</text>
      <rect x="246" y="324" width="85" height="28" rx="6" fill="#f59e0b" opacity="0.15" stroke="#f59e0b" strokeWidth="1" />
      <text x="288" y="342" textAnchor="middle" fontSize="9" fill="#d97706">搬运</text>
      <rect x="56" y="360" width="85" height="28" rx="6" fill="#f59e0b" opacity="0.15" stroke="#f59e0b" strokeWidth="1" />
      <text x="98" y="378" textAnchor="middle" fontSize="9" fill="#d97706">过度加工</text>
      <rect x="151" y="360" width="85" height="28" rx="6" fill="#f59e0b" opacity="0.15" stroke="#f59e0b" strokeWidth="1" />
      <text x="193" y="378" textAnchor="middle" fontSize="9" fill="#d97706">库存</text>
      <rect x="246" y="360" width="85" height="28" rx="6" fill="#f59e0b" opacity="0.15" stroke="#f59e0b" strokeWidth="1" />
      <text x="288" y="378" textAnchor="middle" fontSize="9" fill="#d97706">动作</text>
      <rect x="56" y="396" width="85" height="28" rx="6" fill="#f59e0b" opacity="0.15" stroke="#f59e0b" strokeWidth="1" />
      <text x="98" y="414" textAnchor="middle" fontSize="9" fill="#d97706">不良品</text>
      <rect x="151" y="396" width="180" height="28" rx="6" fill="#10b981" opacity="0.15" stroke="#10b981" strokeWidth="1" />
      <text x="241" y="414" textAnchor="middle" fontSize="9" fontWeight="600" fill="#059669">消除浪费 = 创造价值</text>
      <text x="200" y="446" textAnchor="middle" fontSize="9" fill="#d97706">只做客户愿意买单的事</text>

      {/* 价值流图 + 看板 */}
      <text x="560" y="300" textAnchor="middle" fontSize="14" fontWeight="700" fill="#059669">价值流图与看板</text>
      <rect x="380" y="310" width="400" height="150" rx="10" fill="#f8fafc" stroke="#475569" strokeWidth="1.5" />
      {/* 价值流图 */}
      <text x="560" y="330" textAnchor="middle" fontSize="10" fontWeight="600" fill="#334155">价值流图（VSM）</text>
      <rect x="395" y="338" width="60" height="40" rx="4" fill="#0ea5e9" opacity="0.15" stroke="#0ea5e9" strokeWidth="1" />
      <text x="425" y="356" textAnchor="middle" fontSize="8" fill="#0369a1">供应商</text>
      <text x="425" y="370" textAnchor="middle" fontSize="7" fill="#475569">2天</text>
      <path d="M455 358 L471 358" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#opt-pi-arrow)" />
      <rect x="475" y="338" width="60" height="40" rx="4" fill="#f59e0b" opacity="0.15" stroke="#f59e0b" strokeWidth="1" />
      <text x="505" y="356" textAnchor="middle" fontSize="8" fill="#d97706">加工</text>
      <text x="505" y="370" textAnchor="middle" fontSize="7" fill="#475569">1天</text>
      <path d="M535 358 L551 358" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#opt-pi-arrow)" />
      <rect x="555" y="338" width="60" height="40" rx="4" fill="#f59e0b" opacity="0.15" stroke="#f59e0b" strokeWidth="1" />
      <text x="585" y="356" textAnchor="middle" fontSize="8" fill="#d97706">装配</text>
      <text x="585" y="370" textAnchor="middle" fontSize="7" fill="#475569">0.5天</text>
      <path d="M615 358 L631 358" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#opt-pi-arrow)" />
      <rect x="635" y="338" width="60" height="40" rx="4" fill="#0ea5e9" opacity="0.15" stroke="#0ea5e9" strokeWidth="1" />
      <text x="665" y="356" textAnchor="middle" fontSize="8" fill="#0369a1">客户</text>
      <text x="665" y="370" textAnchor="middle" fontSize="7" fill="#475569">1天</text>
      <line x1="395" y1="390" x2="695" y2="390" stroke="#ef4444" strokeWidth="1" strokeDasharray="3 2" />
      <text x="545" y="404" textAnchor="middle" fontSize="8" fill="#ef4444">等待时间：4.5天（非增值）</text>
      <text x="545" y="418" textAnchor="middle" fontSize="8" fill="#10b981">增值时间：1.5天（占25%）</text>
      {/* 看板 */}
      <rect x="395" y="428" width="370" height="22" rx="4" fill="#10b981" opacity="0.1" stroke="#10b981" strokeWidth="1" />
      <text x="580" y="443" textAnchor="middle" fontSize="9" fontWeight="600" fill="#059669">看板管理：拉动式生产，按需补充，控制在制品</text>

      {/* 底部：改善工具对比 */}
      <rect x="40" y="480" width="720" height="80" rx="10" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="400" y="500" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">改善工具选择指南</text>
      <rect x="60" y="510" width="220" height="24" rx="4" fill="#eff6ff" stroke="#0ea5e9" strokeWidth="1" />
      <text x="170" y="526" textAnchor="middle" fontSize="9" fill="#0369a1">日常改进 → PDCA循环</text>
      <rect x="290" y="510" width="220" height="24" rx="4" fill="#f5f3ff" stroke="#8b5cf6" strokeWidth="1" />
      <text x="400" y="526" textAnchor="middle" fontSize="9" fill="#7c3aed">质量缺陷 → 六西格玛DMAIC</text>
      <rect x="520" y="510" width="220" height="24" rx="4" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1" />
      <text x="630" y="526" textAnchor="middle" fontSize="9" fill="#d97706">效率提升 → 精益+价值流图</text>
      <rect x="60" y="540" width="680" height="14" rx="4" fill="url(#opt-pi-1)" opacity="0.08" stroke="#0ea5e9" strokeWidth="1" />
      <text x="400" y="551" textAnchor="middle" fontSize="9" fontWeight="600" fill="#0369a1">核心原则：消除浪费、降低变异、持续循环——改善永无终点</text>
    </svg>
  );
}
