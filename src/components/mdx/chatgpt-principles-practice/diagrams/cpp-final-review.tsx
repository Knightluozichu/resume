"use client";

export function CppFinalReviewDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="全书复习 ChatGPT原理与实战知识整合与能力闭环">
      <defs>
        <linearGradient id="cpp-fr-blue" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="cpp-fr-purple" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="cpp-fr-amber" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="cpp-fr-green" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <linearGradient id="cpp-fr-red" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#dc2626" />
          <stop offset="100%" stopColor="#b91c1c" />
        </linearGradient>
        <marker id="cpp-fr-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">全书复习：ChatGPT 原理与实战知识整合</text>

      {/* 知识演进路径 */}
      <text x="400" y="62" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">知识演进路径</text>

      <rect x="20" y="74" width="120" height="56" rx="8" fill="url(#cpp-fr-blue)" opacity="0.9" />
      <text x="80" y="96" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">ch0-3 原理</text>
      <text x="80" y="116" textAnchor="middle" fontSize="9" fill="#bfdbfe">架构+预训练+对齐</text>

      <path d="M140 102 L160 102" stroke="#64748b" strokeWidth="2" markerEnd="url(#cpp-fr-arrow)" />

      <rect x="165" y="74" width="130" height="56" rx="8" fill="url(#cpp-fr-purple)" opacity="0.9" />
      <text x="230" y="96" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">ch4-5 工程</text>
      <text x="230" y="116" textAnchor="middle" fontSize="9" fill="#ede9fe">推理+提示</text>

      <path d="M295 102 L315 102" stroke="#64748b" strokeWidth="2" markerEnd="url(#cpp-fr-arrow)" />

      <rect x="320" y="74" width="130" height="56" rx="8" fill="url(#cpp-fr-amber)" opacity="0.9" />
      <text x="385" y="96" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">ch6-7 应用</text>
      <text x="385" y="116" textAnchor="middle" fontSize="9" fill="#fef3c7">工具+微调</text>

      <path d="M450 102 L470 102" stroke="#64748b" strokeWidth="2" markerEnd="url(#cpp-fr-arrow)" />

      <rect x="475" y="74" width="130" height="56" rx="8" fill="url(#cpp-fr-green)" opacity="0.9" />
      <text x="540" y="96" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">ch8 未来</text>
      <text x="540" y="116" textAnchor="middle" fontSize="9" fill="#d1fae5">生态展望</text>

      <path d="M605 102 L625 102" stroke="#64748b" strokeWidth="2" markerEnd="url(#cpp-fr-arrow)" />

      <rect x="630" y="74" width="150" height="56" rx="8" fill="url(#cpp-fr-red)" opacity="0.9" />
      <text x="705" y="96" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">ch9 整合</text>
      <text x="705" y="116" textAnchor="middle" fontSize="9" fill="#fecaca">知识闭环</text>

      {/* 四层统一视角 */}
      <text x="400" y="162" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">四层技术栈统一视角</text>

      <rect x="30" y="176" width="180" height="140" rx="8" fill="url(#cpp-fr-blue)" opacity="0.1" stroke="#2563eb" strokeWidth="1.5" />
      <text x="120" y="198" textAnchor="middle" fontSize="13" fontWeight="700" fill="#1e40af">原理层</text>
      <text x="120" y="220" textAnchor="middle" fontSize="11" fill="#475569">GPT 解码器架构</text>
      <text x="120" y="238" textAnchor="middle" fontSize="11" fill="#475569">自回归预训练</text>
      <text x="120" y="256" textAnchor="middle" fontSize="11" fill="#475569">缩放律与涌现</text>
      <text x="120" y="274" textAnchor="middle" fontSize="11" fill="#475569">RLHF 对齐</text>
      <text x="120" y="296" textAnchor="middle" fontSize="10" fontWeight="600" fill="#2563eb">理解模型本质</text>

      <rect x="220" y="176" width="180" height="140" rx="8" fill="url(#cpp-fr-purple)" opacity="0.1" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="310" y="198" textAnchor="middle" fontSize="13" fontWeight="700" fill="#5b21b6">工程层</text>
      <text x="310" y="220" textAnchor="middle" fontSize="11" fill="#475569">推理优化</text>
      <text x="310" y="238" textAnchor="middle" fontSize="11" fill="#475569">KV 缓存/量化</text>
      <text x="310" y="256" textAnchor="middle" fontSize="11" fill="#475569">提示工程</text>
      <text x="310" y="274" textAnchor="middle" fontSize="11" fill="#475569">服务化部署</text>
      <text x="310" y="296" textAnchor="middle" fontSize="10" fontWeight="600" fill="#7c3aed">掌握落地能力</text>

      <rect x="410" y="176" width="180" height="140" rx="8" fill="url(#cpp-fr-amber)" opacity="0.1" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="500" y="198" textAnchor="middle" fontSize="13" fontWeight="700" fill="#92400e">应用层</text>
      <text x="500" y="220" textAnchor="middle" fontSize="11" fill="#475569">插件工具调用</text>
      <text x="500" y="238" textAnchor="middle" fontSize="11" fill="#475569">Function Calling</text>
      <text x="500" y="256" textAnchor="middle" fontSize="11" fill="#475569">微调实战</text>
      <text x="500" y="274" textAnchor="middle" fontSize="11" fill="#475569">LoRA/QLoRA</text>
      <text x="500" y="296" textAnchor="middle" fontSize="10" fontWeight="600" fill="#f59e0b">构建智能应用</text>

      <rect x="600" y="176" width="180" height="140" rx="8" fill="url(#cpp-fr-green)" opacity="0.1" stroke="#059669" strokeWidth="1.5" />
      <text x="690" y="198" textAnchor="middle" fontSize="13" fontWeight="700" fill="#065f46">未来层</text>
      <text x="690" y="220" textAnchor="middle" fontSize="11" fill="#475569">多模态融合</text>
      <text x="690" y="238" textAnchor="middle" fontSize="11" fill="#475569">Agent 自主化</text>
      <text x="690" y="256" textAnchor="middle" fontSize="11" fill="#475569">开源生态</text>
      <text x="690" y="274" textAnchor="middle" fontSize="11" fill="#475569">安全与 AGI</text>
      <text x="690" y="296" textAnchor="middle" fontSize="10" fontWeight="600" fill="#059669">把握演进方向</text>

      {/* 核心决策链 */}
      <text x="400" y="342" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">核心技术决策链</text>

      <rect x="30" y="356" width="120" height="56" rx="8" fill="#eff6ff" stroke="#2563eb" strokeWidth="1.5" />
      <text x="90" y="376" textAnchor="middle" fontSize="10" fontWeight="600" fill="#1e40af">架构理解</text>
      <text x="90" y="396" textAnchor="middle" fontSize="9" fill="#475569">选基座</text>

      <path d="M150 384 L168 384" stroke="#64748b" strokeWidth="2" markerEnd="url(#cpp-fr-arrow)" />

      <rect x="172" y="356" width="120" height="56" rx="8" fill="#eff6ff" stroke="#2563eb" strokeWidth="1.5" />
      <text x="232" y="376" textAnchor="middle" fontSize="10" fontWeight="600" fill="#1e40af">预训练</text>
      <text x="232" y="396" textAnchor="middle" fontSize="9" fill="#475569">拿能力</text>

      <path d="M292 384 L310 384" stroke="#64748b" strokeWidth="2" markerEnd="url(#cpp-fr-arrow)" />

      <rect x="314" y="356" width="120" height="56" rx="8" fill="#f5f3ff" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="374" y="376" textAnchor="middle" fontSize="10" fontWeight="600" fill="#5b21b6">对齐</text>
      <text x="374" y="396" textAnchor="middle" fontSize="9" fill="#475569">守规矩</text>

      <path d="M434 384 L452 384" stroke="#64748b" strokeWidth="2" markerEnd="url(#cpp-fr-arrow)" />

      <rect x="456" y="356" width="120" height="56" rx="8" fill="#fffbeb" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="516" y="376" textAnchor="middle" fontSize="10" fontWeight="600" fill="#92400e">提示/工具</text>
      <text x="516" y="396" textAnchor="middle" fontSize="9" fill="#475569">调行为</text>

      <path d="M576 384 L594 384" stroke="#64748b" strokeWidth="2" markerEnd="url(#cpp-fr-arrow)" />

      <rect x="598" y="356" width="120" height="56" rx="8" fill="#f0fdf4" stroke="#059669" strokeWidth="1.5" />
      <text x="658" y="376" textAnchor="middle" fontSize="10" fontWeight="600" fill="#065f46">微调/部署</text>
      <text x="658" y="396" textAnchor="middle" fontSize="9" fill="#475569">上生产</text>

      <path d="M718 384 L736 384" stroke="#64748b" strokeWidth="2" markerEnd="url(#cpp-fr-arrow)" />

      <rect x="740" y="356" width="30" height="56" rx="8" fill="#fef2f2" stroke="#dc2626" strokeWidth="1.5" />
      <text x="755" y="384" textAnchor="middle" fontSize="9" fontWeight="600" fill="#b91c1c">闭环</text>

      {/* 能力跃迁 */}
      <text x="400" y="442" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">能力跃迁与边界</text>

      <rect x="30" y="456" width="350" height="56" rx="8" fill="url(#cpp-fr-green)" opacity="0.08" stroke="#059669" strokeWidth="1.5" />
      <text x="205" y="476" textAnchor="middle" fontSize="10" fontWeight="600" fill="#065f46">能力跃迁路径</text>
      <text x="205" y="496" textAnchor="middle" fontSize="10" fill="#475569">理解原理 → 工程优化 → 应用落地 → 生态演进</text>

      <rect x="420" y="456" width="350" height="56" rx="8" fill="url(#cpp-fr-red)" opacity="0.08" stroke="#dc2626" strokeWidth="1.5" />
      <text x="595" y="476" textAnchor="middle" fontSize="10" fontWeight="600" fill="#b91c1c">核心挑战</text>
      <text x="595" y="496" textAnchor="middle" fontSize="10" fill="#475569">成本 / 延迟 / 幻觉 / 安全 / 可控性</text>

      {/* 底部总结 */}
      <rect x="30" y="528" width="740" height="32" rx="8" fill="url(#cpp-fr-purple)" opacity="0.08" stroke="#7c3aed" strokeWidth="2" />
      <text x="400" y="548" textAnchor="middle" fontSize="11" fill="#475569">核心脉络：原理理解 → 工程掌握 → 应用构建 → 未来把握 → 知识闭环</text>
    </svg>
  );
}
