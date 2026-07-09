import type { ReviewQuestion } from "./types";

export const dujMemoryModelQuestions: ReviewQuestion[] = [
  {
    id: "duj-mm-1",
    chapter: "duj-memory-model",
    level: 2,
    question: "Java内存模型的主内存与工作内存是什么关系？为什么需要这个抽象？",
    answer: "JMM定义主内存和工作内存两个概念：主内存存储所有共享变量，所有线程共享；工作内存是每个线程私有的，保存主内存共享变量的副本。线程对变量的所有操作都在工作内存进行，不能直接读写主内存，线程间传递需通过主内存。需要这个抽象的原因：JMM是对硬件内存模型的抽象——现代CPU有多级缓存和寄存器，每个核心有自己的缓存，修改后其他核心可能看不到。工作内存概念涵盖CPU缓存/寄存器/写缓冲区等所有导致线程间不可见的硬件机制。8种原子操作（read/load/use/assign/store/write/lock/unlock）定义了主内存与工作内存交互规范。",
    tags: ["JMM", "主内存", "工作内存", "内存模型"],
  },
  {
    id: "duj-mm-2",
    chapter: "duj-memory-model",
    level: 2,
    question: "happens-before是什么意思？八大规则分别是什么？传递性为什么重要？",
    answer: "happens-before：如果A happens-before B，则A的结果对B可见且A在B之前执行（是可见性保证而非时间顺序）。八大规则：①程序顺序规则——同线程内前操作happens-before后操作；②volatile规则——volatile写happens-before后续读；③锁规则——unlock happens-before后续lock；④线程启动规则——start() happens-before线程内所有操作；⑤线程终止规则——线程操作happens-before终止检测；⑥线程中断规则——interrupt() happens-before中断检测；⑦对象终结规则——构造完成happens-before finalize()；⑧传递性——A→B, B→C 则 A→C。传递性重要因为它是组合规则的关键——通过传递性可将多个规则串联推导跨操作链的可见性，如锁规则+程序顺序规则+传递性可推导线程间变量可见性。",
    tags: ["happens-before", "八大规则", "传递性", "可见性"],
  },
  {
    id: "duj-mm-3",
    chapter: "duj-memory-model",
    level: 3,
    question: "volatile能保证什么？不能保证什么？DCL单例为什么需要volatile？",
    answer: "volatile能保证：①可见性——写后立刻刷新主内存，读时立刻从主内存取最新值；②有序性——通过内存屏障禁止特定重排序（StoreStore+StoreLoad屏障在volatile写前后，LoadLoad+LoadStore在volatile读后）。volatile不能保证原子性——i++是读-改-写三步操作，volatile无法保证复合操作原子性，多线程下仍丢失更新，应用AtomicInteger。DCL单例需要volatile的原因：instance = new Singleton()分三步：①分配内存→②初始化对象→③赋值引用。没有volatile时JIT可能将②③重排序为①③②（先赋值引用再初始化）。线程A执行到③（已赋值未初始化），线程B检查instance != null为true直接返回未初始化对象。volatile通过StoreStore屏障禁止②③重排序。",
    tags: ["volatile", "可见性", "有序性", "DCL单例", "重排序"],
  },
  {
    id: "duj-mm-4",
    chapter: "duj-memory-model",
    level: 2,
    question: "原子性、可见性、有序性分别是什么？各用什么手段保证？",
    answer: "三大特性：①原子性——操作不可分割要么全做要么全不做。基本类型读写（除long/double）天然原子，复合操作如i++不保证。保证手段：synchronized/Lock/AtomicXxx（CAS）。volatile不能保证原子性。②可见性——线程修改共享变量后其他线程能立刻看到。问题来源CPU缓存。保证手段：volatile（强制读写主内存）、synchronized（释放锁时刷新主内存）、final（初始化完成后对所有线程可见）。③有序性——程序执行顺序符合预期。问题来源编译器和CPU指令重排序。保证手段：volatile（内存屏障禁止重排序）、synchronized（互斥保证有序）、happens-before规则。三者关系：synchronized同时保证三者（最全面但开销大）；volatile保证可见性和有序性（轻量但不保证原子性）；final保证初始化安全性。",
    tags: ["原子性", "可见性", "有序性", "并发特性"],
  },
];
