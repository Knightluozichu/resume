"use client";

export function IsnLoadBalancingDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="负载均衡机制：L4-L7对比与调度算法">
      <defs>
        <linearGradient id="isn-lb-l4" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="isn-lb-l7" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0891b2" />
          <stop offset="100%" stopColor="#0e7490" />
        </linearGradient>
        <linearGradient id="isn-lb-srv" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
        <linearGradient id="isn-lb-client" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <marker id="isn-lb-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="28" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">负载均衡：L4/L7对比与流量分发</text>

      {/* 客户端 */}
      <rect x="320" y="50" width="160" height="50" rx="10" fill="url(#isn-lb-client)" opacity="0.95" />
      <text x="400" y="80" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">客户端请求</text>

      {/* L4 负载均衡 */}
      <rect x="100" y="130" width="280" height="100" rx="10" fill="url(#isn-lb-l4)" opacity="0.95" />
      <text x="240" y="155" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">L4 负载均衡（四层）</text>
      <line x1="115" y1="165" x2="365" y2="165" stroke="#fff" strokeWidth="1" opacity="0.4" />
      <text x="240" y="185" textAnchor="middle" fontSize="11" fill="#bfdbfe">工作层: 传输层（TCP/UDP）</text>
      <text x="240" y="203" textAnchor="middle" fontSize="11" fill="#bfdbfe">决策: IP + 端口</text>
      <text x="240" y="221" textAnchor="middle" fontSize="11" fill="#60a5fa">代表: LVS / HAProxy(L4)  性能高</text>

      {/* L7 负载均衡 */}
      <rect x="420" y="130" width="280" height="100" rx="10" fill="url(#isn-lb-l7)" opacity="0.95" />
      <text x="560" y="155" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">L7 负载均衡（七层）</text>
      <line x1="435" y1="165" x2="685" y2="165" stroke="#fff" strokeWidth="1" opacity="0.4" />
      <text x="560" y="185" textAnchor="middle" fontSize="11" fill="#cffafe">工作层: 应用层（HTTP/HTTPS）</text>
      <text x="560" y="203" textAnchor="middle" fontSize="11" fill="#cffafe">决策: URL / Header / Cookie</text>
      <text x="560" y="221" textAnchor="middle" fontSize="11" fill="#67e8f9">代表: Nginx / ALB  灵活+SSL终结</text>

      {/* 箭头 客户端→L4/L7 */}
      <path d="M380 100 L240 130" stroke="#64748b" strokeWidth="2" markerEnd="url(#isn-lb-arrow)" />
      <path d="M420 100 L560 130" stroke="#64748b" strokeWidth="2" markerEnd="url(#isn-lb-arrow)" />

      {/* 后端服务器集群 */}
      <rect x="80" y="270" width="120" height="60" rx="8" fill="url(#isn-lb-srv)" opacity="0.95" />
      <text x="140" y="295" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">服务器 S1</text>
      <text x="140" y="315" textAnchor="middle" fontSize="10" fill="#d1fae5">weight=3</text>

      <rect x="230" y="270" width="120" height="60" rx="8" fill="url(#isn-lb-srv)" opacity="0.95" />
      <text x="290" y="295" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">服务器 S2</text>
      <text x="290" y="315" textAnchor="middle" fontSize="10" fill="#d1fae5">weight=1</text>

      <rect x="380" y="270" width="120" height="60" rx="8" fill="url(#isn-lb-srv)" opacity="0.95" />
      <text x="440" y="295" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">服务器 S3</text>
      <text x="440" y="315" textAnchor="middle" fontSize="10" fill="#d1fae5">backup</text>

      <rect x="530" y="270" width="120" height="60" rx="8" fill="#ef4444" opacity="0.8" />
      <text x="590" y="295" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">服务器 S4</text>
      <text x="590" y="315" textAnchor="middle" fontSize="10" fill="#fecaca">down (不健康)</text>

      {/* 箭头 LB→服务器 */}
      <path d="M200 230 L140 270" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#isn-lb-arrow)" />
      <path d="M240 230 L290 270" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#isn-lb-arrow)" />
      <path d="M560 230 L440 270" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#isn-lb-arrow)" />

      {/* 健康检查标记 */}
      <text x="590" y="350" textAnchor="middle" fontSize="10" fill="#ef4444">✗ 健康检查失败 → 剔除分发</text>

      {/* 调度算法区 */}
      <rect x="30" y="370" width="370" height="190" rx="10" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="215" y="395" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">五大调度算法</text>
      <text x="50" y="420" textAnchor="start" fontSize="11" fill="#475569">轮询(RR): S1→S2→S3→S1→...</text>
      <text x="50" y="440" textAnchor="start" fontSize="11" fill="#475569">加权轮询(WRR): 按权重比例分配</text>
      <text x="50" y="460" textAnchor="start" fontSize="11" fill="#475569">最少连接(LC): 给连接最少的</text>
      <text x="50" y="480" textAnchor="start" fontSize="11" fill="#475569">IP哈希: 同一IP固定到同一服务器</text>
      <text x="50" y="500" textAnchor="start" fontSize="11" fill="#475569">一致性哈希: 环形空间+虚拟节点</text>
      <text x="50" y="530" textAnchor="start" fontSize="10" fill="#64748b">加权轮询解决异构服务器问题</text>
      <text x="50" y="548" textAnchor="start" fontSize="10" fill="#64748b">一致性哈希解决增减节点映射问题</text>

      {/* 健康检查+会话保持 */}
      <rect x="420" y="370" width="360" height="190" rx="10" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="600" y="395" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">健康检查与会话保持</text>
      <text x="440" y="420" textAnchor="start" fontSize="11" fill="#475569">健康检查: TCP检查 / HTTP检查</text>
      <text x="440" y="440" textAnchor="start" fontSize="11" fill="#ef4444">快速剔除(1次失败) + 慢速恢复(3次成功)</text>
      <text x="440" y="470" textAnchor="start" fontSize="11" fill="#475569">会话保持方案一: Cookie植入</text>
      <text x="440" y="488" textAnchor="start" fontSize="10" fill="#64748b">  LB植入Cookie标记服务器 → 下次据此分发</text>
      <text x="440" y="510" textAnchor="start" fontSize="11" fill="#475569">会话保持方案二: Session共享</text>
      <text x="440" y="528" textAnchor="start" fontSize="10" fill="#64748b">  Session存Redis → 任意服务器可读 → 无状态</text>
      <text x="440" y="548" textAnchor="start" fontSize="10" fill="#059669">  推荐Session共享: 扩缩容无影响</text>
    </svg>
  );
}
