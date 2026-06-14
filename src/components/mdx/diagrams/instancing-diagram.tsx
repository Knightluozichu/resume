/**
 * <InstancingDiagram>：「实例化」§3 实例化核心「一个模子 + 一张每实例变换表 → 盖出 N 个实例」示意（HEL-76，C 实战型）。
 *
 * 把本章最该一眼看懂的事画清楚：实例化 = 同一个网格（模子）只存一份，配一张「每实例一行」的
 * 变换表（每行是这个实例的偏移 / 缩放 / 变换），GPU 照着这张表把同一个模子「盖」出 N 个，一次 draw call。
 *  ① 左边：一个网格「模子」（一个小三角/方块代表「同一份几何」），标「只存一份」。
 *  ② 中间：一张「每实例变换表」——若干行，每行写 offset₀ / offset₁ / …（这一份是 gl_InstanceID=i 那一份）。
 *  ③ 右边：盖出来的 N 个实例（同一个模子，按表里各自的偏移摆在不同位置），标「一次 draw call」。
 *
 * Server Component（纯展示，静态 SVG，无交互、无 three、reduced-motion 无关）。
 * 视觉语言与既有 diagram 一致：token 色（var(--accent)/--success/--border/--bg/--bg-elevated/
 * --text-primary/--text-secondary），无阴影、rx 圆角、无裸 hex（硬规则 5）。
 */

export function InstancingDiagram() {
  // 右侧「盖出来的实例」散布坐标（同一个模子摆在不同位置，演示「按表里偏移各就各位」）。
  const instances: { x: number; y: number; idx: number }[] = [
    { x: 545, y: 70, idx: 0 },
    { x: 615, y: 95, idx: 1 },
    { x: 565, y: 140, idx: 2 },
    { x: 640, y: 165, idx: 3 },
    { x: 595, y: 205, idx: 4 },
  ];

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated">
        <svg
          viewBox="0 0 720 290"
          role="img"
          aria-label="实例化原理示意，分左中右三部分。左边是一个网格模子，画成一个小方块代表同一份几何数据，标着只存一份。中间是一张每实例变换表，竖着排了五行，第一行写偏移 0、第二行写偏移 1，依此类推到第四行，每一行就是一个实例自己的变换数据，对应着色器里的 gl_InstanceID 等于第几行。右边是照着这张表盖出来的五个实例，它们是同一个模子，按表里各自的偏移摆在画面不同位置，整批只用一次 draw call 就画完。一句话：实例化就是同一个模子只存一份，配一张每实例一行的变换表，GPU 照表把模子盖出很多份，一次 draw call。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <defs>
            <marker
              id="inst-arrow"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="7"
              markerHeight="7"
              orient="auto-start-reverse"
            >
              <path d="M0 0 L10 5 L0 10 z" fill="var(--accent)" />
            </marker>
          </defs>

          {/* ============ 左：一个网格模子（只存一份） ============ */}
          <text
            x="95"
            y="32"
            textAnchor="middle"
            fontSize="13"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            一个网格「模子」
          </text>
          <rect
            x="50"
            y="48"
            width="90"
            height="90"
            rx="8"
            fill="var(--accent)"
            opacity="0.28"
            stroke="var(--accent)"
            strokeWidth="2"
          />
          {/* 模子里画一个小三角，强调「这是一份几何」 */}
          <path
            d="M95 66 L122 120 L68 120 z"
            fill="var(--accent)"
            opacity="0.65"
            stroke="var(--text-primary)"
            strokeWidth="1"
          />
          <text
            x="95"
            y="156"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            同一份几何
          </text>
          <text
            x="95"
            y="172"
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill="var(--accent)"
          >
            只存一份 VBO
          </text>

          {/* 模子 → 表 的箭头 */}
          <line
            x1="148"
            y1="93"
            x2="208"
            y2="93"
            stroke="var(--accent)"
            strokeWidth="2"
            markerEnd="url(#inst-arrow)"
          />
          <text
            x="178"
            y="84"
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            配一张表
          </text>

          {/* ============ 中：每实例变换表 ============ */}
          <text
            x="320"
            y="32"
            textAnchor="middle"
            fontSize="13"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            每实例变换表（每行一个实例）
          </text>
          {[0, 1, 2, 3, 4].map((i) => {
            const y = 48 + i * 36;
            const isMore = i === 4;
            return (
              <g key={i}>
                <rect
                  x="220"
                  y={y}
                  width="200"
                  height="30"
                  rx="4"
                  fill={isMore ? "var(--bg)" : "var(--accent)"}
                  opacity={isMore ? 1 : 0.14}
                  stroke="var(--border)"
                  strokeWidth="1.5"
                  strokeDasharray={isMore ? "4 3" : undefined}
                />
                {isMore ? (
                  <text
                    x="320"
                    y={y + 20}
                    textAnchor="middle"
                    fontSize="12"
                    fill="var(--text-secondary)"
                  >
                    … 第 N 行
                  </text>
                ) : (
                  <>
                    <text
                      x="234"
                      y={y + 20}
                      textAnchor="start"
                      fontSize="11"
                      fontFamily="monospace"
                      fill="var(--accent)"
                    >
                      [{i}]
                    </text>
                    <text
                      x="320"
                      y={y + 20}
                      textAnchor="middle"
                      fontSize="11"
                      fontFamily="monospace"
                      fill="var(--text-primary)"
                    >
                      offset / 变换 #{i}
                    </text>
                  </>
                )}
              </g>
            );
          })}
          <text
            x="320"
            y="252"
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            第 i 行 = 着色器里 gl_InstanceID == i 那一份
          </text>

          {/* 表 → 实例 的箭头 */}
          <line
            x1="424"
            y1="120"
            x2="500"
            y2="120"
            stroke="var(--accent)"
            strokeWidth="2"
            markerEnd="url(#inst-arrow)"
          />
          <text
            x="462"
            y="111"
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            照表盖出
          </text>

          {/* ============ 右：盖出来的 N 个实例 ============ */}
          <text
            x="600"
            y="32"
            textAnchor="middle"
            fontSize="13"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            盖出 N 个实例
          </text>
          {instances.map((p) => (
            <g key={p.idx}>
              <path
                d={`M${p.x} ${p.y - 14} L${p.x + 14} ${p.y + 14} L${p.x - 14} ${p.y + 14} z`}
                fill="var(--accent)"
                opacity="0.6"
                stroke="var(--text-primary)"
                strokeWidth="0.8"
              />
              <text
                x={p.x}
                y={p.y + 9}
                textAnchor="middle"
                fontSize="8"
                fontFamily="monospace"
                fill="var(--text-primary)"
              >
                {p.idx}
              </text>
            </g>
          ))}
          <text
            x="600"
            y="252"
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill="var(--success)"
          >
            一次 draw call 全画完
          </text>

          {/* —— 底部一句话总括 —— */}
          <text
            x="360"
            y="282"
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill="var(--accent)"
          >
            同一个模子只存一份 + 一张每实例变换表 → GPU 照表盖出 N 份，一次 draw
            call
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        实例化的核心：<strong>同一个网格只存一份</strong>，配一张
        <strong>「每实例一行」的变换表</strong>（第 <code>i</code>{" "}
        行对应着色器里 <code>gl_InstanceID == i</code>）；GPU 照表把这个模子
        <strong>盖出 N 份</strong>
        、各按自己那行的偏移摆好，整批只用<strong>一次 draw call</strong>。
      </figcaption>
    </figure>
  );
}
