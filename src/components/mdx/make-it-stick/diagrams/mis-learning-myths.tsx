"use client";

export function MisLearningMythsDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="学习迷思与科学真相对比图">
      <defs>
        <linearGradient id="mis-myth-r" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#dc2626" />
          <stop offset="100%" stopColor="#b91c1c" />
        </linearGradient>
        <linearGradient id="mis-myth-g" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#16a34a" />
          <stop offset="100%" stopColor="#15803d" />
        </linearGradient>
        <marker id="mis-myth-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">学习的迷思 vs 科学真相</text>

      {/* 左列：迷思 */}
      <rect x="30" y="56" width="340" height="36" rx="8" fill="url(#mis-myth-r)" opacity="0.9" />
      <text x="200" y="80" textAnchor="middle" fontSize="15" fontWeight="700" fill="#fff">常见迷思（低效学习）</text>

      <rect x="30" y="100" width="340" height="60" rx="8" fill="#fee2e2" stroke="#dc2626" strokeWidth="1.5" />
      <text x="50" y="120" fontSize="12" fontWeight="700" fill="#b91c1c">迷思 1：重复阅读 = 学习</text>
      <text x="50" y="140" fontSize="11" fill="#475569">反复看书觉得「越来越熟」，</text>
      <text x="50" y="154" fontSize="11" fill="#475569">实际只是产生了流畅性错觉</text>

      <rect x="30" y="168" width="340" height="60" rx="8" fill="#fee2e2" stroke="#dc2626" strokeWidth="1.5" />
      <text x="50" y="188" fontSize="12" fontWeight="700" fill="#b91c1c">迷思 2：集中练习更高效</text>
      <text x="50" y="208" fontSize="11" fill="#475569">一次性突击大量同类内容，</text>
      <text x="50" y="222" fontSize="11" fill="#475569">短期记忆强但遗忘极快</text>

      <rect x="30" y="236" width="340" height="60" rx="8" fill="#fee2e2" stroke="#dc2626" strokeWidth="1.5" />
      <text x="50" y="256" fontSize="12" fontWeight="700" fill="#b91c1c">迷思 3：学习风格决定效率</text>
      <text x="50" y="276" fontSize="11" fill="#475569">视觉型/听觉型等分类，</text>
      <text x="50" y="290" fontSize="11" fill="#475569">科学研究未证实其有效性</text>

      <rect x="30" y="304" width="340" height="60" rx="8" fill="#fee2e2" stroke="#dc2626" strokeWidth="1.5" />
      <text x="50" y="324" fontSize="12" fontWeight="700" fill="#b91c1c">迷思 4：轻松 = 学会了</text>
      <text x="50" y="344" fontSize="11" fill="#475569">感觉轻松愉快往往说明</text>
      <text x="50" y="358" fontSize="11" fill="#475569">没有触发深度认知加工</text>

      {/* 右列：真相 */}
      <rect x="430" y="56" width="340" height="36" rx="8" fill="url(#mis-myth-g)" opacity="0.9" />
      <text x="600" y="80" textAnchor="middle" fontSize="15" fontWeight="700" fill="#fff">科学真相（高效学习）</text>

      <rect x="430" y="100" width="340" height="60" rx="8" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1.5" />
      <text x="450" y="120" fontSize="12" fontWeight="700" fill="#15803d">真相 1：检索练习更有效</text>
      <text x="450" y="140" fontSize="11" fill="#475569">主动回忆比重复阅读</text>
      <text x="450" y="154" fontSize="11" fill="#475569">效果高 50% 以上</text>

      <rect x="430" y="168" width="340" height="60" rx="8" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1.5" />
      <text x="450" y="188" fontSize="12" fontWeight="700" fill="#15803d">真相 2：间隔练习更持久</text>
      <text x="450" y="208" fontSize="11" fill="#475569">分散到多天练习，</text>
      <text x="450" y="222" fontSize="11" fill="#475569">利用遗忘曲线巩固长期记忆</text>

      <rect x="430" y="236" width="340" height="60" rx="8" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1.5" />
      <text x="450" y="256" fontSize="12" fontWeight="700" fill="#15803d">真相 3：穿插混合更迁移</text>
      <text x="450" y="276" fontSize="11" fill="#475569">混合不同类型题目练习，</text>
      <text x="450" y="290" fontSize="11" fill="#475569">培养辨识和迁移能力</text>

      <rect x="430" y="304" width="340" height="60" rx="8" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1.5" />
      <text x="450" y="324" fontSize="12" fontWeight="700" fill="#15803d">真相 4：适度困难促成长</text>
      <text x="450" y="344" fontSize="11" fill="#475569">「合意困难」触发深度加工，</text>
      <text x="450" y="358" fontSize="11" fill="#475569">短期慢但长期记忆更牢固</text>

      {/* 中间箭头 */}
      <path d="M374 130 L424 130" stroke="#64748b" strokeWidth="2" markerEnd="url(#mis-myth-arrow)" />
      <path d="M374 198 L424 198" stroke="#64748b" strokeWidth="2" markerEnd="url(#mis-myth-arrow)" />
      <path d="M374 266 L424 266" stroke="#64748b" strokeWidth="2" markerEnd="url(#mis-myth-arrow)" />
      <path d="M374 334 L424 334" stroke="#64748b" strokeWidth="2" markerEnd="url(#mis-myth-arrow)" />

      {/* 底部：流畅性错觉机制 */}
      <text x="400" y="400" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">流畅性错觉的产生机制</text>

      <rect x="60" y="414" width="140" height="60" rx="8" fill="#fef9c3" stroke="#ca8a04" strokeWidth="1.5" />
      <text x="130" y="436" textAnchor="middle" fontSize="11" fontWeight="600" fill="#a16207">重复阅读</text>
      <text x="130" y="454" textAnchor="middle" fontSize="10" fill="#475569">文本越来越熟悉</text>
      <text x="130" y="468" textAnchor="middle" fontSize="10" fill="#475569">加工越来越流畅</text>

      <path d="M204 444 L228 444" stroke="#64748b" strokeWidth="2" markerEnd="url(#mis-myth-arrow)" />

      <rect x="232" y="414" width="140" height="60" rx="8" fill="#fef9c3" stroke="#ca8a04" strokeWidth="1.5" />
      <text x="302" y="436" textAnchor="middle" fontSize="11" fontWeight="600" fill="#a16207">流畅性错觉</text>
      <text x="302" y="454" textAnchor="middle" fontSize="10" fill="#475569">误以为「流畅」=</text>
      <text x="302" y="468" textAnchor="middle" fontSize="10" fill="#475569">「学会了」</text>

      <path d="M376 444 L400 444" stroke="#64748b" strokeWidth="2" markerEnd="url(#mis-myth-arrow)" />

      <rect x="404" y="414" width="140" height="60" rx="8" fill="#fef9c3" stroke="#ca8a04" strokeWidth="1.5" />
      <text x="474" y="436" textAnchor="middle" fontSize="11" fontWeight="600" fill="#a16207">过度自信</text>
      <text x="474" y="454" textAnchor="middle" fontSize="10" fill="#475569">高估自己的</text>
      <text x="474" y="468" textAnchor="middle" fontSize="10" fill="#475569">掌握程度</text>

      <path d="M548 444 L572 444" stroke="#64748b" strokeWidth="2" markerEnd="url(#mis-myth-arrow)" />

      <rect x="576" y="414" width="164" height="60" rx="8" fill="#fee2e2" stroke="#dc2626" strokeWidth="1.5" />
      <text x="658" y="436" textAnchor="middle" fontSize="11" fontWeight="600" fill="#b91c1c">考试时暴露</text>
      <text x="658" y="454" textAnchor="middle" fontSize="10" fill="#475569">发现自己根本</text>
      <text x="658" y="468" textAnchor="middle" fontSize="10" fill="#475569">想不起来答案</text>

      {/* 底部总结 */}
      <rect x="40" y="500" width="720" height="56" rx="8" fill="url(#mis-myth-g)" opacity="0.08" stroke="#16a34a" strokeWidth="1.5" />
      <text x="400" y="524" textAnchor="middle" fontSize="12" fontWeight="600" fill="#15803d">核心原则：学习不是「让知识变熟悉」，而是「让知识可提取」。</text>
      <text x="400" y="544" textAnchor="middle" fontSize="11" fill="#475569">主动检索 + 间隔巩固 + 适度困难 = 真正的学习</text>
    </svg>
  );
}
