import type { ReviewQuestion } from "./types";

/** Effective C# 学习地图复习题 */
export const ecsLearningMapQuestions: ReviewQuestion[] = [
  {
    id: "ecs-learning-map-1",
    chapter: "ecs-learning-map",
    level: 1,
    question: "Effective C# 全书分为哪四大板块？各自要解决什么问题？",
    answer:
      "全书 50 条建议分为四大板块：\n\n1. 语言习惯（条款 1-12）：解决「怎么正确用 C#」——属性优先于字段、readonly 优于 const、is/as 优于强制转换。\n2. 资源管理（条款 13-25）：解决「资源怎么不泄漏」——IDisposable 标准模式、using 确定性释放。\n3. 泛型与 LINQ（条款 26-37）：解决「如何泛化和查询」——泛型约束最小化、LINQ 延迟执行。\n4. 并发设计（条款 38-50）：解决「如何安全地并发」——异常过滤器、Task.WhenAll、相等性协调。\n\n记忆线索：习惯奠基 → 资源管控 → 泛型抽象 → 并发收口。",
    tags: ["学习地图", "全书结构", "四大板块"],
  },
  {
    id: "ecs-learning-map-2",
    chapter: "ecs-learning-map",
    level: 2,
    question:
      "为什么 Bill Wagner 把「属性优先」放在全书第一条？这条建议奠定了什么地基？",
    answer:
      "属性是 C# 封装的基础单元。公共字段一旦发布就无法收回控制——无法加校验、无法虚拟化、无法数据绑定、无法参与接口契约。用属性替代字段，把存储细节藏在 get/set 后面，是后续所有面向对象建议（封装、接口、继承）的前提。\n\n它奠定的是「对外暴露契约、对内隐藏存储」的地基习惯。把它放第一条，是在确立「先用属性，字段永远是 private」的默认准则，后续条款（如 readonly、IDisposable、相等性）都建立在这个封装基础上。",
    tags: ["属性优先", "封装", "第一条", "设计哲学"],
  },
  {
    id: "ecs-learning-map-3",
    chapter: "ecs-learning-map",
    level: 3,
    question:
      "推荐的学习路径是什么？如果跳过语言习惯直接学并发设计会有什么问题？",
    answer:
      "推荐路径：语言习惯 → 资源管理 → 泛型与 LINQ → 并发设计 → 总复习。\n\n板块间是递进而非并列：习惯是地基、资源是安全网、泛型是骨架、并发是收口，后一块都以前一块为前提。\n\n跳过语言习惯直接学并发的问题：\n- 并发建立在对异常语义和类型的准确理解上，没有语言习惯地基就无法写出正确的异步代码。\n- 比如不理解异常重抛（裸 throw vs throw ex）就学 async，会写出异常处理混乱的异步方法。\n- 不理解相等性与 GetHashCode 一致性，并发集合里会出现「查不到相等键」的隐蔽 bug。\n- 语言习惯是后续所有板块的安全前提，跳过会让并发代码充满陷阱。",
    tags: ["学习路径", "推荐顺序", "递进", "并发设计"],
  },
  {
    id: "ecs-learning-map-4",
    chapter: "ecs-learning-map",
    level: 4,
    question:
      "贯穿 Effective C# 全书的主线是什么？50 条建议如何体现这条主线？",
    answer:
      "贯穿主线是「让类型系统替你兜底」——把人为容易犯的错误交给编译器和运行时，让正确的做法成为默认，让错误编译不通过。\n\n50 条建议各自让某件正确的事成为默认：\n- 属性让封装成为默认（字段永远 private）\n- readonly 让版本安全成为默认（跨程序集不烤入）\n- IDisposable 让释放成为默认（using 确定性释放）\n- 泛型约束让类型安全成为默认（编译期检查替代运行时强转）\n- LINQ 延迟执行让查询反映最新数据成为默认\n- 异常过滤器让精确 catch 成为默认（不丢栈）\n- Task.WhenAll 让并行成为默认（独立任务不排队）\n- 相等性协调让哈希正确成为默认\n\n每条建议都在「让正确成为默认、让错误编译不通过」。按「它让什么成为默认」归类记忆，50 条就不零散，而是一条主线下的统一哲学。这也是 Bill Wagner 整理经验的核心视角：编程经验不是背诵规则，而是建立让正确性自动发生的默认习惯。",
    tags: ["综合", "贯穿主线", "类型系统兜底", "设计哲学"],
  },
];
