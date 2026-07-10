import type { ReviewQuestion } from "./types";

export const hfjNetworkingQuestions: ReviewQuestion[] = [
  {
    id: "hfj-nw-1",
    chapter: "hfj-networking",
    level: 2,
    question: `TCP 和 UDP 的区别是什么？分别适用于什么场景？`,
    answer:
      `TCP（传输控制协议）：①面向连接——通信前三次握手建立连接；②可靠传输——保证数据到达、不丢失、不重复、按序到达，通过确认/重传机制实现；③流式传输——数据以字节流方式传输；④开销大——需要维护连接状态、确认包、拥塞控制；⑤一对一通信。\nUDP（用户数据报协议）：①无连接——直接发送，不建立连接；②不可靠——不保证到达，可能丢包/乱序/重复；③数据报传输——以独立消息为单位；④开销小——无确认/重传；⑤支持一对多/多播/广播。\nTCP 适用场景：需要可靠传输的应用——HTTP/HTTPS（网页）、FTP（文件传输）、SMTP（邮件）、SSH（远程登录）、聊天消息。\nUDP 适用场景：允许少量丢包但要求低延迟的应用——DNS（域名查询）、视频/音频流、在线游戏、VoIP（语音通话）。`,
    tags: ["TCP", "UDP", "协议对比"],
  },
  {
    id: "hfj-nw-2",
    chapter: "hfj-networking",
    level: 2,
    question: `Socket 和 ServerSocket 分别是什么？它们如何协作完成客户端-服务器通信？`,
    answer:
      `Socket：代表客户端的连接端点。客户端用 \`new Socket(\"IP\", port)\` 创建 Socket，同时完成两件事：①向指定 IP:port 的服务器发起 TCP 连接；②连接成功后获得输入输出流用于收发数据。\nServerSocket：代表服务器端的监听端点。服务器用 \`new ServerSocket(port)\` 创建，绑定端口开始监听。调用 \`accept()\` 方法会阻塞等待客户端连接，当有客户端连接时返回一个 Socket 对象，通过这个 Socket 与客户端通信。\n协作流程：①服务器 new ServerSocket(5000) 绑定端口；②服务器 accept() 阻塞等待；③客户端 new Socket(\"127.0.0.1\", 5000) 发起连接；④服务器 accept() 返回 Socket；⑤双方通过各自的 Socket 的 getInputStream/getOutputStream 读写数据；⑥通信完毕调用 close() 关闭连接。\n关键区别：Socket 是双向通信端点，ServerSocket 只负责接受连接（不直接收发数据），accept() 返回的才是通信用的 Socket。`,
    tags: ["Socket", "ServerSocket", "客户端服务器"],
  },
  {
    id: "hfj-nw-3",
    chapter: "hfj-networking",
    level: 3,
    question: `如何实现一个多线程服务器？为什么需要多线程？`,
    answer:
      `需要多线程的原因：单线程服务器在 accept() 返回后处理一个客户端时，无法 accept 其他客户端的连接，后续客户端被阻塞。多线程让主线程循环 accept，每个客户端交给独立线程处理，实现并发服务。\n实现代码：\n\`\`\`java\nServerSocket server = new ServerSocket(5000);\nwhile (true) {\n    Socket client = server.accept();\n    new Thread(() -> {\n        try {\n            InputStream in = client.getInputStream();\n            OutputStream out = client.getOutputStream();\n            // 处理请求和响应\n            client.close();\n        } catch (IOException e) {\n            e.printStackTrace();\n        }\n    }).start();\n}\n\`\`\`\n工作流程：①主线程 accept 等待客户端；②客户端连接后，主线程创建新线程处理该客户端；③主线程立即回到 accept 等待下一个客户端；④工作线程独立处理自己客户端的读写。每个客户端互不阻塞。\n局限性：每个客户端一个线程，连接数多时线程开销大。生产环境用线程池（ExecutorService）替代手动 new Thread。`,
    tags: ["多线程服务器", "并发", "accept"],
  },
  {
    id: "hfj-nw-4",
    chapter: "hfj-networking",
    level: 4,
    question: `Socket 通信中如何正确处理流关闭？为什么不能用 \`socket.close()\` 直接关闭？`,
    answer:
      `正确关闭方式：①先关闭输入输出流（in.close() / out.close()）；②再关闭 Socket（socket.close()）。实际上关闭流的任一个都会关闭 Socket，但显式关闭更清晰。更推荐用 try-with-resources（Java 7+）：\n\`\`\`java\ntry (Socket socket = new Socket(host, port);\n     InputStream in = socket.getInputStream();\n     OutputStream out = socket.getOutputStream()) {\n    // 读写数据\n} catch (IOException e) {\n    e.printStackTrace();\n}\n// 自动关闭: 先 out, 再 in, 再 socket\n\`\`\`\n不能只调 socket.close() 的原因：虽然 socket.close() 会关闭底层连接和流，但如果流有缓冲（如 BufferedReader/PrintWriter 包装的），缓冲区中的数据可能还没刷新到网络。正确做法是先 flush() 确保数据发出，再关闭。PrintWriter 的 close() 会自动 flush。\n注意事项：①关闭 Socket 后读写会抛 SocketException；②服务器端关闭 ServerSocket 停止接受新连接，但不影响已建立的连接；③网络异常（对端崩溃）不会自动通知，需要心跳机制检测。`,
    tags: ["Socket关闭", "流关闭", "try-with-resources"],
  },
];
