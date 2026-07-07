/**
 * <AssBatteryManagementDiagram>：动力电池与 BMS 图。
 *
 * 左侧为电池包分层结构（自顶向下嵌套）：
 *   Battery Pack 电池包 → Module 模组（×N）→ Cell 电芯（×M）
 *   展开一个模组显示内部单体电芯，标注层级关系。
 * 右侧为 BMS 电池管理系统五大功能：
 *   - SOC 估算（电量状态）
 *   - SOH 估算（健康度 / 容量衰减）
 *   - 均衡 Cell Balancing（单体电压一致）
 *   - 热管理（液冷 / 风冷 控温）
 *   - 安全保护（过压 / 过流 / 过温）
 * BMS 经采样线监测电池，构成保护与估算闭环。
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * viewBox 720×510（宽 ≥720），四周留白 ≥32，字号 ≥11。
 */

const VIEW_W = 720;
const VIEW_H = 510;

const accent = "var(--accent)";
const success = "var(--success)";
const warning = "var(--warning)";
const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";

// 电池包分层（左侧）
const PACK = { x: 40, y: 78, w: 300, h: 386 };
const MOD_A = { x: 58, y: 132, w: 150, h: 200 };
const MOD_B = { x: 222, y: 132, w: 100, h: 200 };
// 模组 A 内的电芯
const CELLS = [0, 1, 2, 3].map((i) => ({ x: MOD_A.x + 12 + i * 34, y: MOD_A.y + 36, w: 26, h: 130 }));

// BMS 功能（右侧）
const BMS_COL = { x: 370, y: 78, w: 310, h: 386 };
interface BmsFn {
  name: string;
  en: string;
  desc: string;
  color: string;
}
const FN_STEP = 70;
const FN_H = 58;
const FN_START_Y = 112;
const fnY = (i: number) => FN_START_Y + i * FN_STEP;

const FUNCTIONS: readonly BmsFn[] = [
  { name: "SOC 估算", en: "State of Charge", desc: "电量状态 0–100%（安时积分 + 卡尔曼修正）", color: accent },
  { name: "SOH 估算", en: "State of Health", desc: "健康度 / 容量衰减 / 循环寿命", color: success },
  { name: "均衡 Balancing", en: "Cell Balancing", desc: "被动 / 主动均衡，单体电压一致", color: warning },
  { name: "热管理", en: "Thermal Management", desc: "液冷 / 风冷，控温 20–35℃ 最佳区", color: accent },
  { name: "安全保护", en: "Safety Protection", desc: "过压 / 过流 / 过温 / 短路切断", color: warning },
];

export function AssBatteryManagementDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="动力电池与 BMS 图。左侧电池包分层结构：Battery Pack 电池包包含多个 Module 模组，每个模组包含多个 Cell 电芯。右侧 BMS 电池管理系统五大功能：SOC 估算（电量）、SOH 估算（健康度）、均衡（单体电压一致）、热管理（液冷风冷控温）、安全保护（过压过流过温）。BMS 经采样线监测电池。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <defs>
            <marker id="abm-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 z" fill={accent} />
            </marker>
          </defs>

          {/* 主标题 */}
          <text x={VIEW_W / 2} y={36} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            动力电池 · 分层结构与 BMS 管理
          </text>
          <text x={VIEW_W / 2} y={58} textAnchor="middle" fontSize="11" fill={secondary}>
            Pack → Module → Cell 三级封装，BMS 统筹估算 / 均衡 / 热控 / 安全
          </text>

          {/* ===== 左侧：电池包分层 ===== */}
          <rect x={PACK.x} y={PACK.y} width={PACK.w} height={PACK.h} rx="12" fill={success} fillOpacity="0.05" stroke={success} strokeWidth="2" />
          <rect x={PACK.x} y={PACK.y} width={PACK.w} height="28" rx="12" fill={success} fillOpacity="0.14" />
          <rect x={PACK.x} y={PACK.y + 16} width={PACK.w} height="12" fill={success} fillOpacity="0.14" />
          <text x={PACK.x + PACK.w / 2} y={PACK.y + 19} textAnchor="middle" fontSize="13" fontWeight="700" fill={success}>Battery Pack 电池包</text>

          {/* 层级标注线 */}
          <text x={PACK.x + 10} y={PACK.y + 50} fontSize="11" fill={secondary}>▼ 包含多个模组</text>

          {/* 模组 A（展开，含电芯） */}
          <rect x={MOD_A.x} y={MOD_A.y} width={MOD_A.w} height={MOD_A.h} rx="8" fill={accent} fillOpacity="0.06" stroke={accent} strokeWidth="1.5" />
          <rect x={MOD_A.x} y={MOD_A.y} width={MOD_A.w} height="22" rx="8" fill={accent} fillOpacity="0.14" />
          <text x={MOD_A.x + MOD_A.w / 2} y={MOD_A.y + 15} textAnchor="middle" fontSize="11" fontWeight="700" fill={accent}>Module 模组</text>
          {CELLS.map((c, i) => (
            <g key={i}>
              <rect x={c.x} y={c.y} width={c.w} height={c.h} rx="3" fill={warning} fillOpacity="0.16" stroke={warning} strokeWidth="1.2" />
              <line x1={c.x + c.w / 2} y1={c.y - 2} x2={c.x + c.w / 2} y2={c.y - 6} stroke={warning} strokeWidth="1.2" />
              <line x1={c.x + c.w / 2} y1={c.y + c.h + 2} x2={c.x + c.w / 2} y2={c.y + c.h + 6} stroke={warning} strokeWidth="1.2" />
            </g>
          ))}
          <text x={MOD_A.x + MOD_A.w / 2} y={MOD_A.y + MOD_A.h - 10} textAnchor="middle" fontSize="11" fill={secondary}>Cell 电芯 ×M</text>

          {/* 模组 B（折叠，×N） */}
          <rect x={MOD_B.x} y={MOD_B.y} width={MOD_B.w} height={MOD_B.h} rx="8" fill={accent} fillOpacity="0.04" stroke={accent} strokeWidth="1.2" strokeDasharray="4 3" />
          <text x={MOD_B.x + MOD_B.w / 2} y={MOD_B.y + MOD_B.h / 2 - 6} textAnchor="middle" fontSize="12" fontWeight="700" fill={accent}>Module</text>
          <text x={MOD_B.x + MOD_B.w / 2} y={MOD_B.y + MOD_B.h / 2 + 14} textAnchor="middle" fontSize="16" fontWeight="700" fill={accent}>×N</text>

          {/* 层级公式 */}
          <line x1={PACK.x + 16} y1={356} x2={PACK.x + PACK.w - 16} y2={356} stroke={border} strokeWidth="1" />
          <text x={PACK.x + PACK.w / 2} y={378} textAnchor="middle" fontSize="11" fontWeight="600" fill={primary}>1 Pack = N Modules</text>
          <text x={PACK.x + PACK.w / 2} y={396} textAnchor="middle" fontSize="11" fontWeight="600" fill={primary}>1 Module = M Cells</text>
          <text x={PACK.x + PACK.w / 2} y={424} textAnchor="middle" fontSize="11" fill={secondary}>总电芯数 = N × M</text>

          {/* ===== 右侧：BMS 功能 ===== */}
          <rect x={BMS_COL.x} y={BMS_COL.y} width={BMS_COL.w} height={BMS_COL.h} rx="12" fill={primary} fillOpacity="0.03" stroke={border} strokeWidth="1.2" />
          <rect x={BMS_COL.x} y={BMS_COL.y} width={BMS_COL.w} height="28" rx="12" fill={primary} fillOpacity="0.08" />
          <rect x={BMS_COL.x} y={BMS_COL.y + 16} width={BMS_COL.w} height="12" fill={primary} fillOpacity="0.08" />
          <text x={BMS_COL.x + BMS_COL.w / 2} y={BMS_COL.y + 19} textAnchor="middle" fontSize="13" fontWeight="700" fill={primary}>BMS 电池管理系统</text>

          {/* BMS → 电池 采样监测连线 */}
          <path d={`M ${BMS_COL.x} ${PACK.y + PACK.h / 2} L ${PACK.x + PACK.w + 4} ${PACK.y + PACK.h / 2}`} fill="none" stroke={accent} strokeWidth="1.6" strokeDasharray="5 3" markerEnd="url(#abm-arrow)" />
          <text x={(PACK.x + PACK.w + BMS_COL.x) / 2} y={PACK.y + PACK.h / 2 - 8} textAnchor="middle" fontSize="11" fontWeight="700" fill={accent}>采样 / 监测</text>

          {/* 五大功能卡片 */}
          {FUNCTIONS.map((f, i) => {
            const y = fnY(i);
            return (
              <g key={f.name}>
                <rect x={BMS_COL.x + 14} y={y} width={BMS_COL.w - 28} height={FN_H} rx="8" fill={f.color} fillOpacity="0.07" stroke={f.color} strokeWidth="1.4" />
                <circle cx={BMS_COL.x + 38} cy={y + FN_H / 2} r="13" fill={f.color} fillOpacity="0.18" stroke={f.color} strokeWidth="1.2" />
                <text x={BMS_COL.x + 38} y={y + FN_H / 2 + 4} textAnchor="middle" fontSize="12" fontWeight="700" fill={f.color}>{i + 1}</text>
                <text x={BMS_COL.x + 62} y={y + 22} fontSize="12" fontWeight="700" fill={primary}>{f.name}</text>
                <text x={BMS_COL.x + 62} y={y + 38} fontSize="11" fill={secondary}>{f.en}</text>
                <text x={BMS_COL.x + 62} y={y + 52} fontSize="11" fill={primary}>{f.desc}</text>
              </g>
            );
          })}

          {/* 底部总结 */}
          <line x1={40} y1={478} x2={VIEW_W - 40} y2={478} stroke={border} strokeWidth="1" strokeDasharray="4 3" />
          <text x={VIEW_W / 2} y={498} textAnchor="middle" fontSize="11" fill={secondary}>
            BMS 是电池的大脑：精准估算状态 · 主动均衡 · 控温保安全——决定电池寿命与安全
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        动力电池三级封装：Battery Pack 电池包含 N 个 Module 模组，每模组含 M 个 Cell 电芯（总电芯数 N×M）。BMS 电池管理系统通过采样线监测电池，执行 SOC 估算（电量）、SOH 估算（健康度）、均衡（单体电压一致）、热管理（液冷/风冷控温）、安全保护（过压/过流/过温）五大功能。
      </figcaption>
    </figure>
  );
}
