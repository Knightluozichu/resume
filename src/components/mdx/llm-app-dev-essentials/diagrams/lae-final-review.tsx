"use client";

export function LaeFinalReviewDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="全书复习与知识整合大模型应用开发能力闭环">
      <defs>
        <linearGradient id="lae-fr-blue" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="lae-fr-purple" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="lae-fr-amber" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="lae-fr-green" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <linearGradient id="lae-fr-red" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#dc2626" />
          <stop offset="100%" stopColor="#b91c1c" />
        </linearGradient>
        <marker id="lae-fr-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">全书复习：大模型应用开发知识整合</text>

      {/* 知识演进路径 */}
      <text x="400" y="62" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">知识演进路径</text>

      <rect x="20" y="74" width="120" height="56" rx="8" fill="url(#lae-fr-blue)" opacity="0.9" />
      <text x="80" y="96" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">ch0-1 基础</text>
      <text x="80" y="116" textAnchor="middle" fontSize="9" fill="#bfdbfe">地图+LLM原理</text>

      <path d="M140 102 L160 102" stroke="#64748b" strokeWidth="2" markerEnd="url(#lae-fr-arrow)" />

      <rect x="165" y="74" width="120" height="56" rx="8" fill="url(#lae-fr-purple)" opacity="0.9" />
      <text x="225" y="96" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">ch2-3 技能</text>
      <text x="225" y="116" textAnchor="middle" fontSize="9" fill="#ede9fe">提示+API</text>

      <path d="M285 102 L305 102" stroke="#64748b" strokeWidth="2" markerEnd="url(#lae-fr-arrow)" />

      <rect x="310" y="74" width="120" height="56" rx="8" fill="url(#lae-fr-amber)" opacity="0.9" />
      <text x="370" y="96" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">ch4-6 应用</text>
      <text x="370" y="116" textAnchor="middle" fontSize="9" fill="#fef3c7">RAG+微调+Agent</text>

      <path d="M430 102 L450 102" stroke="#64748b" strokeWidth="2" markerEnd="url(#lae-fr-arrow)" />

      <rect x="455" y="74" width="120" height="56" rx="8" fill="url(#lae-fr-green)" opacity="0.9" />
      <text x="515" y="96" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">ch7-8 工程</text>
      <text x="515" y="116" textAnchor="middle" fontSize="9" fill="#d1fae5">评估+生产</text>

      <path d="M575 102 L595 102" stroke="#64748b" strokeWidth="2" markerEnd="url(#lae-fr-arrow)" />

      <rect x="600" y="74" width="180" height="56" rx="8" fill="url(#lae-fr-red)" opacity="0.9" />
      <text x="690" y="96" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">ch9 整合</text>
      <text x="690" y="116" textAnchor="middle" fontSize="9" fill="#fecaca">知识闭环</text>

      {/* 四层应用栈 */}
      <text x="400" y="162" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">四层应用栈统一视角</text>

      <rect x="30" y="176" width="180" height="140" rx="8" fill="url(#lae-fr-blue)" opacity="0.1" stroke="#2563eb" strokeWidth="1.5" />
      <text x="120" y="198" textAnchor="middle" fontSize="13" fontWeight="700" fill="#1e40af">基础层：LLM原理</text>
      <text x="120" y="220" textAnchor="middle" fontSize="11" fill="#475569">Token化 / 嵌入</text>
      <text x="120" y="238" textAnchor="middle" fontSize="11" fill="#475569">Transformer架构</text>
      <text x="120" y="256" textAnchor="middle" fontSize="11" fill="#475569">三阶段训练</text>
      <text x="120" y="274" textAnchor="middle" fontSize="11" fill="#475569">自回归生成</text>
      <text x="120" y="296" textAnchor="middle" fontSize="10" fontWeight="600" fill="#2563eb">理解模型能力边界</text>

      <rect x="220" y="176" width="180" height="140" rx="8" fill="url(#lae-fr-purple)" opacity="0.1" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="310" y="198" textAnchor="middle" fontSize="13" fontWeight="700" fill="#5b21b6">交互层：调用与引导</text>
      <text x="310" y="220" textAnchor="middle" fontSize="11" fill="#475569">提示工程设计</text>
      <text x="310" y="238" textAnchor="middle" fontSize="11" fill="#475569">API调用开发</text>
      <text x="310" y="256" textAnchor="middle" fontSize="11" fill="#475569">参数调优</text>
      <text x="310" y="274" textAnchor="middle" fontSize="11" fill="#475569">流式响应处理</text>
      <text x="310" y="296" textAnchor="middle" fontSize="10" fontWeight="600" fill="#7c3aed">高效使用模型</text>

      <rect x="410" y="176" width="180" height="140" rx="8" fill="url(#lae-fr-amber)" opacity="0.1" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="500" y="198" textAnchor="middle" fontSize="13" fontWeight="700" fill="#92400e">增强层：知识与适配</text>
      <text x="500" y="220" textAnchor="middle" fontSize="11" fill="#475569">RAG知识检索</text>
      <text x="500" y="238" textAnchor="middle" fontSize="11" fill="#475569">微调领域适配</text>
      <text x="500" y="256" textAnchor="middle" fontSize="11" fill="#475569">LoRA高效微调</text>
      <text x="500" y="274" textAnchor="middle" fontSize="11" fill="#475569">Agent自主执行</text>
      <text x="500" y="296" textAnchor="middle" fontSize="10" fontWeight="600" fill="#f59e0b">扩展模型能力</text>

      <rect x="600" y="176" width="180" height="140" rx="8" fill="url(#lae-fr-green)" opacity="0.1" stroke="#059669" strokeWidth="1.5" />
      <text x="690" y="198" textAnchor="middle" fontSize="13" fontWeight="700" fill="#065f46">工程层：生产化</text>
      <text x="690" y="220" textAnchor="middle" fontSize="11" fill="#475569">评估体系</text>
      <text x="690" y="238" textAnchor="middle" fontSize="11" fill="#475569">部署服务化</text>
      <text x="690" y="256" textAnchor="middle" fontSize="11" fill="#475569">可靠/安全/成本</text>
      <text x="690" y="274" textAnchor="middle" fontSize="11" fill="#475569">可观测性</text>
      <text x="690" y="296" textAnchor="middle" fontSize="10" fontWeight="600" fill="#059669">稳定上线运营</text>

      {/* 核心决策链 */}
      <text x="400" y="342" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">核心技术决策链</text>

      <rect x="30" y="356" width="145" height="56" rx="8" fill="#eff6ff" stroke="#2563eb" strokeWidth="1.5" />
      <text x="102" y="376" textAnchor="middle" fontSize="10" fontWeight="600" fill="#1e40af">提示工程</text>
      <text x="102" y="396" textAnchor="middle" fontSize="9" fill="#475569">零成本起步</text>

      <path d="M175 384 L195 384" stroke="#64748b" strokeWidth="2" markerEnd="url(#lae-fr-arrow)" />

      <rect x="200" y="356" width="145" height="56" rx="8" fill="#f5f3ff" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="272" y="376" textAnchor="middle" fontSize="10" fontWeight="600" fill="#5b21b6">RAG</text>
      <text x="272" y="396" textAnchor="middle" fontSize="9" fill="#475569">接入外部知识</text>

      <path d="M345 384 L365 384" stroke="#64748b" strokeWidth="2" markerEnd="url(#lae-fr-arrow)" />

      <rect x="370" y="356" width="145" height="56" rx="8" fill="#fffbeb" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="442" y="376" textAnchor="middle" fontSize="10" fontWeight="600" fill="#92400e">微调(LoRA)</text>
      <text x="442" y="396" textAnchor="middle" fontSize="9" fill="#475569">改变行为风格</text>

      <path d="M515 384 L535 384" stroke="#64748b" strokeWidth="2" markerEnd="url(#lae-fr-arrow)" />

      <rect x="540" y="356" width="145" height="56" rx="8" fill="#f0fdf4" stroke="#059669" strokeWidth="1.5" />
      <text x="612" y="376" textAnchor="middle" fontSize="10" fontWeight="600" fill="#065f46">Agent</text>
      <text x="612" y="396" textAnchor="middle" fontSize="9" fill="#475569">自主任务执行</text>

      <path d="M685 384 L705 384" stroke="#64748b" strokeWidth="2" markerEnd="url(#lae-fr-arrow)" />

      <rect x="710" y="356" width="60" height="56" rx="8" fill="#fef2f2" stroke="#dc2626" strokeWidth="1.5" />
      <text x="740" y="376" textAnchor="middle" fontSize="10" fontWeight="600" fill="#b91c1c">预训练</text>
      <text x="740" y="396" textAnchor="middle" fontSize="9" fill="#475569">从零开始</text>

      {/* 能力跃迁 */}
      <text x="400" y="442" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">能力跃迁与边界</text>

      <rect x="30" y="456" width="350" height="56" rx="8" fill="url(#lae-fr-green)" opacity="0.08" stroke="#059669" strokeWidth="1.5" />
      <text x="205" y="476" textAnchor="middle" fontSize="10" fontWeight="600" fill="#065f46">能力跃迁路径</text>
      <text x="205" y="496" textAnchor="middle" fontSize="10" fill="#475569">问答 → 检索 → 适配 → 自主行动 → 持续学习</text>

      <rect x="420" y="456" width="350" height="56" rx="8" fill="url(#lae-fr-red)" opacity="0.08" stroke="#dc2626" strokeWidth="1.5" />
      <text x="595" y="476" textAnchor="middle" fontSize="10" fontWeight="600" fill="#b91c1c">核心局限</text>
      <text x="595" y="496" textAnchor="middle" fontSize="10" fill="#475569">幻觉 / 知识截止 / 推理深度有限 / 成本约束</text>

      {/* 底部总结 */}
      <rect x="30" y="528" width="740" height="32" rx="8" fill="url(#lae-fr-purple)" opacity="0.08" stroke="#7c3aed" strokeWidth="2" />
      <text x="400" y="548" textAnchor="middle" fontSize="11" fill="#475569">核心脉络：理解原理 → 高效调用 → 知识增强 → 领域适配 → 自主行动 → 评估上线 → 生产运营 → 知识闭环</text>
    </svg>
  );
}
