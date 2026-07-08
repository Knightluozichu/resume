/**
 * <GiaChannelsDiagram>：Channel 的 CSP 通信模型与方向。
 *
 * 展示无缓冲/有缓冲 channel、发送/接收阻塞语义、方向限制。
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

export function GiaChannelsDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox="0 0 720 400" role="img" aria-label="Channel CSP 模型：无缓冲 channel 同步握手，有缓冲 channel 异步缓冲，方向限制只发/只收。" className="mx-auto block h-auto w-full max-w-[720px]">
          <text x={360} y={28} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            Channel：通过通信共享内存（CSP）
          </text>

          {/* 无缓冲 */}
          <rect x={36} y={50} width={310} height={150} rx="10" fill={accent} fillOpacity="0.06" stroke={accent} strokeWidth="1.4" strokeOpacity="0.5" />
          <text x={191} y={72} textAnchor="middle" fontSize="13" fontWeight="700" fill={accent}>无缓冲 chan（同步）</text>
          <text x={191} y={90} textAnchor="middle" fontSize="10" fill={secondary}>make(chan int)</text>
          <rect x={150} y={104} width={82} height={30} rx="15" fill={elevated} stroke={accent} strokeWidth="1.6" />
          <text x={191} y={124} textAnchor="middle" fontSize="10" fill={accent}>无缓冲</text>
          {/* 发送方 */}
          <rect x={60} y={108} width={60} height={24} rx="4" fill={warning} fillOpacity="0.15" stroke={warning} />
          <text x={90} y={124} textAnchor="middle" fontSize="10" fill={warning}>发送</text>
          <line x1={120} y1={120} x2={150} y2={120} stroke={warning} strokeWidth="1.4" markerEnd="url(#gia-ch-w)" />
          {/* 接收方 */}
          <rect x={222} y={108} width={60} height={24} rx="4" fill={success} fillOpacity="0.15" stroke={success} />
          <text x={252} y={124} textAnchor="middle" fontSize="10" fill={success}>接收</text>
          <line x1={232} y1={120} x2={222} y2={120} stroke={success} strokeWidth="1.4" />
          <text x={191} y={156} textAnchor="middle" fontSize="10" fill={danger}>发送阻塞直到有接收者——同步握手</text>
          <text x={191} y={174} textAnchor="middle" fontSize="10" fill={secondary}>保证发送瞬间接收方在场</text>
          <text x={191} y={192} textAnchor="middle" fontSize="10" fill={accent}>用于 goroutine 间同步信号</text>

          {/* 有缓冲 */}
          <rect x={374} y={50} width={310} height={150} rx="10" fill={success} fillOpacity="0.06" stroke={success} strokeWidth="1.4" strokeOpacity="0.5" />
          <text x={529} y={72} textAnchor="middle" fontSize="13" fontWeight="700" fill={success}>有缓冲 chan（异步）</text>
          <text x={529} y={90} textAnchor="middle" fontSize="10" fill={secondary}>make(chan int, 3)</text>
          {/* 缓冲槽 */}
          {[0, 1, 2].map((i) => (
            <rect key={i} x={430 + i * 60} y={104} width={50} height={30} rx="4" fill={i < 2 ? success : border} fillOpacity={i < 2 ? "0.2" : "0.3"} stroke={border} />
          ))}
          <text x={529} y={156} textAnchor="middle" fontSize="10" fill={success}>缓冲未满：发送不阻塞（异步）</text>
          <text x={529} y={174} textAnchor="middle" fontSize="10" fill={danger}>缓冲满：发送阻塞 · 缓冲空：接收阻塞</text>
          <text x={529} y={192} textAnchor="middle" fontSize="10" fill={secondary}>解耦生产消费速率 · 削峰填谷</text>

          {/* 方向限制 */}
          <line x1={36} y1={220} x2={684} y2={220} stroke={border} strokeWidth="1" />
          <text x={360} y={242} textAnchor="middle" fontSize="13" fontWeight="700" fill={primary}>方向限制与 select</text>
          <rect x={60} y={258} width={200} height={56} rx="8" fill={elevated} stroke={border} />
          <text x={160} y={278} textAnchor="middle" fontSize="11" fontWeight="700" fill={accent}>chan&lt;- T 只发送</text>
          <text x={160} y={296} textAnchor="middle" fontSize="9" fill={secondary}>生产者只能写</text>
          <text x={160} y={310} textAnchor="middle" fontSize="9" fill={secondary}>编译期防误收</text>

          <rect x={280} y={258} width={200} height={56} rx="8" fill={elevated} stroke={border} />
          <text x={380} y={278} textAnchor="middle" fontSize="11" fontWeight="700" fill={success}>&lt;-chan T 只接收</text>
          <text x={380} y={296} textAnchor="middle" fontSize="9" fill={secondary}>消费者只能读</text>
          <text x={380} y={310} textAnchor="middle" fontSize="9" fill={secondary}>关闭后可读剩余</text>

          <rect x={500} y={258} width={160} height={56} rx="8" fill={warning} fillOpacity="0.1" stroke={warning} />
          <text x={580} y={278} textAnchor="middle" fontSize="11" fontWeight="700" fill={warning}>select 多路复用</text>
          <text x={580} y={296} textAnchor="middle" fontSize="9" fill={secondary}>同时监听多个 chan</text>
          <text x={580} y={310} textAnchor="middle" fontSize="9" fill={secondary}>随机选一个就绪的</text>

          <text x={360} y={340} textAnchor="middle" fontSize="11" fill={danger}>close(ch) 关闭 · 接收得零值+false · 向已关闭 chan 发送会 panic</text>
          <text x={360} y={360} textAnchor="middle" fontSize="11" fill={secondary}>range ch 遍历直到关闭 · 不要在接收方关闭（原则：由发送方关闭）</text>
          <text x={360} y={382} textAnchor="middle" fontSize="11" fill={accent}>CSP 哲学：不要通过共享内存通信，而要通过通信共享内存</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        无缓冲 channel 同步握手，有缓冲 channel 异步解耦；方向限制 + select 实现安全并发协调。
      </figcaption>
    </figure>
  );
}
