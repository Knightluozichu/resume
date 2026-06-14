/**
 * <GeometryShaderPipelineDiagram step={1}>：「几何着色器」管线位置示意图（HEL-75，C 实战型）。
 *
 * 把几何着色器在管线里的位置画清楚：顶点着色器 →【几何着色器（可增删改图元）】→ 光栅化，
 * 中间这格高亮（var(--accent)），并标注「可选阶段、能输入 1 个图元 → 输出 0/1/多个图元」。
 * 左格顶点着色器送来一个图元、右格光栅化收下被改造过的新图元，箭头上分别标「逐顶点」「图元级改造」。
 *
 * step prop（当前只有 1，留作 Stepper 第一步配图复用、与 emit-vertex / explode 两图同属一组分步）：
 *  - step=1（默认）：完整三格管线，几何着色器格高亮，下方一行小字点明「这一格能增删改图元」。
 *
 * Server Component（纯展示，静态 SVG，无交互、无 three、reduced-motion 无关）。
 * 视觉语言与既有 diagram 一致：token 色（var(--accent)/--success/--border/
 * --bg/--bg-elevated/--text-primary/--text-secondary），无阴影、rx 圆角、无裸 hex（硬规则 5）。
 */

export function GeometryShaderPipelineDiagram({ step = 1 }: { step?: 1 }) {
  void step; // 目前只有一步，保留 prop 以与同组分步图统一签名
  return (
    <figure className="mdx-figure mx-auto my-4">
      <div className="overflow-hidden rounded-card border border-border bg-elevated">
        <svg
          viewBox="0 0 600 220"
          role="img"
          aria-label="渲染管线的一段：顶点着色器处理每个顶点后，把一个图元送进几何着色器；几何着色器是一道可选阶段，能在这里增删改图元，输入一个图元可以输出零个、一个或多个图元；处理完再送往光栅化。中间几何着色器这一格被高亮标出。"
          className="mx-auto block h-auto w-full max-w-[600px]"
        >
          {/* ① 顶点着色器 */}
          <rect
            x="20"
            y="58"
            width="150"
            height="78"
            rx="8"
            fill="var(--bg)"
            stroke="var(--border)"
            strokeWidth="2"
          />
          <text
            x="95"
            y="92"
            textAnchor="middle"
            fontSize="14"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            顶点着色器
          </text>
          <text
            x="95"
            y="112"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            逐顶点处理
          </text>

          {/* ① → ② 送来一个图元 */}
          <line
            x1="170"
            y1="97"
            x2="222"
            y2="97"
            stroke="var(--accent)"
            strokeWidth="2"
          />
          <path d="M222 97 l-10 -5 l0 10 z" fill="var(--accent)" />
          <text
            x="196"
            y="86"
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            送来 1 个图元
          </text>

          {/* ② 几何着色器（高亮这一格） */}
          <rect
            x="224"
            y="50"
            width="172"
            height="94"
            rx="8"
            fill="var(--bg-elevated)"
            stroke="var(--accent)"
            strokeWidth="2.5"
          />
          <text
            x="310"
            y="82"
            textAnchor="middle"
            fontSize="14"
            fontWeight="600"
            fill="var(--accent)"
          >
            几何着色器
          </text>
          <text
            x="310"
            y="102"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-primary)"
          >
            可增删改图元
          </text>
          <text
            x="310"
            y="120"
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            可选阶段
          </text>

          {/* ② → ③ 输出 0/1/多个图元 */}
          <line
            x1="396"
            y1="97"
            x2="448"
            y2="97"
            stroke="var(--accent)"
            strokeWidth="2"
          />
          <path d="M448 97 l-10 -5 l0 10 z" fill="var(--accent)" />
          <text
            x="422"
            y="86"
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            输出 0/1/多个
          </text>

          {/* ③ 光栅化 */}
          <rect
            x="450"
            y="58"
            width="130"
            height="78"
            rx="8"
            fill="var(--bg)"
            stroke="var(--border)"
            strokeWidth="2"
          />
          <text
            x="515"
            y="92"
            textAnchor="middle"
            fontSize="14"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            光栅化
          </text>
          <text
            x="515"
            y="112"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            拆成片段
          </text>

          {/* 底部点题 */}
          <text
            x="300"
            y="188"
            textAnchor="middle"
            fontSize="12"
            fill="var(--text-secondary)"
          >
            几何着色器卡在
            <tspan fill="var(--accent)" fontWeight="600">
              {" "}
              图元装配之后、光栅化之前{" "}
            </tspan>
            ，是唯一能
            <tspan fill="var(--text-primary)" fontWeight="600">
              凭空增删图元
            </tspan>
            的阶段
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        顶点着色器逐顶点处理后送来<strong>一个图元</strong>，几何着色器在
        <strong>光栅化之前</strong>可以把它增删改造，输出
        <strong>零个、一个或多个</strong>新图元，再交给光栅化拆成片段。
      </figcaption>
    </figure>
  );
}
