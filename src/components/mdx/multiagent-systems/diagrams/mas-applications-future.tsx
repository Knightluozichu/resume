"use client";

export function MasApplicationsFutureDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="多智能体系统应用与未来展望">
      <defs>
        <linearGradient id="mas-af-blue" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="mas-af-purple" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="mas-af-amber" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="mas-af-green" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <linearGradient id="mas-af-red" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#dc2626" />
          <stop offset="100%" stopColor="#b91c1c" />
        </linearGradient>
        <marker id="mas-af-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">应用与未来展望</text>

      {/* 现实应用领域 */}
      <text x="400" y="62" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">现实应用领域</text>

      <rect x="40" y="76" width="180" height="80" rx="10" fill="url(#mas-af-blue)" opacity="0.1" stroke="#2563eb" strokeWidth="1.5" />
      <text x="130" y="100" textAnchor="middle" fontSize="11" fontWeight="700" fill="#1e40af">分布式监控</text>
      <text x="130" y="120" textAnchor="middle" fontSize="9" fill="#475569">电网 / 交通</text>
      <text x="130" y="138" textAnchor="middle" fontSize="9" fill="#475569">传感器网络</text>
      <text x="130" y="152" textAnchor="middle" fontSize="8" fill="#64748b">异常检测与响应</text>

      <rect x="232" y="76" width="180" height="80" rx="10" fill="url(#mas-af-purple)" opacity="0.1" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="322" y="100" textAnchor="middle" fontSize="11" fontWeight="700" fill="#5b21b6">自动协商</text>
      <text x="322" y="120" textAnchor="middle" fontSize="9" fill="#475569">电子商务</text>
      <text x="322" y="138" textAnchor="middle" fontSize="9" fill="#475569">供应链管理</text>
      <text x="322" y="152" textAnchor="middle" fontSize="8" fill="#64748b">拍卖与议价</text>

      <rect x="424" y="76" width="180" height="80" rx="10" fill="url(#mas-af-amber)" opacity="0.1" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="514" y="100" textAnchor="middle" fontSize="11" fontWeight="700" fill="#92400e">机器人协作</text>
      <text x="514" y="120" textAnchor="middle" fontSize="9" fill="#475569">多机器人编队</text>
      <text x="514" y="138" textAnchor="middle" fontSize="9" fill="#475569">仓储自动化</text>
      <text x="514" y="152" textAnchor="middle" fontSize="8" fill="#64748b">探索与搜救</text>

      <rect x="616" y="76" width="144" height="80" rx="10" fill="url(#mas-af-green)" opacity="0.1" stroke="#059669" strokeWidth="1.5" />
      <text x="688" y="100" textAnchor="middle" fontSize="11" fontWeight="700" fill="#065f46">智能语义网</text>
      <text x="688" y="120" textAnchor="middle" fontSize="9" fill="#475569">语义 Web</text>
      <text x="688" y="138" textAnchor="middle" fontSize="9" fill="#475569">服务组合</text>
      <text x="688" y="152" textAnchor="middle" fontSize="8" fill="#64748b">知识图谱协同</text>

      {/* 与 LLM/大模型融合 */}
      <text x="400" y="184" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">与大语言模型融合：LLM Agent</text>

      <rect x="40" y="198" width="240" height="56" rx="8" fill="url(#mas-af-blue)" opacity="0.9" />
      <text x="160" y="220" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">单 LLM Agent</text>
      <text x="160" y="240" textAnchor="middle" fontSize="9" fill="#bfdbfe">ReAct 推理 + 工具调用</text>

      <path d="M280 226 L308 226" stroke="#64748b" strokeWidth="2" markerEnd="url(#mas-af-arrow)" />

      <rect x="312" y="198" width="240" height="56" rx="8" fill="url(#mas-af-purple)" opacity="0.9" />
      <text x="432" y="220" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">多 LLM Agent</text>
      <text x="432" y="240" textAnchor="middle" fontSize="9" fill="#ede9fe">角色分工 + 对话协作</text>

      <path d="M552 226 L580 226" stroke="#64748b" strokeWidth="2" markerEnd="url(#mas-af-arrow)" />

      <rect x="584" y="198" width="176" height="56" rx="8" fill="url(#mas-af-amber)" opacity="0.9" />
      <text x="672" y="220" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">Agent 社会</text>
      <text x="672" y="240" textAnchor="middle" fontSize="9" fill="#fef3c7">自治多智能体生态</text>

      {/* 范式对照 */}
      <text x="400" y="280" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">经典 MAS vs LLM Agent</text>

      <rect x="40" y="294" width="360" height="124" rx="8" fill="url(#mas-af-blue)" opacity="0.06" stroke="#2563eb" strokeWidth="1.5" />
      <text x="220" y="316" textAnchor="middle" fontSize="11" fontWeight="700" fill="#1e40af">经典 MAS</text>
      <text x="60" y="338" fontSize="9" fill="#475569">决策：手工规则 / 强化学习</text>
      <text x="60" y="356" fontSize="9" fill="#475569">通信：KQML / FIPA ACL 形式协议</text>
      <text x="60" y="374" fontSize="9" fill="#475569">知识：本体 + 逻辑推理</text>
      <text x="60" y="392" fontSize="9" fill="#475569">优势：可证明、可解释</text>
      <text x="60" y="410" fontSize="9" fill="#64748b">局限：泛化弱、人工成本高</text>

      <rect x="420" y="294" width="340" height="124" rx="8" fill="url(#mas-af-purple)" opacity="0.06" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="590" y="316" textAnchor="middle" fontSize="11" fontWeight="700" fill="#5b21b6">LLM Agent</text>
      <text x="440" y="338" fontSize="9" fill="#475569">决策：LLM 推理 + 自然语言</text>
      <text x="440" y="356" fontSize="9" fill="#475569">通信：自然语言对话</text>
      <text x="440" y="374" fontSize="9" fill="#475569">知识：参数化世界知识</text>
      <text x="440" y="392" fontSize="9" fill="#475569">优势：泛化强、零样本</text>
      <text x="440" y="410" fontSize="9" fill="#64748b">局限：幻觉、难证明</text>

      {/* 未来挑战 */}
      <text x="400" y="440" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">未来挑战与方向</text>

      <rect x="40" y="454" width="172" height="64" rx="8" fill="url(#mas-af-red)" opacity="0.08" stroke="#dc2626" strokeWidth="1.5" />
      <text x="126" y="476" textAnchor="middle" fontSize="10" fontWeight="700" fill="#991b1b">规模可扩展</text>
      <text x="126" y="494" textAnchor="middle" fontSize="9" fill="#475569">百万级智能体</text>
      <text x="126" y="510" textAnchor="middle" fontSize="9" fill="#475569">复杂度治理</text>

      <rect x="224" y="454" width="172" height="64" rx="8" fill="url(#mas-af-amber)" opacity="0.08" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="310" y="476" textAnchor="middle" fontSize="10" fontWeight="700" fill="#92400e">可信与对齐</text>
      <text x="310" y="494" textAnchor="middle" fontSize="9" fill="#475569">价值观一致</text>
      <text x="310" y="510" textAnchor="middle" fontSize="9" fill="#475569">可问责性</text>

      <rect x="408" y="454" width="172" height="64" rx="8" fill="url(#mas-af-green)" opacity="0.08" stroke="#059669" strokeWidth="1.5" />
      <text x="494" y="476" textAnchor="middle" fontSize="10" fontWeight="700" fill="#065f46">人机共协</text>
      <text x="494" y="494" textAnchor="middle" fontSize="9" fill="#475569">混合团队</text>
      <text x="494" y="510" textAnchor="middle" fontSize="9" fill="#475569">可解释交互</text>

      <rect x="592" y="454" width="168" height="64" rx="8" fill="url(#mas-af-blue)" opacity="0.08" stroke="#2563eb" strokeWidth="1.5" />
      <text x="676" y="476" textAnchor="middle" fontSize="10" fontWeight="700" fill="#1e40af">仿真与标准</text>
      <text x="676" y="494" textAnchor="middle" fontSize="9" fill="#475569">统一评测</text>
      <text x="676" y="510" textAnchor="middle" fontSize="9" fill="#475569">开放协议</text>

      <rect x="30" y="528" width="740" height="24" rx="8" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1" />
      <text x="400" y="544" textAnchor="middle" fontSize="10" fill="#475569">趋势：经典 MAS 的可证明性 + LLM Agent 的泛化性 融合 → 可信自治多智能体系统</text>

      <rect x="30" y="556" width="740" height="18" rx="8" fill="url(#mas-af-purple)" opacity="0.08" stroke="#7c3aed" strokeWidth="1" />
      <text x="400" y="569" textAnchor="middle" fontSize="10" fontWeight="600" fill="#5b21b6">核心：MAS 从理论走向落地，与大模型融合开启自治智能体新阶段</text>
    </svg>
  );
}
