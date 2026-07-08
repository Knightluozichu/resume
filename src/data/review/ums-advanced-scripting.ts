import type { ReviewQuestion } from "./types";

export const umsAdvancedScriptingQuestions: ReviewQuestion[] = [
  {
    id: "ums-advanced-scripting-1",
    chapter: "ums-advanced-scripting",
    level: 1,
    question: "C# 高级脚本三件套是什么？各自解决什么问题？",
    answer: "泛型解决代码复用（一份代码服务多种类型，如泛型单例、泛型对象池），委托与事件解决模块解耦（系统间通信不硬引用，发布订阅模式），扩展方法解决无侵入增强（为已有类型添加方法而不修改源码）。三者是写出高复用、低耦合 Unity 代码的核心工具。",
    tags: ["泛型", "委托", "扩展方法"],
  },
  {
    id: "ums-advanced-scripting-2",
    chapter: "ums-advanced-scripting",
    level: 2,
    question: "泛型约束 `where T : MonoBehaviour` 解决了什么问题？不加约束会怎样？",
    answer: "约束确保 T 一定是 MonoBehaviour 子类，从而可以在泛型代码里安全调用 MonoBehaviour 的方法（Instantiate、GetComponent）。不加约束时编译器不知道 T 有什么方法，连 `Object.Instantiate` 都调不了——必须先 cast。约束让泛型代码类型安全且不需要运行时 cast，编译期就能发现类型错误。",
    tags: ["泛型约束", "where 子句", "类型安全"],
  },
  {
    id: "ums-advanced-scripting-3",
    chapter: "ums-advanced-scripting",
    level: 3,
    question: "事件订阅后忘记取消订阅会导致什么问题？怎么解决？",
    answer: "event 是强引用，持有订阅者的委托引用，订阅者即使被 Destroy 也不会被 GC 回收（内存泄漏）。事件触发时访问已销毁的对象报 MissingReferenceException。解决：在 OnDisable/OnDestroy 里 `-=` 取消所有订阅，养成「订阅必取消」的习惯。或用弱引用事件系统（WeakReference 包装委托），但复杂度高，通常手动取消更可靠。",
    tags: ["事件泄漏", "Memory leak", "生命周期"],
  },
  {
    id: "ums-advanced-scripting-4",
    chapter: "ums-advanced-scripting",
    level: 4,
    question: "用事件总线 vs 直接引用，各有什么优缺点？什么时候该用哪种？",
    answer: "事件总线优点：松耦合，发布者不认识订阅者，新增系统不改已有代码。缺点：调试困难（事件链不直观）、性能有开销（字典查找+委托调用）。直接引用优点：直观、高性能。缺点：强耦合。规则：跨系统通信用事件总线（如 UI 通知游戏逻辑），系统内部通信用直接引用（如 Player 调用自己 Rigidbody）。大型项目两者混用，按耦合度边界选择。",
    tags: ["事件总线", "直接引用", "架构选择"],
  },
];
