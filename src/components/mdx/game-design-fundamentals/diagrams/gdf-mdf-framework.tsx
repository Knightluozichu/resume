/**
 * <GdfMdfFrameworkDiagram>：MDA 框架详解图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 720;
const VIEW_H = 400;

export function GdfMdfFrameworkDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="MDA 框架详解图解"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text x={VIEW_W / 2} y="32" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            MDA 框架：从规则到体验的转化
          </text>
          <text x={VIEW_W / 2} y="54" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            设计师视角 M→D→A · 玩家视角 A→D→M
          </text>

          <rect x="40" y="78" width="640" height="290" rx="12" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />

          <rect x="70" y="100" width="180" height="80" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="160" y="124" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--success)">Mechanics 机制</text>
          <text x="160" y="142" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">规则/数据结构</text>
          <text x="160" y="158" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">跳跃力/生命值/得分</text>
          <text x="160" y="172" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">设计师直接控制</text>

          <text x="275" y="140" textAnchor="middle" fontSize="16" fill="var(--accent)">&rarr;</text>
          <text x="275" y="156" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">运行</text>

          <rect x="300" y="100" width="180" height="80" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="390" y="124" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">Dynamics 动态</text>
          <text x="390" y="142" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">涌现行为</text>
          <text x="390" y="158" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">连续跳跃/卡位/速通</text>
          <text x="390" y="172" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">半涌现，可预测</text>

          <text x="505" y="140" textAnchor="middle" fontSize="16" fill="var(--accent)">&rarr;</text>
          <text x="505" y="156" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">体验</text>

          <rect x="530" y="100" width="140" height="80" rx="8" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="600" y="124" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--warning)">Aesthetics 美学</text>
          <text x="600" y="142" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">玩家体验</text>
          <text x="600" y="158" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">挑战/发现/顺从</text>
          <text x="600" y="172" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">8 种美学目标</text>

          <text x={VIEW_W / 2} y="210" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">
            8 种美学目标
          </text>

          <rect x="70" y="222" width="140" height="36" rx="6" fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" strokeWidth="0.8" />
          <text x="140" y="244" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">感觉 Sensation</text>

          <rect x="220" y="222" width="140" height="36" rx="6" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="0.8" />
          <text x="290" y="244" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">幻想 Fantasy</text>

          <rect x="370" y="222" width="140" height="36" rx="6" fill="var(--warning)" fillOpacity="0.08" stroke="var(--warning)" strokeWidth="0.8" />
          <text x="440" y="244" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">叙事 Narrative</text>

          <rect x="520" y="222" width="140" height="36" rx="6" fill="var(--text-tertiary)" fillOpacity="0.10" stroke="var(--text-tertiary)" strokeWidth="0.8" />
          <text x="590" y="244" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">挑战 Challenge</text>

          <rect x="70" y="266" width="140" height="36" rx="6" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="0.8" />
          <text x="140" y="288" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">同伴 Fellowship</text>

          <rect x="220" y="266" width="140" height="36" rx="6" fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" strokeWidth="0.8" />
          <text x="290" y="288" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">发现 Discovery</text>

          <rect x="370" y="266" width="140" height="36" rx="6" fill="var(--warning)" fillOpacity="0.08" stroke="var(--warning)" strokeWidth="0.8" />
          <text x="440" y="288" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">表达 Expression</text>

          <rect x="520" y="266" width="140" height="36" rx="6" fill="var(--text-tertiary)" fillOpacity="0.10" stroke="var(--text-tertiary)" strokeWidth="0.8" />
          <text x="590" y="288" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">顺从 Submission</text>

          <text x={VIEW_W / 2} y="328" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            每个游戏通常主打 2-3 种美学目标
          </text>
          <text x={VIEW_W / 2} y="346" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            设计师调 M 产生期望的 D，让玩家获得期望的 A
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        MDA 框架——从机制到动态到美学的转化链路与 8 种美学目标
      </figcaption>
    </figure>
  );
}
