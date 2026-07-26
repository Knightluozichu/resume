/**
 * <GchModernGcDiagram>：现代GC对比——G1/ZGC/Shenandoah/CMS。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 */

const VIEW_W = 740;
const VIEW_H = 500;

export function GchModernGcDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="现代GC对比矩阵 G1 ZGC Shenandoah CMS"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="26" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--text-primary)">
            现代GC对比矩阵
          </text>

          {/* 表头 */}
          <rect x="30" y="42" width="130" height="28" rx="4" fill="var(--text-primary)" fillOpacity="0.08" stroke="var(--text-primary)" strokeWidth="0.8" strokeOpacity="0.3" />
          <text x="95" y="60" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">特性</text>
          <rect x="160" y="42" width="130" height="28" rx="4" fill="var(--danger)" fillOpacity="0.08" stroke="var(--danger)" strokeWidth="0.8" />
          <text x="225" y="60" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--danger)">CMS</text>
          <rect x="290" y="42" width="130" height="28" rx="4" fill="var(--warning)" fillOpacity="0.08" stroke="var(--warning)" strokeWidth="0.8" />
          <text x="355" y="60" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">G1</text>
          <rect x="420" y="42" width="130" height="28" rx="4" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="0.8" />
          <text x="485" y="60" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">Shenandoah</text>
          <rect x="550" y="42" width="160" height="28" rx="4" fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" strokeWidth="0.8" />
          <text x="630" y="60" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">ZGC</text>

          {/* 内存模型 */}
          <rect x="30" y="72" width="130" height="32" fill="var(--text-primary)" fillOpacity="0.04" stroke="var(--text-primary)" strokeWidth="0.5" strokeOpacity="0.2" />
          <text x="95" y="92" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">内存模型</text>
          <rect x="160" y="72" width="130" height="32" fill="var(--danger)" fillOpacity="0.04" stroke="var(--danger)" strokeWidth="0.5" />
          <text x="225" y="86" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">物理分代</text>
          <text x="225" y="98" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">连续Eden/Old</text>
          <rect x="290" y="72" width="130" height="32" fill="var(--warning)" fillOpacity="0.04" stroke="var(--warning)" strokeWidth="0.5" />
          <text x="355" y="86" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">Region分代</text>
          <text x="355" y="98" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">1-32MB Region</text>
          <rect x="420" y="72" width="130" height="32" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="0.5" />
          <text x="485" y="86" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">Region（无分代）</text>
          <text x="485" y="98" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">Brooks指针</text>
          <rect x="550" y="72" width="160" height="32" fill="var(--success)" fillOpacity="0.04" stroke="var(--success)" strokeWidth="0.5" />
          <text x="630" y="86" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">ZPage（多粒度）</text>
          <text x="630" y="98" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">染色指针</text>

          {/* 停顿时间 */}
          <rect x="30" y="106" width="130" height="32" fill="var(--text-primary)" fillOpacity="0.04" stroke="var(--text-primary)" strokeWidth="0.5" strokeOpacity="0.2" />
          <text x="95" y="126" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">停顿时间</text>
          <rect x="160" y="106" width="130" height="32" fill="var(--danger)" fillOpacity="0.04" stroke="var(--danger)" strokeWidth="0.5" />
          <text x="225" y="126" textAnchor="middle" fontSize="11" fill="var(--danger)">~100ms级</text>
          <rect x="290" y="106" width="130" height="32" fill="var(--warning)" fillOpacity="0.04" stroke="var(--warning)" strokeWidth="0.5" />
          <text x="355" y="126" textAnchor="middle" fontSize="11" fill="var(--warning)">~200ms级</text>
          <rect x="420" y="106" width="130" height="32" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="0.5" />
          <text x="485" y="126" textAnchor="middle" fontSize="11" fill="var(--accent)">&lt;10ms</text>
          <rect x="550" y="106" width="160" height="32" fill="var(--success)" fillOpacity="0.04" stroke="var(--success)" strokeWidth="0.5" />
          <text x="630" y="126" textAnchor="middle" fontSize="11" fill="var(--success)">&lt;1ms (亚毫秒)</text>

          {/* 并发标记 */}
          <rect x="30" y="140" width="130" height="28" fill="var(--text-primary)" fillOpacity="0.04" stroke="var(--text-primary)" strokeWidth="0.5" strokeOpacity="0.2" />
          <text x="95" y="158" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">并发标记</text>
          <rect x="160" y="140" width="130" height="28" fill="var(--danger)" fillOpacity="0.04" stroke="var(--danger)" strokeWidth="0.5" />
          <text x="225" y="158" textAnchor="middle" fontSize="11" fill="var(--success)">&#10003;</text>
          <rect x="290" y="140" width="130" height="28" fill="var(--warning)" fillOpacity="0.04" stroke="var(--warning)" strokeWidth="0.5" />
          <text x="355" y="158" textAnchor="middle" fontSize="11" fill="var(--success)">&#10003;</text>
          <rect x="420" y="140" width="130" height="28" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="0.5" />
          <text x="485" y="158" textAnchor="middle" fontSize="11" fill="var(--success)">&#10003;</text>
          <rect x="550" y="140" width="160" height="28" fill="var(--success)" fillOpacity="0.04" stroke="var(--success)" strokeWidth="0.5" />
          <text x="630" y="158" textAnchor="middle" fontSize="11" fill="var(--success)">&#10003;</text>

          {/* 并发疏散 */}
          <rect x="30" y="170" width="130" height="28" fill="var(--text-primary)" fillOpacity="0.04" stroke="var(--text-primary)" strokeWidth="0.5" strokeOpacity="0.2" />
          <text x="95" y="188" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">并发疏散</text>
          <rect x="160" y="170" width="130" height="28" fill="var(--danger)" fillOpacity="0.04" stroke="var(--danger)" strokeWidth="0.5" />
          <text x="225" y="188" textAnchor="middle" fontSize="11" fill="var(--danger)">&#10007;</text>
          <rect x="290" y="170" width="130" height="28" fill="var(--warning)" fillOpacity="0.04" stroke="var(--warning)" strokeWidth="0.5" />
          <text x="355" y="188" textAnchor="middle" fontSize="11" fill="var(--danger)">&#10007;</text>
          <rect x="420" y="170" width="130" height="28" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="0.5" />
          <text x="485" y="188" textAnchor="middle" fontSize="11" fill="var(--success)">&#10003;</text>
          <rect x="550" y="170" width="160" height="28" fill="var(--success)" fillOpacity="0.04" stroke="var(--success)" strokeWidth="0.5" />
          <text x="630" y="188" textAnchor="middle" fontSize="11" fill="var(--success)">&#10003;</text>

          {/* 屏障类型 */}
          <rect x="30" y="200" width="130" height="32" fill="var(--text-primary)" fillOpacity="0.04" stroke="var(--text-primary)" strokeWidth="0.5" strokeOpacity="0.2" />
          <text x="95" y="220" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">屏障技术</text>
          <rect x="160" y="200" width="130" height="32" fill="var(--danger)" fillOpacity="0.04" stroke="var(--danger)" strokeWidth="0.5" />
          <text x="225" y="220" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">卡表写屏障</text>
          <rect x="290" y="200" width="130" height="32" fill="var(--warning)" fillOpacity="0.04" stroke="var(--warning)" strokeWidth="0.5" />
          <text x="355" y="214" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">SATB+卡表</text>
          <text x="355" y="226" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">RSet</text>
          <rect x="420" y="200" width="130" height="32" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="0.5" />
          <text x="485" y="220" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">Brooks指针</text>
          <rect x="550" y="200" width="160" height="32" fill="var(--success)" fillOpacity="0.04" stroke="var(--success)" strokeWidth="0.5" />
          <text x="630" y="220" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">染色指针+读屏障</text>

          {/* 堆上限 */}
          <rect x="30" y="234" width="130" height="28" fill="var(--text-primary)" fillOpacity="0.04" stroke="var(--text-primary)" strokeWidth="0.5" strokeOpacity="0.2" />
          <text x="95" y="252" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">推荐堆上限</text>
          <rect x="160" y="234" width="130" height="28" fill="var(--danger)" fillOpacity="0.04" stroke="var(--danger)" strokeWidth="0.5" />
          <text x="225" y="252" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">~4GB</text>
          <rect x="290" y="234" width="130" height="28" fill="var(--warning)" fillOpacity="0.04" stroke="var(--warning)" strokeWidth="0.5" />
          <text x="355" y="252" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">~32GB</text>
          <rect x="420" y="234" width="130" height="28" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="0.5" />
          <text x="485" y="252" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">~数百GB</text>
          <rect x="550" y="234" width="160" height="28" fill="var(--success)" fillOpacity="0.04" stroke="var(--success)" strokeWidth="0.5" />
          <text x="630" y="252" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">16TB</text>

          {/* 状态 */}
          <rect x="30" y="264" width="130" height="28" fill="var(--text-primary)" fillOpacity="0.04" stroke="var(--text-primary)" strokeWidth="0.5" strokeOpacity="0.2" />
          <text x="95" y="282" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">JDK状态</text>
          <rect x="160" y="264" width="130" height="28" fill="var(--danger)" fillOpacity="0.04" stroke="var(--danger)" strokeWidth="0.5" />
          <text x="225" y="282" textAnchor="middle" fontSize="11" fill="var(--danger)">JDK14废弃</text>
          <rect x="290" y="264" width="130" height="28" fill="var(--warning)" fillOpacity="0.04" stroke="var(--warning)" strokeWidth="0.5" />
          <text x="355" y="282" textAnchor="middle" fontSize="11" fill="var(--warning)">JDK9+默认</text>
          <rect x="420" y="264" width="130" height="28" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="0.5" />
          <text x="485" y="282" textAnchor="middle" fontSize="11" fill="var(--accent)">JDK12+生产</text>
          <rect x="550" y="264" width="160" height="28" fill="var(--success)" fillOpacity="0.04" stroke="var(--success)" strokeWidth="0.5" />
          <text x="630" y="282" textAnchor="middle" fontSize="11" fill="var(--success)">JDK15+生产</text>

          {/* 关键技术对比 */}
          <line x1="30" y1="305" x2="710" y2="305" stroke="var(--border)" strokeWidth="1" strokeDasharray="4 4" />
          <text x={VIEW_W / 2} y="327" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--text-primary)">核心技术：染色指针 vs Brooks指针</text>

          {/* 染色指针 */}
          <rect x="40" y="342" width="330" height="142" rx="8" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="1" />
          <text x="205" y="362" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">ZGC 染色指针（Colored Pointer）</text>

          <text x="55" y="384" fontSize="11" fill="var(--text-secondary)">64位地址中用高位存GC状态：</text>
          <rect x="55" y="392" width="300" height="20" rx="3" fill="var(--text-primary)" fillOpacity="0.06" stroke="var(--text-tertiary)" strokeWidth="0.5" />
          <text x="205" y="406" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">{`[标记位|转发位|Remapped|...] 对象地址`}</text>

          <text x="55" y="426" fontSize="11" fill="var(--text-secondary)">读屏障检查指针颜色：</text>
          <text x="55" y="440" fontSize="11" fill="var(--success)">{`  - Marked0/Marked1 → 标记中`}</text>
          <text x="55" y="454" fontSize="11" fill="var(--success)">{`  - Remapped → 已就位`}</text>
          <text x="55" y="468" fontSize="11" fill="var(--text-tertiary)">虚拟内存多映射实现地址重定向</text>

          {/* Brooks指针 */}
          <rect x="380" y="342" width="330" height="142" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1" />
          <text x="545" y="362" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">Shenandoah Brooks指针</text>

          <text x="395" y="384" fontSize="11" fill="var(--text-secondary)">每个对象头中增加转发指针：</text>
          <rect x="395" y="392" width="300" height="20" rx="3" fill="var(--text-primary)" fillOpacity="0.06" stroke="var(--text-tertiary)" strokeWidth="0.5" />
          <text x="545" y="406" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">{`[Brooks fwd ptr] 对象数据`}</text>

          <text x="395" y="426" fontSize="11" fill="var(--text-secondary)">每次访问对象需读转发指针：</text>
          <text x="395" y="440" fontSize="11" fill="var(--accent)">{`  - fwd == self → 未移动`}</text>
          <text x="395" y="454" fontSize="11" fill="var(--accent)">{`  - fwd != self → 已移动，跳转`}</text>
          <text x="395" y="468" fontSize="11" fill="var(--text-tertiary)">额外空间开销（每对象+1指针）</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        CMS/G1/Shenandoah/ZGC四大现代GC在内存模型、停顿时间、并发能力、屏障技术维度的全面对比，以及染色指针与Brooks指针的核心差异
      </figcaption>
    </figure>
  );
}
