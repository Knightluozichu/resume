/**
 * <CvcGcMemoryDiagram>：GC 分代回收与内存管理。
 *
 * 上半：三代堆（Gen0/Gen1/Gen2）+ LOH 的布局与晋升流。
 * 下半：Dispose 模式 vs Finalizer 的回收时序对比。
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * viewBox 720×420，四周留白 >=32，字号 >=11。
 */

const VIEW_W = 720;
const VIEW_H = 420;

const accent = "var(--accent)";
const success = "var(--success)";
const warning = "var(--warning)";
const danger = "var(--danger)";
const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";
const elevated = "var(--bg-elevated)";

export function CvcGcMemoryDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="GC 分代回收。上半展示三代堆 Gen0/Gen1/Gen2 及大对象堆 LOH 的布局与对象晋升流。下半对比 Dispose 模式和 Finalizer 的回收时序。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* 主标题 */}
          <text x={VIEW_W / 2} y={34} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            GC 分代回收与内存管理
          </text>
          <text x={VIEW_W / 2} y={54} textAnchor="middle" fontSize="11" fill={secondary}>
            新对象进 Gen0 · 存活晋升 · LOH 不压缩 · Full GC 扫全堆
          </text>

          {/* 上半：三代堆 + LOH */}
          {/* Gen0 */}
          <rect x={50} y={76} width={120} height={70} rx="6" fill={accent} fillOpacity="0.08" stroke={accent} strokeWidth="1.4" strokeOpacity="0.5" />
          <text x={110} y={96} textAnchor="middle" fontSize="12" fontWeight="700" fill={accent} fontFamily="monospace">Gen 0</text>
          <text x={110} y={114} textAnchor="middle" fontSize="10" fill={secondary}>新对象分配区</text>
          <text x={110} y={130} textAnchor="middle" fontSize="10" fill={secondary}>回收最快 · 频率最高</text>

          {/* 箭头 Gen0 → Gen1 */}
          <line x1={170} y1={111} x2={200} y2={111} stroke={accent} strokeWidth="1.4" markerEnd="url(#cvc-gc-arrow)" />
          <text x={185} y={103} textAnchor="middle" fontSize="10" fill={secondary}>晋升</text>

          {/* Gen1 */}
          <rect x={200} y={76} width={120} height={70} rx="6" fill={success} fillOpacity="0.08" stroke={success} strokeWidth="1.4" strokeOpacity="0.5" />
          <text x={260} y={96} textAnchor="middle" fontSize="12" fontWeight="700" fill={success} fontFamily="monospace">Gen 1</text>
          <text x={260} y={114} textAnchor="middle" fontSize="10" fill={secondary}>中间缓冲区</text>
          <text x={260} y={130} textAnchor="middle" fontSize="10" fill={secondary}>回收较慢</text>

          {/* 箭头 Gen1 → Gen2 */}
          <line x1={320} y1={111} x2={350} y2={111} stroke={success} strokeWidth="1.4" markerEnd="url(#cvc-gc-green)" />
          <text x={335} y={103} textAnchor="middle" fontSize="10" fill={secondary}>晋升</text>

          {/* Gen2 */}
          <rect x={350} y={76} width={120} height={70} rx="6" fill={warning} fillOpacity="0.08" stroke={warning} strokeWidth="1.4" strokeOpacity="0.5" />
          <text x={410} y={96} textAnchor="middle" fontSize="12" fontWeight="700" fill={warning} fontFamily="monospace">Gen 2</text>
          <text x={410} y={114} textAnchor="middle" fontSize="10" fill={secondary}>长生命周期对象</text>
          <text x={410} y={130} textAnchor="middle" fontSize="10" fill={secondary}>Full GC 才回收</text>

          {/* LOH */}
          <rect x={500} y={76} width={170} height={70} rx="6" fill={danger} fillOpacity="0.06" stroke={danger} strokeWidth="1.4" strokeDasharray="4 3" />
          <text x={585} y={96} textAnchor="middle" fontSize="12" fontWeight="700" fill={danger} fontFamily="monospace">LOH 大对象堆</text>
          <text x={585} y={114} textAnchor="middle" fontSize="10" fill={secondary}>&gt;= 85000 字节</text>
          <text x={585} y={130} textAnchor="middle" fontSize="10" fill={secondary}>不压缩 · 属 Gen2</text>

          {/* 分隔线 */}
          <line x1={32} y1={166} x2={VIEW_W - 32} y2={166} stroke={border} strokeWidth="1" strokeDasharray="4 3" />

          {/* 下半：Dispose vs Finalizer */}
          <text x={VIEW_W / 2} y={188} textAnchor="middle" fontSize="13" fontWeight="700" fill={accent}>
            Dispose 模式 vs Finalizer：回收时序
          </text>

          {/* Dispose 路径 */}
          <rect x={50} y={202} width={300} height={160} rx="8" fill={elevated} stroke={success} strokeWidth="1.2" />
          <text x={200} y={222} textAnchor="middle" fontSize="12" fontWeight="700" fill={success}>
            Dispose 模式（主动释放）
          </text>

          <rect x={70} y={234} width={120} height={28} rx="4" fill={success} fillOpacity="0.08" stroke={success} strokeWidth="1" />
          <text x={130} y={252} textAnchor="middle" fontSize="10" fill={primary} fontFamily="monospace">using 块结束</text>

          <line x1={190} y1={248} x2={220} y2={248} stroke={success} strokeWidth="1.2" markerEnd="url(#cvc-gc-green)" />

          <rect x={220} y={234} width={120} height={28} rx="4" fill={success} fillOpacity="0.08" stroke={success} strokeWidth="1" />
          <text x={280} y={252} textAnchor="middle" fontSize="10" fill={primary} fontFamily="monospace">Dispose() 立即</text>

          <text x={200} y={284} textAnchor="middle" fontSize="10" fill={success}>资源立即释放</text>
          <text x={200} y={300} textAnchor="middle" fontSize="10" fill={secondary}>GC.SuppressFinalize → 取消 Finalizer</text>
          <text x={200} y={316} textAnchor="middle" fontSize="10" fill={secondary}>一次 GC 即可回收对象内存</text>
          <text x={200} y={340} textAnchor="middle" fontSize="10" fontWeight="600" fill={success}>推荐：资源在确定时间释放</text>

          {/* Finalizer 路径 */}
          <rect x={370} y={202} width={300} height={160} rx="8" fill={elevated} stroke={danger} strokeWidth="1.2" />
          <text x={520} y={222} textAnchor="middle" fontSize="12" fontWeight="700" fill={danger}>
            Finalizer（被动回收）
          </text>

          <rect x={390} y={234} width={90} height={28} rx="4" fill={danger} fillOpacity="0.06" stroke={danger} strokeWidth="1" />
          <text x={435} y={252} textAnchor="middle" fontSize="10" fill={primary} fontFamily="monospace">对象不可达</text>

          <line x1={480} y1={248} x2={510} y2={248} stroke={danger} strokeWidth="1.2" markerEnd="url(#cvc-gc-red)" />

          <rect x={510} y={234} width={90} height={28} rx="4" fill={danger} fillOpacity="0.06" stroke={danger} strokeWidth="1" />
          <text x={555} y={252} textAnchor="middle" fontSize="10" fill={primary} fontFamily="monospace">第一次 GC</text>

          <text x={520} y={284} textAnchor="middle" fontSize="10" fill={danger}>放入 freachable 队列</text>
          <text x={520} y={300} textAnchor="middle" fontSize="10" fill={secondary}>终结器线程调用 ~Finalize</text>
          <text x={520} y={316} textAnchor="middle" fontSize="10" fill={secondary}>第二次 GC 才回收内存</text>
          <text x={520} y={340} textAnchor="middle" fontSize="10" fontWeight="600" fill={danger}>安全网：防止忘记 Dispose</text>

          <defs>
            <marker id="cvc-gc-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 z" fill={accent} />
            </marker>
            <marker id="cvc-gc-green" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 z" fill={success} />
            </marker>
            <marker id="cvc-gc-red" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 z" fill={danger} />
            </marker>
          </defs>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        分代回收将堆分为 Gen0/Gen1/Gen2 + LOH，Dispose 主动释放优于 Finalizer 被动回收。
      </figcaption>
    </figure>
  );
}
