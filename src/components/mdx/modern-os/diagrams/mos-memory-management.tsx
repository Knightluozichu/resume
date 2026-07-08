/**
 * <MosMemoryManagementDiagram>：分页地址翻译链路与多级页表图解。
 * 纯静态展示，无交互。Server Component。
 */

const VIEW_W = 740;
const VIEW_H = 470;

export function MosMemoryManagementDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="分页地址翻译与多级页表图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            分页地址翻译链路：虚拟地址 → MMU → 页表 → 物理地址
          </text>

          {/* 虚拟地址拆分 */}
          <rect x="40" y="56" width="660" height="40" rx="6" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="1" />
          <text x="60" y="80" fontSize="11" fill="var(--text-secondary)">虚拟地址 VA（32 位）</text>
          <rect x="240" y="62" width="180" height="28" rx="4" fill="var(--warning)" fillOpacity="0.30" stroke="var(--warning)" strokeWidth="1" />
          <text x="330" y="80" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">页号（20 位）</text>
          <rect x="440" y="62" width="120" height="28" rx="4" fill="var(--accent)" fillOpacity="0.30" stroke="var(--accent)" strokeWidth="1" />
          <text x="500" y="80" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">偏移（12 位）</text>
          <text x="580" y="80" fontSize="10" fill="var(--text-tertiary)">2^12 = 4KB</text>

          {/* MMU 翻译流程 */}
          <text x="330" y="116" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--text-primary)">↓ MMU 翻译（先查 TLB）</text>

          {/* TLB */}
          <rect x="40" y="128" width="200" height="56" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="140" y="150" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">TLB 高速缓存</text>
          <text x="140" y="168" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">页表项缓存，命中率 &gt; 99%</text>
          <text x="140" y="180" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">命中 → 一步出物理地址</text>

          {/* 多级页表 */}
          <rect x="270" y="128" width="250" height="56" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="395" y="150" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">多级页表（TLB 未命中）</text>
          <text x="395" y="166" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">页目录(10) → 页表(10) → 偏移(12)</text>
          <text x="395" y="178" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">page table walk，多次访存</text>

          {/* 缺页 */}
          <rect x="540" y="128" width="160" height="56" rx="8" fill="var(--danger)" fillOpacity="0.12" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="620" y="150" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--danger)">缺页异常</text>
          <text x="620" y="166" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">有效位 = 0 → 陷入内核</text>
          <text x="620" y="178" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">从磁盘换入 + 置换</text>

          {/* 物理地址 */}
          <rect x="180" y="210" width="380" height="40" rx="6" fill="var(--success)" fillOpacity="0.10" stroke="var(--success)" strokeWidth="1" />
          <text x="370" y="234" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">物理地址 PA = 帧号 × 4KB + 偏移</text>

          {/* 下方：多级页表省内存原理 */}
          <rect x="40" y="270" width="660" height="180" rx="10" fill="var(--text-primary)" fillOpacity="0.03" stroke="var(--border)" strokeWidth="1" />
          <text x="60" y="294" fontSize="13" fontWeight="600" fill="var(--text-primary)">为什么多级页表比单级省内存？</text>

          <text x="60" y="318" fontSize="11" fill="var(--danger)">单级：1M 项 × 4B = 4MB/进程，必须常驻，即使大部分地址空间没用</text>
          <text x="60" y="338" fontSize="11" fill="var(--success)">多级：页目录 4KB 常驻 + 按需分配二级页表（4KB/个），未用范围不分配</text>
          <text x="60" y="358" fontSize="11" fill="var(--accent)">10MB 进程：单级 4MB vs 多级 16KB（1 目录 + 3 页表）</text>

          <text x="60" y="386" fontSize="12" fontWeight="600" fill="var(--text-primary)">按需调页流程</text>
          <text x="60" y="408" fontSize="10" fill="var(--text-secondary)">① 访问 VA → MMU 查页表有效位=0 → 触发缺页异常</text>
          <text x="60" y="424" fontSize="10" fill="var(--text-secondary)">② 内核查磁盘位置 → 找空闲帧（无则置换淘汰）→ 磁盘 I/O 读入</text>
          <text x="60" y="440" fontSize="10" fill="var(--text-secondary)">③ 更新页表项（帧号+有效位=1）→ 重新执行指令</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        分页地址翻译链路（虚拟地址 → TLB/页表 → 物理地址）与多级页表省内存原理
      </figcaption>
    </figure>
  );
}
