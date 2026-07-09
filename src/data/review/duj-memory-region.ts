import type { ReviewQuestion } from "./types";

export const dujMemoryRegionQuestions: ReviewQuestion[] = [
  {
    id: "duj-mr-1",
    chapter: "duj-memory-region",
    level: 1,
    question: "JVM运行时数据区有哪五大区域？哪些是线程私有的，哪些是线程共享的？",
    answer: "五大区域：①程序计数器（PC）——线程私有，记录当前线程执行字节码行号，是唯一不会OOM的区域；②虚拟机栈——线程私有，每个方法调用创建一个栈帧，含局部变量表/操作数栈/动态链接/返回地址；③本地方法栈——线程私有，为Native方法服务；④堆——线程共享，存放对象实例和数组，GC主战场，分新生代（Eden+S0+S1）和老年代；⑤方法区——线程共享，存放类信息/常量池/静态变量/JIT代码，JDK 8后由元空间实现使用本地内存。线程私有区域随线程创建而生、随线程消亡而灭，无需GC干预；线程共享区域需要GC回收。",
    tags: ["内存区域", "线程私有", "线程共享"],
  },
  {
    id: "duj-mr-2",
    chapter: "duj-memory-region",
    level: 2,
    question: "堆溢出和元空间溢出的原因分别是什么？如何区分和诊断？",
    answer: "堆溢出（OOM: Java heap space）：对象实例太多无法分配且GC后仍不够。常见于内存泄漏（static集合持续添加）、大对象分配、瞬时高并发。诊断：-XX:+HeapDumpOnOutOfMemoryError自动dump，MAT分析Retained Heap找最大对象及GC Roots引用链。元空间溢出（OOM: Metaspace）：加载类太多，元空间无法容纳。常见于大量动态代理（CGLIB）、JSP预编译、热部署。诊断：jcmd打印类加载统计，检查异常类加载器。区分：堆溢出dump中大量重复对象；元空间溢出类数量持续增长。解决：堆溢出调大-Xmx或修复泄漏；元空间溢出调大-XX:MaxMetaspaceSize或排查动态类生成源。",
    tags: ["OOM", "堆溢出", "元空间", "诊断"],
  },
  {
    id: "duj-mr-3",
    chapter: "duj-memory-region",
    level: 2,
    question: "JDK 7到JDK 8为什么把永久代改成元空间？有什么实际影响？",
    answer: "永久代问题：①大小固定（-XX:MaxPermSize）难以预估，动态类加载容易OOM；②在堆内分配与堆争用空间；③GC效率低，类卸载条件苛刻实际很少回收。元空间改进：①使用本地内存不受堆限制，只受机器物理内存限制，大幅减少OOM风险；②-XX:MaxMetaspaceSize可不设（默认无上限）也可设上限防止无限增长；③字符串常量池从永久代移到堆。实际影响：JDK 8后CGLIB/动态代理/热部署的PermGen OOM基本消失；但需注意元空间使用本地内存，不设上限可能耗尽机器内存导致进程被OOM Killer杀死。",
    tags: ["永久代", "元空间", "JDK8演进"],
  },
  {
    id: "duj-mr-4",
    chapter: "duj-memory-region",
    level: 3,
    question: "一个Java对象在堆中占多少内存？如何计算？",
    answer: "Java对象由三部分组成：①对象头——Mark Word（8字节，存储hashCode/锁状态/GC年龄）+ 类型指针（4字节开启指针压缩或8字节关闭），数组额外4字节数组长度；②实例数据——各字段值按类型大小排列并按对齐填充；③对齐填充——补齐到8字节整数倍。示例：只含两个int字段的对象，开启指针压缩=对象头(8+4=12B)+实例数据(4+4=8B)=20B→对齐到24B。可用jol（Java Object Layout）库精确测量：GraphLayout.parseInstance(obj).toPrintable()。理解对象布局对内存敏感场景（缓存设计、大批量小对象）很重要。",
    tags: ["对象布局", "对象头", "Mark Word", "内存计算"],
  },
];
