/**
 * <PopProcessMgmtDiagram>：进程管理——subprocess 启动 + psutil 监控。
 *
 * 上半：subprocess.run（同步）vs Popen（异步/管道）。
 * 下半：psutil 五大监控维度（CPU/内存/磁盘/网络/进程）。
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * viewBox 720×400，四周留白 ≥32，字号 ≥11。
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

const SUB = [
  { x: 60, w: 280, color: accent, title: "subprocess.run", sub: "同步阻塞，等命令跑完拿结果", use: "适合一次性调用" },
  { x: 380, w: 280, color: success, title: "subprocess.Popen", sub: "异步，可读写管道、交互", use: "适合长进程/流式输出" },
];

const METRICS = [
  { x: 48, label: "CPU", api: "cpu_percent()", color: warning },
  { x: 184, label: "内存", api: "virtual_memory()", color: warning },
  { x: 320, label: "磁盘", api: "disk_usage()", color: danger },
  { x: 456, label: "网络", api: "net_io_counters()", color: danger },
  { x: 592, label: "进程", api: "process_iter()", color: accent },
];
const M_W = 116;

export function PopProcessMgmtDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="进程管理：subprocess.run同步启动与Popen异步管道，psutil监控CPU、内存、磁盘、网络、进程五大维度。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* 主标题 */}
          <text x={VIEW_W / 2} y={32} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            进程管理：启动子进程 + 监控指标
          </text>
          <text x={VIEW_W / 2} y={52} textAnchor="middle" fontSize="11" fill={secondary}>
            subprocess 管「跑命令」· psutil 管「看状态」
          </text>

          {/* subprocess 两栏 */}
          <text x={48} y={80} fontSize="12" fontWeight="700" fill={secondary}>
            启动子进程（subprocess）
          </text>
          {SUB.map((s) => (
            <g key={s.title}>
              <rect x={s.x} y={88} width={s.w} height={76} rx="8" fill={s.color} fillOpacity="0.08" stroke={s.color} strokeWidth="1.4" strokeOpacity="0.55" />
              <text x={s.x + s.w / 2} y={112} textAnchor="middle" fontSize="13" fontWeight="700" fill={s.color}>
                {s.title}
              </text>
              <text x={s.x + s.w / 2} y={132} textAnchor="middle" fontSize="11" fill={primary}>
                {s.sub}
              </text>
              <text x={s.x + s.w / 2} y={152} textAnchor="middle" fontSize="11" fill={secondary}>
                {s.use}
              </text>
            </g>
          ))}

          {/* psutil 五维度 */}
          <text x={48} y={196} fontSize="12" fontWeight="700" fill={secondary}>
            监控指标（psutil）
          </text>
          <line x1={32} y1={190} x2={VIEW_W - 32} y2={190} stroke={border} strokeWidth="1" strokeDasharray="4 3" />
          {METRICS.map((m) => (
            <g key={m.label}>
              <rect x={m.x} y={210} width={M_W} height={92} rx="8" fill={elevated} stroke={m.color} strokeWidth="1.4" strokeOpacity="0.5" />
              <text x={m.x + M_W / 2} y={240} textAnchor="middle" fontSize="14" fontWeight="700" fill={m.color}>
                {m.label}
              </text>
              <text x={m.x + M_W / 2} y={266} textAnchor="middle" fontSize="11" fontWeight="600" fill={primary}>
                {m.api}
              </text>
              <text x={m.x + M_W / 2} y={286} textAnchor="middle" fontSize="10" fill={secondary}>
                跨平台
              </text>
            </g>
          ))}

          {/* 底部总结 */}
          <line x1={32} y1={324} x2={VIEW_W - 32} y2={324} stroke={border} strokeWidth="1" strokeDasharray="4 3" />
          <text x={VIEW_W / 2} y={346} textAnchor="middle" fontSize="11" fill={secondary}>
            run 适合一次性调用拿结果；Popen 适合流式输出、长进程、与子进程交互
          </text>
          <text x={VIEW_W / 2} y={366} textAnchor="middle" fontSize="11" fill={secondary}>
            psutil 跨平台读 CPU/内存/磁盘/网络/进程，是监控告警的数据源
          </text>
          <text x={VIEW_W / 2} y={386} textAnchor="middle" fontSize="11" fill={secondary}>
            process_iter 可遍历进程，按名称/CPU 筛出目标——运维排查常用
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        subprocess 启动子进程与 psutil 监控指标。
      </figcaption>
    </figure>
  );
}
