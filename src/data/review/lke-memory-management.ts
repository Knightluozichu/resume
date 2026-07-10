import type { ReviewQuestion } from "./types";

export const lkeMemoryManagementQuestions: ReviewQuestion[] = [
  {
    id: "lke-mm-1",
    chapter: "lke-memory-management",
    level: 2,
    question: `Buddy伙伴系统的分配和合并原理是什么？为什么用XOR计算伙伴地址？`,
    answer:
      `Buddy系统按2^n页管理空闲块。分配时找满足order的最小块，过大则对半拆分直到目标order。释放时用XOR计算伙伴块地址：buddy = page_addr ^ (1 << (order + PAGE_SHIFT))。XOR的原理是：每个块在其伙伴对中的位置只差order对应的那个bit。如果page地址的该bit为0，buddy就是page|bit（后一个）；如果为1，buddy就是page&~bit（前一个）。XOR天然处理两种情况。合并条件：buddy也在free_area[order]的空闲链表中。合并后递归检查更高order的伙伴，直到不能合并。这保证了大块空闲内存的最大化，避免外部碎片化。`,
    tags: ["内存管理", "Buddy"],
  },
  {
    id: "lke-mm-2",
    chapter: "lke-memory-management",
    level: 2,
    question: `kmalloc和vmalloc有什么区别？分别适合什么场景？`,
    answer:
      `kmalloc返回物理连续的内存，内部走Slab分配器，适用于DMA操作（硬件需要物理连续地址）和需要物理地址的场景。但大块连续内存可能因碎片化分配失败。vmalloc返回虚拟连续但物理不连续的内存，可以分配大块内存（不受碎片影响），但不能用于DMA（物理不连续），且访问时TLB miss开销大（每页可能映射不同物理页）。使用规则：小内存用kmalloc（通常<4MB），大块仅软件访问用vmalloc（如内核模块代码、大数组），需要DMA的用alloc_pages或dma_alloc_coherent。错误选择会导致DMA失败或性能下降。`,
    tags: ["内存管理", "分配器"],
  },
  {
    id: "lke-mm-3",
    chapter: "lke-memory-management",
    level: 3,
    question: `描述一次malloc(4096)后首次写入触发的缺页异常处理过程。`,
    answer:
      `①用户调用malloc(4096)，glibc从brk或mmap分配虚拟地址空间，只在VMA链表记录一段可读写区域，不分配物理页；②用户首次写入该地址，CPU查页表发现PTE不存在（Present=0），触发缺页异常；③do_page_fault()找到包含该地址的VMA，检查权限合法；④判断为延迟分配：调用alloc_pages(GFP_KERNEL, 0)从Buddy系统分配一个物理页；⑤clear_page()将物理页清零（安全要求，防止读到旧数据）；⑥在PTE中建立虚拟地址到物理页的映射，设置Present=1、RW=1、Dirty=1；⑦异常返回，CPU重新执行触发缺页的写指令，这次成功写入。整个过程对用户程序透明——malloc看似立即返回内存，实际物理页在首次访问时才分配。`,
    tags: ["内存管理", "缺页异常"],
  },
  {
    id: "lke-mm-4",
    chapter: "lke-memory-management",
    level: 4,
    question: `x86-64的4级页表如何将48位虚拟地址翻译为物理地址？TLB的作用是什么？`,
    answer:
      `48位虚拟地址拆分为5段：PGD(9bit) + PUD(9bit) + PMD(9bit) + PTE(9bit) + Offset(12bit)。翻译过程：CR3寄存器指向当前进程的PGD基址 → 用PGD索引找到PGD表项 → PGD表项指向PUD基址 → 用PUD索引找到PUD表项 → PUD表项指向PMD基址 → 用PMD索引找到PMD表项 → PMD表项指向PTE基址 → 用PTE索引找到PTE表项 → PTE表项包含物理页帧号 → 加上Offset得到物理地址。每级9位索引512项，末级12位是4KB页内偏移。不加缓存每次访存需5次内存读取（4次查页表+1次取数据），延迟极高。TLB（Translation Lookaside Buffer）缓存虚拟→物理映射，命中率通常>99%，将翻译开销降到接近1次访存。TLB miss时硬件page table walker自动遍历4级页表。`,
    tags: ["内存管理", "页表"],
  },
];
