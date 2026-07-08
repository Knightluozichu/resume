import type { ReviewQuestion } from "./types";

/** Go 设计哲学 复习题 */
export const giaGoPhilosophyQuestions: ReviewQuestion[] = [
  {
    id: "gia-go-philosophy-1",
    chapter: "gia-go-philosophy",
    level: 1,
    question: "Go 的四大设计支柱是什么？",
    answer: "少即是多（25 关键字、无继承、显式优于隐式）、快速编译（无头文件、依赖明确、秒级构建）、原生并发（goroutine 轻量、channel 通信、CSP 模型）、工程务实（gofmt 统一风格、内置测试、单二进制部署）。",
    tags: ["设计哲学", "四大支柱"],
  },
  {
    id: "gia-go-philosophy-2",
    chapter: "gia-go-philosophy",
    level: 2,
    question: "Go 接口为什么是隐式实现？比 Java 显式 implements 有什么优劣？",
    answer: "隐式实现：类型实现接口全部方法即自动满足，无需声明 implements。优势：解耦（定义方与实现方互不依赖）、灵活（可为第三方类型事后适配）、鼓励小接口（io.Reader 一个方法被无数类型实现）。劣势：不直观（看不到实现了哪些接口）、无法编译期强制实现（可用 var _ I = T{} 断言弥补）、可能意外满足。Go 社区认为隐式实现利大于弊，尤其适合大型代码库渐进式重构。",
    tags: ["接口", "隐式实现", "鸭子类型"],
  },
  {
    id: "gia-go-philosophy-3",
    chapter: "gia-go-philosophy",
    level: 3,
    question: "嵌入（embedding）和继承有什么区别？为什么说嵌入是组合不是继承？",
    answer: "嵌入：struct 中只有类型无名字的字段，被嵌入字段的方法和字段提升到外层。区别：嵌入是 has-a 关系（Dog 有一个 Animal），不是 is-a（Dog 是一个 Animal）。嵌入字段的方法不会被覆写——调用 Animal.Eat() 时不会调用 Dog 的版本（无虚函数表）。要实现多态用 interface，而非嵌入。把嵌入当继承用会得到反直觉行为。嵌入避免继承链的脆弱基类问题，保持类型层次扁平。",
    tags: ["嵌入", "继承", "组合"],
  },
  {
    id: "gia-go-philosophy-4",
    chapter: "gia-go-philosophy",
    level: 4,
    question: "为什么 Go 选择 error 返回值而非异常？代价是什么？如何组织错误让处理更优雅？",
    answer: "选择原因：显式（错误是返回值，必须处理，不会被空 catch 吞掉）、可预测（无隐藏控制流跳转）、轻量（error 是普通接口值，无栈展开开销）、组合友好（可包装判断转换）。代价：if err != nil 重复样板代码、可用 _ 忽略、错误链追踪不如异常栈自动。组织方式：1.13 后用 errors.Is/As/Unwrap，fmt.Errorf %w 包装错误链，自定义错误类型实现 Is/As。这样 error 接近异常的表达力，同时保持显式与可预测。",
    tags: ["error", "异常", "errors.Is", "综合"],
  },
];
