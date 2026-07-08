/**
 * <WjNetworkProgrammingDiagram>：Windows 网络编程体系图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 460;

export function WjNetworkProgrammingDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Windows 网络编程体系图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            Windows 网络编程模型
          </text>
          <text x={VIEW_W / 2} y="48" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            Winsock 生命周期 + I/O 模型对比
          </text>

          {/* Winsock 生命周期 */}
          <rect x="30" y="68" width="680" height="80" rx="8" fill="var(--warning)" fillOpacity="0.06" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="370" y="90" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--warning)">Winsock 通信生命周期</text>
          <text x="60" y="112" fontSize="9" fill="var(--text-secondary)">WSAStartup</text>
          <text x="150" y="112" fontSize="12" fill="var(--text-tertiary)">&rarr;</text>
          <text x="170" y="112" fontSize="9" fill="var(--text-secondary)">socket</text>
          <text x="220" y="112" fontSize="12" fill="var(--text-tertiary)">&rarr;</text>
          <text x="245" y="112" fontSize="9" fill="var(--text-secondary)">bind</text>
          <text x="290" y="112" fontSize="12" fill="var(--text-tertiary)">&rarr;</text>
          <text x="318" y="112" fontSize="9" fill="var(--text-secondary)">listen</text>
          <text x="370" y="112" fontSize="12" fill="var(--text-tertiary)">&rarr;</text>
          <text x="395" y="112" fontSize="9" fill="var(--text-secondary)">accept</text>
          <text x="450" y="112" fontSize="12" fill="var(--text-tertiary)">&rarr;</text>
          <text x="480" y="112" fontSize="9" fill="var(--text-secondary)">send/recv</text>
          <text x="550" y="112" fontSize="12" fill="var(--text-tertiary)">&rarr;</text>
          <text x="580" y="112" fontSize="9" fill="var(--text-secondary)">closesocket</text>
          <text x="650" y="112" fontSize="12" fill="var(--text-tertiary)">&rarr;</text>
          <text x="675" y="112" fontSize="9" fill="var(--text-secondary)">WSACleanup</text>
          <text x="370" y="134" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">客户端：WSAStartup → socket → connect → send/recv → closesocket → WSACleanup</text>

          {/* I/O 模型对比 */}
          <rect x="30" y="164" width="680" height="210" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="370" y="186" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--accent)">Winsock I/O 模型五种范式</text>
          <line x1="50" y1="196" x2="690" y2="196" stroke="var(--accent)" strokeWidth="0.6" strokeOpacity="0.3" />

          {/* 表头 */}
          <text x="60" y="214" fontSize="10" fontWeight="600" fill="var(--text-secondary)">模型</text>
          <text x="200" y="214" fontSize="10" fontWeight="600" fill="var(--text-secondary)">原理</text>
          <text x="450" y="214" fontSize="10" fontWeight="600" fill="var(--text-secondary)">适用场景</text>
          <line x1="50" y1="220" x2="690" y2="220" stroke="var(--text-tertiary)" strokeWidth="0.4" strokeOpacity="0.3" />

          <text x="60" y="238" fontSize="9" fill="var(--warning)">select</text>
          <text x="200" y="238" fontSize="9" fill="var(--text-tertiary)">轮询 FD 集合，有上限 64/1024</text>
          <text x="450" y="238" fontSize="9" fill="var(--text-tertiary)">少量连接，简单跨平台</text>

          <text x="60" y="258" fontSize="9" fill="var(--accent)">WSAAsyncSelect</text>
          <text x="200" y="258" fontSize="9" fill="var(--text-tertiary)">基于窗口消息通知</text>
          <text x="450" y="258" fontSize="9" fill="var(--text-tertiary)">GUI 程序混合网络</text>

          <text x="60" y="278" fontSize="9" fill="var(--danger)">WSAEventSelect</text>
          <text x="200" y="278" fontSize="9" fill="var(--text-tertiary)">基于事件对象通知</text>
          <text x="450" y="278" fontSize="9" fill="var(--text-tertiary)">无窗口控制台程序</text>

          <text x="60" y="298" fontSize="9" fill="var(--success)">Overlapped I/O</text>
          <text x="200" y="298" fontSize="9" fill="var(--text-tertiary)">异步 I/O + 完成通知</text>
          <text x="450" y="298" fontSize="9" fill="var(--text-tertiary)">中等并发服务器</text>

          <text x="60" y="318" fontSize="9" fill="var(--text-primary)">Completion Port</text>
          <text x="200" y="318" fontSize="9" fill="var(--text-tertiary)">IOCP 完成端口，线程池</text>
          <text x="450" y="318" fontSize="9" fill="var(--text-tertiary)">高并发服务器首选</text>

          <line x1="50" y1="328" x2="690" y2="328" stroke="var(--text-tertiary)" strokeWidth="0.4" strokeOpacity="0.3" />
          <text x="50" y="346" fontSize="9" fill="var(--text-tertiary)">阻塞模式：调用线程等待操作完成</text>
          <text x="50" y="360" fontSize="9" fill="var(--text-tertiary)">非阻塞模式：立即返回，需轮询或事件通知</text>

          {/* 协议对比 */}
          <rect x="30" y="392" width="330" height="48" rx="8" fill="var(--danger)" fillOpacity="0.06" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="195" y="412" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--danger)">TCP（流式套接字 SOCK_STREAM）</text>
          <text x="195" y="430" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">可靠传输 / 有序 / 面向连接 / 三次握手</text>

          <rect x="380" y="392" width="330" height="48" rx="8" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="1.2" />
          <text x="545" y="412" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">UDP（数据报套接字 SOCK_DGRAM）</text>
          <text x="545" y="430" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">无连接 / 不可靠 / 无序 / 高效低延迟</text>

          <text x={VIEW_W / 2} y="456" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            关键洞察：IOCP + Winsock = Windows 高并发网络服务器标准架构
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Windows 网络编程模型——Winsock 生命周期、五种 I/O 模型与 TCP/UDP 对比
      </figcaption>
    </figure>
  );
}
