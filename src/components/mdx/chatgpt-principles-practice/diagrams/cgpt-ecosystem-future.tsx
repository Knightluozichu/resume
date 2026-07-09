"use client";

export function CgptEcosystemFutureDiagram() {
  return (
    <svg viewBox="0 0 800 560" className="w-full h-auto" role="img" aria-label="生态与未来展望 多模态Agent开源安全AGI">
      <defs>
        <linearGradient id="cpp-ef-blue" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="cpp-ef-purple" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="cpp-ef-amber" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="cpp-ef-green" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <linearGradient id="cpp-ef-red" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#dc2626" />
          <stop offset="100%" stopColor="#b91c1c" />
        </linearGradient>
        <marker id="cpp-ef-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="32" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">生态与未来展望 · 大模型的下一个十年</text>

      {/* 五大方向 */}
      <text x="400" y="60" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">五大演进方向</text>

      <rect x="30" y="72" width="145" height="120" rx="10" fill="url(#cpp-ef-blue)" opacity="0.1" stroke="#2563eb" strokeWidth="1.5" />
      <text x="102" y="96" textAnchor="middle" fontSize="12" fontWeight="700" fill="#1e40af">多模态</text>
      <text x="102" y="118" textAnchor="middle" fontSize="10" fill="#475569">文本/图/音/视频</text>
      <text x="102" y="136" textAnchor="middle" fontSize="10" fill="#475569">统一理解与生成</text>
      <text x="102" y="154" textAnchor="middle" fontSize="10" fill="#475569">原生多模态训练</text>
      <text x="102" y="178" textAnchor="middle" fontSize="10" fontWeight="600" fill="#2563eb">GPT-4o 类架构</text>

      <rect x="189" y="72" width="145" height="120" rx="10" fill="url(#cpp-ef-purple)" opacity="0.1" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="261" y="96" textAnchor="middle" fontSize="12" fontWeight="700" fill="#5b21b6">Agent 自主</text>
      <text x="261" y="118" textAnchor="middle" fontSize="10" fill="#475569">规划/记忆/工具</text>
      <text x="261" y="136" textAnchor="middle" fontSize="10" fill="#475569">长程任务自治</text>
      <text x="261" y="154" textAnchor="middle" fontSize="10" fill="#475569">多 Agent 协作</text>
      <text x="261" y="178" textAnchor="middle" fontSize="10" fontWeight="600" fill="#7c3aed">从助手到同事</text>

      <rect x="348" y="72" width="145" height="120" rx="10" fill="url(#cpp-ef-amber)" opacity="0.1" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="420" y="96" textAnchor="middle" fontSize="12" fontWeight="700" fill="#92400e">开源生态</text>
      <text x="420" y="118" textAnchor="middle" fontSize="10" fill="#475569">Llama / Qwen / Mistral</text>
      <text x="420" y="136" textAnchor="middle" fontSize="10" fill="#475569">权重开放可自部署</text>
      <text x="420" y="154" textAnchor="middle" fontSize="10" fill="#475569">闭源差距缩小</text>
      <text x="420" y="178" textAnchor="middle" fontSize="10" fontWeight="600" fill="#f59e0b">推动普惠化</text>

      <rect x="507" y="72" width="145" height="120" rx="10" fill="url(#cpp-ef-red)" opacity="0.1" stroke="#dc2626" strokeWidth="1.5" />
      <text x="579" y="96" textAnchor="middle" fontSize="12" fontWeight="700" fill="#b91c1c">安全对齐</text>
      <text x="579" y="118" textAnchor="middle" fontSize="10" fill="#475569">可解释性研究</text>
      <text x="579" y="136" textAnchor="middle" fontSize="10" fill="#475569">越狱防御</text>
      <text x="579" y="154" textAnchor="middle" fontSize="10" fill="#475569">价值观对齐</text>
      <text x="579" y="178" textAnchor="middle" fontSize="10" fontWeight="600" fill="#b91c1c">越强越要可控</text>

      <rect x="666" y="72" width="104" height="120" rx="10" fill="url(#cpp-ef-green)" opacity="0.1" stroke="#059669" strokeWidth="1.5" />
      <text x="718" y="96" textAnchor="middle" fontSize="12" fontWeight="700" fill="#065f46">AGI 路径</text>
      <text x="718" y="118" textAnchor="middle" fontSize="10" fill="#475569">通用智能</text>
      <text x="718" y="136" textAnchor="middle" fontSize="10" fill="#475569">自我改进</text>
      <text x="718" y="154" textAnchor="middle" fontSize="10" fill="#475569">推理增强</text>
      <text x="718" y="178" textAnchor="middle" fontSize="10" fontWeight="600" fill="#059669">长期愿景</text>

      <path d="M400 192 L400 200" stroke="#64748b" strokeWidth="2" markerEnd="url(#cpp-ef-arrow)" />

      {/* 能力演进时间线 */}
      <text x="400" y="228" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">能力演进路径</text>

      <rect x="40" y="240" width="720" height="56" rx="8" fill="url(#cpp-ef-blue)" opacity="0.08" stroke="#2563eb" strokeWidth="1.5" />
      <text x="400" y="264" textAnchor="middle" fontSize="11" fontWeight="600" fill="#1e40af">语言模型 → 多模态模型 → 工具型 Agent → 自主 Agent → 通用智能体</text>
      <text x="400" y="284" textAnchor="middle" fontSize="10" fill="#475569">每一步：能力边界扩展 + 自主程度提升 + 人机协作模式升级</text>

      <path d="M400 296 L400 304" stroke="#64748b" strokeWidth="2" markerEnd="url(#cpp-ef-arrow)" />

      {/* 技术挑战 */}
      <text x="400" y="332" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">核心技术挑战</text>

      <rect x="40" y="344" width="350" height="100" rx="10" fill="url(#cpp-ef-amber)" opacity="0.08" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="215" y="368" textAnchor="middle" fontSize="12" fontWeight="700" fill="#92400e">能力挑战</text>
      <text x="215" y="392" textAnchor="middle" fontSize="10" fill="#475569">幻觉 / 长程推理 / 因果理解</text>
      <text x="215" y="412" textAnchor="middle" fontSize="10" fill="#475569">持续学习防遗忘</text>
      <text x="215" y="432" textAnchor="middle" fontSize="10" fill="#475569">高效训练与推理</text>

      <rect x="410" y="344" width="350" height="100" rx="10" fill="url(#cpp-ef-red)" opacity="0.08" stroke="#dc2626" strokeWidth="1.5" />
      <text x="585" y="368" textAnchor="middle" fontSize="12" fontWeight="700" fill="#b91c1c">治理挑战</text>
      <text x="585" y="392" textAnchor="middle" fontSize="10" fill="#475569">安全可控 / 可解释</text>
      <text x="585" y="412" textAnchor="middle" fontSize="10" fill="#475569">偏见公平 / 隐私保护</text>
      <text x="585" y="432" textAnchor="middle" fontSize="10" fill="#475569">责任归属 / 监管合规</text>

      <path d="M400 444 L400 452" stroke="#64748b" strokeWidth="2" markerEnd="url(#cpp-ef-arrow)" />

      {/* 底部总结 */}
      <rect x="40" y="460" width="720" height="80" rx="10" fill="url(#cpp-ef-green)" opacity="0.08" stroke="#059669" strokeWidth="2" />
      <text x="400" y="486" textAnchor="middle" fontSize="13" fontWeight="700" fill="#065f46">核心趋势</text>
      <text x="400" y="510" textAnchor="middle" fontSize="11" fill="#475569">从「能聊天的模型」到「能做事的智能体」——技术、生态、安全三条线同步演进</text>
      <text x="400" y="530" textAnchor="middle" fontSize="11" fontWeight="600" fill="#059669">开源闭源竞速 + 多模态融合 + Agent 自主化 = 通向 AGI 的工程路径</text>
    </svg>
  );
}
