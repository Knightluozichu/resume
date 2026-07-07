/**
 * <ListMemoryLayout>：List<T>内部数组内存布局图解
 * 展示List动态扩容机制：初始容量→填满→扩容2倍→复制
 */

const VIEW_W = 760;
const VIEW_H = 340;

export function ListMemoryLayout() {
  const arr = (items: (string | null)[], startX: number, y: number, label: string, highlight?: number) => (
    <g>
      <text x={startX} y={y - 12} fill="var(--text-secondary)" fontSize="12" fontFamily="system-ui">{label}</text>
      {items.map((item, i) => {
        const x = startX + i * 56;
        const isEmpty = item === null;
        const isHL = highlight === i;
        return (
          <g key={i}>
            <rect
              x={x}
              y={y}
              width={52}
              height={44}
              fill={isHL ? "var(--accent)" : isEmpty ? "var(--bg)" : "var(--bg-elevated)"}
              fillOpacity={isHL ? 0.2 : 1}
              stroke={isHL ? "var(--accent)" : "var(--border)"}
              strokeWidth={isHL ? 2 : 1}
              rx="4"
            />
            <text
              x={x + 26}
              y={y + 26}
              textAnchor="middle"
              fill={isEmpty ? "var(--text-secondary)" : "var(--text-primary)"}
              fontSize="13"
              fontFamily="JetBrains Mono, monospace"
            >
              {item ?? "空"}
            </text>
            <text x={x + 26} y={y + 56} textAnchor="middle" fill="var(--text-secondary)" fontSize="10" fontFamily="Inter">
              [{i}]
            </text>
          </g>
        );
      })}
    </g>
  );

  return (
    <div className="my-8 w-full overflow-x-auto">
      <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} className="mx-auto w-full max-w-[760px]" style={{ minWidth: 560 }}>
        <rect x="0" y="0" width={VIEW_W} height={VIEW_H} fill="var(--bg-elevated)" rx="12" />
        <text x={VIEW_W / 2} y={32} textAnchor="middle" fill="var(--text-primary)" fontSize="16" fontWeight="600" fontFamily="system-ui">
          List&lt;T&gt; 动态扩容过程
        </text>

        {/* Step 1: 初始 */}
        {arr(["A", "B", "C", null], 60, 70, "① 初始容量=4，已用3个")}

        {/* Arrow */}
        <path d="M 300 135 L 300 160" stroke="var(--accent)" strokeWidth="2" fill="none" markerEnd="url(#list-arrow)" />
        <text x={310} y={152} fill="var(--accent)" fontSize="11" fontFamily="system-ui">Add(D)</text>

        {/* Step 2: 满了 */}
        {arr(["A", "B", "C", "D"], 60, 170, "② 容量=4，已填满")}

        {/* Arrow */}
        <path d="M 300 235 L 300 260" stroke="var(--warning)" strokeWidth="2" fill="none" markerEnd="url(#list-arrow2)" />
        <text x={310} y={252} fill="var(--warning)" fontSize="11" fontFamily="system-ui">Add(E) → 扩容2倍！</text>

        {/* Step 3: 扩容 */}
        {arr(["A", "B", "C", "D", "E", null, null, null], 60, 270, "③ 新容量=8，复制旧数据，添加E", 4)}

        <defs>
          <marker id="list-arrow" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
            <polygon points="0 0, 8 3, 0 6" fill="var(--accent)" />
          </marker>
          <marker id="list-arrow2" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
            <polygon points="0 0, 8 3, 0 6" fill="var(--warning)" />
          </marker>
        </defs>

        {/* 提示 */}
        <CalloutBox x={520} y={70} color="var(--warning)" title="扩容代价">
          每次扩容需要：
          ① 申请2倍新数组
          ② Array.Copy复制
          ③ 旧数组等待GC
          → 预判容量可避免
        </CalloutBox>
      </svg>
    </div>
  );
}

function CalloutBox({ x, y, color, title, children }: { x: number; y: number; color: string; title: string; children: React.ReactNode }) {
  return (
    <g>
      <rect x={x} y={y} width={200} height={110} fill="var(--bg)" stroke={color} strokeWidth="1" rx="6" />
      <rect x={x} y={y} width={4} height={110} fill={color} rx="2" />
      <text x={x + 14} y={y + 22} fill={color} fontSize="12" fontWeight="600" fontFamily="system-ui">{title}</text>
      <text x={x + 14} y={y + 42} fill="var(--text-secondary)" fontSize="11" fontFamily="system-ui">
        <tspan x={x + 14} dy="0">{children?.toString().split("\n")[0]}</tspan>
        <tspan x={x + 14} dy="16">{children?.toString().split("\n")[1]}</tspan>
        <tspan x={x + 14} dy="16">{children?.toString().split("\n")[2]}</tspan>
        <tspan x={x + 14} dy="16">{children?.toString().split("\n")[3]}</tspan>
      </text>
    </g>
  );
}
