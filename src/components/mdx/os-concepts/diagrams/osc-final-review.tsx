/**
 * <OscFinalReviewDiagram>：全书总复习——操作系统资源管理闭环图解。
 * 纯静态展示，无交互。Server Component。
 */

const VIEW_W = 740;
const VIEW_H = 470;

export function OscFinalReviewDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="操作系统全书总复习资源管理闭环图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            操作系统概念：资源管理闭环全书总览
          </text>

          {/* 中心圆 */}
          <circle cx="370" cy="240" r="52" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.5" />
          <text x="370" y="234" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--accent)">操作系统</text>
          <text x="370" y="250" textAnchor="middle" fontSize="10" fill="var(--accent)">资源管理</text>

          {/* 四象限 */}
          {/* 左上：CPU 管理 */}
          <rect x="40" y="60" width="200" height="90" rx="8" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="140" y="82" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--warning)">CPU 管理</text>
          <text x="140" y="100" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">OS 结构（单体/微内核）</text>
          <text x="140" y="114" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">进程调度（FCFS/SJF/RR）</text>
          <text x="140" y="128" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">线程与同步（互斥/信号量）</text>
          <text x="140" y="142" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">死锁（银行家算法）</text>

          {/* 右上：内存管理 */}
          <rect x="500" y="60" width="200" height="90" rx="8" fill="var(--danger)" fillOpacity="0.10" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="600" y="82" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--danger)">内存管理</text>
          <text x="600" y="100" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">连续分配（碎片/压缩）</text>
          <text x="600" y="114" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">分页/分段（地址翻译）</text>
          <text x="600" y="128" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">虚拟内存（请求分页）</text>
          <text x="600" y="142" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">页面置换（LRU/工作集）</text>

          {/* 左下：文件系统 */}
          <rect x="40" y="330" width="200" height="90" rx="8" fill="var(--success)" fillOpacity="0.10" stroke="var(--success)" strokeWidth="1.2" />
          <text x="140" y="352" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">文件系统</text>
          <text x="140" y="370" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">VFS 虚拟文件系统</text>
          <text x="140" y="384" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">inode 与目录结构</text>
          <text x="140" y="398" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">日志文件系统（崩溃恢复）</text>
          <text x="140" y="412" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">硬链接 / 软链接</text>

          {/* 右下：大容量存储 */}
          <rect x="500" y="330" width="200" height="90" rx="8" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="600" y="352" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">大容量存储</text>
          <text x="600" y="370" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">磁盘结构（柱面/扇区）</text>
          <text x="600" y="384" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">磁盘调度（SCAN/C-SCAN）</text>
          <text x="600" y="398" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">RAID 0/1/5/6 冗余阵列</text>
          <text x="600" y="412" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">SSD 磨损均衡</text>

          {/* 连接线：中心到四象限 */}
          <line x1="200" y1="150" x2="330" y2="210" stroke="var(--warning)" strokeWidth="1.2" strokeOpacity="0.5" />
          <line x1="540" y1="150" x2="410" y2="210" stroke="var(--danger)" strokeWidth="1.2" strokeOpacity="0.5" />
          <line x1="200" y1="330" x2="330" y2="270" stroke="var(--success)" strokeWidth="1.2" strokeOpacity="0.5" />
          <line x1="540" y1="330" x2="410" y2="270" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.5" />

          {/* 上下连接箭头 */}
          <text x="370" y="175" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">调度执行</text>
          <text x="370" y="325" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">持久化存储</text>

          {/* 底部总结 */}
          <text x={VIEW_W / 2} y="446" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            从 boot 到 shutdown：CPU 调度让进程运行 → 内存管理让进程隔离 → 文件系统让数据持久 → 存储调度让 I/O 高效
          </text>
          <text x={VIEW_W / 2} y="462" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">
            操作系统 = 用抽象（进程/地址空间/文件）隔离 + 用调度（CPU/页面/磁盘）共享硬件资源
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        操作系统概念全书总复习——CPU 管理、内存管理、文件系统、大容量存储四象限资源管理闭环
      </figcaption>
    </figure>
  );
}
