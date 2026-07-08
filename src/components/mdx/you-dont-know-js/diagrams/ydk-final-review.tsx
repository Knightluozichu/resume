/**
 * <YdkFinalReviewDiagram>：全书总复习知识图谱图解。
 * 纯静态展示，无交互。Server Component。全部 DESIGN token 配色。
 * SVG 文本中 > 用 &gt;、} 用 &rbrace;、{ 用 &lbrace;。
 */

const VIEW_W = 740;
const VIEW_H = 460;

export function YdkFinalReviewDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="你不知道的JavaScript 全书总复习知识图谱"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <defs>
            <marker id="arrFr" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
              <path d="M0,0 L10,5 L0,10 Z" fill="var(--accent)" />
            </marker>
          </defs>

          <text x={VIEW_W / 2} y="34" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            全书总复习：四支柱知识图谱
          </text>
          <text x={VIEW_W / 2} y="54" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            从语法表层到运行时机制，四支柱相互支撑构成 JavaScript 全貌
          </text>

          {/* 中心枢纽 */}
          <circle cx="370" cy="250" r="56" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1.6" />
          <text x="370" y="246" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--accent)">运行时机制</text>
          <text x="370" y="264" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">代码跑起来后的真相</text>

          {/* 四支柱节点 */}
          {/* 类型与语法（左上） */}
          <rect x="40" y="86" width="200" height="80" rx="8" fill="var(--success)" fillOpacity="0.10" stroke="var(--success)" strokeWidth="1.2" />
          <text x="140" y="108" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--success)">类型与语法</text>
          <text x="140" y="126" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">类型转换 / 抽象操作</text>
          <text x="140" y="142" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">包装类型 / 运算符优先级</text>
          <text x="140" y="158" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">&lbrace;&rbrace; 与 new 的真相</text>

          {/* 作用域与闭包（右上） */}
          <rect x="500" y="86" width="200" height="80" rx="8" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="600" y="108" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--warning)">作用域与闭包</text>
          <text x="600" y="126" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">词法作用域 / 提升机制</text>
          <text x="600" y="142" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">闭包保持 / 模块模式</text>
          <text x="600" y="158" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">TDZ 与先声明后使用</text>

          {/* this 与原型（左下） */}
          <rect x="40" y="338" width="200" height="80" rx="8" fill="var(--danger)" fillOpacity="0.10" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="140" y="360" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--danger)">this 与原型</text>
          <text x="140" y="378" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">this 四规则 / 箭头例外</text>
          <text x="140" y="394" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">[[Prototype]] 委托链</text>
          <text x="140" y="410" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">行为委托 vs 类继承</text>

          {/* 异步与性能（右下） */}
          <rect x="500" y="338" width="200" height="80" rx="8" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="600" y="360" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">异步与性能</text>
          <text x="600" y="378" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">生成器 / 迭代器协议</text>
          <text x="600" y="394" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">Promise 并发与限流</text>
          <text x="600" y="410" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">微任务顺序 / 让出主线程</text>

          {/* 连线 */}
          <path d="M240 150 Q 300 200 322 226" stroke="var(--success)" strokeWidth="1.4" fill="none" strokeOpacity="0.6" markerEnd="url(#arrFr)" />
          <path d="M500 150 Q 440 200 418 226" stroke="var(--warning)" strokeWidth="1.4" fill="none" strokeOpacity="0.6" markerEnd="url(#arrFr)" />
          <path d="M240 358 Q 300 300 322 274" stroke="var(--danger)" strokeWidth="1.4" fill="none" strokeOpacity="0.6" markerEnd="url(#arrFr)" />
          <path d="M500 358 Q 440 300 418 274" stroke="var(--accent)" strokeWidth="1.4" fill="none" strokeOpacity="0.6" markerEnd="url(#arrFr)" />

          {/* 交叉洞察 */}
          <rect x="210" y="206" width="320" height="34" rx="8" fill="var(--elevated)" stroke="var(--border)" strokeWidth="1" />
          <text x="370" y="222" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">交叉洞察</text>
          <text x="370" y="236" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">闭包延续作用域 → this 在调用点绑定 → 原型委托复用 → 异步调度</text>

          <text x={VIEW_W / 2} y="442" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            关键洞察：四支柱共享「机制先于语法」的视角，合起来就是 JS 运行时全貌
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        类型语法、作用域闭包、this原型、异步性能四支柱环绕运行时机制，相互交叉构成 JavaScript 知识全貌
      </figcaption>
    </figure>
  );
}
