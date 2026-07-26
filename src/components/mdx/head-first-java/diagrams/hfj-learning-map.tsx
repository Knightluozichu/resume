/**
 * <HfjLearningMapDiagram>：《Head First Java》全书学习地图图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 520;

export function HfjLearningMapDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Head First Java全书学习地图图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            Head First Java——全书学习地图
          </text>
          <text x={VIEW_W / 2} y="48" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            Java入门 → 面向对象 → 核心API → 继承多态 → Swing → 事件 → 并发 → 网络
          </text>

          <rect x="30" y="62" width="680" height="442" rx="12" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />

          {/* 第一排：Java入门与OOP基础 */}
          <rect x="50" y="80" width="310" height="56" rx="8" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="205" y="102" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--warning)">Java入门与OOP基础</text>
          <text x="205" y="120" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">第1-2章 入门基础与面向对象</text>
          <text x="205" y="132" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">变量/类/对象/方法</text>

          <rect x="380" y="80" width="310" height="56" rx="8" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="535" y="102" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--warning)">阶段目标</text>
          <text x="535" y="120" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">能运行：掌握Java语法与类设计</text>
          <text x="535" y="132" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">能建模：理解对象与类的关系</text>

          <text x="205" y="156" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>
          <text x="535" y="156" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>

          {/* 第二排：核心API与继承多态 */}
          <rect x="50" y="170" width="310" height="56" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="205" y="192" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">核心API与继承多态</text>
          <text x="205" y="210" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">第3-4章 集合框架/继承/多态</text>
          <text x="205" y="222" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">ArrayList / 接口 / 重写 / 转型</text>

          <rect x="380" y="170" width="310" height="56" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="535" y="192" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">阶段目标</text>
          <text x="535" y="210" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">能复用：掌握继承与多态机制</text>
          <text x="535" y="222" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">能操作：熟练使用集合API</text>

          <text x="205" y="246" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>
          <text x="535" y="246" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>

          {/* 第三排：Swing GUI与事件处理 */}
          <rect x="50" y="260" width="310" height="56" rx="8" fill="var(--danger)" fillOpacity="0.12" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="205" y="282" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--danger)">Swing GUI与事件处理</text>
          <text x="205" y="300" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">第5-6章 窗口/组件/监听器</text>
          <text x="205" y="312" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">JFrame / JButton / 事件队列</text>

          <rect x="380" y="260" width="310" height="56" rx="8" fill="var(--danger)" fillOpacity="0.12" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="535" y="282" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--danger)">阶段目标</text>
          <text x="535" y="300" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">能交互：构建图形界面</text>
          <text x="535" y="312" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">能响应：处理用户事件</text>

          <text x="205" y="336" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>
          <text x="535" y="336" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>

          {/* 第四排：并发与网络 */}
          <rect x="50" y="350" width="310" height="56" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="205" y="372" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--success)">并发与网络编程</text>
          <text x="205" y="390" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">第7-8章 线程/Socket</text>
          <text x="205" y="402" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">Thread / synchronized / ServerSocket</text>

          <rect x="380" y="350" width="310" height="56" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="535" y="372" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--success)">阶段目标</text>
          <text x="535" y="390" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">能并发：掌握多线程编程</text>
          <text x="535" y="402" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">能通信：理解网络编程</text>

          <text x="205" y="426" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>
          <text x="535" y="426" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>

          {/* 第五排：全书复习 */}
          <rect x="50" y="440" width="310" height="56" rx="8" fill="var(--text-primary)" fillOpacity="0.08" stroke="var(--text-primary)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x="205" y="462" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--text-primary)">全书复习</text>
          <text x="205" y="480" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">第9章 知识整合与实战</text>
          <text x="205" y="492" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">从语法到并发完整链路</text>

          <rect x="380" y="440" width="310" height="56" rx="8" fill="var(--text-primary)" fillOpacity="0.08" stroke="var(--text-primary)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x="535" y="462" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--text-primary)">能贯通</text>
          <text x="535" y="480" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">从Java语法到并发网络全链路</text>
          <text x="535" y="492" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">从单线程到多线程网络编程</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Head First Java全书学习地图——入门基础、面向对象、核心API、继承多态、Swing、事件、并发、网络八阶段递进路径
      </figcaption>
    </figure>
  );
}
