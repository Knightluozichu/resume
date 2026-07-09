"use client";

export function KfkLearningMapDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="Kafka权威指南全书学习地图">
      <defs>
        <linearGradient id="kfk-lm-base" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="kfk-lm-prod" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0891b2" />
          <stop offset="100%" stopColor="#0e7490" />
        </linearGradient>
        <linearGradient id="kfk-lm-rel" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="kfk-lm-adv" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <marker id="kfk-lm-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="28" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">Kafka权威指南 · 知识体系全景</text>

      {/* 第一部分：基础概念 */}
      <rect x="20" y="50" width="185" height="180" rx="12" fill="url(#kfk-lm-base)" opacity="0.95" />
      <text x="112" y="75" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">基础概念</text>
      <line x1="35" y1="85" x2="190" y2="85" stroke="#fff" strokeWidth="1" opacity="0.4" />
      <text x="112" y="107" textAnchor="middle" fontSize="11" fill="#bfdbfe">Kafka入门 / 发布订阅</text>
      <text x="112" y="127" textAnchor="middle" fontSize="11" fill="#bfdbfe">Topic / Partition / Offset</text>
      <text x="112" y="153" textAnchor="middle" fontSize="10" fill="#93c5fd">数据模型与组织方式</text>
      <text x="112" y="173" textAnchor="middle" fontSize="10" fill="#93c5fd">顺序日志 &amp; 分区并行</text>
      <text x="112" y="205" textAnchor="middle" fontSize="10" fill="#60a5fa">入门 · 地基</text>

      {/* 第二部分：生产与消费 */}
      <rect x="215" y="50" width="185" height="180" rx="12" fill="url(#kfk-lm-prod)" opacity="0.95" />
      <text x="307" y="75" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">生产与消费</text>
      <line x1="230" y1="85" x2="385" y2="85" stroke="#fff" strokeWidth="1" opacity="0.4" />
      <text x="307" y="107" textAnchor="middle" fontSize="11" fill="#cffafe">Producer / 序列化 / 分区器</text>
      <text x="307" y="127" textAnchor="middle" fontSize="11" fill="#cffafe">Consumer Group / 再均衡</text>
      <text x="307" y="153" textAnchor="middle" fontSize="10" fill="#a5f3fc">acks语义 / Offset提交</text>
      <text x="307" y="173" textAnchor="middle" fontSize="10" fill="#a5f3fc">幂等 &amp; 事务生产</text>
      <text x="307" y="205" textAnchor="middle" fontSize="10" fill="#67e8f9">基础 · 核心</text>

      {/* 第三部分：内部原理与可靠性 */}
      <rect x="410" y="50" width="185" height="180" rx="12" fill="url(#kfk-lm-rel)" opacity="0.95" />
      <text x="502" y="75" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">内部原理与可靠性</text>
      <line x1="425" y1="85" x2="580" y2="85" stroke="#fff" strokeWidth="1" opacity="0.4" />
      <text x="502" y="107" textAnchor="middle" fontSize="11" fill="#fef3c7">副本 / ISR / HW / LEO</text>
      <text x="502" y="127" textAnchor="middle" fontSize="11" fill="#fef3c7">Controller / Leader选举</text>
      <text x="502" y="153" textAnchor="middle" fontSize="10" fill="#fde68a">请求处理 / 消息格式v2</text>
      <text x="502" y="173" textAnchor="middle" fontSize="10" fill="#fde68a">ZooKeeper / KRaft</text>
      <text x="502" y="205" textAnchor="middle" fontSize="10" fill="#fcd34d">中高 · 深层</text>

      {/* 第四部分：进阶与运维 */}
      <rect x="605" y="50" width="175" height="180" rx="12" fill="url(#kfk-lm-adv)" opacity="0.95" />
      <text x="692" y="75" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">进阶与运维</text>
      <line x1="620" y1="85" x2="765" y2="85" stroke="#fff" strokeWidth="1" opacity="0.4" />
      <text x="692" y="107" textAnchor="middle" fontSize="11" fill="#ede9fe">Kafka Streams / 窗口</text>
      <text x="692" y="127" textAnchor="middle" fontSize="11" fill="#ede9fe">Connect / 监控 / 安全</text>
      <text x="692" y="153" textAnchor="middle" fontSize="10" fill="#ddd6fe">SASL/ACL / 扩缩容</text>
      <text x="692" y="173" textAnchor="middle" fontSize="10" fill="#ddd6fe">Topic管理 / 数据迁移</text>
      <text x="692" y="205" textAnchor="middle" fontSize="10" fill="#c4b5fd">高级 · 生产级</text>

      {/* Arrows */}
      <path d="M205 140 L215 140" stroke="#64748b" strokeWidth="2" markerEnd="url(#kfk-lm-arrow)" />
      <path d="M400 140 L410 140" stroke="#64748b" strokeWidth="2" markerEnd="url(#kfk-lm-arrow)" />
      <path d="M595 140 L605 140" stroke="#64748b" strokeWidth="2" markerEnd="url(#kfk-lm-arrow)" />

      {/* 三条核心主线 */}
      <text x="400" y="265" textAnchor="middle" fontSize="14" fontWeight="700" fill="#0f172a">三条核心主线</text>

      <rect x="20" y="280" width="250" height="100" rx="10" fill="#dbeafe" stroke="#2563eb" strokeWidth="1.5" />
      <text x="145" y="303" textAnchor="middle" fontSize="12" fontWeight="700" fill="#1d4ed8">主线一：数据模型</text>
      <text x="145" y="323" textAnchor="middle" fontSize="10" fill="#1e40af">Topic → Partition → Offset</text>
      <text x="145" y="343" textAnchor="middle" fontSize="10" fill="#1e40af">→ Segment 顺序日志</text>
      <text x="145" y="367" textAnchor="middle" fontSize="10" fill="#1d4ed8">回答「数据怎么存」</text>

      <rect x="275" y="280" width="250" height="100" rx="10" fill="#cffafe" stroke="#0891b2" strokeWidth="1.5" />
      <text x="400" y="303" textAnchor="middle" fontSize="12" fontWeight="700" fill="#0e7490">主线二：生产消费</text>
      <text x="400" y="323" textAnchor="middle" fontSize="10" fill="#155e75">Producer → 分区器 → 消费者组</text>
      <text x="400" y="343" textAnchor="middle" fontSize="10" fill="#155e75">→ 再均衡 → Offset提交</text>
      <text x="400" y="367" textAnchor="middle" fontSize="10" fill="#0e7490">回答「数据怎么流转」</text>

      <rect x="530" y="280" width="250" height="100" rx="10" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="655" y="303" textAnchor="middle" fontSize="12" fontWeight="700" fill="#92400e">主线三：可靠性与分布式</text>
      <text x="655" y="323" textAnchor="middle" fontSize="10" fill="#78350f">副本 → ISR → Leader选举</text>
      <text x="655" y="343" textAnchor="middle" fontSize="10" fill="#78350f">→ HW/LEO → acks → Controller</text>
      <text x="655" y="367" textAnchor="middle" fontSize="10" fill="#92400e">回答「怎么不丢/高可用」</text>

      {/* 学习路径 */}
      <rect x="20" y="395" width="760" height="170" rx="10" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="400" y="418" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">推荐学习路径（从基础概念 → 生产消费 → 内部原理与可靠性 → 进阶运维 → 全书整合）</text>
      <text x="400" y="441" textAnchor="middle" fontSize="11" fill="#475569">① 基础概念（Kafka入门/Topic与分区/Offset/Segment日志）→ ② 生产消费（Producer/Consumer Group/分区器/再均衡）</text>
      <text x="400" y="461" textAnchor="middle" fontSize="11" fill="#475569">→ ③ 内部原理与可靠性（副本/ISR/HW/acks/Controller/Leader选举）→ ④ 进阶（Streams/Connect/监控/安全）</text>
      <text x="400" y="481" textAnchor="middle" fontSize="11" fill="#475569">→ ⑤ 全书复习整合</text>
      <text x="400" y="510" textAnchor="middle" fontSize="11" fill="#64748b">三主线在「Partition」（数据模型↔生产消费）与「副本ISR」（数据模型↔可靠性）与「Offset提交」（生产消费↔可靠性）处交汇</text>
      <text x="400" y="530" textAnchor="middle" fontSize="11" fill="#64748b">Kafka = 顺序日志 + 分区并行 + 副本容错 + 消费者组 + 流处理</text>
      <text x="400" y="550" textAnchor="middle" fontSize="11" fill="#64748b">核心设计哲学：以追加写入的分布式提交日志为核心，通过分区实现并行，通过副本实现容错</text>
    </svg>
  );
}
