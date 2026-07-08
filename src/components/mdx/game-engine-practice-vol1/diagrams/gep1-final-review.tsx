/**
 * <Gep1FinalReviewDiagram>：全书总复习知识脉络图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 440;

export function Gep1FinalReviewDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="全书总复习知识脉络图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="30" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            卷1 知识脉络：一帧的完整旅程
          </text>
          <text x={VIEW_W / 2} y="50" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            从引擎启动到一帧画完，每个模块如何协作
          </text>

          {/* 中心：游戏循环 */}
          <ellipse cx="370" cy="230" rx="120" ry="46" fill="var(--accent)" fillOpacity="0.16" stroke="var(--accent)" strokeWidth="1.6" />
          <text x="370" y="226" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--accent)">游戏循环</text>
          <text x="370" y="244" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">Input → Update → Render</text>

          {/* 围绕的模块 */}
          {/* 内存 - 左上 */}
          <rect x="40" y="80" width="150" height="56" rx="10" fill="var(--success)" fillOpacity="0.14" stroke="var(--success)" strokeWidth="1.2" />
          <text x="115" y="102" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">内存系统</text>
          <text x="115" y="120" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">分配器供养所有对象</text>
          <line x1="190" y1="120" x2="265" y2="200" stroke="var(--text-tertiary)" strokeWidth="1" strokeOpacity="0.5" />

          {/* 数学 - 上 */}
          <rect x="210" y="80" width="150" height="56" rx="10" fill="var(--success)" fillOpacity="0.14" stroke="var(--success)" strokeWidth="1.2" />
          <text x="285" y="102" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">数学库</text>
          <text x="285" y="120" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">向量/矩阵/四元数</text>
          <line x1="300" y1="136" x2="340" y2="186" stroke="var(--text-tertiary)" strokeWidth="1" strokeOpacity="0.5" />

          {/* 变换 - 右上 */}
          <rect x="380" y="80" width="150" height="56" rx="10" fill="var(--accent)" fillOpacity="0.14" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="455" y="102" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">变换系统</text>
          <text x="455" y="120" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">层级累积世界矩阵</text>
          <line x1="440" y1="136" x2="400" y2="186" stroke="var(--text-tertiary)" strokeWidth="1" strokeOpacity="0.5" />

          {/* 资源 - 右 */}
          <rect x="550" y="120" width="150" height="56" rx="10" fill="var(--warning)" fillOpacity="0.14" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="625" y="142" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">资源管理</text>
          <text x="625" y="160" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">异步加载引用计数</text>
          <line x1="555" y1="160" x2="485" y2="215" stroke="var(--text-tertiary)" strokeWidth="1" strokeOpacity="0.5" />

          {/* 场景图 - 左下 */}
          <rect x="40" y="300" width="150" height="56" rx="10" fill="var(--warning)" fillOpacity="0.14" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="115" y="322" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">场景图</text>
          <text x="115" y="340" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">空间分割与剔除</text>
          <line x1="190" y1="310" x2="265" y2="260" stroke="var(--text-tertiary)" strokeWidth="1" strokeOpacity="0.5" />

          {/* 渲染 - 下 */}
          <rect x="210" y="300" width="150" height="56" rx="10" fill="var(--text-tertiary)" fillOpacity="0.16" stroke="var(--text-tertiary)" strokeWidth="1.2" />
          <text x="285" y="322" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">渲染管线</text>
          <text x="285" y="340" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">CPU排序 GPU绘制</text>
          <line x1="300" y1="300" x2="340" y2="274" stroke="var(--text-tertiary)" strokeWidth="1" strokeOpacity="0.5" />

          {/* 事件 - 右下 */}
          <rect x="380" y="300" width="150" height="56" rx="10" fill="var(--text-tertiary)" fillOpacity="0.16" stroke="var(--text-tertiary)" strokeWidth="1.2" />
          <text x="455" y="322" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">事件系统</text>
          <text x="455" y="340" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">消息分发解耦模块</text>
          <line x1="440" y1="300" x2="400" y2="274" stroke="var(--text-tertiary)" strokeWidth="1" strokeOpacity="0.5" />

          {/* 架构 - 右外 */}
          <rect x="550" y="300" width="150" height="56" rx="10" fill="var(--success)" fillOpacity="0.14" stroke="var(--success)" strokeWidth="1.2" />
          <text x="625" y="322" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">引擎架构</text>
          <text x="625" y="340" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">分层组织全局</text>
          <line x1="555" y1="320" x2="485" y2="246" stroke="var(--text-tertiary)" strokeWidth="1" strokeOpacity="0.5" />

          {/* 底部总结 */}
          <rect x="40" y="380" width="660" height="48" rx="10" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.4" />
          <text x="370" y="400" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">
            一帧旅程：内存分配 → 事件触发 → Update 变换 → 场景剔除 → 渲染提交 → 资源按需加载
          </text>
          <text x="370" y="418" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">
            卷1 回答「为什么」：每个模块的设计动机与协作关系，是卷2（实现）的地基
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        卷1 总复习——以「一帧的完整旅程」串联全部模块，看清引擎各系统如何协作
      </figcaption>
    </figure>
  );
}
