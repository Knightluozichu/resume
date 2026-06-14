/**
 * <PointShadowStepDiagram step={1|2|3|4}>：「点阴影」§5「深度立方图全向阴影」<Stepper> 四步配图（HEL-83，C 实战型）。
 *
 * 承接上一章「阴影映射」：那是方向光的单张 2D 深度图，本章把它扩展成点光源的全向版。
 * 四步把「为什么单张 2D 不够 → 怎么用 6 个面包住光源 → 每面存什么 → 怎么用方向向量采样判阴影」掰开：
 *  ①点光源向 360° 发光：左边方向光只朝一个方向、一张 2D 深度图就够；右边点光源向四面八方发光，
 *    一张 2D 深度图只罩得住一个方向、其余方向无遮挡记录（对比图，说明为何不够）。
 *  ②用 6 个面（+X/−X/+Y/−Y/+Z/−Z）的小相机把光源包住、各渲一张深度图 = 深度立方体贴图
 *    （画立方体十字展开 6 面，每面一台朝外的小相机）。
 *  ③每个面存「该方向上到光源最近的距离」（线性距离，非裁剪空间深度）——画一个面里近/远遮挡的距离条。
 *  ④第二遍：对片元，用 方向 = fragPos − lightPos 去 cubemap 采样取最近距离，和片元到光的实际距离比 → 判阴影。
 *
 * Server Component（纯展示，静态 SVG，无交互、无 three、reduced-motion 无关）。
 * 视觉语言与既有 diagram 一致：token 色（var(--accent)/--success/--danger/--warning/--border/
 * --bg/--bg-elevated/--text-primary/--text-secondary），无阴影、rx 圆角、无裸 hex（硬规则 5）。
 */

type PointShadowStep = 1 | 2 | 3 | 4;

const ARIA: Record<PointShadowStep, string> = {
  1: "点阴影第一步，说明为什么单张二维深度图罩不住点光源。左边画一盏方向光只朝一个方向平行照射，它的遮挡只需一张二维深度图就能记下。右边画一盏点光源向四面八方三百六十度发光，一张二维深度图只能罩住其中一个方向，上下左右其余方向都没有遮挡记录，所以方向光那一套对点光源不够用。",
  2: "点阴影第二步，用六个面把光源包起来做成深度立方体贴图。把点光源放在中心，朝正 X、负 X、正 Y、负 Y、正 Z、负 Z 六个方向各放一台朝外的小相机，每台各渲一张深度图，六张深度图拼成一个立方体，正好把光源周围三百六十度全包住，这就是深度立方体贴图。图里用十字展开画出六个面，每个面标着方位和一台朝外的小相机。",
  3: "点阴影第三步，每个面存的是片元到光源的最近距离。第一遍渲染时，每个面不存裁剪空间深度，而是直接存这个方向上离光源最近的遮挡物有多远的线性距离，再除以远平面 far 归一化到零到一存进去。图里画出立方体一个面，面上近处遮挡存的距离小、远处遮挡存的距离大。",
  4: "点阴影第四步，用方向向量采样深度立方图判阴影。第二遍渲染时，对每个片元先算从光源指向它的方向向量，等于片元位置减去光源位置，用这根方向向量去深度立方体贴图采样，取回这个方向上存的最近遮挡距离，再乘回 far 还原成真实距离，和片元自己到光源的实际距离比较。如果片元实际距离更大，说明前面有更近的东西先挡住了光，片元在阴影里，用红色标出。如果两者基本相等，说明片元自己就是最近的、直接受光，用绿色标出。",
};

/* 立方体十字展开 6 面的方位标签 + 网格位置（与 cubemap 章一致：上 +Y / 中排 −X +Z +X −Z / 下 −Y）。 */
const CUBE_FACES: { label: string; col: number; row: number }[] = [
  { label: "+Y", col: 1, row: 0 },
  { label: "−X", col: 0, row: 1 },
  { label: "+Z", col: 1, row: 1 },
  { label: "+X", col: 2, row: 1 },
  { label: "−Z", col: 3, row: 1 },
  { label: "−Y", col: 1, row: 2 },
];

export function PointShadowStepDiagram({ step }: { step: PointShadowStep }) {
  return (
    <figure className="mdx-figure mx-auto my-4">
      <div className="overflow-hidden rounded-card border border-border bg-elevated">
        <svg
          viewBox="0 0 560 300"
          role="img"
          aria-label={ARIA[step]}
          className="mx-auto block h-auto w-full max-w-[560px]"
        >
          <defs>
            <marker
              id="ps-arrow-w"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
            >
              <path d="M0 0 L6 3 L0 6 z" fill="var(--warning)" />
            </marker>
            <marker
              id="ps-arrow-a"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
            >
              <path d="M0 0 L6 3 L0 6 z" fill="var(--accent)" />
            </marker>
          </defs>

          {/* ============================================================
           * 第 1 步：方向光（单张 2D 够）vs 点光源（360° 单张 2D 不够）
           * ============================================================ */}
          {step === 1 && (
            <>
              {/* ----- 左：方向光，只朝一个方向，一张 2D 深度图够 ----- */}
              <text
                x="145"
                y="34"
                textAnchor="middle"
                fontSize="12"
                fontWeight="600"
                fill="var(--text-secondary)"
              >
                方向光：只朝一个方向
              </text>
              {/* 平行光箭头（一组同向） */}
              <g
                stroke="var(--text-secondary)"
                strokeWidth="1.8"
                markerEnd="url(#ps-arrow-w)"
                opacity="0.8"
              >
                <line x1="70" y1="70" x2="70" y2="150" />
                <line x1="120" y1="70" x2="120" y2="150" />
                <line x1="170" y1="70" x2="170" y2="150" />
                <line x1="220" y1="70" x2="220" y2="150" />
              </g>
              {/* 一张 2D 深度图就罩住它 */}
              <rect
                x="60"
                y="170"
                width="170"
                height="26"
                rx="4"
                fill="var(--success)"
                opacity="0.16"
                stroke="var(--success)"
                strokeWidth="1.5"
              />
              <text
                x="145"
                y="187"
                textAnchor="middle"
                fontSize="11"
                fontWeight="600"
                fill="var(--success)"
              >
                一张 2D 深度图 ✓ 够
              </text>

              {/* 分隔竖线 */}
              <line
                x1="290"
                y1="40"
                x2="290"
                y2="252"
                stroke="var(--border)"
                strokeWidth="1"
              />

              {/* ----- 右：点光源，向 360° 发光，单张 2D 罩不住 ----- */}
              <text
                x="425"
                y="34"
                textAnchor="middle"
                fontSize="12"
                fontWeight="600"
                fill="var(--warning)"
              >
                点光源：向 360° 发光
              </text>
              {/* 点光源 + 向四面八方放射的光线 */}
              <circle
                cx="425"
                cy="120"
                r="11"
                fill="var(--warning)"
                opacity="0.9"
              />
              <g stroke="var(--warning)" strokeWidth="1.6" opacity="0.85">
                <line x1="425" y1="105" x2="425" y2="74" />
                <line x1="425" y1="135" x2="425" y2="166" />
                <line x1="410" y1="120" x2="372" y2="120" />
                <line x1="440" y1="120" x2="478" y2="120" />
                <line x1="414" y1="109" x2="388" y2="83" />
                <line x1="436" y1="109" x2="462" y2="83" />
                <line x1="414" y1="131" x2="388" y2="157" />
                <line x1="436" y1="131" x2="462" y2="157" />
              </g>
              {/* 一张 2D 深度图只罩一个方向，其余漏掉 */}
              <rect
                x="406"
                y="166"
                width="38"
                height="20"
                rx="3"
                fill="var(--success)"
                opacity="0.18"
                stroke="var(--success)"
                strokeWidth="1.2"
              />
              <text
                x="425"
                y="207"
                textAnchor="middle"
                fontSize="10"
                fontWeight="600"
                fill="var(--danger)"
              >
                单张 2D 只罩一个方向 ✗
              </text>
              <text
                x="425"
                y="223"
                textAnchor="middle"
                fontSize="9"
                fill="var(--text-secondary)"
              >
                其余方向没有遮挡记录
              </text>

              <text
                x="280"
                y="278"
                textAnchor="middle"
                fontSize="12"
                fontWeight="600"
                fill="var(--warning)"
              >
                点光源四面八方都发光，单张 2D 深度图罩不住
              </text>
            </>
          )}

          {/* ============================================================
           * 第 2 步：6 个面把光源包住 = 深度立方体贴图
           * ============================================================ */}
          {step === 2 && (
            <>
              <text
                x="280"
                y="30"
                textAnchor="middle"
                fontSize="12"
                fontWeight="600"
                fill="var(--text-primary)"
              >
                用 6 个面把光源包起来 = 深度立方体贴图
              </text>

              {/* 左：6 面十字展开，每面一台朝外的小相机 */}
              {CUBE_FACES.map((f) => {
                const u = 56;
                const ox = 36;
                const oy = 56;
                const x = ox + f.col * u;
                const y = oy + f.row * u;
                return (
                  <g key={f.label}>
                    <rect
                      x={x}
                      y={y}
                      width={u}
                      height={u}
                      rx="4"
                      fill="var(--bg)"
                      stroke="var(--accent)"
                      strokeWidth="1.5"
                      strokeOpacity="0.7"
                    />
                    <text
                      x={x + u / 2}
                      y={y + u / 2 - 4}
                      textAnchor="middle"
                      fontSize="12"
                      fontWeight="600"
                      fill="var(--accent)"
                    >
                      {f.label}
                    </text>
                    <text
                      x={x + u / 2}
                      y={y + u / 2 + 12}
                      textAnchor="middle"
                      fontSize="8"
                      fill="var(--text-secondary)"
                    >
                      面
                    </text>
                  </g>
                );
              })}
              <text
                x="120"
                y="252"
                textAnchor="middle"
                fontSize="10"
                fill="var(--text-secondary)"
              >
                6 张面图拼成一个立方体
              </text>

              {/* 右：光源居中、6 台朝外小相机包住一圈 */}
              <circle
                cx="430"
                cy="150"
                r="12"
                fill="var(--warning)"
                opacity="0.9"
              />
              <text
                x="430"
                y="154"
                textAnchor="middle"
                fontSize="8"
                fontWeight="700"
                fill="var(--bg)"
              >
                光
              </text>
              {/* 6 台朝外的小相机方向箭头（上下左右前后） */}
              <g
                stroke="var(--accent)"
                strokeWidth="2"
                markerEnd="url(#ps-arrow-a)"
                opacity="0.9"
              >
                <line x1="430" y1="136" x2="430" y2="96" />
                <line x1="430" y1="164" x2="430" y2="204" />
                <line x1="416" y1="150" x2="372" y2="150" />
                <line x1="444" y1="150" x2="488" y2="150" />
                <line x1="420" y1="140" x2="396" y2="116" />
                <line x1="440" y1="160" x2="464" y2="184" />
              </g>
              <text
                x="430"
                y="84"
                textAnchor="middle"
                fontSize="9"
                fill="var(--accent)"
              >
                +Y
              </text>
              <text
                x="356"
                y="154"
                textAnchor="middle"
                fontSize="9"
                fill="var(--accent)"
              >
                −X
              </text>
              <text
                x="498"
                y="154"
                textAnchor="middle"
                fontSize="9"
                fill="var(--accent)"
              >
                +X
              </text>
              <text
                x="430"
                y="226"
                textAnchor="middle"
                fontSize="10"
                fill="var(--text-secondary)"
              >
                6 台朝外的小相机各渲一张
              </text>

              <text
                x="280"
                y="278"
                textAnchor="middle"
                fontSize="12"
                fontWeight="600"
                fill="var(--accent)"
              >
                六个方向各渲一张深度图，三百六十度全包住
              </text>
            </>
          )}

          {/* ============================================================
           * 第 3 步：每个面存「片元到光源的最近距离」（线性距离）
           * ============================================================ */}
          {step === 3 && (
            <>
              <text
                x="280"
                y="30"
                textAnchor="middle"
                fontSize="12"
                fontWeight="600"
                fill="var(--text-primary)"
              >
                每个面存「到光源的最近距离」（不是裁剪空间深度）
              </text>

              {/* 光源在左 */}
              <circle
                cx="70"
                cy="150"
                r="12"
                fill="var(--warning)"
                opacity="0.9"
              />
              <text
                x="70"
                y="180"
                textAnchor="middle"
                fontSize="10"
                fontWeight="600"
                fill="var(--warning)"
              >
                光源
              </text>

              {/* 近遮挡（距离小） */}
              <rect
                x="180"
                y="96"
                width="20"
                height="46"
                rx="2"
                fill="var(--accent)"
                opacity="0.75"
              />
              <line
                x1="82"
                y1="138"
                x2="180"
                y2="116"
                stroke="var(--warning)"
                strokeWidth="1.6"
                markerEnd="url(#ps-arrow-w)"
              />
              <text
                x="130"
                y="112"
                textAnchor="middle"
                fontSize="9"
                fill="var(--warning)"
              >
                近 → 距离小
              </text>

              {/* 远遮挡（距离大） */}
              <rect
                x="320"
                y="170"
                width="20"
                height="46"
                rx="2"
                fill="var(--accent)"
                opacity="0.5"
              />
              <line
                x1="82"
                y1="162"
                x2="320"
                y2="190"
                stroke="var(--warning)"
                strokeWidth="1.6"
                markerEnd="url(#ps-arrow-w)"
              />
              <text
                x="230"
                y="200"
                textAnchor="middle"
                fontSize="9"
                fill="var(--warning)"
              >
                远 → 距离大
              </text>

              {/* 右：一张面的深度图缩略（按距离深浅） */}
              <text
                x="450"
                y="58"
                textAnchor="middle"
                fontSize="10"
                fontWeight="600"
                fill="var(--accent)"
              >
                +X 面 · 距离图
              </text>
              <rect
                x="404"
                y="68"
                width="92"
                height="92"
                rx="6"
                fill="var(--bg)"
                stroke="var(--accent)"
                strokeWidth="1.5"
              />
              <rect
                x="408"
                y="72"
                width="40"
                height="84"
                rx="2"
                fill="var(--accent)"
                opacity="0.7"
              />
              <rect
                x="452"
                y="72"
                width="40"
                height="84"
                rx="2"
                fill="var(--accent)"
                opacity="0.35"
              />
              <text
                x="428"
                y="178"
                textAnchor="middle"
                fontSize="8"
                fill="var(--text-secondary)"
              >
                亮 = 近
              </text>
              <text
                x="472"
                y="178"
                textAnchor="middle"
                fontSize="8"
                fill="var(--text-secondary)"
              >
                暗 = 远
              </text>

              <text
                x="280"
                y="252"
                textAnchor="middle"
                fontSize="10"
                fill="var(--text-secondary)"
              >
                距离 ÷ far 归一化到 [0,1] 存进去
              </text>
              <text
                x="280"
                y="278"
                textAnchor="middle"
                fontSize="12"
                fontWeight="600"
                fill="var(--accent)"
              >
                存「线性距离」而非深度：点光全向，距离更自然
              </text>
            </>
          )}

          {/* ============================================================
           * 第 4 步：方向向量采样 + 距离比较判阴影
           * ============================================================ */}
          {step === 4 && (
            <>
              <text
                x="280"
                y="28"
                textAnchor="middle"
                fontSize="12"
                fontWeight="600"
                fill="var(--text-primary)"
              >
                方向 = fragPos − lightPos 采样 cubemap，比距离判阴影
              </text>

              {/* 光源 */}
              <circle
                cx="90"
                cy="80"
                r="12"
                fill="var(--warning)"
                opacity="0.9"
              />
              <text
                x="90"
                y="62"
                textAnchor="middle"
                fontSize="10"
                fontWeight="600"
                fill="var(--warning)"
              >
                光源
              </text>

              {/* 遮挡物 */}
              <rect
                x="220"
                y="120"
                width="20"
                height="90"
                rx="2"
                fill="var(--accent)"
                opacity="0.7"
              />
              <text
                x="230"
                y="112"
                textAnchor="middle"
                fontSize="9"
                fill="var(--text-primary)"
              >
                遮挡物
              </text>

              {/* 地面 */}
              <line
                x1="70"
                y1="210"
                x2="470"
                y2="210"
                stroke="var(--text-secondary)"
                strokeWidth="2"
              />

              {/* 被挡片元（红）：方向向量穿过遮挡物，实际距离 > 存的最近距离 */}
              <circle
                cx="300"
                cy="210"
                r="5"
                fill="var(--danger)"
                stroke="var(--text-primary)"
                strokeWidth="1"
              />
              <line
                x1="90"
                y1="80"
                x2="300"
                y2="210"
                stroke="var(--danger)"
                strokeWidth="1.6"
                strokeDasharray="3 3"
              />
              <text
                x="178"
                y="135"
                textAnchor="middle"
                fontSize="8"
                fill="var(--danger)"
              >
                方向 R₁
              </text>

              {/* 受光片元（绿）：方向上没遮挡，实际距离 ≈ 存的最近距离 */}
              <circle
                cx="420"
                cy="210"
                r="5"
                fill="var(--success)"
                stroke="var(--text-primary)"
                strokeWidth="1"
              />
              <line
                x1="90"
                y1="80"
                x2="420"
                y2="210"
                stroke="var(--success)"
                strokeWidth="1.6"
                strokeDasharray="3 3"
              />
              <text
                x="290"
                y="138"
                textAnchor="middle"
                fontSize="8"
                fill="var(--success)"
              >
                方向 R₂
              </text>

              {/* 结论条 */}
              <rect
                x="44"
                y="240"
                width="232"
                height="24"
                rx="12"
                fill="var(--danger)"
                opacity="0.14"
                stroke="var(--danger)"
                strokeWidth="1.5"
              />
              <text
                x="160"
                y="256"
                textAnchor="middle"
                fontSize="9.5"
                fontWeight="600"
                fill="var(--danger)"
              >
                实际距离 &gt; 存的最近距离 ⇒ 在阴影
              </text>
              <rect
                x="288"
                y="240"
                width="228"
                height="24"
                rx="12"
                fill="var(--success)"
                opacity="0.14"
                stroke="var(--success)"
                strokeWidth="1.5"
              />
              <text
                x="402"
                y="256"
                textAnchor="middle"
                fontSize="9.5"
                fontWeight="600"
                fill="var(--success)"
              >
                实际距离 ≈ 存的最近距离 ⇒ 受光
              </text>

              <text
                x="280"
                y="286"
                textAnchor="middle"
                fontSize="11"
                fill="var(--text-secondary)"
              >
                采样回的最近距离 × far 还原，再和 length(fragToLight) 比
              </text>
            </>
          )}
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        {step === 1 && (
          <>
            <strong>为什么单张 2D 不够</strong>：方向光只朝一个方向，一张 2D
            深度图就罩住；<strong>点光源向 360° 发光</strong>
            ，单张 2D 只记得住一个方向，其余方向没遮挡记录。
          </>
        )}
        {step === 2 && (
          <>
            <strong>深度立方体贴图</strong>：把光源用{" "}
            <strong>6 个面（+X/−X/+Y/−Y/+Z/−Z）</strong>
            的朝外小相机包住、各渲一张深度图，拼成一个立方体把光源周围全包住。
          </>
        )}
        {step === 3 && (
          <>
            <strong>每面存「到光源的最近距离」</strong>：点光全向，存
            <strong>线性距离</strong>比裁剪空间深度更自然；距离 ÷{" "}
            <strong>far</strong> 归一化到 [0,1] 存储（亮 = 近、暗 = 远）。
          </>
        )}
        {step === 4 && (
          <>
            <strong>方向向量采样判阴影</strong>：用{" "}
            <strong>方向 = fragPos − lightPos</strong> 去 cubemap
            取最近距离，乘回 far 还原，和片元到光的实际距离比 ——
            <span style={{ color: "var(--danger)" }}>更大 = 在阴影</span> /{" "}
            <span style={{ color: "var(--success)" }}>相等 = 受光</span>。
          </>
        )}
      </figcaption>
    </figure>
  );
}
