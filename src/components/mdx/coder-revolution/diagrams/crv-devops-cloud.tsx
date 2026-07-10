"use client";

export function CrvDevopsCloudDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="DevOps与云计算CI/CD流水线与云服务模型图">
      <defs>
        <linearGradient id="crv-dc2-1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>
        <linearGradient id="crv-dc2-2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#9333ea" />
          <stop offset="100%" stopColor="#7e22ce" />
        </linearGradient>
        <linearGradient id="crv-dc2-3" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#16a34a" />
          <stop offset="100%" stopColor="#15803d" />
        </linearGradient>
        <linearGradient id="crv-dc2-4" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ca8a04" />
          <stop offset="100%" stopColor="#a16207" />
        </linearGradient>
        <marker id="crv-dc2-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">DevOps 与云计算：交付之道</text>

      {/* CI/CD 流水线 */}
      <text x="400" y="62" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">CI/CD 流水线</text>

      <rect x="20" y="74" width="120" height="60" rx="8" fill="url(#crv-dc2-1)" opacity="0.1" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="80" y="98" textAnchor="middle" fontSize="11" fontWeight="600" fill="#0369a1">代码提交</text>
      <text x="80" y="116" textAnchor="middle" fontSize="9" fill="#475569">Git Push</text>

      <path d="M140 104 L164 104" stroke="#64748b" strokeWidth="2" markerEnd="url(#crv-dc2-arrow)" />

      <rect x="168" y="74" width="120" height="60" rx="8" fill="url(#crv-dc2-2)" opacity="0.1" stroke="#9333ea" strokeWidth="1.5" />
      <text x="228" y="98" textAnchor="middle" fontSize="11" fontWeight="600" fill="#7e22ce">构建</text>
      <text x="228" y="116" textAnchor="middle" fontSize="9" fill="#475569">编译打包</text>

      <path d="M288 104 L312 104" stroke="#64748b" strokeWidth="2" markerEnd="url(#crv-dc2-arrow)" />

      <rect x="316" y="74" width="120" height="60" rx="8" fill="url(#crv-dc2-3)" opacity="0.1" stroke="#16a34a" strokeWidth="1.5" />
      <text x="376" y="98" textAnchor="middle" fontSize="11" fontWeight="600" fill="#15803d">测试</text>
      <text x="376" y="116" textAnchor="middle" fontSize="9" fill="#475569">自动化测试</text>

      <path d="M436 104 L460 104" stroke="#64748b" strokeWidth="2" markerEnd="url(#crv-dc2-arrow)" />

      <rect x="464" y="74" width="120" height="60" rx="8" fill="url(#crv-dc2-4)" opacity="0.1" stroke="#ca8a04" strokeWidth="1.5" />
      <text x="524" y="98" textAnchor="middle" fontSize="11" fontWeight="600" fill="#a16207">部署</text>
      <text x="524" y="116" textAnchor="middle" fontSize="9" fill="#475569">镜像发布</text>

      <path d="M584 104 L608 104" stroke="#64748b" strokeWidth="2" markerEnd="url(#crv-dc2-arrow)" />

      <rect x="612" y="74" width="168" height="60" rx="8" fill="url(#crv-dc2-1)" opacity="0.1" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="696" y="98" textAnchor="middle" fontSize="11" fontWeight="600" fill="#0369a1">监控运维</text>
      <text x="696" y="116" textAnchor="middle" fontSize="9" fill="#475569">日志 / 告警 / 自愈</text>

      {/* 云服务三层模型 */}
      <text x="400" y="164" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">云计算服务模型</text>

      <rect x="60" y="176" width="680" height="56" rx="8" fill="url(#crv-dc2-1)" opacity="0.9" />
      <text x="100" y="200" fontSize="12" fontWeight="700" fill="#fff">SaaS</text>
      <text x="180" y="200" fontSize="11" fill="#e0f2fe">软件即服务——开箱即用</text>
      <text x="180" y="220" fontSize="10" fill="#e0f2fe">用户只管用：邮箱 / 协作 / CRM</text>

      <path d="M400 232 L400 236" stroke="#64748b" strokeWidth="2" markerEnd="url(#crv-dc2-arrow)" />

      <rect x="60" y="240" width="680" height="56" rx="8" fill="url(#crv-dc2-2)" opacity="0.9" />
      <text x="100" y="264" fontSize="12" fontWeight="700" fill="#fff">PaaS</text>
      <text x="180" y="264" fontSize="11" fill="#f3e8ff">平台即服务——托管运行时</text>
      <text x="180" y="284" fontSize="10" fill="#f3e8ff">开发者只管代码：App Engine / 容器平台</text>

      <path d="M400 296 L400 300" stroke="#64748b" strokeWidth="2" markerEnd="url(#crv-dc2-arrow)" />

      <rect x="60" y="304" width="680" height="56" rx="8" fill="url(#crv-dc2-3)" opacity="0.9" />
      <text x="100" y="328" fontSize="12" fontWeight="700" fill="#fff">IaaS</text>
      <text x="180" y="328" fontSize="11" fill="#dcfce7">基础设施即服务——虚拟机/网络/存储</text>
      <text x="180" y="348" fontSize="10" fill="#dcfce7">运维管到底层：EC2 / ECS / VPC</text>

      {/* 容器与编排 */}
      <text x="400" y="386" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">容器化与编排</text>

      <rect x="30" y="398" width="240" height="100" rx="10" fill="url(#crv-dc2-1)" opacity="0.1" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="150" y="422" textAnchor="middle" fontSize="12" fontWeight="700" fill="#0369a1">Docker</text>
      <text x="150" y="442" textAnchor="middle" fontSize="10" fill="#475569">应用 + 环境打包</text>
      <text x="150" y="458" textAnchor="middle" fontSize="10" fill="#475569">镜像分层构建</text>
      <text x="150" y="474" textAnchor="middle" fontSize="10" fill="#475569">一次构建到处运行</text>
      <text x="150" y="490" textAnchor="middle" fontSize="10" fill="#475569">轻量级隔离</text>

      <rect x="285" y="398" width="240" height="100" rx="10" fill="url(#crv-dc2-2)" opacity="0.1" stroke="#9333ea" strokeWidth="1.5" />
      <text x="405" y="422" textAnchor="middle" fontSize="12" fontWeight="700" fill="#7e22ce">Kubernetes</text>
      <text x="405" y="442" textAnchor="middle" fontSize="10" fill="#475569">容器编排调度</text>
      <text x="405" y="458" textAnchor="middle" fontSize="10" fill="#475569">自动扩缩容</text>
      <text x="405" y="474" textAnchor="middle" fontSize="10" fill="#475569">滚动更新 / 回滚</text>
      <text x="405" y="490" textAnchor="middle" fontSize="10" fill="#475569">服务发现 / 负载均衡</text>

      <rect x="540" y="398" width="220" height="100" rx="10" fill="url(#crv-dc2-3)" opacity="0.1" stroke="#16a34a" strokeWidth="1.5" />
      <text x="650" y="422" textAnchor="middle" fontSize="12" fontWeight="700" fill="#15803d">Serverless</text>
      <text x="650" y="442" textAnchor="middle" fontSize="10" fill="#475569">无服务器计算</text>
      <text x="650" y="458" textAnchor="middle" fontSize="10" fill="#475569">按需弹性执行</text>
      <text x="650" y="474" textAnchor="middle" fontSize="10" fill="#475569">事件驱动</text>
      <text x="650" y="490" textAnchor="middle" fontSize="10" fill="#475569">按调用付费</text>

      {/* DevOps 文化 */}
      <rect x="30" y="514" width="740" height="32" rx="8" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="400" y="534" textAnchor="middle" fontSize="10" fill="#475569">开发 + 运维一体化——自动化一切可自动化之事，消除手动交付瓶颈</text>

      <rect x="30" y="552" width="740" height="22" rx="6" fill="url(#crv-dc2-2)" opacity="0.08" stroke="#9333ea" strokeWidth="1.5" />
      <text x="400" y="567" textAnchor="middle" fontSize="10" fontWeight="600" fill="#7e22ce">核心：代码 → 构建 → 测试 → 部署 → 监控——闭环自动化交付</text>
    </svg>
  );
}
