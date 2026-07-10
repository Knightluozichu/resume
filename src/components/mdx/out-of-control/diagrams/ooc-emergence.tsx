"use client";

export function OocEmergenceDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="涌现与自组织从简单规则到复杂行为">
      <defs>
        <linearGradient id="ooc-em-1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>
        <linearGradient id="ooc-em-2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#7c3aed" />
        </linearGradient>
        <linearGradient id="ooc-em-3" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <marker id="ooc-em-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">涌现与自组织：从简单规则到复杂行为</text>

      {/* 三层结构：简单规则 → 中层模式 → 涌现行为 */}
      <text x="400" y="62" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">三层涌现结构</text>

      {/* 第一层：简单规则 */}
      <rect x="40" y="74" width="720" height="80" rx="10" fill="url(#ooc-em-1)" opacity="0.08" stroke="#0ea5e9" strokeWidth="2" />
      <text x="80" y="98" fontSize="12" fontWeight="700" fill="#0369a1">第一层：简单局部规则</text>
      <text x="80" y="118" fontSize="10" fill="#475569">规则1：跟上邻居的速度</text>
      <text x="280" y="118" fontSize="10" fill="#475569">规则2：向群体中心靠拢</text>
      <text x="500" y="118" fontSize="10" fill="#475569">规则3：避免碰撞</text>
      <text x="80" y="140" fontSize="10" fill="#64748b">每条规则只关心个体与邻近个体的关系，无需全局信息</text>

      <path d="M400 156 L400 170" stroke="#64748b" strokeWidth="2" markerEnd="url(#ooc-em-arrow)" />

      {/* 第二层：中层模式 */}
      <rect x="40" y="174" width="720" height="80" rx="10" fill="url(#ooc-em-2)" opacity="0.08" stroke="#8b5cf6" strokeWidth="2" />
      <text x="80" y="198" fontSize="12" fontWeight="700" fill="#7c3aed">第二层：中层模式形成</text>
      <text x="80" y="218" fontSize="10" fill="#475569">局部对齐 → 波浪式运动</text>
      <text x="330" y="218" fontSize="10" fill="#475569">中心引力 → 群体凝聚</text>
      <text x="550" y="218" fontSize="10" fill="#475569">碰撞回避 → 边缘变形</text>
      <text x="80" y="240" fontSize="10" fill="#64748b">规则之间的非线性交互产生不可预测的中层结构</text>

      <path d="M400 256 L400 270" stroke="#64748b" strokeWidth="2" markerEnd="url(#ooc-em-arrow)" />

      {/* 第三层：涌现行为 */}
      <rect x="40" y="274" width="720" height="80" rx="10" fill="url(#ooc-em-3)" opacity="0.08" stroke="#f59e0b" strokeWidth="2" />
      <text x="80" y="298" fontSize="12" fontWeight="700" fill="#d97706">第三层：涌现行为</text>
      <text x="80" y="318" fontSize="10" fill="#475569">鱼群闪避捕食者</text>
      <text x="260" y="318" fontSize="10" fill="#475569">鸟群同步转弯</text>
      <text x="420" y="318" fontSize="10" fill="#475569">蚁群寻最短路径</text>
      <text x="600" y="318" fontSize="10" fill="#475569">蜂群精准决策</text>
      <text x="80" y="340" fontSize="10" fill="#64748b">群体智能涌现——没有任何个体拥有全局计划，但群体表现出智能行为</text>

      {/* 康威生命游戏示意 */}
      <text x="400" y="384" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">经典案例：康威生命游戏</text>

      <rect x="40" y="396" width="220" height="100" rx="8" fill="#eff6ff" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="150" y="418" textAnchor="middle" fontSize="11" fontWeight="700" fill="#0369a1">简单规则</text>
      <text x="150" y="438" textAnchor="middle" fontSize="9" fill="#475569">活细胞邻居少于2个：死</text>
      <text x="150" y="456" textAnchor="middle" fontSize="9" fill="#475569">活细胞邻居2-3个：活</text>
      <text x="150" y="474" textAnchor="middle" fontSize="9" fill="#475569">死细胞邻居3个：生</text>
      <text x="150" y="492" textAnchor="middle" fontSize="9" fill="#475569">活细胞邻居多于3个：死</text>

      <path d="M262 446 L288 446" stroke="#64748b" strokeWidth="2" markerEnd="url(#ooc-em-arrow)" />

      <rect x="292" y="396" width="220" height="100" rx="8" fill="#f5f3ff" stroke="#8b5cf6" strokeWidth="1.5" />
      <text x="402" y="418" textAnchor="middle" fontSize="11" fontWeight="700" fill="#7c3aed">涌现模式</text>
      <text x="402" y="438" textAnchor="middle" fontSize="9" fill="#475569">滑翔机：对角移动</text>
      <text x="402" y="456" textAnchor="middle" fontSize="9" fill="#475569">闪光灯：周期振荡</text>
      <text x="402" y="474" textAnchor="middle" fontSize="9" fill="#475569">滑翔机枪：无限产生</text>
      <text x="402" y="492" textAnchor="middle" fontSize="9" fill="#475569">静态生命：稳定结构</text>

      <path d="M514 446 L540 446" stroke="#64748b" strokeWidth="2" markerEnd="url(#ooc-em-arrow)" />

      <rect x="544" y="396" width="216" height="100" rx="8" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="652" y="418" textAnchor="middle" fontSize="11" fontWeight="700" fill="#d97706">涌现意义</text>
      <text x="652" y="438" textAnchor="middle" fontSize="9" fill="#475569">规则极简</text>
      <text x="652" y="456" textAnchor="middle" fontSize="9" fill="#475569">行为无穷</text>
      <text x="652" y="474" textAnchor="middle" fontSize="9" fill="#475569">不可预测</text>
      <text x="652" y="492" textAnchor="middle" fontSize="9" fill="#475569">不可还原</text>

      {/* 底部核心原则 */}
      <rect x="40" y="510" width="720" height="28" rx="8" fill="url(#ooc-em-2)" opacity="0.08" stroke="#8b5cf6" strokeWidth="1.5" />
      <text x="400" y="528" textAnchor="middle" fontSize="11" fontWeight="600" fill="#7c3aed">核心原则：整体大于部分之和——涌现不可从个体行为推导</text>

      <rect x="40" y="544" width="720" height="28" rx="8" fill="url(#ooc-em-3)" opacity="0.08" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="400" y="562" textAnchor="middle" fontSize="11" fontWeight="600" fill="#d97706">自组织：无需外部设计者，系统内部自发产生秩序</text>
    </svg>
  );
}
