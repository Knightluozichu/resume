import type { ReviewQuestion } from "./types";

export const jctIoStreamsQuestions: ReviewQuestion[] = [
  {
    id: "jct-io-1",
    chapter: "jct-io-streams",
    level: 2,
    question: `Java 中字节流和字符流有什么区别？什么时候用哪个？`,
    answer:
      `字节流（InputStream/OutputStream）：以字节为单位读写，处理原始二进制数据。核心类：FileInputStream/FileOutputStream、BufferedInputStream/BufferedOutputStream。字符流（Reader/Writer）：以字符为单位读写，处理文本数据，自动处理字符编码。核心类：FileReader/FileWriter、BufferedReader/PrintWriter。区别：①单位不同——字节流读写 byte（0~255），字符流读写 char（使用指定编码如 UTF-8 解码）；②编码——字符流内部有编码转换，字节流无。使用场景：二进制文件（图片、视频、PDF）用字节流；文本文件（txt、csv、html）用字符流。桥接：InputStreamReader 将字节流包装为字符流——\`new BufferedReader(new InputStreamReader(new FileInputStream(\"f.txt\"), StandardCharsets.UTF_8))\`。最佳实践：始终用 BufferedReader/BufferedInputStream 包装，缓冲区减少 IO 次数提升性能。Java 7+ 推荐 Files.readString() / Files.readAllLines() 一行搞定。`,
    tags: ["字节流", "字符流", "编码"],
  },
  {
    id: "jct-io-2",
    chapter: "jct-io-streams",
    level: 2,
    question: `try-with-resources 的原理和使用方式是什么？它解决了什么问题？`,
    answer:
      `try-with-resources 是 Java 7+ 的语法糖，自动关闭实现了 AutoCloseable 接口的资源。语法：\`try (var in = new BufferedReader(new FileReader(\"f.txt\"))) { ... }\`。原理：编译器自动在 try 块结束后调用 in.close()，即使发生异常也会关闭。资源关闭顺序是声明的逆序（后声明的先关闭）。解决的问题：①资源泄漏——忘记在 finally 中 close() 导致文件句柄/数据库连接泄漏；②代码冗余——finally 中 close() 需要 null 检查和 try-catch；③异常掩盖——finally 中的异常会覆盖 try 中的原始异常，try-with-resources 中 try 块的异常优先，close() 的异常被 addSuppressed 附加。多个资源可在一个 try 中声明：\`try (var in = ...; var out = ...) { ... }\`。注意：被声明的资源变量是 effectively final，try 块内不能重新赋值。Java 9+ 允许引用外部的 effectively final 变量直接放入 try-with-resources。`,
    tags: ["try-with-resources", "AutoCloseable", "资源管理"],
  },
  {
    id: "jct-io-3",
    chapter: "jct-io-streams",
    level: 3,
    question: `Java NIO 和传统 IO 的核心区别是什么？Buffer 的工作原理是什么？`,
    answer:
      `NIO vs 传统 IO 核心区别：①IO 是面向流的（单向，阻塞），NIO 是面向 Channel + Buffer 的（双向，可非阻塞）；②IO 读时阻塞直到数据可用，NIO 可用 Selector 多路复用一个线程管理多个 Channel；③IO 流式逐字节读写（虽有缓冲流），NIO 通过 Buffer 批量读写。Buffer 工作原理：Buffer 是数据容器，有四个核心属性——capacity（总容量）、position（当前读写位置）、limit（读写上限）、mark（标记位）。写模式：put() 写数据，position 前进；flip() 切换为读模式（limit=position, position=0）；读模式：get() 读数据，position 前进；clear() 或 compact() 重置为写模式。常用 Buffer：ByteBuffer（最常用）、CharBuffer、IntBuffer。ByteBuffer 支持直接内存（allocateDirect）——分配在堆外内存，零拷贝减少一次内核到用户空间的复制，适合大文件或网络 IO，但分配/释放开销大。Path/Files API（Java 7+）简化了文件操作：\`Files.readString(Path.of(\"f.txt\"))\` 一行读取全文。`,
    tags: ["NIO", "Buffer", "Channel"],
  },
  {
    id: "jct-io-4",
    chapter: "jct-io-streams",
    level: 3,
    question: `什么是装饰器模式？Java IO 体系如何体现装饰器模式？`,
    answer:
      `装饰器模式：动态地给一个对象添加额外职责，比继承更灵活。装饰器和被装饰者实现同一接口，装饰器内部持有被装饰者引用，调用时先做增强再委托。Java IO 体系完美体现装饰器模式：InputStream 是抽象组件，FileInputStream 是具体组件，BufferedInputStream/DataInputStream 是具体装饰器。\`new BufferedInputStream(new FileInputStream(\"f.txt\"))\` = 给 FileInputStream 装上缓冲功能。多层装饰：\`new DataInputStream(new BufferedInputStream(new FileInputStream(\"f.txt\")))\` = 文件流 + 缓冲 + 数据类型读取。装饰器 vs 继承：继承是编译期静态扩展（类爆炸——N 种功能要 2^N 个子类），装饰器是运行时动态组合（N 种功能只需 N 个装饰器类，自由组合）。装饰器特点：①装饰器和被装饰者同类型（可互相替换）；②装饰器可嵌套；③装饰器不影响其他对象。同理 Reader 体系也是装饰器：\`new BufferedReader(new InputStreamReader(new FileInputStream(\"f.txt\"), UTF_8))\`。`,
    tags: ["装饰器模式", "IO体系", "设计模式"],
  },
];
