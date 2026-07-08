/**
 * <MgpInternetProtocolDiagram>：互联网协议基础图解。
 * 纯静态展示，无交互。Server Component。
 */

const VIEW_W = 740;
const VIEW_H = 420;

export function MgpInternetProtocolDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="互联网协议基础图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            IP 地址、端口与字节序
          </text>

          {/* 左侧：IP + 端口 = 套接字地址 */}
          <rect x="30" y="50" width="330" height="140" rx="10" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="1.2" />
          <text x="195" y="72" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--success)">IP + 端口 = 套接字地址</text>

          <rect x="50" y="86" width="135" height="40" rx="6" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1" />
          <text x="117" y="104" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">IP 地址</text>
          <text x="117" y="118" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">192.168.1.100</text>

          <text x="200" y="110" textAnchor="middle" fontSize="16" fill="var(--text-tertiary)">+</text>

          <rect x="215" y="86" width="135" height="40" rx="6" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="1" />
          <text x="282" y="104" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">端口号</text>
          <text x="282" y="118" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">9999</text>

          <text x="195" y="146" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">IP 标识主机（哪栋楼）</text>
          <text x="195" y="160" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">端口标识进程（哪个房间）</text>
          <text x="195" y="178" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">两者组合唯一确定通信端点</text>

          {/* 右侧：字节序 */}
          <rect x="380" y="50" width="330" height="140" rx="10" fill="var(--danger)" fillOpacity="0.06" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="545" y="72" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--danger)">字节序：大端 vs 小端</text>

          <text x="400" y="94" fontSize="10" fill="var(--text-secondary)">值 0x12345678</text>
          <rect x="400" y="100" width="30" height="24" rx="3" fill="var(--success)" fillOpacity="0.15" stroke="var(--success)" strokeWidth="1" />
          <text x="415" y="116" textAnchor="middle" fontSize="9" fill="var(--success)">12</text>
          <rect x="430" y="100" width="30" height="24" rx="3" fill="var(--success)" fillOpacity="0.15" stroke="var(--success)" strokeWidth="1" />
          <text x="445" y="116" textAnchor="middle" fontSize="9" fill="var(--success)">34</text>
          <rect x="460" y="100" width="30" height="24" rx="3" fill="var(--success)" fillOpacity="0.15" stroke="var(--success)" strokeWidth="1" />
          <text x="475" y="116" textAnchor="middle" fontSize="9" fill="var(--success)">56</text>
          <rect x="490" y="100" width="30" height="24" rx="3" fill="var(--success)" fillOpacity="0.15" stroke="var(--success)" strokeWidth="1" />
          <text x="505" y="116" textAnchor="middle" fontSize="9" fill="var(--success)">78</text>
          <text x="535" y="116" fontSize="10" fill="var(--success)">大端序（网络）</text>

          <rect x="400" y="134" width="30" height="24" rx="3" fill="var(--warning)" fillOpacity="0.15" stroke="var(--warning)" strokeWidth="1" />
          <text x="415" y="150" textAnchor="middle" fontSize="9" fill="var(--warning)">78</text>
          <rect x="430" y="134" width="30" height="24" rx="3" fill="var(--warning)" fillOpacity="0.15" stroke="var(--warning)" strokeWidth="1" />
          <text x="445" y="150" textAnchor="middle" fontSize="9" fill="var(--warning)">56</text>
          <rect x="460" y="134" width="30" height="24" rx="3" fill="var(--warning)" fillOpacity="0.15" stroke="var(--warning)" strokeWidth="1" />
          <text x="475" y="150" textAnchor="middle" fontSize="9" fill="var(--warning)">34</text>
          <rect x="490" y="134" width="30" height="24" rx="3" fill="var(--warning)" fillOpacity="0.15" stroke="var(--warning)" strokeWidth="1" />
          <text x="505" y="150" textAnchor="middle" fontSize="9" fill="var(--warning)">12</text>
          <text x="535" y="150" fontSize="10" fill="var(--warning)">小端序（x86/ARM）</text>

          <text x="545" y="176" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">网络统一大端序，发送前用 htons/htonl 转换</text>

          {/* 下方：数据包结构 */}
          <rect x="30" y="210" width="680" height="80" rx="10" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="370" y="232" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">数据包（Packet）结构</text>

          <rect x="60" y="244" width="120" height="34" rx="5" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1" />
          <text x="120" y="265" textAnchor="middle" fontSize="10" fill="var(--success)">消息类型 (1B)</text>

          <rect x="180" y="244" width="120" height="34" rx="5" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1" />
          <text x="240" y="265" textAnchor="middle" fontSize="10" fill="var(--warning)">序号 (4B)</text>

          <rect x="300" y="244" width="160" height="34" rx="5" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1" />
          <text x="380" y="265" textAnchor="middle" fontSize="10" fill="var(--accent)">载荷数据 (变长)</text>

          <rect x="460" y="244" width="120" height="34" rx="5" fill="var(--danger)" fillOpacity="0.12" stroke="var(--danger)" strokeWidth="1" />
          <text x="520" y="265" textAnchor="middle" fontSize="10" fill="var(--danger)">校验 (可选)</text>

          {/* 底部提示 */}
          <text x={VIEW_W / 2} y="320" textAnchor="middle" fontSize="12" fill="var(--text-primary)">
            序列化原则：逐字段写入、统一大端序、不依赖内存对齐
          </text>
          <text x={VIEW_W / 2} y="340" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            WriteUint8 / WriteUint16 / WriteUint32 / WriteFloat
          </text>
          <text x={VIEW_W / 2} y="360" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">
            memcpy 结构体的陷阱：字节序不兼容 / 对齐填充不同 / 指针无意义
          </text>

          <text x={VIEW_W / 2} y="400" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            关键洞察：逐字段序列化是跨平台网络通信的地基
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        互联网协议基础——IP/端口寻址、大端序序列化与数据包结构
      </figcaption>
    </figure>
  );
}
