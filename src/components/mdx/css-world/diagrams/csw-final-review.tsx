/**
 * <CswFinalReviewDiagram>：全书总复习知识图谱。
 * 串联流与盒模型、文本排版、布局体系、视觉动效四层。纯静态，Server Component。
 */

const VIEW_W = 740;
const VIEW_H = 470;

export function CswFinalReviewDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="CSS世界全书总复习知识图谱"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            《CSS世界》全书知识图谱
          </text>

          {/* 中心节点 */}
          <circle cx={VIEW_W / 2} cy="240" r="50" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="2" />
          <text x={VIEW_W / 2} y="236" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--accent)">CSS</text>
          <text x={VIEW_W / 2} y="252" textAnchor="middle" fontSize="10" fill="var(--accent)">渲染机制</text>

          {/* 连线 */}
          <line x1="270" y1="110" x2="340" y2="210" stroke="var(--text-tertiary)" strokeWidth="1" strokeDasharray="4 3" />
          <line x1="470" y1="110" x2="400" y2="210" stroke="var(--text-tertiary)" strokeWidth="1" strokeDasharray="4 3" />
          <line x1="270" y1="370" x2="340" y2="270" stroke="var(--text-tertiary)" strokeWidth="1" strokeDasharray="4 3" />
          <line x1="470" y1="370" x2="400" y2="270" stroke="var(--text-tertiary)" strokeWidth="1" strokeDasharray="4 3" />

          {/* 左上：流与盒模型 */}
          <rect x="120" y="60" width="200" height="100" rx="8" fill="var(--success)" fillOpacity="0.10" stroke="var(--success)" strokeWidth="1.5" />
          <text x="220" y="84" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--success)">1. 流与盒模型</text>
          <text x="220" y="104" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">正常流 / 浮动 / BFC 隔离</text>
          <text x="220" y="120" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">content-box vs border-box</text>
          <text x="220" y="136" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">margin 合并取大值</text>
          <text x="220" y="152" textAnchor="middle" fontSize="8" fill="var(--text-tertiary)">display:flow-root 清浮动</text>

          {/* 右上：文本与排版 */}
          <rect x="420" y="60" width="200" height="100" rx="8" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="1.5" />
          <text x="520" y="84" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--warning)">2. 文本与排版</text>
          <text x="520" y="104" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">text-decoration 三种线</text>
          <text x="520" y="120" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">white-space 五值换行</text>
          <text x="520" y="136" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">line-height 无单位最优</text>
          <text x="520" y="152" textAnchor="middle" fontSize="8" fill="var(--text-tertiary)">vertical-align 基线对齐</text>

          {/* 左下：布局体系 */}
          <rect x="120" y="320" width="200" height="100" rx="8" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1.5" />
          <text x="220" y="344" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--accent)">3. 布局体系</text>
          <text x="220" y="364" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">Flex 主轴/交叉轴分配</text>
          <text x="220" y="380" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">Grid fr 单位二维排版</text>
          <text x="220" y="396" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">flex:grow/shrink/basis</text>
          <text x="220" y="412" textAnchor="middle" fontSize="8" fill="var(--text-tertiary)">grid-area 线定位</text>

          {/* 右下：视觉与动效 */}
          <rect x="420" y="320" width="200" height="100" rx="8" fill="var(--danger)" fillOpacity="0.10" stroke="var(--danger)" strokeWidth="1.5" />
          <text x="520" y="344" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--danger)">4. 视觉与动效</text>
          <text x="520" y="364" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">transform 不触发重排</text>
          <text x="520" y="380" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">perspective 3D 透视</text>
          <text x="520" y="396" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">transition 状态补间</text>
          <text x="520" y="412" textAnchor="middle" fontSize="8" fill="var(--text-tertiary)">@keyframes 自驱动循环</text>

          {/* 底部洞察 */}
          <rect x="40" y="436" width="660" height="26" rx="6" fill="var(--text-tertiary)" fillOpacity="0.08" stroke="var(--text-tertiary)" strokeWidth="0.8" />
          <text x="370" y="454" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">
            核心主线：流与盒决定「怎么排」→ 文本决定「怎么断」→ 布局决定「怎么放」→ 动效决定「怎么动」
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        CSS世界全书知识图谱——四层核心知识以渲染机制为中心串联
      </figcaption>
    </figure>
  );
}
