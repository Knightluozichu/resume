"use client";

export function OocEcosystemsDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="生态系统多样性与稳定性结构图">
      <defs>
        <linearGradient id="ooc-ec-1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
        <linearGradient id="ooc-ec-2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>
        <linearGradient id="ooc-ec-3" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="ooc-ec-4" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#7c3aed" />
        </linearGradient>
        <marker id="ooc-ec-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">生态系统：多样性与稳定性</text>

      {/* Biosphere 2 实验 */}
      <rect x="40" y="56" width="720" height="60" rx="10" fill="url(#ooc-ec-3)" opacity="0.08" stroke="#f59e0b" strokeWidth="2" />
      <text x="400" y="78" textAnchor="middle" fontSize="13" fontWeight="700" fill="#d97706">案例：生物圈2号实验</text>
      <text x="400" y="98" textAnchor="middle" fontSize="11" fill="#475569">人类试图封闭复制地球生态——失败。关键教训：生态系统的复杂性远超人类设计能力</text>

      {/* 生态金字塔 */}
      <text x="200" y="142" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">生态金字塔结构</text>

      <polygon points="100,160 300,160 280,210 120,210" fill="url(#ooc-ec-3)" opacity="0.2" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="200" y="190" textAnchor="middle" fontSize="11" fontWeight="700" fill="#d97706">顶级捕食者</text>

      <polygon points="120,214 280,214 260,264 140,264" fill="url(#ooc-ec-1)" opacity="0.2" stroke="#10b981" strokeWidth="1.5" />
      <text x="200" y="244" textAnchor="middle" fontSize="11" fontWeight="700" fill="#059669">次级消费者</text>

      <polygon points="140,268 260,268 240,318 160,318" fill="url(#ooc-ec-2)" opacity="0.2" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="200" y="298" textAnchor="middle" fontSize="11" fontWeight="700" fill="#0369a1">初级消费者</text>

      <polygon points="160,322 240,322 220,372 180,372" fill="url(#ooc-ec-4)" opacity="0.2" stroke="#8b5cf6" strokeWidth="1.5" />
      <text x="200" y="352" textAnchor="middle" fontSize="11" fontWeight="700" fill="#7c3aed">生产者</text>

      <text x="200" y="392" textAnchor="middle" fontSize="10" fill="#64748b">多样性越高，金字塔越稳定</text>

      {/* 右侧：稳定性 vs 多样性 */}
      <text x="540" y="142" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">稳定性 vs 多样性关系</text>

      <rect x="360" y="156" width="380" height="50" rx="8" fill="url(#ooc-ec-1)" opacity="0.08" stroke="#10b981" strokeWidth="1.5" />
      <text x="550" y="176" textAnchor="middle" fontSize="11" fontWeight="600" fill="#059669">高多样性生态系统</text>
      <text x="550" y="194" textAnchor="middle" fontSize="9" fill="#475569">多食物链交叉 → 单物种消失影响小 → 高弹性</text>

      <rect x="360" y="214" width="380" height="50" rx="8" fill="url(#ooc-ec-3)" opacity="0.08" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="550" y="234" textAnchor="middle" fontSize="11" fontWeight="600" fill="#d97706">低多样性生态系统</text>
      <text x="550" y="252" textAnchor="middle" fontSize="9" fill="#475569">食物链简单 → 关键物种消失 → 系统崩溃</text>

      <rect x="360" y="272" width="380" height="50" rx="8" fill="url(#ooc-ec-2)" opacity="0.08" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="550" y="292" textAnchor="middle" fontSize="11" fontWeight="600" fill="#0369a1">人工单一种植</text>
      <text x="550" y="310" textAnchor="middle" fontSize="9" fill="#475569">效率极高 → 但极脆弱 → 一虫一病可毁灭全部</text>

      <rect x="360" y="330" width="380" height="50" rx="8" fill="url(#ooc-ec-4)" opacity="0.08" stroke="#8b5cf6" strokeWidth="1.5" />
      <text x="550" y="350" textAnchor="middle" fontSize="11" fontWeight="600" fill="#7c3aed">自然混合森林</text>
      <text x="550" y="368" textAnchor="middle" fontSize="9" fill="#475569">效率中等 → 但极稳定 → 害虫病害难以毁灭</text>

      {/* 底部：生态学三原则 */}
      <text x="400" y="406" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">生态学三原则</text>

      <rect x="40" y="420" width="235" height="80" rx="8" fill="#f0fdf4" stroke="#10b981" strokeWidth="1.5" />
      <text x="157" y="442" textAnchor="middle" fontSize="11" fontWeight="700" fill="#059669">原则一：可持续性</text>
      <text x="157" y="462" textAnchor="middle" fontSize="9" fill="#475569">系统不消耗自身基础</text>
      <text x="157" y="480" textAnchor="middle" fontSize="9" fill="#475569">输出不超过输入</text>
      <text x="157" y="498" textAnchor="middle" fontSize="9" fill="#64748b">废物即食物，闭环循环</text>

      <rect x="283" y="420" width="235" height="80" rx="8" fill="#eff6ff" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="400" y="442" textAnchor="middle" fontSize="11" fontWeight="700" fill="#0369a1">原则二：多样性</text>
      <text x="400" y="462" textAnchor="middle" fontSize="9" fill="#475569">物种越多越稳定</text>
      <text x="400" y="480" textAnchor="middle" fontSize="9" fill="#475569">冗余路径吸收冲击</text>
      <text x="400" y="498" textAnchor="middle" fontSize="9" fill="#64748b">每个生态位都有 occupant</text>

      <rect x="526" y="420" width="234" height="80" rx="8" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="643" y="442" textAnchor="middle" fontSize="11" fontWeight="700" fill="#d97706">原则三：开放性</text>
      <text x="643" y="462" textAnchor="middle" fontSize="9" fill="#475569">边界可渗透</text>
      <text x="643" y="480" textAnchor="middle" fontSize="9" fill="#475569">与外部交换能量物质</text>
      <text x="643" y="498" textAnchor="middle" fontSize="9" fill="#64748b">封闭系统必然衰退</text>

      {/* 底部核心洞察 */}
      <rect x="40" y="512" width="720" height="28" rx="8" fill="url(#ooc-ec-1)" opacity="0.08" stroke="#10b981" strokeWidth="1.5" />
      <text x="400" y="530" textAnchor="middle" fontSize="11" fontWeight="600" fill="#059669">核心洞察：稳定性来自多样性冗余，而非精确控制</text>

      <rect x="40" y="546" width="720" height="24" rx="8" fill="url(#ooc-ec-3)" opacity="0.08" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="400" y="562" textAnchor="middle" fontSize="11" fontWeight="600" fill="#d97706">管理启示：培育生态而非建造机器——管方向不管细节</text>
    </svg>
  );
}
