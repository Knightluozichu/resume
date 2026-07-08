/**
 * <OscDeadlocksDiagram>：死锁四条件、资源分配图环与银行家算法图解。
 * 纯静态展示，无交互。Server Component。
 */

const VIEW_W = 740;
const VIEW_H = 470;

export function OscDeadlocksDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="死锁四条件与银行家算法图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            死锁四条件、资源分配图环与银行家安全序列
          </text>

          {/* 左侧：四条件 */}
          <text x="170" y="56" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">四个必要条件（缺一不可）</text>

          <rect x="40" y="70" width="260" height="34" rx="6" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="1" />
          <text x="170" y="92" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">① 互斥：资源一次一人用</text>

          <rect x="40" y="112" width="260" height="34" rx="6" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="1" />
          <text x="170" y="134" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">② 占有等待：持资源等更多</text>

          <rect x="40" y="154" width="260" height="34" rx="6" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="1" />
          <text x="170" y="176" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">③ 不剥夺：不能强行夺走</text>

          <rect x="40" y="196" width="260" height="34" rx="6" fill="var(--danger)" fillOpacity="0.12" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="170" y="218" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--danger)">④ 循环等待：P0→P1→...→P0</text>

          <text x="170" y="250" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">打破任一条件即可预防死锁</text>

          {/* 右侧：资源分配图环 */}
          <text x="530" y="56" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">资源分配图（有环 = 可能死锁）</text>

          <rect x="490" y="86" width="30" height="30" rx="3" fill="var(--accent)" fillOpacity="0.25" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="505" y="105" textAnchor="middle" fontSize="9" fill="var(--accent)">R1</text>

          <circle cx="610" cy="101" r="16" fill="var(--danger)" fillOpacity="0.18" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="610" y="105" textAnchor="middle" fontSize="9" fill="var(--danger)">P1</text>

          <rect x="550" y="196" width="30" height="30" rx="3" fill="var(--accent)" fillOpacity="0.25" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="565" y="215" textAnchor="middle" fontSize="9" fill="var(--accent)">R2</text>

          <circle cx="450" cy="211" r="16" fill="var(--danger)" fillOpacity="0.18" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="450" y="215" textAnchor="middle" fontSize="9" fill="var(--danger)">P2</text>

          <line x1="520" y1="101" x2="594" y2="101" stroke="var(--accent)" strokeWidth="1.4" />
          <text x="557" y="94" textAnchor="middle" fontSize="8" fill="var(--accent)">分配</text>
          <line x1="610" y1="117" x2="565" y2="196" stroke="var(--danger)" strokeWidth="1.4" strokeDasharray="3 2" />
          <text x="600" y="161" fontSize="8" fill="var(--danger)">申请</text>
          <line x1="550" y1="211" x2="466" y2="211" stroke="var(--accent)" strokeWidth="1.4" />
          <text x="508" y="204" textAnchor="middle" fontSize="8" fill="var(--accent)">分配</text>
          <line x1="450" y1="195" x2="505" y2="116" stroke="var(--danger)" strokeWidth="1.4" strokeDasharray="3 2" />
          <text x="460" y="161" fontSize="8" fill="var(--danger)">申请</text>

          <text x="530" y="250" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">单实例有环 = 必死锁；多实例 = 可能</text>

          {/* 底部：银行家算法 */}
          <rect x="30" y="276" width="680" height="174" rx="10" fill="var(--text-primary)" fillOpacity="0.03" stroke="var(--border)" strokeWidth="1" />
          <text x="50" y="298" fontSize="13" fontWeight="600" fill="var(--text-primary)">银行家算法：安全序列判定</text>

          <text x="50" y="322" fontSize="10" fontWeight="600" fill="var(--accent)">数据结构</text>
          <text x="50" y="338" fontSize="9" fill="var(--text-tertiary)">Available：各类资源剩余量</text>
          <text x="50" y="352" fontSize="9" fill="var(--text-tertiary)">Max：各进程最大需求</text>
          <text x="50" y="366" fontSize="9" fill="var(--text-tertiary)">Allocation：已分配量</text>
          <text x="50" y="380" fontSize="9" fill="var(--text-tertiary)">Need = Max - Allocation</text>

          <text x="280" y="322" fontSize="10" fontWeight="600" fill="var(--success)">安全序列求法</text>
          <text x="280" y="338" fontSize="9" fill="var(--text-tertiary)">1. 找 Need ≤ Available 的进程 Pi</text>
          <text x="280" y="352" fontSize="9" fill="var(--text-tertiary)">2. 假设 Pi 完成：Available += Allocation_i</text>
          <text x="280" y="366" fontSize="9" fill="var(--text-tertiary)">3. 标记 Pi 完成，回到步骤 1</text>
          <text x="280" y="380" fontSize="9" fill="var(--text-tertiary)">4. 全部完成 → 安全；否则不安全</text>

          <text x="510" y="322" fontSize="10" fontWeight="600" fill="var(--danger)">关键性质</text>
          <text x="510" y="338" fontSize="9" fill="var(--text-tertiary)">安全状态 → 一定不死锁</text>
          <text x="510" y="352" fontSize="9" fill="var(--text-tertiary)">不安全状态 → 有风险（非已死锁）</text>
          <text x="510" y="366" fontSize="9" fill="var(--text-tertiary)">分配前模拟，不安全则拒绝</text>
          <text x="510" y="380" fontSize="9" fill="var(--text-tertiary)">需预知 Max（交互式系统不现实）</text>

          <text x="50" y="410" fontSize="10" fill="var(--text-secondary)">四解法谱系：预防（破坏条件） &gt; 避免（银行家） &gt; 检测（允许发生再杀） &gt; 忽略（鸵鸟策略）</text>
          <text x="50" y="428" fontSize="10" fill="var(--text-tertiary)">保守 → 激进：安全性与资源利用率此消彼长，通用 OS 常用鸵鸟（死锁概率低），数据库用检测/避免</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        死锁四个必要条件、资源分配图环与银行家算法安全序列判定
      </figcaption>
    </figure>
  );
}
