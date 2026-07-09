"use client";

export function CppLearningMapDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="ChatGPT原理与实战知识全景图与十章学习路径">
      <defs>
        <linearGradient id="cpp-lm-fund" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="cpp-lm-eng" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="cpp-lm-app" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="cpp-lm-fut" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <marker id="cpp-lm-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">ChatGPT 原理与实战 · 知识全景图</text>

      {/* 左侧：四大学习阶段 */}
      <text x="160" y="68" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">学习主线</text>

      <rect x="40" y="80" width="240" height="54" rx="10" fill="url(#cpp-lm-fund)" opacity="0.95" />
      <text x="160" y="103" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">原理奠基</text>
      <text x="160" y="122" textAnchor="middle" fontSize="11" fill="#bfdbfe">学习地图 / GPT架构 / 预训练 / 对齐</text>

      <path d="M160 134 L160 140" stroke="#64748b" strokeWidth="2" markerEnd="url(#cpp-lm-arrow)" />

      <rect x="40" y="142" width="240" height="54" rx="10" fill="url(#cpp-lm-eng)" opacity="0.95" />
      <text x="160" y="165" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">工程实践</text>
      <text x="160" y="184" textAnchor="middle" fontSize="11" fill="#ede9fe">推理服务 / 提示技巧</text>

      <path d="M160 196 L160 202" stroke="#64748b" strokeWidth="2" markerEnd="url(#cpp-lm-arrow)" />

      <rect x="40" y="204" width="240" height="54" rx="10" fill="url(#cpp-lm-app)" opacity="0.95" />
      <text x="160" y="227" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">应用落地</text>
      <text x="160" y="246" textAnchor="middle" fontSize="11" fill="#fef3c7">插件工具 / 微调实战</text>

      <path d="M160 258 L160 264" stroke="#64748b" strokeWidth="2" markerEnd="url(#cpp-lm-arrow)" />

      <rect x="40" y="266" width="240" height="54" rx="10" fill="url(#cpp-lm-fut)" opacity="0.95" />
      <text x="160" y="289" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">未来展望</text>
      <text x="160" y="308" textAnchor="middle" fontSize="11" fill="#d1fae5">生态未来 / 全书复习</text>

      <text x="160" y="344" textAnchor="middle" fontSize="11" fontWeight="600" fill="#7c3aed">从模型原理到工程落地的 ChatGPT 全链路</text>

      {/* 右侧：10章学习路径 */}
      <text x="540" y="68" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">十章学习路径</text>

      <rect x="320" y="80" width="460" height="36" rx="8" fill="url(#cpp-lm-fund)" opacity="0.12" stroke="#2563eb" strokeWidth="1.5" />
      <text x="338" y="103" fontSize="12" fontWeight="600" fill="#1e40af">ch0</text>
      <text x="372" y="103" fontSize="11" fill="#475569">知识全景图——学习路径总览</text>

      <path d="M550 116 L550 122" stroke="#64748b" strokeWidth="2" markerEnd="url(#cpp-lm-arrow)" />

      <rect x="320" y="124" width="460" height="36" rx="8" fill="url(#cpp-lm-fund)" opacity="0.12" stroke="#2563eb" strokeWidth="1.5" />
      <text x="338" y="147" fontSize="12" fontWeight="600" fill="#1e40af">ch1</text>
      <text x="372" y="147" fontSize="11" fill="#475569">GPT模型架构——Transformer解码器</text>

      <path d="M550 160 L550 166" stroke="#64748b" strokeWidth="2" markerEnd="url(#cpp-lm-arrow)" />

      <rect x="320" y="168" width="460" height="36" rx="8" fill="url(#cpp-lm-fund)" opacity="0.12" stroke="#2563eb" strokeWidth="1.5" />
      <text x="338" y="191" fontSize="12" fontWeight="600" fill="#1e40af">ch2</text>
      <text x="372" y="191" fontSize="11" fill="#475569">预训练与规模化——自回归与缩放律</text>

      <path d="M550 204 L550 210" stroke="#64748b" strokeWidth="2" markerEnd="url(#cpp-lm-arrow)" />

      <rect x="320" y="212" width="460" height="36" rx="8" fill="url(#cpp-lm-fund)" opacity="0.12" stroke="#2563eb" strokeWidth="1.5" />
      <text x="338" y="235" fontSize="12" fontWeight="600" fill="#1e40af">ch3</text>
      <text x="372" y="235" fontSize="11" fill="#475569">对齐与RLHF——SFT与人类反馈</text>

      <path d="M550 248 L550 254" stroke="#64748b" strokeWidth="2" markerEnd="url(#cpp-lm-arrow)" />

      <rect x="320" y="256" width="460" height="36" rx="8" fill="url(#cpp-lm-eng)" opacity="0.12" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="338" y="279" fontSize="12" fontWeight="600" fill="#5b21b6">ch4</text>
      <text x="372" y="279" fontSize="11" fill="#475569">推理与服务化——KV缓存与量化</text>

      <path d="M550 292 L550 298" stroke="#64748b" strokeWidth="2" markerEnd="url(#cpp-lm-arrow)" />

      <rect x="320" y="300" width="460" height="36" rx="8" fill="url(#cpp-lm-eng)" opacity="0.12" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="338" y="323" fontSize="12" fontWeight="600" fill="#5b21b6">ch5</text>
      <text x="372" y="323" fontSize="11" fill="#475569">高级提示技巧——CoT与ReAct</text>

      <path d="M550 336 L550 342" stroke="#64748b" strokeWidth="2" markerEnd="url(#cpp-lm-arrow)" />

      <rect x="320" y="344" width="460" height="36" rx="8" fill="url(#cpp-lm-app)" opacity="0.12" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="338" y="367" fontSize="12" fontWeight="600" fill="#92400e">ch6</text>
      <text x="372" y="367" fontSize="11" fill="#475569">插件与工具调用——Function Calling</text>

      <path d="M550 380 L550 386" stroke="#64748b" strokeWidth="2" markerEnd="url(#cpp-lm-arrow)" />

      <rect x="320" y="388" width="460" height="36" rx="8" fill="url(#cpp-lm-app)" opacity="0.12" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="338" y="411" fontSize="12" fontWeight="600" fill="#92400e">ch7</text>
      <text x="372" y="411" fontSize="11" fill="#475569">微调实战——LoRA与QLoRA</text>

      <path d="M550 424 L550 430" stroke="#64748b" strokeWidth="2" markerEnd="url(#cpp-lm-arrow)" />

      <rect x="320" y="432" width="460" height="36" rx="8" fill="url(#cpp-lm-fut)" opacity="0.12" stroke="#059669" strokeWidth="1.5" />
      <text x="338" y="455" fontSize="12" fontWeight="600" fill="#065f46">ch8</text>
      <text x="372" y="455" fontSize="11" fill="#475569">生态与未来展望——多模态与Agent</text>

      <path d="M550 468 L550 474" stroke="#64748b" strokeWidth="2" markerEnd="url(#cpp-lm-arrow)" />

      <rect x="320" y="476" width="460" height="36" rx="8" fill="url(#cpp-lm-fut)" opacity="0.12" stroke="#059669" strokeWidth="1.5" />
      <text x="338" y="499" fontSize="12" fontWeight="600" fill="#065f46">ch9</text>
      <text x="372" y="499" fontSize="11" fill="#475569">全书复习与知识整合——闭环</text>

      {/* 底部学习路径 */}
      <rect x="40" y="528" width="740" height="32" rx="8" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="410" y="548" textAnchor="middle" fontSize="11" fill="#475569">GPT架构 → 预训练 → 对齐RLHF → 推理服务 → 提示技巧 → 插件工具 → 微调实战 → 生态未来 → 知识整合</text>
    </svg>
  );
}
