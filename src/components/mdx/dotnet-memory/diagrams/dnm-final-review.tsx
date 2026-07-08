/**
 * <DnmFinalReviewDiagram>：全书知识串联：托管堆模型→GC 回收→SOS 调试→内存模式→优化策略的完整闭环。
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

export function DnmFinalReviewDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="全书知识串联图。从内存模型到 GC 回收、SOS 调试、内存模式和优化策略的完整闭环。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text x={VIEW_W / 2} y={34} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>全书知识串联</text>
          <text x={VIEW_W / 2} y={54} textAnchor="middle" fontSize="11" fill={secondary}>从内存模型到优化策略的完整闭环</text>
          <rect x={280} y={170} width={160} height={56} rx="8" fill={accent} fillOpacity="0.1" stroke={accent} strokeWidth="1.6" />
          <text x={360} y={194} textAnchor="middle" fontSize="13" fontWeight="700" fill={accent}>核心知识</text>
          <text x={360} y={212} textAnchor="middle" fontSize="10" fill={secondary}>全书串联</text>
          <rect x={285} y={60} width={150} height={40} rx="6" fill={elevated} stroke={var(--accent)} strokeWidth="1.2" />
          <text x={360} y={80} textAnchor="middle" fontSize="11" fontWeight="600" fill={var(--accent)}>托管堆模型</text>
          <text x=360 y=94 textAnchor="middle" fontSize="9" fill={secondary}>Gen0/1/2+LOH 分代</text>
          <line x1={360} y1={198} x2={360} y2={78} stroke={border} strokeWidth="1" strokeDasharray="3 2" />
          <rect x={440.88457268119896} y={120} width={150} height={40} rx="6" fill={elevated} stroke={var(--success)} strokeWidth="1.2" />
          <text x={515.884572681199} y={140} textAnchor="middle" fontSize="11" fontWeight="600" fill={var(--success)}>GC 回收流程</text>
          <text x=515.884572681199 y=154 textAnchor="middle" fontSize="9" fill={secondary}>标记-清除-压缩</text>
          <line x1={360} y1={198} x2={515.884572681199} y2={138} stroke={border} strokeWidth="1" strokeDasharray="3 2" />
          <rect x={440.88457268119896} y={240} width={150} height={40} rx="6" fill={elevated} stroke={var(--warning)} strokeWidth="1.2" />
          <text x={515.884572681199} y={260} textAnchor="middle" fontSize="11" fontWeight="600" fill={var(--warning)}>SOS 调试</text>
          <text x=515.884572681199 y=274 textAnchor="middle" fontSize="9" fill={secondary}>dumpheap/gcroot</text>
          <line x1={360} y1={198} x2={515.884572681199} y2={258} stroke={border} strokeWidth="1" strokeDasharray="3 2" />
          <rect x={285} y={300} width={150} height={40} rx="6" fill={elevated} stroke={var(--danger)} strokeWidth="1.2" />
          <text x={360} y={320} textAnchor="middle" fontSize="11" fontWeight="600" fill={var(--danger)}>LOH 与碎片</text>
          <text x=360 y=334 textAnchor="middle" fontSize="9" fill={secondary}>85000阈值不压缩</text>
          <line x1={360} y1={198} x2={360} y2={318} stroke={border} strokeWidth="1" strokeDasharray="3 2" />
          <rect x={129.11542731880107} y={240.00000000000006} width={150} height={40} rx="6" fill={elevated} stroke={var(--accent)} strokeWidth="1.2" />
          <text x={204.11542731880107} y={260.00000000000006} textAnchor="middle" fontSize="11" fontWeight="600" fill={var(--accent)}>Pinning 固定</text>
          <text x=204.11542731880107 y=274.00000000000006 textAnchor="middle" fontSize="9" fill={secondary}>阻碍压缩碎片</text>
          <line x1={360} y1={198} x2={204.11542731880107} y2={258.00000000000006} stroke={border} strokeWidth="1" strokeDasharray="3 2" />
          <rect x={129.11542731880104} y={120} width={150} height={40} rx="6" fill={elevated} stroke={var(--success)} strokeWidth="1.2" />
          <text x={204.11542731880104} y={140} textAnchor="middle" fontSize="11" fontWeight="600" fill={var(--success)}>Dispose 模式</text>
          <text x=204.11542731880104 y=154 textAnchor="middle" fontSize="9" fill={secondary}>Finalizer+IDisposable</text>
          <line x1={360} y1={198} x2={204.11542731880104} y2={138} stroke={border} strokeWidth="1" strokeDasharray="3 2" />
          <text x={VIEW_W / 2} y={400} textAnchor="middle" fontSize="11" fill={secondary}>托管堆是地基 · GC 是回收器 · SOS 是探查器 · 优化是闭环</text>

        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        全书知识串联：托管堆模型→GC 回收→SOS 调试→内存模式→优化策略的完整闭环。
      </figcaption>
    </figure>
  );
}
