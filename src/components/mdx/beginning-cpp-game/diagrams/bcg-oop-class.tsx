/**
 * <BcgOopClassDiagram>：类与对象结构图（beginning-cpp-game-programming 面向对象章）。
 *
 * 中央画一个 UML 风格的类盒（三段：类名 / 成员变量 / 成员函数），
 * 成员按访问控制着色：public（绿）/ private（红）/ protected（橙）。
 * 左侧标注「类 = 蓝图」、右侧标注「对象 = 实例」并画出两个实例。
 * 底部画出构造 → 使用 → 析构的生命周期时间线。
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * 布局遵守 docs/diagram-layout-rules.md：viewBox 720×480、四周留白 ≥32、
 * 字号 ≥11、相邻元素间距 ≥8、三段垂直分层（标题 / 主体 / 底部生命周期）。
 */

const VIEW_W = 720;
const VIEW_H = 480;

// 中央类盒
const BOX_X = 250;
const BOX_W = 220;
const BOX_Y = 96;
const NAME_H = 32;
const FIELD_H = 96;
const METHOD_H = 96;

// 访问控制颜色
const PUB = "var(--success)";
const PRI = "var(--danger)";
const PRO = "var(--warning)";

export function BcgOopClassDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="类与对象结构图。中央 UML 类盒三段：类名 Player、成员变量（private: m_Name、m_Health，红色；protected: m_Speed，橙色）、成员函数（public: Player() 构造、~Player() 析构、Move()，绿色）。左侧标类是蓝图，右侧画两个对象实例 p1 和 p2。底部时间线：构造函数创建 → 使用中调用成员函数 → 析构函数销毁。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <defs>
            <marker id="bcg-oop-arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
              <path d="M0 0 L8 4 L0 8 z" fill="var(--accent)" />
            </marker>
          </defs>

          {/* ===== 标题 ===== */}
          <text x={VIEW_W / 2} y="36" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            类与对象 · 结构与生命周期
          </text>
          <text x={VIEW_W / 2} y="58" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            类是蓝图 · 对象是实例 · 访问控制管可见性
          </text>

          {/* ===== 左侧：类 = 蓝图 ===== */}
          <rect x="40" y="150" width="150" height="44" rx="8" fill="var(--accent)" fillOpacity="0.1" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="115" y="170" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--accent)">类 = 蓝图</text>
          <text x="115" y="186" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">定义结构，不占实例内存</text>
          <line x1="190" y1="172" x2="240" y2="172" stroke="var(--accent)" strokeWidth="1.6" markerEnd="url(#bcg-oop-arrow)" />

          {/* ===== 中央类盒（UML 三段） ===== */}
          {/* 类名段 */}
          <rect x={BOX_X} y={BOX_Y} width={BOX_W} height={NAME_H} rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.4" />
          <text x={BOX_X + BOX_W / 2} y={BOX_Y + 21} textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--accent)">class Player</text>

          {/* 成员变量段 */}
          <rect x={BOX_X} y={BOX_Y + NAME_H} width={BOX_W} height={FIELD_H} fill="var(--bg)" stroke="var(--accent)" strokeWidth="1.4" />
          <text x={BOX_X + 12} y={BOX_Y + NAME_H + 20} fontSize="11" fontWeight="700" fill="var(--text-secondary)">- 成员变量</text>
          <text x={BOX_X + 16} y={BOX_Y + NAME_H + 40} fontSize="11" fontFamily="monospace" fill={PRI}>private  m_Name</text>
          <text x={BOX_X + 16} y={BOX_Y + NAME_H + 58} fontSize="11" fontFamily="monospace" fill={PRI}>private  m_Health</text>
          <text x={BOX_X + 16} y={BOX_Y + NAME_H + 76} fontSize="11" fontFamily="monospace" fill={PRO}>protected m_Speed</text>

          {/* 成员函数段 */}
          <rect x={BOX_X} y={BOX_Y + NAME_H + FIELD_H} width={BOX_W} height={METHOD_H} rx="8" fill="var(--bg)" stroke="var(--accent)" strokeWidth="1.4" />
          <text x={BOX_X + 12} y={BOX_Y + NAME_H + FIELD_H + 20} fontSize="11" fontWeight="700" fill="var(--text-secondary)">+ 成员函数</text>
          <text x={BOX_X + 16} y={BOX_Y + NAME_H + FIELD_H + 40} fontSize="11" fontFamily="monospace" fill={PUB}>public Player()  构造</text>
          <text x={BOX_X + 16} y={BOX_Y + NAME_H + FIELD_H + 58} fontSize="11" fontFamily="monospace" fill={PUB}>public ~Player() 析构</text>
          <text x={BOX_X + 16} y={BOX_Y + NAME_H + FIELD_H + 76} fontSize="11" fontFamily="monospace" fill={PUB}>public Move()</text>

          {/* ===== 右侧：对象 = 实例 ===== */}
          <line x1={BOX_X + BOX_W} y1="172" x2="490" y2="172" stroke="var(--accent)" strokeWidth="1.6" markerEnd="url(#bcg-oop-arrow)" />
          <rect x="490" y="120" width="190" height="44" rx="8" fill="var(--success)" fillOpacity="0.1" stroke="var(--success)" strokeWidth="1.2" />
          <text x="585" y="140" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--success)">对象 = 实例</text>
          <text x="585" y="156" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">按蓝图创建，各占内存</text>

          {/* 两个实例 */}
          <rect x="490" y="180" width="88" height="56" rx="6" fill="var(--bg)" stroke="var(--success)" strokeWidth="1" />
          <text x="534" y="198" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--success)">p1</text>
          <text x="534" y="216" textAnchor="middle" fontSize="11" fill="var(--text-primary)">name=Alice</text>
          <text x="534" y="230" textAnchor="middle" fontSize="11" fill="var(--text-primary)">hp=100</text>

          <rect x="592" y="180" width="88" height="56" rx="6" fill="var(--bg)" stroke="var(--success)" strokeWidth="1" />
          <text x="636" y="198" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--success)">p2</text>
          <text x="636" y="216" textAnchor="middle" fontSize="11" fill="var(--text-primary)">name=Bob</text>
          <text x="636" y="230" textAnchor="middle" fontSize="11" fill="var(--text-primary)">hp=80</text>

          {/* ===== 底部生命周期时间线 ===== */}
          <text x={VIEW_W / 2} y="288" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--text-primary)">
            对象生命周期
          </text>
          <line x1="80" y1="320" x2={VIEW_W - 80} y2="320" stroke="var(--border)" strokeWidth="1.4" />

          {/* 构造 */}
          <circle cx="140" cy="320" r="6" fill="var(--success)" />
          <text x="140" y="346" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--success)">构造</text>
          <text x="140" y="362" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">Player() 初始化</text>

          {/* 使用 */}
          <circle cx={VIEW_W / 2} cy="320" r="6" fill="var(--accent)" />
          <text x={VIEW_W / 2} y="346" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--accent)">使用</text>
          <text x={VIEW_W / 2} y="362" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">调用 Move() 等</text>

          {/* 析构 */}
          <circle cx={VIEW_W - 140} cy="320" r="6" fill="var(--danger)" />
          <text x={VIEW_W - 140} y="346" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--danger)">析构</text>
          <text x={VIEW_W - 140} y="362" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">~Player() 清理</text>

          {/* 箭头 */}
          <line x1="150" y1="320" x2={VIEW_W / 2 - 10} y2="320" stroke="var(--accent)" strokeWidth="1.4" markerEnd="url(#bcg-oop-arrow)" />
          <line x1={VIEW_W / 2 + 10} y1="320" x2={VIEW_W - 150} y2="320" stroke="var(--accent)" strokeWidth="1.4" markerEnd="url(#bcg-oop-arrow)" />

          {/* 访问控制图例 */}
          <text x="80" y="410" fontSize="11" fontWeight="700" fill="var(--text-secondary)">访问控制：</text>
          <circle cx="170" cy="406" r="4" fill={PUB} />
          <text x="180" y="410" fontSize="11" fill="var(--text-primary)">public 外部可访问</text>
          <circle cx="320" cy="406" r="4" fill={PRI} />
          <text x="330" y="410" fontSize="11" fill="var(--text-primary)">private 仅类内</text>
          <circle cx="450" cy="406" r="4" fill={PRO} />
          <text x="460" y="410" fontSize="11" fill="var(--text-primary)">protected 类与子类</text>

          {/* ===== 底部总结栏 ===== */}
          <rect x="60" y={VIEW_H - 44} width={VIEW_W - 120} height="28" rx="10" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x={VIEW_W / 2} y={VIEW_H - 26} textAnchor="middle" fontSize="12" fill="var(--text-primary)">
            封装 = 把数据藏进 private，只通过 public 函数操作，构造析构管生死
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        类是定义结构的蓝图，对象是按蓝图创建的实例。成员变量存状态，成员函数定义行为。public/private/protected 控制可见性实现封装；构造函数在创建时初始化，析构函数在销毁时清理资源。
      </figcaption>
    </figure>
  );
}
