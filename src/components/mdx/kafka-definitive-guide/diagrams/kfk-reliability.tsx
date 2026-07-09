"use client";

export function KfkReliabilityDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="Kafka可靠性与ISR机制">
      <defs>
        <linearGradient id="kfk-rl-leader" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="kfk-rl-follower" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0891b2" />
          <stop offset="100%" stopColor="#0e7490" />
        </linearGradient>
        <linearGradient id="kfk-rl-isr" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
        <marker id="kfk-rl-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="28" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">Kafka 副本机制 · ISR · HW/LEO</text>

      {/* Partition 副本分布 */}
      <text x="400" y="55" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">Partition 0 的副本分布（replication.factor=3）</text>

      {/* Leader */}
      <rect x="60" y="70" width="200" height="120" rx="10" fill="url(#kfk-rl-leader)" />
      <text x="160" y="95" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">Broker 1 · Leader</text>
      <line x1="75" y1="105" x2="245" y2="105" stroke="#fff" strokeWidth="1" opacity="0.4" />
      <text x="160" y="128" textAnchor="middle" fontSize="10" fill="#bfdbfe">读写入口（处理客户端请求）</text>
      <rect x="80" y="140" width="160" height="40" rx="4" fill="#1e40af" />
      <text x="160" y="158" textAnchor="middle" fontSize="9" fill="#bfdbfe">LEO = 8（日志末尾）</text>
      <text x="160" y="172" textAnchor="middle" fontSize="9" fill="#bfdbfe">HW = 6（高水位）</text>

      {/* Follower (ISR) */}
      <rect x="300" y="70" width="200" height="120" rx="10" fill="url(#kfk-rl-follower)" />
      <text x="400" y="95" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">Broker 2 · Follower</text>
      <line x1="315" y1="105" x2="485" y2="105" stroke="#fff" strokeWidth="1" opacity="0.4" />
      <text x="400" y="128" textAnchor="middle" fontSize="10" fill="#cffafe">在 ISR 中（已同步）</text>
      <rect x="320" y="140" width="160" height="40" rx="4" fill="#0e7490" />
      <text x="400" y="158" textAnchor="middle" fontSize="9" fill="#cffafe">LEO = 7（追赶中）</text>
      <text x="400" y="172" textAnchor="middle" fontSize="9" fill="#cffafe">HW = 6（与Leader一致）</text>

      {/* Follower (non-ISR) */}
      <rect x="540" y="70" width="200" height="120" rx="10" fill="#64748b" opacity="0.6" />
      <text x="640" y="95" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">Broker 3 · Follower</text>
      <line x1="555" y1="105" x2="725" y2="105" stroke="#fff" strokeWidth="1" opacity="0.4" />
      <text x="640" y="128" textAnchor="middle" fontSize="10" fill="#e2e8f0">不在 ISR 中（滞后）</text>
      <rect x="560" y="140" width="160" height="40" rx="4" fill="#475569" />
      <text x="640" y="158" textAnchor="middle" fontSize="9" fill="#e2e8f0">LEO = 3（严重滞后）</text>
      <text x="640" y="172" textAnchor="middle" fontSize="9" fill="#e2e8f0">超过 lag.time.max.ms</text>

      {/* Fetch arrows */}
      <path d="M300 130 L260 130" stroke="#0891b2" strokeWidth="2" markerEnd="url(#kfk-rl-arrow)" />
      <path d="M540 130 L260 130" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="4,3" markerEnd="url(#kfk-rl-arrow)" />
      <text x="280" y="122" textAnchor="middle" fontSize="8" fill="#0e7490">Fetch</text>
      <text x="400" y="122" textAnchor="middle" fontSize="8" fill="#64748b">Fetch（滞后）</text>

      {/* ISR 集合 */}
      <rect x="60" y="210" width="680" height="50" rx="8" fill="#d1fae5" stroke="#10b981" strokeWidth="2" />
      <text x="400" y="232" textAnchor="middle" fontSize="12" fontWeight="700" fill="#065f46">ISR（In-Sync Replicas）= {`{Broker1(Leader), Broker2}`}</text>
      <text x="400" y="250" textAnchor="middle" fontSize="9" fill="#047857">与 Leader 保持同步的副本集合 · 滞后超过 replica.lag.time.max.ms 则被踢出 · Leader 从 ISR 中选举</text>

      {/* HW / LEO 图解 */}
      <text x="400" y="290" textAnchor="middle" fontSize="14" fontWeight="700" fill="#0f172a">HW 与 LEO 的关系（消费者可见性）</text>

      <rect x="60" y="305" width="680" height="80" rx="8" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="80" y="328" fontSize="11" fill="#1e40af" fontWeight="600">Offset:</text>
      <text x="145" y="328" fontSize="10" fill="#475569">0</text>
      <text x="195" y="328" fontSize="10" fill="#475569">1</text>
      <text x="245" y="328" fontSize="10" fill="#475569">2</text>
      <text x="295" y="328" fontSize="10" fill="#475569">3</text>
      <text x="345" y="328" fontSize="10" fill="#475569">4</text>
      <text x="395" y="328" fontSize="10" fill="#475569">5</text>
      <line x1="420" y1="318" x2="420" y2="355" stroke="#10b981" strokeWidth="2" strokeDasharray="3,2" />
      <text x="455" y="328" fontSize="10" fill="#dc2626">6</text>
      <text x="505" y="328" fontSize="10" fill="#dc2626">7</text>
      <text x="555" y="328" fontSize="10" fill="#dc2626">8</text>
      <text x="440" y="315" fontSize="9" fill="#10b981" fontWeight="700">← HW = 6</text>
      <text x="600" y="315" fontSize="9" fill="#dc2626" fontWeight="700">LEO = 8 →</text>

      <text x="80" y="355" fontSize="10" fill="#065f46" fontWeight="600">消费者可读</text>
      <rect x="145" y="342" width="275" height="18" rx="3" fill="#d1fae5" stroke="#10b981" strokeWidth="1" />
      <text x="282" y="355" textAnchor="middle" fontSize="9" fill="#065f46">HW 以下：消费者可见</text>
      <text x="440" y="355" fontSize="10" fill="#dc2626" fontWeight="600">消费者不可读</text>
      <rect x="555" y="342" width="110" height="18" rx="3" fill="#fee2e2" stroke="#dc2626" strokeWidth="1" />
      <text x="610" y="355" textAnchor="middle" fontSize="9" fill="#991b1b">HW 以上：不可见</text>

      <text x="80" y="375" fontSize="9" fill="#64748b">HW = min(所有ISR副本的LEO) · 保证Leader切换时消费者不会看到「消失」的消息</text>

      {/* 可靠性配置 */}
      <text x="400" y="415" textAnchor="middle" fontSize="14" fontWeight="700" fill="#0f172a">生产环境推荐可靠性配置</text>

      <rect x="30" y="430" width="740" height="140" rx="10" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="400" y="453" textAnchor="middle" fontSize="12" fontWeight="700" fill="#334155">高可靠配置组合（不丢数据）</text>

      <rect x="50" y="465" width="220" height="90" rx="6" fill="#dbeafe" stroke="#2563eb" strokeWidth="1" />
      <text x="160" y="485" textAnchor="middle" fontSize="11" fontWeight="700" fill="#1d4ed8">生产者端</text>
      <text x="60" y="506" fontSize="9" fill="#1e40af">acks = all</text>
      <text x="60" y="522" fontSize="9" fill="#1e40af">enable.idempotence = true</text>
      <text x="60" y="538" fontSize="9" fill="#1e40af">retries = MAX_VALUE</text>
      <text x="60" y="554" fontSize="9" fill="#1e40af">max.in.flight ≤ 5</text>

      <rect x="290" y="465" width="220" height="90" rx="6" fill="#d1fae5" stroke="#10b981" strokeWidth="1" />
      <text x="400" y="485" textAnchor="middle" fontSize="11" fontWeight="700" fill="#065f46">Broker 端</text>
      <text x="300" y="506" fontSize="9" fill="#047857">replication.factor = 3</text>
      <text x="300" y="522" fontSize="9" fill="#047857">min.insync.replicas = 2</text>
      <text x="300" y="538" fontSize="9" fill="#047857">unclean.leader.election = false</text>
      <text x="300" y="554" fontSize="9" fill="#047857">replica.lag.time.max.ms = 30s</text>

      <rect x="530" y="465" width="220" height="90" rx="6" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1" />
      <text x="640" y="485" textAnchor="middle" fontSize="11" fontWeight="700" fill="#92400e">消费者端</text>
      <text x="540" y="506" fontSize="9" fill="#78350f">enable.auto.commit = false</text>
      <text x="540" y="522" fontSize="9" fill="#78350f">手动 commitSync 提交</text>
      <text x="540" y="538" fontSize="9" fill="#78350f">isolation.level = read_committed</text>
      <text x="540" y="554" fontSize="9" fill="#78350f">幂等消费（业务去重）</text>
    </svg>
  );
}
