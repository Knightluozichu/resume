/**
 * <Jg1G1OverviewDiagram>：G1收集器概述——Region类型与三色标记图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 520;

export function Jg1G1OverviewDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="G1收集器概述图解——Region类型与三色标记"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            G1收集器——Region类型与三色标记
          </text>

          {/* 上半部：堆内存Region布局 */}
          <text x="40" y="58" fontSize="13" fontWeight="600" fill="var(--accent)">堆内存 Region 布局</text>

          {/* Region网格 8x2 */}
          {Array.from({ length: 16 }, (_, i) => {
            const col = i % 8;
            const row = Math.floor(i / 8);
            const x = 40 + col * 82;
            const y = 72 + row * 44;
            const types = ["E", "S", "E", "O", "E", "H", "H", "O", "E", "S", "E", "O", "F", "E", "S", "O"];
            const colors: Record<string, string> = {
              E: "var(--warning)", S: "var(--success)", O: "var(--accent)", H: "var(--danger)", F: "var(--text-tertiary)",
            };
            const labels: Record<string, string> = {
              E: "Eden", S: "Surv", O: "Old", H: "Humon", F: "Free",
            };
            const t = types[i];
            return (
              <g key={i}>
                <rect x={x} y={y} width="76" height="36" rx="4" fill={colors[t]} fillOpacity="0.15" stroke={colors[t]} strokeWidth="1" />
                <text x={x + 38} y={y + 22} textAnchor="middle" fontSize="11" fontWeight="600" fill={colors[t]}>{labels[t]}</text>
              </g>
            );
          })}

          {/* 图例 */}
          <rect x="40" y="170" width="14" height="14" rx="2" fill="var(--warning)" fillOpacity="0.3" stroke="var(--warning)" strokeWidth="1" />
          <text x="60" y="182" fontSize="11" fill="var(--text-secondary)">Eden</text>
          <rect x="110" y="170" width="14" height="14" rx="2" fill="var(--success)" fillOpacity="0.3" stroke="var(--success)" strokeWidth="1" />
          <text x="130" y="182" fontSize="11" fill="var(--text-secondary)">Survivor</text>
          <rect x="200" y="170" width="14" height="14" rx="2" fill="var(--accent)" fillOpacity="0.3" stroke="var(--accent)" strokeWidth="1" />
          <text x="220" y="182" fontSize="11" fill="var(--text-secondary)">Old</text>
          <rect x="270" y="170" width="14" height="14" rx="2" fill="var(--danger)" fillOpacity="0.3" stroke="var(--danger)" strokeWidth="1" />
          <text x="290" y="182" fontSize="11" fill="var(--text-secondary)">Humongous</text>
          <rect x="370" y="170" width="14" height="14" rx="2" fill="var(--text-tertiary)" fillOpacity="0.3" stroke="var(--text-tertiary)" strokeWidth="1" />
          <text x="390" y="182" fontSize="11" fill="var(--text-secondary)">Free</text>

          {/* 下半部：三色标记 */}
          <text x="40" y="216" fontSize="13" fontWeight="600" fill="var(--accent)">三色标记法与 SATB</text>

          {/* 白色对象 */}
          <circle cx="100" cy="260" r="22" fill="var(--bg-elevated)" stroke="var(--text-tertiary)" strokeWidth="2" />
          <text x="100" y="264" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">白</text>
          <text x="100" y="296" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">未访问</text>

          {/* 灰色对象 */}
          <circle cx="280" cy="260" r="22" fill="var(--warning)" fillOpacity="0.3" stroke="var(--warning)" strokeWidth="2" />
          <text x="280" y="264" textAnchor="middle" fontSize="11" fill="var(--warning)">灰</text>
          <text x="280" y="296" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">已访问/引用未完</text>

          {/* 黑色对象 */}
          <circle cx="460" cy="260" r="22" fill="var(--success)" fillOpacity="0.3" stroke="var(--success)" strokeWidth="2" />
          <text x="460" y="264" textAnchor="middle" fontSize="11" fill="var(--success)">黑</text>
          <text x="460" y="296" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">已访问/引用已完</text>

          {/* 箭头 */}
          <line x1="124" y1="260" x2="256" y2="260" stroke="var(--text-tertiary)" strokeWidth="1.5" markerEnd="url(#arr1)" />
          <line x1="304" y1="260" x2="436" y2="260" stroke="var(--text-tertiary)" strokeWidth="1.5" markerEnd="url(#arr1)" />

          <defs>
            <marker id="arr1" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
              <path d="M0,0 L8,4 L0,8 z" fill="var(--text-tertiary)" />
            </marker>
          </defs>

          {/* SATB说明 */}
          <rect x="40" y="320" width="660" height="70" rx="8" fill="var(--danger)" fillOpacity="0.08" stroke="var(--danger)" strokeWidth="1" strokeOpacity="0.4" />
          <text x="55" y="342" fontSize="12" fontWeight="600" fill="var(--danger)">SATB（Snapshot At The Beginning）</text>
          <text x="55" y="362" fontSize="11" fill="var(--text-secondary)">并发标记开始时拍快照 → Write Barrier 捕获旧引用 → 标记结束前都视为存活</text>
          <text x="55" y="380" fontSize="11" fill="var(--text-secondary)">代价：可能保留浮动垃圾（下一轮回收）  优势：解决并发标记「对象消失」问题</text>

          {/* Garbage First策略 */}
          <rect x="40" y="408" width="660" height="56" rx="8" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.4" />
          <text x="55" y="430" fontSize="12" fontWeight="600" fill="var(--accent)">Garbage First 策略</text>
          <text x="55" y="450" fontSize="11" fill="var(--text-secondary)">优先回收垃圾最多的 Region → 估算各 Region 回收耗时 → 选择在 MaxGCPauseMillis 内完成的最大 Region 集合</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        G1收集器概述——Region类型布局（Eden/Survivor/Old/Humongous/Free）与三色标记SATB机制
      </figcaption>
    </figure>
  );
}
