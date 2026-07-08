/**
 * <LkdLinuxKernelIntroDiagram>：Linux内核简介——架构与子系统图解。
 * 纯静态展示，无交互。Server Component。
 */

const VIEW_W = 740;
const VIEW_H = 500;

export function LkdLinuxKernelIntroDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Linux内核架构与子系统图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            Linux内核架构——用户态与内核态
          </text>

          {/* 用户态层 */}
          <rect x="30" y="48" width="680" height="70" rx="8" fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" strokeWidth="1.2" />
          <text x="370" y="70" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--success)">用户态（Ring 3）</text>
          <text x="150" y="92" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">应用程序</text>
          <text x="370" y="92" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">C 库（glibc）</text>
          <text x="590" y="92" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">shell / 工具</text>
          <text x="370" y="108" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">独立虚拟地址空间 / 不能执行特权指令</text>

          {/* 系统调用接口 */}
          <rect x="30" y="130" width="680" height="36" rx="6" fill="var(--warning)" fillOpacity="0.15" stroke="var(--warning)" strokeWidth="1.5" />
          <text x="370" y="153" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--warning)">系统调用接口（syscall: open read write fork mmap ...）</text>

          {/* 箭头 */}
          <text x="370" y="180" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&darr; 特权级切换 &uarr;</text>

          {/* 内核态层 */}
          <rect x="30" y="190" width="680" height="230" rx="8" fill="var(--danger)" fillOpacity="0.06" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="370" y="210" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--danger)">内核态（Ring 0）—— 单片内核 + 可加载模块</text>

          {/* 内核子系统网格 */}
          <rect x="50" y="222" width="140" height="56" rx="6" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1" />
          <text x="120" y="244" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">进程管理</text>
          <text x="120" y="260" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">task_struct</text>
          <text x="120" y="272" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">fork / exit</text>

          <rect x="200" y="222" width="140" height="56" rx="6" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1" />
          <text x="270" y="244" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">进程调度</text>
          <text x="270" y="260" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">CFS / 红黑树</text>
          <text x="270" y="272" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">vruntime</text>

          <rect x="350" y="222" width="140" height="56" rx="6" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1" />
          <text x="420" y="244" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">内存管理</text>
          <text x="420" y="260" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">Buddy / Slab</text>
          <text x="420" y="272" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">页表 / mmap</text>

          <rect x="500" y="222" width="190" height="56" rx="6" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1" />
          <text x="595" y="244" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">虚拟文件系统（VFS）</text>
          <text x="595" y="260" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">inode / dentry / file</text>
          <text x="595" y="272" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">Page Cache</text>

          <rect x="50" y="290" width="210" height="56" rx="6" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1" />
          <text x="155" y="312" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">中断处理</text>
          <text x="155" y="328" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">上半部 / 下半部</text>
          <text x="155" y="340" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">softirq / workqueue</text>

          <rect x="270" y="290" width="210" height="56" rx="6" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1" />
          <text x="375" y="312" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">内核同步</text>
          <text x="375" y="328" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">自旋锁 / 信号量</text>
          <text x="375" y="340" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">RCU / 原子操作</text>

          <rect x="490" y="290" width="200" height="56" rx="6" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1" />
          <text x="590" y="312" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">网络协议栈</text>
          <text x="590" y="328" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">TCP / UDP / netfilter</text>
          <text x="590" y="340" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">socket / sk_buff</text>

          {/* 可加载模块 */}
          <rect x="50" y="358" width="640" height="48" rx="6" fill="var(--text-primary)" fillOpacity="0.06" stroke="var(--text-primary)" strokeWidth="1" strokeOpacity="0.3" />
          <text x="370" y="378" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">可加载内核模块（LKM）—— 动态加载/卸载驱动与文件系统</text>
          <text x="370" y="394" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">insmod / rmmod / lsmod</text>

          {/* 硬件层 */}
          <rect x="30" y="432" width="680" height="50" rx="8" fill="var(--text-tertiary)" fillOpacity="0.10" stroke="var(--text-tertiary)" strokeWidth="1.2" />
          <text x="370" y="454" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--text-tertiary)">硬件层</text>
          <text x="370" y="470" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">CPU（MMU/TLB/Cache） / 内存 / 磁盘 / 网卡 / 设备</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Linux内核架构分层——用户态、系统调用接口、内核态各子系统、可加载模块、硬件层
      </figcaption>
    </figure>
  );
}
