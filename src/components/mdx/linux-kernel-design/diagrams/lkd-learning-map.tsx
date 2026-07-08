/**
 * <LkdLearningMapDiagram>：《Linux内核设计与实现》全书学习地图图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 500;

export function LkdLearningMapDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Linux内核设计与实现全书学习地图图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="30" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            Linux内核设计与实现——全书学习地图
          </text>
          <text x={VIEW_W / 2} y="50" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            内核基础 → 进程与调度 → 系统调用 → 中断 → 同步 → 内存 → VFS
          </text>

          <rect x="30" y="64" width="680" height="416" rx="12" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />

          {/* 第一排：内核基础 */}
          <rect x="50" y="82" width="310" height="56" rx="8" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="205" y="104" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--warning)">内核基础</text>
          <text x="205" y="122" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">第1-2章 内核简介与进程管理</text>
          <text x="205" y="134" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">架构 / 子系统 / task_struct</text>

          <rect x="380" y="82" width="310" height="56" rx="8" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="535" y="104" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--warning)">阶段目标</text>
          <text x="535" y="122" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">能理解：内核架构与设计哲学</text>
          <text x="535" y="134" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">能描述：进程表示与生命周期</text>

          <text x="205" y="160" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>
          <text x="535" y="160" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>

          {/* 第二排：进程调度 */}
          <rect x="50" y="174" width="310" height="56" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="205" y="196" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">进程调度与系统调用</text>
          <text x="205" y="214" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">第3-4章 CFS调度器与系统调用</text>
          <text x="205" y="226" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">vruntime / 红黑树 / syscall入口</text>

          <rect x="380" y="174" width="310" height="56" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="535" y="196" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">阶段目标</text>
          <text x="535" y="214" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">能调度：理解CFS公平调度原理</text>
          <text x="535" y="226" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">能进入：掌握系统调用全流程</text>

          <text x="205" y="252" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>
          <text x="535" y="252" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>

          {/* 第三排：中断与同步 */}
          <rect x="50" y="266" width="310" height="56" rx="8" fill="var(--danger)" fillOpacity="0.12" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="205" y="288" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--danger)">中断与内核同步</text>
          <text x="205" y="306" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">第5-6章 中断处理与同步方法</text>
          <text x="205" y="318" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">上下半部 / 自旋锁 / RCU</text>

          <rect x="380" y="266" width="310" height="56" rx="8" fill="var(--danger)" fillOpacity="0.12" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="535" y="288" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--danger)">阶段目标</text>
          <text x="535" y="306" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">能响应：掌握中断处理机制</text>
          <text x="535" y="318" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">能并发：理解同步原语取舍</text>

          <text x="205" y="344" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>
          <text x="535" y="344" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>

          {/* 第四排：内存与VFS */}
          <rect x="50" y="358" width="310" height="56" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="205" y="380" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--success)">内存管理与VFS</text>
          <text x="205" y="398" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">第7-8章 物理内存与虚拟文件系统</text>
          <text x="205" y="410" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">Buddy / Slab / 页表 / VFS四对象</text>

          <rect x="380" y="358" width="310" height="56" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="535" y="380" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--success)">阶段目标</text>
          <text x="535" y="398" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">能分配：掌握伙伴系统与Slab</text>
          <text x="535" y="410" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">能读写：理解VFS抽象层</text>

          <text x="205" y="436" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>
          <text x="535" y="436" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>

          {/* 第五排：全书复习 */}
          <rect x="50" y="450" width="310" height="40" rx="8" fill="var(--text-primary)" fillOpacity="0.08" stroke="var(--text-primary)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x="205" y="468" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--text-primary)">全书复习</text>
          <text x="205" y="482" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">第9章 一次fork+exec+wait串联全书</text>

          <rect x="380" y="450" width="310" height="40" rx="8" fill="var(--text-primary)" fillOpacity="0.08" stroke="var(--text-primary)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x="535" y="468" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--text-primary)">能贯通</text>
          <text x="535" y="482" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">从系统调用到硬件的完整数据通路</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Linux内核设计与实现全书学习地图——内核基础、进程调度、系统调用、中断、同步、内存管理、VFS七阶段递进路径
      </figcaption>
    </figure>
  );
}
