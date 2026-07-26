/**
 * <Jg1FullGcDiagram>：Full GC与退化——触发条件与退化路径图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 520;

export function Jg1FullGcDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Full GC与退化——触发条件与退化路径图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            G1 Full GC——触发条件与退化路径
          </text>

          <defs>
            <marker id="arrFg" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
              <path d="M0,0 L8,4 L0,8 z" fill="var(--text-tertiary)" />
            </marker>
          </defs>

          {/* 正常GC路径 */}
          <rect x="40" y="56" width="310" height="50" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.5" />
          <text x="195" y="78" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">正常路径</text>
          <text x="195" y="96" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">Young GC + Mixed GC → 无 Full GC</text>

          {/* 退化路径 */}
          <text x="40" y="132" fontSize="13" fontWeight="600" fill="var(--danger)">退化路径（触发 Full GC）</text>

          {/* 触发条件1: 疏散失败 */}
          <rect x="40" y="146" width="210" height="70" rx="6" fill="var(--danger)" fillOpacity="0.10" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="145" y="166" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--danger)">① 疏散失败</text>
          <text x="145" y="182" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">evacuation failure</text>
          <text x="145" y="196" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">Survivor/Old 空间不足</text>
          <text x="145" y="208" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">to-space exhausted</text>

          {/* 触发条件2: 并发标记失败 */}
          <rect x="270" y="146" width="210" height="70" rx="6" fill="var(--danger)" fillOpacity="0.10" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="375" y="166" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--danger)">② 标记跟不上分配</text>
          <text x="375" y="182" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">老年代增长过快</text>
          <text x="375" y="196" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">IHOP 过高</text>
          <text x="375" y="208" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">Mixed GC 来不及</text>

          {/* 触发条件3: Humongous分配失败 */}
          <rect x="500" y="146" width="210" height="70" rx="6" fill="var(--danger)" fillOpacity="0.10" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="605" y="166" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--danger)">③ 大对象分配失败</text>
          <text x="605" y="182" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">连续 Free Region 不足</text>
          <text x="605" y="196" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">碎片导致无法分配</text>
          <text x="605" y="208" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">Humongous 对象</text>

          {/* 箭头汇聚到Full GC */}
          <line x1="145" y1="216" x2="350" y2="240" stroke="var(--danger)" strokeWidth="1.5" strokeDasharray="4 2" markerEnd="url(#arrFg)" />
          <line x1="375" y1="216" x2="370" y2="240" stroke="var(--danger)" strokeWidth="1.5" strokeDasharray="4 2" markerEnd="url(#arrFg)" />
          <line x1="605" y1="216" x2="390" y2="240" stroke="var(--danger)" strokeWidth="1.5" strokeDasharray="4 2" markerEnd="url(#arrFg)" />

          {/* Full GC */}
          <rect x="250" y="244" width="240" height="60" rx="8" fill="var(--danger)" fillOpacity="0.20" stroke="var(--danger)" strokeWidth="2" />
          <text x="370" y="268" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--danger)">Full GC（Serial Old）</text>
          <text x="370" y="286" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">单线程 · 全堆 STW · 标记-整理</text>
          <text x="370" y="298" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">停顿可达数秒~数十秒</text>

          {/* Full GC流程 */}
          <text x="40" y="332" fontSize="13" fontWeight="600" fill="var(--accent)">Full GC 执行流程</text>

          {[
            { x: 40, label: "全堆 STW", color: "var(--danger)" },
            { x: 184, label: "全堆标记", color: "var(--warning)" },
            { x: 328, label: "计算新地址", color: "var(--accent)" },
            { x: 472, label: "更新引用", color: "var(--accent)" },
            { x: 600, label: "复制/整理", color: "var(--success)" },
          ].map((s, i) => (
            <g key={i}>
              <rect x={s.x} y="346" width="120" height="44" rx="6" fill={s.color} fillOpacity="0.10" stroke={s.color} strokeWidth="1.2" />
              <text x={s.x + 60} y="366" textAnchor="middle" fontSize="11" fontWeight="600" fill={s.color}>{s.label}</text>
              {i < 4 && <line x1={s.x + 120} y1="368" x2={s.x + 138} y2="368" stroke="var(--text-tertiary)" strokeWidth="1.5" markerEnd="url(#arrFg)" />}
            </g>
          ))}

          {/* 避免策略 */}
          <text x="40" y="418" fontSize="13" fontWeight="600" fill="var(--success)">避免 Full GC 策略</text>

          <rect x="40" y="432" width="670" height="70" rx="8" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="1" strokeOpacity="0.3" />
          <text x="55" y="452" fontSize="11" fill="var(--text-secondary)">调低 IHOP（35%）让 Mixed GC 更早启动 | 增大 G1ReservePercent（20%）应对疏散峰值</text>
          <text x="55" y="470" fontSize="11" fill="var(--text-secondary)">增大 G1HeapRegionSize 减少 Humongous | DisableExplicitGC 防止 System.gc()</text>
          <text x="55" y="488" fontSize="11" fill="var(--text-secondary)">监控 evacuation failure / to-space exhausted | 增大 MetaspaceSize 防止元空间 Full GC</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        G1 Full GC——三种触发条件（疏散失败/标记跟不上/大对象失败）、退化路径、Full GC流程与避免策略
      </figcaption>
    </figure>
  );
}
