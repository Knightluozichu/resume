/**
 * <GmpInterviewDiagram>：面试准备与算法实战图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 720;
const VIEW_H = 400;

export function GmpInterviewDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="面试准备与算法实战图解"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text x={VIEW_W / 2} y="32" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            游戏程序员面试四轮考察
          </text>
          <text x={VIEW_W / 2} y="54" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            算法面 · 系统设计面 · 项目面 · HR 面
          </text>

          <rect x="40" y="78" width="640" height="290" rx="12" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />

          <rect x="70" y="100" width="280" height="70" rx="8" fill="var(--success)" fillOpacity="0.10" stroke="var(--success)" strokeWidth="1.2" />
          <text x="210" y="124" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">算法面试</text>
          <text x="210" y="140" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">数据结构 + 算法 + 编码</text>
          <text x="210" y="156" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">正确性/复杂度/优化/边界</text>

          <rect x="370" y="100" width="280" height="70" rx="8" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="510" y="124" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">系统设计面试</text>
          <text x="510" y="140" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">架构设计</text>
          <text x="510" y="156" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">需求/模块/选型/扩展性</text>

          <rect x="70" y="182" width="280" height="70" rx="8" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="210" y="206" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--warning)">项目面试</text>
          <text x="210" y="222" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">技术深度 + 项目经验</text>
          <text x="210" y="238" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">贡献/难点/解决方案</text>

          <rect x="370" y="182" width="280" height="70" rx="8" fill="var(--text-tertiary)" fillOpacity="0.12" stroke="var(--text-tertiary)" strokeWidth="1.2" />
          <text x="510" y="206" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--text-primary)">HR 面试</text>
          <text x="510" y="222" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">软技能</text>
          <text x="510" y="238" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">沟通/协作/职业规划</text>

          <text x={VIEW_W / 2} y="280" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">
            算法面试流程
          </text>
          <text x={VIEW_W / 2} y="300" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            确认题意 → 暴力解法 → 分析复杂度 → 优化思路 → 写代码 → 验证
          </text>
          <text x={VIEW_W / 2} y="320" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            先说暴力再优化，边写边讲，让面试官跟着思路走
          </text>
          <text x={VIEW_W / 2} y="340" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            刷题 200-300 道 · 按类型掌握模板 · 举一反三
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        面试准备——四轮考察与算法面试流程
      </figcaption>
    </figure>
  );
}
