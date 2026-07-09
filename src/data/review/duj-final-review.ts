import type { ReviewQuestion } from "./types";

export const dujFinalReviewQuestions: ReviewQuestion[] = [
  {
    id: "duj-fr-1",
    chapter: "duj-final-review",
    level: 2,
    question: "全书三大知识体系是什么？它们之间有什么交叉依赖关系？",
    answer: "三大体系：①自动内存管理（空间维度）——内存区域/GC算法/收集器演进/OOM诊断，核心是数据存在哪何时回收；②虚拟机执行子系统（时间维度）——类加载/双亲委派/字节码执行/栈帧/编译优化/调优，核心是代码怎么加载执行优化；③并发与锁（并发维度）——JMM/happens-before/volatile/锁升级/锁优化，核心是多线程如何正确协作。交叉依赖：①Mark Word同时服务GC（分代年龄）和锁（锁状态）；②逃逸分析同时服务编译优化（标量替换）和锁消除；③栈帧同时服务执行引擎（操作数栈）和锁（锁记录）；④内存模型既是并发可见性保证也是GC一致性基础。理解交叉点是深入理解JVM的标志。",
    tags: ["三大体系", "交叉依赖", "知识整合"],
  },
  {
    id: "duj-fr-2",
    chapter: "duj-final-review",
    level: 3,
    question: "对象头Mark Word如何同时服务于GC和锁优化？这种设计有什么好处？",
    answer: "Mark Word是64位JVM对象头8字节数据：①GC相关——分代年龄age(4bit)记录Minor GC次数达阈值晋升老年代，GC标记用标志位11。②锁相关——锁状态标志位(最后2-3bit)区分无锁(01)/偏向锁(01+1)/轻量级锁(00)/重量级锁(10)，偏向锁存threadId(54bit)，轻量级锁存锁记录指针，重量级锁存Monitor指针，无锁存hashCode(31bit)。设计好处：①节省内存——复用8字节通过状态标志区分用途，大量小对象内存节省显著；②状态一致性——同一时刻只一种状态生效，GC年龄在所有锁状态下保留（除GC标记）；③原子性——CAS原子修改Mark Word保证锁切换原子性；④GC与锁协作——GC在safepoint安全修改Mark Word。体现JVM内存效率极致追求。",
    tags: ["Mark Word", "GC", "锁优化", "对象头", "内存复用"],
  },
  {
    id: "duj-fr-3",
    chapter: "duj-final-review",
    level: 3,
    question: "用一次线上Full GC + CPU飙高的复合事故，串联全书三大体系进行推理分析。",
    answer: "现象：频繁Full GC+CPU 90%+响应50ms→2000ms。推理链：①空间维度——jstat发现FGC每分钟5-10次，O区95%回收后仍80%，jmap发现Cache对象实例异常多，MAT分析static ConcurrentHashMap占60% Retained Heap且key持续增长（内存泄漏）。②GC分析——回收效率低因为对象在可达性分析中仍可达。③时间维度——jstack发现大量线程BLOCKED在synchronized(cache)上；JIT日志显示逆优化频率升高（锁竞争导致profile不准确C2乐观假设失败）。④编译优化——逃逸分析发现cache是GlobalEscape无法标量替换/锁消除。⑤并发维度——jstack -l发现锁从偏向升级为重量级锁（大量线程竞争自旋失败进内核态阻塞），CPU飙高是自旋空转+内核态切换+GC线程。⑥实战调优——根因：内存泄漏+锁竞争。调整：调大-Xmx缓解+修复代码（限制Cache大小+Caffeine替代+分段锁）+G1参数。验证：FGC降到0，CPU降到40%，响应恢复50ms。展示三大体系交叉形成恶性循环。",
    tags: ["Full GC", "CPU飙高", "事故分析", "三大体系串联"],
  },
  {
    id: "duj-fr-4",
    chapter: "duj-final-review",
    level: 3,
    question: "如何判断自己是否真正「深入理解」了Java虚拟机？",
    answer: "判断标准——能否从三个维度解释JVM现象根因：①空间维度——能解释OOM可能是堆也可能是元空间溢出；GC频繁不一定是内存不够（可能晋升过快/大对象/泄漏）；Retained Heap比Shallow Heap更重要（含引用链）。②时间维度——能解释-Xmx和-Xms设一样大避免动态扩容抖动；G1的MaxGCPauseMillis不是越小越好（太小GC频率升高降低吞吐）；逃逸分析后某些对象不需堆分配（标量替换拆解为标量放寄存器）。③并发维度——能解释synchronized无竞争时几乎零开销（偏向锁只记threadID无CAS）；volatile保证可见性不保证原子性（i++是读改写三步）；DCL单例需volatile（对象创建分步操作可能重排序）。综合标志——能否不重启JVM用工具采集证据定位根因给出方案，而非「重启+加内存+调大堆」三件套。理解JVM是建立空间×时间×并发的三维视角。",
    tags: ["深入理解", "三维视角", "判断标准", "技术闭环"],
  },
];
