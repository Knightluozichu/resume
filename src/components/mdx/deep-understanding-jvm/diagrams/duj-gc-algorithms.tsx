/**
 * <DujGcAlgorithmsDiagram>：垃圾收集算法与收集器演进图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 480;

export function DujGcAlgorithmsDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="垃圾收集算法与收集器演进图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="26" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            垃圾收集：算法 + 收集器演进
          </text>

          {/* 上半部分：三种基础算法 */}
          <text x={VIEW_W / 2} y="50" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">基础算法</text>

          <rect x="30" y="62" width="215" height="95" rx="8" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="137" y="82" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--warning)">标记-清除</text>
          <text x="137" y="100" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">标记存活 → 清除死亡</text>
          <text x="137" y="116" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">缺点：内存碎片</text>
          <text x="137" y="132" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">效率不稳定</text>
          <text x="137" y="148" textAnchor="middle" fontSize="10" fill="var(--danger)">适合老年代</text>

          <rect x="262" y="62" width="215" height="95" rx="8" fill="var(--success)" fillOpacity="0.10" stroke="var(--success)" strokeWidth="1.2" />
          <text x="369" y="82" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">复制</text>
          <text x="369" y="100" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">存活对象复制到另一半</text>
          <text x="369" y="116" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">无碎片，简单高效</text>
          <text x="369" y="132" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">缺点：浪费一半空间</text>
          <text x="369" y="148" textAnchor="middle" fontSize="10" fill="var(--danger)">适合新生代</text>

          <rect x="494" y="62" width="215" height="95" rx="8" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="601" y="82" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">标记-整理</text>
          <text x="601" y="100" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">标记存活 → 整理到一端</text>
          <text x="601" y="116" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">无碎片，不浪费空间</text>
          <text x="601" y="132" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">缺点：移动开销大</text>
          <text x="601" y="148" textAnchor="middle" fontSize="10" fill="var(--danger)">适合老年代</text>

          {/* 中间：分代收集 */}
          <text x={VIEW_W / 2} y="182" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--text-primary)">分代收集策略</text>

          <rect x="100" y="194" width="540" height="52" rx="8" fill="var(--text-primary)" fillOpacity="0.06" stroke="var(--text-primary)" strokeWidth="1" strokeOpacity="0.3" />
          <text x="220" y="214" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">新生代（复制算法）</text>
          <text x="220" y="232" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">Eden:S0:S1 = 8:1:1</text>
          <text x="520" y="214" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">老年代（标记-清除/整理）</text>
          <text x="520" y="232" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">存活率高，移动少</text>

          {/* 下半部分：收集器演进 */}
          <text x={VIEW_W / 2} y="270" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">HotSpot 收集器演进</text>

          <rect x="30" y="282" width="140" height="62" rx="6" fill="var(--warning)" fillOpacity="0.08" stroke="var(--warning)" strokeWidth="1" />
          <text x="100" y="302" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">Serial / Serial Old</text>
          <text x="100" y="318" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">单线程，STW</text>
          <text x="100" y="332" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">客户端模式</text>

          <rect x="185" y="282" width="140" height="62" rx="6" fill="var(--warning)" fillOpacity="0.08" stroke="var(--warning)" strokeWidth="1" />
          <text x="255" y="302" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">ParNew / Parallel Scavenge</text>
          <text x="255" y="318" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">多线程并行，STW</text>
          <text x="255" y="332" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">吞吐量优先</text>

          <rect x="340" y="282" width="140" height="62" rx="6" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="1" />
          <text x="410" y="302" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">CMS</text>
          <text x="410" y="318" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">并发标记-清除</text>
          <text x="410" y="332" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">低停顿优先</text>

          <rect x="495" y="282" width="140" height="62" rx="6" fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" strokeWidth="1" />
          <text x="565" y="302" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">G1</text>
          <text x="565" y="318" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">Region 化分代</text>
          <text x="565" y="332" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">可预测停顿</text>

          <rect x="650" y="282" width="60" height="62" rx="6" fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" strokeWidth="1" />
          <text x="680" y="302" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">ZGC</text>
          <text x="680" y="318" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">染色指针</text>
          <text x="680" y="332" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">&lt;10ms</text>

          {/* 箭头 */}
          <text x="172" y="318" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>
          <text x="327" y="318" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>
          <text x="482" y="318" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>
          <text x="637" y="318" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>

          {/* GC Roots */}
          <text x={VIEW_W / 2} y="372" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--text-primary)">GC Roots（可达性分析起点）</text>
          <rect x="30" y="384" width="680" height="80" rx="8" fill="var(--danger)" fillOpacity="0.05" stroke="var(--danger)" strokeWidth="1" strokeOpacity="0.3" />
          <text x="120" y="404" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">虚拟机栈中引用的对象</text>
          <text x="280" y="404" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">方法区静态属性引用</text>
          <text x="440" y="404" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">方法区常量引用</text>
          <text x="600" y="404" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">本地方法栈 JNI 引用</text>
          <text x="120" y="424" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">同步锁持有的对象</text>
          <text x="280" y="424" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">JVM 内部引用</text>
          <text x="440" y="424" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">JMXBean 等</text>
          <text x="600" y="424" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">跨代引用</text>
          <text x={VIEW_W / 2} y="450" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">从 GC Roots 不可达 = 可回收对象</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        垃圾收集三种基础算法与HotSpot收集器从Serial到ZGC的演进路径，GC Roots可达性分析判定对象存活
      </figcaption>
    </figure>
  );
}
