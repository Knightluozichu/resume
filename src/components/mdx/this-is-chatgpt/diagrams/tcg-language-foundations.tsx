"use client";

export function TcgLanguageFoundationsDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="语言与意义的基础：从文本到token到语义">
      <defs>
        <linearGradient id="tcg-lf-text" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="tcg-lf-token" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="tcg-lf-meaning" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <marker id="tcg-lf-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">语言与意义的基础</text>

      {/* 三段式：文本 → Token → 语义 */}
      <text x="400" y="68" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">从文本到意义的三层转换</text>

      {/* 第一层：原始文本 */}
      <rect x="40" y="84" width="220" height="100" rx="10" fill="url(#tcg-lf-text)" opacity="0.1" stroke="#2563eb" strokeWidth="1.5" />
      <text x="150" y="108" textAnchor="middle" fontSize="13" fontWeight="700" fill="#1e40af">原始文本</text>
      <text x="150" y="130" textAnchor="middle" fontSize="11" fill="#475569" fontFamily="monospace">"The cat sat on"</text>
      <text x="150" y="150" textAnchor="middle" fontSize="11" fill="#475569" fontFamily="monospace">"the mat"</text>
      <text x="150" y="172" textAnchor="middle" fontSize="10" fill="#64748b">人类可读的自然语言</text>

      <path d="M260 134 L300 134" stroke="#64748b" strokeWidth="2" markerEnd="url(#tcg-lf-arrow)" />

      {/* 第二层：Token化 */}
      <rect x="310" y="84" width="220" height="100" rx="10" fill="url(#tcg-lf-token)" opacity="0.1" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="420" y="108" textAnchor="middle" fontSize="13" fontWeight="700" fill="#5b21b6">Token序列</text>
      <text x="420" y="130" textAnchor="middle" fontSize="11" fill="#475569" fontFamily="monospace">[The] [cat] [sat] [on]</text>
      <text x="420" y="150" textAnchor="middle" fontSize="11" fill="#475569" fontFamily="monospace">[the] [mat]</text>
      <text x="420" y="172" textAnchor="middle" fontSize="10" fill="#64748b">分词后的离散单元</text>

      <path d="M530 134 L570 134" stroke="#64748b" strokeWidth="2" markerEnd="url(#tcg-lf-arrow)" />

      {/* 第三层：语义 */}
      <rect x="580" y="84" width="180" height="100" rx="10" fill="url(#tcg-lf-meaning)" opacity="0.1" stroke="#059669" strokeWidth="1.5" />
      <text x="670" y="108" textAnchor="middle" fontSize="13" fontWeight="700" fill="#065f46">语义空间</text>
      <text x="670" y="130" textAnchor="middle" fontSize="11" fill="#475569">概念与关系的</text>
      <text x="670" y="148" textAnchor="middle" fontSize="11" fill="#475569">高维向量表示</text>
      <text x="670" y="172" textAnchor="middle" fontSize="10" fill="#64748b">机器可计算的语义</text>

      {/* Token化详解 */}
      <text x="400" y="216" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">Token化：语言的基本单元</text>

      <rect x="40" y="232" width="350" height="120" rx="10" fill="#eff6ff" stroke="#2563eb" strokeWidth="1.5" />
      <text x="215" y="256" textAnchor="middle" fontSize="12" fontWeight="700" fill="#1e40af">什么是 Token</text>
      <text x="215" y="278" textAnchor="middle" fontSize="11" fill="#475569">文本被切分为有限集合中的单元</text>
      <text x="215" y="298" textAnchor="middle" fontSize="11" fill="#475569">可以是词、子词或字符片段</text>
      <text x="215" y="318" textAnchor="middle" fontSize="11" fill="#475569">GPT词汇表约5万个token</text>
      <text x="215" y="340" textAnchor="middle" fontSize="10" fill="#64748b">常见词独占一个token，罕见词拆分</text>

      <rect x="410" y="232" width="350" height="120" rx="10" fill="#f0fdf4" stroke="#059669" strokeWidth="1.5" />
      <text x="585" y="256" textAnchor="middle" fontSize="12" fontWeight="700" fill="#065f46">为什么需要 Token</text>
      <text x="585" y="278" textAnchor="middle" fontSize="11" fill="#475569">将连续文本转为离散序列</text>
      <text x="585" y="298" textAnchor="middle" fontSize="11" fill="#475569">每个token对应一个整数ID</text>
      <text x="585" y="318" textAnchor="middle" fontSize="11" fill="#475569">模型通过ID查找嵌入向量</text>
      <text x="585" y="340" textAnchor="middle" fontSize="10" fill="#64748b">token化是语言到数学的第一步</text>

      {/* 语言的意义挑战 */}
      <text x="400" y="384" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">语言理解的核心挑战</text>

      <rect x="40" y="400" width="230" height="80" rx="10" fill="#fffbeb" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="155" y="424" textAnchor="middle" fontSize="12" fontWeight="700" fill="#92400e">无限句子</text>
      <text x="155" y="446" textAnchor="middle" fontSize="11" fill="#475569">有限词汇组合出无限句子</text>
      <text x="155" y="466" textAnchor="middle" fontSize="10" fill="#64748b">无法穷举所有可能</text>

      <rect x="285" y="400" width="230" height="80" rx="10" fill="#fffbeb" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="400" y="424" textAnchor="middle" fontSize="12" fontWeight="700" fill="#92400e">上下文依赖</text>
      <text x="400" y="446" textAnchor="middle" fontSize="11" fill="#475569">同一词在不同语境含义不同</text>
      <text x="400" y="466" textAnchor="middle" fontSize="10" fill="#64748b">"bank" = 银行 or 河岸</text>

      <rect x="530" y="400" width="230" height="80" rx="10" fill="#fffbeb" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="645" y="424" textAnchor="middle" fontSize="12" fontWeight="700" fill="#92400e">语义组合性</text>
      <text x="645" y="446" textAnchor="middle" fontSize="11" fill="#475569">整体意义不等于部分之和</text>
      <text x="645" y="466" textAnchor="middle" fontSize="10" fill="#64748b">语序和结构改变含义</text>

      {/* 底部总结 */}
      <rect x="40" y="500" width="720" height="52" rx="8" fill="#f0fdf4" stroke="#059669" strokeWidth="2" />
      <text x="400" y="522" textAnchor="middle" fontSize="13" fontWeight="700" fill="#065f46">核心洞察</text>
      <text x="400" y="542" textAnchor="middle" fontSize="11" fill="#475569">语言 = 有限token的有序序列 → 模型学习序列规律 → 生成有意义的文本</text>
    </svg>
  );
}
