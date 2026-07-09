/**
 * <Jg1LearningMapDiagram>：JVM G1源码分析和调优 全书学习地图图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 560;

export function Jg1LearningMapDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="JVM G1源码分析和调优全书学习地图图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            JVM G1源码分析和调优——全书学习地图
          </text>
          <text x={VIEW_W / 2} y="48" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            概述 → Region → RSet → GC周期 → Young GC → Mixed GC → Full GC → 调优 → 复习
          </text>

          <rect x="30" y="62" width="680" height="482" rx="12" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />

          {/* 第一排：学习地图 与 G1收集器概述 */}
          <rect x="50" y="80" width="310" height="56" rx="8" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="205" y="102" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--warning)">全书学习地图</text>
          <text x="205" y="120" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">第0章 知识体系总览</text>
          <text x="205" y="132" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">G1架构→GC周期→调优 三层递进</text>

          <rect x="380" y="80" width="310" height="56" rx="8" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="535" y="102" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--warning)">G1收集器概述</text>
          <text x="535" y="120" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">第1章 设计目标/Region类型</text>
          <text x="535" y="132" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">三色标记/SATB/Garbage First</text>

          <text x="205" y="156" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>
          <text x="535" y="156" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>

          {/* 第二排：Region管理 与 RSet与卡表 */}
          <rect x="50" y="170" width="310" height="56" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="205" y="192" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">Region管理与内存布局</text>
          <text x="205" y="210" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">第2章 Region大小/状态机</text>
          <text x="205" y="222" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">Eden/Survivor/Old/Humongous</text>

          <rect x="380" y="170" width="310" height="56" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="535" y="192" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">RSet与卡表</text>
          <text x="535" y="210" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">第3章 反向引用索引/卡表</text>
          <text x="535" y="222" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">Write Barrier/DCQ/Refine</text>

          <text x="205" y="246" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>
          <text x="535" y="246" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>

          {/* 第三排：G1 GC周期 与 Young GC源码分析 */}
          <rect x="50" y="260" width="310" height="56" rx="8" fill="var(--danger)" fillOpacity="0.12" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="205" y="282" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--danger)">G1 GC周期</text>
          <text x="205" y="300" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">第4章 并发标记五阶段</text>
          <text x="205" y="312" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">IHOP/CSet选择/可预测停顿</text>

          <rect x="380" y="260" width="310" height="56" rx="8" fill="var(--danger)" fillOpacity="0.12" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="535" y="282" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--danger)">Young GC源码分析</text>
          <text x="535" y="300" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">第5章 根扫描/RSet扫描</text>
          <text x="535" y="312" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">evacuation/PLAB/自适应策略</text>

          <text x="205" y="336" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>
          <text x="535" y="336" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>

          {/* 第四排：Mixed GC源码 与 Full GC与退化 */}
          <rect x="50" y="350" width="310" height="56" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="205" y="372" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--success)">Mixed GC源码分析</text>
          <text x="205" y="390" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">第6章 老年代增量回收</text>
          <text x="205" y="402" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">CSet选择/终止条件/evacuation</text>

          <rect x="380" y="350" width="310" height="56" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="535" y="372" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--success)">Full GC与退化</text>
          <text x="535" y="390" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">第7章 疏散失败/标记-整理</text>
          <text x="535" y="402" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">退化路径/避免策略</text>

          <text x="205" y="426" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>
          <text x="535" y="426" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>

          {/* 第五排：G1调优实践 */}
          <rect x="50" y="440" width="310" height="56" rx="8" fill="var(--text-primary)" fillOpacity="0.08" stroke="var(--text-primary)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x="205" y="462" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--text-primary)">G1调优实践</text>
          <text x="205" y="480" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">第8章 参数调优/GC日志</text>
          <text x="205" y="492" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">Full GC排查/大堆优化</text>

          <rect x="380" y="440" width="310" height="56" rx="8" fill="var(--text-primary)" fillOpacity="0.08" stroke="var(--text-primary)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x="535" y="462" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--text-primary)">全书复习</text>
          <text x="535" y="480" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">第9章 源码对比/调优实战</text>
          <text x="535" y="492" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">Region→RSet→GC周期→调优 完整闭环</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        JVM G1源码分析和调优全书学习地图——概述、Region、RSet、GC周期、Young/Mixed/Full GC、调优实践九阶段递进路径
      </figcaption>
    </figure>
  );
}
