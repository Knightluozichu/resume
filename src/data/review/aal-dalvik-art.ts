import type { ReviewQuestion } from "./types";

export const aalDalvikArtQuestions: ReviewQuestion[] = [
  {
    id: "aal-da-1",
    chapter: "aal-dalvik-art",
    level: 1,
    question: "Dalvik虚拟机与JVM的主要区别是什么？DEX文件格式有什么特点？",
    answer: "Dalvik与JVM的主要区别：①执行架构——JVM基于栈（Stack-based），Dalvik基于寄存器（Register-based），寄存器架构指令更少、执行效率更高；②执行文件——JVM执行.class文件（每个类一个），Dalvik执行.dex文件（多个.class合并为一个.dex，去除冗余常量池）；③优化——Dalvik的DEX格式通过合并多个class文件，减少了常量池冗余，减小了文件体积。DEX文件特点：①全称Dalvik Executable，是Dalvik/ART虚拟机的可执行格式；②由dx工具将多个.class文件合并、去重、优化生成；③包含紧凑的指令集、共享的常量池、字符串池；④每个DEX文件可包含多个类，适合移动设备内存受限的环境。",
    tags: ["Dalvik", "JVM", "DEX", "寄存器架构"]
  },
  {
    id: "aal-da-2",
    chapter: "aal-dalvik-art",
    level: 2,
    question: "ART虚拟机的AOT编译与Dalvik的JIT编译有什么区别？Android 7.0后的混合编译策略是什么？",
    answer: "AOT（Ahead-Of-Time）与JIT（Just-In-Time）区别：①编译时机——JIT在运行时逐行将字节码翻译为机器码，每次启动都重新编译；AOT在应用安装时（dex2oat工具）将字节码预编译为机器码（OAT格式），运行时直接执行机器码；②启动速度——JIT启动慢（需要运行时编译），AOT启动快（预编译完成）；③存储空间——JIT不占用额外存储，AOT生成的OAT文件占用更多存储空间；④内存——JIT运行时需要编译缓存，AOT运行时内存更少。Android 7.0混合编译策略（AOT+JIT+Profile）：①首次启动用JIT快速运行，同时记录热点方法到Profile；②设备空闲时根据Profile对热点代码进行AOT编译；③兼顾启动速度（JIT即时运行）和运行性能（AOT预编译热点），同时避免全量AOT占用过多存储。这是ART在性能和空间之间的最佳平衡。",
    tags: ["ART", "AOT", "JIT", "混合编译", "Profile"]
  },
  {
    id: "aal-da-3",
    chapter: "aal-dalvik-art",
    level: 2,
    question: "ART虚拟机的GC（垃圾回收）机制相比Dalvik有哪些改进？为什么能减少卡顿？",
    answer: "ART GC相比Dalvik的改进：①并发回收——Dalvik使用Mark-Sweep标记清除，需要全堆暂停（Stop-The-World），容易造成卡顿；ART使用并发标记清除（CMS），大部分GC工作在后台线程并发执行，只在工作线程需要极短暂停；②停顿次数——Dalvik一次GC需要2~3次停顿，ART通常只需1次（并发阶段不需要停顿），停顿时间从几百毫秒降到几毫秒；③内存碎片——ART的Compact GC可以整理内存碎片，Dalvik不行；④回收策略——ART支持不同的GC策略（前台并发、后台全量），前台用并发减少卡顿，后台用全量清理碎片；⑤大对象空间——ART有独立的Large Object Space处理大对象，减少大对象复制开销。减少卡顿的核心原因：并发GC使应用线程和GC线程同时运行，只在标记阶段需要极短暂停，避免了Dalvik全堆暂停导致的帧丢失。",
    tags: ["ART", "GC", "垃圾回收", "并发标记清除", "卡顿"]
  },
  {
    id: "aal-da-4",
    chapter: "aal-dalvik-art",
    level: 3,
    question: "dex2oat工具的作用是什么？OAT/VDEX/ART文件分别是什么？它们之间有什么关系？",
    answer: "dex2oat是ART虚拟机的编译工具，在应用安装时将DEX字节码编译为机器码。三种文件：①OAT（Optimized Android Executable）——dex2oat输出的ELF格式文件，包含编译后的机器码，是ART直接执行的格式；②VDEX（Verified DEX）——Android 8.0引入，存储经过验证的DEX原始数据，避免重复验证，加快安装和启动速度；③ART文件——存储OAT中的Class数据（方法指针、字段偏移等），供运行时快速查找。关系：安装APK时dex2oat读取classes.dex → 编译为OAT（机器码）→ 同时生成VDEX（验证后的DEX）和ART（类数据缓存）。运行时：ART虚拟机优先加载OAT中的机器码执行，如果OAT不存在则回退到JIT从VDEX/DEX中即时编译。VDEX的存在使得重装应用时无需重新验证DEX，大幅加快安装速度。",
    tags: ["dex2oat", "OAT", "VDEX", "ART文件", "编译流程"]
  }
];
