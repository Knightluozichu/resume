/**
 * <Gep2CollisionSystemDiagram>：碰撞系统——广相/窄相/流形图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 440;

export function Gep2CollisionSystemDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="碰撞系统广相窄相流形图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text
            x={VIEW_W / 2}
            y="32"
            textAnchor="middle"
            fontSize="16"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            碰撞系统：广相 → 窄相 → 流形 → 求解
          </text>

          {/* 三阶段主流程 */}
          {[
            {
              x: 40,
              label: "广相 Broadphase",
              sub: "AABB / Sweep&Prune",
              c: "var(--success)",
              detail: "快速排除显然不相交对",
              out: "候选对列表",
            },
            {
              x: 270,
              label: "窄相 Narrowphase",
              sub: "GJK / SAT",
              c: "var(--accent)",
              detail: "精确判断是否相交",
              out: "是否碰撞 + 接触点",
            },
            {
              x: 500,
              label: "流形 Manifold",
              sub: "接触点/法线/深度",
              c: "var(--warning)",
              detail: "构造求解所需数据",
              out: "Contact Manifold",
            },
          ].map((s, i) => (
            <g key={i}>
              <rect
                x={s.x}
                y="60"
                width="200"
                height="118"
                rx="10"
                fill={s.c}
                fillOpacity="0.1"
                stroke={s.c}
                strokeWidth="1.4"
              />
              <text
                x={s.x + 100}
                y="84"
                textAnchor="middle"
                fontSize="13"
                fontWeight="700"
                fill="var(--text-primary)"
              >
                {s.label}
              </text>
              <text
                x={s.x + 100}
                y="102"
                textAnchor="middle"
                fontSize="11"
                fill={s.c}
              >
                {s.sub}
              </text>
              <text
                x={s.x + 100}
                y="122"
                textAnchor="middle"
                fontSize="11"
                fill="var(--text-secondary)"
              >
                {s.detail}
              </text>
              <text
                x={s.x + 100}
                y="142"
                textAnchor="middle"
                fontSize="10"
                fill="var(--text-tertiary)"
              >
                输出：{s.out}
              </text>
              {i < 2 && (
                <text
                  x={s.x + 218}
                  y="124"
                  textAnchor="middle"
                  fontSize="18"
                  fill="var(--text-tertiary)"
                >
                  &rarr;
                </text>
              )}
            </g>
          ))}

          {/* 广相示意 */}
          <rect
            x="40"
            y="196"
            width="200"
            height="86"
            rx="10"
            fill="var(--success)"
            fillOpacity="0.05"
            stroke="var(--success)"
            strokeWidth="1"
            strokeOpacity="0.4"
          />
          <text
            x="140"
            y="216"
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill="var(--success)"
          >
            包围盒扫掠排序
          </text>
          <text x="54" y="236" fontSize="10" fill="var(--text-secondary)">
            O(n²) 全配对 → 不可行
          </text>
          <text x="54" y="252" fontSize="10" fill="var(--success)">
            按 AABB 端点排序扫掠
          </text>
          <text x="54" y="268" fontSize="10" fill="var(--success)">
            仅轴重叠者进候选对
          </text>

          {/* 窄相示意 */}
          <rect
            x="270"
            y="196"
            width="200"
            height="86"
            rx="10"
            fill="var(--accent)"
            fillOpacity="0.05"
            stroke="var(--accent)"
            strokeWidth="1"
            strokeOpacity="0.4"
          />
          <text
            x="370"
            y="216"
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill="var(--accent)"
          >
            凸体距离 / 分离轴
          </text>
          <text x="284" y="236" fontSize="10" fill="var(--text-secondary)">
            GJK：求最近点距离
          </text>
          <text x="284" y="252" fontSize="10" fill="var(--text-secondary)">
            距离 ≤ 0 即相交
          </text>
          <text x="284" y="268" fontSize="10" fill="var(--accent)">
            EPA：从相交扩出穿透深度
          </text>

          {/* 流形示意 */}
          <rect
            x="500"
            y="196"
            width="200"
            height="86"
            rx="10"
            fill="var(--warning)"
            fillOpacity="0.05"
            stroke="var(--warning)"
            strokeWidth="1"
            strokeOpacity="0.4"
          />
          <text
            x="600"
            y="216"
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill="var(--warning)"
          >
            接触流形构造
          </text>
          <text x="514" y="236" fontSize="10" fill="var(--text-secondary)">
            法线 n：最浅穿透方向
          </text>
          <text x="514" y="252" fontSize="10" fill="var(--text-secondary)">
            深度 d：沿 n 的穿透量
          </text>
          <text x="514" y="268" fontSize="10" fill="var(--warning)">
            点 p：接触位置（可能多点）
          </text>

          {/* 到求解 */}
          <text
            x={VIEW_W / 2}
            y="306"
            textAnchor="middle"
            fontSize="18"
            fill="var(--text-tertiary)"
          >
            &darr;
          </text>

          {/* 求解 */}
          <rect
            x="40"
            y="318"
            width="660"
            height="70"
            rx="10"
            fill="var(--accent)"
            fillOpacity="0.06"
            stroke="var(--accent)"
            strokeWidth="1"
            strokeOpacity="0.4"
          />
          <text
            x="370"
            y="340"
            textAnchor="middle"
            fontSize="12"
            fontWeight="600"
            fill="var(--accent)"
          >
            约束求解器：把流形交给物理引擎
          </text>
          <text
            x="370"
            y="358"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            沿法线施加冲量 λ = -(1+e)·v_rel·n / (1/m₁+1/m₂)
          </text>
          <text
            x="370"
            y="376"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-tertiary)"
          >
            迭代求解多个接触点，消除穿透与速度堆叠
          </text>

          <text
            x={VIEW_W / 2}
            y="412"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-tertiary)"
          >
            设计要点：广相做减法、窄相做精度、流形做翻译——三者分工把 O(n²)
            压到可控
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        碰撞检测三阶段——广相筛候选、窄相定相交、流形供求解，逐级精化
      </figcaption>
    </figure>
  );
}
