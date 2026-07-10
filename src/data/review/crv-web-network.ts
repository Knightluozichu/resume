import type { ReviewQuestion } from "./types";

export const crvWebNetworkQuestions: ReviewQuestion[] = [
  {
    id: "crv-web-network-01",
    chapter: "crv-web-network",
    level: 1,
    question: `浏览器从输入 URL 到页面呈现经历哪些步骤？`,
    answer: `完整流程：① DNS 解析——将域名解析为 IP 地址；② 建立 TCP 连接——三次握手；③ 发送 HTTP 请求——请求行+请求头+请求体；④ 服务器处理——路由分发、业务逻辑、数据库查询；⑤ 返回 HTTP 响应——状态码+响应头+响应体；⑥ 浏览器渲染——解析 HTML 构建 DOM 树、加载 CSS/JS、布局绘制、页面呈现。`,
    tags: ["HTTP", "请求流程", "DNS", "浏览器渲染"],
  },
  {
    id: "crv-web-network-02",
    chapter: "crv-web-network",
    level: 1,
    question: `TCP/IP 四层模型各层的职责是什么？`,
    answer: `TCP/IP 四层模型：① 应用层（HTTP/HTTPS/DNS/FTP）——负责应用间通信，处理应用层协议；② 传输层（TCP/UDP）——端到端数据传输，TCP 提供可靠传输，UDP 提供快速传输；③ 网络层（IP/ICMP）——跨网络数据包传输，负责路由和寻址；④ 链路层（以太网/ARP）——物理帧传输，处理硬件层面的数据帧。数据发送时从上到下逐层封装，接收时从下到上逐层解封装。`,
    tags: ["TCP/IP", "网络模型", "分层架构"],
  },
  {
    id: "crv-web-network-03",
    chapter: "crv-web-network",
    level: 2,
    question: `TCP 三次握手的过程是什么？为什么需要三次而非两次？`,
    answer: `三次握手过程：① SYN——客户端发送 SYN 报文发起连接，携带客户端初始序号；② SYN+ACK——服务器收到后回复 SYN+ACK，确认客户端序号并发送自己的序号；③ ACK——客户端收到后回复 ACK 确认，连接建立。需要三次而非两次的原因：双方都需要确认对方的发送和接收能力正常。如果是两次握手，服务器发出 SYN+ACK 后就认为连接建立，但如果这个报文丢失，客户端未收到就无法建立连接，而服务器却分配了资源等待，造成资源浪费。第三次握手确保双方都确认了对方的收发能力。`,
    tags: ["TCP", "三次握手", "连接建立"],
  },
  {
    id: "crv-web-network-04",
    chapter: "crv-web-network",
    level: 2,
    question: `TCP 和 UDP 各适用于什么场景？为什么？`,
    answer: `TCP 适用于对可靠性要求高的场景：网页（HTTP）、邮件（SMTP）、文件传输（FTP）——因为这些场景不能容忍数据丢失或乱序，TCP 的确认重传、序号排序、流量控制和拥塞控制保障了可靠传输。UDP 适用于对实时性要求高、能容忍少量丢包的场景：视频直播、在线游戏、DNS 查询——因为这些场景需要低延迟，TCP 的重传和拥塞控制会增加延迟，而 UDP 无连接、不保证可靠但速度快。选择依据：可靠性优先选 TCP，实时性优先选 UDP。`,
    tags: ["TCP", "UDP", "可靠性", "实时性"],
  },
];
