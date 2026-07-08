/**
 * <GiaFinalReviewDiagram>：Go 语言实战全书知识图谱。
 *
 * 以并发模型为圆心，辐射类型系统、接口、工程实践。
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

const NODES = [
  { label: "并发原生", x: 360, y: 200, r: 48, color: warning, center: true },
  { label: "切片 map struct", x: 180, y: 110, r: 36, color: accent },
  { label: "interface 隐式", x: 540, y: 110, r: 36, color: success },
  { label: "goroutine", x: 150, y: 230, r: 32, color: warning },
  { label: "channel CSP", x: 380, y: 340, r: 34, color: danger },
  { label: "context", x: 560, y: 230, r: 32, color: accent },
  { label: "标准库", x: 560, y: 330, r: 30, color: success },
];

export function GiaFinalReviewDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox="0 0 720 400" role="img" aria-label="Go 语言实战知识图谱：以并发原生为中心，辐射类型系统、接口、goroutine、channel、context、标准库。" className="mx-auto block h-auto w-full max-w-[720px]">
          <text x={360} y={28} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            Go 语言实战·知识图谱
          </text>
          <text x={360} y={46} textAnchor="middle" fontSize="11" fill={secondary}>
            并发是灵魂——CSP 模型 + 简洁类型 + 工程务实 = Go 之道
          </text>

          {NODES.filter((n) => !n.center).map((n) => (
            <line key={`l-${n.label}`} x1={360} y1={200} x2={n.x} y2={n.y} stroke={n.color} strokeWidth="1.2" strokeOpacity="0.4" />
          ))}

          {NODES.map((n) => (
            <g key={n.label}>
              <circle cx={n.x} cy={n.y} r={n.r} fill={n.color} fillOpacity={n.center ? "0.18" : "0.1"} stroke={n.color} strokeWidth={n.center ? "2" : "1.4"} />
              <text x={n.x} y={n.y + 4} textAnchor="middle" fontSize={n.center ? "13" : "10"} fontWeight={n.center ? "700" : "600"} fill={n.center ? primary : n.color}>
                {n.label}
              </text>
            </g>
          ))}

          <text x={150} y={86} textAnchor="middle" fontSize="10" fill={secondary}>核心类型</text>
          <text x={560} y={86} textAnchor="middle" fontSize="10" fill={secondary}>抽象机制</text>
          <text x={90} y={260} textAnchor="middle" fontSize="10" fill={secondary}>轻量调度</text>
          <text x={380} y={380} textAnchor="middle" fontSize="10" fill={secondary}>通信同步</text>
          <text x={620} y={260} textAnchor="middle" fontSize="10" fill={secondary}>取消超时</text>

          <line x1={36} y1={362} x2={684} y2={362} stroke={border} strokeWidth="1" strokeDasharray="4 3" />
          <text x={360} y={384} textAnchor="middle" fontSize="11" fill={secondary}>
            少即是多——用最少的特性组合出最强大的工程能力，这就是 Go 之道
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        并发原生为圆心，类型/接口/goroutine/channel/context/标准库围绕——Go 的工程哲学。
      </figcaption>
    </figure>
  );
}
