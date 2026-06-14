/**
 * <ConstructorCallDiagram>：构造函数执行顺序示意图（成员初始化列表 → 构造体）。
 *
 * 展示一个对象构造时依次发生的步骤：
 * 0=分析类定义, 1=分配内存, 2=成员初始化列表, 3=构造函数体执行, 4=对象构造完成。
 * 支持 step prop（0-4），用于 Stepper 分步讲解。
 *
 * Server Component（纯展示，静态 SVG，无交互）。
 * token 色，无阴影。
 */

interface ConstructorCallDiagramProps {
  step?: number;
}

export function ConstructorCallDiagram({
  step = -1,
}: ConstructorCallDiagramProps) {
  const showAll = step < 0 || step > 4;
  const active = (s: number) => showAll || step === s;

  const accent = "var(--accent)";
  const primary = "var(--text-primary)";
  const secondary = "var(--text-secondary)";
  const border = "var(--border)";
  const bg = "var(--bg)";

  const steps = [
    { label: "① 分析类定义", y: 48, desc: "编译器看到类定义，确定各成员类型" },
    { label: "② 分配内存", y: 108, desc: "在栈或堆上分配 sizeof(Sales_data) 字节" },
    { label: "③ 成员初始化列表", y: 168, desc: "初始化各数据成员（默认值/指定值）" },
    { label: "④ 构造体执行", y: 228, desc: "执行构造函数的 {} 内代码" },
    { label: "⑤ 构造完成", y: 288, desc: "对象诞生，可正常使用" },
  ];

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox="0 0 640 340"
          role="img"
          aria-label="构造函数执行顺序示意图：从分析类定义到对象构造完成的五步过程"
          className="mx-auto block h-auto w-full max-w-[640px]"
        >
          {/* ── 标题 ── */}
          <text x={320} y={22} textAnchor="middle" fontSize="13" fontWeight="600" fill={primary}>
            构造函数执行顺序
          </text>

          {/* ── 构造链（左列）── */}
          {steps.map((s, i) => {
            const isActive = active(i);
            const y = s.y;
            return (
              <g key={s.label} opacity={isActive ? 1 : 0.25}>
                {/* 序号圆 */}
                <circle cx={32} cy={y + 10} r={12} fill={isActive ? accent : "transparent"} stroke={isActive ? accent : border} strokeWidth="2" />
                <text x={32} y={y + 14} textAnchor="middle" fontSize="11" fontWeight="600" fill={isActive ? "#fff" : secondary}>
                  {i + 1}
                </text>

                {/* 标签 */}
                <text x={56} y={y + 14} fontSize="13" fontWeight="600" fill={isActive ? primary : secondary}>
                  {s.label}
                </text>

                {/* 描述 */}
                <text x={56} y={y + 36} fontSize="10" fill={isActive ? secondary : secondary}>
                  {s.desc}
                </text>

                {/* 连接竖线 */}
                {i < steps.length - 1 && (
                  <line x1={32} y1={y + 22} x2={32} y2={steps[i + 1].y} stroke={isActive ? accent : border} strokeWidth="1.5" />
                )}
              </g>
            );
          })}

          {/* ── 右侧代码区 ── */}
          <rect x={240} y={38} width={384} height={280} rx="6" fill={bg} stroke={border} strokeWidth="1" />

          {/* 类定义 */}
          <g opacity={active(0) ? 1 : 0.25}>
            <text x={256} y={62} fontSize="11" fill={accent} fontFamily="monospace">class Sales_data {"{"}</text>
            <text x={272} y={80} fontSize="11" fill={secondary} fontFamily="monospace">string bookNo;</text>
            <text x={272} y={98} fontSize="11" fill={secondary} fontFamily="monospace">unsigned units_sold;</text>
            <text x={272} y={116} fontSize="11" fill={secondary} fontFamily="monospace">double revenue;</text>
            <text x={256} y={134} fontSize="11" fill={accent} fontFamily="monospace">{"}"};
              ;</text>
          </g>

          {/* 构造调用 */}
          <g opacity={active(1) || active(2) || active(3) || active(4) ? 1 : 0.25}>
            <text x={256} y={160} fontSize="11" fill={primary} fontFamily="monospace">
              Sales_data item;
            </text>
            <text x={256} y={178} fontSize="10" fill={secondary}>// 触发构造过程 ↓</text>
          </g>

          {/* 内存分配 */}
          <g opacity={active(1) ? 1 : 0.25}>
            <text x={256} y={200} fontSize="11" fill={accent} fontFamily="monospace">
              [ 分配 sizeof=40B 栈空间 ]
            </text>
          </g>

          {/* 初始化列表 */}
          <g opacity={active(2) ? 1 : 0.25}>
            <text x={256} y={220} fontSize="11" fill={primary} fontFamily="monospace">
              bookNo = "" {"("}string{"()"})
            </text>
            <text x={256} y={238} fontSize="11" fill={primary} fontFamily="monospace">
              units_sold = 0
            </text>
            <text x={256} y={256} fontSize="11" fill={primary} fontFamily="monospace">
              revenue = 0.0
            </text>
            <text x={256} y={276} fontSize="10" fill={secondary}>
              ← 默认初始化（合成默认构造）
            </text>
          </g>

          {/* 构造体 */}
          <g opacity={active(3) ? 1 : 0.25}>
            <text x={256} y={296} fontSize="11" fill={accent} fontFamily="monospace">
              {"{"} 构造函数体 {"}"}
            </text>
            <text x={256} y={314} fontSize="10" fill={secondary}>
              ← 空体或自定义逻辑
            </text>
          </g>

          {/* ── 右侧：对象内存示意 ── */}
          <g opacity={active(4) ? 1 : 0.4}>
            <rect x={536} y={220} width={80} height={80} rx="4" fill="var(--accent-glow)" stroke={accent} strokeWidth="1.5" />
            <text x={576} y={244} textAnchor="middle" fontSize="9" fill={primary} fontWeight="600">对象</text>
            <text x={576} y={260} textAnchor="middle" fontSize="8" fill={secondary}>bookNo: ""</text>
            <text x={576} y={274} textAnchor="middle" fontSize="8" fill={secondary}>units: 0</text>
            <text x={576} y={288} textAnchor="middle" fontSize="8" fill={secondary}>revenue: 0</text>
          </g>

          {/* ── 关键提示 ── */}
          <text x={16} y={332} fontSize="10" fill={accent} fontWeight="600">
            💡 关键：成员初始化在构造体之前——进入 {"{}"} 时所有成员已初始化完毕。
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        构造函数执行分两阶段：先跑成员初始化列表（各数据成员按声明顺序初始化），再跑构造体。进入 {"{}"} 时成员已有确定值。
      </figcaption>
    </figure>
  );
}
