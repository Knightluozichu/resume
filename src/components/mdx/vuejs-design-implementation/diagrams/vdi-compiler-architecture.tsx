/**
 * <VdiCompilerArchitectureDiagram>：编译器架构图解。
 * 展示 Parse → Transform → Generate 三阶段编译流水线。
 * 纯静态展示，无交互。Server Component。
 */

const VIEW_W = 740;
const VIEW_H = 460;

export function VdiCompilerArchitectureDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="编译器架构图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            编译器架构：模板 → 渲染函数
          </text>
          <text x={VIEW_W / 2} y="48" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            Parse 解析 → Transform 转换 → Generate 生成，三阶段流水线
          </text>

          {/* 输入 */}
          <rect x="30" y="70" width="140" height="80" rx="10" fill="var(--text-tertiary)" fillOpacity="0.1" stroke="var(--text-tertiary)" strokeWidth="1.2" />
          <text x="100" y="94" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">输入</text>
          <text x="100" y="114" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">{`<template>`}</text>
          <text x="100" y="130" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">{`<div>{{ msg }}</div>`}</text>

          <text x="180" y="112" textAnchor="middle" fontSize="16" fill="var(--text-tertiary)">&rarr;</text>

          {/* 阶段一：Parse */}
          <rect x="195" y="66" width="170" height="180" rx="10" fill="var(--success)" fillOpacity="0.1" stroke="var(--success)" strokeWidth="1.2" />
          <text x="280" y="88" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--success)">1. Parse 解析</text>
          <text x="280" y="106" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">词法 + 语法分析</text>
          <line x1="215" y1="118" x2="345" y2="118" stroke="var(--border)" strokeWidth="1" />
          <text x="280" y="138" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">扫描字符流</text>
          <text x="280" y="156" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">识别标签/属性/插值</text>
          <text x="280" y="174" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">递归下降构造树</text>
          <line x1="215" y1="186" x2="345" y2="186" stroke="var(--border)" strokeWidth="1" />
          <text x="280" y="206" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">输出：AST 模板 AST</text>
          <text x="280" y="224" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">Root → Element → Interpolation</text>

          <text x="375" y="158" textAnchor="middle" fontSize="16" fill="var(--text-tertiary)">&rarr;</text>

          {/* 阶段二：Transform */}
          <rect x="390" y="66" width="170" height="180" rx="10" fill="var(--warning)" fillOpacity="0.1" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="475" y="88" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--warning)">2. Transform 转换</text>
          <text x="475" y="106" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">遍历 AST 改写节点</text>
          <line x1="410" y1="118" x2="540" y2="118" stroke="var(--border)" strokeWidth="1" />
          <text x="475" y="138" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">节点插件转换</text>
          <text x="475" y="156" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">v-if → 条件分支</text>
          <text x="475" y="174" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">v-for → 循环辅助</text>
          <line x1="410" y1="186" x2="540" y2="186" stroke="var(--border)" strokeWidth="1" />
          <text x="475" y="206" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">输出：JavaScript AST</text>
          <text x="475" y="224" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">含 createVNode 调用结构</text>

          <text x="570" y="158" textAnchor="middle" fontSize="16" fill="var(--text-tertiary)">&rarr;</text>

          {/* 阶段三：Generate */}
          <rect x="585" y="66" width="125" height="180" rx="10" fill="var(--danger)" fillOpacity="0.1" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="647" y="88" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--danger)">3. Generate</text>
          <text x="647" y="106" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">生成代码字符串</text>
          <line x1="600" y1="118" x2="695" y2="118" stroke="var(--border)" strokeWidth="1" />
          <text x="647" y="138" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">拼接 render 函数</text>
          <text x="647" y="156" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">静态提升</text>
          <text x="647" y="174" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">补丁标记</text>
          <line x1="600" y1="186" x2="695" y2="186" stroke="var(--border)" strokeWidth="1" />
          <text x="647" y="206" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--danger)">输出：render 字符串</text>

          {/* 输出 */}
          <rect x="585" y="260" width="125" height="80" rx="10" fill="var(--accent)" fillOpacity="0.1" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="647" y="282" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">输出</text>
          <text x="647" y="300" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">function render() {`{`}</text>
          <text x="647" y="316" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">{`  return h('div', msg)`}</text>
          <text x="647" y="332" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">{`}`}</text>

          {/* 下方：编译优化 */}
          <rect x="30" y="360" width="680" height="80" rx="10" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="370" y="382" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--text-primary)">编译期优化（Transform 阶段注入）</text>

          <rect x="50" y="394" width="150" height="36" rx="6" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1" />
          <text x="125" y="416" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">静态提升 hoistStatic</text>

          <rect x="215" y="394" width="150" height="36" rx="6" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1" />
          <text x="290" y="416" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">补丁标记 patchFlag</text>

          <rect x="380" y="394" width="150" height="36" rx="6" fill="var(--danger)" fillOpacity="0.12" stroke="var(--danger)" strokeWidth="1" />
          <text x="455" y="416" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">块级树 Block Tree</text>

          <rect x="545" y="394" width="150" height="36" rx="6" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1" />
          <text x="620" y="416" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">缓存事件 handler</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        编译器架构——Parse 构造模板 AST，Transform 转换为 JS AST，Generate 生成渲染函数
      </figcaption>
    </figure>
  );
}
