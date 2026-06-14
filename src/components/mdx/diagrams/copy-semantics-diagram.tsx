/**
 * <CopySemanticsDiagram>：浅拷贝 vs 深拷贝内存对比图。
 *
 * 左侧：浅拷贝——只拷贝指针地址，两个对象共享同一块堆数据。
 * 右侧：深拷贝——重新分配堆内存并复制数据，两个对象各自独立。
 *
 * Server Component（纯展示，静态 SVG，无交互）。
 * token 色，无阴影。
 */
export function CopySemanticsDiagram() {
  const accent = "var(--accent)";
  const primary = "var(--text-primary)";
  const secondary = "var(--text-secondary)";
  const border = "var(--border)";
  const bg = "var(--bg)";
  const elevated = "var(--bg-elevated)";
  const danger = "rgb(229,103,92)";
  const good = "rgb(63,185,127)";

  const w = 780;
  const h = 480;

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-x-auto overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox={`0 0 ${w} ${h}`}
          role="img"
          aria-label="浅拷贝与深拷贝对比：左侧浅拷贝两个对象共享同一堆数据，右侧深拷贝各自拥有独立的堆数据副本"
          className="mx-auto block h-auto w-full max-w-[780px]"
        >
          <text x={w / 2} y={22} fontSize={15} fontWeight={700} fill={primary} textAnchor="middle">
            浅拷贝 vs 深拷贝：内存视角
          </text>

          {/* ====== 左侧：浅拷贝 ====== */}
          <g transform="translate(12, 36)">
            <rect x={0} y={0} width={370} height={420} rx={10} fill={bg} stroke={border} />
            <text x={185} y={26} fontSize={13} fontWeight={700} fill={danger} textAnchor="middle">
              ✕ 浅拷贝（Shallow Copy）= 合成拷贝控制成员
            </text>
            <text x={185} y={46} fontSize={10} fill={secondary} textAnchor="middle">
              只拷贝指针本身——两个对象指向同一块堆内存
            </text>

            {/* 源对象 */}
            <rect x={50} y={62} width={130} height={60} rx={6} fill={elevated} stroke={accent} strokeWidth={1.5} />
            <text x={115} y={82} fontSize={11} fontWeight={600} fill={primary} textAnchor="middle">源对象 obj1</text>
            <text x={115} y={100} fontSize={9} fill={secondary} textAnchor="middle" fontFamily="monospace">ptr → 0x1000</text>
            <text x={115} y={114} fontSize={9} fill={secondary} textAnchor="middle" fontFamily="monospace">data: 42</text>

            {/* 拷贝对象 */}
            <rect x={50} y={180} width={130} height={60} rx={6} fill={elevated} stroke={danger} strokeWidth={1.5} />
            <text x={115} y={200} fontSize={11} fontWeight={600} fill={primary} textAnchor="middle">拷贝对象 obj2</text>
            <text x={115} y={218} fontSize={9} fill={secondary} textAnchor="middle" fontFamily="monospace">ptr → 0x1000</text>
            <text x={115} y={232} fontSize={9} fill={secondary} textAnchor="middle" fontFamily="monospace">data: 42</text>

            {/* 堆数据块 */}
            <rect x={230} y={100} width={120} height={90} rx={6} fill={danger} opacity={0.08} stroke={danger} strokeWidth={1.5} />
            <text x={290} y={120} fontSize={11} fontWeight={600} fill={danger} textAnchor="middle">堆数据</text>
            <text x={290} y={140} fontSize={10} fill={secondary} textAnchor="middle" fontFamily="monospace">0x1000</text>
            <text x={290} y={160} fontSize={10} fill={primary} textAnchor="middle" fontFamily="monospace">int data = 42</text>
            <text x={290} y={178} fontSize={9} fill={secondary} textAnchor="middle">只有一份数据</text>

            {/* 两个指针指向同一块 */}
            <path d="M 180 90 L 226 110" stroke={accent} strokeWidth={1.5} markerEnd="url(#csAccentArr)" />
            <path d="M 180 210 L 226 155" stroke={danger} strokeWidth={1.5} markerEnd="url(#csDangerArr)" />

            {/* 警告文字 */}
            <rect x={50} y={268} width={310} height={48} rx={6} fill={danger} opacity={0.08} stroke={danger} strokeWidth={1} strokeDasharray="4 3" />
            <text x={205} y={286} fontSize={10} fontWeight={600} fill={danger} textAnchor="middle">
              obj2 修改 *ptr → obj1 的 data 也变了！
            </text>
            <text x={205} y={304} fontSize={10} fill={danger} textAnchor="middle">
              析构时 obj1 和 obj2 都 delete 同一块内存 → 双重释放崩溃
            </text>

            {/* 代码示例 */}
            <text x={185} y={346} fontSize={9} fill={secondary} textAnchor="middle" fontFamily="monospace">
              auto obj2 = obj1; // 合成拷贝：ptr 值被复制
            </text>
            <text x={185} y={362} fontSize={9} fill={secondary} textAnchor="middle" fontFamily="monospace">
              *(obj2.ptr) = 99;   // obj1.data 也变成 99！
            </text>
          </g>

          {/* ====== 右侧：深拷贝 ====== */}
          <g transform="translate(396, 36)">
            <rect x={0} y={0} width={370} height={420} rx={10} fill={bg} stroke={border} />
            <text x={185} y={26} fontSize={13} fontWeight={700} fill={good} textAnchor="middle">
              ✓ 深拷贝（Deep Copy）= 自定义拷贝控制
            </text>
            <text x={185} y={46} fontSize={10} fill={secondary} textAnchor="middle">
              拷贝时为新对象分配独立的堆内存，并复制内容
            </text>

            {/* 源对象 */}
            <rect x={50} y={62} width={130} height={60} rx={6} fill={elevated} stroke={accent} strokeWidth={1.5} />
            <text x={115} y={82} fontSize={11} fontWeight={600} fill={primary} textAnchor="middle">源对象 obj1</text>
            <text x={115} y={100} fontSize={9} fill={secondary} textAnchor="middle" fontFamily="monospace">ptr → 0x1000</text>
            <text x={115} y={114} fontSize={9} fill={secondary} textAnchor="middle" fontFamily="monospace">data: 42</text>

            {/* 拷贝对象 */}
            <rect x={50} y={180} width={130} height={60} rx={6} fill={elevated} stroke={good} strokeWidth={1.5} />
            <text x={115} y={200} fontSize={11} fontWeight={600} fill={primary} textAnchor="middle">拷贝对象 obj2</text>
            <text x={115} y={218} fontSize={9} fill={secondary} textAnchor="middle" fontFamily="monospace">ptr → 0x2000</text>
            <text x={115} y={232} fontSize={9} fill={secondary} textAnchor="middle" fontFamily="monospace">data: 42</text>

            {/* 堆数据块——两份独立 */}
            <rect x={220} y={72} width={120} height={90} rx={6} fill={good} opacity={0.08} stroke={good} strokeWidth={1.5} />
            <text x={280} y={92} fontSize={11} fontWeight={600} fill={good} textAnchor="middle">堆数据 1</text>
            <text x={280} y={112} fontSize={10} fill={secondary} textAnchor="middle" fontFamily="monospace">0x1000</text>
            <text x={280} y={132} fontSize={10} fill={primary} textAnchor="middle" fontFamily="monospace">int data = 42</text>

            <rect x={220} y={175} width={120} height={90} rx={6} fill={good} opacity={0.08} stroke={good} strokeWidth={1.5} />
            <text x={280} y={195} fontSize={11} fontWeight={600} fill={good} textAnchor="middle">堆数据 2</text>
            <text x={280} y={215} fontSize={10} fill={secondary} textAnchor="middle" fontFamily="monospace">0x2000</text>
            <text x={280} y={235} fontSize={10} fill={primary} textAnchor="middle" fontFamily="monospace">int data = 42</text>

            {/* 指针分别指向各自堆 */}
            <path d="M 180 90 L 216 100" stroke={accent} strokeWidth={1.5} markerEnd="url(#csAccentArr)" />
            <path d="M 180 210 L 216 220" stroke={good} strokeWidth={1.5} markerEnd="url(#csGoodArr)" />

            {/* 安全说明 */}
            <rect x={50} y={268} width={310} height={48} rx={6} fill={good} opacity={0.08} stroke={good} strokeWidth={1} />
            <text x={205} y={286} fontSize={10} fontWeight={600} fill={good} textAnchor="middle">
              obj2 修改 *ptr → obj1 不受影响 ✓
            </text>
            <text x={205} y={304} fontSize={10} fill={good} textAnchor="middle">
              各自析构各自释放 → 无双重释放 ✓
            </text>

            {/* 代码示例 */}
            <text x={185} y={346} fontSize={9} fill={secondary} textAnchor="middle" fontFamily="monospace">
              // 自定义拷贝构造：分配新堆内存并复制
            </text>
            <text x={185} y={362} fontSize={9} fill={secondary} textAnchor="middle" fontFamily="monospace">
              obj2.ptr = new int(*obj1.ptr);
            </text>
          </g>

          {/* 底部提示 */}
          <text x={w / 2} y={460} fontSize={10} fill={accent} textAnchor="middle">
            💡 核心结论：当类管理堆资源时，必须自定义拷贝控制成员实现深拷贝——否则合成版本只做浅拷贝。
          </text>

          <defs>
            <marker id="csAccentArr" markerWidth={6} markerHeight={6} refX={5} refY={3} orient="auto">
              <path d="M0,1 L5,3 L0,5" fill={accent} />
            </marker>
            <marker id="csDangerArr" markerWidth={6} markerHeight={6} refX={5} refY={3} orient="auto">
              <path d="M0,1 L5,3 L0,5" fill={danger} />
            </marker>
            <marker id="csGoodArr" markerWidth={6} markerHeight={6} refX={5} refY={3} orient="auto">
              <path d="M0,1 L5,3 L0,5" fill={good} />
            </marker>
          </defs>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        <strong>左侧（浅拷贝）</strong>：编译器合成的拷贝只复制指针值——两个对象共享堆数据，修改一个影响另一个，析构时双重释放。<strong>右侧（深拷贝）</strong>：自定义拷贝构造为每个对象分配独立堆内存并复制数据——各自独立，安全地分别析构。
      </figcaption>
    </figure>
  );
}
