/**
 * <GdfLevelDesignDiagram>：关卡设计图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 720;
const VIEW_H = 400;

export function GdfLevelDesignDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="关卡设计图解"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text x={VIEW_W / 2} y="32" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            关卡三层结构与节奏设计
          </text>
          <text x={VIEW_W / 2} y="54" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            空间层 · 挑战层 · 引导层
          </text>

          <rect x="40" y="78" width="640" height="290" rx="12" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />

          <rect x="70" y="100" width="580" height="56" rx="8" fill="var(--success)" fillOpacity="0.10" stroke="var(--success)" strokeWidth="1.2" />
          <text x="100" y="124" textAnchor="start" fontSize="12" fontWeight="600" fill="var(--success)">空间层（骨架）</text>
          <text x="100" y="142" textAnchor="start" fontSize="11" fill="var(--text-secondary)">主路径（必经） + 支路径（可选） + 隐藏路径（奖励）</text>

          <text x={VIEW_W / 2} y="172" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">挑战节奏</text>

          <rect x="80" y="184" width="80" height="30" rx="4" fill="var(--success)" fillOpacity="0.10" stroke="var(--success)" strokeWidth="0.8" />
          <text x="120" y="203" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">教学</text>

          <rect x="165" y="184" width="80" height="30" rx="4" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="0.8" />
          <text x="205" y="203" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">战斗</text>

          <rect x="250" y="184" width="60" height="30" rx="4" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="0.8" />
          <text x="280" y="203" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">喘息</text>

          <rect x="315" y="184" width="80" height="30" rx="4" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="0.8" />
          <text x="355" y="203" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">强战</text>

          <rect x="400" y="184" width="60" height="30" rx="4" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="0.8" />
          <text x="430" y="203" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">喘息</text>

          <rect x="465" y="184" width="80" height="30" rx="4" fill="var(--danger)" fillOpacity="0.10" stroke="var(--danger)" strokeWidth="0.8" />
          <text x="505" y="203" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">Boss</text>

          <rect x="550" y="184" width="80" height="30" rx="4" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="0.8" />
          <text x="590" y="203" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">奖励</text>

          <text x={VIEW_W / 2} y="240" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">
            引导层：用视觉线索代替箭头
          </text>

          <rect x="80" y="252" width="150" height="40" rx="6" fill="var(--warning)" fillOpacity="0.08" stroke="var(--warning)" strokeWidth="0.8" />
          <text x="155" y="276" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">光线方向</text>

          <rect x="240" y="252" width="150" height="40" rx="6" fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" strokeWidth="0.8" />
          <text x="315" y="276" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">颜色对比</text>

          <rect x="400" y="252" width="150" height="40" rx="6" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="0.8" />
          <text x="475" y="276" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">地标建筑</text>

          <text x={VIEW_W / 2} y="318" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            玩家看得见目标，但路径不唯一
          </text>
          <text x={VIEW_W / 2} y="336" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            让玩家以为是自己发现的，而非被指引的
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        关卡设计——三层结构、挑战节奏与引导设计
      </figcaption>
    </figure>
  );
}
