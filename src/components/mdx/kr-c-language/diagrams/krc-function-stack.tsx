/**
 * <KrcFunctionStackDiagram>：函数调用栈帧结构。
 *
 * 展示函数调用时栈帧的内存布局（栈从高地址向低地址增长）：
 *   - 参数区（从右到左压栈）
 *   - 返回地址
 *   - 保存的帧指针
 *   - 局部变量区
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * viewBox 720×460，四周留白 ≥32，字号 ≥11。
 */

const VIEW_W = 720;
const VIEW_H = 460;

interface StackSlot {
  label: string;
  value: string;
  color: string;
  note: string;
}

// 栈从上（高地址）到下（低地址）
const SLOTS: readonly StackSlot[] = [
  { label: "调用者的栈帧", value: "...", color: "var(--text-secondary)", note: "上一帧" },
  { label: "参数 N (最后一个参数)", value: "arg_n", color: "var(--accent)", note: "最先进栈" },
  { label: "参数 1 (第一个参数)", value: "arg_1", color: "var(--accent)", note: "C 调用约定：参数从右往左压栈" },
  { label: "返回地址", value: "ret addr", color: "var(--warning)", note: "call 指令自动压入" },
  { label: "保存的帧指针", value: "saved rbp", color: "var(--success)", note: "push rbp; mov rbp,rsp" },
  { label: "局部变量 b", value: "int b", color: "var(--accent)", note: "局部变量在 rbp 之下" },
  { label: "局部变量 a", value: "int a", color: "var(--accent)", note: "紧邻帧指针" },
];

const SLOT_H = 38;
const SLOT_GAP = 4;
const SLOT_START_Y = 96;
const slotY = (i: number) => SLOT_START_Y + i * (SLOT_H + SLOT_GAP);

const SLOT_X = 120;
const SLOT_W = 340;
const ADDR_X = 50;
const NOTE_X = 480;

export function KrcFunctionStackDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="函数调用栈帧结构。从高地址到低地址依次：调用者栈帧、参数区（从右到左压栈）、返回地址、保存的帧指针、局部变量区。栈从高地址向低地址增长。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* 主标题 */}
          <text x={VIEW_W / 2} y={36} textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            函数调用 · 栈帧布局
          </text>
          <text x={VIEW_W / 2} y={58} textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            栈从高地址向低地址增长；每调用一个函数，在栈顶分配一个栈帧
          </text>

          {/* 地址轴标注 */}
          <text x={ADDR_X} y={SLOT_START_Y - 6} fontSize="11" fontWeight="700" fill="var(--accent)">地址</text>
          <text x={SLOT_X} y={SLOT_START_Y - 6} fontSize="11" fontWeight="700" fill="var(--accent)">栈帧内容</text>
          <text x={NOTE_X} y={SLOT_START_Y - 6} fontSize="11" fontWeight="700" fill="var(--accent)">说明</text>

          {/* 栈增长方向箭头 */}
          <line x1={ADDR_X - 8} y1={SLOT_START_Y + 10} x2={ADDR_X - 8} y2={slotY(SLOTS.length - 1) + SLOT_H / 2} stroke="var(--text-secondary)" strokeWidth="1.2" markerEnd="url(#krc-stk-arrow)" />
          <defs>
            <marker id="krc-stk-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 z" fill="var(--text-secondary)" />
            </marker>
          </defs>
          <text x={ADDR_X - 18} y={SLOT_START_Y + SLOT_H} fontSize="11" fill="var(--text-secondary)" transform={`rotate(-90 ${ADDR_X - 18} ${SLOT_START_Y + SLOT_H})`}>低地址↓</text>

          {/* 栈帧槽位 */}
          {SLOTS.map((s, i) => {
            const y = slotY(i);
            const isCaller = i === 0;
            const addrLabel = i === 0 ? "高地址" : `0x...${(SLOTS.length - i).toString(16)}0`;
            return (
              <g key={i}>
                <rect
                  x={SLOT_X}
                  y={y}
                  width={SLOT_W}
                  height={SLOT_H}
                  rx="6"
                  fill={s.color}
                  fillOpacity={isCaller ? 0.03 : 0.06}
                  stroke={s.color}
                  strokeWidth="1.2"
                  strokeOpacity={isCaller ? 0.3 : 0.5}
                  strokeDasharray={isCaller ? "4 3" : undefined}
                />
                <text x={SLOT_X + 14} y={y + 16} fontSize="12" fontWeight="600" fill="var(--text-primary)" fontFamily="monospace">
                  {s.label}
                </text>
                <text x={SLOT_X + 14} y={y + 32} fontSize="11" fill="var(--text-secondary)" fontFamily="monospace">
                  {s.value}
                </text>
                <text x={ADDR_X} y={y + SLOT_H / 2 + 4} fontSize="11" fill="var(--text-secondary)" fontFamily="monospace" textAnchor="start">
                  {addrLabel}
                </text>
                <text x={NOTE_X} y={y + SLOT_H / 2 + 4} fontSize="11" fill="var(--text-secondary)">
                  {s.note}
                </text>
              </g>
            );
          })}

          {/* 帧指针标注 */}
          {(() => {
            const rbpY = slotY(4) + SLOT_H;
            return (
              <g>
                <line x1={SLOT_X} y1={rbpY} x2={SLOT_X - 10} y2={rbpY} stroke="var(--success)" strokeWidth="1.5" />
                <text x={SLOT_X - 14} y={rbpY + 4} textAnchor="end" fontSize="11" fontWeight="600" fill="var(--success)" fontFamily="monospace">rbp →</text>
              </g>
            );
          })()}

          {/* 底部说明 */}
          <line x1={32} y1={410} x2={VIEW_W - 32} y2={410} stroke="var(--border)" strokeWidth="1" strokeDasharray="4 3" />
          <text x={32} y={432} fontSize="11" fill="var(--text-secondary)">
            栈帧 = 函数的一次调用在栈上占用的内存块。函数返回时，整个栈帧被释放（移动栈顶指针即可，无需逐个清理）。
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        函数调用栈帧布局。参数从右往左压栈，返回地址与帧指针由 call/prologue 自动处理，局部变量位于帧指针下方。函数返回时整个栈帧一次性释放。
      </figcaption>
    </figure>
  );
}
