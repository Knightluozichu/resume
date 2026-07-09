"use client";

export function BlaProductionDeploymentDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="生产部署与运维：部署模式对比与运维体系">
      <defs>
        <linearGradient id="bla-pd-blue" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="bla-pd-purple" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="bla-pd-amber" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="bla-pd-green" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <linearGradient id="bla-pd-red" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#dc2626" />
          <stop offset="100%" stopColor="#b91c1c" />
        </linearGradient>
        <marker id="bla-pd-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">生产部署与运维</text>

      {/* 上半部分：部署架构 */}
      <text x="400" y="62" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">生产架构总览</text>

      {/* 客户端 → 网关 → 负载均衡 → 推理服务 → 模型 */}
      <rect x="30" y="76" width="120" height="60" rx="8" fill="url(#bla-pd-amber)" opacity="0.12" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="90" y="102" textAnchor="middle" fontSize="10" fontWeight="700" fill="#92400e">客户端</text>
      <text x="90" y="120" textAnchor="middle" fontSize="9" fill="#64748b">Web / App</text>

      <path d="M154 106 L172 106" stroke="#64748b" strokeWidth="2" markerEnd="url(#bla-pd-arrow)" />

      <rect x="176" y="76" width="120" height="60" rx="8" fill="url(#bla-pd-blue)" opacity="0.12" stroke="#2563eb" strokeWidth="1.5" />
      <text x="236" y="102" textAnchor="middle" fontSize="10" fontWeight="700" fill="#1e40af">API 网关</text>
      <text x="236" y="120" textAnchor="middle" fontSize="9" fill="#64748b">鉴权 / 限流</text>

      <path d="M300 106 L318 106" stroke="#64748b" strokeWidth="2" markerEnd="url(#bla-pd-arrow)" />

      <rect x="322" y="76" width="120" height="60" rx="8" fill="url(#bla-pd-purple)" opacity="0.12" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="382" y="102" textAnchor="middle" fontSize="10" fontWeight="700" fill="#5b21b6">负载均衡</text>
      <text x="382" y="120" textAnchor="middle" fontSize="9" fill="#64748b">路由 / 扩缩容</text>

      <path d="M446 106 L464 106" stroke="#64748b" strokeWidth="2" markerEnd="url(#bla-pd-arrow)" />

      <rect x="468" y="76" width="120" height="60" rx="8" fill="url(#bla-pd-green)" opacity="0.12" stroke="#059669" strokeWidth="1.5" />
      <text x="528" y="102" textAnchor="middle" fontSize="10" fontWeight="700" fill="#065f46">推理服务</text>
      <text x="528" y="120" textAnchor="middle" fontSize="9" fill="#64748b">vLLM / TGI</text>

      <path d="M592 106 L610 106" stroke="#64748b" strokeWidth="2" markerEnd="url(#bla-pd-arrow)" />

      <rect x="614" y="76" width="150" height="60" rx="8" fill="url(#bla-pd-red)" opacity="0.12" stroke="#dc2626" strokeWidth="1.5" />
      <text x="689" y="102" textAnchor="middle" fontSize="10" fontWeight="700" fill="#991b1b">LLM 模型</text>
      <text x="689" y="120" textAnchor="middle" fontSize="9" fill="#64748b">GPU 集群</text>

      {/* 中间：三种部署模式对比 */}
      <text x="400" y="168" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">三种部署模式对比</text>

      <rect x="30" y="182" width="228" height="130" rx="10" fill="url(#bla-pd-blue)" opacity="0.08" stroke="#2563eb" strokeWidth="1.5" />
      <text x="144" y="206" textAnchor="middle" fontSize="12" fontWeight="700" fill="#1e40af">云 API 调用</text>
      <text x="144" y="226" textAnchor="middle" fontSize="9" fill="#475569">OpenAI / Anthropic</text>
      <text x="144" y="244" textAnchor="middle" fontSize="9" fill="#64748b">优点：零运维、即开即用</text>
      <text x="144" y="262" textAnchor="middle" fontSize="9" fill="#64748b">缺点：数据出域、成本随量</text>
      <text x="144" y="280" textAnchor="middle" fontSize="9" fill="#64748b">延迟：依赖网络</text>
      <text x="144" y="298" textAnchor="middle" fontSize="9" fill="#64748b">适合：原型 / 非敏感数据</text>

      <rect x="286" y="182" width="228" height="130" rx="10" fill="url(#bla-pd-purple)" opacity="0.08" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="400" y="206" textAnchor="middle" fontSize="12" fontWeight="700" fill="#5b21b6">私有化部署</text>
      <text x="400" y="226" textAnchor="middle" fontSize="9" fill="#475569">开源模型 + 自建GPU</text>
      <text x="400" y="244" textAnchor="middle" fontSize="9" fill="#64748b">优点：数据不出域、可控</text>
      <text x="400" y="262" textAnchor="middle" fontSize="9" fill="#64748b">缺点：运维重、初始成本高</text>
      <text x="400" y="280" textAnchor="middle" fontSize="9" fill="#64748b">延迟：内网低延迟</text>
      <text x="400" y="298" textAnchor="middle" fontSize="9" fill="#64748b">适合：金融 / 医疗 / 政府</text>

      <rect x="542" y="182" width="228" height="130" rx="10" fill="url(#bla-pd-amber)" opacity="0.08" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="656" y="206" textAnchor="middle" fontSize="12" fontWeight="700" fill="#92400e">混合部署</text>
      <text x="656" y="226" textAnchor="middle" fontSize="9" fill="#475569">云API + 私有模型</text>
      <text x="656" y="244" textAnchor="middle" fontSize="9" fill="#64748b">优点：灵活、成本可控</text>
      <text x="656" y="262" textAnchor="middle" fontSize="9" fill="#64748b">缺点：架构复杂</text>
      <text x="656" y="280" textAnchor="middle" fontSize="9" fill="#64748b">延迟：按路由动态选择</text>
      <text x="656" y="298" textAnchor="middle" fontSize="9" fill="#64748b">适合：企业级生产系统</text>

      {/* 下半部分：运维六大支柱 */}
      <text x="400" y="340" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">生产运维六大支柱</text>

      <rect x="30" y="354" width="228" height="64" rx="8" fill="url(#bla-pd-green)" opacity="0.08" stroke="#059669" strokeWidth="1.5" />
      <text x="144" y="376" textAnchor="middle" fontSize="11" fontWeight="700" fill="#065f46">监控与可观测</text>
      <text x="144" y="394" textAnchor="middle" fontSize="9" fill="#475569">延迟 / 吞吐 / 错误率</text>
      <text x="144" y="408" textAnchor="middle" fontSize="9" fill="#64748b">Token 用量 / 成本追踪</text>

      <rect x="286" y="354" width="228" height="64" rx="8" fill="url(#bla-pd-red)" opacity="0.08" stroke="#dc2626" strokeWidth="1.5" />
      <text x="400" y="376" textAnchor="middle" fontSize="11" fontWeight="700" fill="#991b1b">安全与合规</text>
      <text x="400" y="394" textAnchor="middle" fontSize="9" fill="#475569">输入过滤 / 输出审核</text>
      <text x="400" y="408" textAnchor="middle" fontSize="9" fill="#64748b">PII 脱敏 / 审计日志</text>

      <rect x="542" y="354" width="228" height="64" rx="8" fill="url(#bla-pd-amber)" opacity="0.08" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="656" y="376" textAnchor="middle" fontSize="11" fontWeight="700" fill="#92400e">成本优化</text>
      <text x="656" y="394" textAnchor="middle" fontSize="9" fill="#475569">模型路由 / 缓存</text>
      <text x="656" y="408" textAnchor="middle" fontSize="9" fill="#64748b">量化 / 批处理</text>

      <rect x="30" y="430" width="228" height="64" rx="8" fill="url(#bla-pd-blue)" opacity="0.08" stroke="#2563eb" strokeWidth="1.5" />
      <text x="144" y="452" textAnchor="middle" fontSize="11" fontWeight="700" fill="#1e40af">评测与质量</text>
      <text x="144" y="470" textAnchor="middle" fontSize="9" fill="#475569">回归测试 / A/B 测试</text>
      <text x="144" y="484" textAnchor="middle" fontSize="9" fill="#64748b">Bad case 追踪</text>

      <rect x="286" y="430" width="228" height="64" rx="8" fill="url(#bla-pd-purple)" opacity="0.08" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="400" y="452" textAnchor="middle" fontSize="11" fontWeight="700" fill="#5b21b6">弹性扩缩容</text>
      <text x="400" y="470" textAnchor="middle" fontSize="9" fill="#475569">自动扩容 / 峰值应对</text>
      <text x="400" y="484" textAnchor="middle" fontSize="9" fill="#64748b">GPU 池化 / 多租户</text>

      <rect x="542" y="430" width="228" height="64" rx="8" fill="#f1f5f9" stroke="#64748b" strokeWidth="1.5" />
      <text x="656" y="452" textAnchor="middle" fontSize="11" fontWeight="700" fill="#334155">灰度发布</text>
      <text x="656" y="470" textAnchor="middle" fontSize="9" fill="#475569">金丝雀 / 流量切分</text>
      <text x="656" y="484" textAnchor="middle" fontSize="9" fill="#64748b">版本回滚机制</text>

      {/* 底部：从原型到生产的关键跃迁 */}
      <rect x="30" y="510" width="740" height="56" rx="10" fill="url(#bla-pd-purple)" opacity="0.08" stroke="#7c3aed" strokeWidth="2" />
      <text x="400" y="532" textAnchor="middle" fontSize="12" fontWeight="700" fill="#5b21b6">从原型到生产的关键跃迁</text>
      <text x="400" y="552" textAnchor="middle" fontSize="10" fill="#475569">可靠性（99.9%可用） · 可观测（全链路追踪） · 可扩展（弹性扩缩） · 可控（成本+安全） · 可迭代（评测驱动）</text>
    </svg>
  );
}
