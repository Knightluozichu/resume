/**
 * <BoxingUnboxingDiagram>：装箱/拆箱内存对比图解
 * 展示值类型→引用类型（装箱）和引用类型→值类型（拆箱）的内存拷贝过程
 */

const BOX_W = 160;
const BOX_H = 60;

interface MemBlockProps {
  x: number;
  y: number;
  label: string;
  sub?: string;
  color: string;
  isStack?: boolean;
}

function MemBlock({ x, y, label, sub, color, isStack = false }: MemBlockProps) {
  return (
    <g>
      <rect x={x} y={y} width={BOX_W} height={BOX_H} fill="var(--bg)" stroke={color} strokeWidth={2} rx={4} />
      {isStack ? (
        <>
          <text x={x + BOX_W / 2} y={y + 22} textAnchor="middle" fill={color} fontSize={12} fontWeight={600} fontFamily="system-ui">{label}</text>
          {sub && <text x={x + BOX_W / 2} y={y + 42} textAnchor="middle" fill="var(--text-secondary)" fontSize={11} fontFamily="JetBrains Mono, monospace">{sub}</text>}
        </>
      ) : (
        <>
          <rect x={x} y={y} width={BOX_W} height={8} fill={color} opacity={0.3} rx={4} />
          <text x={x + BOX_W / 2} y={y + 28} textAnchor="middle" fill={color} fontSize={12} fontWeight={600} fontFamily="system-ui">{label}</text>
          {sub && <text x={x + BOX_W / 2} y={y + 48} textAnchor="middle" fill="var(--text-secondary)" fontSize={11} fontFamily="JetBrains Mono, monospace">{sub}</text>}
        </>
      )}
    </g>
  );
}

export function BoxingUnboxingDiagram() {
  return (
    <div className="my-8 w-full overflow-x-auto">
      <svg viewBox="0 0 760 380" className="mx-auto w-full max-w-[760px]" style={{ minWidth: 560 }}>
        <rect x={0} y={0} width={760} height={380} fill="var(--bg-elevated)" rx={12} />
        <text x={380} y={32} textAnchor="middle" fill="var(--text-primary)" fontSize={16} fontWeight={600} fontFamily="system-ui">
          装箱（Boxing）与拆箱（Unboxing）的内存代价
        </text>

        {/* 栈区域 */}
        <rect x={30} y={60} width={320} height={290} fill="var(--bg)" stroke="var(--border)" rx={8} strokeDasharray="4 4" />
        <text x={190} y={85} textAnchor="middle" fill="var(--accent)" fontSize={13} fontWeight={600} fontFamily="system-ui">栈 Stack（值类型直接存储）</text>

        {/* 堆区域 */}
        <rect x={410} y={60} width={320} height={290} fill="var(--bg)" stroke="var(--border)" rx={8} strokeDasharray="4 4" />
        <text x={570} y={85} textAnchor="middle" fill="var(--danger)" fontSize={13} fontWeight={600} fontFamily="system-ui">堆 Heap（引用类型+装箱对象）</text>

        {/* 装箱过程 */}
        <text x={190} y={120} textAnchor="middle" fill="var(--text-secondary)" fontSize={11} fontFamily="system-ui">int i = 123;（值类型在栈上）</text>
        <MemBlock x={110} y={130} label="i = 123" sub="System.Int32" color="var(--accent)" isStack />

        <path d="M 270 160 Q 350 160 410 200" stroke="var(--warning)" strokeWidth={2} fill="none" markerEnd="url(#box-arrow)" />
        <text x={340} y={155} fill="var(--warning)" fontSize={11} fontWeight={600} fontFamily="system-ui">装箱 object o = i;</text>

        <text x={570} y={175} textAnchor="middle" fill="var(--text-secondary)" fontSize={11} fontFamily="system-ui">堆上分配新对象 + 数据拷贝</text>
        <MemBlock x={490} y={185} label="(object)123" sub="含对象头+方法表" color="var(--danger)" />

        {/* 引用 */}
        <MemBlock x={110} y={240} label="o → 引用" sub="指向堆地址" color="var(--warning)" isStack />
        <path d="M 270 260 Q 350 240 490 215" stroke="var(--warning)" strokeWidth={1.5} fill="none" strokeDasharray="4 3" markerEnd="url(#box-arrow)" />

        {/* 拆箱 */}
        <path d="M 490 245 Q 350 290 270 300" stroke="var(--success)" strokeWidth={2} fill="none" markerEnd="url(#unbox-arrow)" />
        <text x={340} y={295} fill="var(--success)" fontSize={11} fontWeight={600} fontFamily="system-ui">拆箱 int j = (int)o;</text>

        <text x={190} y={330} textAnchor="middle" fill="var(--text-secondary)" fontSize={11} fontFamily="system-ui">检查类型 + 数据拷贝回栈</text>
        <MemBlock x={110} y={290} label="j = 123" sub="System.Int32" color="var(--success)" isStack />

        <defs>
          <marker id="box-arrow" markerWidth={8} markerHeight={6} refX={8} refY={3} orient="auto">
            <polygon points="0 0, 8 3, 0 6" fill="var(--warning)" />
          </marker>
          <marker id="unbox-arrow" markerWidth={8} markerHeight={6} refX={8} refY={3} orient="auto">
            <polygon points="0 0, 8 3, 0 6" fill="var(--success)" />
          </marker>
        </defs>

        {/* 代价说明 */}
        <g>
          <rect x={490} y={280} width={240} height={60} fill="var(--danger)" fillOpacity={0.1} stroke="var(--danger)" strokeWidth={1} rx={6} />
          <text x={610} y={302} textAnchor="middle" fill="var(--danger)" fontSize={12} fontWeight={600} fontFamily="system-ui">GC压力来源</text>
          <text x={610} y={322} textAnchor="middle" fill="var(--text-secondary)" fontSize={11} fontFamily="system-ui">每次装箱=堆分配，高频调用→大量小对象→GC卡顿</text>
        </g>
      </svg>
    </div>
  );
}
