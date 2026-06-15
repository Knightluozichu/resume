/**
 * <PrefilterMipDiagram />：「PBR·IBL 镜面反射」§3「预滤波环境贴图」配图（HEL-165，C 实战型）。
 *
 * 画面内容：
 *  - 5 个矩形排成一行，从左到右越来越小（mip 0 最大，mip 4 最小）
 *  - 每个矩形内部视觉暗示模糊程度：mip 0 有细节线条，mip 4 纯色块
 *  - 每个矩形下方标注 roughness 值：0.0, 0.25, 0.5, 0.75, 1.0
 *  - 最左侧额外标注「mip 0（清晰）」，最右侧标注「mip 4（模糊）」
 *  - 底部公式：roughness × MAX_LOD → mipmap level
 *
 * Server Component（纯展示，静态 SVG，无交互）。
 * 视觉语言：token 色，无阴影，rx 圆角，无裸 hex（硬规则 5）。
 */

export function PrefilterMipDiagram() {
  // mip 等级数据
  const mips = [
    { label: "mip 0", roughness: "0.0", size: 80, note: "清晰" },
    { label: "mip 1", roughness: "0.25", size: 62, note: "" },
    { label: "mip 2", roughness: "0.5", size: 48, note: "" },
    { label: "mip 3", roughness: "0.75", size: 36, note: "" },
    { label: "mip 4", roughness: "1.0", size: 26, note: "模糊" },
  ];

  // 水平布局基线：y=40 为顶，矩形底对齐 y=140
  const baseY = 140;
  // 总宽度 560，均匀分配 5 个位置
  const positions = [80, 174, 258, 336, 400];

  // 详细纹理线条（只在 mip 0-2 显示，越来越少）
  const detailLines = (idx: number, cx: number, mipSize: number) => {
    if (idx >= 3) return null;
    const lineCount = [6, 3, 1][idx];
    const halfW = mipSize / 2 - 4;
    const halfH = mipSize / 2 - 4;
    const top = baseY - mipSize;
    const lines = [];
    for (let i = 0; i < lineCount; i++) {
      const frac = (i + 1) / (lineCount + 1);
      lines.push(
        <line
          key={`h${i}`}
          x1={cx - halfW}
          y1={top + halfH * 2 * frac + 4}
          x2={cx + halfW}
          y2={top + halfH * 2 * frac + 4}
          stroke="var(--accent)"
          strokeWidth="0.8"
          opacity={0.5 - idx * 0.15}
        />
      );
    }
    return lines;
  };

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated">
        <svg
          viewBox="0 0 560 240"
          role="img"
          aria-label="预滤波环境贴图 mipmap 示意图。五个矩形从左到右排列，从大到小分别代表 mip 0 到 mip 4。mip 0 最大且内部有详细纹理线条，代表 roughness=0 时的清晰环境反射。mip 4 最小且是纯色块，代表 roughness=1 时的完全模糊环境反射。每个矩形下方标注对应的 roughness 值 0.0、0.25、0.5、0.75、1.0。底部公式说明 roughness 乘以 MAX_LOD 得到 mipmap level。"
          className="mx-auto block h-auto w-full max-w-[560px]"
        >
          {/* 标题 */}
          <text
            x="280"
            y="22"
            textAnchor="middle"
            fontSize="13"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            预滤波环境贴图：roughness → mipmap level
          </text>

          {/* 每个 mip 级别 */}
          {mips.map((mip, idx) => {
            const cx = positions[idx];
            const top = baseY - mip.size;
            const opacityFill = 0.12 + idx * 0.07;
            return (
              <g key={idx}>
                {/* 矩形主体 */}
                <rect
                  x={cx - mip.size / 2}
                  y={top}
                  width={mip.size}
                  height={mip.size}
                  rx="4"
                  fill="var(--accent)"
                  fillOpacity={opacityFill}
                  stroke="var(--accent)"
                  strokeWidth="1.5"
                  strokeOpacity="0.7"
                />
                {/* 内部细节线条（模拟清晰度） */}
                {detailLines(idx, cx, mip.size)}
                {/* mip 标签（上方） */}
                <text
                  x={cx}
                  y={top - 6}
                  textAnchor="middle"
                  fontSize="9"
                  fontWeight="600"
                  fill="var(--accent)"
                >
                  {mip.label}
                </text>
                {/* roughness 值（下方） */}
                <text
                  x={cx}
                  y={baseY + 16}
                  textAnchor="middle"
                  fontSize="11"
                  fontWeight="700"
                  fill="var(--text-primary)"
                >
                  {mip.roughness}
                </text>
                {/* 注释（mip 0 和 mip 4） */}
                {mip.note && (
                  <text
                    x={cx}
                    y={baseY + 30}
                    textAnchor="middle"
                    fontSize="9"
                    fill="var(--text-secondary)"
                  >
                    （{mip.note}）
                  </text>
                )}
              </g>
            );
          })}

          {/* roughness 箭头（从左到右） */}
          <defs>
            <marker
              id="pmip-arr"
              markerWidth="7"
              markerHeight="7"
              refX="5"
              refY="2.5"
              orient="auto"
            >
              <path d="M0 0 L5 2.5 L0 5 z" fill="var(--text-secondary)" />
            </marker>
          </defs>
          <line
            x1="20"
            y1="158"
            x2="535"
            y2="158"
            stroke="var(--border)"
            strokeWidth="1"
            markerEnd="url(#pmip-arr)"
          />
          <text
            x="540"
            y="162"
            textAnchor="start"
            fontSize="9"
            fill="var(--text-secondary)"
          >
            r
          </text>

          {/* 模糊程度箭头（从左到右） */}
          <text
            x="20"
            y="175"
            textAnchor="start"
            fontSize="9"
            fill="var(--text-secondary)"
          >
            清晰 →
          </text>
          <text
            x="430"
            y="175"
            textAnchor="start"
            fontSize="9"
            fill="var(--text-secondary)"
          >
            → 模糊
          </text>

          {/* 底部公式 */}
          <rect
            x="90"
            y="192"
            width="380"
            height="28"
            rx="6"
            fill="var(--accent)"
            opacity="0.07"
            stroke="var(--accent)"
            strokeWidth="1"
          />
          <text
            x="280"
            y="211"
            textAnchor="middle"
            fontSize="10"
            fontWeight="600"
            fill="var(--accent)"
          >
            mipLevel = roughness × MAX_LOD（通常 MAX_LOD = 4）
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        预滤波环境贴图把粗糙度对应到 mipmap 层级：roughness=0 采最清晰的 mip 0，
        roughness=1 采最模糊的 mip 4，运行时用 textureLod 按粗糙度采样。
      </figcaption>
    </figure>
  );
}
