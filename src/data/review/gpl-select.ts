import type { ReviewQuestion } from "./types";

/** select 复习题 */
export const gplSelectQuestions: ReviewQuestion[] = [
  {
    id: "gpl-select-1",
    chapter: "gpl-select",
    level: 1,
    question: "select 中 default 分支的作用？",
    answer: "default 在所有 case 都不就绪时执行使 select 不阻塞。用途：1.非阻塞接收：select{case v:=<-ch:handle(v);default://没数据继续}。2.非阻塞发送：select{case ch<-v://成功;default://满丢弃}。3.实现超时检查。没有 default 的 select 所有 case 不就绪时永远阻塞。default 让 select 成为非阻塞多路复用器。",
    tags: ["select","default","非阻塞","多路复用"],
  },
  {
    id: "gpl-select-2",
    chapter: "gpl-select",
    level: 2,
    question: "如何用 select+time.After 实现超时控制？",
    answer: "select{case result:=<-ch://正常;case<-time.After(5*time.Second)://超时}。time.After(d) 返回 channel d 时间后发送当前时间。select 监听 ch 和超时 channel 哪个先就绪执行哪个。注意每次 time.After 创建新 timer 循环中频繁执行应复用 timer（time.NewTimer+Reset）避免 GC 压力。context.WithTimeout 更推荐（支持取消传播）。",
    tags: ["select","time.After","超时","timer"],
  },
  {
    id: "gpl-select-3",
    chapter: "gpl-select",
    level: 3,
    question: "nil channel 在 select 中的行为？有什么用途？",
    answer: "nil channel 发送接收永远阻塞。在 select 中 nil channel 的 case 永远不会被选中（永远不就绪）相当于禁用该 case。用途：动态启用/禁用 select 分支。var ch chan int=nil;select{case v:=<-ch:...;case<-done:return}——ch 为 nil 时第一个 case 禁用只等 done。需要启用时 ch=realChannel 禁用时 ch=nil。不需重启 goroutine 就能动态改变 select 监听的 channel。",
    tags: ["nil channel","select","动态禁用","高级技巧"],
  },
  {
    id: "gpl-select-4",
    chapter: "gpl-select",
    level: 4,
    question: "用 select 实现带优先级的 channel 合并器（优先处理高优先级 channel）。",
    answer: "Go select 不直接支持优先级（多 case 就绪随机选）。模拟方式嵌套 select 先检查高优先级：外层 select{case v:=<-high://优先;default://high 没数据时进入内层 select{case v:=<-high://再次检查;case v:=<-low://低优先级}}。外层非阻塞检查 high（有 default）有数据处理无数据进内层阻塞等 high 或 low。内层先列 high case 防止 low 抢占。channel 关闭后设为 nil 禁用该 case。",
    tags: ["select","优先级","nil channel","合并"],
  }
];
