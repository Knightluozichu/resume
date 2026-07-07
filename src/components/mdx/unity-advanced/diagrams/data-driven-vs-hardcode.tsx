/**
 * <DataDrivenVsHardCode>：数据驱动 vs 硬编码对比图
 *
 * 左右对比：左侧硬编码（Hard-Code），右侧数据驱动（Data-Driven）。
 * 从修改成本、热更新能力、策划参与度、扩展性、出错率五个维度对比。
 */

const VIEW_W = 820;
const VIEW_H = 460;

const COL_W = 370;
const COL_H = 340;
const LEFT_X = 30;
const RIGHT_X = 420;
const TOP_Y = 80;

type Dim = { name: string; hardCode: string; dataDriven: string; hcColor: string; ddColor: string };

const DIMS: readonly Dim[] = [
  { name: "修改数值", hardCode: "改代码→编译→出包", dataDriven: "改Excel→导表→热更", hcColor: "var(--danger)", ddColor: "var(--success)" },
  { name: "新增道具/技能", hardCode: "加枚举+加if+加类", dataDriven: "Excel加一行", hcColor: "var(--danger)", ddColor: "var(--success)" },
  { name: "策划参与", hardCode: "策划提需求→程序排期", dataDriven: "策划自己填表→自测", hcColor: "var(--warning)", ddColor: "var(--success)" },
  { name: "热更新支持", hardCode: "必须整包更新", dataDriven: "配置文件走CDN", hcColor: "var(--danger)", ddColor: "var(--success)" },
  { name: "出错风险", hardCode: "改一处动全身", dataDriven: "校验工具拦截", hcColor: "var(--danger)", ddColor: "var(--accent)" },
];

function Column({ x, title, subtitle, color, icon, bad }: { x: number; title: string; subtitle: string; color: string; icon: string; bad?: boolean }) {
  return (
    <g>
      <rect x={x} y={TOP_Y} width={COL_W} height={COL_H} fill="var(--bg)" stroke={color} strokeWidth="1.5" rx="10" />
      <rect x={x} y={TOP_Y} width={COL_W} height={44} fill={color} fillOpacity="0.12" rx="10" />
      <rect x={x} y={TOP_Y} width={5} height={COL_H} fill={color} rx="2" />
      <text x={x + COL_W / 2} y={TOP_Y + 28} textAnchor="middle" fill={color} fontSize="22">
        {icon}
      </text>
      <text x={x + COL_W / 2 + 20} y={TOP_Y + 24} textAnchor="middle" fill="var(--text-primary)" fontSize="16" fontWeight="700" fontFamily="system-ui">
        {title}
      </text>
      <text x={x + COL_W / 2} y={TOP_Y + 42} textAnchor="middle" fill="var(--text-secondary)" fontSize="11" fontFamily="system-ui">
        {subtitle}
      </text>
      {bad && (
        <text x={x + COL_W - 30} y={TOP_Y + 24} fill={color} fontSize="16">✕</text>
      )}
      {!bad && (
        <text x={x + COL_W - 30} y={TOP_Y + 24} fill={color} fontSize="16">✓</text>
      )}
    </g>
  );
}

export function DataDrivenVsHardCode() {
  return (
    <div className="my-8 w-full overflow-x-auto">
      <svg
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        className="mx-auto w-full max-w-[820px]"
        style={{ minWidth: 600 }}
        role="img"
        aria-label="数据驱动开发 vs 硬编码对比"
      >
        <rect x="0" y="0" width={VIEW_W} height={VIEW_H} fill="var(--bg-elevated)" rx="12" />

        <text x={VIEW_W / 2} y={32} textAnchor="middle" fill="var(--text-primary)" fontSize="17" fontWeight="600" fontFamily="system-ui">
          数据驱动 vs 硬编码
        </text>
        <text x={VIEW_W / 2} y={54} textAnchor="middle" fill="var(--text-secondary)" fontSize="11" fontFamily="system-ui">
          主程视角：什么该写死，什么该配表
        </text>

        {/* 两列 */}
        <Column x={LEFT_X} title="硬编码 Hard-Code" subtitle="数值/逻辑直接写在C#代码里" color="var(--danger)" icon="🔒" bad />
        <Column x={RIGHT_X} title="数据驱动 Data-Driven" subtitle="逻辑固定，数据外置到配置表" color="var(--success)" icon="🔓" />

        {/* VS */}
        <circle cx={VIEW_W / 2} cy={TOP_Y + COL_H / 2} r={22} fill="var(--bg-elevated)" stroke="var(--border)" strokeWidth="2" />
        <text x={VIEW_W / 2} y={TOP_Y + COL_H / 2 + 6} textAnchor="middle" fill="var(--text-primary)" fontSize="14" fontWeight="700" fontFamily="system-ui">
          VS
        </text>

        {/* 维度对比行 */}
        {DIMS.map((d, i) => {
          const rowY = TOP_Y + 70 + i * 56;
          return (
            <g key={d.name}>
              {/* 维度名 */}
              <text x={LEFT_X + COL_W / 2 + 175} y={rowY + 12} textAnchor="middle" fill="var(--text-secondary)" fontSize="10" fontFamily="system-ui">
                {d.name}
              </text>

              {/* 左侧：硬编码描述 */}
              <rect x={LEFT_X + 16} y={rowY - 4} width={COL_W - 40} height={32} fill={d.hcColor} fillOpacity="0.06" stroke={d.hcColor} strokeWidth="0.8" strokeOpacity="0.4" rx="5" />
              <text x={LEFT_X + COL_W / 2} y={rowY + 16} textAnchor="middle" fill="var(--text-primary)" fontSize="11" fontFamily="system-ui">
                {d.hardCode}
              </text>

              {/* 右侧：数据驱动描述 */}
              <rect x={RIGHT_X + 16} y={rowY - 4} width={COL_W - 40} height={32} fill={d.ddColor} fillOpacity="0.06" stroke={d.ddColor} strokeWidth="0.8" strokeOpacity="0.4" rx="5" />
              <text x={RIGHT_X + COL_W / 2} y={rowY + 16} textAnchor="middle" fill="var(--text-primary)" fontSize="11" fontFamily="system-ui">
                {d.dataDriven}
              </text>
            </g>
          );
        })}

        {/* 代码示例对比 */}
        <g>
          <rect x={LEFT_X + 16} y={TOP_Y + COL_H - 60} width={COL_W - 40} height={48} fill="var(--bg-elevated)" rx="5" />
          <text x={LEFT_X + 26} y={TOP_Y + COL_H - 42} fill="var(--danger)" fontSize="10" fontFamily="JetBrains Mono, monospace">
            {"if (id == 1001) damage = 100;"}
          </text>
          <text x={LEFT_X + 26} y={TOP_Y + COL_H - 26} fill="var(--danger)" fontSize="10" fontFamily="JetBrains Mono, monospace">
            {"else if (id == 1002) damage = 250;  // 加一个武器=加if"}
          </text>

          <rect x={RIGHT_X + 16} y={TOP_Y + COL_H - 60} width={COL_W - 40} height={48} fill="var(--bg-elevated)" rx="5" />
          <text x={RIGHT_X + 26} y={TOP_Y + COL_H - 42} fill="var(--success)" fontSize="10" fontFamily="JetBrains Mono, monospace">
            {"var cfg = Config.Weapon.Get(id);"}
          </text>
          <text x={RIGHT_X + 26} y={TOP_Y + COL_H - 26} fill="var(--success)" fontSize="10" fontFamily="JetBrains Mono, monospace">
            {"damage = cfg.damage;  // 加武器=加一行表"}
          </text>
        </g>

        {/* 底部原则 */}
        <rect x={30} y={VIEW_H - 50} width={VIEW_W - 60} height={36} fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="1" rx="6" />
        <text x={VIEW_W / 2} y={VIEW_H - 27} textAnchor="middle" fill="var(--accent)" fontSize="12" fontWeight="600" fontFamily="system-ui">
          主程原则：逻辑写死（C#），数据配表（Excel/SO）；频繁变化的东西必须数据驱动
        </text>
      </svg>
    </div>
  );
}
