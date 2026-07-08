/**
 * <MrsConcurrencyDeepDiagram>：Rust 并发深入图解。
 *
 * Send/Sync 编译期标记 + 三种并发原语（Mutex/RwLock/Channel）+ async/await 模型。
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * viewBox 720×400，四周留白 >=32，字号 >=11。
 */

const VIEW_W = 720;
const VIEW_H = 400;

const accent = "var(--accent)";
const success = "var(--success)";
const warning = "var(--warning)";
const danger = "var(--danger)";
const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";
const elevated = "var(--bg-elevated)";

interface ConcurrentTool {
  name: string;
  desc: string;
  use_case: string;
  color: string;
  x: number;
}

const TOOLS: readonly ConcurrentTool[] = [
  { name: "Mutex<T>", desc: "互斥锁", use_case: "独占写访问", color: accent, x: 48 },
  { name: "RwLock<T>", desc: "读写锁", use_case: "多读少写", color: success, x: 244 },
  { name: "Channel", desc: "消息通道", use_case: "线程间通信", color: warning, x: 440 },
];

export function MrsConcurrencyDeepDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} role="img" aria-label="Rust并发深入图解：Send/Sync编译期标记、Mutex/RwLock/Channel三种并发原语、async/await异步模型。" className="mx-auto block h-auto w-full max-w-[720px]">
          {/* 主标题 */}
          <text x={VIEW_W / 2} y={36} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            Rust 并发：编译期线程安全
          </text>
          <text x={VIEW_W / 2} y={56} textAnchor="middle" fontSize="11" fill={secondary}>
            Send/Sync 标记 · 三种原语 · async/await 零成本
          </text>

          {/* 上半区：Send/Sync 双面板 */}
          <rect x={48} y={76} width={296} height={68} rx="8" fill={accent} fillOpacity="0.08" stroke={accent} strokeWidth="1.2" />
          <text x={64} y={98} fontSize="13" fontWeight="700" fill={accent}>Send</text>
          <text x={64} y={116} fontSize="11" fill={primary}>类型可安全跨线程转移所有权</text>
          <text x={64} y={132} fontSize="11" fill={secondary} fontFamily="monospace">T: Send → 可 move 到其他线程</text>

          <rect x={376} y={76} width={296} height={68} rx="8" fill={success} fillOpacity="0.08" stroke={success} strokeWidth="1.2" />
          <text x={392} y={98} fontSize="13" fontWeight="700" fill={success}>Sync</text>
          <text x={392} y={116} fontSize="11" fill={primary}>类型可安全跨线程共享引用</text>
          <text x={392} y={132} fontSize="11" fill={secondary} fontFamily="monospace">&amp;T: Sync → 可多线程同时读</text>

          {/* 分隔线 */}
          <line x1={32} y1={164} x2={VIEW_W - 32} y2={164} stroke={border} strokeWidth="1" strokeDasharray="4 3" />

          {/* 中半区：三种并发原语 */}
          {TOOLS.map((t) => (
            <g key={t.name}>
              <rect x={t.x} y={180} width={160} height={86} rx="10" fill={t.color} fillOpacity="0.06" stroke={t.color} strokeWidth="1.4" />
              <text x={t.x + 80} y={204} textAnchor="middle" fontSize="13" fontWeight="700" fill={t.color} fontFamily="monospace">
                {t.name}
              </text>
              <text x={t.x + 80} y={224} textAnchor="middle" fontSize="11" fontWeight="600" fill={primary}>
                {t.desc}
              </text>
              <text x={t.x + 80} y={244} textAnchor="middle" fontSize="11" fill={secondary}>
                {t.use_case}
              </text>
            </g>
          ))}

          {/* 下半区：async/await 模型 */}
          <rect x={48} y={286} width={624} height={60} rx="8" fill={elevated} stroke={border} strokeWidth="1" />
          <text x={64} y={308} fontSize="12" fontWeight="700" fill={danger}>
            async/await — 零成本异步
          </text>
          <text x={64} y={326} fontSize="11" fill={primary} fontFamily="monospace">
            async fn → 编译期生成状态机 · .await → 无回调无分配 · 零运行时开销
          </text>
          <text x={64} y={340} fontSize="11" fill={secondary}>
            tokio/async-std 提供运行时 · Future trait 驱动状态机推进
          </text>

          {/* 底部总结 */}
          <line x1={32} y1={362} x2={VIEW_W - 32} y2={362} stroke={border} strokeWidth="1" strokeDasharray="4 3" />
          <text x={VIEW_W / 2} y={382} textAnchor="middle" fontSize="11" fill={secondary}>
            Send/Sync 编译期标记防数据竞争 · Mutex/Channel 运行时同步 · async 零成本并发
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Rust 并发深入：Send/Sync 编译期线程安全 + 三种并发原语 + async/await 零成本异步。
      </figcaption>
    </figure>
  );
}
