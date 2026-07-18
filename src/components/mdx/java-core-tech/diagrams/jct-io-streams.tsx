/**
 * <JctIoStreamsDiagram>：I/O与流图解。
 * 纯静态展示，无交互。Server Component。
 */

const VIEW_W = 740;
const VIEW_H = 500;

export function JctIoStreamsDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="I/O与流图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text
            x={VIEW_W / 2}
            y="28"
            textAnchor="middle"
            fontSize="16"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            I/O与流——从字节流到Stream API
          </text>

          {/* 字节流与字符流 */}
          <rect
            x="30"
            y="48"
            width="340"
            height="180"
            rx="10"
            fill="var(--accent)"
            fillOpacity="0.06"
            stroke="var(--accent)"
            strokeWidth="1.5"
          />
          <text
            x="200"
            y="70"
            textAnchor="middle"
            fontSize="14"
            fontWeight="700"
            fill="var(--accent)"
          >
            字节流与字符流
          </text>
          <text x="45" y="90" fontSize="10" fill="var(--text-secondary)">
            InputStream / OutputStream 字节
          </text>
          <text x="45" y="106" fontSize="10" fill="var(--text-secondary)">
            {" "}
            FileInputStream / FileOutputStream
          </text>
          <text x="45" y="122" fontSize="10" fill="var(--text-secondary)">
            {" "}
            BufferedInputStream (装饰器)
          </text>
          <text x="45" y="142" fontSize="10" fill="var(--text-secondary)">
            Reader / Writer 字符
          </text>
          <text x="45" y="158" fontSize="10" fill="var(--text-secondary)">
            {" "}
            FileReader / FileWriter
          </text>
          <text x="45" y="174" fontSize="10" fill="var(--text-secondary)">
            {" "}
            BufferedReader / PrintWriter
          </text>
          <text x="45" y="194" fontSize="10" fill="var(--text-secondary)">
            桥接: InputStreamReader
          </text>
          <text x="45" y="210" fontSize="10" fill="var(--text-secondary)">
            {" "}
            字节流 &rarr; 字符流
          </text>
          <text x="45" y="224" fontSize="10" fill="var(--text-secondary)">
            缓冲区: 4KB~8KB, 减少IO次数
          </text>

          {/* try-with-resources */}
          <rect
            x="390"
            y="48"
            width="320"
            height="180"
            rx="10"
            fill="var(--danger)"
            fillOpacity="0.06"
            stroke="var(--danger)"
            strokeWidth="1.5"
          />
          <text
            x="550"
            y="70"
            textAnchor="middle"
            fontSize="14"
            fontWeight="700"
            fill="var(--danger)"
          >
            try-with-resources
          </text>
          <text x="405" y="92" fontSize="10" fill="var(--text-secondary)">
            try (var in = new BufferedReader(
          </text>
          <text x="405" y="108" fontSize="10" fill="var(--text-secondary)">
            {" "}
            new FileReader(&quot;input.txt&quot;))) &#123;
          </text>
          <text x="405" y="124" fontSize="10" fill="var(--text-secondary)">
            {" "}
            String line;
          </text>
          <text x="405" y="140" fontSize="10" fill="var(--text-secondary)">
            {" "}
            while ((line = in.readLine()) != null) &#123;
          </text>
          <text x="405" y="156" fontSize="10" fill="var(--text-secondary)">
            {" "}
            System.out.println(line);
          </text>
          <text x="405" y="172" fontSize="10" fill="var(--text-secondary)">
            {" "}
            &#125;
          </text>
          <text x="405" y="188" fontSize="10" fill="var(--text-secondary)">
            &#125;
          </text>
          <text x="405" y="210" fontSize="10" fill="var(--text-secondary)">
            AutoCloseable: 自动关闭, 无需 finally
          </text>
          <text x="405" y="224" fontSize="10" fill="var(--text-secondary)">
            异常时自动 close(), 逆序关闭
          </text>

          {/* NIO */}
          <rect
            x="30"
            y="248"
            width="340"
            height="120"
            rx="10"
            fill="var(--success)"
            fillOpacity="0.06"
            stroke="var(--success)"
            strokeWidth="1.5"
          />
          <text
            x="200"
            y="270"
            textAnchor="middle"
            fontSize="14"
            fontWeight="700"
            fill="var(--success)"
          >
            NIO（New IO）
          </text>
          <text x="45" y="290" fontSize="10" fill="var(--text-secondary)">
            Channel + Buffer 替代 Stream
          </text>
          <text x="45" y="306" fontSize="10" fill="var(--text-secondary)">
            {" "}
            FileChannel / SocketChannel
          </text>
          <text x="45" y="322" fontSize="10" fill="var(--text-secondary)">
            {" "}
            ByteBuffer / CharBuffer
          </text>
          <text x="45" y="342" fontSize="10" fill="var(--text-secondary)">
            Path / Files（Java 7+）:
          </text>
          <text x="45" y="358" fontSize="10" fill="var(--text-secondary)">
            {" "}
            Files.readString(Path.of(&quot;f.txt&quot;))
          </text>

          {/* Stream API */}
          <rect
            x="390"
            y="248"
            width="320"
            height="120"
            rx="10"
            fill="var(--warning)"
            fillOpacity="0.06"
            stroke="var(--warning)"
            strokeWidth="1.5"
          />
          <text
            x="550"
            y="270"
            textAnchor="middle"
            fontSize="14"
            fontWeight="700"
            fill="var(--warning)"
          >
            Stream API（不同于IO流）
          </text>
          <text x="405" y="290" fontSize="10" fill="var(--text-secondary)">
            中间操作（惰性）:
          </text>
          <text x="405" y="306" fontSize="10" fill="var(--text-secondary)">
            {" "}
            filter / map / flatMap / sorted
          </text>
          <text x="405" y="322" fontSize="10" fill="var(--text-secondary)">
            终止操作（触发计算）:
          </text>
          <text x="405" y="338" fontSize="10" fill="var(--text-secondary)">
            {" "}
            collect / reduce / count / forEach
          </text>
          <text x="405" y="358" fontSize="10" fill="var(--text-secondary)">
            list.stream().filter(x -&gt; x&gt;0).toList()
          </text>

          {/* 序列化 */}
          <rect
            x="30"
            y="388"
            width="680"
            height="96"
            rx="8"
            fill="var(--text-primary)"
            fillOpacity="0.04"
            stroke="var(--text-primary)"
            strokeWidth="1"
            strokeOpacity="0.3"
          />
          <text
            x="370"
            y="408"
            textAnchor="middle"
            fontSize="12"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            序列化与反序列化
          </text>
          <text x="45" y="426" fontSize="10" fill="var(--text-secondary)">
            Serializable 标记接口: ObjectOutputStream.writeObject(obj)
          </text>
          <text x="45" y="442" fontSize="10" fill="var(--text-secondary)">
            serialVersionUID: 版本号, 反序列化时校验兼容性
          </text>
          <text x="45" y="458" fontSize="10" fill="var(--text-secondary)">
            transient: 标记字段不参与序列化
          </text>
          <text x="45" y="474" fontSize="10" fill="var(--text-secondary)">
            现代替代: JSON (Jackson/Gson) / XML / Protocol Buffers
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        I/O与流——字节流/字符流体系、try-with-resources自动关闭、NIO
        Channel/Buffer、Stream API惰性求值
      </figcaption>
    </figure>
  );
}
