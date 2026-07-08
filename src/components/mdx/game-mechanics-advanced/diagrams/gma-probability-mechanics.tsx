/**
 * <GmaProbabilityMechanicsDiagram>：概率与随机机制图解。
 * 纯静态展示，无交互。Server Component。
 */

const VIEW_W = 720;
const VIEW_H = 400;

export function GmaProbabilityMechanicsDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="概率与随机机制图解"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            概率机制：随机性与玩家体验
          </text>

          {/* 左上：均匀分布 */}
          <rect x="30" y="56" width="200" height="140" rx="10" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.3" />
          <text x="130" y="78" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">均匀分布</text>

          {[0, 1, 2, 3, 4].map((i) => (
            <rect key={i} x={50 + i * 34} y={170 - 60} width="26" height={60} fill="var(--accent)" fillOpacity="0.15" stroke="var(--accent)" strokeWidth="0.8" />
          ))}
          <text x="130" y="188" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">等概率——掷骰子</text>

          {/* 右上：正态分布 */}
          <rect x="260" y="56" width="200" height="140" rx="10" fill="var(--warning)" fillOpacity="0.06" stroke="var(--warning)" strokeWidth="1" strokeOpacity="0.3" />
          <text x="360" y="78" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--warning)">正态分布</text>

          <path d="M 280 170 Q 360 80 440 170" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1" />
          <text x="360" y="188" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">中间多两端少——伤害波动</text>

          {/* 右上角：指数分布 */}
          <rect x="490" y="56" width="200" height="140" rx="10" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="1" strokeOpacity="0.3" />
          <text x="590" y="78" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">指数分布</text>

          <path d="M 510 170 Q 530 90 670 168" fill="none" stroke="var(--success)" strokeWidth="1.5" />
          <text x="590" y="188" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">稀有掉落——越稀有越难</text>

          {/* 下半部分：随机类型对比 */}
          <text x={VIEW_W / 2} y="226" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--text-primary)">三种随机类型</text>

          {/* 输入随机 */}
          <rect x="40" y="248" width="200" height="120" rx="8" fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" strokeWidth="1.2" />
          <text x="140" y="272" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">输入随机</text>
          <text x="140" y="292" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">游戏开始时生成</text>
          <text x="140" y="308" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">如：地图/种子</text>
          <text x="140" y="328" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">玩家可适应</text>
          <text x="140" y="344" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">有公平感</text>

          {/* 过程随机 */}
          <rect x="260" y="248" width="200" height="120" rx="8" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="360" y="272" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">过程随机</text>
          <text x="360" y="292" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">运行时实时判定</text>
          <text x="360" y="308" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">如：暴击/闪避</text>
          <text x="360" y="328" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">增加紧张感</text>
          <text x="360" y="344" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">可能挫败</text>

          {/* 输出随机 */}
          <rect x="480" y="248" width="200" height="120" rx="8" fill="var(--warning)" fillOpacity="0.08" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="580" y="272" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">输出随机</text>
          <text x="580" y="292" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">结果后随机加成</text>
          <text x="580" y="308" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">如：掉落品质</text>
          <text x="580" y="328" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">惊喜感强</text>
          <text x="580" y="344" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">易上瘾</text>

          {/* 底部说明 */}
          <text x={VIEW_W / 2} y="388" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">
            好随机增加重玩价值；坏随机剥夺玩家能动性
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        概率机制——三种分布形态与三种随机类型的体验差异
      </figcaption>
    </figure>
  );
}
