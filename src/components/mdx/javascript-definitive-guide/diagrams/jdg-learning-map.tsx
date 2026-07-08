/**
 * <JdgLearningMapDiagram>：JavaScript权威指南（第7版）全书学习地图图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。SVG 文本中 > 用 &gt;、} 用 &rbrace;、{ 用 &lbrace;。
 */

const VIEW_W = 740;
const VIEW_H = 460;

export function JdgLearningMapDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="JavaScript权威指南第7版 全书学习地图图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="30" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            JavaScript权威指南（第7版）全书学习地图
          </text>
          <text x={VIEW_W / 2} y="50" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            词法类型 → 函数抽象 → 标准库与元编程 → Web 平台 → 总复习
          </text>

          <rect x="30" y="64" width="680" height="376" rx="12" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />

          {/* 第一排：词法语法 + 学习地图 */}
          <rect x="50" y="82" width="310" height="56" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="205" y="104" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--success)">词法结构与类型值</text>
          <text x="205" y="122" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">词法结构（Unicode / 分号 / 关键字）</text>
          <text x="205" y="134" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">类型与值（原始类型 / 类型转换）</text>

          <rect x="380" y="82" width="310" height="56" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="535" y="104" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">全书学习地图</text>
          <text x="535" y="122" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">从源码字符到页面响应的完整旅程</text>
          <text x="535" y="134" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">语言核心 → 标准库 → Web 平台</text>

          <text x="205" y="160" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>
          <text x="535" y="160" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>

          {/* 第二排：函数抽象 */}
          <rect x="50" y="174" width="310" height="56" rx="8" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="205" y="196" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--warning)">函数与类模块</text>
          <text x="205" y="214" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">函数与闭包（箭头函数 / call/apply/bind）</text>
          <text x="205" y="226" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">类与模块（class / ESM / 动态 import）</text>

          <rect x="380" y="174" width="310" height="56" rx="8" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="535" y="196" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--warning)">抽象层目标</text>
          <text x="535" y="214" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">能封：闭包封装状态与行为</text>
          <text x="535" y="226" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">能承：类与模块组织复用代码</text>

          <text x="205" y="252" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>
          <text x="535" y="252" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>

          {/* 第三排：标准库与元编程 */}
          <rect x="50" y="266" width="310" height="56" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="205" y="288" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">标准库与元编程</text>
          <text x="205" y="306" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">数组与对象（数组方法 / 解构 / 展开）</text>
          <text x="205" y="318" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">集合与元编程（Map/Set / Proxy/Reflect）</text>

          <rect x="380" y="266" width="310" height="56" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="535" y="288" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">标准库层目标</text>
          <text x="535" y="306" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">能用：内置数据结构开箱即用</text>
          <text x="535" y="318" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">能塑：元编程改写语言默认行为</text>

          <text x="205" y="344" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>
          <text x="535" y="344" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>

          {/* 第四排：Web 平台 + 总复习 */}
          <rect x="50" y="358" width="310" height="56" rx="8" fill="var(--danger)" fillOpacity="0.12" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="205" y="380" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--danger)">Web 平台</text>
          <text x="205" y="398" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">DOM 与事件（冒泡 / 委托 / Observer）</text>
          <text x="205" y="410" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">浏览器 API（Fetch / Storage / Worker）</text>

          <rect x="380" y="358" width="310" height="56" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="535" y="380" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--success)">全书总复习</text>
          <text x="535" y="398" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">语言到平台的完整知识图谱</text>
          <text x="535" y="410" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">JS 工程判断力</text>

          <text x={VIEW_W / 2} y="436" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            关键洞察：从「字符如何组成程序」到「程序如何驱动网页」的完整链路
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        JavaScript权威指南第7版全书学习地图——词法类型、函数抽象、标准库元编程、Web平台四阶段递进路径
      </figcaption>
    </figure>
  );
}
