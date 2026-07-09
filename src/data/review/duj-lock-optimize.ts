import type { ReviewQuestion } from "./types";

export const dujLockOptimizeQuestions: ReviewQuestion[] = [
  {
    id: "duj-lo-1",
    chapter: "duj-lock-optimize",
    level: 2,
    question: "synchronized锁升级的完整路径是什么？每一级的工作原理是什么？",
    answer: "路径：无锁→偏向锁→轻量级锁→重量级锁，不可逆。①偏向锁——首次获取CAS将线程ID写入Mark Word，同线程再次进入只需比对ID相同直接进入（无CAS）。竞争出现时撤销偏向（safepoint）升级轻量级锁。②轻量级锁——获取时栈帧创建锁记录，CAS把Mark Word复制到锁记录再写入指针。CAS失败则自旋（适应性自旋）尝试，自旋失败升级。③重量级锁——OS互斥量，竞争失败线程进入内核态阻塞，放入ObjectWaiter队列，释放时唤醒队首。升级不可逆因为Mark Word布局已改变。JVM根据竞争程度自动选择最优状态。",
    tags: ["锁升级", "偏向锁", "轻量级锁", "重量级锁", "synchronized"],
  },
  {
    id: "duj-lo-2",
    chapter: "duj-lock-optimize",
    level: 3,
    question: "Mark Word在不同锁状态下如何布局？为什么调用hashCode()会影响偏向锁？",
    answer: "Mark Word是64位JVM对象头8字节数据：①无锁——hashcode(31)+unused(1)+age(4)+0(1)+01，标志位01；②偏向锁——threadId(54)+epoch(2)+age(4)+1(1)+01，标志位01倒数第三位1；③轻量级锁——指向栈中锁记录指针(62)+00；④重量级锁——指向Monitor对象指针(62)+10；⑤GC标记——空(62)+11。调用hashCode()影响偏向锁的原因：对象的hashCode存储在Mark Word的hashcode区域（31bit），与偏向锁的threadId区域（54bit）重叠。无锁状态调用hashCode()会缓存到Mark Word，一旦写入就无法进入偏向锁（threadId会覆盖hashCode）。偏向锁状态下调用hashCode()会撤销偏向锁。这是有些场景偏向锁不生效的原因之一。",
    tags: ["Mark Word", "锁状态", "hashCode", "偏向锁"],
  },
  {
    id: "duj-lo-3",
    chapter: "duj-lock-optimize",
    level: 2,
    question: "锁消除和锁粗化分别是什么？它们在什么场景下生效？",
    answer: "锁消除：JIT逃逸分析发现锁对象不可能被其他线程访问（未逃逸），直接消除synchronized不生成monitorenter/monitorexit。场景：①局部StringBuffer的append方法内部synchronized被消除；②局部Vector/Hashtable单线程使用时锁消除；③方法内创建的锁对象。前提是-XX:+DoEscapeAnalysis开启（JDK 8默认）。锁粗化：JIT发现连续对同一对象加锁解锁，合并为一次更大的锁块减少monitorenter/monitorexit次数。场景：①循环内加锁`for(i){synchronized(lock){...}}`被粗化为`synchronized(lock){for(i){...}}`；②连续同步方法调用如sb.append(\"a\").append(\"b\")合并为一次。条件是锁对象相同且连续加锁解锁间无其他需无锁执行代码。两者都是JIT自动优化无需手动干预。",
    tags: ["锁消除", "锁粗化", "逃逸分析", "JIT优化"],
  },
  {
    id: "duj-lo-4",
    chapter: "duj-lock-optimize",
    level: 3,
    question: "JDK 15为什么要废弃偏向锁？对现有代码有什么影响？",
    answer: "废弃原因（JEP 374）：①维护成本高——撤销/重偏向逻辑复杂，增加JVM复杂度，新特性（如Valhalla）需额外适配；②收益下降——现代CPU的CAS指令很快（约10-20纳秒），轻量级锁开销接近偏向锁的threadID比对；③影响GC——偏向锁撤销需在safepoint执行，大量撤销增加STW；④现代应用并发模式变化——大量使用无锁数据结构（ConcurrentHashMap/Atomic），synchronized无竞争场景减少。影响：①透明——JVM自动用轻量级锁替代，语义不变无需改代码；②性能略降——无竞争场景从无CAS变为一次CAS，但差距很小大多应用感知不到；③-XX:+UseBiasedLocking仍可手动开启（JDK 15-17），JDK 18+完全移除；④对无竞争锁性能敏感的可考虑Atomic/VarHandle替代。",
    tags: ["偏向锁废弃", "JDK15", "JEP374", "锁优化"],
  },
];
