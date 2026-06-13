/**
 * <WindingOrderDiagram>：「面剔除」§3「环绕顺序如何定正背面」对照图（HEL-70，A 概念型）。
 *
 * 并排画两个同样的三角形（顶点 v0/v1/v2），靠「按 v0→v1→v2 走一圈是逆时针还是顺时针」
 * 区分正面 / 背面：
 *  ①左：CCW 逆时针环绕（v0→v1→v2 沿逆时针方向兜一圈）＝ OpenGL 默认约定的「正面」，
 *    朝向你、会被画出来。用 var(--success) 绿系，弧形箭头标逆时针流向。
 *  ②右：CW 顺时针环绕（同样三个顶点，但走一圈是顺时针）＝「背面」，背对你、会被剔掉。
 *    用 var(--danger) 红系（弱化 opacity），弧形箭头标顺时针流向，整图略淡示意「将被丢弃」。
 * 关键点：同一个三角形，从正面看是逆时针、从背面看就是顺时针——环绕方向在投影到屏幕后
 * 自动反转，GPU 正是靠这个「看到的环绕方向」判正背面。
 *
 * Server Component（纯展示，静态 SVG，无交互、无 three、reduced-motion 无关）。
 * 视觉语言与既有 diagram 一致：token 色（var(--success)/--danger/--accent/--border/
 * --bg-elevated/--text-primary/--text-secondary），无阴影、rx 圆角、无裸 hex（硬规则 5）。
 */

/** 画一个标了 v0/v1/v2 + 环绕弧箭头的三角形面板。dir 决定弧箭头转向与配色语义。 */
function WindingPanel({
  cx,
  title,
  subtitle,
  order,
  color,
  dir,
  faded,
}: {
  cx: number;
  title: string;
  subtitle: string;
  order: string;
  color: string;
  dir: "ccw" | "cw";
  faded?: boolean;
}) {
  // 三角形三顶点（相对 cx 居中，y 固定）。v0 上、v1 左下、v2 右下。
  const v0 = { x: cx, y: 78 };
  const v1 = { x: cx - 56, y: 170 };
  const v2 = { x: cx + 56, y: 170 };
  const groupOpacity = faded ? 0.6 : 1;
  // 中心点，环绕弧绕它转一圈。
  const mid = { x: cx, y: (v0.y + v1.y + v2.y) / 3 };
  const arrowId = `winding-arc-${dir}`;
  return (
    <g opacity={groupOpacity}>
      <text
        x={cx}
        y="34"
        textAnchor="middle"
        fontSize="13"
        fontWeight="600"
        fill="var(--text-primary)"
      >
        {title}
      </text>
      <text x={cx} y="54" textAnchor="middle" fontSize="11" fill={color}>
        {subtitle}
      </text>

      {/* 三角形面 */}
      <path
        d={`M${v0.x} ${v0.y} L${v1.x} ${v1.y} L${v2.x} ${v2.y} Z`}
        fill={color}
        fillOpacity="0.14"
        stroke={color}
        strokeWidth="2"
      />

      {/* 环绕弧箭头（围绕中心转一圈，逆时针 / 顺时针由 dir 决定） */}
      <defs>
        <marker
          id={arrowId}
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto-start-reverse"
        >
          <path d="M0 0 L10 5 L0 10 z" fill={color} />
        </marker>
      </defs>
      {dir === "ccw" ? (
        // 逆时针：弧从右侧起、沿逆时针（上方）兜到左侧
        <path
          d={`M${mid.x + 26} ${mid.y + 4} A 26 26 0 1 0 ${mid.x - 18} ${mid.y - 19}`}
          fill="none"
          stroke={color}
          strokeWidth="2"
          markerEnd={`url(#${arrowId})`}
        />
      ) : (
        // 顺时针：弧从左侧起、沿顺时针（上方）兜到右侧
        <path
          d={`M${mid.x - 26} ${mid.y + 4} A 26 26 0 1 1 ${mid.x + 18} ${mid.y - 19}`}
          fill="none"
          stroke={color}
          strokeWidth="2"
          markerEnd={`url(#${arrowId})`}
        />
      )}

      {/* 顶点圆点 + 标签 v0/v1/v2 */}
      <circle cx={v0.x} cy={v0.y} r="5" fill={color} />
      <circle cx={v1.x} cy={v1.y} r="5" fill={color} />
      <circle cx={v2.x} cy={v2.y} r="5" fill={color} />
      <text
        x={v0.x}
        y={v0.y - 12}
        textAnchor="middle"
        fontSize="12"
        fontWeight="600"
        className="font-mono"
        fill="var(--text-primary)"
      >
        v0
      </text>
      <text
        x={v1.x - 14}
        y={v1.y + 6}
        textAnchor="middle"
        fontSize="12"
        fontWeight="600"
        className="font-mono"
        fill="var(--text-primary)"
      >
        v1
      </text>
      <text
        x={v2.x + 14}
        y={v2.y + 6}
        textAnchor="middle"
        fontSize="12"
        fontWeight="600"
        className="font-mono"
        fill="var(--text-primary)"
      >
        v2
      </text>

      {/* 环绕顺序文字 */}
      <text
        x={cx}
        y="206"
        textAnchor="middle"
        fontSize="12"
        fontWeight="600"
        className="font-mono"
        fill={color}
      >
        {order}
      </text>
    </g>
  );
}

export function WindingOrderDiagram() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated">
        <svg
          viewBox="0 0 480 250"
          role="img"
          aria-label="环绕顺序判定正背面对照，分两栏。左栏：一个三角形，顶点按 v0 在上、v1 在左下、v2 在右下排列，沿 v0 到 v1 到 v2 走一圈是逆时针方向，用绿色弧形箭头标出逆时针流向，这是 OpenGL 默认约定的正面，朝向观察者、会被画出来。右栏：同样三个顶点的三角形，但沿 v0 到 v1 到 v2 走一圈是顺时针方向，用红色弧形箭头标出顺时针流向，整图略微变淡，这是背面，背对观察者、会被面剔除丢掉。核心是同一个三角形从正面看是逆时针、从背面看就反转成顺时针，GPU 靠投影到屏幕后看到的环绕方向来判定正背面。"
          className="mx-auto block h-auto w-full max-w-[480px]"
        >
          <WindingPanel
            cx={120}
            title="正面（朝向你）"
            subtitle="保留 · 会画出来"
            order="v0 → v1 → v2 ＝ 逆时针 CCW"
            color="var(--success)"
            dir="ccw"
          />

          {/* 分隔竖线 */}
          <line
            x1="240"
            y1="40"
            x2="240"
            y2="220"
            stroke="var(--border)"
            strokeWidth="1"
          />

          <WindingPanel
            cx={360}
            title="背面（背对你）"
            subtitle="剔除 · 不画"
            order="v0 → v1 → v2 ＝ 顺时针 CW"
            color="var(--danger)"
            dir="cw"
            faded
          />
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        同一个三角形，按 <code>v0 → v1 → v2</code> 走一圈：从
        <strong>正面</strong>
        看是<strong>逆时针（CCW）</strong>——OpenGL 默认把它当正面、保留；从
        <strong>背面</strong>看，同样的顶点顺序反转成
        <strong>顺时针（CW）</strong>——判为背面、被剔掉。GPU
        靠的就是「投影到屏幕后
        <strong>看到的环绕方向</strong>」。
      </figcaption>
    </figure>
  );
}
