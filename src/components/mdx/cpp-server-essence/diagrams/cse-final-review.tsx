/**
 * <CseFinalReviewDiagram>：全书知识体系总览思维导图。
 *
 * 中心节点「C++ 服务器」向外辐射四大分支：
 *   1. IO 模型（阻塞/非阻塞/多路复用/异步）
 *   2. 事件架构（Reactor/Proactor/线程池）
 *   3. 并发数据（连接管理/缓冲区/协议）
 *   4. 工程实践（定时器/性能调优/监控）
 * 每个分支列出核心知识点，用颜色区分板块。
 *
 * 纯静态展示，无交互。Server Component。
 * viewBox 720×420，四周留白 ≥32，字号 ≥11。
 */

const VIEW_W = 720;
const VIEW_H = 420;

const BRANCHES = [
  {
    name: "IO 模型",
    color: "var(--accent)",
    cx: 180,
    cy: 110,
    items: ["阻塞/非阻塞", "IO 多路复用", "epoll", "异步 IO"],
  },
  {
    name: "事件架构",
    color: "var(--success)",
    cx: 540,
    cy: 110,
    items: ["Reactor", "Proactor", "线程池", "任务队列"],
  },
  {
    name: "并发数据",
    color: "var(--warning)",
    cx: 180,
    cy: 320,
    items: ["连接管理", "缓冲区", "协议设计", "粘包处理"],
  },
  {
    name: "工程实践",
    color: "var(--danger)",
    cx: 540,
    cy: 320,
    items: ["时间轮", "性能调优", "火焰图", "监控告警"],
  },
];

export function CseFinalReviewDiagram() {
  const centerX = VIEW_W / 2;
  const centerY = VIEW_H / 2;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="C++ 服务器开发精髓全书知识体系总览。中心节点 C++ 服务器向外辐射四大分支：IO 模型（阻塞非阻塞、IO 多路复用、epoll、异步 IO）、事件架构（Reactor、Proactor、线程池、任务队列）、并发数据（连接管理、缓冲区、协议设计、粘包处理）、工程实践（时间轮、性能调优、火焰图、监控告警）。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* 标题 */}
          <text x={VIEW_W / 2} y="36" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            C++ 服务器开发 · 知识体系总览
          </text>
          <text x={VIEW_W / 2} y="58" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            四大板块串成一条线：数据怎么进来 → 怎么处理 → 怎么管理 → 怎么调优
          </text>

          {/* 中心节点 */}
          <circle cx={centerX} cy={centerY} r="44" fill="var(--accent)" fillOpacity="0.1" stroke="var(--accent)" strokeWidth="1.8" />
          <text x={centerX} y={centerY - 4} textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--accent)">C++</text>
          <text x={centerX} y={centerY + 12} textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--accent)">服务器</text>

          {/* 分支连接线 */}
          {BRANCHES.map((b) => (
            <line key={b.name} x1={centerX} y1={centerY} x2={b.cx} y2={b.cy} stroke="var(--border)" strokeWidth="1.2" strokeDasharray="4 3" />
          ))}

          {/* 四大分支 */}
          {BRANCHES.map((b) => (
            <g key={b.name}>
              {/* 分支标题节点 */}
              <rect x={b.cx - 60} y={b.cy - 16} width="120" height="32" rx="8" fill={b.color} fillOpacity="0.12" stroke={b.color} strokeWidth="1.4" />
              <text x={b.cx} y={b.cy + 4} textAnchor="middle" fontSize="13" fontWeight="700" fill={b.color}>{b.name}</text>

              {/* 子节点 */}
              {b.items.map((item, i) => {
                const offsetX = b.cx < centerX ? -1 : 1;
                const offsetY = i < 2 ? -1 : 1;
                const ix = b.cx + offsetX * (78 + (i % 2) * 0);
                const iy = b.cy + offsetY * (28 + (i % 2) * 24) - (i < 2 ? 14 : -14);
                return (
                  <g key={item}>
                    <line x1={b.cx + offsetX * 60} y1={b.cy} x2={ix - offsetX * 8} y2={iy} stroke={b.color} strokeWidth="0.8" strokeOpacity="0.5" />
                    <rect x={ix - 48} y={iy - 11} width="96" height="22" rx="5" fill="var(--bg)" stroke={b.color} strokeWidth="0.8" strokeOpacity="0.4" />
                    <text x={ix} y={iy + 4} textAnchor="middle" fontSize="11" fill="var(--text-secondary)">{item}</text>
                  </g>
                );
              })}
            </g>
          ))}

          {/* 底部总结 */}
          <rect x="60" y="386" width={VIEW_W - 120} height="24" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.4" />
          <text x={VIEW_W / 2} y="402" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            IO 模型决定「怎么等数据」→ 事件架构决定「怎么处理」→ 并发数据决定「怎么管理」→ 工程实践决定「怎么调优」
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        全书知识体系：IO 模型是地基，事件架构是骨架，并发数据是血肉，工程实践是体检。四者构成高性能 C++ 服务器的完整图景。
      </figcaption>
    </figure>
  );
}
