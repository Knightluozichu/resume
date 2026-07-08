/**
 * <MrsNetworkingDiagram>：Rust 网络编程图解。
 *
 * TCP 服务端流程 + async tokio 模型 + 关键 trait（AsyncRead/AsyncWrite）。
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

interface NetStep {
  step: string;
  title: string;
  desc: string;
  color: string;
  y: number;
}

const STEPS: readonly NetStep[] = [
  { step: "1", title: "bind 绑定", desc: "TcpListener::bind(addr)", color: accent, y: 104 },
  { step: "2", title: "accept 接受", desc: "listener.accept().await", color: success, y: 140 },
  { step: "3", title: "spawn 处理", desc: "tokio::spawn(handle(conn))", color: warning, y: 176 },
  { step: "4", title: "read/write", desc: "conn.read(&mut buf).await", color: danger, y: 212 },
  { step: "5", title: "close 关闭", desc: "Drop 自动关闭连接", color: secondary, y: 248 },
];

export function MrsNetworkingDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} role="img" aria-label="Rust网络编程图解：TCP服务端五步流程、async tokio并发模型和关键trait。" className="mx-auto block h-auto w-full max-w-[720px]">
          {/* 主标题 */}
          <text x={VIEW_W / 2} y={36} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            Rust 网络编程：async 高并发服务
          </text>
          <text x={VIEW_W / 2} y={56} textAnchor="middle" fontSize="11" fill={secondary}>
            TCP 五步流程 · tokio 异步运行时 · 零成本并发
          </text>

          {/* 左面板：TCP 服务端五步流程 */}
          <rect x={36} y={76} width={360} height={216} rx="10" fill={elevated} stroke={border} strokeWidth="1.2" />
          <text x={216} y={96} textAnchor="middle" fontSize="13" fontWeight="700" fill={accent}>
            TCP 服务端流程（async）
          </text>
          <line x1={56} y1={106} x2={376} y2={106} stroke={border} strokeWidth="1" strokeDasharray="3 2" />

          {STEPS.map((s) => (
            <g key={s.step}>
              <circle cx={62} cy={s.y} r="10" fill={s.color} fillOpacity="0.15" stroke={s.color} strokeWidth="1.2" />
              <text x={62} y={s.y + 4} textAnchor="middle" fontSize="11" fontWeight="700" fill={s.color}>
                {s.step}
              </text>
              <text x={84} y={s.y - 2} fontSize="12" fontWeight="600" fill={primary}>
                {s.title}
              </text>
              <text x={84} y={s.y + 13} fontSize="11" fill={secondary} fontFamily="monospace">
                {s.desc}
              </text>
              {/* 连接线 */}
              <line x1={62} y1={s.y + 10} x2={62} y2={s.y + 26} stroke={border} strokeWidth="1" strokeDasharray="2 2" />
            </g>
          ))}

          {/* 右面板：tokio 异步模型 */}
          <rect x={416} y={76} width={268} height={216} rx="10" fill={elevated} stroke={border} strokeWidth="1.2" />
          <text x={550} y={96} textAnchor="middle" fontSize="13" fontWeight="700" fill={success}>
            tokio 异步运行时
          </text>
          <line x1={436} y1={106} x2={664} y2={106} stroke={border} strokeWidth="1" strokeDasharray="3 2" />

          {/* 运行时核心 */}
          <rect x={436} y={116} width={228} height={40} rx="6" fill={success} fillOpacity="0.08" stroke={success} strokeWidth="1" />
          <text x={550} y={134} textAnchor="middle" fontSize="11" fontWeight="600" fill={success}> reactors + thread pool</text>
          <text x={550} y={148} textAnchor="middle" fontSize="11" fill={secondary}>IO 多路复用 + 工作窃取调度</text>

          {/* 关键 trait */}
          <text x={436} y={176} fontSize="12" fontWeight="700" fill={warning}>关键 Trait</text>
          <rect x={436} y={184} width={228} height={28} rx="4" fill={elevated} stroke={border} strokeWidth="0.8" />
          <text x={550} y={202} textAnchor="middle" fontSize="11" fill={primary} fontFamily="monospace">AsyncRead + AsyncWrite</text>

          {/* 关键类型 */}
          <text x={436} y={228} fontSize="12" fontWeight="700" fill={danger}>关键类型</text>
          <rect x={436} y={236} width={228} height={28} rx="4" fill={elevated} stroke={border} strokeWidth="0.8" />
          <text x={550} y={254} textAnchor="middle" fontSize="11" fill={primary} fontFamily="monospace">TcpListener · TcpStream</text>

          <text x={436} y={280} fontSize="11" fill={secondary}>每个连接 = 一个 async 任务</text>

          {/* 底部总结 */}
          <line x1={32} y1={318} x2={VIEW_W - 32} y2={318} stroke={border} strokeWidth="1" strokeDasharray="4 3" />
          <text x={VIEW_W / 2} y={340} textAnchor="middle" fontSize="11" fill={secondary}>
            bind → accept → spawn → read/write → close · 每步 .await 不阻塞线程
          </text>
          <text x={VIEW_W / 2} y={358} textAnchor="middle" fontSize="11" fill={secondary}>
            十万级并发连接 · 每连接几 KB 内存 · 零成本异步状态机
          </text>
          <text x={VIEW_W / 2} y={376} textAnchor="middle" fontSize="11" fill={secondary}>
            Rust 网络编程 = 安全 + 高性能 + 高并发
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Rust 网络编程：TCP 服务端五步流程 + tokio 异步运行时高并发模型。
      </figcaption>
    </figure>
  );
}
