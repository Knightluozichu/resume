"use client";

export function RdiPubsubSentinelDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="Redis发布订阅与哨兵">
      <defs>
        <linearGradient id="rdi-ps-grad1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#dc382d" />
          <stop offset="100%" stopColor="#b91c1c" />
        </linearGradient>
        <linearGradient id="rdi-ps-grad2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0891b2" />
          <stop offset="100%" stopColor="#0e7490" />
        </linearGradient>
        <marker id="rdi-ps-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="28" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">Redis 发布订阅与哨兵</text>

      {/* 发布订阅模型 */}
      <rect x="20" y="50" width="760" height="200" rx="12" fill="url(#rdi-ps-grad1)" opacity="0.95" />
      <text x="400" y="75" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">发布订阅（Pub/Sub）</text>
      <line x1="40" y1="85" x2="760" y2="85" stroke="#fff" strokeWidth="1" opacity="0.4" />

      {/* 频道订阅 */}
      <rect x="50" y="100" width="200" height="50" rx="8" fill="#fecaca" stroke="#fff" strokeWidth="1" />
      <text x="150" y="130" textAnchor="middle" fontSize="11" fontWeight="700" fill="#991b1b">SUBSCRIBE channel</text>

      <rect x="290" y="95" width="120" height="60" rx="8" fill="#fca5a5" stroke="#fff" strokeWidth="1" />
      <text x="350" y="130" textAnchor="middle" fontSize="12" fontWeight="700" fill="#991b1b">频道 Channel</text>

      <path d="M250 125 L290 125" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#rdi-ps-arrow)" />

      <rect x="450" y="100" width="140" height="50" rx="8" fill="#fef3c7" stroke="#fff" strokeWidth="1" />
      <text x="520" y="130" textAnchor="middle" fontSize="11" fontWeight="700" fill="#92400e">PUBLISH channel msg</text>

      <path d="M410 125 L450 125" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#rdi-ps-arrow)" />

      <rect x="620" y="100" width="140" height="50" rx="8" fill="#fee2e2" stroke="#fff" strokeWidth="1" />
      <text x="690" y="130" textAnchor="middle" fontSize="11" fontWeight="700" fill="#b91c1c">所有订阅者收到</text>

      <path d="M590 125 L620 125" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#rdi-ps-arrow)" />

      <text x="150" y="170" textAnchor="middle" fontSize="9" fill="#fecaca">订阅者注册到频道</text>
      <text x="350" y="170" textAnchor="middle" fontSize="9" fill="#fecaca">pubsub_channels 字典</text>
      <text x="520" y="170" textAnchor="middle" fontSize="9" fill="#fecaca">发布者发送消息</text>
      <text x="690" y="170" textAnchor="middle" fontSize="9" fill="#fecaca">遍历订阅者推送</text>

      {/* 模式订阅 */}
      <rect x="50" y="190" width="350" height="50" rx="8" fill="#fda4a4" stroke="#fff" strokeWidth="1" opacity="0.9" />
      <text x="225" y="212" textAnchor="middle" fontSize="11" fontWeight="700" fill="#7f1d1d">PSUBSCRIBE pattern（通配符模式）</text>
      <text x="225" y="232" textAnchor="middle" fontSize="9" fill="#991b1b">pubsub_patterns 链表 · glob 风格匹配（news.* 匹配 news.tech）</text>

      <rect x="430" y="190" width="320" height="50" rx="8" fill="#fef3c7" stroke="#fff" strokeWidth="1" opacity="0.9" />
      <text x="590" y="212" textAnchor="middle" fontSize="11" fontWeight="700" fill="#78350f">PUBSUB CHANNELS / NUMSUB</text>
      <text x="590" y="232" textAnchor="middle" fontSize="9" fill="#92400e">查看活跃频道 / 订阅者数 · 内省命令</text>

      {/* Sentinel 深入 */}
      <rect x="20" y="265" width="760" height="145" rx="12" fill="url(#rdi-ps-grad2)" opacity="0.95" />
      <text x="400" y="290" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">Sentinel 哨兵深入</text>
      <line x1="40" y1="300" x2="760" y2="300" stroke="#fff" strokeWidth="1" opacity="0.4" />

      <rect x="50" y="310" width="165" height="85" rx="8" fill="#cffafe" stroke="#fff" strokeWidth="1" />
      <text x="132" y="332" textAnchor="middle" fontSize="10" fontWeight="700" fill="#0e7490">监控</text>
      <text x="132" y="350" textAnchor="middle" fontSize="9" fill="#155e75">PING 探活（每秒）</text>
      <text x="132" y="368" textAnchor="middle" fontSize="9" fill="#155e75">主观下线 SDOWN</text>
      <text x="132" y="386" textAnchor="middle" fontSize="9" fill="#155e75">客观下线 ODOWN</text>

      <rect x="230" y="310" width="165" height="85" rx="8" fill="#a5f3fc" stroke="#fff" strokeWidth="1" />
      <text x="312" y="332" textAnchor="middle" fontSize="10" fontWeight="700" fill="#0e7490">选举</text>
      <text x="312" y="350" textAnchor="middle" fontSize="9" fill="#155e75">Raft 变种 Leader 选举</text>
      <text x="312" y="368" textAnchor="middle" fontSize="9" fill="#155e75">epoch 纪元递增</text>
      <text x="312" y="386" textAnchor="middle" fontSize="9" fill="#155e75">quorum 过半同意</text>

      <rect x="410" y="310" width="165" height="85" rx="8" fill="#67e8f9" stroke="#fff" strokeWidth="1" />
      <text x="492" y="332" textAnchor="middle" fontSize="10" fontWeight="700" fill="#0e7490">故障转移</text>
      <text x="492" y="350" textAnchor="middle" fontSize="9" fill="#155e75">选新主（优先级/偏移量/runid）</text>
      <text x="492" y="368" textAnchor="middle" fontSize="9" fill="#155e75">SLAVEOF NO ONE</text>
      <text x="492" y="386" textAnchor="middle" fontSize="9" fill="#155e75">其他从 → 复制新主</text>

      <rect x="590" y="310" width="165" height="85" rx="8" fill="#a5f3fc" stroke="#fff" strokeWidth="1" />
      <text x="672" y="332" textAnchor="middle" fontSize="10" fontWeight="700" fill="#0e7490">通知</text>
      <text x="672" y="350" textAnchor="middle" fontSize="9" fill="#155e75">pub/sub 推送配置变更</text>
      <text x="672" y="368" textAnchor="middle" fontSize="9" fill="#155e75">客户端订阅 +switch-master</text>
      <text x="672" y="386" textAnchor="middle" fontSize="9" fill="#155e75">连接新主</text>

      {/* Pub/Sub 在 Sentinel 中的应用 */}
      <rect x="20" y="425" width="760" height="140" rx="10" fill="#f1f5f9" stroke="#475569" strokeWidth="1.5" />
      <text x="400" y="448" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">Pub/Sub 在 Sentinel 中的应用</text>
      <text x="400" y="475" textAnchor="middle" fontSize="11" fill="#475569">哨兵通过 __sentinel__:hello 频道发现彼此和从服务器</text>
      <text x="400" y="498" textAnchor="middle" fontSize="11" fill="#475569">主服务器通过 +switch-master 频道通知客户端主切换</text>
      <text x="400" y="521" textAnchor="middle" fontSize="11" fill="#475569">客户端订阅 +sdown / +odown / +failover-state 等事件频道感知故障</text>
      <text x="400" y="544" textAnchor="middle" fontSize="10" fill="#64748b">Pub/Sub 是 Sentinel 自动发现和通知的核心通信机制</text>
      <text x="400" y="560" textAnchor="middle" fontSize="10" fill="#64748b">消息不持久化 · 离线订阅者丢失消息 · 适合实时通知场景</text>
    </svg>
  );
}
