"use client";

export function RmqPerformanceTuningDiagram() {
  return (
    <svg viewBox="0 0 800 540" className="w-full h-auto" role="img" aria-label="RabbitMQ性能调优体系">
      <defs>
        <linearGradient id="rmq-pf-prod" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0891b2" />
          <stop offset="100%" stopColor="#0e7490" />
        </linearGradient>
        <linearGradient id="rmq-pf-broker" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="rmq-pf-cons" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <marker id="rmq-pf-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#475569" />
        </marker>
      </defs>

      <text x="400" y="28" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">RabbitMQ 性能调优三大维度</text>

      {/* 生产者优化 */}
      <rect x="20" y="50" width="240" height="240" rx="10" fill="url(#rmq-pf-prod)" opacity="0.95" />
      <text x="140" y="75" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">生产者优化</text>
      <line x1="35" y1="85" x2="245" y2="85" stroke="#fff" strokeWidth="1" opacity="0.4" />
      <text x="140" y="108" textAnchor="middle" fontSize="11" fill="#cffafe">连接池复用</text>
      <text x="140" y="126" textAnchor="middle" fontSize="10" fill="#a5f3fc">避免频繁建连/断连</text>
      <text x="140" y="150" textAnchor="middle" fontSize="11" fill="#cffafe">Channel 复用</text>
      <text x="140" y="168" textAnchor="middle" fontSize="10" fill="#a5f3fc">单 Connection 多 Channel</text>
      <text x="140" y="192" textAnchor="middle" fontSize="11" fill="#cffafe">异步 Confirm 替代事务</text>
      <text x="140" y="210" textAnchor="middle" fontSize="10" fill="#a5f3fc">事务性能差 250x</text>
      <text x="140" y="234" textAnchor="middle" fontSize="11" fill="#cffafe">批量发送</text>
      <text x="140" y="252" textAnchor="middle" fontSize="10" fill="#a5f3fc">合并小消息减少 RTT</text>
      <text x="140" y="276" textAnchor="middle" fontSize="10" fill="#67e8f9">delivery_mode=2 持久化</text>

      {/* Broker 优化 */}
      <rect x="280" y="50" width="240" height="240" rx="10" fill="url(#rmq-pf-broker)" opacity="0.95" />
      <text x="400" y="75" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">Broker 优化</text>
      <line x1="295" y1="85" x2="505" y2="85" stroke="#fff" strokeWidth="1" opacity="0.4" />
      <text x="400" y="108" textAnchor="middle" fontSize="11" fill="#fef3c7">Erlang VM 调优</text>
      <text x="400" y="126" textAnchor="middle" fontSize="10" fill="#fde68a">scheduler / S + sd</text>
      <text x="400" y="150" textAnchor="middle" fontSize="11" fill="#fef3c7">内存水位控制</text>
      <text x="400" y="168" textAnchor="middle" fontSize="10" fill="#fde68a">vm_memory_high_watermark</text>
      <text x="400" y="192" textAnchor="middle" fontSize="11" fill="#fef3c7">磁盘空间告警</text>
      <text x="400" y="210" textAnchor="middle" fontSize="10" fill="#fde68a">disk_free_limit</text>
      <text x="400" y="234" textAnchor="middle" fontSize="11" fill="#fef3c7">文件描述符</text>
      <text x="400" y="252" textAnchor="middle" fontSize="10" fill="#fde68a">max_open_files / ulimit</text>
      <text x="400" y="276" textAnchor="middle" fontSize="10" fill="#fcd34d">flow control 流控机制</text>

      {/* 消费者优化 */}
      <rect x="540" y="50" width="240" height="240" rx="10" fill="url(#rmq-pf-cons)" opacity="0.95" />
      <text x="660" y="75" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">消费者优化</text>
      <line x1="555" y1="85" x2="765" y2="85" stroke="#fff" strokeWidth="1" opacity="0.4" />
      <text x="660" y="108" textAnchor="middle" fontSize="11" fill="#ede9fe">prefetch_count 调优</text>
      <text x="660" y="126" textAnchor="middle" fontSize="10" fill="#ddd6fe">太小 → 空闲等待</text>
      <text x="660" y="150" textAnchor="middle" fontSize="11" fill="#ede9fe">多线程消费</text>
      <text x="660" y="168" textAnchor="middle" fontSize="10" fill="#ddd6fe">合理并行度</text>
      <text x="660" y="192" textAnchor="middle" fontSize="11" fill="#ede9fe">手动 Ack 批量化</text>
      <text x="660" y="210" textAnchor="middle" fontSize="10" fill="#ddd6fe">multiple=true 批量确认</text>
      <text x="660" y="234" textAnchor="middle" fontSize="11" fill="#ede9fe">消费幂等性</text>
      <text x="660" y="252" textAnchor="middle" fontSize="10" fill="#ddd6fe">减少重复处理开销</text>
      <text x="660" y="276" textAnchor="middle" fontSize="10" fill="#c4b5fd">autoAck=false 手动确认</text>

      {/* 调优参数 */}
      <rect x="20" y="310" width="760" height="210" rx="10" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="400" y="335" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">关键调优参数速查</text>
      <text x="180" y="362" textAnchor="middle" fontSize="11" fill="#475569" fontWeight="600">Erlang VM 参数</text>
      <text x="180" y="382" textAnchor="middle" fontSize="10" fill="#64748b">RABBITMQ_SERVER_ADDITIONAL_ERL_ARGS</text>
      <text x="180" y="400" textAnchor="middle" fontSize="10" fill="#64748b">+sbwt none +sbwtdcpu none</text>
      <text x="180" y="418" textAnchor="middle" fontSize="10" fill="#64748b">+S 核心数 +sd 调度器数</text>
      <text x="180" y="436" textAnchor="middle" fontSize="10" fill="#64748b">+A 线程池（异步IO线程）</text>
      <text x="400" y="362" textAnchor="middle" fontSize="11" fill="#475569" fontWeight="600">内存与磁盘</text>
      <text x="400" y="382" textAnchor="middle" fontSize="10" fill="#64748b">vm_memory_high_watermark: 0.4</text>
      <text x="400" y="400" textAnchor="middle" fontSize="10" fill="#64748b">disk_free_limit: 2GB 或 RAM*0.5</text>
      <text x="400" y="418" textAnchor="middle" fontSize="10" fill="#64748b">page_cache: 操作系统页缓存</text>
      <text x="400" y="436" textAnchor="middle" fontSize="10" fill="#64748b">queue_index_embed_msgs_below: 4096</text>
      <text x="620" y="362" textAnchor="middle" fontSize="11" fill="#475569" fontWeight="600">网络与连接</text>
      <text x="620" y="382" textAnchor="middle" fontSize="10" fill="#64748b">heartbeat: 60s（防僵尸连接）</text>
      <text x="620" y="400" textAnchor="middle" fontSize="10" fill="#64748b">connection_max: 连接数上限</text>
      <text x="620" y="418" textAnchor="middle" fontSize="10" fill="#64748b">channel_max: Channel 数上限</text>
      <text x="620" y="436" textAnchor="middle" fontSize="10" fill="#64748b">TCP: tcp_nodelay=true 减少延迟</text>
      <text x="400" y="465" textAnchor="middle" fontSize="11" fill="#475569">核心原则：生产者用异步 Confirm + 连接池 | Broker 调内存/磁盘/VM | 消费者调 prefetch + 批量 Ack</text>
      <text x="400" y="485" textAnchor="middle" fontSize="11" fill="#475569">持久化权衡：delivery_mode=2 + durable queue → 数据安全但性能下降，按业务可靠性需求选择</text>
      <text x="400" y="505" textAnchor="middle" fontSize="11" fill="#475569">Lazy Queue：消息直接写磁盘，内存只存索引，适用于百万级积压队列</text>
    </svg>
  );
}
