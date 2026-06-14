/**
 * <BufferSubDataDiagram>：「高级数据」§3「glBufferData 全量 vs glBufferSubData 局部更新」掰碎图
 * （HEL-73，C 实战型）。
 *
 * 上下两条同一块缓冲，对照「重建整块 vs 只补中间一段」：
 *  ①上层 glBufferData：整条缓冲全部重新上传（整条高亮），开销随整块大小。
 *  ②下层 glBufferSubData(offset, size, data)：缓冲已存在、只覆盖 [offset, offset+size) 中间一段
 *    （只该段高亮、其余保持原样），用一条带箭头的区间标 offset 起点与 size 长度。
 *
 * 一句话语义：数据只有一小段变化时，别每帧 glBufferData 重传整块；用 glBufferSubData 原地补那一段。
 *
 * Server Component（纯展示，静态 SVG，无交互、无 three、reduced-motion 无关）。
 * 视觉语言与既有 diagram 一致：token 色，无阴影、rx 圆角、无裸 hex（硬规则 5）。
 */

// 缓冲格子的统一画法
function Slot({
  x,
  y,
  w,
  active,
}: {
  x: number | string;
  y: number | string;
  w: number | string;
  active: boolean;
}) {
  return (
    <rect
      x={x}
      y={y}
      width={w}
      height="40"
      fill={active ? "var(--accent)" : "var(--bg)"}
      opacity={active ? "0.4" : "1"}
      stroke={active ? "var(--accent)" : "var(--border)"}
      strokeWidth={active ? "2" : "1.5"}
    />
  );
}

export function BufferSubDataDiagram() {
  // 8 格缓冲，每格宽 56，从 x=88 起
  const slotW = 56;
  const startX = 88;
  const slots = [0, 1, 2, 3, 4, 5, 6, 7];
  // glBufferSubData 只更新中间第 3、4、5 格（索引 2、3、4）
  const subFrom = 2;
  const subTo = 4;

  return (
    <figure className="mdx-figure mx-auto my-4">
      <div className="overflow-hidden rounded-card border border-border bg-elevated">
        <svg
          viewBox="0 0 560 280"
          role="img"
          aria-label="glBufferData 全量上传与 glBufferSubData 局部更新对照图。上面一条缓冲演示 glBufferData：整条缓冲的所有格子全部被重新上传、全部高亮，开销随整块大小。下面同一条缓冲演示 glBufferSubData：缓冲已经存在，只有中间一小段（这里是第 3 到第 5 格）被覆盖更新、只这一段高亮，其余格子保持原样不动。下面那条用一个带双向箭头的区间标出：更新从偏移 offset 处开始、长度为 size。结论是：当只有一小段数据变化时，不要每帧用 glBufferData 重传整块，应该用 glBufferSubData 原地补那一段。"
          className="mx-auto block h-auto w-full max-w-[560px]"
        >
          {/* ============ 上层：glBufferData 全量 ============ */}
          <text
            x="280"
            y="30"
            textAnchor="middle"
            fontSize="13"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            glBufferData：整条缓冲全部重新上传
          </text>
          {slots.map((i) => (
            <Slot
              key={`d-${i}`}
              x={startX + i * slotW}
              y="48"
              w={slotW - 6}
              active
            />
          ))}
          <text
            x="280"
            y="112"
            textAnchor="middle"
            fontSize="10.5"
            fill="var(--warning)"
          >
            整块重建（即使只有一格变了，也全传一遍）
          </text>

          {/* 分隔线 */}
          <line
            x1="40"
            y1="134"
            x2="520"
            y2="134"
            stroke="var(--border)"
            strokeWidth="1"
            strokeDasharray="3 3"
          />

          {/* ============ 下层：glBufferSubData 局部 ============ */}
          <text
            x="280"
            y="162"
            textAnchor="middle"
            fontSize="13"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            glBufferSubData：只覆盖中间一段（其余不动）
          </text>
          {slots.map((i) => (
            <Slot
              key={`s-${i}`}
              x={startX + i * slotW}
              y="180"
              w={slotW - 6}
              active={i >= subFrom && i <= subTo}
            />
          ))}

          {/* offset 起点标注 */}
          <line
            x1={startX + subFrom * slotW}
            y1="224"
            x2={startX + subFrom * slotW}
            y2="234"
            stroke="var(--accent)"
            strokeWidth="1.5"
          />
          <text
            x={startX + subFrom * slotW}
            y="248"
            textAnchor="middle"
            fontSize="10"
            fontFamily="monospace"
            fill="var(--accent)"
          >
            offset 起点
          </text>

          {/* size 区间双向箭头 */}
          <line
            x1={startX + subFrom * slotW + 2}
            y1="266"
            x2={startX + (subTo + 1) * slotW - 8}
            y2="266"
            stroke="var(--accent)"
            strokeWidth="2"
          />
          <path
            d={`M${startX + subFrom * slotW + 2} 266 l12 -6 l0 12 z`}
            fill="var(--accent)"
          />
          <path
            d={`M${startX + (subTo + 1) * slotW - 8} 266 l-12 -6 l0 12 z`}
            fill="var(--accent)"
          />
          <text
            x={(startX + subFrom * slotW + startX + (subTo + 1) * slotW) / 2}
            y="262"
            textAnchor="middle"
            fontSize="10"
            fontFamily="monospace"
            fill="var(--accent)"
          >
            size 长度
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        <code>glBufferData</code> <strong>整块重建</strong>整条缓冲；
        <code>glBufferSubData(offset, size, data)</code> 在已存在的缓冲上
        <strong>只覆盖</strong>从 <code>offset</code> 起、长 <code>size</code>{" "}
        的那一段，其余字节保持原样——只有一小段变时用它，别每帧重传整块。
      </figcaption>
    </figure>
  );
}
