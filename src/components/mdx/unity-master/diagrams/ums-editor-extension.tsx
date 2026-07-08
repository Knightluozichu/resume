/**
 * <UmsEditorExtensionDiagram>：编辑器扩展四层架构图解。
 * 纯静态展示，无交互。Server Component。
 */

const VIEW_W = 720;
const VIEW_H = 400;

export function UmsEditorExtensionDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="编辑器扩展四层架构图解"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text x="360" y="32" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">编辑器扩展四层架构</text>

          {/* 入口层 */}
          <rect x="120" y="60" width="480" height="44" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.4" />
          <text x="360" y="80" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--success)">入口层：MenuItem / ContextMenu / ContextMenuItem</text>
          <text x="360" y="96" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">菜单注册：Tools/xxx、右键菜单、字段右键</text>

          <text x="360" y="120" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&darr;</text>

          {/* 编辑层 */}
          <rect x="120" y="130" width="480" height="44" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.4" />
          <text x="360" y="150" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--accent)">编辑层：EditorWindow / CustomEditor</text>
          <text x="360" y="166" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">可视化编辑面板：技能编辑器、批量操作工具、Inspector 增强</text>

          <text x="360" y="190" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&darr;</text>

          {/* 字段层 */}
          <rect x="120" y="200" width="480" height="44" rx="8" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.4" />
          <text x="360" y="220" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--warning)">字段层：PropertyDrawer / DecoratorDrawer</text>
          <text x="360" y="236" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">字段级 UI：滑动条、颜色选择器、[Space]、[Header]、[Tooltip]</text>

          <text x="360" y="260" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&darr;</text>

          {/* 数据层 */}
          <rect x="120" y="270" width="480" height="44" rx="8" fill="var(--info)" fillOpacity="0.12" stroke="var(--info)" strokeWidth="1.4" />
          <text x="360" y="290" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--info)">数据层：ScriptableObject</text>
          <text x="360" y="306" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">数据资产：技能、关卡、配置表，Inspector 可视化编辑，Addressables 可加载</text>

          {/* 程序集隔离 */}
          <rect x="40" y="340" width="300" height="44" rx="8" fill="var(--text-tertiary)" fillOpacity="0.08" stroke="var(--text-tertiary)" strokeWidth="1" strokeOpacity="0.4" />
          <text x="190" y="360" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">Runtime asmdef</text>
          <text x="190" y="376" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">运行时代码（不含 UnityEditor）</text>

          <rect x="380" y="340" width="300" height="44" rx="8" fill="var(--text-tertiary)" fillOpacity="0.08" stroke="var(--text-tertiary)" strokeWidth="1" strokeOpacity="0.4" />
          <text x="530" y="360" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">Editor asmdef (Editor Only)</text>
          <text x="530" y="376" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">编辑器代码（打包自动排除）</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        编辑器扩展四层架构——入口 / 编辑 / 字段 / 数据 + 程序集隔离
      </figcaption>
    </figure>
  );
}
