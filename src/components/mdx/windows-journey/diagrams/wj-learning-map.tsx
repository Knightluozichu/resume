/**
 * <WjLearningMapDiagram>：《Windows逐梦旅程》全书学习地图图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 480;

export function WjLearningMapDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Windows逐梦旅程全书学习地图图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="30" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            Windows逐梦旅程——全书学习地图
          </text>
          <text x={VIEW_W / 2} y="50" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            API基础 → 消息循环 → 窗口与GUI → 系统机制 → 高级I/O → 总复习
          </text>

          <rect x="30" y="64" width="680" height="396" rx="12" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />

          {/* 第一排：API基础 + 消息循环 */}
          <rect x="50" y="82" width="310" height="56" rx="8" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="205" y="104" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--warning)">API基础与消息循环</text>
          <text x="205" y="122" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">第2章 Win32 API 基础（句柄/函数）</text>
          <text x="205" y="134" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">第3章 消息循环（窗口过程/分发）</text>

          <rect x="380" y="82" width="310" height="56" rx="8" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="535" y="104" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--warning)">阶段目标</text>
          <text x="535" y="122" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">能调用：掌握 Win32 API 调用范式</text>
          <text x="535" y="134" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">能响应：理解消息驱动模型</text>

          <text x="205" y="160" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>
          <text x="535" y="160" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>

          {/* 第二排：窗口管理与GDI */}
          <rect x="50" y="174" width="310" height="56" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="205" y="196" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">窗口管理与GDI绘图</text>
          <text x="205" y="214" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">第4章 窗口管理（创建/属性/子类化）</text>
          <text x="205" y="226" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">第5章 GDI 渲染（DC/绘制原语）</text>

          <rect x="380" y="174" width="310" height="56" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="535" y="196" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">阶段目标</text>
          <text x="535" y="214" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">能创建：窗口生命周期管理</text>
          <text x="535" y="226" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">能绘制：GDI 图形文本渲染</text>

          <text x="205" y="252" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>
          <text x="535" y="252" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>

          {/* 第三排：系统机制 */}
          <rect x="50" y="266" width="310" height="56" rx="8" fill="var(--danger)" fillOpacity="0.12" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="205" y="288" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--danger)">系统机制</text>
          <text x="205" y="306" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">第6章 注册表与服务（配置/后台）</text>
          <text x="205" y="318" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">第7章 进程与线程（创建/同步）</text>

          <rect x="380" y="266" width="310" height="56" rx="8" fill="var(--danger)" fillOpacity="0.12" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="535" y="288" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--danger)">阶段目标</text>
          <text x="535" y="306" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">能配置：注册表与服务管理</text>
          <text x="535" y="318" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">能并发：进程线程与同步</text>

          <text x="205" y="344" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>
          <text x="535" y="344" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>

          {/* 第四排：高级I/O + 总复习 */}
          <rect x="50" y="358" width="310" height="56" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="205" y="380" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--success)">高级I/O与总复习</text>
          <text x="205" y="398" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">第8章 文件I/O + 第9章 网络编程</text>
          <text x="205" y="410" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">第10章 全书总复习</text>

          <rect x="380" y="358" width="310" height="56" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="535" y="380" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--success)">全书总复习</text>
          <text x="535" y="398" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">一个窗口程序的一生串九章</text>
          <text x="535" y="410" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">从API调用到网络通信全链贯通</text>

          <text x={VIEW_W / 2} y="456" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            关键洞察：从「会写Windows程序」到「懂Windows系统机制」的五层进阶
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Windows逐梦旅程全书学习地图——API基础、消息循环、窗口GUI、系统机制、高级I/O、总复习五阶段递进路径
      </figcaption>
    </figure>
  );
}
