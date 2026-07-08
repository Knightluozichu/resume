/**
 * <DnjEventLoopAdvDiagram>：事件循环进阶图解（六阶段 / nextTick 优先级）。
 * 纯静态展示，无交互。Server Component。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 480;

export function DnjEventLoopAdvDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="事件循环进阶与微任务优先级图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            事件循环进阶：六阶段调度 + 微任务优先级
          </text>

          {/* 微任务入口标注 */}
          <rect x="30" y="44" width="680" height="28" rx="6" fill="var(--warning)" fillOpacity="0.1" stroke="var(--warning)" strokeWidth="1" strokeOpacity="0.4" />
          <text x={VIEW_W / 2} y="62" textAnchor="middle" fontSize="11" fill="var(--warning)">
            阶段切换之间：先清空 process.nextTick 队列，再清空 Promise 微任务队列
          </text>

          {/* 六阶段环形 */}
          {(() => {
            const cx = 250;
            const cy = 250;
            const r = 110;
            const stages = [
              { name: "timers", desc: "setTimeout", color: "var(--success)" },
              { name: "pending", desc: "系统回调", color: "var(--accent)" },
              { name: "poll", desc: "I/O 轮询", color: "var(--warning)" },
              { name: "check", desc: "setImmediate", color: "var(--danger)" },
              { name: "close", desc: "close 事件", color: "var(--accent)" },
            ];
            return stages.map((s, i) => {
              const angle = (i * 72 - 90) * (Math.PI / 180);
              const x = cx + r * Math.cos(angle);
              const y = cy + r * Math.sin(angle);
              return (
                <g key={i}>
                  <circle cx={x} cy={y} r="40" fill={s.color} fillOpacity="0.12" stroke={s.color} strokeWidth="1.5" />
                  <text x={x} y={y - 4} textAnchor="middle" fontSize="10" fontWeight="600" fill={s.color}>{s.name}</text>
                  <text x={x} y={y + 10} textAnchor="middle" fontSize="8" fill="var(--text-secondary)">{s.desc}</text>
                </g>
              );
            });
          })()}

          {/* 中心 */}
          <circle cx="250" cy="250" r="48" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="1.5" />
          <text x="250" y="246" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--accent)">事件循环</text>
          <text x="250" y="262" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">libuv uv_run</text>

          {/* 右侧：nextTick vs Promise 优先级 */}
          <text x="540" y="120" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--text-primary)">微任务优先级</text>

          <rect x="420" y="134" width="240" height="60" rx="8" fill="var(--danger)" fillOpacity="0.1" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="540" y="154" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--danger)">1. process.nextTick</text>
          <text x="540" y="170" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">最高优先级，清空后才执行 Promise</text>
          <text x="540" y="184" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">可能饿死 I/O（递归 nextTick）</text>

          <rect x="420" y="206" width="240" height="60" rx="8" fill="var(--warning)" fillOpacity="0.1" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="540" y="226" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--warning)">2. Promise.then</text>
          <text x="540" y="242" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">微任务队列，nextTick 清空后执行</text>
          <text x="540" y="256" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">queueMicrotask 同级</text>

          <rect x="420" y="278" width="240" height="60" rx="8" fill="var(--accent)" fillOpacity="0.1" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="540" y="298" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">3. setImmediate (check)</text>
          <text x="540" y="314" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">宏任务，下一轮 check 阶段</text>
          <text x="540" y="328" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">I/O 回调后 setImmediate 先于 setTimeout</text>

          <rect x="420" y="350" width="240" height="60" rx="8" fill="var(--success)" fillOpacity="0.1" stroke="var(--success)" strokeWidth="1.2" />
          <text x="540" y="370" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">4. setTimeout (timers)</text>
          <text x="540" y="386" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">宏任务，下一轮 timers 阶段</text>
          <text x="540" y="400" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">最小延迟 1ms（clamp）</text>

          {/* 底部说明 */}
          <rect x="50" y="420" width="640" height="42" rx="6" fill="var(--text-tertiary)" fillOpacity="0.06" stroke="var(--text-tertiary)" strokeWidth="1" strokeOpacity="0.3" />
          <text x={VIEW_W / 2} y="438" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">
            poll 阶段行为：有 I/O 回调就执行，执行完检查 setImmediate；无 I/O 时阻塞等待，除非 timers 到期则不阻塞
          </text>
          <text x={VIEW_W / 2} y="454" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">
            递归 process.nextTick 会阻止事件循环进入下一个阶段 → I/O 饥饿
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        事件循环进阶——六阶段调度、poll 阻塞策略、nextTick &gt; Promise &gt; setImmediate &gt; setTimeout 优先级
      </figcaption>
    </figure>
  );
}
