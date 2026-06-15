/**
 * <LookAtDiagram>：「坐标系统」§4「LookAt 矩阵推导」核心掰碎图（B 数学型）。
 *
 * 摄像机 LookAt 矩阵的三根轴（right、up、front）如何从 position + target + up 三个输入
 * 构造出来。展示了右手坐标系下三个正交轴的关系，以及 LookAt 如何被组装成一个先平移
 * 再旋转的组合矩阵（把世界拉到摄像机前面）。
 *
 * Server Component（纯展示，静态 SVG，无交互、无 three、reduced-motion 无关）。
 * token 色，无阴影、rx 圆角（硬规则 5）。
 */
export function LookAtDiagram() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated">
        <svg
          viewBox="0 0 660 400"
          role="img"
          aria-label="LookAt 矩阵构造过程。左手侧给出摄像机位置 position、要看向的目标 target、以及朝上的方向 up 三个输入。通过 cross 叉乘依次算出摄像机前向轴 front（从 position 指向 target 的归一化向量）、右轴 right（front 叉乘 up 再归一化）、上轴 upReal（right 叉乘 front）。三根正交轴排成一个 3×3 旋转矩阵，再结合平移，就组成了 4×4 的 LookAt 矩阵——作用是把世界绕着摄像机平移和旋转，让摄像机变成新原点。"
          className="mx-auto block h-auto w-full max-w-[660px]"
        >
          <text
            x="330"
            y="30"
            textAnchor="middle"
            fontSize="14"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            LookAt 矩阵：用三个数算出摄像机的三根轴
          </text>

          {/* ========== 左侧：摄像机位置 + 方向示意 ========== */}
          {/* 原点标记 */}
          <circle cx="90" cy="180" r="4" fill="var(--text-secondary)" />
          <text
            x="90"
            y="168"
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            原点
          </text>

          {/* 世界空间坐标系 */}
          <line
            x1="90"
            y1="180"
            x2="150"
            y2="180"
            stroke="var(--text-secondary)"
            strokeWidth="0.8"
          />
          <line
            x1="90"
            y1="180"
            x2="90"
            y2="120"
            stroke="var(--text-secondary)"
            strokeWidth="0.8"
          />
          <text x="156" y="183" fontSize="9" fill="var(--text-secondary)">
            X
          </text>
          <text x="83" y="116" fontSize="9" fill="var(--text-secondary)">
            Y
          </text>

          {/* 摄像机（position） */}
          <circle cx="180" cy="120" r="10" fill="var(--accent)" />
          <text
            x="180"
            y="108"
            textAnchor="middle"
            fontSize="10"
            fontWeight="600"
            fill="var(--accent)"
          >
            摄像机
          </text>
          <text
            x="180"
            y="146"
            textAnchor="middle"
            fontSize="9"
            fill="var(--text-secondary)"
          >
            position
          </text>

          {/* target */}
          <circle cx="240" cy="200" r="5" fill="var(--success)" />
          <text
            x="240"
            y="190"
            textAnchor="middle"
            fontSize="10"
            fontWeight="600"
            fill="var(--success)"
          >
            target
          </text>

          {/* 摄像机到 target 连线 = front 方向 */}
          <line
            x1="180"
            y1="120"
            x2="240"
            y2="200"
            stroke="var(--accent)"
            strokeWidth="2"
          />
          {/* 摄像机→target 箭头 */}
          <polygon points="232,192 242,200 232,208" fill="var(--accent)" />

          {/* 世界 up 方向（竖直） */}
          <line
            x1="180"
            y1="120"
            x2="180"
            y2="70"
            stroke="var(--text-secondary)"
            strokeWidth="1.5"
            strokeDasharray="6 3"
          />
          <text x="190" y="92" fontSize="9" fill="var(--text-secondary)">
            世界 up
          </text>

          {/* ========== 中间：三轴构造步骤 ========== */}
          <g transform="translate(310, 52)">
            <text
              x="30"
              y="0"
              fontSize="12"
              fontWeight="600"
              fill="var(--warning)"
            >
              构造三根轴
            </text>

            {/* 步骤 1: front */}
            <text
              x="0"
              y="28"
              fontSize="9"
              fontFamily="var(--font-mono)"
              fill="var(--text-primary)"
            >
              ① front = normalize(target - position)
            </text>
            <line
              x1="0"
              y1="38"
              x2="60"
              y2="38"
              stroke="var(--accent)"
              strokeWidth="2"
            />
            <polygon points="55,33 65,38 55,43" fill="var(--accent)" />
            <text
              x="72"
              y="42"
              fontSize="9"
              fontWeight="600"
              fill="var(--accent)"
            >
              前 z
            </text>

            {/* 步骤 2: right */}
            <text
              x="0"
              y="62"
              fontSize="9"
              fontFamily="var(--font-mono)"
              fill="var(--text-primary)"
            >
              ② right = normalize(front × up)
            </text>
            <line
              x1="0"
              y1="72"
              x2="60"
              y2="72"
              stroke="var(--success)"
              strokeWidth="2"
            />
            <polygon points="55,67 65,72 55,77" fill="var(--success)" />
            <text
              x="72"
              y="76"
              fontSize="9"
              fontWeight="600"
              fill="var(--success)"
            >
              右 x
            </text>

            {/* 步骤 3: upReal */}
            <text
              x="0"
              y="96"
              fontSize="9"
              fontFamily="var(--font-mono)"
              fill="var(--text-primary)"
            >
              ③ upReal = normalize(right × front)
            </text>
            <line
              x1="0"
              y1="106"
              x2="60"
              y2="106"
              stroke="var(--warning)"
              strokeWidth="2"
            />
            <polygon points="55,101 65,106 55,111" fill="var(--warning)" />
            <text
              x="72"
              y="110"
              fontSize="9"
              fontWeight="600"
              fill="var(--warning)"
            >
              上 y
            </text>
          </g>

          {/* ========== 右侧：LookAt 矩阵结构 ========== */}
          <g transform="translate(80, 260)">
            <text
              x="250"
              y="0"
              fontSize="12"
              fontWeight="600"
              fill="var(--accent)"
            >
              LookAt 矩阵 = 平移(-position) · 旋转(R)
            </text>
            <text x="250" y="20" fontSize="10" fill="var(--text-secondary)">
              先把世界平移到摄像机原点，再旋转让摄像机轴对齐坐标轴
            </text>

            {/* 旋转矩阵 R */}
            <rect
              x="260"
              y="34"
              width="110"
              height="50"
              rx="4"
              fill="none"
              stroke="var(--accent)"
              strokeWidth="1.5"
            />
            <text
              x="315"
              y="51"
              textAnchor="middle"
              fontSize="9"
              fontFamily="var(--font-mono)"
              fill="var(--text-primary)"
            >
              right_x upReal_x front_x
            </text>
            <text
              x="315"
              y="65"
              textAnchor="middle"
              fontSize="9"
              fontFamily="var(--font-mono)"
              fill="var(--text-primary)"
            >
              right_y upReal_y front_y
            </text>
            <text
              x="315"
              y="79"
              textAnchor="middle"
              fontSize="9"
              fontFamily="var(--font-mono)"
              fill="var(--text-primary)"
            >
              right_z upReal_z front_z
            </text>
            <text x="260" y="95" fontSize="9" fill="var(--text-secondary)">
              right 列 up 列 front 列
            </text>
          </g>

          {/* 底部提示 */}
          <text
            x="330"
            y="388"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            三根轴互为正交，组成右手坐标系；LookAt 就是「平移到位 +
            旋转对准」两个矩阵的组合。
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        从摄像机 position 到目标 target 的方向就是前向轴 front；用 world up 和
        front 叉乘得到右轴 right；再用 right 和 front 叉乘得到精确的上轴
        upReal。三根正交轴拼成旋转矩阵，配合平移组成完整 LookAt
        矩阵——作用是把世界拉到摄像机面前。
      </figcaption>
    </figure>
  );
}
