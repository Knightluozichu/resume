/**
 * <CseProtocolDesignDiagram>：协议帧结构与编解码流程图。
 *
 * 上半部分展示典型 TLV 协议帧的二进制布局：
 *   Magic(4B) | Length(4B) | Type(2B) | Payload(N B) | Checksum(4B)
 * 下半部分展示编解码流程：
 *   编码：结构体 → 序列化 → 字节流
 *   解码：字节流 → 反序列化 → 结构体（含粘包处理）
 *
 * 纯静态展示，无交互。Server Component。
 * viewBox 720×420，四周留白 ≥32，字号 ≥11。
 */

const VIEW_W = 720;
const VIEW_H = 420;

const FIELDS = [
  { name: "Magic", size: "4B", desc: "魔数", color: "var(--accent)", w: 60 },
  { name: "Length", size: "4B", desc: "负载长度", color: "var(--success)", w: 70 },
  { name: "Type", size: "2B", desc: "消息类型", color: "var(--warning)", w: 55 },
  { name: "Payload", size: "N B", desc: "业务数据", color: "var(--danger)", w: 200 },
  { name: "Checksum", size: "4B", desc: "校验和", color: "var(--accent)", w: 70 },
];

export function CseProtocolDesignDiagram() {
  let xCursor = 48;
  const fieldStarts = FIELDS.map((f) => {
    const start = xCursor;
    xCursor += f.w;
    return start;
  });

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="协议帧结构与编解码流程图。上半部分展示 TLV 协议帧二进制布局：Magic 4 字节、Length 4 字节、Type 2 字节、Payload N 字节、Checksum 4 字节。下半部分展示编码流程（结构体序列化为字节流）和解码流程（字节流反序列化为结构体，含粘包处理）。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* 标题 */}
          <text x={VIEW_W / 2} y="36" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            协议帧结构与编解码
          </text>
          <text x={VIEW_W / 2} y="58" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            定好帧格式，才能在字节流中切出完整消息
          </text>

          {/* ===== 上半：帧结构 ===== */}
          <text x="48" y="86" fontSize="13" fontWeight="700" fill="var(--text-primary)">协议帧二进制布局</text>

          {/* 字段方块 */}
          {FIELDS.map((f, i) => {
            const x = fieldStarts[i];
            return (
              <g key={f.name}>
                <rect x={x} y="96" width={f.w} height="48" rx="4" fill={f.color} fillOpacity="0.1" stroke={f.color} strokeWidth="1.2" />
                <text x={x + f.w / 2} y="116" textAnchor="middle" fontSize="12" fontWeight="700" fill={f.color}>{f.name}</text>
                <text x={x + f.w / 2} y="132" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">{f.size}</text>
              </g>
            );
          })}

          {/* 字段说明 */}
          {FIELDS.map((f, i) => {
            const x = fieldStarts[i];
            return (
              <text key={f.name} x={x + f.w / 2} y="162" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">{f.desc}</text>
            );
          })}

          {/* 字节流标注 */}
          <line x1="48" y1="178" x2={xCursor} y2="178" stroke="var(--border)" strokeWidth="0.8" strokeDasharray="4 3" />
          <text x={xCursor + 8} y="148" fontSize="11" fill="var(--text-secondary)">{`→ 大端序`}</text>

          {/* ===== 下半：编解码流程 ===== */}
          <text x="48" y="210" fontSize="13" fontWeight="700" fill="var(--text-primary)">编解码流程</text>

          {/* 编码流程 */}
          <rect x="48" y="222" width="100" height="36" rx="8" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="98" y="245" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">结构体</text>

          <line x1="150" y1="240" x2="186" y2="240" stroke="var(--text-secondary)" strokeWidth="1.2" markerEnd="url(#pd-arrow)" />
          <text x="168" y="232" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">序列化</text>

          <rect x="188" y="222" width="100" height="36" rx="8" fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" strokeWidth="1.2" />
          <text x="238" y="245" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">字节流</text>

          <line x1="290" y1="240" x2="326" y2="240" stroke="var(--text-secondary)" strokeWidth="1.2" markerEnd="url(#pd-arrow)" />
          <text x="308" y="232" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">发送</text>

          <rect x="328" y="222" width="100" height="36" rx="8" fill="var(--warning)" fillOpacity="0.08" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="378" y="245" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">网络</text>

          {/* 解码流程 */}
          <rect x="48" y="278" width="100" height="36" rx="8" fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" strokeWidth="1.2" />
          <text x="98" y="301" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">字节流</text>

          <line x1="150" y1="296" x2="186" y2="296" stroke="var(--text-secondary)" strokeWidth="1.2" markerEnd="url(#pd-arrow)" />
          <text x="168" y="288" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">粘包处理</text>

          <rect x="188" y="278" width="100" height="36" rx="8" fill="var(--warning)" fillOpacity="0.08" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="238" y="301" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">完整帧</text>

          <line x1="290" y1="296" x2="326" y2="296" stroke="var(--text-secondary)" strokeWidth="1.2" markerEnd="url(#pd-arrow)" />
          <text x="308" y="288" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">反序列化</text>

          <rect x="328" y="278" width="100" height="36" rx="8" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="378" y="301" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">结构体</text>

          {/* 粘包说明 */}
          <rect x="460" y="222" width="220" height="92" rx="10" fill="var(--danger)" fillOpacity="0.05" stroke="var(--danger)" strokeWidth="1" strokeOpacity="0.4" />
          <text x="570" y="242" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--danger)">粘包问题</text>
          <text x="470" y="260" fontSize="11" fill="var(--text-secondary)">TCP 是字节流，没有消息边界</text>
          <text x="470" y="276" fontSize="11" fill="var(--text-secondary)">一次 read 可能收到：</text>
          <text x="470" y="292" fontSize="11" fill="var(--text-secondary)">- 半条消息（需等下次 read）</text>
          <text x="470" y="308" fontSize="11" fill="var(--text-secondary)">- 多条消息（需切割）</text>

          {/* 箭头标记 */}
          <defs>
            <marker id="pd-arrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
              <path d="M0,0 L6,4 L0,8" fill="none" stroke="var(--text-secondary)" strokeWidth="1.2" />
            </marker>
          </defs>

          {/* 底部总结 */}
          <rect x="60" y="338" width={VIEW_W - 120} height="52" rx="10" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x={VIEW_W / 2} y="358" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--text-primary)">协议设计核心</text>
          <text x={VIEW_W / 2} y="378" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">Length 字段是粘包的解药：先读长度，再按长度读负载，不够就等下次</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        协议帧用固定头 + 变长负载的结构。Magic 防误判，Length 解决粘包，Type 区分消息类型，Checksum 保证完整性。解码时先读头部，按 Length 读负载，不够则缓存等下次。
      </figcaption>
    </figure>
  );
}
