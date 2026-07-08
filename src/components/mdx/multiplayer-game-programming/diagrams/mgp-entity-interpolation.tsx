/**
 * <MgpEntityInterpolationDiagram>：实体插值与平滑渲染图解。
 * 纯静态展示，无交互。Server Component。
 */

const VIEW_W = 740;
const VIEW_H = 440;

export function MgpEntityInterpolationDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="实体插值与平滑渲染图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            实体插值：快照缓冲与插值延迟
          </text>

          {/* 时间线图 */}
          <rect x="30" y="48" width="680" height="160" rx="10" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="370" y="68" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">快照到达与渲染时间线</text>

          {/* 时间轴 */}
          <line x1="50" y1="170" x2="690" y2="170" stroke="var(--text-tertiary)" strokeWidth="1" />
          <text x="695" y="174" fontSize="9" fill="var(--text-tertiary)">t</text>

          {/* 快照到达点 */}
          <circle cx="100" cy="130" r="6" fill="var(--success)" fillOpacity="0.8" />
          <text x="100" y="118" textAnchor="middle" fontSize="8" fill="var(--success)">S1</text>
          <text x="100" y="186" textAnchor="middle" fontSize="8" fill="var(--text-tertiary)">t=0</text>

          <circle cx="220" cy="130" r="6" fill="var(--success)" fillOpacity="0.8" />
          <text x="220" y="118" textAnchor="middle" fontSize="8" fill="var(--success)">S2</text>
          <text x="220" y="186" textAnchor="middle" fontSize="8" fill="var(--text-tertiary)">33ms</text>

          <circle cx="340" cy="130" r="6" fill="var(--success)" fillOpacity="0.8" />
          <text x="340" y="118" textAnchor="middle" fontSize="8" fill="var(--success)">S3</text>
          <text x="340" y="186" textAnchor="middle" fontSize="8" fill="var(--text-tertiary)">67ms</text>

          <circle cx="480" cy="130" r="6" fill="var(--success)" fillOpacity="0.8" />
          <text x="480" y="118" textAnchor="middle" fontSize="8" fill="var(--success)">S4</text>
          <text x="480" y="186" textAnchor="middle" fontSize="8" fill="var(--text-tertiary)">100ms</text>

          <circle cx="600" cy="130" r="6" fill="var(--success)" fillOpacity="0.8" />
          <text x="600" y="118" textAnchor="middle" fontSize="8" fill="var(--success)">S5</text>
          <text x="600" y="186" textAnchor="middle" fontSize="8" fill="var(--text-tertiary)">133ms</text>

          {/* 渲染点（在 S3-S4 之间，落后 100ms） */}
          <line x1="440" y1="80" x2="440" y2="170" stroke="var(--danger)" strokeWidth="1" strokeDasharray="3" />
          <rect x="410" y="78" width="60" height="20" rx="3" fill="var(--danger)" fillOpacity="0.12" stroke="var(--danger)" strokeWidth="0.8" />
          <text x="440" y="92" textAnchor="middle" fontSize="8" fill="var(--danger)">渲染点</text>

          {/* 插值区间标记 */}
          <line x1="340" y1="140" x2="480" y2="140" stroke="var(--warning)" strokeWidth="2" />
          <text x="410" y="155" textAnchor="middle" fontSize="8" fill="var(--warning)">在 S3-S4 之间插值</text>

          {/* 插值延迟标记 */}
          <line x1="600" y1="100" x2="440" y2="100" stroke="var(--danger)" strokeWidth="1" />
          <line x1="600" y1="95" x2="600" y2="105" stroke="var(--danger)" strokeWidth="1" />
          <line x1="440" y1="95" x2="440" y2="105" stroke="var(--danger)" strokeWidth="1" />
          <text x="520" y="96" textAnchor="middle" fontSize="8" fill="var(--danger)">插值延迟 100ms</text>

          {/* 下方：插值 vs 外推 */}
          <rect x="30" y="224" width="335" height="120" rx="10" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="1.2" />
          <text x="197" y="244" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">插值（Interpolation）</text>
          <text x="50" y="264" fontSize="9" fill="var(--text-secondary)">在两个已知快照之间计算</text>
          <text x="50" y="278" fontSize="9" fill="var(--text-secondary)">pos = lerp(s1.pos, s2.pos, alpha)</text>
          <text x="50" y="296" fontSize="9" fontWeight="600" fill="var(--success)">安全：结果在已知点之间</text>
          <text x="50" y="312" fontSize="9" fill="var(--text-tertiary)">正常状态下的标准做法</text>
          <text x="50" y="328" fontSize="9" fill="var(--text-tertiary)">代价：渲染延迟 100ms</text>

          <rect x="385" y="224" width="325" height="120" rx="10" fill="var(--danger)" fillOpacity="0.06" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="547" y="244" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--danger)">外推（Extrapolation）</text>
          <text x="405" y="264" fontSize="9" fill="var(--text-secondary)">在最后快照之后预测</text>
          <text x="405" y="278" fontSize="9" fill="var(--text-secondary)">pos = last.pos + vel * dt</text>
          <text x="405" y="296" fontSize="9" fontWeight="600" fill="var(--danger)">危险：转弯/停止时预测错</text>
          <text x="405" y="312" fontSize="9" fill="var(--text-tertiary)">仅应急，不可长期依赖</text>
          <text x="405" y="328" fontSize="9" fill="var(--text-tertiary)">超 200ms 应冻结实体</text>

          {/* 底部提示 */}
          <text x={VIEW_W / 2} y="370" textAnchor="middle" fontSize="11" fill="var(--text-primary)">
            快照缓冲 + 100ms 插值延迟 = 吸收网络抖变的平滑渲染
          </text>
          <text x={VIEW_W / 2} y="390" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">
            本地玩家用预测（0ms），远程玩家用插值（100ms）——同一游戏对不同实体用不同策略
          </text>
          <text x={VIEW_W / 2} y="418" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            关键洞察：插值延迟是「用延迟换平滑」——没有延迟会跳变，100ms 是经验平衡点
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        实体插值与平滑渲染——快照缓冲、插值延迟与插值/外推对比
      </figcaption>
    </figure>
  );
}
