/**
 * <TeamArchitectureMappingDiagram />：《Android 设计模式》「团队与架构」章配图。
 *
 * 画面内容：左侧团队角色（圆形节点）+ 右侧代码模块（矩形节点），连接线表达归属关系。
 *  - 左侧：PM / Android Dev 1 / Android Dev 2 / QA 四个圆形角色节点。
 *  - 右侧：feature-a/ / feature-b/ / shared/core/ / tests/ 四个矩形模块节点。
 *  - 连线：Dev1 → feature-a（实线），Dev2 → feature-b（实线），QA → tests（虚线）。
 *  - PM → 全局虚线连接所有模块。
 *  - 底部 Conway's Law 洞察文字。
 *
 * Server Component（纯展示，静态 SVG，无交互）。
 */

// —— 角色节点定义 ——
interface TeamRole {
  id: string;
  label: string;
  subtitle: string;
  color: string;
}

const ROLES: readonly TeamRole[] = [
  { id: "pm", label: "PM", subtitle: "产品经理", color: "var(--accent)" },
  { id: "dev1", label: "Dev 1", subtitle: "Android 开发", color: "var(--success)" },
  { id: "dev2", label: "Dev 2", subtitle: "Android 开发", color: "var(--success)" },
  { id: "qa", label: "QA", subtitle: "测试工程师", color: "var(--warning)" },
];

// —— 模块节点定义 ——
interface CodeModule {
  id: string;
  label: string;
  color: string;
}

const MODULES: readonly CodeModule[] = [
  { id: "feature-a", label: "feature-a/", color: "var(--success)" },
  { id: "feature-b", label: "feature-b/", color: "var(--success)" },
  { id: "shared", label: "shared/core/", color: "var(--accent)" },
  { id: "tests", label: "tests/", color: "var(--warning)" },
];

// —— 布局常量（间距走 4 的倍数） ——
const VIEW_W = 720;
const VIEW_H = 490;
const LEFT_X = 80; // 角色列圆心 x
const RIGHT_X = 520; // 模块列 x
const GAP_Y = 80; // 节点垂直间距
const ROLE_START_Y = 100; // 第一个角色圆心 y
const MOD_START_Y = 90; // 第一个模块左上角 y
const ROLE_R = 28; // 角色圆半径
const MOD_W = 140; // 模块矩形宽
const MOD_H = 44; // 模块矩形高
const INSIGHT_Y = 428; // 底部洞察文字 y

/** 计算第 i 个角色的圆心 y。 */
function roleY(index: number): number {
  return ROLE_START_Y + index * GAP_Y;
}

/** 计算第 i 个模块的左上角 y。 */
function modY(index: number): number {
  return MOD_START_Y + index * GAP_Y;
}

export function TeamArchitectureMappingDiagram() {
  const renderSteppedLine = (
    x1: number,
    y1: number,
    y2: number,
    x2: number,
    color: string,
    width: number,
    dash?: string,
    opacity?: number
  ) => {
    const midX = 240;
    return (
      <g>
        <line
          x1={x1}
          y1={y1}
          x2={midX}
          y2={y1}
          stroke={color}
          strokeWidth={width}
          strokeDasharray={dash}
          opacity={opacity}
        />
        <line
          x1={midX}
          y1={y1}
          x2={midX}
          y2={y2}
          stroke={color}
          strokeWidth={width}
          strokeDasharray={dash}
          opacity={opacity}
        />
        <line
          x1={midX}
          y1={y2}
          x2={x2}
          y2={y2}
          stroke={color}
          strokeWidth={width}
          strokeDasharray={dash}
          opacity={opacity}
        />
      </g>
    );
  };

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="团队与架构映射图。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* 列标题 */}
          <text x={LEFT_X} y="36" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--text-primary)">
            团队角色
          </text>
          <text x={RIGHT_X + MOD_W / 2} y="36" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--text-primary)">
            代码模块
          </text>

          {/* 列间分隔虚线 */}
          <line x1={240} y1={48} x2={240} y2={VIEW_H - 88} stroke="var(--border)" strokeWidth="1" strokeDasharray="4 6" opacity="0.5" />

          {/* —— 连线（先画，压在节点后面，stair-step 且带 gap 防止 label 重叠） —— */}

          {/* Dev 1 -> feature-a: owns */}
          <g>
            <line x1={108} y1={roleY(1)} x2={146} y2={roleY(1)} stroke="var(--success)" strokeWidth="2" opacity="0.7" />
            {renderSteppedLine(202, roleY(1), modY(0) + MOD_H / 2, RIGHT_X, "var(--success)", 2, undefined, 0.7)}
            <text x="174" y={roleY(1) + 4} textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)" opacity="0.8">owns</text>
          </g>

          {/* Dev 2 -> feature-b: owns */}
          <g>
            <line x1={108} y1={roleY(2)} x2={146} y2={roleY(2)} stroke="var(--success)" strokeWidth="2" opacity="0.7" />
            {renderSteppedLine(202, roleY(2), modY(1) + MOD_H / 2, RIGHT_X, "var(--success)", 2, undefined, 0.7)}
            <text x="174" y={roleY(2) + 4} textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)" opacity="0.8">owns</text>
          </g>

          {/* QA -> tests: owns */}
          <g>
            <line x1={108} y1={roleY(3)} x2={146} y2={roleY(3)} stroke="var(--warning)" strokeWidth="1.6" strokeDasharray="5 4" opacity="0.45" />
            {renderSteppedLine(202, roleY(3), modY(3) + MOD_H / 2, RIGHT_X, "var(--warning)", 1.6, "5 4", 0.45)}
            <text x="174" y={roleY(3) + 4} textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)" opacity="0.8">owns</text>
          </g>

          {/* PM -> all modules (dashed lines) */}
          <g>
            {/* PM to feature-a */}
            {renderSteppedLine(108, roleY(0), modY(0) + MOD_H / 2, RIGHT_X, "var(--accent)", 1.6, "5 4", 0.35)}
            {/* PM to feature-b */}
            {renderSteppedLine(108, roleY(0), modY(1) + MOD_H / 2, RIGHT_X, "var(--accent)", 1.6, "5 4", 0.35)}
            {/* PM to shared */}
            {renderSteppedLine(108, roleY(0), modY(2) + MOD_H / 2, RIGHT_X, "var(--accent)", 1.6, "5 4", 0.35)}
            {/* PM to tests */}
            {renderSteppedLine(108, roleY(0), modY(3) + MOD_H / 2, RIGHT_X, "var(--accent)", 1.6, "5 4", 0.35)}
          </g>

          {/* —— 角色节点（圆形） —— */}
          {ROLES.map((role, i) => {
            const cy = roleY(i);
            return (
              <g key={role.id}>
                <circle
                  cx={LEFT_X}
                  cy={cy}
                  r={ROLE_R}
                  fill={role.color}
                  fillOpacity="0.12"
                  stroke={role.color}
                  strokeWidth="2"
                />
                <text x={LEFT_X} y={cy - 2} textAnchor="middle" fontSize="13" fontWeight="700" fill={role.color}>
                  {role.label}
                </text>
                <text x={LEFT_X} y={cy + 14} textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
                  {role.subtitle}
                </text>
              </g>
            );
          })}

          {/* —— 模块节点（矩形） —— */}
          {MODULES.map((mod, i) => {
            const my = modY(i);
            return (
              <g key={mod.id}>
                <rect
                  x={RIGHT_X}
                  y={my}
                  width={MOD_W}
                  height={MOD_H}
                  rx="8"
                  fill={mod.color}
                  fillOpacity="0.1"
                  stroke={mod.color}
                  strokeWidth="1.8"
                />
                <text
                  x={RIGHT_X + MOD_W / 2}
                  y={my + MOD_H / 2 + 4}
                  textAnchor="middle"
                  fontSize="12"
                  fontWeight="600"
                  fontFamily="var(--font-mono)"
                  fill="var(--text-primary)"
                >
                  {mod.label}
                </text>
              </g>
            );
          })}

          {/* —— 底部 Conway's Law 洞察 —— */}
          <rect x={24} y={INSIGHT_Y - 12} width={VIEW_W - 48} height="52" rx="6" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
          <text x={VIEW_W / 2} y={INSIGHT_Y + 8} textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">
            架构不只是运行时的分层，还是人找代码的地图
          </text>
          <text x={VIEW_W / 2} y={INSIGHT_Y + 26} textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            Conway&apos;s Law：系统结构会镜像团队沟通结构
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        团队角色与代码模块的映射关系。每个开发者拥有自己的特性模块，QA 拥有测试，PM 全局感知所有模块。
        Conway&apos;s Law 揭示：系统架构会自然收敛为团队沟通拓扑。
      </figcaption>
    </figure>
  );
}
