"use client";

export function HpmMonitoringDiagram() {
  return (
    <svg viewBox="0 0 800 560" className="w-full h-auto" role="img" aria-label="监控与诊断体系">
      <defs>
        <linearGradient id="hpm-mon-src" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0d9488" />
          <stop offset="100%" stopColor="#0f766e" />
        </linearGradient>
        <linearGradient id="hpm-mon-meth" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0891b2" />
          <stop offset="100%" stopColor="#0e7490" />
        </linearGradient>
        <marker id="hpm-mon-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="28" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">监控与诊断 · 信息源与方法</text>

      {/* 信息源 */}
      <text x="200" y="58" textAnchor="middle" fontSize="14" fontWeight="700" fill="#0f766e">数据信息源</text>
      <rect x="40" y="70" width="360" height="240" rx="8" fill="#ccfbf1" stroke="#0d9488" />

      <rect x="55" y="82" width="330" height="40" rx="4" fill="#99f6e4" stroke="#0d9488" />
      <text x="220" y="100" textAnchor="middle" fontSize="11" fontWeight="700" fill="#0f766e">SHOW STATUS / SHOW VARIABLES</text>
      <text x="220" y="115" textAnchor="middle" fontSize="10" fill="#115e59">会话与全局计数器（Com_*/Innodb_*）</text>

      <rect x="55" y="128" width="330" height="40" rx="4" fill="#5eead4" stroke="#0d9488" />
      <text x="220" y="146" textAnchor="middle" fontSize="11" fontWeight="700" fill="#134e4a">Performance Schema</text>
      <text x="220" y="161" textAnchor="middle" fontSize="10" fill="#115e59">细粒度事件计时（等待/锁/IO/语句）</text>

      <rect x="55" y="174" width="330" height="40" rx="4" fill="#2dd4bf" stroke="#0f766e" />
      <text x="220" y="192" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">sys Schema</text>
      <text x="220" y="207" textAnchor="middle" fontSize="10" fill="#ccfbf1">Performance Schema 的易读视图</text>

      <rect x="55" y="220" width="330" height="40" rx="4" fill="#14b8a6" stroke="#0f766e" />
      <text x="220" y="238" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">慢查询日志 Slow Log</text>
      <text x="220" y="253" textAnchor="middle" fontSize="10" fill="#ccfbf1">超阈值查询 + 扫描行数/耗时</text>

      <rect x="55" y="266" width="330" height="40" rx="4" fill="#0d9488" stroke="#115e59" />
      <text x="220" y="284" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">EXPLAIN / processlist</text>
      <text x="220" y="299" textAnchor="middle" fontSize="10" fill="#a7f3d0">执行计划 + 实时连接状态</text>

      {/* 诊断方法 */}
      <text x="600" y="58" textAnchor="middle" fontSize="14" fontWeight="700" fill="#0e7490">诊断方法论</text>
      <rect x="420" y="70" width="340" height="240" rx="8" fill="#ecfeff" stroke="#0891b2" />

      <text x="590" y="95" textAnchor="middle" fontSize="12" fontWeight="700" fill="#0e7490">自顶向下分析</text>
      <text x="440" y="116" fontSize="10" fill="#155e75">1. 应用层 → 是否真的数据库问题</text>
      <text x="440" y="134" fontSize="10" fill="#155e75">2. 实例层 → SHOW PROCESSLIST 找异常会话</text>
      <text x="440" y="152" fontSize="10" fill="#155e75">3. 语句层 → 慢日志找耗时查询</text>
      <text x="440" y="170" fontSize="10" fill="#155e75">4. 执行计划 → EXPLAIN 看访问类型</text>
      <text x="440" y="188" fontSize="10" fill="#155e75">5. 资源层 → CPU/IO/内存谁满</text>

      <line x1="440" y1="200" x2="740" y2="200" stroke="#0891b2" strokeWidth="1" opacity="0.4" />

      <text x="590" y="220" textAnchor="middle" fontSize="12" fontWeight="700" fill="#0e7490">等待事件分析</text>
      <text x="440" y="240" fontSize="10" fill="#155e75">Performance Schema 等待事件</text>
      <text x="440" y="258" fontSize="10" fill="#155e75">定位锁等待 / IO 等待 / 互斥量</text>
      <text x="440" y="276" fontSize="10" fill="#155e75">谁在等、等什么、等了多久</text>
      <text x="440" y="294" fontSize="10" fill="#0e7490">→ 找到根因而非症状</text>

      {/* 关键指标 */}
      <text x="400" y="332" textAnchor="middle" fontSize="14" fontWeight="700" fill="#92400e">关键监控指标</text>
      <rect x="40" y="344" width="175" height="90" rx="6" fill="#fef3c7" stroke="#f59e0b" />
      <text x="127" y="364" textAnchor="middle" fontSize="11" fontWeight="700" fill="#92400e">吞吐量</text>
      <text x="127" y="382" textAnchor="middle" fontSize="10" fill="#78350f">QPS / TPS</text>
      <text x="127" y="400" textAnchor="middle" fontSize="10" fill="#78350f">每秒查询/事务数</text>
      <text x="127" y="424" textAnchor="middle" fontSize="10" fill="#92400e">业务容量基线</text>

      <rect x="230" y="344" width="175" height="90" rx="6" fill="#fee2e2" stroke="#ef4444" />
      <text x="317" y="364" textAnchor="middle" fontSize="11" fontWeight="700" fill="#dc2626">响应时间</text>
      <text x="317" y="382" textAnchor="middle" fontSize="10" fill="#991b1b">查询延迟分布</text>
      <text x="317" y="400" textAnchor="middle" fontSize="10" fill="#991b1b">P95 / P99</text>
      <text x="317" y="424" textAnchor="middle" fontSize="10" fill="#dc2626">用户体验关键</text>

      <rect x="420" y="344" width="175" height="90" rx="6" fill="#dbeafe" stroke="#3b82f6" />
      <text x="507" y="364" textAnchor="middle" fontSize="11" fontWeight="700" fill="#1e40af">并发与资源</text>
      <text x="507" y="382" textAnchor="middle" fontSize="10" fill="#1e3a8a">Threads_connected</text>
      <text x="507" y="400" textAnchor="middle" fontSize="10" fill="#1e3a8a">CPU / IO 利用率</text>
      <text x="507" y="424" textAnchor="middle" fontSize="10" fill="#1e40af">Buffer Pool 命中率</text>

      <rect x="610" y="344" width="150" height="90" rx="6" fill="#ede9fe" stroke="#8b5cf6" />
      <text x="685" y="364" textAnchor="middle" fontSize="11" fontWeight="700" fill="#6d28d9">复制健康</text>
      <text x="685" y="382" textAnchor="middle" fontSize="10" fill="#5b21b6">主从延迟</text>
      <text x="685" y="400" textAnchor="middle" fontSize="10" fill="#5b21b6">复制状态</text>
      <text x="685" y="424" textAnchor="middle" fontSize="10" fill="#6d28d9">GTID 一致性</text>

      {/* 诊断流程 */}
      <rect x="40" y="448" width="720" height="92" rx="10" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="400" y="471" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">诊断闭环</text>
      <text x="400" y="493" textAnchor="middle" fontSize="11" fill="#475569">测量 → 假设 → 验证 → 改动 → 再测量（单变量迭代）</text>
      <text x="400" y="513" textAnchor="middle" fontSize="11" fill="#475569">区分「症状」（慢）与「根因」（缺索引/锁等待/IO 饱和）</text>
      <text x="400" y="532" textAnchor="middle" fontSize="11" fill="#0f766e">持续监控 + 告警基线，而非出问题才查</text>
    </svg>
  );
}
