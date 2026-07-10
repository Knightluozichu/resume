import type { ReviewQuestion } from "./types";

export const lkdMemoryManagementQuestions: ReviewQuestion[] = [
  {
    id: "lkd-mm-1",
    chapter: "lkd-memory-management",
    level: 2,
    question: `Linux物理内存为何划分为Zone？各Zone的用途是什么？`,
    answer:
      `Linux将物理内存划分为三个Zone（区），因为硬件对物理内存有不同限制：①ZONE_DMA——包含0-16MB（ISA DMA只能寻址此范围），用于兼容老式DMA设备；②ZONE_DMA32——包含0-4GB（32位PCI设备只能寻址此范围），用于32位DMA设备；③ZONE_NORMAL——4GB以上的正常内存，内核和大多数分配使用。在64位系统上ZONE_NORMAL通常覆盖所有可用内存，ZONE_DMA/DMA32很小或不存在。Zone的存在让分配器能根据请求约束（如GFP_DMA）从合适的区分配。alloc_pages的GFP标志（GFP_KERNEL/GFP_DMA/GFP_HIGHMEM）决定从哪个Zone分配。Zone间没有优先顺序，分配器优先从请求的Zone分配，不足时可从其他Zone回退。`,
    tags: ["内存管理", "Zone"],
  },
  {
    id: "lkd-mm-2",
    chapter: "lkd-memory-management",
    level: 3,
    question: `伙伴系统（Buddy System）的分配和回收算法是怎样的？它如何解决外部碎片问题？`,
    answer:
      `伙伴系统管理物理页，以2的幂次个页为分配单位（order 0=1页, order 1=2页, ..., order 10=1024页）。分配：请求 order N 页，如果该 order 的空闲链表非空直接取出一块；如果为空，从 order N+1 的链表取出一块（2^(N+1)页），分裂成两个2^N页的「伙伴块」，一块分配给请求者，另一块放入 order N 空闲链表。回收：释放一块 order N 页时，检查它的「伙伴块」是否也空闲——如果空闲，合并成一块 order N+1 的大块，递归向上合并直到伙伴不空闲或达到最大order。伙伴系统通过「合并相邻空闲块」有效减少外部碎片（外部碎片 = 空闲页分散在内存各处，无法组成大块连续内存）。每个Zone有独立的伙伴系统，用 free_area[11] 数组管理各order的空闲链表。`,
    tags: ["内存管理", "伙伴系统"],
  },
  {
    id: "lkd-mm-3",
    chapter: "lkd-memory-management",
    level: 3,
    question: `Slab分配器在伙伴系统之上解决了什么问题？它的工作原理是什么？`,
    answer:
      `伙伴系统最小分配1页（4KB），但内核频繁分配小对象（如task_struct约8KB、inode约500B、dentry约200B），直接用伙伴系统会严重浪费内存（内部碎片）。Slab分配器在伙伴系统之上实现对象级分配：①每个 Slab 由一或多个连续页组成，内部划分成等大小的对象槽位；②相同类型的对象归入同一个 kmem_cache（如 task_struct_cache），预分配一批空闲对象；③分配对象直接从空闲链表取一个，O(1)时间；④释放对象不归还页，而是放回空闲链表供下次复用；⑤Slab着色（coloring）——通过偏移让不同slab的对象起始地址错开，减少CPU缓存冲突。Slab的三态：满（所有对象在用）、半满（部分空闲）、空（全空闲，可释放回伙伴系统）。SLOB（嵌入式精简版）和SLUB（现代默认，性能更好）是Slab的两种替代实现。`,
    tags: ["内存管理", "Slab"],
  },
  {
    id: "lkd-mm-4",
    chapter: "lkd-memory-management",
    level: 4,
    question: `虚拟内存到物理内存的地址翻译全过程是什么？TLB的作用和影响是什么？`,
    answer:
      `x86-64的4级页表翻译过程：虚拟地址64位（实际用48位）分为5段：PGD(9位)→PUD(9位)→PMD(9位)→PTE(9位)→页内偏移(12位)。翻译步骤：①从CR3寄存器读取页表基地址（PGD基址）；②用虚拟地址的PGD段索引PGD表，得到PUD表基址；③用PUD段索引PUD表，得到PMD表基址；④用PMD段索引PMD表，得到PTE表基址；⑤用PTE段索引PTE表，得到物理页基址；⑥物理页基址 + 页内偏移 = 物理地址。每次翻译需4次内存访问（4级页表），开销巨大。TLB（Translation Lookaside Buffer）是CPU内的页表项缓存，缓存最近使用的虚拟→物理映射。TLB命中时翻译O(1)不访存；TLB未命中时才走上述4级页表查找（hardware page walk）。TLB容量有限（通常几百到上千项），上下文切换时如果切换了地址空间需刷新TLB（invlpg/写CR3），导致TLB冷启动。这是上下文切换开销的主要来源。`,
    tags: ["内存管理", "页表"],
  },
];
