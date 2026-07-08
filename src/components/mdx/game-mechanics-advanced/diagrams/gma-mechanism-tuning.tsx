/**
 * <GmaMechanismTuningDiagram>：机制调优与平衡图解。
 * 纯静态展示，无交互。Server Component。
 */

const VIEW_W = 720;
const VIEW_H = 400;

export function GmaMechanismTuningDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="机制调优与平衡图解"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            机制调优：迭代平衡循环
          </text>

          {/* 循环图 */}
          <rect x="240" y="60" width="240" height="50" rx="10" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="360" y="82" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">1. 设定假设</text>
          <text x="360" y="98" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">「提升 10% 伤害会怎样」</text>

          <line x1="360" y1="110" x2="360" y2="138" stroke="var(--text-tertiary)" strokeWidth="1.2" />
          <polygon points="356,133 360,143 364,133" fill="var(--text-tertiary)" />

          <rect x="240" y="144" width="240" height="50" rx="10" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="360" y="166" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">2. 模拟测试</text>
          <text x="360" y="182" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">Machinations 跑 1000 局</text>

          <line x1="360" y1="194" x2="360" y2="222" stroke="var(--text-tertiary)" strokeWidth="1.2" />
          <polygon points="356,217 360,227 364,217" fill="var(--text-tertiary)" />

          <rect x="240" y="228" width="240" height="50" rx="10" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="360" y="250" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--warning)">3. 分析数据</text>
          <text x="360" y="266" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">胜率/时长/策略分布</text>

          <line x1="360" y1="278" x2="360" y2="306" stroke="var(--text-tertiary)" strokeWidth="1.2" />
          <polygon points="356,301 360,311 364,301" fill="var(--text-tertiary)" />

          <rect x="240" y="312" width="240" height="50" rx="10" fill="var(--text-tertiary)" fillOpacity="0.12" stroke="var(--text-tertiary)" strokeWidth="1.2" />
          <text x="360" y="334" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--text-primary)">4. 调整参数</text>
          <text x="360" y="350" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">微调 → 重新假设</text>

          {/* 回环箭头 */}
          <path d="M 240 337 Q 130 337 130 85 Q 130 60 240 85" fill="none" stroke="var(--text-tertiary)" strokeWidth="1.2" strokeDasharray="5 3" />
          <polygon points="235,81 245,85 235,89" fill="var(--text-tertiary)" />
          <text x="110" y="210" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">迭代</text>

          {/* 右侧：平衡指标 */}
          <rect x="520" y="60" width="170" height="300" rx="10" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.3" />
          <text x="605" y="84" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">平衡指标</text>

          <rect x="540" y="100" width="130" height="30" rx="6" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1" />
          <text x="605" y="120" textAnchor="middle" fontSize="10" fill="var(--text-primary)">多策略可行</text>

          <rect x="540" y="140" width="130" height="30" rx="6" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1" />
          <text x="605" y="160" textAnchor="middle" fontSize="10" fill="var(--text-primary)">胜率 45-55%</text>

          <rect x="540" y="180" width="130" height="30" rx="6" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1" />
          <text x="605" y="200" textAnchor="middle" fontSize="10" fill="var(--text-primary)">无统治策略</text>

          <rect x="540" y="220" width="130" height="30" rx="6" fill="var(--text-tertiary)" fillOpacity="0.12" stroke="var(--text-tertiary)" strokeWidth="1" />
          <text x="605" y="240" textAnchor="middle" fontSize="10" fill="var(--text-primary)">决策有意义</text>

          <text x="605" y="275" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">统治策略 =</text>
          <text x="605" y="290" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">某策略明显优于</text>
          <text x="605" y="305" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">所有其他选择</text>

          {/* 底部说明 */}
          <text x={VIEW_W / 2} y="384" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            平衡不是「绝对等价」，而是「多策略各有场景」
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        机制调优——假设→模拟→分析→调整的迭代循环
      </figcaption>
    </figure>
  );
}
