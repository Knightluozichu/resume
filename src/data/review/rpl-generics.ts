import type { ReviewQuestion } from "./types";

/** 泛型 复习题 */
export const rplGenericsQuestions: ReviewQuestion[] = [
  {
    id: "rpl-generics-1",
    chapter: "rpl-generics",
    level: 1,
    question: "Rust 泛型单态化是什么？与 Java 类型擦除区别？",
    answer: "单态化：编译器为每个具体泛型类型生成独立代码。max(1i32,2i32) 和 max(1.0,2.0) 生成两个版本。优点零运行时开销，缺点代码体积增大。Java 类型擦除：编译后泛型变 Object 运行时无类型信息。优点体积小，缺点基本类型需装箱、运行时无类型信息。",
    tags: ["泛型","单态化","类型擦除","零开销"],
  },
  {
    id: "rpl-generics-2",
    chapter: "rpl-generics",
    level: 2,
    question: "fn f<T:Clone+Debug>(x:T) 中 T 的约束是什么？为什么需要？",
    answer: "T:Clone+Debug 表示 T 必须同时实现 Clone 和 Debug。需要约束因为函数体对 T 的操作必须编译期可验证——调用 x.clone() 需确认 T 有 clone 方法（T:Clone）。没有约束编译器不知 T 有哪些方法拒绝编译。约束是编译器「能对 T 做什么」的契约。",
    tags: ["泛型","trait bound","约束","Clone"],
  },
  {
    id: "rpl-generics-3",
    chapter: "rpl-generics",
    level: 3,
    question: "关联类型和泛型参数区别？何时用关联类型？",
    answer: "泛型参数：trait Iterator<T>{fn next(&mut self)->Option<T>;} 一个类型可多次实现（impl Iterator<i32> 和 Iterator<String>）。关联类型：trait Iterator{type Item;fn next(&mut self)->Option<Self::Item>;} 一个类型只能实现一次。关联类型表示一对一关系，泛型参数表示多对一。选择：一种实现方式用关联类型，多种实现用泛型参数。",
    tags: ["关联类型","泛型参数","Iterator","trait"],
  },
  {
    id: "rpl-generics-4",
    chapter: "rpl-generics",
    level: 4,
    question: "实现泛型缓存结构，支持不同 key/value 且线程安全。",
    answer: "struct Cache<K,V>{map:Mutex<HashMap<K,V>>}。impl<K:Hash+Eq+Clone,V:Clone> Cache<K,V>{fn new()->Self{Cache{map:Mutex::new(HashMap::new())}} fn get(&self,key:&K)->Option<V>{self.map.lock().ok()?.get(key).cloned()} fn insert(&self,key:K,val:V){if let Ok(mut m)=self.map.lock(){m.insert(key,val)}}}。关键：K:Hash+Eq+Clone，V:Clone（get 返回克隆避免持锁），Mutex 保证线程安全，单态化为每种 K/V 生成代码。",
    tags: ["泛型","trait bound","线程安全","Mutex","缓存"],
  }
];
