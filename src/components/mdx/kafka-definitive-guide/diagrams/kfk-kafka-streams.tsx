"use client";

export function KfkKafkaStreamsDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="Kafka Streams流处理">
      <defs>
        <linearGradient id="kfk-st-stream" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="kfk-st-table" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <marker id="kfk-st-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="28" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">Kafka Streams · KStream/KTable 与窗口</text>

      {/* KStream vs KTable */}
      <text x="400" y="55" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">KStream（流）vs KTable（表）</text>

      {/* KStream */}
      <rect x="30" y="70" width="360" height="170" rx="10" fill="#dbeafe" stroke="#2563eb" strokeWidth="2" />
      <text x="210" y="93" textAnchor="middle" fontSize="13" fontWeight="700" fill="#1d4ed8">KStream（事件流）</text>
      <text x="50" y="115" fontSize="10" fill="#1e40af">插入语义：同 key 的记录都保留</text>
      <line x1="50" y1="125" x2="370" y2="125" stroke="#2563eb" strokeWidth="1" opacity="0.3" />
      <text x="60" y="145" fontSize="9" fill="#1e40af">key=A, value=100  （事件1）</text>
      <text x="60" y="162" fontSize="9" fill="#1e40af">key=B, value=200  （事件2）</text>
      <text x="60" y="179" fontSize="9" fill="#1e40af">key=A, value=150  （事件3，保留！）</text>
      <text x="60" y="196" fontSize="9" fill="#1e40af">key=C, value=300  （事件4）</text>
      <text x="60" y="220" fontSize="10" fill="#1d4ed8" fontWeight="600">适用：点击流 / 日志 / 传感器数据</text>
      <text x="60" y="234" fontSize="10" fill="#1d4ed8" fontWeight="600">每条消息独立有价值</text>

      {/* KTable */}
      <rect x="410" y="70" width="360" height="170" rx="10" fill="#ede9fe" stroke="#8b5cf6" strokeWidth="2" />
      <text x="590" y="93" textAnchor="middle" fontSize="13" fontWeight="700" fill="#6d28d9">KTable（状态表）</text>
      <text x="430" y="115" fontSize="10" fill="#5b21b6">更新语义：同 key 新值覆盖旧值</text>
      <line x1="430" y1="125" x2="740" y2="125" stroke="#8b5cf6" strokeWidth="1" opacity="0.3" />
      <text x="430" y="145" fontSize="9" fill="#5b21b6">key=A → 100</text>
      <text x="430" y="162" fontSize="9" fill="#5b21b6">key=B → 200</text>
      <text x="430" y="179" fontSize="9" fill="#dc2626">key=A → 150（覆盖100！）</text>
      <text x="430" y="196" fontSize="9" fill="#5b21b6">key=C → 300</text>
      <text x="430" y="220" fontSize="10" fill="#6d28d9" fontWeight="600">适用：用户信息 / 配置更新 / 余额</text>
      <text x="430" y="234" fontSize="10" fill="#6d28d9" fontWeight="600">只关心最新状态</text>

      {/* 流表转换 */}
      <text x="400" y="270" textAnchor="middle" fontSize="13" fontWeight="700" fill="#0f172a">流表二象性（Stream-Table Duality）</text>
      <rect x="100" y="280" width="250" height="35" rx="6" fill="#dbeafe" stroke="#2563eb" />
      <text x="225" y="302" textAnchor="middle" fontSize="10" fill="#1d4ed8">KStream → groupByKey().aggregate() → KTable</text>
      <rect x="450" y="280" width="250" height="35" rx="6" fill="#ede9fe" stroke="#8b5cf6" />
      <text x="575" y="302" textAnchor="middle" fontSize="10" fill="#6d28d9">KTable → toStream() → KStream</text>
      <path d="M350 297 L450 297" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#kfk-st-arrow)" />

      {/* 窗口类型 */}
      <text x="400" y="340" textAnchor="middle" fontSize="14" fontWeight="700" fill="#0f172a">三种窗口类型</text>

      {/* Tumbling */}
      <rect x="30" y="355" width="245" height="110" rx="10" fill="#dbeafe" stroke="#2563eb" strokeWidth="1.5" />
      <text x="152" y="378" textAnchor="middle" fontSize="12" fontWeight="700" fill="#1d4ed8">Tumbling Window（翻滚）</text>
      <rect x="50" y="388" width="55" height="30" rx="3" fill="#3b82f6" opacity="0.7" />
      <text x="77" y="407" textAnchor="middle" fontSize="8" fill="#fff">W1</text>
      <rect x="110" y="388" width="55" height="30" rx="3" fill="#3b82f6" opacity="0.7" />
      <text x="137" y="407" textAnchor="middle" fontSize="8" fill="#fff">W2</text>
      <rect x="170" y="388" width="55" height="30" rx="3" fill="#3b82f6" opacity="0.7" />
      <text x="197" y="407" textAnchor="middle" fontSize="8" fill="#fff">W3</text>
      <text x="152" y="435" textAnchor="middle" fontSize="9" fill="#1e40af">固定大小、不重叠</text>
      <text x="152" y="450" textAnchor="middle" fontSize="9" fill="#1e40af">每事件只属于一个窗口</text>
      <text x="152" y="462" textAnchor="middle" fontSize="9" fill="#1d4ed8">如：每5分钟PV统计</text>

      {/* Hopping */}
      <rect x="290" y="355" width="245" height="110" rx="10" fill="#cffafe" stroke="#0891b2" strokeWidth="1.5" />
      <text x="412" y="378" textAnchor="middle" fontSize="12" fontWeight="700" fill="#0e7490">Hopping Window（跳跃）</text>
      <rect x="310" y="388" width="80" height="30" rx="3" fill="#0891b2" opacity="0.5" />
      <text x="350" y="407" textAnchor="middle" fontSize="8" fill="#fff">W1</text>
      <rect x="340" y="388" width="80" height="30" rx="3" fill="#0891b2" opacity="0.5" />
      <text x="380" y="407" textAnchor="middle" fontSize="8" fill="#fff">W2</text>
      <rect x="370" y="388" width="80" height="30" rx="3" fill="#0891b2" opacity="0.5" />
      <text x="410" y="407" textAnchor="middle" fontSize="8" fill="#fff">W3</text>
      <text x="412" y="435" textAnchor="middle" fontSize="9" fill="#155e75">固定大小、可重叠</text>
      <text x="412" y="450" textAnchor="middle" fontSize="9" fill="#155e75">有 advance 步长</text>
      <text x="412" y="462" textAnchor="middle" fontSize="9" fill="#0e7490">如：5分钟窗口+1分钟步长</text>

      {/* Session */}
      <rect x="550" y="355" width="220" height="110" rx="10" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="660" y="378" textAnchor="middle" fontSize="12" fontWeight="700" fill="#92400e">Session Window（会话）</text>
      <rect x="565" y="390" width="60" height="25" rx="3" fill="#f59e0b" opacity="0.6" />
      <text x="595" y="407" textAnchor="middle" fontSize="8" fill="#fff">S1</text>
      <rect x="660" y="390" width="80" height="25" rx="3" fill="#f59e0b" opacity="0.6" />
      <text x="700" y="407" textAnchor="middle" fontSize="8" fill="#fff">S2</text>
      <text x="660" y="435" textAnchor="middle" fontSize="9" fill="#78350f">动态大小、基于间隔</text>
      <text x="660" y="450" textAnchor="middle" fontSize="9" fill="#78350f">超过 gap 则新会话</text>
      <text x="660" y="462" textAnchor="middle" fontSize="9" fill="#92400e">如：用户会话分析</text>

      {/* 状态存储 */}
      <rect x="30" y="480" width="740" height="85" rx="10" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="400" y="503" textAnchor="middle" fontSize="12" fontWeight="700" fill="#334155">状态存储（State Store）与故障恢复</text>
      <text x="50" y="525" fontSize="10" fill="#475569">本地存储：RocksDB（磁盘） / InMemory · 类型：KeyValueStore / WindowStore / SessionStore</text>
      <text x="50" y="545" fontSize="10" fill="#475569">Changelog Topic：每次状态变更记录到 Kafka Topic（类似binlog） · 故障时从 changelog 重放重建状态</text>
      <text x="50" y="561" fontSize="10" fill="#475569">Standby Replica：其他实例维护备副本，故障时直接切换减少恢复时间</text>
    </svg>
  );
}
