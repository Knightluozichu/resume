/**
 * <BcgCollisionTypesDiagram>：碰撞检测类型对比图（beginning-cpp-game-programming 碰撞检测章）。
 *
 * 三列并排对比三种碰撞检测：
 *   AABB 包围盒（绿，最快）/ 圆形碰撞（紫，快）/ 像素级碰撞（红，最精确）
 * 每列顶部画对应几何示意（矩形框 / 圆框 / 像素轮廓），中部列原理一句话，
 * 底部列「速度 / 精度 / 适用」三维评分 + 游戏场景。
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * 布局遵守 docs/diagram-layout-rules.md：viewBox 720×440、四周留白 ≥32、
 * 字号 ≥11、相邻元素间距 ≥8、三段垂直分层（标题 / 三列主体 / 底部总结）。
 */

const VIEW_W = 720;
const VIEW_H = 440;

const COL_W = 200;
const COL_GAP = 24;
const COL_MARGIN = 36;
const colX = (i: number) => COL_MARGIN + i * (COL_W + COL_GAP);

const COL_TOP = 96;

type CollType = {
  id: string;
  name: string;
  color: string;
  principle: string;
  speed: string;
  precision: string;
  fit: string;
};

const TYPES: readonly CollType[] = [
  { id: "aabb", name: "AABB 包围盒", color: "var(--success)", principle: "两矩形四边是否重叠", speed: "极快", precision: "粗", fit: "方块状物体" },
  { id: "circle", name: "圆形碰撞", color: "var(--accent)", principle: "两圆心距离 < 半径和", speed: "快", precision: "中", fit: "球类、圆形物体" },
  { id: "pixel", name: "像素级碰撞", color: "var(--danger)", principle: "逐像素比对非透明区", speed: "慢", precision: "精确", fit: "不规则精灵" },
];

export function BcgCollisionTypesDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="碰撞检测类型对比图。三列：AABB 包围盒（绿色，两矩形四边是否重叠，速度极快精度粗，适合方块状物体）；圆形碰撞（紫色，两圆心距离小于半径和，速度快精度中，适合球类圆形物体）；像素级碰撞（红色，逐像素比对非透明区，速度慢精度精确，适合不规则精灵）。每列顶部画对应几何示意。底部总结：先粗筛再精判，性能与精度兼顾。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* ===== 标题 ===== */}
          <text x={VIEW_W / 2} y="36" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            碰撞检测 · 三种类型对比
          </text>
          <text x={VIEW_W / 2} y="58" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            AABB 最快 · 圆形折中 · 像素最精确
          </text>

          {/* ===== 三列 ===== */}
          {TYPES.map((t, ci) => {
            const x = colX(ci);
            const cx = x + COL_W / 2;
            return (
              <g key={t.id}>
                {/* 列头 pill */}
                <rect x={x} y={COL_TOP} width={COL_W} height="28" rx="8" fill={t.color} fillOpacity="0.12" stroke={t.color} strokeWidth="1.2" />
                <text x={cx} y={COL_TOP + 19} textAnchor="middle" fontSize="14" fontWeight="700" fill={t.color}>{t.name}</text>

                {/* 几何示意区 */}
                <rect x={x} y={COL_TOP + 40} width={COL_W} height="96" rx="8" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
                {t.id === "aabb" && (
                  <>
                    <rect x={x + 40} y={COL_TOP + 56} width={48} height={36} rx="3" fill="var(--success)" fillOpacity="0.15" stroke="var(--success)" strokeWidth="1.4" />
                    <rect x={x + 80} y={COL_TOP + 76} width={56} height={40} rx="3" fill="var(--success)" fillOpacity="0.15" stroke="var(--success)" strokeWidth="1.4" />
                    <text x={cx} y={COL_TOP + 130} textAnchor="middle" fontSize="11" fill="var(--text-secondary)">矩形重叠 = 碰撞</text>
                  </>
                )}
                {t.id === "circle" && (
                  <>
                    <circle cx={x + 64} cy={COL_TOP + 82} r="22" fill="var(--accent)" fillOpacity="0.15" stroke="var(--accent)" strokeWidth="1.4" />
                    <circle cx={x + 116} cy={COL_TOP + 96} r="26" fill="var(--accent)" fillOpacity="0.15" stroke="var(--accent)" strokeWidth="1.4" />
                    <line x1={x + 64} y1={COL_TOP + 82} x2={x + 116} y2={COL_TOP + 96} stroke="var(--accent)" strokeWidth="1" strokeDasharray="3 2" />
                    <text x={cx} y={COL_TOP + 130} textAnchor="middle" fontSize="11" fill="var(--text-secondary)">d &lt; r₁ + r₂ = 碰撞</text>
                  </>
                )}
                {t.id === "pixel" && (
                  <>
                    {Array.from({ length: 6 }).map((_, r) =>
                      Array.from({ length: 8 }).map((_, c) => {
                        const on = (r + c) % 2 === 0 || (r === 2 && c > 1 && c < 6) || (r === 3 && c > 0 && c < 7);
                        return on ? (
                          <rect key={`${r}-${c}`} x={x + 36 + c * 8} y={COL_TOP + 56 + r * 8} width="8" height="8" fill="var(--danger)" fillOpacity="0.5" />
                        ) : null;
                      })
                    )}
                    <text x={cx} y={COL_TOP + 130} textAnchor="middle" fontSize="11" fill="var(--text-secondary)">非透明像素重叠 = 碰撞</text>
                  </>
                )}

                {/* 原理 */}
                <text x={cx} y={COL_TOP + 156} textAnchor="middle" fontSize="11" fill="var(--text-primary)">{t.principle}</text>

                {/* 评分：速度/精度/适用 */}
                <rect x={x} y={COL_TOP + 170} width={COL_W} height="92" rx="8" fill="var(--bg-elevated)" stroke="var(--border)" strokeWidth="0.8" />
                <text x={x + 12} y={COL_TOP + 190} fontSize="11" fill="var(--text-secondary)">
                  <tspan fontWeight="700" fill="var(--text-primary)">速度：</tspan>
                  <tspan fill={t.color}>{t.speed}</tspan>
                </text>
                <text x={x + 12} y={COL_TOP + 212} fontSize="11" fill="var(--text-secondary)">
                  <tspan fontWeight="700" fill="var(--text-primary)">精度：</tspan>
                  <tspan fill={t.color}>{t.precision}</tspan>
                </text>
                <text x={x + 12} y={COL_TOP + 234} fontSize="11" fill="var(--text-secondary)">
                  <tspan fontWeight="700" fill="var(--text-primary)">适用：</tspan>
                  <tspan fill="var(--text-primary)">{t.fit}</tspan>
                </text>
                <text x={x + 12} y={COL_TOP + 254} fontSize="11" fill="var(--text-secondary)">SFML: getGlobalBounds()</text>
              </g>
            );
          })}

          {/* ===== 底部总结栏 ===== */}
          <rect x="60" y={VIEW_H - 44} width={VIEW_W - 120} height="28" rx="10" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x={VIEW_W / 2} y={VIEW_H - 26} textAnchor="middle" fontSize="12" fill="var(--text-primary)">
            实战常用「先 AABB 粗筛，再像素精判」——粗筛淘汰绝大多数，精判只算少数候选
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        AABB 用矩形包围盒比四边，最快但最粗；圆形碰撞比圆心距与半径和，适合圆形物体；像素级逐像素比对非透明区，最精确但最慢。实际项目常分层组合：粗筛定候选，精判定真碰。
      </figcaption>
    </figure>
  );
}
