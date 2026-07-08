/**
 * <VdiBuiltInComponentsDiagram>：内置组件原理图解。
 * 展示 KeepAlive 缓存、Teleport 传送、Suspense 协调三大内置组件。
 * 纯静态展示，无交互。Server Component。
 */

const VIEW_W = 740;
const VIEW_H = 460;

export function VdiBuiltInComponentsDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="内置组件原理图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            内置组件原理：KeepAlive / Teleport / Suspense
          </text>
          <text x={VIEW_W / 2} y="48" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            三大内置组件各自解决一类渲染调度问题
          </text>

          {/* KeepAlive */}
          <rect x="30" y="66" width="220" height="350" rx="10" fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" strokeWidth="1.2" />
          <text x="140" y="88" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--success)">KeepAlive</text>
          <text x="140" y="106" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">缓存组件实例，切回不重建</text>
          <line x1="50" y1="118" x2="230" y2="118" stroke="var(--border)" strokeWidth="1" />
          <text x="140" y="138" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">核心机制</text>
          <text x="140" y="156" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">卸载时不断 DOM</text>
          <text x="140" y="172" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">移到隐藏容器缓存</text>
          <text x="140" y="188" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">切回时移回原位</text>
          <line x1="50" y1="200" x2="230" y2="200" stroke="var(--border)" strokeWidth="1" />
          <text x="140" y="220" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">缓存策略</text>
          <text x="140" y="238" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">include / exclude</text>
          <text x="140" y="254" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">max 限制缓存数</text>
          <text x="140" y="270" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">LRU 淘汰最久未用</text>
          <line x1="50" y1="282" x2="230" y2="282" stroke="var(--border)" strokeWidth="1" />
          <text x="140" y="302" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">生命周期</text>
          <text x="140" y="320" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">onActivated 激活</text>
          <text x="140" y="336" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">on deactivated 停用</text>
          <text x="140" y="360" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">保存状态、滚动位置</text>
          <text x="140" y="378" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">避免重复 setup 开销</text>

          {/* Teleport */}
          <rect x="270" y="66" width="200" height="350" rx="10" fill="var(--warning)" fillOpacity="0.08" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="370" y="88" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--warning)">Teleport</text>
          <text x="370" y="106" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">把子树渲染到别处</text>
          <line x1="290" y1="118" x2="450" y2="118" stroke="var(--border)" strokeWidth="1" />
          <text x="370" y="138" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">核心机制</text>
          <text x="370" y="156" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">to="目标选择器"</text>
          <text x="370" y="172" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">子树 VNode 正常 patch</text>
          <text x="370" y="188" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">但插入到 to 指定容器</text>
          <line x1="290" y1="200" x2="450" y2="200" stroke="var(--border)" strokeWidth="1" />
          <text x="370" y="220" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">解决什么</text>
          <text x="370" y="238" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">弹窗/通知脱离父级</text>
          <text x="370" y="254" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">避免 z-index 嵌套</text>
          <text x="370" y="270" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">避免 overflow 裁剪</text>
          <line x1="290" y1="282" x2="450" y2="282" stroke="var(--border)" strokeWidth="1" />
          <text x="370" y="302" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">disabled 属性</text>
          <text x="370" y="320" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">true 时禁用传送</text>
          <text x="370" y="336" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">回退到就近渲染</text>
          <text x="370" y="360" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">逻辑归属不变</text>
          <text x="370" y="378" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">视觉位置可分离</text>

          {/* Suspense */}
          <rect x="490" y="66" width="220" height="350" rx="10" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="600" y="88" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">Suspense</text>
          <text x="600" y="106" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">协调异步子树挂载</text>
          <line x1="510" y1="118" x2="690" y2="118" stroke="var(--border)" strokeWidth="1" />
          <text x="600" y="138" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">核心机制</text>
          <text x="600" y="156" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">子树 async setup 返回</text>
          <text x="600" y="172" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">Promise → 挂起</text>
          <text x="600" y="188" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">显示 #fallback</text>
          <line x1="510" y1="200" x2="690" y2="200" stroke="var(--border)" strokeWidth="1" />
          <text x="600" y="220" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">两个插槽</text>
          <text x="600" y="238" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">#default 异步内容</text>
          <text x="600" y="254" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">#fallback 加载占位</text>
          <line x1="510" y1="266" x2="690" y2="266" stroke="var(--border)" strokeWidth="1" />
          <text x="600" y="286" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">协调规则</text>
          <text x="600" y="304" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">全部 resolve → 提交</text>
          <text x="600" y="320" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">任一 reject → onError</text>
          <text x="600" y="360" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">数据获取与渲染解耦</text>
          <text x="600" y="378" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">声明式处理加载态</text>

          <text x={VIEW_W / 2} y="440" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            关键洞察：内置组件 = 渲染器特殊 vnode 类型，在 patch 阶段走专属分支
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        内置组件原理——KeepAlive 缓存实例、Teleport 跨容器传送、Suspense 协调异步挂载
      </figcaption>
    </figure>
  );
}
