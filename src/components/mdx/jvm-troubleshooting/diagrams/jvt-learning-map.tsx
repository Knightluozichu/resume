/**
 * <JvtLearningMapDiagram>：JVM故障诊断与性能优化 全书学习地图图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 520;

export function JvtLearningMapDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="JVM故障诊断与性能优化全书学习地图图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            JVM故障诊断与性能优化——全书学习地图
          </text>
          <text x={VIEW_W / 2} y="48" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            架构 → 内存 → GC → 调优 → 工具 → 线程 → 泄漏 → CPU → 复习
          </text>

          <rect x="30" y="62" width="680" height="442" rx="12" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />

          {/* 第一排：JVM架构与类加载 与 JVM内存模型 */}
          <rect x="50" y="80" width="310" height="56" rx="8" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="205" y="102" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--warning)">JVM架构与类加载</text>
          <text x="205" y="120" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">第1章 运行时数据区/类加载机制</text>
          <text x="205" y="132" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">双亲委派/执行引擎</text>

          <rect x="380" y="80" width="310" height="56" rx="8" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="535" y="102" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--warning)">JVM内存模型</text>
          <text x="535" y="120" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">第2章 堆/栈/方法区/元空间</text>
          <text x="535" y="132" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">对象布局/内存溢出</text>

          <text x="205" y="156" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>
          <text x="535" y="156" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>

          {/* 第二排：垃圾回收机制 与 GC调优实践 */}
          <rect x="50" y="170" width="310" height="56" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="205" y="192" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">垃圾回收机制</text>
          <text x="205" y="210" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">第3章 GC Roots/可达性分析</text>
          <text x="205" y="222" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">分代收集/收集器对比</text>

          <rect x="380" y="170" width="310" height="56" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="535" y="192" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">GC调优实践</text>
          <text x="535" y="210" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">第4章 G1/ZGC参数调优</text>
          <text x="535" y="222" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">停顿时间/吞吐量权衡</text>

          <text x="205" y="246" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>
          <text x="535" y="246" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>

          {/* 第三排：JVM诊断工具 与 线程分析与死锁 */}
          <rect x="50" y="260" width="310" height="56" rx="8" fill="var(--danger)" fillOpacity="0.12" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="205" y="282" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--danger)">JVM诊断工具</text>
          <text x="205" y="300" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">第5章 jps/jstat/jmap/jstack</text>
          <text x="205" y="312" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">jcmd/MAT/Arthas</text>

          <rect x="380" y="260" width="310" height="56" rx="8" fill="var(--danger)" fillOpacity="0.12" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="535" y="282" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--danger)">线程分析与死锁</text>
          <text x="535" y="300" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">第6章 线程状态/jstack dump</text>
          <text x="535" y="312" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">死锁检测/线程池</text>

          <text x="205" y="336" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>
          <text x="535" y="336" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>

          {/* 第四排：内存泄漏排查 与 CPU性能分析 */}
          <rect x="50" y="350" width="310" height="56" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="205" y="372" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--success)">内存泄漏排查</text>
          <text x="205" y="390" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">第7章 MAT/Retained Heap</text>
          <text x="205" y="402" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">ThreadLocal/静态集合泄漏</text>

          <rect x="380" y="350" width="310" height="56" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="535" y="372" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--success)">CPU性能分析</text>
          <text x="535" y="390" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">第8章 火焰图/热点定位</text>
          <text x="535" y="402" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">JIT编译/锁竞争自旋</text>

          <text x="205" y="426" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>
          <text x="535" y="426" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>

          {/* 第五排：全书复习 */}
          <rect x="50" y="440" width="640" height="56" rx="8" fill="var(--text-primary)" fillOpacity="0.08" stroke="var(--text-primary)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x="370" y="462" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--text-primary)">全书复习</text>
          <text x="370" y="480" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">第9章 从架构到诊断——JVM故障诊断全栈技术体系整合</text>
          <text x="370" y="492" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">理论地基 / GC / 工具 / 三大故障场景 完整体系</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        JVM故障诊断与性能优化全书学习地图——架构、内存、GC、调优、工具、线程、泄漏、CPU八阶段递进路径
      </figcaption>
    </figure>
  );
}
