/**
 * <GspThreadModelDiagram>：服务器线程模型（IO/逻辑/定时器）图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 420;

export function GspThreadModelDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="服务器线程模型IO逻辑定时器图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="30" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            服务器三线程模型
          </text>

          {/* IO 线程 */}
          <text x="140" y="62" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">
            IO 线程
          </text>
          <rect x="50" y="70" width="180" height="200" rx="10" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="1.2" />

          <rect x="66" y="84" width="148" height="32" rx="6" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1" />
          <text x="140" y="104" textAnchor="middle" fontSize="10" fill="var(--success)">epoll_wait 事件循环</text>

          <rect x="66" y="124" width="148" height="32" rx="6" fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" strokeWidth="1" />
          <text x="140" y="144" textAnchor="middle" fontSize="10" fill="var(--success)">读数据 → 环形缓冲</text>

          <rect x="66" y="164" width="148" height="32" rx="6" fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" strokeWidth="1" />
          <text x="140" y="184" textAnchor="middle" fontSize="10" fill="var(--success)">解包 → 消息队列</text>

          <rect x="66" y="204" width="148" height="32" rx="6" fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" strokeWidth="1" />
          <text x="140" y="224" textAnchor="middle" fontSize="10" fill="var(--success)">从发送队列取包 → send</text>

          <rect x="66" y="240" width="148" height="20" rx="4" fill="var(--success)" fillOpacity="0.04" stroke="var(--success)" strokeWidth="0.8" strokeOpacity="0.5" />
          <text x="140" y="254" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">不碰游戏逻辑</text>

          {/* 逻辑线程 */}
          <text x="370" y="62" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">
            逻辑线程
          </text>
          <rect x="280" y="70" width="180" height="200" rx="10" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.2" />

          <rect x="296" y="84" width="148" height="32" rx="6" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1" />
          <text x="370" y="104" textAnchor="middle" fontSize="10" fill="var(--accent)">从消息队列取消息</text>

          <rect x="296" y="124" width="148" height="32" rx="6" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="1" />
          <text x="370" y="144" textAnchor="middle" fontSize="10" fill="var(--accent)">反序列化 → 消息体</text>

          <rect x="296" y="164" width="148" height="32" rx="6" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="1" />
          <text x="370" y="184" textAnchor="middle" fontSize="10" fill="var(--accent)">按消息ID 路由处理</text>

          <rect x="296" y="204" width="148" height="32" rx="6" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="1" />
          <text x="370" y="224" textAnchor="middle" fontSize="10" fill="var(--accent)">更新状态 → 产出回包</text>

          <rect x="296" y="240" width="148" height="20" rx="4" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="0.8" strokeOpacity="0.5" />
          <text x="370" y="254" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">单线程串行处理</text>

          {/* 定时器线程 */}
          <text x="600" y="62" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--warning)">
            定时器线程
          </text>
          <rect x="510" y="70" width="180" height="200" rx="10" fill="var(--warning)" fillOpacity="0.06" stroke="var(--warning)" strokeWidth="1.2" />

          <rect x="526" y="84" width="148" height="32" rx="6" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1" />
          <text x="600" y="104" textAnchor="middle" fontSize="10" fill="var(--warning)">时间轮 / 最小堆</text>

          <rect x="526" y="124" width="148" height="32" rx="6" fill="var(--warning)" fillOpacity="0.08" stroke="var(--warning)" strokeWidth="1" />
          <text x="600" y="144" textAnchor="middle" fontSize="10" fill="var(--warning)">检测到期回调</text>

          <rect x="526" y="164" width="148" height="32" rx="6" fill="var(--warning)" fillOpacity="0.08" stroke="var(--warning)" strokeWidth="1" />
          <text x="600" y="184" textAnchor="middle" fontSize="10" fill="var(--warning)">Buff过期/心跳检测</text>

          <rect x="526" y="204" width="148" height="32" rx="6" fill="var(--warning)" fillOpacity="0.08" stroke="var(--warning)" strokeWidth="1" />
          <text x="600" y="224" textAnchor="middle" fontSize="10" fill="var(--warning)">定时存盘/排行榜刷新</text>

          <rect x="526" y="240" width="148" height="20" rx="4" fill="var(--warning)" fillOpacity="0.04" stroke="var(--warning)" strokeWidth="0.8" strokeOpacity="0.5" />
          <text x="600" y="254" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">投递到逻辑线程</text>

          {/* 线程间通信 */}
          <text x={VIEW_W / 2} y="296" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--danger)">
            线程间通信
          </text>

          <rect x="50" y="304" width="200" height="36" rx="6" fill="var(--danger)" fillOpacity="0.08" stroke="var(--danger)" strokeWidth="1" />
          <text x="150" y="326" textAnchor="middle" fontSize="10" fill="var(--danger)">IO → 逻辑：消息队列（无锁/加锁）</text>

          <rect x="280" y="304" width="180" height="36" rx="6" fill="var(--danger)" fillOpacity="0.08" stroke="var(--danger)" strokeWidth="1" />
          <text x="370" y="326" textAnchor="middle" fontSize="10" fill="var(--danger)">逻辑 → IO：发送队列</text>

          <rect x="490" y="304" width="200" height="36" rx="6" fill="var(--danger)" fillOpacity="0.08" stroke="var(--danger)" strokeWidth="1" />
          <text x="590" y="326" textAnchor="middle" fontSize="10" fill="var(--danger)">定时器 → 逻辑：定时事件队列</text>

          {/* 关键要点 */}
          <rect x="50" y="356" width="640" height="48" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.4" />
          <text x={VIEW_W / 2} y="376" textAnchor="middle" fontSize="11" fill="var(--text-primary)">
            分离原则：IO 线程只做收发，逻辑线程只做业务，定时器线程只做调度
          </text>
          <text x={VIEW_W / 2} y="394" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            逻辑单线程 = 无锁 + 确定性；IO 多线程 = 高并发吞吐
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        服务器三线程模型——IO 线程负责收发，逻辑线程串行处理业务，定时器线程驱动周期任务
      </figcaption>
    </figure>
  );
}
