/**
 * <LkeMemoryManagementDiagram>：Linux内存管理——物理内存与虚拟内存图解。
 * 纯静态展示，无交互。Server Component。
 */

const VIEW_W = 740;
const VIEW_H = 500;

export function LkeMemoryManagementDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Linux内存管理图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="26" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            Linux内存管理——从物理页到虚拟地址空间
          </text>

          {/* 左侧：物理内存管理 */}
          <text x="185" y="52" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--danger)">物理内存管理</text>

          {/* Zone */}
          <rect x="30" y="62" width="310" height="80" rx="8" fill="var(--danger)" fillOpacity="0.08" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="185" y="80" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--danger)">Zone 分区（按DMA能力）</text>
          <rect x="45" y="90" width="85" height="38" rx="4" fill="var(--danger)" fillOpacity="0.18" stroke="var(--danger)" strokeWidth="0.8" />
          <text x="87" y="107" textAnchor="middle" fontSize="9" fill="var(--text-primary)">ZONE_DMA</text>
          <text x="87" y="120" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">&lt;16MB</text>
          <rect x="140" y="90" width="85" height="38" rx="4" fill="var(--danger)" fillOpacity="0.18" stroke="var(--danger)" strokeWidth="0.8" />
          <text x="182" y="107" textAnchor="middle" fontSize="9" fill="var(--text-primary)">ZONE_NORMAL</text>
          <text x="182" y="120" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">16MB~896MB</text>
          <rect x="235" y="90" width="90" height="38" rx="4" fill="var(--danger)" fillOpacity="0.18" stroke="var(--danger)" strokeWidth="0.8" />
          <text x="280" y="107" textAnchor="middle" fontSize="9" fill="var(--text-primary)">ZONE_HIGHMEM</text>
          <text x="280" y="120" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">&gt;896MB</text>

          {/* Buddy System */}
          <rect x="30" y="152" width="310" height="100" rx="8" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="185" y="170" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">伙伴系统（Buddy Allocator）</text>
          <text x="45" y="188" fontSize="9" fill="var(--text-secondary)">按 2^n 页分配：order 0~10</text>
          <rect x="45" y="195" width="30" height="20" rx="3" fill="var(--accent)" fillOpacity="0.20" stroke="var(--accent)" strokeWidth="0.6" />
          <text x="60" y="208" textAnchor="middle" fontSize="7" fill="var(--text-primary)">2^0</text>
          <rect x="80" y="195" width="40" height="20" rx="3" fill="var(--accent)" fillOpacity="0.20" stroke="var(--accent)" strokeWidth="0.6" />
          <text x="100" y="208" textAnchor="middle" fontSize="7" fill="var(--text-primary)">2^1</text>
          <rect x="127" y="195" width="50" height="20" rx="3" fill="var(--accent)" fillOpacity="0.20" stroke="var(--accent)" strokeWidth="0.6" />
          <text x="152" y="208" textAnchor="middle" fontSize="7" fill="var(--text-primary)">2^2</text>
          <rect x="184" y="195" width="60" height="20" rx="3" fill="var(--accent)" fillOpacity="0.20" stroke="var(--accent)" strokeWidth="0.6" />
          <text x="214" y="208" textAnchor="middle" fontSize="7" fill="var(--text-primary)">2^3</text>
          <text x="255" y="208" fontSize="8" fill="var(--text-tertiary)">... 2^10</text>
          <text x="45" y="230" fontSize="9" fill="var(--text-secondary)">alloc_pages(gfp, order) / __free_pages()</text>
          <text x="45" y="244" fontSize="8" fill="var(--text-tertiary)">分配：拆大块；释放：合并伙伴</text>

          {/* Slab Allocator */}
          <rect x="30" y="262" width="310" height="90" rx="8" fill="var(--success)" fillOpacity="0.10" stroke="var(--success)" strokeWidth="1.2" />
          <text x="185" y="280" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">Slab/Slub 分配器（小对象）</text>
          <rect x="45" y="290" width="85" height="26" rx="3" fill="var(--success)" fillOpacity="0.20" stroke="var(--success)" strokeWidth="0.6" />
          <text x="87" y="306" textAnchor="middle" fontSize="8" fill="var(--text-primary)">slab 1</text>
          <rect x="140" y="290" width="85" height="26" rx="3" fill="var(--success)" fillOpacity="0.20" stroke="var(--success)" strokeWidth="0.6" />
          <text x="182" y="306" textAnchor="middle" fontSize="8" fill="var(--text-primary)">slab 2</text>
          <rect x="235" y="290" width="90" height="26" rx="3" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="0.6" strokeDasharray="3 2" />
          <text x="280" y="306" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">slab 3 (空)</text>
          <text x="45" y="330" fontSize="9" fill="var(--text-secondary)">kmalloc / kmem_cache_alloc</text>
          <text x="45" y="344" fontSize="8" fill="var(--text-tertiary)">从Buddy拿页 → 切成固定大小对象 → 缓存复用</text>

          {/* 右侧：虚拟内存与页表 */}
          <text x="555" y="52" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">虚拟内存与地址翻译</text>

          {/* 虚拟地址空间 */}
          <rect x="380" y="62" width="330" height="130" rx="8" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="545" y="80" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">进程虚拟地址空间（64位）</text>
          <rect x="395" y="90" width="300" height="20" rx="3" fill="var(--danger)" fillOpacity="0.15" stroke="var(--danger)" strokeWidth="0.6" />
          <text x="545" y="104" textAnchor="middle" fontSize="8" fill="var(--text-primary)">内核空间（直接映射区 + vmalloc + 固定映射）</text>
          <rect x="395" y="115" width="300" height="14" rx="3" fill="var(--text-tertiary)" fillOpacity="0.10" stroke="var(--text-tertiary)" strokeWidth="0.4" />
          <text x="545" y="125" textAnchor="middle" fontSize="7" fill="var(--text-secondary)">空洞（non-canonical）</text>
          <rect x="395" y="134" width="300" height="20" rx="3" fill="var(--warning)" fillOpacity="0.15" stroke="var(--warning)" strokeWidth="0.6" />
          <text x="545" y="148" textAnchor="middle" fontSize="8" fill="var(--text-primary)">栈（stack，向下生长）</text>
          <rect x="395" y="158" width="300" height="14" rx="3" fill="var(--success)" fillOpacity="0.15" stroke="var(--success)" strokeWidth="0.6" />
          <text x="545" y="168" textAnchor="middle" fontSize="7" fill="var(--text-secondary)">mmap 区（文件映射 + 匿名映射）</text>
          <rect x="395" y="176" width="300" height="12" rx="3" fill="var(--accent)" fillOpacity="0.15" stroke="var(--accent)" strokeWidth="0.6" />
          <text x="545" y="185" textAnchor="middle" fontSize="7" fill="var(--text-secondary)">堆（heap，brk 向上生长）</text>

          {/* 多级页表 */}
          <rect x="380" y="202" width="330" height="148" rx="8" fill="var(--warning)" fillOpacity="0.08" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="545" y="220" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">4级页表翻译（x86-64）</text>
          <text x="395" y="240" fontSize="8" fill="var(--text-secondary)">虚拟地址 48 bit 拆分：</text>
          <rect x="395" y="246" width="55" height="22" rx="3" fill="var(--warning)" fillOpacity="0.20" stroke="var(--warning)" strokeWidth="0.6" />
          <text x="422" y="260" textAnchor="middle" fontSize="8" fill="var(--text-primary)">PGD</text>
          <text x="422" y="276" textAnchor="middle" fontSize="7" fill="var(--text-tertiary)">9 bit</text>
          <rect x="458" y="246" width="55" height="22" rx="3" fill="var(--warning)" fillOpacity="0.20" stroke="var(--warning)" strokeWidth="0.6" />
          <text x="485" y="260" textAnchor="middle" fontSize="8" fill="var(--text-primary)">PUD</text>
          <text x="485" y="276" textAnchor="middle" fontSize="7" fill="var(--text-tertiary)">9 bit</text>
          <rect x="521" y="246" width="55" height="22" rx="3" fill="var(--warning)" fillOpacity="0.20" stroke="var(--warning)" strokeWidth="0.6" />
          <text x="548" y="260" textAnchor="middle" fontSize="8" fill="var(--text-primary)">PMD</text>
          <text x="548" y="276" textAnchor="middle" fontSize="7" fill="var(--text-tertiary)">9 bit</text>
          <rect x="584" y="246" width="55" height="22" rx="3" fill="var(--warning)" fillOpacity="0.20" stroke="var(--warning)" strokeWidth="0.6" />
          <text x="611" y="260" textAnchor="middle" fontSize="8" fill="var(--text-primary)">PTE</text>
          <text x="611" y="276" textAnchor="middle" fontSize="7" fill="var(--text-tertiary)">9 bit</text>
          <rect x="647" y="246" width="48" height="22" rx="3" fill="var(--success)" fillOpacity="0.20" stroke="var(--success)" strokeWidth="0.6" />
          <text x="671" y="260" textAnchor="middle" fontSize="7" fill="var(--text-primary)">Offset</text>
          <text x="671" y="276" textAnchor="middle" fontSize="7" fill="var(--text-tertiary)">12 bit</text>

          <text x="395" y="295" fontSize="9" fill="var(--text-secondary)">CR3 → PGD → PUD → PMD → PTE → 物理页</text>
          <text x="395" y="310" fontSize="8" fill="var(--text-tertiary)">TLB 缓存虚拟→物理映射，缺页触发 page fault</text>
          <text x="395" y="325" fontSize="8" fill="var(--text-tertiary)">PTE 含：物理页帧号 / Present / R-W / U-S / Dirty 位</text>
          <text x="395" y="340" fontSize="8" fill="var(--text-tertiary)">缺页异常 → do_page_fault() → 按需调页/写时复制</text>

          {/* 底部：alloc 路径 */}
          <rect x="30" y="365" width="680" height="55" rx="8" fill="var(--text-primary)" fillOpacity="0.06" stroke="var(--text-primary)" strokeWidth="0.8" strokeOpacity="0.3" />
          <text x="370" y="384" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">分配路径：用户态 mmap → 缺页 → alloc_pages（Buddy）</text>
          <text x="370" y="400" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">内核态：kmalloc（Slab）→ alloc_pages（Buddy）→ 物理页</text>
          <text x="370" y="413" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">vmalloc → 非连续物理页 → 虚拟地址连续</text>

          {/* 页回收 */}
          <rect x="30" y="430" width="680" height="55" rx="8" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="0.8" strokeOpacity="0.3" />
          <text x="370" y="448" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">页回收（kswapd / 直接回收）</text>
          <text x="370" y="464" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">活跃链表 → 非活跃链表 → 扫描 → 回收（写回脏页 / 丢弃干净页 / 压缩）</text>
          <text x="370" y="478" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">LRU 反映访问热度；OOM Killer 在内存耗尽时杀进程</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Linux内存管理三层结构：Zone分区物理内存，Buddy按2^n页分配，Slab管理小对象；虚拟内存经4级页表翻译为物理地址
      </figcaption>
    </figure>
  );
}
