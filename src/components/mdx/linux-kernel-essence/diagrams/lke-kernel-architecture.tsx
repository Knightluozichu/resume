/**
 * <LkeKernelArchitectureDiagram>：Linux内核架构分层图解。
 * 纯静态展示，无交互。Server Component。
 */

const VIEW_W = 740;
const VIEW_H = 500;

export function LkeKernelArchitectureDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Linux内核架构分层图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            Linux内核架构——从用户应用到硬件
          </text>

          {/* 用户空间 */}
          <rect x="40" y="50" width="660" height="80" rx="10" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="60" y="72" fontSize="13" fontWeight="600" fill="var(--warning)">用户空间（User Space, Ring 3）</text>
          <rect x="60" y="82" width="140" height="36" rx="6" fill="var(--warning)" fillOpacity="0.18" stroke="var(--warning)" strokeWidth="1" />
          <text x="130" y="105" textAnchor="middle" fontSize="11" fill="var(--text-primary)">应用程序</text>
          <rect x="220" y="82" width="140" height="36" rx="6" fill="var(--warning)" fillOpacity="0.18" stroke="var(--warning)" strokeWidth="1" />
          <text x="290" y="105" textAnchor="middle" fontSize="11" fill="var(--text-primary)">C 库（glibc）</text>
          <rect x="380" y="82" width="140" height="36" rx="6" fill="var(--warning)" fillOpacity="0.18" stroke="var(--warning)" strokeWidth="1" />
          <text x="450" y="105" textAnchor="middle" fontSize="11" fill="var(--text-primary)">shell / 系统</text>
          <rect x="540" y="82" width="140" height="36" rx="6" fill="var(--warning)" fillOpacity="0.18" stroke="var(--warning)" strokeWidth="1" />
          <text x="610" y="105" textAnchor="middle" fontSize="11" fill="var(--text-primary)">容器运行时</text>

          {/* 系统调用接口 */}
          <rect x="40" y="140" width="660" height="32" rx="6" fill="var(--accent)" fillOpacity="0.15" stroke="var(--accent)" strokeWidth="1.2" />
          <text x={VIEW_W / 2} y="161" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">系统调用接口（syscall: read / write / open / fork / mmap / ioctl ...）</text>

          {/* 内核空间 */}
          <rect x="40" y="182" width="660" height="238" rx="10" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="60" y="202" fontSize="13" fontWeight="600" fill="var(--accent)">内核空间（Kernel Space, Ring 0）</text>

          {/* 进程管理 */}
          <rect x="60" y="212" width="145" height="58" rx="6" fill="var(--danger)" fillOpacity="0.12" stroke="var(--danger)" strokeWidth="1" />
          <text x="132" y="232" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--danger)">进程管理</text>
          <text x="132" y="248" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">调度器 CFS</text>
          <text x="132" y="261" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">task_struct / 信号</text>

          {/* 内存管理 */}
          <rect x="220" y="212" width="145" height="58" rx="6" fill="var(--danger)" fillOpacity="0.12" stroke="var(--danger)" strokeWidth="1" />
          <text x="292" y="232" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--danger)">内存管理</text>
          <text x="292" y="248" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">Buddy / Slab</text>
          <text x="292" y="261" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">虚拟内存 / 页表</text>

          {/* 文件系统 */}
          <rect x="380" y="212" width="145" height="58" rx="6" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1" />
          <text x="452" y="232" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">文件系统</text>
          <text x="452" y="248" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">VFS / ext4</text>
          <text x="452" y="261" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">Page Cache</text>

          {/* 网络协议栈 */}
          <rect x="540" y="212" width="145" height="58" rx="6" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1" />
          <text x="612" y="232" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">网络协议栈</text>
          <text x="612" y="248" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">TCP / UDP / IP</text>
          <text x="612" y="261" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">socket / sk_buff</text>

          {/* 内核基础设施 */}
          <rect x="60" y="282" width="290" height="50" rx="6" fill="var(--text-primary)" fillOpacity="0.06" stroke="var(--text-primary)" strokeWidth="0.8" strokeOpacity="0.3" />
          <text x="205" y="300" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">内核基础设施</text>
          <text x="205" y="316" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">中断 / 时钟 / 同步原语 / 模块加载</text>
          <text x="205" y="328" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">RCU / 自旋锁 / 工作队列</text>

          {/* 设备驱动 */}
          <rect x="365" y="282" width="320" height="50" rx="6" fill="var(--text-primary)" fillOpacity="0.06" stroke="var(--text-primary)" strokeWidth="0.8" strokeOpacity="0.3" />
          <text x="525" y="300" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">设备驱动</text>
          <text x="525" y="316" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">字符设备 / 块设备 / 网络设备驱动</text>
          <text x="525" y="328" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">DMA / IRQ / 设备模型</text>

          {/* 架构相关 */}
          <rect x="60" y="344" width="625" height="42" rx="6" fill="var(--text-tertiary)" fillOpacity="0.08" stroke="var(--text-tertiary)" strokeWidth="0.8" />
          <text x="372" y="362" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-tertiary)">体系结构相关代码（arch/）</text>
          <text x="372" y="378" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">x86 / ARM / RISC-V — 页表设置 / 中断入口 / 上下文切换 / 原子操作</text>

          {/* 硬件 */}
          <rect x="40" y="430" width="660" height="50" rx="10" fill="var(--text-primary)" fillOpacity="0.06" stroke="var(--text-primary)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x="120" y="460" textAnchor="middle" fontSize="11" fill="var(--text-primary)">CPU</text>
          <text x="260" y="460" textAnchor="middle" fontSize="11" fill="var(--text-primary)">内存（RAM）</text>
          <text x="400" y="460" textAnchor="middle" fontSize="11" fill="var(--text-primary)">磁盘</text>
          <text x="540" y="460" textAnchor="middle" fontSize="11" fill="var(--text-primary)">网卡</text>
          <text x="640" y="460" textAnchor="middle" fontSize="11" fill="var(--text-primary)">其他外设</text>

          {/* 箭头标注 */}
          <text x="20" y="100" fontSize="9" fill="var(--text-tertiary)">Ring 3</text>
          <text x="20" y="300" fontSize="9" fill="var(--text-tertiary)">Ring 0</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Linux内核架构分层——用户空间通过系统调用进入内核空间，内核包含进程、内存、文件、网络四大子系统及基础设施与设备驱动
      </figcaption>
    </figure>
  );
}
