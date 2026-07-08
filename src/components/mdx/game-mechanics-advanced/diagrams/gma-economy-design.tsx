/**
 * <GmaEconomyDesignDiagram>：游戏经济系统设计图解。
 * 纯静态展示，无交互。Server Component。
 */

const VIEW_W = 720;
const VIEW_H = 400;

export function GmaEconomyDesignDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="游戏经济系统设计图解"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            游戏经济系统：资源循环
          </text>

          {/* 水龙头（Source） */}
          <rect x="30" y="70" width="100" height="50" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="80" y="92" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">水龙头</text>
          <text x="80" y="108" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">资源产出</text>

          {/* 水槽（Sink） */}
          <rect x="590" y="70" width="100" height="50" rx="8" fill="var(--text-tertiary)" fillOpacity="0.12" stroke="var(--text-tertiary)" strokeWidth="1.2" />
          <text x="640" y="92" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">水槽</text>
          <text x="640" y="108" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">资源消耗</text>

          {/* 转换器 */}
          <rect x="280" y="70" width="160" height="50" rx="8" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="360" y="92" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">转换器</text>
          <text x="360" y="108" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">A 资源 → B 资源</text>

          {/* 连接线 */}
          <line x1="130" y1="95" x2="280" y2="95" stroke="var(--accent)" strokeWidth="1.5" strokeOpacity="0.5" />
          <polygon points="275,91 285,95 275,99" fill="var(--accent)" fillOpacity="0.5" />
          <line x1="440" y1="95" x2="590" y2="95" stroke="var(--accent)" strokeWidth="1.5" strokeOpacity="0.5" />
          <polygon points="585,91 595,95 585,99" fill="var(--accent)" fillOpacity="0.5" />

          {/* 中间：玩家资源池 */}
          <rect x="200" y="160" width="320" height="60" rx="10" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="1.5" />
          <text x="360" y="184" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">玩家资源池</text>
          <text x="360" y="204" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">金币 / 经验 / 材料 / 装备</text>

          {/* 箭头：水龙头 → 池 */}
          <line x1="80" y1="120" x2="220" y2="160" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.4" strokeDasharray="4 3" />
          {/* 箭头：池 → 水槽 */}
          <line x1="500" y1="160" x2="640" y2="120" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.4" strokeDasharray="4 3" />
          {/* 箭头：池 → 转换器 */}
          <line x1="360" y1="160" x2="360" y2="120" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.4" strokeDasharray="4 3" />

          {/* 底部：经济类型 */}
          <text x={VIEW_W / 2} y="252" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--text-primary)">经济结构类型</text>

          <rect x="40" y="268" width="200" height="80" rx="8" fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" strokeWidth="1" />
          <text x="140" y="290" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">静态经济</text>
          <text x="140" y="308" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">固定产出/消耗速率</text>
          <text x="140" y="324" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">如：固定金币掉落</text>
          <text x="140" y="340" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">简单可预测</text>

          <rect x="260" y="268" width="200" height="80" rx="8" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="1" />
          <text x="360" y="290" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">动态经济</text>
          <text x="360" y="308" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">产出随行为变化</text>
          <text x="360" y="324" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">如：难度越高奖励越多</text>
          <text x="360" y="340" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">有策略深度</text>

          <rect x="480" y="268" width="200" height="80" rx="8" fill="var(--warning)" fillOpacity="0.08" stroke="var(--warning)" strokeWidth="1" />
          <text x="580" y="290" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">多体经济</text>
          <text x="580" y="308" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">多资源互相转换</text>
          <text x="580" y="324" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">如：材料→装备→金币</text>
          <text x="580" y="340" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">涌现交易行为</text>

          {/* 底部说明 */}
          <text x={VIEW_W / 2} y="376" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            平衡 = 水龙头产出率 ≈ 水槽消耗率
          </text>
          <text x={VIEW_W / 2} y="392" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">
            产出 &gt; 消耗 → 通货膨胀；消耗 &gt; 产出 → 玩家挫败
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        游戏经济系统——水龙头/水槽/转换器构成资源循环
      </figcaption>
    </figure>
  );
}
