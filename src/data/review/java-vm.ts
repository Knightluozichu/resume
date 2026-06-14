import type { ReviewQuestion } from "./types";
export const javaVmQuestions: ReviewQuestion[] = [
  { id: "jvm-1", chapter: "java-vm", level: 1, question: "JVM 运行时内存分哪五块？各存什么？", answer: "堆(所有对象+数组)、方法区(类信息+常量+静态变量)、虚拟机栈(方法调用的局部变量+操作数栈)、本地方法栈(native方法)、程序计数器(当前字节码行号)。堆和方法区线程共享，其余每线程独立。", tags: ["内存分区"] },
  { id: "jvm-2", chapter: "java-vm", level: 1, question: "分代垃圾回收的基本原理是什么？", answer: "堆分新生代(Eden+2 Survivor)和老年代。新生代对象死得快→用复制算法快。活过多次的对象晋升老年代→用标记-清除/整理。Minor GC只清新生代(快)，Major GC清整个堆(慢)。", tags: ["GC"] },
  { id: "jvm-3", chapter: "java-vm", level: 2, question: "GC 怎么判断对象是'活的'还是'死的'？", answer: "可达性分析：从 GC Roots(栈引用/静态变量/JNI引用)出发，沿引用链能到的是活的、到不了的是死的。这就是为什么单例持有Activity会导致泄漏→单例是GC Root→Activity被它引用→GC认为Activity还活着。", tags: ["可达性"] },
  { id: "jvm-4", chapter: "java-vm", level: 2, question: "Android 为什么不用 HotSpot JVM 而自己做了 ART？", answer: "HotSpot为服务器/桌面设计(大内存/强CPU)，移动设备内存小/CPU弱/重省电。ART的.dex格式比.class更紧凑，AOT编译启动快，专为移动优化。", tags: ["ART vs JVM"] },
];
