/**
 * <CseIoModelDiagram>：五大 IO 模型对比图。
 *
 * 左侧列出五种 IO 模型（阻塞、非阻塞、IO复用、信号驱动、异步），
 * 右侧用时间轴展示每种模型中「等待数据 → 复制数据 → 返回」的阶段占比。
 * 用颜色区分阻塞段（warning）与活跃段（success），让读者一眼看出
 * 哪些模型在等待时线程可以做别的事。
 *
 * 纯静态展示，无交互。Server Component。
 * viewBox 720×420，四周留白 ≥32，字号 ≥11。
 */

const VIEW_W = 720;
const VIEW_H = 420;

const ROWS = [
  { label: "阻塞 IO", wait: "warning", copy: "success", note: "全程阻塞，线程空等" },
  { label: "非阻塞 IO", wait: "warning", copy: "success", note: "轮询忙等，CPU 空转" },
  { label: "IO 多路复用", wait: "accent", copy: "success", note: "一个线程管多个 fd" },
  { label: "信号驱动 IO", wait: "accent", copy: "success", note: "内核通知，不轮询" },
  { label: "异步 IO", wait: "accent", copy: "accent", note: "内核全包，线程不等" },
];

const ROW_H = 44;
const ROW_GAP = 8;
const TABLE_TOP = 112;
const LABEL_W = 120;
const BAR_X = LABEL_W + 50;
const BAR_W = 420;
const WAIT_W = 260;
const COPY_W = BAR_W - WAIT_W;

export function CseIoModelDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="五种 IO 模型对比图。阻塞 IO 全程阻塞；非阻塞 IO 轮询忙等；IO 多路复用一个线程管多个文件描述符；信号驱动 IO 由内核通知；异步 IO 内核全包线程不等。时间轴展示等待数据与复制数据两个阶段。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* 标题 */}
          <text x={VIEW_W / 2} y="36" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            五大 IO 模型对比
          </text>
          <text x={VIEW_W / 2} y="58" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            等待数据阶段决定线程能否做别的事
          </text>

          {/* 时间轴标注 */}
          <text x={BAR_X + WAIT_W / 2} y="90" textAnchor="middle" fontSize="11" fill="var(--warning)" fontWeight="600">等待数据（kernel 等网卡）</text>
          <text x={BAR_X + WAIT_W + COPY_W / 2} y="90" textAnchor="middle" fontSize="11" fill="var(--success)" fontWeight="600">复制数据（kernel → user）</text>

          {/* 分隔线 */}
          <line x1={BAR_X + WAIT_W} y1="98" x2={BAR_X + WAIT_W} y2={TABLE_TOP + ROWS.length * (ROW_H + ROW_GAP) - ROW_GAP} stroke="var(--border)" strokeWidth="1" strokeDasharray="4 3" />

          {/* 行 */}
          {ROWS.map((row, i) => {
            const y = TABLE_TOP + i * (ROW_H + ROW_GAP);
            return (
              <g key={row.label}>
                {/* 标签 */}
                <rect x="40" y={y + 4} width={LABEL_W} height={ROW_H - 8} rx="6" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
                <text x={40 + LABEL_W / 2} y={y + ROW_H / 2 + 4} textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--text-primary)">{row.label}</text>

                {/* 等待段 */}
                <rect x={BAR_X} y={y + 8} width={WAIT_W} height={ROW_H - 16} rx="4" fill={`var(--${row.wait})`} fillOpacity="0.18" stroke={`var(--${row.wait})`} strokeWidth="1" />
                {/* 复制段 */}
                <rect x={BAR_X + WAIT_W} y={y + 8} width={COPY_W} height={ROW_H - 16} rx="4" fill={`var(--${row.copy})`} fillOpacity="0.18" stroke={`var(--${row.copy})`} strokeWidth="1" />

                {/* 说明 */}
                <text x={BAR_X + BAR_W + 12} y={y + ROW_H / 2 + 4} fontSize="11" fill="var(--text-secondary)">{row.note}</text>
              </g>
            );
          })}

          {/* 底部总结 */}
          <rect x="60" y="372" width={VIEW_W - 120} height="36" rx="10" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x={VIEW_W / 2} y="395" textAnchor="middle" fontSize="12" fill="var(--text-primary)">
            <tspan fontWeight="700" fill="var(--accent)">关键区别</tspan>
            <tspan>{"　"}</tspan>
            <tspan>前四种模型在「复制数据」阶段仍会阻塞，只有异步 IO 全程不阻塞</tspan>
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        五种 IO 模型的核心差异在「等待数据」阶段：阻塞 IO 线程空等，非阻塞 IO 忙轮询，IO 多路复用与信号驱动让线程在等待时可做别的，异步 IO 则连复制阶段都不阻塞。
      </figcaption>
    </figure>
  );
}
