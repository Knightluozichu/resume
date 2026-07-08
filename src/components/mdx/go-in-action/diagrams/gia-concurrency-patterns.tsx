/**
 * <GiaConcurrencyPatternsDiagram>：Go 经典并发模式。
 *
 * 展示 worker pool、pipeline、fan-out/fan-in、done channel 取消。
 * Server Component，viewBox 720×400，CSS 变量配色。
 */

const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";
const elevated = "var(--bg-elevated)";
const accent = "var(--accent)";
const success = "var(--success)";
const warning = "var(--warning)";
const danger = "var(--danger)";

export function GiaConcurrencyPatternsDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox="0 0 720 400" role="img" aria-label="Go 并发模式：worker pool 工作池、pipeline 流水线、fan-out/fan-in 扇出扇入、done channel 取消。" className="mx-auto block h-auto w-full max-w-[720px]">
          <text x={360} y={28} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            Go 经典并发模式
          </text>

          {/* Worker Pool */}
          <rect x={36} y={48} width={310} height={130} rx="10" fill={accent} fillOpacity="0.06" stroke={accent} strokeWidth="1.4" strokeOpacity="0.5" />
          <text x={191} y={70} textAnchor="middle" fontSize="12" fontWeight="700" fill={accent}>Worker Pool 工作池</text>
          <rect x={56} y={84} width={80} height={30} rx="4" fill={elevated} stroke={border} />
          <text x={96} y={104} textAnchor="middle" fontSize="9" fill={primary}>jobs chan</text>
          {[0, 1, 2].map((i) => (
            <rect key={i} x={160} y={84 + i * 22} width={70} height={18} rx="3" fill={accent} fillOpacity="0.15" stroke={accent} />
          ))}
          <text x={195} y={97} textAnchor="middle" fontSize="8" fill={accent}>worker</text>
          <rect x={250} y={84} width={80} height={30} rx="4" fill={elevated} stroke={border} />
          <text x={290} y={104} textAnchor="middle" fontSize="9" fill={primary}>results chan</text>
          <line x1={136} y1={99} x2={160} y2={99} stroke={accent} strokeWidth="1" markerEnd="url(#gia-cp-a)" />
          <line x1={230} y1={99} x2={250} y2={99} stroke={accent} strokeWidth="1" markerEnd="url(#gia-cp-a)" />
          <text x={191} y={148} textAnchor="middle" fontSize="9" fill={secondary}>N 个 worker 消费 jobs，写 results</text>
          <text x={191} y={162} textAnchor="middle" fontSize="9" fill={secondary}>限制并发数 · 平衡吞吐与资源</text>

          {/* Pipeline */}
          <rect x={374} y={48} width={310} height={130} rx="10" fill={success} fillOpacity="0.06" stroke={success} strokeWidth="1.4" strokeOpacity="0.5" />
          <text x={529} y={70} textAnchor="middle" fontSize="12" fontWeight="700" fill={success}>Pipeline 流水线</text>
          {["gen", "square", "filter"].map((s, i) => (
            <g key={s}>
              <rect x={394 + i * 96} y={84} width={80} height={30} rx="4" fill={success} fillOpacity="0.15" stroke={success} />
              <text x={434 + i * 96} y={104} textAnchor="middle" fontSize="9" fill={success}>{s}</text>
              {i < 2 && <line x1={474 + i * 96} y1={99} x2={494 + i * 96} y2={99} stroke={success} strokeWidth="1" markerEnd="url(#gia-cp-s)" />}
            </g>
          ))}
          <text x={529} y={148} textAnchor="middle" fontSize="9" fill={secondary}>每阶段一个 goroutine，chan 串联</text>
          <text x={529} y={162} textAnchor="middle" fontSize="9" fill={secondary}>流式处理 · 各阶段并行推进</text>

          {/* Fan-out / Fan-in */}
          <rect x={36} y={196} width={310} height={96} rx="10" fill={warning} fillOpacity="0.06" stroke={warning} strokeWidth="1.4" strokeOpacity="0.5" />
          <text x={191} y={218} textAnchor="middle" fontSize="12" fontWeight="700" fill={warning}>Fan-out / Fan-in 扇出扇入</text>
          <rect x={56} y={232} width={50} height={24} rx="4" fill={elevated} stroke={border} />
          <text x={81} y={248} textAnchor="middle" fontSize="8" fill={primary}>input</text>
          {[0, 1, 2].map((i) => (
            <line key={i} x1={106} y1={244} x2={150} y2={232 + i * 18} stroke={warning} strokeWidth="1" />
          ))}
          {[0, 1, 2].map((i) => (
            <rect key={i} x={150} y={226 + i * 18} width={56} height={14} rx="3" fill={warning} fillOpacity="0.15" stroke={warning} />
          ))}
          <rect x={266} y={232} width={56} height={24} rx="4" fill={elevated} stroke={border} />
          <text x={294} y={248} textAnchor="middle" fontSize="8" fill={primary}>merge</text>
          <text x={191} y={280} textAnchor="middle" fontSize="9" fill={secondary}>多个 worker 并行处理 → 合并结果</text>

          {/* Done channel */}
          <rect x={374} y={196} width={310} height={96} rx="10" fill={danger} fillOpacity="0.06" stroke={danger} strokeWidth="1.4" strokeOpacity="0.5" />
          <text x={529} y={218} textAnchor="middle" fontSize="12" fontWeight="700" fill={danger}>Done / context 取消</text>
          <rect x={434} y={232} width={120} height={26} rx="4" fill={danger} fillOpacity="0.15" stroke={danger} />
          <text x={494} y={249} textAnchor="middle" fontSize="9" fill={danger}>close(done)</text>
          {[0, 1, 2].map((i) => (
            <line key={i} x1={494} y1={258} x2={494} y2={272} stroke={danger} strokeWidth="1" />
          ))}
          <text x={529} y={284} textAnchor="middle" fontSize="9" fill={secondary}>广播取消信号 · 所有 goroutine 退出</text>

          {/* 原则 */}
          <line x1={36} y1={312} x2={684} y2={312} stroke={border} strokeWidth="1" />
          <text x={360} y={334} textAnchor="middle" fontSize="12" fontWeight="700" fill={primary}>并发安全原则</text>
          <text x={360} y={356} textAnchor="middle" fontSize="10" fill={accent}>goroutine 启动时就要想好如何退出——避免泄漏</text>
          <text x={360} y={374} textAnchor="middle" fontSize="10" fill={secondary}>用 context.Context 统一管理超时与取消，而非裸 done channel</text>
          <text x={360} y={392} textAnchor="middle" fontSize="10" fill={warning}>select + default 实现非阻塞操作 · 谁关闭谁负责（发送方关 chan）</text>

          <defs>
            <marker id="gia-cp-a" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 z" fill="var(--accent)" />
            </marker>
            <marker id="gia-cp-s" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 z" fill="var(--success)" />
            </marker>
          </defs>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Worker Pool 限流、Pipeline 流式、Fan-out/in 并行、context 统一取消——Go 并发四大模式。
      </figcaption>
    </figure>
  );
}
