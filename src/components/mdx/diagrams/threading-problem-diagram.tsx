/**
 * <ThreadingProblemDiagram>：多线程难点——数据竞争、锁、主线瓶颈。
 */

export function ThreadingProblemDiagram() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox="0 0 640 320"
          role="img"
          aria-label="多线程难点：数据竞争与锁——两个线程同时写同一变量产生竞态条件，加锁后串行执行但产生等待开销"
          className="mx-auto block h-auto w-full max-w-[640px]"
        >
          <text
            x="320"
            y="22"
            textAnchor="middle"
            fontSize="13"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            多线程为什么难？
          </text>

          {/* ---- Left: Data Race ---- */}
          <text x="160" y="48" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--danger)">
            数据竞争（Data Race）
          </text>
          <rect x="16" y="56" width="288" height="120" rx="8" fill="var(--bg)" stroke="var(--danger)" strokeWidth="1" opacity="0.6" />

          {/* Shared variable */}
          <rect x="118" y="66" width="84" height="32" rx="5" fill="var(--bg-elevated)" stroke="var(--border)" />
          <text x="160" y="86" textAnchor="middle" fontSize="10" fill="var(--text-primary)">
            int x = 0
          </text>

          {/* Thread A */}
          <rect x="30" y="110" width="100" height="28" rx="4" fill="var(--bg-elevated)" stroke="var(--accent)" />
          <text x="80" y="128" textAnchor="middle" fontSize="9" fill="var(--accent)">
            线程 A：x++
          </text>

          {/* Thread B */}
          <rect x="190" y="110" width="100" height="28" rx="4" fill="var(--bg-elevated)" stroke="var(--danger)" />
          <text x="240" y="128" textAnchor="middle" fontSize="9" fill="var(--danger)">
            线程 B：x++
          </text>

          {/* Arrows to shared */}
          <line x1="130" y1="124" x2="142" y2="98" stroke="var(--accent)" strokeWidth="1.5" markerEnd="url(#arrowA)" />
          <line x1="190" y1="124" x2="178" y2="98" stroke="var(--danger)" strokeWidth="1.5" markerEnd="url(#arrowB)" />

          <text x="160" y="170" textAnchor="middle" fontSize="9" fill="var(--danger)">
            结果：x 可能是 1（而非 2）——竞态条件
          </text>

          {/* ---- Right: Lock Overhead ---- */}
          <text x="480" y="48" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">
            加锁（Lock）的代价
          </text>
          <rect x="336" y="56" width="288" height="120" rx="8" fill="var(--bg)" stroke="var(--warning)" strokeWidth="1" opacity="0.6" />

          {/* Timeline bar */}
          <rect x="354" y="74" width="252" height="20" rx="3" fill="var(--bg-elevated)" />
          <rect x="354" y="74" width="80" height="20" rx="3" fill="var(--accent)" opacity="0.35" />
          <text x="394" y="88" textAnchor="middle" fontSize="8" fill="var(--accent)">
            线程 A 持有锁
          </text>
          <rect x="438" y="74" width="80" height="20" rx="3" fill="var(--warning)" opacity="0.45" />
          <text x="478" y="88" textAnchor="middle" fontSize="8" fill="var(--warning)">
            线程 B 等待
          </text>
          <rect x="522" y="74" width="84" height="20" rx="3" fill="var(--accent)" opacity="0.35" />
          <text x="564" y="88" textAnchor="middle" fontSize="8" fill="var(--accent)">
            A 释放锁继续
          </text>

          {/* Lock icon */}
          <text x="480" y="120" textAnchor="middle" fontSize="20" fill="var(--warning)">
            🔒
          </text>

          <text x="480" y="140" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">
            正确但变串行——多核白买了
          </text>
          <text x="480" y="158" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">
            高频加锁 = 上下文切换 = CPU 空转
          </text>

          {/* ---- Bottom: Main Thread Bottleneck ---- */}
          <text x="320" y="202" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">
            Unity 主线瓶颈
          </text>

          {/* Main thread bar */}
          <rect x="40" y="214" width="560" height="24" rx="4" fill="var(--bg-elevated)" stroke="var(--border)" />
          <rect x="40" y="214" width="560" height="24" rx="4" fill="var(--danger)" opacity="0.3" />
          <text x="320" y="230" textAnchor="middle" fontSize="10" fill="var(--text-primary)">
            主线程：Update · LateUpdate · 渲染 · 物理 · 动画……全挤一条线
          </text>

          <text x="320" y="258" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">
            GameObject API 不是线程安全的 → 几乎不能从 Job 里直接操作
          </text>

          {/* Solution */}
          <text x="320" y="286" textAnchor="middle" fontSize="10" fill="var(--accent)">
            DOTS 解法：结构体数据（非托管）→ Job System 安全并行 → Burst 极限速度
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        数据竞争导致不可预测结果；加锁消除竞争却引入等待开销；Unity 主线承载所有更新与渲染。DOTS 用结构体数据脱离主线瓶颈。
      </figcaption>
    </figure>
  );
}
