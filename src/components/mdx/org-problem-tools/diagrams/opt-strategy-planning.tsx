"use client";

export function OptStrategyPlanningDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="战略规划工具全景图">
      <defs>
        <linearGradient id="opt-sp-1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>
        <linearGradient id="opt-sp-2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#7c3aed" />
        </linearGradient>
        <linearGradient id="opt-sp-3" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <marker id="opt-sp-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">战略规划工具 · 全景</text>

      {/* PEST 分析 */}
      <text x="160" y="62" textAnchor="middle" fontSize="13" fontWeight="700" fill="#0369a1">PEST 分析（宏观环境）</text>
      <rect x="40" y="72" width="240" height="170" rx="10" fill="url(#opt-sp-1)" opacity="0.08" stroke="#0ea5e9" strokeWidth="1.5" />
      <rect x="56" y="88" width="100" height="64" rx="6" fill="#0ea5e9" opacity="0.15" stroke="#0ea5e9" strokeWidth="1" />
      <text x="106" y="108" textAnchor="middle" fontSize="12" fontWeight="700" fill="#0284c7">P 政治</text>
      <text x="106" y="126" textAnchor="middle" fontSize="8" fill="#475569">政策法规</text>
      <text x="106" y="140" textAnchor="middle" fontSize="8" fill="#475569">政治稳定</text>
      <rect x="164" y="88" width="100" height="64" rx="6" fill="#8b5cf6" opacity="0.15" stroke="#8b5cf6" strokeWidth="1" />
      <text x="214" y="108" textAnchor="middle" fontSize="12" fontWeight="700" fill="#7c3aed">E 经济</text>
      <text x="214" y="126" textAnchor="middle" fontSize="8" fill="#475569">增长率</text>
      <text x="214" y="140" textAnchor="middle" fontSize="8" fill="#475569">利率汇率</text>
      <rect x="56" y="160" width="100" height="64" rx="6" fill="#f59e0b" opacity="0.15" stroke="#f59e0b" strokeWidth="1" />
      <text x="106" y="180" textAnchor="middle" fontSize="12" fontWeight="700" fill="#d97706">S 社会</text>
      <text x="106" y="198" textAnchor="middle" fontSize="8" fill="#475569">人口结构</text>
      <text x="106" y="212" textAnchor="middle" fontSize="8" fill="#475569">消费观念</text>
      <rect x="164" y="160" width="100" height="64" rx="6" fill="#10b981" opacity="0.15" stroke="#10b981" strokeWidth="1" />
      <text x="214" y="180" textAnchor="middle" fontSize="12" fontWeight="700" fill="#059669">T 技术</text>
      <text x="214" y="198" textAnchor="middle" fontSize="8" fill="#475569">技术趋势</text>
      <text x="214" y="212" textAnchor="middle" fontSize="8" fill="#475569">研发投入</text>
      <text x="160" y="234" textAnchor="middle" fontSize="9" fill="#0ea5e9">扫描外部宏观四维度</text>

      {/* 波特五力 */}
      <text x="540" y="62" textAnchor="middle" fontSize="13" fontWeight="700" fill="#7c3aed">波特五力模型</text>
      <rect x="320" y="72" width="440" height="170" rx="10" fill="url(#opt-sp-2)" opacity="0.06" stroke="#8b5cf6" strokeWidth="1.5" />
      <rect x="450" y="120" width="180" height="50" rx="8" fill="#8b5cf6" opacity="0.2" stroke="#8b5cf6" strokeWidth="1.5" />
      <text x="540" y="140" textAnchor="middle" fontSize="11" fontWeight="700" fill="#7c3aed">行业内竞争</text>
      <text x="540" y="158" textAnchor="middle" fontSize="9" fill="#475569">核心战场</text>
      <rect x="340" y="88" width="90" height="30" rx="6" fill="#0ea5e9" opacity="0.15" stroke="#0ea5e9" strokeWidth="1" />
      <text x="385" y="107" textAnchor="middle" fontSize="9" fill="#0369a1">新进入者</text>
      <line x1="430" y1="118" x2="450" y2="130" stroke="#64748b" strokeWidth="1" markerEnd="url(#opt-sp-arrow)" />
      <rect x="650" y="88" width="90" height="30" rx="6" fill="#f59e0b" opacity="0.15" stroke="#f59e0b" strokeWidth="1" />
      <text x="695" y="107" textAnchor="middle" fontSize="9" fill="#d97706">替代品</text>
      <line x1="650" y1="118" x2="630" y2="130" stroke="#64748b" strokeWidth="1" markerEnd="url(#opt-sp-arrow)" />
      <rect x="340" y="178" width="90" height="30" rx="6" fill="#10b981" opacity="0.15" stroke="#10b981" strokeWidth="1" />
      <text x="385" y="197" textAnchor="middle" fontSize="9" fill="#059669">供应商</text>
      <line x1="430" y1="178" x2="450" y2="166" stroke="#64748b" strokeWidth="1" markerEnd="url(#opt-sp-arrow)" />
      <rect x="650" y="178" width="90" height="30" rx="6" fill="#ef4444" opacity="0.15" stroke="#ef4444" strokeWidth="1" />
      <text x="695" y="197" textAnchor="middle" fontSize="9" fill="#dc2626">买方</text>
      <line x1="650" y1="178" x2="630" y2="166" stroke="#64748b" strokeWidth="1" markerEnd="url(#opt-sp-arrow)" />
      <text x="540" y="234" textAnchor="middle" fontSize="9" fill="#7c3aed">五力决定行业利润空间</text>

      {/* 波士顿矩阵 */}
      <text x="180" y="276" textAnchor="middle" fontSize="13" fontWeight="700" fill="#d97706">波士顿矩阵（BCG）</text>
      <rect x="40" y="286" width="280" height="150" rx="10" fill="#f8fafc" stroke="#475569" strokeWidth="1.5" />
      <line x1="180" y1="286" x2="180" y2="436" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="4 3" />
      <line x1="40" y1="361" x2="320" y2="361" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="4 3" />
      <text x="50" y="298" fontSize="8" fill="#64748b">高</text>
      <text x="50" y="430" fontSize="8" fill="#64748b">低</text>
      <text x="50" y="350" fontSize="8" fill="#64748b" transform="rotate(-90 50 350)">市场份额</text>
      <rect x="56" y="300" width="110" height="55" rx="6" fill="#10b981" opacity="0.2" stroke="#10b981" strokeWidth="1.5" />
      <text x="111" y="320" textAnchor="middle" fontSize="10" fontWeight="700" fill="#059669">明星</text>
      <text x="111" y="338" textAnchor="middle" fontSize="8" fill="#475569">高增长高份额</text>
      <rect x="194" y="300" width="110" height="55" rx="6" fill="#0ea5e9" opacity="0.2" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="249" y="320" textAnchor="middle" fontSize="10" fontWeight="700" fill="#0284c7">问号</text>
      <text x="249" y="338" textAnchor="middle" fontSize="8" fill="#475569">高增长低份额</text>
      <rect x="56" y="370" width="110" height="55" rx="6" fill="#f59e0b" opacity="0.2" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="111" y="390" textAnchor="middle" fontSize="10" fontWeight="700" fill="#d97706">现金牛</text>
      <text x="111" y="408" textAnchor="middle" fontSize="8" fill="#475569">低增长高份额</text>
      <rect x="194" y="370" width="110" height="55" rx="6" fill="#ef4444" opacity="0.2" stroke="#ef4444" strokeWidth="1.5" />
      <text x="249" y="390" textAnchor="middle" fontSize="10" fontWeight="700" fill="#dc2626">瘦狗</text>
      <text x="249" y="408" textAnchor="middle" fontSize="8" fill="#475569">低增长低份额</text>
      <text x="180" y="426" textAnchor="middle" fontSize="8" fill="#64748b">低 ← 增长率 → 高</text>

      {/* 价值链分析 */}
      <text x="540" y="276" textAnchor="middle" fontSize="13" fontWeight="700" fill="#059669">价值链分析</text>
      <rect x="340" y="286" width="420" height="150" rx="10" fill="url(#opt-sp-3)" opacity="0.06" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="360" y="304" fontSize="9" fontWeight="600" fill="#d97706">主体活动</text>
      <rect x="350" y="312" width="70" height="100" rx="6" fill="#f59e0b" opacity="0.15" stroke="#f59e0b" strokeWidth="1" />
      <text x="385" y="340" textAnchor="middle" fontSize="9" fill="#d97706">进货</text>
      <text x="385" y="356" textAnchor="middle" fontSize="8" fill="#475569">物流</text>
      <rect x="430" y="312" width="70" height="100" rx="6" fill="#f59e0b" opacity="0.18" stroke="#f59e0b" strokeWidth="1" />
      <text x="465" y="340" textAnchor="middle" fontSize="9" fill="#d97706">生产</text>
      <text x="465" y="356" textAnchor="middle" fontSize="8" fill="#475569">运营</text>
      <rect x="510" y="312" width="70" height="100" rx="6" fill="#f59e0b" opacity="0.21" stroke="#f59e0b" strokeWidth="1" />
      <text x="545" y="340" textAnchor="middle" fontSize="9" fill="#d97706">发货</text>
      <text x="545" y="356" textAnchor="middle" fontSize="8" fill="#475569">物流</text>
      <rect x="590" y="312" width="70" height="100" rx="6" fill="#f59e0b" opacity="0.24" stroke="#f59e0b" strokeWidth="1" />
      <text x="625" y="340" textAnchor="middle" fontSize="9" fill="#d97706">营销</text>
      <text x="625" y="356" textAnchor="middle" fontSize="8" fill="#475569">销售</text>
      <rect x="670" y="312" width="70" height="100" rx="6" fill="#f59e0b" opacity="0.27" stroke="#f59e0b" strokeWidth="1" />
      <text x="705" y="340" textAnchor="middle" fontSize="9" fill="#d97706">服务</text>
      <text x="705" y="356" textAnchor="middle" fontSize="8" fill="#475569">售后</text>
      <text x="360" y="430" fontSize="9" fontWeight="600" fill="#0284c7">支持活动</text>
      <rect x="430" y="420" width="310" height="14" rx="4" fill="#0ea5e9" opacity="0.12" stroke="#0ea5e9" strokeWidth="1" />
      <text x="585" y="431" textAnchor="middle" fontSize="8" fill="#0369a1">采购 / 技术开发 / 人力资源管理 / 基础设施</text>

      {/* 底部：战略规划流程 */}
      <rect x="40" y="452" width="720" height="108" rx="10" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="400" y="474" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">战略规划四步流程</text>
      <rect x="60" y="486" width="150" height="34" rx="6" fill="url(#opt-sp-1)" opacity="0.15" stroke="#0ea5e9" strokeWidth="1" />
      <text x="135" y="507" textAnchor="middle" fontSize="10" fontWeight="600" fill="#0369a1">1 PEST 扫描环境</text>
      <path d="M210 503 L228 503" stroke="#64748b" strokeWidth="2" markerEnd="url(#opt-sp-arrow)" />
      <rect x="232" y="486" width="150" height="34" rx="6" fill="url(#opt-sp-2)" opacity="0.15" stroke="#8b5cf6" strokeWidth="1" />
      <text x="307" y="507" textAnchor="middle" fontSize="10" fontWeight="600" fill="#7c3aed">2 五力评估竞争</text>
      <path d="M382 503 L400 503" stroke="#64748b" strokeWidth="2" markerEnd="url(#opt-sp-arrow)" />
      <rect x="404" y="486" width="150" height="34" rx="6" fill="url(#opt-sp-3)" opacity="0.15" stroke="#f59e0b" strokeWidth="1" />
      <text x="479" y="507" textAnchor="middle" fontSize="10" fontWeight="600" fill="#d97706">3 BCG 配置资源</text>
      <path d="M554 503 L572 503" stroke="#64748b" strokeWidth="2" markerEnd="url(#opt-sp-arrow)" />
      <rect x="576" y="486" width="160" height="34" rx="6" fill="#10b981" opacity="0.15" stroke="#10b981" strokeWidth="1" />
      <text x="656" y="507" textAnchor="middle" fontSize="10" fontWeight="600" fill="#059669">4 价值链找优势</text>
      <rect x="60" y="528" width="676" height="24" rx="6" fill="url(#opt-sp-1)" opacity="0.08" stroke="#0ea5e9" strokeWidth="1" />
      <text x="398" y="544" textAnchor="middle" fontSize="10" fontWeight="600" fill="#0369a1">从外到内：宏观环境 → 行业竞争 → 业务组合 → 价值创造环节</text>
    </svg>
  );
}
