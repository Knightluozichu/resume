"use client";

export function HpmSchemaDesignDiagram() {
  return (
    <svg viewBox="0 0 800 560" className="w-full h-auto" role="img" aria-label="Schema设计原则与模式">
      <defs>
        <linearGradient id="hpm-sch-dt" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="hpm-sch-norm" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0891b2" />
          <stop offset="100%" stopColor="#0e7490" />
        </linearGradient>
        <marker id="hpm-sch-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="28" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">Schema 设计 · 原则与模式</text>

      {/* 数据类型选择 */}
      <text x="200" y="58" textAnchor="middle" fontSize="14" fontWeight="700" fill="#1d4ed8">数据类型选择原则</text>
      <rect x="40" y="70" width="360" height="170" rx="8" fill="#eff6ff" stroke="#3b82f6" />
      <text x="60" y="93" fontSize="11" fontWeight="700" fill="#1d4ed8">最小够用</text>
      <text x="160" y="93" fontSize="11" fill="#1e3a8a">用 INT 装得下别用 BIGINT</text>
      <text x="60" y="115" fontSize="11" fontWeight="700" fill="#1d4ed8">整数</text>
      <text x="160" y="115" fontSize="11" fill="#1e3a8a">TINYINT/SMALLINT/INT/BIGINT</text>
      <text x="60" y="137" fontSize="11" fontWeight="700" fill="#1d4ed8">实数</text>
      <text x="160" y="137" fontSize="11" fill="#1e3a8a">DECIMAL 精确（金额）/ FLOAT 近似</text>
      <text x="60" y="159" fontSize="11" fontWeight="700" fill="#1d4ed8">字符串</text>
      <text x="160" y="159" fontSize="11" fill="#1e3a8a">VARCHAR 变长 / CHAR 定长</text>
      <text x="60" y="181" fontSize="11" fontWeight="700" fill="#dc2626">慎用</text>
      <text x="160" y="181" fontSize="11" fill="#991b1b">BLOB/TEXT 大对象 / ENUM</text>
      <text x="60" y="203" fontSize="11" fontWeight="700" fill="#1d4ed8">时间</text>
      <text x="160" y="203" fontSize="11" fill="#1e3a8a">DATETIME / TIMESTAMP（范围小）</text>
      <text x="60" y="225" fontSize="10" fill="#1d4ed8">主键用整数自增，存储与索引都高效</text>

      {/* 范式 vs 反范式 */}
      <text x="600" y="58" textAnchor="middle" fontSize="14" fontWeight="700" fill="#0e7490">范式 vs 反范式</text>
      <rect x="420" y="70" width="170" height="80" rx="6" fill="#ecfeff" stroke="#0891b2" />
      <text x="505" y="90" textAnchor="middle" fontSize="12" fontWeight="700" fill="#0e7490">范式 Normalized</text>
      <text x="505" y="108" textAnchor="middle" fontSize="10" fill="#155e75">每事实存一处</text>
      <text x="505" y="124" textAnchor="middle" fontSize="10" fill="#155e75">冗余少 更新快</text>
      <text x="505" y="140" textAnchor="middle" fontSize="10" fill="#0e7490">查询需 JOIN 多</text>

      <rect x="610" y="70" width="150" height="80" rx="6" fill="#fef3c7" stroke="#f59e0b" />
      <text x="685" y="90" textAnchor="middle" fontSize="12" fontWeight="700" fill="#92400e">反范式 Denorm</text>
      <text x="685" y="108" textAnchor="middle" fontSize="10" fill="#78350f">冗余存多份</text>
      <text x="685" y="124" textAnchor="middle" fontSize="10" fill="#78350f">查询快免 JOIN</text>
      <text x="685" y="140" textAnchor="middle" fontSize="10" fill="#92400e">更新慢 易不一致</text>

      <rect x="420" y="160" width="340" height="80" rx="6" fill="#f1f5f9" stroke="#64748b" />
      <text x="590" y="182" textAnchor="middle" fontSize="11" fontWeight="700" fill="#334155">实践：混合策略</text>
      <text x="590" y="202" textAnchor="middle" fontSize="10" fill="#475569">联机事务用范式保证一致</text>
      <text x="590" y="220" textAnchor="middle" fontSize="10" fill="#475569">高频读/统计场景适度反范式冗余</text>
      <text x="590" y="236" textAnchor="middle" fontSize="10" fill="#475569">用缓存表/汇总表隔离读写压力</text>

      {/* 缓存表与汇总表 */}
      <text x="400" y="270" textAnchor="middle" fontSize="14" fontWeight="700" fill="#6d28d9">加速读的衍生表</text>
      <rect x="40" y="285" width="240" height="130" rx="8" fill="#ede9fe" stroke="#8b5cf6" />
      <text x="160" y="307" textAnchor="middle" fontSize="12" fontWeight="700" fill="#6d28d9">缓存表 Cache Table</text>
      <text x="160" y="327" textAnchor="middle" fontSize="10" fill="#5b21b6">存耗时装算的结果</text>
      <text x="160" y="345" textAnchor="middle" fontSize="10" fill="#5b21b6">如：状态计数/汇总值</text>
      <text x="160" y="363" textAnchor="middle" fontSize="10" fill="#5b21b6">可容忍短期过期</text>
      <text x="160" y="385" textAnchor="middle" fontSize="10" fill="#6d28d9">定期刷新 / 触发更新</text>
      <text x="160" y="403" textAnchor="middle" fontSize="10" fill="#7c3aed">降低主表 CPU 压力</text>

      <rect x="290" y="285" width="240" height="130" rx="8" fill="#dbeafe" stroke="#3b82f6" />
      <text x="410" y="307" textAnchor="middle" fontSize="12" fontWeight="700" fill="#1e40af">汇总表 Summary Table</text>
      <text x="410" y="327" textAnchor="middle" fontSize="10" fill="#1e3a8a">预聚合统计数据</text>
      <text x="410" y="345" textAnchor="middle" fontSize="10" fill="#1e3a8a">如：按日/小时维表</text>
      <text x="410" y="363" textAnchor="middle" fontSize="10" fill="#1e3a8a">GROUP BY 结果落表</text>
      <text x="410" y="385" textAnchor="middle" fontSize="10" fill="#1e40af">查询直接查汇总表</text>
      <text x="410" y="403" textAnchor="middle" fontSize="10" fill="#1d4ed8">报表/OLAP 场景必备</text>

      <rect x="540" y="285" width="220" height="130" rx="8" fill="#d1fae5" stroke="#10b981" />
      <text x="650" y="307" textAnchor="middle" fontSize="12" fontWeight="700" fill="#059669">物化视图/计数表</text>
      <text x="650" y="327" textAnchor="middle" fontSize="10" fill="#047857">计数表存聚合指标</text>
      <text x="650" y="345" textAnchor="middle" fontSize="10" fill="#047857">用 INSERT ... ON DUP</text>
      <text x="650" y="361" textAnchor="middle" fontSize="10" fill="#047857">KEY UPDATE 原子维护</text>
      <text x="650" y="385" textAnchor="middle" fontSize="10" fill="#059669">避免 COUNT(*) 全扫</text>
      <text x="650" y="403" textAnchor="middle" fontSize="10" fill="#047857">高频计数场景</text>

      {/* Schema 陷阱 */}
      <rect x="40" y="430" width="720" height="110" rx="10" fill="#fef2f2" stroke="#ef4444" strokeWidth="1.5" />
      <text x="400" y="453" textAnchor="middle" fontSize="13" fontWeight="700" fill="#dc2626">Schema 设计常见陷阱</text>
      <text x="400" y="476" textAnchor="middle" fontSize="11" fill="#991b1b">① 太多 JOIN：过度范式化导致十几表关联，查询爆炸</text>
      <text x="400" y="496" textAnchor="middle" fontSize="11" fill="#991b1b">② ENUM 陷阱：枚举值变动需改表结构，且无法扩展</text>
      <text x="400" y="516" textAnchor="middle" fontSize="11" fill="#991b1b">③ 变长列过度使用 / NULL 语义混乱 / 隐式类型转换</text>
      <text x="400" y="533" textAnchor="middle" fontSize="11" fill="#dc2626">原则：为查询设计，关注数据量级与访问模式</text>
    </svg>
  );
}
