/**
 * <RswFinalReviewDiagram>：Rust 编程之道全书知识图谱。
 *
 * 以所有权为圆心，辐射出类型系统、安全、并发、工程四大领域的核心概念。
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
  { label: "所有权", x: 360, y: 200, r: 46, color: accent, center: true },
  { label: "借用 & &mut", x: 200, y: 110, r: 34, color: accent },
  { label: "生命周期 'a", x: 520, y: 110, r: 34, color: success },
  { label: "Trait/泛型", x: 150, y: 220, r: 34, color: success },
  { label: "Result/? ", x: 570, y: 220, r: 34, color: warning },
  { label: "unsafe 边界", x: 200, y: 320, r: 34, color: danger },
  { label: "Send/Sync", x: 380, y: 340, r: 30, color: warning },
  { label: "async/Future", x: 540, y: 320, r: 34, color: danger },
];

export function RswFinalReviewDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox="0 0 720 400" role="img" aria-label="Rust 编程之道知识图谱：以所有权为中心，辐射借用、生命周期、Trait、错误处理、unsafe、并发、async。" className="mx-auto block h-auto w-full max-w-[720px]">
          <text x={360} y={28} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            Rust 编程之道·知识图谱
          </text>
          <text x={360} y={46} textAnchor="middle" fontSize="11" fill={secondary}>
            所有权是万流归宗的圆心——一切特性都为安全与性能服务
          </text>

          {/* 连线 */}
          {NODES.filter((n) => !n.center).map((n) => (
            <line key={`l-${n.label}`} x1={360} y1={200} x2={n.x} y2={n.y} stroke={n.color} strokeWidth="1.2" strokeOpacity="0.4" />
          ))}

          {/* 节点 */}
          {NODES.map((n) => (
            <g key={n.label}>
              <circle cx={n.x} cy={n.y} r={n.r} fill={n.color} fillOpacity={n.center ? "0.18" : "0.1"} stroke={n.color} strokeWidth={n.center ? "2" : "1.4"} />
              <text x={n.x} y={n.y + 4} textAnchor="middle" fontSize={n.center ? "13" : "10"} fontWeight={n.center ? "700" : "600"} fill={n.center ? primary : n.color}>
                {n.label}
              </text>
            </g>
          ))}

          {/* 四象限标签 */}
          <text x={150} y={86} textAnchor="middle" fontSize="10" fill={secondary}>类型系统</text>
          <text x={570} y={86} textAnchor="middle" fontSize="10" fill={secondary}>错误处理</text>
          <text x={120} y={300} textAnchor="middle" fontSize="10" fill={secondary}>安全边界</text>
          <text x={600} y={300} textAnchor="middle" fontSize="10" fill={secondary}>并发与异步</text>

          <line x1={36} y1={362} x2={684} y2={362} stroke={border} strokeWidth="1" strokeDasharray="4 3" />
          <text x={360} y={382} textAnchor="middle" fontSize="11" fill={secondary}>
            零成本抽象：编译期检查安全，运行期不付额外代价——这就是 Rust 之道
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        所有权为圆心，借用/生命周期/类型/错误/安全/并发围绕展开——Rust 的统一世界观。
      </figcaption>
    </figure>
  );
}
