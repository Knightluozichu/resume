/**
 * <Gep1TransformSystemDiagram>：变换层级与坐标空间图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 720;
const VIEW_H = 440;

export function Gep1TransformSystemDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="变换层级与坐标空间图解"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text x={VIEW_W / 2} y="30" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            变换系统：场景层级与坐标空间
          </text>

          {/* 场景树 */}
          <text x="180" y="58" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">场景层级树</text>

          {/* Root */}
          <rect x="130" y="70" width="100" height="34" rx="6" fill="var(--accent)" fillOpacity="0.2" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="180" y="91" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">Root（世界）</text>

          <line x1="180" y1="104" x2="180" y2="120" stroke="var(--text-tertiary)" strokeWidth="1.2" />
          <line x1="100" y1="120" x2="260" y2="120" stroke="var(--text-tertiary)" strokeWidth="1.2" />
          <line x1="100" y1="120" x2="100" y2="136" stroke="var(--text-tertiary)" strokeWidth="1.2" />
          <line x1="260" y1="120" x2="260" y2="136" stroke="var(--text-tertiary)" strokeWidth="1.2" />

          {/* Car */}
          <rect x="50" y="136" width="100" height="34" rx="6" fill="var(--success)" fillOpacity="0.16" stroke="var(--success)" strokeWidth="1.2" />
          <text x="100" y="157" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">Car</text>

          {/* Character */}
          <rect x="210" y="136" width="100" height="34" rx="6" fill="var(--success)" fillOpacity="0.16" stroke="var(--success)" strokeWidth="1.2" />
          <text x="260" y="157" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">Character</text>

          <line x1="100" y1="170" x2="100" y2="186" stroke="var(--text-tertiary)" strokeWidth="1.2" />
          <line x1="260" y1="170" x2="260" y2="186" stroke="var(--text-tertiary)" strokeWidth="1.2" />

          {/* Wheel / Hand */}
          <rect x="50" y="186" width="100" height="30" rx="6" fill="var(--warning)" fillOpacity="0.14" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="100" y="205" textAnchor="middle" fontSize="10" fill="var(--warning)">Wheel（子节点）</text>

          <rect x="210" y="186" width="100" height="30" rx="6" fill="var(--warning)" fillOpacity="0.14" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="260" y="205" textAnchor="middle" fontSize="10" fill="var(--warning)">Hand（子节点）</text>

          <text x="180" y="240" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">父变换 = T_parent</text>
          <text x="180" y="256" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">子变换 = T_local</text>
          <rect x="60" y="270" width="240" height="36" rx="6" fill="var(--accent)" fillOpacity="0.1" stroke="var(--accent)" strokeWidth="1" />
          <text x="180" y="288" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--accent)">世界矩阵 = T_parent × T_local</text>
          <text x="180" y="302" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">递归累积，自顶向下传递</text>

          {/* TRS 分解 */}
          <rect x="60" y="322" width="240" height="44" rx="6" fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" strokeWidth="1" />
          <text x="180" y="340" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--success)">TRS 分解</text>
          <text x="180" y="356" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">Translate · Rotate · Scale</text>

          {/* 右侧：坐标空间变换链 */}
          <text x="540" y="58" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">坐标空间变换链</text>

          <rect x="430" y="72" width="220" height="38" rx="8" fill="var(--success)" fillOpacity="0.14" stroke="var(--success)" strokeWidth="1.2" />
          <text x="540" y="96" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">局部空间 Local</text>

          <text x="540" y="128" textAnchor="middle" fontSize="16" fill="var(--text-tertiary)">&darr;</text>
          <text x="540" y="142" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">× Model（世界矩阵）</text>

          <rect x="430" y="150" width="220" height="38" rx="8" fill="var(--accent)" fillOpacity="0.14" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="540" y="174" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">世界空间 World</text>

          <text x="540" y="206" textAnchor="middle" fontSize="16" fill="var(--text-tertiary)">&darr;</text>
          <text x="540" y="220" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">× View（摄像机逆矩阵）</text>

          <rect x="430" y="228" width="220" height="38" rx="8" fill="var(--warning)" fillOpacity="0.14" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="540" y="252" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">观察空间 View</text>

          <text x="540" y="284" textAnchor="middle" fontSize="16" fill="var(--text-tertiary)">&darr;</text>
          <text x="540" y="298" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">× Projection</text>

          <rect x="430" y="306" width="220" height="38" rx="8" fill="var(--text-tertiary)" fillOpacity="0.16" stroke="var(--text-tertiary)" strokeWidth="1.2" />
          <text x="540" y="330" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">裁剪空间 Clip</text>

          <text x="540" y="362" textAnchor="middle" fontSize="16" fill="var(--text-tertiary)">&darr;</text>
          <text x="540" y="376" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">透视除法 + 视口映射</text>

          <rect x="430" y="384" width="220" height="34" rx="8" fill="var(--text-tertiary)" fillOpacity="0.1" stroke="var(--text-tertiary)" strokeWidth="1" strokeDasharray="3 3" />
          <text x="540" y="406" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">屏幕空间 Screen</text>

          <text x="180" y="392" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">
            脏标记：父节点移动后子节点世界矩阵才需重算
          </text>
          <text x="180" y="408" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">
            局部不变则缓存，避免每帧重乘
          </text>
          <text x="180" y="424" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">
            变换系统是数学库的「组织层」
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        变换系统——场景层级树自顶向下累积世界矩阵，坐标空间经 Model/View/Projection 链式变换到屏幕
      </figcaption>
    </figure>
  );
}
