/**
 * <JctLearningMapDiagram>：《Java核心技术》全书学习地图图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 520;

export function JctLearningMapDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Java核心技术全书学习地图图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            Java核心技术——全书学习地图
          </text>
          <text x={VIEW_W / 2} y="48" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            基础语法 → 面向对象 → 接口Lambda → 集合泛型 → I/O流 → 并发 → 高级特性 → XML网络
          </text>

          <rect x="30" y="62" width="680" height="442" rx="12" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />

          {/* 第一排：基础语法与面向对象 */}
          <rect x="50" y="80" width="310" height="56" rx="8" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="205" y="102" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--warning)">基础语法与面向对象</text>
          <text x="205" y="120" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">第1-2章 基础语法 / OOP设计</text>
          <text x="205" y="132" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">变量/类/对象/封装/继承</text>

          <rect x="380" y="80" width="310" height="56" rx="8" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="535" y="102" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--warning)">阶段目标</text>
          <text x="535" y="120" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">能编码：掌握Java语法与类设计</text>
          <text x="535" y="132" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">能建模：理解封装继承多态</text>

          <text x="205" y="156" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>
          <text x="535" y="156" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>

          {/* 第二排：接口Lambda与集合泛型 */}
          <rect x="50" y="170" width="310" height="56" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="205" y="192" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">接口Lambda与集合泛型</text>
          <text x="205" y="210" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">第3-4章 接口/lambda/集合/泛型</text>
          <text x="205" y="222" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">default方法 / Stream / 类型擦除</text>

          <rect x="380" y="170" width="310" height="56" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="535" y="192" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">阶段目标</text>
          <text x="535" y="210" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">能抽象：掌握接口与Lambda</text>
          <text x="535" y="222" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">能操作：熟练使用集合API</text>

          <text x="205" y="246" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>
          <text x="535" y="246" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>

          {/* 第三排：I/O流与并发编程 */}
          <rect x="50" y="260" width="310" height="56" rx="8" fill="var(--danger)" fillOpacity="0.12" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="205" y="282" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--danger)">I/O流与并发编程</text>
          <text x="205" y="300" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">第5-6章 IO/流/线程/锁</text>
          <text x="205" y="312" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">NIO / 线程池 / volatile</text>

          <rect x="380" y="260" width="310" height="56" rx="8" fill="var(--danger)" fillOpacity="0.12" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="535" y="282" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--danger)">阶段目标</text>
          <text x="535" y="300" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">能读写：掌握IO与流式处理</text>
          <text x="535" y="312" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">能并发：掌握多线程编程</text>

          <text x="205" y="336" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>
          <text x="535" y="336" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>

          {/* 第四排：高级特性与XML网络 */}
          <rect x="50" y="350" width="310" height="56" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="205" y="372" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--success)">高级特性与XML网络</text>
          <text x="205" y="390" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">第7-8章 注解/反射/XML/Socket</text>
          <text x="205" y="402" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">类加载器 / DOM / HttpClient</text>

          <rect x="380" y="350" width="310" height="56" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="535" y="372" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--success)">阶段目标</text>
          <text x="535" y="390" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">能反射：掌握注解与类加载</text>
          <text x="535" y="402" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">能通信：理解XML与网络</text>

          <text x="205" y="426" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>
          <text x="535" y="426" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>

          {/* 第五排：全书复习 */}
          <rect x="50" y="440" width="310" height="56" rx="8" fill="var(--text-primary)" fillOpacity="0.08" stroke="var(--text-primary)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x="205" y="462" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--text-primary)">全书复习</text>
          <text x="205" y="480" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">第9章 知识整合与实战</text>
          <text x="205" y="492" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">从语法到并发完整链路</text>

          <rect x="380" y="440" width="310" height="56" rx="8" fill="var(--text-primary)" fillOpacity="0.08" stroke="var(--text-primary)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x="535" y="462" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--text-primary)">能贯通</text>
          <text x="535" y="480" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">从Java语法到反射网络全链路</text>
          <text x="535" y="492" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">从基础到高级特性全链路</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Java核心技术全书学习地图——基础语法、面向对象、接口Lambda、集合泛型、I/O流、并发、高级特性、XML网络八阶段递进路径
      </figcaption>
    </figure>
  );
}
