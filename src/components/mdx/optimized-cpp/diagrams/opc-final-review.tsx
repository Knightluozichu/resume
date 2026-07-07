/**
 * <OpcFinalMindMap>：总复习思维导图（optimized-cpp 总复习章）。
 *
 * 中心节点「C++ 性能优化」，五条分支辐射到五大板块，
 * 每条分支下列出该板块的核心要点。
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * viewBox 720×480、四周留白 ≥32、字号 ≥11。
 */

const VIEW_W = 720;
const VIEW_H = 480;

type Branch = {
  id: string;
  name: string;
  color: string;
  x: number;
  y: number;
  points: string[];
};

const BRANCHES: readonly Branch[] = [
  {
    id: "mindset",
    name: "性能思维",
    color: "var(--accent)",
    x: 160,
    y: 100,
    points: ["测量优先", "90/10 法则", "闭环迭代"],
  },
  {
    id: "algo",
    name: "字符串与算法",
    color: "var(--success)",
    x: 560,
    y: 100,
    points: ["string_view", "reserve", "复杂度交叉", "缓存友好"],
  },
  {
    id: "memory",
    name: "内存管理",
    color: "var(--warning)",
    x: 160,
    y: 380,
    points: ["栈优先于堆", "对象池/arena", "减少 malloc"],
  },
  {
    id: "io",
    name: "I/O 与并发",
    color: "var(--danger)",
    x: 560,
    y: 380,
    points: ["缓冲/批量/异步", "锁竞争", "false sharing", "无锁结构"],
  },
  {
    id: "practice",
    name: "优化实践",
    color: "var(--accent)",
    x: 360,
    y: 420,
    points: ["perf/gprof", "Valgrind", "google-benchmark"],
  },
];

export function OpcFinalMindMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="C++ 性能优化指南总复习思维导图。中心节点 C++ 性能优化，五条分支：性能思维（测量优先、90/10 法则、闭环迭代）、字符串与算法（string_view、reserve、复杂度交叉、缓存友好）、内存管理（栈优先于堆、对象池/arena、减少 malloc）、I/O 与并发（缓冲/批量/异步、锁竞争、false sharing、无锁结构）、优化实践（perf/gprof、Valgrind、google-benchmark）。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* ===== 标题 ===== */}
          <text x={VIEW_W / 2} y="32" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            C++ 性能优化指南 · 全书思维导图
          </text>

          {/* ===== 连接线（先画，在节点下层）===== */}
          {BRANCHES.map((b) => (
            <line key={b.id} x1={VIEW_W / 2} y1={VIEW_H / 2} x2={b.x} y2={b.y} stroke={b.color} strokeWidth="1.4" strokeOpacity="0.5" />
          ))}

          {/* ===== 中心节点 ===== */}
          <circle cx={VIEW_W / 2} cy={VIEW_H / 2} r="52" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="2" />
          <text x={VIEW_W / 2} y={VIEW_H / 2 - 4} textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--accent)">C++</text>
          <text x={VIEW_W / 2} y={VIEW_H / 2 + 14} textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--accent)">性能优化</text>

          {/* ===== 五条分支 ===== */}
          {BRANCHES.map((b) => (
            <g key={b.id}>
              {/* 分支节点 */}
              <rect x={b.x - 70} y={b.y - 16} width="140" height="32" rx="8" fill={b.color} fillOpacity="0.12" stroke={b.color} strokeWidth="1.2" />
              <text x={b.x} y={b.y + 5} textAnchor="middle" fontSize="12" fontWeight="700" fill={b.color}>{b.name}</text>
              {/* 要点列表 */}
              {b.points.map((p, pi) => {
                const isLeft = b.x < VIEW_W / 2;
                const px = isLeft ? b.x - 80 : b.x + 80;
                const py = b.y - 20 + pi * 18;
                return (
                  <g key={pi}>
                    <line x1={b.x} y1={b.y} x2={px + (isLeft ? 60 : -60)} y2={py + 4} stroke={b.color} strokeWidth="1" strokeOpacity="0.3" />
                    <circle cx={px + (isLeft ? 60 : -60)} cy={py + 4} r="2.5" fill={b.color} />
                    <text x={px + (isLeft ? 54 : -54)} y={py + 8} textAnchor={isLeft ? "end" : "start"} fontSize="11" fill="var(--text-primary)">{p}</text>
                  </g>
                );
              })}
            </g>
          ))}

          {/* ===== 底部总结 ===== */}
          <rect x="60" y={VIEW_H - 36} width={VIEW_W - 120} height="24" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x={VIEW_W / 2} y={VIEW_H - 19} textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            主线：测量优先 → 从高频操作到内存分配 → 从 I/O 到并发 → 用工具链固化
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        全书五板块串联：性能思维建立测量驱动的方法论，字符串与算法从高频操作要速度，内存管理减少分配开销，I/O 与并发榨取硬件红利，优化实践用工具链量化与防回归。
      </figcaption>
    </figure>
  );
}
