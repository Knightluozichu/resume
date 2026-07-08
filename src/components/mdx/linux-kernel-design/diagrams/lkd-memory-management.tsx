/**
 * <LkdMemoryManagementDiagram>：内存管理——Zone/Buddy/Slab/页表图解。
 * 纯静态展示，无交互。Server Component。
 */

const VIEW_W = 740;
const VIEW_H = 500;

export function LkdMemoryManagementDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Linux内存管理Zone Buddy Slab页表图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            内存管理——Zone分区 / 伙伴系统 / Slab / 页表翻译
          </text>

          {/* Zone 分区 */}
          <rect x="30" y="46" width="680" height="80" rx="8" fill="var(--warning)" fillOpacity="0.06" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="50" y="64" fontSize="11" fontWeight="600" fill="var(--warning)">物理内存 Zone 分区</text>

          <rect x="50" y="74" width="160" height="40" rx="6" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1" />
          <text x="130" y="90" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--warning)">ZONE_DMA</text>
          <text x="130" y="104" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">0-16MB / ISA DMA</text>

          <rect x="230" y="74" width="160" height="40" rx="6" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1" />
          <text x="310" y="90" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--warning)">ZONE_DMA32</text>
          <text x="310" y="104" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">0-4GB / 32位PCI</text>

          <rect x="410" y="74" width="280" height="40" rx="6" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1" />
          <text x="550" y="90" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--warning)">ZONE_NORMAL</text>
          <text x="550" y="104" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">4GB以上 / 内核和大部分分配</text>

          {/* 伙伴系统 */}
          <rect x="30" y="138" width="340" height="180" rx="8" fill="var(--danger)" fillOpacity="0.06" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="200" y="158" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--danger)">伙伴系统（Buddy System）</text>
          <text x="40" y="176" fontSize="9" fill="var(--text-secondary)">以 2^n 页为单位分配（order 0-10）</text>

          <rect x="50" y="184" width="60" height="24" rx="4" fill="var(--danger)" fillOpacity="0.15" stroke="var(--danger)" strokeWidth="1" />
          <text x="80" y="200" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">order0</text>
          <rect x="115" y="184" width="60" height="24" rx="4" fill="var(--danger)" fillOpacity="0.15" stroke="var(--danger)" strokeWidth="1" />
          <text x="145" y="200" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">order1</text>
          <rect x="180" y="184" width="60" height="24" rx="4" fill="var(--danger)" fillOpacity="0.15" stroke="var(--danger)" strokeWidth="1" />
          <text x="210" y="200" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">order2</text>
          <rect x="245" y="184" width="60" height="24" rx="4" fill="var(--danger)" fillOpacity="0.15" stroke="var(--danger)" strokeWidth="1" />
          <text x="275" y="200" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">...N</text>

          <text x="40" y="222" fontSize="9" fontWeight="600" fill="var(--danger)">分配:</text>
          <text x="40" y="236" fontSize="9" fill="var(--text-tertiary)">请求order N → 空闲链表有则取</text>
          <text x="40" y="250" fontSize="9" fill="var(--text-tertiary)">无则从order N+1分裂(2个伙伴块)</text>

          <text x="40" y="268" fontSize="9" fontWeight="600" fill="var(--danger)">回收:</text>
          <text x="40" y="282" fontSize="9" fill="var(--text-tertiary)">释放order N → 检查伙伴块空闲?</text>
          <text x="40" y="296" fontSize="9" fill="var(--text-tertiary)">空闲则合并→递归向上</text>
          <text x="40" y="310" fontSize="9" fill="var(--text-tertiary)">减少外部碎片</text>

          {/* Slab 分配器 */}
          <rect x="390" y="138" width="320" height="180" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="550" y="158" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">Slab 分配器（对象级）</text>
          <text x="400" y="176" fontSize="9" fill="var(--text-secondary)">在伙伴系统之上分配小对象</text>

          <rect x="410" y="184" width="120" height="40" rx="4" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1" />
          <text x="470" y="200" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">kmem_cache</text>
          <text x="470" y="214" textAnchor="middle" fontSize="8" fill="var(--text-tertiary)">(task_struct)</text>

          <rect x="540" y="184" width="60" height="40" rx="4" fill="var(--accent)" fillOpacity="0.15" stroke="var(--accent)" strokeWidth="1" />
          <text x="570" y="208" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">Slab1</text>
          <rect x="605" y="184" width="60" height="40" rx="4" fill="var(--accent)" fillOpacity="0.15" stroke="var(--accent)" strokeWidth="1" />
          <text x="635" y="208" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">Slab2</text>

          <text x="400" y="240" fontSize="9" fontWeight="600" fill="var(--accent)">原理:</text>
          <text x="400" y="254" fontSize="9" fill="var(--text-tertiary)">相同类型对象归入同一kmem_cache</text>
          <text x="400" y="268" fontSize="9" fill="var(--text-tertiary)">预分配空闲对象, O(1)分配/释放</text>
          <text x="400" y="282" fontSize="9" fill="var(--text-tertiary)">Slab着色减少Cache冲突</text>
          <text x="400" y="300" fontSize="9" fontWeight="600" fill="var(--accent)">解决:</text>
          <text x="400" y="312" fontSize="9" fill="var(--text-tertiary)">伙伴系统最小1页(4KB)的内部碎片</text>

          {/* 页表翻译 */}
          <rect x="30" y="330" width="680" height="100" rx="8" fill="var(--success)" fillOpacity="0.05" stroke="var(--success)" strokeWidth="1.2" />
          <text x="370" y="350" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">虚拟地址翻译（x86-64 4级页表）</text>

          <rect x="50" y="360" width="100" height="30" rx="4" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1" />
          <text x="100" y="380" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">PGD(9bit)</text>

          <text x="160" y="380" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="180" y="360" width="100" height="30" rx="4" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1" />
          <text x="230" y="380" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">PUD(9bit)</text>

          <text x="290" y="380" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="310" y="360" width="100" height="30" rx="4" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1" />
          <text x="360" y="380" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">PMD(9bit)</text>

          <text x="420" y="380" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="440" y="360" width="100" height="30" rx="4" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1" />
          <text x="490" y="380" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">PTE(9bit)</text>

          <text x="550" y="380" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="570" y="360" width="120" height="30" rx="4" fill="var(--success)" fillOpacity="0.20" stroke="var(--success)" strokeWidth="1.5" />
          <text x="630" y="380" textAnchor="middle" fontSize="9" fontWeight="600" fill="var(--success)">物理页+偏移</text>

          <text x="50" y="406" fontSize="9" fill="var(--text-secondary)">CR3寄存器存PGD基址 → 逐级索引4次访存 → 物理地址</text>
          <text x="50" y="420" fontSize="9" fill="var(--text-tertiary)">TLB缓存页表项: 命中O(1) / 未命中走4级页表(hardware walk)</text>

          {/* 底部 */}
          <rect x="30" y="442" width="680" height="44" rx="6" fill="var(--text-primary)" fillOpacity="0.05" stroke="var(--text-primary)" strokeWidth="1" strokeOpacity="0.2" />
          <text x="50" y="462" fontSize="10" fontWeight="600" fill="var(--text-primary)">层次结构: alloc_pages(GFP) → 选Zone → Buddy分配物理页 → Slab分配小对象</text>
          <text x="50" y="478" fontSize="9" fill="var(--text-tertiary)">GFP标志控制策略: GFP_KERNEL(可睡眠) / GFP_ATOMIC(不睡眠) / GFP_DMA(限定Zone)</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Linux内存管理——Zone分区物理内存、伙伴系统管理页分配、Slab分配器管理小对象、4级页表翻译虚拟地址
      </figcaption>
    </figure>
  );
}
