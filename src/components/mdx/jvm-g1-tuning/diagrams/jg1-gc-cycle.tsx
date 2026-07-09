/**
 * <Jg1GcCycleDiagram>：G1 GC周期——并发标记五阶段与CSet选择图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 520;

export function Jg1GcCycleDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="G1 GC周期——并发标记五阶段与CSet选择图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            G1 GC 周期——并发标记五阶段
          </text>

          {/* 五阶段时间线 */}
          <defs>
            <marker id="arrCy" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
              <path d="M0,0 L8,4 L0,8 z" fill="var(--text-tertiary)" />
            </marker>
          </defs>

          {/* 阶段1: Initial Mark (STW) */}
          <rect x="30" y="56" width="120" height="80" rx="6" fill="var(--danger)" fillOpacity="0.12" stroke="var(--danger)" strokeWidth="1.5" />
          <text x="90" y="78" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--danger)">① 初始标记</text>
          <text x="90" y="96" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">Initial Mark</text>
          <text x="90" y="112" textAnchor="middle" fontSize="10" fill="var(--danger)">STW</text>
          <text x="90" y="128" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">搭便车Young GC</text>

          <line x1="150" y1="96" x2="168" y2="96" stroke="var(--text-tertiary)" strokeWidth="1.5" markerEnd="url(#arrCy)" />

          {/* 阶段2: Concurrent Mark */}
          <rect x="170" y="56" width="120" height="80" rx="6" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.5" />
          <text x="230" y="78" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">② 并发标记</text>
          <text x="230" y="96" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">Concurrent Mark</text>
          <text x="230" y="112" textAnchor="middle" fontSize="10" fill="var(--success)">并发</text>
          <text x="230" y="128" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">沿引用链标记</text>

          <line x1="290" y1="96" x2="308" y2="96" stroke="var(--text-tertiary)" strokeWidth="1.5" markerEnd="url(#arrCy)" />

          {/* 阶段3: Remark (STW) */}
          <rect x="310" y="56" width="120" height="80" rx="6" fill="var(--danger)" fillOpacity="0.12" stroke="var(--danger)" strokeWidth="1.5" />
          <text x="370" y="78" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--danger)">③ 最终标记</text>
          <text x="370" y="96" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">Remark</text>
          <text x="370" y="112" textAnchor="middle" fontSize="10" fill="var(--danger)">STW</text>
          <text x="370" y="128" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">处理SATB队列</text>

          <line x1="430" y1="96" x2="448" y2="96" stroke="var(--text-tertiary)" strokeWidth="1.5" markerEnd="url(#arrCy)" />

          {/* 阶段4: Cleanup (STW) */}
          <rect x="450" y="56" width="120" height="80" rx="6" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.5" />
          <text x="510" y="78" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">④ 清理</text>
          <text x="510" y="96" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">Cleanup</text>
          <text x="510" y="112" textAnchor="middle" fontSize="10" fill="var(--warning)">部分STW</text>
          <text x="510" y="128" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">选CSet候选</text>

          <line x1="570" y1="96" x2="588" y2="96" stroke="var(--text-tertiary)" strokeWidth="1.5" markerEnd="url(#arrCy)" />

          {/* 阶段5: Evacuation (Mixed GC, STW) */}
          <rect x="590" y="56" width="130" height="80" rx="6" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.5" />
          <text x="655" y="78" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">⑤ 疏散回收</text>
          <text x="655" y="96" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">Mixed GC</text>
          <text x="655" y="112" textAnchor="middle" fontSize="10" fill="var(--accent)">STW</text>
          <text x="655" y="128" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">复制存活对象</text>

          {/* IHOP触发线 */}
          <rect x="30" y="156" width="690" height="40" rx="6" fill="var(--text-primary)" fillOpacity="0.06" stroke="var(--text-primary)" strokeWidth="1" strokeOpacity="0.3" />
          <text x="50" y="176" fontSize="12" fontWeight="600" fill="var(--text-primary)">IHOP 触发条件</text>
          <text x="50" y="190" fontSize="11" fill="var(--text-secondary)">堆使用率 ≥ InitiatingHeapOccupancyPercent（默认 45%）→ 下一次 Young GC 搭便车触发初始标记 → 进入并发标记周期</text>

          {/* CSet选择策略 */}
          <text x="30" y="224" fontSize="13" fontWeight="600" fill="var(--accent)">CSet（Collection Set）选择策略</text>

          {/* 候选Old Region列表 */}
          <rect x="30" y="240" width="340" height="130" rx="8" fill="var(--bg-elevated)" stroke="var(--text-tertiary)" strokeWidth="1" />
          <text x="200" y="260" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-secondary)">候选 Old Region（按垃圾比例降序）</text>

          {[
            { y: 270, label: "Region #5  垃圾80%", color: "var(--success)", sel: true },
            { y: 290, label: "Region #12 垃圾65%", color: "var(--success)", sel: true },
            { y: 310, label: "Region #3  垃圾50%", color: "var(--warning)", sel: true },
            { y: 330, label: "Region #8  垃圾30%", color: "var(--warning)", sel: false },
            { y: 350, label: "Region #1  垃圾15%", color: "var(--danger)", sel: false },
          ].map((r, i) => (
            <g key={i}>
              <rect x="45" y={r.y} width="310" height="16" rx="3" fill={r.color} fillOpacity={r.sel ? 0.15 : 0.05} stroke={r.color} strokeWidth="0.8" />
              <text x="55" y={r.y + 12} fontSize="10" fill={r.sel ? "var(--text-primary)" : "var(--text-tertiary)"}>{r.label}</text>
              <text x="340" y={r.y + 12} textAnchor="end" fontSize="10" fontWeight="600" fill={r.sel ? "var(--success)" : "var(--text-tertiary)"}>{r.sel ? "✓ 选入CSet" : "✗ 跳过"}</text>
            </g>
          ))}

          {/* 时间预算计算 */}
          <rect x="390" y="240" width="330" height="130" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.3" />
          <text x="555" y="260" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">时间预算计算</text>
          <text x="405" y="280" fontSize="10" fill="var(--text-secondary)">预算 = MaxGCPauseMillis（如200ms）</text>
          <text x="405" y="298" fontSize="10" fill="var(--text-secondary)">- 新生代Region预估回收时间</text>
          <text x="405" y="316" fontSize="10" fill="var(--text-secondary)">- 固定开销（根扫描/RSets更新）</text>
          <text x="405" y="334" fontSize="10" fill="var(--text-secondary)">= 可用于Old Region回收的预算</text>
          <text x="405" y="356" fontSize="10" fontWeight="600" fill="var(--accent)">贪心选择：按性价比降序，超预算则停</text>

          {/* Mixed GC多次分批 */}
          <rect x="30" y="390" width="690" height="56" rx="8" fill="var(--warning)" fillOpacity="0.06" stroke="var(--warning)" strokeWidth="1" strokeOpacity="0.3" />
          <text x="45" y="412" fontSize="12" fontWeight="600" fill="var(--warning)">Mixed GC 分批回收</text>
          <text x="45" y="430" fontSize="11" fill="var(--text-secondary)">G1MixedGCCountTarget（默认8）→ 期望分 8 次 Mixed GC 回收完所有候选 Old Region → 每次回收 1/8，控制单次停顿</text>

          {/* STW vs 并发图例 */}
          <rect x="30" y="462" width="14" height="14" rx="2" fill="var(--danger)" fillOpacity="0.3" stroke="var(--danger)" strokeWidth="1" />
          <text x="50" y="474" fontSize="11" fill="var(--text-secondary)">STW（暂停应用）</text>
          <rect x="160" y="462" width="14" height="14" rx="2" fill="var(--success)" fillOpacity="0.3" stroke="var(--success)" strokeWidth="1" />
          <text x="180" y="474" fontSize="11" fill="var(--text-secondary)">并发（与应用同时运行）</text>
          <rect x="340" y="462" width="14" height="14" rx="2" fill="var(--warning)" fillOpacity="0.3" stroke="var(--warning)" strokeWidth="1" />
          <text x="360" y="474" fontSize="11" fill="var(--text-secondary)">部分STW</text>
          <rect x="440" y="462" width="14" height="14" rx="2" fill="var(--accent)" fillOpacity="0.3" stroke="var(--accent)" strokeWidth="1" />
          <text x="460" y="474" fontSize="11" fill="var(--text-secondary)">疏散回收（STW）</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        G1 GC周期——并发标记五阶段（初始标记/并发标记/最终标记/清理/疏散回收）、IHOP触发、CSet选择与Mixed GC分批策略
      </figcaption>
    </figure>
  );
}
