/**
 * <EfcConstructorOrderDiagram>：对象构造与析构顺序（构造析构章）。
 *
 * 左侧展示构造顺序：基类构造 → 成员变量构造 → 派生类构造体
 * 右侧展示析构顺序（严格反向）：派生类析构 → 成员变量析构 → 基类析构
 * 底部标注：构造/析构期间不要调用 virtual 函数（条款 9）
 *
 * 纯静态展示，无交互。纯服务端组件，无客户端指令。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * viewBox 720×460（宽 ≥720），四周留白 ≥32，字号 ≥11。
 */

const VIEW_W = 720;
const VIEW_H = 460;

const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const accent = "var(--accent)";
const success = "var(--success)";
const warning = "var(--warning)";
const border = "var(--border)";

export function EfcConstructorOrderDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="对象构造与析构顺序图。左侧构造顺序自上而下：基类构造、成员变量构造、派生类构造体；右侧析构顺序严格反向：派生类析构、成员变量析构、基类析构。底部标注构造和析构期间不要调用 virtual 函数。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <defs>
            <marker id="efc-co-down" markerWidth="9" markerHeight="9" refX="4.5" refY="8" orient="auto">
              <path d="M0 0 L4.5 8 L9 0 z" fill={secondary} />
            </marker>
            <marker id="efc-co-up" markerWidth="9" markerHeight="9" refX="4.5" refY="8" orient="auto">
              <path d="M0 0 L4.5 8 L9 0 z" fill={secondary} />
            </marker>
          </defs>

          {/* 主标题 */}
          <text x={VIEW_W / 2} y={28} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            对象构造与析构顺序
          </text>

          {/* ===== 左侧：构造顺序 ===== */}
          <text x={170} y={60} textAnchor="middle" fontSize="13" fontWeight="700" fill={success}>
            构造顺序（自上而下）
          </text>

          {/* 基类构造 */}
          <rect x={70} y={76} width={200} height={54} rx="8" fill={accent} fillOpacity="0.08" stroke={accent} strokeWidth="1.6" />
          <text x={170} y={98} textAnchor="middle" fontSize="12.5" fontWeight="700" fill={primary}>① 基类构造</text>
          <text x={170} y={116} textAnchor="middle" fontSize="10" fill={secondary} fontFamily="monospace">Base::Base()</text>

          {/* 向下箭头 */}
          <line x1={170} y1={130} x2={170} y2={152} stroke={secondary} strokeWidth="1.8" markerEnd="url(#efc-co-down)" />

          {/* 成员变量构造 */}
          <rect x={70} y={158} width={200} height={54} rx="8" fill={success} fillOpacity="0.08" stroke={success} strokeWidth="1.6" />
          <text x={170} y={180} textAnchor="middle" fontSize="12.5" fontWeight="700" fill={primary}>② 成员变量构造</text>
          <text x={170} y={198} textAnchor="middle" fontSize="10" fill={secondary} fontFamily="monospace">成员按声明顺序初始化</text>

          {/* 向下箭头 */}
          <line x1={170} y1={212} x2={170} y2={234} stroke={secondary} strokeWidth="1.8" markerEnd="url(#efc-co-down)" />

          {/* 派生类构造体 */}
          <rect x={70} y={240} width={200} height={54} rx="8" fill={warning} fillOpacity="0.08" stroke={warning} strokeWidth="1.6" />
          <text x={170} y={262} textAnchor="middle" fontSize="12.5" fontWeight="700" fill={primary}>③ 派生类构造体</text>
          <text x={170} y={280} textAnchor="middle" fontSize="10" fill={secondary} fontFamily="monospace">Derived::Derived()</text>

          {/* ===== 中间分隔与说明 ===== */}
          <line x1={320} y1={50} x2={320} y2={310} stroke={border} strokeWidth="1" strokeDasharray="4 3" />
          <text x={360} y={180} textAnchor="middle" fontSize="11" fill={secondary}>
            析构严格
          </text>
          <text x={360} y={196} textAnchor="middle" fontSize="11" fill={secondary}>
            反向于构造
          </text>

          {/* ===== 右侧：析构顺序 ===== */}
          <text x={540} y={60} textAnchor="middle" fontSize="13" fontWeight="700" fill={warning}>
            析构顺序（严格反向）
          </text>

          {/* 派生类析构 */}
          <rect x={440} y={76} width={200} height={54} rx="8" fill={warning} fillOpacity="0.08" stroke={warning} strokeWidth="1.6" />
          <text x={540} y={98} textAnchor="middle" fontSize="12.5" fontWeight="700" fill={primary}>① 派生类析构</text>
          <text x={540} y={116} textAnchor="middle" fontSize="10" fill={secondary} fontFamily="monospace">Derived::~Derived()</text>

          {/* 向下箭头 */}
          <line x1={540} y1={130} x2={540} y2={152} stroke={secondary} strokeWidth="1.8" markerEnd="url(#efc-co-down)" />

          {/* 成员变量析构 */}
          <rect x={440} y={158} width={200} height={54} rx="8" fill={success} fillOpacity="0.08" stroke={success} strokeWidth="1.6" />
          <text x={540} y={180} textAnchor="middle" fontSize="12.5" fontWeight="700" fill={primary}>② 成员变量析构</text>
          <text x={540} y={198} textAnchor="middle" fontSize="10" fill={secondary} fontFamily="monospace">成员按声明逆序析构</text>

          {/* 向下箭头 */}
          <line x1={540} y1={212} x2={540} y2={234} stroke={secondary} strokeWidth="1.8" markerEnd="url(#efc-co-down)" />

          {/* 基类析构 */}
          <rect x={440} y={240} width={200} height={54} rx="8" fill={accent} fillOpacity="0.08" stroke={accent} strokeWidth="1.6" />
          <text x={540} y={262} textAnchor="middle" fontSize="12.5" fontWeight="700" fill={primary}>③ 基类析构</text>
          <text x={540} y={280} textAnchor="middle" fontSize="10" fill={secondary} fontFamily="monospace">Base::~Base()</text>

          {/* ===== 底部警告区 ===== */}
          <rect x={48} y={322} width={624} height={64} rx="8" fill={warning} fillOpacity="0.05" stroke={warning} strokeWidth="1.2" />
          <text x={360} y={346} textAnchor="middle" fontSize="12.5" fontWeight="700" fill={warning}>
            条款 9：构造/析构期间不要调用 virtual 函数
          </text>
          <text x={360} y={366} textAnchor="middle" fontSize="11" fill={secondary}>
            构造基类时派生部分尚未成型，virtual 退化为基类版本——不会多态
          </text>
          <text x={360} y={380} textAnchor="middle" fontSize="11" fill={secondary}>
            析构基类时派生部分已经销毁，virtual 同样不会多态
          </text>

          {/* 底部说明 */}
          <line x1={32} y1={406} x2={VIEW_W - 32} y2={406} stroke={border} strokeWidth="1" strokeDasharray="4 3" />
          <text x={VIEW_W / 2} y={430} textAnchor="middle" fontSize="11.5" fill={secondary}>
            构造自基向派，析构自派向基——中间夹着成员，成员始终比对象本体先构造后析构
          </text>
          <text x={VIEW_W / 2} y={448} textAnchor="middle" fontSize="10.5" fill={secondary}>
            条款 1-12：初始化、构造/析构顺序、operator= 返回引用、自我赋值
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        对象构造顺序：基类构造 → 成员变量构造 → 派生类构造体；析构严格反向。构造/析构期间调用 virtual 函数不会触发多态。
      </figcaption>
    </figure>
  );
}
