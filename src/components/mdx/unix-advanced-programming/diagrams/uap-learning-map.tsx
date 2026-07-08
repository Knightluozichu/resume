/**
 * <UapLearningMapDiagram>：《UNIX环境高级编程》全书学习地图图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 520;

export function UapLearningMapDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="UNIX环境高级编程全书学习地图图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            UNIX环境高级编程——全书学习地图
          </text>
          <text x={VIEW_W / 2} y="48" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            文件I/O → 进程控制 → 信号 → IPC → 线程 → 高级I/O
          </text>

          <rect x="30" y="62" width="680" height="442" rx="12" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />

          {/* 第一排：基础与文件I/O */}
          <rect x="50" y="80" width="310" height="56" rx="8" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="205" y="102" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--warning)">基础与文件I/O</text>
          <text x="205" y="120" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">第1-2章 UNIX基础与文件I/O</text>
          <text x="205" y="132" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">open/read/write/close/fcntl</text>

          <rect x="380" y="80" width="310" height="56" rx="8" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="535" y="102" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--warning)">阶段目标</text>
          <text x="535" y="120" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">能操作：掌握文件描述符与I/O</text>
          <text x="535" y="132" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">能描述：UNIX标准与限制</text>

          <text x="205" y="156" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>
          <text x="535" y="156" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>

          {/* 第二排：文件与目录 + 进程环境 */}
          <rect x="50" y="170" width="310" height="56" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="205" y="192" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">文件目录与进程环境</text>
          <text x="205" y="210" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">第3-4章 stat/目录/environ</text>
          <text x="205" y="222" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">inode / 目录遍历 / 环境变量</text>

          <rect x="380" y="170" width="310" height="56" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="535" y="192" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">阶段目标</text>
          <text x="535" y="210" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">能管理：理解文件属性与目录</text>
          <text x="535" y="222" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">能运行：掌握进程启动与环境</text>

          <text x="205" y="246" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>
          <text x="535" y="246" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>

          {/* 第三排：进程控制 + 信号 */}
          <rect x="50" y="260" width="310" height="56" rx="8" fill="var(--danger)" fillOpacity="0.12" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="205" y="282" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--danger)">进程控制与信号</text>
          <text x="205" y="300" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">第5-6章 fork/exec/wait/signal</text>
          <text x="205" y="312" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">进程创建 / 信号处理 / sigaction</text>

          <rect x="380" y="260" width="310" height="56" rx="8" fill="var(--danger)" fillOpacity="0.12" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="535" y="282" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--danger)">阶段目标</text>
          <text x="535" y="300" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">能控制：掌握进程生命周期</text>
          <text x="535" y="312" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">能响应：理解异步信号机制</text>

          <text x="205" y="336" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>
          <text x="535" y="336" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>

          {/* 第四排：IPC + 线程 */}
          <rect x="50" y="350" width="310" height="56" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="205" y="372" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--success)">进程间通信与线程</text>
          <text x="205" y="390" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">第7-8章 管道/消息队列/线程</text>
          <text x="205" y="402" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">pipe / mmap / pthread / 互斥</text>

          <rect x="380" y="350" width="310" height="56" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="535" y="372" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--success)">阶段目标</text>
          <text x="535" y="390" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">能通信：掌握IPC机制与选择</text>
          <text x="535" y="402" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">能并发：理解线程同步原语</text>

          <text x="205" y="426" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>
          <text x="535" y="426" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>

          {/* 第五排：高级I/O + 全书复习 */}
          <rect x="50" y="440" width="310" height="56" rx="8" fill="var(--text-primary)" fillOpacity="0.08" stroke="var(--text-primary)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x="205" y="462" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--text-primary)">高级I/O与全书复习</text>
          <text x="205" y="480" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">第9-10章 select/poll/epoll</text>
          <text x="205" y="492" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">非阻塞I/O / 多路转接</text>

          <rect x="380" y="440" width="310" height="56" rx="8" fill="var(--text-primary)" fillOpacity="0.08" stroke="var(--text-primary)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x="535" y="462" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--text-primary)">能贯通</text>
          <text x="535" y="480" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">从文件I/O到高级I/O完整链路</text>
          <text x="535" y="492" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">从单进程到多线程并发编程</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        UNIX环境高级编程全书学习地图——基础I/O、进程控制、信号、IPC、线程、高级I/O六阶段递进路径
      </figcaption>
    </figure>
  );
}
