"use client";

export function IsnServerBasicsDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="服务器网络基础：TCP-UDP与架构模型">
      <defs>
        <linearGradient id="isn-sb-tcp" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="isn-sb-udp" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="isn-sb-reactor" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
        <linearGradient id="isn-sb-iter" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ef4444" />
          <stop offset="100%" stopColor="#dc2626" />
        </linearGradient>
        <marker id="isn-sb-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="28" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">服务器网络基础：协议与架构模型</text>

      {/* TCP vs UDP */}
      <rect x="30" y="50" width="350" height="200" rx="12" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5" />
      <text x="205" y="75" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">TCP vs UDP</text>

      <rect x="50" y="90" width="140" height="140" rx="8" fill="url(#isn-sb-tcp)" opacity="0.95" />
      <text x="120" y="113" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">TCP</text>
      <line x1="65" y1="122" x2="175" y2="122" stroke="#fff" strokeWidth="1" opacity="0.4" />
      <text x="120" y="142" textAnchor="middle" fontSize="11" fill="#bfdbfe">面向连接</text>
      <text x="120" y="160" textAnchor="middle" fontSize="11" fill="#bfdbfe">三次握手</text>
      <text x="120" y="178" textAnchor="middle" fontSize="11" fill="#bfdbfe">可靠有序</text>
      <text x="120" y="196" textAnchor="middle" fontSize="11" fill="#bfdbfe">确认重传</text>
      <text x="120" y="218" textAnchor="middle" fontSize="10" fill="#60a5fa">HTTP/数据库/文件</text>

      <rect x="210" y="90" width="140" height="140" rx="8" fill="url(#isn-sb-udp)" opacity="0.95" />
      <text x="280" y="113" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">UDP</text>
      <line x1="225" y1="122" x2="335" y2="122" stroke="#fff" strokeWidth="1" opacity="0.4" />
      <text x="280" y="142" textAnchor="middle" fontSize="11" fill="#fef3c7">无连接</text>
      <text x="280" y="160" textAnchor="middle" fontSize="11" fill="#fef3c7">不保证可靠</text>
      <text x="280" y="178" textAnchor="middle" fontSize="11" fill="#fef3c7">无序可能丢</text>
      <text x="280" y="196" textAnchor="middle" fontSize="11" fill="#fde68a">无握手开销</text>
      <text x="280" y="218" textAnchor="middle" fontSize="10" fill="#fcd34d">DNS/视频/游戏</text>

      {/* 四种架构模型 */}
      <rect x="400" y="50" width="380" height="200" rx="12" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5" />
      <text x="590" y="75" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">四种服务器架构模型</text>

      <rect x="415" y="88" width="85" height="68" rx="6" fill="url(#isn-sb-iter)" opacity="0.9" />
      <text x="457" y="108" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">迭代</text>
      <text x="457" y="126" textAnchor="middle" fontSize="10" fill="#fecaca">一次一个</text>
      <text x="457" y="142" textAnchor="middle" fontSize="10" fill="#fca5a5">极低并发</text>

      <rect x="510" y="88" width="85" height="68" rx="6" fill="url(#isn-sb-udp)" opacity="0.9" />
      <text x="552" y="108" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">多进程</text>
      <text x="552" y="126" textAnchor="middle" fontSize="10" fill="#fef3c7">fork子进程</text>
      <text x="552" y="142" textAnchor="middle" fontSize="10" fill="#fde68a">百级并发</text>

      <rect x="605" y="88" width="85" height="68" rx="6" fill="url(#isn-sb-tcp)" opacity="0.9" />
      <text x="647" y="108" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">线程池</text>
      <text x="647" y="126" textAnchor="middle" fontSize="10" fill="#bfdbfe">复用线程</text>
      <text x="647" y="142" textAnchor="middle" fontSize="10" fill="#60a5fa">千级并发</text>

      <rect x="700" y="88" width="70" height="68" rx="6" fill="url(#isn-sb-reactor)" opacity="0.9" />
      <text x="735" y="108" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">Reactor</text>
      <text x="735" y="126" textAnchor="middle" fontSize="10" fill="#d1fae5">事件驱动</text>
      <text x="735" y="142" textAnchor="middle" fontSize="10" fill="#6ee7b7">万级并发</text>

      <text x="590" y="185" textAnchor="middle" fontSize="11" fill="#475569">迭代: 请求1→处理1→请求2...</text>
      <text x="590" y="205" textAnchor="middle" fontSize="11" fill="#475569">Reactor: 事件循环→epoll→非阻塞IO→回调</text>
      <text x="590" y="225" textAnchor="middle" fontSize="11" fill="#475569">Nginx/Netty/Redis 都用 Reactor</text>

      {/* 端口与套接字 */}
      <rect x="30" y="270" width="350" height="120" rx="12" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5" />
      <text x="205" y="295" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">端口与套接字</text>
      <text x="205" y="320" textAnchor="middle" fontSize="12" fill="#475569">套接字 = IP地址 : 端口</text>
      <text x="55" y="345" textAnchor="start" fontSize="11" fill="#64748b" fontFamily="monospace">192.168.1.10:80   = Web服务器</text>
      <text x="55" y="363" textAnchor="start" fontSize="11" fill="#64748b" fontFamily="monospace">192.168.1.10:443  = HTTPS</text>
      <text x="55" y="381" textAnchor="start" fontSize="11" fill="#64748b" fontFamily="monospace">192.168.1.10:3306 = MySQL</text>

      {/* TCP连接管理 */}
      <rect x="400" y="270" width="380" height="120" rx="12" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5" />
      <text x="590" y="295" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">TCP连接管理</text>
      <text x="420" y="320" textAnchor="start" fontSize="11" fill="#475569">三次握手: SYN → SYN+ACK → ACK</text>
      <text x="420" y="340" textAnchor="start" fontSize="11" fill="#475569">四次挥手: FIN → ACK → FIN → ACK</text>
      <text x="420" y="360" textAnchor="start" fontSize="11" fill="#ef4444">TIME_WAIT: 主动关闭方持续2MSL(约60s)</text>
      <text x="420" y="380" textAnchor="start" fontSize="11" fill="#059669">解决: 长连接/tcp_tw_reuse/连接池</text>

      {/* 底部：服务器监听流程 */}
      <rect x="30" y="410" width="750" height="150" rx="10" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="400" y="435" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">服务器监听流程</text>
      <rect x="60" y="450" width="100" height="40" rx="6" fill="url(#isn-sb-tcp)" opacity="0.9" />
      <text x="110" y="475" textAnchor="middle" fontSize="11" fill="#fff">socket()</text>
      <path d="M160 470 L180 470" stroke="#64748b" strokeWidth="2" markerEnd="url(#isn-sb-arrow)" />
      <rect x="180" y="450" width="100" height="40" rx="6" fill="url(#isn-sb-tcp)" opacity="0.9" />
      <text x="230" y="475" textAnchor="middle" fontSize="11" fill="#fff">bind()</text>
      <path d="M280 470 L300 470" stroke="#64748b" strokeWidth="2" markerEnd="url(#isn-sb-arrow)" />
      <rect x="300" y="450" width="100" height="40" rx="6" fill="url(#isn-sb-tcp)" opacity="0.9" />
      <text x="350" y="475" textAnchor="middle" fontSize="11" fill="#fff">listen()</text>
      <path d="M400 470 L420 470" stroke="#64748b" strokeWidth="2" markerEnd="url(#isn-sb-arrow)" />
      <rect x="420" y="450" width="100" height="40" rx="6" fill="url(#isn-sb-reactor)" opacity="0.9" />
      <text x="470" y="475" textAnchor="middle" fontSize="11" fill="#fff">accept()</text>
      <path d="M520 470 L540 470" stroke="#64748b" strokeWidth="2" markerEnd="url(#isn-sb-arrow)" />
      <rect x="540" y="450" width="100" height="40" rx="6" fill="url(#isn-sb-reactor)" opacity="0.9" />
      <text x="590" y="475" textAnchor="middle" fontSize="11" fill="#fff">read/write</text>
      <path d="M640 470 L660 470" stroke="#64748b" strokeWidth="2" markerEnd="url(#isn-sb-arrow)" />
      <rect x="660" y="450" width="100" height="40" rx="6" fill="url(#isn-sb-iter)" opacity="0.9" />
      <text x="710" y="475" textAnchor="middle" fontSize="11" fill="#fff">close()</text>
      <text x="400" y="525" textAnchor="middle" fontSize="11" fill="#64748b">创建套接字 → 绑定地址端口 → 开始监听 → 接受连接 → 收发数据 → 关闭连接</text>
      <text x="400" y="548" textAnchor="middle" fontSize="11" fill="#64748b">核心：TCP保证可靠传输，Reactor模型通过epoll实现高并发</text>
    </svg>
  );
}
