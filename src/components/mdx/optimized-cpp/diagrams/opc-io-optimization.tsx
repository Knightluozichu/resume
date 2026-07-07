/**
 * <OpcIoOptDiagram>：I/O 优化（optimized-cpp I/O 优化章）。
 *
 * 三行对比：逐字节 I/O（红，最慢）/ 缓冲 I/O（橙，快）/ 批量+异步 I/O（绿，最快）。
 * 每行一张横向卡片，含模式名、系统调用次数、吞吐评级。
 * 右侧用柱状条可视化相对吞吐。
 * 底部总结：减少系统调用、批量传输。
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * viewBox 720×440、四周留白 ≥32、字号 ≥11。
 */

const VIEW_W = 720;
const VIEW_H = 440;

type IoMode = {
  id: string;
  name: string;
  color: string;
  calls: string;
  throughput: string;
  barW: number;
  desc: string;
};

const MODES: readonly IoMode[] = [
  { id: "byte", name: "逐字节 I/O", color: "var(--danger)", calls: "N 次系统调用", throughput: "极慢", barW: 60, desc: "每读一字节一次 read() 系统调用" },
  { id: "buffered", name: "缓冲 I/O", color: "var(--warning)", calls: "N/B 次系统调用", throughput: "快", barW: 200, desc: "缓冲区满才触发系统调用" },
  { id: "batch", name: "批量 + 异步 I/O", color: "var(--success)", calls: "1 次系统调用", throughput: "最快", barW: 340, desc: "一次读大块 + 异步不阻塞" },
];

export function OpcIoOptDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="I/O 优化对比图。三行：逐字节 I/O（红色，N 次系统调用，极慢）、缓冲 I/O（橙色，N/B 次系统调用，快）、批量加异步 I/O（绿色，1 次系统调用，最快）。右侧柱状条可视化相对吞吐量。底部总结：减少系统调用、批量传输。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* ===== 标题 ===== */}
          <text x={VIEW_W / 2} y="36" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            I/O 优化 · 减少系统调用与批量传输
          </text>
          <text x={VIEW_W / 2} y="58" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            每次系统调用都有上下文切换开销——缓冲和批量是 I/O 优化的核心
          </text>

          {/* ===== 列头 ===== */}
          <text x="160" y="92" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--text-secondary)">I/O 模式</text>
          <text x="360" y="92" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--text-secondary)">系统调用次数</text>
          <text x="560" y="92" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--text-secondary)">相对吞吐量</text>

          {/* ===== 三行卡片 ===== */}
          {MODES.map((m, i) => {
            const y = 108 + i * 76;
            return (
              <g key={m.id}>
                {/* 行背景 */}
                <rect x="40" y={y} width={VIEW_W - 80} height="64" rx="8" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
                {/* 模式名 */}
                <rect x="52" y={y + 12} width="180" height="40" rx="6" fill={m.color} fillOpacity="0.12" stroke={m.color} strokeWidth="1" strokeOpacity="0.5" />
                <text x="142" y={y + 30} textAnchor="middle" fontSize="13" fontWeight="700" fill={m.color}>{m.name}</text>
                <text x="142" y={y + 46} textAnchor="middle" fontSize="10" fill="var(--text-secondary)">{m.desc}</text>
                {/* 系统调用次数 */}
                <text x="360" y={y + 30} textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--text-primary)">{m.calls}</text>
                <text x="360" y={y + 48} textAnchor="middle" fontSize="11" fill={m.color} fontWeight="700">{m.throughput}</text>
                {/* 吞吐柱状条 */}
                <rect x="470" y={y + 18} width="200" height="28" rx="6" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
                <rect x="472" y={y + 20} width={m.barW} height="24" rx="4" fill={m.color} fillOpacity="0.7" />
              </g>
            );
          })}

          {/* ===== 底部总结 ===== */}
          <rect x="60" y="360" width={VIEW_W - 120} height="56" rx="12" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.4" strokeOpacity="0.4" />
          <text x={VIEW_W / 2} y="384" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--text-primary)">
            I/O 优化三板斧：缓冲、批量、异步
          </text>
          <text x={VIEW_W / 2} y="404" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            缓冲减少系统调用次数，批量增大每次传输量，异步让 I/O 与计算重叠
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        I/O 的瓶颈是系统调用开销和上下文切换。缓冲（攒够一块再调用）、批量（一次传输大量数据）、异步（I/O 与计算重叠）三招组合能把 I/O 吞吐提升一到两个数量级。
      </figcaption>
    </figure>
  );
}
