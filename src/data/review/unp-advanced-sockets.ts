import { ReviewQuestion } from "./types";

export const unpAdvancedSocketsQuestions: ReviewQuestion[] = [
  {
    id: "unp-advanced-sockets-1",
    chapter: "unp-advanced-sockets",
    level: 1,
    question: `getsockopt 和 setsockopt 函数的参数含义是什么？level 参数有哪些取值？`,
    answer:
      `getsockopt(fd, level, optname, optval, optlen) 和 setsockopt(fd, level, optname, optval, optlen)。fd 是套接字描述符，level 指定选项层次，optname 是选项名，optval 是选项值的缓冲区，optlen 是值长度。level 有三个取值：SOL_SOCKET（通用套接字层）、IPPROTO_IP（IP 层）、IPPROTO_TCP（TCP 层）。不同 level 下有不同的 optname 可用。`,
    tags: ["getsockopt", "setsockopt", "套接字选项"],
  },
  {
    id: "unp-advanced-sockets-2",
    chapter: "unp-advanced-sockets",
    level: 2,
    question: `SO_REUSEADDR 选项的作用是什么？在什么场景下必须使用？`,
    answer:
      `SO_REUSEADDR 允许套接字绑定到一个处于 TIME_WAIT 状态的地址端口。场景：服务端重启时，之前的连接可能还在 TIME_WAIT（持续 2MSL），不设此选项则 bind 失败报 EADDRINUSE。设了 SO_REUSEADDR 后 bind 成功，服务端可以立即重启。注意：它不允许两个活跃套接字同时绑定同一端口（那是 SO_REUSEPORT 的功能），只允许绑定 TIME_WAIT 状态的端口。`,
    tags: ["SO_REUSEADDR", "TIME_WAIT", "服务端重启"],
  },
  {
    id: "unp-advanced-sockets-3",
    chapter: "unp-advanced-sockets",
    level: 2,
    question: `TCP_NODELAY 选项的作用是什么？Nagle 算法的优缺点是什么？`,
    answer:
      `TCP_NODELAY 禁用 Nagle 算法。Nagle 算法：当有未确认的小包在途时，暂缓发送新的小包，等收到 ACK 或积攒到 MSS 再发。优点：减少网络上小包数量，提高带宽利用率。缺点：增加延迟——对于交互式应用（如 SSH、游戏），小请求需要等前一个 ACK 才能发出。设 TCP_NODELAY 禁用 Nagle 可降低延迟，适合交互式场景，代价是小包增多。`,
    tags: ["TCP_NODELAY", "Nagle算法", "延迟优化"],
  },
  {
    id: "unp-advanced-sockets-4",
    chapter: "unp-advanced-sockets",
    level: 3,
    question: `SO_KEEPALIVE 和 TCP_KEEPIDLE/TCP_KEEPINTVL/TCP_KEEPCNT 三个选项如何配合使用？`,
    answer:
      `SO_KEEPALIVE 开启 TCP 保活机制：连接空闲一段时间后，内核发送保活探测包检测对端是否存活。TCP_KEEPIDLE 设置空闲多久后开始探测（默认 7200 秒），TCP_KEEPINTVL 设置每次探测间隔（默认 75 秒），TCP_KEEPCNT 设置探测失败几次后判定连接死亡（默认 9 次）。配合使用可在对端崩溃（非正常关闭）时检测死连接并释放资源，避免服务端永久挂住。`,
    tags: ["SO_KEEPALIVE", "保活探测", "TCP选项"],
  },
];
