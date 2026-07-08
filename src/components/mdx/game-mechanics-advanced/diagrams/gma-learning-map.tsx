/**
 * <GmaLearningMapDiagram>：游戏机制：高级游戏设计技术全书学习地图图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 720;
const VIEW_H = 420;

export function GmaLearningMapDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="游戏机制：高级游戏设计技术全书学习地图图解"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text x={VIEW_W / 2} y="30" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            游戏机制：高级游戏设计技术 全书学习地图
          </text>
          <text x={VIEW_W / 2} y="52" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            机制设计 → Machinations 框架 → 模拟 → 经济/概率 → 调优
          </text>

          {/* 第一行：基础 */}
          <rect x="40" y="72" width="180" height="56" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="130" y="96" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">机制设计基础</text>
          <text x="130" y="114" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">机制/Machinations</text>

          <rect x="270" y="72" width="180" height="56" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="360" y="96" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">模拟系统</text>
          <text x="360" y="114" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">离散/连续</text>

          <rect x="500" y="72" width="180" height="56" rx="8" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="590" y="96" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--warning)">经济与概率</text>
          <text x="590" y="114" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">经济/随机</text>

          {/* 箭头 */}
          <text x="130" y="148" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>
          <text x="360" y="148" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>
          <text x="590" y="148" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>

          {/* 第二行：核心概念 */}
          <rect x="40" y="168" width="180" height="56" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.4" />
          <text x="130" y="192" textAnchor="middle" fontSize="11" fill="var(--text-primary)">行为空间/机制深度</text>
          <text x="130" y="210" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">反馈结构可视化</text>

          <rect x="270" y="168" width="180" height="56" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.4" />
          <text x="360" y="192" textAnchor="middle" fontSize="11" fill="var(--text-primary)">事件队列/积分器</text>
          <text x="360" y="210" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">反馈环路</text>

          <rect x="500" y="168" width="180" height="56" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.4" />
          <text x="590" y="192" textAnchor="middle" fontSize="11" fill="var(--text-primary)">资源流/随机分布</text>
          <text x="590" y="210" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">引擎/水龙头</text>

          {/* 第三行：高级 */}
          <rect x="155" y="256" width="200" height="56" rx="8" fill="var(--text-tertiary)" fillOpacity="0.12" stroke="var(--text-tertiary)" strokeWidth="1.2" />
          <text x="255" y="280" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--text-primary)">谜题与渐进难度</text>
          <text x="255" y="298" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">挑战曲线设计</text>

          <rect x="375" y="256" width="200" height="56" rx="8" fill="var(--text-tertiary)" fillOpacity="0.12" stroke="var(--text-tertiary)" strokeWidth="1.2" />
          <text x="475" y="280" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--text-primary)">机制调优与平衡</text>
          <text x="475" y="298" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">数值迭代/测试</text>

          {/* 底部主线 */}
          <rect x="40" y="340" width="640" height="56" rx="8" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.3" />
          <text x={VIEW_W / 2} y="364" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">
            核心主线：从机制结构到涌现行为再到可调平衡
          </text>
          <text x={VIEW_W / 2} y="382" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            Machinations = 可视化反馈结构 → 模拟验证 → 数值调优
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        游戏机制全书学习地图——从机制设计到 Machinations 框架到调优实践
      </figcaption>
    </figure>
  );
}
