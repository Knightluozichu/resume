/**
 * <EmcMoveVsCopyDiagram>：移动 vs 拷贝。
 *
 * 左右两栏对比「拷贝语义」与「移动语义」：
 *   - 左栏「拷贝」（accent 紫）：深拷贝资源，源对象不变，开销大
 *   - 右栏「移动」（success 绿）：窃取资源指针，源对象置空，开销接近零
 *
 * 纯静态展示，无交互。纯服务端组件，无客户端指令。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * viewBox 720×480（宽 ≥720），四周留白 ≥32，字号 ≥11。
 */

const VIEW_W = 720;
const VIEW_H = 480;

const COL_W = 300;
const COL_GAP = 56;
const COL_MARGIN = 32;
const colX = (i: number) => COL_MARGIN + i * (COL_W + COL_GAP);

export function EmcMoveVsCopyDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="移动与拷贝对比。左栏拷贝（紫色）：源对象不变，目标对象深拷贝资源，开销大，触发拷贝构造与拷贝赋值。右栏移动（绿色）：源对象资源指针被窃取后置空，目标对象接管指针，开销接近零，触发移动构造与移动赋值，右值引用 T&& 是触发信号。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* 主标题 */}
          <text x={VIEW_W / 2} y={34} textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            拷贝语义 vs 移动语义
          </text>
          <text x={VIEW_W / 2} y={56} textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            条款 23 · 右值引用 T&amp;&amp; 是移动的信号
          </text>

          {/* 左栏：拷贝 */}
          <g>
            <rect x={colX(0)} y={80} width={COL_W} height={30} rx="6" fill="var(--accent)" fillOpacity="0.14" stroke="var(--accent)" strokeWidth="1.5" />
            <text x={colX(0) + COL_W / 2} y={100} textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--accent)">
              拷贝（左值源）
            </text>

            {/* 源对象 */}
            <rect x={colX(0) + 16} y={130} width={120} height={70} rx="8" fill="var(--bg-elevated)" stroke="var(--accent)" strokeWidth="1.4" />
            <text x={colX(0) + 76} y={154} textAnchor="middle" fontSize="11.5" fontWeight="700" fill="var(--text-primary)">
              源对象
            </text>
            <text x={colX(0) + 76} y={176} textAnchor="middle" fontSize="10.5" fill="var(--text-secondary)" fontFamily="monospace">
              data → [资源]
            </text>
            <text x={colX(0) + 76} y={192} textAnchor="middle" fontSize="10" fill="var(--success)">
              保持不变
            </text>

            {/* 目标对象 */}
            <rect x={colX(0) + 160} y={130} width={124} height={70} rx="8" fill="var(--bg-elevated)" stroke="var(--accent)" strokeWidth="1.4" />
            <text x={colX(0) + 222} y={154} textAnchor="middle" fontSize="11.5" fontWeight="700" fill="var(--text-primary)">
              目标对象
            </text>
            <text x={colX(0) + 222} y={176} textAnchor="middle" fontSize="10.5" fill="var(--text-secondary)" fontFamily="monospace">
              data → [副本]
            </text>
            <text x={colX(0) + 222} y={192} textAnchor="middle" fontSize="10" fill="var(--danger)">
              深拷贝 · 开销大
            </text>

            {/* 拷贝箭头 */}
            <line x1={colX(0) + 136} y1={165} x2={colX(0) + 160} y2={165} stroke="var(--accent)" strokeWidth="1.8" markerEnd="url(#emc-copy-arrow)" />

            <rect x={colX(0)} y={224} width={COL_W} height={104} rx="8" fill="var(--accent)" fillOpacity="0.05" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.45" />
            <text x={colX(0) + 14} y={248} fontSize="11.5" fontWeight="700" fill="var(--accent)">
              触发条件
            </text>
            <text x={colX(0) + 14} y={270} fontSize="11" fill="var(--text-primary)" fontFamily="monospace">
              Widget b = a;  // a 为左值
            </text>
            <text x={colX(0) + 14} y={292} fontSize="11" fill="var(--text-primary)">
              拷贝构造 / 拷贝赋值
            </text>
            <text x={colX(0) + 14} y={312} fontSize="11" fill="var(--text-primary)">
              分配新内存 + 逐元素复制
            </text>
          </g>

          {/* 右栏：移动 */}
          <g>
            <rect x={colX(1)} y={80} width={COL_W} height={30} rx="6" fill="var(--success)" fillOpacity="0.14" stroke="var(--success)" strokeWidth="1.5" />
            <text x={colX(1) + COL_W / 2} y={100} textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--success)">
              移动（右值源）
            </text>

            {/* 源对象 */}
            <rect x={colX(1) + 16} y={130} width={120} height={70} rx="8" fill="var(--bg-elevated)" stroke="var(--success)" strokeWidth="1.4" />
            <text x={colX(1) + 76} y={154} textAnchor="middle" fontSize="11.5" fontWeight="700" fill="var(--text-primary)">
              源对象
            </text>
            <text x={colX(1) + 76} y={176} textAnchor="middle" fontSize="10.5" fill="var(--text-secondary)" fontFamily="monospace">
              data → nullptr
            </text>
            <text x={colX(1) + 76} y={192} textAnchor="middle" fontSize="10" fill="var(--danger)">
              资源被窃取
            </text>

            {/* 目标对象 */}
            <rect x={colX(1) + 160} y={130} width={124} height={70} rx="8" fill="var(--bg-elevated)" stroke="var(--success)" strokeWidth="1.4" />
            <text x={colX(1) + 222} y={154} textAnchor="middle" fontSize="11.5" fontWeight="700" fill="var(--text-primary)">
              目标对象
            </text>
            <text x={colX(1) + 222} y={176} textAnchor="middle" fontSize="10.5" fill="var(--text-secondary)" fontFamily="monospace">
              data → [资源]
            </text>
            <text x={colX(1) + 222} y={192} textAnchor="middle" fontSize="10" fill="var(--success)">
              接管指针 · 近零开销
            </text>

            {/* 移动箭头 */}
            <line x1={colX(1) + 136} y1={165} x2={colX(1) + 160} y2={165} stroke="var(--success)" strokeWidth="1.8" markerEnd="url(#emc-move-arrow)" />

            <rect x={colX(1)} y={224} width={COL_W} height={104} rx="8" fill="var(--success)" fillOpacity="0.05" stroke="var(--success)" strokeWidth="1.2" strokeOpacity="0.45" />
            <text x={colX(1) + 14} y={248} fontSize="11.5" fontWeight="700" fill="var(--success)">
              触发条件
            </text>
            <text x={colX(1) + 14} y={270} fontSize="11" fill="var(--text-primary)" fontFamily="monospace">
              Widget b = std::move(a);
            </text>
            <text x={colX(1) + 14} y={292} fontSize="11" fill="var(--text-primary)">
              移动构造 / 移动赋值
            </text>
            <text x={colX(1) + 14} y={312} fontSize="11" fill="var(--text-primary)">
              指针交接 + 源置空
            </text>
          </g>

          {/* 箭头定义 */}
          <defs>
            <marker id="emc-copy-arrow" markerWidth="9" markerHeight="9" refX="7" refY="3" orient="auto">
              <path d="M0 0 L7 3 L0 6 z" fill="var(--accent)" />
            </marker>
            <marker id="emc-move-arrow" markerWidth="9" markerHeight="9" refX="7" refY="3" orient="auto">
              <path d="M0 0 L7 3 L0 6 z" fill="var(--success)" />
            </marker>
          </defs>

          {/* 底部总结 */}
          <line x1={32} y1={372} x2={VIEW_W - 32} y2={372} stroke="var(--border)" strokeWidth="1" strokeDasharray="4 3" />
          <text x={VIEW_W / 2} y={394} textAnchor="middle" fontSize="11.5" fill="var(--text-secondary)">
            move 不移动任何东西，只是把左值 cast 成右值引用以选择移动重载
          </text>
          <text x={VIEW_W / 2} y={414} textAnchor="middle" fontSize="10.5" fill="var(--text-secondary)">
            移动后源对象处于有效但未指定状态，只能赋值或析构，不可读其值
          </text>
          <text x={VIEW_W / 2} y={440} textAnchor="middle" fontSize="10" fill="var(--text-secondary)" fontFamily="monospace">
            条款 29：不要假设移动一定发生、一定廉价
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        拷贝深复制资源保持源不变，开销大；移动窃取资源指针并置空源对象，开销接近零。std::move 只是强制转型为右值引用以触发移动重载，本身不移动任何数据。
      </figcaption>
    </figure>
  );
}
