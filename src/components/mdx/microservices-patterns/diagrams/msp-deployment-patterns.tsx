"use client";

export function MspDeploymentPatternsDiagram() {
  return (
    <svg viewBox="0 0 800 560" className="w-full h-auto" role="img" aria-label="微服务部署模式对比">
      <defs>
        <linearGradient id="msp-dp-multi" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ef4444" />
          <stop offset="100%" stopColor="#dc2626" />
        </linearGradient>
        <linearGradient id="msp-dp-single" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="msp-dp-container" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="msp-dp-serverless" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <marker id="msp-dp-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="28" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">微服务部署模式全景对比</text>

      {/* 模式一：单主机多服务 */}
      <rect x="40" y="50" width="170" height="180" rx="12" fill="#fee2e2" stroke="#ef4444" strokeWidth="2" />
      <text x="125" y="73" textAnchor="middle" fontSize="12" fontWeight="700" fill="#991b1b">单主机多服务</text>
      <line x1="55" y1="82" x2="195" y2="82" stroke="#ef4444" strokeWidth="1" opacity="0.4" />

      <rect x="55" y="95" width="60" height="30" rx="5" fill="url(#msp-dp-multi)" opacity="0.8" />
      <text x="85" y="115" textAnchor="middle" fontSize="11" fill="#fff">服务A</text>

      <rect x="125" y="95" width="60" height="30" rx="5" fill="url(#msp-dp-multi)" opacity="0.8" />
      <text x="155" y="115" textAnchor="middle" fontSize="11" fill="#fff">服务B</text>

      <rect x="55" y="135" width="60" height="30" rx="5" fill="url(#msp-dp-multi)" opacity="0.8" />
      <text x="85" y="155" textAnchor="middle" fontSize="11" fill="#fff">服务C</text>

      <rect x="125" y="135" width="60" height="30" rx="5" fill="url(#msp-dp-multi)" opacity="0.8" />
      <text x="155" y="155" textAnchor="middle" fontSize="11" fill="#fff">服务D</text>

      <text x="125" y="183" textAnchor="middle" fontSize="11" fill="#b91c1c">+ 资源利用率高</text>
      <text x="125" y="200" textAnchor="middle" fontSize="11" fill="#dc2626">- 资源争抢</text>
      <text x="125" y="217" textAnchor="middle" fontSize="11" fill="#dc2626">- 无法独立扩缩</text>

      {/* 模式二：单主机单服务 */}
      <rect x="225" y="50" width="170" height="180" rx="12" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2" />
      <text x="310" y="73" textAnchor="middle" fontSize="12" fontWeight="700" fill="#92400e">单主机单服务</text>
      <line x1="240" y1="82" x2="380" y2="82" stroke="#f59e0b" strokeWidth="1" opacity="0.4" />

      <rect x="240" y="95" width="60" height="45" rx="5" fill="url(#msp-dp-single)" opacity="0.8" />
      <text x="270" y="123" textAnchor="middle" fontSize="11" fill="#fff">服务A</text>

      <rect x="310" y="95" width="60" height="45" rx="5" fill="url(#msp-dp-single)" opacity="0.8" />
      <text x="340" y="123" textAnchor="middle" fontSize="11" fill="#fff">服务B</text>

      <rect x="240" y="150" width="60" height="45" rx="5" fill="url(#msp-dp-single)" opacity="0.8" />
      <text x="270" y="178" textAnchor="middle" fontSize="11" fill="#fff">服务C</text>

      <rect x="310" y="150" width="60" height="45" rx="5" fill="url(#msp-dp-single)" opacity="0.8" />
      <text x="340" y="178" textAnchor="middle" fontSize="11" fill="#fff">服务D</text>

      <text x="310" y="210" textAnchor="middle" fontSize="11" fill="#78350f">+ 隔离好</text>
      <text x="310" y="222" textAnchor="middle" fontSize="11" fill="#dc2626">- 资源浪费</text>

      {/* 模式三：容器化 */}
      <rect x="410" y="50" width="170" height="180" rx="12" fill="#dbeafe" stroke="#2563eb" strokeWidth="2" />
      <text x="495" y="73" textAnchor="middle" fontSize="12" fontWeight="700" fill="#1d4ed8">容器化部署</text>
      <line x1="425" y1="82" x2="565" y2="82" stroke="#2563eb" strokeWidth="1" opacity="0.4" />

      <rect x="425" y="95" width="140" height="55" rx="6" fill="#bfdbfe" stroke="#2563eb" strokeWidth="1" />
      <text x="495" y="115" textAnchor="middle" fontSize="11" fill="#1e3a8a">K8s编排平台</text>
      <text x="495" y="135" textAnchor="middle" fontSize="11" fill="#1e40af">自动调度/自愈/扩缩容</text>

      <rect x="425" y="160" width="60" height="30" rx="5" fill="url(#msp-dp-container)" opacity="0.8" />
      <text x="455" y="180" textAnchor="middle" fontSize="11" fill="#fff">Pod A</text>

      <rect x="495" y="160" width="70" height="30" rx="5" fill="url(#msp-dp-container)" opacity="0.8" />
      <text x="530" y="180" textAnchor="middle" fontSize="11" fill="#fff">Pod B</text>

      <text x="495" y="207" textAnchor="middle" fontSize="11" fill="#1e40af">+ 轻量/高效/主流</text>
      <text x="495" y="222" textAnchor="middle" fontSize="11" fill="#dc2626">- K8s学习曲线陡</text>

      {/* 模式四：Serverless */}
      <rect x="595" y="50" width="165" height="180" rx="12" fill="#ede9fe" stroke="#8b5cf6" strokeWidth="2" />
      <text x="677" y="73" textAnchor="middle" fontSize="12" fontWeight="700" fill="#6d28d9">Serverless</text>
      <line x1="610" y1="82" x2="745" y2="82" stroke="#8b5cf6" strokeWidth="1" opacity="0.4" />

      <text x="677" y="105" textAnchor="middle" fontSize="11" fill="#5b21b6">事件触发 → 分配实例</text>
      <text x="677" y="125" textAnchor="middle" fontSize="11" fill="#5b21b6">→ 执行函数 → 释放</text>

      <rect x="620" y="140" width="115" height="35" rx="6" fill="url(#msp-dp-serverless)" opacity="0.85" />
      <text x="677" y="163" textAnchor="middle" fontSize="11" fill="#fff">零运维 / 按量付费</text>

      <text x="677" y="195" textAnchor="middle" fontSize="11" fill="#5b21b6">+ 自动扩缩到零</text>
      <text x="677" y="212" textAnchor="middle" fontSize="11" fill="#dc2626">- 冷启动延迟</text>
      <text x="677" y="225" textAnchor="middle" fontSize="11" fill="#dc2626">- 供应商锁定</text>

      {/* 滚动更新 */}
      <text x="400" y="255" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">容器化：K8s滚动更新（零停机部署）</text>

      <rect x="40" y="270" width="720" height="55" rx="10" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />

      <rect x="60" y="285" width="50" height="25" rx="4" fill="#dbeafe" stroke="#2563eb" strokeWidth="1" />
      <text x="85" y="302" textAnchor="middle" fontSize="11" fill="#1d4ed8">v1</text>

      <rect x="115" y="285" width="50" height="25" rx="4" fill="#dbeafe" stroke="#2563eb" strokeWidth="1" />
      <text x="140" y="302" textAnchor="middle" fontSize="11" fill="#1d4ed8">v1</text>

      <rect x="170" y="285" width="50" height="25" rx="4" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1" />
      <text x="195" y="302" textAnchor="middle" fontSize="11" fill="#92400e">v2</text>

      <rect x="225" y="285" width="50" height="25" rx="4" fill="#dbeafe" stroke="#2563eb" strokeWidth="1" />
      <text x="250" y="302" textAnchor="middle" fontSize="11" fill="#1d4ed8">v1</text>

      <rect x="280" y="285" width="50" height="25" rx="4" fill="#dbeafe" stroke="#2563eb" strokeWidth="1" />
      <text x="305" y="302" textAnchor="middle" fontSize="11" fill="#1d4ed8">v1</text>

      <text x="400" y="302" textAnchor="middle" fontSize="11" fill="#64748b">逐步替换：v1 → v2 → v1 → v1 → v1  最终全部变为 v2</text>

      <text x="400" y="320" textAnchor="middle" fontSize="11" fill="#475569">配合健康检查（readiness probe）确保新实例就绪后接流量，零停机</text>

      {/* 选型矩阵 */}
      <text x="400" y="350" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">部署模式选型矩阵</text>

      <rect x="40" y="365" width="720" height="185" rx="10" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />

      <text x="130" y="390" textAnchor="middle" fontSize="11" fontWeight="700" fill="#334155">维度</text>
      <text x="250" y="390" textAnchor="middle" fontSize="11" fontWeight="700" fill="#991b1b">单主机多服务</text>
      <text x="370" y="390" textAnchor="middle" fontSize="11" fontWeight="700" fill="#92400e">单主机单服务</text>
      <text x="490" y="390" textAnchor="middle" fontSize="11" fontWeight="700" fill="#1d4ed8">容器化</text>
      <text x="640" y="390" textAnchor="middle" fontSize="11" fontWeight="700" fill="#6d28d9">Serverless</text>
      <line x1="50" y1="397" x2="750" y2="397" stroke="#cbd5e1" strokeWidth="1" />

      <text x="130" y="418" textAnchor="middle" fontSize="11" fill="#475569">隔离性</text>
      <text x="250" y="418" textAnchor="middle" fontSize="11" fill="#dc2626">差</text>
      <text x="370" y="418" textAnchor="middle" fontSize="11" fill="#78350f">好</text>
      <text x="490" y="418" textAnchor="middle" fontSize="11" fill="#1e40af">中</text>
      <text x="640" y="418" textAnchor="middle" fontSize="11" fill="#6d28d9">好</text>

      <text x="130" y="440" textAnchor="middle" fontSize="11" fill="#475569">资源利用率</text>
      <text x="250" y="440" textAnchor="middle" fontSize="11" fill="#065f46">高</text>
      <text x="370" y="440" textAnchor="middle" fontSize="11" fill="#dc2626">低</text>
      <text x="490" y="440" textAnchor="middle" fontSize="11" fill="#065f46">高</text>
      <text x="640" y="440" textAnchor="middle" fontSize="11" fill="#065f46">高</text>

      <text x="130" y="462" textAnchor="middle" fontSize="11" fill="#475569">运维复杂度</text>
      <text x="250" y="462" textAnchor="middle" fontSize="11" fill="#065f46">低</text>
      <text x="370" y="462" textAnchor="middle" fontSize="11" fill="#78350f">中</text>
      <text x="490" y="462" textAnchor="middle" fontSize="11" fill="#dc2626">高</text>
      <text x="640" y="462" textAnchor="middle" fontSize="11" fill="#065f46">极低</text>

      <text x="130" y="484" textAnchor="middle" fontSize="11" fill="#475569">弹性</text>
      <text x="250" y="484" textAnchor="middle" fontSize="11" fill="#dc2626">无</text>
      <text x="370" y="484" textAnchor="middle" fontSize="11" fill="#78350f">手动</text>
      <text x="490" y="484" textAnchor="middle" fontSize="11" fill="#065f46">自动</text>
      <text x="640" y="484" textAnchor="middle" fontSize="11" fill="#065f46">自动到零</text>

      <text x="130" y="506" textAnchor="middle" fontSize="11" fill="#475569">适合场景</text>
      <text x="250" y="506" textAnchor="middle" fontSize="11" fill="#78350f">小规模起步</text>
      <text x="370" y="506" textAnchor="middle" fontSize="11" fill="#78350f">简单场景</text>
      <text x="490" y="506" textAnchor="middle" fontSize="11" fill="#1e40af">主流选择</text>
      <text x="640" y="506" textAnchor="middle" fontSize="11" fill="#6d28d9">事件驱动</text>

      <text x="400" y="535" textAnchor="middle" fontSize="11" fill="#92400e">趋势：容器化是大多数微服务的最优选择 / Serverless适合事件驱动和无状态 / 混合部署也是合理选择</text>
    </svg>
  );
}
