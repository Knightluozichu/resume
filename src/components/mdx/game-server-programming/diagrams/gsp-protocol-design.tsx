/**
 * <GspProtocolDesignDiagram>：网络协议封包/解包与序列化图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 420;

export function GspProtocolDesignDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="网络协议封包解包与序列化图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="30" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            消息封包格式与收发流程
          </text>

          {/* 封包结构 */}
          <text x={VIEW_W / 2} y="58" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">
            封包结构（Length-Prefixed）
          </text>

          <rect x="80" y="72" width="160" height="44" rx="6" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="160" y="92" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">魔数 (2B)</text>
          <text x="160" y="106" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">校验合法性</text>

          <rect x="240" y="72" width="160" height="44" rx="6" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="320" y="92" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">长度 (4B)</text>
          <text x="320" y="106" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">消息体字节数</text>

          <rect x="400" y="72" width="160" height="44" rx="6" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="480" y="92" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">消息ID (2B)</text>
          <text x="480" y="106" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">路由到处理函数</text>

          <rect x="560" y="72" width="120" height="44" rx="6" fill="var(--text-tertiary)" fillOpacity="0.15" stroke="var(--text-tertiary)" strokeWidth="1.2" />
          <text x="620" y="92" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">消息体 (NB)</text>
          <text x="620" y="106" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">序列化数据</text>

          {/* 箭头流向 */}
          <text x="160" y="140" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>
          <text x="320" y="140" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>
          <text x="480" y="140" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>
          <text x="620" y="140" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>

          {/* 发送端 */}
          <text x={VIEW_W / 2} y="172" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">
            发送端流程
          </text>
          <rect x="60" y="184" width="140" height="36" rx="6" fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" strokeWidth="1" />
          <text x="130" y="206" textAnchor="middle" fontSize="11" fill="var(--success)">结构体对象</text>

          <text x="220" y="206" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="240" y="184" width="140" height="36" rx="6" fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" strokeWidth="1" />
          <text x="310" y="206" textAnchor="middle" fontSize="11" fill="var(--success)">序列化</text>

          <text x="400" y="206" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="420" y="184" width="140" height="36" rx="6" fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" strokeWidth="1" />
          <text x="490" y="206" textAnchor="middle" fontSize="11" fill="var(--success)">拼包头</text>

          <text x="580" y="206" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="600" y="184" width="100" height="36" rx="6" fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" strokeWidth="1" />
          <text x="650" y="206" textAnchor="middle" fontSize="11" fill="var(--success)">send()</text>

          {/* 接收端 */}
          <text x={VIEW_W / 2} y="252" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">
            接收端流程
          </text>
          <rect x="60" y="264" width="140" height="36" rx="6" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="1" />
          <text x="130" y="286" textAnchor="middle" fontSize="11" fill="var(--accent)">recv() 环形缓冲</text>

          <text x="220" y="286" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="240" y="264" width="140" height="36" rx="6" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="1" />
          <text x="310" y="286" textAnchor="middle" fontSize="11" fill="var(--accent)">读包头</text>

          <text x="400" y="286" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="420" y="264" width="140" height="36" rx="6" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="1" />
          <text x="490" y="286" textAnchor="middle" fontSize="11" fill="var(--accent)">按长度切包</text>

          <text x="580" y="286" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="600" y="264" width="100" height="36" rx="6" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="1" />
          <text x="650" y="286" textAnchor="middle" fontSize="11" fill="var(--accent)">反序列化</text>

          {/* 序列化对比 */}
          <text x={VIEW_W / 2} y="332" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--warning)">
            序列化方案对比
          </text>
          <rect x="60" y="344" width="200" height="40" rx="6" fill="var(--warning)" fillOpacity="0.08" stroke="var(--warning)" strokeWidth="1" />
          <text x="160" y="360" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">JSON</text>
          <text x="160" y="376" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">可读性好，体积大，解析慢</text>

          <rect x="280" y="344" width="200" height="40" rx="6" fill="var(--warning)" fillOpacity="0.08" stroke="var(--warning)" strokeWidth="1" />
          <text x="380" y="360" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">Protobuf</text>
          <text x="380" y="376" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">体积小，速度快，需 schema</text>

          <rect x="500" y="344" width="200" height="40" rx="6" fill="var(--warning)" fillOpacity="0.08" stroke="var(--warning)" strokeWidth="1" />
          <text x="600" y="360" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">自定义二进制</text>
          <text x="600" y="376" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">极致性能，手动维护编解码</text>

          <text x={VIEW_W / 2} y="408" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            关键：长度前缀法解决粘包，消息ID 路由到处理函数，序列化决定带宽与性能
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        消息封包格式与收发流程——从结构体到字节流再到结构体的完整旅程
      </figcaption>
    </figure>
  );
}
