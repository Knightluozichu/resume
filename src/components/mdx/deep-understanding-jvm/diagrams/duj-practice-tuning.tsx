/**
 * <DujPracticeTuningDiagram>：JVM实战调优流程与工具图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 480;

export function DujPracticeTuningDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="JVM实战调优流程与工具图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="26" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            JVM实战调优：监控 → 分析 → 调整 → 验证
          </text>

          {/* 调优流程 */}
          <rect x="30" y="50" width="155" height="60" rx="8" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="107" y="74" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--warning)">1. 监控</text>
          <text x="107" y="90" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">jstat / GC 日志</text>
          <text x="107" y="102" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">JMX / Prometheus</text>

          <text x="195" y="84" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="210" y="50" width="155" height="60" rx="8" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="287" y="74" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">2. 分析</text>
          <text x="287" y="90" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">jmap dump / MAT</text>
          <text x="287" y="102" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">jstack 线程分析</text>

          <text x="375" y="84" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="390" y="50" width="155" height="60" rx="8" fill="var(--danger)" fillOpacity="0.10" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="467" y="74" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--danger)">3. 调整</text>
          <text x="467" y="90" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">JVM 参数调优</text>
          <text x="467" y="102" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">代码/架构优化</text>

          <text x="555" y="84" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="570" y="50" width="140" height="60" rx="8" fill="var(--success)" fillOpacity="0.10" stroke="var(--success)" strokeWidth="1.2" />
          <text x="640" y="74" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">4. 验证</text>
          <text x="640" y="90" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">压测对比</text>
          <text x="640" y="102" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">指标回归</text>

          {/* 常见问题与参数 */}
          <text x={VIEW_W / 2} y="140" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">常见调优场景与关键参数</text>

          {/* 场景1 */}
          <rect x="30" y="152" width="335" height="90" rx="8" fill="var(--warning)" fillOpacity="0.06" stroke="var(--warning)" strokeWidth="1" strokeOpacity="0.4" />
          <text x="197" y="172" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">频繁 Full GC</text>
          <text x="50" y="190" fontSize="11" fill="var(--text-secondary)">原因：老年代空间不足 / 大对象 / 内存泄漏</text>
          <text x="50" y="206" fontSize="11" fill="var(--text-secondary)">参数：-Xmx / -Xms / -XX:NewRatio</text>
          <text x="50" y="222" fontSize="11" fill="var(--text-secondary)">      -XX:MaxTenuringThreshold / -XX:PretenureSizeThreshold</text>
          <text x="50" y="236" fontSize="11" fill="var(--danger)">工具：jstat -gcutil / jmap -histo / GC 日志</text>

          {/* 场景2 */}
          <rect x="380" y="152" width="330" height="90" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.4" />
          <text x="545" y="172" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">OOM 排查</text>
          <text x="400" y="190" fontSize="11" fill="var(--text-secondary)">原因：堆溢出 / 元空间溢出 / 直接内存溢出</text>
          <text x="400" y="206" fontSize="11" fill="var(--text-secondary)">参数：-XX:+HeapDumpOnOutOfMemoryError</text>
          <text x="400" y="222" fontSize="11" fill="var(--text-secondary)">      -XX:HeapDumpPath / -XX:MaxMetaspaceSize</text>
          <text x="400" y="236" fontSize="11" fill="var(--danger)">工具：MAT 分析 dump / jcmd / Arthas</text>

          {/* 场景3 */}
          <rect x="30" y="256" width="335" height="90" rx="8" fill="var(--danger)" fillOpacity="0.06" stroke="var(--danger)" strokeWidth="1" strokeOpacity="0.4" />
          <text x="197" y="276" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--danger)">GC 停顿过长（STW）</text>
          <text x="50" y="294" fontSize="11" fill="var(--text-secondary)">原因：Full GC / CMS Concurrent Mode Failure</text>
          <text x="50" y="310" fontSize="11" fill="var(--text-secondary)">参数：-XX:MaxGCPauseMillis（G1）</text>
          <text x="50" y="326" fontSize="11" fill="var(--text-secondary)">      -XX:G1HeapRegionSize / -XX:InitiatingHeapOccupancyPercent</text>
          <text x="50" y="340" fontSize="11" fill="var(--danger)">策略：CMS → G1 → ZGC 迁移</text>

          {/* 场景4 */}
          <rect x="380" y="256" width="330" height="90" rx="8" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="1" strokeOpacity="0.4" />
          <text x="545" y="276" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">吞吐量优化</text>
          <text x="400" y="294" fontSize="11" fill="var(--text-secondary)">目标：减少 GC 时间占比</text>
          <text x="400" y="310" fontSize="11" fill="var(--text-secondary)">参数：-XX:GCTimeRatio（GC时间占比 1/N）</text>
          <text x="400" y="326" fontSize="11" fill="var(--text-secondary)">      -XX:MaxGCMinorPauseMillis / -XX:+UseParallelGC</text>
          <text x="400" y="340" fontSize="11" fill="var(--danger)">策略：Parallel Scavenge + Parallel Old</text>

          {/* 工具链 */}
          <text x={VIEW_W / 2} y="376" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">调优工具链</text>

          <rect x="30" y="388" width="105" height="36" rx="6" fill="var(--warning)" fillOpacity="0.08" stroke="var(--warning)" strokeWidth="1" />
          <text x="82" y="410" textAnchor="middle" fontSize="11" fill="var(--warning)">jps / jstat</text>

          <rect x="145" y="388" width="105" height="36" rx="6" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="1" />
          <text x="197" y="410" textAnchor="middle" fontSize="11" fill="var(--accent)">jmap / jhat</text>

          <rect x="260" y="388" width="105" height="36" rx="6" fill="var(--danger)" fillOpacity="0.08" stroke="var(--danger)" strokeWidth="1" />
          <text x="312" y="410" textAnchor="middle" fontSize="11" fill="var(--danger)">jstack / jcmd</text>

          <rect x="375" y="388" width="105" height="36" rx="6" fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" strokeWidth="1" />
          <text x="427" y="410" textAnchor="middle" fontSize="11" fill="var(--success)">MAT / JProfiler</text>

          <rect x="490" y="388" width="105" height="36" rx="6" fill="var(--text-primary)" fillOpacity="0.06" stroke="var(--text-primary)" strokeWidth="1" />
          <text x="542" y="410" textAnchor="middle" fontSize="11" fill="var(--text-primary)">Arthas</text>

          <rect x="605" y="388" width="105" height="36" rx="6" fill="var(--text-primary)" fillOpacity="0.06" stroke="var(--text-primary)" strokeWidth="1" />
          <text x="657" y="410" textAnchor="middle" fontSize="11" fill="var(--text-primary)">GCViewer</text>

          <text x={VIEW_W / 2} y="450" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">原则：先量化再调优；一次只改一个参数；有基线才能对比</text>
          <text x={VIEW_W / 2} y="466" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">-Xlog:gc*（JDK 9+）/ -XX:+PrintGCDetails（JDK 8）</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        JVM实战调优四步法——监控、分析、调整、验证，覆盖频繁Full GC、OOM、停顿过长、吞吐量优化四大场景
      </figcaption>
    </figure>
  );
}
