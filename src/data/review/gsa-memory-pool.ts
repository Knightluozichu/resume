import type { ReviewQuestion } from "./types";

export const gsaMemoryPoolQuestions: ReviewQuestion[] = [
  {
    id: "gsa-memory-pool-1",
    chapter: "gsa-memory-pool",
    level: 2,
    question: "频繁 malloc/free 带来哪三大问题？内存池如何解决？",
    answer:
      "三大问题：①分配开销大——通用 malloc 要查空闲块表、多线程加锁、可能触发系统调用，单次百纳秒到几微秒，高频调用吃 CPU；②内存碎片——长期 malloc/free 让堆布满小空洞，总空闲够但无大块连续，最终 OOM 或分配变慢；③缓存不友好——分配的内存散落各处，CPU cache miss 频繁。内存池解决：预分配大块连续内存（无碎片、cache 友好）+ 空闲链表 O(1) 分配回收（无锁、无系统调用）+ 同规格对象紧凑排布（cache line 利用率高）。",
    tags: ["内存池", "malloc", "内存碎片"],
  },
  {
    id: "gsa-memory-pool-2",
    chapter: "gsa-memory-pool",
    level: 3,
    question: "什么样的对象适合池化，什么样的不适合？举各自的例子。",
    answer:
      "适合池化的特征：①高频创建销毁——如网络消息（每秒 10 万条）、子弹/Buff（战斗中频繁生成销毁）；②大小固定——如固定结构的 DamageMsg；③生命周期短——用完立即归还。不适合的：①低频长生命周期——玩家档、配置表，创建一次活很久，池化无收益且内存常驻不降；②大小差异大——不定长字符串、变长容器，固定块池会浪费或放不下；③极小对象——几字节的管理结构比对象还大。判断标准是「创建频率」：万次/秒级才池化，几次/秒用普通 new。",
    tags: ["对象池", "池化", "适用场景"],
  },
  {
    id: "gsa-memory-pool-3",
    chapter: "gsa-memory-pool",
    level: 3,
    question: "对象池的 Acquire/Release 为什么要用 placement new 和显式析构？",
    answer:
      "对象池复用的是内存，不是对象本身。Acquire 时用 placement new（new (ptr) T()）在已有内存上构造对象——内存来自池的空闲链表，不调 malloc；Release 时显式调析构（obj->~T()）销毁对象状态，但不调 delete 释放内存，而是把内存块插回空闲链表。这样内存常驻池中反复复用，零 malloc/free。如果不显式析构，对象持有的资源（如内部 vector）不会释放，造成逻辑泄漏；如果用 delete，内存会被通用分配器回收，池就失去了复用意义。placement new + 显式析构是池化对象的标准模式。",
    tags: ["对象池", "placement new", "析构"],
  },
  {
    id: "gsa-memory-pool-4",
    chapter: "gsa-memory-pool",
    level: 4,
    question: "对象池在多线程下如何保证线程安全？几种方案的取舍？",
    answer:
      "方案：①全局锁——池的 Acquire/Release 加互斥锁，简单但高并发下锁竞争成为瓶颈；②线程局部池（TLS）——每个线程一个独立池，无锁，但跨线程借还困难（某线程池空了无法用其他线程的空闲对象）；③分片池——池按线程 ID 分 N 个分片，每分片独立锁，减少竞争，跨分片借还时合并；④无锁栈——用 CAS 原子操作维护空闲链表，无锁但高并发下 CAS 失败重试多。实践：高频小对象用 TLS 池（无锁最快），偶尔的跨线程借还走分片池兜底。绝不用全局锁——万级 QPS 下锁竞争会吃掉池化的全部收益。",
    tags: ["对象池", "线程安全", "无锁"],
  },
];
