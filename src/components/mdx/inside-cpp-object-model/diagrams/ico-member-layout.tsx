/**
 * <IcoMemberLayoutDiagram>：数据成员内存布局与对齐（数据成员章）。
 *
 * 上半部展示一个含 char/int/double 的结构体的内存布局，标出 padding：
 *   - char c   (1B) + padding(3B)
 *   - int i    (4B)
 *   - double d (8B)
 *   - 总大小 16B（按 8 对齐）
 * 下半部展示空类大小为 1B（保证不同对象地址唯一），以及位域紧凑布局。
 *
 * 纯静态展示，无交互。纯服务端组件，无客户端指令。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * viewBox 720×500（宽 ≥720），四周留白 ≥32，字号 ≥11。
 */

const VIEW_W = 720;
const VIEW_H = 500;

const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const accent = "var(--accent)";
const success = "var(--success)";
const warning = "var(--warning)";
const danger = "var(--danger)";
const border = "var(--border)";

interface Cell {
  label: string;
  bytes: number;
  kind: "data" | "pad";
  color: string;
}

// 按比例：每字节 22px 宽
const PX_PER_BYTE = 22;
const CELL_H = 56;
const LAYOUT_Y = 96;
const LAYOUT_X = 60;

const CELLS: readonly Cell[] = [
  { label: "char c", bytes: 1, kind: "data", color: accent },
  { label: "pad", bytes: 3, kind: "pad", color: danger },
  { label: "int i", bytes: 4, kind: "data", color: success },
  { label: "double d", bytes: 8, kind: "data", color: warning },
];

export function IcoMemberLayoutDiagram() {
  // 累加器：算出每个成员格子的起始 x 坐标
  const xs: number[] = [];
  let acc = 0;
  CELLS.forEach((c, i) => {
    xs[i] = LAYOUT_X + acc * PX_PER_BYTE;
    acc += c.bytes;
  });

  const totalBytes = CELLS.reduce((a, c) => a + c.bytes, 0);
  const totalW = totalBytes * PX_PER_BYTE;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="数据成员内存布局图。上半部展示含 char、int、double 的结构体内存：char 占 1 字节后跟 3 字节 padding，int 占 4 字节，double 占 8 字节，总大小 16 字节按 8 对齐。下半部展示空类大小为 1 字节，以及位域紧凑布局。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* 主标题 */}
          <text x={VIEW_W / 2} y={34} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            数据成员内存布局与对齐
          </text>
          <text x={VIEW_W / 2} y={56} textAnchor="middle" fontSize="11" fill={secondary}>
            struct {`{ char c; int i; double d; }`} → 16 字节，对齐到最大成员 double 的 8 字节边界
          </text>

          {/* 字节刻度轴 */}
          <text x={LAYOUT_X} y={84} fontSize="11" fill={secondary} fontFamily="monospace">偏移</text>
          {Array.from({ length: totalBytes + 1 }).map((_, i) => (
            <text key={`tick-${i}`} x={LAYOUT_X + i * PX_PER_BYTE} y={84} textAnchor="middle" fontSize="10" fill={secondary} fontFamily="monospace">
              {i}
            </text>
          ))}

          {/* 内存格子 */}
          {CELLS.map((c, i) => {
            const w = c.bytes * PX_PER_BYTE;
            const x = xs[i];
            return (
              <g key={c.label}>
                <rect x={x} y={LAYOUT_Y} width={w} height={CELL_H} rx="4" fill={c.color} fillOpacity={c.kind === "pad" ? "0.04" : "0.10"} stroke={c.color} strokeWidth="1.5" strokeDasharray={c.kind === "pad" ? "3 3" : undefined} />
                <text x={x + w / 2} y={LAYOUT_Y + CELL_H / 2} textAnchor="middle" fontSize="11.5" fontWeight={c.kind === "data" ? "700" : "400"} fill={c.kind === "pad" ? secondary : primary} fontFamily="monospace">
                  {c.label}
                </text>
                <text x={x + w / 2} y={LAYOUT_Y + CELL_H + 16} textAnchor="middle" fontSize="10" fill={secondary} fontFamily="monospace">
                  {c.bytes}B
                </text>
              </g>
            );
          })}

          {/* 总大小标注 */}
          <line x1={LAYOUT_X} y1={LAYOUT_Y + CELL_H + 28} x2={LAYOUT_X + totalW} y2={LAYOUT_Y + CELL_H + 28} stroke={accent} strokeWidth="1.6" />
          <text x={LAYOUT_X + totalW / 2} y={LAYOUT_Y + CELL_H + 46} textAnchor="middle" fontSize="12" fontWeight="700" fill={accent}>
            sizeof = {totalBytes} 字节（已含 3B padding）
          </text>

          {/* 下半部：空类与位域 */}
          <line x1={32} y1={262} x2={VIEW_W - 32} y2={262} stroke={border} strokeWidth="1" strokeDasharray="4 3" />

          {/* 空类 */}
          <text x={120} y={290} textAnchor="middle" fontSize="13" fontWeight="700" fill={accent}>空类 Empty {`{}`}</text>
          <rect x={92} y={300} width={56} height={CELL_H} rx="4" fill={accent} fillOpacity="0.10" stroke={accent} strokeWidth="1.5" />
          <text x={120} y={300 + CELL_H / 2} textAnchor="middle" fontSize="11" fontWeight="700" fill={primary} fontFamily="monospace">1B</text>
          <text x={120} y={378} textAnchor="middle" fontSize="11" fill={secondary}>空类大小为 1，</text>
          <text x={120} y={394} textAnchor="middle" fontSize="11" fill={secondary}>保证不同对象地址唯一</text>

          {/* 含静态成员的类（静态不计入对象大小） */}
          <text x={300} y={290} textAnchor="middle" fontSize="13" fontWeight="700" fill={success}>含静态成员</text>
          <rect x={252} y={300} width={96} height={CELL_H} rx="4" fill={success} fillOpacity="0.08" stroke={success} strokeWidth="1.5" />
          <text x={300} y={300 + CELL_H / 2} textAnchor="middle" fontSize="11" fontWeight="700" fill={primary} fontFamily="monospace">仅非静</text>
          <text x={300} y={378} textAnchor="middle" fontSize="11" fill={secondary}>静态成员存于全局，</text>
          <text x={300} y={394} textAnchor="middle" fontSize="11" fill={secondary}>不计入对象 sizeof</text>

          {/* 位域 */}
          <text x={520} y={290} textAnchor="middle" fontSize="13" fontWeight="700" fill={warning}>位域 BitField</text>
          <g>
            <rect x={448} y={300} width={24} height={CELL_H} rx="2" fill={warning} fillOpacity="0.10" stroke={warning} strokeWidth="1.4" />
            <rect x={472} y={300} width={24} height={CELL_H} rx="2" fill={warning} fillOpacity="0.06" stroke={warning} strokeWidth="1.4" />
            <rect x={496} y={300} width={72} height={CELL_H} rx="2" fill={warning} fillOpacity="0.10" stroke={warning} strokeWidth="1.4" />
            <text x={460} y={332} textAnchor="middle" fontSize="10" fill={primary} fontFamily="monospace">a:3</text>
            <text x={484} y={332} textAnchor="middle" fontSize="10" fill={primary} fontFamily="monospace">b:3</text>
            <text x={532} y={332} textAnchor="middle" fontSize="10" fill={primary} fontFamily="monospace">c:2</text>
          </g>
          <text x={520} y={378} textAnchor="middle" fontSize="11" fill={secondary}>位域把多个小字段</text>
          <text x={520} y={394} textAnchor="middle" fontSize="11" fill={secondary}>压进一个字节</text>

          {/* 底部总结 */}
          <line x1={32} y1={424} x2={VIEW_W - 32} y2={424} stroke={border} strokeWidth="1" strokeDasharray="4 3" />
          <text x={VIEW_W / 2} y={448} textAnchor="middle" fontSize="12" fontWeight="600" fill={primary}>
            对齐 = 编译器在成员间插入 padding，让每个成员落在自身对齐边界上
          </text>
          <text x={VIEW_W / 2} y={468} textAnchor="middle" fontSize="11" fill={secondary}>
            调整成员声明顺序（大→小）可压缩 padding、减小 sizeof
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        结构体大小 = 成员占用 + 编译器插入的 padding，整体对齐到最大成员的对齐值；空类占 1 字节、静态成员与位域各自有特殊规则。
      </figcaption>
    </figure>
  );
}
