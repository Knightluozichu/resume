"use client";

export function LslDeploymentCaseDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="部署实践与案例分析 真实场景部署架构">
      <defs>
        <linearGradient id="lsl-dc-blue" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="lsl-dc-purple" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="lsl-dc-amber" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="lsl-dc-green" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <linearGradient id="lsl-dc-red" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#dc2626" />
          <stop offset="100%" stopColor="#b91c1c" />
        </linearGradient>
        <marker id="lsl-dc-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">部署实践与案例分析</text>

      {/* 部署架构 */}
      <text x="400" y="62" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">LLM 服务部署架构</text>

      <rect x="20" y="74" width="130" height="56" rx="8" fill="url(#lsl-dc-blue)" opacity="0.9" />
      <text x="85" y="98" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">客户端</text>
      <text x="85" y="116" textAnchor="middle" fontSize="9" fill="#bfdbfe">SDK / API 调用</text>

      <path d="M150 102 L168 102" stroke="#64748b" strokeWidth="2" markerEnd="url(#lsl-dc-arrow)" />

      <rect x="173" y="74" width="130" height="56" rx="8" fill="url(#lsl-dc-purple)" opacity="0.9" />
      <text x="238" y="98" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">API 网关</text>
      <text x="238" y="116" textAnchor="middle" fontSize="9" fill="#ede9fe">鉴权 / 限流</text>

      <path d="M303 102 L321 102" stroke="#64748b" strokeWidth="2" markerEnd="url(#lsl-dc-arrow)" />

      <rect x="326" y="74" width="130" height="56" rx="8" fill="url(#lsl-dc-amber)" opacity="0.9" />
      <text x="391" y="98" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">负载均衡</text>
      <text x="391" y="116" textAnchor="middle" fontSize="9" fill="#fef3c7">路由 / 队列</text>

      <path d="M456 102 L474 102" stroke="#64748b" strokeWidth="2" markerEnd="url(#lsl-dc-arrow)" />

      <rect x="479" y="74" width="130" height="56" rx="8" fill="url(#lsl-dc-green)" opacity="0.9" />
      <text x="544" y="98" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">推理引擎</text>
      <text x="544" y="116" textAnchor="middle" fontSize="9" fill="#d1fae5">vLLM / TGI</text>

      <path d="M609 102 L627 102" stroke="#64748b" strokeWidth="2" markerEnd="url(#lsl-dc-arrow)" />

      <rect x="632" y="74" width="148" height="56" rx="8" fill="url(#lsl-dc-blue)" opacity="0.9" />
      <text x="706" y="98" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">GPU 集群</text>
      <text x="706" y="116" textAnchor="middle" fontSize="9" fill="#bfdbfe">多卡多机</text>

      {/* 部署模式 */}
      <text x="400" y="160" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">三种部署模式</text>

      <rect x="20" y="174" width="250" height="120" rx="8" fill="url(#lsl-dc-blue)" opacity="0.1" stroke="#2563eb" strokeWidth="1.5" />
      <text x="145" y="196" textAnchor="middle" fontSize="12" fontWeight="700" fill="#1e40af">云 API 调用</text>
      <text x="145" y="216" textAnchor="middle" fontSize="9" fill="#475569">GPT-4 / Claude / 通义千问</text>
      <text x="145" y="232" textAnchor="middle" fontSize="9" fill="#475569">优点：零运维 / 即开即用</text>
      <text x="145" y="248" textAnchor="middle" fontSize="9" fill="#475569">缺点：数据出域 / 按量付费</text>
      <text x="145" y="264" textAnchor="middle" fontSize="9" fill="#475569">适合：原型 / 低频场景</text>
      <text x="145" y="282" textAnchor="middle" fontSize="9" fontWeight="600" fill="#1e40af">成本：按 Token 计费</text>

      <rect x="275" y="174" width="250" height="120" rx="8" fill="url(#lsl-dc-purple)" opacity="0.1" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="400" y="196" textAnchor="middle" fontSize="12" fontWeight="700" fill="#5b21b6">私有化部署</text>
      <text x="400" y="216" textAnchor="middle" fontSize="9" fill="#475569">开源模型自建集群</text>
      <text x="400" y="232" textAnchor="middle" fontSize="9" fill="#475569">优点：数据安全 / 可定制</text>
      <text x="400" y="248" textAnchor="middle" fontSize="9" fill="#475569">缺点：运维成本 / GPU 投资</text>
      <text x="400" y="264" textAnchor="middle" fontSize="9" fill="#475569">适合：企业 / 高频 / 敏感</text>
      <text x="400" y="282" textAnchor="middle" fontSize="9" fontWeight="600" fill="#5b21b6">成本：固定 GPU 月租</text>

      <rect x="530" y="174" width="250" height="120" rx="8" fill="url(#lsl-dc-amber)" opacity="0.1" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="655" y="196" textAnchor="middle" fontSize="12" fontWeight="700" fill="#92400e">混合部署</text>
      <text x="655" y="216" textAnchor="middle" fontSize="9" fill="#475569">云 API + 自建结合</text>
      <text x="655" y="232" textAnchor="middle" fontSize="9" fill="#475569">优点：灵活 / 成本可控</text>
      <text x="655" y="248" textAnchor="middle" fontSize="9" fill="#475569">缺点：架构复杂</text>
      <text x="655" y="264" textAnchor="middle" fontSize="9" fill="#475569">适合：多场景分级</text>
      <text x="655" y="282" textAnchor="middle" fontSize="9" fontWeight="600" fill="#92400e">成本：按场景路由</text>

      {/* 典型案例 */}
      <text x="400" y="318" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">典型应用案例</text>

      <rect x="20" y="332" width="180" height="100" rx="8" fill="url(#lsl-dc-green)" opacity="0.08" stroke="#059669" strokeWidth="1.5" />
      <text x="110" y="354" textAnchor="middle" fontSize="11" fontWeight="700" fill="#065f46">RAG 知识助手</text>
      <text x="110" y="374" textAnchor="middle" fontSize="9" fill="#475569">向量检索 + 生成</text>
      <text x="110" y="390" textAnchor="middle" fontSize="9" fill="#475569">文档分块 / 嵌入</text>
      <text x="110" y="406" textAnchor="middle" fontSize="9" fill="#475569">重排序 / 引用</text>
      <text x="110" y="424" textAnchor="middle" fontSize="9" fontWeight="600" fill="#065f46">企业知识库问答</text>

      <rect x="210" y="332" width="180" height="100" rx="8" fill="url(#lsl-dc-blue)" opacity="0.08" stroke="#2563eb" strokeWidth="1.5" />
      <text x="300" y="354" textAnchor="middle" fontSize="11" fontWeight="700" fill="#1e40af">Agent 工具调用</text>
      <text x="300" y="374" textAnchor="middle" fontSize="9" fill="#475569">Function Calling</text>
      <text x="300" y="390" textAnchor="middle" fontSize="9" fill="#475569">多步规划执行</text>
      <text x="300" y="406" textAnchor="middle" fontSize="9" fill="#475569">代码解释器</text>
      <text x="300" y="424" textAnchor="middle" fontSize="9" fontWeight="600" fill="#1e40af">自动化工作流</text>

      <rect x="400" y="332" width="180" height="100" rx="8" fill="url(#lsl-dc-purple)" opacity="0.08" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="490" y="354" textAnchor="middle" fontSize="11" fontWeight="700" fill="#5b21b6">代码助手</text>
      <text x="490" y="374" textAnchor="middle" fontSize="9" fill="#475569">Copilot / 补全</text>
      <text x="490" y="390" textAnchor="middle" fontSize="9" fill="#475569">代码审查 / 重构</text>
      <text x="490" y="406" textAnchor="middle" fontSize="9" fill="#475569">Bug 定位 / 修复</text>
      <text x="490" y="424" textAnchor="middle" fontSize="9" fontWeight="600" fill="#5b21b6">研发效率提升</text>

      <rect x="590" y="332" width="190" height="100" rx="8" fill="url(#lsl-dc-amber)" opacity="0.08" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="685" y="354" textAnchor="middle" fontSize="11" fontWeight="700" fill="#92400e">客服对话</text>
      <text x="685" y="374" textAnchor="middle" fontSize="9" fill="#475569">多轮对话管理</text>
      <text x="685" y="390" textAnchor="middle" fontSize="9" fill="#475569">意图识别 / 路由</text>
      <text x="685" y="406" textAnchor="middle" fontSize="9" fill="#475569">人机协作</text>
      <text x="685" y="424" textAnchor="middle" fontSize="9" fontWeight="600" fill="#92400e">7x24 智能服务</text>

      {/* 成本优化 */}
      <text x="400" y="456" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">成本优化策略</text>

      <rect x="20" y="470" width="180" height="56" rx="8" fill="url(#lsl-dc-red)" opacity="0.08" stroke="#dc2626" strokeWidth="1.5" />
      <text x="110" y="492" textAnchor="middle" fontSize="10" fontWeight="600" fill="#991b1b">量化降本</text>
      <text x="110" y="512" textAnchor="middle" fontSize="9" fill="#475569">INT8/INT4 减少显存</text>

      <rect x="210" y="470" width="180" height="56" rx="8" fill="url(#lsl-dc-red)" opacity="0.08" stroke="#dc2626" strokeWidth="1.5" />
      <text x="300" y="492" textAnchor="middle" fontSize="10" fontWeight="600" fill="#991b1b">批处理提效</text>
      <text x="300" y="512" textAnchor="middle" fontSize="9" fill="#475569">连续批处理提吞吐</text>

      <rect x="400" y="470" width="180" height="56" rx="8" fill="url(#lsl-dc-red)" opacity="0.08" stroke="#dc2626" strokeWidth="1.5" />
      <text x="490" y="492" textAnchor="middle" fontSize="10" fontWeight="600" fill="#991b1b">缓存复用</text>
      <text x="490" y="512" textAnchor="middle" fontSize="9" fill="#475569">前缀缓存 / 语义缓存</text>

      <rect x="590" y="470" width="190" height="56" rx="8" fill="url(#lsl-dc-red)" opacity="0.08" stroke="#dc2626" strokeWidth="1.5" />
      <text x="685" y="492" textAnchor="middle" fontSize="10" fontWeight="600" fill="#991b1b">模型路由</text>
      <text x="685" y="512" textAnchor="middle" fontSize="9" fill="#475569">简单→小模型 复杂→大模型</text>

      {/* 底部总结 */}
      <rect x="20" y="540" width="760" height="32" rx="8" fill="url(#lsl-dc-purple)" opacity="0.08" stroke="#7c3aed" strokeWidth="2" />
      <text x="400" y="560" textAnchor="middle" fontSize="11" fontWeight="600" fill="#5b21b6">核心脉络：需求分析 → 架构选型 → 推理优化 → 成本控制 → 监控迭代 → 生产可用</text>
    </svg>
  );
}
