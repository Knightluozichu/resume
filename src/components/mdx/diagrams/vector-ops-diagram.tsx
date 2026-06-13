/**
 * <VectorOpsDiagram>：「变换」§3「向量运算」小节的核心掰碎图（HEL-35，B 数学型）。
 *
 * 三栏把向量运算的几何直觉画清楚（小白最该「看」而不是「记公式」的部分）：
 *  ①加法 = 首尾相接：把 b 的尾巴接到 a 的头上，从 a 的尾巴到 b 的头的那条就是 a+b
 *    （正是平行四边形的对角线）。同时用淡线点出取负 −a（反向）。
 *  ②数乘 = 沿原方向伸缩：2a 同向拉长一倍，−0.5a 反向缩短一半。
 *  ③点乘 & 叉乘：点乘→看夹角 θ（a·b=|a||b|cosθ，投影直觉）；叉乘→垂直于两者的新向量。
 *
 * 这是「向量运算」节的纯图示掰碎图，配合 §4 的代数公式一起读：图给直觉、公式给精确。
 *
 * Server Component（纯展示，静态 SVG，无交互、无 three、reduced-motion 无关）。
 * 视觉语言与既有 diagram 一致：token 色（var(--accent)/--success/--warning/--danger/
 * --border/--bg/--bg-elevated/--text-primary/--text-secondary），无阴影、rx 圆角（硬规则 5）。
 */

export function VectorOpsDiagram() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated">
        <svg
          viewBox="0 0 660 360"
          role="img"
          aria-label="向量运算的几何直觉，分三栏。第一栏：向量加法是首尾相接，把向量 b 的起点接到向量 a 的终点，从 a 的起点到 b 的终点连出的就是 a 加 b，它正好是以 a、b 为两边的平行四边形的对角线；同时画出取负负 a 是把 a 反向。第二栏：数乘是沿原方向伸缩，2 乘 a 同向拉长一倍，负 0.5 乘 a 反向缩短一半。第三栏：点乘看两向量夹角，a 点乘 b 等于 a 的长度乘 b 的长度再乘夹角的余弦；叉乘得到一个同时垂直于 a 和 b 的新向量。"
          className="mx-auto block h-auto w-full max-w-[660px]"
        >
          <defs>
            <marker
              id="vecops-arrow-accent"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M0 0 L10 5 L0 10 z" fill="var(--accent)" />
            </marker>
            <marker
              id="vecops-arrow-success"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M0 0 L10 5 L0 10 z" fill="var(--success)" />
            </marker>
            <marker
              id="vecops-arrow-warning"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M0 0 L10 5 L0 10 z" fill="var(--warning)" />
            </marker>
            <marker
              id="vecops-arrow-danger"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M0 0 L10 5 L0 10 z" fill="var(--danger)" />
            </marker>
            <marker
              id="vecops-arrow-secondary"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M0 0 L10 5 L0 10 z" fill="var(--text-secondary)" />
            </marker>
          </defs>

          {/* ============ 第一栏：加法 = 首尾相接 ============ */}
          <text
            x="115"
            y="28"
            textAnchor="middle"
            fontSize="13"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            加法：首尾相接
          </text>

          {/* a：从原点 (40,200) 指向 (140,140) */}
          <line
            x1="40"
            y1="200"
            x2="140"
            y2="140"
            stroke="var(--accent)"
            strokeWidth="2.5"
            markerEnd="url(#vecops-arrow-accent)"
          />
          <text x="78" y="160" fontSize="12" fill="var(--accent)">
            a
          </text>
          {/* b：把尾巴接到 a 的头 (140,140)，指向 (210,170) */}
          <line
            x1="140"
            y1="140"
            x2="210"
            y2="170"
            stroke="var(--warning)"
            strokeWidth="2.5"
            markerEnd="url(#vecops-arrow-warning)"
          />
          <text x="172" y="142" fontSize="12" fill="var(--warning)">
            b
          </text>
          {/* a+b：从原点直达 b 的头 (210,170) —— 对角线 */}
          <line
            x1="40"
            y1="200"
            x2="210"
            y2="170"
            stroke="var(--success)"
            strokeWidth="2.5"
            markerEnd="url(#vecops-arrow-success)"
          />
          <text x="110" y="205" fontSize="12" fill="var(--success)">
            a + b
          </text>
          {/* 取负 −a：反向淡线 */}
          <line
            x1="40"
            y1="200"
            x2="-60"
            y2="260"
            stroke="var(--text-secondary)"
            strokeWidth="1.5"
            strokeDasharray="4 3"
            markerEnd="url(#vecops-arrow-secondary)"
            opacity="0.7"
          />
          <text
            x="115"
            y="300"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            从 a 尾到 b 头 = a+b
          </text>
          <text
            x="115"
            y="318"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            取负 −a 是 a 反向
          </text>

          {/* 分隔竖线 */}
          <line
            x1="230"
            y1="40"
            x2="230"
            y2="330"
            stroke="var(--border)"
            strokeWidth="1"
          />

          {/* ============ 第二栏：数乘 = 沿向伸缩 ============ */}
          <text
            x="345"
            y="28"
            textAnchor="middle"
            fontSize="13"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            数乘：沿向伸缩
          </text>

          {/* 原点 (300,200) */}
          {/* 2a：同向拉长（指向 (440,90)） */}
          <line
            x1="300"
            y1="200"
            x2="440"
            y2="90"
            stroke="var(--text-secondary)"
            strokeWidth="1.5"
            strokeDasharray="4 3"
            markerEnd="url(#vecops-arrow-secondary)"
            opacity="0.7"
          />
          <text x="445" y="92" fontSize="12" fill="var(--text-secondary)">
            2a
          </text>
          {/* a：半长（指向 (370,145)） */}
          <line
            x1="300"
            y1="200"
            x2="370"
            y2="145"
            stroke="var(--accent)"
            strokeWidth="2.5"
            markerEnd="url(#vecops-arrow-accent)"
          />
          <text x="372" y="140" fontSize="12" fill="var(--accent)">
            a
          </text>
          {/* −0.5a：反向缩短（指向 (265,228)） */}
          <line
            x1="300"
            y1="200"
            x2="265"
            y2="228"
            stroke="var(--danger)"
            strokeWidth="2.5"
            markerEnd="url(#vecops-arrow-danger)"
          />
          <text x="232" y="245" fontSize="12" fill="var(--danger)">
            −0.5a
          </text>
          <text
            x="345"
            y="300"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            乘正数同向缩放
          </text>
          <text
            x="345"
            y="318"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            乘负数反向
          </text>

          {/* 分隔竖线 */}
          <line
            x1="460"
            y1="40"
            x2="460"
            y2="330"
            stroke="var(--border)"
            strokeWidth="1"
          />

          {/* ============ 第三栏：点乘看夹角 / 叉乘出垂直 ============ */}
          <text
            x="560"
            y="28"
            textAnchor="middle"
            fontSize="13"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            点乘看夹角 · 叉乘出垂直
          </text>

          {/* 原点 (510,150) */}
          {/* a 向右 */}
          <line
            x1="510"
            y1="150"
            x2="620"
            y2="150"
            stroke="var(--accent)"
            strokeWidth="2.5"
            markerEnd="url(#vecops-arrow-accent)"
          />
          <text x="624" y="154" fontSize="12" fill="var(--accent)">
            a
          </text>
          {/* b 斜上 */}
          <line
            x1="510"
            y1="150"
            x2="590"
            y2="80"
            stroke="var(--warning)"
            strokeWidth="2.5"
            markerEnd="url(#vecops-arrow-warning)"
          />
          <text x="592" y="78" fontSize="12" fill="var(--warning)">
            b
          </text>
          {/* 夹角 θ 弧 */}
          <path
            d="M548 150 A 38 38 0 0 0 535 122"
            fill="none"
            stroke="var(--text-secondary)"
            strokeWidth="1.5"
          />
          <text x="552" y="134" fontSize="12" fill="var(--text-secondary)">
            θ
          </text>
          {/* a×b：垂直新向量（向下出纸面示意，画一根向下的箭头 + ⊥ 记号） */}
          <line
            x1="510"
            y1="150"
            x2="510"
            y2="250"
            stroke="var(--success)"
            strokeWidth="2.5"
            markerEnd="url(#vecops-arrow-success)"
          />
          <text x="516" y="244" fontSize="12" fill="var(--success)">
            a × b
          </text>
          <text
            x="560"
            y="300"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            点乘 a·b=|a||b|cosθ
          </text>
          <text
            x="560"
            y="318"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            叉乘得垂直于两者
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        向量加法是「首尾相接」：把 b 的尾接到 a 的头，从 a 尾到 b 头那条就是
        a+b（平行四边形对角线）；取负是反向、数乘是沿原方向伸缩。点乘 a·b =
        |a||b|cosθ 跟两向量夹角挂钩，叉乘 a×b 给出一根同时垂直于 a、b 的新向量。
      </figcaption>
    </figure>
  );
}
