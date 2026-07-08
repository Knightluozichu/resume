/**
 * <JpgLearningMapDiagram>：JavaScript高级程序设计（第4版）全书学习地图图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 460;

export function JpgLearningMapDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="JavaScript高级程序设计第4版 全书学习地图图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="30" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            JavaScript高级程序设计（第4版）全书学习地图
          </text>
          <text x={VIEW_W / 2} y="50" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            语言基础 → 对象与原型 → 异步模型 → 浏览器与模块 → 总复习
          </text>

          <rect x="30" y="64" width="680" height="376" rx="12" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />

          {/* 第一排：语言基础 + 学习地图 */}
          <rect x="50" y="82" width="310" height="56" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="205" y="104" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--success)">语言基础</text>
          <text x="205" y="122" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">数据类型与变量（原始/引用类型）</text>
          <text x="205" y="134" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">作用域与闭包（词法作用域/IIFE）</text>

          <rect x="380" y="82" width="310" height="56" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="535" y="104" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">全书学习地图</text>
          <text x="535" y="122" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">五阶段递进总览</text>
          <text x="535" y="134" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">从语法到运行时的完整旅程</text>

          <text x="205" y="160" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>
          <text x="535" y="160" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>

          {/* 第二排：对象与原型 */}
          <rect x="50" y="174" width="310" height="56" rx="8" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="205" y="196" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--warning)">对象与原型</text>
          <text x="205" y="214" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">对象与面向对象（属性特征/OOP）</text>
          <text x="205" y="226" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">原型与原型链（prototype/继承）</text>

          <rect x="380" y="174" width="310" height="56" rx="8" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="535" y="196" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--warning)">对象层目标</text>
          <text x="535" y="214" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">能造：用多种方式创建对象</text>
          <text x="535" y="226" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">能承：原型链实现继承复用</text>

          <text x="205" y="252" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>
          <text x="535" y="252" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>

          {/* 第三排：异步模型 */}
          <rect x="50" y="266" width="310" height="56" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="205" y="288" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">异步模型</text>
          <text x="205" y="306" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">Promise 与 async/await</text>
          <text x="205" y="318" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">事件循环与异步编程模型</text>

          <rect x="380" y="266" width="310" height="56" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="535" y="288" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">异步层目标</text>
          <text x="535" y="306" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">能等：Promise 串联异步流程</text>
          <text x="535" y="318" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">能转：事件循环驱动回调</text>

          <text x="205" y="344" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>
          <text x="535" y="344" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>

          {/* 第四排：浏览器与模块 + 总复习 */}
          <rect x="50" y="358" width="310" height="56" rx="8" fill="var(--danger)" fillOpacity="0.12" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="205" y="380" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--danger)">浏览器与模块</text>
          <text x="205" y="398" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">DOM 与 BOM 操作</text>
          <text x="205" y="410" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">模块系统（ESM/CommonJS）</text>

          <rect x="380" y="358" width="310" height="56" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="535" y="380" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--success)">全书总复习</text>
          <text x="535" y="398" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">五层知识图谱串联</text>
          <text x="535" y="410" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">JS 运行时工程判断力</text>

          <text x={VIEW_W / 2} y="436" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            关键洞察：从「会写语法」到「懂运行时」的五层进阶
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        JavaScript高级程序设计第4版全书学习地图——语言、对象、异步、浏览器、总复习五阶段递进路径
      </figcaption>
    </figure>
  );
}
