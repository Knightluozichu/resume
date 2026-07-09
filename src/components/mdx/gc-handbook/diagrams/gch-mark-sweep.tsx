/**
 * <GchMarkSweepDiagram>：标记-清除算法三阶段与碎片问题。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 */

const VIEW_W = 740;
const VIEW_H = 480;

export function GchMarkSweepDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="标记-清除算法三阶段流程与碎片问题"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="26" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--text-primary)">
            标记-清除算法三阶段
          </text>

          {/* 阶段1：标记 */}
          <text x="120" y="56" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--warning)">阶段1 标记 Mark</text>
          <rect x="30" y="66" width="180" height="100" rx="6" fill="var(--warning)" fillOpacity="0.06" stroke="var(--warning)" strokeWidth="1" />
          {/* 堆块 */}
          <rect x="42" y="78" width="24" height="20" fill="var(--success)" fillOpacity="0.4" stroke="var(--success)" strokeWidth="0.8" />
          <text x="54" y="92" textAnchor="middle" fontSize="8" fill="var(--text-primary)">A</text>
          <rect x="70" y="78" width="24" height="20" fill="var(--danger)" fillOpacity="0.3" stroke="var(--danger)" strokeWidth="0.8" />
          <text x="82" y="92" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">B</text>
          <rect x="98" y="78" width="24" height="20" fill="var(--success)" fillOpacity="0.4" stroke="var(--success)" strokeWidth="0.8" />
          <text x="110" y="92" textAnchor="middle" fontSize="8" fill="var(--text-primary)">C</text>
          <rect x="126" y="78" width="24" height="20" fill="var(--danger)" fillOpacity="0.3" stroke="var(--danger)" strokeWidth="0.8" />
          <text x="138" y="92" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">D</text>
          <rect x="154" y="78" width="24" height="20" fill="var(--success)" fillOpacity="0.4" stroke="var(--success)" strokeWidth="0.8" />
          <text x="166" y="92" textAnchor="middle" fontSize="8" fill="var(--text-primary)">E</text>

          <text x="120" y="118" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">从根集合出发遍历</text>
          <text x="120" y="132" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">可达对象标记为存活</text>
          <text x="120" y="146" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">A,C,E = 活; B,D = 死</text>

          {/* 箭头 */}
          <text x="240" y="115" textAnchor="middle" fontSize="16" fill="var(--text-tertiary)">&rarr;</text>

          {/* 阶段2：清除 */}
          <text x="370" y="56" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">阶段2 清除 Sweep</text>
          <rect x="280" y="66" width="180" height="100" rx="6" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1" />
          <rect x="292" y="78" width="24" height="20" fill="var(--success)" fillOpacity="0.4" stroke="var(--success)" strokeWidth="0.8" />
          <text x="304" y="92" textAnchor="middle" fontSize="8" fill="var(--text-primary)">A</text>
          <rect x="320" y="78" width="24" height="20" fill="none" stroke="var(--danger)" strokeWidth="0.8" strokeDasharray="2 2" />
          <text x="332" y="92" textAnchor="middle" fontSize="8" fill="var(--text-tertiary)">&#215;</text>
          <rect x="348" y="78" width="24" height="20" fill="var(--success)" fillOpacity="0.4" stroke="var(--success)" strokeWidth="0.8" />
          <text x="360" y="92" textAnchor="middle" fontSize="8" fill="var(--text-primary)">C</text>
          <rect x="376" y="78" width="24" height="20" fill="none" stroke="var(--danger)" strokeWidth="0.8" strokeDasharray="2 2" />
          <text x="388" y="92" textAnchor="middle" fontSize="8" fill="var(--text-tertiary)">&#215;</text>
          <rect x="404" y="78" width="24" height="20" fill="var(--success)" fillOpacity="0.4" stroke="var(--success)" strokeWidth="0.8" />
          <text x="416" y="92" textAnchor="middle" fontSize="8" fill="var(--text-primary)">E</text>

          <text x="370" y="118" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">遍历整个堆</text>
          <text x="370" y="132" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">未标记对象加入自由链表</text>
          <text x="370" y="146" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">B,D 回收为空闲块</text>

          {/* 箭头 */}
          <text x="490" y="115" textAnchor="middle" fontSize="16" fill="var(--text-tertiary)">&rarr;</text>

          {/* 阶段3：结果 */}
          <text x="620" y="56" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--danger)">阶段3 结果 碎片</text>
          <rect x="530" y="66" width="180" height="100" rx="6" fill="var(--danger)" fillOpacity="0.06" stroke="var(--danger)" strokeWidth="1" />
          <rect x="542" y="78" width="24" height="20" fill="var(--success)" fillOpacity="0.4" stroke="var(--success)" strokeWidth="0.8" />
          <rect x="570" y="78" width="24" height="20" fill="var(--danger)" fillOpacity="0.1" stroke="var(--danger)" strokeWidth="0.8" strokeDasharray="2 2" />
          <rect x="598" y="78" width="24" height="20" fill="var(--success)" fillOpacity="0.4" stroke="var(--success)" strokeWidth="0.8" />
          <rect x="626" y="78" width="24" height="20" fill="var(--danger)" fillOpacity="0.1" stroke="var(--danger)" strokeWidth="0.8" strokeDasharray="2 2" />
          <rect x="654" y="78" width="24" height="20" fill="var(--success)" fillOpacity="0.4" stroke="var(--success)" strokeWidth="0.8" />

          <text x="620" y="118" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">存活对象原地不动</text>
          <text x="620" y="132" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">空闲块不连续 = 碎片</text>
          <text x="620" y="146" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">大对象分配失败!</text>

          {/* 下方：三色标记法 */}
          <line x1="30" y1="190" x2="710" y2="190" stroke="var(--border)" strokeWidth="1" strokeDasharray="4 4" />
          <text x={VIEW_W / 2} y="212" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--text-primary)">三色标记法（并发标记基础）</text>

          {/* 白色 */}
          <rect x="60" y="230" width="180" height="80" rx="8" fill="var(--text-primary)" fillOpacity="0.04" stroke="var(--text-primary)" strokeWidth="1" strokeOpacity="0.3" />
          <circle cx="90" cy="260" r="10" fill="none" stroke="var(--text-secondary)" strokeWidth="1.5" />
          <text x="90" y="264" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">白</text>
          <text x="115" y="255" fontSize="10" fontWeight="600" fill="var(--text-primary)">White 白色</text>
          <text x="115" y="270" fontSize="9" fill="var(--text-secondary)">尚未访问</text>
          <text x="115" y="284" fontSize="9" fill="var(--text-secondary)">= 候选垃圾</text>

          {/* 灰色 */}
          <rect x="280" y="230" width="180" height="80" rx="8" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="1" />
          <circle cx="310" cy="260" r="10" fill="var(--accent)" fillOpacity="0.3" stroke="var(--accent)" strokeWidth="1.5" />
          <text x="310" y="264" textAnchor="middle" fontSize="9" fill="var(--text-primary)">灰</text>
          <text x="335" y="255" fontSize="10" fontWeight="600" fill="var(--accent)">Grey 灰色</text>
          <text x="335" y="270" fontSize="9" fill="var(--text-secondary)">已访问,子节点未完</text>
          <text x="335" y="284" fontSize="9" fill="var(--text-secondary)">= 工作队列中</text>

          {/* 黑色 */}
          <rect x="500" y="230" width="180" height="80" rx="8" fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" strokeWidth="1" />
          <circle cx="530" cy="260" r="10" fill="var(--success)" fillOpacity="0.4" stroke="var(--success)" strokeWidth="1.5" />
          <text x="530" y="264" textAnchor="middle" fontSize="9" fill="var(--text-primary)">黑</text>
          <text x="555" y="255" fontSize="10" fontWeight="600" fill="var(--success)">Black 黑色</text>
          <text x="555" y="270" fontSize="9" fill="var(--text-secondary)">已访问且子节点全完</text>
          <text x="555" y="284" fontSize="9" fill="var(--text-secondary)">= 确定存活</text>

          {/* 流转箭头 */}
          <text x="255" y="264" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>
          <text x="475" y="264" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>

          {/* 不变式 */}
          <rect x="60" y="340" width="620" height="60" rx="8" fill="var(--warning)" fillOpacity="0.06" stroke="var(--warning)" strokeWidth="1" strokeDasharray="3 3" />
          <text x="370" y="362" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">三色不变式（并发安全的核心约束）</text>
          <text x="370" y="380" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">强不变式：黑色不指向白色（新增引用时灰色拦截）</text>
          <text x="370" y="394" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">弱不变式：黑色可指向白色，但被指向的白色会变灰（SATB快照）</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        标记-清除算法三阶段（标记可达对象→清除未标记对象→产生碎片），以及三色标记法（白/灰/黑）与强弱不变式
      </figcaption>
    </figure>
  );
}
