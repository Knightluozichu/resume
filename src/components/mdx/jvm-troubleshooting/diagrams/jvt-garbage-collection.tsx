/**
 * <JvtGarbageCollectionDiagram>：垃圾回收机制与收集器图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 480;

export function JvtGarbageCollectionDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="垃圾回收机制与收集器图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="26" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            垃圾回收机制：判定 + 算法 + 收集器
          </text>

          {/* GC Roots 可达性分析 */}
          <text x="40" y="54" fontSize="13" fontWeight="600" fill="var(--warning)">GC Roots 可达性分析</text>
          <rect x="40" y="62" width="320" height="150" rx="8" fill="var(--warning)" fillOpacity="0.06" stroke="var(--warning)" strokeWidth="1.2" />

          <circle cx="100" cy="100" r="22" fill="var(--warning)" fillOpacity="0.20" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="100" y="104" textAnchor="middle" fontSize="9" fill="var(--warning)">栈局部</text>

          <circle cx="200" cy="100" r="22" fill="var(--warning)" fillOpacity="0.20" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="200" y="104" textAnchor="middle" fontSize="9" fill="var(--warning)">静态属性</text>

          <circle cx="300" cy="100" r="22" fill="var(--warning)" fillOpacity="0.20" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="300" y="104" textAnchor="middle" fontSize="9" fill="var(--warning)">JNI引用</text>

          <line x1="100" y1="122" x2="80" y2="160" stroke="var(--text-tertiary)" strokeWidth="1" />
          <line x1="200" y1="122" x2="180" y2="160" stroke="var(--text-tertiary)" strokeWidth="1" />
          <line x1="300" y1="122" x2="320" y2="160" stroke="var(--text-tertiary)" strokeWidth="1" />

          <circle cx="80" cy="172" r="14" fill="var(--success)" fillOpacity="0.20" stroke="var(--success)" strokeWidth="1" />
          <text x="80" y="176" textAnchor="middle" fontSize="8" fill="var(--success)">存活</text>

          <circle cx="180" cy="172" r="14" fill="var(--success)" fillOpacity="0.20" stroke="var(--success)" strokeWidth="1" />
          <text x="180" y="176" textAnchor="middle" fontSize="8" fill="var(--success)">存活</text>

          <circle cx="320" cy="172" r="14" fill="var(--danger)" fillOpacity="0.20" stroke="var(--danger)" strokeWidth="1" />
          <text x="320" y="176" textAnchor="middle" fontSize="8" fill="var(--danger)">回收</text>

          <text x="200" y="202" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">可达=存活，不可达=回收（解决循环引用）</text>

          {/* 三种 GC 算法 */}
          <text x="400" y="54" fontSize="13" fontWeight="600" fill="var(--accent)">三种 GC 算法对比</text>

          <rect x="400" y="62" width="300" height="44" rx="6" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1" />
          <text x="550" y="80" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">标记-清除 Mark-Sweep</text>
          <text x="550" y="96" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">简单 / 有碎片 / 老年代(CMS)</text>

          <rect x="400" y="114" width="300" height="44" rx="6" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1" />
          <text x="550" y="132" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">复制 Copying</text>
          <text x="550" y="148" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">无碎片 / 内存减半 / 新生代</text>

          <rect x="400" y="166" width="300" height="44" rx="6" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1" />
          <text x="550" y="184" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">标记-整理 Mark-Compact</text>
          <text x="550" y="200" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">无碎片 / 移动慢 / 老年代</text>

          {/* 收集器演进 */}
          <text x="40" y="240" fontSize="13" fontWeight="600" fill="var(--success)">收集器演进与选择</text>

          <rect x="40" y="250" width="140" height="60" rx="6" fill="var(--success)" fillOpacity="0.10" stroke="var(--success)" strokeWidth="1.2" />
          <text x="110" y="270" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">Serial</text>
          <text x="110" y="288" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">单线程</text>
          <text x="110" y="302" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">客户端/小堆</text>

          <text x="190" y="284" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="210" y="250" width="140" height="60" rx="6" fill="var(--success)" fillOpacity="0.13" stroke="var(--success)" strokeWidth="1.2" />
          <text x="280" y="270" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">Parallel</text>
          <text x="280" y="288" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">多线程吞吐优先</text>
          <text x="280" y="302" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">批处理</text>

          <text x="360" y="284" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="380" y="250" width="140" height="60" rx="6" fill="var(--warning)" fillOpacity="0.13" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="450" y="270" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">CMS</text>
          <text x="450" y="288" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">低停顿/有碎片</text>
          <text x="450" y="302" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">JDK14 移除</text>

          <text x="530" y="284" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="550" y="250" width="150" height="60" rx="6" fill="var(--accent)" fillOpacity="0.16" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="625" y="270" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">G1（默认）</text>
          <text x="625" y="288" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">Region/可预测停顿</text>
          <text x="625" y="302" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">大堆 6G+</text>

          {/* GC 类型 */}
          <text x="40" y="340" fontSize="13" fontWeight="600" fill="var(--danger)">GC 类型与触发</text>

          <rect x="40" y="350" width="200" height="56" rx="6" fill="var(--danger)" fillOpacity="0.10" stroke="var(--danger)" strokeWidth="1" />
          <text x="140" y="370" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--danger)">Minor GC</text>
          <text x="140" y="388" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">Eden 满 / 复制算法</text>
          <text x="140" y="402" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">STW 短（几ms）</text>

          <rect x="250" y="350" width="200" height="56" rx="6" fill="var(--danger)" fillOpacity="0.14" stroke="var(--danger)" strokeWidth="1" />
          <text x="350" y="370" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--danger)">Full GC</text>
          <text x="350" y="388" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">老年代满/元空间满</text>
          <text x="350" y="402" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">STW 长（数秒）需避免</text>

          <rect x="460" y="350" width="240" height="56" rx="6" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="1" />
          <text x="580" y="370" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">Full GC 触发场景</text>
          <text x="580" y="388" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">System.gc/担保失败</text>
          <text x="580" y="402" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">CMS并发失败/元空间不足</text>

          <text x="370" y="442" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">选择：吞吐 Parallel / 低停顿大堆 G1 / 超低停顿超大堆 ZGC</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        垃圾回收机制——GC Roots 可达性分析、标记清除/复制/标记整理三算法、Serial/Parallel/CMS/G1 收集器演进
      </figcaption>
    </figure>
  );
}
