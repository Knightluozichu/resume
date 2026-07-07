/**
 * <EfcResourceLifecycleDiagram>：资源管理生命周期（资源管理章）。
 *
 * 上半部分展示裸 new/delete 的手动生命周期：new → 使用 → delete（易泄漏）。
 * 下半部分展示 RAII 三种智能指针的自动管理：
 *   - auto_ptr / unique_ptr（独占所有权）
 *   - shared_ptr（共享所有权，引用计数）
 *   - weak_ptr（不控制生命周期的观察者）
 *
 * 纯静态展示，无交互。纯服务端组件，无客户端指令。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * viewBox 720×500（宽 ≥720），四周留白 ≥32，字号 ≥11。
 */

const VIEW_W = 720;
const VIEW_H = 500;

const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const accent = "var(--accent)";
const success = "var(--success)";
const warning = "var(--warning)";
const border = "var(--border)";

export function EfcResourceLifecycleDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="资源管理生命周期图。上半部分展示裸 new/delete 手动管理：new 分配 → 使用 → delete 释放（标注易泄漏）；下半部分展示 RAII 三种智能指针：unique_ptr 独占所有权、shared_ptr 共享所有权引用计数、weak_ptr 观察者不控制生命周期。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <defs>
            <marker id="efc-rl-arrow" markerWidth="9" markerHeight="9" refX="7" refY="3" orient="auto">
              <path d="M0 0 L7 3 L0 6 z" fill={secondary} />
            </marker>
            <marker id="efc-rl-arrow-warn" markerWidth="9" markerHeight="9" refX="7" refY="3" orient="auto">
              <path d="M0 0 L7 3 L0 6 z" fill={warning} />
            </marker>
          </defs>

          {/* 主标题 */}
          <text x={VIEW_W / 2} y={28} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            资源管理生命周期
          </text>

          {/* ===== 上半部分：裸 new/delete ===== */}
          <text x={32} y={58} fontSize="12" fontWeight="700" fill={warning}>
            手动管理（易出错）
          </text>

          {/* new 框 */}
          <rect x={48} y={72} width={120} height={50} rx="8" fill={warning} fillOpacity="0.08" stroke={warning} strokeWidth="1.5" />
          <text x={108} y={94} textAnchor="middle" fontSize="13" fontWeight="700" fill={primary} fontFamily="monospace">new</text>
          <text x={108} y={110} textAnchor="middle" fontSize="10" fill={secondary}>分配 + 构造</text>

          {/* 箭头 */}
          <line x1={168} y1={97} x2={222} y2={97} stroke={secondary} strokeWidth="1.6" markerEnd="url(#efc-rl-arrow)" />

          {/* 使用 框 */}
          <rect x={228} y={72} width={120} height={50} rx="8" fill={warning} fillOpacity="0.08" stroke={warning} strokeWidth="1.5" />
          <text x={288} y={94} textAnchor="middle" fontSize="13" fontWeight="700" fill={primary}>使用资源</text>
          <text x={288} y={110} textAnchor="middle" fontSize="10" fill={secondary}>业务逻辑</text>

          {/* 箭头 */}
          <line x1={348} y1={97} x2={402} y2={97} stroke={secondary} strokeWidth="1.6" markerEnd="url(#efc-rl-arrow)" />

          {/* delete 框 */}
          <rect x={408} y={72} width={120} height={50} rx="8" fill={warning} fillOpacity="0.08" stroke={warning} strokeWidth="1.5" />
          <text x={468} y={94} textAnchor="middle" fontSize="13" fontWeight="700" fill={primary} fontFamily="monospace">delete</text>
          <text x={468} y={110} textAnchor="middle" fontSize="10" fill={secondary}>析构 + 释放</text>

          {/* 风险标注 */}
          <line x1={468} y1={122} x2={468} y2={142} stroke={warning} strokeWidth="1.4" strokeDasharray="3 2" markerEnd="url(#efc-rl-arrow-warn)" />
          <rect x={556} y={72} width={132} height={50} rx="8" fill={warning} fillOpacity="0.06" stroke={warning} strokeWidth="1.2" strokeDasharray="4 3" />
          <text x={622} y={92} textAnchor="middle" fontSize="11" fontWeight="600" fill={warning}>泄漏风险</text>
          <text x={622} y={108} textAnchor="middle" fontSize="10" fill={secondary}>异常 / 提前 return</text>

          {/* ===== 分隔线 ===== */}
          <line x1={32} y1={158} x2={VIEW_W - 32} y2={158} stroke={border} strokeWidth="1" strokeDasharray="6 4" />

          {/* ===== 下半部分：RAII 智能指针 ===== */}
          <text x={32} y={184} fontSize="12" fontWeight="700" fill={success}>
            RAII 自动管理（对象生命周期 = 资源生命周期）
          </text>

          {/* shared_ptr */}
          <rect x={48} y={202} width={190} height={130} rx="10" fill={success} fillOpacity="0.06" stroke={success} strokeWidth="1.6" />
          <text x={143} y={224} textAnchor="middle" fontSize="13" fontWeight="700" fill={success} fontFamily="monospace">shared_ptr</text>
          <text x={143} y={242} textAnchor="middle" fontSize="11" fill={primary}>共享所有权</text>
          <line x1={64} y1={252} x2={222} y2={252} stroke={success} strokeWidth="0.8" strokeOpacity="0.4" />
          <text x={143} y={270} textAnchor="middle" fontSize="10" fill={secondary}>引用计数 → 0 时释放</text>
          <text x={143} y={288} textAnchor="middle" fontSize="10" fill={secondary}>可拷贝、可共享</text>
          <text x={143} y={306} textAnchor="middle" fontSize="10" fill={secondary}>线程安全计数</text>
          <text x={143} y={324} textAnchor="middle" fontSize="10" fill={secondary}>循环引用风险</text>

          {/* unique_ptr */}
          <rect x={265} y={202} width={190} height={130} rx="10" fill={accent} fillOpacity="0.06" stroke={accent} strokeWidth="1.6" />
          <text x={360} y={224} textAnchor="middle" fontSize="13" fontWeight="700" fill={accent} fontFamily="monospace">unique_ptr</text>
          <text x={360} y={242} textAnchor="middle" fontSize="11" fill={primary}>独占所有权</text>
          <line x1={281} y1={252} x2={439} y2={252} stroke={accent} strokeWidth="0.8" strokeOpacity="0.4" />
          <text x={360} y={270} textAnchor="middle" fontSize="10" fill={secondary}>同一时刻唯一持有</text>
          <text x={360} y={288} textAnchor="middle" fontSize="10" fill={secondary}>不可拷贝，可 move</text>
          <text x={360} y={306} textAnchor="middle" fontSize="10" fill={secondary}>零开销抽象</text>
          <text x={360} y={324} textAnchor="middle" fontSize="10" fill={secondary}>替代 auto_ptr</text>

          {/* weak_ptr */}
          <rect x={482} y={202} width={190} height={130} rx="10" fill={warning} fillOpacity="0.06" stroke={warning} strokeWidth="1.6" />
          <text x={577} y={224} textAnchor="middle" fontSize="13" fontWeight="700" fill={warning} fontFamily="monospace">weak_ptr</text>
          <text x={577} y={242} textAnchor="middle" fontSize="11" fill={primary}>观察者（不拥有）</text>
          <line x1={498} y1={252} x2={656} y2={252} stroke={warning} strokeWidth="0.8" strokeOpacity="0.4" />
          <text x={577} y={270} textAnchor="middle" fontSize="10" fill={secondary}>不增加引用计数</text>
          <text x={577} y={288} textAnchor="middle" fontSize="10" fill={secondary}>lock() 提升为 shared</text>
          <text x={577} y={306} textAnchor="middle" fontSize="10" fill={secondary}>打破循环引用</text>
          <text x={577} y={324} textAnchor="middle" fontSize="10" fill={secondary}>临时观察资源</text>

          {/* RAII 核心原则 */}
          <rect x={48} y={356} width={624} height={58} rx="8" fill={success} fillOpacity="0.05" stroke={success} strokeWidth="1.2" />
          <text x={360} y={378} textAnchor="middle" fontSize="12" fontWeight="700" fill={success}>
            RAII 核心原则：资源获取即初始化
          </text>
          <text x={360} y={398} textAnchor="middle" fontSize="11" fill={secondary}>
            构造函数获取资源 · 析构函数释放资源 · 利用栈展开保证释放
          </text>

          {/* 底部说明 */}
          <line x1={32} y1={436} x2={VIEW_W - 32} y2={436} stroke={border} strokeWidth="1" strokeDasharray="4 3" />
          <text x={VIEW_W / 2} y={460} textAnchor="middle" fontSize="11.5" fill={secondary}>
            手动管理靠人记忆释放时机，RAII 靠对象生命周期自动释放——把确定性交给类型系统
          </text>
          <text x={VIEW_W / 2} y={478} textAnchor="middle" fontSize="10.5" fill={secondary}>
            条款 13-17：以对象管理资源，小心拷贝行为，成对使用 new/delete
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        资源管理生命周期：上方裸 new/delete 手动管理（易泄漏），下方 RAII 三种智能指针（shared_ptr 共享、unique_ptr 独占、weak_ptr 观察）自动管理。
      </figcaption>
    </figure>
  );
}
