"use client";

export function TcgFinalReviewDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="这就是ChatGPT全书复习与知识整合">
      <defs>
        <linearGradient id="tcg-fr-found" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="tcg-fr-rep" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="tcg-fr-arch" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="tcg-fr-gen" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#dc2626" />
          <stop offset="100%" stopColor="#b91c1c" />
        </linearGradient>
        <linearGradient id="tcg-fr-imp" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <marker id="tcg-fr-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">全书复习：这就是 ChatGPT 知识整合</text>

      {/* 知识演进路径 */}
      <text x="400" y="62" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">知识演进路径</text>

      <rect x="20" y="74" width="140" height="56" rx="8" fill="url(#tcg-fr-found)" opacity="0.9" />
      <text x="90" y="96" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">ch0-1 语言基础</text>
      <text x="90" y="116" textAnchor="middle" fontSize="10" fill="#bfdbfe">token / 语义</text>

      <path d="M160 102 L180 102" stroke="#64748b" strokeWidth="2" markerEnd="url(#tcg-fr-arrow)" />

      <rect x="185" y="74" width="140" height="56" rx="8" fill="url(#tcg-fr-rep)" opacity="0.9" />
      <text x="255" y="96" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">ch2-3 表示</text>
      <text x="255" y="116" textAnchor="middle" fontSize="10" fill="#ede9fe">神经网络 / 嵌入</text>

      <path d="M325 102 L345 102" stroke="#64748b" strokeWidth="2" markerEnd="url(#tcg-fr-arrow)" />

      <rect x="350" y="74" width="140" height="56" rx="8" fill="url(#tcg-fr-arch)" opacity="0.9" />
      <text x="420" y="96" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">ch4-5 架构</text>
      <text x="420" y="116" textAnchor="middle" fontSize="10" fill="#fef3c7">Transformer / 训练</text>

      <path d="M490 102 L510 102" stroke="#64748b" strokeWidth="2" markerEnd="url(#tcg-fr-arrow)" />

      <rect x="515" y="74" width="130" height="56" rx="8" fill="url(#tcg-fr-gen)" opacity="0.9" />
      <text x="580" y="96" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">ch6-7 生成</text>
      <text x="580" y="116" textAnchor="middle" fontSize="10" fill="#fecaca">预测 / 注意力</text>

      <path d="M645 102 L665 102" stroke="#64748b" strokeWidth="2" markerEnd="url(#tcg-fr-arrow)" />

      <rect x="670" y="74" width="110" height="56" rx="8" fill="url(#tcg-fr-imp)" opacity="0.9" />
      <text x="725" y="96" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">ch8-9 影响</text>
      <text x="725" y="116" textAnchor="middle" fontSize="10" fill="#d1fae5">未来+整合</text>

      {/* 核心概念统一 */}
      <text x="400" y="162" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">全书核心概念统一视角</text>

      <rect x="30" y="176" width="240" height="130" rx="8" fill="url(#tcg-fr-found)" opacity="0.1" stroke="#2563eb" strokeWidth="1.5" />
      <text x="150" y="198" textAnchor="middle" fontSize="13" fontWeight="700" fill="#1e40af">语言层：Token + 嵌入</text>
      <text x="150" y="220" textAnchor="middle" fontSize="11" fill="#475569">文本 → token序列 → 向量</text>
      <text x="150" y="240" textAnchor="middle" fontSize="11" fill="#475569">嵌入将语义编码为空间位置</text>
      <text x="150" y="260" textAnchor="middle" fontSize="11" fill="#475569">相似含义 = 向量距离近</text>
      <text x="150" y="282" textAnchor="middle" fontSize="11" fill="#475569">代表：tokenizer / embedding</text>
      <text x="150" y="298" textAnchor="middle" fontSize="10" fontWeight="600" fill="#2563eb">语言到数学的桥梁</text>

      <rect x="280" y="176" width="240" height="130" rx="8" fill="url(#tcg-fr-arch)" opacity="0.1" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="400" y="198" textAnchor="middle" fontSize="13" fontWeight="700" fill="#92400e">架构层：Transformer + 训练</text>
      <text x="400" y="220" textAnchor="middle" fontSize="11" fill="#475569">自注意力：Q-K-V机制</text>
      <text x="400" y="240" textAnchor="middle" fontSize="11" fill="#475569">每个token关注所有token</text>
      <text x="400" y="260" textAnchor="middle" fontSize="11" fill="#475569">三阶段训练：预训练→SFT→RLHF</text>
      <text x="400" y="282" textAnchor="middle" fontSize="11" fill="#475569">代表：GPT系列</text>
      <text x="400" y="298" textAnchor="middle" fontSize="10" fontWeight="600" fill="#f59e0b">并行+长程依赖的核心架构</text>

      <rect x="530" y="176" width="240" height="130" rx="8" fill="url(#tcg-fr-gen)" opacity="0.1" stroke="#dc2626" strokeWidth="1.5" />
      <text x="650" y="198" textAnchor="middle" fontSize="13" fontWeight="700" fill="#b91c1c">生成层：预测 + 采样</text>
      <text x="650" y="220" textAnchor="middle" fontSize="11" fill="#475569">自回归：逐token生成</text>
      <text x="650" y="240" textAnchor="middle" fontSize="11" fill="#475569">每步输出概率分布</text>
      <text x="650" y="260" textAnchor="middle" fontSize="11" fill="#475569">温度控制随机性/创造性</text>
      <text x="650" y="282" textAnchor="middle" fontSize="11" fill="#475569">代表：贪心/温度采样</text>
      <text x="650" y="298" textAnchor="middle" fontSize="10" fontWeight="600" fill="#dc2626">概率预测 → 策略采样 → 文本</text>

      {/* 核心公式回顾 */}
      <text x="400" y="332" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">全书核心机制</text>

      <rect x="30" y="346" width="230" height="56" rx="8" fill="#eff6ff" stroke="#2563eb" strokeWidth="1.5" />
      <text x="145" y="366" textAnchor="middle" fontSize="10" fontWeight="600" fill="#1e40af">下一个token预测（核心任务）</text>
      <text x="145" y="386" textAnchor="middle" fontSize="11" fill="#475569" fontFamily="monospace">P(next | all previous tokens)</text>

      <rect x="275" y="346" width="250" height="56" rx="8" fill="#fffbeb" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="400" y="366" textAnchor="middle" fontSize="10" fontWeight="600" fill="#92400e">自注意力（核心机制）</text>
      <text x="400" y="386" textAnchor="middle" fontSize="11" fill="#475569" fontFamily="monospace">Attention = softmax(QK/sqrt(d))V</text>

      <rect x="540" y="346" width="230" height="56" rx="8" fill="#f0fdf4" stroke="#059669" strokeWidth="1.5" />
      <text x="655" y="366" textAnchor="middle" fontSize="10" fontWeight="600" fill="#065f46">RLHF（核心对齐）</text>
      <text x="655" y="386" textAnchor="middle" fontSize="11" fill="#475569" fontFamily="monospace">maximize reward(model output)</text>

      {/* 能力-局限速查 */}
      <text x="400" y="430" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">能力与局限速查</text>

      <rect x="30" y="444" width="350" height="56" rx="8" fill="#f0fdf4" stroke="#059669" strokeWidth="1.5" />
      <text x="205" y="464" textAnchor="middle" fontSize="10" fontWeight="600" fill="#065f46">为什么有效</text>
      <text x="205" y="484" textAnchor="middle" fontSize="11" fill="#475569">海量数据中的统计规律 + 强大的模式匹配</text>

      <rect x="420" y="444" width="350" height="56" rx="8" fill="#fef2f2" stroke="#dc2626" strokeWidth="1.5" />
      <text x="595" y="464" textAnchor="middle" fontSize="10" fontWeight="600" fill="#b91c1c">为什么有限</text>
      <text x="595" y="484" textAnchor="middle" fontSize="11" fill="#475569">统计模式非真实理解 + 无外部事实验证</text>

      {/* 底部总结 */}
      <rect x="30" y="518" width="740" height="42" rx="8" fill="url(#tcg-fr-imp)" opacity="0.08" stroke="#059669" strokeWidth="2" />
      <text x="400" y="538" textAnchor="middle" fontSize="13" fontWeight="700" fill="#065f46">学习成果闭环</text>
      <text x="400" y="554" textAnchor="middle" fontSize="11" fill="#475569">语言基础 → 神经网络 → 嵌入 → Transformer → 训练 → 预测生成 → 注意力 → 未来影响 → 统一视角</text>
    </svg>
  );
}
