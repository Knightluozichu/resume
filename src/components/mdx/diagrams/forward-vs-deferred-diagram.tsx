/**
 * <ForwardVsDeferredDiagram>：「高级光照·延迟着色 Deferred Shading」前向 vs 延迟管线对比图（HEL-88，A 概念 + C 实战型）。
 *
 * 上下两条管线对照，一眼说清延迟省的是什么：
 *  上排「前向着色」：几何 → 每个物体片元（含被遮挡的）× 每盏灯立刻算光照 → 帧缓冲。
 *    被后面物体挡住的片元也白算了光照（overdraw 浪费），标红「光照次数 ~ 物体片元数 × 灯」。
 *  下排「延迟着色」：几何 pass 填 G-buffer（只存位置/法线/反照率、不点灯）→ 光照 pass 只对每个
 *    可见像素 × 每盏灯算一次 → 帧缓冲。标绿「光照次数 ~ 屏幕像素数 × 灯」，与场景复杂度/overdraw 解耦。
 *
 * Server Component（纯展示，静态 SVG，无交互、无 three、reduced-motion 无关）。
 * 视觉语言与既有 diagram 一致：token 色（var(--accent)/--warning/--success/--danger/--border/
 * --bg/--bg-elevated/--text-primary/--text-secondary），无阴影、rx 圆角、无裸 hex（硬规则 5）。
 */

// 管线里的一个阶段方块：标题 + 副标
function Stage({
  x,
  y,
  w,
  title,
  sub,
  accent,
}: {
  x: number;
  y: number;
  w: number;
  title: string;
  sub?: string;
  accent: string;
}) {
  const h = 44;
  return (
    <g>
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
      <text
        x={x + w / 2}
        y={sub ? y + 19 : y + 27}
        textAnchor="middle"
        fontSize="11"
        fontWeight="600"
        fill="var(--text-primary)"
      >
        {title}
      </text>
      {sub && (
        <text
          x={x + w / 2}
          y={y + 33}
          textAnchor="middle"
          fontSize="8.5"
          fill="var(--text-secondary)"
        >
          {sub}
        </text>
      )}
    </g>
  );
}

export function ForwardVsDeferredDiagram() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated">
        <svg
          viewBox="0 0 620 320"
          role="img"
          aria-label="前向着色和延迟着色两条渲染管线对比。上排是前向着色：几何阶段之后，对每个物体的每个片元都立刻乘每盏灯算一遍光照，连被前面物体遮挡、最终看不见的片元也照样白算了，这叫 overdraw 浪费，然后写进帧缓冲。它的光照计算次数大约等于物体片元数乘以灯数，标成红色警示。下排是延迟着色：先做几何 pass，用 MRT 把每个片元的位置、法线、反照率填进 G-buffer，完全不算光照；再做光照 pass，画一个全屏四边形，只对每个可见像素乘每盏灯算一次光照，写进帧缓冲。它的光照计算次数大约等于屏幕像素数乘以灯数，和场景复杂度、overdraw 解耦，标成绿色。结论：延迟着色把光照从每个物体片元都算、变成只对可见像素算一次，所以能轻松上成百上千盏灯。"
          className="mx-auto block h-auto w-full max-w-[620px]"
        >
          <defs>
            <marker
              id="fvd-arrow-r"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
            >
              <path d="M0 0 L6 3 L0 6 z" fill="var(--danger)" />
            </marker>
            <marker
              id="fvd-arrow-s"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
            >
              <path d="M0 0 L6 3 L0 6 z" fill="var(--success)" />
            </marker>
          </defs>

          {/* ============ 上排：前向着色 ============ */}
          <text
            x="20"
            y="28"
            fontSize="13"
            fontWeight="600"
            fill="var(--danger)"
          >
            前向着色 Forward：每个物体片元都立刻算光照
          </text>

          {/* 几何 */}
          <Stage
            x={20}
            y={44}
            w={110}
            title="几何"
            sub="光栅化出片元"
            accent="var(--border)"
          />
          <line
            x1={130}
            y1={66}
            x2={172}
            y2={66}
            stroke="var(--danger)"
            strokeWidth="1.5"
            markerEnd="url(#fvd-arrow-r)"
          />
          {/* 立刻算光照（含被遮挡的） */}
          <Stage
            x={174}
            y={44}
            w={250}
            title="每片元 × 每盏灯 立刻算光照"
            sub="被遮挡的片元也白算了（overdraw 浪费）"
            accent="var(--danger)"
          />
          <line
            x1={424}
            y1={66}
            x2={466}
            y2={66}
            stroke="var(--danger)"
            strokeWidth="1.5"
            markerEnd="url(#fvd-arrow-r)"
          />
          {/* 帧缓冲 */}
          <Stage
            x={468}
            y={44}
            w={110}
            title="帧缓冲"
            sub="上屏"
            accent="var(--border)"
          />
          {/* 上排光照次数标注 */}
          <text
            x="299"
            y="112"
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill="var(--danger)"
          >
            光照次数 ~ 物体片元数 × 灯（含被遮挡的浪费）
          </text>

          {/* 分隔线 */}
          <line
            x1="20"
            y1="138"
            x2="600"
            y2="138"
            stroke="var(--border)"
            strokeWidth="1"
            strokeDasharray="5 4"
          />

          {/* ============ 下排：延迟着色 ============ */}
          <text
            x="20"
            y="170"
            fontSize="13"
            fontWeight="600"
            fill="var(--success)"
          >
            延迟着色 Deferred：先存几何、最后只对可见片元算一次
          </text>

          {/* 几何 pass：填 G-buffer */}
          <Stage
            x={20}
            y={186}
            w={170}
            title="几何 pass → 填 G-buffer"
            sub="MRT 存 位置/法线/反照率，不点灯"
            accent="var(--accent)"
          />
          <line
            x1={190}
            y1={208}
            x2={232}
            y2={208}
            stroke="var(--success)"
            strokeWidth="1.5"
            markerEnd="url(#fvd-arrow-s)"
          />
          {/* 光照 pass：只对可见像素算一次 */}
          <Stage
            x={234}
            y={186}
            w={232}
            title="光照 pass：全屏四边形采 G-buffer"
            sub="只对每个可见像素 × 每盏灯 算一次"
            accent="var(--success)"
          />
          <line
            x1={466}
            y1={208}
            x2={508}
            y2={208}
            stroke="var(--success)"
            strokeWidth="1.5"
            markerEnd="url(#fvd-arrow-s)"
          />
          {/* 帧缓冲 */}
          <Stage
            x={510}
            y={186}
            w={90}
            title="帧缓冲"
            sub="上屏"
            accent="var(--border)"
          />
          {/* 下排光照次数标注（高亮胶囊） */}
          <rect
            x="120"
            y="246"
            width="380"
            height="26"
            rx="13"
            fill="var(--success)"
            opacity="0.14"
            stroke="var(--success)"
            strokeWidth="1.5"
          />
          <text
            x="310"
            y="263"
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill="var(--success)"
          >
            光照次数 ~ 屏幕像素数 × 灯（与场景复杂度 / overdraw 解耦）
          </text>

          {/* 底部一句话总括 */}
          <text
            x="310"
            y="300"
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill="var(--accent)"
          >
            延迟把光照从「每个物体片元都算」变成「只对可见像素算一次」→
            轻松上几百盏灯
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        <strong className="text-danger">前向</strong>：几何 →
        每个物体片元（含被遮挡的）× 每盏灯立刻算光照（
        <strong>overdraw 浪费</strong>），光照次数 ~{" "}
        <code>物体片元数 × 灯</code>。
        <strong className="text-success"> 延迟</strong>：几何 pass 填 G-buffer →
        光照 pass 只对每个<strong>可见像素</strong> × 灯算一次，光照次数 ~{" "}
        <code>屏幕像素数 × 灯</code> —— 这就是延迟能上几百盏灯的原因。
      </figcaption>
    </figure>
  );
}
