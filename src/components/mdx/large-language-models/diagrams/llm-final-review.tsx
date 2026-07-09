"use client";

export function LlmFinalReviewDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="全书复习 大语言模型知识整合与能力闭环">
      <defs>
        <linearGradient id="llm-frv-blue" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="llm-frv-purple" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="llm-frv-amber" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="llm-frv-green" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <linearGradient id="llm-frv-red" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#dc2626" />
          <stop offset="100%" stopColor="#b91c1c" />
        </linearGradient>
        <marker id="llm-frv-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">全书复习：大语言模型知识整合</text>

      {/* 知识演进路径 */}
      <text x="400" y="62" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">知识演进路径</text>

      <rect x="20" y="74" width="120" height="56" rx="8" fill="url(#llm-frv-blue)" opacity="0.9" />
      <text x="80" y="96" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">ch0-2 基础</text>
      <text x="80" y="116" textAnchor="middle" fontSize="9" fill="#bfdbfe">数学+架构</text>

      <path d="M140 102 L160 102" stroke="#64748b" strokeWidth="2" markerEnd="url(#llm-frv-arrow)" />

      <rect x="165" y="74" width="130" height="56" rx="8" fill="url(#llm-frv-purple)" opacity="0.9" />
      <text x="230" y="96" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">ch3-4 训练</text>
      <text x="230" y="116" textAnchor="middle" fontSize="9" fill="#ede9fe">缩放+数据</text>

      <path d="M295 102 L315 102" stroke="#64748b" strokeWidth="2" markerEnd="url(#llm-frv-arrow)" />

      <rect x="320" y="74" width="130" height="56" rx="8" fill="url(#llm-frv-amber)" opacity="0.9" />
      <text x="385" y="96" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">ch5 对齐</text>
      <text x="385" y="116" textAnchor="middle" fontSize="9" fill="#fef3c7">SFT+RLHF</text>

      <path d="M450 102 L470 102" stroke="#64748b" strokeWidth="2" markerEnd="url(#llm-frv-arrow)" />

      <rect x="475" y="74" width="130" height="56" rx="8" fill="url(#llm-frv-green)" opacity="0.9" />
      <text x="540" y="96" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">ch6-7 落地</text>
      <text x="540" y="116" textAnchor="middle" fontSize="9" fill="#d1fae5">推理+评估</text>

      <path d="M605 102 L625 102" stroke="#64748b" strokeWidth="2" markerEnd="url(#llm-frv-arrow)" />

      <rect x="630" y="74" width="150" height="56" rx="8" fill="url(#llm-frv-red)" opacity="0.9" />
      <text x="705" y="96" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">ch8-9 前沿</text>
      <text x="705" y="116" textAnchor="middle" fontSize="9" fill="#fecaca">方向+整合</text>

      {/* 五层技术栈统一视角 */}
      <text x="400" y="162" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">五层技术栈统一视角</text>

      <rect x="20" y="176" width="148" height="140" rx="8" fill="url(#llm-frv-blue)" opacity="0.1" stroke="#2563eb" strokeWidth="1.5" />
      <text x="94" y="198" textAnchor="middle" fontSize="12" fontWeight="700" fill="#1e40af">数学层</text>
      <text x="94" y="220" textAnchor="middle" fontSize="10" fill="#475569">概率论</text>
      <text x="94" y="236" textAnchor="middle" fontSize="10" fill="#475569">线性代数</text>
      <text x="94" y="252" textAnchor="middle" fontSize="10" fill="#475569">优化理论</text>
      <text x="94" y="268" textAnchor="middle" fontSize="10" fill="#475569">信息论</text>
      <text x="94" y="296" textAnchor="middle" fontSize="9" fontWeight="600" fill="#2563eb">定义理论基础</text>

      <rect x="178" y="176" width="148" height="140" rx="8" fill="url(#llm-frv-purple)" opacity="0.1" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="252" y="198" textAnchor="middle" fontSize="12" fontWeight="700" fill="#5b21b6">架构层</text>
      <text x="252" y="220" textAnchor="middle" fontSize="10" fill="#475569">Transformer</text>
      <text x="252" y="236" textAnchor="middle" fontSize="10" fill="#475569">自注意力</text>
      <text x="252" y="252" textAnchor="middle" fontSize="10" fill="#475569">多头机制</text>
      <text x="252" y="268" textAnchor="middle" fontSize="10" fill="#475569">位置编码</text>
      <text x="252" y="296" textAnchor="middle" fontSize="9" fontWeight="600" fill="#7c3aed">定义模型骨架</text>

      <rect x="336" y="176" width="148" height="140" rx="8" fill="url(#llm-frv-amber)" opacity="0.1" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="410" y="198" textAnchor="middle" fontSize="12" fontWeight="700" fill="#92400e">训练层</text>
      <text x="410" y="220" textAnchor="middle" fontSize="10" fill="#475569">缩放定律</text>
      <text x="410" y="236" textAnchor="middle" fontSize="10" fill="#475569">数据工程</text>
      <text x="410" y="252" textAnchor="middle" fontSize="10" fill="#475569">预训练</text>
      <text x="410" y="268" textAnchor="middle" fontSize="10" fill="#475569">后训练对齐</text>
      <text x="410" y="296" textAnchor="middle" fontSize="9" fontWeight="600" fill="#f59e0b">定义能力来源</text>

      <rect x="494" y="176" width="148" height="140" rx="8" fill="url(#llm-frv-green)" opacity="0.1" stroke="#059669" strokeWidth="1.5" />
      <text x="568" y="198" textAnchor="middle" fontSize="12" fontWeight="700" fill="#065f46">工程层</text>
      <text x="568" y="220" textAnchor="middle" fontSize="10" fill="#475569">推理优化</text>
      <text x="568" y="236" textAnchor="middle" fontSize="10" fill="#475569">量化部署</text>
      <text x="568" y="252" textAnchor="middle" fontSize="10" fill="#475569">评估基准</text>
      <text x="568" y="268" textAnchor="middle" fontSize="10" fill="#475569">服务化</text>
      <text x="568" y="296" textAnchor="middle" fontSize="9" fontWeight="600" fill="#059669">定义落地能力</text>

      <rect x="652" y="176" width="128" height="140" rx="8" fill="url(#llm-frv-red)" opacity="0.1" stroke="#dc2626" strokeWidth="1.5" />
      <text x="716" y="198" textAnchor="middle" fontSize="12" fontWeight="700" fill="#991b1b">前沿层</text>
      <text x="716" y="220" textAnchor="middle" fontSize="10" fill="#475569">多模态</text>
      <text x="716" y="236" textAnchor="middle" fontSize="10" fill="#475569">Agent</text>
      <text x="716" y="252" textAnchor="middle" fontSize="10" fill="#475569">MoE</text>
      <text x="716" y="268" textAnchor="middle" fontSize="10" fill="#475569">长上下文</text>
      <text x="716" y="296" textAnchor="middle" fontSize="9" fontWeight="600" fill="#991b1b">定义演进方向</text>

      {/* 核心决策链 */}
      <text x="400" y="342" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">核心技术决策链</text>

      <rect x="20" y="356" width="110" height="56" rx="8" fill="#eff6ff" stroke="#2563eb" strokeWidth="1.5" />
      <text x="75" y="376" textAnchor="middle" fontSize="10" fontWeight="600" fill="#1e40af">数学奠基</text>
      <text x="75" y="396" textAnchor="middle" fontSize="9" fill="#475569">理解原理</text>

      <path d="M130 384 L148 384" stroke="#64748b" strokeWidth="2" markerEnd="url(#llm-frv-arrow)" />

      <rect x="152" y="356" width="110" height="56" rx="8" fill="#f5f3ff" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="207" y="376" textAnchor="middle" fontSize="10" fontWeight="600" fill="#5b21b6">架构设计</text>
      <text x="207" y="396" textAnchor="middle" fontSize="9" fill="#475569">选模型</text>

      <path d="M262 384 L280 384" stroke="#64748b" strokeWidth="2" markerEnd="url(#llm-frv-arrow)" />

      <rect x="284" y="356" width="110" height="56" rx="8" fill="#fffbeb" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="339" y="376" textAnchor="middle" fontSize="10" fontWeight="600" fill="#92400e">训练对齐</text>
      <text x="339" y="396" textAnchor="middle" fontSize="9" fill="#475569">给能力规矩</text>

      <path d="M394 384 L412 384" stroke="#64748b" strokeWidth="2" markerEnd="url(#llm-frv-arrow)" />

      <rect x="416" y="356" width="110" height="56" rx="8" fill="#f0fdf4" stroke="#059669" strokeWidth="1.5" />
      <text x="471" y="376" textAnchor="middle" fontSize="10" fontWeight="600" fill="#065f46">推理部署</text>
      <text x="471" y="396" textAnchor="middle" fontSize="9" fill="#475569">上生产</text>

      <path d="M526 384 L544 384" stroke="#64748b" strokeWidth="2" markerEnd="url(#llm-frv-arrow)" />

      <rect x="548" y="356" width="110" height="56" rx="8" fill="#fef2f2" stroke="#dc2626" strokeWidth="1.5" />
      <text x="603" y="376" textAnchor="middle" fontSize="10" fontWeight="600" fill="#991b1b">评估迭代</text>
      <text x="603" y="396" textAnchor="middle" fontSize="9" fill="#475569">持续优化</text>

      <path d="M658 384 L676 384" stroke="#64748b" strokeWidth="2" markerEnd="url(#llm-frv-arrow)" />

      <rect x="680" y="356" width="100" height="56" rx="8" fill="url(#llm-frv-purple)" opacity="0.15" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="730" y="384" textAnchor="middle" fontSize="9" fontWeight="600" fill="#5b21b6">闭环</text>

      {/* 核心挑战 */}
      <text x="400" y="442" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">核心挑战与能力跃迁</text>

      <rect x="30" y="456" width="350" height="56" rx="8" fill="url(#llm-frv-green)" opacity="0.08" stroke="#059669" strokeWidth="1.5" />
      <text x="205" y="476" textAnchor="middle" fontSize="10" fontWeight="600" fill="#065f46">能力跃迁路径</text>
      <text x="205" y="496" textAnchor="middle" fontSize="10" fill="#475569">数学理解 → 架构创新 → 规模扩展 → 对齐安全 → 工程落地 → 前沿探索</text>

      <rect x="420" y="456" width="350" height="56" rx="8" fill="url(#llm-frv-red)" opacity="0.08" stroke="#dc2626" strokeWidth="1.5" />
      <text x="595" y="476" textAnchor="middle" fontSize="10" fontWeight="600" fill="#991b1b">核心挑战</text>
      <text x="595" y="496" textAnchor="middle" fontSize="10" fill="#475569">成本 / 延迟 / 幻觉 / 安全 / 可控 / 评估</text>

      {/* 底部总结 */}
      <rect x="30" y="528" width="740" height="32" rx="8" fill="url(#llm-frv-purple)" opacity="0.08" stroke="#7c3aed" strokeWidth="2" />
      <text x="400" y="548" textAnchor="middle" fontSize="11" fontWeight="600" fill="#5b21b6">核心脉络：数学奠基 → 架构创新 → 规模扩展 → 数据驱动 → 对齐安全 → 工程落地 → 前沿探索 → 知识闭环</text>
    </svg>
  );
}
