import type { ReviewQuestion } from "./types";

/** 学习地图 复习题 */
export const gplLearningMapQuestions: ReviewQuestion[] = [
  {
    id: "gpl-learning-map-1",
    chapter: "gpl-learning-map",
    level: 1,
    question: `Go 语言的核心设计哲学是什么？`,
    answer: `1.简单——25 个关键字显式优于隐式。2.并发原生——goroutine 和 channel 是语言级并发原语。3.工程化——快速编译自带 gofmt 统一 go build。4.组合优于继承——无类继承用结构体嵌入和接口组合。5.显式错误处理——多返回值 error 作为普通值返回非异常。`,
    tags: ["Go哲学","简单","并发","工程化"],
  },
  {
    id: "gpl-learning-map-2",
    chapter: "gpl-learning-map",
    level: 2,
    question: `本书四大板块的学习顺序？为什么？`,
    answer: `基础语法（类型与变量）→核心机制（函数、接口）→并发编程（goroutine、channel、select）→高级主题（包模块、测试）。基础语法是地基，核心机制建立在语法之上（函数是组织单元接口是多态核心），并发是 Go 杀手特性需先理解函数和类型，高级主题是工程实践在掌握语言特性后学习。`,
    tags: ["学习路径","四大板块","Go"],
  },
  {
    id: "gpl-learning-map-3",
    chapter: "gpl-learning-map",
    level: 3,
    question: `Go 相比 Java/Python/Rust 的核心优势？`,
    answer: `相比 Java：编译单二进制无 JVM 启动快部署简单，语法简洁无类继承，并发更轻量（goroutine 2KB vs 线程 1MB）。相比 Python：编译型性能高一个数量级，静态类型，原生并发。相比 Rust：更简单无所有权/借用学习曲线低，GC 自动管理，编译快。核心优势：简单+快速编译+原生并发+单二进制部署。`,
    tags: ["Go","Java","Python","Rust","对比"],
  },
  {
    id: "gpl-learning-map-4",
    chapter: "gpl-learning-map",
    level: 4,
    question: `Go 的接口和结构体嵌入如何实现组合优于继承？`,
    answer: `Go 无类继承。结构体嵌入：type Dog struct{Animal;Breed string}——Dog 嵌入 Animal 可直接访问 dog.Name（提升字段）和 Animal 方法。接口隐式实现——只要实现接口所有方法就自动满足不需声明 implements。比继承灵活：1.可运行时组合不同类型。2.避免继承层次脆弱性。3.接口小而精（io.Reader 一个 Read 方法）可组合。设计原则：定义小接口用嵌入复用用接口定义行为契约。`,
    tags: ["接口","嵌入","组合","继承"],
  }
];
