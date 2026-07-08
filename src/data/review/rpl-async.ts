import type { ReviewQuestion } from "./types";

/** async 与 await 复习题 */
export const rplAsyncQuestions: ReviewQuestion[] = [
  {
    id: "rpl-async-1",
    chapter: "rpl-async",
    level: 1,
    question: "Rust async/await 与 Go goroutine 本质区别？",
    answer: "Rust async/await 是编译期状态机转换——async fn 编译为实现 Future 的状态机，await 是暂停/恢复点。Future 不自动执行需 runtime 轮询。零运行时开销栈空间小。Go goroutine 是运行时调度的轻量线程——有独立栈（2KB 可增长），go 创建后自动调度。有 runtime 开销但编程模型更简单。核心：Rust 协作式（需 await 让出），Go 抢占式。",
    tags: ["async","await","goroutine","Future","runtime"],
  },
  {
    id: "rpl-async-2",
    chapter: "rpl-async",
    level: 2,
    question: "Future trait 的 poll 方法什么意思？为什么需要 runtime？",
    answer: "trait Future{fn poll(self:Pin<&mut Self>,cx:&mut Context)->Poll<Output>}。poll 尝试推进执行：Ready(result) 完成，Pending 未完成需等待。Pending 时通过 cx.waker() 注册 Waker，条件满足时 Waker.wake() 通知 runtime 重新 poll。需 runtime 因 Future 是惰性的——创建不执行任何代码，必须有人 poll 推进。Runtime 维护任务队列和 IO 事件循环不断 poll。",
    tags: ["Future","poll","Waker","runtime","tokio"],
  },
  {
    id: "rpl-async-3",
    chapter: "rpl-async",
    level: 3,
    question: "async fn 编译后的状态机是什么样？await 点如何工作？",
    answer: "async fn foo(){let a=step1().await;let b=step2(a).await;b} 编译为实现 Future 的状态机 enum：Start、AwaitingStep1(Step1Fut)、AwaitingStep2(Step2Fut,A)、Done。poll 根据状态推进：Start→创建 Step1Fut；AwaitingStep1→poll Step1Fut Ready 时取 a 创建 Step2Fut；AwaitingStep2→poll Step2Fut Ready 返回 b。每个 await 对应一个状态转换点，状态机保存跨 await 的局部变量。",
    tags: ["状态机","async","await","Future","编译"],
  },
  {
    id: "rpl-async-4",
    chapter: "rpl-async",
    level: 4,
    question: "如何选择 async runtime？设计 TCP 服务器+定时任务的异步程序。",
    answer: "选择 tokio（最主流）。#[tokio::main] async fn main(){tokio::join!(server_task(),timer_task())}。server_task：TcpListener::bind().await，loop{let(mut socket,_)=listener.accept().await;tokio::spawn(async move{handle(&mut socket).await});}。timer_task：let mut interval=tokio::time::interval(Duration::from_secs(60));loop{interval.tick().await;cleanup().await;}。关键：spawn 每连接一个 task，join! 并发运行，所有 IO 用 .await 非阻塞，共享状态用 tokio::sync::Mutex。",
    tags: ["tokio","async","runtime","spawn","TCP"],
  }
];
