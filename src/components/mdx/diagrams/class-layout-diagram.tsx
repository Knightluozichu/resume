/**
 * <ClassLayoutDiagram>：类对象内存布局示意图。
 *
 * 展示一个类对象在内存中的布局：数据成员按声明顺序排列，隐含的 this 指针指向对象首地址。
 *
 * Server Component（纯展示，静态 SVG，无交互）。
 * token 色，无阴影。
 */

export function ClassLayoutDiagram() {
  const accent = "var(--accent)";
  const primary = "var(--text-primary)";
  const secondary = "var(--text-secondary)";
  const border = "var(--border)";
  const bg = "var(--bg)";

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox="0 0 640 340"
          role="img"
          aria-label="类对象内存布局示意图：展示 Sales_data 对象在内存中数据成员的排列、this 指针的指向、以及各成员的内存偏移"
          className="mx-auto block h-auto w-full max-w-[640px]"
        >
          {/* ── 标题 ── */}
          <text x={320} y={24} textAnchor="middle" fontSize="13" fontWeight="600" fill={primary}>
            Sales_data 对象的内存布局
          </text>

          {/* ── 对象内存块 ── */}
          <rect x={180} y={42} width={200} height={180} rx="6" fill={bg} stroke={accent} strokeWidth="2" />

          {/* 成员：bookNo (string) */}
          <rect x={190} y={54} width={180} height={36} rx="4" fill="var(--accent-glow)" stroke={accent} strokeWidth="1" />
          <text x={280} y={70} textAnchor="middle" fontSize="12" fill={primary} fontWeight="600">bookNo</text>
          <text x={280} y={83} textAnchor="middle" fontSize="10" fill={secondary}>std::string</text>

          {/* 成员：units_sold (unsigned) */}
          <rect x={190} y={96} width={180} height={36} rx="4" fill="var(--accent-glow)" stroke={accent} strokeWidth="1" />
          <text x={280} y={112} textAnchor="middle" fontSize="12" fill={primary} fontWeight="600">units_sold</text>
          <text x={280} y={125} textAnchor="middle" fontSize="10" fill={secondary}>unsigned（4 字节）</text>

          {/* 成员：revenue (double) */}
          <rect x={190} y={138} width={180} height={36} rx="4" fill="var(--accent-glow)" stroke={accent} strokeWidth="1" />
          <text x={280} y={154} textAnchor="middle" fontSize="12" fill={primary} fontWeight="600">revenue</text>
          <text x={280} y={167} textAnchor="middle" fontSize="10" fill={secondary}>double（8 字节）</text>

          {/* this 标签 */}
          <text x={280} y={196} textAnchor="middle" fontSize="10" fill={secondary} fontStyle="italic">
            成员函数不占对象空间
          </text>

          {/* this 指针 (从外面指向对象) */}
          <defs>
            <marker id="arrowAccent" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
              <polygon points="0,1 6,4 0,7" fill={accent} />
            </marker>
          </defs>

          {/* this 箭头 */}
          <line x1={80} y1={100} x2={176} y2={100} stroke={accent} strokeWidth="1.5" markerEnd="url(#arrowAccent)" />
          <text x={128} y={94} textAnchor="middle" fontSize="11" fill={accent} fontWeight="600">
            this
          </text>
          <text x={128} y={118} textAnchor="middle" fontSize="9" fill={secondary}>
            指向对象的首地址
          </text>

          {/* 垂直偏移标注 */}
          <text x={380} y={70} fontSize="9" fill={secondary} fontFamily="monospace">offset 0</text>
          <text x={380} y={112} fontSize="9" fill={secondary} fontFamily="monospace">offset +24B</text>
          <text x={380} y={154} fontSize="9" fill={secondary} fontFamily="monospace">offset +28B</text>

          {/* 右侧说明 */}
          <rect x={440} y={42} width={184} height={180} rx="6" fill={bg} stroke={border} strokeWidth="1" />
          <text x={532} y={64} textAnchor="middle" fontSize="11" fill={primary} fontWeight="600">
            对象 = 数据集合
          </text>
          <text x={460} y={86} fontSize="10" fill={secondary}>• 只存数据成员</text>
          <text x={460} y={106} fontSize="10" fill={secondary}>• 函数不占空间</text>
          <text x={460} y={126} fontSize="10" fill={secondary}>• 按声明顺序排列</text>
          <text x={460} y={146} fontSize="10" fill={secondary}>• 可能有对齐填充</text>
          <text x={460} y={166} fontSize="10" fill={secondary}>• this→成员访问</text>
          <text x={460} y={186} fontSize="10" fill={secondary}>• sizeof 返回总大小</text>
          <text x={460} y={210} fontSize="9" fill={accent} fontFamily="monospace">
            sizeof(Sales_data)
          </text>

          {/* ── 底部：成员函数区（与对象分离）── */}
          <rect x={80} y={248} width={480} height={48} rx="6" fill={bg} stroke={border} strokeWidth="1" strokeDasharray="4,3" />
          <text x={320} y={262} textAnchor="middle" fontSize="11" fill={primary} fontWeight="600">
            成员函数（代码区，所有同类对象共享）
          </text>
          <text x={320} y={282} textAnchor="middle" fontSize="10" fill={secondary}>
            avg_price() | isbn() | combine() — 通过隐藏的 this 参数知道在操作哪个对象
          </text>

          {/* 从对象到代码区的虚线 */}
          <line x1={280} y1={228} x2={280} y2={245} stroke={secondary} strokeWidth="1" strokeDasharray="3,2" />

          {/* ── 图例 ── */}
          <text x={16} y={324} fontSize="10" fill={secondary}>
            🟪 紫色区域 = 对象占用的内存空间 &nbsp;&nbsp; this → 指向当前操作对象的首地址 &nbsp;&nbsp; 虚线框 = 代码段
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        类对象在内存中只存储数据成员的值；成员函数的代码在另一块代码区，所有同类对象共享，通过隐藏的 this 指针区分在操作哪个对象。
      </figcaption>
    </figure>
  );
}
