"use client";

export function MisMemoryModelsDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="记忆模型与心智模型结构图">
      <defs>
        <linearGradient id="mis-mm-1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>
        <linearGradient id="mis-mm-2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#16a34a" />
          <stop offset="100%" stopColor="#15803d" />
        </linearGradient>
        <linearGradient id="mis-mm-3" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ca8a04" />
          <stop offset="100%" stopColor="#a16207" />
        </linearGradient>
        <linearGradient id="mis-mm-4" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#9333ea" />
          <stop offset="100%" stopColor="#7e22ce" />
        </linearGradient>
        <marker id="mis-mm-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">记忆模型与心智模型</text>

      {/* 上半部分：三阶段记忆模型 */}
      <text x="400" y="62" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">三阶段记忆模型（Atkinson-Shiffrin）</text>

      <rect x="40" y="78" width="200" height="80" rx="10" fill="url(#mis-mm-1)" opacity="0.9" />
      <text x="140" y="104" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">感觉记忆</text>
      <text x="140" y="124" textAnchor="middle" fontSize="10" fill="#e0f2fe">极短（~0.5秒）</text>
      <text x="140" y="140" textAnchor="middle" fontSize="10" fill="#e0f2fe">容量大、快速衰退</text>

      <path d="M244 118 L276 118" stroke="#64748b" strokeWidth="2" markerEnd="url(#mis-mm-arrow)" />

      <rect x="280" y="78" width="200" height="80" rx="10" fill="url(#mis-mm-2)" opacity="0.9" />
      <text x="380" y="104" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">工作记忆</text>
      <text x="380" y="124" textAnchor="middle" fontSize="10" fill="#dcfce7">短时（~30秒）</text>
      <text x="380" y="140" textAnchor="middle" fontSize="10" fill="#dcfce7">容量有限（4±1 组块）</text>

      <path d="M484 118 L516 118" stroke="#64748b" strokeWidth="2" markerEnd="url(#mis-mm-arrow)" />

      <rect x="520" y="78" width="240" height="80" rx="10" fill="url(#mis-mm-3)" opacity="0.9" />
      <text x="640" y="104" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">长期记忆</text>
      <text x="640" y="124" textAnchor="middle" fontSize="10" fill="#fef9c3">容量近乎无限</text>
      <text x="640" y="140" textAnchor="middle" fontSize="10" fill="#fef9c3">通过编码和检索巩固</text>

      {/* 编码和检索箭头 */}
      <path d="M380 162 Q380 180 380 195" stroke="#16a34a" strokeWidth="2" markerEnd="url(#mis-mm-arrow)" />
      <text x="395" y="184" fontSize="9" fill="#15803d">编码</text>

      <path d="M640 78 Q640 55 460 55 L390 55 Q380 55 380 76" stroke="#9333ea" strokeWidth="2" fill="none" markerEnd="url(#mis-mm-arrow)" />
      <text x="500" y="48" fontSize="9" fill="#7e22ce">检索（提取）</text>

      {/* 中间部分：心智模型构建 */}
      <text x="400" y="222" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">心智模型的构建过程</text>

      <rect x="30" y="238" width="140" height="60" rx="8" fill="url(#mis-mm-1)" opacity="0.1" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="100" y="260" textAnchor="middle" fontSize="11" fontWeight="600" fill="#0369a1">孤立事实</text>
      <text x="100" y="280" textAnchor="middle" fontSize="9" fill="#475569">碎片化知识点</text>

      <path d="M174 268 L196 268" stroke="#64748b" strokeWidth="2" markerEnd="url(#mis-mm-arrow)" />

      <rect x="200" y="238" width="140" height="60" rx="8" fill="url(#mis-mm-2)" opacity="0.1" stroke="#16a34a" strokeWidth="1.5" />
      <text x="270" y="260" textAnchor="middle" fontSize="11" fontWeight="600" fill="#15803d">建立关联</text>
      <text x="270" y="280" textAnchor="middle" fontSize="9" fill="#475569">发现知识点间联系</text>

      <path d="M344 268 L366 268" stroke="#64748b" strokeWidth="2" markerEnd="url(#mis-mm-arrow)" />

      <rect x="370" y="238" width="140" height="60" rx="8" fill="url(#mis-mm-3)" opacity="0.1" stroke="#ca8a04" strokeWidth="1.5" />
      <text x="440" y="260" textAnchor="middle" fontSize="11" fontWeight="600" fill="#a16207">形成结构</text>
      <text x="440" y="280" textAnchor="middle" fontSize="9" fill="#475569">组织为有意义的框架</text>

      <path d="M514 268 L536 268" stroke="#64748b" strokeWidth="2" markerEnd="url(#mis-mm-arrow)" />

      <rect x="540" y="238" width="140" height="60" rx="8" fill="url(#mis-mm-4)" opacity="0.1" stroke="#9333ea" strokeWidth="1.5" />
      <text x="610" y="260" textAnchor="middle" fontSize="11" fontWeight="600" fill="#7e22ce">心智模型</text>
      <text x="610" y="280" textAnchor="middle" fontSize="9" fill="#475569">可推理、可迁移</text>

      {/* 下半部分：心智模型的特点 */}
      <text x="400" y="324" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">良好心智模型的四个特征</text>

      <rect x="30" y="340" width="170" height="80" rx="8" fill="url(#mis-mm-2)" opacity="0.08" stroke="#16a34a" strokeWidth="1.5" />
      <text x="115" y="362" textAnchor="middle" fontSize="11" fontWeight="700" fill="#15803d">连贯性</text>
      <text x="115" y="382" textAnchor="middle" fontSize="10" fill="#475569">各部分逻辑一致</text>
      <text x="115" y="398" textAnchor="middle" fontSize="10" fill="#475569">无自相矛盾</text>

      <rect x="220" y="340" width="170" height="80" rx="8" fill="url(#mis-mm-3)" opacity="0.08" stroke="#ca8a04" strokeWidth="1.5" />
      <text x="305" y="362" textAnchor="middle" fontSize="11" fontWeight="700" fill="#a16207">灵活性</text>
      <text x="305" y="382" textAnchor="middle" fontSize="10" fill="#475569">可适应新情境</text>
      <text x="305" y="398" textAnchor="middle" fontSize="10" fill="#475569">不僵化套用</text>

      <rect x="410" y="340" width="170" height="80" rx="8" fill="url(#mis-mm-4)" opacity="0.08" stroke="#9333ea" strokeWidth="1.5" />
      <text x="495" y="362" textAnchor="middle" fontSize="11" fontWeight="700" fill="#7e22ce">可迁移性</text>
      <text x="495" y="382" textAnchor="middle" fontSize="10" fill="#475569">跨领域应用</text>
      <text x="495" y="398" textAnchor="middle" fontSize="10" fill="#475569">举一反三</text>

      <rect x="600" y="340" width="170" height="80" rx="8" fill="url(#mis-mm-1)" opacity="0.08" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="685" y="362" textAnchor="middle" fontSize="11" fontWeight="700" fill="#0369a1">可修正性</text>
      <text x="685" y="382" textAnchor="middle" fontSize="10" fill="#475569">接受新证据</text>
      <text x="685" y="398" textAnchor="middle" fontSize="10" fill="#475569">持续迭代更新</text>

      {/* 底部：心智模型 vs 死记硬背 */}
      <rect x="40" y="440" width="340" height="56" rx="8" fill="#fee2e2" stroke="#dc2626" strokeWidth="1.5" />
      <text x="210" y="462" textAnchor="middle" fontSize="11" fontWeight="700" fill="#b91c1c">死记硬背</text>
      <text x="210" y="482" textAnchor="middle" fontSize="10" fill="#475569">孤立事实 → 无法推理 → 易遗忘</text>

      <rect x="420" y="440" width="340" height="56" rx="8" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1.5" />
      <text x="590" y="462" textAnchor="middle" fontSize="11" fontWeight="700" fill="#15803d">心智模型</text>
      <text x="590" y="482" textAnchor="middle" fontSize="10" fill="#475569">结构化理解 → 可推理迁移 → 长期保持</text>

      {/* 底部总结 */}
      <rect x="40" y="512" width="720" height="48" rx="8" fill="url(#mis-mm-4)" opacity="0.08" stroke="#9333ea" strokeWidth="1.5" />
      <text x="400" y="534" textAnchor="middle" fontSize="11" fontWeight="600" fill="#7e22ce">核心：学习的目标不是积累事实，而是构建可推理、可迁移的心智模型</text>
      <text x="400" y="552" textAnchor="middle" fontSize="10" fill="#475569">检索巩固记忆通路，精细化建立关联，反思修正模型结构</text>
    </svg>
  );
}
