/**
 * <FaceCullingDiagram culled={false|true}>：「面剔除」剔除关 vs 开 同构同框对比图
 * （HEL-70，A 概念型）。同一个立方体，两态只差「背面画不画」这一项，供 <CompareSlider> 左右擦除对比：
 *  - culled=false（剔除关）：背面三角形也照画——你能透过前面的面看到立方体内壁/背面，
 *    画面里多出本不该看见的「内侧的面」，显得乱、像内外翻穿帮。
 *  - culled=true（剔除开，默认）：背对镜头的背面被丢弃，只剩朝你的正面，画面干净，
 *    且省掉了背面那一半的片段开销。
 *
 * 两态用完全相同的立方体几何（同 viewBox、同顶点位置），只在「是否画出背面那些面」上不同，
 * 保证 CompareSlider 擦除时同构同框、只对比被剔除项本身。
 *
 * Server Component（纯展示，静态 SVG，按 culled prop 切两态，无交互、无 three、reduced-motion 无关）。
 * 视觉语言与既有 diagram 一致：token 色（var(--accent)/--success/--danger/--warning/--border/
 * --bg/--bg-elevated/--text-primary/--text-secondary），无阴影、rx 圆角、无裸 hex（硬规则 5）。
 */

export function FaceCullingDiagram({
  culled = false,
  bare = false,
}: {
  culled?: boolean;
  /**
   * bare：极简模式（默认 false）。供 <CompareSlider> 左右叠放擦除对比时使用——
   * 此时去掉 SVG 内的顶部标题、底部一句话结论与外层 figcaption，只画立方体本身
   * （正面保留 / culled 时背面虚线淡出那套绘制），避免两侧标题/图注重叠成乱码。
   * viewBox 与非 bare 时完全一致，保证两侧同框；无障碍 aria-label 保留。
   */
  bare?: boolean;
}) {
  const cx = 130;
  const cy = 130;
  const aria = culled
    ? "面剔除开启状态。一个立方体只画出朝向观察者的正面，背对镜头的背面被剔除丢弃，画面干净，只看到该看到的几个面，并省下了背面那一半的片段开销。"
    : "面剔除关闭状态。一个立方体把背对镜头的背面也画了出来，于是能透过前面的面看到立方体内壁和背面，画面里多出本不该看见的内侧的面，显得杂乱、像内外翻穿帮。";

  return (
    <figure className="mdx-figure mx-auto my-4">
      <div className="overflow-hidden rounded-card border border-border bg-elevated">
        <svg
          viewBox="0 0 260 260"
          role="img"
          aria-label={aria}
          className="mx-auto block h-auto w-full max-w-[260px]"
        >
          {!bare && (
            <text
              x={cx}
              y="30"
              textAnchor="middle"
              fontSize="12"
              fontWeight="600"
              fill={culled ? "var(--success)" : "var(--danger)"}
            >
              {culled ? "剔除开：只画正面" : "剔除关：背面也画出来"}
            </text>
          )}

          {/* ====== 背面那些面（只有 culled=false 时画出，制造「透视看到内壁」的穿帮感） ====== */}
          {!culled && (
            <>
              {/* 背面方块（藏在立方体后侧的那一面，被画了出来） */}
              <polygon
                points={`${cx - 18},${cy - 64} ${cx + 64},${cy - 64} ${cx + 64},${cy + 18} ${cx - 18},${cy + 18}`}
                fill="var(--danger)"
                fillOpacity="0.22"
                stroke="var(--danger)"
                strokeWidth="1.5"
              />
              {/* 透出来的内壁侧面（顶内壁） */}
              <polygon
                points={`${cx - 64},${cy - 18} ${cx - 18},${cy - 64} ${cx + 64},${cy - 64} ${cx + 18},${cy - 18}`}
                fill="var(--danger)"
                fillOpacity="0.12"
                stroke="var(--danger)"
                strokeWidth="1"
                strokeDasharray="4 3"
              />
              <text
                x={cx + 22}
                y={cy - 40}
                textAnchor="middle"
                fontSize="9"
                fontWeight="600"
                fill="var(--danger)"
              >
                看到内壁/背面
              </text>
            </>
          )}

          {/* ====== 立方体外框（两态都画：顶面 + 右侧面 + 正面） ====== */}
          {/* 顶面 */}
          <polygon
            points={`${cx - 64},${cy - 18} ${cx - 18},${cy - 64} ${cx + 64},${cy - 64} ${cx + 18},${cy - 18}`}
            fill="var(--accent)"
            fillOpacity={culled ? 0.3 : 0.16}
            stroke="var(--accent)"
            strokeWidth="1.5"
          />
          {/* 右侧面 */}
          <polygon
            points={`${cx + 18},${cy - 18} ${cx + 64},${cy - 64} ${cx + 64},${cy + 18} ${cx + 18},${cy + 64}`}
            fill="var(--accent)"
            fillOpacity={culled ? 0.24 : 0.12}
            stroke="var(--accent)"
            strokeWidth="1.5"
          />
          {/* 正面（正对屏幕的方形，朝你 = 正面，两态都保留） */}
          <polygon
            points={`${cx - 64},${cy - 18} ${cx + 18},${cy - 18} ${cx + 18},${cy + 64} ${cx - 64},${cy + 64}`}
            fill="var(--accent)"
            fillOpacity={culled ? 0.42 : 0.34}
            stroke="var(--accent)"
            strokeWidth="2"
          />
          <text
            x={cx - 23}
            y={cy + 28}
            textAnchor="middle"
            fontSize="10"
            fontWeight="600"
            fill="var(--accent)"
          >
            正面
          </text>

          {/* 底部一句话结论 */}
          {!bare && (
            <text
              x={cx}
              y="244"
              textAnchor="middle"
              fontSize="11"
              fontWeight="600"
              fill={culled ? "var(--success)" : "var(--danger)"}
            >
              {culled ? "干净 · 省一半片段" : "杂乱 · 看见不该看的面"}
            </text>
          )}
        </svg>
      </div>
      {!bare && (
        <figcaption className="mt-2 text-center text-xs text-secondary">
          {culled ? (
            <>
              剔除<strong>开</strong>：背对镜头的<strong>背面被丢弃</strong>
              ，只剩朝你的正面，画面干净、还省掉一半片段开销。
            </>
          ) : (
            <>
              剔除<strong>关</strong>：背面也照画，于是
              <strong>透过前面看到了内壁/背面</strong>，显得乱、像内外翻穿帮。
            </>
          )}
        </figcaption>
      )}
    </figure>
  );
}
