/**
 * <WkpMdlMemoryDescriptorDiagram>：MDL内存描述符——直接I/O与地址映射图解。
 * 纯静态展示，无交互。Server Component。
 */

const VIEW_W = 740;
const VIEW_H = 460;

export function WkpMdlMemoryDescriptorDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="MDL内存描述符直接I/O与地址映射图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            MDL 内存描述符——用户缓冲区到内核地址的桥梁
          </text>

          {/* 步骤1：用户缓冲区 */}
          <rect x="40" y="50" width="200" height="70" rx="8" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="140" y="74" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">① 用户缓冲区</text>
          <text x="140" y="92" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">用户态地址空间</text>
          <text x="140" y="108" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">可能不连续 / 可换出</text>

          {/* 箭头 */}
          <text x="255" y="90" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&rarr;</text>

          {/* 步骤2：ProbeAndLockPages */}
          <rect x="270" y="50" width="200" height="70" rx="8" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="370" y="74" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--warning)">② 锁定物理页</text>
          <text x="370" y="92" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">ProbeAndLockPages</text>
          <text x="370" y="108" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">验证地址 + 锁定物理页</text>

          {/* 箭头 */}
          <text x="485" y="90" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&rarr;</text>

          {/* 步骤3：MDL映射 */}
          <rect x="500" y="50" width="200" height="70" rx="8" fill="var(--danger)" fillOpacity="0.10" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="600" y="74" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--danger)">③ 内核地址映射</text>
          <text x="600" y="92" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">MmGetSystemAddressForMdlSafe</text>
          <text x="600" y="108" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">返回连续内核虚拟地址</text>

          {/* MDL 结构体 */}
          <rect x="120" y="140" width="500" height="80" rx="8" fill="var(--text-primary)" fillOpacity="0.04" stroke="var(--text-primary)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="370" y="162" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--text-primary)">MDL 结构体（Memory Descriptor List）</text>
          <rect x="140" y="172" width="110" height="36" rx="4" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="1" />
          <text x="195" y="188" textAnchor="middle" fontSize="9" fill="var(--warning)">MDL 头</text>
          <text x="195" y="200" textAnchor="middle" fontSize="8" fill="var(--text-tertiary)">大小/标志/起始VA</text>
          <rect x="260" y="172" width="110" height="36" rx="4" fill="var(--success)" fillOpacity="0.10" stroke="var(--success)" strokeWidth="1" />
          <text x="315" y="188" textAnchor="middle" fontSize="9" fill="var(--success)">PFN 数组</text>
          <text x="315" y="200" textAnchor="middle" fontSize="8" fill="var(--text-tertiary)">物理页帧号列表</text>
          <rect x="380" y="172" width="110" height="36" rx="4" fill="var(--danger)" fillOpacity="0.10" stroke="var(--danger)" strokeWidth="1" />
          <text x="435" y="188" textAnchor="middle" fontSize="9" fill="var(--danger)">映射信息</text>
          <text x="435" y="200" textAnchor="middle" fontSize="8" fill="var(--text-tertiary)">系统VA / 进程VA</text>
          <rect x="500" y="172" width="100" height="36" rx="4" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1" />
          <text x="550" y="188" textAnchor="middle" fontSize="9" fill="var(--accent)">Next MDL</text>
          <text x="550" y="200" textAnchor="middle" fontSize="8" fill="var(--text-tertiary)">链表（分块缓冲）</text>

          {/* 缓冲 I/O vs 直接 I/O */}
          <text x="205" y="250" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">缓冲 I/O（Buffered）</text>
          <rect x="40" y="258" width="330" height="100" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="205" y="278" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">DO_BUFFERED_IO</text>
          <text x="60" y="296" fontSize="10" fill="var(--text-secondary)">I/O 管理器在非分页池分配副本</text>
          <text x="60" y="312" fontSize="10" fill="var(--text-secondary)">写入：用户态 → 内核副本 → IRP.AssocIrp.SystemBuffer</text>
          <text x="60" y="328" fontSize="10" fill="var(--text-secondary)">读取：内核副本 → 用户态（完成时回拷）</text>
          <text x="60" y="346" fontSize="9" fill="var(--text-tertiary)">简单安全，但多一次拷贝，适合小缓冲区</text>

          <text x="535" y="250" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--danger)">直接 I/O（Direct）</text>
          <rect x="370" y="258" width="330" height="100" rx="8" fill="var(--danger)" fillOpacity="0.06" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="535" y="278" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">DO_DIRECT_IO</text>
          <text x="390" y="296" fontSize="10" fill="var(--text-secondary)">I/O 管理器创建 MDL，锁定物理页</text>
          <text x="390" y="312" fontSize="10" fill="var(--text-secondary)">驱动通过 MmGetSystemAddressForMdlSafe 访问</text>
          <text x="390" y="328" fontSize="10" fill="var(--text-secondary)">零拷贝，直接操作内核映射地址</text>
          <text x="390" y="346" fontSize="9" fill="var(--text-tertiary)">高效，适合大缓冲区 / DMA 场景</text>

          {/* 清理 */}
          <rect x="40" y="374" width="660" height="46" rx="8" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="1" strokeOpacity="0.4" />
          <text x="370" y="394" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">清理流程</text>
          <text x="370" y="412" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">IoFreeMdl → MmUnlockPages（若手动锁定）→ 释放缓冲区，必须与分配顺序严格逆序</text>

          <text x="370" y="442" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            关键洞察：MDL 将散列的用户物理页映射为连续的内核虚拟地址，实现零拷贝直接 I/O
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        MDL内存描述符——用户缓冲区经ProbeAndLockPages锁定物理页、MmGetSystemAddressForMdlSafe映射为内核地址，实现直接I/O零拷贝
      </figcaption>
    </figure>
  );
}
