/**
 * <VariableMemoryDiagram>：变量在内存中的布局示意图。
 *
 * 展示 int num = 10、char ch = 'A'、float pi = 3.14 三个变量在栈上的排布，
 * 每一格标变量名、类型、值和所占字节数。
 *
 * Server Component（纯展示，静态 SVG，无交互、无 three、reduced-motion 无关）。
 * token 色（var(--accent) / --border / --bg / --bg-elevated / --text-primary /
 * --text-secondary），无阴影。
 */

interface VarSlot {
  label: string;
  type: string;
  value: string;
  bytes: number;
}

export function VariableMemoryDiagram() {
  const slots: VarSlot[] = [
    { label: "num", type: "int", value: "10", bytes: 4 },
    { label: "ch", type: "char", value: "'A'", bytes: 1 },
    { label: "pi", type: "float", value: "3.14", bytes: 4 },
  ];

  const boxX = 180;
  const boxW = 280;
  const startY = 32;
  const slotH = 48;
  const gap = 8;

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox="0 0 500 260"
          role="img"
          aria-label="变量内存布局示意图：int num=10 占 4 字节、char ch='A' 占 1 字节、float pi=3.14 占 4 字节"
          className="mx-auto block h-auto w-full max-w-[500px]"
        >
          {/* 栈标签 */}
          <text x="60" y="28" fontSize="12" fontWeight="600" fill="var(--text-secondary)">
            栈内存 (stack)
          </text>

          {/* 栈边框 */}
          <rect
            x="80" y="34" width="60" height={slots.length * (slotH + gap) + 16} rx="4"
            fill="var(--bg)" stroke="var(--border)" strokeWidth="1.5"
          />

          {/* 变量盒子 */}
          {slots.map((s, i) => {
            const y = startY + i * (slotH + gap);
            return (
              <g key={s.label}>
                {/* 内存块 */}
                <rect
                  x={boxX} y={y} width={boxW} height={slotH} rx="6"
                  fill="var(--bg)" stroke="var(--accent)" strokeWidth="1.5"
                />
                {/* 变量名 */}
                <text
                  x={boxX + 16} y={y + 20}
                  fontSize="15" fontWeight="700"
                  fill="var(--text-primary)" fontFamily="monospace"
                >
                  {s.label}
                </text>
                {/* 类型标注 */}
                <text
                  x={boxX + 16} y={y + 38}
                  fontSize="11" fill="var(--text-secondary)"
                >
                  {s.type}（{s.bytes} 字节）
                </text>
                {/* 值 */}
                <text
                  x={boxX + boxW - 16} y={y + 20}
                  textAnchor="end" fontSize="15" fontWeight="600"
                  fill="var(--accent)" fontFamily="monospace"
                >
                  = {s.value}
                </text>
                {/* 字节标注条 */}
                <rect
                  x={boxX} y={y + slotH - 6} width={s.bytes / Math.max(...slots.map(x => x.bytes)) * boxW * 0.55} height="4"
                  rx="2" fill="var(--accent)" opacity="0.35"
                />
                {/* 连接线：变量名 → 栈 */}
                <line
                  x1="140" y1={y + slotH / 2} x2={boxX - 4} y2={y + slotH / 2}
                  stroke="var(--border)" strokeWidth="1" strokeDasharray="3 2"
                />
              </g>
            );
          })}

          {/* 底部说明 */}
          <text x="180" y={startY + slots.length * (slotH + gap) + 24} fontSize="11" fill="var(--text-secondary)">
            每个变量在栈上占用一段连续的内存空间。int 和 float 通常占 4 字节，char 占 1 字节。
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        C 程序运行时，局部变量分配在栈（stack）上。不同类型占用的字节数不同：
        int 4 字节、float 4 字节、char 1 字节。变量名只是这块内存的"标签"。
      </figcaption>
    </figure>
  );
}
