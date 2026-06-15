/**
 * <FrustumDiagram>：「坐标系统」§4「投影矩阵推导」核心掰碎图（B 数学型）。
 *
 * 展示透视投影视锥体——一个从摄像机出发的金字塔形可见区域：近平面到远平面之间的
 * 内容被映射到 NDC [-1,1]³ 立方体。标注摄像机、近平面、远平面、fov（视角）和 NDC。
 *
 * Server Component（纯展示，静态 SVG，无交互、无 three、reduced-motion 无关）。
 * token 色，无阴影、rx 圆角（硬规则 5）。
 */
export function FrustumDiagram() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated">
        <svg
          viewBox="0 0 660 400"
          role="img"
          aria-label="透视投影视锥体。左侧是摄像机位置（眼睛图标），从它发出一个金字塔形的可见区域：近平面（near）是一个小长方形，远平面（far）是一个大长方形，两者之间的四棱台就是视锥体，只有落在视锥体内的物体会被渲染。被框住的物体经过投影矩阵被压进右侧展示的 NDC 立方体 [-1,1]³ 中。左侧的 fov 视角标注说明了近平面有多宽。"
          className="mx-auto block h-auto w-full max-w-[660px]"
        >
          {/* 标题 */}
          <text
            x="330"
            y="32"
            textAnchor="middle"
            fontSize="14"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            透视投影：把一个金字塔形的视锥体装进 NDC 立方体
          </text>

          {/* ============ 左侧：视锥体 ============ */}
          {/* 摄像机（左端） */}
          <circle cx="60" cy="220" r="8" fill="var(--accent)" />
          <text
            x="60"
            y="248"
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill="var(--accent)"
          >
            摄像机
          </text>

          {/* 近平面（小矩形） */}
          <rect
            x="130"
            y="184"
            width="80"
            height="72"
            rx="3"
            fill="var(--accent-glow)"
            stroke="var(--success)"
            strokeWidth="2"
          />
          <text
            x="170"
            y="178"
            textAnchor="middle"
            fontSize="10"
            fontWeight="600"
            fill="var(--success)"
          >
            near
          </text>

          {/* 远平面（大矩形） */}
          <rect
            x="290"
            y="164"
            width="160"
            height="112"
            rx="3"
            fill="var(--accent-glow)"
            stroke="var(--warning)"
            strokeWidth="2"
          />
          <text
            x="370"
            y="158"
            textAnchor="middle"
            fontSize="10"
            fontWeight="600"
            fill="var(--warning)"
          >
            far
          </text>

          {/* 视锥体棱线（摄像机到近平面的四个顶点） */}
          <line
            x1="60"
            y1="220"
            x2="130"
            y2="184"
            stroke="var(--border)"
            strokeWidth="1.5"
            strokeDasharray="4 3"
          />
          <line
            x1="60"
            y1="220"
            x2="210"
            y2="184"
            stroke="var(--border)"
            strokeWidth="1.5"
            strokeDasharray="4 3"
          />
          <line
            x1="60"
            y1="220"
            x2="130"
            y2="256"
            stroke="var(--border)"
            strokeWidth="1.5"
            strokeDasharray="4 3"
          />
          <line
            x1="60"
            y1="220"
            x2="210"
            y2="256"
            stroke="var(--border)"
            strokeWidth="1.5"
            strokeDasharray="4 3"
          />

          {/* 延伸线：近平面到远平面 */}
          <line
            x1="130"
            y1="184"
            x2="290"
            y2="164"
            stroke="var(--border)"
            strokeWidth="1.5"
            strokeDasharray="4 3"
          />
          <line
            x1="210"
            y1="184"
            x2="450"
            y2="164"
            stroke="var(--border)"
            strokeWidth="1.5"
            strokeDasharray="4 3"
          />
          <line
            x1="130"
            y1="256"
            x2="290"
            y2="276"
            stroke="var(--border)"
            strokeWidth="1.5"
            strokeDasharray="4 3"
          />
          <line
            x1="210"
            y1="256"
            x2="450"
            y2="276"
            stroke="var(--border)"
            strokeWidth="1.5"
            strokeDasharray="4 3"
          />

          {/* fov 角标注 */}
          <path
            d="M60 220 L78 196 L90 220"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="1.5"
          />
          <text x="96" y="198" fontSize="10" fill="var(--accent)">
            fov
          </text>

          {/* 视锥体中的物体（一个简单方块） */}
          <rect
            x="200"
            y="208"
            width="24"
            height="24"
            rx="3"
            fill="var(--warning)"
            stroke="var(--warning)"
            strokeWidth="1"
            opacity="0.8"
          />
          <text
            x="212"
            y="262"
            textAnchor="middle"
            fontSize="9"
            fill="var(--text-secondary)"
          >
            物体会被渲染
          </text>

          {/* 箭头：投影 → */}
          <line
            x1="460"
            y1="220"
            x2="490"
            y2="220"
            stroke="var(--accent)"
            strokeWidth="2"
          />
          <polygon points="486,214 496,220 486,226" fill="var(--accent)" />
          <text
            x="475"
            y="210"
            textAnchor="middle"
            fontSize="10"
            fill="var(--accent)"
          >
            投影
          </text>

          {/* ============ 右侧：NDC 立方体 ============ */}
          <rect
            x="506"
            y="184"
            width="72"
            height="72"
            rx="4"
            fill="var(--accent-glow)"
            stroke="var(--accent)"
            strokeWidth="2"
          />
          <text
            x="542"
            y="270"
            textAnchor="middle"
            fontSize="10"
            fontWeight="600"
            fill="var(--accent)"
          >
            NDC
          </text>
          <text
            x="542"
            y="284"
            textAnchor="middle"
            fontSize="9"
            fill="var(--text-secondary)"
          >
            [-1,1]³
          </text>

          {/* 被压扁的物体示意 */}
          <rect
            x="524"
            y="202"
            width="18"
            height="26"
            rx="2"
            fill="var(--warning)"
            stroke="var(--warning)"
            strokeWidth="0.5"
            opacity="0.7"
          />

          {/* ============ 底部说明 ============ */}
          <text
            x="330"
            y="310"
            textAnchor="middle"
            fontSize="12"
            fontWeight="600"
            fill="var(--accent)"
          >
            透视投影 = 给整个视锥体做一次「装进箱子的挤压」
          </text>

          {/* 关键公式 */}
          <text
            x="330"
            y="340"
            textAnchor="middle"
            fontSize="13"
            fontFamily="var(--font-mono)"
            fill="var(--text-primary)"
          >
            V_clip = P_projection · V_view
          </text>
          <text
            x="330"
            y="364"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            投影矩阵 P 把视锥体里所有点压缩到 NDC 立方体；透视除法（除以
            w）让「远的变小」
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        透视投影视锥体是一个从摄像机出发的金字塔形可见区域。近平面（near）和远平面（far）之间、落在视锥体棱线内的物体被保留，之外的被裁掉。投影矩阵把这个区域整体压进
        NDC [-1,1]³ 的立方体——离摄像机越远的物体被压得越扁。
      </figcaption>
    </figure>
  );
}
