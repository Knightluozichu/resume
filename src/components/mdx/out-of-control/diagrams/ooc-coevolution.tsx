"use client";

export function OocCoevolutionDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="共同进化双向塑造关系图">
      <defs>
        <linearGradient id="ooc-ce-1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>
        <linearGradient id="ooc-ce-2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="ooc-ce-3" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
        <linearGradient id="ooc-ce-4" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#7c3aed" />
        </linearGradient>
        <marker id="ooc-ce-arrow-r" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">共同进化：物种间的双向塑造</text>

      {/* 核心概念：红皇后假说 */}
      <rect x="40" y="56" width="720" height="70" rx="10" fill="url(#ooc-ce-4)" opacity="0.08" stroke="#8b5cf6" strokeWidth="2" />
      <text x="400" y="80" textAnchor="middle" fontSize="13" fontWeight="700" fill="#7c3aed">红皇后假说：你必须全力奔跑才能留在原地</text>
      <text x="400" y="102" textAnchor="middle" fontSize="11" fill="#475569">每个物种都在进化，但彼此互为环境，所以相对位置不变——进化竞赛永无终点</text>
      <text x="400" y="118" textAnchor="middle" fontSize="10" fill="#64748b">捕食者变快 → 猎物必须变快 → 捕食者必须更快 → 无限循环</text>

      {/* 双向塑造循环 */}
      <text x="400" y="152" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">共同进化的四种模式</text>

      {/* 模式1：捕食-猎物军备竞赛 */}
      <rect x="40" y="166" width="345" height="120" rx="10" fill="url(#ooc-ce-1)" opacity="0.08" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="212" y="188" textAnchor="middle" fontSize="12" fontWeight="700" fill="#0369a1">模式一：捕食-猎物军备竞赛</text>
      <rect x="60" y="200" width="120" height="36" rx="6" fill="url(#ooc-ce-1)" opacity="0.7" />
      <text x="120" y="222" textAnchor="middle" fontSize="10" fill="#fff">猎豹变快</text>
      <path d="M184 218 L226 218" stroke="#64748b" strokeWidth="2" markerEnd="url(#ooc-ce-arrow-r)" />
      <path d="M226 230 L184 230" stroke="#64748b" strokeWidth="2" markerEnd="url(#ooc-ce-arrow-r)" />
      <rect x="230" y="200" width="120" height="36" rx="6" fill="url(#ooc-ce-2)" opacity="0.7" />
      <text x="290" y="222" textAnchor="middle" fontSize="10" fill="#fff">羚羊变快</text>
      <text x="212" y="256" textAnchor="middle" fontSize="9" fill="#475569">双向施压，双方不断提速</text>
      <text x="212" y="272" textAnchor="middle" fontSize="9" fill="#64748b">结果：速度极限被推到极致</text>

      {/* 模式2：共生互惠 */}
      <rect x="415" y="166" width="345" height="120" rx="10" fill="url(#ooc-ce-3)" opacity="0.08" stroke="#10b981" strokeWidth="1.5" />
      <text x="587" y="188" textAnchor="middle" fontSize="12" fontWeight="700" fill="#059669">模式二：共生互惠</text>
      <rect x="435" y="200" width="120" height="36" rx="6" fill="url(#ooc-ce-3)" opacity="0.7" />
      <text x="495" y="222" textAnchor="middle" fontSize="10" fill="#fff">花蜜供食</text>
      <path d="M559 218 L601 218" stroke="#64748b" strokeWidth="2" markerEnd="url(#ooc-ce-arrow-r)" />
      <path d="M601 230 L559 230" stroke="#64748b" strokeWidth="2" markerEnd="url(#ooc-ce-arrow-r)" />
      <rect x="605" y="200" width="120" height="36" rx="6" fill="url(#ooc-ce-3)" opacity="0.7" />
      <text x="665" y="222" textAnchor="middle" fontSize="10" fill="#fff">蜜蜂授粉</text>
      <text x="587" y="256" textAnchor="middle" fontSize="9" fill="#475569">双向受益，结构深度耦合</text>
      <text x="587" y="272" textAnchor="middle" fontSize="9" fill="#64748b">结果：双方互相依赖不可分离</text>

      {/* 模式3：寄生-宿主 */}
      <rect x="40" y="298" width="345" height="120" rx="10" fill="url(#ooc-ce-2)" opacity="0.08" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="212" y="320" textAnchor="middle" fontSize="12" fontWeight="700" fill="#d97706">模式三：寄生-宿主博弈</text>
      <rect x="60" y="332" width="120" height="36" rx="6" fill="url(#ooc-ce-2)" opacity="0.7" />
      <text x="120" y="354" textAnchor="middle" fontSize="10" fill="#fff">病毒变异</text>
      <path d="M184 350 L226 350" stroke="#64748b" strokeWidth="2" markerEnd="url(#ooc-ce-arrow-r)" />
      <path d="M226 362 L184 362" stroke="#64748b" strokeWidth="2" markerEnd="url(#ooc-ce-arrow-r)" />
      <rect x="230" y="332" width="120" height="36" rx="6" fill="url(#ooc-ce-1)" opacity="0.7" />
      <text x="290" y="354" textAnchor="middle" fontSize="10" fill="#fff">免疫升级</text>
      <text x="212" y="388" textAnchor="middle" fontSize="9" fill="#475569">一方进攻一方防御</text>
      <text x="212" y="404" textAnchor="middle" fontSize="9" fill="#64748b">结果：永不停歇的分子军备竞赛</text>

      {/* 模式4：竞争趋同 */}
      <rect x="415" y="298" width="345" height="120" rx="10" fill="url(#ooc-ce-4)" opacity="0.08" stroke="#8b5cf6" strokeWidth="1.5" />
      <text x="587" y="320" textAnchor="middle" fontSize="12" fontWeight="700" fill="#7c3aed">模式四：竞争驱动趋同</text>
      <rect x="435" y="332" width="120" height="36" rx="6" fill="url(#ooc-ce-4)" opacity="0.7" />
      <text x="495" y="354" textAnchor="middle" fontSize="10" fill="#fff">鱼类流线型</text>
      <path d="M559 350 L601 350" stroke="#64748b" strokeWidth="2" markerEnd="url(#ooc-ce-arrow-r)" />
      <path d="M601 362 L559 362" stroke="#64748b" strokeWidth="2" markerEnd="url(#ooc-ce-arrow-r)" />
      <rect x="605" y="332" width="120" height="36" rx="6" fill="url(#ooc-ce-4)" opacity="0.7" />
      <text x="665" y="354" textAnchor="middle" fontSize="10" fill="#fff">海豚流线型</text>
      <text x="587" y="388" textAnchor="middle" fontSize="9" fill="#475569">不同物种面临相同选择压力</text>
      <text x="587" y="404" textAnchor="middle" fontSize="9" fill="#64748b">结果：殊途同归，形态趋同</text>

      {/* 共同进化的技术延伸 */}
      <text x="400" y="442" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">共同进化的技术延伸</text>

      <rect x="40" y="456" width="230" height="80" rx="8" fill="#eff6ff" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="155" y="478" textAnchor="middle" fontSize="11" fontWeight="700" fill="#0369a1">病毒与杀毒软件</text>
      <text x="155" y="498" textAnchor="middle" fontSize="9" fill="#475569">病毒变异 → 杀软升级</text>
      <text x="155" y="516" textAnchor="middle" fontSize="9" fill="#475569">杀软升级 → 病毒再变异</text>
      <text x="155" y="534" textAnchor="middle" fontSize="9" fill="#64748b">永无终点的军备竞赛</text>

      <rect x="285" y="456" width="230" height="80" rx="8" fill="#f5f3ff" stroke="#8b5cf6" strokeWidth="1.5" />
      <text x="400" y="478" textAnchor="middle" fontSize="11" fontWeight="700" fill="#7c3aed">平台与开发者</text>
      <text x="400" y="498" textAnchor="middle" fontSize="9" fill="#475569">平台开放 → 开发者创新</text>
      <text x="400" y="516" textAnchor="middle" fontSize="9" fill="#475569">开发者创新 → 平台进化</text>
      <text x="400" y="534" textAnchor="middle" fontSize="9" fill="#64748b">生态共生互惠</text>

      <rect x="530" y="456" width="230" height="80" rx="8" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="645" y="478" textAnchor="middle" fontSize="11" fontWeight="700" fill="#d97706">人类与AI</text>
      <text x="645" y="498" textAnchor="middle" fontSize="9" fill="#475569">人类训练AI → AI改变人类</text>
      <text x="645" y="516" textAnchor="middle" fontSize="9" fill="#475569">AI改变人类 → 人类再训练AI</text>
      <text x="645" y="534" textAnchor="middle" fontSize="9" fill="#64748b">深度共同进化</text>

      {/* 底部总结 */}
      <rect x="40" y="548" width="720" height="24" rx="8" fill="url(#ooc-ce-4)" opacity="0.08" stroke="#8b5cf6" strokeWidth="1.5" />
      <text x="400" y="564" textAnchor="middle" fontSize="11" fontWeight="600" fill="#7c3aed">核心洞察：进化不是孤军奋战，而是网络中所有参与者的共同舞蹈</text>
    </svg>
  );
}
