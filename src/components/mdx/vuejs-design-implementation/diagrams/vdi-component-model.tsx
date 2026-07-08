/**
 * <VdiComponentModelDiagram>：组件模型图解。
 * 展示 setup → 渲染函数 → Props/emit → 组件 VNode → 子树渲染。
 * 纯静态展示，无交互。Server Component。
 */

const VIEW_W = 740;
const VIEW_H = 460;

export function VdiComponentModelDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="组件模型图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            组件模型：setup 与渲染函数
          </text>
          <text x={VIEW_W / 2} y="48" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            组件本质是一个返回 VNode 的函数，setup 提供响应式状态与副作用
          </text>

          {/* 左侧：组件定义 */}
          <rect x="30" y="70" width="200" height="200" rx="10" fill="var(--success)" fillOpacity="0.1" stroke="var(--success)" strokeWidth="1.2" />
          <text x="130" y="92" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--success)">组件对象</text>
          <line x1="50" y1="104" x2="210" y2="104" stroke="var(--border)" strokeWidth="1" />
          <text x="130" y="124" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">props</text>
          <text x="130" y="140" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">父组件传入，只读</text>
          <text x="130" y="160" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">setup(props, ctx)</text>
          <text x="130" y="176" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">初始化状态</text>
          <text x="130" y="192" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">注册副作用</text>
          <text x="130" y="208" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">返回 render 依赖的数据</text>
          <text x="130" y="228" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">render()</text>
          <text x="130" y="244" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">返回 VNode 树</text>
          <text x="130" y="260" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">this = setup 返回值</text>

          {/* 中间：组件 VNode → 挂载流程 */}
          <rect x="260" y="70" width="220" height="200" rx="10" fill="var(--warning)" fillOpacity="0.1" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="370" y="92" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--warning)">挂载组件</text>
          <line x1="280" y1="104" x2="460" y2="104" stroke="var(--border)" strokeWidth="1" />
          <text x="370" y="124" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">1. 创建组件实例 instance</text>
          <text x="370" y="142" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">2. resolveProps 设置 props</text>
          <text x="370" y="160" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">3. 执行 setup(props, ctx)</text>
          <text x="370" y="178" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">4. setupResult 赋给 instance</text>
          <text x="370" y="196" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">5. 编译/取 render 函数</text>
          <text x="370" y="214" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">6. 建响应式 effect</text>
          <text x="370" y="232" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">7. render() 产出 subTree</text>
          <text x="370" y="250" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">8. patch(subTree) 挂载 DOM</text>

          {/* 右侧：更新与通信 */}
          <rect x="510" y="70" width="200" height="200" rx="10" fill="var(--accent)" fillOpacity="0.1" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="610" y="92" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">更新与通信</text>
          <line x1="530" y1="104" x2="690" y2="104" stroke="var(--border)" strokeWidth="1" />
          <text x="610" y="124" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">props 变化</text>
          <text x="610" y="140" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">父重渲染传新 props</text>
          <text x="610" y="156" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">触发组件 effect 重跑</text>
          <text x="610" y="178" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">emit 向上通信</text>
          <text x="610" y="194" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">ctx.emit('add', val)</text>
          <text x="610" y="210" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">找 props.onAdd 执行</text>
          <text x="610" y="232" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">slots 插槽</text>
          <text x="610" y="248" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">父传入的内容分发</text>

          <text x="245" y="170" textAnchor="middle" fontSize="16" fill="var(--text-tertiary)">&rarr;</text>
          <text x="495" y="170" textAnchor="middle" fontSize="16" fill="var(--text-tertiary)">&rarr;</text>

          {/* 下方：渲染函数两种来源 */}
          <rect x="30" y="290" width="680" height="140" rx="10" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="370" y="312" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--text-primary)">渲染函数的两种来源</text>

          <rect x="60" y="326" width="290" height="86" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="205" y="348" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">手写渲染函数</text>
          <text x="205" y="368" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">import {`{ h }`} from 'vue'</text>
          <text x="205" y="384" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">setup() {`{ return () => h('div', count) }`}</text>
          <text x="205" y="402" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">完全控制结构，无编译开销</text>

          <rect x="390" y="326" width="290" height="86" rx="8" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="535" y="348" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">编译模板生成</text>
          <text x="535" y="368" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">{`<template> <div>{{ count }}</div> </template>`}</text>
          <text x="535" y="384" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">编译器编译为 render 函数</text>
          <text x="535" y="402" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">含静态提升、补丁标记等优化</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        组件模型——setup 初始化状态、render 返回 VNode、props/emit/slots 实现父子通信
      </figcaption>
    </figure>
  );
}
