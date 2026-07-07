import type { ReviewQuestion } from "./types";

/** CLR via C# · CLR 执行模型复习题 */
export const cvcClrExecutionQuestions: ReviewQuestion[] = [
  {
    id: "cvc-clr-execution-1",
    chapter: "cvc-clr-execution",
    level: 1,
    question: "程序集（Assembly）中存储的是机器码还是 IL？为什么？",
    answer:
      "程序集中存储的是 IL（中间语言）和元数据，不是机器码。\n\n原因：\n1. IL 是平台无关的指令集，不针对任何特定 CPU 架构。同一个 .dll 可以在 Windows x64、Linux ARM 等不同平台上运行——JIT 编译器负责在运行时将 IL 翻译为当前平台的机器码。\n2. 如果程序集存的是机器码，就必须为每个平台单独编译（像 C/C++ 那样），丧失跨平台能力。\n3. 机器码是 JIT 在运行时动态生成的，只存在于内存中，不写回磁盘。\n\n元数据则描述了程序集中所有类型的信息（类型名、方法签名、字段布局、继承关系等），是 CLR 运行时必须读取的结构化数据。",
    tags: ["程序集", "IL", "机器码", "跨平台"],
  },
  {
    id: "cvc-clr-execution-2",
    chapter: "cvc-clr-execution",
    level: 2,
    question: "JIT 编译器的「按需编译」是什么意思？它对性能有什么影响？",
    answer:
      "JIT 的「按需编译」指方法在首次被调用时才被编译为机器码，之前只以 IL 形式存在。\n\n性能影响：\n1. **启动开销小**：程序启动时只编译入口方法（Main），不会一次性编译所有方法。如果程序有 1000 个方法但启动只用到 10 个，只有这 10 个被编译。\n2. **首次调用延迟**：每个方法第一次被调用时有编译开销（通常几毫秒到几十毫秒）。对于大型应用，首次交互可能有可感知的延迟。\n3. **后续调用无开销**：编译后的机器码被缓存在内存中，第二次调用直接跳转到缓存地址，几乎无额外开销。\n4. **运行时优化**：JIT 可以利用运行时信息做静态编译器做不到的优化——如内联虚方法（根据实际类型）、分支预测优化（根据实际执行路径）。\n\n缓解首次调用延迟的方法：AOT 编译（NativeAOT / ReadyToRun）在发布时预编译，分层编译先用快速 JIT 后用优化 JIT。",
    tags: ["JIT", "按需编译", "性能", "AOT"],
  },
  {
    id: "cvc-clr-execution-3",
    chapter: "cvc-clr-execution",
    level: 3,
    question: "描述 CLR 加载程序集并执行方法的完整流程。从双击 .exe 开始到方法返回。",
    answer:
      "完整流程：\n\n1. **操作系统启动进程**：双击 .exe 后，操作系统创建进程，加载 .NET 运行时（CoreRun / dotnet.exe）。\n\n2. **CLR 初始化**：CLR 初始化 GC 堆、线程池、JIT 编译器等核心组件。\n\n3. **加载入口程序集**：程序集加载器读取 .exe 的 PE 头和 CLR 头，定位入口点（Main 方法）。读取元数据，为程序集中的所有类型构建类型对象（含方法表、字段布局）。\n\n4. **JIT 编译 Main**：JIT 将 Main 方法的 IL 编译为本地机器码。编译时检查 IL 的类型安全性。\n\n5. **执行 Main**：操作系统线程开始执行 Main 的机器码。CLR 在旁监控——如果 Main 创建对象，GC 堆分配内存；如果 Main 调用其他方法，那些方法被按需 JIT 编译。\n\n6. **方法调用链**：Main 调用方法 A → JIT 编译 A → A 调用方法 B → JIT 编译 B → B 返回 → A 返回 → Main 返回。每层调用时 CLR 检查栈是否溢出，异常是否被抛出。\n\n7. **Main 返回**：CLR 执行终结器（如果有），回收所有 GC 堆内存，卸载 AppDomain，退出进程。\n\n关键点：IL 编译和元数据读取是交织的——加载程序集时只读取元数据构建类型对象，IL 代码在方法被调用时才被 JIT 编译。",
    tags: ["程序集加载", "JIT", "执行流程", "元数据"],
  },
  {
    id: "cvc-clr-execution-4",
    chapter: "cvc-clr-execution",
    level: 4,
    question: "为什么说「元数据是 CLR 类型系统的源代码」？请从反射、类型安全、序列化三个角度说明元数据的作用。",
    answer:
      "元数据是 CLR 运行时必须读取的结构化数据，它描述了程序集中所有类型的信息。说它是「类型系统的源代码」是因为 CLR 的所有类型操作都依赖它：\n\n1. **反射角度**：\n   `typeof(T).GetProperties()` 返回类型的所有属性——这些信息来自元数据中的属性定义表。`Activator.CreateInstance(type)` 创建对象——CLR 读取元数据中的字段布局信息来分配内存。反射不是「魔法」，它就是直接读取元数据表的 API。没有元数据，反射无法工作。\n\n2. **类型安全角度**：\n   JIT 编译 IL 时会验证类型操作是否合法——`castclass` 指令（强制转型）需要检查目标类型是否在继承链上，这个继承链信息来自元数据。如果元数据说 `Dog` 继承自 `Animal`，那么 `Animal a = new Dog()` 合法；如果元数据说 `Cat` 不继承 `Animal`，转型会抛 `InvalidCastException`。类型安全验证完全依赖元数据的准确性。\n\n3. **序列化角度**：\n   `System.Text.Json.JsonSerializer.Serialize(obj)` 读取对象的类型元数据——字段名、类型、顺序——来决定如何将对象转成 JSON。特性（如 `[JsonPropertyName]`）也存储在元数据中，序列化器通过反射读取这些特性来定制输出。没有元数据，序列化器不知道对象有哪些字段。\n\n总结：元数据不是「附加文档」，而是 CLR 运行时的核心数据结构。类型加载、方法分派、转型检查、反射、序列化、GC 遍历——所有运行时行为都从元数据开始。",
    tags: ["元数据", "反射", "类型安全", "序列化"],
  },
];
