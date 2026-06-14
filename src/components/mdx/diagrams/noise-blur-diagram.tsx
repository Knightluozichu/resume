/**
 * <NoiseBlurDiagram>：「高级光照·SSAO」§3「随机旋转 noise + 模糊去噪」小节的去噪图（HEL-89，C 实战型，篇收官）。
 *
 * 两阶段并排讲清「为什么先随机旋转核、再模糊」：
 *  ① 不旋转 → 同一套固定采样方向在整屏复用 → AO 出现明显的规则条带 banding（左格，画规则斜条纹）。
 *  ② 用一张小随机向量纹理平铺、逐像素旋转采样核 → 把规则条带打散成细碎噪点 noise（中格，画随机麻点）。
 *  ③ 再用一个小盒式模糊（box blur）把噪点抹平 → 干净柔和的 AO（右格，画平滑灰阶）。
 *
 * 直觉落点：随机旋转是「用可控的噪点换掉刺眼的条带」，模糊是「再把噪点抹平」——两步配合才得到干净 AO。
 * 注意：随机旋转用的核应当数量很少（如 16/32/64）；条带正是「核太少又不旋转」造成的，旋转把它换成噪点。
 *
 * Server Component（纯展示，静态 SVG，无交互、无 three、reduced-motion 无关）。
 * 视觉语言与既有 diagram 一致：token 色（var(--accent)/--success/--warning/--danger/--border/
 * --bg/--bg-elevated/--text-primary/--text-secondary），无阴影、rx 圆角、无裸 hex（硬规则 5）。
 */

// 一格：标题 + 框 + 内容 + 脚注
function Panel({
  x,
  title,
  accent,
  note,
  children,
}: {
  x: number;
  title: string;
  accent: string;
  note: string;
  children: React.ReactNode;
}) {
  const y = 56;
  const w = 150;
  const h = 120;
  return (
    <g>
      <text
        x={x + w / 2}
        y={y - 10}
        textAnchor="middle"
        fontSize="11.5"
        fontWeight="600"
        fill={accent}
      >
        {title}
      </text>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx="6"
        fill="var(--bg)"
        stroke={accent}
        strokeWidth="1.5"
      />
      {/* clip 内容到框内 */}
      <clipPath id={`noise-clip-${x}`}>
        <rect x={x} y={y} width={w} height={h} rx="6" />
      </clipPath>
      <g clipPath={`url(#noise-clip-${x})`}>{children}</g>
      <text
        x={x + w / 2}
        y={y + h + 18}
        textAnchor="middle"
        fontSize="9.5"
        fill="var(--text-secondary)"
      >
        {note}
      </text>
    </g>
  );
}

export function NoiseBlurDiagram() {
  const x1 = 24; // 不旋转：条带
  const x2 = 215; // 随机旋转：噪点
  const x3 = 406; // 模糊：干净
  const panelY = 56;
  const panelH = 120;

  // ② 随机噪点：固定一组伪随机麻点坐标（SSR 稳定，不用 Math.random 渲染期）
  const dots = [
    [18, 22],
    [44, 88],
    [70, 36],
    [96, 100],
    [120, 28],
    [30, 60],
    [60, 110],
    [110, 70],
    [88, 18],
    [134, 96],
    [22, 104],
    [78, 64],
    [48, 14],
    [128, 52],
    [102, 42],
    [16, 78],
  ];

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated">
        <svg
          viewBox="0 0 580 230"
          role="img"
          aria-label="随机旋转加模糊去噪的三阶段并排示意。第一格：如果采样核在整屏用固定方向不旋转，因为采样点很少，AO 会出现明显的规则条带 banding，画成规则斜条纹。第二格：用一张小随机向量纹理平铺、逐像素旋转采样核，把规则条带打散成细碎的噪点 noise，画成随机的麻点。第三格：再用一个小盒式模糊把噪点抹平，得到干净柔和的 AO，画成平滑灰阶。随机旋转是用可控的噪点换掉刺眼的条带，模糊是把噪点抹平，两步配合才能得到干净的环境光遮蔽。"
          className="mx-auto block h-auto w-full max-w-[580px]"
        >
          <defs>
            {/* 干净 AO 的平滑灰阶（接触处暗角的柔和过渡） */}
            <radialGradient id="noise-clean" cx="35%" cy="70%" r="80%">
              <stop offset="0%" stopColor="var(--bg)" />
              <stop offset="60%" stopColor="var(--border)" />
              <stop
                offset="100%"
                stopColor="color-mix(in srgb, var(--border) 50%, var(--bg-elevated))"
              />
            </radialGradient>
          </defs>

          <text
            x="290"
            y="26"
            textAnchor="middle"
            fontSize="13"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            随机旋转核 → 把条带换成噪点 → 模糊抹平
          </text>

          {/* ===== ① 不旋转：规则条带 banding ===== */}
          <Panel
            x={x1}
            title="① 不旋转：条带"
            accent="var(--danger)"
            note="固定采样方向 → 规则条带"
          >
            <rect
              x={x1}
              y={panelY}
              width="150"
              height={panelH}
              fill="var(--bg-elevated)"
            />
            {/* 规则斜条纹（banding） */}
            {Array.from({ length: 12 }).map((_, i) => (
              <line
                key={i}
                x1={x1 - 40 + i * 22}
                y1={panelY + panelH}
                x2={x1 + 40 + i * 22}
                y2={panelY}
                stroke="var(--danger)"
                strokeWidth="6"
                opacity="0.4"
              />
            ))}
          </Panel>

          {/* ===== ② 随机旋转：噪点 noise ===== */}
          <Panel
            x={x2}
            title="② 随机旋转：噪点"
            accent="var(--warning)"
            note="noise 纹理逐像素转核 → 碎噪点"
          >
            <rect
              x={x2}
              y={panelY}
              width="150"
              height={panelH}
              fill="var(--bg-elevated)"
            />
            {dots.map(([dx, dy], i) => (
              <circle
                key={i}
                cx={x2 + dx}
                cy={panelY + dy}
                r={1.6 + (i % 3) * 0.6}
                fill="var(--warning)"
                opacity="0.75"
              />
            ))}
          </Panel>

          {/* ===== ③ 模糊：干净 AO ===== */}
          <Panel
            x={x3}
            title="③ 盒式模糊：干净"
            accent="var(--success)"
            note="小盒式模糊抹平 → 柔和 AO"
          >
            <rect
              x={x3}
              y={panelY}
              width="150"
              height={panelH}
              fill="url(#noise-clean)"
            />
          </Panel>

          {/* 两个箭头连三格 */}
          <text
            x={x1 + 150 + 16}
            y={panelY + panelH / 2 + 4}
            textAnchor="middle"
            fontSize="18"
            fill="var(--text-secondary)"
          >
            →
          </text>
          <text
            x={x2 + 150 + 16}
            y={panelY + panelH / 2 + 4}
            textAnchor="middle"
            fontSize="18"
            fill="var(--text-secondary)"
          >
            →
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        采样点少又不旋转 → AO 出
        <span style={{ color: "var(--danger)" }}>规则条带 banding</span>
        ；用一张小随机向量纹理<strong>逐像素旋转采样核</strong>，把条带打散成
        <span style={{ color: "var(--warning)" }}>细碎噪点 noise</span>
        ；再来一个<strong>小盒式模糊</strong>把噪点
        <span style={{ color: "var(--success)" }}>抹平成干净柔和的 AO</span>
        。随机旋转 + 模糊，两步配合缺一不可。
      </figcaption>
    </figure>
  );
}
