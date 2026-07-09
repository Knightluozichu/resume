"use client";

export function LaeLearningMapDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="大模型应用开发极简入门知识全景图与十章学习路径">
      <defs>
        <linearGradient id="lae-lm-fund" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="lae-lm-core" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="lae-lm-arch" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="lae-lm-app" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <marker id="lae-lm-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">大模型应用开发 · 知识全景图</text>

      {/* 左侧：四大学习阶段 */}
      <text x="160" y="68" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">学习主线</text>

      <rect x="40" y="80" width="240" height="54" rx="10" fill="url(#lae-lm-fund)" opacity="0.95" />
      <text x="160" y="103" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">基础概念</text>
      <text x="160" y="122" textAnchor="middle" fontSize="11" fill="#bfdbfe">LLM基础 / 学习地图</text>

      <path d="M160 134 L160 140" stroke="#64748b" strokeWidth="2" markerEnd="url(#lae-lm-arrow)" />

      <rect x="40" y="142" width="240" height="54" rx="10" fill="url(#lae-lm-core)" opacity="0.95" />
      <text x="160" y="165" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">核心技能</text>
      <text x="160" y="184" textAnchor="middle" fontSize="11" fill="#ede9fe">提示工程 / API开发</text>

      <path d="M160 196 L160 202" stroke="#64748b" strokeWidth="2" markerEnd="url(#lae-lm-arrow)" />

      <rect x="40" y="204" width="240" height="54" rx="10" fill="url(#lae-lm-arch)" opacity="0.95" />
      <text x="160" y="227" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">应用实践</text>
      <text x="160" y="246" textAnchor="middle" fontSize="11" fill="#fef3c7">RAG / 微调 / Agent</text>

      <path d="M160 258 L160 264" stroke="#64748b" strokeWidth="2" markerEnd="url(#lae-lm-arrow)" />

      <rect x="40" y="266" width="240" height="54" rx="10" fill="url(#lae-lm-app)" opacity="0.95" />
      <text x="160" y="289" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">进阶与总结</text>
      <text x="160" y="308" textAnchor="middle" fontSize="11" fill="#d1fae5">评估部署 / 生产实践 / 复习</text>

      <text x="160" y="344" textAnchor="middle" fontSize="11" fontWeight="600" fill="#7c3aed">从原理到生产的大模型应用全链路</text>

      {/* 右侧：10章学习路径 */}
      <text x="540" y="68" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">十章学习路径</text>

      <rect x="320" y="80" width="460" height="36" rx="8" fill="url(#lae-lm-fund)" opacity="0.12" stroke="#2563eb" strokeWidth="1.5" />
      <text x="338" y="103" fontSize="12" fontWeight="600" fill="#1e40af">ch0</text>
      <text x="372" y="103" fontSize="11" fill="#475569">知识全景图——学习路径总览</text>

      <path d="M550 116 L550 122" stroke="#64748b" strokeWidth="2" markerEnd="url(#lae-lm-arrow)" />

      <rect x="320" y="124" width="460" height="36" rx="8" fill="url(#lae-lm-fund)" opacity="0.12" stroke="#2563eb" strokeWidth="1.5" />
      <text x="338" y="147" fontSize="12" fontWeight="600" fill="#1e40af">ch1</text>
      <text x="372" y="147" fontSize="11" fill="#475569">大语言模型基础——架构与原理</text>

      <path d="M550 160 L550 166" stroke="#64748b" strokeWidth="2" markerEnd="url(#lae-lm-arrow)" />

      <rect x="320" y="168" width="460" height="36" rx="8" fill="url(#lae-lm-core)" opacity="0.12" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="338" y="191" fontSize="12" fontWeight="600" fill="#5b21b6">ch2</text>
      <text x="372" y="191" fontSize="11" fill="#475569">提示工程实战——结构化提示设计</text>

      <path d="M550 204 L550 210" stroke="#64748b" strokeWidth="2" markerEnd="url(#lae-lm-arrow)" />

      <rect x="320" y="212" width="460" height="36" rx="8" fill="url(#lae-lm-core)" opacity="0.12" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="338" y="235" fontSize="12" fontWeight="600" fill="#5b21b6">ch3</text>
      <text x="372" y="235" fontSize="11" fill="#475569">API调用与开发——请求/流式/参数</text>

      <path d="M550 248 L550 254" stroke="#64748b" strokeWidth="2" markerEnd="url(#lae-lm-arrow)" />

      <rect x="320" y="256" width="460" height="36" rx="8" fill="url(#lae-lm-arch)" opacity="0.12" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="338" y="279" fontSize="12" fontWeight="600" fill="#92400e">ch4</text>
      <text x="372" y="279" fontSize="11" fill="#475569">RAG检索增强生成——知识库问答</text>

      <path d="M550 292 L550 298" stroke="#64748b" strokeWidth="2" markerEnd="url(#lae-lm-arrow)" />

      <rect x="320" y="300" width="460" height="36" rx="8" fill="url(#lae-lm-arch)" opacity="0.12" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="338" y="323" fontSize="12" fontWeight="600" fill="#92400e">ch5</text>
      <text x="372" y="323" fontSize="11" fill="#475569">微调与领域适配——LoRA/全参数</text>

      <path d="M550 336 L550 342" stroke="#64748b" strokeWidth="2" markerEnd="url(#lae-lm-arrow)" />

      <rect x="320" y="344" width="460" height="36" rx="8" fill="url(#lae-lm-arch)" opacity="0.12" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="338" y="367" fontSize="12" fontWeight="600" fill="#92400e">ch6</text>
      <text x="372" y="367" fontSize="11" fill="#475569">Agent开发实践——规划/工具/记忆</text>

      <path d="M550 380 L550 386" stroke="#64748b" strokeWidth="2" markerEnd="url(#lae-lm-arrow)" />

      <rect x="320" y="388" width="460" height="36" rx="8" fill="url(#lae-lm-app)" opacity="0.12" stroke="#059669" strokeWidth="1.5" />
      <text x="338" y="411" fontSize="12" fontWeight="600" fill="#065f46">ch7</text>
      <text x="372" y="411" fontSize="11" fill="#475569">评估与部署——指标/服务/监控</text>

      <path d="M550 424 L550 430" stroke="#64748b" strokeWidth="2" markerEnd="url(#lae-lm-arrow)" />

      <rect x="320" y="432" width="460" height="36" rx="8" fill="url(#lae-lm-app)" opacity="0.12" stroke="#059669" strokeWidth="1.5" />
      <text x="338" y="455" fontSize="12" fontWeight="600" fill="#065f46">ch8</text>
      <text x="372" y="455" fontSize="11" fill="#475569">生产环境最佳实践——可靠/安全/成本</text>

      <path d="M550 468 L550 474" stroke="#64748b" strokeWidth="2" markerEnd="url(#lae-lm-arrow)" />

      <rect x="320" y="476" width="460" height="36" rx="8" fill="url(#lae-lm-app)" opacity="0.12" stroke="#059669" strokeWidth="1.5" />
      <text x="338" y="499" fontSize="12" fontWeight="600" fill="#065f46">ch9</text>
      <text x="372" y="499" fontSize="11" fill="#475569">全书复习与知识整合——闭环</text>

      {/* 底部学习路径 */}
      <rect x="40" y="528" width="740" height="32" rx="8" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="410" y="548" textAnchor="middle" fontSize="11" fill="#475569">LLM基础 → 提示工程 → API → RAG → 微调 → Agent → 评估部署 → 生产实践 → 知识整合</text>
    </svg>
  );
}
