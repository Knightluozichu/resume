import type { ReviewQuestion } from "./types";

/** 学习地图 复习题 */
export const giaLearningMapQuestions: ReviewQuestion[] = [
  {
    id: "gia-learning-map-1",
    chapter: "gia-learning-map",
    level: 1,
    question: `Go 语言实战全书分为哪四大板块？`,
    answer: `Go 入门（环境与哲学）、核心类型（数组与切片、Map 与 Struct）、并发模型（Goroutine、Channel、并发模式）、工程实践（测试打包、标准库、总复习）。`,
    tags: ["全书结构", "学习路径"],
  },
  {
    id: "gia-learning-map-2",
    chapter: "gia-learning-map",
    level: 2,
    question: `Go 的「少即是多」哲学体现在哪些方面？带来了什么好处？`,
    answer: `体现：25 个关键字、无继承（用组合+嵌入替代）、1.18 前无泛型（用 interface 替代）、无异常（用 error 返回值）、无构造函数、gofmt 强制统一格式。好处：学习曲线平缓（新人一周上手）、大团队协作顺畅（风格统一）、编译极快（秒级构建百万行项目）、工具链统一（go build/test/fmt/vet/mod 一套命令）。克制换来工程效率最大化。`,
    tags: ["少即是多", "设计哲学"],
  },
  {
    id: "gia-learning-map-3",
    chapter: "gia-learning-map",
    level: 3,
    question: `为什么说并发是 Go 的灵魂？跳过并发直接写 CRUD 有什么问题？`,
    answer: `并发是语言一等公民：go 关键字启动 goroutine，channel 是内置类型，select 是内置语句——无需第三方库。跳过并发的问题：Go 标准库（net/http、database/sql）底层都是 goroutine+channel，不理解就读不懂标准库行为；HTTP handler 的 r.Context() 需正确传递，否则客户端断开后 goroutine 泄漏。即使写 CRUD，context 的取消传播也至关重要。并发不是可选技能。`,
    tags: ["并发原生", "CSP", "工程实践"],
  },
  {
    id: "gia-learning-map-4",
    chapter: "gia-learning-map",
    level: 4,
    question: `对比 Go 与 Java 在面向对象与错误处理上的设计差异，说明 Go 之道的取舍。`,
    answer: `面向对象：Java 用 class 继承（is-a）+ 显式 implements 接口；Go 用 struct 嵌入组合（has-a）+ 隐式接口（鸭子类型编译期检查）。Go 无继承链，避免脆弱基类问题。错误处理：Java 用异常（控制流跳转，可能被空 catch 吞掉）；Go 用 error 返回值（显式处理，if err != nil 重复但可预测）。Go 之道的取舍：牺牲语法简洁（error 重复）和表达力（无继承），换取显式性、可预测性、编译速度和协作顺畅——一切为大规模工程协作服务。`,
    tags: ["语言对比", "面向对象", "错误处理", "综合"],
  },
];
