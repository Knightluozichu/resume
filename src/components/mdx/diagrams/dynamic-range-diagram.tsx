/**
 * <DynamicRangeDiagram>：「高级光照·HDR」C 实战型章的核心概念图（HEL-86）。
 *
 * 一条从暗(0)到极亮(远超 1)的强度轴，把「普通 [0,1] 帧缓冲截断高光」与「HDR 浮点帧缓冲保住高光」
 * 一眼说清：
 *  - 上排（普通 LDR 帧缓冲，RGBA8 每通道只存 0..1）：强度轴超过 1 的整段被「全压成纯白」——
 *    >1 的层次信息在这里就丢了，画面表现为「死白一片、看不出层次」（var(--danger) 标丢失区）。
 *  - 下排（HDR 浮点帧缓冲，RGBA16F 能存 >1）：同一条强度轴 0..6 被完整存下，高光区仍有层次，
 *    留待后面的色调映射再压回可显示范围（var(--accent) 标保留区）。
 *
 * 横轴 = 场景光强 0..6（0=暗、1=普通帧缓冲上限、6=一扇极亮的窗），用渐变条 + 刻度示意。
 *
 * Server Component（纯展示，静态 SVG，无交互、无 three、reduced-motion 无关）。
 * 视觉语言与既有 diagram 一致：token 色（var(--accent)/--danger/--border/--bg-elevated/
 * --text-primary/--text-secondary）。灰阶渐变格本质是数据可视化（呈现「强度→亮度」观感与截断），
 * 是其语义本体、非装饰魔法色，故不套 token（与 gamma-gradient-bar / aliasing 等灰阶示意图同理）。
 * 无阴影、rx 圆角、无裸 hex（硬规则 5）。
 */

const X0 = 60;
const BAR_W = 360;
const STEPS = 24; // 渐变条等距台阶数
const MAX_INTENSITY = 6; // 强度轴右端：一扇「极亮的窗」≈6
const LDR_Y = 64;
const HDR_Y = 150;
const BAR_H = 40;

export function DynamicRangeDiagram() {
  const cellW = BAR_W / STEPS;
  // 强度→显示字节：先 min(强度,clampMax) 压到 [0,1]，再当 sRGB 灰点亮（仅为「肉眼观感」示意，非精确）。
  const cell = (i: number, clampMax: number) => {
    const intensity = ((i + 0.5) / STEPS) * MAX_INTENSITY; // 该格场景光强 0..6
    const shown = Math.min(intensity, clampMax); // LDR clampMax=1（>1 全压白）；HDR clampMax=6（保留）
    const g = Math.round(Math.min(shown, 1) * 255);
    return { intensity, g };
  };

  const ldrCells: React.ReactNode[] = [];
  const hdrCells: React.ReactNode[] = [];
  for (let i = 0; i < STEPS; i++) {
    const ldr = cell(i, 1);
    const hdr = cell(i, MAX_INTENSITY);
    ldrCells.push(
      <rect
        key={`l${i}`}
        x={X0 + i * cellW}
        y={LDR_Y}
        width={cellW + 0.5}
        height={BAR_H}
        fill={`rgb(${ldr.g},${ldr.g},${ldr.g})`}
      />,
    );
    // HDR 下排把「真实强度」按比例映到 0..255 仅作示意（>1 区仍有层次而非全白）
    const hg = Math.round(
      (Math.min(hdr.intensity, MAX_INTENSITY) / MAX_INTENSITY) * 255,
    );
    hdrCells.push(
      <rect
        key={`h${i}`}
        x={X0 + i * cellW}
        y={HDR_Y}
        width={cellW + 0.5}
        height={BAR_H}
        fill={`rgb(${hg},${hg},${hg})`}
      />,
    );
  }

  // 强度 = 1 在横轴上的位置（普通帧缓冲的上限、截断起点）
  const oneX = X0 + (1 / MAX_INTENSITY) * BAR_W;

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated">
        <svg
          viewBox="0 0 480 230"
          role="img"
          aria-label="动态范围截断对照图。横轴是场景光强，从 0 到 6，其中 1 是普通帧缓冲每通道能存的上限。上排是普通 LDR 帧缓冲：光强超过 1 的整段全被压成纯白，大于 1 的高光层次在写入时就丢失了，表现为死白一片。下排是 HDR 浮点帧缓冲 RGBA16F：同一条强度轴从 0 到 6 被完整存下，高光区仍保留层次，留给后面的色调映射压回可显示范围。"
          className="mx-auto block h-auto w-full max-w-[480px]"
        >
          <text
            x="240"
            y="24"
            textAnchor="middle"
            fontSize="13"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            同一条强度轴：截断 vs 保留
          </text>

          {/* 强度 = 1 处的竖直分界虚线（贯穿两排） */}
          <line
            x1={oneX}
            y1={LDR_Y - 14}
            x2={oneX}
            y2={HDR_Y + BAR_H + 6}
            stroke="var(--border)"
            strokeWidth="1"
            strokeDasharray="3 3"
            opacity="0.7"
          />
          <text
            x={oneX}
            y={LDR_Y - 18}
            textAnchor="middle"
            fontSize="9"
            fill="var(--text-secondary)"
          >
            强度=1（普通帧缓冲上限）
          </text>

          {/* —— 上排：普通 LDR 帧缓冲 —— */}
          <text
            x={X0}
            y={LDR_Y - 6}
            textAnchor="start"
            fontSize="10"
            fill="var(--danger)"
          >
            普通帧缓冲（RGBA8，每通道只存 0~1）
          </text>
          {ldrCells}
          <rect
            x={X0}
            y={LDR_Y}
            width={BAR_W}
            height={BAR_H}
            fill="none"
            stroke="var(--border)"
            strokeWidth="1"
          />
          {/* 截断区高亮框（强度 1..6 全压白 = 丢失） */}
          <rect
            x={oneX}
            y={LDR_Y}
            width={X0 + BAR_W - oneX}
            height={BAR_H}
            fill="none"
            stroke="var(--danger)"
            strokeWidth="1.5"
          />
          <text
            x={(oneX + X0 + BAR_W) / 2}
            y={LDR_Y + BAR_H + 13}
            textAnchor="middle"
            fontSize="9"
            fill="var(--danger)"
          >
            &gt;1 全压成纯白·层次丢失
          </text>

          {/* —— 下排：HDR 浮点帧缓冲 —— */}
          <text
            x={X0}
            y={HDR_Y - 6}
            textAnchor="start"
            fontSize="10"
            fill="var(--accent)"
          >
            HDR 浮点帧缓冲（RGBA16F，能存 &gt;1）
          </text>
          {hdrCells}
          <rect
            x={X0}
            y={HDR_Y}
            width={BAR_W}
            height={BAR_H}
            fill="none"
            stroke="var(--accent)"
            strokeWidth="1.5"
          />
          <text
            x={(oneX + X0 + BAR_W) / 2}
            y={HDR_Y + BAR_H + 13}
            textAnchor="middle"
            fontSize="9"
            fill="var(--accent)"
          >
            &gt;1 完整存下·高光仍有层次
          </text>

          {/* 横轴刻度 0 / 1 / 6 */}
          <text
            x={X0}
            y={HDR_Y + BAR_H + 28}
            textAnchor="start"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            0 暗
          </text>
          <text
            x={X0 + BAR_W}
            y={HDR_Y + BAR_H + 28}
            textAnchor="end"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            6 极亮的窗 →
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        上排<strong>普通帧缓冲</strong>每通道只存 <code>[0,1]</code>，光强
        <strong>超过 1 的整段全被压成纯白</strong>——高光层次在写入时就丢了；下排
        <strong>HDR 浮点帧缓冲</strong>把 <code>&gt;1</code>{" "}
        的范围完整存下，高光仍有层次，留给色调映射再压回来。
      </figcaption>
    </figure>
  );
}
