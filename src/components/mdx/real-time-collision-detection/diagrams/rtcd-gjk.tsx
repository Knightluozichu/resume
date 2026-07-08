/**
 * <RtcdGjkDiagram>：GJK 算法（Minkowski 差 + 单纯形演进）图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 440;

export function RtcdGjkDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="GJK 算法 Minkowski 差与单纯形演进图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            GJK：Minkowski 差与单纯形向原点逼近
          </text>

          {/* 左侧：两个凸体 A、B */}
          <rect x="20" y="50" width="280" height="370" rx="10" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.3" />
          <text x="160" y="72" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--accent)">原始空间：凸体 A 与 B</text>

          {/* 凸体 A（三角形） */}
          <polygon points="70,110 140,100 130,160 80,165" fill="var(--success)" fillOpacity="0.15" stroke="var(--success)" strokeWidth="1.5" />
          <text x="100" y="140" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">A</text>

          {/* 凸体 B（四边形，与 A 分离） */}
          <polygon points="190,200 250,195 255,250 200,260" fill="var(--warning)" fillOpacity="0.15" stroke="var(--warning)" strokeWidth="1.5" />
          <text x="225" y="232" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">B</text>

          {/* 支撑点说明 */}
          <circle cx="140" cy="100" r="3" fill="var(--success)" />
          <text x="148" y="98" fontSize="9" fill="var(--success)">支撑点</text>
          <circle cx="190" cy="200" r="3" fill="var(--warning)" />
          <text x="135" y="195" fontSize="9" fill="var(--warning)">支撑点</text>

          <text x="160" y="300" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">
            支撑函数 S_A(d) = A 中沿 d 最远点
          </text>
          <text x="160" y="316" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">
            Minkowski 差：C = A &ominus; B
          </text>
          <text x="160" y="332" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">
            C 中点 = S_A(d) &minus; S_B(&minus;d)
          </text>
          <text x="160" y="358" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--accent)">
            碰撞 &hArr; 原点 &isin; C
          </text>
          <text x="160" y="376" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">
            GJK 不显式构造 C，用支撑函数迭代
          </text>
          <text x="160" y="400" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">
            逐渐逼近原点的单纯形
          </text>

          {/* 中间箭头 */}
          <text x="315" y="230" fontSize="28" fill="var(--text-tertiary)">&rarr;</text>

          {/* 右侧：Minkowski 差空间 + 单纯形演进 */}
          <rect x="340" y="50" width="380" height="370" rx="10" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.3" />
          <text x="530" y="72" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--accent)">Minkowski 差空间 C</text>

          {/* 原点 */}
          <circle cx="530" cy="235" r="4" fill="var(--warning)" />
          <text x="538" y="232" fontSize="10" fontWeight="600" fill="var(--warning)">原点 O</text>
          <line x1="510" y1="235" x2="555" y2="235" stroke="var(--text-tertiary)" strokeWidth="0.5" strokeOpacity="0.4" />
          <line x1="530" y1="210" x2="530" y2="265" stroke="var(--text-tertiary)" strokeWidth="0.5" strokeOpacity="0.4" />

          {/* Minkowski 差轮廓（虚线，不含原点 → 未碰撞） */}
          <polygon points="420,120 680,140 660,330 410,310" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.2" strokeDasharray="5 4" strokeOpacity="0.5" />
          <text x="430" y="115" fontSize="9" fill="var(--accent)">C = A &ominus; B</text>

          {/* 单纯形演进：点 → 线 → 三角形 */}
          {/* 第 1 步：单点 */}
          <circle cx="460" cy="150" r="5" fill="var(--success)" />
          <text x="460" y="138" textAnchor="middle" fontSize="9" fill="var(--success)">v1</text>

          {/* 第 2 步：线段 */}
          <line x1="460" y1="150" x2="610" y2="175" stroke="var(--accent)" strokeWidth="2" />
          <circle cx="610" cy="175" r="5" fill="var(--accent)" />
          <text x="610" y="166" textAnchor="middle" fontSize="9" fill="var(--accent)">v2</text>

          {/* 第 3 步：三角形 */}
          <polygon points="460,150 610,175 480,290" fill="var(--warning)" fillOpacity="0.1" stroke="var(--warning)" strokeWidth="1.5" />
          <circle cx="480" cy="290" r="5" fill="var(--warning)" />
          <text x="480" y="306" textAnchor="middle" fontSize="9" fill="var(--warning)">v3</text>

          {/* 向原点方向 */}
          <line x1="510" y1="205" x2="528" y2="232" stroke="var(--text-tertiary)" strokeWidth="1" strokeDasharray="3 2" />
          <polygon points="528,232 522,226 524,234" fill="var(--text-tertiary)" />

          {/* 步骤说明 */}
          <text x="360" y="360" fontSize="10" fill="var(--success)">① 初始方向 d，取 v1 = S(d)</text>
          <text x="360" y="378" fontSize="10" fill="var(--accent)">② 朝原点取 v2，构成线段</text>
          <text x="360" y="396" fontSize="10" fill="var(--warning)">③ 取 v3 构成三角形，判断原点是否在内部</text>
          <text x="360" y="414" fontSize="10" fill="var(--text-tertiary)">④ 不在则去掉最远顶点，沿新方向继续迭代</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        GJK——用支撑函数在 Minkowski 差上构建单纯形，逐步逼近原点判定碰撞
      </figcaption>
    </figure>
  );
}
