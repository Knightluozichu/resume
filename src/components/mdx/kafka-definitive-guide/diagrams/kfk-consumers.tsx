"use client";

export function KfkConsumersDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="Kafka消费者组与再均衡">
      <defs>
        <linearGradient id="kfk-cs-grp" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="kfk-cs-grp2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <marker id="kfk-cs-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="28" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">Kafka 消费者组 · 负载均衡与广播</text>

      {/* Topic with 4 partitions */}
      <text x="400" y="55" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">Topic: orders (4 Partitions)</text>
      <rect x="100" y="65" width="600" height="40" rx="6" fill="#1d4ed8" />
      <rect x="110" y="72" width="140" height="26" rx="4" fill="#3b82f6" />
      <text x="180" y="89" textAnchor="middle" fontSize="10" fill="#fff">Partition 0</text>
      <rect x="260" y="72" width="140" height="26" rx="4" fill="#3b82f6" />
      <text x="330" y="89" textAnchor="middle" fontSize="10" fill="#fff">Partition 1</text>
      <rect x="410" y="72" width="140" height="26" rx="4" fill="#3b82f6" />
      <text x="480" y="89" textAnchor="middle" fontSize="10" fill="#fff">Partition 2</text>
      <rect x="560" y="72" width="140" height="26" rx="4" fill="#3b82f6" />
      <text x="630" y="89" textAnchor="middle" fontSize="10" fill="#fff">Partition 3</text>

      {/* Consumer Group A */}
      <rect x="40" y="135" width="340" height="130" rx="10" fill="url(#kfk-cs-grp)" opacity="0.15" stroke="#f59e0b" strokeWidth="2" />
      <text x="210" y="155" textAnchor="middle" fontSize="13" fontWeight="700" fill="#92400e">Consumer Group A</text>
      <text x="210" y="172" textAnchor="middle" fontSize="10" fill="#92400e">group.id = "order-processor"</text>
      <rect x="55" y="180" width="75" height="70" rx="6" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="92" y="200" textAnchor="middle" fontSize="10" fontWeight="700" fill="#92400e">C1</text>
      <text x="92" y="218" textAnchor="middle" fontSize="9" fill="#78350f">← P0</text>
      <text x="92" y="234" textAnchor="middle" fontSize="9" fill="#78350f">← P1</text>
      <rect x="140" y="180" width="75" height="70" rx="6" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="177" y="200" textAnchor="middle" fontSize="10" fontWeight="700" fill="#92400e">C2</text>
      <text x="177" y="218" textAnchor="middle" fontSize="9" fill="#78350f">← P2</text>
      <text x="177" y="234" textAnchor="middle" fontSize="9" fill="#78350f">← P3</text>
      <text x="210" y="258" textAnchor="middle" fontSize="9" fill="#92400e">组内负载均衡：每分区仅一个消费者</text>

      {/* Consumer Group B */}
      <rect x="420" y="135" width="340" height="130" rx="10" fill="url(#kfk-cs-grp2)" opacity="0.15" stroke="#8b5cf6" strokeWidth="2" />
      <text x="590" y="155" textAnchor="middle" fontSize="13" fontWeight="700" fill="#5b21b6">Consumer Group B</text>
      <text x="590" y="172" textAnchor="middle" fontSize="10" fill="#5b21b6">group.id = "audit-log"</text>
      <rect x="470" y="180" width="75" height="70" rx="6" fill="#ede9fe" stroke="#8b5cf6" strokeWidth="1.5" />
      <text x="507" y="200" textAnchor="middle" fontSize="10" fontWeight="700" fill="#5b21b6">C3</text>
      <text x="507" y="218" textAnchor="middle" fontSize="9" fill="#5b21b6">← P0</text>
      <text x="507" y="234" textAnchor="middle" fontSize="9" fill="#5b21b6">← P1</text>
      <rect x="635" y="180" width="75" height="70" rx="6" fill="#ede9fe" stroke="#8b5cf6" strokeWidth="1.5" />
      <text x="672" y="200" textAnchor="middle" fontSize="10" fontWeight="700" fill="#5b21b6">C4</text>
      <text x="672" y="218" textAnchor="middle" fontSize="9" fill="#5b21b6">← P2</text>
      <text x="672" y="234" textAnchor="middle" fontSize="9" fill="#5b21b6">← P3</text>
      <text x="590" y="258" textAnchor="middle" fontSize="9" fill="#5b21b6">跨组广播：各自独立消费全量数据</text>

      {/* Arrows */}
      <path d="M180 105 L92 180" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#kfk-cs-arrow)" />
      <path d="M330 105 L177 180" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#kfk-cs-arrow)" />
      <path d="M480 105 L507 180" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#kfk-cs-arrow)" />
      <path d="M630 105 L672 180" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#kfk-cs-arrow)" />

      {/* Rebalance 流程 */}
      <text x="400" y="300" textAnchor="middle" fontSize="14" fontWeight="700" fill="#0f172a">再均衡（Rebalance）流程</text>

      <rect x="30" y="315" width="145" height="55" rx="8" fill="#dbeafe" stroke="#2563eb" strokeWidth="1.5" />
      <text x="102" y="338" textAnchor="middle" fontSize="10" fontWeight="700" fill="#1d4ed8">触发</text>
      <text x="102" y="355" textAnchor="middle" fontSize="9" fill="#1e40af">消费者加入/离开</text>

      <rect x="195" y="315" width="145" height="55" rx="8" fill="#dbeafe" stroke="#2563eb" strokeWidth="1.5" />
      <text x="267" y="338" textAnchor="middle" fontSize="10" fontWeight="700" fill="#1d4ed8">JoinGroup</text>
      <text x="267" y="355" textAnchor="middle" fontSize="9" fill="#1e40af">选 Consumer Leader</text>

      <rect x="360" y="315" width="145" height="55" rx="8" fill="#dbeafe" stroke="#2563eb" strokeWidth="1.5" />
      <text x="432" y="338" textAnchor="middle" fontSize="10" fontWeight="700" fill="#1d4ed8">分配方案</text>
      <text x="432" y="355" textAnchor="middle" fontSize="9" fill="#1e40af">Leader 计算分配</text>

      <rect x="525" y="315" width="145" height="55" rx="8" fill="#dbeafe" stroke="#2563eb" strokeWidth="1.5" />
      <text x="597" y="338" textAnchor="middle" fontSize="10" fontWeight="700" fill="#1d4ed8">SyncGroup</text>
      <text x="597" y="355" textAnchor="middle" fontSize="9" fill="#1e40af">下发分配结果</text>

      <path d="M175 342 L195 342" stroke="#64748b" strokeWidth="2" markerEnd="url(#kfk-cs-arrow)" />
      <path d="M340 342 L360 342" stroke="#64748b" strokeWidth="2" markerEnd="url(#kfk-cs-arrow)" />
      <path d="M505 342 L525 342" stroke="#64748b" strokeWidth="2" markerEnd="url(#kfk-cs-arrow)" />

      {/* Offset 提交 */}
      <text x="400" y="400" textAnchor="middle" fontSize="14" fontWeight="700" fill="#0f172a">Offset 提交方式</text>

      <rect x="30" y="415" width="370" height="150" rx="10" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="215" y="438" textAnchor="middle" fontSize="12" fontWeight="700" fill="#92400e">自动提交（enable.auto.commit=true）</text>
      <text x="50" y="462" fontSize="10" fill="#78350f">auto.commit.interval.ms = 5000（5秒）</text>
      <text x="50" y="482" fontSize="10" fill="#78350f">后台线程定期提交 poll() 返回的最新 Offset</text>
      <text x="50" y="505" fontSize="10" fill="#b91c1c">缺点：可能重复消费（处理完但没提交就崩溃）</text>
      <text x="50" y="525" fontSize="10" fill="#b91c1c">缺点：可能消息丢失（提交后处理失败崩溃）</text>
      <text x="50" y="548" fontSize="10" fill="#92400e">适用：容忍少量重复/丢失的日志场景</text>

      <rect x="415" y="415" width="355" height="150" rx="10" fill="#dbeafe" stroke="#2563eb" strokeWidth="1.5" />
      <text x="592" y="438" textAnchor="middle" fontSize="12" fontWeight="700" fill="#1d4ed8">手动提交（enable.auto.commit=false）</text>
      <text x="435" y="462" fontSize="10" fill="#1e40af">commitSync()：同步阻塞提交，失败重试</text>
      <text x="435" y="482" fontSize="10" fill="#1e40af">commitAsync()：异步非阻塞，失败不重试</text>
      <text x="435" y="505" fontSize="10" fill="#1d4ed8">优点：精确控制提交时机（至少一次语义）</text>
      <text x="435" y="525" fontSize="10" fill="#1d4ed8">最佳实践：处理后 commitAsync + 关闭前 commitSync</text>
      <text x="435" y="548" fontSize="10" fill="#1d4ed8">适用：需要精确处理的业务场景（+幂等消费）</text>
    </svg>
  );
}
