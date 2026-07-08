/**
 * <LkeNetworkStackDiagram>：Linux网络协议栈图解。
 * 纯静态展示，无交互。Server Component。
 */

const VIEW_W = 740;
const VIEW_H = 500;

export function LkeNetworkStackDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Linux网络协议栈图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="26" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            Linux网络协议栈——一个数据包的收发全旅程
          </text>

          {/* 应用层 */}
          <rect x="30" y="44" width="680" height="34" rx="6" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1" />
          <text x={VIEW_W / 2} y="66" textAnchor="middle" fontSize="11" fill="var(--text-primary)">应用层：send() / recv() / sendto() / recvfrom()</text>

          {/* Socket层 */}
          <rect x="30" y="86" width="680" height="46" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="370" y="104" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">Socket 层（VFS接口）</text>
          <text x="370" y="120" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">socket → sock 结构 → 协议操作集（proto_ops: inet_stream_ops / inet_dgram_ops）</text>

          {/* TCP/UDP */}
          <rect x="30" y="140" width="330" height="46" rx="6" fill="var(--danger)" fillOpacity="0.12" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="195" y="158" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--danger)">TCP（传输层）</text>
          <text x="195" y="174" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">连接管理 / 拥塞控制 / 重传 / 滑动窗口</text>

          <rect x="380" y="140" width="330" height="46" rx="6" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="545" y="158" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">UDP（传输层）</text>
          <text x="545" y="174" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">无连接 / 不可靠 / 快速传输</text>

          {/* IP层 */}
          <rect x="30" y="194" width="680" height="46" rx="8" fill="var(--danger)" fillOpacity="0.08" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="370" y="212" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--danger)">IP 层（网络层）</text>
          <text x="370" y="228" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">路由查找 / 分片重组 / iptables(netfilter) / TTL / 转发</text>

          {/* 链路层 */}
          <rect x="30" y="248" width="680" height="46" rx="8" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="370" y="266" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">链路层（邻居子层 + 流量控制）</text>
          <text x="370" y="282" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">ARP / 邻居缓存 / qdisc（tc流量控制） / dev_queue_xmit</text>

          {/* 设备驱动 */}
          <rect x="30" y="302" width="680" height="34" rx="6" fill="var(--text-primary)" fillOpacity="0.08" stroke="var(--text-primary)" strokeWidth="1" strokeOpacity="0.4" />
          <text x={VIEW_W / 2} y="324" textAnchor="middle" fontSize="11" fill="var(--text-primary)">网络设备驱动：net_device → DMA收发 → 硬件网卡</text>

          {/* sk_buff 流转 */}
          <rect x="30" y="346" width="680" height="70" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="0.8" strokeOpacity="0.3" />
          <text x="370" y="364" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">sk_buff——数据包的统一载体</text>
          <text x="370" y="380" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">发送：alloc_skb → 逐层加头 → dev_queue_xmit → 驱动 → 网卡</text>
          <text x="370" y="394" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">接收：网卡DMA → NAPI poll → netif_receive_skb → 逐层剥头 → socket</text>
          <text x="370" y="408" textAnchor="middle" fontSize="8" fill="var(--text-tertiary)">skb_data 指针：head / data / tail / end — 支持在各层间高效移动而无拷贝</text>

          {/* 收发方向 */}
          <text x="710" y="62" fontSize="8" fill="var(--warning)">发送 &darr;</text>
          <text x="710" y="318" fontSize="8" fill="var(--success)">接收 &uarr;</text>

          {/* netfilter */}
          <rect x="30" y="424" width="680" height="65" rx="8" fill="var(--danger)" fillOpacity="0.06" stroke="var(--danger)" strokeWidth="0.8" strokeOpacity="0.3" />
          <text x="370" y="442" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--danger)">Netfilter 钩子（iptables / nftables 的底座）</text>
          <text x="370" y="458" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">NF_INET_PRE_ROUTING → NF_INET_LOCAL_IN → NF_INET_FORWARD → NF_INET_LOCAL_OUT → NF_INET_POST_ROUTING</text>
          <text x="370" y="472" textAnchor="middle" fontSize="8" fill="var(--text-tertiary)">每个钩子点可注册回调：过滤 / NAT / 修改 / 丢弃 → 实现防火墙与地址转换</text>
          <text x="370" y="484" textAnchor="middle" fontSize="8" fill="var(--text-tertiary)">conntrack 连接跟踪表维护每条流的状态（NEW/ESTABLISHED/RELATED）</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Linux网络栈从应用经Socket/TCP-UDP/IP/链路层到网卡驱动；sk_buff在各层间高效流转；netfilter钩子实现防火墙
      </figcaption>
    </figure>
  );
}
