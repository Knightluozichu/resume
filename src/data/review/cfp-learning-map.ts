import type { ReviewQuestion } from "./types";

/** C# 函数式编程 · 学习地图复习题 */
export const cfpLearningMapQuestions: ReviewQuestion[] = [
  {
    id: "cfp-learning-map-1",
    chapter: "cfp-learning-map",
    level: 1,
    question: "C# 函数式编程全书的四大板块分别是什么？按推荐学习顺序列出。",
    answer:
      "四大板块按推荐学习顺序为：\n1. 函数式基础（学习地图、函数优先）——建立「函数是一等公民」的核心心智模型\n2. 高阶函数（高阶函数、柯里化与偏应用）——掌握函数组合与抽象的工具\n3. 不可变性（不可变数据、函数式模式匹配）——理解数据建模与控制流的函数式方式\n4. 函数式实践（延迟求值、Monad与链式、函数式错误处理、总复习）——将理论落地为工程模式\n\n板块之间存在递进依赖：基础是前提，高阶函数是组合引擎，不可变性是安全基石，实践是落地工具箱。",
    tags: ["四大板块", "学习路径", "全书结构"],
  },
  {
    id: "cfp-learning-map-2",
    chapter: "cfp-learning-map",
    level: 2,
    question: "为什么说「函数是一等公民」是函数式编程的基石？C# 中哪些语法特性支持这一点？",
    answer:
      "函数是一等公民意味着函数与数据（如 int、string）享有同等权利：可以赋值给变量、作为参数传递、作为返回值返回、存储在数据结构中。这是函数式编程的基石，因为所有高阶抽象（高阶函数、柯里化、组合、Monad）都建立在「函数即值」的前提上。\n\nC# 支持这一点的语法特性：\n1. `Func<T, TResult>` 和 `Action<T>` 委托类型——函数有明确类型，可声明变量\n2. Lambda 表达式 `x => x * 2`——内联创建函数值\n3. 方法组转换 `Func<int, int> f = MyMethod`——命名方法自动转为委托\n4. LINQ——`Where`、`Select` 等方法接受函数参数，是函数式管道的直接体现\n\n没有一等函数，就无法把「过滤逻辑」「转换逻辑」作为参数传递，LINQ 的声明式管道就不可能存在。",
    tags: ["一等公民", "Func", "Lambda", "LINQ"],
  },
  {
    id: "cfp-learning-map-3",
    chapter: "cfp-learning-map",
    level: 3,
    question: "如果跳过「高阶函数」直接学「Monad与链式」，会遇到什么困难？请从知识依赖角度分析。",
    answer:
      "Monad 的核心操作是 `Bind`（也叫 `SelectMany`），它接受一个值和一个「接受值并返回包装值的函数」，本质是一个高阶函数。如果不理解高阶函数（函数作为参数、函数作为返回值），就无法理解 Monad 的类型签名。\n\n具体困难：\n1. `Result<T>` 的 `Bind` 签名是 `Result<U> Bind<T, U>(Result<T>, Func<T, Result<U>>)`——参数是一个返回 `Result` 的函数，不理解高阶函数就看不懂这个签名。\n2. 链式组合 `.Map(f).Bind(g).Map(h)` 中每一步都接受函数参数——这是高阶函数的直接应用。\n3. 柯里化和偏应用是高阶函数的特化形式，Monad 的「延迟绑定」与之同源。\n\n所以高阶函数是 Monad 的前置依赖，跳过它只能死记 API 调用，无法理解为什么这样设计。",
    tags: ["高阶函数", "Monad", "知识依赖", "Bind"],
  },
  {
    id: "cfp-learning-map-4",
    chapter: "cfp-learning-map",
    level: 4,
    question: "C# 不是纯函数式语言，为什么仍然值得系统学习函数式编程？请从范式迁移和工程价值两个维度综合分析。",
    answer:
      "C# 是多范式语言，可变性是默认，但函数式思维能显著提升代码质量。值得系统学习的理由：\n\n范式迁移维度：\n1. 数据建模：从可变 class 到不可变 record + with 表达式，减少共享状态导致的 bug\n2. 控制流：从 if-else 嵌套到 switch 表达式 + 模式匹配，控制流变成可组合的值表达式\n3. 错误处理：从 try-catch 到 Result/Option 类型，错误变成数据流而非控制流中断\n4. 数据处理：从手动循环到 LINQ 管道，声明式描述 what 而非 how\n\n工程价值维度：\n1. 可测试性：纯函数无副作用，测试只需验证输入输出，不需要 mock\n2. 并发安全：不可变数据天然线程安全，无需锁\n3. 可组合性：高阶函数和管道模式让小函数组合成复杂逻辑，降低耦合\n4. 可读性：声明式代码更接近业务意图，`nums.Where(x => x > 5).Select(x => x * 2)` 比 foreach 循环更易读\n\n边界：C# 不是 Haskell，不会强制纯函数。函数式是工具箱中的工具，按场景选择命令式或函数式。但掌握函数式思维后，你会更自然地写出更安全、更可组合的代码。",
    tags: ["范式迁移", "工程价值", "多范式", "可测试性"],
  },
];
