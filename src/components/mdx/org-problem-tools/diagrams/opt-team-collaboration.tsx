"use client";

export function OptTeamCollaborationDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="团队协作工具全景图">
      <defs>
        <linearGradient id="opt-tc-1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>
        <linearGradient id="opt-tc-2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#7c3aed" />
        </linearGradient>
        <marker id="opt-tc-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">团队协作工具 · 全景</text>

      {/* RACI 矩阵 */}
      <text x="200" y="62" textAnchor="middle" fontSize="13" fontWeight="700" fill="#0369a1">RACI 责任分配矩阵</text>
      <rect x="40" y="72" width="320" height="200" rx="10" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      {/* 表头 */}
      <rect x="50" y="82" width="80" height="24" rx="4" fill="#0ea5e9" opacity="0.15" />
      <text x="90" y="98" textAnchor="middle" fontSize="9" fontWeight="600" fill="#0369a1">任务</text>
      <rect x="130" y="82" width="50" height="24" rx="4" fill="#8b5cf6" opacity="0.15" />
      <text x="155" y="98" textAnchor="middle" fontSize="9" fontWeight="600" fill="#7c3aed">张三</text>
      <rect x="180" y="82" width="50" height="24" rx="4" fill="#8b5cf6" opacity="0.15" />
      <text x="205" y="98" textAnchor="middle" fontSize="9" fontWeight="600" fill="#7c3aed">李四</text>
      <rect x="230" y="82" width="50" height="24" rx="4" fill="#8b5cf6" opacity="0.15" />
      <text x="255" y="98" textAnchor="middle" fontSize="9" fontWeight="600" fill="#7c3aed">王五</text>
      <rect x="280" y="82" width="50" height="24" rx="4" fill="#8b5cf6" opacity="0.15" />
      <text x="305" y="98" textAnchor="middle" fontSize="9" fontWeight="600" fill="#7c3aed">赵六</text>
      {/* 行 */}
      <rect x="50" y="110" width="80" height="28" rx="4" fill="#f1f5f9" />
      <text x="90" y="128" textAnchor="middle" fontSize="9" fill="#475569">需求分析</text>
      <rect x="135" y="116" width="22" height="18" rx="4" fill="#ef4444" opacity="0.3" />
      <text x="146" y="129" textAnchor="middle" fontSize="9" fontWeight="700" fill="#dc2626">R</text>
      <rect x="185" y="116" width="22" height="18" rx="4" fill="#0ea5e9" opacity="0.3" />
      <text x="196" y="129" textAnchor="middle" fontSize="9" fontWeight="700" fill="#0284c7">A</text>
      <rect x="235" y="116" width="22" height="18" rx="4" fill="#8b5cf6" opacity="0.3" />
      <text x="246" y="129" textAnchor="middle" fontSize="9" fontWeight="700" fill="#7c3aed">C</text>
      <rect x="285" y="116" width="22" height="18" rx="4" fill="#64748b" opacity="0.15" />
      <text x="296" y="129" textAnchor="middle" fontSize="9" fill="#64748b">I</text>
      <rect x="50" y="142" width="80" height="28" rx="4" fill="#f1f5f9" />
      <text x="90" y="160" textAnchor="middle" fontSize="9" fill="#475569">方案设计</text>
      <rect x="135" y="148" width="22" height="18" rx="4" fill="#0ea5e9" opacity="0.3" />
      <text x="146" y="161" textAnchor="middle" fontSize="9" fontWeight="700" fill="#0284c7">A</text>
      <rect x="185" y="148" width="22" height="18" rx="4" fill="#ef4444" opacity="0.3" />
      <text x="196" y="161" textAnchor="middle" fontSize="9" fontWeight="700" fill="#dc2626">R</text>
      <rect x="285" y="148" width="22" height="18" rx="4" fill="#8b5cf6" opacity="0.3" />
      <text x="296" y="161" textAnchor="middle" fontSize="9" fontWeight="700" fill="#7c3aed">C</text>
      <rect x="50" y="174" width="80" height="28" rx="4" fill="#f1f5f9" />
      <text x="90" y="192" textAnchor="middle" fontSize="9" fill="#475569">测试验证</text>
      <rect x="235" y="180" width="22" height="18" rx="4" fill="#ef4444" opacity="0.3" />
      <text x="246" y="193" textAnchor="middle" fontSize="9" fontWeight="700" fill="#dc2626">R</text>
      <rect x="285" y="180" width="22" height="18" rx="4" fill="#0ea5e9" opacity="0.3" />
      <text x="296" y="193" textAnchor="middle" fontSize="9" fontWeight="700" fill="#0284c7">A</text>
      {/* 图例 */}
      <rect x="50" y="212" width="22" height="18" rx="4" fill="#ef4444" opacity="0.3" />
      <text x="64" y="225" fontSize="8" fill="#dc2626">R 负责</text>
      <rect x="115" y="212" width="22" height="18" rx="4" fill="#0ea5e9" opacity="0.3" />
      <text x="129" y="225" fontSize="8" fill="#0284c7">A 批准</text>
      <rect x="180" y="212" width="22" height="18" rx="4" fill="#8b5cf6" opacity="0.3" />
      <text x="194" y="225" fontSize="8" fill="#7c3aed">C 咨询</text>
      <rect x="245" y="212" width="22" height="18" rx="4" fill="#64748b" opacity="0.15" />
      <text x="259" y="225" fontSize="8" fill="#64748b">I 知会</text>
      <text x="200" y="252" textAnchor="middle" fontSize="9" fill="#0ea5e9">每项任务有且仅有一个A（负责人）</text>

      {/* 六顶思考帽 */}
      <text x="580" y="62" textAnchor="middle" fontSize="13" fontWeight="700" fill="#7c3aed">六顶思考帽</text>
      <rect x="400" y="72" width="360" height="200" rx="10" fill="url(#opt-tc-2)" opacity="0.06" stroke="#8b5cf6" strokeWidth="1.5" />
      <rect x="415" y="86" width="100" height="28" rx="6" fill="#fff" stroke="#475569" strokeWidth="1.5" />
      <text x="465" y="104" textAnchor="middle" fontSize="10" fontWeight="600" fill="#334155">白帽：数据事实</text>
      <rect x="525" y="86" width="100" height="28" rx="6" fill="#ef4444" opacity="0.7" />
      <text x="575" y="104" textAnchor="middle" fontSize="10" fontWeight="600" fill="#fff">红帽：直觉情感</text>
      <rect x="635" y="86" width="100" height="28" rx="6" fill="#000" opacity="0.8" />
      <text x="685" y="104" textAnchor="middle" fontSize="10" fontWeight="600" fill="#fff">黑帽：风险批判</text>
      <rect x="415" y="122" width="100" height="28" rx="6" fill="#f59e0b" opacity="0.8" />
      <text x="465" y="140" textAnchor="middle" fontSize="10" fontWeight="600" fill="#fff">黄帽：积极价值</text>
      <rect x="525" y="122" width="100" height="28" rx="6" fill="#10b981" opacity="0.8" />
      <text x="575" y="140" textAnchor="middle" fontSize="10" fontWeight="600" fill="#fff">绿帽：创新创意</text>
      <rect x="635" y="122" width="100" height="28" rx="6" fill="#0ea5e9" opacity="0.8" />
      <text x="685" y="140" textAnchor="middle" fontSize="10" fontWeight="600" fill="#fff">蓝帽：流程控制</text>
      <text x="580" y="172" textAnchor="middle" fontSize="10" fontWeight="600" fill="#334155">平行思维：一次只用一种视角</text>
      <rect x="415" y="184" width="320" height="24" rx="6" fill="#0ea5e9" opacity="0.1" stroke="#0ea5e9" strokeWidth="1" />
      <text x="575" y="200" textAnchor="middle" fontSize="9" fill="#0369a1">蓝帽开场 → 白帽事实 → 红帽直觉 → 黄帽价值 → 黑帽风险 → 绿帽创意 → 蓝帽总结</text>
      <text x="580" y="230" textAnchor="middle" fontSize="9" fill="#7c3aed">避免争论，平行探索所有维度</text>
      <text x="580" y="250" textAnchor="middle" fontSize="9" fill="#475569">让会议从对抗式变为协作式</text>

      {/* 头脑风暴 + 名义小组 */}
      <text x="200" y="300" textAnchor="middle" fontSize="13" fontWeight="700" fill="#d97706">头脑风暴与名义小组技术</text>
      <rect x="40" y="310" width="320" height="150" rx="10" fill="url(#opt-tc-1)" opacity="0.06" stroke="#0ea5e9" strokeWidth="1.5" />
      <rect x="56" y="324" width="130" height="56" rx="6" fill="#0ea5e9" opacity="0.15" stroke="#0ea5e9" strokeWidth="1" />
      <text x="121" y="344" textAnchor="middle" fontSize="10" fontWeight="700" fill="#0284c7">头脑风暴</text>
      <text x="121" y="362" textAnchor="middle" fontSize="8" fill="#475569">自由发散</text>
      <text x="121" y="374" textAnchor="middle" fontSize="8" fill="#475569">禁止批评</text>
      <rect x="196" y="324" width="148" height="56" rx="6" fill="#8b5cf6" opacity="0.15" stroke="#8b5cf6" strokeWidth="1" />
      <text x="270" y="344" textAnchor="middle" fontSize="10" fontWeight="700" fill="#7c3aed">名义小组</text>
      <text x="270" y="362" textAnchor="middle" fontSize="8" fill="#475569">独立写→轮流说</text>
      <text x="270" y="374" textAnchor="middle" fontSize="8" fill="#475569">→投票排序</text>
      <rect x="56" y="392" width="288" height="50" rx="6" fill="#10b981" opacity="0.1" stroke="#10b981" strokeWidth="1" />
      <text x="200" y="412" textAnchor="middle" fontSize="9" fontWeight="600" fill="#059669">组合使用：先发散（头脑风暴）再收敛（名义小组）</text>
      <text x="200" y="430" textAnchor="middle" fontSize="9" fill="#475569">既保证创意数量，又确保决策质量</text>
      <text x="200" y="450" textAnchor="middle" fontSize="9" fill="#0ea5e9">四项原则：不批评、求数量、欢迎联想、组合改进</text>

      {/* 冲突管理 */}
      <text x="580" y="300" textAnchor="middle" fontSize="13" fontWeight="700" fill="#059669">冲突管理模型（托马斯-基尔曼）</text>
      <rect x="400" y="310" width="360" height="150" rx="10" fill="#f8fafc" stroke="#475569" strokeWidth="1.5" />
      {/* 坐标轴 */}
      <line x1="580" y1="330" x2="580" y2="440" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="4 3" />
      <line x1="420" y1="385" x2="740" y2="385" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="4 3" />
      <text x="575" y="326" textAnchor="end" fontSize="8" fill="#64748b">高</text>
      <text x="575" y="440" textAnchor="end" fontSize="8" fill="#64748b">低</text>
      <text x="580" y="322" textAnchor="middle" fontSize="8" fill="#64748b">坚持自身利益</text>
      <text x="415" y="448" fontSize="8" fill="#64748b">低</text>
      <text x="735" y="448" textAnchor="end" fontSize="8" fill="#64748b">高</text>
      <text x="735" y="460" textAnchor="end" fontSize="8" fill="#64748b">合作程度</text>
      {/* 五种策略 */}
      <rect x="430" y="334" width="60" height="24" rx="6" fill="#ef4444" opacity="0.2" stroke="#ef4444" strokeWidth="1" />
      <text x="460" y="350" textAnchor="middle" fontSize="8" fontWeight="600" fill="#dc2626">竞争</text>
      <rect x="670" y="334" width="60" height="24" rx="6" fill="#10b981" opacity="0.2" stroke="#10b981" strokeWidth="1" />
      <text x="700" y="350" textAnchor="middle" fontSize="8" fontWeight="600" fill="#059669">合作</text>
      <rect x="430" y="420" width="60" height="24" rx="6" fill="#64748b" opacity="0.2" stroke="#64748b" strokeWidth="1" />
      <text x="460" y="436" textAnchor="middle" fontSize="8" fontWeight="600" fill="#475569">回避</text>
      <rect x="670" y="420" width="60" height="24" rx="6" fill="#0ea5e9" opacity="0.2" stroke="#0ea5e9" strokeWidth="1" />
      <text x="700" y="436" textAnchor="middle" fontSize="8" fontWeight="600" fill="#0284c7">妥协</text>
      <rect x="548" y="375" width="64" height="24" rx="6" fill="#f59e0b" opacity="0.2" stroke="#f59e0b" strokeWidth="1" />
      <text x="580" y="391" textAnchor="middle" fontSize="8" fontWeight="600" fill="#d97706">迁就</text>

      {/* 底部总结 */}
      <rect x="40" y="480" width="720" height="80" rx="10" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="400" y="500" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">团队协作核心逻辑</text>
      <rect x="60" y="510" width="680" height="18" rx="4" fill="url(#opt-tc-1)" opacity="0.08" stroke="#0ea5e9" strokeWidth="1" />
      <text x="400" y="523" textAnchor="middle" fontSize="9" fontWeight="600" fill="#0369a1">明确责任（RACI） → 平行思考（六帽） → 发散收敛（头脑风暴+名义小组） → 管理冲突（TKI）</text>
      <rect x="60" y="534" width="680" height="18" rx="4" fill="url(#opt-tc-2)" opacity="0.08" stroke="#8b5cf6" strokeWidth="1" />
      <text x="400" y="547" textAnchor="middle" fontSize="9" fontWeight="600" fill="#7c3aed">目标：从个体效率到团队协同——让对的人在对的时间用对的方式做对的事</text>
    </svg>
  );
}
