/**
 * <ResourceLifetimeDiagram>：对象从构造→拷贝→移动→析构的完整生命周期时间线。
 *
 * 水平时间轴展示一个管理堆资源的对象经历的完整生命周期：默认构造、拷贝构造、拷贝赋值、移动构造、析构。
 * 每个阶段标注其对应的特殊成员函数和资源状态变化。
 *
 * Server Component（纯展示，静态 SVG，无交互）。
 * token 色，无阴影。
 */
export function ResourceLifetimeDiagram() {
  const accent = "var(--accent)";
  const primary = "var(--text-primary)";
  const secondary = "var(--text-secondary)";
  const border = "var(--border)";
  const bg = "var(--bg)";
  const elevated = "var(--bg-elevated)";
  const good = "rgb(63,185,127)";
  const warn = "rgb(229,181,103)";
  const danger = "rgb(229,103,92)";

  const w = 720;
  const h = 380;

  const stages = [
    {
      x: 30, label: "默认构造", fn: "ClassName()", color: accent,
      resource: "ptr = nullptr", status: "无资源", statusColor: secondary,
    },
    {
      x: 140, label: "资源分配", fn: "new / make_*", color: good,
      resource: "ptr = 0x1000", status: "持有资源", statusColor: good,
    },
    {
      x: 270, label: "拷贝构造", fn: "ClassName(const &)", color: accent,
      resource: "新 ptr = 0x2000", status: "新对象独立资源", statusColor: good,
    },
    {
      x: 400, label: "拷贝赋值", fn: "operator=(const &)", color: accent,
      resource: "先 delete 0x1000 再 new", status: "释放旧+分配新", statusColor: warn,
    },
    {
      x: 530, label: "移动构造", fn: "ClassName(&&)", color: good,
      resource: "ptr = 0x1000", status: "接管资源·源置空", statusColor: good,
    },
    {
      x: 620, label: "析构", fn: "~ClassName()", color: danger,
      resource: "delete ptr", status: "释放资源·对象死", statusColor: danger,
    },
  ];

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-x-auto overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox={`0 0 ${w} ${h}`}
          role="img"
          aria-label="管理堆资源对象的完整生命周期时间线：从构造到析构，六个关键阶段"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text x={w / 2} y={22} fontSize={15} fontWeight={700} fill={primary} textAnchor="middle">
            对象完整生命周期：从诞生到消亡
          </text>
          <text x={w / 2} y={42} fontSize={10} fill={secondary} textAnchor="middle">
            每个阶段对应一个特殊成员函数——资源状态在栈帧间流转
          </text>

          {/* ── 水平时间轴 ── */}
          <line x1={50} y1={80} x2={670} y2={80} stroke={border} strokeWidth={3} />

          {/* ── 各阶段节点 ── */}
          {stages.map((s, i) => (
            <g key={i}>
              {/* 节点圆 */}
              <circle cx={s.x + 40} cy={80} r={10} fill={bg} stroke={s.color} strokeWidth={2.5} />
              <text x={s.x + 40} y={84} textAnchor="middle" fontSize="11" fontWeight="700" fill={s.color}>
                {i + 1}
              </text>

              {/* 阶段名称 */}
              <text x={s.x + 40} y={106} textAnchor="middle" fontSize="11" fontWeight="600" fill={primary}>
                {s.label}
              </text>

              {/* 函数签名 */}
              <rect x={s.x} y={112} width={90} height={20} rx={4} fill={elevated} stroke={s.color} strokeWidth={1} />
              <text x={s.x + 45} y={126} textAnchor="middle" fontSize="9" fill={s.color} fontFamily="monospace">
                {s.fn}
              </text>

              {/* 阶段间箭头 */}
              {i < stages.length - 1 && (
                <path
                  d={`M ${s.x + 90} ${126} L ${stages[i + 1].x + 40 - 20} ${126}`}
                  stroke={border}
                  strokeWidth={1}
                  markerEnd="url(#rlArrow)"
                />
              )}
            </g>
          ))}

          {/* ── 资源状态展示区 ── */}
          <rect x={30} y={148} width={660} height={90} rx={8} fill={bg} stroke={border} strokeWidth={1} />

          {stages.map((s, i) => (
            <g key={`res-${i}`}>
              {/* 资源指针值 */}
              <rect x={s.x} y={158} width={90} height={22} rx={4} fill={s.statusColor} opacity={0.1} stroke={s.statusColor} strokeWidth={1} />
              <text
                x={s.x + 45}
                y={172}
                textAnchor="middle"
                fontSize="8"
                fill={s.statusColor}
                fontFamily="monospace"
                fontWeight="600"
              >
                {s.resource}
              </text>

              {/* 资源状态说明 */}
              <text x={s.x + 45} y={198} textAnchor="middle" fontSize="9" fill={s.statusColor}>
                {s.status}
              </text>

              {/* 箭头连接 */}
              {i < stages.length - 1 && s.statusColor !== stages[i + 1].statusColor && (
                <text x={s.x + 90} y={175} fontSize="16" fill={warn} textAnchor="middle">→</text>
              )}
            </g>
          ))}

          {/* ── 关键准则 ── */}
          <rect x={30} y={258} width={660} height={90} rx={8} fill={bg} stroke={accent} strokeWidth={1.5} />
          <text x={360} y={282} fontSize={12} fontWeight={700} fill={accent} textAnchor="middle">
            📐 生命周期核心准则
          </text>

          <text x={60} y={306} fontSize="10" fill={primary}>① 构造时获取资源（构造/拷贝/移动），析构时释放——对称</text>
          <text x={60} y={322} fontSize="10" fill={primary}>② 拷贝构造应做深拷贝——新对象独立于源对象</text>
          <text x={60} y={338} fontSize="10" fill={primary}>③ 移动就是把指针"偷"过来——O(1)零分配，源对象置于可析构状态</text>

          <defs>
            <marker id="rlArrow" markerWidth={6} markerHeight={6} refX={5} refY={3} orient="auto">
              <path d="M0,1 L5,3 L0,5" fill={secondary} />
            </marker>
          </defs>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        对象生命周期六阶段：默认构造（无资源）→ 分配资源（持有堆数据）→ 拷贝构造（新对象独立副本）→ 拷贝赋值（释放旧资源、分配新副本）→ 移动构造（接管资源、源置空）→ 析构（释放一切）。每一步对应一个特殊成员函数——这正是 <strong>五法则</strong> 想要规范的全部行为。
      </figcaption>
    </figure>
  );
}
