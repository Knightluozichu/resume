/**
 * <PhongBlinnHighlightDiagram mode="phong"|"blinn">：「高级光照·Blinn-Phong」D 对比型主 viz
 * 的两侧示意图（HEL-80）。把 Phong 镜面光的「断裂」与 Blinn-Phong 的「平滑连续」画成同构同框
 * 的两态，供 <CompareSlider> 左右擦除对比，只对比这一项本身。
 *
 * 画的是一束「掠射光」（贴着表面斜打过来，低反光度）照在一个平面上时，沿表面横向铺开的镜面高光
 * 强度带（横轴 = 表面上的位置，纵轴 = 该处算出的高光强度）：
 *  - mode="phong"：用 R·V，视线与反射向量 R 夹角一旦 >90°，R·V 被 max(...,0) 截成 0，
 *    高光在某个位置「啪」一下掉到 0——强度带出现一道竖直硬边/突然截断（断裂）。
 *  - mode="blinn"：用 N·H，半程向量 H 与法线 N 的夹角永不越界，高光强度是一条圆润下滑的曲线，
 *    一直平滑过渡到 0，没有硬边（平滑连续）。
 *
 * 两态共用同一坐标轴、同一表面、同一光线/视线方位，只在「高光强度带的形状（硬边 vs 平滑）」上
 * 不同，保证 CompareSlider 擦除时同框。
 *
 * Server Component（纯展示，静态 SVG，按 mode 切两态，无交互、无 three、reduced-motion 无关）。
 * 视觉语言与既有 diagram 一致：token 色（var(--accent)/--success/--danger/--warning/--border/
 * --bg/--bg-elevated/--text-primary/--text-secondary），无阴影、rx 圆角、无裸 hex（硬规则 5）。
 */

// 高光强度带的几何：横向一条带子 [X0, X0+BAND_W]，画成一排竖直细条，条的高度（亮度）= 该位置强度。
const X0 = 70;
const BAND_W = 480;
const BAND_Y = 250; // 强度带基线（底）
const BAND_H = 120; // 满强度时竖条的高度
const STEPS = 60; // 竖条数量

// Phong 断裂点：强度从这个归一化位置（0..1）起「啪」掉到 0（R·V 越界被 clamp）。
const PHONG_CUT = 0.46;

// 某归一化位置 t∈[0,1] 处的高光强度（0..1）。两态共用一个「峰在偏左、向右下滑」的基底，
// 区别只在 phong 在断裂点后被硬截成 0、blinn 则平滑滑到 0。
function intensityAt(t: number, mode: "phong" | "blinn"): number {
  // 基底：在 t≈0.18 处达峰、向两侧衰减的钟形（模拟掠射下高光偏向一侧）。
  const peak = 0.18;
  const base = Math.exp(-Math.pow((t - peak) / 0.34, 2));
  if (mode === "phong") {
    // Phong：过了断裂点 R·V<0 被 clamp 成 0 —— 硬截断（直接归零）。
    return t >= PHONG_CUT ? 0 : base;
  }
  // Blinn：N·H 不越界 —— 全程是连续的钟形，平滑滑到接近 0，无硬边。
  return base;
}

export function PhongBlinnHighlightDiagram({
  mode = "phong",
  bare = false,
}: {
  mode?: "phong" | "blinn";
  /**
   * bare：极简模式（默认 false）。供 <CompareSlider> 左右叠放擦除对比时使用——去掉 SVG 内顶部
   * 标题、底部一句话结论与外层 figcaption，只画坐标轴 + 表面 + 高光强度带，避免两侧标题/图注重叠。
   * viewBox 与非 bare 时一致，保证两侧同框；aria-label 保留。
   */
  bare?: boolean;
}) {
  const isPhong = mode === "phong";
  const aria = isPhong
    ? "Phong 镜面光在掠射光下的高光强度带示意。横轴是表面上的位置，纵轴是该处算出的高光强度。强度从偏左的峰值向右下滑，但走到中间某处时，因为视线与反射向量夹角超过 90 度、R 点乘 V 被截成 0，高光强度啪一下竖直掉到 0，留下一道硬边、突然截断。"
    : "Blinn-Phong 镜面光在同样掠射光下的高光强度带示意。横轴是表面上的位置，纵轴是该处算出的高光强度。因为用半程向量 H 与法线 N 的夹角算高光，夹角永不越界，强度是一条圆润的曲线，从峰值一路平滑下滑到接近 0，没有任何硬边。";

  // 生成竖条强度带
  const bars: React.ReactNode[] = [];
  for (let i = 0; i < STEPS; i++) {
    const t = (i + 0.5) / STEPS;
    const inten = intensityAt(t, mode);
    const x = X0 + t * BAND_W;
    const h = inten * BAND_H;
    if (h <= 0.4) continue;
    bars.push(
      <rect
        key={i}
        x={x - BAND_W / STEPS / 2}
        y={BAND_Y - h}
        width={BAND_W / STEPS + 0.6}
        height={h}
        fill={isPhong ? "var(--warning)" : "var(--success)"}
        fillOpacity={0.25 + inten * 0.6}
      />,
    );
  }

  // 强度包络曲线（描一条线把竖条顶连起来，看清形状）
  const envPts: string[] = [];
  for (let i = 0; i <= STEPS; i++) {
    const t = i / STEPS;
    const inten = intensityAt(t, mode);
    const x = X0 + t * BAND_W;
    const y = BAND_Y - inten * BAND_H;
    envPts.push(`${x.toFixed(1)},${y.toFixed(1)}`);
  }

  // Phong 断裂处的竖直硬边坐标
  const cutX = X0 + PHONG_CUT * BAND_W;
  const cutTopY = BAND_Y - intensityAt(PHONG_CUT - 0.001, "phong") * BAND_H;

  return (
    <figure className="mdx-figure mx-auto my-4">
      <div className="overflow-hidden rounded-card border border-border bg-elevated">
        <svg
          viewBox="0 0 600 320"
          role="img"
          aria-label={aria}
          className="mx-auto block h-auto w-full max-w-[600px]"
        >
          {!bare && (
            <text
              x="300"
              y="28"
              textAnchor="middle"
              fontSize="13"
              fontWeight="600"
              fill={isPhong ? "var(--danger)" : "var(--success)"}
            >
              {isPhong
                ? "Phong（R·V）：掠射下高光硬边断裂"
                : "Blinn-Phong（N·H）：高光平滑连续"}
            </text>
          )}

          {/* 纵轴（高光强度）与横轴（表面位置） */}
          <line
            x1={X0}
            y1={BAND_Y}
            x2={X0}
            y2={BAND_Y - BAND_H - 18}
            stroke="var(--border)"
            strokeWidth="1.5"
          />
          <line
            x1={X0}
            y1={BAND_Y}
            x2={X0 + BAND_W + 18}
            y2={BAND_Y}
            stroke="var(--border)"
            strokeWidth="1.5"
          />
          <text
            x={X0 - 8}
            y={BAND_Y - BAND_H - 8}
            textAnchor="end"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            高光强度
          </text>
          <text
            x={X0 + BAND_W + 16}
            y={BAND_Y + 16}
            textAnchor="end"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            表面位置 →
          </text>

          {/* 高光强度带（竖条） */}
          {bars}

          {/* 强度包络曲线 */}
          <polyline
            points={envPts.join(" ")}
            fill="none"
            stroke={isPhong ? "var(--warning)" : "var(--success)"}
            strokeWidth="2.5"
          />

          {/* Phong：那道竖直硬边 + 标注；Blinn：标注平滑尾 */}
          {isPhong ? (
            <>
              <line
                x1={cutX}
                y1={cutTopY}
                x2={cutX}
                y2={BAND_Y}
                stroke="var(--danger)"
                strokeWidth="2.5"
              />
              <line
                x1={cutX}
                y1={cutTopY}
                x2={cutX + 26}
                y2={cutTopY - 26}
                stroke="var(--danger)"
                strokeWidth="1.3"
              />
              <text
                x={cutX + 30}
                y={cutTopY - 30}
                fontSize="11"
                fontWeight="600"
                fill="var(--danger)"
              >
                R·V&lt;0 被截成 0：硬边断裂
              </text>
            </>
          ) : (
            <>
              <line
                x1={X0 + 0.78 * BAND_W}
                y1={BAND_Y - intensityAt(0.78, "blinn") * BAND_H}
                x2={X0 + 0.78 * BAND_W + 24}
                y2={BAND_Y - intensityAt(0.78, "blinn") * BAND_H - 30}
                stroke="var(--success)"
                strokeWidth="1.3"
              />
              <text
                x={X0 + 0.78 * BAND_W + 28}
                y={BAND_Y - intensityAt(0.78, "blinn") * BAND_H - 32}
                fontSize="11"
                fontWeight="600"
                fill="var(--success)"
              >
                N·H 不越界：一路滑到 0
              </text>
            </>
          )}

          {!bare && (
            <text
              x="300"
              y="306"
              textAnchor="middle"
              fontSize="11"
              fill="var(--text-secondary)"
            >
              {isPhong
                ? "同一束掠射光、同一个低反光度——Phong 在中途突然截断"
                : "同一束掠射光、同一个低反光度——Blinn 全程平滑"}
            </text>
          )}
        </svg>
      </div>
      {!bare && (
        <figcaption className="mt-2 text-center text-xs text-secondary">
          {isPhong ? (
            <>
              <strong>Phong</strong> 用 <code>R·V</code>：视线与反射向量夹角一旦
              <strong>超过 90°</strong>，<code>R·V</code> 被{" "}
              <code>max(…,0)</code>
              截成 0，高光强度<strong>啪一下掉到 0</strong>，留下一道
              <strong>硬边（断裂）</strong>。
            </>
          ) : (
            <>
              <strong>Blinn-Phong</strong> 用 <code>N·H</code>：半程向量 H
              与法线 N 的夹角<strong>永不越界</strong>
              ，高光强度是一条圆润曲线，从峰值
              <strong>一路平滑滑到 0</strong>，没有硬边。
            </>
          )}
        </figcaption>
      )}
    </figure>
  );
}
