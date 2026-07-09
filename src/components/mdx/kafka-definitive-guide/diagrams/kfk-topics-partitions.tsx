"use client";

export function KfkTopicsPartitionsDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="Kafka Topic与分区存储结构">
      <defs>
        <linearGradient id="kfk-tp-topic" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="kfk-tp-seg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0891b2" />
          <stop offset="100%" stopColor="#0e7490" />
        </linearGradient>
        <marker id="kfk-tp-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="28" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">Topic → Partition → Segment 物理存储结构</text>

      {/* Topic */}
      <rect x="280" y="50" width="240" height="45" rx="8" fill="url(#kfk-tp-topic)" />
      <text x="400" y="78" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">Topic: my-topic (6 Partitions)</text>

      {/* Partition 0 */}
      <rect x="30" y="115" width="230" height="40" rx="6" fill="url(#kfk-tp-seg)" opacity="0.9" />
      <text x="145" y="140" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">Partition 0</text>
      {/* Segments */}
      <rect x="35" y="160" width="65" height="30" rx="4" fill="#cffafe" stroke="#0891b2" strokeWidth="1" />
      <text x="67" y="179" textAnchor="middle" fontSize="8" fill="#155e75">Seg 0 (.log)</text>
      <rect x="105" y="160" width="65" height="30" rx="4" fill="#cffafe" stroke="#0891b2" strokeWidth="1" />
      <text x="137" y="179" textAnchor="middle" fontSize="8" fill="#155e75">Seg 1 (.log)</text>
      <rect x="175" y="160" width="80" height="30" rx="4" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="215" y="179" textAnchor="middle" fontSize="8" fill="#92400e">Active Seg</text>

      {/* Partition 1 */}
      <rect x="290" y="115" width="230" height="40" rx="6" fill="url(#kfk-tp-seg)" opacity="0.9" />
      <text x="405" y="140" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">Partition 1</text>
      <rect x="295" y="160" width="65" height="30" rx="4" fill="#cffafe" stroke="#0891b2" strokeWidth="1" />
      <text x="327" y="179" textAnchor="middle" fontSize="8" fill="#155e75">Seg 0 (.log)</text>
      <rect x="365" y="160" width="65" height="30" rx="4" fill="#cffafe" stroke="#0891b2" strokeWidth="1" />
      <text x="397" y="179" textAnchor="middle" fontSize="8" fill="#155e75">Seg 1 (.log)</text>
      <rect x="435" y="160" width="80" height="30" rx="4" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="475" y="179" textAnchor="middle" fontSize="8" fill="#92400e">Active Seg</text>

      {/* Partition 2 */}
      <rect x="550" y="115" width="230" height="40" rx="6" fill="url(#kfk-tp-seg)" opacity="0.9" />
      <text x="665" y="140" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">Partition 2</text>
      <rect x="555" y="160" width="65" height="30" rx="4" fill="#cffafe" stroke="#0891b2" strokeWidth="1" />
      <text x="587" y="179" textAnchor="middle" fontSize="8" fill="#155e75">Seg 0 (.log)</text>
      <rect x="625" y="160" width="65" height="30" rx="4" fill="#cffafe" stroke="#0891b2" strokeWidth="1" />
      <text x="657" y="179" textAnchor="middle" fontSize="8" fill="#155e75">Seg 1 (.log)</text>
      <rect x="695" y="160" width="80" height="30" rx="4" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="735" y="179" textAnchor="middle" fontSize="8" fill="#92400e">Active Seg</text>

      {/* Arrows from Topic to Partitions */}
      <path d="M330 95 L145 115" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#kfk-tp-arrow)" />
      <path d="M400 95 L405 115" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#kfk-tp-arrow)" />
      <path d="M470 95 L665 115" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#kfk-tp-arrow)" />

      {/* Offset 示意 */}
      <text x="400" y="218" textAnchor="middle" fontSize="13" fontWeight="700" fill="#0f172a">Partition 内 Offset 序列（单调递增，分区内唯一）</text>
      <rect x="60" y="230" width="680" height="50" rx="8" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="90" y="260" textAnchor="middle" fontSize="11" fill="#1e40af" fontWeight="600">Offset 0</text>
      <text x="190" y="260" textAnchor="middle" fontSize="11" fill="#1e40af" fontWeight="600">Offset 1</text>
      <text x="290" y="260" textAnchor="middle" fontSize="11" fill="#1e40af" fontWeight="600">Offset 2</text>
      <text x="390" y="260" textAnchor="middle" fontSize="11" fill="#1e40af" fontWeight="600">Offset 3</text>
      <text x="490" y="260" textAnchor="middle" fontSize="11" fill="#1e40af" fontWeight="600">Offset 4</text>
      <text x="590" y="260" textAnchor="middle" fontSize="11" fill="#92400e" fontWeight="600">Offset 5</text>
      <text x="690" y="260" textAnchor="middle" fontSize="11" fill="#92400e" fontWeight="600">Offset 6</text>
      <path d="M600 275 L690 275" stroke="#d97706" strokeWidth="1.5" markerEnd="url(#kfk-tp-arrow)" />
      <text x="645" y="244" textAnchor="middle" fontSize="8" fill="#d97706">追加写入 →</text>

      {/* Segment 文件组成 */}
      <text x="400" y="312" textAnchor="middle" fontSize="13" fontWeight="700" fill="#0f172a">单个 Segment 的三个文件</text>

      <rect x="60" y="325" width="200" height="80" rx="8" fill="#dbeafe" stroke="#2563eb" strokeWidth="1.5" />
      <text x="160" y="348" textAnchor="middle" fontSize="12" fontWeight="700" fill="#1d4ed8">.log</text>
      <text x="160" y="368" textAnchor="middle" fontSize="10" fill="#1e40af">消息数据日志</text>
      <text x="160" y="385" textAnchor="middle" fontSize="9" fill="#3b82f6">RecordBatch 追加写入</text>
      <text x="160" y="399" textAnchor="middle" fontSize="9" fill="#3b82f6">顺序磁盘 IO</text>

      <rect x="290" y="325" width="200" height="80" rx="8" fill="#cffafe" stroke="#0891b2" strokeWidth="1.5" />
      <text x="390" y="348" textAnchor="middle" fontSize="12" fontWeight="700" fill="#0e7490">.index</text>
      <text x="390" y="368" textAnchor="middle" fontSize="10" fill="#155e75">稀疏偏移量索引</text>
      <text x="390" y="385" textAnchor="middle" fontSize="9" fill="#0e7490">Offset → position</text>
      <text x="390" y="399" textAnchor="middle" fontSize="9" fill="#0e7490">每4KB一条索引项</text>

      <rect x="520" y="325" width="200" height="80" rx="8" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="620" y="348" textAnchor="middle" fontSize="12" fontWeight="700" fill="#92400e">.timeindex</text>
      <text x="620" y="368" textAnchor="middle" fontSize="10" fill="#78350f">时间戳索引</text>
      <text x="620" y="385" textAnchor="middle" fontSize="9" fill="#92400e">timestamp → Offset</text>
      <text x="620" y="399" textAnchor="middle" fontSize="9" fill="#92400e">按时间查找消息</text>

      {/* 保留策略 */}
      <text x="400" y="438" textAnchor="middle" fontSize="13" fontWeight="700" fill="#0f172a">两种消息保留策略</text>
      <rect x="60" y="452" width="330" height="110" rx="8" fill="#dbeafe" stroke="#2563eb" strokeWidth="1.5" />
      <text x="225" y="475" textAnchor="middle" fontSize="12" fontWeight="700" fill="#1d4ed8">retention（时间/大小保留）</text>
      <text x="80" y="497" fontSize="10" fill="#1e40af">log.retention.hours = 168（默认7天）</text>
      <text x="80" y="515" fontSize="10" fill="#1e40af">超过保留时间的 Segment 整体删除</text>
      <text x="80" y="533" fontSize="10" fill="#1e40af">适用：事件日志（每条消息独立有价值）</text>
      <text x="80" y="551" fontSize="10" fill="#1e40af">如：点击流、日志、传感器数据</text>

      <rect x="410" y="452" width="330" height="110" rx="8" fill="#ede9fe" stroke="#8b5cf6" strokeWidth="1.5" />
      <text x="575" y="475" textAnchor="middle" fontSize="12" fontWeight="700" fill="#6d28d9">compact（日志压缩）</text>
      <text x="430" y="497" fontSize="10" fill="#5b21b6">log.cleanup.policy = compact</text>
      <text x="430" y="515" fontSize="10" fill="#5b21b6">保留每个 key 的最新 value，删除旧值</text>
      <text x="430" y="533" fontSize="10" fill="#5b21b6">适用：状态变更流（只关心最终状态）</text>
      <text x="430" y="551" fontSize="10" fill="#5b21b6">如：用户信息变更、配置更新、余额变更</text>
    </svg>
  );
}
