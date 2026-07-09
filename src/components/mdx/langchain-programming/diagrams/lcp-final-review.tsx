"use client";

export function LcpFinalReviewDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="全书复习与知识整合 LangChain编程能力闭环">
      <defs>
        <linearGradient id="lcp-fr-blue" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="lcp-fr-purple" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="lcp-fr-amber" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="lcp-fr-green" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <linearGradient id="lcp-fr-red" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#dc2626" />
          <stop offset="100%" stopColor="#b91c1c" />
        </linearGradient>
        <marker id="lcp-fr-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">全书复习：LangChain 编程知识整合</text>

      {/* 知识演进路径 */}
      <text x="400" y="62" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">知识演进路径</text>

      <rect x="20" y="74" width="120" height="56" rx="8" fill="url(#lcp-fr-blue)" opacity="0.9" />
      <text x="80" y="96" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">ch0-1 基础</text>
      <text x="80" y="116" textAnchor="middle" fontSize="9" fill="#bfdbfe">地图+框架概览</text>

      <path d="M140 102 L160 102" stroke="#64748b" strokeWidth="2" markerEnd="url(#lcp-fr-arrow)" />

      <rect x="165" y="74" width="130" height="56" rx="8" fill="url(#lcp-fr-purple)" opacity="0.9" />
      <text x="230" y="96" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">ch2-4 组件</text>
      <text x="230" y="116" textAnchor="middle" fontSize="9" fill="#ede9fe">模型+链+记忆</text>

      <path d="M295 102 L315 102" stroke="#64748b" strokeWidth="2" markerEnd="url(#lcp-fr-arrow)" />

      <rect x="320" y="74" width="130" height="56" rx="8" fill="url(#lcp-fr-amber)" opacity="0.9" />
      <text x="385" y="96" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">ch5-7 高级</text>
      <text x="385" y="116" textAnchor="middle" fontSize="9" fill="#fef3c7">Agent+RAG+路由</text>

      <path d="M450 102 L470 102" stroke="#64748b" strokeWidth="2" markerEnd="url(#lcp-fr-arrow)" />

      <rect x="475" y="74" width="130" height="56" rx="8" fill="url(#lcp-fr-green)" opacity="0.9" />
      <text x="540" y="96" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">ch8 生产</text>
      <text x="540" y="116" textAnchor="middle" fontSize="9" fill="#d1fae5">部署优化</text>

      <path d="M605 102 L625 102" stroke="#64748b" strokeWidth="2" markerEnd="url(#lcp-fr-arrow)" />

      <rect x="630" y="74" width="150" height="56" rx="8" fill="url(#lcp-fr-red)" opacity="0.9" />
      <text x="705" y="96" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">ch9 整合</text>
      <text x="705" y="116" textAnchor="middle" fontSize="9" fill="#fecaca">知识闭环</text>

      {/* 四层技术栈 */}
      <text x="400" y="162" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">四层技术栈统一视角</text>

      <rect x="30" y="176" width="180" height="140" rx="8" fill="url(#lcp-fr-blue)" opacity="0.1" stroke="#2563eb" strokeWidth="1.5" />
      <text x="120" y="198" textAnchor="middle" fontSize="13" fontWeight="700" fill="#1e40af">基础层：框架</text>
      <text x="120" y="220" textAnchor="middle" fontSize="11" fill="#475569">框架架构与模块</text>
      <text x="120" y="238" textAnchor="middle" fontSize="11" fill="#475569">Runnable 接口</text>
      <text x="120" y="256" textAnchor="middle" fontSize="11" fill="#475569">LCEL 表达式语言</text>
      <text x="120" y="274" textAnchor="middle" fontSize="11" fill="#475569">标准化抽象</text>
      <text x="120" y="296" textAnchor="middle" fontSize="10" fontWeight="600" fill="#2563eb">理解框架设计</text>

      <rect x="220" y="176" width="180" height="140" rx="8" fill="url(#lcp-fr-purple)" opacity="0.1" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="310" y="198" textAnchor="middle" fontSize="13" fontWeight="700" fill="#5b21b6">组件层：I/O</text>
      <text x="310" y="220" textAnchor="middle" fontSize="11" fill="#475569">Prompt 模板</text>
      <text x="310" y="238" textAnchor="middle" fontSize="11" fill="#475569">LLM/ChatModel</text>
      <text x="310" y="256" textAnchor="middle" fontSize="11" fill="#475569">Output Parser</text>
      <text x="310" y="274" textAnchor="middle" fontSize="11" fill="#475569">Memory 记忆</text>
      <text x="310" y="296" textAnchor="middle" fontSize="10" fontWeight="600" fill="#7c3aed">掌握核心组件</text>

      <rect x="410" y="176" width="180" height="140" rx="8" fill="url(#lcp-fr-amber)" opacity="0.1" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="500" y="198" textAnchor="middle" fontSize="13" fontWeight="700" fill="#92400e">应用层：智能</text>
      <text x="500" y="220" textAnchor="middle" fontSize="11" fill="#475569">Agent 智能体</text>
      <text x="500" y="238" textAnchor="middle" fontSize="11" fill="#475569">Tool 工具调用</text>
      <text x="500" y="256" textAnchor="middle" fontSize="11" fill="#475569">RAG 检索增强</text>
      <text x="500" y="274" textAnchor="middle" fontSize="11" fill="#475569">Router 动态路由</text>
      <text x="500" y="296" textAnchor="middle" fontSize="10" fontWeight="600" fill="#f59e0b">构建智能应用</text>

      <rect x="600" y="176" width="180" height="140" rx="8" fill="url(#lcp-fr-green)" opacity="0.1" stroke="#059669" strokeWidth="1.5" />
      <text x="690" y="198" textAnchor="middle" fontSize="13" fontWeight="700" fill="#065f46">工程层：生产</text>
      <text x="690" y="220" textAnchor="middle" fontSize="11" fill="#475569">Streaming 流式</text>
      <text x="690" y="238" textAnchor="middle" fontSize="11" fill="#475569">Cache 缓存</text>
      <text x="690" y="256" textAnchor="middle" fontSize="11" fill="#475569">Tracing 追踪</text>
      <text x="690" y="274" textAnchor="middle" fontSize="11" fill="#475569">Fallbacks 容错</text>
      <text x="690" y="296" textAnchor="middle" fontSize="10" fontWeight="600" fill="#059669">稳定上线运营</text>

      {/* 核心决策链 */}
      <text x="400" y="342" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">核心技术决策链</text>

      <rect x="30" y="356" width="145" height="56" rx="8" fill="#eff6ff" stroke="#2563eb" strokeWidth="1.5" />
      <text x="102" y="376" textAnchor="middle" fontSize="10" fontWeight="600" fill="#1e40af">LLMChain</text>
      <text x="102" y="396" textAnchor="middle" fontSize="9" fill="#475569">单步推理</text>

      <path d="M175 384 L195 384" stroke="#64748b" strokeWidth="2" markerEnd="url(#lcp-fr-arrow)" />

      <rect x="200" y="356" width="145" height="56" rx="8" fill="#f5f3ff" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="272" y="376" textAnchor="middle" fontSize="10" fontWeight="600" fill="#5b21b6">Memory</text>
      <text x="272" y="396" textAnchor="middle" fontSize="9" fill="#475569">多轮对话</text>

      <path d="M345 384 L365 384" stroke="#64748b" strokeWidth="2" markerEnd="url(#lcp-fr-arrow)" />

      <rect x="370" y="356" width="145" height="56" rx="8" fill="#fffbeb" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="442" y="376" textAnchor="middle" fontSize="10" fontWeight="600" fill="#92400e">RAG</text>
      <text x="442" y="396" textAnchor="middle" fontSize="9" fill="#475569">知识增强</text>

      <path d="M515 384 L535 384" stroke="#64748b" strokeWidth="2" markerEnd="url(#lcp-fr-arrow)" />

      <rect x="540" y="356" width="145" height="56" rx="8" fill="#f0fdf4" stroke="#059669" strokeWidth="1.5" />
      <text x="612" y="376" textAnchor="middle" fontSize="10" fontWeight="600" fill="#065f46">Agent</text>
      <text x="612" y="396" textAnchor="middle" fontSize="9" fill="#475569">自主执行</text>

      <path d="M685 384 L705 384" stroke="#64748b" strokeWidth="2" markerEnd="url(#lcp-fr-arrow)" />

      <rect x="710" y="356" width="60" height="56" rx="8" fill="#fef2f2" stroke="#dc2626" strokeWidth="1.5" />
      <text x="740" y="376" textAnchor="middle" fontSize="10" fontWeight="600" fill="#b91c1c">生产化</text>
      <text x="740" y="396" textAnchor="middle" fontSize="9" fill="#475569">上线运营</text>

      {/* 能力跃迁 */}
      <text x="400" y="442" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">能力跃迁与边界</text>

      <rect x="30" y="456" width="350" height="56" rx="8" fill="url(#lcp-fr-green)" opacity="0.08" stroke="#059669" strokeWidth="1.5" />
      <text x="205" y="476" textAnchor="middle" fontSize="10" fontWeight="600" fill="#065f46">能力跃迁路径</text>
      <text x="205" y="496" textAnchor="middle" fontSize="10" fill="#475569">单步调用 → 多轮对话 → 知识检索 → 自主行动 → 生产部署</text>

      <rect x="420" y="456" width="350" height="56" rx="8" fill="url(#lcp-fr-red)" opacity="0.08" stroke="#dc2626" strokeWidth="1.5" />
      <text x="595" y="476" textAnchor="middle" fontSize="10" fontWeight="600" fill="#b91c1c">核心挑战</text>
      <text x="595" y="496" textAnchor="middle" fontSize="10" fill="#475569">Token 成本 / 延迟 / 幻觉 / 复杂度 / 可靠性</text>

      {/* 底部总结 */}
      <rect x="30" y="528" width="740" height="32" rx="8" fill="url(#lcp-fr-purple)" opacity="0.08" stroke="#7c3aed" strokeWidth="2" />
      <text x="400" y="548" textAnchor="middle" fontSize="11" fill="#475569">核心脉络：框架理解 → 组件掌握 → 智能应用 → 生产部署 → 知识闭环</text>
    </svg>
  );
}
