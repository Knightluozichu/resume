import type { ReviewQuestion } from "./types";

/** Rust 网络编程 复习题 */
export const mrsNetworkingQuestions: ReviewQuestion[] = [
  {
    id: "mrs-networking-1",
    chapter: "mrs-networking",
    level: 1,
    question: "Rust 的 async 网络编程中，TCP 服务端的基本流程是什么？",
    answer: "五步流程：1) bind——TcpListener::bind(addr) 绑定地址端口；2) accept——listener.accept().await 异步等待连接，返回 (TcpStream, SocketAddr)；3) spawn——tokio::spawn(handle(conn)) 为每个连接创建独立 async 任务；4) read/write——conn.read(&mut buf).await 和 conn.write(&data).await 异步读写数据；5) close——TcpStream 离开作用域时 Drop 自动关闭连接。每个 .await 点是挂起/恢复点——不阻塞线程，运行时可在此期间处理其他连接。这就是十万级并发的实现方式。",
    tags: ["TCP", "async", "基础"],
  },
  {
    id: "mrs-networking-2",
    chapter: "mrs-networking",
    level: 2,
    question: "tokio 运行时的核心组件是什么？它如何实现高并发？",
    answer: "tokio 运行时核心组件：1) Reactor——基于操作系统的 IO 多路复用（epoll/kqueue/IOCP），监控所有 IO 事件，就绪时唤醒对应的 Future；2) Thread Pool——工作线程池，使用工作窃取（work-stealing）调度算法平衡负载；3) Task Scheduler——调度 async 任务，.await 挂起时让出线程执行其他任务，就绪时恢复。高并发原理：每个连接是一个 async 任务（几 KB 内存），.await 时任务挂起不占线程——一个线程可服务数千个连接。IO 事件由 Reactor 统一监控（而非每连接一个线程阻塞等待），就绪后调度到线程池执行。相比每连接一线程（每线程几 MB 栈），tokio 可在同等内存下支持数十倍并发。",
    tags: ["tokio", "运行时", "调度", "理解"],
  },
  {
    id: "mrs-networking-3",
    chapter: "mrs-networking",
    level: 3,
    question: "请用 Rust + tokio 编写一个 echo TCP 服务端，要求支持多客户端并发。",
    answer: "```rust\nuse tokio::io::{AsyncReadExt, AsyncWriteExt};\nuse tokio::net::TcpListener;\n\n#[tokio::main]\nasync fn main() -> Result<(), Box<dyn std::error::Error>> {\n    let listener = TcpListener::bind(\"127.0.0.1:8080\").await?;\n    println!(\"Echo server listening on :8080\");\n\n    loop {\n        let (mut socket, addr) = listener.accept().await?;\n        println!(\"Connection from {}\", addr);\n\n        // 每个连接 spawn 一个独立任务\n        tokio::spawn(async move {\n            let mut buf = [0u8; 1024];\n            loop {\n                match socket.read(&mut buf).await {\n                    Ok(0) => {\n                        println!(\"{} disconnected\", addr);\n                        return;\n                    }\n                    Ok(n) => {\n                        if socket.write_all(&buf[..n]).await.is_err() {\n                            return;\n                        }\n                    }\n                    Err(_) => return,\n                }\n            }\n        });\n    }\n}\n```\n\n要点：#[tokio::main] 启动运行时，accept().await 异步等待连接，spawn 为每个连接创建独立任务，read/write 都是 .await 异步操作。read 返回 Ok(0) 表示连接关闭。",
    tags: ["tokio", "echo服务", "AsyncReadExt", "代码编写"],
  },
  {
    id: "mrs-networking-4",
    chapter: "mrs-networking",
    level: 4,
    question: "在设计一个高性能 HTTP API 服务时，Rust 的 async 网络模型相比 Go 的 goroutine 和 Node.js 的事件循环有什么优劣？",
    answer: "Rust async vs Go goroutine vs Node.js 事件循环：1) Rust async——零成本状态机，无运行时调度器开销（tokio 是库非语言内置），任务极轻量（几 KB），无 GC 停顿。优势是极致性能和可预测延迟；劣势是 async 传染性强（async fn 调 async fn 都要 .await），学习曲线陡，生态不如 Go 成熟。2) Go goroutine——语言内置调度器，语法简单（go func()），栈可动态增长。优势是开发效率高、并发模型直观；劣势是 GC 停顿影响延迟，goroutine 调度有运行时开销，内存占用比 Rust 高。3) Node.js 事件循环——单线程 JS + libuv，回调/Promise 模型。优势是生态丰富、前端复用；劣势是单线程无法利用多核（需 cluster），JS 性能不如编译语言，CPU 密集任务阻塞事件循环。选择：极致性能和低延迟选 Rust（金融、游戏、基础设施），开发效率选 Go（微服务、API），全栈和生态选 Node.js。Rust 的 async 在连接数极多（10万+）且延迟敏感（亚毫秒级）的场景优势最明显。",
    tags: ["async对比", "goroutine", "事件循环", "综合"],
  },
];
