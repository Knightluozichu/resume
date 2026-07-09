"use client";

export function PhaCachingPatternsDiagram() {
  return (
    <svg viewBox="0 0 800 540" className="w-full h-auto" role="img" aria-label="缓存读写模式与一致性策略">
      <defs>
        <marker id="pha-cp-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
        <marker id="pha-cp-arrow-r" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#ef4444" />
        </marker>
      </defs>

      <text x="400" y="28" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">缓存读写模式</text>

      {/* Cache-Aside（旁路缓存） */}
      <rect x="20" y="50" width="370" height="220" rx="10" fill="#dbeafe" stroke="#2563eb" strokeWidth="1.5" />
      <text x="205" y="75" textAnchor="middle" fontSize="13" fontWeight="700" fill="#1d4ed8">Cache-Aside 旁路缓存（最常用）</text>
      <text x="205" y="100" textAnchor="middle" fontSize="11" fontWeight="600" fill="#1e40af">读流程：</text>
      <text x="35" y="120" fontSize="10" fill="#3b82f6">① 读 Cache → 命中则返回</text>
      <text x="35" y="138" fontSize="10" fill="#3b82f6">② 未命中 → 读 DB → 写回 Cache → 返回</text>
      <text x="205" y="163" textAnchor="middle" fontSize="11" fontWeight="600" fill="#1e40af">写流程：</text>
      <text x="35" y="183" fontSize="10" fill="#3b82f6">③ 更新 DB → 删除 Cache（而非更新）</text>
      <text x="35" y="210" fontSize="9" fill="#64748b">优点：简单 / 缓存可独立失败</text>
      <text x="35" y="228" fontSize="9" fill="#dc2626">风险：首次未命中穿透 / 并发写致脏读</text>
      <text x="35" y="246" fontSize="9" fill="#dc2626">对策：延迟双删 / 缓存预热</text>

      {/* Read/Write-Through */}
      <rect x="410" y="50" width="370" height="220" rx="10" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="595" y="75" textAnchor="middle" fontSize="13" fontWeight="700" fill="#92400e">Read/Write-Through 穿透读写</text>
      <text x="595" y="100" textAnchor="middle" fontSize="11" fontWeight="600" fill="#78350f">读写都经过缓存层代理：</text>
      <text x="425" y="120" fontSize="10" fill="#d97706">Read-Through：未命中由缓存服务回源</text>
      <text x="425" y="138" fontSize="10" fill="#d97706">Write-Through：写缓存 + 同步写 DB</text>
      <text x="425" y="163" fontSize="11" fontWeight="600" fill="#78350f">Write-Behind（异步写回）：</text>
      <text x="425" y="183" fontSize="10" fill="#d97706">写缓存 → 异步批量刷 DB</text>
      <text x="425" y="210" fontSize="9" fill="#64748b">优点：对应用透明 / 写性能高</text>
      <text x="425" y="228" fontSize="9" fill="#dc2626">风险：Write-Behind 宕机丢数据</text>
      <text x="425" y="246" fontSize="9" fill="#dc2626">对策：WAL日志 / 持久化队列</text>

      {/* 缓存一致性策略 */}
      <text x="400" y="300" textAnchor="middle" fontSize="14" fontWeight="700" fill="#0f172a">缓存一致性 · 更新 vs 删除</text>

      <rect x="20" y="315" width="370" height="100" rx="8" fill="#ede9fe" stroke="#8b5cf6" strokeWidth="1.5" />
      <text x="205" y="338" textAnchor="middle" fontSize="12" fontWeight="700" fill="#6d28d9">先更新DB → 再删除Cache</text>
      <text x="35" y="360" fontSize="10" fill="#5b21b6">推荐方案。问题：并发读回填脏数据</text>
      <text x="35" y="378" fontSize="10" fill="#5b21b6">对策：延迟双删（删→等→再删）</text>
      <text x="35" y="396" fontSize="10" fill="#5b21b6">或：基于 Canal/Debezium 监听 binlog 删缓存</text>

      <rect x="410" y="315" width="370" height="100" rx="8" fill="#fee2e2" stroke="#ef4444" strokeWidth="1.5" />
      <text x="595" y="338" textAnchor="middle" fontSize="12" fontWeight="700" fill="#b91c1c">先删Cache → 再更新DB</text>
      <text x="425" y="360" fontSize="10" fill="#991b1b">不推荐。问题：并发读在删后回填旧值</text>
      <text x="425" y="378" fontSize="10" fill="#991b1b">脏数据窗口 = DB写入延迟</text>
      <text x="425" y="396" fontSize="10" fill="#991b1b">对策：延迟双删 / 读写串行化</text>

      {/* 三大经典问题 */}
      <text x="400" y="445" textAnchor="middle" fontSize="14" fontWeight="700" fill="#0f172a">缓存三大经典问题</text>
      <rect x="20" y="460" width="240" height="65" rx="8" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="140" y="483" textAnchor="middle" fontSize="11" fontWeight="700" fill="#92400e">缓存穿透</text>
      <text x="140" y="503" textAnchor="middle" fontSize="9" fill="#78350f">查不存在的Key → 直达DB</text>
      <text x="140" y="517" textAnchor="middle" fontSize="9" fill="#d97706">对策：空值缓存 / 布隆过滤器</text>

      <rect x="280" y="460" width="240" height="65" rx="8" fill="#ede9fe" stroke="#8b5cf6" strokeWidth="1.5" />
      <text x="400" y="483" textAnchor="middle" fontSize="11" fontWeight="700" fill="#6d28d9">缓存击穿</text>
      <text x="400" y="503" textAnchor="middle" fontSize="9" fill="#5b21b6">热点Key过期 → 并发回源</text>
      <text x="400" y="517" textAnchor="middle" fontSize="9" fill="#8b5cf6">对策：互斥锁 / 永不过期+异步刷新</text>

      <rect x="540" y="460" width="240" height="65" rx="8" fill="#fee2e2" stroke="#ef4444" strokeWidth="1.5" />
      <text x="660" y="483" textAnchor="middle" fontSize="11" fontWeight="700" fill="#b91c1c">缓存雪崩</text>
      <text x="660" y="503" textAnchor="middle" fontSize="9" fill="#991b1b">大量Key同时过期 → DB崩溃</text>
      <text x="660" y="517" textAnchor="middle" fontSize="9" fill="#ef4444">对策：过期时间加随机 / 多级缓存</text>
    </svg>
  );
}
