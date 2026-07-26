/**
 * <JctXmlNetworkDiagram>：XML与网络图解。
 * 纯静态展示，无交互。Server Component。
 */

const VIEW_W = 740;
const VIEW_H = 500;

export function JctXmlNetworkDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="XML与网络图解"
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
            XML与网络——数据解析与网络通信
          </text>

          {/* XML解析 */}
          <rect
            x="30"
            y="48"
            width="340"
            height="160"
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
            XML解析方式
          </text>
          <text x="45" y="90" fontSize="11" fill="var(--text-secondary)">
            DOM: 整棵树加载到内存
          </text>
          <text x="45" y="106" fontSize="11" fill="var(--text-secondary)">
            {" "}
            DocumentBuilder / Element / NodeList
          </text>
          <text x="45" y="122" fontSize="11" fill="var(--text-secondary)">
            {" "}
            适合小文件, 可随机访问
          </text>
          <text x="45" y="142" fontSize="11" fill="var(--text-secondary)">
            SAX: 事件驱动, 流式解析
          </text>
          <text x="45" y="158" fontSize="11" fill="var(--text-secondary)">
            {" "}
            startElement / endElement
          </text>
          <text x="45" y="174" fontSize="11" fill="var(--text-secondary)">
            {" "}
            适合大文件, 只读, 内存省
          </text>
          <text x="45" y="194" fontSize="11" fill="var(--text-secondary)">
            StAX: 拉取式流解析（Cursor）
          </text>

          {/* JSON */}
          <rect
            x="390"
            y="48"
            width="320"
            height="160"
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
            JSON处理
          </text>
          <text x="405" y="90" fontSize="11" fill="var(--text-secondary)">
            Jackson:
          </text>
          <text x="405" y="106" fontSize="11" fill="var(--text-secondary)">
            {" "}
            ObjectMapper mapper = new ObjectMapper();
          </text>
          <text x="405" y="122" fontSize="11" fill="var(--text-secondary)">
            {" "}
            String json = mapper.writeValueAsString(obj);
          </text>
          <text x="405" y="138" fontSize="11" fill="var(--text-secondary)">
            {" "}
            User u = mapper.readValue(json, User.class);
          </text>
          <text x="405" y="158" fontSize="11" fill="var(--text-secondary)">
            Gson: toJson / fromJson
          </text>
          <text x="405" y="174" fontSize="11" fill="var(--text-secondary)">
            @JsonProperty 重命名
          </text>
          <text x="405" y="194" fontSize="11" fill="var(--text-secondary)">
            @JsonIgnore 忽略字段
          </text>

          {/* 网络通信 */}
          <text
            x={VIEW_W / 2}
            y="238"
            textAnchor="middle"
            fontSize="14"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            网络通信
          </text>

          <rect
            x="30"
            y="252"
            width="340"
            height="120"
            rx="8"
            fill="var(--warning)"
            fillOpacity="0.06"
            stroke="var(--warning)"
            strokeWidth="1.2"
          />
          <text
            x="200"
            y="272"
            textAnchor="middle"
            fontSize="12"
            fontWeight="600"
            fill="var(--warning)"
          >
            Socket / ServerSocket
          </text>
          <text x="45" y="290" fontSize="11" fill="var(--text-secondary)">
            ServerSocket server = new ServerSocket(8080);
          </text>
          <text x="45" y="306" fontSize="11" fill="var(--text-secondary)">
            Socket client = server.accept(); // 阻塞等待
          </text>
          <text x="45" y="322" fontSize="11" fill="var(--text-secondary)">
            InputStream in = client.getInputStream();
          </text>
          <text x="45" y="338" fontSize="11" fill="var(--text-secondary)">
            OutputStream out = client.getOutputStream();
          </text>
          <text x="45" y="358" fontSize="11" fill="var(--text-secondary)">
            TCP: 可靠, 面向连接
          </text>

          <rect
            x="390"
            y="252"
            width="320"
            height="120"
            rx="8"
            fill="var(--success)"
            fillOpacity="0.06"
            stroke="var(--success)"
            strokeWidth="1.2"
          />
          <text
            x="550"
            y="272"
            textAnchor="middle"
            fontSize="12"
            fontWeight="600"
            fill="var(--success)"
          >
            HttpClient（Java 11+）
          </text>
          <text x="405" y="290" fontSize="11" fill="var(--text-secondary)">
            HttpClient client = HttpClient.newHttpClient();
          </text>
          <text x="405" y="306" fontSize="11" fill="var(--text-secondary)">
            HttpRequest req = HttpRequest.newBuilder()
          </text>
          <text x="405" y="322" fontSize="11" fill="var(--text-secondary)">
            {" "}
            .uri(URI.create(&quot;https://api.example.com&quot;))
          </text>
          <text x="405" y="338" fontSize="11" fill="var(--text-secondary)">
            {" "}
            .GET().build();
          </text>
          <text x="405" y="358" fontSize="11" fill="var(--text-secondary)">
            HttpResponse&lt;String&gt; res = client.send(...);
          </text>

          {/* URL与URI */}
          <rect
            x="30"
            y="392"
            width="680"
            height="94"
            rx="8"
            fill="var(--text-primary)"
            fillOpacity="0.04"
            stroke="var(--text-primary)"
            strokeWidth="1"
            strokeOpacity="0.3"
          />
          <text
            x="370"
            y="412"
            textAnchor="middle"
            fontSize="12"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            URL / URI / InetAddress
          </text>
          <text x="45" y="430" fontSize="11" fill="var(--text-secondary)">
            URL: 统一资源定位符, 可打开连接
          </text>
          <text x="45" y="446" fontSize="11" fill="var(--text-secondary)">
            URI: 统一资源标识符, 纯标识, 不含连接能力
          </text>
          <text x="45" y="462" fontSize="11" fill="var(--text-secondary)">
            InetAddress: 主机名与IP地址解析, getByName(&quot;localhost&quot;)
          </text>
          <text x="45" y="478" fontSize="11" fill="var(--text-secondary)">
            DatagramSocket: UDP无连接通信, 适合实时但不保证可靠
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        XML与网络——DOM/SAX/StAX三种XML解析、Jackson/Gson JSON处理、Socket
        TCP通信与HttpClient
      </figcaption>
    </figure>
  );
}
