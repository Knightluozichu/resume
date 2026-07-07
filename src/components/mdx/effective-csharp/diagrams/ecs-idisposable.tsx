/**
 * <EcsIDisposableDiagram>：IDisposable 模式与 Dispose 标准实现（条款 12 等）。
 *
 * 上：两条释放路径
 *   - using / 显式 Dispose()：确定性释放，清理托管 + 非托管资源
 *   - 终结器（Finalizer）：GC 回收时的兜底，仅清理非托管资源
 * 下：标准 Dispose(bool disposing) 模式——disposing=true 清两类，false 仅清非托管
 *
 * 纯静态展示，无交互。Server Component。
 * viewBox 720×420，四周留白 ≥32，字号 ≥11。
 */

const VIEW_W = 720;
const VIEW_H = 420;

const accent = "var(--accent)";
const danger = "var(--danger)";
const success = "var(--success)";
const warning = "var(--warning)";
const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";

export function EcsIDisposableDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="IDisposable 模式。上方两条释放路径：using 或显式 Dispose 确定性释放清理托管加非托管资源；终结器 Finalizer 是 GC 回收时的兜底仅清理非托管资源。下方标准 Dispose bool disposing 模式：disposing 为 true 清两类资源，为 false 仅清非托管。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <defs>
            <marker id="ecs-disp-arrow" markerWidth="9" markerHeight="9" refX="7" refY="3" orient="auto">
              <path d="M0 0 L7 3 L0 6 z" fill={secondary} />
            </marker>
          </defs>

          {/* 主标题 */}
          <text x={VIEW_W / 2} y={34} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            IDisposable 模式
          </text>
          <text x={VIEW_W / 2} y={56} textAnchor="middle" fontSize="11" fill={secondary}>
            确定性释放 + 终结器兜底——两条路径收口资源
          </text>

          {/* 上：两条路径 */}
          {/* using / Dispose 路径 */}
          <g>
            <rect x={40} y={76} width={300} height={92} rx="10" fill={success} fillOpacity="0.06" stroke={success} strokeWidth="1.6" />
            <text x={190} y={98} textAnchor="middle" fontSize="13" fontWeight="700" fill={success}>
              路径一：using / Dispose()
            </text>
            <text x={60} y={120} fontSize="11" fontFamily="monospace" fill={primary}>{"using (var f = new File())"}</text>
            <text x={60} y={136} fontSize="11" fontFamily="monospace" fill={primary}>{"{ ... } // 离开块即释放"}</text>
            <text x={60} y={156} fontSize="11" fill={secondary}>确定性 · 清理托管 + 非托管</text>
          </g>

          {/* 终结器路径 */}
          <g>
            <rect x={380} y={76} width={300} height={92} rx="10" fill={warning} fillOpacity="0.06" stroke={warning} strokeWidth="1.6" />
            <text x={530} y={98} textAnchor="middle" fontSize="13" fontWeight="700" fill={warning}>
              路径二：终结器（兜底）
            </text>
            <text x={400} y={120} fontSize="11" fontFamily="monospace" fill={primary}>{"~File() => Dispose(false);"}</text>
            <text x={400} y={140} fontSize="11" fill={secondary}>GC 回收时触发 · 仅清非托管</text>
            <text x={400} y={158} fontSize="11" fill={warning}>不确定时机 · 性能代价高</text>
          </g>

          {/* 两条路径汇聚到 Dispose(bool) */}
          <line x1={190} y1={168} x2={340} y2={208} stroke={secondary} strokeWidth="1.4" markerEnd="url(#ecs-disp-arrow)" />
          <line x1={530} y1={168} x2={380} y2={208} stroke={secondary} strokeWidth="1.4" markerEnd="url(#ecs-disp-arrow)" />

          {/* 中：Dispose(bool disposing) */}
          <g>
            <rect x={250} y={210} width={220} height={40} rx="8" fill={accent} fillOpacity="0.10" stroke={accent} strokeWidth="1.6" />
            <text x={360} y={235} textAnchor="middle" fontSize="12.5" fontWeight="700" fill={accent} fontFamily="monospace">
              {"Dispose(bool disposing)"}
            </text>
          </g>

          {/* 下：disposing 分支 */}
          <line x1={360} y1={250} x2={200} y2={280} stroke={secondary} strokeWidth="1.4" markerEnd="url(#ecs-disp-arrow)" />
          <text x={268} y={270} textAnchor="middle" fontSize="10" fill={secondary}>true</text>
          <line x1={360} y1={250} x2={520} y2={280} stroke={secondary} strokeWidth="1.4" markerEnd="url(#ecs-disp-arrow)" />
          <text x={452} y={270} textAnchor="middle" fontSize="10" fill={secondary}>false</text>

          {/* disposing=true 分支 */}
          <g>
            <rect x={40} y={284} width={320} height={76} rx="8" fill={success} fillOpacity="0.05" stroke={success} strokeWidth="1.4" strokeOpacity="0.5" />
            <text x={200} y={306} textAnchor="middle" fontSize="12" fontWeight="700" fill={success}>
              disposing = true（确定性）
            </text>
            <text x={56} y={326} fontSize="11" fill={primary}>清理托管资源（调用其 Dispose）</text>
            <text x={56} y={346} fontSize="11" fill={primary}>清理非托管资源（句柄/内存）</text>
            <text x={56} y={356} fontSize="10" fill={secondary}>  GC.SuppressFinalize(this) 抑制终结</text>
          </g>

          {/* disposing=false 分支 */}
          <g>
            <rect x={360} y={284} width={320} height={76} rx="8" fill={warning} fillOpacity="0.05" stroke={warning} strokeWidth="1.4" strokeOpacity="0.5" />
            <text x={520} y={306} textAnchor="middle" fontSize="12" fontWeight="700" fill={warning}>
              disposing = false（终结器）
            </text>
            <text x={376} y={326} fontSize="11" fill={primary}>仅清理非托管资源</text>
            <text x={376} y={346} fontSize="11" fill={danger}>不可访问托管对象（可能已回收）</text>
            <text x={376} y={356} fontSize="10" fill={secondary}>  终结器无法复活托管引用</text>
          </g>

          {/* 底部说明 */}
          <line x1={32} y1={374} x2={VIEW_W - 32} y2={374} stroke={border} strokeWidth="1" strokeDasharray="4 3" />
          <text x={VIEW_W / 2} y={398} textAnchor="middle" fontSize="11" fill={secondary}>
            优先 using 确定性释放 · 终结器只兜底非托管 · SuppressFinalize 避免重复代价
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Dispose(bool disposing) 是模式核心：disposing 为 true 时清托管加非托管资源并抑制终结器；为 false（终结器调用）时只能清非托管资源，托管对象可能已被 GC 回收。
      </figcaption>
    </figure>
  );
}
