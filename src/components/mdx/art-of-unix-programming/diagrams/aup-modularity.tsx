"use client";

export function AupModularityDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="模块性与组合设计原则图">
      <defs>
        <linearGradient id="aup-mod-1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>
        <linearGradient id="aup-mod-2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#9333ea" />
          <stop offset="100%" stopColor="#7e22ce" />
        </linearGradient>
        <linearGradient id="aup-mod-3" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#16a34a" />
          <stop offset="100%" stopColor="#15803d" />
        </linearGradient>
        <linearGradient id="aup-mod-4" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ca8a04" />
          <stop offset="100%" stopColor="#a16207" />
        </linearGradient>
        <marker id="aup-mod-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">模块性与组合</text>

      {/* 四大设计原则 */}
      <rect x="30" y="56" width="360" height="120" rx="10" fill="url(#aup-mod-1)" opacity="0.1" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="50" y="80" fontSize="13" fontWeight="700" fill="#0369a1">紧凑性 Compactness</text>
      <text x="50" y="100" fontSize="10" fill="#475569">设计能否装进人脑的工作记忆</text>
      <text x="50" y="116" fontSize="10" fill="#475569">一个紧凑的接口易于理解记忆</text>
      <text x="50" y="132" fontSize="10" fill="#475569">Unix 工具通常只暴露少量选项</text>
      <text x="50" y="148" fontSize="10" fill="#475569">核心 API 不超过 7 个概念</text>
      <rect x="50" y="156" width="100" height="16" rx="4" fill="#0ea5e9" opacity="0.2" />
      <text x="100" y="168" textAnchor="middle" fontSize="9" fontWeight="600" fill="#0369a1">人脑友好</text>

      <rect x="410" y="56" width="360" height="120" rx="10" fill="url(#aup-mod-2)" opacity="0.1" stroke="#9333ea" strokeWidth="1.5" />
      <text x="430" y="80" fontSize="13" fontWeight="700" fill="#7e22ce">正交性 Orthogonality</text>
      <text x="430" y="100" fontSize="10" fill="#475569">每个功能有且仅有一个修改点</text>
      <text x="430" y="116" fontSize="10" fill="#475569">功能互不耦合，可独立变化</text>
      <text x="430" y="132" fontSize="10" fill="#475569">消除副作用，减少隐藏依赖</text>
      <text x="430" y="148" fontSize="10" fill="#475569">如 ls 不修改文件，只展示</text>
      <rect x="430" y="156" width="100" height="16" rx="4" fill="#9333ea" opacity="0.2" />
      <text x="480" y="168" textAnchor="middle" fontSize="9" fontWeight="600" fill="#7e22ce">单一职责</text>

      <rect x="30" y="190" width="360" height="120" rx="10" fill="url(#aup-mod-3)" opacity="0.1" stroke="#16a34a" strokeWidth="1.5" />
      <text x="50" y="214" fontSize="13" fontWeight="700" fill="#15803d">SPOT 原则</text>
      <text x="50" y="234" fontSize="10" fill="#475569">Single Point Of Truth</text>
      <text x="50" y="250" fontSize="10" fill="#475569">任何知识点只存在一个源头</text>
      <text x="50" y="266" fontSize="10" fill="#475569">数据格式定义唯一一处</text>
      <text x="50" y="282" fontSize="10" fill="#475569">避免重复，DRY 的架构版本</text>
      <rect x="50" y="290" width="100" height="16" rx="4" fill="#16a34a" opacity="0.2" />
      <text x="100" y="302" textAnchor="middle" fontSize="9" fontWeight="600" fill="#15803d">真相唯一</text>

      <rect x="410" y="190" width="360" height="120" rx="10" fill="url(#aup-mod-4)" opacity="0.1" stroke="#ca8a04" strokeWidth="1.5" />
      <text x="430" y="214" fontSize="13" fontWeight="700" fill="#a16207">组合性 Composability</text>
      <text x="430" y="234" fontSize="10" fill="#475569">输入输出可被管道串联</text>
      <text x="430" y="250" fontSize="10" fill="#475569">过滤模式：读 stdin 写 stdout</text>
      <text x="430" y="266" fontSize="10" fill="#475569">无副作用，状态隔离</text>
      <text x="430" y="282" fontSize="10" fill="#475569">工具间无需预知彼此存在</text>
      <rect x="430" y="290" width="100" height="16" rx="4" fill="#ca8a04" opacity="0.2" />
      <text x="480" y="302" textAnchor="middle" fontSize="9" fontWeight="600" fill="#a16207">自由组合</text>

      {/* 紧凑性 vs 正交性矩阵 */}
      <text x="400" y="340" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">紧凑性 × 正交性评估矩阵</text>

      <rect x="300" y="354" width="200" height="40" rx="8" fill="#f1f5f9" stroke="#475569" strokeWidth="1.5" />
      <text x="400" y="378" textAnchor="middle" fontSize="11" fontWeight="600" fill="#334155">设计质量评估</text>

      <path d="M340 394 L200 414" stroke="#64748b" strokeWidth="2" markerEnd="url(#aup-mod-arrow)" />
      <path d="M460 394 L600 414" stroke="#64748b" strokeWidth="2" markerEnd="url(#aup-mod-arrow)" />

      <rect x="100" y="418" width="200" height="40" rx="8" fill="url(#aup-mod-3)" opacity="0.15" stroke="#16a34a" strokeWidth="1.5" />
      <text x="200" y="442" textAnchor="middle" fontSize="11" fontWeight="600" fill="#15803d">紧凑且正交 → 优秀</text>

      <rect x="500" y="418" width="200" height="40" rx="8" fill="url(#aup-mod-4)" opacity="0.15" stroke="#ca8a04" strokeWidth="1.5" />
      <text x="600" y="442" textAnchor="middle" fontSize="11" fontWeight="600" fill="#a16207">紧凑不正交 → 可用</text>

      <path d="M200 458 L200 472" stroke="#64748b" strokeWidth="2" markerEnd="url(#aup-mod-arrow)" />
      <path d="M600 458 L600 472" stroke="#64748b" strokeWidth="2" markerEnd="url(#aup-mod-arrow)" />

      <rect x="100" y="476" width="200" height="36" rx="8" fill="#fef9c3" stroke="#ca8a04" strokeWidth="1.5" />
      <text x="200" y="498" textAnchor="middle" fontSize="10" fill="#a16207">不紧凑但正交 → 勉强</text>

      <rect x="500" y="476" width="200" height="36" rx="8" fill="#fee2e2" stroke="#dc2626" strokeWidth="1.5" />
      <text x="600" y="498" textAnchor="middle" fontSize="10" fill="#b91c1c">既不紧凑也不正交 → 重构</text>

      {/* 底部总结 */}
      <rect x="30" y="528" width="740" height="36" rx="8" fill="url(#aup-mod-2)" opacity="0.08" stroke="#9333ea" strokeWidth="1.5" />
      <text x="400" y="550" textAnchor="middle" fontSize="11" fontWeight="600" fill="#7e22ce">核心：紧凑（可记忆）+ 正交（不耦合）+ SPOT（无重复）+ 可组合（管道串联）= 优秀模块设计</text>
    </svg>
  );
}
