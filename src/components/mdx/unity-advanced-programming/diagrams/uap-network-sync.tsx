/**
 * <UapNetworkSyncDiagram>：Unity 网络同步与状态同步图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 720;
const VIEW_H = 400;

export function UapNetworkSyncDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Unity 网络同步与状态同步图解"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text x="360" y="32" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">帧同步 vs 状态同步</text>
          <rect x="40" y="60" width="310" height="160" rx="8" fill="var(--success)" fillOpacity="0.10" stroke="var(--success)" strokeWidth="1.2" />
          <text x="195" y="88" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--success)">帧同步</text>
          <text x="195" y="112" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">服务器只传输入</text>
          <text x="195" y="128" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">各端各自模拟</text>
          <text x="195" y="148" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">优点：流量小、可回放</text>
          <text x="195" y="164" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">缺点：须严格确定性</text>
          <text x="195" y="184" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">定点数替代 float</text>
          <text x="195" y="200" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">固定步长不用 deltaTime</text>
          <text x="195" y="216" textAnchor="middle" fontSize="10" fill="var(--success)">适合：RTS/格斗/MOBA</text>
          <rect x="370" y="60" width="310" height="160" rx="8" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="525" y="88" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">状态同步</text>
          <text x="525" y="112" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">服务器算权威结果</text>
          <text x="525" y="128" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">传状态给客户端</text>
          <text x="525" y="148" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">优点：反作弊强</text>
          <text x="525" y="164" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">缺点：流量大、服务器贵</text>
          <text x="525" y="184" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">客户端插值平滑</text>
          <text x="525" y="200" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">本地预测 + 对账纠正</text>
          <text x="525" y="216" textAnchor="middle" fontSize="10" fill="var(--accent)">适合：FPS/MMO</text>
          <rect x="40" y="245" width="640" height="44" rx="8" fill="var(--warning)" fillOpacity="0.08" stroke="var(--warning)" strokeWidth="1" strokeOpacity="0.5" />
          <text x="360" y="271" textAnchor="middle" fontSize="12" fill="var(--text-primary)">延迟补偿：服务器按时间戳回溯位置做命中判定</text>
          <text x="360" y="315" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">平滑方案</text>
          <text x="360" y="337" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">插值：快照间 Lerp，画面滞后 100ms 但平滑</text>
          <text x="360" y="355" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">预测：本地先跑，服务器回来对账纠正</text>
          <text x="360" y="380" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">插值掩盖抖动，预测掩盖延迟</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        网络同步——帧同步传输入，状态同步传结果
      </figcaption>
    </figure>
  );
}
