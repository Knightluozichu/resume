import type { ReviewQuestion } from "./types";

export const ctcDelegatesEventsQuestions: ReviewQuestion[] = [
  {
    id: "ctc-delegates-events-1",
    chapter: "ctc-delegates-events",
    level: 1,
    question: "委托的本质是什么？delegate void Handler(string msg) 定义了什么？",
    answer: "委托是类型安全的函数引用。delegate void Handler(string msg)定义了一个名为Handler的委托类型，其签名契约是：接受一个string参数、返回void。任何匹配该签名的方法都可以赋给Handler实例。委托继承自System.MulticastDelegate，支持多播（一个实例包含多个方法）和目标对象携带（实例方法的this）。",
    tags: ["委托", "签名契约", "MulticastDelegate"],
  },
  {
    id: "ctc-delegates-events-2",
    chapter: "ctc-delegates-events",
    level: 2,
    question: "event 关键字对委托字段做了什么封装？为什么有了 public 委托字段还需要 event？",
    answer: "event限制外部只能+=订阅和-=取消，不能=覆盖（防止清除其他订阅者）或直接Invoke（防止伪造事件触发）。只有声明类内部能Click?.Invoke()触发。public委托字段可以被外部=覆盖或直接调用，破坏发布-订阅语义。event本质是对委托字段的封装，类似property对字段的封装。编译后生成private委托字段+public add/remove方法。",
    tags: ["event", "封装", "发布订阅", "访问控制"],
  },
  {
    id: "ctc-delegates-events-3",
    chapter: "ctc-delegates-events",
    level: 3,
    question: "多播委托中一个处理器抛出异常会发生什么？如何安全地调用所有处理器而不被异常中断？",
    answer: "多播委托按顺序调用，如果某个处理器抛异常，后续处理器不会执行——异常直接传播给调用者。安全调用方法：用GetInvocationList()获取委托数组，逐个调用并用try-catch包裹每个处理器，隔离异常。这样即使某个处理器失败，其他处理器仍能执行，且异常被记录而非中断整个调用链。关键场景如事件通知必须用这种方式保证一个订阅者的bug不影响其他订阅者。",
    tags: ["多播委托", "异常隔离", "GetInvocationList"],
  },
  {
    id: "ctc-delegates-events-4",
    chapter: "ctc-delegates-events",
    level: 4,
    question: "Action<T>、Func<T,TResult>、Predicate<T> 三者有什么区别和联系？在设计 API 时如何选择？",
    answer: "Action<T>表示无返回值方法（void），Func<T,TResult>表示有返回值方法，Predicate<T>表示返回bool的方法——功能上等价于Func<T,bool>。联系：都是内置泛型委托，取代自定义delegate。选择：需要无返回值回调用Action，需要返回值用Func，需要条件判断可用Predicate但通常直接用Func<T,bool>（LINQ的Where接受Func<T,bool>而非Predicate<T>）。设计API时优先用Action/Func避免自定义委托，除非需要语义名称（如ClickHandler比Action<object,EventArgs>更有表达力）或需要out/ref参数。",
    tags: ["Action", "Func", "Predicate", "API设计", "内置委托"],
  },
];
