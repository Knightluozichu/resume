/**
 * <GmaMechanicsDesignDiagram>：机制设计基础图解。
 * 纯静态展示，无交互。Server Component。
 */

const VIEW_W = 720;
const VIEW_H = 400;

export function GmaMechanicsDesignDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="机制设计基础图解"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text x={VIEW_W / 2} y="30" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            机制设计：从规则到行为空间
          </text>

          {/* 左侧：机制层 */}
          <rect x="30" y="60" width="200" height="300" rx="12" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="130" y="84" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--success)">机制层（M）</text>

          <rect x="50" y="100" width="160" height="36" rx="6" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1" />
          <text x="130" y="123" textAnchor="middle" fontSize="11" fill="var(--text-primary)">基础机制（移动/攻击）</text>

          <rect x="50" y="148" width="160" height="36" rx="6" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1" />
          <text x="130" y="171" textAnchor="middle" fontSize="11" fill="var(--text-primary)">经济机制（资源/交易）</text>

          <rect x="50" y="196" width="160" height="36" rx="6" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1" />
          <text x="130" y="219" textAnchor="middle" fontSize="11" fill="var(--text-primary)">进度机制（经验/解锁）</text>

          <rect x="50" y="244" width="160" height="36" rx="6" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1" />
          <text x="130" y="267" textAnchor="middle" fontSize="11" fill="var(--text-primary)">状态机制（Buff/Debuff）</text>

          <text x="130" y="310" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">设计师直接控制</text>

          {/* 中间箭头 */}
          <text x="260" y="200" textAnchor="middle" fontSize="28" fill="var(--text-tertiary)">&rarr;</text>
          <text x="260" y="226" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">运行时</text>

          {/* 中间：动态层 */}
          <rect x="290" y="60" width="160" height="300" rx="12" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="370" y="84" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">动态层（D）</text>

          <rect x="310" y="110" width="120" height="36" rx="6" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1" />
          <text x="370" y="133" textAnchor="middle" fontSize="11" fill="var(--text-primary)">涌现策略</text>

          <rect x="310" y="158" width="120" height="36" rx="6" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1" />
          <text x="370" y="181" textAnchor="middle" fontSize="11" fill="var(--text-primary)">资源循环</text>

          <rect x="310" y="206" width="120" height="36" rx="6" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1" />
          <text x="370" y="229" textAnchor="middle" fontSize="11" fill="var(--text-primary)">反馈环路</text>

          <text x="370" y="280" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">半涌现——可预测</text>
          <text x="370" y="296" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">但不完全可控</text>

          {/* 右侧箭头 */}
          <text x="480" y="200" textAnchor="middle" fontSize="28" fill="var(--text-tertiary)">&rarr;</text>
          <text x="480" y="226" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">体验</text>

          {/* 右侧：行为空间 */}
          <rect x="510" y="60" width="180" height="300" rx="12" fill="var(--warning)" fillOpacity="0.06" stroke="var(--warning)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="600" y="84" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--warning)">行为空间</text>

          <text x="600" y="120" textAnchor="middle" fontSize="11" fill="var(--text-primary)">所有合法操作集合</text>

          <rect x="530" y="140" width="140" height="30" rx="6" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1" />
          <text x="600" y="160" textAnchor="middle" fontSize="10" fill="var(--text-primary)">太大 → 迷茫</text>

          <rect x="530" y="182" width="140" height="30" rx="6" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1" />
          <text x="600" y="202" textAnchor="middle" fontSize="10" fill="var(--text-primary)">太小 → 无聊</text>

          <rect x="530" y="224" width="140" height="30" rx="6" fill="var(--success)" fillOpacity="0.15" stroke="var(--success)" strokeWidth="1.2" />
          <text x="600" y="244" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--success)">大而有界 → 佳</text>

          <text x="600" y="290" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">深度 = 组合丰富度</text>
          <text x="600" y="306" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">边界 = 规则清晰度</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        机制设计三阶段——机制定义规则，运行动态产生涌现，行为空间决定深度
      </figcaption>
    </figure>
  );
}
