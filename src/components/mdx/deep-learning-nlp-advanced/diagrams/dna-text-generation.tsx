"use client";

export function DnaTextGenerationDiagram() {
  return (
    <svg viewBox="0 0 800 500" className="w-full h-auto" role="img" aria-label="文本生成实践">
      <defs>
        <linearGradient id="dna-gen-model" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="dna-gen-sample" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#dc2626" />
          <stop offset="100%" stopColor="#b91c1c" />
        </linearGradient>
        <marker id="dna-gen-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="18" fontWeight="700" fill="#0f172a">文本生成：自回归采样与评价</text>

      {/* 上半：自回归生成流程 */}
      <text x="400" y="62" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">自回归生成流程</text>

      {/* 步骤1：输入 */}
      <rect x="40" y="78" width="120" height="50" rx="8" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="100" y="100" textAnchor="middle" fontSize="11" fontWeight="600" fill="#334155">输入前缀</text>
      <text x="100" y="118" textAnchor="middle" fontSize="10" fill="#64748b">"The cat"</text>

      <path d="M160 103 L200 103" stroke="#64748b" strokeWidth="2" markerEnd="url(#dna-gen-arrow)" />

      {/* 步骤2：模型 */}
      <rect x="200" y="78" width="140" height="50" rx="8" fill="url(#dna-gen-model)" opacity="0.9" />
      <text x="270" y="100" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">语言模型</text>
      <text x="270" y="118" textAnchor="middle" fontSize="10" fill="#e9d5ff">P(next | context)</text>

      <path d="M340 103 L380 103" stroke="#64748b" strokeWidth="2" markerEnd="url(#dna-gen-arrow)" />

      {/* 步骤3：概率分布 */}
      <rect x="380" y="78" width="140" height="50" rx="8" fill="url(#dna-gen-sample)" opacity="0.12" stroke="#dc2626" strokeWidth="1.5" />
      <text x="450" y="100" textAnchor="middle" fontSize="11" fontWeight="700" fill="#991b1b">概率分布</text>
      <text x="450" y="118" textAnchor="middle" fontSize="9" fill="#475569">sat:0.3 ran:0.2 ...</text>

      <path d="M520 103 L560 103" stroke="#64748b" strokeWidth="2" markerEnd="url(#dna-gen-arrow)" />

      {/* 步骤4：采样 */}
      <rect x="560" y="78" width="120" height="50" rx="8" fill="#f0fdf4" stroke="#059669" strokeWidth="1.5" />
      <text x="620" y="100" textAnchor="middle" fontSize="11" fontWeight="700" fill="#065f46">采样策略</text>
      <text x="620" y="118" textAnchor="middle" fontSize="10" fill="#475569">选词 → 拼接</text>

      <path d="M620 128 L620 140 L100 140 L100 128" stroke="#64748b" strokeWidth="1.5" strokeDasharray="4 3" fill="none" markerEnd="url(#dna-gen-arrow)" />
      <text x="360" y="156" textAnchor="middle" fontSize="9" fill="#64748b">循环（自回归）直到 &lt;EOS&gt;</text>

      {/* 中间：采样策略对比 */}
      <text x="400" y="186" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">采样策略对比</text>

      <rect x="40" y="200" width="220" height="120" rx="8" fill="#eff6ff" stroke="#2563eb" strokeWidth="1.5" />
      <text x="150" y="222" textAnchor="middle" fontSize="11" fontWeight="700" fill="#1e40af">贪心搜索 Greedy</text>
      <text x="150" y="244" textAnchor="middle" fontSize="10" fill="#475569">每步选概率最高的词</text>
      <text x="150" y="262" textAnchor="middle" fontSize="10" fill="#475569">优点：简单快速</text>
      <text x="150" y="280" textAnchor="middle" fontSize="10" fill="#475569">缺点：输出重复、呆板</text>
      <text x="150" y="300" textAnchor="middle" fontSize="9" fill="#dc2626">→ 缺乏多样性</text>

      <rect x="290" y="200" width="220" height="120" rx="8" fill="#fffbeb" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="400" y="222" textAnchor="middle" fontSize="11" fontWeight="700" fill="#92400e">温度采样 Temperature</text>
      <text x="400" y="244" textAnchor="middle" fontSize="10" fill="#475569">按概率分布随机采样</text>
      <text x="400" y="262" textAnchor="middle" fontSize="10" fill="#475569">温度T：T大→随机</text>
      <text x="400" y="280" textAnchor="middle" fontSize="10" fill="#475569">　　　T小→确定</text>
      <text x="400" y="300" textAnchor="middle" fontSize="9" fill="#059669">→ 平衡多样性与质量</text>

      <rect x="540" y="200" width="220" height="120" rx="8" fill="#f0fdf4" stroke="#059669" strokeWidth="1.5" />
      <text x="650" y="222" textAnchor="middle" fontSize="11" fontWeight="700" fill="#065f46">Top-k / Top-p 采样</text>
      <text x="650" y="244" textAnchor="middle" fontSize="10" fill="#475569">Top-k：只从概率最高的k个中采</text>
      <text x="650" y="262" textAnchor="middle" fontSize="10" fill="#475569">Top-p：累计概率达p的词中采</text>
      <text x="650" y="280" textAnchor="middle" fontSize="10" fill="#475569">过滤长尾低质量词</text>
      <text x="650" y="300" textAnchor="middle" fontSize="9" fill="#059669">→ 实用最广</text>

      {/* 底部：评价方法 */}
      <text x="400" y="352" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">生成质量评价</text>

      <rect x="40" y="366" width="340" height="100" rx="8" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="210" y="388" textAnchor="middle" fontSize="11" fontWeight="700" fill="#334155">困惑度 Perplexity</text>
      <text x="210" y="408" textAnchor="middle" fontSize="10" fill="#475569">PPL = exp(平均交叉熵)</text>
      <text x="210" y="426" textAnchor="middle" fontSize="10" fill="#475569">越低越好：模型对真实文本越不「困惑」</text>
      <text x="210" y="446" textAnchor="middle" fontSize="9" fill="#475569">评估语言模型本身的质量</text>

      <rect x="420" y="366" width="340" height="100" rx="8" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="590" y="388" textAnchor="middle" fontSize="11" fontWeight="700" fill="#334155">BLEU 分数</text>
      <text x="590" y="408" textAnchor="middle" fontSize="10" fill="#475569">基于 n-gram 精确匹配</text>
      <text x="590" y="426" textAnchor="middle" fontSize="10" fill="#475569">与参考译文的重合度</text>
      <text x="590" y="446" textAnchor="middle" fontSize="9" fill="#475569">评估生成文本（翻译）的质量</text>
    </svg>
  );
}
