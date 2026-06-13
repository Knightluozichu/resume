/**
 * <ZFightingDiagram>：「深度测试」§7 深度冲突 Z-fighting 的配图（HEL-67，A 概念型）。
 *
 * 把「两个几乎共面的面片争夺同一深度 → 撕裂条纹」掰碎成对照图：
 *  ①左：两面片明显分开（深度差足够大）→ 谁近谁全胜出，干净——正常。
 *  ②右：两面片几乎贴在一起（深度差小于深度缓冲能分辨的精度）→ 同一片区域里
 *    哪面胜出反复横跳，渲染出一道道交错的撕裂条纹（用交替色斑表达）。
 *
 * Server Component（纯展示，静态 SVG，无交互、无 three、reduced-motion 无关）。
 * 视觉语言与既有 diagram 一致：token 色（var(--accent)/--warning/--success/--border/
 * --bg/--bg-elevated/--text-primary/--text-secondary），无阴影、rx 圆角（硬规则 5）。
 */

export function ZFightingDiagram() {
  // 右侧「撕裂带」交替条纹：在重叠矩形里横向铺 12 条，颜色在两面片间交替。
  const stripes = Array.from({ length: 12 }, (_, i) => i);

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated">
        <svg
          viewBox="0 0 720 320"
          role="img"
          aria-label="深度冲突示意，分左右两栏。左栏正常情况：两块面片在侧视图里明显前后分开，深度差足够大，离镜头近的那块干净地完全盖住远的，没有杂色。右栏深度冲突：两块面片几乎贴在一起、深度差极小，小到深度缓冲分辨不出谁前谁后，于是同一片区域里两块面片的颜色交替出现，渲染成一道道交错的撕裂条纹，看起来像闪烁的杂斑。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* ============ 左栏：正常（深度差大） ============ */}
          <text
            x="180"
            y="30"
            textAnchor="middle"
            fontSize="13"
            fontWeight="600"
            fill="var(--success)"
          >
            正常：两面分得开
          </text>

          {/* 侧视图：两条线段明显前后分开 */}
          <text x="60" y="80" fontSize="10" fill="var(--text-secondary)">
            侧视
          </text>
          <line
            x1="70"
            y1="100"
            x2="290"
            y2="100"
            stroke="var(--warning)"
            strokeWidth="3"
          />
          <text x="296" y="104" fontSize="10" fill="var(--warning)">
            远
          </text>
          <line
            x1="70"
            y1="124"
            x2="290"
            y2="124"
            stroke="var(--accent)"
            strokeWidth="3"
          />
          <text x="296" y="128" fontSize="10" fill="var(--accent)">
            近
          </text>

          {/* 正视图：近面干净盖住 */}
          <text x="60" y="168" fontSize="10" fill="var(--text-secondary)">
            正视
          </text>
          <rect
            x="70"
            y="180"
            width="220"
            height="80"
            rx="4"
            fill="var(--accent)"
            opacity="0.85"
            stroke="var(--border)"
            strokeWidth="1"
          />
          <text
            x="180"
            y="290"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            近面完整盖住，干净
          </text>

          {/* 分隔竖线 */}
          <line
            x1="360"
            y1="44"
            x2="360"
            y2="300"
            stroke="var(--border)"
            strokeWidth="1"
          />

          {/* ============ 右栏：Z-fighting（深度差极小） ============ */}
          <text
            x="540"
            y="30"
            textAnchor="middle"
            fontSize="13"
            fontWeight="600"
            fill="var(--danger)"
          >
            深度冲突：几乎共面
          </text>

          {/* 侧视图：两条线段几乎贴在一起 */}
          <text x="400" y="80" fontSize="10" fill="var(--text-secondary)">
            侧视
          </text>
          <line
            x1="410"
            y1="111"
            x2="630"
            y2="111"
            stroke="var(--warning)"
            strokeWidth="3"
          />
          <line
            x1="410"
            y1="114"
            x2="630"
            y2="114"
            stroke="var(--accent)"
            strokeWidth="3"
          />
          <text x="636" y="116" fontSize="10" fill="var(--text-secondary)">
            ≈贴合
          </text>

          {/* 正视图：交替撕裂条纹 */}
          <text x="400" y="168" fontSize="10" fill="var(--text-secondary)">
            正视
          </text>
          <g>
            {stripes.map((i) => {
              const w = 220 / stripes.length;
              const x = 410 + i * w;
              const color = i % 2 === 0 ? "var(--accent)" : "var(--warning)";
              return (
                <rect
                  key={i}
                  x={x}
                  y="180"
                  width={w + 0.5}
                  height="80"
                  fill={color}
                  opacity="0.85"
                />
              );
            })}
            <rect
              x="410"
              y="180"
              width="220"
              height="80"
              rx="4"
              fill="none"
              stroke="var(--border)"
              strokeWidth="1"
            />
          </g>
          <text
            x="540"
            y="290"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            谁胜出反复横跳 → 撕裂闪烁条纹
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        <strong>深度冲突（Z-fighting）</strong>
        ：两面片明显分开时近面干净盖住远面（左）； 而当两面片
        <strong>几乎共面</strong>、深度差小到深度缓冲分辨不出时，
        同一区域里哪面胜出反复横跳，渲染成一道道<strong>交错撕裂的条纹</strong>
        （右），视角一动还会闪。
      </figcaption>
    </figure>
  );
}
