import type { ReviewQuestion } from "./types";

export const ilhHttpBasicsQuestions: ReviewQuestion[] = [
  {
    id: "ilh-hb-1",
    chapter: "ilh-http-basics",
    level: 1,
    question: `TCP/IP协议栈分为哪四层？HTTP运行在哪一层？`,
    answer: `TCP/IP协议栈分为四层：①应用层（HTTP/FTP/DNS，为应用提供特定服务）②传输层（TCP/UDP，提供端到端数据传输）③网络层（IP/ICMP，负责路由选择和地址寻址）④数据链路层（以太网/Wi-Fi，处理硬件层面帧传输）。HTTP运行在应用层，依赖传输层的TCP提供可靠传输。`,
    tags: ["TCP/IP", "协议栈", "分层"],
  },
  {
    id: "ilh-hb-2",
    chapter: "ilh-http-basics",
    level: 1,
    question: `URI和URL有什么区别？HTTP请求报文的结构是什么？`,
    answer: `URI（统一资源标识符）是标识资源的字符串统称，包含URL和URN。URL（统一资源定位符）是URI的子集，不仅标识资源还指明如何访问（协议+主机+端口+路径+查询+片段）。HTTP请求报文结构：①请求行（方法 URI 版本，如GET /index.html HTTP/1.1）②请求首部（Host/Accept等键值对）③空行（分隔首部和主体）④请求主体（可选，GET通常无）。`,
    tags: ["URI", "URL", "报文结构"],
  },
  {
    id: "ilh-hb-3",
    chapter: "ilh-http-basics",
    level: 2,
    question: `为什么HTTP选择TCP而不是UDP？TCP三次握手是什么？`,
    answer: `HTTP选择TCP而非UDP是因为HTTP需要可靠的数据传输——网页HTML不能丢字节。TCP通过三次握手建立连接、序列号保证顺序、确认重传保证可靠性。三次握手：①客户端发送SYN（我想连接）②服务器回复SYN+ACK（同意，我也想连接）③客户端发送ACK（确认），之后开始传输HTTP数据。`,
    tags: ["TCP", "UDP", "三次握手", "可靠性"],
  },
  {
    id: "ilh-hb-4",
    chapter: "ilh-http-basics",
    level: 2,
    question: `HTTP/1.1的持久连接和管道化是什么？有什么问题？`,
    answer: `持久连接（Keep-Alive）是HTTP/1.1默认开启的机制，允许在一个TCP连接上发送多个HTTP请求/响应，避免每次请求都重新建立TCP连接的开销。管道化是客户端可以连续发送多个请求而不必等待每个响应。但浏览器普遍默认关闭管道化，因为存在队头阻塞问题——前一个响应慢会阻塞后续响应。HTTP/2的多路复用才真正解决了这个问题。`,
    tags: ["持久连接", "管道化", "队头阻塞", "HTTP1.1"],
  },
];
