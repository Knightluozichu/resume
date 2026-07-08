/**
 * <GsaActorModelDiagram>：Actor 模型与消息驱动图解。
 * 纯静态展示，无交互。Server Component。DESIGN token 配色。
 */

const VIEW_W = 740;
const VIEW_H = 460;

export function GsaActorModelDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Actor 模型与消息驱动图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            Actor 模型：隔离状态 + 消息通信
          </text>

          {/* Actor A：玩家 */}
          <rect x="40" y="56" width="200" height="160" rx="10" fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" strokeWidth="1.2" />
          <text x="140" y="78" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--success)">玩家 Actor A</text>

          <rect x="60" y="92" width="160" height="40" rx="6" fill="var(--success)" fillOpacity="0.15" stroke="var(--success)" strokeWidth="1" />
          <text x="140" y="110" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--success)">私有状态</text>
          <text x="140" y="124" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">uid / 位置 / 背包 / CD</text>

          <rect x="60" y="140" width="160" height="64" rx="6" fill="var(--warning)" fillOpacity="0.15" stroke="var(--warning)" strokeWidth="1" />
          <text x="140" y="158" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--warning)">邮箱（FIFO）</text>
          <text x="140" y="172" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">[Move] [Fire] [Trade]</text>
          <text x="140" y="186" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">单线程消费 → 无锁</text>
          <text x="140" y="198" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">一次只处理一条</text>

          {/* Actor B：场景 */}
          <rect x="500" y="56" width="200" height="160" rx="10" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="600" y="78" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">场景 Actor B</text>

          <rect x="520" y="92" width="160" height="40" rx="6" fill="var(--accent)" fillOpacity="0.15" stroke="var(--accent)" strokeWidth="1" />
          <text x="600" y="110" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--accent)">私有状态</text>
          <text x="600" y="124" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">场景实体 / AOI / 广播</text>

          <rect x="520" y="140" width="160" height="64" rx="6" fill="var(--warning)" fillOpacity="0.15" stroke="var(--warning)" strokeWidth="1" />
          <text x="600" y="158" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--warning)">邮箱（FIFO）</text>
          <text x="600" y="172" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">[Damage] [Enter] [Leave]</text>
          <text x="600" y="186" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">单线程消费 → 无锁</text>
          <text x="600" y="198" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">一次只处理一条</text>

          {/* 消息流向 */}
          <line x1="240" y1="140" x2="500" y2="140" stroke="var(--text-tertiary)" strokeWidth="1.5" strokeDasharray="4 3" />
          <polygon points="498,136 506,140 498,144" fill="var(--text-tertiary)" />
          <text x="370" y="132" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">Tell(DamageMsg) 异步消息</text>

          <line x1="500" y1="172" x2="240" y2="172" stroke="var(--text-tertiary)" strokeWidth="1.5" strokeDasharray="4 3" />
          <polygon points="242,168 234,172 242,176" fill="var(--text-tertiary)" />
          <text x="370" y="190" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">Tell(HitResult) 异步回复</text>

          {/* 调度器 */}
          <rect x="40" y="250" width="660" height="70" rx="8" fill="var(--danger)" fillOpacity="0.08" stroke="var(--danger)" strokeWidth="1.2" />
          <text x={VIEW_W / 2} y="272" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--danger)">Actor 系统调度器（线程池 + 事件循环）</text>
          <text x={VIEW_W / 2} y="290" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">从各 Actor 邮箱取消息 → 分发给空闲 worker → 单条处理完才取下一条</text>
          <text x={VIEW_W / 2} y="306" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">多个 Actor 可在不同线程/机器并行，靠消息协调</text>

          {/* 对比传统模型 */}
          <rect x="40" y="344" width="320" height="84" rx="8" fill="var(--text-tertiary)" fillOpacity="0.08" stroke="var(--text-tertiary)" strokeWidth="1" />
          <text x="200" y="364" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--text-secondary)">传统：共享内存 + 锁</text>
          <text x="200" y="382" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">多线程共享可变状态</text>
          <text x="200" y="396" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">锁用错 → 死锁/竞态</text>
          <text x="200" y="414" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">扩展到百线程即锁地狱</text>

          <rect x="380" y="344" width="320" height="84" rx="8" fill="var(--success)" fillOpacity="0.1" stroke="var(--success)" strokeWidth="1.2" />
          <text x="540" y="364" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">Actor：隔离状态 + 消息</text>
          <text x="540" y="382" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">每个 Actor 状态私有</text>
          <text x="540" y="396" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">无共享 → 天然无竞争</text>
          <text x="540" y="414" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">可扩到成百上千 Actor</text>

          <text x={VIEW_W / 2} y="448" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            代价：通信异步，消息投递有调度开销
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Actor 模型——私有状态 + FIFO 邮箱 + 异步消息，用隔离替代锁消除数据竞争
      </figcaption>
    </figure>
  );
}
