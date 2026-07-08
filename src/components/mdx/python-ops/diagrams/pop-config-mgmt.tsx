/**
 * <PopConfigMgmtDiagram>：配置管理流程图。
 *
 * 声明式 YAML 配置 → Jinja2 模板渲染 → 分发到多节点，强调幂等性。
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

interface Stage {
  title: string;
  subtitle: string;
  detail: string;
  color: string;
  x: number;
}

const STAGES: readonly Stage[] = [
  { title: "声明式配置", subtitle: "YAML", detail: "期望状态", color: accent, x: 48 },
  { title: "模板渲染", subtitle: "Jinja2", detail: "变量替换", color: success, x: 232 },
  { title: "分发部署", subtitle: "Deploy", detail: "推送到节点", color: warning, x: 416 },
  { title: "幂等收敛", subtitle: "Idempotent", detail: "最终一致", color: danger, x: 600 },
];

const NODES = ["node-01", "node-02", "node-03", "node-04"];

export function PopConfigMgmtDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} role="img" aria-label="配置管理流程图：声明式 YAML 配置 → Jinja2 模板渲染 → 分发部署到多节点 → 幂等收敛至期望状态。" className="mx-auto block h-auto w-full max-w-[720px]">
          {/* 主标题 */}
          <text x={VIEW_W / 2} y={36} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            配置管理：从声明到收敛
          </text>
          <text x={VIEW_W / 2} y={56} textAnchor="middle" fontSize="11" fill={secondary}>
            声明期望状态 · 模板渲染 · 幂等分发 · 最终一致
          </text>

          {/* 四阶段管道 */}
          {STAGES.map((s, i) => (
            <g key={s.title}>
              <rect x={s.x} y={88} width={112} height={80} rx="10" fill={s.color} fillOpacity="0.1" stroke={s.color} strokeWidth="1.4" />
              <text x={s.x + 56} y={112} textAnchor="middle" fontSize="12" fontWeight="700" fill={s.color}>
                {s.title}
              </text>
              <text x={s.x + 56} y={130} textAnchor="middle" fontSize="11" fontWeight="600" fill={primary} fontFamily="monospace">
                {s.subtitle}
              </text>
              <text x={s.x + 56} y={148} textAnchor="middle" fontSize="11" fill={secondary}>
                {s.detail}
              </text>
              {/* 阶段间箭头 */}
              {i < STAGES.length - 1 && (
                <line x1={s.x + 112} y1={128} x2={STAGES[i + 1].x} y2={128} stroke={secondary} strokeWidth="1.4" markerEnd="url(#pop-cm-arrow)" />
              )}
            </g>
          ))}

          {/* 分隔线 */}
          <line x1={32} y1={196} x2={VIEW_W - 32} y2={196} stroke={border} strokeWidth="1" strokeDasharray="4 3" />

          {/* 下半区：YAML 示例 + 节点列表 */}
          {/* 左：YAML 配置示例 */}
          <rect x={48} y={214} width={300} height={120} rx="8" fill={elevated} stroke={border} strokeWidth="1" />
          <text x={64} y={234} fontSize="11" fontWeight="700" fill={accent} fontFamily="monospace">
            # site-config.yaml
          </text>
          <text x={64} y={252} fontSize="11" fill={primary} fontFamily="monospace">
            <tspan x={64} dy="0">port: 8080</tspan>
            <tspan x={64} dy="16">workers: 4</tspan>
            <tspan x={64} dy="16">log_level: info</tspan>
            <tspan x={64} dy="16">max_conn: 1024</tspan>
          </text>

          {/* 箭头：配置→节点 */}
          <line x1={348} y1={274} x2={400} y2={274} stroke={secondary} strokeWidth="1.4" markerEnd="url(#pop-cm-arrow)" />
          <text x={374} y={266} textAnchor="middle" fontSize="11" fill={secondary}>
            分发
          </text>

          {/* 右：目标节点列表 */}
          <rect x={400} y={214} width={272} height={120} rx="8" fill={elevated} stroke={border} strokeWidth="1" />
          <text x={536} y={234} textAnchor="middle" fontSize="12" fontWeight="700" fill={success}>
            目标节点（幂等收敛）
          </text>
          {NODES.map((n, i) => {
            const y = 256 + i * 18;
            return (
              <g key={n}>
                <circle cx={420} cy={y} r="4" fill={success} />
                <text x={434} y={y + 4} fontSize="11" fill={primary} fontFamily="monospace">
                  {n}
                </text>
                <text x={620} y={y + 4} textAnchor="end" fontSize="11" fill={success} fontFamily="monospace">
                  OK
                </text>
              </g>
            );
          })}

          <defs>
            <marker id="pop-cm-arrow" markerWidth="8" markerHeight="8" refX="4" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 z" fill="var(--text-secondary)" />
            </marker>
          </defs>

          {/* 底部总结 */}
          <line x1={32} y1={352} x2={VIEW_W - 32} y2={352} stroke={border} strokeWidth="1" strokeDasharray="4 3" />
          <text x={VIEW_W / 2} y={372} textAnchor="middle" fontSize="11" fill={secondary}>
            声明「想要什么」而非「怎么做」 · 幂等执行确保多次运行结果一致
          </text>
          <text x={VIEW_W / 2} y={390} textAnchor="middle" fontSize="11" fill={secondary}>
            配置漂移即偏差 · 收敛即修复 · 最终一致是目标
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        配置管理：声明式 YAML 经模板渲染后幂等分发到多节点，收敛至期望状态。
      </figcaption>
    </figure>
  );
}
