/**
 * <EmcMakeUniqueSharedDiagram>：make_unique / make_shared 的优势。
 *
 * 上下两行对比「直接 new」与「make 函数」：
 *   - 上行「直接 new」（danger 红）：两次分配（对象 + 控制块）、异常泄漏风险
 *   - 下行「make 函数」（success 绿）：单次分配、异常安全、缓存友好
 *
 * 纯静态展示，无交互。纯服务端组件，无客户端指令。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * viewBox 720×460（宽 ≥720），四周留白 ≥32，字号 ≥11。
 */

const VIEW_W = 720;
const VIEW_H = 460;

const ROW_Y1 = 110;
const ROW_Y2 = 280;
const ROW_H = 140;

export function EmcMakeUniqueSharedDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="make 函数与直接 new 对比。上行直接 new（红色）：对象与控制块两次分配，函数参数求值顺序中插入异常会导致泄漏。下行 make 函数（绿色）：对象与控制块单次分配合并，异常安全，缓存友好。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* 主标题 */}
          <text x={VIEW_W / 2} y={34} textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            make_unique / make_shared 的优势
          </text>
          <text x={VIEW_W / 2} y={56} textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            条款 21 · 异常安全 + 单次分配 + 缓存友好
          </text>

          {/* 上行：直接 new */}
          <g>
            <rect x={32} y={ROW_Y1} width={VIEW_W - 64} height={ROW_H} rx="10" fill="var(--danger)" fillOpacity="0.05" stroke="var(--danger)" strokeWidth="1.6" strokeOpacity="0.6" />
            <text x={48} y={ROW_Y1 + 26} fontSize="13" fontWeight="700" fill="var(--danger)">
              直接 new
            </text>
            <text x={VIEW_W - 48} y={ROW_Y1 + 26} textAnchor="end" fontSize="11" fill="var(--text-secondary)" fontFamily="monospace">
              shared_ptr&lt;Widget&gt;(new Widget)
            </text>

            {/* 两个分离的内存块 */}
            <rect x={70} y={ROW_Y1 + 48} width={140} height={70} rx="8" fill="var(--bg-elevated)" stroke="var(--danger)" strokeWidth="1.4" />
            <text x={140} y={ROW_Y1 + 74} textAnchor="middle" fontSize="11.5" fontWeight="600" fill="var(--text-primary)">
              Widget 对象
            </text>
            <text x={140} y={ROW_Y1 + 94} textAnchor="middle" fontSize="10" fill="var(--text-secondary)">
              第 1 次堆分配
            </text>

            <rect x={250} y={ROW_Y1 + 48} width={140} height={70} rx="8" fill="var(--bg-elevated)" stroke="var(--danger)" strokeWidth="1.4" />
            <text x={320} y={ROW_Y1 + 74} textAnchor="middle" fontSize="11.5" fontWeight="600" fill="var(--text-primary)">
              控制块
            </text>
            <text x={320} y={ROW_Y1 + 94} textAnchor="middle" fontSize="10" fill="var(--text-secondary)">
              第 2 次堆分配
            </text>

            {/* 异常泄漏说明 */}
            <rect x={420} y={ROW_Y1 + 48} width={248} height={70} rx="8" fill="var(--danger)" fillOpacity="0.08" stroke="var(--danger)" strokeWidth="1.2" strokeOpacity="0.5" />
            <text x={544} y={ROW_Y1 + 72} textAnchor="middle" fontSize="11.5" fontWeight="600" fill="var(--danger)">
              异常泄漏风险
            </text>
            <text x={544} y={ROW_Y1 + 92} textAnchor="middle" fontSize="10.5" fill="var(--text-primary)">
              求值顺序中异常 → new 结果泄漏
            </text>
            <text x={544} y={ROW_Y1 + 108} textAnchor="middle" fontSize="10" fill="var(--text-secondary)" fontFamily="monospace">
              func(sp(new W), mayThrow())
            </text>
          </g>

          {/* 下行：make 函数 */}
          <g>
            <rect x={32} y={ROW_Y2} width={VIEW_W - 64} height={ROW_H} rx="10" fill="var(--success)" fillOpacity="0.05" stroke="var(--success)" strokeWidth="1.6" strokeOpacity="0.6" />
            <text x={48} y={ROW_Y2 + 26} fontSize="13" fontWeight="700" fill="var(--success)">
              make 函数
            </text>
            <text x={VIEW_W - 48} y={ROW_Y2 + 26} textAnchor="end" fontSize="11" fill="var(--text-secondary)" fontFamily="monospace">
              make_shared&lt;Widget&gt;()
            </text>

            {/* 单个合并内存块 */}
            <rect x={90} y={ROW_Y2 + 48} width={260} height={70} rx="8" fill="var(--bg-elevated)" stroke="var(--success)" strokeWidth="1.4" />
            <text x={150} y={ROW_Y2 + 74} textAnchor="middle" fontSize="11.5" fontWeight="600" fill="var(--text-primary)">
              Widget 对象
            </text>
            <text x={290} y={ROW_Y2 + 74} textAnchor="middle" fontSize="11.5" fontWeight="600" fill="var(--text-primary)">
              控制块
            </text>
            <text x={220} y={ROW_Y2 + 98} textAnchor="middle" fontSize="10" fill="var(--text-secondary)">
              单次堆分配 · 缓存友好
            </text>

            {/* 异常安全说明 */}
            <rect x={380} y={ROW_Y2 + 48} width={288} height={70} rx="8" fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" strokeWidth="1.2" strokeOpacity="0.5" />
            <text x={524} y={ROW_Y2 + 72} textAnchor="middle" fontSize="11.5" fontWeight="600" fill="var(--success)">
              异常安全
            </text>
            <text x={524} y={ROW_Y2 + 92} textAnchor="middle" fontSize="10.5" fill="var(--text-primary)">
              无裸 new，求值顺序无泄漏窗口
            </text>
            <text x={524} y={ROW_Y2 + 108} textAnchor="middle" fontSize="10" fill="var(--text-secondary)" fontFamily="monospace">
              func(make_shared&lt;W&gt;(), mayThrow())
            </text>
          </g>

          {/* 底部总结 */}
          <line x1={32} y1={432} x2={VIEW_W - 32} y2={432} stroke="var(--border)" strokeWidth="1" strokeDasharray="4 3" />
          <text x={VIEW_W / 2} y={452} textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            例外：自定义删除器或与 initializer_list 共用时退回直接 new
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        make_shared 将对象与控制块合并为单次堆分配，既异常安全又缓存友好；直接 new 存在求值顺序导致的泄漏窗口。自定义删除器等场景例外。
      </figcaption>
    </figure>
  );
}
