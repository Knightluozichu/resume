/**
 * <NdgEventLoopDiagram>：Node.js 事件循环六阶段图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 480;

export function NdgEventLoopDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Node.js事件循环六阶段图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            Node.js 事件循环六阶段
          </text>
          <text x={VIEW_W / 2} y="48" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            timers → pending callbacks → idle/prepare → poll → check → close callbacks
          </text>

          {/* 微任务入口标注 */}
          <rect x="30" y="62" width="680" height="28" rx="6" fill="var(--warning)" fillOpacity="0.1" stroke="var(--warning)" strokeWidth="1" strokeOpacity="0.4" />
          <text x={VIEW_W / 2} y="80" textAnchor="middle" fontSize="11" fill="var(--warning)">
            每个阶段切换之间：清空微任务队列（process.nextTick 优先于 Promise.then）
          </text>

          {/* 六阶段环形 */}
          {(() => {
            const cx = 370;
            const cy = 280;
            const r = 120;
            const stages = [
              { name: "timers", desc: "setTimeout/setInterval", color: "var(--success)" },
              { name: "pending\ncallbacks", desc: "系统级回调", color: "var(--accent)" },
              { name: "idle/prepare", desc: "内部使用", color: "var(--text-tertiary)" },
              { name: "poll", desc: "I/O 事件轮询", color: "var(--warning)" },
              { name: "check", desc: "setImmediate", color: "var(--danger)" },
              { name: "close\ncallbacks", desc: "close 事件", color: "var(--accent)" },
            ];
            return stages.map((s, i) => {
              const angle = (i * 60 - 90) * (Math.PI / 180);
              const x = cx + r * Math.cos(angle);
              const y = cy + r * Math.sin(angle);
              return (
                <g key={i}>
                  <circle cx={x} cy={y} r="42" fill={s.color} fillOpacity="0.12" stroke={s.color} strokeWidth="1.5" />
                  <text x={x} y={y - 4} textAnchor="middle" fontSize="10" fontWeight="600" fill={s.color}>{s.name}</text>
                  <text x={x} y={y + 10} textAnchor="middle" fontSize="8" fill="var(--text-secondary)">{s.desc}</text>
                </g>
              );
            });
          })()}

          {/* 中心 */}
          <circle cx="370" cy="280" r="50" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="1.5" />
          <text x="370" y="274" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--accent)">事件循环</text>
          <text x="370" y="290" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">Event Loop</text>

          {/* 箭头环 */}
          <path d="M 370 140 A 140 140 0 0 1 490 210" fill="none" stroke="var(--accent)" strokeWidth="1.5" markerEnd="url(#arr)" opacity="0.5" />
          <path d="M 490 350 A 140 140 0 0 1 370 420" fill="none" stroke="var(--accent)" strokeWidth="1.5" markerEnd="url(#arr)" opacity="0.5" />
          <path d="M 250 350 A 140 140 0 0 1 250 210" fill="none" stroke="var(--accent)" strokeWidth="1.5" markerEnd="url(#arr)" opacity="0.5" />
          <defs>
            <marker id="arr" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill="var(--accent)" opacity="0.5" />
            </marker>
          </defs>

          {/* 左侧：宏任务队列 */}
          <rect x="40" y="160" width="130" height="80" rx="8" fill="var(--danger)" fillOpacity="0.1" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="105" y="180" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--danger)">宏任务队列</text>
          <text x="105" y="198" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">setTimeout 回调</text>
          <text x="105" y="212" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">setImmediate 回调</text>
          <text x="105" y="226" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">I/O 回调</text>

          {/* 右侧：微任务队列 */}
          <rect x="570" y="160" width="130" height="80" rx="8" fill="var(--success)" fillOpacity="0.1" stroke="var(--success)" strokeWidth="1.2" />
          <text x="635" y="180" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">微任务队列</text>
          <text x="635" y="198" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">process.nextTick</text>
          <text x="635" y="212" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">Promise.then</text>
          <text x="635" y="226" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">queueMicrotask</text>

          {/* 底部说明 */}
          <text x={VIEW_W / 2} y="440" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            关键：poll 阶段阻塞等待 I/O；无 I/O 时检查 timers 是否到期决定是否阻塞
          </text>
          <text x={VIEW_W / 2} y="458" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">
            微任务在每阶段切换间清空，nextTick 优先级 &gt; Promise
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        事件循环六阶段——timers、pending callbacks、idle/prepare、poll、check、close callbacks 的调度流程
      </figcaption>
    </figure>
  );
}
