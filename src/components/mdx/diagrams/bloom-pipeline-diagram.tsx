/**
 * <BloomPipelineDiagram step={1|2|3|4}>：「高级光照·泛光 Bloom」§5「泛光多遍流程」<Stepper> 四步配图（HEL-87，C 实战型）。
 *
 * 同一套「几何 pass → 亮区图 → 横纵高斯（乒乓）→ 合成上屏」骨架，按 step 演示泛光多遍流程：
 *  ①几何 pass + MRT：一次渲染同时输出两张图——正常场景色（location 0）+ 仅亮区色（location 1，亮度 > 阈值才留）。
 *  ②横向高斯模糊：把亮区图沿水平方向糊一遍（一行内左右邻居按钟形权重加权）。
 *  ③纵向高斯模糊：再沿垂直方向糊一遍；横纵交替反复 = 乒乓帧缓冲，越糊越柔（N 次）。
 *  ④叠加合成：把糊好的光晕加回场景色（scene + bloom），再 tonemap + gamma 上屏。
 *
 * 每步带「缩略图」示意当前数据长什么样（场景色块 / 仅几个亮点的亮区图 / 横向拉条 / 纵向拉条 / 带辉光的合成图）。
 *
 * Server Component（纯展示，静态 SVG，无交互、无 three、reduced-motion 无关）。
 * 视觉语言与既有 diagram 一致：token 色（var(--accent)/--warning/--success/--danger/--border/
 * --bg/--bg-elevated/--text-primary/--text-secondary），无阴影、rx 圆角、无裸 hex（硬规则 5）。
 */

type BloomStep = 1 | 2 | 3 | 4;

const ARIA: Record<BloomStep, string> = {
  1: "泛光多遍流程第一步，几何 pass 配多渲染目标 MRT。一次几何渲染同时输出两张图，第一张是正常的场景颜色，第二张只保留亮度超过阈值的像素当作亮区图，暗的区域全黑、不参与泛光。",
  2: "泛光多遍流程第二步，横向高斯模糊。把亮区图沿水平方向模糊一遍，每个像素取同一行左右邻居按钟形权重加权求和，几个孤立的亮点被横向拉成模糊的横条。",
  3: "泛光多遍流程第三步，纵向高斯模糊。把上一步的结果再沿垂直方向模糊一遍。横向和纵向交替反复就是乒乓帧缓冲，糊的次数越多光晕越柔和饱满。",
  4: "泛光多遍流程第四步，叠加合成。把糊好的光晕图直接加回原始场景色，等于 scene 加 bloom，亮点周围透出柔和辉光，最后再做色调映射和 gamma 校正上屏。",
};

// 一个统一的「缩略图」帧：x,y 左上角，给定内容渲染器
function Thumb({
  x,
  y,
  label,
  active,
  children,
}: {
  x: number;
  y: number;
  label: string;
  active: boolean;
  children: React.ReactNode;
}) {
  const w = 80;
  const h = 56;
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx="5"
        fill="var(--bg)"
        stroke={active ? "var(--accent)" : "var(--border)"}
        strokeWidth={active ? "2" : "1.5"}
      />
      {children}
      <text
        x={x + w / 2}
        y={y + h + 13}
        textAnchor="middle"
        fontSize="8.5"
        fill={active ? "var(--accent)" : "var(--text-secondary)"}
      >
        {label}
      </text>
    </g>
  );
}

export function BloomPipelineDiagram({ step }: { step: BloomStep }) {
  // 四张缩略图的左上角横坐标（纵坐标共用一行）
  const ty = 70;
  const tx1 = 24; // 几何 pass（场景 + 亮区两张叠示意）
  const tx2 = 168; // 横向模糊
  const tx3 = 296; // 纵向模糊
  const tx4 = 440; // 合成上屏

  return (
    <figure className="mdx-figure mx-auto my-4">
      <div className="overflow-hidden rounded-card border border-border bg-elevated">
        <svg
          viewBox="0 0 560 200"
          role="img"
          aria-label={ARIA[step]}
          className="mx-auto block h-auto w-full max-w-[560px]"
        >
          <text
            x="280"
            y="24"
            textAnchor="middle"
            fontSize="13"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            泛光多遍流程：提亮 → 横纵高斯（乒乓）→ 合成
          </text>

          {/* ===== ① 几何 pass + MRT：场景色 + 亮区色 两张缩略图叠放 ===== */}
          {/* 场景色缩略图（满屏暗背景 + 几个亮点） */}
          <Thumb x={tx1} y={ty} label="场景色 + 亮区色" active={step === 1}>
            {/* 暗背景 */}
            <rect
              x={tx1 + 4}
              y={ty + 4}
              width={72}
              height={48}
              rx="3"
              fill="var(--bg-elevated)"
            />
            {/* 几个亮点 */}
            <circle cx={tx1 + 22} cy={ty + 22} r="4" fill="var(--warning)" />
            <circle cx={tx1 + 52} cy={ty + 34} r="5" fill="var(--accent)" />
            <circle cx={tx1 + 60} cy={ty + 16} r="3" fill="var(--danger)" />
          </Thumb>
          {/* MRT 双输出小标 */}
          <text
            x={tx1 + 40}
            y={ty - 6}
            textAnchor="middle"
            fontSize="8"
            fill={step === 1 ? "var(--accent)" : "var(--text-secondary)"}
          >
            MRT 一次出两图
          </text>

          {/* arrow ①→② 提取亮区 */}
          <line
            x1={tx1 + 84}
            y1={ty + 28}
            x2={tx2 - 4}
            y2={ty + 28}
            stroke={step >= 2 ? "var(--accent)" : "var(--border)"}
            strokeWidth="1.5"
            markerEnd={step >= 2 ? "url(#bp-arrow-a)" : "url(#bp-arrow-d)"}
          />

          {/* ===== ② 横向高斯模糊 ===== */}
          <Thumb x={tx2} y={ty} label="横向模糊" active={step === 2}>
            <rect
              x={tx2 + 4}
              y={ty + 4}
              width={72}
              height={48}
              rx="3"
              fill="var(--bg-elevated)"
            />
            {/* 亮点被横向拉成模糊横条 */}
            <ellipse
              cx={tx2 + 30}
              cy={ty + 22}
              rx="22"
              ry="4"
              fill="var(--warning)"
              opacity="0.55"
            />
            <ellipse
              cx={tx2 + 46}
              cy={ty + 36}
              rx="26"
              ry="5"
              fill="var(--accent)"
              opacity="0.55"
            />
          </Thumb>
          <text
            x={tx2 + 40}
            y={ty - 6}
            textAnchor="middle"
            fontSize="8"
            fill={step === 2 ? "var(--accent)" : "var(--text-secondary)"}
          >
            水平方向
          </text>

          {/* arrow ②→③ */}
          <line
            x1={tx2 + 84}
            y1={ty + 28}
            x2={tx3 - 4}
            y2={ty + 28}
            stroke={step >= 3 ? "var(--accent)" : "var(--border)"}
            strokeWidth="1.5"
            markerEnd={step >= 3 ? "url(#bp-arrow-a)" : "url(#bp-arrow-d)"}
          />

          {/* ===== ③ 纵向高斯模糊 ===== */}
          <Thumb
            x={tx3}
            y={ty}
            label="纵向模糊（乒乓 N 次）"
            active={step === 3}
          >
            <rect
              x={tx3 + 4}
              y={ty + 4}
              width={72}
              height={48}
              rx="3"
              fill="var(--bg-elevated)"
            />
            {/* 横条再纵向糊成柔和光团 */}
            <ellipse
              cx={tx3 + 30}
              cy={ty + 24}
              rx="20"
              ry="12"
              fill="var(--warning)"
              opacity="0.45"
            />
            <ellipse
              cx={tx3 + 46}
              cy={ty + 34}
              rx="22"
              ry="13"
              fill="var(--accent)"
              opacity="0.45"
            />
          </Thumb>
          <text
            x={tx3 + 40}
            y={ty - 6}
            textAnchor="middle"
            fontSize="8"
            fill={step === 3 ? "var(--accent)" : "var(--text-secondary)"}
          >
            垂直方向
          </text>

          {/* arrow ③→④ 叠回场景 */}
          <line
            x1={tx3 + 84}
            y1={ty + 28}
            x2={tx4 - 4}
            y2={ty + 28}
            stroke={step >= 4 ? "var(--success)" : "var(--border)"}
            strokeWidth="1.5"
            markerEnd={step >= 4 ? "url(#bp-arrow-s)" : "url(#bp-arrow-d)"}
          />

          {/* ===== ④ 合成上屏 ===== */}
          <Thumb
            x={tx4}
            y={ty}
            label="scene + bloom → 上屏"
            active={step === 4}
          >
            <rect
              x={tx4 + 4}
              y={ty + 4}
              width={72}
              height={48}
              rx="3"
              fill="var(--bg-elevated)"
            />
            {/* 原亮点 + 周围柔和辉光 */}
            <circle
              cx={tx4 + 22}
              cy={ty + 22}
              r="11"
              fill="var(--warning)"
              opacity="0.3"
            />
            <circle cx={tx4 + 22} cy={ty + 22} r="4" fill="var(--warning)" />
            <circle
              cx={tx4 + 52}
              cy={ty + 34}
              r="13"
              fill="var(--accent)"
              opacity="0.3"
            />
            <circle cx={tx4 + 52} cy={ty + 34} r="5" fill="var(--accent)" />
            <circle
              cx={tx4 + 60}
              cy={ty + 16}
              r="8"
              fill="var(--danger)"
              opacity="0.3"
            />
            <circle cx={tx4 + 60} cy={ty + 16} r="3" fill="var(--danger)" />
          </Thumb>
          <text
            x={tx4 + 40}
            y={ty - 6}
            textAnchor="middle"
            fontSize="8"
            fill={step === 4 ? "var(--success)" : "var(--text-secondary)"}
          >
            加回原图 + tonemap
          </text>

          <defs>
            <marker
              id="bp-arrow-a"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
            >
              <path d="M0 0 L6 3 L0 6 z" fill="var(--accent)" />
            </marker>
            <marker
              id="bp-arrow-s"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
            >
              <path d="M0 0 L6 3 L0 6 z" fill="var(--success)" />
            </marker>
            <marker
              id="bp-arrow-d"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
            >
              <path d="M0 0 L6 3 L0 6 z" fill="var(--border)" />
            </marker>
          </defs>

          {/* ===== 底部本步状态 ===== */}
          {step === 1 && (
            <text
              x="280"
              y="184"
              textAnchor="middle"
              fontSize="11.5"
              fontWeight="600"
              fill="var(--accent)"
            >
              ① 几何 pass + MRT：一次输出 场景色 + 亮区色（亮度 &gt; 阈值才留）
            </text>
          )}
          {step === 2 && (
            <text
              x="280"
              y="184"
              textAnchor="middle"
              fontSize="11.5"
              fontWeight="600"
              fill="var(--accent)"
            >
              ② 横向高斯：亮区图沿水平方向糊一遍（孤立亮点 → 模糊横条）
            </text>
          )}
          {step === 3 && (
            <text
              x="280"
              y="184"
              textAnchor="middle"
              fontSize="11.5"
              fontWeight="600"
              fill="var(--accent)"
            >
              ③ 纵向高斯：再沿垂直方向糊 —— 横纵交替反复 = 乒乓 N 次，越糊越柔
            </text>
          )}
          {step === 4 && (
            <>
              <rect
                x="120"
                y="170"
                width="320"
                height="24"
                rx="12"
                fill="var(--success)"
                opacity="0.14"
                stroke="var(--success)"
                strokeWidth="1.5"
              />
              <text
                x="280"
                y="186"
                textAnchor="middle"
                fontSize="11.5"
                fontWeight="600"
                fill="var(--success)"
              >
                ④ 合成：scene + bloom 加回原图，再 tonemap + gamma → 上屏
              </text>
            </>
          )}
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        {step === 1 && (
          <>
            <strong>① 几何 pass + MRT</strong>：一次几何渲染同时输出
            <strong>场景色</strong>和<strong>亮区色</strong>
            ——只有亮度超过<strong>阈值</strong>
            的像素留进亮区图，暗的全黑、不发光晕。
          </>
        )}
        {step === 2 && (
          <>
            <strong>② 横向高斯模糊</strong>：把亮区图沿<strong>水平方向</strong>
            糊一遍，几个孤立亮点被左右邻居加权拉成模糊横条。
          </>
        )}
        {step === 3 && (
          <>
            <strong>③ 纵向高斯模糊</strong>：再沿<strong>垂直方向</strong>
            糊一遍。横纵交替反复就是<strong>乒乓帧缓冲</strong>
            ，糊的次数越多光晕越柔和。
          </>
        )}
        {step === 4 && (
          <>
            <strong>④ 叠加合成</strong>：把糊好的光晕直接
            <strong>加回场景色</strong>（<code>scene + bloom</code>），再
            tonemap + gamma 上屏 —— 亮点周围透出柔和辉光。
          </>
        )}
      </figcaption>
    </figure>
  );
}
