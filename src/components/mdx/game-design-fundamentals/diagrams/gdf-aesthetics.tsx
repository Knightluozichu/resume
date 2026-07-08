/**
 * <GdfAestheticsDiagram>：美学体验设计图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 720;
const VIEW_H = 400;

export function GdfAestheticsDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="美学体验设计图解"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text x={VIEW_W / 2} y="32" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            8 种美学目标与逆向设计
          </text>
          <text x={VIEW_W / 2} y="54" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            从体验出发 → 推导动态 → 设计机制
          </text>

          <rect x="40" y="78" width="640" height="290" rx="12" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />

          <rect x="70" y="100" width="140" height="44" rx="6" fill="var(--success)" fillOpacity="0.10" stroke="var(--success)" strokeWidth="1" />
          <text x="140" y="126" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">感觉 Sensation</text>

          <rect x="220" y="100" width="140" height="44" rx="6" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1" />
          <text x="290" y="126" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">幻想 Fantasy</text>

          <rect x="370" y="100" width="140" height="44" rx="6" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="1" />
          <text x="440" y="126" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">叙事 Narrative</text>

          <rect x="520" y="100" width="140" height="44" rx="6" fill="var(--text-tertiary)" fillOpacity="0.12" stroke="var(--text-tertiary)" strokeWidth="1" />
          <text x="590" y="126" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">挑战 Challenge</text>

          <rect x="70" y="154" width="140" height="44" rx="6" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1" />
          <text x="140" y="180" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">同伴 Fellowship</text>

          <rect x="220" y="154" width="140" height="44" rx="6" fill="var(--success)" fillOpacity="0.10" stroke="var(--success)" strokeWidth="1" />
          <text x="290" y="180" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">发现 Discovery</text>

          <rect x="370" y="154" width="140" height="44" rx="6" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="1" />
          <text x="440" y="180" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">表达 Expression</text>

          <rect x="520" y="154" width="140" height="44" rx="6" fill="var(--text-tertiary)" fillOpacity="0.12" stroke="var(--text-tertiary)" strokeWidth="1" />
          <text x="590" y="180" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">顺从 Submission</text>

          <text x={VIEW_W / 2} y="222" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">
            逆向设计：A → D → M
          </text>

          <rect x="70" y="236" width="180" height="56" rx="8" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="160" y="258" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--warning)">A 美学目标</text>
          <text x="160" y="276" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">想让玩家感受什么</text>

          <text x="275" y="264" textAnchor="middle" fontSize="14" fill="var(--accent)">&larr;</text>

          <rect x="300" y="236" width="180" height="56" rx="8" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="390" y="258" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">D 动态行为</text>
          <text x="390" y="276" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">什么行为产生体验</text>

          <text x="505" y="264" textAnchor="middle" fontSize="14" fill="var(--accent)">&larr;</text>

          <rect x="530" y="236" width="130" height="56" rx="8" fill="var(--success)" fillOpacity="0.10" stroke="var(--success)" strokeWidth="1.2" />
          <text x="595" y="258" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">M 机制规则</text>
          <text x="595" y="276" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">什么规则产生行为</text>

          <text x={VIEW_W / 2} y="318" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            主美学 1 个 + 辅美学 1-2 个，所有设计服务于主美学
          </text>
          <text x={VIEW_W / 2} y="336" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            每个机制都要问：它服务于哪个美学目标？
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        美学体验设计——8 种美学目标与逆向设计方法
      </figcaption>
    </figure>
  );
}
