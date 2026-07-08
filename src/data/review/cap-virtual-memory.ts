import type { ReviewQuestion } from "./types";

export const capVirtualMemoryQuestions: ReviewQuestion[] = [
  {
    id: "cap-virtual-memory-1",
    chapter: "cap-virtual-memory",
    level: 2,
    question: "虚拟内存的三个核心作用是什么？如何同时实现隔离和共享？",
    answer:
      "三个核心作用：①隔离——每个进程有独立页表，同一虚拟地址在不同进程映射到不同物理页，进程间互不可见互不干扰。②扩展——虚拟地址空间（48 位 256TB）远大于物理内存，未访问页不占物理内存（按需调页），程序可用比物理内存大得多的空间，还能把不活跃页换出到磁盘。③共享——操作系统把共享库（libc）代码段、共享内存段映射到多个进程的同一物理页，千百进程共享一份代码节省内存。隔离与共享并存的关键是「页表是每进程的」：私有数据每个进程映射到独立物理页（隔离），共享数据多个进程的页表项指向同一物理页（共享）。页表项的权限位还提供保护——只读代码段写触发段错误，无权限页访问触发 SIGSEGV。",
    tags: ["虚拟内存", "隔离", "共享"],
  },
  {
    id: "cap-virtual-memory-2",
    chapter: "cap-virtual-memory",
    level: 3,
    question: "地址翻译的过程是什么？多级页表和 TLB 各解决什么问题？",
    answer:
      "地址翻译：虚拟地址 V 分为虚拟页号 VPN 和虚拟页偏移 VPO。用 VPN 查页表得到物理页号 PFN，PFN 拼接 VPO（= PPO，页内偏移不变）得到物理地址。页表项 PTE 含 PFN、有效位、权限位等。若有效位为 0 触发缺页。多级页表解决「页表太大」问题——48 位地址 + 4KB 页单级页表需 512GB（2^36 项 × 8 字节），多级（4 级每级 9 位）只按需分配下级表，空区域不分配，节省几个数量级内存，代价是翻译需多次内存访问。TLB（Translation Lookaside Buffer）解决「每次翻译查多级页表太慢」问题——它是页表项的硬件缓存（全相联/组相联），缓存最近用过的 VPN→PFN 映射，命中时一周期完成翻译，命中率 99%+，miss 时才走 page table walker。两者配合：TLB 提速，多级页表省空间。",
    tags: ["地址翻译", "页表", "TLB"],
  },
  {
    id: "cap-virtual-memory-3",
    chapter: "cap-virtual-memory",
    level: 3,
    question: "为什么 `malloc(1GB)` 立即返回且几乎不耗内存？什么是按需调页和写时复制？",
    answer:
      "malloc 只在虚拟地址空间预留一段区间（修改堆的 brk 或 mmap 区），页表项不建立或标记无效，不分配物理内存。真正分配物理内存发生在第一次写入时——触发缺页，内核才分配物理页并建立映射。所以 malloc(1GB) 立即返回且几乎不耗内存，但遍历写入每个字节会真正占满 1GB 物理内存。这就是按需调页（demand paging）：程序启动时只加载少量页，其余按缺页按需载入，加速启动、节省内存。写时复制（COW）：fork 时父子共享物理页只读，任一方写时触发缺页、复制一份，延迟复制节省内存。理解这点就理解了为什么 committed 内存远大于 resident 内存，为什么 fork 巨型进程不真的复制全部内存。calloc 可能用零页（共享只读零页，写时复制），比 malloc+memset 更省内存。",
    tags: ["按需调页", "写时复制", "malloc"],
  },
  {
    id: "cap-virtual-memory-4",
    chapter: "cap-virtual-memory",
    level: 4,
    question: "缺页处理的完整流程是什么？大页（huge page）解决什么问题？",
    answer:
      "缺页处理流程：①CPU 查页表发现有效位 = 0，触发缺页异常（fault）；②内核缺页处理程序检查虚拟地址合法性，非法（未映射或权限不符）则发 SIGSEGV 杀进程；③合法则判断是哪种缺页：若是按需调页则从磁盘/swap 读入该页，若是新页（堆栈扩展、calloc 零页）则零填充分配物理页；④更新 PTE（填 PFN、置有效位、设权限）；⑤返回用户态重新执行触发指令——这次翻译成功。整个流程对程序透明。大页（huge page，2MB/1GB）解决 TLB 容量不足问题：4KB 页下 1GB 内存需 26 万个页表项，远超 TLB 几百项容量，大范围扫描内存 TLB thrashing 严重。改用 2MB 大页后 1GB 只需 512 项，TLB 命中率大幅提升，是数据库、JVM 等大内存应用的优化手段。代价是内部碎片（大页未填满也占 2MB）。",
    tags: ["缺页", "大页", "TLB"],
  },
];
