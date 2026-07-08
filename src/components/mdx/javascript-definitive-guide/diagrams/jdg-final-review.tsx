/**
 * <JdgFinalReviewDiagram>：全书总复习知识图谱图解。
 * 纯静态展示，无交互。Server Component。全部 DESIGN token 配色。
 * SVG 文本中 > 用 &gt;、} 用 &rbrace;、{ 用 &lbrace;。
 */

const VIEW_W = 740;
const VIEW_H = 460;

export function JdgFinalReviewDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="JavaScript权威指南 全书总复习知识图谱"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <defs>
            <marker id="arrFr2" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
              <path d="M0,0 L10,5 L0,10 Z" fill="var(--accent)" />
            </marker>
          </defs>

          <text x={VIEW_W / 2} y="34" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            全书总复习：语言核心到 Web 平台知识图谱
          </text>
          <text x={VIEW_W / 2} y="54" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            四层知识环绕运行时旅程，构成 JavaScript 从字符到网页的完整链路
          </text>

          {/* 中心枢纽 */}
          <circle cx="370" cy="250" r="56" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1.6" />
          <text x="370" y="244" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--accent)">运行时旅程</text>
          <text x="370" y="262" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">字符 → 程序 → 网页</text>
          <text x="370" y="276" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">源码到响应的链路</text>

          {/* 四层节点 */}
          {/* 语言核心（左上） */}
          <rect x="40" y="86" width="200" height="80" rx="8" fill="var(--success)" fillOpacity="0.10" stroke="var(--success)" strokeWidth="1.2" />
          <text x="140" y="108" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--success)">语言核心</text>
          <text x="140" y="126" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">词法结构 / 类型值</text>
          <text x="140" y="142" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">函数闭包 / 类与模块</text>
          <text x="140" y="158" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">ASI / 原始类型 / this 绑定</text>

          {/* 标准库（右上） */}
          <rect x="500" y="86" width="200" height="80" rx="8" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="600" y="108" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--warning)">标准库与元编程</text>
          <text x="600" y="126" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">数组对象 / 解构展开</text>
          <text x="600" y="142" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">Map/Set / Proxy/Reflect</text>
          <text x="600" y="158" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">纯函数 vs 副作用 / 弱引用</text>

          {/* Web 平台（左下） */}
          <rect x="40" y="338" width="200" height="80" rx="8" fill="var(--danger)" fillOpacity="0.10" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="140" y="360" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--danger)">Web 平台</text>
          <text x="140" y="378" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">DOM / 事件流 / 委托</text>
          <text x="140" y="394" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">Fetch / Storage / Worker</text>
          <text x="140" y="410" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">冒泡三阶段 / 异步存储</text>

          {/* 工程判断力（右下） */}
          <rect x="500" y="338" width="200" height="80" rx="8" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="600" y="360" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">工程判断力</text>
          <text x="600" y="378" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">选型 / 陷阱 / 性能</text>
          <text x="600" y="394" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">闭包封装 / 委托减负</text>
          <text x="600" y="410" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">按需加载 / Worker 卸载</text>

          {/* 连线 */}
          <path d="M240 150 Q 300 200 322 226" stroke="var(--success)" strokeWidth="1.4" fill="none" strokeOpacity="0.6" markerEnd="url(#arrFr2)" />
          <path d="M500 150 Q 440 200 418 226" stroke="var(--warning)" strokeWidth="1.4" fill="none" strokeOpacity="0.6" markerEnd="url(#arrFr2)" />
          <path d="M240 358 Q 300 300 322 274" stroke="var(--danger)" strokeWidth="1.4" fill="none" strokeOpacity="0.6" markerEnd="url(#arrFr2)" />
          <path d="M500 358 Q 440 300 418 274" stroke="var(--accent)" strokeWidth="1.4" fill="none" strokeOpacity="0.6" markerEnd="url(#arrFr2)" />

          {/* 交叉洞察 */}
          <rect x="210" y="206" width="320" height="34" rx="8" fill="var(--elevated)" stroke="var(--border)" strokeWidth="1" />
          <text x="370" y="222" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">完整旅程</text>
          <text x="370" y="236" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">词法解析 → 类型求值 → 闭包封装 → 模块组织 → DOM 响应</text>

          <text x={VIEW_W / 2} y="442" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            关键洞察：语言核心是地基，标准库是工具箱，Web 平台是舞台，三者构成 JS 工程全貌
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        语言核心、标准库元编程、Web平台、工程判断力四层环绕运行时旅程，构成 JavaScript 从源码到网页的完整知识图谱
      </figcaption>
    </figure>
  );
}
