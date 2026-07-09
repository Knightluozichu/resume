/**
 * <GchLearningMapDiagram>：垃圾回收算法手册 全书学习地图图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 560;

export function GchLearningMapDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="垃圾回收算法手册全书学习地图图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            垃圾回收算法手册——全书学习地图
          </text>
          <text x={VIEW_W / 2} y="48" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            概述 → 标记清除 → 复制 → 标记压缩 → 分代 → 并发 → 实时 → 现代对比 → 复习
          </text>

          <rect x="30" y="62" width="680" height="482" rx="12" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />

          {/* 第一排：学习地图 与 GC概述 */}
          <rect x="50" y="80" width="310" height="56" rx="8" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="205" y="102" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--warning)">全书学习地图</text>
          <text x="205" y="120" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">第0章 知识体系总览</text>
          <text x="205" y="132" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">三大维度：算法/性能/工程</text>

          <rect x="380" y="80" width="310" height="56" rx="8" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="535" y="102" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--warning)">GC概述与历史</text>
          <text x="535" y="120" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">第1章 自动内存管理起源</text>
          <text x="535" y="132" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">STW/吞吐/延迟 性能指标</text>

          <text x="205" y="156" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>
          <text x="535" y="156" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>

          {/* 第二排：标记-清除 与 复制式回收 */}
          <rect x="50" y="170" width="310" height="56" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="205" y="192" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">标记-清除算法</text>
          <text x="205" y="210" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">第2章 三色标记/自由链表</text>
          <text x="205" y="222" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">碎片问题/位图标记</text>

          <rect x="380" y="170" width="310" height="56" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="535" y="192" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">复制式回收</text>
          <text x="535" y="210" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">第3章 Cheney算法/指针追踪</text>
          <text x="535" y="222" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">From/To半区/无碎片</text>

          <text x="205" y="246" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>
          <text x="535" y="246" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>

          {/* 第三排：标记-压缩 与 分代回收 */}
          <rect x="50" y="260" width="310" height="56" rx="8" fill="var(--danger)" fillOpacity="0.12" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="205" y="282" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--danger)">标记-压缩算法</text>
          <text x="205" y="300" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">第4章 滑动压缩/Two-Finger</text>
          <text x="205" y="312" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">表格法/转发指针</text>

          <rect x="380" y="260" width="310" height="56" rx="8" fill="var(--danger)" fillOpacity="0.12" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="535" y="282" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--danger)">分代回收</text>
          <text x="535" y="300" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">第5章 弱分代假说/写屏障</text>
          <text x="535" y="312" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">卡表/ remembered set</text>

          <text x="205" y="336" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>
          <text x="535" y="336" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>

          {/* 第四排：并发回收 与 实时GC */}
          <rect x="50" y="350" width="310" height="56" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="205" y="372" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--success)">并发回收</text>
          <text x="205" y="390" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">第6章 三色不变式/SATB</text>
          <text x="205" y="402" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">增量回收/读写屏障</text>

          <rect x="380" y="350" width="310" height="56" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="535" y="372" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--success)">实时GC</text>
          <text x="535" y="390" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">第7章 工作量/截止时间</text>
          <text x="535" y="402" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">Metronome/Slack调度</text>

          <text x="205" y="426" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>
          <text x="535" y="426" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>

          {/* 第五排：现代GC对比 与 全书复习 */}
          <rect x="50" y="440" width="310" height="56" rx="8" fill="var(--text-primary)" fillOpacity="0.08" stroke="var(--text-primary)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x="205" y="462" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--text-primary)">现代GC对比</text>
          <text x="205" y="480" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">第8章 G1/ZGC/Shenandoah</text>
          <text x="205" y="492" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">CMS退场/染色指针</text>

          <rect x="380" y="440" width="310" height="56" rx="8" fill="var(--text-primary)" fillOpacity="0.08" stroke="var(--text-primary)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x="535" y="462" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--text-primary)">全书复习</text>
          <text x="535" y="480" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">第9章 算法选型矩阵</text>
          <text x="535" y="492" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">算法→性能→工程 完整闭环</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        垃圾回收算法手册全书学习地图——概述、标记清除、复制、标记压缩、分代、并发、实时、现代GC对比九阶段递进路径
      </figcaption>
    </figure>
  );
}
