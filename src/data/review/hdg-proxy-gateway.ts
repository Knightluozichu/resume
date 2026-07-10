import { ReviewQuestion } from "./types";

export const hdgProxyGatewayQuestions: ReviewQuestion[] = [
  {
    id: "hdg-proxy-gateway-1",
    chapter: "hdg-proxy-gateway",
    level: 1,
    question: `代理和网关的区别是什么？`,
    answer:
      `代理两端使用相同协议（HTTP↔HTTP），代表客户端发起请求，对服务器透明。网关两端使用不同协议（HTTP↔FTP/SMTP），代表服务器接收请求，对客户端透明。代理用于转发/缓存/过滤，网关用于协议转换/资源映射。`,
    tags: ["代理", "网关", "协议转换"],
  },
  {
    id: "hdg-proxy-gateway-2",
    chapter: "hdg-proxy-gateway",
    level: 2,
    question: `正向代理和反向代理的区别是什么？各自适用于什么场景？`,
    answer:
      `正向代理部署在客户端侧，代表客户端，客户端知道代理存在，用于翻墙/过滤/匿名化。反向代理部署在服务器侧，代表服务器，客户端不知道代理存在，用于负载均衡/缓存/SSL终止。配置方式：正向代理需客户端配置代理地址，反向代理通过 DNS 指向。`,
    tags: ["正向代理", "反向代理", "部署"],
  },
  {
    id: "hdg-proxy-gateway-3",
    chapter: "hdg-proxy-gateway",
    level: 2,
    question: `隧道的作用是什么？为什么 HTTPS 需要 CONNECT 方法建立隧道？`,
    answer:
      `隧道根据 CONNECT 方法建立盲转发通路，代理不解析不修改数据。HTTPS 需要隧道因为 HTTPS 流量是加密的，HTTP 代理无法读取加密内容来转发。通过 CONNECT 建立隧道后，代理在 TCP 层面盲转发，TLS 握手和加密数据端到端传输，代理不接触加密层。`,
    tags: ["隧道", "CONNECT", "HTTPS", "盲转发"],
  },
  {
    id: "hdg-proxy-gateway-4",
    chapter: "hdg-proxy-gateway",
    level: 1,
    question: `什么是代理链？Via 首部的作用是什么？`,
    answer:
      `代理链是请求经过多个代理串联转发的拓扑（如 客户端→缓存代理→过滤代理→负载均衡代理→服务器）。Via 首部记录转发链路——每个代理在 Via 中追加自己的标识（协议版本+主机名），形成完整的转发路径记录，用于诊断和追踪。`,
    tags: ["代理链", "Via首部", "转发"],
  },
];
