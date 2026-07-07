/**
 * <EcsFinalReviewDiagram>：Effective C# 总复习思维导图。
 *
 * 中心：Effective C# 50 条建议
 * 四象限对应四大板块，每象限列关键条款与核心要点
 *   - 语言习惯：属性优先、readonly、is/as
 *   - 资源管理：IDisposable、using、值类型
 *   - 泛型与 LINQ：约束最小化、延迟执行
 *   - 并发设计：异常、异步、相等性
 *
 * 纯静态展示，无交互。Server Component。
 * viewBox 720×420，四周留白 ≥32，字号 ≥11。
 */

const VIEW_W = 720;
const VIEW_H = 420;

const accent = "var(--accent)";
const success = "var(--success)";
const warning = "var(--warning)";
const danger = "var(--danger)";
const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";

const QUADRANTS: { title: string; items: string[]; color: string; x: number; y: number }[] = [
  { title: "语言习惯", color: accent, x: 60, y: 88, items: ["属性优先于字段", "readonly 优于 const", "is/as 优于强转"] },
  { title: "资源管理", color: success, x: 410, y: 88, items: ["IDisposable 模式", "using 确定性释放", "值类型 vs 引用类型"] },
  { title: "泛型与 LINQ", color: warning, x: 60, y: 244, items: ["约束最小化", "延迟执行", "避免重复枚举"] },
  { title: "并发设计", color: danger, x: 410, y: 244, items: ["异常过滤器", "Task.WhenAll 并行", "相等性与哈希"] },
];

export function EcsFinalReviewDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Effective C# 总复习思维导图。中心 Effective C# 50 条建议，四象限：语言习惯含属性优先、readonly、is/as；资源管理含 IDisposable、using、值类型；泛型与 LINQ 含约束最小化、延迟执行、避免重复枚举；并发设计含异常过滤器、Task.WhenAll、相等性。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <defs>
            <marker id="ecs-fr-arrow" markerWidth="9" markerHeight="9" refX="7" refY="3" orient="auto">
              <path d="M0 0 L7 3 L0 6 z" fill={secondary} />
            </marker>
          </defs>

          {/* 主标题 */}
          <text x={VIEW_W / 2} y={34} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            Effective C# · 总复习
          </text>
          <text x={VIEW_W / 2} y={56} textAnchor="middle" fontSize="11" fill={secondary}>
            50 条建议 · 四大板块 · 一以贯之的工程准则
          </text>

          {/* 中心节点 */}
          <g>
            <ellipse cx={360} cy={176} rx={92} ry={32} fill={accent} fillOpacity="0.14" stroke={accent} strokeWidth="2" />
            <text x={360} y={172} textAnchor="middle" fontSize="13" fontWeight="700" fill={accent}>
              Effective C#
            </text>
            <text x={360} y={190} textAnchor="middle" fontSize="11" fill={secondary}>
              50 条建议
            </text>
          </g>

          {/* 四象限连接线 */}
          <line x1={290} y1={150} x2={250} y2={120} stroke={secondary} strokeWidth="1.2" strokeDasharray="3 3" />
          <line x1={430} y1={150} x2={470} y2={120} stroke={secondary} strokeWidth="1.2" strokeDasharray="3 3" />
          <line x1={290} y1={200} x2={250} y2={250} stroke={secondary} strokeWidth="1.2" strokeDasharray="3 3" />
          <line x1={430} y1={200} x2={470} y2={250} stroke={secondary} strokeWidth="1.2" strokeDasharray="3 3" />

          {/* 四象限 */}
          {QUADRANTS.map((q) => (
            <g key={q.title}>
              <rect x={q.x} y={q.y} width={250} height={120} rx="10" fill={q.color} fillOpacity="0.05" stroke={q.color} strokeWidth="1.6" />
              <rect x={q.x} y={q.y} width={250} height={26} rx="10" fill={q.color} fillOpacity="0.12" />
              <text x={q.x + 125} y={q.y + 18} textAnchor="middle" fontSize="12.5" fontWeight="700" fill={q.color}>
                {q.title}
              </text>
              {q.items.map((item, i) => (
                <g key={item}>
                  <circle cx={q.x + 18} cy={q.y + 48 + i * 24} r="3.5" fill={q.color} fillOpacity="0.6" />
                  <text x={q.x + 30} y={q.y + 52 + i * 24} fontSize="11.5" fill={primary}>
                    {item}
                  </text>
                </g>
              ))}
            </g>
          ))}

          {/* 底部总结 */}
          <line x1={32} y1={376} x2={VIEW_W - 32} y2={376} stroke={border} strokeWidth="1" strokeDasharray="4 3" />
          <text x={VIEW_W / 2} y={398} textAnchor="middle" fontSize="12" fill={secondary}>
            习惯奠基 · 资源管控 · 泛型抽象 · 并发收口
          </text>
          <text x={VIEW_W / 2} y={414} textAnchor="middle" fontSize="11" fill={secondary}>
            每条建议都是「让类型系统替你兜底」的工程准则
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        四大板块汇总：语言习惯奠基、资源管理管控、泛型与 LINQ 抽象、并发设计收口。Effective C# 的核心主线是让类型系统与运行时替开发者兜底，把人为错误交给编译器与框架。
      </figcaption>
    </figure>
  );
}
