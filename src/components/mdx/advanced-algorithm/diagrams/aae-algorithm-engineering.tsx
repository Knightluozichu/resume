/**
 * <AaeAlgorithmEngineeringDiagram>：算法工程化实践流程图（advanced-algorithm 工程化章）。
 *
 * 从「算法理论」到「生产系统」的工程化路径，5 个阶段横向推进：
 *   1. 理论分析（accent）：复杂度证明 · 正确性论证 → 产出：复杂度界
 *   2. 原型实现（success）：正确性验证 · 单元测试 → 产出：可运行原型
 *   3. 性能调优（warning）：缓存 · SIMD · 常量折叠 → 产出：优化实现
 *   4. 压测基准（accent）：Benchmark · 对比基线 → 产出：性能数据
 *   5. 生产部署（success）：监控 · 降级 · 灰度 → 产出：上线服务
 * 阶段间用箭头连接，顶部标注从理论到生产的方向。
 *
 * 纯静态展示，无交互。纯服务端组件，无客户端指令。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * viewBox 720×340（宽 ≥720），四周留白 ≥32，字号 ≥11。
 */

const VIEW_W = 720;
const VIEW_H = 340;

const accent = "var(--accent)";
const success = "var(--success)";
const warning = "var(--warning)";
const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";

const STAGE_W = 122;
const STAGE_X = [11, 155, 299, 443, 587];
const STAGE_Y = 92;
const STAGE_H = 200;

interface StageDef {
  num: string;
  name: string;
  act1: string;
  act2: string;
  output: string;
  color: string;
}

const STAGES: readonly StageDef[] = [
  { num: "1", name: "理论分析", act1: "复杂度证明", act2: "正确性论证", output: "复杂度界", color: accent },
  { num: "2", name: "原型实现", act1: "正确性验证", act2: "单元测试", output: "可运行原型", color: success },
  { num: "3", name: "性能调优", act1: "缓存 · SIMD", act2: "常量折叠", output: "优化实现", color: warning },
  { num: "4", name: "压测基准", act1: "Benchmark", act2: "对比基线", output: "性能数据", color: accent },
  { num: "5", name: "生产部署", act1: "监控 · 降级", act2: "灰度发布", output: "上线服务", color: success },
];

export function AaeAlgorithmEngineeringDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="算法工程化实践流程图。从算法理论到生产系统的五个阶段横向推进：1 理论分析（复杂度证明、正确性论证，产出复杂度界）；2 原型实现（正确性验证、单元测试，产出可运行原型）；3 性能调优（缓存、SIMD、常量折叠，产出优化实现）；4 压测基准（Benchmark、对比基线，产出性能数据）；5 生产部署（监控、降级、灰度，产出上线服务）。阶段间箭头连接。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <defs>
            <marker id="ae-gap" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 z" fill={secondary} />
            </marker>
            <marker id="ae-rail" markerWidth="10" markerHeight="10" refX="8" refY="4" orient="auto">
              <path d="M0 0 L8 4 L0 8 z" fill={primary} />
            </marker>
          </defs>

          {/* 主标题 */}
          <text x={VIEW_W / 2} y={28} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            算法工程化 · 从理论到生产
          </text>

          {/* 顶部方向轨道：理论 → 生产 */}
          <text x={48} y={60} fontSize="11.5" fontWeight="700" fill={secondary}>算法理论</text>
          <line x1={96} y1={56} x2={610} y2={56} stroke={primary} strokeWidth="1.6" markerEnd="url(#ae-rail)" />
          <text x={672} y={60} textAnchor="end" fontSize="11.5" fontWeight="700" fill={secondary}>生产系统</text>

          {/* 阶段间小箭头（在数字圆圈行） */}
          {STAGE_X.slice(0, -1).map((sx, i) => (
            <line
              key={`gap-${i}`}
              x1={sx + STAGE_W + 2}
              y1={STAGE_Y + 24}
              x2={STAGE_X[i + 1] - 4}
              y2={STAGE_Y + 24}
              stroke={secondary}
              strokeWidth="1.4"
              markerEnd="url(#ae-gap)"
            />
          ))}

          {/* 五个阶段卡片 */}
          {STAGES.map((s, i) => {
            const x = STAGE_X[i];
            const cx = x + STAGE_W / 2;
            return (
              <g key={s.name}>
                {/* 卡片背景 */}
                <rect x={x} y={STAGE_Y} width={STAGE_W} height={STAGE_H} rx="10" fill={s.color} fillOpacity="0.05" stroke={s.color} strokeWidth="1.6" strokeOpacity="0.5" />
                {/* 编号圆 */}
                <circle cx={cx} cy={STAGE_Y + 24} r="14" fill={s.color} fillOpacity="0.18" stroke={s.color} strokeWidth="1.6" />
                <text x={cx} y={STAGE_Y + 29} textAnchor="middle" fontSize="13" fontWeight="700" fill={s.color} fontFamily="monospace">
                  {s.num}
                </text>
                {/* 阶段名 */}
                <text x={cx} y={STAGE_Y + 62} textAnchor="middle" fontSize="13" fontWeight="700" fill={s.color}>
                  {s.name}
                </text>
                {/* 活动 */}
                <text x={cx} y={STAGE_Y + 88} textAnchor="middle" fontSize="11" fill={primary}>
                  {s.act1}
                </text>
                <text x={cx} y={STAGE_Y + 106} textAnchor="middle" fontSize="11" fill={primary}>
                  {s.act2}
                </text>
                {/* 分隔线 */}
                <line x1={x + 12} y1={STAGE_Y + 124} x2={x + STAGE_W - 12} y2={STAGE_Y + 124} stroke={border} strokeWidth="1" strokeDasharray="3 3" />
                {/* 产出 */}
                <rect x={x + 12} y={STAGE_Y + 136} width={STAGE_W - 24} height={20} rx="4" fill={s.color} fillOpacity="0.12" stroke={s.color} strokeWidth="1" strokeOpacity="0.5" />
                <text x={cx} y={STAGE_Y + 150} textAnchor="middle" fontSize="10" fontWeight="700" fill={s.color}>
                  产出
                </text>
                <text x={cx} y={STAGE_Y + 180} textAnchor="middle" fontSize="11.5" fontWeight="600" fill={primary}>
                  {s.output}
                </text>
              </g>
            );
          })}

          {/* 底部总结 */}
          <line x1={32} y1={312} x2={VIEW_W - 32} y2={312} stroke={border} strokeWidth="1" strokeDasharray="4 3" />
          <text x={VIEW_W / 2} y={330} textAnchor="middle" fontSize="11.5" fill={secondary}>
            理论奠基 → 原型验证 → 调优提效 → 基准量化 → 稳健上线
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        算法工程化五阶段：理论分析（复杂度界）→ 原型实现（可运行原型）→ 性能调优（优化实现）→ 压测基准（性能数据）→ 生产部署（上线服务），从算法理论推进到生产系统。
      </figcaption>
    </figure>
  );
}
