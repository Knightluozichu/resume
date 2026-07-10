import type { ReviewQuestion } from "./types";

export const gchCopyingCollectionQuestions: ReviewQuestion[] = [
  {
    id: "gch-cc-1",
    chapter: "gch-copying-collection",
    level: 1,
    question: `Cheney算法的scan和free指针各自的作用是什么？算法何时终止？`,
    answer:
      `scan指针：指向To区中「已复制但尚未扫描其引用字段」的对象。scan的工作是取出该对象，遍历其引用字段，将引用的未复制对象复制到To区并更新引用。scan向后推进表示该对象已被处理。free指针：指向To区中下一个空闲位置，即新复制对象的落地位置。每复制一个对象，free向后推进。算法流程：①初始scan=free=To区起点；②从根集合复制存活对象到free处，free推进；③while(scan<free)：取scan处对象，扫描其引用字段，未复制的复制到free处（free推进），更新引用为转发地址，scan推进；④scan==free时终止——所有存活对象已复制且引用已更新。终止条件的含义：scan追上free表示To区中所有已复制的对象都已扫描完毕，没有新的对象需要复制，回收完成。`,
    tags: ["Cheney算法", "scan指针", "free指针", "广度优先", "终止条件"],
  },
  {
    id: "gch-cc-2",
    chapter: "gch-copying-collection",
    level: 2,
    question: `复制式回收为什么适合年轻代但不适合老年代？`,
    answer:
      `复制式回收的代价与存活对象数量成正比（需要复制每个存活对象）。年轻代符合弱分代假说——绝大多数对象朝生夕死，存活率极低（通常只有2%~20%），因此复制量很小，回收极快。同时年轻代频繁GC需要快速完成，复制式的O(1)分配（指针碰撞）和紧凑无碎片特性非常有利。老年代不适合的原因：①存活率高——老年代存放长期存活的对象，存活率可能80%~95%，复制量巨大，回收极慢；②空间浪费不可接受——老年代通常占堆的大部分，减半意味着大量空间浪费，而年轻代本来就小（通常占堆1/3），减半的绝对量小；③对象大——老年代可能有大对象，复制大对象开销高。因此老年代通常用标记-清除（如CMS）或标记-压缩（如Serial Old、Parallel Old）。`,
    tags: ["复制式回收", "年轻代", "老年代", "弱分代假说", "存活率"],
  },
  {
    id: "gch-cc-3",
    chapter: "gch-copying-collection",
    level: 2,
    question: `转发指针如何保证每个存活对象只被复制一次？`,
    answer:
      `转发指针（Forwarding Pointer）在对象被复制到To区后，写入旧对象的对象头中，记录新地址。工作流程：①GC从根集合或某个已扫描对象的引用字段出发，遇到对象A；②检查A的对象头是否有转发指针——如果没有，说明A尚未被复制：将A复制到To区free位置，在旧A的对象头写入转发指针指向To区新地址，更新引用字段为新地址；③如果A已有转发指针，说明A已被复制过：直接将引用字段更新为转发指针指向的新地址，不再复制。关键点：第一个引用A的GC操作会复制A并设置转发指针，后续所有引用A的操作都通过转发指针找到新地址，不会重复复制。这保证了每个存活对象恰好被复制一次，时间复杂度为O(存活对象数量)。`,
    tags: ["转发指针", "Cheney算法", "复制一次", "引用更新"],
  },
  {
    id: "gch-cc-4",
    chapter: "gch-copying-collection",
    level: 1,
    question: `TLAB（Thread-Local Allocation Buffer）如何解决多线程下的指针碰撞竞争问题？`,
    answer:
      `多线程环境下如果所有线程共享一个free指针做指针碰撞，每次分配都需要CAS（Compare-And-Swap）竞争free指针，在高并发分配时成为瓶颈。TLAB解决方案：将To区的空闲空间预先划分为多个小段，每个线程分配一段作为自己的TLAB。线程在自己的TLAB内做指针碰撞（单线程无竞争，O(1)），只有当TLAB用完时才需要向全局free指针申请新的TLAB（CAS竞争频率大幅降低）。优势：①分配无锁——99%以上的分配在TLAB内完成，无需CAS；②缓存友好——每个线程的TLAB是连续内存，分配的对象在同一缓存行附近；③可调——TLAB大小可动态调整（JVM的-XX:MinTLABSize/-XX:TLABSize），大TLAB减少申请频率但增加浪费。代价：TLAB未用完的部分在GC时浪费（通常很小），以及TLAB切换时的缓存失效。JVM默认开启TLAB（-XX:+UseTLAB）。`,
    tags: ["TLAB", "指针碰撞", "多线程分配", "CAS竞争", "线程本地"],
  },
];
