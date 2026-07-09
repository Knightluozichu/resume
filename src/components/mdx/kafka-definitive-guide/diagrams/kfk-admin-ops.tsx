"use client";

export function KfkAdminOpsDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="Kafka管理与运维">
      <defs>
        <linearGradient id="kfk-ad-mon" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="kfk-ad-sec" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <marker id="kfk-ad-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="28" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">Kafka 管理与运维 · 监控 · 安全</text>

      {/* 主题管理 */}
      <text x="400" y="55" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">主题管理核心命令</text>
      <rect x="30" y="65" width="740" height="55" rx="8" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="50" y="85" fontSize="9" fill="#1e40af" fontFamily="monospace">kafka-topics.sh --create --topic my-topic --partitions 6 --replication-factor 3 --config retention.ms=86400000</text>
      <text x="50" y="103" fontSize="9" fill="#1e40af" fontFamily="monospace">kafka-topics.sh --describe --topic my-topic  # 查看Leader/AR/ISR</text>
      <text x="50" y="115" fontSize="9" fill="#1e40af" fontFamily="monospace">kafka-topics.sh --alter --topic my-topic --partitions 12  # 增加分区（只增不减）</text>

      {/* 监控指标 */}
      <text x="400" y="148" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">核心监控指标</text>

      <rect x="30" y="160" width="370" height="160" rx="10" fill="#dbeafe" stroke="#2563eb" strokeWidth="1.5" />
      <text x="215" y="183" textAnchor="middle" fontSize="12" fontWeight="700" fill="#1d4ed8">Broker 级指标</text>
      <text x="50" y="207" fontSize="10" fill="#1e40af">UnderReplicatedPartitions = 0（欠副本）</text>
      <text x="50" y="225" fontSize="10" fill="#1e40af">ActiveControllerCount = 1（控制器数）</text>
      <text x="50" y="243" fontSize="10" fill="#1e40af">OfflinePartitionsCount = 0（离线分区）</text>
      <text x="50" y="261" fontSize="10" fill="#1e40af">BytesInPerSec / BytesOutPerSec（吞吐）</text>
      <text x="50" y="279" fontSize="10" fill="#1e40af">RequestHandlerAvgIdlePercent（IO空闲）</text>
      <text x="50" y="297" fontSize="10" fill="#1e40af">NetworkProcessorAvgIdlePercent（网络空闲）</text>
      <text x="50" y="315" fontSize="9" fill="#dc2626">异常值：URP &gt; 0 / Offline &gt; 0 / 空闲率 &lt; 30%</text>

      <rect x="420" y="160" width="350" height="160" rx="10" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="595" y="183" textAnchor="middle" fontSize="12" fontWeight="700" fill="#92400e">Consumer 级指标</text>
      <text x="440" y="207" fontSize="10" fill="#78350f">records-lag-max（最大消费滞后）</text>
      <text x="440" y="225" fontSize="10" fill="#78350f">records-consumed-rate（消费速率）</text>
      <text x="440" y="243" fontSize="10" fill="#78350f">commit-latency-avg（Offset提交延迟）</text>
      <text x="440" y="261" fontSize="10" fill="#78350f">rebalance-rate-per-hour（再均衡频率）</text>
      <text x="440" y="279" fontSize="10" fill="#78350f">records-error-rate（错误率 = 0）</text>
      <text x="440" y="297" fontSize="10" fill="#78350f">request-latency-avg（请求延迟）</text>
      <text x="440" y="315" fontSize="9" fill="#dc2626">异常值：lag 持续增长 / 频繁再均衡</text>

      {/* 安全机制 */}
      <text x="400" y="350" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">安全三要素</text>

      <rect x="30" y="362" width="240" height="100" rx="10" fill="url(#kfk-ad-mon)" opacity="0.9" />
      <text x="150" y="385" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">认证（Authentication）</text>
      <line x1="45" y1="395" x2="255" y2="395" stroke="#fff" strokeWidth="1" opacity="0.4" />
      <text x="150" y="415" textAnchor="middle" fontSize="10" fill="#bfdbfe">SASL/SCRAM（推荐）</text>
      <text x="150" y="433" textAnchor="middle" fontSize="10" fill="#bfdbfe">SASL/PLAIN（需SSL）</text>
      <text x="150" y="451" textAnchor="middle" fontSize="10" fill="#bfdbfe">SASL/GSSAPI（Kerberos）</text>

      <rect x="285" y="362" width="240" height="100" rx="10" fill="url(#kfk-ad-sec)" opacity="0.9" />
      <text x="405" y="385" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">授权（Authorization）</text>
      <line x1="300" y1="395" x2="510" y2="395" stroke="#fff" strokeWidth="1" opacity="0.4" />
      <text x="405" y="415" textAnchor="middle" fontSize="10" fill="#ddd6fe">ACL 细粒度控制</text>
      <text x="405" y="433" textAnchor="middle" fontSize="10" fill="#ddd6fe">Read/Write/Create</text>
      <text x="405" y="451" textAnchor="middle" fontSize="10" fill="#ddd6fe">Delete/Alter/Describe</text>

      <rect x="540" y="362" width="230" height="100" rx="10" fill="#10b981" opacity="0.9" />
      <text x="655" y="385" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">加密（Encryption）</text>
      <line x1="555" y1="395" x2="765" y2="395" stroke="#fff" strokeWidth="1" opacity="0.4" />
      <text x="655" y="415" textAnchor="middle" fontSize="10" fill="#d1fae5">SSL/TLS 传输加密</text>
      <text x="655" y="433" textAnchor="middle" fontSize="10" fill="#d1fae5">客户端 ↔ Broker 加密</text>
      <text x="655" y="451" textAnchor="middle" fontSize="10" fill="#d1fae5">Broker ↔ Broker 加密</text>

      {/* 扩缩容 */}
      <text x="400" y="490" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">集群扩缩容流程</text>
      <rect x="30" y="500" width="740" height="70" rx="8" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="50" y="522" fontSize="10" fill="#1e40af" fontWeight="600">扩容：</text>
      <text x="105" y="522" fontSize="10" fill="#475569">新增Broker启动 → 注册ZK → 手动执行 reassign-partitions 迁移副本 → Preferred Leader选举</text>
      <text x="50" y="540" fontSize="10" fill="#1e40af" fontWeight="600">缩容：</text>
      <text x="105" y="540" fontSize="10" fill="#475569">生成缩容计划 → 迁移副本到其他Broker → verify确认 → controlled.shutdown 优雅停机</text>
      <text x="50" y="558" fontSize="10" fill="#dc2626" fontWeight="600">注意：</text>
      <text x="105" y="558" fontSize="10" fill="#475569">迁移期间设置限流（throttle）控制同步带宽 · 分批小步迁移 · 监控 URP 和延迟</text>
    </svg>
  );
}
