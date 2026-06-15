/**
 * <EquirectToCubemapDiagram />：「PBR·IBL 漫反射辐照」§3「HDR 与等距柱状投影」+「等距柱状→立方体贴图转换」配图（HEL-164）。
 *
 * 画面内容：
 *  - 左侧：一个横长矩形（等距柱状投影 HDR），内有渐变模拟天空/地面
 *  - 中间：箭头 → 标注「SampleSphericalMap」
 *  - 右侧：立方体贴图展开十字形（+X/−X/+Y/−Y/+Z/−Z 六面）
 *  - 底部：公式 uv = vec2(atan(z,x), asin(y)) * [...] + 0.5
 *
 * Server Component（纯展示，静态 SVG，无交互）。
 * 视觉语言：token 色，无阴影，rx 圆角，无裸 hex（硬规则 5）。
 */

export function EquirectToCubemapDiagram() {
  // Cubemap 十字展开：以 (360, 100) 为 +X 起点，格子 54×54
  const cellW = 54;
  const cellH = 54;
  const crossX = 310; // +X left
  const crossY = 60; // top of +Y

  // 六面 [label, col, row]（0-indexed）
  const faces: [string, number, number][] = [
    ["+Y", 1, 0],
    ["-X", 0, 1],
    ["+Z", 1, 1],
    ["+X", 2, 1],
    ["-Z", 3, 1],
    ["-Y", 1, 2],
  ];

  const faceColors: Record<string, string> = {
    "+Y": "var(--accent)",
    "-Y": "var(--warning)",
    "+X": "var(--success)",
    "-X": "var(--danger)",
    "+Z": "var(--text-secondary)",
    "-Z": "var(--border)",
  };

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated">
        <svg
          viewBox="0 0 560 280"
          role="img"
          aria-label="等距柱状投影转立方体贴图示意图。左侧是一张横长矩形代表 HDR 等距柱状投影图，内含从蓝色天空到棕色地面的渐变。中间一个向右箭头标注 SampleSphericalMap 函数。右侧是立方体贴图的十字展开图，包含加减 X、加减 Y、加减 Z 共六个面，各面用不同颜色区分。底部是转换公式 uv = vec2(atan(z,x), asin(y)) 乘以 1/2π 和 1/π 后加 0.5。"
          className="mx-auto block h-auto w-full max-w-[560px]"
        >
          {/* 标题 */}
          <text
            x="280"
            y="24"
            textAnchor="middle"
            fontSize="13"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            等距柱状投影 → 立方体贴图
          </text>

          {/* ---- 左侧：等距柱状矩形 ---- */}
          {/* 天空渐变区 */}
          <rect x="18" y="44" width="200" height="80" rx="4" fill="var(--bg)" stroke="var(--border)" strokeWidth="1.5" />
          {/* 天空色条 */}
          <rect x="19" y="45" width="198" height="26" rx="3" fill="var(--accent)" opacity="0.25" />
          {/* 地平线色条 */}
          <rect x="19" y="71" width="198" height="26" fill="var(--text-secondary)" opacity="0.12" />
          {/* 地面色条 */}
          <rect x="19" y="97" width="198" height="26" rx="3" fill="var(--warning)" opacity="0.18" />
          {/* 经纬网格（简化） */}
          {[66, 90, 114].map((x) => (
            <line key={`vl-${x}`} x1={x} y1="44" x2={x} y2="124" stroke="var(--border)" strokeWidth="0.6" opacity="0.5" />
          ))}
          {[57, 71, 84, 97, 111].map((y) => (
            <line key={`hl-${y}`} x1="18" y1={y} x2="218" y2={y} stroke="var(--border)" strokeWidth="0.6" opacity="0.5" />
          ))}
          <text x="118" y="40" textAnchor="middle" fontSize="9" fontWeight="600" fill="var(--text-primary)">
            等距柱状投影 HDR (.hdr)
          </text>
          <text x="118" y="139" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">
            宽:高 = 2:1（经纬展开）
          </text>

          {/* ---- 中间：箭头 + 函数标注 ---- */}
          <defs>
            <marker id="eq-arr" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 z" fill="var(--accent)" />
            </marker>
          </defs>
          <line
            x1="225"
            y1="84"
            x2="306"
            y2="84"
            stroke="var(--accent)"
            strokeWidth="2"
            markerEnd="url(#eq-arr)"
          />
          <text x="265" y="76" textAnchor="middle" fontSize="9" fontWeight="600" fill="var(--accent)">
            SampleSphericalMap
          </text>
          <text x="265" y="100" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">
            渲染立方体内表面
          </text>

          {/* ---- 右侧：立方体贴图十字 ---- */}
          {faces.map(([label, col, row]) => (
            <g key={label}>
              <rect
                x={crossX + col * cellW}
                y={crossY + row * cellH}
                width={cellW}
                height={cellH}
                fill={faceColors[label]}
                opacity="0.10"
                stroke={faceColors[label]}
                strokeWidth="1.5"
              />
              <text
                x={crossX + col * cellW + cellW / 2}
                y={crossY + row * cellH + cellH / 2 + 5}
                textAnchor="middle"
                fontSize="11"
                fontWeight="700"
                fill={faceColors[label]}
              >
                {label}
              </text>
            </g>
          ))}
          <text
            x={crossX + 2 * cellW}
            y={crossY + 3 * cellH + 14}
            textAnchor="middle"
            fontSize="9"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            立方体贴图（6 面展开）
          </text>

          {/* ---- 底部公式 ---- */}
          <rect x="44" y="192" width="472" height="54" rx="8" fill="var(--accent)" opacity="0.05" stroke="var(--accent)" strokeWidth="1" />
          <text x="280" y="214" textAnchor="middle" fontSize="10" fontWeight="700" fill="var(--text-primary)">
            SampleSphericalMap 公式
          </text>
          <text x="280" y="234" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">
            uv = vec2(atan(dir.z, dir.x), asin(dir.y)) * vec2(1/2π, 1/π) + 0.5
          </text>
          <text x="280" y="250" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">
            方位角 atan → U；仰角 asin → V；结果映射到 [0,1]
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        SampleSphericalMap 把球面方向转成等距柱状 UV——用 atan 计算方位角（经度）、asin 计算仰角（纬度），归一化到 [0,1]，就能从 2:1 HDR 贴图正确采样。渲染立方体六面内表面时，逐片段调用此函数，把片段方向转成 UV 采样，便得到立方体贴图各面。
      </figcaption>
    </figure>
  );
}
