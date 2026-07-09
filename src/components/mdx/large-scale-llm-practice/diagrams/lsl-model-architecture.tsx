"use client";

export function LslModelArchitectureDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="模型架构设计 Transformer架构与变体对比">
      <defs>
        <linearGradient id="lsl-ma-blue" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="lsl-ma-purple" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="lsl-ma-amber" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="lsl-ma-green" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <marker id="lsl-ma-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">模型架构设计</text>

      {/* Transformer 架构层次 */}
      <text x="400" y="62" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">Transformer Decoder 架构层次</text>

      <rect x="250" y="74" width="300" height="36" rx="8" fill="url(#lsl-ma-blue)" opacity="0.9" />
      <text x="400" y="97" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">Token 嵌入 + 位置编码</text>

      <path d="M400 110 L400 114" stroke="#64748b" strokeWidth="2" markerEnd="url(#lsl-ma-arrow)" />

      <rect x="250" y="118" width="300" height="36" rx="8" fill="url(#lsl-ma-purple)" opacity="0.9" />
      <text x="400" y="141" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">多头自注意力（因果掩码）</text>

      <path d="M400 154 L400 158" stroke="#64748b" strokeWidth="2" markerEnd="url(#lsl-ma-arrow)" />

      <rect x="250" y="162" width="300" height="36" rx="8" fill="url(#lsl-ma-amber)" opacity="0.9" />
      <text x="400" y="185" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">Add &amp; Norm（残差 + 层归一化）</text>

      <path d="M400 198 L400 202" stroke="#64748b" strokeWidth="2" markerEnd="url(#lsl-ma-arrow)" />

      <rect x="250" y="206" width="300" height="36" rx="8" fill="url(#lsl-ma-green)" opacity="0.9" />
      <text x="400" y="229" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">前馈网络（FFN / SwiGLU）</text>

      <path d="M400 242 L400 246" stroke="#64748b" strokeWidth="2" markerEnd="url(#lsl-ma-arrow)" />

      <rect x="250" y="250" width="300" height="36" rx="8" fill="url(#lsl-ma-amber)" opacity="0.9" />
      <text x="400" y="273" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">Add &amp; Norm + RMSNorm</text>

      <path d="M400 286 L400 290" stroke="#64748b" strokeWidth="2" markerEnd="url(#lsl-ma-arrow)" />

      <rect x="250" y="294" width="300" height="36" rx="8" fill="url(#lsl-ma-blue)" opacity="0.9" />
      <text x="400" y="317" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">输出层（LM Head + Softmax）</text>

      {/* 架构变体对比 */}
      <text x="400" y="352" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">架构变体对比</text>

      <rect x="30" y="366" width="180" height="100" rx="8" fill="url(#lsl-ma-blue)" opacity="0.1" stroke="#2563eb" strokeWidth="1.5" />
      <text x="120" y="388" textAnchor="middle" fontSize="12" fontWeight="700" fill="#1e40af">GPT 架构</text>
      <text x="120" y="408" textAnchor="middle" fontSize="9" fill="#475569">Decoder-only</text>
      <text x="120" y="424" textAnchor="middle" fontSize="9" fill="#475569">因果自注意力</text>
      <text x="120" y="440" textAnchor="middle" fontSize="9" fill="#475569">GPT-2/3 / LLaMA</text>
      <text x="120" y="458" textAnchor="middle" fontSize="9" fontWeight="600" fill="#059669">主流大模型标准</text>

      <rect x="220" y="366" width="180" height="100" rx="8" fill="url(#lsl-ma-purple)" opacity="0.1" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="310" y="388" textAnchor="middle" fontSize="12" fontWeight="700" fill="#5b21b6">MoE 架构</text>
      <text x="310" y="408" textAnchor="middle" fontSize="9" fill="#475569">混合专家</text>
      <text x="310" y="424" textAnchor="middle" fontSize="9" fill="#475569">稀疏激活 / Top-K 路由</text>
      <text x="310" y="440" textAnchor="middle" fontSize="9" fill="#475569">Mixtral / DeepSeek</text>
      <text x="310" y="458" textAnchor="middle" fontSize="9" fontWeight="600" fill="#059669">容量大推理快</text>

      <rect x="410" y="366" width="180" height="100" rx="8" fill="url(#lsl-ma-amber)" opacity="0.1" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="500" y="388" textAnchor="middle" fontSize="12" fontWeight="700" fill="#92400e">长上下文</text>
      <text x="500" y="408" textAnchor="middle" fontSize="9" fill="#475569">RoPE / ALiBi</text>
      <text x="500" y="424" textAnchor="middle" fontSize="9" fill="#475569">分块注意力</text>
      <text x="500" y="440" textAnchor="middle" fontSize="9" fill="#475569">128K-1M 上下文</text>
      <text x="500" y="458" textAnchor="middle" fontSize="9" fontWeight="600" fill="#059669">超长文档处理</text>

      <rect x="600" y="366" width="170" height="100" rx="8" fill="url(#lsl-ma-green)" opacity="0.1" stroke="#059669" strokeWidth="1.5" />
      <text x="685" y="388" textAnchor="middle" fontSize="12" fontWeight="700" fill="#065f46">高效架构</text>
      <text x="685" y="408" textAnchor="middle" fontSize="9" fill="#475569">MQA / GQA</text>
      <text x="685" y="424" textAnchor="middle" fontSize="9" fill="#475569">FlashAttention</text>
      <text x="685" y="440" textAnchor="middle" fontSize="9" fill="#475569">KV 缓存压缩</text>
      <text x="685" y="458" textAnchor="middle" fontSize="9" fontWeight="600" fill="#059669">推理显存优化</text>

      {/* 关键组件 */}
      <text x="400" y="492" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">关键组件技术</text>

      <rect x="30" y="506" width="180" height="32" rx="8" fill="#eff6ff" stroke="#2563eb" strokeWidth="1.5" />
      <text x="120" y="526" textAnchor="middle" fontSize="10" fill="#475569">RoPE 旋转位置编码</text>

      <rect x="220" y="506" width="180" height="32" rx="8" fill="#f5f3ff" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="310" y="526" textAnchor="middle" fontSize="10" fill="#475569">SwiGLU 激活函数</text>

      <rect x="410" y="506" width="180" height="32" rx="8" fill="#fffbeb" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="500" y="526" textAnchor="middle" fontSize="10" fill="#475569">RMSNorm 归一化</text>

      <rect x="600" y="506" width="170" height="32" rx="8" fill="#f0fdf4" stroke="#059669" strokeWidth="1.5" />
      <text x="685" y="526" textAnchor="middle" fontSize="10" fill="#475569">GQA 分组注意力</text>

      {/* 底部总结 */}
      <rect x="30" y="550" width="740" height="24" rx="8" fill="url(#lsl-ma-purple)" opacity="0.08" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="400" y="566" textAnchor="middle" fontSize="10" fontWeight="600" fill="#5b21b6">核心脉络：嵌入编码 → 自注意力 → FFN → 残差归一化 → 架构变体优化</text>
    </svg>
  );
}
