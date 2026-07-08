import type { ReviewQuestion } from "./types";

/** channel 复习题 */
export const gplChannelsQuestions: ReviewQuestion[] = [
  {
    id: "gpl-channels-1",
    chapter: "gpl-channels",
    level: 1,
    question: "channel 的发送接收语义？无缓冲和有缓冲区别？",
    answer: "发送 ch<-v 接收 v:=<-ch。无缓冲 make(chan int)：发送接收同步——发送方阻塞直到有接收方，接收方阻塞直到有发送方（rendezvous）。有缓冲 make(chan int,N)：缓冲满发送阻塞，空接收阻塞，未满未空不阻塞（异步）。无缓冲适合同步协调（信号），有缓冲适合解耦生产消费速率。",
    tags: ["channel","无缓冲","有缓冲","同步","异步"],
  },
  {
    id: "gpl-channels-2",
    chapter: "gpl-channels",
    level: 2,
    question: "channel 的关闭规则？向已关闭 channel 操作会怎样？",
    answer: "关闭 close(ch)。规则：1.向已关闭 channel 发送 panic（send on closed channel）。2.从已关闭 channel 接收不 panic 返回零值和 false（v,ok:=<-ch ok=false 表示关闭且缓冲空）。3.重复关闭 panic。4.只有发送方应关闭。遍历已关闭 channel：for v:=range ch{} 自动在关闭且缓冲空时退出。channel 关闭是为通知接收方「不会有更多数据」不是资源释放。",
    tags: ["channel","close","panic","零值"],
  },
  {
    id: "gpl-channels-3",
    chapter: "gpl-channels",
    level: 3,
    question: "select 语句如何实现多路复用？",
    answer: "select 同时监听多个 channel 操作选第一个就绪的执行。多个就绪随机选一个（避免饥饿）。都不就绪且无 default 则阻塞等待。有 default 则都不就绪时执行 default（非阻塞）。用法：1.多 channel 竞争：select{case v:=<-ch1:...;case ch2<-data:...;case<-time.After(timeout):return}。2.非阻塞：select{case v:=<-ch:...;default://没数据}。3.超时：case<-time.After(5*time.Second)。",
    tags: ["select","多路复用","随机","timeout","default"],
  },
  {
    id: "gpl-channels-4",
    chapter: "gpl-channels",
    level: 4,
    question: "用 channel 实现 Worker Pool 和 Fan-Out/Fan-In 模式。",
    answer: "Worker Pool：固定 n 个 worker 消费 jobs，for j:=range jobs{results<-j*2}，wg.Wait()后 close(results)。Fan-Out/Fan-In：一个 input 分发到 n 个 worker（outputs[i]=make(chan int)，每个 goroutine 从 input 竞争消费），结果汇聚到 merged（n 个 goroutine 各 range 一个 output 写入 merged，wg.Wait 后 close(merged)）。关键：Fan-Out 多 goroutine 读同一 input 竞争消费，Fan-In 多 goroutine 将多 channel 合并到一个。",
    tags: ["Worker Pool","Fan-Out","Fan-In","channel","WaitGroup"],
  }
];
