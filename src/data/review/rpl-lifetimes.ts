import type { ReviewQuestion } from "./types";

/** 生命周期 复习题 */
export const rplLifetimesQuestions: ReviewQuestion[] = [
  {
    id: "rpl-lifetimes-1",
    chapter: "rpl-lifetimes",
    level: 1,
    question: `什么是生命周期？解决什么问题？`,
    answer: `生命周期是编译器追踪引用有效范围的标注。解决悬空引用——确保引用不比被引用数据活得更久。函数返回引用时编译器需知道返回引用依赖哪个参数，保证返回值不在参数释放后变悬空。生命周期是编译期静态分析运行时零开销。`,
    tags: ["生命周期","悬空指针","引用","编译期"],
  },
  {
    id: "rpl-lifetimes-2",
    chapter: "rpl-lifetimes",
    level: 2,
    question: `生命周期标注 'a 的含义？它改变引用行为吗？`,
    answer: `'a 是生命周期参数表示某引用的生命周期。fn longest<'a>(x:&'a str,y:&'a str)->&'a str 表示 x y 返回值生命周期相同，返回引用不比 x y 中较短者活得更久。标注不改变运行时行为（不延长缩短），只告诉编译器引用关系让其验证安全性。编译器自动推断大多生命周期（elision）。`,
    tags: ["生命周期标注","生命周期参数","elision"],
  },
  {
    id: "rpl-lifetimes-3",
    chapter: "rpl-lifetimes",
    level: 3,
    question: `生命周期省略规则有哪三条？`,
    answer: `1.每个引用参数获自己的生命周期：fn foo(x:&str,y:&str) 变 fn foo<'a,'b>(x:&'a str,y:&'b str)。2.只有一个输入生命周期时赋给所有输出：fn foo(x:&str)->&str 变 fn foo<'a>(x:&'a str)->&'a str。3.多个输入但其中一个是 &self/&mut self 时 self 生命周期赋给所有输出（方法场景）。三规则后若能确定所有输出则省略成功否则需手动标注。`,
    tags: ["生命周期省略","elision","输入输出生命周期"],
  },
  {
    id: "rpl-lifetimes-4",
    chapter: "rpl-lifetimes",
    level: 4,
    question: `设计结构体持有引用为什么需要生命周期标注？有什么限制？`,
    answer: `struct Excerpt<'a>{part:&'a str} 表示 Excerpt 生命周期不超过 part 引用的数据。限制：1.实例化时 part 必须指向活得更久的数据。2.持有引用的结构体不方便移动和存储。3.需脱离约束可用 String（拥有数据）替代 &str 或用 Cow 兼顾。原则：优先用拥有数据的类型，只在性能关键且生命周期清晰时用引用字段。`,
    tags: ["结构体","生命周期","悬空引用","Cow"],
  }
];
