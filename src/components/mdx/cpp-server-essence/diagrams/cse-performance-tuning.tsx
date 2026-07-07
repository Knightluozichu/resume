/**
 * <CsePerformanceTuningDiagram>：性能调优流程与瓶颈定位图。
 *
 * 左侧展示性能调优的循环流程：测量 → 分析 → 优化 → 验证 → 回到测量。
 * 右侧展示常见瓶颈层级（自下而上）：硬件 → 系统调用 → 协议栈 → 应用逻辑，
 * 每层标注典型瓶颈现象与对应工具。
 *
 * 纯静态展示，无交互。Server Component。
 * viewBox 720×420，四周留白 ≥32，字号 ≥11。
 */

const VIEW_W = 720;
const VIEW_H = 420;

const STEPS = [
  { label: "测量", desc: "建基线", color: "var(--accent)", angle: -90 },
  { label: "分析", desc: "定位热点", color: "var(--success)", angle: -18 },
  { label: "优化", desc: "改代码", color: "var(--warning)", angle: 54 },
  { label: "验证", desc: "回归测试", color: "var(--danger)", angle: 126 },
];

const LAYERS = [
  { name: "应用逻辑", bottleneck: "锁竞争 / 算法差", tool: "perf, gprof", color: "var(--danger)" },
  { name: "协议栈", bottleneck: "SYN 队列满 / TIME_WAIT", tool: "ss, netstat", color: "var(--warning)" },
  { name: "系统调用", bottleneck: "read/write 频繁", tool: "strace, ltrace", color: "var(--success)" },
  { name: "硬件", bottleneck: "CPU 瓶颈 / 网卡中断", tool: "top, mpstat", color: "var(--accent)" },
];

export function CsePerformanceTuningDiagram() {
  const cx = 140;
  const cy = 210;
  const r = 56;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="性能调优流程与瓶颈定位图。左侧循环流程：测量→分析→优化→验证。右侧自下而上四层瓶颈：硬件、系统调用、协议栈、应用逻辑，每层标注典型瓶颈与对应工具。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* 标题 */}
          <text x={VIEW_W / 2} y="36" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            性能调优：测量驱动的循环
          </text>
          <text x={VIEW_W / 2} y="58" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            不猜测，只测量；从最可能的瓶颈层入手
          </text>

          {/* ===== 左侧：调优循环 ===== */}
          <text x={cx} y="92" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--text-primary)">调优循环</text>

          {/* 循环箭头 */}
          <circle cx={cx} cy={cy} r={r} fill="none" stroke="var(--border)" strokeWidth="1.4" strokeDasharray="4 3" />

          {/* 步骤节点 */}
          {STEPS.map((s, i) => {
            const rad = (s.angle * Math.PI) / 180;
            const x = cx + r * Math.cos(rad);
            const y = cy + r * Math.sin(rad);
            return (
              <g key={s.label}>
                <circle cx={x} cy={y} r="22" fill={s.color} fillOpacity="0.12" stroke={s.color} strokeWidth="1.4" />
                <text x={x} y={y - 1} textAnchor="middle" fontSize="12" fontWeight="700" fill={s.color}>{s.label}</text>
                <text x={x} y={y + 12} textAnchor="middle" fontSize="10" fill="var(--text-secondary)">{s.desc}</text>
              </g>
            );
          })}

          {/* 中心说明 */}
          <text x={cx} y={cy - 4} textAnchor="middle" fontSize="11" fill="var(--text-secondary)">每一轮</text>
          <text x={cx} y={cy + 10} textAnchor="middle" fontSize="11" fill="var(--text-secondary)">拿数据说话</text>

          {/* ===== 右侧：瓶颈层级 ===== */}
          <text x="460" y="92" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--text-primary)">瓶颈分层定位</text>

          {/* 层级表格 */}
          {LAYERS.map((layer, i) => {
            const y = 108 + i * 52;
            return (
              <g key={layer.name}>
                <rect x="320" y={y} width="360" height="44" rx="8" fill={layer.color} fillOpacity="0.06" stroke={layer.color} strokeWidth="1" />
                <rect x="320" y={y} width="80" height="44" rx="8" fill={layer.color} fillOpacity="0.12" stroke="none" />
                <text x="360" y={y + 27} textAnchor="middle" fontSize="12" fontWeight="700" fill={layer.color}>{layer.name}</text>
                <text x="420" y={y + 20} fontSize="11" fill="var(--text-secondary)">瓶颈：{layer.bottleneck}</text>
                <text x="420" y={y + 36} fontSize="11" fill="var(--text-secondary)">工具：{layer.tool}</text>
              </g>
            );
          })}

          {/* 自下而上箭头 */}
          <line x1="300" y1="264" x2="300" y2="112" stroke="var(--text-secondary)" strokeWidth="1.2" markerEnd="url(#pt-arrow)" />
          <text x="288" y="190" textAnchor="middle" fontSize="11" fill="var(--text-secondary)" transform="rotate(-90, 288, 190)">从底向上排查</text>

          {/* 箭头标记 */}
          <defs>
            <marker id="pt-arrow" markerWidth="8" markerHeight="8" refX="4" refY="6" orient="auto">
              <path d="M1,1 L4,6 L7,1" fill="none" stroke="var(--text-secondary)" strokeWidth="1.2" />
            </marker>
          </defs>

          {/* 底部总结 */}
          <rect x="60" y="344" width={VIEW_W - 120} height="48" rx="10" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x={VIEW_W / 2} y="364" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--text-primary)">调优纪律</text>
          <text x={VIEW_W / 2} y="382" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">每次只改一个变量，测量前后对比；不优化非热点；优化后跑回归防回退</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        性能调优是测量驱动的循环：建基线、定位热点、改代码、验证效果。瓶颈从硬件到应用分四层，用对应工具逐层排查，每次只改一个变量。
      </figcaption>
    </figure>
  );
}
