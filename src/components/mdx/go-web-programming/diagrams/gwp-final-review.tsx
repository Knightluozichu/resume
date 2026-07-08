/**
 * <GwpFinalReviewDiagram>: Go Web 编程全书知识图谱。
 *
 * 以请求生命周期为核心，串联全书四大板块的知识点，
 * 展示从 HTTP 基础到生产部署的完整知识脉络。
 * 纯静态 SVG，Server Component。viewBox 720x400。
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

interface Node {
  label: string;
  x: number;
  y: number;
  color: string;
}

const NODES: readonly Node[] = [
  { label: "HTTP 请求/响应", x: 360, y: 60, color: accent },
  { label: "路由匹配", x: 160, y: 120, color: success },
  { label: "中间件链", x: 560, y: 120, color: success },
  { label: "Handler", x: 360, y: 140, color: accent },
  { label: "数据库", x: 100, y: 210, color: warning },
  { label: "模板渲染", x: 260, y: 210, color: warning },
  { label: "JSON API", x: 460, y: 210, color: warning },
  { label: "Session/JWT", x: 620, y: 210, color: danger },
  { label: "结构化日志", x: 180, y: 290, color: danger },
  { label: "配置管理", x: 360, y: 290, color: danger },
  { label: "优雅关闭", x: 540, y: 290, color: danger },
];

const EDGES: readonly [number, number][] = [
  [0, 1], [0, 2], [0, 3],
  [1, 3], [2, 3],
  [3, 4], [3, 5], [3, 6], [3, 7],
  [4, 8], [5, 8], [6, 9], [7, 9],
  [8, 10], [9, 10],
];

export function GwpFinalReviewDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} role="img" aria-label="Go Web 编程全书知识图谱。以 HTTP 请求生命周期为核心，串联路由、中间件、数据库、模板、JSON API、认证和部署运维知识点。" className="mx-auto block h-auto w-full max-w-[720px]">
          <text x={VIEW_W / 2} y={26} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            Go Web 编程知识图谱
          </text>
          <text x={VIEW_W / 2} y={42} textAnchor="middle" fontSize="11" fill={secondary}>
            请求进 → 路由分发 → 中间件处理 → 数据存取 → 认证鉴权 → 响应出 → 运维保障
          </text>

          {/* 板块色标 */}
          <rect x={32} y={360} width={12} height={12} rx="2" fill={accent} fillOpacity="0.6" />
          <text x={50} y={370} fontSize="10" fill={secondary}>Web 基础</text>
          <rect x={130} y={360} width={12} height={12} rx="2" fill={success} fillOpacity="0.6" />
          <text x={148} y={370} fontSize="10" fill={secondary}>路由/中间件</text>
          <rect x={250} y={360} width={12} height={12} rx="2" fill={warning} fillOpacity="0.6" />
          <text x={268} y={370} fontSize="10" fill={secondary}>数据层</text>
          <rect x={330} y={360} width={12} height={12} rx="2" fill={danger} fillOpacity="0.6" />
          <text x={348} y={370} fontSize="10" fill={secondary}>生产部署</text>

          {/* 连线 */}
          {EDGES.map(([from, to], i) => {
            const f = NODES[from];
            const t = NODES[to];
            return (
              <line
                key={i}
                x1={f.x}
                y1={f.y}
                x2={t.x}
                y2={t.y}
                stroke={border}
                strokeWidth="1"
                strokeOpacity="0.6"
                strokeDasharray="3 2"
              />
            );
          })}

          {/* 节点 */}
          {NODES.map((n) => (
            <g key={n.label}>
              <rect
                x={n.x - 60}
                y={n.y - 14}
                width={120}
                height={28}
                rx="6"
                fill={n.color}
                fillOpacity="0.12"
                stroke={n.color}
                strokeWidth="1.4"
              />
              <text x={n.x} y={n.y + 4} textAnchor="middle" fontSize="10" fontWeight="600" fill={n.color}>
                {n.label}
              </text>
            </g>
          ))}

          {/* 核心标注 */}
          <text x={360} y={120} textAnchor="middle" fontSize="9" fill={secondary} fontStyle="italic">
            请求生命周期
          </text>

          {/* 底部总结 */}
          <line x1={32} y1={340} x2={VIEW_W - 32} y2={340} stroke={border} strokeWidth="1" strokeDasharray="4 3" />
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        全书以请求生命周期为轴，从 HTTP 基础到生产部署形成完整知识闭环。
      </figcaption>
    </figure>
  );
}
