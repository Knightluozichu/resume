/**
 * <VdiAsyncComponentDiagram>：异步组件与 Suspense 图解。
 * 展示 defineAsyncComponent 加载状态机 + Suspense 协调异步。
 * 纯静态展示，无交互。Server Component。
 */

const VIEW_W = 740;
const VIEW_H = 460;

export function VdiAsyncComponentDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="异步组件与 Suspense 图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            异步组件与 Suspense：异步加载与协调
          </text>
          <text x={VIEW_W / 2} y="48" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            defineAsyncComponent 管理加载状态，Suspense 协调多个异步子树
          </text>

          {/* 左侧：异步组件状态机 */}
          <rect x="30" y="70" width="320" height="300" rx="10" fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" strokeWidth="1.2" />
          <text x="190" y="92" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--success)">defineAsyncComponent(loader)</text>
          <text x="190" y="110" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">返回一个包装组件，内部状态机驱动</text>

          <rect x="50" y="124" width="280" height="44" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="190" y="144" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">pending（加载中）</text>
          <text x="190" y="160" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">渲染 loadingComponent</text>

          <text x="190" y="182" textAnchor="middle" fontSize="16" fill="var(--text-tertiary)">&darr;</text>

          <rect x="50" y="192" width="130" height="56" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="115" y="212" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">resolved</text>
          <text x="115" y="228" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">渲染真实组件</text>
          <text x="115" y="242" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">缓存结果</text>

          <rect x="200" y="192" width="130" height="56" rx="8" fill="var(--danger)" fillOpacity="0.12" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="265" y="212" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--danger)">rejected</text>
          <text x="265" y="228" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">渲染 errorComponent</text>
          <text x="265" y="242" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">可重试 timeout</text>

          <text x="190" y="268" textAnchor="middle" fontSize="16" fill="var(--text-tertiary)">&darr;</text>

          <rect x="50" y="278" width="280" height="80" rx="8" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="190" y="298" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">配置选项</text>
          <text x="190" y="316" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">delay：显示 loading 前延迟</text>
          <text x="190" y="332" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">timeout：超时切 rejected</text>
          <text x="190" y="348" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">errorComponent / loadingComponent</text>

          {/* 右侧：Suspense 协调 */}
          <rect x="370" y="70" width="340" height="300" rx="10" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="540" y="92" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">Suspense 协调器</text>
          <text x="540" y="110" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">包裹异步子组件，统一管理挂载时机</text>

          <rect x="390" y="124" width="300" height="50" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="540" y="144" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">{`<Suspense>`}</text>
          <text x="540" y="162" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">{`<template #default> 异步子树 </template>`}</text>

          <rect x="390" y="184" width="145" height="50" rx="8" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="462" y="204" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">pending</text>
          <text x="462" y="222" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">显示 #fallback</text>

          <rect x="545" y="184" width="145" height="50" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="617" y="204" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">resolved</text>
          <text x="617" y="222" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">显示 #default</text>

          <text x="540" y="252" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">协调机制</text>
          <text x="540" y="270" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">1. 子树 setup 返回 Promise → 挂起</text>
          <text x="540" y="286" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">2. 收集所有异步依赖</text>
          <text x="540" y="302" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">3. 全部 resolve → 提交 DOM</text>
          <text x="540" y="318" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">4. 任一 reject → 触发 onError</text>
          <text x="540" y="338" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">隐藏未就绪子树，先展示 fallback</text>

          <text x={VIEW_W / 2} y="404" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            异步组件：单组件按需加载 + 状态管理；Suspense：多异步子树统一协调
          </text>
          <text x={VIEW_W / 2} y="424" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            关键洞察：路由懒加载的本质就是异步组件，Suspense 让异步挂载可声明式编排
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        异步组件与 Suspense——defineAsyncComponent 状态机管理加载，Suspense 协调多异步子树
      </figcaption>
    </figure>
  );
}
