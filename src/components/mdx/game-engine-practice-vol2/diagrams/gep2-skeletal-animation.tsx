/**
 * <Gep2SkeletalAnimationDiagram>：骨骼动画——骨骼层级与蒙皮图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 440;

export function Gep2SkeletalAnimationDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="骨骼动画骨骼层级与蒙皮图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text
            x={VIEW_W / 2}
            y="32"
            textAnchor="middle"
            fontSize="16"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            骨骼动画：骨骼层级 + 蒙皮矩阵
          </text>

          {/* 左：骨骼层级树 */}
          <rect
            x="30"
            y="56"
            width="300"
            height="300"
            rx="10"
            fill="var(--success)"
            fillOpacity="0.05"
            stroke="var(--success)"
            strokeWidth="1.2"
            strokeOpacity="0.4"
          />
          <text
            x="180"
            y="78"
            textAnchor="middle"
            fontSize="13"
            fontWeight="700"
            fill="var(--success)"
          >
            骨骼层级 Skeleton Hierarchy
          </text>

          {/* 骨骼节点树 */}
          <circle cx="80" cy="108" r="7" fill="var(--success)" />
          <text
            x="96"
            y="112"
            fontSize="12"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            Root（髋部）
          </text>

          <line
            x1="80"
            y1="115"
            x2="80"
            y2="140"
            stroke="var(--text-tertiary)"
            strokeWidth="1.4"
          />
          <circle cx="80" cy="146" r="6" fill="var(--accent)" />
          <text x="96" y="150" fontSize="11" fill="var(--text-primary)">
            Spine（脊柱）
          </text>

          <line
            x1="80"
            y1="152"
            x2="80"
            y2="176"
            stroke="var(--text-tertiary)"
            strokeWidth="1.4"
          />
          <circle cx="80" cy="182" r="6" fill="var(--accent)" />
          <text x="96" y="186" fontSize="11" fill="var(--text-primary)">
            Neck（颈部）
          </text>

          <line
            x1="80"
            y1="188"
            x2="80"
            y2="212"
            stroke="var(--text-tertiary)"
            strokeWidth="1.4"
          />
          <circle cx="80" cy="218" r="6" fill="var(--warning)" />
          <text x="96" y="222" fontSize="11" fill="var(--text-primary)">
            Head（头部）
          </text>

          {/* 分叉到手臂 */}
          <line
            x1="80"
            y1="158"
            x2="170"
            y2="158"
            stroke="var(--text-tertiary)"
            strokeWidth="1.4"
          />
          <line
            x1="170"
            y1="158"
            x2="170"
            y2="246"
            stroke="var(--text-tertiary)"
            strokeWidth="1.4"
          />
          <circle cx="170" cy="246" r="6" fill="var(--accent)" />
          <text x="186" y="250" fontSize="11" fill="var(--text-primary)">
            L_UpperArm
          </text>
          <line
            x1="170"
            y1="252"
            x2="170"
            y2="278"
            stroke="var(--text-tertiary)"
            strokeWidth="1.4"
          />
          <circle cx="170" cy="284" r="6" fill="var(--accent)" />
          <text x="186" y="288" fontSize="11" fill="var(--text-primary)">
            L_Forearm
          </text>
          <line
            x1="170"
            y1="290"
            x2="170"
            y2="316"
            stroke="var(--text-tertiary)"
            strokeWidth="1.4"
          />
          <circle cx="170" cy="322" r="6" fill="var(--warning)" />
          <text x="186" y="326" fontSize="11" fill="var(--text-primary)">
            L_Hand
          </text>

          <text
            x="180"
            y="346"
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-tertiary)"
          >
            子骨骼继承父骨骼变换（局部矩阵相乘）
          </text>

          {/* 右：蒙皮流程 */}
          <rect
            x="350"
            y="56"
            width="360"
            height="300"
            rx="10"
            fill="var(--accent)"
            fillOpacity="0.05"
            stroke="var(--accent)"
            strokeWidth="1.2"
            strokeOpacity="0.4"
          />
          <text
            x="530"
            y="78"
            textAnchor="middle"
            fontSize="13"
            fontWeight="700"
            fill="var(--accent)"
          >
            蒙皮 Skinning：顶点跟随骨骼
          </text>

          {/* 蒙皮公式 */}
          <rect
            x="366"
            y="96"
            width="328"
            height="56"
            rx="8"
            fill="var(--elevated)"
            fillOpacity="0.6"
            stroke="var(--border)"
            strokeWidth="1.2"
          />
          <text
            x="530"
            y="118"
            textAnchor="middle"
            fontSize="12"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            最终顶点位置
          </text>
          <text
            x="530"
            y="138"
            textAnchor="middle"
            fontSize="11"
            fill="var(--accent)"
          >
            v&apos; = Σ wᵢ · Mᵢ · v（最多 4 骨骼）
          </text>

          {/* 权重示意 */}
          <text
            x="366"
            y="180"
            fontSize="12"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            顶点权重示例（肘部顶点）
          </text>
          <rect
            x="366"
            y="190"
            width="328"
            height="30"
            rx="6"
            fill="var(--success)"
            fillOpacity="0.18"
          />
          <text x="380" y="210" fontSize="11" fill="var(--text-primary)">
            L_UpperArm
          </text>
          <rect
            x="540"
            y="194"
            width="146"
            height="22"
            rx="4"
            fill="var(--success)"
            fillOpacity="0.4"
          />
          <text
            x="613"
            y="210"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-primary)"
          >
            w = 0.65
          </text>

          <rect
            x="366"
            y="226"
            width="328"
            height="30"
            rx="6"
            fill="var(--warning)"
            fillOpacity="0.18"
          />
          <text x="380" y="246" fontSize="11" fill="var(--text-primary)">
            L_Forearm
          </text>
          <rect
            x="540"
            y="230"
            width="68"
            height="22"
            rx="4"
            fill="var(--warning)"
            fillOpacity="0.4"
          />
          <text
            x="574"
            y="246"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-primary)"
          >
            w = 0.30
          </text>

          <rect
            x="366"
            y="262"
            width="328"
            height="30"
            rx="6"
            fill="var(--text-tertiary)"
            fillOpacity="0.18"
          />
          <text x="380" y="282" fontSize="11" fill="var(--text-primary)">
            L_Hand
          </text>
          <rect
            x="540"
            y="266"
            width="22"
            height="22"
            rx="4"
            fill="var(--text-tertiary)"
            fillOpacity="0.5"
          />
          <text
            x="566"
            y="282"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-primary)"
          >
            w = 0.05
          </text>

          <text
            x="530"
            y="312"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            权重之和恒为 1，骨骼动 → 顶点平滑跟随
          </text>
          <text
            x="530"
            y="330"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-tertiary)"
          >
            关键：绑定姿势矩阵 Mᵢ = offset · pose
          </text>
          <text
            x="530"
            y="348"
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-tertiary)"
          >
            offset 把顶点从模型空间转到骨骼空间
          </text>

          {/* 底部 */}
          <rect
            x="30"
            y="372"
            width="680"
            height="50"
            rx="8"
            fill="var(--accent)"
            fillOpacity="0.06"
            stroke="var(--accent)"
            strokeWidth="1"
            strokeOpacity="0.4"
          />
          <text
            x={VIEW_W / 2}
            y="394"
            textAnchor="middle"
            fontSize="12"
            fontWeight="600"
            fill="var(--accent)"
          >
            动画 = 每帧改变各骨骼的局部姿势 → 自顶向下累积世界矩阵 → 蒙皮算顶点
          </text>
          <text
            x={VIEW_W / 2}
            y="412"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-tertiary)"
          >
            美术只调骨骼关键帧，引擎负责插值与矩阵传递，不在 CPU 存每顶点动画
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        骨骼动画——骨骼层级自顶向下累积、蒙皮矩阵让顶点按权重跟随多块骨骼
      </figcaption>
    </figure>
  );
}
