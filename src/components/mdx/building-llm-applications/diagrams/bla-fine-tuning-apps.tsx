"use client";

export function BlaFineTuningAppsDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="微调应用开发：全流程与参数高效方法">
      <defs>
        <linearGradient id="bla-ft-blue" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="bla-ft-purple" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="bla-ft-amber" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="bla-ft-green" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <marker id="bla-ft-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">微调应用开发</text>

      {/* 上半部分：微调全流程 */}
      <text x="400" y="62" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">微调全流程</text>

      <rect x="30" y="76" width="120" height="80" rx="10" fill="url(#bla-ft-blue)" opacity="0.1" stroke="#2563eb" strokeWidth="1.5" />
      <text x="90" y="100" textAnchor="middle" fontSize="11" fontWeight="700" fill="#1e40af">数据收集</text>
      <text x="90" y="118" textAnchor="middle" fontSize="9" fill="#475569">指令对</text>
      <text x="90" y="132" textAnchor="middle" fontSize="9" fill="#475569">偏好数据</text>
      <text x="90" y="146" textAnchor="middle" fontSize="9" fill="#64748b">500-5000条</text>

      <path d="M154 116 L172 116" stroke="#64748b" strokeWidth="2" markerEnd="url(#bla-ft-arrow)" />

      <rect x="176" y="76" width="120" height="80" rx="10" fill="url(#bla-ft-purple)" opacity="0.1" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="236" y="100" textAnchor="middle" fontSize="11" fontWeight="700" fill="#5b21b6">数据清洗</text>
      <text x="236" y="118" textAnchor="middle" fontSize="9" fill="#475569">去重去噪</text>
      <text x="236" y="132" textAnchor="middle" fontSize="9" fill="#475569">格式统一</text>
      <text x="236" y="146" textAnchor="middle" fontSize="9" fill="#64748b">质量过滤</text>

      <path d="M300 116 L318 116" stroke="#64748b" strokeWidth="2" markerEnd="url(#bla-ft-arrow)" />

      <rect x="322" y="76" width="120" height="80" rx="10" fill="url(#bla-ft-amber)" opacity="0.1" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="382" y="100" textAnchor="middle" fontSize="11" fontWeight="700" fill="#92400e">训练配置</text>
      <text x="382" y="118" textAnchor="middle" fontSize="9" fill="#475569">学习率</text>
      <text x="382" y="132" textAnchor="middle" fontSize="9" fill="#475569">Epoch / Batch</text>
      <text x="382" y="146" textAnchor="middle" fontSize="9" fill="#64748b">LoRA / QLoRA</text>

      <path d="M446 116 L464 116" stroke="#64748b" strokeWidth="2" markerEnd="url(#bla-ft-arrow)" />

      <rect x="468" y="76" width="120" height="80" rx="10" fill="url(#bla-ft-green)" opacity="0.1" stroke="#059669" strokeWidth="1.5" />
      <text x="528" y="100" textAnchor="middle" fontSize="11" fontWeight="700" fill="#065f46">训练执行</text>
      <text x="528" y="118" textAnchor="middle" fontSize="9" fill="#475569">梯度更新</text>
      <text x="528" y="132" textAnchor="middle" fontSize="9" fill="#475569">损失监控</text>
      <text x="528" y="146" textAnchor="middle" fontSize="9" fill="#64748b">过拟合检测</text>

      <path d="M592 116 L610 116" stroke="#64748b" strokeWidth="2" markerEnd="url(#bla-ft-arrow)" />

      <rect x="614" y="76" width="150" height="80" rx="10" fill="url(#bla-ft-blue)" opacity="0.15" stroke="#2563eb" strokeWidth="2" />
      <text x="689" y="100" textAnchor="middle" fontSize="11" fontWeight="700" fill="#1e40af">评测部署</text>
      <text x="689" y="118" textAnchor="middle" fontSize="9" fill="#475569">基准测试</text>
      <text x="689" y="132" textAnchor="middle" fontSize="9" fill="#475569">A/B 对比</text>
      <text x="689" y="146" textAnchor="middle" fontSize="9" fill="#64748b">推理上线</text>

      {/* 中间：微调方法对比 */}
      <text x="400" y="190" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">微调方法对比</text>

      <rect x="30" y="204" width="170" height="130" rx="10" fill="url(#bla-ft-blue)" opacity="0.08" stroke="#2563eb" strokeWidth="1.5" />
      <text x="115" y="228" textAnchor="middle" fontSize="12" fontWeight="700" fill="#1e40af">全参数微调</text>
      <text x="115" y="248" textAnchor="middle" fontSize="9" fill="#475569">更新所有参数</text>
      <text x="115" y="266" textAnchor="middle" fontSize="9" fill="#475569">效果最好</text>
      <text x="115" y="284" textAnchor="middle" fontSize="9" fill="#64748b">显存需求极大</text>
      <text x="115" y="302" textAnchor="middle" fontSize="9" fill="#64748b">训练成本高</text>
      <text x="115" y="320" textAnchor="middle" fontSize="9" fill="#64748b">适合企业级</text>

      <rect x="216" y="204" width="170" height="130" rx="10" fill="url(#bla-ft-purple)" opacity="0.08" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="301" y="228" textAnchor="middle" fontSize="12" fontWeight="700" fill="#5b21b6">LoRA</text>
      <text x="301" y="248" textAnchor="middle" fontSize="9" fill="#475569">低秩适配器</text>
      <text x="301" y="266" textAnchor="middle" fontSize="9" fill="#475569">只训练少量参数</text>
      <text x="301" y="284" textAnchor="middle" fontSize="9" fill="#64748b">显存大幅降低</text>
      <text x="301" y="302" textAnchor="middle" fontSize="9" fill="#64748b">效果接近全量</text>
      <text x="301" y="320" textAnchor="middle" fontSize="9" fill="#64748b">最常用方案</text>

      <rect x="402" y="204" width="170" height="130" rx="10" fill="url(#bla-ft-amber)" opacity="0.08" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="487" y="228" textAnchor="middle" fontSize="12" fontWeight="700" fill="#92400e">QLoRA</text>
      <text x="487" y="248" textAnchor="middle" fontSize="9" fill="#475569">量化 + LoRA</text>
      <text x="487" y="266" textAnchor="middle" fontSize="9" fill="#475569">4bit基模 + LoRA</text>
      <text x="487" y="284" textAnchor="middle" fontSize="9" fill="#64748b">显存极致压缩</text>
      <text x="487" y="302" textAnchor="middle" fontSize="9" fill="#64748b">消费级GPU可训</text>
      <text x="487" y="320" textAnchor="middle" fontSize="9" fill="#64748b">性价比最高</text>

      <rect x="588" y="204" width="182" height="130" rx="10" fill="url(#bla-ft-green)" opacity="0.08" stroke="#059669" strokeWidth="1.5" />
      <text x="679" y="228" textAnchor="middle" fontSize="12" fontWeight="700" fill="#065f46">Prefix Tuning</text>
      <text x="679" y="248" textAnchor="middle" fontSize="9" fill="#475569">前缀向量优化</text>
      <text x="679" y="266" textAnchor="middle" fontSize="9" fill="#475569">不改模型参数</text>
      <text x="679" y="284" textAnchor="middle" fontSize="9" fill="#64748b">参数量极小</text>
      <text x="679" y="302" textAnchor="middle" fontSize="9" fill="#64748b">效果略逊LoRA</text>
      <text x="679" y="320" textAnchor="middle" fontSize="9" fill="#64748b">适合多任务</text>

      {/* 下半部分：微调 vs 提示 vs RAG 决策 */}
      <text x="400" y="362" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">何时微调：决策矩阵</text>

      <rect x="30" y="376" width="740" height="68" rx="10" fill="url(#bla-ft-purple)" opacity="0.06" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="50" y="400" fontSize="11" fontWeight="700" fill="#5b21b6">提示工程（首选）</text>
      <text x="50" y="418" fontSize="10" fill="#475569">零成本、零延迟，先穷尽提示优化——改提示能解决就不要微调</text>
      <text x="50" y="434" fontSize="9" fill="#64748b">适用：通用任务、格式调整、角色设定</text>

      <rect x="30" y="454" width="740" height="68" rx="10" fill="url(#bla-ft-blue)" opacity="0.06" stroke="#2563eb" strokeWidth="1.5" />
      <text x="50" y="478" fontSize="11" fontWeight="700" fill="#1e40af">RAG（知识增强）</text>
      <text x="50" y="496" fontSize="10" fill="#475569">知识频繁更新或需引用溯源时，用检索替代微调</text>
      <text x="50" y="512" fontSize="9" fill="#64748b">适用：知识问答、文档检索、实时数据</text>

      <rect x="30" y="532" width="740" height="36" rx="10" fill="url(#bla-ft-amber)" opacity="0.1" stroke="#f59e0b" strokeWidth="2" />
      <text x="50" y="554" fontSize="11" fontWeight="700" fill="#92400e">微调（能力定制）——提示和RAG解决不了时：固定领域风格、特定输出格式、降低推理成本（蒸馏小模型）</text>
    </svg>
  );
}
