"use client";

export function TcgTransformersDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="Transformer架构：自注意力机制与并行处理">
      <defs>
        <linearGradient id="tcg-tf-input" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="tcg-tf-attn" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="tcg-tf-ff" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="tcg-tf-out" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <marker id="tcg-tf-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">Transformer 架构</text>

      {/* Transformer流水线 */}
      <text x="400" y="64" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">Transformer 处理流水线</text>

      <rect x="40" y="80" width="150" height="70" rx="10" fill="url(#tcg-tf-input)" opacity="0.1" stroke="#2563eb" strokeWidth="1.5" />
      <text x="115" y="106" textAnchor="middle" fontSize="12" fontWeight="700" fill="#1e40af">输入嵌入</text>
      <text x="115" y="126" textAnchor="middle" fontSize="10" fill="#475569">token → 向量</text>
      <text x="115" y="142" textAnchor="middle" fontSize="10" fill="#475569">+ 位置编码</text>

      <path d="M190 115 L210 115" stroke="#64748b" strokeWidth="2" markerEnd="url(#tcg-tf-arrow)" />

      <rect x="220" y="80" width="170" height="70" rx="10" fill="url(#tcg-tf-attn)" opacity="0.1" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="305" y="106" textAnchor="middle" fontSize="12" fontWeight="700" fill="#5b21b6">自注意力层</text>
      <text x="305" y="126" textAnchor="middle" fontSize="10" fill="#475569">每个token关注</text>
      <text x="305" y="142" textAnchor="middle" fontSize="10" fill="#475569">所有其他token</text>

      <path d="M390 115 L410 115" stroke="#64748b" strokeWidth="2" markerEnd="url(#tcg-tf-arrow)" />

      <rect x="420" y="80" width="150" height="70" rx="10" fill="url(#tcg-tf-ff)" opacity="0.1" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="495" y="106" textAnchor="middle" fontSize="12" fontWeight="700" fill="#92400e">前馈网络</text>
      <text x="495" y="126" textAnchor="middle" fontSize="10" fill="#475569">逐位置非线性</text>
      <text x="495" y="142" textAnchor="middle" fontSize="10" fill="#475569">变换</text>

      <path d="M570 115 L590 115" stroke="#64748b" strokeWidth="2" markerEnd="url(#tcg-tf-arrow)" />

      <rect x="600" y="80" width="160" height="70" rx="10" fill="url(#tcg-tf-out)" opacity="0.1" stroke="#059669" strokeWidth="1.5" />
      <text x="680" y="106" textAnchor="middle" fontSize="12" fontWeight="700" fill="#065f46">输出概率</text>
      <text x="680" y="126" textAnchor="middle" fontSize="10" fill="#475569">下一个token</text>
      <text x="680" y="142" textAnchor="middle" fontSize="10" fill="#475569">的概率分布</text>

      {/* 自注意力机制详解 */}
      <text x="400" y="180" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">自注意力：Q-K-V 机制</text>

      <rect x="40" y="196" width="220" height="130" rx="10" fill="#eff6ff" stroke="#2563eb" strokeWidth="1.5" />
      <text x="150" y="220" textAnchor="middle" fontSize="12" fontWeight="700" fill="#1e40af">Query (查询)</text>
      <text x="150" y="244" textAnchor="middle" fontSize="11" fill="#475569">"我在找什么"</text>
      <text x="150" y="268" textAnchor="middle" fontSize="11" fill="#475569">当前token生成查询向量</text>
      <text x="150" y="290" textAnchor="middle" fontSize="11" fill="#475569">决定关注哪些位置</text>
      <text x="150" y="312" textAnchor="middle" fontSize="10" fill="#64748b">Q = 嵌入 × W_Q</text>

      <rect x="290" y="196" width="220" height="130" rx="10" fill="#faf5ff" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="400" y="220" textAnchor="middle" fontSize="12" fontWeight="700" fill="#5b21b6">Key (键)</text>
      <text x="400" y="244" textAnchor="middle" fontSize="11" fill="#475569">"我有什么"</text>
      <text x="400" y="268" textAnchor="middle" fontSize="11" fill="#475569">每个token生成键向量</text>
      <text x="400" y="290" textAnchor="middle" fontSize="11" fill="#475569">被其他token查询匹配</text>
      <text x="400" y="312" textAnchor="middle" fontSize="10" fill="#64748b">K = 嵌入 × W_K</text>

      <rect x="540" y="196" width="220" height="130" rx="10" fill="#f0fdf4" stroke="#059669" strokeWidth="1.5" />
      <text x="650" y="220" textAnchor="middle" fontSize="12" fontWeight="700" fill="#065f46">Value (值)</text>
      <text x="650" y="244" textAnchor="middle" fontSize="11" fill="#475569">"我的内容"</text>
      <text x="650" y="268" textAnchor="middle" fontSize="11" fill="#475569">每个token生成值向量</text>
      <text x="650" y="290" textAnchor="middle" fontSize="11" fill="#475569">按注意力权重加权求和</text>
      <text x="650" y="312" textAnchor="middle" fontSize="10" fill="#64748b">V = 嵌入 × W_V</text>

      {/* 注意力计算流程 */}
      <text x="400" y="354" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">注意力计算流程</text>

      <rect x="40" y="370" width="160" height="56" rx="8" fill="url(#tcg-tf-attn)" opacity="0.1" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="120" y="394" textAnchor="middle" fontSize="11" fontWeight="700" fill="#5b21b6">1. 计算相似度</text>
      <text x="120" y="414" textAnchor="middle" fontSize="10" fill="#475569">Q 和 K 做点积</text>

      <path d="M200 398 L216 398" stroke="#64748b" strokeWidth="2" markerEnd="url(#tcg-tf-arrow)" />

      <rect x="220" y="370" width="160" height="56" rx="8" fill="url(#tcg-tf-attn)" opacity="0.1" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="300" y="394" textAnchor="middle" fontSize="11" fontWeight="700" fill="#5b21b6">2. 归一化</text>
      <text x="300" y="414" textAnchor="middle" fontSize="10" fill="#475569">softmax → 权重</text>

      <path d="M380 398 L396 398" stroke="#64748b" strokeWidth="2" markerEnd="url(#tcg-tf-arrow)" />

      <rect x="400" y="370" width="160" height="56" rx="8" fill="url(#tcg-tf-attn)" opacity="0.1" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="480" y="394" textAnchor="middle" fontSize="11" fontWeight="700" fill="#5b21b6">3. 加权求和</text>
      <text x="480" y="414" textAnchor="middle" fontSize="10" fill="#475569">权重 × V 求和</text>

      <path d="M560 398 L576 398" stroke="#64748b" strokeWidth="2" markerEnd="url(#tcg-tf-arrow)" />

      <rect x="580" y="370" width="180" height="56" rx="8" fill="url(#tcg-tf-out)" opacity="0.1" stroke="#059669" strokeWidth="1.5" />
      <text x="670" y="394" textAnchor="middle" fontSize="11" fontWeight="700" fill="#065f46">4. 输出</text>
      <text x="670" y="414" textAnchor="middle" fontSize="10" fill="#475569">融合上下文的表示</text>

      {/* Transformer优势 */}
      <text x="400" y="456" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">Transformer 的关键优势</text>

      <rect x="40" y="472" width="230" height="56" rx="8" fill="#eff6ff" stroke="#2563eb" strokeWidth="1.5" />
      <text x="155" y="494" textAnchor="middle" fontSize="11" fontWeight="700" fill="#1e40af">并行计算</text>
      <text x="155" y="514" textAnchor="middle" fontSize="10" fill="#475569">所有token同时处理，非串行</text>

      <rect x="285" y="472" width="230" height="56" rx="8" fill="#faf5ff" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="400" y="494" textAnchor="middle" fontSize="11" fontWeight="700" fill="#5b21b6">长程依赖</text>
      <text x="400" y="514" textAnchor="middle" fontSize="10" fill="#475569">任意距离token直接交互</text>

      <rect x="530" y="472" width="230" height="56" rx="8" fill="#f0fdf4" stroke="#059669" strokeWidth="1.5" />
      <text x="645" y="494" textAnchor="middle" fontSize="11" fontWeight="700" fill="#065f46">多头注意力</text>
      <text x="645" y="514" textAnchor="middle" fontSize="10" fill="#475569">多角度同时关注不同关系</text>

      {/* 底部总结 */}
      <rect x="40" y="540" width="720" height="28" rx="8" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="400" y="558" textAnchor="middle" fontSize="11" fill="#475569">自注意力 = 每个 token 与所有 token 计算相关性 → 加权聚合信息 → 捕获上下文依赖</text>
    </svg>
  );
}
