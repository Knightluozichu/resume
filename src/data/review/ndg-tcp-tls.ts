import type { ReviewQuestion } from "./types";

export const ndgTcpTlsQuestions: ReviewQuestion[] = [
  {
    id: "ndg-tcp-tls-1",
    chapter: "ndg-tcp-tls",
    level: 2,
    question: "用 net 模块创建 TCP 服务器和客户端的基本流程是什么？socket 是什么类型的流？",
    answer:
      "服务器：net.createServer(socket => { socket.on('data', data => ...); socket.write('response'); socket.on('end', ...) }) → server.listen(port)。客户端：const socket = net.connect(port, host, () => { socket.write('request'); }) → socket.on('data', data => ...)。socket 是 net.Socket 实例，继承自 Duplex 流——同时可读（接收数据）可写（发送数据），读写独立缓冲。这就是为什么 TCP 通信是全双工的——两端可以同时收发。socket 事件：'data'（收到数据）、'end'（对端关闭写入）、'close'（连接完全关闭）、'error'（出错）、'drain'（写缓冲排空）。注意：TCP 是流式协议（没有消息边界），多次 write 可能合并为一个 data 事件，一个 write 也可能拆成多个 data——需要在应用层自己实现消息分包（如用 \\n 分隔或长度前缀）。",
    tags: ["net", "TCP", "socket", "Duplex"],
  },
  {
    id: "ndg-tcp-tls-2",
    chapter: "ndg-tcp-tls",
    level: 3,
    question: "TCP 为什么需要三次握手？两次不行吗？",
    answer:
      "三次握手目的：双方确认彼此的收发能力正常，同步初始序列号（ISN），防止历史无效连接。①客户端发 SYN seq=x——服务端确认客户端能发；②服务端回 SYN+ACK seq=y ack=x+1——客户端确认服务端能收能发；③客户端发 ACK ack=y+1——服务端确认客户端能收。两次不行：如果只有两次（客户端 SYN → 服务端 SYN+ACK 就建立），服务端无法确认客户端的接收能力正常——万一客户端的 SYN 是历史延迟到达的无效包，服务端直接建立连接浪费资源（历史连接问题）。三次握手中客户端收到 SYN+ACK 后可以判断这个连接是否有效（如果是历史包客户端会发 RST 而非 ACK）。此外序列号同步需要一来一回各确认一次，刚好三次。",
    tags: ["TCP", "三次握手", "序列号"],
  },
  {
    id: "ndg-tcp-tls-3",
    chapter: "ndg-tcp-tls",
    level: 3,
    question: "TLS 握手过程是怎样的？为什么用非对称加密协商密钥后切换到对称加密？",
    answer:
      "①ClientHello：客户端发送支持的密码套件列表和客户端随机数；②ServerHello：服务端选定密码套件，发送服务端随机数 + 证书（含公钥）；③客户端验证证书链（根 CA → 中间 CA → 服务器证书），用服务端公钥加密预主密钥（premaster secret）发送；④双方用客户端随机数 + 服务端随机数 + premaster 派生出相同的会话密钥；⑤Finished：双方用会话密钥加密发送验证消息，之后所有应用数据都用对称密钥加密。为什么混用：非对称加密（RSA/ECDHE）计算极慢但无需预共享密钥，适合安全协商；对称加密（AES/ChaCha20）速度快百倍但双方需共享密钥。所以用非对称安全地协商出对称密钥，之后用对称高速传输——兼顾安全与性能。ECDHE 还提供前向安全性（私钥泄漏不影响旧会话）。",
    tags: ["TLS", "握手", "非对称加密", "对称加密", "证书"],
  },
  {
    id: "ndg-tcp-tls-4",
    chapter: "ndg-tcp-tls",
    level: 4,
    question: "在 Node.js 中如何创建 HTTPS 服务器？证书链验证失败的常见原因有哪些？",
    answer:
      "创建 HTTPS 服务器：const options = { key: fs.readFileSync('private.key'), cert: fs.readFileSync('cert.pem') }; https.createServer(options, handler).listen(443)。如果证书是自签名的或缺少中间证书，客户端会拒绝连接。证书链验证失败常见原因：①缺少中间证书——证书文件需包含完整链（服务器证书 + 中间 CA 证书拼接，或用 ca 选项指定）；②域名不匹配——证书 CN/SAN 与访问域名不符；③证书过期——需续签；④自签名证书——开发环境可用 NODE_TLS_REJECT_UNAUTHORIZED=0 或 rejectUnauthorized: false 跳过（生产绝不安全）；⑤系统 CA 证书库过期——旧系统不信任新签发的证书。客户端用 tls.connect 时可指定 ca: [cert] 信任自定义 CA。调试用 openssl s_client -connect host:443 查看握手详情。",
    tags: ["HTTPS", "证书链", "tls.createServer", "调试"],
  },
];
