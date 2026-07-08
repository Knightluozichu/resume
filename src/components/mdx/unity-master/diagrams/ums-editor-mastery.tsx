/**
 * <UmsEditorMasteryDiagram>：编辑器精通三把钥匙图解。
 * 纯静态展示，无交互。Server Component。
 */

const VIEW_W = 720;
const VIEW_H = 400;

export function UmsEditorMasteryDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="编辑器精通三把钥匙图解"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text x="360" y="32" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">编辑器扩展三把钥匙</text>

          {/* EditorWindow */}
          <rect x="40" y="70" width="190" height="120" rx="10" fill="var(--success)" fillOpacity="0.10" stroke="var(--success)" strokeWidth="1.4" />
          <text x="135" y="95" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--success)">EditorWindow</text>
          <text x="135" y="118" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">独立工具面板</text>
          <text x="135" y="140" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">- 批量操作</text>
          <text x="135" y="156" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">- 数据导入导出</text>
          <text x="135" y="172" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">- 多列布局</text>

          {/* PropertyDrawer */}
          <rect x="265" y="70" width="190" height="120" rx="10" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1.4" />
          <text x="360" y="95" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--accent)">PropertyDrawer</text>
          <text x="360" y="118" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">字段级定制</text>
          <text x="360" y="140" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">- 滑动条</text>
          <text x="360" y="156" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">- 颜色选择器</text>
          <text x="360" y="172" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">- 条件隐藏</text>

          {/* Gizmo */}
          <rect x="490" y="70" width="190" height="120" rx="10" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="1.4" />
          <text x="585" y="95" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--warning)">Gizmo</text>
          <text x="585" y="118" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">场景可视化</text>
          <text x="585" y="140" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">- 范围标记</text>
          <text x="585" y="156" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">- 路径预览</text>
          <text x="585" y="172" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">- 调试辅助</text>

          {/* 数据访问层 */}
          <rect x="140" y="230" width="440" height="50" rx="8" fill="var(--text-tertiary)" fillOpacity="0.08" stroke="var(--text-tertiary)" strokeWidth="1" strokeOpacity="0.4" />
          <text x="360" y="252" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--text-primary)">SerializedProperty</text>
          <text x="360" y="270" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">数据访问层：桥接 Undo / Prefab / 多选编辑 / 场景脏标记</text>

          {/* 箭头连接 */}
          <text x="135" y="215" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&darr;</text>
          <text x="360" y="215" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&darr;</text>
          <text x="585" y="215" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&darr;</text>

          {/* 底部要点 */}
          <text x="360" y="320" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">核心原则：编辑器脚本修改数据必须通过 SerializedProperty</text>
          <text x="360" y="345" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">直接改 C# 字段 &rarr; Undo 不生效、Prefab 不保存、场景不标记脏</text>
          <text x="360" y="368" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">OnDrawGizmos 全画 vs OnDrawGizmosSelected 仅选中 &rarr; 大量物体优先用 Selected</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        编辑器精通三把钥匙——EditorWindow / PropertyDrawer / Gizmo
      </figcaption>
    </figure>
  );
}
