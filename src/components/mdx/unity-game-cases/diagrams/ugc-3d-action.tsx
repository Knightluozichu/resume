/**
 * <Ugc3dActionDiagram>：3D 动作游戏图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 720;
const VIEW_H = 400;

export function Ugc3dActionDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="3D 动作游戏图解"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text x="360" y="32" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">3D 动作游戏</text>
          <rect x="60" y="80" width="170" height="55" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="145" y="105" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--success)">核心玩法</text>
          <text x="145" y="123" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">玩法循环</text>
          <text x="250" y="110" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&rarr;</text>
          <rect x="270" y="80" width="170" height="55" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="355" y="105" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">系统设计</text>
          <text x="355" y="123" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">系统拆解</text>
          <text x="460" y="110" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&rarr;</text>
          <rect x="480" y="80" width="170" height="55" rx="8" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="565" y="105" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--warning)">技术要点</text>
          <text x="565" y="123" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">关键脚本</text>
          <rect x="60" y="170" width="600" height="60" rx="8" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.3" />
          <text x="360" y="195" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">核心要点</text>
          <text x="360" y="215" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">3D 动作游戏</text>
          <text x="360" y="270" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">理解原理 → 动手实践 → 验证效果</text>
          <text x="360" y="300" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">每一步都建立在前一步的理解之上</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        3D 动作游戏——Unity 游戏案例开发大全
      </figcaption>
    </figure>
  );
}
