/**
 * <OscOsStructureDiagram>：操作系统结构——单体/微内核/混合三种内核架构对比图解。
 * 纯静态展示，无交互。Server Component。
 */

const VIEW_W = 740;
const VIEW_H = 470;

export function OscOsStructureDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="操作系统三种内核架构对比图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            操作系统结构：单体 vs 微内核 vs 混合
          </text>

          {/* 三列对比 */}
          {/* 单体内核 */}
          <rect x="30" y="50" width="220" height="400" rx="10" fill="var(--warning)" fillOpacity="0.06" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="140" y="74" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--warning)">单体内核 Monolithic</text>

          <rect x="50" y="90" width="180" height="30" rx="5" fill="var(--text-primary)" fillOpacity="0.08" stroke="var(--border)" strokeWidth="1" />
          <text x="140" y="109" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">用户态</text>

          <rect x="50" y="130" width="180" height="30" rx="5" fill="var(--warning)" fillOpacity="0.15" stroke="var(--warning)" strokeWidth="1" />
          <text x="140" y="149" textAnchor="middle" fontSize="10" fill="var(--warning)">系统调用接口</text>

          <rect x="50" y="170" width="180" height="180" rx="5" fill="var(--warning)" fillOpacity="0.20" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="140" y="190" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">内核态（全部在内核）</text>
          <text x="140" y="210" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">进程调度</text>
          <text x="140" y="225" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">内存管理</text>
          <text x="140" y="240" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">文件系统</text>
          <text x="140" y="255" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">网络协议栈</text>
          <text x="140" y="270" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">设备驱动</text>
          <text x="140" y="285" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">VFS / 缓冲</text>
          <text x="140" y="300" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">IPC</text>

          <rect x="50" y="360" width="180" height="30" rx="5" fill="var(--text-primary)" fillOpacity="0.08" stroke="var(--border)" strokeWidth="1" />
          <text x="140" y="379" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">硬件</text>

          <text x="140" y="410" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">代表：Linux</text>
          <text x="140" y="425" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">快（同一地址空间）</text>
          <text x="140" y="440" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">臃肿（驱动在内核）</text>

          {/* 微内核 */}
          <rect x="260" y="50" width="220" height="400" rx="10" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="370" y="74" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--accent)">微内核 Microkernel</text>

          <rect x="280" y="90" width="180" height="30" rx="5" fill="var(--text-primary)" fillOpacity="0.08" stroke="var(--border)" strokeWidth="1" />
          <text x="370" y="109" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">用户态</text>

          <rect x="280" y="130" width="180" height="30" rx="5" fill="var(--accent)" fillOpacity="0.15" stroke="var(--accent)" strokeWidth="1" />
          <text x="370" y="149" textAnchor="middle" fontSize="10" fill="var(--accent)">系统调用 → 消息传递</text>

          <rect x="280" y="170" width="180" height="30" rx="5" fill="var(--accent)" fillOpacity="0.15" stroke="var(--accent)" strokeWidth="1" />
          <text x="370" y="189" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">文件服务（用户态）</text>

          <rect x="280" y="210" width="180" height="30" rx="5" fill="var(--accent)" fillOpacity="0.15" stroke="var(--accent)" strokeWidth="1" />
          <text x="370" y="229" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">网络服务（用户态）</text>

          <rect x="280" y="250" width="180" height="30" rx="5" fill="var(--accent)" fillOpacity="0.15" stroke="var(--accent)" strokeWidth="1" />
          <text x="370" y="269" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">设备驱动（用户态）</text>

          <rect x="280" y="290" width="180" height="60" rx="5" fill="var(--accent)" fillOpacity="0.25" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="370" y="310" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">微内核（最小化）</text>
          <text x="370" y="326" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">IPC + 调度 + 地址空间</text>
          <text x="370" y="340" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">基本中断处理</text>

          <rect x="280" y="360" width="180" height="30" rx="5" fill="var(--text-primary)" fillOpacity="0.08" stroke="var(--border)" strokeWidth="1" />
          <text x="370" y="379" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">硬件</text>

          <text x="370" y="410" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">代表：MINIX / QNX</text>
          <text x="370" y="425" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">安全可扩展</text>
          <text x="370" y="440" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">慢（消息传递开销）</text>

          {/* 混合内核 */}
          <rect x="490" y="50" width="220" height="400" rx="10" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="1.2" />
          <text x="600" y="74" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--success)">混合内核 Hybrid</text>

          <rect x="510" y="90" width="180" height="30" rx="5" fill="var(--text-primary)" fillOpacity="0.08" stroke="var(--border)" strokeWidth="1" />
          <text x="600" y="109" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">用户态</text>

          <rect x="510" y="130" width="180" height="30" rx="5" fill="var(--success)" fillOpacity="0.15" stroke="var(--success)" strokeWidth="1" />
          <text x="600" y="149" textAnchor="middle" fontSize="10" fill="var(--success)">系统调用接口</text>

          <rect x="510" y="170" width="180" height="120" rx="5" fill="var(--success)" fillOpacity="0.20" stroke="var(--success)" strokeWidth="1.2" />
          <text x="600" y="190" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">内核态（核心服务）</text>
          <text x="600" y="210" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">进程调度 / 内存管理</text>
          <text x="600" y="225" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">IPC / 中断</text>
          <text x="600" y="240" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">VFS 框架</text>
          <text x="600" y="255" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">关键驱动（内核态）</text>
          <text x="600" y="275" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">性能关键 → 内核</text>

          <rect x="510" y="300" width="180" height="60" rx="5" fill="var(--success)" fillOpacity="0.10" stroke="var(--success)" strokeWidth="1" strokeDasharray="3 2" />
          <text x="600" y="320" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">模块化扩展（可加载）</text>
          <text x="600" y="336" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">非关键驱动 / 协议</text>
          <text x="600" y="350" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">可卸载 / 可替换</text>

          <rect x="510" y="360" width="180" height="30" rx="5" fill="var(--text-primary)" fillOpacity="0.08" stroke="var(--border)" strokeWidth="1" />
          <text x="600" y="379" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">硬件</text>

          <text x="600" y="410" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">代表：Windows / macOS</text>
          <text x="600" y="425" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">兼顾性能与可扩展</text>
          <text x="600" y="440" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">复杂度高</text>

          <text x={VIEW_W / 2} y="464" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            趋势：单体追求性能，微内核追求安全，混合内核是工程折中
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        操作系统三种内核架构对比——单体内核、微内核、混合内核的结构与权衡
      </figcaption>
    </figure>
  );
}
