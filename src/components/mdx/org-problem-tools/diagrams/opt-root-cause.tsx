"use client";

export function OptRootCauseDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="根因分析工具全景图">
      <defs>
        <linearGradient id="opt-rc-1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>
        <linearGradient id="opt-rc-2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#7c3aed" />
        </linearGradient>
        <linearGradient id="opt-rc-3" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <marker id="opt-rc-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">根因分析工具 · 全景</text>

      {/* 5 Whys 追问链 */}
      <text x="180" y="62" textAnchor="middle" fontSize="14" fontWeight="700" fill="#0369a1">5 Whys 追问链</text>
      <rect x="40" y="72" width="280" height="32" rx="8" fill="url(#opt-rc-1)" opacity="0.12" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="60" y="92" fontSize="10" fontWeight="600" fill="#0369a1">为什么1</text>
      <text x="120" y="92" fontSize="10" fill="#475569">设备停机了</text>
      <path d="M180 104 L180 112" stroke="#64748b" strokeWidth="2" markerEnd="url(#opt-rc-arrow)" />
      <rect x="40" y="116" width="280" height="32" rx="8" fill="url(#opt-rc-1)" opacity="0.15" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="60" y="136" fontSize="10" fontWeight="600" fill="#0369a1">为什么2</text>
      <text x="120" y="136" fontSize="10" fill="#475569">电机过载保护触发</text>
      <path d="M180 148 L180 156" stroke="#64748b" strokeWidth="2" markerEnd="url(#opt-rc-arrow)" />
      <rect x="40" y="160" width="280" height="32" rx="8" fill="url(#opt-rc-1)" opacity="0.18" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="60" y="180" fontSize="10" fontWeight="600" fill="#0369a1">为什么3</text>
      <text x="120" y="180" fontSize="10" fill="#475569">轴承润滑不足</text>
      <path d="M180 192 L180 200" stroke="#64748b" strokeWidth="2" markerEnd="url(#opt-rc-arrow)" />
      <rect x="40" y="204" width="280" height="32" rx="8" fill="url(#opt-rc-1)" opacity="0.21" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="60" y="224" fontSize="10" fontWeight="600" fill="#0369a1">为什么4</text>
      <text x="120" y="224" fontSize="10" fill="#475569">润滑泵未及时维护</text>
      <path d="M180 236 L180 244" stroke="#64748b" strokeWidth="2" markerEnd="url(#opt-rc-arrow)" />
      <rect x="40" y="248" width="280" height="32" rx="8" fill="url(#opt-rc-1)" opacity="0.25" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="60" y="268" fontSize="10" fontWeight="700" fill="#0284c7">为什么5</text>
      <text x="120" y="268" fontSize="10" fontWeight="600" fill="#0284c7">维护计划缺失（根因）</text>
      <text x="180" y="300" textAnchor="middle" fontSize="9" fill="#0ea5e9">逐层追问，从表象穿透到根因</text>

      {/* 鱼骨图 */}
      <text x="600" y="62" textAnchor="middle" fontSize="14" fontWeight="700" fill="#7c3aed">鱼骨图（石川图）</text>
      <line x1="440" y1="170" x2="740" y2="170" stroke="#475569" strokeWidth="2.5" />
      <rect x="730" y="158" width="80" height="24" rx="6" fill="#ef4444" opacity="0.15" stroke="#ef4444" strokeWidth="1.5" />
      <text x="770" y="174" textAnchor="middle" fontSize="10" fontWeight="600" fill="#dc2626">问题</text>
      {/* 上方分支 */}
      <line x1="500" y1="170" x2="480" y2="100" stroke="#8b5cf6" strokeWidth="1.5" />
      <text x="470" y="96" textAnchor="middle" fontSize="10" fontWeight="600" fill="#7c3aed">人</text>
      <text x="510" y="130" fontSize="9" fill="#475569">操作失误</text>
      <text x="510" y="146" fontSize="9" fill="#475569">技能不足</text>
      <line x1="620" y1="170" x2="600" y2="100" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="590" y="96" textAnchor="middle" fontSize="10" fontWeight="600" fill="#0369a1">机</text>
      <text x="630" y="130" fontSize="9" fill="#475569">设备老化</text>
      <text x="630" y="146" fontSize="9" fill="#475569">精度下降</text>
      {/* 下方分支 */}
      <line x1="500" y1="170" x2="480" y2="240" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="470" y="258" textAnchor="middle" fontSize="10" fontWeight="600" fill="#d97706">料</text>
      <text x="510" y="200" fontSize="9" fill="#475569">材料不合格</text>
      <text x="510" y="216" fontSize="9" fill="#475569">批次差异</text>
      <line x1="620" y1="170" x2="600" y2="240" stroke="#10b981" strokeWidth="1.5" />
      <text x="590" y="258" textAnchor="middle" fontSize="10" fontWeight="600" fill="#059669">法</text>
      <text x="630" y="200" fontSize="9" fill="#475569">流程缺陷</text>
      <text x="630" y="216" fontSize="9" fill="#475569">标准缺失</text>
      <text x="600" y="300" textAnchor="middle" fontSize="9" fill="#7c3aed">4M维度系统化归因</text>

      {/* 帕累托图 */}
      <text x="180" y="330" textAnchor="middle" fontSize="14" fontWeight="700" fill="#d97706">帕累托图（80/20法则）</text>
      <rect x="40" y="340" width="340" height="140" rx="8" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      {/* 柱状图 */}
      <rect x="60" y="376" width="40" height="84" fill="#f59e0b" opacity="0.8" />
      <text x="80" y="392" textAnchor="middle" fontSize="9" fill="#fff">42%</text>
      <rect x="110" y="406" width="40" height="54" fill="#f59e0b" opacity="0.6" />
      <text x="130" y="422" textAnchor="middle" fontSize="9" fill="#fff">27%</text>
      <rect x="160" y="436" width="40" height="24" fill="#f59e0b" opacity="0.4" />
      <text x="180" y="450" textAnchor="middle" fontSize="9" fill="#fff">12%</text>
      <rect x="210" y="448" width="40" height="12" fill="#f59e0b" opacity="0.3" />
      <text x="230" y="458" textAnchor="middle" fontSize="8" fill="#475569">8%</text>
      <rect x="260" y="455" width="40" height="5" fill="#f59e0b" opacity="0.2" />
      <text x="280" y="468" textAnchor="middle" fontSize="8" fill="#475569">6%</text>
      <rect x="310" y="458" width="40" height="2" fill="#f59e0b" opacity="0.15" />
      <text x="330" y="468" textAnchor="middle" fontSize="8" fill="#475569">5%</text>
      <line x1="40" y1="460" x2="380" y2="460" stroke="#475569" strokeWidth="1" />
      {/* 累计折线 */}
      <polyline points="80,396 130,388 180,392 230,410 280,436 330,452" fill="none" stroke="#0ea5e9" strokeWidth="2" />
      <text x="130" y="382" fontSize="8" fill="#0ea5e9">累计69%</text>
      <text x="180" y="476" textAnchor="middle" fontSize="9" fill="#475569">前2项占69%——优先解决关键少数</text>

      {/* 故障树分析 */}
      <text x="600" y="330" textAnchor="middle" fontSize="14" fontWeight="700" fill="#059669">故障树分析（FTA）</text>
      <rect x="520" y="340" width="160" height="34" rx="8" fill="#ef4444" opacity="0.15" stroke="#ef4444" strokeWidth="1.5" />
      <text x="600" y="361" textAnchor="middle" fontSize="11" fontWeight="600" fill="#dc2626">顶事件：系统失效</text>
      <line x1="600" y1="374" x2="540" y2="394" stroke="#64748b" strokeWidth="1.5" />
      <line x1="600" y1="374" x2="660" y2="394" stroke="#64748b" strokeWidth="1.5" />
      <text x="575" y="388" fontSize="9" fill="#64748b">或</text>
      <rect x="480" y="394" width="120" height="30" rx="6" fill="url(#opt-rc-2)" opacity="0.12" stroke="#8b5cf6" strokeWidth="1.5" />
      <text x="540" y="413" textAnchor="middle" fontSize="10" fill="#7c3aed">中间事件A</text>
      <rect x="600" y="394" width="120" height="30" rx="6" fill="url(#opt-rc-2)" opacity="0.12" stroke="#8b5cf6" strokeWidth="1.5" />
      <text x="660" y="413" textAnchor="middle" fontSize="10" fill="#7c3aed">中间事件B</text>
      <line x1="540" y1="424" x2="510" y2="444" stroke="#64748b" strokeWidth="1.5" />
      <line x1="540" y1="424" x2="570" y2="444" stroke="#64748b" strokeWidth="1.5" />
      <line x1="660" y1="424" x2="630" y2="444" stroke="#64748b" strokeWidth="1.5" />
      <line x1="660" y1="424" x2="690" y2="444" stroke="#64748b" strokeWidth="1.5" />
      <circle cx="510" cy="450" r="14" fill="#ef4444" opacity="0.2" stroke="#ef4444" strokeWidth="1.5" />
      <text x="510" y="454" textAnchor="middle" fontSize="8" fill="#dc2626">底事件</text>
      <circle cx="570" cy="450" r="14" fill="#ef4444" opacity="0.2" stroke="#ef4444" strokeWidth="1.5" />
      <text x="570" y="454" textAnchor="middle" fontSize="8" fill="#dc2626">底事件</text>
      <circle cx="630" cy="450" r="14" fill="#ef4444" opacity="0.2" stroke="#ef4444" strokeWidth="1.5" />
      <text x="630" y="454" textAnchor="middle" fontSize="8" fill="#dc2626">底事件</text>
      <circle cx="690" cy="450" r="14" fill="#ef4444" opacity="0.2" stroke="#ef4444" strokeWidth="1.5" />
      <text x="690" y="454" textAnchor="middle" fontSize="8" fill="#dc2626">底事件</text>
      <text x="600" y="484" textAnchor="middle" fontSize="9" fill="#059669">从顶到底逐层分解故障逻辑</text>

      {/* 底部总结 */}
      <rect x="40" y="500" width="720" height="60" rx="10" fill="url(#opt-rc-1)" opacity="0.08" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="400" y="522" textAnchor="middle" fontSize="12" fontWeight="700" fill="#0369a1">根因分析核心逻辑</text>
      <text x="400" y="544" textAnchor="middle" fontSize="10" fill="#475569">表层现象 → 逐层追问（5 Whys） → 系统归因（鱼骨图） → 量化排序（帕累托） → 逻辑分解（故障树） → 定位根因</text>
    </svg>
  );
}
