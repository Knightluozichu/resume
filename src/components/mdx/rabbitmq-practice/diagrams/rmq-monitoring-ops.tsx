"use client";

export function RmqMonitoringOpsDiagram() {
  return (
    <svg viewBox="0 0 800 540" className="w-full h-auto" role="img" aria-label="RabbitMQ监控与运维体系">
      <defs>
        <linearGradient id="rmq-mo-mgmt" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="rmq-mo-metrics" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0891b2" />
          <stop offset="100%" stopColor="#0e7490" />
        </linearGradient>
        <linearGradient id="rmq-mo-alert" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="rmq-mo-sec" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <marker id="rmq-mo-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#475569" />
        </marker>
      </defs>

      <text x="400" y="28" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">RabbitMQ 监控与运维体系</text>

      {/* Management API */}
      <rect x="20" y="50" width="370" height="170" rx="10" fill="url(#rmq-mo-mgmt)" opacity="0.95" />
      <text x="205" y="75" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">Management Plugin（管理插件）</text>
      <line x1="35" y1="85" x2="375" y2="85" stroke="#fff" strokeWidth="1" opacity="0.4" />
      <text x="205" y="108" textAnchor="middle" fontSize="11" fill="#bfdbfe">HTTP API: localhost:15672/api/</text>
      <text x="205" y="128" textAnchor="middle" fontSize="10" fill="#93c5fd">GET /api/overview → 集群总览</text>
      <text x="205" y="146" textAnchor="middle" fontSize="10" fill="#93c5fd">GET /api/queues → 队列列表与状态</text>
      <text x="205" y="164" textAnchor="middle" fontSize="10" fill="#93c5fd">GET /api/connections → 连接监控</text>
      <text x="205" y="182" textAnchor="middle" fontSize="10" fill="#93c5fd">GET /api/nodes → 节点健康</text>
      <text x="205" y="200" textAnchor="middle" fontSize="10" fill="#93c5fd">Web UI 可视化界面 + CLI: rabbitmqctl</text>

      {/* 核心指标 */}
      <rect x="410" y="50" width="370" height="170" rx="10" fill="url(#rmq-mo-metrics)" opacity="0.95" />
      <text x="595" y="75" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">核心监控指标</text>
      <line x1="425" y1="85" x2="765" y2="85" stroke="#fff" strokeWidth="1" opacity="0.4" />
      <text x="595" y="108" textAnchor="middle" fontSize="11" fill="#cffafe">queue_depth → 队列积压消息数</text>
      <text x="595" y="128" textAnchor="middle" fontSize="10" fill="#a5f3fc">publish_rate / deliver_rate → 吞吐</text>
      <text x="595" y="146" textAnchor="middle" fontSize="10" fill="#a5f3fc">connections / channels → 连接数</text>
      <text x="595" y="164" textAnchor="middle" fontSize="10" fill="#a5f3fc">mem_used / disk_free → 资源</text>
      <text x="595" y="182" textAnchor="middle" fontSize="10" fill="#a5f3fc">ack_rate / nack_rate → 消费确认</text>
      <text x="595" y="200" textAnchor="middle" fontSize="10" fill="#67e8f9">unacked_count → 未确认消息数</text>

      {/* 告警策略 */}
      <rect x="20" y="240" width="370" height="150" rx="10" fill="url(#rmq-mo-alert)" opacity="0.95" />
      <text x="205" y="265" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">告警策略</text>
      <line x1="35" y1="275" x2="375" y2="275" stroke="#fff" strokeWidth="1" opacity="0.4" />
      <text x="205" y="298" textAnchor="middle" fontSize="11" fill="#fef3c7">queue_depth &gt; 10000 → 队列积压告警</text>
      <text x="205" y="318" textAnchor="middle" fontSize="10" fill="#fde68a">mem_used &gt; 80% → 内存水位告警</text>
      <text x="205" y="338" textAnchor="middle" fontSize="10" fill="#fde68a">disk_free &lt; 2GB → 磁盘告警</text>
      <text x="205" y="358" textAnchor="middle" fontSize="10" fill="#fde68a">connections 突增/骤降 → 连接异常</text>
      <text x="205" y="378" textAnchor="middle" fontSize="10" fill="#fcd34d">node_down → 节点宕机紧急告警</text>

      {/* 安全与备份 */}
      <rect x="410" y="240" width="370" height="150" rx="10" fill="url(#rmq-mo-sec)" opacity="0.95" />
      <text x="595" y="265" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">安全与备份</text>
      <line x1="425" y1="275" x2="765" y2="275" stroke="#fff" strokeWidth="1" opacity="0.4" />
      <text x="595" y="298" textAnchor="middle" fontSize="11" fill="#ede9fe">TLS 加密通信（SSL/TLS）</text>
      <text x="595" y="318" textAnchor="middle" fontSize="10" fill="#ddd6fe">用户认证 + VHost 权限隔离</text>
      <text x="595" y="338" textAnchor="middle" fontSize="10" fill="#ddd6fe">定义导出/导入（definitions.json）</text>
      <text x="595" y="358" textAnchor="middle" fontSize="10" fill="#ddd6fe">消息备份：Lazy Queue + 定期快照</text>
      <text x="595" y="378" textAnchor="middle" fontSize="10" fill="#c4b5fd">审计日志 + 访问控制（ACL）</text>

      {/* 运维操作 */}
      <rect x="20" y="410" width="760" height="110" rx="10" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="400" y="435" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">常用运维命令</text>
      <text x="400" y="460" textAnchor="middle" fontSize="11" fill="#475569">rabbitmqctl status → 节点状态 | rabbitmqctl cluster_status → 集群状态</text>
      <text x="400" y="480" textAnchor="middle" fontSize="11" fill="#475569">rabbitmqctl list_queues name messages consumers → 队列状态</text>
      <text x="400" y="500" textAnchor="middle" fontSize="11" fill="#475569">rabbitmqctl set_policy ha-all "^" "{""ha-mode"":""all""}" → 镜像策略</text>
    </svg>
  );
}
