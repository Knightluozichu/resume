/**
 * <GBufferDiagram>：「高级光照·延迟着色 Deferred Shading」G-buffer 几何缓冲三图示意（HEL-88，A 概念 + C 实战型）。
 *
 * 一图讲透「几何 pass 用 MRT 一次输出 G-buffer 的几张纹理，都不含光照」：
 *  并排画 G-buffer 的三张纹理缩略图，每张存的是同一片元的某个几何属性：
 *   ①位置图 gPosition：每片元的世界坐标 xyz 当 rgb 存 → 彩色渐变（远近/方位编码成颜色）。
 *   ②法线图 gNormal：每片元法线 n*0.5+0.5 当 rgb 存 → 整体偏蓝紫（朝外的法线 z≈1 → 蓝紫）。
 *   ③反照率图 gAlbedoSpec：每片元的物体本色（漫反射底色）+ 镜面强度塞 a 通道 → 物体本来的颜色。
 *  顶部标「几何 pass 一次 MRT 输出这几张，都不含光照」，底部点明「光照 pass 再采这几张算一次光」。
 *
 * Server Component（纯展示，静态 SVG，无交互、无 three、reduced-motion 无关）。
 * 视觉语言与既有 diagram 一致：token 色（var(--accent)/--warning/--success/--danger/--border/
 * --bg/--bg-elevated/--text-primary/--text-secondary），无 --info 等不存在 token、无阴影、rx 圆角、无裸 hex（硬规则 5）。
 */

// 一张 G-buffer 纹理缩略图：标题 + 框 + 内容渲染器 + 通道说明
function GTexture({
  x,
  title,
  channels,
  accent,
  children,
}: {
  x: number;
  title: string;
  channels: string;
  accent: string;
  children: React.ReactNode;
}) {
  const y = 60;
  const w = 130;
  const h = 96;
  return (
    <g>
      {/* 标题 */}
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
      {/* 纹理框 */}
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
      {children}
      {/* 通道说明 */}
      <text
        x={x + w / 2}
        y={y + h + 16}
        textAnchor="middle"
        fontSize="9"
        fontFamily="monospace"
        fill="var(--text-secondary)"
      >
        {channels}
      </text>
    </g>
  );
}

export function GBufferDiagram() {
  // 三张纹理缩略图的左上角横坐标
  const tx1 = 30; // 位置图
  const tx2 = 195; // 法线图
  const tx3 = 360; // 反照率图
  const cy = 60; // 三框共用纵坐标

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated">
        <svg
          viewBox="0 0 520 230"
          role="img"
          aria-label="G-buffer 几何缓冲三图示意。几何 pass 用多渲染目标 MRT 一次输出几张纹理，每张存同一片元的一个几何属性，都不含光照。第一张是位置图 gPosition，把每个片元的世界坐标 xyz 当作 rgb 存进去，画面呈现彩色的位置编码。第二张是法线图 gNormal，把法线乘 0.5 加 0.5 映射到 0 到 1 当作 rgb 存，朝外的法线让画面整体偏蓝紫。第三张是反照率图 gAlbedoSpec，存物体本来的漫反射颜色，镜面强度塞进 alpha 通道，画面就是物体本色。这一步只登记几何属性、完全不算光照，留到后面的光照 pass 再采样这三张图对每个可见片元算一次光。"
          className="mx-auto block h-auto w-full max-w-[520px]"
        >
          <defs>
            {/* 位置图：xyz→rgb 的彩色渐变（红→绿→紫，编码空间坐标） */}
            <linearGradient id="gb-pos" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="var(--danger)" />
              <stop offset="50%" stopColor="var(--success)" />
              <stop offset="100%" stopColor="var(--accent)" />
            </linearGradient>
            {/* 法线图：偏蓝紫（朝外法线 z≈1 → 蓝紫，用品牌紫表征） */}
            <linearGradient id="gb-nrm" x1="0" y1="0" x2="0.7" y2="1">
              <stop offset="0%" stopColor="var(--accent)" />
              <stop
                offset="100%"
                stopColor="color-mix(in srgb, var(--accent) 65%, var(--bg))"
              />
            </linearGradient>
          </defs>

          {/* 顶部标题 */}
          <text
            x="260"
            y="26"
            textAnchor="middle"
            fontSize="13"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            G-buffer：几何 pass 一次 MRT 输出这几张，都不含光照
          </text>

          {/* ===== ① 位置图 gPosition ===== */}
          <GTexture
            x={tx1}
            title="① 位置 position"
            channels="gPosition · RGBA16F"
            accent="var(--success)"
          >
            <rect
              x={tx1 + 4}
              y={cy + 4}
              width={122}
              height={88}
              rx="3"
              fill="url(#gb-pos)"
              opacity="0.85"
            />
          </GTexture>

          {/* ===== ② 法线图 gNormal ===== */}
          <GTexture
            x={tx2}
            title="② 法线 normal"
            channels="gNormal · n*0.5+0.5"
            accent="var(--accent)"
          >
            <rect
              x={tx2 + 4}
              y={cy + 4}
              width={122}
              height={88}
              rx="3"
              fill="url(#gb-nrm)"
              opacity="0.85"
            />
            {/* 几个朝外法线斑（偏蓝紫，比底色更亮一点） */}
            <circle
              cx={tx2 + 42}
              cy={cy + 36}
              r="16"
              fill="var(--accent)"
              opacity="0.6"
            />
            <circle
              cx={tx2 + 88}
              cy={cy + 60}
              r="20"
              fill="var(--accent)"
              opacity="0.55"
            />
          </GTexture>

          {/* ===== ③ 反照率图 gAlbedoSpec ===== */}
          <GTexture
            x={tx3}
            title="③ 反照率 albedo"
            channels="gAlbedoSpec · RGB+a"
            accent="var(--warning)"
          >
            <rect
              x={tx3 + 4}
              y={cy + 4}
              width={122}
              height={88}
              rx="3"
              fill="var(--bg-elevated)"
            />
            {/* 几个物体本色的球（各不同反照率） */}
            <circle cx={tx3 + 40} cy={cy + 36} r="15" fill="var(--danger)" />
            <circle cx={tx3 + 86} cy={cy + 30} r="13" fill="var(--warning)" />
            <circle cx={tx3 + 66} cy={cy + 68} r="17" fill="var(--success)" />
          </GTexture>

          {/* 底部一句话总括 */}
          <text
            x="260"
            y="216"
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill="var(--accent)"
          >
            这一步只「登记几何属性」、零光照；光照 pass 再采这几张算一次光
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        几何 pass 靠 <strong>MRT</strong> 一次输出 G-buffer 的几张纹理：
        <strong>位置</strong>（<code>xyz→rgb</code>）、<strong>法线</strong>（
        <code>n*0.5+0.5</code> 偏蓝紫）、<strong>反照率</strong>
        （物体本色 + 镜面强度塞 <code>a</code>）。
        <strong>都不含光照</strong>——光只在后面的光照 pass 算一次。
      </figcaption>
    </figure>
  );
}
