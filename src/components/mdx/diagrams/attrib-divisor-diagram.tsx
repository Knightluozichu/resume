/**
 * <AttribDivisorDiagram mode="divisor0"|"divisor1"|"compare">：「实例化」§3 / §5 的核心难点图（HEL-76，C 实战型）。
 *
 * 把 glVertexAttribDivisor 的两种步进语义掰碎、并排对照——本章最该一眼看懂的一张图：
 *  ① divisor=0（默认，逐顶点）：着色器每处理「一个顶点」就往下读表的下一条 → 表里每条对应一个顶点，
 *     画一个网格（4 个顶点）配 4 条属性「v0 v1 v2 v3」，箭头一条对一个顶点。
 *  ② divisor=1（每实例）：着色器每开始「一个新实例」才往下读表的下一条 → 同一个实例内所有顶点共用同一条，
 *     画 3 个实例（每个实例同样的 4 个顶点）共用 3 条属性「i0 i1 i2」，一条覆盖整个实例的所有顶点。
 *  ③ compare：上下并列上面两态，强调「忘了 divisor=1，实例属性被当逐顶点读 → 所有实例叠在一起 / 错乱」。
 *
 * 不传 mode 时默认 "compare"（章节正文当 divisor 概念主图）。
 *
 * Server Component（纯展示，静态 SVG，无交互、无 three、reduced-motion 无关）。
 * 视觉语言与既有 diagram 一致：token 色（var(--accent)/--success/--warning/--border/--bg/
 * --bg-elevated/--text-primary/--text-secondary），无阴影、rx 圆角、无裸 hex（硬规则 5）。
 */

type DivisorMode = "divisor0" | "divisor1" | "compare";

const ARIA: Record<DivisorMode, string> = {
  divisor0:
    "属性步进 divisor 等于 0 的情况，也就是默认的逐顶点步进。着色器每处理一个顶点，就从属性表里往下读一条新数据。所以一行四个顶点 v0 v1 v2 v3 各自对应表里的一条数据，箭头是一条对一个顶点。普通的位置、法线、纹理坐标都是这样逐顶点读。",
  divisor1:
    "属性步进 divisor 等于 1 的情况，也就是每实例步进一次。着色器只有每开始画一个新实例时，才从属性表里往下读一条新数据；同一个实例内部所有顶点都共用这一条。所以画三个实例，每个实例内部的四个顶点都读同一条数据，三个实例 i0 i1 i2 各用表里一条，一条覆盖整个实例的所有顶点。这就是实例化数组的步进方式，每个实例一份偏移或变换矩阵。",
  compare:
    "把两种步进方式并排对照。上面是 divisor 等于 0 逐顶点步进：每个顶点读表里一条，普通顶点属性都这样。下面是 divisor 等于 1 每实例步进：同一个实例内所有顶点共用一条，每开始新实例才往下读一条，这才是实例化数组要的步进。关键提醒：如果实例属性忘了设 divisor 等于 1，它会被当成逐顶点读，导致所有实例的偏移全错、叠在一起或乱掉。",
};

export function AttribDivisorDiagram({
  mode = "compare",
}: {
  mode?: DivisorMode;
}) {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated">
        <svg
          viewBox={mode === "compare" ? "0 0 640 420" : "0 0 640 220"}
          role="img"
          aria-label={ARIA[mode]}
          className="mx-auto block h-auto w-full max-w-[640px]"
        >
          {mode === "divisor0" && <Divisor0 y={0} />}
          {mode === "divisor1" && <Divisor1 y={0} />}
          {mode === "compare" && (
            <>
              <Divisor0 y={0} />
              <line
                x1="40"
                y1="210"
                x2="600"
                y2="210"
                stroke="var(--border)"
                strokeWidth="1"
                strokeDasharray="4 4"
              />
              <Divisor1 y={210} />
            </>
          )}
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        {mode === "divisor0" && (
          <>
            <strong>divisor=0（逐顶点）</strong>：每处理一个顶点就读表的下一条——
            普通的位置 / 法线 / uv 都这样。
          </>
        )}
        {mode === "divisor1" && (
          <>
            <strong>divisor=1（每实例）</strong>：每开始一个新实例才读下一条，
            同一实例内所有顶点<strong>共用一条</strong>——实例化数组就靠它。
          </>
        )}
        {mode === "compare" && (
          <>
            <code>glVertexAttribDivisor(loc, 0)</code> <strong>逐顶点</strong>
            （每个顶点读一条）vs <code>(loc, 1)</code> <strong>每实例</strong>
            （一条覆盖整个实例所有顶点）。实例属性<strong>忘设 1</strong>
            ＝被当逐顶点读、所有实例叠一起。
          </>
        )}
      </figcaption>
    </figure>
  );
}

/* ============ divisor=0：逐顶点步进 ============ */
function Divisor0({ y }: { y: number }) {
  // 4 个顶点 + 表里 4 条属性，一条对一个顶点。
  const verts = [0, 1, 2, 3];
  const cellW = 96;
  const tableStartX = 120;
  return (
    <g transform={`translate(0 ${y})`}>
      <text
        x="40"
        y="28"
        textAnchor="start"
        fontSize="13"
        fontWeight="600"
        fill="var(--text-primary)"
      >
        divisor = 0：逐顶点步进（每个顶点读一条）
      </text>

      {/* 上排：4 个顶点 */}
      {verts.map((v) => (
        <g key={v}>
          <circle
            cx={tableStartX + v * cellW + (cellW - 6) / 2}
            cy="62"
            r="13"
            fill="var(--text-secondary)"
            opacity="0.3"
            stroke="var(--border)"
            strokeWidth="1.5"
          />
          <text
            x={tableStartX + v * cellW + (cellW - 6) / 2}
            y="66"
            textAnchor="middle"
            fontSize="11"
            fontFamily="monospace"
            fill="var(--text-primary)"
          >
            v{v}
          </text>
        </g>
      ))}
      <text
        x="60"
        y="66"
        textAnchor="middle"
        fontSize="10"
        fill="var(--text-secondary)"
      >
        顶点
      </text>

      {/* 一条对一个顶点的竖箭头 */}
      {verts.map((v) => {
        const cx = tableStartX + v * cellW + (cellW - 6) / 2;
        return (
          <line
            key={v}
            x1={cx}
            y1="78"
            x2={cx}
            y2="116"
            stroke="var(--accent)"
            strokeWidth="2"
            markerEnd="url(#div-arrow)"
          />
        );
      })}

      {/* 下排：属性表 4 条 */}
      {verts.map((v) => (
        <g key={v}>
          <rect
            x={tableStartX + v * cellW}
            y="120"
            width={cellW - 6}
            height="34"
            rx="4"
            fill="var(--accent)"
            opacity="0.16"
            stroke="var(--border)"
            strokeWidth="1.5"
          />
          <text
            x={tableStartX + v * cellW + (cellW - 6) / 2}
            y="142"
            textAnchor="middle"
            fontSize="11"
            fontFamily="monospace"
            fill="var(--text-primary)"
          >
            条目 {v}
          </text>
        </g>
      ))}
      <text
        x="55"
        y="142"
        textAnchor="middle"
        fontSize="10"
        fill="var(--text-secondary)"
      >
        属性表
      </text>
      <text
        x="320"
        y="180"
        textAnchor="middle"
        fontSize="10.5"
        fill="var(--text-secondary)"
      >
        每处理一个顶点 → 往下读一条（4 个顶点读 4 条）
      </text>

      {/* defs（compare 模式只需一次，这里放在 Divisor0 内即可被两段共用，因为同一 SVG） */}
      <defs>
        <marker
          id="div-arrow"
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto-start-reverse"
        >
          <path d="M0 0 L10 5 L0 10 z" fill="var(--accent)" />
        </marker>
      </defs>
    </g>
  );
}

/* ============ divisor=1：每实例步进一次 ============ */
function Divisor1({ y }: { y: number }) {
  // 3 个实例（每个实例画 4 个顶点），表里 3 条，一条覆盖整个实例。
  const instances = [0, 1, 2];
  const instW = 150;
  const startX = 130;
  return (
    <g transform={`translate(0 ${y})`}>
      <text
        x="40"
        y="28"
        textAnchor="start"
        fontSize="13"
        fontWeight="600"
        fill="var(--text-primary)"
      >
        divisor = 1：每实例步进（一条覆盖整个实例的所有顶点）
      </text>

      {/* 上排：3 个实例，每个实例画 4 个小顶点（同一组顶点重复 3 次） */}
      {instances.map((ins) => {
        const x0 = startX + ins * instW;
        return (
          <g key={ins}>
            <rect
              x={x0}
              y="46"
              width={instW - 18}
              height="34"
              rx="6"
              fill="var(--text-secondary)"
              opacity="0.16"
              stroke="var(--border)"
              strokeWidth="1.5"
            />
            {[0, 1, 2, 3].map((v) => (
              <circle
                key={v}
                cx={x0 + 24 + v * 24}
                cy="63"
                r="7"
                fill="var(--text-secondary)"
                opacity="0.4"
                stroke="var(--border)"
                strokeWidth="1"
              />
            ))}
            <text
              x={x0 + (instW - 18) / 2}
              y="98"
              textAnchor="middle"
              fontSize="9.5"
              fill="var(--text-secondary)"
            >
              实例 {ins}（4 个顶点）
            </text>
          </g>
        );
      })}
      <text
        x="60"
        y="66"
        textAnchor="middle"
        fontSize="10"
        fill="var(--text-secondary)"
      >
        实例
      </text>

      {/* 一条对一个实例的竖箭头（落在实例中点） */}
      {instances.map((ins) => {
        const cx = startX + ins * instW + (instW - 18) / 2;
        return (
          <line
            key={ins}
            x1={cx}
            y1="106"
            x2={cx}
            y2="138"
            stroke="var(--accent)"
            strokeWidth="2.5"
            markerEnd="url(#div-arrow)"
          />
        );
      })}

      {/* 下排：属性表 3 条（实例化数组） */}
      {instances.map((ins) => {
        const x0 = startX + ins * instW;
        return (
          <g key={ins}>
            <rect
              x={x0}
              y="142"
              width={instW - 18}
              height="34"
              rx="4"
              fill="var(--accent)"
              opacity="0.22"
              stroke="var(--accent)"
              strokeWidth="1.5"
            />
            <text
              x={x0 + (instW - 18) / 2}
              y="164"
              textAnchor="middle"
              fontSize="11"
              fontFamily="monospace"
              fill="var(--text-primary)"
            >
              条目 {ins}（偏移/矩阵）
            </text>
          </g>
        );
      })}
      <text
        x="55"
        y="164"
        textAnchor="middle"
        fontSize="10"
        fill="var(--text-secondary)"
      >
        实例化数组
      </text>
      <text
        x="320"
        y="200"
        textAnchor="middle"
        fontSize="10.5"
        fill="var(--text-secondary)"
      >
        每开始一个新实例才往下读一条（3 个实例只读 3 条）
      </text>
    </g>
  );
}
