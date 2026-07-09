"use client";

export function KfkFinalReviewDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="Kafka全书复习知识图谱">
      <defs>
        <linearGradient id="kfk-fr-base" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="kfk-fr-prod" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0891b2" />
          <stop offset="100%" stopColor="#0e7490" />
        </linearGradient>
        <linearGradient id="kfk-fr-rel" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="kfk-fr-adv" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <marker id="kfk-fr-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="28" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">Kafka权威指南 · 全书知识图谱串联</text>

      {/* 四部分串联 */}
      <rect x="20" y="50" width="185" height="110" rx="10" fill="url(#kfk-fr-base)" opacity="0.9" />
      <text x="112" y="75" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">数据模型层</text>
      <text x="112" y="95" textAnchor="middle" fontSize="10" fill="#bfdbfe">Topic / Partition</text>
      <text x="112" y="112" textAnchor="middle" fontSize="10" fill="#bfdbfe">Offset / Segment</text>
      <text x="112" y="132" textAnchor="middle" fontSize="9" fill="#93c5fd">顺序日志 + 分区并行</text>
      <text x="112" y="148" textAnchor="middle" fontSize="9" fill="#60a5fa">数据怎么存</text>

      <rect x="215" y="50" width="185" height="110" rx="10" fill="url(#kfk-fr-prod)" opacity="0.9" />
      <text x="307" y="75" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">生产消费层</text>
      <text x="307" y="95" textAnchor="middle" fontSize="10" fill="#cffafe">Producer / 分区器</text>
      <text x="307" y="112" textAnchor="middle" fontSize="10" fill="#cffafe">Consumer Group / 再均衡</text>
      <text x="307" y="132" textAnchor="middle" fontSize="9" fill="#a5f3fc">acks / Offset提交</text>
      <text x="307" y="148" textAnchor="middle" fontSize="9" fill="#67e8f9">数据怎么流转</text>

      <rect x="410" y="50" width="185" height="110" rx="10" fill="url(#kfk-fr-rel)" opacity="0.9" />
      <text x="502" y="75" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">可靠性层</text>
      <text x="502" y="95" textAnchor="middle" fontSize="10" fill="#fef3c7">副本 / ISR / HW</text>
      <text x="502" y="112" textAnchor="middle" fontSize="10" fill="#fef3c7">Controller / Leader选举</text>
      <text x="502" y="132" textAnchor="middle" fontSize="9" fill="#fde68a">acks=all / min.insync</text>
      <text x="502" y="148" textAnchor="middle" fontSize="9" fill="#fcd34d">怎么不丢/高可用</text>

      <rect x="605" y="50" width="175" height="110" rx="10" fill="url(#kfk-fr-adv)" opacity="0.9" />
      <text x="692" y="75" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">进阶运维层</text>
      <text x="692" y="95" textAnchor="middle" fontSize="10" fill="#ede9fe">Streams / Connect</text>
      <text x="692" y="112" textAnchor="middle" fontSize="10" fill="#ede9fe">监控 / 安全 / 扩缩容</text>
      <text x="692" y="132" textAnchor="middle" fontSize="9" fill="#ddd6fe">SASL/ACL / 迁移</text>
      <text x="692" y="148" textAnchor="middle" fontSize="9" fill="#c4b5fd">进阶怎么用</text>

      <path d="M205 105 L215 105" stroke="#64748b" strokeWidth="2" markerEnd="url(#kfk-fr-arrow)" />
      <path d="M400 105 L410 105" stroke="#64748b" strokeWidth="2" markerEnd="url(#kfk-fr-arrow)" />
      <path d="M595 105 L605 105" stroke="#64748b" strokeWidth="2" markerEnd="url(#kfk-fr-arrow)" />

      {/* 三个交汇点 */}
      <text x="400" y="190" textAnchor="middle" fontSize="13" fontWeight="700" fill="#0f172a">三个交汇点（知识闭环）</text>

      <rect x="30" y="200" width="240" height="80" rx="8" fill="#dbeafe" stroke="#2563eb" strokeWidth="1.5" />
      <text x="150" y="222" textAnchor="middle" fontSize="11" fontWeight="700" fill="#1d4ed8">① Partition（数据模型 ↔ 生产消费）</text>
      <text x="150" y="242" textAnchor="middle" fontSize="9" fill="#1e40af">分区器决定消息进哪个分区</text>
      <text x="150" y="258" textAnchor="middle" fontSize="9" fill="#1e40af">分区是并行消费的基本单位</text>
      <text x="150" y="274" textAnchor="middle" fontSize="9" fill="#1d4ed8">分区数 = 最大消费者并行度</text>

      <rect x="285" y="200" width="240" height="80" rx="8" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="405" y="222" textAnchor="middle" fontSize="11" fontWeight="700" fill="#92400e">② 副本ISR（数据模型 ↔ 可靠性）</text>
      <text x="405" y="242" textAnchor="middle" fontSize="9" fill="#78350f">分区有多副本分布在不同Broker</text>
      <text x="405" y="258" textAnchor="middle" fontSize="9" fill="#78350f">ISR决定哪些副本可被选为Leader</text>
      <text x="405" y="274" textAnchor="middle" fontSize="9" fill="#92400e">HW=min(ISR的LEO)保证可见性</text>

      <rect x="540" y="200" width="220" height="80" rx="8" fill="#ede9fe" stroke="#8b5cf6" strokeWidth="1.5" />
      <text x="650" y="222" textAnchor="middle" fontSize="11" fontWeight="700" fill="#6d28d9">③ Offset提交（生产消费 ↔ 可靠性）</text>
      <text x="650" y="242" textAnchor="middle" fontSize="9" fill="#5b21b6">Offset提交语义决定消费端不丢不重</text>
      <text x="650" y="258" textAnchor="middle" fontSize="9" fill="#5b21b6">手动提交+幂等消费=至少一次</text>
      <text x="650" y="274" textAnchor="middle" fontSize="9" fill="#6d28d9">事务=端到端Exactly-Once</text>

      {/* 高吞吐四大基石 */}
      <text x="400" y="310" textAnchor="middle" fontSize="13" fontWeight="700" fill="#0f172a">高吞吐四大技术基石</text>

      <rect x="30" y="320" width="185" height="90" rx="8" fill="#dbeafe" stroke="#2563eb" strokeWidth="1.5" />
      <text x="122" y="343" textAnchor="middle" fontSize="11" fontWeight="700" fill="#1d4ed8">① 顺序磁盘I/O</text>
      <text x="122" y="363" textAnchor="middle" fontSize="9" fill="#1e40af">追加写Segment日志</text>
      <text x="122" y="379" textAnchor="middle" fontSize="9" fill="#1e40af">顺序写≈内存随机写</text>
      <text x="122" y="398" textAnchor="middle" fontSize="9" fill="#1d4ed8">持久化+高写入吞吐</text>

      <rect x="225" y="320" width="185" height="90" rx="8" fill="#cffafe" stroke="#0891b2" strokeWidth="1.5" />
      <text x="317" y="343" textAnchor="middle" fontSize="11" fontWeight="700" fill="#0e7490">② 零拷贝(sendfile)</text>
      <text x="317" y="363" textAnchor="middle" fontSize="9" fill="#155e75">页缓存→DMA→网卡</text>
      <text x="317" y="379" textAnchor="middle" fontSize="9" fill="#155e75">跳过用户空间</text>
      <text x="317" y="398" textAnchor="middle" fontSize="9" fill="#0e7490">高读取吞吐+低CPU</text>

      <rect x="420" y="320" width="185" height="90" rx="8" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="512" y="343" textAnchor="middle" fontSize="11" fontWeight="700" fill="#92400e">③ 分区并行</text>
      <text x="512" y="363" textAnchor="middle" fontSize="9" fill="#78350f">多Partition多Broker</text>
      <text x="512" y="379" textAnchor="middle" fontSize="9" fill="#78350f">生产消费均可并行</text>
      <text x="512" y="398" textAnchor="middle" fontSize="9" fill="#92400e">吞吐随分区线性扩展</text>

      <rect x="615" y="320" width="145" height="90" rx="8" fill="#ede9fe" stroke="#8b5cf6" strokeWidth="1.5" />
      <text x="687" y="343" textAnchor="middle" fontSize="11" fontWeight="700" fill="#6d28d9">④ 批处理+压缩</text>
      <text x="687" y="363" textAnchor="middle" fontSize="9" fill="#5b21b6">batch+压缩整批发送</text>
      <text x="687" y="379" textAnchor="middle" fontSize="9" fill="#5b21b6">减少IO/网络往返</text>
      <text x="687" y="398" textAnchor="middle" fontSize="9" fill="#6d28d9">单分区有效吞吐↑</text>

      {/* 全链路不丢不重 */}
      <rect x="20" y="425" width="760" height="145" rx="10" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="400" y="448" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">全链路不丢不重配置（Exactly-Once）</text>

      <text x="40" y="472" fontSize="10" fill="#1d4ed8" fontWeight="600">生产端：</text>
      <text x="110" y="472" fontSize="10" fill="#475569">acks=all + enable.idempotence=true + retries=MAX + max.in.flight ≤ 5 + transactional.id（事务）</text>

      <text x="40" y="494" fontSize="10" fill="#059669" fontWeight="600">Broker端：</text>
      <text x="120" y="494" fontSize="10" fill="#475569">replication.factor=3 + min.insync.replicas=2 + unclean.leader.election=false + replica.lag.time.max.ms=30s</text>

      <text x="40" y="516" fontSize="10" fill="#d97706" fontWeight="600">消费端：</text>
      <text x="110" y="516" fontSize="10" fill="#475569">enable.auto.commit=false + 手动commitSync + isolation.level=read_committed + 幂等消费（业务去重）</text>

      <text x="40" y="540" fontSize="10" fill="#6d28d9" fontWeight="600">Kafka内部：</text>
      <text x="120" y="540" fontSize="10" fill="#475569">consume-transform-produce 事务模式（输入Topic→处理→输出Topic+Offset，同一Kafka事务提交）</text>

      <text x="400" y="562" textAnchor="middle" fontSize="10" fill="#64748b">注意：Kafka的Exactly-Once仅覆盖Kafka内部链路，涉及外部系统需额外保证（幂等/事务性Sink）</text>
    </svg>
  );
}
