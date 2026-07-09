"use client";

export function BlaFinalReviewDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="全书复习：知识整合与工程闭环">
      <defs>
        <linearGradient id="bla-fr-blue" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="bla-fr-purple" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="bla-fr-amber" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="bla-fr-green" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <linearGradient id="bla-fr-red" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#dc2626" />
          <stop offset="100%" stopColor="#b91c1c" />
        </linearGradient>
        <marker id="bla-fr-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">全书复习：知识整合</text>

      {/* 知识演进路径 */}
      <text x="400" y="62" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">知识演进路径</text>

      <rect x="20" y="74" width="140" height="56" rx="8" fill="url(#bla-fr-blue)" opacity="0.9" />
      <text x="90" y="96" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">ch0-1 基础</text>
      <text x="90" y="116" textAnchor="middle" fontSize="9" fill="#bfdbfe">生态 + 全景</text>

      <path d="M162 102 L182 102" stroke="#64748b" strokeWidth="2" markerEnd="url(#bla-fr-arrow)" />

      <rect x="186" y="74" width="140" height="56" rx="8" fill="url(#bla-fr-purple)" opacity="0.9" />
      <text x="256" y="96" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">ch2-3 核心技能</text>
      <text x="256" y="116" textAnchor="middle" fontSize="9" fill="#ede9fe">提示 + RAG</text>

      <path d="M328 102 L348 102" stroke="#64748b" strokeWidth="2" markerEnd="url(#bla-fr-arrow)" />

      <rect x="352" y="74" width="140" height="56" rx="8" fill="url(#bla-fr-amber)" opacity="0.9" />
      <text x="422" y="96" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">ch4-5 开发</text>
      <text x="422" y="116" textAnchor="middle" fontSize="9" fill="#fef3c7">编排 + 微调</text>

      <path d="M494 102 L514 102" stroke="#64748b" strokeWidth="2" markerEnd="url(#bla-fr-arrow)" />

      <rect x="518" y="74" width="140" height="56" rx="8" fill="url(#bla-fr-green)" opacity="0.9" />
      <text x="588" y="96" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">ch6-7 高级</text>
      <text x="588" y="116" textAnchor="middle" fontSize="9" fill="#d1fae5">Agent + 多模态</text>

      <path d="M660 102 L680 102" stroke="#64748b" strokeWidth="2" markerEnd="url(#bla-fr-arrow)" />

      <rect x="684" y="74" width="96" height="56" rx="8" fill="url(#bla-fr-red)" opacity="0.9" />
      <text x="732" y="96" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">ch8-9 落地</text>
      <text x="732" y="116" textAnchor="middle" fontSize="9" fill="#fecaca">部署+整合</text>

      {/* 五层统一视角 */}
      <text x="400" y="162" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">五层统一视角</text>

      <rect x="20" y="176" width="148" height="140" rx="8" fill="url(#bla-fr-blue)" opacity="0.1" stroke="#2563eb" strokeWidth="1.5" />
      <text x="94" y="198" textAnchor="middle" fontSize="12" fontWeight="700" fill="#1e40af">基础层</text>
      <text x="94" y="220" textAnchor="middle" fontSize="10" fill="#475569">LLM生态</text>
      <text x="94" y="236" textAnchor="middle" fontSize="10" fill="#475569">模型选型</text>
      <text x="94" y="252" textAnchor="middle" fontSize="10" fill="#475569">API / 开源</text>
      <text x="94" y="268" textAnchor="middle" fontSize="10" fill="#475569">嵌入模型</text>
      <text x="94" y="296" textAnchor="middle" fontSize="9" fontWeight="600" fill="#2563eb">定义能力底座</text>

      <rect x="178" y="176" width="148" height="140" rx="8" fill="url(#bla-fr-purple)" opacity="0.1" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="252" y="198" textAnchor="middle" fontSize="12" fontWeight="700" fill="#5b21b6">交互层</text>
      <text x="252" y="220" textAnchor="middle" fontSize="10" fill="#475569">提示工程</text>
      <text x="252" y="236" textAnchor="middle" fontSize="10" fill="#475569">Few-shot / CoT</text>
      <text x="252" y="252" textAnchor="middle" fontSize="10" fill="#475569">结构化输出</text>
      <text x="252" y="268" textAnchor="middle" fontSize="10" fill="#475569">RAG检索</text>
      <text x="252" y="296" textAnchor="middle" fontSize="9" fontWeight="600" fill="#7c3aed">定义交互方式</text>

      <rect x="336" y="176" width="148" height="140" rx="8" fill="url(#bla-fr-amber)" opacity="0.1" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="410" y="198" textAnchor="middle" fontSize="12" fontWeight="700" fill="#92400e">开发层</text>
      <text x="410" y="220" textAnchor="middle" fontSize="10" fill="#475569">LangChain</text>
      <text x="410" y="236" textAnchor="middle" fontSize="10" fill="#475569">链式编排</text>
      <text x="410" y="252" textAnchor="middle" fontSize="10" fill="#475569">微调定制</text>
      <text x="410" y="268" textAnchor="middle" fontSize="10" fill="#475569">LoRA / QLoRA</text>
      <text x="410" y="296" textAnchor="middle" fontSize="9" fontWeight="600" fill="#f59e0b">定义开发能力</text>

      <rect x="494" y="176" width="148" height="140" rx="8" fill="url(#bla-fr-green)" opacity="0.1" stroke="#059669" strokeWidth="1.5" />
      <text x="568" y="198" textAnchor="middle" fontSize="12" fontWeight="700" fill="#065f46">智能层</text>
      <text x="568" y="220" textAnchor="middle" fontSize="10" fill="#475569">Agent自主</text>
      <text x="568" y="236" textAnchor="middle" fontSize="10" fill="#475569">工具调用</text>
      <text x="568" y="252" textAnchor="middle" fontSize="10" fill="#475569">多模态融合</text>
      <text x="568" y="268" textAnchor="middle" fontSize="10" fill="#475569">推理循环</text>
      <text x="568" y="296" textAnchor="middle" fontSize="9" fontWeight="600" fill="#059669">定义智能边界</text>

      <rect x="652" y="176" width="128" height="140" rx="8" fill="url(#bla-fr-red)" opacity="0.1" stroke="#dc2626" strokeWidth="1.5" />
      <text x="716" y="198" textAnchor="middle" fontSize="12" fontWeight="700" fill="#991b1b">生产层</text>
      <text x="716" y="220" textAnchor="middle" fontSize="10" fill="#475569">部署架构</text>
      <text x="716" y="236" textAnchor="middle" fontSize="10" fill="#475569">监控运维</text>
      <text x="716" y="252" textAnchor="middle" fontSize="10" fill="#475569">成本优化</text>
      <text x="716" y="268" textAnchor="middle" fontSize="10" fill="#475569">安全合规</text>
      <text x="716" y="296" textAnchor="middle" fontSize="9" fontWeight="600" fill="#991b1b">定义工程闭环</text>

      {/* 核心决策链 */}
      <text x="400" y="342" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">LLM应用决策链</text>

      <rect x="20" y="356" width="110" height="56" rx="8" fill="#eff6ff" stroke="#2563eb" strokeWidth="1.5" />
      <text x="75" y="376" textAnchor="middle" fontSize="10" fontWeight="600" fill="#1e40af">问题定义</text>
      <text x="75" y="396" textAnchor="middle" fontSize="9" fill="#475569">明确场景</text>

      <path d="M130 384 L148 384" stroke="#64748b" strokeWidth="2" markerEnd="url(#bla-fr-arrow)" />

      <rect x="152" y="356" width="110" height="56" rx="8" fill="#f5f3ff" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="207" y="376" textAnchor="middle" fontSize="10" fontWeight="600" fill="#5b21b6">模型选型</text>
      <text x="207" y="396" textAnchor="middle" fontSize="9" fill="#475569">API / 开源</text>

      <path d="M262 384 L280 384" stroke="#64748b" strokeWidth="2" markerEnd="url(#bla-fr-arrow)" />

      <rect x="284" y="356" width="110" height="56" rx="8" fill="#fffbeb" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="339" y="376" textAnchor="middle" fontSize="10" fontWeight="600" fill="#92400e">提示+RAG</text>
      <text x="339" y="396" textAnchor="middle" fontSize="9" fill="#475569">先试无训练</text>

      <path d="M394 384 L412 384" stroke="#64748b" strokeWidth="2" markerEnd="url(#bla-fr-arrow)" />

      <rect x="416" y="356" width="110" height="56" rx="8" fill="#f0fdf4" stroke="#059669" strokeWidth="1.5" />
      <text x="471" y="376" textAnchor="middle" fontSize="10" fontWeight="600" fill="#065f46">编排+Agent</text>
      <text x="471" y="396" textAnchor="middle" fontSize="9" fill="#475569">组合能力</text>

      <path d="M526 384 L544 384" stroke="#64748b" strokeWidth="2" markerEnd="url(#bla-fr-arrow)" />

      <rect x="548" y="356" width="110" height="56" rx="8" fill="#fef2f2" stroke="#dc2626" strokeWidth="1.5" />
      <text x="603" y="376" textAnchor="middle" fontSize="10" fontWeight="600" fill="#991b1b">微调优化</text>
      <text x="603" y="396" textAnchor="middle" fontSize="9" fill="#475569">按需定制</text>

      <path d="M658 384 L676 384" stroke="#64748b" strokeWidth="2" markerEnd="url(#bla-fr-arrow)" />

      <rect x="680" y="356" width="100" height="56" rx="8" fill="url(#bla-fr-purple)" opacity="0.15" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="730" y="384" textAnchor="middle" fontSize="9" fontWeight="600" fill="#5b21b6">生产上线</text>

      {/* 核心挑战与能力跃迁 */}
      <text x="400" y="442" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">核心挑战与能力跃迁</text>

      <rect x="30" y="456" width="350" height="56" rx="8" fill="url(#bla-fr-green)" opacity="0.08" stroke="#059669" strokeWidth="1.5" />
      <text x="205" y="476" textAnchor="middle" fontSize="10" fontWeight="600" fill="#065f46">能力跃迁路径</text>
      <text x="205" y="496" textAnchor="middle" fontSize="10" fill="#475569">理解模型 → 掌握提示 → 检索增强 → 编排开发 → 微调定制 → Agent → 生产</text>

      <rect x="420" y="456" width="350" height="56" rx="8" fill="url(#bla-fr-red)" opacity="0.08" stroke="#dc2626" strokeWidth="1.5" />
      <text x="595" y="476" textAnchor="middle" fontSize="10" fontWeight="600" fill="#991b1b">核心挑战</text>
      <text x="595" y="496" textAnchor="middle" fontSize="10" fill="#475569">幻觉 / 延迟 / 成本 / 安全 / 可靠性 / 评测</text>

      {/* 底部总结 */}
      <rect x="30" y="528" width="740" height="32" rx="8" fill="url(#bla-fr-purple)" opacity="0.08" stroke="#7c3aed" strokeWidth="2" />
      <text x="400" y="548" textAnchor="middle" fontSize="11" fontWeight="600" fill="#5b21b6">核心脉络：理解模型 → 掌握提示 → 检索增强 → 编排开发 → 微调定制 → Agent自主 → 多模态 → 生产落地 → 知识闭环</text>
    </svg>
  );
}
