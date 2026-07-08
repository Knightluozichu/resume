/**
 * <LkdFinalReviewDiagram>：全书复习——一次fork+exec+wait串联所有子系统图解。
 * 纯静态展示，无交互。Server Component。
 */

const VIEW_W = 740;
const VIEW_H = 500;

export function LkdFinalReviewDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="全书复习一次fork exec wait串联所有子系统图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            全书复习——一次 fork() + exec() + wait() 串联所有子系统
          </text>

          {/* fork */}
          <rect x="30" y="48" width="210" height="130" rx="8" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="135" y="68" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--warning)">1. fork()</text>
          <text x="40" y="88" fontSize="9" fill="var(--text-secondary)">系统调用进入内核</text>
          <text x="40" y="104" fontSize="9" fontWeight="600" fill="var(--warning)">涉及子系统:</text>
          <text x="40" y="118" fontSize="9" fill="var(--text-tertiary)">- 系统调用: syscall入口</text>
          <text x="40" y="132" fontSize="9" fill="var(--text-tertiary)">- 进程管理: 分配task_struct</text>
          <text x="40" y="146" fontSize="9" fill="var(--text-tertiary)">- 内存管理: COW复制地址空间</text>
          <text x="40" y="160" fontSize="9" fill="var(--text-tertiary)">- 进程管理: 共享files/signal</text>
          <text x="40" y="174" fontSize="9" fill="var(--text-tertiary)">- 调度器: 子进程入运行队列</text>

          {/* exec */}
          <rect x="265" y="48" width="210" height="130" rx="8" fill="var(--danger)" fillOpacity="0.10" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="370" y="68" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--danger)">2. exec()</text>
          <text x="275" y="88" fontSize="9" fill="var(--text-secondary)">加载新程序运行</text>
          <text x="275" y="104" fontSize="9" fontWeight="600" fill="var(--danger)">涉及子系统:</text>
          <text x="275" y="118" fontSize="9" fill="var(--text-tertiary)">- 系统调用: execve入口</text>
          <text x="275" y="132" fontSize="9" fill="var(--text-tertiary)">- VFS: 读取ELF文件头</text>
          <text x="275" y="146" fontSize="9" fill="var(--text-tertiary)">  (dentry/inode路径查找)</text>
          <text x="275" y="160" fontSize="9" fill="var(--text-tertiary)">- 内存管理: 销毁旧mm_struct</text>
          <text x="275" y="174" fontSize="9" fill="var(--text-tertiary)">  建新地址空间(代码/数据/堆栈)</text>

          {/* 运行 */}
          <rect x="500" y="48" width="210" height="130" rx="8" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="605" y="68" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--accent)">3. 运行中</text>
          <text x="510" y="88" fontSize="9" fill="var(--text-secondary)">子进程执行程序</text>
          <text x="510" y="104" fontSize="9" fontWeight="600" fill="var(--accent)">涉及子系统:</text>
          <text x="510" y="118" fontSize="9" fill="var(--text-tertiary)">- 调度器: CFS分配CPU时间</text>
          <text x="510" y="132" fontSize="9" fill="var(--text-tertiary)">- 系统调用: read/write等</text>
          <text x="510" y="146" fontSize="9" fill="var(--text-tertiary)">- VFS: 操作文件</text>
          <text x="510" y="160" fontSize="9" fill="var(--text-tertiary)">- 中断: I/O完成触发中断</text>
          <text x="510" y="174" fontSize="9" fill="var(--text-tertiary)">- 同步: 保护共享数据</text>

          {/* 箭头 */}
          <line x1="240" y1="113" x2="263" y2="113" stroke="var(--text-tertiary)" strokeWidth="1.2" markerEnd="url(#arr6)" />
          <line x1="475" y1="113" x2="498" y2="113" stroke="var(--text-tertiary)" strokeWidth="1.2" markerEnd="url(#arr6)" />

          {/* exit+wait */}
          <rect x="30" y="194" width="680" height="90" rx="8" fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" strokeWidth="1.2" />
          <text x="370" y="214" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--success)">4. exit() + 5. wait() — 进程终止与回收</text>
          <text x="50" y="232" fontSize="9" fill="var(--text-secondary)">exit(): do_exit() → 释放mm/files/signal → 设置EXIT_ZOMBIE → SIGCHLD通知父进程</text>
          <text x="50" y="248" fontSize="9" fill="var(--text-secondary)">wait(): 父进程系统调用进入内核 → 检查子进程僵尸态 → release_task()回收task_struct</text>
          <text x="50" y="268" fontSize="9" fill="var(--text-tertiary)">涉及: 系统调用(入口) + 进程管理(状态转换/资源释放) + 内存管理(释放地址空间) + 信号(SIGCHLD)</text>

          {/* 子系统串联全景 */}
          <rect x="30" y="298" width="680" height="120" rx="8" fill="var(--text-primary)" fillOpacity="0.04" stroke="var(--text-primary)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="370" y="318" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--text-primary)">全书七子系统全景</text>

          <rect x="50" y="328" width="85" height="36" rx="6" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1" />
          <text x="92" y="350" textAnchor="middle" fontSize="9" fontWeight="600" fill="var(--warning)">内核基础</text>

          <rect x="145" y="328" width="85" height="36" rx="6" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1" />
          <text x="187" y="350" textAnchor="middle" fontSize="9" fontWeight="600" fill="var(--accent)">进程调度</text>

          <rect x="240" y="328" width="85" height="36" rx="6" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1" />
          <text x="282" y="350" textAnchor="middle" fontSize="9" fontWeight="600" fill="var(--accent)">系统调用</text>

          <rect x="335" y="328" width="85" height="36" rx="6" fill="var(--danger)" fillOpacity="0.12" stroke="var(--danger)" strokeWidth="1" />
          <text x="377" y="350" textAnchor="middle" fontSize="9" fontWeight="600" fill="var(--danger)">中断处理</text>

          <rect x="430" y="328" width="85" height="36" rx="6" fill="var(--danger)" fillOpacity="0.12" stroke="var(--danger)" strokeWidth="1" />
          <text x="472" y="350" textAnchor="middle" fontSize="9" fontWeight="600" fill="var(--danger)">内核同步</text>

          <rect x="525" y="328" width="85" height="36" rx="6" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1" />
          <text x="567" y="350" textAnchor="middle" fontSize="9" fontWeight="600" fill="var(--success)">内存管理</text>

          <rect x="620" y="328" width="85" height="36" rx="6" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1" />
          <text x="662" y="350" textAnchor="middle" fontSize="9" fontWeight="600" fill="var(--success)">VFS</text>

          <text x="50" y="384" fontSize="9" fill="var(--text-secondary)">机制与策略分离贯穿各子系统: CFS机制(红黑树)+策略(nice参数) / VFS机制(四对象)+策略(文件系统实现)</text>
          <text x="50" y="400" fontSize="9" fill="var(--text-tertiary)">一切皆文件: 设备/proc/socket都是file对象, 统一open/read/write接口</text>
          <text x="50" y="414" fontSize="9" fill="var(--text-tertiary)">单片内核+模块化: LKM动态加载驱动, 兼顾性能与可扩展性</text>

          {/* 底部 */}
          <rect x="30" y="430" width="680" height="54" rx="6" fill="var(--text-primary)" fillOpacity="0.05" stroke="var(--text-primary)" strokeWidth="1" strokeOpacity="0.2" />
          <text x="50" y="450" fontSize="10" fontWeight="600" fill="var(--text-primary)">核心思想: 理解「为什么这样设计」而非「怎么调用API」</text>
          <text x="50" y="466" fontSize="9" fill="var(--text-secondary)">CFS为何用红黑树 / 自旋锁为何关抢占 / RCU读端为何零开销 / VFS为何用函数指针表</text>
          <text x="50" y="478" fontSize="9" fill="var(--text-tertiary)">能解释设计原因 → 能用crash分析vmcore / 能用eBPF追踪 / 能用ftrace绘制调用图</text>

          <defs>
            <marker id="arr6" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill="var(--text-tertiary)" />
            </marker>
          </defs>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        全书复习——一次进程从fork到exit的完整生命周期，串联系统调用、进程管理、调度、VFS、内存、中断、同步七大子系统
      </figcaption>
    </figure>
  );
}
