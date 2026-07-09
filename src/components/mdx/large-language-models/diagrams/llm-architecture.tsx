"use client";

export function LlmArchitectureDiagram() {
  return (
    <svg viewBox="0 0 800 600" className="w-full h-auto" role="img" aria-label="Transformer与注意力机制架构图 自注意力 多头注意力 前馈网络">
      <defs>
        <linearGradient id="llm-arch-blue" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="llm-arch-purple" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="llm-arch-amber" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="llm-arch-green" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <marker id="llm-arch-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">Transformer 与注意力机制</text>

      {/* 左侧：Transformer 整体架构 */}
      <text x="200" y="62" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">Transformer 层结构</text>

      {/* 输入嵌入 */}
      <rect x="80" y="76" width="240" height="40" rx="8" fill="url(#llm-arch-blue)" opacity="0.15" stroke="#2563eb" strokeWidth="1.5" />
      <text x="200" y="100" textAnchor="middle" fontSize="12" fontWeight="600" fill="#1e40af">输入嵌入 + 位置编码</text>

      <path d="M200 116 L200 122" stroke="#64748b" strokeWidth="2" markerEnd="url(#llm-arch-arrow)" />

      {/* N x Transformer Block */}
      <rect x="60" y="126" width="280" height="200" rx="10" fill="#f8fafc" stroke="#7c3aed" strokeWidth="2" strokeDasharray="4 2" />
      <text x="200" y="144" textAnchor="middle" fontSize="11" fontWeight="700" fill="#5b21b6">N x Transformer Block</text>

      {/* 多头注意力 */}
      <rect x="80" y="152" width="240" height="44" rx="8" fill="url(#llm-arch-purple)" opacity="0.12" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="200" y="170" textAnchor="middle" fontSize="11" fontWeight="600" fill="#5b21b6">多头自注意力</text>
      <text x="200" y="186" textAnchor="middle" fontSize="10" fill="#475569">Multi-Head Self-Attention</text>

      <path d="M200 196 L200 200" stroke="#64748b" strokeWidth="2" markerEnd="url(#llm-arch-arrow)" />
      <text x="282" y="204" textAnchor="middle" fontSize="9" fill="#94a3b8">残差+LayerNorm</text>

      {/* 前馈网络 */}
      <rect x="80" y="206" width="240" height="44" rx="8" fill="url(#llm-arch-amber)" opacity="0.12" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="200" y="224" textAnchor="middle" fontSize="11" fontWeight="600" fill="#92400e">前馈网络 FFN</text>
      <text x="200" y="240" textAnchor="middle" fontSize="10" fill="#475569">两层MLP + 激活函数</text>

      <path d="M200 250 L200 254" stroke="#64748b" strokeWidth="2" markerEnd="url(#llm-arch-arrow)" />
      <text x="282" y="258" textAnchor="middle" fontSize="9" fill="#94a3b8">残差+LayerNorm</text>

      {/* 输出 */}
      <rect x="100" y="260" width="200" height="36" rx="8" fill="url(#llm-arch-green)" opacity="0.12" stroke="#059669" strokeWidth="1.5" />
      <text x="200" y="282" textAnchor="middle" fontSize="11" fontWeight="600" fill="#065f46">隐层表示输出</text>

      <path d="M200 326 L200 332" stroke="#64748b" strokeWidth="2" markerEnd="url(#llm-arch-arrow)" />

      {/* 输出层 */}
      <rect x="80" y="336" width="240" height="40" rx="8" fill="url(#llm-arch-blue)" opacity="0.15" stroke="#2563eb" strokeWidth="1.5" />
      <text x="200" y="360" textAnchor="middle" fontSize="12" fontWeight="600" fill="#1e40af">Linear + Softmax 输出</text>

      {/* 右侧：自注意力机制详解 */}
      <text x="580" y="62" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">自注意力计算流程</text>

      {/* Q K V */}
      <rect x="420" y="76" width="100" height="40" rx="8" fill="url(#llm-arch-blue)" opacity="0.12" stroke="#2563eb" strokeWidth="1.5" />
      <text x="470" y="100" textAnchor="middle" fontSize="11" fontWeight="600" fill="#1e40af">Q (查询)</text>

      <rect x="540" y="76" width="100" height="40" rx="8" fill="url(#llm-arch-amber)" opacity="0.12" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="590" y="100" textAnchor="middle" fontSize="11" fontWeight="600" fill="#92400e">K (键)</text>

      <rect x="660" y="76" width="100" height="40" rx="8" fill="url(#llm-arch-green)" opacity="0.12" stroke="#059669" strokeWidth="1.5" />
      <text x="710" y="100" textAnchor="middle" fontSize="11" fontWeight="600" fill="#065f46">V (值)</text>

      {/* 注意力公式 */}
      <rect x="420" y="132" width="340" height="50" rx="8" fill="#eff6ff" stroke="#2563eb" strokeWidth="1.5" />
      <text x="590" y="154" textAnchor="middle" fontSize="13" fontWeight="600" fill="#1e40af">Attention(Q,K,V) = softmax(QK^T / sqrt(dk)) V</text>
      <text x="590" y="172" textAnchor="middle" fontSize="10" fill="#475569">缩放点积注意力</text>

      <path d="M590 182 L590 188" stroke="#64748b" strokeWidth="2" markerEnd="url(#llm-arch-arrow)" />

      {/* 多头注意力 */}
      <rect x="420" y="194" width="340" height="80" rx="8" fill="url(#llm-arch-purple)" opacity="0.08" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="590" y="214" textAnchor="middle" fontSize="12" fontWeight="700" fill="#5b21b6">多头注意力</text>
      <text x="590" y="234" textAnchor="middle" fontSize="11" fill="#475569">将 Q/K/V 分成 h 个头并行计算</text>
      <text x="590" y="252" textAnchor="middle" fontSize="11" fill="#475569">各头独立关注不同子空间的信息</text>
      <text x="590" y="268" textAnchor="middle" fontSize="10" fill="#475569">拼接后线性变换输出</text>

      <path d="M590 274 L590 280" stroke="#64748b" strokeWidth="2" markerEnd="url(#llm-arch-arrow)" />

      {/* FFN */}
      <rect x="420" y="286" width="340" height="60" rx="8" fill="url(#llm-arch-amber)" opacity="0.08" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="590" y="306" textAnchor="middle" fontSize="12" fontWeight="700" fill="#92400e">前馈网络 FFN</text>
      <text x="590" y="324" textAnchor="middle" fontSize="11" fill="#475569">两层线性变换 + 非线性激活</text>
      <text x="590" y="338" textAnchor="middle" fontSize="10" fill="#475569">FFN(x) = W2 * activation(W1 * x + b1) + b2</text>

      {/* 底部：三种注意力变体 */}
      <text x="400" y="402" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">注意力变体对比</text>

      <rect x="40" y="416" width="220" height="70" rx="8" fill="url(#llm-arch-blue)" opacity="0.08" stroke="#2563eb" strokeWidth="1.5" />
      <text x="150" y="438" textAnchor="middle" fontSize="12" fontWeight="700" fill="#1e40af">全注意力</text>
      <text x="150" y="458" textAnchor="middle" fontSize="10" fill="#475569">每个 token 关注所有位置</text>
      <text x="150" y="474" textAnchor="middle" fontSize="10" fill="#475569">复杂度 O(n^2)</text>

      <rect x="290" y="416" width="220" height="70" rx="8" fill="url(#llm-arch-purple)" opacity="0.08" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="400" y="438" textAnchor="middle" fontSize="12" fontWeight="700" fill="#5b21b6">因果注意力</text>
      <text x="400" y="458" textAnchor="middle" fontSize="10" fill="#475569">只关注当前位置及之前</text>
      <text x="400" y="474" textAnchor="middle" fontSize="10" fill="#475569">用于自回归生成（GPT）</text>

      <rect x="540" y="416" width="220" height="70" rx="8" fill="url(#llm-arch-amber)" opacity="0.08" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="650" y="438" textAnchor="middle" fontSize="12" fontWeight="700" fill="#92400e">稀疏注意力</text>
      <text x="650" y="458" textAnchor="middle" fontSize="10" fill="#475569">只关注部分关键位置</text>
      <text x="650" y="474" textAnchor="middle" fontSize="10" fill="#475569">降低长序列计算成本</text>

      {/* 底部总结 */}
      <rect x="40" y="506" width="720" height="36" rx="8" fill="url(#llm-arch-green)" opacity="0.08" stroke="#059669" strokeWidth="2" />
      <text x="400" y="528" textAnchor="middle" fontSize="11" fontWeight="600" fill="#065f46">核心：注意力让模型动态聚焦相关信息，多头机制捕获多维度语义关系，残差连接保障深层训练</text>

      <rect x="40" y="552" width="720" height="32" rx="8" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="400" y="572" textAnchor="middle" fontSize="11" fill="#475569">Transformer = 嵌入层 + N x (多头注意力 + 残差归一化 + FFN + 残差归一化) + 输出层</text>
    </svg>
  );
}
