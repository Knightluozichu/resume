/**
 * <BrdfLutDiagram />：「PBR·IBL 镜面反射」§3「BRDF 积分 LUT」配图（HEL-165，C 实战型）。
 *
 * 画面内容：
 *  - 一个正方形代表 2D 纹理（BRDF 积分贴图）
 *  - X 轴：cos θ (NdotV) 从 0 到 1（掠射角 → 正对）
 *  - Y 轴：roughness 从 0 到 1（光滑 → 粗糙）
 *  - 纹理内部：分成两个区域，左为 R 通道（scale/A，偏绿），右为 G 通道（bias/B，偏红）
 *    实际用渐变色块模拟颜色过渡
 *  - 右侧标注：R 通道 = F0 的缩放系数(A)，G 通道 = F0 的偏移量(B)
 *  - 底部公式：specular = prefilteredColor × (F0·A + B)
 *
 * Server Component（纯展示，静态 SVG，无交互）。
 * 视觉语言：token 色，无阴影，rx 圆角，无裸 hex（硬规则 5）。
 */

export function BrdfLutDiagram() {
  const lutX = 70;
  const lutY = 44;
  const lutW = 180;
  const lutH = 180;

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated">
        <svg
          viewBox="0 0 560 300"
          role="img"
          aria-label="BRDF 积分 LUT 示意图。中央是一个 180×180 的正方形代表二维查找纹理。X 轴从左到右是 cos θ（NdotV）从 0 到 1。Y 轴从下到上是 roughness 从 0 到 1。纹理内部左半区用绿色渐变代表 R 通道（F0 的缩放系数 A），右半区用橙色渐变代表 G 通道（F0 的偏移量 B）。右侧注释说明 R 通道等于 F0 的缩放系数 A，G 通道等于 F0 的偏移量 B。底部公式是 specular 等于 prefilteredColor 乘以括号 F0 乘以 A 加 B。"
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
            BRDF 积分 LUT（2D 查找纹理）
          </text>

          <defs>
            {/* R 通道颜色渐变（代表 scale/A，success 绿色系） */}
            <linearGradient id="lut-r-grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="var(--success)" stopOpacity="0.1" />
              <stop offset="100%" stopColor="var(--success)" stopOpacity="0.55" />
            </linearGradient>
            {/* G 通道颜色渐变（代表 bias/B，warning 橙色系） */}
            <linearGradient id="lut-g-grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="var(--warning)" stopOpacity="0.05" />
              <stop offset="100%" stopColor="var(--warning)" stopOpacity="0.4" />
            </linearGradient>
          </defs>

          {/* LUT 纹理背景 */}
          <rect
            x={lutX}
            y={lutY}
            width={lutW}
            height={lutH}
            rx="4"
            fill="var(--bg)"
            stroke="var(--border)"
            strokeWidth="1.5"
          />

          {/* R 通道区域（左半） */}
          <rect
            x={lutX}
            y={lutY}
            width={lutW / 2}
            height={lutH}
            rx="4"
            fill="url(#lut-r-grad)"
          />

          {/* G 通道区域（右半） */}
          <rect
            x={lutX + lutW / 2}
            y={lutY}
            width={lutW / 2}
            height={lutH}
            rx="4"
            fill="url(#lut-g-grad)"
          />

          {/* LUT 内部分隔线 */}
          <line
            x1={lutX + lutW / 2}
            y1={lutY}
            x2={lutX + lutW / 2}
            y2={lutY + lutH}
            stroke="var(--border)"
            strokeWidth="1"
            strokeDasharray="4 3"
          />

          {/* R 通道中心标签 */}
          <text
            x={lutX + lutW / 4}
            y={lutY + lutH / 2 - 6}
            textAnchor="middle"
            fontSize="14"
            fontWeight="700"
            fill="var(--success)"
          >
            R
          </text>
          <text
            x={lutX + lutW / 4}
            y={lutY + lutH / 2 + 10}
            textAnchor="middle"
            fontSize="9"
            fill="var(--success)"
          >
            scale (A)
          </text>

          {/* G 通道中心标签 */}
          <text
            x={lutX + lutW * 3 / 4}
            y={lutY + lutH / 2 - 6}
            textAnchor="middle"
            fontSize="14"
            fontWeight="700"
            fill="var(--warning)"
          >
            G
          </text>
          <text
            x={lutX + lutW * 3 / 4}
            y={lutY + lutH / 2 + 10}
            textAnchor="middle"
            fontSize="9"
            fill="var(--warning)"
          >
            bias (B)
          </text>

          {/* X 轴 */}
          <line
            x1={lutX}
            y1={lutY + lutH + 8}
            x2={lutX + lutW}
            y2={lutY + lutH + 8}
            stroke="var(--text-secondary)"
            strokeWidth="1.2"
          />
          <text
            x={lutX}
            y={lutY + lutH + 22}
            textAnchor="middle"
            fontSize="9"
            fill="var(--text-secondary)"
          >
            0
          </text>
          <text
            x={lutX + lutW}
            y={lutY + lutH + 22}
            textAnchor="middle"
            fontSize="9"
            fill="var(--text-secondary)"
          >
            1
          </text>
          <text
            x={lutX + lutW / 2}
            y={lutY + lutH + 22}
            textAnchor="middle"
            fontSize="10"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            cos θ (NdotV) →
          </text>

          {/* Y 轴 */}
          <line
            x1={lutX - 8}
            y1={lutY}
            x2={lutX - 8}
            y2={lutY + lutH}
            stroke="var(--text-secondary)"
            strokeWidth="1.2"
          />
          <text
            x={lutX - 14}
            y={lutY + lutH + 4}
            textAnchor="end"
            fontSize="9"
            fill="var(--text-secondary)"
          >
            0
          </text>
          <text
            x={lutX - 14}
            y={lutY + 4}
            textAnchor="end"
            fontSize="9"
            fill="var(--text-secondary)"
          >
            1
          </text>
          <text
            x={lutX - 14}
            y={lutY + lutH / 2}
            textAnchor="middle"
            fontSize="10"
            fontWeight="600"
            fill="var(--text-primary)"
            transform={`rotate(-90, ${lutX - 14}, ${lutY + lutH / 2})`}
          >
            roughness ↑
          </text>

          {/* 右侧注释 */}
          {/* 注释框 1: R 通道 */}
          <rect
            x="272"
            y="70"
            width="260"
            height="46"
            rx="6"
            fill="var(--success)"
            fillOpacity="0.07"
            stroke="var(--success)"
            strokeWidth="1"
          />
          <text
            x="284"
            y="88"
            fontSize="10"
            fontWeight="700"
            fill="var(--success)"
          >
            R 通道 = F0 的缩放系数（A）
          </text>
          <text
            x="284"
            y="106"
            fontSize="9"
            fill="var(--text-secondary)"
          >
            当 NdotV↑ 或 roughness↓ 时 A 趋近 1
          </text>

          {/* 注释框 2: G 通道 */}
          <rect
            x="272"
            y="130"
            width="260"
            height="46"
            rx="6"
            fill="var(--warning)"
            fillOpacity="0.07"
            stroke="var(--warning)"
            strokeWidth="1"
          />
          <text
            x="284"
            y="148"
            fontSize="10"
            fontWeight="700"
            fill="var(--warning)"
          >
            G 通道 = F0 的偏移量（B）
          </text>
          <text
            x="284"
            y="166"
            fontSize="9"
            fill="var(--text-secondary)"
          >
            补偿 Fresnel 对粗糙面的基础反射率
          </text>

          {/* 连接线（R 通道） */}
          <line
            x1="251"
            y1="93"
            x2="270"
            y2="93"
            stroke="var(--success)"
            strokeWidth="1"
            strokeDasharray="3 2"
          />

          {/* 连接线（G 通道） */}
          <line
            x1="251"
            y1="153"
            x2="270"
            y2="153"
            stroke="var(--warning)"
            strokeWidth="1"
            strokeDasharray="3 2"
          />

          {/* 底部公式 */}
          <rect
            x="60"
            y="248"
            width="440"
            height="34"
            rx="6"
            fill="var(--accent)"
            fillOpacity="0.07"
            stroke="var(--accent)"
            strokeWidth="1"
          />
          <text
            x="280"
            y="265"
            textAnchor="middle"
            fontSize="10"
            fontWeight="700"
            fill="var(--accent)"
          >
            specular = prefilteredColor × (F0 · A + B)
          </text>
          <text
            x="280"
            y="277"
            textAnchor="middle"
            fontSize="9"
            fill="var(--text-secondary)"
          >
            F0 从 LUT 中查出的 (A, B) 重建 Fresnel 积分
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        BRDF 积分 LUT：一张以 NdotV（横轴）和 roughness（纵轴）为输入的 2D 查找纹理，
        R 通道存 F0 的缩放系数 A，G 通道存偏移量 B。运行时用 F0·A + B 重建镜面 Fresnel 积分。
      </figcaption>
    </figure>
  );
}
