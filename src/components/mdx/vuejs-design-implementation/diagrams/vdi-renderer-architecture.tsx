/**
 * <VdiRendererArchitectureDiagram>：渲染器架构图解。
 * 展示 VNode → 挂载/卸载/patch → 平台节点（可自定义渲染器）。
 * 纯静态展示，无交互。Server Component。
 */

const VIEW_W = 740;
const VIEW_H = 460;

export function VdiRendererArchitectureDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="渲染器架构图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            渲染器架构：VNode 到平台节点
          </text>
          <text x={VIEW_W / 2} y="48" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            渲染器 = render(vnode, container)，挂载/卸载/patch 三大操作可跨平台
          </text>

          {/* 左侧：VNode 虚拟节点 */}
          <rect x="30" y="70" width="180" height="160" rx="10" fill="var(--success)" fillOpacity="0.1" stroke="var(--success)" strokeWidth="1.2" />
          <text x="120" y="92" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--success)">VNode 虚拟节点</text>
          <text x="120" y="114" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">&lbrace; type, props, children &rbrace;</text>
          <line x1="50" y1="128" x2="190" y2="128" stroke="var(--border)" strokeWidth="1" />
          <text x="120" y="148" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">type: 'div' / 组件</text>
          <text x="120" y="166" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">props: {`{ id, class }`}</text>
          <text x="120" y="184" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">children: 文本/VNode[]</text>
          <text x="120" y="202" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">el: 真实节点引用</text>
          <text x="120" y="220" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">key: 复用标识</text>

          {/* 中间：渲染器三大操作 */}
          <rect x="240" y="70" width="260" height="160" rx="10" fill="var(--warning)" fillOpacity="0.1" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="370" y="92" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--warning)">渲染器 renderer</text>
          <text x="370" y="112" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">createRenderer(options)</text>
          <line x1="260" y1="124" x2="480" y2="124" stroke="var(--border)" strokeWidth="1" />
          <text x="370" y="144" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">mount(vnode, container)</text>
          <text x="370" y="160" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">createElement → 设属性 → 挂子节点</text>
          <text x="370" y="180" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">unmount(vnode)</text>
          <text x="370" y="196" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">parent.removeChild(el)</text>
          <text x="370" y="216" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">patch(n1, n2, container)</text>

          {/* 右侧：平台节点 */}
          <rect x="530" y="70" width="180" height="160" rx="10" fill="var(--accent)" fillOpacity="0.1" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="620" y="92" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">平台节点</text>
          <line x1="550" y1="104" x2="690" y2="104" stroke="var(--border)" strokeWidth="1" />
          <text x="620" y="124" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">浏览器 DOM</text>
          <text x="620" y="140" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">document.createElement</text>
          <text x="620" y="160" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">Canvas</text>
          <text x="620" y="176" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">ctx.fillRect / drawImage</text>
          <text x="620" y="196" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">SSR 字符串</text>
          <text x="620" y="212" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">拼 HTML 字符串</text>

          <text x="220" y="150" textAnchor="middle" fontSize="16" fill="var(--text-tertiary)">&rarr;</text>
          <text x="520" y="150" textAnchor="middle" fontSize="16" fill="var(--text-tertiary)">&rarr;</text>

          {/* 下方：patch 更新流程 */}
          <rect x="30" y="250" width="680" height="180" rx="10" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="370" y="272" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--text-primary)">patch(n1, n2)：新旧 VNode 比对与更新</text>

          <rect x="50" y="288" width="140" height="60" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="120" y="310" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">1. 类型不同</text>
          <text x="120" y="328" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">unmount(n1)</text>
          <text x="120" y="342" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">mount(n2)</text>

          <text x="200" y="322" textAnchor="middle" fontSize="16" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="220" y="288" width="140" height="60" rx="8" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="290" y="310" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">2. 同类型元素</text>
          <text x="290" y="328" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">复用 el</text>
          <text x="290" y="342" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">patchProps 更新属性</text>

          <text x="370" y="322" textAnchor="middle" fontSize="16" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="390" y="288" width="140" height="60" rx="8" fill="var(--danger)" fillOpacity="0.12" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="460" y="310" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--danger)">3. 子节点更新</text>
          <text x="460" y="328" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">Diff 新旧 children</text>
          <text x="460" y="342" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">最小化 DOM 操作</text>

          <text x="540" y="322" textAnchor="middle" fontSize="16" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="560" y="288" width="140" height="60" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="630" y="310" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">4. 组件更新</text>
          <text x="630" y="328" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">props 变 → 重渲染</text>
          <text x="630" y="342" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">patch 子树</text>

          <text x="370" y="384" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            options 注入平台操作：createElement / insert / remove / patchProps
          </text>
          <text x="370" y="404" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            关键洞察：渲染器与平台解耦，换 options 即可渲染到任意目标
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        渲染器架构——VNode 经 mount/unmount/patch 转为平台节点，注入 options 即自定义渲染器
      </figcaption>
    </figure>
  );
}
