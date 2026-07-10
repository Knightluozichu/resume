import type { ReviewQuestion } from "./types";

export const jctXmlNetworkQuestions: ReviewQuestion[] = [
  {
    id: "jct-xn-1",
    chapter: "jct-xml-network",
    level: 2,
    question: `DOM 和 SAX 解析 XML 的区别是什么？各适合什么场景？`,
    answer:
      `DOM（Document Object Model）：将整个 XML 文档解析为内存中的树结构（Document→Element→Node），可随机访问任意节点、修改内容、增删节点。优点：API 简单，可双向遍历和修改。缺点：整个文档加载到内存，大文件导致 OOM。核心 API：DocumentBuilder.parse()→Document，document.getElementsByTagName()→NodeList，element.getTextContent()。SAX（Simple API for XML）：事件驱动流式解析，从头到尾扫描 XML 文档，遇到开始标签/结束标签/文本时触发回调（startElement/endElement/characters）。优点：内存占用极小（不构建树），适合大文件。缺点：只读，不能修改；不能随机访问（只能顺序遍历）；需自己维护解析状态。使用场景：小文件且需修改用 DOM；大文件只读解析用 SAX；需要折中用 StAX（拉取式流解析，Cursor 模式，可按需读取）。StAX 是 JAXB 的底层解析方式。XML 也可用 XPath 查询：\`XPathFactory.newInstance().newXPath().evaluate(\"//book/title\", doc)\`。`,
    tags: ["XML", "DOM", "SAX"],
  },
  {
    id: "jct-xn-2",
    chapter: "jct-xml-network",
    level: 2,
    question: `TCP 和 UDP 的区别是什么？Java 中分别如何使用？`,
    answer:
      `TCP：面向连接，可靠传输。三次握手建立连接，四次挥手断开。保证数据不丢失、不重复、按序到达。有流量控制和拥塞控制。开销大，速度相对慢。Java 实现：ServerSocket + Socket。服务端：\`ServerSocket server = new ServerSocket(8080); Socket client = server.accept();\` 阻塞等待连接。客户端：\`Socket socket = new Socket(\"localhost\", 8080);\`。通信：通过 socket.getInputStream()/getOutputStream() 读写。UDP：无连接，不可靠传输。不保证送达、不保证顺序、可能丢包。开销小，速度快。Java 实现：DatagramSocket + DatagramPacket。发送：\`socket.send(new DatagramPacket(data, length, addr, port))\`。接收：\`socket.receive(packet)\` 阻塞等待。使用场景：TCP 用于文件传输、HTTP、邮件等需要可靠的场景；UDP 用于视频流、游戏、DNS 查询等容忍丢包但要求低延迟的场景。Java NIO 的 Selector 可以用单线程管理多个 TCP 连接（多路复用），适合高并发服务器。`,
    tags: ["TCP", "UDP", "Socket"],
  },
  {
    id: "jct-xn-3",
    chapter: "jct-xml-network",
    level: 3,
    question: `Java 11+ 的 HttpClient 相比传统 HttpURLConnection 有什么优势？`,
    answer:
      `HttpClient（Java 11+）优势：①API 现代化——Builder 模式构建请求，链式调用，比 HttpURLConnection 的繁琐 API 简洁得多；②HTTP/2 支持——原生支持 HTTP/2（多路复用、头部压缩、服务器推送），HttpURLConnection 只支持 HTTP/1.1；③异步支持——sendAsync() 返回 CompletableFuture，非阻塞异步请求，HttpURLConnection 只能同步阻塞；④连接池——内置连接池管理，复用 TCP 连接，HttpURLConnection 每次请求可能新建连接；⑤超时配置——connectTimeout、requestTimeout 分别配置，HttpURLConnection 超时配置不直观；⑥WebSocket 支持——HttpClient.newWebSocketBuilder() 创建 WebSocket 连接。使用示例：\`HttpClient client = HttpClient.newBuilder().version(HTTP_2).build(); HttpRequest req = HttpRequest.newBuilder().uri(URI.create(url)).GET().build(); HttpResponse<String> res = client.send(req, BodyHandlers.ofString());\`。异步：\`client.sendAsync(req, ofString()).thenApply(HttpResponse::body).thenAccept(System.out::println)\`。替代方案：Apache HttpClient、OkHttp 功能更丰富但需第三方依赖。`,
    tags: ["HttpClient", "HTTP/2", "异步"],
  },
  {
    id: "jct-xn-4",
    chapter: "jct-xml-network",
    level: 3,
    question: `Java 序列化的方式有哪些？现代开发推荐哪种？为什么？`,
    answer:
      `序列化方式：①Java 原生序列化——实现 Serializable 接口，用 ObjectOutputStream.writeObject() / ObjectInputStream.readObject()。优点：简单，支持对象图。缺点：不可跨语言，序列化体积大，有安全漏洞（反序列化 RCE），性能差。serialVersionUID 控制版本兼容，transient 排除字段。②JSON——Jackson/Gson 将对象转为 JSON 字符串。优点：跨语言，人类可读，生态丰富。缺点：丢失类型信息（反序列化需知道目标类型），无二进制效率。③XML——JAXB（javax.xml.bind）对象与 XML 互转。优点：标准化，可校验。缺点：冗长，性能差。④Protocol Buffers——Google 的二进制序列化。优点：跨语言，体积小，速度快，Schema 演进。缺点：需 .proto 定义和代码生成，不可读。⑤其他二进制——Avro（Hadoop 生态）、Thrift、MessagePack。现代推荐：①API/Web 服务用 JSON（Jackson）；②高性能 RPC 用 Protobuf/gRPC；③避免 Java 原生序列化（不安全、不跨语言）。Jackson 常用注解：@JsonProperty 重命名、@JsonIgnore 忽略、@JsonFormat 日期格式、@JsonCreator 指定反序列化构造器。`,
    tags: ["序列化", "JSON", "Protobuf"],
  },
];
