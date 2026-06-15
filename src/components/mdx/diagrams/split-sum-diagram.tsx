/**
 * <SplitSumDiagram />：「PBR·IBL 镜面反射」§3「Split-Sum 近似」配图（HEL-165，C 实战型）。
 *
 * 画面内容：
 *  - 左侧：镜面积分表达式（大积分符号 + 文字）
 *  - 中间：≈ 符号 + 拆分箭头
 *  - 右上：「预滤波环境颜色」盒子（立方体贴图图标，带模糊层级暗示）
 *  - 右侧：× 符号
 *  - 右下：「BRDF 积分 (scale, bias)」盒子（2D LUT 色块）
 *  - 底部：注释「拆成两个可独立预计算的部分 → 运行时只需两次贴图采样」
 *
 * Server Component（纯展示，静态 SVG，无交互）。
 * 视觉语言：token 色，无阴影，rx 圆角，无裸 hex（硬规则 5）。
 */

export function SplitSumDiagram() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated">
        <svg
          viewBox="0 0 560 280"
          role="img"
          aria-label="Split-Sum 近似示意图。左侧显示镜面积分表达式（对 Li·fr·cosθ 的半球积分）。中间有约等于符号。右侧被拆成两部分：右上是预滤波环境颜色盒子（带多级模糊的立方体贴图图标），乘以右下的 BRDF 积分盒子（二维查找纹理，输入 NdotV 和 roughness，输出 scale 和 bias）。底部注释说明拆成两个可独立预计算的部分，运行时只需两次贴图采样。"
          className="mx-auto block h-auto w-full max-w-[560px]"
        >
          {/* 标题 */}
          <text
            x="280"
            y="26"
            textAnchor="middle"
            fontSize="13"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            Split-Sum 近似：镜面积分拆成两个独立预计算
          </text>

          {/* 左侧：积分表达式盒 */}
          <rect
            x="18"
            y="44"
            width="148"
            height="140"
            rx="8"
            fill="var(--bg)"
            stroke="var(--border)"
            strokeWidth="1.5"
          />
          <text
            x="92"
            y="68"
            textAnchor="middle"
            fontSize="10"
            fontWeight="600"
            fill="var(--text-secondary)"
          >
            镜面积分
          </text>
          {/* 积分符号（用大字体 ∫ 模拟） */}
          <text
            x="46"
            y="130"
            textAnchor="middle"
            fontSize="52"
            fontWeight="300"
            fill="var(--accent)"
            opacity="0.9"
          >
            ∫
          </text>
          <text
            x="100"
            y="108"
            textAnchor="start"
            fontSize="11"
            fill="var(--text-primary)"
          >
            Li(ωi)
          </text>
          <text
            x="100"
            y="126"
            textAnchor="start"
            fontSize="11"
            fill="var(--text-primary)"
          >
            · fr(ωo,ωi)
          </text>
          <text
            x="100"
            y="144"
            textAnchor="start"
            fontSize="11"
            fill="var(--text-primary)"
          >
            · cos θ dωi
          </text>
          <text
            x="92"
            y="172"
            textAnchor="middle"
            fontSize="9"
            fill="var(--text-secondary)"
          >
            Ω（半球）
          </text>

          {/* 约等于符号 */}
          <text
            x="182"
            y="122"
            textAnchor="middle"
            fontSize="28"
            fontWeight="700"
            fill="var(--accent)"
          >
            ≈
          </text>

          {/* 右侧两个盒子 */}
          {/* 右上：预滤波环境颜色 */}
          <rect
            x="204"
            y="44"
            width="166"
            height="80"
            rx="8"
            fill="var(--bg)"
            stroke="var(--accent)"
            strokeWidth="1.5"
          />
          <text
            x="287"
            y="64"
            textAnchor="middle"
            fontSize="10"
            fontWeight="700"
            fill="var(--accent)"
          >
            预滤波环境颜色
          </text>
          {/* 立方体贴图图标（简化六面体） */}
          <rect
            x="214"
            y="70"
            width="20"
            height="20"
            rx="2"
            fill="var(--accent)"
            opacity="0.4"
          />
          <rect
            x="236"
            y="70"
            width="20"
            height="20"
            rx="2"
            fill="var(--accent)"
            opacity="0.25"
          />
          <rect
            x="258"
            y="70"
            width="20"
            height="20"
            rx="2"
            fill="var(--accent)"
            opacity="0.13"
          />
          <text
            x="220"
            y="81"
            textAnchor="middle"
            fontSize="7"
            fill="var(--bg)"
            fontWeight="700"
          >
            r=0
          </text>
          <text
            x="246"
            y="81"
            textAnchor="middle"
            fontSize="7"
            fill="var(--accent)"
            fontWeight="700"
          >
            0.5
          </text>
          <text
            x="268"
            y="81"
            textAnchor="middle"
            fontSize="7"
            fill="var(--accent)"
            fontWeight="700"
          >
            1.0
          </text>
          <text
            x="287"
            y="106"
            textAnchor="middle"
            fontSize="9"
            fill="var(--text-secondary)"
          >
            sample(envMap, R, roughness)
          </text>

          {/* × 符号 */}
          <text
            x="392"
            y="122"
            textAnchor="middle"
            fontSize="22"
            fontWeight="700"
            fill="var(--text-secondary)"
          >
            ×
          </text>

          {/* 右下：BRDF 积分 LUT */}
          <rect
            x="204"
            y="136"
            width="166"
            height="80"
            rx="8"
            fill="var(--bg)"
            stroke="var(--success)"
            strokeWidth="1.5"
          />
          <text
            x="287"
            y="156"
            textAnchor="middle"
            fontSize="10"
            fontWeight="700"
            fill="var(--success)"
          >
            BRDF 积分 LUT
          </text>
          {/* 2D LUT 色块示意 */}
          <rect
            x="214"
            y="162"
            width="26"
            height="26"
            rx="2"
            fill="var(--success)"
            opacity="0.5"
          />
          <rect
            x="244"
            y="162"
            width="26"
            height="26"
            rx="2"
            fill="var(--warning)"
            opacity="0.4"
          />
          <text
            x="227"
            y="178"
            textAnchor="middle"
            fontSize="7"
            fill="var(--bg)"
            fontWeight="700"
          >
            A
          </text>
          <text
            x="257"
            y="178"
            textAnchor="middle"
            fontSize="7"
            fill="var(--bg)"
            fontWeight="700"
          >
            B
          </text>
          <text
            x="287"
            y="200"
            textAnchor="middle"
            fontSize="9"
            fill="var(--text-secondary)"
          >
            LUT(NdotV, roughness) → (A, B)
          </text>

          {/* 右侧最终合并公式 */}
          <rect
            x="386"
            y="60"
            width="160"
            height="104"
            rx="8"
            fill="var(--bg)"
            stroke="var(--border)"
            strokeWidth="1.2"
            strokeDasharray="5 3"
          />
          <text
            x="466"
            y="80"
            textAnchor="middle"
            fontSize="10"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            运行时合并公式
          </text>
          <text
            x="466"
            y="100"
            textAnchor="middle"
            fontSize="9"
            fill="var(--text-secondary)"
          >
            prefilteredColor
          </text>
          <text
            x="466"
            y="116"
            textAnchor="middle"
            fontSize="9"
            fill="var(--text-secondary)"
          >
            × (F0·A + B)
          </text>
          <text
            x="466"
            y="136"
            textAnchor="middle"
            fontSize="8"
            fill="var(--text-secondary)"
            fontStyle="italic"
          >
            两次贴图采样
          </text>
          <text
            x="466"
            y="150"
            textAnchor="middle"
            fontSize="8"
            fill="var(--text-secondary)"
            fontStyle="italic"
          >
            即可完成积分
          </text>

          {/* 连接箭头（× → 右侧合并） */}
          <defs>
            <marker
              id="ss-arr"
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
            x1="410"
            y1="114"
            x2="384"
            y2="114"
            stroke="var(--text-secondary)"
            strokeWidth="1.2"
            markerEnd="url(#ss-arr)"
          />

          {/* 底部注释 */}
          <rect
            x="18"
            y="232"
            width="524"
            height="30"
            rx="6"
            fill="var(--accent)"
            opacity="0.07"
            stroke="var(--accent)"
            strokeWidth="1"
          />
          <text
            x="280"
            y="251"
            textAnchor="middle"
            fontSize="10"
            fontWeight="600"
            fill="var(--accent)"
          >
            拆成两个可独立预计算的部分 → 运行时只需两次贴图采样
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Split-Sum 近似：把难以实时计算的镜面积分拆成预滤波环境颜色（左乘项）和
        BRDF 积分 LUT（右乘项），两项可独立预计算，运行时各查一次表即可还原积分。
      </figcaption>
    </figure>
  );
}
