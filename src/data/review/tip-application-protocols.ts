import { ReviewQuestion } from "../types";

export const tipApplicationProtocolsQuestions: ReviewQuestion[] = [
  {
    id: "tip-application-protocols-1",
    chapter: "tip-application-protocols",
    level: 2,
    question: "DNS 的递归查询和迭代查询有什么区别？",
    answer:
      "递归查询：客户端向本地 DNS 服务器发出查询后，本地 DNS 服务器负责完成全部解析过程（代替客户端依次查询根→TLD→权威服务器），最终将结果返回给客户端。客户端只需一次请求。迭代查询：DNS 服务器收到查询后，如果不知道答案就返回「下一步该问谁」（如根服务器返回 TLD 服务器地址），由请求方自己继续向下一级服务器查询。实际中：客户端→本地DNS 是递归查询；本地DNS→根/TLD/权威 是迭代查询。",
    tags: ["DNS", "递归查询", "迭代查询"],
  },
  {
    id: "tip-application-protocols-2",
    chapter: "tip-application-protocols",
    level: 1,
    question: "HTTP 请求方法和状态码的分类是什么？",
    answer:
      "HTTP 方法：GET（获取资源）、POST（提交数据）、PUT（更新/创建资源）、DELETE（删除资源）、HEAD（只取头）、OPTIONS（查询服务器支持的方法）。状态码分类：2xx 成功（200 OK）、3xx 重定向（301 永久重定向、302 临时重定向、304 Not Modified）、4xx 客户端错误（400 Bad Request、401 未授权、403 禁止访问、404 Not Found）、5xx 服务端错误（500 Internal Server Error、502 Bad Gateway、503 Service Unavailable）。HTTP 是无状态协议，通过 Cookie/Session 维持会话。",
    tags: ["HTTP", "请求方法", "状态码"],
  },
  {
    id: "tip-application-protocols-3",
    chapter: "tip-application-protocols",
    level: 2,
    question: "SMTP 邮件传输的完整流程是什么？涉及哪些组件？",
    answer:
      "邮件传输流程：①发件人 MUA（邮件客户端）通过 SMTP 将邮件发到发件方 MTA（邮件服务器）②发件方 MTA 通过 SMTP 将邮件转发到收件方 MTA ③收件方 MTA 将邮件存入 MDA（邮件投递代理）④收件人 MUA 通过 POP3 或 IMAP 从 MDA 取回邮件。SMTP 命令：HELO/EHLO（问候）、MAIL FROM（发件人）、RCPT TO（收件人）、DATA（邮件正文）、QUIT。SMTP 用 TCP 可靠传输，端口 25/587。MIME 扩展支持附件和多媒体。",
    tags: ["SMTP", "邮件传输", "POP3", "IMAP"],
  },
  {
    id: "tip-application-protocols-4",
    chapter: "tip-application-protocols",
    level: 2,
    question: "FTP 的主动模式和被动模式有什么区别？为什么需要两种模式？",
    answer:
      "FTP 使用双连接：控制连接（端口 21）传命令，数据连接传文件。主动模式（PORT）：客户端通过控制连接告诉服务器「我在这个 IP:端口等你」，服务器从端口 20 主动连接客户端。问题：客户端在 NAT/防火墙后时，服务器无法主动连入。被动模式（PASV）：客户端发 PASV 命令，服务器回复「我在这个 IP:端口等你」，客户端主动连接服务器的随机端口。被动模式解决了客户端在 NAT 后的问题，是现代 FTP 的主流模式。",
    tags: ["FTP", "主动模式", "被动模式", "NAT"],
  },
];
