"use client";

export function CppGptArchitectureDiagram() {
  return (
    <svg viewBox="0 0 800 560" className="w-full h-auto" role="img" aria-label="GPT模型架构 Transformer解码器堆叠">
      <defs>
        <linearGradient id="cpp-ga-blue" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="cpp-ga-purple" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="cpp-ga-amber" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="cpp-ga-green" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <marker id="cpp-ga-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="32" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">GPT 模型架构 · Transformer 解码器</text>

      {/* 输入层 */}
      <rect x="60" y="52" width="680" height="44" rx="8" fill="url(#cpp-ga-blue)" opacity="0.9" />
      <text x="400" y="79" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">输入：Token 序列（BPE 分词）</text>

      <path d="M400 96 L400 104" stroke="#64748b" strokeWidth="2" markerEnd="url(#cpp-ga-arrow)" />

      {/* 嵌入层 */}
      <rect x="60" y="108" width="330" height="44" rx="8" fill="url(#cpp-ga-purple)" opacity="0.85" />
      <text x="225" y="135" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">Token Embedding 词嵌入</text>

      <rect x="410" y="108" width="330" height="44" rx="8" fill="url(#cpp-ga-purple)" opacity="0.85" />
      <text x="575" y="135" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">位置编码 Positional Encoding</text>

      <path d="M400 152 L400 160" stroke="#64748b" strokeWidth="2" markerEnd="url(#cpp-ga-arrow)" />

      {/* 解码器堆叠 N× */}
      <rect x="60" y="164" width="680" height="232" rx="10" fill="#f5f3ff" stroke="#7c3aed" strokeWidth="2" />
      <text x="400" y="186" textAnchor="middle" fontSize="13" fontWeight="700" fill="#5b21b6">解码器堆叠 × N 层（GPT-3 共 96 层）</text>

      {/* 掩码自注意力 */}
      <rect x="90" y="198" width="620" height="54" rx="8" fill="url(#cpp-ga-amber)" opacity="0.9" />
      <text x="400" y="221" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">掩码多头自注意力 Masked Multi-Head Self-Attention</text>
      <text x="400" y="240" textAnchor="middle" fontSize="10" fill="#fef3c7">Query / Key / Value · 因果掩码防看见未来 · 残差 + LayerNorm</text>

      <path d="M400 252 L400 260" stroke="#64748b" strokeWidth="2" markerEnd="url(#cpp-ga-arrow)" />

      {/* 前馈网络 */}
      <rect x="90" y="264" width="620" height="54" rx="8" fill="url(#cpp-ga-green)" opacity="0.9" />
      <text x="400" y="287" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">前馈神经网络 FFN（两层 MLP + GELU 激活）</text>
      <text x="400" y="306" textAnchor="middle" fontSize="10" fill="#d1fae5">中间层扩展 4 倍维度 · 残差连接 + LayerNorm</text>

      <path d="M400 318 L400 326" stroke="#64748b" strokeWidth="2" markerEnd="url(#cpp-ga-arrow)" />

      {/* 层说明 */}
      <rect x="90" y="330" width="620" height="52" rx="8" fill="#fef2f2" stroke="#dc2626" strokeWidth="1.5" />
      <text x="400" y="351" textAnchor="middle" fontSize="11" fontWeight="600" fill="#b91c1c">每层 = 掩码自注意力 + FFN，均带残差连接与层归一化</text>
      <text x="400" y="370" textAnchor="middle" fontSize="10" fill="#7f1d1d">堆叠 N 层逐层提取更高层语义表示</text>

      <path d="M400 396 L400 404" stroke="#64748b" strokeWidth="2" markerEnd="url(#cpp-ga-arrow)" />

      {/* 输出头 */}
      <rect x="60" y="408" width="330" height="44" rx="8" fill="url(#cpp-ga-purple)" opacity="0.85" />
      <text x="225" y="435" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">最终 LayerNorm</text>

      <rect x="410" y="408" width="330" height="44" rx="8" fill="url(#cpp-ga-blue)" opacity="0.9" />
      <text x="575" y="435" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">LM Head · Softmax 概率分布</text>

      <path d="M400 452 L400 460" stroke="#64748b" strokeWidth="2" markerEnd="url(#cpp-ga-arrow)" />

      {/* 输出 */}
      <rect x="60" y="464" width="680" height="44" rx="8" fill="url(#cpp-ga-green)" opacity="0.9" />
      <text x="400" y="491" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">输出：预测下一个 Token（自回归生成）</text>

      {/* 底部说明 */}
      <rect x="60" y="520" width="680" height="30" rx="8" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="400" y="540" textAnchor="middle" fontSize="11" fill="#475569">核心思想：纯解码器架构 + 自回归 = 生成式语言模型，单向注意力保证生成顺序</text>
    </svg>
  );
}
