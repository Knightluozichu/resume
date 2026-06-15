/**
 * <GcAllocDiagram>：GC 分配热点——堆分配、GC 三阶段、对象生命周期与 Profiler 热点识别。
 */

export function GcAllocDiagram() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox="0 0 640 340"
          role="img"
          aria-label="GC 分配热点：托管堆分配 → 触发 GC → Mark·Sweep·Compact 三阶段 → 释放未使用内存"
          className="mx-auto block h-auto w-full max-w-[640px]"
        >
          <text
            x="320"
            y="24"
            textAnchor="middle"
            fontSize="13"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            GC 分配与回收全流程
          </text>

          {/* Managed Heap allocation */}
          <text x="80" y="54" fontSize="11" fontWeight="600" fill="var(--text-primary)">
            托管堆
          </text>
          <rect x="24" y="62" width="200" height="28" rx="4" fill="var(--bg-elevated)" stroke="var(--border)" />
          <text x="124" y="80" textAnchor="middle" fontSize="9" fill="var(--danger)">
            new Object() 分配在此
          </text>

          {/* Heap growth visualization */}
          {[0, 1, 2, 3, 4, 5, 6].map((i) => (
            <rect
              key={i}
              x={28 + i * 28}
              y={100}
              width={22}
              height={18}
              rx="3"
              fill={i < 4 ? "var(--danger)" : "var(--bg)"}
              opacity={i < 4 ? 0.5 + i * 0.12 : 0.3}
              stroke={i === 0 ? "var(--danger)" : "var(--border)"}
              strokeWidth={i === 0 ? 1.5 : 0.5}
            />
          ))}
          <text x="124" y="138" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">
            持续分配，堆逐渐填满
          </text>

          {/* Arrow to GC trigger — 水平居中于 managed-heap 和 GC三阶段之间 */}
          <line x1="224" y1="76" x2="254" y2="76" stroke="var(--accent)" strokeWidth="1.5" markerEnd="url(#gc-arrow)" />
          <text x="239" y="68" textAnchor="middle" fontSize="9" fill="var(--accent)">
            堆满
          </text>

          {/* GC Three-Phase Process */}
          <text x="440" y="54" fontSize="11" fontWeight="600" fill="var(--text-primary)">
            GC 三阶段
          </text>

          {/* Mark */}
          <rect x="260" y="62" width="160" height="24" rx="4" fill="var(--bg-elevated)" stroke="var(--accent)" strokeWidth="1" />
          <text x="340" y="78" textAnchor="middle" fontSize="9" fill="var(--text-primary)">
            <tspan fontWeight="600" fill="var(--accent)">① Mark</tspan> 标记所有可达对象
          </text>

          {/* Sweep */}
          <rect x="260" y="90" width="160" height="24" rx="4" fill="var(--bg-elevated)" stroke="var(--accent)" strokeWidth="1" />
          <text x="340" y="106" textAnchor="middle" fontSize="9" fill="var(--text-primary)">
            <tspan fontWeight="600" fill="var(--accent)">② Sweep</tspan> 回收不可达对象
          </text>

          {/* Compact */}
          <rect x="260" y="118" width="160" height="24" rx="4" fill="var(--bg-elevated)" stroke="var(--accent)" strokeWidth="1" />
          <text x="340" y="134" textAnchor="middle" fontSize="9" fill="var(--text-primary)">
            <tspan fontWeight="600" fill="var(--accent)">③ Compact</tspan> 整理碎片化内存
          </text>

          {/* Result after GC */}
          {[0, 1, 2, 3, 4, 5, 6].map((i) => (
            <rect
              key={"after" + i}
              x={300 + i * 28}
              y={152}
              width={22}
              height={18}
              rx="3"
              fill={i < 2 ? "var(--success)" : "var(--bg)"}
              opacity={i < 2 ? 0.7 : 0.3}
              stroke={i === 0 ? "var(--success)" : "var(--border)"}
              strokeWidth={i === 0 ? 1.5 : 0.5}
            />
          ))}
          <text x="380" y="186" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">
            GC 后仅存活对象保留
          </text>

          {/* Bottom: GC Alloc in Profiler */}
          <text x="320" y="216" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">
            Profiler 中的 GC 热点
          </text>

          <rect x="60" y="226" width="520" height="48" rx="6" fill="var(--bg)" stroke="var(--border)" />

          {/* Profiler bars */}
          <rect x="80" y="234" width="140" height="8" rx="2" fill="var(--bg-elevated)" />
          <rect x="80" y="234" width="80" height="8" rx="2" fill="var(--danger)" opacity="0.6" />
          <text x="80" y="258" fontSize="8" fill="var(--danger)">
            GC.Alloc ↑ 频繁 new
          </text>

          <rect x="250" y="234" width="140" height="8" rx="2" fill="var(--bg-elevated)" />
          <rect x="250" y="234" width="30" height="8" rx="2" fill="var(--warning)" opacity="0.6" />
          <text x="250" y="258" fontSize="8" fill="var(--warning)">
            GC.Collect 偶尔触发
          </text>

          <rect x="420" y="234" width="140" height="8" rx="2" fill="var(--bg-elevated)" />
          <rect x="420" y="234" width="5" height="8" rx="2" fill="var(--success)" opacity="0.6" />
          <text x="420" y="258" fontSize="8" fill="var(--success)">
            对象池化后 GC 平稳
          </text>

          {/* Bottom tip */}
          <text x="320" y="296" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">
            每帧 new 大量临时对象 → GC.Alloc 飙升 → 触发 GC.Collect → 帧时间抖动
          </text>

          <text x="320" y="316" textAnchor="middle" fontSize="10" fill="var(--accent)">
            解法：对象池 · 结构体替代类 · 缓存引用 · 拆大对象为值类型
          </text>
          <defs>
            <marker id="gc-arrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
              <path d="M0 0 L8 4 L0 8 z" fill="var(--accent)" />
            </marker>
          </defs>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        托管堆持续分配 → 堆满触发 GC Mark·Sweep·Compact → 暂停帧。Profiler 中 GC.Alloc 居高是对象池化的信号。
      </figcaption>
    </figure>
  );
}
