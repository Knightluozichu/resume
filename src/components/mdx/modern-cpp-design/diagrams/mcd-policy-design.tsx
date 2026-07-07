/**
 * <McdPolicyDesignDiagram>：Policy 设计——编译时策略组合。
 *
 * 顶部三个 Policy 策略类（创建、检查、线程模型）汇入中间 Host 模板，
 * 编译时实例化生成具体类，零运行时开销。
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * viewBox 720×460，四周留白 ≥32，字号 ≥11。
 */

const VIEW_W = 720;
const VIEW_H = 460;

interface PolicyBox {
  name: string;
  desc: string;
  color: string;
  x: number;
}

const POLICIES: readonly PolicyBox[] = [
  { name: "CreationPolicy", desc: "创建策略", color: "var(--accent)", x: 60 },
  { name: "CheckingPolicy", desc: "检查策略", color: "var(--success)", x: 270 },
  { name: "ThreadingModel", desc: "线程模型", color: "var(--warning)", x: 480 },
];
const POLICY_W = 180;
const POLICY_Y = 86;
const POLICY_H = 60;

const HOST_X = 150;
const HOST_Y = 200;
const HOST_W = 420;
const HOST_H = 66;

const RESULT_X = 180;
const RESULT_Y = 330;
const RESULT_W = 360;
const RESULT_H = 58;

export function McdPolicyDesignDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Policy 设计示意。顶部三个策略类：CreationPolicy 创建策略（紫色）、CheckingPolicy 检查策略（绿色）、ThreadingModel 线程模型（暖色），三者汇入中间 Host 模板组合，编译时实例化生成具体类 WidgetManager，零运行时开销。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <defs>
            <marker id="mcd-policy-arrow" markerWidth="9" markerHeight="9" refX="7" refY="3" orient="auto">
              <path d="M0 0 L7 3 L0 6 z" fill="var(--text-secondary)" />
            </marker>
          </defs>

          {/* 主标题 */}
          <text x={VIEW_W / 2} y={32} textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            Policy 设计：编译时策略组合
          </text>
          <text x={VIEW_W / 2} y={54} textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            策略类作为模板参数，组合优先于继承，零开销抽象
          </text>

          {/* 三个策略框 */}
          {POLICIES.map((p) => (
            <g key={p.name}>
              <rect x={p.x} y={POLICY_Y} width={POLICY_W} height={POLICY_H} rx="8" fill={p.color} fillOpacity="0.10" stroke={p.color} strokeWidth="1.6" />
              <text x={p.x + POLICY_W / 2} y={POLICY_Y + 26} textAnchor="middle" fontSize="13" fontWeight="700" fill={p.color} fontFamily="monospace">
                {p.name}
              </text>
              <text x={p.x + POLICY_W / 2} y={POLICY_Y + 46} textAnchor="middle" fontSize="11" fill="var(--text-primary)">
                {p.desc}
              </text>
            </g>
          ))}

          {/* 策略 → Host 箭头 */}
          {POLICIES.map((p) => (
            <line
              key={`pa-${p.name}`}
              x1={p.x + POLICY_W / 2}
              y1={POLICY_Y + POLICY_H}
              x2={VIEW_W / 2}
              y2={HOST_Y}
              stroke="var(--text-secondary)"
              strokeWidth="1.4"
              strokeOpacity="0.6"
              markerEnd="url(#mcd-policy-arrow)"
            />
          ))}

          {/* Host 组合框 */}
          <rect x={HOST_X} y={HOST_Y} width={HOST_W} height={HOST_H} rx="10" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="2" />
          <text x={VIEW_W / 2} y={HOST_Y + 28} textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)" fontFamily="monospace">
            {"Host<CreationPolicy, CheckingPolicy, ThreadingModel>"}
          </text>
          <text x={VIEW_W / 2} y={HOST_Y + 50} textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            继承各 Policy 或以 Policy 为成员，编译时确定行为
          </text>

          {/* Host → Result 箭头 */}
          <line x1={VIEW_W / 2} y1={HOST_Y + HOST_H} x2={VIEW_W / 2} y2={RESULT_Y} stroke="var(--text-secondary)" strokeWidth="1.6" markerEnd="url(#mcd-policy-arrow)" />

          {/* 结果框 */}
          <rect x={RESULT_X} y={RESULT_Y} width={RESULT_W} height={RESULT_H} rx="8" fill="var(--success)" fillOpacity="0.10" stroke="var(--success)" strokeWidth="1.6" />
          <text x={VIEW_W / 2} y={RESULT_Y + 26} textAnchor="middle" fontSize="12.5" fontWeight="700" fill="var(--success)" fontFamily="monospace">
            {"WidgetManager<...>"}
          </text>
          <text x={VIEW_W / 2} y={RESULT_Y + 46} textAnchor="middle" fontSize="11" fill="var(--text-primary)">
            编译时生成具体类 · 零虚函数 · 零运行时开销
          </text>

          {/* 底部说明 */}
          <line x1={32} y1={416} x2={VIEW_W - 32} y2={416} stroke="var(--border)" strokeWidth="1" strokeDasharray="4 3" />
          <text x={VIEW_W / 2} y={438} textAnchor="middle" fontSize="11.5" fill="var(--text-secondary)">
            把策略设计成模板参数，用组合取代继承层级，行为在编译期定型
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Policy 设计：三个策略类作为模板参数注入 Host，编译时实例化为具体类，零运行时开销。
      </figcaption>
    </figure>
  );
}
