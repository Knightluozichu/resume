"use client";

export function LaeFineTuningDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="微调与领域适配全参数微调与LoRA对比">
      <defs>
        <linearGradient id="lae-ft-blue" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="lae-ft-purple" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="lae-ft-amber" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="lae-ft-green" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <marker id="lae-ft-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">微调与领域适配：从预训练到专用模型</text>

      {/* 上半：微调流程 */}
      <text x="400" y="64" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">微调全流程</text>

      <rect x="20" y="76" width="140" height="66" rx="8" fill="url(#lae-ft-blue)" opacity="0.9" />
      <text x="90" y="100" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">数据准备</text>
      <text x="90" y="118" textAnchor="middle" fontSize="10" fill="#bfdbfe">指令对数据</text>
      <text x="90" y="132" textAnchor="middle" fontSize="10" fill="#bfdbfe">清洗/格式化</text>

      <path d="M160 109 L180 109" stroke="#64748b" strokeWidth="2" markerEnd="url(#lae-ft-arrow)" />

      <rect x="185" y="76" width="140" height="66" rx="8" fill="url(#lae-ft-purple)" opacity="0.9" />
      <text x="255" y="100" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">加载基座</text>
      <text x="255" y="118" textAnchor="middle" fontSize="10" fill="#ede9fe">预训练模型</text>
      <text x="255" y="132" textAnchor="middle" fontSize="10" fill="#ede9fe">Llama/GPT等</text>

      <path d="M325 109 L345 109" stroke="#64748b" strokeWidth="2" markerEnd="url(#lae-ft-arrow)" />

      <rect x="350" y="76" width="140" height="66" rx="8" fill="url(#lae-ft-amber)" opacity="0.9" />
      <text x="420" y="100" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">训练配置</text>
      <text x="420" y="118" textAnchor="middle" fontSize="10" fill="#fef3c7">学习率/轮次</text>
      <text x="420" y="132" textAnchor="middle" fontSize="10" fill="#fef3c7">批量大小</text>

      <path d="M490 109 L510 109" stroke="#64748b" strokeWidth="2" markerEnd="url(#lae-ft-arrow)" />

      <rect x="515" y="76" width="120" height="66" rx="8" fill="url(#lae-ft-green)" opacity="0.9" />
      <text x="575" y="100" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">训练</text>
      <text x="575" y="118" textAnchor="middle" fontSize="10" fill="#d1fae5">梯度更新</text>
      <text x="575" y="132" textAnchor="middle" fontSize="10" fill="#d1fae5">损失优化</text>

      <path d="M635 109 L655 109" stroke="#64748b" strokeWidth="2" markerEnd="url(#lae-ft-arrow)" />

      <rect x="660" y="76" width="120" height="66" rx="8" fill="url(#lae-ft-blue)" opacity="0.9" />
      <text x="720" y="100" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">评估部署</text>
      <text x="720" y="118" textAnchor="middle" fontSize="10" fill="#bfdbfe">指标验证</text>
      <text x="720" y="132" textAnchor="middle" fontSize="10" fill="#bfdbfe">上线服务</text>

      {/* 中部：全参数 vs LoRA 对比 */}
      <text x="400" y="172" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">全参数微调 vs LoRA 参数高效微调</text>

      <rect x="30" y="186" width="360" height="140" rx="8" fill="url(#lae-ft-blue)" opacity="0.1" stroke="#2563eb" strokeWidth="1.5" />
      <text x="210" y="210" textAnchor="middle" fontSize="14" fontWeight="700" fill="#1e40af">全参数微调 Full Fine-tuning</text>
      <text x="210" y="234" textAnchor="middle" fontSize="11" fill="#475569">更新模型所有参数权重</text>
      <text x="210" y="254" textAnchor="middle" fontSize="11" fill="#475569">优点：效果最好 / 适应性强</text>
      <text x="210" y="274" textAnchor="middle" fontSize="11" fill="#475569">缺点：显存高 / 成本高 / 易过拟合</text>
      <text x="210" y="294" textAnchor="middle" fontSize="11" fill="#475569">需要大量高质量标注数据</text>
      <text x="210" y="314" textAnchor="middle" fontSize="11" fontWeight="600" fill="#2563eb">适合：大型团队 / 充足资源</text>

      <rect x="410" y="186" width="360" height="140" rx="8" fill="url(#lae-ft-green)" opacity="0.1" stroke="#059669" strokeWidth="1.5" />
      <text x="590" y="210" textAnchor="middle" fontSize="14" fontWeight="700" fill="#065f46">LoRA 低秩适配</text>
      <text x="590" y="234" textAnchor="middle" fontSize="11" fill="#475569">冻结原参数，训练低秩矩阵A/B</text>
      <text x="590" y="254" textAnchor="middle" fontSize="11" fill="#475569">优点：显存低 / 成本低 / 可切换</text>
      <text x="590" y="274" textAnchor="middle" fontSize="11" fill="#475569">缺点：效果略低于全参数</text>
      <text x="590" y="294" textAnchor="middle" fontSize="11" fill="#475569">只训练0.1%-1%的参数</text>
      <text x="590" y="314" textAnchor="middle" fontSize="11" fontWeight="600" fill="#059669">适合：资源有限 / 多任务适配</text>

      {/* 下半：何时微调 + 其他PEFT方法 */}
      <text x="400" y="352" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">其他参数高效微调方法</text>

      <rect x="30" y="366" width="170" height="76" rx="8" fill="url(#lae-ft-purple)" opacity="0.1" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="115" y="388" textAnchor="middle" fontSize="12" fontWeight="700" fill="#5b21b6">QLoRA</text>
      <text x="115" y="408" textAnchor="middle" fontSize="10" fill="#475569">4bit量化+LoRA</text>
      <text x="115" y="424" textAnchor="middle" fontSize="10" fill="#475569">进一步降低显存</text>
      <text x="115" y="438" textAnchor="middle" fontSize="10" fontWeight="600" fill="#7c3aed">消费级GPU可用</text>

      <rect x="210" y="366" width="170" height="76" rx="8" fill="url(#lae-ft-amber)" opacity="0.1" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="295" y="388" textAnchor="middle" fontSize="12" fontWeight="700" fill="#92400e">Prefix Tuning</text>
      <text x="295" y="408" textAnchor="middle" fontSize="10" fill="#475569">优化可学习前缀</text>
      <text x="295" y="424" textAnchor="middle" fontSize="10" fill="#475569">不改动原模型</text>
      <text x="295" y="438" textAnchor="middle" fontSize="10" fontWeight="600" fill="#f59e0b">轻量适配</text>

      <rect x="390" y="366" width="170" height="76" rx="8" fill="url(#lae-ft-blue)" opacity="0.1" stroke="#2563eb" strokeWidth="1.5" />
      <text x="475" y="388" textAnchor="middle" fontSize="12" fontWeight="700" fill="#1e40af">P-Tuning</text>
      <text x="475" y="408" textAnchor="middle" fontSize="10" fill="#475569">优化提示嵌入</text>
      <text x="475" y="424" textAnchor="middle" fontSize="10" fill="#475569">自动搜索最优前缀</text>
      <text x="475" y="438" textAnchor="middle" fontSize="10" fontWeight="600" fill="#2563eb">提示优化</text>

      <rect x="570" y="366" width="200" height="76" rx="8" fill="url(#lae-ft-green)" opacity="0.1" stroke="#059669" strokeWidth="1.5" />
      <text x="670" y="388" textAnchor="middle" fontSize="12" fontWeight="700" fill="#065f46">Adapter Tuning</text>
      <text x="670" y="408" textAnchor="middle" fontSize="10" fill="#475569">插入小型适配层</text>
      <text x="670" y="424" textAnchor="middle" fontSize="10" fill="#475569">只训练适配层参数</text>
      <text x="670" y="438" textAnchor="middle" fontSize="10" fontWeight="600" fill="#059669">模块化插拔</text>

      {/* 何时微调 */}
      <rect x="30" y="458" width="740" height="56" rx="8" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="400" y="480" textAnchor="middle" fontSize="12" fontWeight="700" fill="#334155">何时选择微调？</text>
      <text x="400" y="500" textAnchor="middle" fontSize="11" fill="#475569">提示工程无法满足 / 需要特定领域风格 / 需要稳定输出格式 / 有足够高质量数据</text>

      {/* 底部总结 */}
      <rect x="30" y="528" width="740" height="32" rx="8" fill="url(#lae-ft-purple)" opacity="0.08" stroke="#7c3aed" strokeWidth="2" />
      <text x="400" y="548" textAnchor="middle" fontSize="11" fill="#475569">决策链：提示工程 → RAG → 微调(LoRA优先) → 全参数微调 → 预训练</text>
    </svg>
  );
}
