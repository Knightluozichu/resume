/**
 * <GmaFinalReviewDiagram>：全书总复习知识图谱图解。
 * 纯静态展示，无交互。Server Component。
 */

const VIEW_W = 720;
const VIEW_H = 440;

export function GmaFinalReviewDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="游戏机制全书总复习知识图谱"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            游戏机制：高级游戏设计技术 总复习
          </text>

          {/* 中心节点 */}
          <circle cx={VIEW_W / 2} cy="220" r="50" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="2" />
          <text x={VIEW_W / 2} y="216" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--accent)">机制</text>
          <text x={VIEW_W / 2} y="232" textAnchor="middle" fontSize="10" fill="var(--accent)">设计</text>

          {/* 六大分支 */}
          {/* 左上：机制设计 */}
          <rect x="30" y="80" width="140" height="50" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="100" y="102" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">机制设计基础</text>
          <text x="100" y="118" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">行为空间/深度</text>
          <line x1="170" y1="120" x2="305" y2="195" stroke="var(--success)" strokeWidth="1" strokeOpacity="0.4" />

          {/* 右上：Machinations */}
          <rect x="550" y="80" width="140" height="50" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="620" y="102" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">Machinations</text>
          <text x="620" y="118" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">反馈结构可视化</text>
          <line x1="550" y1="120" x2="415" y2="195" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.4" />

          {/* 左中：模拟 */}
          <rect x="30" y="200" width="140" height="50" rx="8" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="100" y="222" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">模拟系统</text>
          <text x="100" y="238" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">离散/连续/反馈</text>
          <line x1="170" y1="225" x2="310" y2="225" stroke="var(--warning)" strokeWidth="1" strokeOpacity="0.4" />

          {/* 右中：经济与概率 */}
          <rect x="550" y="200" width="140" height="50" rx="8" fill="var(--text-tertiary)" fillOpacity="0.12" stroke="var(--text-tertiary)" strokeWidth="1.2" />
          <text x="620" y="222" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">经济与概率</text>
          <text x="620" y="238" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">水龙头/水槽/随机</text>
          <line x1="550" y1="225" x2="410" y2="225" stroke="var(--text-tertiary)" strokeWidth="1" strokeOpacity="0.4" />

          {/* 左下：谜题 */}
          <rect x="30" y="320" width="140" height="50" rx="8" fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" strokeWidth="1.2" />
          <text x="100" y="342" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">谜题设计</text>
          <text x="100" y="358" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">渐进难度曲线</text>
          <line x1="170" y1="330" x2="305" y2="255" stroke="var(--success)" strokeWidth="1" strokeOpacity="0.4" />

          {/* 右下：调优 */}
          <rect x="550" y="320" width="140" height="50" rx="8" fill="var(--warning)" fillOpacity="0.08" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="620" y="342" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">机制调优</text>
          <text x="620" y="358" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">迭代平衡循环</text>
          <line x1="550" y1="330" x2="415" y2="255" stroke="var(--warning)" strokeWidth="1" strokeOpacity="0.4" />

          {/* 底部总结 */}
          <rect x="120" y="396" width="480" height="32" rx="8" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.3" />
          <text x={VIEW_W / 2} y="416" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            核心链路：机制 → 可视化 → 模拟 → 验证 → 调优
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        游戏机制全书知识图谱——六大主题围绕机制设计核心展开
      </figcaption>
    </figure>
  );
}
