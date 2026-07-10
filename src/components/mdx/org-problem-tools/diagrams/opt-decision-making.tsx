"use client";

export function OptDecisionMakingDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="决策制定工具全景图">
      <defs>
        <linearGradient id="opt-dm-1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>
        <linearGradient id="opt-dm-2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#7c3aed" />
        </linearGradient>
        <marker id="opt-dm-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">决策制定工具 · 全景</text>

      {/* 决策矩阵 */}
      <text x="180" y="62" textAnchor="middle" fontSize="13" fontWeight="700" fill="#0369a1">决策矩阵（加权评分法）</text>
      <rect x="40" y="72" width="280" height="200" rx="10" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      {/* 表头 */}
      <rect x="50" y="82" width="80" height="24" rx="4" fill="#0ea5e9" opacity="0.15" />
      <text x="90" y="98" textAnchor="middle" fontSize="9" fontWeight="600" fill="#0369a1">方案</text>
      <rect x="130" y="82" width="55" height="24" rx="4" fill="#8b5cf6" opacity="0.15" />
      <text x="157" y="98" textAnchor="middle" fontSize="9" fontWeight="600" fill="#7c3aed">成本(0.3)</text>
      <rect x="185" y="82" width="55" height="24" rx="4" fill="#8b5cf6" opacity="0.15" />
      <text x="212" y="98" textAnchor="middle" fontSize="9" fontWeight="600" fill="#7c3aed">收益(0.5)</text>
      <rect x="240" y="82" width="55" height="24" rx="4" fill="#8b5cf6" opacity="0.15" />
      <text x="267" y="98" textAnchor="middle" fontSize="9" fontWeight="600" fill="#7c3aed">风险(0.2)</text>
      {/* 行 */}
      <rect x="50" y="110" width="80" height="24" rx="4" fill="#f1f5f9" />
      <text x="90" y="126" textAnchor="middle" fontSize="9" fill="#475569">方案A</text>
      <text x="157" y="126" textAnchor="middle" fontSize="9" fill="#475569">7</text>
      <text x="212" y="126" textAnchor="middle" fontSize="9" fill="#475569">9</text>
      <text x="267" y="126" textAnchor="middle" fontSize="9" fill="#475569">6</text>
      <rect x="50" y="138" width="80" height="24" rx="4" fill="#eff6ff" />
      <text x="90" y="154" textAnchor="middle" fontSize="9" fontWeight="600" fill="#0284c7">方案B</text>
      <text x="157" y="154" textAnchor="middle" fontSize="9" fontWeight="600" fill="#0284c7">8</text>
      <text x="212" y="154" textAnchor="middle" fontSize="9" fontWeight="600" fill="#0284c7">8</text>
      <text x="267" y="154" textAnchor="middle" fontSize="9" fontWeight="600" fill="#0284c7">8</text>
      <rect x="50" y="166" width="80" height="24" rx="4" fill="#f1f5f9" />
      <text x="90" y="182" textAnchor="middle" fontSize="9" fill="#475569">方案C</text>
      <text x="157" y="182" textAnchor="middle" fontSize="9" fill="#475569">6</text>
      <text x="212" y="182" textAnchor="middle" fontSize="9" fill="#475569">7</text>
      <text x="267" y="182" textAnchor="middle" fontSize="9" fill="#475569">9</text>
      {/* 加权得分 */}
      <line x1="50" y1="194" x2="295" y2="194" stroke="#cbd5e1" strokeWidth="1" />
      <text x="90" y="212" textAnchor="middle" fontSize="9" fontWeight="600" fill="#334155">加权得分</text>
      <text x="157" y="212" textAnchor="middle" fontSize="9" fill="#64748b">A: 7.5</text>
      <text x="212" y="212" textAnchor="middle" fontSize="9" fontWeight="700" fill="#10b981">B: 8.0</text>
      <text x="267" y="212" textAnchor="middle" fontSize="9" fill="#64748b">C: 7.1</text>
      <rect x="80" y="226" width="180" height="28" rx="6" fill="#10b981" opacity="0.12" stroke="#10b981" strokeWidth="1" />
      <text x="170" y="244" textAnchor="middle" fontSize="10" fontWeight="600" fill="#059669">最优：方案B（得分最高）</text>
      <text x="180" y="266" textAnchor="middle" fontSize="9" fill="#0ea5e9">多维度加权量化对比</text>

      {/* 德尔菲法 */}
      <text x="540" y="62" textAnchor="middle" fontSize="13" fontWeight="700" fill="#7c3aed">德尔菲法（专家共识）</text>
      <rect x="340" y="72" width="420" height="200" rx="10" fill="url(#opt-dm-2)" opacity="0.06" stroke="#8b5cf6" strokeWidth="1.5" />
      <rect x="370" y="88" width="130" height="34" rx="6" fill="#8b5cf6" opacity="0.15" stroke="#8b5cf6" strokeWidth="1" />
      <text x="435" y="109" textAnchor="middle" fontSize="10" fontWeight="600" fill="#7c3aed">第1轮：独立问卷</text>
      <path d="M435 122 L435 130" stroke="#64748b" strokeWidth="2" markerEnd="url(#opt-dm-arrow)" />
      <rect x="370" y="134" width="130" height="34" rx="6" fill="#8b5cf6" opacity="0.18" stroke="#8b5cf6" strokeWidth="1" />
      <text x="435" y="155" textAnchor="middle" fontSize="10" fontWeight="600" fill="#7c3aed">汇总与匿名反馈</text>
      <path d="M435 168 L435 176" stroke="#64748b" strokeWidth="2" markerEnd="url(#opt-dm-arrow)" />
      <rect x="370" y="180" width="130" height="34" rx="6" fill="#8b5cf6" opacity="0.21" stroke="#8b5cf6" strokeWidth="1" />
      <text x="435" y="201" textAnchor="middle" fontSize="10" fontWeight="600" fill="#7c3aed">第2轮：修正意见</text>
      <path d="M435 214 L435 222" stroke="#64748b" strokeWidth="2" markerEnd="url(#opt-dm-arrow)" />
      <rect x="370" y="226" width="130" height="34" rx="6" fill="#10b981" opacity="0.2" stroke="#10b981" strokeWidth="1.5" />
      <text x="435" y="247" textAnchor="middle" fontSize="10" fontWeight="700" fill="#059669">收敛：达成共识</text>
      <text x="435" y="266" textAnchor="middle" fontSize="9" fill="#7c3aed">匿名迭代消除偏差</text>
      {/* 右侧专家 */}
      <rect x="560" y="88" width="60" height="24" rx="6" fill="#0ea5e9" opacity="0.12" stroke="#0ea5e9" strokeWidth="1" />
      <text x="590" y="104" textAnchor="middle" fontSize="9" fill="#0369a1">专家1</text>
      <rect x="630" y="88" width="60" height="24" rx="6" fill="#0ea5e9" opacity="0.12" stroke="#0ea5e9" strokeWidth="1" />
      <text x="660" y="104" textAnchor="middle" fontSize="9" fill="#0369a1">专家2</text>
      <rect x="700" y="88" width="50" height="24" rx="6" fill="#0ea5e9" opacity="0.12" stroke="#0ea5e9" strokeWidth="1" />
      <text x="725" y="104" textAnchor="middle" fontSize="9" fill="#0369a1">专家3</text>
      <line x1="590" y1="112" x2="500" y2="134" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="3 2" />
      <line x1="660" y1="112" x2="500" y2="134" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="3 2" />
      <line x1="725" y1="112" x2="500" y2="134" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="3 2" />
      <text x="630" y="140" textAnchor="middle" fontSize="8" fill="#64748b">独立匿名</text>

      {/* 情景分析 */}
      <text x="180" y="300" textAnchor="middle" fontSize="13" fontWeight="700" fill="#d97706">情景分析</text>
      <rect x="40" y="310" width="280" height="140" rx="10" fill="url(#opt-dm-1)" opacity="0.06" stroke="#0ea5e9" strokeWidth="1.5" />
      <rect x="56" y="324" width="120" height="50" rx="6" fill="#10b981" opacity="0.15" stroke="#10b981" strokeWidth="1" />
      <text x="116" y="344" textAnchor="middle" fontSize="10" fontWeight="700" fill="#059669">乐观情景</text>
      <text x="116" y="362" textAnchor="middle" fontSize="8" fill="#475569">市场增长20%</text>
      <rect x="184" y="324" width="120" height="50" rx="6" fill="#f59e0b" opacity="0.15" stroke="#f59e0b" strokeWidth="1" />
      <text x="244" y="344" textAnchor="middle" fontSize="10" fontWeight="700" fill="#d97706">基准情景</text>
      <text x="244" y="362" textAnchor="middle" fontSize="8" fill="#475569">市场增长5%</text>
      <rect x="56" y="384" width="248" height="50" rx="6" fill="#ef4444" opacity="0.15" stroke="#ef4444" strokeWidth="1" />
      <text x="180" y="404" textAnchor="middle" fontSize="10" fontWeight="700" fill="#dc2626">悲观情景</text>
      <text x="180" y="422" textAnchor="middle" fontSize="8" fill="#475569">市场萎缩10%</text>
      <text x="180" y="444" textAnchor="middle" fontSize="9" fill="#0ea5e9">多情景预演，制定弹性预案</text>

      {/* AHP 层次分析法 */}
      <text x="540" y="300" textAnchor="middle" fontSize="13" fontWeight="700" fill="#059669">AHP 层次分析法</text>
      <rect x="340" y="310" width="420" height="140" rx="10" fill="#f8fafc" stroke="#475569" strokeWidth="1.5" />
      {/* 目标层 */}
      <rect x="500" y="324" width="100" height="28" rx="6" fill="#0ea5e9" opacity="0.2" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="550" y="342" textAnchor="middle" fontSize="10" fontWeight="700" fill="#0284c7">目标层</text>
      {/* 准则层 */}
      <line x1="550" y1="352" x2="420" y2="372" stroke="#64748b" strokeWidth="1" />
      <line x1="550" y1="352" x2="550" y2="372" stroke="#64748b" strokeWidth="1" />
      <line x1="550" y1="352" x2="680" y2="372" stroke="#64748b" strokeWidth="1" />
      <rect x="375" y="372" width="90" height="24" rx="6" fill="#8b5cf6" opacity="0.15" stroke="#8b5cf6" strokeWidth="1" />
      <text x="420" y="388" textAnchor="middle" fontSize="9" fill="#7c3aed">准则1</text>
      <rect x="505" y="372" width="90" height="24" rx="6" fill="#8b5cf6" opacity="0.15" stroke="#8b5cf6" strokeWidth="1" />
      <text x="550" y="388" textAnchor="middle" fontSize="9" fill="#7c3aed">准则2</text>
      <rect x="635" y="372" width="90" height="24" rx="6" fill="#8b5cf6" opacity="0.15" stroke="#8b5cf6" strokeWidth="1" />
      <text x="680" y="388" textAnchor="middle" fontSize="9" fill="#7c3aed">准则3</text>
      {/* 方案层 */}
      <line x1="420" y1="396" x2="380" y2="416" stroke="#64748b" strokeWidth="1" />
      <line x1="420" y1="396" x2="550" y2="416" stroke="#64748b" strokeWidth="1" />
      <line x1="550" y1="396" x2="380" y2="416" stroke="#64748b" strokeWidth="1" />
      <line x1="550" y1="396" x2="550" y2="416" stroke="#64748b" strokeWidth="1" />
      <line x1="550" y1="396" x2="720" y2="416" stroke="#64748b" strokeWidth="1" />
      <line x1="680" y1="396" x2="550" y2="416" stroke="#64748b" strokeWidth="1" />
      <line x1="680" y1="396" x2="720" y2="416" stroke="#64748b" strokeWidth="1" />
      <rect x="350" y="416" width="60" height="22" rx="6" fill="#10b981" opacity="0.15" stroke="#10b981" strokeWidth="1" />
      <text x="380" y="431" textAnchor="middle" fontSize="9" fill="#059669">方案A</text>
      <rect x="520" y="416" width="60" height="22" rx="6" fill="#10b981" opacity="0.15" stroke="#10b981" strokeWidth="1" />
      <text x="550" y="431" textAnchor="middle" fontSize="9" fill="#059669">方案B</text>
      <rect x="690" y="416" width="60" height="22" rx="6" fill="#10b981" opacity="0.15" stroke="#10b981" strokeWidth="1" />
      <text x="720" y="431" textAnchor="middle" fontSize="9" fill="#059669">方案C</text>
      <text x="550" y="446" textAnchor="middle" fontSize="9" fill="#059669">目标→准则→方案三层权重分解</text>

      {/* 底部：决策流程 */}
      <rect x="40" y="468" width="720" height="92" rx="10" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="400" y="490" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">决策制定四步流程</text>
      <rect x="60" y="502" width="150" height="28" rx="6" fill="url(#opt-dm-1)" opacity="0.15" stroke="#0ea5e9" strokeWidth="1" />
      <text x="135" y="520" textAnchor="middle" fontSize="10" fontWeight="600" fill="#0369a1">1 明确决策目标</text>
      <path d="M210 516 L228 516" stroke="#64748b" strokeWidth="2" markerEnd="url(#opt-dm-arrow)" />
      <rect x="232" y="502" width="150" height="28" rx="6" fill="url(#opt-dm-2)" opacity="0.15" stroke="#8b5cf6" strokeWidth="1" />
      <text x="307" y="520" textAnchor="middle" fontSize="10" fontWeight="600" fill="#7c3aed">2 列举可行方案</text>
      <path d="M382 516 L400 516" stroke="#64748b" strokeWidth="2" markerEnd="url(#opt-dm-arrow)" />
      <rect x="404" y="502" width="150" height="28" rx="6" fill="#f59e0b" opacity="0.15" stroke="#f59e0b" strokeWidth="1" />
      <text x="479" y="520" textAnchor="middle" fontSize="10" fontWeight="600" fill="#d97706">3 加权评估排序</text>
      <path d="M554 516 L572 516" stroke="#64748b" strokeWidth="2" markerEnd="url(#opt-dm-arrow)" />
      <rect x="576" y="502" width="160" height="28" rx="6" fill="#10b981" opacity="0.15" stroke="#10b981" strokeWidth="1" />
      <text x="656" y="520" textAnchor="middle" fontSize="10" fontWeight="600" fill="#059669">4 情景验证与决策</text>
      <rect x="60" y="536" width="676" height="18" rx="4" fill="url(#opt-dm-1)" opacity="0.08" stroke="#0ea5e9" strokeWidth="1" />
      <text x="398" y="549" textAnchor="middle" fontSize="9" fontWeight="600" fill="#0369a1">核心原则：量化对比替代直觉判断，多情景预演降低不确定性风险</text>
    </svg>
  );
}
