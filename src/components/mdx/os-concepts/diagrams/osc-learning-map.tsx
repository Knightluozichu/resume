/**
 * <OscLearningMapDiagram>：操作系统概念（恐龙书，第10版）全书学习地图图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 470;

export function OscLearningMapDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="操作系统概念全书学习地图图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="30" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            操作系统概念（恐龙书，第10版，Silberschatz）全书学习地图
          </text>
          <text x={VIEW_W / 2} y="50" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            结构与调度 → 并发与同步 → 内存与虚存 → 文件与存储 → 总复习
          </text>

          <rect x="30" y="64" width="680" height="386" rx="12" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />

          {/* 第一排：结构与调度 */}
          <rect x="50" y="82" width="310" height="56" rx="8" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="205" y="104" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--warning)">结构与调度</text>
          <text x="205" y="122" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">第1章 OS 结构（单体/微内核）</text>
          <text x="205" y="134" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">第2章 进程调度（FCFS/SJF/RR）</text>

          <rect x="380" y="82" width="310" height="56" rx="8" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="535" y="104" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--warning)">阶段目标</text>
          <text x="535" y="122" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">能组织：内核架构与服务接口</text>
          <text x="535" y="134" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">能调度：CPU 时间片分配</text>

          <text x="205" y="160" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>
          <text x="535" y="160" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>

          {/* 第二排：并发与同步 */}
          <rect x="50" y="174" width="310" height="56" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="205" y="196" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">并发与同步</text>
          <text x="205" y="214" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">第3章 线程与同步（互斥/信号量）</text>
          <text x="205" y="226" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">第4章 死锁（银行家算法）</text>

          <rect x="380" y="174" width="310" height="56" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="535" y="196" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">阶段目标</text>
          <text x="535" y="214" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">能并发：线程互斥保护临界区</text>
          <text x="535" y="226" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">能防死锁：避免/检测/恢复</text>

          <text x="205" y="252" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>
          <text x="535" y="252" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>

          {/* 第三排：内存与虚存 */}
          <rect x="50" y="266" width="310" height="56" rx="8" fill="var(--danger)" fillOpacity="0.12" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="205" y="288" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--danger)">内存与虚存</text>
          <text x="205" y="306" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">第5章 内存策略（分页/分段）</text>
          <text x="205" y="318" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">第6章 虚拟内存（请求分页/工作集）</text>

          <rect x="380" y="266" width="310" height="56" rx="8" fill="var(--danger)" fillOpacity="0.12" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="535" y="288" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--danger)">阶段目标</text>
          <text x="535" y="306" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">能隔离：分页翻译虚拟地址</text>
          <text x="535" y="318" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">能扩充：按需调页突破物理限制</text>

          <text x="205" y="344" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>
          <text x="535" y="344" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>

          {/* 第四排：文件与存储 + 总复习 */}
          <rect x="50" y="358" width="310" height="56" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="205" y="380" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--success)">文件与存储</text>
          <text x="205" y="398" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">第7章 文件系统实现（VFS/日志）</text>
          <text x="205" y="410" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">第8章 大容量存储（RAID/磁盘调度）</text>

          <rect x="380" y="358" width="310" height="56" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="535" y="380" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--success)">全书总复习</text>
          <text x="535" y="398" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">从 boot 到 shutdown 全链路</text>
          <text x="535" y="410" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">资源管理闭环贯通九章</text>

          <text x={VIEW_W / 2} y="446" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            关键洞察：从「内核结构」到「资源管理」的五层进阶
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        操作系统概念全书学习地图——结构调度、并发同步、内存虚存、文件存储、总复习五阶段递进路径
      </figcaption>
    </figure>
  );
}
