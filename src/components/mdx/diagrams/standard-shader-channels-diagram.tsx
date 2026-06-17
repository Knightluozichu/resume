/**
 * <StandardShaderChannelsDiagram>：辅图（解剖图，静态）——「Standard Shader 的关键输入通道」（HEL-288）。
 *
 * 把 Unity 5 的 Standard Shader（基于物理 PBR 的标准着色器）拆成四个关键输入通道，
 * 各列一行 + 标注「各自控制表面的什么」：
 *  · Albedo（基础色 / 反照率，可贴图）—— 表面的基础颜色
 *  · Metallic（金属度）—— 像不像金属
 *  · Smoothness（光滑度）—— 多光滑、反光多锐
 *  · Normal Map（法线贴图）—— 给平面伪造凹凸细节
 * 右侧示意：四个通道合成后的一颗球体外观。
 *
 * 纯静态解剖图（无 anime，无可交互徽章）。所有坐标整数常量；token-only 无裸 hex；
 * 所有 <text> 距 viewBox 任意边 ≥20px；行不重叠、右侧球与左侧行不重叠。
 */

const VIEW_W = 736;
// VIEW_H=372：左侧分组说明基线 330、底部说明基线 350（距底边 22px，≥20），两行间距 20px 不重叠；
// bbox 底 ~353。纵向利用率 ~84%。
const VIEW_H = 372;

// ── 左侧四个通道行（竖排） ──
const ROW_X = 28;
const ROW_W = 432;
const ROW_H = 56;
const ROW_Y0 = 76; // 第一行 y
const ROW_DY = 62; // 行距（4 行：76 / 138 / 200 / 262）
const ICON_CX = ROW_X + 34; // 通道图标中心 x

// ── 右侧合成球 ──
const BALL_X = 500;
const BALL_W = 208;
const BALL_CX = BALL_X + BALL_W / 2; // 604
const BALL_CY = 168;
const BALL_R = 60;

const channels = [
  {
    key: "albedo",
    name: "Albedo（基础色）",
    ctrl: "表面的基础颜色 / 反照率（可贴图）",
    accent: "var(--accent)",
  },
  {
    key: "metallic",
    name: "Metallic（金属度）",
    ctrl: "像不像金属：0 = 塑料/木头，1 = 金属",
    accent: "var(--text-secondary)",
  },
  {
    key: "smoothness",
    name: "Smoothness（光滑度）",
    ctrl: "多光滑、反光多锐：高 = 镜面，低 = 磨砂",
    accent: "var(--success)",
  },
  {
    key: "normal",
    name: "Normal Map（法线贴图）",
    ctrl: "给平面「伪造」凹凸细节（不改真实形状）",
    accent: "var(--warning)",
  },
];

export function StandardShaderChannelsDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="rounded-card border border-border bg-elevated p-6">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Standard Shader 关键输入通道解剖图。Unity 5 的 Standard Shader 是基于物理的标准着色器。左侧竖排四个关键输入通道，每行标注它控制表面的什么：第一行 Albedo 基础色，控制表面的基础颜色或反照率，可以用贴图；第二行 Metallic 金属度，控制像不像金属，0 是塑料或木头，1 是金属；第三行 Smoothness 光滑度，控制多光滑、反光多锐，高是镜面、低是磨砂；第四行 Normal Map 法线贴图，给平面伪造凹凸细节，但不改真实形状。右侧示意这四个通道合成后的一颗球体外观，带高光。核心是：Standard Shader 把这几个物理参数填好，就能调出从塑料到金属、从粗糙到镜面的各种真实表面。"
          className="mx-auto block h-auto w-full max-w-[736px]"
        >
          {/* ===== 主标题 ===== */}
          <text
            x={VIEW_W / 2}
            y={28}
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            Standard Shader 的关键输入通道（每个控制表面的一种特征）
          </text>
          <text
            x={VIEW_W / 2}
            y={48}
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            Unity 5 引入的基于物理（PBR）的标准着色器
          </text>

          {/* ============ 左侧：四个通道行 ============ */}
          {channels.map((c, i) => {
            const y = ROW_Y0 + i * ROW_DY;
            const cy = y + ROW_H / 2;
            return (
              <g key={c.key}>
                <rect
                  x={ROW_X}
                  y={y}
                  width={ROW_W}
                  height={ROW_H}
                  rx="10"
                  fill="var(--bg)"
                  stroke="var(--border)"
                  strokeWidth="1.4"
                />
                {/* 通道图标：圆点 */}
                <circle
                  cx={ICON_CX}
                  cy={cy}
                  r="11"
                  fill={c.accent}
                  fillOpacity="0.35"
                  stroke={c.accent}
                  strokeWidth="1.6"
                />
                <text
                  x={ROW_X + 64}
                  y={y + 24}
                  textAnchor="start"
                  fontSize="12"
                  fontWeight="700"
                  fontFamily="var(--font-mono)"
                  fill={c.accent}
                >
                  {c.name}
                </text>
                <text
                  x={ROW_X + 64}
                  y={y + 43}
                  textAnchor="start"
                  fontSize="9.5"
                  fill="var(--text-secondary)"
                >
                  {c.ctrl}
                </text>
              </g>
            );
          })}

          {/* 左侧分组说明 */}
          <text
            x={ROW_X}
            y={ROW_Y0 + 4 * ROW_DY + 6}
            textAnchor="start"
            fontSize="9.5"
            fill="var(--text-secondary)"
          >
            填好这几格 → 各通道合成 → 决定表面最终外观（右）
          </text>

          {/* ===== 合成箭头：通道区 → 球 ===== */}
          <line
            x1={ROW_X + ROW_W}
            y1={BALL_CY}
            x2={BALL_X}
            y2={BALL_CY}
            stroke="var(--accent)"
            strokeWidth="2"
            markerEnd="url(#ssc-arrow)"
          />
          <text
            x={(ROW_X + ROW_W + BALL_X) / 2}
            y={BALL_CY - 10}
            textAnchor="middle"
            fontSize="9"
            fill="var(--text-secondary)"
          >
            合成
          </text>

          {/* ============ 右侧：合成后的球体外观 ============ */}
          <rect
            x={BALL_X}
            y={64}
            width={BALL_W}
            height={208}
            rx="12"
            fill="var(--accent)"
            fillOpacity="0.06"
            stroke="var(--accent)"
            strokeWidth="2"
          />
          {/* 球本体 */}
          <circle
            cx={BALL_CX}
            cy={BALL_CY}
            r={BALL_R}
            fill="var(--accent)"
            fillOpacity="0.45"
          />
          {/* 高光（光滑度 + 光照表现） */}
          <circle
            cx={BALL_CX - 20}
            cy={BALL_CY - 20}
            r="16"
            fill="var(--bg-elevated)"
            fillOpacity="0.8"
          />
          {/* 暗面（金属/明暗） */}
          <circle
            cx={BALL_CX + 22}
            cy={BALL_CY + 22}
            r="22"
            fill="var(--text-primary)"
            fillOpacity="0.12"
          />
          <text
            x={BALL_CX}
            y={64 + 168}
            textAnchor="middle"
            fontSize="11"
            fontWeight="700"
            fill="var(--accent)"
          >
            合成后的表面外观
          </text>
          <text
            x={BALL_CX}
            y={64 + 188}
            textAnchor="middle"
            fontSize="9"
            fill="var(--text-secondary)"
          >
            颜色 + 金属感 + 反光 + 凹凸
          </text>

          {/* ===== 底部一句话点题（基线 350，距底边 22px） ===== */}
          <text
            x={VIEW_W / 2}
            y={VIEW_H - 22}
            textAnchor="middle"
            fontSize="10.5"
            fill="var(--text-secondary)"
          >
            调这几个滑块 / 贴图，就能从塑料调到金属、从磨砂调到镜面——一个
            Standard Shader 包揽绝大多数表面
          </text>

          <defs>
            <marker
              id="ssc-arrow"
              markerWidth="9"
              markerHeight="9"
              refX="5"
              refY="3"
              orient="auto"
            >
              <path d="M0 0 L6 3 L0 6 z" fill="var(--accent)" />
            </marker>
          </defs>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Unity 5 的 **Standard Shader**
        是一个基于物理的标准着色器。它最关键的几个输入是：**Albedo**（基础颜色，可贴图）、**Metallic**（金属度，像不像金属）、**Smoothness**（光滑度，多光滑反光）、**Normal
        Map**（法线贴图，给平面伪造凹凸）。把这几格填好，各通道合成出表面的最终外观——一个
        Shader 就能调出从塑料到金属、从磨砂到镜面的绝大多数材质。
      </figcaption>
    </figure>
  );
}
