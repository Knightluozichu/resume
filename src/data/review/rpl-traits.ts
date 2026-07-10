import type { ReviewQuestion } from "./types";

/** trait 与多态 复习题 */
export const rplTraitsQuestions: ReviewQuestion[] = [
  {
    id: "rpl-traits-1",
    chapter: "rpl-traits",
    level: 1,
    question: `Rust trait 是什么？与其他语言接口有何区别？`,
    answer: `trait 定义方法签名，类型通过 impl Trait for Type 实现。区别：1.可有默认方法实现。2.可有关联类型和常量。3.实现可泛型(impl<T:Clone> Trait for Vec<T>)。4.支持 trait object（动态分发）和泛型 bound（静态分发）。5.孤儿规则——只能在定义 trait 或类型的 crate 中 impl。`,
    tags: ["trait","接口","多态","孤儿规则"],
  },
  {
    id: "rpl-traits-2",
    chapter: "rpl-traits",
    level: 2,
    question: `静态分发和动态分发有什么区别？`,
    answer: `静态分发：fn print<T:Display>(x:T) 编译器为每种类型生成一份代码（单态化），调用直接跳转零开销但代码体积增大。动态分发：fn print(x:&dyn Display) 通过 vtable 运行时查找有一次间接跳转开销代码体积小。选择：性能关键用泛型，需存入同一集合(Vec<Box<dyn Trait>>)或跨 ABI 用 dyn。`,
    tags: ["静态分发","动态分发","单态化","vtable"],
  },
  {
    id: "rpl-traits-3",
    chapter: "rpl-traits",
    level: 3,
    question: `trait bound 的多种写法？何时用哪种？`,
    answer: `1.单个 bound：fn f<T:Clone>(x:T)。2.多个用 +：fn f<T:Clone+Debug>(x:T)。3.where 子句（复杂清晰）：fn f<T,U>(x:T,y:U) where T:Clone+Debug,U:Display。4.impl Trait 语法：fn f(x:impl Clone+Debug) 等价泛型。5.关联类型 bound：fn f<T:Iterator>(x:T) where T::Item:Display。选择：简单用 impl Trait，复杂多用 where。`,
    tags: ["trait bound","where","impl Trait","泛型"],
  },
  {
    id: "rpl-traits-4",
    chapter: "rpl-traits",
    level: 4,
    question: `如何为外部类型实现自己的 trait？孤儿规则如何影响？`,
    answer: `孤儿规则：只有 trait 或类型至少一个在当前 crate 定义时才能 impl。为外部类型实现自己的 trait：定义 trait MyTrait，impl MyTrait for Vec<i32>（Vec 外部 MyTrait 自己合法）。为外部类型实现外部 trait 不合法，需用 newtype 模式：struct MyVec(Vec<i32>); impl Display for MyVec{}——包装一层自己的类型绕过。`,
    tags: ["孤儿规则","newtype","trait实现","impl"],
  }
];
