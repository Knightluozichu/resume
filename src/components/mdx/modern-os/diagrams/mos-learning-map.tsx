/**
 * <MosLearningMapDiagram>：现代操作系统（第4版）全书学习地图图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 470;

export function MosLearningMapDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="现代操作系统全书学习地图图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="30" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            现代操作系统（第4版，Tanenbaum）全书学习地图
          </text>
          <text x={VIEW_W / 2} y="50" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            进程与线程 → 内存管理 → 文件与 I/O → 死锁与安全 → 总复习
          </text>

          <rect x="30" y="64" width="680" height="386" rx="12" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />

          {/* 第一排：进程与线程 */}
          <rect x="50" y="82" width="310" height="56" rx="8" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="205" y="104" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--warning)">进程与线程</text>
          <text x="205" y="122" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">第2章 进程管理（PCB/调度）</text>
          <text x="205" y="134" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">第3章 线程模型（用户/内核线程）</text>

          <rect x="380" y="82" width="310" height="56" rx="8" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="535" y="104" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--warning)">阶段目标</text>
          <text x="535" y="122" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">能执行：进程调度分配 CPU</text>
          <text x="535" y="134" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">能并发：线程表达并行</text>

          <text x="205" y="160" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>
          <text x="535" y="160" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>

          {/* 第二排：内存管理 */}
          <rect x="50" y="174" width="310" height="56" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="205" y="196" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">内存管理</text>
          <text x="205" y="214" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">第4章 内存管理（分段/分页）</text>
          <text x="205" y="226" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">第5章 页面置换（LRU/Clock）</text>

          <rect x="380" y="174" width="310" height="56" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="535" y="196" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">阶段目标</text>
          <text x="535" y="214" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">能存取：虚拟内存隔离地址</text>
          <text x="535" y="226" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">能置换：稀缺内存淘汰页面</text>

          <text x="205" y="252" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>
          <text x="535" y="252" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>

          {/* 第三排：文件与 I/O */}
          <rect x="50" y="266" width="310" height="56" rx="8" fill="var(--danger)" fillOpacity="0.12" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="205" y="288" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--danger)">文件与 I/O</text>
          <text x="205" y="306" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">第6章 文件系统（inode/目录）</text>
          <text x="205" y="318" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">第7章 磁盘调度（SCAN/C-SCAN）</text>

          <rect x="380" y="266" width="310" height="56" rx="8" fill="var(--danger)" fillOpacity="0.12" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="535" y="288" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--danger)">阶段目标</text>
          <text x="535" y="306" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">能持久：inode 映射磁盘块</text>
          <text x="535" y="318" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">能优化：调度减少寻道</text>

          <text x="205" y="344" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>
          <text x="535" y="344" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>

          {/* 第四排：死锁与安全 + 总复习 */}
          <rect x="50" y="358" width="310" height="56" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="205" y="380" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--success)">死锁与安全</text>
          <text x="205" y="398" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">第8章 死锁（检测/避免/预防）</text>
          <text x="205" y="410" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">第9章 安全保护（访问控制）</text>

          <rect x="380" y="358" width="310" height="56" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="535" y="380" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--success)">全书总复习</text>
          <text x="535" y="398" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">一个程序的一生串九章</text>
          <text x="535" y="410" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">资源管理闭环贯通全链</text>

          <text x={VIEW_W / 2} y="446" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            关键洞察：从「会用系统」到「懂操作系统」的五层进阶
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        现代操作系统全书学习地图——进程线程、内存管理、文件 I/O、死锁安全、总复习五阶段递进路径
      </figcaption>
    </figure>
  );
}
