/**
 * <UcnFinalReviewDiagram>：全书总复习——知识图谱与消息旅程图解。
 * 纯静态展示，无交互。Server Component。
 */

const VIEW_W = 740;
const VIEW_H = 460;

export function UcnFinalReviewDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Unity 与 C++ 网络游戏开发实战 全书总复习知识图谱"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="30" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            全书知识图谱：一条消息的完整旅程
          </text>

          {/* 消息旅程主线 */}
          <rect x="30" y="50" width="680" height="50" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.3" />
          <text x="370" y="80" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">玩家点击技能 → 客户端封包 → C++ 服务器收包 → 路由分发 → 逻辑处理 → 广播 → Unity 渲染</text>

          {/* 四层架构 */}
          <text x="370" y="120" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--text-secondary)">四层架构与对应章节</text>

          {/* 层 1: C++ 服务器基础 */}
          <rect x="30" y="135" width="680" height="65" rx="8" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="50" y="155" fontSize="11" fontWeight="700" fill="var(--success)">① 服务器 I/O 层</text>
          <rect x="180" y="145" width="120" height="22" rx="4" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="0.8" />
          <text x="240" y="160" textAnchor="middle" fontSize="9" fill="var(--success)">epoll/IOCP 事件循环</text>
          <rect x="310" y="145" width="120" height="22" rx="4" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="0.8" />
          <text x="370" y="160" textAnchor="middle" fontSize="9" fill="var(--success)">Socket 收发</text>
          <rect x="440" y="145" width="120" height="22" rx="4" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="0.8" />
          <text x="500" y="160" textAnchor="middle" fontSize="9" fill="var(--success)">环形缓冲区拆包</text>
          <text x="50" y="185" fontSize="9" fill="var(--text-tertiary)">对应章节：C++ 服务器基础 · Socket 编程与缓冲区设计</text>

          {/* 层 2: 协议与路由 */}
          <rect x="30" y="210" width="680" height="65" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="50" y="230" fontSize="11" fontWeight="700" fill="var(--accent)">② 协议与路由层</text>
          <rect x="180" y="220" width="120" height="22" rx="4" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="0.8" />
          <text x="240" y="235" textAnchor="middle" fontSize="9" fill="var(--accent)">Protobuf 序列化</text>
          <rect x="310" y="220" width="120" height="22" rx="4" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="0.8" />
          <text x="370" y="235" textAnchor="middle" fontSize="9" fill="var(--accent)">MsgId 消息号</text>
          <rect x="440" y="220" width="120" height="22" rx="4" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="0.8" />
          <text x="500" y="235" textAnchor="middle" fontSize="9" fill="var(--accent)">Handler 路由派发</text>
          <text x="50" y="260" fontSize="9" fill="var(--text-tertiary)">对应章节：Protobuf 协议设计 · 消息路由与分发</text>

          {/* 层 3: Unity 客户端 */}
          <rect x="30" y="285" width="680" height="65" rx="8" fill="var(--warning)" fillOpacity="0.06" stroke="var(--warning)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="50" y="305" fontSize="11" fontWeight="700" fill="var(--warning)">③ Unity 客户端层</text>
          <rect x="180" y="295" width="120" height="22" rx="4" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="0.8" />
          <text x="240" y="310" textAnchor="middle" fontSize="9" fill="var(--warning)">P/Invoke 桥接</text>
          <rect x="310" y="295" width="120" height="22" rx="4" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="0.8" />
          <text x="370" y="310" textAnchor="middle" fontSize="9" fill="var(--warning)">连接状态机</text>
          <rect x="440" y="295" width="120" height="22" rx="4" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="0.8" />
          <text x="500" y="310" textAnchor="middle" fontSize="9" fill="var(--warning)">心跳/重连</text>
          <text x="50" y="335" fontSize="9" fill="var(--text-tertiary)">对应章节：Unity 客户端集成 · 网络框架设计</text>

          {/* 层 4: 玩法系统 */}
          <rect x="30" y="360" width="680" height="65" rx="8" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="50" y="380" fontSize="11" fontWeight="700" fill="var(--success)">④ 玩法同步层</text>
          <rect x="180" y="370" width="120" height="22" rx="4" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="0.8" />
          <text x="240" y="385" textAnchor="middle" fontSize="9" fill="var(--success)">预测-校正循环</text>
          <rect x="310" y="370" width="120" height="22" rx="4" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="0.8" />
          <text x="370" y="385" textAnchor="middle" fontSize="9" fill="var(--success)">插值平滑</text>
          <rect x="440" y="370" width="120" height="22" rx="4" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="0.8" />
          <text x="500" y="385" textAnchor="middle" fontSize="9" fill="var(--success)">房间匹配</text>
          <text x="50" y="410" fontSize="9" fill="var(--text-tertiary)">对应章节：实时同步与插值预测 · 房间管理与匹配系统</text>

          <text x={VIEW_W / 2} y="445" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">核心洞察：每一层解决一个关键问题——I/O（怎么收发）→ 协议（怎么编码）→ 客户端（怎么接入）→ 玩法（怎么同步）</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        全书总复习——四层架构对应十章知识点，以一条消息的旅程串联全书
      </figcaption>
    </figure>
  );
}
