"use client";

export function BlaLearningMapDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="Building LLM Powered Applications 知识全景图与十章学习路径">
      <defs>
        <linearGradient id="bla-lm-found" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="bla-lm-core" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="bla-lm-dev" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="bla-lm-adv" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <linearGradient id="bla-lm-prod" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#dc2626" />
          <stop offset="100%" stopColor="#b91c1c" />
        </linearGradient>
        <marker id="bla-lm-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">Building LLM Powered Applications · 知识全景图</text>

      {/* 左侧：五大学习阶段 */}
      <text x="160" y="68" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">学习主线</text>

      <rect x="40" y="78" width="240" height="46" rx="10" fill="url(#bla-lm-found)" opacity="0.95" />
      <text x="160" y="99" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">基础认知</text>
      <text x="160" y="116" textAnchor="middle" fontSize="11" fill="#bfdbfe">知识全景 / LLM生态</text>

      <path d="M160 124 L160 128" stroke="#64748b" strokeWidth="2" markerEnd="url(#bla-lm-arrow)" />

      <rect x="40" y="132" width="240" height="46" rx="10" fill="url(#bla-lm-core)" opacity="0.95" />
      <text x="160" y="153" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">核心技能</text>
      <text x="160" y="170" textAnchor="middle" fontSize="11" fill="#ede9fe">提示工程 / RAG</text>

      <path d="M160 178 L160 182" stroke="#64748b" strokeWidth="2" markerEnd="url(#bla-lm-arrow)" />

      <rect x="40" y="186" width="240" height="46" rx="10" fill="url(#bla-lm-dev)" opacity="0.95" />
      <text x="160" y="207" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">开发进阶</text>
      <text x="160" y="224" textAnchor="middle" fontSize="11" fill="#fef3c7">编排框架 / 微调</text>

      <path d="M160 232 L160 236" stroke="#64748b" strokeWidth="2" markerEnd="url(#bla-lm-arrow)" />

      <rect x="40" y="240" width="240" height="46" rx="10" fill="url(#bla-lm-adv)" opacity="0.95" />
      <text x="160" y="261" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">高级应用</text>
      <text x="160" y="278" textAnchor="middle" fontSize="11" fill="#d1fae5">Agent / 多模态</text>

      <path d="M160 286 L160 290" stroke="#64748b" strokeWidth="2" markerEnd="url(#bla-lm-arrow)" />

      <rect x="40" y="294" width="240" height="46" rx="10" fill="url(#bla-lm-prod)" opacity="0.95" />
      <text x="160" y="315" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">生产落地</text>
      <text x="160" y="332" textAnchor="middle" fontSize="11" fill="#fecaca">部署运维 / 全书复习</text>

      <text x="160" y="360" textAnchor="middle" fontSize="11" fontWeight="600" fill="#7c3aed">从提示工程到生产部署的全链路</text>

      {/* 右侧：10章学习路径 */}
      <text x="540" y="68" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">十章学习路径</text>

      <rect x="320" y="78" width="460" height="34" rx="8" fill="url(#bla-lm-found)" opacity="0.12" stroke="#2563eb" strokeWidth="1.5" />
      <text x="338" y="100" fontSize="12" fontWeight="600" fill="#1e40af">ch0</text>
      <text x="372" y="100" fontSize="11" fill="#475569">知识全景图——学习路径总览</text>

      <path d="M550 112 L550 116" stroke="#64748b" strokeWidth="2" markerEnd="url(#bla-lm-arrow)" />

      <rect x="320" y="118" width="460" height="34" rx="8" fill="url(#bla-lm-found)" opacity="0.12" stroke="#2563eb" strokeWidth="1.5" />
      <text x="338" y="140" fontSize="12" fontWeight="600" fill="#1e40af">ch1</text>
      <text x="372" y="140" fontSize="11" fill="#475569">LLM应用生态全景——模型与框架</text>

      <path d="M550 152 L550 156" stroke="#64748b" strokeWidth="2" markerEnd="url(#bla-lm-arrow)" />

      <rect x="320" y="158" width="460" height="34" rx="8" fill="url(#bla-lm-core)" opacity="0.12" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="338" y="180" fontSize="12" fontWeight="600" fill="#5b21b6">ch2</text>
      <text x="372" y="180" fontSize="11" fill="#475569">提示工程实践——从Zero-shot到CoT</text>

      <path d="M550 192 L550 196" stroke="#64748b" strokeWidth="2" markerEnd="url(#bla-lm-arrow)" />

      <rect x="320" y="198" width="460" height="34" rx="8" fill="url(#bla-lm-core)" opacity="0.12" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="338" y="220" fontSize="12" fontWeight="600" fill="#5b21b6">ch3</text>
      <text x="372" y="220" fontSize="11" fill="#475569">RAG应用开发——检索增强生成</text>

      <path d="M550 232 L550 236" stroke="#64748b" strokeWidth="2" markerEnd="url(#bla-lm-arrow)" />

      <rect x="320" y="238" width="460" height="34" rx="8" fill="url(#bla-lm-dev)" opacity="0.12" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="338" y="260" fontSize="12" fontWeight="600" fill="#92400e">ch4</text>
      <text x="372" y="260" fontSize="11" fill="#475569">编排框架与LangChain——链与Agent</text>

      <path d="M550 272 L550 276" stroke="#64748b" strokeWidth="2" markerEnd="url(#bla-lm-arrow)" />

      <rect x="320" y="278" width="460" height="34" rx="8" fill="url(#bla-lm-dev)" opacity="0.12" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="338" y="300" fontSize="12" fontWeight="600" fill="#92400e">ch5</text>
      <text x="372" y="300" fontSize="11" fill="#475569">微调应用开发——LoRA与QLoRA</text>

      <path d="M550 312 L550 316" stroke="#64748b" strokeWidth="2" markerEnd="url(#bla-lm-arrow)" />

      <rect x="320" y="318" width="460" height="34" rx="8" fill="url(#bla-lm-adv)" opacity="0.12" stroke="#059669" strokeWidth="1.5" />
      <text x="338" y="340" fontSize="12" fontWeight="600" fill="#065f46">ch6</text>
      <text x="372" y="340" fontSize="11" fill="#475569">Agent应用构建——推理循环与工具</text>

      <path d="M550 352 L550 356" stroke="#64748b" strokeWidth="2" markerEnd="url(#bla-lm-arrow)" />

      <rect x="320" y="358" width="460" height="34" rx="8" fill="url(#bla-lm-adv)" opacity="0.12" stroke="#059669" strokeWidth="1.5" />
      <text x="338" y="380" fontSize="12" fontWeight="600" fill="#065f46">ch7</text>
      <text x="372" y="380" fontSize="11" fill="#475569">多模态应用——图文音视融合</text>

      <path d="M550 392 L550 396" stroke="#64748b" strokeWidth="2" markerEnd="url(#bla-lm-arrow)" />

      <rect x="320" y="398" width="460" height="34" rx="8" fill="url(#bla-lm-prod)" opacity="0.12" stroke="#dc2626" strokeWidth="1.5" />
      <text x="338" y="420" fontSize="12" fontWeight="600" fill="#991b1b">ch8</text>
      <text x="372" y="420" fontSize="11" fill="#475569">生产部署与运维——从原型到上线</text>

      <path d="M550 432 L550 436" stroke="#64748b" strokeWidth="2" markerEnd="url(#bla-lm-arrow)" />

      <rect x="320" y="438" width="460" height="34" rx="8" fill="url(#bla-lm-prod)" opacity="0.12" stroke="#dc2626" strokeWidth="1.5" />
      <text x="338" y="460" fontSize="12" fontWeight="600" fill="#991b1b">ch9</text>
      <text x="372" y="460" fontSize="11" fill="#475569">全书复习与知识整合——闭环</text>

      {/* 底部学习路径 */}
      <rect x="40" y="500" width="740" height="32" rx="8" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="410" y="520" textAnchor="middle" fontSize="11" fill="#475569">LLM生态 → 提示工程 → RAG → 编排框架 → 微调 → Agent → 多模态 → 生产部署 → 知识整合</text>

      {/* 底部核心脉络 */}
      <rect x="40" y="542" width="740" height="28" rx="8" fill="url(#bla-lm-core)" opacity="0.08" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="410" y="560" textAnchor="middle" fontSize="11" fontWeight="600" fill="#5b21b6">核心脉络：理解模型 → 掌握提示 → 检索增强 → 编排开发 → 微调定制 → Agent自主 → 多模态 → 生产落地</text>
    </svg>
  );
}
