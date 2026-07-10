/**
 * <GdfPrototypingDiagram>：原型设计与迭代图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 720;
const VIEW_H = 400;

export function GdfPrototypingDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="原型设计与迭代图解"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text x={VIEW_W / 2} y="32" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">{`
            原型设计：最小成本验证最大风险
          `}</text>
          <text x={VIEW_W / 2} y="54" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">{`
            纸面原型 → 数字原型 → 迭代优化
          `}</text>

          <rect x="40" y="78" width="640" height="290" rx="12" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />

          <rect x="70" y="100" width="180" height="90" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="160" y="124" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--success)">{`纸面原型`}</text>
          <text x="160" y="142" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">{`纸+笔模拟机制`}</text>
          <text x="160" y="158" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">{`5-10 分钟/局`}</text>
          <text x="160" y="172" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">{`成本最低 · 改最快`}</text>

          <text x="275" y="148" textAnchor="middle" fontSize="16" fill="var(--text-tertiary)">{`&rarr;`}</text>

          <rect x="300" y="100" width="180" height="90" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="390" y="124" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">{`数字原型`}</text>
          <text x="390" y="142" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">{`最简代码灰盒`}</text>
          <text x="390" y="158" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">{`2 小时跑通`}</text>
          <text x="390" y="172" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">{`无美术/音效/菜单`}</text>

          <text x="505" y="148" textAnchor="middle" fontSize="16" fill="var(--text-tertiary)">{`&rarr;`}</text>

          <rect x="530" y="100" width="140" height="90" rx="8" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="600" y="124" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--warning)">{`迭代优化`}</text>
          <text x="600" y="142" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">{`5-10 轮`}</text>
          <text x="600" y="158" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">{`每轮一个问题`}</text>
          <text x="600" y="172" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">{`保留有效·丢弃无效`}</text>

          <text x={VIEW_W / 2} y="220" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">{`迭代循环`}</text>

          <rect x="100" y="232" width="120" height="36" rx="6" fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" strokeWidth="0.8" />
          <text x="160" y="254" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">{`设计`}</text>

          <text x="235" y="254" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">{`&rarr;`}</text>

          <rect x="255" y="232" width="120" height="36" rx="6" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="0.8" />
          <text x="315" y="254" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">{`原型`}</text>

          <text x="390" y="254" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">{`&rarr;`}</text>

          <rect x="410" y="232" width="120" height="36" rx="6" fill="var(--warning)" fillOpacity="0.08" stroke="var(--warning)" strokeWidth="0.8" />
          <text x="470" y="254" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">{`测试`}</text>

          <text x="545" y="254" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">{`&rarr;`}</text>

          <rect x="565" y="232" width="120" height="36" rx="6" fill="var(--danger)" fillOpacity="0.08" stroke="var(--danger)" strokeWidth="0.8" />
          <text x="625" y="254" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">{`分析修改`}</text>

          <text x={VIEW_W / 2} y="300" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">{`
            快速失败哲学：早发现比晚发现成本低 10 倍
          `}</text>
          <text x={VIEW_W / 2} y="318" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">{`
            纸面不好玩 → 改纸（1 小时） vs 代码不好玩 → 重构（1 周）
          `}</text>
          <text x={VIEW_W / 2} y="336" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">{`
            原型验证玩法，不是做成品
          `}</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        原型设计与迭代——从纸面到数字的验证流程
      </figcaption>
    </figure>
  );
}
