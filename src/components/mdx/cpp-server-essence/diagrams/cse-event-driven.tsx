/**
 * <CseEventDrivenDiagram>：Reactor 事件驱动架构图。
 *
 * 展示 Reactor 模式的核心结构：事件源（fd）→ 多路分离器（epoll）→ 
 * 事件分发器（Reactor）→ 事件处理器（Handler）。
 * 上方为 epoll 事件循环，下方为分发表：读事件→读处理器，写事件→写处理器。
 *
 * 纯静态展示，无交互。Server Component。
 * viewBox 720×420，四周留白 ≥32，字号 ≥11。
 */

const VIEW_W = 720;
const VIEW_H = 420;

export function CseEventDrivenDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Reactor 事件驱动架构图。事件源（多个文件描述符 fd）流入 epoll 多路分离器，Reactor 分发器将事件分发给对应的处理器：读事件给读处理器，写事件给写处理器，定时事件给定时处理器。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* 标题 */}
          <text x={VIEW_W / 2} y="36" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            Reactor 事件驱动架构
          </text>
          <text x={VIEW_W / 2} y="58" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            事件源 → 多路分离 → 分发 → 处理，一个线程处理多个连接
          </text>

          {/* 事件源（3 个 fd） */}
          {["fd 1（连接）", "fd 2（读）", "fd 3（写）"].map((label, i) => {
            const x = 80 + i * 120;
            return (
              <g key={label}>
                <rect x={x} y="90" width="100" height="36" rx="8" fill="var(--bg)" stroke="var(--border)" strokeWidth="1.2" />
                <text x={x + 50} y="113" textAnchor="middle" fontSize="11" fill="var(--text-primary)">{label}</text>
              </g>
            );
          })}

          {/* 箭头：fd → epoll */}
          {[140, 260, 380].map((x) => (
            <g key={x}>
              <line x1={x} y1="126" x2={x} y2="156" stroke="var(--text-secondary)" strokeWidth="1.4" markerEnd="url(#arrow-down)" />
            </g>
          ))}

          {/* epoll 多路分离器 */}
          <rect x="80" y="160" width="400" height="44" rx="10" fill="var(--accent)" fillOpacity="0.1" stroke="var(--accent)" strokeWidth="1.4" />
          <text x="280" y="178" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--accent)">epoll 多路分离器</text>
          <text x="280" y="195" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">epoll_wait() 返回就绪 fd 列表</text>

          {/* 箭头：epoll → Reactor */}
          <line x1="280" y1="204" x2="280" y2="232" stroke="var(--text-secondary)" strokeWidth="1.4" markerEnd="url(#arrow-down)" />

          {/* Reactor 分发器 */}
          <rect x="160" y="236" width="240" height="40" rx="10" fill="var(--warning)" fillOpacity="0.1" stroke="var(--warning)" strokeWidth="1.4" />
          <text x="280" y="261" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--warning)">Reactor 事件分发器</text>

          {/* 分发箭头 */}
          <line x1="230" y1="276" x2="130" y2="306" stroke="var(--text-secondary)" strokeWidth="1.4" markerEnd="url(#arrow-down)" />
          <line x1="280" y1="276" x2="280" y2="306" stroke="var(--text-secondary)" strokeWidth="1.4" markerEnd="url(#arrow-down)" />
          <line x1="330" y1="276" x2="430" y2="306" stroke="var(--text-secondary)" strokeWidth="1.4" markerEnd="url(#arrow-down)" />

          {/* 处理器 */}
          <rect x="60" y="310" width="140" height="44" rx="8" fill="var(--success)" fillOpacity="0.1" stroke="var(--success)" strokeWidth="1.2" />
          <text x="130" y="328" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">读处理器</text>
          <text x="130" y="344" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">handle_read()</text>

          <rect x="210" y="310" width="140" height="44" rx="8" fill="var(--success)" fillOpacity="0.1" stroke="var(--success)" strokeWidth="1.2" />
          <text x="280" y="328" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">写处理器</text>
          <text x="280" y="344" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">handle_write()</text>

          <rect x="360" y="310" width="140" height="44" rx="8" fill="var(--success)" fillOpacity="0.1" stroke="var(--success)" strokeWidth="1.2" />
          <text x="430" y="328" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">定时处理器</text>
          <text x="430" y="344" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">handle_timeout()</text>

          {/* 右侧注释 */}
          <rect x="540" y="236" width="140" height="56" rx="8" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
          <text x="610" y="256" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">事件循环</text>
          <text x="610" y="272" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">while(true)</text>
          <text x="610" y="286" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">{`{ dispatch() }`}</text>

          {/* 箭头标记定义 */}
          <defs>
            <marker id="arrow-down" markerWidth="8" markerHeight="8" refX="4" refY="6" orient="auto">
              <path d="M1,1 L4,6 L7,1" fill="none" stroke="var(--text-secondary)" strokeWidth="1.2" />
            </marker>
          </defs>

          {/* 底部总结 */}
          <text x={VIEW_W / 2} y="388" textAnchor="middle" fontSize="12" fill="var(--text-primary)">
            <tspan fontWeight="700" fill="var(--accent)">核心思想</tspan>
            <tspan>{"　"}</tspan>
            <tspan>不要等一个连接，而是同时监听所有连接，谁就绪就处理谁</tspan>
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Reactor 模式用 epoll 同时监听多个 fd，事件就绪后由分发器调用对应处理器。单线程即可管理数万连接，是高性能服务器的基石。
      </figcaption>
    </figure>
  );
}
