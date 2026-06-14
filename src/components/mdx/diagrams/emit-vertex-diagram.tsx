/**
 * <EmitVertexDiagram>：「几何着色器」一个点如何被 EmitVertex 造成一个四边形（HEL-75，C 实战型）。
 *
 * 左边：输入只有 1 个点（一个 gl_in[0] 的位置）。
 * 中间：几何着色器在这个点周围 EmitVertex() 发出 4 个顶点（标 ①②③④ 发出顺序），
 *        4 发完后 EndPrimitive() 收尾。
 * 右边：这 4 个顶点被 triangle_strip 连成一个四边形（billboard）——0 维的点凭空长成了一片面。
 *
 * 强调「输入 1 个图元 → 输出 1 个更大的图元」「EmitVertex 一次发一个顶点、EndPrimitive 收尾成图元」。
 *
 * Server Component（纯展示，静态 SVG，无交互、无 three、reduced-motion 无关）。
 * 视觉语言与既有 diagram 一致：token 色（var(--accent)/--success/--border/
 * --bg/--bg-elevated/--text-primary/--text-secondary），无阴影、rx 圆角、无裸 hex（硬规则 5）。
 */

export function EmitVertexDiagram() {
  // 中间 / 右边四边形的四角（相对各自中心），发出顺序 ①左下 ②右下 ③左上 ④右上（triangle_strip 顺序）
  const corners = [
    { dx: -34, dy: 34, n: "①" },
    { dx: 34, dy: 34, n: "②" },
    { dx: -34, dy: -34, n: "③" },
    { dx: 34, dy: -34, n: "④" },
  ];
  const midCx = 300;
  const midCy = 96;
  const rightCx = 506;
  const rightCy = 96;

  return (
    <figure className="mdx-figure mx-auto my-4">
      <div className="overflow-hidden rounded-card border border-border bg-elevated">
        <svg
          viewBox="0 0 600 220"
          role="img"
          aria-label="几何着色器把一个点造成一个四边形。左边输入只有一个点。中间几何着色器在这个点周围用 EmitVertex 依次发出四个顶点，编号一到四，发完后用 EndPrimitive 收尾。右边这四个顶点被连成一个四边形，原本零维的点凭空长成了一片面。"
          className="mx-auto block h-auto w-full max-w-[600px]"
        >
          {/* ===== 左：输入一个点 ===== */}
          <text
            x="80"
            y="36"
            textAnchor="middle"
            fontSize="12"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            输入：1 个点
          </text>
          <rect
            x="20"
            y="50"
            width="120"
            height="92"
            rx="8"
            fill="var(--bg)"
            stroke="var(--border)"
            strokeWidth="2"
          />
          <circle cx="80" cy="96" r="5" fill="var(--accent)" />
          <text
            x="80"
            y="124"
            textAnchor="middle"
            fontSize="10"
            className="font-mono"
            fill="var(--text-secondary)"
          >
            gl_in[0]
          </text>

          {/* 左 → 中 箭头 */}
          <line
            x1="140"
            y1="96"
            x2="186"
            y2="96"
            stroke="var(--accent)"
            strokeWidth="2"
          />
          <path d="M186 96 l-10 -5 l0 10 z" fill="var(--accent)" />

          {/* ===== 中：EmitVertex 发出 4 个顶点 ===== */}
          <text
            x={midCx}
            y="36"
            textAnchor="middle"
            fontSize="12"
            fontWeight="600"
            fill="var(--accent)"
          >
            EmitVertex() × 4
          </text>
          <rect
            x={midCx - 62}
            y="50"
            width="124"
            height="92"
            rx="8"
            fill="var(--bg)"
            stroke="var(--accent)"
            strokeWidth="2"
            strokeDasharray="5 3"
          />
          {corners.map((c) => (
            <g key={c.n}>
              <circle
                cx={midCx + c.dx}
                cy={midCy + c.dy}
                r="4.5"
                fill="var(--accent)"
              />
              <text
                x={midCx + c.dx + (c.dx > 0 ? 11 : -11)}
                y={midCy + c.dy + (c.dy > 0 ? 4 : -2)}
                textAnchor="middle"
                fontSize="11"
                fontWeight="600"
                fill="var(--accent)"
              >
                {c.n}
              </text>
            </g>
          ))}
          <text
            x={midCx}
            y="164"
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            发完 4 个 → EndPrimitive()
          </text>

          {/* 中 → 右 箭头 */}
          <line
            x1="392"
            y1="96"
            x2="438"
            y2="96"
            stroke="var(--accent)"
            strokeWidth="2"
          />
          <path d="M438 96 l-10 -5 l0 10 z" fill="var(--accent)" />

          {/* ===== 右：连成一个四边形 ===== */}
          <text
            x={rightCx}
            y="36"
            textAnchor="middle"
            fontSize="12"
            fontWeight="600"
            fill="var(--success)"
          >
            输出：1 个四边形
          </text>
          <polygon
            points={`${rightCx - 34},${rightCy - 34} ${rightCx + 34},${rightCy - 34} ${rightCx + 34},${rightCy + 34} ${rightCx - 34},${rightCy + 34}`}
            fill="var(--accent)"
            fillOpacity="0.28"
            stroke="var(--accent)"
            strokeWidth="2"
          />
          {corners.map((c) => (
            <circle
              key={`r${c.n}`}
              cx={rightCx + c.dx}
              cy={rightCy + c.dy}
              r="4"
              fill="var(--accent)"
            />
          ))}
          <text
            x={rightCx}
            y="164"
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            一片 billboard 面
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        输入只有<strong>一个点</strong>，几何着色器用 <code>EmitVertex()</code>
        在它周围依次<strong>发出 4 个顶点</strong>（①→④），再用{" "}
        <code>EndPrimitive()</code> 收尾，<strong>triangle_strip</strong>{" "}
        就把它们连成了<strong>一个四边形</strong>——0 维的点凭空长成了一片面。
      </figcaption>
    </figure>
  );
}
