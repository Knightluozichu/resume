"use client";

import {
  Children,
  isValidElement,
  useId,
  useState,
  type ReactElement,
  type ReactNode,
} from "react";

/**
 * <CodeTabs> + <Tab label="...">：C++/OpenGL ↔ WebGL2/TS 代码对照 Tab 切换
 * （chapter-spec §六 代码对照）。
 *
 * ===== shiki 高亮如何在 Tab 内生效（关键）=====
 * shiki 高亮由 page.tsx 的 compileMDX(rehypePrettyCode) 在「编译期 / Server」对**整篇 MDX**
 * 跑一遍——包括 <Tab> 里的 fenced code block。所以传进 <Tab> 的 children 已经是
 * 高亮好的 <figure data-rehype-pretty-code-figure><pre><code>…</code></pre></figure>
 * React 节点（RSC 把这些 server 渲染节点作为 children 透传给本 client 组件）。
 * 本组件**只**做 Tab 切换（显隐），从不重新处理代码，因此高亮原样保留、零回退。
 * → .mdx 里 <Tab> 内照常写 ```cpp / ```ts 围栏代码块即可。
 *
 * client 原因：仅 Tab 选中状态需交互（符合「client 只用在真需交互处」）。
 * 键盘可达：role=tablist / tab / tabpanel + aria-selected + 方向键切换。
 *
 * 颜色/间距/圆角/动效全部走 DESIGN token（硬规则 5）。
 */

type TabProps = { label: string; children: ReactNode };

/**
 * <Tab>：纯标记组件，本身不渲染（其 label/children 由父 <CodeTabs> 读取）。
 * 直接渲染时返回 null，避免裸用时泄漏未切换的内容。
 */
export function Tab(_props: TabProps): null {
  return null;
}

/**
 * 识别 <Tab> 子节点：按「带字符串 label prop 的有效元素」判定，**不依赖 node.type 引用相等**。
 * 因为 Tab 是 client 组件、又经 MDX 组件 map 注入，跨 RSC/MDX 边界后 children 元素的
 * `type` 是 client 引用代理对象（typeof 为 "object"，非函数本身），引用/marker 都不可靠；
 * 而 `props.label` 作为序列化后的普通 prop 始终稳定可读。
 */
function isTabElement(node: ReactNode): node is ReactElement<TabProps> {
  return (
    isValidElement(node) &&
    typeof (node.props as { label?: unknown }).label === "string"
  );
}

export function CodeTabs({ children }: { children: ReactNode }) {
  // 从 children 中挑出 <Tab>，取其 label + children 作为面板内容
  const tabs = Children.toArray(children)
    .filter(isTabElement)
    .map((el) => ({ label: el.props.label, content: el.props.children }));

  const [active, setActive] = useState(0);
  const baseId = useId();

  if (tabs.length === 0) return null;

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
      e.preventDefault();
      const dir = e.key === "ArrowRight" ? 1 : -1;
      const next = (active + dir + tabs.length) % tabs.length;
      setActive(next);
      // 焦点跟随到新选中的 tab
      document.getElementById(`${baseId}-tab-${next}`)?.focus();
    }
  };

  return (
    <div className="mdx-code-tabs my-4 overflow-hidden rounded-card border border-border bg-code">
      {/* Tab 头：tablist */}
      <div
        role="tablist"
        aria-label="代码对照"
        onKeyDown={onKeyDown}
        className="flex gap-1 border-b border-border p-1"
      >
        {tabs.map((t, i) => {
          const selected = i === active;
          return (
            <button
              key={t.label}
              id={`${baseId}-tab-${i}`}
              role="tab"
              type="button"
              aria-selected={selected}
              aria-controls={`${baseId}-panel-${i}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(i)}
              className={`rounded-control px-3 py-1 text-xs transition-colors duration-(--duration-hover) ease-standard ${
                selected
                  ? "bg-elevated text-accent"
                  : "text-secondary hover:text-primary"
              }`}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      {/* 面板：只渲染选中项；非选中保留在 DOM 但隐藏，保留无障碍语义 */}
      {tabs.map((t, i) => (
        <div
          key={t.label}
          id={`${baseId}-panel-${i}`}
          role="tabpanel"
          aria-labelledby={`${baseId}-tab-${i}`}
          hidden={i !== active}
          // 去掉 .prose 给 pre 的外边距叠加：面板内代码块紧贴容器
          className="mdx-code-tabs-panel px-2 pb-2"
        >
          {t.content}
        </div>
      ))}
    </div>
  );
}
