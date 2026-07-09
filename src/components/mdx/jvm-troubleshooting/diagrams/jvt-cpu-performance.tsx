/**
 * <JvtCpuPerformanceDiagram>：CPU 性能分析图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 470;

export function JvtCpuPerformanceDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="CPU性能分析图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="26" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            CPU 性能分析：原因分类 + 火焰图 + 慢但CPU低排查
          </text>

          {/* CPU 高的四类原因 */}
          <text x="40" y="54" fontSize="13" fontWeight="600" fill="var(--warning)">CPU 使用率高的四类原因</text>

          <rect x="40" y="62" width="160" height="76" rx="6" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="120" y="82" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">① 计算密集</text>
          <text x="120" y="100" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">复杂算法/正则回溯</text>
          <text x="120" y="116" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">栈顶在业务方法</text>
          <text x="120" y="132" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">业务真忙</text>

          <rect x="210" y="62" width="160" height="76" rx="6" fill="var(--danger)" fillOpacity="0.12" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="290" y="82" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--danger)">② GC 频繁</text>
          <text x="290" y="100" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">堆不足/内存泄漏</text>
          <text x="290" y="116" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">栈顶在 GC 线程</text>
          <text x="290" y="132" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">看 jstat -gc</text>

          <rect x="380" y="62" width="160" height="76" rx="6" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="460" y="82" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">③ 锁竞争自旋</text>
          <text x="460" y="100" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">多线程抢同一锁</text>
          <text x="460" y="116" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">CPU 空转</text>
          <text x="460" y="132" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">jstack 多 BLOCKED</text>

          <rect x="550" y="62" width="150" height="76" rx="6" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="625" y="82" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">④ 上下文切换</text>
          <text x="625" y="100" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">线程数过多</text>
          <text x="625" y="116" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">调度开销大</text>
          <text x="625" y="132" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">vmstat 看 cs</text>

          <text x="370" y="158" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">只有 ① 是业务真忙，②③④ 都是资源浪费，需对症下药</text>

          {/* 火焰图示意 */}
          <text x="40" y="182" fontSize="13" fontWeight="600" fill="var(--accent)">火焰图（Flame Graph）示意</text>
          <rect x="40" y="190" width="660" height="120" rx="8" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" />

          {/* 火焰图模拟栈层 */}
          <rect x="60" y="290" width="620" height="16" rx="2" fill="var(--accent)" fillOpacity="0.18" />
          <text x="370" y="302" textAnchor="middle" fontSize="9" fill="var(--accent)">main() 入口</text>

          <rect x="100" y="272" width="300" height="16" rx="2" fill="var(--warning)" fillOpacity="0.20" />
          <text x="250" y="284" textAnchor="middle" fontSize="9" fill="var(--warning)">handleRequest()</text>

          <rect x="120" y="254" width="220" height="16" rx="2" fill="var(--danger)" fillOpacity="0.24" />
          <text x="230" y="266" textAnchor="middle" fontSize="9" fill="var(--danger)">processOrder()</text>

          <rect x="130" y="236" width="160" height="16" rx="2" fill="var(--danger)" fillOpacity="0.30" />
          <text x="210" y="248" textAnchor="middle" fontSize="9" fill="var(--danger)">regex.match() 热点</text>

          <rect x="500" y="272" width="160" height="16" rx="2" fill="var(--accent)" fillOpacity="0.14" />
          <text x="580" y="284" textAnchor="middle" fontSize="9" fill="var(--accent)">gcWorker()</text>

          <text x="370" y="218" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">横轴=方法栈宽度(CPU占比)，越宽越耗 CPU，找最宽的栈顶=热点</text>

          {/* 慢但 CPU 低排查 */}
          <text x="40" y="334" fontSize="13" fontWeight="600" fill="var(--success)">响应慢但 CPU 不高（在「等」非「忙」）</text>

          <rect x="40" y="342" width="160" height="60" rx="6" fill="var(--success)" fillOpacity="0.10" stroke="var(--success)" strokeWidth="1" />
          <text x="120" y="360" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--success)">IO 阻塞</text>
          <text x="120" y="376" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">慢查询/网络慢</text>
          <text x="120" y="392" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">jstack: socketRead</text>

          <rect x="210" y="342" width="160" height="60" rx="6" fill="var(--success)" fillOpacity="0.10" stroke="var(--success)" strokeWidth="1" />
          <text x="290" y="360" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--success)">锁竞争</text>
          <text x="290" y="376" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">线程 BLOCKED</text>
          <text x="290" y="392" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">jstack: blocked 链</text>

          <rect x="380" y="342" width="160" height="60" rx="6" fill="var(--success)" fillOpacity="0.10" stroke="var(--success)" strokeWidth="1" />
          <text x="460" y="360" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--success)">连接池耗尽</text>
          <text x="460" y="376" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">等 getConnection</text>
          <text x="460" y="392" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">监控池使用率</text>

          <rect x="550" y="342" width="150" height="60" rx="6" fill="var(--success)" fillOpacity="0.10" stroke="var(--success)" strokeWidth="1" />
          <text x="625" y="360" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--success)">GC 偶发 STW</text>
          <text x="625" y="376" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">平均CPU不高</text>
          <text x="625" y="392" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">GC日志看长pause</text>

          {/* 排查口诀 */}
          <rect x="40" y="416" width="660" height="40" rx="6" fill="var(--text-primary)" fillOpacity="0.06" stroke="var(--text-primary)" strokeWidth="1" strokeOpacity="0.3" />
          <text x="370" y="436" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">口诀：CPU 高看栈顶（业务/GC/锁/切换），CPU 低看等待（IO/锁/池/STW）</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        CPU 性能分析——四类 CPU 高原因（计算/GC/锁/切换）、火焰图定位热点、慢但 CPU 低的阻塞排查
      </figcaption>
    </figure>
  );
}
