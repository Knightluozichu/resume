/**
 * <AssEnginePerformanceDiagram>：发动机性能与增压技术对比图。
 *
 * 上半部分对比两条进气路径：
 *   - 自然吸气 NA：空气滤清器 → 节气门 → 进气歧管 → 发动机，靠活塞负压吸气
 *   - 涡轮增压 Turbo：废气驱动涡轮 → 同轴压气机压缩进气 → 中冷器降温 → 节气门 → 发动机
 *     排气路径：发动机 → 涡轮 → 排出（涡轮与压气机同轴）
 * 下半部分为功率/扭矩曲线对比：
 *   - NA 扭矩（灰实线）/ NA 功率（灰虚线）：扭矩峰值偏中高转速
 *   - Turbo 扭矩（紫实线，带扭矩平台）/ Turbo 功率（紫虚线）：低转速即达扭矩平台
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * viewBox 720×550（宽 ≥720），四周留白 ≥32，字号 ≥11。
 */

const VIEW_W = 720;
const VIEW_H = 550;

const accent = "var(--accent)";
const success = "var(--success)";
const warning = "var(--warning)";
const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";

// 进气部件盒（NA 行）
const NA_BOXES = [
  { label: "空气滤清器", x: 60, w: 76 },
  { label: "节气门", x: 156, w: 60 },
  { label: "进气歧管", x: 240, w: 68 },
  { label: "发动机", x: 332, w: 60 },
] as const;
const NA_Y = 100;
const BOX_H = 32;

// 涡轮增压部件
interface IntakePart {
  label: string;
  x: number;
  w: number;
  hot?: boolean;
}
const TB_INTAKE: readonly IntakePart[] = [
  { label: "空气滤清器", x: 60, w: 72 },
  { label: "压气机", x: 152, w: 60, hot: true },
  { label: "中冷器", x: 232, w: 60 },
  { label: "节气门", x: 312, w: 54 },
  { label: "进气歧管", x: 386, w: 64 },
  { label: "发动机", x: 472, w: 56 },
];
const TB_Y = 168;
const TB_TURBINE = { label: "涡轮", x: 152, w: 60, y: 214, h: 26 };

// 曲线坐标系
const PL_X0 = 110; // 1000rpm
const PL_X1 = 620; // 6000rpm
const PL_Y0 = 425; // 0%
const PL_Y1 = 290; // 100%
const valY = (v: number) => PL_Y0 - (v / 100) * (PL_Y0 - PL_Y1);
const rpmX = (rpm: number) => PL_X0 + ((rpm - 1000) / 1000) * 102;

// 曲线点
const NA_TORQUE = [[1000, 55], [2000, 75], [3000, 88], [4000, 82], [5000, 68], [6000, 52]] as const;
const NA_POWER = [[1000, 30], [2000, 45], [3000, 60], [4000, 76], [5000, 90], [6000, 93]] as const;
const TB_TORQUE = [[1000, 68], [1500, 92], [2500, 94], [3500, 90], [4500, 80], [5500, 65], [6000, 55]] as const;
const TB_POWER = [[1000, 38], [2000, 58], [3000, 76], [4000, 90], [5000, 98], [6000, 95]] as const;

const toPts = (arr: readonly (readonly number[])[]) =>
  arr.map((p) => `${rpmX(p[0])},${valY(p[1])}`).join(" ");

export function AssEnginePerformanceDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="发动机性能与增压技术对比。上半部分：自然吸气（灰色）进气路径为空气滤清器、节气门、进气歧管、发动机；涡轮增压（紫色）进气路径为空气滤清器、压气机、中冷器、节气门、进气歧管、发动机，排气驱动涡轮与压气机同轴。下半部分：功率扭矩曲线对比，自然吸气扭矩峰值偏中高转速，涡轮增压低转速即达扭矩平台，整体功率扭矩更高。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <defs>
            <marker id="aep-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 z" fill={secondary} />
            </marker>
            <marker id="aep-arrow-accent" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 z" fill={accent} />
            </marker>
            <marker id="aep-arrow-warn" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 z" fill={warning} />
            </marker>
          </defs>

          {/* 主标题 */}
          <text x={VIEW_W / 2} y={36} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            自然吸气 vs 涡轮增压 · 性能对比
          </text>
          <text x={VIEW_W / 2} y={58} textAnchor="middle" fontSize="11" fill={secondary}>
            废气驱动涡轮 → 同轴压气机压缩进气 → 同排量下功率扭矩显著提升
          </text>

          {/* ===== NA 路径 ===== */}
          <text x={60} y={82} fontSize="13" fontWeight="700" fill={secondary}>自然吸气 NA</text>
          <text x={168} y={82} fontSize="11" fill={secondary}>靠活塞下行负压吸气，进气压力 ≈ 大气压</text>
          {NA_BOXES.map((b, i) => (
            <g key={b.label}>
              <rect x={b.x} y={NA_Y} width={b.w} height={BOX_H} rx="6" fill={secondary} fillOpacity="0.08" stroke={secondary} strokeWidth="1.4" />
              <text x={b.x + b.w / 2} y={NA_Y + BOX_H / 2 + 4} textAnchor="middle" fontSize="11" fontWeight="600" fill={primary}>{b.label}</text>
              {i < NA_BOXES.length - 1 && (
                <line x1={b.x + b.w + 2} y1={NA_Y + BOX_H / 2} x2={NA_BOXES[i + 1].x - 4} y2={NA_Y + BOX_H / 2} stroke={secondary} strokeWidth="1.6" markerEnd="url(#aep-arrow)" />
              )}
            </g>
          ))}

          {/* ===== Turbo 路径 ===== */}
          <text x={60} y={154} fontSize="13" fontWeight="700" fill={accent}>涡轮增压 Turbo</text>
          <text x={168} y={154} fontSize="11" fill={secondary}>废气驱动涡轮，同轴压气机压缩进气，中冷器降温增密</text>
          {TB_INTAKE.map((b, i) => (
            <g key={b.label}>
              <rect x={b.x} y={TB_Y} width={b.w} height={BOX_H} rx="6" fill={accent} fillOpacity={b.hot ? 0.16 : 0.08} stroke={accent} strokeWidth={b.hot ? 1.8 : 1.4} />
              <text x={b.x + b.w / 2} y={TB_Y + BOX_H / 2 + 4} textAnchor="middle" fontSize="11" fontWeight="600" fill={primary}>{b.label}</text>
              {i < TB_INTAKE.length - 1 && (
                <line x1={b.x + b.w + 2} y1={TB_Y + BOX_H / 2} x2={TB_INTAKE[i + 1].x - 4} y2={TB_Y + BOX_H / 2} stroke={accent} strokeWidth="1.6" markerEnd="url(#aep-arrow-accent)" />
              )}
            </g>
          ))}
          {/* 涡轮（排气驱动） */}
          <rect x={TB_TURBINE.x} y={TB_TURBINE.y} width={TB_TURBINE.w} height={TB_TURBINE.h} rx="6" fill={warning} fillOpacity="0.16" stroke={warning} strokeWidth="1.6" />
          <text x={TB_TURBINE.x + TB_TURBINE.w / 2} y={TB_TURBINE.y + TB_TURBINE.h / 2 + 4} textAnchor="middle" fontSize="11" fontWeight="700" fill={warning}>涡轮</text>
          {/* 同轴连接（压气机 ↔ 涡轮） */}
          <line x1={TB_TURBINE.x + TB_TURBINE.w / 2} y1={TB_Y + BOX_H} x2={TB_TURBINE.x + TB_TURBINE.w / 2} y2={TB_TURBINE.y} stroke={warning} strokeWidth="1.4" strokeDasharray="3 2" />
          <text x={TB_TURBINE.x + TB_TURBINE.w / 2 + 8} y={(TB_Y + BOX_H + TB_TURBINE.y) / 2 + 4} fontSize="11" fill={warning}>同轴</text>
          {/* 排气回路：发动机 → 涡轮 → 排出 */}
          <path d={`M ${TB_INTAKE[5].x + TB_INTAKE[5].w / 2} ${TB_Y + BOX_H} L ${TB_INTAKE[5].x + TB_INTAKE[5].w / 2} ${TB_TURBINE.y + TB_TURBINE.h / 2} L ${TB_TURBINE.x + TB_TURBINE.w} ${TB_TURBINE.y + TB_TURBINE.h / 2}`} fill="none" stroke={warning} strokeWidth="1.6" markerEnd="url(#aep-arrow-warn)" />
          <text x={400} y={TB_TURBINE.y + TB_TURBINE.h / 2 - 6} textAnchor="middle" fontSize="11" fill={warning}>废气</text>
          <line x1={TB_TURBINE.x} y1={TB_TURBINE.y + TB_TURBINE.h / 2} x2={44} y2={TB_TURBINE.y + TB_TURBINE.h / 2} stroke={warning} strokeWidth="1.6" markerEnd="url(#aep-arrow-warn)" />
          <text x={48} y={TB_TURBINE.y + TB_TURBINE.h / 2 - 6} fontSize="11" fill={warning}>排气</text>

          {/* 分隔线 */}
          <line x1={40} y1={258} x2={VIEW_W - 40} y2={258} stroke={border} strokeWidth="1" strokeDasharray="4 3" />

          {/* ===== 曲线区 ===== */}
          <text x={60} y={280} fontSize="13" fontWeight="700" fill={primary}>功率 / 扭矩曲线对比</text>

          {/* 坐标轴 */}
          <line x1={PL_X0 - 10} y1={PL_Y0} x2={PL_X1 + 14} y2={PL_Y0} stroke={primary} strokeWidth="1.4" markerEnd="url(#aep-arrow)" />
          <line x1={PL_X0} y1={PL_Y0 + 8} x2={PL_X0} y2={PL_Y1 - 10} stroke={primary} strokeWidth="1.4" markerEnd="url(#aep-arrow)" />
          <text x={PL_X1 + 20} y={PL_Y0 + 4} fontSize="11" fontWeight="700" fill={primary}>rpm</text>
          <text x={PL_X0 - 16} y={PL_Y1 - 14} fontSize="11" fontWeight="700" fill={primary}>% </text>

          {/* 转速刻度 */}
          {[1, 2, 3, 4, 5, 6].map((k) => (
            <g key={k}>
              <line x1={rpmX(k * 1000)} y1={PL_Y0} x2={rpmX(k * 1000)} y2={PL_Y0 + 4} stroke={secondary} strokeWidth="1" />
              <text x={rpmX(k * 1000)} y={PL_Y0 + 18} textAnchor="middle" fontSize="11" fill={secondary}>{k}k</text>
            </g>
          ))}

          {/* NA 曲线 */}
          <polyline points={toPts(NA_TORQUE)} fill="none" stroke={secondary} strokeWidth="2.2" />
          <polyline points={toPts(NA_POWER)} fill="none" stroke={secondary} strokeWidth="2.2" strokeDasharray="5 4" />
          {/* Turbo 曲线 */}
          <polyline points={toPts(TB_TORQUE)} fill="none" stroke={accent} strokeWidth="2.6" />
          <polyline points={toPts(TB_POWER)} fill="none" stroke={accent} strokeWidth="2.6" strokeDasharray="5 4" />

          {/* 扭矩平台标注 */}
          <line x1={rpmX(1500)} y1={valY(94) - 6} x2={rpmX(3500)} y2={valY(94) - 6} stroke={accent} strokeWidth="1" strokeDasharray="2 2" />
          <text x={rpmX(2500)} y={valY(94) - 12} textAnchor="middle" fontSize="11" fontWeight="700" fill={accent}>扭矩平台</text>

          {/* 图例 */}
          <g fontSize="11">
            <line x1={90} y1={466} x2={120} y2={466} stroke={secondary} strokeWidth="2.2" />
            <text x={126} y={470} fill={secondary}>NA 扭矩</text>
            <line x1={210} y1={466} x2={240} y2={466} stroke={secondary} strokeWidth="2.2" strokeDasharray="5 4" />
            <text x={246} y={470} fill={secondary}>NA 功率</text>
            <line x1={330} y1={466} x2={360} y2={466} stroke={accent} strokeWidth="2.6" />
            <text x={366} y={470} fill={accent}>Turbo 扭矩</text>
            <line x1={470} y1={466} x2={500} y2={466} stroke={accent} strokeWidth="2.6" strokeDasharray="5 4" />
            <text x={506} y={470} fill={accent}>Turbo 功率</text>
          </g>

          {/* 底部总结 */}
          <line x1={40} y1={492} x2={VIEW_W - 40} y2={492} stroke={border} strokeWidth="1" strokeDasharray="4 3" />
          <text x={VIEW_W / 2} y={516} textAnchor="middle" fontSize="12" fill={secondary}>
            同排量下涡轮增压功率提升 30%–50%，低转速扭矩平台改善起步加速响应
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        自然吸气靠活塞负压吸气，进气压力近大气压；涡轮增压利用废气驱动涡轮、同轴带动压气机压缩进气并经中冷器降温增密。曲线对比显示涡轮增压在低转速即形成宽广扭矩平台，同排量下功率与扭矩显著高于自然吸气。
      </figcaption>
    </figure>
  );
}
