/**
 * <EfcNewDeleteDiagram>：new/delete 机制（new、delete 与异常章）。
 *
 * 展示 new 的两阶段操作和 delete 的两阶段操作：
 *   - new：operator new（分配内存） → 构造函数 → 返回指针
 *   - delete：析构函数 → operator delete（释放内存）
 * 同时展示 placement new：在已有内存上构造对象
 *
 * 纯静态展示，无交互。纯服务端组件，无客户端指令。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * viewBox 720×480（宽 ≥720），四周留白 ≥32，字号 ≥11。
 */

const VIEW_W = 720;
const VIEW_H = 480;

const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const accent = "var(--accent)";
const success = "var(--success)";
const warning = "var(--warning)";
const border = "var(--border)";

export function EfcNewDeleteDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="new/delete 机制图。上半部分展示 new 的两阶段操作：operator new 分配内存、构造函数、返回指针；delete 的两阶段操作：析构函数、operator delete 释放内存。下半部分展示 placement new 在已有内存上构造对象，以及 new-handler 行为。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <defs>
            <marker id="efc-nd-arrow" markerWidth="9" markerHeight="9" refX="7" refY="3" orient="auto">
              <path d="M0 0 L7 3 L0 6 z" fill={secondary} />
            </marker>
            <marker id="efc-nd-arrow-warn" markerWidth="9" markerHeight="9" refX="7" refY="3" orient="auto">
              <path d="M0 0 L7 3 L0 6 z" fill={warning} />
            </marker>
          </defs>

          {/* 主标题 */}
          <text x={VIEW_W / 2} y={28} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            new / delete 机制：两阶段操作
          </text>

          {/* ===== 上半部分：new 流程 ===== */}
          <text x={32} y={56} fontSize="12.5" fontWeight="700" fill={accent}>
            new 表达式（分配 + 构造）
          </text>

          {/* operator new */}
          <rect x={48} y={72} width={180} height={56} rx="8" fill={accent} fillOpacity="0.08" stroke={accent} strokeWidth="1.6" />
          <text x={138} y={94} textAnchor="middle" fontSize="12.5" fontWeight="700" fill={accent} fontFamily="monospace">operator new</text>
          <text x={138} y={112} textAnchor="middle" fontSize="10.5" fill={secondary}>分配原始内存</text>

          <line x1={228} y1={100} x2={272} y2={100} stroke={secondary} strokeWidth="1.8" markerEnd="url(#efc-nd-arrow)" />

          {/* 构造函数 */}
          <rect x={278} y={72} width={180} height={56} rx="8" fill={success} fillOpacity="0.08" stroke={success} strokeWidth="1.6" />
          <text x={368} y={94} textAnchor="middle" fontSize="12.5" fontWeight="700" fill={success}>构造函数</text>
          <text x={368} y={112} textAnchor="middle" fontSize="10.5" fill={secondary}>在内存上构造对象</text>

          <line x1={458} y1={100} x2={502} y2={100} stroke={secondary} strokeWidth="1.8" markerEnd="url(#efc-nd-arrow)" />

          {/* 返回指针 */}
          <rect x={508} y={72} width={160} height={56} rx="8" fill={accent} fillOpacity="0.06" stroke={accent} strokeWidth="1.4" />
          <text x={588} y={94} textAnchor="middle" fontSize="12.5" fontWeight="700" fill={accent}>返回指针</text>
          <text x={588} y={112} textAnchor="middle" fontSize="10.5" fill={secondary}>T* p = new T</text>

          {/* 异常标注 */}
          <line x1={368} y1={128} x2={368} y2={148} stroke={warning} strokeWidth="1.4" strokeDasharray="3 2" markerEnd="url(#efc-nd-arrow-warn)" />
          <text x={368} y={164} textAnchor="middle" fontSize="10" fill={warning}>构造失败 → operator delete 自动回收内存</text>

          {/* ===== 分隔线 ===== */}
          <line x1={32} y1={184} x2={VIEW_W - 32} y2={184} stroke={border} strokeWidth="1" strokeDasharray="6 4" />

          {/* ===== 中间：delete 流程 ===== */}
          <text x={32} y={210} fontSize="12.5" fontWeight="700" fill={warning}>
            delete 表达式（析构 + 释放）
          </text>

          {/* 析构函数 */}
          <rect x={48} y={226} width={180} height={56} rx="8" fill={warning} fillOpacity="0.08" stroke={warning} strokeWidth="1.6" />
          <text x={138} y={248} textAnchor="middle" fontSize="12.5" fontWeight="700" fill={warning}>析构函数</text>
          <text x={138} y={266} textAnchor="middle" fontSize="10.5" fill={secondary}>清理对象资源</text>

          <line x1={228} y1={254} x2={272} y2={254} stroke={secondary} strokeWidth="1.8" markerEnd="url(#efc-nd-arrow)" />

          {/* operator delete */}
          <rect x={278} y={226} width={180} height={56} rx="8" fill={accent} fillOpacity="0.08" stroke={accent} strokeWidth="1.6" />
          <text x={368} y={248} textAnchor="middle" fontSize="12.5" fontWeight="700" fill={accent} fontFamily="monospace">operator delete</text>
          <text x={368} y={266} textAnchor="middle" fontSize="10.5" fill={secondary}>释放原始内存</text>

          <line x1={458} y1={254} x2={502} y2={254} stroke={secondary} strokeWidth="1.8" markerEnd="url(#efc-nd-arrow)" />

          {/* 完成 */}
          <rect x={508} y={226} width={160} height={56} rx="8" fill={border} fillOpacity="0.06" stroke={border} strokeWidth="1.4" />
          <text x={588} y={248} textAnchor="middle" fontSize="12.5" fontWeight="700" fill={secondary}>内存归还</text>
          <text x={588} y={266} textAnchor="middle" fontSize="10.5" fill={secondary}>delete p</text>

          {/* ===== 下半部分：placement new ===== */}
          <line x1={32} y1={306} x2={VIEW_W - 32} y2={306} stroke={border} strokeWidth="1" strokeDasharray="6 4" />

          <text x={32} y={332} fontSize="12.5" fontWeight="700" fill={success}>
            placement new（在已有内存上构造）
          </text>

          {/* 已有内存 */}
          <rect x={48} y={348} width={160} height={52} rx="8" fill={success} fillOpacity="0.06" stroke={success} strokeWidth="1.4" />
          <text x={128} y={370} textAnchor="middle" fontSize="12" fontWeight="700" fill={success}>已有内存</text>
          <text x={128} y={388} textAnchor="middle" fontSize="10.5" fill={secondary} fontFamily="monospace">char buf[sizeof(T)]</text>

          <line x1={208} y1={374} x2={252} y2={374} stroke={secondary} strokeWidth="1.8" markerEnd="url(#efc-nd-arrow)" />

          {/* placement new */}
          <rect x={258} y={348} width={180} height={52} rx="8" fill={success} fillOpacity="0.08" stroke={success} strokeWidth="1.6" />
          <text x={348} y={370} textAnchor="middle" fontSize="12.5" fontWeight="700" fill={success} fontFamily="monospace">placement new</text>
          <text x={348} y={388} textAnchor="middle" fontSize="10.5" fill={secondary} fontFamily="monospace">new (buf) T()</text>

          <line x1={438} y1={374} x2={482} y2={374} stroke={secondary} strokeWidth="1.8" markerEnd="url(#efc-nd-arrow)" />

          {/* 对象就位 */}
          <rect x={488} y={348} width={180} height={52} rx="8" fill={success} fillOpacity="0.06" stroke={success} strokeWidth="1.4" />
          <text x={578} y={370} textAnchor="middle" fontSize="12" fontWeight="700" fill={success}>对象就位</text>
          <text x={578} y={388} textAnchor="middle" fontSize="10.5" fill={secondary}>不分配，只构造</text>

          {/* ===== 底部总结 ===== */}
          <rect x={48} y={416} width={624} height={44} rx="8" fill={accent} fillOpacity="0.04" stroke={border} strokeWidth="1" />
          <text x={360} y={436} textAnchor="middle" fontSize="11.5" fontWeight="700" fill={accent}>
            new = operator new（分配） + 构造；delete = 析构 + operator delete（释放）
          </text>
          <text x={360} y={454} textAnchor="middle" fontSize="11" fill={secondary}>
            条款 49-52：new-handler 行为、定制时机、固守常规、placement new/delete 配对
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        new/delete 机制：new 分两阶段（operator new 分配内存 → 构造函数），delete 反向（析构函数 → operator delete 释放），placement new 在已有内存上只构造不分配。
      </figcaption>
    </figure>
  );
}
