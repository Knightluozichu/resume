import type { ReviewQuestion } from "./types";

export const jvtJvmArchitectureQuestions: ReviewQuestion[] = [
  {
    id: "jvt-ja-1",
    chapter: "jvt-jvm-architecture",
    level: 2,
    question: "JVM 的运行时数据区有哪些？哪些是线程私有，哪些是线程共享？",
    answer:
      "JVM 运行时数据区分为线程私有和线程共享两类。线程私有：①程序计数器（PC Register）——记录当前线程执行的字节码行号，线程切换后能恢复；②虚拟机栈（VM Stack）——每个方法调用创建一个栈帧，存局部变量表、操作数栈、动态链接、方法出口，方法调用即压栈，返回即出栈；③本地方法栈（Native Method Stack）——为 native 方法服务，与虚拟机栈类似。线程共享：①堆（Heap）——存放几乎所有对象实例和数组，GC 主战场，分新生代（Eden + 2个 Survivor）和老年代；②方法区（Method Area）——存类信息、常量、静态变量、JIT 编译后的代码，JDK8 前用 PermGen 实现，JDK8+ 用元空间（Metaspace）移到本地内存。线程私有的区域随线程生灭无 GC 问题；线程共享的堆是 OOM 和 GC 的核心战场。",
    tags: ["内存区域", "线程模型"],
  },
  {
    id: "jvt-ja-2",
    chapter: "jvt-jvm-architecture",
    level: 3,
    question: "双亲委派模型是什么？为什么 Java 要这样设计？打破双亲委派的场景有哪些？",
    answer:
      "双亲委派模型：类加载请求先委派给父加载器，父加载器找不到再由当前加载器加载。层级：自定义加载器 → 应用类加载器（AppClassLoader）→ 扩展类加载器（ExtClassLoader/PlatformClassLoader）→ 启动类加载器（BootstrapClassLoader，加载 rt.jar 核心类）。加载顺序自顶向下：先尝试父加载器，失败才自己加载。设计目的：①安全——防止核心类被篡改，用户写一个 java.lang.String 会被启动加载器先加载到真正的 String；②唯一性——同一个类只会被加载一次，避免类的重复加载；③层次清晰——各级加载器各司其职。打破双亲委派的场景：①JDBC——DriverManager 在 rt.jar 中由启动加载器加载，但具体驱动实现类在 classpath 由应用加载器加载，启动加载器看不到子加载器的类，故用 Thread.contextClassLoader 反向加载；②SPI 机制同理；③Tomcat——每个 webapp 用独立 WebappClassLoader 先自己加载（不委派），实现 webapp 间类隔离；④OSGi——模块化按网状加载；⑤热部署——重新加载已修改的类。",
    tags: ["类加载", "双亲委派"],
  },
  {
    id: "jvt-ja-3",
    chapter: "jvt-jvm-architecture",
    level: 3,
    question: "类加载的过程是什么？每个阶段做什么？",
    answer:
      "类加载包含加载、验证、准备、解析、初始化五个阶段（使用和卸载不属于加载过程）。①加载——通过类的全限定名获取定义此类的二进制字节流（从 jar/class 文件/网络等），转为方法区的运行时数据结构，并在堆生成一个 Class 对象作为访问入口；②验证——确保 Class 文件字节流符合 JVM 规范，包括文件格式验证（魔数 0xCAFEBABE）、元数据验证（语义合法）、字节码验证（方法体逻辑合法）、符号引用验证（解析时能否找到引用）；③准备——为类变量（static）在方法区分配内存并赋零值（int 为 0，不是代码里的初始值），static final 常量在此阶段赋最终值；④解析——将常量池内的符号引用替换为直接引用（如方法名替换为内存地址），可在初始化前或运行时按需进行（延迟解析）；⑤初始化——执行类构造器 <clinit>，即 static 变量赋值和 static 块按源码顺序执行，JVM 保证 <clinit> 线程安全。触发初始化的场景：new、访问静态字段、调用静态方法、反射、子类初始化触发父类初始化、主类启动。",
    tags: ["类加载过程", "生命周期"],
  },
  {
    id: "jvt-ja-4",
    chapter: "jvt-jvm-architecture",
    level: 4,
    question: "JVM 的执行引擎如何工作？解释器和 JIT 编译器如何协作？",
    answer:
      "JVM 执行引擎是解释执行 + JIT 编译执行的混合模式。①解释器——逐条解释字节码执行，启动快（无需编译）但运行慢，适合短时运行或冷代码；②JIT 编译器（HotSpot 有 C1 客户端编译器和 C2 服务端编译器）——将热点代码（被多次执行的方法或循环）编译成本地机器码缓存，编译耗时但后续执行快，适合长期运行的热代码；③协作机制——程序启动时用解释器快速跑起来，同时用方法调用计数器和回边计数器探测热点，当方法/循环调用次数超过阈值（默认 10000 次，-XX:CompileThreshold）触发 JIT 编译，编译后的机器码缓存到 CodeCache，后续直接执行机器码。④分层编译（Tiered Compilation，JDK8 默认开启）——先 C1 快速编译带简单优化（降低解释开销），热点再升级到 C2 做激进优化（逃逸分析、锁消除、内联），平衡启动速度和峰值性能。⑤AOT 编译（JDK9+ jaotc）——提前编译为机器码，进一步降低启动时间。优缺点权衡：解释器启动快峰值低，JIT 启动慢峰值高，混合模式兼得两者优势。",
    tags: ["执行引擎", "JIT编译"],
  },
];
