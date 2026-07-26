/**
 * <GchGenerationalDiagram>：分代回收——弱分代假说与写屏障。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 */

const VIEW_W = 740;
const VIEW_H = 480;

export function GchGenerationalDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="分代回收弱分代假说与写屏障卡表"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="26" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--text-primary)">
            分代回收：弱分代假说 与 写屏障
          </text>

          {/* 堆布局 */}
          <text x={VIEW_W / 2} y="52" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">分代堆布局</text>

          {/* Young区 */}
          <rect x="40" y="64" width="400" height="80" rx="8" fill="var(--warning)" fillOpacity="0.08" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="120" y="82" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">Young Generation 年轻代</text>

          <rect x="50" y="92" width="120" height="44" rx="4" fill="var(--warning)" fillOpacity="0.15" stroke="var(--warning)" strokeWidth="0.8" />
          <text x="110" y="110" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">Eden</text>
          <text x="110" y="126" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">新对象分配区</text>

          <rect x="180" y="92" width="120" height="44" rx="4" fill="var(--warning)" fillOpacity="0.15" stroke="var(--warning)" strokeWidth="0.8" />
          <text x="240" y="110" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">Survivor 0</text>
          <text x="240" y="126" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">存活区1</text>

          <rect x="310" y="92" width="120" height="44" rx="4" fill="var(--warning)" fillOpacity="0.15" stroke="var(--warning)" strokeWidth="0.8" />
          <text x="370" y="110" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">Survivor 1</text>
          <text x="370" y="126" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">存活区2</text>

          {/* Old区 */}
          <rect x="460" y="64" width="240" height="80" rx="8" fill="var(--danger)" fillOpacity="0.08" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="580" y="82" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--danger)">Old Generation 老年代</text>
          <rect x="475" y="92" width="210" height="44" rx="4" fill="var(--danger)" fillOpacity="0.1" stroke="var(--danger)" strokeWidth="0.8" />
          <text x="580" y="115" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">Old</text>
          <text x="580" y="130" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">长期存活对象</text>

          {/* GC流程箭头 */}
          <text x="110" y="164" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">Minor GC（频繁）</text>
          <text x="240" y="164" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>
          <text x="370" y="164" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">复制存活</text>
          <text x="580" y="164" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">Major GC（较少）</text>

          <line x1="110" y1="150" x2="110" y2="158" stroke="var(--warning)" strokeWidth="1.2" />
          <line x1="110" y1="158" x2="370" y2="158" stroke="var(--warning)" strokeWidth="1.2" />
          <line x1="370" y1="158" x2="370" y2="150" stroke="var(--warning)" strokeWidth="1.2" />

          <line x1="370" y1="150" x2="370" y2="158" stroke="var(--text-tertiary)" strokeWidth="1.2" />
          <line x1="370" y1="158" x2="580" y2="158" stroke="var(--text-tertiary)" strokeWidth="1.2" />
          <line x1="580" y1="158" x2="580" y2="150" stroke="var(--text-tertiary)" strokeWidth="1.2" />

          {/* 弱分代假说 */}
          <line x1="30" y1="180" x2="710" y2="180" stroke="var(--border)" strokeWidth="1" strokeDasharray="4 4" />
          <text x={VIEW_W / 2} y="202" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--text-primary)">弱分代假说（Weak Generational Hypothesis）</text>

          <rect x="60" y="216" width="620" height="56" rx="8" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="1" />
          <text x="90" y="240" fontSize="11" fontWeight="600" fill="var(--success)">绝大多数对象朝生夕死</text>
          <text x="90" y="258" fontSize="11" fill="var(--text-secondary)">年轻代GC回收率极高（80%~98%），Minor GC极短</text>
          <text x="370" y="240" fontSize="11" fontWeight="600" fill="var(--success)">老年代对象很少引用年轻代</text>
          <text x="370" y="258" fontSize="11" fill="var(--text-secondary)">Minor GC时无需扫描整个老年代，只需 remembered set</text>

          {/* 写屏障与卡表 */}
          <line x1="30" y1="290" x2="710" y2="290" stroke="var(--border)" strokeWidth="1" strokeDasharray="4 4" />
          <text x={VIEW_W / 2} y="312" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--text-primary)">写屏障与卡表（解决跨代引用问题）</text>

          {/* 写屏障 */}
          <rect x="40" y="326" width="320" height="140" rx="8" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1" />
          <text x="200" y="346" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">Write Barrier 写屏障</text>

          <text x="55" y="366" fontSize="11" fill="var(--text-secondary)">当 Old → Young 新增引用时</text>
          <text x="55" y="380" fontSize="11" fill="var(--text-secondary)">触发写屏障记录跨代引用</text>

          <rect x="55" y="390" width="290" height="64" rx="4" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="0.8" />
          <text x="65" y="408" fontSize="11" fill="var(--accent)">{`if (old_field = young_ref) `}</text>
          <text x="65" y="422" fontSize="11" fill="var(--accent)">{`  card_table[addr] = dirty `}</text>
          <text x="65" y="438" fontSize="11" fill="var(--accent)">{`  // 标记对应卡为脏`}</text>
          <text x="65" y="450" fontSize="11" fill="var(--text-tertiary)">{`// Minor GC时只扫描脏卡`}</text>

          {/* 卡表 */}
          <rect x="380" y="326" width="320" height="140" rx="8" fill="var(--warning)" fillOpacity="0.04" stroke="var(--warning)" strokeWidth="1" />
          <text x="540" y="346" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">Card Table 卡表</text>

          <text x="395" y="366" fontSize="11" fill="var(--text-secondary)">将老年代划分为固定大小卡（如512B）</text>
          <text x="395" y="380" fontSize="11" fill="var(--text-secondary)">每卡对应卡表一个字节</text>

          {/* 卡表示意 */}
          <rect x="395" y="392" width="28" height="24" fill="var(--text-tertiary)" fillOpacity="0.1" stroke="var(--text-tertiary)" strokeWidth="0.8" />
          <text x="409" y="408" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">0</text>
          <rect x="425" y="392" width="28" height="24" fill="var(--danger)" fillOpacity="0.3" stroke="var(--danger)" strokeWidth="0.8" />
          <text x="439" y="408" textAnchor="middle" fontSize="11" fill="var(--danger)">1</text>
          <rect x="455" y="392" width="28" height="24" fill="var(--text-tertiary)" fillOpacity="0.1" stroke="var(--text-tertiary)" strokeWidth="0.8" />
          <text x="469" y="408" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">0</text>
          <rect x="485" y="392" width="28" height="24" fill="var(--danger)" fillOpacity="0.3" stroke="var(--danger)" strokeWidth="0.8" />
          <text x="499" y="408" textAnchor="middle" fontSize="11" fill="var(--danger)">1</text>
          <rect x="515" y="392" width="28" height="24" fill="var(--text-tertiary)" fillOpacity="0.1" stroke="var(--text-tertiary)" strokeWidth="0.8" />
          <text x="529" y="408" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">0</text>
          <rect x="545" y="392" width="28" height="24" fill="var(--text-tertiary)" fillOpacity="0.1" stroke="var(--text-tertiary)" strokeWidth="0.8" />
          <text x="559" y="408" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">0</text>
          <rect x="575" y="392" width="28" height="24" fill="var(--danger)" fillOpacity="0.3" stroke="var(--danger)" strokeWidth="0.8" />
          <text x="589" y="408" textAnchor="middle" fontSize="11" fill="var(--danger)">1</text>
          <rect x="605" y="392" width="28" height="24" fill="var(--text-tertiary)" fillOpacity="0.1" stroke="var(--text-tertiary)" strokeWidth="0.8" />
          <text x="619" y="408" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">0</text>
          <rect x="635" y="392" width="28" height="24" fill="var(--text-tertiary)" fillOpacity="0.1" stroke="var(--text-tertiary)" strokeWidth="0.8" />
          <text x="649" y="408" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">0</text>

          <text x="395" y="432" fontSize="11" fill="var(--text-secondary)">1 = dirty（有跨代引用）</text>
          <text x="395" y="446" fontSize="11" fill="var(--text-secondary)">0 = clean（无跨代引用）</text>
          <text x="395" y="460" fontSize="11" fill="var(--text-tertiary)">Minor GC只扫描 dirty 卡</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        分代回收基于弱分代假说将堆分为年轻代和老年代，通过写屏障和卡表追踪跨代引用，使Minor GC只需扫描年轻代+脏卡
      </figcaption>
    </figure>
  );
}
