import type { ReviewQuestion } from "./types";

export const lkeNetworkStackQuestions: ReviewQuestion[] = [
  {
    id: "lke-ns-1",
    chapter: "lke-network-stack",
    level: 2,
    question: `sk_buff的设计为什么能实现零拷贝？各层如何处理协议头？`,
    answer:
      `sk_buff内部有四个关键指针：head（数据区起始）、data（有效数据起始）、tail（有效数据结束）、end（数据区结束）。接收时从底层往上「剥头」：每经过一层，data指针后移跳过该层头（如IP层处理后data后移20字节跳过IP头），不需要拷贝数据。发送时从顶层往下「加头」：每经过一层，data指针前移腾出空间写入该层头（如IP层在数据前加20字节IP头），tail指针可能后移追加尾部。整个收发过程中用户数据在sk_buff数据区位置不变，只有data/tail指针在移动——实现各层间零拷贝传递。alloc_skb时预留足够headroom和tailroom给各层头使用。`,
    tags: ["网络栈", "sk_buff"],
  },
  {
    id: "lke-ns-2",
    chapter: "lke-network-stack",
    level: 2,
    question: `NAPI相比传统中断驱动收包有什么优势？工作原理是什么？`,
    answer:
      `传统方式每个数据包到达都触发硬中断，高速流量下中断风暴导致CPU大部分时间在处理中断而非数据。NAPI采用「中断+轮询」混合模式：①网卡收到第一个包触发硬中断，中断处理函数关闭网卡硬中断并调度NAPI轮询（napi_schedule）；②NET_RX_SOFTIRQ软中断中napi_poll循环从网卡环形缓冲区取包，每次最多取budget个（默认300）；③包取空则重新开启硬中断回到中断模式；④预算用完但还有包则不开中断，留到下次softirq继续轮询。三大优势：①高吞吐时一次轮询处理多个包，中断开销摊薄到每包极低；②低吞吐时第一个包仍有中断通知，延迟不退化；③轮询时关中断防止中断风暴。现代高速网卡（10G/40G/100G）几乎都用NAPI。`,
    tags: ["网络栈", "NAPI"],
  },
  {
    id: "lke-ns-3",
    chapter: "lke-network-stack",
    level: 3,
    question: `Netfilter的5个钩子点分别在协议栈的什么位置？iptables的四表五链如何映射？`,
    answer:
      `5个钩子点：①NF_INET_PRE_ROUTING——数据包进入协议栈后、路由查找前（入站）；②NF_INET_LOCAL_IN——路由判断为本机接收后、上送传输层前；③NF_INET_FORWARD——路由判断为转发时（非本机）；④NF_INET_LOCAL_OUT——本机产生的数据包、路由查找前；⑤NF_INET_POST_ROUTING——数据包即将离开协议栈送入链路层前（出站/转发）。iptables五链一一对应五个钩子：PREROUTING/INPUT/FORWARD/OUTPUT/POSTROUTING。四表按优先级从高到低：raw（跳过连接跟踪）、mangle（修改TOS/TTL等字段）、nat（SNAT/DNAT地址转换）、filter（ACCEPT/DROP过滤）。conntrack连接跟踪维护每条流的状态（NEW/ESTABLISHED/RELATED/INVALID），NAT依赖conntrack判断回程流量并还原地址。`,
    tags: ["网络栈", "Netfilter"],
  },
  {
    id: "lke-ns-4",
    chapter: "lke-network-stack",
    level: 3,
    question: `网络收包为什么是异步的？从网卡到用户空间经历了哪些步骤？`,
    answer:
      `网络收包完全异步：用户调用recv()时如果socket接收队列没有数据，进程被挂到等待队列上睡眠（sk_wait_data）。数据到达后经历：①网卡收到数据包→DMA写入预分配的环形缓冲区→硬中断；②硬中断关闭网卡中断→napi_schedule调度NAPI；③NET_RX_SOFTIRQ软中断中napi_poll从环形缓冲区取包→构造sk_buff；④netif_receive_skb上送协议栈→eth_type_trans设置协议号→ip_rcv加IP处理→NF_INET_PRE_ROUTING→路由判断→ip_local_deliver→NF_INET_LOCAL_IN→tcp_v4_rcv/udp_rcv；⑤传输层找到对应socket→放入socket接收队列→唤醒等待的recv()进程；⑥进程被CFS调度器调度后→copy_to_user从socket缓冲区拷贝到用户空间。整个过程跨越中断上下文和进程上下文，数据至少经历DMA到内核内存→协议栈处理→copy_to_user三次拷贝。`,
    tags: ["网络栈", "收包路径"],
  },
];
