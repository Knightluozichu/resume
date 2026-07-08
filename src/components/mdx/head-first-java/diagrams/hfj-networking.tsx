/**
 * <HfjNetworkingDiagram>：网络编程图解。
 * 纯静态展示，无交互。Server Component。
 */

const VIEW_W = 740;
const VIEW_H = 500;

export function HfjNetworkingDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="网络编程图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            网络编程——Socket 通信模型
          </text>

          {/* Socket 通信 */}
          <rect x="30" y="52" width="300" height="200" rx="10" fill="var(--warning)" fillOpacity="0.06" stroke="var(--warning)" strokeWidth="1.5" />
          <text x="180" y="74" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--warning)">客户端（Client）</text>
          <text x="45" y="94" fontSize="10" fill="var(--text-secondary)">1. Socket socket = new Socket("127.0.0.1", 5000);</text>
          <text x="45" y="110" fontSize="10" fill="var(--text-secondary)">   // 连接服务器 IP:端口</text>
          <text x="45" y="130" fontSize="10" fill="var(--text-secondary)">2. OutputStream out = socket.getOutputStream();</text>
          <text x="45" y="146" fontSize="10" fill="var(--text-secondary)">   out.write("Hello".getBytes());</text>
          <text x="45" y="166" fontSize="10" fill="var(--text-secondary)">3. InputStream in = socket.getInputStream();</text>
          <text x="45" y="182" fontSize="10" fill="var(--text-secondary)">   in.read(buf); // 读响应</text>
          <text x="45" y="202" fontSize="10" fill="var(--text-secondary)">4. socket.close(); // 关闭连接</text>
          <text x="45" y="226" fontSize="10" fill="var(--text-secondary)">角色: 主动发起连接</text>
          <text x="45" y="242" fontSize="10" fill="var(--text-secondary)">需要知道服务器地址和端口</text>

          {/* 中间网络 */}
          <rect x="340" y="100" width="60" height="100" rx="8" fill="var(--text-primary)" fillOpacity="0.06" stroke="var(--text-primary)" strokeWidth="1.2" />
          <text x="370" y="140" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--text-primary)">TCP</text>
          <text x="370" y="156" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--text-primary)">网络</text>
          <text x="370" y="178" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">可靠传输</text>
          <text x="370" y="192" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">三次握手</text>

          <text x="335" y="148" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&larr;</text>
          <text x="405" y="148" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="410" y="52" width="300" height="200" rx="10" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="1.5" />
          <text x="560" y="74" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--success)">服务器（Server）</text>
          <text x="425" y="94" fontSize="10" fill="var(--text-secondary)">1. ServerSocket server = new ServerSocket(5000);</text>
          <text x="425" y="110" fontSize="10" fill="var(--text-secondary)">   // 绑定端口, 等待连接</text>
          <text x="425" y="130" fontSize="10" fill="var(--text-secondary)">2. Socket client = server.accept();</text>
          <text x="425" y="146" fontSize="10" fill="var(--text-secondary)">   // 阻塞等待客户端连接</text>
          <text x="425" y="166" fontSize="10" fill="var(--text-secondary)">3. InputStream in = client.getInputStream();</text>
          <text x="425" y="182" fontSize="10" fill="var(--text-secondary)">   in.read(buf); // 读请求</text>
          <text x="425" y="202" fontSize="10" fill="var(--text-secondary)">4. OutputStream out = client.getOutputStream();</text>
          <text x="425" y="218" fontSize="10" fill="var(--text-secondary)">   out.write(response); // 发响应</text>
          <text x="425" y="238" fontSize="10" fill="var(--text-secondary)">角色: 被动等待连接</text>

          {/* TCP vs UDP */}
          <text x={VIEW_W / 2} y="280" textAnchor="middle" fontSize="14" fontWeight="600" fill="var(--text-primary)">
            TCP 与 UDP 对比
          </text>

          <rect x="30" y="294" width="340" height="110" rx="10" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x="200" y="314" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">TCP（传输控制协议）</text>
          <text x="45" y="332" fontSize="10" fill="var(--text-secondary)">面向连接: 三次握手建立连接</text>
          <text x="45" y="348" fontSize="10" fill="var(--text-secondary)">可靠传输: 保证到达, 按序到达</text>
          <text x="45" y="364" fontSize="10" fill="var(--text-secondary)">流式: 数据以字节流传输</text>
          <text x="45" y="380" fontSize="10" fill="var(--text-secondary)">开销大: 需要确认/重传/拥塞控制</text>
          <text x="45" y="396" fontSize="10" fill="var(--text-secondary)">适用: HTTP/FTP/WebSocket/聊天</text>

          <rect x="390" y="294" width="320" height="110" rx="10" fill="var(--danger)" fillOpacity="0.04" stroke="var(--danger)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x="550" y="314" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--danger)">UDP（用户数据报协议）</text>
          <text x="405" y="332" fontSize="10" fill="var(--text-secondary)">无连接: 直接发送, 不建立连接</text>
          <text x="405" y="348" fontSize="10" fill="var(--text-secondary)">不可靠: 可能丢包/乱序/重复</text>
          <text x="405" y="364" fontSize="10" fill="var(--text-secondary)">数据报: 以独立消息为单位</text>
          <text x="405" y="380" fontSize="10" fill="var(--text-secondary)">开销小: 无确认/重传机制</text>
          <text x="405" y="396" fontSize="10" fill="var(--text-secondary)">适用: DNS/视频流/游戏/广播</text>

          {/* 多线程服务器 */}
          <rect x="30" y="420" width="680" height="60" rx="8" fill="var(--warning)" fillOpacity="0.04" stroke="var(--warning)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x="370" y="440" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--warning)">多线程服务器模型</text>
          <text x="40" y="458" fontSize="10" fill="var(--text-secondary)">while(true) &#123; Socket client = server.accept(); new Thread(() -&gt; handle(client)).start(); &#125;</text>
          <text x="40" y="472" fontSize="10" fill="var(--text-secondary)">主线程循环 accept, 每个客户端连接交给新线程处理, 实现并发服务</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        网络编程——Socket客户端/服务器模型、TCP与UDP对比、多线程服务器并发处理
      </figcaption>
    </figure>
  );
}
