/**
 * <NetworkProtocolStack>：网络协议分层图 + 消息包结构
 *
 * 左侧：TCP/IP四层模型（应用层→传输层→网络层→链路层），标注游戏常用协议
 * 右侧：消息包结构（包头[长度|消息ID|序列号|时间戳] + 包体[Protobuf/JSON] + 校验）
 * 底部：TCP/UDP对比要点
 */

const VIEW_W = 780;
const VIEW_H = 480;

type Layer = {
  name: string;
  en: string;
  color: string;
  protocols: string[];
  desc: string;
};

const LAYERS: readonly Layer[] = [
  {
    name: "应用层",
    en: "Application",
    color: "var(--accent)",
    protocols: ["Protobuf", "JSON", "HTTP/WebSocket", "自定义协议"],
    desc: "游戏消息·登录·战斗·聊天",
  },
  {
    name: "传输层",
    en: "Transport",
    color: "var(--success)",
    protocols: ["TCP", "UDP", "KCP/ENet(可靠UDP)"],
    desc: "可靠/不可靠传输·端口寻址",
  },
  {
    name: "网络层",
    en: "Network",
    color: "var(--warning)",
    protocols: ["IP", "ICMP"],
    desc: "IP寻址·路由选择·分片",
  },
  {
    name: "链路层",
    en: "Link",
    color: "var(--text-secondary)",
    protocols: ["Ethernet", "Wi-Fi", "4G/5G"],
    desc: "物理帧传输·MAC寻址",
  },
];

function layerY(i: number) {
  return 80 + i * 80;
}

export function NetworkProtocolStack() {
  return (
    <div className="my-8 w-full overflow-x-auto">
      <svg
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        className="mx-auto w-full max-w-[780px]"
        style={{ minWidth: 600 }}
        role="img"
        aria-label="网络协议分层与消息包结构"
      >
        <rect x="0" y="0" width={VIEW_W} height={VIEW_H} fill="var(--bg-elevated)" rx="12" />

        {/* 标题 */}
        <text x={VIEW_W / 2} y={30} textAnchor="middle" fill="var(--text-primary)" fontSize="17" fontWeight="600" fontFamily="system-ui">
          网络协议栈与消息包结构
        </text>
        <text x={VIEW_W / 2} y={48} textAnchor="middle" fill="var(--text-secondary)" fontSize="11" fontFamily="system-ui">
          自上而下封装：应用数据→传输段→IP包→链路帧
        </text>

        {/* 左侧：协议分层 */}
        <g>
          <text x={165} y={68} textAnchor="middle" fill="var(--text-primary)" fontSize="12" fontWeight="600" fontFamily="system-ui">TCP/IP 四层模型</text>
          {LAYERS.map((layer, i) => {
            const y = layerY(i);
            return (
              <g key={layer.name}>
                <rect x={30} y={y} width={270} height={68} fill="var(--bg)" stroke={layer.color} strokeWidth="1.5" rx="6" />
                <rect x={30} y={y} width={5} height={68} fill={layer.color} rx="2" />
                <text x={48} y={y + 22} fill={layer.color} fontSize="14" fontWeight="600" fontFamily="system-ui">
                  {layer.name}
                </text>
                <text x={120} y={y + 22} fill="var(--text-secondary)" fontSize="10" fontFamily="Inter, system-ui">
                  {layer.en}
                </text>
                <text x={48} y={y + 40} fill="var(--text-secondary)" fontSize="10" fontFamily="system-ui">
                  {layer.desc}
                </text>
                {/* 协议标签 */}
                {layer.protocols.map((p, pi) => {
                  const tw = Math.max(p.length * 10 + 10, 40);
                  const tx = 48 + pi * 85;
                  return (
                    <g key={p}>
                      <rect x={tx} y={y + 46} width={tw} height={16} fill={layer.color} fillOpacity="0.1" stroke={layer.color} strokeWidth="0.5" strokeOpacity="0.4" rx="3" />
                      <text x={tx + tw / 2} y={y + 58} textAnchor="middle" fill="var(--text-primary)" fontSize="9" fontFamily="system-ui">
                        {p}
                      </text>
                    </g>
                  );
                })}
                {/* 向下箭头 */}
                {i < LAYERS.length - 1 && (
                  <path d={`M 165 ${y + 70} L 165 ${y + 78}`} stroke="var(--border)" strokeWidth="1.5" fill="none" markerEnd="url(#nps-arrow)" />
                )}
              </g>
            );
          })}
        </g>

        {/* 右侧：消息包结构 */}
        <g>
          <text x={545} y={68} textAnchor="middle" fill="var(--text-primary)" fontSize="12" fontWeight="600" fontFamily="system-ui">游戏消息包结构</text>

          {/* 完整包外框 */}
          <rect x={340} y={80} width={410} height={200} fill="var(--bg)" stroke="var(--border)" strokeWidth="1.5" rx="8" />

          {/* 包头 */}
          <rect x={350} y={92} width={390} height={60} fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="1" strokeDasharray="4 3" rx="4" />
          <text x={362} y={108} fill="var(--accent)" fontSize="11" fontWeight="600" fontFamily="system-ui">包头 Header</text>

          {[
            { label: "长度", w: 60, bits: "2B" },
            { label: "消息ID", w: 70, bits: "2B" },
            { label: "序列号", w: 70, bits: "4B" },
            { label: "时间戳", w: 70, bits: "4B" },
          ].map((f, fi) => {
            const fx = 360 + fi * 95;
            return (
              <g key={f.label}>
                <rect x={fx} y={116} width={f.w} height={28} fill="var(--bg-elevated)" stroke="var(--accent)" strokeWidth="0.8" rx="3" />
                <text x={fx + f.w / 2} y={130} textAnchor="middle" fill="var(--text-primary)" fontSize="9" fontWeight="500" fontFamily="system-ui">{f.label}</text>
                <text x={fx + f.w / 2} y={141} textAnchor="middle" fill="var(--text-secondary)" fontSize="8" fontFamily="JetBrains Mono, monospace">{f.bits}</text>
              </g>
            );
          })}

          {/* 包体 */}
          <rect x={350} y={162} width={280} height={60} fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" strokeWidth="1" rx="4" />
          <text x={362} y={178} fill="var(--success)" fontSize="11" fontWeight="600" fontFamily="system-ui">包体 Body（Protobuf/JSON 序列化）</text>
          <text x={490} y={200} textAnchor="middle" fill="var(--text-secondary)" fontSize="10" fontFamily="system-ui">业务数据·变长·最大受MTU限制</text>

          {/* 校验 */}
          <rect x={640} y={162} width={100} height={60} fill="var(--warning)" fillOpacity="0.08" stroke="var(--warning)" strokeWidth="1" rx="4" />
          <text x={690} y={185} textAnchor="middle" fill="var(--warning)" fontSize="10" fontWeight="600" fontFamily="system-ui">校验</text>
          <text x={690} y={202} textAnchor="middle" fill="var(--text-secondary)" fontSize="9" fontFamily="JetBrains Mono, monospace">CRC32/MD5</text>
          <text x={690} y={214} textAnchor="middle" fill="var(--text-secondary)" fontSize="8" fontFamily="system-ui">4B</text>

          {/* 箭头：封装方向 */}
          <path d="M 545 290 L 545 310" stroke="var(--border)" strokeWidth="1.5" fill="none" markerEnd="url(#nps-arrow)" />
          <text x={560} y={304} fill="var(--text-secondary)" fontSize="9" fontFamily="system-ui">发送时封装 / 接收时解包</text>

          {/* TCP vs UDP 对比 */}
          <rect x={340} y={320} width={410} height={120} fill="var(--bg)" stroke="var(--border)" strokeWidth="1" rx="6" />
          <text x={545} y={338} textAnchor="middle" fill="var(--text-primary)" fontSize="11" fontWeight="600" fontFamily="system-ui">TCP vs UDP 选择</text>

          <rect x={355} y={348} width={185} height={80} fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="0.8" rx="4" />
          <text x={447} y={364} textAnchor="middle" fill="var(--success)" fontSize="10" fontWeight="600" fontFamily="system-ui">TCP（可靠·面向连接）</text>
          <text x={365} y={380} fill="var(--text-secondary)" fontSize="9" fontFamily="system-ui">· 三次握手·有序·不丢包</text>
          <text x={365} y={393} fill="var(--text-secondary)" fontSize="9" fontFamily="system-ui">· 拥塞控制·Nagle延迟</text>
          <text x={365} y={406} fill="var(--text-secondary)" fontSize="9" fontFamily="system-ui">· 登录/聊天/回合制游戏</text>
          <text x={365} y={419} fill="var(--text-secondary)" fontSize="9" fontFamily="system-ui">· 粘包问题需自行拆包</text>

          <rect x={555} y={348} width={180} height={80} fill="var(--danger)" fillOpacity="0.06" stroke="var(--danger)" strokeWidth="0.8" rx="4" />
          <text x={645} y={364} textAnchor="middle" fill="var(--danger)" fontSize="10" fontWeight="600" fontFamily="system-ui">UDP（不可靠·无连接）</text>
          <text x={565} y={380} fill="var(--text-secondary)" fontSize="9" fontFamily="system-ui">· 无握手·无序·可能丢包</text>
          <text x={565} y={393} fill="var(--text-secondary)" fontSize="9" fontFamily="system-ui">· 低延迟·无拥塞控制</text>
          <text x={565} y={406} fill="var(--text-secondary)" fontSize="9" fontFamily="system-ui">· MOBA/FPS/动作游戏</text>
          <text x={565} y={419} fill="var(--text-secondary)" fontSize="9" fontFamily="system-ui">· 需可靠UDP(KCP/ENet)</text>
        </g>

        <defs>
          <marker id="nps-arrow" markerWidth="7" markerHeight="6" refX="7" refY="3" orient="auto">
            <polygon points="0 0, 7 3, 0 6" fill="var(--border)" />
          </marker>
        </defs>
      </svg>
    </div>
  );
}
