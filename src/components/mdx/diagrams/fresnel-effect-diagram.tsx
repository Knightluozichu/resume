/**
 * <FresnelEffectDiagram>：「PBR·理论」§3.7「菲涅尔方程 F」小节配图（HEL-162，B 数学型）。
 *
 * 画 Fresnel-Schlick 近似的曲线图：
 *  横轴：观察角 theta（0° 正看 → 90° 掠射），或 cos(theta) 从 1 到 0。
 *  纵轴：反射率 F 从 F0（基础反射率）到 1。
 * 曲线形状：在 0° 附近反射率为 F0，到掠射角附近急剧升到接近 1。
 * 标注 F0 基础反射率位置，以及掠射角 → 全反射的趋势。
 *
 * Server Component（纯展示静态 SVG）。
 * 视觉语言：token 色 var(--accent/--success/--warning/--danger/--border/--bg/--bg-elevated/--text-primary/--text-secondary)。
 */

export function FresnelEffectDiagram() {
  // Fresnel-Schlick: F = F0 + (1 - F0) * (1 - cos(theta))^5
  // 画两条曲线：F0=0.04（电介质）和 F0=0.7（金属）
  const w = 360;
  const h = 220;
  const ox = 130; // 原点 x
  const oy = 270; // 原点 y

  function fresnelCurve(f0: number): string {
    const points: string[] = [];
    for (let i = 0; i <= 40; i++) {
      const t = i / 40; // 0 = normal (theta=0), 1 = grazing (theta=90)
      const cosTheta = 1 - t;
      const f = f0 + (1 - f0) * Math.pow(1 - cosTheta, 5);
      const px = ox + t * w;
      const py = oy - f * h;
      points.push(`${px},${py}`);
    }
    return points.join(" ");
  }

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated">
        <svg
          viewBox="0 0 560 340"
          role="img"
          aria-label="菲涅尔效应曲线图。横轴是观察角度从 0 度到 90 度（正看到掠射），纵轴是反射率从 0 到 1。画了两条曲线。蓝色曲线是电介质 F0 约等于 0.04，在正看时反射率很低约 0.04，到掠射角附近急剧升高接近 1。橙色曲线是金属 F0 约 0.7，起点就很高，到掠射角同样接近 1。所有材质在掠射角都趋近全反射。"
          className="mx-auto block h-auto w-full max-w-[560px]"
        >
          {/* 标题 */}
          <text
            x="280"
            y="26"
            textAnchor="middle"
            fontSize="14"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            Fresnel-Schlick：掠射角 → 反射率飙升
          </text>

          {/* 坐标轴 */}
          {/* Y 轴 */}
          <line
            x1={ox}
            y1={oy}
            x2={ox}
            y2={oy - h - 20}
            stroke="var(--border)"
            strokeWidth="1.5"
          />
          {/* X 轴 */}
          <line
            x1={ox}
            y1={oy}
            x2={ox + w + 20}
            y2={oy}
            stroke="var(--border)"
            strokeWidth="1.5"
          />

          {/* Y 轴刻度 */}
          {[0, 0.25, 0.5, 0.75, 1.0].map((v) => (
            <g key={`y-${v}`}>
              <line
                x1={ox - 4}
                y1={oy - v * h}
                x2={ox}
                y2={oy - v * h}
                stroke="var(--border)"
                strokeWidth="1"
              />
              <text
                x={ox - 8}
                y={oy - v * h + 4}
                textAnchor="end"
                fontSize="10"
                fill="var(--text-secondary)"
              >
                {v}
              </text>
            </g>
          ))}
          <text
            x={ox - 30}
            y={oy - h / 2}
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
            transform={`rotate(-90 ${ox - 30} ${oy - h / 2})`}
          >
            反射率 F
          </text>

          {/* X 轴刻度 */}
          {[
            { v: 0, label: "0°" },
            { v: 0.5, label: "45°" },
            { v: 1, label: "90°" },
          ].map(({ v, label }) => (
            <g key={`x-${v}`}>
              <line
                x1={ox + v * w}
                y1={oy}
                x2={ox + v * w}
                y2={oy + 4}
                stroke="var(--border)"
                strokeWidth="1"
              />
              <text
                x={ox + v * w}
                y={oy + 18}
                textAnchor="middle"
                fontSize="10"
                fill="var(--text-secondary)"
              >
                {label}
              </text>
            </g>
          ))}
          <text
            x={ox + w / 2}
            y={oy + 34}
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            观察角度 theta（正看 → 掠射）
          </text>

          {/* F=1 参考虚线 */}
          <line
            x1={ox}
            y1={oy - h}
            x2={ox + w}
            y2={oy - h}
            stroke="var(--border)"
            strokeWidth="1"
            strokeDasharray="4 4"
          />

          {/* 电介质曲线 F0=0.04 */}
          <polyline
            points={fresnelCurve(0.04)}
            fill="none"
            stroke="var(--accent)"
            strokeWidth="2.5"
          />

          {/* 金属曲线 F0=0.7 */}
          <polyline
            points={fresnelCurve(0.7)}
            fill="none"
            stroke="var(--warning)"
            strokeWidth="2.5"
          />

          {/* F0 标注 - 电介质 */}
          <line
            x1={ox}
            y1={oy - 0.04 * h}
            x2={ox + 30}
            y2={oy - 0.04 * h}
            stroke="var(--accent)"
            strokeWidth="1"
            strokeDasharray="3 3"
          />
          <text
            x={ox + 34}
            y={oy - 0.04 * h + 4}
            fontSize="10"
            fill="var(--accent)"
          >
            F0 ~ 0.04
          </text>

          {/* F0 标注 - 金属 */}
          <line
            x1={ox}
            y1={oy - 0.7 * h}
            x2={ox + 30}
            y2={oy - 0.7 * h}
            stroke="var(--warning)"
            strokeWidth="1"
            strokeDasharray="3 3"
          />
          <text
            x={ox + 34}
            y={oy - 0.7 * h + 4}
            fontSize="10"
            fill="var(--warning)"
          >
            F0 ~ 0.7
          </text>

          {/* 图例 */}
          <rect x="370" y="50" width="160" height="52" rx="6" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
          <line x1="380" y1="66" x2="410" y2="66" stroke="var(--accent)" strokeWidth="2.5" />
          <text x="416" y="70" fontSize="10" fill="var(--text-primary)">
            电介质（非金属）
          </text>
          <line x1="380" y1="88" x2="410" y2="88" stroke="var(--warning)" strokeWidth="2.5" />
          <text x="416" y="92" fontSize="10" fill="var(--text-primary)">
            金属
          </text>

          {/* 掠射角标注 */}
          <text
            x={ox + w - 20}
            y={oy - h - 6}
            textAnchor="end"
            fontSize="10"
            fontWeight="600"
            fill="var(--danger)"
          >
            掠射角 → 全反射
          </text>

          {/* 底部公式 */}
          <rect
            x="100"
            y="302"
            width="360"
            height="28"
            rx="8"
            fill="var(--accent)"
            opacity="0.06"
            stroke="var(--accent)"
            strokeWidth="1"
          />
          <text
            x="280"
            y="321"
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            F(h,v,F0) = F0 + (1-F0)(1-(h.v))^5
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Fresnel-Schlick 近似：正看时反射率等于 F0（电介质约 0.04、金属更高），掠射角附近急剧升至接近 1。所有材质在掠射角都趋近全反射。
      </figcaption>
    </figure>
  );
}
