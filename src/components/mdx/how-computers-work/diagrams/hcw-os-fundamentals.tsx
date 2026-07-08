/**
 * <HcwOsFundamentalsDiagram>：操作系统基础图解——核心功能与进程/内存管理。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 460;

export function HcwOsFundamentalsDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="操作系统基础图解——核心功能与进程内存管理"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            操作系统：硬件与应用之间的资源管理者
          </text>

          {/* 三层架构 */}
          <rect x="100" y="48" width="540" height="36" rx="8" fill="var(--success)" fillOpacity="0.15" stroke="var(--success)" strokeWidth="1.2" />
          <text x="370" y="70" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">应用层（浏览器 / 编辑器 / 游戏）</text>

          <rect x="100" y="90" width="540" height="36" rx="8" fill="var(--warning)" fillOpacity="0.18" stroke="var(--warning)" strokeWidth="1.5" />
          <text x="370" y="112" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--warning)">操作系统内核（系统调用接口）</text>

          <rect x="100" y="132" width="540" height="36" rx="8" fill="var(--danger)" fillOpacity="0.15" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="370" y="154" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--danger)">硬件层（CPU / 内存 / 磁盘 / 设备）</text>

          {/* 五大功能 */}
          <text x="370" y="192" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">操作系统五大核心功能</text>

          <rect x="30" y="200" width="128" height="56" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1" />
          <text x="94" y="220" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">进程管理</text>
          <text x="94" y="236" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">创建/调度/销毁</text>
          <text x="94" y="248" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">多任务并发</text>

          <rect x="170" y="200" width="128" height="56" rx="8" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1" />
          <text x="234" y="220" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">内存管理</text>
          <text x="234" y="236" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">虚拟内存/分页</text>
          <text x="234" y="248" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">进程隔离</text>

          <rect x="310" y="200" width="128" height="56" rx="8" fill="var(--danger)" fillOpacity="0.12" stroke="var(--danger)" strokeWidth="1" />
          <text x="374" y="220" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--danger)">文件系统</text>
          <text x="374" y="236" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">文件/目录</text>
          <text x="374" y="248" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">磁盘抽象</text>

          <rect x="450" y="200" width="128" height="56" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1" />
          <text x="514" y="220" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">设备管理</text>
          <text x="514" y="236" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">驱动程序</text>
          <text x="514" y="248" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">统一接口</text>

          <rect x="590" y="200" width="120" height="56" rx="8" fill="var(--text-tertiary)" fillOpacity="0.10" stroke="var(--text-tertiary)" strokeWidth="1" />
          <text x="650" y="220" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-tertiary)">网络与安全</text>
          <text x="650" y="236" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">协议栈/权限</text>
          <text x="650" y="248" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">进程保护</text>

          {/* 左下：进程 vs 线程 */}
          <rect x="30" y="272" width="330" height="168" rx="10" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="195" y="292" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">进程 vs 线程</text>

          <text x="50" y="310" textAnchor="start" fontSize="9" fill="var(--success)" fontWeight="600">进程</text>
          <text x="50" y="324" textAnchor="start" fontSize="8" fill="var(--text-secondary)">独立地址空间 · 资源分配单位</text>
          <text x="50" y="336" textAnchor="start" fontSize="8" fill="var(--text-tertiary)">隔离好 · 创建/切换开销大</text>

          <text x="50" y="356" textAnchor="start" fontSize="9" fill="var(--warning)" fontWeight="600">线程</text>
          <text x="50" y="370" textAnchor="start" fontSize="8" fill="var(--text-secondary)">进程内执行单元 · CPU 调度单位</text>
          <text x="50" y="382" textAnchor="start" fontSize="8" fill="var(--text-tertiary)">共享内存 · 切换快 10-100x</text>

          <rect x="50" y="392" width="290" height="40" rx="6" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="0.8" />
          <text x="60" y="408" textAnchor="start" fontSize="8" fill="var(--text-secondary)">进程 = 资源容器 · 线程 = 执行流</text>
          <text x="60" y="422" textAnchor="start" fontSize="8" fill="var(--text-tertiary)">多进程隔离安全 · 多线程通信高效</text>

          {/* 右下：中断与系统调用 */}
          <rect x="380" y="272" width="330" height="168" rx="10" fill="var(--warning)" fillOpacity="0.06" stroke="var(--warning)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="545" y="292" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--warning)">中断与系统调用</text>

          <text x="400" y="310" textAnchor="start" fontSize="9" fill="var(--success)" fontWeight="600">硬件中断</text>
          <text x="460" y="310" textAnchor="start" fontSize="8" fill="var(--text-secondary)">键盘/网卡/定时器（异步）</text>

          <text x="400" y="326" textAnchor="start" fontSize="9" fill="var(--danger)" fontWeight="600">软件中断</text>
          <text x="460" y="326" textAnchor="start" fontSize="8" fill="var(--text-secondary)">除零/缺页/非法指令（同步）</text>

          <text x="400" y="346" textAnchor="start" fontSize="9" fill="var(--warning)" fontWeight="600">系统调用</text>
          <text x="460" y="346" textAnchor="start" fontSize="8" fill="var(--text-secondary)">用户态 → 内核态的「门」</text>

          <rect x="400" y="356" width="180" height="26" rx="6" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="0.8" />
          <text x="490" y="373" textAnchor="middle" fontSize="8" fill="var(--accent)" fontFamily="monospace">syscall / int 0x80</text>

          <text x="400" y="396" textAnchor="start" fontSize="8" fill="var(--text-secondary)">read/write/open/close</text>
          <text x="400" y="410" textAnchor="start" fontSize="8" fill="var(--text-secondary)">fork/exec/mmap</text>
          <text x="400" y="426" textAnchor="start" fontSize="8" fill="var(--text-tertiary)">所有硬件操作必须经系统调用</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        操作系统基础图解——三大层级、五大核心功能、进程 vs 线程、中断与系统调用
      </figcaption>
    </figure>
  );
}
