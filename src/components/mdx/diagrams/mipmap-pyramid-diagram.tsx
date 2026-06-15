/**
 * <MipmapPyramidDiagram>：「纹理」§3「多级渐远纹理 mipmap」小节配图（HEL-34）。
 *
 * 把 mipmap 画成一摞「逐级减半」的纹理金字塔：从原图（最大、Level 0）往上，每一级
 * 边长砍半（128→64→32→16…），到顶是一个像素。右侧一条「物体由近到远」的轴，
 * 用箭头标出：物体离得近 → 用大的高清级；离得远、在屏幕上只占几个像素 → 用小的低清级。
 *
 * 解决的直觉：远处物体若仍用原图，一个屏幕像素要横跨纹理图一大片，采样会闪烁/摩尔纹、
 * 还白读一堆显存；mipmap 预先备好各级缩小版，按物体远近「就近取一级」，又快又稳。
 *
 * Server Component（纯展示，静态 SVG，无交互、无 three、reduced-motion 无关）。
 * token 色（var(--accent)/--border/--bg/--bg-elevated/--text-primary/--text-secondary），
 * 无阴影、rx 圆角（硬规则 5）。各级用棋盘格示意「同一张图、分辨率递减」。
 */

const LEVELS: ReadonlyArray<{ size: number; label: string; cell: number }> = [
  { size: 120, label: "Level 0（原图）", cell: 15 },
  { size: 80, label: "Level 1", cell: 10 },
  { size: 52, label: "Level 2", cell: 6.5 },
  { size: 34, label: "Level 3", cell: 4.25 },
  { size: 20, label: "…更小", cell: 10 },
];

export function MipmapPyramidDiagram() {
  // 各级左对齐堆叠，纵向依次往下排，模拟「金字塔逐级减半」。
  const baseX = 60;
  // 预计算每一级的累积顶边 y：第一级 top=50，之后每级 += 上一级 size + 8（纯计算，不在渲染期 mutate）。
  const tops = LEVELS.reduce<number[]>((acc, lv, i) => {
    acc.push(i === 0 ? 50 : acc[i - 1] + LEVELS[i - 1].size + 8);
    return acc;
  }, []);

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated">
        <svg
          viewBox="0 0 640 420"
          role="img"
          aria-label="多级渐远纹理是一摞逐级减半的纹理副本：从原图 Level 0 往下，每一级边长砍半，越来越小。右侧轴显示物体离相机越近用越大越清晰的级别，离得越远、在屏幕上只占几个像素时用越小的级别。"
          className="mx-auto block h-auto w-full max-w-[640px]"
        >
          <defs>
            {LEVELS.map((lv, i) => (
              <pattern
                key={lv.label}
                id={`mip-checker-${i}`}
                width={lv.cell * 2}
                height={lv.cell * 2}
                patternUnits="userSpaceOnUse"
              >
                <rect
                  width={lv.cell * 2}
                  height={lv.cell * 2}
                  fill="var(--bg)"
                />
                <rect width={lv.cell} height={lv.cell} fill="var(--border)" />
                <rect
                  x={lv.cell}
                  y={lv.cell}
                  width={lv.cell}
                  height={lv.cell}
                  fill="var(--border)"
                />
              </pattern>
            ))}
          </defs>

          <text
            x="130"
            y="30"
            textAnchor="middle"
            fontSize="13"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            一摞逐级减半的纹理
          </text>

          {/* 各级方块 + 标签（逐级减半） */}
          {LEVELS.map((lv, i) => {
            const x = baseX;
            const top = tops[i];
            return (
              <g key={lv.label}>
                <rect
                  x={x}
                  y={top}
                  width={lv.size}
                  height={lv.size}
                  fill={`url(#mip-checker-${i})`}
                  stroke={i === 0 ? "var(--accent)" : "var(--border)"}
                  strokeWidth="2"
                />
                <text
                  x={x + lv.size + 12}
                  y={top + lv.size / 2 + 4}
                  fontSize="11"
                  fill={i === 0 ? "var(--accent)" : "var(--text-secondary)"}
                >
                  {lv.label}
                </text>
              </g>
            );
          })}

          {/* —— 右：物体由近到远的轴 —— */}
          <text
            x="470"
            y="30"
            textAnchor="middle"
            fontSize="13"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            按物体远近就近取一级
          </text>

          {/* 近 → 远 竖轴 */}
          <line
            x1="380"
            y1="60"
            x2="380"
            y2="370"
            stroke="var(--accent)"
            strokeWidth="2"
          />
          <path d="M380 370 l-5 -12 l10 0 z" fill="var(--accent)" />
          <text x="392" y="70" fontSize="11" fill="var(--text-primary)">
            近（物体大）
          </text>
          <text x="392" y="366" fontSize="11" fill="var(--text-primary)">
            远（屏幕上才几像素）
          </text>

          {/* 近用大级、远用小级（两条指示） */}
          <line
            x1="180"
            y1="110"
            x2="372"
            y2="100"
            stroke="var(--accent)"
            strokeWidth="1.5"
            strokeDasharray="5 4"
          />
          <text x="410" y="116" fontSize="11" fill="var(--text-secondary)">
            近 → 用大的高清级
          </text>
          <line
            x1="160"
            y1="342"
            x2="372"
            y2="340"
            stroke="var(--accent)"
            strokeWidth="1.5"
            strokeDasharray="5 4"
          />
          <text x="410" y="346" fontSize="11" fill="var(--text-secondary)">
            远 → 用小的低清级
          </text>

          {/* 底部一句话 */}
          <text
            x="320"
            y="404"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            缩小时就近取小级——既不闪烁，又省显存带宽；放大时仍用原图。
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        多级渐远纹理（mipmap）是一摞「逐级减半」的同图副本。物体离得近就用大的清晰级，离得远、在屏幕上只占几个像素时就用小的级——避免远处纹理闪烁，还省显存。`generateMipmap`
        一行就能把这一摞全生成出来。
      </figcaption>
    </figure>
  );
}
