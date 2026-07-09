"use client";

export function RmqHighAvailabilityDiagram() {
  return (
    <svg viewBox="0 0 800 540" className="w-full h-auto" role="img" aria-label="RabbitMQ高可用与Federation架构">
      <defs>
        <linearGradient id="rmq-ha-fail" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="rmq-ha-fed" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0891b2" />
          <stop offset="100%" stopColor="#0e7490" />
        </linearGradient>
        <linearGradient id="rmq-ha-shovel" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <marker id="rmq-ha-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#475569" />
        </marker>
      </defs>

      <text x="400" y="28" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">高可用方案：故障切换 / Federation / Shovel</text>

      {/* 故障切换 */}
      <rect x="20" y="50" width="760" height="140" rx="10" fill="url(#rmq-ha-fail)" opacity="0.95" />
      <text x="400" y="75" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">镜像队列故障切换流程</text>
      <line x1="35" y1="85" x2="765" y2="85" stroke="#fff" strokeWidth="1" opacity="0.4" />

      <rect x="50" y="100" width="120" height="70" rx="6" fill="#fef3c7" stroke="#d97706" strokeWidth="1" />
      <text x="110" y="122" textAnchor="middle" fontSize="11" fontWeight="600" fill="#92400e">1. Master 正常</text>
      <text x="110" y="140" textAnchor="middle" fontSize="9" fill="#78350f">Node A 处理读写</text>
      <text x="110" y="158" textAnchor="middle" fontSize="9" fill="#78350f">同步到 Slave</text>

      <rect x="200" y="100" width="120" height="70" rx="6" fill="#fef3c7" stroke="#d97706" strokeWidth="1" />
      <text x="260" y="122" textAnchor="middle" fontSize="11" fontWeight="600" fill="#92400e">2. Master 宕机</text>
      <text x="260" y="140" textAnchor="middle" fontSize="9" fill="#78350f">Node A 不可用</text>
      <text x="260" y="158" textAnchor="middle" fontSize="9" fill="#78350f">检测到故障</text>

      <rect x="350" y="100" width="120" height="70" rx="6" fill="#fef3c7" stroke="#d97706" strokeWidth="1" />
      <text x="410" y="122" textAnchor="middle" fontSize="11" fontWeight="600" fill="#92400e">3. 选举新 Master</text>
      <text x="410" y="140" textAnchor="middle" fontSize="9" fill="#78350f">最旧的 Slave 升主</text>
      <text x="410" y="158" textAnchor="middle" fontSize="9" fill="#78350f"> promoted-to-master</text>

      <rect x="500" y="100" width="120" height="70" rx="6" fill="#fef3c7" stroke="#d97706" strokeWidth="1" />
      <text x="560" y="122" textAnchor="middle" fontSize="11" fontWeight="600" fill="#92400e">4. 恢复服务</text>
      <text x="560" y="140" textAnchor="middle" fontSize="9" fill="#78350f">Node B 成为新 Master</text>
      <text x="560" y="158" textAnchor="middle" fontSize="9" fill="#78350f">客户端自动重连</text>

      <rect x="650" y="100" width="120" height="70" rx="6" fill="#fef3c7" stroke="#d97706" strokeWidth="1" />
      <text x="710" y="122" textAnchor="middle" fontSize="11" fontWeight="600" fill="#92400e">5. 脑裂检测</text>
      <text x="710" y="140" textAnchor="middle" fontSize="9" fill="#78350f">pause-minority 策略</text>
      <text x="710" y="158" textAnchor="middle" fontSize="9" fill="#78350f">少数派暂停</text>

      <path d="M170 135 L200 135" stroke="#475569" strokeWidth="1.5" markerEnd="url(#rmq-ha-arrow)" />
      <path d="M320 135 L350 135" stroke="#475569" strokeWidth="1.5" markerEnd="url(#rmq-ha-arrow)" />
      <path d="M470 135 L500 135" stroke="#475569" strokeWidth="1.5" markerEnd="url(#rmq-ha-arrow)" />
      <path d="M620 135 L650 135" stroke="#475569" strokeWidth="1.5" markerEnd="url(#rmq-ha-arrow)" />

      {/* Federation */}
      <rect x="20" y="210" width="370" height="170" rx="10" fill="url(#rmq-ha-fed)" opacity="0.95" />
      <text x="205" y="235" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">Federation（联邦）</text>
      <line x1="35" y1="245" x2="375" y2="245" stroke="#fff" strokeWidth="1" opacity="0.4" />
      <text x="205" y="268" textAnchor="middle" fontSize="11" fill="#cffafe">跨集群消息联邦，松耦合连接</text>
      <text x="205" y="290" textAnchor="middle" fontSize="10" fill="#a5f3fc">上游 Broker → 下游 Broker</text>
      <text x="205" y="310" textAnchor="middle" fontSize="10" fill="#a5f3fc">通过 AMQP 连接单向复制</text>
      <text x="205" y="332" textAnchor="middle" fontSize="10" fill="#a5f3fc">Exchange Federation：路由信息联邦</text>
      <text x="205" y="352" textAnchor="middle" fontSize="10" fill="#a5f3fc">Queue Federation：队列消息联邦</text>
      <text x="205" y="372" textAnchor="middle" fontSize="10" fill="#67e8f9">适用：跨机房 / WAN / 多区域消息同步</text>

      {/* Shovel */}
      <rect x="410" y="210" width="370" height="170" rx="10" fill="url(#rmq-ha-shovel)" opacity="0.95" />
      <text x="595" y="235" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">Shovel（ shovel 插件）</text>
      <line x1="425" y1="245" x2="765" y2="245" stroke="#fff" strokeWidth="1" opacity="0.4" />
      <text x="595" y="268" textAnchor="middle" fontSize="11" fill="#ede9fe">点对点消息搬运，更灵活</text>
      <text x="595" y="290" textAnchor="middle" fontSize="10" fill="#ddd6fe">从源 Queue 消费 → 发布到目标 Exchange</text>
      <text x="595" y="310" textAnchor="middle" fontSize="10" fill="#ddd6fe">可跨集群、跨协议（AMQP↔STOMP）</text>
      <text x="595" y="332" textAnchor="middle" fontSize="10" fill="#ddd6fe">支持消息过滤和转换</text>
      <text x="595" y="352" textAnchor="middle" fontSize="10" fill="#ddd6fe">配置式 / 动态式两种模式</text>
      <text x="595" y="372" textAnchor="middle" fontSize="10" fill="#c4b5fd">适用：精确搬运 / 灾备 / 协议转换</text>

      {/* HA 方案对比 */}
      <rect x="20" y="400" width="760" height="120" rx="10" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="400" y="425" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">高可用方案选择</text>
      <text x="400" y="450" textAnchor="middle" fontSize="11" fill="#475569">单机高可用 → Quorum Queue（Raft 共识，无脑裂，数据安全）</text>
      <text x="400" y="470" textAnchor="middle" fontSize="11" fill="#475569">集群内高可用 → Classic 镜像队列（Master-Slave，需配脑裂策略）</text>
      <text x="400" y="490" textAnchor="middle" fontSize="11" fill="#475569">跨集群高可用 → Federation（松耦合联邦，WAN 场景）或 Shovel（精确搬运）</text>
      <text x="400" y="510" textAnchor="middle" fontSize="11" fill="#475569">脑裂防护 → pause-minority / pause_if_all_down / ignore（不推荐）</text>
    </svg>
  );
}
